/**
 * @module App
 * @description Main application component with all sections
 * @performance Memoized sections, optimized re-renders
 */

import React, { useEffect } from 'react';
import { AssetLoader, MagneticCursor, Chatbot } from '@/features';
import { Hero, About, Skills, Projects, Experience, Events, Contact, Navigation } from '@/widgets';
import { useScrollProgress, useMousePosition, useReducedMotion } from '@/shared/hooks';
import { useAppStore, selectSetReducedMotion } from './store';

export const App: React.FC = () => {
  const setReducedMotion = useAppStore(selectSetReducedMotion);
  const prefersReducedMotion = useReducedMotion();
  
  // Initialize global tracking
  useScrollProgress();
  useMousePosition();

  // Sync reduced motion preference
  useEffect(() => {
    setReducedMotion(prefersReducedMotion);
  }, [prefersReducedMotion, setReducedMotion]);

  return (
    <AssetLoader>
      <div className="relative min-h-screen bg-void overflow-x-hidden">
        {/* Custom cursor */}
        <MagneticCursor />
        
        {/* Navigation */}
        <Navigation />
        
        {/* Main content */}
        <main>
          <Hero />
          <About />
          <Skills />
          <Projects />
          <Experience />
          <Events />
          <Contact />
        </main>
        
        {/* Footer */}
        <footer className="py-8 px-4 border-t border-border">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-slate-400 text-sm">
              © {new Date().getFullYear()} Levyn. All rights reserved.
            </p>
            <p className="text-slate-500 text-sm font-mono">
              Built with React, Three.js & Tailwind CSS
            </p>
          </div>
        </footer>

        {/* Floating Chatbot */}
        <Chatbot />
      </div>
    </AssetLoader>
  );
};
