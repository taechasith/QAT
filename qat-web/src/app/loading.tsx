import Image from "next/image";

export default function Loading() {
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center overflow-hidden bg-[#030711]">

      {/* Ambient glow layers */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 size-[700px] rounded-full bg-[radial-gradient(circle,rgba(34,211,238,0.06)_0%,transparent_65%)]" />
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 size-[450px] rounded-full bg-[radial-gradient(circle,rgba(139,92,246,0.05)_0%,transparent_60%)]" />
      </div>

      {/* Scan line */}
      <div
        className="pointer-events-none absolute left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-400/25 to-transparent"
        style={{ animation: "scan-line 5s linear infinite" }}
      />

      {/* Outer atmosphere rings — very slow, fade in first */}
      <div
        className="relative flex items-center justify-center"
        style={{ animation: "fade-in 2s ease both", animationDelay: "0.1s" }}
      >
        {/* Outermost slow rings */}
        <div className="absolute size-80 animate-spin rounded-full border border-cyan-400/[0.05] [animation-duration:28s]" />
        <div className="absolute size-72 animate-spin rounded-full border border-dashed border-violet-400/[0.07] [animation-direction:reverse] [animation-duration:22s]" />

        {/* Mid rings */}
        <div
          className="absolute size-60 animate-spin rounded-full border border-cyan-300/[0.10] [animation-duration:16s]"
          style={{ animationDelay: "0.3s" }}
        />
        <div
          className="absolute size-48 animate-spin rounded-full border border-dashed border-violet-300/[0.13] [animation-direction:reverse] [animation-duration:11s]"
          style={{ animationDelay: "0.2s" }}
        />

        {/* Inner rings */}
        <div
          className="absolute size-36 animate-spin rounded-full border border-cyan-200/[0.22] [animation-duration:6s]"
          style={{ animationDelay: "0.4s" }}
        />
        <div
          className="absolute size-24 animate-spin rounded-full border border-dashed border-violet-200/30 [animation-direction:reverse] [animation-duration:3.8s]"
          style={{ animationDelay: "0.3s" }}
        />
        <div className="absolute size-14 animate-spin rounded-full border border-cyan-200/40 [animation-duration:2.2s]" />

        {/* Core */}
        <div className="relative z-10 flex items-center justify-center">
          <div className="absolute size-10 animate-ping rounded-full bg-cyan-400/15 [animation-duration:2.5s]" />
          <div className="absolute size-6 rounded-full bg-cyan-300/25 blur-md" />
          <div className="relative size-3 animate-pulse rounded-full bg-cyan-300 shadow-[0_0_28px_8px_rgba(34,211,238,0.65)] [animation-duration:2s]" />
        </div>
      </div>

      {/* Logo */}
      <div
        className="mt-16 flex flex-col items-center gap-3"
        style={{ animation: "fade-in-up 1.2s ease both", animationDelay: "0.6s" }}
      >
        <Image
          src="/brand/QAT_Logo.png"
          alt="QAT"
          width={56}
          height={56}
          className="size-14 object-contain drop-shadow-[0_0_20px_rgba(34,211,238,0.5)]"
          priority
        />
        <div className="flex flex-col items-center leading-none">
          <span className="text-2xl font-semibold tracking-[0.35em] text-white">QAT</span>
          <span className="mt-1.5 font-mono text-[0.6rem] tracking-[0.3em] text-cyan-100/50 uppercase">
            Quantum Art Thailand
          </span>
        </div>
      </div>

      {/* Tagline */}
      <p
        className="mt-6 max-w-xs text-center text-sm leading-8 font-light tracking-wide text-slate-300/65"
        style={{ animation: "fade-in-up 1.2s ease both", animationDelay: "1.1s" }}
      >
        Where quantum science meets<br />human imagination
      </p>

      {/* Divider */}
      <div
        className="mt-8 h-px w-24 bg-gradient-to-r from-transparent via-cyan-400/35 to-transparent"
        style={{ animation: "fade-in 1s ease both", animationDelay: "1.6s" }}
      />

      {/* Status */}
      <div
        className="mt-6 flex items-center gap-3"
        style={{ animation: "fade-in 1s ease both", animationDelay: "1.9s" }}
      >
        <span className="font-mono text-[0.58rem] tracking-[0.32em] text-cyan-300/45 uppercase">
          Entering the quantum realm
        </span>
        <span className="flex gap-1.5">
          {[0, 1, 2].map((i) => (
            <span
              key={i}
              className="size-1 rounded-full bg-cyan-300/55"
              style={{
                animation: "loader-blink 1.4s ease-in-out infinite",
                animationDelay: `${1.9 + i * 0.25}s`,
              }}
            />
          ))}
        </span>
      </div>

      {/* Footer label */}
      <p
        className="absolute bottom-8 font-mono text-[0.55rem] tracking-[0.25em] text-slate-500/50 uppercase"
        style={{ animation: "fade-in 1s ease both", animationDelay: "2.4s" }}
      >
        CreativeLabTH Group International Initiative
      </p>
    </div>
  );
}
