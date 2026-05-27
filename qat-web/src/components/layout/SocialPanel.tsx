import { Mail, Share2 } from "lucide-react";

import type { SocialLink } from "@/lib/social-links";

type SocialPanelProps = {
  links: SocialLink[];
};

export function SocialPanel({ links }: SocialPanelProps) {
  return (
    <section
      className="flex flex-col items-center justify-center rounded-lg border border-white/10 bg-white/[0.04] p-6"
      aria-labelledby="social-panel-heading"
    >
      <div className="flex items-center gap-2 text-sm font-semibold text-white">
        <Share2 className="size-4 text-primary" aria-hidden="true" />
        <h2 id="social-panel-heading">Social Media</h2>
      </div>
      <div className="mt-4 flex flex-wrap justify-center gap-2">
        {links.map((link) => (
          <a
            key={`${link.label}-${link.href}`}
            href={link.href}
            target={link.href.startsWith("mailto:") ? undefined : "_blank"}
            rel={link.href.startsWith("mailto:") ? undefined : "noreferrer"}
            className="inline-flex h-9 items-center gap-2 rounded-full border border-primary/15 bg-primary/8 px-3 text-sm text-foreground transition hover:border-primary/35 hover:bg-primary/14 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
          >
            {link.href.startsWith("mailto:") ? (
              <Mail className="size-3.5" aria-hidden="true" />
            ) : null}
            {link.label}
          </a>
        ))}
      </div>
    </section>
  );
}
