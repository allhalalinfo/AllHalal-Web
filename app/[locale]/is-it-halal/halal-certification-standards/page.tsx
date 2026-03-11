import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";

export const metadata: Metadata = {
  title: "What Your Halal Logo Actually Means: Certification Standards Explained",
  description:
    "JAKIM vs IFANCA vs HMC—why certification bodies differ by country. Learn when stunning matters, what 'halal-friendly' really means, and how to verify authenticity.",
  keywords: [
    "halal certification",
    "JAKIM",
    "IFANCA",
    "HMC",
    "MUI",
    "halal logo meaning",
    "halal standards",
    "halal friendly",
    "stunning meat halal",
  ],
  openGraph: {
    title: "What Your Halal Logo Actually Means",
    description:
      "Certification bodies differ by country. Same logo ≠ same standard. Learn the real differences.",
    type: "article",
    publishedTime: "2026-03-11",
  },
};

export default async function HalalCertificationGuide(props: {
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
              <span className="px-3 py-1 bg-[#4B7A88] text-white font-bold uppercase tracking-widest rounded-full text-xs">
                Editor's Pick
              </span>
              <span className="uppercase tracking-[0.15em] font-bold text-[#4B7A88]">
                Certification
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#C4C1B8]" />
              <span className="text-[#7A7569]">12 min</span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#C4C1B8]" />
              <span className="text-[#7A7569]">Beginner</span>
            </div>

            <h1 className="text-5xl md:text-6xl lg:text-7xl font-black text-[#2A2419] tracking-tight leading-[1]">
              What your halal logo{" "}
              <span className="italic text-[#4B7A88]">actually</span> means
            </h1>

            <p className="text-2xl text-[#5A5449] leading-relaxed">
              Certification bodies differ by country. Some require separate production lines;
              others don't. Same logo ≠ same standard.
            </p>

            <div className="flex items-center gap-4 pt-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#4B7A88] flex items-center justify-center text-white font-bold">
                  A
                </div>
                <div>
                  <p className="text-sm font-bold text-[#2A2419]">AllHalal Editorial Team</p>
                  <p className="text-xs text-[#7A7569]">March 11, 2026</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Image */}
      <div className="container mx-auto px-6 md:px-12 max-w-5xl py-12">
        <div className="relative aspect-[16/9] rounded-3xl overflow-hidden shadow-2xl">
          <Image
            src="/images/guides/certification-logos-hero.jpg"
            alt="Various halal certification logos from JAKIM, IFANCA, HMC, and MUI on official documents"
            fill
            className="object-cover"
            priority
          />
        </div>
      </div>

      {/* Article Content */}
      <div className="container mx-auto px-6 md:px-12 max-w-3xl py-12">
        <div className="prose prose-lg max-w-none">
          {/* Lede / Hook */}
          <div className="bg-[#FAFAF8] border-l-4 border-[#F0C65F] p-8 rounded-r-2xl mb-12">
            <p className="text-xl text-[#2A2419] leading-relaxed font-serif italic">
              You're at the supermarket. Two chicken breasts, side by side. Both have halal logos.
              One is $6.99, the other is $9.99. Are they the same? Probably not.
            </p>
          </div>

          {/* Section 1: The Problem */}
          <h2 className="text-3xl font-black text-[#2A2419] mt-16 mb-6">
            Not all halal logos mean the same thing
          </h2>

          <p className="text-lg text-[#5A5449] leading-relaxed mb-6">
            Most Muslims assume a halal logo is a halal logo. But certification bodies—organizations
            that inspect facilities and issue halal certificates—operate under{" "}
            <strong>wildly different standards</strong>.
          </p>

          <p className="text-lg text-[#5A5449] leading-relaxed mb-6">
            Some require separate slaughter lines for halal animals. Some allow stunning before
            slaughter. Some accept mechanical slaughter. Others don't.
          </p>

          <p className="text-lg text-[#5A5449] leading-relaxed mb-8">
            The logo on the package tells you <em>someone</em> certified it. It doesn't tell you{" "}
            <em>what standards they used</em>.
          </p>

          {/* Pull Quote */}
          <div className="my-12 py-8 border-y-2 border-[#E8E6E1]">
            <blockquote className="text-2xl md:text-3xl font-black text-[#2A2419] leading-tight text-center">
              "The logo on the package tells you <em>someone</em> certified it. It doesn't tell you{" "}
              <em className="text-[#4B7A88]">what standards they used</em>."
            </blockquote>
          </div>

          {/* Section 2: Major Certification Bodies */}
          <h2 className="text-3xl font-black text-[#2A2419] mt-16 mb-6">
            The major players (and their differences)
          </h2>

          <p className="text-lg text-[#5A5449] leading-relaxed mb-8">
            Here are the most common halal certification bodies worldwide, ranked roughly by
            strictness:
          </p>

          {/* JAKIM */}
          <div className="bg-white border-2 border-[#E8E6E1] rounded-2xl p-8 mb-6 hover:border-[#4B7A88] transition-colors">
            <h3 className="text-2xl font-black text-[#2A2419] mb-3">
              1. JAKIM (Malaysia)
            </h3>
            <p className="text-sm uppercase tracking-[0.15em] font-bold text-[#4B7A88] mb-4">
              Department of Islamic Development Malaysia
            </p>
            <p className="text-lg text-[#5A5449] leading-relaxed mb-4">
              <strong>Reputation:</strong> Gold standard. JAKIM is{" "}
              <strong>the most stringent</strong> halal certifier globally.
            </p>
            <div className="space-y-2 text-[#5A5449]">
              <p>
                <strong className="text-[#2A2419]">Requirements:</strong>
              </p>
              <ul className="list-none space-y-2 ml-0">
                <li className="flex items-start gap-2">
                  <span className="text-[#4B7A88] mt-1.5">✓</span>
                  <span>Separate halal production lines (no cross-contamination risk)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#4B7A88] mt-1.5">✓</span>
                  <span>
                    Manual slaughter by trained Muslim slaughtermen (mechanical slaughter not
                    allowed)
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#4B7A88] mt-1.5">✓</span>
                  <span>
                    No stunning allowed (or only reversible stunning under strict conditions)
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#4B7A88] mt-1.5">✓</span>
                  <span>Full ingredient traceability (every supplier vetted)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#4B7A88] mt-1.5">✓</span>
                  <span>Regular surprise audits</span>
                </li>
              </ul>
            </div>
            <p className="text-sm text-[#7A7569] mt-4 italic">
              Products with JAKIM certification are trusted across Southeast Asia and the Gulf.
              Many Muslims prefer JAKIM even when shopping outside Malaysia.
            </p>
          </div>

          {/* MUI */}
          <div className="bg-white border-2 border-[#E8E6E1] rounded-2xl p-8 mb-6 hover:border-[#4B7A88] transition-colors">
            <h3 className="text-2xl font-black text-[#2A2419] mb-3">
              2. MUI (Indonesia)
            </h3>
            <p className="text-sm uppercase tracking-[0.15em] font-bold text-[#4B7A88] mb-4">
              Majelis Ulama Indonesia
            </p>
            <p className="text-lg text-[#5A5449] leading-relaxed mb-4">
              <strong>Reputation:</strong> Very strict, similar to JAKIM. Indonesia has the
              world's largest Muslim population, so MUI certification is widely recognized.
            </p>
            <div className="space-y-2 text-[#5A5449]">
              <p>
                <strong className="text-[#2A2419]">Key points:</strong>
              </p>
              <ul className="list-none space-y-2 ml-0">
                <li className="flex items-start gap-2">
                  <span className="text-[#4B7A88] mt-1.5">✓</span>
                  <span>No stunning (same as JAKIM)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#4B7A88] mt-1.5">✓</span>
                  <span>Separate production lines required</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#4B7A88] mt-1.5">✓</span>
                  <span>Traceability audits for all ingredients</span>
                </li>
              </ul>
            </div>
          </div>

          {/* HMC */}
          <div className="bg-white border-2 border-[#E8E6E1] rounded-2xl p-8 mb-6 hover:border-[#4B7A88] transition-colors">
            <h3 className="text-2xl font-black text-[#2A2419] mb-3">
              3. HMC (UK)
            </h3>
            <p className="text-sm uppercase tracking-[0.15em] font-bold text-[#4B7A88] mb-4">
              Halal Monitoring Committee
            </p>
            <p className="text-lg text-[#5A5449] leading-relaxed mb-4">
              <strong>Reputation:</strong> Strict. HMC is well-regarded in the UK and Europe.
            </p>
            <div className="space-y-2 text-[#5A5449]">
              <p>
                <strong className="text-[#2A2419]">Key points:</strong>
              </p>
              <ul className="list-none space-y-2 ml-0">
                <li className="flex items-start gap-2">
                  <span className="text-[#4B7A88] mt-1.5">✓</span>
                  <span>
                    <strong>No stunning allowed</strong> (this is their defining feature)
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#4B7A88] mt-1.5">✓</span>
                  <span>Hand-slaughter by Muslim slaughtermen</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#4B7A88] mt-1.5">✓</span>
                  <span>Tasmiyah (saying "Bismillah") required at slaughter</span>
                </li>
              </ul>
            </div>
            <p className="text-sm text-[#7A7569] mt-4 italic">
              HMC is popular among Muslims who want to avoid stunning entirely. Look for their logo
              on meat sold in UK supermarkets.
            </p>
          </div>

          {/* IFANCA */}
          <div className="bg-white border-2 border-[#E8E6E1] rounded-2xl p-8 mb-6 hover:border-[#4B7A88] transition-colors">
            <h3 className="text-2xl font-black text-[#2A2419] mb-3">
              4. IFANCA (USA)
            </h3>
            <p className="text-sm uppercase tracking-[0.15em] font-bold text-[#4B7A88] mb-4">
              Islamic Food and Nutrition Council of America
            </p>
            <p className="text-lg text-[#5A5449] leading-relaxed mb-4">
              <strong>Reputation:</strong> Widely accepted, but more lenient than JAKIM/HMC.
            </p>
            <div className="space-y-2 text-[#5A5449]">
              <p>
                <strong className="text-[#2A2419]">Key differences:</strong>
              </p>
              <ul className="list-none space-y-2 ml-0">
                <li className="flex items-start gap-2">
                  <span className="text-[#F0C65F] mt-1.5">⚠</span>
                  <span>
                    <strong>Stunning allowed</strong> (if reversible and animal doesn't die from
                    stunning)
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#F0C65F] mt-1.5">⚠</span>
                  <span>Shared production lines sometimes permitted (with cleaning protocols)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#4B7A88] mt-1.5">✓</span>
                  <span>Muslim slaughterman still required</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#4B7A88] mt-1.5">✓</span>
                  <span>Ingredient screening for pork/alcohol derivatives</span>
                </li>
              </ul>
            </div>
            <p className="text-sm text-[#7A7569] mt-4 italic">
              IFANCA is pragmatic—they work with large US food manufacturers to make halal options
              accessible. But if you want JAKIM-level strictness, IFANCA may not meet your
              personal standard.
            </p>
          </div>

          {/* Section 3: What About Stunning? */}
          <h2 className="text-3xl font-black text-[#2A2419] mt-16 mb-6">
            The stunning debate
          </h2>

          <p className="text-lg text-[#5A5449] leading-relaxed mb-6">
            Stunning—rendering an animal unconscious before slaughter—is one of the{" "}
            <strong>most controversial</strong> topics in halal certification.
          </p>

          <div className="bg-[#FAFAF8] border-2 border-[#E8E6E1] rounded-2xl p-8 mb-8">
            <h4 className="text-xl font-bold text-[#2A2419] mb-4">Two camps:</h4>
            <div className="space-y-6">
              <div>
                <p className="font-bold text-[#4B7A88] mb-2">
                  Camp 1: Stunning is acceptable (if reversible)
                </p>
                <p className="text-[#5A5449]">
                  Some scholars allow <strong>reversible stunning</strong> (electric or gas) that
                  renders the animal unconscious but doesn't kill it. The animal must still be
                  alive when the knife cuts the throat.
                </p>
                <p className="text-sm text-[#7A7569] mt-2">
                  Bodies like IFANCA and some European certifiers accept this.
                </p>
              </div>
              <div>
                <p className="font-bold text-[#4B7A88] mb-2">Camp 2: No stunning allowed</p>
                <p className="text-[#5A5449]">
                  Others argue that any stunning—even reversible—violates the spirit of zabiha
                  (Islamic slaughter). The animal should be fully conscious and healthy at the time
                  of slaughter.
                </p>
                <p className="text-sm text-[#7A7569] mt-2">JAKIM, MUI, and HMC follow this view.</p>
              </div>
            </div>
          </div>

          <p className="text-lg text-[#5A5449] leading-relaxed mb-6">
            <strong>What this means for you:</strong> If you want to avoid stunning entirely, look
            for HMC, JAKIM, or MUI logos. If you're comfortable with reversible stunning, IFANCA
            is fine.
          </p>

          {/* Section 4: What Does "Halal-Friendly" Mean? */}
          <h2 className="text-3xl font-black text-[#2A2419] mt-16 mb-6">
            What does "halal-friendly" actually mean?
          </h2>

          <p className="text-lg text-[#5A5449] leading-relaxed mb-6">
            You've seen this label in restaurants and hotels:{" "}
            <span className="italic">"halal-friendly"</span> or{" "}
            <span className="italic">"Muslim-friendly."</span>
          </p>

          <p className="text-lg text-[#5A5449] leading-relaxed mb-6">
            <strong>Translation:</strong> "We have <em>some</em> halal options, but we're not
            fully certified."
          </p>

          <div className="bg-[#FEF3E2] border-2 border-[#F0C65F] rounded-2xl p-8 mb-8">
            <p className="text-[#2A2419] font-semibold mb-3">This usually means:</p>
            <ul className="list-none space-y-2 ml-0 text-[#5A5449]">
              <li className="flex items-start gap-2">
                <span className="text-[#F0C65F] mt-1.5">⚠</span>
                <span>They serve halal meat, but also serve pork/alcohol</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#F0C65F] mt-1.5">⚠</span>
                <span>Shared cooking equipment (same grill for halal and non-halal)</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#F0C65F] mt-1.5">⚠</span>
                <span>No formal halal certification from a recognized body</span>
              </li>
            </ul>
          </div>

          <p className="text-lg text-[#5A5449] leading-relaxed mb-6">
            <strong>Is it halal?</strong> Technically, if the meat itself is halal and there's no
            cross-contamination, yes. But many Muslims prefer fully halal-certified establishments
            to avoid doubt.
          </p>

          {/* Section 5: How to Verify */}
          <h2 className="text-3xl font-black text-[#2A2419] mt-16 mb-6">
            How to verify halal certification
          </h2>

          <p className="text-lg text-[#5A5449] leading-relaxed mb-6">
            Don't just trust the logo. Here's how to verify:
          </p>

          <div className="space-y-4 mb-8">
            <div className="bg-white border-2 border-[#E8E6E1] rounded-xl p-6 hover:border-[#4B7A88] transition-colors">
              <h4 className="font-bold text-[#2A2419] mb-2">1. Check the certifier's website</h4>
              <p className="text-[#5A5449]">
                Most certification bodies maintain online databases. Search for the product or
                company name to confirm validity.
              </p>
              <p className="text-sm text-[#7A7569] mt-2">
                Example: JAKIM's portal at{" "}
                <span className="font-mono bg-[#FAFAF8] px-2 py-1 rounded">
                  halal.gov.my/v4/
                </span>
              </p>
            </div>

            <div className="bg-white border-2 border-[#E8E6E1] rounded-xl p-6 hover:border-[#4B7A88] transition-colors">
              <h4 className="font-bold text-[#2A2419] mb-2">2. Look for certificate numbers</h4>
              <p className="text-[#5A5449]">
                Legitimate halal logos include a certificate number. No number = suspicious.
              </p>
            </div>

            <div className="bg-white border-2 border-[#E8E6E1] rounded-xl p-6 hover:border-[#4B7A88] transition-colors">
              <h4 className="font-bold text-[#2A2419] mb-2">3. Contact the certifier directly</h4>
              <p className="text-[#5A5449]">
                If you can't find info online, email or call the certification body. They should
                confirm whether a product is certified.
              </p>
            </div>

            <div className="bg-white border-2 border-[#E8E6E1] rounded-xl p-6 hover:border-[#4B7A88] transition-colors">
              <h4 className="font-bold text-[#2A2419] mb-2">4. Use the AllHalal app</h4>
              <p className="text-[#5A5449]">
                Scan the barcode with our app to see certification status, ingredient analysis, and
                community reports.
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

          {/* Section 6: The Future */}
          <h2 className="text-3xl font-black text-[#2A2419] mt-16 mb-6">
            The future of halal certification
          </h2>

          <p className="text-lg text-[#5A5449] leading-relaxed mb-6">
            Halal certification is evolving. Here's what's changing:
          </p>

          <div className="space-y-6 mb-8">
            <div>
              <h4 className="text-xl font-bold text-[#2A2419] mb-2">
                Blockchain for traceability
              </h4>
              <p className="text-[#5A5449] leading-relaxed">
                Some certifiers are piloting blockchain technology to track meat from farm to
                supermarket. This makes fraud much harder.
              </p>
            </div>

            <div>
              <h4 className="text-xl font-bold text-[#2A2419] mb-2">
                Standardization efforts
              </h4>
              <p className="text-[#5A5449] leading-relaxed">
                Organizations like the World Halal Council are trying to harmonize standards
                globally. Progress is slow, but the goal is mutual recognition (e.g., JAKIM
                accepting IFANCA certificates).
              </p>
            </div>

            <div>
              <h4 className="text-xl font-bold text-[#2A2419] mb-2">Consumer awareness</h4>
              <p className="text-[#5A5449] leading-relaxed">
                Muslims are becoming more educated about certification differences. Apps like
                AllHalal make it easier to verify products and compare standards.
              </p>
            </div>
          </div>

          {/* Conclusion */}
          <div className="bg-gradient-to-br from-[#2A2419] to-[#3D352A] text-white rounded-3xl p-10 mt-16 mb-12">
            <h2 className="text-3xl font-black mb-6 text-white">Key Takeaways</h2>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <span className="text-[#F0C65F] font-bold text-xl mt-0.5 flex-shrink-0">1.</span>
                <span className="text-white leading-relaxed">
                  Not all halal logos are equal. JAKIM and HMC are stricter than IFANCA.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[#F0C65F] font-bold text-xl mt-0.5 flex-shrink-0">2.</span>
                <span className="text-white leading-relaxed">
                  Stunning is a dividing line. Know your personal preference.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[#F0C65F] font-bold text-xl mt-0.5 flex-shrink-0">3.</span>
                <span className="text-white leading-relaxed">
                  "Halal-friendly" is not the same as halal-certified.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[#F0C65F] font-bold text-xl mt-0.5 flex-shrink-0">4.</span>
                <span className="text-white leading-relaxed">
                  Always verify the logo. Check the certifier's database or use our app.
                </span>
              </li>
            </ul>
          </div>

          {/* Related Articles */}
          <div className="border-t-2 border-[#E8E6E1] pt-12 mt-16">
            <h3 className="text-2xl font-black text-[#2A2419] mb-6">Related Guides</h3>
            <div className="grid md:grid-cols-2 gap-6">
              <Link
                href={`/${params.locale}/is-it-halal`}
                className="group bg-[#FAFAF8] border-2 border-[#E8E6E1] rounded-xl p-6 hover:border-[#4B7A88] transition-colors"
              >
                <p className="text-xs uppercase tracking-[0.15em] font-bold text-[#4B7A88] mb-2">
                  Coming Soon
                </p>
                <h4 className="text-xl font-bold text-[#2A2419] mb-2 group-hover:text-[#4B7A88]">
                  E-Codes Explained for Muslims
                </h4>
                <p className="text-sm text-[#5A5449]">
                  Which E-numbers are problematic and how to spot them on labels.
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
                  How to identify animal-derived ingredients in processed food.
                </p>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}
