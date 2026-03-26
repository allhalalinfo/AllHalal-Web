import { namesOfAllah } from "@/data/namesOfAllah";
import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "99 Names of Allah | Learn and Reflect on Allah's Beautiful Names",
  description:
    "Explore the 99 Names of Allah with Arabic, transliteration, meanings and explanations. A devotional page for study and reflection.",
};

export default async function NamesOfAllahPage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-gradient-to-b from-[#f7f2e7] via-[#f9f6f1] to-[#f2f1e8]">
      {/* Ambient background */}
      <div className="pointer-events-none fixed inset-0">
        <div className="absolute right-[-8rem] top-[8rem] h-[32rem] w-[32rem] rounded-full bg-[radial-gradient(circle,rgba(139,123,186,0.06),transparent_65%)] blur-3xl" />
        <div className="absolute left-[-12rem] top-[28rem] h-[36rem] w-[36rem] rounded-full bg-[radial-gradient(circle,rgba(75,122,136,0.08),transparent_68%)] blur-3xl" />
        <div className="absolute right-[-10rem] bottom-[8rem] h-[28rem] w-[28rem] rounded-full bg-[radial-gradient(circle,rgba(89,113,77,0.07),transparent_62%)] blur-3xl" />
      </div>

      <div className="container relative z-10 mx-auto max-w-7xl px-6 py-32">
        {/* Breadcrumb */}
        <Link
          href="/learn"
          className="mb-8 inline-flex items-center gap-2 text-sm font-semibold text-primary hover:underline"
        >
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to Learn
        </Link>

        {/* Page Header */}
        <div className="mb-12 text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-[rgba(73,101,122,0.08)] px-4 py-1.5">
            <svg
              className="h-4 w-4 text-[#49657A]"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
              />
            </svg>
            <span className="text-xs font-bold uppercase tracking-wider text-[#49657A]">
              Devotional Study
            </span>
          </div>

          <h1 className="mb-6 text-[clamp(2.5rem,7vw,4rem)] font-black font-display leading-[0.95] tracking-tight text-text-primary">
            99 Names of Allah
          </h1>

          <p className="mx-auto max-w-3xl text-lg leading-relaxed text-text-secondary">
            Learn, reflect and memorize the beautiful names of Allah. Each name reveals an
            aspect of His nature and helps deepen understanding.
          </p>
        </div>

        {/* Introduction Section */}
        <div className="mb-12 rounded-3xl border border-[rgba(47,37,30,0.08)] bg-white/60 p-8 shadow-[0_8px_32px_rgba(43,34,24,0.04)] backdrop-blur-sm md:p-10">
          <div className="grid gap-8 lg:grid-cols-2">
            <div>
              <h2 className="mb-4 text-2xl font-bold font-display text-text-primary">
                What are the 99 Names?
              </h2>
              <p className="mb-4 leading-relaxed text-text-secondary">
                The 99 Names of Allah (Asma ul Husna) are the divine names that describe
                Allah's attributes and qualities. Learning and reflecting on these names is
                an act of worship and helps Muslims understand and connect with Allah.
              </p>
              <p className="leading-relaxed text-text-secondary">
                The Prophet Muhammad (peace be upon him) said that whoever memorizes and
                acts upon these names will enter Paradise.
              </p>
            </div>

            <div className="rounded-2xl border border-[rgba(73,101,122,0.12)] bg-gradient-to-br from-[rgba(73,101,122,0.06)] to-transparent p-6">
              <h3 className="mb-4 text-lg font-bold text-text-primary">How to use this page</h3>
              <ul className="space-y-3">
                {[
                  "Read through the names and their meanings",
                  "Reflect on how each name relates to your life",
                  "Memorize a few names at a time",
                  "Return often for continued study",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <svg
                      className="mt-0.5 h-5 w-5 flex-shrink-0 text-[#49657A]"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    <span className="text-sm leading-relaxed text-text-secondary">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Names Grid */}
        <div className="mb-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {namesOfAllah.map((name) => (
            <article
              key={name.id}
              className="group overflow-hidden rounded-3xl border border-[rgba(47,37,30,0.08)] bg-white/80 shadow-[0_4px_24px_rgba(43,34,24,0.04)] backdrop-blur-sm transition-all hover:border-[rgba(73,101,122,0.2)] hover:shadow-[0_8px_32px_rgba(43,34,24,0.08)]"
            >
              <div className="flex flex-col items-center p-8 text-center">
                {/* Number Badge */}
                <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-full bg-[rgba(73,101,122,0.08)] text-sm font-bold text-[#49657A]">
                  {name.id}
                </div>

                {/* Arabic Name */}
                <div
                  className="mb-4 text-4xl font-bold font-display text-text-primary transition-colors group-hover:text-[#49657A]"
                  dir="rtl"
                >
                  {name.arabic}
                </div>

                {/* Transliteration */}
                <div className="mb-3 text-xl font-semibold text-primary">
                  {name.transliteration}
                </div>

                {/* Meaning */}
                <div className="mb-4 text-base font-medium text-text-primary">
                  {name.meaning}
                </div>

                {/* Explanation */}
                <p className="text-sm leading-relaxed text-text-secondary">{name.explanation}</p>
              </div>
            </article>
          ))}
        </div>

        {/* App Continuation Block */}
        <div className="mb-12 overflow-hidden rounded-3xl border border-[rgba(244,185,66,0.15)] bg-gradient-to-br from-[rgba(244,185,66,0.06)] to-white/80 shadow-[0_8px_32px_rgba(43,34,24,0.06)] backdrop-blur-sm">
          <div className="p-8 md:p-10">
            <div className="mb-6 flex items-start justify-between gap-4">
              <div>
                <p className="mb-2 text-xs font-bold uppercase tracking-wider text-primary">
                  For Repeat Visits
                </p>
                <h2 className="mb-4 text-2xl font-bold font-display text-text-primary md:text-3xl">
                  Want easier daily reflection?
                </h2>
                <p className="max-w-2xl leading-relaxed text-text-secondary">
                  This page works well for reading and study. For easier repeat visits and
                  mobile access throughout the day, the app keeps the 99 Names close alongside
                  duas and prayer times.
                </p>
              </div>
            </div>

            <Link
              href="/app"
              className="inline-flex items-center gap-2 rounded-full bg-gradient-gold px-6 py-3 font-bold text-[#4A3319] shadow-[0_8px_24px_rgba(176,144,98,0.25)] transition-transform hover:-translate-y-0.5"
            >
              Learn about the app
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M14 5l7 7m0 0l-7 7m7-7H3"
                />
              </svg>
            </Link>
          </div>
        </div>

        {/* Related Pages */}
        <div className="rounded-3xl border border-[rgba(47,37,30,0.08)] bg-white/60 p-8 shadow-[0_4px_24px_rgba(43,34,24,0.04)] backdrop-blur-sm">
          <h3 className="mb-6 text-xl font-bold text-text-primary">Continue learning</h3>
          <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
            {[
              {
                label: "Duas & Athkar",
                href: "/learn/duas",
                description: "Daily supplications and remembrance",
              },
              {
                label: "Islamic Calendar",
                href: "/learn/islamic-calendar",
                description: "Hijri dates and sacred context",
              },
              {
                label: "Ramadan Guide",
                href: "/learn/ramadan",
                description: "Fasting guidance and supplications",
              },
            ].map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="block rounded-2xl border border-[rgba(47,37,30,0.08)] bg-white/80 p-5 transition-all hover:border-primary hover:bg-[rgba(244,185,66,0.04)] hover:shadow-md"
              >
                <p className="mb-1 font-bold text-text-primary">{link.label}</p>
                <p className="text-sm text-text-secondary">{link.description}</p>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
