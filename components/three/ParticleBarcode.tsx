"use client";

/**
 * ═══════════════════════════════════════════════════════════════════════════════
 * PARTICLE BARCODE - Horizontal Barcode with Scan Frame
 * ═══════════════════════════════════════════════════════════════════════════════
 * 
 * Realistic HORIZONTAL barcode made of particles:
 * - Wide format (width > height)
 * - Variable bar widths and gaps for realism
 * - White glowing corner brackets (scan frame)
 * - Horizontal scan line moving TOP to BOTTOM
 * - Premium particle animation
 * 
 * ═══════════════════════════════════════════════════════════════════════════════
 */

import { useEffect, useRef, useCallback } from "react";

interface Particle {
  x: number;
  y: number;
  originX: number;
  originY: number;
  size: number;
  alpha: number;
  phase: number;
}

// Noise function
function createNoise() {
  const perm = new Uint8Array(512);
  for (let i = 0; i < 256; i++) perm[i] = perm[i + 256] = Math.floor(Math.random() * 256);
  return (x: number, y: number, z: number): number => {
    const X = Math.floor(x) & 255, Y = Math.floor(y) & 255, Z = Math.floor(z) & 255;
    x -= Math.floor(x); y -= Math.floor(y); z -= Math.floor(z);
    const u = x * x * x * (x * (x * 6 - 15) + 10);
    const v = y * y * y * (y * (y * 6 - 15) + 10);
    const w = z * z * z * (z * (z * 6 - 15) + 10);
    const a = perm[X] + Y, b = perm[X + 1] + Y;
    return ((1 - w) * ((1 - v) * ((1 - u) * perm[perm[a] + Z] + u * perm[perm[b] + Z]) + 
      v * ((1 - u) * perm[perm[a + 1] + Z] + u * perm[perm[b + 1] + Z])) +
      w * ((1 - v) * ((1 - u) * perm[perm[a] + Z + 1] + u * perm[perm[b] + Z + 1]) + 
      v * ((1 - u) * perm[perm[a + 1] + Z + 1] + u * perm[perm[b + 1] + Z + 1]))) / 255 - 0.5;
  };
}

// Generate realistic barcode pattern with variable widths and gaps
function generateBarcodePattern(): { width: number; isBar: boolean; density: number }[] {
  const pattern: { width: number; isBar: boolean; density: number }[] = [];
  
  // Start guard (narrow bars)
  pattern.push({ width: 1, isBar: true, density: 1.0 });
  pattern.push({ width: 0.8, isBar: false, density: 0 });
  pattern.push({ width: 1, isBar: true, density: 1.0 });
  pattern.push({ width: 1.2 + Math.random() * 0.5, isBar: false, density: 0 }); // Variable gap
  
  // Left section - 6 digits with variable widths
  for (let i = 0; i < 6; i++) {
    const barWidth = 1.5 + Math.random() * 2; // 1.5 to 3.5
    const gapWidth = 0.6 + Math.random() * 1.2; // 0.6 to 1.8
    const density = 0.7 + Math.random() * 0.3; // 0.7 to 1.0
    
    pattern.push({ width: barWidth, isBar: true, density });
    pattern.push({ width: gapWidth, isBar: false, density: 0 });
    
    // Sometimes add extra thin bar
    if (Math.random() > 0.6) {
      pattern.push({ width: 0.8 + Math.random() * 0.6, isBar: true, density: 0.8 });
      pattern.push({ width: 0.5 + Math.random() * 0.8, isBar: false, density: 0 });
    }
  }
  
  // Center guard (narrow bars)
  pattern.push({ width: 0.8, isBar: false, density: 0 });
  pattern.push({ width: 1, isBar: true, density: 1.0 });
  pattern.push({ width: 0.8, isBar: false, density: 0 });
  pattern.push({ width: 1, isBar: true, density: 1.0 });
  pattern.push({ width: 0.8, isBar: false, density: 0 });
  pattern.push({ width: 1, isBar: true, density: 1.0 });
  pattern.push({ width: 1.0 + Math.random() * 0.5, isBar: false, density: 0 });
  
  // Right section - 6 digits with variable widths
  for (let i = 0; i < 6; i++) {
    const barWidth = 1.5 + Math.random() * 2;
    const gapWidth = 0.6 + Math.random() * 1.2;
    const density = 0.7 + Math.random() * 0.3;
    
    pattern.push({ width: barWidth, isBar: true, density });
    pattern.push({ width: gapWidth, isBar: false, density: 0 });
    
    if (Math.random() > 0.6) {
      pattern.push({ width: 0.8 + Math.random() * 0.6, isBar: true, density: 0.8 });
      pattern.push({ width: 0.5 + Math.random() * 0.8, isBar: false, density: 0 });
    }
  }
  
  // End guard
  pattern.push({ width: 1, isBar: true, density: 1.0 });
  pattern.push({ width: 0.8, isBar: false, density: 0 });
  pattern.push({ width: 1, isBar: true, density: 1.0 });
  
  return pattern;
}

export default function ParticleBarcode({ className = "" }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>(0);
  const particlesRef = useRef<Particle[]>([]);
  const mouseRef = useRef({ x: 9999, y: 9999 });
  const timeRef = useRef(0);
  const noiseRef = useRef(createNoise());
  const scanLineRef = useRef(0);
  const barcodeRef = useRef({ x: 0, y: 0, width: 0, height: 0 });
  const patternRef = useRef(generateBarcodePattern());

  const generateParticles = useCallback((width: number, height: number) => {
    const particles: Particle[] = [];
    
    // HORIZONTAL barcode - wider than tall (ratio ~2.5:1)
    const barcodeWidth = Math.min(width * 0.9, 450);
    const barcodeHeight = barcodeWidth * 0.4;
    const startX = (width - barcodeWidth) / 2;
    const startY = (height - barcodeHeight) / 2;
    
    barcodeRef.current = { x: startX, y: startY, width: barcodeWidth, height: barcodeHeight };
    
    const pattern = patternRef.current;
    const totalUnits = pattern.reduce((sum, item) => sum + item.width, 0);
    const unitWidth = barcodeWidth / totalUnits;
    
    let currentX = startX;
    
    pattern.forEach((item) => {
      const actualWidth = item.width * unitWidth;
      
      if (item.isBar && item.density > 0) {
        // Calculate dot density based on bar width and density factor
        const baseDots = Math.max(2, Math.ceil(item.width * 2));
        const dotsAcross = Math.ceil(baseDots * item.density);
        const dotsDown = Math.ceil(barcodeHeight / 4);
        
        for (let col = 0; col < dotsAcross; col++) {
          for (let row = 0; row < dotsDown; row++) {
            // Skip some particles randomly for thinner bars
            if (Math.random() > item.density * 1.1) continue;
            
            const xRatio = (col + 0.5) / dotsAcross;
            const x = currentX + xRatio * actualWidth;
            const yRatio = (row + 0.5) / dotsDown;
            const y = startY + yRatio * barcodeHeight;
            
            // Organic scatter
            const scatterX = (Math.random() - 0.5) * actualWidth * 0.3;
            const scatterY = (Math.random() - 0.5) * 4;
            
            // Edge falloff (horizontal)
            const edgeX = Math.min(
              (x - startX) / (barcodeWidth * 0.06),
              (startX + barcodeWidth - x) / (barcodeWidth * 0.06)
            );
            const falloffX = Math.min(1, Math.max(0, edgeX));
            
            // Edge falloff (vertical)
            const edgeY = Math.min(
              (y - startY) / (barcodeHeight * 0.08),
              (startY + barcodeHeight - y) / (barcodeHeight * 0.08)
            );
            const falloffY = Math.min(1, Math.max(0, edgeY));
            
            const finalAlpha = (0.55 + Math.random() * 0.45) * falloffX * falloffY * item.density;
            
            if (finalAlpha > 0.12) {
              particles.push({
                x: x + scatterX,
                y: y + scatterY,
                originX: x + scatterX,
                originY: y + scatterY,
                size: 1.2 + Math.random() * 0.6 * item.density,
                alpha: finalAlpha,
                phase: Math.random() * Math.PI * 2,
              });
            }
          }
        }
        
        // Soft edge particles
        for (let i = 0; i < item.width * 3; i++) {
          const side = Math.random() > 0.5 ? 1 : -1;
          const x = currentX + (side > 0 ? actualWidth : 0) + side * Math.random() * 2;
          const y = startY + Math.random() * barcodeHeight;
          
          const edgeFalloff = Math.min(
            (x - startX) / (barcodeWidth * 0.1),
            (startX + barcodeWidth - x) / (barcodeWidth * 0.1)
          );
          
          if (x > startX && x < startX + barcodeWidth && edgeFalloff > 0) {
            particles.push({
              x, y, originX: x, originY: y,
              size: 0.6 + Math.random() * 0.4,
              alpha: (0.12 + Math.random() * 0.2) * Math.min(1, edgeFalloff),
              phase: Math.random() * Math.PI * 2,
            });
          }
        }
      }
      
      currentX += actualWidth;
    });
    
    return particles;
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio, 2);
      const parent = canvas.parentElement;
      if (!parent) return;
      const rect = parent.getBoundingClientRect();
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.scale(dpr, dpr);
      canvas.style.width = `${rect.width}px`;
      canvas.style.height = `${rect.height}px`;
      particlesRef.current = generateParticles(rect.width, rect.height);
    };

    resize();
    window.addEventListener("resize", resize);

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current.x = e.clientX - rect.left;
      mouseRef.current.y = e.clientY - rect.top;
    };
    window.addEventListener("mousemove", handleMouseMove);

    const noise = noiseRef.current;
    
    // Draw WHITE corner brackets (scan frame)
    const drawCorners = (ctx: CanvasRenderingContext2D, time: number) => {
      const { x, y, width, height } = barcodeRef.current;
      const cornerSize = 22;
      const offset = 12;
      const lineWidth = 2;
      
      // Subtle pulsing
      const pulse = 0.85 + Math.sin(time * 1.5) * 0.15;
      
      // White color with glow
      ctx.strokeStyle = `rgba(151, 124, 88, ${pulse})`;
      ctx.lineWidth = lineWidth;
      ctx.lineCap = "round";
      ctx.lineJoin = "round";
      
      // White glow effect
      ctx.shadowColor = "rgba(151, 124, 88, 0.7)";
      ctx.shadowBlur = 12;
      
      // Top-left corner
      ctx.beginPath();
      ctx.moveTo(x - offset, y - offset + cornerSize);
      ctx.lineTo(x - offset, y - offset);
      ctx.lineTo(x - offset + cornerSize, y - offset);
      ctx.stroke();
      
      // Top-right corner
      ctx.beginPath();
      ctx.moveTo(x + width + offset - cornerSize, y - offset);
      ctx.lineTo(x + width + offset, y - offset);
      ctx.lineTo(x + width + offset, y - offset + cornerSize);
      ctx.stroke();
      
      // Bottom-left corner
      ctx.beginPath();
      ctx.moveTo(x - offset, y + height + offset - cornerSize);
      ctx.lineTo(x - offset, y + height + offset);
      ctx.lineTo(x - offset + cornerSize, y + height + offset);
      ctx.stroke();
      
      // Bottom-right corner
      ctx.beginPath();
      ctx.moveTo(x + width + offset - cornerSize, y + height + offset);
      ctx.lineTo(x + width + offset, y + height + offset);
      ctx.lineTo(x + width + offset, y + height + offset - cornerSize);
      ctx.stroke();
      
      ctx.shadowBlur = 0;
    };
    
    const animate = () => {
      animationRef.current = requestAnimationFrame(animate);
      timeRef.current += 0.008;
      
      const parent = canvas.parentElement;
      if (!parent) return;
      const rect = parent.getBoundingClientRect();
      
      ctx.clearRect(0, 0, rect.width, rect.height);
      
      const particles = particlesRef.current;
      const mouse = mouseRef.current;
      const time = timeRef.current;
      const barcode = barcodeRef.current;
      
      // HORIZONTAL scan line moving TOP to BOTTOM
      // Extended range: starts above barcode, ends below
      const scanRange = barcode.height + 40; // Extra space above and below
      scanLineRef.current = (scanLineRef.current + 0.35) % scanRange;
      const scanY = barcode.y - 20 + scanLineRef.current;
      
      // Calculate scan line brightness based on position
      // Brightest in the CENTER of barcode, fades at top and bottom
      const barcodeCenterY = barcode.y + barcode.height / 2;
      const distanceFromCenter = Math.abs(scanY - barcodeCenterY);
      const maxDistance = barcode.height / 2 + 20; // Half height + margin
      
      // Smooth brightness curve: 1.0 at center, ~0.1 at edges
      // Using cosine for ultra-smooth falloff
      const normalizedDist = Math.min(distanceFromCenter / maxDistance, 1);
      const scanLineBrightness = Math.cos(normalizedDist * Math.PI * 0.5) * 0.85 + 0.1;
      
      // Draw particles
      particles.forEach((p) => {
        // Noise movement
        const noiseX = noise(p.originX * 0.008, p.originY * 0.008, time) * 3;
        const noiseY = noise(p.originX * 0.008 + 50, p.originY * 0.008, time) * 3;
        
        // Breathing
        const breathe = Math.sin(time * 1.2 + p.phase) * 1;
        
        // Mouse interaction
        const dx = mouse.x - p.originX;
        const dy = mouse.y - p.originY;
        const dist = Math.sqrt(dx * dx + dy * dy);
        let pushX = 0, pushY = 0;
        if (dist < 60 && dist > 0) {
          const force = (1 - dist / 60) * 12;
          pushX = -(dx / dist) * force;
          pushY = -(dy / dist) * force;
        }
        
        p.x = p.originX + noiseX + pushX;
        p.y = p.originY + noiseY + breathe + pushY;
        
        // HORIZONTAL scan line highlight (modulated by line brightness)
        const scanDist = Math.abs(p.y - scanY);
        const rawHighlight = scanDist < 15 ? (1 - scanDist / 15) * 0.5 : 0;
        // Apply brightness falloff to particle highlight too
        const scanHighlight = rawHighlight * scanLineBrightness;
        
        const finalAlpha = Math.min(1, p.alpha + scanHighlight);
        
        // Black base color, caramel when highlighted
        const r = Math.floor(0 + scanHighlight * 151);
        const g = Math.floor(0 + scanHighlight * 124);
        const b = Math.floor(0 + scanHighlight * 88);
        
        // Draw particle
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${finalAlpha * 0.95})`;
        ctx.fill();
        
        // Glow for scan highlight (also affected by brightness)
        if (scanHighlight > 0.15 && scanLineBrightness > 0.3) {
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size * 2.5, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(151, 124, 88, ${scanHighlight * 0.15 * scanLineBrightness})`;
          ctx.fill();
        }
      });
      
      // Draw HORIZONTAL WHITE scan line (top to bottom, with taper + brightness falloff)
      const lineWidth = barcode.width * 0.85;
      const lineStartX = barcode.x + (barcode.width - lineWidth) / 2;
      
      // Apply brightness to all alpha values
      const mainAlpha = 0.9 * scanLineBrightness;
      const sideAlpha = 0.6 * scanLineBrightness;
      const glowAlpha = 0.8 * scanLineBrightness;
      
      // Create horizontal gradient for taper effect (fade at edges)
      const gradient = ctx.createLinearGradient(
        lineStartX, scanY,
        lineStartX + lineWidth, scanY
      );
      gradient.addColorStop(0, `rgba(151, 124, 88, 0)`);
      gradient.addColorStop(0.15, `rgba(151, 124, 88, ${sideAlpha})`);
      gradient.addColorStop(0.5, `rgba(151, 124, 88, ${mainAlpha})`);
      gradient.addColorStop(0.85, `rgba(151, 124, 88, ${sideAlpha})`);
      gradient.addColorStop(1, `rgba(151, 124, 88, 0)`);
      
      // Draw scan line with glow (glow also affected by brightness)
      ctx.shadowColor = `rgba(151, 124, 88, ${glowAlpha})`;
      ctx.shadowBlur = 10 * scanLineBrightness;
      
      // Main line (thicker in center via multiple passes)
      ctx.fillStyle = gradient;
      ctx.fillRect(lineStartX, scanY - 1, lineWidth, 2);
      
      // Additional pass for center thickness
      const centerAlpha = 0.5 * scanLineBrightness;
      const centerSideAlpha = 0.3 * scanLineBrightness;
      const centerGradient = ctx.createLinearGradient(
        lineStartX, scanY,
        lineStartX + lineWidth, scanY
      );
      centerGradient.addColorStop(0, `rgba(151, 124, 88, 0)`);
      centerGradient.addColorStop(0.3, `rgba(151, 124, 88, ${centerSideAlpha})`);
      centerGradient.addColorStop(0.5, `rgba(151, 124, 88, ${centerAlpha})`);
      centerGradient.addColorStop(0.7, `rgba(151, 124, 88, ${centerSideAlpha})`);
      centerGradient.addColorStop(1, `rgba(151, 124, 88, 0)`);
      
      ctx.fillStyle = centerGradient;
      ctx.fillRect(lineStartX, scanY - 2, lineWidth, 4);
      
      ctx.shadowBlur = 0;
      
      // Draw white glowing corners
      drawCorners(ctx, time);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationRef.current);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [generateParticles]);

  return (
    <canvas
      ref={canvasRef}
      className={`w-full h-full ${className}`}
      style={{ display: "block" }}
    />
  );
}
