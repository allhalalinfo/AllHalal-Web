/**
 * ═══════════════════════════════════════════════════════════════════════════════
 * APP LANDING PAGE
 * ═══════════════════════════════════════════════════════════════════════════════
 */

import Footer from "@/components/layout/Footer";
import HeroSection from "@/components/sections/HeroSection";
import AboutSection from "@/components/sections/AboutSection";
import WhyChooseSection from "@/components/sections/WhyChooseSection";
import FeaturesSection from "@/components/sections/FeaturesSection";
import ExploreSection from "@/components/sections/ExploreSection";

export default function AppPage() {
  return (
    <>
      <main className="overflow-x-clip">
        <HeroSection />
        <AboutSection />
        <WhyChooseSection />
        <FeaturesSection />
        <ExploreSection />
      </main>
      <Footer />
    </>
  );
}
