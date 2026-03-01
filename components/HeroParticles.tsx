'use client';

import { useEffect, useRef, useCallback } from 'react';

/**
 * HeroParticles Component
 * 
 * Creates an animated particle field with a barcode/scanning motif.
 * Uses HTML Canvas for performance (lighter than Three.js for this use case).
 * 
 * The particles form and animate around barcode lines, reacting to mouse movement.
 * Uses AllHalal green color (#00D094) instead of reference site's red.
 * 
 * Performance notes:
 * - On mobile: simplified animation with fewer particles
 * - Uses requestAnimationFrame for smooth 60fps animation
 * - Particles are recycled to avoid garbage collection
 */

interface Particle {
  x: number;
  y: number;
  baseX: number;
  baseY: number;
  size: number;
  alpha: number;
  speed: number;
  angle: number;
}

export default function HeroParticles() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const mouseRef = useRef({ x: 0, y: 0 });
  const animationRef = useRef<number>(0);
  const dimensionsRef = useRef({ width: 0, height: 0 });

  // Generate particles in a barcode pattern
  const generateParticles = useCallback((width: number, height: number) => {
    const particles: Particle[] = [];
    const isMobile = width < 768;
    const particleCount = isMobile ? 800 : 2000;
    
    // Barcode dimensions
    const barcodeWidth = isMobile ? width * 0.7 : width * 0.5;
    const barcodeHeight = isMobile ? height * 0.35 : height * 0.4;
    const startX = (width - barcodeWidth) / 2;
    const startY = (height - barcodeHeight) / 2 + (isMobile ? 0 : 20);
    
    // Generate barcode lines pattern
    const barCount = 35;
    const barsPattern: { x: number; width: number; height: number }[] = [];
    
    // Create varied bar widths like a real barcode
    for (let i = 0; i < barCount; i++) {
      const barWidth = Math.random() > 0.7 ? 3 : Math.random() > 0.4 ? 2 : 1;
      const x = startX + (barcodeWidth / barCount) * i;
      const heightVariation = 0.8 + Math.random() * 0.2;
      barsPattern.push({
        x,
        width: barWidth * (isMobile ? 2 : 3),
        height: barcodeHeight * heightVariation
      });
    }
    
    // Generate particles along barcode lines
    for (let i = 0; i < particleCount; i++) {
      const barIndex = Math.floor(Math.random() * barsPattern.length);
      const bar = barsPattern[barIndex];
      
      const x = bar.x + (Math.random() - 0.5) * bar.width;
      const yOffset = (Math.random() - 0.5) * bar.height;
      const y = startY + barcodeHeight / 2 + yOffset;
      
      particles.push({
        x,
        y,
        baseX: x,
        baseY: y,
        size: Math.random() * 1.5 + 0.5,
        alpha: Math.random() * 0.7 + 0.3,
        speed: Math.random() * 0.5 + 0.1,
        angle: Math.random() * Math.PI * 2
      });
    }
    
    // Add some scattered particles for atmosphere
    const scatterCount = isMobile ? 100 : 300;
    for (let i = 0; i < scatterCount; i++) {
      const x = Math.random() * width;
      const y = Math.random() * height;
      particles.push({
        x,
        y,
        baseX: x,
        baseY: y,
        size: Math.random() * 1 + 0.3,
        alpha: Math.random() * 0.3 + 0.1,
        speed: Math.random() * 0.3 + 0.05,
        angle: Math.random() * Math.PI * 2
      });
    }
    
    return particles;
  }, []);

  // Animation loop
  const animate = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    const { width, height } = dimensionsRef.current;
    const particles = particlesRef.current;
    const mouse = mouseRef.current;
    
    // Clear canvas
    ctx.clearRect(0, 0, width, height);
    
    // Draw and update particles
    particles.forEach((particle) => {
      // Mouse interaction
      const dx = mouse.x - particle.x;
      const dy = mouse.y - particle.y;
      const distance = Math.sqrt(dx * dx + dy * dy);
      const maxDistance = 150;
      
      if (distance < maxDistance) {
        const force = (maxDistance - distance) / maxDistance;
        const angle = Math.atan2(dy, dx);
        particle.x -= Math.cos(angle) * force * 2;
        particle.y -= Math.sin(angle) * force * 2;
      } else {
        // Return to base position
        particle.x += (particle.baseX - particle.x) * 0.05;
        particle.y += (particle.baseY - particle.y) * 0.05;
      }
      
      // Subtle floating animation
      particle.angle += particle.speed * 0.02;
      const floatX = Math.sin(particle.angle) * 0.5;
      const floatY = Math.cos(particle.angle * 0.5) * 0.5;
      
      // Draw particle
      ctx.beginPath();
      ctx.arc(
        particle.x + floatX,
        particle.y + floatY,
        particle.size,
        0,
        Math.PI * 2
      );
      
      // Black gradient based on position
      const gradient = ctx.createRadialGradient(
        particle.x + floatX,
        particle.y + floatY,
        0,
        particle.x + floatX,
        particle.y + floatY,
        particle.size * 2
      );
      gradient.addColorStop(0, `rgba(0, 0, 0, ${particle.alpha})`);
      gradient.addColorStop(1, `rgba(0, 0, 0, 0)`);
      
      ctx.fillStyle = gradient;
      ctx.fill();
    });
    
    // Add scan line effect
    const scanLineY = (Date.now() / 30) % height;
    const scanGradient = ctx.createLinearGradient(0, scanLineY - 30, 0, scanLineY + 30);
    scanGradient.addColorStop(0, 'rgba(151, 124, 88, 0)');
    scanGradient.addColorStop(0.5, 'rgba(151, 124, 88, 0.03)');
    scanGradient.addColorStop(1, 'rgba(151, 124, 88, 0)');
    ctx.fillStyle = scanGradient;
    ctx.fillRect(0, scanLineY - 30, width, 60);
    
    animationRef.current = requestAnimationFrame(animate);
  }, []);

  // Handle resize
  const handleResize = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();
    
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    
    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.scale(dpr, dpr);
    }
    
    dimensionsRef.current = { width: rect.width, height: rect.height };
    particlesRef.current = generateParticles(rect.width, rect.height);
  }, [generateParticles]);

  // Handle mouse move
  const handleMouseMove = useCallback((e: MouseEvent) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const rect = canvas.getBoundingClientRect();
    mouseRef.current = {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    };
  }, []);

  // Handle touch move for mobile
  const handleTouchMove = useCallback((e: TouchEvent) => {
    const canvas = canvasRef.current;
    if (!canvas || !e.touches[0]) return;
    
    const rect = canvas.getBoundingClientRect();
    mouseRef.current = {
      x: e.touches[0].clientX - rect.left,
      y: e.touches[0].clientY - rect.top
    };
  }, []);

  useEffect(() => {
    handleResize();
    
    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('touchmove', handleTouchMove, { passive: true });
    
    animationRef.current = requestAnimationFrame(animate);
    
    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchmove', handleTouchMove);
      cancelAnimationFrame(animationRef.current);
    };
  }, [handleResize, handleMouseMove, handleTouchMove, animate]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{
        background: 'transparent',
        opacity: 0.8
      }}
      aria-hidden="true"
    />
  );
}
