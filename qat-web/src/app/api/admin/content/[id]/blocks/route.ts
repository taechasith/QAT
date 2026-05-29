import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { isAdminEmail } from "@/lib/auth/admin";
import type { Block } from "@/lib/types/blocks";

type Params = { params: Promise<{ id: string }> };

export async function PATCH(request: Request, { params }: Params) {
  // Auth check with session client
  const authClient = await createClient();
  const {
    data: { user },
  } = await authClient.auth.getUser();

  if (!user || !isAdminEmail(user.email)) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const { id } = await params;
  const body = await request.json().catch(() => null);
  const blocks: Block[] = Array.isArray(body?.blocks) ? body.blocks : [];
  const blocksTh: Block[] = Array.isArray(body?.blocks_th) ? body.blocks_th : [];

  const db = createAdminClient();
  const { data: existing, error: readError } = await db
    .from("content_items")
    .select("metadata")
    .eq("id", id)
    .maybeSingle();

  if (readError) return NextResponse.json({ error: readError.message }, { status: 500 });

  const metadata = ((existing?.metadata as Record<string, unknown> | null) ?? {});
  if (blocksTh.length > 0) metadata.body_blocks_th = blocksTh;
  else delete metadata.body_blocks_th;

  const { error } = await db
    .from("content_items")
    .update({ body_blocks: blocks, metadata, updated_by: user.id })
    .eq("id", id);

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ ok: true });
}
