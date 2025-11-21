'use client';

import { useState, useEffect } from 'react';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Блокировать scroll когда меню открыто
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMenuOpen]);

  const closeMenu = () => setIsMenuOpen(false);

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
              type="button"
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
      <div 
        className="mobile-menu-overlay" 
        style={{ display: isMenuOpen ? 'block' : 'none' }}
        onClick={closeMenu}
      >
        <nav className="mobile-menu" onClick={(e) => e.stopPropagation()}>
          <a href="https://apps.apple.com/app/allhalal" className="mobile-menu-download">
            Download iOS
          </a>
          <a href="/#features" onClick={closeMenu}>Features</a>
          <a href="/legal" onClick={closeMenu}>Legal</a>
          <a href="/contact" onClick={closeMenu}>Contact</a>
        </nav>
      </div>
    </>
  );
}
