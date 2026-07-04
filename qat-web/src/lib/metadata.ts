import type { Metadata } from "next";

import { t } from "@/lib/i18n/translations";
import { getOgSettings } from "@/lib/data/site-settings";

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

export async function getListingMetadata(
  pageKey: keyof (typeof t)["en"]["pages"],
): Promise<Metadata> {
  const p = t["en"].pages[pageKey];
  const og = await getOgSettings();

  return {
    title: `${p.title} | ${SITE_SHORT_NAME}`,
    description: p.description,
    alternates: {
      canonical: siteUrl(`/${pageKey}`),
    },
    openGraph: {
      title: `${p.title} | Quantum Art Thailand`,
      description: p.description,
      url: siteUrl(`/${pageKey}`),
      siteName: SITE_NAME,
      images: og.imageUrl ? [{ url: og.imageUrl, width: 1200, height: 630 }] : [],
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: `${p.title} | Quantum Art Thailand`,
      description: p.description,
      images: og.imageUrl ? [og.imageUrl] : [],
    },
  };
}
