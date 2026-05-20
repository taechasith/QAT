import Image from "next/image";
import Link from "next/link";

export function LogoMark() {
  return (
    <Link
      href="/"
      className="group inline-flex items-center gap-2.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300 focus-visible:ring-offset-2 focus-visible:ring-offset-background"
      aria-label="Quantum Art Thailand Association home"
    >
      <Image
        src="/brand/QAT_Logo.png"
        alt=""
        width={36}
        height={36}
        className="size-9 object-contain"
        priority
      />
      <span className="flex flex-col leading-none">
        <span className="text-sm font-semibold tracking-[0.18em] text-white">
          QAT
        </span>
        <span className="mt-0.5 text-[0.65rem] font-medium uppercase tracking-[0.22em] text-cyan-100/70">
          Quantum Art Thailand
        </span>
      </span>
    </Link>
  );
}
