import Link from "next/link";
import {
  formatTimeAgo,
  getBriefDisplayTimestamp,
  sanitizeBriefImageUrl,
  type HomepageBriefLayout,
} from "@/lib/briefs";
import type { Brief } from "@/types/brief";

function HomeNewsMedia({
  brief,
  priority = false,
}: {
  brief: Brief;
  priority?: boolean;
}) {
  const imageUrl = sanitizeBriefImageUrl(brief.image_url);
  const sourceName = brief.sources[0]?.name || brief.primary_source || "Muslim Brief";

  if (imageUrl) {
    return (
      <>
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(circle at top left, rgba(244,185,66,0.14), transparent 34%), linear-gradient(145deg, rgba(241,235,226,0.86), rgba(255,255,255,0.92) 58%, rgba(228,221,211,0.84))",
          }}
        />
        <img
          src={imageUrl}
          alt={brief.title}
          loading={priority ? "eager" : "lazy"}
          decoding="async"
          fetchPriority={priority ? "high" : "auto"}
          referrerPolicy="no-referrer"
          className="absolute inset-0 block h-full w-full object-cover object-center transition-transform duration-500 group-hover:scale-[1.02]"
        />
      </>
    );
  }

  return (
    <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(circle at top left, rgba(244,185,66,0.22), transparent 34%), radial-gradient(circle at 85% 20%, rgba(46,75,89,0.18), transparent 28%), linear-gradient(145deg, rgba(241,235,226,0.96), rgba(255,255,255,0.98) 58%, rgba(228,221,211,0.92))",
        }}
      />
      <div className="absolute inset-x-0 bottom-0 h-20 bg-[linear-gradient(180deg,rgba(255,255,255,0),rgba(36,31,27,0.18))]" />
      <div className="absolute left-3 top-3 inline-flex h-12 w-12 items-center justify-center rounded-2xl border border-white/60 bg-white/72 text-sm font-black tracking-[0.14em] text-[#28414C] shadow-[0_10px_24px_rgba(36,31,27,0.08)]">
        {sourceName
          .split(/\s+/)
          .filter(Boolean)
          .slice(0, 2)
          .map((part) => part[0]?.toUpperCase() ?? "")
          .join("") || "MB"}
      </div>
      <div className="absolute inset-x-3 bottom-3 rounded-2xl border border-white/55 bg-white/70 px-3 py-2 shadow-[0_10px_24px_rgba(36,31,27,0.08)]">
        <div className="text-[0.62rem] font-bold uppercase tracking-[0.22em] text-[#7B674F]">
          {brief.category}
        </div>
        <div className="mt-1 line-clamp-1 text-[0.78rem] font-semibold text-[#28414C]">
          {sourceName}
        </div>
      </div>
    </div>
  );
}

function NewsGridCard({
  brief,
  locale,
  priority = false,
}: {
  brief: Brief;
  locale: string;
  priority?: boolean;
}) {
  const href = `/${locale}/news/${brief.slug}`;
  const displayTimestamp = getBriefDisplayTimestamp(brief);

  return (
    <Link
      href={href}
      className="group grid grid-cols-[6.75rem_minmax(0,1fr)] items-start gap-3 rounded-[1.3rem] border border-[rgba(47,37,30,0.08)] bg-white/88 p-3 shadow-[0_12px_30px_rgba(43,34,24,0.04)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-white hover:shadow-[0_18px_46px_rgba(43,34,24,0.06)] sm:flex sm:h-full sm:flex-col sm:gap-0 sm:rounded-[1.55rem] sm:p-4"
    >
      <div className="relative h-[9rem] overflow-hidden rounded-[1rem] border border-[rgba(47,37,30,0.08)] bg-[rgba(242,237,228,0.65)] sm:h-[10.5rem] sm:rounded-[1.2rem] xl:h-[11.5rem]">
        <HomeNewsMedia brief={brief} priority={priority} />
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(18,17,15,0.02),rgba(18,17,15,0.1))]" />
      </div>

      <div className="min-w-0 sm:mt-4">
        <div className="flex flex-wrap items-center gap-2 text-[0.78rem] text-text-muted">
          <span className="font-medium text-text-secondary">{brief.sources[0]?.name}</span>
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

        <h3 className="mt-2 line-clamp-3 text-[1.02rem] font-bold leading-[1.24] text-text-primary transition-colors duration-300 group-hover:text-primary sm:text-[1.18rem] sm:leading-snug">
          {brief.title}
        </h3>

        <p className="mt-2 line-clamp-4 text-[0.92rem] leading-relaxed text-text-secondary sm:min-h-[6.5rem] sm:line-clamp-4 sm:text-sm">
          {brief.summary.split("\n\n")[0] || brief.dek}
        </p>
      </div>
    </Link>
  );
}

export default function BriefsHomeSection({
  locale,
  layout,
}: {
  locale: string;
  layout: HomepageBriefLayout;
}) {
  const { hero, featured, compact } = layout;

  if (!hero) {
    return null;
  }

  const gridStories = [hero, ...featured, ...compact].filter(
    (brief, index, stories) => stories.findIndex((story) => story.id === brief.id) === index,
  );

  return (
    <section className="rounded-[1.8rem] border border-[rgba(47,37,30,0.08)] bg-[linear-gradient(180deg,rgba(255,255,255,0.92),rgba(249,246,241,0.94))] p-4 shadow-[0_20px_56px_rgba(43,34,24,0.06)] sm:p-5 md:rounded-[2.4rem] md:p-8 md:shadow-[0_26px_72px_rgba(43,34,24,0.06)]">
      <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <h2 className="text-[clamp(2rem,8vw,4rem)] font-black font-display leading-[0.96] tracking-[-0.04em] text-text-primary">
            Muslim World Today
          </h2>
          <p className="mt-2 max-w-3xl text-[0.98rem] leading-relaxed text-text-secondary md:mt-3 md:text-lg">
            Short briefs from across faith, family and the wider Ummah.
          </p>
        </div>

        <Link
          href={`/${locale}/news`}
          className="inline-flex w-full items-center justify-center rounded-full bg-[#173640] px-5 py-3 text-sm font-semibold text-white shadow-[0_16px_44px_rgba(23,54,64,0.18)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#13303a] sm:w-auto"
        >
          Open news desk
        </Link>
      </div>

      {gridStories.length ? (
        <div className="mt-6 grid gap-3 sm:mt-8 sm:gap-4 md:grid-cols-2 xl:grid-cols-4">
          {gridStories.map((brief, index) => (
            <NewsGridCard
              key={brief.id}
              brief={brief}
              locale={locale}
              priority={index < 4}
            />
          ))}
        </div>
      ) : null}
    </section>
  );
}
