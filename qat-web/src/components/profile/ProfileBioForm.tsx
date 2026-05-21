"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export function ProfileBioForm({ initialBio }: { initialBio: string }) {
  const router = useRouter();
  const [bio, setBio] = useState(initialBio);
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState("");

  async function save(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setMsg("");
    const res = await fetch("/api/profile/update", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ bio: bio.trim() || null }),
    });
    setSaving(false);
    if (res.ok) {
      setMsg("Saved!");
      router.refresh();
    } else {
      setMsg("Save failed.");
    }
  }

  return (
    <form onSubmit={save} className="flex flex-col gap-3">
      <label htmlFor="bio" className="text-xs font-medium text-slate-300">
        Bio <span className="text-slate-500">(optional · max 300 chars)</span>
      </label>
      <textarea
        id="bio"
        rows={3}
        value={bio}
        maxLength={300}
        onChange={(e) => setBio(e.target.value)}
        placeholder="Short bio shown on content you publish…"
        className="w-full rounded-lg border border-white/15 bg-white/5 px-4 py-2.5 text-sm text-white placeholder:text-slate-500 focus:border-cyan-300/50 focus:outline-none focus:ring-2 focus:ring-cyan-300/30 resize-none"
      />
      <div className="flex items-center gap-3">
        <button
          type="submit"
          disabled={saving}
          className="inline-flex h-9 items-center rounded-full bg-cyan-200 px-4 text-sm font-semibold text-slate-950 transition hover:bg-cyan-100 disabled:opacity-50"
        >
          {saving ? "Saving…" : "Save bio"}
        </button>
        {msg && (
          <p className={`text-xs ${msg === "Saved!" ? "text-cyan-300" : "text-red-300"}`}>{msg}</p>
        )}
      </div>
    </form>
  );
}
