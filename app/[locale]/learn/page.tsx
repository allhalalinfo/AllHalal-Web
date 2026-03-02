import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: 'Learn Islam & Halal | allhalal.info',
  description: 'Educational resources, 99 Names of Allah, and Duas.',
};

export default async function LearnHub(props: { params: Promise<{ locale: string }> }) {
  const params = await props.params;
  return (
    <div className="container py-32 min-h-screen">
      <div className="max-w-4xl mx-auto text-center mb-16">
        <h1 className="text-5xl font-bold text-text-primary mb-6">Learn about Islam & Halal</h1>
        <p className="text-xl text-text-secondary">
          Deepen your knowledge with our educational resources, prayers, and guides.
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
        <Link href={`/${params.locale}/learn/99-names`} className="bg-bg-card border border-border p-8 rounded-3xl hover:border-primary hover:shadow-glow-sm transition-all text-center">
          <h2 className="text-2xl font-bold text-text-primary mb-3">99 Names of Allah</h2>
          <p className="text-text-secondary">Explore Asma ul-Husna with translations and meanings.</p>
        </Link>
        
        <Link href={`/${params.locale}/learn/duas`} className="bg-bg-card border border-border p-8 rounded-3xl hover:border-primary hover:shadow-glow-sm transition-all text-center">
          <h2 className="text-2xl font-bold text-text-primary mb-3">Duas & Athkar</h2>
          <p className="text-text-secondary">Essential supplications for everyday life.</p>
        </Link>

        <Link href={`/${params.locale}/learn/ramadan`} className="bg-bg-card border border-border p-8 rounded-3xl hover:border-primary hover:shadow-glow-sm transition-all text-center relative overflow-hidden">
          <h2 className="text-2xl font-bold text-text-primary mb-3">Ramadan Guide</h2>
          <p className="text-text-secondary">Preparation, rules, and tips for the holy month.</p>
        </Link>
        
        <Link href={`/${params.locale}/learn/islamic-calendar`} className="bg-bg-card border border-border p-8 rounded-3xl hover:border-primary hover:shadow-glow-sm transition-all text-center">
          <h2 className="text-2xl font-bold text-text-primary mb-3">Islamic Calendar</h2>
          <p className="text-text-secondary">View Hijri dates, religious holidays, and sunnah fasting days.</p>
        </Link>
        
        <Link href={`/${params.locale}/learn/live-makkah`} className="bg-bg-card border border-border p-8 rounded-3xl hover:border-primary hover:shadow-glow-sm transition-all text-center">
          <h2 className="text-2xl font-bold text-text-primary mb-3">Makkah & Madinah Live</h2>
          <p className="text-text-secondary">Watch 24/7 live streams from the Holy Mosques.</p>
        </Link>
      </div>
    </div>
  );
}