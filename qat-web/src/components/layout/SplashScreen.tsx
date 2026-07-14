"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

import { useTr } from "@/lib/i18n/context";

const LOAD_MS = 900;
const EXIT_MS = 220;

export function SplashScreen() {
  const tr = useTr();
  const [leaving, setLeaving] = useState(false);
  const [mounted, setMounted] = useState(true);

  useEffect(() => {
    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const loadTime = reducedMotion ? 260 : LOAD_MS;
    const exitTime = reducedMotion ? 0 : EXIT_MS;

    const leaveTimer = window.setTimeout(() => setLeaving(true), loadTime);
    const removeTimer = window.setTimeout(
      () => setMounted(false),
      loadTime + exitTime,
    );

    return () => {
      window.clearTimeout(leaveTimer);
      window.clearTimeout(removeTimer);
    };
  }, []);

  if (!mounted) return null;

  return (
    <div
      aria-busy={!leaving}
      aria-live="polite"
      className={`fixed inset-0 z-[9999] grid place-items-center bg-background text-foreground transition-opacity duration-200 ${
        leaving ? "pointer-events-none opacity-0" : "opacity-100"
      }`}
    >
      <div className="flex w-full max-w-xs flex-col items-center px-6 text-center">
        <Image
          src="/brand/QAT_Logo.png"
          alt="QAT"
          width={64}
          height={64}
          className="size-14 object-contain"
          priority
        />

        <p className="mt-5 font-mono text-[10px] font-semibold uppercase tracking-[0.28em] text-primary/85">
          {leaving ? tr.splash.ready : tr.splash.initializing}
        </p>
        <p className="mt-2 text-xs leading-5 text-muted-foreground">
          {leaving ? tr.splash.interfaceReady : tr.splash.preparing}
        </p>

        <div className="mt-5 h-px w-44 overflow-hidden bg-white/10">
          <div className="h-full origin-left bg-primary motion-reduce:w-full motion-reduce:animate-none [animation:splash-progress_900ms_cubic-bezier(0.22,1,0.36,1)_forwards]" />
        </div>
      </div>
    </div>
  );
}
