import type { ContentFormData } from "@/lib/validation/content";

type ContentPreviewProps = {
  values: Partial<ContentFormData>;
};

export function ContentPreview({ values }: ContentPreviewProps) {
  return (
    <div className="glass-panel rounded-xl p-5">
      <p className="font-mono text-xs uppercase tracking-widest text-slate-400">
        Preview
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
          <p className="text-xs text-slate-500">No cover image</p>
        </div>
      )}
      <div className="mt-4">
        {values.content_type ? (
          <p className="font-mono text-xs uppercase tracking-widest text-cyan-200">
            {values.content_type.replace("_", " ")}
          </p>
        ) : null}
        <h2 className="mt-2 text-xl font-semibold text-white">
          {values.title || "Untitled"}
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
          {values.status ?? "draft"}
        </p>
      </div>
    </div>
  );
}
