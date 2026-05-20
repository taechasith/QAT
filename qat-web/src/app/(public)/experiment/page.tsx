import { ContentGrid } from "@/components/content/ContentGrid";
import { PublicPageShell } from "@/components/content/PublicPageShell";
import { getPublishedContentByType } from "@/lib/data/content";

export default async function ExperimentPage() {
  const { items, error } = await getPublishedContentByType("experiment");

  return (
    <PublicPageShell
      eyebrow="Experiments"
      title="Experiments"
      description="Interactive and conceptual experiments exploring quantum phenomena through art and design."
    >
      <ContentGrid
        items={items}
        error={error}
        emptyTitle="No experiments published yet"
        emptyDescription="Experiment listings will appear here after admins publish content through the CMS."
      />
    </PublicPageShell>
  );
}
