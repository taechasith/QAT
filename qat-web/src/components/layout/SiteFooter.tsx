import { getSocialLinks } from "@/lib/social-links";

import { LogoMark } from "./LogoMark";
import { SocialPanel } from "./SocialPanel";

export function SiteFooter() {
  const socialLinks = getSocialLinks();

  return (
    <footer className="border-t border-white/10 bg-[#030711]/95">
      <div className="mx-auto grid w-full max-w-7xl gap-6 px-5 py-8 sm:px-8 lg:grid-cols-[1fr_420px] lg:px-10">
        <div>
          <LogoMark />
          <p className="mt-4 max-w-xl text-sm leading-6 text-slate-300">
            Quantum Art Thailand Association is a CreativeLabTH Group initiative
            connecting quantum science, art, education, and public imagination.
          </p>
        </div>
        <SocialPanel links={socialLinks} />
      </div>
    </footer>
  );
}
