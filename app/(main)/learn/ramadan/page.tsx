import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: 'Ramadan & Fasting Guide | allhalal.info',
  description: 'Essential rulings, tips, and supplications for the holy month of Ramadan.',
};

export default async function RamadanGuidePage(props: { params: Promise<{}> }) {
  const params = await props.params;
  return (
    <div className="container py-32 max-w-4xl mx-auto min-h-screen">
      <Link href={`/learn`} className="text-primary hover:underline mb-8 inline-block">&larr; Back to Learn</Link>
      <h1 className="text-4xl md:text-5xl font-bold font-display text-text-primary mb-6">Ramadan & Fasting Guide</h1>
      
      <div className="prose prose-lg dark:prose-invert max-w-none text-text-secondary">
        <p className="lead text-xl">The month of Ramadan is a time of immense spiritual growth, reflection, and physical discipline. Here are some key guidelines to help you make the most of it.</p>
        
        <h2 className="text-2xl font-bold font-display text-text-primary mt-10 mb-4">Core Principles</h2>
        <ul className="list-disc pl-6 mb-8 space-y-2">
          <li><strong>Intention (Niyyah):</strong> Making the intention to fast before Fajr.</li>
          <li><strong>Abstinence:</strong> Avoiding food, drink, and intimate relations from dawn (Fajr) to sunset (Maghrib).</li>
          <li><strong>Behavior:</strong> Avoiding gossip, arguments, and negative behavior, which can diminish the reward of the fast.</li>
        </ul>

        <h2 className="text-2xl font-bold font-display text-text-primary mt-10 mb-4">Important Supplications</h2>
        <div className="bg-bg-card border border-border p-6 rounded-2xl mb-8">
          <h3 className="font-bold font-display text-text-primary mb-2">Dua for Breaking Fast (Iftar)</h3>
          <p className="text-xl mb-2 text-right" dir="rtl">ذَهَبَ الظَّمَأُ وَابْتَلَّتِ الْعُرُوقُ، وَثَبَتَ الأَجْرُ إِنْ شَاءَ اللَّهُ</p>
          <p className="text-sm italic">"Dhahabaz-zama\\'u, wabtallatil-AAurooqu, wathabatal-ajru inshaa-Allah"</p>
          <p className="text-sm mt-2">The thirst is gone, the veins are moistened, and the reward is confirmed, if Allah wills.</p>
        </div>

        <h2 className="text-2xl font-bold font-display text-text-primary mt-10 mb-4">FAQs about Fasting</h2>
        <div className="space-y-4">
          <details className="bg-bg-card border border-border p-4 rounded-xl cursor-pointer group">
            <summary className="font-bold font-display text-text-primary outline-none">Does brushing my teeth break my fast?</summary>
            <p className="mt-3 text-text-secondary">No, brushing your teeth does not break the fast as long as you do not swallow the toothpaste or water. Many scholars recommend using a miswak.</p>
          </details>
          <details className="bg-bg-card border border-border p-4 rounded-xl cursor-pointer group">
            <summary className="font-bold font-display text-text-primary outline-none">What if I eat or drink forgetfully?</summary>
            <p className="mt-3 text-text-secondary">If you eat or drink genuinely out of forgetfulness, your fast is still valid. You should stop as soon as you remember and continue your fast.</p>
          </details>
        </div>

        <div className="mt-16 pt-8 border-t border-border">
          <h3 className="font-bold text-lg mb-4">Continue Learning</h3>
          <div className="flex gap-4">
            <Link href={`/learn/duas`} className="text-primary hover:underline">Daily Duas &rarr;</Link>
            <Link href={`/learn/99-names`} className="text-primary hover:underline">99 Names of Allah &rarr;</Link>
          </div>
        </div>
      </div>
    </div>
  );
}