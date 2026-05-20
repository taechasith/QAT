import { ContentGrid } from "@/components/content/ContentGrid";
import { PublicPageShell } from "@/components/content/PublicPageShell";
import { getPublishedContentByType } from "@/lib/data/content";

export default async function VideoPage() {
  const { items, error } = await getPublishedContentByType("video");

  return (
    <PublicPageShell
      eyebrow="Archive"
      title="Video"
      description="Filmed documentation of exhibitions, performances, and educational programs produced under the QAT initiative."
    >
      <ContentGrid
        items={items}
        error={error}
        emptyTitle="No videos yet"
        emptyDescription="Video documentation and short films will appear here once published."
      />
    </PublicPageShell>
  );
}
