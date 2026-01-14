/**
 * SEO Metadata Utilities
 * Generate metadata for Next.js App Router pages
 */

import type { Metadata } from 'next';
import type { SEOMetadata } from '@/data/types';

const SITE_NAME = 'AllHalal';
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://allhalal.info';
const DEFAULT_LOCALE = 'en';

interface GenerateMetadataOptions {
  title: string;
  description: string;
  path: string;
  keywords?: string[];
  image?: string;
  type?: 'website' | 'article';
  publishedTime?: string;
  modifiedTime?: string;
  author?: string;
  noindex?: boolean;
  nofollow?: boolean;
  canonical?: string;
}

/**
 * Generate metadata for a page
 */
export function generateMetadata(options: GenerateMetadataOptions): Metadata {
  const {
    title,
    description,
    path,
    keywords,
    image,
    type = 'website',
    publishedTime,
    modifiedTime,
    author,
    noindex = false,
    nofollow = false,
    canonical
  } = options;

  const url = `${SITE_URL}${path}`;
  const canonicalUrl = canonical || url;
  const ogImage = image || `${SITE_URL}/og-image.png`;

  // Title templates
  const fullTitle = title.includes(SITE_NAME) ? title : `${title} | ${SITE_NAME}`;

  const metadata: Metadata = {
    title: fullTitle,
    description,
    keywords: keywords?.join(', '),
    
    // Canonical & alternates
    alternates: {
      canonical: canonicalUrl,
      // Future: Add hreflang for multi-language
      // languages: {
      //   'en': `${SITE_URL}/en${path}`,
      //   'ar': `${SITE_URL}/ar${path}`,
      // }
    },

    // Robots
    robots: {
      index: !noindex,
      follow: !nofollow,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1
    },

    // OpenGraph
    openGraph: {
      type,
      locale: DEFAULT_LOCALE,
      url,
      title: fullTitle,
      description,
      siteName: SITE_NAME,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: title
        }
      ],
      ...(type === 'article' && {
        publishedTime,
        modifiedTime,
        authors: author ? [author] : undefined
      })
    },

    // Twitter Card
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description,
      images: [ogImage],
      creator: '@allhalalinfo' // Update with actual Twitter handle
    },

    // Other
    authors: author ? [{ name: author }] : undefined,
    creator: SITE_NAME,
    publisher: SITE_NAME,
    formatDetection: {
      telephone: false,
      email: false,
      address: false
    }
  };

  return metadata;
}

/**
 * Generate metadata for blog post
 */
export function generateBlogMetadata(options: {
  title: string;
  description: string;
  slug: string;
  author: string;
  datePublished: string;
  dateUpdated?: string;
  category: string;
  tags: string[];
  coverImage?: string;
  noindex?: boolean;
}): Metadata {
  return generateMetadata({
    title: options.title,
    description: options.description,
    path: `/blog/${options.slug}`,
    keywords: [options.category, ...options.tags],
    image: options.coverImage,
    type: 'article',
    publishedTime: options.datePublished,
    modifiedTime: options.dateUpdated || options.datePublished,
    author: options.author,
    noindex: options.noindex
  });
}

/**
 * Generate metadata for guide
 */
export function generateGuideMetadata(options: {
  title: string;
  description: string;
  slug: string;
  author: string;
  datePublished: string;
  dateUpdated: string;
  category: string;
  tags: string[];
  coverImage?: string;
  version: string;
  noindex?: boolean;
}): Metadata {
  // Add version to title for evergreen guides
  const titleWithVersion = `${options.title} (v${options.version})`;
  
  return generateMetadata({
    title: titleWithVersion,
    description: options.description,
    path: `/guides/${options.slug}`,
    keywords: [options.category, ...options.tags, 'guide', 'complete guide'],
    image: options.coverImage,
    type: 'article',
    publishedTime: options.datePublished,
    modifiedTime: options.dateUpdated,
    author: options.author,
    noindex: options.noindex
  });
}

/**
 * Generate metadata for programmatic city page
 */
export function generateCityMetadata(city: {
  name: string;
  country: string;
  description?: string;
  halalRestaurantCount?: number;
  michelinHalalCount?: number;
}): Metadata {
  const { name, country, description, halalRestaurantCount, michelinHalalCount } = city;
  
  const title = `Best Halal Restaurants in ${name}`;
  const desc = description || 
    `Discover ${halalRestaurantCount || 'top'} halal-certified restaurants in ${name}, ${country}.${michelinHalalCount ? ` Includes ${michelinHalalCount} Michelin-starred options.` : ''} Complete guide with reviews, menus & locations.`;

  return generateMetadata({
    title,
    description: desc,
    path: `/restaurants/${name.toLowerCase().replace(/\s+/g, '-')}`,
    keywords: [`halal restaurants ${name}`, `halal food ${name}`, name, country, 'halal dining']
  });
}

/**
 * Generate metadata for programmatic country page
 */
export function generateCountryMetadata(country: {
  name: string;
  description?: string;
  muslimPercentage?: number;
}, section: 'travel' | 'finance' | 'certification'): Metadata {
  const { name, description, muslimPercentage } = country;
  
  const titles = {
    travel: `${name} Travel Guide for Muslims`,
    finance: `Islamic Finance & Banking in ${name}`,
    certification: `Halal Certification in ${name}`
  };

  const descriptions = {
    travel: description || `Complete Muslim travel guide to ${name}.${muslimPercentage ? ` Muslim population: ${muslimPercentage}%.` : ''} Halal restaurants, mosques, prayer times & more.`,
    finance: `Guide to Islamic banking and Sharia-compliant finance in ${name}. Find Islamic banks, Murabaha, Ijara, Takaful & more.`,
    certification: `Halal certification bodies and standards in ${name}. Learn about certification processes, recognized certifiers & requirements.`
  };

  const paths = {
    travel: `/travel/country/${name.toLowerCase().replace(/\s+/g, '-')}`,
    finance: `/finance/${name.toLowerCase().replace(/\s+/g, '-')}`,
    certification: `/certification/${name.toLowerCase().replace(/\s+/g, '-')}`
  };

  return generateMetadata({
    title: titles[section],
    description: descriptions[section],
    path: paths[section],
    keywords: [name, section, section === 'travel' ? 'muslim travel' : section === 'finance' ? 'islamic finance' : 'halal certification']
  });
}

/**
 * Generate metadata for Dubai area page
 */
export function generateDubaiAreaMetadata(area: {
  name: string;
  description: string;
  priceRange?: { min: number; max: number; currency: string; unit: string };
  propertyTypes?: string[];
}): Metadata {
  const { name, description, priceRange, propertyTypes } = area;
  
  const title = `${name}: Real Estate Guide & Properties for Sale`;
  const desc = `${description}${priceRange ? ` Price range: ${priceRange.currency} ${priceRange.min.toLocaleString()} - ${priceRange.max.toLocaleString()} ${priceRange.unit}.` : ''}${propertyTypes ? ` Property types: ${propertyTypes.join(', ')}.` : ''}`;

  return generateMetadata({
    title,
    description: desc,
    path: `/real-estate/dubai/${name.toLowerCase().replace(/\s+/g, '-')}`,
    keywords: [`${name} real estate`, `property ${name}`, 'dubai real estate', ...((propertyTypes || []).map(t => `${t} ${name}`))]
  });
}

/**
 * Generate metadata for developer page
 */
export function generateDeveloperMetadata(developer: {
  name: string;
  description: string;
  projectCount?: number;
  shariaCompliance: { certified: boolean };
}): Metadata {
  const { name, description, projectCount, shariaCompliance } = developer;
  
  const title = `${name}: Developer Profile & Projects`;
  const desc = `${description}${projectCount ? ` ${projectCount}+ projects.` : ''}${shariaCompliance.certified ? ' Offering Sharia-compliant payment plans.' : ''}`;

  return generateMetadata({
    title,
    description: desc,
    path: `/real-estate/developers/${name.toLowerCase().replace(/\s+/g, '-')}`,
    keywords: [name, 'dubai developer', 'real estate developer', shariaCompliance.certified ? 'sharia compliant' : '']
  });
}

/**
 * Generate metadata for ingredient page
 */
export function generateIngredientMetadata(ingredient: {
  name: string;
  status: 'halal' | 'haram' | 'doubtful' | 'depends';
  description: string;
  alternativeNames?: string[];
}): Metadata {
  const { name, status, description, alternativeNames } = ingredient;
  
  const statusText = {
    halal: 'Halal',
    haram: 'Haram',
    doubtful: 'Doubtful',
    depends: 'Depends on Source'
  };

  const title = `Is ${name} Halal? ${statusText[status]}`;
  const desc = `${description} Learn about ${name} halal status, sources, alternatives & scholarly opinions.`;

  return generateMetadata({
    title,
    description: desc,
    path: `/ingredients/${name.toLowerCase().replace(/\s+/g, '-')}`,
    keywords: [`is ${name} halal`, name, status, 'halal ingredients', ...(alternativeNames || [])]
  });
}

/**
 * Generate metadata for E-code page
 */
export function generateECodeMetadata(eCode: {
  code: string;
  name: string;
  status: 'halal' | 'haram' | 'doubtful' | 'depends';
  description: string;
}): Metadata {
  const { code, name, status, description } = eCode;
  
  const statusText = {
    halal: 'Halal',
    haram: 'Haram',
    doubtful: 'Doubtful',
    depends: 'Depends on Source'
  };

  const title = `${code} (${name}): ${statusText[status]}`;
  const desc = `${description} Complete guide to ${code} - ${name}: halal status, sources & usage.`;

  return generateMetadata({
    title,
    description: desc,
    path: `/e-codes/${code.toLowerCase()}-${name.toLowerCase().replace(/\s+/g, '-')}`,
    keywords: [code, `${code} halal`, name, 'e numbers', 'food additives']
  });
}

/**
 * Generate JSON-LD script tag content
 */
export function generateJSONLD(data: Record<string, any>): string {
  return JSON.stringify({
    '@context': 'https://schema.org',
    ...data
  });
}
