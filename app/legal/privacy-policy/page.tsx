import Link from 'next/link';
import '../../../styles/normalize.css';
import '../../../styles/legal.css';

export const metadata = {
  title: 'Privacy Policy - AllHalal (HalalScan)',
  description: 'AllHalal Privacy Policy - Learn how we collect, use, and protect your data in compliance with GDPR, CCPA, and ISO/IEC 27001 standards.',
};

export default function PrivacyPolicyPage() {
  return (
    <div className="legal-document">
      <nav className="legal-nav">
        <Link href="/legal">← Back to Legal</Link>
      </nav>
      
      <header className="legal-header">
        <h1>Privacy Policy</h1>
        <div className="legal-meta">
          <p><strong>Effective Date:</strong> November 8, 2025</p>
          <p><strong>Last Updated:</strong> November 8, 2025</p>
        </div>
      </header>
      
      <div className="legal-content">
        <p>
          <strong>HalalScan</strong> (&quot;AllHalal&quot;, &quot;we&quot;, &quot;us&quot;, &quot;our&quot;) is a mobile application that helps users identify halal, doubtful, and haram products, as well as boycott-related brands.
        </p>
        <p>
          We respect your privacy and process your data in compliance with global data-protection standards.
        </p>
        
        <h2>1. Data We Collect</h2>
        
        <ul>
          <li><strong>Location Data</strong> — to calculate prayer times and Qibla direction.</li>
          <li><strong>Camera Access</strong> — to scan barcodes for product evaluation.</li>
          <li><strong>Language and Country Settings</strong> — for localization and madhhab preferences.</li>
          <li><strong>Email (optional)</strong> — when registering through Firebase Auth.</li>
          <li><strong>Anonymous Analytics Data</strong> — collected via Firebase Analytics (device type, app version, language, session length).</li>
        </ul>
        
        <p>
          <strong>We do not collect</strong> financial, biometric, or sensitive personal information.
        </p>
        
        <h2>2. Purpose of Data Processing</h2>
        
        <p>Data is used solely to:</p>
        
        <ul>
          <li>display accurate halal ratings and boycott information;</li>
          <li>determine prayer times and Qibla direction;</li>
          <li>show daily hadiths and Islamic calendar events;</li>
          <li>improve app stability and user experience;</li>
          <li>deliver notifications (if enabled).</li>
        </ul>
        
        <p>
          We do not sell or share your personal data with third parties, except Firebase services essential to core functionality.
        </p>
        
        <h2>3. Third-Party Services</h2>
        
        <table>
          <thead>
            <tr>
              <th>Service</th>
              <th>Purpose</th>
              <th>Data Processed</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Firebase Authentication</td>
              <td>User login / account management</td>
              <td>Email, device ID</td>
            </tr>
            <tr>
              <td>Firebase Analytics</td>
              <td>Anonymous usage metrics</td>
              <td>Device and session data</td>
            </tr>
            <tr>
              <td>Firebase Firestore / Storage</td>
              <td>History / Favorites storage</td>
              <td>User UID</td>
            </tr>
            <tr>
              <td>Google Sign-In / Apple Sign-In</td>
              <td>Password-free login</td>
              <td>Public profile info</td>
            </tr>
          </tbody>
        </table>
        
        <p>
          All Firebase services comply with <strong>GDPR</strong>, <strong>CCPA</strong>, and <strong>ISO/IEC 27001</strong>.
        </p>
        
        <h2>4. Cookies & Analytics</h2>
        
        <p>
          We do not use cookies in the traditional sense.
        </p>
        
        <p>
          Firebase may collect anonymized technical identifiers for performance monitoring and crash reports.
        </p>
        
        <h2>5. Data Security</h2>
        
        <ul>
          <li>All communication is protected by <strong>HTTPS/TLS 1.2+</strong>.</li>
          <li>Data is encrypted at rest and in transit.</li>
          <li>Access is restricted to authorized Firebase services.</li>
        </ul>
        
        <h2>6. Data Retention & Deletion</h2>
        
        <p>
          Data is retained only as long as necessary for providing app features.
        </p>
        
        <p>
          Users may delete their accounts and related data via <strong>Account → Delete Account</strong> or by contacting <a href="mailto:info@gezellix.com">info@gezellix.com</a>.
        </p>
        
        <h2>7. User Rights</h2>
        
        <p>You have the right to:</p>
        
        <ul>
          <li>request a copy of your data;</li>
          <li>request correction or deletion;</li>
          <li>withdraw consent at any time;</li>
          <li>file a complaint with your local data-protection authority.</li>
        </ul>
        
        <h2>8. Policy Updates</h2>
        
        <p>
          We may update this Privacy Policy periodically.
        </p>
        
        <p>
          Any major changes will be communicated through the app.
        </p>
        
        <p>
          The latest version will always be available under <strong>Legal / Privacy Policy</strong>.
        </p>
        
        <h2>9. Contact</h2>
        
        <p>
          For privacy inquiries, please contact:
        </p>
        
        <p>
          📧 <strong>Email:</strong> <a href="mailto:app@allhalal.info">app@allhalal.info</a>
        </p>
        
        <hr />
        
        <p><em>This Privacy Policy complies with GDPR, CCPA, and ISO/IEC 27001 data protection standards.</em></p>
      </div>
    </div>
  );
}

