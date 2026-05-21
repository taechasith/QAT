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
        <p className="font-mono text-xs font-semibold uppercase tracking-[0.28em] text-violet-300">
          {tr.admin.title}
        </p>
        <h1 className="mt-1 text-3xl font-semibold text-white">
          {tr.admin.settings.title}
        </h1>
        <p className="mt-2 text-sm text-slate-400">
          {tr.admin.settings.subtitle}
        </p>
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-2">

        {/* OG / Social sharing */}
        <section className="glass-panel rounded-xl p-6">
          <h2 className="text-base font-semibold text-white">
            {tr.admin.settings.socialSharing}
          </h2>
          <p className="mt-1 mb-5 text-sm text-slate-400">
            {tr.admin.settings.socialSharingDesc}
          </p>
          <SiteOgForm initial={og} />
        </section>

        {/* Homepage */}
        <section className="glass-panel rounded-xl p-6">
          <h2 className="text-base font-semibold text-white">
            {tr.admin.settings.homepageTitle}
          </h2>
          <p className="mt-1 mb-5 text-sm text-slate-400">
            {tr.admin.settings.homepageDesc}
          </p>
          <HomepageSettingsForm initial={homepage} />
        </section>

      </div>

      {/* Admin access info */}
      <section className="mt-6 glass-panel rounded-xl p-6">
        <h2 className="text-base font-semibold text-white">
          {tr.admin.settings.adminAccess}
        </h2>
        <p className="mt-2 text-sm text-slate-400">
          {tr.admin.settings.adminAccessDesc}
        </p>
      </section>
    </AdminShell>
  );
}

