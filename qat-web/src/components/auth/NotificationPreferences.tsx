"use client";

import { useState, useTransition } from "react";

import { useTr } from "@/lib/i18n/context";

type NotificationPreferencesProps = {
  userId: string;
  initialValue: boolean;
};

export function NotificationPreferences({
  userId,
  initialValue,
}: NotificationPreferencesProps) {
  const tr = useTr();
  const n = tr.notifications;
  const [checked, setChecked] = useState(initialValue);
  const [isPending, startTransition] = useTransition();
  const [message, setMessage] = useState("");

  async function toggle() {
    const next = !checked;
    setChecked(next);
    setMessage("");

    startTransition(async () => {
      const res = await fetch("/api/account/notification-preference", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId, wants: next }),
      });
      if (!res.ok) {
        setChecked(!next);
        setMessage(n.failed);
      } else {
        setMessage(next ? n.enabled : n.disabled);
      }
    });
  }

  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center gap-3">
        <button
          role="switch"
          aria-checked={checked}
          onClick={toggle}
          disabled={isPending}
          className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:opacity-50 ${checked ? "bg-primary" : "bg-white/20"}`}
        >
          <span
            className={`pointer-events-none inline-block size-5 rounded-full bg-white shadow-lg transition-transform ${checked ? "translate-x-5" : "translate-x-0"}`}
          />
        </button>
        <span className="text-sm text-foreground/85">{n.toggle}</span>
      </div>
      {message ? (
        <p className="text-xs text-muted-foreground">{message}</p>
      ) : null}
    </div>
  );
}
