"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function CustomArticleAdminDeleteButton({
  articleId,
  label = "Delete",
}: {
  articleId: string;
  label?: string;
}) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function onDelete() {
    if (!confirm(`Delete article “${articleId}”? This cannot be undone on the server if the API supports delete.`)) {
      return;
    }
    setLoading(true);
    try {
      const res = await fetch(`/api/admin/custom-articles/${encodeURIComponent(articleId)}`, {
        method: "DELETE",
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        alert(typeof data.error === "string" ? data.error : `Delete failed (${res.status})`);
        return;
      }
      router.refresh();
    } catch {
      alert("Network error");
    } finally {
      setLoading(false);
    }
  }

  return (
    <button
      type="button"
      onClick={() => void onDelete()}
      disabled={loading}
      className="text-sm font-semibold text-red-600 hover:underline disabled:opacity-50"
    >
      {loading ? "…" : label}
    </button>
  );
}
