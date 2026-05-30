"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Trash2 } from "lucide-react";

type Props = {
  itemId: string;
  title: string;
};

export function DeleteContentButton({ itemId, title }: Props) {
  const router = useRouter();
  const [deleting, setDeleting] = useState(false);
  const [error, setError] = useState("");

  async function deleteItem() {
    const confirmed = window.confirm(
      `Delete "${title}"? This permanently removes the content item.`,
    );
    if (!confirmed) return;

    setDeleting(true);
    setError("");

    const res = await fetch(`/api/admin/content/${itemId}`, {
      method: "DELETE",
    });

    setDeleting(false);

    if (!res.ok) {
      const json = await res.json().catch(() => ({}));
      setError(json.error ?? "Delete failed.");
      return;
    }

    router.refresh();
  }

  return (
    <span className="relative inline-flex">
      <button
        type="button"
        onClick={deleteItem}
        disabled={deleting}
        className="rounded p-1.5 text-muted-foreground transition hover:text-red-300 disabled:opacity-50"
        title="Delete content"
        aria-label={`Delete ${title}`}
      >
        <Trash2 className="size-4" aria-hidden="true" />
      </button>
      {error ? (
        <span className="absolute right-0 top-8 z-10 w-48 rounded-md border border-red-400/20 bg-red-950 px-2 py-1 text-xs text-red-200 shadow-lg">
          {error}
        </span>
      ) : null}
    </span>
  );
}
