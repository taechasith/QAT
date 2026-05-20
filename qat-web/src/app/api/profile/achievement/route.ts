import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { addAchievement, removeAchievement } from "@/lib/data/achievements";

export async function POST(request: Request) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json().catch(() => null);
  if (
    !body ||
    typeof body.itemId !== "string" ||
    !["game", "course"].includes(body.itemType) ||
    typeof body.completed !== "boolean"
  ) {
    return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
  }

  const result = body.completed
    ? await addAchievement(user.id, body.itemId, body.itemType)
    : await removeAchievement(user.id, body.itemId);

  if (result.error) {
    return NextResponse.json({ error: result.error }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
