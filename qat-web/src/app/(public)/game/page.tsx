import { ContentGrid } from "@/components/content/ContentGrid";
import { PublicPageShell } from "@/components/content/PublicPageShell";
import { getPublishedContentByType } from "@/lib/data/content";

export default async function GamePage() {
  const { items, error } = await getPublishedContentByType("game");

  return (
    <PublicPageShell
      eyebrow="Playground"
      title="Game"
      description="Interactive quantum experiences — particle simulators, puzzles, and conceptual games that make the invisible tangible."
    >
      <ContentGrid
        items={items}
        error={error}
        emptyTitle="No games yet"
        emptyDescription="Quantum games and interactive works will appear here when released."
      />
    </PublicPageShell>
  );
}
