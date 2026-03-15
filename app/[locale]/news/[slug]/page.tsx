import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { ArrowLeft } from "lucide-react";
import BriefCard, { BriefSourceLinks } from "@/components/briefs/BriefCard";
import CategoryBadge from "@/components/briefs/CategoryBadge";
import AppDeepLinkCTA from "@/components/ui/AppDeepLinkCTA";
import { blogPosts } from "@/data/blogPosts";
import {
  formatTimeAgo,
  getBriefDisplayTimestamp,
  getBriefDetail,
  hasValidBriefImage,
} from "@/lib/briefs";

function renderBlogFallback(params: { locale: string; slug: string }) {
  const post = blogPosts.find((entry) => entry.slug === params.slug);
  if (!post) {
    return null;
  }

  return (
    <div className="container min-h-screen py-32">
      <div className="mx-auto max-w-3xl">
        <Link
          href={`/${params.locale}/news`}
          className="mb-8 inline-flex items-center gap-2 text-primary hover:underline"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to News
        </Link>

        <div className="mb-12">
          <div className="mb-6 flex gap-2">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full bg-primary/10 px-3 py-1 text-sm font-bold text-primary"
              >
                {tag}
              </span>
            ))}
          </div>
          <h1 className="mb-6 text-4xl font-bold font-display leading-tight text-text-primary md:text-5xl">
            {post.title}
          </h1>
          <div className="text-text-muted">{new Date(post.publishedAt).toLocaleDateString()}</div>
        </div>

        <div className="prose prose-lg mb-12 max-w-none text-text-secondary dark:prose-invert">
          {post.content.split("\n\n").map((paragraph, idx) => {
            if (paragraph.startsWith("## ")) {
              return (
                <h2
                  key={idx}
                  className="mb-4 mt-10 text-2xl font-bold font-display text-text-primary"
                >
                  {paragraph.replace("## ", "")}
                </h2>
              );
            }
            if (paragraph.startsWith("- ")) {
              const items = paragraph.split("\n").map((item) => item.replace("- ", ""));
              return (
                <ul key={idx} className="mb-6 list-disc space-y-2 pl-6">
                  {items.map((item, itemIdx) => (
                    <li key={itemIdx}>{item}</li>
                  ))}
                </ul>
              );
            }

            return <p key={idx} className="mb-6">{paragraph}</p>;
          })}
        </div>

        <AppDeepLinkCTA variant="blog" />
      </div>
    </div>
  );
}

export async function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata(props: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await props.params;
  const detail = await getBriefDetail(slug);
  if (detail?.brief) {
    const { brief } = detail;
    return {
      title: `${brief.title} | AllHalal News Desk`,
      description: brief.dek,
      openGraph: {
        title: brief.title,
        description: brief.dek,
        images: brief.image_url ? [{ url: brief.image_url }] : undefined,
      },
    };
  }

  const post = blogPosts.find((entry) => entry.slug === slug);
  if (!post) {
    return { title: "Not Found" };
  }

  return {
    title: `${post.title} | allhalal.info Blog`,
    description: post.summary,
  };
}

export default async function NewsDetailPage(props: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await props.params;
  const detail = await getBriefDetail(slug);

  if (!detail) {
    const fallback = renderBlogFallback({ locale, slug });
    if (fallback) {
      return fallback;
    }
    notFound();
  }

  const { brief, related: relatedBriefs } = detail;
  const displayTimestamp = getBriefDisplayTimestamp(brief);
  const summaryParagraphs = brief.summary
    .split("\n\n")
    .map((paragraph) => paragraph.trim())
    .filter(Boolean);

  return (
    <main className="relative min-h-screen overflow-hidden bg-bg-primary pb-24 pt-32">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[32rem] bg-[radial-gradient(circle_at_18%_16%,rgba(244,185,66,0.14),transparent_24%),radial-gradient(circle_at_82%_18%,rgba(75,110,112,0.12),transparent_28%),linear-gradient(180deg,rgba(255,255,255,0.22),transparent_82%)]" />

      <div className="container relative z-10">
        <div className="mx-auto max-w-5xl">
          <Link
            href={`/${locale}/news`}
            className="inline-flex items-center gap-2 text-sm font-medium text-primary transition-colors duration-300 hover:text-text-primary"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to News Desk
          </Link>

          <article className="mt-6 rounded-[2.2rem] border border-[rgba(47,37,30,0.08)] bg-white/92 p-6 shadow-[0_24px_72px_rgba(43,34,24,0.07)] md:p-8">
            <div className="flex flex-wrap items-center gap-3">
              <CategoryBadge category={brief.category} />
              {displayTimestamp ? (
                <>
                  <span className="text-sm text-text-muted">{formatTimeAgo(displayTimestamp)}</span>
                  <span className="text-sm text-text-muted">•</span>
                </>
              ) : null}
              <span className="text-sm text-text-muted">
                {brief.source_count} {brief.source_count === 1 ? "source" : "sources"}
              </span>
            </div>

            <h1 className="mt-5 text-[clamp(2.4rem,5vw,4.8rem)] font-black font-display leading-[0.95] tracking-[-0.04em] text-text-primary">
              {brief.title}
            </h1>

            <p className="mt-5 max-w-4xl text-[1.15rem] leading-relaxed text-text-secondary md:text-[1.3rem]">
              {brief.dek}
            </p>

            {hasValidBriefImage(brief) && brief.image_url ? (
              <div className="relative mt-8 aspect-[1.9/1] overflow-hidden rounded-[1.8rem] border border-[rgba(47,37,30,0.08)] bg-[rgba(246,241,233,0.72)]">
                <Image
                  src={brief.image_url}
                  alt={brief.title}
                  fill
                  priority
                  className="object-cover"
                  sizes="(min-width: 1280px) 1100px, 100vw"
                />
              </div>
            ) : null}

            <div className="mt-10 grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(18rem,0.36fr)]">
              <div className="space-y-6 text-[1.04rem] leading-8 text-text-secondary">
                {summaryParagraphs.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}

                <div className="rounded-[1.6rem] border border-[rgba(47,37,30,0.08)] bg-[linear-gradient(180deg,rgba(252,249,243,0.96),rgba(246,240,231,0.96))] p-5">
                  <div className="text-[0.74rem] font-bold uppercase tracking-[0.22em] text-primary">
                    Why This Matters
                  </div>
                  <p className="mt-3 text-base leading-relaxed text-text-secondary">
                    {brief.why_it_matters}
                  </p>
                </div>

                <AppDeepLinkCTA variant="blog" />
              </div>

              <aside className="space-y-6">
                <div className="rounded-[1.6rem] border border-[rgba(47,37,30,0.08)] bg-[rgba(248,245,239,0.92)] p-5">
                  <div className="text-[0.74rem] font-bold uppercase tracking-[0.22em] text-primary">
                    Sources
                  </div>
                  <div className="mt-4">
                    <BriefSourceLinks brief={brief} />
                  </div>
                </div>
              </aside>
            </div>
          </article>

          {relatedBriefs.length ? (
            <section className="mt-8 rounded-[2rem] border border-[rgba(47,37,30,0.08)] bg-white/88 p-6 shadow-[0_20px_60px_rgba(43,34,24,0.06)] md:p-8">
              <div className="text-[0.76rem] font-bold uppercase tracking-[0.22em] text-primary">
                Related Briefs
              </div>
              <div className="mt-5 grid gap-5 lg:grid-cols-3">
                {relatedBriefs.map((related) => (
                  <BriefCard key={related.id} brief={related} locale={locale} size="medium" />
                ))}
              </div>
            </section>
          ) : null}
        </div>
      </div>
    </main>
  );
}
