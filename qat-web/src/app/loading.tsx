import Image from "next/image";

export default function Loading() {
  return (
    <div className="fixed inset-0 z-50 flex flex-col bg-[#030711] overflow-hidden">

      {/* ── Corner data labels ───────────────────────────── */}
      <div
        className="absolute top-6 left-7 flex flex-col gap-1"
        style={{ animation: "fade-in 1s ease both", animationDelay: "0.4s" }}
      >
        <span className="font-mono text-[0.5rem] tracking-[0.28em] text-cyan-300/30 uppercase">QAT // v1.0</span>
        <span className="font-mono text-[0.5rem] tracking-[0.24em] text-slate-500/40 uppercase">Initialising systems</span>
      </div>
      <div
        className="absolute top-6 right-7 flex flex-col items-end gap-1"
        style={{ animation: "fade-in 1s ease both", animationDelay: "0.4s" }}
      >
        <span className="font-mono text-[0.5rem] tracking-[0.28em] text-cyan-300/30 uppercase">Quantum Art Thailand</span>
        <span className="font-mono text-[0.5rem] tracking-[0.24em] text-slate-500/40 uppercase">CreativeLabTH Group</span>
      </div>

      {/* ── Scan line ────────────────────────────────────── */}
      <div
        className="pointer-events-none absolute left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-400/20 to-transparent"
        style={{ animation: "scan-line 6s linear infinite" }}
      />

      {/* ── Top ambient glow ─────────────────────────────── */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-[42%] -translate-x-1/2 -translate-y-1/2 size-[800px] rounded-full bg-[radial-gradient(circle,rgba(34,211,238,0.055)_0%,transparent_60%)]" />
        <div className="absolute left-1/2 top-[42%] -translate-x-1/2 -translate-y-1/2 size-[500px] rounded-full bg-[radial-gradient(circle,rgba(139,92,246,0.045)_0%,transparent_55%)]" />
      </div>

      {/* ── Main content ─────────────────────────────────── */}
      <div className="flex flex-1 flex-col items-center justify-center gap-0">

        {/* Orbital system */}
        <div
          className="relative flex items-center justify-center"
          style={{ animation: "fade-in 1.8s ease both", animationDelay: "0.1s" }}
        >
          <div className="absolute size-96 animate-spin rounded-full border border-cyan-400/[0.04] [animation-duration:35s]" />
          <div className="absolute size-80 animate-spin rounded-full border border-dashed border-violet-400/[0.06] [animation-direction:reverse] [animation-duration:26s]" />
          <div className="absolute size-72 animate-spin rounded-full border border-cyan-300/[0.08] [animation-duration:18s]" />
          <div className="absolute size-60 animate-spin rounded-full border border-dashed border-violet-300/[0.11] [animation-direction:reverse] [animation-duration:13s]" />
          <div className="absolute size-48 animate-spin rounded-full border border-cyan-200/[0.17] [animation-duration:8s]" />
          <div className="absolute size-36 animate-spin rounded-full border border-dashed border-violet-200/[0.22] [animation-direction:reverse] [animation-duration:5s]" />
          <div className="absolute size-24 animate-spin rounded-full border border-cyan-200/30 [animation-duration:3s]" />
          <div className="absolute size-14 animate-spin rounded-full border border-dashed border-violet-200/40 [animation-direction:reverse] [animation-duration:1.8s]" />

          {/* Core */}
          <div className="relative z-10 flex items-center justify-center">
            <div className="absolute size-12 animate-ping rounded-full bg-cyan-400/10 [animation-duration:3s]" />
            <div className="absolute size-8 rounded-full bg-cyan-300/20 blur-lg" />
            <div className="relative size-3.5 animate-pulse rounded-full bg-cyan-300 shadow-[0_0_32px_10px_rgba(34,211,238,0.6)] [animation-duration:2.2s]" />
          </div>
        </div>

        {/* Logo block */}
        <div
          className="mt-16 flex flex-col items-center gap-4"
          style={{ animation: "fade-in-up 1.4s ease both", animationDelay: "0.7s" }}
        >
          <Image
            src="/brand/QAT_Logo.png"
            alt="QAT"
            width={64}
            height={64}
            className="size-16 object-contain drop-shadow-[0_0_24px_rgba(34,211,238,0.55)]"
            priority
          />
          <div className="flex flex-col items-center gap-1 leading-none">
            <span className="text-3xl font-semibold tracking-[0.4em] text-white">QAT</span>
            <span className="font-mono text-[0.62rem] tracking-[0.32em] text-cyan-100/45 uppercase">
              Quantum Art Thailand Association
            </span>
          </div>
        </div>

        {/* Tagline */}
        <p
          className="mt-7 max-w-sm text-center text-base leading-9 font-light tracking-wide text-slate-300/60"
          style={{ animation: "fade-in-up 1.4s ease both", animationDelay: "1.2s" }}
        >
          Where quantum science meets<br />human imagination
        </p>

        {/* Thin divider */}
        <div
          className="mt-9 h-px w-32 bg-gradient-to-r from-transparent via-cyan-400/40 to-transparent"
          style={{ animation: "fade-in 1.2s ease both", animationDelay: "1.8s" }}
        />

        {/* Status */}
        <div
          className="mt-7 flex items-center gap-3"
          style={{ animation: "fade-in 1.2s ease both", animationDelay: "2.1s" }}
        >
          <span className="font-mono text-[0.6rem] tracking-[0.32em] text-cyan-300/40 uppercase">
            Entering the quantum realm
          </span>
          <span className="flex gap-1.5">
            {[0, 1, 2].map((i) => (
              <span
                key={i}
                className="size-1 rounded-full bg-cyan-300/50"
                style={{
                  animation: "loader-blink 1.5s ease-in-out infinite",
                  animationDelay: `${2.1 + i * 0.28}s`,
                }}
              />
            ))}
          </span>
        </div>

        {/* Stat row */}
        <div
          className="mt-10 flex items-center gap-8"
          style={{ animation: "fade-in 1s ease both", animationDelay: "2.6s" }}
        >
          {[
            { label: "Dimension", value: "Quantum" },
            { label: "State", value: "Superposed" },
            { label: "Field", value: "Active" },
          ].map(({ label, value }) => (
            <div key={label} className="flex flex-col items-center gap-1">
              <span className="font-mono text-[0.5rem] tracking-[0.26em] text-slate-500/60 uppercase">{label}</span>
              <span className="font-mono text-[0.62rem] font-medium tracking-[0.18em] text-cyan-300/55">{value}</span>
            </div>
          ))}
        </div>
      </div>

      {/* ── Progress bar at bottom ───────────────────────── */}
      <div className="relative mx-auto mb-12 w-48">
        <div
          className="h-px w-full overflow-hidden rounded-full bg-white/5"
          style={{ animation: "fade-in 0.8s ease both", animationDelay: "2.8s" }}
        >
          <div
            className="h-full rounded-full bg-gradient-to-r from-cyan-400/60 to-violet-400/60"
            style={{
              animation: "fade-in 3s ease both",
              animationDelay: "3s",
              width: "100%",
              transform: "scaleX(0)",
              transformOrigin: "left",
              animationName: "progress-fill",
            }}
          />
        </div>
        <p
          className="mt-3 text-center font-mono text-[0.52rem] tracking-[0.28em] text-slate-500/45 uppercase"
          style={{ animation: "fade-in 0.8s ease both", animationDelay: "2.8s" }}
        >
          CreativeLabTH Group International Initiative
        </p>
      </div>
    </div>
  );
}
