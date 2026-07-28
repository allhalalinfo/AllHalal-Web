import Link from "next/link";
import { halalItems } from "@/data/halalItems";

/** The checks people actually search for, in the order they are searched. */
const FEATURED_SLUGS = [
  "is-gelatin-halal",
  "is-ice-cream-halal",
  "is-nutella-halal",
  "is-haribo-halal",
  "is-coca-cola-halal",
  "is-mcdonalds-fries-halal",
  "is-kfc-halal",
  "is-oreo-halal",
  "is-e471-halal",
  "is-carmine-halal",
  "is-red-bull-halal",
  "is-marshmallows-halal",
];

const VERDICT_STYLES = {
  halal: { label: "Halal", className: "bg-green-500/10 text-green-700" },
  haram: { label: "Not halal", className: "bg-red-500/10 text-red-700" },
  doubtful: { label: "Depends", className: "bg-amber-500/10 text-amber-800" },
} as const;

export default function PopularHalalChecks() {
  const featured = FEATURED_SLUGS.map((slug) =>
    halalItems.find((item) => item.slug === slug),
  ).filter((item): item is NonNullable<typeof item> => Boolean(item));

  if (featured.length === 0) {
    return null;
  }

  return (
    <div className="rounded-3xl border border-border bg-bg-card p-6 md:p-8">
      <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
        <div>
          <h2 className="font-display text-2xl font-black text-text-primary md:text-3xl">
            Is it halal?
          </h2>
          <p className="mt-1 text-text-secondary">
            Quick verdicts on the products people ask about most.
          </p>
        </div>
        <Link
          href="/is-it-halal"
          className="inline-flex items-center gap-1 text-sm font-semibold text-primary hover:underline"
        >
          All {halalItems.length} checks
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </Link>
      </div>

      <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {featured.map((item) => {
          const verdict = VERDICT_STYLES[item.verdict];
          return (
            <li key={item.slug}>
              <Link
                href={`/is-it-halal/${item.slug}`}
                className="flex h-full items-center justify-between gap-3 rounded-xl border border-border bg-bg-primary px-4 py-3 transition-colors hover:border-primary"
              >
                <span className="font-semibold text-text-primary">Is {item.name} halal?</span>
                <span className={`shrink-0 rounded-full px-2.5 py-1 text-xs font-bold ${verdict.className}`}>
                  {verdict.label}
                </span>
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
