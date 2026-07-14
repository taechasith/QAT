import type { Metadata } from "next";
import { QuantumLanding } from "@/components/landing/QuantumLanding";
import { getFeaturedPublishedContent } from "@/lib/data/content";
import { getHomepageSettings, getOgSettings } from "@/lib/data/site-settings";
import { getLocale } from "@/lib/i18n/locale";
import { t } from "@/lib/i18n/translations";
import {
  SITE_NAME,
  SITE_SHORT_NAME,
  aiTextAlternates,
  siteUrl,
} from "@/lib/metadata";

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const tr = t[locale];
  const og = await getOgSettings();
  
  const title = locale === "th"
    ? `${SITE_NAME} (QAT) | วิทยาศาสตร์ควอนตัม ศิลปะ และจินตนาการ`
    : `${SITE_NAME} (QAT) | Quantum Science, Art & Imagination`;
    
  const description = tr.hero.description;
  const canonicalUrl = siteUrl("/");

  return {
    title,
    description,
    keywords: locale === "th" 
      ? [
          "Quantum Art Thailand",
          "QAT",
          "สมาคมศิลปะควอนตัมแห่งประเทศไทย",
          "วิทยาศาสตร์ควอนตัม",
          "ศิลปะควอนตัม",
          "การสื่อสารวิทยาศาสตร์",
          "เทคโนโลยีสร้างสรรค์",
          "การออกแบบปฏิสัมพันธ์",
          "ศิลปะและวิทยาศาสตร์",
          "ฟิสิกส์ควอนตัม"
        ]
      : [
          "Quantum Art Thailand",
          "QAT",
          "quantum art",
          "quantum science",
          "science communication",
          "creative technology",
          "Thailand",
          "interaction design",
          "quantum physics",
          "art and science"
        ],
    alternates: {
      canonical: canonicalUrl,
      types: aiTextAlternates(),
    },
    openGraph: {
      title,
      description,
      url: canonicalUrl,
      siteName: SITE_NAME,
      images: og.imageUrl ? [{ url: og.imageUrl, width: 1200, height: 630 }] : [],
      locale: locale === "th" ? "th_TH" : "en_US",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: og.imageUrl ? [og.imageUrl] : [],
    },
  };
}

export default async function Home() {
  const [homepageSettings, featuredContent, locale] = await Promise.all([
    getHomepageSettings(),
    getFeaturedPublishedContent(),
    getLocale(),
  ]);

  const tr = t[locale];

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
        description: tr.footer.tagline,
      },
      {
        "@type": "WebSite",
        "@id": siteUrl("/#website"),
        name: SITE_NAME,
        alternateName: SITE_SHORT_NAME,
        url: siteUrl("/"),
        description: tr.hero.description,
        publisher: {
          "@id": siteUrl("/#organization"),
        },
      },
      {
        "@type": "WebApplication",
        "@id": siteUrl("/#webapplication"),
        name: SITE_NAME,
        alternateName: SITE_SHORT_NAME,
        url: siteUrl("/"),
        image: siteUrl("/brand/QAT_Logo.png"),
        applicationCategory: "EducationalApplication",
        operatingSystem: "All",
        browserRequirements: "Requires JavaScript. Requires HTML5.",
        author: {
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
