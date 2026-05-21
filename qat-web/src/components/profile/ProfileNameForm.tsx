"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { useTr } from "@/lib/i18n/context";

const inputCls =
  "w-full rounded-lg border border-white/15 bg-white/5 px-4 py-2.5 text-sm text-white placeholder:text-slate-500 focus:border-cyan-300/50 focus:outline-none focus:ring-2 focus:ring-cyan-300/30";

export function ProfileNameForm({
  initialName,
}: {
  initialName: string;
}) {
  const tr = useTr();
  const p = tr.profileName;
  const router = useRouter();
  const [name, setName] = useState(initialName);
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState("");

  async function save(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setMsg("");

    const res = await fetch("/api/profile/update", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ full_name: name }),
    });

    setSaving(false);
    if (res.ok) {
      setMsg(p.saved);
      router.refresh();
    } else {
      setMsg(p.failed);
    }
  }

  return (
    <form onSubmit={save} className="flex flex-col gap-3 sm:flex-row sm:items-end">
      <div className="flex-1">
        <label htmlFor="display-name" className="mb-1.5 block text-xs font-medium text-slate-300">
          {p.displayName}
        </label>
        <input
          id="display-name"
          type="text"
          value={name}
          maxLength={80}
          onChange={(e) => setName(e.target.value)}
          placeholder={p.placeholder}
          className={inputCls}
        />
      </div>
      <div className="flex items-center gap-3">
        <button
          type="submit"
          disabled={saving}
          className="inline-flex h-10 items-center rounded-full bg-cyan-200 px-4 text-sm font-semibold text-slate-950 transition hover:bg-cyan-100 disabled:opacity-50"
        >
          {saving ? p.saving : p.save}
        </button>
        {msg && (
          <p className={`text-xs ${msg === p.saved ? "text-cyan-300" : "text-red-300"}`}>{msg}</p>
        )}
      </div>
    </form>
  );
}
