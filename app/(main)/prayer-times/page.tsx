import type { Metadata } from "next";
import Link from "next/link";
import Footer from "@/components/layout/Footer";
import TodayForYouServer from "@/components/portal/TodayForYouServer";
import BreadcrumbsSchema from "@/components/seo/BreadcrumbsSchema";
import FAQSchema from "@/components/seo/FAQSchema";

export const metadata: Metadata = {
  alternates: { canonical: "/prayer-times" },
  title: "Prayer Times Today | Fajr, Dhuhr, Asr, Maghrib & Isha | allhalal.info",
  description:
    "Daily salah times for your location: Fajr, Sunrise, Dhuhr, Asr, Maghrib and Isha. Choose a calculation method and follow the schedule for where you are.",
  keywords: [
    "prayer times",
    "salah times",
    "namaz times",
    "fajr time",
    "maghrib time",
    "adhan schedule",
    "islamic prayer times",
  ].join(", "),
  openGraph: {
    title: "Prayer Times Today | allhalal.info",
    description:
      "Salah times for your location with calculation method — Fajr through Isha.",
    type: "website",
  },
};

const faqs = [
  {
    question: "How are prayer times calculated?",
    answer:
      "Times are computed from your latitude, longitude and a chosen calculation method (for example Umm al-Qura or Muslim World League). Methods differ mainly on Fajr and Isha angles.",
  },
  {
    question: "Why do apps show slightly different times?",
    answer:
      "Different methods, madhhab Asr rules (standard vs Hanafi), and whether high-latitude adjustments are applied. Follow the mosque or method you normally use in your city.",
  },
  {
    question: "Do I need to allow location?",
    answer:
      "Location gives the most accurate local schedule. Without it, the page may fall back to a default city. You can still use the times once a location is set.",
  },
];

export default async function PrayerTimesPage() {
  const breadcrumbs = [
    { name: "Home", url: "/" },
    { name: "Prayer times", url: "/prayer-times" },
  ];

  return (
    <>
      <BreadcrumbsSchema items={breadcrumbs} />
      <FAQSchema faqs={faqs} />
      <main className="relative min-h-screen overflow-hidden bg-bg-primary">
        <section className="relative pb-12 pt-32">
          <div className="container relative z-10 mx-auto max-w-7xl">
            <h1 className="font-display text-3xl font-black tracking-tight text-text-primary md:text-5xl">
              Prayer times today
            </h1>
            <p className="mt-3 max-w-2xl text-lg leading-relaxed text-text-secondary">
              Fajr, Sunrise, Dhuhr, Asr, Maghrib and Isha for your location. Allow location
              in the browser for the most accurate adhan schedule, then pick the calculation
              method your local mosque uses when you have a choice.
            </p>
            <div className="mt-8">
              <TodayForYouServer locale="en" />
            </div>
          </div>
        </section>

        <section className="pb-20">
          <div className="container mx-auto max-w-3xl space-y-8">
            <article className="rounded-3xl border border-border bg-bg-card p-6 md:p-8">
              <h2 className="font-display text-2xl font-black text-text-primary">
                What each prayer marks
              </h2>
              <ul className="mt-4 space-y-3 leading-relaxed text-text-secondary">
                <li>
                  <strong className="text-text-primary">Fajr</strong> — dawn prayer, before
                  sunrise.
                </li>
                <li>
                  <strong className="text-text-primary">Dhuhr</strong> — after the sun passes
                  its zenith.
                </li>
                <li>
                  <strong className="text-text-primary">Asr</strong> — mid-afternoon; Hanafi
                  and other schools differ on the shadow length used.
                </li>
                <li>
                  <strong className="text-text-primary">Maghrib</strong> — just after sunset.
                </li>
                <li>
                  <strong className="text-text-primary">Isha</strong> — night prayer, after
                  twilight disappears (definition varies by method).
                </li>
              </ul>
            </article>

            <article className="rounded-3xl border border-border bg-bg-card p-6 md:p-8">
              <h2 className="font-display text-2xl font-black text-text-primary">
                Calculation methods in short
              </h2>
              <p className="mt-3 leading-relaxed text-text-secondary">
                Common options include Umm al-Qura (Makkah), Muslim World League, Egyptian
                General Authority, and ISNA. They disagree most on how early Fajr is and when
                Isha begins. If your city mosque publishes a timetable, match that method
                here so your phone and the masjid stay aligned.
              </p>
            </article>

            <div className="flex flex-wrap gap-3">
              <Link
                href="/learn/islamic-calendar"
                className="rounded-full bg-[#173640] px-5 py-3 text-sm font-semibold text-white"
              >
                Islamic calendar
              </Link>
              <Link
                href="/learn/duas"
                className="rounded-full border border-border bg-bg-card px-5 py-3 text-sm font-semibold text-text-primary"
              >
                Duas & Athkar
              </Link>
              <Link
                href="/learn/ramadan"
                className="rounded-full border border-border bg-bg-card px-5 py-3 text-sm font-semibold text-text-primary"
              >
                Ramadan guide
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
