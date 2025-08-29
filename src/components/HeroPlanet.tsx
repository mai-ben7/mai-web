"use client"

import { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Sphere, Ring, MeshDistortMaterial } from '@react-three/drei'
import * as THREE from 'three'

function AnimatedPlanet() {
  const planetRef = useRef<THREE.Mesh>(null)
  const ringsRef = useRef<THREE.Group>(null)
  const planetMaterialRef = useRef<any>(null)
  
  useFrame((state) => {
    if (planetRef.current) {
      // Smooth rotation
      planetRef.current.rotation.y += 0.002
      planetRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.3) * 0.1
      
      // Subtle scale animation
      const scale = 1 + Math.sin(state.clock.elapsedTime * 0.5) * 0.03
      planetRef.current.scale.setScalar(scale)
    }
    
    if (ringsRef.current) {
      // Rotate rings independently
      ringsRef.current.rotation.z += 0.001
      ringsRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.2) * 0.05
    }
    
    if (planetMaterialRef.current) {
      // Dynamic distortion
      planetMaterialRef.current.distort = 0.2 + Math.sin(state.clock.elapsedTime * 0.6) * 0.1
    }
  })

  return (
    <group>
      {/* Main Planet */}
      <Sphere ref={planetRef} args={[1, 64, 64]} scale={2.5}>
        <MeshDistortMaterial
          ref={planetMaterialRef}
          color="#4f9eff"
          attach="material"
          distort={0.3}
          speed={1.2}
          roughness={0.1}
          metalness={0.9}
          transparent
          opacity={0.95}
        />
      </Sphere>
      
      {/* Planet Rings */}
      <group ref={ringsRef} position={[0, 0, 0]}>
        {/* Inner Ring */}
        <Ring 
          args={[1.8, 2.2, 64]} 
          rotation={[Math.PI / 2, 0, 0]}
        >
          <meshBasicMaterial 
            color="#ff6b9d" 
            transparent 
            opacity={0.6}
            side={THREE.DoubleSide}
          />
        </Ring>
        
        {/* Middle Ring */}
        <Ring 
          args={[2.3, 2.7, 64]} 
          rotation={[Math.PI / 2, 0, 0]}
        >
          <meshBasicMaterial 
            color="#7aa3ff" 
            transparent 
            opacity={0.4}
            side={THREE.DoubleSide}
          />
        </Ring>
        
        {/* Outer Ring */}
        <Ring 
          args={[2.8, 3.2, 64]} 
          rotation={[Math.PI / 2, 0, 0]}
        >
          <meshBasicMaterial 
            color="#4f9eff" 
            transparent 
            opacity={0.3}
            side={THREE.DoubleSide}
          />
        </Ring>
      </group>
    </group>
  )
}

function BackgroundParticles() {
  const particlesRef = useRef<THREE.Points>(null)
  
  const { geometry, material } = useMemo(() => {
    const particleCount = 2000
    const positions = new Float32Array(particleCount * 3)
    const colors = new Float32Array(particleCount * 3)
    const sizes = new Float32Array(particleCount)
    
    for (let i = 0; i < particleCount; i++) {
      const i3 = i * 3
      
      // Position in a large sphere
      const radius = 20 + Math.random() * 30
      const theta = Math.random() * Math.PI * 2
      const phi = Math.acos(Math.random() * 2 - 1)
      
      positions[i3] = radius * Math.sin(phi) * Math.cos(theta)
      positions[i3 + 1] = radius * Math.sin(phi) * Math.sin(theta)
      positions[i3 + 2] = radius * Math.cos(phi)
      
      // Colors - blues and purples
      const colorChoice = Math.random()
      if (colorChoice < 0.6) {
        colors[i3] = 0.3 + Math.random() * 0.4 // Blue
        colors[i3 + 1] = 0.4 + Math.random() * 0.4
        colors[i3 + 2] = 0.8 + Math.random() * 0.2
      } else {
        colors[i3] = 0.6 + Math.random() * 0.4 // Purple
        colors[i3 + 1] = 0.3 + Math.random() * 0.4
        colors[i3 + 2] = 0.8 + Math.random() * 0.2
      }
      
      sizes[i] = Math.random() * 2 + 0.5
    }
    
    const geometry = new THREE.BufferGeometry()
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3))
    geometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1))
    
    const material = new THREE.PointsMaterial({
      size: 0.1,
      vertexColors: true,
      transparent: true,
      opacity: 0.8,
      blending: THREE.AdditiveBlending,
      depthWrite: false
    })
    
    return { geometry, material }
  }, [])
  
  useFrame((state) => {
    if (particlesRef.current) {
      particlesRef.current.rotation.y += 0.0005
      particlesRef.current.rotation.x += 0.0002
    }
  })
  
  return <points ref={particlesRef} geometry={geometry} material={material} />
}

export function HeroPlanet() {
  return (
    <Canvas 
      camera={{ position: [0, 0, 8], fov: 60 }}
      style={{ 
        background: 'transparent',
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 0,
        pointerEvents: 'none'
      }}
      gl={{ 
        antialias: true, 
        alpha: true,
        powerPreference: "high-performance"
      }}
    >
      <ambientLight intensity={0.3} />
      <directionalLight position={[10, 10, 5]} intensity={0.8} />
      <pointLight position={[-10, -10, -5]} intensity={0.6} color="#4f9eff" />
      <pointLight position={[10, -10, -5]} intensity={0.4} color="#ff6b9d" />
      
      <AnimatedPlanet />
      <BackgroundParticles />
    </Canvas>
  )
}
