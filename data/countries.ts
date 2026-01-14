import { Country } from './types';

/**
 * Seed data: Countries
 * 25+ countries for programmatic pages
 */

export const countries: Country[] = [
  // Middle East
  {
    slug: 'saudi-arabia',
    name: 'Saudi Arabia',
    code: 'SA',
    muslimPercentage: 93,
    capital: 'Riyadh',
    currency: 'SAR',
    languages: ['Arabic'],
    population: 35000000,
    halalCertificationBodies: ['SFDA', 'GSO'],
    islamicBankCount: 12,
    description: 'Home to Mecca and Medina, the holiest sites in Islam'
  },
  {
    slug: 'united-arab-emirates',
    name: 'United Arab Emirates',
    code: 'AE',
    muslimPercentage: 76,
    capital: 'Abu Dhabi',
    currency: 'AED',
    languages: ['Arabic', 'English'],
    population: 10000000,
    halalCertificationBodies: ['ESMA', 'DM'],
    islamicBankCount: 8,
    description: 'Modern Muslim-friendly destination with halal infrastructure'
  },
  {
    slug: 'turkey',
    name: 'Turkey',
    code: 'TR',
    muslimPercentage: 99,
    capital: 'Ankara',
    currency: 'TRY',
    languages: ['Turkish'],
    population: 85000000,
    halalCertificationBodies: ['TSE', 'GIMDES'],
    islamicBankCount: 6,
    description: 'Bridge between East and West with rich Islamic heritage'
  },
  {
    slug: 'egypt',
    name: 'Egypt',
    code: 'EG',
    muslimPercentage: 90,
    capital: 'Cairo',
    currency: 'EGP',
    languages: ['Arabic'],
    population: 104000000,
    halalCertificationBodies: ['EOS', 'Al-Azhar'],
    islamicBankCount: 4,
    description: 'Ancient Islamic civilization and Al-Azhar University'
  },
  {
    slug: 'jordan',
    name: 'Jordan',
    code: 'JO',
    muslimPercentage: 95,
    capital: 'Amman',
    currency: 'JOD',
    languages: ['Arabic'],
    population: 10700000,
    halalCertificationBodies: ['JISM'],
    islamicBankCount: 3
  },
  {
    slug: 'qatar',
    name: 'Qatar',
    code: 'QA',
    muslimPercentage: 65,
    capital: 'Doha',
    currency: 'QAR',
    languages: ['Arabic'],
    population: 2900000,
    islamicBankCount: 5,
    description: 'Wealthy Gulf state with growing Islamic finance sector'
  },
  {
    slug: 'kuwait',
    name: 'Kuwait',
    code: 'KW',
    muslimPercentage: 74,
    capital: 'Kuwait City',
    currency: 'KWD',
    languages: ['Arabic'],
    population: 4300000,
    islamicBankCount: 5
  },
  {
    slug: 'bahrain',
    name: 'Bahrain',
    code: 'BH',
    muslimPercentage: 70,
    capital: 'Manama',
    currency: 'BHD',
    languages: ['Arabic'],
    population: 1500000,
    islamicBankCount: 6,
    description: 'Islamic finance hub of the Gulf region'
  },
  {
    slug: 'oman',
    name: 'Oman',
    code: 'OM',
    muslimPercentage: 86,
    capital: 'Muscat',
    currency: 'OMR',
    languages: ['Arabic'],
    population: 4600000,
    islamicBankCount: 2
  },

  // Southeast Asia
  {
    slug: 'indonesia',
    name: 'Indonesia',
    code: 'ID',
    muslimPercentage: 87,
    capital: 'Jakarta',
    currency: 'IDR',
    languages: ['Indonesian'],
    population: 275000000,
    halalCertificationBodies: ['MUI', 'BPJPH'],
    islamicBankCount: 14,
    description: 'Largest Muslim-majority country in the world'
  },
  {
    slug: 'malaysia',
    name: 'Malaysia',
    code: 'MY',
    muslimPercentage: 61,
    capital: 'Kuala Lumpur',
    currency: 'MYR',
    languages: ['Malay', 'English'],
    population: 33000000,
    halalCertificationBodies: ['JAKIM', 'MAIN'],
    islamicBankCount: 16,
    description: 'Global leader in halal certification and Islamic finance'
  },
  {
    slug: 'brunei',
    name: 'Brunei',
    code: 'BN',
    muslimPercentage: 78,
    capital: 'Bandar Seri Begawan',
    currency: 'BND',
    languages: ['Malay'],
    population: 450000,
    islamicBankCount: 3,
    description: 'Islamic sultanate on Borneo island'
  },
  {
    slug: 'singapore',
    name: 'Singapore',
    code: 'SG',
    muslimPercentage: 15,
    capital: 'Singapore',
    currency: 'SGD',
    languages: ['English', 'Malay', 'Mandarin', 'Tamil'],
    population: 5900000,
    halalCertificationBodies: ['MUIS'],
    islamicBankCount: 2,
    description: 'Muslim-friendly Asian hub with excellent halal infrastructure'
  },

  // South Asia
  {
    slug: 'pakistan',
    name: 'Pakistan',
    code: 'PK',
    muslimPercentage: 96,
    capital: 'Islamabad',
    currency: 'PKR',
    languages: ['Urdu', 'English'],
    population: 230000000,
    islamicBankCount: 5,
    description: 'Second-largest Muslim-majority country'
  },
  {
    slug: 'bangladesh',
    name: 'Bangladesh',
    code: 'BD',
    muslimPercentage: 90,
    capital: 'Dhaka',
    currency: 'BDT',
    languages: ['Bengali'],
    population: 170000000,
    islamicBankCount: 8,
    description: 'Third-largest Muslim-majority country'
  },

  // Europe
  {
    slug: 'united-kingdom',
    name: 'United Kingdom',
    code: 'GB',
    muslimPercentage: 6,
    capital: 'London',
    currency: 'GBP',
    languages: ['English'],
    population: 68000000,
    halalCertificationBodies: ['HMC', 'HFA'],
    islamicBankCount: 5,
    description: 'Growing Muslim community with strong halal infrastructure'
  },
  {
    slug: 'france',
    name: 'France',
    code: 'FR',
    muslimPercentage: 9,
    capital: 'Paris',
    currency: 'EUR',
    languages: ['French'],
    population: 68000000,
    halalCertificationBodies: ['AVS', 'ARGML'],
    islamicBankCount: 0,
    description: 'Largest Muslim community in Western Europe'
  },
  {
    slug: 'germany',
    name: 'Germany',
    code: 'DE',
    muslimPercentage: 7,
    capital: 'Berlin',
    currency: 'EUR',
    languages: ['German'],
    population: 84000000,
    halalCertificationBodies: ['HCS', 'MHD'],
    islamicBankCount: 0,
    description: 'Large Turkish Muslim community'
  },
  {
    slug: 'netherlands',
    name: 'Netherlands',
    code: 'NL',
    muslimPercentage: 5,
    capital: 'Amsterdam',
    currency: 'EUR',
    languages: ['Dutch'],
    population: 17800000,
    halalCertificationBodies: ['HCS'],
    islamicBankCount: 0,
    description: 'Muslim-friendly with halal food availability'
  },

  // North America
  {
    slug: 'united-states',
    name: 'United States',
    code: 'US',
    muslimPercentage: 1,
    capital: 'Washington, D.C.',
    currency: 'USD',
    languages: ['English'],
    population: 335000000,
    halalCertificationBodies: ['IFANCA', 'ISWA', 'HMA'],
    islamicBankCount: 2,
    description: 'Diverse Muslim community with growing halal market'
  },
  {
    slug: 'canada',
    name: 'Canada',
    code: 'CA',
    muslimPercentage: 4,
    capital: 'Ottawa',
    currency: 'CAD',
    languages: ['English', 'French'],
    population: 39000000,
    halalCertificationBodies: ['IFANCA-Canada', 'HFSAA'],
    islamicBankCount: 0,
    description: 'Multicultural society with Muslim-friendly policies'
  },

  // Africa
  {
    slug: 'morocco',
    name: 'Morocco',
    code: 'MA',
    muslimPercentage: 99,
    capital: 'Rabat',
    currency: 'MAD',
    languages: ['Arabic', 'French'],
    population: 37500000,
    islamicBankCount: 4,
    description: 'North African Muslim destination with rich heritage'
  },
  {
    slug: 'south-africa',
    name: 'South Africa',
    code: 'ZA',
    muslimPercentage: 2,
    capital: 'Pretoria',
    currency: 'ZAR',
    languages: ['English', 'Afrikaans', 'Zulu'],
    population: 60000000,
    halalCertificationBodies: ['SANHA', 'NIHT'],
    islamicBankCount: 1,
    description: 'Strong Muslim community with halal infrastructure'
  },

  // Australia & Oceania
  {
    slug: 'australia',
    name: 'Australia',
    code: 'AU',
    muslimPercentage: 3,
    capital: 'Canberra',
    currency: 'AUD',
    languages: ['English'],
    population: 26000000,
    halalCertificationBodies: ['AFIC', 'ICCV'],
    islamicBankCount: 0,
    description: 'Growing Muslim community with halal food availability'
  },

  // Central Asia
  {
    slug: 'kazakhstan',
    name: 'Kazakhstan',
    code: 'KZ',
    muslimPercentage: 70,
    capital: 'Astana',
    currency: 'KZT',
    languages: ['Kazakh', 'Russian'],
    population: 19600000,
    islamicBankCount: 2,
    description: 'Central Asian Muslim-majority country'
  }
];

// Helper functions
export const getCountryBySlug = (slug: string): Country | undefined =>
  countries.find(c => c.slug === slug);

export const getCountryByCode = (code: string): Country | undefined =>
  countries.find(c => c.code === code);

export const getCountriesByRegion = (region: 'middle-east' | 'southeast-asia' | 'south-asia' | 'europe' | 'north-america' | 'africa' | 'central-asia'): Country[] => {
  const regions: Record<string, string[]> = {
    'middle-east': ['saudi-arabia', 'united-arab-emirates', 'turkey', 'egypt', 'jordan', 'qatar', 'kuwait', 'bahrain', 'oman'],
    'southeast-asia': ['indonesia', 'malaysia', 'brunei', 'singapore'],
    'south-asia': ['pakistan', 'bangladesh'],
    'europe': ['united-kingdom', 'france', 'germany', 'netherlands'],
    'north-america': ['united-states', 'canada'],
    'africa': ['morocco', 'south-africa'],
    'central-asia': ['kazakhstan']
  };
  
  return countries.filter(c => regions[region]?.includes(c.slug));
};
