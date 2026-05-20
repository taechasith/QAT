"use client";

import dynamic from "next/dynamic";
import { Suspense } from "react";

import type { ContentItem } from "@/lib/data/content";

import { ThreeErrorBoundary } from "@/components/three/ThreeErrorBoundary";

import { FinalPortal } from "./FinalPortal";
import { MissionSection } from "./MissionSection";

const QuantumHeroScene = dynamic(
  () =>
    import("@/components/three/QuantumHeroScene").then(
      (m) => m.QuantumHeroScene,
    ),
  { ssr: false },
);

type QuantumLandingProps = {
  featuredItems: ContentItem[];
  featuredError?: string;
  upcomingTitle: string;
  emptyState: string;
};

export function QuantumLanding({
  featuredItems,
  featuredError,
  upcomingTitle,
  emptyState,
}: QuantumLandingProps) {
  return (
    <div className="relative text-foreground">
      {/* 3D scene — fixed full-page background */}
      <div
        className="pointer-events-none fixed inset-0 -z-20"
        aria-hidden="true"
      >
        <ThreeErrorBoundary fallback={null}>
          <Suspense fallback={null}>
            <QuantumHeroScene />
          </Suspense>
        </ThreeErrorBoundary>
      </div>

      {/* ambient gradient over 3D + bottom fade into dark */}
      <div
        className="pointer-events-none fixed inset-0 -z-10"
        aria-hidden="true"
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_22%_18%,rgba(34,211,238,0.14),transparent_32%),radial-gradient(circle_at_78%_12%,rgba(139,92,246,0.12),transparent_30%)]" />
        <div className="absolute bottom-0 left-0 right-0 h-[55vh] bg-gradient-to-t from-background via-background/80 to-transparent" />
      </div>

      {/* hero — transparent, text over 3D */}
      <section
        aria-label="Hero"
        className="relative flex min-h-svh flex-col items-center justify-center px-5 py-28 text-center sm:px-8 lg:px-10"
      >
        <div className="max-w-4xl">
          <p className="font-mono text-xs font-semibold uppercase tracking-[0.32em] text-cyan-200">
            CreativeLabTH Group International Initiative
          </p>
          <h1 className="mt-5 text-5xl font-semibold tracking-tight text-white sm:text-6xl lg:text-7xl">
            Quantum Art Thailand Association
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-slate-300">
            A public platform connecting quantum science, art, interaction, and
            future culture — where the hardest ideas become the most human.
          </p>
          <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
            <a
              href="#mission"
              className="inline-flex h-11 items-center rounded-full bg-cyan-200 px-6 text-sm font-semibold text-slate-950 transition hover:bg-cyan-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300"
            >
              Discover the mission
            </a>
            <a
              href="#portal"
              className="inline-flex h-11 items-center rounded-full border border-white/20 bg-white/[0.06] px-6 text-sm font-semibold text-white backdrop-blur-sm transition hover:bg-white/12 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300"
            >
              Explore destinations
            </a>
          </div>
        </div>

        {/* scroll hint */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-40">
          <span className="font-mono text-[0.6rem] uppercase tracking-[0.3em] text-slate-300">
            Scroll to explore
          </span>
          <div className="h-8 w-px bg-gradient-to-b from-slate-300 to-transparent" />
        </div>
      </section>

      {/* mission — dark bg so 3D fades behind */}
      <div className="relative bg-background">
        <MissionSection />
      </div>

      {/* portal */}
      <div className="relative bg-background">
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
