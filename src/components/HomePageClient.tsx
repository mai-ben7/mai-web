"use client"

import { motion } from "framer-motion"
import { useState, useEffect } from "react"
import HeroSimeyCard from "@/components/hero/HeroSimeyCard"
import HomeProjectsPreview from "@/components/home/HomeProjectsPreview"
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
import { useSectionTheme } from "@/lib/useSectionTheme"


export function HomePageClient() {
  useSectionTheme()
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
        <div id="hero" data-theme data-stop1="#bfdbfe" data-stop2="#dbeafe" data-stop3="#fbcfe8" data-o1-x="70%" data-o1-y="20rem" data-o1-size="44rem" data-o1-color="rgba(96,165,250,.45)" data-o1-alpha="1" data-o2-x="18%" data-o2-y="50rem" data-o2-size="36rem" data-o2-color="rgba(167,139,250,.35)" data-o2-alpha=".9" className="relative">
          <HeroSimeyCard
            name="מאי בן שבע"
            role="כלים"
            blurb="I build advanced, animated web experiences that convert and feel premium."
            imageSrc="/images/mai.jpg"
            imageAlt="Mai Ben Sheva portrait"
            rtl={true}
          />
        </div>
        
        {/* Projects Preview — directly after hero */}
        <div id="projects-preview" data-theme data-stop1="#bfdbfe" data-stop2="#dbeafe" data-stop3="#fbcfe8" data-o1-x="78%" data-o1-y="68rem" data-o1-size="38rem" data-o2-x="12%" data-o2-y="110rem" data-o2-size="42rem" className="relative">
          <HomeProjectsPreview 
            items={[
              {
                id: "fitmama",
                title: "FitMama Pregnancy Fitness",
                oneLiner: "אתר כושר להריון עם חווית משתמש מותאמת לנשים בהריון.",
                cover: "/projects/fitmama-pregnancy-fitness.png",
                outcomes: ["עיצוב מותאם להריון", "ממשק ידידותי"],
                href: "/projects/fitmama",
              },
              {
                id: "tal-portfolio",
                title: "טל בן שבע - פורטפוליו",
                oneLiner: "פורטפוליו אישי עם עיצוב מודרני ואנימציות מתקדמות.",
                cover: "/projects/tal-ben-sheva-portfolio.png",
                outcomes: ["עיצוב ייחודי", "אנימציות מתקדמות"],
                href: "/projects/tal-portfolio",
              },
            ]} 
            ctaHref="/projects" 
            ctaLabel="צפו בכל הפרויקטים" 
          />
        </div>

        <div id="packages">
          <Packages />
        </div>
        <div id="advanced">
          <AdvancedSection />
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