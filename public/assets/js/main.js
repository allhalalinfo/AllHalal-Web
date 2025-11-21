// AllHalal - Modern JavaScript

// Mobile Menu Toggle
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');

if (menuToggle) {
  menuToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    menuToggle.classList.toggle('active');
  });
  
  // Close menu when clicking outside
  document.addEventListener('click', (e) => {
    if (!e.target.closest('.nav-container')) {
      navLinks.classList.remove('active');
      menuToggle.classList.remove('active');
    }
  });
}

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const href = this.getAttribute('href');
    if (href !== '#' && href.length > 1) {
      e.preventDefault();
      const target = document.querySelector(href);
      if (target) {
        const offset = 100;
        const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - offset;
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
        
        // Close mobile menu if open
        navLinks.classList.remove('active');
        menuToggle.classList.remove('active');
      }
    }
  });
});

// Intersection Observer for fade-in animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, observerOptions);

// Observe elements
document.querySelectorAll('.feature-block, .step-card, .trust-item').forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(30px)';
  el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
  observer.observe(el);
});

// Floating nav background on scroll
const floatingNav = document.querySelector('.floating-nav');
let lastScroll = 0;

window.addEventListener('scroll', () => {
  const currentScroll = window.pageYOffset;
  
  if (currentScroll > 100) {
    floatingNav.style.background = 'rgba(255, 255, 255, 0.98)';
    floatingNav.style.boxShadow = '0 20px 25px -5px rgba(0, 0, 0, 0.1)';
  } else {
    floatingNav.style.background = 'rgba(255, 255, 255, 0.95)';
    floatingNav.style.boxShadow = '0 10px 15px -3px rgba(0, 0, 0, 0.1)';
  }
  
  lastScroll = currentScroll;
});

// Console message
console.log('%c✨ AllHalal', 'font-size: 20px; font-weight: bold; color: #C9A05F;');
console.log('%cMaking halal choices effortless for modern Muslims.', 'font-size: 14px; color: #6B7280;');
console.log('%c🕌 حلال', 'font-size: 24px; color: #047857;');
