import { createClient } from "@/lib/supabase/server";

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
  sort_order: number;
  metadata: Record<string, unknown> | null;
};

export function localizeItem(item: ContentItem, locale: string): ContentItem {
  if (locale !== "th") return item;
  return {
    ...item,
    title: (item.metadata?.title_th as string | undefined) || item.title,
    excerpt: (item.metadata?.excerpt_th as string | undefined) || item.excerpt,
  };
}

type ContentQueryResult = {
  items: ContentItem[];
  error?: string;
};

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
      .order("sort_order", { ascending: true })
      .order("published_at", { ascending: false });

    if (error) {
      return { items: [], error: error.message };
    }

    return { items: (data ?? []) as ContentItem[] };
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

    return { item: data as ContentItem | null };
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
    const { data, error } = await supabase
      .from("content_items")
      .select(publicContentSelect)
      .eq("status", "published")
      .in("content_type", ["event", "project"])
      .order("sort_order", { ascending: true })
      .order("published_at", { ascending: false })
      .limit(6);

    if (error) {
      return { items: [], error: error.message };
    }

    return { items: (data ?? []) as ContentItem[] };
  } catch (error) {
    return {
      items: [],
      error: error instanceof Error ? error.message : "Unable to load content.",
    };
  }
}
