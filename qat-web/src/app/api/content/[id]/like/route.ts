import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";

type Params = { params: Promise<{ id: string }> };

export async function GET(request: Request, { params }: Params) {
  const { id } = await params;
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  const db = createAdminClient();
  const [{ count: likeCount }, userLiked] = await Promise.all([
    db.from("content_likes").select("*", { count: "exact", head: true }).eq("content_id", id),
    user
      ? db.from("content_likes").select("id").eq("content_id", id).eq("user_id", user.id).maybeSingle()
      : Promise.resolve({ data: null }),
  ]);

  return NextResponse.json({ count: likeCount ?? 0, liked: Boolean(userLiked.data) });
}

export async function POST(_: Request, { params }: Params) {
  const { id } = await params;
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: "Unauthenticated" }, { status: 401 });

  const db = createAdminClient();
  const existing = await db
    .from("content_likes")
    .select("id")
    .eq("content_id", id)
    .eq("user_id", user.id)
    .maybeSingle();

  if (existing.data) {
    await db.from("content_likes").delete().eq("id", existing.data.id);
    return NextResponse.json({ liked: false });
  } else {
    await db.from("content_likes").insert({ content_id: id, user_id: user.id });
    return NextResponse.json({ liked: true });
  }
}
