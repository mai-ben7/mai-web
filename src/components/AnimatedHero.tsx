"use client"

import { motion } from 'framer-motion'
import { useState, useRef, useMemo, useEffect, Suspense } from 'react'
import { FloatingModal } from './FloatingModal'
import { Play, ArrowRight, Sparkles } from 'lucide-react'
import { AnimatedButton } from './AnimatedButton'

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

export function AnimatedHero() {
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false)
  const [isClient, setIsClient] = useState(false)
  const [ThreeScene, setThreeScene] = useState<any>(null)

  useEffect(() => {
    setIsClient(true)
    // Load ThreeScene only after component mounts (client-side)
    const scene = getThreeScene()
    setThreeScene(scene)
  }, [])

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
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 pt-20">
      {/* 3D Background - Only render on client */}
      {isClient && ThreeScene && (
        <div className="absolute inset-0">
          <Suspense fallback={
            <div className="w-full h-full flex items-center justify-center">
              <div className="text-white">טוען אנימציה...</div>
            </div>
          }>
            <ThreeScene />
          </Suspense>
        </div>
      )}

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