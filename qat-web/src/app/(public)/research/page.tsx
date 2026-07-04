import type { Metadata } from "next";
import { ContentGrid } from "@/components/content/ContentGrid";
import { PublicPageShell } from "@/components/content/PublicPageShell";
import { getPublishedContentByType } from "@/lib/data/content";
import { getTranslations } from "@/lib/i18n/locale";
import { getListingMetadata, siteUrl } from "@/lib/metadata";

export async function generateMetadata(): Promise<Metadata> {
  return getListingMetadata("research");
}

export default async function ResearchPage() {
  const [{ items, error }, tr] = await Promise.all([
    getPublishedContentByType("research_article"),
    getTranslations(),
  ]);
  const p = tr.pages.research;

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": tr.locale === "th" ? "หน้าแรก" : "Home",
        "item": siteUrl("/"),
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": p.title,
        "item": siteUrl("/research"),
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <PublicPageShell eyebrow={p.eyebrow} title={p.title} description={p.description}>
        <ContentGrid items={items} error={error} emptyTitle={p.emptyTitle} emptyDescription={p.emptyDescription} />
      </PublicPageShell>
    </>
  );
}
