import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import ExploreSection from "@/components/sections/ExploreSection";
import Link from "next/link";
import Image from "next/image";
import heroBg from "@/public/assets/hero-bg.png";

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
          <div className="relative overflow-hidden rounded-[2rem] bg-bg-dark text-text-inverse shadow-2xl border border-white/10 group">
            {/* Background Image */}
            <div className="absolute inset-0 z-0">
              <Image
                src={heroBg}
                alt="Background"
                fill
                className="object-cover object-center opacity-30 group-hover:scale-105 transition-transform duration-700"
                placeholder="blur"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-bg-dark via-bg-dark/90 to-transparent" />
            </div>

            <div className="relative z-10 p-10 md:p-16 lg:p-20 flex flex-col md:flex-row items-center justify-between gap-8">
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
