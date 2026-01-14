/**
 * Structured Data (JSON-LD) Generators
 * https://schema.org/
 */

import type { BlogPost, Guide, FAQItem, Source } from '@/data/types';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://allhalal.info';
const SITE_NAME = 'AllHalal';
const LOGO_URL = `${SITE_URL}/logo.png`;

// ============================================================================
// Organization & WebSite (Homepage)
// ============================================================================

export function generateOrganizationLD() {
  return {
    '@type': 'Organization',
    name: SITE_NAME,
    url: SITE_URL,
    logo: {
      '@type': 'ImageObject',
      url: LOGO_URL
    },
    sameAs: [
      'https://twitter.com/allhalalinfo', // Update with actual social links
      'https://facebook.com/allhalalinfo',
      'https://instagram.com/allhalalinfo'
    ],
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'Customer Service',
      email: 'hello@allhalal.info', // Update with actual email
      availableLanguage: ['English', 'Arabic']
    }
  };
}

export function generateWebSiteLD() {
  return {
    '@type': 'WebSite',
    name: SITE_NAME,
    url: SITE_URL,
    description: 'Discover halal restaurants, ingredients database, Islamic finance guides, and Muslim lifestyle content worldwide.',
    publisher: generateOrganizationLD(),
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${SITE_URL}/search?q={search_term_string}`
      },
      'query-input': 'required name=search_term_string'
    }
  };
}

// ============================================================================
// Article / BlogPosting
// ============================================================================

export function generateArticleLD(article: {
  title: string;
  description: string;
  slug: string;
  author: string;
  datePublished: string;
  dateModified?: string;
  coverImage?: string;
  category: string;
  tags: string[];
  type?: 'blog' | 'guide';
}): Record<string, any> {
  const {
    title,
    description,
    slug,
    author,
    datePublished,
    dateModified,
    coverImage,
    category,
    tags,
    type = 'blog'
  } = article;

  const url = `${SITE_URL}/${type}/${slug}`;
  const imageUrl = coverImage || `${SITE_URL}/og-image.png`;

  return {
    '@type': type === 'guide' ? 'Article' : 'BlogPosting',
    headline: title,
    description,
    url,
    image: {
      '@type': 'ImageObject',
      url: imageUrl,
      width: 1200,
      height: 630
    },
    author: {
      '@type': 'Person',
      name: author
    },
    publisher: generateOrganizationLD(),
    datePublished,
    dateModified: dateModified || datePublished,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': url
    },
    keywords: tags.join(', '),
    articleSection: category,
    inLanguage: 'en'
  };
}

export function generateGuideLD(guide: {
  title: string;
  description: string;
  slug: string;
  author: string;
  datePublished: string;
  dateUpdated: string;
  lastReviewed: string;
  version: string;
  coverImage?: string;
  category: string;
  tags: string[];
}): Record<string, any> {
  const baseArticle = generateArticleLD({
    ...guide,
    dateModified: guide.dateUpdated,
    type: 'guide'
  });

  // Add extra properties for guides
  return {
    ...baseArticle,
    '@type': 'Article',
    isAccessibleForFree: true,
    educationalUse: 'reference',
    teaches: guide.category,
    version: guide.version,
    lastReviewed: guide.lastReviewed
  };
}

// ============================================================================
// BreadcrumbList
// ============================================================================

interface BreadcrumbItem {
  name: string;
  url: string;
}

export function generateBreadcrumbLD(items: BreadcrumbItem[]): Record<string, any> {
  return {
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: `${SITE_URL}${item.url}`
    }))
  };
}

// ============================================================================
// FAQPage
// ============================================================================

export function generateFAQPageLD(faqs: FAQItem[]): Record<string, any> {
  return {
    '@type': 'FAQPage',
    mainEntity: faqs.map(faq => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer
      }
    }))
  };
}

// ============================================================================
// ItemList (for list pages: restaurants, ingredients, etc.)
// ============================================================================

interface ListItem {
  name: string;
  url: string;
  description?: string;
  image?: string;
  position?: number;
}

export function generateItemListLD(options: {
  name: string;
  description?: string;
  items: ListItem[];
}): Record<string, any> {
  const { name, description, items } = options;

  return {
    '@type': 'ItemList',
    name,
    description,
    numberOfItems: items.length,
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: item.position || index + 1,
      url: `${SITE_URL}${item.url}`,
      name: item.name,
      ...(item.description && { description: item.description }),
      ...(item.image && {
        image: {
          '@type': 'ImageObject',
          url: item.image
        }
      })
    }))
  };
}

// ============================================================================
// LocalBusiness / Restaurant (for restaurant pages)
// ============================================================================

export function generateRestaurantLD(restaurant: {
  name: string;
  description: string;
  address?: string;
  city: string;
  country: string;
  cuisineTypes: string[];
  priceRange: string;
  phone?: string;
  website?: string;
  image?: string;
  coordinates?: { lat: number; lng: number };
  rating?: number;
  reviewCount?: number;
  certifications: Array<{ type: string; certifiedBy?: string }>;
}): Record<string, any> {
  const {
    name,
    description,
    address,
    city,
    country,
    cuisineTypes,
    priceRange,
    phone,
    website,
    image,
    coordinates,
    rating,
    reviewCount,
    certifications
  } = restaurant;

  const ld: Record<string, any> = {
    '@type': 'Restaurant',
    name,
    description,
    servesCuisine: cuisineTypes,
    priceRange,
    image: image || `${SITE_URL}/og-image.png`,
    address: {
      '@type': 'PostalAddress',
      addressLocality: city,
      addressCountry: country,
      ...(address && { streetAddress: address })
    },
    ...(phone && { telephone: phone }),
    ...(website && { url: website }),
    ...(coordinates && {
      geo: {
        '@type': 'GeoCoordinates',
        latitude: coordinates.lat,
        longitude: coordinates.lng
      }
    }),
    ...(rating && reviewCount && {
      aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: rating,
        reviewCount
      }
    })
  };

  // Add halal certification info to description
  const halalCert = certifications.find(c => c.type === 'halal-certified');
  if (halalCert) {
    ld.additionalProperty = {
      '@type': 'PropertyValue',
      name: 'Halal Certification',
      value: halalCert.certifiedBy || 'Certified'
    };
  }

  return ld;
}

// ============================================================================
// Collection Page (for hub pages)
// ============================================================================

export function generateCollectionPageLD(options: {
  name: string;
  description: string;
  url: string;
  numberOfItems: number;
}): Record<string, any> {
  const { name, description, url, numberOfItems } = options;

  return {
    '@type': 'CollectionPage',
    name,
    description,
    url: `${SITE_URL}${url}`,
    mainEntity: {
      '@type': 'ItemList',
      numberOfItems
    }
  };
}

// ============================================================================
// HowTo (for tutorial/guide pages)
// ============================================================================

interface HowToStep {
  name: string;
  text: string;
  url?: string;
  image?: string;
}

export function generateHowToLD(options: {
  name: string;
  description: string;
  steps: HowToStep[];
  totalTime?: string; // ISO 8601 duration (e.g., "PT30M" = 30 minutes)
  image?: string;
}): Record<string, any> {
  const { name, description, steps, totalTime, image } = options;

  return {
    '@type': 'HowTo',
    name,
    description,
    ...(image && { image }),
    ...(totalTime && { totalTime }),
    step: steps.map((step, index) => ({
      '@type': 'HowToStep',
      position: index + 1,
      name: step.name,
      text: step.text,
      ...(step.url && { url: step.url }),
      ...(step.image && { image: step.image })
    }))
  };
}

// ============================================================================
// RealEstateAgent / Developer
// ============================================================================

export function generateRealEstateAgentLD(developer: {
  name: string;
  description: string;
  website?: string;
  logo?: string;
  founded?: number;
  projectCount?: number;
}): Record<string, any> {
  const { name, description, website, logo, founded, projectCount } = developer;

  return {
    '@type': 'RealEstateAgent',
    name,
    description,
    ...(website && { url: website }),
    ...(logo && { logo }),
    ...(founded && { foundingDate: founded.toString() }),
    ...(projectCount && {
      numberOfItems: projectCount,
      itemListElement: {
        '@type': 'ItemList',
        numberOfItems: projectCount
      }
    })
  };
}

// ============================================================================
// FinancialService / Bank
// ============================================================================

export function generateFinancialServiceLD(bank: {
  name: string;
  description: string;
  country: string;
  website?: string;
  services: string[];
}): Record<string, any> {
  const { name, description, country, website, services } = bank;

  return {
    '@type': 'FinancialService',
    name,
    description,
    areaServed: country,
    ...(website && { url: website }),
    serviceType: services,
    additionalProperty: {
      '@type': 'PropertyValue',
      name: 'Banking Type',
      value: 'Islamic Banking'
    }
  };
}

// ============================================================================
// Review (for comparison articles)
// ============================================================================

export function generateReviewLD(options: {
  itemReviewed: {
    name: string;
    type: string; // Restaurant, Product, Place, etc.
    url?: string;
  };
  author: string;
  reviewRating: {
    ratingValue: number;
    bestRating?: number;
  };
  reviewBody: string;
  datePublished: string;
}): Record<string, any> {
  const { itemReviewed, author, reviewRating, reviewBody, datePublished } = options;

  return {
    '@type': 'Review',
    author: {
      '@type': 'Person',
      name: author
    },
    datePublished,
    reviewBody,
    reviewRating: {
      '@type': 'Rating',
      ratingValue: reviewRating.ratingValue,
      bestRating: reviewRating.bestRating || 5
    },
    itemReviewed: {
      '@type': itemReviewed.type,
      name: itemReviewed.name,
      ...(itemReviewed.url && { url: itemReviewed.url })
    }
  };
}

// ============================================================================
// Helper: Combine multiple LD+JSON
// ============================================================================

export function combineStructuredData(...ldObjects: Record<string, any>[]): string {
  const combined = {
    '@context': 'https://schema.org',
    '@graph': ldObjects
  };
  return JSON.stringify(combined, null, 2);
}

// ============================================================================
// Helper: Create script tag
// ============================================================================

export function createStructuredDataScript(ldObject: Record<string, any>): string {
  const jsonLD = {
    '@context': 'https://schema.org',
    ...ldObject
  };
  return JSON.stringify(jsonLD, null, 2);
}
