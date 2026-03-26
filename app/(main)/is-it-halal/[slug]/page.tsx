import { halalItems } from "@/data/halalItems";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Metadata } from "next";
import AppPromoMini from "@/components/ui/AppPromoMini";
import AppDeepLinkCTA from "@/components/ui/AppDeepLinkCTA";
import FAQSchema from "@/components/seo/FAQSchema";

export async function generateStaticParams() {
  return halalItems.map((item) => ({
    slug: item.slug,
  }));
}

export async function generateMetadata(props: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const params = await props.params;
  const item = halalItems.find(i => i.slug === params.slug);
  if (!item) return { title: 'Not Found' };
  
  const title = `Is ${item.name} halal? | allhalal.info`;
  const description = item.shortReason;
  const url = `https://allhalal.info/is-it-halal/${item.slug}`;
  
  return {
    title,
    description,
    keywords: [
      'halal',
      'halal food',
      'halal verification',
      'muslim food',
      item.name.toLowerCase(),
      ...(item.aliases || []),
      item.category,
    ].join(', '),
    openGraph: {
      title,
      description,
      url,
      siteName: 'allhalal.info',
      locale: 'en_US',
      type: 'article',
      images: [
        {
          url: 'https://allhalal.info/branding/og-image.png',
          width: 1200,
          height: 630,
          alt: `Is ${item.name} halal?`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: ['https://allhalal.info/branding/og-image.png'],
    },
    alternates: {
      canonical: url,
    },
  };
}

export default async function HalalItemDetail(props: { params: Promise<{ slug: string }> }) {
  const params = await props.params;
  const item = halalItems.find(i => i.slug === params.slug);
  
  if (!item) notFound();

  const similarItems = halalItems.filter(i => i.category === item.category && i.slug !== item.slug).slice(0, 3);

  return (
    <div className="container py-32 min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Article',
            headline: `Is ${item.name} halal?`,
            description: item.shortReason,
            author: {
              '@type': 'Organization',
              name: 'allhalal.info',
            },
            publisher: {
              '@type': 'Organization',
              name: 'allhalal.info',
              logo: {
                '@type': 'ImageObject',
                url: 'https://allhalal.info/branding/logo.png',
              },
            },
            mainEntityOfPage: {
              '@type': 'WebPage',
              '@id': `https://allhalal.info/is-it-halal/${item.slug}`,
            },
            articleSection: item.category,
            keywords: [item.name, ...(item.aliases || [])].join(', '),
          }),
        }}
      />
      <FAQSchema faqs={[{ question: `Is ${item.name} halal?`, answer: item.shortReason }]} />
      <div className="max-w-3xl mx-auto">
        <Link href={`/is-it-halal`} className="text-primary hover:underline mb-8 inline-block">
          &larr; Back to all items
        </Link>
        
        <div className="bg-bg-card border border-border rounded-3xl p-8 md:p-12 mb-12 shadow-sm">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8 border-b border-border pb-8">
            <h1 className="text-4xl md:text-5xl font-bold font-display text-text-primary">
              Is {item.name} Halal?
            </h1>
            <span className={`inline-block px-6 py-3 rounded-full text-lg font-bold text-center ${
              item.verdict === 'halal' ? 'bg-green-500/10 text-green-700 dark:text-green-400' :
              item.verdict === 'haram' ? 'bg-red-500/10 text-red-700 dark:text-red-400' :
              'bg-amber-500/10 text-amber-700 dark:text-amber-400'
            }`}>
              {item.verdict.toUpperCase()}
            </span>
          </div>
          
          <div className="space-y-8">
            <div>
              <h2 className="text-xl font-semibold text-text-primary mb-3">Quick Answer</h2>
              <p className="text-lg text-text-secondary">{item.shortReason}</p>
            </div>
            
            <div className="prose prose-lg dark:prose-invert max-w-none text-text-secondary">
              <h2 className="text-xl font-semibold text-text-primary mb-3">Detailed Explanation</h2>
              {/* Splitting by double newline to handle basic markdown-like paragraphs generated earlier */}
              {item.detailedReason.split('\n\n').map((paragraph, idx) => {
                if (paragraph.startsWith('### ')) {
                  return <h3 key={idx} className="text-lg font-bold font-display text-text-primary mt-6 mb-2">{paragraph.replace('### ', '')}</h3>;
                }
                return <p key={idx} className="text-lg leading-relaxed">{paragraph}</p>;
              })}
            </div>
            
            <AppDeepLinkCTA itemName={item.name} />
          </div>
        </div>

        {similarItems.length > 0 && (
          <div className="mb-16">
            <h3 className="text-2xl font-bold font-display text-text-primary mb-6">Similar Items</h3>
            <div className="grid md:grid-cols-3 gap-4">
              {similarItems.map(sim => (
                <Link key={sim.slug} href={`/is-it-halal/${sim.slug}`} className="bg-bg-card border border-border p-4 rounded-xl hover:border-primary transition-colors">
                  <div className="font-bold font-display text-text-primary mb-2">{sim.name}</div>
                  <div className="text-sm text-text-secondary line-clamp-2">{sim.shortReason}</div>
                </Link>
              ))}
            </div>
          </div>
        )}

        <AppPromoMini />
      </div>
    </div>
  );
}