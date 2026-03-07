import type { Metadata } from "next";
import Link from "next/link";
import Footer from "@/components/layout/Footer";
import FAQSchema from "@/components/seo/FAQSchema";
import LiveStreamWidget from "@/components/portal/LiveStreamWidget";
import NewsFeedWidget from "@/components/portal/NewsFeedWidget";
import PortalSearchWidget from "@/components/portal/PortalSearchWidget";
import QuickLinksWidget from "@/components/portal/QuickLinksWidget";
import TodayForYou from "@/components/portal/TodayForYou";
import { SITE_URL } from "@/lib/seo/metadata";

export const metadata: Metadata = {
  title: "AllHalal Muslim Portal | Prayer Times, Halal Checker, Finance & Islamic Learning",
  description:
    "AllHalal is a Muslim portal for prayer times, halal food and ingredient checks, Islamic finance guides, Muslim news, duas, 99 Names of Allah, Islamic calendar and daily guidance.",
  keywords: [
    "muslim portal",
    "prayer times",
    "halal checker",
    "halal food",
    "e numbers halal",
    "islamic calendar",
    "muslim news",
    "islamic finance",
    "zakat calculator",
    "duas",
    "99 names of Allah",
  ],
  openGraph: {
    title: "AllHalal Muslim Portal | Prayer Times, Halal Checker, Finance & Islamic Learning",
    description:
      "AllHalal is a Muslim portal for prayer times, halal food and ingredient checks, Islamic finance guides, Muslim news, duas, 99 Names of Allah, Islamic calendar and daily guidance.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "AllHalal Muslim Portal | Prayer Times, Halal Checker, Finance & Islamic Learning",
    description:
      "AllHalal is a Muslim portal for prayer times, halal food and ingredient checks, Islamic finance guides, Muslim news, duas, 99 Names of Allah, Islamic calendar and daily guidance.",
  },
};

const homeFaqs = [
  {
    question: "What can I do on AllHalal?",
    answer:
      "You can check halal products and ingredients, view prayer times and qibla direction, explore the Islamic calendar, read duas and Islamic learning resources, follow Muslim news, and access halal finance guidance in one portal.",
  },
  {
    question: "Is AllHalal only for halal food checks?",
    answer:
      "No. AllHalal is designed as a broader Muslim hub for everyday life, covering prayer, learning, finance, news, Islamic dates, and practical tools alongside halal food verification.",
  },
  {
    question: "How does AllHalal build trust for users?",
    answer:
      "The site combines practical tools, curated guides, methodology pages, and trusted-source content so users can move from quick answers to deeper explanation without leaving the platform.",
  },
  {
    question: "Where should a new visitor start?",
    answer:
      "Most new visitors start with the halal checker, prayer times, Islamic calendar, or finance hub. The homepage is structured to help users jump into the most common Muslim needs immediately.",
  },
];

function getSeasonalFocus(locale: string) {
  const islamicMonth = new Intl.DateTimeFormat("en-US-u-ca-islamic", {
    month: "long",
  }).format(new Date());

  if (islamicMonth.includes("Ramadan")) {
    return {
      eyebrow: "Seasonal Focus",
      title: "Ramadan should be one click away from the homepage.",
      description:
        "When Muslims are fasting, the strongest portal makes Ramadan guidance, duas, prayer rhythm and daily reflection obvious from the first scroll.",
      links: [
        { label: "Ramadan guides", href: `/${locale}/learn/ramadan` },
        { label: "Prayer times", href: `/${locale}/prayer-times` },
        { label: "Duas & Athkar", href: `/${locale}/learn/duas` },
      ],
    };
  }

  if (islamicMonth.includes("Shawwal")) {
    return {
      eyebrow: "Seasonal Focus",
      title: "Keep the Ramadan habit alive after Eid.",
      description:
        "The homepage should still guide people into duas, prayer rhythm, reflection and practical next steps once Ramadan ends.",
      links: [
        { label: "Duas & Athkar", href: `/${locale}/learn/duas` },
        { label: "Prayer times", href: `/${locale}/prayer-times` },
        { label: "Muslim briefing", href: `/${locale}/blog` },
      ],
    };
  }

  if (islamicMonth.includes("Dhu al-Hijjah") || islamicMonth.includes("Dhuʻl-Hijjah")) {
    return {
      eyebrow: "Seasonal Focus",
      title: "Hajj season should feel present on the homepage.",
      description:
        "During Dhul Hijjah, people should quickly find Hajj and Eid context, worship reminders, prayer support and trusted Muslim updates.",
      links: [
        { label: "Islamic calendar", href: `/${locale}/learn/islamic-calendar` },
        { label: "Prayer times", href: `/${locale}/prayer-times` },
        { label: "Learn", href: `/${locale}/learn` },
      ],
    };
  }

  if (islamicMonth.includes("Muharram")) {
    return {
      eyebrow: "Seasonal Focus",
      title: "Start the Islamic year with clarity and intention.",
      description:
        "Muharram is a natural moment to surface prayer, reflection, Islamic learning and the pages people want to revisit with fresh intention.",
      links: [
        { label: "Prayer times", href: `/${locale}/prayer-times` },
        { label: "99 Names", href: `/${locale}/learn/99-names` },
        { label: "Muslim briefing", href: `/${locale}/blog` },
      ],
    };
  }

  return {
    eyebrow: "Seasonal Focus",
    title: "The homepage should adapt to the Muslim season, not stay generic.",
    description:
      "A great Muslim portal makes room for worship, learning, halal clarity and daily updates throughout the year instead of looking the same every month.",
    links: [
      { label: "Prayer times", href: `/${locale}/prayer-times` },
      { label: "Islamic calendar", href: `/${locale}/learn/islamic-calendar` },
      { label: "Read the briefing", href: `/${locale}/blog` },
    ],
  };
}

export default async function PortalHomePage(props: { params: Promise<{ locale: string }> }) {
  const { locale } = await props.params;
  const seasonalFocus = getSeasonalFocus(locale);

  const commandCenterCards = [
    {
      eyebrow: "Most Used",
      title: "Check halal food fast",
      description: "Search ingredients, E-codes, brands and packaged products in seconds.",
      href: `/${locale}/is-it-halal`,
      accent: "from-[#214B38] to-[#2F674D] text-white",
    },
    {
      eyebrow: "Right Now",
      title: "Open prayer times",
      description: "See salah, qibla and today's Hijri context without extra clicks.",
      href: `/${locale}/prayer-times`,
      accent: "from-[#29495C] to-[#396076] text-white",
    },
    {
      eyebrow: "Daily Reading",
      title: "Read today's Muslim briefing",
      description: "Start with one important story, then move into practical next steps.",
      href: `/${locale}/blog`,
      accent: "from-[#4A3319] to-[#7A4B2B] text-white",
    },
    {
      eyebrow: "Learn Daily",
      title: "Build Islamic knowledge",
      description: "Read duas, Ramadan guides and the 99 Names of Allah.",
      href: `/${locale}/learn`,
      accent: "from-[#5C6A43] to-[#728155] text-white",
    },
  ];

  const trustSignals = [
    {
      title: "Daily utility first",
      text: "Prayer, halal answers, qibla, duas and Islamic dates should be available before the user has to think.",
    },
    {
      title: "Useful, not fluffy",
      text: "The homepage should route people into action, not just explain what the portal wants to be.",
    },
    {
      title: "Trust has to be visible",
      text: "Methodology, curated sources and practical guidance should be present in the layout, not hidden in the footer.",
    },
  ];

  const startCards = [
    {
      eyebrow: "Halal",
      title: "Check ingredients, additives and brands",
      description: "Resolve the most common halal doubts with one direct search flow.",
      href: `/${locale}/is-it-halal`,
    },
    {
      eyebrow: "Prayer",
      title: "See salah, qibla and today's Hijri context",
      description: "Open the daily essentials Muslims return to every single day.",
      href: `/${locale}/prayer-times`,
    },
    {
      eyebrow: "Learn",
      title: "Read duas, Ramadan guides and 99 Names",
      description: "Keep Islamic learning accessible enough to revisit every day.",
      href: `/${locale}/learn`,
    },
    {
      eyebrow: "Money",
      title: "Navigate finance without compromise",
      description: "Explore zakat, halal investing, Islamic banks and halal mortgages.",
      href: `/${locale}/finance`,
    },
  ];

  const intentClusters = [
    {
      title: "Daily Muslim life",
      description:
        "Make AllHalal the first tab of the day for prayer times, qibla, Islamic dates, live Makkah and practical daily rhythm.",
      links: [
        { label: "Prayer Times", href: `/${locale}/prayer-times` },
        { label: "Islamic Calendar", href: `/${locale}/learn/islamic-calendar` },
        { label: "Live Makkah & Madinah", href: `/${locale}/learn/live-makkah` },
      ],
      accent: "from-[#4E6D78] to-[#6E8C96] text-white",
    },
    {
      title: "Halal living and food clarity",
      description:
        "Own the high-intent questions around ingredients, additives, snacks, drinks and boycott-related brand checks with clear verdicts.",
      links: [
        { label: "Halal Checker", href: `/${locale}/is-it-halal` },
        { label: "Boycott Checker", href: `/${locale}/boycott-checker` },
        { label: "Our Methodology", href: `/${locale}/methodology` },
      ],
      accent: "from-[#6B8164] to-[#91A082] text-white",
    },
    {
      title: "Islamic learning that stays close",
      description:
        "Turn the homepage into a repeat destination for duas, Ramadan resources, 99 Names of Allah and everyday Islamic guidance.",
      links: [
        { label: "Duas & Athkar", href: `/${locale}/learn/duas` },
        { label: "99 Names of Allah", href: `/${locale}/learn/99-names` },
        { label: "Ramadan Guides", href: `/${locale}/learn/ramadan` },
      ],
      accent: "from-[#8F5F46] to-[#B47B5C] text-white",
    },
    {
      title: "Muslim money decisions",
      description:
        "Support real-life decisions around zakat, halal investing, Islamic banking and halal mortgages with practical pages worth bookmarking.",
      links: [
        { label: "Finance Hub", href: `/${locale}/finance` },
        { label: "Zakat Calculator", href: `/${locale}/finance/zakat-calculator` },
        { label: "Halal Investing", href: `/${locale}/finance/investing` },
      ],
      accent: "from-white to-[#F4F0E8] text-text-primary",
    },
  ];

  const popularGuides = [
    {
      title: "Is carmine halal?",
      description: "One of the most searched ingredient questions and a clear entry point into additives.",
      href: `/${locale}/is-it-halal/is-carmine-halal`,
      tag: "Ingredient answer",
    },
    {
      title: "Is gelatin halal?",
      description: "A foundational food question that new users repeatedly search before anything else.",
      href: `/${locale}/is-it-halal/is-gelatin-halal`,
      tag: "Food clarity",
    },
    {
      title: "Ramadan and fasting guidance",
      description: "Seasonal guidance should always be easy to find when Muslims need it most.",
      href: `/${locale}/learn/ramadan`,
      tag: "Seasonal guide",
    },
    {
      title: "Zakat and live Nisab threshold",
      description: "A practical utility page people return to whenever they need a current Nisab reference.",
      href: `/${locale}/finance/zakat-calculator`,
      tag: "Practical tool",
    },
    {
      title: "99 Names of Allah",
      description: "A timeless devotional page that helps convert visits into repeat learning.",
      href: `/${locale}/learn/99-names`,
      tag: "Daily reflection",
    },
    {
      title: "Halal mortgages and Muslim finance",
      description: "Major life decisions need grounded finance guidance, not generic blog content.",
      href: `/${locale}/finance/mortgages`,
      tag: "Money decisions",
    },
  ];

  const trendingSearches = [
    {
      label: "Is gelatin halal?",
      href: `/${locale}/is-it-halal/is-gelatin-halal`,
      tag: "Food clarity",
    },
    {
      label: "Is carmine halal?",
      href: `/${locale}/is-it-halal/is-carmine-halal`,
      tag: "Ingredient",
    },
    {
      label: "E-codes and additives",
      href: `/${locale}/is-it-halal`,
      tag: "Lookup",
    },
    {
      label: "Prayer times today",
      href: `/${locale}/prayer-times`,
      tag: "Daily use",
    },
    {
      label: "Zakat calculator",
      href: `/${locale}/finance/zakat-calculator`,
      tag: "Finance",
    },
    {
      label: "Daily duas",
      href: `/${locale}/learn/duas`,
      tag: "Learning",
    },
  ];

  const proofPoints = [
    {
      title: "One destination for recurring needs",
      text: "Prayer, halal food, finance, learning, news and Islamic dates should feel connected instead of scattered across separate sites.",
    },
    {
      title: "Fast answers plus deeper context",
      text: "Users should be able to get the answer they need and then move into guides, methodology and related tools without friction.",
    },
    {
      title: "A homepage that behaves like a product",
      text: "The best portal homepage behaves like a command center, not a brochure.",
    },
  ];

  const homeSchema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": `${SITE_URL}/#website`,
        name: "AllHalal",
        url: SITE_URL,
        description:
          "Muslim portal for prayer times, halal food checks, Islamic finance, Muslim news and Islamic learning.",
        potentialAction: {
          "@type": "SearchAction",
          target: `${SITE_URL}/${locale}/is-it-halal?q={search_term_string}`,
          "query-input": "required name=search_term_string",
        },
      },
      {
        "@type": "WebPage",
        "@id": `${SITE_URL}/${locale}#webpage`,
        url: `${SITE_URL}/${locale}`,
        name: "AllHalal Muslim Portal",
        description:
          "Daily Muslim portal for prayer times, halal checker, Islamic calendar, Islamic finance, Muslim news and Islamic learning.",
        isPartOf: { "@id": `${SITE_URL}/#website` },
        inLanguage: locale,
      },
    ],
  };

  return (
    <>
      <main className="pt-32 pb-20 bg-bg-primary min-h-screen">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(homeSchema) }}
        />
        <FAQSchema faqs={homeFaqs} />

        <div className="container max-w-7xl mx-auto">
          <section className="relative mb-8 rounded-[2.5rem] border border-border overflow-hidden bg-white/65 backdrop-blur-sm shadow-[0_20px_60px_rgba(48,40,29,0.08)]">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(240,198,95,0.16),transparent_32%),radial-gradient(circle_at_top_right,rgba(75,122,136,0.18),transparent_28%),linear-gradient(180deg,#f5f2ea_0%,#ede7dc_100%)]" />
            <div className="absolute inset-x-10 top-0 h-px bg-gradient-to-r from-transparent via-white/80 to-transparent" />
            <div className="relative grid lg:grid-cols-[1.05fr_0.95fr] gap-8 p-8 md:p-10 lg:p-12">
              <div className="flex flex-col justify-center">
                <div className="inline-flex w-fit items-center gap-2 px-4 py-2 rounded-full bg-white/70 border border-black/5 backdrop-blur-md shadow-sm mb-5">
                  <span className="relative flex h-2.5 w-2.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent-yellow opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-accent-yellow"></span>
                  </span>
                  <span className="text-[0.7rem] font-bold uppercase tracking-[0.25em] text-text-primary">
                    Muslim Command Center
                  </span>
                </div>

                <h1 className="text-[3rem] sm:text-[4.25rem] md:text-[5rem] lg:text-[5.6rem] font-black font-display text-text-primary tracking-tight leading-[0.98] max-w-5xl">
                  The daily homepage for Muslim life.
                </h1>

                <p className="text-text-secondary text-lg md:text-xl max-w-3xl mt-6 font-medium leading-relaxed text-balance">
                  Prayer times, halal food and ingredient checks, Islamic learning, finance guidance and a Muslim briefing should all be reachable from the first scroll without noise or guesswork.
                </p>

                <div className="flex flex-wrap gap-3 mt-8">
                  <Link
                    href={`/${locale}/is-it-halal`}
                    className="px-5 py-3 rounded-full bg-gradient-gold text-[#4A3319] font-bold shadow-[0_8px_26px_rgba(176,144,98,0.28)] hover:-translate-y-0.5 transition-transform"
                  >
                    Check halal now
                  </Link>
                  <Link
                    href={`/${locale}/prayer-times`}
                    className="px-5 py-3 rounded-full bg-white/80 border border-border text-text-primary font-semibold hover:bg-white transition-colors"
                  >
                    Open prayer times
                  </Link>
                  <Link
                    href={`/${locale}/blog`}
                    className="px-5 py-3 rounded-full bg-white/80 border border-border text-text-primary font-semibold hover:bg-white transition-colors"
                  >
                    Read today&apos;s briefing
                  </Link>
                </div>

                <div className="grid gap-3 sm:grid-cols-3 mt-8 max-w-4xl">
                  {[
                    {
                      title: "Daily worship",
                      text: "Prayer times, qibla and Hijri context for today.",
                    },
                    {
                      title: "Halal clarity",
                      text: "Products, additives and ingredient answers fast.",
                    },
                    {
                      title: "Learning and briefing",
                      text: "Duas, finance guidance and trusted Muslim updates.",
                    },
                  ].map((item) => (
                    <div
                      key={item.title}
                      className="rounded-[1.35rem] border border-black/5 bg-white/60 backdrop-blur-sm p-4 shadow-[0_10px_30px_rgba(54,44,34,0.06)]"
                    >
                      <p className="text-sm font-bold text-text-primary mb-1">{item.title}</p>
                      <p className="text-sm text-text-secondary leading-relaxed">{item.text}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-[2rem] border border-white/20 bg-[#173341] text-white p-6 md:p-7 shadow-[0_18px_50px_rgba(17,36,47,0.28)]">
                <div className="flex items-start justify-between gap-4 mb-6">
                  <div>
                    <p className="text-[11px] font-bold uppercase tracking-[0.24em] text-white/55 mb-2">
                      Start Here Now
                    </p>
                    <h2 className="text-2xl md:text-3xl font-bold font-display leading-tight">
                      The homepage should know what Muslims came to do today.
                    </h2>
                  </div>
                  <Link
                    href={`/${locale}/methodology`}
                    className="hidden md:inline-flex px-3 py-2 rounded-full bg-white/10 border border-white/10 text-xs font-bold uppercase tracking-[0.16em] text-white/80"
                  >
                    Trust
                  </Link>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  {commandCenterCards.map((card) => (
                    <Link
                      key={card.title}
                      href={card.href}
                      className={`rounded-[1.5rem] border border-white/10 bg-gradient-to-br ${card.accent} p-5 shadow-lg hover:-translate-y-1 transition-transform`}
                    >
                      <div className="text-[10px] font-bold uppercase tracking-[0.2em] opacity-75 mb-3">
                        {card.eyebrow}
                      </div>
                      <h3 className="text-xl font-bold font-display leading-tight mb-2">
                        {card.title}
                      </h3>
                      <p className="text-sm leading-relaxed opacity-85">{card.description}</p>
                    </Link>
                  ))}
                </div>

                <div className="grid md:grid-cols-3 gap-3 mt-5">
                  {trustSignals.map((signal) => (
                    <div key={signal.title} className="rounded-[1.25rem] border border-white/10 bg-white/5 p-4">
                      <div className="text-xs font-bold text-white mb-1">{signal.title}</div>
                      <p className="text-[13px] leading-relaxed text-white/65">{signal.text}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          <section className="mb-8">
            <PortalSearchWidget locale={locale} />
          </section>

          <section className="mb-16 grid grid-cols-1 xl:grid-cols-[0.78fr_1.22fr] gap-6">
            <div className="rounded-[2rem] bg-gradient-to-br from-[#3D281C] via-[#5D3A27] to-[#8A5B3E] text-white p-8 border border-white/10 shadow-[0_20px_60px_rgba(56,34,24,0.22)] relative overflow-hidden">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(244,185,66,0.25),transparent_28%),linear-gradient(180deg,transparent,rgba(0,0,0,0.08))]" />
              <div className="relative">
                <p className="text-sm font-bold uppercase tracking-[0.22em] text-[#F6D48B] mb-3">
                  {seasonalFocus.eyebrow}
                </p>
                <h2 className="text-3xl md:text-4xl font-bold font-display leading-tight mb-4">
                  {seasonalFocus.title}
                </h2>
                <p className="text-sm md:text-base text-white/78 leading-relaxed max-w-xl">
                  {seasonalFocus.description}
                </p>
                <div className="mt-6 flex flex-wrap gap-3">
                  {seasonalFocus.links.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      className="px-4 py-2 rounded-full bg-white/10 border border-white/15 text-sm font-semibold hover:bg-white/15 transition-colors"
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            <div className="rounded-[2rem] border border-border bg-white/80 backdrop-blur-sm p-8 shadow-card">
              <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-6">
                <div>
                  <p className="text-sm font-bold uppercase tracking-[0.22em] text-primary mb-3">
                    Most Searched Right Now
                  </p>
                  <h2 className="text-3xl md:text-4xl font-bold font-display text-text-primary">
                    High-intent questions the homepage should surface immediately.
                  </h2>
                </div>
                <Link href={`/${locale}/is-it-halal`} className="text-sm font-bold text-primary hover:underline shrink-0">
                  Open halal checker →
                </Link>
              </div>

              <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-4">
                {trendingSearches.map((item) => (
                  <Link
                    key={item.label}
                    href={item.href}
                    className="rounded-[1.35rem] border border-border bg-bg-secondary/55 p-5 hover:bg-white hover:border-primary/25 transition-colors"
                  >
                    <span className="inline-flex px-2.5 py-1 rounded-full bg-primary/10 text-primary text-[10px] font-bold uppercase tracking-[0.18em] mb-3">
                      {item.tag}
                    </span>
                    <h3 className="text-lg font-bold font-display text-text-primary leading-tight">
                      {item.label}
                    </h3>
                  </Link>
                ))}
              </div>
            </div>
          </section>

          <section className="mb-16">
            <div className="max-w-3xl mb-6">
              <p className="text-sm font-bold uppercase tracking-[0.22em] text-primary mb-3">
                Start With Your Need
              </p>
              <h2 className="text-4xl md:text-5xl font-bold font-display text-text-primary mb-4">
                Four high-intent entry points a Muslim portal should never hide.
              </h2>
              <p className="text-lg text-text-secondary leading-relaxed">
                The strongest homepage gives users a clear first click whether they came for halal food, prayer, Islamic learning or finance.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
            {startCards.map((card) => (
              <Link
                key={card.title}
                href={card.href}
                className="rounded-[1.9rem] border border-border bg-white/80 backdrop-blur-sm p-6 shadow-card hover:-translate-y-1 transition-transform"
              >
                <div className="text-[11px] font-bold uppercase tracking-[0.22em] text-primary mb-3">
                  {card.eyebrow}
                </div>
                <h2 className="text-xl font-bold font-display text-text-primary mb-3 leading-tight">
                  {card.title}
                </h2>
                <p className="text-sm text-text-secondary leading-relaxed">{card.description}</p>
                <span className="inline-flex items-center gap-1 mt-5 text-sm font-bold text-primary">
                  Explore now <span aria-hidden="true">→</span>
                </span>
              </Link>
            ))}
            </div>
          </section>

          <section className="mb-6">
            <div className="max-w-3xl mb-6">
              <p className="text-sm font-bold uppercase tracking-[0.22em] text-primary mb-3">
                Today For You
              </p>
              <h2 className="text-4xl md:text-5xl font-bold font-display text-text-primary mb-4">
                A homepage should help with today&apos;s Muslim rhythm, not just general discovery.
              </h2>
              <p className="text-lg text-text-secondary leading-relaxed">
                This is where prayer, qibla, Hijri context, hadith and daily focus become worth returning for.
              </p>
            </div>
          </section>

          <div className="grid grid-cols-1 gap-6">
            <div>
              <TodayForYou locale={locale} />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              <div className="lg:col-span-8">
                <NewsFeedWidget locale={locale} />
              </div>

              <div className="lg:col-span-4 flex flex-col gap-6">
                <QuickLinksWidget locale={locale} />
                <LiveStreamWidget locale={locale} />
              </div>
            </div>
          </div>

          <section className="mt-16">
            <div className="max-w-3xl mb-8">
              <p className="text-sm font-bold uppercase tracking-[0.22em] text-primary mb-3">
                Built For Muslim Intent
              </p>
              <h2 className="text-4xl md:text-5xl font-bold font-display text-text-primary mb-4">
                A stronger homepage routes people into the exact part of Muslim life they came for.
              </h2>
              <p className="text-lg text-text-secondary leading-relaxed">
                The page should clearly split daily practice, halal living, Islamic learning and finance into clusters people can understand at a glance.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {intentClusters.map((section) => (
                <div
                  key={section.title}
                  className={`rounded-[2rem] p-8 shadow-card border border-border bg-gradient-to-br ${section.accent}`}
                >
                  <h3 className="text-3xl font-bold font-display mb-4">{section.title}</h3>
                  <p className="text-sm md:text-base leading-relaxed opacity-90 max-w-xl">
                    {section.description}
                  </p>
                  <div className="mt-6 flex flex-wrap gap-3">
                    {section.links.map((link) => (
                      <Link
                        key={link.href}
                        href={link.href}
                        className="px-4 py-2 rounded-full border border-current/15 bg-white/10 hover:bg-white/15 transition-colors text-sm font-semibold"
                      >
                        {link.label}
                      </Link>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="mt-16 grid grid-cols-1 xl:grid-cols-[1.3fr_0.7fr] gap-6">
            <div className="bg-white rounded-[2rem] p-8 border border-border shadow-card">
              <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-8">
                <div>
                  <p className="text-sm font-bold uppercase tracking-[0.22em] text-primary mb-3">
                    Popular Paths
                  </p>
                  <h2 className="text-3xl md:text-4xl font-bold font-display text-text-primary">
                    Pages people can return to for answers, clarity and daily benefit.
                  </h2>
                </div>
                <Link href={`/${locale}/blog`} className="text-sm font-bold text-primary hover:underline shrink-0">
                  Read our guides →
                </Link>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                {popularGuides.map((guide) => (
                  <Link
                    key={guide.title}
                    href={guide.href}
                    className="rounded-[1.5rem] border border-border bg-bg-secondary/60 p-5 hover:border-primary/30 hover:bg-white transition-colors"
                  >
                    <span className="inline-flex px-2.5 py-1 rounded-full bg-primary/10 text-primary text-[10px] font-bold uppercase tracking-[0.18em] mb-3">
                      {guide.tag}
                    </span>
                    <h3 className="text-xl font-bold font-display text-text-primary mb-2">
                      {guide.title}
                    </h3>
                    <p className="text-sm text-text-secondary leading-relaxed">{guide.description}</p>
                  </Link>
                ))}
              </div>
            </div>

            <div className="bg-bg-dark rounded-[2rem] p-8 border border-white/10 shadow-2xl text-text-inverse">
              <p className="text-sm font-bold uppercase tracking-[0.22em] text-accent-yellow mb-3">
                Why People Return
              </p>
              <h2 className="text-3xl font-bold font-display mb-4">
                What makes a Muslim homepage feel indispensable.
              </h2>
              <p className="text-text-inverse-secondary leading-relaxed mb-6">
                The strength of allhalal.info is not one tool. It is the ability to connect recurring Muslim needs under one recognizable daily destination.
              </p>

              <div className="space-y-4">
                {proofPoints.map((signal) => (
                  <div key={signal.title} className="rounded-2xl border border-white/10 bg-white/5 p-4">
                    <h3 className="font-bold text-white mb-1">{signal.title}</h3>
                    <p className="text-sm text-text-inverse-secondary leading-relaxed">{signal.text}</p>
                  </div>
                ))}
              </div>

              <div className="mt-6 flex flex-col gap-3">
                <Link
                  href={`/${locale}/methodology`}
                  className="inline-flex items-center justify-center px-5 py-3 rounded-xl bg-gradient-gold text-[#4A3319] font-bold"
                >
                  Review our methodology
                </Link>
                <Link
                  href={`/${locale}/app`}
                  className="inline-flex items-center justify-center px-5 py-3 rounded-xl border border-white/10 text-white font-semibold hover:bg-white/5 transition-colors"
                >
                  Explore app features
                </Link>
              </div>
            </div>
          </section>

          <section className="mt-16 grid grid-cols-1 xl:grid-cols-[0.92fr_1.08fr] gap-6">
            <div className="rounded-[2rem] border border-border bg-white p-8 shadow-card">
              <p className="text-sm font-bold uppercase tracking-[0.22em] text-primary mb-3">
                Editorial Standard
              </p>
              <h2 className="text-3xl md:text-4xl font-bold font-display text-text-primary mb-4">
                A strong home page should answer, direct and deepen in one scroll.
              </h2>
              <div className="grid gap-4">
                {[
                  {
                    title: "Immediate value",
                    text: "A user should know within seconds whether they need halal answers, prayer times, Islamic learning or finance guidance.",
                  },
                  {
                    title: "Clear next step",
                    text: "Every block should route users into a meaningful action instead of leaving them with generic inspiration copy.",
                  },
                  {
                    title: "Depth behind the first click",
                    text: "Once someone enters halal, prayer, finance or learn, they should discover related tools and guides worth bookmarking.",
                  },
                ].map((item) => (
                  <div key={item.title} className="rounded-[1.5rem] border border-border bg-bg-secondary/50 p-5">
                    <h3 className="text-xl font-bold font-display text-text-primary mb-2">
                      {item.title}
                    </h3>
                    <p className="text-sm text-text-secondary leading-relaxed">{item.text}</p>
                  </div>
                ))}
              </div>

              <div className="mt-6 flex flex-wrap gap-3">
                <Link href={`/${locale}/is-it-halal`} className="px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-bold">
                  Halal answers
                </Link>
                <Link href={`/${locale}/prayer-times`} className="px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-bold">
                  Prayer and qibla
                </Link>
                <Link href={`/${locale}/learn`} className="px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-bold">
                  Islamic learning
                </Link>
                <Link href={`/${locale}/finance`} className="px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-bold">
                  Muslim finance
                </Link>
              </div>
            </div>

            <div className="rounded-[2rem] border border-border bg-white p-8 shadow-card">
              <p className="text-sm font-bold uppercase tracking-[0.22em] text-primary mb-3">
                Homepage FAQ
              </p>
              <h2 className="text-3xl md:text-4xl font-bold font-display text-text-primary mb-6">
                Common questions a Muslim portal should answer quickly.
              </h2>

              <div className="space-y-4">
                {homeFaqs.map((faq) => (
                  <details
                    key={faq.question}
                    className="rounded-2xl border border-border bg-bg-secondary/50 p-5 group"
                  >
                    <summary className="list-none cursor-pointer flex items-center justify-between gap-4">
                      <span className="font-bold text-text-primary">{faq.question}</span>
                      <span className="text-primary font-bold transition-transform group-open:rotate-45">+</span>
                    </summary>
                    <p className="mt-4 text-sm text-text-secondary leading-relaxed">{faq.answer}</p>
                  </details>
                ))}
              </div>
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}
