"use client";

import { useCallback, useEffect, useState } from "react";

type ImageMetrics = {
  overall_real_og_pct?: number;
  feed_real_og_pct?: number;
  homepage_real_og_pct?: number;
  total_items?: number;
  real_count?: number;
  og_count?: number;
  stock_count?: number;
  og_cache_size?: number;
  top_rejections?: unknown[];
};

type MetricsPayload = {
  success?: boolean;
  metrics?: ImageMetrics;
  age_minutes?: number;
  fresh?: boolean;
  last_update?: string;
  error?: string;
  status_code?: number;
};

type SourceRow = {
  source: string;
  total: number;
  real: number;
  og: number;
  stock: number;
  real_og_pct: number;
};

type SourcesPayload = {
  success?: boolean;
  total_sources?: number;
  stats?: { high_quality?: number; medium_quality?: number; low_quality?: number };
  top_5?: SourceRow[];
  bottom_5?: SourceRow[];
  sources?: SourceRow[];
  error?: string;
};

const REFRESH_MS = 5 * 60 * 1000;

function getStatus(value: number, target: number): "success" | "warning" | "danger" {
  if (value >= target) {
    return "success";
  }
  if (value >= target * 0.8) {
    return "warning";
  }
  return "danger";
}

function MetricCard({
  label,
  value,
  target,
}: {
  label: string;
  value: number;
  target: number;
}) {
  const safe = Number.isFinite(value) ? Math.min(100, Math.max(0, value)) : 0;
  const status = getStatus(safe, target);
  const met = safe >= target;
  const fillClass =
    status === "success"
      ? "bg-emerald-500"
      : status === "warning"
        ? "bg-amber-500"
        : "bg-red-500";

  return (
    <div
      className={`rounded-2xl border border-[rgba(47,37,30,0.1)] bg-white/90 p-4 shadow-[0_12px_32px_rgba(43,34,24,0.05)] ${
        met ? "ring-1 ring-emerald-200/90" : status === "danger" ? "ring-1 ring-red-200/80" : ""
      }`}
    >
      <p className="text-sm font-medium text-text-muted">{label}</p>
      <div className="mt-3">
        <div className="relative h-2 overflow-hidden rounded-full bg-[rgba(47,37,30,0.08)]">
          <div
            className={`h-full rounded-full transition-[width] duration-500 ${fillClass}`}
            style={{ width: `${safe}%` }}
          />
          <div
            className="absolute top-0 h-full w-px bg-[rgba(47,37,30,0.45)]"
            style={{ left: `${Math.min(target, 100)}%` }}
            title={`Target ${target}%`}
          />
        </div>
        <div className="mt-2 flex items-baseline justify-between text-sm">
          <span className="text-2xl font-black tabular-nums text-text-primary">{safe}%</span>
          <span className="text-text-muted">target {target}%</span>
        </div>
        {met ? (
          <p className="mt-2 text-xs font-semibold text-emerald-700">Target met</p>
        ) : null}
      </div>
    </div>
  );
}

function MetricsCelebrationBlock({
  overall,
  feed,
  home,
}: {
  overall: number;
  feed: number;
  home: number;
}) {
  const feedMet = feed >= 70;
  const homeMet = home >= 50;
  const homeExceptional = home >= 85;
  const overallProgress = overall < 70;

  if (!feedMet && !homeMet && !overallProgress) {
    return null;
  }

  return (
    <div className="mt-6 space-y-3">
      {(feedMet || homeMet) && (
        <div className="rounded-2xl border border-emerald-200/90 bg-gradient-to-br from-emerald-50/95 to-teal-50/80 p-5 shadow-[0_12px_32px_rgba(16,185,129,0.08)]">
          <p className="text-sm font-black uppercase tracking-[0.12em] text-emerald-900">
            Phase 4 · image quality
          </p>
          <p className="mt-2 text-base font-bold text-emerald-950">Targets on this snapshot</p>
          <ul className="mt-3 space-y-2 text-sm leading-relaxed text-emerald-900">
            {feedMet ? (
              <li className="flex flex-wrap items-baseline gap-x-2">
                <span className="font-semibold text-emerald-800">Feed real+OG</span>
                <span className="tabular-nums font-bold">{feed}%</span>
                <span className="text-emerald-700/90">(target ≥70%) — met</span>
              </li>
            ) : (
              <li className="text-emerald-800/90">
                Feed real+OG: <span className="font-bold tabular-nums">{feed}%</span> (target 70%)
              </li>
            )}
            {homeMet ? (
              <li className="flex flex-wrap items-baseline gap-x-2">
                <span className="font-semibold text-emerald-800">Homepage real+OG</span>
                <span className="tabular-nums font-bold">{home}%</span>
                <span className="text-emerald-700/90">(target ≥50%) — met</span>
                {homeExceptional ? (
                  <span className="ml-0 rounded-full bg-emerald-600/15 px-2 py-0.5 text-xs font-bold text-emerald-900">
                    Strong homepage
                  </span>
                ) : null}
              </li>
            ) : (
              <li className="text-emerald-800/90">
                Homepage real+OG: <span className="font-bold tabular-nums">{home}%</span> (target 50%)
              </li>
            )}
          </ul>
        </div>
      )}

      {overallProgress ? (
        <div className="rounded-2xl border border-amber-200/80 bg-amber-50/85 p-4 text-sm text-amber-950">
          <span className="font-semibold">Overall real+OG</span>{" "}
          <span className="tabular-nums font-bold">{overall}%</span>
          <span className="text-amber-900/85"> — product target 70%; corpus-wide share can lag while feed &amp; homepage are strong.</span>
        </div>
      ) : null}
    </div>
  );
}

function ImageMetricsWidget({
  data,
  loading,
  error,
}: {
  data: MetricsPayload | null;
  loading: boolean;
  error: string | null;
}) {
  if (loading && !data) {
    return (
      <div className="rounded-[1.85rem] border border-[rgba(47,37,30,0.08)] bg-white/88 p-8 text-center text-text-muted shadow-[0_18px_44px_rgba(43,34,24,0.05)]">
        Loading image metrics…
      </div>
    );
  }

  if (error && !data) {
    return (
      <div className="rounded-[1.85rem] border border-amber-200/80 bg-amber-50/90 p-8 text-center text-amber-900 shadow-[0_18px_44px_rgba(43,34,24,0.05)]">
        <p className="font-semibold">Metrics unavailable</p>
        <p className="mt-2 text-sm opacity-90">{error}</p>
      </div>
    );
  }

  const m = data?.metrics;
  const success = data?.success === true && m;
  const backendError = data?.error || (!success && data ? "Metrics not ready" : null);

  if (!m || backendError) {
    return (
      <div className="rounded-[1.85rem] border border-[rgba(47,37,30,0.1)] bg-white/88 p-8 shadow-[0_18px_44px_rgba(43,34,24,0.05)]">
        <h2 className="text-lg font-bold text-text-primary">Image quality (overview)</h2>
        <p className="mt-3 text-sm leading-relaxed text-text-secondary">
          {backendError ||
            "The backend has not published metrics yet (run updater), or the endpoint returned an empty payload."}
        </p>
        {data?.status_code ? (
          <p className="mt-2 text-xs text-text-muted">HTTP {data.status_code}</p>
        ) : null}
      </div>
    );
  }

  const total = m.total_items ?? 0;
  const real = m.real_count ?? 0;
  const og = m.og_count ?? 0;
  const stock = m.stock_count ?? 0;
  const sum = real + og + stock;
  const denom = sum > 0 ? sum : total > 0 ? total : 1;
  const wReal = (real / denom) * 100;
  const wOg = (og / denom) * 100;
  const wStock = (stock / denom) * 100;

  const overall = m.overall_real_og_pct ?? 0;
  const feed = m.feed_real_og_pct ?? 0;
  const home = m.homepage_real_og_pct ?? 0;
  const fresh = data.fresh === true;
  const age = data.age_minutes;

  return (
    <div className="rounded-[1.85rem] border border-[rgba(47,37,30,0.08)] bg-[linear-gradient(180deg,rgba(255,255,255,0.94),rgba(249,246,241,0.96))] p-6 shadow-[0_22px_56px_rgba(43,34,24,0.06)] md:p-8">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-xl font-black font-display tracking-tight text-text-primary">
          Image quality metrics
        </h2>
        <div className="flex flex-wrap items-center gap-2 text-xs font-semibold">
          <span
            className={`rounded-full px-3 py-1 ${
              fresh ? "bg-emerald-100 text-emerald-800" : "bg-amber-100 text-amber-900"
            }`}
          >
            {fresh ? "Fresh" : "Stale"}
            {typeof age === "number" ? ` · ${age}m ago` : ""}
          </span>
          {data.last_update ? (
            <span className="rounded-full bg-[rgba(47,37,30,0.06)] px-3 py-1 text-text-muted">
              Updated {new Date(data.last_update).toLocaleString()}
            </span>
          ) : null}
        </div>
      </div>

      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <MetricCard label="Overall real + OG" value={overall} target={70} />
        <MetricCard label="Feed real + OG" value={feed} target={70} />
        <MetricCard label="Homepage real + OG" value={home} target={50} />
      </div>

      <MetricsCelebrationBlock overall={overall} feed={feed} home={home} />

      <div className="mt-8">
        <h3 className="text-sm font-bold uppercase tracking-[0.16em] text-text-muted">
          Breakdown ({total || "—"} items)
        </h3>
        <p className="mt-1 text-xs text-text-muted">
          “OG” in API aggregates Open Graph, Twitter cards, JSON-LD, and content-picked images (Phase 4 pipeline).
        </p>
        <div className="mt-3 flex h-7 overflow-hidden rounded-xl border border-[rgba(47,37,30,0.08)]">
          <div
            className="bg-emerald-500 transition-[width] duration-500"
            style={{ width: `${wReal}%` }}
            title={`Real: ${real}`}
          />
          <div
            className="bg-blue-500 transition-[width] duration-500"
            style={{ width: `${wOg}%` }}
            title={`OG: ${og}`}
          />
          <div
            className="bg-amber-500 transition-[width] duration-500"
            style={{ width: `${wStock}%` }}
            title={`Stock: ${stock}`}
          />
        </div>
        <div className="mt-3 flex flex-wrap gap-4 text-xs font-medium text-text-secondary">
          <span className="inline-flex items-center gap-2">
            <span className="h-2.5 w-2.5 rounded-sm bg-emerald-500" />
            Real {real}
          </span>
          <span className="inline-flex items-center gap-2">
            <span className="h-2.5 w-2.5 rounded-sm bg-blue-500" />
            OG {og}
          </span>
          <span className="inline-flex items-center gap-2">
            <span className="h-2.5 w-2.5 rounded-sm bg-amber-500" />
            Stock {stock}
          </span>
        </div>
      </div>

      <div className="mt-6 border-t border-[rgba(47,37,30,0.08)] pt-5 text-sm text-text-muted">
        <p>
          <span className="font-semibold text-text-secondary">OG cache: </span>
          {m.og_cache_size ?? "—"} entries
        </p>
        {Array.isArray(m.top_rejections) && m.top_rejections.length > 0 ? (
          <details className="mt-3">
            <summary className="cursor-pointer text-sm font-semibold text-text-secondary">
              Top rejections ({m.top_rejections.length})
            </summary>
            <pre className="mt-2 max-h-48 overflow-auto rounded-xl bg-[rgba(47,37,30,0.04)] p-3 text-xs">
              {JSON.stringify(m.top_rejections, null, 2)}
            </pre>
          </details>
        ) : null}
      </div>
    </div>
  );
}

function getQualityLabel(pct: number): string {
  if (pct >= 70) {
    return "High";
  }
  if (pct >= 40) {
    return "Medium";
  }
  return "Low";
}

function SourceQualityTable({ data }: { data: SourcesPayload | null }) {
  const [filter, setFilter] = useState<"all" | "high" | "medium" | "low">("all");

  if (!data?.sources?.length) {
    return (
      <div className="rounded-[1.85rem] border border-[rgba(47,37,30,0.08)] bg-white/88 p-8 text-sm text-text-secondary shadow-[0_18px_44px_rgba(43,34,24,0.05)]">
        <h2 className="text-lg font-bold text-text-primary">Per-source breakdown</h2>
        <p className="mt-3">
          {data?.error ||
            "No source rows yet. When the backend publishes `/metrics/images/sources`, the table will populate."}
        </p>
      </div>
    );
  }

  const sources = data.sources;
  const filtered = sources.filter((s) => {
    if (filter === "high") {
      return s.real_og_pct >= 70;
    }
    if (filter === "medium") {
      return s.real_og_pct >= 40 && s.real_og_pct < 70;
    }
    if (filter === "low") {
      return s.real_og_pct < 40;
    }
    return true;
  });

  const stats = data.stats;

  return (
    <div className="rounded-[1.85rem] border border-[rgba(47,37,30,0.08)] bg-white/92 p-6 shadow-[0_22px_56px_rgba(43,34,24,0.06)] md:p-8">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <h2 className="text-xl font-black font-display text-text-primary">Sources</h2>
          {typeof data.total_sources === "number" ? (
            <p className="mt-1 text-sm text-text-muted">{data.total_sources} sources tracked</p>
          ) : null}
          {stats ? (
            <p className="mt-2 text-xs text-text-secondary">
              High {stats.high_quality ?? 0} · Medium {stats.medium_quality ?? 0} · Low{" "}
              {stats.low_quality ?? 0}
            </p>
          ) : null}
        </div>
        <div className="flex flex-wrap gap-2">
          {(["all", "high", "medium", "low"] as const).map((key) => (
            <button
              key={key}
              type="button"
              onClick={() => setFilter(key)}
              className={`rounded-full border px-3 py-1.5 text-xs font-semibold transition-colors ${
                filter === key
                  ? "border-[#173640] bg-[#173640] text-white"
                  : "border-[rgba(47,37,30,0.12)] bg-white/80 text-text-secondary hover:bg-white"
              }`}
            >
              {key === "all"
                ? `All (${sources.length})`
                : key === "high"
                  ? "High ≥70%"
                  : key === "medium"
                    ? "Medium 40–69%"
                    : "Low <40%"}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-6 overflow-x-auto rounded-2xl border border-[rgba(47,37,30,0.08)]">
        <table className="min-w-[640px] w-full border-collapse text-left text-sm">
          <thead>
            <tr className="border-b border-[rgba(47,37,30,0.08)] bg-[rgba(47,37,30,0.03)] text-xs font-bold uppercase tracking-wider text-text-muted">
              <th className="px-4 py-3">Source</th>
              <th className="px-4 py-3 text-right">Total</th>
              <th className="px-4 py-3 text-right">Real</th>
              <th className="px-4 py-3 text-right">OG</th>
              <th className="px-4 py-3 text-right">Stock</th>
              <th className="px-4 py-3">Real+OG %</th>
              <th className="px-4 py-3">Status</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((row) => {
              const label = getQualityLabel(row.real_og_pct);
              const badgeClass =
                label === "High"
                  ? "bg-emerald-100 text-emerald-800"
                  : label === "Medium"
                    ? "bg-amber-100 text-amber-900"
                    : "bg-red-100 text-red-800";
              return (
                <tr
                  key={row.source}
                  className="border-b border-[rgba(47,37,30,0.06)] last:border-0 hover:bg-[rgba(47,37,30,0.02)]"
                >
                  <td className="max-w-[240px] px-4 py-3 font-medium text-text-primary">
                    <span className="inline-flex max-w-full flex-wrap items-center gap-2">
                      <span className="truncate">{row.source}</span>
                      {row.real_og_pct >= 100 && row.total > 0 ? (
                        <span className="shrink-0 rounded-full bg-emerald-100 px-2 py-0.5 text-[0.65rem] font-bold uppercase tracking-wide text-emerald-900">
                          Perfect
                        </span>
                      ) : null}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-right tabular-nums text-text-secondary">{row.total}</td>
                  <td className="px-4 py-3 text-right tabular-nums text-text-secondary">{row.real}</td>
                  <td className="px-4 py-3 text-right tabular-nums text-text-secondary">{row.og}</td>
                  <td className="px-4 py-3 text-right tabular-nums text-text-secondary">{row.stock}</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <div className="h-2 flex-1 max-w-[120px] overflow-hidden rounded-full bg-[rgba(47,37,30,0.08)]">
                        <div
                          className="h-full rounded-full bg-emerald-500"
                          style={{ width: `${Math.min(100, row.real_og_pct)}%` }}
                        />
                      </div>
                      <span className="tabular-nums text-text-secondary">{row.real_og_pct}%</span>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <span className={`rounded-full px-2.5 py-0.5 text-xs font-bold ${badgeClass}`}>
                      {label}
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default function ImageMetricsDashboard() {
  const [metrics, setMetrics] = useState<MetricsPayload | null>(null);
  const [sources, setSources] = useState<SourcesPayload | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lastFetch, setLastFetch] = useState<Date | null>(null);

  const load = useCallback(async () => {
    setError(null);
    try {
      const [mRes, sRes] = await Promise.all([
        fetch("/api/admin/briefs-metrics/images"),
        fetch("/api/admin/briefs-metrics/images/sources"),
      ]);
      const mJson = (await mRes.json()) as MetricsPayload;
      const sJson = (await sRes.json()) as SourcesPayload;
      setMetrics(mJson);
      setSources(sJson);
      setLastFetch(new Date());
      if (!mRes.ok && mJson.error) {
        setError(mJson.error);
      }
    } catch (e) {
      setError(e instanceof Error ? e.message : "Request failed");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
    const id = setInterval(load, REFRESH_MS);
    return () => clearInterval(id);
  }, [load]);

  return (
    <div className="space-y-10">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-text-muted">
          Internal monitoring · auto-refresh every 5 min
          {lastFetch ? ` · last pull ${lastFetch.toLocaleTimeString()}` : ""}
        </p>
        <button
          type="button"
          onClick={() => {
            setLoading(true);
            void load();
          }}
          className="rounded-full border border-[rgba(47,37,30,0.12)] bg-white px-4 py-2 text-sm font-semibold text-text-primary shadow-sm hover:bg-[rgba(47,37,30,0.04)]"
        >
          Refresh now
        </button>
      </div>

      <ImageMetricsWidget data={metrics} loading={loading} error={error} />
      <SourceQualityTable data={sources} />
    </div>
  );
}
