// components/animated/reactbits/LightRays.tsx
'use client'

import { useRef, useEffect, useState } from 'react'
import { Renderer, Program, Triangle, Mesh } from 'ogl'

export type RaysOrigin =
  | 'top-center'
  | 'top-left'
  | 'top-right'
  | 'right'
  | 'left'
  | 'bottom-center'
  | 'bottom-right'
  | 'bottom-left'

interface LightRaysProps {
  raysOrigin?: RaysOrigin
  raysColor?: string
  raysSpeed?: number
  lightSpread?: number
  rayLength?: number
  pulsating?: boolean
  fadeDistance?: number
  saturation?: number
  followMouse?: boolean
  mouseInfluence?: number
  noiseAmount?: number
  distortion?: number
  className?: string
  respectReducedMotion?: boolean
}

const DEFAULT_COLOR = '#ffffff'

const hexToRgb = (hex: string): [number, number, number] => {
  const m = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
  return m
    ? [parseInt(m[1], 16) / 255, parseInt(m[2], 16) / 255, parseInt(m[3], 16) / 255]
    : [1, 1, 1]
}

const getAnchorAndDir = (
  origin: RaysOrigin,
  w: number,
  h: number
): { anchor: [number, number]; dir: [number, number] } => {
  const outside = 0.2
  switch (origin) {
    case 'top-left':
      return { anchor: [0, -outside * h], dir: [0, 1] }
    case 'top-right':
      return { anchor: [w, -outside * h], dir: [0, 1] }
    case 'left':
      return { anchor: [-outside * w, 0.5 * h], dir: [1, 0] }
    case 'right':
      return { anchor: [(1 + outside) * w, 0.5 * h], dir: [-1, 0] }
    case 'bottom-left':
      return { anchor: [0, (1 + outside) * h], dir: [0, -1] }
    case 'bottom-center':
      return { anchor: [0.5 * w, (1 + outside) * h], dir: [0, -1] }
    case 'bottom-right':
      return { anchor: [w, (1 + outside) * h], dir: [0, -1] }
    default:
      return { anchor: [0.5 * w, -outside * h], dir: [0, 1] }
  }
}

export default function LightRays({
  raysOrigin = 'top-center',
  raysColor = DEFAULT_COLOR,
  raysSpeed = 1,
  lightSpread = 1,
  rayLength = 2,
  pulsating = false,
  fadeDistance = 1.0,
  saturation = 1.0,
  followMouse = true,
  mouseInfluence = 0.1,
  noiseAmount = 0.0,
  distortion = 0.0,
  className = '',
  respectReducedMotion = true,
}: LightRaysProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const uniformsRef = useRef<any>(null)
  const rendererRef = useRef<Renderer | null>(null)
  const mouseRef = useRef({ x: 0.5, y: 0.5 })
  const smoothMouseRef = useRef({ x: 0.5, y: 0.5 })
  const animationIdRef = useRef<number | null>(null)
  const meshRef = useRef<any>(null)
  const cleanupFunctionRef = useRef<(() => void) | null>(null)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (!mounted || !containerRef.current) return

    if (cleanupFunctionRef.current) {
      cleanupFunctionRef.current()
      cleanupFunctionRef.current = null
    }

    const initializeWebGL = async () => {
      if (!containerRef.current) return
      await new Promise((resolve) => setTimeout(resolve, 10))
      if (!containerRef.current) return

      const renderer = new Renderer({
        dpr: Math.min(window.devicePixelRatio, 2),
        alpha: true,
      })
      rendererRef.current = renderer

      const gl = renderer.gl
      const canvas = gl.canvas as HTMLCanvasElement
      canvasRef.current = canvas
      
      // Position canvas absolutely within its parent container
      canvas.style.position = 'absolute'
      canvas.style.top = '0'
      canvas.style.left = '0'
      canvas.style.width = '100%'
      canvas.style.height = '100%'
      canvas.style.pointerEvents = 'none'
      canvas.style.zIndex = '1'
      canvas.style.margin = '0'
      canvas.style.padding = '0'
      canvas.style.border = 'none'
      canvas.style.outline = 'none'
      canvas.style.background = 'transparent'

      // Clear container and append canvas
      while (containerRef.current.firstChild) {
        containerRef.current.removeChild(containerRef.current.firstChild)
      }
      containerRef.current.appendChild(canvas)

      const vert = `
attribute vec2 position;
varying vec2 vUv;
void main() {
  vUv = position * 0.5 + 0.5;
  gl_Position = vec4(position, 0.0, 1.0);
}`

      const frag = `precision highp float;
uniform float iTime;
uniform vec2  iResolution;
uniform vec2  rayPos;
uniform vec2  rayDir;
uniform vec3  raysColor;
uniform float raysSpeed;
uniform float lightSpread;
uniform float rayLength;
uniform float pulsating;
uniform float fadeDistance;
uniform float saturation;
uniform vec2  mousePos;
uniform float mouseInfluence;
uniform float noiseAmount;
uniform float distortion;
varying vec2 vUv;

float noise(vec2 st) {
  return fract(sin(dot(st.xy, vec2(12.9898,78.233))) * 43758.5453123);
}

float rayStrength(vec2 raySource, vec2 rayRefDirection, vec2 coord,
                  float seedA, float seedB, float speed) {
  vec2 sourceToCoord = coord - raySource;
  vec2 dirNorm = normalize(sourceToCoord);
  float cosAngle = dot(dirNorm, rayRefDirection);
  float distortedAngle = cosAngle + distortion * sin(iTime * 2.0 + length(sourceToCoord) * 0.01) * 0.2;
  
  float spreadFactor = pow(max(distortedAngle, 0.0), 1.0 / max(lightSpread, 0.001));
  float distance = length(sourceToCoord);
  float maxDistance = max(iResolution.x, iResolution.y) * rayLength;
  float lengthFalloff = clamp((maxDistance - distance) / maxDistance, 0.0, 1.0);
  
  float fadeFalloff = clamp((max(iResolution.x, iResolution.y) * fadeDistance - distance) / (max(iResolution.x, iResolution.y) * fadeDistance), 0.0, 1.0);
  float pulse = pulsating > 0.5 ? (0.8 + 0.2 * sin(iTime * speed * 3.0)) : 1.0;
  float baseStrength = clamp(
    (0.45 + 0.15 * sin(distortedAngle * seedA + iTime * speed)) +
    (0.3 + 0.2 * cos(-distortedAngle * seedB + iTime * speed)),
    0.0, 1.0
  );
  return baseStrength * lengthFalloff * fadeFalloff * spreadFactor * pulse;
}

void mainImage(out vec4 fragColor, in vec2 fragCoord) {
  vec2 coord = vec2(fragCoord.x, iResolution.y - fragCoord.y);
  
  vec2 finalRayDir = rayDir;
  if (mouseInfluence > 0.0) {
    vec2 mouseScreenPos = mousePos * iResolution.xy;
    vec2 mouseDirection = normalize(mouseScreenPos - rayPos);
    finalRayDir = normalize(mix(rayDir, mouseDirection, mouseInfluence));
  }
  
  vec4 rays1 = vec4(1.0) *
               rayStrength(rayPos, finalRayDir, coord, 36.2214, 21.11349,
                           1.5 * raysSpeed);
  vec4 rays2 = vec4(1.0) *
               rayStrength(rayPos, finalRayDir, coord, 22.3991, 18.0234,
                           1.1 * raysSpeed);
  fragColor = rays1 * 0.5 + rays2 * 0.4;
  
  if (noiseAmount > 0.0) {
    float n = noise(coord * 0.01 + iTime * 0.1);
    fragColor.rgb *= (1.0 - noiseAmount + noiseAmount * n);
  }
  
  // Enhanced brightness gradient for better visibility
  float brightness = 1.0 - (coord.y / iResolution.y) * 0.7;
  fragColor.x *= 0.2 + brightness * 0.8;
  fragColor.y *= 0.4 + brightness * 0.6;
  fragColor.z *= 0.6 + brightness * 0.4;
  
  if (saturation != 1.0) {
    float gray = dot(fragColor.rgb, vec3(0.299, 0.587, 0.114));
    fragColor.rgb = mix(vec3(gray), fragColor.rgb, saturation);
  }
  
  fragColor.rgb *= raysColor;
  fragColor.a *= 0.6; // More transparent for subtle effect
}

void main() {
  vec4 color;
  mainImage(color, gl_FragCoord.xy);
  gl_FragColor = color;
}`

      const uniforms = {
        iTime: { value: 0 },
        iResolution: { value: [1, 1] },
        rayPos: { value: [0, 0] },
        rayDir: { value: [0, 1] },
        raysColor: { value: hexToRgb(raysColor) },
        raysSpeed: { value: raysSpeed },
        lightSpread: { value: lightSpread },
        rayLength: { value: rayLength },
        pulsating: { value: pulsating ? 1.0 : 0.0 },
        fadeDistance: { value: fadeDistance },
        saturation: { value: saturation },
        mousePos: { value: [0.5, 0.5] },
        mouseInfluence: { value: mouseInfluence },
        noiseAmount: { value: noiseAmount },
        distortion: { value: distortion },
      }
      uniformsRef.current = uniforms

      const geometry = new Triangle(gl)
      const program = new Program(gl, {
        vertex: vert,
        fragment: frag,
        uniforms,
      })
      const mesh = new Mesh(gl, { geometry, program })
      meshRef.current = mesh

      const updatePlacement = () => {
        if (!renderer || !containerRef.current) return
        renderer.dpr = Math.min(window.devicePixelRatio, 2)
        
        // Use full viewport dimensions to prevent clipping
        const wCSS = window.innerWidth
        const hCSS = window.innerHeight
        
        renderer.setSize(wCSS, hCSS)
        const dpr = renderer.dpr
        const w = wCSS * dpr
        const h = hCSS * dpr
        
        uniforms.iResolution.value = [w, h]
        const { anchor, dir } = getAnchorAndDir(raysOrigin, w, h)
        uniforms.rayPos.value = anchor
        uniforms.rayDir.value = dir
      }

      const loop = (t: number) => {
        if (!rendererRef.current || !uniformsRef.current || !meshRef.current) {
          return
        }
        uniforms.iTime.value = t * 0.001
        if (followMouse && mouseInfluence > 0.0) {
          const smoothing = 0.92
          smoothMouseRef.current.x =
            smoothMouseRef.current.x * smoothing +
            mouseRef.current.x * (1 - smoothing)
          smoothMouseRef.current.y =
            smoothMouseRef.current.y * smoothing +
            mouseRef.current.y * (1 - smoothing)
          uniforms.mousePos.value = [
            smoothMouseRef.current.x,
            smoothMouseRef.current.y,
          ]
        }
        try {
          renderer.render({ scene: mesh })
          animationIdRef.current = requestAnimationFrame(loop)
        } catch (error) {
          console.warn('WebGL rendering error:', error)
          return
        }
      }

      window.addEventListener('resize', updatePlacement)
      updatePlacement()
      animationIdRef.current = requestAnimationFrame(loop)

      cleanupFunctionRef.current = () => {
        if (animationIdRef.current) {
          cancelAnimationFrame(animationIdRef.current)
          animationIdRef.current = null
        }
        window.removeEventListener('resize', updatePlacement)
        if (renderer) {
          try {
            const canvas = renderer.gl.canvas
            const loseContextExt =
              renderer.gl.getExtension('WEBGL_lose_context')
            if (loseContextExt) {
              loseContextExt.loseContext()
            }
            if (canvas && canvas.parentNode) {
              canvas.parentNode.removeChild(canvas)
            }
          } catch (error) {
            console.warn('Error during WebGL cleanup:', error)
          }
        }
        rendererRef.current = null
        uniformsRef.current = null
        meshRef.current = null
        canvasRef.current = null
      }
    }

    initializeWebGL()
    return () => {
      if (cleanupFunctionRef.current) {
        cleanupFunctionRef.current()
        cleanupFunctionRef.current = null
      }
    }
  }, [mounted, raysOrigin, raysColor, raysSpeed, lightSpread, rayLength, pulsating, fadeDistance, saturation, followMouse, mouseInfluence, noiseAmount, distortion])

  useEffect(() => {
    if (!uniformsRef.current || !rendererRef.current) return
    const u = uniformsRef.current
    const renderer = rendererRef.current
    u.raysColor.value = hexToRgb(raysColor)
    u.raysSpeed.value = raysSpeed
    u.lightSpread.value = lightSpread
    u.rayLength.value = rayLength
    u.pulsating.value = pulsating ? 1.0 : 0.0
    u.fadeDistance.value = fadeDistance
    u.saturation.value = saturation
    u.mouseInfluence.value = mouseInfluence
    u.noiseAmount.value = noiseAmount
    u.distortion.value = distortion
    
    // Use full viewport dimensions
    const wCSS = window.innerWidth
    const hCSS = window.innerHeight
    const dpr = renderer.dpr
    const { anchor, dir } = getAnchorAndDir(raysOrigin, wCSS * dpr, hCSS * dpr)
    u.rayPos.value = anchor
    u.rayDir.value = dir
  }, [raysColor, raysSpeed, lightSpread, raysOrigin, rayLength, pulsating, fadeDistance, saturation, mouseInfluence, noiseAmount, distortion])

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      // Get mouse position relative to viewport for full coverage
      const x = e.clientX / window.innerWidth
      const y = e.clientY / window.innerHeight
      mouseRef.current = { x, y }
    }
    if (followMouse) {
      window.addEventListener('mousemove', handleMouseMove, { passive: true })
      return () => window.removeEventListener('mousemove', handleMouseMove)
    }
  }, [followMouse])

  if (!mounted) return null

  // Return container that will be positioned within the parent section
  return (
    <div
      ref={containerRef}
      className={`absolute pointer-events-none overflow-hidden ${className}`}
      style={{
        width: '100vw',
        height: '100vh',
        left: '50%',
        top: '0',
        transform: 'translateX(-50%)',
        zIndex: 1
      }}
    />
  )
}