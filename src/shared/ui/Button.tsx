/**
 * @module Button
 * @description Interactive button with magnetic effect and glow
 * @performance Memoized, event delegation optimized
 */

import React from 'react';
import { cn } from '@/shared/lib';
import { useMagneticEffect } from '@/shared/hooks';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  magnetic?: boolean;
  children: React.ReactNode;
}

export const Button = React.memo(function Button({
  variant = 'primary',
  size = 'md',
  magnetic = false,
  className,
  children,
  ...props
}: ButtonProps) {
  const magneticRef = useMagneticEffect<HTMLButtonElement>({
    strength: 0.2,
    radius: 100,
  });

  const baseStyles = cn(
    'relative inline-flex items-center justify-center',
    'font-medium transition-all duration-200',
    'focus:outline-none focus:ring-2 focus:ring-accent-1/50',
    'disabled:opacity-50 disabled:cursor-not-allowed',
    {
      // Variants
      'bg-accent-1 text-white hover:bg-accent-1-dark': variant === 'primary',
      'bg-surface text-white hover:bg-surface-light': variant === 'secondary',
      'bg-transparent text-white hover:bg-white/5': variant === 'ghost',
      'border border-border bg-transparent text-white hover:border-accent-1': variant === 'outline',
      // Sizes
      'px-4 py-2 text-sm rounded-lg': size === 'sm',
      'px-6 py-3 text-base rounded-xl': size === 'md',
      'px-8 py-4 text-lg rounded-xl': size === 'lg',
    },
    className
  );

  return (
    <button
      ref={magnetic ? magneticRef : null}
      className={baseStyles}
      {...props}
    >
      {/* Glow effect for primary */}
      {variant === 'primary' && (
        <span className="absolute inset-0 rounded-xl bg-accent-1/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
      )}
      <span className="relative z-10">{children}</span>
    </button>
  );
});
