/**
 * Zakat calculator FAQ — used for on-page accordion and FAQPage JSON-LD.
 * Keep plainTextAnswer in sync with visible copy for SEO.
 */

export type ZakatFaqBlock =
  | { type: "p"; text: string }
  | { type: "a"; text: string; href: string };

export type ZakatFaqItem = {
  id: string;
  question: string;
  blocks: ZakatFaqBlock[];
  /** Single string for Schema.org (no HTML) */
  plainTextAnswer: string;
};

export const ZAKAT_FAQ_ITEMS: ZakatFaqItem[] = [
  {
    id: "silver-standard",
    question: "Why do you default to the silver Nisab standard?",
    plainTextAnswer:
      "Silver Nisab is lower than gold, so more people become eligible to pay Zakat—fulfilling the purpose of supporting those in need. Imam Abu Hanifa and his school historically used silver weights for Nisab. Many contemporary scholars, including Sheikh Yusuf al-Qaradawi, argue that silver better reflects purchasing power today. You may choose gold if you follow a scholar who prefers the higher threshold. Sources: Al-Qaradawi, Fiqh al-Zakat (summary discussions on Nisab); classical Hanafi texts on silver dirham weights.",
    blocks: [
      {
        type: "p",
        text: "Silver Nisab is lower than gold, so more people meet the threshold—aligning with Zakat’s role as social solidarity. Imam Abu Hanifa’s school historically relied on silver dirham equivalents for Nisab.",
      },
      {
        type: "p",
        text: "Many contemporary scholars, including Sheikh Yusuf al-Qaradawi, argue silver tracks real living costs better than gold in modern economies. Gold remains valid if your marja‘ / scholar recommends the higher threshold.",
      },
      {
        type: "a",
        text: "Yusuf al-Qaradawi — Fiqh al-Zakat (Zakat jurisprudence overview)",
        href: "https://www.amazon.com/Fiqh-Zakat-Study-Charitable-Islamic/dp/156564153X",
      },
    ],
  },
  {
    id: "stocks",
    question: "How do I calculate Zakat on stocks and shares?",
    plainTextAnswer:
      "Use the market value of your holdings on your Zakat due date. For halal-screened equities, apply 2.5% on the zakatable portion after deducting non-halal income (tazkiyah) per your scholar’s method. Mixed or conventional portfolios need purification—consult a qualified advisor. Source: AAOIFI Shari‘ah standards on zakatable assets (summary guides).",
    blocks: [
      {
        type: "p",
        text: "Zakat is generally due on the market value of shares you fully own on the day you calculate, if you have held zakatable wealth above Nisab for a lunar year.",
      },
      {
        type: "p",
        text: "If a company earns impermissible income, scholars may require cleansing that portion of dividends or capital gains (tazkiyah) before paying Zakat on the rest—rules differ by school; use a qualified Islamic finance specialist for your case.",
      },
      {
        type: "a",
        text: "AAOIFI — Shari‘ah standards (investment references)",
        href: "https://aaoifi.com/",
      },
    ],
  },
  {
    id: "home-car",
    question: "Is Zakat due on my personal home or car?",
    plainTextAnswer:
      "No. Personal-use items like your primary residence and everyday car are not zakatable assets. Investment properties held for rental or resale are typically zakatable at their net investable value per your scholar. Source: mainstream fiqh manuals (personal vs trade assets).",
    blocks: [
      {
        type: "p",
        text: "Personal-use property—your family home and a reasonable vehicle for daily needs—is not subject to Zakat.",
      },
      {
        type: "p",
        text: "Property bought to rent out or flip is usually treated as a business/investment asset; its zakatable value depends on intent, debt, and scholarly guidance.",
      },
    ],
  },
  {
    id: "fluctuating-wealth",
    question: "What if my wealth went up and down during the year?",
    plainTextAnswer:
      "The key is whether you held zakatable net wealth above Nisab at the beginning and end of the lunar year (hawl). If it dipped below Nisab during the year, the year often resets when you again reach Nisab—details vary by madhhab; ask a scholar for borderline cases.",
    blocks: [
      {
        type: "p",
        text: "Classical fiqh looks at whether you were above Nisab at the start and still above Nisab at the end of one full lunar year. Temporary dips may restart the hawl depending on your school.",
      },
      {
        type: "p",
        text: "Example: you were above Nisab on 1 Ramadan and still above on 1 Ramadan next year—Zakat is typically due on what you own at the end, even if the path in between was bumpy.",
      },
    ],
  },
  {
    id: "crypto",
    question: "Do I pay Zakat on cryptocurrency?",
    plainTextAnswer:
      "Most contemporary scholars treat crypto you hold as wealth: value it in fiat at the Zakat date and include it if your total zakatable assets exceed Nisab after debts. Volatile assets still use spot price that day. Source: scholarly fatawa collections (e.g. IFG, local councils)—always confirm with your scholar.",
    blocks: [
      {
        type: "p",
        text: "Treat liquid crypto like cash or trade goods: convert to USD (or your currency) at the time of calculation and add it to your zakatable pool.",
      },
      {
        type: "p",
        text: "Staked or locked tokens, NFTs used as investments, and DeFi positions have nuanced rules—get case-specific advice.",
      },
      {
        type: "a",
        text: "IslamicFinanceGuru — Zakat on crypto (intro)",
        href: "https://www.islamicfinanceguru.com/",
      },
    ],
  },
  {
    id: "debts",
    question: "Are all debts deducted from Zakat?",
    plainTextAnswer:
      "Only short-term liabilities due within about the next lunar year reduce your zakatable base. Long-term mortgage principal is usually not fully deductible; many scholars allow the next 12 months of payments. Credit cards and personal loans due soon typically count.",
    blocks: [
      {
        type: "p",
        text: "Deduct what you must pay in the coming 12 months: upcoming bills, loans, and card balances—not the entire multi-decade mortgage balance.",
      },
      {
        type: "p",
        text: "If you are unsure how your bank structures principal vs interest, ask a scholar—interest portions are not Islamically valid deductions.",
      },
    ],
  },
  {
    id: "advance",
    question: "Can I pay Zakat early for future years?",
    plainTextAnswer:
      "Yes, many scholars allow paying Zakat in advance (ta‘jil) if you expect to remain liable, especially to help beneficiaries sooner. You should reconcile any difference when the actual year ends. Source: classical fiqh on Zakat timing (Hanafi and others permit advance in defined cases).",
    blocks: [
      {
        type: "p",
        text: "Advance payment is permitted in many schools when you are confident your obligation will continue; adjust if your wealth falls below Nisab later.",
      },
      {
        type: "p",
        text: "Keep a written note of the lunar date you used so you do not double-pay or skip accidentally.",
      },
    ],
  },
];
