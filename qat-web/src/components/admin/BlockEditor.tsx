"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import type {
  Block,
  BlockType,
  HeadingBlock,
  ImageBlock,
  ParagraphBlock,
  SpacerBlock,
  TextAlign,
  TextSize,
} from "@/lib/types/blocks";
import { makeBlock } from "@/lib/types/blocks";
import { clientUploadMedia } from "@/lib/supabase/client-upload";

type Props = {
  value: Block[];
  onChange: (blocks: Block[]) => void;
};

const TEXT_SIZE_OPTIONS: { value: TextSize; label: string }[] = [
  { value: "xs", label: "XS" },
  { value: "sm", label: "S" },
  { value: "md", label: "M" },
  { value: "lg", label: "L" },
  { value: "xl", label: "XL" },
  { value: "2xl", label: "2XL" },
  { value: "3xl", label: "3XL" },
  { value: "4xl", label: "4XL" },
];

function editorFontSize(size: TextSize | undefined, fallback: TextSize) {
  const sizes: Record<TextSize, string> = {
    xs: "0.75rem",
    sm: "0.875rem",
    md: "1rem",
    lg: "1.125rem",
    xl: "1.25rem",
    "2xl": "1.5rem",
    "3xl": "1.875rem",
    "4xl": "2.25rem",
  };

  return sizes[size ?? fallback];
}

function AlignBtn({
  align,
  current,
  set,
}: {
  align: TextAlign;
  current: TextAlign;
  set: (a: TextAlign) => void;
}) {
  const icons: Record<TextAlign, string> = { left: "L", center: "C", right: "R" };
  return (
    <button
      type="button"
      onClick={() => set(align)}
      title={`Align ${align}`}
      className={`rounded px-1.5 py-0.5 text-xs transition ${
        current === align
          ? "bg-primary/20 text-primary"
          : "text-muted-foreground/70 hover:text-foreground"
      }`}
    >
      {icons[align]}
    </button>
  );
}

function SizeControls({
  current,
  fallback,
  set,
}: {
  current: TextSize | undefined;
  fallback: TextSize;
  set: (size: TextSize) => void;
}) {
  const active = current ?? fallback;

  return (
    <div className="flex flex-wrap items-center gap-1">
      {TEXT_SIZE_OPTIONS.map(({ value, label }) => (
        <button
          key={value}
          type="button"
          onClick={() => set(value)}
          title={`Text size ${label}`}
          className={`rounded px-1.5 py-0.5 text-[10px] font-semibold transition ${
            active === value
              ? "bg-primary/20 text-primary"
              : "text-muted-foreground/70 hover:text-foreground"
          }`}
        >
          {label}
        </button>
      ))}
    </div>
  );
}

function Toggle({
  on,
  onClick,
  title,
  label,
}: {
  on: boolean;
  onClick: () => void;
  title: string;
  label: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      title={title}
      className={`rounded px-1.5 py-0.5 text-xs font-bold transition ${
        on ? "bg-primary/20 text-primary" : "text-muted-foreground/70 hover:text-foreground"
      }`}
    >
      {label}
    </button>
  );
}

function Sep() {
  return <span className="select-none text-white/10">|</span>;
}

function HeadingEditor({
  block,
  patch,
}: {
  block: HeadingBlock;
  patch: (p: Partial<HeadingBlock>) => void;
}) {
  const fallbackSize = block.level === 1 ? "3xl" : block.level === 2 ? "2xl" : "xl";

  return (
    <div className="flex flex-col gap-2">
      <div className="flex flex-wrap items-center gap-1 border-b border-white/8 pb-2">
        {([1, 2, 3] as const).map((level) => (
          <button
            key={level}
            type="button"
            onClick={() => patch({ level })}
            className={`rounded px-2 py-0.5 text-xs font-bold transition ${
              block.level === level
                ? "bg-accent/20 text-accent"
                : "text-muted-foreground/70 hover:text-foreground"
            }`}
          >
            H{level}
          </button>
        ))}
        <Sep />
        <SizeControls
          current={block.size}
          fallback={fallbackSize}
          set={(size) => patch({ size })}
        />
        <Sep />
        {(["left", "center", "right"] as TextAlign[]).map((align) => (
          <AlignBtn key={align} align={align} current={block.align} set={(value) => patch({ align: value })} />
        ))}
        <Sep />
        <Toggle
          on={block.bold}
          onClick={() => patch({ bold: !block.bold })}
          title="Bold"
          label="B"
        />
      </div>
      <input
        type="text"
        value={block.text}
        onChange={(event) => patch({ text: event.target.value })}
        placeholder="Heading text..."
        style={{
          textAlign: block.align,
          fontWeight: block.bold ? 700 : block.level === 1 ? 700 : block.level === 2 ? 600 : 500,
          fontSize: editorFontSize(block.size, fallbackSize),
        }}
        className="w-full bg-transparent text-white placeholder:text-muted-foreground/50 outline-none"
      />
    </div>
  );
}

function ParagraphEditor({
  block,
  patch,
}: {
  block: ParagraphBlock;
  patch: (p: Partial<ParagraphBlock>) => void;
}) {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex flex-wrap items-center gap-1 border-b border-white/8 pb-2">
        <SizeControls current={block.size} fallback="md" set={(size) => patch({ size })} />
        <Sep />
        {(["left", "center", "right"] as TextAlign[]).map((align) => (
          <AlignBtn key={align} align={align} current={block.align} set={(value) => patch({ align: value })} />
        ))}
        <Sep />
        <Toggle
          on={block.bold}
          onClick={() => patch({ bold: !block.bold })}
          title="Bold"
          label="B"
        />
        <Toggle
          on={block.italic}
          onClick={() => patch({ italic: !block.italic })}
          title="Italic"
          label="I"
        />
      </div>
      <textarea
        value={block.text}
        onChange={(event) => patch({ text: event.target.value })}
        placeholder="Paragraph text..."
        rows={3}
        style={{
          textAlign: block.align,
          fontWeight: block.bold ? 700 : 400,
          fontStyle: block.italic ? "italic" : "normal",
          fontSize: editorFontSize(block.size, "md"),
        }}
        className="w-full resize-y bg-transparent text-foreground/85 placeholder:text-muted-foreground/50 outline-none"
      />
    </div>
  );
}

function ImageBlockEditor({
  block,
  patch,
}: {
  block: ImageBlock;
  patch: (p: Partial<ImageBlock>) => void;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [err, setErr] = useState("");

  async function handleFile(file: File) {
    if (!file.type.startsWith("image/")) {
      setErr("Images only.");
      return;
    }
    setErr("");
    setUploading(true);
    const { url, error: uploadErr } = await clientUploadMedia(file);
    setUploading(false);
    if (uploadErr || !url) {
      setErr(uploadErr ?? "Upload failed.");
      return;
    }
    patch({ url });
  }

  return (
    <div className="flex flex-col gap-2">
      <div className="flex flex-wrap items-center gap-1 border-b border-white/8 pb-2">
        {(["left", "center", "right"] as TextAlign[]).map((align) => (
          <AlignBtn key={align} align={align} current={block.align} set={(value) => patch({ align: value })} />
        ))}
      </div>

      {block.url ? (
        <div className="relative w-full overflow-hidden rounded-lg">
          <Image
            src={block.url}
            alt={block.alt || "image"}
            width={800}
            height={450}
            unoptimized
            className="w-full rounded-lg object-contain"
          />
          <button
            type="button"
            onClick={() => patch({ url: "" })}
            className="absolute right-2 top-2 flex size-7 items-center justify-center rounded-full bg-black/60 text-xs text-white transition hover:bg-black/80"
          >
            X
          </button>
        </div>
      ) : (
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          disabled={uploading}
          onDragOver={(event) => event.preventDefault()}
          onDrop={(event) => {
            event.preventDefault();
            const file = event.dataTransfer.files?.[0];
            if (file) handleFile(file);
          }}
          className="flex h-28 w-full items-center justify-center rounded-lg border border-dashed border-white/20 text-sm text-muted-foreground/70 transition hover:border-white/40 hover:text-foreground/80"
        >
          {uploading ? "Uploading..." : "Click or drag image here"}
        </button>
      )}

      {err && <p className="text-xs text-red-400">{err}</p>}

      <input
        type="text"
        value={block.alt}
        onChange={(event) => patch({ alt: event.target.value })}
        placeholder="Alt text"
        className="w-full rounded border border-white/10 bg-white/5 px-2 py-1 text-xs text-foreground/70 placeholder:text-muted-foreground/50 outline-none focus:border-white/25"
      />
      <input
        type="text"
        value={block.caption}
        onChange={(event) => patch({ caption: event.target.value })}
        placeholder="Caption"
        className="w-full rounded border border-white/10 bg-white/5 px-2 py-1 text-xs text-muted-foreground placeholder:text-muted-foreground/50 outline-none focus:border-white/25"
      />

      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(event) => {
          const file = event.target.files?.[0];
          if (file) handleFile(file);
          event.target.value = "";
        }}
      />
    </div>
  );
}

function DividerEditor() {
  return (
    <div className="flex items-center gap-3 py-1">
      <div className="h-px flex-1 bg-white/15" />
      <span className="text-xs text-muted-foreground/50">divider</span>
      <div className="h-px flex-1 bg-white/15" />
    </div>
  );
}

function SpacerEditor({
  block,
  patch,
}: {
  block: SpacerBlock;
  patch: (p: Partial<SpacerBlock>) => void;
}) {
  return (
    <div className="flex items-center gap-2 py-1">
      <span className="text-xs text-muted-foreground/70">Space:</span>
      {(["sm", "md", "lg"] as const).map((size) => (
        <button
          key={size}
          type="button"
          onClick={() => patch({ size })}
          className={`rounded px-2 py-0.5 text-xs transition ${
            block.size === size
              ? "bg-white/15 text-foreground/85"
              : "text-muted-foreground/70 hover:text-foreground/80"
          }`}
        >
          {size.toUpperCase()}
        </button>
      ))}
    </div>
  );
}

const ADD_TYPES: { type: BlockType; label: string; icon: string }[] = [
  { type: "heading", label: "Heading", icon: "H" },
  { type: "paragraph", label: "Paragraph", icon: "P" },
  { type: "image", label: "Image", icon: "Img" },
  { type: "divider", label: "Divider", icon: "-" },
  { type: "spacer", label: "Spacer", icon: "Space" },
];

function AddBlockButton({ onAdd }: { onAdd: (type: BlockType) => void }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="relative flex justify-center py-1">
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        className="h-6 rounded-full border border-white/15 bg-background px-3 text-xs text-muted-foreground/70 transition hover:border-primary/40 hover:text-primary"
      >
        + Add block
      </button>
      {open && (
        <>
          <div className="fixed inset-0 z-10" onClick={() => setOpen(false)} />
          <div className="absolute top-8 z-20 flex gap-1 rounded-xl border border-white/15 bg-slate-900/95 p-2 shadow-xl backdrop-blur-sm">
            {ADD_TYPES.map(({ type, label, icon }) => (
              <button
                key={type}
                type="button"
                onClick={() => {
                  onAdd(type);
                  setOpen(false);
                }}
                className="flex min-w-[52px] flex-col items-center gap-0.5 rounded-lg px-3 py-2 text-xs text-muted-foreground transition hover:bg-white/8 hover:text-white"
              >
                <span className="text-base leading-none">{icon}</span>
                <span>{label}</span>
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export function BlockEditor({ value, onChange }: Props) {
  function patch<T extends Block>(id: string, partial: Partial<T>) {
    onChange(value.map((block) => (block.id === id ? { ...block, ...partial } : block)) as Block[]);
  }

  function remove(id: string) {
    onChange(value.filter((block) => block.id !== id));
  }

  function move(id: string, dir: -1 | 1) {
    const idx = value.findIndex((block) => block.id === id);
    if (idx < 0) return;
    const next = idx + dir;
    if (next < 0 || next >= value.length) return;
    const arr = [...value];
    [arr[idx], arr[next]] = [arr[next], arr[idx]];
    onChange(arr);
  }

  function addAt(type: BlockType, afterIdx: number) {
    const block = makeBlock(type);
    const arr = [...value];
    arr.splice(afterIdx + 1, 0, block);
    onChange(arr);
  }

  return (
    <div className="flex flex-col">
      <AddBlockButton onAdd={(type) => addAt(type, -1)} />

      {value.map((block, idx) => (
        <div key={block.id} className="flex flex-col">
          <div className="group relative mt-1 rounded-xl border border-white/10 bg-white/3 p-4 transition hover:border-white/20">
            <div className="absolute right-2 top-2 flex items-center gap-0.5 opacity-0 transition group-hover:opacity-100">
              <button
                type="button"
                onClick={() => move(block.id, -1)}
                disabled={idx === 0}
                title="Move up"
                className="flex size-6 items-center justify-center rounded text-xs text-muted-foreground/70 transition hover:text-foreground disabled:opacity-20"
              >
                Up
              </button>
              <button
                type="button"
                onClick={() => move(block.id, 1)}
                disabled={idx === value.length - 1}
                title="Move down"
                className="flex size-6 items-center justify-center rounded text-xs text-muted-foreground/70 transition hover:text-foreground disabled:opacity-20"
              >
                Dn
              </button>
              <button
                type="button"
                onClick={() => remove(block.id)}
                title="Delete block"
                className="flex size-6 items-center justify-center rounded text-xs text-muted-foreground/70 transition hover:text-red-400"
              >
                X
              </button>
            </div>

            {block.type === "heading" && (
              <HeadingEditor block={block} patch={(partial) => patch(block.id, partial)} />
            )}
            {block.type === "paragraph" && (
              <ParagraphEditor block={block} patch={(partial) => patch(block.id, partial)} />
            )}
            {block.type === "image" && (
              <ImageBlockEditor block={block} patch={(partial) => patch(block.id, partial)} />
            )}
            {block.type === "divider" && <DividerEditor />}
            {block.type === "spacer" && (
              <SpacerEditor block={block} patch={(partial) => patch(block.id, partial)} />
            )}
          </div>

          <AddBlockButton onAdd={(type) => addAt(type, idx)} />
        </div>
      ))}

      {value.length === 0 && (
        <p className="py-4 text-center text-xs text-muted-foreground/50">
          No blocks yet. Add one above.
        </p>
      )}
    </div>
  );
}
