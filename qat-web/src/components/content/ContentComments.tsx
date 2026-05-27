"use client";

import { useEffect, useRef, useState } from "react";
import { MessageCircle, Trash2 } from "lucide-react";
import Link from "next/link";

import { useTr } from "@/lib/i18n/context";

type Comment = {
  id: string;
  user_id: string;
  user_display_name: string | null;
  body: string;
  created_at: string;
};

type Props = {
  contentId: string;
  currentUserId: string | null;
};

function timeAgo(iso: string) {
  const diff = Date.now() - new Date(iso).getTime();
  const m = Math.floor(diff / 60000);
  if (m < 1) return "just now";
  if (m < 60) return `${m}m ago`;
  const h = Math.floor(m / 60);
  if (h < 24) return `${h}h ago`;
  return `${Math.floor(h / 24)}d ago`;
}

export function ContentComments({ contentId, currentUserId }: Props) {
  const tr = useTr();
  const c = tr.comments;
  const [comments, setComments] = useState<Comment[]>([]);
  const [body, setBody] = useState("");
  const [posting, setPosting] = useState(false);
  const [error, setError] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    fetch(`/api/content/${contentId}/comments`)
      .then((r) => r.json())
      .then(({ comments }) => setComments(comments ?? []))
      .catch(() => {});
  }, [contentId]);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!body.trim() || posting) return;
    setPosting(true);
    setError("");
    try {
      const res = await fetch(`/api/content/${contentId}/comments`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ body }),
      });
      const json = await res.json();
      if (!res.ok) { setError(json.error ?? "Failed to post."); return; }
      setComments((prev) => [...prev, json.comment]);
      setBody("");
    } catch {
      setError("Network error. Try again.");
    } finally {
      setPosting(false);
    }
  }

  async function deleteComment(id: string) {
    setComments((prev) => prev.filter((cm) => cm.id !== id));
    await fetch(`/api/content/${contentId}/comments`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ commentId: id }),
    }).catch(() => {});
  }

  return (
    <section className="mt-10 border-t border-white/10 pt-8">
      <h2 className="flex items-center gap-2 text-lg font-semibold text-white">
        <MessageCircle className="size-5 text-primary" aria-hidden="true" />
        {c.heading}
        {comments.length > 0 && (
          <span className="ml-1 text-sm font-normal text-muted-foreground/70">
            ({comments.length})
          </span>
        )}
      </h2>

      {comments.length > 0 ? (
        <ul className="mt-6 flex flex-col gap-4">
          {comments.map((cm) => (
            <li key={cm.id} className="glass-panel rounded-xl p-4">
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <span className="text-sm font-medium text-white">
                    {cm.user_display_name ?? tr.contentDetail.member}
                  </span>
                  <span className="ml-2 text-xs text-muted-foreground/70">{timeAgo(cm.created_at)}</span>
                </div>
                {currentUserId === cm.user_id && (
                  <button
                    type="button"
                    onClick={() => deleteComment(cm.id)}
                    className="shrink-0 text-muted-foreground/50 transition hover:text-red-400"
                    aria-label={c.deleteLabel}
                  >
                    <Trash2 className="size-3.5" aria-hidden="true" />
                  </button>
                )}
              </div>
              <p className="mt-2 text-sm leading-6 text-foreground/70 whitespace-pre-wrap">
                {cm.body}
              </p>
            </li>
          ))}
        </ul>
      ) : (
        <p className="mt-4 text-sm text-muted-foreground/70">{c.noComments}</p>
      )}

      {currentUserId ? (
        <form onSubmit={submit} className="mt-6 flex flex-col gap-3">
          <textarea
            ref={textareaRef}
            value={body}
            onChange={(e) => setBody(e.target.value)}
            rows={3}
            maxLength={1000}
            placeholder={c.placeholder}
            className="w-full rounded-lg border border-white/15 bg-white/5 px-3 py-2.5 text-sm text-white placeholder:text-muted-foreground/70 focus:border-primary/50 focus:outline-none focus:ring-2 focus:ring-primary/30 resize-none"
          />
          {error && (
            <p className="text-xs text-red-400">{error}</p>
          )}
          <div className="flex items-center justify-between">
            <span className="text-xs text-muted-foreground/50">{body.length}{c.charLimit}</span>
            <button
              type="submit"
              disabled={!body.trim() || posting}
              className="inline-flex h-9 items-center rounded-full bg-primary px-5 text-sm font-semibold text-slate-950 transition hover:bg-primary/90 disabled:opacity-50"
            >
              {posting ? c.posting : c.post}
            </button>
          </div>
        </form>
      ) : (
        <p className="mt-6 text-sm text-muted-foreground/70">
          <Link href="/login" className="text-primary underline underline-offset-4 hover:text-primary">
            {c.signIn}
          </Link>{" "}
          {c.signInPrompt}
        </p>
      )}
    </section>
  );
}
