"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { contentSchema, slugify, CONTENT_TYPES, CONTENT_STATUSES } from "@/lib/validation/content";
import type { ContentFormData } from "@/lib/validation/content";
import type { ContentType } from "@/lib/data/content";
import { CategoryGuide } from "./CategoryGuide";
import { ContentPreview } from "./ContentPreview";
import { CoverUpload } from "./CoverUpload";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { CalendarDays } from "lucide-react";
import { cn } from "@/lib/utils";
import { format } from "date-fns";

function parseLocalDate(dateStr: string | undefined | null): Date | undefined {
  if (!dateStr) return undefined;
  const justDate = dateStr.includes("T") ? dateStr.split("T")[0] : dateStr;
  const parts = justDate.split("-");
  if (parts.length === 3) {
    const year = parseInt(parts[0], 10);
    const month = parseInt(parts[1], 10) - 1;
    const day = parseInt(parts[2], 10);
    if (!isNaN(year) && !isNaN(month) && !isNaN(day)) {
      return new Date(year, month, day);
    }
  }
  const date = new Date(dateStr);
  return isNaN(date.getTime()) ? undefined : date;
}


type ContentEditorFormProps = {
  mode: "create" | "edit";
  itemId?: string;
  defaultValues?: Partial<ContentFormData>;
};

const CONTENT_TYPE_LABELS: Record<ContentType, string> = {
  event: "Event",
  project: "Project",
  game: "Game",
  course: "Course",
  exhibition: "Exhibition",
  research_article: "Research / Article",
  news: "News",
  talk: "Talk",
  experiment: "Experiment",
  video: "Video",
};

export function ContentEditorForm({
  mode,
  itemId,
  defaultValues,
}: ContentEditorFormProps) {
  const router = useRouter();
  const [serverError, setServerError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [lang, setLang] = useState<"en" | "th">("en");

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<ContentFormData>({
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    resolver: zodResolver(contentSchema as any),
    defaultValues: {
      status: "draft",
      sort_order: 0,
      content_type: "event",
      ...defaultValues,
    },
  });

  const watched = watch();
  const startAtDate = parseLocalDate(watched.start_at);
  const endAtDate = parseLocalDate(watched.end_at);

  function handleTitleChange(e: React.ChangeEvent<HTMLInputElement>) {
    if (mode === "create" && !watched.slug) {
      setValue("slug", slugify(e.target.value));
    }
  }

  async function onSubmit(values: ContentFormData) {
    setSubmitting(true);
    setServerError("");

    const endpoint = mode === "create" ? "/api/admin/content" : `/api/admin/content/${itemId}`;
    const method = mode === "create" ? "POST" : "PATCH";

    const res = await fetch(endpoint, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    });

    const json = await res.json().catch(() => ({}));

    if (!res.ok) {
      setServerError(json.error ?? "Save failed. Please try again.");
      setSubmitting(false);
      return;
    }

    if (mode === "create" && json.id) {
      router.push(`/admin/content/${json.id}/blocks`);
    } else {
      router.refresh();
    }
    setSubmitting(false);
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="grid gap-8 lg:grid-cols-[1fr_300px] xl:grid-cols-[1fr_360px]">
      <div className="flex flex-col gap-6">
        {/* Category */}
        <div className="flex flex-col gap-1.5">
          <label htmlFor="content_type" className="text-sm font-medium text-slate-200">
            Category
          </label>
          <select
            id="content_type"
            {...register("content_type")}
            className="w-full rounded-lg border border-white/15 bg-white/5 px-3 py-2.5 text-sm text-white focus:border-cyan-300/50 focus:outline-none focus:ring-2 focus:ring-cyan-300/30"
          >
            {CONTENT_TYPES.map((t) => (
              <option key={t} value={t} className="bg-slate-900">
                {CONTENT_TYPE_LABELS[t]}
              </option>
            ))}
          </select>
          {watched.content_type ? (
            <CategoryGuide contentType={watched.content_type} />
          ) : null}
        </div>

        {/* Language tabs */}
        <div className="flex items-center gap-2">
          <span className="text-xs font-medium text-slate-400">Language:</span>
          <div className="flex rounded-lg border border-white/15 bg-white/5 p-0.5">
            <button
              type="button"
              onClick={() => setLang("en")}
              className={`rounded-md px-3 py-1 text-xs font-medium transition ${
                lang === "en" ? "bg-cyan-300/15 text-cyan-200" : "text-slate-400 hover:text-slate-200"
              }`}
            >
              EN
            </button>
            <button
              type="button"
              onClick={() => setLang("th")}
              className={`flex items-center gap-1.5 rounded-md px-3 py-1 text-xs font-medium transition ${
                lang === "th" ? "bg-cyan-300/15 text-cyan-200" : "text-slate-400 hover:text-slate-200"
              }`}
            >
              TH
              {!watched.title_th && (
                <span className="rounded-full bg-amber-400/20 px-1.5 py-0.5 text-[10px] text-amber-300">recommended</span>
              )}
            </button>
          </div>
        </div>

        {/* Title + Slug — side by side on md+ */}
        <div className="grid gap-4 md:grid-cols-[1fr_220px]">
          <div className="flex flex-col gap-1.5">
            {lang === "en" ? (
              <>
                <label htmlFor="title" className="text-sm font-medium text-slate-200">
                  Title <span className="text-red-400">*</span>
                </label>
                <input
                  id="title"
                  type="text"
                  {...register("title", { onChange: handleTitleChange })}
                  placeholder="Enter a clear, descriptive title"
                  className="w-full rounded-lg border border-white/15 bg-white/5 px-3 py-2.5 text-sm text-white placeholder:text-slate-500 focus:border-cyan-300/50 focus:outline-none focus:ring-2 focus:ring-cyan-300/30"
                />
                {errors.title ? (
                  <p className="text-xs text-red-400">{errors.title.message}</p>
                ) : null}
              </>
            ) : (
              <>
                <label htmlFor="title_th" className="text-sm font-medium text-slate-200">
                  Title (Thai)
                  <span className="ml-2 text-xs font-normal text-amber-300">recommended</span>
                </label>
                <input
                  id="title_th"
                  type="text"
                  {...register("title_th")}
                  placeholder="ชื่อเนื้อหาภาษาไทย"
                  className="w-full rounded-lg border border-white/15 bg-white/5 px-3 py-2.5 text-sm text-white placeholder:text-slate-500 focus:border-cyan-300/50 focus:outline-none focus:ring-2 focus:ring-cyan-300/30"
                />
              </>
            )}
          </div>

          <div className="flex flex-col gap-1.5">
            <label htmlFor="slug" className="text-sm font-medium text-slate-200">
              Slug <span className="text-red-400">*</span>
            </label>
            <input
              id="slug"
              type="text"
              {...register("slug")}
              placeholder="url-friendly-slug"
              className="w-full rounded-lg border border-white/15 bg-white/5 px-3 py-2.5 font-mono text-sm text-white placeholder:text-slate-500 focus:border-cyan-300/50 focus:outline-none focus:ring-2 focus:ring-cyan-300/30"
            />
            {errors.slug ? (
              <p className="text-xs text-red-400">{errors.slug.message}</p>
            ) : null}
          </div>
        </div>

        {/* Excerpt */}
        <div className="flex flex-col gap-1.5">
          {lang === "en" ? (
            <>
              <label htmlFor="excerpt" className="text-sm font-medium text-slate-200">
                Excerpt
              </label>
              <textarea
                id="excerpt"
                rows={2}
                {...register("excerpt")}
                placeholder="Short summary shown on cards (max 500 chars)"
                className="w-full rounded-lg border border-white/15 bg-white/5 px-3 py-2.5 text-sm text-white placeholder:text-slate-500 focus:border-cyan-300/50 focus:outline-none focus:ring-2 focus:ring-cyan-300/30"
              />
            </>
          ) : (
            <>
              <label htmlFor="excerpt_th" className="text-sm font-medium text-slate-200">
                Excerpt (Thai)
                <span className="ml-2 text-xs font-normal text-amber-300">recommended</span>
              </label>
              <textarea
                id="excerpt_th"
                rows={2}
                {...register("excerpt_th")}
                placeholder="สรุปย่อภาษาไทย แสดงบนการ์ด"
                className="w-full rounded-lg border border-white/15 bg-white/5 px-3 py-2.5 text-sm text-white placeholder:text-slate-500 focus:border-cyan-300/50 focus:outline-none focus:ring-2 focus:ring-cyan-300/30"
              />
            </>
          )}
        </div>

        {/* Cover — 16:9 direct upload */}
        <CoverUpload
          value={watched.cover_image_url ?? ""}
          onChange={(url) => setValue("cover_image_url", url)}
        />


        {/* External URL */}
        <div className="flex flex-col gap-1.5">
          <label htmlFor="external_url" className="text-sm font-medium text-slate-200">
            External URL
          </label>
          <input
            id="external_url"
            type="text"
            {...register("external_url")}
            placeholder="https://… if content lives elsewhere"
            className="w-full rounded-lg border border-white/15 bg-white/5 px-3 py-2.5 text-sm text-white placeholder:text-slate-500 focus:border-cyan-300/50 focus:outline-none focus:ring-2 focus:ring-cyan-300/30"
          />
        </div>

        {/* Location + dates */}
        <div className="grid gap-4 sm:grid-cols-3">
          <div className="flex flex-col gap-1.5">
            <label htmlFor="location" className="text-sm font-medium text-slate-200">
              Location
            </label>
            <input
              id="location"
              type="text"
              {...register("location")}
              placeholder="Venue or city"
              className="w-full rounded-lg border border-white/15 bg-white/5 px-3 py-2.5 text-sm text-white placeholder:text-slate-500 focus:border-cyan-300/50 focus:outline-none focus:ring-2 focus:ring-cyan-300/30"
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-slate-200">
              Start date
            </label>
            <input type="hidden" {...register("start_at")} />
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  type="button"
                  variant="outline"
                  className={cn(
                    "w-full justify-start text-left font-normal border-white/15 bg-white/5 hover:bg-white/10 hover:text-white px-3 py-2.5 text-sm h-10 rounded-lg focus:border-cyan-300/50 focus:outline-none focus:ring-2 focus:ring-cyan-300/30",
                    watched.start_at ? "text-white" : "text-slate-500"
                  )}
                >
                  <CalendarDays className="mr-2 h-4 w-4 text-white" />
                  {startAtDate ? (
                    format(startAtDate, "yyyy-MM-dd")
                  ) : (
                    <span>yyyy-mm-dd</span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0 border-white/10 bg-slate-950" align="start">
                <Calendar
                  mode="single"
                  selected={startAtDate}
                  onSelect={(date) => {
                    setValue(
                      "start_at",
                      date ? format(date, "yyyy-MM-dd") : ""
                    );
                  }}
                />
              </PopoverContent>
            </Popover>
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-slate-200">
              End date
            </label>
            <input type="hidden" {...register("end_at")} />
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  type="button"
                  variant="outline"
                  className={cn(
                    "w-full justify-start text-left font-normal border-white/15 bg-white/5 hover:bg-white/10 hover:text-white px-3 py-2.5 text-sm h-10 rounded-lg focus:border-cyan-300/50 focus:outline-none focus:ring-2 focus:ring-cyan-300/30",
                    watched.end_at ? "text-white" : "text-slate-500"
                  )}
                >
                  <CalendarDays className="mr-2 h-4 w-4 text-white" />
                  {endAtDate ? (
                    format(endAtDate, "yyyy-MM-dd")
                  ) : (
                    <span>yyyy-mm-dd</span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0 border-white/10 bg-slate-950" align="start">
                <Calendar
                  mode="single"
                  selected={endAtDate}
                  onSelect={(date) => {
                    setValue(
                      "end_at",
                      date ? format(date, "yyyy-MM-dd") : ""
                    );
                  }}
                />
              </PopoverContent>
            </Popover>
          </div>
        </div>

        {serverError ? (
          <p className="rounded-lg border border-red-400/20 bg-red-400/10 px-3 py-2 text-sm text-red-300">
            {serverError}
          </p>
        ) : null}
      </div>

      {/* Sidebar */}
      <div className="flex flex-col gap-4">
        <ContentPreview values={watched} />

        <div className="glass-panel rounded-xl p-5 flex flex-col gap-4">
          <div className="flex flex-col gap-1.5">
            <label htmlFor="status" className="text-sm font-medium text-slate-200">
              Status
            </label>
            <select
              id="status"
              {...register("status")}
              className="w-full rounded-lg border border-white/15 bg-white/5 px-3 py-2.5 text-sm text-white focus:border-cyan-300/50 focus:outline-none focus:ring-2 focus:ring-cyan-300/30"
            >
              {CONTENT_STATUSES.map((s) => (
                <option key={s} value={s} className="bg-slate-900 capitalize">
                  {s.charAt(0).toUpperCase() + s.slice(1)}
                </option>
              ))}
            </select>
            <p className="text-xs text-slate-400">
              Only published content is visible to the public.
            </p>
          </div>

          <div className="flex flex-col gap-1.5">
            <label htmlFor="sort_order" className="text-sm font-medium text-slate-200">
              Sort order
            </label>
            <input
              id="sort_order"
              type="number"
              {...register("sort_order", { valueAsNumber: true })}
              className="w-full rounded-lg border border-white/15 bg-white/5 px-3 py-2.5 text-sm text-white focus:border-cyan-300/50 focus:outline-none focus:ring-2 focus:ring-cyan-300/30"
            />
            <p className="text-xs text-slate-400">Lower numbers appear first.</p>
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="mt-2 inline-flex h-10 w-full items-center justify-center rounded-lg bg-cyan-200 text-sm font-semibold text-slate-950 transition hover:bg-cyan-100 disabled:opacity-50"
          >
            {submitting
              ? "Saving…"
              : mode === "create"
                ? "Create content"
                : "Save changes"}
          </button>
        </div>
      </div>
    </form>
  );
}
