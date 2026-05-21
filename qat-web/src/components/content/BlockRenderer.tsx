import type { Block, TextAlign, TextSize } from "@/lib/types/blocks";

function alignClass(align: TextAlign) {
  if (align === "center") return "text-center";
  if (align === "right") return "text-right";
  return "text-left";
}

function figureAlign(align: TextAlign) {
  if (align === "center") return "mx-auto";
  if (align === "right") return "ml-auto";
  return "mr-auto";
}

function textSizeClass(size: TextSize | undefined, fallback: TextSize) {
  const sizes: Record<TextSize, string> = {
    xs: "text-xs leading-5",
    sm: "text-sm leading-6",
    md: "text-base leading-8",
    lg: "text-lg leading-8",
    xl: "text-xl leading-8",
    "2xl": "text-2xl sm:text-3xl leading-tight",
    "3xl": "text-3xl sm:text-4xl leading-tight",
    "4xl": "text-4xl sm:text-5xl leading-tight",
  };

  return sizes[size ?? fallback];
}

type Props = { blocks: Block[] };

export function BlockRenderer({ blocks }: Props) {
  if (!blocks.length) return null;

  return (
    <div className="flex flex-col gap-5">
      {blocks.map((block) => {
        switch (block.type) {
          case "heading": {
            const Tag = `h${block.level}` as "h1" | "h2" | "h3";
            const fallbackSizes = { 1: "3xl", 2: "2xl", 3: "xl" } as const;
            return (
              <Tag
                key={block.id}
                className={[
                  textSizeClass(block.size, fallbackSizes[block.level]),
                  "font-semibold tracking-tight text-white",
                  alignClass(block.align),
                  block.bold ? "font-bold" : "",
                ].join(" ")}
              >
                {block.text}
              </Tag>
            );
          }

          case "paragraph":
            return (
              <p
                key={block.id}
                className={[
                  textSizeClass(block.size, "md"),
                  "text-slate-200",
                  alignClass(block.align),
                  block.bold ? "font-semibold" : "",
                  block.italic ? "italic" : "",
                ].join(" ")}
              >
                {block.text}
              </p>
            );

          case "image":
            if (!block.url) return null;
            return (
              <figure key={block.id} className={`w-full max-w-2xl ${figureAlign(block.align)}`}>
                <div className="relative w-full overflow-hidden rounded-lg">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={block.url}
                    alt={block.alt || ""}
                    className="w-full object-cover"
                    loading="lazy"
                  />
                </div>
                {block.caption ? (
                  <figcaption className="mt-2 text-center text-xs text-slate-500">
                    {block.caption}
                  </figcaption>
                ) : null}
              </figure>
            );

          case "divider":
            return (
              <hr
                key={block.id}
                className="border-t border-white/10"
              />
            );

          case "spacer": {
            const heights = { sm: "h-4", md: "h-8", lg: "h-16" };
            return <div key={block.id} className={heights[block.size]} aria-hidden="true" />;
          }

          default:
            return null;
        }
      })}
    </div>
  );
}
