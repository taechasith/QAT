import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { CalendarDays, Clock, ExternalLink, MapPin, User } from "lucide-react";

import { BlockRenderer } from "@/components/content/BlockRenderer";
import { ContentComments } from "@/components/content/ContentComments";
import { ContentEngagement } from "@/components/content/ContentEngagement";
import { PublicPageShell } from "@/components/content/PublicPageShell";
import { createClient } from "@/lib/supabase/server";
import { getPublishedContentBySlug } from "@/lib/data/content";
import { getOgSettings } from "@/lib/data/site-settings";
import { getLocale, getTranslations } from "@/lib/i18n/locale";
import { isVideoUrl } from "@/lib/media";
import { SITE_NAME, siteUrl } from "@/lib/metadata";
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
  const url = siteUrl(`/content/${item.slug}`);
  const authorName = (item.metadata?.author_name as string | undefined) ?? SITE_NAME;

  return {
    title: item.title,
    description,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: item.title,
      description,
      url,
      type: "article",
      images: image ? [{ url: image, width: 1200, height: 630 }] : [],
      publishedTime: item.published_at ?? undefined,
      modifiedTime: item.updated_at ?? undefined,
      authors: [authorName],
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

  const description = item.excerpt ?? "";
  const image = item.cover_image_url ? siteUrl(item.cover_image_url) : undefined;
  const authorName = (item.metadata?.author_name as string | undefined) ?? SITE_NAME;
  const jsonLd =
    item.content_type === "event" && item.start_at
      ? {
          "@context": "https://schema.org",
          "@type": "Event",
          name: item.title,
          description,
          url: siteUrl(`/content/${item.slug}`),
          image: image ? [image] : undefined,
          startDate: item.start_at,
          endDate: item.end_at ?? undefined,
          eventStatus: "https://schema.org/EventScheduled",
          eventAttendanceMode: "https://schema.org/MixedEventAttendanceMode",
          location: item.location
            ? {
                "@type": "Place",
                name: item.location,
              }
            : undefined,
          organizer: {
            "@type": "Organization",
            name: SITE_NAME,
            url: siteUrl("/"),
          },
        }
      : {
          "@context": "https://schema.org",
          "@type": item.content_type === "news" ? "NewsArticle" : "Article",
          headline: item.title,
          description,
          url: siteUrl(`/content/${item.slug}`),
          mainEntityOfPage: siteUrl(`/content/${item.slug}`),
          image: image ? [image] : undefined,
          datePublished: item.published_at ?? undefined,
          dateModified: item.updated_at ?? item.published_at ?? undefined,
          author: {
            "@type": "Person",
            name: authorName,
          },
          publisher: {
            "@type": "Organization",
            name: SITE_NAME,
            logo: {
              "@type": "ImageObject",
              url: siteUrl("/brand/QAT_Logo.png"),
            },
          },
        };

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
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <article className="glass-panel overflow-hidden rounded-lg">
        {item.cover_image_url ? (
          <div className="relative aspect-[16/9] w-full">
            {isVideoUrl(item.cover_image_url) ? (
              <video
                src={item.cover_image_url}
                autoPlay
                loop
                muted
                playsInline
                preload="metadata"
                className="h-full w-full object-cover"
              />
            ) : (
              <Image
                src={item.cover_image_url}
                alt=""
                fill
                unoptimized
                className="object-cover"
                priority
              />
            )}
          </div>
        ) : null}

        <div className="p-6 sm:p-8">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex flex-wrap gap-x-5 gap-y-2 text-sm text-foreground/70">
            {date ? (
              <span className="inline-flex items-center gap-2">
                <CalendarDays className="size-4 text-primary" aria-hidden="true" />
                {date}
              </span>
            ) : null}
            {item.location ? (
              <span className="inline-flex items-center gap-2">
                <MapPin className="size-4 text-primary" aria-hidden="true" />
                {item.location}
              </span>
            ) : null}
            {(item.metadata?.author_name as string | undefined) ? (
              <span className="inline-flex items-center gap-2">
                <User className="size-4 text-primary" aria-hidden="true" />
                {item.metadata!.author_name as string}
              </span>
            ) : null}
            {item.published_at ? (
              <span className="inline-flex items-center gap-2 text-muted-foreground">
                <Clock className="size-4" aria-hidden="true" />
                {new Intl.DateTimeFormat(locale, { month: "short", day: "numeric", year: "numeric" }).format(new Date(item.published_at))}
                {item.updated_at && item.updated_at !== item.published_at ? (
                  <span className="text-muted-foreground/70">
                    · {locale === "th" ? "แก้ไขล่าสุด" : "updated"}{" "}
                    {new Intl.DateTimeFormat(locale, { month: "short", day: "numeric", year: "numeric" }).format(new Date(item.updated_at))}
                  </span>
                ) : null}
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
        ) : null}

        {!(Array.isArray(item.body_blocks) && item.body_blocks.length > 0) ? (
          <p className="mt-8 text-base leading-8 text-foreground/70">
            {tr.contentDetail.noContent}
          </p>
        ) : null}

        {(item.metadata?.author_name as string | undefined) ? (() => {
          const authorName = item.metadata!.author_name as string;
          const authorBio = item.metadata?.author_bio as string | undefined;
          const avatarUrl = item.metadata?.author_avatar_url as string | undefined;
          const avatarType = (item.metadata?.author_avatar_type as string | undefined) ?? "artist_cat";
          const catTypes = ["artist_cat", "technologist_cat", "scientist_cat"];
          return (
            <div className="mt-10 flex items-start gap-4 rounded-xl border border-white/10 bg-white/3 p-5">
              {avatarUrl ? (
                <Image
                  src={avatarUrl}
                  alt={authorName}
                  width={48}
                  height={48}
                  className="rounded-full object-cover ring-2 ring-primary/30 shrink-0"
                />
              ) : catTypes.includes(avatarType) ? (
                <div className="size-12 rounded-full ring-2 ring-primary/30 overflow-hidden shrink-0 bg-white/5 flex items-center justify-center text-xl">
                  {avatarType === "artist_cat" ? "🎨" : avatarType === "technologist_cat" ? "💻" : "🔬"}
                </div>
              ) : (
                <div className="size-12 rounded-full ring-2 ring-white/15 bg-white/10 flex items-center justify-center text-xl shrink-0">👤</div>
              )}
              <div className="min-w-0">
                <p className="text-sm font-semibold text-white">{authorName}</p>
                {authorBio ? (
                  <p className="mt-1 text-xs leading-5 text-muted-foreground">{authorBio}</p>
                ) : null}
              </div>
            </div>
          );
        })() : null}

        {item.external_url ? (
          <a
            href={item.external_url}
            target="_blank"
            rel="noreferrer"
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-primary px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
          >
            {tr.contentDetail.openLink}
            <ExternalLink className="size-4" aria-hidden="true" />
          </a>
        ) : null}

        <ContentComments
          contentId={item.id}
          currentUserId={user?.id ?? null}
        />
        </div>
      </article>
    </PublicPageShell>
  );
}
