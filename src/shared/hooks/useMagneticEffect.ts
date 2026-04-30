/**
 * @module useMagneticEffect
 * @description Magnetic cursor attraction effect for interactive elements
 * @performance RAF-optimized, distance-based calculations
 */

import { useRef, useEffect, useCallback } from 'react';
import gsap from 'gsap';

interface MagneticOptions {
  strength?: number;
  radius?: number;
  ease?: number;
}

export function useMagneticEffect<T extends HTMLElement>(options: MagneticOptions = {}) {
  const { strength = 0.3, radius = 100, ease = 0.15 } = options;
  const elementRef = useRef<T>(null);
  const positionRef = useRef({ x: 0, y: 0 });
  const rafRef = useRef<number | null>(null);

  const animate = useCallback(() => {
    if (!elementRef.current) return;

    gsap.to(elementRef.current, {
      x: positionRef.current.x,
      y: positionRef.current.y,
      duration: ease,
      ease: 'power2.out',
    });

    rafRef.current = null;
  }, [ease]);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = element.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      
      const distanceX = e.clientX - centerX;
      const distanceY = e.clientY - centerY;
      const distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);

      if (distance < radius) {
        const factor = 1 - distance / radius;
        positionRef.current = {
          x: distanceX * strength * factor,
          y: distanceY * strength * factor,
        };
      } else {
        positionRef.current = { x: 0, y: 0 };
      }

      if (!rafRef.current) {
        rafRef.current = requestAnimationFrame(animate);
      }
    };

    const handleMouseLeave = () => {
      positionRef.current = { x: 0, y: 0 };
      if (!rafRef.current) {
        rafRef.current = requestAnimationFrame(animate);
      }
    };

    element.addEventListener('mousemove', handleMouseMove, { passive: true });
    element.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      element.removeEventListener('mousemove', handleMouseMove);
      element.removeEventListener('mouseleave', handleMouseLeave);
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, [strength, radius, animate]);

  return elementRef;
}
