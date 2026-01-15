import { generateCityMetadata } from '@/lib/seo/metadata';
import { generateBreadcrumbLD, generateItemListLD, createStructuredDataScript } from '@/lib/seo/structured-data';
import { getBreadcrumbs } from '@/lib/seo/breadcrumbs';
import { cities, getCityBySlug } from '@/data';
import { 
  generateCityRestaurantIntro, 
  generateCityRestaurantFAQ,
  generateQuickStats,
  generateRelatedLinks
} from '@/lib/utils/programmatic';
import { Breadcrumbs } from '@/components/media/layout/Breadcrumbs';
import { FAQAccordion } from '@/components/media/content/FAQAccordion';
import { AdSlot } from '@/components/media/monetization/AdSlot';
import { notFound } from 'next/navigation';

// Generate static params for all cities
export async function generateStaticParams() {
  return cities.map((city) => ({
    city: city.slug,
  }));
}

// Generate metadata for each city
export async function generateMetadata({ params }: { params: Promise<{ city: string }> }) {
  const { city: citySlug } = await params;
  const city = getCityBySlug(citySlug);
  
  if (!city) {
    return {
      title: 'City Not Found',
      description: 'The requested city could not be found.',
    };
  }
  
  return generateCityMetadata(city);
}

export default async function CityRestaurantsPage({ params }: { params: Promise<{ city: string }> }) {
  const { city: citySlug } = await params;
  const city = getCityBySlug(citySlug);
  
  if (!city) {
    notFound();
  }
  
  // Generate content
  const intro = generateCityRestaurantIntro(city);
  const faqs = generateCityRestaurantFAQ(city);
  const stats = generateQuickStats(city);
  const relatedCities = generateRelatedLinks({
    type: 'city',
    current: city.slug,
    data: cities
  });
  
  // Generate breadcrumbs
  const breadcrumbs = getBreadcrumbs(`/restaurants/${city.slug}`);
  
  // Generate structured data
  const breadcrumbLD = generateBreadcrumbLD(breadcrumbs);
  
  // ItemList for top restaurants (placeholder - in production, fetch actual restaurants)
  const itemListLD = generateItemListLD({
    name: `Top Halal Restaurants in ${city.name}`,
    description: `Curated list of the best halal-certified restaurants in ${city.name}`,
    items: [
      // Placeholder items - replace with actual restaurant data
      { name: `Restaurant 1 in ${city.name}`, url: `/restaurants/${city.slug}/restaurant-1`, position: 1 },
      { name: `Restaurant 2 in ${city.name}`, url: `/restaurants/${city.slug}/restaurant-2`, position: 2 },
    ]
  });
  
  return (
    <>
      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: createStructuredDataScript(breadcrumbLD)
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: createStructuredDataScript(itemListLD)
        }}
      />
      
      {/* Page Content */}
      <div className="min-h-screen bg-bg-primary text-text-primary">
        {/* Header */}
        <header className="bg-gradient-to-b from-bg-secondary to-bg-primary py-12 border-b border-border">
          <div className="max-w-7xl mx-auto px-4">
            <Breadcrumbs className="text-text-secondary mb-4" />
            
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-text-primary">
              Best Halal Restaurants in {city.name}
            </h1>
            
            <p className="text-xl text-text-secondary">
              {city.country} • {city.halalRestaurantCount ? `${city.halalRestaurantCount.toLocaleString()}+ Halal Restaurants` : 'Multiple Halal Options'}
            </p>
          </div>
        </header>
        
        {/* Quick Stats */}
        {stats.length > 0 && (
          <section className="border-b border-border bg-surface">
            <div className="max-w-7xl mx-auto px-4 py-8">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {stats.map((stat, index) => (
                  <div key={index} className="text-center">
                    <div className="text-3xl font-bold text-primary">
                      {stat.value}
                    </div>
                    <div className="text-sm text-text-secondary mt-1">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}
        
        {/* Main Content */}
        <main className="max-w-7xl mx-auto px-4 py-12">
          {/* Introduction */}
          <div className="prose prose-lg dark:prose-invert max-w-none mb-12">
            <p className="text-xl leading-relaxed">{intro}</p>
          </div>
          
          {/* Ad Slot - In Article */}
          <AdSlot
            slotId="city-page-top"
            position="in-article"
            className="my-12"
          />
          
          {/* Content Sections */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-12">
              {/* Featured Restaurants Section (Placeholder) */}
              <section>
                <h2 className="text-3xl font-bold text-text-primary mb-6">
                  Top Rated Halal Restaurants
                </h2>
                
                <div className="bg-primary/10 border border-primary/20 rounded-lg p-6">
                  <p className="text-text-primary">
                    🚧 <strong>Coming Soon:</strong> We're currently verifying and reviewing halal restaurants in {city.name}. 
                    Check back soon for detailed reviews, menus, and certification information.
                  </p>
                  <p className="text-text-secondary mt-2 text-sm">
                    Know a great halal restaurant in {city.name}? <a href="/contact" className="underline font-semibold text-primary hover:text-primary-light">Let us know!</a>
                  </p>
                </div>
              </section>
              
              {/* Categories */}
              <section>
                <h2 className="text-3xl font-bold text-text-primary mb-6">
                  Explore by Cuisine
                </h2>
                
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {['Middle Eastern', 'South Asian', 'Turkish', 'Mediterranean', 'Asian Fusion', 'Fine Dining'].map(cuisine => (
                    <div
                      key={cuisine}
                      className="border border-border rounded-lg p-4 bg-bg-card hover:border-primary transition-colors cursor-pointer group"
                    >
                      <h3 className="font-semibold text-text-primary group-hover:text-primary transition-colors">
                        {cuisine}
                      </h3>
                      <p className="text-sm text-text-secondary mt-1">
                        Coming soon
                      </p>
                    </div>
                  ))}
                </div>
              </section>
              
              {/* How to Find Halal Food */}
              <section>
                <h2 className="text-3xl font-bold text-text-primary mb-6">
                  Finding Halal Food in {city.name}
                </h2>
                
                <div className="prose prose-lg dark:prose-invert max-w-none">
                  <h3>Halal Certification</h3>
                  <p>
                    Look for restaurants displaying valid halal certificates from recognized certification bodies. 
                    In {city.country}, trusted certifiers include those recognized by local Islamic authorities.
                  </p>
                  
                  <h3>Muslim-Owned vs. Halal-Certified</h3>
                  <p>
                    While many Muslim-owned restaurants serve halal food, official certification provides additional 
                    assurance. Always ask to see the certificate if it's not displayed.
                  </p>
                  
                  <h3>Apps & Resources</h3>
                  <p>
                    Use the <a href="/app">AllHalal mobile app</a> to find halal restaurants near you in {city.name}, 
                    verify certifications, and read reviews from the Muslim community.
                  </p>
                </div>
              </section>
            </div>
            
            {/* Sidebar */}
            <aside className="space-y-8">
              {/* Ad Slot - Sidebar */}
              <AdSlot
                slotId="city-page-sidebar"
                position="sidebar"
                size={{ width: 300, height: 600 }}
                minViewportWidth={1024}
              />
              
              {/* Quick Links */}
              <div className="bg-bg-card border border-border rounded-lg p-6">
                <h3 className="font-bold text-text-primary mb-4">
                  Quick Links
                </h3>
                <ul className="space-y-2">
                  <li>
                    <a href="#faq" className="text-primary hover:text-primary-light hover:underline">
                      Frequently Asked Questions
                    </a>
                  </li>
                  <li>
                    <a href="/certification" className="text-primary hover:text-primary-light hover:underline">
                      About Halal Certification
                    </a>
                  </li>
                  <li>
                    <a href={`/travel/cities/${city.slug}`} className="text-primary hover:text-primary-light hover:underline">
                      {city.name} Travel Guide
                    </a>
                  </li>
                </ul>
              </div>
              
              {/* Related Cities */}
              {relatedCities.length > 0 && (
                <div className="bg-bg-card border border-border rounded-lg p-6">
                  <h3 className="font-bold text-text-primary mb-4">
                    Explore Other Cities
                  </h3>
                  <ul className="space-y-3">
                    {relatedCities.map(link => (
                      <li key={link.href}>
                        <a
                          href={link.href}
                          className="text-primary hover:text-primary-light hover:underline font-medium"
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
          
          {/* FAQ Section */}
          <section id="faq" className="mt-16">
            <h2 className="text-3xl font-bold text-text-primary mb-8">
              Frequently Asked Questions
            </h2>
            <FAQAccordion items={faqs} />
          </section>
          
          {/* Newsletter CTA (Placeholder) */}
          <section className="mt-16 bg-gradient-to-r from-primary/10 to-primary/5 border border-primary/20 rounded-lg p-8 text-center">
            <h2 className="text-3xl font-bold mb-4 text-text-primary">
              Get Halal Restaurant Updates
            </h2>
            <p className="text-xl text-text-secondary mb-6">
              Subscribe to receive new halal restaurant listings in {city.name} and exclusive dining guides.
            </p>
            <button className="bg-primary text-white px-8 py-3 rounded-lg font-semibold hover:bg-primary-light transition-colors">
              Subscribe (Coming Soon)
            </button>
          </section>
        </main>
        
        {/* Footer Ad */}
        <div className="max-w-7xl mx-auto px-4 pb-12">
          <AdSlot
            slotId="city-page-footer"
            position="footer"
            size={{ width: 970, height: 250 }}
          />
        </div>
      </div>
    </>
  );
}
