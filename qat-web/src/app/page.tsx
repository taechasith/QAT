import { QuantumLanding } from "@/components/landing/QuantumLanding";
import { getFeaturedPublishedContent } from "@/lib/data/content";
import { getHomepageSettings } from "@/lib/data/site-settings";
import {
  DEFAULT_DESCRIPTION,
  SITE_NAME,
  SITE_SHORT_NAME,
  siteUrl,
} from "@/lib/metadata";

export const dynamic = "force-dynamic";

export default async function Home() {
  const [homepageSettings, featuredContent] = await Promise.all([
    getHomepageSettings(),
    getFeaturedPublishedContent(),
  ]);

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": siteUrl("/#organization"),
        name: SITE_NAME,
        alternateName: SITE_SHORT_NAME,
        url: siteUrl("/"),
        logo: siteUrl("/brand/QAT_Logo.png"),
        description: DEFAULT_DESCRIPTION,
      },
      {
        "@type": "WebSite",
        "@id": siteUrl("/#website"),
        name: SITE_NAME,
        alternateName: SITE_SHORT_NAME,
        url: siteUrl("/"),
        description: DEFAULT_DESCRIPTION,
        publisher: {
          "@id": siteUrl("/#organization"),
        },
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <QuantumLanding
        featuredItems={featuredContent.items}
        featuredError={featuredContent.error}
        upcomingTitle={homepageSettings.upcomingTitle}
        emptyState={homepageSettings.emptyState}
      />
    </>
  );
}
