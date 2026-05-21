import { requireAdmin } from "@/components/admin/AdminGuard";
import { AdminShell } from "@/components/admin/AdminShell";
import { SiteOgForm } from "@/components/admin/SiteOgForm";
import { HomepageSettingsForm } from "@/components/admin/HomepageSettingsForm";
import { getOgSettings, getHomepageSettings } from "@/lib/data/site-settings";

export default async function AdminSettingsPage() {
  await requireAdmin();

  const [og, homepage] = await Promise.all([getOgSettings(), getHomepageSettings()]);

  return (
    <AdminShell>
      <div>
        <p className="font-mono text-xs font-semibold uppercase tracking-[0.28em] text-violet-300">
          Admin
        </p>
        <h1 className="mt-1 text-3xl font-semibold text-white">Settings</h1>
        <p className="mt-2 text-sm text-slate-400">Site-wide configuration.</p>
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-2">

        {/* OG / Social sharing */}
        <section className="glass-panel rounded-xl p-6">
          <h2 className="text-base font-semibold text-white">Social sharing</h2>
          <p className="mt-1 mb-5 text-sm text-slate-400">
            Default image and description used when pages are shared on social media or messaging apps.
            Individual content pages use their own cover image and excerpt when available.
          </p>
          <SiteOgForm initial={og} />
        </section>

        {/* Homepage */}
        <section className="glass-panel rounded-xl p-6">
          <h2 className="text-base font-semibold text-white">Home page</h2>
          <p className="mt-1 mb-5 text-sm text-slate-400">
            Controls the featured section heading and the message shown when no content is published yet.
          </p>
          <HomepageSettingsForm initial={homepage} />
        </section>

      </div>

      {/* Admin access info */}
      <section className="mt-6 glass-panel rounded-xl p-6">
        <h2 className="text-base font-semibold text-white">Admin access</h2>
        <p className="mt-2 text-sm text-slate-400">
          Admin access is controlled via the{" "}
          <code className="font-mono text-violet-300">ADMIN_EMAILS</code> environment variable
          and the <code className="font-mono text-violet-300">admin_emails</code> table in
          Supabase. To add an admin, insert their email into that table via the Supabase SQL Editor.
        </p>
      </section>
    </AdminShell>
  );
}
