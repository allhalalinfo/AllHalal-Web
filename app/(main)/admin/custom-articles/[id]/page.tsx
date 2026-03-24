import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import CustomArticleAdminEditor from "@/components/admin/CustomArticleAdminEditor";
import CustomArticleAdminDeleteButton from "@/components/admin/CustomArticleAdminDeleteButton";
import CustomArticleAdminLogoutButton from "@/components/admin/CustomArticleAdminLogoutButton";
import { fetchCustomArticleByIdUncached } from "@/lib/customArticles";
import { isAdminCustomAuthenticated } from "@/lib/adminCustomSession";

export default async function CustomArticlesAdminEditPage(props: {
  params: Promise<{ locale: string; id: string }>;
}) {
  const { locale, id } = await props.params;
  if (!(await isAdminCustomAuthenticated())) {
    redirect(`/admin/custom-articles/login`);
  }

  const decoded = decodeURIComponent(id);
  const article = await fetchCustomArticleByIdUncached(decoded);
  if (!article) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-bg-primary pb-20 pt-28">
      <div className="container relative z-10 max-w-4xl">
        <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
          <Link
            href={`/admin/custom-articles`}
            className="text-sm font-semibold text-primary hover:underline"
          >
            ← All articles
          </Link>
          <div className="flex items-center gap-3">
            <CustomArticleAdminDeleteButton articleId={article.id} label="Delete article" />
            <CustomArticleAdminLogoutButton locale={locale} />
          </div>
        </div>
        <div className="rounded-3xl border border-[rgba(47,37,30,0.08)] bg-white/90 p-6 shadow-lg md:p-8">
          <h1 className="font-display text-2xl font-black text-text-primary">Edit article</h1>
          <div className="mt-6">
            <CustomArticleAdminEditor locale={locale} mode="edit" initial={article} />
          </div>
        </div>
      </div>
    </main>
  );
}
