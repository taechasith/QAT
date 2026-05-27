import { requireAdmin } from "@/components/admin/AdminGuard";
import { AdminShell } from "@/components/admin/AdminShell";
import { SendNotificationDialog } from "@/components/admin/SendNotificationDialog";
import { env } from "@/lib/env";
import { getTranslations } from "@/lib/i18n/locale";

export default async function AdminNotificationsPage() {
  await requireAdmin();
  const tr = await getTranslations();

  const configured = Boolean(env.resendApiKey && env.emailFrom);

  return (
    <AdminShell>
      <div>
        <p className="font-mono text-xs font-semibold uppercase tracking-[0.28em] text-accent">
          {tr.admin.title}
        </p>
        <h1 className="mt-1 text-3xl font-semibold text-white">
          {tr.admin.notifications.title}
        </h1>
        <p className="mt-2 text-sm text-foreground/70">
          {tr.admin.notifications.subtitle}
        </p>
      </div>

      {!configured ? (
        <div className="mt-8 rounded-xl border border-amber-400/20 bg-amber-400/10 p-5">
          <p className="font-semibold text-amber-200">
            {tr.admin.notifications.emailNotConfigured}
          </p>
          <p className="mt-2 text-sm text-foreground/70">
            {tr.admin.notifications.configureDesc}
          </p>
        </div>
      ) : null}

      <div className="mt-8">
        <SendNotificationDialog />
      </div>
    </AdminShell>
  );
}

