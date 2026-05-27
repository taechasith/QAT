"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

import { useLocale, useTr } from "@/lib/i18n/context";

const C_CYAN   = "#9FFFE8";
const C_VIOLET = "#F5D4F5";

const BOOT_LOGS_EN = [
  { limit: 0, text: "INIT [SYS.REG]: ALLOCATING 8-QUBIT REGISTER" },
  { limit: 12, text: "CRYO [TEMP]: COOLING THERMAL BATH TO 15mK" },
  { limit: 25, text: "MWAVE [FREQ]: RESONATOR CAVITY ALIGNED" },
  { limit: 38, text: "COHER [STATE]: STABILIZING STATE VECTOR" },
  { limit: 50, text: "GEOM [SPACE]: GENERATING ARTWORK WORKSPACES" },
  { limit: 65, text: "WAVE [EQN]: SOLVING SCHRÖDINGER EQUATION" },
  { limit: 78, text: "OBS [MEAS]: RUNNING DECOHERENCE ASSESSMENT" },
  { limit: 90, text: "COLLAPSE [WF]: SYSTEM DECOHERENCE CLEAN" },
  { limit: 98, text: "READY [HOST]: DEPLOYMENT INTERFACE ONLINE" }
];

const BOOT_LOGS_TH = [
  { limit: 0, text: "เตรียมระบบ [SYS.REG]: จัดสรรหน่วยความจำ 8-QUBIT" },
  { limit: 12, text: "อุณหภูมิ [TEMP]: ลดความร้อนระบบเหลือ 15 มิลลิเคลวิน" },
  { limit: 25, text: "คลื่นแม่เหล็ก [FREQ]: ปรับจูนคลื่นความถี่ความร้อนคงที่" },
  { limit: 38, text: "ควอนตัม [STATE]: จัดการเวกเตอร์สถานะระบบเสถียร" },
  { limit: 50, text: "กราฟิก [SPACE]: เริ่มต้นเตรียมพื้นที่แสดงผลงานศิลปะ" },
  { limit: 65, text: "สมการ [EQN]: คำนวณความน่าจะเป็นของคลื่นควอนตัม" },
  { limit: 78, text: "วัดค่า [MEAS]: ตรวจสอบการสูญเสียสภาพความพัวพัน" },
  { limit: 90, text: "เชื่อมต่อ [WF]: ยืนยันความเสถียรระบบการวัดข้อมูล" },
  { limit: 98, text: "เสร็จสิ้น [HOST]: ระบบพร้อมสร้างความรู้ความบันเทิง" }
];

function QuantumCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: -1000, y: -1000, active: false });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current.x = e.clientX;
      mouseRef.current.y = e.clientY;
      mouseRef.current.active = true;
    };

    const handleMouseLeave = () => {
      mouseRef.current.active = false;
    };

    window.addEventListener("resize", handleResize);
    window.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseleave", handleMouseLeave);

    const particles: Array<{
      x: number;
      y: number;
      vx: number;
      vy: number;
      radius: number;
      color: string;
      alpha: number;
      pulseSpeed: number;
      pulsePhase: number;
    }> = [];

    const numParticles = Math.min(Math.floor((width * height) / 14000), 120);

    for (let i = 0; i < numParticles; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        radius: Math.random() * 2.2 + 0.8,
        color: Math.random() > 0.4 ? C_CYAN : C_VIOLET,
        alpha: Math.random() * 0.45 + 0.15,
        pulseSpeed: Math.random() * 0.02 + 0.005,
        pulsePhase: Math.random() * Math.PI * 2,
      });
    }

    const draw = () => {
      ctx.clearRect(0, 0, width, height);

      // Mouse interactive radial glow
      if (mouseRef.current.active) {
        const grad = ctx.createRadialGradient(
          mouseRef.current.x,
          mouseRef.current.y,
          0,
          mouseRef.current.x,
          mouseRef.current.y,
          160
        );
        grad.addColorStop(0, "rgba(212, 168, 50, 0.06)");
        grad.addColorStop(1, "rgba(0, 0, 0, 0)");
        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, width, height);
      }

      // Update and draw particles
      particles.forEach((p) => {
        p.pulsePhase += p.pulseSpeed;
        const currentAlpha = p.alpha * (0.6 + 0.4 * Math.sin(p.pulsePhase));

        // Physics: random movement
        p.x += p.vx;
        p.y += p.vy;

        // Bounce borders
        if (p.x < 0 || p.x > width) p.vx *= -1;
        if (p.y < 0 || p.y > height) p.vy *= -1;

        // Interaction with mouse: repulsion force
        if (mouseRef.current.active) {
          const dx = mouseRef.current.x - p.x;
          const dy = mouseRef.current.y - p.y;
          const dist = Math.hypot(dx, dy);
          if (dist < 160) {
            const force = (160 - dist) / 160;
            p.x -= (dx / dist) * force * 0.6;
            p.y -= (dy / dist) * force * 0.6;
          }
        }

        // Draw particle core
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = currentAlpha;
        ctx.fill();

        // Draw outer glow shadow
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius * 2.5, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = currentAlpha * 0.3;
        ctx.fill();
      });

      // Draw quantum entanglement lines (webs)
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const p1 = particles[i];
          const p2 = particles[j];
          const dist = Math.hypot(p1.x - p2.x, p1.y - p2.y);

          if (dist < 90) {
            const strength = (90 - dist) / 90;
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = p1.color === p2.color ? p1.color : "#D4A832";
            ctx.lineWidth = strength * 0.5;
            ctx.globalAlpha = strength * 0.12;
            ctx.stroke();
          }
        }
      }
      ctx.globalAlpha = 1;

      animationFrameId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return <canvas ref={canvasRef} className="pointer-events-none absolute inset-0 z-0" />;
}

export function SplashScreen() {
  const tr = useTr();
  const locale = useLocale();
  const [pct, setPct] = useState(0);
  const [ready, setReady] = useState(false);
  const [visible, setVisible] = useState(true);

  const bootLogs = locale === "th" ? BOOT_LOGS_TH : BOOT_LOGS_EN;
  const activeLogs = bootLogs.filter((log) => pct >= log.limit);
  const visibleLogs = activeLogs.slice(-3);

  useEffect(() => {
    const interval = setInterval(() => {
      setPct((prev) => {
        const next = prev + 100 / (3000 / 40);
        if (next >= 100) {
          clearInterval(interval);
          return 100;
        }
        return next;
      });
    }, 40);

    const readyTimer = window.setTimeout(() => setReady(true), 3000);
    const hideTimer = window.setTimeout(() => setVisible(false), 3700);

    return () => {
      clearInterval(interval);
      window.clearTimeout(readyTimer);
      window.clearTimeout(hideTimer);
    };
  }, []);

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center overflow-hidden bg-background text-foreground"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "scale(1)" : "scale(1.05)",
        filter: visible ? "blur(0px)" : "blur(12px)",
        transition: "opacity 800ms cubic-bezier(0.4, 0, 0.2, 1), transform 800ms cubic-bezier(0.4, 0, 0.2, 1), filter 800ms cubic-bezier(0.4, 0, 0.2, 1)",
        pointerEvents: visible ? "all" : "none",
      }}
    >
      {/* Futuristic CRT Scanline Effect */}
      <div 
        className="pointer-events-none absolute inset-0 z-50 opacity-[0.04]"
        style={{
          background: "linear-gradient(rgba(18, 16, 16, 0) 50%, rgba(0, 0, 0, 0.25) 50%), linear-gradient(90deg, rgba(255, 0, 0, 0.06), rgba(0, 255, 0, 0.02), rgba(0, 0, 255, 0.06))",
          backgroundSize: "100% 4px, 3px 100%"
        }}
      />

      {/* Laser Scanning Line sweeps vertically */}
      <div 
        className="pointer-events-none absolute inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-primary/20 to-transparent shadow-[0_0_10px_#D4A832] z-40"
        style={{
          animation: "scan-line 6s linear infinite"
        }}
      />

      {/* Background Radial Glow */}
      <div
        className="pointer-events-none absolute inset-0 z-0"
        style={{ background: `radial-gradient(circle at center, rgba(212,168,50,0.07) 0%, transparent 65%)` }}
      />

      {/* Matrix-like Tech Grid */}
      <div
        className="pointer-events-none absolute inset-0 z-0 opacity-[0.02]"
        style={{
          backgroundImage: `linear-gradient(${C_CYAN} 1px,transparent 1px),linear-gradient(90deg,${C_CYAN} 1px,transparent 1px)`,
          backgroundSize: "50px 50px",
        }}
      />

      {/* Giant Ambient Rotating Rings */}
      <div className="pointer-events-none absolute inset-0 z-0 flex items-center justify-center opacity-70">
        <div
          className="max-h-[800px] max-w-[800px] size-[70vw] rounded-full"
          style={{ border: `1.5px dashed rgba(212,168,50,0.08)`, animation: "spin 25s linear infinite" }}
        />
        <div
          className="absolute max-h-[600px] max-w-[600px] size-[55vw] rounded-full"
          style={{ border: `1px solid rgba(159,255,232,0.06)`, animation: "spin-reverse 35s linear infinite" }}
        />
      </div>

      {/* Interactive Quantum Canvas Background */}
      <QuantumCanvas />

      <div className="relative z-10 flex w-full max-w-5xl flex-col items-center px-5 md:px-20">
        {/* Floating QAT Logo Container with Cyberpunk HUD */}
        <div
          className="relative mb-14 flex size-44 items-center justify-center rounded-full md:size-52"
          style={{
            background: "rgba(255,255,255,0.02)",
            backdropFilter: "blur(16px)",
            border: "1px solid rgba(212,168,50,0.15)",
            boxShadow: "0 8px 32px 0 rgba(10,6,18,0.5), 0 0 50px rgba(212,168,50,0.05)",
            animation: "float 6s ease-in-out infinite",
          }}
        >
          {/* Pulsing Aura */}
          <div
            className="absolute inset-0 rounded-full"
            style={{
              animation: "pulse-glow 3.5s cubic-bezier(0.4, 0, 0.6, 1) infinite",
              transform: "scale(1.08)",
              border: "1.5px solid rgba(212,168,50,0.3)",
              boxShadow: "0 0 20px rgba(212,168,50,0.15), inset 0 0 12px rgba(212,168,50,0.05)",
            }}
          />

          {/* Detailed SVG HUD Overlay */}
          <svg className="absolute size-[210px] md:size-[270px] pointer-events-none z-0" viewBox="0 0 200 200">
            {/* Outer dotted ring */}
            <circle
              cx="100"
              cy="100"
              r="94"
              fill="none"
              stroke="rgba(212,168,50,0.15)"
              strokeWidth="0.8"
              strokeDasharray="2 6"
              className="animate-spin"
              style={{ animationDuration: '45s' }}
            />
            {/* Dashed HUD ring */}
            <circle
              cx="100"
              cy="100"
              r="86"
              fill="none"
              stroke="rgba(212,168,50,0.22)"
              strokeWidth="1.2"
              strokeDasharray="25 15 5 15"
              className="animate-spin"
              style={{ animationDuration: '20s' }}
            />
            {/* Inner reverse dashed ring */}
            <circle
              cx="100"
              cy="100"
              r="78"
              fill="none"
              stroke="rgba(159,255,232,0.2)"
              strokeWidth="1"
              strokeDasharray="10 20 40 10"
              className="animate-spin"
              style={{ animationDuration: '15s', animationDirection: 'reverse' }}
            />
            {/* Concentric brackets */}
            <path d="M 65 15 A 86 86 0 0 1 135 15" fill="none" stroke="rgba(212,168,50,0.4)" strokeWidth="1.5" />
            <path d="M 65 185 A 86 86 0 0 0 135 185" fill="none" stroke="rgba(212,168,50,0.4)" strokeWidth="1.5" />
            
            {/* Compass indicators */}
            <line x1="100" y1="12" x2="100" y2="18" stroke="rgba(212,168,50,0.5)" strokeWidth="1" />
            <line x1="100" y1="182" x2="100" y2="188" stroke="rgba(212,168,50,0.5)" strokeWidth="1" />
            <line x1="12" y1="100" x2="18" y2="100" stroke="rgba(212,168,50,0.5)" strokeWidth="1" />
            <line x1="182" y1="100" x2="188" y2="100" stroke="rgba(212,168,50,0.5)" strokeWidth="1" />
            
            {/* Orbital node indicators */}
            <circle cx="100" cy="12" r="2" fill="#D4A832" className="animate-pulse" />
            <circle cx="100" cy="188" r="2" fill="#D4A832" className="animate-pulse" />
          </svg>

          {/* Logo Frame */}
          <div className="relative z-10 size-20 md:size-28 flex items-center justify-center">
            <Image
              src="/brand/QAT_Logo.png"
              alt="QAT"
              width={128}
              height={128}
              className="size-full object-contain filter drop-shadow-[0_0_12px_rgba(212,168,50,0.35)]"
              priority
            />
          </div>
        </div>

        {/* Status Dashboard Panel */}
        <div className="glass-panel border-primary/10 flex w-full max-w-md flex-col items-center gap-5 rounded-2xl p-6 bg-background/40 backdrop-blur-md">
          <div className="flex flex-col items-center gap-1.5 text-center">
            <p
              className="font-mono text-[10px] font-bold uppercase tracking-[0.15em] text-primary"
              style={!ready ? { animation: "pulse 2s cubic-bezier(0.4,0,0.6,1) infinite" } : undefined}
            >
              {ready ? tr.splash.ready : tr.splash.initializing}
            </p>
            <p className="font-mono text-[11px] tracking-[0.03em] text-muted-foreground/80">
              {ready ? tr.splash.interfaceReady : tr.splash.preparing}
            </p>
          </div>

          {/* Progress Bar with Glow */}
          <div className="relative h-[2px] w-full overflow-hidden rounded-full bg-muted/30">
            <div
              className="absolute left-0 top-0 h-full rounded-full bg-primary"
              style={{
                width: `${Math.floor(pct)}%`,
                boxShadow: `0 0 12px ${C_CYAN}, 0 0 24px rgba(212,168,50,0.5)`,
                transition: "width 40ms linear",
              }}
            />
          </div>

          {/* Micro Terminal Output Console */}
          <div className="w-full bg-black/40 border border-white/5 rounded-lg p-3 font-mono text-[9px] md:text-[10px] space-y-1.5 min-h-[68px] text-left select-none">
            {visibleLogs.map((log, i) => {
              const isLatest = i === visibleLogs.length - 1;
              return (
                <div
                  key={log.limit}
                  className={`flex items-start gap-2 transition-all duration-300 ${isLatest ? "text-accent" : "text-muted-foreground/50"}`}
                >
                  <span className="shrink-0 text-primary/60">❯</span>
                  <span className="break-all">{log.text}</span>
                  {isLatest && !ready && (
                    <span className="inline-block w-1 h-3 bg-accent animate-pulse shrink-0 self-center" />
                  )}
                </div>
              );
            })}
          </div>

          {/* Footer Metrics */}
          <div className="flex w-full justify-between font-mono text-[10px] font-semibold tracking-[0.08em] text-muted-foreground/30">
            <span>[UNIT: 0xQAT-DEV]</span>
            <span className={ready ? "text-primary opacity-80" : ""}>{Math.floor(pct)}%</span>
          </div>
        </div>
      </div>
    </div>
  );
}
