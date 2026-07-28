import { halalItems } from "@/data/halalItems";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Metadata } from "next";
import { remark } from "remark";
import remarkGfm from "remark-gfm";
import remarkHtml from "remark-html";
import { sanitizeArticleHtml } from "@/lib/sanitizeArticleHtml";
import { fetchCustomArticlesList } from "@/lib/customArticles";
import RelatedReading from "@/components/halal/RelatedReading";
import AppPromoMini from "@/components/ui/AppPromoMini";
import AppDeepLinkCTA from "@/components/ui/AppDeepLinkCTA";
import FAQSchema from "@/components/seo/FAQSchema";
import BreadcrumbsSchema from "@/components/seo/BreadcrumbsSchema";

export async function generateStaticParams() {
  return halalItems.map((item) => ({
    slug: item.slug,
  }));
}

/** First real sentence of the explanation, stripped of markdown, for FAQ answers. */
function firstProseParagraph(markdown: string): string {
  const block = markdown
    .split('\n\n')
    .map((part) => part.trim())
    .find((part) => part && !part.startsWith('#') && !part.startsWith('|') && !part.startsWith('-'));

  if (!block) return '';

  return block
    .replace(/\*\*(.+?)\*\*/g, '$1')
    .replace(/\*(.+?)\*/g, '$1')
    .replace(/\[(.+?)\]\(.+?\)/g, '$1')
    .replace(/\s+/g, ' ')
    .trim();
}

export async function generateMetadata(props: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const params = await props.params;
  const item = halalItems.find(i => i.slug === params.slug);
  if (!item) return { title: 'Not Found' };
  
  // Generate verdict text for title
  const verdictText = 
    item.verdict === 'halal' ? 'Yes ✓' : 
    item.verdict === 'haram' ? 'No ✗' : 
    'It Depends';
  
  const title = `Is ${item.name} Halal? ${verdictText} | AllHalal`;
  
  // Enhanced description with direct answer + CTA
  const answerPrefix = 
    item.verdict === 'halal' ? `Yes, ${item.name} is halal.` :
    item.verdict === 'haram' ? `No, ${item.name} is not halal.` :
    `${item.name} halal status depends on several factors.`;
  
  const description = `${answerPrefix} ${item.shortReason} Find detailed ingredient analysis now →`;
  const url = `https://allhalal.info/is-it-halal/${item.slug}`;
  
  return {
    title,
    description,
    keywords: [
      'halal',
      'halal food',
      'halal verification',
      'muslim food',
      'is halal',
      item.name.toLowerCase(),
      `${item.name.toLowerCase()} halal`,
      ...(item.aliases || []),
      item.category,
    ].join(', '),
    openGraph: {
      title,
      description,
      url,
      siteName: 'AllHalal',
      locale: 'en_US',
      type: 'article',
      images: [
        {
          url: 'https://allhalal.info/branding/og-image.png',
          width: 1200,
          height: 630,
          alt: `Is ${item.name} halal? ${verdictText}`,
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

  const [detailedHtml, articlesList] = await Promise.all([
    remark()
      .use(remarkGfm)
      .use(remarkHtml, { sanitize: false })
      .process(item.detailedReason)
      .then((file) => sanitizeArticleHtml(String(file))),
    fetchCustomArticlesList({ page: 1, limit: 100 }),
  ]);

  const similarItems = halalItems.filter(i => i.category === item.category && i.slug !== item.slug).slice(0, 3);

  // Enhanced FAQ with multiple relevant questions
  const faqs = [
    {
      question: `Is ${item.name} halal?`,
      answer: item.shortReason
    },
    {
      question: `What makes ${item.name} ${item.verdict}?`,
      answer: firstProseParagraph(item.detailedReason) || item.shortReason
    },
    {
      question: `Can Muslims eat ${item.name}?`,
      answer: item.verdict === 'halal' 
        ? `Yes, ${item.name} is considered halal and permissible for Muslims to consume. ${item.shortReason}`
        : item.verdict === 'haram'
        ? `No, ${item.name} is not permissible for Muslims. ${item.shortReason}`
        : `${item.name} status is uncertain or depends on specific circumstances. ${item.shortReason}`
    }
  ];

  // Breadcrumbs structure
  const breadcrumbs = [
    { name: "Home", url: "/" },
    { name: "Is It Halal?", url: "/is-it-halal" },
    { name: `Is ${item.name} Halal?`, url: `/is-it-halal/${item.slug}` }
  ];

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
      <FAQSchema faqs={faqs} />
      <BreadcrumbsSchema items={breadcrumbs} />
      <div className="max-w-3xl mx-auto">
        {/* Visual breadcrumbs matching schema */}
        <nav className="mb-8 text-sm text-text-muted" aria-label="Breadcrumb">
          <Link href="/" className="text-primary hover:underline">
            Home
          </Link>
          <span className="mx-2">/</span>
          <Link href="/is-it-halal" className="text-primary hover:underline">
            Is It Halal?
          </Link>
          <span className="mx-2">/</span>
          <span className="text-text-secondary">Is {item.name} Halal?</span>
        </nav>
        
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
            
            <div>
              <h2 className="text-xl font-semibold text-text-primary mb-3">Detailed Explanation</h2>
              <div
                className="halal-content"
                dangerouslySetInnerHTML={{ __html: detailedHtml }}
              />
            </div>
            
            <AppDeepLinkCTA itemName={item.name} />
          </div>
        </div>

        <RelatedReading item={item} articles={articlesList.articles} />

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