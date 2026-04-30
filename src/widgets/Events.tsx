/**
 * @module Events
 * @description Events & Achievements section with card grid
 * @performance Lazy loading, optimized animations
 */

import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { SectionHeading, GlassCard, Badge, Button } from '@/shared/ui';
import { portfolioData } from '@/shared/config';
import { useInView } from '@/shared/hooks';
import { formatDate } from '@/shared/lib';
import type { Event } from '@/types';

const EventCard: React.FC<{ event: Event; index: number }> = ({ event, index }) => {
  const getEventIcon = (type: Event['type']) => {
    switch (type) {
      case 'award':
        return '🏆';
      case 'speaking':
        return '🎤';
      case 'hackathon':
        return '💻';
      case 'workshop':
        return '📚';
      case 'conference':
        return '🎯';
      default:
        return '📌';
    }
  };

  const getEventColor = (type: Event['type']) => {
    switch (type) {
      case 'award':
        return 'from-yellow-500/20 to-amber-500/20';
      case 'speaking':
        return 'from-purple-500/20 to-pink-500/20';
      case 'hackathon':
        return 'from-green-500/20 to-emerald-500/20';
      case 'workshop':
        return 'from-blue-500/20 to-cyan-500/20';
      case 'conference':
        return 'from-red-500/20 to-orange-500/20';
      default:
        return 'from-slate-500/20 to-gray-500/20';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true }}
    >
      <GlassCard hover className="overflow-hidden group">
        {/* Event type header */}
        <div className={`relative p-6 bg-gradient-to-br ${getEventColor(event.type)}`}>
          <div className="flex items-start justify-between">
            <span className="text-4xl">{getEventIcon(event.type)}</span>
            <Badge variant="outline" size="sm" className="capitalize">
              {event.type}
            </Badge>
          </div>
        </div>

        {/* Event content */}
        <div className="p-6">
          <div className="flex items-center gap-2 mb-3">
            <span className="text-accent-2 font-mono text-sm">
              {formatDate(event.date)}
            </span>
            {event.location && (
              <>
                <span className="text-slate-600">•</span>
                <span className="text-slate-400 text-sm">{event.location}</span>
              </>
            )}
          </div>

          <h3 className="text-xl font-display font-semibold text-white mb-3 group-hover:text-accent-1 transition-colors">
            {event.title}
          </h3>

          <p className="text-slate-400 text-sm mb-4 line-clamp-3">
            {event.description}
          </p>

          {event.link && (
            <a
              href={event.link}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-accent-1 text-sm font-medium hover:text-accent-2 transition-colors"
            >
              Learn more
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </a>
          )}
        </div>
      </GlassCard>
    </motion.div>
  );
};

export const Events: React.FC = () => {
  const [filter, setFilter] = useState<'all' | Event['type']>('all');
  const { ref } = useInView<HTMLDivElement>({ threshold: 0.1 });

  const filteredEvents = useMemo(() => {
    if (filter === 'all') {
      return portfolioData.events;
    }
    return portfolioData.events.filter((e) => e.type === filter);
  }, [filter]);

  const eventTypes = [
    'all',
    ...Array.from(new Set(portfolioData.events.map((e) => e.type))),
  ] as const;

  return (
    <section id="events" className="relative py-32 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        <SectionHeading
          title="Events & Achievements"
          subtitle="Conferences, awards, and milestones in my journey"
          index={5}
        />

        {/* Filter tabs */}
        <div className="flex flex-wrap gap-3 mb-12">
          {eventTypes.map((type) => (
            <button
              key={type}
              onClick={() => setFilter(type)}
              className={`px-4 py-2 rounded-lg font-medium transition-all capitalize
                ${filter === type ? 'bg-accent-1 text-white' : 'text-slate-400 hover:text-white'}`}
            >
              {type}
            </button>
          ))}
        </div>

        {/* Events grid */}
        <div ref={ref} className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredEvents.map((event, index) => (
            <EventCard key={event.id} event={event} index={index} />
          ))}
        </div>

        {/* View more CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <Button variant="outline" size="lg" magnetic>
            View All Events
          </Button>
        </motion.div>
      </div>
    </section>
  );
};
