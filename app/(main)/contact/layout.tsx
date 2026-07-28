import type { Metadata } from "next";
import { generateMetadata as genMeta } from "@/lib/seo/metadata";

export const metadata: Metadata = genMeta({
  title: "Contact allhalal.info",
  description:
    "Get in touch with the allhalal.info team about halal verdicts, product data, partnerships, press or app support. We reply to every message.",
  path: "/contact",
  keywords: ["contact allhalal", "halal app support", "report a product", "partnerships"],
});

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
