"use client";

import { useEffect, useState } from "react";
import type { ChangeEvent, ChangeEventHandler } from "react";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CalendarDays } from "lucide-react";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { useTr, useLocale } from "@/lib/i18n/context";

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

function handleCalendarDropdownChange(
  value: string | number,
  onChange: ChangeEventHandler<HTMLSelectElement>,
) {
  const event = {
    target: {
      value: String(value),
    },
  } as ChangeEvent<HTMLSelectElement>;
  onChange(event);
}

type AdminDatePickerProps = {
  value: Date | undefined;
  onChange: (value: string) => void;
};

function AdminDatePicker({ value, onChange }: AdminDatePickerProps) {
  const [month, setMonth] = useState<Date>(value ?? new Date());

  useEffect(() => {
    if (value) {
      setMonth(value);
    }
  }, [value]);

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          type="button"
          variant="outline"
          className={cn(
            "w-full justify-start text-left font-normal border-white/15 bg-white/5 hover:bg-white/10 hover:text-white px-3 py-2.5 text-sm h-10 rounded-lg focus:border-primary/50 focus:outline-none focus:ring-2 focus:ring-primary/30",
            value ? "text-white" : "text-muted-foreground/70",
          )}
        >
          <CalendarDays className="mr-2 h-4 w-4 text-white" />
          {value ? format(value, "yyyy-MM-dd") : <span>yyyy-mm-dd</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0 border-white/10 bg-background" align="start">
        <Calendar
          captionLayout="dropdown"
          components={{
            MonthCaption: (props) => <>{props.children}</>,
            DropdownNav: (props) => (
              <div className="flex w-full items-center gap-2 px-1">{props.children}</div>
            ),
            Dropdown: (props) => (
              <Select
                onValueChange={(selectedValue) => {
                  if (props.onChange) {
                    handleCalendarDropdownChange(selectedValue, props.onChange);
                  }
                }}
                value={String(props.value)}
              >
                <SelectTrigger className="h-9 min-w-28 flex-1 border-white/15 bg-white/5 text-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="border-white/10 bg-slate-950 text-white">
                  {props.options?.map((option) => (
                    <SelectItem
                      disabled={option.disabled}
                      key={option.value}
                      value={String(option.value)}
                    >
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            ),
          }}
          hideNavigation
          mode="single"
          month={month}
          onMonthChange={setMonth}
          selected={value}
          onSelect={(date) => {
            onChange(date ? format(date, "yyyy-MM-dd") : "");
          }}
        />
      </PopoverContent>
    </Popover>
  );
}

export function ContentEditorForm({
  mode,
  itemId,
  defaultValues,
}: ContentEditorFormProps) {
  const tr = useTr();
  const locale = useLocale();
  const router = useRouter();
  const [serverError, setServerError] = useState("");
  const [submitting, setSubmitting] = useState(false);

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
      setServerError(json.error ?? (locale === "th" ? "บันทึกไม่สำเร็จ กรุณาลองใหม่อีกครั้ง" : "Save failed. Please try again."));
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
      <div className="flex flex-col gap-5">

        {/* Section 1 — Identity */}
        <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4 flex flex-col gap-4">
          <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-muted-foreground/70">
            1 · Identity
          </p>
          <div className="flex flex-col gap-1.5">
            <label htmlFor="content_type" className="text-sm font-medium text-foreground/85">
              {tr.admin.form.category}
            </label>
            <select
              id="content_type"
              {...register("content_type")}
              className="w-full rounded-lg border border-white/15 bg-white/5 px-3 py-2.5 text-sm text-white focus:border-primary/50 focus:outline-none focus:ring-2 focus:ring-primary/30"
            >
              {CONTENT_TYPES.map((t) => (
                <option key={t} value={t} className="bg-slate-900">
                  {tr.admin.form.categoryGuides[t]?.label || CONTENT_TYPE_LABELS[t]}
                </option>
              ))}
            </select>
            {watched.content_type ? (
              <CategoryGuide contentType={watched.content_type} />
            ) : null}
          </div>
          <div className="flex flex-col gap-1.5">
            <label htmlFor="slug" className="text-sm font-medium text-foreground/85">
              {tr.admin.form.slug} <span className="text-red-400">*</span>
            </label>
            <input
              id="slug"
              type="text"
              {...register("slug")}
              placeholder={tr.admin.form.slugPlaceholder}
              className="w-full rounded-lg border border-white/15 bg-white/5 px-3 py-2.5 font-mono text-sm text-white placeholder:text-muted-foreground/70 focus:border-primary/50 focus:outline-none focus:ring-2 focus:ring-primary/30"
            />
            {errors.slug ? (
              <p className="text-xs text-red-400">
                {errors.slug.message === "Slug is required"
                  ? tr.admin.form.slugRequired
                  : errors.slug.message === "Slug must be lowercase letters, numbers, and hyphens"
                    ? (locale === "th" ? "สลักลิงก์ต้องประกอบด้วยตัวอักษรภาษาอังกฤษตัวเล็ก ตัวเลข และเครื่องหมายขีดกลางเท่านั้น" : errors.slug.message)
                    : errors.slug.message}
              </p>
            ) : null}
          </div>
        </div>

        {/* Section 2 — Content (bilingual title + excerpt + body) */}
        <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4 flex flex-col gap-5">
          <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-muted-foreground/70">
            2 · Content — at least one language required
          </p>

          {/* Title + Excerpt EN / TH */}
          <div className="grid gap-4 xl:grid-cols-2">
            <div className="flex flex-col gap-3 rounded-lg border border-white/10 bg-white/[0.03] p-4">
              <div className="flex items-center gap-2">
                <span className="text-xs font-semibold uppercase tracking-wider text-primary">EN</span>
                <span className="text-[10px] text-muted-foreground">required if TH empty</span>
              </div>
              <div className="flex flex-col gap-1.5">
                <label htmlFor="title" className="text-xs font-medium text-foreground/70">
                  {tr.admin.form.title}
                </label>
                <input
                  id="title"
                  type="text"
                  {...register("title", { onChange: handleTitleChange })}
                  placeholder={tr.admin.form.titlePlaceholder}
                  className="w-full rounded-lg border border-white/15 bg-white/5 px-3 py-2 text-sm text-white placeholder:text-muted-foreground/70 focus:border-primary/50 focus:outline-none focus:ring-2 focus:ring-primary/30"
                />
                {errors.title ? (
                  <p className="text-xs text-red-400">
                    {errors.title.message === "Title is required" ? tr.admin.form.titleRequired : errors.title.message}
                  </p>
                ) : null}
              </div>
              <div className="flex flex-col gap-1.5">
                <label htmlFor="excerpt" className="text-xs font-medium text-foreground/70">
                  {tr.admin.form.excerpt}
                </label>
                <textarea
                  id="excerpt"
                  rows={3}
                  {...register("excerpt")}
                  placeholder={tr.admin.form.excerptPlaceholder}
                  className="w-full rounded-lg border border-white/15 bg-white/5 px-3 py-2 text-sm text-white placeholder:text-muted-foreground/70 focus:border-primary/50 focus:outline-none focus:ring-2 focus:ring-primary/30"
                />
              </div>
            </div>

            <div className={`flex flex-col gap-3 rounded-lg border p-4 transition ${
              watched.title_th
                ? "border-amber-400/30 bg-amber-400/5"
                : "border-dashed border-white/10 bg-white/[0.03]"
            }`}>
              <div className="flex items-center gap-2">
                <span className="text-xs font-semibold uppercase tracking-wider text-amber-300">TH</span>
                {!watched.title_th ? (
                  <span className="text-[10px] text-muted-foreground">required if EN empty · แนะนำ</span>
                ) : (
                  <span className="text-[10px] text-emerald-400">✓ filled</span>
                )}
              </div>
              <div className="flex flex-col gap-1.5">
                <label htmlFor="title_th" className="text-xs font-medium text-foreground/70">
                  ชื่อหัวข้อ (Thai title)
                </label>
                <input
                  id="title_th"
                  type="text"
                  {...register("title_th")}
                  placeholder="ชื่อเนื้อหาภาษาไทย"
                  className="w-full rounded-lg border border-white/15 bg-white/5 px-3 py-2 text-sm text-white placeholder:text-muted-foreground/70 focus:border-amber-300/50 focus:outline-none focus:ring-2 focus:ring-amber-300/20"
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <label htmlFor="excerpt_th" className="text-xs font-medium text-foreground/70">
                  คำโปรยสั้น (Thai excerpt)
                </label>
                <textarea
                  id="excerpt_th"
                  rows={3}
                  {...register("excerpt_th")}
                  placeholder="สรุปย่อภาษาไทย สำหรับแสดงบนการ์ด"
                  className="w-full rounded-lg border border-white/15 bg-white/5 px-3 py-2 text-sm text-white placeholder:text-muted-foreground/70 focus:border-amber-300/50 focus:outline-none focus:ring-2 focus:ring-amber-300/20"
                />
              </div>
            </div>
          </div>

          {/* Body EN / TH */}
          <div className="grid gap-4 xl:grid-cols-2">
            <div className="flex flex-col gap-1.5 rounded-lg border border-white/10 bg-white/[0.03] p-4">
              <div className="flex items-center gap-2">
                <span className="text-xs font-semibold uppercase tracking-wider text-primary">EN</span>
                <span className="text-[10px] text-muted-foreground">body · Markdown supported</span>
              </div>
              <textarea
                rows={8}
                {...register("body_md")}
                placeholder="Body text (Markdown supported)"
                className="w-full rounded-lg border border-white/15 bg-white/5 px-3 py-2 font-mono text-sm text-white placeholder:text-muted-foreground/70 focus:border-primary/50 focus:outline-none focus:ring-2 focus:ring-primary/30"
              />
            </div>

            <div className={`flex flex-col gap-1.5 rounded-lg border p-4 transition ${
              watched.body_md_th
                ? "border-amber-400/30 bg-amber-400/5"
                : "border-dashed border-white/10 bg-white/[0.03]"
            }`}>
              <div className="flex items-center gap-2">
                <span className="text-xs font-semibold uppercase tracking-wider text-amber-300">TH</span>
                {!watched.body_md_th ? (
                  <span className="text-[10px] text-muted-foreground">เนื้อหาภาษาไทย · แนะนำ</span>
                ) : (
                  <span className="text-[10px] text-emerald-400">✓ filled</span>
                )}
              </div>
              <textarea
                rows={8}
                {...register("body_md_th")}
                placeholder="เนื้อหาภาษาไทย (รองรับ Markdown)"
                className="w-full rounded-lg border border-white/15 bg-white/5 px-3 py-2 font-mono text-sm text-white placeholder:text-muted-foreground/70 focus:border-amber-300/50 focus:outline-none focus:ring-2 focus:ring-amber-300/20"
              />
            </div>
          </div>

          {watched.status === "published" && !watched.title_th && (
            <p className="rounded-lg border border-amber-400/20 bg-amber-400/10 px-3 py-2 text-xs text-amber-300">
              Thai version is empty — Thai-language users will see the English version as fallback.
            </p>
          )}
        </div>

        {/* Section 3 — Cover image */}
        <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4 flex flex-col gap-4">
          <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-muted-foreground/70">
            3 · Cover image
          </p>
          <div className="grid gap-4 xl:grid-cols-2">
            <div className="flex flex-col gap-1.5">
              <span className="text-xs font-semibold uppercase tracking-wider text-primary">EN</span>
              <CoverUpload
                value={watched.cover_image_url ?? ""}
                onChange={(url) => setValue("cover_image_url", url)}
                label=""
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <div className="flex items-center gap-2">
                <span className="text-xs font-semibold uppercase tracking-wider text-amber-300">TH</span>
                {!watched.cover_image_url_th && (
                  <span className="text-[10px] text-muted-foreground">ใช้รูป EN ถ้าไม่ได้ตั้งค่า</span>
                )}
              </div>
              <CoverUpload
                value={watched.cover_image_url_th ?? ""}
                onChange={(url) => setValue("cover_image_url_th", url)}
                label=""
              />
            </div>
          </div>
        </div>

        {/* Section 4 — Event details */}
        <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4 flex flex-col gap-4">
          <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-muted-foreground/70">
            4 · Details
          </p>
          <div className="flex flex-col gap-1.5">
            <label htmlFor="external_url" className="text-sm font-medium text-foreground/85">
              {tr.admin.form.externalUrl}
            </label>
            <input
              id="external_url"
              type="text"
              {...register("external_url")}
              placeholder={tr.admin.form.externalUrlPlaceholder}
              className="w-full rounded-lg border border-white/15 bg-white/5 px-3 py-2.5 text-sm text-white placeholder:text-muted-foreground/70 focus:border-primary/50 focus:outline-none focus:ring-2 focus:ring-primary/30"
            />
          </div>
          <div className="grid gap-4 sm:grid-cols-3">
            <div className="flex flex-col gap-1.5">
              <label htmlFor="location" className="text-sm font-medium text-foreground/85">
                {tr.admin.form.location}
              </label>
              <input
                id="location"
                type="text"
                {...register("location")}
                placeholder={tr.admin.form.locationPlaceholder}
                className="w-full rounded-lg border border-white/15 bg-white/5 px-3 py-2.5 text-sm text-white placeholder:text-muted-foreground/70 focus:border-primary/50 focus:outline-none focus:ring-2 focus:ring-primary/30"
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium text-foreground/85">
                {tr.admin.form.startDate}
              </label>
              <input type="hidden" {...register("start_at")} />
              <AdminDatePicker
                value={startAtDate}
                onChange={(date) => setValue("start_at", date)}
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium text-foreground/85">
                {tr.admin.form.endDate}
              </label>
              <input type="hidden" {...register("end_at")} />
              <AdminDatePicker
                value={endAtDate}
                onChange={(date) => setValue("end_at", date)}
              />
            </div>
          </div>
        </div>

        {/* Section 5 — Author */}
        <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4 flex flex-col gap-4">
          <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-muted-foreground/70">
            5 · Author — overrides account name
          </p>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="flex flex-col gap-1.5">
              <label htmlFor="author_name" className="text-xs font-medium text-foreground/70">
                Display name
              </label>
              <input
                id="author_name"
                type="text"
                {...register("author_name")}
                placeholder="Leave blank to use account name"
                className="w-full rounded-lg border border-white/15 bg-white/5 px-3 py-2 text-sm text-white placeholder:text-muted-foreground/70 focus:border-primary/50 focus:outline-none focus:ring-2 focus:ring-primary/30"
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label htmlFor="author_bio" className="text-xs font-medium text-foreground/70">
                Bio <span className="text-muted-foreground/70">(optional)</span>
              </label>
              <textarea
                id="author_bio"
                rows={2}
                {...register("author_bio")}
                placeholder="Short bio shown on this content…"
                className="w-full rounded-lg border border-white/15 bg-white/5 px-3 py-2 text-sm text-white placeholder:text-muted-foreground/70 focus:border-primary/50 focus:outline-none focus:ring-2 focus:ring-primary/30"
              />
            </div>
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
            <label htmlFor="status" className="text-sm font-medium text-foreground/85">
              {tr.admin.form.status}
            </label>
            <select
              id="status"
              {...register("status")}
              className="w-full rounded-lg border border-white/15 bg-white/5 px-3 py-2.5 text-sm text-white focus:border-primary/50 focus:outline-none focus:ring-2 focus:ring-primary/30"
            >
              {CONTENT_STATUSES.map((s) => {
                const label = s === "draft"
                  ? tr.admin.form.draft
                  : s === "published"
                    ? tr.admin.form.published
                    : s === "archived"
                      ? tr.admin.form.archived
                      : s;
                return (
                  <option key={s} value={s} className="bg-slate-900 capitalize">
                    {label}
                  </option>
                );
              })}
            </select>
            <p className="text-xs text-muted-foreground">
              {tr.admin.form.statusDesc}
            </p>
          </div>

          <div className="flex flex-col gap-1.5">
            <label htmlFor="sort_order" className="text-sm font-medium text-foreground/85">
              {tr.admin.form.sortOrder}
            </label>
            <input
              id="sort_order"
              type="number"
              {...register("sort_order", { valueAsNumber: true })}
              className="w-full rounded-lg border border-white/15 bg-white/5 px-3 py-2.5 text-sm text-white focus:border-primary/50 focus:outline-none focus:ring-2 focus:ring-primary/30"
            />
            <p className="text-xs text-muted-foreground">
              {tr.admin.form.sortOrderDesc}
            </p>
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="mt-2 inline-flex h-11 w-full items-center justify-center rounded-lg bg-primary text-sm font-semibold text-slate-950 transition hover:bg-primary/90 disabled:opacity-50 cursor-pointer"
          >
            {submitting
              ? tr.admin.editContent.saving
              : mode === "create"
                ? tr.admin.form.createContent
                : tr.admin.form.saveChanges}
          </button>
        </div>
      </div>
    </form>
  );
}
