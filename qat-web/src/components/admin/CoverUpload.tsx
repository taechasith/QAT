"use client";

import { useRef, useState } from "react";
import { useTr } from "@/lib/i18n/context";
import { clientUploadMedia } from "@/lib/supabase/client-upload";
import { isVideoUrl } from "@/lib/media";
import { ADMIN_MEDIA_MAX_UPLOAD_MB } from "@/lib/upload-limits";

type Props = {
  value: string;
  onChange: (url: string) => void;
  label?: string;
};

export function CoverUpload({ value, onChange, label }: Props) {
  const tr = useTr();
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const showAsVideo = Boolean(value) && isVideoUrl(value);

  async function handleFile(file: File) {
    if (!file.type.startsWith("image/") && !file.type.startsWith("video/")) {
      setError(tr.admin.form.onlyImages);
      return;
    }
    setError("");
    setUploading(true);
    const { url, error: uploadErr } = await clientUploadMedia(file);
    setUploading(false);

    if (uploadErr || !url) {
      setError(uploadErr ?? (tr.locale === "th" ? "อัปโหลดไม่สำเร็จ" : "Upload failed."));
    } else {
      onChange(url);
    }
  }

  function onInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) handleFile(file);
    e.target.value = "";
  }

  function onDrop(e: React.DragEvent) {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (file) handleFile(file);
  }

  return (
    <div className="flex flex-col gap-2">
      {label !== undefined && (
        <label className="text-sm font-medium text-foreground/85">{label}</label>
      )}

      {/* 16:9 container */}
      <div
        className="relative w-full overflow-hidden rounded-xl border border-white/15"
        style={{ aspectRatio: "16 / 9" }}
        onDrop={onDrop}
        onDragOver={(e) => e.preventDefault()}
      >
        {value ? (
          <>
            {showAsVideo ? (
              <video
                src={value}
                autoPlay
                loop
                muted
                playsInline
                preload="metadata"
                style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }}
              />
            ) : (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={value}
                alt="Cover"
                style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }}
              />
            )}
            <button
              type="button"
              onClick={() => onChange("")}
              className="absolute right-3 top-3 flex size-8 items-center justify-center rounded-full bg-black/60 text-white hover:bg-black/80 transition"
              title={tr.admin.form.removeCover}
            >
              ×
            </button>
          </>
        ) : (
          <button
            type="button"
            onClick={() => inputRef.current?.click()}
            disabled={uploading}
            className="flex h-full w-full flex-col items-center justify-center gap-2 bg-white/3 hover:bg-white/6 transition text-muted-foreground hover:text-foreground"
          >
            {uploading ? (
              <span className="font-mono text-xs">{tr.admin.form.uploading}</span>
            ) : (
              <>
                <span className="text-3xl">🖼</span>
                <span className="text-sm">{tr.admin.form.dragToUpload}</span>
                <span className="text-xs text-muted-foreground/70">
                  JPG · PNG · GIF · WebP · MP4 · WebM · max {ADMIN_MEDIA_MAX_UPLOAD_MB} MB
                </span>
              </>
            )}
          </button>
        )}
      </div>

      {value && !uploading && (
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          className="self-start text-xs text-primary underline underline-offset-4 hover:text-primary"
        >
          {tr.admin.form.replaceCover}
        </button>
      )}

      {error && <p className="text-xs text-red-400">{error}</p>}

      <input
        ref={inputRef}
        type="file"
        accept="image/*,video/mp4,video/webm,video/quicktime,video/ogg"
        className="hidden"
        onChange={onInputChange}
      />
    </div>
  );
}
