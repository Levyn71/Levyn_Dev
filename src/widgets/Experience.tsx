/**
 * @module Experience
 * @description Experience section with vertical timeline
 * @performance GSAP ScrollTrigger for scroll-driven animations
 */

import React from 'react';
import { motion } from 'framer-motion';
import { SectionHeading, Badge } from '@/shared/ui';
import { portfolioData } from '@/shared/config';
import { useInView } from '@/shared/hooks';
import { formatPeriod } from '@/shared/lib';
import type { Experience as ExperienceType } from '@/types';

const TimelineItem: React.FC<{ exp: ExperienceType; index: number; isLast: boolean }> = ({
  exp,
  index,
  isLast,
}) => {
  const { ref, isInView } = useInView<HTMLDivElement>({ threshold: 0.3 });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className={`relative flex gap-8 ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}
    >
      {/* Timeline line */}
      {!isLast && (
        <div className="absolute top-8 left-1/2 -translate-x-1/2 w-px h-full bg-gradient-to-b from-accent-1/50 to-transparent" />
      )}

      {/* Content */}
      <div className={`flex-1 ${index % 2 === 0 ? 'text-right pr-12' : 'text-left pl-12'}`}>
        <div className="bg-surface/50 backdrop-blur-sm rounded-xl p-6 border border-border hover:border-accent-1/30 transition-colors">
          <span className="text-accent-2 font-mono text-sm">
            {formatPeriod(exp.period.start, exp.period.end, exp.period.current)}
          </span>
          
          <h3 className="text-xl font-display font-semibold text-white mt-2">
            {exp.role}
          </h3>
          
          <p className="text-slate-400 font-medium">{exp.company}</p>
          <p className="text-slate-500 text-sm">{exp.location}</p>
          
          <ul className="mt-4 space-y-2">
            {exp.description.map((item, i) => (
              <li key={i} className="text-slate-400 text-sm flex gap-2">
                <span className="text-accent-1">-</span>
                {item}
              </li>
            ))}
          </ul>
          
          <div className={`flex flex-wrap gap-2 mt-4 ${index % 2 === 0 ? 'justify-end' : 'justify-start'}`}>
            {exp.technologies.map((tech) => (
              <Badge key={tech} variant="default" size="sm">
                {tech}
              </Badge>
            ))}
          </div>
        </div>
      </div>

      {/* Center node */}
      <div className="relative z-10 flex-shrink-0">
        <motion.div
          initial={{ scale: 0 }}
          animate={isInView ? { scale: 1 } : {}}
          transition={{ duration: 0.4, delay: index * 0.1 + 0.2 }}
          className="w-4 h-4 rounded-full bg-accent-1 border-4 border-void shadow-lg shadow-accent-1/50"
        />
      </div>

      {/* Empty space for alternating layout */}
      <div className="flex-1" />
    </motion.div>
  );
};

export const Experience: React.FC = () => {
  const { ref } = useInView<HTMLDivElement>({ threshold: 0.1 });

  return (
    <section id="experience" className="relative py-32 px-4 md:px-8">
      <div className="max-w-5xl mx-auto">
        <SectionHeading
          title="Education & Experience"
          subtitle="My journey of learning and professional growth"
          index={4}
        />

        <div ref={ref} className="relative mt-20 space-y-16">
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
