"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function CustomArticleAdminLoginForm({ locale }: { locale: string }) {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const res = await fetch("/api/admin/custom-auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setError(typeof data.error === "string" ? data.error : "Login failed");
        return;
      }
      router.push(`/admin/custom-articles`);
      router.refresh();
    } catch {
      setError("Network error");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form
      onSubmit={onSubmit}
      className="mx-auto max-w-md rounded-3xl border border-[rgba(47,37,30,0.1)] bg-white/90 p-8 shadow-[0_20px_56px_rgba(43,34,24,0.08)]"
    >
      <h1 className="font-display text-2xl font-black text-text-primary">Custom articles</h1>
      <p className="mt-2 text-sm text-text-secondary">Enter the admin password to continue.</p>
      <label className="mt-6 block text-xs font-bold uppercase tracking-wider text-text-muted">
        Password
        <input
          type="password"
          autoComplete="current-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="mt-2 w-full rounded-2xl border border-border bg-bg-primary px-4 py-3 text-text-primary outline-none focus:border-primary/40"
          required
        />
      </label>
      {error ? <p className="mt-3 text-sm font-medium text-red-600">{error}</p> : null}
      <button
        type="submit"
        disabled={loading}
        className="mt-6 w-full rounded-full bg-[#173640] py-3 text-sm font-semibold text-white shadow-lg transition hover:bg-[#13303a] disabled:opacity-60"
      >
        {loading ? "Signing in…" : "Sign in"}
      </button>
    </form>
  );
}
