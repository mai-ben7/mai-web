"use client"

import { useEffect, useRef } from 'react'

export function FloatingParticles() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    // Create floating particles
    const createParticle = () => {
      const particle = document.createElement('div')
      particle.className = 'absolute w-2 h-2 bg-gradient-to-r from-blue-400 to-purple-600 rounded-full opacity-60'
      
      // Random position
      const x = Math.random() * 100
      const y = Math.random() * 100
      particle.style.left = `${x}%`
      particle.style.top = `${y}%`
      
      // Random animation duration
      const duration = Math.random() * 20 + 10
      particle.style.animation = `float ${duration}s infinite ease-in-out`
      
      container.appendChild(particle)
      
      // Remove particle after animation
      setTimeout(() => {
        if (particle.parentNode) {
          particle.parentNode.removeChild(particle)
        }
      }, duration * 1000)
    }

    // Create particles periodically
    const interval = setInterval(createParticle, 2000)
    
    // Create initial particles
    for (let i = 0; i < 10; i++) {
      setTimeout(createParticle, i * 200)
    }

    return () => {
      clearInterval(interval)
    }
  }, [])

  return (
    <div ref={containerRef} className="absolute inset-0 pointer-events-none overflow-hidden">
      <style>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0px) translateX(0px);
            opacity: 0.6;
          }
          25% {
            transform: translateY(-20px) translateX(10px);
            opacity: 0.8;
          }
          50% {
            transform: translateY(-40px) translateX(-5px);
            opacity: 1;
          }
          75% {
            transform: translateY(-20px) translateX(-10px);
            opacity: 0.8;
          }
        }
      `}</style>
    </div>
  )
} 