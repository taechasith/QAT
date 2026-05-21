import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";
import type { AvatarType } from "@/lib/data/profile";

const VALID_AVATAR_TYPES: AvatarType[] = [
  "artist_cat",
  "technologist_cat",
  "scientist_cat",
  "upload",
];

export async function POST(request: Request) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json().catch(() => null);
  if (!body) {
    return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
  }

  const fields: {
    full_name?: string;
    avatar_type?: AvatarType;
    avatar_url?: string | null;
  } = {};

  if (typeof body.full_name === "string") {
    fields.full_name = body.full_name.trim().slice(0, 80);
  }
  if (body.avatar_type != null) {
    if (!VALID_AVATAR_TYPES.includes(body.avatar_type)) {
      return NextResponse.json({ error: "Invalid avatar_type" }, { status: 400 });
    }
    fields.avatar_type = body.avatar_type;
  }
  // Use !== undefined so explicit null clears the stored URL
  if (body.avatar_url !== undefined) {
    fields.avatar_url = typeof body.avatar_url === "string" ? body.avatar_url : null;
  }

  if (Object.keys(fields).length === 0) {
    return NextResponse.json({ error: "No fields to update" }, { status: 400 });
  }

  // Admin client bypasses RLS — user identity already validated above
  const admin = createAdminClient();

  // Ensure profile row exists
  const { error: upsertError } = await admin
    .from("profiles")
    .upsert(
      { id: user.id, email: user.email ?? "" },
      { onConflict: "id", ignoreDuplicates: true },
    );

  if (upsertError) {
    console.error("[profile/update] upsert error:", upsertError.message);
    return NextResponse.json({ error: upsertError.message }, { status: 500 });
  }

  const { data, error: updateError } = await admin
    .from("profiles")
    .update({ ...fields, updated_at: new Date().toISOString() })
    .eq("id", user.id)
    .select("id, email, full_name, avatar_url, avatar_type, wants_update_email")
    .maybeSingle();

  if (updateError) {
    console.error("[profile/update] update error:", updateError.message);
    return NextResponse.json({ error: updateError.message }, { status: 500 });
  }

  if (!data) {
    console.error("[profile/update] no row found after update, userId:", user.id);
    return NextResponse.json({ error: "Profile row missing after update." }, { status: 500 });
  }

  return NextResponse.json({ ok: true, profile: data });
}
