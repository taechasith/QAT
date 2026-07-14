import Image from "next/image";
import Link from "next/link";
import { t, type Locale } from "@/lib/i18n/translations";

export function LogoMark({ locale = "en" }: { locale?: Locale }) {
  const tr = t[locale].logo;

  return (
    <Link
      href="/"
      className="group inline-flex items-center gap-2.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background"
      aria-label="Quantum Art Thailand Association home"
    >
      <Image
        src="/brand/QAT_Logo.png"
        alt=""
        width={36}
        height={36}
        className="size-9 object-contain"
      />
      <span className="flex flex-col leading-none">
        <span className="text-sm font-semibold tracking-[0.18em] text-white">
          {tr.name}
        </span>
        <span className="mt-0.5 text-[0.65rem] font-medium uppercase tracking-[0.22em] text-primary/80/70">
          {tr.tagline}
        </span>
      </span>
    </Link>
  );
}
