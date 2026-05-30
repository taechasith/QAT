import { inflateRawSync } from "node:zlib";
import type { SupabaseClient } from "@supabase/supabase-js";
import type { Block, TextAlign } from "@/lib/types/blocks";
import { slugify } from "@/lib/validation/content";

const BUCKET = "qat-media";

type ZipEntry = {
  name: string;
  data: Buffer;
};

export type ImportedDocument = {
  title: string;
  slug: string;
  excerpt: string;
  bodyMd: string;
  coverImageUrl: string;
  blocks: Block[];
};

type ImportedImage = {
  url: string;
  alt: string;
};

function blockId(type: string, index: number) {
  return `import-${type}-${Date.now().toString(36)}-${index}`;
}

function decodeXml(value: string) {
  return value
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&apos;/g, "'")
    .replace(/&amp;/g, "&");
}

function stripXmlTags(value: string) {
  return value.replace(/<[^>]+>/g, "");
}

function textFromParagraph(xml: string) {
  const parts = [...xml.matchAll(/<w:t\b[^>]*>([\s\S]*?)<\/w:t>/g)].map((match) =>
    decodeXml(stripXmlTags(match[1] ?? "")),
  );
  return parts.join("").replace(/\s+/g, " ").trim();
}

function textAlignFromParagraph(xml: string): TextAlign {
  const match = xml.match(/<w:jc\b[^>]*w:val="([^"]+)"/);
  if (match?.[1] === "center") return "center";
  if (match?.[1] === "right" || match?.[1] === "end") return "right";
  return "left";
}

function headingLevelFromParagraph(xml: string): 1 | 2 | 3 | null {
  const style = xml.match(/<w:pStyle\b[^>]*w:val="([^"]+)"/)?.[1]?.toLowerCase() ?? "";
  if (style.includes("title") || style.includes("heading1") || style === "1") return 1;
  if (style.includes("heading2") || style === "2") return 2;
  if (style.includes("heading3") || style === "3") return 3;
  return null;
}

function paragraphFormat(xml: string) {
  const runProps = [...xml.matchAll(/<w:rPr\b[^>]*>([\s\S]*?)<\/w:rPr>/g)].map((match) => match[1] ?? "");
  return {
    bold: runProps.some((props) => /<w:b\b/.test(props)),
    italic: runProps.some((props) => /<w:i\b/.test(props)),
  };
}

function parseZip(buffer: Buffer): ZipEntry[] {
  const entries: ZipEntry[] = [];
  let eocdOffset = -1;

  for (let i = buffer.length - 22; i >= 0; i -= 1) {
    if (buffer.readUInt32LE(i) === 0x06054b50) {
      eocdOffset = i;
      break;
    }
  }

  if (eocdOffset < 0) return entries;

  const centralDirectorySize = buffer.readUInt32LE(eocdOffset + 12);
  const centralDirectoryOffset = buffer.readUInt32LE(eocdOffset + 16);
  let offset = centralDirectoryOffset;
  const end = centralDirectoryOffset + centralDirectorySize;

  while (offset < end && offset < buffer.length - 46) {
    const signature = buffer.readUInt32LE(offset);
    if (signature !== 0x02014b50) break;

    const method = buffer.readUInt16LE(offset + 10);
    const compressedSize = buffer.readUInt32LE(offset + 20);
    const fileNameLength = buffer.readUInt16LE(offset + 28);
    const extraLength = buffer.readUInt16LE(offset + 30);
    const commentLength = buffer.readUInt16LE(offset + 32);
    const localHeaderOffset = buffer.readUInt32LE(offset + 42);
    const nameStart = offset + 46;
    const name = buffer.subarray(nameStart, nameStart + fileNameLength).toString("utf8");
    const localFileNameLength = buffer.readUInt16LE(localHeaderOffset + 26);
    const localExtraLength = buffer.readUInt16LE(localHeaderOffset + 28);
    const dataStart = localHeaderOffset + 30 + localFileNameLength + localExtraLength;
    const compressed = buffer.subarray(dataStart, dataStart + compressedSize);

    let data: Buffer | null = null;
    if (method === 0) data = compressed;
    if (method === 8) data = inflateRawSync(compressed);
    if (data) entries.push({ name, data });

    offset = nameStart + fileNameLength + extraLength + commentLength;
  }

  return entries;
}

function normalizeDocxTarget(target: string) {
  const normalized = target.startsWith("/") ? target.slice(1) : `word/${target.replace(/^\.\.\//, "")}`;
  try {
    return decodeURIComponent(normalized);
  } catch {
    return normalized;
  }
}

function relTargets(relsXml: string) {
  const targets = new Map<string, string>();
  const relationships = relsXml.matchAll(/<Relationship\b([^>]+?)\/>/g);

  for (const relationship of relationships) {
    const attrs = relationship[1] ?? "";
    const id = attrs.match(/\bId="([^"]+)"/)?.[1];
    const target = attrs.match(/\bTarget="([^"]+)"/)?.[1];
    if (id && target) {
      targets.set(id, normalizeDocxTarget(target));
    }
  }

  return targets;
}

function imageRelationshipIds(xml: string) {
  return [...xml.matchAll(/(?:r:embed|r:id)="([^"]+)"/g)].map((match) => match[1]).filter(Boolean);
}

function mimeFromPath(path: string) {
  const ext = path.split(".").pop()?.toLowerCase();
  if (ext === "jpg" || ext === "jpeg") return "image/jpeg";
  if (ext === "png") return "image/png";
  if (ext === "gif") return "image/gif";
  if (ext === "webp") return "image/webp";
  if (ext === "svg") return "image/svg+xml";
  return "application/octet-stream";
}

async function uploadImportedImage(
  supabase: SupabaseClient,
  entry: ZipEntry,
  index: number,
): Promise<ImportedImage | null> {
  const ext = entry.name.split(".").pop() ?? "bin";
  const path = `uploads/imported-docs/${Date.now()}-${index}-${Math.random().toString(36).slice(2)}.${ext}`;
  const contentType = mimeFromPath(entry.name);
  const { error } = await supabase.storage
    .from(BUCKET)
    .upload(path, entry.data, { contentType, upsert: false });

  if (error) return null;

  const { data } = supabase.storage.from(BUCKET).getPublicUrl(path);
  return { url: data.publicUrl, alt: "" };
}

function summarize(blocks: Block[]) {
  const textBlocks = blocks.filter((block) => block.type === "heading" || block.type === "paragraph");
  const titleBlock = textBlocks[0];
  const title = titleBlock && "text" in titleBlock ? titleBlock.text : "Imported project";
  const paragraph = blocks.find((block) => block.type === "paragraph" && block.text.length > 0);
  const excerpt = paragraph?.type === "paragraph" ? paragraph.text.slice(0, 500) : "";
  const bodyMd = blocks
    .map((block) => {
      if (block.type === "heading") return `${"#".repeat(block.level)} ${block.text}`;
      if (block.type === "paragraph") return block.text;
      return "";
    })
    .filter(Boolean)
    .join("\n\n");
  const coverImageUrl = blocks.find((block) => block.type === "image" && block.url)?.type === "image"
    ? (blocks.find((block) => block.type === "image" && block.url) as { url: string }).url
    : "";

  return {
    title,
    slug: slugify(title) || "imported-project",
    excerpt,
    bodyMd,
    coverImageUrl,
  };
}

export async function importDocx(buffer: Buffer, supabase: SupabaseClient): Promise<ImportedDocument> {
  const entries = parseZip(buffer);
  const byName = new Map(entries.map((entry) => [entry.name, entry]));
  const documentXml = byName.get("word/document.xml")?.data.toString("utf8");
  const relsXml = byName.get("word/_rels/document.xml.rels")?.data.toString("utf8") ?? "";

  if (!documentXml) {
    throw new Error("This Word file does not contain a readable document body.");
  }

  const rels = relTargets(relsXml);
  const blocks: Block[] = [];
  const imageCache = new Map<string, ImportedImage | null>();
  let index = 0;

  const paragraphs = [...documentXml.matchAll(/<w:p\b[^>]*>[\s\S]*?<\/w:p>/g)].map((match) => match[0]);
  for (const paragraph of paragraphs) {
    const text = textFromParagraph(paragraph);
    const align = textAlignFromParagraph(paragraph);
    const imageIds = imageRelationshipIds(paragraph);

    for (const imageId of imageIds) {
      const target = rels.get(imageId);
      const imageEntry = target ? byName.get(target) : undefined;
      if (!target || !imageEntry) continue;
      if (!imageCache.has(target)) {
        imageCache.set(target, await uploadImportedImage(supabase, imageEntry, index));
      }
      const image = imageCache.get(target);
      if (image) {
        blocks.push({
          id: blockId("image", index++),
          type: "image",
          url: image.url,
          alt: text,
          caption: "",
          align,
        });
      }
    }

    if (!text) continue;

    const headingLevel = headingLevelFromParagraph(paragraph);
    if (headingLevel) {
      blocks.push({
        id: blockId("heading", index++),
        type: "heading",
        text,
        level: headingLevel,
        size: headingLevel === 1 ? "3xl" : headingLevel === 2 ? "2xl" : "xl",
        align,
        bold: true,
      });
      continue;
    }

    const format = paragraphFormat(paragraph);
    blocks.push({
      id: blockId("paragraph", index++),
      type: "paragraph",
      text,
      size: format.bold ? "lg" : "md",
      align,
      bold: format.bold,
      italic: format.italic,
    });
  }

  const summary = summarize(blocks);
  return { ...summary, blocks };
}

export function importPlainText(text: string): ImportedDocument {
  const blocks: Block[] = [];
  let index = 0;

  text
    .split(/\n{2,}/)
    .map((part) => part.trim())
    .filter(Boolean)
    .forEach((part) => {
      const heading = part.match(/^(#{1,3})\s+(.+)$/);
      if (heading) {
        const level = heading[1].length as 1 | 2 | 3;
        blocks.push({
          id: blockId("heading", index++),
          type: "heading",
          text: heading[2].trim(),
          level,
          size: level === 1 ? "3xl" : level === 2 ? "2xl" : "xl",
          align: "left",
          bold: true,
        });
        return;
      }

      blocks.push({
        id: blockId("paragraph", index++),
        type: "paragraph",
        text: part.replace(/\n/g, " "),
        size: "md",
        align: "left",
        bold: false,
        italic: false,
      });
    });

  const summary = summarize(blocks);
  return { ...summary, blocks };
}
