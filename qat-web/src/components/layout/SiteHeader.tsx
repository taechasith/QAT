/* Hallmark · genre: atmospheric · macrostructure: Rail · design-system: design.md · designed-as-app */
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { getLocale } from "@/lib/i18n/locale";
import { t } from "@/lib/i18n/translations";
import { createClient } from "@/lib/supabase/server";

import { isAdminEmail } from "@/lib/auth/admin";
import { LanguageToggle } from "./LanguageToggle";
import { LogoMark } from "./LogoMark";
import { NavMenu } from "./NavMenu";
import { SignOutButton } from "./SignOutButton";

export async function SiteHeader() {
  const [locale, supabase] = await Promise.all([getLocale(), createClient()]);
  const { data: { user } } = await supabase.auth.getUser();
  const nav = t[locale].nav;

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-xl">
      <div className="mx-auto flex h-20 w-full max-w-7xl items-center justify-between gap-4 px-5 sm:px-8 lg:px-10">
        <LogoMark locale={locale} />

        <div className="flex items-center gap-3">
          <LanguageToggle current={locale} />
          {user ? (
            <div className="hidden items-center gap-2 sm:flex">
              {isAdminEmail(user.email) && (
                <Link
                  href="/admin"
                  className="rounded-full px-3 py-2 text-sm font-medium text-primary transition hover:bg-primary/10 hover:text-primary"
                >
                  Admin
                </Link>
              )}
              <Button
                variant="outline"
                className="border-primary/30 bg-primary/8 text-foreground hover:bg-primary/14 hover:text-primary"
                asChild
              >
                <Link href="/account">{nav.myAccount}</Link>
              </Button>
              <SignOutButton label={nav.signOut} />
            </div>
          ) : (
            <Button
              variant="outline"
              className="hidden border-primary/30 bg-primary/8 text-foreground hover:bg-primary/14 hover:text-primary sm:inline-flex"
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
