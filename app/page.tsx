'use client';

import { useEffect } from 'react';
import Header from '@/components/Header';
import '../styles/normalize.css';
import '../styles/premium.css';
import '../styles/app-showcase.css';

export default function Home() {
  useEffect(() => {
    // Counter animation - ТОЛЬКО на десктопе
    const counter = document.querySelector('[data-target]') as HTMLElement;
    if (counter) {
      const isMobile = window.innerWidth <= 768;
      
      if (isMobile) {
        // На мобильной - статично показываем число без анимации
        const target = parseInt(counter.getAttribute('data-target') || '0');
        counter.textContent = target.toLocaleString() + '+';
        return;
      }
      
      // На десктопе - плавная анимация
      const target = parseInt(counter.getAttribute('data-target') || '0');
      const duration = 8000; // 8 секунд
      const startTime = performance.now();
      
      // Easing function для плавного замедления
      const easeOutQuint = (t: number) => 1 - Math.pow(1 - t, 5);

      const updateCounter = (currentTime: number) => {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        // Применяем плавное замедление
        const easedProgress = easeOutQuint(progress);
        const current = Math.floor(target * easedProgress);
        
        counter.textContent = current.toLocaleString() + '+';
        
        if (progress < 1) {
          requestAnimationFrame(updateCounter);
        } else {
          counter.textContent = target.toLocaleString() + '+';
        }
      };
      
      // Небольшая задержка перед началом
      setTimeout(() => {
        requestAnimationFrame(updateCounter);
      }, 500);
    }
  }, []);

  return (
    <>
      <Header />

      {/* Hero */}
      <section className="hero-new">
        <div className="container">
          <div className="hero-content-new">
            <div className="hero-tag">World&apos;s #1 Halal Verification Platform</div>
            
            <h1 className="hero-title-new">
              <span className="title-light">The Most Advanced</span>
              <span className="title-strong">Halal Scanner</span>
              <span className="title-secondary">in the World</span>
            </h1>
            
            <div className="hero-number-block">
              <div className="number-line">
                <span className="hero-number-new" data-target="2000000">2,000,000+</span>
                <span className="number-label">products</span>
              </div>
              <div className="number-tagline">Verified. Accurate. Trusted globally.</div>
              <div className="number-subline">Real-time halal verification powered by global datasets</div>
            </div>
            
            <div className="islamic-divider">
              <span className="divider-line"></span>
              <span className="divider-ornament">◈</span>
              <span className="divider-line"></span>
            </div>
            
            <div className="hero-cards-grid">
              <div className="hero-card">
                <div className="card-label">Coverage</div>
                <div className="card-value">Food & Cosmetics</div>
              </div>
              
              <div className="hero-card">
                <div className="card-label">Classification</div>
                <div className="card-value">Halal - Haram - Mashbooh</div>
              </div>
              
              <div className="hero-card">
                <div className="card-label">Islamic Schools</div>
                <div className="card-value">4 Madhhabs</div>
              </div>
              
              <div className="hero-card">
                <div className="card-label">Languages</div>
                <div className="card-value">9 Languages</div>
              </div>
              
              <div className="hero-card">
                <div className="card-label">Database</div>
                <div className="card-value">Daily Updates</div>
              </div>
            </div>
            
            <div className="islamic-divider">
              <span className="divider-line"></span>
              <span className="divider-ornament">◈</span>
              <span className="divider-line"></span>
            </div>
            
            <div className="hero-actions-new">
              <a href="/coming-soon" className="btn-primary-large">
                <span>Download for iOS</span>
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M5 10l5 5 5-5M10 3v12"/>
                </svg>
              </a>
              <a href="#features" className="btn-secondary-large">
                <span>Explore Features</span>
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M5 10h10M10 5l5 5-5 5"/>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="features">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">The Ultimate Halal<br/>Intelligence Platform</h2>
          </div>
          
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">
                <svg width="32" height="32" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <rect x="8" y="12" width="16" height="12" rx="1"/>
                  <path d="M10 15h2M14 15h2M18 15h2M10 19h2M14 19h2M18 19h2"/>
                </svg>
              </div>
              <h3 className="feature-title">Barcode Scanner</h3>
              <p className="feature-description">Scan any product worldwide - results in under 2 seconds. Instant halal verification.</p>
            </div>
            
            <div className="feature-card">
              <div className="feature-icon">
                <svg width="32" height="32" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M4 16h24M16 4v24M8 8l16 16M24 8L8 24"/>
                </svg>
              </div>
              <h3 className="feature-title">Ingredient Analyzer</h3>
              <p className="feature-description">Deep halal analysis of every ingredient, E-number and additive - powered by scholars.</p>
            </div>
            
            <div className="feature-card">
              <div className="feature-icon">
                <svg width="32" height="32" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <circle cx="16" cy="12" r="4"/>
                  <path d="M16 20v8M12 24h8"/>
                </svg>
              </div>
              <h3 className="feature-title">Cosmetics Checker</h3>
              <p className="feature-description">Complete halal verification for makeup, skincare and personal care. Effortless and accurate.</p>
            </div>
            
            <div className="feature-card">
              <div className="feature-icon">
                <svg width="32" height="32" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M22 14.79A8 8 0 1110.21 3 6 6 0 0022 14.79z"/>
                </svg>
              </div>
              <h3 className="feature-title">Prayer Times</h3>
              <p className="feature-description">Accurate prayer times based on your exact location. Never miss Salah.</p>
            </div>
            
            <div className="feature-card">
              <div className="feature-icon">
                <svg width="32" height="32" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <circle cx="16" cy="16" r="12"/>
                  <path d="M16 8v8l4 4"/>
                </svg>
              </div>
              <h3 className="feature-title">Qibla Compass</h3>
              <p className="feature-description">Find the Qibla instantly - anywhere in the world.</p>
            </div>
            
            <div className="feature-card">
              <div className="feature-icon">
                <svg width="32" height="32" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <rect x="6" y="8" width="20" height="18" rx="2"/>
                  <path d="M20 4v4M12 4v4M6 14h20"/>
                </svg>
              </div>
              <h3 className="feature-title">Islamic Calendar</h3>
              <p className="feature-description">Sunnah of the Day, Islamic events and essential global dates.</p>
            </div>
            
            <div className="feature-card">
              <div className="feature-icon">
                <svg width="32" height="32" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M16 4L20 12L28 12L22 18L24 28L16 22L8 28L10 18L4 12L12 12L16 4Z"/>
                </svg>
              </div>
              <h3 className="feature-title">Madhhab Settings</h3>
              <p className="feature-description">Personalized rulings based on your Islamic school of thought.</p>
            </div>
            
            <div className="feature-card">
              <div className="feature-icon">
                <svg width="32" height="32" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M16 28a12 12 0 100-24 12 12 0 000 24zM16 10v6l4 2"/>
                </svg>
              </div>
              <h3 className="feature-title">Full Breakdown</h3>
              <p className="feature-description">Complete halal/haram analysis with clear explanations and authentic sources.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Languages */}
      <section id="languages" className="languages">
        <div className="container">
          <div className="languages-header">
            <h2 className="languages-title">Use AllHalal in the language you feel at home with.</h2>
          </div>
          
          <div className="languages-carousel-wrapper">
            <div className="languages-carousel">
              <div className="language-pill">English</div>
              <div className="language-pill">Français</div>
              <div className="language-pill">Deutsch</div>
              <div className="language-pill">Español</div>
              <div className="language-pill">Italiano</div>
              <div className="language-pill">Nederlands</div>
              <div className="language-pill">Русский</div>
              <div className="language-pill">العربية</div>
              <div className="language-pill">اردو</div>
              <div className="language-pill">English</div>
              <div className="language-pill">Français</div>
              <div className="language-pill">Deutsch</div>
              <div className="language-pill">Español</div>
              <div className="language-pill">Italiano</div>
              <div className="language-pill">Nederlands</div>
              <div className="language-pill">Русский</div>
              <div className="language-pill">العربية</div>
              <div className="language-pill">اردو</div>
            </div>
          </div>
        </div>
      </section>

      {/* Madhhab */}
      <section className="madhhab">
        <div className="container">
          <div className="madhhab-content">
            <div className="section-header-centered">
              <div className="section-label">Authentic Jurisprudence</div>
              <h2 className="section-title">Your Practice. Your Madhhab.</h2>
              <p className="section-description">We respect the diversity of Islamic scholarship. Select your School of Thought to receive rulings perfectly aligned with your practice.</p>
            </div>
            
            <div className="madhhab-list">
              <div className="madhhab-item">
                <div className="madhhab-content-layer">
                  <div className="madhhab-name">Hanafi</div>
                  <div className="madhhab-info">The most widely followed school</div>
                </div>
                <div className="madhhab-watermark">حنفي</div>
              </div>
              <div className="madhhab-item">
                <div className="madhhab-content-layer">
                  <div className="madhhab-name">Shafi&apos;i</div>
                  <div className="madhhab-info">Prevalent in Southeast Asia</div>
                </div>
                <div className="madhhab-watermark">شافعي</div>
              </div>
              <div className="madhhab-item">
                <div className="madhhab-content-layer">
                  <div className="madhhab-name">Maliki</div>
                  <div className="madhhab-info">Dominant in North and West Africa</div>
                </div>
                <div className="madhhab-watermark">مالكي</div>
              </div>
              <div className="madhhab-item">
                <div className="madhhab-content-layer">
                  <div className="madhhab-name">Hanbali</div>
                  <div className="madhhab-info">Followed in the Arabian Peninsula</div>
                </div>
                <div className="madhhab-watermark">حنبلي</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* App Showcase - Hero with Woman */}
      <section className="app-showcase-hero">
        <div className="showcase-bg">
          <div className="showcase-gradient showcase-gradient-1"></div>
          <div className="showcase-gradient showcase-gradient-2"></div>
          <div className="showcase-gradient showcase-gradient-3"></div>
        </div>
        
        <div className="showcase-grid"></div>
        
        <div className="showcase-particles">
          {[...Array(15)].map((_, i) => (
            <div 
              key={i} 
              className="showcase-particle" 
              style={{
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 10}s`,
                animationDuration: `${10 + Math.random() * 10}s`
              }}
            ></div>
          ))}
        </div>
        
        <div className="container showcase-content">
          <div className="showcase-hero">
            <div className="showcase-hero-text">
              <span className="showcase-label">📱 Mobile Experience</span>
              <h2 className="showcase-title">
                Your Complete Halal Companion
              </h2>
              <p className="showcase-description">
                Scan any product instantly. Get accurate halal verification. Make confident decisions. Everything you need in one beautiful app.
              </p>
              <a href="/coming-soon" className="showcase-cta">
                Download App
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M5 10h10M10 5l5 5-5 5"/>
                </svg>
              </a>
            </div>
            
            <div className="showcase-hero-image">
              <div className="showcase-phone-frame">
                <img 
                  src="/app-screens/hero-woman.png" 
                  alt="AllHalal App - Scan any product instantly"
                  onError={(e) => {
                    e.currentTarget.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="500" height="800" viewBox="0 0 500 800"%3E%3Crect fill="%230D2E33" width="500" height="800"/%3E%3Ctext x="50%25" y="50%25" text-anchor="middle" fill="%23D9B08C" font-size="24" font-family="Arial"%3EScan Any Product%3C/text%3E%3C/svg%3E';
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* App Features Grid */}
      <section className="app-features-grid">
        <div className="container">
          <div className="features-grid-3">
            <div className="feature-card-large">
              <div className="feature-card-image">
                <img 
                  src="/app-screens/product-verified.png" 
                  alt="Over 2 Million Products Verified"
                  onError={(e) => {
                    e.currentTarget.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="800" viewBox="0 0 400 800"%3E%3Crect fill="%230D2E33" width="400" height="800" rx="32"/%3E%3Ctext x="50%25" y="50%25" text-anchor="middle" fill="%23D9B08C" font-size="24" font-family="Arial"%3E2M+ Products%3C/text%3E%3C/svg%3E';
                  }}
                />
              </div>
              <h3 className="feature-card-title">Over 2 Million Products Verified</h3>
              <p className="feature-card-description">Comprehensive database covering food, cosmetics, and more.</p>
            </div>
            
            <div className="feature-card-large">
              <div className="feature-card-image">
                <img 
                  src="/app-screens/statistics.png" 
                  alt="Track Your Halal Journey"
                  onError={(e) => {
                    e.currentTarget.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="800" viewBox="0 0 400 800"%3E%3Crect fill="%230D2E33" width="400" height="800" rx="32"/%3E%3Ctext x="50%25" y="50%25" text-anchor="middle" fill="%23D9B08C" font-size="24" font-family="Arial"%3EHistory %26 Stats%3C/text%3E%3C/svg%3E';
                  }}
                />
              </div>
              <h3 className="feature-card-title">History & Statistics</h3>
              <p className="feature-card-description">Track your scans and see your halal journey progress.</p>
            </div>
            
            <div className="feature-card-large">
              <div className="feature-card-image">
                <img 
                  src="/app-screens/smartwatch.png" 
                  alt="Smartwatch Integration"
                  onError={(e) => {
                    e.currentTarget.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="800" viewBox="0 0 400 800"%3E%3Crect fill="%230D2E33" width="400" height="800" rx="32"/%3E%3Ctext x="50%25" y="50%25" text-anchor="middle" fill="%23D9B08C" font-size="24" font-family="Arial"%3ESmartwatch%3C/text%3E%3C/svg%3E';
                  }}
                />
              </div>
              <h3 className="feature-card-title">Smartwatch Integration</h3>
              <p className="feature-card-description">Stay connected with prayer times and Qibla on your wrist.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="container">
          <div className="footer-bottom-simple" style={{borderTop: 'none', paddingTop: 0}}>
            <p>&copy; 2025 AllHalal. All rights reserved.</p>
            <p style={{fontSize: '0.875rem', opacity: 0.6, marginTop: '8px'}}>Legal documents updated: December 6, 2025</p>
          </div>
        </div>
      </footer>
    </>
  );
}

