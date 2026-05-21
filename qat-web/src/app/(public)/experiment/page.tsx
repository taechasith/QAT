import type { Metadata } from "next";
import { ContentGrid } from "@/components/content/ContentGrid";
import { PublicPageShell } from "@/components/content/PublicPageShell";
import { getPublishedContentByType } from "@/lib/data/content";
import { getTranslations } from "@/lib/i18n/locale";
import { getListingMetadata } from "@/lib/metadata";

export async function generateMetadata(): Promise<Metadata> {
  return getListingMetadata("experiment");
}

export default async function ExperimentPage() {
  const [{ items, error }, tr] = await Promise.all([
    getPublishedContentByType("experiment"),
    getTranslations(),
  ]);
  const p = tr.pages.experiment;

  return (
    <PublicPageShell eyebrow={p.eyebrow} title={p.title} description={p.description}>
      <ContentGrid items={items} error={error} emptyTitle={p.emptyTitle} emptyDescription={p.emptyDescription} />
    </PublicPageShell>
  );
}
