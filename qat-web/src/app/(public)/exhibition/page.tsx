import { ContentGrid } from "@/components/content/ContentGrid";
import { PublicPageShell } from "@/components/content/PublicPageShell";
import { getPublishedContentByType } from "@/lib/data/content";

export default async function ExhibitionPage() {
  const { items, error } = await getPublishedContentByType("exhibition");

  return (
    <PublicPageShell
      eyebrow="Gallery"
      title="Exhibition"
      description="Curated installations and digital exhibitions mapping the boundary where physics becomes cultural experience."
    >
      <ContentGrid
        items={items}
        error={error}
        emptyTitle="No exhibitions yet"
        emptyDescription="Exhibition documentation and upcoming shows will be listed here as they open."
      />
    </PublicPageShell>
  );
}
