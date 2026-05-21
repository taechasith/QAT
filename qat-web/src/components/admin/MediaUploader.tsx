"use client";

import { useRef, useState } from "react";
import { Upload, X } from "lucide-react";
import { useTr } from "@/lib/i18n/context";
import { clientUploadMedia } from "@/lib/supabase/client-upload";

type MediaUploaderProps = {
  value: string;
  onChange: (url: string) => void;
};

export function MediaUploader({ value, onChange }: MediaUploaderProps) {
  const tr = useTr();
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  async function handleFile(file: File) {
    if (!file.type.startsWith("image/")) {
      setError(tr.locale === "th" ? "รองรับเฉพาะไฟล์รูปภาพเท่านั้น" : "Only image files are supported.");
      return;
    }
    setUploading(true);
    setError("");

    const { url, error: uploadErr } = await clientUploadMedia(file);

    if (uploadErr || !url) {
      setError(uploadErr ?? (tr.locale === "th" ? "อัปโหลดไม่สำเร็จ" : "Upload failed."));
    } else {
      onChange(url);
    }
    setUploading(false);
  }

  function handleDrop(e: React.DragEvent) {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) handleFile(file);
  }

  return (
    <div className="flex flex-col gap-2">
      {value ? (
        <div className="relative aspect-video overflow-hidden rounded-lg border border-white/10 bg-black/30">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={value} alt="" className="h-full w-full object-cover" />
          <button
            type="button"
            onClick={() => onChange("")}
            className="absolute right-2 top-2 rounded-full bg-black/60 p-1 text-white hover:bg-black/80"
            aria-label={tr.locale === "th" ? "ลบรูปภาพ" : "Remove image"}
          >
            <X className="size-4" />
          </button>
        </div>
      ) : (
        <div
          onDrop={handleDrop}
          onDragOver={(e) => e.preventDefault()}
          className="flex flex-col items-center justify-center gap-3 rounded-lg border border-dashed border-white/20 bg-white/5 py-8 transition hover:border-white/30"
        >
          <Upload className="size-6 text-slate-400" aria-hidden="true" />
          <div className="text-center text-sm text-slate-400">
            <button
              type="button"
              onClick={() => inputRef.current?.click()}
              disabled={uploading}
              className="text-cyan-200 underline underline-offset-2 hover:text-white disabled:opacity-50"
            >
              {uploading ? tr.admin.form.uploading : (tr.locale === "th" ? "เลือกไฟล์" : "Choose a file")}
            </button>{" "}
            {tr.locale === "th" ? "หรือลากและวางไฟล์ที่นี่" : "or drag and drop"}
          </div>
          <input
            ref={inputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) handleFile(file);
            }}
          />
        </div>
      )}
      {error ? <p className="text-xs text-red-400">{error}</p> : null}
    </div>
  );
}

