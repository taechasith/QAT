"use client";

import { useRouter } from "next/navigation";
import type { Locale } from "@/lib/i18n/translations";

export function LanguageToggle({ current }: { current: Locale }) {
  const router = useRouter();

  function toggle() {
    const next = current === "en" ? "th" : "en";
    document.cookie = `lang=${next};path=/;max-age=31536000;SameSite=Lax`;
    router.refresh();
  }

  return (
    <button
      type="button"
      onClick={toggle}
      className="inline-flex h-8 items-center rounded-full border border-white/15 bg-white/5 px-3 font-mono text-xs font-semibold text-slate-300 transition hover:border-white/30 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300"
      aria-label={current === "en" ? "Switch to Thai" : "Switch to English"}
    >
      {current === "en" ? "ไทย" : "EN"}
    </button>
  );
}
