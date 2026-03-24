import { namesOfAllah } from "@/data/namesOfAllah";
import Link from "next/link";
import { Metadata } from "next";
import AppPromoMini from "@/components/ui/AppPromoMini";

export const metadata: Metadata = {
  title: '99 Names of Allah | allhalal.info',
};

export default async function NamesOfAllahPage(props: { params: Promise<{ locale: string }> }) {
  const params = await props.params;
  return (
    <div className="container py-32 min-h-screen">
      <Link href={`/${params.locale}/learn`} className="text-primary hover:underline mb-8 inline-block">&larr; Back to Learn</Link>
      <h1 className="text-4xl md:text-5xl font-bold font-display text-text-primary mb-12 text-center">99 Names of Allah</h1>
      
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        {namesOfAllah.map(name => (
          <div key={name.id} className="bg-bg-card border border-border p-6 rounded-2xl flex flex-col items-center text-center hover:border-primary transition-colors shadow-sm">
            <span className="text-primary/50 font-bold mb-4">#{name.id}</span>
            <div className="text-4xl font-bold font-display text-text-primary mb-3" dir="rtl">{name.arabic}</div>
            <div className="text-xl font-semibold text-primary mb-2">{name.transliteration}</div>
            <div className="text-text-primary font-medium mb-3">{name.meaning}</div>
            <div className="text-sm text-text-secondary">{name.explanation}</div>
          </div>
        ))}
      </div>

      <AppPromoMini />
    </div>
  );
}