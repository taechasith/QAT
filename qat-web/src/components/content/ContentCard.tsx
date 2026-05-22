import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, CalendarDays, MapPin } from "lucide-react";

import type { ContentItem } from "@/lib/data/content";
import { getLocale } from "@/lib/i18n/locale";
import { t } from "@/lib/i18n/translations";
import { isVideoUrl } from "@/lib/media";

type ContentCardProps = {
  item: ContentItem;
};

async function formatDate(value: string | null, locale: string) {
  if (!value) return null;
  return new Intl.DateTimeFormat(locale, {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date(value));
}

export async function ContentCard({ item }: ContentCardProps) {
  const locale = await getLocale();
  const tr = t[locale];
  const date = await formatDate(item.start_at ?? item.published_at, locale);
  const href = `/content/${item.slug}`;
  const external = false;

  return (
    <article className="glass-panel overflow-hidden rounded-lg">
      {item.cover_image_url ? (
        <div className="relative aspect-[16/9] border-b border-white/10 overflow-hidden">
          {isVideoUrl(item.cover_image_url) ? (
            <video
              src={item.cover_image_url}
              autoPlay
              loop
              muted
              playsInline
              className="absolute inset-0 h-full w-full object-cover"
            />
          ) : (
            <Image
              src={item.cover_image_url}
              alt=""
              fill
              unoptimized
              className="object-cover"
              sizes="(min-width: 1024px) 33vw, 100vw"
            />
          )}
        </div>
      ) : null}
      <div className="p-5">
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-cyan-200">
          {item.content_type.replace("_", " ")}
        </p>
        <h2 className="mt-3 text-xl font-semibold text-white">{item.title}</h2>
        {item.excerpt ? (
          <p className="mt-3 text-sm leading-6 text-slate-300">{item.excerpt}</p>
        ) : null}
        <div className="mt-5 flex flex-wrap gap-3 text-xs text-slate-400">
          {date ? (
            <span className="inline-flex items-center gap-1.5">
              <CalendarDays className="size-3.5" aria-hidden="true" />
              {date}
            </span>
          ) : null}
          {item.location ? (
            <span className="inline-flex items-center gap-1.5">
              <MapPin className="size-3.5" aria-hidden="true" />
              {item.location}
            </span>
          ) : null}
        </div>
        <Link
          href={href}
          target={external ? "_blank" : undefined}
          rel={external ? "noreferrer" : undefined}
          className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-cyan-100 transition hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300"
        >
          {tr.card.readMore}
          <ArrowUpRight className="size-4" aria-hidden="true" />
        </Link>
      </div>
    </article>
  );
}
