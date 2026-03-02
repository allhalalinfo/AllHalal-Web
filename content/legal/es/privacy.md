## 1. Information We Collect
allhalal.info collects information to provide and improve our services. The types of information we collect include:

### 1.1 Device ID (for Advertising & Tracking)
We collect device identifiers (IDFA/Advertising ID) for advertising and tracking purposes when you use the free version of our app. This data is used by Google AdMob to show personalized advertisements and measure ad performance.

**What is collected:**
- Device identifiers (IDFA/Advertising ID)
- Usage data (app interactions for ad personalization)
- Device information (OS version, device model)

**Purpose:**
- Display personalized advertisements via Google AdMob
- Measure ad performance and effectiveness
- Track user engagement with ads

**Tracking:** This data **IS used for tracking purposes** across apps and websites owned by other companies (via Google AdMob's advertising network). This data is **NOT linked to your identity** but is used for ad targeting.

**Your control:**
- **Opt out of tracking:** iOS Settings → Privacy & Security → Tracking → allhalal.info → OFF (or decline when prompted)
- **Remove ads completely:** Upgrade to Premium subscription (removes all ads and AdMob tracking)

**Important:** Premium subscription removes all advertisements and eliminates AdMob tracking entirely.

### 1.2 Product Interaction (Scan History)
We collect information about products you scan, including:
- Barcode numbers
- Product names
- Scan timestamps
- Verification results

**Purpose:** App functionality and analytics to improve our service.

**Storage:** This data is stored locally on your device using iOS Keychain and is **NOT linked to your identity** unless you have an account.

**Retention:** Scan history is retained for 12 months (default), then automatically deleted. You can manually delete your scan history at any time in Settings → Privacy & Data.

### 1.3 Coarse Location (Prayer Times)
With your permission, we collect coarse location data (city-level accuracy) to:
- Calculate accurate prayer times for your location
- Provide Qibla direction

**Important:** This data is **NOT stored permanently** and is **NOT linked to your identity**. We only use your location when the app is actively calculating prayer times.

**Your control:** You can deny location access in iOS Settings → Privacy → Location Services → allhalal.info. The app will still function, but prayer times will be less accurate.

### 1.4 User ID (Optional Login)
If you choose to create an account, we collect:
- Email address
- Firebase User ID
- Profile information you choose to provide

**Purpose:** Account management and data synchronization across your devices.

**Storage:** This data is stored on Firebase servers and **IS linked to your identity**.

**Retention:** Account data is retained until you delete your account.

### 1.5 Purchase History (In-App Purchases)
When you purchase a Premium subscription, we collect purchase information:

**What We Collect:**
- Transaction IDs (from Apple)
- Product IDs (Monthly or Yearly subscription type)
- Purchase dates and expiration dates
- Subscription status (active, cancelled, expired)
- Device ID (to verify premium status on your device)

**Purpose:**
- Verify your premium subscription status
- Provide access to premium features
- Tax and accounting compliance
- Prevent subscription fraud

**Linked to User:** **YES** (required for subscription management and verification via Apple ID)

**Storage:**
- Apple servers (managed by Apple for IAP transactions)
- Our secure backend servers (for premium status verification)

**Retention Period:**
- **Active subscriptions:** Until cancelled or expired
- **Past subscriptions:** 7-10 years (tax compliance requirement, as required by law)
- **After GDPR deletion request:** Financial transaction data is anonymized (device_id and personal identifiers removed), but transaction records are retained for tax compliance (as required by law)

**Important:** Even if you request deletion of your account, purchase history may be retained in anonymized form for tax and accounting compliance purposes, as required by law.

## 2. How We Use Your Information
We use the collected information for the following purposes:

### 2.1 App Functionality
- Product scanning and halal verification
- Ingredient translation (on-device using Apple system translation)
- Prayer time calculations
- Qibla direction
- Premium feature access
- Data synchronization across devices (if logged in)

**Ingredient Translations:** Ingredient translations are performed on-device using Apple system translation and are provided for convenience only. The original ingredient list remains the authoritative source. Translation data is processed locally and is never transmitted to our servers or third-party services.

### 2.2 Analytics
- App usage statistics
- Crash reports and error tracking
- Feature usage trends
- Service improvement

Analytics data is anonymized and aggregated. We use Firebase Analytics for this purpose.

### 2.3 Advertising (Free Tier Only)
If you use the free version of our app, we display advertisements via Google AdMob. AdMob may collect device identifiers and usage data to show personalized ads. This data is used solely for advertising purposes and is not linked to your identity.

**Opt-out options:**
- Disable tracking: iOS Settings → Privacy → Tracking
- Upgrade to Premium to remove all ads

### 2.4 Communication
- Important app updates and security notifications
- GDPR deletion confirmation emails
- Support responses to your inquiries
- Account-related communications (if you have an account)

Marketing communications are only sent with your explicit consent, and you can opt out at any time.

## 3. Data Storage and Security

### 3.1 Where is Data Stored?

**Stored Locally (on your device):**
- ✅ **Scan history** - iOS Keychain (encrypted, secure)
- ✅ **Favorites** - iOS Keychain
- ✅ **App preferences** - UserDefaults (madhhab selection, language, etc.)
- ✅ **Prayer times cache** - Local cache (temporary)

**Stored on Our Servers:**
- ✅ **Account data** (if you create account) - Firebase servers (Google Cloud Platform)
- ✅ **Purchase history** (for premium verification) - Our secure backend servers + Apple's servers
- ✅ **Product reports** (if you submit corrections) - Our backend servers

**NOT Stored Permanently:**
- ✅ **Location data** - Used only for prayer time calculation, **NOT saved** to device or servers
- ✅ **Camera images** - Processed locally for barcode scanning, **NEVER uploaded** to our servers
- ✅ **Ingredient translations** - Performed on-device using Apple system translation, **NEVER transmitted** to our servers or third-party services. Translations are provided for convenience only; the original ingredient list remains the authoritative source.
- ✅ **Device ID for ads** - Used by AdMob, not stored by us permanently

### 3.2 How Long is Data Kept?
- **Scan history:** 12 months (default), then automatically deleted. You can change this in Settings or delete manually at any time.
- **Account data:** Until you delete your account. After account deletion, data is permanently removed within 30 days.
- **Purchase history:** 7-10 years (required for tax compliance)
- **Analytics data:** Aggregated and anonymized, retained for service improvement purposes

### 3.3 Security Measures
- **HTTPS encryption** for all API calls and data transmission
- **iOS Keychain** for secure local storage of sensitive data
- **No plain-text storage** of passwords (Firebase handles authentication)
- **Access controls** and authentication for server-side data
- **Regular security audits** and updates

## 4. Third-Party Services
allhalal.info uses the following third-party services. Each service has its own privacy policy governing the use of your information:

### 4.1 Google AdMob (Advertising & Tracking)
We use **Google AdMob** to display advertisements in the free version of our app. AdMob collects device identifiers and usage data for personalized advertising and tracking purposes.

**What AdMob Collects:**
- Device identifiers (IDFA/Advertising ID)
- Usage data (app interactions)
- Device information (OS version, device model)

**Purpose:**
- Display personalized advertisements
- Measure ad performance
- Track user engagement across apps and websites

**Tracking:** AdMob uses this data for tracking purposes across apps and websites owned by other companies in Google's advertising network.

**Opt-Out:**
- iOS Settings → Privacy & Security → Tracking → allhalal.info → OFF
- Or upgrade to Premium (removes all ads and AdMob tracking)

**Privacy Policy:** https://policies.google.com/privacy

**Important:** Premium subscription removes all advertisements, eliminating AdMob tracking entirely.

### 4.2 Firebase (Google)
We use Firebase for:
- User authentication (optional account creation)
- Analytics (anonymized usage statistics)
- Crash reporting

**Privacy Information:** https://firebase.google.com/support/privacy

### 4.3 Google Sign-In
We offer Google Sign-In as an optional login method. When you use Google Sign-In, Google's Privacy Policy applies to the authentication process.

**Privacy Policy:** https://policies.google.com/privacy

### 4.4 OpenFoodFacts / Product Databases
Product data is sourced from public databases:
- **OpenFoodFacts:** https://world.openfoodfacts.org (open database)
- Our own halal product database (curated by Islamic scholars)

These databases contain publicly available product information and do not collect personal data from our users.

## 5. Your Rights (GDPR Compliance)
If you are located in the European Union (EU) or European Economic Area (EEA), you have the following rights under GDPR:

### 5.1 Right to Access
You have the right to access all personal data we store about you.

**How to exercise:** Available in the app: Settings → Privacy & Data → View My Data. You can also request access by emailing us at app@allhalal.info with the subject "GDPR Request - Data Access".

### 5.2 Right to Deletion (Right to be Forgotten)
You have the right to request deletion of all your personal data permanently.

**How to exercise:** Available in the app: Settings → Privacy & Data → Delete All Data. You can also request deletion by emailing us at app@allhalal.info with the subject "GDPR Request - Data Deletion".

**Process:** Local data is deleted immediately. Server-side data is deleted within 30 days. You will receive a confirmation email once deletion is complete.

**Note:** Purchase history may be retained for 7-10 years for tax compliance, as required by law.

### 5.3 Right to Portability
You have the right to receive your personal data in a structured, commonly used, and machine-readable format.

**How to exercise:** Available in the app: Settings → Privacy & Data → Export My Data. Data will be exported in JSON/CSV format. You can also request export by emailing us at app@allhalal.info with the subject "GDPR Request - Data Export".

### 5.4 Right to Object
You have the right to object to the processing of your personal data for certain purposes, including direct marketing, profiling, and advertising tracking.

**How to exercise:**
- **Object to tracking:** iOS Settings → Privacy & Security → Tracking → allhalal.info → OFF (or decline the ATT prompt when asked)
- **Object to advertising:** Upgrade to Premium subscription (removes all ads and AdMob tracking) OR disable tracking as above
- **Object to marketing communications:** Unsubscribe from marketing emails or contact us at app@allhalal.info with subject "GDPR Request - Object to Marketing"
- **Object to specific data processing:** Contact us at app@allhalal.info with subject "GDPR Request - Object to Processing" and specify what processing you object to

**Note:** If you object to tracking or advertising, you can still use the app, but ads may be less personalized (if tracking is disabled) or removed entirely (if you upgrade to Premium).

### 5.5 Right to Rectification
You have the right to request correction of inaccurate or incomplete personal data.

**How to exercise:** Contact us at app@allhalal.info with the subject "GDPR Request - Data Correction" and specify what data needs to be corrected.

### 5.6 Response Time
We will respond to all GDPR requests within **30 days**, as required by GDPR regulations.

## 6. Data Retention
We retain your personal information only for as long as necessary to provide our services and comply with legal obligations:
- **Scan history:** 12 months (default), then automatically deleted. You can change this period in Settings or delete manually at any time.
- **Account data:** Until you delete your account. After deletion request, data is removed within 30 days.
- **Purchase history:** 7-10 years (required for tax compliance and financial record-keeping)
- **Analytics data:** Aggregated and anonymized, retained indefinitely for service improvement (not linked to your identity)

You can request deletion of your data at any time by contacting us or using the in-app deletion feature.

## 7. Children's Privacy (COPPA Compliance)
**Age Restriction:** Our app is rated 4+ (suitable for all ages), but we do **NOT** knowingly collect personal information from children under 13 years of age.

If you are a parent or guardian and believe that your child under 13 has provided us with personal information, please contact us immediately at app@allhalal.info, and we will delete such information promptly.

**Parental Consent:** Parental consent is not required as we do not collect age-specific content or personal information from children. The app does not require account creation for basic functionality.

## 8. App Tracking Transparency & Cookies

### 8.1 App Tracking Transparency (ATT)
When you first open allhalal.info, you may see a request to allow tracking (iOS App Tracking Transparency prompt).

**What is tracked:**
- Device ID (Advertising Identifier / IDFA)
- App usage data for ad personalization
- Interactions with advertisements

**Purpose:**
- Display relevant, personalized advertisements via Google AdMob (free version only)
- Measure ad performance and effectiveness
- Enable cross-app and cross-website tracking for advertising

**Your Choice:**
- **Allow tracking:** You will see personalized ads based on your interests
- **Don't allow tracking:** You will still see ads, but they will be less personalized (not based on your activity across apps/websites)
- **Upgrade to Premium:** Removes all ads and tracking completely

**Change Your Mind:** You can change this setting at any time:
- iOS Settings → Privacy & Security → Tracking → allhalal.info → ON/OFF

### 8.2 Cookies
**Mobile App:** Our mobile app does **NOT** use cookies. Instead, we use:
- **Device identifiers** (for advertising purposes in free tier only, as described above)
- **Local storage** (iOS Keychain for sensitive data, UserDefaults for preferences)
- **No web-based tracking** or cookies in the mobile app

**Website:** Our website (allhalal.info) may use cookies for essential functionality. We do not use tracking cookies or third-party advertising cookies on our website.

## 9. International Data Transfers
Your data may be transferred to and stored on servers located in:
- **United States:** Firebase servers (Google Cloud Platform), Google AdMob servers
- **European Union:** Some analytics data may be processed in EU (depending on Firebase configuration)

**Data Protection:** We ensure adequate protection of your data through:
- GDPR-compliant data processing agreements with all third-party service providers
- Standard Contractual Clauses (SCCs) for data transfers outside the EU/EEA
- Compliance with applicable data protection laws

By using our app, you consent to the transfer of your information to these locations in accordance with this Privacy Policy.

## 10. Changes to This Policy
We may update this privacy policy from time to time to reflect changes in our practices, technology, legal requirements, or other factors.

**Notification of Changes:** When we make significant changes, we will notify you through:
- In-app notification
- Email notification (if you have provided your email address)
- Updated "Last Updated" date on this page

**Continued Use:** Your continued use of the app after changes are posted constitutes acceptance of the updated policy. If you do not agree with the changes, you may stop using the app and request deletion of your data.

## 11. Contact Us
If you have any questions, concerns, or requests regarding this Privacy Policy or our data practices, please contact us:
- **Email:** app@allhalal.info
- **Website:** https://www.allhalal.info

**For GDPR Requests:** Please email us at app@allhalal.info with the subject line:
- "GDPR Request - Data Access" (to view your data)
- "GDPR Request - Data Deletion" (to delete your data)
- "GDPR Request - Data Export" (to export your data)
- "GDPR Request - Data Correction" (to correct your data)

**Response Time:** We will respond to all requests within **30 days**, as required by GDPR regulations.
