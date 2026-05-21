"use client";

import type { ContentFormData } from "@/lib/validation/content";
import { useTr } from "@/lib/i18n/context";
import { isVideoUrl } from "@/lib/media";

type ContentPreviewProps = {
  values: Partial<ContentFormData>;
};

export function ContentPreview({ values }: ContentPreviewProps) {
  const tr = useTr();

  const statusKey = values.status as "draft" | "published" | "archived" | undefined;
  const statusLabel = statusKey ? (tr.admin.form[statusKey] || statusKey) : tr.admin.form.draft;
  const englishCover = values.cover_image_url;
  const thaiCover = values.cover_image_url_th || values.cover_image_url;

  const previewCards = [
    {
      locale: "EN",
      accent: "text-cyan-200",
      cover: englishCover,
      title: values.title || tr.admin.form.untitled,
      excerpt: values.excerpt,
    },
    {
      locale: "TH",
      accent: "text-amber-300",
      cover: thaiCover,
      title: values.title_th || values.title || tr.admin.form.untitled,
      excerpt: values.excerpt_th || values.excerpt,
    },
  ];

  return (
    <div className="glass-panel rounded-xl p-5">
      <p className="font-mono text-xs uppercase tracking-widest text-slate-400">
        {tr.admin.form.preview}
      </p>
      <div className="mt-3 grid gap-4">
        {previewCards.map((card) => (
          <div key={card.locale} className="rounded-lg border border-white/10 bg-white/[0.03] p-3">
            <p className={`font-mono text-xs font-semibold uppercase tracking-widest ${card.accent}`}>
              {card.locale} user mode
            </p>
            {card.cover ? (
              <div className="mt-2 aspect-video overflow-hidden rounded-md border border-white/10 bg-black/30">
                {isVideoUrl(card.cover) ? (
                  <video
                    src={card.cover}
                    autoPlay
                    loop
                    muted
                    playsInline
                    preload="metadata"
                    className="h-full w-full object-cover"
                  />
                ) : (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={card.cover}
                    alt=""
                    className="h-full w-full object-cover"
                  />
                )}
              </div>
            ) : (
              <div className="mt-2 flex aspect-video items-center justify-center rounded-md border border-white/10 bg-white/5">
                <p className="text-xs text-slate-500">{tr.admin.form.noCoverImage}</p>
              </div>
            )}
            <div className="mt-3">
              {values.content_type ? (
                <p className="font-mono text-xs uppercase tracking-widest text-slate-400">
                  {values.content_type.replace("_", " ")}
                </p>
              ) : null}
              <h2 className="mt-1 text-lg font-semibold text-white">
                {card.title}
              </h2>
              {card.excerpt ? (
                <p className="mt-2 text-sm leading-6 text-slate-300">{card.excerpt}</p>
              ) : null}
            </div>
          </div>
        ))}
      </div>
      <div className="mt-4">
        <div>
          <p
            className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
              values.status === "published"
                ? "bg-green-400/15 text-green-300"
                : values.status === "archived"
                  ? "bg-slate-400/15 text-slate-300"
                  : "bg-amber-400/15 text-amber-300"
            }`}
          >
            {statusLabel}
          </p>
        </div>
      </div>
    </div>
  );
}
