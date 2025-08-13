"use client"

import { useRef, useEffect, useState } from 'react'
import { motion, useScroll, useTransform, useSpring } from 'framer-motion'

export function ScrollBased3D() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  
  // Remove scroll-based animations - keep only mouse interactions
  const rotateX = 0
  const rotateY = 0
  const rotateZ = 0
  const scale = 1
  const opacity = 1
  const translateY = 0
  const translateX = 0
  
  // Add continuous animation for when not scrolling
  const [isScrolling, setIsScrolling] = useState(false)
  
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolling(true)
      setTimeout(() => setIsScrolling(false), 1000)
    }
    
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])
  
  // Enhanced mouse-based transforms
  const mouseX = mousePosition.x * 0.3
  const mouseY = mousePosition.y * 0.3
  
  // Smooth spring animations
  const smoothRotateX = useSpring(rotateX, { stiffness: 80, damping: 25 })
  const smoothRotateY = useSpring(rotateY, { stiffness: 80, damping: 25 })
  const smoothRotateZ = useSpring(rotateZ, { stiffness: 80, damping: 25 })
  const smoothScale = useSpring(scale, { stiffness: 80, damping: 25 })
  const smoothTranslateY = useSpring(translateY, { stiffness: 80, damping: 25 })
  const smoothTranslateX = useSpring(translateX, { stiffness: 80, damping: 25 })

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect()
        const centerX = rect.left + rect.width / 2
        const centerY = rect.top + rect.height / 2
        setMousePosition({
          x: e.clientX - centerX,
          y: e.clientY - centerY
        })
      }
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  return (
    <div 
      ref={containerRef} 
      className="relative w-full h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 overflow-hidden"
      style={{ 
        perspective: '1000px',
        transformStyle: 'preserve-3d'
      }}
    >
      {/* Main Abstract 3D Object */}
      <motion.div
        className="absolute inset-0 flex items-center justify-center"
        style={{
          rotateX: isScrolling ? smoothRotateX : undefined,
          rotateY: isScrolling ? smoothRotateY : undefined,
          rotateZ: isScrolling ? smoothRotateZ : undefined,
          scale: isScrolling ? smoothScale : undefined,
          y: isScrolling ? smoothTranslateY : undefined,
          x: isScrolling ? smoothTranslateX : undefined,
        }}
        animate={{
          rotateX: [0, 360, 720],
          rotateY: [0, -360, -720],
          rotateZ: [0, 180, 360],
          scale: [1, 1.2, 1],
          y: [0, -20, 0],
          x: [0, 10, 0],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "linear",
        }}
      >
        {/* Main Blob Core */}
        <motion.div
          className="relative w-80 h-80"
          style={{
            transformStyle: 'preserve-3d',
            rotateX: mouseX * 0.5,
            rotateY: mouseY * 0.5,
            rotateZ: mouseX * 0.2,
          }}
          animate={{
            rotateX: [0, 15, -15, 0],
            rotateY: [0, -20, 20, 0],
            rotateZ: [0, 10, -10, 0],
            scale: [1, 1.1, 1],
            z: [0, 50, -50, 0],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          whileHover={{
            scale: 1.2,
            rotateX: [0, 30, -30, 0],
            rotateY: [0, -40, 40, 0],
            z: [0, 100, -100, 0],
          }}
        >
          {/* Main Organic Blob */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 opacity-80"
            style={{
              clipPath: "polygon(50% 0%, 80% 10%, 100% 35%, 100% 70%, 80% 100%, 50% 100%, 20% 100%, 0% 70%, 0% 35%, 20% 10%)",
            }}
            animate={{
              clipPath: [
                "polygon(50% 0%, 80% 10%, 100% 35%, 100% 70%, 80% 100%, 50% 100%, 20% 100%, 0% 70%, 0% 35%, 20% 10%)",
                "polygon(50% 0%, 90% 20%, 100% 60%, 90% 100%, 50% 100%, 10% 100%, 0% 60%, 10% 20%)",
                "polygon(50% 0%, 80% 10%, 100% 35%, 100% 70%, 80% 100%, 50% 100%, 20% 100%, 0% 70%, 0% 35%, 20% 10%)",
              ],
              boxShadow: [
                "0 0 30px rgba(59, 130, 246, 0.6)",
                "0 0 50px rgba(147, 51, 234, 0.9)",
                "0 0 30px rgba(59, 130, 246, 0.6)",
              ],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
          
          {/* Inner flowing blob */}
          <motion.div
            className="absolute inset-8 bg-gradient-to-r from-white to-blue-200 opacity-70"
            style={{
              clipPath: "polygon(50% 0%, 70% 20%, 100% 50%, 70% 80%, 50% 100%, 30% 80%, 0% 50%, 30% 20%)",
              transformStyle: 'preserve-3d',
            }}
            animate={{
              clipPath: [
                "polygon(50% 0%, 70% 20%, 100% 50%, 70% 80%, 50% 100%, 30% 80%, 0% 50%, 30% 20%)",
                "polygon(50% 0%, 80% 30%, 100% 70%, 80% 100%, 50% 100%, 20% 100%, 0% 70%, 20% 30%)",
                "polygon(50% 0%, 70% 20%, 100% 50%, 70% 80%, 50% 100%, 30% 80%, 0% 50%, 30% 20%)",
              ],
              rotateX: [0, 180, 360],
              rotateY: [0, -180, -360],
              rotateZ: [0, 90, 180],
              scale: [1, 1.3, 1],
              opacity: [0.7, 1, 0.7],
              z: [0, 30, -30, 0],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        </motion.div>

        {/* Floating Organic Blobs */}
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-16 h-16 bg-gradient-to-r from-green-400 to-blue-400 opacity-80"
            style={{
              left: "50%",
              top: "50%",
              transformStyle: 'preserve-3d',
              clipPath: i % 2 === 0 
                ? "polygon(50% 0%, 80% 20%, 100% 50%, 80% 80%, 50% 100%, 20% 80%, 0% 50%, 20% 20%)"
                : "polygon(30% 0%, 70% 0%, 100% 30%, 100% 70%, 70% 100%, 30% 100%, 0% 70%, 0% 30%)",
            }}
            animate={{
              x: [0, Math.cos(i * 72 * Math.PI / 180) * 200, 0],
              y: [0, Math.sin(i * 72 * Math.PI / 180) * 200, 0],
              z: [0, Math.sin(i * 72 * Math.PI / 180) * 100, 0],
              rotateX: [0, 180, 360],
              rotateY: [0, -180, -360],
              rotateZ: [0, 720],
              scale: [1, 2, 1],
              opacity: [0.8, 1, 0.8],
              clipPath: [
                i % 2 === 0 
                  ? "polygon(50% 0%, 80% 20%, 100% 50%, 80% 80%, 50% 100%, 20% 80%, 0% 50%, 20% 20%)"
                  : "polygon(30% 0%, 70% 0%, 100% 30%, 100% 70%, 70% 100%, 30% 100%, 0% 70%, 0% 30%)",
                i % 2 === 0 
                  ? "polygon(50% 0%, 90% 30%, 100% 70%, 90% 100%, 50% 100%, 10% 100%, 0% 70%, 10% 30%)"
                  : "polygon(20% 0%, 80% 0%, 100% 40%, 100% 80%, 80% 100%, 20% 100%, 0% 80%, 0% 40%)",
                i % 2 === 0 
                  ? "polygon(50% 0%, 80% 20%, 100% 50%, 80% 80%, 50% 100%, 20% 80%, 0% 50%, 20% 20%)"
                  : "polygon(30% 0%, 70% 0%, 100% 30%, 100% 70%, 70% 100%, 30% 100%, 0% 70%, 0% 30%)",
              ],
            }}
            transition={{
              duration: 4 + i * 0.2,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.1,
            }}
            whileHover={{
              scale: 2.5,
              rotateX: [0, 360],
              rotateY: [0, -360],
              rotateZ: [0, 1080],
              z: [0, 150],
            }}
          >
            {/* Inner glow */}
            <motion.div
              className="absolute inset-2 bg-white opacity-40"
              style={{
                clipPath: i % 2 === 0 
                  ? "polygon(50% 0%, 80% 20%, 100% 50%, 80% 80%, 50% 100%, 20% 80%, 0% 50%, 20% 20%)"
                  : "polygon(30% 0%, 70% 0%, 100% 30%, 100% 70%, 70% 100%, 30% 100%, 0% 70%, 0% 30%)",
              }}
              animate={{
                scale: [0, 2.5, 0],
                opacity: [0.4, 0, 0],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeOut",
                delay: i * 0.6,
              }}
            />
          </motion.div>
        ))}

        {/* Large Organic Blob - Top Left */}
        <motion.div
          className="absolute top-8 left-8 w-32 h-32 bg-gradient-to-r from-pink-400 to-orange-400 opacity-70"
          style={{
            clipPath: "polygon(40% 0%, 60% 0%, 100% 40%, 100% 60%, 60% 100%, 40% 100%, 0% 60%, 0% 40%)",
            transformStyle: 'preserve-3d',
            rotateX: mouseX * 0.3,
            rotateY: mouseY * 0.3,
            rotateZ: mouseX * 0.1,
          }}
          animate={{
            clipPath: [
              "polygon(40% 0%, 60% 0%, 100% 40%, 100% 60%, 60% 100%, 40% 100%, 0% 60%, 0% 40%)",
              "polygon(30% 0%, 70% 0%, 100% 30%, 100% 70%, 70% 100%, 30% 100%, 0% 70%, 0% 30%)",
              "polygon(40% 0%, 60% 0%, 100% 40%, 100% 60%, 60% 100%, 40% 100%, 0% 60%, 0% 40%)",
            ],
            rotateX: [0, 25, -25, 0],
            rotateY: [0, -30, 30, 0],
            rotateZ: [0, 360],
            y: [0, -80, 0],
            x: [0, 40, 0],
            z: [0, 60, -60, 0],
            scale: [1, 1.6, 1],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          whileHover={{
            scale: 2,
            rotateX: [0, 45, -45, 0],
            rotateY: [0, -60, 60, 0],
            rotateZ: [0, 720],
            z: [0, 120],
          }}
        />

        {/* Large Organic Blob - Bottom Right */}
        <motion.div
          className="absolute bottom-8 right-8 w-40 h-40 bg-gradient-to-r from-yellow-400 to-green-400 opacity-70"
          style={{
            clipPath: "polygon(50% 0%, 80% 10%, 100% 35%, 100% 65%, 80% 90%, 50% 100%, 20% 90%, 0% 65%, 0% 35%, 20% 10%)",
            transformStyle: 'preserve-3d',
            rotateX: mouseX * 0.4,
            rotateY: mouseY * 0.4,
            rotateZ: mouseX * 0.15,
          }}
          animate={{
            clipPath: [
              "polygon(50% 0%, 80% 10%, 100% 35%, 100% 65%, 80% 90%, 50% 100%, 20% 90%, 0% 65%, 0% 35%, 20% 10%)",
              "polygon(50% 0%, 90% 20%, 100% 60%, 100% 80%, 90% 100%, 50% 100%, 10% 100%, 0% 80%, 0% 60%, 10% 20%)",
              "polygon(50% 0%, 80% 10%, 100% 35%, 100% 65%, 80% 90%, 50% 100%, 20% 90%, 0% 65%, 0% 35%, 20% 10%)",
            ],
            rotateX: [0, -20, 20, 0],
            rotateY: [0, -720],
            rotateZ: [0, 15, -15, 0],
            scale: [1, 1.8, 1],
            opacity: [0.7, 1, 0.7],
            z: [0, 80, -80, 0],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          whileHover={{
            scale: 2.2,
            rotateX: [0, -40, 40, 0],
            rotateY: [0, -1080],
            rotateZ: [0, 30, -30, 0],
            z: [0, 150],
          }}
        />

        {/* Flowing Energy Lines */}
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={`line-${i}`}
            className="absolute w-3 h-48 bg-gradient-to-b from-transparent via-blue-400 to-transparent opacity-50"
            style={{
              left: "50%",
              top: "50%",
              transformOrigin: "center",
              transformStyle: 'preserve-3d',
              clipPath: "polygon(0% 0%, 100% 0%, 80% 100%, 20% 100%)",
            }}
            animate={{
              rotate: [i * 30, i * 30 + 720],
              rotateX: [0, 45, -45, 0],
              rotateY: [0, -30, 30, 0],
              scaleY: [0, 1.5, 0],
              opacity: [0, 0.6, 0],
              z: [0, Math.sin(i * 30 * Math.PI / 180) * 50, 0],
              clipPath: [
                "polygon(0% 0%, 100% 0%, 80% 100%, 20% 100%)",
                "polygon(20% 0%, 80% 0%, 100% 100%, 0% 100%)",
                "polygon(0% 0%, 100% 0%, 80% 100%, 20% 100%)",
              ],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.1,
            }}
          />
        ))}

        {/* Floating Organic Particles */}
        {[...Array(30)].map((_, i) => (
          <motion.div
            key={`particle-${i}`}
            className="absolute w-3 h-3 bg-white rounded-full"
            style={{
              left: `${5 + (i * 3)}%`,
              top: `${15 + (i * 2)}%`,
              transformStyle: 'preserve-3d',
              clipPath: "polygon(50% 0%, 80% 20%, 100% 50%, 80% 80%, 50% 100%, 20% 80%, 0% 50%, 20% 20%)",
            }}
            animate={{
              y: [0, -300, 0],
              x: [0, Math.sin(i * 0.5) * 150, 0],
              z: [0, Math.cos(i * 0.3) * 100, 0],
              opacity: [0, 1, 0],
              scale: [0, 2, 0],
              rotateX: [0, 180, 360],
              rotateY: [0, -180, -360],
              clipPath: [
                "polygon(50% 0%, 80% 20%, 100% 50%, 80% 80%, 50% 100%, 20% 80%, 0% 50%, 20% 20%)",
                "polygon(50% 0%, 90% 30%, 100% 70%, 90% 100%, 50% 100%, 10% 100%, 0% 70%, 10% 30%)",
                "polygon(50% 0%, 80% 20%, 100% 50%, 80% 80%, 50% 100%, 20% 80%, 0% 50%, 20% 20%)",
              ],
            }}
            transition={{
              duration: 4 + i * 0.2,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.1,
            }}
          />
        ))}
      </motion.div>

      {/* Mouse Interaction Indicator */}
      <motion.div
        className="absolute top-4 right-4 bg-black/30 backdrop-blur-md rounded-full p-3 border border-white/20"
        style={{ opacity }}
      >
        <div className="w-12 h-12 relative flex items-center justify-center">
          <div className="text-white text-xs font-bold">🎯</div>
        </div>
      </motion.div>
    </div>
  )
} 