/**
 * @module useScrollProgress
 * @description GSAP ScrollTrigger-based scroll progress tracking
 * @performance Throttled updates, RAF-optimized
 */

import { useEffect, useRef, useCallback } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useAppStore, selectSetScroll, selectScroll } from '@/app/store';
import type { ScrollState, SectionId } from '@/types';

gsap.registerPlugin(ScrollTrigger);

interface UseScrollProgressOptions {
  sections?: SectionId[];
  throttleMs?: number;
}

export function useScrollProgress(options: UseScrollProgressOptions = {}) {
  const { sections = ['hero', 'about', 'skills', 'projects', 'experience', 'events', 'contact'] } = options;
  const setScroll = useAppStore(selectSetScroll);
  const scrollState = useAppStore(selectScroll);
  const triggersRef = useRef<ScrollTrigger[]>([]);
  const sectionRef = useRef<SectionId>(scrollState.section as SectionId);
  const progressRef = useRef<number>(scrollState.progress);

  const updateScrollState = useCallback(
    (nextProgress: number, nextSection: SectionId, velocity: number) => {
      const clampedProgress = Math.min(1, Math.max(0, nextProgress));
      const direction: ScrollState['direction'] = velocity > 0 ? 'down' : 'up';
      const absVelocity = Math.abs(velocity);

      const progressChanged = Math.abs(progressRef.current - clampedProgress) > 0.001;
      const sectionChanged = sectionRef.current !== nextSection;

      if (!progressChanged && !sectionChanged) return;

      progressRef.current = clampedProgress;
      sectionRef.current = nextSection;

      setScroll({
        progress: clampedProgress,
        section: nextSection,
        direction,
        velocity: absVelocity,
      });
    },
    [setScroll]
  );

  useEffect(() => {
    // Clear any existing triggers
    triggersRef.current.forEach(trigger => trigger.kill());
    triggersRef.current = [];

    // Simple scroll event listener with RAF for progress tracking
    let rafId: number | null = null;
    let lastScrollY = 0;
    let lastTimestamp = 0;

    const handleScroll = (timestamp: number) => {
      const scrollY = window.scrollY;
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      const progress = maxScroll > 0 ? scrollY / maxScroll : 0;

      // Calculate velocity (pixels per second)
      const timeDelta = timestamp - lastTimestamp;
      const scrollDelta = scrollY - lastScrollY;
      const velocity = timeDelta > 0 ? (scrollDelta / timeDelta) * 1000 : 0;

      updateScrollState(progress, sectionRef.current, velocity);

      lastScrollY = scrollY;
      lastTimestamp = timestamp;
      rafId = null;
    };

    const onScroll = () => {
      if (!rafId) {
        rafId = requestAnimationFrame(handleScroll);
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });

    // Create section-specific triggers
    sections.forEach((sectionId) => {
      const sectionTrigger = ScrollTrigger.create({
        trigger: `#${sectionId}`,
        start: 'top center',
        end: 'bottom center',
        onEnter: () => {
          sectionRef.current = sectionId;
          updateScrollState(progressRef.current, sectionId, 1);
        },
        onEnterBack: () => {
          sectionRef.current = sectionId;
          updateScrollState(progressRef.current, sectionId, -1);
        },
      });
      triggersRef.current.push(sectionTrigger);
    });

    return () => {
      window.removeEventListener('scroll', onScroll);
      if (rafId) cancelAnimationFrame(rafId);
      triggersRef.current.forEach(trigger => trigger.kill());
      triggersRef.current = [];
    };
  }, [sections, updateScrollState]);

  return scrollState;
}
