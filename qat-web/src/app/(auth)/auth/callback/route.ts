import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { upsertProfile } from "@/lib/data/profile";
import { env } from "@/lib/env";

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");
  const next = searchParams.get("next") ?? "/";

  const redirectBase = env.siteUrl || origin;

  if (code) {
    const supabase = await createClient();
    const { data, error } = await supabase.auth.exchangeCodeForSession(code);

    if (!error && data.user) {
      await upsertProfile(data.user.id, data.user.email ?? "");
      return NextResponse.redirect(`${redirectBase}${next}`);
    }
  }

  return NextResponse.redirect(`${redirectBase}/login?error=auth_failed`);
}
