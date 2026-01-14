import { Developer } from './types';

/**
 * Seed data: Real Estate Developers (20+)
 * Dubai developers with Sharia-compliant payment plans
 */

export const developers: Developer[] = [
  {
    slug: 'emaar-properties',
    name: 'Emaar Properties',
    description: 'Dubai\'s largest and most prestigious real estate developer, known for iconic landmarks like Burj Khalifa',
    website: 'https://www.emaar.com',
    founded: 1997,
    headquarters: 'Dubai, UAE',
    activeAreas: ['downtown-dubai', 'dubai-hills-estate', 'dubai-creek-harbour', 'arabian-ranches', 'the-springs', 'the-meadows'],
    projectCount: 150,
    completedProjects: 100,
    paymentPlanTypes: ['installment', 'developer-plan', 'mortgage'],
    shariaCompliance: {
      certified: true,
      certifiedBy: 'Dubai Islamic Bank partnership',
      methodology: 'Offers installment plans without interest (Riba-free), partnerships with Islamic banks for Murabaha financing',
      notes: 'Many projects offer 60/40 and 70/30 payment plans during construction'
    },
    projects: ['downtown-dubai-various', 'dubai-hills-estate-various'],
    datePublished: '2026-01-14',
    featured: true
  },
  {
    slug: 'damac-properties',
    name: 'DAMAC Properties',
    description: 'Luxury developer known for branded residences and innovative designs',
    website: 'https://www.damacproperties.com',
    founded: 2002,
    headquarters: 'Dubai, UAE',
    activeAreas: ['business-bay', 'dubai-marina', 'dubai-south', 'al-barsha'],
    projectCount: 100,
    completedProjects: 75,
    paymentPlanTypes: ['installment', 'developer-plan'],
    shariaCompliance: {
      certified: true,
      certifiedBy: 'Various Islamic finance institutions',
      methodology: 'Flexible payment plans without interest, partnerships with Sharia-compliant lenders',
      notes: 'Offers post-handover payment plans'
    },
    projects: ['damac-towers', 'damac-hills'],
    datePublished: '2026-01-14',
    featured: true
  },
  {
    slug: 'nakheel',
    name: 'Nakheel',
    description: 'Creator of Palm Jumeirah and other iconic master communities',
    website: 'https://www.nakheel.com',
    founded: 2000,
    headquarters: 'Dubai, UAE',
    activeAreas: ['palm-jumeirah', 'jumeirah-village-circle', 'discovery-gardens', 'international-city'],
    projectCount: 80,
    completedProjects: 60,
    paymentPlanTypes: ['installment', 'developer-plan'],
    shariaCompliance: {
      certified: true,
      methodology: 'Interest-free payment plans, Sharia-compliant financing options',
      notes: 'Government-owned developer with transparent payment structures'
    },
    projects: ['palm-jumeirah-residences'],
    datePublished: '2026-01-14',
    featured: true
  },
  {
    slug: 'meraas',
    name: 'Meraas',
    description: 'Dubai Holdings subsidiary creating vibrant urban communities',
    website: 'https://www.meraas.com',
    founded: 2007,
    headquarters: 'Dubai, UAE',
    activeAreas: ['jumeirah-beach-residence', 'dubai-marina', 'downtown-dubai'],
    projectCount: 40,
    completedProjects: 25,
    paymentPlanTypes: ['installment', 'developer-plan'],
    shariaCompliance: {
      certified: true,
      methodology: 'Interest-free installment plans, partnerships with Islamic banks',
      notes: 'Known for flexible payment options'
    },
    projects: ['city-walk', 'bluewaters-island'],
    datePublished: '2026-01-14',
    featured: true
  },
  {
    slug: 'dubai-properties',
    name: 'Dubai Properties',
    description: 'Part of Dubai Holding, develops residential and commercial properties',
    website: 'https://www.dubaiproperties.ae',
    founded: 2002,
    headquarters: 'Dubai, UAE',
    activeAreas: ['jumeirah-village-circle', 'dubai-south', 'mirdif', 'business-bay'],
    projectCount: 60,
    completedProjects: 45,
    paymentPlanTypes: ['installment', 'developer-plan'],
    shariaCompliance: {
      certified: true,
      methodology: 'Sharia-compliant payment plans, no interest charges',
      notes: 'Government-backed developer ensuring compliance'
    },
    projects: ['jvc-various', 'serena-dubai'],
    datePublished: '2026-01-14'
  },
  {
    slug: 'azizi-developments',
    name: 'Azizi Developments',
    description: 'Rapidly growing developer focused on affordable luxury',
    website: 'https://www.azizidevelopments.com',
    founded: 2007,
    headquarters: 'Dubai, UAE',
    activeAreas: ['dubai-south', 'dubai-sports-city', 'al-barsha', 'mirdif'],
    projectCount: 70,
    completedProjects: 40,
    paymentPlanTypes: ['installment', 'developer-plan'],
    shariaCompliance: {
      certified: true,
      methodology: 'Interest-free installment plans during and after construction',
      notes: 'Flexible payment schedules tailored to buyers'
    },
    projects: ['azizi-riviera'],
    datePublished: '2026-01-14'
  },
  {
    slug: 'sobha-realty',
    name: 'Sobha Realty',
    description: 'Premium developer known for quality construction and finishing',
    website: 'https://www.sobharealty.com',
    founded: 1976,
    headquarters: 'Bangalore (Dubai office)',
    activeAreas: ['dubai-hills-estate', 'motor-city', 'meydan'],
    projectCount: 30,
    completedProjects: 20,
    paymentPlanTypes: ['installment'],
    shariaCompliance: {
      certified: true,
      methodology: 'Construction-linked payment plans without interest',
      notes: 'Known for transparent payment schedules'
    },
    projects: ['sobha-hartland'],
    datePublished: '2026-01-14'
  },
  {
    slug: 'aldar-properties',
    name: 'Aldar Properties',
    description: 'Abu Dhabi-based developer expanding in Dubai',
    website: 'https://www.aldar.com',
    founded: 2004,
    headquarters: 'Abu Dhabi, UAE',
    activeAreas: ['dubai-south', 'business-bay'],
    projectCount: 15,
    completedProjects: 10,
    paymentPlanTypes: ['installment', 'mortgage'],
    shariaCompliance: {
      certified: true,
      certifiedBy: 'Abu Dhabi Islamic Bank',
      methodology: 'Sharia-compliant financing through Islamic banking partners',
      notes: 'Government-backed with strong Sharia compliance'
    },
    projects: ['aldar-dubai-projects'],
    datePublished: '2026-01-14'
  },
  {
    slug: 'deyaar',
    name: 'Deyaar Development',
    description: 'Listed developer with diverse portfolio',
    website: 'https://www.deyaar.ae',
    founded: 2002,
    headquarters: 'Dubai, UAE',
    activeAreas: ['business-bay', 'dubai-south', 'international-city'],
    projectCount: 45,
    completedProjects: 35,
    paymentPlanTypes: ['installment', 'developer-plan'],
    shariaCompliance: {
      certified: true,
      methodology: 'Interest-free payment plans, Islamic finance partnerships',
    },
    projects: ['deyaar-projects'],
    datePublished: '2026-01-14'
  },
  {
    slug: 'danube-properties',
    name: 'Danube Properties',
    description: 'Developer offering affordable housing with flexible payment',
    website: 'https://www.danubeproperties.com',
    founded: 2014,
    headquarters: 'Dubai, UAE',
    activeAreas: ['jumeirah-village-circle', 'dubai-south', 'international-city'],
    projectCount: 25,
    completedProjects: 15,
    paymentPlanTypes: ['installment', 'developer-plan'],
    shariaCompliance: {
      certified: true,
      methodology: '1% monthly installment plans (Riba-free structure)',
      notes: 'Known for very flexible, interest-free payment plans'
    },
    projects: ['danube-jewelz'],
    datePublished: '2026-01-14'
  },
  {
    slug: 'mag-property-development',
    name: 'MAG Property Development',
    description: 'Developer of residential and commercial projects',
    website: 'https://www.magpd.com',
    founded: 2003,
    headquarters: 'Dubai, UAE',
    activeAreas: ['jumeirah-village-circle', 'dubai-south', 'meydan'],
    projectCount: 30,
    completedProjects: 20,
    paymentPlanTypes: ['installment'],
    shariaCompliance: {
      certified: true,
      methodology: 'Construction-linked payment plans without interest',
    },
    projects: ['mag-developments'],
    datePublished: '2026-01-14'
  },
  {
    slug: 'ellington-properties',
    name: 'Ellington Properties',
    description: 'Boutique developer focused on design and quality',
    website: 'https://www.ellingtonproperties.ae',
    founded: 2014,
    headquarters: 'Dubai, UAE',
    activeAreas: ['dubai-hills-estate', 'motor-city', 'meydan'],
    projectCount: 20,
    completedProjects: 12,
    paymentPlanTypes: ['installment'],
    shariaCompliance: {
      certified: true,
      methodology: 'Interest-free construction-linked payment plans',
    },
    projects: ['ellington-projects'],
    datePublished: '2026-01-14'
  },
  {
    slug: 'omniyat',
    name: 'Omniyat',
    description: 'Ultra-luxury developer with signature designs',
    website: 'https://www.omniyat.com',
    founded: 2005,
    headquarters: 'Dubai, UAE',
    activeAreas: ['business-bay', 'palm-jumeirah', 'downtown-dubai'],
    projectCount: 15,
    completedProjects: 10,
    paymentPlanTypes: ['installment'],
    shariaCompliance: {
      certified: true,
      methodology: 'Flexible payment plans without interest for luxury buyers',
    },
    projects: ['the-opus'],
    datePublished: '2026-01-14'
  },
  {
    slug: 'select-group',
    name: 'Select Group',
    description: 'Boutique developer of luxury residences',
    website: 'https://www.selectgroup.com',
    founded: 2002,
    headquarters: 'Dubai, UAE',
    activeAreas: ['downtown-dubai', 'business-bay', 'dubai-marina'],
    projectCount: 18,
    completedProjects: 12,
    paymentPlanTypes: ['installment'],
    shariaCompliance: {
      certified: true,
      methodology: 'Construction-linked, interest-free payment plans',
    },
    projects: ['arabella-townhouses'],
    datePublished: '2026-01-14'
  },
  {
    slug: 'tiger-group',
    name: 'Tiger Group',
    description: 'Established conglomerate with real estate arm',
    website: 'https://www.tigergroup.ae',
    founded: 1976,
    headquarters: 'Dubai, UAE',
    activeAreas: ['jumeirah-village-circle', 'dubai-south', 'silicon-oasis'],
    projectCount: 25,
    completedProjects: 18,
    paymentPlanTypes: ['installment'],
    shariaCompliance: {
      certified: true,
      methodology: 'Sharia-compliant payment structures',
    },
    projects: ['tiger-properties'],
    datePublished: '2026-01-14'
  },
  {
    slug: 'reportage-properties',
    name: 'Reportage Properties',
    description: 'Abu Dhabi developer with Dubai projects',
    website: 'https://www.reportageproperties.ae',
    founded: 2014,
    headquarters: 'Abu Dhabi, UAE',
    activeAreas: ['dubai-south', 'silicon-oasis'],
    projectCount: 12,
    completedProjects: 6,
    paymentPlanTypes: ['installment', 'developer-plan'],
    shariaCompliance: {
      certified: true,
      methodology: 'Interest-free installments during construction',
    },
    projects: ['reportage-dubai'],
    datePublished: '2026-01-14'
  },
  {
    slug: 'binghatti',
    name: 'Binghatti Developers',
    description: 'Family-owned developer with unique architectural style',
    website: 'https://www.binghatti.com',
    founded: 2008,
    headquarters: 'Dubai, UAE',
    activeAreas: ['jumeirah-village-circle', 'business-bay', 'silicon-oasis'],
    projectCount: 35,
    completedProjects: 25,
    paymentPlanTypes: ['installment'],
    shariaCompliance: {
      certified: true,
      methodology: 'Construction-linked payment plans without interest',
    },
    projects: ['binghatti-projects'],
    datePublished: '2026-01-14'
  },
  {
    slug: 'wasl-properties',
    name: 'wasl Properties',
    description: 'Dubai government-owned asset management and development company',
    website: 'https://www.wasl.ae',
    founded: 2008,
    headquarters: 'Dubai, UAE',
    activeAreas: ['jumeirah-beach-residence', 'al-barsha', 'mirdif'],
    projectCount: 20,
    completedProjects: 15,
    paymentPlanTypes: ['installment'],
    shariaCompliance: {
      certified: true,
      methodology: 'Government-backed Sharia-compliant payment plans',
      notes: 'Full transparency and Sharia compliance as government entity'
    },
    projects: ['wasl-gate'],
    datePublished: '2026-01-14'
  },
  {
    slug: 'fakhruddin-properties',
    name: 'Fakhruddin Properties',
    description: 'Developer with focus on community living',
    website: 'https://www.fakhruddin.ae',
    founded: 2003,
    headquarters: 'Dubai, UAE',
    activeAreas: ['jumeirah-village-circle', 'dubai-south'],
    projectCount: 15,
    completedProjects: 10,
    paymentPlanTypes: ['installment'],
    shariaCompliance: {
      certified: true,
      methodology: 'Interest-free payment plans',
    },
    projects: ['fakhruddin-projects'],
    datePublished: '2026-01-14'
  },
  {
    slug: 'arada',
    name: 'Arada',
    description: 'Sharjah-based developer expanding to Dubai',
    website: 'https://www.arada.com',
    founded: 2017,
    headquarters: 'Sharjah, UAE',
    activeAreas: ['dubai-south'],
    projectCount: 8,
    completedProjects: 3,
    paymentPlanTypes: ['installment'],
    shariaCompliance: {
      certified: true,
      methodology: 'Sharia-compliant payment structures',
    },
    projects: ['aljada'],
    datePublished: '2026-01-14'
  }
];

// Helper functions
export const getDeveloperBySlug = (slug: string): Developer | undefined =>
  developers.find(d => d.slug === slug);

export const getFeaturedDevelopers = (): Developer[] =>
  developers.filter(d => d.featured);

export const getDevelopersByArea = (areaSlug: string): Developer[] =>
  developers.filter(d => d.activeAreas.includes(areaSlug));

export const getShariaCompliantDevelopers = (): Developer[] =>
  developers.filter(d => d.shariaCompliance.certified);

export const getDevelopersWithPaymentPlanType = (planType: string): Developer[] =>
  developers.filter(d => d.paymentPlanTypes.includes(planType));
