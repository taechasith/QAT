import { requireAdmin } from "@/components/admin/AdminGuard";
import { AdminShell } from "@/components/admin/AdminShell";
import { SendNotificationDialog } from "@/components/admin/SendNotificationDialog";
import { env } from "@/lib/env";

export default async function AdminNotificationsPage() {
  await requireAdmin();

  const configured = Boolean(env.resendApiKey && env.emailFrom);

  return (
    <AdminShell>
      <div>
        <p className="font-mono text-xs font-semibold uppercase tracking-[0.28em] text-violet-300">
          Admin CMS
        </p>
        <h1 className="mt-1 text-3xl font-semibold text-white">Notifications</h1>
        <p className="mt-2 text-sm text-slate-300">
          Send email updates to opted-in subscribers.
        </p>
      </div>

      {!configured ? (
        <div className="mt-8 rounded-xl border border-amber-400/20 bg-amber-400/10 p-5">
          <p className="font-semibold text-amber-200">Email not configured</p>
          <p className="mt-2 text-sm text-slate-300">
            Set <code className="font-mono text-amber-200">RESEND_API_KEY</code> and{" "}
            <code className="font-mono text-amber-200">EMAIL_FROM</code> in your{" "}
            <code className="font-mono text-amber-200">.env.local</code> to enable email
            notifications. Get a free API key at{" "}
            <span className="text-amber-200">resend.com</span>.
          </p>
        </div>
      ) : null}

      <div className="mt-8">
        <SendNotificationDialog />
      </div>
    </AdminShell>
  );
}
