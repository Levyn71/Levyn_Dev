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
import type { Project } from '@/types';

type ProjectCardProps = {
  project: Project;
  index: number;
};

const ProjectCard = React.forwardRef<HTMLDivElement, ProjectCardProps>(
  ({ project, index }, ref) => {
    const [imageError, setImageError] = React.useState(false);

    return (
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: index * 0.1 }}
        viewport={{ once: true }}
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
              <div className="absolute inset-0 bg-gradient-to-br from-accent-1/20 to-accent-2/20" />
            )}
            {imageError && (
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-6xl font-display font-bold text-white/10">
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
              <h3 className="text-xl font-display font-semibold text-white group-hover:text-accent-1 transition-colors">
                {project.title}
              </h3>
              <span className="text-sm font-mono text-slate-400">{project.year}</span>
            </div>

            <p className="text-slate-400 text-sm mb-4 line-clamp-2">
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
  const { ref, isInView } = useInView<HTMLDivElement>({ threshold: 0.1 });

  const filteredProjects = useMemo(() => {
    if (filter === 'featured') {
      return portfolioData.projects.filter((p) => p.featured);
    }
    return portfolioData.projects;
  }, [filter]);

  return (
    <section id="projects" className="relative py-32 px-4 md:px-8">
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
          className="mb-20"
        >
          <FloatingCards
            projects={portfolioData.projects.filter((p) =>
              ['agrigrid', 'ecowave', 'taskflow', 'attendease', 'primestone', 'afriarch'].includes(p.id)
            )}
          />
        </motion.div>

        {/* Filter tabs */}
        <div className="flex gap-4 mb-12">
          <button
            onClick={() => setFilter('all')}
            className={`px-4 py-2 rounded-lg font-medium transition-all
              ${filter === 'all' ? 'bg-accent-1 text-white' : 'text-slate-400 hover:text-white'}`}
          >
            All Projects
          </button>
          <button
            onClick={() => setFilter('featured')}
            className={`px-4 py-2 rounded-lg font-medium transition-all
              ${filter === 'featured' ? 'bg-accent-1 text-white' : 'text-slate-400 hover:text-white'}`}
          >
            Featured
          </button>
        </div>

        {/* Project grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, index) => (
              <ProjectCard key={project.id} project={project} index={index} />
            ))}
          </AnimatePresence>
        </div>

        {/* View all CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <Button variant="outline" size="lg" magnetic>
            View All Projects
          </Button>
        </motion.div>
      </div>
    </section>
  );
};
