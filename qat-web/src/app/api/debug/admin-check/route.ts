import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { isAdminEmail } from "@/lib/auth/admin";

export async function GET() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  return NextResponse.json({
    email: user?.email ?? null,
    isAdmin: isAdminEmail(user?.email),
    adminEmailsConfigured: Boolean(process.env.ADMIN_EMAILS),
    adminEmailCount: (process.env.ADMIN_EMAILS ?? "").split(",").filter(Boolean).length,
  });
}
