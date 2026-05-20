"use client";

import { useState } from "react";
import type { ContentItem } from "@/lib/data/content";
import type { Achievement } from "@/lib/data/achievements";

type Props = {
  games: ContentItem[];
  courses: ContentItem[];
  achievements: Achievement[];
};

function ItemRow({
  item,
  done,
  onToggle,
}: {
  item: ContentItem;
  done: boolean;
  onToggle: (id: string, itemType: "game" | "course", completed: boolean) => void;
}) {
  const itemType = item.content_type as "game" | "course";
  return (
    <label className="flex cursor-pointer items-start gap-3 rounded-lg px-3 py-2.5 transition hover:bg-white/5">
      <input
        type="checkbox"
        checked={done}
        onChange={() => onToggle(item.id, itemType, !done)}
        className="mt-0.5 size-4 cursor-pointer accent-cyan-400"
      />
      <div>
        <p className={`text-sm font-medium ${done ? "text-slate-400 line-through" : "text-white"}`}>
          {item.title}
        </p>
        {item.excerpt && (
          <p className="mt-0.5 text-xs text-slate-500 line-clamp-1">{item.excerpt}</p>
        )}
      </div>
    </label>
  );
}

function EmptySlot({ label }: { label: string }) {
  return (
    <p className="px-3 py-4 text-sm text-slate-500 italic">
      No {label} available yet — check back soon.
    </p>
  );
}

export function AchievementList({ games, courses, achievements }: Props) {
  const [doneIds, setDoneIds] = useState<Set<string>>(
    () => new Set(achievements.map((a) => a.item_id)),
  );
  const [saving, setSaving] = useState<string | null>(null);

  async function handleToggle(id: string, itemType: "game" | "course", completed: boolean) {
    setSaving(id);
    const next = new Set(doneIds);
    if (completed) next.add(id);
    else next.delete(id);
    setDoneIds(next); // optimistic

    const res = await fetch("/api/profile/achievement", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ itemId: id, itemType, completed }),
    });

    if (!res.ok) {
      // revert
      setDoneIds(doneIds);
    }
    setSaving(null);
  }

  const gamesDone = games.filter((g) => doneIds.has(g.id)).length;
  const coursesDone = courses.filter((c) => doneIds.has(c.id)).length;

  return (
    <div className="flex flex-col gap-6">
      {/* Games */}
      <div>
        <div className="mb-3 flex items-center justify-between">
          <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-300">Games</h3>
          <span className="font-mono text-xs text-cyan-300">
            {gamesDone}/{games.length}
          </span>
        </div>
        {games.length === 0 ? (
          <EmptySlot label="games" />
        ) : (
          <div className="flex flex-col">
            {games.map((g) => (
              <ItemRow
                key={g.id}
                item={g}
                done={doneIds.has(g.id)}
                onToggle={saving ? () => {} : handleToggle}
              />
            ))}
          </div>
        )}
      </div>

      {/* Courses */}
      <div>
        <div className="mb-3 flex items-center justify-between">
          <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-300">Courses</h3>
          <span className="font-mono text-xs text-cyan-300">
            {coursesDone}/{courses.length}
          </span>
        </div>
        {courses.length === 0 ? (
          <EmptySlot label="courses" />
        ) : (
          <div className="flex flex-col">
            {courses.map((c) => (
              <ItemRow
                key={c.id}
                item={c}
                done={doneIds.has(c.id)}
                onToggle={saving ? () => {} : handleToggle}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
