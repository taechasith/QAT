/* Hallmark · genre: atmospheric · macrostructure: Catalogue · design-system: design.md · designed-as-app */
import type { ReactNode } from "react";

type PublicPageShellProps = {
  eyebrow: string;
  title: string;
  description: string;
  children: ReactNode;
};

export function PublicPageShell({
  eyebrow,
  title,
  description,
  children,
}: PublicPageShellProps) {
  return (
    <div className="relative overflow-hidden bg-background text-foreground">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_15%_0%,rgba(34,211,238,0.13),transparent_42%),radial-gradient(ellipse_at_82%_12%,rgba(139,92,246,0.11),transparent_36%)]" />

      {/* Catalogue header: title left / description right at lg+ */}
      <header className="relative mx-auto w-full max-w-7xl px-5 pb-10 pt-16 sm:px-8 lg:px-10">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between lg:gap-24">
          <div className="flex-none">
            <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.32em] text-cyan-200/75">
              {eyebrow}
            </p>
            <h1 className="mt-3 text-4xl font-semibold tracking-tight text-white sm:text-5xl lg:text-[3.25rem]">
              {title}
            </h1>
          </div>
          <p className="max-w-sm text-sm leading-7 text-slate-400 lg:text-right">
            {description}
          </p>
        </div>
        <div className="mt-10 h-px bg-gradient-to-r from-white/14 via-white/5 to-transparent" />
      </header>

      <section className="relative mx-auto w-full max-w-7xl px-5 pb-20 sm:px-8 lg:px-10">
        {children}
      </section>
    </div>
  );
}
