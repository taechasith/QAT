/* Hallmark · genre: atmospheric · macrostructure: Rail · design-system: design.md · designed-as-app */
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { getLocale } from "@/lib/i18n/locale";

import { LanguageToggle } from "./LanguageToggle";
import { LogoMark } from "./LogoMark";
import { NavMenu } from "./NavMenu";

export async function SiteHeader() {
  const locale = await getLocale();

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-[#030711]/80 backdrop-blur-xl">
      <div className="mx-auto flex h-20 w-full max-w-7xl items-center justify-between gap-4 px-5 sm:px-8 lg:px-10">
        <LogoMark locale={locale} />

        <div className="flex items-center gap-3">
          <LanguageToggle current={locale} />
          <Button
            variant="outline"
            className="hidden border-cyan-200/30 bg-cyan-200/8 text-cyan-50 hover:bg-cyan-200/14 hover:text-white sm:inline-flex"
            asChild
          >
            <Link href="/login">Login</Link>
          </Button>
          <NavMenu locale={locale} />
        </div>
      </div>
    </header>
  );
}
