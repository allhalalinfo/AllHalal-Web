import { Metadata } from 'next';
import fs from 'fs';
import path from 'path';
import ReactMarkdown from 'react-markdown';
import AppPromoMini from '@/components/ui/AppPromoMini';

export const metadata: Metadata = {
  title: 'Our Methodology | How allhalal.info Verifies Food & Finance',
  description: 'Learn about our rigorous process for classifying halal, haram, and doubtful products. We rely on authentic scholarship and trusted certification bodies.',
};

export default async function MethodologyPage(props: { params: Promise<{ locale: string }> }) {
  const filePath = path.join(process.cwd(), 'content', 'pages', 'methodology.md');
  const content = fs.readFileSync(filePath, 'utf8');

  return (
    <div className="container py-32 min-h-screen max-w-4xl mx-auto">
      <div className="bg-bg-card border border-border p-8 md:p-12 rounded-3xl shadow-sm mb-12">
        <div className="prose prose-lg dark:prose-invert max-w-none text-text-secondary">
          <ReactMarkdown>{content}</ReactMarkdown>
        </div>
      </div>
      
      <AppPromoMini />
    </div>
  );
}