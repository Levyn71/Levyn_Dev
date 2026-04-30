/**
 * @module TimelineTunnel
 * @description 3D scroll-driven timeline tunnel for experience section
 * @performance ScrollTrigger-driven, GPU-transformed
 */

import React, { useRef, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useScroll, PerspectiveCamera } from '@react-three/drei';
import * as THREE from 'three';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import type { Experience } from '@/types';

gsap.registerPlugin(ScrollTrigger);

interface TunnelSegmentProps {
  experience: Experience;
  index: number;
  total: number;
}

const TunnelSegment: React.FC<TunnelSegmentProps> = ({
  experience,
  index,
  total,
}) => {
  const groupRef = useRef<THREE.Group>(null);
  const scroll = useScroll();
  
  const zPosition = -index * 8;

  useFrame(() => {
    if (!groupRef.current) return;
    
    const scrollProgress = scroll.offset;
    const segmentStart = index / total;
    const segmentEnd = (index + 1) / total;
    
    // Fade in/out based on scroll position
    const inRange = scrollProgress >= segmentStart - 0.1 && scrollProgress <= segmentEnd + 0.1;
    const targetOpacity = inRange ? 1 : 0.3;
    
    // Move through tunnel
    const tunnelProgress = (scrollProgress * total - index) * 8;
    groupRef.current.position.z = zPosition + tunnelProgress;
    
    // Scale based on distance
    const scale = Math.max(0.5, 1 - Math.abs(tunnelProgress) * 0.05);
    groupRef.current.scale.setScalar(scale);
    
    // Rotation for tunnel effect
    groupRef.current.rotation.z = scrollProgress * Math.PI * 0.25;
  });

  return (
    <group ref={groupRef} position={[0, 0, zPosition]}>
      {/* Main platform */}
      <mesh position={[0, 0, 0]}>
        <cylinderGeometry args={[2, 2, 0.2, 32]} />
        <meshStandardMaterial color="#1e293b" metalness={0.6} roughness={0.3} />
      </mesh>
      
      {/* Glow ring */}
      <mesh position={[0, 0, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[2.2, 0.1, 16, 64]} />
        <meshBasicMaterial color="#6366f1" transparent opacity={0.3} />
      </mesh>

      {/* Vertical text display */}
      <group position={[3, 0, 0]}>
        {/* Company name */}
        <mesh>
          <boxGeometry args={[0.1, 3, 0.1]} />
          <meshBasicMaterial color="#6366f1" />
        </mesh>
      </group>
    </group>
  );
};

interface TimelineTunnelProps {
  experiences: Experience[];
  className?: string;
}

export const TimelineTunnel: React.FC<TimelineTunnelProps> = ({
  experiences,
  className,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <div ref={containerRef} className={`h-screen ${className}`}>
      <Canvas
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true }}
      >
        <PerspectiveCamera makeDefault position={[0, 0, 10]} fov={60} />
        
        <ambientLight intensity={0.3} />
        <pointLight position={[0, 5, 5]} color="#6366f1" intensity={0.5} />
        <pointLight position={[0, -5, -5]} color="#06b6d4" intensity={0.3} />
        
        {/* Fog for depth */}
        <fog attach="fog" args={['#030712', 5, 30]} />
        
        <ScrollControls pages={experiences.length} damping={0.2}>
          {experiences.map((exp, i) => (
            <TunnelSegment
              key={exp.id}
              experience={exp}
              index={i}
              total={experiences.length}
            />
          ))}
        </ScrollControls>
      </Canvas>
    </div>
  );
};

// ScrollControls wrapper
import { useScroll as useDreiScroll, ScrollControls } from '@react-three/drei';
