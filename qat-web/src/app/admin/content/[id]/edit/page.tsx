import Link from "next/link";
import { notFound } from "next/navigation";
import { requireAdmin } from "@/components/admin/AdminGuard";
import { AdminShell } from "@/components/admin/AdminShell";
import { ContentEditorForm } from "@/components/admin/ContentEditorForm";
import { getContentById } from "@/lib/data/admin-content";
import { getTranslations } from "@/lib/i18n/locale";

type EditContentPageProps = {
  params: Promise<{ id: string }>;
};

export default async function EditContentPage({ params }: EditContentPageProps) {
  await requireAdmin();
  const { id } = await params;
  const { item, error } = await getContentById(id);
  const tr = await getTranslations();

  if (!item || error) notFound();

  return (
    <AdminShell>
      <div className="mb-8 flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className="font-mono text-xs font-semibold uppercase tracking-[0.28em] text-violet-300">
            {tr.admin.title}
          </p>
          <h1 className="mt-1 text-3xl font-semibold text-white">
            {tr.admin.editContent.title}
          </h1>
          <p className="mt-1 text-sm text-slate-400">ID: {id}</p>
        </div>
        <Link
          href={`/admin/content/${id}/blocks`}
          className="inline-flex h-10 items-center gap-2 rounded-full bg-cyan-200 px-5 text-sm font-semibold text-slate-950 transition hover:bg-cyan-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300"
        >
          <span>{tr.admin.editContent.editPageLayout}</span>
          <span aria-hidden="true">→</span>
        </Link>
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
          start_at: item.start_at ? item.start_at.slice(0, 10) : "",
          end_at: item.end_at ? item.end_at.slice(0, 10) : "",
          sort_order: item.sort_order,
          title_th: (item.metadata as Record<string, string> | null)?.title_th ?? "",
          excerpt_th: (item.metadata as Record<string, string> | null)?.excerpt_th ?? "",
          body_md_th: (item.metadata as Record<string, string> | null)?.body_md_th ?? "",
          cover_image_url_th: (item.metadata as Record<string, string> | null)?.cover_image_url_th ?? "",
          author_name: (item.metadata as Record<string, string> | null)?.author_name ?? "",
          author_bio: (item.metadata as Record<string, string> | null)?.author_bio ?? "",
        }}
      />
    </AdminShell>
  );
}

