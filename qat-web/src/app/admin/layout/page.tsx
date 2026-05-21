import Link from "next/link";
import { Edit, ExternalLink, LayoutTemplate, Plus } from "lucide-react";

import { requireAdmin } from "@/components/admin/AdminGuard";
import { AdminShell } from "@/components/admin/AdminShell";
import { listAllContent } from "@/lib/data/admin-content";

type LayoutRow = {
  id: string;
  content_type: string;
  status: string;
  title: string;
  slug: string;
  updated_at: string;
};

const statusColors: Record<string, string> = {
  published: "bg-green-400/15 text-green-300",
  draft: "bg-amber-400/15 text-amber-300",
  archived: "bg-slate-400/15 text-slate-300",
};

export default async function AdminLayoutPage() {
  await requireAdmin();
  const { items, error } = await listAllContent();
  const rows = items as LayoutRow[];

  return (
    <AdminShell>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="font-mono text-xs font-semibold uppercase tracking-[0.28em] text-violet-300">
            Admin CMS
          </p>
          <h1 className="mt-1 text-3xl font-semibold text-white">Page layouts</h1>
        </div>
        <Link
          href="/admin/content/new"
          className="inline-flex h-10 items-center gap-2 rounded-full bg-cyan-200 px-4 text-sm font-semibold text-slate-950 transition hover:bg-cyan-100"
        >
          <Plus className="size-4" aria-hidden="true" />
          New content
        </Link>
      </div>

      {error ? (
        <p className="mt-4 rounded-lg border border-red-400/20 bg-red-400/10 px-3 py-2 text-sm text-red-300">
          {error}
        </p>
      ) : null}

      <div className="mt-8 glass-panel overflow-hidden rounded-xl">
        {rows.length === 0 ? (
          <div className="p-8 text-center">
            <p className="text-sm text-slate-300">No content pages yet.</p>
            <Link
              href="/admin/content/new"
              className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-cyan-200 hover:text-white"
            >
              Create content
            </Link>
          </div>
        ) : (
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-white/10">
                <th className="px-4 py-3 text-left font-medium text-slate-400">Page</th>
                <th className="hidden px-4 py-3 text-left font-medium text-slate-400 sm:table-cell">
                  Type
                </th>
                <th className="hidden px-4 py-3 text-left font-medium text-slate-400 md:table-cell">
                  Status
                </th>
                <th className="hidden px-4 py-3 text-left font-medium text-slate-400 lg:table-cell">
                  Updated
                </th>
                <th className="px-4 py-3" />
              </tr>
            </thead>
            <tbody>
              {rows.map((item) => (
                <tr key={item.id} className="border-b border-white/5 hover:bg-white/[0.03]">
                  <td className="px-4 py-3">
                    <p className="font-medium text-white">{item.title}</p>
                    <p className="mt-0.5 font-mono text-xs text-slate-500">/{item.slug}</p>
                  </td>
                  <td className="hidden px-4 py-3 font-mono text-xs uppercase tracking-widest text-slate-400 sm:table-cell">
                    {item.content_type.replace("_", " ")}
                  </td>
                  <td className="hidden px-4 py-3 md:table-cell">
                    <span
                      className={`rounded-full px-2 py-0.5 text-xs font-medium capitalize ${
                        statusColors[item.status] ?? "bg-slate-400/15 text-slate-300"
                      }`}
                    >
                      {item.status}
                    </span>
                  </td>
                  <td className="hidden px-4 py-3 text-slate-400 lg:table-cell">
                    {new Date(item.updated_at).toLocaleDateString()}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center justify-end gap-2">
                      <Link
                        href={`/content/${item.slug}`}
                        target="_blank"
                        rel="noreferrer"
                        className="rounded p-1.5 text-slate-400 transition hover:text-white"
                        title="View public page"
                      >
                        <ExternalLink className="size-4" aria-hidden="true" />
                      </Link>
                      <Link
                        href={`/admin/content/${item.id}/edit`}
                        className="rounded p-1.5 text-slate-400 transition hover:text-cyan-200"
                        title="Edit details"
                      >
                        <Edit className="size-4" aria-hidden="true" />
                      </Link>
                      <Link
                        href={`/admin/content/${item.id}/blocks`}
                        className="inline-flex h-9 items-center gap-2 rounded-lg bg-violet-200/10 px-3 text-xs font-semibold text-violet-100 transition hover:bg-violet-200/15"
                      >
                        <LayoutTemplate className="size-4" aria-hidden="true" />
                        Edit layout
                      </Link>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </AdminShell>
  );
}
