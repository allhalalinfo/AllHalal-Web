import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import PortalSearchWidget from "@/components/portal/PortalSearchWidget";
import TodayForYou from "@/components/portal/TodayForYou";
import QuickLinksWidget from "@/components/portal/QuickLinksWidget";
import NewsFeedWidget from "@/components/portal/NewsFeedWidget";
import LiveStreamWidget from "@/components/portal/LiveStreamWidget";
import Link from "next/link";

export default async function PortalHomePage(props: { params: Promise<{ locale: string }> }) {
  const { locale } = await props.params;

  return (
    <>
      <Header />
      <main className="pt-32 pb-20 bg-bg-primary min-h-screen">
        <div className="container max-w-7xl mx-auto">
          
          {/* Welcome Text / Hero */}
            <div className="mb-14 text-center flex flex-col items-center justify-center gap-5 relative pt-6 md:pt-10 lg:pt-14">
            {/* Subtle background glow for the hero text */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-56 bg-accent-yellow/15 blur-[120px] rounded-full pointer-events-none" />
            
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/50 dark:bg-black/50 border border-black/5 dark:border-white/5 backdrop-blur-md shadow-sm mb-2 transition-colors cursor-default drop-shadow-sm group mt-4 hover:bg-white/80 dark:hover:bg-black/80 relative z-10">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent-yellow opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-accent-yellow group-hover:scale-110 transition-transform"></span>
              </span>
              <span className="text-[0.7rem] font-bold uppercase tracking-[0.25em] text-text-primary ml-0.5">AllHalal Hub</span>
            </div>
            
            <h1 className="text-[3.25rem] sm:text-6xl md:text-7xl lg:text-[6.5rem] font-black font-display text-text-primary tracking-tight leading-[1.05] max-w-5xl mx-auto pb-4 mt-2 relative z-10">
              Salam. Your Daily <br className="hidden md:block" />
              <span className="relative inline-block mt-2 md:mt-0">
                <span className="relative z-10 text-transparent bg-clip-text bg-gradient-to-r from-accent-yellow via-[#E5A822] to-accent-terracotta drop-shadow-sm pb-2 pr-4 pl-1">Muslim Hub.</span>
                <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-[85%] h-3.5 bg-accent-yellow/40 -z-10 rounded-full blur-xl"></span>
              </span>
            </h1>
            
            <p className="text-text-secondary text-lg md:text-xl lg:text-2xl max-w-2xl mt-5 font-medium opacity-80 leading-relaxed mx-auto px-4 md:px-0 relative z-10 text-balance tracking-[0.015em]">
              Accurate prayer times, reliable halal food scanning, and daily Islamic guidance.
            </p>
          </div>

          {/* BENTO GRID PORTAL */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6">

            {/* ROW 1: Today For You (Unified Daily Hub) */}
            <div className="col-span-1 md:col-span-12">
              <TodayForYou locale={locale} />
            </div>

            {/* ROW 2: Quick Links & News Feed */}
            <div className="col-span-1 md:col-span-12 grid grid-cols-1 lg:grid-cols-12 gap-6">
              <div className="lg:col-span-4 flex flex-col gap-6">
                <QuickLinksWidget locale={locale} />
                
                {/* Live Streams Promo */}
                <LiveStreamWidget locale={locale} />
              </div>
              
              <div className="lg:col-span-8">
                <NewsFeedWidget locale={locale} />
              </div>
            </div>

          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
