"use client"

import { motion, useScroll, useTransform } from 'framer-motion'
import { useState, useRef } from 'react'
import { FloatingModal } from './FloatingModal'
import { HeroAnimatedText, Floating3DText } from './AnimatedText'
import { SimpleAnimatedText, StaticAnimatedText } from './SimpleAnimatedText'
import { ParticleText } from './ParticleText'
import { Play, ArrowRight, Sparkles, ChevronDown } from 'lucide-react'

interface ScrollParallaxHeroProps {
  onVideoModalOpen?: () => void
}

export function ScrollParallaxHero({ onVideoModalOpen }: ScrollParallaxHeroProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  })

  // Parallax transforms
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"])
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.2])
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "100%"])
  const textOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0])

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

  return (
    <section 
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900"
    >
      {/* Parallax Background */}
      <motion.div 
        className="absolute inset-0"
        style={{ y, scale }}
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(120,119,198,0.3),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(120,119,198,0.2),transparent_50%)]" />
      </motion.div>

      <div className="relative z-10 container mx-auto px-6 lg:px-8">
        <motion.div
          className="grid lg:grid-cols-2 gap-12 items-center"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Left Column - Content */}
          <motion.div 
            className="text-center lg:text-right"
            variants={itemVariants}
            style={{ y: textY, opacity: textOpacity }}
          >
            <motion.div
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 mb-6"
              variants={itemVariants}
            >
              <Sparkles className="w-4 h-4 text-yellow-400" />
              <span className="text-sm font-medium text-white/90">חדשנות בעיצוב אתרים</span>
            </motion.div>

            <motion.h1
              className="text-4xl lg:text-6xl font-bold text-white mb-6 leading-tight"
              variants={itemVariants}
            >
              <motion.span
                className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.5 }}
              >
                אתרים חיים
              </motion.span>
              <br />
              <ParticleText 
                text="שמזיזים אנשים" 
                className="text-white"
              />
            </motion.h1>

            <motion.p
              className="text-xl text-white/80 mb-8 leading-relaxed"
              variants={itemVariants}
            >
              אני מאי בן שבע, בונה אתרים מרהיבים עם אנימציות חכמות שמבליטות את העסק שלך וממירות מבקרים ללקוחות.
            </motion.p>

            <motion.div
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-end"
              variants={itemVariants}
            >
              <motion.button
                className="group relative px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-full overflow-hidden shadow-2xl"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => onVideoModalOpen?.()}
                suppressHydrationWarning
              >
                <span className="relative z-10 flex items-center gap-2">
                  <Play className="w-5 h-5" />
                  צפה בדמו
                </span>
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600"
                  initial={{ x: "-100%" }}
                  whileHover={{ x: "0%" }}
                  transition={{ duration: 0.3 }}
                />
              </motion.button>

              <motion.button
                className="group px-8 py-4 border-2 border-white/30 text-white font-semibold rounded-full backdrop-blur-sm hover:bg-white/10 transition-all duration-300"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                suppressHydrationWarning
              >
                <span className="flex items-center gap-2">
                  התחל פרויקט
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </span>
              </motion.button>
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
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.2 }}
                >
                  <div className="text-2xl lg:text-3xl font-bold text-white mb-1">
                    {stat.number}
                  </div>
                  <div className="text-sm text-white/70">{stat.label}</div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

                     {/* Right Column - Placeholder for 3D */}
           <motion.div
             className="relative"
             variants={itemVariants}
             initial={{ opacity: 0, scale: 0.8, rotateY: -15 }}
             animate={{ opacity: 1, scale: 1, rotateY: 0 }}
             transition={{ duration: 1, delay: 0.5 }}
           >
             <div className="relative w-full h-96 bg-gradient-to-br from-purple-900 to-blue-900 rounded-lg flex items-center justify-center">
               <div className="text-center text-white">
                 <div className="text-4xl mb-4">🎨</div>
                 <div className="text-xl font-bold mb-2">אתרים חיים</div>
                 <div className="text-sm opacity-80">עם אנימציות מתקדמות</div>
               </div>
             </div>
           </motion.div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div 
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        style={{ opacity }}
      >
        <motion.div
          className="flex flex-col items-center gap-2 text-white/60"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <span className="text-sm">גלול למטה</span>
          <ChevronDown className="w-5 h-5" />
        </motion.div>
      </motion.div>

           </section>
   )
 } 