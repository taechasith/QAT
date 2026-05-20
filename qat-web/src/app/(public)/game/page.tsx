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
        emptyDescription="The game page is connected to the public content layer and will show only published CMS items once the admin team adds them."
      />
    </PublicPageShell>
  );
}
