/**
 * @module useMousePosition
 * @description Global mouse position tracking with RAF optimization
 * @performance RAF-based updates, memoized calculations
 */

import { useEffect, useRef, useCallback } from 'react';
import { useAppStore, selectSetCursor, selectCursor } from '@/app/store';

interface MousePosition {
  x: number;
  y: number;
  normalizedX: number;
  normalizedY: number;
}

export function useMousePosition() {
  const setCursor = useAppStore(selectSetCursor);
  const cursorState = useAppStore(selectCursor);
  const rafId = useRef<number | null>(null);
  const mouseRef = useRef({ x: 0, y: 0 });

  const updatePosition = useCallback(() => {
    const { innerWidth, innerHeight } = window;
    const normalizedX = (mouseRef.current.x / innerWidth) * 2 - 1;
    const normalizedY = -(mouseRef.current.y / innerHeight) * 2 + 1;

    setCursor({
      x: mouseRef.current.x,
      y: mouseRef.current.y,
      normalizedX,
      normalizedY,
    });

    rafId.current = null;
  }, [setCursor]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
      
      if (!rafId.current) {
        rafId.current = requestAnimationFrame(updatePosition);
      }
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      if (rafId.current) {
        cancelAnimationFrame(rafId.current);
      }
    };
  }, [updatePosition]);

  return cursorState;
}

export function useNormalizedMousePosition(): MousePosition {
  const cursor = useMousePosition();
  
  return {
    x: cursor.x,
    y: cursor.y,
    normalizedX: cursor.normalizedX,
    normalizedY: cursor.normalizedY,
  };
}
