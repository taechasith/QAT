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
  {
    title: "Talk",
    description: "Lectures, discussions, and conversations at the intersection of quantum science and culture.",
    href: "/talk",
    icon: Mic2,
  },
  {
    title: "Experiment",
    description: "Interactive and conceptual experiments exploring quantum phenomena through art and design.",
    href: "/experiment",
    icon: FlaskConical,
  },
  {
    title: "Video",
    description: "Documentary, artistic, and educational video works produced under the QAT initiative.",
    href: "/video",
    icon: Video,
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
          Nine destinations
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
