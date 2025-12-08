'use client';

import Link from 'next/link';
import '../globals.css';
import '../../styles/normalize.css';
import '../../styles/premium.css';

export default function SupportPage() {
  return (
    <>
      {/* Header */}
      <header className="header">
        <div className="container">
          <div className="header-content-new">
            <Link href="/" className="logo">ALLHALAL</Link>
            <nav className="nav-new">
              <Link href="/#features">Features</Link>
              <span className="nav-divider"></span>
              <Link href="/legal">Legal</Link>
              <span className="nav-divider"></span>
              <Link href="/contact">Contact</Link>
            </nav>
            <Link href="/coming-soon" className="btn-download-new">Download iOS</Link>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="support-hero">
        <div className="container">
          <div className="support-hero-content">
            <span className="support-badge">Support Center</span>
            <h1 className="support-title">How can we help?</h1>
            <p className="support-subtitle">
              Find answers to common questions or reach out to our team
            </p>
          </div>
        </div>
      </section>

      {/* Quick Links */}
      <section className="support-quick">
        <div className="container">
          <div className="support-grid">
            <a href="mailto:app@allhalal.info" className="support-card">
              <div className="support-icon">✉️</div>
              <h3>Email Support</h3>
              <p>Get help via email</p>
              <span className="support-link">app@allhalal.info →</span>
            </a>
            
            <Link href="/legal/privacy-policy" className="support-card">
              <div className="support-icon">🔒</div>
              <h3>Privacy Policy</h3>
              <p>How we protect your data</p>
              <span className="support-link">Read policy →</span>
            </Link>
            
            <Link href="/legal/terms-of-service" className="support-card">
              <div className="support-icon">📋</div>
              <h3>Terms of Service</h3>
              <p>Usage guidelines</p>
              <span className="support-link">Read terms →</span>
            </Link>
            
            <Link href="/legal/disclaimer" className="support-card">
              <div className="support-icon">⚠️</div>
              <h3>Disclaimer</h3>
              <p>Important information</p>
              <span className="support-link">Read disclaimer →</span>
            </Link>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="support-faq">
        <div className="container">
          <h2 className="faq-title">Frequently Asked Questions</h2>
          
          <div className="faq-list">
            <details className="faq-item">
              <summary className="faq-question">
                How does AllHalal verify products?
              </summary>
              <div className="faq-answer">
                AllHalal uses a combination of AI-powered ingredient analysis and a comprehensive database of over 2 million verified products. Our system analyzes ingredients, E-numbers, and additives to determine halal status based on Islamic dietary guidelines.
              </div>
            </details>
            
            <details className="faq-item">
              <summary className="faq-question">
                Which madhhab (school of thought) does AllHalal follow?
              </summary>
              <div className="faq-answer">
                AllHalal supports all four major Sunni schools of Islamic jurisprudence: Hanafi, Shafi&apos;i, Maliki, and Hanbali. You can select your preferred madhhab in the app settings, and all rulings will be tailored accordingly.
              </div>
            </details>
            
            <details className="faq-item">
              <summary className="faq-question">
                Is AllHalal available in my language?
              </summary>
              <div className="faq-answer">
                AllHalal is available in multiple languages including English, Arabic, Turkish, Indonesian, Malay, Urdu, French, German, Spanish, Italian, Russian, and more. The app automatically detects your device language.
              </div>
            </details>
            
            <details className="faq-item">
              <summary className="faq-question">
                How accurate is the barcode scanner?
              </summary>
              <div className="faq-answer">
                Our barcode scanner has a 99%+ recognition rate for products in our database. If a product is not found, you can use the AI ingredient scanner to analyze the ingredients list directly from the packaging.
              </div>
            </details>
            
            <details className="faq-item">
              <summary className="faq-question">
                Can I use AllHalal offline?
              </summary>
              <div className="faq-answer">
                Some features require an internet connection for real-time verification. However, previously scanned products and basic functionality are available offline.
              </div>
            </details>
            
            <details className="faq-item">
              <summary className="faq-question">
                How do I report an incorrect product listing?
              </summary>
              <div className="faq-answer">
                If you find an incorrect listing, please email us at app@allhalal.info with the product name, barcode, and the issue you&apos;ve identified. Our team reviews all reports within 48 hours.
              </div>
            </details>
            
            <details className="faq-item">
              <summary className="faq-question">
                Is my data secure?
              </summary>
              <div className="faq-answer">
                Yes. We follow industry-standard security practices including encryption, secure data storage, and strict access controls. We never sell your personal data. Read our Privacy Policy for complete details.
              </div>
            </details>
            
            <details className="faq-item">
              <summary className="faq-question">
                How can I delete my account?
              </summary>
              <div className="faq-answer">
                You can request account deletion by emailing app@allhalal.info with the subject &quot;Account Deletion Request&quot;. We will process your request within 30 days as required by GDPR.
              </div>
            </details>
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="support-cta">
        <div className="container">
          <div className="cta-content">
            <h2>Still need help?</h2>
            <p>Our support team is here to assist you</p>
            <a href="mailto:app@allhalal.info" className="cta-button">
              Contact Support
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="container">
          <div className="footer-bottom-simple">
            <p>&copy; 2025 Allhalal. Developed by Gezellix</p>
          </div>
        </div>
      </footer>

      <style jsx>{`
        .support-hero {
          padding: calc(80px + 4rem) 0 3rem;
          text-align: center;
          background: 
            radial-gradient(ellipse 80% 50% at 50% 0%, rgba(0, 208, 148, 0.08) 0%, transparent 50%);
        }
        
        .support-hero-content {
          max-width: 600px;
          margin: 0 auto;
        }
        
        .support-badge {
          display: inline-block;
          padding: 8px 16px;
          background: rgba(0, 208, 148, 0.1);
          border: 1px solid rgba(0, 208, 148, 0.2);
          border-radius: 20px;
          color: #00d094;
          font-size: 0.75rem;
          font-weight: 500;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          margin-bottom: 1.5rem;
        }
        
        .support-title {
          font-size: clamp(2rem, 5vw, 3rem);
          font-weight: 600;
          color: #ffffff;
          margin-bottom: 1rem;
          letter-spacing: -0.02em;
        }
        
        .support-subtitle {
          font-size: 1.125rem;
          color: rgba(255, 255, 255, 0.6);
          line-height: 1.6;
        }
        
        .support-quick {
          padding: 3rem 0;
        }
        
        .support-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 1.5rem;
        }
        
        .support-card {
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.06);
          border-radius: 16px;
          padding: 2rem;
          text-decoration: none;
          transition: all 0.2s ease;
        }
        
        .support-card:hover {
          background: rgba(255, 255, 255, 0.06);
          border-color: rgba(255, 255, 255, 0.1);
          transform: translateY(-2px);
        }
        
        .support-icon {
          font-size: 2rem;
          margin-bottom: 1rem;
        }
        
        .support-card h3 {
          font-size: 1rem;
          font-weight: 600;
          color: #ffffff;
          margin-bottom: 0.5rem;
        }
        
        .support-card p {
          font-size: 0.875rem;
          color: rgba(255, 255, 255, 0.5);
          margin-bottom: 1rem;
        }
        
        .support-link {
          font-size: 0.875rem;
          color: #00d094;
          font-weight: 500;
        }
        
        .support-faq {
          padding: 4rem 0;
          border-top: 1px solid rgba(255, 255, 255, 0.06);
        }
        
        .faq-title {
          font-size: 1.5rem;
          font-weight: 600;
          color: #ffffff;
          text-align: center;
          margin-bottom: 3rem;
        }
        
        .faq-list {
          max-width: 800px;
          margin: 0 auto;
        }
        
        .faq-item {
          border-bottom: 1px solid rgba(255, 255, 255, 0.06);
        }
        
        .faq-question {
          padding: 1.5rem 0;
          font-size: 1rem;
          font-weight: 500;
          color: #ffffff;
          cursor: pointer;
          list-style: none;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        
        .faq-question::-webkit-details-marker {
          display: none;
        }
        
        .faq-question::after {
          content: '+';
          font-size: 1.25rem;
          color: rgba(255, 255, 255, 0.4);
          transition: transform 0.2s ease;
        }
        
        details[open] .faq-question::after {
          content: '−';
        }
        
        .faq-answer {
          padding: 0 0 1.5rem;
          font-size: 0.9375rem;
          color: rgba(255, 255, 255, 0.6);
          line-height: 1.7;
        }
        
        .support-cta {
          padding: 4rem 0;
          text-align: center;
          background: 
            radial-gradient(ellipse 60% 40% at 50% 100%, rgba(0, 208, 148, 0.06) 0%, transparent 50%);
        }
        
        .cta-content h2 {
          font-size: 1.5rem;
          font-weight: 600;
          color: #ffffff;
          margin-bottom: 0.5rem;
        }
        
        .cta-content p {
          font-size: 1rem;
          color: rgba(255, 255, 255, 0.5);
          margin-bottom: 1.5rem;
        }
        
        .cta-button {
          display: inline-block;
          padding: 12px 24px;
          background: #00d094;
          color: #000000;
          font-size: 0.875rem;
          font-weight: 500;
          text-decoration: none;
          border-radius: 8px;
          transition: all 0.2s ease;
        }
        
        .cta-button:hover {
          background: #00e5a3;
          transform: translateY(-1px);
          box-shadow: 0 4px 12px rgba(0, 208, 148, 0.3);
        }
        
        @media (max-width: 768px) {
          .support-grid {
            grid-template-columns: repeat(2, 1fr);
          }
          
          .support-card {
            padding: 1.5rem;
          }
        }
        
        @media (max-width: 480px) {
          .support-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </>
  );
}

