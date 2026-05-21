"use client";

import { useState } from "react";
import Link from "next/link";
import { BlockEditor } from "./BlockEditor";
import type { Block } from "@/lib/types/blocks";
import { useTr } from "@/lib/i18n/context";

type Props = {
  itemId: string;
  title: string;
  initialBlocks: Block[];
};

export function BlocksEditorPage({ itemId, title, initialBlocks }: Props) {
  const tr = useTr();
  const [blocks, setBlocks] = useState<Block[]>(initialBlocks);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState("");

  async function save() {
    setSaving(true);
    setSaved(false);
    setError("");

    const res = await fetch(`/api/admin/content/${itemId}/blocks`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ blocks }),
    });

    const json = await res.json().catch(() => ({}));
    setSaving(false);

    if (!res.ok) {
      setError(json.error ?? "Save failed.");
    } else {
      setSaved(true);
      setTimeout(() => setSaved(false), 2500);
    }
  }

  return (
    <div className="flex flex-col gap-6">
      {/* header */}
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <Link
            href={`/admin/content/${itemId}/edit`}
            className="text-xs text-slate-500 hover:text-slate-300 transition"
          >
            {tr.admin.editContent.backToDetails}
          </Link>
          <h1 className="mt-1 text-2xl font-semibold text-white">{title}</h1>
          <p className="mt-0.5 text-xs text-slate-500">
            {tr.admin.editContent.visualBlockEditor}
          </p>
        </div>

        <button
          type="button"
          onClick={save}
          disabled={saving}
          className="inline-flex h-10 items-center rounded-lg bg-cyan-200 px-6 text-sm font-semibold text-slate-950 transition hover:bg-cyan-100 disabled:opacity-50"
        >
          {saving ? tr.admin.editContent.saving : saved ? tr.admin.editContent.saved : tr.admin.editContent.saveBlocks}
        </button>
      </div>

      {error && (
        <p className="rounded-lg border border-red-400/20 bg-red-400/10 px-3 py-2 text-sm text-red-300">
          {error}
        </p>
      )}

      <div className="rounded-xl border border-white/10 bg-white/2 px-3 py-3">
        <BlockEditor value={blocks} onChange={setBlocks} />
      </div>

      {blocks.length > 0 && (
        <div className="flex justify-end">
          <button
            type="button"
            onClick={save}
            disabled={saving}
            className="inline-flex h-10 items-center rounded-lg bg-cyan-200 px-6 text-sm font-semibold text-slate-950 transition hover:bg-cyan-100 disabled:opacity-50"
          >
            {saving ? tr.admin.editContent.saving : saved ? tr.admin.editContent.saved : tr.admin.editContent.saveBlocks}
          </button>
        </div>
      )}
    </div>
  );
}
