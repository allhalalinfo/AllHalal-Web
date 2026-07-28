import type { Metadata } from "next";
import { generateMetadata as genMeta, generateItemListJSONLD, SITE_URL } from "@/lib/seo/metadata";
import { fetchCustomArticlesList } from "@/lib/customArticles";
import CustomArticleGridCard from "@/components/articles/CustomArticleGridCard";
import BreadcrumbsSchema from "@/components/seo/BreadcrumbsSchema";
import HalalChecksDirectory from "@/components/halal/HalalChecksDirectory";
import { halalItems } from "@/data/halalItems";

export const revalidate = 120;

export const metadata: Metadata = genMeta({
  title: `Is It Halal? Check ${halalItems.length}+ Products & Ingredients`,
  description: `Check whether a product is halal in seconds. ${halalItems.length}+ verdicts on snacks, drinks, fast food, E numbers and cosmetics, with the reasoning behind each one.`,
  path: "/is-it-halal",
  keywords: [
    "is it halal",
    "halal checker",
    "halal food list",
    "halal certification",
    "halal ingredients",
    "e numbers halal",
    "halal living"
  ]
});

export default async function HalalLivingPage(props: {
  params: Promise<{}>;
}) {
  const params = await props.params;
  
  // Fetch only articles with category "halal-living"
  const articlesList = await fetchCustomArticlesList({ page: 1, limit: 50 });
  const halalLivingArticles = articlesList.articles.filter(
    (article) => article.category === "halal-living"
  );

  // Generate JSON-LD schema for the collection of halal verdicts
  const itemListSchema = generateItemListJSONLD({
    name: "Halal Checks",
    description: "Halal verdicts for products, ingredients, E numbers and fast food",
    url: `${SITE_URL}/is-it-halal`,
    items: halalItems.slice(0, 50).map(item => ({
      name: `Is ${item.name} halal?`,
      url: `${SITE_URL}/is-it-halal/${item.slug}`,
      description: item.shortReason
    }))
  });

  const breadcrumbs = [
    { name: "Home", url: "/" },
    { name: "Halal Living", url: "/is-it-halal" }
  ];

  return (
    <main className="min-h-screen bg-[#FAFAF8]">
      {/* JSON-LD Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: itemListSchema }}
      />
      <BreadcrumbsSchema items={breadcrumbs} />

      {/* Hero Section */}
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
                Halal Living
              </span>
            </div>
            <h1 className="text-6xl md:text-7xl lg:text-8xl font-black text-[#2A2419] tracking-tight leading-[0.95]">
              Is it <span className="italic text-[#4B7A88]">halal</span>?
            </h1>
            <p className="text-xl md:text-2xl text-[#5A5449] max-w-2xl leading-relaxed">
              Clear verdicts on {halalItems.length}+ products, ingredients and E numbers —
              plus the guides that explain how those verdicts are reached.
            </p>
            <a
              href="#all-checks"
              className="inline-flex items-center gap-2 rounded-2xl bg-[#2A2419] px-7 py-4 font-bold text-white transition-all hover:bg-[#4B7A88]"
            >
              Browse all checks
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </a>
          </div>
        </div>
      </section>

      {/* Full directory of halal checks — primary internal-link surface */}
      <HalalChecksDirectory />

      {/* Deep-dive guides */}
      <section className="py-20 bg-[#FAFAF8] border-t border-[#E8E6E1]">
        <div className="container mx-auto px-6 md:px-12 max-w-7xl">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-1 h-12 bg-[#4B7A88]" />
            <h2 className="text-4xl font-black text-[#2A2419]">Deep-dive guides</h2>
          </div>
          <p className="text-lg text-[#5A5449] max-w-3xl mb-10">
            The rules behind the verdicts: how certification works, how to read a label,
            and which ingredients need a second look.
          </p>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {[
              {
                href: "/is-it-halal/halal-certification-standards",
                title: "Halal certification standards",
                text: "What the major certifiers check and how their standards differ.",
              },
              {
                href: "/is-it-halal/reading-ingredient-labels",
                title: "Reading ingredient labels",
                text: "A practical method for scanning a label in under a minute.",
              },
              {
                href: "/is-it-halal/e-numbers-complete-guide",
                title: "E numbers: complete guide",
                text: "Which additives are plant-based, which are animal-derived.",
              },
              {
                href: "/is-it-halal/animal-derived-ingredients",
                title: "Animal-derived ingredients",
                text: "Gelatin, rennet, carmine, shellac and where they hide.",
              },
              {
                href: "/is-it-halal/alcohol-in-food",
                title: "Alcohol in food",
                text: "Flavourings, vinegar and residual alcohol explained.",
              },
              {
                href: "/is-it-halal/regional-halal-differences",
                title: "Regional halal differences",
                text: "Why the same brand can be halal in one country and not another.",
              },
            ].map((guide) => (
              <a
                key={guide.href}
                href={guide.href}
                className="group rounded-2xl border border-[#E8E6E1] bg-white p-6 transition-all hover:border-[#4B7A88] hover:shadow-md"
              >
                <h3 className="text-lg font-bold text-[#2A2419] group-hover:text-[#4B7A88]">
                  {guide.title}
                </h3>
                <p className="mt-2 text-[#5A5449] leading-relaxed">{guide.text}</p>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Articles Grid */}
      {halalLivingArticles.length > 0 ? (
        <section className="py-20 bg-white">
          <div className="container mx-auto px-6 md:px-12 max-w-7xl">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {halalLivingArticles.map((article, index) => (
                <CustomArticleGridCard
                  key={article.id}
                  article={article}
                  locale="en"
                  priority={index < 3}
                />
              ))}
            </div>
          </div>
        </section>
      ) : (
        <section className="py-20 bg-white">
          <div className="container mx-auto px-6 md:px-12 max-w-4xl text-center">
            <p className="text-xl text-[#7A7569]">
              No halal living guides published yet. Check back soon!
            </p>
          </div>
        </section>
      )}

      {/* Why These Guides + App CTA */}
      <section className="py-24 bg-[#FAFAF8]">
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
                There is a lot of halal information online, but it is not always clear, complete, or consistent. A product can vary by country, recipe, supplier, or certification standard, so quick answers are not always enough.
              </p>
              
              <p className="text-lg text-[#5A5449] leading-relaxed">
                These guides are designed to make halal choices easier to understand. They explain ingredients, E numbers, certification, and sourcing in a clearer way, so readers can assess products with more confidence.
              </p>
              
              <div className="bg-white border-l-4 border-[#F0C65F] p-6 rounded-r-xl">
                <p className="text-[#2A2419] font-semibold">
                  A better understanding of the basics makes everyday halal decisions simpler and more reliable.
                </p>
              </div>

              {/* Featured Articles - Internal Linking */}
              {halalLivingArticles.length > 0 && (
                <div className="mt-8">
                  <h3 className="text-xl font-bold text-[#2A2419] mb-4">
                    Latest Articles
                  </h3>
                  <div className="space-y-3">
                    {halalLivingArticles.slice(0, 3).map(article => (
                      <a
                        key={article.id}
                        href={`/read/${encodeURIComponent(article.id)}`}
                        className="block rounded-xl border border-[rgba(73,58,42,0.08)] bg-white p-4 transition-all hover:border-[#4B7A88] hover:shadow-md"
                      >
                        <div className="text-sm font-bold text-[#4B7A88] mb-1">
                          {article.category || "Halal Living"}
                        </div>
                        <div className="font-semibold text-[#2A2419] line-clamp-2">
                          {article.title}
                        </div>
                      </a>
                    ))}
                  </div>
                  <a
                    href="/news"
                    className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-[#4B7A88] hover:underline"
                  >
                    Read all articles
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </a>
                </div>
              )}
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
                Download the allhalal.info app
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
