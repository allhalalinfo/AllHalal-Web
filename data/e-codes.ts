import { ECode, HalalStatus } from './types';

/**
 * Seed data: E-Codes (30+)
 * Common E-number additives with halal status
 */

export const eCodes: ECode[] = [
  // Colorings (E100-E199)
  {
    code: 'E100',
    name: 'Curcumin',
    slug: 'e100-curcumin',
    status: 'halal',
    description: 'Yellow coloring derived from turmeric root.',
    category: 'coloring',
    commonSources: ['Turmeric plant'],
    foundIn: ['Mustard', 'Curry powder', 'Margarine'],
    relatedIngredients: ['turmeric'],
    sources: ['General consensus'],
    datePublished: '2026-01-14'
  },
  {
    code: 'E120',
    name: 'Carmine / Cochineal',
    slug: 'e120-carmine',
    status: 'doubtful',
    description: 'Red coloring derived from crushed cochineal insects. Madhab-dependent.',
    category: 'coloring',
    commonSources: ['Cochineal insects'],
    foundIn: ['Beverages', 'Candies', 'Yogurt', 'Cosmetics'],
    relatedIngredients: ['carmine'],
    sources: ['Various madhabs - opinions differ'],
    datePublished: '2026-01-14'
  },
  {
    code: 'E160a',
    name: 'Carotenes',
    slug: 'e160a-carotenes',
    status: 'halal',
    description: 'Orange coloring from plant sources.',
    category: 'coloring',
    commonSources: ['Carrots', 'Palm oil'],
    foundIn: ['Margarine', 'Cheese', 'Juices'],
    relatedIngredients: ['beta-carotene'],
    sources: ['General consensus'],
    datePublished: '2026-01-14'
  },
  {
    code: 'E160b',
    name: 'Annatto',
    slug: 'e160b-annatto',
    status: 'halal',
    description: 'Yellow/orange coloring from annatto seeds.',
    category: 'coloring',
    commonSources: ['Annatto seeds'],
    foundIn: ['Cheese', 'Butter', 'Snacks'],
    relatedIngredients: ['annatto'],
    sources: ['General consensus'],
    datePublished: '2026-01-14'
  },

  // Preservatives (E200-E299)
  {
    code: 'E200',
    name: 'Sorbic Acid',
    slug: 'e200-sorbic-acid',
    status: 'halal',
    description: 'Synthetic preservative.',
    category: 'preservative',
    commonSources: ['Synthetic'],
    foundIn: ['Cheese', 'Wine', 'Baked goods'],
    sources: ['General consensus'],
    datePublished: '2026-01-14'
  },
  {
    code: 'E202',
    name: 'Potassium Sorbate',
    slug: 'e202-potassium-sorbate',
    status: 'halal',
    description: 'Synthetic preservative, salt of sorbic acid.',
    category: 'preservative',
    commonSources: ['Synthetic'],
    foundIn: ['Dried fruits', 'Beverages', 'Margarine'],
    relatedIngredients: ['potassium-sorbate'],
    sources: ['General consensus'],
    datePublished: '2026-01-14'
  },
  {
    code: 'E210',
    name: 'Benzoic Acid',
    slug: 'e210-benzoic-acid',
    status: 'halal',
    description: 'Synthetic preservative.',
    category: 'preservative',
    commonSources: ['Synthetic'],
    foundIn: ['Soft drinks', 'Fruit juices'],
    sources: ['General consensus'],
    datePublished: '2026-01-14'
  },
  {
    code: 'E211',
    name: 'Sodium Benzoate',
    slug: 'e211-sodium-benzoate',
    status: 'halal',
    description: 'Synthetic preservative, sodium salt of benzoic acid.',
    category: 'preservative',
    commonSources: ['Synthetic'],
    foundIn: ['Soft drinks', 'Pickles', 'Sauces'],
    relatedIngredients: ['sodium-benzoate'],
    sources: ['General consensus'],
    datePublished: '2026-01-14'
  },

  // Antioxidants (E300-E399)
  {
    code: 'E300',
    name: 'Ascorbic Acid (Vitamin C)',
    slug: 'e300-ascorbic-acid',
    status: 'halal',
    description: 'Vitamin C, antioxidant.',
    category: 'antioxidant',
    commonSources: ['Synthetic or natural'],
    foundIn: ['Juices', 'Cereals', 'Supplements'],
    relatedIngredients: ['ascorbic-acid'],
    sources: ['General consensus'],
    datePublished: '2026-01-14'
  },
  {
    code: 'E322',
    name: 'Lecithins',
    slug: 'e322-lecithins',
    status: 'depends',
    description: 'Emulsifier from soy, sunflower, or eggs. Verify source.',
    category: 'emulsifier',
    commonSources: ['Soy', 'Sunflower', 'Egg'],
    foundIn: ['Chocolate', 'Margarine', 'Bakery products'],
    relatedIngredients: ['lecithin'],
    sources: ['IFANCA - verify plant/egg source'],
    datePublished: '2026-01-14'
  },
  {
    code: 'E330',
    name: 'Citric Acid',
    slug: 'e330-citric-acid',
    status: 'halal',
    description: 'Acid and preservative from citrus or fermentation.',
    category: 'acid',
    commonSources: ['Citrus fruits', 'Fermentation'],
    foundIn: ['Soft drinks', 'Candies', 'Jams'],
    relatedIngredients: ['citric-acid'],
    sources: ['General consensus'],
    datePublished: '2026-01-14'
  },

  // Thickeners / Stabilizers / Emulsifiers (E400-E499)
  {
    code: 'E412',
    name: 'Guar Gum',
    slug: 'e412-guar-gum',
    status: 'halal',
    description: 'Thickener from guar beans.',
    category: 'thickener',
    commonSources: ['Guar beans'],
    foundIn: ['Ice cream', 'Sauces', 'Baked goods'],
    relatedIngredients: ['guar-gum'],
    sources: ['General consensus'],
    datePublished: '2026-01-14'
  },
  {
    code: 'E415',
    name: 'Xanthan Gum',
    slug: 'e415-xanthan-gum',
    status: 'halal',
    description: 'Thickener from bacterial fermentation.',
    category: 'thickener',
    commonSources: ['Bacterial fermentation'],
    foundIn: ['Gluten-free products', 'Salad dressings'],
    relatedIngredients: ['xanthan-gum'],
    sources: ['IFANCA'],
    datePublished: '2026-01-14'
  },
  {
    code: 'E422',
    name: 'Glycerol / Glycerin',
    slug: 'e422-glycerol',
    status: 'depends',
    description: 'Can be from animal fats or vegetable oils. Verify source.',
    category: 'humectant',
    commonSources: ['Animal fats', 'Vegetable oils'],
    foundIn: ['Baked goods', 'Confectionery', 'Beverages'],
    relatedIngredients: ['glycerin'],
    sources: ['HFA - verify source'],
    datePublished: '2026-01-14'
  },
  {
    code: 'E433',
    name: 'Polysorbate 80',
    slug: 'e433-polysorbate-80',
    status: 'depends',
    description: 'Emulsifier. Verify source fats are halal.',
    category: 'emulsifier',
    commonSources: ['Synthetic from sorbitol and fatty acids'],
    foundIn: ['Ice cream', 'Whipped cream', 'Sauces'],
    relatedIngredients: ['polysorbate-80'],
    sources: ['JAKIM - verify source'],
    datePublished: '2026-01-14'
  },
  {
    code: 'E440',
    name: 'Pectins',
    slug: 'e440-pectins',
    status: 'halal',
    description: 'Thickener from fruit.',
    category: 'thickener',
    commonSources: ['Apples', 'Citrus peels'],
    foundIn: ['Jams', 'Jellies', 'Desserts'],
    relatedIngredients: ['pectin'],
    sources: ['General consensus'],
    datePublished: '2026-01-14'
  },
  {
    code: 'E441',
    name: 'Gelatin',
    slug: 'e441-gelatin',
    status: 'depends',
    description: 'Depends on source and slaughter method. Verify halal certification.',
    category: 'gelling-agent',
    commonSources: ['Pork', 'Beef', 'Fish'],
    foundIn: ['Gummy candies', 'Marshmallows', 'Capsules'],
    relatedIngredients: ['gelatin'],
    sources: ['IFANCA - requires halal certification'],
    datePublished: '2026-01-14'
  },
  {
    code: 'E471',
    name: 'Mono- and Diglycerides of Fatty Acids',
    slug: 'e471-mono-diglycerides',
    status: 'depends',
    description: 'Emulsifier from animal or plant fats. Verify source.',
    category: 'emulsifier',
    commonSources: ['Animal fats', 'Vegetable oils'],
    foundIn: ['Bread', 'Ice cream', 'Margarine'],
    relatedIngredients: ['mono-and-diglycerides'],
    sources: ['HFA - verify source'],
    datePublished: '2026-01-14'
  },
  {
    code: 'E476',
    name: 'Polyglycerol Polyricinoleate',
    slug: 'e476-pgpr',
    status: 'halal',
    description: 'Emulsifier from castor beans. Generally halal.',
    category: 'emulsifier',
    commonSources: ['Castor oil'],
    foundIn: ['Chocolate', 'Confectionery'],
    sources: ['JAKIM'],
    datePublished: '2026-01-14'
  },

  // pH Regulators / Anti-caking (E500-E599)
  {
    code: 'E500',
    name: 'Sodium Carbonates',
    slug: 'e500-sodium-carbonates',
    status: 'halal',
    description: 'Acidity regulator, raising agent.',
    category: 'acidity-regulator',
    commonSources: ['Mineral sources'],
    foundIn: ['Baked goods', 'Baking soda'],
    sources: ['General consensus'],
    datePublished: '2026-01-14'
  },
  {
    code: 'E551',
    name: 'Silicon Dioxide',
    slug: 'e551-silicon-dioxide',
    status: 'halal',
    description: 'Anti-caking agent.',
    category: 'anti-caking',
    commonSources: ['Mineral'],
    foundIn: ['Powdered foods', 'Spices'],
    sources: ['General consensus'],
    datePublished: '2026-01-14'
  },

  // Flavor Enhancers (E600-E699)
  {
    code: 'E621',
    name: 'Monosodium Glutamate (MSG)',
    slug: 'e621-msg',
    status: 'halal',
    description: 'Flavor enhancer from fermentation.',
    category: 'flavor-enhancer',
    commonSources: ['Fermentation'],
    foundIn: ['Savory snacks', 'Asian cuisine', 'Soups'],
    relatedIngredients: ['monosodium-glutamate'],
    sources: ['JAKIM'],
    datePublished: '2026-01-14'
  },

  // Sweeteners (E900-E999)
  {
    code: 'E901',
    name: 'Beeswax',
    slug: 'e901-beeswax',
    status: 'halal',
    description: 'Glazing agent from bees. Generally halal.',
    category: 'glazing-agent',
    commonSources: ['Bees'],
    foundIn: ['Candy coating', 'Fruit polish'],
    relatedIngredients: ['beeswax'],
    sources: ['General consensus'],
    datePublished: '2026-01-14'
  },
  {
    code: 'E904',
    name: 'Shellac',
    slug: 'e904-shellac',
    status: 'doubtful',
    description: 'Glazing agent from lac insect. Scholarly debate.',
    category: 'glazing-agent',
    commonSources: ['Lac insect secretion'],
    foundIn: ['Candy coating', 'Fruit polish', 'Pills'],
    relatedIngredients: ['shellac'],
    sources: ['Various opinions'],
    datePublished: '2026-01-14'
  },
  {
    code: 'E920',
    name: 'L-Cysteine',
    slug: 'e920-l-cysteine',
    status: 'depends',
    description: 'Flour treatment agent. Can be from human hair, duck feathers, or synthetic.',
    category: 'flour-treatment',
    commonSources: ['Human hair', 'Duck feathers', 'Synthetic'],
    foundIn: ['Bread', 'Baked goods'],
    relatedIngredients: ['l-cysteine'],
    sources: ['HMC - verify synthetic source'],
    datePublished: '2026-01-14'
  },
  {
    code: 'E951',
    name: 'Aspartame',
    slug: 'e951-aspartame',
    status: 'halal',
    description: 'Artificial sweetener.',
    category: 'sweetener',
    commonSources: ['Synthetic'],
    foundIn: ['Diet sodas', 'Sugar-free products'],
    relatedIngredients: ['aspartame'],
    sources: ['IFANCA'],
    datePublished: '2026-01-14'
  },
  {
    code: 'E955',
    name: 'Sucralose',
    slug: 'e955-sucralose',
    status: 'halal',
    description: 'Artificial sweetener derived from sugar.',
    category: 'sweetener',
    commonSources: ['Synthetic from sugar'],
    foundIn: ['Diet products', 'Beverages'],
    relatedIngredients: ['sucralose'],
    sources: ['JAKIM'],
    datePublished: '2026-01-14'
  },

  // Additional preservatives
  {
    code: 'E1510',
    name: 'Ethanol',
    slug: 'e1510-ethanol',
    status: 'depends',
    description: 'Solvent. Haram if from fermented grapes/dates. Synthetic may be permissible.',
    category: 'solvent',
    commonSources: ['Fermentation', 'Synthetic'],
    foundIn: ['Vanilla extract', 'Flavor carriers'],
    relatedIngredients: ['ethanol'],
    sources: ['Islamic Fiqh Council - scholarly debate'],
    datePublished: '2026-01-14'
  }
];

// Helper functions
export const getECodeByCode = (code: string): ECode | undefined =>
  eCodes.find(e => e.code.toUpperCase() === code.toUpperCase());

export const getECodeBySlug = (slug: string): ECode | undefined =>
  eCodes.find(e => e.slug === slug);

export const getECodesByStatus = (status: HalalStatus): ECode[] =>
  eCodes.filter(e => e.status === status);

export const getECodesByCategory = (category: string): ECode[] =>
  eCodes.filter(e => e.category === category);

export const searchECodes = (query: string): ECode[] => {
  const lowerQuery = query.toLowerCase();
  return eCodes.filter(
    e =>
      e.code.toLowerCase().includes(lowerQuery) ||
      e.name.toLowerCase().includes(lowerQuery) ||
      e.description.toLowerCase().includes(lowerQuery)
  );
};

export const getControversialECodes = (): ECode[] =>
  eCodes.filter(e => e.status === 'doubtful' || e.status === 'depends');
