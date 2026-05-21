/* Hallmark · genre: atmospheric · macrostructure: Rail · design-system: design.md · designed-as-app */
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { getLocale } from "@/lib/i18n/locale";
import { t } from "@/lib/i18n/translations";
import { createClient } from "@/lib/supabase/server";

import { LanguageToggle } from "./LanguageToggle";
import { LogoMark } from "./LogoMark";
import { NavMenu } from "./NavMenu";
import { SignOutButton } from "./SignOutButton";

export async function SiteHeader() {
  const [locale, supabase] = await Promise.all([getLocale(), createClient()]);
  const { data: { user } } = await supabase.auth.getUser();
  const nav = t[locale].nav;

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-[#030711]/80 backdrop-blur-xl">
      <div className="mx-auto flex h-20 w-full max-w-7xl items-center justify-between gap-4 px-5 sm:px-8 lg:px-10">
        <LogoMark locale={locale} />

        <div className="flex items-center gap-3">
          <LanguageToggle current={locale} />
          {user ? (
            <div className="hidden items-center gap-2 sm:flex">
              <Button
                variant="outline"
                className="border-cyan-200/30 bg-cyan-200/8 text-cyan-50 hover:bg-cyan-200/14 hover:text-white"
                asChild
              >
                <Link href="/account">{nav.myAccount}</Link>
              </Button>
              <SignOutButton label={nav.signOut} />
            </div>
          ) : (
            <Button
              variant="outline"
              className="hidden border-cyan-200/30 bg-cyan-200/8 text-cyan-50 hover:bg-cyan-200/14 hover:text-white sm:inline-flex"
              asChild
            >
              <Link href="/login">{nav.login}</Link>
            </Button>
          )}
          <NavMenu locale={locale} user={user} />
        </div>
      </div>
    </header>
  );
}
