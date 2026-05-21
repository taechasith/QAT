"use client";

import dynamic from "next/dynamic";
import { Suspense } from "react";

import { ThreeErrorBoundary } from "@/components/three/ThreeErrorBoundary";

const QuantumHeroScene = dynamic(
  () =>
    import("@/components/three/QuantumHeroScene").then(
      (m) => m.QuantumHeroScene,
    ),
  { ssr: false },
);

export function QuantumHeroClient() {
  return (
    <ThreeErrorBoundary fallback={null}>
      <Suspense fallback={null}>
        <QuantumHeroScene />
      </Suspense>
    </ThreeErrorBoundary>
  );
}
