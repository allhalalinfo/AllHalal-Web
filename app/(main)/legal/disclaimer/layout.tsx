import type { Metadata } from "next";
import { generateMetadata as genMeta } from "@/lib/seo/metadata";

export const metadata: Metadata = genMeta({
  title: "Disclaimer",
  description:
    "Halal verdicts on allhalal.info are guidance, not a fatwa. Read the limits of our research, how recipes change, and when to consult a scholar.",
  path: "/legal/disclaimer",
  keywords: ["disclaimer", "halal guidance limits", "not a fatwa"],
});

export default function DisclaimerLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
