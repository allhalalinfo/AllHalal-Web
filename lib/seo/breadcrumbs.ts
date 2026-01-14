/**
 * Breadcrumb Utilities
 * Generate breadcrumb paths and structured data
 */

interface BreadcrumbItem {
  label: string;
  href: string;
}

/**
 * Generate breadcrumbs from path
 */
export function generateBreadcrumbs(path: string): BreadcrumbItem[] {
  // Remove leading/trailing slashes
  const cleanPath = path.replace(/^\/|\/$/g, '');
  
  // Split path into segments
  const segments = cleanPath.split('/').filter(Boolean);
  
  // Start with home
  const breadcrumbs: BreadcrumbItem[] = [
    { label: 'Home', href: '/' }
  ];

  // Build breadcrumbs from segments
  let currentPath = '';
  for (let i = 0; i < segments.length; i++) {
    const segment = segments[i];
    currentPath += `/${segment}`;
    
    // Format label: kebab-case → Title Case
    const label = formatSegmentLabel(segment, segments, i);
    
    breadcrumbs.push({
      label,
      href: currentPath
    });
  }

  return breadcrumbs;
}

/**
 * Format segment label for display
 */
function formatSegmentLabel(segment: string, allSegments: string[], index: number): string {
  // Special cases (known routes)
  const specialLabels: Record<string, string> = {
    'blog': 'Blog',
    'guides': 'Guides',
    'travel': 'Travel',
    'destinations': 'Destinations',
    'country': 'Countries',
    'cities': 'Cities',
    'restaurants': 'Restaurants',
    'ingredients': 'Ingredients',
    'e-codes': 'E-Codes',
    'certification': 'Certification',
    'bodies': 'Certification Bodies',
    'finance': 'Finance',
    'banks': 'Islamic Banks',
    'real-estate': 'Real Estate',
    'dubai': 'Dubai',
    'developers': 'Developers',
    'projects': 'Projects',
    'cosmetics': 'Cosmetics',
    'tools': 'Tools',
    'app': 'Mobile App',
    'about': 'About Us',
    'contact': 'Contact',
    'support': 'Support',
    'legal': 'Legal',
    'privacy-policy': 'Privacy Policy',
    'terms-of-service': 'Terms of Service',
    'disclaimer': 'Disclaimer',
    'editorial-policy': 'Editorial Policy',
    'disclosures': 'Disclosures',
    'authors': 'Authors',
    'newsletter': 'Newsletter',
    'search': 'Search',
    'michelin': 'Michelin',
    'category': 'Category'
  };

  if (specialLabels[segment]) {
    return specialLabels[segment];
  }

  // Check context-based labels
  if (index > 0) {
    const parentSegment = allSegments[index - 1];
    
    // Country pages under different sections
    if (parentSegment === 'country') {
      return formatLocationName(segment); // e.g., "united-arab-emirates" → "United Arab Emirates"
    }
    
    // City pages
    if (parentSegment === 'cities' || (parentSegment === 'restaurants' && !isKnownRoute(segment))) {
      return formatLocationName(segment);
    }
    
    // Dubai areas
    if (parentSegment === 'dubai' && index === allSegments.indexOf('dubai') + 1) {
      return formatLocationName(segment); // area name
    }
    
    // Developer/bank/body names
    if (['developers', 'banks', 'bodies', 'projects'].includes(parentSegment)) {
      return formatEntityName(segment);
    }
    
    // Ingredient/E-code slugs
    if (parentSegment === 'ingredients') {
      return formatIngredientName(segment);
    }
    
    if (parentSegment === 'e-codes') {
      return formatECodeName(segment);
    }
    
    // Article slugs (last segment in blog/guides)
    if ((parentSegment === 'blog' || parentSegment === 'guides') && index === allSegments.length - 1) {
      return formatArticleTitle(segment);
    }
  }

  // Default: Title Case from kebab-case
  return segment
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

/**
 * Check if segment is a known route (not dynamic)
 */
function isKnownRoute(segment: string): boolean {
  const knownRoutes = [
    'blog', 'guides', 'travel', 'destinations', 'country', 'cities',
    'restaurants', 'ingredients', 'e-codes', 'certification', 'bodies',
    'finance', 'banks', 'real-estate', 'dubai', 'developers', 'projects',
    'cosmetics', 'tools', 'app', 'about', 'contact', 'support', 'legal',
    'privacy-policy', 'terms-of-service', 'disclaimer', 'editorial-policy',
    'disclosures', 'authors', 'newsletter', 'search', 'michelin', 'category'
  ];
  return knownRoutes.includes(segment);
}

/**
 * Format location name (city/country)
 */
function formatLocationName(slug: string): string {
  // Special cases
  const specialNames: Record<string, string> = {
    'united-arab-emirates': 'United Arab Emirates',
    'united-kingdom': 'United Kingdom',
    'united-states': 'United States',
    'saudi-arabia': 'Saudi Arabia',
    'new-york': 'New York',
    'los-angeles': 'Los Angeles',
    'washington-dc': 'Washington, D.C.',
    'kuala-lumpur': 'Kuala Lumpur',
    'abu-dhabi': 'Abu Dhabi',
    'downtown-dubai': 'Downtown Dubai',
    'business-bay': 'Business Bay',
    'dubai-marina': 'Dubai Marina',
    'jumeirah-beach-residence': 'Jumeirah Beach Residence (JBR)',
    'palm-jumeirah': 'Palm Jumeirah',
    'dubai-hills-estate': 'Dubai Hills Estate',
    'arabian-ranches': 'Arabian Ranches',
    'jumeirah-village-circle': 'Jumeirah Village Circle (JVC)',
    'dubai-sports-city': 'Dubai Sports City',
    'dubai-south': 'Dubai South'
  };

  if (specialNames[slug]) {
    return specialNames[slug];
  }

  // Default: Title Case
  return slug
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

/**
 * Format entity name (developer/bank/certifier)
 */
function formatEntityName(slug: string): string {
  // Special cases for abbreviations
  const specialNames: Record<string, string> = {
    'jakim': 'JAKIM',
    'hmc': 'HMC',
    'hfa': 'HFA',
    'ifanca': 'IFANCA',
    'msg': 'MSG'
  };

  if (specialNames[slug]) {
    return specialNames[slug];
  }

  // Default: Title Case (preserve "Properties", "Development", etc.)
  return slug
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

/**
 * Format ingredient name
 */
function formatIngredientName(slug: string): string {
  // Special cases
  const specialNames: Record<string, string> = {
    'msg': 'MSG',
    'l-cysteine': 'L-Cysteine',
    'vitamin-d3': 'Vitamin D3',
    'vitamin-b12': 'Vitamin B12'
  };

  if (specialNames[slug]) {
    return specialNames[slug];
  }

  return slug
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

/**
 * Format E-code name
 */
function formatECodeName(slug: string): string {
  // E-code slugs are like "e120-carmine"
  const parts = slug.split('-');
  const code = parts[0].toUpperCase(); // "E120"
  const name = parts.slice(1).map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
  return `${code} - ${name}`;
}

/**
 * Format article title (simplified, real title should come from data)
 */
function formatArticleTitle(slug: string): string {
  // This is a fallback - ideally fetch actual title from content
  return slug
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

/**
 * Generate breadcrumb structured data (JSON-LD)
 */
export function generateBreadcrumbStructuredData(breadcrumbs: BreadcrumbItem[]): string {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://allhalal.info';
  
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: breadcrumbs.map((crumb, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: crumb.label,
      item: index === breadcrumbs.length - 1 
        ? undefined // Last item doesn't need URL
        : `${siteUrl}${crumb.href}`
    }))
  };

  return JSON.stringify(structuredData);
}

/**
 * Custom breadcrumbs for specific pages (override auto-generation)
 */
export function getCustomBreadcrumbs(path: string, customLabels?: Record<string, string>): BreadcrumbItem[] | null {
  // You can define custom breadcrumb structures for complex pages
  // For now, return null to use auto-generation
  
  // Example custom breadcrumbs:
  // if (path.startsWith('/real-estate/dubai/downtown-dubai/emaar-properties')) {
  //   return [
  //     { label: 'Home', href: '/' },
  //     { label: 'Real Estate', href: '/real-estate' },
  //     { label: 'Dubai', href: '/real-estate/dubai' },
  //     { label: 'Downtown Dubai', href: '/real-estate/dubai/downtown-dubai' },
  //     { label: 'Emaar Properties', href: '/real-estate/developers/emaar-properties' }
  //   ];
  // }
  
  return null;
}

/**
 * Get breadcrumb trail (with custom override support)
 */
export function getBreadcrumbs(path: string, customLabels?: Record<string, string>): BreadcrumbItem[] {
  // Check for custom breadcrumbs first
  const custom = getCustomBreadcrumbs(path, customLabels);
  if (custom) return custom;
  
  // Otherwise, auto-generate
  return generateBreadcrumbs(path);
}
