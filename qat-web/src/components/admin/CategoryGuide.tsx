"use client";

import type { ContentType } from "@/lib/data/content";
import { useTr } from "@/lib/i18n/context";

type CategoryGuideProps = {
  contentType: ContentType;
};

export function CategoryGuide({ contentType }: CategoryGuideProps) {
  const tr = useTr();
  const guide = tr.admin.form.categoryGuides[contentType];

  return (
    <div className="rounded-lg border border-accent/15 bg-accent/5 px-4 py-3 text-sm">
      <p className="font-semibold text-accent">{guide.label}</p>
      <p className="mt-1 text-foreground/70">{guide.hint}</p>
      {guide.extraFields && guide.extraFields.length > 0 ? (
        <ul className="mt-2 list-disc pl-4 text-xs text-muted-foreground space-y-0.5">
          {guide.extraFields.map((f) => (
            <li key={f}>{f}</li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}

