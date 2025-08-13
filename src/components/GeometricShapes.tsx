"use client"

import { useEffect, useRef } from 'react'

export function GeometricShapes() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    // Create geometric shapes
    const createShape = () => {
      const shape = document.createElement('div')
      const shapeType = Math.random() > 0.5 ? 'circle' : 'square'
      
      if (shapeType === 'circle') {
        shape.className = 'absolute border-2 border-blue-400/30 rounded-full'
        shape.style.width = `${Math.random() * 60 + 20}px`
        shape.style.height = shape.style.width
      } else {
        shape.className = 'absolute border-2 border-purple-400/30 rotate-45'
        shape.style.width = `${Math.random() * 40 + 20}px`
        shape.style.height = shape.style.width
      }
      
      // Random position
      const x = Math.random() * 100
      const y = Math.random() * 100
      shape.style.left = `${x}%`
      shape.style.top = `${y}%`
      
      // Random animation duration
      const duration = Math.random() * 20 + 15
      shape.style.animation = `floatShape ${duration}s infinite ease-in-out`
      
      container.appendChild(shape)
      
      // Remove shape after animation
      setTimeout(() => {
        if (shape.parentNode) {
          shape.parentNode.removeChild(shape)
        }
      }, duration * 1000)
    }

    // Create shapes periodically
    const interval = setInterval(createShape, 3000)
    
    // Create initial shapes
    for (let i = 0; i < 8; i++) {
      setTimeout(createShape, i * 500)
    }

    return () => {
      clearInterval(interval)
    }
  }, [])

  return (
    <div ref={containerRef} className="absolute inset-0 pointer-events-none overflow-hidden">
      <style>{`
        @keyframes floatShape {
          0%, 100% {
            transform: translateY(0px) translateX(0px) rotate(0deg);
            opacity: 0.3;
          }
          25% {
            transform: translateY(-30px) translateX(15px) rotate(90deg);
            opacity: 0.6;
          }
          50% {
            transform: translateY(-60px) translateX(-10px) rotate(180deg);
            opacity: 0.8;
          }
          75% {
            transform: translateY(-30px) translateX(-15px) rotate(270deg);
            opacity: 0.6;
          }
        }
      `}</style>
    </div>
  )
} 