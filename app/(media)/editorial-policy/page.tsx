import { generateMetadata as generateMeta } from '@/lib/seo/metadata';
import { Breadcrumbs } from '@/components/media/layout/Breadcrumbs';
import { AdFreeZone } from '@/components/media/monetization/AdSlot';

export const metadata = generateMeta({
  title: 'Editorial Policy',
  description: 'Learn about AllHalal\'s editorial standards, review process, and commitment to providing accurate, trustworthy halal lifestyle information.',
  path: '/editorial-policy',
  noindex: false
});

export default function EditorialPolicyPage() {
  return (
    <AdFreeZone>
      <div className="max-w-4xl mx-auto px-4 py-12">
        <Breadcrumbs />
        
        <article className="prose prose-lg dark:prose-invert max-w-none mt-8">
          <h1>Editorial Policy</h1>
          
          <p className="lead">
            At AllHalal, we are committed to providing accurate, trustworthy, and valuable information
            about halal lifestyle, food, travel, finance, and more. This editorial policy outlines our
            standards and processes.
          </p>

          <h2>Our Mission</h2>
          <p>
            Our mission is to be the most trusted source of halal lifestyle information worldwide. We strive
            to help Muslims make informed decisions about food, travel, finance, and daily life while respecting
            diverse scholarly opinions and madhabs.
          </p>

          <h2>Editorial Standards</h2>

          <h3>1. Accuracy & Fact-Checking</h3>
          <ul>
            <li>
              <strong>Verification:</strong> All facts, statistics, and claims are verified through primary
              sources or reputable secondary sources
            </li>
            <li>
              <strong>Sources:</strong> We cite authoritative sources including recognized halal certification
              bodies (JAKIM, IFANCA, HMC, HFA), Islamic scholars, and academic research
            </li>
            <li>
              <strong>Updates:</strong> Evergreen guides are reviewed and updated every 6 months to ensure
              information remains current
            </li>
            <li>
              <strong>Corrections:</strong> We promptly correct errors when identified and note corrections at
              the article bottom
            </li>
          </ul>

          <h3>2. Independence & Objectivity</h3>
          <ul>
            <li>
              <strong>No Bias:</strong> Our editorial content is independent of commercial relationships
            </li>
            <li>
              <strong>Disclosure:</strong> All sponsored content, affiliate links, and partnerships are clearly disclosed
            </li>
            <li>
              <strong>Reviews:</strong> Restaurant and product reviews are based on merit, not payment
            </li>
            <li>
              <strong>Comparison Methodology:</strong> "Best of" lists and rankings include transparent methodology
            </li>
          </ul>

          <h3>3. Respect for Diversity</h3>
          <ul>
            <li>
              <strong>Madhab Awareness:</strong> We acknowledge that scholarly opinions vary across Hanafi, Maliki,
              Shafi'i, and Hanbali madhabs
            </li>
            <li>
              <strong>Multiple Perspectives:</strong> For controversial ingredients or practices, we present
              different scholarly views
            </li>
            <li>
              <strong>Not Issuing Fatwas:</strong> We do not issue religious rulings. We cite existing scholarly
              consensus or recommend consulting local imams
            </li>
            <li>
              <strong>Cultural Sensitivity:</strong> Content is respectful of diverse Muslim cultures and practices
            </li>
          </ul>

          <h3>4. Expertise & Authority</h3>
          <ul>
            <li>
              <strong>Expert Contributors:</strong> Authors have relevant expertise (halal certification, Islamic
              finance, travel, food science)
            </li>
            <li>
              <strong>Advisory Board:</strong> Content is reviewed by subject matter experts and Islamic scholars
            </li>
            <li>
              <strong>Continuous Learning:</strong> Our team stays updated on halal standards, certification changes,
              and scholarly developments
            </li>
          </ul>

          <h2>Content Types & Standards</h2>

          <h3>Articles & Guides</h3>
          <ul>
            <li>Minimum 1,500 words for comprehensive guides</li>
            <li>Clear structure with subheadings every 300-500 words</li>
            <li>Minimum 3 internal links to related content</li>
            <li>FAQ section (minimum 3 questions)</li>
            <li>Sources cited at end</li>
            <li>"Last Updated" date prominently displayed</li>
          </ul>

          <h3>Restaurant & Location Reviews</h3>
          <ul>
            <li>Halal certification verified (certificate number, certifying body)</li>
            <li>Multiple visits or verified user reports</li>
            <li>Clear disclosure of certification type (halal-certified vs. muslim-owned vs. zabihah)</li>
            <li>Updated quarterly or when information changes</li>
          </ul>

          <h3>Ingredient & E-Code Database</h3>
          <ul>
            <li>Status based on majority scholarly opinion</li>
            <li>Source-dependent ingredients clearly marked ("depends on source")</li>
            <li>Alternative names included</li>
            <li>Common uses listed</li>
            <li>Sources from certification bodies (JAKIM, IFANCA, HMC)</li>
          </ul>

          <h3>Finance & Real Estate</h3>
          <ul>
            <li>
              <strong>Not Financial Advice:</strong> All content is educational, not personalized financial advice
            </li>
            <li>Disclaimers on every finance/real estate page</li>
            <li>Sharia compliance verified through Islamic finance experts</li>
            <li>Payment plan details confirmed with developers/banks</li>
            <li>Recommend consulting licensed financial advisors</li>
          </ul>

          <h2>Review & Evaluation Methodology</h2>

          <h3>Restaurant Rankings</h3>
          <p>Our "Best Halal Restaurants" lists are based on:</p>
          <ol>
            <li><strong>Halal Certification:</strong> Valid certification from recognized body (40%)</li>
            <li><strong>Food Quality:</strong> Taste, presentation, ingredients (30%)</li>
            <li><strong>Service:</strong> Staff, atmosphere, cleanliness (15%)</li>
            <li><strong>Value:</strong> Price relative to quality (10%)</li>
            <li><strong>Accessibility:</strong> Location, parking, family-friendly (5%)</li>
          </ol>

          <h3>Developer/Bank Comparisons</h3>
          <p>Real estate developer and Islamic bank comparisons consider:</p>
          <ol>
            <li><strong>Sharia Compliance:</strong> Verification of Islamic finance structures</li>
            <li><strong>Transparency:</strong> Clear terms, payment schedules, fees</li>
            <li><strong>Track Record:</strong> Completed projects, customer reviews</li>
            <li><strong>Payment Flexibility:</strong> Options available, down payment requirements</li>
            <li><strong>Customer Service:</strong> Responsiveness, support</li>
          </ol>

          <h2>Advertising & Sponsored Content</h2>

          <h3>Advertising</h3>
          <ul>
            <li>Ads are clearly labeled as "Advertisement" or "Sponsored"</li>
            <li>Ads do not influence editorial content</li>
            <li>No ads on editorial policy, legal, or critical reference pages</li>
            <li>Ads are vetted to ensure appropriateness for Muslim audience</li>
          </ul>

          <h3>Affiliate Links</h3>
          <ul>
            <li>Affiliate relationships are disclosed at article beginning</li>
            <li>We only recommend products/services we genuinely believe in</li>
            <li>Affiliate status does not affect rankings or reviews</li>
          </ul>

          <h3>Sponsored Content</h3>
          <ul>
            <li>Clearly labeled as "Sponsored," "Partner Content," or "Paid Partnership"</li>
            <li>Meets same quality and accuracy standards as editorial content</li>
            <li>Must provide genuine value to readers</li>
            <li>AllHalal retains editorial control over messaging</li>
          </ul>

          <h2>User Submissions & Community</h2>

          <h3>Restaurant Suggestions</h3>
          <ul>
            <li>Users can submit restaurant recommendations via contact form</li>
            <li>All submissions are verified before publication</li>
            <li>Halal certification must be verifiable</li>
          </ul>

          <h3>Corrections & Feedback</h3>
          <ul>
            <li>Users can report errors via email: corrections@allhalal.info</li>
            <li>Corrections are reviewed within 48 hours</li>
            <li>Significant corrections are noted at article bottom with date</li>
          </ul>

          <h2>Content Updates</h2>

          <h3>Update Schedule</h3>
          <ul>
            <li><strong>Evergreen Guides:</strong> Reviewed every 6 months</li>
            <li><strong>Restaurant/Location Pages:</strong> Quarterly updates</li>
            <li><strong>Finance Rates/Terms:</strong> Monthly checks</li>
            <li><strong>Ingredient Status:</strong> Updated when new scholarly consensus emerges</li>
            <li><strong>Seasonal Content:</strong> 1-2 months before relevant season (Ramadan, Hajj)</li>
          </ul>

          <h3>Version Control</h3>
          <ul>
            <li>Major guide updates increment version number (e.g., v2.0 → v2.1)</li>
            <li>"Last Updated" date displayed prominently</li>
            <li>"Last Reviewed By" attribution included</li>
          </ul>

          <h2>Conflict of Interest Policy</h2>
          <ul>
            <li>Authors must disclose any personal or financial interests in subjects covered</li>
            <li>Team members cannot review businesses where they have ownership or employment</li>
            <li>Gifts or compensation from subjects must be declined or disclosed</li>
            <li>Editorial independence is maintained from commercial partnerships</li>
          </ul>

          <h2>Privacy & Data</h2>
          <ul>
            <li>User data is protected per our <a href="/legal/privacy-policy">Privacy Policy</a></li>
            <li>No selling of user email lists</li>
            <li>Newsletter unsubscribe honored within 48 hours</li>
            <li>Analytics used for improving content, not targeting</li>
          </ul>

          <h2>Contact Us</h2>
          <p>
            For questions about our editorial policy, content corrections, or general inquiries:
          </p>
          <ul>
            <li><strong>Email:</strong> editorial@allhalal.info</li>
            <li><strong>Corrections:</strong> corrections@allhalal.info</li>
            <li><strong>Partnership Inquiries:</strong> partnerships@allhalal.info</li>
          </ul>

          <hr />
          
          <p className="text-sm text-gray-600 dark:text-gray-400">
            <strong>Last Updated:</strong> January 14, 2026<br />
            <strong>Version:</strong> 1.0<br />
            This policy may be updated periodically. Material changes will be noted at the top.
          </p>
        </article>
      </div>
    </AdFreeZone>
  );
}
