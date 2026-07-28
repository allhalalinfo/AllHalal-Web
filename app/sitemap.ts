import { MetadataRoute } from 'next';
import { halalItems } from '@/data/halalItems';

// Site configuration
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://allhalal.info';
const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://api.allhalal.info';

/**
 * Wire/RSS briefs are aggregated from third-party feeds that occasionally carry
 * spam (gambling, adult, pharma) from compromised sources. Those slugs must never
 * reach the sitemap.
 */
const SPAM_SLUG_PATTERNS = [
  /casino|kasino|spelautomat|insattningsbonus|freispiele|bonusar|slot(s)?-/i,
  /\bbet(ting)?\b|wett|gambl|poker|roulette|blackjack|jackpot/i,
  /viagra|cialis|pharmacy|escort|porn|xxx/i,
  /crypto-?(signal|pump)|forex-?bonus/i,
];

function isSpamSlug(slug: string): boolean {
  return SPAM_SLUG_PATTERNS.some((pattern) => pattern.test(slug));
}

// 🔧 OPTIMIZATION: Sitemap with 6-hour CDN cache
// Articles publish ~1-2 times per week, 6-hour refresh is optimal
// Reduces Fast Origin Transfer by 95%+ vs revalidate=0
// For instant updates: use on-demand revalidation in admin panel
export const revalidate = 21600; // 6 hours

interface CustomArticle {
  id: string;
  slug?: string;
  published_at: string;
  updated_at?: string;
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  console.log('[SITEMAP] Starting generation...');
  console.log('[SITEMAP] SITE_URL:', SITE_URL);
  console.log('[SITEMAP] API_URL:', API_URL);
  
  const now = new Date();
  
  // Static pages
  const staticRoutes = [
    '',
    '/app',
    '/contact',
    '/support',
    '/legal',
    '/legal/privacy-policy',
    '/legal/terms-of-service',
    '/legal/disclaimer',
    '/news',
    '/finance',
    '/finance/banks',
    '/finance/investing',
    '/finance/mortgages',
    '/finance/zakat-calculator',
    '/guides',
    '/guides/zakat-on-stocks',
    '/guides/nisab-value-today',
    '/guides/how-to-calculate-zakat-on-crypto',
    '/guides/zakat-on-business-assets',
    '/guides/zakat-on-pension-and-retirement-funds',
    '/is-it-halal',
    '/is-it-halal/halal-certification-standards',
    '/is-it-halal/regional-halal-differences',
    '/is-it-halal/e-numbers-complete-guide',
    '/is-it-halal/reading-ingredient-labels',
    '/is-it-halal/alcohol-in-food',
    '/is-it-halal/animal-derived-ingredients',
    '/learn',
    '/learn/99-names',
    '/learn/duas',
    '/learn/live-makkah',
    '/learn/ramadan',
    '/travel',
    '/prayer-times',
    '/methodology',
  ];
  // NOTE: /boycott-checker is intentionally omitted — it is a client-side tool with
  // ~145 words of server-rendered copy. Add it back once it has real indexable content.

  const staticPages: MetadataRoute.Sitemap = staticRoutes.map((route) => ({
    url: `${SITE_URL}${route}`,
    lastModified: now,
    changeFrequency:
      route === '' || route === '/news' || route === '/is-it-halal'
        ? ('daily' as const)
        : route.startsWith('/guides') || route.startsWith('/finance')
        ? ('weekly' as const)
        : ('monthly' as const),
    priority: route === '' ? 1 : route === '/is-it-halal' ? 0.9 : route === '/news' ? 0.85 : 0.8,
  }));
  
  console.log('[SITEMAP] Static pages count:', staticPages.length);

  // ===== HALAL CHECK PAGES (/is-it-halal/[slug]) =====
  // Statically generated from data/halalItems.ts — the site's highest-intent
  // pages ("is X halal"). They have no crawlable entry point without this.
  const halalCheckPages: MetadataRoute.Sitemap = halalItems.map((item) => ({
    url: `${SITE_URL}/is-it-halal/${item.slug}`,
    lastModified: now,
    changeFrequency: 'monthly' as const,
    priority: item.priority === 'high' ? 0.9 : 0.85,
  }));

  console.log('[SITEMAP] Halal check pages count:', halalCheckPages.length);

  let customArticlePages: MetadataRoute.Sitemap = [];

  // NOTE: wire/RSS briefs are intentionally excluded — there is no detail route
  // for them (`/read/[slug]` resolves custom articles only), so every brief URL
  // previously emitted here returned 404 and poisoned the sitemap in GSC.

  // ===== FETCH CUSTOM ARTICLES =====
  try {
    const articlesUrl = `${API_URL}/api/v1/custom/articles?limit=100`;
    console.log('[SITEMAP] Fetching custom articles from:', articlesUrl);
    
    const articlesStartTime = Date.now();
    const articlesResponse = await fetch(articlesUrl, {
      next: { revalidate: 3600 },
      signal: AbortSignal.timeout(30000), // 30 second timeout
      headers: {
        'Accept': 'application/json',
      },
    });
    
    const articlesDuration = Date.now() - articlesStartTime;
    console.log('[SITEMAP] Custom articles response status:', articlesResponse.status);
    console.log('[SITEMAP] Custom articles fetch duration:', articlesDuration, 'ms');
    
    if (articlesResponse.ok) {
      const data = await articlesResponse.json();
      console.log('[SITEMAP] Custom articles data keys:', Object.keys(data));
      console.log('[SITEMAP] Custom articles items count:', data.items?.length || 0);
      console.log('[SITEMAP] Custom articles total:', data.total || 'N/A');
      
      const articles: CustomArticle[] = data.items || data.articles || [];
      
      if (articles.length > 0) {
        console.log('[SITEMAP] First custom article id:', articles[0].id);
        console.log('[SITEMAP] First custom article slug:', articles[0].slug || 'N/A');
      }

      const total = typeof data.total === 'number' ? data.total : articles.length;
      if (total > articles.length) {
        console.warn(
          `[SITEMAP] Custom articles truncated: ${articles.length} of ${total} — raise the page loop`,
        );
      }

      customArticlePages = articles
        .map((article) => article.slug || article.id)
        .filter((slug): slug is string => Boolean(slug) && !isSpamSlug(slug))
        .map((slug) => {
          const article = articles.find((a) => (a.slug || a.id) === slug)!;
          return {
            url: `${SITE_URL}/read/${encodeURIComponent(slug)}`,
            lastModified: new Date(article.updated_at || article.published_at || now),
            changeFrequency: 'weekly' as const,
            priority: 0.8,
          };
        });
      
      console.log('[SITEMAP] Custom article pages created:', customArticlePages.length);
    } else {
      const errorText = await articlesResponse.text();
      console.error('[SITEMAP] Custom articles fetch failed with status:', articlesResponse.status);
      console.error('[SITEMAP] Error response:', errorText.substring(0, 200));
    }
  } catch (error) {
    console.error('[SITEMAP] Failed to fetch custom articles:', error);
    if (error instanceof Error) {
      console.error('[SITEMAP] Error name:', error.name);
      console.error('[SITEMAP] Error message:', error.message);
    }
  }

  // Deduplicate — a custom article slug can collide with a static route
  const seen = new Set<string>();
  const totalPages = [...staticPages, ...halalCheckPages, ...customArticlePages].filter(
    (entry) => {
      const url = String(entry.url);
      if (seen.has(url)) {
        return false;
      }
      seen.add(url);
      return true;
    },
  );

  console.log('[SITEMAP] ===== GENERATION COMPLETE =====');
  console.log('[SITEMAP] Total pages:', totalPages.length);
  console.log('[SITEMAP] Breakdown:');
  console.log('[SITEMAP]   - Static:', staticPages.length);
  console.log('[SITEMAP]   - Halal checks:', halalCheckPages.length);
  console.log('[SITEMAP]   - Custom articles:', customArticlePages.length);
  console.log('[SITEMAP] ================================');
  
  return totalPages;
}
