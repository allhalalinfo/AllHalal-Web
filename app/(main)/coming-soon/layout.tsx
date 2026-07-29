import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Coming soon | allhalal.info",
  description: "This page is not published yet.",
  robots: {
    index: false,
    follow: false,
  },
  alternates: {
    canonical: "/coming-soon",
  },
};

export default function ComingSoonLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
