import { ContentGrid } from "@/components/content/ContentGrid";
import type { ContentItem } from "@/lib/data/content";
import { getTranslations } from "@/lib/i18n/locale";

type UpcomingHighlightsProps = {
  items: ContentItem[];
  error?: string;
  upcomingTitle: string;
  emptyState: string;
};

export async function UpcomingHighlights({
  items,
  error,
  upcomingTitle,
  emptyState,
}: UpcomingHighlightsProps) {
  const tr = await getTranslations();

  return (
    <div>
      <p className="font-mono text-xs font-semibold uppercase tracking-[0.28em] text-primary">
        {tr.portal.whatsHappening}
      </p>
      <h2 className="mt-3 text-3xl font-semibold tracking-tight text-white sm:text-4xl">
        {upcomingTitle}
      </h2>
      <div className="mt-8">
        <ContentGrid
          items={items}
          error={error}
          emptyTitle={tr.locale === "th" ? "ยังไม่มีกิจกรรมหรือโครงการ" : "No events or projects published yet"}
          emptyDescription={emptyState}
        />
      </div>
    </div>
  );
}
