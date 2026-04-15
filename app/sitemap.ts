import { MetadataRoute } from 'next';
import { blogPosts } from '@/data/blogPosts';
import { halalItems } from '@/data/halalItems';
import { fetchCustomArticlesList } from '@/lib/customArticles';

// 🔧 OPTIMIZATION: Sitemap with 6-hour CDN cache
// Articles publish ~1-2 times per week, 6-hour refresh is optimal
// Reduces Fast Origin Transfer by 95%+ vs revalidate=0
// For instant updates: use on-demand revalidation in admin panel
export const revalidate = 21600; // 6 hours

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://allhalal.info';
  const now = new Date();
  
  // Fetch custom articles - backend API max limit is 100
  // SEO FIX: Request limit=100 to get all 96 published articles
  let customArticles: any[] = [];
  const apiStartTime = Date.now();
  console.log('[Sitemap] Fetching custom articles from API...');
  
  try {
    const customArticlesResponse = await Promise.race([
      fetchCustomArticlesList({ page: 1, limit: 100 }),
      new Promise<{ articles: [] }>((_, reject) => 
        setTimeout(() => reject(new Error('API timeout after 10s')), 10000)
      )
    ]);
    const apiDuration = Date.now() - apiStartTime;
    console.log(`[Sitemap] API responded in ${apiDuration}ms with ${customArticlesResponse.articles.length} articles`);
    customArticles = customArticlesResponse.articles;
  } catch (error) {
    const apiDuration = Date.now() - apiStartTime;
    console.error(`[Sitemap] API failed after ${apiDuration}ms:`, error instanceof Error ? error.message : error);
    customArticles = [];
  }
  
  console.log(`[Sitemap] Final customArticles count: ${customArticles.length}`);
  
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
    '/learn/islamic-calendar',
    '/travel',
    '/prayer-times',
    '/methodology',
  ];
  
  const halalCategories = Array.from(new Set(halalItems.map((item) => item.category)));

  return [
    ...staticRoutes.map((route) => ({
      url: `${baseUrl}${route}`,
      lastModified: now,
      changeFrequency:
        route === '' || route === '/news' || route === '/is-it-halal'
          ? 'daily' as const
          : route.startsWith('/guides') || route.startsWith('/finance')
          ? 'weekly' as const
          : 'monthly' as const,
      priority: route === '' ? 1 : route === '/is-it-halal' ? 0.9 : route === '/news' ? 0.85 : 0.8,
    })),
    ...blogPosts.map((post) => ({
      url: `${baseUrl}/news/${post.slug}`,
      lastModified: new Date(post.publishedAt),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    })),
    ...halalCategories.map((category) => ({
      url: `${baseUrl}/is-it-halal/category/${category}`,
      lastModified: now,
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    })),
    ...halalItems.map((item) => ({
      url: `${baseUrl}/is-it-halal/${item.slug}`,
      lastModified: now,
      changeFrequency: 'monthly' as const,
      priority: item.priority === 'high' ? 0.7 : 0.6,
    })),
    // Custom articles from database
    ...customArticles.map((article) => ({
      url: `${baseUrl}/read/${encodeURIComponent(article.id)}`,
      lastModified: article.updated_at ? new Date(article.updated_at) : new Date(article.published_at),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    })),
  ];
}
