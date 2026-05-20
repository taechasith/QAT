import { ContentGrid } from "@/components/content/ContentGrid";
import type { ContentItem } from "@/lib/data/content";

type UpcomingHighlightsProps = {
  items: ContentItem[];
  error?: string;
  upcomingTitle: string;
  emptyState: string;
};

export function UpcomingHighlights({
  items,
  error,
  upcomingTitle,
  emptyState,
}: UpcomingHighlightsProps) {
  return (
    <div>
      <p className="font-mono text-xs font-semibold uppercase tracking-[0.28em] text-cyan-200">
        What&apos;s happening
      </p>
      <h2 className="mt-3 text-3xl font-semibold tracking-tight text-white sm:text-4xl">
        {upcomingTitle}
      </h2>
      <div className="mt-8">
        <ContentGrid
          items={items}
          error={error}
          emptyTitle="No events or projects published yet"
          emptyDescription={emptyState}
        />
      </div>
    </div>
  );
}
