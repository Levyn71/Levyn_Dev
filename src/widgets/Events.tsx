/**
 * @module Events
 * @description Events & achievements section with filterable category cards
 * @performance Static data, in-view reveal animations
 */

import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { SectionHeading } from '@/shared/ui';
import { cn, formatDate } from '@/shared/lib';
import { portfolioData } from '@/shared/config';
import type { Event } from '@/types';

interface EventTypeMeta {
  label: string;
  iconClass: string;
  chip: string;
  tag: string;
}

const TYPE_META: Record<Event['type'], EventTypeMeta> = {
  award: { label: 'Award', iconClass: 'text-amber-300', chip: 'border-amber-400/30 bg-amber-400/10', tag: 'bg-amber-400/10 text-amber-300' },
  speaking: { label: 'Speaking', iconClass: 'text-accent-1', chip: 'border-accent-1/30 bg-accent-1/10', tag: 'bg-accent-1/10 text-accent-1' },
  hackathon: { label: 'Hackathon', iconClass: 'text-emerald-300', chip: 'border-emerald-400/30 bg-emerald-400/10', tag: 'bg-emerald-400/10 text-emerald-300' },
  workshop: { label: 'Workshop', iconClass: 'text-accent-2', chip: 'border-accent-2/30 bg-accent-2/10', tag: 'bg-accent-2/10 text-accent-2' },
  conference: { label: 'Conference', iconClass: 'text-accent-3', chip: 'border-accent-3/30 bg-accent-3/10', tag: 'bg-accent-3/10 text-accent-3' },
  other: { label: 'Milestone', iconClass: 'text-slate-300', chip: 'border-border bg-surface-light/50', tag: 'bg-surface-light/50 text-slate-300' },
};

const EVENT_ICONS: Record<Event['type'], JSX.Element> = {
  award: (
    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M8 21h8M12 17v4M7 4h10v4a5 5 0 0 1-10 0V4zM7 6H5a2 2 0 0 0 0 4h2M17 6h2a2 2 0 0 1 0 4h-2" />
    </svg>
  ),
  speaking: (
    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M12 3a3 3 0 0 0-3 3v5a3 3 0 0 0 6 0V6a3 3 0 0 0-3-3zM19 11a7 7 0 0 1-14 0M12 18v3M9 21h6" />
    </svg>
  ),
  hackathon: (
    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M16 18l6-6-6-6M8 6l-6 6 6 6" />
    </svg>
  ),
  workshop: (
    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M22 10 12 5 2 10l10 5 10-5zM6 12v5c0 1.5 2.7 3 6 3s6-1.5 6-3v-5" />
    </svg>
  ),
  conference: (
    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  ),
  other: (
    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M12 3l2.6 5.3 5.9.9-4.2 4.1 1 5.8L12 16.6 6.7 19.2l1-5.8L3.5 9.3l5.9-.9L12 3z" />
    </svg>
  ),
};

const EVENT_COUNTS = portfolioData.events.reduce<Record<string, number>>((acc, event) => {
  acc[event.type] = (acc[event.type] ?? 0) + 1;
  return acc;
}, {});

const EventCard: React.FC<{ event: Event; index: number }> = ({ event, index }) => {
  const meta = TYPE_META[event.type];

  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-surface/50 p-6 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-accent-1/40 hover:bg-surface/80"
    >
      <div className="relative flex items-center justify-between gap-3">
        <span className={cn('flex h-11 w-11 items-center justify-center rounded-xl border', meta.chip, meta.iconClass)}>
          {EVENT_ICONS[event.type]}
        </span>
        <span className={cn('rounded-full px-2.5 py-1 font-mono text-[11px] uppercase tracking-wider', meta.tag)}>
          {meta.label}
        </span>
      </div>

      <div className="relative mt-5 flex items-center gap-2 font-mono text-xs text-slate-500">
        <span className="text-accent-2">{formatDate(event.date)}</span>
        {event.location && (
          <>
            <span className="text-slate-600">•</span>
            <span className="truncate text-slate-400">{event.location}</span>
          </>
        )}
      </div>

      <h3 className="relative mt-3 font-display text-lg font-semibold leading-snug text-white transition-colors group-hover:text-accent-1">
        {event.title}
      </h3>

      <p className="relative mt-3 line-clamp-3 flex-1 text-sm leading-relaxed text-slate-400">
        {event.description}
      </p>

      {event.link && (
        <a
          href={event.link}
          target="_blank"
          rel="noopener noreferrer"
          className="relative mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-accent-1 transition-colors hover:text-accent-2"
        >
          Learn more
          <svg className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
        </a>
      )}
    </motion.article>
  );
};

export const Events: React.FC = () => {
  const [filter, setFilter] = useState<'all' | Event['type']>('all');

  const filteredEvents = useMemo(() => {
    if (filter === 'all') return portfolioData.events;
    return portfolioData.events.filter((event) => event.type === filter);
  }, [filter]);

  const eventTypes = [
    'all',
    ...Array.from(new Set(portfolioData.events.map((event) => event.type))),
  ] as const;

  return (
    <section id="events" className="relative overflow-hidden px-4 py-32 md:px-8">
      {/* Ambient glow */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -right-40 top-1/3 h-96 w-96 rounded-full bg-accent-1/10 blur-[150px]" />
        <div className="absolute -left-40 bottom-1/4 h-96 w-96 rounded-full bg-accent-3/10 blur-[150px]" />
      </div>

      <div className="relative mx-auto max-w-7xl">
        <SectionHeading
          title="Events & Achievements"
          subtitle="Conferences, awards, and milestones in my journey"
          index={5}
        />

        {/* Category filters */}
        <div className="mb-12 flex flex-wrap items-center gap-2">
          {eventTypes.map((type) => {
            const isActive = filter === type;
            const label = type === 'all' ? 'All' : TYPE_META[type].label;
            const count = type === 'all' ? portfolioData.events.length : EVENT_COUNTS[type];

            return (
              <button
                key={type}
                type="button"
                onClick={() => setFilter(type)}
                className={cn(
                  'inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-all duration-200',
                  isActive
                    ? 'bg-accent-1 text-white shadow-[0_0_20px_rgba(99,102,241,0.35)]'
                    : 'border border-border bg-surface/60 text-slate-400 hover:border-accent-1/40 hover:text-white'
                )}
              >
                {label}
                <span className={cn('font-mono text-xs', isActive ? 'text-white/70' : 'text-slate-500')}>
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Events grid */}
        <div key={filter} className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredEvents.map((event, index) => (
            <EventCard key={event.id} event={event} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};
