import { halalItems } from "@/data/halalItems";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Metadata } from "next";
import AppPromoMini from "@/components/ui/AppPromoMini";
import FAQSchema from "@/components/seo/FAQSchema";

export async function generateStaticParams() {
  const categories = Array.from(new Set(halalItems.map(item => item.category)));
  return categories.map((cat) => ({
    category: cat,
  }));
}

export async function generateMetadata(props: { params: Promise<{ category: string }> }): Promise<Metadata> {
  const params = await props.params;
  const categoryName = params.category.charAt(0).toUpperCase() + params.category.slice(1);
  return {
    title: `Is it Halal? ${categoryName} | allhalal.info`,
    description: `Check the halal status of popular ${categoryName} products and ingredients.`,
  };
}

export default async function HalalCategoryPage(props: { params: Promise<{ locale: string, category: string }> }) {
  const params = await props.params;
  const items = halalItems.filter(i => i.category === params.category);
  
  if (items.length === 0) notFound();

  const categoryName = params.category.charAt(0).toUpperCase() + params.category.slice(1);
  const featuredItems = items.filter((item) => item.priority === "high").slice(0, 4);
  const faqs = [
    {
      question: `How should I use the ${categoryName} halal page?`,
      answer: `Start with the exact ${categoryName.toLowerCase()} item you are unsure about, then compare the verdict, explanation and similar items in the same category.`,
    },
    {
      question: `Why are some ${categoryName.toLowerCase()} items marked doubtful?`,
      answer:
        "Doubtful items often depend on source ingredients, region of manufacture, certification or scholarly differences about the underlying substance.",
    },
  ];

  return (
    <div className="container py-32 min-h-screen">
      <FAQSchema faqs={faqs} />
      <div className="max-w-5xl mx-auto">
        <Link href={`/${params.locale}/is-it-halal`} className="text-primary hover:underline mb-8 inline-block">
          &larr; Back to all categories
        </Link>
        
        <h1 className="text-4xl md:text-5xl font-bold font-display text-text-primary mb-6 capitalize">
          {categoryName}
        </h1>
        
        <div className="bg-primary/5 border border-primary/20 p-6 rounded-2xl mb-10">
          <p className="text-text-secondary leading-relaxed mb-4">
            Welcome to the allhalal.info web directory for {categoryName}. 
            {params.category === 'snack' && " From chips and chocolates to gummies and cookies, navigating halal snacks in the US can be tricky. Many popular snacks contain hidden animal-derived enzymes, non-halal gelatin, or alcohol-based flavorings. Browse our verified list to snack with confidence."}
            {params.category === 'drink' && " While most sodas and juices are straightforward, some energy drinks, fermented teas, and specialty coffees carry hidden risks like carmine (E120) or trace alcohol. Check the halal status of popular drinks here."}
            {params.category === 'additive' && " E-numbers and complex chemical names often hide haram ingredients like pork gelatin (E441), crushed insects (E120), or animal-derived emulsifiers (E471). Understand the true source of these common food additives."}
            {params.category === 'fast-food' && " Dining out at fast-food chains requires vigilance. Even if you order a vegetarian or fish option, cross-contamination on shared grills or the use of non-halal animal fats in fryers can compromise your meal. Review our chain-specific guides."}
            {params.category === 'cosmetics' && " Halal isn't just about what you eat; it's also about what you apply to your skin. Many lipsticks, lotions, and shampoos contain haram animal byproducts like keratin, non-marine collagen, or intoxicating alcohols. Discover permissible beauty products."}
          </p>
          <p className="text-text-secondary leading-relaxed">
            This is a curated list of the most frequently asked about products and ingredients in this category. <strong className="text-text-primary">For access to our complete, live-updated database of over 2 million products</strong>, please use the <a href="https://apps.apple.com/us/app/allhalal-info-food-scanner/id6756242265" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline font-bold">allhalal.info mobile app scanner</a>.
          </p>
        </div>

        {featuredItems.length > 0 && (
          <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-4 mb-10">
            {featuredItems.map((item) => (
              <Link
                key={item.slug}
                href={`/${params.locale}/is-it-halal/${item.slug}`}
                className="rounded-[1.35rem] border border-border bg-white p-5 shadow-sm hover:border-primary transition-colors"
              >
                <span className="inline-flex px-2.5 py-1 rounded-full bg-primary/10 text-primary text-[10px] font-bold uppercase tracking-[0.18em] mb-3">
                  Popular query
                </span>
                <h2 className="text-lg font-bold font-display text-text-primary mb-2 leading-tight">
                  {item.name}
                </h2>
                <p className="text-sm text-text-secondary leading-relaxed">{item.shortReason}</p>
              </Link>
            ))}
          </div>
        )}

        <div className="flex flex-wrap gap-3 mb-10">
          <Link href={`/${params.locale}/is-it-halal`} className="px-4 py-2 bg-bg-card border border-border rounded-full text-sm font-medium text-text-primary hover:border-primary cursor-pointer transition-colors">
            All Items
          </Link>
          {['ingredient', 'additive', 'snack', 'drink', 'fast-food'].map(cat => (
              <Link key={cat} href={`/${params.locale}/is-it-halal/category/${cat}`} className={`px-4 py-2 rounded-full text-sm font-medium cursor-pointer transition-all ${params.category === cat ? 'bg-gradient-gold text-[#4A3319] shadow-[0_4px_10px_rgba(176,144,98,0.3)] font-bold border border-primary/30 ring-2 ring-primary/40 ring-offset-2 ring-offset-bg-primary' : 'bg-bg-card border border-border text-text-primary hover:border-primary'}`}>
              {cat === 'additive' ? 'Additives (E-Codes)' : cat.charAt(0).toUpperCase() + cat.slice(1).replace('-', ' ')}
            </Link>
          ))}
        </div>

        <div className="grid lg:grid-cols-2 gap-6 mb-16">
          {items.map(item => (
            <Link 
              key={item.slug} 
              href={`/${params.locale}/is-it-halal/${item.slug}`}
              className="block bg-bg-card border border-border p-6 rounded-2xl hover:border-primary transition-colors shadow-sm"
            >
              <div className="flex items-start justify-between gap-4 mb-3">
                <h2 className="text-xl font-bold font-display text-text-primary leading-tight">{item.name}</h2>
                <span className={`shrink-0 inline-block px-3 py-1 rounded-full text-xs font-bold ${
                  item.verdict === 'halal' ? 'bg-green-500/10 text-green-700 dark:text-green-400' :
                  item.verdict === 'haram' ? 'bg-red-500/10 text-red-700 dark:text-red-400' :
                  'bg-amber-500/10 text-amber-700 dark:text-amber-400'
                }`}>
                  {item.verdict.toUpperCase()}
                </span>
              </div>
              <p className="text-text-secondary text-sm">{item.shortReason}</p>
            </Link>
          ))}
        </div>

        <div className="rounded-[1.8rem] border border-border bg-white p-6 mb-12 shadow-sm">
          <h3 className="text-2xl font-bold font-display text-text-primary mb-4">
            Keep exploring this halal category
          </h3>
          <div className="flex flex-wrap gap-3">
            <Link href={`/${params.locale}/is-it-halal/category/ingredient`} className="px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-bold">
              Ingredients
            </Link>
            <Link href={`/${params.locale}/is-it-halal/category/additive`} className="px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-bold">
              Additives
            </Link>
            <Link href={`/${params.locale}/is-it-halal/category/snack`} className="px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-bold">
              Snacks
            </Link>
            <Link href={`/${params.locale}/is-it-halal/category/drink`} className="px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-bold">
              Drinks
            </Link>
            <Link href={`/${params.locale}/is-it-halal/category/fast-food`} className="px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-bold">
              Fast Food
            </Link>
          </div>
        </div>

        <AppPromoMini />
      </div>
    </div>
  );
}
