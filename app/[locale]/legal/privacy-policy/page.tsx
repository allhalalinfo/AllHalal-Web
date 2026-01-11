"use client";

/**
 * ═══════════════════════════════════════════════════════════════════════════════
 * PRIVACY POLICY PAGE
 * ═══════════════════════════════════════════════════════════════════════════════
 * 
 * Clean, readable privacy policy with proper typography.
 * 
 * ═══════════════════════════════════════════════════════════════════════════════
 */

import { motion } from "framer-motion";
import Link from "next/link";
import { useTranslations } from "next-intl";

export default function PrivacyPolicyPage() {
  const t = useTranslations("legal");
  return (
    <motion.article
      className="prose"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      {/* Back link */}
      <Link 
        href="/legal" 
        className="inline-flex items-center gap-2 text-sm text-text-muted hover:text-primary transition-colors mb-8 no-underline"
      >
        <ArrowLeftIcon className="w-4 h-4" />
        {t("backToLegal")}
      </Link>

      {/* Header */}
      <div className="mb-12">
        <p className="text-sm text-primary font-medium uppercase tracking-wider mb-2">
          {t("common.lastUpdated", { date: "December 17, 2025" })}
        </p>
        <h1>{t("documents.privacyPolicy.title")}</h1>
        <p className="text-xl text-text-secondary leading-relaxed">
          {t("documents.privacyPolicy.intro")}
        </p>
        <p className="text-sm text-text-muted mt-4">
          <strong>Contact:</strong> <a href="mailto:app@allhalal.info">app@allhalal.info</a> | 
          <strong> Website:</strong> <a href="https://www.allhalal.info">allhalal.info</a>
        </p>
      </div>

      {/* Content */}
      <h2>1. Information We Collect</h2>
      <p>
        AllHalal collects information to provide and improve our services. 
        The types of information we collect include:
      </p>

      <h3>1.1 Device ID (for Advertising & Tracking)</h3>
      <p>
        We collect device identifiers (IDFA/Advertising ID) for advertising and tracking 
        purposes when you use the free version of our app. This data is used by Google AdMob 
        to show personalized advertisements and measure ad performance.
      </p>
      <p>
        <strong>What is collected:</strong>
      </p>
      <ul>
        <li>Device identifiers (IDFA/Advertising ID)</li>
        <li>Usage data (app interactions for ad personalization)</li>
        <li>Device information (OS version, device model)</li>
      </ul>
      <p>
        <strong>Purpose:</strong>
      </p>
      <ul>
        <li>Display personalized advertisements via Google AdMob</li>
        <li>Measure ad performance and effectiveness</li>
        <li>Track user engagement with ads</li>
      </ul>
      <p>
        <strong>Tracking:</strong> This data <strong>IS used for tracking purposes</strong> 
        across apps and websites owned by other companies (via Google AdMob's advertising network). 
        This data is <strong>NOT linked to your identity</strong> but is used for ad targeting.
      </p>
      <p>
        <strong>Your control:</strong>
      </p>
      <ul>
        <li>
          <strong>Opt out of tracking:</strong> iOS Settings → Privacy & Security → Tracking → 
          AllHalal → OFF (or decline when prompted)
        </li>
        <li>
          <strong>Remove ads completely:</strong> Upgrade to Premium subscription (removes all 
          ads and AdMob tracking)
        </li>
      </ul>
      <p>
        <strong>Important:</strong> Premium subscription removes all advertisements and 
        eliminates AdMob tracking entirely.
      </p>

      <h3>1.2 Product Interaction (Scan History)</h3>
      <p>
        We collect information about products you scan, including:
      </p>
      <ul>
        <li>Barcode numbers</li>
        <li>Product names</li>
        <li>Scan timestamps</li>
        <li>Verification results</li>
      </ul>
      <p>
        <strong>Purpose:</strong> App functionality and analytics to improve our service.
      </p>
      <p>
        <strong>Storage:</strong> This data is stored locally on your device using iOS Keychain 
        and is <strong>NOT linked to your identity</strong> unless you have an account.
      </p>
      <p>
        <strong>Retention:</strong> Scan history is retained for 12 months (default), then 
        automatically deleted. You can manually delete your scan history at any time in 
        Settings → Privacy & Data.
      </p>

      <h3>1.3 Coarse Location (Prayer Times)</h3>
      <p>
        With your permission, we collect coarse location data (city-level accuracy) to:
      </p>
      <ul>
        <li>Calculate accurate prayer times for your location</li>
        <li>Provide Qibla direction</li>
      </ul>
      <p>
        <strong>Important:</strong> This data is <strong>NOT stored permanently</strong> and 
        is <strong>NOT linked to your identity</strong>. We only use your location when the 
        app is actively calculating prayer times.
      </p>
      <p>
        <strong>Your control:</strong> You can deny location access in iOS Settings → Privacy → 
        Location Services → AllHalal. The app will still function, but prayer times will be 
        less accurate.
      </p>

      <h3>1.4 User ID (Optional Login)</h3>
      <p>
        If you choose to create an account, we collect:
      </p>
      <ul>
        <li>Email address</li>
        <li>Firebase User ID</li>
        <li>Profile information you choose to provide</li>
      </ul>
      <p>
        <strong>Purpose:</strong> Account management and data synchronization across your devices.
      </p>
      <p>
        <strong>Storage:</strong> This data is stored on Firebase servers and 
        <strong> IS linked to your identity</strong>.
      </p>
      <p>
        <strong>Retention:</strong> Account data is retained until you delete your account.
      </p>

      <h3>1.5 Purchase History (In-App Purchases)</h3>
      <p>
        When you purchase a Premium subscription, we collect purchase information:
      </p>
      <p>
        <strong>What We Collect:</strong>
      </p>
      <ul>
        <li>Transaction IDs (from Apple)</li>
        <li>Product IDs (Monthly or Yearly subscription type)</li>
        <li>Purchase dates and expiration dates</li>
        <li>Subscription status (active, cancelled, expired)</li>
        <li>Device ID (to verify premium status on your device)</li>
      </ul>
      <p>
        <strong>Purpose:</strong>
      </p>
      <ul>
        <li>Verify your premium subscription status</li>
        <li>Provide access to premium features</li>
        <li>Tax and accounting compliance</li>
        <li>Prevent subscription fraud</li>
      </ul>
      <p>
        <strong>Linked to User:</strong> <strong>YES</strong> (required for subscription 
        management and verification via Apple ID)
      </p>
      <p>
        <strong>Storage:</strong>
      </p>
      <ul>
        <li>Apple servers (managed by Apple for IAP transactions)</li>
        <li>Our secure backend servers (for premium status verification)</li>
      </ul>
      <p>
        <strong>Retention Period:</strong>
      </p>
      <ul>
        <li>
          <strong>Active subscriptions:</strong> Until cancelled or expired
        </li>
        <li>
          <strong>Past subscriptions:</strong> 7-10 years (tax compliance requirement, 
          as required by law)
        </li>
        <li>
          <strong>After GDPR deletion request:</strong> Financial transaction data is 
          anonymized (device_id and personal identifiers removed), but transaction records 
          are retained for tax compliance (as required by law)
        </li>
      </ul>
      <p>
        <strong>Important:</strong> Even if you request deletion of your account, purchase 
        history may be retained in anonymized form for tax and accounting compliance purposes, 
        as required by law.
      </p>

      <h2>2. How We Use Your Information</h2>
      <p>We use the collected information for the following purposes:</p>

      <h3>2.1 App Functionality</h3>
      <ul>
        <li>Product scanning and halal verification</li>
        <li>Ingredient translation (on-device using Apple system translation)</li>
        <li>Prayer time calculations</li>
        <li>Qibla direction</li>
        <li>Premium feature access</li>
        <li>Data synchronization across devices (if logged in)</li>
      </ul>
      <p>
        <strong>Ingredient Translations:</strong> Ingredient translations are performed 
        on-device using Apple system translation and are provided for convenience only. 
        The original ingredient list remains the authoritative source. Translation data 
        is processed locally and is never transmitted to our servers or third-party services.
      </p>

      <h3>2.2 Analytics</h3>
      <ul>
        <li>App usage statistics</li>
        <li>Crash reports and error tracking</li>
        <li>Feature usage trends</li>
        <li>Service improvement</li>
      </ul>
      <p>
        Analytics data is anonymized and aggregated. We use Firebase Analytics for this purpose.
      </p>

      <h3>2.3 Advertising (Free Tier Only)</h3>
      <p>
        If you use the free version of our app, we display advertisements via Google AdMob. 
        AdMob may collect device identifiers and usage data to show personalized ads. 
        This data is used solely for advertising purposes and is not linked to your identity.
      </p>
      <p>
        <strong>Opt-out options:</strong>
      </p>
      <ul>
        <li>Disable tracking: iOS Settings → Privacy → Tracking</li>
        <li>Upgrade to Premium to remove all ads</li>
      </ul>

      <h3>2.4 Communication</h3>
      <ul>
        <li>Important app updates and security notifications</li>
        <li>GDPR deletion confirmation emails</li>
        <li>Support responses to your inquiries</li>
        <li>Account-related communications (if you have an account)</li>
      </ul>
      <p>
        Marketing communications are only sent with your explicit consent, and you can 
        opt out at any time.
      </p>

      <h2>3. Data Storage and Security</h2>

      <h3>3.1 Where is Data Stored?</h3>
      
      <p>
        <strong>Stored Locally (on your device):</strong>
      </p>
      <ul>
        <li>
          ✅ <strong>Scan history</strong> - iOS Keychain (encrypted, secure)
        </li>
        <li>
          ✅ <strong>Favorites</strong> - iOS Keychain
        </li>
        <li>
          ✅ <strong>App preferences</strong> - UserDefaults (madhhab selection, language, etc.)
        </li>
        <li>
          ✅ <strong>Prayer times cache</strong> - Local cache (temporary)
        </li>
      </ul>

      <p>
        <strong>Stored on Our Servers:</strong>
      </p>
      <ul>
        <li>
          ✅ <strong>Account data</strong> (if you create account) - Firebase servers 
          (Google Cloud Platform)
        </li>
        <li>
          ✅ <strong>Purchase history</strong> (for premium verification) - Our secure 
          backend servers + Apple's servers
        </li>
        <li>
          ✅ <strong>Product reports</strong> (if you submit corrections) - Our backend servers
        </li>
      </ul>

      <p>
        <strong>NOT Stored Permanently:</strong>
      </p>
      <ul>
        <li>
          ✅ <strong>Location data</strong> - Used only for prayer time calculation, 
          <strong>NOT saved</strong> to device or servers
        </li>
        <li>
          ✅ <strong>Camera images</strong> - Processed locally for barcode scanning, 
          <strong>NEVER uploaded</strong> to our servers
        </li>
        <li>
          ✅ <strong>Ingredient translations</strong> - Performed on-device using Apple 
          system translation, <strong>NEVER transmitted</strong> to our servers or 
          third-party services. Translations are provided for convenience only; the 
          original ingredient list remains the authoritative source.
        </li>
        <li>
          ✅ <strong>Device ID for ads</strong> - Used by AdMob, not stored by us permanently
        </li>
      </ul>

      <h3>3.2 How Long is Data Kept?</h3>
      <ul>
        <li>
          <strong>Scan history:</strong> 12 months (default), then automatically deleted. 
          You can change this in Settings or delete manually at any time.
        </li>
        <li>
          <strong>Account data:</strong> Until you delete your account. After account deletion, 
          data is permanently removed within 30 days.
        </li>
        <li>
          <strong>Purchase history:</strong> 7-10 years (required for tax compliance)
        </li>
        <li>
          <strong>Analytics data:</strong> Aggregated and anonymized, retained for service 
          improvement purposes
        </li>
      </ul>

      <h3>3.3 Security Measures</h3>
      <ul>
        <li>
          <strong>HTTPS encryption</strong> for all API calls and data transmission
        </li>
        <li>
          <strong>iOS Keychain</strong> for secure local storage of sensitive data
        </li>
        <li>
          <strong>No plain-text storage</strong> of passwords (Firebase handles authentication)
        </li>
        <li>
          <strong>Access controls</strong> and authentication for server-side data
        </li>
        <li>
          <strong>Regular security audits</strong> and updates
        </li>
      </ul>

      <h2>4. Third-Party Services</h2>
      <p>
        AllHalal uses the following third-party services. Each service has its own privacy 
        policy governing the use of your information:
      </p>

      <h3>4.1 Google AdMob (Advertising & Tracking)</h3>
      <p>
        We use <strong>Google AdMob</strong> to display advertisements in the free version of 
        our app. AdMob collects device identifiers and usage data for personalized advertising 
        and tracking purposes.
      </p>
      <p>
        <strong>What AdMob Collects:</strong>
      </p>
      <ul>
        <li>Device identifiers (IDFA/Advertising ID)</li>
        <li>Usage data (app interactions)</li>
        <li>Device information (OS version, device model)</li>
      </ul>
      <p>
        <strong>Purpose:</strong>
      </p>
      <ul>
        <li>Display personalized advertisements</li>
        <li>Measure ad performance</li>
        <li>Track user engagement across apps and websites</li>
      </ul>
      <p>
        <strong>Tracking:</strong> AdMob uses this data for tracking purposes across apps and 
        websites owned by other companies in Google's advertising network.
      </p>
      <p>
        <strong>Opt-Out:</strong>
      </p>
      <ul>
        <li>iOS Settings → Privacy & Security → Tracking → AllHalal → OFF</li>
        <li>Or upgrade to Premium (removes all ads and AdMob tracking)</li>
      </ul>
      <p>
        <strong>Privacy Policy:</strong>{" "}
        <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer">
          https://policies.google.com/privacy
        </a>
      </p>
      <p>
        <strong>Important:</strong> Premium subscription removes all advertisements, 
        eliminating AdMob tracking entirely.
      </p>

      <h3>4.2 Firebase (Google)</h3>
      <p>
        We use Firebase for:
      </p>
      <ul>
        <li>User authentication (optional account creation)</li>
        <li>Analytics (anonymized usage statistics)</li>
        <li>Crash reporting</li>
      </ul>
      <p>
        <strong>Privacy Information:</strong>{" "}
        <a href="https://firebase.google.com/support/privacy" target="_blank" rel="noopener noreferrer">
          https://firebase.google.com/support/privacy
        </a>
      </p>

      <h3>4.3 Google Sign-In</h3>
      <p>
        We offer Google Sign-In as an optional login method. When you use Google Sign-In, 
        Google's Privacy Policy applies to the authentication process.
      </p>
      <p>
        <strong>Privacy Policy:</strong>{" "}
        <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer">
          https://policies.google.com/privacy
        </a>
      </p>

      <h3>4.4 OpenFoodFacts / Product Databases</h3>
      <p>
        Product data is sourced from public databases:
      </p>
      <ul>
        <li>
          <strong>OpenFoodFacts:</strong>{" "}
          <a href="https://world.openfoodfacts.org" target="_blank" rel="noopener noreferrer">
            https://world.openfoodfacts.org
          </a> (open database)
        </li>
        <li>Our own halal product database (curated by Islamic scholars)</li>
      </ul>
      <p>
        These databases contain publicly available product information and do not collect 
        personal data from our users.
      </p>

      <h2>5. Your Rights (GDPR Compliance)</h2>
      <p>
        If you are located in the European Union (EU) or European Economic Area (EEA), 
        you have the following rights under GDPR:
      </p>

      <h3>5.1 Right to Access</h3>
      <p>
        You have the right to access all personal data we store about you.
      </p>
      <p>
        <strong>How to exercise:</strong> Available in the app: Settings → Privacy & Data → 
        View My Data. You can also request access by emailing us at{" "}
        <a href="mailto:app@allhalal.info">app@allhalal.info</a> with the subject 
        "GDPR Request - Data Access".
      </p>

      <h3>5.2 Right to Deletion (Right to be Forgotten)</h3>
      <p>
        You have the right to request deletion of all your personal data permanently.
      </p>
      <p>
        <strong>How to exercise:</strong> Available in the app: Settings → Privacy & Data → 
        Delete All Data. You can also request deletion by emailing us at{" "}
        <a href="mailto:app@allhalal.info">app@allhalal.info</a> with the subject 
        "GDPR Request - Data Deletion".
      </p>
      <p>
        <strong>Process:</strong> Local data is deleted immediately. Server-side data is 
        deleted within 30 days. You will receive a confirmation email once deletion is complete.
      </p>
      <p>
        <strong>Note:</strong> Purchase history may be retained for 7-10 years for tax 
        compliance, as required by law.
      </p>

      <h3>5.3 Right to Portability</h3>
      <p>
        You have the right to receive your personal data in a structured, commonly used, 
        and machine-readable format.
      </p>
      <p>
        <strong>How to exercise:</strong> Available in the app: Settings → Privacy & Data → 
        Export My Data. Data will be exported in JSON/CSV format. You can also request export 
        by emailing us at <a href="mailto:app@allhalal.info">app@allhalal.info</a> with the 
        subject "GDPR Request - Data Export".
      </p>

      <h3>5.4 Right to Object</h3>
      <p>
        You have the right to object to the processing of your personal data for certain 
        purposes, including direct marketing, profiling, and advertising tracking.
      </p>
      <p>
        <strong>How to exercise:</strong>
      </p>
      <ul>
        <li>
          <strong>Object to tracking:</strong> iOS Settings → Privacy & Security → Tracking → 
          AllHalal → OFF (or decline the ATT prompt when asked)
        </li>
        <li>
          <strong>Object to advertising:</strong> Upgrade to Premium subscription (removes all 
          ads and AdMob tracking) OR disable tracking as above
        </li>
        <li>
          <strong>Object to marketing communications:</strong> Unsubscribe from marketing emails 
          or contact us at <a href="mailto:app@allhalal.info">app@allhalal.info</a> with 
          subject "GDPR Request - Object to Marketing"
        </li>
        <li>
          <strong>Object to specific data processing:</strong> Contact us at{" "}
          <a href="mailto:app@allhalal.info">app@allhalal.info</a> with subject 
          "GDPR Request - Object to Processing" and specify what processing you object to
        </li>
      </ul>
      <p>
        <strong>Note:</strong> If you object to tracking or advertising, you can still use 
        the app, but ads may be less personalized (if tracking is disabled) or removed 
        entirely (if you upgrade to Premium).
      </p>

      <h3>5.5 Right to Rectification</h3>
      <p>
        You have the right to request correction of inaccurate or incomplete personal data.
      </p>
      <p>
        <strong>How to exercise:</strong> Contact us at{" "}
        <a href="mailto:app@allhalal.info">app@allhalal.info</a> with the subject 
        "GDPR Request - Data Correction" and specify what data needs to be corrected.
      </p>

      <h3>5.6 Response Time</h3>
      <p>
        We will respond to all GDPR requests within <strong>30 days</strong>, as required 
        by GDPR regulations.
      </p>

      <h2>6. Data Retention</h2>
      <p>
        We retain your personal information only for as long as necessary to provide our 
        services and comply with legal obligations:
      </p>
      <ul>
        <li>
          <strong>Scan history:</strong> 12 months (default), then automatically deleted. 
          You can change this period in Settings or delete manually at any time.
        </li>
        <li>
          <strong>Account data:</strong> Until you delete your account. After deletion request, 
          data is removed within 30 days.
        </li>
        <li>
          <strong>Purchase history:</strong> 7-10 years (required for tax compliance and 
          financial record-keeping)
        </li>
        <li>
          <strong>Analytics data:</strong> Aggregated and anonymized, retained indefinitely 
          for service improvement (not linked to your identity)
        </li>
      </ul>
      <p>
        You can request deletion of your data at any time by contacting us or using the 
        in-app deletion feature.
      </p>

      <h2>7. Children's Privacy (COPPA Compliance)</h2>
      <p>
        <strong>Age Restriction:</strong> Our app is rated 4+ (suitable for all ages), but 
        we do <strong>NOT</strong> knowingly collect personal information from children 
        under 13 years of age.
      </p>
      <p>
        If you are a parent or guardian and believe that your child under 13 has provided 
        us with personal information, please contact us immediately at{" "}
        <a href="mailto:app@allhalal.info">app@allhalal.info</a>, and we will delete 
        such information promptly.
      </p>
      <p>
        <strong>Parental Consent:</strong> Parental consent is not required as we do not 
        collect age-specific content or personal information from children. The app does 
        not require account creation for basic functionality.
      </p>

      <h2>8. App Tracking Transparency & Cookies</h2>

      <h3>8.1 App Tracking Transparency (ATT)</h3>
      <p>
        When you first open AllHalal, you may see a request to allow tracking (iOS App Tracking 
        Transparency prompt).
      </p>
      <p>
        <strong>What is tracked:</strong>
      </p>
      <ul>
        <li>Device ID (Advertising Identifier / IDFA)</li>
        <li>App usage data for ad personalization</li>
        <li>Interactions with advertisements</li>
      </ul>
      <p>
        <strong>Purpose:</strong>
      </p>
      <ul>
        <li>Display relevant, personalized advertisements via Google AdMob (free version only)</li>
        <li>Measure ad performance and effectiveness</li>
        <li>Enable cross-app and cross-website tracking for advertising</li>
      </ul>
      <p>
        <strong>Your Choice:</strong>
      </p>
      <ul>
        <li>
          <strong>Allow tracking:</strong> You will see personalized ads based on your interests
        </li>
        <li>
          <strong>Don't allow tracking:</strong> You will still see ads, but they will be 
          less personalized (not based on your activity across apps/websites)
        </li>
        <li>
          <strong>Upgrade to Premium:</strong> Removes all ads and tracking completely
        </li>
      </ul>
      <p>
        <strong>Change Your Mind:</strong> You can change this setting at any time:
      </p>
      <ul>
        <li>iOS Settings → Privacy & Security → Tracking → AllHalal → ON/OFF</li>
      </ul>

      <h3>8.2 Cookies</h3>
      <p>
        <strong>Mobile App:</strong> Our mobile app does <strong>NOT</strong> use cookies. 
        Instead, we use:
      </p>
      <ul>
        <li>
          <strong>Device identifiers</strong> (for advertising purposes in free tier only, 
          as described above)
        </li>
        <li>
          <strong>Local storage</strong> (iOS Keychain for sensitive data, UserDefaults 
          for preferences)
        </li>
        <li>
          <strong>No web-based tracking</strong> or cookies in the mobile app
        </li>
      </ul>
      <p>
        <strong>Website:</strong> Our website (allhalal.info) may use cookies for essential 
        functionality. We do not use tracking cookies or third-party advertising cookies 
        on our website.
      </p>

      <h2>9. International Data Transfers</h2>
      <p>
        Your data may be transferred to and stored on servers located in:
      </p>
      <ul>
        <li>
          <strong>United States:</strong> Firebase servers (Google Cloud Platform), 
          Google AdMob servers
        </li>
        <li>
          <strong>European Union:</strong> Some analytics data may be processed in EU 
          (depending on Firebase configuration)
        </li>
      </ul>
      <p>
        <strong>Data Protection:</strong> We ensure adequate protection of your data through:
      </p>
      <ul>
        <li>
          GDPR-compliant data processing agreements with all third-party service providers
        </li>
        <li>
          Standard Contractual Clauses (SCCs) for data transfers outside the EU/EEA
        </li>
        <li>
          Compliance with applicable data protection laws
        </li>
      </ul>
      <p>
        By using our app, you consent to the transfer of your information to these locations 
        in accordance with this Privacy Policy.
      </p>

      <h2>10. Changes to This Policy</h2>
      <p>
        We may update this privacy policy from time to time to reflect changes in our 
        practices, technology, legal requirements, or other factors.
      </p>
      <p>
        <strong>Notification of Changes:</strong> When we make significant changes, we will 
        notify you through:
      </p>
      <ul>
        <li>In-app notification</li>
        <li>Email notification (if you have provided your email address)</li>
        <li>Updated "Last Updated" date on this page</li>
      </ul>
      <p>
        <strong>Continued Use:</strong> Your continued use of the app after changes are 
        posted constitutes acceptance of the updated policy. If you do not agree with the 
        changes, you may stop using the app and request deletion of your data.
      </p>

      <h2>11. Contact Us</h2>
      <p>
        If you have any questions, concerns, or requests regarding this Privacy Policy 
        or our data practices, please contact us:
      </p>
      <ul>
        <li>
          <strong>Email:</strong> <a href="mailto:app@allhalal.info">app@allhalal.info</a>
        </li>
        <li>
          <strong>Website:</strong> <a href="https://www.allhalal.info">allhalal.info</a>
        </li>
      </ul>
      <p>
        <strong>For GDPR Requests:</strong> Please email us at{" "}
        <a href="mailto:app@allhalal.info">app@allhalal.info</a> with the subject line:
      </p>
      <ul>
        <li>"GDPR Request - Data Access" (to view your data)</li>
        <li>"GDPR Request - Data Deletion" (to delete your data)</li>
        <li>"GDPR Request - Data Export" (to export your data)</li>
        <li>"GDPR Request - Data Correction" (to correct your data)</li>
      </ul>
      <p>
        <strong>Response Time:</strong> We will respond to all requests within{" "}
        <strong>30 days</strong>, as required by GDPR regulations.
      </p>

      {/* Footer note */}
      <div className="mt-16 pt-8 border-t border-border">
        <p className="text-sm text-text-muted">
          This privacy policy is effective as of December 2025 and will remain in
          effect except with respect to any changes in its provisions in the future.
        </p>
      </div>
    </motion.article>
  );
}

function ArrowLeftIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M19 12H5M12 19l-7-7 7-7" />
    </svg>
  );
}
