/**
 * @module gsap-helpers
 * @description GSAP animation configuration and utilities
 */

import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const GSAPHelpers = {
  // Standard animation presets
  fadeInUp: {
    opacity: 0,
    y: 30,
    duration: 0.6,
    ease: 'power3.out',
  },

  fadeIn: {
    opacity: 0,
    duration: 0.6,
    ease: 'power2.out',
  },

  scaleIn: {
    opacity: 0,
    scale: 0.9,
    duration: 0.5,
    ease: 'back.out(1.7)',
  },

  slideInLeft: {
    opacity: 0,
    x: -50,
    duration: 0.6,
    ease: 'power3.out',
  },

  slideInRight: {
    opacity: 0,
    x: 50,
    duration: 0.6,
    ease: 'power3.out',
  },

  // Stagger configuration
  stagger: {
    amount: 0.3,
    from: 'start',
    ease: 'power2.out',
  },

  // Create scroll-triggered animation
  createScrollTrigger(
    element: string | Element | Element[] | gsap.DOMTarget,
    animation: gsap.TweenVars,
    triggerOptions: ScrollTrigger.Vars = {}
  ): gsap.core.Timeline {
    return gsap.timeline({
      scrollTrigger: {
        trigger: element,
        start: 'top 80%',
        end: 'bottom 20%',
        toggleActions: 'play none none reverse',
        ...triggerOptions,
      },
    }).from(element, animation);
  },

  // Batch animations for multiple elements
  batchAnimate(
    selector: string,
    animation: gsap.TweenVars,
    interval: number = 0.08
  ): void {
    const elements = gsap.utils.toArray(selector);
    gsap.from(elements, {
      ...animation,
      stagger: interval,
      scrollTrigger: {
        trigger: selector,
        start: 'top 85%',
      },
    });
  },

  // Kill all ScrollTriggers (cleanup)
  killAll(): void {
    ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
  },

  // Refresh ScrollTrigger (after DOM changes)
  refresh(): void {
    ScrollTrigger.refresh();
  },
};
