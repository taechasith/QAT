import { Atom, Palette } from "lucide-react";

export function MissionSection() {
  return (
    <section
      id="mission"
      className="relative mx-auto w-full max-w-7xl px-5 py-24 sm:px-8 lg:px-10"
    >
      <p className="font-mono text-xs font-semibold uppercase tracking-[0.32em] text-cyan-200">
        What we do
      </p>
      <h2 className="mt-4 max-w-3xl text-4xl font-semibold tracking-tight text-white sm:text-5xl">
        Where quantum science meets human imagination
      </h2>

      <div className="mt-16 grid gap-12 lg:grid-cols-2 lg:gap-20">
        <div className="flex flex-col gap-6">
          <div className="flex size-12 items-center justify-center rounded-xl border border-cyan-200/20 bg-cyan-200/10">
            <Atom className="size-6 text-cyan-200" aria-hidden="true" />
          </div>
          <div>
            <p className="font-mono text-xs font-semibold uppercase tracking-[0.28em] text-cyan-200">
              Mission I
            </p>
            <h3 className="mt-3 text-2xl font-semibold tracking-tight text-white">
              Making hard science public
            </h3>
          </div>
          <p className="text-base leading-8 text-slate-300">
            Quantum science sits at the edge of what we can imagine — but it need not be hidden
            behind academic language. QAT uses visual storytelling, interaction design, and
            artistic practice to bring quantum concepts closer to students, creators, and curious
            minds everywhere.
          </p>
          <p className="text-base leading-8 text-slate-300">
            We believe science becomes culture when it is made accessible. When a person can see,
            feel, or play with an idea, it stops being abstract and starts becoming real.
          </p>
        </div>

        <div className="flex flex-col gap-6">
          <div className="flex size-12 items-center justify-center rounded-xl border border-violet-200/20 bg-violet-200/10">
            <Palette className="size-6 text-violet-200" aria-hidden="true" />
          </div>
          <div>
            <p className="font-mono text-xs font-semibold uppercase tracking-[0.28em] text-violet-200">
              Mission II
            </p>
            <h3 className="mt-3 text-2xl font-semibold tracking-tight text-white">
              Art as a scientific instrument
            </h3>
          </div>
          <p className="text-base leading-8 text-slate-300">
            Art and science are not opposites. Artists ask questions that scientists have not yet
            written down. At QAT, we invite artists, designers, and creative technologists to work
            beside researchers — not to illustrate science, but to help imagine it differently.
          </p>
          <p className="text-base leading-8 text-slate-300">
            Artistic experiments become a way to test assumptions, reframe problems, and open new
            corridors of imagination in the quantum world.
          </p>
        </div>
      </div>
    </section>
  );
}
