"use client"

import { useState, useRef, useMemo, useEffect } from 'react'
import { Canvas, useFrame, extend } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import * as THREE from 'three'

// Custom shader material for the particle system
class ParticleMaterial extends THREE.PointsMaterial {
  constructor() {
    super({
      size: 0.125,
      transparent: true,
      depthTest: false,
      blending: THREE.AdditiveBlending,
      color: 0xffffff,
    })

    this.onBeforeCompile = (shader) => {
      shader.uniforms.time = { value: 0 }
      
      shader.vertexShader = `
        uniform float time;
        attribute float sizes;
        attribute vec4 shift;
        varying vec3 vColor;
        ${shader.vertexShader}
      `.replace(
        `gl_PointSize = size;`,
        `gl_PointSize = size * sizes;`
      ).replace(
        `#include <color_vertex>`,
        `#include <color_vertex>
          float d = length(abs(position) / vec3(40., 10., 40));
          d = clamp(d, 0., 1.);
          vColor = mix(vec3(227., 155., 0.), vec3(100., 50., 255.), d) / 255.;
        `
      ).replace(
        `#include <begin_vertex>`,
        `#include <begin_vertex>
          float t = time;
          float moveT = mod(shift.x + shift.z * t, PI2);
          float moveS = mod(shift.y + shift.z * t, PI2);
          transformed += vec3(cos(moveS) * sin(moveT), cos(moveT), sin(moveS) * sin(moveT)) * shift.w;
        `
      )

      shader.fragmentShader = `
        varying vec3 vColor;
        ${shader.fragmentShader}
      `.replace(
        `void main() {`,
        `void main() {
          float d = length(gl_PointCoord.xy - 0.5);
          if (d > 0.5) discard;
        `
      ).replace(
        `vec4 diffuseColor = vec4( diffuse, opacity );`,
        `vec4 diffuseColor = vec4( vColor, 1.0 - d * 2.0 );`
      )

      this.userData.shader = shader
    }
  }
}

extend({ ParticleMaterial })

function Scene() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [scrollY, setScrollY] = useState(0)

  // Mouse movement handler
  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      setMousePosition({
        x: (event.clientX / window.innerWidth) * 2 - 1,
        y: -(event.clientY / window.innerHeight) * 2 + 1
      })
    }

    const handleScroll = () => {
      setScrollY(window.scrollY)
    }

    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('scroll', handleScroll)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return (
    <>
      <OrbitControls 
        enableDamping 
        enablePan={false}
        enableZoom={false}
        autoRotate
        autoRotateSpeed={0.5}
        target={[mousePosition.x * 2, mousePosition.y * 2, 0]}
      />
      <ParticleSystem mousePosition={mousePosition} scrollY={scrollY} />
    </>
  )
}

function ParticleSystem({ mousePosition, scrollY }: { mousePosition: { x: number, y: number }, scrollY: number }) {
  const meshRef = useRef<THREE.Points>(null)
  const materialRef = useRef<ParticleMaterial>(null)

  // Generate particles
  const { geometry } = useMemo(() => {
    const sizes: number[] = []
    const shift: number[] = []
    
    const pushShift = () => {
      shift.push(
        Math.random() * Math.PI,
        Math.random() * Math.PI * 2,
        (Math.random() * 0.9 + 0.1) * Math.PI * 0.1,
        Math.random() * 0.9 + 0.1
      )
    }

    const pts = new Array(50000).fill(null).map(() => {
      sizes.push(Math.random() * 1.5 + 0.5)
      pushShift()
      return new THREE.Vector3().randomDirection().multiplyScalar(Math.random() * 0.5 + 9.5)
    })

    for (let i = 0; i < 100000; i++) {
      let r = 10, R = 40
      let rand = Math.pow(Math.random(), 1.5)
      let radius = Math.sqrt(R * R * rand + (1 - rand) * r * r)
      pts.push(new THREE.Vector3().setFromCylindricalCoords(radius, Math.random() * 2 * Math.PI, (Math.random() - 0.5) * 2))
      sizes.push(Math.random() * 1.5 + 0.5)
      pushShift()
    }

    const geometry = new THREE.BufferGeometry().setFromPoints(pts)
    geometry.setAttribute("sizes", new THREE.Float32BufferAttribute(sizes, 1))
    geometry.setAttribute("shift", new THREE.Float32BufferAttribute(shift, 4))

    return { geometry }
  }, [])

  useFrame((state) => {
    if (materialRef.current && materialRef.current.userData.shader) {
      const t = state.clock.elapsedTime * 0.5
      materialRef.current.userData.shader.uniforms.time.value = t * Math.PI
    }
    if (meshRef.current) {
      // Mouse-based rotation
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.025 + mousePosition.x * 0.5
      meshRef.current.rotation.x = mousePosition.y * 0.3
      
      // Scroll-based position
      meshRef.current.position.y = scrollY * 0.001
    }
  })

  return (
    <points ref={meshRef} geometry={geometry}>
      <primitive object={new ParticleMaterial()} ref={materialRef} />
    </points>
  )
}

export default function ThreeScene() {
  return (
    <Canvas
      camera={{ position: [0, 4, 50], fov: 60 }}
      gl={{ 
        antialias: true, 
        alpha: true,
        powerPreference: "high-performance"
      }}
    >
      <Scene />
    </Canvas>
  )
}

