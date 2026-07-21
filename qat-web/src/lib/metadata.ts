import type { Metadata } from "next";

import { t } from "@/lib/i18n/translations";
import { getOgSettings } from "@/lib/data/site-settings";
import { getLocale } from "@/lib/i18n/locale";

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://qat.creativelabth.com";

export const SITE_NAME = "Quantum Art Thailand Association";
export const SITE_SHORT_NAME = "QAT";
export const DEFAULT_DESCRIPTION =
  "A CreativeLabTH Group initiative connecting quantum science, art, and public imagination.";

export function siteUrl(path = "/") {
  return new URL(path, SITE_URL).toString();
}

export function metadataBase() {
  return new URL(SITE_URL);
}

export function aiTextAlternates(): NonNullable<Metadata["alternates"]>["types"] {
  return {
    "text/plain": [
      { title: "LLMs TXT", url: siteUrl("/llms.txt") },
      { title: "LLMs Full TXT", url: siteUrl("/llms-full.txt") },
    ],
  };
}

export async function getListingMetadata(
  pageKey: keyof (typeof t)["en"]["pages"],
): Promise<Metadata> {
  const locale = await getLocale();
  const p = t[locale].pages[pageKey];
  const og = await getOgSettings();
  const title = `${p.title} | ${SITE_SHORT_NAME}`;
  const description = p.description;
  const canonicalUrl = siteUrl(`/${pageKey}`);

  return {
    title,
    description,
    alternates: {
      canonical: canonicalUrl,
      types: aiTextAlternates(),
    },
    openGraph: {
      title: `${p.title} | Quantum Art Thailand`,
      description,
      url: canonicalUrl,
      siteName: SITE_NAME,
      images: og.imageUrl
        ? [{ url: og.imageUrl, width: 1200, height: 630 }]
        : [{ url: siteUrl("/brand/QAT_Logo.png"), width: 1200, height: 630 }],
      locale: locale === "th" ? "th_TH" : "en_US",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: `${p.title} | Quantum Art Thailand`,
      description,
      images: og.imageUrl ? [og.imageUrl] : [siteUrl("/brand/QAT_Logo.png")],
    },
  };
}
