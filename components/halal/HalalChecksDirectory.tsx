import Link from "next/link";
import { halalItems, type HalalItem } from "@/data/halalItems";

const CATEGORY_LABELS: Record<HalalItem["category"], string> = {
  snack: "Snacks & Sweets",
  drink: "Drinks & Energy",
  "fast-food": "Fast Food",
  ingredient: "Ingredients",
  additive: "E Numbers & Additives",
  cosmetics: "Cosmetics & Personal Care",
  other: "Other Checks",
};

const CATEGORY_ORDER: HalalItem["category"][] = [
  "snack",
  "drink",
  "fast-food",
  "ingredient",
  "additive",
  "cosmetics",
  "other",
];

const VERDICT_STYLES: Record<HalalItem["verdict"], { label: string; className: string }> = {
  halal: { label: "Halal", className: "bg-[#E6F2EC] text-[#1F6B4A]" },
  haram: { label: "Not halal", className: "bg-[#FBE9E7] text-[#A33224]" },
  doubtful: { label: "Depends", className: "bg-[#FDF3DC] text-[#8A6414]" },
};

export default function HalalChecksDirectory() {
  const grouped = CATEGORY_ORDER.map((category) => ({
    category,
    items: halalItems
      .filter((item) => item.category === category)
      .sort((a, b) => a.name.localeCompare(b.name)),
  })).filter((group) => group.items.length > 0);

  return (
    <section id="all-checks" className="py-20 bg-white border-t border-[#E8E6E1]">
      <div className="container mx-auto px-6 md:px-12 max-w-7xl">
        <div className="flex items-center gap-4 mb-4">
          <div className="w-1 h-12 bg-[#4B7A88]" />
          <h2 className="text-4xl md:text-5xl font-black text-[#2A2419]">
            Every halal check
          </h2>
        </div>
        <p className="text-lg text-[#5A5449] max-w-3xl mb-12">
          {halalItems.length} products, ingredients and E numbers reviewed against Islamic
          dietary rules. Pick an item to see the verdict, the reasoning and what to look
          for on the label.
        </p>

        <nav aria-label="Halal check categories" className="flex flex-wrap gap-3 mb-14">
          {grouped.map(({ category, items }) => (
            <a
              key={category}
              href={`#${category}`}
              className="rounded-full border border-[#E8E6E1] bg-[#FAFAF8] px-5 py-2 text-sm font-semibold text-[#2A2419] transition-colors hover:border-[#4B7A88] hover:text-[#4B7A88]"
            >
              {CATEGORY_LABELS[category]}
              <span className="ml-2 text-[#7A7569]">{items.length}</span>
            </a>
          ))}
        </nav>

        <div className="space-y-16">
          {grouped.map(({ category, items }) => (
            <div key={category} id={category} className="scroll-mt-28">
              <h3 className="text-2xl font-black text-[#2A2419] mb-6">
                {CATEGORY_LABELS[category]}
              </h3>
              <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {items.map((item) => {
                  const verdict = VERDICT_STYLES[item.verdict];
                  return (
                    <li key={item.slug}>
                      <Link
                        href={`/is-it-halal/${item.slug}`}
                        className="flex h-full items-center justify-between gap-3 rounded-xl border border-[#E8E6E1] bg-[#FAFAF8] px-4 py-3 transition-all hover:border-[#4B7A88] hover:bg-white hover:shadow-sm"
                      >
                        <span className="font-semibold text-[#2A2419]">
                          Is {item.name} halal?
                        </span>
                        <span
                          className={`shrink-0 rounded-full px-2.5 py-1 text-xs font-bold ${verdict.className}`}
                        >
                          {verdict.label}
                        </span>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
