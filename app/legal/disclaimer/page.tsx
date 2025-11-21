import Link from 'next/link';
import '../../../styles/normalize.css';
import '../../../styles/legal.css';

export const metadata = {
  title: 'Disclaimer - AllHalal (HalalScan)',
  description: 'AllHalal Disclaimer - Important information about the limitations and proper use of the HalalScan application.',
};

export default function DisclaimerPage() {
  return (
    <div className="legal-document">
      <nav className="legal-nav">
        <Link href="/">← Back to AllHalal</Link>
      </nav>
      
      <header className="legal-header">
        <h1>Disclaimer</h1>
        <div className="legal-meta">
          <p><strong>Effective Date:</strong> November 8, 2025</p>
          <p><strong>Last Updated:</strong> November 8, 2025</p>
        </div>
      </header>
      
      <div className="legal-content">
        <h2>Important Notice</h2>
        
        <p>
          <strong>HalalScan</strong> (&quot;AllHalal&quot;, &quot;we&quot;, &quot;us&quot;, &quot;our&quot;) is a mobile application designed to assist users in making informed decisions about food products, cosmetics, and consumer brands. However, <strong>we are not a religious authority, Islamic scholar, or halal certification body.</strong>
        </p>
        
        <p>
          <strong>By using this App, you acknowledge and agree to the following disclaimers:</strong>
        </p>
        
        <h2>1. Not a Religious Authority</h2>
        
        <h3>1.1 Informational Tool Only</h3>
        
        <p>HalalScan provides <strong>educational and informational content</strong> based on:</p>
        
        <ul>
          <li>Publicly available ingredient databases (e.g., Open Food Facts).</li>
          <li>Algorithmic analysis of ingredient compositions.</li>
          <li>User-submitted product information.</li>
          <li>Published Islamic scholarly opinions and rulings.</li>
        </ul>
        
        <p>
          <strong>This information is NOT a fatwa, religious decree, or authoritative halal certification.</strong>
        </p>
        
        <h3>1.2 Consult Qualified Scholars</h3>
        
        <p><strong>We strongly recommend consulting with:</strong></p>
        
        <ul>
          <li>Local Islamic scholars or imams.</li>
          <li>Accredited halal certification organizations.</li>
          <li>Your mosque or Islamic community center.</li>
        </ul>
        
        <p>
          <strong>Different Islamic schools of thought (Hanafi, Shafi&apos;i, Maliki, Hanbali) may have varying rulings on specific ingredients.</strong>
        </p>
        
        <p>
          The App allows you to select a madhhab preference, but this is for informational guidance only.
        </p>
        
        <h2>2. No Guarantee of Accuracy</h2>
        
        <h3>2.1 Data Sources</h3>
        
        <p>Our halal/haram classifications are derived from:</p>
        
        <ul>
          <li><strong>Open Food Facts:</strong> A collaborative database maintained by volunteers.</li>
          <li><strong>User Submissions:</strong> Product information contributed by app users.</li>
          <li><strong>Algorithmic Analysis:</strong> Automated ingredient parsing and classification.</li>
          <li><strong>Third-Party APIs:</strong> External data providers.</li>
        </ul>
        
        <p>
          <strong>We do not independently verify every product.</strong> Ingredient formulations may change, suppliers may not disclose all components, and data sources may contain errors.
        </p>
        
        <h3>2.2 Dynamic Product Formulations</h3>
        
        <p>
          Manufacturers frequently change product formulations without updating packaging or public databases. A product classified as &quot;halal&quot; today may contain different ingredients tomorrow.
        </p>
        
        <p>
          <strong>Always check the physical product label before consumption.</strong>
        </p>
        
        <h2>3. Limitation of Liability</h2>
        
        <p>
          <strong>TO THE MAXIMUM EXTENT PERMITTED BY LAW, HALALSCAN IS NOT LIABLE FOR:</strong>
        </p>
        
        <ul>
          <li><strong>Incorrect classifications:</strong> We do not guarantee that all product classifications are accurate or complete.</li>
          <li><strong>Health consequences:</strong> Allergic reactions, adverse health effects, or dietary violations resulting from product consumption.</li>
          <li><strong>Religious consequences:</strong> Unintentional consumption of haram ingredients due to reliance on the App.</li>
          <li><strong>Boycott information:</strong> We do not verify the accuracy of boycott campaigns or corporate affiliations.</li>
          <li><strong>Third-party data:</strong> Errors in databases like Open Food Facts or user-submitted content.</li>
        </ul>
        
        <p>
          <strong>USE THIS APP AT YOUR OWN RISK.</strong>
        </p>
        
        <h2>4. User Responsibility</h2>
        
        <p>
          <strong>It is YOUR responsibility to:</strong>
        </p>
        
        <ul>
          <li>Verify product ingredients by reading the physical label.</li>
          <li>Consult with qualified Islamic scholars for religious guidance.</li>
          <li>Check for allergens and health-related warnings.</li>
          <li>Research halal certification standards in your region.</li>
          <li>Use the App as a supplementary tool, not a sole decision-maker.</li>
        </ul>
        
        <h2>5. No Medical or Legal Advice</h2>
        
        <p>
          HalalScan does not provide medical, legal, or professional advice. The App is not a substitute for:
        </p>
        
        <ul>
          <li>Professional dietary or nutritional counseling.</li>
          <li>Allergy testing or medical diagnosis.</li>
          <li>Legal consultation regarding food regulations or consumer rights.</li>
        </ul>
        
        <h2>6. Third-Party Content</h2>
        
        <p>
          The App may contain links to third-party websites, databases, or content. We do not endorse, verify, or assume responsibility for any third-party information.
        </p>
        
        <h2>7. Changes to This Disclaimer</h2>
        
        <p>
          We reserve the right to update this Disclaimer at any time. Changes will be posted in the App with a new &quot;Last Updated&quot; date.
        </p>
        
        <h2>8. Contact Us</h2>
        
        <p>
          If you have questions about this Disclaimer:
        </p>
        
        <p>
          <strong>Email:</strong> <a href="mailto:contact@allhalal.info">contact@allhalal.info</a><br />
          <strong>Developer:</strong> Adelya Nurusheva<br />
          <strong>App Store:</strong> <a href="https://apps.apple.com/app/allhalal" target="_blank" rel="noopener noreferrer">AllHalal on App Store</a>
        </p>
        
        <hr />
        
        <p><strong>By using HalalScan, you acknowledge that you have read, understood, and agree to this Disclaimer.</strong></p>
        
        <p><em>This Disclaimer is designed to comply with consumer protection laws and religious transparency standards.</em></p>
      </div>
    </div>
  );
}

