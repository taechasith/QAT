import { ContentGrid } from "@/components/content/ContentGrid";
import { PublicPageShell } from "@/components/content/PublicPageShell";
import { getPublishedContentByType } from "@/lib/data/content";

export default async function CoursePage() {
  const { items, error } = await getPublishedContentByType("course");

  return (
    <PublicPageShell
      eyebrow="Learning Lab"
      title="Course"
      description="Structured programs bridging quantum science and creative practice — workshops, courses, and guided explorations."
    >
      <ContentGrid
        items={items}
        error={error}
        emptyTitle="No courses yet"
        emptyDescription="Courses and workshops will appear here once published. New programs are in development."
      />
    </PublicPageShell>
  );
}
