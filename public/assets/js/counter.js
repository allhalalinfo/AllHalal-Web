/* ===============================================
   ALLHALAL - PREMIUM COUNTER ANIMATION
   Elegant number counting for key metrics
   =============================================== */

(function() {
    'use strict';
    
    // Easing function for smooth animation
    const easeOutQuart = (t) => 1 - Math.pow(1 - t, 4);
    
    // Format number with commas
    const formatNumber = (num) => {
        return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '+';
    };
    
    // Animate counter
    const animateCounter = (element, target, duration = 2000) => {
        const start = 0;
        const startTime = performance.now();
        
        const updateCounter = (currentTime) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            
            // Apply easing
            const easedProgress = easeOutQuart(progress);
            const current = Math.floor(start + (target - start) * easedProgress);
            
            element.textContent = formatNumber(current);
            
            if (progress < 1) {
                requestAnimationFrame(updateCounter);
            } else {
                element.textContent = formatNumber(target);
            }
        };
        
        requestAnimationFrame(updateCounter);
    };
    
    // Initialize counter on page load
    const initCounter = () => {
        // Support both old and new class names
        const counterElement = document.querySelector('.hero-number[data-target], .hero-number-new[data-target]');
        
        if (!counterElement) return;
        
        const target = parseInt(counterElement.getAttribute('data-target'), 10);
        
        // Start animation with a small delay for elegance
        // Duration increased to 4 seconds for more premium feel
        setTimeout(() => {
            animateCounter(counterElement, target, 4000);
        }, 300);
    };
    
    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initCounter);
    } else {
        initCounter();
    }
    
})();

