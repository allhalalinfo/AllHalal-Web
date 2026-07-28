import type { Metadata } from "next";
import BoycottCheckerClient from "./BoycottCheckerClient";

export const metadata: Metadata = {
  alternates: { canonical: "/boycott-checker" },
  title: "Boycott checker | allhalal.info",
  description:
    "Look up boycott-related guidance for brands and companies using the allhalal.info API.",
  openGraph: {
    title: "Boycott checker | allhalal.info",
    description: "Brand boycott checker on allhalal.info.",
    type: "website",
  },
};

export default function BoycottCheckerPage() {
  return <BoycottCheckerClient />;
}
