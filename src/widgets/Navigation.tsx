/**
 * @module Navigation
 * @description Glassmorphic floating navbar with scroll progress
 * @performance Minimal re-renders, RAF-based scroll progress
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAppStore, selectScroll } from '@/app/store';
import { sectionMeta } from '@/shared/config';

export const Navigation: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const scroll = useAppStore(selectScroll);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      {/* Scroll progress bar */}
      <div className="fixed top-0 left-0 right-0 z-[100] h-1 bg-transparent">
        <motion.div
          className="h-full bg-gradient-to-r from-accent-1 to-accent-2"
          style={{ scaleX: scroll.progress, transformOrigin: 'left' }}
        />
      </div>

      {/* Main navbar */}
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className={`fixed top-4 left-1/2 -translate-x-1/2 z-[99] px-6 py-3 rounded-2xl transition-all duration-300
          ${isScrolled 
            ? 'bg-surface/80 backdrop-blur-xl border border-border shadow-lg shadow-black/20' 
            : 'bg-transparent'}`}
      >
        <div className="flex items-center gap-8">
          {/* Logo */}
          <a href="#hero" onClick={() => scrollToSection('hero')} className="font-display font-bold text-white text-lg">
            Levyn<span className="text-accent-1">.</span>
          </a>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-6">
            {sectionMeta.slice(1).map((section) => (
              <button
                key={section.id}
                onClick={() => scrollToSection(section.id)}
                className={`text-sm font-medium transition-colors relative
                  ${scroll.section === section.id ? 'text-white' : 'text-slate-400 hover:text-white'}`}
              >
                {section.label}
                {scroll.section === section.id && (
                  <motion.div
                    layoutId="activeSection"
                    className="absolute -bottom-1 left-0 right-0 h-0.5 bg-accent-1 rounded-full"
                  />
                )}
              </button>
            ))}
          </div>

          {/* CTA */}
          <button
            onClick={() => scrollToSection('contact')}
            className="hidden md:block px-4 py-2 bg-accent-1 text-white text-sm font-medium rounded-lg hover:bg-accent-1-dark transition-colors"
          >
            Hire Me
          </button>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden w-8 h-8 flex items-center justify-center text-white"
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              {isMobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </motion.nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-x-4 top-20 z-[98] bg-surface/95 backdrop-blur-xl rounded-2xl border border-border p-4 md:hidden"
          >
            <div className="flex flex-col gap-2">
              {sectionMeta.map((section) => (
                <button
                  key={section.id}
                  onClick={() => scrollToSection(section.id)}
                  className={`px-4 py-3 rounded-lg text-left font-medium transition-colors
                    ${scroll.section === section.id 
                      ? 'bg-accent-1/10 text-white' 
                      : 'text-slate-400 hover:text-white'}`}
                >
                  <span className="font-mono text-accent-1 text-sm mr-2">0{section.index}</span>
                  {section.label}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
