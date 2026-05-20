import { ContentGrid } from "@/components/content/ContentGrid";
import { PublicPageShell } from "@/components/content/PublicPageShell";
import { getPublishedContentByType } from "@/lib/data/content";

export default async function NewsPage() {
  const { items, error } = await getPublishedContentByType("news");

  return (
    <PublicPageShell
      eyebrow="Dispatch"
      title="News"
      description="Updates from the quantum art frontier — events, partnerships, grants, and announcements from QAT Assoc."
    >
      <ContentGrid
        items={items}
        error={error}
        emptyTitle="No news yet"
        emptyDescription="Announcements and updates will appear here as they are published."
      />
    </PublicPageShell>
  );
}
