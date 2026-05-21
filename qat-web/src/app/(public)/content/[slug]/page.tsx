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
          <div className="flex flex-wrap gap-x-5 gap-y-2 text-sm text-slate-300">
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
            {(item.metadata?.author_name as string | undefined) ? (
              <span className="inline-flex items-center gap-2">
                <User className="size-4 text-cyan-200" aria-hidden="true" />
                {item.metadata!.author_name as string}
              </span>
            ) : null}
            {item.published_at ? (
              <span className="inline-flex items-center gap-2 text-slate-400">
                <Clock className="size-4" aria-hidden="true" />
                {new Intl.DateTimeFormat(locale, { month: "short", day: "numeric", year: "numeric" }).format(new Date(item.published_at))}
                {item.updated_at && item.updated_at !== item.published_at ? (
                  <span className="text-slate-500">
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

        {item.body_md ? (
          <div className="mt-8 whitespace-pre-wrap text-base leading-8 text-slate-200">
            {item.body_md}
          </div>
        ) : null}

        {!item.body_md && !(Array.isArray(item.body_blocks) && item.body_blocks.length > 0) ? (
          <p className="mt-8 text-base leading-8 text-slate-300">
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
                  className="rounded-full object-cover ring-2 ring-cyan-300/30 shrink-0"
                />
              ) : catTypes.includes(avatarType) ? (
                <div className="size-12 rounded-full ring-2 ring-cyan-300/30 overflow-hidden shrink-0 bg-white/5 flex items-center justify-center text-xl">
                  {avatarType === "artist_cat" ? "🎨" : avatarType === "technologist_cat" ? "💻" : "🔬"}
                </div>
              ) : (
                <div className="size-12 rounded-full ring-2 ring-white/15 bg-white/10 flex items-center justify-center text-xl shrink-0">👤</div>
              )}
              <div className="min-w-0">
                <p className="text-sm font-semibold text-white">{authorName}</p>
                {authorBio ? (
                  <p className="mt-1 text-xs leading-5 text-slate-400">{authorBio}</p>
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
        </div>
      </article>
    </PublicPageShell>
  );
}
