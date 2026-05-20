import { ContentGrid } from "@/components/content/ContentGrid";
import { PublicPageShell } from "@/components/content/PublicPageShell";
import { getPublishedContentByType } from "@/lib/data/content";

export default async function ResearchPage() {
  const { items, error } = await getPublishedContentByType("research_article");

  return (
    <PublicPageShell
      eyebrow="Publication"
      title="Research / Article"
      description="Articles, notes, interviews, and research reflections will connect scientific ideas with creative practice."
    >
      <ContentGrid
        items={items}
        error={error}
        emptyTitle="No research articles published yet"
        emptyDescription="The research page is wired to published CMS articles only. Drafts remain hidden from public visitors."
      />
    </PublicPageShell>
  );
}
