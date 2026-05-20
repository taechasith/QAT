import { ContentGrid } from "@/components/content/ContentGrid";
import { PublicPageShell } from "@/components/content/PublicPageShell";
import { getPublishedContentByType } from "@/lib/data/content";

export default async function VideoPage() {
  const { items, error } = await getPublishedContentByType("video");

  return (
    <PublicPageShell
      eyebrow="Videos"
      title="Videos"
      description="Documentary, artistic, and educational video works produced under the QAT initiative."
    >
      <ContentGrid
        items={items}
        error={error}
        emptyTitle="No videos published yet"
        emptyDescription="Video listings will appear here after admins publish content through the CMS."
      />
    </PublicPageShell>
  );
}
