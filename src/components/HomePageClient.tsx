"use client"

import { motion } from "framer-motion"
import { useState } from "react"
import { Header } from "@/components/Header"
import { AnimatedHero } from "@/components/AnimatedHero"
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

  return (
    <motion.div
      variants={pageTransition}
      initial="initial"
      animate="animate"
      exit="exit"
      className="relative"
    >
      {/* Floating Particles Background */}
      <FloatingParticles />
      
      <Header />
      <main>
        <AnimatedHero />
        <AnimatedFeatureCards />
        <Packages />
        <TestimonialCarousel />
        <ScrollTestimonials />
        
        {/* Enhanced CTA Section */}
        <section className="relative py-24 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 overflow-hidden">
          {/* Animated Background */}
          <div className="absolute inset-0">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(255,255,255,0.1),transparent_50%)]" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_50%,rgba(255,255,255,0.1),transparent_50%)]" />
          </div>
          
          <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8">
            <motion.div
              className="mx-auto max-w-3xl text-center"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <motion.h2 
                className="text-4xl lg:text-5xl font-bold text-white mb-6"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
              >
                מוכנים לאתר שמדבר בעד עצמו?
              </motion.h2>
              
              <motion.p 
                className="text-xl text-white/90 mb-10 leading-relaxed"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
              >
                כדאי לדבר לפני שמתחילים – נקבע שיחת ייעוץ חינם של 20 דק׳ להתאמת חבילה.
              </motion.p>
              
              <motion.div 
                className="flex flex-col sm:flex-row gap-6 justify-center"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 }}
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
                
                <motion.a
                  href="/projects"
                  className="group px-8 py-4 border-2 border-white/30 text-white font-semibold rounded-full backdrop-blur-sm hover:bg-white/10 transition-all duration-300"
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span className="flex items-center gap-2">
                    צפה בפרויקטים
                    <motion.span
                      className="inline-block"
                      whileHover={{ x: 5 }}
                      transition={{ duration: 0.2 }}
                    >
                      →
                    </motion.span>
                  </span>
                </motion.a>
              </motion.div>
            </motion.div>
          </div>
        </section>
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