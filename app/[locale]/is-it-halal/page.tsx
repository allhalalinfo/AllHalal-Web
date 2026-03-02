import { halalItems } from "@/data/halalItems";
import Link from "next/link";
import { Metadata } from "next";
import AppPromoMini from "@/components/ui/AppPromoMini";
import HalalSearchClient from "./HalalSearchClient";

export const metadata: Metadata = {
  title: 'Is it Halal? Check popular products & ingredients | AllHalal',
  description: 'Search our database of ingredients, snacks, and products to find out if they are Halal, Haram, or Doubtful.',
};

export default async function IsItHalalPage(props: { params: Promise<{ locale: string }> }) {
  const params = await props.params;
  const locale = params.locale;
  
  const categories = [
    { id: 'all', name: 'All Items' },
    { id: 'ingredient', name: 'Ingredients' },
    { id: 'additive', name: 'Additives (E-Codes)' },
    { id: 'snack', name: 'Snacks & Sweets' },
    { id: 'drink', name: 'Drinks' },
    { id: 'fast-food', name: 'Fast Food' }
  ];

  return (
    <div className="container py-32 min-h-screen">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold text-text-primary mb-6">
          Is it Halal?
        </h1>
        <div className="bg-primary/5 border border-primary/20 p-6 rounded-2xl mb-6">
          <p className="text-text-secondary leading-relaxed">
            Welcome to the AllHalal web directory. This is a curated list of the most frequently asked about products and ingredients. <strong className="text-text-primary">For access to our complete, live-updated database of over 2 million products</strong>, please use the <a href="https://apps.apple.com/us/app/allhalal-info-food-scanner/id6756242265" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline font-bold">AllHalal mobile app scanner</a>.
          </p>
        </div>

        <Link href={`/${locale}/boycott-checker`} className="group flex items-center justify-between bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-900/50 p-6 rounded-2xl mb-10 hover:border-red-400 transition-all">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-red-100 dark:bg-red-900/50 rounded-full flex items-center justify-center shrink-0">
              <svg className="w-6 h-6 text-red-600 dark:text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
            <div>
              <h3 className="text-lg font-bold text-red-800 dark:text-red-400 group-hover:text-red-600 transition-colors">BDS Boycott Checker</h3>
              <p className="text-sm text-red-700/80 dark:text-red-400/80">Search for a brand to see if it's on the boycott list.</p>
            </div>
          </div>
          <span className="text-red-500 font-bold hidden sm:block group-hover:translate-x-1 transition-transform">Check &rarr;</span>
        </Link>

        <div className="flex flex-wrap gap-3 mb-8">
          <Link href={`/${locale}/is-it-halal`} className="px-4 py-2 bg-primary text-white border border-primary rounded-full text-sm font-medium hover:bg-primary-dark cursor-pointer transition-colors">
            All Items
          </Link>
          {categories.filter(c => c.id !== 'all').map(cat => (
            <Link key={cat.id} href={`/${locale}/is-it-halal/category/${cat.id}`} className="px-4 py-2 bg-bg-card border border-border rounded-full text-sm font-medium text-text-primary hover:border-primary cursor-pointer transition-colors">
              {cat.name}
            </Link>
          ))}
        </div>

        <HalalSearchClient items={halalItems} locale={locale} />

        <h2 className="text-2xl font-bold text-text-primary mt-12 mb-4">Frequently Asked Questions</h2>
        <div className="space-y-4 mb-10">
          <details className="bg-bg-card border border-border p-4 rounded-xl cursor-pointer group">
            <summary className="font-bold text-text-primary outline-none">How accurate is this list?</summary>
            <p className="mt-3 text-text-secondary text-sm leading-relaxed">Our information is sourced from prominent Islamic scholars and halal certification bodies. However, product recipes change frequently. The AllHalal app uses live data to ensure accuracy.</p>
          </details>
          <details className="bg-bg-card border border-border p-4 rounded-xl cursor-pointer group">
            <summary className="font-bold text-text-primary outline-none">What does "Doubtful" (Mashbooh) mean?</summary>
            <p className="mt-3 text-text-secondary text-sm leading-relaxed">Doubtful items either have conflicting opinions among scholars or can be derived from both halal and haram sources (like E471 or Gelatin). It is generally recommended to avoid them unless certified halal.</p>
          </details>
        </div>

        <AppPromoMini />
      </div>
    </div>
  );
}