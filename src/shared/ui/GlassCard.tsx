/**
 * @module GlassCard
 * @description Glassmorphic card component with glow effect
 * @performance Memoized, no unnecessary re-renders
 */

import React from 'react';
import { cn } from '@/shared/lib';

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  glow?: boolean;
  glowColor?: string;
}

export const GlassCard = React.memo(function GlassCard({
  children,
  className,
  hover = false,
  glow = false,
  glowColor = 'rgba(99, 102, 241, 0.15)',
}: GlassCardProps) {
  return (
    <div
      className={cn(
        'relative overflow-hidden rounded-2xl',
        'bg-surface/80 backdrop-blur-xl',
        'border border-border',
        'transition-all duration-300',
        hover && 'hover:border-accent-1/30 hover:bg-surface/90',
        className
      )}
      style={{
        boxShadow: glow ? `0 0 40px ${glowColor}` : undefined,
      }}
    >
      {/* Glass shimmer effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent pointer-events-none" />
      
      {/* Content */}
      <div className="relative z-10">{children}</div>
    </div>
  );
});
