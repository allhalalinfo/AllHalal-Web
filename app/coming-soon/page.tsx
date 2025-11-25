'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import '../../styles/normalize.css';
import '../../styles/premium.css';
import '../../styles/coming-soon.css';

export default function ComingSoonPage() {
  useEffect(() => {
    document.title = 'Coming Soon - AllHalal';
  }, []);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="coming-soon-container">
      {/* Animated Background */}
      <div className="coming-soon-bg">
        <div className="gradient-orb orb-1"></div>
        <div className="gradient-orb orb-2"></div>
        <div className="gradient-orb orb-3"></div>
      </div>

      {/* Content */}
      <div className={`coming-soon-content ${mounted ? 'mounted' : ''}`}>
        {/* Logo */}
        <Link href="/" className="coming-soon-logo">
          ALLHALAL
        </Link>

        {/* Islamic Ornament */}
        <div className="ornament-top">
          <span className="ornament-line"></span>
          <span className="ornament-symbol">◈</span>
          <span className="ornament-line"></span>
        </div>

        {/* Main Content */}
        <div className="coming-soon-main">
          <div className="status-badge">
            <span className="status-pulse"></span>
            <span className="status-text">In Development</span>
          </div>

          <h1 className="coming-soon-title">
            <span className="title-line">Coming</span>
            <span className="title-line-strong">Very Soon</span>
          </h1>

          <p className="coming-soon-description">
            We're crafting the ultimate halal verification experience.
            <br />
            The most advanced scanner in the world is almost ready.
          </p>

          {/* Features Preview */}
          <div className="features-preview">
            <div className="feature-item">
              <div className="feature-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M9 11l3 3L22 4"/>
                  <path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11"/>
                </svg>
              </div>
              <span>2M+ Products</span>
            </div>
            <div className="feature-item">
              <div className="feature-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10"/>
                  <path d="M12 6v6l4 2"/>
                </svg>
              </div>
              <span>Real-time Verification</span>
            </div>
            <div className="feature-item">
              <div className="feature-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                </svg>
              </div>
              <span>Scholar-Verified</span>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="progress-section">
            <div className="progress-label">
              <span>Development Progress</span>
              <span className="progress-percentage">87%</span>
            </div>
            <div className="progress-bar">
              <div className="progress-fill"></div>
            </div>
          </div>

          {/* Notify Form */}
          <div className="notify-section">
            <p className="notify-text">Be the first to know when we launch</p>
            <form className="notify-form" onSubmit={(e) => e.preventDefault()}>
              <input 
                type="email" 
                placeholder="Enter your email" 
                className="notify-input"
                required
              />
              <button type="submit" className="notify-button">
                Notify Me
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M3 8h10M8 3l5 5-5 5"/>
                </svg>
              </button>
            </form>
          </div>

          {/* Social Links */}
          <div className="social-section">
            <p className="social-text">Follow our journey</p>
            <div className="social-links">
              <a href="#" className="social-link" aria-label="Instagram">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                  <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z"/>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
                </svg>
              </a>
              <a href="#" className="social-link" aria-label="Twitter">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"/>
                </svg>
              </a>
              <a href="#" className="social-link" aria-label="Facebook">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"/>
                </svg>
              </a>
            </div>
          </div>
        </div>

        {/* Islamic Ornament Bottom */}
        <div className="ornament-bottom">
          <span className="ornament-line"></span>
          <span className="ornament-symbol">◈</span>
          <span className="ornament-line"></span>
        </div>

        {/* Back Link */}
        <Link href="/" className="back-link">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M10 3L5 8l5 5"/>
          </svg>
          Back to Home
        </Link>
      </div>

      {/* Floating Particles */}
      <div className="particles">
        {[...Array(20)].map((_, i) => (
          <div key={i} className="particle" style={{
            left: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 5}s`,
            animationDuration: `${5 + Math.random() * 10}s`
          }}></div>
        ))}
      </div>
    </div>
  );
}

