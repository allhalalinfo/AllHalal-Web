import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";

export const metadata: Metadata = {
  title: "E-Codes Explained for Muslims: Which E-Numbers Are Halal?",
  description:
    "Complete guide to food additives (E-numbers) for Muslims. Learn which E-codes are always halal, always haram, or depend on source. E120, E471, E441, E904 explained.",
  keywords: [
    "e numbers halal",
    "e471 halal",
    "e120 halal",
    "e441 gelatin",
    "e904 shellac",
    "food additives halal",
    "halal e codes list",
    "mono and diglycerides halal",
  ],
  openGraph: {
    title: "E-Codes Explained for Muslims: The Complete Guide",
    description:
      "Not all E-numbers are suspicious. But some require context. Learn which food additives are halal.",
    type: "article",
  },
};

export default async function ECodesGuide(props: {
  params: Promise<{ locale: string }>;
}) {
  const params = await props.params;

  return (
    <article className="min-h-screen bg-white">
      {/* Hero Header */}
      <header className="relative pt-40 pb-20 overflow-hidden bg-gradient-to-b from-[#FAFAF8] to-white">
        <div className="absolute inset-0 opacity-[0.02]">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%234B7A88' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            }}
          />
        </div>

        <div className="container mx-auto px-6 md:px-12 max-w-4xl relative">
          <Link
            href={`/${params.locale}/is-it-halal`}
            className="inline-flex items-center gap-2 text-[#4B7A88] hover:gap-3 transition-all font-semibold mb-8"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Guides
          </Link>

          <div className="space-y-6">
            <div className="flex items-center gap-3 text-sm">
              <span className="uppercase tracking-[0.15em] font-bold text-[#4B7A88]">
                Additives
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#C4C1B8]" />
              <span className="text-[#7A7569]">15 min</span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#C4C1B8]" />
              <span className="text-[#7A7569]">Intermediate</span>
            </div>

            <h1 className="text-5xl md:text-6xl lg:text-7xl font-black text-[#2A2419] tracking-tight leading-[1]">
              E-Codes Explained for Muslims
            </h1>

            <p className="text-2xl text-[#5A5449] leading-relaxed">
              Not all E-numbers are suspicious. But some require context. E120 (insects), E471
              (plant or animal?), E904 (shellac)—which ones need verification and why.
            </p>

            <div className="flex items-center gap-4 pt-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#4B7A88] flex items-center justify-center text-white font-bold">
                  A
                </div>
                <div>
                  <p className="text-sm font-bold text-[#2A2419]">allhalal.info Editorial Team</p>
                  <p className="text-xs text-[#7A7569]">Coming March 2026</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Image Placeholder */}
      <div className="container mx-auto px-6 md:px-12 max-w-5xl py-12">
        <div className="relative aspect-[16/9] rounded-3xl overflow-hidden bg-gradient-to-br from-[#4B7A88]/20 via-[#F0C65F]/10 to-[#4B7A88]/5 shadow-2xl">
          <div className="absolute inset-0 flex flex-col items-center justify-center text-[#2A2419]/10">
            <svg className="w-32 h-32 mb-4" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z"
                clipRule="evenodd"
              />
            </svg>
            <span className="text-lg font-mono">Food label with E-numbers highlighted</span>
          </div>
        </div>
      </div>

      {/* Article Content */}
      <div className="container mx-auto px-6 md:px-12 max-w-3xl py-12">
        <div className="prose prose-lg max-w-none">
          {/* Lede / Hook */}
          <div className="bg-[#FAFAF8] border-l-4 border-[#F0C65F] p-8 rounded-r-2xl mb-12">
            <p className="text-xl text-[#2A2419] leading-relaxed font-serif italic">
              You flip over a chocolate bar. The ingredient list reads: E120, E471, E476, E904.
              Halal or haram? Most Muslims have no idea.
            </p>
          </div>

          {/* Section 1: Introduction */}
          <h2 className="text-3xl font-black text-[#2A2419] mt-16 mb-6">
            The E-number confusion
          </h2>

          <p className="text-lg text-[#5A5449] leading-relaxed mb-6">
            E-numbers—those mysterious codes on ingredient lists—are <strong>food additives</strong>{" "}
            approved by the European Union. They're everywhere: in bread, yogurt, candy, even
            "healthy" granola bars.
          </p>

          <p className="text-lg text-[#5A5449] leading-relaxed mb-6">
            The problem? <strong>E-numbers don't tell you the source</strong>. E471 could be from
            plants (halal) or from pork fat (haram). The label just says "E471."
          </p>

          <p className="text-lg text-[#5A5449] leading-relaxed mb-8">
            This guide explains which E-codes are safe, which are problematic, and which ones
            require investigation.
          </p>

          {/* Section 2: What Are E-Numbers? */}
          <h2 className="text-3xl font-black text-[#2A2419] mt-16 mb-6">
            What are E-numbers?
          </h2>

          <p className="text-lg text-[#5A5449] leading-relaxed mb-6">
            E-numbers are a <strong>European numbering system</strong> for food additives. Each code
            represents a specific chemical compound used to preserve, color, thicken, or enhance
            food.
          </p>

          <div className="bg-white border-2 border-[#E8E6E1] rounded-2xl p-8 mb-8">
            <h4 className="text-xl font-bold text-[#2A2419] mb-4">E-Number Categories:</h4>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <span className="font-mono font-bold text-[#4B7A88] mt-1">E100-199</span>
                <span className="text-[#5A5449]">Colors (e.g., E120 carmine, E160 carotene)</span>
              </div>
              <div className="flex items-start gap-3">
                <span className="font-mono font-bold text-[#4B7A88] mt-1">E200-299</span>
                <span className="text-[#5A5449]">Preservatives (e.g., E202 potassium sorbate)</span>
              </div>
              <div className="flex items-start gap-3">
                <span className="font-mono font-bold text-[#4B7A88] mt-1">E300-399</span>
                <span className="text-[#5A5449]">Antioxidants (e.g., E300 vitamin C)</span>
              </div>
              <div className="flex items-start gap-3">
                <span className="font-mono font-bold text-[#4B7A88] mt-1">E400-499</span>
                <span className="text-[#5A5449]">Thickeners & stabilizers (e.g., E471 emulsifiers)</span>
              </div>
              <div className="flex items-start gap-3">
                <span className="font-mono font-bold text-[#4B7A88] mt-1">E500-599</span>
                <span className="text-[#5A5449]">Acidity regulators (e.g., E500 sodium carbonate)</span>
              </div>
              <div className="flex items-start gap-3">
                <span className="font-mono font-bold text-[#4B7A88] mt-1">E600-699</span>
                <span className="text-[#5A5449]">Flavor enhancers (e.g., E621 MSG)</span>
              </div>
              <div className="flex items-start gap-3">
                <span className="font-mono font-bold text-[#4B7A88] mt-1">E900-999</span>
                <span className="text-[#5A5449]">Glazing agents & gases (e.g., E904 shellac)</span>
              </div>
            </div>
          </div>

          <p className="text-lg text-[#5A5449] leading-relaxed mb-6">
            <strong>Note:</strong> In the US and other countries, these same additives exist but
            often don't use E-numbers. For example, E300 (vitamin C) is just listed as "ascorbic
            acid." The chemical is the same—just different naming.
          </p>

          {/* Section 3: The Three Categories */}
          <h2 className="text-3xl font-black text-[#2A2419] mt-16 mb-6">
            The three categories: Always halal, always haram, depends
          </h2>

          <p className="text-lg text-[#5A5449] leading-relaxed mb-8">
            E-numbers fall into three groups based on their source and halal status:
          </p>

          {/* Always Halal */}
          <div className="bg-gradient-to-br from-green-50 to-green-100/50 border-2 border-green-200 rounded-2xl p-8 mb-6">
            <h3 className="text-2xl font-black text-green-900 mb-4 flex items-center gap-2">
              <span className="text-green-600">✓</span>
              Always Halal (Plant/Mineral Source)
            </h3>
            <p className="text-green-800 mb-4">
              These E-codes come from plants, minerals, or are synthetically produced. No animal
              derivatives involved.
            </p>
            <div className="grid md:grid-cols-2 gap-3 text-sm">
              <div className="flex items-start gap-2">
                <span className="font-mono font-bold text-green-700">E100</span>
                <span className="text-green-800">Curcumin (turmeric)</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="font-mono font-bold text-green-700">E101</span>
                <span className="text-green-800">Riboflavin (vitamin B2)</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="font-mono font-bold text-green-700">E160a</span>
                <span className="text-green-800">Carotene (carrots, plants)</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="font-mono font-bold text-green-700">E300</span>
                <span className="text-green-800">Ascorbic acid (vitamin C)</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="font-mono font-bold text-green-700">E330</span>
                <span className="text-green-800">Citric acid (citrus fruits)</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="font-mono font-bold text-green-700">E440</span>
                <span className="text-green-800">Pectin (fruit)</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="font-mono font-bold text-green-700">E500</span>
                <span className="text-green-800">Sodium carbonate (mineral)</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="font-mono font-bold text-green-700">E1400</span>
                <span className="text-green-800">Dextrin (starch)</span>
              </div>
            </div>
            <p className="text-xs text-green-700 mt-4 italic">
              ✓ Safe to consume. No verification needed.
            </p>
          </div>

          {/* Always Problematic */}
          <div className="bg-gradient-to-br from-red-50 to-red-100/50 border-2 border-red-200 rounded-2xl p-8 mb-6">
            <h3 className="text-2xl font-black text-red-900 mb-4 flex items-center gap-2">
              <span className="text-red-600">✗</span>
              Always Problematic (Animal/Insect Source)
            </h3>
            <p className="text-red-800 mb-4">
              These E-codes come from insects or animals (usually non-zabiha). Avoid unless
              certified halal with confirmed sources.
            </p>
            <div className="space-y-4">
              <div className="bg-white/70 rounded-xl p-4">
                <div className="flex items-start gap-2 mb-2">
                  <span className="font-mono font-bold text-red-700 text-lg">E120</span>
                  <div>
                    <span className="font-bold text-red-900">Carmine / Cochineal</span>
                    <p className="text-sm text-red-800 mt-1">
                      Red dye from crushed cochineal insects. Found in: yogurt, candy, beverages,
                      lipstick.
                    </p>
                    <p className="text-xs text-red-700 mt-1 font-semibold">
                      ✗ Haram - from insects
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white/70 rounded-xl p-4">
                <div className="flex items-start gap-2 mb-2">
                  <span className="font-mono font-bold text-red-700 text-lg">E441</span>
                  <div>
                    <span className="font-bold text-red-900">Gelatin</span>
                    <p className="text-sm text-red-800 mt-1">
                      From animal bones/skin (usually pork). Found in: gummy candy, marshmallows,
                      yogurt, capsules.
                    </p>
                    <p className="text-xs text-red-700 mt-1 font-semibold">
                      ✗ Haram (unless fish gelatin or halal-certified beef)
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white/70 rounded-xl p-4">
                <div className="flex items-start gap-2 mb-2">
                  <span className="font-mono font-bold text-red-700 text-lg">E542</span>
                  <div>
                    <span className="font-bold text-red-900">Bone Phosphate</span>
                    <p className="text-sm text-red-800 mt-1">
                      From animal bones. Found in: some baked goods (rare).
                    </p>
                    <p className="text-xs text-red-700 mt-1 font-semibold">
                      ✗ Haram - from non-zabiha animals
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white/70 rounded-xl p-4">
                <div className="flex items-start gap-2 mb-2">
                  <span className="font-mono font-bold text-red-700 text-lg">E904</span>
                  <div>
                    <span className="font-bold text-red-900">Shellac</span>
                    <p className="text-sm text-red-800 mt-1">
                      Resin from lac beetles (insects). Found in: candy coating, tablet coating,
                      fruit glaze.
                    </p>
                    <p className="text-xs text-red-700 mt-1 font-semibold">
                      ⚠ Controversial - some scholars allow, others forbid (insect derivative)
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Depends on Source */}
          <div className="bg-gradient-to-br from-amber-50 to-amber-100/50 border-2 border-amber-200 rounded-2xl p-8 mb-8">
            <h3 className="text-2xl font-black text-amber-900 mb-4 flex items-center gap-2">
              <span className="text-amber-600">⚠</span>
              Depends on Source (Plant OR Animal)
            </h3>
            <p className="text-amber-800 mb-4">
              These E-codes can be derived from <strong>either</strong> plants or animals. You{" "}
              <strong>must verify</strong> the source with the manufacturer or look for halal
              certification.
            </p>
            <div className="space-y-4">
              <div className="bg-white/70 rounded-xl p-4 border-2 border-amber-300">
                <div className="flex items-start gap-2 mb-2">
                  <span className="font-mono font-bold text-amber-700 text-lg">E471</span>
                  <div>
                    <span className="font-bold text-amber-900">
                      Mono- and Diglycerides of Fatty Acids
                    </span>
                    <p className="text-sm text-amber-800 mt-1 mb-2">
                      <strong>The most common "suspicious" E-code.</strong> Used as an emulsifier
                      (mixes fat and water).
                    </p>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-start gap-2">
                        <span className="text-green-600">✓</span>
                        <span className="text-green-800">
                          <strong>Plant source</strong> (soybean, palm, sunflower oil) → Halal
                        </span>
                      </div>
                      <div className="flex items-start gap-2">
                        <span className="text-red-600">✗</span>
                        <span className="text-red-800">
                          <strong>Animal source</strong> (pork fat, non-zabiha beef fat) → Haram
                        </span>
                      </div>
                    </div>
                    <p className="text-xs text-amber-700 mt-3 font-semibold">
                      ⚠ Always check: Look for halal logo or contact manufacturer
                    </p>
                    <p className="text-xs text-amber-600 mt-1">
                      Found in: bread, baked goods, ice cream, margarine, chocolate
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white/70 rounded-xl p-4">
                <div className="flex items-start gap-2">
                  <span className="font-mono font-bold text-amber-700">E472a-f</span>
                  <div>
                    <span className="font-bold text-amber-900">
                      Esters of Mono- and Diglycerides
                    </span>
                    <p className="text-sm text-amber-800 mt-1">
                      Similar to E471. Can be plant or animal-based. Verify source.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white/70 rounded-xl p-4">
                <div className="flex items-start gap-2">
                  <span className="font-mono font-bold text-amber-700">E481/482</span>
                  <div>
                    <span className="font-bold text-amber-900">Stearoyl Lactylates</span>
                    <p className="text-sm text-amber-800 mt-1">
                      Can be from plant oils or animal fats. Used in bread and baked goods. Verify.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white/70 rounded-xl p-4">
                <div className="flex items-start gap-2">
                  <span className="font-mono font-bold text-amber-700">E422</span>
                  <div>
                    <span className="font-bold text-amber-900">Glycerin / Glycerol</span>
                    <p className="text-sm text-amber-800 mt-1">
                      Can be from vegetable oils (halal) or animal fat (haram). Very common in
                      processed foods. Verify source.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white/70 rounded-xl p-4">
                <div className="flex items-start gap-2">
                  <span className="font-mono font-bold text-amber-700">E1518</span>
                  <div>
                    <span className="font-bold text-amber-900">Glyceryl Triacetate</span>
                    <p className="text-sm text-amber-800 mt-1">
                      Can be from plant glycerin or animal fat. Used in food coatings.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Pull Quote */}
          <div className="my-16 py-8 border-y-2 border-[#E8E6E1]">
            <blockquote className="text-2xl md:text-3xl font-black text-[#2A2419] leading-tight text-center">
              "E471 is in nearly <em>every</em> processed food. Learn to verify it, and you'll
              navigate 80% of halal food decisions with confidence."
            </blockquote>
          </div>

          {/* Section 4: Deep Dive on E471 */}
          <h2 className="text-3xl font-black text-[#2A2419] mt-16 mb-6">
            Deep dive: Why E471 matters so much
          </h2>

          <p className="text-lg text-[#5A5449] leading-relaxed mb-6">
            <strong>E471</strong> (mono- and diglycerides) is the <strong>most common</strong>{" "}
            ambiguous E-code. It's in bread, cookies, ice cream, margarine, chocolate—basically
            everything.
          </p>

          <p className="text-lg text-[#5A5449] leading-relaxed mb-6">
            Here's why it's complicated:
          </p>

          <div className="bg-[#FAFAF8] border-2 border-[#E8E6E1] rounded-2xl p-8 mb-8">
            <h4 className="text-xl font-bold text-[#2A2419] mb-4">E471 Can Come From:</h4>
            <div className="space-y-4">
              <div>
                <p className="font-bold text-green-700 mb-1">1. Plant oils (soybean, palm, sunflower)</p>
                <p className="text-[#5A5449] text-sm">
                  → <strong>Halal</strong>. This is the most common source in modern food
                  production, especially in Europe and Asia.
                </p>
              </div>
              <div>
                <p className="font-bold text-red-700 mb-1">2. Animal fats (pork lard, beef tallow)</p>
                <p className="text-[#5A5449] text-sm">
                  → <strong>Haram</strong> (if pork) or questionable (if non-zabiha beef). Less
                  common today but still used in some products.
                </p>
              </div>
            </div>
          </div>

          <p className="text-lg text-[#5A5449] leading-relaxed mb-6">
            <strong>The problem:</strong> Labels don't specify. They just say "E471" or "mono- and
            diglycerides."
          </p>

          <p className="text-lg text-[#5A5449] leading-relaxed mb-8">
            <strong>The solution:</strong>
          </p>

          <div className="space-y-4 mb-12">
            <div className="bg-white border-2 border-[#4B7A88] rounded-xl p-6">
              <h4 className="font-bold text-[#2A2419] mb-2">1. Look for a halal logo</h4>
              <p className="text-[#5A5449]">
                If the product is halal-certified (JAKIM, IFANCA, HMC, etc.), the E471 is from plant
                sources. Problem solved.
              </p>
            </div>

            <div className="bg-white border-2 border-[#E8E6E1] rounded-xl p-6 hover:border-[#4B7A88] transition-colors">
              <h4 className="font-bold text-[#2A2419] mb-2">2. Contact the manufacturer</h4>
              <p className="text-[#5A5449] mb-3">
                Email or call customer service. Ask: "Is the E471 in [product name] derived from
                plant or animal sources?"
              </p>
              <p className="text-sm text-[#7A7569] italic">
                Most companies will reply within 1-2 business days. They're used to this question.
              </p>
            </div>

            <div className="bg-white border-2 border-[#E8E6E1] rounded-xl p-6 hover:border-[#4B7A88] transition-colors">
              <h4 className="font-bold text-[#2A2419] mb-2">3. Use the allhalal.info app</h4>
              <p className="text-[#5A5449]">
                Scan the barcode. Our database includes E471 source verification for 100,000+ products.
              </p>
              <a
                href="https://apps.apple.com/us/app/allhalal-info-food-scanner/id6756242265"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block mt-3 px-6 py-2 bg-[#4B7A88] text-white font-bold rounded-xl hover:bg-[#3D6270] transition-colors"
              >
                Download App
              </a>
            </div>
          </div>

          {/* Section 5: How to Check in Real Life */}
          <h2 className="text-3xl font-black text-[#2A2419] mt-16 mb-6">
            How to check E-codes in real life
          </h2>

          <p className="text-lg text-[#5A5449] leading-relaxed mb-8">
            You're at the supermarket. Here's your step-by-step process:
          </p>

          <div className="space-y-6 mb-12">
            <div className="flex items-start gap-4">
              <span className="flex-shrink-0 w-10 h-10 rounded-full bg-[#4B7A88] text-white flex items-center justify-center font-black text-lg">
                1
              </span>
              <div>
                <h4 className="font-bold text-[#2A2419] mb-2">Flip to the ingredient list</h4>
                <p className="text-[#5A5449]">
                  Look at the back or side of the package. Find the ingredients section.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <span className="flex-shrink-0 w-10 h-10 rounded-full bg-[#4B7A88] text-white flex items-center justify-center font-black text-lg">
                2
              </span>
              <div>
                <h4 className="font-bold text-[#2A2419] mb-2">Scan for E-codes</h4>
                <p className="text-[#5A5449]">
                  Look for numbers starting with "E" followed by 3-4 digits. Example: E120, E471,
                  E904.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <span className="flex-shrink-0 w-10 h-10 rounded-full bg-[#4B7A88] text-white flex items-center justify-center font-black text-lg">
                3
              </span>
              <div>
                <h4 className="font-bold text-[#2A2419] mb-2">Check against the categories</h4>
                <div className="space-y-2 mt-3">
                  <p className="text-[#5A5449]">
                    <span className="font-semibold text-green-700">Always Halal?</span> (E100, E300,
                    E440...) → Safe. Buy it.
                  </p>
                  <p className="text-[#5A5449]">
                    <span className="font-semibold text-red-700">Always Haram?</span> (E120, E441,
                    E542...) → Avoid.
                  </p>
                  <p className="text-[#5A5449]">
                    <span className="font-semibold text-amber-700">Depends?</span> (E471, E481, E422...)
                    → Check halal logo or contact manufacturer.
                  </p>
                </div>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <span className="flex-shrink-0 w-10 h-10 rounded-full bg-[#4B7A88] text-white flex items-center justify-center font-black text-lg">
                4
              </span>
              <div>
                <h4 className="font-bold text-[#2A2419] mb-2">Look for halal certification</h4>
                <p className="text-[#5A5449]">
                  If the product has a JAKIM, IFANCA, HMC, or MUI logo, the "Depends" E-codes are
                  from halal sources. Trust the certification.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <span className="flex-shrink-0 w-10 h-10 rounded-full bg-[#4B7A88] text-white flex items-center justify-center font-black text-lg">
                5
              </span>
              <div>
                <h4 className="font-bold text-[#2A2419] mb-2">When in doubt, use tech</h4>
                <p className="text-[#5A5449]">
                  Scan the barcode with the allhalal.info app. We&apos;ve already verified the E-codes for you.
                </p>
              </div>
            </div>
          </div>

          {/* Section 6: Regional Differences */}
          <h2 className="text-3xl font-black text-[#2A2419] mt-16 mb-6">
            Regional differences
          </h2>

          <p className="text-lg text-[#5A5449] leading-relaxed mb-6">
            The source of E-codes can vary by region:
          </p>

          <div className="space-y-4 mb-8">
            <div className="bg-white border-2 border-[#E8E6E1] rounded-xl p-6">
              <h4 className="font-bold text-[#2A2419] mb-2">Europe & Middle East</h4>
              <p className="text-[#5A5449]">
                E471 is <strong>usually plant-based</strong> (palm oil, soy). Animal-derived E471 is
                rare in modern European food production.
              </p>
            </div>

            <div className="bg-white border-2 border-[#E8E6E1] rounded-xl p-6">
              <h4 className="font-bold text-[#2A2419] mb-2">Southeast Asia (Malaysia, Indonesia)</h4>
              <p className="text-[#5A5449]">
                Very strict. Most products with E471 are halal-certified, so the source is verified
                plant-based.
              </p>
            </div>

            <div className="bg-white border-2 border-[#E8E6E1] rounded-xl p-6">
              <h4 className="font-bold text-[#2A2419] mb-2">United States</h4>
              <p className="text-[#5A5449]">
                US labels don't use E-numbers. Instead, you'll see "mono- and diglycerides" or
                "glycerin." Same chemical, different name. Still need to verify source.
              </p>
            </div>
          </div>

          {/* Section 7: The Future */}
          <h2 className="text-3xl font-black text-[#2A2419] mt-16 mb-6">
            The future: Transparent labeling
          </h2>

          <p className="text-lg text-[#5A5449] leading-relaxed mb-6">
            Good news: Labeling is slowly getting better.
          </p>

          <div className="space-y-6 mb-12">
            <div>
              <h4 className="text-xl font-bold text-[#2A2419] mb-2">
                Some brands now specify source
              </h4>
              <p className="text-[#5A5449] leading-relaxed">
                Progressive companies are writing <strong>"plant-based E471"</strong> or{" "}
                <strong>"vegetable glycerin"</strong> on labels. This makes life much easier for
                Muslims (and vegans).
              </p>
            </div>

            <div>
              <h4 className="text-xl font-bold text-[#2A2419] mb-2">Blockchain for traceability</h4>
              <p className="text-[#5A5449] leading-relaxed">
                Some halal certification bodies are piloting blockchain technology to track
                ingredient sources from supplier to shelf. This will make verification instant and
                tamper-proof.
              </p>
            </div>

            <div>
              <h4 className="text-xl font-bold text-[#2A2419] mb-2">Consumer demand works</h4>
              <p className="text-[#5A5449] leading-relaxed">
                When Muslims (and vegans, vegetarians) consistently ask manufacturers about E471 and
                other ambiguous codes, companies respond. Keep asking. Change happens.
              </p>
            </div>
          </div>

          {/* Quick Reference Table */}
          <h2 className="text-3xl font-black text-[#2A2419] mt-16 mb-6">
            Quick reference table
          </h2>

          <div className="overflow-x-auto mb-12">
            <table className="w-full border-2 border-[#E8E6E1] rounded-xl overflow-hidden">
              <thead className="bg-[#4B7A88] text-white">
                <tr>
                  <th className="px-4 py-3 text-left font-bold">E-Code</th>
                  <th className="px-4 py-3 text-left font-bold">Name</th>
                  <th className="px-4 py-3 text-left font-bold">Source</th>
                  <th className="px-4 py-3 text-left font-bold">Status</th>
                </tr>
              </thead>
              <tbody className="bg-white">
                <tr className="border-b border-[#E8E6E1]">
                  <td className="px-4 py-3 font-mono font-bold">E100</td>
                  <td className="px-4 py-3">Curcumin</td>
                  <td className="px-4 py-3 text-sm">Turmeric (plant)</td>
                  <td className="px-4 py-3">
                    <span className="px-2 py-1 bg-green-100 text-green-800 text-xs font-bold rounded">
                      ✓ Halal
                    </span>
                  </td>
                </tr>
                <tr className="border-b border-[#E8E6E1] bg-[#FAFAF8]">
                  <td className="px-4 py-3 font-mono font-bold">E120</td>
                  <td className="px-4 py-3">Carmine</td>
                  <td className="px-4 py-3 text-sm">Cochineal insects</td>
                  <td className="px-4 py-3">
                    <span className="px-2 py-1 bg-red-100 text-red-800 text-xs font-bold rounded">
                      ✗ Haram
                    </span>
                  </td>
                </tr>
                <tr className="border-b border-[#E8E6E1]">
                  <td className="px-4 py-3 font-mono font-bold">E300</td>
                  <td className="px-4 py-3">Ascorbic acid</td>
                  <td className="px-4 py-3 text-sm">Vitamin C (synthetic)</td>
                  <td className="px-4 py-3">
                    <span className="px-2 py-1 bg-green-100 text-green-800 text-xs font-bold rounded">
                      ✓ Halal
                    </span>
                  </td>
                </tr>
                <tr className="border-b border-[#E8E6E1] bg-[#FAFAF8]">
                  <td className="px-4 py-3 font-mono font-bold">E441</td>
                  <td className="px-4 py-3">Gelatin</td>
                  <td className="px-4 py-3 text-sm">Animal (usually pork)</td>
                  <td className="px-4 py-3">
                    <span className="px-2 py-1 bg-red-100 text-red-800 text-xs font-bold rounded">
                      ✗ Haram
                    </span>
                  </td>
                </tr>
                <tr className="border-b border-[#E8E6E1]">
                  <td className="px-4 py-3 font-mono font-bold">E471</td>
                  <td className="px-4 py-3">Mono/diglycerides</td>
                  <td className="px-4 py-3 text-sm">Plant or animal</td>
                  <td className="px-4 py-3">
                    <span className="px-2 py-1 bg-amber-100 text-amber-800 text-xs font-bold rounded">
                      ⚠ Depends
                    </span>
                  </td>
                </tr>
                <tr className="border-b border-[#E8E6E1] bg-[#FAFAF8]">
                  <td className="px-4 py-3 font-mono font-bold">E904</td>
                  <td className="px-4 py-3">Shellac</td>
                  <td className="px-4 py-3 text-sm">Lac beetles (insects)</td>
                  <td className="px-4 py-3">
                    <span className="px-2 py-1 bg-amber-100 text-amber-800 text-xs font-bold rounded">
                      ⚠ Controversial
                    </span>
                  </td>
                </tr>
                <tr className="bg-[#FAFAF8]">
                  <td className="px-4 py-3 font-mono font-bold">E1400</td>
                  <td className="px-4 py-3">Dextrin</td>
                  <td className="px-4 py-3 text-sm">Starch (plant)</td>
                  <td className="px-4 py-3">
                    <span className="px-2 py-1 bg-green-100 text-green-800 text-xs font-bold rounded">
                      ✓ Halal
                    </span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Conclusion */}
          <div className="bg-gradient-to-br from-[#2A2419] to-[#3D352A] text-white rounded-3xl p-10 mt-16 mb-12">
            <h2 className="text-3xl font-black mb-6 text-white">Key Takeaways</h2>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <span className="text-[#F0C65F] font-bold text-xl mt-0.5 flex-shrink-0">1.</span>
                <span className="text-white leading-relaxed">
                  E-numbers are codes for food additives. Not all are problematic—many are from
                  plants or minerals.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[#F0C65F] font-bold text-xl mt-0.5 flex-shrink-0">2.</span>
                <span className="text-white leading-relaxed">
                  <strong>E120</strong> (carmine) and <strong>E441</strong> (gelatin) are almost
                  always haram. Avoid unless halal-certified.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[#F0C65F] font-bold text-xl mt-0.5 flex-shrink-0">3.</span>
                <span className="text-white leading-relaxed">
                  <strong>E471</strong> (mono/diglycerides) is the big one. It's in everything and
                  can be plant or animal. Always verify.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[#F0C65F] font-bold text-xl mt-0.5 flex-shrink-0">4.</span>
                <span className="text-white leading-relaxed">
                  Look for halal logos first. If none, contact the manufacturer or use our app to
                  check.
                </span>
              </li>
            </ul>
          </div>

          {/* Related Articles */}
          <div className="border-t-2 border-[#E8E6E1] pt-12 mt-16">
            <h3 className="text-2xl font-black text-[#2A2419] mb-6">Related Guides</h3>
            <div className="grid md:grid-cols-2 gap-6">
              <Link
                href={`/${params.locale}/is-it-halal/halal-certification-standards`}
                className="group bg-[#FAFAF8] border-2 border-[#E8E6E1] rounded-xl p-6 hover:border-[#4B7A88] transition-colors"
              >
                <p className="text-xs uppercase tracking-[0.15em] font-bold text-[#4B7A88] mb-2">
                  Published
                </p>
                <h4 className="text-xl font-bold text-[#2A2419] mb-2 group-hover:text-[#4B7A88]">
                  What Your Halal Logo Actually Means
                </h4>
                <p className="text-sm text-[#5A5449]">
                  Why JAKIM certificates are stricter than US bodies. When stunning matters.
                </p>
              </Link>

              <Link
                href={`/${params.locale}/is-it-halal`}
                className="group bg-[#FAFAF8] border-2 border-[#E8E6E1] rounded-xl p-6 hover:border-[#4B7A88] transition-colors"
              >
                <p className="text-xs uppercase tracking-[0.15em] font-bold text-[#4B7A88] mb-2">
                  Coming Soon
                </p>
                <h4 className="text-xl font-bold text-[#2A2419] mb-2 group-hover:text-[#4B7A88]">
                  Gelatin, Rennet & Hidden Animal Sources
                </h4>
                <p className="text-sm text-[#5A5449]">
                  Fish vs pork vs beef gelatin. When "vegetarian" doesn't mean halal.
                </p>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}
