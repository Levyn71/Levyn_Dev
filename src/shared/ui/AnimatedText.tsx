/**
 * @module AnimatedText
 * @description Text animation component with typewriter and reveal effects
 * @performance Uses CSS animations, minimal JS overhead
 */

import React, { useEffect, useState, useRef } from 'react';
import { cn } from '@/shared/lib';

interface AnimatedTextProps {
  text: string;
  className?: string;
  delay?: number;
  type?: 'typewriter' | 'fade' | 'slide';
  speed?: number;
}

export const AnimatedText: React.FC<AnimatedTextProps> = ({
  text,
  className,
  delay = 0,
  type = 'fade',
  speed = 50,
}) => {
  const [displayText, setDisplayText] = useState(type === 'typewriter' ? '' : text);
  const [isVisible, setIsVisible] = useState(false);
  const containerRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), delay);
    return () => clearTimeout(timer);
  }, [delay]);

  useEffect(() => {
    if (type !== 'typewriter' || !isVisible) return;

    let currentIndex = 0;
    const interval = setInterval(() => {
      if (currentIndex <= text.length) {
        setDisplayText(text.slice(0, currentIndex));
        currentIndex++;
      } else {
        clearInterval(interval);
      }
    }, speed);

    return () => clearInterval(interval);
  }, [text, type, speed, isVisible]);

  const animationClasses = {
    fade: isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4',
    slide: isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4',
    typewriter: isVisible ? 'opacity-100' : 'opacity-0',
  };

  return (
    <span
      ref={containerRef}
      className={cn(
        'inline-block transition-all duration-500',
        animationClasses[type],
        className
      )}
    >
      {displayText}
      {type === 'typewriter' && isVisible && (
        <span className="inline-block w-0.5 h-5 ml-1 bg-accent-1 animate-pulse" />
      )}
    </span>
  );
};
