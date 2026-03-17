import Link from "next/link";
import { ArrowRight, ExternalLink } from "lucide-react";
import CategoryBadge from "@/components/briefs/CategoryBadge";
import BriefMedia from "@/components/briefs/BriefMedia";
import { formatTimeAgo, getBriefDisplayTimestamp } from "@/lib/briefs";
import type { Brief } from "@/types/brief";

function BriefMeta({ brief, compact = false }: { brief: Brief; compact?: boolean }) {
  const displayTimestamp = getBriefDisplayTimestamp(brief);

  return (
    <div
      className={`flex flex-wrap items-center gap-x-3 gap-y-2 text-text-muted ${
        compact ? "text-[0.78rem]" : "text-sm"
      }`}
    >
      <span className="font-semibold text-text-secondary">{brief.sources[0]?.name}</span>
      {displayTimestamp ? (
        <>
          <span aria-hidden="true">•</span>
          <time dateTime={displayTimestamp}>{formatTimeAgo(displayTimestamp)}</time>
        </>
      ) : null}
      {brief.source_count > 1 ? (
        <>
          <span aria-hidden="true">•</span>
          <span>{brief.source_count} sources</span>
        </>
      ) : null}
    </div>
  );
}

function BriefImage({ brief, priority = false }: { brief: Brief; priority?: boolean }) {
  return (
    <div className="relative aspect-[1.7/1] overflow-hidden rounded-[1.45rem] border border-[rgba(47,37,30,0.08)] bg-[rgba(246,241,233,0.72)]">
      <BriefMedia
        brief={brief}
        priority={priority}
        sizes="(min-width: 1280px) 720px, (min-width: 768px) 100vw, 100vw"
        className="object-cover transition-transform duration-500 group-hover:scale-[1.02]"
      />
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(18,17,15,0.02),rgba(18,17,15,0.16))]" />
    </div>
  );
}

export default function BriefCard({
  brief,
  locale,
  size,
}: {
  brief: Brief;
  locale: string;
  size: "large" | "medium" | "compact";
}) {
  const href = `/${locale}/news/${brief.slug}`;

  if (size === "compact") {
    const displayTimestamp = getBriefDisplayTimestamp(brief);

    return (
      <Link
        href={href}
        className="group flex h-full flex-col rounded-[1.45rem] border border-[rgba(47,37,30,0.08)] bg-white/88 p-5 shadow-[0_16px_40px_rgba(43,34,24,0.05)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-white hover:shadow-[0_20px_50px_rgba(43,34,24,0.08)]"
      >
        <div className="flex items-start justify-between gap-3">
          <CategoryBadge category={brief.category} size="sm" />
          {displayTimestamp ? (
            <span className="text-[0.75rem] text-text-muted">{formatTimeAgo(displayTimestamp)}</span>
          ) : null}
        </div>

        <h3 className="mt-4 text-[1.1rem] font-bold font-display leading-snug text-text-primary transition-colors duration-300 group-hover:text-primary">
          {brief.title}
        </h3>

        <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-text-secondary">{brief.dek}</p>

        <div className="mt-auto pt-4 text-[0.8rem] font-medium text-text-muted">
          {brief.sources[0]?.name}
        </div>
      </Link>
    );
  }

  if (size === "medium") {
    return (
      <Link
        href={href}
        className="group flex h-full flex-col rounded-[1.65rem] border border-[rgba(47,37,30,0.08)] bg-white/88 p-4 shadow-[0_18px_44px_rgba(43,34,24,0.05)] transition-all duration-300 hover:-translate-y-1 hover:bg-white hover:shadow-[0_26px_58px_rgba(43,34,24,0.08)]"
      >
        <BriefImage brief={brief} />

        <div className="mt-4 flex items-center justify-between gap-3">
          <CategoryBadge category={brief.category} size="sm" />
          {brief.source_count > 1 ? (
            <span className="rounded-full bg-[rgba(47,37,30,0.05)] px-2.5 py-1 text-[0.72rem] font-medium text-text-secondary">
              {brief.source_count} sources
            </span>
          ) : null}
        </div>

        <h3 className="mt-4 text-[1.35rem] font-bold font-display leading-snug text-text-primary transition-colors duration-300 group-hover:text-primary">
          {brief.title}
        </h3>

        <div className="mt-auto pt-4">
          <BriefMeta brief={brief} compact />
        </div>
      </Link>
    );
  }

  return (
    <Link
      href={href}
      className="group grid overflow-hidden rounded-[2rem] border border-[rgba(47,37,30,0.08)] bg-white/92 shadow-[0_24px_72px_rgba(43,34,24,0.07)] transition-all duration-300 hover:-translate-y-1 hover:bg-white hover:shadow-[0_28px_88px_rgba(43,34,24,0.1)] lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)]"
    >
      <div className="p-5 md:p-7">
        <BriefImage brief={brief} priority />
      </div>

      <div className="flex flex-col p-6 md:p-8">
        <div className="flex flex-wrap items-center gap-3">
          <CategoryBadge category={brief.category} />
          <BriefMeta brief={brief} />
        </div>

        <h2 className="mt-5 text-[clamp(2rem,4vw,3.5rem)] font-black font-display leading-[0.96] tracking-[-0.04em] text-text-primary transition-colors duration-300 group-hover:text-primary">
          {brief.title}
        </h2>

        <p className="mt-5 max-w-3xl text-lg leading-relaxed text-text-secondary">{brief.dek}</p>

        <p className="mt-5 line-clamp-4 max-w-3xl text-base leading-relaxed text-text-secondary">
          {brief.summary.split("\n\n")[0]}
        </p>

        <div className="mt-auto pt-8">
          <div className="inline-flex items-center gap-2 rounded-full bg-[rgba(47,37,30,0.05)] px-4 py-2 text-sm font-semibold text-text-primary transition-all duration-300 group-hover:bg-[rgba(47,37,30,0.08)]">
            Open brief
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
          </div>
        </div>
      </div>
    </Link>
  );
}

export function BriefSourceLinks({ brief }: { brief: Brief }) {
  return (
    <div className="space-y-3">
      {brief.sources.map((source) => (
        <a
          key={source.url}
          href={source.url}
          target="_blank"
          rel="noreferrer"
          className="flex items-center justify-between gap-4 rounded-[1.15rem] border border-[rgba(47,37,30,0.08)] bg-white/80 px-4 py-3 text-sm text-text-secondary transition-all duration-300 hover:bg-white hover:text-text-primary"
        >
          <span className="font-medium">{source.name}</span>
          <ExternalLink className="h-4 w-4 text-text-muted" />
        </a>
      ))}
    </div>
  );
}
