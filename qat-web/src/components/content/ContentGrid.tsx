import { ContentCard } from "@/components/content/ContentCard";
import { EmptyContentState } from "@/components/content/EmptyContentState";
import type { ContentItem } from "@/lib/data/content";
import { getTranslations } from "@/lib/i18n/locale";

type ContentGridProps = {
  items: ContentItem[];
  emptyTitle: string;
  emptyDescription: string;
  error?: string;
};

export async function ContentGrid({
  items,
  emptyTitle,
  emptyDescription,
  error,
}: ContentGridProps) {
  const tr = await getTranslations();

  if (items.length === 0) {
    return (
      <EmptyContentState
        title={emptyTitle}
        description={emptyDescription}
        note={error ? tr.empty.errorNote : tr.empty.note}
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
