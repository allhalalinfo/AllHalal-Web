import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Alcohol in Food: What Actually Matters - Islamic Ruling on Trace Alcohol",
  description:
    "Vanilla extract has alcohol. Soy sauce ferments. Vinegar was wine. Learn the difference between khamr and trace alcohol, and scholarly positions on alcohol in food.",
  keywords: [
    "alcohol in food halal",
    "vanilla extract halal",
    "soy sauce halal",
    "vinegar halal",
    "khamr definition",
    "trace alcohol halal",
    "fermentation alcohol",
    "cooking wine halal",
  ],
  openGraph: {
    title: "Alcohol in Food: What Actually Matters",
    description:
      "The difference between khamr and trace fermentation alcohol. Scholarly positions explained.",
    type: "article",
  },
};

export default async function AlcoholInFoodGuide(props: {
  params: Promise<{ locale: string }>;
}) {
  const params = await props.params;

  return (
    <article className="min-h-screen bg-white">
      {/* Hero */}
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
              <span className="uppercase tracking-[0.15em] font-bold text-[#4B7A88]">Fiqh</span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#C4C1B8]" />
              <span className="text-[#7A7569]">9 min</span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#C4C1B8]" />
              <span className="text-[#7A7569]">Advanced</span>
            </div>

            <h1 className="text-5xl md:text-6xl lg:text-7xl font-black text-[#2A2419] tracking-tight leading-[1]">
              Alcohol in Food: What Actually Matters
            </h1>

            <p className="text-2xl text-[#5A5449] leading-relaxed">
              Vanilla extract has alcohol. Soy sauce ferments. Vinegar was wine. So what's
              permissible? Learn the difference between khamr and trace fermentation alcohol.
            </p>

            <div className="flex items-center gap-4 pt-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#4B7A88] flex items-center justify-center text-white font-bold">
                  A
                </div>
                <div>
                  <p className="text-sm font-bold text-[#2A2419]">allhalal.info Editorial Team</p>
                  <p className="text-xs text-[#7A7569]">2026-03-12</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Content */}
      <div className="container mx-auto px-6 md:px-12 max-w-3xl py-12">
        <div className="prose prose-lg max-w-none">
          {/* Lede */}
          <div className="bg-[#FAFAF8] border-l-4 border-[#F0C65F] p-8 rounded-r-2xl mb-12">
            <p className="text-xl text-[#2A2419] leading-relaxed font-serif italic">
              Your cake recipe calls for vanilla extract. The ingredient list says "alcohol 35%."
              Haram? Or is there more to the story?
            </p>
          </div>

          <h2 className="text-3xl font-black text-[#2A2419] mt-16 mb-6">
            The vanilla extract dilemma
          </h2>

          <p className="text-lg text-[#5A5449] leading-relaxed mb-6">
            Vanilla extract is made by soaking vanilla beans in alcohol. The final product is{" "}
            <strong>35% alcohol by volume</strong>. Yet many Muslims use it in baking.
          </p>

          <p className="text-lg text-[#5A5449] leading-relaxed mb-8">
            Why? Because context matters. Understanding the difference between{" "}
            <strong>khamr</strong> (intoxicating wine) and <strong>trace alcohol</strong> from
            processing is key.
          </p>

          {/* Section: Khamr vs Ethanol */}
          <h2 className="text-3xl font-black text-[#2A2419] mt-16 mb-6">
            Understanding khamr vs ethanol
          </h2>

          <div className="grid md:grid-cols-2 gap-6 mb-12">
            <div className="bg-red-50 border-2 border-red-200 rounded-2xl p-6">
              <h3 className="text-xl font-black text-red-900 mb-3">Khamr (Intoxicating Wine)</h3>
              <p className="text-red-800 text-sm mb-4">
                Beverages made <strong>with the intent to intoxicate</strong>. Wine, beer, liquor.
              </p>
              <div className="space-y-2 text-sm">
                <div className="flex items-start gap-2">
                  <span className="text-red-600">✗</span>
                  <span className="text-red-800">Purpose: to get drunk</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-red-600">✗</span>
                  <span className="text-red-800">High alcohol concentration</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-red-600">✗</span>
                  <span className="text-red-800">Consumed as a beverage</span>
                </div>
              </div>
              <p className="font-bold text-red-700 mt-4 text-sm">
                ✗ Absolutely haram. No debate.
              </p>
            </div>

            <div className="bg-blue-50 border-2 border-blue-200 rounded-2xl p-6">
              <h3 className="text-xl font-black text-blue-900 mb-3">Ethanol in Food</h3>
              <p className="text-blue-800 text-sm mb-4">
                Trace alcohol from <strong>fermentation or processing</strong>. Not intended for
                intoxication.
              </p>
              <div className="space-y-2 text-sm">
                <div className="flex items-start gap-2">
                  <span className="text-blue-600">•</span>
                  <span className="text-blue-800">Byproduct of food production</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-blue-600">•</span>
                  <span className="text-blue-800">Very low final concentration</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-blue-600">•</span>
                  <span className="text-blue-800">Often evaporates during cooking</span>
                </div>
              </div>
              <p className="font-bold text-blue-700 mt-4 text-sm">
                ⚠ Scholarly debate. Depends on school of thought.
              </p>
            </div>
          </div>

          {/* Section: Scholarly Positions */}
          <h2 className="text-3xl font-black text-[#2A2419] mt-16 mb-6">
            The scholarly positions
          </h2>

          <p className="text-lg text-[#5A5449] leading-relaxed mb-8">
            Muslim scholars differ on trace alcohol in food. Here are the three main positions:
          </p>

          {/* Position 1: Strict */}
          <div className="bg-white border-2 border-[#E8E6E1] rounded-2xl p-8 mb-6">
            <h3 className="text-2xl font-black text-[#2A2419] mb-3">
              Position 1: Any alcohol is haram (Strict)
            </h3>
            <p className="text-[#5A5449] mb-4">
              Any amount of alcohol—even trace—is impermissible. If it intoxicates in large amounts,
              it's haram in small amounts.
            </p>
            <div className="bg-[#FAFAF8] rounded-xl p-4 mb-4">
              <p className="font-bold text-[#2A2419] mb-2">Argument:</p>
              <p className="text-[#5A5449] text-sm">
                The Prophet (ﷺ) said: <em>"What intoxicates in large amounts, a small amount of it is
                also haram."</em> (Abu Dawood, Tirmidhi)
              </p>
            </div>
            <p className="text-sm text-[#7A7569] italic">
              Followed by: Some Hanafi and Shafi'i scholars. Very cautious position.
            </p>
          </div>

          {/* Position 2: Moderate */}
          <div className="bg-green-50 border-2 border-green-200 rounded-2xl p-8 mb-6">
            <h3 className="text-2xl font-black text-green-900 mb-3">
              Position 2: Trace alcohol from fermentation is permissible (Moderate)
            </h3>
            <p className="text-green-800 mb-4">
              Alcohol that is a <strong>natural byproduct</strong> of fermentation (not added
              intentionally as khamr) is permissible if it doesn't intoxicate.
            </p>
            <div className="bg-white rounded-xl p-4 mb-4">
              <p className="font-bold text-green-900 mb-2">Argument:</p>
              <p className="text-green-800 text-sm mb-3">
                Natural fermentation is unavoidable in many foods (bread, soy sauce, vinegar). The
                prohibition is on <strong>khamr</strong> (intoxicating beverages), not trace ethanol
                from food processing.
              </p>
              <p className="text-green-800 text-sm">
                <strong>Key principle:</strong> Intent matters. If the alcohol is not added for
                intoxication, and the final product doesn't intoxicate, it's permissible.
              </p>
            </div>
            <p className="text-sm text-green-700 font-semibold">
              Followed by: Majority of contemporary scholars, including many Hanafi, Maliki, and
              Shafi'i scholars.
            </p>
          </div>

          {/* Position 3: Pragmatic */}
          <div className="bg-blue-50 border-2 border-blue-200 rounded-2xl p-8 mb-8">
            <h3 className="text-2xl font-black text-blue-900 mb-3">
              Position 3: Permissible if alcohol evaporates during cooking (Pragmatic)
            </h3>
            <p className="text-blue-800 mb-4">
              If alcohol is added but then <strong>evaporates</strong> or transforms during cooking,
              the final product is halal.
            </p>
            <div className="bg-white rounded-xl p-4 mb-4">
              <p className="font-bold text-blue-900 mb-2">Argument:</p>
              <p className="text-blue-800 text-sm">
                The principle of <strong>istihalah</strong> (transformation). When a substance
                fundamentally changes (e.g., wine → vinegar, alcohol → evaporated), it is no longer
                the original haram substance.
              </p>
            </div>
            <p className="text-sm text-blue-700 font-semibold">
              Followed by: Some scholars who allow cooking with wine if it fully evaporates.
            </p>
          </div>

          {/* Section: Common Foods */}
          <h2 className="text-3xl font-black text-[#2A2419] mt-16 mb-6">
            Common foods with trace alcohol
          </h2>

          <div className="space-y-6 mb-12">
            {/* Vanilla Extract */}
            <div className="bg-white border-2 border-[#E8E6E1] rounded-2xl p-6">
              <h4 className="text-xl font-bold text-[#2A2419] mb-2">Vanilla Extract</h4>
              <p className="text-[#5A5449] mb-3">
                35% alcohol. But you use <strong>1 teaspoon</strong> in a cake that serves 12 people.
              </p>
              <div className="bg-[#FAFAF8] rounded-xl p-4">
                <p className="text-sm text-[#5A5449]">
                  Final alcohol concentration in one slice: <strong>&lt;0.01%</strong>. Plus, most
                  evaporates during baking.
                </p>
                <p className="text-sm text-green-700 font-semibold mt-2">
                  ✓ Most scholars allow (Position 2 & 3). Some strict scholars forbid (Position 1).
                </p>
              </div>
            </div>

            {/* Soy Sauce */}
            <div className="bg-white border-2 border-[#E8E6E1] rounded-2xl p-6">
              <h4 className="text-xl font-bold text-[#2A2419] mb-2">Soy Sauce</h4>
              <p className="text-[#5A5449] mb-3">
                Naturally fermented. Contains ~2% alcohol as a byproduct.
              </p>
              <div className="bg-[#FAFAF8] rounded-xl p-4">
                <p className="text-sm text-[#5A5449]">
                  The alcohol is not added intentionally. It's a natural result of fermentation.
                </p>
                <p className="text-sm text-green-700 font-semibold mt-2">
                  ✓ Most scholars allow (Position 2). Not intoxicating.
                </p>
              </div>
            </div>

            {/* Vinegar */}
            <div className="bg-green-50 border-2 border-green-200 rounded-2xl p-6">
              <h4 className="text-xl font-bold text-green-900 mb-2">Vinegar</h4>
              <p className="text-green-800 mb-3">
                Was wine. Now transformed through fermentation (acetic acid replaces ethanol).
              </p>
              <div className="bg-white rounded-xl p-4">
                <p className="text-sm text-green-800">
                  <strong>Consensus:</strong> Vinegar is halal, even if it was originally wine.
                  Istihalah (transformation) has occurred.
                </p>
                <p className="text-sm text-green-700 font-semibold mt-2">
                  ✓ All scholars agree. Vinegar is halal.
                </p>
              </div>
            </div>

            {/* Bread */}
            <div className="bg-white border-2 border-[#E8E6E1] rounded-2xl p-6">
              <h4 className="text-xl font-bold text-[#2A2419] mb-2">Bread</h4>
              <p className="text-[#5A5449] mb-3">
                Yeast fermentation produces trace ethanol during rising. Evaporates during baking.
              </p>
              <div className="bg-[#FAFAF8] rounded-xl p-4">
                <p className="text-sm text-green-700 font-semibold">
                  ✓ All scholars agree. Bread is halal.
                </p>
              </div>
            </div>

            {/* Ripe Fruit */}
            <div className="bg-white border-2 border-[#E8E6E1] rounded-2xl p-6">
              <h4 className="text-xl font-bold text-[#2A2419] mb-2">Ripe Fruit</h4>
              <p className="text-[#5A5449] mb-3">
                Overripe bananas and apples naturally contain ~0.1-0.5% alcohol from fermentation.
              </p>
              <div className="bg-[#FAFAF8] rounded-xl p-4">
                <p className="text-sm text-green-700 font-semibold">
                  ✓ All scholars agree. Natural fruit is halal.
                </p>
              </div>
            </div>

            {/* Non-Alcoholic Beer */}
            <div className="bg-amber-50 border-2 border-amber-200 rounded-2xl p-6">
              <h4 className="text-xl font-bold text-amber-900 mb-2">Non-Alcoholic Beer</h4>
              <p className="text-amber-800 mb-3">
                Usually contains &lt;0.5% alcohol. Made by removing alcohol from regular beer.
              </p>
              <div className="bg-white rounded-xl p-4">
                <p className="text-sm text-amber-800">
                  ⚠ <strong>Controversial.</strong> Some scholars allow (trace amount). Others forbid
                  (resembles khamr, may lead to temptation).
                </p>
                <p className="text-sm text-amber-700 font-semibold mt-2">
                  ⚠ Check with your scholar. Many Muslims avoid to be safe.
                </p>
              </div>
            </div>
          </div>

          {/* Section: When It's Clearly Haram */}
          <h2 className="text-3xl font-black text-[#2A2419] mt-16 mb-6">
            When it's clearly haram
          </h2>

          <div className="bg-red-50 border-2 border-red-200 rounded-2xl p-8 mb-12">
            <h3 className="text-xl font-black text-red-900 mb-4">
              These are NOT permissible under any position:
            </h3>
            <div className="space-y-3">
              <div className="flex items-start gap-2">
                <span className="text-red-600">✗</span>
                <span className="text-red-800">
                  <strong>Wine/beer in sauces</strong> (if not fully evaporated)
                </span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-red-600">✗</span>
                <span className="text-red-800">
                  <strong>"Cooking wine"</strong> added to dishes
                </span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-red-600">✗</span>
                <span className="text-red-800">
                  <strong>Rum in desserts</strong> (e.g., rum cake with liquor)
                </span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-red-600">✗</span>
                <span className="text-red-800">
                  <strong>Liqueur-filled chocolates</strong>
                </span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-red-600">✗</span>
                <span className="text-red-800">
                  <strong>Alcoholic beverages</strong> (beer, wine, spirits)
                </span>
              </div>
            </div>
            <p className="text-sm text-red-700 font-semibold mt-4">
              If alcohol is added <strong>intentionally as khamr</strong> and remains in significant
              amounts, it's haram. Period.
            </p>
          </div>

          {/* Pull Quote */}
          <div className="my-16 py-8 border-y-2 border-[#E8E6E1]">
            <blockquote className="text-2xl md:text-3xl font-black text-[#2A2419] leading-tight text-center">
              "The prohibition is on <em className="text-[#4B7A88]">khamr</em>—intoxicating
              beverages. Not on every molecule of ethanol that exists in nature."
            </blockquote>
          </div>

          {/* Section: Practical Guidelines */}
          <h2 className="text-3xl font-black text-[#2A2419] mt-16 mb-6">
            Practical guidelines
          </h2>

          <div className="space-y-6 mb-12">
            <div className="flex items-start gap-4">
              <span className="flex-shrink-0 w-10 h-10 rounded-full bg-[#4B7A88] text-white flex items-center justify-center font-black text-lg">
                1
              </span>
              <div>
                <h4 className="font-bold text-[#2A2419] mb-2">
                  If alcohol is added intentionally as khamr → avoid
                </h4>
                <p className="text-[#5A5449]">
                  Cooking wine, rum cakes, beer-battered fish. These are haram.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <span className="flex-shrink-0 w-10 h-10 rounded-full bg-[#4B7A88] text-white flex items-center justify-center font-black text-lg">
                2
              </span>
              <div>
                <h4 className="font-bold text-[#2A2419] mb-2">
                  If it's trace alcohol from fermentation and doesn't intoxicate → most scholars
                  allow
                </h4>
                <p className="text-[#5A5449]">
                  Soy sauce, bread, vanilla extract (in baking). Permissible under Position 2.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <span className="flex-shrink-0 w-10 h-10 rounded-full bg-[#4B7A88] text-white flex items-center justify-center font-black text-lg">
                3
              </span>
              <div>
                <h4 className="font-bold text-[#2A2419] mb-2">
                  If you follow the strict position → avoid all
                </h4>
                <p className="text-[#5A5449]">
                  Some Muslims prefer to avoid any trace. That's a valid choice (Position 1).
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <span className="flex-shrink-0 w-10 h-10 rounded-full bg-[#4B7A88] text-white flex items-center justify-center font-black text-lg">
                4
              </span>
              <div>
                <h4 className="font-bold text-[#2A2419] mb-2">When in doubt → ask your scholar</h4>
                <p className="text-[#5A5449]">
                  This is a nuanced fiqh issue. Consult a scholar from your madhhab if uncertain.
                </p>
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
                  <strong>Khamr</strong> (intoxicating beverages) is absolutely haram. No debate.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[#F0C65F] font-bold text-xl mt-0.5 flex-shrink-0">2.</span>
                <span className="text-white leading-relaxed">
                  <strong>Trace alcohol</strong> from fermentation (bread, soy sauce) is allowed by
                  most scholars.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[#F0C65F] font-bold text-xl mt-0.5 flex-shrink-0">3.</span>
                <span className="text-white leading-relaxed">
                  Vanilla extract in baking, vinegar, and natural fruit alcohol are permissible under
                  the moderate position.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[#F0C65F] font-bold text-xl mt-0.5 flex-shrink-0">4.</span>
                <span className="text-white leading-relaxed">
                  Cooking wine, rum desserts, and liqueur chocolates are haram—alcohol was added
                  intentionally as khamr.
                </span>
              </li>
            </ul>
          </div>

          {/* Related */}
          <div className="border-t-2 border-[#E8E6E1] pt-12 mt-16">
            <h3 className="text-2xl font-black text-[#2A2419] mb-6">Related Guides</h3>
            <div className="grid md:grid-cols-2 gap-6">
              <Link
                href={`/${params.locale}/is-it-halal/reading-ingredient-labels`}
                className="group bg-[#FAFAF8] border-2 border-[#E8E6E1] rounded-xl p-6 hover:border-[#4B7A88] transition-colors"
              >
                <p className="text-xs uppercase tracking-[0.15em] font-bold text-[#4B7A88] mb-2">
                  Published
                </p>
                <h4 className="text-xl font-bold text-[#2A2419] mb-2 group-hover:text-[#4B7A88]">
                  Can You Trust the Ingredient List?
                </h4>
                <p className="text-sm text-[#5A5449]">
                  What labels don't tell you. Processing aids, "natural flavors," and hidden
                  ingredients.
                </p>
              </Link>

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
                  Certification standards differ by country. Learn the differences.
                </p>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}
