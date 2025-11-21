'use client';

import { useState } from 'react';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <>
      <header className="header">
        <div className="container-wide">
          <div className="header-content-new">
            <a href="/" className="logo">ALLHALAL</a>
            
            {/* Desktop Navigation */}
            <nav className="nav-new">
              <a href="/#features">Features</a>
              <span className="nav-divider"></span>
              <a href="/legal">Legal</a>
              <span className="nav-divider"></span>
              <a href="/contact">Contact</a>
            </nav>
            
            <a href="https://apps.apple.com/app/allhalal" className="btn-download-new">Download iOS</a>
            
            {/* Mobile Menu Button */}
            <button 
              className="mobile-menu-toggle"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle menu"
            >
              <span className={`hamburger ${isMenuOpen ? 'open' : ''}`}>
                <span></span>
                <span></span>
                <span></span>
              </span>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <div className="mobile-menu-overlay" onClick={() => setIsMenuOpen(false)}>
          <nav className="mobile-menu" onClick={(e) => e.stopPropagation()}>
            <a href="https://apps.apple.com/app/allhalal" className="mobile-menu-download">
              Download iOS
            </a>
            <a href="/#features" onClick={() => setIsMenuOpen(false)}>Features</a>
            <a href="/legal" onClick={() => setIsMenuOpen(false)}>Legal</a>
            <a href="/contact" onClick={() => setIsMenuOpen(false)}>Contact</a>
          </nav>
        </div>
      )}
    </>
  );
}
