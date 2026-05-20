import { createClient } from "@/lib/supabase/server";
import type { ContentFormData } from "@/lib/validation/content";

const adminSelect = `
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

export async function listAllContent() {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("content_items")
    .select(adminSelect)
    .order("updated_at", { ascending: false });

  return { items: data ?? [], error: error?.message };
}

export async function getContentById(id: string) {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("content_items")
    .select(`${adminSelect}, body_md, metadata`)
    .eq("id", id)
    .maybeSingle();

  return { item: data, error: error?.message };
}

export async function createContent(
  userId: string,
  values: ContentFormData,
): Promise<{ id?: string; error?: string }> {
  const supabase = await createClient();

  const payload = {
    ...values,
    cover_image_url: values.cover_image_url || null,
    external_url: values.external_url || null,
    excerpt: values.excerpt || null,
    body_md: values.body_md || null,
    location: values.location || null,
    start_at: values.start_at || null,
    end_at: values.end_at || null,
    published_at: values.status === "published" ? new Date().toISOString() : null,
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
): Promise<{ error?: string }> {
  const supabase = await createClient();

  const existing = await supabase
    .from("content_items")
    .select("status, published_at")
    .eq("id", id)
    .maybeSingle();

  const wasPublished = existing.data?.status === "published";
  const nowPublished = values.status === "published";
  const publishedAt =
    nowPublished && !wasPublished
      ? new Date().toISOString()
      : (existing.data?.published_at ?? null);

  const payload = {
    ...values,
    cover_image_url: values.cover_image_url || null,
    external_url: values.external_url || null,
    excerpt: values.excerpt || null,
    body_md: values.body_md || null,
    location: values.location || null,
    start_at: values.start_at || null,
    end_at: values.end_at || null,
    published_at: publishedAt,
    updated_by: userId,
  };

  const { error } = await supabase
    .from("content_items")
    .update(payload)
    .eq("id", id);

  return error ? { error: error.message } : {};
}

export async function deleteContent(id: string): Promise<{ error?: string }> {
  const supabase = await createClient();
  const { error } = await supabase.from("content_items").delete().eq("id", id);
  return error ? { error: error.message } : {};
}
