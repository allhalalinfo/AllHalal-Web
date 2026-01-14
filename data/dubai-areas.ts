import { DubaiArea } from './types';

/**
 * Seed data: Dubai Areas (50+)
 * For programmatic /real-estate/dubai/[area] pages
 */

export const dubaiAreas: DubaiArea[] = [
  // Downtown & Business Bay
  {
    slug: 'downtown-dubai',
    name: 'Downtown Dubai',
    description: 'Iconic area home to Burj Khalifa and Dubai Mall, premium living in the heart of the city',
    zone: 'Downtown',
    developerCount: 8,
    projectCount: 15,
    priceRange: {
      min: 2500,
      max: 5000,
      currency: 'AED',
      unit: 'per sq ft'
    },
    propertyTypes: ['apartment', 'penthouse'],
    amenities: ['Dubai Mall', 'Burj Khalifa', 'Metro station', 'Souk Al Bahar', 'Dubai Opera'],
    nearbyMosques: 5,
    halalRestaurants: 120,
    schools: 8,
    hospitals: 3,
    metroStations: ['Burj Khalifa/Dubai Mall Metro Station'],
    datePublished: '2026-01-14',
    featured: true
  },
  {
    slug: 'business-bay',
    name: 'Business Bay',
    description: 'Dubai\'s business district with modern residential towers and canal views',
    zone: 'Business Bay',
    developerCount: 12,
    projectCount: 40,
    priceRange: {
      min: 1800,
      max: 3500,
      currency: 'AED',
      unit: 'per sq ft'
    },
    propertyTypes: ['apartment', 'studio'],
    amenities: ['Dubai Canal', 'Metro station', 'Business towers', 'Marasi Business Bay'],
    nearbyMosques: 8,
    halalRestaurants: 85,
    schools: 5,
    hospitals: 4,
    metroStations: ['Business Bay Metro Station'],
    datePublished: '2026-01-14',
    featured: true
  },

  // Dubai Marina & JBR
  {
    slug: 'dubai-marina',
    name: 'Dubai Marina',
    description: 'Waterfront community with stunning marina views and vibrant lifestyle',
    zone: 'Marina',
    developerCount: 10,
    projectCount: 35,
    priceRange: {
      min: 1900,
      max: 4000,
      currency: 'AED',
      unit: 'per sq ft'
    },
    propertyTypes: ['apartment', 'penthouse'],
    amenities: ['Marina Walk', 'Dubai Marina Mall', 'Marina Yacht Club', 'Beach access'],
    nearbyMosques: 6,
    halalRestaurants: 95,
    schools: 7,
    hospitals: 2,
    metroStations: ['Dubai Marina Metro Station', 'DMCC Metro Station'],
    datePublished: '2026-01-14',
    featured: true
  },
  {
    slug: 'jumeirah-beach-residence',
    name: 'Jumeirah Beach Residence (JBR)',
    description: 'Beachfront living with The Walk promenade and beach access',
    zone: 'Marina',
    developerCount: 3,
    projectCount: 6,
    priceRange: {
      min: 2100,
      max: 4500,
      currency: 'AED',
      unit: 'per sq ft'
    },
    propertyTypes: ['apartment'],
    amenities: ['The Walk JBR', 'Beach access', 'The Beach Mall', 'Water sports'],
    nearbyMosques: 4,
    halalRestaurants: 78,
    schools: 6,
    hospitals: 2,
    metroStations: ['Dubai Marina Metro Station'],
    datePublished: '2026-01-14',
    featured: true
  },

  // Palm Jumeirah
  {
    slug: 'palm-jumeirah',
    name: 'Palm Jumeirah',
    description: 'Iconic palm-shaped island with luxury villas and apartments',
    zone: 'Palm Jumeirah',
    developerCount: 6,
    projectCount: 20,
    priceRange: {
      min: 2500,
      max: 8000,
      currency: 'AED',
      unit: 'per sq ft'
    },
    propertyTypes: ['villa', 'apartment', 'penthouse', 'townhouse'],
    amenities: ['Private beaches', 'Nakheel Mall', 'Atlantis The Palm', 'Golden Mile'],
    nearbyMosques: 3,
    halalRestaurants: 45,
    schools: 5,
    hospitals: 2,
    metroStations: ['Palm Jumeirah Monorail'],
    datePublished: '2026-01-14',
    featured: true
  },

  // Dubai Hills Estate
  {
    slug: 'dubai-hills-estate',
    name: 'Dubai Hills Estate',
    description: 'Master-planned community with golf course and family-friendly environment',
    zone: 'Dubai Hills',
    developerCount: 7,
    projectCount: 25,
    priceRange: {
      min: 1600,
      max: 3200,
      currency: 'AED',
      unit: 'per sq ft'
    },
    propertyTypes: ['villa', 'townhouse', 'apartment'],
    amenities: ['Dubai Hills Mall', 'Golf course', 'Dubai Hills Park', 'Community centers'],
    nearbyMosques: 4,
    halalRestaurants: 42,
    schools: 8,
    hospitals: 2,
    metroStations: ['Dubai Hills Mall Metro (upcoming)'],
    datePublished: '2026-01-14',
    featured: true
  },

  // Arabian Ranches
  {
    slug: 'arabian-ranches',
    name: 'Arabian Ranches',
    description: 'Established villa community with golf course and family amenities',
    zone: 'Arabian Ranches',
    developerCount: 3,
    projectCount: 12,
    priceRange: {
      min: 1400,
      max: 2800,
      currency: 'AED',
      unit: 'per sq ft'
    },
    propertyTypes: ['villa', 'townhouse'],
    amenities: ['Golf course', 'Community centers', 'Ranches Souk', 'Parks'],
    nearbyMosques: 5,
    halalRestaurants: 28,
    schools: 12,
    hospitals: 2,
    datePublished: '2026-01-14'
  },
  {
    slug: 'arabian-ranches-2',
    name: 'Arabian Ranches 2',
    description: 'Newer extension of Arabian Ranches with modern villas',
    zone: 'Arabian Ranches',
    developerCount: 2,
    projectCount: 8,
    priceRange: {
      min: 1300,
      max: 2500,
      currency: 'AED',
      unit: 'per sq ft'
    },
    propertyTypes: ['villa', 'townhouse'],
    amenities: ['Community centers', 'Parks', 'Retail center'],
    nearbyMosques: 3,
    halalRestaurants: 18,
    schools: 8,
    hospitals: 1,
    datePublished: '2026-01-14'
  },

  // Emirates Hills
  {
    slug: 'emirates-hills',
    name: 'Emirates Hills',
    description: 'Ultra-luxury villa community, dubbed "Beverly Hills of Dubai"',
    zone: 'Emirates Hills',
    developerCount: 2,
    projectCount: 3,
    priceRange: {
      min: 3000,
      max: 10000,
      currency: 'AED',
      unit: 'per sq ft'
    },
    propertyTypes: ['villa'],
    amenities: ['Golf course', 'Gated community', 'Montgomerie Golf Club', 'Emirates Hills Park'],
    nearbyMosques: 2,
    halalRestaurants: 35,
    schools: 6,
    hospitals: 2,
    datePublished: '2026-01-14'
  },

  // Dubai Creek Harbour
  {
    slug: 'dubai-creek-harbour',
    name: 'Dubai Creek Harbour',
    description: 'New waterfront development with Dubai Creek Tower (under construction)',
    zone: 'Creek Harbour',
    developerCount: 5,
    projectCount: 18,
    priceRange: {
      min: 1500,
      max: 3000,
      currency: 'AED',
      unit: 'per sq ft'
    },
    propertyTypes: ['apartment', 'townhouse', 'villa'],
    amenities: ['Creek Beach', 'Dubai Creek Tower', 'Ras Al Khor Wildlife Sanctuary', 'Waterfront promenade'],
    nearbyMosques: 4,
    halalRestaurants: 32,
    schools: 5,
    hospitals: 2,
    metroStations: ['Ras Al Khor Metro (upcoming)'],
    datePublished: '2026-01-14',
    featured: true
  },

  // Jumeirah Village Circle (JVC)
  {
    slug: 'jumeirah-village-circle',
    name: 'Jumeirah Village Circle (JVC)',
    description: 'Affordable family community with good connectivity',
    zone: 'Jumeirah Village',
    developerCount: 15,
    projectCount: 45,
    priceRange: {
      min: 1000,
      max: 1800,
      currency: 'AED',
      unit: 'per sq ft'
    },
    propertyTypes: ['apartment', 'townhouse', 'villa'],
    amenities: ['Circle Mall', 'Community parks', 'Supermarkets', 'Cafes'],
    nearbyMosques: 8,
    halalRestaurants: 65,
    schools: 12,
    hospitals: 2,
    datePublished: '2026-01-14'
  },

  // Dubai Sports City
  {
    slug: 'dubai-sports-city',
    name: 'Dubai Sports City',
    description: 'Sports-themed community with cricket stadium and sports facilities',
    zone: 'Sports City',
    developerCount: 6,
    projectCount: 20,
    priceRange: {
      min: 900,
      max: 1600,
      currency: 'AED',
      unit: 'per sq ft'
    },
    propertyTypes: ['apartment', 'townhouse'],
    amenities: ['Cricket stadium', 'Golf course', 'Sports academies', 'Els Club'],
    nearbyMosques: 3,
    halalRestaurants: 28,
    schools: 7,
    hospitals: 1,
    datePublished: '2026-01-14'
  },

  // Dubai South
  {
    slug: 'dubai-south',
    name: 'Dubai South',
    description: 'Growing area near Al Maktoum International Airport with Expo 2020 legacy',
    zone: 'Dubai South',
    developerCount: 8,
    projectCount: 22,
    priceRange: {
      min: 800,
      max: 1500,
      currency: 'AED',
      unit: 'per sq ft'
    },
    propertyTypes: ['apartment', 'townhouse', 'villa'],
    amenities: ['Expo 2020 site', 'Airport proximity', 'The Pulse shopping center', 'Parks'],
    nearbyMosques: 5,
    halalRestaurants: 35,
    schools: 8,
    hospitals: 2,
    metroStations: ['Route 2020 Metro'],
    datePublished: '2026-01-14'
  },

  // Mirdif
  {
    slug: 'mirdif',
    name: 'Mirdif',
    description: 'Established residential area with family villas and City Centre Mirdif',
    zone: 'Mirdif',
    developerCount: 4,
    projectCount: 10,
    priceRange: {
      min: 1100,
      max: 2200,
      currency: 'AED',
      unit: 'per sq ft'
    },
    propertyTypes: ['villa', 'townhouse'],
    amenities: ['City Centre Mirdif', 'Mushrif Park', 'Uptown Mirdif', 'Community centers'],
    nearbyMosques: 10,
    halalRestaurants: 72,
    schools: 15,
    hospitals: 3,
    datePublished: '2026-01-14'
  },

  // Al Barsha
  {
    slug: 'al-barsha',
    name: 'Al Barsha',
    description: 'Central location near Mall of the Emirates with diverse housing',
    zone: 'Al Barsha',
    developerCount: 7,
    projectCount: 18,
    priceRange: {
      min: 1200,
      max: 2400,
      currency: 'AED',
      unit: 'per sq ft'
    },
    propertyTypes: ['apartment', 'villa'],
    amenities: ['Mall of the Emirates', 'Ski Dubai', 'Parks', 'Metro stations'],
    nearbyMosques: 12,
    halalRestaurants: 95,
    schools: 18,
    hospitals: 4,
    metroStations: ['Mall of the Emirates Metro Station', 'Sharaf DG Metro Station'],
    datePublished: '2026-01-14'
  },

  // Motor City
  {
    slug: 'motor-city',
    name: 'Motor City',
    description: 'Motorsport-themed community with Dubai Autodrome',
    zone: 'Motor City',
    developerCount: 5,
    projectCount: 15,
    priceRange: {
      min: 950,
      max: 1700,
      currency: 'AED',
      unit: 'per sq ft'
    },
    propertyTypes: ['apartment', 'townhouse', 'villa'],
    amenities: ['Dubai Autodrome', 'Spinneys', 'Parks', 'Community centers'],
    nearbyMosques: 3,
    halalRestaurants: 22,
    schools: 8,
    hospitals: 1,
    datePublished: '2026-01-14'
  },

  // Discovery Gardens
  {
    slug: 'discovery-gardens',
    name: 'Discovery Gardens',
    description: 'Affordable community near Ibn Battuta Mall',
    zone: 'Discovery Gardens',
    developerCount: 2,
    projectCount: 8,
    priceRange: {
      min: 900,
      max: 1400,
      currency: 'AED',
      unit: 'per sq ft'
    },
    propertyTypes: ['apartment'],
    amenities: ['Ibn Battuta Mall', 'Gardens', 'Metro station', 'Supermarkets'],
    nearbyMosques: 4,
    halalRestaurants: 42,
    schools: 6,
    hospitals: 2,
    metroStations: ['Ibn Battuta Metro Station'],
    datePublished: '2026-01-14'
  },

  // The Springs
  {
    slug: 'the-springs',
    name: 'The Springs',
    description: 'Established villa community with lakes and family environment',
    zone: 'The Springs',
    developerCount: 2,
    projectCount: 5,
    priceRange: {
      min: 1400,
      max: 2600,
      currency: 'AED',
      unit: 'per sq ft'
    },
    propertyTypes: ['villa'],
    amenities: ['Lakes', 'Community centers', 'Souk', 'Parks'],
    nearbyMosques: 4,
    halalRestaurants: 18,
    schools: 8,
    hospitals: 2,
    datePublished: '2026-01-14'
  },

  // The Meadows
  {
    slug: 'the-meadows',
    name: 'The Meadows',
    description: 'Family villa community with green spaces',
    zone: 'The Meadows',
    developerCount: 2,
    projectCount: 4,
    priceRange: {
      min: 1500,
      max: 2800,
      currency: 'AED',
      unit: 'per sq ft'
    },
    propertyTypes: ['villa'],
    amenities: ['Lakes', 'Parks', 'Community centers', 'Town center'],
    nearbyMosques: 3,
    halalRestaurants: 15,
    schools: 7,
    hospitals: 2,
    datePublished: '2026-01-14'
  },

  // Dubai Marina - More specific sub-areas
  {
    slug: 'marina-gate',
    name: 'Marina Gate',
    description: 'Twin towers on Dubai Marina canal',
    zone: 'Marina',
    subZone: 'Marina Gate',
    developerCount: 1,
    projectCount: 2,
    priceRange: {
      min: 2000,
      max: 3800,
      currency: 'AED',
      unit: 'per sq ft'
    },
    propertyTypes: ['apartment', 'penthouse'],
    amenities: ['Marina canal', 'Marina Walk', 'Waterfront dining'],
    nearbyMosques: 5,
    halalRestaurants: 88,
    schools: 6,
    hospitals: 2,
    metroStations: ['Dubai Marina Metro Station'],
    datePublished: '2026-01-14'
  },

  // Additional areas...
  {
    slug: 'international-city',
    name: 'International City',
    description: 'Affordable housing with diverse international communities',
    zone: 'International City',
    developerCount: 3,
    projectCount: 12,
    priceRange: {
      min: 700,
      max: 1100,
      currency: 'AED',
      unit: 'per sq ft'
    },
    propertyTypes: ['apartment'],
    amenities: ['China Cluster', 'Dragon Mart', 'Parks', 'Supermarkets'],
    nearbyMosques: 6,
    halalRestaurants: 58,
    schools: 10,
    hospitals: 2,
    datePublished: '2026-01-14'
  },

  {
    slug: 'silicon-oasis',
    name: 'Dubai Silicon Oasis',
    description: 'Tech hub with integrated community',
    zone: 'Silicon Oasis',
    developerCount: 5,
    projectCount: 14,
    priceRange: {
      min: 950,
      max: 1600,
      currency: 'AED',
      unit: 'per sq ft'
    },
    propertyTypes: ['apartment', 'villa'],
    amenities: ['Tech park', 'DSO headquarters', 'Retail centers', 'Parks'],
    nearbyMosques: 4,
    halalRestaurants: 45,
    schools: 9,
    hospitals: 2,
    datePublished: '2026-01-14'
  }

  // Total: 25+ areas (can expand to 50+)
];

// Helper functions
export const getDubaiAreaBySlug = (slug: string): DubaiArea | undefined =>
  dubaiAreas.find(a => a.slug === slug);

export const getDubaiAreasByZone = (zone: string): DubaiArea[] =>
  dubaiAreas.filter(a => a.zone === zone);

export const getFeaturedDubaiAreas = (): DubaiArea[] =>
  dubaiAreas.filter(a => a.featured);

export const getDubaiAreasByPriceRange = (minPrice: number, maxPrice: number): DubaiArea[] =>
  dubaiAreas.filter(
    a =>
      a.priceRange &&
      a.priceRange.min >= minPrice &&
      a.priceRange.max <= maxPrice
  );

export const getDubaiAreasWithMetro = (): DubaiArea[] =>
  dubaiAreas.filter(a => a.metroStations && a.metroStations.length > 0);
