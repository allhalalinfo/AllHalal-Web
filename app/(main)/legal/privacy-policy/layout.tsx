import type { Metadata } from "next";
import { generateMetadata as genMeta } from "@/lib/seo/metadata";

export const metadata: Metadata = genMeta({
  title: "Privacy Policy",
  description:
    "How allhalal.info collects, stores and uses your data across the website and the halal scanner app, including your rights and how to contact us.",
  path: "/legal/privacy-policy",
  keywords: ["privacy policy", "data protection", "allhalal privacy"],
});

export default function PrivacyPolicyLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
