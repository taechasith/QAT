import { notFound } from "next/navigation";
import { requireAdmin } from "@/components/admin/AdminGuard";
import { AdminShell } from "@/components/admin/AdminShell";
import { ContentEditorForm } from "@/components/admin/ContentEditorForm";
import { getContentById } from "@/lib/data/admin-content";

type EditContentPageProps = {
  params: Promise<{ id: string }>;
};

export default async function EditContentPage({ params }: EditContentPageProps) {
  await requireAdmin();
  const { id } = await params;
  const { item, error } = await getContentById(id);

  if (!item || error) notFound();

  return (
    <AdminShell>
      <div className="mb-8">
        <p className="font-mono text-xs font-semibold uppercase tracking-[0.28em] text-violet-300">
          Admin CMS
        </p>
        <h1 className="mt-1 text-3xl font-semibold text-white">Edit content</h1>
        <p className="mt-1 text-sm text-slate-400">ID: {id}</p>
      </div>
      <ContentEditorForm
        mode="edit"
        itemId={id}
        defaultValues={{
          content_type: item.content_type,
          status: item.status,
          title: item.title,
          slug: item.slug,
          excerpt: item.excerpt ?? "",
          body_md: item.body_md ?? "",
          cover_image_url: item.cover_image_url ?? "",
          external_url: item.external_url ?? "",
          location: item.location ?? "",
          start_at: item.start_at ? item.start_at.slice(0, 16) : "",
          end_at: item.end_at ? item.end_at.slice(0, 16) : "",
          sort_order: item.sort_order,
        }}
        defaultBodyBlocks={Array.isArray(item.body_blocks) ? item.body_blocks : []}
      />
    </AdminShell>
  );
}
