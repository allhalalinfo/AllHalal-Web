import Link from "next/link";
import { Metadata } from "next";
import AppPromoMini from "@/components/ui/AppPromoMini";
import FAQSchema from "@/components/seo/FAQSchema";

export const metadata: Metadata = {
  alternates: { canonical: "/finance/mortgages" },
  title: 'Halal Mortgage in the US: A Complete Guide | allhalal.info',
  description: 'Learn how to get a halal mortgage in the US. Discover how Islamic mortgages work without Riba and explore top Sharia-compliant home financing providers.',
};

export default async function MortgagesPage(props: { params: Promise<{}> }) {
  const params = await props.params;
  
  const faqs = [
    {
      question: "Are Islamic mortgages really interest-free?",
      answer: "Yes. Instead of lending money for interest, the institution buys the asset and sells/leases it to you. The profit they make is tied to a tangible asset (the house), which is permissible in Islam."
    },
    {
      question: "Why are the rates similar to conventional banks?",
      answer: "Islamic banks must remain competitive in the same housing market. They often benchmark their profit rates against standard interest rates (like LIBOR or the Fed rate) to determine a fair market price for rent or markup. Benchmarking against an interest rate is widely accepted by Shariah boards, as long as the underlying contract mechanism is valid."
    },
    {
      question: "Is a halal mortgage more expensive than a traditional one?",
      answer: "Generally, Islamic mortgages can be slightly more expensive due to higher administrative costs, legal complexities in setting up Sharia-compliant contracts, and less availability of secondary market funding compared to conventional loans. However, the gap is closing as the market grows."
    },
    {
      question: "Can I refinance my conventional mortgage into an Islamic one?",
      answer: "Yes, many Islamic finance providers in the US offer refinancing options. You essentially sell your portion of the house to the Islamic financier, who then pays off your conventional interest-bearing loan, and you enter a new Sharia-compliant contract (like Musharaka or Ijara) with them."
    }
  ];

  return (
    <main className="relative min-h-screen overflow-hidden bg-gradient-to-b from-[#f7f2e7] via-[#f9f6f1] to-[#f2f1e8]">
      {/* Ambient background elements */}
      <div className="pointer-events-none fixed inset-0">
        <div className="absolute right-[-8rem] top-[8rem] h-[32rem] w-[32rem] rounded-full bg-[radial-gradient(circle,rgba(139,123,186,0.06),transparent_65%)] blur-3xl" />
        <div className="absolute left-[-12rem] top-[28rem] h-[36rem] w-[36rem] rounded-full bg-[radial-gradient(circle,rgba(75,122,136,0.08),transparent_68%)] blur-3xl" />
        <div className="absolute right-[-10rem] bottom-[8rem] h-[28rem] w-[28rem] rounded-full bg-[radial-gradient(circle,rgba(89,113,77,0.07),transparent_62%)] blur-3xl" />
      </div>

      <div className="container relative z-10 mx-auto max-w-6xl px-6 py-32">
        <FAQSchema faqs={faqs} />
        
        {/* Breadcrumb */}
        <Link 
          href="/finance" 
          className="mb-8 inline-flex items-center gap-2 text-sm font-semibold text-primary hover:underline"
        >
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to Finance
        </Link>

        {/* Hero */}
        <div className="mb-16">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-[rgba(75,110,112,0.08)] px-4 py-1.5">
            <svg className="h-4 w-4 text-[#4B6E70]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
            <span className="text-xs font-bold uppercase tracking-wider text-[#4B6E70]">
              Islamic Home Financing
            </span>
          </div>
          
          <h1 className="mb-6 text-[clamp(2.5rem,7vw,4rem)] font-black font-display leading-[0.95] tracking-tight text-text-primary">
            Guide to Halal Mortgages
          </h1>
          
          <p className="max-w-3xl text-lg leading-relaxed text-text-secondary">
            Buying a home is one of the biggest financial decisions you will make. For Muslims, doing so without engaging in Riba (interest) is paramount. If you are looking for a halal mortgage in the US, Islamic home financing provides a Sharia-compliant alternative to conventional mortgages, allowing you to achieve homeownership while strictly adhering to your faith.
          </p>
        </div>

        {/* How it works - Card */}
        <section className="mb-16 rounded-3xl border border-[rgba(47,37,30,0.08)] bg-white/60 p-8 shadow-[0_8px_32px_rgba(43,34,24,0.04)] backdrop-blur-sm md:p-12">
          <h2 className="mb-6 text-3xl font-black font-display text-text-primary">
            How it works
          </h2>
          <p className="mb-8 text-text-secondary leading-relaxed">
            Instead of lending you money and charging interest, Islamic financiers typically use models like:
          </p>
          
          <div className="grid gap-6 md:grid-cols-3">
            <div className="group rounded-2xl border border-[rgba(75,110,112,0.12)] bg-gradient-to-br from-[rgba(75,110,112,0.04)] to-transparent p-6 transition-all hover:border-[rgba(75,110,112,0.3)] hover:shadow-lg">
              <div className="mb-3 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-[rgba(75,110,112,0.12)] text-[#4B6E70]">
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="mb-2 text-lg font-bold text-text-primary">Murabaha</h3>
              <p className="text-sm leading-relaxed text-text-secondary">
                The financier buys the property and sells it to you at a profit margin, paid in installments.
              </p>
            </div>

            <div className="group rounded-2xl border border-[rgba(244,185,66,0.12)] bg-gradient-to-br from-[rgba(244,185,66,0.04)] to-transparent p-6 transition-all hover:border-[rgba(244,185,66,0.3)] hover:shadow-lg">
              <div className="mb-3 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-[rgba(244,185,66,0.12)] text-primary">
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="mb-2 text-lg font-bold text-text-primary">Musharaka</h3>
              <p className="text-sm leading-relaxed text-text-secondary">
                You and the financier buy the property together. You gradually buy their shares over time while paying rent.
              </p>
            </div>

            <div className="group rounded-2xl border border-[rgba(89,113,77,0.12)] bg-gradient-to-br from-[rgba(89,113,77,0.04)] to-transparent p-6 transition-all hover:border-[rgba(89,113,77,0.3)] hover:shadow-lg">
              <div className="mb-3 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-[rgba(89,113,77,0.12)] text-[#59714D]">
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
                </svg>
              </div>
              <h3 className="mb-2 text-lg font-bold text-text-primary">Ijara</h3>
              <p className="text-sm leading-relaxed text-text-secondary">
                The financier buys the home and leases it to you, with ownership transferring at the end of the term.
              </p>
            </div>
          </div>
        </section>

        {/* Top Providers */}
        <section className="mb-16">
          <h2 className="mb-8 text-3xl font-black font-display text-text-primary">
            Top Providers
          </h2>
          
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <a
              href="https://www.manzil.us"
              target="_blank"
              rel="noopener noreferrer"
              className="group block rounded-3xl border border-[rgba(47,37,30,0.08)] bg-white/80 p-8 shadow-[0_4px_24px_rgba(43,34,24,0.04)] backdrop-blur-sm transition-all hover:border-[rgba(75,110,112,0.2)] hover:shadow-[0_8px_32px_rgba(43,34,24,0.08)]"
            >
              <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-[rgba(75,110,112,0.08)] px-3 py-1">
                <svg className="h-3.5 w-3.5 text-[#4B6E70]" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
                </svg>
                <span className="text-xs font-bold text-[#4B6E70]">Featured</span>
              </div>
              
              <h3 className="mb-3 text-2xl font-black text-text-primary group-hover:text-[#4B6E70] transition-colors">
                Manzil
              </h3>
              
              <p className="mb-6 leading-relaxed text-text-secondary">
                Offers Murabaha and Musharaka financing. Certified by reputable Shariah boards.
              </p>
              
              <div className="flex items-center gap-2 font-semibold text-primary group-hover:gap-3 transition-all">
                Visit Manzil
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </div>
            </a>

            <a
              href="https://www.guidanceresidential.com"
              target="_blank"
              rel="noopener noreferrer"
              className="group block rounded-3xl border border-[rgba(47,37,30,0.08)] bg-white/80 p-8 shadow-[0_4px_24px_rgba(43,34,24,0.04)] backdrop-blur-sm transition-all hover:border-[rgba(244,185,66,0.2)] hover:shadow-[0_8px_32px_rgba(43,34,24,0.08)]"
            >
              <h3 className="mb-3 text-2xl font-black text-text-primary group-hover:text-primary transition-colors">
                Guidance Residential
              </h3>
              
              <p className="mb-6 leading-relaxed text-text-secondary">
                One of the largest Islamic home financing providers in the US, offering Declining Balance Co-ownership programs.
              </p>
              
              <div className="flex items-center gap-2 font-semibold text-primary group-hover:gap-3 transition-all">
                Visit Guidance
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </div>
            </a>

            <a
              href="https://www.myuif.com"
              target="_blank"
              rel="noopener noreferrer"
              className="group block rounded-3xl border border-[rgba(47,37,30,0.08)] bg-white/80 p-8 shadow-[0_4px_24px_rgba(43,34,24,0.04)] backdrop-blur-sm transition-all hover:border-[rgba(89,113,77,0.2)] hover:shadow-[0_8px_32px_rgba(43,34,24,0.08)]"
            >
              <h3 className="mb-3 text-2xl font-black text-text-primary group-hover:text-[#59714D] transition-colors">
                UIF Corporation
              </h3>
              
              <p className="mb-6 leading-relaxed text-text-secondary">
                Provides Murabaha and Musharaka financing options across many US states.
              </p>
              
              <div className="flex items-center gap-2 font-semibold text-primary group-hover:gap-3 transition-all">
                Visit UIF
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </div>
            </a>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="mb-16">
          <h2 className="mb-8 text-3xl font-black font-display text-text-primary">
            Frequently Asked Questions
          </h2>
          <div className="space-y-4">
            {faqs.map((faq, idx) => (
              <details
                key={idx}
                className="group rounded-2xl border border-[rgba(47,37,30,0.08)] bg-white/80 p-6 shadow-[0_2px_16px_rgba(43,34,24,0.04)] backdrop-blur-sm transition-all hover:shadow-[0_4px_24px_rgba(43,34,24,0.06)]"
              >
                <summary className="flex cursor-pointer items-center justify-between gap-4 font-bold text-text-primary outline-none">
                  <span>{faq.question}</span>
                  <svg
                    className="h-5 w-5 flex-shrink-0 text-primary transition-transform group-open:rotate-180"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </summary>
                <p className="mt-4 leading-relaxed text-text-secondary">
                  {faq.answer}
                </p>
              </details>
            ))}
          </div>
        </section>

        {/* App Promo */}
        <div className="mb-16">
          <AppPromoMini />
        </div>

        {/* Continue Learning */}
        <section className="rounded-3xl border border-[rgba(47,37,30,0.08)] bg-white/60 p-8 backdrop-blur-sm">
          <h3 className="mb-6 text-xl font-bold text-text-primary">Continue Learning</h3>
          <div className="flex flex-wrap gap-4">
            <Link
              href="/finance/investing"
              className="inline-flex items-center gap-2 rounded-full border border-[rgba(47,37,30,0.1)] bg-white px-5 py-2.5 text-sm font-semibold text-text-primary transition-all hover:border-primary hover:bg-[rgba(244,185,66,0.04)]"
            >
              Halal Investing
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
            <Link
              href="/finance/banks"
              className="inline-flex items-center gap-2 rounded-full border border-[rgba(47,37,30,0.1)] bg-white px-5 py-2.5 text-sm font-semibold text-text-primary transition-all hover:border-primary hover:bg-[rgba(244,185,66,0.04)]"
            >
              Halal Banks
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}