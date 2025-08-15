"use client"

import { useRef, useMemo } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { Points, PointMaterial } from "@react-three/drei"
import * as random from "maath/random"
import { BufferGeometry, BufferAttribute, Vector3, Color, AdditiveBlending } from "three"
import * as THREE from "three"

interface EnergyParticle {
  position: Vector3
  velocity: Vector3
  trail: Vector3[]
  maxTrailLength: number
  color: string
}

function EnergyField() {
  const pointsRef = useRef<any>(null)
  const trailsRef = useRef<any>(null)
  
  // Create energy particles
  const particles = useMemo(() => {
    const particleCount = 30
    const particles: EnergyParticle[] = []
    
    const lightColors = [
      "#60a5fa", "#3b82f6", "#1d4ed8", // Blue shades
      "#a855f7", "#7c3aed", "#5b21b6", // Purple shades
      "#ec4899", "#db2777", "#be185d", // Pink shades
      "#10b981", "#059669", "#047857", // Green shades
      "#f59e0b", "#d97706", "#b45309"  // Orange shades
    ]
    
    const darkColors = [
      "#818cf8", "#6366f1", "#4f46e5", // Indigo shades
      "#c084fc", "#a855f7", "#9333ea", // Purple shades
      "#f472b6", "#ec4899", "#db2777", // Pink shades
      "#34d399", "#10b981", "#059669", // Green shades
      "#fbbf24", "#f59e0b", "#d97706"  // Yellow shades
    ]
    
    for (let i = 0; i < particleCount; i++) {
      const position = new Vector3(
        (Math.random() - 0.5) * 6,
        (Math.random() - 0.5) * 6,
        (Math.random() - 0.5) * 6
      )
      
      const velocity = new Vector3(
        (Math.random() - 0.5) * 0.02,
        (Math.random() - 0.5) * 0.02,
        (Math.random() - 0.5) * 0.02
      )
      
      const trailLength = Math.floor(Math.random() * 36) + 20 // 20-55 segments
      const trail: Vector3[] = []
      for (let j = 0; j < trailLength; j++) {
        trail.push(position.clone().add(velocity.clone().multiplyScalar(-j * 0.1)))
      }
      
      const colorPalette = Math.random() > 0.5 ? lightColors : darkColors
      const color = colorPalette[Math.floor(Math.random() * colorPalette.length)]
      
      particles.push({
        position,
        velocity,
        trail,
        maxTrailLength: trailLength,
        color
      })
    }
    
    return particles
  }, [])
  
  // Create main particle positions
  const mainPositions = useMemo(() => {
    const positions = new Float32Array(particles.length * 3)
    particles.forEach((particle, i) => {
      positions[i * 3] = particle.position.x
      positions[i * 3 + 1] = particle.position.y
      positions[i * 3 + 2] = particle.position.z
    })
    return positions
  }, [particles])
  
  // Create trail positions
  const trailPositions = useMemo(() => {
    const allTrailPoints: number[] = []
    particles.forEach(particle => {
      particle.trail.forEach(point => {
        allTrailPoints.push(point.x, point.y, point.z)
      })
    })
    return new Float32Array(allTrailPoints)
  }, [particles])
  
  // Create trail colors
  const trailColors = useMemo(() => {
    const colors: number[] = []
    particles.forEach(particle => {
      const color = new Color(particle.color)
      particle.trail.forEach(() => {
        colors.push(color.r, color.g, color.b)
      })
    })
    return new Float32Array(colors)
  }, [particles])
  
  useFrame(() => {
    if (!pointsRef.current || !trailsRef.current) return
    
    // Update particle positions and trails
    particles.forEach((particle, i) => {
      // Update position
      particle.position.add(particle.velocity)
      
      // Bounce off boundaries
      const bounds = 3
      if (Math.abs(particle.position.x) > bounds) {
        particle.velocity.x *= -1
        particle.position.x = Math.sign(particle.position.x) * bounds
      }
      if (Math.abs(particle.position.y) > bounds) {
        particle.velocity.y *= -1
        particle.position.y = Math.sign(particle.position.y) * bounds
      }
      if (Math.abs(particle.position.z) > bounds) {
        particle.velocity.z *= -1
        particle.position.z = Math.sign(particle.position.z) * bounds
      }
      
      // Update trail
      particle.trail.unshift(particle.position.clone())
      if (particle.trail.length > particle.maxTrailLength) {
        particle.trail.pop()
      }
    })
    
    // Update main particle positions
    const mainPositions = pointsRef.current.geometry.attributes.position.array as Float32Array
    particles.forEach((particle, i) => {
      mainPositions[i * 3] = particle.position.x
      mainPositions[i * 3 + 1] = particle.position.y
      mainPositions[i * 3 + 2] = particle.position.z
    })
    pointsRef.current.geometry.attributes.position.needsUpdate = true
    
    // Update trail positions and colors
    const trailPositions = trailsRef.current.geometry.attributes.position.array as Float32Array
    const trailColors = trailsRef.current.geometry.attributes.color?.array as Float32Array
    
    let trailIndex = 0
    let colorIndex = 0
    particles.forEach(particle => {
      const color = new Color(particle.color)
      particle.trail.forEach(point => {
        trailPositions[trailIndex * 3] = point.x
        trailPositions[trailIndex * 3 + 1] = point.y
        trailPositions[trailIndex * 3 + 2] = point.z
        
        if (trailColors) {
          trailColors[colorIndex * 3] = color.r
          trailColors[colorIndex * 3 + 1] = color.g
          trailColors[colorIndex * 3 + 2] = color.b
        }
        
        trailIndex++
        colorIndex++
      })
    })
    
    trailsRef.current.geometry.attributes.position.needsUpdate = true
    if (trailColors) {
      trailsRef.current.geometry.attributes.color.needsUpdate = true
    }
  })
  
  return (
    <>
      {/* Main particles */}
      <Points ref={pointsRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={particles.length}
            array={mainPositions}
            itemSize={3}
          />
        </bufferGeometry>
        <PointMaterial
          transparent
          vertexColors
          size={0.12}
          sizeAttenuation={true}
          depthWrite={false}
          blending={AdditiveBlending}
        />
      </Points>
      
      {/* Trails */}
      <Points ref={trailsRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={trailPositions.length / 3}
            array={trailPositions}
            itemSize={3}
          />
          <bufferAttribute
            attach="attributes-color"
            count={trailColors.length / 3}
            array={trailColors}
            itemSize={3}
          />
        </bufferGeometry>
        <PointMaterial
          transparent
          vertexColors
          size={0.03}
          sizeAttenuation={true}
          depthWrite={false}
          blending={AdditiveBlending}
        />
      </Points>
    </>
  )
}

export function HeroParticles() {
  return (
    <div className="absolute inset-0">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 75 }}
        style={{ background: 'transparent' }}
      >
        <EnergyField />
      </Canvas>
    </div>
  )
} 