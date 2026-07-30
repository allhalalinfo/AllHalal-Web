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
    "slug": "is-ice-cream-halal",
    "name": "Ice Cream",
    "aliases": [
      "ice-cream",
      "icecream",
      "gelato",
      "frozen dessert"
    ],
    "verdict": "doubtful",
    "shortReason": "Plain dairy ice cream is halal, but gelatin, animal emulsifiers, carmine and alcohol-based vanilla extract make many commercial flavours doubtful.",
    "detailedReason": "### The base is not the problem\n\nMilk, cream, sugar and eggs are all halal. If ice cream were only those four things, there would be no question. The doubt comes from the additives that turn a simple frozen custard into a product that survives months in a freezer and a supermarket supply chain.\n\n### The five ingredients that decide it\n\n**Gelatin.** Used as a stabiliser in some traditional recipes and in many soft-serve mixes. Almost always pork or non-zabiha beef unless the pack says otherwise.\n\n**Emulsifiers, mainly E471.** Mono- and diglycerides of fatty acids can be made from plant oils or from animal fat, including pork. The E number alone does not tell you which. In the EU an animal source must be declared somewhere on the pack; in other markets it need not be.\n\n**Vanilla extract.** Real vanilla extract is legally defined as an alcoholic extraction and typically contains around 35% ethanol. Scholars differ on whether the residual trace in a finished product matters, but if you avoid it, look for *vanillin* or *natural vanilla flavouring* instead, which are usually alcohol-free.\n\n**Carmine, E120.** The red and pink colour in strawberry, raspberry and cherry flavours is often extracted from cochineal insects. Rulings differ by school; many people who accept it in cosmetics still avoid it in food.\n\n**Whey and milk derivatives.** Whey is a cheesemaking by-product, and cheese is set with rennet. If the rennet was animal and not from a zabiha animal, the whey inherits the doubt. Microbial rennet, now the industry norm in most of Europe, removes the issue.\n\n### Flavours that carry extra risk\n\nRum raisin, tiramisu, Irish cream, bourbon vanilla, amaretto and cherry liqueur flavours may contain genuine alcohol rather than a trace carrier. Cookie-dough and brownie inclusions bring their own emulsifiers and possible animal shortening. Anything with marshmallow swirl almost certainly contains gelatin.\n\n### Soft serve and scoop shops\n\nPackaged ice cream has a printed ingredient list; soft serve usually does not. Machine mixes frequently contain gelatin or animal-derived emulsifiers, and the same machine may be used for a mix you have not checked. In scoop shops the practical risks are shared scoops between flavours and toppings containing gelatin or alcohol. Asking to see the mix carton is reasonable and most staff will show it.\n\n### Your fastest route to a safe choice\n\n- A halal certification mark settles the question outright\n- Certified vegan ice cream contains no gelatin, no carmine, no whey and no animal emulsifier\n- \"Suitable for vegetarians\" rules out gelatin and carmine but not alcohol-based extract\n- Plain flavours — vanilla-free base, chocolate, lemon sorbet — carry fewer variables than novelty flavours\n- Homemade removes every variable at once\n\n### Regional picture\n\n| Market | Typical situation |\n|---|---|\n| Muslim-majority countries | Local production is usually halal-certified, including international brands manufactured locally |\n| UK and EU | Wide vegetarian labelling makes gelatin easy to rule out; carmine and E471 still need checking |\n| United States | Fewer vegetarian claims, more carmine, and \"natural flavors\" is a broad term that need not be broken down |\n\nRecipes change without announcement. A brand that was safe last year is worth re-checking, which is exactly what a barcode scan is for.",
    "category": "snack",
    "priority": "high"
  },
  {
    "slug": "is-doritos-halal",
    "name": "Doritos (Nacho Cheese)",
    "aliases": [
      "doritos",
      "doritos nacho cheese"
    ],
    "verdict": "doubtful",
    "shortReason": "It depends on the country. US Nacho Cheese Doritos contain animal enzymes; UK and EU versions use microbial ones, and some markets are certified.",
    "detailedReason": "### One brand, several recipes\n\nDoritos are made by Frito-Lay and its regional partners, and the cheese seasoning is reformulated per market. The corn, oil and salt are never the issue. The cheese powder is.\n\n| Market | Enzymes in cheese powder | Status |\n|---|---|---|\n| United States | Animal enzymes declared on several flavours | Not halal |\n| United Kingdom | Microbial | Halal ingredients |\n| European Union | Microbial in most markets | Halal ingredients |\n| Malaysia, Indonesia, Gulf | Locally produced and certified | Halal |\n\n### The enzyme question\n\nCheese powder starts as cheese, and cheese is set with rennet. Where the rennet is animal-derived and the animal was not slaughtered to halal requirements, the resulting cheese inherits that status, and so does the powder made from it.\n\nAmerican Nacho Cheese Doritos have historically listed **enzymes** in the cheese component without specifying the source, and Frito-Lay has confirmed in consumer correspondence that animal enzymes are used in some products. The UK and European versions use microbial enzymes, in line with the broader European move to vegetarian-friendly cheese, and UK packs frequently carry a vegetarian suitability claim as a result.\n\n### The other ingredients worth a look\n\n**Whey and cheese solids** carry the same rennet logic as the enzymes themselves.\n\n**Natural flavours** is an umbrella term in US labelling that need not be broken down, and it can conceal animal-derived components. European labelling is more specific.\n\n**Colours.** Some intensely coloured flavours use additives worth checking, though the orange in the classic product is typically paprika extract and annatto, both plant-derived.\n\n**Flavour variants.** Chilli Heatwave, Cool Original, Tangy Cheese, Sweet Chilli and the rest each have their own seasoning. A verdict on one flavour does not transfer to another, and the plain Lightly Salted version is the simplest of the range by some distance.\n\n### The shortcut that works in the UK\n\nBritish packs carry a green **\"suitable for vegetarians\"** flash on the flavours that qualify. Animal rennet is not vegetarian, so that flash rules out the enzyme problem. Where the flash is absent, the flavour needs checking individually.\n\n### In certified markets\n\nDoritos produced in Malaysia, Indonesia, Turkey and the Gulf are made to locally certified recipes with certified cheese powder, and the pack carries the national certifier's mark.\n\n### The recurring mistake\n\nAssuming that an answer found online applies to your pack. This is a product where the American answer and the British answer are genuinely different and both are correct in their own market. Check the country of manufacture on the back, then the vegetarian flash or the certification mark.",
    "category": "snack",
    "priority": "high"
  },
  {
    "slug": "is-skittles-halal",
    "name": "Skittles",
    "aliases": [
      "skittles original"
    ],
    "verdict": "halal",
    "shortReason": "Skittles no longer contain gelatin or carmine and are made from plant-based ingredients. The original sweets are halal; Skittles Gummies are not.",
    "detailedReason": "### The recipe changed, and that is why old answers are wrong\n\nSkittles used to contain gelatin. Mars reformulated the product years ago, removing gelatin from the recipe, and later removed carmine as a colour. A great deal of the advice still circulating online predates both changes, which is why you will find confident answers in both directions.\n\nThe current original Skittles recipe is sugar, glucose syrup, palm fat, citric acid, dextrin, maltodextrin, natural and artificial flavours, colours, acidity regulators and a glazing agent. Nothing on that list is animal-derived.\n\n### The two ingredients that used to be the problem\n\n**Gelatin** was the original obstacle and is no longer present in the standard product. This is why Skittles now carry a vegan or \"suitable for vegetarians\" claim in many markets — a claim a manufacturer cannot legally make if gelatin is present.\n\n**Carmine (E120)**, the insect-derived red colour, was also removed from the mainstream recipe in favour of synthetic colours or plant-based alternatives. Colour systems vary by market, so if carmine specifically matters to you, the colour list on your pack is worth a glance.\n\n### The important exception\n\n**Skittles Gummies are a different product and they do contain gelatin.** The name and branding are close enough that this catches people out regularly. The gummy line is a chewy gelatin sweet, not a reformulation of the original hard-shelled Skittle. If a pack says Gummies, treat it as a separate question with a different answer.\n\n### Regional recipe differences\n\nMars formulates by region and the colour and flavour systems differ between the US, the UK and continental Europe. The absence of gelatin is consistent across the main product; the specific colourings are not. Packs made for Muslim-majority markets often carry local halal certification.\n\n| Version | Gelatin | Verdict |\n|---|---|---|\n| Original Skittles (fruits, sours, tropical) | No | Halal |\n| Skittles Gummies | Yes | Not halal |\n| Certified Skittles in Muslim-majority markets | No | Halal, certified |\n\n### Palm fat and glazing agents\n\nThe palm fat gives the shell its texture and is a plant oil with no halal issue. The glazing agent on the shell is typically carnauba wax (E903), from a palm leaf, which is also uncontroversial.\n\n### What to do with a pack in your hand\n\nLook for a vegetarian or vegan claim on the front — if it is there, there is no gelatin and no carmine. If there is no claim, read the ingredient list for the word gelatin and for E120. On the original product you will find neither.",
    "category": "snack",
    "priority": "high"
  },
  {
    "slug": "is-nutella-halal",
    "name": "Nutella",
    "aliases": [
      "nutella spread",
      "ferrero nutella"
    ],
    "verdict": "halal",
    "shortReason": "Nutella contains no gelatin, no animal fat and no alcohol. Its lecithin is soy and its vanillin is synthetic, so the standard recipe is halal.",
    "detailedReason": "### What is in the jar\n\nThe recipe Ferrero uses across most markets is short and, unusually for a processed spread, fully disclosed: sugar, palm oil, hazelnuts, skimmed milk powder, fat-reduced cocoa, an emulsifier (lecithin, from soya) and vanillin. Percentages vary slightly by country, but the ingredient set does not.\n\nNothing in that list is animal-derived except the milk powder, and milk is halal.\n\n### The two ingredients people ask about\n\n**Lecithin.** Lecithin can come from soya or from egg yolk, and the egg version is what makes some people hesitate. Nutella specifies *lecithin (soya)* on the pack in every market where labelling requires it. Soy lecithin is a plant extract with no halal issue.\n\n**Vanillin.** This is the point most often misunderstood. Vanillin is not vanilla extract. Vanilla extract is produced by soaking beans in ethanol and typically retains around 35% alcohol; vanillin is a single aroma compound, usually synthesised, and carries no alcohol. Nutella uses vanillin, which is why the alcohol question does not arise.\n\n### What about palm oil\n\nPalm oil is a plant fat. It is the subject of a genuine environmental and nutritional debate, and Ferrero has responded to that debate with sourcing commitments, but none of it touches the halal ruling. Plant oil is halal regardless of which plant it came from.\n\n### Certification and manufacturing\n\nFerrero states that Nutella contains no animal-derived ingredients other than milk and no alcohol. Beyond that company statement, Nutella produced for and in Muslim-majority markets — Turkey and the Gulf among them — carries local halal certification, because those markets require certification for retail listing rather than because the recipe changes.\n\nIf you want documentary certainty rather than a recipe reading, buy a jar sold in a market with mandatory certification and look for the certifier's mark on the label.\n\n### Cross-contamination\n\nNutella is made on lines that also handle other Ferrero products. Those products are confectionery, not meat, so the realistic contamination risk is nuts and dairy rather than anything haram. Allergen warnings on the pack reflect that.\n\n### Where the doubt usually comes from\n\nThree recurring rumours account for most of the uncertainty around this product. The first is that Nutella contains gelatin — it does not, and there is nothing in a cocoa spread that would need a gelling agent. The second is that the vanilla flavouring carries alcohol, which confuses vanillin with vanilla extract. The third is a general suspicion of E322, the additive number for lecithin, which is soy in this case and in most confectionery.\n\n### Related checks\n\nThe ingredients that make Nutella straightforward are the same ones that make other spreads complicated. If you are comparing, the things to look for elsewhere are animal-derived emulsifiers, whey from animal rennet, and real vanilla extract in place of vanillin.",
    "category": "snack",
    "priority": "high"
  },
  {
    "slug": "is-oreo-halal",
    "name": "Oreo Cookies",
    "aliases": [
      "oreos",
      "oreo original"
    ],
    "verdict": "halal",
    "shortReason": "Oreos contain no gelatin, no animal fat and no alcohol. The recipe is plant-based apart from possible milk traces, and many markets are halal-certified.",
    "detailedReason": "### What Oreos are made of\n\nWheat flour, sugar, vegetable oils (usually palm and rapeseed), fat-reduced cocoa, glucose-fructose syrup, raising agents, salt, an emulsifier — soy lecithin or E476 — and flavouring.\n\nThere is no gelatin, no lard, no animal fat and no alcohol. The classic Oreo is, by recipe, a plant-based biscuit, which is why it is one of the few globally recognised snacks with an uncomplicated answer.\n\n### The ingredient that generates most of the questions\n\n**E476, polyglycerol polyricinoleate.** This emulsifier appears in some Oreo formulations and its name makes it sound animal-derived. It is not: it is produced from castor bean oil and glycerol, both plant sources. It is standard in chocolate and biscuit manufacturing and is accepted as halal by certification bodies.\n\nThe other emulsifier used, **soy lecithin (E322)**, is likewise a plant extract.\n\n### Why Mondelez does not call them vegan\n\nThe pack in many markets carries a \"may contain milk\" statement. That is an allergen warning about shared equipment, not an ingredient declaration — the same lines produce products containing milk. It has no bearing on the halal ruling, since milk is halal in any case. It does mean Oreos are not marketed as vegan in those markets, which sometimes gets misread as evidence of an animal ingredient.\n\n### Certification by market\n\nOreos are produced in many countries, and in Muslim-majority markets the local production is halal-certified because retail listing requires it. Packs made in Indonesia, Malaysia, Turkey, Pakistan and the Gulf typically carry a certifier's mark. Packs made in Europe or North America generally do not carry certification, because there is no requirement, but the recipe is the same.\n\n### The flavoured and limited-edition versions\n\nThis is the part that actually needs attention. The classic Oreo recipe is stable, but the brand runs a constant stream of flavour variants, and those bring in ingredients the original does not have:\n\n- Cream-filled and dessert variants may use flavourings that are alcohol-extracted\n- Some red and pink varieties may use carmine (E120) for colour\n- Marshmallow, cheesecake and mousse editions can contain gelatin\n- Chocolate-coated versions add a coating with its own emulsifier and possible dairy derivatives\n\nThe verdict on this page applies to the standard Oreo. A limited edition is a different product and needs its own label check.\n\n### The bottom line\n\nFor the original biscuit, the ingredient list is short, published and free of anything problematic. If you want documentary certainty rather than a recipe reading, buy a pack produced in a certified market and look for the mark.",
    "category": "snack",
    "priority": "high"
  },
  {
    "slug": "is-red-bull-halal",
    "name": "Red Bull Energy Drink",
    "aliases": [
      "redbull"
    ],
    "verdict": "halal",
    "shortReason": "Red Bull uses synthetic taurine and contains no animal ingredients or alcohol. It is halal-certified in several Muslim-majority markets.",
    "detailedReason": "### What is in the can\n\nWater, sucrose and glucose, citric acid, carbon dioxide, taurine, sodium bicarbonate, magnesium carbonate, caffeine, B-group vitamins, and flavourings and colours. The sugar-free version substitutes sweeteners.\n\nNothing on that list is animal-derived. The reason the question keeps being asked comes down to a single word.\n\n### The taurine myth\n\nTaurine was first isolated from ox bile in 1827, and the name comes from *taurus*, the Latin for bull. Combine that etymology with a brand called Red Bull and you have one of the most durable food rumours of the last thirty years: that the drink contains bull semen, bull urine or bull bile.\n\nNone of it is true. The taurine in Red Bull and in every other commercial energy drink is **synthesised in a laboratory** from isethionic acid and aziridine or by similar chemical routes. It is a pharmaceutical-grade synthetic compound, and manufacturers use it precisely because synthesis is cheaper, purer and more consistent than extraction from any animal source. Red Bull states this explicitly, and it is verifiable from the supply chain — the industrial taurine market is chemical, not agricultural.\n\n### The alcohol question\n\nRed Bull contains no alcohol. Flavourings in soft drinks are sometimes carried in ethanol, and any residue at that level is a trace far below intoxicating quantity, which mainstream scholarly opinion and every halal certification standard treat as excused. The drink is not fermented and no alcohol is added.\n\n### Certification\n\nRed Bull is produced in Austria and Switzerland and exported globally, which means the same product reaches Muslim-majority markets. It carries halal certification for a number of those markets, including in the Gulf and Southeast Asia, where retail listing requires it. The certificate is issued against the same recipe sold elsewhere.\n\n### Glycerol ester of wood rosin and other minor ingredients\n\nSome energy drinks include stabilisers and clouding agents with unfamiliar names. Where these appear they are typically plant-derived — wood rosin comes from pine, and the colours used in Red Bull are synthetic or plant-based rather than carmine.\n\n### What is actually worth considering\n\nThe halal ruling on Red Bull is straightforward. The considerations that remain are health rather than fiqh: a standard can contains around 80mg of caffeine and 27g of sugar, and the interaction of high caffeine intake with sleep and heart rate is a genuine reason for moderation, particularly for young people. Some scholars invoke the general principle against harming oneself when discussing heavy energy-drink consumption, and that is a separate conversation from whether the ingredients are permissible.\n\n### Related products\n\nThe same taurine misconception attaches to Monster, Celsius, Prime and every other energy drink. In each case the taurine is synthetic. Where those products differ from Red Bull is in their other ingredients — some use carmine for colour or contain ingredients that need their own check.",
    "category": "drink",
    "priority": "high"
  },
  {
    "slug": "is-gelatin-halal",
    "name": "Gelatin",
    "aliases": [
      "gelatine",
      "bovine gelatin",
      "porcine gelatin"
    ],
    "verdict": "doubtful",
    "shortReason": "Gelatin takes the ruling of the animal it came from. Pork gelatin is haram, fish gelatin is halal, and beef gelatin depends on how the animal was slaughtered.",
    "detailedReason": "### What gelatin actually is\n\nGelatin is a protein obtained by boiling collagen out of animal skin, hide, bone and connective tissue. It has no plant version — every gram of true gelatin started as an animal. That single fact is why the question \"is gelatin halal\" has no one-word answer: the ruling follows the source animal, not the ingredient name.\n\nIndustrial gelatin comes from three sources. Pigskin accounts for roughly two fifths of world production and dominates confectionery in Europe and North America. Bovine hide and bone make up most of the rest. Fish gelatin is a small but growing share, used specifically because it sidesteps both halal and kosher problems.\n\n### What decides the ruling\n\n| Source | Ruling | Why |\n|---|---|---|\n| Pork | Haram | Pig and everything derived from it is prohibited by explicit text |\n| Beef, zabiha | Halal | Slaughtered according to Islamic requirements |\n| Beef, non-zabiha | Disputed | Most contemporary councils treat it as impermissible; a minority allow it under istihala |\n| Fish | Halal | Sea creatures do not require ritual slaughter |\n| \"Kosher gelatin\" | Not automatically halal | Usually bovine, but kosher slaughter is not accepted by every school, and some kosher gelatin is fish |\n\nThe genuine scholarly disagreement is about **istihala** — whether a substance changes ruling when it is chemically transformed into something with different properties. Collagen becoming gelatin involves real chemical change, and a minority position, associated with parts of the Hanafi tradition and echoed in some modern fatwas, treats the resulting gelatin as a new substance. The majority view, including the Islamic Fiqh Academy's position, is that partial hydrolysis is not a complete transformation, so the original ruling carries over. If you follow a specific school or scholar, that is the point to ask about.\n\n### Where gelatin hides\n\nSweets are the obvious place, but gelatin turns up far more widely than most people expect:\n\n- Gummy sweets, marshmallows, chewy candy, liquorice\n- Yoghurts, mousses, cheesecakes, panna cotta, some cream cheeses\n- Soft capsules for vitamins, painkillers and supplements\n- Marshmallow-containing breakfast cereals and cereal bars\n- Some fruit juices and wines, where gelatin is used as a clarifying agent and then filtered out\n- Low-fat spreads and processed meats, as a binder\n\n### Reading the label\n\nOn an ingredient list gelatin can appear as *gelatin*, *gelatine*, *hydrolysed collagen*, *collagen hydrolysate*, or occasionally under the old additive number **E441**. European labels increasingly qualify the source — *gelatine (beef)*, *porcine gelatine* — but an unqualified \"gelatine\" on a European or American confectionery pack is most often pork.\n\nTwo shortcuts are reliable. A halal certification mark from a recognised body means the gelatin question has already been checked. A \"suitable for vegetarians\" or vegan claim means there is no gelatin at all, because gelatin is never vegetarian.\n\n### Halal alternatives\n\nIf you are cooking or looking for substitutes, **pectin** (from fruit), **agar-agar** (from seaweed), **carrageenan** (from red algae), **starch** and **gum arabic** all produce gel textures with no animal input. Fish gelatin behaves closest to the real thing and is used by several halal-certified confectionery brands.\n\n### The mistake people make most often\n\nAssuming that a product made in a Muslim-majority country is automatically gelatin-safe, or that the same brand uses the same recipe everywhere. Manufacturers formulate per market and per factory. The Turkish version of a sweet can be halal-certified bovine while the German version of the identical product is pork — same logo, same packaging design, different gelatin.",
    "category": "ingredient",
    "priority": "high"
  },
  {
    "slug": "is-carmine-halal",
    "name": "Carmine (E120)",
    "aliases": [
      "e120",
      "cochineal",
      "natural red 4"
    ],
    "verdict": "doubtful",
    "shortReason": "Carmine is a red dye extracted from cochineal insects. Scholars genuinely differ: many treat it as impermissible in food, others permit it.",
    "detailedReason": "### What carmine is\n\nCarmine, also sold as cochineal extract, carminic acid or **E120**, is a crimson dye made from the dried bodies of the cochineal insect, a scale insect farmed on cactus in Peru and the Canary Islands. Around 70,000 insects are needed for a pound of dye. It is prized because it is stable, vivid and natural, which is why it persists in an era of synthetic colours.\n\n### Why scholars disagree\n\nThis is not a case where one side has misunderstood the facts. Both sides know exactly what carmine is; they differ on the underlying rule about insects.\n\n**The position that it is impermissible** rests on the general prohibition of consuming insects in the Hanafi, Shafi'i and Hanbali traditions, with the specific exception of locusts. On this view an insect-derived colour carries the ruling of the insect itself, and the extraction process does not change it.\n\n**The position that it is permissible** draws on the Maliki school's broader tolerance of small creatures, and on the argument from istihala — that carminic acid extracted, purified and dissolved is no longer the insect in any meaningful sense.\n\nCertification bodies split along these lines too. Some halal certifiers reject E120 outright; others permit it. That is why you can find a certified product containing carmine and a certifier who would not have certified it.\n\n### Where you will find it\n\n- Red and pink sweets, especially gummy and hard-shelled candy\n- Strawberry and raspberry yoghurts, ice creams and desserts\n- Some processed meats and surimi\n- Fruit drinks and alcoholic red beverages\n- Lipstick, blusher and other cosmetics\n\n### The food and cosmetics distinction\n\nMany people who avoid carmine in food accept it in cosmetics, and there is a coherent reason for that. The prohibition on insects concerns eating them; applying a dye externally to the skin is a different act. Lipstick sits awkwardly between the two, because some is inevitably ingested, which is why it draws more caution than blusher or eyeshadow.\n\n### Reading the label\n\nCarmine hides behind several names, and manufacturers do not always use the most recognisable one:\n\n| Name on pack | Same thing |\n|---|---|\n| Carmine | Yes |\n| Cochineal | Yes |\n| Carminic acid | Yes |\n| E120 | Yes |\n| Natural Red 4 | Yes |\n| CI 75470 | Yes (cosmetics) |\n| Crimson Lake | Yes |\n\nA vegan claim rules carmine out completely, since it is an animal product. A vegetarian claim usually but not always does.\n\n### Alternatives in use\n\nManufacturers moving away from carmine use beetroot red (E162), anthocyanins (E163), paprika extract (E160c), lycopene from tomato, or synthetic reds such as Allura Red (E129). Several major confectionery brands have reformulated away from carmine over the last decade, which means older guidance about specific products may be out of date.\n\n### What to do if you are unsure\n\nIf your school or your usual scholar has a position on insects, that position decides this for you and there is no further ambiguity. If you do not have one, the cautious route is to treat E120 as something to avoid in food while recognising that people who take the other view are following a real scholarly opinion rather than being lax.",
    "category": "additive",
    "priority": "high"
  },
  {
    "slug": "is-whey-halal",
    "name": "Whey / Whey Protein",
    "aliases": [
      "whey powder",
      "milk whey"
    ],
    "verdict": "doubtful",
    "shortReason": "Whey is a cheesemaking by-product, so it inherits the ruling of the rennet used. Microbial rennet makes it halal; animal rennet leaves it doubtful.",
    "detailedReason": "### Where whey comes from\n\nWhey is the liquid left when milk is curdled and the solids are separated for cheese. Dried, it becomes whey powder; refined further, whey protein concentrate and isolate. Milk itself is unambiguously halal, so nothing about whey as a substance is a problem.\n\nThe complication is the step that creates it. Curdling requires an enzyme, and that enzyme is what carries a ruling.\n\n### The rennet question\n\n| Rennet type | Source | Ruling |\n|---|---|---|\n| Microbial | Fungal or bacterial fermentation | Halal |\n| Fermentation-produced chymosin (FPC) | Genetically engineered microorganisms | Halal |\n| Vegetable | Thistle, nettle, fig | Halal |\n| Animal, from a zabiha calf | Calf stomach lining | Halal |\n| Animal, from a non-zabiha calf | Calf stomach lining | Disputed, widely avoided |\n| Porcine pepsin | Pig stomach | Haram |\n\nThe good news is that the industry has moved decisively toward microbial and fermentation-produced rennet. FPC now accounts for the large majority of cheese production worldwide, because it is cheaper, more consistent and vegetarian-friendly. Traditional animal rennet survives mainly in protected-designation European cheeses — Parmigiano Reggiano, Grana Padano, some Gruyère and Pecorino — and those are precisely the cheeses whose whey is least likely to end up in a protein powder.\n\n### Whey in protein supplements\n\nThis is where the question comes up most often, and it has a second dimension beyond rennet.\n\nSports supplements built on whey concentrate or isolate are usually made from commodity whey sourced from large-scale cheese production, which overwhelmingly uses microbial rennet. But supplements add a long list of other ingredients, and several of them carry their own issues: **gelatin** in some capsule forms, **glycerin** of unspecified origin, **carmine** in pink and red flavours, **alcohol-based flavourings**, and **L-cysteine** in some formulations.\n\nA halal certification mark on a protein powder covers all of this at once, which is why certified supplements are worth seeking out even though the whey itself is rarely the problem.\n\n### Whey in everyday food\n\nWhey powder is a cheap protein and bulking agent, so it turns up in bread, crisps, chocolate, biscuits, instant soups, processed meats and baby formula. In each case the same logic applies: the whey is halal if the rennet was, and in most modern production it was.\n\n### How to check\n\n**Halal certification** settles it. A **vegetarian claim** on a cheese or whey-containing product means no animal rennet was used, since animal rennet is not vegetarian — this is the single most useful shortcut. Labels stating *microbial rennet*, *vegetarian rennet* or *non-animal enzymes* say it directly. For supplements, the manufacturer's website usually specifies the rennet source, and if it does not, asking is reasonable.\n\n### The practical summary\n\nWhey is not an ingredient to avoid on sight. It is an ingredient whose status was decided one step upstream, and in the current dairy industry that step usually went the right way. Where certainty matters — daily supplement use rather than an occasional biscuit — a certified product removes the remaining doubt.",
    "category": "ingredient",
    "priority": "high"
  },
  {
    "slug": "is-vanilla-extract-halal",
    "name": "Vanilla Extract",
    "aliases": [
      "pure vanilla extract"
    ],
    "verdict": "doubtful",
    "shortReason": "Real vanilla extract is legally required to contain about 35% alcohol. Scholars differ on trace amounts in baked goods; vanillin is the alcohol-free alternative.",
    "detailedReason": "### Why vanilla extract contains alcohol\n\nVanilla extract is not flavoured with alcohol as an afterthought — alcohol is the extraction medium. Vanillin and the hundreds of other aroma compounds in a cured vanilla bean dissolve in ethanol far better than in water, so beans are steeped in an ethanol-water solution to draw the flavour out.\n\nIn the United States the standard is written into food law: to be labelled \"vanilla extract\" a product must contain at least 35% ethanol by volume. That is roughly the strength of a spirit. It is not a residue or a contaminant; it is a defining ingredient.\n\n### The two questions this raises\n\n**Is the bottle itself permissible to own and use?** On the mainstream view, a substance with that concentration of ethanol is treated as an intoxicant in liquid form, and most scholars would say a home cook should not keep or use it as an ingredient.\n\n**Is a finished product containing it permissible to eat?** This is where genuine disagreement lives. In a cake, biscuit or ice cream, extract is used at fractions of a percent, and most of the alcohol evaporates during baking. What remains is far below any intoxicating level and often undetectable.\n\nOne body of opinion holds that any deliberate addition of an intoxicant carries its ruling into the finished product regardless of quantity. Another applies the principle that a small quantity of a substance which does not intoxicate in large quantity of the finished product is excused, particularly where it is chemically dispersed and no trace of the original remains perceptible. Both are held by serious scholars, and halal certifiers differ accordingly — some certify products containing vanilla extract, some do not.\n\n### The distinction that solves most cases\n\n**Vanillin is not vanilla extract.** Vanillin is a single compound, usually produced synthetically or from lignin or fermented ferulic acid, and it involves no alcohol at all. When a label says *vanillin*, *vanilla flavouring*, *artificial vanilla* or *natural vanilla flavouring*, you are almost always looking at an alcohol-free ingredient.\n\n| On the label | Alcohol | Typical status |\n|---|---|---|\n| Vanilla extract | Around 35% in the bottle | Disputed |\n| Vanilla essence | Sometimes alcohol-based | Check |\n| Vanillin | None | Halal |\n| Natural vanilla flavouring | Usually none | Generally halal |\n| Vanilla powder / ground bean | None | Halal |\n| Glycerine-based vanilla extract | None | Halal |\n\nThis is why products like Nutella, which use vanillin, do not raise the question at all, while an artisan ice cream advertising \"real vanilla extract\" does.\n\n### Alcohol-free options for cooking\n\n**Vanilla beans** used directly — split the pod and scrape the seeds. **Vanilla powder**, made from ground dried beans. **Glycerine-based vanilla extract**, sold specifically for alcohol-free baking and increasingly easy to find. **Vanilla paste** in alcohol-free formulations.\n\n### A note on what to check\n\nBecause the alcohol is in the extract rather than the finished food, a manufacturer's answer is often more useful than the ingredient list. Asking whether the vanilla flavouring is extract-based or vanillin-based is a specific question that consumer services can usually answer.",
    "category": "ingredient",
    "priority": "high"
  },
  {
    "slug": "is-e471-halal",
    "name": "E471 (Mono- and diglycerides)",
    "aliases": [
      "e471",
      "emulsifier e471"
    ],
    "verdict": "doubtful",
    "shortReason": "E471 can be made from plant oil or animal fat, including pork. The number alone does not tell you which, so it needs checking per product.",
    "detailedReason": "### What E471 is\n\nE471 stands for mono- and diglycerides of fatty acids, the most widely used emulsifier in the food industry. Its job is to hold fat and water together, which is why it appears in bread, ice cream, margarine, cakes, chocolate, coffee whiteners and thousands of other products.\n\nIt is manufactured by reacting glycerol with fatty acids. Both inputs can come from plants or from animals, and that is the entire halal question — the finished molecule is identical either way, so a laboratory test on the ingredient does not always reveal the origin.\n\n### Which source is used in practice\n\n| Source | Prevalence | Ruling |\n|---|---|---|\n| Palm, soy, sunflower, rapeseed oil | The majority of European and Southeast Asian production | Halal |\n| Beef tallow | Common in some markets | Depends on slaughter |\n| Pork fat | Used in some markets | Haram |\n\nPlant sources dominate globally, largely because palm oil is cheaper than tallow at industrial scale. That makes E471 more often halal than not — but \"usually\" is not \"always\", and this is a product where the exception genuinely occurs.\n\n### Why you cannot tell from the label alone\n\nAn ingredient list that says \"emulsifier (E471)\" gives you no origin information. Different jurisdictions handle this differently:\n\n- **European Union** — if the emulsifier is animal-derived, the source must be identifiable, and in practice many manufacturers state \"of vegetable origin\" voluntarily\n- **United Kingdom** — the same rules, plus widespread vegetarian labelling that resolves the question indirectly\n- **United States** — no requirement to declare the origin of mono- and diglycerides\n- **Muslim-majority markets** — certification covers it\n\n### The three reliable shortcuts\n\nA **halal certification mark** means the certifier has traced the emulsifier. A **vegan claim** means there is no animal input at all. A **\"suitable for vegetarians\" claim** rules out pork and tallow, since neither is vegetarian.\n\nWithout one of those three, the only way to be certain is to ask the manufacturer, and consumer services departments will usually answer a direct question about the origin of a specific emulsifier.\n\n### The scholarly picture\n\nWhere the fatty acid comes from pork, the emulsifier is impermissible on the mainstream view. Where it comes from non-zabiha beef, the position depends on whether you accept istihala — the argument that chemical transformation changes the ruling of a substance. Producing a mono- or diglyceride involves genuine chemical change, so a minority of scholars treat the result as a new substance regardless of origin. The majority position among contemporary councils does not accept that for this class of ingredient.\n\n### Related numbers\n\nThe same reasoning applies to a family of related emulsifiers, and if E471 concerns you, these are the ones to watch alongside it: **E472a–f** (esters of mono- and diglycerides), **E470** (fatty acid salts), **E473**, **E474** and **E475**. All can be plant or animal in origin. By contrast **E476** is castor-oil derived and **E322** lecithin is almost always soy, so both are far less likely to be an issue.",
    "category": "additive",
    "priority": "high"
  },
  {
    "slug": "is-shellac-halal",
    "name": "Shellac (E904)",
    "aliases": [
      "e904",
      "confectioners glaze"
    ],
    "verdict": "doubtful",
    "shortReason": "Shellac (E904) is lac-insect resin. Many allow it as a secretion; others avoid insect-derived glazes.",
    "detailedReason": "### What shellac is\n\nResin secreted by the lac insect, refined into confectioners’ glaze for candy coatings and some fruit waxes. It is a secretion, not minced insect meat — which is why some schools treat it more leniently than carmine.\n\n### Spectrum of views\n\nAccepting: secretion analogous to honey/beeswax for coatings. Avoiding: insect origin is enough to skip glazed sweets. Certifiers: mixed; some allow E904, some prefer carnauba.\n\n### Label names\n\nShellac, confectioners glaze, pharmaceutical glaze, E904.\n\n### Practical advice\n\nIf your scholar permits secretions, glazed candy is fine. If you avoid insect products, choose unwaxed sweets or carnauba (E903).",
    "category": "additive",
    "priority": "high"
  },
  {
    "slug": "is-coca-cola-halal",
    "name": "Coca-Cola",
    "aliases": [
      "coke",
      "diet coke",
      "coca cola"
    ],
    "verdict": "halal",
    "shortReason": "Coca-Cola contains no animal ingredients and no added alcohol, and is halal-certified in several Muslim-majority markets.",
    "detailedReason": "### What the drink is made of\n\nCarbonated water, sugar or high-fructose corn syrup, caramel colour (E150d), phosphoric acid (E338), natural flavourings and caffeine. In diet and zero variants the sugar is replaced by aspartame, acesulfame K or sucralose, and a preservative and additional acidity regulator may be added.\n\nEvery one of those is either mineral, synthetic or plant-derived. None is animal-derived, and none is an intoxicant.\n\n### The alcohol question\n\nThis is the substantive point, and it deserves a straight answer rather than reassurance.\n\nFlavour compounds are frequently dissolved in ethanol because ethanol is an efficient carrier, and that is true across the soft drink industry. Any residue that survives into the finished beverage is present in trace amounts far below the level at which a drink could intoxicate, and far below the thresholds used by halal certification standards.\n\nThe mainstream scholarly position distinguishes between alcohol as an intoxicating drink, which is prohibited, and ethanol as a technical processing aid present in undetectable quantity in a non-intoxicating product, which is not treated the same way. This is the same reasoning under which naturally fermented traces in bread, fruit juice and vinegar are accepted.\n\nCoca-Cola's own position is that its beverages contain no alcohol as an ingredient. Independent of that statement, the company's products are certified by halal authorities in several Muslim-majority markets, and certification bodies test rather than take a manufacturer's word.\n\n### Certification in practice\n\n| Market | Situation |\n|---|---|\n| Malaysia | Locally produced Coca-Cola is JAKIM-certified |\n| Indonesia | Certified through the national halal authority |\n| Gulf states | Locally bottled and certified for retail |\n| UK, EU, US | No local certification requirement; ingredient list is the reference |\n\nBecause Coca-Cola is bottled locally almost everywhere, the certificate that matters is the one for your market, not a global one.\n\n### Two rumours worth putting down\n\n**\"Coca-Cola contains pork enzymes.\"** There is no enzyme step in carbonated soft drink production and no credible source for this claim. It has circulated for decades in forwarded messages and has never been substantiated.\n\n**\"Coca-Cola contains a measurable amount of alcohol.\"** Tests periodically reported in the press find trace ethanol in the parts-per-million range, consistent with flavour carriers and with what is found in fruit juice. That is not the same as an alcoholic drink, and no halal authority treats it as one.\n\n### Caramel colour E150d\n\nThe colour is produced by heating carbohydrates with ammonium compounds. The starting material is sugar, the process is industrial chemistry, and there is no animal input. It is halal.\n\n### A separate question\n\nWhether to buy a particular brand for ethical, political or health reasons is a different discussion from whether it is halal, and the two get conflated often. The halal ruling here concerns ingredients and processing. If brand-level ethics matter to your decision, that is a legitimate consideration to weigh alongside it, not a change to the ruling.",
    "category": "drink",
    "priority": "high"
  },
  {
    "slug": "is-mcdonalds-fries-halal",
    "name": "McDonald's French Fries",
    "aliases": [
      "mcdonalds fries",
      "macca fries"
    ],
    "verdict": "doubtful",
    "shortReason": "It depends entirely on the country. US fries contain beef-derived flavouring; UK, EU and Muslim-market fries are made without it.",
    "detailedReason": "### The same product, two different recipes\n\nMcDonald's fries are the clearest example in fast food of why a global brand cannot have a single halal ruling. The potato, the oil and the salt are the same everywhere. What changes is one ingredient in the American recipe.\n\n| Market | Beef flavouring | Practical status |\n|---|---|---|\n| United States | Yes — \"natural beef flavor\" containing hydrolysed wheat and milk derivatives | Not halal |\n| Canada | Yes in most locations | Not halal |\n| United Kingdom | No | Halal ingredients, but shared fryers |\n| European Union | No | Halal ingredients, but shared fryers |\n| Gulf states, Malaysia, Indonesia, Turkey | No, and locally certified | Halal |\n\n### The American recipe\n\nUS fries are par-fried at the processing plant in an oil blend that includes what the ingredient list calls **natural beef flavor**. McDonald's discloses that this flavouring contains hydrolysed wheat and hydrolysed milk as starting ingredients. The company has stated the flavour is not derived from beef fat in the current formulation, but the ingredient is beef-derived in origin and the source animal is not slaughtered to halal requirements.\n\nFor most people following mainstream rulings, that makes American fries impermissible, and it is the reason the question comes up so often in the United States specifically.\n\n### The British and European recipe\n\nIn the UK and across the EU, the ingredient list is potatoes, vegetable oil, dextrose and salt, with a raising agent in some markets. There is no beef flavouring. McDonald's UK publishes the full breakdown and it contains nothing animal-derived.\n\nThat makes the ingredients halal. What it does not settle is the fryer.\n\n### The shared fryer problem\n\nIn a standard McDonald's kitchen, fries are cooked in dedicated fry vats separate from the vats used for chicken and fish. The chain's own allergen documentation describes this separation. Whether that satisfies you depends on how you weigh cross-contact: the meat products cooked in the restaurant are not halal-slaughtered in most Western markets, and oil, utensils and surfaces are shared to varying degrees between stations.\n\nScholars take different positions on cross-contact where no visible substance transfers. Some treat separated fryers as sufficient; others avoid eating anything from a kitchen that handles non-zabiha meat. This is the point on which people who read the same ingredient list reach different conclusions.\n\n### Certified markets\n\nIn Malaysia, Indonesia, the Gulf, Turkey, Pakistan and several other markets, entire McDonald's operations are halal-certified: supply chain, meat, kitchen and all. There the question does not arise at all. Certification is displayed in the restaurant and verifiable with the national authority.\n\n### How to check where you are\n\nMcDonald's publishes market-specific ingredient and allergen information on its national websites, and it is genuinely detailed. Search the site for your country rather than relying on an answer written for a different one — this is the single most common source of confusion on this question, because an American answer and a British answer are both correct for their own market and wrong for the other.",
    "category": "fast-food",
    "priority": "high"
  },
  {
    "slug": "is-pepsi-halal",
    "name": "Pepsi",
    "aliases": [
      "pepsi cola"
    ],
    "verdict": "halal",
    "shortReason": "Pepsi contains no animal ingredients and no added alcohol. It is halal-certified in several Muslim-majority markets.",
    "detailedReason": "### What is in the can\n\nCarbonated water, high-fructose corn syrup or sugar (depending on the market), caramel colour, phosphoric acid, caffeine, citric acid and natural flavour. Diet and zero variants swap sugar for aspartame, acesulfame K or similar sweeteners.\n\nNothing on that list is animal-derived. Soft drinks of this type do not use gelatin, rennet or animal emulsifiers.\n\n### The flavour and alcohol question\n\nFlavour compounds across the soft-drink industry are sometimes dissolved in ethanol as a processing carrier. Any residue in the finished beverage is at trace level, far below intoxicating quantity. Mainstream scholarly opinion and halal certification standards treat that differently from alcohol as a drink. PepsiCo states that Pepsi does not contain alcohol as an ingredient, and local bottling in Muslim-majority markets is routinely certified.\n\n### Certification by market\n\n| Market | Typical situation |\n|---|---|\n| Malaysia, Indonesia, Gulf, Pakistan, Turkey | Locally bottled and certified |\n| UK, EU, US | No local certification requirement; ingredient list is the reference |\n\nBecause Pepsi is bottled locally almost everywhere, the certificate that matters is the one for your market.\n\n### Colours and rumours\n\nCaramel colour (E150d) is produced from carbohydrates; there is no animal input. Persistent online claims about pork enzymes in cola have no basis in how carbonated soft drinks are made.\n\n### Related checks\n\nFlavoured and limited Pepsi variants can add colours or flavour systems the classic recipe does not have. Check the label on those separately. For a similar profile, see Coca-Cola and other clear sodas.",
    "category": "drink",
    "priority": "high"
  },
  {
    "slug": "is-glycerin-halal",
    "name": "Glycerin / Glycerol (E422)",
    "aliases": [
      "e422",
      "glycerine",
      "glycerol"
    ],
    "verdict": "doubtful",
    "shortReason": "Glycerin can be made from plant oil, animal fat or petrochemicals. Plant and synthetic glycerin are halal; tallow-derived glycerin is disputed and pork-derived is not.",
    "detailedReason": "### What glycerin is\n\nGlycerin, also written glycerol or listed as **E422**, is a clear, sweet, syrupy alcohol — but not an intoxicating one. Chemically it is a sugar alcohol with three hydroxyl groups, and it cannot intoxicate at any dose. The name confuses people, so it is worth stating plainly: glycerin is not the kind of alcohol that is prohibited.\n\nIt works as a humectant, a solvent and a sweetener, which is why it appears in an enormous range of products: toothpaste, soap, lotions, medicines, capsules, e-liquids, icing, low-sugar sweets, protein bars and baked goods.\n\n### The three ways it is made\n\n| Origin | How | Ruling |\n|---|---|---|\n| Plant oils — palm, soy, coconut, rapeseed | By-product of soap and biodiesel production | Halal |\n| Petrochemical | Synthesised from propylene | Halal |\n| Animal fat — beef tallow | Rendered and split | Depends on slaughter |\n| Animal fat — pork | Rendered and split | Haram |\n\nMost glycerin on the world market today is a by-product of biodiesel manufacturing, and biodiesel is overwhelmingly made from plant oils. That has shifted the balance strongly toward vegetable glycerin over the last two decades. Tallow-derived glycerin still exists, particularly in soap-industry supply chains, and is the reason the ingredient remains on watch lists.\n\n### Why the label rarely tells you\n\nAn ingredient list saying \"glycerin\" or \"E422\" gives no origin. Unlike some emulsifiers, glycerin is chemically identical whatever it was made from — a laboratory cannot reliably distinguish plant from animal glycerol in a finished product. Origin is a supply-chain fact, not a testable property, which is exactly why certification exists.\n\nSome manufacturers help voluntarily by writing **vegetable glycerin**, **glycerin (vegetable origin)** or **plant-derived glycerol**. Where they do, the question is closed.\n\n### Where it matters most\n\n**Medicines and capsules.** Soft gel capsules are often glycerin-based and are one of the most common places the question arises. Pharmacists can usually check the manufacturer's specification, and many medicines have alternative formulations.\n\n**Toothpaste and mouthwash.** Not swallowed in normal use, which changes how some scholars view it, but many people prefer certainty here anyway.\n\n**Cosmetics and skincare.** Applied externally, which most scholars treat differently from ingestion, though views vary on whether prohibited substances may be applied to the body.\n\n**Food and supplements.** The clearest case for wanting certification, since it is directly consumed.\n\n### The istihala argument\n\nSplitting a fat into glycerol and fatty acids is a genuine chemical transformation, and a minority of scholars argue that glycerin derived even from pork fat is no longer pork in any meaningful sense and takes a new ruling. This is a real position held by qualified scholars, but it is a minority one, and most halal certifiers do not operate on it. If you follow a scholar who accepts istihala broadly, glycerin is unlikely to concern you at all.\n\n### The practical route\n\nLook for a halal mark, a vegan claim, or the word \"vegetable\" next to the glycerin. Any of the three resolves it. For medication, do not stop taking something over an uncertain excipient — ask a pharmacist for an alternative formulation, since necessity has its own rulings and there is usually a plant-based option anyway.",
    "category": "additive",
    "priority": "high"
  },
  {
    "slug": "is-takis-halal",
    "name": "Takis Fuego",
    "aliases": [
      "takis"
    ],
    "verdict": "doubtful",
    "shortReason": "The corn base is fine, but the seasoning contains cheese and whey derivatives whose enzyme source is undeclared in most markets.",
    "detailedReason": "### What Takis are\n\nRolled corn tortilla chips made by Barcel, a Mexican company, fried and coated in an intensely acidic seasoning. Fuego, the flagship purple-bag flavour, is the one most people mean when they ask.\n\nThe base is corn masa flour, vegetable oil and salt. All halal. The question is entirely about the seasoning powder.\n\n### The seasoning\n\nTakis Fuego seasoning contains, among other things, maltodextrin, chilli pepper, salt, sugar, monosodium glutamate, citric acid, **cheese powder or whey solids** depending on the market, hydrolysed soy protein, artificial colours including Red 40 Lake and Yellow 6 Lake, and a range of flavourings.\n\nTwo elements need attention.\n\n**Dairy derivatives.** Cheese powder and whey both originate in a cheesemaking step that uses rennet. Where the rennet is animal and not from a halal-slaughtered animal, the derivative carries that status. Barcel does not routinely declare the enzyme source on retail packaging, and this is the central reason the product sits in the doubtful category rather than the halal one.\n\n**Flavourings and \"natural flavors\".** In North American labelling this term does not have to be broken down, and it can include animal-derived components. European labelling is more specific but Takis are largely a North American and Latin American product.\n\n### What is not a problem\n\n**Monosodium glutamate (E621)** is produced by bacterial fermentation of a carbohydrate source and is halal. It comes up frequently in questions about Takis and is a non-issue.\n\n**The artificial colours** — Red 40, Yellow 6, Blue 1 and their lake forms — are synthetic petrochemical dyes with no animal input. They attract health debate, particularly around children, but not a halal ruling.\n\n**Citric acid** is produced by fermentation using *Aspergillus niger* and is halal.\n\n### The flavour range\n\nTakis produce many variants and the seasonings differ. Fuego, Nitro, Blue Heat, Zombie and the rest each have their own ingredient list. Some contain more dairy than others; a few of the plainer variants are simpler. Any verdict has to be read per flavour.\n\n### How to resolve it for a specific bag\n\nThe ingredient list will tell you whether cheese or whey is present. It will not tell you the enzyme source. That leaves three routes:\n\n- Look for a **halal certification mark**, which some export packs for Muslim-majority markets carry\n- Look for a **vegetarian claim**, which would rule out animal rennet — rare on this product but decisive where present\n- **Ask Barcel directly** about the enzyme source for your market's formulation\n\n### The honest summary\n\nThere is no evidence of pork in Takis and nobody credible claims there is. The doubt is narrower and more technical: a dairy ingredient whose upstream enzyme is undeclared. For people who require certainty on rennet, that is enough to hold the product at doubtful. For people who accept dairy derivatives without tracing rennet, Takis present no other obstacle.",
    "category": "snack",
    "priority": "high"
  },
  {
    "slug": "is-cheetos-halal",
    "name": "Cheetos",
    "aliases": [
      "flamin hot cheetos"
    ],
    "verdict": "doubtful",
    "shortReason": "Cheetos cheese seasoning can involve animal enzymes in some markets (notably the US). UK/EU and vegetarian packs differ.",
    "detailedReason": "### Same brand, different recipes\n\nThe cornmeal crunch is fine. The cheese powder decides the ruling. US Cheetos have used animal enzymes in cheese seasoning; UK and many EU packs use microbial enzymes and often carry vegetarian suitability claims.\n\n### What to look for\n\nCountry of manufacture, a “suitable for vegetarians” flash, a local halal mark in Muslim markets, and the exact flavour name — Flamin’ Hot, plain cheese and limited editions are not identical formulas.\n\n### Practical rule\n\nNever apply a US forum answer to a UK bag or a Malaysian certified bag. Check the pack in your hand — the same market-split logic as Doritos.",
    "category": "snack",
    "priority": "high"
  },
  {
    "slug": "is-pringles-halal",
    "name": "Pringles",
    "aliases": [
      "pringles sour cream"
    ],
    "verdict": "doubtful",
    "shortReason": "The potato base is fine, but cheese and flavour seasonings can contain animal-derived enzymes or dairy whose rennet source is undeclared.",
    "detailedReason": "### What Pringles are\n\nReconstituted potato crisps made by Kellogg's (formerly Procter & Gamble): dehydrated potato, vegetable oil, rice flour, wheat starch, maltodextrin, emulsifier (typically E471), salt and a flavour seasoning that changes by variety.\n\nThe stackable shape is not the issue. The seasoning is.\n\n### Original / Ready Salted\n\nIn many markets the plainer salt flavours carry a vegetarian claim and use plant oil plus salt. Where that claim is present, animal rennet and gelatin are out. E471 still needs a plant origin confirmation if you are strict, but vegetarian labelling usually covers it.\n\n### Cheese and other flavoured varieties\n\nCheese, Sour Cream & Onion, and similar seasonings include dairy powders. Those powders inherit the rennet used in the original cheese. US packs often list enzymes without naming the source; UK and EU packs more often use microbial rennet and may carry a vegetarian flash.\n\n| Flavour type | Typical risk |\n|---|---|\n| Ready Salted / Original | Lowest — check vegetarian claim |\n| Cheese / sour cream | Dairy + enzymes |\n| Meat or bacon flavours | Often non-halal flavourings |\n| Sweet or exotic limited editions | Check colours and \"natural flavours\" |\n\n### Regional differences\n\nKellogg's formulates by market. A tube made for Malaysia or the Gulf may be certified; a US cheese flavour is frequently not. Always read the country of manufacture and any certification mark on the tube you are holding.\n\n### How to decide in the shop\n\n1. Look for a halal mark first\n2. Look for a vegetarian claim on cheese flavours\n3. Avoid bacon and meat-named variants in Western markets unless certified\n4. When in doubt, Ready Salted is the simplest option in the range",
    "category": "snack",
    "priority": "high"
  },
  {
    "slug": "is-snickers-halal",
    "name": "Snickers",
    "aliases": [
      "snickers bar"
    ],
    "verdict": "doubtful",
    "shortReason": "Classic Snickers has no gelatin; dairy and market recipes still deserve a check. Certified packs settle it.",
    "detailedReason": "### What builds the bar\n\nPeanuts, glucose syrup, sugar, nougat (egg white in many recipes), milk chocolate, butter or milkfat, salt and emulsifiers (usually soy lecithin). The chew comes from nougat and caramel — **not gelatin**, which is why Snickers is often easier than gummy candy.\n\n### Open points\n\n**Egg white** in nougat is halal. **Milk chocolate and butter** are dairy; any whey fraction follows rennet rules of the dairy supply. **Peanuts** are plant. Mars publishes different specifications by country, and several Muslim-majority markets sell certified Snickers.\n\n### Common confusion\n\nPeople sometimes assume all chewy chocolate bars contain gelatin. For classic Snickers that is usually false. Ice-cream Snickers, bakery bars and novelty fillings are different SKUs and can add gelatin or alcohol flavourings.\n\n### How to buy\n\nPrefer a halal mark when you see one. Otherwise confirm gelatin is absent, use a vegetarian claim where available, and treat ice-cream or dessert variants as separate products.",
    "category": "snack",
    "priority": "high"
  },
  {
    "slug": "is-mms-halal",
    "name": "M&M's",
    "aliases": [
      "m and ms",
      "m&ms"
    ],
    "verdict": "doubtful",
    "shortReason": "Many chocolate M&M’s are gelatin-free; colours (especially red) and dairy still need a quick label read.",
    "detailedReason": "### Shell and centre\n\nSugar, cocoa, milk powders, lactose, emulsifiers, colours, dextrin and a glaze such as carnauba wax. Mars removed gelatin from many chocolate M&M’s formulas; the shell does not need it.\n\n### Carmine history\n\nRed and pink shades historically used **carmine (E120)**. Many markets switched to synthetic or plant colours, but packs are not global. If you avoid insect dye, look specifically for E120 / carmine / cochineal.\n\n### Variety matrix\n\n| Type | Watch |\n|---|---|\n| Milk chocolate | Dairy / whey |\n| Peanut / almond | Same + nuts |\n| Crispy | Usually fine |\n| Sour / specialty | Separate formula |\n| Baking chips | Confirm colours |\n\n### Signals that help\n\nA halal logo ends the debate. A UK/EU vegetarian claim usually means no gelatin and no carmine. Without either, compare the colour list to your own standard on E120.",
    "category": "snack",
    "priority": "high"
  },
  {
    "slug": "is-toblerone-halal",
    "name": "Toblerone",
    "aliases": [
      "toblerone chocolate"
    ],
    "verdict": "halal",
    "shortReason": "Toblerone is milk chocolate with honey and almond nougat — no gelatin. Dairy means whey/rennet logic still applies in theory, but the bar is widely treated as fine and often certified.",
    "detailedReason": "### What is in the triangle\n\nSugar, milk powder, cocoa butter, cocoa mass, honey, milk fat, almonds, emulsifier (soy lecithin), egg white, flavouring. The distinctive nougat uses honey and egg white, not gelatin.\n\n### Why gelatin is not the issue\n\nToblerone sets as chocolate and nougat, not as a gummy gel. There is no pork gelatin in the classic Swiss recipe Mondelēz publishes for major markets.\n\n### Dairy\n\nMilk powder and milk fat are halal as milk products. Any residual whey fraction follows industrial dairy norms (usually microbial rennet in modern European supply). This is why many Muslims treat Toblerone as acceptable even without a logo, and why certified packs appear in Muslim retail.\n\n### Variants\n\nWhite, dark, fruit-and-nut and tiny editions can change inclusions. Read those packs; the classic milk Toblerone is the reference for this verdict.\n\n### Bottom line\n\nClassic Toblerone is one of the simpler chocolate bars to evaluate: plant + dairy + honey, no gelatin.",
    "category": "snack",
    "priority": "high"
  },
  {
    "slug": "is-haribo-halal",
    "name": "Haribo Goldbears",
    "aliases": [
      "haribo gummy bears"
    ],
    "verdict": "doubtful",
    "shortReason": "Standard Haribo Goldbears use pork gelatin and are not halal. The Turkish-made halal-certified range uses bovine gelatin and is.",
    "detailedReason": "### Two different products, one brand\n\nHaribo is not one answer. The company produces its gummy sweets in several countries to different recipes, and the gelatin source is exactly what changes between them. Reading \"Haribo\" on a pack tells you nothing; reading the country of manufacture tells you almost everything.\n\n| Where it was made | Gelatin | Status |\n|---|---|---|\n| Germany and most of the EU | Pork | Not halal |\n| United States | Pork | Not halal |\n| Turkey (halal-certified range) | Bovine, certified | Halal |\n| UK vegetarian and vegan lines | None | Halal, but check colours |\n\n### The gelatin question\n\nClassic Goldbears get their chew from gelatin, and Haribo's European and American production uses porcine gelatin. This is not hidden — German packs state *Schweinegelatine* or list gelatine in a context where pork is the industry default. There is no reformulated \"halal version\" of the German product; the halal product is a separate manufacturing line.\n\nHaribo's Turkish operation produces a range specifically for markets that require certification, using bovine gelatin from animals slaughtered to halal requirements, with certification from a recognised body. These packs carry a **helal** mark. They are exported widely and are what most halal grocers stock.\n\n### The second ingredient to check\n\nEven on a gelatin-free or bovine-gelatin pack, the red and pink pieces may be coloured with **carmine (E120)**, extracted from cochineal insects. Scholars differ on insect-derived colours; if you avoid carmine, check the colour list separately from the gelatin line, because a halal certificate from one body does not always imply the same position on carmine that you hold.\n\nGlazing agents are the third thing worth a glance. **Beeswax (E901)** and **carnauba wax (E903)** are both widely accepted — beeswax is a bee product rather than the insect itself, and carnauba comes from a palm.\n\n### Gelatin-free Haribo lines\n\nHaribo has introduced vegetarian and vegan products in some markets, notably in the UK, where pectin or starch replaces gelatin. These are clearly labelled with a vegan or vegetarian claim on the front of the pack. If the claim is there, gelatin is not.\n\n### How to check a specific pack in ten seconds\n\n1. Look for a halal or helal certification mark first — if it is there, you are done\n2. If not, find the country of manufacture on the back\n3. Read the gelatin line: an unqualified \"gelatine\" on an EU or US pack means pork\n4. Check for a vegan or vegetarian claim, which rules gelatin out entirely\n5. Scan the colours for E120 if carmine matters to you\n\n### A common misunderstanding\n\nPeople often assume that buying Haribo from a halal grocer guarantees the halal version. Some shops stock both, and the packaging looks nearly identical apart from the certification mark and the language on the back. The mark is the thing to look for, not the shop.",
    "category": "snack",
    "priority": "high"
  },
  {
    "slug": "is-sour-patch-kids-halal",
    "name": "Sour Patch Kids",
    "aliases": [
      "sour patch"
    ],
    "verdict": "doubtful",
    "shortReason": "Sour Patch Kids are typically gelatin-free starch gummies, but colours and \"natural flavors\" vary by market — check for carmine and confirm no gelatin on your bag.",
    "detailedReason": "### How they are made\n\nSour Patch Kids are sugar, invert sugar, modified corn starch, tartaric and citric acids, and colours / flavours, then coated in sour sugar. Mondelēz uses starch rather than gelatin for the chew in the main North American and many export formulas — that is why they are often labelled vegetarian.\n\n### What to verify on the bag\n\n1. **Gelatin** — should be absent on vegetarian-labelled packs\n2. **Carmine / E120** — possible on red pieces in some markets\n3. **Natural flavors** — opaque on US labels\n\n### Regional packs\n\nUS, Canadian, UK and Australian bags are not identical. A vegetarian claim is the fastest positive signal. Without it, read the full ingredient list before assuming the starch formula.\n\n### Related\n\nSwedish Fish and other soft candies from the same corporate family can differ — do not transfer this verdict blindly.",
    "category": "snack",
    "priority": "high"
  },
  {
    "slug": "is-kitkat-halal",
    "name": "KitKat",
    "aliases": [
      "kit kat"
    ],
    "verdict": "doubtful",
    "shortReason": "Classic KitKat is often vegetarian and gelatin-free, but whey and emulsifiers need checking, and recipes differ by country.",
    "detailedReason": "### The classic bar\n\nWheat flour, sugar, cocoa, vegetable fat, milk powders, whey, emulsifiers (soy lecithin and sometimes E476), raising agents and flavouring. Nestlé makes KitKat in many countries, and the recipe is not identical everywhere.\n\n### Why it is usually close to fine — but not automatic\n\nThere is typically **no gelatin** in the standard four-finger bar. Soy lecithin and E476 (castor-oil based) are plant-derived. The open questions are:\n\n- **Whey / milk powders** — inherit rennet from cheesemaking. In Europe microbial rennet is common; older or some regional recipes may differ.\n- **Vegetable fat** — plant oils are fine; confirm it is not a mixed animal fat in unusual markets (rare for KitKat, but label-reading still wins).\n- **Flavour variants** — matcha, ruby, sake, dessert editions can add colours, alcohol flavourings or gelatin inclusions.\n\n### Certification\n\nKitKat produced for Muslim-majority markets often carries a local halal logo. Packs in Japan, the UK and the US may be vegetarian-labelled without a halal mark. Vegetarian usually rules out gelatin and animal rennet, which is why UK packs are widely accepted by many Muslims who rely on that claim.\n\n### Limited editions\n\nTreat every novelty KitKat as a new product. The brand is famous for experimental flavours, and those are exactly where gelatin, carmine and alcohol-based extracts appear.",
    "category": "snack",
    "priority": "high"
  },
  {
    "slug": "is-starburst-halal",
    "name": "Starburst",
    "aliases": [
      "starbursts"
    ],
    "verdict": "doubtful",
    "shortReason": "Original Starburst chews are usually gelatin-free; glycerin/colours vary — do not confuse with Starburst gummies.",
    "detailedReason": "### Chews vs gummies\n\nOriginal fruit chews are typically sugar, corn syrup, oils, fruit juice, acids, glycerin and colours — often vegetarian. Starburst Gummies (where sold) are a different SKU and may contain gelatin.\n\n### What to verify\n\nNo gelatin; glycerin / vegetarian claim; carmine on reds; you are holding chews, not gummies.\n\n### Regional packs\n\nUS, UK and other recipes differ. Vegetarian flash is the fastest positive signal without a halal mark.\n\n### Bottom line\n\nChews: often OK after a label check. Any product with “gummies” in the name: separate, higher-risk read.",
    "category": "snack",
    "priority": "high"
  },
  {
    "slug": "is-bounty-halal",
    "name": "Bounty",
    "aliases": [
      "bounty bar"
    ],
    "verdict": "halal",
    "shortReason": "Bounty is coconut and milk chocolate. No gelatin in the standard bar; dairy is the only animal-derived input.",
    "detailedReason": "### Recipe shape\n\nDesiccated coconut, sugar, glucose syrup, milk chocolate, emulsifier and flavouring. The filling is coconut paste, not marshmallow or jelly — gelatin is not required for the classic bar to hold its shape.\n\n### Dairy chocolate\n\nMilk chocolate brings milk powder and milk fat. Those are halal milk products. Any industrial whey fraction follows modern dairy norms (usually microbial rennet in European supply). Mars sells certified Bounty in several Muslim-majority markets for that reason.\n\n### Why people still ask\n\nChocolate bars sit next to gelatin sweets in search results. Bounty’s coconut centre looks soft, so shoppers assume gummy chemistry. The soft bite is fat and shredded coconut, not a gel network.\n\n### Variants to separate\n\nBounty Dark, mini multipacks, ice-cream bars and bakery fillings are different SKUs. Ice-cream versions can introduce emulsifiers or gelatin elsewhere in the product. Read those labels on their own; this verdict is the classic chocolate bar.\n\n### Practical take\n\nClassic Bounty is one of the simpler chocolate-coconut products when a certification mark is unavailable: plant coconut + dairy chocolate, no gelatin.",
    "category": "snack",
    "priority": "high"
  },
  {
    "slug": "is-lindt-halal",
    "name": "Lindt Chocolate",
    "aliases": [
      "lindor truffles"
    ],
    "verdict": "doubtful",
    "shortReason": "Many Lindt bars are milk chocolate without gelatin, but liqueur centres and seasonal products need checking.",
    "detailedReason": "### Plain bars\n\nMilk, dark and white Lindt tablets are cocoa, sugar, cocoa butter and milk powder. No gelatin required. Dairy follows ordinary milk-chocolate logic.\n\n### Where doubt starts\n\nLiqueur and brandy fillings (alcohol); some soft centres and seasonal truffles; decorations with uncertain glaze; country-specific recipes.\n\n### Certification\n\nLindt produces certified lines for some Muslim markets; Western supermarket bars often have no mark. No mark ≠ automatic haram for a plain Excellence bar — it means you rely on the ingredient list.\n\n### Practical rule\n\nPlain Excellence / classic milk: generally fine on ingredients. Liqueur Lindor-style: avoid. Everything between: read the pack.",
    "category": "snack",
    "priority": "high"
  },
  {
    "slug": "is-monster-energy-halal",
    "name": "Monster Energy",
    "aliases": [
      "monster drink"
    ],
    "verdict": "halal",
    "shortReason": "Monster contains no animal ingredients and its taurine is synthetic. Some flavours use carmine for colour, which is worth checking separately.",
    "detailedReason": "### The core recipe\n\nCarbonated water, sugar and glucose, citric acid, taurine, sodium citrate, colour, panax ginseng extract, caffeine, L-carnitine, sorbic and benzoic acid preservatives, niacinamide, sodium chloride, glucuronolactone, inositol, guarana extract, pyridoxine and riboflavin.\n\nLong, but not problematic. There is no gelatin, no animal fat and no added alcohol.\n\n### The two ingredients people ask about\n\n**Taurine.** Named after ox bile, where it was first identified two centuries ago, and synthesised industrially ever since. The taurine in every commercial energy drink, Monster included, is made chemically rather than extracted from animals. The persistent rumours about bull-derived ingredients have no basis in how the compound is actually produced.\n\n**L-carnitine.** This one deserves more care than taurine, because L-carnitine genuinely can be derived from animal sources — it is concentrated in red meat, which is where the name comes from. Commercial L-carnitine for supplements and beverages is produced by chemical synthesis or microbial fermentation, and this is what beverage manufacturers use. Certification bodies check it as a matter of routine, which is another argument for buying a certified can where one is available.\n\n### The flavour that changes the answer\n\nMonster's range runs to dozens of variants, and the colour systems differ between them. Some red, pink and berry flavours use **carmine (E120)**, the insect-derived dye. If you avoid carmine, this is the ingredient to look for, and it is flavour-specific rather than brand-wide — the original green can and a red berry variant can have different answers.\n\n### Alcohol\n\nNone of the standard Monster range contains alcohol. Flavourings may use ethanol as a processing carrier at trace level, which halal standards treat as excused. Note that the company has separately launched alcoholic products under different branding in some markets; those are clearly labelled and are a different product line entirely, not a variant of the energy drink.\n\n### Certification by market\n\nMonster is manufactured under licence in several countries. In the Gulf, Malaysia and Indonesia, locally produced cans carry national halal certification. In Europe and North America there is no certification requirement and the ingredient list is the reference.\n\n### The practical check\n\n| What to look for | Why |\n|---|---|\n| Halal mark on the can | Resolves everything at once |\n| E120 or carmine in the colour line | Flavour-specific, most likely in red and pink variants |\n| \"Contains no animal products\" statement | Some markets carry it |\n\n### Beyond the fiqh\n\nA 500ml can carries around 160mg of caffeine plus roughly 54g of sugar in the standard version. The ingredient ruling is one question; whether daily consumption is sensible is another, and the general Islamic principle against self-harm is the frame most scholars use when asked about it.",
    "category": "drink",
    "priority": "high"
  },
  {
    "slug": "is-gatorade-halal",
    "name": "Gatorade",
    "aliases": [
      "gatorade thirst quencher"
    ],
    "verdict": "halal",
    "shortReason": "Classic Gatorade is water, sugars, electrolytes and flavourings — no gelatin. Protein lines are a different product.",
    "detailedReason": "### Classic thirst-quencher\n\nWater, sugar or glucose-fructose syrup, citric acid, sodium and potassium salts, flavouring and colours. The original sports drink formula does not use gelatin, collagen or meat extracts.\n\n### Colours and \"natural flavor\"\n\nBright reds and blues are usually synthetic. Carmine is uncommon in the main line but worth a glance on pink variants. On US labels, \"natural flavor\" need not disclose carriers; residual ethanol as a flavour solvent at soft-drink levels is accepted by standard halal certifiers.\n\n### Do not confuse SKUs\n\n**Gatorade Protein** shakes and some recovery bottles contain dairy proteins. Those are not the same as the translucent electrolyte drink. Apply this verdict only to the classic sports drink unless you have checked the protein product's label.\n\n### Certification and markets\n\nPepsiCo bottles Gatorade locally in many countries. Certified SKUs appear where retail rules require a mark. Elsewhere the short, non-animal ingredient list is why athletes in Muslim communities commonly use it during training outside Ramadan fasting hours.\n\n### Practical note\n\nHigh sugar and sodium are health considerations, not fiqh barriers. During Ramadan, sports drinks do not replace the ruling on fasting — they are for non-fasting use.",
    "category": "drink",
    "priority": "high"
  },
  {
    "slug": "is-sprite-halal",
    "name": "Sprite",
    "aliases": [],
    "verdict": "halal",
    "shortReason": "Sprite is a clear lemon-lime soda with no animal ingredients — one of the simpler soft drinks to evaluate.",
    "detailedReason": "### Ingredients\n\nCarbonated water, sugar or high-fructose corn syrup, citric acid, natural flavours, sodium citrate and a preservative such as sodium benzoate in many markets. There is no caramel colour, no dairy and no gelatin.\n\n### Why it is straightforward\n\nUnlike cream sodas or dessert drinks, classic Sprite does not rely on emulsifiers from fat or on dairy powders. The flavour system is citrus. Soft-drink flavour compounds may use ethanol as a processing carrier at trace level; that is not treated as an intoxicating drink under mainstream halal standards, and Coca-Cola Company products are certified in markets that require certification for retail.\n\n### Zero and remix variants\n\nSprite Zero / Light replace sugar with aspartame or similar sweeteners — still plant/synthetic, not animal. Tropical or coloured remix flavours add dye systems; if you avoid specific colours, read those packs separately.\n\n### Regional certification\n\n| Market | Situation |\n|---|---|\n| Gulf, Malaysia, Indonesia, Pakistan | Locally bottled Sprite usually certified |\n| UK, EU, US | Ingredient list is the reference |\n\n### Related\n\nSame evaluation pattern as Coca-Cola and Pepsi: short label, no meat derivatives, check novelty flavours on their own.",
    "category": "drink",
    "priority": "high"
  },
  {
    "slug": "is-dr-pepper-halal",
    "name": "Dr Pepper",
    "aliases": [],
    "verdict": "halal",
    "shortReason": "Dr Pepper is a flavoured cola-style soda without animal ingredients in the standard formula.",
    "detailedReason": "### Ingredients\n\nCarbonated water, sugar or HFCS, caramel colour, phosphoric acid, natural and artificial flavours, sodium benzoate, caffeine. The “23 flavours” marketing line does not imply animal extracts in modern commercial production.\n\n### Soft-drink rules of thumb\n\nNo gelatin. Caramel colour is carbohydrate-based. Flavour carriers may include trace ethanol in processing — treated as non-intoxicating under standard soft-drink practice.\n\n### Diet / Zero and flavours\n\nSweetener swaps do not introduce meat. Cherry and cream variants add flavour systems; still typically non-animal, but read the pack. Cream soda–style line extensions are still soft drinks, not dairy cream, unless a milk drink is explicitly sold.\n\n### Certification\n\nKeurig Dr Pepper products are certified in some export/Muslim markets. Elsewhere the published ingredient list is why the drink is generally accepted.\n\n### Bottom line\n\nStandard Dr Pepper is a straightforward halal soft drink on ingredient origin.",
    "category": "drink",
    "priority": "high"
  },
  {
    "slug": "is-mountain-dew-halal",
    "name": "Mountain Dew",
    "aliases": [
      "mtn dew"
    ],
    "verdict": "halal",
    "shortReason": "Mountain Dew is a citrus soft drink with no animal ingredients. Same evaluation pattern as other PepsiCo sodas.",
    "detailedReason": "### Core can\n\nCarbonated water, high-fructose corn syrup or sugar, concentrated orange juice (in many formulas), citric acid, caffeine, sodium benzoate, EDTA, flavours and Yellow 5 (tartrazine) in classic Dew.\n\nNo gelatin, dairy or meat derivatives.\n\n### Caffeine and colours\n\nCaffeine is permissible; dose is a health choice. Yellow 5 is a synthetic dye, not carmine. Some flavoured Dew lines (Code Red, pink editions) use different colour systems — check red variants for E120 if you avoid insect colours.\n\n### Regional recipes\n\nUS Mountain Dew is not identical to overseas variants (some markets sell lower-caffeine or different juice content). Certification appears where bottling partners require it.\n\n### Diet / Zero sugar\n\nSweetener swaps (aspartame, sucralose, acesulfame K) do not introduce animal ingredients. The origin ruling stays the same.\n\n### Bottom line\n\nClassic Mountain Dew is plant/mineral/synthetic. Novelty flavours deserve their own ten-second label glance.",
    "category": "drink",
    "priority": "high"
  },
  {
    "slug": "is-kombucha-halal",
    "name": "Kombucha",
    "aliases": [
      "fermented tea"
    ],
    "verdict": "doubtful",
    "shortReason": "Kombucha is fermented tea that can contain residual alcohol. Trace levels vary by brand and batch — check ABV and your scholarly comfort.",
    "detailedReason": "### What it is\n\nSweetened tea fermented with a SCOBY (bacteria and yeast). Fermentation produces organic acids, carbonation and small amounts of ethanol.\n\n### The alcohol question\n\nCommercial US kombucha is often kept under 0.5% ABV to stay non-alcoholic under labelling law, but homemade and some craft bottles can be higher. Scholars differ on whether any detectable ethanol from fermentation is acceptable in a drink marketed as a beverage.\n\n### Other ingredients\n\nBase tea, sugar and flavourings are plant-based. Gelatin is not typical. Fruit juices and herbs are fine.\n\n### Practical rule\n\nPrefer brands that publish ABV under 0.5% and that you personally accept. If you avoid all fermented drinks with ethanol, skip kombucha. See the longer /read guide if one exists on your site for deeper fiqh notes.",
    "category": "drink",
    "priority": "high"
  },
  {
    "slug": "is-starbucks-frappuccino-halal",
    "name": "Starbucks Bottled Frappuccino",
    "aliases": [
      "starbucks coffee"
    ],
    "verdict": "doubtful",
    "shortReason": "The coffee and milk base can be fine, but syrups, whipped cream and flavourings may include gelatin, carmine or alcohol-based extracts depending on the drink and market.",
    "detailedReason": "### Break the drink into parts\n\nA Frappuccino is not one ingredient. It is espresso or coffee base, milk or plant milk, ice, a flavoured syrup or sauce, and often whipped cream and a topping. Each layer has its own risks.\n\n### Usually straightforward\n\nBrewed coffee and espresso are plant products. Plain dairy milk is halal. Many plant milks (oat, almond, soy) are also fine if their emulsifiers are plant-based — which they usually are in major chains.\n\n### Where doubt comes in\n\n**Syrups and sauces.** Some contain vanilla extract (alcohol carrier), cream liqueur-style flavours, or colours such as carmine in pink/red drinks. Starbucks publishes ingredient lists by market; they differ between the US and Europe.\n\n**Whipped cream.** Often dairy-based and gelatin-free, but check — formulations change and some aerosol creams use gelatin.\n\n**Cookie, brownie and marshmallow toppings.** Bring gelatin, emulsifiers and possible alcohol flavourings from the bakery side.\n\n**Bottled Frappuccino** sold in shops is a different product from the barista-made drink and has its own label.\n\n### Regional practice\n\nIn Muslim-majority markets many Starbucks locations are certified or use certified dairy and syrups. In the US and UK the chain is generally not treated as fully halal; customers who drink there often stick to plain coffee and plant milk and skip novelty toppings.\n\n### Practical approach\n\nAsk for the ingredient card for your specific drink. Choose plain espresso drinks or simple iced coffee when you want fewer variables. Treat seasonal pink and dessert Frappuccinos as higher-risk until you have checked the syrup and topping list.",
    "category": "drink",
    "priority": "high"
  },
  {
    "slug": "is-e472-halal",
    "name": "E472 (a-f)",
    "aliases": [
      "DATEM",
      "e472e"
    ],
    "verdict": "doubtful",
    "shortReason": "E472 esters can be plant or animal fats reacted with food acids. The E number alone does not show the fat source.",
    "detailedReason": "### Family of additives\n\nE472a–f are acetic, lactic, citric, tartaric and mixed esters of mono- and diglycerides. They emulsify bread, cakes and whipped toppings.\n\n### Origin problem\n\nSame as E471: the fatty acid portion may be palm or animal tallow. EU labelling sometimes clarifies animal origin; many other markets do not.\n\n### Signals\n\nVegetable emulsifier / vegan bakery → plant, fine. Halal bread → covered. Bare E472 on a US label → doubtful for strict checkers.\n\n### Bottom line\n\nTreat like E471: plant OK, undocumented = check or choose a certified bakery product.",
    "category": "additive",
    "priority": "high"
  },
  {
    "slug": "is-e631-halal",
    "name": "E631 (Disodium Inosinate)",
    "aliases": [
      "e631"
    ],
    "verdict": "doubtful",
    "shortReason": "E631 (disodium inosinate) can be meat, fish or microbial. Unqualified E631 is doubtful; vegetarian claims clear it.",
    "detailedReason": "### Function\n\nFlavour enhancer often paired with MSG (E621) in crisps and instant noodles for a stronger savoury taste.\n\n### Sources\n\nMeat or fish extracts appear in some older or meat-positioned savoury bases. Microbial fermentation is common in vegetarian-labelled snacks. The E number alone does not say which.\n\n### How to read packs\n\nVegetarian or vegan crisps with E631 use the microbial route. A meat-flavoured snack with E631 and no claim stays doubtful. Halal-certified snacks are fine.\n\n### Related\n\nE627 (disodium guanylate) follows the same meat-vs-microbial logic. MSG (E621) itself is usually fermentation and clearer.",
    "category": "additive",
    "priority": "high"
  },
  {
    "slug": "is-pepsin-halal",
    "name": "Pepsin",
    "aliases": [
      "digestive enzyme"
    ],
    "verdict": "haram",
    "shortReason": "Pepsin is an enzyme from animal stomach lining, commonly porcine — not plant-based.",
    "detailedReason": "### What pepsin is\n\nA digestive enzyme extracted from animal stomachs (commonly pigs). Appears in some supplements and specialty food processes.\n\n### Ruling\n\nPorcine pepsin is impermissible. Pepsin from a non-zabiha animal is also rejected under mainstream standards. If the label says pepsin, assume animal origin unless a certified alternative is explicitly documented.\n\n### Where it shows up\n\nDigestive enzyme capsules and older specialty processes — less common on everyday snacks than rennet or gelatin, critical in supplements.\n\n### What to do\n\nAvoid products listing pepsin without a halal-certified source. For digestion aids, look for fungal protease enzymes instead.",
    "category": "ingredient",
    "priority": "high"
  },
  {
    "slug": "is-rennet-halal",
    "name": "Rennet",
    "aliases": [
      "animal rennet",
      "cheese rennet"
    ],
    "verdict": "doubtful",
    "shortReason": "Rennet can be animal, microbial or FPC. Animal rennet from non-halal slaughter is rejected; microbial is widely accepted.",
    "detailedReason": "### Role in cheese\n\nRennet coagulates milk into curds. Traditional rennet is from calf stomach. Modern industry mostly uses microbial rennet or fermentation-produced chymosin (FPC).\n\n### Status table\n\nPorcine rennet → haram. Calf rennet non-zabiha → not accepted. Calf rennet halal-slaughtered → accepted where certified. Microbial / FPC → widely accepted.\n\n### How to tell\n\nRetail cheese rarely says “calf rennet.” “Vegetarian cheese,” “microbial enzymes,” or a halal mark are the practical signals. US “enzymes” without detail stays opaque.\n\n### Whey and snacks\n\nCheese powders in crisps inherit the same rennet question — see Doritos and Cheetos for market-specific patterns.",
    "category": "ingredient",
    "priority": "high"
  },
  {
    "slug": "is-agar-agar-halal",
    "name": "Agar-Agar",
    "aliases": [
      "agar",
      "e406"
    ],
    "verdict": "halal",
    "shortReason": "Agar-agar is a gelling agent extracted from red seaweed. It is plant-based and a common halal alternative to gelatin.",
    "detailedReason": "### What it is\n\nAgar (E406) is a polysaccharide from red algae. It dissolves in boiling water and sets as it cools, firmer than gelatin and stable at warmer temperatures.\n\n### Why it is used as a gelatin replacement\n\nIt contains no animal tissue. Halal and vegetarian confectionery, desserts and microbiology labs use it for that reason. If a sweet is gelled with agar instead of gelatin, the gelatin ruling disappears.\n\n### Processing aids\n\nCommercial agar is washed and dried seaweed extract. No alcohol or animal enzyme step is required. Occasional blends sold as \"agar powder\" may mix in other gums — read the pack if you need pure agar.\n\n### Cooking tip\n\nAgar sets more firmly and at higher temperature than gelatin; recipes do not substitute 1:1 by weight without adjustment. For halal marshmallows and jellies, pectin and carrageenan are the other common plant options.",
    "category": "ingredient",
    "priority": "high"
  },
  {
    "slug": "is-pectin-halal",
    "name": "Pectin (E440)",
    "aliases": [
      "e440"
    ],
    "verdict": "halal",
    "shortReason": "Pectin is fruit fibre used to gel jams and gummies. It is plant-based and a standard halal alternative to gelatin.",
    "detailedReason": "### Source\n\nPectin (E440) is extracted mainly from citrus peel or apple pomace after juicing. It is a soluble fibre that gels in sugar-acid systems — the reason homemade jam sets.\n\n### Why confectioners switched to it\n\nGelatin is animal. Pectin is not. Halal-certified and vegan gummies almost always list pectin (sometimes with agar or starch) instead of gelatin. Seeing \"pectin\" on a sweet is a positive signal, but still confirm gelatin is not also listed.\n\n### What comes in the sachet\n\nRetail pectin often includes dextrose as a filler and citrate to control pH. Those carriers are plant or mineral. \"Jam sugar\" is sugar pre-blended with pectin — still plant-based.\n\n### Remaining checks on pectin sweets\n\nColours (including carmine), glazing agents and flavourings are independent of the gel. A pectin gummy can still be doubtful for colour reasons even when the gel itself is fine.\n\n### Cooking\n\nPectin sets differently from gelatin (needs sugar and acid; does not melt the same way in the mouth). For halal dessert work it is one of the three main plant gels alongside agar and carrageenan.",
    "category": "ingredient",
    "priority": "high"
  },
  {
    "slug": "is-civet-halal",
    "name": "Civet Extract (Kopi Luwak)",
    "aliases": [
      "civet coffee",
      "kopi luwak"
    ],
    "verdict": "haram",
    "shortReason": "Civet musk comes from civet-cat glands. Not accepted for fragrance or food under mainstream halal standards.",
    "detailedReason": "### What civet is\n\nA strong animal musk historically used in luxury perfume. Real civet is taken from civet cats, often with confinement and gland scraping — a welfare and purity problem beyond ordinary wool-grease comparisons.\n\n### Ruling\n\nNot analogous to beeswax. Treated as impermissible animal filth/secretion for fragrance by contemporary guidance that addresses it. Synthetic civet odour molecules are the modern substitute and are fine when fully synthetic.\n\n### Labels\n\n“Civet,” “musk civet,” or vintage perfume notes. Most modern mass perfume uses synthetics even when marketing says “civet.”\n\n### Practical rule\n\nAvoid products that disclose real civet. Synthetic musk compounds are the norm and acceptable.",
    "category": "ingredient",
    "priority": "high"
  },
  {
    "slug": "is-kfc-halal",
    "name": "KFC",
    "aliases": [
      "kentucky fried chicken"
    ],
    "verdict": "doubtful",
    "shortReason": "KFC is fully halal-certified in Muslim-majority countries and at selected certified branches elsewhere. Standard Western branches are not.",
    "detailedReason": "### It is a per-branch question, not a brand question\n\nKFC operates through franchises, and halal status is decided market by market and sometimes restaurant by restaurant. There is no global answer, and a chain-wide claim in either direction is wrong.\n\n| Market | Status |\n|---|---|\n| Malaysia, Indonesia, Pakistan, Gulf states, Turkey | Fully certified, whole menu |\n| United Kingdom | Around a fifth of restaurants are halal-certified and listed publicly |\n| France, Netherlands, Belgium | Selected certified branches |\n| United States, Canada, Australia | Not certified; a small number of independently certified franchises |\n\n### What certification covers when it exists\n\nIn certified markets the chicken is slaughtered to halal requirements by approved suppliers, the supply chain is audited, and the kitchen carries no pork products. In the UK, certified branches use chicken slaughtered under a recognised standard and KFC publishes the list of participating restaurants. Two details in that programme are worth knowing because they change the answer for some people.\n\n**Stunning.** Most UK halal-certified poultry is stunned before slaughter. The prevailing view among UK certifiers is that reversible stunning that does not kill the bird is acceptable; a significant body of scholarly opinion disagrees. If you follow the stricter position, a UK halal certificate may not be sufficient for you.\n\n**Menu scope.** In certified UK branches the chicken is halal but some side items and desserts are not part of the certification, and bacon-containing products are removed from the menu at those sites. Check the specific restaurant's notice rather than assuming.\n\n### Non-certified branches\n\nIn a standard Western KFC the chicken comes from conventional processing with no Islamic slaughter. Beyond the meat itself, the fryers handle products across the menu and the seasoning blends are not certified. Fries and non-meat sides are cooked in shared oil.\n\n### The gelatin and flavouring detail\n\nEven where the meat question is resolved, some KFC desserts and sauces have contained gelatin or dairy derivatives that need separate checking. Where a branch is fully certified this is covered by the certificate; where only the chicken is certified it is not.\n\n### How to verify a specific restaurant\n\nKFC maintains market-level halal information and, in the UK, a published list of certified locations. A certificate should be displayed in the restaurant naming the certifying body and its expiry. If staff cannot point to it, treat the branch as uncertified. Phone answers from a busy counter are not reliable on this — franchise staff frequently get it wrong in both directions.\n\n### Why the answers online contradict each other\n\nMost of the confusion comes from people generalising their local experience. Someone in Kuala Lumpur, someone in Birmingham and someone in Chicago will all give a confident and completely different answer, and each is describing their own market accurately. The only answer that matters is the one for the restaurant you are standing in.",
    "category": "fast-food",
    "priority": "high"
  },
  {
    "slug": "is-burger-king-halal",
    "name": "Burger King",
    "aliases": [
      "bk"
    ],
    "verdict": "doubtful",
    "shortReason": "Halal-certified in Muslim-majority markets and at some European branches. In the US, UK and most of Europe the standard menu is not halal.",
    "detailedReason": "### Where Burger King is certified\n\nLike other global chains, Burger King's halal status follows the market rather than the brand.\n\n| Market | Status |\n|---|---|\n| Gulf states, Malaysia, Indonesia, Turkey, Pakistan | Fully certified operations |\n| France | A number of certified restaurants operate under a halal-only menu |\n| United Kingdom | No chain-wide certification |\n| United States, Canada, Australia | Not certified |\n\n### The pork problem in Western branches\n\nBurger King's Western menus include bacon on several core items. That matters beyond the individual product: bacon is prepared and stored in the same kitchen, and grills and utensils are shared. Even a beef patty without bacon is cooked in an environment where pork is handled, which for most people rules out the standard Western menu regardless of the slaughter question.\n\nThis is a meaningful difference from chains that keep pork off the menu entirely, where the only open question is the slaughter method.\n\n### The flame-grill\n\nBurger King's flame-broiler is a conveyor grill shared across beef, chicken and, in markets that serve it, bacon. There is no separation between products on the belt. If cross-contact with pork concerns you, this is the specific mechanism to be aware of.\n\n### The plant-based option is not a shortcut\n\nThe plant-based and vegetarian burgers use meat-free patties, but in most Western markets they are cooked on the same broiler as the meat products unless you specifically request otherwise, and the chain says so in its own allergen guidance. A plant patty from a shared broiler does not solve the pork contact issue.\n\n### In certified markets\n\nWhere Burger King is certified, the whole operation is covered: halal-slaughtered beef and chicken, no pork on the menu, and audited suppliers. In the Gulf and Southeast Asia the certificate is displayed in the restaurant and registered with the national authority. The French halal restaurants operate a separate menu with no pork products at all.\n\n### Checking a specific location\n\nBurger King publishes ingredient and allergen data by market. For halal status specifically, the certificate has to be visible in the restaurant and issued by a named body — a staff member saying \"the beef is halal\" is not verification, and in uncertified markets it is usually incorrect.\n\n### The realistic summary\n\nIf you are in a Muslim-majority country, Burger King is straightforward. If you are in France, check whether your branch is one of the certified ones. Everywhere else in the West, the combination of uncertified slaughter and pork in the same kitchen means the standard menu does not meet halal requirements.",
    "category": "fast-food",
    "priority": "high"
  },
  {
    "slug": "is-subway-impossible-halal",
    "name": "Subway Veggie/Beyond Meat",
    "aliases": [
      "subway veggie patty"
    ],
    "verdict": "doubtful",
    "shortReason": "The Impossible patty is plant-based, but in most Western Subways it is prepared on shared equipment with non-halal meat.",
    "detailedReason": "### The patty\n\nImpossible Foods' burger patty is plant-based (soy protein, coconut/sunflower oil, heme from fermentation, binders). It contains no meat and no pork. From an ingredients view the patty itself is widely accepted as halal-suitable, and Impossible has pursued halal certification for the product in some channels.\n\n### The restaurant problem\n\nAt a standard Western Subway the patty is heated on the same grill or in the same microwave workflow used for meatballs, chicken and bacon-containing items, depending on the store. Shared utensils and prep surfaces are the rule, not the exception.\n\nSo the question \"Is Impossible Halal at Subway?\" is really two questions:\n\n1. Is the patty free of haram ingredients? Usually yes.\n2. Is the sandwich prepared without cross-contact with non-zabiha meat and pork? Only if the store separates equipment — which most Western stores do not advertise.\n\n### Certified Subway markets\n\nIn some Muslim-majority countries Subway operates fully certified restaurants with no pork and halal meat. There the Impossible question rarely arises because the whole kitchen is already under certification.\n\n### What to do\n\nAsk whether the Impossible patty is heated separately. If not, and you avoid shared grills with pork or non-zabiha meat, treat the sandwich as doubtful regardless of the plant patty. A certified Subway location removes the ambiguity.",
    "category": "fast-food",
    "priority": "high"
  },
  {
    "slug": "is-taco-bell-halal",
    "name": "Taco Bell",
    "aliases": [],
    "verdict": "doubtful",
    "shortReason": "Halal-certified in some Muslim-majority markets. In the US, UK and most of Europe the meat is not zabiha and kitchens handle pork.",
    "detailedReason": "### It depends on the country and the branch\n\nTaco Bell is a franchise system. Halal status is decided market by market, not by the global brand name on the sign.\n\n| Market | Typical status |\n|---|---|\n| UAE, Saudi Arabia, Malaysia, Pakistan | Many or all restaurants certified |\n| United Kingdom | Not chain-wide certified |\n| United States, Canada, Australia | Not certified; pork on the menu |\n\n### Western restaurants\n\nIn standard Western Taco Bell kitchens the beef and chicken are not slaughtered to Islamic requirements. The menu also includes pork products (bacon, some fillings). Shared grills, prep surfaces and fryers mean cross-contact is a practical issue even if you order a bean burrito.\n\nVegetarian items avoid the meat question but do not automatically solve shared-equipment contact with pork and non-zabiha meat. Ask how the kitchen separates items if that matters to your standard.\n\n### Certified markets\n\nWhere Taco Bell is fully certified, the supply chain and kitchen are audited: halal-slaughtered meat, no pork on the menu, and a visible certificate. That is the situation in several Gulf and Southeast Asian cities — not a licence to assume the same in London or Los Angeles.\n\n### How to verify\n\nLook for a named certifier's certificate in the restaurant. Staff saying \"the meat is fine\" without documentation is not verification. National Taco Bell sites sometimes list halal locations; use those lists rather than social-media screenshots.",
    "category": "fast-food",
    "priority": "high"
  },
  {
    "slug": "is-keratin-halal",
    "name": "Keratin",
    "aliases": [
      "hair keratin"
    ],
    "verdict": "doubtful",
    "shortReason": "Keratin in haircare is usually hydrolyzed animal protein (wool/feathers). External use is a judgment call; source matters if strict.",
    "detailedReason": "### What keratin treatments use\n\nHydrolyzed keratin from animal hair, wool, feathers or horns, broken into peptides for shampoos and smoothing treatments.\n\n### Fiqh angle\n\nExternal application has more disagreement than eating. Many users accept wool-derived keratin on hair; others prefer plant “keratin alternative” amino-acid blends.\n\n### Porcine vs wool\n\nDisclosed pork keratin → avoid. Wool keratin is common and treated more leniently by many as non-food fibre — still animal-derived.\n\n### Practical rule\n\nVegan haircare: no keratin protein. Conventional keratin shampoo: external-use judgment. Do not ingest keratin gummies unless certified.",
    "category": "cosmetics",
    "priority": "high"
  },
  {
    "slug": "is-collagen-halal",
    "name": "Collagen",
    "aliases": [
      "marine collagen",
      "bovine collagen"
    ],
    "verdict": "doubtful",
    "shortReason": "Collagen is almost always from animal skin or bones. Halal only if source and slaughter are certified; porcine is haram.",
    "detailedReason": "### What collagen is\n\nStructural protein from animal connective tissue. Powders, gummies and beauty drinks use bovine, porcine or marine collagen.\n\n### Ruling by source\n\nPorcine → haram. Bovine non-zabiha → not accepted by mainstream standards. Bovine/fish with halal certification → acceptable. Plant “collagen builders” → amino acid blends, usually fine, not true collagen.\n\n### Label words\n\nHydrolyzed collagen, collagen peptides, gelatin (related). Marine collagen still needs species/processing checks for strict certifiers.\n\n### Practical rule\n\nBuy only products with a clear halal mark naming the source. Unqualified collagen powder is doubtful at best.",
    "category": "cosmetics",
    "priority": "high"
  },
  {
    "slug": "is-stearic-acid-halal",
    "name": "Stearic Acid",
    "aliases": [
      "octadecanoic acid"
    ],
    "verdict": "doubtful",
    "shortReason": "Stearic acid can be plant oils or animal fat. The name alone does not tell you which.",
    "detailedReason": "### Dual origin\n\nStearic acid is a saturated fatty acid from palm/coconut or from tallow. Magnesium stearate in tablets is often plant-based today but not guaranteed.\n\n### How to decide\n\n“Vegetable stearic acid” → halal. Halal / vegan capsule → plant pathway. Unqualified stearic acid / stearates → doubtful.\n\n### Where it appears\n\nSupplements, tablets, cosmetics, chewing gum, processing aids. For essential medicines, necessity rules may apply — ask a pharmacist for alternatives when possible rather than stopping prescribed treatment.\n\n### Related\n\nSame origin logic as E470, E471 and glycerin: plant OK, pork/tallow not, undeclared = check.",
    "category": "cosmetics",
    "priority": "high"
  },
  {
    "slug": "is-cetyl-alcohol-halal",
    "name": "Cetyl / Cetearyl Alcohol",
    "aliases": [
      "fatty alcohol",
      "cetearyl alcohol"
    ],
    "verdict": "doubtful",
    "shortReason": "Cetyl alcohol in cosmetics can be plant oils or animal fats. External use is broadly fine; strict tracers prefer plant-declared sources.",
    "detailedReason": "### What it is\n\nA fatty alcohol used as a thickener and emollient in creams and lotions. Despite the name, it is not drinking alcohol (ethanol) and is not intoxicating.\n\n### Origin split\n\nFrom palm/coconut fatty acids or from animal fats. Many modern cosmetic grades are plant-derived, especially in vegan-labelled skincare.\n\n### Food vs skin\n\nOn skin, evaluate under cosmetics practice: external use of pure substances is widely permitted. Swallowing is not the intended use.\n\n### Practical rule\n\nVegan / plant-based creams: fine. Unqualified cetyl alcohol: acceptable to most users for external use; doubtful only if you require full plant documentation.",
    "category": "cosmetics",
    "priority": "high"
  },
  {
    "slug": "is-kosher-meat-halal",
    "name": "Kosher Meat",
    "aliases": [
      "kosher beef",
      "kosher chicken",
      "glatt kosher"
    ],
    "verdict": "doubtful",
    "shortReason": "Kosher meat is not automatically halal. Slaughter rules overlap but are not identical; many Muslims still require Islamic slaughter.",
    "detailedReason": "### Overlap and gaps\n\nBoth traditions require a cut to the throat of a permissible animal with a blessing framework. Details differ: who may slaughter, what invocation is required, and rules on stunning vary by authority.\n\n### Mainstream Muslim positions\n\nSome classical opinions accepted People of the Book slaughter under conditions. Many contemporary certifiers and consumers still want explicit Islamic slaughter (zabiha) and do not treat kosher supermarket meat as a substitute.\n\n### Practical reality\n\nBuying kosher because it “must be fine” is incomplete. Prefer meat with a recognised halal mark. If only kosher is available, ask a scholar you trust before relying on it as your default.\n\n### Bottom line\n\nKosher ≠ automatic halal. Certification for Muslim consumers remains the clear path.",
    "category": "ingredient",
    "priority": "high"
  },
  {
    "slug": "is-marshmallows-halal",
    "name": "Marshmallows",
    "aliases": [
      "kraft marshmallows",
      "marshmallow fluff"
    ],
    "verdict": "doubtful",
    "shortReason": "Standard marshmallows are built on gelatin, usually pork. Halal-certified and gelatin-free versions exist and are clearly labelled.",
    "detailedReason": "### Gelatin is not an additive here, it is the product\n\nIn most sweets gelatin is one ingredient among many. In a marshmallow it is structural. The confection is essentially sugar syrup whipped with gelatin to trap air, and the gelatin is what stops it collapsing. There is no way to make a conventional marshmallow without a gelling agent, which is why this is one of the few products where the halal question is almost always live.\n\nThe gelatin used in mainstream European and American marshmallow production is predominantly **porcine**, because pigskin gelatin has the bloom strength and cost profile the confectionery industry wants.\n\n### What is in a standard marshmallow\n\nGlucose syrup, sugar, dextrose, water, gelatin, and flavouring and colour. Some include cornflour or a dusting starch. The pink ones may be coloured with carmine, though synthetic reds are more common now.\n\n### The versions that are halal\n\n| Type | Gelling agent | Status |\n|---|---|---|\n| Standard EU / US marshmallow | Pork gelatin | Not halal |\n| Halal-certified marshmallow | Bovine gelatin, halal-slaughtered | Halal |\n| Fish gelatin marshmallow | Fish gelatin | Halal |\n| Vegan marshmallow | Aquafaba, carrageenan, agar or pectin | Halal |\n| \"Suitable for vegetarians\" marshmallow | Non-animal gelling agent | Halal |\n\nHalal marshmallows are now widely available. Several brands manufacture specifically for halal and kosher markets using bovine gelatin from certified slaughter, and the vegan category has grown quickly using aquafaba — the liquid from cooked chickpeas — which whips remarkably like egg white. Both are stocked by mainstream supermarkets in the UK and increasingly elsewhere.\n\n### Where marshmallows hide\n\nThe bag in the sweets aisle is obvious. These are less so:\n\n- **Breakfast cereals** with marshmallow pieces\n- **Hot chocolate sachets** with mini marshmallows included\n- **Rocky road, s'mores and marshmallow-topped desserts**\n- **Ice cream** with marshmallow swirl or pieces\n- **Marshmallow fluff and creme** spreads, which use egg white in some recipes and gelatin in others\n- **Cereal bars** and snack bars with a nougat or marshmallow layer\n\nAnywhere a recipe needs a light, chewy white filling, gelatin is the likely mechanism.\n\n### How to check in the shop\n\nThe fastest signal is a **vegetarian or vegan claim on the front of the pack**. Gelatin is never vegetarian, so the claim and the ingredient are mutually exclusive. Failing that, a **halal certification mark** confirms the gelatin source. If neither is present and the ingredient list says only \"gelatine\", assume pork on a European or American product.\n\n### Making them yourself\n\nMarshmallows are one of the easier confections to make at home, and substituting halal bovine gelatin, fish gelatin or agar for the standard product works well. Agar sets firmer and needs a slightly different technique; aquafaba produces a softer, more meringue-like result.",
    "category": "snack",
    "priority": "high"
  },
  {
    "slug": "is-prime-energy-halal",
    "name": "Prime Hydration & Energy",
    "aliases": [
      "prime drink",
      "logan paul prime"
    ],
    "verdict": "halal",
    "shortReason": "Prime Energy uses synthetic ingredients with no animal products in the standard formula. Check flavours for colours if you avoid carmine.",
    "detailedReason": "### What is in the can\n\nCarbonated water, citric acid, caffeine, electrolytes (sodium, potassium, magnesium), vitamins, artificial sweeteners (typically sucralose and acesulfame K), flavourings and colours. There is no taurine in some Prime Energy formulas — check your can — and no gelatin.\n\nThe core recipe is plant, mineral and synthetic. That makes the standard product straightforward from a halal ingredients view.\n\n### What people ask about\n\n**Caffeine.** Permissible; the health debate about high doses is separate from the fiqh of the ingredient itself. A can is high in caffeine relative to tea — that is a moderation question, not a haram ruling.\n\n**Artificial colours.** Red and pink flavours may use synthetic dyes or, less often, carmine. Read the colour line. Synthetic Red 40 / Allura Red is not animal-derived; E120 is.\n\n**Flavourings.** \"Natural flavors\" on US labels need not list carriers. Trace ethanol as a flavour solvent is treated as excused by mainstream certifiers when present only as a processing aid.\n\n### Hydration Prime vs Energy Prime\n\nPRIME Hydration (the drink bottle) and PRIME Energy (the can) are different products with different formulas. Do not transfer a verdict from one to the other without reading the label.\n\n### Certification\n\nAvailability of a local halal mark depends on the market. Where there is no mark, the ingredient list above is the reference for the standard Energy range.",
    "category": "drink",
    "priority": "high"
  },
  {
    "slug": "is-root-beer-halal",
    "name": "A&W Root Beer",
    "aliases": [
      "root beer",
      "a and w"
    ],
    "verdict": "halal",
    "shortReason": "Commercial root beer is a sweet soft drink, not alcoholic beer. Standard cans have no animal ingredients.",
    "detailedReason": "### Soft drink, not beer\n\nMajor root beers (A&W, Barq’s, Mug, IBC) are carbonated sugar water with root-beer flavour, caramel colour and preservatives. They are not fermented alcoholic beer.\n\n### Alcohol edge cases\n\nA few craft “hard root beers” contain alcohol and declare ABV. Those are alcoholic drinks. Classic supermarket root beer is 0.0% ABV soda.\n\n### Ingredients\n\nNo gelatin. Flavours are plant/synthetic. Caramel colour is carbohydrate-based. A root-beer float adds ice cream — judge the ice cream separately.\n\n### Practical take\n\nStandard root beer soda is fine. Read “hard” or craft fermented versions carefully for alcohol.",
    "category": "drink",
    "priority": "high"
  },
  {
    "slug": "is-ginger-ale-halal",
    "name": "Ginger Ale",
    "aliases": [
      "canada dry",
      "schweppes"
    ],
    "verdict": "halal",
    "shortReason": "Ginger ale is carbonated water, sweetener and ginger flavour — no animal ingredients in standard commercial formulas.",
    "detailedReason": "### Typical can\n\nCarbonated water, sugar or HFCS, citric acid, ginger-style natural flavours, preservatives and sometimes caramel colour. No gelatin, dairy or meat derivatives in mainstream supermarket ginger ale.\n\n### Alcohol confusion\n\nDespite the word “ale,” commercial ginger ale is a soft drink, not fermented beer. A few craft ginger beers declare ABV above 0.5% — those are alcoholic drinks and a different product category.\n\n### Brands\n\nCanada Dry, Schweppes, Seagram’s and store brands follow the soft-drink pattern. Diet versions swap sweeteners without introducing animal ingredients.\n\n### Practical take\n\nSupermarket ginger ale soda is fine. Read craft fermented ginger beer labels for alcohol before assuming the same ruling.",
    "category": "drink",
    "priority": "high"
  },
  {
    "slug": "is-e100-halal",
    "name": "E100 (Curcumin)",
    "aliases": [
      "e100",
      "turmeric extract"
    ],
    "verdict": "halal",
    "shortReason": "E100 is curcumin / turmeric colour — plant-based and halal.",
    "detailedReason": "### Identity\n\nE100 is curcumin from turmeric (*Curcuma longa*), or turmeric extract used as a food colour. May appear as “curcumin,” “turmeric extract,” or E100.\n\n### Origin\n\nPlant rhizome. No animal input. Accepted across mainstream halal standards.\n\n### Uses\n\nMustard, dairy alternatives, snacks, sauces, supplements. When yellow colour is E100 rather than an animal lake, that line is clear.\n\n### Carriers and blends\n\nPowdered curcumin may sit on starch or salt — still plant/mineral. Blends with other colours need those checked separately (e.g. carmine), but E100 itself is not the doubt point.",
    "category": "additive",
    "priority": "high"
  },
  {
    "slug": "is-e150-halal",
    "name": "E150a-d (Caramel Color)",
    "aliases": [
      "e150",
      "caramel coloring"
    ],
    "verdict": "halal",
    "shortReason": "E150 is caramel colour from heating carbohydrates — not an animal colour.",
    "detailedReason": "### Classes\n\nE150a–d are caramel colours made by controlled heating of sugars, sometimes with acids, alkalis or sulphite compounds. Used in colas, soy sauce, vinegar, baked goods and sweets for brown tint.\n\n### Origin\n\nThe feedstock is carbohydrate — plant sugars. No insect pigment and no meat extract. Major halal certification bodies accept caramel colour as halal.\n\n### Process debates ≠ fiqh origin\n\nAmmonia-process or sulphite-process discussions are manufacturing and toxicology topics. They do not turn E150 into an animal-derived additive.\n\n### Bottom line\n\nSeeing E150 on a soft drink or sauce does not create a gelatin-style problem. Keep reading for other additives if the product still feels unclear.",
    "category": "additive",
    "priority": "high"
  },
  {
    "slug": "is-e322-halal",
    "name": "E322 (Lecithin)",
    "aliases": [
      "e322",
      "soy lecithin",
      "sunflower lecithin"
    ],
    "verdict": "halal",
    "shortReason": "E322 is lecithin, usually soy or sunflower — a plant emulsifier; egg lecithin is also halal.",
    "detailedReason": "### What lecithin does\n\nEmulsifies chocolate, margarine, baked goods and pan sprays so fat and water phases stay mixed.\n\n### Sources\n\nSoy lecithin — most common, plant, halal. Sunflower lecithin — plant, allergen-friendlier. Egg lecithin — from eggs, also halal. Animal-tissue lecithin is not the commercial norm for food E322.\n\n### Allergen note\n\nSoy lecithin can matter for soy allergy labelling; that is separate from the origin ruling.\n\n### Bottom line\n\nE322 on a European or US ingredient list is treated as plant (or egg) and halal unless a rare specialty animal source is explicitly stated — which you should not assume.",
    "category": "additive",
    "priority": "high"
  },
  {
    "slug": "is-e330-halal",
    "name": "E330 (Citric Acid)",
    "aliases": [
      "e330",
      "citric acid"
    ],
    "verdict": "halal",
    "shortReason": "E330 is citric acid, usually from fermenting plant sugars — a standard acid in drinks and sweets.",
    "detailedReason": "### Production\n\nAlmost all food citric acid is made by fermenting molasses or other plant carbohydrates with *Aspergillus niger*, then purifying the acid. Bulk E330 is not squeezed lemon juice, even though the molecule is the same one found in citrus.\n\n### Halal status\n\nPlant/microbial feedstock — no slaughter product, no gelatin, no animal fat. Major certifiers list citric acid as halal without special conditions.\n\n### Where you see it\n\nSoft drinks, gummies, canned fruit, sherbet, cleaning products (non-food). Finding E330 never drives a haram ruling by itself.\n\n### Related acids\n\nMalic, tartaric and ascorbic acids follow the same plant/synthetic pattern. If a sour candy is doubtful, look for gelatin or carmine — not for citric acid.",
    "category": "additive",
    "priority": "high"
  },
  {
    "slug": "is-e415-halal",
    "name": "E415 (Xanthan Gum)",
    "aliases": [
      "e415",
      "xanthan"
    ],
    "verdict": "halal",
    "shortReason": "E415 is xanthan gum from bacterial fermentation of plant sugars.",
    "detailedReason": "### Production\n\n*Xanthomonas campestris* ferments glucose or sucrose into xanthan gum. The feedstock is plant sugar; the gum thickens sauces, gluten-free baking and dressings.\n\n### Halal status\n\nAccepted as plant/microbial. No slaughter product. Certifiers list xanthan as halal.\n\n### Growth-media concerns\n\nUltra-strict reviews sometimes ask whether fermentation media include animal nutrients. Mainstream food-grade xanthan for retail foods is produced on carbohydrate media and treated as halal by major bodies.\n\n### Bottom line\n\nE415 itself is not a doubt additive. Check gelatin or animal emulsifiers elsewhere on the same label if needed.",
    "category": "additive",
    "priority": "high"
  },
  {
    "slug": "is-e621-halal",
    "name": "E621 (MSG)",
    "aliases": [
      "e621",
      "monosodium glutamate",
      "msg"
    ],
    "verdict": "halal",
    "shortReason": "E621 is MSG from fermentation of plant carbohydrates — not meat extract.",
    "detailedReason": "### What MSG is\n\nThe sodium salt of glutamic acid, used to enhance savoury taste. Modern MSG is made by fermenting starch or molasses with bacteria, then purifying.\n\n### Not “meat powder”\n\nHistorically some savoury enhancers were meat stocks. Commercial E621 is a purified crystalline additive from fermentation, not powdered pork or beef.\n\n### Halal status\n\nMajor certifiers accept MSG as halal. Preferring to avoid “additives” is personal or health preference, not an origin prohibition.\n\n### Label names\n\nMSG, E621, monosodium glutamate. Yeast extract is related as a savoury booster but is not identical — also typically plant/microbial.",
    "category": "additive",
    "priority": "high"
  },
  {
    "slug": "is-e476-halal",
    "name": "E476 (PGPR)",
    "aliases": [
      "e476",
      "polyglycerol polyricinoleate"
    ],
    "verdict": "doubtful",
    "shortReason": "E476 (PGPR) is usually plant (castor), but polyglycerol pathways can involve animal fats — prefer vegetable claims.",
    "detailedReason": "### Function\n\nPGPR reduces chocolate viscosity so manufacturers use less cocoa butter. Common in compound chocolate and confectionery.\n\n### Origin\n\nRicinoleic acid from castor oil (plant). The polyglycerol portion can theoretically link to animal or plant glycerol. Many manufacturers state vegetable origin; not all labels say so.\n\n### Practical approach\n\n“Vegetable PGPR” / vegan chocolate → fine. Halal-certified bar → fine. Unqualified E476 → doubtful for strict checkers; often plant in practice.\n\n### Bottom line\n\nLower risk than gelatin, higher ambiguity than lecithin. Prefer packs that state vegetable emulsifiers when you are strict.",
    "category": "additive",
    "priority": "high"
  },
  {
    "slug": "is-e542-halal",
    "name": "E542 (Bone Phosphate)",
    "aliases": [
      "e542",
      "edible bone phosphate"
    ],
    "verdict": "haram",
    "shortReason": "E542 is edible bone phosphate from animal bones — not plant-based without certified source.",
    "detailedReason": "### What it is\n\nEdible bone phosphate is derived from animal bones, used historically as an anticaking or mineral additive.\n\n### Ruling\n\nBone from non-halal slaughter is not accepted. Porcine bone is haram. Even bovine bone needs certified slaughter context — which retail labels almost never provide for E542.\n\n### Modern labels\n\nE542 is less common than it once was. If you see it, treat the product as unsuitable unless a certifier explicitly covers that additive.\n\n### Alternatives\n\nPlant phosphates and mineral salts appear under other E numbers without bone origin.",
    "category": "additive",
    "priority": "high"
  },
  {
    "slug": "is-e428-halal",
    "name": "E428 (Gelatin)",
    "aliases": [
      "e428",
      "gelatine"
    ],
    "verdict": "haram",
    "shortReason": "E428 is gelatin. Unless the pack states halal bovine or fish gelatin, treat it as non-halal (often porcine).",
    "detailedReason": "### Identity\n\nE428 is the European code for gelatin — the same gelling protein used in gummies, marshmallows, soft capsules and some desserts.\n\n### Default ruling\n\nUnqualified gelatin in mainstream Western confectionery is typically porcine or mixed non-zabiha bovine. That is not halal for food use.\n\n### Exceptions that change the answer\n\nHalal-certified bovine gelatin from zabiha animals, fish gelatin accepted by your certifier, or a clear “halal gelatin” claim on the label.\n\n### Alternatives\n\nPectin, agar-agar and starch gummies avoid the issue. Always read “gummies” and “marshmallow” lines for gelatin or E428 before buying.",
    "category": "additive",
    "priority": "high"
  },
  {
    "slug": "is-carmine-lipstick-halal",
    "name": "Lipstick containing Carmine",
    "aliases": [
      "red lipstick",
      "carmine makeup"
    ],
    "verdict": "doubtful",
    "shortReason": "Carmine lipstick uses insect-derived red pigment. External use has scholarly disagreement; many avoid ingestible traces on lips.",
    "detailedReason": "### What carmine is\n\nE120 / cochineal — red colour from cochineal insects. In lipstick it provides durable reds and pinks.\n\n### Food vs lips\n\nEating carmine is widely avoided. Lip products are external but can be swallowed in tiny amounts. That dual nature is why many Muslims prefer carmine-free lipsticks even if they accept insect colours in non-lip cosmetics.\n\n### Alternatives\n\nSynthetic reds, plant lakes, and “carmine-free” / vegan lipsticks. Check INCI for CI 75470, carmine, cochineal.\n\n### Practical rule\n\nIf you avoid carmine in food, avoid it on lips too. Foundations and blushes are a separate judgment for some users — see related pages.",
    "category": "cosmetics",
    "priority": "high"
  },
  {
    "slug": "is-hyaluronic-acid-halal",
    "name": "Hyaluronic Acid",
    "aliases": [
      "ha serum",
      "hyaluronan"
    ],
    "verdict": "halal",
    "shortReason": "Cosmetic HA is almost always bacterial fermentation today, not rooster-comb extract.",
    "detailedReason": "### Modern source\n\nHyaluronic acid in serums and many supplements is produced by fermenting plant sugars with bacteria, then purifying sodium hyaluronate.\n\n### Older animal route\n\nHA can be extracted from rooster combs in some specialty medical products. That is not the default for drugstore skincare. Vegan-labelled serums confirm fermentation.\n\n### Food vs skin\n\nOn skin, HA is external use. In drinkable beauty supplements, prefer brands that state fermentation / vegan / halal.\n\n### Bottom line\n\nMainstream skincare HA: treated as halal microbial/plant pathway. Check ingestible powders if you are strict.",
    "category": "cosmetics",
    "priority": "high"
  },
  {
    "slug": "is-lanolin-halal",
    "name": "Lanolin",
    "aliases": [
      "wool wax",
      "wool grease"
    ],
    "verdict": "doubtful",
    "shortReason": "Lanolin is wool grease from sheep. External use is commonly accepted; it is still animal-derived.",
    "detailedReason": "### Source\n\nLanolin is secreted by sheep into the wool and recovered during scouring. It is not slaughtered meat, which is why many scholars allow it on skin while still calling it animal-derived.\n\n### Cosmetics practice\n\nNipple creams, lip balms, lotions and healing ointments use lanolin for occlusion. Lanolin allergy is a separate medical issue.\n\n### Strict vs mainstream\n\nMainstream external-use view: permissible. Vegan / avoid-all-animal: skip. Food use of lanolin is uncommon — do not eat wool-grease products.\n\n### Label names\n\nLanolin, lanolin alcohol, PEG-lanolin derivatives. Plant alternatives include shea, cocoa butter and synthetic esters.",
    "category": "cosmetics",
    "priority": "high"
  },
  {
    "slug": "is-ethanol-perfume-halal",
    "name": "Perfume with Alcohol (Ethanol)",
    "aliases": [
      "cologne",
      "eau de parfum",
      "alcohol denat"
    ],
    "verdict": "doubtful",
    "shortReason": "Perfume ethanol is denatured alcohol for external fragrance. Many scholars allow it on skin; others avoid alcohol-based sprays.",
    "detailedReason": "### What perfume alcohol is\n\nDenatured ethanol carries fragrance oils and evaporates from skin and clothes. It is not a drink. Denaturants make it unfit for consumption.\n\n### Scholarly landscape\n\nA large contemporary view permits external perfume alcohol because it is not ingested as khamr. A stricter view avoids any ethanol vehicle. Neither side treats spraying perfume as drinking wine — the dispute is about impurity and resemblance.\n\n### Alcohol-free options\n\nOil attars, solid balms and water-based mists. Popular in Muslim markets for this reason.\n\n### Practical rule\n\nFollow the position you already use for hand sanitiser and alcohol-based deodorant so your personal rule stays consistent.",
    "category": "cosmetics",
    "priority": "high"
  },
  {
    "slug": "is-chipotle-halal",
    "name": "Chipotle",
    "aliases": [
      "chipotle mexican grill"
    ],
    "verdict": "doubtful",
    "shortReason": "Chipotle is not a halal-certified US chain by default. Chicken and steak are conventional; sofritas/veg can still face cross-contact.",
    "detailedReason": "### Meat supply\n\nUS Chipotle chicken, steak and carnitas are not marketed as zabiha halal nationwide. Without halal slaughter certification, those proteins are not halal.\n\n### Vegetarian options\n\nSofritas (tofu), beans, rice, fajita veg and guacamole avoid meat ingredients. Shared grills, utensils and tortilla presses used with meat are a cross-contact issue for people who require a fully halal kitchen.\n\n### How to decide\n\nIf you only avoid eating haram meat itself and accept shared equipment, a sofritas bowl is an ingredients option. If you require certified halal premises, Chipotle US is not it unless a specific location publishes certification.\n\n### Bottom line\n\nDo not assume “Mexican grill” equals halal. Check local certification; default US meat = not halal.",
    "category": "fast-food",
    "priority": "high"
  },
  {
    "slug": "is-chick-fil-a-halal",
    "name": "Chick-fil-A",
    "aliases": [
      "chickfila",
      "cfa"
    ],
    "verdict": "haram",
    "shortReason": "Chick-fil-A chicken is not slaughtered to halal standards in the US; not a halal restaurant brand.",
    "detailedReason": "### Slaughter and supply\n\nMainstream US Chick-fil-A chicken is conventional poultry, not zabiha / certified halal. Without halal slaughter, the meat is not halal regardless of breading flavours.\n\n### Menu reality\n\nSandwiches, nuggets and strips are meat from that supply chain. Shared fryers add cross-contact for anyone avoiding the meat itself.\n\n### Sauces and sides\n\nSome sauces are free of meat ingredients on paper, but they are served in a non-halal chicken restaurant. Fries and drinks do not make the sandwich halal.\n\n### Exceptions\n\nA rare local franchise with separate certified supply would need explicit current certification — not assumed from the national brand. Default US ruling: not halal.",
    "category": "fast-food",
    "priority": "high"
  },
  {
    "slug": "is-dominos-halal",
    "name": "Dominos Pizza",
    "aliases": [
      "dominos"
    ],
    "verdict": "doubtful",
    "shortReason": "Domino’s is not a global halal chain. Some countries run certified stores; US/UK default stores use conventional meat and cheese — check your local franchise.",
    "detailedReason": "### It depends entirely on the country\n\nDomino’s operates as a franchise system. In Pakistan, parts of the Gulf, Malaysia and some other markets you will find clearly labelled halal Domino’s. In the United States, Canada and much of Europe, meat toppings are not zabiha by default and stores are not halal-certified.\n\n### Cheese\n\nPizza cheese may use animal or microbial rennet depending on the market supply contract. Vegetarian cheese options exist in some regions — ask the store.\n\n### Cross-contact\n\nEven a cheese pizza in a non-halal store is prepared on surfaces and cutters shared with pepperoni and chicken. People who only avoid haram meat ingredients still often skip those kitchens; people who require certified halal kitchens definitely do.\n\n### How to decide tonight\n\n1. Does the local Domino’s advertise halal certification?\n2. If not, assume meat is not halal\n3. Cheese-only is an ingredients maybe, kitchen no for strict standards\n\n### Bottom line\n\nNever generalise from a Dubai or Lahore store to a New York store. Local certification is the only green light.",
    "category": "fast-food",
    "priority": "high"
  },
  {
    "slug": "is-starbucks-syrups-halal",
    "name": "Starbucks Syrups",
    "aliases": [
      "starbucks vanilla",
      "starbucks caramel"
    ],
    "verdict": "doubtful",
    "shortReason": "Many syrups are sugar-based without gelatin, but sauces and seasonal pumps vary — stores are not universally halal-certified.",
    "detailedReason": "### Syrups vs the whole drink\n\nPlain espresso is ingredients-halal. Vanilla, caramel and hazelnut syrups are mostly sugar, water and flavour. Doubt remains because not every market publishes a full halal dossier, and thicker sauces (mocha, pumpkin, cookie) can include dairy emulsifiers or opaque “natural flavours.”\n\n### Alcohol in flavour systems\n\nSome natural flavours use ethanol as a carrier. Ask for the local ingredient book or stick to espresso with plain milk if you want fewer variables.\n\n### Kitchen context\n\nWestern Starbucks are not generally full-halal kitchens. Cross-contact with non-halal food matters to some customers more than syrup chemistry itself.\n\n### Safer orders\n\nBlack coffee, americano, espresso and plain milk drinks without seasonal sauce or candy toppings.",
    "category": "fast-food",
    "priority": "high"
  },
  {
    "slug": "is-lays-halal",
    "name": "Lays Potato Chips",
    "aliases": [
      "lays classic",
      "lays chips"
    ],
    "verdict": "doubtful",
    "shortReason": "Plain salted Lay’s are usually fine; cheese and novelty flavours depend on enzymes and seasonings that change by country.",
    "detailedReason": "### Classic / salted\n\nPotatoes, vegetable oil and salt. In most markets this flavour is vegetarian and free of gelatin. When you cannot find a halal logo, Classic is the lowest-complexity option in the Lay’s range.\n\n### Cheese and seasoning flavours\n\nCheese, sour cream, barbecue, French onion and regional specials add powders and flavour bases. Dairy powders inherit the rennet used upstream. Meat-named seasonings may use non-halal flavour chemistry. PepsiCo formulates by market — Egyptian, Indonesian and American bags are not interchangeable.\n\n### Decision table\n\n| Signal on the bag | Meaning |\n|---|---|\n| Halal mark | Accept for that market’s recipe |\n| Vegetarian claim on cheese flavour | Non-animal enzymes |\n| Cheese + undeclared enzymes, no claim | Doubtful |\n| Classic salted | Usually acceptable on ingredients |\n\n### Same family\n\nDoritos and Cheetos follow the same rule of thumb: plain bases are simple; cheese seasonings need a market-specific read.",
    "category": "snack",
    "priority": "high"
  },
  {
    "slug": "is-marshmallow-fluff-halal",
    "name": "Marshmallow Fluff",
    "aliases": [
      "fluff"
    ],
    "verdict": "doubtful",
    "shortReason": "Marshmallow Fluff is often egg-white based rather than gelatin, but formulas vary — confirm no gelatin on your jar.",
    "detailedReason": "### Fluff vs marshmallows\n\nJarred marshmallow creme (Fluff) historically uses corn syrup, sugar syrup, dried egg white and vanilla — whipped, not gelled with gelatin. That is why some vegetarian communities accept Fluff while rejecting gelatin marshmallows.\n\n### Still verify\n\nRecipes and copycats differ. Some marshmallow spreads do include gelatin. Read for gelatin, mono- and diglycerides, and vanilla extract if you avoid alcohol-based flavour.\n\n### Brands\n\nDurkee-Mower Fluff is the US reference product many people mean. Supermarket own-brand “marshmallow creme” is not automatically identical.\n\n### Practical stance\n\nIf the jar lists egg white and no gelatin, ingredients look acceptable to most shoppers. If gelatin appears, treat it like marshmallows.",
    "category": "snack",
    "priority": "high"
  },
  {
    "slug": "is-twix-halal",
    "name": "Twix",
    "aliases": [
      "twix bar"
    ],
    "verdict": "halal",
    "shortReason": "Twix is biscuit, caramel and milk chocolate — no gelatin in the standard bar. Dairy is the only animal input.",
    "detailedReason": "### Layers\n\nCookie biscuit, soft caramel and milk chocolate coating. Mars does not use gelatin to set classic Twix caramel; the chew comes from sugar syrup and dairy proteins.\n\n### Dairy\n\nMilk chocolate and caramel contain milk — halal as milk products under ordinary industrial dairy notes. Certified Twix appears in several Muslim-majority markets.\n\n### Variants\n\nSalted Caramel, white chocolate, ice-cream bars and bakery pieces can differ. Ice-cream and seasonal filled products need their own labels.\n\n### Compared with gelatin candy\n\nTwix is a chocolate biscuit bar, not a gummy. Soft texture does not mean gelatin is present.",
    "category": "snack",
    "priority": "high"
  },
  {
    "slug": "is-skittles-gummies-halal",
    "name": "Skittles Gummies",
    "aliases": [
      "skittles gummy"
    ],
    "verdict": "haram",
    "shortReason": "Skittles Gummies contain gelatin — unlike original hard-shell Skittles. Treat as a separate, non-halal product unless certified otherwise.",
    "detailedReason": "### Not the same as original Skittles\n\nOriginal Skittles were reformulated without gelatin. **Skittles Gummies** are a chewy gelatin candy that only shares branding. The name confuses shoppers constantly.\n\n### Why the ruling differs\n\nGelatin in mainstream US/EU gummy production is typically porcine unless labelled otherwise. Unqualified “gelatin” on a Skittles Gummies pack is why this product is not halal.\n\n### What to buy instead\n\nOriginal Skittles (check vegetarian / no gelatin); halal-certified gummies; pectin- or starch-based vegan gummies.\n\n### Label habit\n\nIf “Gummies” is on the front, do not apply the original Skittles verdict. Read for gelatin every time.",
    "category": "snack",
    "priority": "high"
  },
  {
    "slug": "is-pop-tarts-halal",
    "name": "Pop-Tarts",
    "aliases": [
      "poptarts",
      "frosted pop tarts"
    ],
    "verdict": "doubtful",
    "shortReason": "Pop-Tarts fillings and frostings vary; some use gelatin, animal shortening pathways or carmine — read each flavour.",
    "detailedReason": "### Why there is no single answer\n\nA Pop-Tart is pastry + filling + optional frosting. Kellogg’s / Kellanova formulas differ by flavour and market. Gelatin appears in some frostings or fillings historically; colours and emulsifiers differ.\n\n### What to check\n\nGelatin; carmine / Red 40 vs E120; beef tallow or animal mono- and diglycerides; marshmallow or yogurt flavours.\n\n### Safer patterns\n\nUnfrosted or simple fruit flavours in markets with vegetarian labelling are easier. Frosted brightly coloured kids’ flavours need the closest read.\n\n### Practical rule\n\nDo not transfer one flavour’s verdict to another. Scan or read the box every time.",
    "category": "snack",
    "priority": "high"
  },
  {
    "slug": "is-rice-krispies-treats-halal",
    "name": "Rice Krispies Treats",
    "aliases": [
      "kelloggs rice krispies"
    ],
    "verdict": "doubtful",
    "shortReason": "Rice Krispies Treats use marshmallow, which usually means gelatin — unless certified or gelatin-free.",
    "detailedReason": "### Why marshmallow matters\n\nClassic Treats bind puffed rice with marshmallow and butter. Commercial marshmallow almost always uses pork gelatin unless labelled otherwise. That gelatin transfers into the bar.\n\n### Packaged vs homemade\n\nShop-bought Treats in the US typically list gelatin. Homemade versions can use halal gelatin, agar, or a halal marshmallow brand.\n\n### Cereal alone is different\n\nPlain Rice Krispies cereal without marshmallow is a separate product. Do not apply the Treats verdict to the dry cereal box.\n\n### What to look for\n\nHalal or vegetarian marshmallow wording, or gelatin-free claim. Without that, packaged Treats stay doubtful on gelatin grounds.",
    "category": "snack",
    "priority": "high"
  },
  {
    "slug": "is-cera-ve-halal",
    "name": "CeraVe Skincare",
    "aliases": [
      "cerave cleanser",
      "cerave cream"
    ],
    "verdict": "halal",
    "shortReason": "CeraVe moisturisers are for external use and use mostly plant/synthetic bases; widely treated as fine for skin. Strict users may check cholesterol or lanolin paths per SKU.",
    "detailedReason": "### Cosmetics vs food\n\nIslamic rulings on cream differ from food: external use of pure substances is broadly permitted, and many scholars are more lenient on products that are not swallowed. Hand and face moisturiser is not evaluated like a gummy candy.\n\n### Typical CeraVe base\n\nCeramides (often synthetic or plant-derived in modern formulas), hyaluronic acid (commonly biofermentation), glycerin, fatty alcohols and emulsifiers. Some SKUs list cholesterol, which can follow a wool/lanolin pathway or a synthetic one — read that line if you are strict.\n\n### What does not apply\n\nThere is no gelatin-gummy logic here. Petrolatum and mineral oils in related healing ointments are separate products from CeraVe’s ceramide creams.\n\n### Practical stance\n\nFor most users following mainstream cosmetic guidance, CeraVe cleansers and moisturisers are accepted for external use. Vegans and full ingredient-tracers should still read each tube, especially richer “cream” SKUs versus light lotions.",
    "category": "cosmetics",
    "priority": "high"
  },
  {
    "slug": "is-vaseline-halal",
    "name": "Vaseline (Petroleum Jelly)",
    "aliases": [
      "petrolatum"
    ],
    "verdict": "halal",
    "shortReason": "Vaseline petroleum jelly is mineral petrolatum for external use — not rendered animal fat.",
    "detailedReason": "### Composition\n\nPetrolatum (petroleum jelly) is a purified mineral hydrocarbon ointment. Classic Vaseline is not rendered animal fat, despite folklore confusing it with tallow salves.\n\n### External use\n\nApplied to skin and lips. Mainstream rulings treat pure petrolatum as permissible for external use. It is not a food.\n\n### Variants\n\nFlavoured lip balms, cocoa butter blends and lotion lines can add lanolin, glycerin or colourants. Those SKUs need their own glance. Original healing jelly remains the simple reference.\n\n### Practical stance\n\nOriginal Vaseline jelly is widely accepted for external use. Avoiding all petroleum products is personal preference, not a porcine-fat ruling.",
    "category": "cosmetics",
    "priority": "high"
  },
  {
    "slug": "is-carmine-blush-halal",
    "name": "Blush with Carmine",
    "aliases": [
      "carmine makeup",
      "e120 blush"
    ],
    "verdict": "doubtful",
    "shortReason": "Carmine blush uses cochineal insect pigment. External makeup rulings differ; many who avoid food carmine also skip it on cheeks.",
    "detailedReason": "### Ingredient\n\nCI 75470, carmine or cochineal gives blue-red undertones in powder and cream blush. It is the same insect-derived colour used in some foods and lipsticks.\n\n### Scholarly split\n\nSome allow insect colours for external makeup; others avoid any insect-derived cosmetic. Blush is less likely to be ingested than lipstick, so some people accept blush carmine while refusing lip carmine — that is a personal consistency choice, not a single universal fatwa line.\n\n### How to avoid\n\nVegan blush, explicit “carmine-free” claims, or mineral makeup built on iron oxides instead of cochineal.\n\n### Practical rule\n\nIf you avoid carmine in food and want one rule for the bathroom shelf, skip carmine blush too.",
    "category": "cosmetics",
    "priority": "high"
  },
  {
    "slug": "is-e171-halal",
    "name": "E171 (Titanium Dioxide)",
    "aliases": [
      "titanium dioxide",
      "e171"
    ],
    "verdict": "halal",
    "shortReason": "E171 is titanium dioxide, a mineral whitener — not animal-derived (some regions restrict it for safety, not fiqh).",
    "detailedReason": "### Identity\n\nTitanium dioxide is a mineral pigment used to whiten coatings on sweets, tablets and icings. It is mined/processed inorganic material, not an animal product.\n\n### Halal vs safety law\n\nOrigin: halal (mineral). EU food regulators have restricted E171 over nanoparticle concerns — toxicology law, not Islamic ingredient origin. A product may be legal in the US and restricted in the EU without changing the animal-origin analysis.\n\n### Cosmetics\n\nStill used in some sunscreens and makeup. External mineral use is fine from a halal-origin view.\n\n### Bottom line\n\nE171 is not gelatin, carmine or fat. Animal-origin worry does not apply.",
    "category": "additive",
    "priority": "high"
  },
  {
    "slug": "is-e211-halal",
    "name": "E211 (Sodium Benzoate)",
    "aliases": [
      "e211",
      "sodium benzoate"
    ],
    "verdict": "halal",
    "shortReason": "E211 is sodium benzoate, a synthetic soft-drink preservative — not animal-derived.",
    "detailedReason": "### Function\n\nSodium benzoate slows microbial growth in acidic drinks, sauces and some condiments. It is one of the most common preservatives in sodas and fruit drinks.\n\n### Production\n\nMade from benzoic acid and sodium hydroxide. Food-grade benzoates are industrial chemicals, not meat, dairy or insect extracts.\n\n### Soft drinks\n\nOften paired with citric or phosphoric acid. E211 has no link to gelatin, rennet or glycerin questions, so its presence alone does not make a drink doubtful for origin reasons.\n\n### Health debates ≠ fiqh\n\nDiscussions about benzoate intake are toxicology and nutrition topics. They do not change the origin ruling: E211 is halal as an ingredient source.",
    "category": "additive",
    "priority": "high"
  },
  {
    "slug": "is-e202-halal",
    "name": "E202 (Potassium Sorbate)",
    "aliases": [
      "e202",
      "potassium sorbate"
    ],
    "verdict": "halal",
    "shortReason": "E202 is potassium sorbate, a synthetic preservative — not animal-derived.",
    "detailedReason": "### What it does\n\nPotassium sorbate (E202) inhibits moulds and yeasts in cheese, drinks, baked goods and dried fruit so products last longer on the shelf.\n\n### Origin\n\nProduced by neutralising sorbic acid with potassium hydroxide. Food-grade sorbic acid for this use is manufactured synthetically; it is not a meat or dairy extract despite occasional confusion with “sorbate” sounding biological.\n\n### Halal status\n\nCertification bodies treat E202 as halal. Its presence does not make a product doubtful.\n\n### Related preservatives\n\nE200 (sorbic acid), E201 (sodium sorbate) and E211 (sodium benzoate) follow the same synthetic logic — none are gelatin-like problems.",
    "category": "additive",
    "priority": "high"
  },
  {
    "slug": "is-e903-halal",
    "name": "E903 (Carnauba Wax)",
    "aliases": [
      "carnauba wax",
      "e903"
    ],
    "verdict": "halal",
    "shortReason": "E903 is carnauba wax from palm leaves — a plant glaze for sweets and fruit.",
    "detailedReason": "### Source\n\nCarnauba wax is exuded by the leaves of the Brazilian palm *Copernicia prunifera* and harvested from plant surfaces, not from animals.\n\n### Uses\n\nCandy coatings, fruit wax, chocolate polish and some cosmetics. It adds shine and a light moisture barrier so pieces do not stick in the bag.\n\n### Compared with other glazes\n\nCarnauba (E903) is plant and clear for halal purposes. Beeswax (E901) is generally accepted as a bee product. Shellac (E904) from the lac insect attracts more disagreement — do not lump all “glazes” together.\n\n### Bottom line\n\nE903 is a plant wax and is not a reason to avoid confectionery for halal purposes.",
    "category": "additive",
    "priority": "high"
  },
  {
    "slug": "is-e901-halal",
    "name": "E901 (Beeswax)",
    "aliases": [
      "beeswax",
      "cera alba",
      "e901"
    ],
    "verdict": "halal",
    "shortReason": "E901 is beeswax — a bee secretion, not insect flesh. Widely accepted for glazing sweets and cheese.",
    "detailedReason": "### What beeswax is\n\nBees secrete wax to build honeycomb. Food-grade beeswax (E901) glazes sweets, polishes fruit and coats cheese. It is not crushed insects (contrast carmine) and not an intoxicant.\n\n### Scholarly practice\n\nMajority contemporary standards accept beeswax and honey as bee products. Honey is explicitly lawful; beeswax follows practical acceptance for coatings.\n\n### Label names\n\nBeeswax, E901, white wax, yellow wax. Carnauba (E903) is a plant alternative if you prefer to avoid bee products personally — preference ≠ haram ruling.\n\n### Related\n\nShellac (E904) is a different secretion (lac insect) with more disagreement — do not conflate it with beeswax.",
    "category": "additive",
    "priority": "high"
  },
  {
    "slug": "is-carrageenan-halal",
    "name": "Carrageenan",
    "aliases": [
      "e407",
      "irish moss extract"
    ],
    "verdict": "halal",
    "shortReason": "Carrageenan is a seaweed thickener. It is plant-based and common in plant milks and desserts.",
    "detailedReason": "### What it is\n\nCarrageenan (E407, E407a) is extracted from red seaweed. Food makers use it to thicken chocolate milk, plant milks, ice cream, desserts and some processed meats.\n\n### Origin ruling\n\nSeaweed is not a land animal and does not require slaughter. Halal certification bodies treat carrageenan as permissible. Online health debates about degraded carrageenan in large doses are a nutrition/science discussion, not a change to the ingredient’s religious origin status.\n\n### Names on packs\n\nCarrageenan, Irish moss extract, E407, E407a (processed eucheuma seaweed). All are seaweed gums.\n\n### In plant milks\n\nOat, almond and soy milks may use carrageenan, gellan gum or locust bean gum. None of those plant gums introduce a meat problem. If a milk is doubtful, the reason is usually elsewhere (flavourings, vitamin carriers), not the seaweed thickener.\n\n### Related plant gels\n\nTogether with agar-agar and pectin, carrageenan is part of the standard toolkit for avoiding gelatin in industrial and home recipes.",
    "category": "ingredient",
    "priority": "high"
  },
  {
    "slug": "is-guar-gum-halal",
    "name": "Guar Gum",
    "aliases": [
      "e412",
      "guaran"
    ],
    "verdict": "halal",
    "shortReason": "Guar gum is a fibre from guar beans. It is a plant thickener used in ice cream, sauces and gluten-free foods.",
    "detailedReason": "### Source\n\nGuar gum (E412) comes from milling the endosperm of guar beans (*Cyamopsis tetragonoloba*). It hydrates in cold water and thickens dairy drinks, plant milks, sauces, ice cream and gluten-free doughs.\n\n### Halal status\n\nIt is a plant polysaccharide — no slaughter, no gelatin, no animal fat. Certification bodies treat guar gum as halal. It often appears alongside xanthan gum and locust bean gum in stabiliser blends.\n\n### Why it shows up in “doubtful” products\n\nIce cream can be doubtful for gelatin or E471 even while its guar gum is fine. Soft cheese spreads can be doubtful for rennet while the gum is fine. Judge each additive on its own line of the label.\n\n### Bottom line\n\nGuar gum itself is not a reason to avoid a food for halal purposes. Look past it to emulsifiers, gelatin and colours when a product still feels unclear.",
    "category": "ingredient",
    "priority": "high"
  },
  {
    "slug": "is-locust-bean-gum-halal",
    "name": "Locust Bean Gum",
    "aliases": [
      "carob gum",
      "e410"
    ],
    "verdict": "halal",
    "shortReason": "Locust bean gum (carob gum, E410) is plant fibre from carob seeds — a common ice-cream thickener.",
    "detailedReason": "### Source\n\nGround endosperm of carob tree seeds (*Ceratonia siliqua*). Also labelled carob bean gum or E410.\n\n### Halal status\n\nPlant polysaccharide. No animal input. Certifiers accept it routinely. Often paired with guar and carrageenan in dairy stabiliser systems.\n\n### Do not confuse with the product\n\nIce cream or cream cheese can still be doubtful for gelatin, rennet or E471 while listing locust bean gum. The gum is not the problem ingredient.\n\n### Bottom line\n\nLocust bean gum itself is fine. Keep reading the rest of the label when the food still feels unclear.",
    "category": "ingredient",
    "priority": "high"
  },
  {
    "slug": "is-tartaric-acid-halal",
    "name": "Tartaric Acid",
    "aliases": [
      "e334"
    ],
    "verdict": "halal",
    "shortReason": "Tartaric acid is from grapes / wine-industry by-products or synthesis — not an animal additive.",
    "detailedReason": "### Source\n\nNatural tartaric acid is recovered from grape processing (including cream of tartar pathways). Synthetic routes also exist. Neither involves meat, gelatin or insects.\n\n### Food uses\n\nBaking powder, sour sweets, soft drinks and frosting stabilisers. Often listed as tartaric acid or cream of tartar (potassium bitartrate).\n\n### Wine association\n\nGrape/wine industry origin does not make the purified acid an intoxicant. Residual ethanol is not the product; the acid is a crystalline food additive accepted by certifiers.\n\n### Bottom line\n\nTartaric acid is fine. If a candy is doubtful, look elsewhere on the label.",
    "category": "ingredient",
    "priority": "high"
  },
  {
    "slug": "is-capri-sun-halal",
    "name": "Capri Sun",
    "aliases": [
      "caprisun"
    ],
    "verdict": "halal",
    "shortReason": "Capri Sun pouches are juice drinks with water, concentrates, sugar and flavour — no gelatin in standard pouches.",
    "detailedReason": "### Pouch contents\n\nWater, fruit juice concentrates, sugar or sweetener, fruit acids, natural flavours and sometimes vitamin C. The drink is a liquid pouch, not a gelled dessert, so classic Capri Sun does not use gelatin.\n\n### Why parents ask\n\nJuice pouches sit next to gummy snacks in shopping baskets, so gelatin anxiety spills over. Capri Sun’s ingredient list is closer to soft drinks than to candy.\n\n### Watch-outs\n\nYoghurt-style, jelly-hybrid or novelty kids drinks from other brands are not Capri Sun. Read those pouches separately. Creamy-sounding flavour names do not automatically mean dairy — check the list.\n\n### Certification\n\nCertified packs appear in some markets. Standard pouches remain plant-based beverages with sugar and juice concentrates.",
    "category": "drink",
    "priority": "high"
  },
  {
    "slug": "is-fanta-halal",
    "name": "Fanta",
    "aliases": [
      "fanta orange"
    ],
    "verdict": "halal",
    "shortReason": "Fanta is fruit-flavoured soda without animal ingredients. Confirm colours on red or pink variants if you avoid carmine.",
    "detailedReason": "### Base recipe\n\nCarbonated water, sugar, fruit juice or flavour concentrates, citric acid, preservatives, colours and antioxidants depending on the flavour. Standard Fanta does not contain gelatin, meat fat or dairy.\n\n### Colours are the main variable\n\nOrange Fanta typically uses carotenoids or synthetic orange dyes — plant or petrochemical, not animal. Red and berry Fantas are where **carmine (E120)** could appear in some markets. If insect-derived dye matters to you, read the colour line before buying a red variant.\n\n### Heavily localised recipes\n\nFanta has dozens of country-specific flavours. A can from South Africa, Japan or Germany can differ in juice content, sweeteners and colours. Always read the pack in your hand; do not rely on a global assumption.\n\n### Certification\n\nIn Muslim-majority markets Fanta is commonly bottled under national halal schemes. Elsewhere the ingredient list above is why the drink is widely treated as halal, with the carmine caveat on certain colours.\n\n### Bottom line\n\nClassic orange Fanta is plant-based. Treat unusual colours and limited editions as separate products.",
    "category": "drink",
    "priority": "high"
  },
  {
    "slug": "is-lipton-ice-tea-halal",
    "name": "Lipton Ice Tea",
    "aliases": [
      "lipton peach",
      "lipton lemon"
    ],
    "verdict": "halal",
    "shortReason": "Bottled Lipton Ice Tea is tea, water, sugar/sweetener and flavour — no animal ingredients in the standard range.",
    "detailedReason": "### What’s in the bottle\n\nBrewed tea or tea extract, water, sugar or sweeteners, citric acid, flavours, and sometimes juice concentrates or preservatives. No gelatin or dairy in classic lemon / peach ice teas.\n\n### Flavoured lines\n\nMilk tea or creamy variants (where sold) are different products. Sparkling or specialty bottles may add colours — still usually plant/synthetic.\n\n### Certification\n\nUnilever / Pepsi partnerships bottle Lipton Ice Tea under local halal schemes in many Muslim markets. Elsewhere the short non-animal list is why it is commonly accepted.\n\n### Home-brewed vs bottled\n\nBrewing tea yourself is obviously fine. This verdict is about commercial bottled ice tea labels.",
    "category": "drink",
    "priority": "high"
  },
  {
    "slug": "is-hersheys-chocolate-halal",
    "name": "Hersheys Milk Chocolate",
    "aliases": [
      "hersheys bar"
    ],
    "verdict": "doubtful",
    "shortReason": "Plain Hershey’s milk chocolate has no gelatin, but US formulations and lack of a routine Western halal mark leave documentation gaps some shoppers care about.",
    "detailedReason": "### Plain bar ingredients\n\nSugar, milk, chocolate, cocoa butter, milk fat, lecithin, PGPR or other emulsifiers, vanillin. No gelatin. The animal input is dairy.\n\n### Why people hesitate\n\nHershey’s is strongly associated with the US market, where halal logos on everyday chocolate are uncommon. Certifiers like clear emulsifier origin (plant vs animal) and dairy enzyme pathways. “Artificial flavor” / vanillin is usually fine; real vanilla extract would be the alcohol question — Hershey’s often uses vanillin.\n\n### International packs\n\nHershey’s products made for Gulf, Malaysia or Indonesia may be certified locally. Do not assume the US bar matches that certified recipe.\n\n### Special products\n\nCookies-and-creme, syrup, baking melts and filled bars each need their own glance. Syrups are usually fine; cookies-and-creme inclusions can add emulsifiers from the cookie pieces.\n\n### Practical rule\n\nPlain milk/dark bars: no gelatin, dairy-based, commonly eaten by Muslims who accept undocumented industrial chocolate. Strict shoppers wait for a mark or choose a certified brand.",
    "category": "snack",
    "priority": "high"
  },
  {
    "slug": "is-reeses-halal",
    "name": "Reeses Peanut Butter Cups",
    "aliases": [
      "reeses cups"
    ],
    "verdict": "doubtful",
    "shortReason": "Reese’s peanut butter cups are milk chocolate and peanut butter without gelatin, but Hershey’s US recipes and enzymes/dairy details keep some shoppers cautious — check your market pack.",
    "detailedReason": "### What’s inside\n\nMilk chocolate, peanuts, sugar, dextrose, salt, TBHQ, and emulsifiers. The cups are not gelatin candies. Softness comes from peanut butter and chocolate fat, not a gummy gel.\n\n### Why the verdict is not a simple “halal”\n\nHershey’s US chocolate historically used emulsifiers and dairy ingredients that some certifiers want documented. Milk chocolate is dairy-halal in principle, but industrial whey/enzyme pathways and “natural flavor” opacity on US labels leave a documentation gap when there is no logo.\n\n### Certified markets\n\nIn several Muslim-majority countries Hershey’s / local partners sell certified peanut-butter cup style products. Those packs settle the question. A US supermarket cup without a mark is ingredients-plausible but not certified.\n\n### Variants\n\nReese’s Pieces, seasonal shapes, big cups and filled novelties can add colours or different coatings. Pieces are closer to candy shells; cups are the reference for this page.\n\n### Practical take\n\nNo gelatin. Dairy chocolate + peanut butter. Prefer a certified pack when you can; otherwise read emulsifiers and accept ordinary milk-chocolate caveats.",
    "category": "snack",
    "priority": "high"
  },
  {
    "slug": "is-sour-punch-straws-halal",
    "name": "Sour Punch Straws",
    "aliases": [
      "sour punch"
    ],
    "verdict": "doubtful",
    "shortReason": "Sour Punch straws are often starch-based and gelatin-free — confirm pack, colours and glycerin.",
    "detailedReason": "### Typical build\n\nCorn syrup, sugar, modified food starch, citric / tartaric / malic acids, colours and flavours. The straw is extruded starch candy closer to Sour Patch Kids than to gelatin gummy bears.\n\n### Verify on your bag\n\nConfirm gelatin is absent. Prefer a vegetarian claim when present. Check whether red colours are carmine or synthetic. If glycerin is listed, a vegetable / vegetarian note helps.\n\n### Brand lines\n\nStraws, bites, raisers and filled mixes can differ. Apply this verdict only to the bag in your hand.\n\n### Practical rule\n\nVegetarian labelling plus no gelatin is the working green light when a halal logo is missing. Otherwise keep the product doubtful until the full list is clear.",
    "category": "snack",
    "priority": "high"
  },
  {
    "slug": "is-twizzlers-halal",
    "name": "Twizzlers",
    "aliases": [
      "twizzlers twists"
    ],
    "verdict": "doubtful",
    "shortReason": "Many Twizzlers are gelatin-free corn-syrup licorice, but recipes and colours differ — confirm no gelatin and check red dyes.",
    "detailedReason": "### Typical Pull-n-Peel / Twists\n\nCorn syrup, enriched wheat flour, sugar, cornstarch, palm oil, salt, glycerin, artificial flavour, citric acid and colours. Hershey’s often builds the chew with starch and flour rather than gelatin, which is why some packs are vegetarian.\n\n### Three checks on every bag\n\n1. **Gelatin** — should be absent on vegetarian-labelled twists\n2. **Glycerin** — prefer vegetable glycerin or a vegetarian claim\n3. **Red colours** — carmine (E120) vs synthetic Red 40 / Allura Red\n\n### Not all Twizzlers are equal\n\nFilled, chocolate-covered, soft “bites” and seasonal Twizzlers can change the formula. A verdict on classic strawberry twists does not automatically cover every SKU on the shelf.\n\n### Signal to trust\n\nVegetarian labelling plus no gelatin is the practical green light when a halal logo is missing. Without either, treat the bag as doubtful until you read the full list.",
    "category": "snack",
    "priority": "high"
  },
  {
    "slug": "is-swedish-fish-halal",
    "name": "Swedish Fish",
    "aliases": [
      "swedish fish candy"
    ],
    "verdict": "doubtful",
    "shortReason": "Swedish Fish are usually starch-based (no gelatin) in major markets, but confirm on your pack and watch colours.",
    "detailedReason": "### Texture without gelatin\n\nIn the US and many export markets Swedish Fish use sugar, corn syrup, modified corn starch, citric acid, flavours and colours. Starch provides the chew. That is why they often carry a vegetarian claim and why they differ from gelatin gummy bears.\n\n### Still verify every bag\n\nFormulas change and not every country matches the US pack. Look for gelatin (should be none on vegetarian packs) and for carmine on red fish. “Natural flavors” on US labels stays opaque.\n\n### Category confusion\n\nStarch gummies are not automatically halal worldwide — gelatin gummies from other brands prove the soft-candy aisle is mixed. Brand + pack claim matter more than the fish shape.\n\n### Related\n\nIf you are comparing soft candies, also check Sour Patch Kids and Twizzlers on their own pages rather than assuming one starch candy equals another.",
    "category": "snack",
    "priority": "high"
  },
  {
    "slug": "is-airheads-halal",
    "name": "Airheads",
    "aliases": [
      "airheads candy"
    ],
    "verdict": "doubtful",
    "shortReason": "Airheads taffy is typically gelatin-free, but glycerin origin and colours need a label check; bites and gum lines differ.",
    "detailedReason": "### Classic taffy bar\n\nSugar, corn syrup, maltodextrin, dextrose, modified food starch, oil, citric acid, glycerin, artificial flavours and colours. Perfetti Van Melle’s main Airheads line generally builds chew from sugar syrup and starch — not a gelatin network.\n\n### Open points on the wrapper\n\nGlycerin may be plant or animal unless a vegetarian claim appears. Colours on red pieces occasionally raise carmine questions in some markets. Filled bites, gum and Xtremes are different SKUs with their own lists.\n\n### Practical rule\n\nVegetarian-labelled Airheads without gelatin are widely used by shoppers who accept glycerin only when marked vegetable. When neither claim appears, treat the bar as doubtful until you confirm the full ingredient panel.",
    "category": "snack",
    "priority": "high"
  },
  {
    "slug": "is-cheez-it-halal",
    "name": "Cheez-It",
    "aliases": [
      "cheez its"
    ],
    "verdict": "doubtful",
    "shortReason": "Cheez-It crackers use cheese seasoning. US versions may involve animal enzymes; check vegetarian claims or market-specific packs.",
    "detailedReason": "### What they are\n\nBaked cheese crackers: enriched flour, vegetable oil, cheese, salt, spices, yeast, colours. The crunch is not gelatin. The question is the cheese.\n\n### Enzyme / rennet path\n\nCheese and cheese cultures can involve animal rennet. Kellogg’s / Kellanova US snack labelling has used “cheese” and enzyme-related dairy components without always spelling out microbial vs animal for every SKU. UK and some export packs may differ.\n\n### Practical signals\n\n- Halal mark → fine\n- Suitable for vegetarians → animal rennet unlikely\n- US original with no claim → doubtful for strict readers\n\n### Flavours\n\nWhite cheddar, grooved, extra spicy and sandwich snack varieties each have their own seasoning. Extra-bold cheese flavours are not automatically worse, but meat-flavoured limited editions are.\n\n### Related\n\nSame logic as cheese powders on Doritos and cheese snacks generally: market recipe > brand name.",
    "category": "snack",
    "priority": "high"
  },
  {
    "slug": "is-goldfish-halal",
    "name": "Goldfish Crackers",
    "aliases": [
      "pepperidge farm goldfish"
    ],
    "verdict": "doubtful",
    "shortReason": "Pepperidge Farm Goldfish use cheese seasoning — enzyme/rennet opacity on US packs keeps them doubtful without a vegetarian or halal claim.",
    "detailedReason": "### Base cracker\n\nWheat flour, oil, salt, yeast and cheese powder. No gelatin. The question is the cheese.\n\n### Cheese enzymes\n\nUS snack cheese powders may use animal enzymes. Without “suitable for vegetarians” or a halal mark, strict shoppers treat cheddar Goldfish as doubtful. Some flavours (plain pretzel-style where sold) are simpler.\n\n### Flavours\n\nCheddar is the reference doubt. Flavour Blasted and filled varieties add more seasoning complexity. Colourful kids’ editions may add dyes worth a glance.\n\n### Practical rule\n\nVegetarian flash or certified pack → fine. US cheddar with no claim → doubtful for strict readers. Same logic as Cheez-It and cheese crisps.",
    "category": "snack",
    "priority": "high"
  },
  {
    "slug": "is-triscuit-halal",
    "name": "Triscuit",
    "aliases": [
      "triscuit crackers"
    ],
    "verdict": "halal",
    "shortReason": "Plain Triscuits are whole wheat, oil and salt — plant-based. Cheese-named seasonings need a short flavour check.",
    "detailedReason": "### Base cracker\n\nOriginal Triscuits are whole grain wheat, canola oil and sea salt, baked rather than fried in animal fat. There is no gelatin, meat flavour or cheese enzyme in the plain product.\n\n### Seasoned boxes\n\nHerb and cracked-pepper styles usually stay plant-based. Cheese-named seasonings add dairy powders; those are often microbial-rennet dairy in modern snack plants but still deserve a glance if you avoid all cheese powders. Meat-flavoured limited editions are the ones to treat carefully.\n\n### Practical pick\n\nOriginal or simple herb varieties are the easiest everyday choice. Treat cheese-named flavours as a ten-second label read, not as automatically haram.",
    "category": "snack",
    "priority": "high"
  },
  {
    "slug": "is-dunkin-donuts-coffee-halal",
    "name": "Dunkin' Donuts Coffee",
    "aliases": [
      "dunkin",
      "dunkin coffee",
      "dunkin donuts iced coffee"
    ],
    "verdict": "doubtful",
    "shortReason": "Black coffee is fine; flavoured Dunkin’ drinks and toppings need checking, and Western kitchens are not generally halal-certified.",
    "detailedReason": "### Black coffee and espresso\n\nBrewed coffee and espresso beans are plant products. Plain coffee at Dunkin’ is ingredients-halal.\n\n### Where doubt enters\n\nFlavoured syrups, creamers with glycerin or emulsifiers, whipped toppings, cookie/candy toppings. Seasonal drinks are the highest-risk board items.\n\n### Kitchen context\n\nWestern Dunkin’ locations are not typically fully halal-certified. Shared equipment with meat breakfast items matters to people who avoid that cross-contact.\n\n### Practical order\n\nBlack coffee or simple espresso with plain milk for fewer variables. Treat swirls and dessert toppings as ingredient questions — ask for allergen books where available.",
    "category": "drink",
    "priority": "high"
  },
  {
    "slug": "is-starbucks-caramel-macchiato-halal",
    "name": "Starbucks Caramel Macchiato",
    "aliases": [
      "caramel macchiato",
      "starbucks macchiato"
    ],
    "verdict": "doubtful",
    "shortReason": "The caramel drizzle may contain trace dairy/enzymes or flavorings of concern.",
    "detailedReason": "### What is it?\nA popular espresso-based beverage from Starbucks featuring vanilla syrup, steamed milk, espresso, and caramel drizzle.\n\n### Why it may be doubtful\nWhile the espresso and milk are halal, the vanilla syrup and the caramel drizzle are areas of investigation. The caramel drizzle contains butter and heavy cream (which are halal), but sometimes natural flavorings in Starbucks products have raised questions regarding trace alcohol used as a carrier. Most scholars consider standard Starbucks syrups acceptable due to the minute trace amounts of alcohol used in flavor extraction, but strict adherents may avoid it.\n\n### Fiqh considerations\nThe primary issue is Istihlak (transformation/dilution) of trace alcohol in flavorings. Many major halal certifiers allow trace alcohol in flavorings if it's less than 0.1% and not sourced from grapes/dates.\n\n### Practical advice\nIf you follow the opinion that trace alcohol in flavorings is permissible, this drink is fine. If you are strict, you might prefer a plain latte with sugar.",
    "category": "drink",
    "priority": "high"
  },
  {
    "slug": "is-celsius-energy-drink-halal",
    "name": "Celsius Energy Drink",
    "aliases": [
      "celsius",
      "celsius fitness drink"
    ],
    "verdict": "halal",
    "shortReason": "Celsius is a flavoured energy drink with caffeine, vitamins and sweeteners — no gelatin in standard cans.",
    "detailedReason": "### What’s in the can\n\nCarbonated water, citric acid, caffeine, sweeteners, vitamins, colours and flavours. Classic Celsius lines are built as energy drinks without animal gelatin.\n\n### Caffeine and stimulants\n\nCaffeine is permissible; quantity is a health choice. Guarana and green tea extracts are plant-based.\n\n### Colours and flavours\n\nMost use synthetic or plant colours. Red varieties deserve a quick carmine check — uncommon in this category but worth ten seconds.\n\n### Certification\n\nNot every market carries a logo. The published non-animal list is why the drink is generally accepted where certification is absent.",
    "category": "drink",
    "priority": "high"
  },
  {
    "slug": "is-ghost-energy-drink-halal",
    "name": "Ghost Energy Drink",
    "aliases": [
      "ghost energy",
      "ghost"
    ],
    "verdict": "halal",
    "shortReason": "Ghost Energy is a flavoured caffeinated drink without gelatin or meat ingredients in standard cans.",
    "detailedReason": "### Typical formula\n\nCarbonated water, sweeteners, citric acid, caffeine, amino acids (e.g. carnitine — check source on strict reads), vitamins, colours and flavours. No gelatin gummy chemistry.\n\n### Carnitine note\n\nL-carnitine can be synthetic or from animal sources. Many energy brands use synthetic/tartrate forms; if the label is opaque and you are strict, email the brand or choose a certified energy drink.\n\n### Caffeine\n\nPermissible; dose is a health choice. High-stimulant cans are not a fiqh-origin issue.\n\n### Practical take\n\nStandard Ghost cans are treated as ingredients-halal by most shoppers; verify carnitine if you are meticulous.",
    "category": "drink",
    "priority": "high"
  },
  {
    "slug": "is-chick-fil-a-chicken-halal",
    "name": "Chick-fil-A Chicken",
    "aliases": [
      "chick fil a",
      "chickfila"
    ],
    "verdict": "haram",
    "shortReason": "Chick-fil-A chicken in the US is not slaughtered to Islamic requirements. There is no chain-wide halal certification.",
    "detailedReason": "### The meat\n\nChick-fil-A's chicken sandwich and related chicken items use poultry from conventional US processing. That means the birds are not slaughtered according to zabiha requirements recognised by mainstream Muslim standards. Without Islamic slaughter, the meat is not halal.\n\n### Certification\n\nChick-fil-A does not operate a US-wide halal programme. Individual claims on social media about \"halal Chick-fil-A\" are almost always incorrect for standard locations. If a specific franchise ever carried a certificate, it would need to be verified on-site with a named certifier — it is not the default.\n\n### Fries and non-meat sides\n\nEven sides are cooked in a kitchen that handles non-halal chicken, with shared fryers and prep. People who only avoid eating the meat itself still face cross-contact questions; those who require zabiha meat will not eat here.\n\n### Alternatives\n\nIf you want a similar fast-food chicken sandwich, look for chains or local restaurants with visible halal certification rather than assuming a Christian-owned brand is religiously acceptable for meat — ownership ethics and slaughter method are different issues.",
    "category": "fast-food",
    "priority": "high"
  },
  {
    "slug": "is-burger-king-impossible-whopper-halal",
    "name": "Burger King Impossible Whopper",
    "aliases": [
      "impossible whopper",
      "bk impossible"
    ],
    "verdict": "doubtful",
    "shortReason": "Impossible patty is plant-based, but BK cooks it on the same broiler as beef in many markets — cross-contact and bun/sauce checks remain.",
    "detailedReason": "### Patty ingredients\n\nImpossible Foods’ patty is plant protein with heme from fermentation — not slaughtered meat. Ingredients-wise the patty aims to be vegetarian/vegan depending on market formulation.\n\n### The broiler problem\n\nMany Burger King restaurants cook Impossible Whoppers on the same flame broiler as beef burgers. That shared surface is why the product is not treated as halal kitchen food even when the patty itself has no meat.\n\n### Bun, cheese, sauces\n\nMayonnaise, cheese and bun glaze vary by country. Ask for no mayo / no cheese if needed and confirm local prep.\n\n### Practical rule\n\nIngredients of the patty ≠ halal restaurant. Only a certified BK or a confirmed separate cooker changes the kitchen ruling.",
    "category": "fast-food",
    "priority": "high"
  },
  {
    "slug": "is-heinz-ketchup-halal",
    "name": "Heinz Tomato Ketchup",
    "aliases": [
      "heinz ketchup",
      "ketchup"
    ],
    "verdict": "halal",
    "shortReason": "Heinz Tomato Ketchup is tomatoes, vinegar, sugar, salt and spices — no animal ingredients in the classic recipe.",
    "detailedReason": "### Classic bottle\n\nTomato concentrate, vinegar, sugar, salt, spice and onion powders. No gelatin, no meat stock in standard Heinz Tomato Ketchup.\n\n### Variants\n\nFlavoured ketchups, mayo blends and “ketchup + …” hybrids can differ. BBQ sauces from the same brand are separate products with possible anchovy or Worcestershire-type issues in some recipes — read those labels alone.\n\n### Certification\n\nHeinz products are certified in many Muslim markets. Elsewhere the short plant list is why classic ketchup is widely accepted.\n\n### Bottom line\n\nStandard tomato ketchup is one of the simpler condiments for halal shoppers.",
    "category": "other",
    "priority": "high"
  },
  {
    "slug": "is-soy-sauce-halal",
    "name": "Soy Sauce (Naturally Brewed)",
    "aliases": [
      "kikkoman soy sauce",
      "soy sauce"
    ],
    "verdict": "doubtful",
    "shortReason": "Naturally brewed soy sauce contains trace naturally occurring alcohol (1-2%).",
    "detailedReason": "### What is it?\nA liquid condiment of Chinese origin, traditionally made from a fermented paste of soybeans, roasted grain, brine, and Aspergillus oryzae molds.\n\n### Why it may be doubtful\nNaturally brewed soy sauce (like Kikkoman) undergoes fermentation, producing about 1.5% to 2% alcohol naturally. This is not added alcohol, but a byproduct of brewing. Non-brewed (chemical) soy sauce does not have this.\n\n### Fiqh considerations\nThere is a difference of opinion. Many scholars say that because this alcohol is a natural byproduct, is not added to intoxicate, and the sauce cannot intoxicate even if consumed in large quantities, it is permissible. Others prefer absolute strictness and advise using \"Tamari\" or \"All-Purpose\" soy sauces that explicitly have no alcohol.\n\n### Practical advice\nIf you follow the majority opinion on natural trace alcohol, it is fine. If you want to be completely safe, buy Halal-certified soy sauce or look for Kikkoman's specific Halal/Gluten-Free variants.",
    "category": "other",
    "priority": "high"
  }
];
