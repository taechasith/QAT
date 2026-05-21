import Link from "next/link";
import { FileText, Bell, Settings, Plus, LayoutTemplate } from "lucide-react";
import { requireAdmin } from "@/components/admin/AdminGuard";
import { AdminShell } from "@/components/admin/AdminShell";

const quickLinks = [
  {
    href: "/admin/content/new",
    icon: Plus,
    label: "New content",
    desc: "Create a draft for any category",
  },
  {
    href: "/admin/content",
    icon: FileText,
    label: "All content",
    desc: "Manage published and draft items",
  },
  {
    href: "/admin/layout",
    icon: LayoutTemplate,
    label: "Page layouts",
    desc: "Edit public page sections",
  },
  {
    href: "/admin/notifications",
    icon: Bell,
    label: "Send notification",
    desc: "Notify opted-in subscribers",
  },
  {
    href: "/admin/settings",
    icon: Settings,
    label: "Settings",
    desc: "Homepage copy and site settings",
  },
];

export default async function AdminPage() {
  const user = await requireAdmin();

  return (
    <AdminShell>
      <div>
        <p className="font-mono text-xs font-semibold uppercase tracking-[0.28em] text-violet-300">
          Admin CMS
        </p>
        <h1 className="mt-3 text-3xl font-semibold text-white">Dashboard</h1>
        <p className="mt-2 text-sm text-slate-300">
          Signed in as{" "}
          <span className="font-medium text-white">{user.email}</span>
        </p>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {quickLinks.map(({ href, icon: Icon, label, desc }) => (
            <Link
              key={href}
              href={href}
              className="glass-panel flex items-start gap-4 rounded-xl p-5 transition hover:border-violet-200/20 hover:bg-white/[0.07]"
            >
              <div className="flex size-10 shrink-0 items-center justify-center rounded-lg border border-violet-200/20 bg-violet-200/10">
                <Icon className="size-5 text-violet-200" aria-hidden="true" />
              </div>
              <div>
                <p className="font-semibold text-white">{label}</p>
                <p className="mt-0.5 text-sm text-slate-400">{desc}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </AdminShell>
  );
}
