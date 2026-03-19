import { useRef, useEffect, useMemo, useState } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'
import { Suspense } from 'react'
import { asciiVertexShader, asciiFragmentShader } from './asciiShaders'

interface AsciiPlaneProps {
  videoSrc: string
  progress: number
  hoverActive: number
}

function AsciiPlane({ videoSrc, progress, hoverActive }: AsciiPlaneProps) {
  const meshRef = useRef<THREE.Mesh>(null)
  const materialRef = useRef<THREE.ShaderMaterial>(null)
  const videoRef = useRef<HTMLVideoElement | null>(null)
  const textureRef = useRef<THREE.VideoTexture | null>(null)
  const { size, viewport } = useThree()

  const uniforms = useMemo(
    () => ({
      uImage: { value: null as THREE.VideoTexture | null },
      uTime: { value: 0 },
      uProgress: { value: 0 },
      uHoverActive: { value: 0 },
      uResolution: { value: new THREE.Vector2(size.width, size.height) },
      uPixelRatio: { value: Math.min(window.devicePixelRatio, 2) },
    }),
    [],
  )

  useEffect(() => {
    const video = document.createElement('video')
    video.src = videoSrc
    video.muted = true
    video.loop = true
    video.playsInline = true
    video.crossOrigin = 'anonymous'
    video.setAttribute('playsinline', '')
    video.style.display = 'none'
    document.body.appendChild(video)

    const playVideo = () => {
      video.play().catch(() => {
        // Autoplay blocked — retry on user interaction
        const retry = () => {
          video.play().catch(() => {})
          document.removeEventListener('click', retry)
          document.removeEventListener('touchstart', retry)
        }
        document.addEventListener('click', retry, { once: true })
        document.addEventListener('touchstart', retry, { once: true })
      })
    }

    video.addEventListener('loadeddata', playVideo)
    video.load()

    const texture = new THREE.VideoTexture(video)
    texture.minFilter = THREE.LinearFilter
    texture.magFilter = THREE.LinearFilter
    texture.format = THREE.RGBAFormat
    texture.colorSpace = THREE.SRGBColorSpace

    videoRef.current = video
    textureRef.current = texture
    uniforms.uImage.value = texture

    return () => {
      video.pause()
      video.removeEventListener('loadeddata', playVideo)
      video.src = ''
      video.load()
      if (video.parentNode) video.parentNode.removeChild(video)
      texture.dispose()
    }
  }, [videoSrc, uniforms])

  useFrame((state) => {
    if (!materialRef.current) return

    uniforms.uTime.value = state.clock.getElapsedTime()

    // Smooth interpolation toward target values
    uniforms.uProgress.value += (progress - uniforms.uProgress.value) * 0.08
    uniforms.uHoverActive.value += (hoverActive - uniforms.uHoverActive.value) * 0.1
    uniforms.uResolution.value.set(size.width, size.height)

    // Keep video texture updated
    if (textureRef.current && videoRef.current && !videoRef.current.paused) {
      textureRef.current.needsUpdate = true
    }
  })

  // Fill the viewport
  const scale: [number, number, number] = [viewport.width, viewport.height, 1]

  return (
    <mesh ref={meshRef} scale={scale}>
      <planeGeometry args={[1, 1]} />
      <shaderMaterial
        ref={materialRef}
        vertexShader={asciiVertexShader}
        fragmentShader={asciiFragmentShader}
        uniforms={uniforms}
      />
    </mesh>
  )
}

interface ShowcaseSceneProps {
  videoSrc: string
  progress: number
  hoverActive: number
  className?: string
}

export default function ShowcaseScene({
  videoSrc,
  progress,
  hoverActive,
  className = '',
}: ShowcaseSceneProps) {
  const [webglSupported, setWebglSupported] = useState(true)

  useEffect(() => {
    try {
      const canvas = document.createElement('canvas')
      const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl')
      if (!gl) setWebglSupported(false)
    } catch {
      setWebglSupported(false)
    }
  }, [])

  if (!webglSupported) {
    return (
      <div className={`bg-[#121813] ${className}`}>
        <video
          src={videoSrc}
          muted
          autoPlay
          loop
          playsInline
          className="h-full w-full object-cover opacity-70"
        />
      </div>
    )
  }

  return (
    <div className={className}>
      <Canvas
        camera={{ position: [0, 0, 1], fov: 45 }}
        style={{ background: '#121813' }}
        dpr={[1, 2]}
        gl={{ alpha: false, antialias: false, powerPreference: 'default' }}
        performance={{ min: 0.5 }}
      >
        <Suspense fallback={null}>
          <AsciiPlane
            videoSrc={videoSrc}
            progress={progress}
            hoverActive={hoverActive}
          />
        </Suspense>
      </Canvas>
    </div>
  )
}
