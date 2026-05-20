import { ContentGrid } from "@/components/content/ContentGrid";
import { PublicPageShell } from "@/components/content/PublicPageShell";
import { getPublishedContentByType } from "@/lib/data/content";

export default async function TalkPage() {
  const { items, error } = await getPublishedContentByType("talk");

  return (
    <PublicPageShell
      eyebrow="Lecture Series"
      title="Talk"
      description="Recorded lectures, panel conversations, and public dialogues at the intersection of quantum science and culture."
    >
      <ContentGrid
        items={items}
        error={error}
        emptyTitle="No talks yet"
        emptyDescription="Talk recordings and lecture transcripts will appear here once published."
      />
    </PublicPageShell>
  );
}
