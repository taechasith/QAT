import Link from "next/link";
import { 
  FileText, 
  Bell, 
  Settings, 
  Plus, 
  LayoutTemplate, 
  Eye, 
  FileCode, 
  ArrowRight,
  TrendingUp,
  User,
  Shield,
  Layers,
  Edit2
} from "lucide-react";
import { requireAdmin } from "@/components/admin/AdminGuard";
import { AdminShell } from "@/components/admin/AdminShell";
import { getTranslations, getLocale } from "@/lib/i18n/locale";
import { listAllContent } from "@/lib/data/admin-content";

export default async function AdminPage() {
  const user = await requireAdmin();
  const tr = await getTranslations();
  const locale = await getLocale();
  const { items = [] } = await listAllContent();

  // Cast items to include view_count and updated_at to resolve TS compiler errors
  const typedItems = items as Array<{
    id: string;
    content_type: string;
    status: "published" | "draft" | "archived";
    slug: string;
    title: string;
    view_count?: number | null;
    updated_at: string;
  }>;

  const totalItems = typedItems.length;
  const publishedCount = typedItems.filter(i => i.status === "published").length;
  const draftCount = typedItems.filter(i => i.status === "draft").length;
  const totalViews = typedItems.reduce((sum, item) => sum + (item.view_count || 0), 0);
  const categoryGuides = tr.admin.form.categoryGuides as Record<
    string,
    { label: string }
  >;

  // Take the 5 most recently updated items
  const recentItems = typedItems.slice(0, 5);

  const stats = [
    { 
      label: tr.admin.dashboard.stats.total, 
      value: totalItems, 
      icon: Layers, 
      color: "text-cyan-400 border-cyan-400/20 bg-cyan-400/5",
      hoverColor: "hover:border-cyan-400/40 hover:shadow-[0_0_30px_rgba(34,211,238,0.08)]",
      iconBg: "bg-cyan-500/10 text-cyan-400 border border-cyan-500/20"
    },
    { 
      label: tr.admin.dashboard.stats.published, 
      value: publishedCount, 
      icon: FileText, 
      color: "text-emerald-400 border-emerald-400/20 bg-emerald-400/5",
      hoverColor: "hover:border-emerald-400/40 hover:shadow-[0_0_30px_rgba(52,211,153,0.08)]",
      iconBg: "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
    },
    { 
      label: tr.admin.dashboard.stats.drafts, 
      value: draftCount, 
      icon: FileCode, 
      color: "text-amber-400 border-amber-400/20 bg-amber-400/5",
      hoverColor: "hover:border-amber-400/40 hover:shadow-[0_0_30px_rgba(251,191,36,0.08)]",
      iconBg: "bg-amber-500/10 text-amber-400 border border-amber-500/20"
    },
    { 
      label: tr.admin.dashboard.stats.views, 
      value: totalViews, 
      icon: Eye, 
      color: "text-violet-400 border-violet-400/20 bg-violet-400/5",
      hoverColor: "hover:border-violet-400/40 hover:shadow-[0_0_30px_rgba(167,139,250,0.08)]",
      iconBg: "bg-violet-500/10 text-violet-400 border border-violet-500/20"
    },
  ];

  const quickActions = [
    {
      href: "/admin/content",
      icon: FileText,
      label: tr.admin.dashboard.quickLinks.allContent,
    },
    {
      href: "/admin/layout",
      icon: LayoutTemplate,
      label: tr.admin.dashboard.quickLinks.pageLayouts,
    },
    {
      href: "/admin/notifications",
      icon: Bell,
      label: tr.admin.dashboard.quickLinks.sendNotification,
    },
    {
      href: "/admin/settings",
      icon: Settings,
      label: tr.admin.dashboard.quickLinks.settings,
    },
  ];

  const formatDate = (dateStr: string) => {
    const d = new Date(dateStr);
    return d.toLocaleDateString(locale === "th" ? "th-TH" : "en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const getStatusBadgeClass = (status: string) => {
    switch (status) {
      case "published":
        return "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20";
      case "draft":
        return "bg-amber-500/10 text-amber-400 border border-amber-500/20";
      default:
        return "bg-slate-500/10 text-slate-400 border border-slate-500/20";
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case "published":
        return tr.admin.form.published;
      case "draft":
        return tr.admin.form.draft;
      default:
        return tr.admin.form.archived;
    }
  };

  return (
    <AdminShell>
      <div className="space-y-6">
        <div className="flex flex-col gap-4 rounded-2xl border border-white/10 bg-white/[0.035] p-5 sm:p-6 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="font-mono text-xs font-semibold uppercase tracking-[0.28em] text-violet-300">
              {tr.admin.title}
            </p>
            <h1 className="mt-2 text-3xl font-bold tracking-tight text-white sm:text-4xl">
              {tr.admin.dashboard.title}
            </h1>
          </div>
          <div className="flex items-center gap-3 self-start md:self-auto">
            <Link
              href="/admin/content/new"
              className="glass-panel hover:bg-violet-500/25 flex items-center gap-2 rounded-xl bg-violet-500/10 px-4 py-2.5 text-sm font-semibold text-violet-200 border-violet-500/30 transition hover:border-violet-400/50"
            >
              <Plus className="size-4" />
              {tr.admin.dashboard.quickLinks.newContent}
            </Link>
          </div>
        </div>

        <div className="grid gap-6 xl:grid-cols-12">
          <div className="xl:col-span-8">
            <div className="glass-panel rounded-2xl p-6 h-full flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-2">
                    <TrendingUp className="size-4 text-cyan-400" />
                    <h2 className="text-lg font-semibold text-white">
                      {tr.admin.dashboard.recentActivity}
                    </h2>
                  </div>
                  <Link
                    href="/admin/content"
                    className="flex items-center gap-1.5 text-xs text-cyan-400 hover:text-cyan-300 transition"
                  >
                    {tr.admin.dashboard.quickLinks.allContent} <ArrowRight className="size-3" />
                  </Link>
                </div>

                {recentItems.length === 0 ? (
                  <div className="py-12 text-center text-sm text-slate-500">
                    {locale === "th" ? "ไม่มีความเคลื่อนไหวล่าสุดในระบบ" : "No recent activity recorded."}
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse text-sm">
                      <thead>
                        <tr className="border-b border-white/5 text-slate-400 text-xs uppercase tracking-wider">
                          <th className="py-3 font-semibold pr-4">{tr.admin.contentList.table.title}</th>
                          <th className="py-3 font-semibold pr-4 hidden sm:table-cell">{tr.admin.contentList.table.type}</th>
                          <th className="py-3 font-semibold pr-4">{tr.admin.contentList.table.status}</th>
                          <th className="py-3 font-semibold text-right pr-4 hidden md:table-cell">{tr.admin.contentList.table.stats}</th>
                          <th className="py-3 font-semibold text-right">{tr.admin.contentList.table.updated}</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-white/5">
                        {recentItems.map((item) => (
                          <tr key={item.id} className="group hover:bg-white/[0.01] transition-colors">
                            <td className="py-3.5 pr-4 max-w-[200px] sm:max-w-[300px]">
                              <div className="flex items-center gap-3">
                                <Link
                                  href={`/admin/content/${item.id}/edit`}
                                  className="font-medium text-white group-hover:text-cyan-300 transition line-clamp-1"
                                >
                                  {item.title || tr.admin.form.untitled}
                                </Link>
                              </div>
                            </td>
                            <td className="py-3.5 pr-4 hidden sm:table-cell text-slate-300 font-mono text-xs">
                              {categoryGuides[item.content_type]?.label || item.content_type}
                            </td>
                            <td className="py-3.5 pr-4">
                              <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${getStatusBadgeClass(item.status)}`}>
                                {getStatusLabel(item.status)}
                              </span>
                            </td>
                            <td className="py-3.5 text-right pr-4 hidden md:table-cell text-slate-400 font-mono text-xs">
                              {item.view_count || 0} {locale === "th" ? "ครั้ง" : "views"}
                            </td>
                            <td className="py-3.5 text-right text-slate-400 font-mono text-xs">
                              <div className="flex items-center justify-end gap-3">
                                <span>{formatDate(item.updated_at)}</span>
                                <Link
                                  href={`/admin/content/${item.id}/edit`}
                                  className="opacity-0 group-hover:opacity-100 flex size-7 items-center justify-center rounded-lg bg-white/5 border border-white/10 text-slate-300 hover:text-white transition"
                                  title="Edit"
                                >
                                  <Edit2 className="size-3.5" />
                                </Link>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 xl:col-span-4 xl:grid-cols-1">
            <div className="glass-panel rounded-2xl p-5 sm:col-span-2 sm:p-6 xl:col-span-1">
              <div className="mb-4 flex items-center justify-between">
                <h2 className="text-lg font-semibold text-white">
                  {tr.admin.dashboard.stats.total}
                </h2>
                <span className="rounded-full border border-cyan-400/20 bg-cyan-400/10 px-2.5 py-1 font-mono text-[10px] font-semibold uppercase tracking-wider text-cyan-200">
                  {tr.admin.dashboard.title}
                </span>
              </div>
              <div className="grid grid-cols-2 gap-3">
                {stats.map((s) => {
                  const Icon = s.icon;
                  return (
                    <div
                      key={s.label}
                      className={`rounded-xl border p-4 transition-all duration-300 ${s.color} ${s.hoverColor}`}
                    >
                      <div className="mb-4 flex items-center justify-between gap-3">
                        <p className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">{s.label}</p>
                        <div className={`flex size-8 shrink-0 items-center justify-center rounded-lg ${s.iconBg}`}>
                          <Icon className="size-4" />
                        </div>
                      </div>
                      <h3 className="text-2xl font-extrabold tracking-tight text-white">
                        {typeof s.value === "number" ? s.value.toLocaleString() : s.value}
                      </h3>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="glass-panel rounded-2xl p-5 sm:p-6">
              <h2 className="text-lg font-semibold text-white mb-4">
                {tr.admin.dashboard.quickActions}
              </h2>
              <div className="flex flex-col gap-2.5">
                {quickActions.map((action) => {
                  const Icon = action.icon;
                  return (
                    <Link
                      key={action.href}
                      href={action.href}
                      className="group flex items-center justify-between rounded-xl border border-white/5 bg-white/[0.02] p-4 transition-all hover:bg-white/[0.06] hover:border-violet-500/20"
                    >
                      <div className="flex items-center gap-3">
                        <div className="flex size-9 items-center justify-center rounded-lg bg-violet-500/10 border border-violet-500/20 text-violet-300 group-hover:bg-violet-500/20 transition-all">
                          <Icon className="size-4" />
                        </div>
                        <span className="text-sm font-medium text-slate-200 group-hover:text-white transition">
                          {action.label}
                        </span>
                      </div>
                      <ArrowRight className="size-3.5 text-slate-500 group-hover:text-white group-hover:translate-x-1 transition-all" />
                    </Link>
                  );
                })}
              </div>
            </div>

            {/* Profile Info Card */}
            <div className="glass-panel rounded-2xl p-5 sm:p-6">
              <h2 className="text-lg font-semibold text-white mb-4">
                {tr.admin.dashboard.adminProfile}
              </h2>
              <div className="flex items-center gap-4">
                <div className="flex size-12 shrink-0 items-center justify-center rounded-full border border-violet-400/20 bg-violet-400/10 text-violet-300">
                  <User className="size-6" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-semibold text-white truncate">
                    {user.email}
                  </p>
                  <div className="mt-1 flex items-center gap-1.5 text-xs text-slate-400">
                    <Shield className="size-3 text-cyan-400" />
                    <span>{tr.admin.dashboard.role}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AdminShell>
  );
}
