import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Why McDonald's Is Halal in Malaysia But Not in the US - Regional Guide",
  description:
    "Same brand, different recipes, different suppliers. Learn why global brands have different halal status by region and what this means for Muslim consumers.",
  keywords: [
    "mcdonalds halal",
    "kfc halal",
    "halal by country",
    "regional halal differences",
    "halal certification regional",
    "global brands halal",
  ],
  openGraph: {
    title: "Why McDonald's Is Halal in Malaysia But Not in the US",
    description: "Same golden arches. Different ingredients. Different suppliers. Different standards.",
    type: "article",
  },
};

export default async function RegionalDifferencesGuide(props: {
  params: Promise<{}>;
}) {
  const params = await props.params;

  return (
    <article className="min-h-screen bg-white">
      <header className="relative pt-40 pb-20 overflow-hidden bg-gradient-to-b from-[#FAFAF8] to-white">
        <div className="absolute inset-0 opacity-[0.02]">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%234B7A88' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }} />
        </div>

        <div className="container mx-auto px-6 md:px-12 max-w-4xl relative">
          <Link href={`/is-it-halal`} className="inline-flex items-center gap-2 text-[#4B7A88] hover:gap-3 transition-all font-semibold mb-8">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Guides
          </Link>

          <div className="space-y-6">
            <div className="flex items-center gap-3 text-sm">
              <span className="uppercase tracking-[0.15em] font-bold text-[#4B7A88]">Context</span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#C4C1B8]" />
              <span className="text-[#7A7569]">10 min</span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#C4C1B8]" />
              <span className="text-[#7A7569]">Beginner</span>
            </div>

            <h1 className="text-5xl md:text-6xl lg:text-7xl font-black text-[#2A2419] tracking-tight leading-[1]">
              Why McDonald's Is Halal in Malaysia But Not in the US
            </h1>

            <p className="text-2xl text-[#5A5449] leading-relaxed">
              Same brand. Different recipes. Different suppliers. Different certification requirements. Learn why global brands adapt by region.
            </p>

            <div className="flex items-center gap-4 pt-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#4B7A88] flex items-center justify-center text-white font-bold">A</div>
                <div>
                  <p className="text-sm font-bold text-[#2A2419]">allhalal.info Editorial Team</p>
                  <p className="text-xs text-[#7A7569]">2026-03-12</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-6 md:px-12 max-w-3xl py-12">
        <div className="prose prose-lg max-w-none">
          <div className="bg-[#FAFAF8] border-l-4 border-[#F0C65F] p-8 rounded-r-2xl mb-12">
            <p className="text-xl text-[#2A2419] leading-relaxed font-serif italic">
              You ate McDonald's in Kuala Lumpur. It was halal-certified. You land in New York. Same golden arches. Completely different story.
            </p>
          </div>

          <h2 className="text-3xl font-black text-[#2A2419] mt-16 mb-6">The regional reality</h2>

          <p className="text-lg text-[#5A5449] leading-relaxed mb-6">
            Global brands <strong>do not</strong> use the same recipes, ingredients, or suppliers worldwide. What's halal in one country can be haram in another—even if the brand name is identical.
          </p>

          <p className="text-lg text-[#5A5449] leading-relaxed mb-12">
            Here's why:
          </p>

          <div className="grid md:grid-cols-2 gap-6 mb-12">
            <div className="bg-white border-2 border-[#E8E6E1] rounded-2xl p-6">
              <h4 className="font-bold text-[#2A2419] mb-2">1. Local Suppliers</h4>
              <p className="text-[#5A5449] text-sm">
                McDonald's Malaysia sources chicken from halal-certified Malaysian farms. McDonald's US sources from US suppliers (non-zabiha).
              </p>
            </div>
            <div className="bg-white border-2 border-[#E8E6E1] rounded-2xl p-6">
              <h4 className="font-bold text-[#2A2419] mb-2">2. Different Regulations</h4>
              <p className="text-[#5A5449] text-sm">
                Malaysia <strong>requires</strong> halal certification for food businesses. The US doesn't. Different legal frameworks = different practices.
              </p>
            </div>
            <div className="bg-white border-2 border-[#E8E6E1] rounded-2xl p-6">
              <h4 className="font-bold text-[#2A2419] mb-2">3. Consumer Demographics</h4>
              <p className="text-[#5A5449] text-sm">
                In Muslim-majority countries, brands <strong>must</strong> be halal to survive. In the US, halal is a niche market.
              </p>
            </div>
            <div className="bg-white border-2 border-[#E8E6E1] rounded-2xl p-6">
              <h4 className="font-bold text-[#2A2419] mb-2">4. Cost Considerations</h4>
              <p className="text-[#5A5449] text-sm">
                Halal certification and dedicated supply chains cost money. Brands invest where the Muslim market justifies it.
              </p>
            </div>
          </div>

          <h2 className="text-3xl font-black text-[#2A2419] mt-16 mb-6">Case study: McDonald's</h2>

          <div className="space-y-6 mb-12">
            <div className="bg-green-50 border-2 border-green-200 rounded-2xl p-8">
              <h3 className="text-2xl font-black text-green-900 mb-4">🇲🇾 Malaysia</h3>
              <div className="space-y-3">
                <div className="flex items-start gap-2">
                  <span className="text-green-600 mt-1">✓</span>
                  <p className="text-green-800">
                    <strong>100% JAKIM certified.</strong> All meat is from zabiha slaughter.
                  </p>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-green-600 mt-1">✓</span>
                  <p className="text-green-800">
                    <strong>Dedicated halal supply chain.</strong> Separate slaughterhouses, processing facilities, delivery trucks.
                  </p>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-green-600 mt-1">✓</span>
                  <p className="text-green-800">
                    <strong>No pork products.</strong> Menu is entirely halal-compliant.
                  </p>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-green-600 mt-1">✓</span>
                  <p className="text-green-800">
                    <strong>Regular audits by JAKIM.</strong> Surprise inspections ensure compliance.
                  </p>
                </div>
              </div>
              <div className="mt-4 p-4 bg-white rounded-xl">
                <p className="text-sm text-green-800">
                  <strong>Result:</strong> Muslims trust McDonald's Malaysia. It's a safe choice.
                </p>
              </div>
            </div>

            <div className="bg-red-50 border-2 border-red-200 rounded-2xl p-8">
              <h3 className="text-2xl font-black text-red-900 mb-4">🇺🇸 United States</h3>
              <div className="space-y-3">
                <div className="flex items-start gap-2">
                  <span className="text-red-600 mt-1">✗</span>
                  <p className="text-red-800">
                    <strong>No halal certification.</strong> Meat is not from zabiha slaughter.
                  </p>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-red-600 mt-1">✗</span>
                  <p className="text-red-800">
                    <strong>Stunning used in slaughter.</strong> Doesn't meet strict halal standards.
                  </p>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-red-600 mt-1">✗</span>
                  <p className="text-red-800">
                    <strong>Shared equipment.</strong> Burgers cooked on same grill as bacon.
                  </p>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-red-600 mt-1">✗</span>
                  <p className="text-red-800">
                    <strong>Pork products on menu.</strong> Cross-contamination risk.
                  </p>
                </div>
              </div>
              <div className="mt-4 p-4 bg-white rounded-xl">
                <p className="text-sm text-red-800">
                  <strong>Result:</strong> Muslims in the US avoid McDonald's or only eat fish/vegetarian options.
                </p>
              </div>
            </div>

            <div className="bg-blue-50 border-2 border-blue-200 rounded-2xl p-8">
              <h3 className="text-2xl font-black text-blue-900 mb-4">🇦🇪 UAE (Dubai)</h3>
              <div className="space-y-3">
                <div className="flex items-start gap-2">
                  <span className="text-blue-600 mt-1">✓</span>
                  <p className="text-blue-800">
                    <strong>Halal certified by local authorities.</strong> All meat is zabiha.
                  </p>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-blue-600 mt-1">✓</span>
                  <p className="text-blue-800">
                    <strong>No pork on menu.</strong> But alcohol served in some locations (separate section).
                  </p>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-blue-600 mt-1">✓</span>
                  <p className="text-blue-800">
                    <strong>Dedicated halal supply chain.</strong> Similar to Malaysia.
                  </p>
                </div>
              </div>
              <div className="mt-4 p-4 bg-white rounded-xl">
                <p className="text-sm text-blue-800">
                  <strong>Result:</strong> Halal meat, but some Muslims avoid due to alcohol served in certain outlets.
                </p>
              </div>
            </div>

            <div className="bg-amber-50 border-2 border-amber-200 rounded-2xl p-8">
              <h3 className="text-2xl font-black text-amber-900 mb-4">🇬🇧 United Kingdom</h3>
              <div className="space-y-3">
                <div className="flex items-start gap-2">
                  <span className="text-amber-600 mt-1">⚠</span>
                  <p className="text-amber-800">
                    <strong>Some locations are halal, some aren't.</strong> Check store-by-store.
                  </p>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-amber-600 mt-1">⚠</span>
                  <p className="text-amber-800">
                    <strong>Halal locations use HMC or HFA certification.</strong> But not all McDonald's UK are halal.
                  </p>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-amber-600 mt-1">⚠</span>
                  <p className="text-amber-800">
                    <strong>Confusing for consumers.</strong> Same brand, inconsistent halal status.
                  </p>
                </div>
              </div>
              <div className="mt-4 p-4 bg-white rounded-xl">
                <p className="text-sm text-amber-800">
                  <strong>Result:</strong> Muslims must check each location individually. Use store locator or app.
                </p>
              </div>
            </div>
          </div>

          <div className="my-16 py-8 border-y-2 border-[#E8E6E1]">
            <blockquote className="text-2xl md:text-3xl font-black text-[#2A2419] leading-tight text-center">
              "Same logo. Different suppliers. Different standards. <em className="text-[#4B7A88]">Never</em> assume halal status travels with the brand."
            </blockquote>
          </div>

          <h2 className="text-3xl font-black text-[#2A2419] mt-16 mb-6">Case study: Nestlé products</h2>

          <p className="text-lg text-[#5A5449] leading-relaxed mb-6">
            Even <strong>packaged goods</strong> vary by region. A KitKat in the UK is not the same as a KitKat in Malaysia.
          </p>

          <div className="grid md:grid-cols-2 gap-6 mb-12">
            <div className="bg-white border-2 border-[#E8E6E1] rounded-2xl p-6">
              <h4 className="font-bold text-[#2A2419] mb-3">KitKat (Malaysia)</h4>
              <ul className="space-y-2 text-sm text-[#5A5449]">
                <li className="flex items-start gap-2">
                  <span>✓</span>
                  <span>Made in Malaysia factory</span>
                </li>
                <li className="flex items-start gap-2">
                  <span>✓</span>
                  <span>JAKIM certified</span>
                </li>
                <li className="flex items-start gap-2">
                  <span>✓</span>
                  <span>E471 from plant sources</span>
                </li>
                <li className="flex items-start gap-2">
                  <span>✓</span>
                  <span>Halal logo on package</span>
                </li>
              </ul>
              <p className="mt-4 text-sm font-semibold text-green-700">✓ Halal</p>
            </div>

            <div className="bg-white border-2 border-[#E8E6E1] rounded-2xl p-6">
              <h4 className="font-bold text-[#2A2419] mb-3">KitKat (UK)</h4>
              <ul className="space-y-2 text-sm text-[#5A5449]">
                <li className="flex items-start gap-2">
                  <span>⚠</span>
                  <span>Made in UK factory</span>
                </li>
                <li className="flex items-start gap-2">
                  <span>⚠</span>
                  <span>No halal certification</span>
                </li>
                <li className="flex items-start gap-2">
                  <span>⚠</span>
                  <span>E471 source unverified</span>
                </li>
                <li className="flex items-start gap-2">
                  <span>⚠</span>
                  <span>Whey from cheese (rennet type unknown)</span>
                </li>
              </ul>
              <p className="mt-4 text-sm font-semibold text-amber-700">⚠ Questionable (verify with manufacturer)</p>
            </div>
          </div>

          <h2 className="text-3xl font-black text-[#2A2419] mt-16 mb-6">Why recipes differ</h2>

          <div className="space-y-6 mb-12">
            <div className="bg-white border-2 border-[#E8E6E1] rounded-2xl p-6">
              <h4 className="font-bold text-[#2A2419] mb-2">1. Local Suppliers</h4>
              <p className="text-[#5A5449] text-sm">
                Nestlé Malaysia sources palm oil from Malaysian suppliers. Nestlé UK might use sunflower oil from Europe. Same product name, different ingredients.
              </p>
            </div>

            <div className="bg-white border-2 border-[#E8E6E1] rounded-2xl p-6">
              <h4 className="font-bold text-[#2A2419] mb-2">2. Regulatory Requirements</h4>
              <p className="text-[#5A5449] text-sm">
                EU food laws differ from US food laws differ from Malaysian food laws. Brands must comply with local regulations, leading to formula changes.
              </p>
            </div>

            <div className="bg-white border-2 border-[#E8E6E1] rounded-2xl p-6">
              <h4 className="font-bold text-[#2A2419] mb-2">3. Consumer Preferences</h4>
              <p className="text-[#5A5449] text-sm">
                Maggi noodles in Malaysia are spicier (local taste). Maggi in India is different again. Brands adapt recipes to local palates.
              </p>
            </div>

            <div className="bg-white border-2 border-[#E8E6E1] rounded-2xl p-6">
              <h4 className="font-bold text-[#2A2419] mb-2">4. Cost Optimization</h4>
              <p className="text-[#5A5449] text-sm">
                Using local suppliers reduces shipping costs. Brands source ingredients locally whenever possible.
              </p>
            </div>
          </div>

          <h2 className="text-3xl font-black text-[#2A2419] mt-16 mb-6">Why certification doesn't travel</h2>

          <p className="text-lg text-[#5A5449] leading-relaxed mb-6">
            A <strong>halal certificate is specific to a factory</strong>—not a brand. If McDonald's Malaysia has JAKIM certification, that <strong>only</strong> covers the Malaysian locations.
          </p>

          <div className="bg-[#FAFAF8] border-2 border-[#E8E6E1] rounded-2xl p-8 mb-12">
            <h4 className="text-xl font-bold text-[#2A2419] mb-4">Example:</h4>
            <p className="text-[#5A5449] mb-4">
              Pringles made in <strong>Malaysia</strong> → JAKIM certified → Halal logo on can → Safe.
            </p>
            <p className="text-[#5A5449] mb-4">
              Pringles made in <strong>Belgium</strong> → No halal certification → Same brand, different factory → Verify ingredients.
            </p>
            <p className="text-sm text-[#7A7569] italic">
              Always check the "Made in [Country]" label. Different factories = different certification status.
            </p>
          </div>

          <h2 className="text-3xl font-black text-[#2A2419] mt-16 mb-6">How to navigate global brands</h2>

          <div className="space-y-6 mb-12">
            {[1, 2, 3, 4, 5].map((step) => {
              const content: Record<number, { title: string; desc: string }> = {
                1: { title: "Check the country of manufacture", desc: '"Made in Malaysia/Indonesia/UAE" is usually a good sign. "Made in US/Europe" requires verification.' },
                2: { title: "Look for halal logos specific to that region", desc: "JAKIM (Malaysia), MUI (Indonesia), HMC (UK), IFANCA (US). Regional logos = regional verification." },
                3: { title: "Never assume consistency", desc: "Even if a product was halal in one country, verify when you buy it elsewhere." },
                4: { title: "Use apps for verification", desc: "The allhalal.info app includes regional data. Scan the barcode to see certification status for that specific product." },
                5: { title: "When traveling, research in advance", desc: "Before your trip, check which global brands are halal in your destination country." },
              };
              return (
                <div key={step} className="flex items-start gap-4">
                  <span className="flex-shrink-0 w-10 h-10 rounded-full bg-[#4B7A88] text-white flex items-center justify-center font-black text-lg">{step}</span>
                  <div>
                    <h4 className="font-bold text-[#2A2419] mb-2">{content[step].title}</h4>
                    <p className="text-[#5A5449]">{content[step].desc}</p>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="bg-gradient-to-br from-[#2A2419] to-[#3D352A] text-white rounded-3xl p-10 mt-16 mb-12">
            <h2 className="text-3xl font-black mb-6 text-white">Key Takeaways</h2>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <span className="text-[#F0C65F] font-bold text-xl mt-0.5 flex-shrink-0">1.</span>
                <span className="text-white leading-relaxed">
                  Global brands use different suppliers, recipes, and standards by region. Never assume consistency.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[#F0C65F] font-bold text-xl mt-0.5 flex-shrink-0">2.</span>
                <span className="text-white leading-relaxed">
                  McDonald's Malaysia is 100% halal (JAKIM). McDonald's US is not halal (no certification, non-zabiha meat).
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[#F0C65F] font-bold text-xl mt-0.5 flex-shrink-0">3.</span>
                <span className="text-white leading-relaxed">
                  Halal certification is <strong>factory-specific</strong>, not brand-wide. Check the "Made in" label.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[#F0C65F] font-bold text-xl mt-0.5 flex-shrink-0">4.</span>
                <span className="text-white leading-relaxed">
                  When in doubt, look for regional halal logos or use the allhalal.info app for instant verification.
                </span>
              </li>
            </ul>
          </div>

          <div className="border-t-2 border-[#E8E6E1] pt-12 mt-16">
            <h3 className="text-2xl font-black text-[#2A2419] mb-6">Related Guides</h3>
            <div className="grid md:grid-cols-2 gap-6">
              <Link href={`/is-it-halal/halal-certification-standards`} className="group bg-[#FAFAF8] border-2 border-[#E8E6E1] rounded-xl p-6 hover:border-[#4B7A88] transition-colors">
                <p className="text-xs uppercase tracking-[0.15em] font-bold text-[#4B7A88] mb-2">Published</p>
                <h4 className="text-xl font-bold text-[#2A2419] mb-2 group-hover:text-[#4B7A88]">
                  What Your Halal Logo Actually Means
                </h4>
                <p className="text-sm text-[#5A5449]">JAKIM vs IFANCA vs HMC. Why certification bodies differ by country.</p>
              </Link>
              <Link href={`/is-it-halal/reading-ingredient-labels`} className="group bg-[#FAFAF8] border-2 border-[#E8E6E1] rounded-xl p-6 hover:border-[#4B7A88] transition-colors">
                <p className="text-xs uppercase tracking-[0.15em] font-bold text-[#4B7A88] mb-2">Published</p>
                <h4 className="text-xl font-bold text-[#2A2419] mb-2 group-hover:text-[#4B7A88]">
                  Can You Trust the Ingredient List?
                </h4>
                <p className="text-sm text-[#5A5449]">What labels don't tell you. Processing aids and hidden ingredients.</p>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}
