"use client"

import { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Sphere, MeshDistortMaterial } from '@react-three/drei'
import * as THREE from 'three'

function AnimatedSphere() {
  const meshRef = useRef<THREE.Mesh>(null)
  const materialRef = useRef<any>(null)
  
  useFrame((state) => {
    if (meshRef.current && materialRef.current) {
      // Smooth rotation
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.3) * 0.1
      meshRef.current.rotation.y += 0.003
      
      // Subtle scale animation
      const scale = 1 + Math.sin(state.clock.elapsedTime * 0.5) * 0.05
      meshRef.current.scale.setScalar(scale)
      
      // Dynamic distortion
      materialRef.current.distort = 0.3 + Math.sin(state.clock.elapsedTime * 0.8) * 0.2
    }
  })

  return (
    <Sphere ref={meshRef} args={[1, 100, 200]} scale={3}>
      <MeshDistortMaterial
        ref={materialRef}
        color="#6366f1"
        attach="material"
        distort={0.4}
        speed={1.5}
        roughness={0.1}
        metalness={0.8}
        transparent
        opacity={0.9}
      />
    </Sphere>
  )
}

export function Globe3D() {
  return (
    <div className="absolute inset-0">
      <Canvas 
        camera={{ position: [0, 0, 5], fov: 60 }}
        style={{ background: 'transparent' }}
      >
        <ambientLight intensity={0.6} />
        <directionalLight position={[10, 10, 5]} intensity={0.8} />
        <pointLight position={[-10, -10, -5]} intensity={0.5} color="#6366f1" />
        <AnimatedSphere />
      </Canvas>
    </div>
  )
} 