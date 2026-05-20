const requiredPublicEnv = {
  supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL,
  supabasePublishableKey: process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY,
};

function splitCsv(value: string | undefined) {
  return (value ?? "")
    .split(",")
    .map((item) => item.trim().toLowerCase())
    .filter(Boolean);
}

export const env = {
  ...requiredPublicEnv,
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  adminEmails: splitCsv(process.env.ADMIN_EMAILS),
  resendApiKey: process.env.RESEND_API_KEY,
  emailFrom: process.env.EMAIL_FROM,
  openAiApiKey: process.env.OPENAI_API_KEY,
  hasSupabase:
    Boolean(requiredPublicEnv.supabaseUrl) &&
    Boolean(requiredPublicEnv.supabasePublishableKey),
};

export function requireSupabaseEnv() {
  if (!env.supabaseUrl || !env.supabasePublishableKey) {
    throw new Error(
      "Supabase is not configured. Set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY.",
    );
  }

  return {
    supabaseUrl: env.supabaseUrl,
    supabasePublishableKey: env.supabasePublishableKey,
  };
}
