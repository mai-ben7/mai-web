"use client"

import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'

interface ParticleTextProps {
  text: string
  className?: string
}

export function ParticleText({ text, className = "" }: ParticleTextProps) {
  const [particles, setParticles] = useState<Array<{ id: number; x: number; y: number; color: string }>>([])

  useEffect(() => {
    const newParticles = Array.from({ length: 50 }, (_, i) => ({
      id: i,
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      color: ['#3b82f6', '#8b5cf6', '#ec4899', '#10b981', '#f59e0b'][Math.floor(Math.random() * 5)]
    }))
    setParticles(newParticles)
  }, [])

  return (
    <div className={`relative ${className}`}>
      {/* Floating particles */}
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute w-1 h-1 rounded-full"
          style={{
            backgroundColor: particle.color,
            left: particle.x,
            top: particle.y,
          }}
          animate={{
            y: [0, -100, 0],
            x: [0, Math.random() * 50 - 25, 0],
            opacity: [0, 1, 0],
            scale: [0, 1, 0],
          }}
          transition={{
            duration: 3 + Math.random() * 2,
            repeat: Infinity,
            delay: Math.random() * 2,
          }}
        />
      ))}
      
      {/* Main text with glow effect */}
      <motion.div
        className="relative z-10"
        animate={{
          textShadow: [
            "0 0 5px rgba(59, 130, 246, 0.5)",
            "0 0 20px rgba(139, 92, 246, 0.8)",
            "0 0 5px rgba(59, 130, 246, 0.5)",
          ],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        {text}
      </motion.div>
      
      {/* Glow layers */}
      <motion.div
        className="absolute inset-0 -z-10"
        animate={{
          filter: [
            "blur(2px) brightness(1.2)",
            "blur(4px) brightness(1.5)",
            "blur(2px) brightness(1.2)",
          ],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        style={{
          background: "linear-gradient(45deg, #3b82f6, #8b5cf6, #ec4899)",
          backgroundClip: "text",
          WebkitBackgroundClip: "text",
          color: "transparent",
        }}
      >
        {text}
      </motion.div>
    </div>
  )
}

// Matrix-style text effect
export function MatrixText({ text, className = "" }: { text: string; className?: string }) {
  const [matrixChars, setMatrixChars] = useState<string[]>([])

  useEffect(() => {
    const chars = 'אבגדהוזחטיכסעפצקרשת0123456789'
    const interval = setInterval(() => {
      setMatrixChars(Array.from({ length: text.length }, () => 
        chars[Math.floor(Math.random() * chars.length)]
      ))
    }, 100)
    return () => clearInterval(interval)
  }, [text])

  return (
    <div className={`relative ${className}`}>
      <motion.div
        className="absolute inset-0"
        animate={{
          opacity: [0, 1, 0],
        }}
        transition={{
          duration: 0.1,
          repeat: Infinity,
        }}
        style={{
          color: "#00ff00",
          textShadow: "0 0 10px #00ff00",
        }}
      >
        {matrixChars.join('')}
      </motion.div>
      <div className="relative z-10">{text}</div>
    </div>
  )
}

// Holographic text effect
export function HolographicText({ text, className = "" }: { text: string; className?: string }) {
  return (
    <motion.div
      className={`relative ${className}`}
      animate={{
        backgroundPosition: ["0% 0%", "100% 100%"],
      }}
      transition={{
        duration: 3,
        repeat: Infinity,
        ease: "linear",
      }}
      style={{
        background: "linear-gradient(45deg, #ff0000, #ff7f00, #ffff00, #00ff00, #0000ff, #4b0082, #9400d3)",
        backgroundSize: "400% 400%",
        backgroundClip: "text",
        WebkitBackgroundClip: "text",
        color: "transparent",
      }}
    >
      {text}
    </motion.div>
  )
} 