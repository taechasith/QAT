import Link from "next/link";
import {
  LayoutDashboard,
  FileText,
  LayoutTemplate,
  Bell,
  Settings,
} from "lucide-react";
import { getTranslations } from "@/lib/i18n/locale";

export async function AdminNav() {
  const tr = await getTranslations();

  const links = [
    { href: "/admin", label: tr.admin.nav.dashboard, icon: LayoutDashboard },
    { href: "/admin/content", label: tr.admin.nav.content, icon: FileText },
    { href: "/admin/layout", label: tr.admin.nav.layouts, icon: LayoutTemplate },
    { href: "/admin/notifications", label: tr.admin.nav.notifications, icon: Bell },
    { href: "/admin/settings", label: tr.admin.nav.settings, icon: Settings },
  ];

  return (
    <nav
      aria-label="Admin navigation"
      className="flex flex-col gap-1 py-4"
    >
      {links.map(({ href, label, icon: Icon }) => (
        <Link
          key={href}
          href={href}
          className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-slate-300 transition hover:bg-white/8 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300"
        >
          <Icon className="size-4 shrink-0 text-cyan-200" aria-hidden="true" />
          {label}
        </Link>
      ))}
    </nav>
  );
}

