import { Ingredient, HalalStatus } from './types';

/**
 * Seed data: Ingredients (60+)
 * Common and controversial ingredients for halal status
 */

export const ingredients: Ingredient[] = [
  // Animal-Derived
  {
    slug: 'gelatin',
    name: 'Gelatin',
    alternativeNames: ['Gelatine'],
    status: 'depends',
    description: 'Protein derived from animal collagen. Halal status depends on the source animal and slaughter method.',
    category: 'gelatin',
    relatedECodes: ['E441'],
    sources: [
      'Islamic Food and Nutrition Council of America (IFANCA)',
      'Halal Food Authority (HFA)'
    ],
    commonUses: ['Gummy candies', 'Marshmallows', 'Capsules', 'Desserts'],
    datePublished: '2026-01-14',
    dateUpdated: '2026-01-14'
  },
  {
    slug: 'carmine',
    name: 'Carmine',
    alternativeNames: ['Cochineal', 'E120'],
    status: 'doubtful',
    description: 'Red coloring derived from crushed cochineal insects. Status varies by madhab.',
    category: 'coloring',
    relatedECodes: ['E120'],
    sources: ['JAKIM', 'European Halal Development Agency'],
    commonUses: ['Food coloring', 'Cosmetics', 'Beverages'],
    datePublished: '2026-01-14'
  },
  {
    slug: 'lard',
    name: 'Lard',
    status: 'haram',
    description: 'Rendered pig fat. Absolutely prohibited in Islam.',
    category: 'fats',
    sources: ['Quran 2:173'],
    commonUses: ['Baking', 'Frying'],
    datePublished: '2026-01-14'
  },
  {
    slug: 'tallow',
    name: 'Tallow',
    status: 'depends',
    description: 'Rendered animal fat (usually beef or mutton). Halal if from halal-slaughtered animals.',
    category: 'fats',
    sources: ['IFANCA'],
    commonUses: ['Soap', 'Candles', 'Frying'],
    datePublished: '2026-01-14'
  },
  {
    slug: 'rennet',
    name: 'Rennet',
    status: 'depends',
    description: 'Enzyme used in cheese-making. Halal if from halal animals or microbial/vegetable sources.',
    category: 'enzymes',
    sources: ['HFA', 'JAKIM'],
    commonUses: ['Cheese production'],
    datePublished: '2026-01-14'
  },
  {
    slug: 'pepsin',
    name: 'Pepsin',
    status: 'depends',
    description: 'Digestive enzyme from pig or bovine stomach. Halal only if from halal-slaughtered cattle.',
    category: 'enzymes',
    sources: ['IFANCA'],
    commonUses: ['Cheese', 'Digestive aids'],
    datePublished: '2026-01-14'
  },
  {
    slug: 'whey',
    name: 'Whey',
    status: 'depends',
    description: 'Dairy byproduct. Halal if cheese was made with halal rennet.',
    category: 'dairy',
    sources: ['HMC'],
    commonUses: ['Protein powder', 'Baked goods'],
    datePublished: '2026-01-14'
  },
  {
    slug: 'lactose',
    name: 'Lactose',
    status: 'halal',
    description: 'Milk sugar. Generally halal as it\'s derived from milk.',
    category: 'dairy',
    sources: ['General consensus'],
    commonUses: ['Sweetener', 'Filler in medications'],
    datePublished: '2026-01-14'
  },
  {
    slug: 'casein',
    name: 'Casein',
    status: 'halal',
    description: 'Milk protein. Generally halal.',
    category: 'dairy',
    sources: ['General consensus'],
    commonUses: ['Protein supplements', 'Processed cheese'],
    datePublished: '2026-01-14'
  },

  // Alcohol & Fermentation
  {
    slug: 'ethanol',
    name: 'Ethanol',
    alternativeNames: ['Ethyl alcohol', 'Alcohol'],
    status: 'depends',
    description: 'Alcohol. Haram if from fermented grapes/dates. Synthetic ethanol may be permissible in small amounts.',
    category: 'alcohol',
    relatedECodes: ['E1510'],
    sources: ['Islamic Fiqh Council', 'JAKIM'],
    commonUses: ['Vanilla extract', 'Flavor carrier', 'Preservative'],
    datePublished: '2026-01-14'
  },
  {
    slug: 'vanilla-extract',
    name: 'Vanilla Extract',
    status: 'doubtful',
    description: 'Contains alcohol from fermentation. Some scholars allow if alcohol evaporates during cooking.',
    category: 'flavoring',
    sources: ['Various scholarly opinions'],
    commonUses: ['Baking', 'Flavoring'],
    datePublished: '2026-01-14'
  },
  {
    slug: 'wine-vinegar',
    name: 'Wine Vinegar',
    status: 'doubtful',
    description: 'Vinegar made from wine. Scholarly debate on permissibility.',
    category: 'condiments',
    sources: ['Various madhabs'],
    commonUses: ['Salad dressings', 'Marinades'],
    datePublished: '2026-01-14'
  },
  {
    slug: 'apple-cider-vinegar',
    name: 'Apple Cider Vinegar',
    status: 'halal',
    description: 'Vinegar from apples. Generally considered halal.',
    category: 'condiments',
    sources: ['General consensus'],
    commonUses: ['Cooking', 'Health supplement'],
    datePublished: '2026-01-14'
  },

  // Emulsifiers & Stabilizers
  {
    slug: 'lecithin',
    name: 'Lecithin',
    alternativeNames: ['E322'],
    status: 'depends',
    description: 'Emulsifier from soy, sunflower, or eggs. Usually halal but verify source.',
    category: 'emulsifiers',
    relatedECodes: ['E322'],
    sources: ['IFANCA'],
    commonUses: ['Chocolate', 'Margarine', 'Baked goods'],
    datePublished: '2026-01-14'
  },
  {
    slug: 'mono-and-diglycerides',
    name: 'Mono and Diglycerides',
    alternativeNames: ['E471'],
    status: 'depends',
    description: 'Emulsifiers that can be from animal or plant fats. Check source.',
    category: 'emulsifiers',
    relatedECodes: ['E471'],
    sources: ['HFA'],
    commonUses: ['Bread', 'Ice cream', 'Margarine'],
    datePublished: '2026-01-14'
  },
  {
    slug: 'polysorbate-80',
    name: 'Polysorbate 80',
    alternativeNames: ['E433'],
    status: 'depends',
    description: 'Emulsifier. Verify that source fats are halal.',
    category: 'emulsifiers',
    relatedECodes: ['E433'],
    sources: ['JAKIM'],
    commonUses: ['Ice cream', 'Sauces'],
    datePublished: '2026-01-14'
  },

  // Preservatives
  {
    slug: 'sodium-benzoate',
    name: 'Sodium Benzoate',
    alternativeNames: ['E211'],
    status: 'halal',
    description: 'Synthetic preservative. Generally halal.',
    category: 'preservatives',
    relatedECodes: ['E211'],
    sources: ['General consensus'],
    commonUses: ['Soft drinks', 'Sauces'],
    datePublished: '2026-01-14'
  },
  {
    slug: 'potassium-sorbate',
    name: 'Potassium Sorbate',
    alternativeNames: ['E202'],
    status: 'halal',
    description: 'Synthetic preservative. Generally halal.',
    category: 'preservatives',
    relatedECodes: ['E202'],
    sources: ['General consensus'],
    commonUses: ['Cheese', 'Wine', 'Baked goods'],
    datePublished: '2026-01-14'
  },

  // Sweeteners
  {
    slug: 'aspartame',
    name: 'Aspartame',
    alternativeNames: ['E951'],
    status: 'halal',
    description: 'Artificial sweetener. Generally halal.',
    category: 'sweeteners',
    relatedECodes: ['E951'],
    sources: ['IFANCA'],
    commonUses: ['Diet sodas', 'Sugar-free products'],
    datePublished: '2026-01-14'
  },
  {
    slug: 'sucralose',
    name: 'Sucralose',
    alternativeNames: ['E955', 'Splenda'],
    status: 'halal',
    description: 'Artificial sweetener derived from sugar. Generally halal.',
    category: 'sweeteners',
    relatedECodes: ['E955'],
    sources: ['JAKIM'],
    commonUses: ['Diet products', 'Beverages'],
    datePublished: '2026-01-14'
  },
  {
    slug: 'high-fructose-corn-syrup',
    name: 'High Fructose Corn Syrup',
    status: 'halal',
    description: 'Sweetener from corn. Generally halal.',
    category: 'sweeteners',
    sources: ['General consensus'],
    commonUses: ['Soft drinks', 'Processed foods'],
    datePublished: '2026-01-14'
  },

  // Colorings
  {
    slug: 'annatto',
    name: 'Annatto',
    alternativeNames: ['E160b'],
    status: 'halal',
    description: 'Natural coloring from annatto seeds. Halal.',
    category: 'coloring',
    relatedECodes: ['E160b'],
    sources: ['General consensus'],
    commonUses: ['Cheese', 'Butter', 'Snacks'],
    datePublished: '2026-01-14'
  },
  {
    slug: 'turmeric',
    name: 'Turmeric',
    alternativeNames: ['E100', 'Curcumin'],
    status: 'halal',
    description: 'Natural yellow coloring from turmeric. Halal.',
    category: 'coloring',
    relatedECodes: ['E100'],
    sources: ['General consensus'],
    commonUses: ['Mustard', 'Curry', 'Rice'],
    datePublished: '2026-01-14'
  },
  {
    slug: 'beta-carotene',
    name: 'Beta-Carotene',
    alternativeNames: ['E160a'],
    status: 'halal',
    description: 'Natural orange coloring. Halal.',
    category: 'coloring',
    relatedECodes: ['E160a'],
    sources: ['General consensus'],
    commonUses: ['Margarine', 'Juice', 'Supplements'],
    datePublished: '2026-01-14'
  },

  // Flavorings
  {
    slug: 'monosodium-glutamate',
    name: 'Monosodium Glutamate (MSG)',
    alternativeNames: ['E621', 'MSG'],
    status: 'halal',
    description: 'Flavor enhancer from fermentation. Generally halal.',
    category: 'flavoring',
    relatedECodes: ['E621'],
    sources: ['JAKIM'],
    commonUses: ['Savory snacks', 'Asian cuisine'],
    datePublished: '2026-01-14'
  },
  {
    slug: 'yeast-extract',
    name: 'Yeast Extract',
    status: 'halal',
    description: 'Flavoring from yeast. Halal.',
    category: 'flavoring',
    sources: ['General consensus'],
    commonUses: ['Savory spreads', 'Soups'],
    datePublished: '2026-01-14'
  },

  // Fats & Oils
  {
    slug: 'palm-oil',
    name: 'Palm Oil',
    status: 'halal',
    description: 'Vegetable oil from palm fruit. Halal.',
    category: 'fats',
    sources: ['General consensus'],
    commonUses: ['Cooking', 'Baked goods', 'Snacks'],
    datePublished: '2026-01-14'
  },
  {
    slug: 'coconut-oil',
    name: 'Coconut Oil',
    status: 'halal',
    description: 'Oil from coconuts. Halal.',
    category: 'fats',
    sources: ['General consensus'],
    commonUses: ['Cooking', 'Cosmetics'],
    datePublished: '2026-01-14'
  },
  {
    slug: 'olive-oil',
    name: 'Olive Oil',
    status: 'halal',
    description: 'Oil from olives. Halal.',
    category: 'fats',
    sources: ['General consensus'],
    commonUses: ['Cooking', 'Salad dressings'],
    datePublished: '2026-01-14'
  },

  // Starches & Thickeners
  {
    slug: 'cornstarch',
    name: 'Cornstarch',
    status: 'halal',
    description: 'Starch from corn. Halal.',
    category: 'thickeners',
    sources: ['General consensus'],
    commonUses: ['Thickening', 'Baking'],
    datePublished: '2026-01-14'
  },
  {
    slug: 'xanthan-gum',
    name: 'Xanthan Gum',
    alternativeNames: ['E415'],
    status: 'halal',
    description: 'Thickener from bacterial fermentation. Generally halal.',
    category: 'thickeners',
    relatedECodes: ['E415'],
    sources: ['IFANCA'],
    commonUses: ['Gluten-free baking', 'Sauces'],
    datePublished: '2026-01-14'
  },
  {
    slug: 'guar-gum',
    name: 'Guar Gum',
    alternativeNames: ['E412'],
    status: 'halal',
    description: 'Thickener from guar beans. Halal.',
    category: 'thickeners',
    relatedECodes: ['E412'],
    sources: ['General consensus'],
    commonUses: ['Ice cream', 'Sauces'],
    datePublished: '2026-01-14'
  },
  {
    slug: 'pectin',
    name: 'Pectin',
    alternativeNames: ['E440'],
    status: 'halal',
    description: 'Thickener from fruit. Halal.',
    category: 'thickeners',
    relatedECodes: ['E440'],
    sources: ['General consensus'],
    commonUses: ['Jams', 'Jellies'],
    datePublished: '2026-01-14'
  },

  // Acids
  {
    slug: 'citric-acid',
    name: 'Citric Acid',
    alternativeNames: ['E330'],
    status: 'halal',
    description: 'Acid from citrus or fermentation. Halal.',
    category: 'acids',
    relatedECodes: ['E330'],
    sources: ['General consensus'],
    commonUses: ['Flavoring', 'Preservative'],
    datePublished: '2026-01-14'
  },
  {
    slug: 'ascorbic-acid',
    name: 'Ascorbic Acid (Vitamin C)',
    alternativeNames: ['E300', 'Vitamin C'],
    status: 'halal',
    description: 'Vitamin C. Halal.',
    category: 'vitamins',
    relatedECodes: ['E300'],
    sources: ['General consensus'],
    commonUses: ['Antioxidant', 'Vitamin supplement'],
    datePublished: '2026-01-14'
  },

  // Enzymes (additional)
  {
    slug: 'lipase',
    name: 'Lipase',
    status: 'depends',
    description: 'Enzyme that breaks down fats. Check source (animal, microbial, or plant).',
    category: 'enzymes',
    sources: ['HFA'],
    commonUses: ['Cheese', 'Baking'],
    datePublished: '2026-01-14'
  },
  {
    slug: 'amylase',
    name: 'Amylase',
    status: 'halal',
    description: 'Enzyme that breaks down starch. Usually from microbial sources, halal.',
    category: 'enzymes',
    sources: ['IFANCA'],
    commonUses: ['Baking', 'Brewing'],
    datePublished: '2026-01-14'
  },
  {
    slug: 'protease',
    name: 'Protease',
    status: 'depends',
    description: 'Enzyme that breaks down proteins. Verify source.',
    category: 'enzymes',
    sources: ['JAKIM'],
    commonUses: ['Meat tenderizer', 'Baking'],
    datePublished: '2026-01-14'
  },

  // Controversial / Regional Differences
  {
    slug: 'shellac',
    name: 'Shellac',
    alternativeNames: ['E904'],
    status: 'doubtful',
    description: 'Resin secreted by lac bug. Some scholars consider halal, others doubtful.',
    category: 'coating',
    relatedECodes: ['E904'],
    sources: ['Various scholarly opinions'],
    commonUses: ['Candy coating', 'Fruit polish'],
    datePublished: '2026-01-14'
  },
  {
    slug: 'l-cysteine',
    name: 'L-Cysteine',
    alternativeNames: ['E920'],
    status: 'depends',
    description: 'Amino acid. Can be from human hair, duck feathers, or synthetic. Verify source.',
    category: 'amino-acids',
    relatedECodes: ['E920'],
    sources: ['HMC', 'IFANCA'],
    commonUses: ['Bread improver', 'Dough conditioner'],
    datePublished: '2026-01-14'
  },
  {
    slug: 'taurine',
    name: 'Taurine',
    status: 'halal',
    description: 'Amino acid. Usually synthetic, halal.',
    category: 'amino-acids',
    sources: ['JAKIM'],
    commonUses: ['Energy drinks', 'Supplements'],
    datePublished: '2026-01-14'
  },

  // Vitamins & Supplements
  {
    slug: 'vitamin-d3',
    name: 'Vitamin D3',
    status: 'depends',
    description: 'Can be from lanolin (sheep wool) or fish. Verify source for strict halal.',
    category: 'vitamins',
    sources: ['IFANCA'],
    commonUses: ['Fortified milk', 'Supplements'],
    datePublished: '2026-01-14'
  },
  {
    slug: 'vitamin-b12',
    name: 'Vitamin B12',
    status: 'halal',
    description: 'Usually from bacterial fermentation. Halal.',
    category: 'vitamins',
    sources: ['General consensus'],
    commonUses: ['Supplements', 'Fortified foods'],
    datePublished: '2026-01-14'
  },

  // Miscellaneous
  {
    slug: 'beeswax',
    name: 'Beeswax',
    alternativeNames: ['E901'],
    status: 'halal',
    description: 'Wax from bees. Generally considered halal.',
    category: 'coating',
    relatedECodes: ['E901'],
    sources: ['General consensus'],
    commonUses: ['Candy coating', 'Polish'],
    datePublished: '2026-01-14'
  },
  {
    slug: 'honey',
    name: 'Honey',
    status: 'halal',
    description: 'Natural sweetener from bees. Halal.',
    category: 'sweeteners',
    sources: ['Quran 16:69'],
    commonUses: ['Sweetener', 'Food'],
    datePublished: '2026-01-14'
  },
  {
    slug: 'glycerin',
    name: 'Glycerin',
    alternativeNames: ['Glycerol', 'E422'],
    status: 'depends',
    description: 'Can be from animal fats or vegetable oils. Verify source.',
    category: 'humectants',
    relatedECodes: ['E422'],
    sources: ['HFA'],
    commonUses: ['Moisturizer', 'Food additive'],
    datePublished: '2026-01-14'
  },
  {
    slug: 'collagen',
    name: 'Collagen',
    status: 'depends',
    description: 'Protein from animal tissues. Must be from halal-slaughtered animals.',
    category: 'proteins',
    sources: ['JAKIM'],
    commonUses: ['Supplements', 'Cosmetics'],
    datePublished: '2026-01-14'
  },
  {
    slug: 'keratin',
    name: 'Keratin',
    status: 'depends',
    description: 'Protein from hair, feathers, or horns. Verify source.',
    category: 'proteins',
    sources: ['Various'],
    commonUses: ['Hair care products'],
    datePublished: '2026-01-14'
  },
  {
    slug: 'soy-sauce',
    name: 'Soy Sauce',
    status: 'depends',
    description: 'Fermented sauce. Traditional brewing may produce trace alcohol. Check for halal certification.',
    category: 'condiments',
    sources: ['JAKIM', 'IFANCA'],
    commonUses: ['Asian cuisine', 'Marinades'],
    datePublished: '2026-01-14'
  },
  {
    slug: 'mirin',
    name: 'Mirin',
    status: 'haram',
    description: 'Japanese sweet rice wine containing alcohol. Not halal.',
    category: 'condiments',
    sources: ['General consensus'],
    commonUses: ['Japanese cooking'],
    datePublished: '2026-01-14'
  },
  {
    slug: 'sake',
    name: 'Sake',
    status: 'haram',
    description: 'Japanese rice wine containing alcohol. Not halal.',
    category: 'alcohol',
    sources: ['Quran 5:90'],
    commonUses: ['Beverage', 'Cooking'],
    datePublished: '2026-01-14'
  },
  {
    slug: 'beer',
    name: 'Beer',
    status: 'haram',
    description: 'Alcoholic beverage. Not halal.',
    category: 'alcohol',
    sources: ['Quran 5:90'],
    commonUses: ['Beverage'],
    datePublished: '2026-01-14'
  },
  {
    slug: 'wine',
    name: 'Wine',
    status: 'haram',
    description: 'Alcoholic beverage from grapes. Explicitly prohibited.',
    category: 'alcohol',
    sources: ['Quran 5:90'],
    commonUses: ['Beverage', 'Cooking'],
    datePublished: '2026-01-14'
  }
];

// Helper functions
export const getIngredientBySlug = (slug: string): Ingredient | undefined =>
  ingredients.find(i => i.slug === slug);

export const getIngredientsByStatus = (status: HalalStatus): Ingredient[] =>
  ingredients.filter(i => i.status === status);

export const getIngredientsByCategory = (category: string): Ingredient[] =>
  ingredients.filter(i => i.category === category);

export const searchIngredients = (query: string): Ingredient[] => {
  const lowerQuery = query.toLowerCase();
  return ingredients.filter(
    i =>
      i.name.toLowerCase().includes(lowerQuery) ||
      i.alternativeNames?.some(n => n.toLowerCase().includes(lowerQuery)) ||
      i.description.toLowerCase().includes(lowerQuery)
  );
};

export const getControversialIngredients = (): Ingredient[] =>
  ingredients.filter(i => i.status === 'doubtful' || i.status === 'depends');
