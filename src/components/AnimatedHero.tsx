"use client"

import { motion } from 'framer-motion'
import { useState, useRef, useMemo, useEffect, Suspense } from 'react'
import { FloatingModal } from './FloatingModal'
import { Play, ArrowRight, Sparkles } from 'lucide-react'
import { AnimatedButton } from './AnimatedButton'
import { Advanced3DParticles } from './Advanced3DParticles'

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
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 pt-20">
      <div className="relative z-20 container mx-auto px-6 lg:px-8">
        <motion.div
          className="grid lg:grid-cols-2 gap-12 items-center"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Main Content - Left Side */}
          <motion.div className="text-right order-1 lg:order-1 relative z-20" variants={itemVariants}>
            <div className="bg-black/40 backdrop-blur-md rounded-2xl p-8 border border-white/20 shadow-2xl">
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
                className="flex justify-end"
                variants={itemVariants}
              >
                <AnimatedButton onClick={() => setIsVideoModalOpen(true)}>
                  קבע פגישה
                </AnimatedButton>
              </motion.div>
            </div>
          </motion.div>

          {/* 3D Model - Right Side */}
          <motion.div className="order-2 lg:order-2 relative z-10" variants={itemVariants}>
            <div className="w-full h-[500px] flex items-center justify-center relative overflow-hidden rounded-2xl">
              <Suspense fallback={
                <div className="w-full h-full flex items-center justify-center">
                  <div className="text-white">טוען אנימציה...</div>
                </div>
              }>
                <Advanced3DParticles />
              </Suspense>
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
