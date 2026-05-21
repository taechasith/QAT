import { notFound } from "next/navigation";
import { requireAdmin } from "@/components/admin/AdminGuard";
import { AdminShell } from "@/components/admin/AdminShell";
import { BlocksEditorPage } from "@/components/admin/BlocksEditorPage";
import { getContentById } from "@/lib/data/admin-content";

type Props = { params: Promise<{ id: string }> };

export default async function ContentBlocksPage({ params }: Props) {
  await requireAdmin();
  const { id } = await params;
  const { item, error } = await getContentById(id);

  if (!item || error) notFound();

  return (
    <AdminShell>
      <BlocksEditorPage
        itemId={id}
        title={item.title}
        titleTh={(item.metadata as Record<string, string> | null)?.title_th ?? ""}
        initialBlocks={Array.isArray(item.body_blocks) ? item.body_blocks : []}
        initialBlocksTh={
          Array.isArray((item.metadata as Record<string, unknown> | null)?.body_blocks_th)
            ? ((item.metadata as Record<string, unknown>).body_blocks_th as [])
            : []
        }
      />
    </AdminShell>
  );
}
