import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Custom articles admin | allhalal.info",
  robots: { index: false, follow: false },
};

export default function CustomArticlesAdminLayout({ children }: { children: React.ReactNode }) {
  return children;
}
