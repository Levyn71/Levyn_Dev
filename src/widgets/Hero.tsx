/**
 * @module Hero
 * @description Hero section with animated headline and primary CTAs
 * @performance Optimized for initial load, entrance animation gated by useInView
 */

import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { Button, SocialIcon, Typewriter } from '@/shared/ui';
import { portfolioData, PRIMARY_SOCIAL_PLATFORMS } from '@/shared/config';
import { useInView } from '@/shared/hooks';

export const Hero: React.FC = () => {
  const containerRef = useRef<HTMLElement>(null);
  const { ref, isInView } = useInView<HTMLDivElement>({ threshold: 0.1 });

  useEffect(() => {
    if (!isInView) return;

    const ctx = gsap.context(() => {
      gsap.from('.hero-animate', {
        y: 40,
        opacity: 0,
        duration: 0.9,
        stagger: 0.12,
        delay: 0.15,
        ease: 'power3.out',
      });
    }, containerRef);

    return () => ctx.revert();
  }, [isInView]);

  return (
    <section
      id="hero"
      ref={containerRef}
      className="relative flex min-h-screen items-center justify-center overflow-hidden px-6 pt-28 pb-24"
    >
      {/* Ambient gradient glows */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -left-32 -top-40 h-[34rem] w-[34rem] rounded-full bg-accent-1/20 blur-[130px]" />
        <div className="absolute -right-32 top-1/4 h-[30rem] w-[30rem] rounded-full bg-accent-2/15 blur-[130px]" />
        <div className="absolute -bottom-40 left-1/2 h-[26rem] w-[42rem] -translate-x-1/2 rounded-full bg-accent-3/10 blur-[150px]" />
      </div>

      {/* Faint grid backdrop + vignette */}
      <div className="hero-grid pointer-events-none absolute inset-0 opacity-60" />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-void/30 via-transparent to-void" />

      {/* Content */}
      <div ref={ref} className="relative z-10 mx-auto w-full max-w-5xl text-center">
        <h1 className="hero-animate font-display text-5xl font-bold leading-[0.95] tracking-tight text-content sm:text-6xl md:text-7xl lg:text-8xl">
          {portfolioData.name}
        </h1>

        <p className="hero-animate mx-auto mt-5 max-w-3xl font-display text-xl font-semibold leading-snug sm:text-2xl md:text-3xl">
          <Typewriter
            phrases={portfolioData.roles}
            textClassName="gradient-text-animate"
            penClassName="text-accent-1"
          />
        </p>

        <p className="hero-animate mx-auto mt-6 max-w-2xl text-base leading-relaxed text-muted md:text-lg">
          {portfolioData.tagline}
        </p>

        {/* Primary actions */}
        <div className="hero-animate mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Button
            size="lg"
            magnetic
            className="group w-full sm:w-auto"
            onClick={() =>
              document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })
            }
          >
            <span className="inline-flex items-center gap-2">
              View Projects
              <svg
                className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 12h14M13 6l6 6-6 6"
                />
              </svg>
            </span>
          </Button>
          <Button
            variant="outline"
            size="lg"
            magnetic
            className="w-full sm:w-auto"
            onClick={() =>
              document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })
            }
          >
            Get in Touch
          </Button>
        </div>

        {/* Social links */}
        <div className="hero-animate mt-12 flex items-center justify-center gap-3">
          {portfolioData.social
            .filter((link) => PRIMARY_SOCIAL_PLATFORMS.has(link.platform))
            .map((link) => (
              <a
                key={link.platform}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${link.platform} — ${link.handle}`}
                className="flex h-11 w-11 items-center justify-center rounded-xl border border-border bg-surface/60 text-muted backdrop-blur-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-accent-1/50 hover:text-content"
              >
                <SocialIcon platform={link.platform} />
              </a>
            ))}
        </div>
      </div>

      {/* Scroll cue */}
      <motion.div
        className="absolute bottom-8 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.8 }}
        aria-hidden="true"
      >
        <span className="flex h-9 w-5 justify-center rounded-full border border-slate-600 pt-1.5">
          <motion.span
            className="h-1.5 w-1 rounded-full bg-accent-1"
            animate={{ y: [0, 10, 0], opacity: [1, 0.3, 1] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          />
        </span>
      </motion.div>
    </section>
  );
};
