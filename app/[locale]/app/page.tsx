/**
 * ═══════════════════════════════════════════════════════════════════════════════
 * APP LANDING PAGE
 * ═══════════════════════════════════════════════════════════════════════════════
 */

import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import HeroSection from "@/components/sections/HeroSection";
import AboutSection from "@/components/sections/AboutSection";
import WhyChooseSection from "@/components/sections/WhyChooseSection";
import FeaturesSection from "@/components/sections/FeaturesSection";
import CTASection from "@/components/sections/CTASection";
import ExploreSection from "@/components/sections/ExploreSection";

export default function AppPage() {
  return (
    <>
      <Header />
      <main>
        <HeroSection />
        <AboutSection />
        <WhyChooseSection />
        <FeaturesSection />
        <ExploreSection />
        <CTASection />
      </main>
      <Footer />
    </>
  );
}
