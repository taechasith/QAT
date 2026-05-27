import { Orbit } from "lucide-react";

type EmptyContentStateProps = {
  title: string;
  description: string;
  note?: string;
};

export function EmptyContentState({
  title,
  description,
  note,
}: EmptyContentStateProps) {
  return (
    <div className="relative overflow-hidden rounded-xl border border-white/8 bg-white/[0.03] px-8 py-16 text-center">
      {/* Subtle radial glow */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(34,211,238,0.07),transparent_55%)]" />

      <div className="relative mx-auto grid size-14 place-items-center rounded-full border border-primary/20 bg-gradient-to-b from-cyan-200/10 to-transparent">
        <Orbit className="size-6 text-primary/70" aria-hidden="true" />
      </div>

      <h2 className="relative mt-6 text-lg font-semibold tracking-tight text-white">
        {title}
      </h2>
      <p className="relative mx-auto mt-2 max-w-sm text-sm leading-6 text-muted-foreground">
        {description}
      </p>

      {note ? (
        <p className="relative mx-auto mt-6 font-mono text-[10px] uppercase tracking-[0.24em] text-primary/80/50">
          {note}
        </p>
      ) : null}
    </div>
  );
}
