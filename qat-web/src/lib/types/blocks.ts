export type TextAlign = "left" | "center" | "right";
export type HeadingLevel = 1 | 2 | 3;
export type TextSize = "xs" | "sm" | "md" | "lg" | "xl" | "2xl" | "3xl" | "4xl";
export type SpacerSize = "sm" | "md" | "lg";

export type HeadingBlock = {
  id: string;
  type: "heading";
  text: string;
  text_th?: string;
  level: HeadingLevel;
  size?: TextSize;
  align: TextAlign;
  bold: boolean;
};

export type ParagraphBlock = {
  id: string;
  type: "paragraph";
  text: string;
  text_th?: string;
  size?: TextSize;
  align: TextAlign;
  bold: boolean;
  italic: boolean;
};

export type ImageBlock = {
  id: string;
  type: "image";
  url: string;
  alt: string;
  alt_th?: string;
  caption: string;
  caption_th?: string;
  align: TextAlign;
};

export type DividerBlock = {
  id: string;
  type: "divider";
};

export type SpacerBlock = {
  id: string;
  type: "spacer";
  size: SpacerSize;
};

export type Block =
  | HeadingBlock
  | ParagraphBlock
  | ImageBlock
  | DividerBlock
  | SpacerBlock;

export type BlockType = Block["type"];

export function makeBlock(type: BlockType): Block {
  const id = Math.random().toString(36).slice(2, 10);
  switch (type) {
    case "heading":
      return { id, type: "heading", text: "", level: 2, size: "2xl", align: "left", bold: false };
    case "paragraph":
      return { id, type: "paragraph", text: "", size: "md", align: "left", bold: false, italic: false };
    case "image":
      return { id, type: "image", url: "", alt: "", caption: "", align: "center" };
    case "divider":
      return { id, type: "divider" };
    case "spacer":
      return { id, type: "spacer", size: "md" };
  }
}
