import { Resend } from "resend";
import { env } from "@/lib/env";

type SendParams = {
  to: string[];
  subject: string;
  preview: string;
  siteUrl: string;
};

export async function sendUpdateEmail(params: SendParams): Promise<{
  sent: number;
  errors: string[];
}> {
  if (!env.resendApiKey) {
    return { sent: 0, errors: ["RESEND_API_KEY is not configured."] };
  }
  if (!env.emailFrom) {
    return { sent: 0, errors: ["EMAIL_FROM is not configured."] };
  }

  const resend = new Resend(env.resendApiKey);
  const errors: string[] = [];
  let sent = 0;

  const batchSize = 50;
  for (let i = 0; i < params.to.length; i += batchSize) {
    const batch = params.to.slice(i, i + batchSize);
    const { error } = await resend.emails.send({
      from: env.emailFrom,
      to: batch,
      subject: params.subject,
      html: buildEmailHtml(params.subject, params.preview, params.siteUrl),
    });
    if (error) {
      errors.push(error.message);
    } else {
      sent += batch.length;
    }
  }

  return { sent, errors };
}

function buildEmailHtml(subject: string, preview: string, siteUrl: string) {
  return `<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>${subject}</title></head>
<body style="background:#040814;font-family:Arial,sans-serif;padding:32px 16px;color:#e2e8f0">
<div style="max-width:560px;margin:0 auto">
<p style="font-size:11px;text-transform:uppercase;letter-spacing:0.2em;color:#67e8f9;margin:0 0 16px">
Quantum Art Thailand Association</p>
<h1 style="font-size:24px;font-weight:600;color:#fff;margin:0 0 16px">${subject}</h1>
<p style="font-size:15px;line-height:1.7;color:#94a3b8;margin:0 0 24px">${preview}</p>
<a href="${siteUrl}" style="display:inline-block;background:#a5f3fc;color:#0c1a2e;font-weight:600;padding:12px 24px;border-radius:9999px;text-decoration:none;font-size:14px">
Visit the site</a>
<p style="font-size:12px;color:#475569;margin:32px 0 0">
You received this because you opted in to QAT updates.
<a href="${siteUrl}/account" style="color:#67e8f9">Manage preferences</a></p>
</div>
</body></html>`;
}
