/**
 * @module store
 * @description Zustand global state management
 * @performance Minimal re-renders, selective subscriptions
 */

import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';
import type { AppStore, ScrollState, CursorState, WebGLCapabilities } from '@/types';

const initialScroll: ScrollState = {
  progress: 0,
  section: 'hero',
  direction: 'down',
  velocity: 0,
};

const initialCursor: CursorState = {
  x: 0,
  y: 0,
  normalizedX: 0,
  normalizedY: 0,
  isHovering: false,
  hoverTarget: null,
};

const initialWebGL: WebGLCapabilities = {
  isWebGL2: true,
  maxTextureSize: 4096,
  maxAnisotropy: 16,
  canUseInstancing: true,
  fallbackRequired: false,
};

export const useAppStore = create<AppStore>()(
  devtools(
    immer((set) => ({
      // Initial state
      scroll: initialScroll,
      cursor: initialCursor,
      webgl: initialWebGL,
      isLoading: true,
      loadingProgress: 0,
      reducedMotion: false,

      // Actions
      setScroll: (scroll) =>
        set((state) => {
          state.scroll = { ...state.scroll, ...scroll };
        }),

      setCursor: (cursor) =>
        set((state) => {
          state.cursor = { ...state.cursor, ...cursor };
        }),

      setWebGL: (webgl) =>
        set((state) => {
          state.webgl = { ...state.webgl, ...webgl };
        }),

      setLoading: (isLoading) =>
        set((state) => {
          state.isLoading = isLoading;
        }),

      setLoadingProgress: (progress) =>
        set((state) => {
          state.loadingProgress = Math.min(100, Math.max(0, progress));
        }),

      setReducedMotion: (reduced) =>
        set((state) => {
          state.reducedMotion = reduced;
        }),
    })),
    { name: 'AppStore' }
  )
);

// Selectors for performance - components subscribe to only what they need
export const selectScroll = (state: AppStore) => state.scroll;
export const selectCursor = (state: AppStore) => state.cursor;
export const selectWebGL = (state: AppStore) => state.webgl;
export const selectIsLoading = (state: AppStore) => state.isLoading;
export const selectLoadingProgress = (state: AppStore) => state.loadingProgress;
export const selectReducedMotion = (state: AppStore) => state.reducedMotion;

// Actions
export const selectSetScroll = (state: AppStore) => state.setScroll;
export const selectSetCursor = (state: AppStore) => state.setCursor;
export const selectSetLoading = (state: AppStore) => state.setLoading;
export const selectSetLoadingProgress = (state: AppStore) => state.setLoadingProgress;
export const selectSetReducedMotion = (state: AppStore) => state.setReducedMotion;
