import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { isAdminEmail } from "@/lib/auth/admin";
import { contentSchema } from "@/lib/validation/content";
import { createContent } from "@/lib/data/admin-content";
import type { Block } from "@/lib/types/blocks";

export async function POST(request: Request) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user || !isAdminEmail(user.email)) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const raw = await request.json().catch(() => null);
  const { body_blocks, body_blocks_th, ...rest } = raw ?? {};
  const blocks: Block[] | undefined = Array.isArray(body_blocks) ? body_blocks : undefined;
  const blocksTh: Block[] | undefined = Array.isArray(body_blocks_th) ? body_blocks_th : undefined;

  const parsed = contentSchema.safeParse(rest);
  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.issues[0]?.message ?? "Validation failed" },
      { status: 400 },
    );
  }

  const result = await createContent(user.id, parsed.data, blocks, blocksTh);
  if (result.error) {
    return NextResponse.json({ error: result.error }, { status: 500 });
  }

  revalidatePath("/");
  revalidatePath("/admin/layout");
  revalidatePath("/admin/content");

  return NextResponse.json({ id: result.id }, { status: 201 });
}
