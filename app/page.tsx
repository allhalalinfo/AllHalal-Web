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
            
            {/* App Store Button */}
            <div className="hero-app-store">
              <a href="/coming-soon" className="app-store-badge">
                <svg width="135" height="40" viewBox="0 0 135 40" fill="none">
                  <rect width="135" height="40" rx="8" fill="black"/>
                  <text x="68" y="12" fontSize="8" fill="white" textAnchor="middle" opacity="0.8">Download on the</text>
                  <text x="68" y="28" fontSize="15" fill="white" textAnchor="middle" fontWeight="600">App Store</text>
                  <path d="M22 10L24 14H20L22 10Z" fill="white"/>
                  <circle cx="22" cy="20" r="3" fill="white"/>
                </svg>
              </a>
            </div>
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

