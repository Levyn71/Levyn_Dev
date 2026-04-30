/**
 * @module About
 * @description About section with floating glass card and typewriter bio
 * @performance GSAP ScrollTrigger animations
 */

import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { GlassCard, SectionHeading } from '@/shared/ui';
import { portfolioData } from '@/shared/config';
import { useInView } from '@/shared/hooks';

gsap.registerPlugin(ScrollTrigger);

export const About: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const { ref: headingRef, isInView } = useInView<HTMLDivElement>({ threshold: 0.2 });

  useEffect(() => {
    if (!cardRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        cardRef.current,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: cardRef.current,
            start: 'top 80%',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative py-32 px-4 md:px-8"
    >
      <div className="max-w-7xl mx-auto">
        <div ref={headingRef}>
          <SectionHeading
            title="About Me"
            subtitle="Get to know the person behind the code"
            index={1}
          />
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Bio text */}
          <div className="space-y-6">
            {portfolioData.bio.map((paragraph, index) => (
              <motion.p
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.15 }}
                className="text-slate-300 text-lg leading-relaxed"
              >
                {paragraph}
              </motion.p>
            ))}

            {/* Quick stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="grid grid-cols-3 gap-4 pt-6"
            >
              {[
                { value: '2+', label: 'Years Experience' },
                { value: '15+', label: 'Projects Completed' },
                { value: '5+', label: 'Happy Clients' },
              ].map((stat, i) => (
                <div key={i} className="text-center">
                  <div className="text-3xl font-display font-bold text-accent-1">
                    {stat.value}
                  </div>
                  <div className="text-sm text-slate-400">{stat.label}</div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Glass card with image/avatar */}
          <motion.div
            ref={cardRef}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <GlassCard glow className="p-8">
              <div className="aspect-square rounded-xl bg-gradient-to-br from-accent-1/20 to-accent-2/20 flex items-center justify-center">
                <div className="text-center">
                  <div className="w-32 h-32 mx-auto mb-4 rounded-full bg-gradient-to-br from-accent-1 to-accent-2 flex items-center justify-center text-4xl font-display font-bold text-white">
                    L
                  </div>
                  <p className="text-slate-400 font-mono text-sm">
                    Creative Developer
                  </p>
                </div>
              </div>

              {/* Decorative elements */}
              <div className="absolute -top-4 -right-4 w-24 h-24 border border-accent-1/30 rounded-full" />
              <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-accent-2/20 rounded-full blur-xl" />
            </GlassCard>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
