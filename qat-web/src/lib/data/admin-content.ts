import { createAdminClient } from "@/lib/supabase/admin";
import type { createClient as createServerClient } from "@/lib/supabase/server";
import { buildContentBlocks } from "@/lib/content-blocks";
import type { ContentFormData } from "@/lib/validation/content";
import type { Block } from "@/lib/types/blocks";

type ContentDbClient =
  | ReturnType<typeof createAdminClient>
  | Awaited<ReturnType<typeof createServerClient>>;

const adminSelectBase = `
  id,
  content_type,
  status,
  slug,
  title,
  excerpt,
  cover_image_url,
  external_url,
  location,
  start_at,
  end_at,
  published_at,
  sort_order,
  created_at,
  updated_at
`;

const adminSelectEngagement = `
  ${adminSelectBase},
  view_count,
  content_likes(count),
  content_comments(count)
`;

export async function listAllContent() {
  const supabase = createAdminClient();

  // Try with engagement columns first; fall back if migration not yet run
  const { data, error } = await supabase
    .from("content_items")
    .select(adminSelectEngagement)
    .order("updated_at", { ascending: false });

  if (error) {
    const { data: fallback, error: fallbackError } = await supabase
      .from("content_items")
      .select(adminSelectBase)
      .order("updated_at", { ascending: false });
    return { items: fallback ?? [], error: fallbackError?.message };
  }

  return { items: data ?? [], error: undefined };
}

export async function getContentById(id: string) {
  const supabase = createAdminClient();
  const { data, error } = await supabase
    .from("content_items")
    .select(`${adminSelectBase}, view_count, body_md, body_blocks, metadata`)
    .eq("id", id)
    .maybeSingle();

  return { item: data, error: error?.message };
}

export async function createContent(
  userId: string,
  values: ContentFormData,
  bodyBlocks?: Block[],
  db?: ContentDbClient,
): Promise<{ id?: string; error?: string }> {
  const supabase = db ?? createAdminClient();

  const { title_th, excerpt_th, body_md_th, cover_image_url_th, author_name, author_bio, ...rest } = values;

  const profile = await supabase
    .from("profiles")
    .select("full_name, bio, avatar_url, avatar_type")
    .eq("id", userId)
    .maybeSingle()
    .then((r) => r.data);

  const metadata: Record<string, unknown> = {};
  if (title_th?.trim()) metadata.title_th = title_th.trim();
  if (excerpt_th?.trim()) metadata.excerpt_th = excerpt_th.trim();
  if (body_md_th?.trim()) metadata.body_md_th = body_md_th.trim();
  if (cover_image_url_th?.trim()) metadata.cover_image_url_th = cover_image_url_th.trim();
  const resolvedAuthorName = author_name?.trim() || profile?.full_name || "";
  if (resolvedAuthorName) metadata.author_name = resolvedAuthorName;
  if (author_bio?.trim()) metadata.author_bio = author_bio.trim();
  if (profile?.avatar_url) metadata.author_avatar_url = profile.avatar_url;
  if (profile?.avatar_type) metadata.author_avatar_type = profile.avatar_type;
  const thaiBlocks = buildContentBlocks(values, "th");
  if (thaiBlocks.length > 0) metadata.body_blocks_th = thaiBlocks;

  // DB title is NOT NULL — fall back to TH title if EN not provided
  const resolvedTitle = rest.title?.trim() || title_th?.trim() || "";
  const resolvedBlocks = bodyBlocks ?? buildContentBlocks(values, "en");

  const payload = {
    ...rest,
    title: resolvedTitle,
    cover_image_url: rest.cover_image_url || null,
    external_url: rest.external_url || null,
    excerpt: rest.excerpt || null,
    body_md: rest.body_md || null,
    body_blocks: resolvedBlocks,
    location: rest.location || null,
    start_at: rest.start_at || null,
    end_at: rest.end_at || null,
    published_at: rest.status === "published" ? new Date().toISOString() : null,
    metadata,
    created_by: userId,
    updated_by: userId,
  };

  const { data, error } = await supabase
    .from("content_items")
    .insert(payload)
    .select("id")
    .single();

  return error ? { error: error.message } : { id: data.id };
}

export async function updateContent(
  id: string,
  userId: string,
  values: ContentFormData,
  bodyBlocks?: Block[],
  db?: ContentDbClient,
): Promise<{ error?: string; previousSlug?: string; slug?: string }> {
  const supabase = db ?? createAdminClient();

  const [existingResult, profile] = await Promise.all([
    supabase.from("content_items").select("status, slug, published_at, metadata").eq("id", id).maybeSingle(),
    supabase.from("profiles").select("full_name, bio, avatar_url, avatar_type").eq("id", userId).maybeSingle().then((r) => r.data),
  ]);

  const wasPublished = existingResult.data?.status === "published";
  const nowPublished = values.status === "published";
  const publishedAt =
    nowPublished && !wasPublished
      ? new Date().toISOString()
      : (existingResult.data?.published_at ?? null);

  const { title_th, excerpt_th, body_md_th, cover_image_url_th, author_name, author_bio, ...rest } = values;
  const existingMeta = (existingResult.data?.metadata as Record<string, unknown>) ?? {};
  const metadata: Record<string, unknown> = { ...existingMeta };
  if (title_th?.trim()) metadata.title_th = title_th.trim();
  else delete metadata.title_th;
  if (excerpt_th?.trim()) metadata.excerpt_th = excerpt_th.trim();
  else delete metadata.excerpt_th;
  if (body_md_th?.trim()) metadata.body_md_th = body_md_th.trim();
  else delete metadata.body_md_th;
  if (cover_image_url_th?.trim()) metadata.cover_image_url_th = cover_image_url_th.trim();
  else delete metadata.cover_image_url_th;
  const resolvedAuthorName = author_name?.trim() || profile?.full_name || "";
  if (resolvedAuthorName) metadata.author_name = resolvedAuthorName;
  else delete metadata.author_name;
  if (author_bio?.trim()) metadata.author_bio = author_bio.trim();
  else delete metadata.author_bio;
  if (profile?.avatar_url) metadata.author_avatar_url = profile.avatar_url;
  else delete metadata.author_avatar_url;
  if (profile?.avatar_type) metadata.author_avatar_type = profile.avatar_type;
  else delete metadata.author_avatar_type;

  const resolvedTitle = rest.title?.trim() || title_th?.trim() || "";
  const resolvedBlocks = bodyBlocks ?? buildContentBlocks(values, "en");
  const thaiBlocks = buildContentBlocks(values, "th");
  if (thaiBlocks.length > 0) metadata.body_blocks_th = thaiBlocks;
  else delete metadata.body_blocks_th;

  const payload = {
    ...rest,
    title: resolvedTitle,
    cover_image_url: rest.cover_image_url || null,
    external_url: rest.external_url || null,
    excerpt: rest.excerpt || null,
    body_md: rest.body_md || null,
    body_blocks: resolvedBlocks,
    location: rest.location || null,
    start_at: rest.start_at || null,
    end_at: rest.end_at || null,
    published_at: publishedAt,
    metadata,
    updated_by: userId,
  };

  const { error } = await supabase
    .from("content_items")
    .update(payload)
    .eq("id", id);

  return error
    ? { error: error.message }
    : { previousSlug: existingResult.data?.slug, slug: rest.slug };
}

export async function deleteContent(id: string, db?: ContentDbClient): Promise<{ error?: string }> {
  const supabase = db ?? createAdminClient();
  const { error } = await supabase.from("content_items").delete().eq("id", id);
  return error ? { error: error.message } : {};
}
