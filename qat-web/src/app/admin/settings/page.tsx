import { requireAdmin } from "@/components/admin/AdminGuard";
import { AdminShell } from "@/components/admin/AdminShell";

export default async function AdminSettingsPage() {
  await requireAdmin();

  return (
    <AdminShell>
      <div>
        <p className="font-mono text-xs font-semibold uppercase tracking-[0.28em] text-violet-300">
          Admin CMS
        </p>
        <h1 className="mt-1 text-3xl font-semibold text-white">Settings</h1>
        <p className="mt-2 text-sm text-slate-300">
          Site-wide configuration. More options will appear here as the CMS grows.
        </p>
      </div>

      <div className="mt-8 glass-panel rounded-xl p-6">
        <h2 className="text-lg font-semibold text-white">Admin emails</h2>
        <p className="mt-2 text-sm text-slate-300">
          Admin access is controlled via the{" "}
          <code className="font-mono text-violet-300">ADMIN_EMAILS</code> environment variable
          and the <code className="font-mono text-violet-300">admin_emails</code> table in
          Supabase. To add an admin, insert their email into that table via the Supabase SQL
          Editor.
        </p>
      </div>
    </AdminShell>
  );
}
