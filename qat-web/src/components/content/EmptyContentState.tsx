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
    <div className="glass-panel rounded-lg p-8 text-center">
      <div className="mx-auto grid size-12 place-items-center rounded-full border border-cyan-200/20 bg-cyan-200/8">
        <Orbit className="size-5 text-cyan-200" aria-hidden="true" />
      </div>
      <h2 className="mt-5 text-2xl font-semibold text-white">{title}</h2>
      <p className="mx-auto mt-3 max-w-2xl text-sm leading-6 text-slate-300">
        {description}
      </p>
      {note ? (
        <p className="mx-auto mt-4 max-w-2xl font-mono text-xs uppercase tracking-[0.18em] text-cyan-100/70">
          {note}
        </p>
      ) : null}
    </div>
  );
}
