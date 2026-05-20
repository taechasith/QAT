import {
  BookOpen,
  Gamepad2,
  Globe,
  GraduationCap,
  Layers,
  Newspaper,
} from "lucide-react";

import type { ContentItem } from "@/lib/data/content";

import { PortalCard } from "./PortalCard";
import { UpcomingHighlights } from "./UpcomingHighlights";

const destinations = [
  {
    title: "Atlas",
    description:
      "Explore the interactive quantum knowledge atlas — an external creative project by CreativeLabTH Group.",
    href: "https://qatatlas.creativelabth.com",
    icon: Globe,
    external: true as const,
    badge: "External",
  },
  {
    title: "Game",
    description: "Interactive quantum learning experiences and creative experiments.",
    href: "/game",
    icon: Gamepad2,
  },
  {
    title: "Course",
    description: "Quantum science and creative technology courses for all levels.",
    href: "/course",
    icon: GraduationCap,
  },
  {
    title: "Exhibition",
    description: "Archive of past QAT exhibitions, installations, and art events.",
    href: "/exhibition",
    icon: Layers,
  },
  {
    title: "Research & Articles",
    description: "Academic papers, essays, and research notes from QAT collaborators.",
    href: "/research",
    icon: BookOpen,
  },
  {
    title: "News",
    description: "Latest updates, announcements, and stories from Quantum Art Thailand.",
    href: "/news",
    icon: Newspaper,
  },
];

type FinalPortalProps = {
  featuredItems: ContentItem[];
  featuredError?: string;
  upcomingTitle: string;
  emptyState: string;
};

export function FinalPortal({
  featuredItems,
  featuredError,
  upcomingTitle,
  emptyState,
}: FinalPortalProps) {
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
        <p className="font-mono text-xs font-semibold uppercase tracking-[0.28em] text-violet-200">
          Six destinations
        </p>
        <h2 className="mt-3 text-3xl font-semibold tracking-tight text-white sm:text-4xl">
          Where do you want to go?
        </h2>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {destinations.map((dest) => (
            <PortalCard key={dest.title} {...dest} />
          ))}
        </div>
      </div>
    </section>
  );
}
