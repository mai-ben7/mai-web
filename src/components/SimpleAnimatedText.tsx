"use client"

import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'

export function SimpleAnimatedText() {
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
          <motion.h1
            className="text-4xl lg:text-6xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {text}
          </motion.h1>
        </motion.div>
      ))}
    </div>
  )
}

// Simple static animated text
export function StaticAnimatedText() {
  return (
    <motion.h1
      className="text-4xl lg:text-6xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, type: "spring", damping: 20 }}
      whileHover={{ scale: 1.05 }}
    >
      אתרים חיים
    </motion.h1>
  )
} 