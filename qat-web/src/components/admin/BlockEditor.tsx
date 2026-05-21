"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import type {
  Block,
  BlockType,
  HeadingBlock,
  ParagraphBlock,
  ImageBlock,
  SpacerBlock,
  TextAlign,
} from "@/lib/types/blocks";
import { makeBlock } from "@/lib/types/blocks";

type Props = {
  value: Block[];
  onChange: (blocks: Block[]) => void;
};

/* ── shared toolbar atoms ── */

function AlignBtn({
  align,
  current,
  set,
}: {
  align: TextAlign;
  current: TextAlign;
  set: (a: TextAlign) => void;
}) {
  const icons: Record<TextAlign, string> = { left: "⬅", center: "⬌", right: "➡" };
  return (
    <button
      type="button"
      onClick={() => set(align)}
      title={`Align ${align}`}
      className={`px-1.5 py-0.5 rounded text-xs transition ${
        current === align
          ? "bg-cyan-300/20 text-cyan-300"
          : "text-slate-500 hover:text-slate-200"
      }`}
    >
      {icons[align]}
    </button>
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
      className={`px-1.5 py-0.5 rounded text-xs font-bold transition ${
        on ? "bg-cyan-300/20 text-cyan-300" : "text-slate-500 hover:text-slate-200"
      }`}
    >
      {label}
    </button>
  );
}

function Sep() {
  return <span className="text-white/10 select-none">|</span>;
}

/* ── heading block ── */

function HeadingEditor({
  block,
  patch,
}: {
  block: HeadingBlock;
  patch: (p: Partial<HeadingBlock>) => void;
}) {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex flex-wrap items-center gap-1 border-b border-white/8 pb-2">
        {([1, 2, 3] as const).map((l) => (
          <button
            key={l}
            type="button"
            onClick={() => patch({ level: l })}
            className={`px-2 py-0.5 rounded text-xs font-bold transition ${
              block.level === l
                ? "bg-violet-400/20 text-violet-300"
                : "text-slate-500 hover:text-slate-200"
            }`}
          >
            H{l}
          </button>
        ))}
        <Sep />
        {(["left", "center", "right"] as TextAlign[]).map((a) => (
          <AlignBtn key={a} align={a} current={block.align} set={(v) => patch({ align: v })} />
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
        onChange={(e) => patch({ text: e.target.value })}
        placeholder="Heading text…"
        style={{
          textAlign: block.align,
          fontWeight: block.bold ? 700 : block.level === 1 ? 700 : block.level === 2 ? 600 : 500,
          fontSize:
            block.level === 1 ? "1.5rem" : block.level === 2 ? "1.25rem" : "1.05rem",
        }}
        className="w-full bg-transparent text-white placeholder:text-slate-600 outline-none"
      />
      <div className="mt-2 border-t border-white/8 pt-2">
        <label className="mb-1 block text-[10px] font-medium uppercase tracking-wider text-amber-400/70">
          TH — Thai translation (optional)
        </label>
        <input
          type="text"
          value={block.text_th ?? ""}
          onChange={(e) => patch({ text_th: e.target.value })}
          placeholder="ข้อความหัวเรื่องภาษาไทย…"
          className="w-full bg-transparent text-sm text-slate-300 placeholder:text-slate-600 outline-none"
        />
      </div>
    </div>
  );
}

/* ── paragraph block ── */

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
        {(["left", "center", "right"] as TextAlign[]).map((a) => (
          <AlignBtn key={a} align={a} current={block.align} set={(v) => patch({ align: v })} />
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
        onChange={(e) => patch({ text: e.target.value })}
        placeholder="Paragraph text…"
        rows={3}
        style={{
          textAlign: block.align,
          fontWeight: block.bold ? 700 : 400,
          fontStyle: block.italic ? "italic" : "normal",
        }}
        className="w-full resize-y bg-transparent text-sm text-slate-200 placeholder:text-slate-600 outline-none"
      />
      <div className="mt-2 border-t border-white/8 pt-2">
        <label className="mb-1 block text-[10px] font-medium uppercase tracking-wider text-amber-400/70">
          TH — Thai translation (optional)
        </label>
        <textarea
          value={block.text_th ?? ""}
          onChange={(e) => patch({ text_th: e.target.value })}
          placeholder="ข้อความภาษาไทย…"
          rows={2}
          className="w-full resize-y bg-transparent text-sm text-slate-300 placeholder:text-slate-600 outline-none"
        />
      </div>
    </div>
  );
}

/* ── image block ── */

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
    if (file.size > 20 * 1024 * 1024) {
      setErr("Max 20 MB.");
      return;
    }
    setErr("");
    setUploading(true);
    const form = new FormData();
    form.append("file", file);
    const res = await fetch("/api/admin/media", { method: "POST", body: form });
    const json = await res.json().catch(() => ({}));
    setUploading(false);
    if (!res.ok || !json.url) {
      setErr(json.error ?? "Upload failed.");
      return;
    }
    patch({ url: json.url });
  }

  return (
    <div className="flex flex-col gap-2">
      <div className="flex flex-wrap items-center gap-1 border-b border-white/8 pb-2">
        {(["left", "center", "right"] as TextAlign[]).map((a) => (
          <AlignBtn key={a} align={a} current={block.align} set={(v) => patch({ align: v })} />
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
            className="absolute right-2 top-2 flex size-7 items-center justify-center rounded-full bg-black/60 text-xs text-white hover:bg-black/80 transition"
          >
            ×
          </button>
        </div>
      ) : (
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          disabled={uploading}
          onDragOver={(e) => e.preventDefault()}
          onDrop={(e) => {
            e.preventDefault();
            const f = e.dataTransfer.files?.[0];
            if (f) handleFile(f);
          }}
          className="flex h-28 w-full items-center justify-center rounded-lg border border-dashed border-white/20 text-sm text-slate-500 hover:border-white/40 hover:text-slate-300 transition"
        >
          {uploading ? "Uploading…" : "Click or drag image here"}
        </button>
      )}

      {err && <p className="text-xs text-red-400">{err}</p>}

      <input
        type="text"
        value={block.alt}
        onChange={(e) => patch({ alt: e.target.value })}
        placeholder="Alt text (accessibility)"
        className="w-full rounded border border-white/10 bg-white/5 px-2 py-1 text-xs text-slate-300 placeholder:text-slate-600 outline-none focus:border-white/25"
      />
      <input
        type="text"
        value={block.caption}
        onChange={(e) => patch({ caption: e.target.value })}
        placeholder="Caption (optional)"
        className="w-full rounded border border-white/10 bg-white/5 px-2 py-1 text-xs text-slate-400 placeholder:text-slate-600 outline-none focus:border-white/25"
      />

      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(e) => {
          const f = e.target.files?.[0];
          if (f) handleFile(f);
          e.target.value = "";
        }}
      />
    </div>
  );
}

/* ── divider block ── */

function DividerEditor() {
  return (
    <div className="flex items-center gap-3 py-1">
      <div className="h-px flex-1 bg-white/15" />
      <span className="text-xs text-slate-600">divider</span>
      <div className="h-px flex-1 bg-white/15" />
    </div>
  );
}

/* ── spacer block ── */

function SpacerEditor({
  block,
  patch,
}: {
  block: SpacerBlock;
  patch: (p: Partial<SpacerBlock>) => void;
}) {
  return (
    <div className="flex items-center gap-2 py-1">
      <span className="text-xs text-slate-500">Space:</span>
      {(["sm", "md", "lg"] as const).map((s) => (
        <button
          key={s}
          type="button"
          onClick={() => patch({ size: s })}
          className={`rounded px-2 py-0.5 text-xs transition ${
            block.size === s
              ? "bg-white/15 text-slate-200"
              : "text-slate-500 hover:text-slate-300"
          }`}
        >
          {s.toUpperCase()}
        </button>
      ))}
    </div>
  );
}

/* ── add-block button ── */

const ADD_TYPES: { type: BlockType; label: string; icon: string }[] = [
  { type: "heading", label: "Heading", icon: "H" },
  { type: "paragraph", label: "Paragraph", icon: "¶" },
  { type: "image", label: "Image", icon: "🖼" },
  { type: "divider", label: "Divider", icon: "—" },
  { type: "spacer", label: "Spacer", icon: "↕" },
];

function AddBlockButton({ onAdd }: { onAdd: (type: BlockType) => void }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="relative flex justify-center py-1">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="h-6 rounded-full border border-white/15 bg-slate-950 px-3 text-xs text-slate-500 transition hover:border-cyan-300/40 hover:text-cyan-300"
      >
        + Add block
      </button>
      {open && (
        <>
          {/* close on outside click */}
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
                className="flex min-w-[52px] flex-col items-center gap-0.5 rounded-lg px-3 py-2 text-xs text-slate-400 transition hover:bg-white/8 hover:text-white"
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

/* ── main BlockEditor ── */

export function BlockEditor({ value, onChange }: Props) {
  function patch<T extends Block>(id: string, partial: Partial<T>) {
    onChange(value.map((b) => (b.id === id ? { ...b, ...partial } : b)) as Block[]);
  }

  function remove(id: string) {
    onChange(value.filter((b) => b.id !== id));
  }

  function move(id: string, dir: -1 | 1) {
    const idx = value.findIndex((b) => b.id === id);
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
      <AddBlockButton onAdd={(t) => addAt(t, -1)} />

      {value.map((block, idx) => (
        <div key={block.id} className="flex flex-col">
          <div className="group relative mt-1 rounded-xl border border-white/10 bg-white/3 p-4 transition hover:border-white/20">
            {/* block controls */}
            <div className="absolute right-2 top-2 flex items-center gap-0.5 opacity-0 transition group-hover:opacity-100">
              <button
                type="button"
                onClick={() => move(block.id, -1)}
                disabled={idx === 0}
                title="Move up"
                className="flex size-6 items-center justify-center rounded text-xs text-slate-500 transition hover:text-slate-200 disabled:opacity-20"
              >
                ↑
              </button>
              <button
                type="button"
                onClick={() => move(block.id, 1)}
                disabled={idx === value.length - 1}
                title="Move down"
                className="flex size-6 items-center justify-center rounded text-xs text-slate-500 transition hover:text-slate-200 disabled:opacity-20"
              >
                ↓
              </button>
              <button
                type="button"
                onClick={() => remove(block.id)}
                title="Delete block"
                className="flex size-6 items-center justify-center rounded text-xs text-slate-500 transition hover:text-red-400"
              >
                ✕
              </button>
            </div>

            {block.type === "heading" && (
              <HeadingEditor block={block} patch={(p) => patch(block.id, p)} />
            )}
            {block.type === "paragraph" && (
              <ParagraphEditor block={block} patch={(p) => patch(block.id, p)} />
            )}
            {block.type === "image" && (
              <ImageBlockEditor block={block} patch={(p) => patch(block.id, p)} />
            )}
            {block.type === "divider" && <DividerEditor />}
            {block.type === "spacer" && (
              <SpacerEditor block={block} patch={(p) => patch(block.id, p)} />
            )}
          </div>

          <AddBlockButton onAdd={(t) => addAt(t, idx)} />
        </div>
      ))}

      {value.length === 0 && (
        <p className="py-4 text-center text-xs text-slate-600">
          No blocks yet — add one above
        </p>
      )}
    </div>
  );
}
