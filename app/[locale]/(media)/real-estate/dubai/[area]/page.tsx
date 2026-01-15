import { generateDubaiAreaMetadata } from '@/lib/seo/metadata';
import { generateBreadcrumbLD, createStructuredDataScript } from '@/lib/seo/structured-data';
import { getBreadcrumbs } from '@/lib/seo/breadcrumbs';
import { dubaiAreas, getDubaiAreaBySlug, developers, getDevelopersByArea } from '@/data';
import { 
  generateDubaiAreaIntro, 
  generateDubaiAreaFAQ,
  generateQuickStats,
  generateRelatedLinks
} from '@/lib/utils/programmatic';
import { Breadcrumbs } from '@/components/media/layout/Breadcrumbs';
import { FAQAccordion } from '@/components/media/content/FAQAccordion';
import { AdSlot } from '@/components/media/monetization/AdSlot';
import { notFound } from 'next/navigation';

export async function generateStaticParams() {
  return dubaiAreas.map((area) => ({
    area: area.slug,
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ area: string }> }) {
  const { area: areaSlug } = await params;
  const area = getDubaiAreaBySlug(areaSlug);
  
  if (!area) {
    return {
      title: 'Area Not Found',
      description: 'The requested area could not be found.',
    };
  }
  
  return generateDubaiAreaMetadata(area);
}

export default async function DubaiAreaPage({ params }: { params: Promise<{ area: string }> }) {
  const { area: areaSlug } = await params;
  const area = getDubaiAreaBySlug(areaSlug);
  
  if (!area) {
    notFound();
  }
  
  const intro = generateDubaiAreaIntro(area);
  const faqs = generateDubaiAreaFAQ(area);
  const stats = generateQuickStats(area);
  const relatedAreas = generateRelatedLinks({
    type: 'area',
    current: area.slug,
    data: dubaiAreas
  });
  
  const activeDevelopers = getDevelopersByArea(area.slug);
  
  const breadcrumbs = getBreadcrumbs(`/real-estate/dubai/${area.slug}`);
  const breadcrumbLD = generateBreadcrumbLD(breadcrumbs);
  
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: createStructuredDataScript(breadcrumbLD)
        }}
      />
      
      <div className="min-h-screen bg-white dark:bg-gray-950">
        <header className="bg-gradient-to-r from-blue-600 to-blue-700 text-white py-12">
          <div className="max-w-7xl mx-auto px-4">
            <Breadcrumbs className="text-blue-100 mb-4" />
            
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              {area.name}: Real Estate Guide
            </h1>
            
            <p className="text-xl text-blue-100">
              Dubai • {area.zone} • Sharia-Compliant Payment Plans Available
            </p>
          </div>
        </header>
        
        {stats.length > 0 && (
          <section className="border-b border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900">
            <div className="max-w-7xl mx-auto px-4 py-8">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {stats.map((stat, index) => (
                  <div key={index} className="text-center">
                    <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">
                      {stat.value}
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}
        
        <main className="max-w-7xl mx-auto px-4 py-12">
          <div className="prose prose-lg dark:prose-invert max-w-none mb-12">
            <p className="text-xl leading-relaxed">{intro}</p>
          </div>
          
          <AdSlot
            slotId="area-page-top"
            position="in-article"
            className="my-12"
          />
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2 space-y-12">
              {/* Sharia Compliance Disclaimer */}
              <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-6">
                <h3 className="font-bold text-blue-900 dark:text-blue-100 mb-2">
                  📌 Sharia Compliance Note
                </h3>
                <p className="text-blue-800 dark:text-blue-200 text-sm">
                  Information provided about Sharia-compliant financing is for educational purposes. 
                  Payment plan structures and Islamic finance availability change frequently. 
                  Always verify current terms with developers and consult qualified Islamic finance advisors 
                  before making investment decisions.
                </p>
              </div>
              
              {/* Active Developers */}
              {activeDevelopers.length > 0 && (
                <section>
                  <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
                    Active Developers in {area.name}
                  </h2>
                  
                  <div className="grid gap-6">
                    {activeDevelopers.slice(0, 5).map(dev => (
                      <div
                        key={dev.slug}
                        className="border border-gray-200 dark:border-gray-800 rounded-lg p-6 hover:border-blue-500 dark:hover:border-blue-600 transition-colors"
                      >
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                          {dev.name}
                        </h3>
                        <p className="text-gray-600 dark:text-gray-400 mb-4">
                          {dev.description}
                        </p>
                        <div className="flex flex-wrap gap-2 mb-4">
                          {dev.shariaCompliance.certified && (
                            <span className="inline-block px-3 py-1 text-xs font-semibold text-green-800 dark:text-green-200 bg-green-100 dark:bg-green-900/30 rounded-full">
                              ✓ Sharia-Compliant Plans
                            </span>
                          )}
                          {dev.projectCount && (
                            <span className="inline-block px-3 py-1 text-xs text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-800 rounded-full">
                              {dev.projectCount}+ Projects
                            </span>
                          )}
                        </div>
                        <a
                          href={`/real-estate/developers/${dev.slug}`}
                          className="text-blue-600 dark:text-blue-400 hover:underline font-semibold"
                        >
                          View Developer Profile →
                        </a>
                      </div>
                    ))}
                  </div>
                  
                  {activeDevelopers.length > 5 && (
                    <p className="text-gray-600 dark:text-gray-400 mt-4">
                      + {activeDevelopers.length - 5} more developers active in this area
                    </p>
                  )}
                </section>
              )}
              
              {/* Payment Plans */}
              <section>
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
                  Sharia-Compliant Financing Options
                </h2>
                
                <div className="prose prose-lg dark:prose-invert max-w-none">
                  <h3>Developer Payment Plans</h3>
                  <p>
                    Most developers in {area.name} offer interest-free installment plans. Common structures include:
                  </p>
                  <ul>
                    <li><strong>60/40 Plan:</strong> 60% during construction, 40% on completion</li>
                    <li><strong>70/30 Plan:</strong> 70% during construction, 30% on completion</li>
                    <li><strong>Post-Handover:</strong> Extended payment plans after property delivery</li>
                  </ul>
                  
                  <h3>Islamic Bank Financing (Murabaha)</h3>
                  <p>
                    Islamic banks in the UAE offer Murabaha financing - a Sharia-compliant alternative to conventional mortgages. 
                    The bank purchases the property and sells it to you at a markup, payable in installments.
                  </p>
                  
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    📖 Learn more: <a href="/finance/guides/murabaha">What is Murabaha Financing?</a>
                  </p>
                </div>
              </section>
            </div>
            
            <aside className="space-y-8">
              <AdSlot
                slotId="area-page-sidebar"
                position="sidebar"
                size={{ width: 300, height: 600 }}
                minViewportWidth={1024}
              />
              
              {/* Amenities */}
              {area.amenities.length > 0 && (
                <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-6">
                  <h3 className="font-bold text-gray-900 dark:text-white mb-4">
                    Key Amenities
                  </h3>
                  <ul className="space-y-2">
                    {area.amenities.slice(0, 8).map(amenity => (
                      <li key={amenity} className="text-gray-700 dark:text-gray-300 flex items-center">
                        <span className="text-blue-500 mr-2">✓</span>
                        {amenity}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              
              {/* Related Areas */}
              {relatedAreas.length > 0 && (
                <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-6">
                  <h3 className="font-bold text-gray-900 dark:text-white mb-4">
                    Nearby Areas
                  </h3>
                  <ul className="space-y-3">
                    {relatedAreas.map(link => (
                      <li key={link.href}>
                        <a
                          href={link.href}
                          className="text-blue-600 dark:text-blue-400 hover:underline font-medium"
                        >
                          {link.title}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </aside>
          </div>
          
          <section id="faq" className="mt-16">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
              Frequently Asked Questions
            </h2>
            <FAQAccordion items={faqs} />
          </section>
        </main>
        
        <div className="max-w-7xl mx-auto px-4 pb-12">
          <AdSlot
            slotId="area-page-footer"
            position="footer"
            size={{ width: 970, height: 250 }}
          />
        </div>
      </div>
    </>
  );
}
