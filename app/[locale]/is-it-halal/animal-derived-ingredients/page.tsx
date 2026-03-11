import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Gelatin, Rennet & Hidden Animal Sources in Food - Halal Guide",
  description:
    "Fish gelatin is halal. Pork gelatin isn't. Beef gelatin depends on slaughter. Learn about animal-derived ingredients: gelatin, rennet, enzymes, L-cysteine.",
  keywords: [
    "gelatin halal",
    "fish gelatin",
    "pork gelatin",
    "rennet halal",
    "animal rennet",
    "microbial rennet",
    "L-cysteine halal",
    "enzymes halal",
    "animal derivatives food",
  ],
  openGraph: {
    title: "Gelatin, Rennet & Hidden Animal Sources - Halal Guide",
    description:
      "When 'vegetarian-friendly' still isn't halal. Complete guide to animal derivatives in food.",
    type: "article",
  },
};

export default async function AnimalDerivedIngredientsGuide(props: {
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
                Ingredients
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#C4C1B8]" />
              <span className="text-[#7A7569]">11 min</span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#C4C1B8]" />
              <span className="text-[#7A7569]">Intermediate</span>
            </div>

            <h1 className="text-5xl md:text-6xl lg:text-7xl font-black text-[#2A2419] tracking-tight leading-[1]">
              Gelatin, Rennet & Hidden Animal Sources
            </h1>

            <p className="text-2xl text-[#5A5449] leading-relaxed">
              Fish gelatin is halal. Pork gelatin isn't. Beef gelatin? Depends on slaughter. Learn
              how to identify animal-derived ingredients hiding in processed food.
            </p>

            <div className="flex items-center gap-4 pt-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#4B7A88] flex items-center justify-center text-white font-bold">
                  A
                </div>
                <div>
                  <p className="text-sm font-bold text-[#2A2419]">AllHalal Editorial Team</p>
                  <p className="text-xs text-[#7A7569]">2026-03-12</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Article Content */}
      <div className="container mx-auto px-6 md:px-12 max-w-3xl py-12">
        <div className="prose prose-lg max-w-none">
          {/* Lede */}
          <div className="bg-[#FAFAF8] border-l-4 border-[#F0C65F] p-8 rounded-r-2xl mb-12">
            <p className="text-xl text-[#2A2419] leading-relaxed font-serif italic">
              "Suitable for vegetarians." Great. But are you <em>sure</em> it's halal? Animal
              derivatives hide in the strangest places—and "vegetarian-friendly" doesn't always
              mean zabiha-compliant.
            </p>
          </div>

          {/* Section 1: The Problem */}
          <h2 className="text-3xl font-black text-[#2A2419] mt-16 mb-6">
            When "vegetarian" doesn't mean halal
          </h2>

          <p className="text-lg text-[#5A5449] leading-relaxed mb-6">
            You'd think avoiding meat makes things simple. But animal-derived ingredients appear in{" "}
            <strong>unexpected places</strong>: gummy bears, bread, cheese, yogurt, even orange
            juice.
          </p>

          <p className="text-lg text-[#5A5449] leading-relaxed mb-8">
            This guide covers the <strong>big three</strong> animal derivatives Muslims need to
            watch for—and how to spot them.
          </p>

          {/* Section 2: Gelatin */}
          <h2 className="text-3xl font-black text-[#2A2419] mt-16 mb-6">
            Gelatin: The big three sources
          </h2>

          <p className="text-lg text-[#5A5449] leading-relaxed mb-6">
            <strong>Gelatin</strong> is a protein extracted from animal collagen (bones, skin,
            connective tissue). It's used as a gelling agent, thickener, and stabilizer.
          </p>

          <p className="text-lg text-[#5A5449] leading-relaxed mb-8">
            There are three sources—and they have <strong>very different</strong> halal status:
          </p>

          {/* Pork Gelatin */}
          <div className="bg-gradient-to-br from-red-50 to-red-100/50 border-2 border-red-200 rounded-2xl p-8 mb-6">
            <h3 className="text-2xl font-black text-red-900 mb-4 flex items-center gap-2">
              <span className="text-red-600">✗</span>
              1. Pork Gelatin (Haram)
            </h3>
            <p className="text-red-800 mb-4">
              <strong>The most common source worldwide.</strong> Extracted from pig skin and bones.
              Cheap and widely used in Western food manufacturing.
            </p>
            <div className="space-y-3 text-sm text-red-900">
              <div>
                <p className="font-bold mb-1">Where it's found:</p>
                <ul className="list-none space-y-1 ml-0">
                  <li className="flex items-start gap-2">
                    <span>•</span>
                    <span>Gummy bears, marshmallows, jelly candies</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span>•</span>
                    <span>Yogurt (as a thickener)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span>•</span>
                    <span>Capsules for vitamins/medications</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span>•</span>
                    <span>Cream cheese, some desserts</span>
                  </li>
                </ul>
              </div>
              <p className="font-semibold text-red-700 mt-4">
                ✗ Always haram. No exceptions.
              </p>
            </div>
          </div>

          {/* Beef Gelatin */}
          <div className="bg-gradient-to-br from-amber-50 to-amber-100/50 border-2 border-amber-200 rounded-2xl p-8 mb-6">
            <h3 className="text-2xl font-black text-amber-900 mb-4 flex items-center gap-2">
              <span className="text-amber-600">⚠</span>
              2. Beef Gelatin (Depends on Slaughter)
            </h3>
            <p className="text-amber-800 mb-4">
              Extracted from cattle bones and skin. Halal <strong>only if</strong> the animal was
              slaughtered according to zabiha (Islamic method).
            </p>
            <div className="space-y-3 text-sm text-amber-900">
              <div>
                <p className="font-bold mb-2">Two scenarios:</p>
                <div className="space-y-3">
                  <div className="bg-white/70 rounded-xl p-4">
                    <p className="font-semibold text-green-700 mb-1">
                      ✓ Halal-certified beef gelatin
                    </p>
                    <p className="text-amber-800">
                      If the product has a halal logo (JAKIM, IFANCA, HMC), the beef gelatin is
                      from zabiha cattle. Safe to consume.
                    </p>
                  </div>
                  <div className="bg-white/70 rounded-xl p-4">
                    <p className="font-semibold text-red-700 mb-1">
                      ✗ Unlabeled "beef gelatin"
                    </p>
                    <p className="text-amber-800">
                      If no halal certification, assume the cattle were <strong>not</strong>{" "}
                      slaughtered zabiha. Avoid.
                    </p>
                  </div>
                </div>
              </div>
              <p className="font-semibold text-amber-700 mt-4">
                ⚠ Only halal if certified. Otherwise, avoid.
              </p>
            </div>
          </div>

          {/* Fish Gelatin */}
          <div className="bg-gradient-to-br from-green-50 to-green-100/50 border-2 border-green-200 rounded-2xl p-8 mb-8">
            <h3 className="text-2xl font-black text-green-900 mb-4 flex items-center gap-2">
              <span className="text-green-600">✓</span>
              3. Fish Gelatin (Halal)
            </h3>
            <p className="text-green-800 mb-4">
              Extracted from fish skin and bones. <strong>Always halal</strong> (fish don't require
              zabiha slaughter).
            </p>
            <div className="space-y-3 text-sm text-green-900">
              <div>
                <p className="font-bold mb-1">Where it's used:</p>
                <ul className="list-none space-y-1 ml-0">
                  <li className="flex items-start gap-2">
                    <span>•</span>
                    <span>Halal gummy candies</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span>•</span>
                    <span>Halal marshmallows</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span>•</span>
                    <span>Some halal supplements</span>
                  </li>
                </ul>
              </div>
              <p className="font-semibold text-green-700 mt-4">
                ✓ Always halal. Look for "fish gelatin" on the label.
              </p>
            </div>
          </div>

          {/* How to Check */}
          <div className="bg-white border-2 border-[#4B7A88] rounded-2xl p-8 mb-12">
            <h4 className="text-xl font-bold text-[#2A2419] mb-4">
              How to check gelatin source:
            </h4>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <span className="flex-shrink-0 w-8 h-8 rounded-full bg-[#4B7A88] text-white flex items-center justify-center font-bold">
                  1
                </span>
                <p className="text-[#5A5449]">
                  <strong>Read the fine print.</strong> If it says "fish gelatin" or "bovine
                  gelatin," you know the source.
                </p>
              </div>
              <div className="flex items-start gap-3">
                <span className="flex-shrink-0 w-8 h-8 rounded-full bg-[#4B7A88] text-white flex items-center justify-center font-bold">
                  2
                </span>
                <p className="text-[#5A5449]">
                  <strong>Look for halal certification.</strong> If present, the gelatin is from
                  halal sources.
                </p>
              </div>
              <div className="flex items-start gap-3">
                <span className="flex-shrink-0 w-8 h-8 rounded-full bg-[#4B7A88] text-white flex items-center justify-center font-bold">
                  3
                </span>
                <p className="text-[#5A5449]">
                  <strong>When in doubt, contact the manufacturer.</strong> Ask: "What is the source
                  of the gelatin in [product]?"
                </p>
              </div>
            </div>
          </div>

          {/* Section 3: Rennet */}
          <h2 className="text-3xl font-black text-[#2A2419] mt-16 mb-6">
            Rennet in cheese: Animal or microbial?
          </h2>

          <p className="text-lg text-[#5A5449] leading-relaxed mb-6">
            <strong>Rennet</strong> is an enzyme used to coagulate milk in cheese-making. It causes
            milk to separate into curds (solid) and whey (liquid).
          </p>

          <p className="text-lg text-[#5A5449] leading-relaxed mb-8">
            The problem? Rennet can come from <strong>animals or microbes</strong>—and labels rarely
            specify.
          </p>

          {/* Animal Rennet */}
          <div className="bg-white border-2 border-[#E8E6E1] rounded-2xl p-8 mb-6">
            <h3 className="text-2xl font-black text-[#2A2419] mb-3">Animal Rennet</h3>
            <p className="text-[#5A5449] mb-4">
              Extracted from the stomach lining of calves (baby cows). This is the{" "}
              <strong>traditional</strong> method, used for centuries in European cheese-making.
            </p>
            <div className="bg-[#FAFAF8] rounded-xl p-4 mb-4">
              <p className="font-bold text-amber-800 mb-2">Halal status:</p>
              <p className="text-[#5A5449]">
                ⚠ <strong>Depends on slaughter.</strong> If the calf was slaughtered zabiha, the
                rennet is halal. If not, it's haram.
              </p>
            </div>
            <p className="text-sm text-[#7A7569] italic">
              In practice: Most animal rennet in Western cheese is <strong>not</strong> from zabiha
              cattle. Avoid unless halal-certified.
            </p>
          </div>

          {/* Microbial Rennet */}
          <div className="bg-green-50 border-2 border-green-200 rounded-2xl p-8 mb-8">
            <h3 className="text-2xl font-black text-green-900 mb-3">
              Microbial / Vegetable Rennet
            </h3>
            <p className="text-green-800 mb-4">
              Produced from bacteria, fungi, or plants. No animal involvement.{" "}
              <strong>Always halal.</strong>
            </p>
            <div className="bg-white/70 rounded-xl p-4 mb-4">
              <p className="font-bold text-green-700 mb-2">Look for these terms on labels:</p>
              <ul className="list-none space-y-1 ml-0 text-green-800">
                <li className="flex items-start gap-2">
                  <span>•</span>
                  <span>"Microbial rennet"</span>
                </li>
                <li className="flex items-start gap-2">
                  <span>•</span>
                  <span>"Vegetable rennet"</span>
                </li>
                <li className="flex items-start gap-2">
                  <span>•</span>
                  <span>"Non-animal rennet"</span>
                </li>
              </ul>
            </div>
            <p className="text-sm text-green-700 font-semibold">
              ✓ Safe to consume. Increasingly common in modern cheese production.
            </p>
          </div>

          {/* Popular cheeses with microbial rennet */}
          <div className="bg-white border-2 border-[#E8E6E1] rounded-2xl p-8 mb-12">
            <h4 className="text-xl font-bold text-[#2A2419] mb-4">
              Popular cheeses that often use microbial rennet:
            </h4>
            <div className="grid md:grid-cols-2 gap-4 text-sm">
              <div className="flex items-start gap-2">
                <span className="text-green-600">✓</span>
                <span>Many organic/artisan brands</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-green-600">✓</span>
                <span>Vegan cheeses (always plant-based)</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-green-600">✓</span>
                <span>Some supermarket brands (check label)</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-green-600">✓</span>
                <span>Halal-certified cheeses</span>
              </div>
            </div>
            <p className="text-[#7A7569] mt-4 italic text-sm">
              Tip: In Europe and North America, microbial rennet is now more common than animal
              rennet (cheaper to produce). But always check the label.
            </p>
          </div>

          {/* Section 4: Other Hidden Animal Derivatives */}
          <h2 className="text-3xl font-black text-[#2A2419] mt-16 mb-6">
            Other hidden animal derivatives
          </h2>

          <div className="space-y-6 mb-12">
            {/* L-Cysteine */}
            <div className="bg-white border-2 border-[#E8E6E1] rounded-2xl p-6">
              <h4 className="text-xl font-bold text-[#2A2419] mb-2">L-Cysteine (E920)</h4>
              <p className="text-[#5A5449] mb-3">
                An amino acid used to improve dough elasticity (makes bread softer).
              </p>
              <div className="bg-[#FAFAF8] rounded-xl p-4 mb-3">
                <p className="font-bold text-amber-800 mb-2">Sources:</p>
                <ul className="list-none space-y-1 text-[#5A5449] text-sm">
                  <li className="flex items-start gap-2">
                    <span className="text-red-600">✗</span>
                    <span>
                      <strong>Human hair</strong> (usually from China) → Controversial/makruh
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-amber-600">⚠</span>
                    <span>
                      <strong>Duck feathers</strong> → Questionable
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600">✓</span>
                    <span>
                      <strong>Synthetic</strong> (lab-produced) → Halal
                    </span>
                  </li>
                </ul>
              </div>
              <p className="text-sm text-[#7A7569]">
                Found in: Fast food bread, bagels, pizza dough. Check with manufacturer.
              </p>
            </div>

            {/* Enzymes */}
            <div className="bg-white border-2 border-[#E8E6E1] rounded-2xl p-6">
              <h4 className="text-xl font-bold text-[#2A2419] mb-2">Enzymes</h4>
              <p className="text-[#5A5449] mb-3">
                Proteins that speed up chemical reactions. Used in bread, cheese, beer.
              </p>
              <div className="bg-[#FAFAF8] rounded-xl p-4 mb-3">
                <p className="font-bold text-amber-800 mb-2">Sources:</p>
                <ul className="list-none space-y-1 text-[#5A5449] text-sm">
                  <li className="flex items-start gap-2">
                    <span className="text-red-600">⚠</span>
                    <span>
                      <strong>Animal pancreas</strong> (pork/beef) → Verify source
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600">✓</span>
                    <span>
                      <strong>Microbial</strong> (from bacteria/fungi) → Halal
                    </span>
                  </li>
                </ul>
              </div>
              <p className="text-sm text-[#7A7569]">
                Problem: Labels usually just say "enzymes" without specifying source. Contact
                manufacturer.
              </p>
            </div>

            {/* Whey */}
            <div className="bg-white border-2 border-[#E8E6E1] rounded-2xl p-6">
              <h4 className="text-xl font-bold text-[#2A2419] mb-2">Whey</h4>
              <p className="text-[#5A5449] mb-3">
                Liquid byproduct of cheese-making. Used in protein powders, snacks, baked goods.
              </p>
              <div className="bg-[#FAFAF8] rounded-xl p-4">
                <p className="text-[#5A5449] text-sm">
                  ⚠ <strong>Halal status depends on the rennet used in cheese production.</strong>{" "}
                  If the cheese used animal rennet (non-zabiha), the whey is questionable. Look for
                  halal-certified whey products.
                </p>
              </div>
            </div>

            {/* Albumin */}
            <div className="bg-white border-2 border-[#E8E6E1] rounded-2xl p-6">
              <h4 className="text-xl font-bold text-[#2A2419] mb-2">Albumin</h4>
              <p className="text-[#5A5449] mb-3">
                Protein used as a binding agent in processed foods.
              </p>
              <div className="bg-[#FAFAF8] rounded-xl p-4">
                <ul className="list-none space-y-1 text-[#5A5449] text-sm">
                  <li className="flex items-start gap-2">
                    <span className="text-green-600">✓</span>
                    <span>
                      <strong>Egg albumin</strong> (from egg whites) → Halal
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-600">✗</span>
                    <span>
                      <strong>Blood albumin</strong> (from animal blood) → Haram
                    </span>
                  </li>
                </ul>
              </div>
              <p className="text-sm text-[#7A7569] mt-3">
                Check the source if "albumin" appears on the label.
              </p>
            </div>
          </div>

          {/* Pull Quote */}
          <div className="my-16 py-8 border-y-2 border-[#E8E6E1]">
            <blockquote className="text-2xl md:text-3xl font-black text-[#2A2419] leading-tight text-center">
              "Just because it says <em>'suitable for vegetarians'</em> doesn't mean it's zabiha.
              Always verify animal derivative sources."
            </blockquote>
          </div>

          {/* Section 5: How to Spot Them */}
          <h2 className="text-3xl font-black text-[#2A2419] mt-16 mb-6">
            How to spot animal derivatives
          </h2>

          <div className="space-y-6 mb-12">
            <div className="flex items-start gap-4">
              <span className="flex-shrink-0 w-10 h-10 rounded-full bg-[#4B7A88] text-white flex items-center justify-center font-black text-lg">
                1
              </span>
              <div>
                <h4 className="font-bold text-[#2A2419] mb-2">Read ingredients carefully</h4>
                <p className="text-[#5A5449]">
                  Look for: "gelatin," "rennet," "enzymes," "L-cysteine," "albumin," "whey."
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <span className="flex-shrink-0 w-10 h-10 rounded-full bg-[#4B7A88] text-white flex items-center justify-center font-black text-lg">
                2
              </span>
              <div>
                <h4 className="font-bold text-[#2A2419] mb-2">Check for source clarification</h4>
                <p className="text-[#5A5449]">
                  If it says "fish gelatin," "microbial rennet," or "egg albumin," you're good.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <span className="flex-shrink-0 w-10 h-10 rounded-full bg-[#4B7A88] text-white flex items-center justify-center font-black text-lg">
                3
              </span>
              <div>
                <h4 className="font-bold text-[#2A2419] mb-2">Look for halal certification</h4>
                <p className="text-[#5A5449]">
                  If the product is halal-certified, all animal derivatives are from zabiha sources.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <span className="flex-shrink-0 w-10 h-10 rounded-full bg-[#4B7A88] text-white flex items-center justify-center font-black text-lg">
                4
              </span>
              <div>
                <h4 className="font-bold text-[#2A2419] mb-2">Don't assume "vegetarian" = halal</h4>
                <p className="text-[#5A5449]">
                  Cheese with animal rennet can be labeled "vegetarian" (no meat), but it's not
                  halal if the rennet isn't from zabiha cattle.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <span className="flex-shrink-0 w-10 h-10 rounded-full bg-[#4B7A88] text-white flex items-center justify-center font-black text-lg">
                5
              </span>
              <div>
                <h4 className="font-bold text-[#2A2419] mb-2">Contact the manufacturer</h4>
                <p className="text-[#5A5449] mb-3">
                  When in doubt, email or call. Ask: "What is the source of the [gelatin/rennet/enzymes] in your product?"
                </p>
                <a
                  href="https://apps.apple.com/us/app/allhalal-info-food-scanner/id6756242265"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block px-6 py-2 bg-[#4B7A88] text-white font-bold rounded-xl hover:bg-[#3D6270] transition-colors text-sm"
                >
                  Or Use AllHalal App
                </a>
              </div>
            </div>
          </div>

          {/* Conclusion */}
          <div className="bg-gradient-to-br from-[#2A2419] to-[#3D352A] text-white rounded-3xl p-10 mt-16 mb-12">
            <h2 className="text-3xl font-black mb-6 text-white">Key Takeaways</h2>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <span className="text-[#F0C65F] font-bold text-xl mt-0.5 flex-shrink-0">1.</span>
                <span className="text-white leading-relaxed">
                  <strong>Gelatin:</strong> Fish = always halal. Pork = always haram. Beef = depends
                  on zabiha.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[#F0C65F] font-bold text-xl mt-0.5 flex-shrink-0">2.</span>
                <span className="text-white leading-relaxed">
                  <strong>Rennet:</strong> Microbial/vegetable = halal. Animal = depends on zabiha.
                  Check labels.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[#F0C65F] font-bold text-xl mt-0.5 flex-shrink-0">3.</span>
                <span className="text-white leading-relaxed">
                  L-cysteine, enzymes, whey, and albumin can all be animal-derived. Verify the
                  source.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[#F0C65F] font-bold text-xl mt-0.5 flex-shrink-0">4.</span>
                <span className="text-white leading-relaxed">
                  "Vegetarian-friendly" ≠ halal. Always check for halal certification or contact the
                  manufacturer.
                </span>
              </li>
            </ul>
          </div>

          {/* Related Articles */}
          <div className="border-t-2 border-[#E8E6E1] pt-12 mt-16">
            <h3 className="text-2xl font-black text-[#2A2419] mb-6">Related Guides</h3>
            <div className="grid md:grid-cols-2 gap-6">
              <Link
                href={`/${params.locale}/is-it-halal/e-numbers-complete-guide`}
                className="group bg-[#FAFAF8] border-2 border-[#E8E6E1] rounded-xl p-6 hover:border-[#4B7A88] transition-colors"
              >
                <p className="text-xs uppercase tracking-[0.15em] font-bold text-[#4B7A88] mb-2">
                  Published
                </p>
                <h4 className="text-xl font-bold text-[#2A2419] mb-2 group-hover:text-[#4B7A88]">
                  E-Codes Explained for Muslims
                </h4>
                <p className="text-sm text-[#5A5449]">
                  E441 is gelatin. E471 can be plant or animal. Learn all the E-codes.
                </p>
              </Link>

              <Link
                href={`/${params.locale}/is-it-halal/reading-ingredient-labels`}
                className="group bg-[#FAFAF8] border-2 border-[#E8E6E1] rounded-xl p-6 hover:border-[#4B7A88] transition-colors"
              >
                <p className="text-xs uppercase tracking-[0.15em] font-bold text-[#4B7A88] mb-2">
                  Coming Soon
                </p>
                <h4 className="text-xl font-bold text-[#2A2419] mb-2 group-hover:text-[#4B7A88]">
                  Can You Trust the Ingredient List?
                </h4>
                <p className="text-sm text-[#5A5449]">
                  Processing aids, "natural flavors," and what labels don't tell you.
                </p>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}
