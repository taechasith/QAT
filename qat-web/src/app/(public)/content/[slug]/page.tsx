import { notFound } from "next/navigation";
import { CalendarDays, ExternalLink, MapPin } from "lucide-react";

import { PublicPageShell } from "@/components/content/PublicPageShell";
import { getPublishedContentBySlug } from "@/lib/data/content";

type ContentDetailPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

function formatDate(value: string | null) {
  if (!value) {
    return null;
  }

  return new Intl.DateTimeFormat("en", {
    month: "long",
    day: "numeric",
    year: "numeric",
  }).format(new Date(value));
}

export default async function ContentDetailPage({
  params,
}: ContentDetailPageProps) {
  const { slug } = await params;
  const { item } = await getPublishedContentBySlug(slug);

  if (!item) {
    notFound();
  }

  const date = formatDate(item.start_at ?? item.published_at);

  return (
    <PublicPageShell
      eyebrow={item.content_type.replace("_", " ")}
      title={item.title}
      description={item.excerpt ?? "Published QAT content."}
    >
      <article className="glass-panel rounded-lg p-6 sm:p-8">
        <div className="flex flex-wrap gap-4 text-sm text-slate-300">
          {date ? (
            <span className="inline-flex items-center gap-2">
              <CalendarDays className="size-4 text-cyan-200" aria-hidden="true" />
              {date}
            </span>
          ) : null}
          {item.location ? (
            <span className="inline-flex items-center gap-2">
              <MapPin className="size-4 text-cyan-200" aria-hidden="true" />
              {item.location}
            </span>
          ) : null}
        </div>
        {item.body_md ? (
          <div className="mt-8 whitespace-pre-wrap text-base leading-8 text-slate-200">
            {item.body_md}
          </div>
        ) : (
          <p className="mt-8 text-base leading-8 text-slate-300">
            More details will be added by the QAT team.
          </p>
        )}
        {item.external_url ? (
          <a
            href={item.external_url}
            target="_blank"
            rel="noreferrer"
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-cyan-200 px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300"
          >
            Open related link
            <ExternalLink className="size-4" aria-hidden="true" />
          </a>
        ) : null}
      </article>
    </PublicPageShell>
  );
}
