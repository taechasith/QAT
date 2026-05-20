"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

// primary = oklch(0.82 0.15 210) ≈ #22d3ee  accent = oklch(0.67 0.2 292) ≈ #a78bfa
const C_CYAN   = "#22d3ee";
const C_VIOLET = "#a78bfa";

function Particles() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const count = window.innerWidth < 768 ? 30 : 80;
    for (let i = 0; i < count; i++) {
      const p = document.createElement("div");
      const size = Math.random() * 2 + 1;
      const color = Math.random() > 0.5 ? C_CYAN : C_VIOLET;
      p.style.cssText = `
        position:absolute;border-radius:50%;
        width:${size}px;height:${size}px;
        left:${Math.random() * 100}vw;bottom:-10px;
        background-color:${color};
        box-shadow:0 0 ${size * 3}px ${color},0 0 ${size * 6}px ${color};
        animation:move-particle ${Math.random() * 10 + 5}s linear ${Math.random() * 10}s infinite;
        opacity:0;
      `;
      el.appendChild(p);
    }
    return () => { el.innerHTML = ""; };
  }, []);

  return <div ref={ref} className="pointer-events-none absolute inset-0 z-0" />;
}

export function SplashScreen() {
  const [pct, setPct] = useState(0);
  const [ready, setReady] = useState(false);
  const [visible, setVisible] = useState(true);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    const interval = setInterval(() => {
      setPct((prev) => {
        const next = prev + 100 / (3000 / 50);
        if (next >= 100) {
          clearInterval(interval);
          setReady(true);
          setTimeout(() => setVisible(false), 700);
          return 100;
        }
        return next;
      });
    }, 50);

    return () => clearInterval(interval);
  }, []);

  if (!mounted) return null;

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center overflow-hidden bg-background text-foreground"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "scale(1)" : "scale(1.06)",
        filter: visible ? "blur(0px)" : "blur(10px)",
        transition: "opacity 900ms ease-in-out, transform 900ms ease-in-out, filter 900ms ease-in-out",
        pointerEvents: visible ? "all" : "none",
      }}
    >
      {/* Radial glow */}
      <div
        className="pointer-events-none absolute inset-0 z-0"
        style={{ background: `radial-gradient(ellipse at center, rgba(34,211,238,0.06) 0%, transparent 70%)` }}
      />

      {/* Grid overlay */}
      <div
        className="pointer-events-none absolute inset-0 z-0 opacity-[0.025]"
        style={{
          backgroundImage: `linear-gradient(${C_CYAN} 1px,transparent 1px),linear-gradient(90deg,${C_CYAN} 1px,transparent 1px)`,
          backgroundSize: "40px 40px",
        }}
      />

      {/* Spinning rings */}
      <div className="pointer-events-none absolute inset-0 z-0 flex items-center justify-center">
        <div
          className="max-h-[800px] max-w-[800px] size-[60vw] rounded-full"
          style={{ border: `1px solid rgba(34,211,238,0.12)`, animation: "spin 8s linear infinite" }}
        />
        <div
          className="absolute max-h-[650px] max-w-[650px] size-[50vw] rounded-full"
          style={{ border: `1px solid rgba(167,139,250,0.10)`, animation: "spin-reverse 12s linear infinite" }}
        />
        <div
          className="absolute max-h-[500px] max-w-[500px] size-[40vw] rounded-full"
          style={{ border: `1px solid rgba(34,211,238,0.06)`, animation: "spin 15s linear infinite" }}
        />
      </div>

      {/* Particles */}
      <Particles />

      {/* Content */}
      <div className="relative z-10 flex w-full max-w-5xl flex-col items-center px-5 md:px-20">

        {/* Logo */}
        <div
          className="relative mb-16 rounded-full p-8"
          style={{
            background: "rgba(255,255,255,0.03)",
            backdropFilter: "blur(12px)",
            border: "1px solid rgba(34,211,238,0.12)",
            boxShadow: "0 8px 40px 0 rgba(0,0,0,0.4), 0 0 60px rgba(34,211,238,0.06)",
            animation: "float 6s ease-in-out infinite",
          }}
        >
          <div
            className="absolute inset-0 rounded-full"
            style={{
              animation: "pulse-glow 3s cubic-bezier(0.4,0,0.6,1) infinite",
              transform: "scale(1.1)",
              border: "1.5px solid rgba(34,211,238,0.35)",
              boxShadow: "0 0 24px rgba(34,211,238,0.18), inset 0 0 16px rgba(34,211,238,0.06)",
            }}
          />
          <Image
            src="/brand/QAT_Logo.png"
            alt="QAT"
            width={192}
            height={192}
            className="relative z-10 size-32 object-contain md:size-48"
            priority
          />
        </div>

        {/* Progress panel */}
        <div className="glass-panel flex w-full max-w-md flex-col items-center gap-6 rounded-xl p-6">
          <div className="flex flex-col items-center gap-2 text-center">
            <p
              className="font-mono text-[10px] font-bold uppercase tracking-[0.1em] text-primary"
              style={!ready ? { animation: "pulse 2s cubic-bezier(0.4,0,0.6,1) infinite" } : undefined}
            >
              {ready ? "SYSTEM READY" : "Initializing Quantum Realm"}
            </p>
            <p className="font-mono text-[12px] tracking-[0.05em] text-muted-foreground">
              {ready ? "Interface connection established" : "Preparing artistic-scientific interface"}
            </p>
          </div>

          <div className="relative h-[2px] w-full overflow-hidden rounded-full bg-muted">
            <div
              className="absolute left-0 top-0 h-full rounded-full bg-primary"
              style={{
                width: `${Math.floor(pct)}%`,
                boxShadow: `0 0 10px ${C_CYAN}, 0 0 20px rgba(34,211,238,0.4)`,
                transition: "width 50ms linear",
              }}
            />
          </div>

          <div className="mt-2 flex w-full justify-between font-mono text-[10px] font-bold uppercase tracking-[0.1em] text-muted-foreground/40">
            <span>[SYS.INIT: 0xQAT]</span>
            <span className={ready ? "text-primary" : ""}>{Math.floor(pct)}%</span>
          </div>
        </div>
      </div>
    </div>
  );
}
