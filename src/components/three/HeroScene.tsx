import { useRef, useEffect } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { MeshDistortMaterial } from '@react-three/drei'
import type { Mesh } from 'three'
import { Suspense } from 'react'

function FloatingMesh() {
  const meshRef = useRef<Mesh>(null)
  const mouse = useRef({ x: 0, y: 0 })

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouse.current.x = (e.clientX / window.innerWidth) * 2 - 1
      mouse.current.y = -(e.clientY / window.innerHeight) * 2 + 1
    }
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  useFrame((state) => {
    if (!meshRef.current) return
    const t = state.clock.getElapsedTime()

    // Gentle floating
    meshRef.current.position.y = Math.sin(t * 0.5) * 0.3
    meshRef.current.position.x = Math.cos(t * 0.3) * 0.2

    // Mouse-driven rotation
    meshRef.current.rotation.x += (mouse.current.y * 0.3 - meshRef.current.rotation.x) * 0.05
    meshRef.current.rotation.y += (mouse.current.x * 0.3 - meshRef.current.rotation.y) * 0.05
  })

  return (
    <mesh ref={meshRef} scale={2.5}>
      <icosahedronGeometry args={[1, 4]} />
      <MeshDistortMaterial
        color="#ffffff"
        wireframe
        transparent
        opacity={0.08}
        distort={0.3}
        speed={2}
      />
    </mesh>
  )
}

export default function HeroScene() {
  return (
    <div className="absolute inset-0 z-0">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 45 }}
        style={{ background: 'transparent' }}
        dpr={[1, 1.5]}
        gl={{ alpha: true, antialias: true }}
      >
        <Suspense fallback={null}>
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} intensity={0.3} />
          <FloatingMesh />
        </Suspense>
      </Canvas>
    </div>
  )
}
