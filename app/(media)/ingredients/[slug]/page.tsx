import { generateIngredientMetadata } from '@/lib/seo/metadata';
import { generateBreadcrumbLD, createStructuredDataScript } from '@/lib/seo/structured-data';
import { getBreadcrumbs } from '@/lib/seo/breadcrumbs';
import { ingredients, getIngredientBySlug } from '@/data';
import { 
  generateIngredientIntro, 
  generateIngredientFAQ,
  generateRelatedLinks
} from '@/lib/utils/programmatic';
import { Breadcrumbs } from '@/components/media/layout/Breadcrumbs';
import { FAQAccordion } from '@/components/media/content/FAQAccordion';
import { AdSlot } from '@/components/media/monetization/AdSlot';
import { notFound } from 'next/navigation';
import { CheckCircle2, XCircle, AlertCircle, HelpCircle } from 'lucide-react';

export async function generateStaticParams() {
  return ingredients.map((ingredient) => ({
    slug: ingredient.slug,
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const ingredient = getIngredientBySlug(slug);
  
  if (!ingredient) {
    return {
      title: 'Ingredient Not Found',
      description: 'The requested ingredient could not be found.',
    };
  }
  
  return generateIngredientMetadata(ingredient);
}

export default async function IngredientPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const ingredient = getIngredientBySlug(slug);
  
  if (!ingredient) {
    notFound();
  }
  
  const intro = generateIngredientIntro(ingredient);
  const faqs = generateIngredientFAQ(ingredient);
  const relatedIngredients = generateRelatedLinks({
    type: 'ingredient',
    current: ingredient.slug,
    data: ingredients
  });
  
  const breadcrumbs = getBreadcrumbs(`/ingredients/${ingredient.slug}`);
  const breadcrumbLD = generateBreadcrumbLD(breadcrumbs);
  
  // Status badge configuration
  const statusConfig = {
    halal: {
      icon: CheckCircle2,
      color: 'text-green-600 dark:text-green-400',
      bgColor: 'bg-green-50 dark:bg-green-900/20',
      borderColor: 'border-green-200 dark:border-green-800',
      label: 'Halal',
      emoji: '✅'
    },
    haram: {
      icon: XCircle,
      color: 'text-red-600 dark:text-red-400',
      bgColor: 'bg-red-50 dark:bg-red-900/20',
      borderColor: 'border-red-200 dark:border-red-800',
      label: 'Haram',
      emoji: '🚫'
    },
    doubtful: {
      icon: AlertCircle,
      color: 'text-yellow-600 dark:text-yellow-400',
      bgColor: 'bg-yellow-50 dark:bg-yellow-900/20',
      borderColor: 'border-yellow-200 dark:border-yellow-800',
      label: 'Doubtful',
      emoji: '⚠️'
    },
    depends: {
      icon: HelpCircle,
      color: 'text-blue-600 dark:text-blue-400',
      bgColor: 'bg-blue-50 dark:bg-blue-900/20',
      borderColor: 'border-blue-200 dark:border-blue-800',
      label: 'Depends on Source',
      emoji: '❓'
    }
  };
  
  const status = statusConfig[ingredient.status];
  const StatusIcon = status.icon;
  
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: createStructuredDataScript(breadcrumbLD)
        }}
      />
      
      <div className="min-h-screen bg-white dark:bg-gray-950">
        <header className="bg-gradient-to-r from-purple-600 to-purple-700 text-white py-12">
          <div className="max-w-4xl mx-auto px-4">
            <Breadcrumbs className="text-purple-100 mb-4" />
            
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Is {ingredient.name} Halal?
            </h1>
            
            {ingredient.alternativeNames && ingredient.alternativeNames.length > 0 && (
              <p className="text-lg text-purple-100">
                Also known as: {ingredient.alternativeNames.join(', ')}
              </p>
            )}
          </div>
        </header>
        
        {/* Status Badge - Prominent */}
        <section className="bg-gray-50 dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800">
          <div className="max-w-4xl mx-auto px-4 py-8">
            <div className={`${status.bgColor} ${status.borderColor} border-2 rounded-lg p-6 flex items-center gap-4`}>
              <StatusIcon className={`${status.color} w-12 h-12 flex-shrink-0`} />
              <div>
                <div className={`text-2xl font-bold ${status.color} mb-1`}>
                  {status.emoji} {status.label}
                </div>
                <p className="text-gray-700 dark:text-gray-300">
                  {ingredient.status === 'halal' && 'This ingredient is generally permissible in Islam.'}
                  {ingredient.status === 'haram' && 'This ingredient is prohibited (haram) in Islam.'}
                  {ingredient.status === 'doubtful' && 'Scholarly opinions vary on this ingredient.'}
                  {ingredient.status === 'depends' && 'Permissibility depends on the source and processing method.'}
                </p>
              </div>
            </div>
          </div>
        </section>
        
        <main className="max-w-4xl mx-auto px-4 py-12">
          <div className="prose prose-lg dark:prose-invert max-w-none mb-12">
            <p className="text-xl leading-relaxed">{intro}</p>
          </div>
          
          <AdSlot
            slotId="ingredient-page-top"
            position="in-article"
            className="my-12"
          />
          
          {/* Details Grid */}
          <div className="grid md:grid-cols-2 gap-6 mb-12">
            {/* Category */}
            <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-6">
              <h3 className="font-bold text-gray-900 dark:text-white mb-2">
                Category
              </h3>
              <p className="text-gray-700 dark:text-gray-300 capitalize">
                {ingredient.category.replace('-', ' ')}
              </p>
            </div>
            
            {/* Common Uses */}
            {ingredient.commonUses && ingredient.commonUses.length > 0 && (
              <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-6">
                <h3 className="font-bold text-gray-900 dark:text-white mb-2">
                  Found In
                </h3>
                <p className="text-gray-700 dark:text-gray-300">
                  {ingredient.commonUses.join(', ')}
                </p>
              </div>
            )}
            
            {/* Related E-Codes */}
            {ingredient.relatedECodes && ingredient.relatedECodes.length > 0 && (
              <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-6">
                <h3 className="font-bold text-gray-900 dark:text-white mb-2">
                  Related E-Codes
                </h3>
                <div className="flex flex-wrap gap-2">
                  {ingredient.relatedECodes.map(code => (
                    <a
                      key={code}
                      href={`/e-codes/${code.toLowerCase()}`}
                      className="inline-block px-3 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 rounded font-mono text-sm hover:bg-purple-200 dark:hover:bg-purple-900/50 transition-colors"
                    >
                      {code}
                    </a>
                  ))}
                </div>
              </div>
            )}
            
            {/* Sources */}
            {ingredient.sources.length > 0 && (
              <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-6">
                <h3 className="font-bold text-gray-900 dark:text-white mb-2">
                  Sources
                </h3>
                <ul className="text-sm text-gray-700 dark:text-gray-300 space-y-1">
                  {ingredient.sources.map((source, idx) => (
                    <li key={idx}>• {source}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
          
          {/* Important Note for "Depends" Status */}
          {ingredient.status === 'depends' && (
            <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-6 mb-12">
              <h3 className="font-bold text-blue-900 dark:text-blue-100 mb-2">
                ℹ️ Source Matters
              </h3>
              <p className="text-blue-800 dark:text-blue-200">
                For {ingredient.name}, the halal status depends on its origin:
              </p>
              <ul className="mt-2 space-y-1 text-blue-800 dark:text-blue-200">
                <li>✅ <strong>Halal if:</strong> From halal-slaughtered animals, plant sources, or synthetic production</li>
                <li>❌ <strong>Haram if:</strong> From pork or non-halal slaughtered animals</li>
                <li>⚠️ <strong>Always check:</strong> Look for halal certification on products</li>
              </ul>
            </div>
          )}
          
          {/* Disclaimer for Haram/Doubtful */}
          {(ingredient.status === 'haram' || ingredient.status === 'doubtful') && (
            <div className={`${ingredient.status === 'haram' ? 'bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800' : 'bg-yellow-50 dark:bg-yellow-900/20 border-yellow-200 dark:border-yellow-800'} border rounded-lg p-6 mb-12`}>
              <h3 className={`font-bold ${ingredient.status === 'haram' ? 'text-red-900 dark:text-red-100' : 'text-yellow-900 dark:text-yellow-100'} mb-2`}>
                {ingredient.status === 'haram' ? '🚫 Caution' : '⚠️ Scholarly Differences'}
              </h3>
              <p className={ingredient.status === 'haram' ? 'text-red-800 dark:text-red-200' : 'text-yellow-800 dark:text-yellow-200'}>
                {ingredient.status === 'haram' 
                  ? `${ingredient.name} is prohibited in Islam. Avoid products containing this ingredient.`
                  : `Scholars from different madhabs (schools of thought) have varying opinions on ${ingredient.name}. When in doubt, it's recommended to avoid it or consult your local imam.`
                }
              </p>
            </div>
          )}
          
          {/* FAQ Section */}
          <section id="faq" className="mt-16">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
              Frequently Asked Questions
            </h2>
            <FAQAccordion items={faqs} />
          </section>
          
          {/* Related Ingredients */}
          {relatedIngredients.length > 0 && (
            <section className="mt-16">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
                Related Ingredients
              </h2>
              <div className="grid md:grid-cols-2 gap-4">
                {relatedIngredients.map(link => (
                  <a
                    key={link.href}
                    href={link.href}
                    className="border border-gray-200 dark:border-gray-800 rounded-lg p-4 hover:border-purple-500 dark:hover:border-purple-600 transition-colors"
                  >
                    <h3 className="font-semibold text-gray-900 dark:text-white mb-1">
                      {link.title}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Check halal status →
                    </p>
                  </a>
                ))}
              </div>
            </section>
          )}
          
          {/* CTA: Ingredient Checker Tool */}
          <section className="mt-16 bg-gradient-to-r from-purple-600 to-purple-700 rounded-lg p-8 text-white text-center">
            <h2 className="text-3xl font-bold mb-4">
              Check More Ingredients
            </h2>
            <p className="text-xl text-purple-100 mb-6">
              Use our ingredient checker tool to quickly verify halal status of any ingredient.
            </p>
            <a
              href="/tools/ingredient-checker"
              className="inline-block bg-white text-purple-600 px-8 py-3 rounded-lg font-semibold hover:bg-purple-50 transition-colors"
            >
              Try Ingredient Checker
            </a>
          </section>
        </main>
        
        <div className="max-w-4xl mx-auto px-4 pb-12">
          <AdSlot
            slotId="ingredient-page-footer"
            position="footer"
            size={{ width: 728, height: 90 }}
          />
        </div>
      </div>
    </>
  );
}
