"use client";

import { useState } from "react";
import { useTr } from "@/lib/i18n/context";

export function SendNotificationDialog() {
  const tr = useTr();
  const [open, setOpen] = useState(false);
  const [subject, setSubject] = useState("");
  const [preview, setPreview] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "done" | "error">("idle");
  const [result, setResult] = useState("");

  async function handleSend() {
    if (!subject || !preview) return;
    setStatus("sending");
    setResult("");

    const res = await fetch("/api/admin/notify", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ subject, preview }),
    });

    const json = await res.json().catch(() => ({}));

    if (!res.ok) {
      setStatus("error");
      setResult(json.error ?? "Send failed.");
    } else if (json.configured === false) {
      setStatus("error");
      setResult(json.error);
    } else {
      setStatus("done");
      setResult(tr.admin.notifications.sentTo(json.sent));
    }
  }

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="inline-flex h-10 items-center gap-2 rounded-full bg-violet-400/15 px-4 text-sm font-medium text-violet-200 transition hover:bg-violet-400/25"
      >
        {tr.admin.notifications.sendNotificationBtn}
      </button>

      {open ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-5 backdrop-blur">
          <div className="glass-panel w-full max-w-lg rounded-2xl p-6">
            <h2 className="text-xl font-semibold text-white">{tr.admin.notifications.dialogTitle}</h2>
            <p className="mt-1 text-sm text-slate-400">
              {tr.admin.notifications.dialogSubtitle}
            </p>

            <div className="mt-5 flex flex-col gap-4">
              <div>
                <label className="mb-1.5 block text-sm font-medium text-slate-200">
                  {tr.admin.notifications.subjectLabel}
                </label>
                <input
                  type="text"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  placeholder={tr.admin.notifications.subjectPlaceholder}
                  className="w-full rounded-lg border border-white/15 bg-white/5 px-3 py-2.5 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-300/30"
                />
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-medium text-slate-200">
                  {tr.admin.notifications.previewLabel}
                </label>
                <textarea
                  rows={3}
                  value={preview}
                  onChange={(e) => setPreview(e.target.value)}
                  placeholder={tr.admin.notifications.previewPlaceholder}
                  className="w-full rounded-lg border border-white/15 bg-white/5 px-3 py-2.5 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-300/30"
                />
              </div>

              {result ? (
                <p
                  className={`text-sm ${status === "error" ? "text-red-400" : "text-green-300"}`}
                >
                  {result}
                </p>
              ) : null}

              <div className="flex gap-3">
                <button
                  onClick={() => setOpen(false)}
                  className="flex-1 rounded-lg border border-white/15 py-2.5 text-sm text-slate-300 transition hover:text-white"
                >
                  {tr.admin.notifications.cancelBtn}
                </button>
                <button
                  onClick={handleSend}
                  disabled={status === "sending" || !subject || !preview}
                  className="flex-1 rounded-lg bg-cyan-200 py-2.5 text-sm font-semibold text-slate-950 transition hover:bg-cyan-100 disabled:opacity-50"
                >
                  {status === "sending" ? tr.admin.notifications.sending : tr.admin.notifications.sendBtn}
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
