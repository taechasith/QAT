import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";

export async function POST(request: Request) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json().catch(() => null);
  if (typeof body?.wants !== "boolean") {
    return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
  }

  const admin = createAdminClient();

  const { error: upsertError } = await admin
    .from("profiles")
    .upsert(
      { id: user.id, email: user.email ?? "" },
      { onConflict: "id", ignoreDuplicates: true },
    );

  if (upsertError) {
    console.error("[notification-preference] upsert error:", upsertError.message);
    return NextResponse.json({ error: upsertError.message }, { status: 500 });
  }

  const { data, error: updateError } = await admin
    .from("profiles")
    .update({ wants_update_email: body.wants, updated_at: new Date().toISOString() })
    .eq("id", user.id)
    .select("id")
    .maybeSingle();

  if (updateError) {
    console.error("[notification-preference] update error:", updateError.message);
    return NextResponse.json({ error: updateError.message }, { status: 500 });
  }

  if (!data) {
    console.error("[notification-preference] no row found, userId:", user.id);
    return NextResponse.json({ error: "Profile row missing." }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
