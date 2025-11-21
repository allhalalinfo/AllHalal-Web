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
        <Link href="/">← Back to AllHalal</Link>
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
              <td>Open Food Facts API</td>
              <td>Product database</td>
              <td>Barcode queries (no personal data)</td>
            </tr>
          </tbody>
        </table>
        
        <h2>4. Data Retention</h2>
        
        <ul>
          <li><strong>User Account Data:</strong> Retained until account deletion.</li>
          <li><strong>Analytics Data:</strong> Retained for 14 months (Firebase default).</li>
          <li><strong>Location Data:</strong> Not stored on servers; processed locally on device.</li>
        </ul>
        
        <h2>5. Your Rights (GDPR / CCPA)</h2>
        
        <p>You have the right to:</p>
        
        <ul>
          <li><strong>Access</strong> your personal data.</li>
          <li><strong>Rectify</strong> inaccurate information.</li>
          <li><strong>Delete</strong> your account and associated data.</li>
          <li><strong>Opt-out</strong> of analytics tracking.</li>
          <li><strong>Data portability:</strong> request a copy of your data.</li>
        </ul>
        
        <p>
          To exercise these rights, contact us at: <a href="mailto:contact@allhalal.info">contact@allhalal.info</a>
        </p>
        
        <h2>6. Data Security</h2>
        
        <p>We implement industry-standard security measures:</p>
        
        <ul>
          <li><strong>Encryption:</strong> Data transmitted via HTTPS/TLS.</li>
          <li><strong>Firebase Security Rules:</strong> Restrict unauthorized access to Firestore and Storage.</li>
          <li><strong>Regular Audits:</strong> Ongoing security assessments and updates.</li>
        </ul>
        
        <p>
          <strong>No system is 100% secure.</strong> We cannot guarantee absolute security, but we take all reasonable precautions.
        </p>
        
        <h2>7. Children&apos;s Privacy</h2>
        
        <p>
          HalalScan is not intended for children under 13 years old (or equivalent minimum age in your jurisdiction). We do not knowingly collect data from children.
        </p>
        
        <h2>8. International Data Transfers</h2>
        
        <p>
          Data is processed via Firebase servers, which may be located outside your country. Firebase complies with GDPR and CCPA standards.
        </p>
        
        <h2>9. Changes to This Policy</h2>
        
        <p>
          We may update this Privacy Policy from time to time. Changes will be posted in the App with a new &quot;Last Updated&quot; date.
        </p>
        
        <h2>10. Contact Us</h2>
        
        <p>
          For privacy-related inquiries or data requests:
        </p>
        
        <p>
          <strong>Email:</strong> <a href="mailto:contact@allhalal.info">contact@allhalal.info</a><br />
          <strong>Developer:</strong> Adelya Nurusheva<br />
          <strong>App Store:</strong> <a href="https://apps.apple.com/app/allhalal" target="_blank" rel="noopener noreferrer">AllHalal on App Store</a>
        </p>
        
        <hr />
        
        <p><em>This Privacy Policy complies with GDPR, CCPA, and ISO/IEC 27001 data protection standards.</em></p>
      </div>
    </div>
  );
}

