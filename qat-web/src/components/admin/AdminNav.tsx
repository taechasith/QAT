import Link from "next/link";
import {
  LayoutDashboard,
  FileText,
  Bell,
  Settings,
} from "lucide-react";

const links = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/content", label: "Content", icon: FileText },
  { href: "/admin/notifications", label: "Notifications", icon: Bell },
  { href: "/admin/settings", label: "Settings", icon: Settings },
];

export function AdminNav() {
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
