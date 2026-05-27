import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { AdminNav } from "./AdminNav";
import { getTranslations } from "@/lib/i18n/locale";

type AdminShellProps = {
  children: React.ReactNode;
};

export async function AdminShell({ children }: AdminShellProps) {
  const tr = await getTranslations();

  return (
    <div className="mx-auto flex w-full max-w-[1440px] gap-8 px-5 py-10 sm:px-8 lg:px-12">
      <aside className="hidden w-56 shrink-0 lg:block xl:w-64">
        <div className="glass-panel rounded-xl p-3">
          <p className="px-3 pt-1 font-mono text-xs font-semibold uppercase tracking-widest text-accent">
            {tr.admin.title}
          </p>
          <AdminNav />
          <div className="mt-2 border-t border-white/10 pt-3">
            <Link
              href="/"
              className="flex items-center gap-2 rounded-lg px-3 py-2 text-xs text-muted-foreground transition hover:text-foreground"
            >
              <ArrowLeft className="size-3.5" aria-hidden="true" />
              {tr.admin.nav.backToSite}
            </Link>
          </div>
        </div>
      </aside>
      <main className="min-w-0 flex-1">{children}</main>
    </div>
  );
}

