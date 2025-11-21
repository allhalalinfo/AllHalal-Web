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
        
        <h3>4.2 Boycott Information</h3>
        
        <ul>
          <li>Boycott data is compiled from publicly available sources and user reports.</li>
          <li>Brand ownership structures change frequently; we update our database regularly but cannot guarantee real-time accuracy.</li>
          <li><strong>We do not endorse or promote boycotts.</strong> The feature is provided for informational purposes.</li>
        </ul>
        
        <h3>4.3 Prayer Times & Qibla</h3>
        
        <ul>
          <li>Prayer times are calculated based on your device location and selected calculation method.</li>
          <li>Accuracy depends on GPS precision and local atmospheric conditions.</li>
          <li><strong>Always verify with local mosques or Islamic centers for authoritative prayer schedules.</strong></li>
        </ul>
        
        <h2>5. User-Generated Content</h2>
        
        <h3>5.1 Product Submissions</h3>
        
        <p>When you submit product information through the &quot;Add Product&quot; feature:</p>
        
        <ul>
          <li>You grant us a <strong>non-exclusive, worldwide, royalty-free license</strong> to use, display, and distribute the information.</li>
          <li>You represent that the information is accurate to the best of your knowledge.</li>
          <li>We reserve the right to <strong>review, edit, or reject</strong> submissions without explanation.</li>
        </ul>
        
        <h3>5.2 Content Moderation</h3>
        
        <p>We reserve the right to remove any user-generated content that:</p>
        
        <ul>
          <li>Violates these Terms or applicable laws.</li>
          <li>Contains hate speech, harassment, or offensive material.</li>
          <li>Infringes on intellectual property rights.</li>
          <li>Is spam, advertising, or commercial solicitation.</li>
        </ul>
        
        <h2>6. Intellectual Property</h2>
        
        <h3>6.1 Ownership</h3>
        
        <p>
          All content, features, and functionality of the App (including text, graphics, logos, code, and databases) are owned by <strong>AllHalal</strong> or licensed to us.
        </p>
        
        <p>
          You are granted a <strong>limited, non-exclusive, non-transferable license</strong> to use the App for personal, non-commercial purposes.
        </p>
        
        <h3>6.2 Third-Party Data</h3>
        
        <p>
          Some product data is sourced from <strong>Open Food Facts</strong> (licensed under ODbL) and other public databases. We comply with all applicable attribution requirements.
        </p>
        
        <h2>7. Privacy & Data Protection</h2>
        
        <p>
          Your use of the App is governed by our <strong><Link href="/legal/privacy-policy">Privacy Policy</Link></strong>, which explains:
        </p>
        
        <ul>
          <li>What data we collect (location, camera access, email, analytics).</li>
          <li>How we use and protect your data.</li>
          <li>Your rights under GDPR, CCPA, and other data protection laws.</li>
        </ul>
        
        <p>
          <strong>By using the App, you consent to our data practices as described in the Privacy Policy.</strong>
        </p>
        
        <h2>8. Account & Authentication</h2>
        
        <h3>8.1 Account Creation</h3>
        
        <p>You may create an account using:</p>
        
        <ul>
          <li><strong>Google Sign-In</strong> (Google LLC)</li>
          <li><strong>Apple Sign-In</strong> (Apple Inc.)</li>
          <li><strong>Email/Password</strong> (Firebase Authentication)</li>
          <li><strong>Guest Mode</strong> (anonymous, local-only storage)</li>
        </ul>
        
        <p>
          You are responsible for maintaining the confidentiality of your login credentials.
        </p>
        
        <h3>8.2 Account Termination</h3>
        
        <p>
          You may delete your account at any time via <strong>Settings → Account → Delete Account</strong>.
        </p>
        
        <p>We may suspend or terminate your account if:</p>
        
        <ul>
          <li>You violate these Terms.</li>
          <li>We detect fraudulent or abusive activity.</li>
          <li>Required by law or regulatory authority.</li>
        </ul>
        
        <h2>9. Disclaimer of Warranties</h2>
        
        <p>
          <strong>THE APP IS PROVIDED &quot;AS IS&quot; AND &quot;AS AVAILABLE&quot; WITHOUT WARRANTIES OF ANY KIND.</strong>
        </p>
        
        <p>We disclaim all warranties, express or implied, including:</p>
        
        <ul>
          <li><strong>Merchantability:</strong> Fitness for a particular purpose.</li>
          <li><strong>Accuracy:</strong> Completeness or reliability of information.</li>
          <li><strong>Availability:</strong> Uninterrupted or error-free operation.</li>
          <li><strong>Security:</strong> Freedom from viruses, malware, or unauthorized access.</li>
        </ul>
        
        <p><strong>USE AT YOUR OWN RISK.</strong></p>
        
        <h2>10. Limitation of Liability</h2>
        
        <p>
          <strong>TO THE MAXIMUM EXTENT PERMITTED BY LAW:</strong>
        </p>
        
        <p>We (and our affiliates, partners, and service providers) shall not be liable for:</p>
        
        <ul>
          <li><strong>Indirect, incidental, consequential, or punitive damages</strong> arising from your use of the App.</li>
          <li><strong>Religious, dietary, health, or financial harm</strong> resulting from reliance on App information.</li>
          <li><strong>Data loss, business interruption, or lost profits.</strong></li>
          <li><strong>Third-party actions</strong> (e.g., Firebase, Google, Apple).</li>
        </ul>
        
        <p>
          <strong>TOTAL LIABILITY SHALL NOT EXCEED $50 USD OR THE AMOUNT YOU PAID FOR THE APP (WHICHEVER IS GREATER).</strong>
        </p>
        
        <h2>11. Indemnification</h2>
        
        <p>
          You agree to <strong>indemnify, defend, and hold harmless</strong> AllHalal, its officers, employees, and partners from any claims, damages, or expenses (including legal fees) arising from:
        </p>
        
        <ul>
          <li>Your violation of these Terms.</li>
          <li>Your misuse of the App.</li>
          <li>Your submission of inaccurate or unlawful content.</li>
          <li>Infringement of third-party rights.</li>
        </ul>
        
        <h2>12. Changes to Terms</h2>
        
        <p>
          We may update these Terms at any time. Material changes will be communicated via:
        </p>
        
        <ul>
          <li>In-app notification.</li>
          <li>Email (if you have an account).</li>
          <li>Updated &quot;Last Modified&quot; date above.</li>
        </ul>
        
        <p>
          <strong>Continued use of the App after changes constitutes acceptance of the new Terms.</strong>
        </p>
        
        <h2>13. Governing Law & Dispute Resolution</h2>
        
        <p>
          These Terms are governed by the laws of the European Union and applicable local jurisdictions.
        </p>
        
        <p>
          <strong>Disputes shall be resolved through:</strong>
        </p>
        
        <ol>
          <li><strong>Informal Negotiation:</strong> Contact us at <a href="mailto:info@gezellix.com">info@gezellix.com</a> within 30 days.</li>
          <li><strong>Binding Arbitration:</strong> If negotiation fails, disputes will be resolved via arbitration.</li>
        </ol>
        
        <p>
          <strong>YOU WAIVE THE RIGHT TO PARTICIPATE IN CLASS-ACTION LAWSUITS.</strong>
        </p>
        
        <h2>14. Severability</h2>
        
        <p>
          If any provision of these Terms is found invalid or unenforceable, the remaining provisions shall continue in full force and effect.
        </p>
        
        <h2>15. Contact Information</h2>
        
        <p>
          For questions about these Terms, contact:
        </p>
        
        <p>
          📧 <strong>Email:</strong> <a href="mailto:info@gezellix.com">info@gezellix.com</a><br />
          <strong>Business Address:</strong> gezellix.com
        </p>
        
        <h2>16. Acknowledgment</h2>
        
        <p>
          By using HalalScan, you acknowledge that:
        </p>
        
        <ul>
          <li>You have read and understood these Terms.</li>
          <li>You agree to be bound by them.</li>
          <li>The App is a tool for informational purposes and does not replace professional religious guidance.</li>
        </ul>
        
        <p><strong>Thank you for using HalalScan!</strong></p>
        
        <hr />
        
        <p><em>By using HalalScan, you acknowledge that you have read, understood, and agree to be bound by these Terms of Service.</em></p>
      </div>
    </div>
  );
}
