import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: 'Halal Finance in the US | AllHalal Guide',
  description: 'Explore halal mortgages in the US, sharia-compliant investing, and Islamic banking options available for American Muslims.',
};

export default async function FinanceHub(props: { params: Promise<{ locale: string }> }) {
  const params = await props.params;
  return (
    <div className="container py-32 min-h-screen">
      <div className="max-w-4xl mx-auto text-center mb-16">
        <h1 className="text-5xl font-bold text-text-primary mb-6">Halal Finance</h1>
        <p className="text-xl text-text-secondary">
          Navigating the modern financial world without compromising your faith. Whether you are looking for a halal mortgage in the US, aiming to start sharia-compliant investing, or searching for an Islamic bank in America, our guides help you make informed decisions.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
        <Link href={`/${params.locale}/finance/mortgages`} className="bg-bg-card border border-border p-8 rounded-3xl hover:border-primary hover:shadow-glow-sm transition-all group">
          <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mb-6 text-primary group-hover:scale-110 transition-transform">
            <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>
          </div>
          <h2 className="text-2xl font-bold text-text-primary mb-3">Halal Mortgages</h2>
          <p className="text-text-secondary">Buy a home without Riba. Learn about Islamic home financing and top US providers.</p>
        </Link>
        
        <Link href={`/${params.locale}/finance/investing`} className="bg-bg-card border border-border p-8 rounded-3xl hover:border-primary hover:shadow-glow-sm transition-all group">
          <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mb-6 text-primary group-hover:scale-110 transition-transform">
            <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg>
          </div>
          <h2 className="text-2xl font-bold text-text-primary mb-3">Halal Investing</h2>
          <p className="text-text-secondary">Grow your wealth through sharia-compliant stocks, Halal ETFs, and robo-advisors.</p>
        </Link>
        
        <Link href={`/${params.locale}/finance/banks`} className="bg-bg-card border border-border p-8 rounded-3xl hover:border-primary hover:shadow-glow-sm transition-all group">
          <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mb-6 text-primary group-hover:scale-110 transition-transform">
            <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z" /></svg>
          </div>
          <h2 className="text-2xl font-bold text-text-primary mb-3">Halal Banks</h2>
          <p className="text-text-secondary">Find Islamic banking institutions and credit unions available in America.</p>
        </Link>
      </div>
    </div>
  );
}