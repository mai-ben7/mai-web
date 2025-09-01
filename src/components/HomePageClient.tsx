"use client"

import { motion } from "framer-motion"
import { useState, useEffect } from "react"
import HeroSimeyCard from "@/components/hero/HeroSimeyCard"
import AdvancedSection from "@/components/AdvancedSection"
import { Packages } from "@/components/Packages"
import TestimonialsSection from "@/components/TestimonialsSection"
import { Footer } from "@/components/Footer"
import { FloatingModal } from "@/components/FloatingModal"
import { Play } from "lucide-react"
import { pageTransition } from "@/lib/animations"
import BookingSection from "@/components/BookingSection"
import { FAQSection } from "@/components/FAQSection"
import EnableSectionParallax from "@/components/parallax/EnableSectionParallax"


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
      {/* Background Effects */}
      
      <main>
        <EnableSectionParallax />
        <div id="hero">
          <HeroSimeyCard
            name="Mai Ben Sheva"
            role="Web Developer • Creative Engineer"
            blurb="I build advanced, animated web experiences that convert and feel premium."
            imageSrc="/images/mai.jpg"
            imageAlt="Mai Ben Sheva portrait"
            rtl={true}
          />
        </div>
        

        <div id="advanced">
          <AdvancedSection />
        </div>
        <div id="packages">
          <Packages />
        </div>
        <div id="testimonials">
          <TestimonialsSection />
        </div>
        <div id="booking">
          <BookingSection />
        </div>
        <div id="faq">
          <FAQSection />
        </div>
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