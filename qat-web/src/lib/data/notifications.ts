import { createClient } from "@/lib/supabase/server";

export async function getOptedInEmails(): Promise<string[]> {
  const supabase = await createClient();
  const { data } = await supabase
    .from("profiles")
    .select("email")
    .eq("wants_update_email", true);
  return (data ?? []).map((r) => r.email as string).filter(Boolean);
}

export async function logNotification(params: {
  subject: string;
  preview: string;
  contentItemId?: string;
  sentBy: string;
}): Promise<string | null> {
  const supabase = await createClient();
  const { data } = await supabase
    .from("update_notifications")
    .insert({
      subject: params.subject,
      preview: params.preview,
      content_item_id: params.contentItemId ?? null,
      sent_by: params.sentBy,
      sent_at: new Date().toISOString(),
    })
    .select("id")
    .single();
  return data?.id ?? null;
}

export async function logEmailDelivery(params: {
  notificationId: string;
  recipientEmail: string;
  status: string;
  providerMessageId?: string;
  errorMessage?: string;
}) {
  const supabase = await createClient();
  await supabase.from("email_delivery_logs").insert({
    notification_id: params.notificationId,
    recipient_email: params.recipientEmail,
    status: params.status,
    provider_message_id: params.providerMessageId ?? null,
    error_message: params.errorMessage ?? null,
  });
}
