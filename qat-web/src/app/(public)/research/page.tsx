import { ContentGrid } from "@/components/content/ContentGrid";
import { PublicPageShell } from "@/components/content/PublicPageShell";
import { getPublishedContentByType } from "@/lib/data/content";

export default async function ResearchPage() {
  const { items, error } = await getPublishedContentByType("research_article");

  return (
    <PublicPageShell
      eyebrow="Lab Notes"
      title="Research"
      description="Published findings, theoretical explorations, and field notes from the QAT collective connecting science and creative practice."
    >
      <ContentGrid
        items={items}
        error={error}
        emptyTitle="No articles yet"
        emptyDescription="Research articles and papers will appear here once published."
      />
    </PublicPageShell>
  );
}
