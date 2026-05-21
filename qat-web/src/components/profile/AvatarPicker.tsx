"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { useRouter } from "next/navigation";

import { CatAvatar, CAT_CONFIG, type CatType } from "./CatAvatar";
import type { AvatarType } from "@/lib/data/profile";

const CAT_TYPES: CatType[] = ["artist_cat", "technologist_cat", "scientist_cat"];

type Props = {
  userId: string;
  current: AvatarType;
  currentUrl: string | null;
  onSaved?: (type: AvatarType, url: string | null) => void;
};

export function AvatarPicker({ userId, current, currentUrl, onSaved }: Props) {
  const router = useRouter();
  const [selected, setSelected] = useState<AvatarType>(current);
  const [previewUrl, setPreviewUrl] = useState<string | null>(currentUrl);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [msg, setMsg] = useState("");
  const fileRef = useRef<HTMLInputElement>(null);

  async function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setMsg("");
    setUploading(true);

    const fd = new FormData();
    fd.append("file", file);

    const res = await fetch("/api/profile/avatar", { method: "POST", body: fd });
    const json = await res.json();
    setUploading(false);

    if (!res.ok) {
      setMsg("Upload failed: " + (json.error ?? "unknown error"));
      return;
    }

    setPreviewUrl(json.url);
    setSelected("upload");
  }

  async function save() {
    setSaving(true);
    setMsg("");
    const res = await fetch("/api/profile/update", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        avatar_type: selected,
        avatar_url: selected === "upload" ? previewUrl : null,
      }),
    });
    setSaving(false);
    if (res.ok) {
      setMsg("Saved!");
      onSaved?.(selected, selected === "upload" ? previewUrl : null);
      router.refresh();
    } else {
      setMsg("Save failed. Try again.");
    }
  }

  return (
    <div className="flex flex-col gap-5">
      <p className="text-sm font-medium text-slate-200">Choose avatar</p>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4">
        {CAT_TYPES.map((type) => {
          const cfg = CAT_CONFIG[type];
          const active = selected === type;
          return (
            <button
              key={type}
              onClick={() => setSelected(type)}
              className={`flex flex-col items-center gap-2 rounded-xl p-3 transition ${
                active
                  ? "bg-cyan-300/10 ring-2 ring-cyan-300"
                  : "bg-white/5 hover:bg-white/8 ring-1 ring-white/10"
              }`}
            >
              <CatAvatar type={type} size={80} />
              <span className="text-xs font-medium text-slate-200">{cfg.label}</span>
              <span className="text-[10px] text-slate-400">{cfg.sub}</span>
            </button>
          );
        })}

        {/* Upload option */}
        <button
          onClick={() => !uploading && fileRef.current?.click()}
          disabled={uploading}
          className={`flex flex-col items-center justify-center gap-2 rounded-xl p-3 transition ${
            selected === "upload"
              ? "bg-cyan-300/10 ring-2 ring-cyan-300"
              : "bg-white/5 hover:bg-white/8 ring-1 ring-white/10"
          } disabled:opacity-70`}
          style={{ minHeight: 130 }}
        >
          {uploading ? (
            <div className="flex size-20 items-center justify-center rounded-full bg-white/10">
              <svg className="size-8 animate-spin text-cyan-300" viewBox="0 0 24 24" fill="none">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 00-8 8h4z" />
              </svg>
            </div>
          ) : previewUrl && selected === "upload" ? (
            <Image
              src={previewUrl}
              alt="Your photo"
              width={80}
              height={80}
              className="size-20 rounded-full object-cover"
            />
          ) : (
            <div className="flex size-20 items-center justify-center rounded-full bg-white/10 text-3xl">
              📷
            </div>
          )}
          <span className="text-xs font-medium text-slate-200">
            {uploading ? "Uploading…" : "Upload photo"}
          </span>
          <span className="text-[10px] text-slate-400">JPG, PNG · max 2 MB</span>
        </button>
      </div>

      <input
        ref={fileRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleFileChange}
      />

      {msg && (
        <p className={`text-sm ${msg === "Saved!" ? "text-cyan-300" : "text-red-300"}`}>{msg}</p>
      )}

      <button
        onClick={save}
        disabled={saving}
        className="self-start inline-flex h-10 items-center justify-center rounded-full bg-cyan-200 px-5 text-sm font-semibold text-slate-950 transition hover:bg-cyan-100 disabled:opacity-50"
      >
        {saving ? "Saving…" : "Save avatar"}
      </button>
    </div>
  );
}
