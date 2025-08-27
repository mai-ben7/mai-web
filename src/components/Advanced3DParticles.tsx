"use client"

import { useEffect, useRef, useState } from 'react'

interface Advanced3DParticlesProps {
  className?: string
}

export function Advanced3DParticles({ className = "" }: Advanced3DParticlesProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!containerRef.current || typeof window === 'undefined') return

    // Dynamic import to avoid SSR issues
    const initThree = async () => {
      try {
        const THREE = await import('three')
        const { OrbitControls } = await import('three/addons/controls/OrbitControls.js')

        // Get container dimensions
        const container = containerRef.current!
        const containerWidth = container.clientWidth
        const containerHeight = container.clientHeight

        // Scene setup
        let scene = new THREE.Scene()
        scene.background = new THREE.Color(0x160016)
        
        let camera = new THREE.PerspectiveCamera(60, containerWidth / containerHeight, 1, 1000)
        camera.position.set(0, 4, 35)
        
        let renderer = new THREE.WebGLRenderer({ alpha: true })
        renderer.setSize(containerWidth, containerHeight)
        renderer.setClearColor(0x000000, 0)
        container.appendChild(renderer.domElement)
        
        // Resize handler
        const handleResize = () => {
          const newWidth = container.clientWidth
          const newHeight = container.clientHeight
          camera.aspect = newWidth / newHeight
          camera.updateProjectionMatrix()
          renderer.setSize(newWidth, newHeight)
        }
        
        window.addEventListener("resize", handleResize)
        
        let controls = new OrbitControls(camera, renderer.domElement)
        controls.enableDamping = true
        controls.enablePan = false
        
        // Mouse interaction variables
        let mouseX = 0
        let mouseY = 0
        let scrollY = 0
        
        // Mouse move event - use container-relative coordinates
        const handleMouseMove = (event: MouseEvent) => {
          const rect = container.getBoundingClientRect()
          mouseX = ((event.clientX - rect.left) / containerWidth) * 2 - 1
          mouseY = -((event.clientY - rect.top) / containerHeight) * 2 + 1
        }
        
        // Scroll event
        const handleScroll = () => {
          scrollY = window.scrollY / window.innerHeight
        }
        
        container.addEventListener('mousemove', handleMouseMove)
        window.addEventListener('scroll', handleScroll)
        
        let gu = { time: {value: 0} }
        let sizes: number[] = []
        let shift: number[] = []
        
        let pushShift = () => {
          shift.push(
            Math.random() * Math.PI,
            Math.random() * Math.PI * 2,
            (Math.random() * 0.9 + 0.1) * Math.PI * 0.1,
            Math.random() * 0.9 + 0.1
          )
        }
        
        let pts = new Array(50000).fill(null).map(p => {
          sizes.push(Math.random() * 1.5 + 0.5)
          pushShift()
          return new THREE.Vector3().randomDirection().multiplyScalar(Math.random() * 0.5 + 9.5)
        })
        
        for(let i = 0; i < 100000; i++){
          let r = 10, R = 40
          let rand = Math.pow(Math.random(), 1.5)
          let radius = Math.sqrt(R * R * rand + (1 - rand) * r * r)
          pts.push(new THREE.Vector3().setFromCylindricalCoords(radius, Math.random() * 2 * Math.PI, (Math.random() - 0.5) * 2 ))
          sizes.push(Math.random() * 1.5 + 0.5)
          pushShift()
        }
        
        let g = new THREE.BufferGeometry().setFromPoints(pts)
        g.setAttribute("sizes", new THREE.Float32BufferAttribute(sizes, 1))
        g.setAttribute("shift", new THREE.Float32BufferAttribute(shift, 4))
        
        let m = new THREE.PointsMaterial({
          size: 0.125,
          transparent: true,
          depthTest: false,
          blending: THREE.NormalBlending,
        } as any)
        
        m.onBeforeCompile = (shader: any) => {
          shader.uniforms.time = gu.time
          shader.uniforms.mouseX = { value: 0 }
          shader.uniforms.mouseY = { value: 0 }
          shader.uniforms.scrollY = { value: 0 }
          shader.vertexShader = `
            uniform float time;
            uniform float mouseX;
            uniform float mouseY;
            uniform float scrollY;
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
              vColor = mix(vec3(255., 0., 150.), vec3(0., 100., 255.), d) / 255.;
            `
          ).replace(
            `#include <begin_vertex>`,
            `#include <begin_vertex>
              float t = time;
              float moveT = mod(shift.x + shift.z * t, PI2);
              float moveS = mod(shift.y + shift.z * t, PI2);
              transformed += vec3(cos(moveS) * sin(moveT), cos(moveT), sin(moveS) * sin(moveT)) * shift.w;
              
              // Mouse interaction - particles follow mouse
              transformed.x += mouseX * 2.0;
              transformed.y += mouseY * 2.0;
              
              // Scroll interaction - particles move with scroll
              transformed.z += scrollY * 5.0;
            `
          )
          
          // Store shader reference for animation loop
          m.userData.shader = shader
          
          shader.fragmentShader = `
            varying vec3 vColor;
            ${shader.fragmentShader}
          `.replace(
            `void main() {`,
            `void main() {
              float d = length(gl_PointCoord.xy - 0.5);
            `
          ).replace(
            `vec4 diffuseColor = vec4( diffuse, opacity );`,
            `vec4 diffuseColor = vec4( vColor, smoothstep(0.5, 0.1, d) * 2.0 );`
          )
        }
        
        let p = new THREE.Points(g, m)
        p.rotation.order = "ZYX"
        p.rotation.z = 0.2
        scene.add(p)
        
        let clock = new THREE.Clock()
        
        // Animation loop
        const animate = () => {
          controls.update()
          let t = clock.getElapsedTime() * 0.5
          gu.time.value = t * Math.PI
          
          // Update mouse and scroll uniforms
          if (m.userData.shader) {
            m.userData.shader.uniforms.mouseX.value = mouseX
            m.userData.shader.uniforms.mouseY.value = mouseY
            m.userData.shader.uniforms.scrollY.value = scrollY
          }
          
          p.rotation.y = t * 0.05
          renderer.render(scene, camera)
          requestAnimationFrame(animate)
        }
        animate()

        // Hide loading state
        setIsLoading(false)

        // Cleanup
        return () => {
          window.removeEventListener('resize', handleResize)
          container.removeEventListener('mousemove', handleMouseMove)
          window.removeEventListener('scroll', handleScroll)
          if (containerRef.current && renderer.domElement) {
            containerRef.current.removeChild(renderer.domElement)
          }
          renderer.dispose()
          g.dispose()
          m.dispose()
        }
      } catch (error) {
        console.error('Failed to load Three.js:', error)
        setError('Failed to load 3D animation')
        setIsLoading(false)
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
      className={`w-full h-full ${className}`}
      style={{ 
        position: 'relative',
        zIndex: 1
      }}
    >
      {/* Fallback if 3D doesn't load */}
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center text-white/50 text-sm">
          <div className="text-center">
            <div className="text-2xl mb-2">✨</div>
            <div>3D Particles Loading...</div>
          </div>
        </div>
      )}
      {error && (
        <div className="absolute inset-0 flex items-center justify-center text-red-400 text-sm">
          <div className="text-center">
            <div className="text-2xl mb-2">⚠️</div>
            <div>{error}</div>
          </div>
        </div>
      )}
    </div>
  )
}
