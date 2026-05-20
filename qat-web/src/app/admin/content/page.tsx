import Link from "next/link";
import { Plus } from "lucide-react";
import { requireAdmin } from "@/components/admin/AdminGuard";
import { AdminShell } from "@/components/admin/AdminShell";
import { ContentTable } from "@/components/admin/ContentTable";
import { listAllContent } from "@/lib/data/admin-content";

export default async function AdminContentPage() {
  await requireAdmin();
  const { items, error } = await listAllContent();

  return (
    <AdminShell>
      <div className="flex items-center justify-between">
        <div>
          <p className="font-mono text-xs font-semibold uppercase tracking-[0.28em] text-violet-300">
            Admin CMS
          </p>
          <h1 className="mt-1 text-3xl font-semibold text-white">All content</h1>
        </div>
        <Link
          href="/admin/content/new"
          className="inline-flex h-10 items-center gap-2 rounded-full bg-cyan-200 px-4 text-sm font-semibold text-slate-950 transition hover:bg-cyan-100"
        >
          <Plus className="size-4" aria-hidden="true" />
          New
        </Link>
      </div>

      {error ? (
        <p className="mt-4 rounded-lg border border-red-400/20 bg-red-400/10 px-3 py-2 text-sm text-red-300">
          {error}
        </p>
      ) : null}

      <div className="mt-8">
        {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
        <ContentTable items={items as any} />
      </div>
    </AdminShell>
  );
}
