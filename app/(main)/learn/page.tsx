import type { Metadata } from "next";
import Link from "next/link";
import AppPromoMini from "@/components/ui/AppPromoMini";
import FAQSchema from "@/components/seo/FAQSchema";
import { SITE_URL } from "@/lib/seo/metadata";

export const metadata: Metadata = {
  title: "Learn Islam | Duas, 99 Names, Ramadan Guides & Islamic Calendar",
  description:
    "Explore Islamic learning on allhalal.info with duas and athkar, 99 Names of Allah, Ramadan guides, Islamic calendar context and live Makkah resources.",
  keywords: [
    "learn islam",
    "duas and athkar",
    "99 names of Allah",
    "Ramadan guide",
    "Islamic calendar",
    "Islamic learning",
    "Muslim learning hub",
  ],
  openGraph: {
    title: "Learn Islam | Duas, 99 Names, Ramadan Guides & Islamic Calendar",
    description:
      "Islamic learning hub for duas, 99 Names of Allah, Ramadan guidance, Islamic calendar context and daily Muslim study.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Learn Islam | Duas, 99 Names, Ramadan Guides & Islamic Calendar",
    description:
      "Islamic learning hub for duas, 99 Names of Allah, Ramadan guidance, Islamic calendar context and daily Muslim study.",
  },
};

const learnFaqs = [
  {
    question: "What can I learn on allhalal.info?",
    answer:
      "You can read duas and athkar, explore the 99 Names of Allah, follow Ramadan guidance, check Islamic calendar dates and use learning pages designed for everyday Muslim practice.",
  },
  {
    question: "Is the learn section only for Ramadan?",
    answer:
      "No. Ramadan is one important part of the learn hub, but the section is designed for year-round Muslim study, remembrance and Islamic context.",
  },
  {
    question: "Where should a new visitor start in learn?",
    answer:
      "Most visitors start with duas and athkar, the 99 Names of Allah or the Islamic calendar because these pages are useful for repeated daily and seasonal return visits.",
  },
  {
    question: "Why does the learn hub matter for the portal?",
    answer:
      "A strong Muslim portal should not stop at tools and news. It should also help users return for Islamic understanding, remembrance and guidance that deepen daily practice.",
  },
];

function getLearningSeason(locale: string) {
  const islamicMonth = new Intl.DateTimeFormat("en-US-u-ca-islamic", {
    month: "long",
  }).format(new Date());

  if (islamicMonth.includes("Ramadan")) {
    return {
      eyebrow: "Seasonal Focus",
      title: "Ramadan learning should be the easiest thing to find right now.",
      description:
        "During Ramadan, Muslims need fasting guidance, duas, prayer rhythm and Islamic calendar context without searching through the site.",
      links: [
        { label: "Ramadan guide", href: `/learn/ramadan` },
        { label: "Duas & Athkar", href: `/learn/duas` },
        { label: "Prayer times", href: `/prayer-times` },
      ],
    };
  }

  if (islamicMonth.includes("Dhu al-Hijjah") || islamicMonth.includes("Dhuʻl-Hijjah")) {
    return {
      eyebrow: "Seasonal Focus",
      title: "Islamic dates and sacred-season context should lead the learn hub.",
      description:
        "In Dhul Hijjah, the learn hub should foreground the Islamic calendar, worship reminders and the sacred places Muslims naturally look toward.",
      links: [
        { label: "Islamic calendar", href: `/learn/islamic-calendar` },
        { label: "Live Makkah", href: `/learn/live-makkah` },
        { label: "Duas & Athkar", href: `/learn/duas` },
      ],
    };
  }

  if (islamicMonth.includes("Muharram")) {
    return {
      eyebrow: "Seasonal Focus",
      title: "The Islamic new year should feel like a learning moment, not a hidden page.",
      description:
        "Muharram is a natural time for reflection, remembrance and returning to foundational pages like duas, calendar context and the 99 Names of Allah.",
      links: [
        { label: "99 Names", href: `/learn/99-names` },
        { label: "Islamic calendar", href: `/learn/islamic-calendar` },
        { label: "Duas & Athkar", href: `/learn/duas` },
      ],
    };
  }

  return {
    eyebrow: "Seasonal Focus",
    title: "Islamic learning should stay close even when there is no major season.",
    description:
      "The learn hub should still make daily remembrance, Islamic dates and foundational study easy to revisit throughout the year.",
    links: [
      { label: "Duas & Athkar", href: `/learn/duas` },
      { label: "99 Names", href: `/learn/99-names` },
      { label: "Islamic calendar", href: `/learn/islamic-calendar` },
    ],
  };
}

export default async function LearnHub(props: { params: Promise<{ locale: string }> }) {
  const { locale } = await props.params;
  const seasonalFocus = getLearningSeason(locale);

  const startCards = [
    {
      eyebrow: "Daily remembrance",
      title: "Read duas and athkar you can return to every day",
      description:
        "The easiest win for the learn hub is helping Muslims quickly reach practical supplications for ordinary life.",
      href: `/learn/duas`,
    },
    {
      eyebrow: "Devotional study",
      title: "Explore the 99 Names of Allah",
      description:
        "A timeless study page that turns quick visits into repeat reflection and deeper understanding.",
      href: `/learn/99-names`,
    },
    {
      eyebrow: "Seasonal worship",
      title: "Open Ramadan and fasting guidance",
      description:
        "When Muslims need fasting rules, duas and reminders, the learn hub should make that pathway obvious.",
      href: `/learn/ramadan`,
    },
    {
      eyebrow: "Islamic context",
      title: "Check Hijri dates and important Muslim events",
      description:
        "The Islamic calendar gives context to worship, holidays and the annual rhythm of Muslim life.",
      href: `/learn/islamic-calendar`,
    },
  ];

  const featuredPages = [
    {
      title: "Duas & Athkar",
      description: "Supplications for everyday life, remembrance and return visits.",
      href: `/learn/duas`,
      tag: "Everyday learning",
      accent: "from-[#325349] to-[#4F7367] text-white",
    },
    {
      title: "99 Names of Allah",
      description: "A devotional page that combines memorisation, meaning and reflection.",
      href: `/learn/99-names`,
      tag: "Foundational study",
      accent: "from-[#49657A] to-[#708CA0] text-white",
    },
    {
      title: "Ramadan & Fasting Guide",
      description: "Seasonal guidance for preparation, rulings, supplications and better practice.",
      href: `/learn/ramadan`,
      tag: "Seasonal guidance",
      accent: "from-[#7A523B] to-[#A56D4C] text-white",
    },
    {
      title: "Islamic Calendar",
      description: "Hijri dates, Muslim events and year-round context for worship and planning.",
      href: `/learn/islamic-calendar`,
      tag: "Context and dates",
      accent: "from-[#4E5E3E] to-[#73815D] text-white",
    },
    {
      title: "Makkah & Madinah Live",
      description: "A sacred-place entry point that adds emotional and seasonal relevance to the hub.",
      href: `/learn/live-makkah`,
      tag: "Sacred places",
      accent: "from-[#30231E] to-[#594138] text-white",
    },
  ];

  const studyTracks = [
    {
      title: "For daily Muslim rhythm",
      description:
        "Combine duas, prayer times and Islamic calendar context so the learn hub becomes part of everyday worship instead of an occasional visit.",
      links: [
        { label: "Duas & Athkar", href: `/learn/duas` },
        { label: "Prayer times", href: `/prayer-times` },
        { label: "Islamic calendar", href: `/learn/islamic-calendar` },
      ],
      accent: "from-[#DCE9E5] to-[#ECF4F1] text-text-primary",
    },
    {
      title: "For reflective study",
      description:
        "Bring together the 99 Names of Allah, daily remembrance and repeatable spiritual pages that are worth bookmarking.",
      links: [
        { label: "99 Names of Allah", href: `/learn/99-names` },
        { label: "Duas & Athkar", href: `/learn/duas` },
        { label: "Read the briefing", href: `/news` },
      ],
      accent: "from-[#E9E1D6] to-[#F6F0E7] text-text-primary",
    },
    {
      title: "For sacred seasons",
      description:
        "Ramadan, Eid and other Islamic dates should route naturally into the right pages for fasting, worship and preparation.",
      links: [
        { label: "Ramadan guide", href: `/learn/ramadan` },
        { label: "Islamic calendar", href: `/learn/islamic-calendar` },
        { label: "Prayer times", href: `/prayer-times` },
      ],
      accent: "from-[#3C5366] to-[#5A7488] text-white",
    },
    {
      title: "For emotional connection",
      description:
        "Live Makkah, duas and calendar awareness help the hub feel spiritually relevant, not just informational.",
      links: [
        { label: "Live Makkah & Madinah", href: `/learn/live-makkah` },
        { label: "Duas & Athkar", href: `/learn/duas` },
        { label: "Islamic calendar", href: `/learn/islamic-calendar` },
      ],
      accent: "from-[#4B3327] to-[#775444] text-white",
    },
  ];

  const proofPoints = [
    {
      title: "Useful beyond one season",
      text: "A real Muslim learning hub should serve daily remembrance, foundational study and sacred-season guidance all year long.",
    },
    {
      title: "Built for return visits",
      text: "Pages like duas, 99 Names and Islamic calendar work because they invite repetition, not one-time consumption.",
    },
    {
      title: "Connected to the rest of the portal",
      text: "Learning should connect naturally to prayer, Muslim news and the broader rhythm of Muslim life on the site.",
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
          "Islamic learning hub for duas, 99 Names of Allah, Ramadan guides, Islamic calendar context and daily Muslim study.",
        isPartOf: { "@id": `${SITE_URL}/#website` },
        inLanguage: locale,
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

  return (
    <main className="pt-32 pb-20 bg-bg-primary min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(learnSchema) }}
      />
      <FAQSchema faqs={learnFaqs} />

      <div className="container max-w-7xl mx-auto">
        <section className="relative overflow-hidden rounded-[2.5rem] border border-border bg-white/70 backdrop-blur-sm shadow-[0_18px_50px_rgba(48,40,29,0.08)]">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(75,122,136,0.15),transparent_28%),radial-gradient(circle_at_top_right,rgba(240,198,95,0.16),transparent_24%),linear-gradient(180deg,#f6f2ea_0%,#ece7dc_100%)]" />
          <div className="relative grid lg:grid-cols-[1.08fr_0.92fr] gap-8 p-8 md:p-10 lg:p-12">
            <div className="flex flex-col justify-center">
              <div className="inline-flex w-fit items-center gap-2 px-4 py-2 rounded-full bg-white/75 border border-black/5 shadow-sm mb-5">
                <span className="w-2.5 h-2.5 rounded-full bg-accent-teal" />
                <span className="text-[0.7rem] font-bold uppercase tracking-[0.24em] text-text-primary">
                  Islamic Learning Hub
                </span>
              </div>

              <h1 className="text-[2.9rem] sm:text-[4rem] md:text-[4.8rem] lg:text-[5.2rem] font-black font-display text-text-primary tracking-tight leading-[0.98] max-w-5xl">
                Learn Islam in a way people actually return to.
              </h1>

              <p className="text-text-secondary text-lg md:text-xl max-w-3xl mt-6 font-medium leading-relaxed">
                Duas, the 99 Names of Allah, Ramadan guidance, Islamic dates and sacred-place context should feel close, clear and worth revisiting every day.
              </p>

              <div className="flex flex-wrap gap-3 mt-8">
                <Link
                  href={`/learn/duas`}
                  className="px-5 py-3 rounded-full bg-gradient-gold text-[#4A3319] font-bold shadow-[0_8px_24px_rgba(176,144,98,0.25)] hover:-translate-y-0.5 transition-transform"
                >
                  Start with duas
                </Link>
                <Link
                  href={`/learn/99-names`}
                  className="px-5 py-3 rounded-full bg-white/85 border border-border text-text-primary font-semibold hover:bg-white transition-colors"
                >
                  Explore 99 Names
                </Link>
                <Link
                  href={`/learn/islamic-calendar`}
                  className="px-5 py-3 rounded-full bg-white/85 border border-border text-text-primary font-semibold hover:bg-white transition-colors"
                >
                  Open Islamic calendar
                </Link>
              </div>

              <div className="grid sm:grid-cols-3 gap-3 mt-8 max-w-4xl">
                {[
                  {
                    title: "Repeatable pages",
                    text: "Duas, remembrance and devotional study that stay useful after the first visit.",
                  },
                  {
                    title: "Seasonal guidance",
                    text: "Ramadan, Islamic dates and sacred seasons surfaced at the right time.",
                  },
                  {
                    title: "Connected learning",
                    text: "Study that stays close to prayer, Muslim news and daily Muslim life.",
                  },
                ].map((item) => (
                  <div
                    key={item.title}
                    className="rounded-[1.35rem] border border-black/5 bg-white/60 p-4 shadow-[0_10px_28px_rgba(54,44,34,0.06)]"
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
                    Start Here
                  </p>
                  <h2 className="text-2xl md:text-3xl font-bold font-display leading-tight">
                    The learn hub should match the kind of Islamic return visit people actually make.
                  </h2>
                </div>
                <Link
                  href={``}
                  className="hidden md:inline-flex px-3 py-2 rounded-full bg-white/10 border border-white/10 text-xs font-bold uppercase tracking-[0.16em] text-white/80"
                >
                  Portal
                </Link>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                {startCards.map((card) => (
                  <Link
                    key={card.title}
                    href={card.href}
                    className="rounded-[1.5rem] border border-white/10 bg-white/6 p-5 hover:bg-white/10 transition-colors"
                  >
                    <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/60 mb-3">
                      {card.eyebrow}
                    </div>
                    <h3 className="text-xl font-bold font-display leading-tight mb-2">
                      {card.title}
                    </h3>
                    <p className="text-sm leading-relaxed text-white/75">{card.description}</p>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="mt-8 grid grid-cols-1 xl:grid-cols-[0.8fr_1.2fr] gap-6">
          <div className="rounded-[2rem] bg-gradient-to-br from-[#3A291F] via-[#5A3D2D] to-[#87614C] text-white p-8 border border-white/10 shadow-[0_20px_60px_rgba(56,34,24,0.22)] relative overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(244,185,66,0.24),transparent_28%)]" />
            <div className="relative">
              <p className="text-sm font-bold uppercase tracking-[0.22em] text-[#F6D48B] mb-3">
                {seasonalFocus.eyebrow}
              </p>
              <h2 className="text-3xl md:text-4xl font-bold font-display leading-tight mb-4">
                {seasonalFocus.title}
              </h2>
              <p className="text-sm md:text-base text-white/78 leading-relaxed">
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
                  Learning Surfaces
                </p>
                <h2 className="text-3xl md:text-4xl font-bold font-display text-text-primary">
                  Pages a Muslim learning hub should surface before users go looking elsewhere.
                </h2>
              </div>
              <Link href={`/news`} className="text-sm font-bold text-primary hover:underline shrink-0">
                Read Muslim updates →
              </Link>
            </div>

            <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-4">
              {featuredPages.map((page) => (
                <Link
                  key={page.title}
                  href={page.href}
                  className={`rounded-[1.5rem] p-5 border border-border bg-gradient-to-br ${page.accent} shadow-sm hover:-translate-y-1 transition-transform`}
                >
                  <span className="inline-flex px-2.5 py-1 rounded-full bg-white/15 text-[10px] font-bold uppercase tracking-[0.18em] mb-3">
                    {page.tag}
                  </span>
                  <h3 className="text-xl font-bold font-display mb-2">{page.title}</h3>
                  <p className="text-sm leading-relaxed opacity-90">{page.description}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className="mt-16">
          <div className="max-w-3xl mb-8">
            <p className="text-sm font-bold uppercase tracking-[0.22em] text-primary mb-3">
              Study Paths
            </p>
            <h2 className="text-4xl md:text-5xl font-bold font-display text-text-primary mb-4">
              A stronger learn page groups Islamic knowledge by how Muslims actually return to it.
            </h2>
            <p className="text-lg text-text-secondary leading-relaxed">
              The goal is not a generic resource center. It is a learning hub that supports daily remembrance, reflective study and sacred-season relevance.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {studyTracks.map((track) => (
              <div
                key={track.title}
                className={`rounded-[2rem] border border-border bg-gradient-to-br ${track.accent} p-8 shadow-card`}
              >
                <h3 className="text-3xl font-bold font-display mb-4">{track.title}</h3>
                <p className="text-sm md:text-base leading-relaxed opacity-90 max-w-xl">
                  {track.description}
                </p>
                <div className="mt-6 flex flex-wrap gap-3">
                  {track.links.map((link) => (
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

        <section className="mt-16 grid grid-cols-1 xl:grid-cols-[1.2fr_0.8fr] gap-6">
          <div className="bg-white rounded-[2rem] p-8 border border-border shadow-card">
            <p className="text-sm font-bold uppercase tracking-[0.22em] text-primary mb-3">
              Why This Hub Matters
            </p>
            <h2 className="text-3xl md:text-4xl font-bold font-display text-text-primary mb-6">
              Islamic learning should make the portal deeper, not just broader.
            </h2>

            <div className="grid gap-4">
              {proofPoints.map((point) => (
                <div key={point.title} className="rounded-[1.5rem] border border-border bg-bg-secondary/50 p-5">
                  <h3 className="text-xl font-bold font-display text-text-primary mb-2">
                    {point.title}
                  </h3>
                  <p className="text-sm text-text-secondary leading-relaxed">{point.text}</p>
                </div>
              ))}
            </div>

            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                href={`/learn/duas`}
                className="px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-bold"
              >
                Daily duas
              </Link>
              <Link
                href={`/learn/99-names`}
                className="px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-bold"
              >
                99 Names
              </Link>
              <Link
                href={`/learn/ramadan`}
                className="px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-bold"
              >
                Ramadan guidance
              </Link>
              <Link
                href={`/learn/islamic-calendar`}
                className="px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-bold"
              >
                Islamic calendar
              </Link>
            </div>
          </div>

          <div className="bg-bg-dark rounded-[2rem] p-8 border border-white/10 shadow-2xl text-text-inverse">
            <p className="text-sm font-bold uppercase tracking-[0.22em] text-accent-yellow mb-3">
              Learn + Live
            </p>
            <h2 className="text-3xl font-bold font-display mb-4">
              The learn hub should stay connected to worship, not float by itself.
            </h2>
            <p className="text-text-inverse-secondary leading-relaxed mb-6">
              When the learning layer connects naturally to prayer, the Islamic calendar and daily Muslim rhythm, people come back for understanding instead of bouncing after one article.
            </p>

            <div className="space-y-4">
              {[
                {
                  title: "Open prayer times first",
                  href: `/prayer-times`,
                },
                {
                  title: "See what matters today",
                  href: `/news`,
                },
                {
                  title: "Return to the homepage",
                  href: `/`,
                },
              ].map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="block rounded-2xl border border-white/10 bg-white/5 p-4 hover:bg-white/10 transition-colors"
                >
                  <span className="text-sm font-bold text-white">{item.title}</span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className="mt-16 grid grid-cols-1 xl:grid-cols-[0.95fr_1.05fr] gap-6">
          <div className="rounded-[2rem] border border-border bg-white p-8 shadow-card">
            <p className="text-sm font-bold uppercase tracking-[0.22em] text-primary mb-3">
              Learn FAQ
            </p>
            <h2 className="text-3xl md:text-4xl font-bold font-display text-text-primary mb-6">
              Common questions a Muslim learning hub should answer quickly.
            </h2>

            <div className="space-y-4">
              {learnFaqs.map((faq) => (
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

          <div className="rounded-[2rem] border border-border bg-white p-8 shadow-card flex flex-col">
            <p className="text-sm font-bold uppercase tracking-[0.22em] text-primary mb-3">
              Keep Learning Close
            </p>
            <h2 className="text-3xl md:text-4xl font-bold font-display text-text-primary mb-4">
              The strongest learning pages are the ones Muslims can return to in ordinary life.
            </h2>
            <p className="text-text-secondary leading-relaxed mb-6">
              This is where allhalal.info can become more than a halal checker or news site: a place people revisit for remembrance, Islamic dates and foundational understanding.
            </p>

            <div className="grid sm:grid-cols-2 gap-4 mb-6">
              {[
                {
                  title: "Duas for ordinary moments",
                  text: "Useful in daily life and easy to return to from mobile.",
                },
                {
                  title: "Names of Allah for reflection",
                  text: "A page that blends memorisation, meaning and devotional study.",
                },
                {
                  title: "Calendar for context",
                  text: "A practical page that gives the Islamic year shape and visibility.",
                },
                {
                  title: "Ramadan when timing matters",
                  text: "Seasonal content that becomes critical when the month arrives.",
                },
              ].map((item) => (
                <div key={item.title} className="rounded-[1.4rem] border border-border bg-bg-secondary/45 p-5">
                  <h3 className="text-lg font-bold font-display text-text-primary mb-2">{item.title}</h3>
                  <p className="text-sm text-text-secondary leading-relaxed">{item.text}</p>
                </div>
              ))}
            </div>

            <AppPromoMini />
          </div>
        </section>
      </div>
    </main>
  );
}
