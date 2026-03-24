import type { Metadata } from "next";
import ImageMetricsDashboard from "@/components/admin/ImageMetricsDashboard";

export const metadata: Metadata = {
  title: "Image metrics | Admin",
  description: "Briefs image quality metrics (internal)",
  robots: { index: false, follow: false },
};

export default async function AdminImageMetricsPage(props: { params: Promise<{}> }) {

  return (
    <main className="min-h-screen bg-bg-primary pb-20 pt-28">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[28rem] bg-[radial-gradient(circle_at_12%_12%,rgba(244,185,66,0.12),transparent_26%),radial-gradient(circle_at_88%_18%,rgba(75,110,112,0.1),transparent_28%),linear-gradient(180deg,rgba(255,255,255,0.2),transparent_78%)]" />
      <div className="container relative z-10 max-w-5xl">
        <div className="mb-10">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-text-muted">Admin</p>
          <h1 className="mt-2 text-[clamp(1.75rem,3vw,2.5rem)] font-black font-display tracking-tight text-text-primary">
            Briefs image quality
          </h1>
          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-text-secondary">
            Proxied from the AllHalal API (Phase 4 image metrics). Numbers update with each backend snapshot; feed
            and homepage targets are highlighted when met. Not linked from the public nav — share the URL only with
            your team.
          </p>
        </div>
        <ImageMetricsDashboard />
      </div>
    </main>
  );
}
