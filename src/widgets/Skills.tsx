/**
 * @module Skills
 * @description Skills section with 3D nebula visualization and category breakdown
 * @performance Split view for 3D and 2D content
 */

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { SkillsNebula } from '@/features';
import { SectionHeading } from '@/shared/ui';
import { portfolioData } from '@/shared/config';
import { useInView } from '@/shared/hooks';
import type { Skill } from '@/types';

const SkillCategory: React.FC<{ category: string; skills: Skill[] }> = ({
  category,
  skills,
}) => {
  const categoryColors: Record<string, string> = {
    frontend: 'from-blue-500 to-cyan-400',
    backend: 'from-green-500 to-emerald-400',
    '3d': 'from-purple-500 to-pink-400',
    design: 'from-orange-500 to-yellow-400',
    tools: 'from-slate-500 to-slate-400',
  };

  return (
    <div className="mb-8">
      <h3 className="text-sm font-mono text-slate-400 uppercase tracking-wider mb-4">
        {category}
      </h3>
      <div className="space-y-3">
        {skills.map((skill) => (
          <div key={skill.name} className="group">
            <div className="flex justify-between items-center mb-1">
              <span className="text-white font-medium">{skill.name}</span>
              <span className="text-slate-400 text-sm">{skill.level}%</span>
            </div>
            <div className="h-2 bg-surface-light rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: `${skill.level}%` }}
                transition={{ duration: 1, ease: 'easeOut' }}
                viewport={{ once: true }}
                className={`h-full rounded-full bg-gradient-to-r ${categoryColors[category] || 'from-accent-1 to-accent-2'}`}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export const Skills: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const { ref, isInView } = useInView<HTMLDivElement>({ threshold: 0.1 });

  const skillsByCategory = portfolioData.skills.reduce((acc, skill) => {
    if (!acc[skill.category]) acc[skill.category] = [];
    acc[skill.category].push(skill);
    return acc;
  }, {} as Record<string, Skill[]>);

  const categories = Object.keys(skillsByCategory);

  return (
    <section id="skills" className="relative py-32 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        <SectionHeading
          title="Skills & Expertise"
          subtitle="Technologies and tools I work with daily"
          index={2}
        />

        <div ref={ref} className="grid lg:grid-cols-2 gap-16 items-start">
          {/* 3D Nebula visualization */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.8 }}
            className="relative h-[500px] order-2 lg:order-1"
          >
            <SkillsNebula />
            
            {/* Category filters */}
            <div className="absolute bottom-0 left-0 right-0 flex flex-wrap gap-2 justify-center">
              <button
                onClick={() => setActiveCategory(null)}
                className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all
                  ${!activeCategory ? 'bg-accent-1 text-white' : 'bg-surface text-slate-400 hover:text-white'}`}
              >
                All
              </button>
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all capitalize
                    ${activeCategory === cat ? 'bg-accent-1 text-white' : 'bg-surface text-slate-400 hover:text-white'}`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </motion.div>

          {/* Skills list */}
          <div className="order-1 lg:order-2">
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6 }}
            >
              {categories
                .filter((cat) => !activeCategory || cat === activeCategory)
                .map((category) => (
                  <SkillCategory
                    key={category}
                    category={category}
                    skills={skillsByCategory[category]}
                  />
                ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};
