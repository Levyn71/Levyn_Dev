/**
 * @module FloatingCards
 * @description 3D floating project cards with scroll-driven animation
 * @performance GPU-accelerated, lazy texture loading
 */

import React, { useRef, useState, useEffect, useCallback } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Html, PerspectiveCamera } from '@react-three/drei';
import * as THREE from 'three';
import type { Project } from '@/types';

interface ProjectCard3DProps {
  project: Project;
  index: number;
  total: number;
  activeIndex: number;
  onClick: () => void;
}

const GlowParticles: React.FC<{ isActive: boolean }> = ({ isActive }) => {
  const particlesRef = useRef<THREE.Points>(null);
  const particleCount = 20;
  
  const positions = React.useMemo(() => {
    const pos = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 4;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 5;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 2;
    }
    return pos;
  }, []);

  useFrame((state) => {
    if (!particlesRef.current || !isActive) return;
    particlesRef.current.rotation.y = state.clock.elapsedTime * 0.1;
    const scale = 1 + Math.sin(state.clock.elapsedTime * 2) * 0.1;
    particlesRef.current.scale.setScalar(scale);
  });

  if (!isActive) return null;

  return (
    <points ref={particlesRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={particleCount}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.05}
        color="#6366f1"
        transparent
        opacity={0.8}
        sizeAttenuation
      />
    </points>
  );
};

const ProjectCard3D: React.FC<ProjectCard3DProps> = ({
  project,
  index,
  activeIndex,
  onClick,
}) => {
  const meshRef = useRef<THREE.Group>(null);
  const [hovered, setHovered] = useState(false);
  const [entryProgress, setEntryProgress] = useState(0);
  
  const offset = index - activeIndex;
  const isActive = index === activeIndex;
  const isVisible = Math.abs(offset) <= 2;

  // Entry animation
  useEffect(() => {
    const timer = setTimeout(() => {
      setEntryProgress(1);
    }, index * 100);
    return () => clearTimeout(timer);
  }, [index]);

  useFrame((state) => {
    if (!meshRef.current) return;

    // Position cards in a curved layout with entry animation
    const targetX = offset * 3.5 * entryProgress;
    const targetZ = isActive ? 0 : -Math.abs(offset) * 1.5;
    const targetY = (Math.sin(offset * 0.3) * 0.5) * entryProgress;
    const targetRotY = offset * -0.2 * entryProgress;
    const targetScale = isActive ? 1 : (0.85 - Math.abs(offset) * 0.1) * entryProgress;

    // Smooth lerp with eased delta
    const lerpFactor = hovered ? 0.15 : 0.1;
    meshRef.current.position.x = THREE.MathUtils.lerp(meshRef.current.position.x, targetX, lerpFactor);
    meshRef.current.position.z = THREE.MathUtils.lerp(meshRef.current.position.z, targetZ, lerpFactor);
    meshRef.current.position.y = THREE.MathUtils.lerp(meshRef.current.position.y, targetY, lerpFactor);
    meshRef.current.rotation.y = THREE.MathUtils.lerp(meshRef.current.rotation.y, targetRotY, lerpFactor);
    
    const currentScale = meshRef.current.scale.x;
    const newScale = THREE.MathUtils.lerp(currentScale, targetScale, lerpFactor);
    meshRef.current.scale.set(newScale, newScale, newScale);

    // Subtle idle rotation for active card
    if (isActive) {
      meshRef.current.rotation.y += Math.sin(state.clock.elapsedTime * 0.5) * 0.002;
    }
  });

  if (!isVisible) return null;

  return (
    <group
      ref={meshRef}
      onClick={onClick}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
      <GlowParticles isActive={isActive} />
      <Float
        speed={isActive ? 2 : 1}
        rotationIntensity={hovered ? 0.3 : 0.05}
        floatIntensity={hovered ? 0.8 : 0.4}
        enabled={true}
      >
        {/* Card base */}
        <mesh>
          <boxGeometry args={[3, 4, 0.1]} />
          <meshStandardMaterial
            color="#0f172a"
            roughness={0.2}
            metalness={0.8}
          />
        </mesh>

        {/* Card glow edge with pulse effect */}
        <mesh scale={[3.05, 4.05, 0.05]} position={[0, 0, -0.05]}>
          <boxGeometry />
          <meshBasicMaterial
            color={isActive ? '#6366f1' : '#1e293b'}
            transparent
            opacity={isActive ? 0.6 + Math.sin(Date.now() * 0.003) * 0.2 : 0.3}
          />
        </mesh>
        
        {/* Active card glow ring */}
        {isActive && (
          <mesh scale={[3.3, 4.3, 0.02]} position={[0, 0, -0.08]}>
            <boxGeometry />
            <meshBasicMaterial
              color="#818cf8"
              transparent
              opacity={0.2}
            />
          </mesh>
        )}

        {/* Card Image Background */}
        <Html
          transform
          position={[0, 0.5, 0.05]}
          style={{
            width: '280px',
            height: '200px',
            pointerEvents: 'none',
          }}
        >
          <div className="w-full h-full overflow-hidden rounded-t-lg">
            <img
              src={project.thumbnail}
              alt={project.title}
              className="w-full h-full object-cover"
              style={{
                filter: isActive ? 'none' : 'grayscale(30%) brightness(0.7)',
                transition: 'filter 0.5s ease',
              }}
              onError={(e) => {
                (e.target as HTMLImageElement).style.display = 'none';
              }}
            />
          </div>
        </Html>

        {/* Content plane */}
        <Html
          transform
          occlude
          position={[0, -0.8, 0.06]}
          style={{
            width: '280px',
            height: '200px',
            pointerEvents: 'none',
          }}
        >
          <div
            className={`w-full h-full p-4 flex flex-col justify-end rounded-b-lg transition-all duration-300
              ${isActive ? 'opacity-100' : 'opacity-70'}`}
            style={{
              background: 'linear-gradient(to top, rgba(15, 23, 42, 1) 0%, rgba(15, 23, 42, 0.9) 100%)',
            }}
          >
            <span className="text-accent-2 font-mono text-xs mb-1">{project.year}</span>
            <h3 className="text-white font-display text-lg font-semibold mb-1">
              {project.title}
            </h3>
            <p className="text-slate-400 text-xs line-clamp-2 mb-2">
              {project.description}
            </p>
            <div className="flex flex-wrap gap-1">
              {project.tags.slice(0, 3).map((tag) => (
                <span
                  key={tag}
                  className="text-[10px] font-mono px-2 py-0.5 bg-accent-1/20 text-accent-1 rounded"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </Html>
      </Float>
    </group>
  );
};

interface FloatingCardsProps {
  projects: Project[];
  className?: string;
}

export const FloatingCards: React.FC<FloatingCardsProps> = ({
  projects,
  className,
}) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const cameraRef = useRef<THREE.PerspectiveCamera>(null);
  const autoPlayRef = useRef<NodeJS.Timeout | null>(null);

  const nextSlide = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % projects.length);
  }, [projects.length]);

  const prevSlide = useCallback(() => {
    setActiveIndex((prev) => (prev - 1 + projects.length) % projects.length);
  }, [projects.length]);

  // Auto-rotation
  useEffect(() => {
    if (isAutoPlaying) {
      autoPlayRef.current = setInterval(nextSlide, 4000);
    }
    return () => {
      if (autoPlayRef.current) {
        clearInterval(autoPlayRef.current);
      }
    };
  }, [isAutoPlaying, nextSlide]);

  const handleCardClick = (index: number) => {
    setActiveIndex(index);
    setIsAutoPlaying(false);
    // Resume auto-play after 10 seconds
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  return (
    <div className={`w-full h-[500px] relative ${className}`}>
      <Canvas
        dpr={[1, 1.5]}
        frameloop="demand"
        gl={{ antialias: true, alpha: true }}
      >
        <PerspectiveCamera
          ref={cameraRef}
          makeDefault
          position={[0, 0, 10]}
          fov={50}
        />
        
        <ambientLight intensity={0.4} />
        <directionalLight position={[5, 5, 5]} intensity={0.5} />
        <pointLight position={[-5, -5, -5]} color="#6366f1" intensity={0.3} />

        {projects.map((project, i) => (
          <ProjectCard3D
            key={project.id}
            project={project}
            index={i}
            total={projects.length}
            activeIndex={activeIndex}
            onClick={() => handleCardClick(i)}
          />
        ))}
      </Canvas>

      {/* Navigation arrows */}
      <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 flex justify-between px-4 pointer-events-none">
        <button
          onClick={prevSlide}
          className="pointer-events-auto w-12 h-12 rounded-full bg-slate-800/80 hover:bg-accent-1/80 backdrop-blur-sm flex items-center justify-center transition-all duration-300 hover:scale-110 group"
          aria-label="Previous project"
        >
          <svg className="w-6 h-6 text-white group-hover:scale-110 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <button
          onClick={nextSlide}
          className="pointer-events-auto w-12 h-12 rounded-full bg-slate-800/80 hover:bg-accent-1/80 backdrop-blur-sm flex items-center justify-center transition-all duration-300 hover:scale-110 group"
          aria-label="Next project"
        >
          <svg className="w-6 h-6 text-white group-hover:scale-110 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      {/* Navigation dots */}
      <div className="flex justify-center gap-2 mt-4">
        {projects.map((_, i) => (
          <button
            key={i}
            onClick={() => handleCardClick(i)}
            className={`h-2 rounded-full transition-all duration-500 ease-out
              ${i === activeIndex ? 'bg-accent-1 w-8' : 'bg-slate-600 hover:bg-slate-500 w-2'}`}
          />
        ))}
      </div>
    </div>
  );
};
