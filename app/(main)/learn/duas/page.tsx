import { duas, duaCategories } from "@/data/duas";
import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Duas & Athkar | Islamic Supplications for Everyday Life",
  description:
    "Read duas and athkar for everyday moments. Morning and evening remembrance, travel, sleep, food and specific situations.",
};

export default async function DuasPage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-gradient-to-b from-[#f7f2e7] via-[#f9f6f1] to-[#f2f1e8]">
      {/* Ambient background */}
      <div className="pointer-events-none fixed inset-0">
        <div className="absolute right-[-8rem] top-[8rem] h-[32rem] w-[32rem] rounded-full bg-[radial-gradient(circle,rgba(139,123,186,0.06),transparent_65%)] blur-3xl" />
        <div className="absolute left-[-12rem] top-[28rem] h-[36rem] w-[36rem] rounded-full bg-[radial-gradient(circle,rgba(75,122,136,0.08),transparent_68%)] blur-3xl" />
      </div>

      <div className="container relative z-10 mx-auto max-w-5xl px-6 py-32">
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
        <div className="mb-12">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-[rgba(75,110,112,0.08)] px-4 py-1.5">
            <svg
              className="h-4 w-4 text-[#4B6E70]"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
              />
            </svg>
            <span className="text-xs font-bold uppercase tracking-wider text-[#4B6E70]">
              Daily Remembrance
            </span>
          </div>

          <h1 className="mb-6 text-[clamp(2.5rem,7vw,4rem)] font-black font-display leading-[0.95] tracking-tight text-text-primary">
            Duas & Athkar
          </h1>

          <p className="max-w-3xl text-lg leading-relaxed text-text-secondary">
            Supplications for everyday moments and specific situations. Read here when you
            need them, or use the app for quicker daily access.
          </p>
        </div>

        {/* Quick Navigation */}
        <div className="mb-12 rounded-3xl border border-[rgba(47,37,30,0.08)] bg-white/60 p-6 shadow-[0_4px_24px_rgba(43,34,24,0.04)] backdrop-blur-sm">
          <p className="mb-4 text-sm font-bold text-text-primary">Jump to category</p>
          <div className="flex flex-wrap gap-2">
            {duaCategories.map((category) => (
              <a
                key={category.id}
                href={`#${category.id}`}
                className="rounded-full border border-[rgba(47,37,30,0.1)] bg-white px-4 py-2 text-sm font-semibold text-text-primary transition-colors hover:border-primary hover:bg-[rgba(244,185,66,0.04)]"
              >
                {category.name}
              </a>
            ))}
          </div>
        </div>

        {/* Duas by Category */}
        <div className="space-y-16">
          {duaCategories.map((category) => {
            const categoryDuas = duas.filter((d) => d.categoryId === category.id);
            if (categoryDuas.length === 0) return null;

            return (
              <section key={category.id} id={category.id} className="scroll-mt-32">
                <div className="mb-6">
                  <h2 className="mb-2 text-3xl font-black font-display text-text-primary">
                    {category.name}
                  </h2>
                  <p className="leading-relaxed text-text-secondary">{category.intro}</p>
                </div>

                <div className="space-y-6">
                  {categoryDuas.map((dua) => (
                    <article
                      key={dua.id}
                      className="overflow-hidden rounded-3xl border border-[rgba(47,37,30,0.08)] bg-white/80 shadow-[0_4px_24px_rgba(43,34,24,0.04)] backdrop-blur-sm"
                    >
                      <div className="space-y-6 p-8">
                        {/* Arabic Text */}
                        <div
                          className="text-right text-3xl font-bold font-display leading-loose text-text-primary md:text-4xl"
                          dir="rtl"
                        >
                          {dua.arabic}
                        </div>

                        {/* Transliteration */}
                        <div className="rounded-2xl border border-[rgba(75,110,112,0.1)] bg-[rgba(75,110,112,0.04)] p-4">
                          <p className="text-sm font-semibold uppercase tracking-wider text-[#4B6E70] mb-2">
                            Transliteration
                          </p>
                          <p className="text-lg font-medium leading-relaxed text-[#4B6E70]">
                            {dua.transliteration}
                          </p>
                        </div>

                        {/* Translation */}
                        <div>
                          <p className="mb-1 text-xs font-bold uppercase tracking-wider text-text-secondary">
                            Translation
                          </p>
                          <p className="text-base italic leading-relaxed text-text-secondary">
                            "{dua.translation}"
                          </p>
                        </div>
                      </div>
                    </article>
                  ))}
                </div>
              </section>
            );
          })}
        </div>

        {/* App Continuation Block */}
        <div className="mt-16 overflow-hidden rounded-3xl border border-[rgba(244,185,66,0.15)] bg-gradient-to-br from-[rgba(244,185,66,0.06)] to-white/80 shadow-[0_8px_32px_rgba(43,34,24,0.06)] backdrop-blur-sm">
          <div className="p-8 md:p-10">
            <div className="mb-6 flex items-start justify-between gap-4">
              <div>
                <p className="mb-2 text-xs font-bold uppercase tracking-wider text-primary">
                  For Daily Use
                </p>
                <h2 className="mb-4 text-2xl font-bold font-display text-text-primary md:text-3xl">
                  Need duas more often?
                </h2>
                <p className="max-w-2xl leading-relaxed text-text-secondary">
                  The website works well for reading and discovery. For quicker access in
                  everyday moments, the app brings duas together with prayer times and halal
                  checking in one place.
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
        <div className="mt-12 rounded-3xl border border-[rgba(47,37,30,0.08)] bg-white/60 p-8 shadow-[0_4px_24px_rgba(43,34,24,0.04)] backdrop-blur-sm">
          <h3 className="mb-6 text-xl font-bold text-text-primary">Continue learning</h3>
          <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
            {[
              {
                label: "99 Names of Allah",
                href: "/learn/99-names",
                description: "For reflection and memorization",
              },
              {
                label: "Islamic Calendar",
                href: "/learn/islamic-calendar",
                description: "Check dates and context",
              },
              {
                label: "Prayer Times",
                href: "/prayer-times",
                description: "Find accurate prayer times",
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
