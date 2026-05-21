"use client";

import { useState } from "react";
import type { HomepageSettings } from "@/lib/data/site-settings";

const inputCls =
  "w-full rounded-lg border border-white/15 bg-white/5 px-3 py-2.5 text-sm text-white placeholder:text-slate-500 focus:border-cyan-300/50 focus:outline-none focus:ring-2 focus:ring-cyan-300/30";

export function HomepageSettingsForm({ initial }: { initial: HomepageSettings }) {
  const [upcomingTitle, setUpcomingTitle] = useState(initial.upcomingTitle);
  const [emptyState, setEmptyState] = useState(initial.emptyState);
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState("");

  async function save(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setMsg("");
    const res = await fetch("/api/admin/settings", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ key: "homepage", value: { upcomingTitle, emptyState } }),
    });
    setSaving(false);
    setMsg(res.ok ? "Saved!" : "Save failed.");
  }

  return (
    <form onSubmit={save} className="flex flex-col gap-4">
      <div className="flex flex-col gap-1.5">
        <label className="text-sm font-medium text-slate-200">
          Featured section heading
        </label>
        <input
          type="text"
          value={upcomingTitle}
          onChange={(e) => setUpcomingTitle(e.target.value)}
          placeholder="Upcoming events and projects"
          className={inputCls}
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <label className="text-sm font-medium text-slate-200">
          Empty state message
        </label>
        <input
          type="text"
          value={emptyState}
          onChange={(e) => setEmptyState(e.target.value)}
          placeholder="New content will appear here once published."
          className={inputCls}
        />
        <p className="text-xs text-slate-500">
          Shown on the home page when no featured content is published.
        </p>
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
