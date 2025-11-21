import Link from 'next/link';
import '../../../styles/normalize.css';
import '../../../styles/legal.css';

export const metadata = {
  title: 'Terms of Service - AllHalal (HalalScan)',
  description: 'AllHalal Terms of Service - Read our terms and conditions for using the HalalScan mobile application.',
};

export default function TermsOfServicePage() {
  return (
    <div className="legal-document">
      <nav className="legal-nav">
        <Link href="/">← Back to AllHalal</Link>
      </nav>
      
      <header className="legal-header">
        <h1>Terms of Service</h1>
        <div className="legal-meta">
          <p><strong>Effective Date:</strong> November 8, 2025</p>
          <p><strong>Last Updated:</strong> November 8, 2025</p>
        </div>
      </header>
      
      <div className="legal-content">
        <p>
          Welcome to <strong>HalalScan</strong> (&quot;AllHalal&quot;, &quot;we&quot;, &quot;us&quot;, &quot;our&quot;). By downloading, installing, or using our mobile application, you agree to be bound by these Terms of Service (&quot;Terms&quot;).
        </p>
        <p>
          <strong>If you do not agree to these Terms, do not use the App.</strong>
        </p>
        
        <h2>1. Acceptance of Terms</h2>
        
        <p>By accessing or using HalalScan, you confirm that:</p>
        
        <ul>
          <li>You are at least 13 years old (or the minimum age required in your country).</li>
          <li>You have the legal capacity to enter into a binding agreement.</li>
          <li>You will use the App in compliance with all applicable laws and regulations.</li>
        </ul>
        
        <h2>2. Description of Service</h2>
        
        <p>HalalScan provides:</p>
        
        <ul>
          <li><strong>Barcode Scanning:</strong> Analyze product ingredients to determine halal, mushbooh (doubtful), or haram status.</li>
          <li><strong>Boycott Database:</strong> Information about brands subject to consumer boycotts.</li>
          <li><strong>Islamic Features:</strong> Prayer times, Qibla direction, daily hadiths, and Islamic calendar.</li>
          <li><strong>User Account:</strong> Optional registration via Firebase Authentication (Google Sign-In, Email, or Anonymous).</li>
        </ul>
        
        <p>
          <strong>Important:</strong> The App is a tool for informational purposes only and does not replace consultation with qualified Islamic scholars or religious authorities.
        </p>
        
        <h2>3. Acceptable Use</h2>
        
        <p>You agree <strong>NOT</strong> to:</p>
        
        <ul>
          <li>Use the App for any unlawful, fraudulent, or harmful purpose.</li>
          <li>Attempt to reverse-engineer, decompile, or extract source code from the App.</li>
          <li>Submit false, misleading, or offensive product information.</li>
          <li>Abuse the &quot;Add Product&quot; feature with spam or malicious content.</li>
          <li>Bypass or disable any security features or access controls.</li>
          <li>Use automated tools (bots, scrapers) to extract data from the App.</li>
        </ul>
        
        <p>
          <strong>Violation of these terms may result in account suspension or termination without notice.</strong>
        </p>
        
        <h2>4. Accuracy of Information</h2>
        
        <h3>4.1 Halal/Haram Classification</h3>
        
        <ul>
          <li>Product classifications are based on publicly available data sources (Open Food Facts, user submissions, proprietary analysis).</li>
          <li><strong>We do not guarantee 100% accuracy.</strong> Ingredient formulations may change, and suppliers may not disclose all components.</li>
          <li>Different Islamic schools of thought (madhhabs) may have different rulings on certain ingredients.</li>
        </ul>
        
        <p>
          <strong>You are solely responsible for verifying product suitability before consumption.</strong>
        </p>
        
        <h2>5. Intellectual Property</h2>
        
        <p>
          All content, design, logos, and trademarks in the App are owned by HalalScan or licensed to us. You may not copy, reproduce, or distribute any App content without our written permission.
        </p>
        
        <h2>6. Limitation of Liability</h2>
        
        <p>
          <strong>TO THE MAXIMUM EXTENT PERMITTED BY LAW:</strong>
        </p>
        
        <ul>
          <li>The App is provided &quot;AS IS&quot; and &quot;AS AVAILABLE&quot; without warranties of any kind.</li>
          <li>We are not liable for any damages arising from your use of the App, including but not limited to: incorrect product classifications, allergic reactions, religious non-compliance, or data loss.</li>
          <li>We do not guarantee uninterrupted or error-free operation of the App.</li>
        </ul>
        
        <h2>7. Indemnification</h2>
        
        <p>
          You agree to indemnify and hold harmless HalalScan, its developers, and affiliates from any claims, damages, or expenses arising from your misuse of the App or violation of these Terms.
        </p>
        
        <h2>8. Termination</h2>
        
        <p>We reserve the right to:</p>
        
        <ul>
          <li>Suspend or terminate your account at any time for violation of these Terms.</li>
          <li>Discontinue the App or any feature without notice.</li>
        </ul>
        
        <p>
          You may delete your account at any time via the App settings.
        </p>
        
        <h2>9. Changes to Terms</h2>
        
        <p>
          We may update these Terms from time to time. Continued use of the App after changes are posted constitutes acceptance of the new Terms.
        </p>
        
        <h2>10. Governing Law</h2>
        
        <p>
          These Terms are governed by the laws of the European Union and the jurisdiction where the App is operated, without regard to conflict of law principles.
        </p>
        
        <h2>11. Contact Us</h2>
        
        <p>
          For questions about these Terms:
        </p>
        
        <p>
          <strong>Email:</strong> <a href="mailto:contact@allhalal.info">contact@allhalal.info</a><br />
          <strong>Developer:</strong> Adelya Nurusheva<br />
          <strong>App Store:</strong> <a href="https://apps.apple.com/app/allhalal" target="_blank" rel="noopener noreferrer">AllHalal on App Store</a>
        </p>
        
        <hr />
        
        <p><em>By using HalalScan, you acknowledge that you have read, understood, and agree to be bound by these Terms of Service.</em></p>
      </div>
    </div>
  );
}

