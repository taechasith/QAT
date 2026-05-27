/* Hallmark · genre: atmospheric · macrostructure: 3-Col · design-system: design.md · designed-as-app */
import { getSocialLinks } from "@/lib/social-links";
import { getTranslations } from "@/lib/i18n/locale";

import { LogoMark } from "./LogoMark";
import { SocialPanel } from "./SocialPanel";

export async function SiteFooter() {
  const [socialLinks, tr] = await Promise.all([
    Promise.resolve(getSocialLinks()),
    getTranslations(),
  ]);
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border bg-background/95">
      <div className="mx-auto w-full max-w-7xl px-5 py-14 sm:px-8 lg:px-10">
        <div className="grid gap-12 md:grid-cols-[1fr_auto] md:gap-16 lg:gap-24">
          <div className="max-w-xs">
            <LogoMark locale={tr.locale} />
            <p className="mt-4 text-sm leading-6 text-muted-foreground">
              {tr.footer.tagline}
            </p>
            <p className="mt-6 text-xs text-muted-foreground/50">
              {tr.footer.copyright(year)}
            </p>
          </div>

          <SocialPanel links={socialLinks} />
        </div>
      </div>
    </footer>
  );
}
