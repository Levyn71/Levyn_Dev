/**
 * @module About
 * @description About section with bio, profile card and quick stats
 * @performance In-view reveal animations, static data computed once
 */

import React from 'react';
import { motion } from 'framer-motion';
import { GlassCard, SectionHeading, Badge } from '@/shared/ui';
import { portfolioData } from '@/shared/config';
import { useInView } from '@/shared/hooks';

const STATS = [
  { value: '2+', label: 'Years Experience' },
  { value: '15+', label: 'Projects Completed' },
  { value: '5+', label: 'Happy Clients' },
];

// Highest-proficiency skills, surfaced as a quick "core stack" preview.
const CORE_STACK = [...portfolioData.skills].sort((a, b) => b.level - a.level).slice(0, 6);

export const About: React.FC = () => {
  const { ref, isInView } = useInView<HTMLDivElement>({ threshold: 0.2 });

  return (
    <section id="about" className="relative overflow-hidden px-4 py-32 md:px-8">
      {/* Ambient glow */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-40 top-20 h-96 w-96 rounded-full bg-accent-1/10 blur-[140px]" />
        <div className="absolute -right-40 bottom-0 h-96 w-96 rounded-full bg-accent-2/10 blur-[140px]" />
      </div>

      <div className="relative mx-auto max-w-7xl">
        <SectionHeading
          title="About Me"
          subtitle="Get to know the person behind the code"
          index={1}
        />

        <div ref={ref} className="grid items-start gap-12 lg:grid-cols-12 lg:gap-16">
          {/* Bio */}
          <div className="space-y-6 lg:col-span-7">
            {portfolioData.bio.map((paragraph, index) => (
              <motion.p
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.12 }}
                className="text-lg leading-relaxed text-muted"
              >
                {paragraph}
              </motion.p>
            ))}

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.45 }}
              className="flex items-center gap-3 pt-2"
            >
              <span className="h-px w-10 bg-gradient-to-r from-accent-1 to-transparent" />
              <span className="font-mono text-sm text-accent-1">{portfolioData.role}</span>
            </motion.div>
          </div>

          {/* Profile card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="lg:col-span-5"
          >
            <GlassCard glow hover className="p-8">
              <div className="flex flex-col items-center text-center">
                <div className="relative mb-5">
                  <div className="absolute -inset-1 rounded-full bg-gradient-to-br from-accent-1 via-accent-2 to-accent-3 opacity-70 blur-md" />
                  <div className="relative flex h-28 w-28 items-center justify-center rounded-full border border-border bg-void">
                    <span className="font-display text-4xl font-bold text-content">L</span>
                  </div>
                </div>

                <h3 className="font-display text-2xl font-semibold text-content">
                  {portfolioData.name}
                </h3>
                <p className="mt-1 font-mono text-sm text-muted">Creative Developer</p>

                <div className="my-6 h-px w-full bg-border" />

                <div className="w-full">
                  <span className="font-mono text-xs uppercase tracking-[0.2em] text-subtle">
                    Core Stack
                  </span>
                  <div className="mt-4 flex flex-wrap justify-center gap-2">
                    {CORE_STACK.map((skill) => (
                      <Badge key={skill.name} variant="outline" size="sm">
                        {skill.name}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </GlassCard>
          </motion.div>
        </div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-16 grid grid-cols-3 divide-x divide-border rounded-2xl border border-border bg-surface/40 backdrop-blur-sm"
        >
          {STATS.map((stat) => (
            <div key={stat.label} className="px-4 py-8 text-center">
              <div className="font-display text-3xl font-bold text-content md:text-4xl">
                {stat.value}
              </div>
              <div className="mt-1 text-xs text-muted md:text-sm">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
