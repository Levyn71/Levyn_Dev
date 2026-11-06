/**
 * @module Skills
 * @description Skills & expertise section with a bento grid of category tiles
 * @performance Static data grouped once, in-view reveal animations
 */

import React from 'react';
import { motion } from 'framer-motion';
import { SectionHeading } from '@/shared/ui';
import { cn } from '@/shared/lib';
import { portfolioData } from '@/shared/config';
import type { Skill } from '@/types';

type SkillCategory = Skill['category'];

interface CategoryMeta {
  label: string;
  color: string;
}

const CATEGORY_META: Record<SkillCategory, CategoryMeta> = {
  frontend: { label: 'Frontend', color: 'bg-accent-1' },
  backend: { label: 'Backend', color: 'bg-emerald-400' },
  '3d': { label: '3D & Graphics', color: 'bg-violet-500' },
  design: { label: 'Design', color: 'bg-amber-400' },
  tools: { label: 'Tools', color: 'bg-slate-400' },
};

const CATEGORY_ORDER: SkillCategory[] = ['frontend', 'backend', '3d', 'design', 'tools'];

const SKILLS_BY_CATEGORY = portfolioData.skills.reduce((acc, skill) => {
  if (!acc[skill.category]) acc[skill.category] = [];
  acc[skill.category].push(skill);
  return acc;
}, {} as Record<string, Skill[]>);

const CATEGORIES = CATEGORY_ORDER.filter((category) => SKILLS_BY_CATEGORY[category]);

const TOTAL_SKILLS = portfolioData.skills.length;
const AVERAGE_PROFICIENCY = Math.round(
  portfolioData.skills.reduce((sum, skill) => sum + skill.level, 0) / TOTAL_SKILLS
);
const EXPERT_SKILLS = portfolioData.skills.filter((skill) => skill.level >= 90).length;

const KPIS = [
  { value: `${TOTAL_SKILLS}`, label: 'Technologies' },
  { value: `${CATEGORIES.length}`, label: 'Categories' },
  { value: `${AVERAGE_PROFICIENCY}%`, label: 'Avg. Proficiency' },
  { value: `${EXPERT_SKILLS}`, label: 'Expert Level' },
];

interface CategoryTileProps {
  category: SkillCategory;
  skills: Skill[];
  className?: string;
  delay?: number;
}

const CategoryTile: React.FC<CategoryTileProps> = ({
  category,
  skills,
  className,
  delay = 0,
}) => {
  const meta = CATEGORY_META[category];
  const average = Math.round(skills.reduce((sum, skill) => sum + skill.level, 0) / skills.length);

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      className={cn(
        'group relative flex flex-col overflow-hidden rounded-3xl border border-border bg-surface/50 p-6 backdrop-blur-sm transition-all duration-300 hover:border-accent-1/40 hover:bg-surface/80',
        className
      )}
    >
      <div className="relative flex items-center justify-between">
        <h3 className="font-display text-lg font-semibold text-content">{meta.label}</h3>
        <span className="font-mono text-xs text-subtle">{skills.length} skills</span>
      </div>

      <div className="relative mt-5 flex flex-wrap gap-2">
        {skills.map((skill) => (
          <span
            key={skill.name}
            className="inline-flex items-center gap-1.5 rounded-full border border-border bg-void/40 px-3 py-1.5 text-sm text-muted"
          >
            <span className={cn('h-1.5 w-1.5 rounded-full', meta.color)} />
            {skill.name}
          </span>
        ))}
      </div>

      <div className="relative mt-auto pt-6">
        <div className="mb-2 flex items-center justify-between font-mono text-[11px] uppercase tracking-wider text-subtle">
          <span>Avg. proficiency</span>
          <span className="text-muted">{average}%</span>
        </div>
        <div className="h-1 overflow-hidden rounded-full bg-surface-light">
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: `${average}%` }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: 'easeOut', delay }}
            className={cn('h-full rounded-full', meta.color)}
          />
        </div>
      </div>
    </motion.article>
  );
};

export const Skills: React.FC = () => {
  return (
    <section id="skills" className="relative overflow-hidden px-4 py-32 md:px-8">
      <div className="relative mx-auto max-w-7xl">
        <SectionHeading
          title="Skills & Expertise"
          subtitle="Technologies and tools I work with daily"
          index={2}
        />

        {/* KPI stats */}
        <div className="mb-4 grid grid-cols-2 gap-4 md:grid-cols-4">
          {KPIS.map((kpi, index) => (
            <motion.div
              key={kpi.label}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.06 }}
              className="rounded-2xl border border-border bg-surface/40 p-5 text-center backdrop-blur-sm"
            >
              <div className="font-display text-3xl font-bold text-content">{kpi.value}</div>
              <div className="mt-1 text-xs text-muted">{kpi.label}</div>
            </motion.div>
          ))}
        </div>

        {/* Bento grid */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-6">
          {CATEGORIES.map((category, index) => (
            <CategoryTile
              key={category}
              category={category}
              skills={SKILLS_BY_CATEGORY[category]}
              delay={index * 0.08}
              className={index < 2 ? 'lg:col-span-3' : 'lg:col-span-2'}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

