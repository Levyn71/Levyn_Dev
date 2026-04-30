/**
 * @module math-utils
 * @description Mathematical utility functions for 3D and animations
 */

export const MathUtils = {
  lerp(start: number, end: number, t: number): number {
    return start * (1 - t) + end * t;
  },

  clamp(value: number, min: number, max: number): number {
    return Math.min(Math.max(value, min), max);
  },

  mapRange(value: number, inMin: number, inMax: number, outMin: number, outMax: number): number {
    return ((value - inMin) * (outMax - outMin)) / (inMax - inMin) + outMin;
  },

  degToRad(degrees: number): number {
    return (degrees * Math.PI) / 180;
  },

  radToDeg(radians: number): number {
    return (radians * 180) / Math.PI;
  },

  randomRange(min: number, max: number): number {
    return Math.random() * (max - min) + min;
  },

  randomInt(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  },

  smoothstep(min: number, max: number, value: number): number {
    const x = Math.max(0, Math.min(1, (value - min) / (max - min)));
    return x * x * (3 - 2 * x);
  },

  distance2D(x1: number, y1: number, x2: number, y2: number): number {
    const dx = x2 - x1;
    const dy = y2 - y1;
    return Math.sqrt(dx * dx + dy * dy);
  },

  distance3D(x1: number, y1: number, z1: number, x2: number, y2: number, z2: number): number {
    const dx = x2 - x1;
    const dy = y2 - y1;
    const dz = z2 - z1;
    return Math.sqrt(dx * dx + dy * dy + dz * dz);
  },

  sphericalToCartesian(radius: number, theta: number, phi: number): [number, number, number] {
    return [
      radius * Math.sin(phi) * Math.cos(theta),
      radius * Math.cos(phi),
      radius * Math.sin(phi) * Math.sin(theta),
    ];
  },

  cartesianToSpherical(x: number, y: number, z: number): [number, number, number] {
    const radius = Math.sqrt(x * x + y * y + z * z);
    const theta = Math.atan2(z, x);
    const phi = Math.acos(MathUtils.clamp(y / radius, -1, 1));
    return [radius, theta, phi];
  },
};
