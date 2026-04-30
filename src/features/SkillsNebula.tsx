/**
 * @module SkillsNebula
 * @description 3D floating skill tags in a nebula formation
 * @performance Frustum culling, distance-based LOD
 */

import React, { useRef, useMemo, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Text, Billboard } from '@react-three/drei';
import * as THREE from 'three';
import type { Skill } from '@/types';
import { portfolioData } from '@/shared/config';

interface SkillTagProps {
  skill: Skill;
  position: [number, number, number];
  onHover: (hovered: boolean) => void;
}

const SkillTag: React.FC<SkillTagProps> = ({ skill, position, onHover }) => {
  const groupRef = useRef<THREE.Group>(null);
  const [isHovered, setIsHovered] = useState(false);

  useFrame(({ clock }) => {
    if (!groupRef.current) return;
    
    // Gentle floating animation
    const time = clock.elapsedTime;
    groupRef.current.position.y = position[1] + Math.sin(time + position[0]) * 0.2;
    
    // Scale on hover
    const targetScale = isHovered ? 1.3 : 1;
    groupRef.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.1);
  });

  const handlePointerOver = () => {
    setIsHovered(true);
    onHover(true);
  };

  const handlePointerOut = () => {
    setIsHovered(false);
    onHover(false);
  };

  const color = skill.color || '#6366f1';

  return (
    <group
      ref={groupRef}
      position={position}
      onPointerOver={handlePointerOver}
      onPointerOut={handlePointerOut}
    >
      <Billboard>
        <Text
          fontSize={0.5}
          color={color}
          anchorX="center"
          anchorY="middle"
        >
          {skill.name}
          <meshBasicMaterial
            color={isHovered ? '#ffffff' : color}
            transparent
            opacity={isHovered ? 1 : 0.9}
          />
        </Text>
      </Billboard>
      
      {/* Glow effect */}
      <mesh scale={isHovered ? 1.5 : 0}>
        <sphereGeometry args={[0.8, 16, 16]} />
        <meshBasicMaterial
          color={color}
          transparent
          opacity={0.2}
        />
      </mesh>
    </group>
  );
};

const SkillCloud: React.FC = () => {
  const groupRef = useRef<THREE.Group>(null);
  const skills = portfolioData.skills;
  
  const positions = useMemo(() => {
    return skills.map((_, i) => {
      const phi = Math.acos(-1 + (2 * i) / skills.length);
      const theta = Math.sqrt(skills.length * Math.PI) * phi;
      const radius = 4 + Math.random() * 2;
      
      return [
        radius * Math.cos(theta) * Math.sin(phi),
        radius * Math.sin(theta) * Math.sin(phi),
        radius * Math.cos(phi),
      ] as [number, number, number];
    });
  }, [skills.length]);

  useFrame(({ clock }) => {
    if (!groupRef.current) return;
    groupRef.current.rotation.y = clock.elapsedTime * 0.05;
  });

  return (
    <group ref={groupRef}>
      {skills.map((skill, i) => (
        <SkillTag
          key={skill.name}
          skill={skill}
          position={positions[i]}
          onHover={() => {}}
        />
      ))}
    </group>
  );
};

interface SkillsNebulaProps {
  className?: string;
}

export const SkillsNebula: React.FC<SkillsNebulaProps> = ({ className }) => {
  return (
    <div className={`absolute inset-0 ${className}`}>
      <Canvas
        camera={{ position: [0, 0, 12], fov: 60 }}
        dpr={[1, 1.5]}
        frameloop="demand"
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: 'high-performance',
        }}
      >
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={0.5} />
        
        <SkillCloud />
      </Canvas>
    </div>
  );
};
