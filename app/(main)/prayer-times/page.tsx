import type { Metadata } from "next";
import Footer from "@/components/layout/Footer";
import TodayForYouServer from "@/components/portal/TodayForYouServer";

export const metadata: Metadata = {
  title: "Prayer times | allhalal.info",
  description:
    "Salah times for your location on allhalal.info — Fajr, Dhuhr, Asr, Maghrib and Isha with calculation method.",
  openGraph: {
    title: "Prayer times | allhalal.info",
    description: "Daily prayer times and Islamic calendar context on allhalal.info.",
    type: "website",
  },
};

export default async function PrayerTimesPage(props: {
  params: Promise<{}>;
}) {

  return (
    <>
      <main className="relative min-h-screen overflow-hidden bg-bg-primary">
        <section className="relative pb-20 pt-32">
          <div className="container relative z-10 mx-auto max-w-7xl">
            <h1 className="font-display text-3xl font-black tracking-tight text-text-primary md:text-4xl">
              Prayer times
            </h1>
            <p className="mt-2 max-w-2xl text-text-secondary">
              Times update for your location. Allow location in the browser for the most accurate
              adhan schedule.
            </p>
            <div className="mt-8">
              <TodayForYouServer locale="en" />
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
