import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { AdminNav } from "./AdminNav";

type AdminShellProps = {
  children: React.ReactNode;
};

export function AdminShell({ children }: AdminShellProps) {
  return (
    <div className="mx-auto flex w-full max-w-7xl gap-8 px-5 py-10 sm:px-8 lg:px-10">
      <aside className="hidden w-52 shrink-0 lg:block">
        <div className="glass-panel rounded-xl p-3">
          <p className="px-3 pt-1 font-mono text-xs font-semibold uppercase tracking-widest text-violet-300">
            Admin CMS
          </p>
          <AdminNav />
          <div className="mt-2 border-t border-white/10 pt-3">
            <Link
              href="/"
              className="flex items-center gap-2 rounded-lg px-3 py-2 text-xs text-slate-400 transition hover:text-slate-200"
            >
              <ArrowLeft className="size-3.5" aria-hidden="true" />
              Back to site
            </Link>
          </div>
        </div>
      </aside>
      <main className="min-w-0 flex-1">{children}</main>
    </div>
  );
}
