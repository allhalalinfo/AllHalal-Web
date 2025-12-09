/**
 * ═══════════════════════════════════════════════════════════════════════════════
 * HOME PAGE - AllHalal Marketing Website
 * ═══════════════════════════════════════════════════════════════════════════════
 * 
 * Main landing page composed of all section components.
 * Structure mirrors hatchet.com.au with AllHalal content and green branding.
 * 
 * Sections order:
 * 1. Hero (pinned with particle animation)
 * 2. About (trusted companion intro)
 * 3. Why Choose (3 pillars)
 * 4. Features (main app features)
 * 5. Madhhab (4 schools)
 * 6. CTA (final call to action)
 * 
 * ═══════════════════════════════════════════════════════════════════════════════
 */

import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import HeroSection from "@/components/sections/HeroSection";
import AboutSection from "@/components/sections/AboutSection";
import WhyChooseSection from "@/components/sections/WhyChooseSection";
import FeaturesSection from "@/components/sections/FeaturesSection";
import MadhhabSection from "@/components/sections/MadhhabSection";
import CTASection from "@/components/sections/CTASection";

export default function HomePage() {
  return (
    <>
      <Header />
      <main>
        <HeroSection />
        <AboutSection />
        <WhyChooseSection />
        <FeaturesSection />
        <MadhhabSection />
        <CTASection />
      </main>
      <Footer />
    </>
  );
}
