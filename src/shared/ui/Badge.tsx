/**
 * @module Badge
 * @description Skill and tag badge component
 * @performance Memoized, CSS-based hover effects
 */

import React from 'react';
import { cn } from '@/shared/lib';

interface BadgeProps {
  children: React.ReactNode;
  className?: string;
  variant?: 'default' | 'accent' | 'outline';
  size?: 'sm' | 'md';
}

export const Badge = React.memo(function Badge({
  children,
  className,
  variant = 'default',
  size = 'md',
}: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center font-mono text-xs',
        'transition-all duration-200',
        {
          'bg-surface-light/50 text-slate-300': variant === 'default',
          'bg-accent-1/20 text-accent-1 border border-accent-1/30': variant === 'accent',
          'border border-border text-slate-400': variant === 'outline',
          'px-2 py-1 rounded': size === 'sm',
          'px-3 py-1.5 rounded-md': size === 'md',
        },
        className
      )}
    >
      {children}
    </span>
  );
});
