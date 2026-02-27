import { useRef, useEffect, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { Suspense } from 'react'
import { vertexShader, fragmentShader } from './shaders'

function FloatingShape() {
  const meshRef = useRef<THREE.Mesh>(null)
  const mouse = useRef({ x: 0, y: 0 })

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uDistort: { value: 0.2 },
      uOpacity: { value: 0.06 },
    }),
    [],
  )

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouse.current.x = (e.clientX / window.innerWidth) * 2 - 1
      mouse.current.y = -(e.clientY / window.innerHeight) * 2 + 1
    }
    window.addEventListener('mousemove', handleMouseMove, { passive: true })
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  useFrame((state) => {
    if (!meshRef.current) return
    const t = state.clock.getElapsedTime()

    uniforms.uTime.value = t

    // Gentle floating
    meshRef.current.position.y = Math.sin(t * 0.4) * 0.4
    meshRef.current.position.x = Math.cos(t * 0.25) * 0.3

    // Slow auto-rotation
    meshRef.current.rotation.z += 0.002

    // Mouse-driven rotation
    meshRef.current.rotation.x += (mouse.current.y * 0.4 - meshRef.current.rotation.x) * 0.03
    meshRef.current.rotation.y += (mouse.current.x * 0.4 - meshRef.current.rotation.y) * 0.03
  })

  return (
    <mesh ref={meshRef} scale={2.2}>
      <torusKnotGeometry args={[1, 0.3, 64, 16]} />
      <shaderMaterial
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
        wireframe
        transparent
      />
    </mesh>
  )
}

export default function WorkScene() {
  return (
    <div className="absolute inset-0 z-0">
      <Canvas
        camera={{ position: [0, 0, 6], fov: 45 }}
        style={{ background: 'transparent' }}
        dpr={[1, 1]}
        gl={{ alpha: true, antialias: false, powerPreference: 'low-power' }}
        performance={{ min: 0.5 }}
      >
        <Suspense fallback={null}>
          <FloatingShape />
        </Suspense>
      </Canvas>
    </div>
  )
}
