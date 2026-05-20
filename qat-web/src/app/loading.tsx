import Image from "next/image";

export default function Loading() {
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center overflow-hidden bg-[#030711]">

      {/* Ambient radial glow */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 size-[600px] rounded-full bg-[radial-gradient(circle,rgba(34,211,238,0.07)_0%,transparent_65%)]" />
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 size-[400px] rounded-full bg-[radial-gradient(circle,rgba(139,92,246,0.06)_0%,transparent_60%)]" />
      </div>

      {/* Scan line */}
      <div
        className="pointer-events-none absolute left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-400/30 to-transparent"
        style={{ animation: "scan-line 4s linear infinite" }}
      />

      {/* Orbital ring system */}
      <div className="relative flex items-center justify-center">
        <div className="absolute size-64 animate-spin rounded-full border border-cyan-400/[0.07] [animation-duration:18s]" />
        <div className="absolute size-56 animate-spin rounded-full border border-dashed border-violet-400/[0.09] [animation-direction:reverse] [animation-duration:13s]" />
        <div className="absolute size-44 animate-spin rounded-full border border-cyan-300/[0.12] [animation-duration:9s]" />
        <div className="absolute size-36 animate-spin rounded-full border border-dashed border-violet-300/[0.15] [animation-direction:reverse] [animation-duration:6s]" />
        <div className="absolute size-24 animate-spin rounded-full border border-cyan-200/25 [animation-duration:3.5s]" />
        <div className="absolute size-14 animate-spin rounded-full border border-violet-200/35 [animation-direction:reverse] [animation-duration:2s]" />

        {/* Core glow */}
        <div className="relative z-10 flex items-center justify-center">
          <div className="absolute size-8 animate-ping rounded-full bg-cyan-400/20 [animation-duration:2s]" />
          <div className="absolute size-5 rounded-full bg-cyan-300/30 blur-sm" />
          <div className="relative size-3 animate-pulse rounded-full bg-cyan-300 shadow-[0_0_24px_6px_rgba(34,211,238,0.7)] [animation-duration:1.5s]" />
        </div>
      </div>

      {/* Logo + wordmark */}
      <div
        className="mt-14 flex flex-col items-center gap-3"
        style={{ animation: "fade-in-up 0.8s ease both", animationDelay: "0.2s" }}
      >
        <Image
          src="/brand/QAT_Logo.png"
          alt="QAT"
          width={52}
          height={52}
          className="size-13 object-contain drop-shadow-[0_0_16px_rgba(34,211,238,0.5)]"
          priority
        />
        <div className="flex flex-col items-center leading-none">
          <span className="text-xl font-semibold tracking-[0.3em] text-white">QAT</span>
          <span className="mt-1 font-mono text-[0.6rem] tracking-[0.28em] text-cyan-100/50 uppercase">
            Quantum Art Thailand
          </span>
        </div>
      </div>

      {/* Tagline */}
      <p
        className="mt-6 max-w-xs text-center text-sm leading-7 font-light tracking-wide text-slate-300/70"
        style={{ animation: "fade-in-up 0.8s ease both", animationDelay: "0.45s" }}
      >
        Where quantum science meets<br />human imagination
      </p>

      {/* Status row */}
      <div
        className="mt-8 flex items-center gap-3"
        style={{ animation: "fade-in 0.6s ease both", animationDelay: "0.75s" }}
      >
        <span className="font-mono text-[0.6rem] tracking-[0.3em] text-cyan-300/50 uppercase">
          Entering the quantum realm
        </span>
        <span className="flex gap-1">
          {[0, 1, 2].map((i) => (
            <span
              key={i}
              className="size-1 rounded-full bg-cyan-300/60"
              style={{
                animation: "loader-blink 1.2s ease-in-out infinite",
                animationDelay: `${i * 0.22}s`,
              }}
            />
          ))}
        </span>
      </div>

      {/* Bottom separator */}
      <div
        className="mt-10 h-px w-32 bg-gradient-to-r from-transparent via-cyan-400/30 to-transparent"
        style={{ animation: "fade-in 1s ease both", animationDelay: "1s" }}
      />
    </div>
  );
}
