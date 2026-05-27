import type { ContentItem } from "@/lib/data/content";
import { getTranslations } from "@/lib/i18n/locale";

import { QuantumHeroClient } from "./QuantumHeroClient";
import { FinalPortal } from "./FinalPortal";
import { MissionSection } from "./MissionSection";

type QuantumLandingProps = {
  featuredItems: ContentItem[];
  featuredError?: string;
  upcomingTitle: string;
  emptyState: string;
};

export async function QuantumLanding({
  featuredItems,
  featuredError,
  upcomingTitle,
  emptyState,
}: QuantumLandingProps) {
  const tr = await getTranslations();
  const h = tr.hero;

  return (
    <div className="relative text-foreground">
      <div
        className="pointer-events-none fixed inset-0 -z-20"
        aria-hidden="true"
      >
        <QuantumHeroClient />
      </div>

      <div
        className="pointer-events-none fixed inset-0 -z-10"
        aria-hidden="true"
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_22%_18%,rgba(34,211,238,0.14),transparent_32%),radial-gradient(circle_at_78%_12%,rgba(139,92,246,0.12),transparent_30%)]" />
        <div className="absolute bottom-0 left-0 right-0 h-[55vh] bg-gradient-to-t from-background via-background/80 to-transparent" />
      </div>

      <section
        aria-label="Hero"
        className="relative flex min-h-svh flex-col items-center justify-center px-5 py-28 text-center sm:px-8 lg:px-10"
      >
        <div className="max-w-4xl">
          <p className="font-mono text-xs font-semibold tracking-[0.32em] text-primary">
            {h.eyebrow}
          </p>
          <h1 className="mt-5 text-5xl font-semibold tracking-tight text-white sm:text-6xl lg:text-7xl">
            {h.title}
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-foreground/70">
            {h.description}
          </p>
          <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
            <a
              href="#mission"
              className="inline-flex h-11 items-center rounded-full bg-primary px-6 text-sm font-semibold text-slate-950 transition-all duration-200 hover:bg-primary/90 hover:scale-[1.04] hover:shadow-[0_0_32px_rgba(212,168,50,0.35)] active:scale-[0.97] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
            >
              {h.discoverMission}
            </a>
            <a
              href="#portal"
              className="inline-flex h-11 items-center rounded-full border border-white/20 bg-white/[0.06] px-6 text-sm font-semibold text-white backdrop-blur-sm transition-all duration-200 hover:bg-white/12 hover:border-white/35 hover:scale-[1.04] active:scale-[0.97] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
            >
              {h.exploreDestinations}
            </a>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-40">
          <span className="font-mono text-[0.6rem] uppercase tracking-[0.3em] text-foreground/70">
            {h.scrollHint}
          </span>
          <div className="h-8 w-px bg-gradient-to-b from-slate-300 to-transparent" />
        </div>
      </section>

      <div className="relative">
        <MissionSection />
      </div>

      <div className="relative">
        <FinalPortal
          featuredItems={featuredItems}
          featuredError={featuredError}
          upcomingTitle={upcomingTitle}
          emptyState={emptyState}
        />
      </div>
    </div>
  );
}
