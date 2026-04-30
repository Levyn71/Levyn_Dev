/**
 * @module AssetLoader
 * @description Preloader with 3D animation and progress tracking
 * @performance Progress-driven animation sequence
 */

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAppStore, selectSetLoading, selectSetLoadingProgress } from '@/app/store';

interface AssetLoaderProps {
  children: React.ReactNode;
}

export const AssetLoader: React.FC<AssetLoaderProps> = ({ children }) => {
  const [progress, setProgress] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const setStoreLoading = useAppStore(selectSetLoading);
  const setStoreProgress = useAppStore(selectSetLoadingProgress);

  useEffect(() => {
    // Simulate asset loading with realistic progress
    const loadSequence = [
      { progress: 15, delay: 200 },
      { progress: 35, delay: 400 },
      { progress: 60, delay: 600 },
      { progress: 80, delay: 400 },
      { progress: 95, delay: 300 },
      { progress: 100, delay: 200 },
    ];

    let totalDelay = 0;
    loadSequence.forEach(({ progress: p, delay }) => {
      totalDelay += delay;
      setTimeout(() => {
        setProgress(p);
        setStoreProgress(p);
      }, totalDelay);
    });

    // Complete loading
    setTimeout(() => {
      setIsLoading(false);
      setStoreLoading(false);
    }, totalDelay + 500);

    return () => {
      setStoreLoading(true);
      setStoreProgress(0);
    };
  }, [setStoreLoading, setStoreProgress]);

  return (
    <>
      <AnimatePresence mode="wait">
        {isLoading && (
          <motion.div
            key="loader"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-[100] bg-void flex flex-col items-center justify-center"
          >
            {/* Loading animation container */}
            <div className="relative w-32 h-32 mb-8">
              {/* Outer ring */}
              <motion.div
                className="absolute inset-0 rounded-full border-2 border-accent-1/30"
                animate={{ rotate: 360 }}
                transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
                style={{ borderStyle: 'dashed' }}
              />
              
              {/* Middle ring */}
              <motion.div
                className="absolute inset-2 rounded-full border-2 border-accent-2/50"
                animate={{ rotate: -360 }}
                transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                style={{ borderStyle: 'dotted' }}
              />
              
              {/* Inner pulsing circle */}
              <motion.div
                className="absolute inset-4 rounded-full bg-gradient-to-br from-accent-1 to-accent-2"
                animate={{ scale: [1, 1.1, 1], opacity: [0.5, 0.8, 0.5] }}
                transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
              />
              
              {/* Percentage text */}
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="font-mono text-lg text-white font-semibold">
                  {Math.round(progress)}%
                </span>
              </div>
            </div>

            {/* Progress bar */}
            <div className="w-64 h-1 bg-surface rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-accent-1 to-accent-2 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.3, ease: 'easeOut' }}
              />
            </div>

            {/* Loading text */}
            <motion.p
              className="mt-4 text-sm text-slate-400 font-mono"
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
            >
              Initializing experience...
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main content */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: isLoading ? 0 : 1 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        {children}
      </motion.div>
    </>
  );
};
