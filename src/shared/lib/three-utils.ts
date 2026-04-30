/**
 * @module three-utils
 * @description Three.js specific utilities and helpers
 */

import * as THREE from 'three';

export const ThreeUtils = {
  createGradientTexture(colors: string[], size: number = 512): THREE.CanvasTexture {
    const canvas = document.createElement('canvas');
    canvas.width = size;
    canvas.height = size;
    const ctx = canvas.getContext('2d')!;

    const gradient = ctx.createLinearGradient(0, 0, size, size);
    colors.forEach((color, i) => {
      gradient.addColorStop(i / (colors.length - 1), color);
    });

    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, size, size);

    const texture = new THREE.CanvasTexture(canvas);
    texture.needsUpdate = true;
    return texture;
  },

  disposeMaterial(material: THREE.Material | THREE.Material[]): void {
    const materials = Array.isArray(material) ? material : [material];
    materials.forEach((mat) => {
      mat.dispose();
      // Dispose textures if they exist
      Object.values(mat).forEach((value) => {
        if (value instanceof THREE.Texture) {
          value.dispose();
        }
      });
    });
  },

  disposeGeometry(geometry: THREE.BufferGeometry): void {
    geometry.dispose();
  },

  createNoiseTexture(size: number = 512): THREE.DataTexture {
    const data = new Uint8Array(size * size * 4);
    for (let i = 0; i < size * size * 4; i += 4) {
      const value = Math.floor(Math.random() * 255);
      data[i] = value;
      data[i + 1] = value;
      data[i + 2] = value;
      data[i + 3] = 255;
    }
    const texture = new THREE.DataTexture(data, size, size);
    texture.needsUpdate = true;
    return texture;
  },

  fitCameraToObject(camera: THREE.PerspectiveCamera, object: THREE.Object3D, offset: number = 1.25): void {
    const boundingBox = new THREE.Box3().setFromObject(object);
    const center = boundingBox.getCenter(new THREE.Vector3());
    const size = boundingBox.getSize(new THREE.Vector3());
    const maxDim = Math.max(size.x, size.y, size.z);
    const fov = camera.fov * (Math.PI / 180);
    let cameraZ = Math.abs((maxDim / 2) / Math.tan(fov / 2)) * offset;
    
    camera.position.set(center.x, center.y, cameraZ);
    camera.lookAt(center);
    camera.updateProjectionMatrix();
  },

  hexToVec3(hex: string): THREE.Vector3 {
    const color = new THREE.Color(hex);
    return new THREE.Vector3(color.r, color.g, color.b);
  },
};
