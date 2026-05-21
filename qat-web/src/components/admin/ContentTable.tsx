import Link from "next/link";
import { Edit, ExternalLink, Eye, Heart, LayoutTemplate, MessageCircle } from "lucide-react";

type ContentRow = {
  id: string;
  content_type: string;
  status: string;
  title: string;
  slug: string;
  updated_at: string;
  view_count?: number;
  content_likes?: { count: number }[];
  content_comments?: { count: number }[];
};

type ContentTableProps = {
  items: ContentRow[];
};

const statusColors: Record<string, string> = {
  published: "bg-green-400/15 text-green-300",
  draft: "bg-amber-400/15 text-amber-300",
  archived: "bg-slate-400/15 text-slate-300",
};

function n(val: number | undefined) {
  return (val ?? 0).toLocaleString();
}

export function ContentTable({ items }: ContentTableProps) {
  if (items.length === 0) {
    return (
      <div className="glass-panel rounded-xl p-8 text-center">
        <p className="text-slate-300">No content yet.</p>
        <Link
          href="/admin/content/new"
          className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-cyan-200 hover:text-white"
        >
          Create the first item
        </Link>
      </div>
    );
  }

  return (
    <div className="glass-panel overflow-hidden rounded-xl">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-white/10">
            <th className="px-4 py-3 text-left font-medium text-slate-400">Title</th>
            <th className="hidden px-4 py-3 text-left font-medium text-slate-400 sm:table-cell">Type</th>
            <th className="hidden px-4 py-3 text-left font-medium text-slate-400 md:table-cell">Status</th>
            <th className="hidden px-4 py-3 text-left font-medium text-slate-400 xl:table-cell">Stats</th>
            <th className="hidden px-4 py-3 text-left font-medium text-slate-400 lg:table-cell">Updated</th>
            <th className="px-4 py-3" />
          </tr>
        </thead>
        <tbody>
          {items.map((item) => {
            const likeCount = Number(item.content_likes?.[0]?.count ?? 0);
            const commentCount = Number(item.content_comments?.[0]?.count ?? 0);
            const viewCount = item.view_count ?? 0;

            return (
              <tr key={item.id} className="border-b border-white/5 hover:bg-white/[0.03]">
                <td className="px-4 py-3 font-medium text-white">{item.title}</td>
                <td className="hidden px-4 py-3 font-mono text-xs uppercase tracking-widest text-slate-400 sm:table-cell">
                  {item.content_type.replace("_", " ")}
                </td>
                <td className="hidden px-4 py-3 md:table-cell">
                  <span
                    className={`rounded-full px-2 py-0.5 text-xs font-medium capitalize ${statusColors[item.status] ?? "bg-slate-400/15 text-slate-300"}`}
                  >
                    {item.status}
                  </span>
                </td>
                <td className="hidden px-4 py-3 xl:table-cell">
                  <div className="flex items-center gap-3 text-xs text-slate-400">
                    <span className="inline-flex items-center gap-1" title="Views">
                      <Eye className="size-3.5 text-slate-500" aria-hidden="true" />
                      {n(viewCount)}
                    </span>
                    <span className="inline-flex items-center gap-1" title="Likes">
                      <Heart className="size-3.5 text-slate-500" aria-hidden="true" />
                      {n(likeCount)}
                    </span>
                    <span className="inline-flex items-center gap-1" title="Comments">
                      <MessageCircle className="size-3.5 text-slate-500" aria-hidden="true" />
                      {n(commentCount)}
                    </span>
                  </div>
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
                      href={`/admin/content/${item.id}/blocks`}
                      className="rounded p-1.5 text-slate-400 transition hover:text-violet-300"
                      title="Edit page content (blocks)"
                    >
                      <LayoutTemplate className="size-4" aria-hidden="true" />
                    </Link>
                    <Link
                      href={`/admin/content/${item.id}/edit`}
                      className="rounded p-1.5 text-slate-400 transition hover:text-cyan-200"
                      title="Edit metadata"
                    >
                      <Edit className="size-4" aria-hidden="true" />
                    </Link>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
