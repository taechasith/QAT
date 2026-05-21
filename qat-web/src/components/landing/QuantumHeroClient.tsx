"use client";

import dynamic from "next/dynamic";
import { Suspense, useEffect, useState } from "react";

import { ThreeErrorBoundary } from "@/components/three/ThreeErrorBoundary";

const QuantumHeroScene = dynamic(
  () =>
    import("@/components/three/QuantumHeroScene").then(
      (m) => m.QuantumHeroScene,
    ),
  { ssr: false },
);

type NavigatorConnection = {
  saveData?: boolean;
  effectiveType?: string;
};

function shouldUseWebGL() {
  if (typeof window === "undefined") return false;

  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const desktopViewport = window.matchMedia("(min-width: 1024px)").matches;
  const nav = navigator as Navigator & {
    connection?: NavigatorConnection;
    deviceMemory?: number;
  };

  const lowMemory = typeof nav.deviceMemory === "number" && nav.deviceMemory < 6;
  const slowConnection =
    nav.connection?.saveData === true ||
    nav.connection?.effectiveType === "slow-2g" ||
    nav.connection?.effectiveType === "2g" ||
    nav.connection?.effectiveType === "3g";

  return desktopViewport && !reduceMotion && !lowMemory && !slowConnection;
}

export function QuantumHeroClient() {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    if (!shouldUseWebGL()) return;

    const timer = window.setTimeout(() => setEnabled(true), 900);
    return () => window.clearTimeout(timer);
  }, []);

  if (!enabled) return null;

  return (
    <ThreeErrorBoundary fallback={null}>
      <Suspense fallback={null}>
        <QuantumHeroScene />
      </Suspense>
    </ThreeErrorBoundary>
  );
}
