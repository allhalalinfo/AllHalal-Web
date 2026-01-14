/**
 * Search Index Builder
 * Builds search index from all data sources
 */

import { cities, countries, ingredients, eCodes, dubaiAreas, developers } from '@/data';
import type { SearchResult, SearchIndex } from './types';

/**
 * Build complete search index
 */
export function buildSearchIndex(): SearchIndex {
  const items: SearchResult[] = [];
  
  // Index cities (for restaurant pages)
  cities.forEach(city => {
    items.push({
      type: 'city',
      slug: city.slug,
      title: `Halal Restaurants in ${city.name}`,
      description: city.description || `Find halal restaurants in ${city.name}, ${city.country}`,
      category: 'Restaurants & Travel',
      url: `/restaurants/${city.slug}`,
      metadata: {
        country: city.country,
        muslimPercentage: city.muslimPercentage
      }
    });
  });
  
  // Index countries (for travel pages)
  countries.forEach(country => {
    items.push({
      type: 'country',
      slug: country.slug,
      title: `${country.name} Travel Guide`,
      description: country.description || `Muslim-friendly travel guide to ${country.name}`,
      category: 'Travel',
      url: `/travel/country/${country.slug}`
    });
  });
  
  // Index ingredients
  ingredients.forEach(ingredient => {
    const statusEmoji = {
      halal: '✅',
      haram: '🚫',
      doubtful: '⚠️',
      depends: '❓'
    };
    
    items.push({
      type: 'ingredient',
      slug: ingredient.slug,
      title: `Is ${ingredient.name} Halal?`,
      description: ingredient.description,
      category: 'Ingredients',
      url: `/ingredients/${ingredient.slug}`,
      snippet: `${statusEmoji[ingredient.status]} ${ingredient.status.toUpperCase()}`,
      metadata: {
        status: ingredient.status
      }
    });
  });
  
  // Index E-codes
  eCodes.forEach(eCode => {
    const statusEmoji = {
      halal: '✅',
      haram: '🚫',
      doubtful: '⚠️',
      depends: '❓'
    };
    
    items.push({
      type: 'e-code',
      slug: eCode.slug,
      title: `${eCode.code} - ${eCode.name}`,
      description: eCode.description,
      category: 'E-Codes',
      url: `/e-codes/${eCode.slug}`,
      snippet: `${statusEmoji[eCode.status]} ${eCode.status.toUpperCase()}`,
      metadata: {
        status: eCode.status
      }
    });
  });
  
  // Index Dubai areas
  dubaiAreas.forEach(area => {
    const priceRange = area.priceRange
      ? `${area.priceRange.currency} ${area.priceRange.min.toLocaleString()}-${area.priceRange.max.toLocaleString()}`
      : undefined;
    
    items.push({
      type: 'area',
      slug: area.slug,
      title: `${area.name} Real Estate`,
      description: area.description,
      category: 'Real Estate',
      url: `/real-estate/dubai/${area.slug}`,
      metadata: {
        priceRange
      }
    });
  });
  
  // Index developers
  developers.forEach(developer => {
    items.push({
      type: 'developer',
      slug: developer.slug,
      title: developer.name,
      description: developer.description,
      category: 'Real Estate',
      url: `/real-estate/developers/${developer.slug}`,
      snippet: developer.shariaCompliance.certified ? '✓ Sharia-Compliant' : undefined
    });
  });
  
  // Index static pages
  const staticPages: SearchResult[] = [
    {
      type: 'page',
      slug: 'editorial-policy',
      title: 'Editorial Policy',
      description: 'Our editorial standards, review process, and commitment to accuracy',
      category: 'About',
      url: '/editorial-policy'
    },
    {
      type: 'page',
      slug: 'disclosures',
      title: 'Advertising Disclosures',
      description: 'Transparency about our advertising and affiliate relationships',
      category: 'About',
      url: '/disclosures'
    },
    {
      type: 'page',
      slug: 'certification',
      title: 'Halal Certification Guide',
      description: 'Learn about halal certification bodies and standards worldwide',
      category: 'Certification',
      url: '/certification'
    },
    {
      type: 'page',
      slug: 'finance',
      title: 'Islamic Finance',
      description: 'Guide to Islamic banking, Murabaha, Ijara, and Sharia-compliant finance',
      category: 'Finance',
      url: '/finance'
    }
  ];
  
  items.push(...staticPages);
  
  return {
    items,
    lastUpdated: new Date().toISOString()
  };
}

/**
 * Get search index (singleton pattern)
 */
let cachedIndex: SearchIndex | null = null;

export function getSearchIndex(): SearchIndex {
  if (!cachedIndex) {
    cachedIndex = buildSearchIndex();
  }
  return cachedIndex;
}

/**
 * Get search statistics
 */
export function getSearchStats() {
  const index = getSearchIndex();
  
  const stats = {
    total: index.items.length,
    byType: {} as Record<string, number>,
    byCategory: {} as Record<string, number>
  };
  
  index.items.forEach(item => {
    // Count by type
    stats.byType[item.type] = (stats.byType[item.type] || 0) + 1;
    
    // Count by category
    if (item.category) {
      stats.byCategory[item.category] = (stats.byCategory[item.category] || 0) + 1;
    }
  });
  
  return stats;
}
