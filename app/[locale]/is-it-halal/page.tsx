import type { Metadata } from "next";
import Link from "next/link";
import AppPromoMini from "@/components/ui/AppPromoMini";
import FAQSchema from "@/components/seo/FAQSchema";
import HalalSearchClient from "./HalalSearchClient";
import { halalItems } from "@/data/halalItems";
import { SITE_URL } from "@/lib/seo/metadata";

export const metadata: Metadata = {
  title: "Is It Halal? Check Ingredients, E-Codes, Snacks, Drinks & Brands",
  description:
    "Search popular halal questions on AllHalal. Check ingredients, E-codes, snacks, drinks, fast food and commonly asked products for halal, haram or doubtful status.",
  keywords: [
    "is it halal",
    "halal checker",
    "halal ingredients",
    "halal e codes",
    "is gelatin halal",
    "is carmine halal",
    "halal snacks",
    "halal drinks",
  ],
  openGraph: {
    title: "Is It Halal? Check Ingredients, E-Codes, Snacks, Drinks & Brands",
    description:
      "Search popular halal questions across ingredients, additives, snacks, drinks and fast food with clear verdicts and practical explanations.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Is It Halal? Check Ingredients, E-Codes, Snacks, Drinks & Brands",
    description:
      "Search popular halal questions across ingredients, additives, snacks, drinks and fast food with clear verdicts and practical explanations.",
  },
};

const halalFaqs = [
  {
    question: "How should I use the halal checker?",
    answer:
      "Start by searching the exact product, ingredient or E-code you are unsure about. Then move into the detailed explanation, verdict and related halal questions in the same category.",
  },
  {
    question: "What does doubtful mean in halal checking?",
    answer:
      "Doubtful means the item can come from both halal and non-halal sources, or there are meaningful scholarly differences about it. In those cases, the source, certification and region matter.",
  },
  {
    question: "Is the web checker the full AllHalal database?",
    answer:
      "No. The website focuses on curated, high-frequency halal questions that people repeatedly search. The mobile app is positioned as the broader live database and scanner experience.",
  },
  {
    question: "Why is this page important for the portal?",
    answer:
      "Halal clarity is one of the strongest recurring reasons Muslims search. This page should work as both a direct answer engine and an internal hub for ingredient, additive, snack and brand-related questions.",
  },
];

const categoryConfig = [
  {
    id: "ingredient",
    name: "Ingredients",
    description: "Core ingredient questions like gelatin, whey and vanilla extract.",
  },
  {
    id: "additive",
    name: "Additives & E-Codes",
    description: "High-intent E-number checks like E120, E471 and E904.",
  },
  {
    id: "snack",
    name: "Snacks & Sweets",
    description: "Popular snack brands that Muslims repeatedly search before buying.",
  },
  {
    id: "drink",
    name: "Drinks",
    description: "Soft drinks, energy drinks and beverage questions with ingredient context.",
  },
  {
    id: "fast-food",
    name: "Fast Food",
    description: "Chain-specific questions where region and preparation matter.",
  },
] as const;

export default async function IsItHalalPage(props: { params: Promise<{ locale: string }> }) {
  const { locale } = await props.params;

  const highPriorityItems = halalItems.filter((item) => item.priority === "high").slice(0, 8);
  const verdictStats = {
    halal: halalItems.filter((item) => item.verdict === "halal").length,
    doubtful: halalItems.filter((item) => item.verdict === "doubtful").length,
    haram: halalItems.filter((item) => item.verdict === "haram").length,
  };

  const popularPaths = [
    {
      title: "Is gelatin halal?",
      href: `/${locale}/is-it-halal/is-gelatin-halal`,
      tag: "Ingredient",
      text: "One of the highest-frequency halal questions online and a core entry point into source-based rulings.",
    },
    {
      title: "Is carmine halal?",
      href: `/${locale}/is-it-halal/is-carmine-halal`,
      tag: "E-code",
      text: "A classic additive question that introduces madhhab differences and insect-derived ingredients.",
    },
    {
      title: "Is E471 halal?",
      href: `/${locale}/is-it-halal/is-e471-halal`,
      tag: "Additive",
      text: "A major emulsifier question where plant vs animal origin matters.",
    },
    {
      title: "Are Doritos halal?",
      href: `/${locale}/is-it-halal/is-doritos-halal`,
      tag: "Snack brand",
      text: "A popular product query that shows why regional recipes and enzymes matter.",
    },
    {
      title: "Are Takis halal?",
      href: `/${locale}/is-it-halal/is-takis-halal`,
      tag: "Snack brand",
      text: "A recurring search for a widely discussed snack with region-specific uncertainty.",
    },
    {
      title: "Are McDonald's fries halal?",
      href: `/${locale}/is-it-halal/is-mcdonalds-fries-halal`,
      tag: "Fast food",
      text: "A strong example of why chain, country and preparation process all matter.",
    },
  ];

  const checkerSchema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": `${SITE_URL}/${locale}/is-it-halal#webpage`,
        url: `${SITE_URL}/${locale}/is-it-halal`,
        name: "Is It Halal Checker",
        description:
          "Halal checker for ingredients, E-codes, snacks, drinks, fast food and commonly searched products.",
        isPartOf: { "@id": `${SITE_URL}/#website` },
        inLanguage: locale,
      },
      {
        "@type": "WebSite",
        "@id": `${SITE_URL}/#website`,
        potentialAction: {
          "@type": "SearchAction",
          target: `${SITE_URL}/${locale}/is-it-halal?q={search_term_string}`,
          "query-input": "required name=search_term_string",
        },
      },
    ],
  };

  return (
    <main className="pt-32 pb-20 bg-bg-primary min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(checkerSchema) }}
      />
      <FAQSchema faqs={halalFaqs} />

      <div className="container max-w-7xl mx-auto">
        <section className="relative overflow-hidden rounded-[2.5rem] border border-border bg-white/70 backdrop-blur-sm shadow-[0_18px_50px_rgba(48,40,29,0.08)]">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(75,122,136,0.14),transparent_28%),radial-gradient(circle_at_top_right,rgba(240,198,95,0.16),transparent_24%),linear-gradient(180deg,#f6f2ea_0%,#ece7dc_100%)]" />
          <div className="relative grid lg:grid-cols-[1.08fr_0.92fr] gap-8 p-8 md:p-10 lg:p-12">
            <div className="flex flex-col justify-center">
              <div className="inline-flex w-fit items-center gap-2 px-4 py-2 rounded-full bg-white/75 border border-black/5 shadow-sm mb-5">
                <span className="w-2.5 h-2.5 rounded-full bg-accent-green" />
                <span className="text-[0.7rem] font-bold uppercase tracking-[0.24em] text-text-primary">
                  Halal Checker Hub
                </span>
              </div>

              <h1 className="text-[2.9rem] sm:text-[4rem] md:text-[4.8rem] lg:text-[5.2rem] font-black font-display text-text-primary tracking-tight leading-[0.98] max-w-5xl">
                Find halal answers for products, ingredients and E-codes fast.
              </h1>

              <p className="text-text-secondary text-lg md:text-xl max-w-3xl mt-6 font-medium leading-relaxed">
                This should be one of the strongest search surfaces on allhalal.info: clear verdicts, source-aware explanations and fast routes into ingredients, additives, snacks, drinks and fast food.
              </p>

              <div className="flex flex-wrap gap-3 mt-8">
                <Link
                  href={`/${locale}/is-it-halal/is-gelatin-halal`}
                  className="px-5 py-3 rounded-full bg-gradient-gold text-[#4A3319] font-bold shadow-[0_8px_24px_rgba(176,144,98,0.25)] hover:-translate-y-0.5 transition-transform"
                >
                  Check gelatin
                </Link>
                <Link
                  href={`/${locale}/is-it-halal/is-carmine-halal`}
                  className="px-5 py-3 rounded-full bg-white/85 border border-border text-text-primary font-semibold hover:bg-white transition-colors"
                >
                  Check E120
                </Link>
                <Link
                  href={`/${locale}/is-it-halal/category/additive`}
                  className="px-5 py-3 rounded-full bg-white/85 border border-border text-text-primary font-semibold hover:bg-white transition-colors"
                >
                  Browse additives
                </Link>
              </div>

              <div className="grid sm:grid-cols-3 gap-3 mt-8 max-w-4xl">
                <div className="rounded-[1.35rem] border border-black/5 bg-white/60 p-4 shadow-[0_10px_28px_rgba(54,44,34,0.06)]">
                  <p className="text-sm font-bold text-text-primary mb-1">High-intent search</p>
                  <p className="text-sm text-text-secondary leading-relaxed">
                    Ingredient, E-code and brand questions people actually search.
                  </p>
                </div>
                <div className="rounded-[1.35rem] border border-black/5 bg-white/60 p-4 shadow-[0_10px_28px_rgba(54,44,34,0.06)]">
                  <p className="text-sm font-bold text-text-primary mb-1">Source-aware verdicts</p>
                  <p className="text-sm text-text-secondary leading-relaxed">
                    Clearer answers for plant, animal, synthetic and region-specific cases.
                  </p>
                </div>
                <div className="rounded-[1.35rem] border border-black/5 bg-white/60 p-4 shadow-[0_10px_28px_rgba(54,44,34,0.06)]">
                  <p className="text-sm font-bold text-text-primary mb-1">Deeper routes</p>
                  <p className="text-sm text-text-secondary leading-relaxed">
                    Category hubs and related questions that keep the checker useful.
                  </p>
                </div>
              </div>
            </div>

            <div className="rounded-[2rem] border border-white/20 bg-[#173341] text-white p-6 md:p-7 shadow-[0_18px_50px_rgba(17,36,47,0.28)]">
              <div className="flex items-start justify-between gap-4 mb-6">
                <div>
                  <p className="text-[11px] font-bold uppercase tracking-[0.24em] text-white/55 mb-2">
                    Search Surface
                  </p>
                  <h2 className="text-2xl md:text-3xl font-bold font-display leading-tight">
                    The halal checker should route users by the kind of uncertainty they are trying to resolve.
                  </h2>
                </div>
                <Link
                  href="https://apps.apple.com/us/app/allhalal-info-food-scanner/id6756242265"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hidden md:inline-flex px-3 py-2 rounded-full bg-white/10 border border-white/10 text-xs font-bold uppercase tracking-[0.16em] text-white/80"
                >
                  App
                </Link>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                {categoryConfig.map((category) => {
                  const count = halalItems.filter((item) => item.category === category.id).length;

                  return (
                    <Link
                      key={category.id}
                      href={`/${locale}/is-it-halal/category/${category.id}`}
                      className="rounded-[1.5rem] border border-white/10 bg-white/6 p-5 hover:bg-white/10 transition-colors"
                    >
                      <div className="flex items-center justify-between gap-3 mb-3">
                        <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/60">
                          {count} items
                        </span>
                        <span className="text-[10px] font-bold uppercase tracking-[0.16em] text-white/40">
                          Category
                        </span>
                      </div>
                      <h3 className="text-xl font-bold font-display leading-tight mb-2">
                        {category.name}
                      </h3>
                      <p className="text-sm leading-relaxed text-white/75">{category.description}</p>
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        <section className="mt-8 grid grid-cols-1 xl:grid-cols-[0.82fr_1.18fr] gap-6">
          <div className="rounded-[2rem] bg-gradient-to-br from-[#3A291F] via-[#5A3D2D] to-[#87614C] text-white p-8 border border-white/10 shadow-[0_20px_60px_rgba(56,34,24,0.22)] relative overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(244,185,66,0.24),transparent_28%)]" />
            <div className="relative">
              <p className="text-sm font-bold uppercase tracking-[0.22em] text-[#F6D48B] mb-3">
                Verdict Mix
              </p>
              <h2 className="text-3xl md:text-4xl font-bold font-display leading-tight mb-4">
                A useful halal hub makes the uncertainty visible instead of pretending every answer is simple.
              </h2>
              <div className="grid grid-cols-3 gap-3 mt-6">
                <div className="rounded-[1.4rem] bg-white/10 border border-white/10 p-4">
                  <div className="text-xs uppercase tracking-[0.18em] text-white/60 mb-2">Halal</div>
                  <div className="text-3xl font-black font-display">{verdictStats.halal}</div>
                </div>
                <div className="rounded-[1.4rem] bg-white/10 border border-white/10 p-4">
                  <div className="text-xs uppercase tracking-[0.18em] text-white/60 mb-2">Doubtful</div>
                  <div className="text-3xl font-black font-display">{verdictStats.doubtful}</div>
                </div>
                <div className="rounded-[1.4rem] bg-white/10 border border-white/10 p-4">
                  <div className="text-xs uppercase tracking-[0.18em] text-white/60 mb-2">Haram</div>
                  <div className="text-3xl font-black font-display">{verdictStats.haram}</div>
                </div>
              </div>
            </div>
          </div>

          <div className="rounded-[2rem] border border-border bg-white/80 backdrop-blur-sm p-8 shadow-card">
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-6">
              <div>
                <p className="text-sm font-bold uppercase tracking-[0.22em] text-primary mb-3">
                  Popular Paths
                </p>
                <h2 className="text-3xl md:text-4xl font-bold font-display text-text-primary">
                  High-intent halal questions the portal should keep one click away.
                </h2>
              </div>
              <Link href={`/${locale}/boycott-checker`} className="text-sm font-bold text-primary hover:underline shrink-0">
                Open boycott checker →
              </Link>
            </div>

            <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-4">
              {popularPaths.map((item) => (
                <Link
                  key={item.title}
                  href={item.href}
                  className="rounded-[1.35rem] border border-border bg-bg-secondary/55 p-5 hover:bg-white hover:border-primary/25 transition-colors"
                >
                  <span className="inline-flex px-2.5 py-1 rounded-full bg-primary/10 text-primary text-[10px] font-bold uppercase tracking-[0.18em] mb-3">
                    {item.tag}
                  </span>
                  <h3 className="text-lg font-bold font-display text-text-primary leading-tight mb-2">
                    {item.title}
                  </h3>
                  <p className="text-sm text-text-secondary leading-relaxed">{item.text}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className="mt-8">
          <HalalSearchClient items={halalItems} locale={locale} />
        </section>

        <section className="mt-16 grid grid-cols-1 xl:grid-cols-[1.15fr_0.85fr] gap-6">
          <div className="bg-white rounded-[2rem] p-8 border border-border shadow-card">
            <p className="text-sm font-bold uppercase tracking-[0.22em] text-primary mb-3">
              Why This Layer Matters
            </p>
            <h2 className="text-3xl md:text-4xl font-bold font-display text-text-primary mb-6">
              The halal checker is one of the clearest ways allhalal.info can become a repeat Muslim destination.
            </h2>

            <div className="grid md:grid-cols-2 gap-4 mb-6">
              {[
                {
                  title: "Searches Muslims already make",
                  text: "Products, additives and brand questions are among the highest-intent repeat searches in the space.",
                },
                {
                  title: "Fast answer plus explanation",
                  text: "A good checker gives the verdict immediately and then provides enough context to trust the answer.",
                },
                {
                  title: "Natural cluster expansion",
                  text: "Ingredients, E-codes, snacks, drinks and fast food all create strong internal SEO routes.",
                },
                {
                  title: "Strong app bridge",
                  text: "The web checker can answer high-frequency queries while positioning the app as the live scanner layer.",
                },
              ].map((item) => (
                <div key={item.title} className="rounded-[1.5rem] border border-border bg-bg-secondary/50 p-5">
                  <h3 className="text-xl font-bold font-display text-text-primary mb-2">{item.title}</h3>
                  <p className="text-sm text-text-secondary leading-relaxed">{item.text}</p>
                </div>
              ))}
            </div>

            <div className="flex flex-wrap gap-3">
              {categoryConfig.map((category) => (
                <Link
                  key={category.id}
                  href={`/${locale}/is-it-halal/category/${category.id}`}
                  className="px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-bold"
                >
                  {category.name}
                </Link>
              ))}
            </div>
          </div>

          <div className="bg-bg-dark rounded-[2rem] p-8 border border-white/10 shadow-2xl text-text-inverse flex flex-col">
            <p className="text-sm font-bold uppercase tracking-[0.22em] text-accent-yellow mb-3">
              Mobile Scanner
            </p>
            <h2 className="text-3xl font-bold font-display mb-4">
              The web hub should answer the common questions and push deeper product lookup into the app.
            </h2>
            <p className="text-text-inverse-secondary leading-relaxed mb-6">
              This is the right split: searchable public verdict pages for SEO and discovery, plus the mobile scanner for the broader live product database.
            </p>

            <div className="grid gap-4 mb-6">
              {highPriorityItems.slice(0, 4).map((item) => (
                <Link
                  key={item.slug}
                  href={`/${locale}/is-it-halal/${item.slug}`}
                  className="rounded-2xl border border-white/10 bg-white/5 p-4 hover:bg-white/10 transition-colors"
                >
                  <div className="flex items-center justify-between gap-3 mb-2">
                    <span className="text-sm font-bold text-white">{item.name}</span>
                    <span className="text-[10px] uppercase tracking-[0.16em] text-white/50">
                      {item.verdict}
                    </span>
                  </div>
                  <p className="text-xs text-white/65 line-clamp-2">{item.shortReason}</p>
                </Link>
              ))}
            </div>

            <a
              href="https://apps.apple.com/us/app/allhalal-info-food-scanner/id6756242265"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-5 py-3 rounded-xl bg-gradient-gold text-[#4A3319] font-bold"
            >
              Get the scanner app
            </a>
          </div>
        </section>

        <section className="mt-16 grid grid-cols-1 xl:grid-cols-[0.95fr_1.05fr] gap-6">
          <div className="rounded-[2rem] border border-border bg-white p-8 shadow-card">
            <p className="text-sm font-bold uppercase tracking-[0.22em] text-primary mb-3">
              Halal FAQ
            </p>
            <h2 className="text-3xl md:text-4xl font-bold font-display text-text-primary mb-6">
              Common questions a halal checker should answer quickly.
            </h2>

            <div className="space-y-4">
              {halalFaqs.map((faq) => (
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
              Keep Exploring
            </p>
            <h2 className="text-3xl md:text-4xl font-bold font-display text-text-primary mb-4">
              The strongest checker makes it easy to go from one verdict to the next useful question.
            </h2>
            <p className="text-text-secondary leading-relaxed mb-6">
              That means better category routes, clearer verdict language and enough internal linking that users stay inside the halal ecosystem instead of returning to search results.
            </p>

            <div className="grid sm:grid-cols-2 gap-4 mb-6">
              {[
                {
                  title: "Ingredients first",
                  text: "Many brand questions reduce to a small set of recurring source ingredients.",
                },
                {
                  title: "E-codes stay discoverable",
                  text: "Additives create some of the strongest repeat search patterns in halal food.",
                },
                {
                  title: "Brands create repeat use",
                  text: "Popular snacks and drinks pull users back into the checker over time.",
                },
                {
                  title: "Fast food needs context",
                  text: "Chain, region and process details keep these verdicts from becoming shallow.",
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
