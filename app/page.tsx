'use client';

import { useEffect } from 'react';
import Header from '@/components/Header';
import '../styles/normalize.css';
import '../styles/premium.css';
import '../styles/hero-app.css';
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
      <section className="hero-app">
        <div className="container">
          <div className="hero-app-content">
            {/* App Logo */}
            <div className="app-logo">
              <div className="app-logo-icon">
                <svg width="80" height="80" viewBox="0 0 80 80" fill="none">
                  <rect width="80" height="80" rx="18" fill="url(#logoGradient)"/>
                  <path d="M40 20L50 35H30L40 20Z" fill="white" opacity="0.9"/>
                  <circle cx="40" cy="50" r="8" fill="white" opacity="0.9"/>
                  <defs>
                    <linearGradient id="logoGradient" x1="0" y1="0" x2="80" y2="80">
                      <stop offset="0%" stopColor="#0F503C"/>
                      <stop offset="100%" stopColor="#125F48"/>
                    </linearGradient>
                  </defs>
                </svg>
              </div>
              <h1 className="app-name">AllHalal</h1>
            </div>
            
            {/* Tagline / УТП */}
            <h2 className="hero-utp">
              The World&apos;s Most Advanced Halal Verification Platform
            </h2>
            
            <p className="hero-subtitle">
              Scan any product instantly. Get accurate halal status. 2,000,000+ products verified with AI-powered ingredient analysis.
            </p>
            
            {/* App Store Button */}
            <a href="/coming-soon" className="app-store-button">
              <svg width="120" height="40" viewBox="0 0 120 40" fill="none">
                <rect width="120" height="40" rx="8" fill="black"/>
                <text x="60" y="14" fontSize="9" fill="white" textAnchor="middle" opacity="0.8">Download on the</text>
                <text x="60" y="28" fontSize="16" fill="white" textAnchor="middle" fontWeight="600">App Store</text>
                <path d="M25 12L27 16H23L25 12Z" fill="white"/>
                <circle cx="25" cy="22" r="3" fill="white"/>
              </svg>
            </a>
          </div>
        </div>
      </section>

      {/* App Screenshots Carousel - Hero Woman First */}
      <section className="app-carousel-premium">
        <div className="container">
          <div className="carousel-header">
            <span className="carousel-label">📱 Mobile Experience</span>
            <h2 className="carousel-title">Everything in One Beautiful App</h2>
          </div>
        </div>
        
        <div className="carousel-wrapper-premium">
            <div className="carousel-track-premium">
              {/* Hero Woman - FIRST */}
              <div className="carousel-slide-premium carousel-slide-hero">
                <img src="/app-screens/hero-woman.png" alt="AllHalal - Your Complete Halal Companion" />
              </div>
              
              <div className="carousel-slide-premium">
                <img src="/app-screens/product-verified.png" alt="Over 2 Million Products Verified" />
              </div>
              
              <div className="carousel-slide-premium">
                <img src="/app-screens/ingredient-scan.png" alt="AI Ingredient Scan" />
              </div>
              
              <div className="carousel-slide-premium">
                <img src="/app-screens/madhhab.png" alt="Fiqh-Based Rulings" />
              </div>
              
              <div className="carousel-slide-premium">
                <img src="/app-screens/prayer-times.png" alt="Prayer Times & Qibla" />
              </div>
              
              <div className="carousel-slide-premium">
                <img src="/app-screens/statistics.png" alt="History & Statistics" />
              </div>
              
              <div className="carousel-slide-premium">
                <img src="/app-screens/smartwatch.png" alt="Smartwatch Integration" />
              </div>
              
              <div className="carousel-slide-premium">
                <img src="/app-screens/cosmetics.png" alt="Halal Cosmetics" />
              </div>
              
              {/* Duplicates for infinite loop */}
              <div className="carousel-slide-premium carousel-slide-hero">
                <img src="/app-screens/hero-woman.png" alt="AllHalal - Your Complete Halal Companion" />
              </div>
              
              <div className="carousel-slide-premium">
                <img src="/app-screens/product-verified.png" alt="Over 2 Million Products Verified" />
              </div>
              
              <div className="carousel-slide-premium">
                <img src="/app-screens/ingredient-scan.png" alt="AI Ingredient Scan" />
              </div>
              
              <div className="carousel-slide-premium">
                <img src="/app-screens/madhhab.png" alt="Fiqh-Based Rulings" />
              </div>
              
              <div className="carousel-slide-premium">
                <img src="/app-screens/prayer-times.png" alt="Prayer Times & Qibla" />
              </div>
              
              <div className="carousel-slide-premium">
                <img src="/app-screens/statistics.png" alt="History & Statistics" />
              </div>
              
              <div className="carousel-slide-premium">
                <img src="/app-screens/smartwatch.png" alt="Smartwatch Integration" />
              </div>
              
              <div className="carousel-slide-premium">
                <img src="/app-screens/cosmetics.png" alt="Halal Cosmetics" />
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

      {/* Footer */}
      <footer className="footer">
        <div className="container">
          <div className="footer-bottom-simple" style={{borderTop: 'none', paddingTop: 0}}>
            <p>&copy; 2025 Allhalal. Developed by Gezellix</p>
          </div>
        </div>
      </footer>
    </>
  );
}

