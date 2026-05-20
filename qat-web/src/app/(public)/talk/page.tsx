import { ContentGrid } from "@/components/content/ContentGrid";
import { PublicPageShell } from "@/components/content/PublicPageShell";
import { getPublishedContentByType } from "@/lib/data/content";

export default async function TalkPage() {
  const { items, error } = await getPublishedContentByType("talk");

  return (
    <PublicPageShell
      eyebrow="Talks"
      title="Talks"
      description="Lectures, discussions, and conversations at the intersection of quantum science and creative culture."
    >
      <ContentGrid
        items={items}
        error={error}
        emptyTitle="No talks published yet"
        emptyDescription="Talk listings will appear here after admins publish content through the CMS."
      />
    </PublicPageShell>
  );
}
