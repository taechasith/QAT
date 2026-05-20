import { requireAdmin } from "@/components/admin/AdminGuard";
import { AdminShell } from "@/components/admin/AdminShell";
import { ContentEditorForm } from "@/components/admin/ContentEditorForm";

export default async function NewContentPage() {
  await requireAdmin();

  return (
    <AdminShell>
      <div className="mb-8">
        <p className="font-mono text-xs font-semibold uppercase tracking-[0.28em] text-violet-300">
          Admin CMS
        </p>
        <h1 className="mt-1 text-3xl font-semibold text-white">New content</h1>
        <p className="mt-2 text-sm text-slate-300">
          Fill in the details below. Save as draft until you are ready to publish.
        </p>
      </div>
      <ContentEditorForm mode="create" />
    </AdminShell>
  );
}
