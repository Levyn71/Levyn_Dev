/**
 * @module MagneticCursor
 * @description Custom cursor with blend-mode difference and magnetic effect
 * @performance RAF-based, respects reduced-motion preference
 */

import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { useAppStore, selectCursor, selectReducedMotion } from '@/app/store';

interface CursorState {
  x: number;
  y: number;
  isHovering: boolean;
  isPointer: boolean;
}

export const MagneticCursor: React.FC = () => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const cursorDotRef = useRef<HTMLDivElement>(null);
  const [cursorState, setCursorState] = useState<CursorState>({
    x: 0,
    y: 0,
    isHovering: false,
    isPointer: false,
  });
  
  const storeCursor = useAppStore(selectCursor);
  const reducedMotion = useAppStore(selectReducedMotion);
  const posRef = useRef({ x: 0, y: 0 });
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    if (reducedMotion) return;

    const handleMouseMove = (e: MouseEvent) => {
      posRef.current = { x: e.clientX, y: e.clientY };
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const isInteractive = 
        target.tagName === 'BUTTON' ||
        target.tagName === 'A' ||
        target.closest('button') ||
        target.closest('a') ||
        target.dataset.cursor === 'pointer';
      
      setCursorState((prev) => ({
        ...prev,
        isHovering: isInteractive,
        isPointer: isInteractive,
      }));
    };

    const animate = () => {
      if (!cursorRef.current || !cursorDotRef.current) return;

      // Smooth follow for main cursor
      gsap.to(cursorRef.current, {
        x: posRef.current.x,
        y: posRef.current.y,
        duration: 0.5,
        ease: 'power3.out',
      });

      // Faster follow for dot
      gsap.to(cursorDotRef.current, {
        x: posRef.current.x,
        y: posRef.current.y,
        duration: 0.1,
        ease: 'power2.out',
      });

      rafRef.current = requestAnimationFrame(animate);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mouseover', handleMouseOver, { passive: true });
    rafRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseover', handleMouseOver);
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, [reducedMotion]);

  // Hide on touch devices
  const [isTouch, setIsTouch] = useState(false);
  
  useEffect(() => {
    setIsTouch(window.matchMedia('(pointer: coarse)').matches);
  }, []);

  if (isTouch || reducedMotion) return null;

  return (
    <>
      {/* Main cursor ring */}
      <div
        ref={cursorRef}
        className={`fixed top-0 left-0 pointer-events-none z-[9999] -translate-x-1/2 -translate-y-1/2
          mix-blend-difference transition-transform duration-300
          ${cursorState.isHovering ? 'scale-150' : 'scale-100'}`}
        style={{ willChange: 'transform' }}
      >
        <div
          className={`w-10 h-10 rounded-full border-2 border-white
            transition-all duration-300
            ${cursorState.isPointer ? 'bg-white/20' : 'bg-transparent'}`}
        />
      </div>

      {/* Center dot */}
      <div
        ref={cursorDotRef}
        className="fixed top-0 left-0 pointer-events-none z-[9999] -translate-x-1/2 -translate-y-1/2
          mix-blend-difference"
        style={{ willChange: 'transform' }}
      >
        <div className={`w-1.5 h-1.5 rounded-full bg-white transition-transform duration-150
          ${cursorState.isHovering ? 'scale-0' : 'scale-100'}`}
        />
      </div>

      {/* Hide default cursor */}
      <style>{`
        * {
          cursor: none !important;
        }
        @media (pointer: coarse) {
          * {
            cursor: auto !important;
          }
        }
      `}</style>
    </>
  );
};
