import { NextResponse } from "next/server";
import { z } from "zod";
import { createClient } from "@/lib/supabase/server";
import { isAdminEmail } from "@/lib/auth/admin";
import { getOptedInEmails, logNotification, logEmailDelivery } from "@/lib/data/notifications";
import { sendUpdateEmail } from "@/lib/email/send-update-email";
import { env } from "@/lib/env";

const bodySchema = z.object({
  subject: z.string().min(1).max(255),
  preview: z.string().min(1).max(500),
  contentItemId: z.string().uuid().optional(),
});

export async function POST(request: Request) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user || !isAdminEmail(user.email)) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  if (!env.resendApiKey || !env.emailFrom) {
    return NextResponse.json(
      {
        error:
          "Email is not configured. Set RESEND_API_KEY and EMAIL_FROM in your environment.",
        configured: false,
      },
      { status: 422 },
    );
  }

  const body = await request.json().catch(() => null);
  const parsed = bodySchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
  }

  const recipients = await getOptedInEmails();
  if (recipients.length === 0) {
    return NextResponse.json({ sent: 0, message: "No opted-in subscribers." });
  }

  const notificationId = await logNotification({
    subject: parsed.data.subject,
    preview: parsed.data.preview,
    contentItemId: parsed.data.contentItemId,
    sentBy: user.id,
  });

  const result = await sendUpdateEmail({
    to: recipients,
    subject: parsed.data.subject,
    preview: parsed.data.preview,
    siteUrl: env.siteUrl,
  });

  if (notificationId) {
    for (const email of recipients) {
      await logEmailDelivery({
        notificationId,
        recipientEmail: email,
        status: result.errors.length === 0 ? "sent" : "error",
        errorMessage: result.errors[0],
      });
    }
  }

  return NextResponse.json({ sent: result.sent, errors: result.errors });
}
