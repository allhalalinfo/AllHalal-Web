/**
 * Programmatic Content Generation Utilities
 * Generate unique content for programmatic pages
 */

import type { City, DubaiArea, Ingredient, ECode, Developer, Country } from '@/data/types';
import type { FAQItem } from '@/data/types';

/**
 * Generate unique intro for city restaurant page
 */
export function generateCityRestaurantIntro(city: City): string {
  const { name, country, halalRestaurantCount, michelinHalalCount, muslimPercentage } = city;
  
  let intro = `${name}, ${country} is home to ${halalRestaurantCount ? `over ${halalRestaurantCount.toLocaleString()}` : 'numerous'} halal-certified restaurants`;
  
  if (michelinHalalCount && michelinHalalCount > 0) {
    intro += `, including ${michelinHalalCount} Michelin-starred establishments`;
  }
  
  intro += `. `;
  
  if (muslimPercentage && muslimPercentage > 20) {
    intro += `With a ${muslimPercentage}% Muslim population, the city offers extensive halal dining options across all cuisines and price ranges. `;
  } else {
    intro += `Despite a smaller Muslim community, ${name} has developed a thriving halal food scene catering to both residents and travelers. `;
  }
  
  intro += `This comprehensive guide covers the best halal restaurants in ${name}, from fine dining to casual eateries, all verified for halal certification.`;
  
  return intro;
}

/**
 * Generate FAQ for city restaurant page
 */
export function generateCityRestaurantFAQ(city: City): FAQItem[] {
  const { name, halalRestaurantCount, michelinHalalCount } = city;
  
  const faqs: FAQItem[] = [
    {
      question: `How many halal restaurants are in ${name}?`,
      answer: halalRestaurantCount 
        ? `${name} has over ${halalRestaurantCount.toLocaleString()} halal-certified restaurants across various cuisines including Middle Eastern, Asian, Mediterranean, and Western.`
        : `${name} has numerous halal-certified restaurants across various cuisines. The number continues to grow as demand increases.`
    },
    {
      question: `Are there Michelin-starred halal restaurants in ${name}?`,
      answer: michelinHalalCount && michelinHalalCount > 0
        ? `Yes! ${name} has ${michelinHalalCount} Michelin-starred halal restaurant${michelinHalalCount > 1 ? 's' : ''}, offering fine dining experiences that meet Islamic dietary requirements.`
        : `While ${name} may not currently have Michelin-starred halal restaurants, the city offers many high-quality halal dining options across various price points.`
    },
    {
      question: `How can I verify if a restaurant in ${name} is truly halal?`,
      answer: `Look for valid halal certification from recognized bodies. In ${name}, legitimate halal restaurants will display their certificate prominently. You can also check the certifying organization's website for verification. Ask to see the certificate if it's not visible.`
    },
    {
      question: `What types of halal cuisine are available in ${name}?`,
      answer: `${name} offers diverse halal cuisine including Middle Eastern (Turkish, Lebanese, Persian), South Asian (Pakistani, Indian, Bangladeshi), Southeast Asian (Malaysian, Indonesian), Mediterranean, and Western/International options. The variety caters to different tastes and budgets.`
    }
  ];
  
  return faqs;
}

/**
 * Generate unique intro for Dubai area page
 */
export function generateDubaiAreaIntro(area: DubaiArea): string {
  const { name, description, priceRange, propertyTypes, nearbyMosques, halalRestaurants } = area;
  
  let intro = `${name} is `;
  intro += description.endsWith('.') ? description : `${description}. `;
  
  if (priceRange) {
    intro += `Property prices range from ${priceRange.currency} ${priceRange.min.toLocaleString()} to ${priceRange.max.toLocaleString()} ${priceRange.unit}. `;
  }
  
  if (propertyTypes && propertyTypes.length > 0) {
    intro += `Available property types include ${propertyTypes.join(', ')}. `;
  }
  
  if (nearbyMosques && nearbyMosques > 0) {
    intro += `The area is well-served with ${nearbyMosques} mosque${nearbyMosques > 1 ? 's' : ''} nearby. `;
  }
  
  if (halalRestaurants && halalRestaurants > 0) {
    intro += `Residents enjoy access to ${halalRestaurants}+ halal restaurants in the vicinity. `;
  }
  
  intro += `This guide covers everything you need to know about investing in ${name}, including developers, payment plans, and Sharia-compliant financing options.`;
  
  return intro;
}

/**
 * Generate FAQ for Dubai area page
 */
export function generateDubaiAreaFAQ(area: DubaiArea): FAQItem[] {
  const { name, priceRange, nearbyMosques, metroStations, developerCount } = area;
  
  const faqs: FAQItem[] = [
    {
      question: `What is the average property price in ${name}?`,
      answer: priceRange
        ? `Property prices in ${name} range from ${priceRange.currency} ${priceRange.min.toLocaleString()} to ${priceRange.max.toLocaleString()} ${priceRange.unit}. Actual prices depend on property type, size, view, and amenities.`
        : `Property prices in ${name} vary based on type, size, and amenities. Contact developers for current pricing and payment plans.`
    },
    {
      question: `Are there Sharia-compliant payment plans available in ${name}?`,
      answer: `Yes! Most developers in ${name} offer Sharia-compliant payment plans including interest-free installments during construction, post-handover plans, and partnerships with Islamic banks for Murabaha financing. Each developer has different terms, so compare options carefully.`
    },
    {
      question: `How many mosques are near ${name}?`,
      answer: nearbyMosques && nearbyMosques > 0
        ? `${name} has ${nearbyMosques} mosque${nearbyMosques > 1 ? 's' : ''} in the area, making it convenient for daily prayers. Most residential communities also have designated prayer rooms.`
        : `${name} has mosques in the vicinity, and most residential buildings include prayer rooms for residents' convenience.`
    },
    {
      question: `Is ${name} connected to Dubai Metro?`,
      answer: metroStations && metroStations.length > 0
        ? `Yes! ${name} is served by ${metroStations.join(' and ')}. The Dubai Metro provides convenient access to major business districts and attractions.`
        : `${name} is accessible by car, taxi, and bus. Check the RTA website for the latest public transport connections.`
    },
    {
      question: `Which developers are active in ${name}?`,
      answer: developerCount && developerCount > 0
        ? `${developerCount}+ developers are currently active in ${name}, including major names like Emaar, DAMAC, Nakheel, and boutique developers. Each offers different payment plans and property types.`
        : `Several reputable developers operate in ${name}. Research their track record, payment plans, and Sharia compliance before investing.`
    }
  ];
  
  return faqs;
}

/**
 * Generate unique intro for ingredient page
 */
export function generateIngredientIntro(ingredient: Ingredient): string {
  const { name, status, description, alternativeNames, category } = ingredient;
  
  const statusText = {
    halal: 'generally considered halal',
    haram: 'prohibited (haram) in Islam',
    doubtful: 'of doubtful (mashbooh) status',
    depends: 'halal status depends on its source'
  };
  
  let intro = `${name} is ${statusText[status]}. `;
  intro += description.endsWith('.') ? description : `${description}. `;
  
  if (alternativeNames && alternativeNames.length > 0) {
    intro += `Also known as ${alternativeNames.join(', ')}, `;
    intro += `this ${category} ingredient appears in various food products. `;
  }
  
  if (status === 'depends') {
    intro += `The halal permissibility depends on whether it's derived from halal sources and processed according to Islamic guidelines. `;
  } else if (status === 'doubtful') {
    intro += `Scholars differ on its permissibility. Consult your local imam or follow a madhab's guidance. `;
  }
  
  intro += `This guide explains the Islamic perspective on ${name}, its sources, and alternatives.`;
  
  return intro;
}

/**
 * Generate FAQ for ingredient page
 */
export function generateIngredientFAQ(ingredient: Ingredient): FAQItem[] {
  const { name, status, relatedECodes, commonUses } = ingredient;
  
  const faqs: FAQItem[] = [
    {
      question: `Is ${name} halal or haram?`,
      answer: status === 'halal'
        ? `${name} is generally considered halal. It's safe for Muslim consumption in its standard form.`
        : status === 'haram'
        ? `${name} is haram (prohibited) in Islam. Muslims should avoid products containing this ingredient.`
        : status === 'doubtful'
        ? `${name} is of doubtful (mashbooh) status. Some scholars permit it while others advise caution. It's best to avoid it or consult your local imam.`
        : `${name}'s halal status depends on its source. If derived from halal animals (properly slaughtered) or plant/synthetic sources, it may be permissible. Always check for halal certification.`
    },
    {
      question: `What products contain ${name}?`,
      answer: commonUses && commonUses.length > 0
        ? `${name} is commonly found in ${commonUses.join(', ')}. Always check product labels for ingredient lists.`
        : `${name} appears in various food products. Check ingredient labels carefully.`
    },
    {
      question: `How can I identify ${name} on ingredient labels?`,
      answer: relatedECodes && relatedECodes.length > 0
        ? `Look for "${name}" on ingredient lists. It may also appear as ${relatedECodes.map(e => `E-code ${e}`).join(' or ')} in European labeling.`
        : `${name} is typically listed by its common name on ingredient labels. Read labels carefully.`
    }
  ];
  
  if (status === 'depends') {
    faqs.push({
      question: `What sources of ${name} are halal?`,
      answer: `${name} is halal when derived from: (1) Halal-slaughtered animals with proper zabihah, (2) Plant-based sources, or (3) Synthetic/microbial sources. Always look for halal certification to ensure compliance.`
    });
  }
  
  return faqs;
}

/**
 * Generate related content suggestions
 */
export function generateRelatedLinks(options: {
  type: 'city' | 'area' | 'ingredient' | 'developer';
  current: string;
  data: any[];
}): Array<{ title: string; href: string; description: string }> {
  const { type, current, data } = options;
  
  // Filter out current item and get 5 random related items
  const related = data
    .filter(item => item.slug !== current)
    .sort(() => Math.random() - 0.5)
    .slice(0, 5);
  
  return related.map(item => {
    const basePaths = {
      city: '/restaurants',
      area: '/real-estate/dubai',
      ingredient: '/ingredients',
      developer: '/real-estate/developers'
    };
    
    return {
      title: item.name,
      href: `${basePaths[type]}/${item.slug}`,
      description: item.description || `Explore ${item.name}`
    };
  });
}

/**
 * Generate quick stats for display
 */
export function generateQuickStats(data: City | DubaiArea | Developer): Array<{ label: string; value: string | number }> {
  const stats: Array<{ label: string; value: string | number }> = [];
  
  if ('population' in data && data.population) {
    stats.push({ label: 'Population', value: data.population.toLocaleString() });
  }
  
  if ('muslimPercentage' in data && data.muslimPercentage) {
    stats.push({ label: 'Muslim %', value: `${data.muslimPercentage}%` });
  }
  
  if ('halalRestaurantCount' in data && data.halalRestaurantCount) {
    stats.push({ label: 'Halal Restaurants', value: data.halalRestaurantCount.toLocaleString() });
  }
  
  if ('michelinHalalCount' in data && data.michelinHalalCount && data.michelinHalalCount > 0) {
    stats.push({ label: 'Michelin Stars', value: data.michelinHalalCount });
  }
  
  if ('priceRange' in data && data.priceRange) {
    stats.push({ 
      label: 'Price Range', 
      value: `${data.priceRange.currency} ${data.priceRange.min.toLocaleString()}-${data.priceRange.max.toLocaleString()}`
    });
  }
  
  if ('nearbyMosques' in data && data.nearbyMosques) {
    stats.push({ label: 'Mosques', value: data.nearbyMosques });
  }
  
  if ('projectCount' in data && data.projectCount) {
    stats.push({ label: 'Projects', value: data.projectCount });
  }
  
  return stats;
}
