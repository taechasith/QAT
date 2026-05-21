import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";

type Params = { params: Promise<{ id: string }> };

export async function GET(_: Request, { params }: Params) {
  const { id } = await params;
  const db = createAdminClient();
  const { data, error } = await db
    .from("content_comments")
    .select("id, user_id, user_display_name, body, created_at")
    .eq("content_id", id)
    .order("created_at", { ascending: true });

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ comments: data ?? [] });
}

export async function POST(request: Request, { params }: Params) {
  const { id } = await params;
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: "Unauthenticated" }, { status: 401 });

  const body = await request.json().catch(() => null);
  const text = (body?.body ?? "").trim();
  if (!text || text.length > 1000) {
    return NextResponse.json({ error: "Comment must be 1–1000 characters." }, { status: 400 });
  }

  const displayName =
    user.user_metadata?.full_name ??
    user.user_metadata?.name ??
    user.email?.split("@")[0] ??
    "Member";

  const db = createAdminClient();
  const { data, error } = await db
    .from("content_comments")
    .insert({ content_id: id, user_id: user.id, user_display_name: displayName, body: text })
    .select("id, user_id, user_display_name, body, created_at")
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ comment: data }, { status: 201 });
}

export async function DELETE(request: Request, { params }: Params) {
  const { id: contentId } = await params;
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: "Unauthenticated" }, { status: 401 });

  const body = await request.json().catch(() => null);
  const commentId = body?.commentId;
  if (!commentId) return NextResponse.json({ error: "Missing commentId" }, { status: 400 });

  const db = createAdminClient();
  const { error } = await db
    .from("content_comments")
    .delete()
    .eq("id", commentId)
    .eq("content_id", contentId)
    .eq("user_id", user.id);

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ ok: true });
}
