import type { Metadata } from "next";
import { generateMetadata as genMeta } from "@/lib/seo/metadata";

export const metadata: Metadata = genMeta({
  title: "Terms of Service",
  description:
    "The terms that govern your use of allhalal.info and the halal scanner app, including acceptable use, accounts and liability.",
  path: "/legal/terms-of-service",
  keywords: ["terms of service", "terms and conditions", "allhalal terms"],
});

export default function TermsOfServiceLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
