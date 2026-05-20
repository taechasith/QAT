export function ReducedMotionFallback() {
  return (
    <div
      className="pointer-events-none absolute inset-0 flex items-center justify-center"
      aria-hidden="true"
    >
      <div className="rounded-full border border-cyan-200/20 bg-cyan-200/5 p-16 shadow-[0_0_120px_rgba(34,211,238,0.12)]">
        <div className="rounded-full border border-violet-200/15 bg-violet-200/5 p-10">
          <div className="size-20 rounded-full border border-cyan-200/30 bg-cyan-200/10" />
        </div>
      </div>
    </div>
  );
}
