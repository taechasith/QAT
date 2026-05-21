"use client";

import { useState } from "react";
import type { SiteOgSettings } from "@/lib/data/site-settings";

const inputCls =
  "w-full rounded-lg border border-white/15 bg-white/5 px-3 py-2.5 text-sm text-white placeholder:text-slate-500 focus:border-cyan-300/50 focus:outline-none focus:ring-2 focus:ring-cyan-300/30";

export function SiteOgForm({ initial }: { initial: SiteOgSettings }) {
  const [imageUrl, setImageUrl] = useState(initial.imageUrl);
  const [description, setDescription] = useState(initial.description);
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState("");

  async function save(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setMsg("");
    const res = await fetch("/api/admin/settings", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ key: "og", value: { imageUrl, description } }),
    });
    setSaving(false);
    setMsg(res.ok ? "Saved!" : "Save failed.");
  }

  return (
    <form onSubmit={save} className="flex flex-col gap-4">
      <div className="flex flex-col gap-1.5">
        <label className="text-sm font-medium text-slate-200">
          Default OG image URL
        </label>
        <input
          type="url"
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
          placeholder="https://… (1200×630 recommended)"
          className={inputCls}
        />
        <p className="text-xs text-slate-500">
          Used as the preview image when sharing any page without a cover photo.
        </p>
        {imageUrl && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={imageUrl}
            alt="OG preview"
            className="mt-1 h-32 w-full rounded-lg object-cover border border-white/10"
            onError={(e) => (e.currentTarget.style.display = "none")}
          />
        )}
      </div>

      <div className="flex flex-col gap-1.5">
        <label className="text-sm font-medium text-slate-200">
          Default description
        </label>
        <textarea
          rows={3}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Shown in link previews for pages without specific content"
          className={inputCls + " resize-none"}
        />
      </div>

      <div className="flex items-center gap-4">
        <button
          type="submit"
          disabled={saving}
          className="inline-flex h-9 items-center rounded-full bg-cyan-200 px-5 text-sm font-semibold text-slate-950 transition hover:bg-cyan-100 disabled:opacity-50"
        >
          {saving ? "Saving…" : "Save"}
        </button>
        {msg && (
          <p className={`text-sm ${msg === "Saved!" ? "text-cyan-300" : "text-red-300"}`}>
            {msg}
          </p>
        )}
      </div>
    </form>
  );
}
