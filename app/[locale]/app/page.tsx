import type { Metadata } from "next";
import Footer from "@/components/layout/Footer";
import CTASection from "@/components/sections/CTASection";
import FeaturesSection from "@/components/sections/FeaturesSection";
import HeroSection from "@/components/sections/HeroSection";

export const metadata: Metadata = {
  title: "AllHalal App | Halal Scanner, Ingredient Verification & Muslim Utilities",
  description:
    "Explore the dedicated AllHalal app experience with halal scanning, ingredient verification, prayer tools and app-first Muslim utilities.",
  openGraph: {
    title: "AllHalal App | Halal Scanner, Ingredient Verification & Muslim Utilities",
    description:
      "Explore the dedicated AllHalal app experience with halal scanning, ingredient verification, prayer tools and app-first Muslim utilities.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "AllHalal App | Halal Scanner, Ingredient Verification & Muslim Utilities",
    description:
      "Explore the dedicated AllHalal app experience with halal scanning, ingredient verification, prayer tools and app-first Muslim utilities.",
  },
};

export default function AppPage() {
  return (
    <>
      <main className="min-h-screen overflow-hidden bg-bg-primary">
        <HeroSection />
        <FeaturesSection />
        <CTASection />
      </main>
      <Footer />
    </>
  );
}
