import Link from "next/link";

const DEFAULT_LINKS = [
  {
    label: "Is it Halal?",
    href: "/is-it-halal",
    description: "Ingredient and brand checks",
  },
  {
    label: "Prayer Times",
    href: "/prayer-times",
    description: "Daily salah for your location",
  },
  {
    label: "Boycott Checker",
    href: "/boycott-checker",
    description: "Brand awareness tool",
  },
  {
    label: "Islamic Calendar",
    href: "/learn/islamic-calendar",
    description: "Hijri dates and sacred days",
  },
];

export default function PortalRelatedLinks({
  title = "Also on allhalal.info",
  links = DEFAULT_LINKS,
  excludeHref,
}: {
  title?: string;
  links?: Array<{ label: string; href: string; description: string }>;
  excludeHref?: string;
}) {
  const visible = links.filter((link) => link.href !== excludeHref);

  return (
    <div className="rounded-3xl border border-[rgba(47,37,30,0.08)] bg-white/60 p-8 shadow-[0_4px_24px_rgba(43,34,24,0.04)] backdrop-blur-sm">
      <h3 className="mb-6 text-xl font-bold text-text-primary">{title}</h3>
      <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {visible.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="block rounded-2xl border border-[rgba(47,37,30,0.08)] bg-white/80 p-5 transition-all hover:border-primary hover:bg-[rgba(244,185,66,0.04)] hover:shadow-md"
          >
            <p className="mb-1 font-bold text-text-primary">{link.label}</p>
            <p className="text-sm text-text-secondary">{link.description}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
