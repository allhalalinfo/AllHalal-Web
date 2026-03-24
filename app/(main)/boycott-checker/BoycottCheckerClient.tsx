"use client";

import { useState } from "react";
import Footer from "@/components/layout/Footer";

export default function BoycottCheckerClient() {
  const [brand, setBrand] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<Record<string, unknown> | null>(null);

  const check = async (e: React.FormEvent) => {
    e.preventDefault();
    const q = brand.trim();
    if (!q) {
      setError("Enter a brand or company name.");
      return;
    }
    setLoading(true);
    setError(null);
    setData(null);
    try {
      const res = await fetch(`/api/boycott-check?brand=${encodeURIComponent(q)}`);
      const json = (await res.json()) as Record<string, unknown>;
      if (!res.ok) {
        setError((json.error as string) || "Request failed.");
        return;
      }
      setData(json);
    } catch {
      setError("Network error. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <main className="relative min-h-screen overflow-hidden bg-bg-primary">
        <section className="relative pb-20 pt-32">
          <div className="container relative z-10 mx-auto max-w-2xl">
            <h1 className="font-display text-3xl font-black tracking-tight text-text-primary md:text-4xl">
              Boycott checker
            </h1>
            <p className="mt-2 text-text-secondary">
              Check guidance for a brand or company (data from allhalal.info API). This is
              informational — verify with trusted scholars and lists you follow.
            </p>

            <form onSubmit={check} className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-end">
              <label className="flex-1">
                <span className="mb-1 block text-sm font-semibold text-text-secondary">
                  Brand or company
                </span>
                <input
                  type="text"
                  value={brand}
                  onChange={(e) => setBrand(e.target.value)}
                  placeholder="e.g. brand name"
                  className="w-full rounded-2xl border border-[rgba(73,58,42,0.12)] bg-white/80 px-4 py-3 text-text-primary shadow-inner outline-none focus:ring-2 focus:ring-primary/30"
                  autoComplete="off"
                />
              </label>
              <button
                type="submit"
                disabled={loading}
                className="rounded-2xl bg-[#2E4B59] px-6 py-3 font-semibold text-white shadow-[0_12px_28px_rgba(46,75,89,0.22)] transition hover:bg-[#25404d] disabled:opacity-60"
              >
                {loading ? "Checking…" : "Check"}
              </button>
            </form>

            {error ? (
              <p className="mt-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800">
                {error}
              </p>
            ) : null}

            {data ? (
              <pre className="mt-6 overflow-x-auto rounded-2xl border border-[rgba(73,58,42,0.1)] bg-white/70 p-4 text-left text-sm text-text-primary">
                {JSON.stringify(data, null, 2)}
              </pre>
            ) : null}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
