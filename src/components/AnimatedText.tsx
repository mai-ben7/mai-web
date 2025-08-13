"use client"

import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'

interface AnimatedTextProps {
  text: string
  className?: string
  delay?: number
  duration?: number
}

export function AnimatedText({ text, className = "", delay = 0, duration = 0.5 }: AnimatedTextProps) {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  const letters = text.split('')

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: delay,
      },
    },
  }

  const letterVariants = {
    hidden: { 
      opacity: 0, 
      y: 50, 
      rotateX: -90,
      scale: 0.5
    },
    visible: {
      opacity: 1,
      y: 0,
      rotateX: 0,
      scale: 1,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 200,
        duration: duration,
      },
    },
  }

  const floatingVariants = {
    animate: {
      y: [0, -10, 0],
      rotateY: [0, 5, 0],
      transition: {
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut",
      },
    },
  }

  return (
    <motion.div
      className={`inline-block ${className}`}
      variants={containerVariants}
      initial="hidden"
      animate={isVisible ? "visible" : "hidden"}
    >
      {letters.map((letter, index) => (
        <motion.span
          key={index}
          className="inline-block"
          variants={letterVariants}
          whileHover={{
            scale: 1.2,
            rotateY: 180,
            color: "#8b5cf6",
            textShadow: "0 0 20px rgba(139, 92, 246, 0.8)",
            transition: { duration: 0.3 }
          }}
        >
          <motion.span
            variants={floatingVariants}
            animate="animate"
            transition={{ delay: index * 0.1 }}
            className="inline-block"
          >
            {letter === ' ' ? '\u00A0' : letter}
          </motion.span>
        </motion.span>
      ))}
    </motion.div>
  )
}

// Special animated text for the hero section
export function HeroAnimatedText() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const texts = [
    "אתרים חיים",
    "אתרים חכמים", 
    "אתרים מדהימים",
    "אתרים מתקדמים"
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % texts.length)
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="relative h-32 lg:h-40 flex items-center justify-center">
      {texts.map((text, index) => (
        <motion.div
          key={text}
          className="absolute inset-0 flex items-center justify-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{
            opacity: currentIndex === index ? 1 : 0,
            y: currentIndex === index ? 0 : 20,
          }}
          transition={{ duration: 0.5 }}
        >
          <AnimatedText
            text={text}
            className="text-4xl lg:text-6xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent"
            delay={0.2}
          />
        </motion.div>
      ))}
    </div>
  )
}

// Glitch effect text
export function GlitchText({ text, className = "" }: { text: string; className?: string }) {
  return (
    <div className={`relative ${className}`}>
      <motion.div
        className="absolute inset-0"
        animate={{
          x: [0, -2, 2, 0],
          y: [0, 1, -1, 0],
        }}
        transition={{
          duration: 0.1,
          repeat: Infinity,
          repeatType: "reverse",
        }}
        style={{
          background: "linear-gradient(45deg, #ff0000, #00ff00, #0000ff)",
          backgroundClip: "text",
          WebkitBackgroundClip: "text",
          color: "transparent",
        }}
      >
        {text}
      </motion.div>
      <motion.div
        className="absolute inset-0"
        animate={{
          x: [0, 2, -2, 0],
          y: [0, -1, 1, 0],
        }}
        transition={{
          duration: 0.1,
          repeat: Infinity,
          repeatType: "reverse",
          delay: 0.05,
        }}
        style={{
          background: "linear-gradient(45deg, #00ff00, #0000ff, #ff0000)",
          backgroundClip: "text",
          WebkitBackgroundClip: "text",
          color: "transparent",
        }}
      >
        {text}
      </motion.div>
      <div className="relative z-10">{text}</div>
    </div>
  )
}

// 3D floating text
export function Floating3DText({ text, className = "" }: { text: string; className?: string }) {
  return (
    <motion.div
      className={`relative ${className}`}
      animate={{
        rotateY: [0, 5, -5, 0],
        rotateX: [0, 2, -2, 0],
        y: [0, -5, 0],
      }}
      transition={{
        duration: 4,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    >
      <motion.div
        className="absolute inset-0"
        style={{
          background: "linear-gradient(45deg, #3b82f6, #8b5cf6, #ec4899)",
          backgroundClip: "text",
          WebkitBackgroundClip: "text",
          color: "transparent",
          filter: "blur(1px)",
        }}
        animate={{
          x: [0, 2, 0],
          y: [0, 1, 0],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        {text}
      </motion.div>
      <div className="relative z-10">{text}</div>
    </motion.div>
  )
} 