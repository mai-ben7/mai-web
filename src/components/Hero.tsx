"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { ArrowLeft, Play } from "lucide-react"

import { Button } from "@/components/ui/button"
import { fadeInUp, staggerContainer } from "@/lib/animations"
import { HeroParticles } from "./HeroParticles"

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-bg-soft via-bg to-brand/5">
      {/* WebGL Background */}
      <div className="absolute inset-0 z-0">
        <HeroParticles />
      </div>
      
      {/* Content */}
      <div className="relative z-10 mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8">
        <motion.div
          className="mx-auto max-w-4xl text-center"
          variants={staggerContainer}
          initial="initial"
          animate="animate"
        >
          <motion.h1
            className="text-4xl font-bold tracking-tight text-foreground sm:text-6xl lg:text-7xl"
            variants={fadeInUp}
          >
            אתרים חיים שמזיזים אנשים
          </motion.h1>
          
          <motion.p
            className="mt-6 text-lg leading-8 text-muted-foreground sm:text-xl"
            variants={fadeInUp}
          >
            אני מאי בן שבע, "mai web". בונה אתרים מרהיבים עם אנימציות חכמות שמבליטות את העסק שלך וממירות מבקרים ללקוחות.
          </motion.p>
          
          <motion.div
            className="mt-10 flex items-center justify-center gap-x-6"
            variants={fadeInUp}
          >
            <Button asChild size="lg" className="group">
              <Link href="/projects">
                צפו בעבודות
                <ArrowLeft className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1" />
              </Link>
            </Button>
            
            <Button asChild variant="outline" size="lg" className="group">
              <Link href="/contact">
                קבעו ייעוץ חינם
                <Play className="mr-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
          </motion.div>
          
          {/* Stats */}
          <motion.div
            className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-3"
            variants={fadeInUp}
          >
            <div className="text-center">
              <div className="text-3xl font-bold text-brand">50+</div>
              <div className="text-sm text-muted-foreground">פרויקטים הושלמו</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-brand">98%</div>
              <div className="text-sm text-muted-foreground">לקוחות מרוצים</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-brand">3+</div>
              <div className="text-sm text-muted-foreground">שנות ניסיון</div>
            </div>
          </motion.div>
        </motion.div>
      </div>
      
      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <div className="h-6 w-1 rounded-full bg-muted-foreground/30" />
      </motion.div>
    </section>
  )
} 