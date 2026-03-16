import type { Metadata } from "next";
import Link from "next/link";
import AppPromoMini from "@/components/ui/AppPromoMini";
import FAQSchema from "@/components/seo/FAQSchema";
import { SITE_URL } from "@/lib/seo/metadata";

export const metadata: Metadata = {
  title: "Halal Finance Hub | Zakat, Investing, Mortgages & Islamic Banking",
  description:
    "Explore halal finance on allhalal.info with zakat tools, halal investing guides, Islamic banking pages and halal mortgage resources for Muslims making real money decisions.",
  keywords: [
    "halal finance",
    "Islamic finance",
    "zakat calculator",
    "halal investing",
    "Islamic banking",
    "halal mortgage",
    "Muslim finance hub",
  ],
  openGraph: {
    title: "Halal Finance Hub | Zakat, Investing, Mortgages & Islamic Banking",
    description:
      "Muslim finance hub for zakat, halal investing, Islamic banking and halal mortgage guidance.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Halal Finance Hub | Zakat, Investing, Mortgages & Islamic Banking",
    description:
      "Muslim finance hub for zakat, halal investing, Islamic banking and halal mortgage guidance.",
  },
};

const financeFaqs = [
  {
    question: "What can I do in the allhalal.info finance hub?",
    answer:
      "You can calculate zakat, explore halal investing, understand Islamic banking options and learn how halal mortgages work without relying on generic conventional-finance advice.",
  },
  {
    question: "Is this finance section only for advanced investors?",
    answer:
      "No. The hub is structured for ordinary Muslim decisions such as zakat, saving, home financing and getting started with halal investing.",
  },
  {
    question: "Why should a Muslim portal include finance at all?",
    answer:
      "Finance is one of the areas where Muslims need clear practical guidance to avoid riba, understand halal structures and make major life decisions with confidence.",
  },
  {
    question: "Where should a new visitor start in finance?",
    answer:
      "Most visitors start with zakat or the halal investing guide because those are high-frequency decisions. For larger life decisions, the mortgage and banking pages are the strongest next entry points.",
  },
];

export default async function FinanceHub(props: { params: Promise<{ locale: string }> }) {
  const { locale } = await props.params;

  const startCards = [
    {
      eyebrow: "Recurring duty",
      title: "Calculate zakat with a live Nisab reference",
      description:
        "The finance hub should start with one of the most repeated Muslim money needs: zakat calculation with current thresholds.",
      href: `/${locale}/finance/zakat-calculator`,
    },
    {
      eyebrow: "Wealth building",
      title: "Understand halal investing before you buy",
      description:
        "Guide Muslims through Shariah-compliant investing, basic screening logic and beginner-friendly entry points.",
      href: `/${locale}/finance/investing`,
    },
    {
      eyebrow: "Major life decision",
      title: "Compare halal mortgage pathways",
      description:
        "Home financing is too important for vague copy. The hub should route users directly into real contract models and providers.",
      href: `/${locale}/finance/mortgages`,
    },
    {
      eyebrow: "Everyday banking",
      title: "See Islamic banking and account options",
      description:
        "Muslims also need practical clarity around accounts, banks, credit and daily money infrastructure.",
      href: `/${locale}/finance/banks`,
    },
  ];

  const featuredPages = [
    {
      title: "Zakat Calculator",
      description: "Live Nisab threshold and a practical tool people return to whenever zakat becomes due.",
      href: `/${locale}/finance/zakat-calculator`,
      tag: "Practical tool",
      accent: "from-[#2A5C58] to-[#3A7C77] text-white",
    },
    {
      title: "Halal Investing",
      description: "A strong beginner path into Shariah-compliant investing, ETFs and screening logic.",
      href: `/${locale}/finance/investing`,
      tag: "Start investing",
      accent: "from-[#3A526A] to-[#57738C] text-white",
    },
    {
      title: "Halal Mortgages",
      description: "One of the highest-stakes Muslim finance decisions and a core hub page for trust.",
      href: `/${locale}/finance/mortgages`,
      tag: "Big decision",
      accent: "from-[#6B4A37] to-[#93644B] text-white",
    },
    {
      title: "Islamic Banks",
      description: "A clearer route into accounts, institutions and banking questions Muslims ask constantly.",
      href: `/${locale}/finance/banks`,
      tag: "Banking clarity",
      accent: "from-[#556343] to-[#7B8B64] text-white",
    },
  ];

  const decisionTracks = [
    {
      title: "For annual obligations",
      description:
        "Zakat should be surfaced as an action, not buried as a blog topic. This is the repeatable finance utility Muslims come back for year after year.",
      links: [
        { label: "Zakat calculator", href: `/${locale}/finance/zakat-calculator` },
        { label: "Islamic calendar", href: `/${locale}/learn/islamic-calendar` },
        { label: "Duas & Athkar", href: `/${locale}/learn/duas` },
      ],
      accent: "from-[#DDEBE8] to-[#EEF6F4] text-text-primary",
    },
    {
      title: "For building wealth carefully",
      description:
        "Halal investing needs more than generic motivation. Users need screening logic, realistic starting points and paths that reduce confusion.",
      links: [
        { label: "Halal investing", href: `/${locale}/finance/investing` },
        { label: "Methodology", href: `/${locale}/methodology` },
        { label: "Read the briefing", href: `/${locale}/news` },
      ],
      accent: "from-[#E8E0D5] to-[#F6F0E7] text-text-primary",
    },
    {
      title: "For major family decisions",
      description:
        "Mortgage guidance should feel like a serious product surface, because Muslims making housing decisions need structure, not just broad reassurance.",
      links: [
        { label: "Halal mortgages", href: `/${locale}/finance/mortgages` },
        { label: "Islamic banks", href: `/${locale}/finance/banks` },
        { label: "Contact support", href: `/${locale}/support` },
      ],
      accent: "from-[#384D5F] to-[#577084] text-white",
    },
    {
      title: "For everyday money hygiene",
      description:
        "The finance hub should also answer practical account and banking questions that affect Muslims month after month.",
      links: [
        { label: "Islamic banks", href: `/${locale}/finance/banks` },
        { label: "Halal checker", href: `/${locale}/is-it-halal` },
        { label: "Homepage", href: `/${locale}` },
      ],
      accent: "from-[#3D2B23] to-[#624639] text-white",
    },
  ];

  const proofPoints = [
    {
      title: "High-stakes guidance belongs in the portal",
      text: "A Muslim portal should not stop at food or prayer. Finance is where values meet long-term consequences.",
    },
    {
      title: "Practical decisions beat generic inspiration",
      text: "Users need routes into zakat, investing, banking and home financing with pages they can actually use.",
    },
    {
      title: "Trust matters more in finance",
      text: "Methodology, clearer structures and realistic framing are especially important when the user is making money decisions.",
    },
  ];

  const quickQuestions = [
    {
      label: "How do I calculate zakat today?",
      href: `/${locale}/finance/zakat-calculator`,
      tag: "Obligation",
    },
    {
      label: "Are halal ETFs a good start?",
      href: `/${locale}/finance/investing`,
      tag: "Investing",
    },
    {
      label: "What makes a mortgage halal?",
      href: `/${locale}/finance/mortgages`,
      tag: "Home finance",
    },
    {
      label: "Can I use a normal bank account?",
      href: `/${locale}/finance/banks`,
      tag: "Banking",
    },
    {
      label: "Where do Muslims start with finance?",
      href: `/${locale}/finance`,
      tag: "Overview",
    },
    {
      label: "What does riba change in daily life?",
      href: `/${locale}/methodology`,
      tag: "Trust",
    },
  ];

  const financeSchema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": `${SITE_URL}/${locale}/finance#webpage`,
        url: `${SITE_URL}/${locale}/finance`,
        name: "Halal Finance Hub",
        description:
          "Finance hub for zakat, halal investing, Islamic banking and halal mortgage guidance for Muslims.",
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
            item: `${SITE_URL}/${locale}`,
          },
          {
            "@type": "ListItem",
            position: 2,
            name: "Finance",
            item: `${SITE_URL}/${locale}/finance`,
          },
        ],
      },
    ],
  };

  return (
    <main className="pt-32 pb-20 bg-bg-primary min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(financeSchema) }}
      />
      <FAQSchema faqs={financeFaqs} />

      <div className="container max-w-7xl mx-auto">
        <section className="relative overflow-hidden rounded-[2.5rem] border border-border bg-white/70 backdrop-blur-sm shadow-[0_18px_50px_rgba(48,40,29,0.08)]">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(75,122,136,0.16),transparent_28%),radial-gradient(circle_at_top_right,rgba(240,198,95,0.16),transparent_24%),linear-gradient(180deg,#f6f2ea_0%,#ece7dc_100%)]" />
          <div className="relative grid lg:grid-cols-[1.08fr_0.92fr] gap-8 p-8 md:p-10 lg:p-12">
            <div className="flex flex-col justify-center">
              <div className="inline-flex w-fit items-center gap-2 px-4 py-2 rounded-full bg-white/75 border border-black/5 shadow-sm mb-5">
                <span className="w-2.5 h-2.5 rounded-full bg-accent-teal" />
                <span className="text-[0.7rem] font-bold uppercase tracking-[0.24em] text-text-primary">
                  Halal Finance Hub
                </span>
              </div>

              <h1 className="text-[2.9rem] sm:text-[4rem] md:text-[4.8rem] lg:text-[5.2rem] font-black font-display text-text-primary tracking-tight leading-[0.98] max-w-5xl">
                Muslim money decisions need more than generic finance advice.
              </h1>

              <p className="text-text-secondary text-lg md:text-xl max-w-3xl mt-6 font-medium leading-relaxed">
                Zakat, halal investing, Islamic banking and halal mortgage guidance should be easy to reach, clearly explained and serious enough for real-life financial decisions.
              </p>

              <div className="flex flex-wrap gap-3 mt-8">
                <Link
                  href={`/${locale}/finance/zakat-calculator`}
                  className="px-5 py-3 rounded-full bg-gradient-gold text-[#4A3319] font-bold shadow-[0_8px_24px_rgba(176,144,98,0.25)] hover:-translate-y-0.5 transition-transform"
                >
                  Calculate zakat
                </Link>
                <Link
                  href={`/${locale}/finance/investing`}
                  className="px-5 py-3 rounded-full bg-white/85 border border-border text-text-primary font-semibold hover:bg-white transition-colors"
                >
                  Start halal investing
                </Link>
                <Link
                  href={`/${locale}/finance/mortgages`}
                  className="px-5 py-3 rounded-full bg-white/85 border border-border text-text-primary font-semibold hover:bg-white transition-colors"
                >
                  Compare mortgage paths
                </Link>
              </div>

              <div className="grid sm:grid-cols-3 gap-3 mt-8 max-w-4xl">
                {[
                  {
                    title: "Repeatable utility",
                    text: "Zakat and banking questions that come up again and again.",
                  },
                  {
                    title: "Long-term decisions",
                    text: "Investing and home financing with clearer Islamic framing.",
                  },
                  {
                    title: "Trust and structure",
                    text: "Less vague reassurance, more practical routes and decision support.",
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
                    The finance hub should match the exact kind of decision the Muslim user is trying to make.
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
                Most Common Questions
              </p>
              <h2 className="text-3xl md:text-4xl font-bold font-display leading-tight mb-4">
                The finance hub should surface the questions Muslims ask before money decisions get expensive.
              </h2>
              <p className="text-sm md:text-base text-white/78 leading-relaxed">
                Start with repeated needs like zakat and banking, then route into bigger decisions like investing and home financing with better clarity.
              </p>
            </div>
          </div>

          <div className="rounded-[2rem] border border-border bg-white/80 backdrop-blur-sm p-8 shadow-card">
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-6">
              <div>
                <p className="text-sm font-bold uppercase tracking-[0.22em] text-primary mb-3">
                  Quick Questions
                </p>
                <h2 className="text-3xl md:text-4xl font-bold font-display text-text-primary">
                  High-intent routes the homepage and finance hub should keep visible.
                </h2>
              </div>
              <Link href={`/${locale}/methodology`} className="text-sm font-bold text-primary hover:underline shrink-0">
                Review our methodology →
              </Link>
            </div>

            <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-4">
              {quickQuestions.map((item) => (
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

        <section className="mt-16">
          <div className="max-w-3xl mb-8">
            <p className="text-sm font-bold uppercase tracking-[0.22em] text-primary mb-3">
              Core Paths
            </p>
            <h2 className="text-4xl md:text-5xl font-bold font-display text-text-primary mb-4">
              A stronger finance page should group Muslim money decisions by the kind of action people need to take.
            </h2>
            <p className="text-lg text-text-secondary leading-relaxed">
              The goal is not a generic Islamic finance article list. It is a usable decision hub that supports obligations, wealth-building and high-stakes family choices.
            </p>
          </div>

          <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-4">
            {featuredPages.map((page) => (
              <Link
                key={page.title}
                href={page.href}
                className={`rounded-[1.6rem] p-6 border border-border bg-gradient-to-br ${page.accent} shadow-sm hover:-translate-y-1 transition-transform`}
              >
                <span className="inline-flex px-2.5 py-1 rounded-full bg-white/15 text-[10px] font-bold uppercase tracking-[0.18em] mb-3">
                  {page.tag}
                </span>
                <h3 className="text-2xl font-bold font-display mb-2">{page.title}</h3>
                <p className="text-sm leading-relaxed opacity-90">{page.description}</p>
              </Link>
            ))}
          </div>
        </section>

        <section className="mt-16">
          <div className="max-w-3xl mb-8">
            <p className="text-sm font-bold uppercase tracking-[0.22em] text-primary mb-3">
              Decision Tracks
            </p>
            <h2 className="text-4xl md:text-5xl font-bold font-display text-text-primary mb-4">
              Muslim finance is easier to understand when the page follows real decisions instead of generic categories.
            </h2>
            <p className="text-lg text-text-secondary leading-relaxed">
              This is where a finance hub becomes useful: it helps users move from a concrete question into the right combination of tool, guide and next step.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {decisionTracks.map((track) => (
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

        <section className="mt-16 grid grid-cols-1 xl:grid-cols-[1.15fr_0.85fr] gap-6">
          <div className="bg-white rounded-[2rem] p-8 border border-border shadow-card">
            <p className="text-sm font-bold uppercase tracking-[0.22em] text-primary mb-3">
              Why This Hub Matters
            </p>
            <h2 className="text-3xl md:text-4xl font-bold font-display text-text-primary mb-6">
              Finance is one of the clearest ways a Muslim portal proves it is useful beyond headlines and tools.
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
                href={`/${locale}/finance/zakat-calculator`}
                className="px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-bold"
              >
                Zakat
              </Link>
              <Link
                href={`/${locale}/finance/investing`}
                className="px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-bold"
              >
                Investing
              </Link>
              <Link
                href={`/${locale}/finance/mortgages`}
                className="px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-bold"
              >
                Mortgages
              </Link>
              <Link
                href={`/${locale}/finance/banks`}
                className="px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-bold"
              >
                Banking
              </Link>
            </div>
          </div>

          <div className="bg-bg-dark rounded-[2rem] p-8 border border-white/10 shadow-2xl text-text-inverse flex flex-col">
            <p className="text-sm font-bold uppercase tracking-[0.22em] text-accent-yellow mb-3">
              Trust Layer
            </p>
            <h2 className="text-3xl font-bold font-display mb-4">
              Money guidance should feel deliberate, not improvised.
            </h2>
            <p className="text-text-inverse-secondary leading-relaxed mb-6">
              The finance hub should visibly route people into methodology, support and related portal surfaces so they can move with more confidence, not less.
            </p>

            <div className="space-y-4 mb-6">
              {[
                {
                  title: "Review methodology",
                  href: `/${locale}/methodology`,
                },
                {
                  title: "Read Muslim briefing",
                  href: `/${locale}/news`,
                },
                {
                  title: "Open support",
                  href: `/${locale}/support`,
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

            <AppPromoMini />
          </div>
        </section>

        <section className="mt-16 grid grid-cols-1 xl:grid-cols-[0.95fr_1.05fr] gap-6">
          <div className="rounded-[2rem] border border-border bg-white p-8 shadow-card">
            <p className="text-sm font-bold uppercase tracking-[0.22em] text-primary mb-3">
              Finance FAQ
            </p>
            <h2 className="text-3xl md:text-4xl font-bold font-display text-text-primary mb-6">
              Common questions a halal finance hub should answer quickly.
            </h2>

            <div className="space-y-4">
              {financeFaqs.map((faq) => (
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

          <div className="rounded-[2rem] border border-border bg-white p-8 shadow-card">
            <p className="text-sm font-bold uppercase tracking-[0.22em] text-primary mb-3">
              Finance Perspective
            </p>
            <h2 className="text-3xl md:text-4xl font-bold font-display text-text-primary mb-4">
              A better Muslim finance page connects obligation, restraint and long-term planning.
            </h2>
            <p className="text-text-secondary leading-relaxed mb-6">
              This is where allhalal.info becomes more than a utility site: a place that helps Muslims think clearly about money without separating finance from values.
            </p>

            <div className="grid sm:grid-cols-2 gap-4">
              {[
                {
                  title: "Zakat as practice",
                  text: "Not just a calculator, but a recurring obligation that should stay visible and current.",
                },
                {
                  title: "Investing with screens",
                  text: "The value is in reducing confusion around what compliant investing actually requires.",
                },
                {
                  title: "Mortgages with structure",
                  text: "Users need models, tradeoffs and provider context, not vague halal branding.",
                },
                {
                  title: "Banking with boundaries",
                  text: "Everyday account questions matter because they shape ordinary Muslim money life.",
                },
              ].map((item) => (
                <div key={item.title} className="rounded-[1.4rem] border border-border bg-bg-secondary/45 p-5">
                  <h3 className="text-lg font-bold font-display text-text-primary mb-2">{item.title}</h3>
                  <p className="text-sm text-text-secondary leading-relaxed">{item.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
