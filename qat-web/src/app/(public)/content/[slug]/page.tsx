import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CalendarDays, ExternalLink, MapPin } from "lucide-react";

import { BlockRenderer } from "@/components/content/BlockRenderer";
import { ContentComments } from "@/components/content/ContentComments";
import { ContentEngagement } from "@/components/content/ContentEngagement";
import { PublicPageShell } from "@/components/content/PublicPageShell";
import { createClient } from "@/lib/supabase/server";
import { getPublishedContentBySlug } from "@/lib/data/content";
import { getOgSettings } from "@/lib/data/site-settings";
import { getLocale, getTranslations } from "@/lib/i18n/locale";
import type { Block } from "@/lib/types/blocks";

type ContentDetailPageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: ContentDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const [{ item }, og] = await Promise.all([
    getPublishedContentBySlug(slug),
    getOgSettings(),
  ]);

  if (!item) return {};

  const description = item.excerpt ?? og.description;
  const image = item.cover_image_url ?? og.imageUrl;

  return {
    title: item.title,
    description,
    openGraph: {
      title: item.title,
      description,
      type: "article",
      images: image ? [{ url: image, width: 1200, height: 630 }] : [],
    },
    twitter: {
      card: "summary_large_image",
      title: item.title,
      description,
      images: image ? [image] : [],
    },
  };
}

export default async function ContentDetailPage({ params }: ContentDetailPageProps) {
  const { slug } = await params;
  const [{ item }, supabase, tr, locale] = await Promise.all([
    getPublishedContentBySlug(slug),
    createClient(),
    getTranslations(),
    getLocale(),
  ]);

  if (!item) notFound();

  const { data: { user } } = await supabase.auth.getUser();

  const date = item.start_at ?? item.published_at
    ? new Intl.DateTimeFormat(locale, { month: "long", day: "numeric", year: "numeric" }).format(
        new Date((item.start_at ?? item.published_at)!)
      )
    : null;

  return (
    <PublicPageShell
      eyebrow={item.content_type.replace("_", " ")}
      title={item.title}
      description={item.excerpt ?? ""}
    >
      <article className="glass-panel rounded-lg p-6 sm:p-8">
        <div className="flex flex-wrap items-center justify-between gap-4">
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

          <ContentEngagement
            contentId={item.id}
            initialViews={item.view_count ?? 0}
            isLoggedIn={Boolean(user)}
          />
        </div>

        {Array.isArray(item.body_blocks) && item.body_blocks.length > 0 ? (
          <div className="mt-8">
            <BlockRenderer blocks={item.body_blocks as Block[]} />
          </div>
        ) : item.body_md ? (
          <div className="mt-8 whitespace-pre-wrap text-base leading-8 text-slate-200">
            {item.body_md}
          </div>
        ) : (
          <p className="mt-8 text-base leading-8 text-slate-300">
            {tr.contentDetail.noContent}
          </p>
        )}

        {item.external_url ? (
          <a
            href={item.external_url}
            target="_blank"
            rel="noreferrer"
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-cyan-200 px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300"
          >
            {tr.contentDetail.openLink}
            <ExternalLink className="size-4" aria-hidden="true" />
          </a>
        ) : null}

        <ContentComments
          contentId={item.id}
          currentUserId={user?.id ?? null}
        />
      </article>
    </PublicPageShell>
  );
}
