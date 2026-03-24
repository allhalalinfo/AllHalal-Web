import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Can You Trust Food Labels? Hidden Ingredients Guide for Muslims",
  description:
    "What food labels don't tell you: processing aids, 'natural flavors,' shared equipment. Learn how to read ingredient lists and when to contact manufacturers.",
  keywords: [
    "food labels halal",
    "natural flavors halal",
    "processing aids",
    "hidden ingredients",
    "shared equipment halal",
    "reading ingredient lists",
    "contact manufacturer halal",
  ],
  openGraph: {
    title: "Can You Trust the Ingredient List? - Halal Food Guide",
    description: "Labels don't list processing aids. 'Natural flavors' can mean anything. Here's what to watch for.",
    type: "article",
  },
};

export default async function ReadingLabelsGuide(props: {
  params: Promise<{ locale: string }>;
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
          <Link href={`/${params.locale}/is-it-halal`} className="inline-flex items-center gap-2 text-[#4B7A88] hover:gap-3 transition-all font-semibold mb-8">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Guides
          </Link>

          <div className="space-y-6">
            <div className="flex items-center gap-3 text-sm">
              <span className="uppercase tracking-[0.15em] font-bold text-[#4B7A88]">Practical</span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#C4C1B8]" />
              <span className="text-[#7A7569]">8 min</span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#C4C1B8]" />
              <span className="text-[#7A7569]">Beginner</span>
            </div>

            <h1 className="text-5xl md:text-6xl lg:text-7xl font-black text-[#2A2419] tracking-tight leading-[1]">
              Can You Trust the Ingredient List?
            </h1>

            <p className="text-2xl text-[#5A5449] leading-relaxed">
              Labels don't list processing aids. "Natural flavors" can mean anything. Here's what to watch for when reading food labels as a Muslim.
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
              The label says "vegetable oil." But which vegetables? And how was it processed? Spoiler: Labels don't tell you everything.
            </p>
          </div>

          <h2 className="text-3xl font-black text-[#2A2419] mt-16 mb-6">What labels don't tell you</h2>

          <p className="text-lg text-[#5A5449] leading-relaxed mb-8">
            Food labels are <strong>legally required</strong> to list ingredients. But there are loopholes. Here's what manufacturers don't have to disclose:
          </p>

          <div className="space-y-6 mb-12">
            <div className="bg-red-50 border-2 border-red-200 rounded-2xl p-6">
              <h4 className="text-xl font-bold text-red-900 mb-2">1. Processing Aids</h4>
              <p className="text-red-800 mb-3">
                Substances used during manufacturing but <strong>not present in the final product</strong> don't need to be listed.
              </p>
              <div className="bg-white rounded-xl p-4">
                <p className="font-bold text-red-900 mb-2">Example:</p>
                <p className="text-red-800 text-sm">
                  Gelatin is used to clarify apple juice (removes cloudiness). Then it's filtered out. Result: Juice label doesn't mention gelatin.
                </p>
                <p className="text-red-700 font-semibold mt-2 text-sm">⚠ You'd never know unless you asked.</p>
              </div>
            </div>

            <div className="bg-amber-50 border-2 border-amber-200 rounded-2xl p-6">
              <h4 className="text-xl font-bold text-amber-900 mb-2">2. "Natural Flavors"</h4>
              <p className="text-amber-800 mb-3">
                This vague term can include <strong>almost anything</strong>—plant extracts, animal derivatives, or synthetic compounds.
              </p>
              <div className="bg-white rounded-xl p-4">
                <p className="text-amber-800 text-sm mb-2">"Natural flavors" might contain:</p>
                <ul className="list-none space-y-1 text-sm ml-0">
                  <li className="flex items-start gap-2">
                    <span>•</span>
                    <span>Castoreum (from beaver glands) - used in "natural vanilla flavor"</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span>•</span>
                    <span>Animal-derived enzymes</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span>•</span>
                    <span>Alcohol as a carrier</span>
                  </li>
                </ul>
                <p className="text-amber-700 font-semibold mt-3 text-sm">⚠ Always verify with the manufacturer.</p>
              </div>
            </div>

            <div className="bg-blue-50 border-2 border-blue-200 rounded-2xl p-6">
              <h4 className="text-xl font-bold text-blue-900 mb-2">3. "And/Or" Ingredients</h4>
              <p className="text-blue-800 mb-3">
                "Contains palm oil and/or soybean oil" means the manufacturer <strong>switches suppliers</strong> based on cost.
              </p>
              <div className="bg-white rounded-xl p-4">
                <p className="text-blue-800 text-sm">
                  Problem: Today's batch might be halal (palm oil). Tomorrow's might not (if they switch to a source with animal derivatives).
                </p>
                <p className="text-blue-700 font-semibold mt-2 text-sm">⚠ Contact manufacturer for current sourcing.</p>
              </div>
            </div>

            <div className="bg-purple-50 border-2 border-purple-200 rounded-2xl p-6">
              <h4 className="text-xl font-bold text-purple-900 mb-2">4. Shared Equipment</h4>
              <p className="text-purple-800 mb-3">
                "May contain traces of..." warnings are <strong>voluntary</strong>. Some products are made on shared lines with non-halal items but don't disclose it.
              </p>
              <div className="bg-white rounded-xl p-4">
                <p className="text-purple-800 text-sm">
                  Your "vegetarian" snack might be made on the same equipment as pork sausages. Cross-contamination risk.
                </p>
                <p className="text-purple-700 font-semibold mt-2 text-sm">⚠ Look for "dedicated halal facility" on labels.</p>
              </div>
            </div>
          </div>

          <h2 className="text-3xl font-black text-[#2A2419] mt-16 mb-6">Red flag terms</h2>

          <p className="text-lg text-[#5A5449] leading-relaxed mb-6">
            When you see these terms on labels, <strong>verify the source</strong>:
          </p>

          <div className="grid md:grid-cols-2 gap-4 mb-12">
            <div className="bg-white border-2 border-[#E8E6E1] rounded-xl p-4">
              <p className="font-bold text-red-700 mb-1">"Natural flavors"</p>
              <p className="text-sm text-[#5A5449]">May contain animal derivatives or alcohol</p>
            </div>
            <div className="bg-white border-2 border-[#E8E6E1] rounded-xl p-4">
              <p className="font-bold text-red-700 mb-1">"Enzymes"</p>
              <p className="text-sm text-[#5A5449]">Source unclear (animal vs microbial)</p>
            </div>
            <div className="bg-white border-2 border-[#E8E6E1] rounded-xl p-4">
              <p className="font-bold text-red-700 mb-1">"Mono- and diglycerides" (E471)</p>
              <p className="text-sm text-[#5A5449]">Plant or animal? Must verify</p>
            </div>
            <div className="bg-white border-2 border-[#E8E6E1] rounded-xl p-4">
              <p className="font-bold text-red-700 mb-1">"Gelatin"</p>
              <p className="text-sm text-[#5A5449]">Pork/beef/fish? Check source</p>
            </div>
            <div className="bg-white border-2 border-[#E8E6E1] rounded-xl p-4">
              <p className="font-bold text-red-700 mb-1">"Glycerin/Glycerol"</p>
              <p className="text-sm text-[#5A5449]">Plant or animal fat?</p>
            </div>
            <div className="bg-white border-2 border-[#E8E6E1] rounded-xl p-4">
              <p className="font-bold text-red-700 mb-1">"Whey"</p>
              <p className="text-sm text-[#5A5449]">Depends on cheese rennet used</p>
            </div>
          </div>

          <h2 className="text-3xl font-black text-[#2A2419] mt-16 mb-6">Green flag terms</h2>

          <p className="text-lg text-[#5A5449] leading-relaxed mb-6">
            These terms usually indicate halal-friendly ingredients:
          </p>

          <div className="grid md:grid-cols-2 gap-4 mb-12">
            <div className="bg-green-50 border-2 border-green-200 rounded-xl p-4">
              <p className="font-bold text-green-700 mb-1">✓ "Plant-based"</p>
              <p className="text-sm text-green-800">No animal derivatives</p>
            </div>
            <div className="bg-green-50 border-2 border-green-200 rounded-xl p-4">
              <p className="font-bold text-green-700 mb-1">✓ "Fish gelatin"</p>
              <p className="text-sm text-green-800">Always halal</p>
            </div>
            <div className="bg-green-50 border-2 border-green-200 rounded-xl p-4">
              <p className="font-bold text-green-700 mb-1">✓ "Microbial rennet"</p>
              <p className="text-sm text-green-800">From bacteria/fungi, not animals</p>
            </div>
            <div className="bg-green-50 border-2 border-green-200 rounded-xl p-4">
              <p className="font-bold text-green-700 mb-1">✓ "Vegetable glycerin"</p>
              <p className="text-sm text-green-800">Plant-derived</p>
            </div>
          </div>

          <div className="bg-amber-50 border-2 border-amber-200 rounded-2xl p-6 mb-12">
            <h4 className="text-xl font-bold text-amber-900 mb-3">⚠ Note: "Vegan" ≠ Always Halal</h4>
            <p className="text-amber-800 text-sm">
              Vegan products contain no animal ingredients—but they might contain <strong>alcohol</strong> (e.g., in flavorings or extracts). Always check for halal certification or verify alcohol-free.
            </p>
          </div>

          <h2 className="text-3xl font-black text-[#2A2419] mt-16 mb-6">How to read labels like a pro</h2>

          <div className="space-y-6 mb-12">
            {[1, 2, 3, 4, 5].map((step) => {
              const content: Record<number, { title: string; desc: string }> = {
                1: { title: "Scan for known haram ingredients", desc: "Pork, lard, bacon, ham, gelatin (if source unknown), E120 (carmine)." },
                2: { title: "Check E-codes", desc: "Look for E441 (gelatin), E471 (mono/diglycerides), E120 (carmine). See our E-codes guide." },
                3: { title: "Spot ambiguous terms", desc: '"Natural flavors," "enzymes," "glycerin"—flag these for verification.' },
                4: { title: "Look for halal certification", desc: "JAKIM, IFANCA, HMC logos mean all ingredients are verified halal." },
                5: { title: "When in doubt, contact the manufacturer", desc: "Email or call customer service. Ask specific questions." },
              };
              return (
                <div key={step} className="flex items-start gap-4">
                  <span className="flex-shrink-0 w-10 h-10 rounded-full bg-[#4B7A88] text-white flex items-center justify-center font-black text-lg">
                    {step}
                  </span>
                  <div>
                    <h4 className="font-bold text-[#2A2419] mb-2">{content[step].title}</h4>
                    <p className="text-[#5A5449]">{content[step].desc}</p>
                  </div>
                </div>
              );
            })}
          </div>

          <h2 className="text-3xl font-black text-[#2A2419] mt-16 mb-6">When to contact the manufacturer</h2>

          <p className="text-lg text-[#5A5449] leading-relaxed mb-6">
            Sometimes the only way to know for sure is to <strong>ask directly</strong>. Here's how:
          </p>

          <div className="bg-white border-2 border-[#4B7A88] rounded-2xl p-8 mb-8">
            <h4 className="text-xl font-bold text-[#2A2419] mb-4">Email template:</h4>
            <div className="bg-[#FAFAF8] rounded-xl p-6 font-mono text-sm">
              <p className="mb-4">Subject: Ingredient Source Inquiry - [Product Name]</p>
              <p className="mb-2">Dear Customer Service,</p>
              <p className="mb-4">
                I am inquiring about the source of [specific ingredient, e.g., "mono- and diglycerides" or "natural flavors"] in your product [Product Name, with barcode if possible].
              </p>
              <p className="mb-4">
                Could you please confirm:<br />
                1. Is this ingredient derived from plant, animal, or synthetic sources?<br />
                2. If animal-derived, what type of animal (beef, pork, fish)?<br />
                3. Is this product manufactured on shared equipment with pork products?
              </p>
              <p className="mb-4">
                Thank you for your time.<br />
                Best regards,<br />
                [Your Name]
              </p>
            </div>
          </div>

          <div className="bg-blue-50 border-2 border-blue-200 rounded-2xl p-6 mb-12">
            <h4 className="text-xl font-bold text-blue-900 mb-3">Tips for contacting manufacturers:</h4>
            <ul className="space-y-2 text-sm text-blue-800">
              <li className="flex items-start gap-2">
                <span>✓</span>
                <span>Be specific. Ask about exact ingredients, not "is this halal?" (they may not know Islamic law).</span>
              </li>
              <li className="flex items-start gap-2">
                <span>✓</span>
                <span>Include the barcode number. Helps them identify the exact product.</span>
              </li>
              <li className="flex items-start gap-2">
                <span>✓</span>
                <span>Expect a reply in 1-3 business days. Most companies are responsive.</span>
              </li>
              <li className="flex items-start gap-2">
                <span>✓</span>
                <span>Save their reply. Formulations can change, so re-check every 6-12 months.</span>
              </li>
            </ul>
          </div>

          <h2 className="text-3xl font-black text-[#2A2419] mt-16 mb-6">Using technology</h2>

          <div className="bg-gradient-to-br from-[#4B7A88] to-[#3D6270] text-white rounded-2xl p-8 mb-12">
            <h3 className="text-2xl font-black mb-4">allhalal.info App: Your Halal Scanner</h3>
            <p className="text-white/90 mb-4">
              Tired of emailing manufacturers? Use our app to scan barcodes and get instant halal verification.
            </p>
            <ul className="space-y-2 text-white/90 mb-6">
              <li className="flex items-start gap-2">
                <span>✓</span>
                <span>Barcode scanner for 2M+ products</span>
              </li>
              <li className="flex items-start gap-2">
                <span>✓</span>
                <span>Ingredient OCR (photo analysis)</span>
              </li>
              <li className="flex items-start gap-2">
                <span>✓</span>
                <span>E-code verification</span>
              </li>
              <li className="flex items-start gap-2">
                <span>✓</span>
                <span>Community reports</span>
              </li>
            </ul>
            <a
              href="https://apps.apple.com/us/app/allhalal-info-food-scanner/id6756242265"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block px-8 py-3 bg-white text-[#4B7A88] font-black rounded-xl hover:bg-[#FAFAF8] transition-colors"
            >
              Download the allhalal.info app
            </a>
          </div>

          <div className="bg-gradient-to-br from-[#2A2419] to-[#3D352A] text-white rounded-3xl p-10 mt-16 mb-12">
            <h2 className="text-3xl font-black mb-6 text-white">Key Takeaways</h2>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <span className="text-[#F0C65F] font-bold text-xl mt-0.5 flex-shrink-0">1.</span>
                <span className="text-white leading-relaxed">
                  Food labels don't show everything. Processing aids, shared equipment, and vague terms like "natural flavors" hide details.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[#F0C65F] font-bold text-xl mt-0.5 flex-shrink-0">2.</span>
                <span className="text-white leading-relaxed">
                  Red flags: "natural flavors," "enzymes," E471, "glycerin." Verify the source.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[#F0C65F] font-bold text-xl mt-0.5 flex-shrink-0">3.</span>
                <span className="text-white leading-relaxed">
                  Green flags: "plant-based," "fish gelatin," "microbial rennet."
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[#F0C65F] font-bold text-xl mt-0.5 flex-shrink-0">4.</span>
                <span className="text-white leading-relaxed">
                  When in doubt, contact the manufacturer or use the allhalal.info app for instant verification.
                </span>
              </li>
            </ul>
          </div>

          <div className="border-t-2 border-[#E8E6E1] pt-12 mt-16">
            <h3 className="text-2xl font-black text-[#2A2419] mb-6">Related Guides</h3>
            <div className="grid md:grid-cols-2 gap-6">
              <Link href={`/${params.locale}/is-it-halal/e-numbers-complete-guide`} className="group bg-[#FAFAF8] border-2 border-[#E8E6E1] rounded-xl p-6 hover:border-[#4B7A88] transition-colors">
                <p className="text-xs uppercase tracking-[0.15em] font-bold text-[#4B7A88] mb-2">Published</p>
                <h4 className="text-xl font-bold text-[#2A2419] mb-2 group-hover:text-[#4B7A88]">
                  E-Codes Explained for Muslims
                </h4>
                <p className="text-sm text-[#5A5449]">Complete guide to food additives. Which E-numbers are halal?</p>
              </Link>
              <Link href={`/${params.locale}/is-it-halal/animal-derived-ingredients`} className="group bg-[#FAFAF8] border-2 border-[#E8E6E1] rounded-xl p-6 hover:border-[#4B7A88] transition-colors">
                <p className="text-xs uppercase tracking-[0.15em] font-bold text-[#4B7A88] mb-2">Published</p>
                <h4 className="text-xl font-bold text-[#2A2419] mb-2 group-hover:text-[#4B7A88]">
                  Gelatin, Rennet & Hidden Animal Sources
                </h4>
                <p className="text-sm text-[#5A5449]">Fish vs pork vs beef gelatin. When "vegetarian" doesn't mean halal.</p>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}
