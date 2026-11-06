/**
 * @module Typewriter
 * @description Cycles through phrases with a type/delete animation and an animated pen cursor
 * @performance Single timer per step, cleaned up on unmount
 */

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/shared/lib';

interface TypewriterProps {
  phrases: string[];
  className?: string;
  textClassName?: string;
  penClassName?: string;
  typingSpeed?: number;
  deletingSpeed?: number;
  holdDelay?: number;
}

export const Typewriter: React.FC<TypewriterProps> = ({
  phrases,
  className,
  textClassName,
  penClassName,
  typingSpeed = 75,
  deletingSpeed = 35,
  holdDelay = 1400,
}) => {
  const [index, setIndex] = useState(0);
  const [text, setText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const current = phrases[index % phrases.length];

    let delay: number;
    let action: () => void;

    if (!isDeleting && text === current) {
      // Finished writing — hold before erasing.
      delay = holdDelay;
      action = () => setIsDeleting(true);
    } else if (isDeleting && text === '') {
      // Finished erasing — advance to the next phrase.
      delay = 420;
      action = () => {
        setIsDeleting(false);
        setIndex((prev) => (prev + 1) % phrases.length);
      };
    } else {
      delay = isDeleting ? deletingSpeed : typingSpeed;
      action = () =>
        setText((prev) =>
          isDeleting ? current.slice(0, prev.length - 1) : current.slice(0, prev.length + 1)
        );
    }

    const timer = setTimeout(action, delay);
    return () => clearTimeout(timer);
  }, [text, isDeleting, index, phrases, typingSpeed, deletingSpeed, holdDelay]);

  return (
    <span className={className}>
      {/* Full text for assistive tech; the animation is decorative */}
      <span className="sr-only">{phrases.join(', ')}</span>
      <span className={textClassName} aria-hidden="true">
        {text}
      </span>
      <motion.span
        className={cn('ml-1 inline-block align-middle', penClassName)}
        aria-hidden="true"
        animate={{ y: [0, -2, 0], rotate: [0, -9, 0] }}
        transition={{ duration: 0.7, repeat: Infinity, ease: 'easeInOut' }}
      >
        <svg
          className="h-[0.9em] w-[0.9em]"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M12 20h9" />
          <path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z" />
        </svg>
      </motion.span>
    </span>
  );
};
