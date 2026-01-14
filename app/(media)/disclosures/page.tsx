import { generateMetadata as generateMeta } from '@/lib/seo/metadata';
import { Breadcrumbs } from '@/components/media/layout/Breadcrumbs';
import { AdFreeZone } from '@/components/media/monetization/AdSlot';

export const metadata = generateMeta({
  title: 'Advertising Disclosures',
  description: 'Transparency about our advertising relationships, affiliate links, and sponsored content at AllHalal.',
  path: '/disclosures',
  noindex: false
});

export default function DisclosuresPage() {
  return (
    <AdFreeZone>
      <div className="max-w-4xl mx-auto px-4 py-12">
        <Breadcrumbs />
        
        <article className="prose prose-lg dark:prose-invert max-w-none mt-8">
          <h1>Advertising & Disclosure Policy</h1>
          
          <p className="lead">
            At AllHalal, we believe in transparency. This page discloses our advertising relationships,
            affiliate programs, and how we generate revenue while maintaining editorial integrity.
          </p>

          <h2>Our Commitment to You</h2>
          <p>
            We are committed to:
          </p>
          <ul>
            <li>🔍 <strong>Full Transparency:</strong> Clearly labeling all sponsored content and ads</li>
            <li>✍️ <strong>Editorial Independence:</strong> Never letting ads influence our content</li>
            <li>🎯 <strong>Quality First:</strong> Only recommending products/services we genuinely believe in</li>
            <li>🤝 <strong>Trust:</strong> Building long-term trust over short-term profit</li>
          </ul>

          <h2>How We Make Money</h2>

          <h3>1. Display Advertising</h3>
          <p>
            We display advertisements on our website through advertising partners like Google AdSense
            and other ad networks.
          </p>
          
          <h4>What This Means:</h4>
          <ul>
            <li>Ads appear in designated spots throughout the site</li>
            <li>All ads are clearly labeled as "Advertisement" or "Sponsored"</li>
            <li>Ads are selected by the ad network, not by AllHalal editors</li>
            <li>We screen ad networks to ensure appropriateness for Muslim audiences</li>
            <li>Certain pages are ad-free (editorial policy, legal pages, etc.)</li>
          </ul>

          <h4>What You Should Know:</h4>
          <ul>
            <li>We do not control which specific ads appear (ad networks do)</li>
            <li>Ad revenue helps fund our content creation and server costs</li>
            <li>You can use ad blockers; we respect that choice</li>
          </ul>

          <h3>2. Affiliate Marketing</h3>
          <p>
            Some links on AllHalal are "affiliate links." This means if you click a link and make a purchase,
            we may earn a small commission at no additional cost to you.
          </p>

          <h4>Where Affiliate Links Appear:</h4>
          <ul>
            <li>Product recommendations in articles</li>
            <li>Book recommendations in guides</li>
            <li>Travel booking links (hotels, flights)</li>
            <li>App download links</li>
          </ul>

          <h4>Our Affiliate Partnerships:</h4>
          <ul>
            <li>Amazon Associates</li>
            <li>Booking.com Affiliate Program</li>
            <li>Travel booking platforms</li>
            <li>Halal product marketplaces</li>
          </ul>

          <h4>Our Promise:</h4>
          <ul>
            <li>✅ We ONLY recommend products/services we genuinely believe in</li>
            <li>✅ Affiliate status does NOT affect our reviews or rankings</li>
            <li>✅ We clearly disclose when an article contains affiliate links</li>
            <li>✅ You always pay the same price whether you use our link or not</li>
          </ul>

          <h3>3. Sponsored Content</h3>
          <p>
            Occasionally, we publish sponsored content (also called "partner content" or "paid partnerships").
          </p>

          <h4>What Is Sponsored Content?</h4>
          <ul>
            <li>Articles or videos created in partnership with a brand</li>
            <li>Content that a brand has paid us to create and publish</li>
            <li>Clearly labeled at the top with "Sponsored," "Partner Content," or "Paid Partnership"</li>
          </ul>

          <h4>Our Sponsored Content Standards:</h4>
          <ul>
            <li>Must meet our editorial quality standards</li>
            <li>Must provide genuine value to readers</li>
            <li>AllHalal retains full editorial control over messaging</li>
            <li>We only partner with brands aligned with our values</li>
            <li>Clear disclosure at article beginning</li>
          </ul>

          <h4>Example Disclosure:</h4>
          <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4 not-prose">
            <p className="text-sm font-semibold text-yellow-900 dark:text-yellow-100 mb-2">
              📢 Sponsored Content
            </p>
            <p className="text-sm text-yellow-800 dark:text-yellow-200">
              This article is sponsored by [Brand Name]. While we were compensated for this content,
              all opinions are our own and meet AllHalal's editorial standards. Learn more about our
              <a href="/disclosures" className="underline"> disclosure policy</a>.
            </p>
          </div>

          <h3>4. Direct Partnerships</h3>
          <p>
            We may have direct partnerships with:
          </p>
          <ul>
            <li>Halal certification bodies (for educational content)</li>
            <li>Islamic financial institutions (for finance guides)</li>
            <li>Travel companies (for destination guides)</li>
            <li>Real estate developers (for market insights)</li>
          </ul>

          <h4>Disclosure:</h4>
          <ul>
            <li>All partnerships are disclosed in relevant content</li>
            <li>Partnerships do not influence rankings or reviews</li>
            <li>We maintain editorial independence</li>
          </ul>

          <h2>What We DON'T Do</h2>

          <h3>❌ We Do NOT:</h3>
          <ul>
            <li>Accept payment for positive reviews or rankings</li>
            <li>Sell editorial content or top list placements</li>
            <li>Allow advertisers to dictate our content</li>
            <li>Promote products we wouldn't use ourselves</li>
            <li>Hide affiliate relationships or sponsored content</li>
            <li>Sell your email addresses or personal data</li>
            <li>Display misleading or deceptive ads</li>
          </ul>

          <h2>FTC Compliance</h2>
          <p>
            AllHalal complies with the Federal Trade Commission (FTC) guidelines on endorsements,
            testimonials, and advertising:
          </p>
          <ul>
            <li>We clearly disclose material connections (affiliate relationships, sponsorships)</li>
            <li>Disclosures are clear, conspicuous, and placed where consumers will see them</li>
            <li>We do not make false or misleading claims</li>
            <li>Endorsements reflect honest opinions and experiences</li>
          </ul>

          <h2>How Ads & Affiliates Affect Our Content</h2>

          <h3>Editorial Independence</h3>
          <p>
            Our editorial team operates independently from our business development team. This means:
          </p>
          <ul>
            <li>Writers/editors are not told which brands to feature</li>
            <li>Reviews are based on merit, not payment</li>
            <li>"Best of" lists are determined by our ranking criteria, not ad spend</li>
            <li>Negative reviews are published when warranted, even if the brand advertises with us</li>
          </ul>

          <h3>Example: Restaurant Reviews</h3>
          <p>
            If a restaurant advertises on AllHalal, it does NOT:
          </p>
          <ul>
            <li>Guarantee a positive review</li>
            <li>Guarantee inclusion in "Best Restaurants" lists</li>
            <li>Prevent us from publishing negative feedback</li>
          </ul>
          <p>
            Our reviews are based solely on food quality, halal certification, service, and value.
          </p>

          <h2>User-Generated Content</h2>
          <p>
            If we implement user reviews or comments in the future:
          </p>
          <ul>
            <li>User contributions will be clearly marked as such</li>
            <li>We do not pay for positive reviews</li>
            <li>We moderate for spam and inappropriate content</li>
            <li>We do not delete negative reviews unless they violate our guidelines</li>
          </ul>

          <h2>Questions About Advertising?</h2>

          <h3>As a Reader:</h3>
          <p>
            If you have questions about advertising or partnerships:
          </p>
          <ul>
            <li><strong>Email:</strong> advertising@allhalal.info</li>
            <li><strong>Report Inappropriate Ads:</strong> ads-report@allhalal.info</li>
          </ul>

          <h3>As an Advertiser:</h3>
          <p>
            Interested in advertising with AllHalal? Contact our business team:
          </p>
          <ul>
            <li><strong>Email:</strong> partnerships@allhalal.info</li>
            <li>Please review our editorial policy first to ensure alignment</li>
          </ul>

          <h2>Changes to This Policy</h2>
          <p>
            We may update this disclosure policy as our business evolves. Material changes will be:
          </p>
          <ul>
            <li>Noted at the top of this page</li>
            <li>Announced to newsletter subscribers</li>
            <li>Dated and versioned</li>
          </ul>

          <h2>Your Trust Matters</h2>
          <p>
            We know you have many choices for halal lifestyle information. We're honored you chose AllHalal.
            Our commitment to transparency and quality is unwavering.
          </p>
          <p>
            If you ever feel we've fallen short of these standards, please let us know at
            feedback@allhalal.info
          </p>

          <hr />
          
          <p className="text-sm text-gray-600 dark:text-gray-400">
            <strong>Last Updated:</strong> January 14, 2026<br />
            <strong>Version:</strong> 1.0<br />
            See also: <a href="/editorial-policy">Editorial Policy</a> | <a href="/legal/privacy-policy">Privacy Policy</a>
          </p>
        </article>
      </div>
    </AdFreeZone>
  );
}
