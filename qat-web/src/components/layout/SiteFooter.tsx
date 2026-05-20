/* Hallmark · genre: atmospheric · macrostructure: 3-Col · design-system: design.md · designed-as-app */
import Link from "next/link";

import { getSocialLinks } from "@/lib/social-links";

import { LogoMark } from "./LogoMark";
import { SocialPanel } from "./SocialPanel";

const footerNav = [
  { label: "Game", href: "/game" },
  { label: "Course", href: "/course" },
  { label: "Exhibition", href: "/exhibition" },
  { label: "Research", href: "/research" },
  { label: "News", href: "/news" },
  { label: "Talk", href: "/talk" },
  { label: "Experiment", href: "/experiment" },
  { label: "Video", href: "/video" },
];

export function SiteFooter() {
  const socialLinks = getSocialLinks();
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-white/10 bg-[#030711]/95">
      <div className="mx-auto w-full max-w-7xl px-5 py-14 sm:px-8 lg:px-10">
        <div className="grid gap-12 md:grid-cols-[1fr_auto_auto] md:gap-16 lg:gap-24">
          {/* Brand column */}
          <div className="max-w-xs">
            <LogoMark />
            <p className="mt-4 text-sm leading-6 text-slate-400">
              Connecting quantum science, art, education, and public imagination
              across Thailand and beyond.
            </p>
            <p className="mt-6 font-mono text-[10px] uppercase tracking-[0.22em] text-slate-600">
              &copy; {year} QAT Assoc. · CreativeLabTH
            </p>
          </div>

          {/* Nav column */}
          <div>
            <p className="mb-4 font-mono text-[10px] font-semibold uppercase tracking-[0.24em] text-slate-500">
              Explore
            </p>
            <nav className="flex flex-col gap-2.5" aria-label="Footer">
              {footerNav.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className="text-sm text-slate-400 transition-colors duration-150 hover:text-white"
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Social column */}
          <SocialPanel links={socialLinks} />
        </div>
      </div>
    </footer>
  );
}
