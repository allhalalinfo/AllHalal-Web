import Link from "next/link";
import PortalRelatedLinks from "@/components/seo/PortalRelatedLinks";
import { generateMetadata as genMeta } from "@/lib/seo/metadata";

export const metadata = genMeta({
  title: "Watch Makkah & Madinah Live Stream 24/7 | allhalal.info",
  description:
    "Watch live broadcasts from Masjid al-Haram in Makkah and Al-Masjid an-Nabawi in Madinah. High-quality 24/7 streams with links to prayer times and learning tools.",
  path: "/learn/live-makkah",
  keywords: [
    "makkah live",
    "madinah live",
    "masjid al haram live",
    "live stream makkah",
    "kaaba live",
  ],
});

export default async function LiveStreamsPage() {
  let streams: Array<{ id: string; title: string; video_id: string }> = [];

  try {
    const res = await fetch("https://api.allhalal.info/api/v1/config/live-streams", {
      headers: { "X-Source": "web" },
      next: { revalidate: 3600 },
    });

    if (res.ok) {
      const json = await res.json();
      streams = json.data?.streams || [];
    }
  } catch (e) {
    console.error("Failed to fetch live streams", e);
  }

  if (streams.length === 0) {
    streams = [
      { id: "makkah_live", title: "Makkah Live", video_id: "Cm1v4bteXbI" },
      { id: "madinah_live", title: "Madinah Live", video_id: "9A1S0xAPVIs" },
    ];
  }

  return (
    <div className="container mx-auto min-h-screen max-w-5xl py-32">
      <Link href="/learn" className="mb-8 inline-block text-primary hover:underline">
        &larr; Back to Learn
      </Link>

      <div className="mb-12">
        <h1 className="mb-4 font-display text-4xl font-bold text-text-primary md:text-5xl">
          Makkah & Madinah Live
        </h1>
        <p className="max-w-2xl text-xl text-text-secondary">
          Watch the 24/7 live broadcasts from the Holy Mosques. Use them for quiet
          reflection, or pair a stream with prayer times and duas while you follow the day
          in the Haramain.
        </p>
      </div>

      <div className="mb-16 grid gap-8 lg:grid-cols-2">
        {streams.map((stream) => {
          const isChannel = stream.video_id?.startsWith("UC");
          return (
            <div
              key={stream.id}
              className="flex flex-col overflow-hidden rounded-3xl border border-border bg-bg-card shadow-sm"
            >
              <div className="relative flex w-full items-center justify-center bg-black pb-[56.25%]">
                {!isChannel ? (
                  <iframe
                    src={`https://www.youtube.com/embed/${stream.video_id}?autoplay=0&mute=0&rel=0`}
                    title={stream.title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="absolute left-0 top-0 h-full w-full border-0"
                  />
                ) : (
                  <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center text-white/80">
                    <p className="mb-4">Live player temporarily unavailable for this source.</p>
                    <a
                      href={`https://www.youtube.com/channel/${stream.video_id}/live`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="rounded-lg bg-red-600 px-4 py-2 font-medium text-white transition-colors hover:bg-red-700"
                    >
                      Watch on YouTube
                    </a>
                  </div>
                )}
              </div>
              <div className="p-6">
                <h2 className="mb-2 flex items-center gap-3 font-display text-2xl font-bold text-text-primary">
                  <span
                    className={`h-3 w-3 rounded-full ${!isChannel ? "animate-pulse bg-red-500" : "bg-gray-400"}`}
                  />
                  {stream.title}
                </h2>
                <p className="text-sm text-text-secondary">
                  Live broadcast from{" "}
                  {stream.title?.includes("Makkah")
                    ? "Masjid al-Haram"
                    : "Al-Masjid an-Nabawi"}
                  .
                </p>
              </div>
            </div>
          );
        })}
      </div>

      <PortalRelatedLinks title="Continue on allhalal.info" />
    </div>
  );
}
