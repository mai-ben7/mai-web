"use client"

import { useEffect, useRef } from 'react'

export function ScrollAnimation() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return

      const scrolled = window.pageYOffset
      const rate = scrolled * -0.5
      const rate2 = scrolled * -0.3
      const rate3 = scrolled * -0.7

      // Apply scroll-based transformations
      const elements = containerRef.current.querySelectorAll('[data-scroll]')
      elements.forEach((element) => {
        const speed = element.getAttribute('data-scroll')
        if (speed === 'slow') {
          ;(element as HTMLElement).style.transform = `translateY(${rate}px)`
        } else if (speed === 'medium') {
          ;(element as HTMLElement).style.transform = `translateY(${rate2}px)`
        } else if (speed === 'fast') {
          ;(element as HTMLElement).style.transform = `translateY(${rate3}px)`
        }
      })

      // Parallax effect for background elements
      const parallaxElements = containerRef.current.querySelectorAll('[data-parallax]')
      parallaxElements.forEach((element) => {
        const speed = element.getAttribute('data-parallax')
        const yPos = -(scrolled * (speed ? parseFloat(speed) : 0.5))
        ;(element as HTMLElement).style.transform = `translateY(${yPos}px)`
      })
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div ref={containerRef} className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Floating geometric shapes with your website colors */}
      <div 
        data-scroll="slow"
        className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-br from-blue-400/20 to-purple-600/20 rounded-full blur-xl"
      />
      <div 
        data-scroll="fast"
        className="absolute top-40 right-20 w-24 h-24 bg-gradient-to-br from-pink-400/20 to-purple-600/20 rounded-full blur-xl"
      />
      <div 
        data-scroll="medium"
        className="absolute bottom-40 left-20 w-40 h-40 bg-gradient-to-br from-purple-400/20 to-blue-600/20 rounded-full blur-xl"
      />
      
      {/* Animated circles */}
      <div 
        data-parallax="0.3"
        className="absolute top-1/4 right-1/4 w-16 h-16 border-2 border-blue-400/30 rounded-full"
      />
      <div 
        data-parallax="0.5"
        className="absolute bottom-1/3 left-1/3 w-12 h-12 border-2 border-purple-400/30 rounded-full"
      />
      <div 
        data-parallax="0.7"
        className="absolute top-1/2 left-1/2 w-20 h-20 border-2 border-pink-400/30 rounded-full"
      />

      {/* Floating particles */}
      <div 
        data-scroll="fast"
        className="absolute top-1/3 left-1/4 w-2 h-2 bg-blue-400/60 rounded-full"
      />
      <div 
        data-scroll="medium"
        className="absolute top-2/3 right-1/3 w-3 h-3 bg-purple-400/60 rounded-full"
      />
      <div 
        data-scroll="slow"
        className="absolute bottom-1/4 right-1/4 w-1 h-1 bg-pink-400/60 rounded-full"
      />
      <div 
        data-scroll="fast"
        className="absolute top-1/2 right-1/2 w-2 h-2 bg-blue-400/60 rounded-full"
      />

      {/* Geometric shapes */}
      <div 
        data-parallax="0.4"
        className="absolute top-1/4 left-1/2 w-8 h-8 border border-blue-400/20 rotate-45"
      />
      <div 
        data-parallax="0.6"
        className="absolute bottom-1/4 right-1/2 w-6 h-6 border border-purple-400/20 rotate-45"
      />

      {/* Wave-like elements */}
      <div 
        data-scroll="slow"
        className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-blue-400/10 to-transparent"
      />
      <div 
        data-scroll="medium"
        className="absolute bottom-0 right-0 w-full h-32 bg-gradient-to-t from-purple-400/10 to-transparent"
      />
    </div>
  )
} 