import { MetadataRoute } from 'next';
import { blogPosts } from '@/data/blogPosts';
import { halalItems } from '@/data/halalItems';
import { locales } from '@/i18n/config';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://allhalal.info';
  const now = new Date();
  const localizedStaticRoutes = [
    '',
    '/contact',
    '/support',
    '/legal',
    '/legal/privacy-policy',
    '/legal/terms-of-service',
    '/legal/disclaimer',
  ];
  const englishStaticRoutes = [
    '',
    '/news',
    '/finance',
    '/finance/banks',
    '/finance/investing',
    '/finance/mortgages',
    '/finance/zakat-calculator',
    '/is-it-halal',
    '/learn',
    '/learn/99-names',
    '/learn/duas',
    '/learn/live-makkah',
    '/learn/ramadan',
    '/methodology',
  ];
  const halalCategories = Array.from(new Set(halalItems.map((item) => item.category)));

  return [
    ...locales.flatMap((locale) =>
      localizedStaticRoutes.map((route) => ({
        url: `${baseUrl}/${locale}${route}`,
        lastModified: now,
        changeFrequency: route === '' ? 'daily' as const : 'monthly' as const,
        priority: route === '' ? 0.9 : 0.6,
      }))
    ),
    ...englishStaticRoutes.map((route) => ({
      url: `${baseUrl}/en${route}`,
      lastModified: now,
      changeFrequency:
        route === '' || route === '/news' || route === '/is-it-halal'
          ? 'daily' as const
          : 'weekly' as const,
      priority: route === '' ? 1 : route === '/is-it-halal' ? 0.9 : 0.8,
    })),
    ...blogPosts.map((post) => ({
      url: `${baseUrl}/en/news/${post.slug}`,
      lastModified: new Date(post.publishedAt),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    })),
    ...halalCategories.map((category) => ({
      url: `${baseUrl}/en/is-it-halal/category/${category}`,
      lastModified: now,
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    })),
    ...halalItems.map((item) => ({
      url: `${baseUrl}/en/is-it-halal/${item.slug}`,
      lastModified: now,
      changeFrequency: 'monthly' as const,
      priority: item.priority === 'high' ? 0.7 : 0.6,
    })),
  ];
}
