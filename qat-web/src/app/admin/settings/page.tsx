import Link from "next/link";
import { FileText, LayoutTemplate, Plus } from "lucide-react";
import { requireAdmin } from "@/components/admin/AdminGuard";
import { AdminShell } from "@/components/admin/AdminShell";
import { SiteOgForm } from "@/components/admin/SiteOgForm";
import { HomepageSettingsForm } from "@/components/admin/HomepageSettingsForm";
import { getOgSettings, getHomepageSettings } from "@/lib/data/site-settings";
import { getTranslations } from "@/lib/i18n/locale";

export default async function AdminSettingsPage() {
  await requireAdmin();

  const [og, homepage] = await Promise.all([getOgSettings(), getHomepageSettings()]);
  const tr = await getTranslations();

  return (
    <AdminShell>
      <div>
        <p className="font-mono text-xs font-semibold uppercase tracking-[0.28em] text-accent">
          {tr.admin.title}
        </p>
        <h1 className="mt-1 text-3xl font-semibold text-white">
          {tr.admin.settings.title}
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          {tr.admin.settings.subtitle}
        </p>
      </div>

      <section className="mt-8 glass-panel rounded-xl p-6">
        <div className="flex flex-col gap-4 xl:flex-row xl:items-start xl:justify-between">
          <div>
            <h2 className="text-base font-semibold text-white">
              Content controls
            </h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Manage every content item, create new pages, and edit visual page layouts.
            </p>
          </div>
          <div className="grid gap-2 sm:grid-cols-3">
            <Link
              href="/admin/content"
              className="inline-flex h-10 items-center justify-center gap-2 rounded-lg border border-white/15 px-4 text-sm font-semibold text-foreground/85 transition hover:bg-white/8 hover:text-white"
            >
              <FileText className="size-4" aria-hidden="true" />
              All content
            </Link>
            <Link
              href="/admin/content/new"
              className="inline-flex h-10 items-center justify-center gap-2 rounded-lg bg-primary px-4 text-sm font-semibold text-slate-950 transition hover:bg-primary/90"
            >
              <Plus className="size-4" aria-hidden="true" />
              New content
            </Link>
            <Link
              href="/admin/layout"
              className="inline-flex h-10 items-center justify-center gap-2 rounded-lg border border-accent/35 px-4 text-sm font-semibold text-accent transition hover:bg-accent/10"
            >
              <LayoutTemplate className="size-4" aria-hidden="true" />
              Layouts
            </Link>
          </div>
        </div>
      </section>

      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        <section className="glass-panel rounded-xl p-6">
          <h2 className="text-base font-semibold text-white">
            {tr.admin.settings.socialSharing}
          </h2>
          <p className="mt-1 mb-5 text-sm text-muted-foreground">
            {tr.admin.settings.socialSharingDesc}
          </p>
          <SiteOgForm initial={og} />
        </section>

        <section className="glass-panel rounded-xl p-6">
          <h2 className="text-base font-semibold text-white">
            {tr.admin.settings.homepageTitle}
          </h2>
          <p className="mt-1 mb-5 text-sm text-muted-foreground">
            {tr.admin.settings.homepageDesc}
          </p>
          <HomepageSettingsForm initial={homepage} />
        </section>
      </div>

      <section className="mt-6 glass-panel rounded-xl p-6">
        <h2 className="text-base font-semibold text-white">
          {tr.admin.settings.adminAccess}
        </h2>
        <p className="mt-2 text-sm text-muted-foreground">
          {tr.admin.settings.adminAccessDesc}
        </p>
      </section>
    </AdminShell>
  );
}
