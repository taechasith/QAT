import { z } from "zod";

export const CONTENT_TYPES = [
  "event",
  "project",
  "game",
  "course",
  "exhibition",
  "research_article",
  "news",
  "talk",
  "experiment",
  "video",
] as const;

export const CONTENT_STATUSES = ["draft", "published", "archived"] as const;

const urlOrEmpty = z.union([
  z.string().url(),
  z.literal(""),
]);

export const contentSchema = z.object({
  content_type: z.enum(CONTENT_TYPES),
  status: z.enum(CONTENT_STATUSES),
  title: z.string().min(1, "Title is required").max(255),
  slug: z
    .string()
    .min(1, "Slug is required")
    .max(200)
    .regex(
      /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
      "Slug must be lowercase letters, numbers, and hyphens",
    ),
  excerpt: z.string().max(500).optional(),
  body_md: z.string().optional(),
  cover_image_url: urlOrEmpty.optional(),
  external_url: urlOrEmpty.optional(),
  location: z.string().max(300).optional(),
  start_at: z.string().optional(),
  end_at: z.string().optional(),
  sort_order: z.number().int(),
  title_th: z.string().max(255).optional(),
  excerpt_th: z.string().max(500).optional(),
});

export type ContentFormData = z.infer<typeof contentSchema>;

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .slice(0, 200);
}
