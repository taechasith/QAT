import Link from "next/link";
import type { LucideIcon } from "lucide-react";
import { ArrowUpRight } from "lucide-react";

type PortalCardProps = {
  title: string;
  description: string;
  href: string;
  icon: LucideIcon;
  external?: boolean;
  badge?: string;
};

export function PortalCard({
  title,
  description,
  href,
  icon: Icon,
  external,
  badge,
}: PortalCardProps) {
  return (
    <Link
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noreferrer" : undefined}
      className="glass-panel group flex flex-col gap-4 rounded-xl p-6 transition-all hover:border-cyan-200/25 hover:bg-white/[0.08] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300"
    >
      <div className="flex items-start justify-between">
        <div className="flex size-10 items-center justify-center rounded-lg border border-white/10 bg-white/5">
          <Icon className="size-5 text-cyan-200" aria-hidden="true" />
        </div>
        {badge ? (
          <span className="font-mono text-xs uppercase tracking-widest text-violet-300">
            {badge}
          </span>
        ) : null}
      </div>
      <div className="flex-1">
        <h3 className="text-lg font-semibold text-white">{title}</h3>
        <p className="mt-1.5 text-sm leading-6 text-slate-400">{description}</p>
      </div>
      <div className="flex items-center gap-1.5 text-sm font-medium text-cyan-100 transition-colors group-hover:text-white">
        {external ? "Visit" : "Explore"}
        <ArrowUpRight
          className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
          aria-hidden="true"
        />
      </div>
    </Link>
  );
}
