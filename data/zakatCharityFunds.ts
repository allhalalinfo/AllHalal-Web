/**
 * Verified charity partners for Zakat — users leave the site to donate directly.
 * Donation URLs are landing pages; amount pre-fill is rare without official APIs.
 */

export type CharityFund = {
  id: string;
  name: string;
  description: string;
  /** Primary donation / Zakat page */
  donateUrl: string;
};

export const ZAKAT_CHARITY_FUNDS: CharityFund[] = [
  {
    id: "irusa",
    name: "Islamic Relief USA (Zakat)",
    description: "Humanitarian relief, orphan care, food, water, and emergency aid worldwide.",
    donateUrl: "https://www.islamicreliefusa.org/zakat/",
  },
  {
    id: "zakat-org",
    name: "Zakat Foundation of America",
    description: "Zakat-eligible programs: food security, orphan support, sustainable livelihoods.",
    donateUrl: "https://www.zakat.org/give/",
  },
  {
    id: "muslim-aid",
    name: "Muslim Aid — Zakat",
    description: "Emergency response, healthcare, education, and seasonal giving.",
    donateUrl: "https://www.muslimaid.org/donate/zakat-donation/",
  },
  {
    id: "penny-appeal",
    name: "Penny Appeal USA — Zakat",
    description: "Grassroots projects: water wells, orphan homes, food packs.",
    donateUrl: "https://pennyappealusa.org/revolution/programs/zakat/",
  },
  {
    id: "launchgood",
    name: "LaunchGood (Zakat campaigns)",
    description: "Crowdfunded Muslim-led projects; pick a verified Zakat-eligible campaign.",
    donateUrl: "https://www.launchgood.com/discover?search=zakat",
  },
];
