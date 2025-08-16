"use client"

import { useEffect, useRef } from 'react'

export function Simple3DParticles() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!containerRef.current || typeof window === 'undefined') return

    // Dynamic import to avoid SSR issues
    const initThree = async () => {
      try {
        const THREE = await import('three')
        const { OrbitControls } = await import('three/examples/jsm/controls/OrbitControls')

        // Scene setup
        const scene = new THREE.Scene()
        scene.background = null

        // Camera setup
        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
        camera.position.z = 50

        // Renderer setup
        const renderer = new THREE.WebGLRenderer({ 
          antialias: true,
          alpha: true 
        })
        renderer.setSize(window.innerWidth, window.innerHeight)
        renderer.setClearColor(0x000000, 0)
        containerRef.current!.appendChild(renderer.domElement)

        // Create simple particles
        const geometry = new THREE.BufferGeometry()
        const particleCount = 5000
        const positions = new Float32Array(particleCount * 3)
        const colors = new Float32Array(particleCount * 3)

        for (let i = 0; i < particleCount * 3; i += 3) {
          // Position
          positions[i] = (Math.random() - 0.5) * 100
          positions[i + 1] = (Math.random() - 0.5) * 100
          positions[i + 2] = (Math.random() - 0.5) * 100

          // Color
          colors[i] = Math.random()
          colors[i + 1] = Math.random()
          colors[i + 2] = Math.random()
        }

        geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))
        geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3))

        const material = new THREE.PointsMaterial({
          size: 3,
          vertexColors: true,
          transparent: true,
          opacity: 0.8,
          blending: THREE.AdditiveBlending
        })

        const particles = new THREE.Points(geometry, material)
        scene.add(particles)

        // Controls
        const controls = new OrbitControls(camera, renderer.domElement)
        controls.enableDamping = true
        controls.dampingFactor = 0.05
        controls.autoRotate = true
        controls.autoRotateSpeed = 0.5

        // Animation
        const animate = () => {
          requestAnimationFrame(animate)
          controls.update()
          particles.rotation.y += 0.001
          renderer.render(scene, camera)
        }
        animate()

        // Handle resize
        const handleResize = () => {
          camera.aspect = window.innerWidth / window.innerHeight
          camera.updateProjectionMatrix()
          renderer.setSize(window.innerWidth, window.innerHeight)
        }
        window.addEventListener('resize', handleResize)

        // Cleanup
        return () => {
          window.removeEventListener('resize', handleResize)
          if (containerRef.current && renderer.domElement) {
            containerRef.current.removeChild(renderer.domElement)
          }
          renderer.dispose()
          geometry.dispose()
          material.dispose()
        }
      } catch (error) {
        console.error('Failed to load Three.js:', error)
      }
    }

    const cleanup = initThree()
    return () => {
      cleanup.then(cleanupFn => cleanupFn?.())
    }
  }, [])

  return (
    <div 
      ref={containerRef} 
      className="absolute inset-0"
      style={{ 
        pointerEvents: 'none',
        zIndex: 1
      }}
    />
  )
}
