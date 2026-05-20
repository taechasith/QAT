import { ContentGrid } from "@/components/content/ContentGrid";
import { PublicPageShell } from "@/components/content/PublicPageShell";
import { getPublishedContentByType } from "@/lib/data/content";

export default async function NewsPage() {
  const { items, error } = await getPublishedContentByType("news");

  return (
    <PublicPageShell
      eyebrow="Updates"
      title="News Updated"
      description="Official QAT updates, announcements, and public notices will be published here."
    >
      <ContentGrid
        items={items}
        error={error}
        emptyTitle="No news published yet"
        emptyDescription="News and announcements will appear here as they are published."
      />
    </PublicPageShell>
  );
}
