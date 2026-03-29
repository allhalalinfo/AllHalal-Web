import type { Metadata } from "next";
import Link from "next/link";
import AppPromoMini from "@/components/ui/AppPromoMini";
import FAQSchema from "@/components/seo/FAQSchema";
import { SITE_URL } from "@/lib/seo/metadata";

export const metadata: Metadata = {
  title: "Learn Islam | Duas, 99 Names, Ramadan Guides & Islamic Calendar",
  description:
    "Islamic learning hub with duas, 99 Names of Allah, Ramadan guidance, Islamic calendar and live Makkah resources.",
  keywords: [
    "learn islam",
    "duas and athkar",
    "99 names of Allah",
    "Ramadan guide",
    "Islamic calendar",
    "Islamic learning",
  ],
  openGraph: {
    title: "Learn Islam | Duas, 99 Names, Ramadan Guides & Islamic Calendar",
    description:
      "Islamic learning hub for duas, 99 Names of Allah, Ramadan guidance and Islamic calendar.",
    type: "website",
  },
};

const learnFaqs = [
  {
    question: "What can I learn here?",
    answer:
      "You can read duas for everyday life, explore the 99 Names of Allah, follow Ramadan guidance and check Islamic calendar dates.",
  },
  {
    question: "Where should I start?",
    answer:
      "Most people start with Duas if they need something practical right away, or 99 Names for reflection. Ramadan and calendar pages are useful when timing matters.",
  },
  {
    question: "Is this only for Ramadan?",
    answer:
      "No. Ramadan is one important section, but this hub works year round for daily remembrance and Islamic context.",
  },
  {
    question: "What is better in the app?",
    answer:
      "The app is faster for repeated use. If you need duas every day, barcode scanning or prayer times with Islamic calendar context, the app brings it all together in one place.",
  },
  {
    question: "Can I use this for daily remembrance?",
    answer:
      "Yes. Duas and 99 Names pages are designed to be useful more than once. You can bookmark them and come back when needed.",
  },
];

const learnSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebPage",
      "@id": `${SITE_URL}/learn#webpage`,
      url: `${SITE_URL}/learn`,
      name: "Learn Islam on allhalal.info",
      description:
        "Islamic learning hub for duas, 99 Names of Allah, Ramadan guidance and Islamic calendar.",
      isPartOf: { "@id": `${SITE_URL}/#website` },
      inLanguage: "en",
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Home",
          item: `${SITE_URL}`,
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "Learn",
          item: `${SITE_URL}/learn`,
        },
      ],
    },
  ],
};

export const revalidate = 3600; // Cache for 1 hour (content is evergreen)

export default async function LearnHub() {
  const corePages = [
    {
      title: "Duas & Athkar",
      description: "Supplications for everyday moments and specific situations.",
      useCase: "Quick access when you need the right dua",
      href: "/learn/duas",
      icon: (
        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
          />
        </svg>
      ),
      gradient: "from-[#325349] to-[#4F7367]",
    },
    {
      title: "99 Names of Allah",
      description: "Names, meanings and context for reflection and memorization.",
      useCase: "Study and repeat as part of devotional practice",
      href: "/learn/99-names",
      icon: (
        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
          />
        </svg>
      ),
      gradient: "from-[#49657A] to-[#708CA0]",
    },
    {
      title: "Ramadan & Fasting",
      description: "Guidance, rulings and duas for the holy month.",
      useCase: "Seasonal use during Ramadan and for fasting prep",
      href: "/learn/ramadan",
      icon: (
        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
          />
        </svg>
      ),
      gradient: "from-[#7A523B] to-[#A56D4C]",
    },
    {
      title: "Islamic Calendar",
      description: "Hijri dates, important events and yearly context.",
      useCase: "Check dates and understand Islamic timing",
      href: "/learn/islamic-calendar",
      icon: (
        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
          />
        </svg>
      ),
      gradient: "from-[#4E5E3E] to-[#73815D]",
    },
  ];

  return (
    <main className="relative min-h-screen overflow-hidden bg-gradient-to-b from-[#f7f2e7] via-[#f9f6f1] to-[#f2f1e8]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(learnSchema) }}
      />
      <FAQSchema faqs={learnFaqs} />

      {/* Ambient background */}
      <div className="pointer-events-none fixed inset-0">
        <div className="absolute right-[-8rem] top-[8rem] h-[32rem] w-[32rem] rounded-full bg-[radial-gradient(circle,rgba(139,123,186,0.06),transparent_65%)] blur-3xl" />
        <div className="absolute left-[-12rem] top-[28rem] h-[36rem] w-[36rem] rounded-full bg-[radial-gradient(circle,rgba(75,122,136,0.08),transparent_68%)] blur-3xl" />
        <div className="absolute right-[-10rem] bottom-[8rem] h-[28rem] w-[28rem] rounded-full bg-[radial-gradient(circle,rgba(89,113,77,0.07),transparent_62%)] blur-3xl" />
      </div>

      <div className="container relative z-10 mx-auto max-w-6xl px-6 py-32">
        {/* Hero Section */}
        <div className="mb-16">
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
              Islamic Learning
            </span>
          </div>

          <h1 className="mb-6 text-[clamp(2.5rem,7vw,4.5rem)] font-black font-display leading-[0.95] tracking-tight text-text-primary">
            Learn Islam through pages worth keeping close
          </h1>

          <p className="mb-8 max-w-3xl text-lg leading-relaxed text-text-secondary">
            Duas, 99 Names, Ramadan guidance and the Islamic calendar in one place. Read
            here, return when needed, or use the app for daily access.
          </p>

          <div className="flex flex-wrap gap-3">
            <Link
              href="/learn/duas"
              className="inline-flex items-center gap-2 rounded-full bg-gradient-gold px-6 py-3 font-bold text-[#4A3319] shadow-[0_8px_24px_rgba(176,144,98,0.25)] transition-transform hover:-translate-y-0.5"
            >
              Start with Duas
            </Link>
            <Link
              href="/learn/99-names"
              className="inline-flex items-center gap-2 rounded-full border border-[rgba(47,37,30,0.15)] bg-white/80 px-6 py-3 font-semibold text-text-primary backdrop-blur-sm transition-colors hover:bg-white"
            >
              Explore 99 Names
            </Link>
            <Link
              href="/learn/islamic-calendar"
              className="inline-flex items-center gap-2 rounded-full border border-[rgba(47,37,30,0.15)] bg-white/80 px-6 py-3 font-semibold text-text-primary backdrop-blur-sm transition-colors hover:bg-white"
            >
              Open Calendar
            </Link>
          </div>
        </div>

        {/* Start Here - New Users Guide */}
        <section className="mb-12 rounded-3xl border border-[rgba(47,37,30,0.08)] bg-white/60 p-8 shadow-[0_8px_32px_rgba(43,34,24,0.04)] backdrop-blur-sm md:p-10">
          <div className="mb-6 flex items-start justify-between gap-4">
            <div>
              <p className="mb-2 text-xs font-bold uppercase tracking-wider text-primary">
                Start Here
              </p>
              <h2 className="text-2xl font-bold font-display text-text-primary md:text-3xl">
                New to this section?
              </h2>
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            <div className="rounded-2xl border border-[rgba(47,37,30,0.08)] bg-gradient-to-br from-white to-[rgba(244,185,66,0.04)] p-5">
              <div className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-[rgba(244,185,66,0.12)] text-primary">
                <span className="text-lg font-black">1</span>
              </div>
              <h3 className="mb-2 font-bold text-text-primary">Start with Duas</h3>
              <p className="text-sm leading-relaxed text-text-secondary">
                If you need something practical for everyday life
              </p>
            </div>

            <div className="rounded-2xl border border-[rgba(47,37,30,0.08)] bg-gradient-to-br from-white to-[rgba(75,110,112,0.04)] p-5">
              <div className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-[rgba(75,110,112,0.12)] text-[#4B6E70]">
                <span className="text-lg font-black">2</span>
              </div>
              <h3 className="mb-2 font-bold text-text-primary">Then explore 99 Names</h3>
              <p className="text-sm leading-relaxed text-text-secondary">
                For reflection and deeper study at your own pace
              </p>
            </div>

            <div className="rounded-2xl border border-[rgba(47,37,30,0.08)] bg-gradient-to-br from-white to-[rgba(122,82,59,0.04)] p-5">
              <div className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-[rgba(122,82,59,0.12)] text-[#7A523B]">
                <span className="text-lg font-black">3</span>
              </div>
              <h3 className="mb-2 font-bold text-text-primary">Use Ramadan & Calendar</h3>
              <p className="text-sm leading-relaxed text-text-secondary">
                When timing matters or a sacred season arrives
              </p>
            </div>
          </div>
        </section>

        {/* Core Learning Sections */}
        <section className="mb-12">
          <div className="mb-8">
            <p className="mb-2 text-xs font-bold uppercase tracking-wider text-primary">
              Core Pages
            </p>
            <h2 className="text-3xl font-black font-display text-text-primary">
              Four main sections
            </h2>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {corePages.map((page) => (
              <Link
                key={page.href}
                href={page.href}
                className="group block overflow-hidden rounded-3xl border border-[rgba(47,37,30,0.08)] bg-white/80 shadow-[0_4px_24px_rgba(43,34,24,0.04)] backdrop-blur-sm transition-all hover:border-[rgba(47,37,30,0.15)] hover:shadow-[0_8px_32px_rgba(43,34,24,0.08)]"
              >
                <div className={`bg-gradient-to-br ${page.gradient} p-6 text-white`}>
                  <div className="mb-3 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-white/20">
                    {page.icon}
                  </div>
                  <h3 className="mb-2 text-2xl font-black font-display">{page.title}</h3>
                  <p className="text-sm leading-relaxed text-white/90">{page.description}</p>
                </div>
                <div className="p-6">
                  <p className="text-sm text-text-secondary">
                    <span className="font-semibold text-text-primary">Use case:</span>{" "}
                    {page.useCase}
                  </p>
                  <div className="mt-4 flex items-center gap-2 font-semibold text-primary group-hover:gap-3 transition-all">
                    Open page
                    <svg
                      className="h-4 w-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M14 5l7 7m0 0l-7 7m7-7H3"
                      />
                    </svg>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Website vs App Section */}
        <section className="mb-12 grid gap-6 lg:grid-cols-2">
          <div className="rounded-3xl border border-[rgba(47,37,30,0.08)] bg-white/80 p-8 shadow-[0_4px_24px_rgba(43,34,24,0.04)] backdrop-blur-sm">
            <div className="mb-6">
              <p className="mb-2 text-xs font-bold uppercase tracking-wider text-[#4B6E70]">
                Website
              </p>
              <h3 className="text-2xl font-bold font-display text-text-primary">
                Best for reading and browsing
              </h3>
            </div>

            <ul className="space-y-3">
              {[
                "Structured learning when you have time",
                "Discovering new topics and exploring pages",
                "Reading longer content on larger screens",
                "Bookmarking specific sections to return later",
              ].map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <svg
                    className="mt-0.5 h-5 w-5 flex-shrink-0 text-[#4B6E70]"
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

          <div className="rounded-3xl border border-[rgba(244,185,66,0.15)] bg-gradient-to-br from-[rgba(244,185,66,0.06)] to-white/80 p-8 shadow-[0_4px_24px_rgba(43,34,24,0.04)] backdrop-blur-sm">
            <div className="mb-6">
              <p className="mb-2 text-xs font-bold uppercase tracking-wider text-primary">
                App
              </p>
              <h3 className="text-2xl font-bold font-display text-text-primary">
                Best for daily use and quick access
              </h3>
            </div>

            <ul className="mb-6 space-y-3">
              {[
                "Duas when you need them in ordinary moments",
                "Barcode scanning for instant halal checking",
                "Prayer times with Islamic calendar context",
                "Everything in one place without switching apps",
              ].map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <svg
                    className="mt-0.5 h-5 w-5 flex-shrink-0 text-primary"
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

            <Link
              href="/app"
              className="inline-flex items-center gap-2 rounded-full bg-gradient-gold px-5 py-2.5 text-sm font-bold text-[#4A3319] shadow-[0_4px_16px_rgba(176,144,98,0.2)] transition-transform hover:-translate-y-0.5"
            >
              Learn about the app
              <svg
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M14 5l7 7m0 0l-7 7m7-7H3"
                />
              </svg>
            </Link>
          </div>
        </section>

        {/* Supporting Section - Live Makkah */}
        <section className="mb-12 overflow-hidden rounded-3xl border border-[rgba(47,37,30,0.08)] bg-gradient-to-br from-[#30231E] to-[#594138] text-white shadow-[0_8px_32px_rgba(43,34,24,0.12)]">
          <div className="p-8 md:p-10">
            <div className="mb-6">
              <p className="mb-2 text-xs font-bold uppercase tracking-wider text-[#F6D48B]">
                Sacred Places
              </p>
              <h2 className="mb-4 text-3xl font-black font-display">Makkah & Madinah Live</h2>
              <p className="max-w-2xl leading-relaxed text-white/80">
                Not a learning page in the traditional sense, but a spiritual connection
                point. Useful during Hajj season and for moments of reflection.
              </p>
            </div>

            <Link
              href="/learn/live-makkah"
              className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-5 py-2.5 text-sm font-semibold transition-colors hover:bg-white/15"
            >
              Open live streams
              <svg
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M14 5l7 7m0 0l-7 7m7-7H3"
                />
              </svg>
            </Link>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="mb-12 grid gap-6 lg:grid-cols-[1fr_0.9fr]">
          <div className="rounded-3xl border border-[rgba(47,37,30,0.08)] bg-white/80 p-8 shadow-[0_4px_24px_rgba(43,34,24,0.04)] backdrop-blur-sm">
            <div className="mb-6">
              <p className="mb-2 text-xs font-bold uppercase tracking-wider text-primary">
                Questions
              </p>
              <h2 className="text-3xl font-black font-display text-text-primary">
                Common questions
              </h2>
            </div>

            <div className="space-y-4">
              {learnFaqs.map((faq) => (
                <details
                  key={faq.question}
                  className="group rounded-2xl border border-[rgba(47,37,30,0.08)] bg-white/60 p-5"
                >
                  <summary className="flex cursor-pointer items-center justify-between gap-4 font-bold text-text-primary">
                    <span>{faq.question}</span>
                    <svg
                      className="h-5 w-5 flex-shrink-0 text-primary transition-transform group-open:rotate-180"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </summary>
                  <p className="mt-4 text-sm leading-relaxed text-text-secondary">
                    {faq.answer}
                  </p>
                </details>
              ))}
            </div>
          </div>

          <div className="flex flex-col justify-between rounded-3xl border border-[rgba(47,37,30,0.08)] bg-white/80 p-8 shadow-[0_4px_24px_rgba(43,34,24,0.04)] backdrop-blur-sm">
            <div>
              <div className="mb-6">
                <p className="mb-2 text-xs font-bold uppercase tracking-wider text-primary">
                  Connected Pages
                </p>
                <h3 className="text-2xl font-bold font-display text-text-primary">
                  Learning works better when connected to the rest
                </h3>
              </div>

              <p className="mb-6 text-sm leading-relaxed text-text-secondary">
                Islamic learning should stay close to prayer times, halal guides and Muslim
                news. It is all part of the same rhythm.
              </p>
            </div>

            <div className="space-y-3">
              {[
                { label: "Prayer times", href: "/prayer-times" },
                { label: "Halal guides", href: "/is-it-halal" },
                { label: "Muslim news", href: "/news" },
                { label: "Homepage", href: "/" },
              ].map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="block rounded-2xl border border-[rgba(47,37,30,0.08)] bg-white/60 p-4 font-semibold text-text-primary transition-colors hover:border-primary hover:bg-[rgba(244,185,66,0.04)]"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
