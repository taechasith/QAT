import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { isAdminEmail } from "@/lib/auth/admin";
import { contentSchema } from "@/lib/validation/content";
import { updateContent, deleteContent } from "@/lib/data/admin-content";
import type { Block } from "@/lib/types/blocks";

type Params = { params: Promise<{ id: string }> };

export async function PATCH(request: Request, { params }: Params) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user || !isAdminEmail(user.email)) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const { id } = await params;
  const raw = await request.json().catch(() => null);
  const { body_blocks, ...rest } = raw ?? {};
  const blocks: Block[] | undefined = Array.isArray(body_blocks) ? body_blocks : undefined;

  const parsed = contentSchema.safeParse(rest);
  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.issues[0]?.message ?? "Validation failed" },
      { status: 400 },
    );
  }

  const result = await updateContent(id, user.id, parsed.data, blocks);
  if (result.error) {
    return NextResponse.json({ error: result.error }, { status: 500 });
  }

  revalidatePath("/admin/layout");
  revalidatePath("/admin/content");
  revalidatePath(`/admin/content/${id}/edit`);
  revalidatePath(`/admin/content/${id}/blocks`);
  if (result.previousSlug) revalidatePath(`/content/${result.previousSlug}`);
  if (result.slug && result.slug !== result.previousSlug) revalidatePath(`/content/${result.slug}`);

  return NextResponse.json({ ok: true });
}

export async function DELETE(_: Request, { params }: Params) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user || !isAdminEmail(user.email)) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const { id } = await params;
  const supabaseAdmin = createAdminClient();
  const { data: existing } = await supabaseAdmin
    .from("content_items")
    .select("slug")
    .eq("id", id)
    .maybeSingle();

  const result = await deleteContent(id);
  if (result.error) {
    return NextResponse.json({ error: result.error }, { status: 500 });
  }

  revalidatePath("/admin/layout");
  revalidatePath("/admin/content");
  if (existing?.slug) revalidatePath(`/content/${existing.slug}`);

  return NextResponse.json({ ok: true });
}
