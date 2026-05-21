"use client";

import { useRouter } from "next/navigation";
import type { Locale } from "@/lib/i18n/translations";

export function LanguageToggle({ current }: { current: Locale }) {
  const router = useRouter();

  function setLocale(next: Locale) {
    document.cookie = `lang=${next};path=/;max-age=31536000;SameSite=Lax`;
    router.refresh();
  }

  return (
    <div className="inline-flex h-8 items-center gap-0.5 rounded-full border border-white/15 bg-white/5 p-0.5">
      <button
        type="button"
        onClick={() => setLocale("en")}
        className={`inline-flex h-7 items-center rounded-full px-3 font-mono text-xs font-semibold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300 ${
          current === "en"
            ? "bg-cyan-200 text-slate-950"
            : "text-slate-400 hover:text-white"
        }`}
        aria-pressed={current === "en"}
      >
        EN
      </button>
      <button
        type="button"
        onClick={() => setLocale("th")}
        className={`inline-flex h-7 items-center rounded-full px-3 font-mono text-xs font-semibold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300 ${
          current === "th"
            ? "bg-cyan-200 text-slate-950"
            : "text-slate-400 hover:text-white"
        }`}
        aria-pressed={current === "th"}
      >
        ไทย
      </button>
    </div>
  );
}
