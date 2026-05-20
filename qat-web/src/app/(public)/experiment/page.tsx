import { ContentGrid } from "@/components/content/ContentGrid";
import { PublicPageShell } from "@/components/content/PublicPageShell";
import { getPublishedContentByType } from "@/lib/data/content";

export default async function ExperimentPage() {
  const { items, error } = await getPublishedContentByType("experiment");

  return (
    <PublicPageShell
      eyebrow="Field Work"
      title="Experiment"
      description="Live experiments, prototypes, and works-in-progress — open research from QAT's ongoing creative investigations."
    >
      <ContentGrid
        items={items}
        error={error}
        emptyTitle="No experiments yet"
        emptyDescription="Experimental works and prototypes will be shared here as they develop."
      />
    </PublicPageShell>
  );
}
