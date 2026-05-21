"use client";

import { useEffect, useState } from "react";
import { Heart, Eye } from "lucide-react";

import { useTr } from "@/lib/i18n/context";

type Props = {
  contentId: string;
  initialViews: number;
  isLoggedIn: boolean;
};

export function ContentEngagement({ contentId, initialViews, isLoggedIn }: Props) {
  const tr = useTr();
  const e = tr.engagement;
  const [views] = useState(initialViews);
  const [likeCount, setLikeCount] = useState(0);
  const [liked, setLiked] = useState(false);
  const [liking, setLiking] = useState(false);

  useEffect(() => {
    fetch(`/api/content/${contentId}/view`, { method: "POST" }).catch(() => {});
    fetch(`/api/content/${contentId}/like`)
      .then((r) => r.json())
      .then(({ count, liked }) => {
        setLikeCount(count);
        setLiked(liked);
      })
      .catch(() => {});
  }, [contentId]);

  async function toggleLike() {
    if (!isLoggedIn || liking) return;
    setLiking(true);
    const prev = liked;
    setLiked(!prev);
    setLikeCount((n) => n + (prev ? -1 : 1));
    try {
      const res = await fetch(`/api/content/${contentId}/like`, { method: "POST" });
      const json = await res.json();
      setLiked(json.liked);
      setLikeCount((n) => n + (json.liked === !prev ? 0 : json.liked ? 1 : -1));
    } catch {
      setLiked(prev);
      setLikeCount((n) => n + (prev ? 1 : -1));
    } finally {
      setLiking(false);
    }
  }

  return (
    <div className="flex items-center gap-5 text-sm text-slate-400">
      <span className="inline-flex items-center gap-1.5">
        <Eye className="size-4" aria-hidden="true" />
        {(views + 1).toLocaleString()}
      </span>

      <button
        type="button"
        onClick={toggleLike}
        disabled={!isLoggedIn || liking}
        title={isLoggedIn ? (liked ? e.unlike : e.like) : e.signInToLike}
        className={[
          "inline-flex items-center gap-1.5 transition-colors",
          liked ? "text-red-400" : "hover:text-red-300",
          !isLoggedIn ? "cursor-default opacity-60" : "cursor-pointer",
        ].join(" ")}
      >
        <Heart
          className="size-4"
          fill={liked ? "currentColor" : "none"}
          aria-hidden="true"
        />
        {likeCount.toLocaleString()}
      </button>
    </div>
  );
}
