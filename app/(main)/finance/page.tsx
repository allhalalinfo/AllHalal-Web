import type { Metadata } from "next";
import Link from "next/link";
import FAQSchema from "@/components/seo/FAQSchema";
import { SITE_URL } from "@/lib/seo/metadata";
import { fetchCustomArticlesList } from "@/lib/customArticles";
import CustomArticleGridCard from "@/components/articles/CustomArticleGridCard";

export const metadata: Metadata = {
  title: "Halal Finance Hub | Zakat, Investing, Mortgages & Islamic Banking",
  description:
    "Muslim finance guidance for zakat calculation, halal investing, Islamic banking and home financing. Clear routes for real financial decisions.",
  keywords: [
    "halal finance",
    "Islamic finance",
    "zakat calculator",
    "halal investing",
    "Islamic banking",
    "halal mortgage",
  ],
  openGraph: {
    title: "Halal Finance Hub | Zakat, Investing, Mortgages & Islamic Banking",
    description:
      "Muslim finance hub for zakat, halal investing, Islamic banking and halal mortgage guidance.",
    type: "website",
  },
};

const financeFaqs = [
  {
    question: "Where should I start?",
    answer:
      "If you need to calculate an obligation, start with the zakat calculator. For growing wealth, start with halal investing. For major decisions like home financing, go to mortgages. For everyday account questions, go to Islamic banking.",
  },
  {
    question: "Is this section only for advanced investors?",
    answer:
      "No. This section covers everyday needs like zakat and banking questions, alongside investing and home financing for those making larger decisions.",
  },
  {
    question: "What can I calculate or compare here?",
    answer:
      "You can calculate zakat with live Nisab thresholds, learn screening logic for halal investing, compare Islamic mortgage structures and understand Islamic banking options.",
  },
  {
    question: "What is the difference between these pages?",
    answer:
      "Zakat is an annual obligation. Investing is about growing wealth carefully. Banking covers everyday money infrastructure. Mortgages are for major home financing decisions. Each has different use cases.",
  },
  {
    question: "Is this financial advice?",
    answer:
      "No. This is educational content to help you understand concepts, options and tradeoffs. For personal financial advice, consult a qualified professional.",
  },
];

const financeSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebPage",
      "@id": `${SITE_URL}/finance#webpage`,
      url: `${SITE_URL}/finance`,
      name: "Halal Finance Hub",
      description:
        "Finance hub for zakat, halal investing, Islamic banking and halal mortgage guidance.",
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
          name: "Finance",
          item: `${SITE_URL}/finance`,
        },
      ],
    },
  ],
};

export const revalidate = 3600; // Cache for 1 hour (static hub)

export default async function FinanceHub() {
  // Fetch articles with category "finance"
  const articlesList = await fetchCustomArticlesList({ page: 1, limit: 50 });
  const financeArticles = articlesList.articles.filter(
    (article) => article.category === "finance"
  );

  const corePages = [
    {
      title: "Zakat Calculator",
      description: "Calculate zakat with live Nisab reference",
      useCase: "Annual obligation",
      practical: "Tool with current gold and silver thresholds",
      href: "/finance/zakat-calculator",
      icon: (
        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z"
          />
        </svg>
      ),
      gradient: "from-[#2A5C58] to-[#3A7C77]",
    },
    {
      title: "Halal Investing",
      description: "Understand Shariah-compliant investing before you buy",
      useCase: "Wealth building",
      practical: "Screening logic, ETFs and beginner entry points",
      href: "/finance/investing",
      icon: (
        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
          />
        </svg>
      ),
      gradient: "from-[#3A526A] to-[#57738C]",
    },
    {
      title: "Halal Mortgages",
      description: "Compare Islamic home financing structures",
      useCase: "Major life decision",
      practical: "Contract models, providers and realistic context",
      href: "/finance/mortgages",
      icon: (
        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
          />
        </svg>
      ),
      gradient: "from-[#6B4A37] to-[#93644B]",
    },
    {
      title: "Islamic Banking",
      description: "See Islamic banking and account options",
      useCase: "Everyday money",
      practical: "Accounts, institutions and practical clarity",
      href: "/finance/banks",
      icon: (
        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
          />
        </svg>
      ),
      gradient: "from-[#556343] to-[#7B8B64]",
    },
  ];

  return (
    <main className="relative min-h-screen overflow-hidden bg-gradient-to-b from-[#f7f2e7] via-[#f9f6f1] to-[#f2f1e8]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(financeSchema) }}
      />
      <FAQSchema faqs={financeFaqs} />

      {/* Ambient background */}
      <div className="pointer-events-none fixed inset-0">
        <div className="absolute right-[-8rem] top-[8rem] h-[32rem] w-[32rem] rounded-full bg-[radial-gradient(circle,rgba(42,92,88,0.06),transparent_65%)] blur-3xl" />
        <div className="absolute left-[-12rem] top-[28rem] h-[36rem] w-[36rem] rounded-full bg-[radial-gradient(circle,rgba(75,122,136,0.08),transparent_68%)] blur-3xl" />
        <div className="absolute right-[-10rem] bottom-[8rem] h-[28rem] w-[28rem] rounded-full bg-[radial-gradient(circle,rgba(107,74,55,0.07),transparent_62%)] blur-3xl" />
      </div>

      <div className="container relative z-10 mx-auto max-w-6xl px-6 py-32">
        {/* Hero Section */}
        <div className="mb-16">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-[rgba(42,92,88,0.08)] px-4 py-1.5">
            <svg
              className="h-4 w-4 text-[#2A5C58]"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <span className="text-xs font-bold uppercase tracking-wider text-[#2A5C58]">
              Halal Finance
            </span>
          </div>

          <h1 className="mb-6 text-[clamp(2.5rem,7vw,4.5rem)] font-black font-display leading-[0.95] tracking-tight text-text-primary">
            Muslim money decisions, structured around real choices
          </h1>

          <p className="mb-8 max-w-3xl text-lg leading-relaxed text-text-secondary">
            Zakat, halal investing, Islamic banking and home finance in one clear place.
            Calculate obligations, understand options and compare paths.
          </p>

          <div className="flex flex-wrap gap-3">
            <Link
              href="/finance/zakat-calculator"
              className="inline-flex items-center gap-2 rounded-full bg-gradient-gold px-6 py-3 font-bold text-[#4A3319] shadow-[0_8px_24px_rgba(176,144,98,0.25)] transition-transform hover:-translate-y-0.5"
            >
              Calculate zakat
            </Link>
            <Link
              href="/finance/investing"
              className="inline-flex items-center gap-2 rounded-full border border-[rgba(47,37,30,0.15)] bg-white/80 px-6 py-3 font-semibold text-text-primary backdrop-blur-sm transition-colors hover:bg-white"
            >
              Start halal investing
            </Link>
            <Link
              href="/finance/mortgages"
              className="inline-flex items-center gap-2 rounded-full border border-[rgba(47,37,30,0.15)] bg-white/80 px-6 py-3 font-semibold text-text-primary backdrop-blur-sm transition-colors hover:bg-white"
            >
              Compare mortgage paths
            </Link>
          </div>
        </div>

        {/* Which Finance Area Matches Your Situation */}
        <section className="mb-12 rounded-3xl border border-[rgba(47,37,30,0.08)] bg-white/60 p-8 shadow-[0_8px_32px_rgba(43,34,24,0.04)] backdrop-blur-sm md:p-10">
          <div className="mb-6">
            <p className="mb-2 text-xs font-bold uppercase tracking-wider text-primary">
              Start Here
            </p>
            <h2 className="text-2xl font-bold font-display text-text-primary md:text-3xl">
              Which finance area matches your situation
            </h2>
          </div>
          <p className="mb-8 text-text-secondary leading-relaxed">
            Each finance area serves a different purpose. Use this table to find the right starting point based on your current situation.
          </p>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b-2 border-border bg-white/60">
                  <th className="py-4 pr-4 font-bold text-text-primary">Your situation</th>
                  <th className="py-4 px-4 font-bold text-text-primary">Start here</th>
                  <th className="py-4 px-4 font-bold text-text-primary">Why</th>
                  <th className="py-4 pl-4 font-bold text-text-primary">What you'll find</th>
                </tr>
              </thead>
              <tbody className="text-sm">
                <tr className="border-b border-border bg-white/40">
                  <td className="py-5 pr-4 text-text-secondary">Need to calculate annual religious obligation</td>
                  <td className="py-5 px-4">
                    <Link href="/finance/zakat-calculator" className="font-bold text-[#2A5C58] hover:underline">
                      Zakat
                    </Link>
                  </td>
                  <td className="py-5 px-4 text-text-secondary">Islamic pillar with fixed rules</td>
                  <td className="py-5 pl-4 text-text-secondary">Calculator with live Nisab + guides for stocks, crypto, business assets</td>
                </tr>
                <tr className="border-b border-border bg-white/40">
                  <td className="py-5 pr-4 text-text-secondary">Want to grow wealth carefully</td>
                  <td className="py-5 px-4">
                    <Link href="/finance/investing" className="font-bold text-[#3A526A] hover:underline">
                      Investing
                    </Link>
                  </td>
                  <td className="py-5 px-4 text-text-secondary">Long-term planning and growth</td>
                  <td className="py-5 pl-4 text-text-secondary">Screening logic, halal ETFs, robo-advisors, dividend purification</td>
                </tr>
                <tr className="border-b border-border bg-white/40">
                  <td className="py-5 pr-4 text-text-secondary">Looking for Islamic bank account or everyday services</td>
                  <td className="py-5 px-4">
                    <Link href="/finance/banks" className="font-bold text-[#556343] hover:underline">
                      Banking
                    </Link>
                  </td>
                  <td className="py-5 px-4 text-text-secondary">Everyday money management</td>
                  <td className="py-5 pl-4 text-text-secondary">Islamic institutions, account types, credit cards, comparisons</td>
                </tr>
                <tr className="bg-white/40">
                  <td className="py-5 pr-4 text-text-secondary">Buying a home or comparing financing options</td>
                  <td className="py-5 px-4">
                    <Link href="/finance/mortgages" className="font-bold text-[#6B4A37] hover:underline">
                      Mortgages
                    </Link>
                  </td>
                  <td className="py-5 px-4 text-text-secondary">Major life decision</td>
                  <td className="py-5 pl-4 text-text-secondary">Murabaha, Musharaka, Ijara contract types, providers, tradeoffs</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="mt-6 rounded-xl border-l-4 border-[#F0C65F] bg-white/80 p-5">
            <p className="text-sm font-semibold text-text-primary">
              Not sure where to start? If you have a specific obligation (Zakat), begin there. For everything else, start with the topic that matches your timeline: investing and mortgages are long-term, banking is immediate.
            </p>
          </div>
        </section>

        {/* Core Finance Sections */}
        <section className="mb-12">
          <div className="mb-8">
            <p className="mb-2 text-xs font-bold uppercase tracking-wider text-primary">
              Four Main Areas
            </p>
            <h2 className="text-3xl font-black font-display text-text-primary">
              Zakat, Investing, Mortgages, Banking
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
                  <div className="mb-2 text-xs font-bold uppercase tracking-wider text-white/70">
                    {page.useCase}
                  </div>
                  <h3 className="mb-2 text-2xl font-black font-display">{page.title}</h3>
                  <p className="text-sm leading-relaxed text-white/90">{page.description}</p>
                </div>
                <div className="p-6">
                  <p className="text-sm text-text-secondary">
                    <span className="font-semibold text-text-primary">Includes:</span>{" "}
                    {page.practical}
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

        {/* Finance Articles Section */}
        {financeArticles.length > 0 && (
          <section className="mb-12">
            <div className="mb-8">
              <p className="mb-2 text-xs font-bold uppercase tracking-wider text-primary">
                In-depth guides
              </p>
              <h2 className="text-3xl font-black font-display text-text-primary">
                Finance articles
              </h2>
              <p className="mt-2 text-text-secondary">
                Deep dives into Islamic finance topics, halal investing strategies and financial planning.
              </p>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {financeArticles.map((article, index) => (
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
              {financeFaqs.map((faq) => (
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
                  Finance stays connected to the rest
                </h3>
              </div>

              <p className="mb-6 text-sm leading-relaxed text-text-secondary">
                Money decisions do not happen in isolation. Prayer times, halal guides and
                Muslim news are all part of the same rhythm.
              </p>
            </div>

            <div className="space-y-3">
              {[
                { label: "Halal guides", href: "/is-it-halal" },
                { label: "Zakat guides", href: "/guides" },
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
