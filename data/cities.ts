import { City } from './types';

/**
 * Seed data: Cities (30+)
 * For programmatic /restaurants/[city] pages
 */

export const cities: City[] = [
  // Middle East - UAE
  {
    slug: 'dubai',
    name: 'Dubai',
    country: 'United Arab Emirates',
    countrySlug: 'united-arab-emirates',
    countryCode: 'AE',
    description: 'Luxury Muslim-friendly destination with world-class halal dining',
    halalRestaurantCount: 2500,
    michelinHalalCount: 8,
    population: 3500000,
    muslimPercentage: 76,
    coordinates: { lat: 25.2048, lng: 55.2708 },
    timezone: 'Asia/Dubai',
    currency: 'AED'
  },
  {
    slug: 'abu-dhabi',
    name: 'Abu Dhabi',
    country: 'United Arab Emirates',
    countrySlug: 'united-arab-emirates',
    countryCode: 'AE',
    halalRestaurantCount: 1200,
    michelinHalalCount: 5,
    population: 1500000,
    muslimPercentage: 76,
    coordinates: { lat: 24.4539, lng: 54.3773 },
    timezone: 'Asia/Dubai',
    currency: 'AED'
  },

  // Saudi Arabia
  {
    slug: 'riyadh',
    name: 'Riyadh',
    country: 'Saudi Arabia',
    countrySlug: 'saudi-arabia',
    countryCode: 'SA',
    description: 'Capital city with 100% halal food',
    halalRestaurantCount: 3000,
    michelinHalalCount: 0,
    population: 7600000,
    muslimPercentage: 93,
    coordinates: { lat: 24.7136, lng: 46.6753 },
    timezone: 'Asia/Riyadh',
    currency: 'SAR'
  },
  {
    slug: 'jeddah',
    name: 'Jeddah',
    country: 'Saudi Arabia',
    countrySlug: 'saudi-arabia',
    countryCode: 'SA',
    description: 'Gateway to Mecca with diverse halal cuisine',
    halalRestaurantCount: 2200,
    population: 4700000,
    muslimPercentage: 93,
    coordinates: { lat: 21.5433, lng: 39.1728 },
    timezone: 'Asia/Riyadh',
    currency: 'SAR'
  },

  // Turkey
  {
    slug: 'istanbul',
    name: 'Istanbul',
    country: 'Turkey',
    countrySlug: 'turkey',
    countryCode: 'TR',
    description: 'Historic city bridging Europe and Asia with rich halal food culture',
    halalRestaurantCount: 5000,
    michelinHalalCount: 12,
    population: 15500000,
    muslimPercentage: 99,
    coordinates: { lat: 41.0082, lng: 28.9784 },
    timezone: 'Europe/Istanbul',
    currency: 'TRY'
  },
  {
    slug: 'ankara',
    name: 'Ankara',
    country: 'Turkey',
    countrySlug: 'turkey',
    countryCode: 'TR',
    halalRestaurantCount: 2000,
    population: 5700000,
    muslimPercentage: 99,
    coordinates: { lat: 39.9334, lng: 32.8597 },
    timezone: 'Europe/Istanbul',
    currency: 'TRY'
  },

  // Southeast Asia
  {
    slug: 'kuala-lumpur',
    name: 'Kuala Lumpur',
    country: 'Malaysia',
    countrySlug: 'malaysia',
    countryCode: 'MY',
    description: 'Halal food paradise with excellent Muslim infrastructure',
    halalRestaurantCount: 3500,
    michelinHalalCount: 2,
    population: 8200000,
    muslimPercentage: 61,
    coordinates: { lat: 3.139, lng: 101.6869 },
    timezone: 'Asia/Kuala_Lumpur',
    currency: 'MYR'
  },
  {
    slug: 'jakarta',
    name: 'Jakarta',
    country: 'Indonesia',
    countrySlug: 'indonesia',
    countryCode: 'ID',
    description: 'Largest city in Muslim-majority Indonesia',
    halalRestaurantCount: 8000,
    population: 11000000,
    muslimPercentage: 87,
    coordinates: { lat: -6.2088, lng: 106.8456 },
    timezone: 'Asia/Jakarta',
    currency: 'IDR'
  },
  {
    slug: 'singapore',
    name: 'Singapore',
    country: 'Singapore',
    countrySlug: 'singapore',
    countryCode: 'SG',
    description: 'Muslim-friendly Asian hub with Michelin-starred halal restaurants',
    halalRestaurantCount: 850,
    michelinHalalCount: 6,
    population: 5900000,
    muslimPercentage: 15,
    coordinates: { lat: 1.3521, lng: 103.8198 },
    timezone: 'Asia/Singapore',
    currency: 'SGD'
  },

  // Europe - UK
  {
    slug: 'london',
    name: 'London',
    country: 'United Kingdom',
    countrySlug: 'united-kingdom',
    countryCode: 'GB',
    description: 'Diverse halal dining scene with Michelin-starred options',
    halalRestaurantCount: 1500,
    michelinHalalCount: 15,
    population: 9700000,
    muslimPercentage: 15,
    coordinates: { lat: 51.5074, lng: -0.1278 },
    timezone: 'Europe/London',
    currency: 'GBP'
  },
  {
    slug: 'birmingham',
    name: 'Birmingham',
    country: 'United Kingdom',
    countrySlug: 'united-kingdom',
    countryCode: 'GB',
    halalRestaurantCount: 600,
    population: 1140000,
    muslimPercentage: 22,
    coordinates: { lat: 52.4862, lng: -1.8904 },
    timezone: 'Europe/London',
    currency: 'GBP'
  },
  {
    slug: 'manchester',
    name: 'Manchester',
    country: 'United Kingdom',
    countrySlug: 'united-kingdom',
    countryCode: 'GB',
    halalRestaurantCount: 450,
    population: 2700000,
    muslimPercentage: 16,
    coordinates: { lat: 53.4808, lng: -2.2426 },
    timezone: 'Europe/London',
    currency: 'GBP'
  },

  // Europe - France
  {
    slug: 'paris',
    name: 'Paris',
    country: 'France',
    countrySlug: 'france',
    countryCode: 'FR',
    description: 'European capital with growing halal fine dining scene',
    halalRestaurantCount: 800,
    michelinHalalCount: 4,
    population: 2100000,
    muslimPercentage: 15,
    coordinates: { lat: 48.8566, lng: 2.3522 },
    timezone: 'Europe/Paris',
    currency: 'EUR'
  },
  {
    slug: 'marseille',
    name: 'Marseille',
    country: 'France',
    countrySlug: 'france',
    countryCode: 'FR',
    halalRestaurantCount: 400,
    population: 870000,
    muslimPercentage: 25,
    coordinates: { lat: 43.2965, lng: 5.3698 },
    timezone: 'Europe/Paris',
    currency: 'EUR'
  },

  // Europe - Germany
  {
    slug: 'berlin',
    name: 'Berlin',
    country: 'Germany',
    countrySlug: 'germany',
    countryCode: 'DE',
    halalRestaurantCount: 500,
    michelinHalalCount: 2,
    population: 3700000,
    muslimPercentage: 9,
    coordinates: { lat: 52.52, lng: 13.405 },
    timezone: 'Europe/Berlin',
    currency: 'EUR'
  },

  // North America - USA
  {
    slug: 'new-york',
    name: 'New York',
    country: 'United States',
    countrySlug: 'united-states',
    countryCode: 'US',
    description: 'Diverse halal dining from street food to fine dining',
    halalRestaurantCount: 1200,
    michelinHalalCount: 8,
    population: 8300000,
    muslimPercentage: 3,
    coordinates: { lat: 40.7128, lng: -74.006 },
    timezone: 'America/New_York',
    currency: 'USD'
  },
  {
    slug: 'los-angeles',
    name: 'Los Angeles',
    country: 'United States',
    countrySlug: 'united-states',
    countryCode: 'US',
    halalRestaurantCount: 800,
    michelinHalalCount: 3,
    population: 4000000,
    muslimPercentage: 2,
    coordinates: { lat: 34.0522, lng: -118.2437 },
    timezone: 'America/Los_Angeles',
    currency: 'USD'
  },
  {
    slug: 'chicago',
    name: 'Chicago',
    country: 'United States',
    countrySlug: 'united-states',
    countryCode: 'US',
    halalRestaurantCount: 600,
    michelinHalalCount: 5,
    population: 2700000,
    muslimPercentage: 2,
    coordinates: { lat: 41.8781, lng: -87.6298 },
    timezone: 'America/Chicago',
    currency: 'USD'
  },
  {
    slug: 'houston',
    name: 'Houston',
    country: 'United States',
    countrySlug: 'united-states',
    countryCode: 'US',
    halalRestaurantCount: 500,
    population: 2300000,
    muslimPercentage: 2,
    coordinates: { lat: 29.7604, lng: -95.3698 },
    timezone: 'America/Chicago',
    currency: 'USD'
  },
  {
    slug: 'washington-dc',
    name: 'Washington, D.C.',
    country: 'United States',
    countrySlug: 'united-states',
    countryCode: 'US',
    halalRestaurantCount: 350,
    population: 700000,
    muslimPercentage: 3,
    coordinates: { lat: 38.9072, lng: -77.0369 },
    timezone: 'America/New_York',
    currency: 'USD'
  },

  // North America - Canada
  {
    slug: 'toronto',
    name: 'Toronto',
    country: 'Canada',
    countrySlug: 'canada',
    countryCode: 'CA',
    description: 'Multicultural city with extensive halal options',
    halalRestaurantCount: 900,
    michelinHalalCount: 0,
    population: 2900000,
    muslimPercentage: 10,
    coordinates: { lat: 43.6532, lng: -79.3832 },
    timezone: 'America/Toronto',
    currency: 'CAD'
  },
  {
    slug: 'montreal',
    name: 'Montreal',
    country: 'Canada',
    countrySlug: 'canada',
    countryCode: 'CA',
    halalRestaurantCount: 600,
    population: 1800000,
    muslimPercentage: 8,
    coordinates: { lat: 45.5017, lng: -73.5673 },
    timezone: 'America/Toronto',
    currency: 'CAD'
  },

  // Australia
  {
    slug: 'sydney',
    name: 'Sydney',
    country: 'Australia',
    countrySlug: 'australia',
    countryCode: 'AU',
    description: 'Growing halal food scene in Australia',
    halalRestaurantCount: 700,
    michelinHalalCount: 0,
    population: 5300000,
    muslimPercentage: 5,
    coordinates: { lat: -33.8688, lng: 151.2093 },
    timezone: 'Australia/Sydney',
    currency: 'AUD'
  },
  {
    slug: 'melbourne',
    name: 'Melbourne',
    country: 'Australia',
    countrySlug: 'australia',
    countryCode: 'AU',
    halalRestaurantCount: 650,
    population: 5100000,
    muslimPercentage: 4,
    coordinates: { lat: -37.8136, lng: 144.9631 },
    timezone: 'Australia/Melbourne',
    currency: 'AUD'
  },

  // Africa
  {
    slug: 'cairo',
    name: 'Cairo',
    country: 'Egypt',
    countrySlug: 'egypt',
    countryCode: 'EG',
    description: 'Historic Islamic city with authentic halal cuisine',
    halalRestaurantCount: 4000,
    population: 21000000,
    muslimPercentage: 90,
    coordinates: { lat: 30.0444, lng: 31.2357 },
    timezone: 'Africa/Cairo',
    currency: 'EGP'
  },
  {
    slug: 'marrakech',
    name: 'Marrakech',
    country: 'Morocco',
    countrySlug: 'morocco',
    countryCode: 'MA',
    halalRestaurantCount: 800,
    population: 1000000,
    muslimPercentage: 99,
    coordinates: { lat: 31.6295, lng: -7.9811 },
    timezone: 'Africa/Casablanca',
    currency: 'MAD'
  },

  // Additional Asian cities
  {
    slug: 'doha',
    name: 'Doha',
    country: 'Qatar',
    countrySlug: 'qatar',
    countryCode: 'QA',
    halalRestaurantCount: 800,
    michelinHalalCount: 3,
    population: 2400000,
    muslimPercentage: 65,
    coordinates: { lat: 25.2854, lng: 51.531 },
    timezone: 'Asia/Qatar',
    currency: 'QAR'
  },
  {
    slug: 'bangkok',
    name: 'Bangkok',
    country: 'Thailand',
    countrySlug: 'thailand',
    countryCode: 'TH',
    halalRestaurantCount: 500,
    michelinHalalCount: 1,
    population: 11000000,
    muslimPercentage: 5,
    coordinates: { lat: 13.7563, lng: 100.5018 },
    timezone: 'Asia/Bangkok',
    currency: 'THB'
  }
];

// Helper functions
export const getCityBySlug = (slug: string): City | undefined =>
  cities.find(c => c.slug === slug);

export const getCitiesByCountry = (countrySlug: string): City[] =>
  cities.filter(c => c.countrySlug === countrySlug);

export const getCitiesWithMichelin = (): City[] =>
  cities.filter(c => c.michelinHalalCount && c.michelinHalalCount > 0);

export const getTopCitiesByRestaurantCount = (limit: number = 10): City[] =>
  [...cities]
    .sort((a, b) => (b.halalRestaurantCount || 0) - (a.halalRestaurantCount || 0))
    .slice(0, limit);
