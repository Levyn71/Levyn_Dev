/**
 * @module Experience
 * @description Experience section with vertical timeline
 * @performance GSAP ScrollTrigger for scroll-driven animations
 */

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { SectionHeading, Badge } from '@/shared/ui';
import { portfolioData } from '@/shared/config';
import { useInView } from '@/shared/hooks';
import { cn, formatPeriod } from '@/shared/lib';
import type { Experience as ExperienceType } from '@/types';

const TimelineItem: React.FC<{ exp: ExperienceType; index: number; isLast: boolean }> = ({
  exp,
  index,
  isLast,
}) => {
  const { ref, isInView } = useInView<HTMLDivElement>({ threshold: 0.3 });
  const [showAll, setShowAll] = useState(false);
  const isEven = index % 2 === 0;
  const collapsedCount = 3;
  const hasMore = exp.description.length > collapsedCount;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className={cn('relative flex gap-6 md:gap-8', isEven ? 'md:flex-row' : 'md:flex-row-reverse')}
    >
      {/* Timeline line — left on mobile, centered on desktop */}
      {!isLast && (
        <div className="absolute left-[7px] top-6 h-full w-px bg-accent-1/40 md:left-1/2 md:top-8 md:-translate-x-1/2" />
      )}

      {/* Content */}
      <div
        className={cn(
          'flex-1 pl-8 md:pl-0',
          isEven ? 'md:pr-12 md:text-right' : 'md:pl-12 md:text-left'
        )}
      >
        <div className="rounded-xl border border-border bg-surface/50 p-5 backdrop-blur-sm transition-colors hover:border-accent-1/30 md:p-6">
          <span className="text-accent-2 font-mono text-sm">
            {formatPeriod(exp.period.start, exp.period.end, exp.period.current)}
          </span>
          
          <h3 className="text-xl font-display font-semibold text-content mt-2">
            {exp.role}
          </h3>
          
          <p className="text-muted font-medium">{exp.company}</p>
          <p className="text-subtle text-sm">{exp.location}</p>
          
          <ul className="mt-4 space-y-1.5 md:space-y-2">
            {exp.description.map((item, i) => (
              <li
                key={i}
                className={cn(
                  'flex gap-2 text-sm text-muted',
                  hasMore && !showAll && i >= collapsedCount && 'hidden md:flex'
                )}
              >
                <span className="text-accent-1">-</span>
                {item}
              </li>
            ))}
          </ul>

          {hasMore && (
            <button
              type="button"
              onClick={() => setShowAll((value) => !value)}
              className="mt-3 font-mono text-xs text-accent-1 transition-colors hover:text-accent-2 md:hidden"
            >
              {showAll ? 'Show less' : `Show ${exp.description.length - collapsedCount} more`}
            </button>
          )}
          
          <div className={cn('mt-4 flex flex-wrap gap-2', isEven ? 'md:justify-end' : 'md:justify-start')}>
            {exp.technologies.map((tech) => (
              <Badge key={tech} variant="default" size="sm">
                {tech}
              </Badge>
            ))}
          </div>
        </div>
      </div>

      {/* Node — left on mobile, centered on desktop */}
      <div className="absolute left-0 top-0.5 z-10 md:static md:shrink-0">
        <motion.div
          initial={{ scale: 0 }}
          animate={isInView ? { scale: 1 } : {}}
          transition={{ duration: 0.4, delay: index * 0.1 + 0.2 }}
          className="h-4 w-4 rounded-full border-4 border-void bg-accent-1 shadow-lg shadow-accent-1/50"
        />
      </div>

      {/* Spacer for the alternating desktop layout */}
      <div className="hidden md:block md:flex-1" />
    </motion.div>
  );
};

export const Experience: React.FC = () => {
  const { ref } = useInView<HTMLDivElement>({ threshold: 0.1 });

  return (
    <section id="experience" className="relative px-4 py-24 md:px-8 md:py-32">
      <div className="mx-auto max-w-5xl">
        <SectionHeading
          title="Education & Experience"
          subtitle="My journey of learning and professional growth"
          index={4}
        />

        <div ref={ref} className="relative mt-12 space-y-8 md:mt-20 md:space-y-16">
          {portfolioData.experience.map((exp, index) => (
            <TimelineItem
              key={exp.id}
              exp={exp}
              index={index}
              isLast={index === portfolioData.experience.length - 1}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
