import { NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";

type Params = { params: Promise<{ id: string }> };

export async function POST(_: Request, { params }: Params) {
  const { id } = await params;
  const db = createAdminClient();
  await db.rpc("increment_view_count", { content_id: id });
  return NextResponse.json({ ok: true });
}
