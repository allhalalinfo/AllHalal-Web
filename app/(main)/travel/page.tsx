import type { Metadata } from "next";
import { SITE_URL } from "@/lib/seo/metadata";
import { fetchCustomArticlesList } from "@/lib/customArticles";
import CustomArticleGridCard from "@/components/articles/CustomArticleGridCard";

export const revalidate = 120;

export const metadata: Metadata = {
  alternates: { canonical: "/travel" },
  title: "Muslim Travel Guides | allhalal.info",
  description:
    "Travel guides for Muslims: halal food abroad, prayer facilities, modest travel tips, and destination insights.",
  keywords: [
    "muslim travel",
    "halal travel",
    "muslim friendly destinations",
    "travel guides",
    "halal food abroad",
    "prayer while traveling",
  ],
  openGraph: {
    title: "Muslim Travel Guides | allhalal.info",
    description:
      "Travel guides for Muslims with halal food tips, prayer facilities and destination insights.",
    type: "website",
  },
};

export default async function TravelPage(props: {
  params: Promise<{}>;
}) {
  const params = await props.params;
  
  // Fetch only articles with category "travel"
  const articlesList = await fetchCustomArticlesList({ page: 1, limit: 50 });
  const travelArticles = articlesList.articles.filter(
    (article) => article.category === "travel"
  );

  return (
    <main className="min-h-screen bg-[#FAFAF8]">
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
                Travel
              </span>
            </div>
            <h1 className="text-6xl md:text-7xl lg:text-8xl font-black text-[#2A2419] tracking-tight leading-[0.95]">
              Muslim travel<br />
              <span className="italic text-[#4B7A88]">guides</span>
            </h1>
            <p className="text-xl md:text-2xl text-[#5A5449] max-w-2xl leading-relaxed">
              Travel tips, halal food abroad, prayer facilities and destination insights for Muslim travelers.
            </p>
          </div>
        </div>
      </section>

      {/* Articles Grid */}
      {travelArticles.length > 0 ? (
        <section className="py-20 bg-white">
          <div className="container mx-auto px-6 md:px-12 max-w-7xl">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {travelArticles.map((article, index) => (
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
              No travel guides published yet. Check back soon!
            </p>
          </div>
        </section>
      )}

      {/* Why Travel Guides + App CTA */}
      <section className="py-24 bg-[#FAFAF8]">
        <div className="container mx-auto px-6 md:px-12 max-w-7xl">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Why Guides */}
            <div className="space-y-6">
              <div className="flex items-center gap-4 mb-8">
                <div className="w-1 h-12 bg-[#4B7A88]" />
                <h2 className="text-4xl font-black text-[#2A2419]">
                  Why these guides
                </h2>
              </div>
              
              <p className="text-lg text-[#5A5449] leading-relaxed">
                Traveling as a Muslim requires planning beyond standard tourist advice. Finding halal food, locating prayer spaces, understanding local customs, and maintaining religious practices while exploring new places all need practical guidance.
              </p>
              
              <p className="text-lg text-[#5A5449] leading-relaxed">
                These travel guides provide destination-specific insights, halal dining options, prayer facility locations, and practical tips to help Muslim travelers plan trips with confidence and ease.
              </p>
              
              <div className="bg-white border-l-4 border-[#F0C65F] p-6 rounded-r-xl">
                <p className="text-[#2A2419] font-semibold">
                  Better preparation means more meaningful travel experiences without compromising your values.
                </p>
              </div>
            </div>
            
            {/* App CTA */}
            <div className="bg-gradient-to-br from-[#2A2419] to-[#3D352A] text-white rounded-3xl p-10 lg:p-12 shadow-2xl">
              <h2 className="text-3xl font-black mb-4">
                Travel with allhalal.info app
              </h2>
              <p className="text-white/80 leading-relaxed mb-8">
                While traveling, use the app for instant verification:
              </p>
              <ul className="space-y-3 mb-10">
                {[
                  "Scan product barcodes in foreign supermarkets",
                  "Find halal restaurants near your location",
                  "Prayer times automatically adjust to your timezone",
                  "Offline access to saved products and lists",
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
