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
        <h2>⚠️ CRITICAL LEGAL NOTICE ⚠️</h2>
        
        <p>
          <strong>READ THIS DISCLAIMER CAREFULLY BEFORE USING THE APP.</strong>
        </p>
        
        <p>
          <strong>HalalScan</strong> (&quot;AllHalal&quot;, &quot;the App&quot;, &quot;we&quot;, &quot;us&quot;, &quot;our&quot;) is a mobile application that provides <strong>INFORMATIONAL CONTENT ONLY</strong>. We are <strong>NOT</strong>:
        </p>
        
        <ul>
          <li>A religious authority or Islamic scholarly institution</li>
          <li>A halal certification body or accreditation organization</li>
          <li>A medical, dietary, or nutritional advisory service</li>
          <li>A legal, financial, or professional consulting firm</li>
          <li>Responsible for verifying the accuracy of product formulations</li>
          <li>Liable for any consequences arising from your use of the App</li>
        </ul>
        
        <p>
          <strong>BY USING THIS APP, YOU EXPRESSLY ACKNOWLEDGE, UNDERSTAND, AND AGREE TO ALL DISCLAIMERS, LIMITATIONS, AND WARNINGS CONTAINED IN THIS DOCUMENT. IF YOU DO NOT AGREE, CEASE ALL USE IMMEDIATELY.</strong>
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
          <strong>Manufacturers may change product ingredients without notice.</strong>
        </p>
        
        <p>
          Even if a product was previously classified as halal, <strong>the formula may have been updated</strong>. Always check the product label before consumption.
        </p>
        
        <h3>2.3 Regional Variations</h3>
        
        <p>
          Products with the same name may have <strong>different formulations in different countries</strong>.
        </p>
        
        <p>
          Example: A product classified as halal in Europe may contain haram ingredients in the United States.
        </p>
        
        <p>
          <strong>Always verify the product in your local market.</strong>
        </p>
        
        <h2>3. Limitation of Liability for Religious Decisions</h2>
        
        <h3>3.1 Personal Responsibility</h3>
        
        <p>
          <strong>You are solely responsible for determining whether a product is suitable for consumption according to your religious beliefs.</strong>
        </p>
        
        <p>
          We provide information to assist your decision-making, but <strong>the final determination is yours</strong>.
        </p>
        
        <h3>3.2 Complete Waiver of Liability for Religious Consequences</h3>
        
        <p>
          <strong>TO THE FULLEST EXTENT PERMITTED BY LAW, WE EXPRESSLY DISCLAIM ALL LIABILITY FOR:</strong>
        </p>
        
        <ul>
          <li><strong>Religious, spiritual, or moral harm</strong> of any kind arising from your use of or reliance on App information.</li>
          <li><strong>Inadvertent consumption</strong> of haram, mushbooh (doubtful), or makruh (disliked) ingredients or products.</li>
          <li><strong>Differences in religious interpretation</strong> between Islamic schools of thought (Hanafi, Shafi&apos;i, Maliki, Hanbali, Ja&apos;fari, or any other).</li>
          <li><strong>Violations of dietary restrictions</strong>, religious vows, or personal commitments.</li>
          <li><strong>Consequences in this life or the hereafter</strong> related to your consumption choices.</li>
          <li><strong>Emotional distress, guilt, or anxiety</strong> resulting from discovering past consumption of questionable products.</li>
          <li><strong>Conflicts with local fatwas or rulings</strong> issued by Islamic authorities in your region.</li>
          <li><strong>Religious liability (dhulm) or accountability (hisaab)</strong> before Allah (SWT) for any actions based on App information.</li>
        </ul>
        
        <p>
          <strong>YOU BEAR SOLE AND EXCLUSIVE RESPONSIBILITY FOR ALL RELIGIOUS DECISIONS.</strong> Use the App only as one of many tools in your decision-making process. Always consult qualified Islamic scholars and verify product information independently.
        </p>
        
        <p>
          <strong>WE MAKE NO REPRESENTATIONS OR WARRANTIES THAT APP INFORMATION COMPLIES WITH ISLAMIC LAW (SHARIAH) OR SATISFIES YOUR RELIGIOUS OBLIGATIONS.</strong>
        </p>
        
        <h2>4. Boycott Information</h2>
        
        <h3>4.1 Public Source Data</h3>
        
        <p>Boycott information is compiled from:</p>
        
        <ul>
          <li>Publicly available lists published by advocacy organizations.</li>
          <li>User reports and community contributions.</li>
          <li>News articles and investigative reports.</li>
        </ul>
        
        <p>
          <strong>We do not independently verify ownership structures or brand affiliations.</strong>
        </p>
        
        <h3>4.2 No Endorsement of Boycotts</h3>
        
        <p>
          <strong>We do not endorse, promote, or advocate for any boycott campaigns.</strong>
        </p>
        
        <p>
          The feature is provided for <strong>informational purposes only</strong> to help users make informed purchasing decisions.
        </p>
        
        <h3>4.3 Brand Ownership Changes</h3>
        
        <p>
          <strong>Company ownership structures change frequently.</strong> A brand listed as boycotted may have been acquired by a different parent company since our last update.
        </p>
        
        <p>
          <strong>Always verify current ownership through independent research if accuracy is critical.</strong>
        </p>
        
        <h2>5. E-Numbers and Food Additives</h2>
        
        <h3>5.1 Complex Classification</h3>
        
        <p>
          Many E-numbers (food additives) can be derived from:
        </p>
        
        <ul>
          <li><strong>Plant sources</strong> (halal).</li>
          <li><strong>Animal sources</strong> (haram if from pork or non-halal slaughtered animals).</li>
          <li><strong>Synthetic/chemical sources</strong> (generally halal).</li>
        </ul>
        
        <p>
          <strong>The source of an E-number often cannot be determined from the product label alone.</strong>
        </p>
        
        <p>
          We classify E-numbers based on:
        </p>
        
        <ul>
          <li>Most common production methods.</li>
          <li>General scholarly consensus (e.g., European Council for Fatwa and Research).</li>
        </ul>
        
        <p>
          <strong>If an ingredient is critical to your dietary restrictions, contact the manufacturer directly.</strong>
        </p>
        
        <h2>6. Prayer Times & Qibla Direction</h2>
        
        <h3>6.1 Calculated Estimates</h3>
        
        <p>
          Prayer times are <strong>calculated</strong> based on:
        </p>
        
        <ul>
          <li>Your device&apos;s GPS location.</li>
          <li>Selected calculation method (e.g., Muslim World League, ISNA, Umm al-Qura).</li>
          <li>Juristic method for Asr time (Standard vs. Hanafi).</li>
        </ul>
        
        <p>
          <strong>These are estimates, not authoritative prayer schedules.</strong>
        </p>
        
        <h3>6.2 Local Adjustments</h3>
        
        <p>
          <strong>Always verify with:</strong>
        </p>
        
        <ul>
          <li>Your local mosque&apos;s timetable.</li>
          <li>Islamic centers in your area.</li>
          <li>Regional authorities (e.g., Diyanet in Turkey, UOIF in France).</li>
        </ul>
        
        <p>
          <strong>Atmospheric conditions, altitude, and local tradition may require adjustments.</strong>
        </p>
        
        <h3>6.3 Qibla Accuracy</h3>
        
        <p>
          Qibla direction depends on:
        </p>
        
        <ul>
          <li>Device compass accuracy.</li>
          <li>GPS precision.</li>
          <li>Magnetic field interference (e.g., metal structures, electronic devices).</li>
        </ul>
        
        <p>
          <strong>Calibrate your device compass before use. For precise Qibla, use a surveyed mosque as reference.</strong>
        </p>
        
        <h2>7. No Medical or Health Advice</h2>
        
        <h3>7.1 Allergen Information</h3>
        
        <p>
          While we display allergen information (e.g., gluten, dairy, nuts), <strong>this is not medical advice</strong>.
        </p>
        
        <p>
          <strong>If you have severe allergies or dietary restrictions:</strong>
        </p>
        
        <ul>
          <li>Always read the product label.</li>
          <li>Contact the manufacturer to verify ingredient sourcing.</li>
          <li>Consult with a medical professional.</li>
        </ul>
        
        <h3>7.2 Nutritional Information</h3>
        
        <p>
          Nutri-Score and nutritional data are provided for informational purposes.
        </p>
        
        <p>
          <strong>This is not dietary, medical, or health advice.</strong> Consult a licensed nutritionist or doctor for personalized guidance.
        </p>
        
        <h2>8. Third-Party Services</h2>
        
        <p>
          The App integrates with:
        </p>
        
        <ul>
          <li><strong>Firebase Authentication</strong> (Google LLC) — for user accounts.</li>
          <li><strong>Firebase Analytics</strong> (Google LLC) — for usage statistics.</li>
          <li><strong>Open Food Facts</strong> — for product data.</li>
        </ul>
        
        <p>
          <strong>We are not responsible for:</strong>
        </p>
        
        <ul>
          <li>Accuracy or availability of third-party services.</li>
          <li>Data breaches or security incidents at third-party providers.</li>
          <li>Changes to third-party terms or APIs.</li>
        </ul>
        
        <p>
          Refer to our <strong><Link href="/legal/privacy-policy">Privacy Policy</Link></strong> for details on data sharing.
        </p>
        
        <h2>9. User-Generated Content</h2>
        
        <h3>9.1 Community Contributions</h3>
        
        <p>
          Users may submit product information, corrections, and reviews.
        </p>
        
        <p>
          <strong>We do not guarantee the accuracy of user-generated content.</strong>
        </p>
        
        <p>
          All submissions are subject to moderation, but we cannot verify every detail.
        </p>
        
        <h3>9.2 Report Inaccuracies</h3>
        
        <p>
          If you find incorrect information, please report it via:
        </p>
        
        <p>
          📧 <a href="mailto:info@gezellix.com">info@gezellix.com</a>
        </p>
        
        <p>
          We will investigate and update our database as appropriate.
        </p>
        
        <h2>10. No Warranty</h2>
        
        <p>
          <strong>THE APP IS PROVIDED &quot;AS IS&quot; AND &quot;AS AVAILABLE&quot; WITHOUT WARRANTY OF ANY KIND.</strong>
        </p>
        
        <p>
          We do not warrant that:
        </p>
        
        <ul>
          <li>The App will be error-free or uninterrupted.</li>
          <li>Data will be accurate, complete, or up-to-date.</li>
          <li>The App will meet your specific religious or dietary requirements.</li>
        </ul>
        
        <p>
          <strong>USE AT YOUR OWN RISK AND DISCRETION.</strong>
        </p>
        
        <h2>11. Changes to This Disclaimer</h2>
        
        <p>
          We may update this Disclaimer periodically to reflect:
        </p>
        
        <ul>
          <li>Changes in data sources or methodology.</li>
          <li>New features or functionality.</li>
          <li>Legal or regulatory requirements.</li>
        </ul>
        
        <p>
          <strong>Material changes will be communicated via in-app notification.</strong>
        </p>
        
        <p>
          The latest version is always available at <strong>Settings → Legal → Disclaimer</strong>.
        </p>
        
        <h2>12. Assumption of Risk</h2>
        
        <p>
          <strong>YOU EXPRESSLY ASSUME ALL RISKS ASSOCIATED WITH USING THE APP.</strong> These risks include, but are not limited to:
        </p>
        
        <ul>
          <li>Incorrect or outdated product information</li>
          <li>Religious non-compliance or dietary violations</li>
          <li>Allergic reactions or health consequences</li>
          <li>Financial losses from purchasing unsuitable products</li>
          <li>Emotional or psychological distress</li>
          <li>Technical errors, bugs, or data corruption</li>
          <li>Unauthorized access to your device or data</li>
          <li>Reliance on user-generated content</li>
        </ul>
        
        <p>
          <strong>BY USING THE APP, YOU VOLUNTARILY ASSUME THESE RISKS AND WAIVE ANY RIGHT TO HOLD US LIABLE.</strong>
        </p>
        
        <h2>13. Contact Information</h2>
        
        <p>
          For questions, corrections, or concerns:
        </p>
        
        <p>
          📧 <strong>Email:</strong> <a href="mailto:app@allhalal.info">app@allhalal.info</a>
        </p>
        
        <p>
          <strong>Please note:</strong> Contacting us does not create any legal relationship, obligation, or liability on our part. We reserve the right to respond or not respond to inquiries at our sole discretion.
        </p>
        
        <h2>14. Final Acknowledgment and Binding Agreement</h2>
        
        <p>
          By using HalalScan, you acknowledge that:
        </p>
        
        <p>
          ✅ You have read and understood this Disclaimer.<br />
          ✅ You will not rely solely on the App for religious or dietary decisions.<br />
          ✅ You will verify critical information through authoritative sources.<br />
          ✅ You accept the limitations and risks associated with using the App.
        </p>
        
        <p>
          <strong>JazakAllahu Khairan (May Allah reward you) for using HalalScan responsibly!</strong>
        </p>
        
        <hr />
        
        <p><strong>By using HalalScan, you acknowledge that you have read, understood, and agree to this Disclaimer.</strong></p>
        
        <p><em>This Disclaimer is designed to comply with consumer protection laws and religious transparency standards.</em></p>
      </div>
    </div>
  );
}
