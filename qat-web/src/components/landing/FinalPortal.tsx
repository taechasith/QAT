import {
  BookOpen,
  FlaskConical,
  Gamepad2,
  Globe,
  GraduationCap,
  Layers,
  Mic2,
  Newspaper,
  Video,
} from "lucide-react";

import type { ContentItem } from "@/lib/data/content";
import { getTranslations } from "@/lib/i18n/locale";

import { PortalCard } from "./PortalCard";
import { UpcomingHighlights } from "./UpcomingHighlights";

const DESTINATION_META = [
  { href: "https://qatatlas.creativelabth.com", icon: Globe, external: true as const },
  { href: "/game", icon: Gamepad2 },
  { href: "/course", icon: GraduationCap },
  { href: "/exhibition", icon: Layers },
  { href: "/research", icon: BookOpen },
  { href: "/news", icon: Newspaper },
  { href: "/talk", icon: Mic2 },
  { href: "/experiment", icon: FlaskConical },
  { href: "/video", icon: Video },
];

type FinalPortalProps = {
  featuredItems: ContentItem[];
  featuredError?: string;
  upcomingTitle: string;
  emptyState: string;
};

export async function FinalPortal({
  featuredItems,
  featuredError,
  upcomingTitle,
  emptyState,
}: FinalPortalProps) {
  const tr = await getTranslations();
  const p = tr.portal;

  const destinations = p.destinations.map((d, i) => ({
    ...DESTINATION_META[i],
    title: d.title,
    description: d.description,
    badge: "badge" in d ? d.badge : undefined,
  }));

  return (
    <section
      id="portal"
      className="relative mx-auto w-full max-w-7xl px-5 pb-24 sm:px-8 lg:px-10"
    >
      <UpcomingHighlights
        items={featuredItems}
        error={featuredError}
        upcomingTitle={upcomingTitle}
        emptyState={emptyState}
      />

      <div className="mt-24">
        <p className="font-mono text-xs font-semibold uppercase tracking-[0.28em] text-accent">
          {p.eyebrow}
        </p>
        <h2 className="mt-3 text-3xl font-semibold tracking-tight text-white sm:text-4xl">
          {p.heading}
        </h2>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {destinations.map((dest) => (
            <PortalCard
              key={dest.href}
              {...dest}
              actionLabel={"external" in dest && dest.external ? p.visit : p.explore}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
