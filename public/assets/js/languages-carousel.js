/**
 * Premium Languages Carousel with Strict Single Focus & Particle Effects
 * AllHalal - 2025
 */

// ============================================
// CENTER ELEMENT SCALING & HIGHLIGHT
// ============================================

function initCarouselScaling() {
  const wrapper = document.querySelector('.languages-carousel-wrapper');
  const pills = document.querySelectorAll('.language-pill');
  
  if (!wrapper || pills.length === 0) return;

  function updatePillScales() {
    const wrapperRect = wrapper.getBoundingClientRect();
    const centerX = wrapperRect.left + wrapperRect.width / 2;
    
    // First pass: Find the closest pill to center
    let closestPill = null;
    let minDistance = Infinity;
    
    pills.forEach(pill => {
      const pillRect = pill.getBoundingClientRect();
      const pillCenterX = pillRect.left + pillRect.width / 2;
      const dist = Math.abs(centerX - pillCenterX);
      
      if (dist < minDistance) {
        minDistance = dist;
        closestPill = pill;
      }
    });

    const maxDistance = wrapperRect.width / 2;

    // Second pass: Apply styles
    pills.forEach(pill => {
      const pillRect = pill.getBoundingClientRect();
      const pillCenterX = pillRect.left + pillRect.width / 2;
      const distanceFromCenter = Math.abs(centerX - pillCenterX);
      
      // Calculate scale: center = 1.18, edges = 1.0
      const normalizedDistance = Math.min(distanceFromCenter / maxDistance, 1);
      const scale = 1 + (0.18 * (1 - normalizedDistance));
      
      // Calculate opacity: center = 1, edges fade more
      const opacity = 0.3 + (0.7 * (1 - normalizedDistance));
      
      pill.style.transform = `scale(${scale})`;
      pill.style.opacity = opacity;
      
      // Strict single highlight for the closest pill (if reasonably close)
      if (pill === closestPill && normalizedDistance < 0.2) {
        // ACTIVE STATE: Premium Highlight
        pill.style.background = 'rgba(217, 176, 140, 0.12)'; // Soft golden fill
        pill.style.color = '#F4D4A8'; // Bright Gold
        pill.style.borderColor = '#F4D4A8'; // Gold Border
        
        // Double Glow
        pill.style.boxShadow = 
          'inset 0 0 20px rgba(217, 176, 140, 0.3), ' + 
          '0 0 30px rgba(217, 176, 140, 0.2)';
          
        pill.style.filter = 'brightness(1.15)';
        pill.style.zIndex = '10';
      } else {
        // INACTIVE STATE: Light & Muted
        pill.style.background = 'transparent';
        pill.style.color = '#B7C9C4'; // Light muted turquoise/gray
        pill.style.borderColor = 'transparent'; // No border when inactive
        pill.style.boxShadow = 'none';
        pill.style.filter = 'brightness(1)';
        pill.style.zIndex = '1';
      }
    });
  }

  // Update on animation frame for smooth scaling
  function animate() {
    updatePillScales();
    requestAnimationFrame(animate);
  }

  animate();
}

// ============================================
// PARTICLE EFFECT - "Star Dust"
// ============================================

function initParticleEffect() {
  const canvas = document.querySelector('.languages-particles');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  let particles = [];
  let animationId;

  // Set canvas size
  function resizeCanvas() {
    const section = canvas.closest('.languages');
    canvas.width = section.offsetWidth;
    canvas.height = section.offsetHeight;
  }

  resizeCanvas();
  window.addEventListener('resize', resizeCanvas);

  // Particle class
  class Particle {
    constructor() {
      this.reset();
    }

    reset() {
      this.x = Math.random() * canvas.width;
      this.y = Math.random() * canvas.height;
      this.size = Math.random() * 1.5 + 0.5; // 0.5-2px
      this.speedX = (Math.random() - 0.5) * 0.3; // Very slow
      this.speedY = (Math.random() - 0.5) * 0.3;
      this.opacity = Math.random() * 0.3 + 0.1; // 0.1-0.4
      this.life = Math.random() * 200 + 100;
      this.age = 0;
    }

    update() {
      this.x += this.speedX;
      this.y += this.speedY;
      this.age++;

      // Fade in/out
      if (this.age < 50) {
        this.opacity = (this.age / 50) * 0.3;
      } else if (this.age > this.life - 50) {
        this.opacity = ((this.life - this.age) / 50) * 0.3;
      }

      // Reset if out of bounds or too old
      if (
        this.x < 0 ||
        this.x > canvas.width ||
        this.y < 0 ||
        this.y > canvas.height ||
        this.age >= this.life
      ) {
        this.reset();
      }
    }

    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(217, 176, 140, ${this.opacity})`; // Beige color
      ctx.fill();

      // Very subtle glow
      ctx.shadowBlur = 3;
      ctx.shadowColor = `rgba(217, 176, 140, ${this.opacity * 0.5})`;
      ctx.fill();
      ctx.shadowBlur = 0;
    }
  }

  // Create particles (very few for minimalism)
  for (let i = 0; i < 30; i++) {
    particles.push(new Particle());
  }

  // Animation loop
  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    particles.forEach(particle => {
      particle.update();
      particle.draw();
    });

    animationId = requestAnimationFrame(animate);
  }

  animate();

  // Pause when section is not visible (performance optimization)
  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          if (!animationId) animate();
        } else {
          cancelAnimationFrame(animationId);
          animationId = null;
        }
      });
    },
    { threshold: 0.1 }
  );

  observer.observe(canvas.closest('.languages'));
}

// ============================================
// INITIALIZATION
// ============================================

document.addEventListener('DOMContentLoaded', () => {
  initCarouselScaling();
  initParticleEffect();
});
