import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { updateProfile } from "@/lib/data/profile";
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

  const fields: Parameters<typeof updateProfile>[1] = {};

  if (typeof body.full_name === "string") {
    fields.full_name = body.full_name.trim().slice(0, 80);
  }
  if (body.avatar_type != null) {
    if (!VALID_AVATAR_TYPES.includes(body.avatar_type)) {
      return NextResponse.json({ error: "Invalid avatar_type" }, { status: 400 });
    }
    fields.avatar_type = body.avatar_type;
  }
  if (body.avatar_url != null) {
    fields.avatar_url = typeof body.avatar_url === "string" ? body.avatar_url : null;
  }

  const result = await updateProfile(user.id, fields);
  if (result.error) {
    return NextResponse.json({ error: result.error }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
