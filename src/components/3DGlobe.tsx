"use client"

import { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Sphere, MeshDistortMaterial } from '@react-three/drei'
import * as THREE from 'three'
import { useScroll, useTransform } from 'framer-motion'

function AnimatedSphere({ scrollYProgress }: { scrollYProgress: any }) {
  const meshRef = useRef<THREE.Mesh>(null)
  const materialRef = useRef<any>(null)
  
  // Transform scroll progress to rotation values
  const rotationX = useTransform(scrollYProgress, [0, 1], [0, Math.PI * 2])
  const rotationY = useTransform(scrollYProgress, [0, 1], [0, Math.PI * 4])
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1, 1.5, 1])
  const distort = useTransform(scrollYProgress, [0, 0.5, 1], [0.2, 0.8, 0.4])
  
  useFrame((state) => {
    if (meshRef.current && materialRef.current) {
      // Base rotation
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.5) * 0.2
      meshRef.current.rotation.y += 0.005
      
      // Scroll-based transformations
      meshRef.current.rotation.x += rotationX.get() * 0.1
      meshRef.current.rotation.y += rotationY.get() * 0.05
      meshRef.current.scale.setScalar(scale.get())
      
      // Material distortion based on scroll
      materialRef.current.distort = distort.get()
    }
  })

  return (
    <Sphere ref={meshRef} args={[1, 100, 200]} scale={2.5}>
      <MeshDistortMaterial
        ref={materialRef}
        color="#4f46e5"
        attach="material"
        distort={0.4}
        speed={2}
        roughness={0}
        metalness={1}
      />
    </Sphere>
  )
}

export function Globe3D() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  })

  return (
    <div ref={containerRef} className="h-96 w-full relative">
      <Canvas camera={{ position: [0, 0, 4] }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={1} />
        <AnimatedSphere scrollYProgress={scrollYProgress} />
      </Canvas>
      
      {/* Scroll indicator */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2">
        <div className="flex items-center gap-2 text-white/60 text-sm">
          <div className="w-2 h-2 bg-white/40 rounded-full animate-pulse" />
          <span>גלול כדי לחקור</span>
        </div>
      </div>
    </div>
  )
} 