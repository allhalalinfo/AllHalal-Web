import Link from "next/link";
import { redirect } from "next/navigation";
import CustomArticleAdminDeleteButton from "@/components/admin/CustomArticleAdminDeleteButton";
import CustomArticleAdminLogoutButton from "@/components/admin/CustomArticleAdminLogoutButton";
import { fetchCustomArticlesListUncached } from "@/lib/customArticles";
import { isAdminCustomAuthenticated } from "@/lib/adminCustomSession";
import type { CustomArticle } from "@/types/customArticle";

export default async function CustomArticlesAdminListPage(props: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await props.params;
  if (!(await isAdminCustomAuthenticated())) {
    redirect(`/${locale}/admin/custom-articles/login`);
  }

  const { articles, total } = await fetchCustomArticlesListUncached({ limit: 60 });
  const sorted = [...articles].sort(
    (a, b) => new Date(b.published_at).getTime() - new Date(a.published_at).getTime(),
  );
  const byCategory = sorted.reduce<Record<string, CustomArticle[]>>((acc, a) => {
    const c = a.category || "general";
    acc[c] = acc[c] ?? [];
    acc[c].push(a);
    return acc;
  }, {});
  const categoryKeys = Object.keys(byCategory).sort((a, b) => a.localeCompare(b));

  const writeReady = Boolean(process.env.CUSTOM_ARTICLES_WRITE_TOKEN?.trim());

  return (
    <main className="min-h-screen bg-bg-primary pb-20 pt-28">
      <div className="container relative z-10 max-w-5xl">
        <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-text-muted">Admin</p>
            <h1 className="mt-2 font-display text-3xl font-black tracking-tight text-text-primary">
              Custom articles
            </h1>
            <p className="mt-2 max-w-2xl text-sm text-text-secondary">
              List is loaded from the public API (read). Create, edit, delete, and upload require write endpoints on
              Ubuntu — see <code className="rounded bg-white/60 px-1">docs/CUSTOM_ARTICLES_WRITE_API.md</code>.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <CustomArticleAdminLogoutButton locale={locale} />
            <Link
              href={`/${locale}/admin/custom-articles/new`}
              className="rounded-full bg-[#173640] px-5 py-2.5 text-sm font-semibold text-white shadow-md hover:bg-[#13303a]"
            >
              New article
            </Link>
          </div>
        </div>

        {!writeReady ? (
          <div className="mb-6 rounded-2xl border border-amber-200/90 bg-amber-50/90 px-4 py-3 text-sm text-amber-950">
            <strong>Write token missing.</strong> Set{" "}
            <code className="rounded bg-white/70 px-1">CUSTOM_ARTICLES_WRITE_TOKEN</code> in Vercel /{" "}
            <code className="rounded bg-white/70 px-1">.env.local</code> to match your FastAPI bearer secret. Until
            then, saving and upload will fail at the proxy.
          </div>
        ) : null}

        <p className="mb-6 text-sm text-text-muted">
          {articles.length} of {total} loaded (first page, max 60). Grouped by category.
        </p>

        {categoryKeys.length === 0 ? (
          <p className="rounded-2xl border border-border bg-white/80 p-8 text-text-secondary">
            No articles yet. Add one with <strong>New article</strong> (after backend implements write API).
          </p>
        ) : (
          <div className="space-y-10">
            {categoryKeys.map((cat) => (
              <section key={cat}>
                <h2 className="border-b border-border pb-2 font-display text-xl font-bold text-text-primary">
                  {cat}
                </h2>
                <ul className="mt-4 space-y-3">
                  {byCategory[cat].map((a) => (
                    <li
                      key={a.id}
                      className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-[rgba(47,37,30,0.08)] bg-white/85 px-4 py-3"
                    >
                      <div className="min-w-0 flex-1">
                        <p className="font-semibold text-text-primary">{a.title}</p>
                        <p className="mt-0.5 text-xs text-text-muted">
                          <code className="rounded bg-bg-primary px-1">{a.id}</code>
                          <span className="mx-2">·</span>
                          {a.published_at}
                        </p>
                      </div>
                      <div className="flex flex-wrap items-center gap-3">
                        <Link
                          href={`/${locale}/admin/custom-articles/${encodeURIComponent(a.id)}`}
                          className="text-sm font-semibold text-primary hover:underline"
                        >
                          Edit
                        </Link>
                        <Link
                          href={`/${locale}/read/${encodeURIComponent(a.id)}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm font-semibold text-text-secondary hover:text-text-primary"
                        >
                          View
                        </Link>
                        <CustomArticleAdminDeleteButton articleId={a.id} />
                      </div>
                    </li>
                  ))}
                </ul>
              </section>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
