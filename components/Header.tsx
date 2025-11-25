'use client';

import { useState, useEffect } from 'react';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Блокировать scroll когда меню открыто
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
      document.documentElement.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
    }
    
    return () => {
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
    };
  }, [isMenuOpen]);

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const toggleMenu = () => {
    setIsMenuOpen(prev => !prev);
  };

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
            
            <a href="/coming-soon" className="btn-download-new">Download iOS</a>
            
            {/* Mobile Menu Button */}
            <button 
              className="mobile-menu-toggle"
              onClick={toggleMenu}
              aria-label="Toggle menu"
              aria-expanded={isMenuOpen}
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
      {isMenuOpen && (
        <div 
          className="mobile-menu-overlay active"
          onClick={closeMenu}
        >
          <nav className="mobile-menu" onClick={(e) => e.stopPropagation()}>
          <a href="/coming-soon" className="mobile-menu-download">
            Download iOS
          </a>
            <a href="/#features" onClick={closeMenu}>Features</a>
            <a href="/legal" onClick={closeMenu}>Legal</a>
            <a href="/contact" onClick={closeMenu}>Contact</a>
          </nav>
        </div>
      )}
    </>
  );
}
