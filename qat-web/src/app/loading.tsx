"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

function Particles() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    for (let i = 0; i < 80; i++) {
      const p = document.createElement("div");
      const size = Math.random() * 2 + 1;
      const color = Math.random() > 0.5 ? "#54ddfc" : "#d0bcff";
      p.style.cssText = `
        position: absolute;
        border-radius: 50%;
        width: ${size}px;
        height: ${size}px;
        left: ${Math.random() * 100}vw;
        bottom: -10px;
        background-color: ${color};
        box-shadow: 0 0 ${size * 3}px ${color}, 0 0 ${size * 6}px ${color};
        animation: move-particle ${Math.random() * 10 + 5}s linear ${Math.random() * 10}s infinite;
        opacity: 0;
      `;
      container.appendChild(p);
    }

    return () => { container.innerHTML = ""; };
  }, []);

  return <div ref={containerRef} className="pointer-events-none absolute inset-0 z-0" />;
}

export default function Loading() {
  const [pct, setPct] = useState(0);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setPct((prev) => {
        const next = prev + 100 / (3000 / 50);
        if (next >= 100) {
          clearInterval(interval);
          setReady(true);
          return 100;
        }
        return next;
      });
    }, 50);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#131B2E] text-[#dfe2f4]">

      {/* Radial bg */}
      <div className="pointer-events-none absolute inset-0 z-0" style={{ background: "radial-gradient(circle at center, rgba(84,221,252,0.05) 0%, #131B2E 100%)" }} />

      {/* Grid overlay */}
      <div className="pointer-events-none absolute inset-0 z-0 opacity-[0.03]" style={{ backgroundImage: "linear-gradient(#54ddfc 1px, transparent 1px), linear-gradient(90deg, #54ddfc 1px, transparent 1px)", backgroundSize: "40px 40px" }} />

      {/* Spinning rings */}
      <div className="pointer-events-none absolute inset-0 z-0 flex items-center justify-center opacity-20">
        <div className="max-h-[800px] max-w-[800px] size-[60vw] rounded-full border border-[#54ddfc]/30" style={{ animation: "spin 8s linear infinite" }} />
        <div className="absolute max-h-[650px] max-w-[650px] size-[50vw] rounded-full border border-[#d0bcff]/20" style={{ animation: "spin-reverse 12s linear infinite" }} />
        <div className="absolute max-h-[500px] max-w-[500px] size-[40vw] rounded-full border border-[#8ed5ff]/10" style={{ animation: "spin 15s linear infinite" }} />
      </div>

      {/* Particles */}
      <Particles />

      {/* Content */}
      <div className="relative z-10 flex w-full max-w-5xl flex-col items-center px-5 md:px-20">

        {/* Logo */}
        <div
          className="relative mb-16 rounded-full p-8"
          style={{
            background: "rgba(19,27,46,0.4)",
            backdropFilter: "blur(12px)",
            border: "1px solid rgba(84,221,252,0.1)",
            boxShadow: "0 8px 32px 0 rgba(0,0,0,0.3)",
            animation: "float 6s ease-in-out infinite",
          }}
        >
          <div
            className="absolute inset-0 rounded-full border-2 border-[#54ddfc]/50 bg-[#54ddfc] mix-blend-screen"
            style={{ animation: "pulse-glow 3s cubic-bezier(0.4,0,0.6,1) infinite", transform: "scale(1.1)" }}
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
        <div
          className="flex w-full max-w-md flex-col items-center gap-6 rounded-xl p-6"
          style={{
            background: "rgba(19,27,46,0.4)",
            backdropFilter: "blur(12px)",
            border: "1px solid rgba(84,221,252,0.1)",
            boxShadow: "0 8px 32px 0 rgba(0,0,0,0.3)",
          }}
        >
          {/* Status text */}
          <div className="flex flex-col items-center gap-2 text-center">
            <p
              className="font-mono text-[10px] font-bold uppercase tracking-[0.1em] text-[#54ddfc]"
              style={ready ? undefined : { animation: "pulse 2s cubic-bezier(0.4,0,0.6,1) infinite" }}
            >
              {ready ? "SYSTEM READY" : "Initializing Quantum Realm"}
            </p>
            <p className="font-mono text-[12px] tracking-[0.05em] text-[#94A3B8]">
              {ready ? "Interface connection established" : "Preparing artistic-scientific interface"}
            </p>
          </div>

          {/* Progress bar */}
          <div className="relative h-[2px] w-full overflow-hidden rounded-full bg-[#252a37]">
            <div
              className="absolute left-0 top-0 h-full rounded-full bg-[#54ddfc]"
              style={{
                width: `${Math.floor(pct)}%`,
                boxShadow: "0 0 10px rgba(84,221,252,1)",
                transition: "width 50ms linear",
              }}
            />
          </div>

          {/* Coordinate row */}
          <div className="mt-2 flex w-full justify-between font-mono text-[10px] font-bold uppercase tracking-[0.1em] text-[#3e484f]">
            <span>[SYS.INIT: 0xQAT]</span>
            <span style={ready ? { color: "#54ddfc" } : undefined}>
              {Math.floor(pct)}%
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
