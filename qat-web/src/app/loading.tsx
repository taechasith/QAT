export default function Loading() {
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#030711]">
      {/* Orbital rings */}
      <div className="relative flex items-center justify-center">
        <div className="absolute size-32 animate-spin rounded-full border border-cyan-400/20 [animation-duration:3s]" />
        <div className="absolute size-20 animate-spin rounded-full border border-violet-400/30 [animation-duration:2s] [animation-direction:reverse]" />
        <div className="absolute size-10 animate-spin rounded-full border border-cyan-300/50 [animation-duration:1.2s]" />

        {/* Core pulse */}
        <div className="relative size-4 animate-pulse rounded-full bg-cyan-300 shadow-[0_0_20px_4px_rgba(34,211,238,0.6)]" />
      </div>

      {/* Label */}
      <p className="mt-10 font-mono text-[0.65rem] font-semibold tracking-[0.35em] text-cyan-300/60 uppercase">
        Initialising
      </p>
    </div>
  );
}
