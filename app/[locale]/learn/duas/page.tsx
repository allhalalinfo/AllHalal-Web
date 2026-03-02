import { duas, duaCategories } from "@/data/duas";
import Link from "next/link";
import { Metadata } from "next";
import AppPromoMini from "@/components/ui/AppPromoMini";

export const metadata: Metadata = {
  title: 'Duas & Athkar | allhalal.info',
};

export default async function DuasPage(props: { params: Promise<{ locale: string }> }) {
  const params = await props.params;
  return (
    <div className="container py-32 max-w-4xl mx-auto min-h-screen">
      <Link href={`/${params.locale}/learn`} className="text-primary hover:underline mb-8 inline-block">&larr; Back to Learn</Link>
      <h1 className="text-4xl md:text-5xl font-bold font-display text-text-primary mb-12">Duas & Athkar</h1>
      
      <div className="space-y-16">
        {duaCategories.map(category => {
          const categoryDuas = duas.filter(d => d.categoryId === category.id);
          if (categoryDuas.length === 0) return null;

          return (
            <div key={category.id}>
              <div className="mb-6">
                <h2 className="text-2xl font-bold font-display text-text-primary mb-2">{category.name}</h2>
                <p className="text-text-secondary">{category.intro}</p>
              </div>
              <div className="space-y-6">
                {categoryDuas.map(dua => (
                  <div key={dua.id} className="bg-bg-card border border-border p-8 rounded-3xl shadow-sm">
                    <div className="text-3xl md:text-4xl font-bold font-display text-text-primary mb-6 leading-loose text-right" dir="rtl">
                      {dua.arabic}
                    </div>
                    <div className="text-lg font-medium text-primary mb-3">{dua.transliteration}</div>
                    <div className="text-text-secondary italic">"{dua.translation}"</div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      <AppPromoMini />
    </div>
  );
}