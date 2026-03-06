export type NewsCategory = 'Faith & Practice' | 'Family & Education' | 'Halal Living' | 'Islamic Finance' | 'Health & Wellness' | 'Ummah & World';

export interface NewsSource {
  id: string;
  name: string;
  rssUrl: string;
  categories: NewsCategory[];
  priority: number; // 1 (highest) to 5 (lowest)
  safe: boolean; // if true, safe for homepage. if false, only goes to /news or with toggle
  fallbackGradient?: string; // Tailwind gradient classes for fallback avatar
}

export const newsSources: NewsSource[] = [
  // --- Faith & Practice ---
  {
    id: 'yaqeen',
    name: 'Yaqeen Institute',
    rssUrl: 'https://yaqeeninstitute.org/rss.xml',
    categories: ['Faith & Practice', 'Family & Education'],
    priority: 1,
    safe: true,
    fallbackGradient: 'from-blue-600 to-indigo-900',
  },
  {
    id: 'aboutislam',
    name: 'About Islam',
    rssUrl: 'https://aboutislam.net/feed/',
    categories: ['Faith & Practice', 'Family & Education'],
    priority: 2,
    safe: true,
    fallbackGradient: 'from-emerald-500 to-teal-700',
  },
  {
    id: 'muslimmatters',
    name: 'MuslimMatters',
    rssUrl: 'https://muslimmatters.org/feed/',
    categories: ['Faith & Practice', 'Ummah & World'],
    priority: 2,
    safe: true,
    fallbackGradient: 'from-amber-600 to-red-800',
  },
  {
    id: 'islam21c',
    name: 'Islam21c',
    rssUrl: 'https://www.islam21c.com/feed/',
    categories: ['Faith & Practice', 'Ummah & World'],
    priority: 3,
    safe: true,
    fallbackGradient: 'from-sky-500 to-blue-800',
  },
  {
    id: 'islamicity',
    name: 'IslamiCity',
    rssUrl: 'https://www.islamicity.org/feed/',
    categories: ['Faith & Practice'],
    priority: 3,
    safe: true,
    fallbackGradient: 'from-green-500 to-emerald-800',
  },
  
  // --- Family, Education & Productivity ---
  {
    id: 'productivemuslim',
    name: 'Productive Muslim',
    rssUrl: 'https://productivemuslim.com/feed/',
    categories: ['Family & Education', 'Faith & Practice', 'Health & Wellness'],
    priority: 1,
    safe: true,
    fallbackGradient: 'from-orange-400 to-rose-600',
  },
  {
    id: 'muslimheritage',
    name: 'Muslim Heritage',
    rssUrl: 'https://muslimheritage.com/feed/',
    categories: ['Family & Education', 'Faith & Practice'],
    priority: 3,
    safe: true,
    fallbackGradient: 'from-amber-500 to-orange-800',
  },

  // --- Halal Living, Food & Lifestyle ---
  {
    id: 'halalzilia',
    name: 'HalalZilla',
    rssUrl: 'https://www.halalzilla.com/feed/',
    categories: ['Halal Living', 'Health & Wellness'],
    priority: 2,
    safe: true,
    fallbackGradient: 'from-pink-500 to-rose-800',
  },
  {
    id: 'halalfocus',
    name: 'Halal Focus',
    rssUrl: 'https://halalfocus.net/feed/',
    categories: ['Halal Living', 'Islamic Finance'],
    priority: 3,
    safe: true,
    fallbackGradient: 'from-green-600 to-emerald-800',
  },
  {
    id: 'salaamgateway',
    name: 'Salaam Gateway',
    rssUrl: 'https://salaamgateway.com/rss', // Needs standard RSS proxy if this fails
    categories: ['Halal Living', 'Islamic Finance'],
    priority: 2,
    safe: true,
    fallbackGradient: 'from-teal-500 to-emerald-900',
  },

  // --- Islamic Finance ---
  {
    id: 'islamicfinanceguru',
    name: 'IFG',
    rssUrl: 'https://www.islamicfinanceguru.com/rss.xml',
    categories: ['Islamic Finance'],
    priority: 1,
    safe: true,
    fallbackGradient: 'from-slate-700 to-black',
  },
  {
    id: 'mifc',
    name: 'MIFC', // Malaysia International Islamic Financial Centre
    rssUrl: 'https://www.mifc.com/rss', // Standard news feeds
    categories: ['Islamic Finance'],
    priority: 3,
    safe: true,
    fallbackGradient: 'from-blue-700 to-cyan-900',
  },

  // --- Health, Wellness & Lifestyle ---
  {
    id: 'hautehijab',
    name: 'Haute Hijab',
    rssUrl: 'https://blog.hautehijab.com/rss.xml',
    categories: ['Health & Wellness', 'Halal Living', 'Family & Education'],
    priority: 3,
    safe: true,
    fallbackGradient: 'from-fuchsia-400 to-purple-700',
  },

  // --- Humanitarian & Ummah ---
  {
    id: 'islamicrelief',
    name: 'Islamic Relief',
    rssUrl: 'https://islamic-relief.org/feed/',
    categories: ['Ummah & World', 'Faith & Practice'],
    priority: 3,
    safe: true,
    fallbackGradient: 'from-cyan-500 to-blue-700',
  },
  {
    id: 'aljazeera_me',
    name: 'Al Jazeera (ME)',
    rssUrl: 'https://www.aljazeera.com/xml/rss/all.xml',
    categories: ['Ummah & World'],
    priority: 4,
    safe: false, // NOT for homepage by default
    fallbackGradient: 'from-orange-500 to-yellow-600',
  }
];

// Helper to define quotas for the homepage
export const HOMEPAGE_QUOTAS: Record<NewsCategory, number> = {
  'Faith & Practice': 3,
  'Family & Education': 1,
  'Halal Living': 1,
  'Islamic Finance': 1,
  'Health & Wellness': 1,
  'Ummah & World': 0 // Usually reserved for dedicated news page unless specifically allowed
};
