import { ContentGrid } from "@/components/content/ContentGrid";
import { PublicPageShell } from "@/components/content/PublicPageShell";
import { getPublishedContentByType } from "@/lib/data/content";

export default async function CoursePage() {
  const { items, error } = await getPublishedContentByType("course");

  return (
    <PublicPageShell
      eyebrow="Destination"
      title="Course"
      description="Courses, workshops, and learning programs for quantum science communication will appear here."
    >
      <ContentGrid
        items={items}
        error={error}
        emptyTitle="No courses published yet"
        emptyDescription="Courses will appear here once they are published. Stay tuned for upcoming learning opportunities."
      />
    </PublicPageShell>
  );
}
