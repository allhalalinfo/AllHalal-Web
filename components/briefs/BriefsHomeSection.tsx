import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { formatTimeAgo, type HomepageBriefLayout } from "@/lib/briefs";
import type { Brief } from "@/types/brief";

function LeadStory({
  brief,
  locale,
}: {
  brief: Brief;
  locale: string;
}) {
  const href = `/${locale}/news/${brief.slug}`;

  return (
    <Link
      href={href}
      className="group overflow-hidden rounded-[2rem] border border-[rgba(47,37,30,0.08)] bg-white/92 shadow-[0_22px_58px_rgba(43,34,24,0.06)] transition-all duration-300 hover:-translate-y-1 hover:bg-white hover:shadow-[0_28px_68px_rgba(43,34,24,0.09)]"
    >
      {brief.image_url ? (
        <div className="relative aspect-[1.55/1] overflow-hidden bg-[rgba(242,237,228,0.7)]">
          <Image
            src={brief.image_url}
            alt={brief.title}
            fill
            priority
            className="object-cover object-center transition-transform duration-500 group-hover:scale-[1.02]"
            sizes="(min-width: 1280px) 720px, (min-width: 1024px) 56vw, 100vw"
          />
          <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(18,17,15,0.04),rgba(18,17,15,0.18))]" />
        </div>
      ) : null}

      <div className="p-6 md:p-7">
        <div className="flex flex-wrap items-center gap-3 text-sm text-text-muted">
          <span className="font-semibold text-text-secondary">{brief.sources[0]?.name}</span>
          <span aria-hidden="true">•</span>
          <time dateTime={brief.published_at}>{formatTimeAgo(brief.published_at)}</time>
          {brief.source_count > 1 ? (
            <>
              <span aria-hidden="true">•</span>
              <span>{brief.source_count} sources</span>
            </>
          ) : null}
        </div>

        <h3 className="mt-4 text-[clamp(2rem,3.3vw,3.6rem)] font-black font-display leading-[0.97] tracking-[-0.04em] text-text-primary transition-colors duration-300 group-hover:text-primary">
          {brief.title}
        </h3>

        <p className="mt-4 max-w-3xl text-base leading-relaxed text-text-secondary md:text-lg">
          {brief.dek}
        </p>

        <div className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-primary">
          Open brief
          <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
        </div>
      </div>
    </Link>
  );
}

function SideHeadline({
  brief,
  locale,
}: {
  brief: Brief;
  locale: string;
}) {
  const href = `/${locale}/news/${brief.slug}`;

  return (
    <Link
      href={href}
      className="group grid grid-cols-[1fr_auto] items-center gap-4 rounded-[1.5rem] border border-[rgba(47,37,30,0.08)] bg-white/86 p-4 shadow-[0_14px_34px_rgba(43,34,24,0.04)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-white hover:shadow-[0_20px_42px_rgba(43,34,24,0.07)]"
    >
      <div className="min-w-0">
        <div className="flex flex-wrap items-center gap-2 text-[0.8rem] text-text-muted">
          <span className="font-medium text-text-secondary">{brief.sources[0]?.name}</span>
          <span aria-hidden="true">•</span>
          <time dateTime={brief.published_at}>{formatTimeAgo(brief.published_at)}</time>
        </div>

        <h4 className="mt-2 line-clamp-3 text-[1.2rem] font-bold leading-snug text-text-primary transition-colors duration-300 group-hover:text-primary">
          {brief.title}
        </h4>
      </div>

      {brief.image_url ? (
        <div className="relative hidden h-24 w-24 overflow-hidden rounded-[1.2rem] border border-[rgba(47,37,30,0.08)] bg-[rgba(242,237,228,0.65)] md:block">
          <Image
            src={brief.image_url}
            alt={brief.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
            sizes="96px"
          />
        </div>
      ) : null}
    </Link>
  );
}

function CompactStory({
  brief,
  locale,
}: {
  brief: Brief;
  locale: string;
}) {
  const href = `/${locale}/news/${brief.slug}`;

  return (
    <Link
      href={href}
      className="group grid gap-4 rounded-[1.55rem] border border-[rgba(47,37,30,0.08)] bg-white/84 p-4 shadow-[0_14px_36px_rgba(43,34,24,0.04)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-white hover:shadow-[0_18px_46px_rgba(43,34,24,0.06)]"
    >
      {brief.image_url ? (
        <div className="relative aspect-[1.75/1] overflow-hidden rounded-[1.2rem] border border-[rgba(47,37,30,0.08)] bg-[rgba(242,237,228,0.65)]">
          <Image
            src={brief.image_url}
            alt={brief.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-[1.02]"
            sizes="(min-width: 1280px) 300px, (min-width: 768px) 50vw, 100vw"
          />
        </div>
      ) : null}

      <div>
        <div className="flex flex-wrap items-center gap-2 text-[0.78rem] text-text-muted">
          <span className="font-medium text-text-secondary">{brief.sources[0]?.name}</span>
          <span aria-hidden="true">•</span>
          <time dateTime={brief.published_at}>{formatTimeAgo(brief.published_at)}</time>
        </div>

        <h4 className="mt-2 line-clamp-3 text-[1.08rem] font-bold leading-snug text-text-primary transition-colors duration-300 group-hover:text-primary">
          {brief.title}
        </h4>

        <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-text-secondary">{brief.dek}</p>
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

  return (
    <section className="rounded-[2.4rem] border border-[rgba(47,37,30,0.08)] bg-[linear-gradient(180deg,rgba(255,255,255,0.92),rgba(249,246,241,0.94))] p-6 shadow-[0_26px_72px_rgba(43,34,24,0.06)] md:p-8">
      <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
        <div>
          <h2 className="text-[clamp(2.4rem,4vw,4rem)] font-black font-display leading-[0.96] tracking-[-0.04em] text-text-primary">
            Muslim World Today
          </h2>
          <p className="mt-3 max-w-3xl text-base leading-relaxed text-text-secondary md:text-lg">
            Short briefs from across faith, family and the wider Ummah.
          </p>
        </div>

        <Link
          href={`/${locale}/news`}
          className="inline-flex items-center gap-2 rounded-full bg-[#173640] px-5 py-3 text-sm font-semibold text-white shadow-[0_16px_44px_rgba(23,54,64,0.18)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#13303a]"
        >
          Open news desk
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>

      <div className="mt-8 grid gap-5 xl:grid-cols-[minmax(0,1.2fr)_minmax(19rem,0.8fr)]">
        <LeadStory brief={hero} locale={locale} />

        <div className="grid gap-4">
          {featured.map((brief) => (
            <SideHeadline key={brief.id} brief={brief} locale={locale} />
          ))}
        </div>
      </div>

      {compact.length ? (
        <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {compact.map((brief) => (
            <CompactStory key={brief.id} brief={brief} locale={locale} />
          ))}
        </div>
      ) : null}
    </section>
  );
}
