import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { SITE_URL } from "@/lib/seo/metadata";

export const metadata: Metadata = {
  title: "Halal Food Knowledge Base: What Certification Really Means",
  description:
    "Understand halal certification, E-codes, and ingredient sourcing. We explain principles and regional differences—not just product lists.",
  keywords: [
    "halal certification",
    "e codes halal",
    "halal ingredients",
    "islamic food law",
    "halal standards",
    "food additives halal",
    "reading ingredient labels",
  ],
  openGraph: {
    title: "Halal Food Knowledge Base: Certification, E-Codes & Regional Differences",
    description:
      "Editorial guides on what makes food halal. We focus on principles and context, not viral product lists.",
    type: "website",
  },
};

const guides = [
  {
    slug: "halal-certification-standards",
    title: "What Your Halal Logo Actually Means",
    subtitle: "Certification bodies differ by country. Some require separate lines; others don't. Same logo ≠ same standard.",
    description:
      "Why JAKIM certificates are stricter than US bodies. When stunning matters. What 'halal-friendly' really means.",
    category: "Certification",
    readTime: "12 min",
    published: "2026-03-11",
    status: "live",
    badge: "Editor's Pick",
    difficulty: "Beginner",
    imageUrl: "/guides/certification-hero.jpg", // placeholder
    whatYouLearn: [
      "How certification bodies differ (JAKIM, MUI, IFANCA, HMC)",
      "Why the same product can be halal in one country but not another",
      "What questions to ask when you see a halal logo",
    ],
  },
  {
    slug: "e-numbers-complete-guide",
    title: "E-Codes Explained for Muslims",
    subtitle: "Not all E-numbers are suspicious. But some require context.",
    description:
      "E120 (carmine from insects), E471 (plant or animal?), E904 (shellac). Which ones need verification and why.",
    category: "Additives",
    readTime: "15 min",
    published: "2026-03-12",
    status: "live",
    badge: null,
    difficulty: "Intermediate",
    imageUrl: "/images/guides/e-codes-hero.jpg",
    whatYouLearn: [
      "Which E-codes are always problematic",
      "Which depend on source (plant vs animal)",
      "How to spot them on ingredient lists",
    ],
  },
  {
    slug: "animal-derived-ingredients",
    title: "Gelatin, Rennet & Hidden Animal Sources",
    subtitle: "Fish gelatin is halal. Pork gelatin isn't. Beef gelatin? Depends on slaughter.",
    description:
      "How to identify animal-derived enzymes, when 'suitable for vegetarians' still isn't enough, and what rennet in cheese means.",
    category: "Ingredients",
    readTime: "11 min",
    published: "2026-03-12",
    status: "live",
    badge: null,
    difficulty: "Intermediate",
    whatYouLearn: [
      "Pork vs beef vs fish gelatin sources",
      "Animal vs microbial rennet in cheese",
      "Hidden animal derivatives (L-cysteine, enzymes, whey)",
    ],
  },
  {
    slug: "alcohol-in-food",
    title: "Alcohol in Food: What Actually Matters",
    subtitle: "Vanilla extract has alcohol. Soy sauce ferments. Vinegar was wine. So what's permissible?",
    description:
      "The difference between khamr (intoxicating wine) and trace fermentation alcohol. Scholarly positions across madhahib.",
    category: "Fiqh",
    readTime: "9 min",
    published: "2026-03-12",
    status: "live",
    badge: null,
    difficulty: "Advanced",
    whatYouLearn: [
      "Khamr vs trace alcohol distinction",
      "Scholarly positions (strict, moderate, pragmatic)",
      "Vanilla extract, soy sauce, vinegar rulings",
    ],
  },
  {
    slug: "reading-ingredient-labels",
    title: "Can You Trust the Ingredient List?",
    subtitle: "Labels don't list processing aids. 'Natural flavors' can mean anything. Here's what to watch for.",
    description:
      "How to spot hidden animal derivatives, what 'and/or' means in ingredients, and when to email the manufacturer.",
    category: "Practical",
    readTime: "8 min",
    published: "2026-03-12",
    status: "live",
    badge: null,
    difficulty: "Beginner",
    whatYouLearn: [
      "What labels don't tell you (processing aids, shared equipment)",
      "Red flag terms: 'natural flavors,' 'enzymes'",
      "How to contact manufacturers effectively",
    ],
  },
  {
    slug: "regional-halal-differences",
    title: "Why McDonald's Is Halal in Malaysia But Not in the US",
    subtitle: "Same brand. Different recipes. Different suppliers. Different certification requirements.",
    description:
      "How global brands adapt by region, why certification doesn't travel, and what this means for Muslim consumers.",
    category: "Context",
    readTime: "10 min",
    published: "2026-03-12",
    status: "live",
    badge: null,
    difficulty: "Beginner",
    whatYouLearn: [
      "Why recipes differ by region",
      "McDonald's: Malaysia vs US vs UAE vs UK",
      "Why halal certification doesn't travel",
    ],
  },
];

export default async function HalalGuidesPage(props: {
  params: Promise<{ locale: string }>;
}) {
  const params = await props.params;
  const liveGuides = guides.filter((g) => g.status === "live");
  const upcomingGuides = guides.filter((g) => g.status === "upcoming");

  return (
    <main className="min-h-screen bg-[#FAFAF8]">
      {/* Hero Section - Editorial Masthead */}
      <section className="relative pt-40 pb-20 overflow-hidden bg-gradient-to-b from-white to-[#FAFAF8]">
        <div className="absolute inset-0 opacity-[0.03]">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%234B7A88' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }} />
        </div>
        
        <div className="container mx-auto px-6 md:px-12 max-w-5xl relative">
          <div className="space-y-8">
            <div className="inline-flex items-center gap-3">
              <div className="w-1 h-12 bg-[#4B7A88]" />
              <span className="text-sm font-bold uppercase tracking-[0.2em] text-[#4B7A88]">
                Knowledge Base
              </span>
            </div>
            <h1 className="text-6xl md:text-7xl lg:text-8xl font-black text-[#2A2419] tracking-tight leading-[0.95]">
              What your halal<br />logo{" "}
              <span className="italic text-[#4B7A88]">actually</span> means
            </h1>
            <p className="text-xl md:text-2xl text-[#5A5449] max-w-2xl leading-relaxed">
              We explain certification standards, ingredient sourcing, and regional differences.{" "}
              <span className="font-semibold text-[#2A2419]">Not just product lists.</span>
            </p>
          </div>
        </div>
      </section>

      {/* Live Guides - Hero Feature */}
      {liveGuides.length > 0 && (
        <section className="py-20 bg-white">
          <div className="container mx-auto px-6 md:px-12 max-w-7xl">
            <Link
              href={`/${params.locale}/is-it-halal/${liveGuides[0].slug}`}
              className="group block"
            >
              <article className="grid lg:grid-cols-2 gap-0 overflow-hidden rounded-3xl border-2 border-[#E8E6E1] hover:border-[#4B7A88] transition-all duration-500 bg-white hover:shadow-2xl">
                {/* Image */}
                <div className="relative min-h-[400px] lg:min-h-[600px] overflow-hidden">
                  <Image
                    src="/images/guides/certification-hero.jpg"
                    alt="Halal certification documents and official stamps on a professional desk"
                    fill
                    className="object-cover"
                    priority
                  />
                  {/* Badge overlay */}
                  {liveGuides[0].badge && (
                    <div className="absolute top-8 left-8">
                      <span className="px-4 py-2 bg-[#2A2419] text-white text-xs font-bold uppercase tracking-widest rounded-full shadow-lg">
                        {liveGuides[0].badge}
                      </span>
                    </div>
                  )}
                </div>
                
                {/* Content */}
                <div className="p-12 lg:p-16 flex flex-col justify-center bg-[#FAFAF8]">
                  <div className="flex items-center gap-3 mb-6">
                    <span className="text-xs uppercase tracking-[0.2em] font-bold text-[#4B7A88]">
                      {liveGuides[0].category}
                    </span>
                    <span className="w-1.5 h-1.5 rounded-full bg-[#C4C1B8]" />
                    <span className="text-sm text-[#7A7569]">
                      {liveGuides[0].readTime}
                    </span>
                    <span className="w-1.5 h-1.5 rounded-full bg-[#C4C1B8]" />
                    <span className="text-xs uppercase tracking-wide font-semibold text-[#7A7569]">
                      {liveGuides[0].difficulty}
                    </span>
                  </div>
                  
                  <h2 className="text-4xl lg:text-5xl font-black text-[#2A2419] mb-4 group-hover:text-[#4B7A88] transition-colors leading-[1.1]">
                    {liveGuides[0].title}
                  </h2>
                  
                  <p className="text-lg text-[#5A5449] mb-4 leading-relaxed italic border-l-4 border-[#F0C65F] pl-4">
                    {liveGuides[0].subtitle}
                  </p>
                  
                  <p className="text-[#7A7569] mb-8 leading-relaxed">
                    {liveGuides[0].description}
                  </p>
                  
                  {liveGuides[0].whatYouLearn && (
                    <div className="mb-8 space-y-2">
                      <p className="text-xs uppercase tracking-[0.15em] font-bold text-[#4B7A88] mb-3">
                        What you'll learn:
                      </p>
                      {liveGuides[0].whatYouLearn.map((item, idx) => (
                        <div key={idx} className="flex items-start gap-2">
                          <span className="text-[#4B7A88] mt-1">✓</span>
                          <span className="text-sm text-[#5A5449]">{item}</span>
                        </div>
                      ))}
                    </div>
                  )}
                  
                  <div className="flex items-center gap-3 text-[#4B7A88] font-bold text-lg group-hover:gap-4 transition-all">
                    Read full guide
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </div>
                </div>
              </article>
            </Link>
          </div>
        </section>
      )}

      {/* Upcoming Guides - Magazine Grid */}
      {liveGuides.length > 1 && (
        <section className="py-20 bg-[#FAFAF8]">
          <div className="container mx-auto px-6 md:px-12 max-w-7xl">
            <div className="flex items-center gap-4 mb-12">
              <div className="w-1 h-16 bg-[#4B7A88]" />
              <h2 className="text-5xl font-black text-[#2A2419]">
                More Guides
              </h2>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {liveGuides.slice(1).map((guide, idx) => (
                <Link
                  key={guide.slug}
                  href={`/${params.locale}/is-it-halal/${guide.slug}`}
                  className="group block"
                >
                  <article className="bg-white border-2 border-[#E8E6E1] rounded-2xl p-8 hover:border-[#4B7A88] transition-all duration-300 hover:shadow-xl h-full flex flex-col">
                    <div className="flex items-center gap-3 mb-4">
                      <span className="text-xs uppercase tracking-[0.18em] font-bold text-[#4B7A88]">
                        {guide.category}
                      </span>
                      {guide.difficulty && (
                        <>
                          <span className="w-1 h-1 rounded-full bg-[#C4C1B8]" />
                          <span className="text-xs uppercase tracking-wide font-semibold text-[#7A7569]">
                            {guide.difficulty}
                          </span>
                        </>
                      )}
                    </div>
                    
                    <h3 className="text-2xl font-black text-[#2A2419] mb-3 leading-tight group-hover:text-[#4B7A88] transition-colors">
                      {guide.title}
                    </h3>
                    
                    <p className="text-sm text-[#5A5449] mb-3 leading-relaxed italic">
                      {guide.subtitle}
                    </p>
                    
                    <p className="text-xs text-[#7A7569] leading-relaxed mb-4 flex-grow">
                      {guide.description}
                    </p>
                    
                    {guide.whatYouLearn && (
                      <div className="mb-4 space-y-1">
                        {guide.whatYouLearn.slice(0, 2).map((item, itemIdx) => (
                          <div key={itemIdx} className="flex items-start gap-2">
                            <span className="text-[#4B7A88] text-xs mt-0.5">✓</span>
                            <span className="text-xs text-[#5A5449]">{item}</span>
                          </div>
                        ))}
                      </div>
                    )}
                    
                    <div className="pt-4 border-t border-[#E8E6E1] flex items-center justify-between mt-auto">
                      <span className="text-xs text-[#7A7569]">{guide.readTime}</span>
                      <span className="text-sm font-bold text-[#4B7A88] group-hover:gap-2 flex items-center gap-1 transition-all">
                        Read
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                        </svg>
                      </span>
                    </div>
                  </article>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Upcoming Guides - Magazine Grid */}
      {upcomingGuides.length > 0 && (
        <section className="py-24 bg-white">
          <div className="container mx-auto px-6 md:px-12 max-w-7xl">
            <div className="flex items-center gap-4 mb-16">
              <div className="w-1 h-16 bg-[#4B7A88]" />
              <h2 className="text-5xl font-black text-[#2A2419]">
                Coming soon
              </h2>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {upcomingGuides.map((guide, idx) => (
                <article
                  key={guide.slug}
                  className="group bg-white border-2 border-[#E8E6E1] rounded-2xl p-8 hover:border-[#F0C65F] transition-all duration-300 hover:shadow-xl"
                  style={{ animationDelay: `${idx * 100}ms` }}
                >
                  <div className="flex items-center gap-3 mb-6">
                    <span className="text-xs uppercase tracking-[0.18em] font-bold text-[#4B7A88]">
                      {guide.category}
                    </span>
                    {guide.difficulty && (
                      <>
                        <span className="w-1 h-1 rounded-full bg-[#C4C1B8]" />
                        <span className="text-xs uppercase tracking-wide font-semibold text-[#7A7569]">
                          {guide.difficulty}
                        </span>
                      </>
                    )}
                  </div>
                  
                  <h3 className="text-2xl font-black text-[#2A2419] mb-3 leading-tight group-hover:text-[#4B7A88] transition-colors">
                    {guide.title}
                  </h3>
                  
                  <p className="text-sm text-[#5A5449] mb-3 leading-relaxed italic">
                    {guide.subtitle}
                  </p>
                  
                  <p className="text-xs text-[#7A7569] leading-relaxed mb-6">
                    {guide.description}
                  </p>
                  
                  <div className="pt-4 border-t border-[#E8E6E1] flex items-center justify-between">
                    <span className="text-xs uppercase tracking-[0.15em] font-bold text-[#F0C65F]">
                      {guide.published}
                    </span>
                    <span className="text-sm text-[#7A7569]">{guide.readTime}</span>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Why These Guides + App CTA - Split Editorial */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6 md:px-12 max-w-7xl">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Why Guides */}
            <div className="space-y-6">
              <div className="flex items-center gap-4 mb-8">
                <div className="w-1 h-12 bg-[#4B7A88]" />
                <h2 className="text-4xl font-black text-[#2A2419]">
                  Why these guides matter
                </h2>
              </div>
              
              <p className="text-lg text-[#5A5449] leading-relaxed">
                The internet is full of lists: <span className="italic">"Is Nutella halal? Is Red Bull halal?"</span> But these answers change by region, by recipe, by year.{" "}
                <span className="font-bold text-[#2A2419]">Principles don't.</span>
              </p>
              
              <p className="text-lg text-[#5A5449] leading-relaxed">
                Our guides teach you <span className="font-semibold">how to think</span> about halal food—not just what to think. Understand E-codes. Read certification logos. Trace ingredient sources.
              </p>
              
              <div className="bg-[#FAFAF8] border-l-4 border-[#F0C65F] p-6 rounded-r-xl">
                <p className="text-[#2A2419] font-semibold">
                  When you understand the fundamentals, you don't need to Google every snack brand. You can make confident decisions on your own.
                </p>
              </div>
            </div>
            
            {/* App CTA */}
            <div className="bg-gradient-to-br from-[#2A2419] to-[#3D352A] text-white rounded-3xl p-10 lg:p-12 shadow-2xl">
              <h2 className="text-3xl font-black mb-4">
                Need to check a specific product?
              </h2>
              <p className="text-white/80 leading-relaxed mb-8">
                These guides teach principles. For checking individual products, download our mobile app with:
              </p>
              <ul className="space-y-3 mb-10">
                {[
                  "Barcode scanner for instant halal status",
                  "Ingredient OCR (photo-based analysis)",
                  "Database of 2M+ products",
                  "Boycott checker (BDS alerts)",
                ].map((feature) => (
                  <li key={feature} className="flex items-start gap-3">
                    <span className="text-[#F0C65F] font-bold text-lg mt-0.5">✓</span>
                    <span className="text-white/90">{feature}</span>
                  </li>
                ))}
              </ul>
              <a
                href="https://apps.apple.com/us/app/allhalal-info-food-scanner/id6756242265"
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full px-8 py-4 rounded-2xl bg-gradient-to-r from-[#F0C65F] to-[#E5BA55] text-[#2A2419] font-black text-center hover:shadow-2xl transition-all duration-300 hover:scale-105"
              >
                Download AllHalal App
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ - Clean Editorial */}
      <section className="py-24 bg-[#FAFAF8]">
        <div className="container mx-auto px-6 md:px-12 max-w-4xl">
          <div className="flex items-center gap-4 mb-12">
            <div className="w-1 h-12 bg-[#4B7A88]" />
            <h2 className="text-4xl font-black text-[#2A2419]">
              Common questions
            </h2>
          </div>
          <div className="space-y-4">
            {[
              {
                q: "Why aren't there product lists on this page?",
                a: "Product recipes change, certification bodies differ by region, and companies reformulate ingredients constantly. Teaching you how to evaluate products is more valuable than maintaining an ever-outdated list. For live product checks, use our mobile app.",
              },
              {
                q: "How are these guides different from a simple Google search?",
                a: "Our guides are researched, structured, and written for long-term educational value—not SEO spam. We cite sources, explain scholarly differences, and give you the full context you need to make your own informed decisions.",
              },
              {
                q: "Do you follow a specific madhhab?",
                a: "We present mainstream scholarly positions across madhahib when relevant. Our guides are educational, not fatwa. For madhhab-specific prayer time calculations, our app supports Hanafi and Shafi'i Asr times.",
              },
              {
                q: "Can I request a guide topic?",
                a: "Yes! Email us at support@allhalal.info with your suggestion. We prioritize topics that have lasting educational value and aren't tied to specific products.",
              },
            ].map((item, idx) => (
              <details
                key={idx}
                className="group bg-white border-2 border-[#E8E6E1] rounded-2xl p-6 hover:border-[#4B7A88] transition-colors"
              >
                <summary className="list-none cursor-pointer flex items-center justify-between gap-4">
                  <span className="font-bold text-[#2A2419] text-lg">{item.q}</span>
                  <span className="text-[#4B7A88] text-2xl font-bold transition-transform group-open:rotate-45">
                    +
                  </span>
                </summary>
                <p className="mt-4 text-[#5A5449] leading-relaxed pl-2 border-l-2 border-[#F0C65F]">
                  {item.a}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
