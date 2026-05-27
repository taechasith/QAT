import { Atom, Palette } from "lucide-react";

import { getTranslations } from "@/lib/i18n/locale";

export async function MissionSection() {
  const tr = await getTranslations();
  const m = tr.mission;

  return (
    <section
      id="mission"
      className="relative mx-auto w-full max-w-7xl px-5 py-24 sm:px-8 lg:px-10"
    >
      <p className="font-mono text-xs font-semibold uppercase tracking-[0.32em] text-primary">
        {m.eyebrow}
      </p>
      <h2 className="mt-4 max-w-3xl text-4xl font-semibold tracking-tight text-white sm:text-5xl">
        {m.heading}
      </h2>

      <div className="mt-16 grid gap-12 lg:grid-cols-2 lg:gap-20">
        <div className="flex flex-col gap-6">
          <div className="flex size-12 items-center justify-center rounded-xl border border-primary/20 bg-primary/10">
            <Atom className="size-6 text-primary" aria-hidden="true" />
          </div>
          <div>
            <p className="font-mono text-xs font-semibold uppercase tracking-[0.28em] text-primary">
              {m.mission1Eyebrow}
            </p>
            <h3 className="mt-3 text-2xl font-semibold tracking-tight text-white">
              {m.mission1Title}
            </h3>
          </div>
          <p className="text-base leading-8 text-foreground/70">{m.mission1p1}</p>
          <p className="text-base leading-8 text-foreground/70">{m.mission1p2}</p>
        </div>

        <div className="flex flex-col gap-6">
          <div className="flex size-12 items-center justify-center rounded-xl border border-accent/20 bg-accent/10">
            <Palette className="size-6 text-accent" aria-hidden="true" />
          </div>
          <div>
            <p className="font-mono text-xs font-semibold uppercase tracking-[0.28em] text-accent">
              {m.mission2Eyebrow}
            </p>
            <h3 className="mt-3 text-2xl font-semibold tracking-tight text-white">
              {m.mission2Title}
            </h3>
          </div>
          <p className="text-base leading-8 text-foreground/70">{m.mission2p1}</p>
          <p className="text-base leading-8 text-foreground/70">{m.mission2p2}</p>
        </div>
      </div>
    </section>
  );
}
