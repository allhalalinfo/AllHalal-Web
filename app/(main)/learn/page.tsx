import type { Metadata } from "next";
import Link from "next/link";
import AppPromoMini from "@/components/ui/AppPromoMini";
import { SITE_URL } from "@/lib/seo/metadata";
import { fetchCustomArticlesList } from "@/lib/customArticles";
import CustomArticleGridCard from "@/components/articles/CustomArticleGridCard";

export const metadata: Metadata = {
  title: "Blog | Islamic Articles, Faith Guides & Muslim Lifestyle",
  description:
    "Read in-depth articles on Islamic topics, faith guidance, Muslim lifestyle and spiritual reflection.",
  keywords: [
    "islamic blog",
    "muslim articles",
    "faith guides",
    "islamic lifestyle",
    "duas and athkar",
    "99 names of Allah",
    "Ramadan guide",
    "Islamic calendar",
  ],
  openGraph: {
    title: "Blog | Islamic Articles, Faith Guides & Muslim Lifestyle",
    description:
      "In-depth articles on Islamic topics, faith guidance and Muslim lifestyle.",
    type: "website",
  },
};

const learnSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebPage",
      "@id": `${SITE_URL}/learn#webpage`,
      url: `${SITE_URL}/learn`,
      name: "Blog - allhalal.info",
      description:
        "Islamic blog with articles on faith, lifestyle guidance and Muslim topics.",
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
          name: "Blog",
          item: `${SITE_URL}/learn`,
        },
      ],
    },
  ],
};

export const revalidate = 3600; // Cache for 1 hour (content is evergreen)

export default async function LearnHub() {
  // Fetch articles with category "blog"
  const articlesList = await fetchCustomArticlesList({ page: 1, limit: 50 });
  const blogArticles = articlesList.articles.filter(
    (article) => article.category === "blog"
  );

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
              Blog & Learning
            </span>
          </div>

          <h1 className="mb-6 text-[clamp(2.5rem,7vw,4.5rem)] font-black font-display leading-[0.95] tracking-tight text-text-primary">
            Islamic blog and learning resources
          </h1>

          <p className="mb-8 max-w-3xl text-lg leading-relaxed text-text-secondary">
            Articles, duas, 99 Names, Ramadan guidance and the Islamic calendar. Read here or use the app for daily access.
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

        {/* Blog Articles Section */}
        {blogArticles.length > 0 && (
          <section className="mb-12">
            <div className="mb-8">
              <p className="mb-2 text-xs font-bold uppercase tracking-wider text-primary">
                Latest articles
              </p>
              <h2 className="text-3xl font-black font-display text-text-primary">
                Blog posts
              </h2>
              <p className="mt-2 text-text-secondary">
                In-depth articles on Islamic topics, lifestyle guidance and faith reflections.
              </p>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {blogArticles.map((article, index) => (
                <CustomArticleGridCard
                  key={article.id}
                  article={article}
                  locale="en"
                  priority={index < 3}
                />
              ))}
            </div>
          </section>
        )}

        {/* Core Learning Sections */}
        <section className="mb-12">
          <div className="mb-8">
            <p className="mb-2 text-xs font-bold uppercase tracking-wider text-primary">
              Core Resources
            </p>
            <h2 className="text-3xl font-black font-display text-text-primary">
              Learning pages
            </h2>
            <p className="mt-2 text-text-secondary">
              Duas, 99 Names, Ramadan guidance and Islamic calendar for reference and reflection.
            </p>
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
      </div>
    </main>
  );
}
