"use client"

import { motion } from 'framer-motion'
import { useState, useRef, useMemo, useEffect, Suspense } from 'react'
import { FloatingModal } from './FloatingModal'
import { Play, ArrowRight, Sparkles } from 'lucide-react'
import { AnimatedButton } from './AnimatedButton'

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
                <span className="text-sm font-medium text-white/90">תיק עבודות</span>
              </motion.div>

              <motion.h1
                className="text-4xl lg:text-6xl font-bold text-white mb-6 leading-tight"
                variants={itemVariants}
              >
                <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                  שלום, אני
                </span>
                <br />
                <span className="text-white">Mai Ben Sheva</span>
                <br />
                <span className="text-2xl lg:text-3xl text-white/90 mt-4 block">
                  Web Developer • Creative Engineer
                </span>
              </motion.h1>

              <motion.p
                className="text-xl text-white/80 mb-8 leading-relaxed"
                variants={itemVariants}
              >
                I craft advanced, animated sites for brands that need performance + polish.
              </motion.p>

              <motion.div
                className="flex justify-end gap-4 flex-wrap"
                variants={itemVariants}
              >
                <AnimatedButton onClick={() => {
                  const element = document.querySelector('#packages');
                  if (element) {
                    element.scrollIntoView({ behavior: 'smooth' });
                  }
                }}>
                  צפה בחבילות
                </AnimatedButton>
                <AnimatedButton onClick={() => {
                  const element = document.querySelector('#booking');
                  if (element) {
                    element.scrollIntoView({ behavior: 'smooth' });
                  }
                }}>
                  צור קשר
                </AnimatedButton>
              </motion.div>
            </div>
          </motion.div>

          {/* Right Side Placeholder */}
          <motion.div className="order-2 lg:order-2 relative z-10" variants={itemVariants}>
            <div className="w-full h-[500px] flex items-center justify-center relative overflow-hidden rounded-2xl bg-gradient-to-br from-blue-500/20 to-purple-500/20 backdrop-blur-sm border border-white/20">
              <div className="text-center text-white/80">
                <div className="text-6xl mb-4">✨</div>
                <div className="text-xl font-semibold">Interactive Design</div>
                <div className="text-sm opacity-70">Modern web experiences</div>
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
