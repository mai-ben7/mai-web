"use client"

import { motion } from 'framer-motion'
import { useState, useRef, useMemo, useEffect } from 'react'
import { FloatingModal } from './FloatingModal'
import { Play, ArrowRight, Sparkles } from 'lucide-react'
import { AnimatedButton } from './AnimatedButton'
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

export function AnimatedHero() {
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false)

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        damping: 20,
        stiffness: 100,
      },
    },
  }

  const floatingVariants = {
    animate: {
      y: [0, -10, 0],
      transition: {
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut",
      },
    },
  }

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 pt-20">
      {/* 3D Background */}
      <div className="absolute inset-0">
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
      </div>

      <div className="relative z-10 container mx-auto px-6 lg:px-8">
        <motion.div
          className="grid lg:grid-cols-2 gap-12 items-center"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Left Column - Content */}
          <motion.div className="text-center lg:text-right" variants={itemVariants}>
            <motion.div
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 mb-6"
              variants={itemVariants}
              whileHover={{
                scale: 1.05,
                backgroundColor: "rgba(255, 255, 255, 0.15)",
              }}
            >
              <Sparkles className="w-4 h-4 text-yellow-400" />
              <span className="text-sm font-medium text-white/90">חדשנות בעיצוב אתרים</span>
            </motion.div>

            <motion.h1
              className="text-4xl lg:text-6xl font-bold text-white mb-6 leading-tight"
              variants={itemVariants}
            >
              <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                אתרים חיים
              </span>
              <br />
              <span className="text-white">שמזיזים אנשים</span>
            </motion.h1>

            <motion.p
              className="text-xl text-white/80 mb-8 leading-relaxed"
              variants={itemVariants}
            >
              אני מאי בן שבע, בונה אתרים מרהיבים עם אנימציות חכמות שמבליטות את העסק שלך וממירות מבקרים ללקוחות.
            </motion.p>

            <motion.div
              className="flex justify-center lg:justify-end"
              variants={itemVariants}
            >
              <AnimatedButton onClick={() => setIsVideoModalOpen(true)}>
                קבע פגישה
              </AnimatedButton>
            </motion.div>

            {/* Stats */}
            <motion.div
              className="grid grid-cols-3 gap-8 mt-12"
              variants={itemVariants}
            >
              {[
                { number: "50+", label: "פרויקטים" },
                { number: "98%", label: "שביעות רצון" },
                { number: "24/7", label: "תמיכה" },
              ].map((stat, index) => (
                <motion.div
                  key={index}
                  className="text-center"
                  variants={floatingVariants}
                  animate="animate"
                  transition={{ delay: index * 0.2 }}
                  whileHover={{
                    scale: 1.1,
                    y: -5,
                  }}
                >
                  <div className="text-2xl lg:text-3xl font-bold text-white mb-1">
                    {stat.number}
                  </div>
                  <div className="text-sm text-white/70">{stat.label}</div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right Column - 3D Scene Info */}
          <motion.div
            className="relative flex items-center justify-center"
            variants={itemVariants}
            initial={{ opacity: 0, scale: 0.8, rotateY: -15 }}
            animate={{ opacity: 1, scale: 1, rotateY: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
          >
            <div className="w-full h-full min-h-[600px] flex items-center justify-center bg-gradient-to-br from-purple-900/20 to-blue-900/20 rounded-lg relative overflow-hidden backdrop-blur-sm border border-white/10">
              <div className="text-white text-lg relative z-10 text-center">
                <motion.div 
                  className="text-4xl mb-4"
                  animate={{
                    y: [0, -10, 0],
                    rotate: [0, 5, 0],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  whileHover={{
                    scale: 1.2,
                    rotate: 10,
                  }}
                >
                  ✨
                </motion.div>
                <div className="text-2xl font-bold mb-2">אנימציה תלת מימדית</div>
                <div className="text-sm opacity-80">150,000 חלקיקים זוהרים</div>
                <div className="text-xs opacity-60 mt-2">Powered by Three.js</div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Video Modal */}
      <FloatingModal
        isOpen={isVideoModalOpen}
        onClose={() => setIsVideoModalOpen(false)}
        title="דמו אתר"
        size="xl"
      >
        <div className="aspect-video bg-gray-900 rounded-lg flex items-center justify-center">
          <div className="text-center text-white">
            <Play className="w-16 h-16 mx-auto mb-4 text-blue-400" />
            <p className="text-lg">וידאו דמו יוצג כאן</p>
            <p className="text-sm text-gray-400 mt-2">הדמו מציג את יכולות האנימציה והעיצוב</p>
          </div>
        </div>
      </FloatingModal>
    </section>
  )
} 