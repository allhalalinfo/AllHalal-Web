import { redirect } from "next/navigation";
import CustomArticleAdminLoginForm from "@/components/admin/CustomArticleAdminLoginForm";
import { isAdminCustomAuthenticated } from "@/lib/adminCustomSession";

export default async function CustomArticlesAdminLoginPage(props: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await props.params;
  if (await isAdminCustomAuthenticated()) {
    redirect(`/admin/custom-articles`);
  }

  const configured = Boolean(
    process.env.ADMIN_CUSTOM_DASHBOARD_PASSWORD?.trim() &&
      process.env.ADMIN_CUSTOM_SESSION_SECRET?.trim(),
  );

  return (
    <main className="min-h-screen bg-bg-primary pb-20 pt-28">
      <div className="container relative z-10 max-w-lg">
        {!configured ? (
          <div className="mb-6 rounded-2xl border border-red-200 bg-red-50/90 px-4 py-3 text-sm text-red-900">
            Admin login is not configured. Set{" "}
            <code className="rounded bg-white/80 px-1">ADMIN_CUSTOM_DASHBOARD_PASSWORD</code> and{" "}
            <code className="rounded bg-white/80 px-1">ADMIN_CUSTOM_SESSION_SECRET</code> in{" "}
            <code className="rounded bg-white/80 px-1">.env.local</code> (see{" "}
            <code className="rounded bg-white/80 px-1">.env.example</code>).
          </div>
        ) : null}
        <CustomArticleAdminLoginForm locale={locale} />
      </div>
    </main>
  );
}
