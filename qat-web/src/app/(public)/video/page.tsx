import type { Metadata } from "next";
import { ContentGrid } from "@/components/content/ContentGrid";
import { PublicPageShell } from "@/components/content/PublicPageShell";
import { getPublishedContentByType } from "@/lib/data/content";
import { getTranslations } from "@/lib/i18n/locale";
import { getListingMetadata } from "@/lib/metadata";

export async function generateMetadata(): Promise<Metadata> {
  return getListingMetadata("video");
}

export default async function VideoPage() {
  const [{ items, error }, tr] = await Promise.all([
    getPublishedContentByType("video"),
    getTranslations(),
  ]);
  const p = tr.pages.video;

  return (
    <PublicPageShell eyebrow={p.eyebrow} title={p.title} description={p.description}>
      <ContentGrid items={items} error={error} emptyTitle={p.emptyTitle} emptyDescription={p.emptyDescription} />
    </PublicPageShell>
  );
}
