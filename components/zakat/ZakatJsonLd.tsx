import { SITE_URL } from "@/lib/seo/metadata";
import { ZAKAT_FAQ_ITEMS } from "@/data/zakatFaq";

type Props = {
  locale: string;
};

/**
 * WebApplication + FAQPage + HowTo structured data for the Zakat calculator route.
 */
export default function ZakatJsonLd({ locale }: Props) {
  const base = SITE_URL.replace(/\/$/, "");
  const pageUrl = `${base}/${locale}/finance/zakat-calculator`;

  const webApp = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "allhalal.info Zakat & Nisab Calculator",
    description:
      "Calculate Zakat using live gold and silver prices. Enter assets and debts, choose Nisab standard, and see 2.5% Zakat due.",
    url: pageUrl,
    applicationCategory: "https://schema.org/FinanceApplication",
    operatingSystem: "All",
    browserRequirements: "Requires JavaScript",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
  };

  const faqPage = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: ZAKAT_FAQ_ITEMS.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.plainTextAnswer,
      },
    })),
  };

  const howTo = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: "How to use the allhalal.info Zakat calculator",
    description: "Steps to estimate your annual Zakat using live Nisab thresholds.",
    totalTime: "PT5M",
    step: [
      {
        "@type": "HowToStep",
        position: 1,
        name: "Enter assets and debts",
        text: "Add cash, gold, silver, investments, and other zakatable assets in USD, then subtract debts due within the next lunar year.",
      },
      {
        "@type": "HowToStep",
        position: 2,
        name: "Choose Nisab standard",
        text: "Select gold or silver Nisab. Silver uses a lower threshold; gold is stricter. Live spot prices set today’s Nisab in USD.",
      },
      {
        "@type": "HowToStep",
        position: 3,
        name: "Confirm Hawl",
        text: "Check the box if your zakatable wealth has remained at or above Nisab for one full lunar year.",
      },
      {
        "@type": "HowToStep",
        position: 4,
        name: "Read Zakat due",
        text: "If eligible, pay 2.5% of net zakatable wealth. Consult a scholar for business, pension, or mixed-income cases.",
      },
    ],
  };

  const graph = {
    "@context": "https://schema.org",
    "@graph": [webApp, faqPage, howTo],
  };

  const json = JSON.stringify(graph);

  return (
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: json }} />
  );
}
