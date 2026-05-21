import type { Block, TextAlign } from "@/lib/types/blocks";

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

type Props = { blocks: Block[] };

export function BlockRenderer({ blocks }: Props) {
  if (!blocks.length) return null;

  return (
    <div className="flex flex-col gap-5">
      {blocks.map((block) => {
        switch (block.type) {
          case "heading": {
            const Tag = `h${block.level}` as "h1" | "h2" | "h3";
            const sizes = { 1: "text-3xl sm:text-4xl", 2: "text-2xl sm:text-3xl", 3: "text-xl sm:text-2xl" };
            return (
              <Tag
                key={block.id}
                className={[
                  sizes[block.level],
                  "font-semibold leading-tight tracking-tight text-white",
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
                  "text-base leading-8 text-slate-200",
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
