import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import ExploreSection from "@/components/sections/ExploreSection";
import Link from "next/link";
import Image from "next/image";

export default async function PortalHomePage(props: { params: Promise<{ locale: string }> }) {
  const { locale } = await props.params;

  return (
    <>
      <Header />
      <main className="pt-32 bg-bg-primary min-h-screen">
        <div className="container max-w-6xl mx-auto mb-16">
          {/* Welcome Text */}
          <div className="text-center mb-16 mt-8">
            <h1 className="text-display-2 md:text-display-1 font-black font-display text-text-primary mb-6">
              Welcome to <span className="text-highlight">allhalal.info</span>
            </h1>
            <p className="text-xl md:text-2xl text-text-secondary max-w-3xl mx-auto leading-relaxed">
              Your comprehensive hub for living a confident halal lifestyle. Explore our tools, learn about your faith, and manage your daily Islamic routines.
            </p>
          </div>

          {/* Featured Halal Checker Banner */}
          <div className="relative overflow-hidden rounded-[2rem] bg-bg-dark text-text-inverse shadow-2xl border border-white/10 group min-h-[400px] flex items-center">
            
            {/* Layer 1: Ambient Radial Glows (Spotlight effect) */}
            <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-accent-yellow/20 rounded-full blur-[100px] -translate-x-1/2 -translate-y-1/2 pointer-events-none opacity-60 group-hover:opacity-100 transition-opacity duration-1000" />
            <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-primary/20 rounded-full blur-[100px] translate-x-1/3 translate-y-1/3 pointer-events-none opacity-40 group-hover:opacity-70 transition-opacity duration-1000" />

            {/* Layer 2: Subtle Geometric Pattern Overlay */}
            <div 
              className="absolute inset-0 opacity-[0.04] pointer-events-none mix-blend-plus-lighter"
              style={{ 
                backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                backgroundSize: '30px 30px'
              }}
            />

            {/* Layer 3: Image Background (Fading to the right) */}
            <div className="absolute inset-y-0 right-0 w-full md:w-3/4 z-0 pointer-events-none">
              <div 
                className="absolute inset-0 bg-cover bg-center opacity-40 group-hover:scale-105 group-hover:opacity-50 transition-all duration-[2s] ease-out"
                style={{ backgroundImage: "url('/assets/hero-bg.png')" }}
              />
              {/* Gradient mask to blend image into the solid background on the left */}
              <div className="absolute inset-0 bg-gradient-to-r from-bg-dark via-bg-dark/80 to-transparent" />
              {/* Subtle top/bottom shadow for depth */}
              <div className="absolute inset-0 bg-gradient-to-t from-bg-dark/80 via-transparent to-bg-dark/80" />
            </div>

            <div className="relative z-10 p-10 md:p-16 lg:p-20 flex flex-col md:flex-row items-center justify-between gap-8 w-full">
              <div className="max-w-xl">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/10 mb-6 backdrop-blur-sm">
                  <span className="w-2 h-2 rounded-full bg-accent-yellow shadow-[0_0_10px_rgba(244,185,66,0.5)]" />
                  <span className="text-sm text-accent-yellow font-bold uppercase tracking-wider">Web Platform</span>
                </div>
                <h2 className="text-4xl md:text-5xl font-bold font-display mb-6 leading-tight">
                  Your Ultimate Halal Search Engine
                </h2>
                <p className="text-text-inverse-secondary text-lg md:text-xl mb-10 leading-relaxed">
                  Instantly search our massive database of products, ingredients, and E-codes. Get reliable, fiqh-based rulings directly from your browser.
                </p>
                <div className="flex flex-wrap gap-4">
                  <Link href={`/${locale}/is-it-halal`} className="btn btn-primary btn-lg shadow-[0_4px_25px_rgba(176,144,98,0.4)]">
                    Start Searching &rarr;
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tools Section */}
        <ExploreSection />
      </main>
      <Footer />
    </>
  );
}
