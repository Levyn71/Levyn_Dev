/**
 * @module Projects
 * @description Projects section with 3D floating cards and filterable grid
 * @performance Lazy loading, optimized 3D rendering
 */

import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FloatingCards } from '@/features';
import { SectionHeading, GlassCard, Badge, Button } from '@/shared/ui';
import { portfolioData } from '@/shared/config';
import { useInView } from '@/shared/hooks';
import { cn } from '@/shared/lib';
import type { Project } from '@/types';

type ProjectCardProps = {
  project: Project;
  index: number;
  className?: string;
};

const ProjectCard = React.forwardRef<HTMLDivElement, ProjectCardProps>(
  ({ project, index, className }, ref) => {
    const [imageError, setImageError] = React.useState(false);

    return (
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: index * 0.1 }}
        viewport={{ once: true }}
        className={className}
      >
        <GlassCard hover className="overflow-hidden group">
          {/* Project thumbnail */}
          <div className="relative aspect-video bg-surface-light overflow-hidden">
            {!imageError ? (
              <img
                src={project.thumbnail}
                alt={project.title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                onError={() => setImageError(true)}
              />
            ) : (
              <div className="absolute inset-0 bg-surface-light" />
            )}
            {imageError && (
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-6xl font-display font-bold text-content/10">
                  {project.title.charAt(0)}
                </span>
              </div>
            )}

            {/* Hover overlay */}
            <div className="absolute inset-0 bg-accent-1/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-4">
              {project.links.demo && (
                <a
                  href={project.links.demo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 bg-white text-accent-1-dark rounded-lg font-medium hover:bg-slate-100 transition-colors"
                >
                  View Demo
                </a>
              )}
              {project.links.github && (
                <a
                  href={project.links.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 border border-white text-white rounded-lg font-medium hover:bg-white/10 transition-colors"
                >
                  GitHub
                </a>
              )}
            </div>
          </div>

          {/* Project info */}
          <div className="p-6">
            <div className="flex items-start justify-between mb-3">
              <h3 className="text-xl font-display font-semibold text-content group-hover:text-accent-1 transition-colors">
                {project.title}
              </h3>
              <span className="text-sm font-mono text-muted">{project.year}</span>
            </div>

            <p className="text-muted text-sm mb-4 line-clamp-2">
              {project.description}
            </p>

            <div className="flex flex-wrap gap-2">
              {project.tags.slice(0, 8).map((tag) => (
                <Badge key={tag} variant="outline" size="sm">
                  {tag}
                </Badge>
              ))}
            </div>
          </div>
        </GlassCard>
      </motion.div>
    );
  }
);

ProjectCard.displayName = 'ProjectCard';

export const Projects: React.FC = () => {
  const [filter, setFilter] = useState<'all' | 'featured'>('all');
  const [showAll, setShowAll] = useState(false);
  const { ref, isInView } = useInView<HTMLDivElement>({ threshold: 0.1 });

  const filteredProjects = useMemo(() => {
    if (filter === 'featured') {
      return portfolioData.projects.filter((p) => p.featured);
    }
    return portfolioData.projects;
  }, [filter]);

  const collapsedCount = 4;
  const hasMore = filteredProjects.length > collapsedCount;

  return (
    <section id="projects" className="relative px-4 py-24 md:px-8 md:py-32">
      <div className="max-w-7xl mx-auto">
        <SectionHeading
          title="Selected Projects"
          subtitle="A collection of my recent work and experiments"
          index={3}
        />

        {/* 3D Floating Cards Showcase */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8 }}
          className="mb-12 md:mb-20"
        >
          <FloatingCards
            projects={portfolioData.projects.filter((p) =>
              ['agrigrid', 'taskflow', 'attendease', 'primestone', 'afriarch'].includes(p.id)
            )}
          />
        </motion.div>

        {/* Filter tabs */}
        <div className="mb-8 flex gap-3 md:mb-12 md:gap-4">
          <button
            onClick={() => {
              setFilter('all');
              setShowAll(false);
            }}
            className={`px-4 py-2 rounded-lg font-medium transition-all
              ${filter === 'all' ? 'bg-accent-1 text-white' : 'text-muted hover:text-content'}`}
          >
            All Projects
          </button>
          <button
            onClick={() => {
              setFilter('featured');
              setShowAll(false);
            }}
            className={`px-4 py-2 rounded-lg font-medium transition-all
              ${filter === 'featured' ? 'bg-accent-1 text-white' : 'text-muted hover:text-content'}`}
          >
            Featured
          </button>
        </div>

        {/* Project grid */}
        <div className="grid gap-5 md:grid-cols-2 md:gap-6 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, index) => (
              <ProjectCard
                key={project.id}
                project={project}
                index={index}
                className={cn(!showAll && index >= collapsedCount && 'hidden md:block')}
              />
            ))}
          </AnimatePresence>
        </div>

        {hasMore && (
          <div className="mt-6 text-center md:hidden">
            <button
              type="button"
              onClick={() => setShowAll((value) => !value)}
              className="rounded-full border border-border bg-surface/60 px-5 py-2.5 text-sm font-medium text-accent-1 transition-colors hover:border-accent-1/40 hover:text-content"
            >
              {showAll ? 'Show less' : `Show all ${filteredProjects.length} projects`}
            </button>
          </div>
        )}

        {/* View all CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-12 text-center md:mt-16"
        >
          <Button variant="outline" size="lg" magnetic>
            View All Projects
          </Button>
        </motion.div>
      </div>
    </section>
  );
};
