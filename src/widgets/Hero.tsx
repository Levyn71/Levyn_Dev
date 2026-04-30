/**
 * @module Hero
 * @description Hero section with 3D scene and animated text
 * @performance Optimized for initial page load
 */

import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { Hero3DScene } from '@/features';
import { Button, AnimatedText } from '@/shared/ui';
import { portfolioData } from '@/shared/config';
import { useAppStore, selectCursor } from '@/app/store';
import { useInView } from '@/shared/hooks';

export const Hero: React.FC = () => {
  const cursor = useAppStore(selectCursor);
  const containerRef = useRef<HTMLElement>(null);
  const { ref, isInView } = useInView<HTMLDivElement>({ threshold: 0.1 });

  useEffect(() => {
    if (!isInView) return;

    // Animate entrance
    const ctx = gsap.context(() => {
      gsap.from('.hero-title', {
        y: 50,
        opacity: 0,
        duration: 1,
        stagger: 0.1,
        ease: 'power3.out',
      });

      gsap.from('.hero-cta', {
        y: 30,
        opacity: 0,
        duration: 0.8,
        delay: 0.6,
        ease: 'power3.out',
      });
    }, containerRef);

    return () => ctx.revert();
  }, [isInView]);

  return (
    <section
      id="hero"
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* 3D Background */}
      <div ref={ref} className="absolute inset-0">
        <Hero3DScene mouseX={cursor.normalizedX} mouseY={cursor.normalizedY} />
      </div>

      {/* Content overlay */}
      <div className="relative z-10 text-center px-4 max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-6"
        >
          <motion.span
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-accent-1/20 text-accent-1 font-mono text-base font-semibold border-2 border-accent-1/40 shadow-[0_0_20px_rgba(99,102,241,0.3)] backdrop-blur-sm"
            animate={{
              boxShadow: [
                '0 0 20px rgba(99,102,241,0.3)',
                '0 0 40px rgba(99,102,241,0.5)',
                '0 0 20px rgba(99,102,241,0.3)',
              ],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          >
            <span className="w-2.5 h-2.5 rounded-full bg-green-400 animate-pulse" />
            Available for new projects
          </motion.span>
        </motion.div>

        <h1 className="hero-title font-display text-5xl md:text-7xl lg:text-8xl font-bold text-white mb-6">
          <span className="block">{portfolioData.name}</span>
          <span className="block mt-2 bg-gradient-to-r from-accent-1 via-accent-2 to-accent-3 bg-clip-text text-transparent">
            {portfolioData.role}
          </span>
        </h1>

        <p className="hero-title text-lg md:text-xl text-slate-400 max-w-2xl mx-auto mb-10 leading-relaxed">
          {portfolioData.tagline}
        </p>

        <div className="hero-cta flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Button
            size="lg"
            magnetic
            onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
          >
            View Projects
          </Button>
          <Button
            variant="outline"
            size="lg"
            magnetic
            onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
          >
            Get in Touch
          </Button>
        </div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-10 left-1/2 -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        >
          <div className="w-6 h-10 rounded-full border-2 border-slate-600 flex justify-center pt-2">
            <motion.div
              className="w-1.5 h-1.5 rounded-full bg-accent-1"
              animate={{ y: [0, 12, 0], opacity: [1, 0.3, 1] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            />
          </div>
        </motion.div>
      </div>

      {/* Gradient overlay at bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-void to-transparent" />
    </section>
  );
};
