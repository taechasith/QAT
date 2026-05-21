import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { upsertProfile, updateNotificationPreference } from "@/lib/data/profile";

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

  const upsertResult = await upsertProfile(user.id, user.email ?? "");
  if (upsertResult.error) {
    return NextResponse.json({ error: upsertResult.error }, { status: 500 });
  }

  const result = await updateNotificationPreference(user.id, body.wants);
  if (result.error) {
    return NextResponse.json({ error: result.error }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
