/**
 * @module types
 * @description Global TypeScript interfaces and type definitions
 * @performance Type-only exports, zero runtime overhead
 */

import { Vector3 } from 'three';
import { z } from 'zod';

// ============================================================================
// ZOD SCHEMAS - Runtime Validation
// ============================================================================

export const SkillSchema = z.object({
  name: z.string(),
  level: z.number().min(0).max(100),
  category: z.enum(['frontend', 'backend', '3d', 'design', 'tools']),
  icon: z.string().optional(),
  color: z.string().optional(),
});

export const ProjectSchema = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string(),
  thumbnail: z.string(),
  tags: z.array(z.string()),
  links: z.object({
    demo: z.string().optional(),
    github: z.string().optional(),
    case: z.string().optional(),
  }),
  featured: z.boolean().default(false),
  year: z.number(),
});

export const ExperienceSchema = z.object({
  id: z.string(),
  role: z.string(),
  company: z.string(),
  location: z.string(),
  period: z.object({
    start: z.string(),
    end: z.string().optional(),
    current: z.boolean().default(false),
  }),
  description: z.array(z.string()),
  technologies: z.array(z.string()),
});

export const EventSchema = z.object({
  id: z.string(),
  title: z.string(),
  type: z.enum(['conference', 'award', 'hackathon', 'workshop', 'speaking', 'other']),
  date: z.string(),
  location: z.string().optional(),
  description: z.string(),
  link: z.string().url().optional(),
  year: z.number(),
});

export const SocialLinkSchema = z.object({
  platform: z.enum(['github', 'linkedin', 'twitter', 'dribbble', 'email']),
  url: z.string().url(),
  handle: z.string(),
});

export const PortfolioSchema = z.object({
  name: z.string(),
  role: z.string(),
  tagline: z.string(),
  bio: z.array(z.string()),
  skills: z.array(SkillSchema),
  projects: z.array(ProjectSchema),
  experience: z.array(ExperienceSchema),
  events: z.array(EventSchema),
  social: z.array(SocialLinkSchema),
  contact: z.object({
    email: z.string().email(),
    availability: z.enum(['available', 'limited', 'unavailable']),
  }),
});

// ============================================================================
// INFERRED TYPES
// ============================================================================

export type Skill = z.infer<typeof SkillSchema>;
export type Project = z.infer<typeof ProjectSchema>;
export type Experience = z.infer<typeof ExperienceSchema>;
export type Event = z.infer<typeof EventSchema>;
export type SocialLink = z.infer<typeof SocialLinkSchema>;
export type PortfolioData = z.infer<typeof PortfolioSchema>;

// ============================================================================
// 3D & ANIMATION TYPES
// ============================================================================

export interface WebGLCapabilities {
  isWebGL2: boolean;
  maxTextureSize: number;
  maxAnisotropy: number;
  canUseInstancing: boolean;
  fallbackRequired: boolean;
}

export interface ParticleData {
  position: Vector3;
  velocity: Vector3;
  size: number;
  color: string;
  life: number;
}

export interface ScrollState {
  progress: number;
  section: string;
  direction: 'up' | 'down';
  velocity: number;
}

export interface CursorState {
  x: number;
  y: number;
  normalizedX: number;
  normalizedY: number;
  isHovering: boolean;
  hoverTarget: string | null;
}

export interface AnimationConfig {
  duration: number;
  ease: string;
  stagger?: number;
  delay?: number;
}

export type SectionId = 'hero' | 'about' | 'skills' | 'projects' | 'experience' | 'events' | 'contact';

export interface SectionMeta {
  id: SectionId;
  label: string;
  index: number;
}

// ============================================================================
// COMPONENT PROP TYPES
// ============================================================================

export interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  glow?: boolean;
}

export interface ProjectCardProps {
  project: Project;
  index: number;
  isActive?: boolean;
}

export interface SkillBadgeProps {
  skill: Skill;
  size?: 'sm' | 'md' | 'lg';
  interactive?: boolean;
}

export interface TimelineItemProps {
  experience: Experience;
  index: number;
  isLast?: boolean;
}

export interface NavLinkProps {
  section: SectionMeta;
  isActive: boolean;
  onClick: () => void;
}

// ============================================================================
// SHADER TYPES
// ============================================================================

export interface UniformConfig {
  [key: string]: {
    value: number | Vector3 | number[] | THREE.Texture;
    type?: 'f' | 'v2' | 'v3' | 't';
  };
}

export interface ShaderMaterialConfig {
  uniforms: UniformConfig;
  vertexShader: string;
  fragmentShader: string;
  transparent?: boolean;
  side?: THREE.Side;
}

// ============================================================================
// STORE TYPES
// ============================================================================

export interface AppState {
  scroll: ScrollState;
  cursor: CursorState;
  webgl: WebGLCapabilities;
  isLoading: boolean;
  loadingProgress: number;
  reducedMotion: boolean;
}

export interface AppActions {
  setScroll: (scroll: Partial<ScrollState>) => void;
  setCursor: (cursor: Partial<CursorState>) => void;
  setWebGL: (webgl: Partial<WebGLCapabilities>) => void;
  setLoading: (isLoading: boolean) => void;
  setLoadingProgress: (progress: number) => void;
  setReducedMotion: (reduced: boolean) => void;
}

export type AppStore = AppState & AppActions;
