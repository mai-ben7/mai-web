"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronLeft, ChevronRight, Star, Quote } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { fadeInUp } from "@/lib/animations"
import testimonialsData from "@/content/testimonials.json"

export function TestimonialCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isPaused, setIsPaused] = useState(false)

  useEffect(() => {
    if (isPaused) return

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => 
        prevIndex === testimonialsData.length - 1 ? 0 : prevIndex + 1
      )
    }, 5000)

    return () => clearInterval(interval)
  }, [isPaused])

  const nextTestimonial = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === testimonialsData.length - 1 ? 0 : prevIndex + 1
    )
    setIsPaused(true)
    setTimeout(() => setIsPaused(false), 3000)
  }

  const prevTestimonial = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? testimonialsData.length - 1 : prevIndex - 1
    )
    setIsPaused(true)
    setTimeout(() => setIsPaused(false), 3000)
  }

  return (
    <section className="py-24 bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="mx-auto max-w-6xl px-6 lg:px-8">
        <motion.div
          variants={fadeInUp}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl mb-6">
            מה הלקוחות אומרים
          </h2>
          <p className="text-xl leading-8 text-gray-600 max-w-2xl mx-auto">
            תוצאות אמיתיות של לקוחות מרוצים שעבדו איתנו
          </p>
        </motion.div>

        <div className="relative max-w-4xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.6, ease: "easeInOut" }}
              className="relative"
            >
              <Card 
                className="relative overflow-hidden border-0 shadow-2xl bg-white/90 backdrop-blur-sm"
                onMouseEnter={() => setIsPaused(true)}
                onMouseLeave={() => setIsPaused(false)}
              >
                <CardContent className="p-0">
                  <div className="relative">
                    {/* Background Pattern */}
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-600/5 to-purple-600/5" />
                    
                    {/* Quote Icon */}
                    <div className="absolute top-8 right-8 text-blue-600/20">
                      <Quote className="h-16 w-16" />
                    </div>

                    <div className="relative p-8">
                      {/* Rating Stars */}
                      <div className="flex justify-center gap-1 mb-8">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className="h-6 w-6 fill-yellow-400 text-yellow-400 drop-shadow-sm"
                          />
                        ))}
                      </div>

                      {/* Testimonial Content */}
                      <blockquote className="text-center mb-10">
                        <p className="text-xl leading-relaxed text-gray-800 font-medium italic mb-6">
                          "{testimonialsData[currentIndex].content}"
                        </p>
                      </blockquote>

                      {/* Author Info */}
                      <div className="text-center">
                        <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full mb-4 shadow-lg">
                          <span className="text-white font-bold text-xl">
                            {testimonialsData[currentIndex].name.charAt(0)}
                          </span>
                        </div>
                        <h3 className="text-lg font-bold text-gray-900 mb-2">
                          {testimonialsData[currentIndex].name}
                        </h3>
                        <p className="text-gray-600 font-medium text-sm">
                          {testimonialsData[currentIndex].role}
                        </p>
                        <p className="text-blue-600 font-semibold text-sm">
                          {testimonialsData[currentIndex].company}
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </AnimatePresence>

          {/* Navigation Buttons */}
          <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 flex justify-between items-center pointer-events-none px-4">
            <Button
              variant="outline"
              size="icon"
              className="pointer-events-auto bg-white/90 backdrop-blur-sm hover:bg-white shadow-xl border-gray-200 hover:border-gray-300 transition-all duration-300"
              onClick={prevTestimonial}
            >
              <ChevronRight className="h-5 w-5" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="pointer-events-auto bg-white/90 backdrop-blur-sm hover:bg-white shadow-xl border-gray-200 hover:border-gray-300 transition-all duration-300"
              onClick={nextTestimonial}
            >
              <ChevronLeft className="h-5 w-5" />
            </Button>
          </div>

          {/* Dots Indicator */}
          <div className="flex justify-center mt-12 gap-4">
            {testimonialsData.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-4 h-4 rounded-full transition-all duration-300 ${
                  index === currentIndex 
                    ? 'bg-blue-600 scale-125 shadow-lg' 
                    : 'bg-gray-300 hover:bg-gray-400 hover:scale-110'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
