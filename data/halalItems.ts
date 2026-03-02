export type HalalItem = {
  slug: string;
  name: string;
  aliases?: string[];
  verdict: 'halal' | 'haram' | 'doubtful';
  shortReason: string;
  detailedReason: string;
  category: 'ingredient' | 'snack' | 'drink' | 'additive' | 'cosmetics' | 'fast-food' | 'other';
  priority?: 'high' | 'normal';
};

export const halalItems: HalalItem[] = [
  {
    slug: "is-doritos-halal",
    name: "Doritos (Nacho Cheese)",
    aliases: [
      "doritos",
      "doritos nacho cheese"
    ],
    verdict: "doubtful",
    shortReason: "Contains animal enzymes (rennet) in some regions, while in others it uses microbial rennet.",
    detailedReason: "### What is it?\nDoritos (Nacho Cheese) is a popular snack.\n\n### Why it may be doubtful\nThe halal status of Doritos depends heavily on the country of manufacture. In the US, Frito-Lay has stated that Doritos Nacho Cheese contains animal enzymes (porcine or bovine). In Muslim-majority countries or regions with specific halal certifications, microbial rennet is used. Always check for a local halal certification mark.\n\n### Fiqh considerations\nGeneral Islamic dietary principles require that ingredients be free from non-Zabiha meat, insects, and intoxicating alcohol.\n\n### Practical advice\nAlways read the latest ingredient label or use the AllHalal scanner app, as manufacturers frequently change their recipes. Look for certified vegan or halal symbols where possible.",
    category: "snack",
    priority: "high"
  },
  {
    slug: "is-skittles-halal",
    name: "Skittles",
    aliases: [
      "skittles original"
    ],
    verdict: "halal",
    shortReason: "Skittles are fully plant-based and do not contain gelatin or carmine.",
    detailedReason: "### What is it?\nSkittles is a popular snack.\n\n### Why it may be halal\nSkittles used to contain gelatin, but Wrigley removed it several years ago. They are now considered vegan-friendly and halal, as they do not contain any animal-derived ingredients, including carmine (E120).\n\n### Fiqh considerations\nGeneral Islamic dietary principles require that ingredients be free from non-Zabiha meat, insects, and intoxicating alcohol.\n\n### Practical advice\nAlways read the latest ingredient label or use the AllHalal scanner app, as manufacturers frequently change their recipes. Look for certified vegan or halal symbols where possible.",
    category: "snack",
    priority: "high"
  },
  {
    slug: "is-nutella-halal",
    name: "Nutella",
    aliases: [
      "nutella spread",
      "ferrero nutella"
    ],
    verdict: "halal",
    shortReason: "Nutella is certified halal in many countries and contains permissible ingredients.",
    detailedReason: "### What is it?\nNutella is a popular snack.\n\n### Why it may be halal\nNutella is made from sugar, palm oil, hazelnuts, cocoa, milk powder, lecithin (soy), and vanillin. The whey powder and milk products used are sourced from halal-compliant processes. Ferrero has confirmed that Nutella sold worldwide is suitable for halal consumption, with many factories being officially certified.\n\n### Fiqh considerations\nGeneral Islamic dietary principles require that ingredients be free from non-Zabiha meat, insects, and intoxicating alcohol.\n\n### Practical advice\nAlways read the latest ingredient label or use the AllHalal scanner app, as manufacturers frequently change their recipes. Look for certified vegan or halal symbols where possible.",
    category: "snack",
    priority: "normal"
  },
  {
    slug: "is-oreo-halal",
    name: "Oreo Cookies",
    aliases: [
      "oreos",
      "oreo original"
    ],
    verdict: "halal",
    shortReason: "Standard Oreos do not contain animal ingredients or alcohol.",
    detailedReason: "### What is it?\nOreo Cookies is a popular snack.\n\n### Why it may be halal\nMondelez, the maker of Oreos, has confirmed that the original Oreo cookies do not contain any animal-derived ingredients. While they might not carry a halal certification in every country (like the US or UK), the ingredients themselves are permissible (halal). However, cross-contamination with dairy is possible.\n\n### Fiqh considerations\nGeneral Islamic dietary principles require that ingredients be free from non-Zabiha meat, insects, and intoxicating alcohol.\n\n### Practical advice\nAlways read the latest ingredient label or use the AllHalal scanner app, as manufacturers frequently change their recipes. Look for certified vegan or halal symbols where possible.",
    category: "snack",
    priority: "high"
  },
  {
    slug: "is-red-bull-halal",
    name: "Red Bull Energy Drink",
    aliases: [
      "redbull"
    ],
    verdict: "halal",
    shortReason: "Red Bull uses synthetic taurine and is free from alcohol and animal products.",
    detailedReason: "### What is it?\nRed Bull Energy Drink is a popular drink.\n\n### Why it may be halal\nRed Bull uses synthetic taurine, not animal-derived taurine. It is free from alcohol and animal products. Therefore, it is considered halal to consume globally.\n\n### Fiqh considerations\nGeneral Islamic dietary principles require that ingredients be free from non-Zabiha meat, insects, and intoxicating alcohol.\n\n### Practical advice\nAlways read the latest ingredient label or use the AllHalal scanner app, as manufacturers frequently change their recipes. Look for certified vegan or halal symbols where possible.",
    category: "drink",
    priority: "high"
  },
  {
    slug: "is-gelatin-halal",
    name: "Gelatin",
    aliases: [
      "gelatine",
      "bovine gelatin",
      "porcine gelatin"
    ],
    verdict: "doubtful",
    shortReason: "Gelatin can be sourced from both halal and haram animals. Must be verified.",
    detailedReason: "### What is it?\nGelatin is a popular ingredient.\n\n### Why it may be doubtful\nGelatin is a protein obtained by boiling skin, tendons, ligaments, and/or bones with water. If it is sourced from a pig, it is haram. If it is sourced from a halal animal slaughtered according to Islamic law (zabiha), it is halal. Plant-based (agar-agar, pectin) or fish gelatin is always halal.\n\n### Fiqh considerations\nGeneral Islamic dietary principles require that ingredients be free from non-Zabiha meat, insects, and intoxicating alcohol.\n\n### Practical advice\nAlways read the latest ingredient label or use the AllHalal scanner app, as manufacturers frequently change their recipes. Look for certified vegan or halal symbols where possible.",
    category: "ingredient",
    priority: "high"
  },
  {
    slug: "is-carmine-halal",
    name: "Carmine (E120)",
    aliases: [
      "e120",
      "cochineal",
      "natural red 4"
    ],
    verdict: "doubtful",
    shortReason: "Carmine is derived from crushed insects. Scholars differ on its permissibility.",
    detailedReason: "### What is it?\nCarmine (E120) is a popular additive.\n\n### Why it may be doubtful\nCarmine is a red dye extracted from crushed cochineal insects. According to the Hanafi madhhab, consuming insects is not permissible, making carmine haram. The Maliki, Shafii, and Hanbali madhhabs have differing views, with some allowing it. Best to avoid if following Hanafi rulings.\n\n### Fiqh considerations\nThere are varying scholarly opinions on some of the underlying ingredients, particularly depending on your madhhab.\n\n### Practical advice\nAlways read the latest ingredient label or use the AllHalal scanner app, as manufacturers frequently change their recipes. Look for certified vegan or halal symbols where possible.",
    category: "additive",
    priority: "high"
  },
  {
    slug: "is-whey-halal",
    name: "Whey / Whey Protein",
    aliases: [
      "whey powder",
      "milk whey"
    ],
    verdict: "doubtful",
    shortReason: "Whey is halal if the rennet used to curdle the milk is microbial or from a halal-slaughtered animal.",
    detailedReason: "### What is it?\nWhey / Whey Protein is a popular ingredient.\n\n### Why it may be doubtful\nWhey is the liquid remaining after milk has been curdled. The process requires rennet. If microbial or plant-based rennet is used, it is 100% halal. If animal rennet is used, the animal must be halal-slaughtered. Always look for a halal certification or vegetarian label.\n\n### Fiqh considerations\nGeneral Islamic dietary principles require that ingredients be free from non-Zabiha meat, insects, and intoxicating alcohol.\n\n### Practical advice\nAlways read the latest ingredient label or use the AllHalal scanner app, as manufacturers frequently change their recipes. Look for certified vegan or halal symbols where possible.",
    category: "ingredient",
    priority: "normal"
  },
  {
    slug: "is-vanilla-extract-halal",
    name: "Vanilla Extract",
    aliases: [
      "pure vanilla extract"
    ],
    verdict: "doubtful",
    shortReason: "Pure vanilla extract contains at least 35% alcohol, making it disputed.",
    detailedReason: "### What is it?\nVanilla Extract is a popular ingredient.\n\n### Why it may be doubtful\nBy FDA definition, pure vanilla extract must contain at least 35% alcohol. Many scholars consider this haram due to the high alcohol content. Vanilla flavoring or imitation vanilla without alcohol is fully halal.\n\n### Fiqh considerations\nThere are varying scholarly opinions on some of the underlying ingredients, particularly depending on your madhhab.\n\n### Practical advice\nAlways read the latest ingredient label or use the AllHalal scanner app, as manufacturers frequently change their recipes. Look for certified vegan or halal symbols where possible.",
    category: "ingredient",
    priority: "normal"
  },
  {
    slug: "is-e471-halal",
    name: "E471 (Mono- and diglycerides)",
    aliases: [
      "e471",
      "emulsifier e471"
    ],
    verdict: "doubtful",
    shortReason: "E471 can be from plant or animal fats. It is halal if plant-based.",
    detailedReason: "### What is it?\nE471 (Mono- and diglycerides) is a popular additive.\n\n### Why it may be doubtful\nE471 is an emulsifier made from fats. If the source is plant-based (like soy or palm oil), it is completely halal. If the source is animal fat, it is haram unless the animal was slaughtered according to Islamic law. Look for \"suitable for vegetarians\" to be safe.\n\n### Fiqh considerations\nGeneral Islamic dietary principles require that ingredients be free from non-Zabiha meat, insects, and intoxicating alcohol.\n\n### Practical advice\nAlways read the latest ingredient label or use the AllHalal scanner app, as manufacturers frequently change their recipes. Look for certified vegan or halal symbols where possible.",
    category: "additive",
    priority: "high"
  },
  {
    slug: "is-shellac-halal",
    name: "Shellac (E904)",
    aliases: [
      "e904",
      "confectioners glaze"
    ],
    verdict: "halal",
    shortReason: "Shellac is a resin secreted by the lac bug, not the bug itself. Widely considered halal.",
    detailedReason: "### What is it?\nShellac (E904) is a popular additive.\n\n### Why it may be halal\nShellac is used as a glazing agent on pills and candies. Because it is an excretion of the insect (like honey from bees) and not the crushed insect itself, most Islamic scholars consider it halal.\n\n### Fiqh considerations\nThere are varying scholarly opinions on some of the underlying ingredients, particularly depending on your madhhab.\n\n### Practical advice\nAlways read the latest ingredient label or use the AllHalal scanner app, as manufacturers frequently change their recipes. Look for certified vegan or halal symbols where possible.",
    category: "additive",
    priority: "high"
  },
  {
    slug: "is-coca-cola-halal",
    name: "Coca-Cola",
    aliases: [
      "coke",
      "diet coke",
      "coca cola"
    ],
    verdict: "halal",
    shortReason: "Coca-Cola does not contain animal products and is considered halal.",
    detailedReason: "### What is it?\nCoca-Cola is a popular drink.\n\n### Why it may be halal\nCoca-Cola is recognized as halal globally. The ingredients are water, sugar, carbon dioxide, caramel color, phosphoric acid, natural flavorings, and caffeine. The trace amounts of alcohol used in flavor extraction evaporate and are considered negligible by most Islamic authorities.\n\n### Fiqh considerations\nGeneral Islamic dietary principles require that ingredients be free from non-Zabiha meat, insects, and intoxicating alcohol.\n\n### Practical advice\nAlways read the latest ingredient label or use the AllHalal scanner app, as manufacturers frequently change their recipes. Look for certified vegan or halal symbols where possible.",
    category: "drink",
    priority: "high"
  },
  {
    slug: "is-mcdonalds-fries-halal",
    name: "McDonald's French Fries",
    aliases: [
      "mcdonalds fries",
      "macca fries"
    ],
    verdict: "doubtful",
    shortReason: "Depends on the country. In the US, they contain natural beef flavoring.",
    detailedReason: "### What is it?\nMcDonald's French Fries is a popular fast-food.\n\n### Why it may be doubtful\nIn the US, McDonalds fries contain \"Natural Beef Flavor\" which includes hydrolyzed wheat and hydrolyzed milk as starting ingredients, but is not considered halal. In the UK, Canada, and Muslim-majority countries, the fries are cooked in dedicated vegetable oil and are considered halal or vegetarian.\n\n### Fiqh considerations\nGeneral Islamic dietary principles require that ingredients be free from non-Zabiha meat, insects, and intoxicating alcohol.\n\n### Practical advice\nAlways read the latest ingredient label or use the AllHalal scanner app, as manufacturers frequently change their recipes. Look for certified vegan or halal symbols where possible.",
    category: "fast-food",
    priority: "high"
  },
  {
    slug: "is-pepsi-halal",
    name: "Pepsi",
    aliases: [
      "pepsi cola"
    ],
    verdict: "halal",
    shortReason: "Pepsi is free of animal products and haram ingredients.",
    detailedReason: "### What is it?\nPepsi is a popular drink.\n\n### Why it may be halal\nLike Coca-Cola, Pepsis ingredients are entirely synthetic or plant-derived. It does not contain any animal products or intoxicating levels of alcohol.\n\n### Fiqh considerations\nGeneral Islamic dietary principles require that ingredients be free from non-Zabiha meat, insects, and intoxicating alcohol.\n\n### Practical advice\nAlways read the latest ingredient label or use the AllHalal scanner app, as manufacturers frequently change their recipes. Look for certified vegan or halal symbols where possible.",
    category: "drink",
    priority: "high"
  },
  {
    slug: "is-glycerin-halal",
    name: "Glycerin / Glycerol (E422)",
    aliases: [
      "e422",
      "glycerine",
      "glycerol"
    ],
    verdict: "doubtful",
    shortReason: "Can be derived from plants, animals, or synthetic sources.",
    detailedReason: "### What is it?\nGlycerin / Glycerol (E422) is a popular additive.\n\n### Why it may be doubtful\nIf the glycerin is sourced from plants (vegetable glycerin) or is synthetically made, it is halal. If derived from animal fats (like tallow), it is haram unless the animal was halal-slaughtered. Always verify the source or look for a vegan/halal mark.\n\n### Fiqh considerations\nGeneral Islamic dietary principles require that ingredients be free from non-Zabiha meat, insects, and intoxicating alcohol.\n\n### Practical advice\nAlways read the latest ingredient label or use the AllHalal scanner app, as manufacturers frequently change their recipes. Look for certified vegan or halal symbols where possible.",
    category: "additive",
    priority: "normal"
  },
  {
    slug: "is-takis-halal",
    name: "Takis Fuego",
    aliases: [
      "takis"
    ],
    verdict: "doubtful",
    shortReason: "May contain animal enzymes in some regions.",
    detailedReason: "### What is it?\nTakis Fuego is a popular snack.\n\n### Why it may be doubtful\nIn the US and Canada, Takis Fuego may contain enzymes derived from animal sources in the cheese seasoning. In Muslim-majority countries or regions with specific halal certifications, they are typically safe. Always look for a local halal mark or check with the regional distributor.\n\n### Fiqh considerations\nGeneral Islamic dietary principles require that ingredients be free from non-Zabiha meat, insects, and intoxicating alcohol.\n\n### Practical advice\nAlways read the latest ingredient label or use the AllHalal scanner app, as manufacturers frequently change their recipes. Look for certified vegan or halal symbols where possible.",
    category: "snack",
    priority: "high"
  },
  {
    slug: "is-cheetos-halal",
    name: "Cheetos",
    aliases: [
      "flamin hot cheetos"
    ],
    verdict: "doubtful",
    shortReason: "Often contain animal enzymes in the US.",
    detailedReason: "### What is it?\nCheetos is a popular snack.\n\n### Why it may be doubtful\nFrito-Lay has stated that many Cheetos flavors in the US contain enzymes from porcine (pork) or bovine (beef) sources to develop the cheese flavor. In the UK (suitable for vegetarians) and Muslim countries, they are generally halal.\n\n### Fiqh considerations\nGeneral Islamic dietary principles require that ingredients be free from non-Zabiha meat, insects, and intoxicating alcohol.\n\n### Practical advice\nAlways read the latest ingredient label or use the AllHalal scanner app, as manufacturers frequently change their recipes. Look for certified vegan or halal symbols where possible.",
    category: "snack",
    priority: "high"
  },
  {
    slug: "is-pringles-halal",
    name: "Pringles",
    aliases: [
      "pringles sour cream"
    ],
    verdict: "doubtful",
    shortReason: "Original is halal, but cheese/sour cream flavors may contain animal rennet.",
    detailedReason: "### What is it?\nPringles is a popular snack.\n\n### Why it may be doubtful\nPringles Original is vegan and halal. However, flavors containing whey, cheese, or sour cream might use animal-derived rennet in the cheese-making process depending on the country of manufacture.\n\n### Fiqh considerations\nGeneral Islamic dietary principles require that ingredients be free from non-Zabiha meat, insects, and intoxicating alcohol.\n\n### Practical advice\nAlways read the latest ingredient label or use the AllHalal scanner app, as manufacturers frequently change their recipes. Look for certified vegan or halal symbols where possible.",
    category: "snack",
    priority: "high"
  },
  {
    slug: "is-snickers-halal",
    name: "Snickers",
    aliases: [
      "snickers bar"
    ],
    verdict: "halal",
    shortReason: "Contains whey, but Mars has confirmed their whey is halal-suitable in many regions.",
    detailedReason: "### What is it?\nSnickers is a popular snack.\n\n### Why it may be halal\nSnickers contains milk, egg, and whey. Mars Wrigley has confirmed that the whey used in Snickers in the UK, Europe, and many other regions is from vegetarian sources. It is certified halal in many countries.\n\n### Fiqh considerations\nGeneral Islamic dietary principles require that ingredients be free from non-Zabiha meat, insects, and intoxicating alcohol.\n\n### Practical advice\nAlways read the latest ingredient label or use the AllHalal scanner app, as manufacturers frequently change their recipes. Look for certified vegan or halal symbols where possible.",
    category: "snack",
    priority: "normal"
  },
  {
    slug: "is-mms-halal",
    name: "M&M's",
    aliases: [
      "m and ms",
      "m&ms"
    ],
    verdict: "doubtful",
    shortReason: "Colors and additives vary by region (some contain carmine).",
    detailedReason: "### What is it?\nM&M's is a popular snack.\n\n### Why it may be doubtful\nIn the UK and Europe, M&Ms are not halal certified and may contain additives derived from animal sources (like carmine/E120 for coloring, though this is rare now). In Muslim countries, they are strictly halal. Check the label for carmine or non-vegetarian whey.\n\n### Fiqh considerations\nGeneral Islamic dietary principles require that ingredients be free from non-Zabiha meat, insects, and intoxicating alcohol.\n\n### Practical advice\nAlways read the latest ingredient label or use the AllHalal scanner app, as manufacturers frequently change their recipes. Look for certified vegan or halal symbols where possible.",
    category: "snack",
    priority: "high"
  },
  {
    slug: "is-toblerone-halal",
    name: "Toblerone",
    aliases: [
      "toblerone chocolate"
    ],
    verdict: "halal",
    shortReason: "Certified halal by its manufacturer.",
    detailedReason: "### What is it?\nToblerone is a popular snack.\n\n### Why it may be halal\nMondelez International has confirmed that Toblerone produced in its factory in Bern, Switzerland, is halal. The ingredients (sugar, whole milk powder, cocoa butter, honey, milk fat, almonds) are all permissible.\n\n### Fiqh considerations\nGeneral Islamic dietary principles require that ingredients be free from non-Zabiha meat, insects, and intoxicating alcohol.\n\n### Practical advice\nAlways read the latest ingredient label or use the AllHalal scanner app, as manufacturers frequently change their recipes. Look for certified vegan or halal symbols where possible.",
    category: "snack",
    priority: "normal"
  },
  {
    slug: "is-haribo-halal",
    name: "Haribo Goldbears",
    aliases: [
      "haribo gummy bears"
    ],
    verdict: "doubtful",
    shortReason: "Standard version contains pork gelatin. Turkish version is halal.",
    detailedReason: "### What is it?\nHaribo Goldbears is a popular snack.\n\n### Why it may be doubtful\nStandard Haribo gummies sold in the US, UK, and Europe usually contain porcine (pork) gelatin, making them strictly haram. Haribo produced in Turkey uses halal bovine (beef) gelatin and is clearly marked with a halal certification on the package.\n\n### Fiqh considerations\nGeneral Islamic dietary principles require that ingredients be free from non-Zabiha meat, insects, and intoxicating alcohol.\n\n### Practical advice\nAlways read the latest ingredient label or use the AllHalal scanner app, as manufacturers frequently change their recipes. Look for certified vegan or halal symbols where possible.",
    category: "snack",
    priority: "high"
  },
  {
    slug: "is-sour-patch-kids-halal",
    name: "Sour Patch Kids",
    aliases: [
      "sour patch"
    ],
    verdict: "halal",
    shortReason: "Does not contain gelatin or animal products.",
    detailedReason: "### What is it?\nSour Patch Kids is a popular snack.\n\n### Why it may be halal\nUnlike many gummy candies, Sour Patch Kids use corn starch and modified starch to achieve their chewy texture instead of gelatin. They are generally considered vegan and halal.\n\n### Fiqh considerations\nGeneral Islamic dietary principles require that ingredients be free from non-Zabiha meat, insects, and intoxicating alcohol.\n\n### Practical advice\nAlways read the latest ingredient label or use the AllHalal scanner app, as manufacturers frequently change their recipes. Look for certified vegan or halal symbols where possible.",
    category: "snack",
    priority: "normal"
  },
  {
    slug: "is-kitkat-halal",
    name: "KitKat",
    aliases: [
      "kit kat"
    ],
    verdict: "halal",
    shortReason: "Ingredients are permissible; halal-certified in many regions.",
    detailedReason: "### What is it?\nKitKat is a popular snack.\n\n### Why it may be halal\nNestle has confirmed that KitKat is suitable for a halal diet. The ingredients do not contain any animal products other than milk. It holds official halal certification in many global markets.\n\n### Fiqh considerations\nGeneral Islamic dietary principles require that ingredients be free from non-Zabiha meat, insects, and intoxicating alcohol.\n\n### Practical advice\nAlways read the latest ingredient label or use the AllHalal scanner app, as manufacturers frequently change their recipes. Look for certified vegan or halal symbols where possible.",
    category: "snack",
    priority: "normal"
  },
  {
    slug: "is-starburst-halal",
    name: "Starburst",
    aliases: [
      "starbursts"
    ],
    verdict: "doubtful",
    shortReason: "US version contains beef/pork gelatin. UK version is often gelatin-free.",
    detailedReason: "### What is it?\nStarburst is a popular snack.\n\n### Why it may be doubtful\nIn the United States, Starburst candies contain gelatin derived from beef or pork, making them haram or doubtful. In the UK, Mars reformulated them to be gelatin-free, making them suitable for vegetarians and halal.\n\n### Fiqh considerations\nGeneral Islamic dietary principles require that ingredients be free from non-Zabiha meat, insects, and intoxicating alcohol.\n\n### Practical advice\nAlways read the latest ingredient label or use the AllHalal scanner app, as manufacturers frequently change their recipes. Look for certified vegan or halal symbols where possible.",
    category: "snack",
    priority: "normal"
  },
  {
    slug: "is-bounty-halal",
    name: "Bounty",
    aliases: [
      "bounty bar"
    ],
    verdict: "halal",
    shortReason: "Suitable for vegetarians and contains permissible ingredients.",
    detailedReason: "### What is it?\nBounty is a popular snack.\n\n### Why it may be halal\nBounty bars are made of coconut, sugar, and milk chocolate. They do not contain any animal-derived additives (other than dairy) or alcohol. They are halal.\n\n### Fiqh considerations\nGeneral Islamic dietary principles require that ingredients be free from non-Zabiha meat, insects, and intoxicating alcohol.\n\n### Practical advice\nAlways read the latest ingredient label or use the AllHalal scanner app, as manufacturers frequently change their recipes. Look for certified vegan or halal symbols where possible.",
    category: "snack",
    priority: "normal"
  },
  {
    slug: "is-lindt-halal",
    name: "Lindt Chocolate",
    aliases: [
      "lindor truffles"
    ],
    verdict: "halal",
    shortReason: "Most solid and truffle chocolates are halal.",
    detailedReason: "### What is it?\nLindt Chocolate is a popular snack.\n\n### Why it may be halal\nLindt & Sprüngli states that their solid chocolates and Lindor truffles do not contain animal products other than milk/dairy. However, some specific filled chocolates might contain alcohol (liqueur), which is clearly stated on the label.\n\n### Fiqh considerations\nGeneral Islamic dietary principles require that ingredients be free from non-Zabiha meat, insects, and intoxicating alcohol.\n\n### Practical advice\nAlways read the latest ingredient label or use the AllHalal scanner app, as manufacturers frequently change their recipes. Look for certified vegan or halal symbols where possible.",
    category: "snack",
    priority: "normal"
  },
  {
    slug: "is-monster-energy-halal",
    name: "Monster Energy",
    aliases: [
      "monster drink"
    ],
    verdict: "halal",
    shortReason: "Taurine is synthetic; no animal products used.",
    detailedReason: "### What is it?\nMonster Energy is a popular drink.\n\n### Why it may be halal\nMonster Energy uses synthetic taurine, not animal-derived. The drink does not contain any alcohol or animal products. It is considered halal.\n\n### Fiqh considerations\nGeneral Islamic dietary principles require that ingredients be free from non-Zabiha meat, insects, and intoxicating alcohol.\n\n### Practical advice\nAlways read the latest ingredient label or use the AllHalal scanner app, as manufacturers frequently change their recipes. Look for certified vegan or halal symbols where possible.",
    category: "drink",
    priority: "high"
  },
  {
    slug: "is-gatorade-halal",
    name: "Gatorade",
    aliases: [
      "gatorade thirst quencher"
    ],
    verdict: "halal",
    shortReason: "Contains no animal ingredients.",
    detailedReason: "### What is it?\nGatorade is a popular drink.\n\n### Why it may be halal\nGatorade is a sports drink made primarily of water, sugar, electrolytes, and synthetic flavorings/colorings. It is considered halal.\n\n### Fiqh considerations\nGeneral Islamic dietary principles require that ingredients be free from non-Zabiha meat, insects, and intoxicating alcohol.\n\n### Practical advice\nAlways read the latest ingredient label or use the AllHalal scanner app, as manufacturers frequently change their recipes. Look for certified vegan or halal symbols where possible.",
    category: "drink",
    priority: "normal"
  },
  {
    slug: "is-sprite-halal",
    name: "Sprite",
    aliases: [],
    verdict: "halal",
    shortReason: "Plant-based and synthetic ingredients only.",
    detailedReason: "### What is it?\nSprite is a popular drink.\n\n### Why it may be halal\nSprite is manufactured by Coca-Cola and contains carbonated water, high fructose corn syrup, citric acid, natural flavors, and sodium citrate. It is halal.\n\n### Fiqh considerations\nGeneral Islamic dietary principles require that ingredients be free from non-Zabiha meat, insects, and intoxicating alcohol.\n\n### Practical advice\nAlways read the latest ingredient label or use the AllHalal scanner app, as manufacturers frequently change their recipes. Look for certified vegan or halal symbols where possible.",
    category: "drink",
    priority: "normal"
  },
  {
    slug: "is-dr-pepper-halal",
    name: "Dr Pepper",
    aliases: [],
    verdict: "halal",
    shortReason: "No animal products or alcohol.",
    detailedReason: "### What is it?\nDr Pepper is a popular drink.\n\n### Why it may be halal\nDr Pepper is considered halal. The flavorings used do not contain animal products or intoxicating alcohol.\n\n### Fiqh considerations\nGeneral Islamic dietary principles require that ingredients be free from non-Zabiha meat, insects, and intoxicating alcohol.\n\n### Practical advice\nAlways read the latest ingredient label or use the AllHalal scanner app, as manufacturers frequently change their recipes. Look for certified vegan or halal symbols where possible.",
    category: "drink",
    priority: "normal"
  },
  {
    slug: "is-mountain-dew-halal",
    name: "Mountain Dew",
    aliases: [
      "mtn dew"
    ],
    verdict: "halal",
    shortReason: "Synthetic and plant-based ingredients.",
    detailedReason: "### What is it?\nMountain Dew is a popular drink.\n\n### Why it may be halal\nMountain Dew is considered halal. It contains no animal products. The colorings (like Yellow 5) are synthetic.\n\n### Fiqh considerations\nGeneral Islamic dietary principles require that ingredients be free from non-Zabiha meat, insects, and intoxicating alcohol.\n\n### Practical advice\nAlways read the latest ingredient label or use the AllHalal scanner app, as manufacturers frequently change their recipes. Look for certified vegan or halal symbols where possible.",
    category: "drink",
    priority: "normal"
  },
  {
    slug: "is-kombucha-halal",
    name: "Kombucha",
    aliases: [
      "fermented tea"
    ],
    verdict: "doubtful",
    shortReason: "Fermented tea that naturally produces trace amounts of alcohol.",
    detailedReason: "### What is it?\nKombucha is a popular drink.\n\n### Why it may be doubtful\nKombucha is fermented tea. The fermentation process naturally produces trace amounts of alcohol (usually under 0.5%). Scholars differ: some say trace amounts that cannot intoxicate are permissible, while others say it should be avoided. Commercial kombucha often controls alcohol levels strictly to be sold as non-alcoholic.\n\n### Fiqh considerations\nThere are varying scholarly opinions on some of the underlying ingredients, particularly depending on your madhhab.\n\n### Practical advice\nAlways read the latest ingredient label or use the AllHalal scanner app, as manufacturers frequently change their recipes. Look for certified vegan or halal symbols where possible.",
    category: "drink",
    priority: "normal"
  },
  {
    slug: "is-starbucks-frappuccino-halal",
    name: "Starbucks Bottled Frappuccino",
    aliases: [
      "starbucks coffee"
    ],
    verdict: "doubtful",
    shortReason: "May contain carmine (in Strawberry flavors) or doubtful emulsifiers.",
    detailedReason: "### What is it?\nStarbucks Bottled Frappuccino is a popular drink.\n\n### Why it may be doubtful\nThe standard coffee and mocha bottled Frappuccinos are generally halal (coffee, milk, sugar). However, strawberry-flavored drinks have historically used carmine (E120) for color. Always check the label.\n\n### Fiqh considerations\nGeneral Islamic dietary principles require that ingredients be free from non-Zabiha meat, insects, and intoxicating alcohol.\n\n### Practical advice\nAlways read the latest ingredient label or use the AllHalal scanner app, as manufacturers frequently change their recipes. Look for certified vegan or halal symbols where possible.",
    category: "drink",
    priority: "high"
  },
  {
    slug: "is-e472-halal",
    name: "E472 (a-f)",
    aliases: [
      "DATEM",
      "e472e"
    ],
    verdict: "doubtful",
    shortReason: "Can be from plant or animal fats.",
    detailedReason: "### What is it?\nE472 (a-f) is a popular additive.\n\n### Why it may be doubtful\nE472 refers to various esters of mono- and diglycerides of fatty acids (like DATEM). The fatty acids can be derived from plant oils (halal) or animal fats (haram if not zabiha). Look for a \"suitable for vegetarians\" label to ensure it is plant-based.\n\n### Fiqh considerations\nGeneral Islamic dietary principles require that ingredients be free from non-Zabiha meat, insects, and intoxicating alcohol.\n\n### Practical advice\nAlways read the latest ingredient label or use the AllHalal scanner app, as manufacturers frequently change their recipes. Look for certified vegan or halal symbols where possible.",
    category: "additive",
    priority: "normal"
  },
  {
    slug: "is-e631-halal",
    name: "E631 (Disodium Inosinate)",
    aliases: [
      "e631"
    ],
    verdict: "doubtful",
    shortReason: "Flavor enhancer that can be from meat or plants.",
    detailedReason: "### What is it?\nE631 (Disodium Inosinate) is a popular additive.\n\n### Why it may be doubtful\nE631 is often derived from tapioca starch (halal) but can also be extracted from meat, including pork, or fish. It is widely used in instant noodles and chips. Verify the source or look for vegetarian labeling.\n\n### Fiqh considerations\nGeneral Islamic dietary principles require that ingredients be free from non-Zabiha meat, insects, and intoxicating alcohol.\n\n### Practical advice\nAlways read the latest ingredient label or use the AllHalal scanner app, as manufacturers frequently change their recipes. Look for certified vegan or halal symbols where possible.",
    category: "additive",
    priority: "normal"
  },
  {
    slug: "is-pepsin-halal",
    name: "Pepsin",
    aliases: [
      "digestive enzyme"
    ],
    verdict: "haram",
    shortReason: "An enzyme almost exclusively derived from pigs.",
    detailedReason: "### What is it?\nPepsin is a popular ingredient.\n\n### Why it may be haram\nPepsin is an enzyme used in cheese making and some dietary supplements. Commercially, it is almost exclusively extracted from the stomachs of pigs, making it strictly haram.\n\n### Fiqh considerations\nGeneral Islamic dietary principles require that ingredients be free from non-Zabiha meat, insects, and intoxicating alcohol.\n\n### Practical advice\nAlways read the latest ingredient label or use the AllHalal scanner app, as manufacturers frequently change their recipes. Look for certified vegan or halal symbols where possible.",
    category: "ingredient",
    priority: "high"
  },
  {
    slug: "is-rennet-halal",
    name: "Rennet",
    aliases: [
      "animal rennet",
      "cheese rennet"
    ],
    verdict: "doubtful",
    shortReason: "Animal rennet must be from halal-slaughtered animals. Microbial rennet is halal.",
    detailedReason: "### What is it?\nRennet is a popular ingredient.\n\n### Why it may be doubtful\nRennet is used to curdle milk for cheese. \"Animal rennet\" from calves/cows is only halal if the animal was slaughtered Islamically. \"Microbial rennet\" or \"Plant rennet\" is 100% halal. Always check cheese labels.\n\n### Fiqh considerations\nGeneral Islamic dietary principles require that ingredients be free from non-Zabiha meat, insects, and intoxicating alcohol.\n\n### Practical advice\nAlways read the latest ingredient label or use the AllHalal scanner app, as manufacturers frequently change their recipes. Look for certified vegan or halal symbols where possible.",
    category: "ingredient",
    priority: "high"
  },
  {
    slug: "is-agar-agar-halal",
    name: "Agar-Agar",
    aliases: [
      "agar",
      "e406"
    ],
    verdict: "halal",
    shortReason: "A plant-based alternative to gelatin.",
    detailedReason: "### What is it?\nAgar-Agar is a popular ingredient.\n\n### Why it may be halal\nAgar-agar is a jelly-like substance obtained from red algae (seaweed). It is 100% plant-based, vegan, and halal.\n\n### Fiqh considerations\nGeneral Islamic dietary principles require that ingredients be free from non-Zabiha meat, insects, and intoxicating alcohol.\n\n### Practical advice\nAlways read the latest ingredient label or use the AllHalal scanner app, as manufacturers frequently change their recipes. Look for certified vegan or halal symbols where possible.",
    category: "ingredient",
    priority: "normal"
  },
  {
    slug: "is-pectin-halal",
    name: "Pectin (E440)",
    aliases: [
      "e440"
    ],
    verdict: "halal",
    shortReason: "A plant-based gelling agent.",
    detailedReason: "### What is it?\nPectin (E440) is a popular ingredient.\n\n### Why it may be halal\nPectin is a carbohydrate extracted from fruits (like apples or citrus peels) used to set jams and jellies. It is entirely plant-based and halal.\n\n### Fiqh considerations\nGeneral Islamic dietary principles require that ingredients be free from non-Zabiha meat, insects, and intoxicating alcohol.\n\n### Practical advice\nAlways read the latest ingredient label or use the AllHalal scanner app, as manufacturers frequently change their recipes. Look for certified vegan or halal symbols where possible.",
    category: "ingredient",
    priority: "normal"
  },
  {
    slug: "is-civet-halal",
    name: "Civet Extract (Kopi Luwak)",
    aliases: [
      "civet coffee",
      "kopi luwak"
    ],
    verdict: "doubtful",
    shortReason: "Coffee beans excreted by an animal. Requires thorough washing.",
    detailedReason: "### What is it?\nCivet Extract (Kopi Luwak) is a popular ingredient.\n\n### Why it may be doubtful\nKopi Luwak is coffee made from beans eaten and excreted by the Asian palm civet. Scholars rule that if the bean remains intact and is thoroughly washed to remove impurity (najasah), it is permissible to consume.\n\n### Fiqh considerations\nThere are varying scholarly opinions on some of the underlying ingredients, particularly depending on your madhhab.\n\n### Practical advice\nAlways read the latest ingredient label or use the AllHalal scanner app, as manufacturers frequently change their recipes. Look for certified vegan or halal symbols where possible.",
    category: "ingredient",
    priority: "normal"
  },
  {
    slug: "is-kfc-halal",
    name: "KFC",
    aliases: [
      "kentucky fried chicken"
    ],
    verdict: "doubtful",
    shortReason: "Depends strictly on the country/branch.",
    detailedReason: "### What is it?\nKFC is a popular fast-food.\n\n### Why it may be doubtful\nIn Muslim-majority countries, KFC is certified halal. In the UK, some specific branches are halal-certified (listed on their website). In the US and Canada, KFC is NOT halal as the chicken is not zabiha.\n\n### Fiqh considerations\nGeneral Islamic dietary principles require that ingredients be free from non-Zabiha meat, insects, and intoxicating alcohol.\n\n### Practical advice\nAlways read the latest ingredient label or use the AllHalal scanner app, as manufacturers frequently change their recipes. Look for certified vegan or halal symbols where possible.",
    category: "fast-food",
    priority: "high"
  },
  {
    slug: "is-burger-king-halal",
    name: "Burger King",
    aliases: [
      "bk"
    ],
    verdict: "doubtful",
    shortReason: "Depends on the country.",
    detailedReason: "### What is it?\nBurger King is a popular fast-food.\n\n### Why it may be doubtful\nLike KFC, Burger King is halal in Muslim countries. In Western countries, the meat is not halal, and even fish/veggie options face high risks of cross-contamination on the grills.\n\n### Fiqh considerations\nGeneral Islamic dietary principles require that ingredients be free from non-Zabiha meat, insects, and intoxicating alcohol.\n\n### Practical advice\nAlways read the latest ingredient label or use the AllHalal scanner app, as manufacturers frequently change their recipes. Look for certified vegan or halal symbols where possible.",
    category: "fast-food",
    priority: "high"
  },
  {
    slug: "is-subway-impossible-halal",
    name: "Subway Veggie/Beyond Meat",
    aliases: [
      "subway veggie patty"
    ],
    verdict: "doubtful",
    shortReason: "Patty is halal, but cross-contamination risk is high.",
    detailedReason: "### What is it?\nSubway Veggie/Beyond Meat is a popular fast-food.\n\n### Why it may be doubtful\nWhile plant-based patties are inherently halal, Subway workers often handle meat (including pork) and cheese with the same gloves, and use the same knives to cut sandwiches. Ask them to change gloves and use a clean knife.\n\n### Fiqh considerations\nGeneral Islamic dietary principles require that ingredients be free from non-Zabiha meat, insects, and intoxicating alcohol.\n\n### Practical advice\nAlways read the latest ingredient label or use the AllHalal scanner app, as manufacturers frequently change their recipes. Look for certified vegan or halal symbols where possible.",
    category: "fast-food",
    priority: "high"
  },
  {
    slug: "is-taco-bell-halal",
    name: "Taco Bell",
    aliases: [],
    verdict: "doubtful",
    shortReason: "Meat is not halal in Western countries.",
    detailedReason: "### What is it?\nTaco Bell is a popular fast-food.\n\n### Why it may be doubtful\nIn the US and Europe, Taco Bell meat is not halal. You can substitute beans or potatoes for meat, but be aware of cross-contamination in the kitchen.\n\n### Fiqh considerations\nGeneral Islamic dietary principles require that ingredients be free from non-Zabiha meat, insects, and intoxicating alcohol.\n\n### Practical advice\nAlways read the latest ingredient label or use the AllHalal scanner app, as manufacturers frequently change their recipes. Look for certified vegan or halal symbols where possible.",
    category: "fast-food",
    priority: "high"
  },
  {
    slug: "is-keratin-halal",
    name: "Keratin",
    aliases: [
      "hair keratin"
    ],
    verdict: "doubtful",
    shortReason: "Protein derived from animal hair, feathers, or horns.",
    detailedReason: "### What is it?\nKeratin is a popular cosmetics.\n\n### Why it may be doubtful\nKeratin in shampoos and treatments is usually derived from sheep wool, animal horns, or feathers. While some scholars permit it since hair/wool is pure, others advise caution if the animal source is unknown. Plant-based \"phyto-keratin\" is halal.\n\n### Fiqh considerations\nThere are varying scholarly opinions on some of the underlying ingredients, particularly depending on your madhhab.\n\n### Practical advice\nAlways read the latest ingredient label or use the AllHalal scanner app, as manufacturers frequently change their recipes. Look for certified vegan or halal symbols where possible.",
    category: "cosmetics",
    priority: "normal"
  },
  {
    slug: "is-collagen-halal",
    name: "Collagen",
    aliases: [
      "marine collagen",
      "bovine collagen"
    ],
    verdict: "doubtful",
    shortReason: "Must be from marine or halal-slaughtered sources.",
    detailedReason: "### What is it?\nCollagen is a popular cosmetics.\n\n### Why it may be doubtful\nCollagen is used in anti-aging creams and supplements. It is extracted from animal connective tissue. If it is \"marine collagen\" (fish), it is halal. If bovine, it must be zabiha. Porcine collagen is haram.\n\n### Fiqh considerations\nGeneral Islamic dietary principles require that ingredients be free from non-Zabiha meat, insects, and intoxicating alcohol.\n\n### Practical advice\nAlways read the latest ingredient label or use the AllHalal scanner app, as manufacturers frequently change their recipes. Look for certified vegan or halal symbols where possible.",
    category: "cosmetics",
    priority: "normal"
  },
  {
    slug: "is-stearic-acid-halal",
    name: "Stearic Acid",
    aliases: [
      "octadecanoic acid"
    ],
    verdict: "doubtful",
    shortReason: "Can be from animal fat or cocoa/shea butter.",
    detailedReason: "### What is it?\nStearic Acid is a popular cosmetics.\n\n### Why it may be doubtful\nUsed in soaps and cosmetics to thicken products. It can be derived from animal tallow (haram if not zabiha) or vegetable fats. Look for vegan certification.\n\n### Fiqh considerations\nGeneral Islamic dietary principles require that ingredients be free from non-Zabiha meat, insects, and intoxicating alcohol.\n\n### Practical advice\nAlways read the latest ingredient label or use the AllHalal scanner app, as manufacturers frequently change their recipes. Look for certified vegan or halal symbols where possible.",
    category: "cosmetics",
    priority: "normal"
  },
  {
    slug: "is-cetyl-alcohol-halal",
    name: "Cetyl / Cetearyl Alcohol",
    aliases: [
      "fatty alcohol",
      "cetearyl alcohol"
    ],
    verdict: "halal",
    shortReason: "Fatty alcohols are not intoxicating and are completely halal.",
    detailedReason: "### What is it?\nCetyl / Cetearyl Alcohol is a popular cosmetics.\n\n### Why it may be halal\nIn cosmetics, \"alcohol\" often refers to fatty alcohols like cetyl, cetearyl, or stearyl alcohol. These are solid waxes used to emulsify creams. They are not intoxicating (unlike ethanol) and are 100% halal.\n\n### Fiqh considerations\nGeneral Islamic dietary principles require that ingredients be free from non-Zabiha meat, insects, and intoxicating alcohol.\n\n### Practical advice\nAlways read the latest ingredient label or use the AllHalal scanner app, as manufacturers frequently change their recipes. Look for certified vegan or halal symbols where possible.",
    category: "cosmetics",
    priority: "normal"
  },
  {
    slug: "is-kosher-meat-halal",
    name: "Kosher Meat",
    aliases: [
      "kosher beef",
      "kosher chicken",
      "glatt kosher"
    ],
    verdict: "doubtful",
    shortReason: "Permissible according to many, but some scholars require explicitly mentioning the name of Allah.",
    detailedReason: "### What is it?\nKosher Meat is a popular ingredient.\n\n### Why it may be doubtful\nKosher meat is slaughtered by \"People of the Book\" (Jews) using a method similar to Zabiha. Most Sunni scholars (including Hanafi, Shafii, Hanbali) permit it. However, because modern Kosher slaughter does not always pronounce the name of God on every single animal, some scholars advise avoiding it when Zabiha Halal is available.\n\n### Fiqh considerations\nThere are varying scholarly opinions on some of the underlying ingredients, particularly depending on your madhhab.\n\n### Practical advice\nAlways read the latest ingredient label or use the AllHalal scanner app, as manufacturers frequently change their recipes. Look for certified vegan or halal symbols where possible.",
    category: "ingredient",
    priority: "normal"
  },
  {
    slug: "is-marshmallows-halal",
    name: "Marshmallows",
    aliases: [
      "kraft marshmallows",
      "marshmallow fluff"
    ],
    verdict: "doubtful",
    shortReason: "Most commercial brands contain pork or beef gelatin.",
    detailedReason: "### What is it?\nMarshmallows is a popular snack.\n\n### Why it may be doubtful\nStandard marshmallows found in US supermarkets (like Kraft or Jet-Puffed) are made with porcine (pork) gelatin, making them haram. Look for specifically labeled \"Halal\", \"Vegan\" (made with agar-agar), or \"Kosher Fish Gelatin\" marshmallows.\n\n### Fiqh considerations\nGeneral Islamic dietary principles require that ingredients be free from non-Zabiha meat, insects, and intoxicating alcohol.\n\n### Practical advice\nAlways read the latest ingredient label or use the AllHalal scanner app, as manufacturers frequently change their recipes. Look for certified vegan or halal symbols where possible.",
    category: "snack",
    priority: "normal"
  },
  {
    slug: "is-prime-energy-halal",
    name: "Prime Hydration & Energy",
    aliases: [
      "prime drink",
      "logan paul prime"
    ],
    verdict: "halal",
    shortReason: "Contains no animal products or alcohol.",
    detailedReason: "### What is it?\nPrime Hydration & Energy is a popular drink.\n\n### Why it may be halal\nPrime Hydration and Prime Energy drinks use synthetic vitamins, electrolytes, and flavorings. They do not contain any animal-derived ingredients or alcohol, making them halal to consume.\n\n### Fiqh considerations\nGeneral Islamic dietary principles require that ingredients be free from non-Zabiha meat, insects, and intoxicating alcohol.\n\n### Practical advice\nAlways read the latest ingredient label or use the AllHalal scanner app, as manufacturers frequently change their recipes. Look for certified vegan or halal symbols where possible.",
    category: "drink",
    priority: "high"
  },
  {
    slug: "is-celsius-energy-halal",
    name: "Celsius Energy Drink",
    aliases: [
      "celsius drink"
    ],
    verdict: "halal",
    shortReason: "Certified vegan and contains no haram ingredients.",
    detailedReason: "### What is it?\nCelsius Energy Drink is a popular drink.\n\n### Why it may be halal\nCelsius energy drinks are certified vegan and do not contain any animal products or alcohol. The caffeine and flavorings are derived from plant and synthetic sources. They are halal.\n\n### Fiqh considerations\nGeneral Islamic dietary principles require that ingredients be free from non-Zabiha meat, insects, and intoxicating alcohol.\n\n### Practical advice\nAlways read the latest ingredient label or use the AllHalal scanner app, as manufacturers frequently change their recipes. Look for certified vegan or halal symbols where possible.",
    category: "drink",
    priority: "normal"
  },
  {
    slug: "is-root-beer-halal",
    name: "A&W Root Beer",
    aliases: [
      "root beer",
      "a and w"
    ],
    verdict: "halal",
    shortReason: "No alcohol or animal ingredients.",
    detailedReason: "### What is it?\nA&W Root Beer is a popular drink.\n\n### Why it may be halal\nDespite the name \"beer\", commercial root beer is a sweet soda that contains no alcohol. It is made from carbonated water, high fructose corn syrup, caramel color, and natural/artificial flavors (usually synthetic). It is fully halal.\n\n### Fiqh considerations\nGeneral Islamic dietary principles require that ingredients be free from non-Zabiha meat, insects, and intoxicating alcohol.\n\n### Practical advice\nAlways read the latest ingredient label or use the AllHalal scanner app, as manufacturers frequently change their recipes. Look for certified vegan or halal symbols where possible.",
    category: "drink",
    priority: "normal"
  },
  {
    slug: "is-ginger-ale-halal",
    name: "Ginger Ale",
    aliases: [
      "canada dry",
      "schweppes"
    ],
    verdict: "halal",
    shortReason: "A carbonated soft drink with no alcohol content.",
    detailedReason: "### What is it?\nGinger Ale is a popular drink.\n\n### Why it may be halal\nLike root beer, commercial ginger ale (such as Canada Dry or Schweppes) is a soda, not a fermented alcoholic beverage. The ginger flavoring is extracted without the use of intoxicating alcohol. It is halal.\n\n### Fiqh considerations\nGeneral Islamic dietary principles require that ingredients be free from non-Zabiha meat, insects, and intoxicating alcohol.\n\n### Practical advice\nAlways read the latest ingredient label or use the AllHalal scanner app, as manufacturers frequently change their recipes. Look for certified vegan or halal symbols where possible.",
    category: "drink",
    priority: "normal"
  },
  {
    slug: "is-e100-halal",
    name: "E100 (Curcumin)",
    aliases: [
      "e100",
      "turmeric extract"
    ],
    verdict: "halal",
    shortReason: "A natural yellow coloring derived from turmeric root.",
    detailedReason: "### What is it?\nE100 (Curcumin) is a popular additive.\n\n### Why it may be halal\nE100 is Curcumin, the principal active ingredient in turmeric. It is a 100% plant-based, natural food colorant and is completely halal.\n\n### Fiqh considerations\nGeneral Islamic dietary principles require that ingredients be free from non-Zabiha meat, insects, and intoxicating alcohol.\n\n### Practical advice\nAlways read the latest ingredient label or use the AllHalal scanner app, as manufacturers frequently change their recipes. Look for certified vegan or halal symbols where possible.",
    category: "additive",
    priority: "normal"
  },
  {
    slug: "is-e150-halal",
    name: "E150a-d (Caramel Color)",
    aliases: [
      "e150",
      "caramel coloring"
    ],
    verdict: "halal",
    shortReason: "Made by heating carbohydrates (sugars).",
    detailedReason: "### What is it?\nE150a-d (Caramel Color) is a popular additive.\n\n### Why it may be halal\nCaramel colors are produced by heating carbohydrates, often in the presence of acids, alkalis, or salts. They are entirely plant-based and do not involve animal products. They are widely used in colas and soy sauces and are halal.\n\n### Fiqh considerations\nGeneral Islamic dietary principles require that ingredients be free from non-Zabiha meat, insects, and intoxicating alcohol.\n\n### Practical advice\nAlways read the latest ingredient label or use the AllHalal scanner app, as manufacturers frequently change their recipes. Look for certified vegan or halal symbols where possible.",
    category: "additive",
    priority: "normal"
  },
  {
    slug: "is-e322-halal",
    name: "E322 (Lecithin)",
    aliases: [
      "e322",
      "soy lecithin",
      "sunflower lecithin"
    ],
    verdict: "halal",
    shortReason: "Usually derived from soy or sunflower.",
    detailedReason: "### What is it?\nE322 (Lecithin) is a popular additive.\n\n### Why it may be halal\nLecithin is a fat essential in the cells of the body. Commercially, E322 is almost exclusively extracted from soybeans (soy lecithin) or sunflower seeds. It is plant-based and halal. Animal-derived lecithin is very rare.\n\n### Fiqh considerations\nGeneral Islamic dietary principles require that ingredients be free from non-Zabiha meat, insects, and intoxicating alcohol.\n\n### Practical advice\nAlways read the latest ingredient label or use the AllHalal scanner app, as manufacturers frequently change their recipes. Look for certified vegan or halal symbols where possible.",
    category: "additive",
    priority: "normal"
  },
  {
    slug: "is-e330-halal",
    name: "E330 (Citric Acid)",
    aliases: [
      "e330",
      "citric acid"
    ],
    verdict: "halal",
    shortReason: "A natural acid found in citrus fruits.",
    detailedReason: "### What is it?\nE330 (Citric Acid) is a popular additive.\n\n### Why it may be halal\nCitric acid is used as a preservative and flavor enhancer (providing a sour taste). It is naturally occurring in lemons and limes, and commercially produced via the fermentation of sugars by mold (Aspergillus niger). It is completely halal.\n\n### Fiqh considerations\nGeneral Islamic dietary principles require that ingredients be free from non-Zabiha meat, insects, and intoxicating alcohol.\n\n### Practical advice\nAlways read the latest ingredient label or use the AllHalal scanner app, as manufacturers frequently change their recipes. Look for certified vegan or halal symbols where possible.",
    category: "additive",
    priority: "normal"
  },
  {
    slug: "is-e415-halal",
    name: "E415 (Xanthan Gum)",
    aliases: [
      "e415",
      "xanthan"
    ],
    verdict: "halal",
    shortReason: "Produced by bacterial fermentation of plant sugars.",
    detailedReason: "### What is it?\nE415 (Xanthan Gum) is a popular additive.\n\n### Why it may be halal\nXanthan gum is a popular thickening agent. It is produced by the fermentation of glucose or sucrose by the Xanthomonas campestris bacterium. No animal products are involved in its creation. It is halal.\n\n### Fiqh considerations\nGeneral Islamic dietary principles require that ingredients be free from non-Zabiha meat, insects, and intoxicating alcohol.\n\n### Practical advice\nAlways read the latest ingredient label or use the AllHalal scanner app, as manufacturers frequently change their recipes. Look for certified vegan or halal symbols where possible.",
    category: "additive",
    priority: "normal"
  },
  {
    slug: "is-e621-halal",
    name: "E621 (MSG)",
    aliases: [
      "e621",
      "monosodium glutamate",
      "msg"
    ],
    verdict: "halal",
    shortReason: "Flavor enhancer produced by bacterial fermentation.",
    detailedReason: "### What is it?\nE621 (MSG) is a popular additive.\n\n### Why it may be halal\nMonosodium glutamate (MSG) is the sodium salt of glutamic acid. Commercially, it is produced by the fermentation of starch, sugar beets, sugar cane, or molasses. It does not contain animal products and is halal.\n\n### Fiqh considerations\nGeneral Islamic dietary principles require that ingredients be free from non-Zabiha meat, insects, and intoxicating alcohol.\n\n### Practical advice\nAlways read the latest ingredient label or use the AllHalal scanner app, as manufacturers frequently change their recipes. Look for certified vegan or halal symbols where possible.",
    category: "additive",
    priority: "high"
  },
  {
    slug: "is-e476-halal",
    name: "E476 (PGPR)",
    aliases: [
      "e476",
      "polyglycerol polyricinoleate"
    ],
    verdict: "halal",
    shortReason: "Usually derived from castor bean oil.",
    detailedReason: "### What is it?\nE476 (PGPR) is a popular additive.\n\n### Why it may be halal\nPGPR is an emulsifier commonly used in chocolate to improve flow. It is made from glycerol and fatty acids (specifically from castor oil, a plant). Because its commercial source is vegetable-based, it is considered halal.\n\n### Fiqh considerations\nGeneral Islamic dietary principles require that ingredients be free from non-Zabiha meat, insects, and intoxicating alcohol.\n\n### Practical advice\nAlways read the latest ingredient label or use the AllHalal scanner app, as manufacturers frequently change their recipes. Look for certified vegan or halal symbols where possible.",
    category: "additive",
    priority: "normal"
  },
  {
    slug: "is-e542-halal",
    name: "E542 (Bone Phosphate)",
    aliases: [
      "e542",
      "edible bone phosphate"
    ],
    verdict: "haram",
    shortReason: "Derived from animal bones, typically pigs or non-zabiha cattle.",
    detailedReason: "### What is it?\nE542 (Bone Phosphate) is a popular additive.\n\n### Why it may be haram\nE542 is an anti-caking agent and source of phosphorous. It is extracted from animal bones. Since the source is usually pigs or cattle that have not been slaughtered according to Islamic law, it is strictly haram.\n\n### Fiqh considerations\nGeneral Islamic dietary principles require that ingredients be free from non-Zabiha meat, insects, and intoxicating alcohol.\n\n### Practical advice\nAlways read the latest ingredient label or use the AllHalal scanner app, as manufacturers frequently change their recipes. Look for certified vegan or halal symbols where possible.",
    category: "additive",
    priority: "normal"
  },
  {
    slug: "is-e428-halal",
    name: "E428 (Gelatin)",
    aliases: [
      "e428",
      "gelatine"
    ],
    verdict: "doubtful",
    shortReason: "Alternative E-number for gelatin. Must verify the animal source.",
    detailedReason: "### What is it?\nE428 (Gelatin) is a popular additive.\n\n### Why it may be doubtful\nLike E441, E428 is simply another code for gelatin. In Western countries, it is overwhelmingly sourced from pig skin or non-zabiha beef bones. Avoid unless the product is certified halal, vegan, or specifies fish gelatin.\n\n### Fiqh considerations\nGeneral Islamic dietary principles require that ingredients be free from non-Zabiha meat, insects, and intoxicating alcohol.\n\n### Practical advice\nAlways read the latest ingredient label or use the AllHalal scanner app, as manufacturers frequently change their recipes. Look for certified vegan or halal symbols where possible.",
    category: "additive",
    priority: "high"
  },
  {
    slug: "is-carmine-lipstick-halal",
    name: "Lipstick containing Carmine",
    aliases: [
      "red lipstick",
      "carmine makeup"
    ],
    verdict: "doubtful",
    shortReason: "Carmine is derived from insects. Swallowing trace amounts happens.",
    detailedReason: "### What is it?\nLipstick containing Carmine is a popular cosmetics.\n\n### Why it may be doubtful\nLipsticks, especially red shades, frequently use Carmine (CI 75470) for pigment. Because lipstick is applied to the mouth, small amounts are inevitably ingested. If you follow the Hanafi ruling that insects are haram to consume, you should avoid carmine lipsticks. Look for vegan brands.\n\n### Fiqh considerations\nThere are varying scholarly opinions on some of the underlying ingredients, particularly depending on your madhhab.\n\n### Practical advice\nAlways read the latest ingredient label or use the AllHalal scanner app, as manufacturers frequently change their recipes. Look for certified vegan or halal symbols where possible.",
    category: "cosmetics",
    priority: "high"
  },
  {
    slug: "is-hyaluronic-acid-halal",
    name: "Hyaluronic Acid",
    aliases: [
      "ha serum",
      "hyaluronan"
    ],
    verdict: "halal",
    shortReason: "Modern cosmetics use plant-based or bacterial fermentation sources.",
    detailedReason: "### What is it?\nHyaluronic Acid is a popular cosmetics.\n\n### Why it may be halal\nHistorically extracted from rooster combs, almost all modern hyaluronic acid used in skincare serums is synthesized via microbial fermentation of plant sugars. Therefore, it is vegan and halal. (Injections/fillers in clinics should still be verified).\n\n### Fiqh considerations\nGeneral Islamic dietary principles require that ingredients be free from non-Zabiha meat, insects, and intoxicating alcohol.\n\n### Practical advice\nAlways read the latest ingredient label or use the AllHalal scanner app, as manufacturers frequently change their recipes. Look for certified vegan or halal symbols where possible.",
    category: "cosmetics",
    priority: "normal"
  },
  {
    slug: "is-lanolin-halal",
    name: "Lanolin",
    aliases: [
      "wool wax",
      "wool grease"
    ],
    verdict: "halal",
    shortReason: "Derived from sheeps wool without harming the animal.",
    detailedReason: "### What is it?\nLanolin is a popular cosmetics.\n\n### Why it may be halal\nLanolin is a wax secreted by the sebaceous glands of wool-bearing animals (like sheep). Because it is extracted from sheared wool and does not require slaughtering the animal, it is considered pure (tahir) and halal for use in lip balms and lotions.\n\n### Fiqh considerations\nGeneral Islamic dietary principles require that ingredients be free from non-Zabiha meat, insects, and intoxicating alcohol.\n\n### Practical advice\nAlways read the latest ingredient label or use the AllHalal scanner app, as manufacturers frequently change their recipes. Look for certified vegan or halal symbols where possible.",
    category: "cosmetics",
    priority: "normal"
  },
  {
    slug: "is-ethanol-perfume-halal",
    name: "Perfume with Alcohol (Ethanol)",
    aliases: [
      "cologne",
      "eau de parfum",
      "alcohol denat"
    ],
    verdict: "halal",
    shortReason: "Synthetic alcohol used externally is permissible according to many scholars.",
    detailedReason: "### What is it?\nPerfume with Alcohol (Ethanol) is a popular cosmetics.\n\n### Why it may be halal\nThe alcohol (ethanol/alcohol denat) used in perfumes is synthetically produced or heavily denatured, meaning it is toxic to drink and not the \"Khamr\" (intoxicating wine) forbidden for consumption. Most contemporary scholars (including Al-Azhar and Saudi councils) rule that wearing alcohol-based perfumes is pure and permissible for prayer.\n\n### Fiqh considerations\nThere are varying scholarly opinions on some of the underlying ingredients, particularly depending on your madhhab.\n\n### Practical advice\nAlways read the latest ingredient label or use the AllHalal scanner app, as manufacturers frequently change their recipes. Look for certified vegan or halal symbols where possible.",
    category: "cosmetics",
    priority: "normal"
  },
  {
    slug: "is-chipotle-halal",
    name: "Chipotle",
    aliases: [
      "chipotle mexican grill"
    ],
    verdict: "doubtful",
    shortReason: "Meats are not halal. Veggie options have cross-contamination risks.",
    detailedReason: "### What is it?\nChipotle is a popular fast-food.\n\n### Why it may be doubtful\nChipotle does not source halal meat. The Sofritas (plant-based protein), beans, and rice are inherently halal. However, workers use the same gloves and serving spoons across all pans, leading to significant cross-contamination with pork (carnitas) and non-halal beef/chicken. You must ask them to change gloves and use fresh spoons.\n\n### Fiqh considerations\nGeneral Islamic dietary principles require that ingredients be free from non-Zabiha meat, insects, and intoxicating alcohol.\n\n### Practical advice\nAlways read the latest ingredient label or use the AllHalal scanner app, as manufacturers frequently change their recipes. Look for certified vegan or halal symbols where possible.",
    category: "fast-food",
    priority: "high"
  },
  {
    slug: "is-chick-fil-a-halal",
    name: "Chick-fil-A",
    aliases: [
      "chickfila",
      "cfa"
    ],
    verdict: "doubtful",
    shortReason: "The chicken is not halal-certified (not zabiha).",
    detailedReason: "### What is it?\nChick-fil-A is a popular fast-food.\n\n### Why it may be doubtful\nChick-fil-A uses standard commercially slaughtered chicken in the US, which does not meet Zabiha Halal requirements. Their waffle fries are cooked in canola oil and are generally considered permissible, but the meat is haram.\n\n### Fiqh considerations\nGeneral Islamic dietary principles require that ingredients be free from non-Zabiha meat, insects, and intoxicating alcohol.\n\n### Practical advice\nAlways read the latest ingredient label or use the AllHalal scanner app, as manufacturers frequently change their recipes. Look for certified vegan or halal symbols where possible.",
    category: "fast-food",
    priority: "normal"
  },
  {
    slug: "is-dominos-halal",
    name: "Dominos Pizza",
    aliases: [
      "dominos"
    ],
    verdict: "doubtful",
    shortReason: "Depends heavily on the country. US/UK meat is not halal.",
    detailedReason: "### What is it?\nDominos Pizza is a popular fast-food.\n\n### Why it may be doubtful\nIn Muslim-majority countries and specific certified branches in the UK/Australia, Dominos serves halal meat. In the US, the meat is not halal. Plain cheese or veggie pizzas are permissible, but there is a risk of cross-contamination with pepperoni/sausage on the cutting boards.\n\n### Fiqh considerations\nGeneral Islamic dietary principles require that ingredients be free from non-Zabiha meat, insects, and intoxicating alcohol.\n\n### Practical advice\nAlways read the latest ingredient label or use the AllHalal scanner app, as manufacturers frequently change their recipes. Look for certified vegan or halal symbols where possible.",
    category: "fast-food",
    priority: "high"
  },
  {
    slug: "is-starbucks-syrups-halal",
    name: "Starbucks Syrups",
    aliases: [
      "starbucks vanilla",
      "starbucks caramel"
    ],
    verdict: "halal",
    shortReason: "Most clear syrups are halal. Sauces must be checked.",
    detailedReason: "### What is it?\nStarbucks Syrups is a popular fast-food.\n\n### Why it may be halal\nMost of Starbucks clear syrups (Vanilla, Caramel, Hazelnut) are made of sugar, water, and synthetic flavorings, making them halal. Thicker sauces (like White Mocha) contain dairy, which is fine. Avoid anything explicitly containing alcohol or wine flavorings, though this is rare.\n\n### Fiqh considerations\nGeneral Islamic dietary principles require that ingredients be free from non-Zabiha meat, insects, and intoxicating alcohol.\n\n### Practical advice\nAlways read the latest ingredient label or use the AllHalal scanner app, as manufacturers frequently change their recipes. Look for certified vegan or halal symbols where possible.",
    category: "fast-food",
    priority: "high"
  },
  {
    slug: "is-lays-halal",
    name: "Lays Potato Chips",
    aliases: [
      "lays classic",
      "lays chips"
    ],
    verdict: "doubtful",
    shortReason: "Classic is halal. Cheese/BBQ flavors often contain animal enzymes.",
    detailedReason: "### What is it?\nLays Potato Chips is a popular snack.\n\n### Why it may be doubtful\nLays Classic (just potatoes, oil, and salt) are universally halal. Flavors like Sour Cream & Onion or BBQ in the US often use animal enzymes (rennet or pork-derived flavorings) in their seasoning powder. Always check the label or use the AllHalal app to scan the specific flavor.\n\n### Fiqh considerations\nGeneral Islamic dietary principles require that ingredients be free from non-Zabiha meat, insects, and intoxicating alcohol.\n\n### Practical advice\nAlways read the latest ingredient label or use the AllHalal scanner app, as manufacturers frequently change their recipes. Look for certified vegan or halal symbols where possible.",
    category: "snack",
    priority: "normal"
  },
  {
    slug: "is-marshmallow-fluff-halal",
    name: "Marshmallow Fluff",
    aliases: [
      "fluff"
    ],
    verdict: "halal",
    shortReason: "Does not contain gelatin. Made with egg whites.",
    detailedReason: "### What is it?\nMarshmallow Fluff is a popular snack.\n\n### Why it may be halal\nUnlike solid marshmallows that require gelatin to hold their shape, Marshmallow Fluff uses egg whites to achieve its airy texture. Since it contains no animal gelatin or alcohol, it is completely halal and vegetarian.\n\n### Fiqh considerations\nGeneral Islamic dietary principles require that ingredients be free from non-Zabiha meat, insects, and intoxicating alcohol.\n\n### Practical advice\nAlways read the latest ingredient label or use the AllHalal scanner app, as manufacturers frequently change their recipes. Look for certified vegan or halal symbols where possible.",
    category: "snack",
    priority: "normal"
  },
  {
    slug: "is-twix-halal",
    name: "Twix",
    aliases: [
      "twix bar"
    ],
    verdict: "halal",
    shortReason: "Suitable for vegetarians; no haram animal additives.",
    detailedReason: "### What is it?\nTwix is a popular snack.\n\n### Why it may be halal\nMars has confirmed that Twix bars (caramel, cookie, milk chocolate) sold in the US, UK, and Europe are suitable for vegetarians. The whey used is derived from microbial rennet. They are halal.\n\n### Fiqh considerations\nGeneral Islamic dietary principles require that ingredients be free from non-Zabiha meat, insects, and intoxicating alcohol.\n\n### Practical advice\nAlways read the latest ingredient label or use the AllHalal scanner app, as manufacturers frequently change their recipes. Look for certified vegan or halal symbols where possible.",
    category: "snack",
    priority: "normal"
  },
  {
    slug: "is-skittles-gummies-halal",
    name: "Skittles Gummies",
    aliases: [
      "skittles gummy"
    ],
    verdict: "haram",
    shortReason: "Unlike regular Skittles, the Gummy version contains pork gelatin.",
    detailedReason: "### What is it?\nSkittles Gummies is a popular snack.\n\n### Why it may be haram\nWhile standard hard-shell Skittles are vegan and halal, the recently introduced \"Skittles Gummies\" line in the US uses porcine (pork) gelatin to achieve the gummy texture. They are strictly haram.\n\n### Fiqh considerations\nGeneral Islamic dietary principles require that ingredients be free from non-Zabiha meat, insects, and intoxicating alcohol.\n\n### Practical advice\nAlways read the latest ingredient label or use the AllHalal scanner app, as manufacturers frequently change their recipes. Look for certified vegan or halal symbols where possible.",
    category: "snack",
    priority: "high"
  },
  {
    slug: "is-pop-tarts-halal",
    name: "Pop-Tarts",
    aliases: [
      "poptarts",
      "frosted pop tarts"
    ],
    verdict: "haram",
    shortReason: "Frosted Pop-Tarts contain beef gelatin.",
    detailedReason: "### What is it?\nPop-Tarts is a popular snack.\n\n### Why it may be haram\nKelloggs has officially confirmed that the gelatin used in the frosting of all frosted Pop-Tarts in the US is derived from beef (bovine). Since the beef is not slaughtered according to Islamic law (zabiha), they are haram. Unfrosted Pop-Tarts do not contain gelatin and are permissible.\n\n### Fiqh considerations\nGeneral Islamic dietary principles require that ingredients be free from non-Zabiha meat, insects, and intoxicating alcohol.\n\n### Practical advice\nAlways read the latest ingredient label or use the AllHalal scanner app, as manufacturers frequently change their recipes. Look for certified vegan or halal symbols where possible.",
    category: "snack",
    priority: "high"
  },
  {
    slug: "is-rice-krispies-treats-halal",
    name: "Rice Krispies Treats",
    aliases: [
      "kelloggs rice krispies"
    ],
    verdict: "haram",
    shortReason: "Contains pork gelatin.",
    detailedReason: "### What is it?\nRice Krispies Treats is a popular snack.\n\n### Why it may be haram\nKelloggs Rice Krispies Treats (the pre-packaged marshmallow squares) contain gelatin. Kelloggs has confirmed that the gelatin used in these treats in the US is derived from pork (porcine). Therefore, they are strictly haram.\n\n### Fiqh considerations\nGeneral Islamic dietary principles require that ingredients be free from non-Zabiha meat, insects, and intoxicating alcohol.\n\n### Practical advice\nAlways read the latest ingredient label or use the AllHalal scanner app, as manufacturers frequently change their recipes. Look for certified vegan or halal symbols where possible.",
    category: "snack",
    priority: "normal"
  },
  {
    slug: "is-cera-ve-halal",
    name: "CeraVe Skincare",
    aliases: [
      "cerave cleanser",
      "cerave cream"
    ],
    verdict: "halal",
    shortReason: "Mostly synthetic and plant-based; no animal-derived ingredients.",
    detailedReason: "### What is it?\nCeraVe Skincare is a popular cosmetics.\n\n### Why it may be halal\nCeraVe products are formulated with synthetic ceramides and plant-derived ingredients. They do not contain animal-derived ingredients like tallow or non-halal collagen. Therefore, they are considered permissible for use.\n\n### Fiqh considerations\nGeneral Islamic dietary principles require that ingredients be free from non-Zabiha meat, insects, and intoxicating alcohol.\n\n### Practical advice\nAlways read the latest ingredient label or use the AllHalal scanner app, as manufacturers frequently change their recipes. Look for certified vegan or halal symbols where possible.",
    category: "cosmetics",
    priority: "normal"
  },
  {
    slug: "is-vaseline-halal",
    name: "Vaseline (Petroleum Jelly)",
    aliases: [
      "petrolatum"
    ],
    verdict: "halal",
    shortReason: "Derived from petroleum (minerals), not animals.",
    detailedReason: "### What is it?\nVaseline (Petroleum Jelly) is a popular cosmetics.\n\n### Why it may be halal\nVaseline, or pure petroleum jelly, is a byproduct of the oil refining process. It contains no animal products or alcohol and is 100% halal and pure to use on the skin.\n\n### Fiqh considerations\nGeneral Islamic dietary principles require that ingredients be free from non-Zabiha meat, insects, and intoxicating alcohol.\n\n### Practical advice\nAlways read the latest ingredient label or use the AllHalal scanner app, as manufacturers frequently change their recipes. Look for certified vegan or halal symbols where possible.",
    category: "cosmetics",
    priority: "normal"
  },
  {
    slug: "is-carmine-blush-halal",
    name: "Blush with Carmine",
    aliases: [
      "carmine makeup",
      "e120 blush"
    ],
    verdict: "halal",
    shortReason: "Applied externally to the skin, so it is generally permissible.",
    detailedReason: "### What is it?\nBlush with Carmine is a popular cosmetics.\n\n### Why it may be halal\nWhile consuming carmine is disputed/haram according to some madhhabs, applying it externally (like blush or eyeshadow) is widely considered permissible, as it is not being ingested and is considered a pure substance by many scholars in this context. (Lipstick is an exception due to ingestion risk).\n\n### Fiqh considerations\nThere are varying scholarly opinions on some of the underlying ingredients, particularly depending on your madhhab.\n\n### Practical advice\nAlways read the latest ingredient label or use the AllHalal scanner app, as manufacturers frequently change their recipes. Look for certified vegan or halal symbols where possible.",
    category: "cosmetics",
    priority: "high"
  },
  {
    slug: "is-e171-halal",
    name: "E171 (Titanium Dioxide)",
    aliases: [
      "titanium dioxide",
      "e171"
    ],
    verdict: "halal",
    shortReason: "A naturally occurring mineral used for white coloring.",
    detailedReason: "### What is it?\nE171 (Titanium Dioxide) is a popular additive.\n\n### Why it may be halal\nE171 is titanium dioxide, a white pigment derived from minerals. It has no animal or alcohol origin and is halal. (Note: The EU has banned it as a food additive for health reasons, but its halal status remains clear).\n\n### Fiqh considerations\nGeneral Islamic dietary principles require that ingredients be free from non-Zabiha meat, insects, and intoxicating alcohol.\n\n### Practical advice\nAlways read the latest ingredient label or use the AllHalal scanner app, as manufacturers frequently change their recipes. Look for certified vegan or halal symbols where possible.",
    category: "additive",
    priority: "normal"
  },
  {
    slug: "is-e211-halal",
    name: "E211 (Sodium Benzoate)",
    aliases: [
      "e211",
      "sodium benzoate"
    ],
    verdict: "halal",
    shortReason: "A synthetic chemical preservative.",
    detailedReason: "### What is it?\nE211 (Sodium Benzoate) is a popular additive.\n\n### Why it may be halal\nSodium benzoate is a widely used preservative to prevent mold in drinks and sauces. It is synthetically produced and contains no animal products, making it 100% halal.\n\n### Fiqh considerations\nGeneral Islamic dietary principles require that ingredients be free from non-Zabiha meat, insects, and intoxicating alcohol.\n\n### Practical advice\nAlways read the latest ingredient label or use the AllHalal scanner app, as manufacturers frequently change their recipes. Look for certified vegan or halal symbols where possible.",
    category: "additive",
    priority: "normal"
  },
  {
    slug: "is-e202-halal",
    name: "E202 (Potassium Sorbate)",
    aliases: [
      "e202",
      "potassium sorbate"
    ],
    verdict: "halal",
    shortReason: "A synthetic chemical preservative.",
    detailedReason: "### What is it?\nE202 (Potassium Sorbate) is a popular additive.\n\n### Why it may be halal\nPotassium sorbate is another common preservative used in foods and personal care products. It is manufactured synthetically and is halal.\n\n### Fiqh considerations\nGeneral Islamic dietary principles require that ingredients be free from non-Zabiha meat, insects, and intoxicating alcohol.\n\n### Practical advice\nAlways read the latest ingredient label or use the AllHalal scanner app, as manufacturers frequently change their recipes. Look for certified vegan or halal symbols where possible.",
    category: "additive",
    priority: "normal"
  },
  {
    slug: "is-e903-halal",
    name: "E903 (Carnauba Wax)",
    aliases: [
      "carnauba wax",
      "e903"
    ],
    verdict: "halal",
    shortReason: "A wax derived from the leaves of a Brazilian palm tree.",
    detailedReason: "### What is it?\nE903 (Carnauba Wax) is a popular additive.\n\n### Why it may be halal\nCarnauba wax is a plant-based wax used to coat candies, pills, and even cars to give them a shiny finish. Since it comes from a plant, it is completely halal and vegan.\n\n### Fiqh considerations\nGeneral Islamic dietary principles require that ingredients be free from non-Zabiha meat, insects, and intoxicating alcohol.\n\n### Practical advice\nAlways read the latest ingredient label or use the AllHalal scanner app, as manufacturers frequently change their recipes. Look for certified vegan or halal symbols where possible.",
    category: "additive",
    priority: "normal"
  },
  {
    slug: "is-e901-halal",
    name: "E901 (Beeswax)",
    aliases: [
      "beeswax",
      "cera alba",
      "e901"
    ],
    verdict: "halal",
    shortReason: "A natural wax produced by honey bees.",
    detailedReason: "### What is it?\nE901 (Beeswax) is a popular additive.\n\n### Why it may be halal\nBeeswax is secreted by bees to build their honeycombs. Like honey, it is a pure excretion from the bee and is widely considered halal for consumption and cosmetic use.\n\n### Fiqh considerations\nGeneral Islamic dietary principles require that ingredients be free from non-Zabiha meat, insects, and intoxicating alcohol.\n\n### Practical advice\nAlways read the latest ingredient label or use the AllHalal scanner app, as manufacturers frequently change their recipes. Look for certified vegan or halal symbols where possible.",
    category: "additive",
    priority: "normal"
  },
  {
    slug: "is-carrageenan-halal",
    name: "Carrageenan",
    aliases: [
      "e407",
      "irish moss extract"
    ],
    verdict: "halal",
    shortReason: "Extracted from red edible seaweeds.",
    detailedReason: "### What is it?\nCarrageenan is a popular ingredient.\n\n### Why it may be halal\nCarrageenan is used as a thickening and gelling agent (often in dairy and alternative milks). Because it is extracted entirely from seaweed, it is a plant-based, halal ingredient.\n\n### Fiqh considerations\nGeneral Islamic dietary principles require that ingredients be free from non-Zabiha meat, insects, and intoxicating alcohol.\n\n### Practical advice\nAlways read the latest ingredient label or use the AllHalal scanner app, as manufacturers frequently change their recipes. Look for certified vegan or halal symbols where possible.",
    category: "ingredient",
    priority: "normal"
  },
  {
    slug: "is-guar-gum-halal",
    name: "Guar Gum",
    aliases: [
      "e412",
      "guaran"
    ],
    verdict: "halal",
    shortReason: "Extracted from guar beans (legumes).",
    detailedReason: "### What is it?\nGuar Gum is a popular ingredient.\n\n### Why it may be halal\nGuar gum is a thickening agent derived from the endosperm of the guar bean. It is 100% plant-based and halal.\n\n### Fiqh considerations\nGeneral Islamic dietary principles require that ingredients be free from non-Zabiha meat, insects, and intoxicating alcohol.\n\n### Practical advice\nAlways read the latest ingredient label or use the AllHalal scanner app, as manufacturers frequently change their recipes. Look for certified vegan or halal symbols where possible.",
    category: "ingredient",
    priority: "normal"
  },
  {
    slug: "is-locust-bean-gum-halal",
    name: "Locust Bean Gum",
    aliases: [
      "carob gum",
      "e410"
    ],
    verdict: "halal",
    shortReason: "Extracted from the seeds of the carob tree.",
    detailedReason: "### What is it?\nLocust Bean Gum is a popular ingredient.\n\n### Why it may be halal\nLocust bean gum is a thickening agent used in foods like ice cream and cream cheese. It comes from the seeds of the carob tree and is completely halal and plant-based.\n\n### Fiqh considerations\nGeneral Islamic dietary principles require that ingredients be free from non-Zabiha meat, insects, and intoxicating alcohol.\n\n### Practical advice\nAlways read the latest ingredient label or use the AllHalal scanner app, as manufacturers frequently change their recipes. Look for certified vegan or halal symbols where possible.",
    category: "ingredient",
    priority: "normal"
  },
  {
    slug: "is-tartaric-acid-halal",
    name: "Tartaric Acid",
    aliases: [
      "e334"
    ],
    verdict: "doubtful",
    shortReason: "Can be derived from the wine-making process.",
    detailedReason: "### What is it?\nTartaric Acid is a popular ingredient.\n\n### Why it may be doubtful\nTartaric acid naturally occurs in grapes. Commercially, it is often a byproduct of the wine industry (collected from the vats). Scholars differ: some say the chemical transformation makes it pure (halal), while others advise avoiding it if its direct source was wine production.\n\n### Fiqh considerations\nThere are varying scholarly opinions on some of the underlying ingredients, particularly depending on your madhhab.\n\n### Practical advice\nAlways read the latest ingredient label or use the AllHalal scanner app, as manufacturers frequently change their recipes. Look for certified vegan or halal symbols where possible.",
    category: "ingredient",
    priority: "normal"
  },
  {
    slug: "is-capri-sun-halal",
    name: "Capri Sun",
    aliases: [
      "caprisun"
    ],
    verdict: "halal",
    shortReason: "Contains fruit juice, water, and sugar.",
    detailedReason: "### What is it?\nCapri Sun is a popular drink.\n\n### Why it may be halal\nCapri Sun juice pouches contain water, sugar, fruit juice concentrates, and natural flavorings. There are no animal products or alcohol involved. They are halal.\n\n### Fiqh considerations\nGeneral Islamic dietary principles require that ingredients be free from non-Zabiha meat, insects, and intoxicating alcohol.\n\n### Practical advice\nAlways read the latest ingredient label or use the AllHalal scanner app, as manufacturers frequently change their recipes. Look for certified vegan or halal symbols where possible.",
    category: "drink",
    priority: "normal"
  },
  {
    slug: "is-fanta-halal",
    name: "Fanta",
    aliases: [
      "fanta orange"
    ],
    verdict: "halal",
    shortReason: "A fruit-flavored carbonated soft drink.",
    detailedReason: "### What is it?\nFanta is a popular drink.\n\n### Why it may be halal\nFanta, produced by Coca-Cola, contains carbonated water, sugar, citric acid, and natural/synthetic flavorings and colorings. It does not contain animal products or alcohol, making it halal.\n\n### Fiqh considerations\nGeneral Islamic dietary principles require that ingredients be free from non-Zabiha meat, insects, and intoxicating alcohol.\n\n### Practical advice\nAlways read the latest ingredient label or use the AllHalal scanner app, as manufacturers frequently change their recipes. Look for certified vegan or halal symbols where possible.",
    category: "drink",
    priority: "normal"
  },
  {
    slug: "is-lipton-ice-tea-halal",
    name: "Lipton Ice Tea",
    aliases: [
      "lipton peach",
      "lipton lemon"
    ],
    verdict: "halal",
    shortReason: "Tea extract, water, and sugar.",
    detailedReason: "### What is it?\nLipton Ice Tea is a popular drink.\n\n### Why it may be halal\nLipton bottled iced teas are made from water, sugar, black tea extract, and synthetic flavorings/acids. They are free from animal derivatives and alcohol, so they are halal.\n\n### Fiqh considerations\nGeneral Islamic dietary principles require that ingredients be free from non-Zabiha meat, insects, and intoxicating alcohol.\n\n### Practical advice\nAlways read the latest ingredient label or use the AllHalal scanner app, as manufacturers frequently change their recipes. Look for certified vegan or halal symbols where possible.",
    category: "drink",
    priority: "normal"
  },
  {
    slug: "is-hersheys-chocolate-halal",
    name: "Hersheys Milk Chocolate",
    aliases: [
      "hersheys bar"
    ],
    verdict: "halal",
    shortReason: "Standard milk chocolate is halal.",
    detailedReason: "### What is it?\nHersheys Milk Chocolate is a popular snack.\n\n### Why it may be halal\nThe classic Hersheys Milk Chocolate bar contains milk, sugar, cocoa butter, chocolate, milk fat, and soy lecithin. It does not contain haram animal additives or alcohol. (Note: specific filled or limited-edition flavors should be checked).\n\n### Fiqh considerations\nGeneral Islamic dietary principles require that ingredients be free from non-Zabiha meat, insects, and intoxicating alcohol.\n\n### Practical advice\nAlways read the latest ingredient label or use the AllHalal scanner app, as manufacturers frequently change their recipes. Look for certified vegan or halal symbols where possible.",
    category: "snack",
    priority: "normal"
  },
  {
    slug: "is-reeses-halal",
    name: "Reeses Peanut Butter Cups",
    aliases: [
      "reeses cups"
    ],
    verdict: "halal",
    shortReason: "Contains peanuts, chocolate, and milk.",
    detailedReason: "### What is it?\nReeses Peanut Butter Cups is a popular snack.\n\n### Why it may be halal\nThe standard Reeses Peanut Butter Cups are made with milk chocolate, peanuts, sugar, dextrose, salt, and preservatives like TBHQ (which is synthetic). They contain no animal products other than dairy and are halal.\n\n### Fiqh considerations\nGeneral Islamic dietary principles require that ingredients be free from non-Zabiha meat, insects, and intoxicating alcohol.\n\n### Practical advice\nAlways read the latest ingredient label or use the AllHalal scanner app, as manufacturers frequently change their recipes. Look for certified vegan or halal symbols where possible.",
    category: "snack",
    priority: "normal"
  },
  {
    slug: "is-sour-punch-straws-halal",
    name: "Sour Punch Straws",
    aliases: [
      "sour punch"
    ],
    verdict: "halal",
    shortReason: "Does not contain gelatin.",
    detailedReason: "### What is it?\nSour Punch Straws is a popular snack.\n\n### Why it may be halal\nUnlike many chewy candies, Sour Punch Straws are made with wheat flour and corn syrup to achieve their texture. They do not contain gelatin or carmine, making them halal and vegan.\n\n### Fiqh considerations\nGeneral Islamic dietary principles require that ingredients be free from non-Zabiha meat, insects, and intoxicating alcohol.\n\n### Practical advice\nAlways read the latest ingredient label or use the AllHalal scanner app, as manufacturers frequently change their recipes. Look for certified vegan or halal symbols where possible.",
    category: "snack",
    priority: "normal"
  },
  {
    slug: "is-twizzlers-halal",
    name: "Twizzlers",
    aliases: [
      "twizzlers twists"
    ],
    verdict: "halal",
    shortReason: "No gelatin or animal products.",
    detailedReason: "### What is it?\nTwizzlers is a popular snack.\n\n### Why it may be halal\nTwizzlers are primarily made of corn syrup, wheat flour, and sugar. They do not contain gelatin. They are suitable for vegans and are completely halal.\n\n### Fiqh considerations\nGeneral Islamic dietary principles require that ingredients be free from non-Zabiha meat, insects, and intoxicating alcohol.\n\n### Practical advice\nAlways read the latest ingredient label or use the AllHalal scanner app, as manufacturers frequently change their recipes. Look for certified vegan or halal symbols where possible.",
    category: "snack",
    priority: "normal"
  },
  {
    slug: "is-swedish-fish-halal",
    name: "Swedish Fish",
    aliases: [
      "swedish fish candy"
    ],
    verdict: "halal",
    shortReason: "Vegan-friendly; no gelatin.",
    detailedReason: "### What is it?\nSwedish Fish is a popular snack.\n\n### Why it may be halal\nDespite the name, Swedish Fish are vegan. They use modified corn starch instead of gelatin to get their gummy texture. They are halal.\n\n### Fiqh considerations\nGeneral Islamic dietary principles require that ingredients be free from non-Zabiha meat, insects, and intoxicating alcohol.\n\n### Practical advice\nAlways read the latest ingredient label or use the AllHalal scanner app, as manufacturers frequently change their recipes. Look for certified vegan or halal symbols where possible.",
    category: "snack",
    priority: "normal"
  },
  {
    slug: "is-airheads-halal",
    name: "Airheads",
    aliases: [
      "airheads candy"
    ],
    verdict: "halal",
    shortReason: "Does not contain gelatin or animal-derived ingredients.",
    detailedReason: "### What is it?\nAirheads is a popular snack.\n\n### Why it may be halal\nAirheads bars are made from sugar, corn syrup, maltodextrin, and synthetic colors/flavors. They do not contain gelatin. They are considered vegan and halal.\n\n### Fiqh considerations\nGeneral Islamic dietary principles require that ingredients be free from non-Zabiha meat, insects, and intoxicating alcohol.\n\n### Practical advice\nAlways read the latest ingredient label or use the AllHalal scanner app, as manufacturers frequently change their recipes. Look for certified vegan or halal symbols where possible.",
    category: "snack",
    priority: "normal"
  },
  {
    slug: "is-cheez-it-halal",
    name: "Cheez-It",
    aliases: [
      "cheez its"
    ],
    verdict: "doubtful",
    shortReason: "Contains animal enzymes (rennet) in the US.",
    detailedReason: "### What is it?\nCheez-It is a popular snack.\n\n### Why it may be doubtful\nKelloggs has stated that the cheese used in original Cheez-It crackers in the US is made using animal-derived rennet (often from calves/cows not slaughtered Islamically). Therefore, they are widely considered doubtful or haram. Some specific vegetarian variants might exist, so check the label.\n\n### Fiqh considerations\nGeneral Islamic dietary principles require that ingredients be free from non-Zabiha meat, insects, and intoxicating alcohol.\n\n### Practical advice\nAlways read the latest ingredient label or use the AllHalal scanner app, as manufacturers frequently change their recipes. Look for certified vegan or halal symbols where possible.",
    category: "snack",
    priority: "normal"
  },
  {
    slug: "is-goldfish-halal",
    name: "Goldfish Crackers",
    aliases: [
      "pepperidge farm goldfish"
    ],
    verdict: "doubtful",
    shortReason: "Some flavors contain animal enzymes.",
    detailedReason: "### What is it?\nGoldfish Crackers is a popular snack.\n\n### Why it may be doubtful\nPepperidge Farm Goldfish (like the classic Cheddar flavor) use cheese that may be produced with animal rennet. Because the source of the rennet is not guaranteed to be microbial or zabiha, they are doubtful. The plain pretzel or graham varieties are usually safe.\n\n### Fiqh considerations\nGeneral Islamic dietary principles require that ingredients be free from non-Zabiha meat, insects, and intoxicating alcohol.\n\n### Practical advice\nAlways read the latest ingredient label or use the AllHalal scanner app, as manufacturers frequently change their recipes. Look for certified vegan or halal symbols where possible.",
    category: "snack",
    priority: "normal"
  },
  {
    slug: "is-triscuit-halal",
    name: "Triscuit",
    aliases: [
      "triscuit crackers"
    ],
    verdict: "halal",
    shortReason: "Original flavor is just wheat, oil, and salt.",
    detailedReason: "### What is it?\nTriscuit is a popular snack.\n\n### Why it may be halal\nOriginal Triscuit crackers are completely vegan and halal. However, cheese or meat-flavored varieties might contain doubtful enzymes or flavorings. Always stick to the original or check the specific flavor.\n\n### Fiqh considerations\nGeneral Islamic dietary principles require that ingredients be free from non-Zabiha meat, insects, and intoxicating alcohol.\n\n### Practical advice\nAlways read the latest ingredient label or use the AllHalal scanner app, as manufacturers frequently change their recipes. Look for certified vegan or halal symbols where possible.",
    category: "snack",
    priority: "normal"
  }
];
