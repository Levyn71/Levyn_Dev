/**
 * @module SectionHeading
 * @description Section title with animated underline
 * @performance CSS-based animations
 */

import React from 'react';
import { cn } from '@/shared/lib';
import { useInView } from '@/shared/hooks';

interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  className?: string;
  align?: 'left' | 'center';
  index?: number;
}

export const SectionHeading: React.FC<SectionHeadingProps> = ({
  title,
  subtitle,
  className,
  align = 'left',
  index,
}) => {
  const { ref, isInView } = useInView<HTMLDivElement>({ threshold: 0.3 });

  return (
    <div
      ref={ref}
      className={cn(
        'mb-12',
        align === 'center' && 'text-center',
        className
      )}
    >
      {index !== undefined && (
        <span
          className={cn(
            'font-mono text-accent-1 text-sm mb-2 block',
            'transition-all duration-500',
            isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          )}
        >
          0{index + 1}
        </span>
      )}
      
      <h2
        className={cn(
          'font-display text-4xl md:text-5xl lg:text-6xl font-semibold text-white',
          'transition-all duration-500 delay-100',
          isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
        )}
      >
        {title}
      </h2>
      
      {subtitle && (
        <p
          className={cn(
            'mt-4 text-lg text-slate-400 max-w-2xl',
            align === 'center' && 'mx-auto',
            'transition-all duration-500 delay-200',
            isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          )}
        >
          {subtitle}
        </p>
      )}
      
      {/* Animated underline */}
      <div
        className={cn(
          'h-1 bg-gradient-to-r from-accent-1 to-accent-2 rounded-full mt-6',
          'transition-all duration-700 delay-300',
          align === 'center' ? 'mx-auto' : '',
          isInView ? 'w-24 opacity-100' : 'w-0 opacity-0'
        )}
      />
    </div>
  );
};
