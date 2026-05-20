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
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_25%_0%,rgba(34,211,238,0.18),transparent_32%),radial-gradient(circle_at_84%_8%,rgba(139,92,246,0.16),transparent_28%)]" />
      <section className="relative mx-auto w-full max-w-7xl px-5 py-14 sm:px-8 lg:px-10">
        <p className="font-mono text-xs font-semibold uppercase tracking-[0.28em] text-cyan-200">
          {eyebrow}
        </p>
        <h1 className="mt-4 max-w-3xl text-4xl font-semibold tracking-tight text-white sm:text-5xl">
          {title}
        </h1>
        <p className="mt-4 max-w-2xl text-base leading-7 text-slate-300">
          {description}
        </p>
        <div className="mt-10">{children}</div>
      </section>
    </div>
  );
}
