"use client";

import { useState } from "react";
import type { SiteOgSettings } from "@/lib/data/site-settings";
import { useTr } from "@/lib/i18n/context";

const inputCls =
  "w-full rounded-lg border border-white/15 bg-white/5 px-3 py-2.5 text-sm text-white placeholder:text-muted-foreground/70 focus:border-primary/50 focus:outline-none focus:ring-2 focus:ring-primary/30";

export function SiteOgForm({ initial }: { initial: SiteOgSettings }) {
  const tr = useTr();
  const [imageUrl, setImageUrl] = useState(initial.imageUrl);
  const [description, setDescription] = useState(initial.description);
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState<"idle" | "saved" | "failed">("idle");

  async function save(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setMsg("idle");
    const res = await fetch("/api/admin/settings", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ key: "og", value: { imageUrl, description } }),
    });
    setSaving(false);
    setMsg(res.ok ? "saved" : "failed");
  }

  return (
    <form onSubmit={save} className="flex flex-col gap-4">
      <div className="flex flex-col gap-1.5">
        <label className="text-sm font-medium text-foreground/85">
          {tr.admin.settings.ogImageLabel}
        </label>
        <input
          type="url"
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
          placeholder="https://… (1200×630 recommended)"
          className={inputCls}
        />
        <p className="text-xs text-muted-foreground/70">
          {tr.admin.settings.ogImageDesc}
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
        <label className="text-sm font-medium text-foreground/85">
          {tr.admin.settings.ogDescLabel}
        </label>
        <textarea
          rows={3}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder={tr.admin.settings.ogDescPlaceholder}
          className={inputCls + " resize-none"}
        />
      </div>

      <div className="flex items-center gap-4">
        <button
          type="submit"
          disabled={saving}
          className="inline-flex h-9 items-center rounded-full bg-primary px-5 text-sm font-semibold text-slate-950 transition hover:bg-primary/90 disabled:opacity-50"
        >
          {saving ? tr.admin.settings.saving : tr.admin.settings.saveBtn}
        </button>
        {msg !== "idle" && (
          <p className={`text-sm ${msg === "saved" ? "text-primary" : "text-red-300"}`}>
            {msg === "saved" ? tr.admin.settings.saved : tr.admin.settings.saveFailed}
          </p>
        )}
      </div>
    </form>
  );
}
