/**
 * AllHalal.info - Data Types
 * 
 * TypeScript type definitions for all content and data entities
 */

// ============================================================================
// Base Types
// ============================================================================

export interface Author {
  id: string;
  slug: string;
  name: string;
  bio: string;
  avatar?: string;
  expertise: string[];
  socialLinks?: {
    twitter?: string;
    linkedin?: string;
    website?: string;
  };
}

export interface Category {
  id: string;
  slug: string;
  name: string;
  description: string;
  icon?: string;
  color?: string;
}

export interface Tag {
  slug: string;
  name: string;
  count?: number;
}

// ============================================================================
// Content Types
// ============================================================================

export interface BlogPost {
  slug: string;
  title: string;
  description: string;
  content: string; // MDX
  author: string; // Author ID
  category: string;
  tags: string[];
  coverImage?: string;
  datePublished: string; // ISO 8601
  dateUpdated?: string; // ISO 8601
  readTime?: number; // minutes
  featured?: boolean;
  trending?: boolean;
  editorsPick?: boolean;
  viewCount?: number;
  noindex?: boolean;
}

export interface Guide {
  slug: string;
  title: string;
  description: string;
  content: string; // MDX
  author: string;
  category: string;
  tags: string[];
  coverImage?: string;
  datePublished: string;
  dateUpdated: string; // Required for guides
  lastReviewed: string;
  version: string; // "2.1"
  featured?: boolean;
  editorsPick?: boolean;
  series?: {
    id: string;
    title: string;
    order: number;
    totalParts: number;
  };
  tableOfContents?: TableOfContentsItem[];
  sources?: Source[];
  methodology?: string;
  noindex?: boolean;
}

export interface TableOfContentsItem {
  id: string;
  title: string;
  level: number; // 1-6 (H1-H6)
  children?: TableOfContentsItem[];
}

export interface Source {
  title: string;
  url?: string;
  author?: string;
  publication?: string;
  date?: string;
}

export interface Destination {
  slug: string;
  name: string;
  country: string;
  countryCode: string; // ISO code
  description: string;
  content: string; // MDX
  type: 'country' | 'city' | 'region';
  muslimFriendlyScore?: number; // 1-10
  halalRestaurantCount?: number;
  mosqueCount?: number;
  highlights: string[];
  bestTimeToVisit?: string;
  coverImage?: string;
  gallery?: string[];
  datePublished: string;
  dateUpdated?: string;
  featured?: boolean;
}

// ============================================================================
// Ingredients & E-Codes
// ============================================================================

export type HalalStatus = 'halal' | 'haram' | 'doubtful' | 'depends';

export interface Ingredient {
  slug: string;
  name: string;
  alternativeNames?: string[];
  status: HalalStatus;
  description: string;
  content?: string; // MDX for detailed explanation
  category: string; // dairy, meat, additives, alcohol, gelatin
  relatedECodes?: string[];
  sources: string[];
  commonUses?: string[];
  datePublished: string;
  dateUpdated?: string;
  viewCount?: number;
}

export interface ECode {
  code: string; // "E120"
  name: string;
  slug: string; // "e120-carmine"
  status: HalalStatus;
  description: string;
  content?: string; // MDX
  category: string; // coloring, preservative, emulsifier
  commonSources: string[]; // animal, plant, synthetic
  foundIn: string[]; // Product types
  relatedIngredients?: string[];
  sources: string[];
  datePublished: string;
  dateUpdated?: string;
  viewCount?: number;
}

// ============================================================================
// Certification
// ============================================================================

export interface CertificationBody {
  slug: string;
  name: string;
  acronym?: string;
  country: string;
  countryCode: string;
  description: string;
  content?: string; // MDX
  website?: string;
  logo?: string;
  recognizedBy: string[]; // Countries/organizations
  standards: string[];
  contactEmail?: string;
  founded?: number; // year
  datePublished: string;
  dateUpdated?: string;
}

// ============================================================================
// Finance
// ============================================================================

export interface Bank {
  slug: string;
  name: string;
  country: string;
  countryCode: string;
  description: string;
  content?: string; // MDX
  website?: string;
  logo?: string;
  services: string[]; // murabaha, ijara, takaful, qard hassan
  shariaBoardMembers?: string[];
  assetsUnderManagement?: string;
  founded?: number;
  branches?: number;
  datePublished: string;
  dateUpdated?: string;
}

export interface FinanceProduct {
  slug: string;
  name: string; // "Murabaha", "Ijara", "Takaful"
  type: 'financing' | 'insurance' | 'investment';
  description: string;
  content: string; // MDX
  shariaCompliant: boolean;
  prohibitedElements?: string[]; // riba, gharar, maysir
  availableAt?: string[]; // Bank slugs
  datePublished: string;
  dateUpdated?: string;
}

// ============================================================================
// Real Estate (Dubai Focus)
// ============================================================================

export interface Developer {
  slug: string;
  name: string;
  description: string;
  content?: string; // MDX
  website?: string;
  logo?: string;
  founded?: number;
  headquarters?: string;
  activeAreas: string[]; // Dubai area slugs
  projectCount?: number;
  completedProjects?: number;
  paymentPlanTypes: string[]; // "installment", "developer-plan", "mortgage"
  shariaCompliance: {
    certified: boolean;
    certifiedBy?: string; // Certifier name
    methodology?: string;
    notes?: string;
  };
  projects: string[]; // Project slugs
  datePublished: string;
  dateUpdated?: string;
  featured?: boolean;
}

export interface DubaiArea {
  slug: string;
  name: string;
  description: string;
  content?: string; // MDX
  zone: string; // "Downtown", "Marina", "Business Bay"
  subZone?: string;
  developerCount?: number;
  projectCount?: number;
  priceRange?: {
    min: number;
    max: number;
    currency: string; // "AED"
    unit: string; // "per sq ft"
  };
  propertyTypes?: string[]; // apartment, villa, townhouse
  amenities: string[];
  nearbyMosques?: number;
  halalRestaurants?: number;
  schools?: number;
  hospitals?: number;
  metroStations?: string[];
  coverImage?: string;
  datePublished: string;
  dateUpdated?: string;
  featured?: boolean;
}

export interface RealEstateProject {
  slug: string;
  name: string;
  developer: string; // Developer slug
  area: string; // Area slug
  description: string;
  content?: string; // MDX
  status: 'planning' | 'under-construction' | 'completed' | 'ready-to-move';
  completionDate?: string; // ISO 8601 or "Q4 2027"
  totalUnits?: number;
  availableUnits?: number;
  propertyTypes: string[]; // studio, 1BR, 2BR, villa
  priceRange?: {
    min: number;
    max: number;
    currency: string;
  };
  paymentPlans: Array<{
    type: string; // "70/30", "60/40", "installment"
    description: string;
    downPayment?: string; // "10%"
    installmentPeriod?: string; // "5 years"
    bankPartner?: string;
  }>;
  shariaCompliant: boolean;
  shariaDetails?: string;
  amenities: string[];
  nearbyMosques?: number;
  coverImage?: string;
  gallery?: string[];
  website?: string;
  datePublished: string;
  dateUpdated?: string;
  featured?: boolean;
}

// ============================================================================
// Restaurants
// ============================================================================

export interface Restaurant {
  slug: string;
  name: string;
  city: string;
  citySlug: string;
  country: string;
  address?: string;
  description: string;
  content?: string; // MDX
  cuisineTypes: string[];
  priceRange: '$' | '$$' | '$$$' | '$$$$';
  certifications: Array<{
    type: 'halal-certified' | 'muslim-owned' | 'no-alcohol' | 'zabihah';
    certifiedBy?: string;
    verifiedDate?: string;
  }>;
  features: string[]; // prayer-room, family-friendly, outdoor-seating
  michelinStars?: number;
  michelinCategory?: 'three-star' | 'two-star' | 'one-star' | 'bib-gourmand';
  rating?: number; // 1-5
  reviewCount?: number;
  website?: string;
  phone?: string;
  hours?: string;
  coordinates?: {
    lat: number;
    lng: number;
  };
  coverImage?: string;
  gallery?: string[];
  datePublished: string;
  dateUpdated?: string;
}

// ============================================================================
// Geography (Seed Data)
// ============================================================================

export interface City {
  slug: string;
  name: string;
  country: string;
  countrySlug: string;
  countryCode: string; // ISO code
  description?: string;
  halalRestaurantCount?: number;
  michelinHalalCount?: number;
  population?: number;
  muslimPercentage?: number;
  coordinates?: {
    lat: number;
    lng: number;
  };
  timezone?: string;
  currency?: string;
}

export interface Country {
  slug: string;
  name: string;
  code: string; // ISO code (ISO 3166-1 alpha-2)
  muslimPercentage?: number;
  halalCertificationBodies?: string[];
  islamicBankCount?: number;
  description?: string;
  capital?: string;
  currency?: string;
  languages?: string[];
  population?: number;
}

// ============================================================================
// Search
// ============================================================================

export interface SearchResult {
  type: 'blog' | 'guide' | 'ingredient' | 'e-code' | 'restaurant' | 'destination' | 'developer' | 'area';
  slug: string;
  title: string;
  description: string;
  category?: string;
  url: string;
  snippet?: string;
  coverImage?: string;
  datePublished?: string;
}

export interface SearchIndex {
  items: SearchResult[];
  lastUpdated: string;
}

// ============================================================================
// Analytics Events
// ============================================================================

export type AnalyticsEvent =
  | { type: 'search_open' }
  | { type: 'search_query'; query: string; resultsCount: number }
  | { type: 'search_result_click'; resultType: string; resultSlug: string }
  | { type: 'click_related_content'; from: string; to: string }
  | { type: 'newsletter_signup'; location: string }
  | { type: 'ad_impression'; slotId: string; position: string }
  | { type: 'ad_click'; slotId: string; position: string }
  | { type: 'outbound_click'; url: string; from: string }
  | { type: 'helpful_feedback'; page: string; helpful: boolean }
  | { type: 'tool_interaction'; tool: string; action: string };

// ============================================================================
// Ad Configuration
// ============================================================================

export interface AdSlotConfig {
  id: string;
  position: 'in-article' | 'sidebar' | 'in-feed' | 'sticky-bottom' | 'footer';
  enabled: boolean;
  lazyLoad: boolean;
  minViewportWidth?: number; // px (e.g., sidebar only on desktop)
}

export interface AdFreeZone {
  path: string; // e.g., "/editorial-policy"
  pattern?: RegExp; // e.g., /^\/legal\/.*/
}

// ============================================================================
// FAQ
// ============================================================================

export interface FAQItem {
  question: string;
  answer: string; // Can include HTML/MDX
  category?: string;
}

// ============================================================================
// Comparison
// ============================================================================

export interface ComparisonItem {
  name: string;
  slug: string;
  features: Record<string, string | number | boolean>;
  pros?: string[];
  cons?: string[];
  rating?: number;
}

export interface ComparisonTable {
  title: string;
  description?: string;
  methodology?: string;
  items: ComparisonItem[];
  features: Array<{
    key: string;
    label: string;
    type: 'text' | 'number' | 'boolean' | 'rating';
  }>;
  dateUpdated: string;
}

// ============================================================================
// Metadata
// ============================================================================

export interface SEOMetadata {
  title: string;
  description: string;
  keywords?: string[];
  canonical?: string;
  noindex?: boolean;
  nofollow?: boolean;
  ogType?: 'website' | 'article';
  ogImage?: string;
  twitterCard?: 'summary' | 'summary_large_image';
  structuredData?: Record<string, any>; // JSON-LD
}

// ============================================================================
// Exports
// ============================================================================

export type ContentType =
  | 'blog'
  | 'guide'
  | 'destination'
  | 'ingredient'
  | 'e-code'
  | 'certification-body'
  | 'bank'
  | 'developer'
  | 'dubai-area'
  | 'real-estate-project'
  | 'restaurant';
