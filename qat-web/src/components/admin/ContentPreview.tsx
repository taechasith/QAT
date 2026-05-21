"use client";

import type { ContentFormData } from "@/lib/validation/content";
import { useTr } from "@/lib/i18n/context";

type ContentPreviewProps = {
  values: Partial<ContentFormData>;
};

export function ContentPreview({ values }: ContentPreviewProps) {
  const tr = useTr();

  const statusKey = values.status as "draft" | "published" | "archived" | undefined;
  const statusLabel = statusKey ? (tr.admin.form[statusKey] || statusKey) : tr.admin.form.draft;

  return (
    <div className="glass-panel rounded-xl p-5">
      <p className="font-mono text-xs uppercase tracking-widest text-slate-400">
        {tr.admin.form.preview}
      </p>
      {values.cover_image_url ? (
        <div className="mt-3 aspect-video overflow-hidden rounded-lg border border-white/10 bg-black/30">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={values.cover_image_url}
            alt=""
            className="h-full w-full object-cover"
          />
        </div>
      ) : (
        <div className="mt-3 flex aspect-video items-center justify-center rounded-lg border border-white/10 bg-white/5">
          <p className="text-xs text-slate-500">{tr.admin.form.noCoverImage}</p>
        </div>
      )}
      <div className="mt-4">
        {values.content_type ? (
          <p className="font-mono text-xs uppercase tracking-widest text-cyan-200">
            {values.content_type.replace("_", " ")}
          </p>
        ) : null}
        <h2 className="mt-2 text-xl font-semibold text-white">
          {values.title || tr.admin.form.untitled}
        </h2>
        {values.excerpt ? (
          <p className="mt-2 text-sm leading-6 text-slate-300">{values.excerpt}</p>
        ) : null}
        <p
          className={`mt-3 inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
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
  );
}

