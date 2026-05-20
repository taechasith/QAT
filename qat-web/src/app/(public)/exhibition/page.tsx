import { ContentGrid } from "@/components/content/ContentGrid";
import { PublicPageShell } from "@/components/content/PublicPageShell";
import { getPublishedContentByType } from "@/lib/data/content";

export default async function ExhibitionPage() {
  const { items, error } = await getPublishedContentByType("exhibition");

  return (
    <PublicPageShell
      eyebrow="Archive"
      title="Exhibition"
      description="Past and upcoming exhibitions will document how quantum ideas become public cultural experiences."
    >
      <ContentGrid
        items={items}
        error={error}
        emptyTitle="No exhibitions published yet"
        emptyDescription="The exhibition archive is ready. Published exhibition records will appear here after CMS content is added."
      />
    </PublicPageShell>
  );
}
