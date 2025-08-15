"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"

// Function to get ThreeScene only on client side
const getThreeScene = () => {
  if (typeof window !== 'undefined') {
    try {
      return require('./ThreeScene').default
    } catch (error) {
      console.warn('ThreeScene failed to load:', error)
      return null
    }
  }
  return null
}

export function ProjectHeader3D() {
  const [ThreeScene, setThreeScene] = useState<any>(null)
  const [isClient, setIsClient] = useState(false)
  const [isLowPower, setIsLowPower] = useState(false)

  useEffect(() => {
    setIsClient(true)
    
    // Check for low power devices
    const checkLowPower = () => {
      const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
      const hasLowMemory = navigator.deviceMemory && navigator.deviceMemory < 4
      const hasSlowConnection = navigator.connection && navigator.connection.effectiveType === 'slow-2g'
      
      return isMobile || hasLowMemory || hasSlowConnection
    }
    
    setIsLowPower(checkLowPower())
    
    // Load ThreeScene only if not low power
    if (!isLowPower) {
      const scene = getThreeScene()
      setThreeScene(scene)
    }
  }, [isLowPower])

  // Fallback static illustration for low-power devices
  if (!isClient || isLowPower) {
    return (
      <motion.div
        className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center shadow-lg"
        initial={{ scale: 0, rotate: -180 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <div className="text-white text-2xl font-bold">M</div>
      </motion.div>
    )
  }

  // 3D Scene
  if (ThreeScene) {
    return (
      <motion.div
        className="w-16 h-16 rounded-full overflow-hidden shadow-lg"
        initial={{ scale: 0, rotate: -180 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <ThreeScene />
      </motion.div>
    )
  }

  // Loading state
  return (
    <motion.div
      className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center shadow-lg"
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ duration: 0.6 }}
    >
      <div className="text-white text-2xl font-bold">M</div>
    </motion.div>
  )
}

