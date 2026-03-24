import { redirect } from "next/navigation";
import CustomArticleAdminEditor from "@/components/admin/CustomArticleAdminEditor";
import CustomArticleAdminLogoutButton from "@/components/admin/CustomArticleAdminLogoutButton";
import { isAdminCustomAuthenticated } from "@/lib/adminCustomSession";

export default async function CustomArticlesAdminNewPage(props: {
  params: Promise<{}>;
}) {
  if (!(await isAdminCustomAuthenticated())) {
    redirect(`/admin/custom-articles/login`);
  }

  return (
    <main className="min-h-screen bg-bg-primary pb-20 pt-28">
      <div className="container relative z-10 max-w-4xl">
        <div className="mb-6 flex justify-end">
          <CustomArticleAdminLogoutButton />
        </div>
        <div className="rounded-3xl border border-[rgba(47,37,30,0.08)] bg-white/90 p-6 shadow-lg md:p-8">
          <h1 className="font-display text-2xl font-black text-text-primary">New article</h1>
          <div className="mt-6">
            <CustomArticleAdminEditor mode="create" />
          </div>
        </div>
      </div>
    </main>
  );
}
