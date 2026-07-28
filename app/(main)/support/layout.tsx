import type { Metadata } from "next";
import { generateMetadata as genMeta } from "@/lib/seo/metadata";

export const metadata: Metadata = genMeta({
  title: "Support & Help Centre",
  description:
    "Help with the allhalal.info halal scanner: barcode issues, ingredient analysis, account questions and how to report an incorrect halal verdict.",
  path: "/support",
  keywords: ["allhalal support", "halal scanner help", "barcode not working", "report verdict"],
});

export default function SupportLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
