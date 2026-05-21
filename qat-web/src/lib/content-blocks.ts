import type { ContentFormData } from "@/lib/validation/content";
import type { Block } from "@/lib/types/blocks";

type ContentBlockLocale = "en" | "th";

function blockId(locale: ContentBlockLocale, key: string, index = 0) {
  return `auto-${locale}-${key}-${index}`;
}

function splitParagraphs(value: string | undefined) {
  return (value ?? "")
    .split(/\n{2,}/)
    .map((part) => part.trim())
    .filter(Boolean);
}

export function buildContentBlocks(values: ContentFormData, locale: ContentBlockLocale): Block[] {
  const isThai = locale === "th";
  const title = isThai ? values.title_th?.trim() : values.title?.trim();
  const excerpt = isThai ? values.excerpt_th?.trim() : values.excerpt?.trim();
  const body = isThai ? values.body_md_th?.trim() : values.body_md?.trim();
  const coverUrl = isThai ? values.cover_image_url_th?.trim() : values.cover_image_url?.trim();
  const blocks: Block[] = [];

  if (title) {
    blocks.push({ id: blockId(locale, "title"), type: "heading", text: title, level: 1, align: "left", bold: true });
  }

  if (excerpt) {
    blocks.push({ id: blockId(locale, "excerpt"), type: "paragraph", text: excerpt, align: "left", bold: true, italic: false });
  }

  if (coverUrl) {
    blocks.push({ id: blockId(locale, "cover"), type: "image", url: coverUrl, alt: title ?? "", caption: "", align: "center" });
  }

  splitParagraphs(body).forEach((paragraph, index) => {
    blocks.push({ id: blockId(locale, "body", index), type: "paragraph", text: paragraph, align: "left", bold: false, italic: false });
  });

  return blocks;
}
