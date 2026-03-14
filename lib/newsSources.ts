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
    safe: false,
    fallbackGradient: 'from-amber-600 to-red-800',
  },
  {
    id: 'islam21c',
    name: 'Islam21c',
    rssUrl: 'https://www.islam21c.com/feed/',
    categories: ['Faith & Practice', 'Ummah & World'],
    priority: 3,
    safe: false,
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
  // {
  //   id: 'halalfocus',
  //   name: 'Halal Focus',
  //   rssUrl: 'https://halalfocus.net/feed/',
  //   categories: ['Halal Living', 'Islamic Finance'],
  //   priority: 3,
  //   safe: true,
  //   fallbackGradient: 'from-green-600 to-emerald-800',
  // }, // Temporarily disabled - SSL certificate issues
  {
    id: 'seekersguidance',
    name: 'SeekersGuidance',
    rssUrl: 'https://seekersguidance.org/feed/',
    categories: ['Faith & Practice', 'Family & Education'],
    priority: 1,
    safe: true,
    fallbackGradient: 'from-indigo-600 to-blue-900',
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
    id: 'islamicfinancenews',
    name: 'Islamic Finance News',
    rssUrl: 'https://www.islamicfinancenews.com/rss',
    categories: ['Islamic Finance'],
    priority: 1,
    safe: true,
    fallbackGradient: 'from-emerald-700 to-teal-900',
  },
  {
    id: 'gulfnews-islamic-economy',
    name: 'Gulf News Islamic Economy',
    rssUrl: 'https://gulfnews.com/business/markets/islamic-economy/rss',
    categories: ['Islamic Finance', 'Halal Living'],
    priority: 2,
    safe: true,
    fallbackGradient: 'from-amber-600 to-orange-800',
  },
  {
    id: 'mifc',
    name: 'MIFC',
    rssUrl: 'https://www.mifc.com/rss',
    categories: ['Islamic Finance'],
    priority: 3,
    safe: true,
    fallbackGradient: 'from-blue-700 to-cyan-900',
  },

  // --- Health, Wellness & Lifestyle ---
  // {
  //   id: 'hautehijab',
  //   name: 'Haute Hijab',
  //   rssUrl: 'https://blog.hautehijab.com/rss.xml',
  //   categories: ['Health & Wellness', 'Halal Living', 'Family & Education'],
  //   priority: 3,
  //   safe: true,
  //   fallbackGradient: 'from-fuchsia-400 to-purple-700',
  // }, // Temporarily disabled - RSS feed returns 402
  {
    id: 'muslimgirl',
    name: 'Muslim Girl',
    rssUrl: 'https://muslimgirl.com/feed/',
    categories: ['Health & Wellness', 'Family & Education', 'Halal Living'],
    priority: 2,
    safe: true,
    fallbackGradient: 'from-rose-400 to-pink-700',
  },

  // --- Humanitarian & Ummah ---
  {
    id: 'islamicrelief',
    name: 'Islamic Relief',
    rssUrl: 'https://islamic-relief.org/feed/',
    categories: ['Ummah & World', 'Faith & Practice'],
    priority: 3,
    safe: false,
    fallbackGradient: 'from-cyan-500 to-blue-700',
  },
  {
    id: 'aljazeera_me',
    name: 'Al Jazeera (ME)',
    rssUrl: 'https://www.aljazeera.com/xml/rss/all.xml',
    categories: ['Ummah & World'],
    priority: 4,
    safe: false,
    fallbackGradient: 'from-orange-500 to-yellow-600',
  },
  {
    id: 'middleeasteye',
    name: 'Middle East Eye',
    rssUrl: 'https://www.middleeasteye.net/rss',
    categories: ['Ummah & World'],
    priority: 3,
    safe: false,
    fallbackGradient: 'from-red-600 to-orange-800',
  },
  
  // --- Technology & Innovation ---
  {
    id: 'muslimtechcrunch',
    name: 'Muslim Pro Blog',
    rssUrl: 'https://blog.muslimpro.com/feed/',
    categories: ['Family & Education', 'Faith & Practice'],
    priority: 2,
    safe: true,
    fallbackGradient: 'from-blue-500 to-purple-700',
  },
  
  // --- Arts, Culture & History ---
  {
    id: 'lostislamichistory',
    name: 'Lost Islamic History',
    rssUrl: 'https://lostislamichistory.com/feed/',
    categories: ['Family & Education', 'Faith & Practice'],
    priority: 2,
    safe: true,
    fallbackGradient: 'from-amber-700 to-brown-900',
  },
  
  // --- Halal Travel & Lifestyle ---
  {
    id: 'halaltrip',
    name: 'HalalTrip',
    rssUrl: 'https://www.halaltrip.com/blog/feed/',
    categories: ['Halal Living', 'Family & Education'],
    priority: 2,
    safe: true,
    fallbackGradient: 'from-teal-500 to-cyan-700',
  },
  
  // --- Women & Family Focus ---
  {
    id: 'virtualmosque',
    name: 'Virtual Mosque',
    rssUrl: 'https://www.virtualmosque.com/feed/',
    categories: ['Family & Education', 'Faith & Practice'],
    priority: 2,
    safe: true,
    fallbackGradient: 'from-purple-500 to-indigo-700',
  },
  
  // --- Youth & Students ---
  {
    id: 'muslimyouthmusings',
    name: 'Muslim Youth Musings',
    rssUrl: 'https://muslimyouthmusings.com/feed/',
    categories: ['Family & Education', 'Faith & Practice'],
    priority: 3,
    safe: true,
    fallbackGradient: 'from-green-500 to-teal-700',
  }
];

// Helper to define quotas for the homepage
export const HOMEPAGE_QUOTAS: Record<NewsCategory, number> = {
  'Faith & Practice': 2,
  'Family & Education': 1,
  'Halal Living': 1,
  'Islamic Finance': 1,
  'Health & Wellness': 1,
  'Ummah & World': 0 // Usually reserved for dedicated news page unless specifically allowed
};
