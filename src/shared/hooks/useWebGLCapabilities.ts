/**
 * @module useWebGLCapabilities
 * @description Detects WebGL capabilities and determines fallback needs
 * @performance Runs once on mount, caches result
 */

import { useEffect, useState } from 'react';
import type { WebGLCapabilities } from '@/types';

export function useWebGLCapabilities(): WebGLCapabilities {
  const [capabilities, setCapabilities] = useState<WebGLCapabilities>({
    isWebGL2: false,
    maxTextureSize: 2048,
    maxAnisotropy: 1,
    canUseInstancing: false,
    fallbackRequired: true,
  });

  useEffect(() => {
    const canvas = document.createElement('canvas');
    const gl = canvas.getContext('webgl2') || canvas.getContext('webgl');
    
    if (!gl) {
      setCapabilities({
        isWebGL2: false,
        maxTextureSize: 0,
        maxAnisotropy: 0,
        canUseInstancing: false,
        fallbackRequired: true,
      });
      return;
    }

    const isWebGL2 = gl instanceof WebGL2RenderingContext;
    
    // Get max texture size
    const maxTextureSize = gl.getParameter(gl.MAX_TEXTURE_SIZE) as number;
    
    // Check for anisotropic filtering
    const ext = gl.getExtension('EXT_texture_filter_anisotropic') ||
                gl.getExtension('WEBKIT_EXT_texture_filter_anisotropic') ||
                gl.getExtension('MOZ_EXT_texture_filter_anisotropic');
    const maxAnisotropy = ext ? gl.getParameter(ext.MAX_TEXTURE_MAX_ANISOTROPY_EXT) as number : 1;
    
    // Check for instanced arrays (WebGL1) or native instancing (WebGL2)
    const canUseInstancing = isWebGL2 || !!gl.getExtension('ANGLE_instanced_arrays');
    
    // Determine if fallback is needed (low-end devices)
    const fallbackRequired = !isWebGL2 || maxTextureSize < 4096;

    setCapabilities({
      isWebGL2,
      maxTextureSize,
      maxAnisotropy,
      canUseInstancing,
      fallbackRequired,
    });

    // Cleanup
    const loseContext = gl.getExtension('WEBGL_lose_context');
    if (loseContext) {
      loseContext.loseContext();
    }
  }, []);

  return capabilities;
}
