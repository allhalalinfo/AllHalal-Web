import { MetadataRoute } from 'next';
import { blogPosts } from '@/data/blogPosts';
import { halalItems } from '@/data/halalItems';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://allhalal.info';
  const now = new Date();
  
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
  ];
}
