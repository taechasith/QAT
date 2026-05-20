import { ContentCard } from "@/components/content/ContentCard";
import { EmptyContentState } from "@/components/content/EmptyContentState";
import type { ContentItem } from "@/lib/data/content";

type ContentGridProps = {
  items: ContentItem[];
  emptyTitle: string;
  emptyDescription: string;
  error?: string;
};

export function ContentGrid({
  items,
  emptyTitle,
  emptyDescription,
  error,
}: ContentGridProps) {
  if (items.length === 0) {
    return (
      <EmptyContentState
        title={emptyTitle}
        description={emptyDescription}
        note={error ? "CMS connection pending" : "Awaiting published content"}
      />
    );
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
      {items.map((item) => (
        <ContentCard key={item.id} item={item} />
      ))}
    </div>
  );
}
