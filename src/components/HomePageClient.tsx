"use client"

import { motion } from "framer-motion"
import { useState, useEffect } from "react"
import { Header } from "@/components/Header"
import { AnimatedFeatureCards } from "@/components/AnimatedFeatureCards"
import { Packages } from "@/components/Packages"
import { TestimonialCarousel } from "@/components/TestimonialCarousel"
import { ScrollTestimonials } from "@/components/ScrollTestimonials"

import { Footer } from "@/components/Footer"
import { FloatingParticles } from "@/components/FloatingParticles"
import { FloatingModal } from "@/components/FloatingModal"
import { Play } from "lucide-react"
import { pageTransition } from "@/lib/animations"

export function HomePageClient() {
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  // Mouse movement handler for interactive effects
  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      setMousePosition({
        x: (event.clientX / window.innerWidth) * 2 - 1,
        y: (event.clientY / window.innerHeight) * 2 - 1
      })
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  return (
    <motion.div
      variants={pageTransition}
      initial="initial"
      animate="animate"
      exit="exit"
      className="relative"
    >
      {/* Floating Particles Background */}
      {/* <FloatingParticles /> */}
      
      <Header />
      <main>
        {/* Hero Section with CSS Planet Animation */}
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 pt-20">
          {/* CSS Planet Background */}
          <div className="absolute inset-0">
            {/* Animated Planet */}
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
              <div className="relative">
                {/* Main Planet */}
                <div className="w-96 h-96 rounded-full bg-gradient-to-br from-blue-500 via-purple-600 to-pink-500 animate-pulse shadow-2xl">
                  {/* Planet Surface Details */}
                  <div className="absolute inset-0 rounded-full bg-gradient-to-br from-blue-400/30 via-purple-500/30 to-pink-400/30 animate-spin-slow"></div>
                  <div className="absolute inset-0 rounded-full bg-gradient-to-tl from-blue-600/40 via-purple-700/40 to-pink-600/40 animate-spin-slow-reverse"></div>
                  
                  {/* Atmosphere Glow */}
                  <div className="absolute -inset-4 rounded-full bg-gradient-to-br from-blue-400/20 via-purple-500/20 to-pink-400/20 blur-xl animate-pulse"></div>
                  <div className="absolute -inset-8 rounded-full bg-gradient-to-br from-blue-300/10 via-purple-400/10 to-pink-300/10 blur-2xl animate-pulse" style={{animationDelay: '1s'}}></div>
                </div>
                
                {/* Orbiting Particles */}
                <div className="absolute inset-0 animate-spin-slow">
                  {[...Array(12)].map((_, i) => (
                    <div
                      key={i}
                      className="absolute w-2 h-2 bg-blue-400 rounded-full animate-pulse"
                      style={{
                        left: '50%',
                        top: '50%',
                        transform: `translate(-50%, -50%) rotate(${i * 30}deg) translateY(-200px)`,
                        animationDelay: `${i * 0.2}s`,
                        boxShadow: '0 0 10px rgba(96, 165, 250, 0.8)'
                      }}
                    />
                  ))}
                </div>
                
                {/* Energy Rings */}
                <div className="absolute inset-0 animate-spin-slow-reverse">
                  <div className="absolute inset-0 border-2 border-blue-400/30 rounded-full animate-ping" style={{animationDuration: '3s'}}></div>
                  <div className="absolute inset-0 border-2 border-purple-400/30 rounded-full animate-ping" style={{animationDuration: '4s', animationDelay: '1s'}}></div>
                  <div className="absolute inset-0 border-2 border-pink-400/30 rounded-full animate-ping" style={{animationDuration: '5s', animationDelay: '2s'}}></div>
                </div>
              </div>
            </div>
            
            {/* Floating Energy Particles */}
            <div className="absolute inset-0">
              {[...Array(25)].map((_, i) => (
                <div
                  key={i}
                  className="absolute w-1 h-1 bg-blue-400 rounded-full animate-pulse"
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                    animationDelay: `${Math.random() * 3}s`,
                    animationDuration: `${2 + Math.random() * 2}s`,
                    boxShadow: `0 0 ${5 + Math.random() * 10}px rgba(96, 165, 250, 0.6)`
                  }}
                />
              ))}
              {[...Array(15)].map((_, i) => (
                <div
                  key={`purple-${i}`}
                  className="absolute w-1.5 h-1.5 bg-purple-400 rounded-full animate-pulse"
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                    animationDelay: `${Math.random() * 3}s`,
                    animationDuration: `${2.5 + Math.random() * 2}s`,
                    boxShadow: `0 0 ${8 + Math.random() * 12}px rgba(168, 85, 247, 0.6)`
                  }}
                />
              ))}
              {[...Array(10)].map((_, i) => (
                <div
                  key={`pink-${i}`}
                  className="absolute w-2 h-2 bg-pink-400 rounded-full animate-pulse"
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                    animationDelay: `${Math.random() * 3}s`,
                    animationDuration: `${3 + Math.random() * 2}s`,
                    boxShadow: `0 0 ${10 + Math.random() * 15}px rgba(236, 72, 153, 0.6)`
                  }}
                />
              ))}
            </div>
          </div>
          
          {/* Hero Content */}
          <div className="relative z-10 container mx-auto px-6 lg:px-8">
            <motion.div
              className="grid lg:grid-cols-2 gap-12 items-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8 }}
            >
              {/* Left Column - Content */}
              <motion.div className="text-center lg:text-right" initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
                <motion.div
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 mb-6"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  whileHover={{
                    scale: 1.05,
                    backgroundColor: "rgba(255, 255, 255, 0.15)",
                  }}
                >
                  <span className="text-yellow-400">✨</span>
                  <span className="text-sm font-medium text-white/90">חדשנות בעיצוב אתרים</span>
                </motion.div>

                <motion.h1
                  className="text-4xl lg:text-6xl font-bold text-white mb-6 leading-tight"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                    אתרים חיים
                  </span>
                  <br />
                  <span className="text-white">שמזיזים אנשים</span>
                </motion.h1>

                <motion.p
                  className="text-xl text-white/80 mb-8 leading-relaxed"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                >
                  אני מאי בן שבע, בונה אתרים מרהיבים עם אנימציות חכמות שמבליטות את העסק שלך וממירות מבקרים ללקוחות.
                </motion.p>

                <motion.div
                  className="flex justify-center lg:justify-end"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                >
                  <motion.a
                    href="/contact"
                    className="group relative px-8 py-4 bg-white text-blue-600 font-semibold rounded-full overflow-hidden shadow-2xl"
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <span className="relative z-10">קבעו ייעוץ חינם</span>
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-gray-100 to-white"
                      initial={{ x: "-100%" }}
                      whileHover={{ x: "0%" }}
                      transition={{ duration: 0.3 }}
                    />
                  </motion.a>
                </motion.div>

                {/* Stats */}
                <motion.div
                  className="grid grid-cols-3 gap-8 mt-12"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7 }}
                >
                  {[
                    { number: "50+", label: "פרויקטים" },
                    { number: "98%", label: "שביעות רצון" },
                    { number: "24/7", label: "תמיכה" },
                  ].map((stat, index) => (
                    <motion.div
                      key={index}
                      className="text-center"
                      animate={{
                        y: [0, -10, 0],
                      }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: index * 0.2,
                      }}
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
                    <div className="text-xs opacity-60 mt-2">Powered by CSS & Framer Motion</div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </section>

        <AnimatedFeatureCards />
        <Packages />
        <TestimonialCarousel />
                 <ScrollTestimonials />
      </main>
      <Footer />

      {/* Global Video Modal */}
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
    </motion.div>
  )
} 