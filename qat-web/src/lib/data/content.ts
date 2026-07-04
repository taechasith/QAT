import { createClient } from "@/lib/supabase/server";
import { getLocale } from "@/lib/i18n/locale";
import type { Block } from "@/lib/types/blocks";

export type ContentType =
  | "event"
  | "project"
  | "game"
  | "course"
  | "exhibition"
  | "research_article"
  | "news"
  | "talk"
  | "experiment"
  | "video";

export type ContentItem = {
  id: string;
  content_type: ContentType;
  slug: string;
  title: string;
  excerpt: string | null;
  body_md: string | null;
  body_blocks: unknown[] | null;
  view_count: number | null;
  cover_image_url: string | null;
  external_url: string | null;
  location: string | null;
  start_at: string | null;
  end_at: string | null;
  published_at: string | null;
  updated_at: string | null;
  sort_order: number;
  metadata: Record<string, unknown> | null;
};

function localizeBlocks(
  blocks: unknown[] | null,
  metadata: Record<string, unknown> | null,
  locale: string,
) {
  if (locale !== "th") return blocks;

  const thaiBlocks = metadata?.body_blocks_th;
  if (Array.isArray(thaiBlocks) && thaiBlocks.length > 0) {
    return thaiBlocks;
  }

  if (!Array.isArray(blocks)) return blocks;

  return (blocks as Block[]).map((block) => {
    if (block.type === "heading" || block.type === "paragraph") {
      return block.text_th ? { ...block, text: block.text_th } : block;
    }

    if (block.type === "image") {
      return {
        ...block,
        alt: block.alt_th || block.alt,
        caption: block.caption_th || block.caption,
      };
    }

    return block;
  });
}

export function localizeItem(item: ContentItem, locale: string): ContentItem {
  if (locale !== "th") return item;
  return {
    ...item,
    title: (item.metadata?.title_th as string | undefined) || item.title,
    excerpt: (item.metadata?.excerpt_th as string | undefined) || item.excerpt,
    body_md: (item.metadata?.body_md_th as string | undefined) || item.body_md,
    body_blocks: localizeBlocks(item.body_blocks, item.metadata, locale),
    cover_image_url: (item.metadata?.cover_image_url_th as string | undefined) || item.cover_image_url,
  };
}

type ContentQueryResult = {
  items: ContentItem[];
  error?: string;
};

export type SitemapContentEntry = Pick<
  ContentItem,
  "slug" | "content_type" | "published_at" | "updated_at"
>;

function startOfTodayIso() {
  const now = new Date();
  return new Date(now.getFullYear(), now.getMonth(), now.getDate()).toISOString();
}

function getEventComparisonDate(item: ContentItem) {
  const value = item.end_at ?? item.start_at;
  if (!value) return null;

  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? null : date;
}

function isUpcomingEvent(item: ContentItem, today: Date) {
  const eventDate = getEventComparisonDate(item);
  return eventDate ? eventDate >= today : false;
}

function getTime(value: string | null) {
  if (!value) return 0;

  const time = new Date(value).getTime();
  return Number.isNaN(time) ? 0 : time;
}

function sortByPublishedNewest(a: ContentItem, b: ContentItem) {
  const publishedDiff = getTime(b.published_at) - getTime(a.published_at);
  if (publishedDiff !== 0) return publishedDiff;

  const updatedDiff = getTime(b.updated_at) - getTime(a.updated_at);
  if (updatedDiff !== 0) return updatedDiff;

  return a.sort_order - b.sort_order;
}

const publicContentSelect = `
  id,
  content_type,
  slug,
  title,
  excerpt,
  body_md,
  body_blocks,
  view_count,
  cover_image_url,
  external_url,
  location,
  start_at,
  end_at,
  published_at,
  updated_at,
  sort_order,
  metadata
`;

export async function getPublishedContentByType(
  contentType: ContentType,
): Promise<ContentQueryResult> {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("content_items")
      .select(publicContentSelect)
      .eq("content_type", contentType)
      .eq("status", "published")
      .order("published_at", { ascending: false, nullsFirst: false })
      .order("updated_at", { ascending: false, nullsFirst: false })
      .order("sort_order", { ascending: true });

    if (error) {
      return { items: [], error: error.message };
    }

    const locale = await getLocale();
    const localized = (data ?? [])
      .map((item) => item as ContentItem)
      .sort(sortByPublishedNewest)
      .map((item) => localizeItem(item, locale));
    return { items: localized };
  } catch (error) {
    return {
      items: [],
      error: error instanceof Error ? error.message : "Unable to load content.",
    };
  }
}

export async function getPublishedContentBySlug(slug: string) {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("content_items")
      .select(publicContentSelect)
      .eq("slug", slug)
      .eq("status", "published")
      .maybeSingle();

    if (error) {
      return { item: null, error: error.message };
    }

    if (!data) return { item: null };
    const locale = await getLocale();
    return { item: localizeItem(data as ContentItem, locale) };
  } catch (error) {
    return {
      item: null,
      error: error instanceof Error ? error.message : "Unable to load content.",
    };
  }
}

export async function getFeaturedPublishedContent() {
  try {
    const supabase = await createClient();
    const todayIso = startOfTodayIso();
    const [eventsResult, projectsResult] = await Promise.all([
      supabase
        .from("content_items")
        .select(publicContentSelect)
        .eq("status", "published")
        .eq("content_type", "event")
        .or(`end_at.gte.${todayIso},and(end_at.is.null,start_at.gte.${todayIso})`)
        .order("start_at", { ascending: true, nullsFirst: false })
        .limit(12),
      supabase
        .from("content_items")
        .select(publicContentSelect)
        .eq("status", "published")
        .eq("content_type", "project")
        .order("published_at", { ascending: false, nullsFirst: false })
        .order("updated_at", { ascending: false, nullsFirst: false })
        .limit(6),
    ]);

    const error = eventsResult.error ?? projectsResult.error;

    if (error) {
      return { items: [], error: error.message };
    }

    const locale = await getLocale();
    const today = new Date(todayIso);
    const events = (eventsResult.data ?? [])
      .map((item) => item as ContentItem)
      .filter((item) => isUpcomingEvent(item, today))
      .sort((a, b) => getTime(a.start_at) - getTime(b.start_at));
    const projects = (projectsResult.data ?? [])
      .map((item) => item as ContentItem)
      .sort(sortByPublishedNewest);
    const localized = [...events, ...projects]
      .sort((a, b) => {
        if (a.content_type !== b.content_type) return a.content_type === "event" ? -1 : 1;

        return a.content_type === "project"
          ? sortByPublishedNewest(a, b)
          : getTime(a.start_at) - getTime(b.start_at);
      })
      .slice(0, 6)
      .map((item) => localizeItem(item, locale));
    return { items: localized };
  } catch (error) {
    return {
      items: [],
      error: error instanceof Error ? error.message : "Unable to load content.",
    };
  }
}

export async function getPublishedSitemapContent(): Promise<SitemapContentEntry[]> {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("content_items")
      .select("slug, content_type, published_at, updated_at")
      .eq("status", "published")
      .order("updated_at", { ascending: false, nullsFirst: false });

    if (error) return [];

    return (data ?? []) as SitemapContentEntry[];
  } catch {
    return [];
  }
}
