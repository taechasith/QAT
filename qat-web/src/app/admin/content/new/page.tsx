import { requireAdmin } from "@/components/admin/AdminGuard";
import { AdminShell } from "@/components/admin/AdminShell";
import { ContentEditorForm } from "@/components/admin/ContentEditorForm";
import { getTranslations } from "@/lib/i18n/locale";

export default async function NewContentPage() {
  await requireAdmin();
  const tr = await getTranslations();

  return (
    <AdminShell>
      <div className="mb-8">
        <p className="font-mono text-xs font-semibold uppercase tracking-[0.28em] text-violet-300">
          {tr.admin.title}
        </p>
        <h1 className="mt-1 text-3xl font-semibold text-white">
          {tr.admin.newContent.title}
        </h1>
        <p className="mt-2 text-sm text-slate-300">
          {tr.admin.newContent.subtitle}
        </p>
      </div>
      <ContentEditorForm mode="create" />
    </AdminShell>
  );
}

