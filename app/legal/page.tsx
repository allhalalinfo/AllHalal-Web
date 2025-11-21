import Header from '@/components/Header';
import SimpleFooter from '@/components/SimpleFooter';
import '../../styles/normalize.css';
import '../../styles/premium.css';

export const metadata = {
  title: 'Legal - AllHalal',
  description: 'Legal information, terms, privacy policy, and disclaimer',
};

export default function LegalPage() {
  return (
    <>
      <Header />
      
      <section className="hero-new" style={{
        minHeight: '80vh', 
        display: 'flex', 
        alignItems: 'center', 
        background: 'var(--background)'
      }}>
        <div className="container">
          <div className="section-header-centered">
            <div className="section-label">Transparency & Trust</div>
            <h1 className="hero-title-new" style={{
              fontSize: 'clamp(3rem, 6vw, 4.5rem)', 
              marginBottom: 'var(--space-4)'
            }}>
              Legal Center
            </h1>
            <p className="section-description">
              Read our terms and policies to understand how we protect your data and rights.
            </p>
          </div>
          
          <div className="features-grid" style={{
            gridTemplateColumns: 'repeat(3, 1fr)', 
            maxWidth: '1100px', 
            margin: '60px auto 0 auto', 
            gap: 'var(--space-8)'
          }}>
            {/* Privacy Policy */}
            <a href="/legal/privacy-policy" className="legal-card">
              <div className="legal-card-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                </svg>
              </div>
              <h3 className="legal-card-title">Privacy Policy</h3>
              <p className="legal-card-desc">How we collect, use, and protect your personal data.</p>
              <div className="legal-card-arrow">→</div>
            </a>
            
            {/* Terms of Service */}
            <a href="/legal/terms-of-service" className="legal-card">
              <div className="legal-card-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                  <polyline points="14 2 14 8 20 8"/>
                  <line x1="16" y1="13" x2="8" y2="13"/>
                  <line x1="16" y1="17" x2="8" y2="17"/>
                  <polyline points="10 9 9 9 8 9"/>
                </svg>
              </div>
              <h3 className="legal-card-title">Terms of Service</h3>
              <p className="legal-card-desc">The rules and agreements that govern your use of AllHalal.</p>
              <div className="legal-card-arrow">→</div>
            </a>
            
            {/* Disclaimer */}
            <a href="/legal/disclaimer" className="legal-card">
              <div className="legal-card-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <circle cx="12" cy="12" r="10"/>
                  <line x1="12" y1="8" x2="12" y2="12"/>
                  <line x1="12" y1="16" x2="12.01" y2="16"/>
                </svg>
              </div>
              <h3 className="legal-card-title">Disclaimer</h3>
              <p className="legal-card-desc">Important information regarding religious accuracy.</p>
              <div className="legal-card-arrow">→</div>
            </a>
          </div>
        </div>
      </section>

      <SimpleFooter />
    </>
  );
}

