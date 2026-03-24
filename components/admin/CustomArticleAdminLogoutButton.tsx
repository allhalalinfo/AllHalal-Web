"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function CustomArticleAdminLogoutButton() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function logout() {
    setLoading(true);
    try {
      await fetch("/api/admin/custom-auth/logout", { method: "POST" });
      router.push(`/admin/custom-articles/login`);
      router.refresh();
    } finally {
      setLoading(false);
    }
  }

  return (
    <button
      type="button"
      onClick={() => void logout()}
      disabled={loading}
      className="rounded-full border border-border px-4 py-2 text-sm font-semibold text-text-secondary transition hover:border-primary/30 hover:text-text-primary disabled:opacity-50"
    >
      {loading ? "…" : "Log out"}
    </button>
  );
}
