import { ContentGrid } from "@/components/content/ContentGrid";
import { PublicPageShell } from "@/components/content/PublicPageShell";
import { getPublishedContentByType } from "@/lib/data/content";

export default async function GamePage() {
  const { items, error } = await getPublishedContentByType("game");

  return (
    <PublicPageShell
      eyebrow="Destination"
      title="Game"
      description="Interactive quantum learning experiences and creative experiments will be published here."
    >
      <ContentGrid
        items={items}
        error={error}
        emptyTitle="No games published yet"
        emptyDescription="Games created under the QAT initiative will be listed here once they are available."
      />
    </PublicPageShell>
  );
}
