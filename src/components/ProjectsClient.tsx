"use client"

import { useState, useMemo } from "react"
import { motion } from "framer-motion"
import { Header } from "./Header"
import { Footer } from "./Footer"
import { ProjectCard } from "./ProjectCard"
import { ProjectControls } from "./ProjectControls"
import { projects, getProjectsByPackage, searchProjects, sortProjects } from "@/lib/projects"
import { Project } from "@/lib/projects"

export function ProjectsClient() {
  const [selectedPackage, setSelectedPackage] = useState<'All' | 'Basic' | 'Advanced'>('All')
  const [searchQuery, setSearchQuery] = useState('')
  const [sortBy, setSortBy] = useState<'newest' | 'complex' | 'alphabetical'>('newest')

  // Filter and sort projects
  const filteredProjects = useMemo(() => {
    let filtered = getProjectsByPackage(selectedPackage)
    
    if (searchQuery) {
      filtered = searchProjects(searchQuery)
      // Apply package filter after search
      if (selectedPackage !== 'All') {
        filtered = filtered.filter(project => project.package === selectedPackage)
      }
    }
    
    return sortProjects(filtered, sortBy)
  }, [selectedPackage, searchQuery, sortBy])

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
      <Header />
      
      <main className="pt-20">
        {/* Enhanced Hero Section with 3D Animation */}
        <section className="relative py-32 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 overflow-hidden">
          {/* 3D Animated Background */}
          <div className="absolute inset-0">
            {/* Floating 3D Shapes */}
            <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-white/10 rounded-full blur-xl animate-pulse"></div>
            <div className="absolute top-3/4 right-1/4 w-24 h-24 bg-purple-400/20 rounded-full blur-lg animate-ping"></div>
            <div className="absolute top-1/2 left-1/2 w-40 h-40 bg-blue-400/15 rounded-full blur-2xl animate-pulse"></div>
            
            {/* Geometric Shapes */}
            <motion.div
              className="absolute top-20 left-10 w-16 h-16 border-2 border-white/30 rotate-45"
              animate={{
                rotate: [45, 405, 45],
                scale: [1, 1.2, 1],
                opacity: [0.3, 0.6, 0.3]
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
            <motion.div
              className="absolute bottom-20 right-10 w-12 h-12 border-2 border-white/20 rounded-full"
              animate={{
                scale: [1, 1.5, 1],
                opacity: [0.2, 0.5, 0.2]
              }}
              transition={{
                duration: 6,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
            <motion.div
              className="absolute top-1/3 right-1/3 w-20 h-20 border-2 border-white/25 transform rotate-12"
              animate={{
                rotate: [12, 372, 12],
                y: [0, -20, 0],
                opacity: [0.2, 0.4, 0.2]
              }}
              transition={{
                duration: 10,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
            
            {/* Particle System */}
            <div className="absolute inset-0">
              {[...Array(20)].map((_, i) => {
                // Use deterministic values based on index to avoid hydration issues
                const left = ((i * 7) % 100) + (i * 3) % 20;
                const top = ((i * 11) % 100) + (i * 5) % 15;
                const duration = 3 + (i % 4);
                const delay = (i % 3) * 0.5;
                const xOffset = (i % 2 === 0 ? 1 : -1) * (10 + (i % 10));
                
                return (
                  <motion.div
                    key={i}
                    className="absolute w-1 h-1 bg-white/60 rounded-full"
                    style={{
                      left: `${left}%`,
                      top: `${top}%`,
                    }}
                    animate={{
                      y: [0, -100, 0],
                      x: [0, xOffset, 0],
                      opacity: [0, 1, 0],
                      scale: [0, 1, 0]
                    }}
                    transition={{
                      duration,
                      repeat: Infinity,
                      delay,
                      ease: "easeInOut"
                    }}
                  />
                );
              })}
            </div>
            
            {/* Advanced 3D Particle System */}
            <div className="absolute inset-0 perspective-1000">
              {[...Array(15)].map((_, i) => {
                // Use deterministic values based on index to avoid hydration issues
                const left = ((i * 13) % 100) + (i * 7) % 25;
                const top = ((i * 17) % 100) + (i * 11) % 20;
                const z = (i * 67) % 1000;
                const duration = 4 + (i % 6);
                const delay = (i % 4) * 0.75;
                
                return (
                  <motion.div
                    key={`3d-${i}`}
                    className="absolute w-2 h-2 bg-gradient-to-r from-yellow-300 to-orange-400 rounded-full shadow-lg"
                    style={{
                      left: `${left}%`,
                      top: `${top}%`,
                      z,
                    }}
                    animate={{
                      z: [0, 1000, 0],
                      scale: [0.5, 2, 0.5],
                      opacity: [0, 1, 0],
                      rotateX: [0, 360],
                      rotateY: [0, 360],
                    }}
                    transition={{
                      duration,
                      repeat: Infinity,
                      delay,
                      ease: "easeInOut"
                    }}
                  />
                );
              })}
            </div>
            
            {/* Floating Orbs */}
            <div className="absolute inset-0">
              {[...Array(8)].map((_, i) => {
                // Use deterministic values based on index to avoid hydration issues
                const left = ((i * 19) % 100) + (i * 5) % 30;
                const top = ((i * 23) % 100) + (i * 7) % 25;
                const duration = 6 + (i % 8);
                const delay = (i % 5) * 1;
                const xOffset = (i % 2 === 0 ? 1 : -1) * (15 + (i % 15));
                
                return (
                  <motion.div
                    key={`orb-${i}`}
                    className="absolute w-4 h-4 bg-white/20 rounded-full backdrop-blur-sm border border-white/30"
                    style={{
                      left: `${left}%`,
                      top: `${top}%`,
                    }}
                    animate={{
                      y: [0, -50, 0],
                      x: [0, xOffset, 0],
                      scale: [1, 1.5, 1],
                      opacity: [0.2, 0.6, 0.2],
                      rotate: [0, 360],
                    }}
                    transition={{
                      duration,
                      repeat: Infinity,
                      delay,
                      ease: "easeInOut"
                    }}
                  />
                );
              })}
            </div>
            
            {/* Advanced Wave Effect */}
            <div className="absolute bottom-0 left-0 right-0 h-40 overflow-hidden">
              <motion.div
                className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-black/30 via-black/10 to-transparent"
                animate={{
                  y: [0, -10, 0],
                  opacity: [0.3, 0.6, 0.3]
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
              <motion.div
                className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-purple-900/20 via-transparent to-transparent"
                animate={{
                  y: [0, -15, 0],
                  opacity: [0.2, 0.4, 0.2]
                }}
                transition={{
                  duration: 6,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 1
                }}
              />
            </div>
          </div>
          
          <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8">
            <motion.div
              className="mx-auto max-w-4xl text-center"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              {/* 3D Animated Icon */}
              <motion.div
                className="mx-auto mb-8 w-24 h-24 relative"
                animate={{
                  rotateY: [0, 360],
                  rotateX: [0, 180, 360]
                }}
                transition={{
                  duration: 8,
                  repeat: Infinity,
                  ease: "linear"
                }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-white/5 rounded-2xl backdrop-blur-sm border border-white/20 transform rotate-45"></div>
                <div className="absolute inset-2 bg-gradient-to-br from-white/30 to-white/10 rounded-xl backdrop-blur-sm border border-white/30 transform -rotate-45"></div>
                <div className="absolute inset-4 bg-gradient-to-br from-white/40 to-white/20 rounded-lg backdrop-blur-sm border border-white/40 transform rotate-12"></div>
              </motion.div>
              
              <motion.h1 
                className="text-5xl lg:text-7xl font-bold text-white mb-8 leading-tight"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
              >
                <motion.span
                  animate={{ 
                    textShadow: [
                      "0 0 20px rgba(255,255,255,0.5)",
                      "0 0 40px rgba(255,255,255,0.8)",
                      "0 0 20px rgba(255,255,255,0.5)"
                    ]
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  פרויקטים
                </motion.span>
              </motion.h1>
              
              <motion.p 
                className="text-xl lg:text-2xl text-white/90 mb-12 leading-relaxed max-w-3xl mx-auto"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
              >
                אתרים חיים שמזיזים אנשים - איכות, ביצועים ועיצוב מותאם אישית לכל פרויקט
              </motion.p>
              
              <motion.div 
                className="flex flex-col sm:flex-row gap-8 justify-center items-center"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 }}
              >
                                 <motion.button
                   onClick={() => {
                     const element = document.querySelector('#booking')
                     if (element) {
                       element.scrollIntoView({ behavior: 'smooth' })
                     }
                   }}
                   className="group relative px-10 py-5 bg-white text-blue-600 font-bold text-lg rounded-full overflow-hidden shadow-2xl transform hover:scale-105 transition-all duration-300"
                   whileHover={{ 
                     scale: 1.05, 
                     y: -5,
                     boxShadow: "0 25px 50px rgba(0,0,0,0.3)"
                   }}
                   whileTap={{ scale: 0.95 }}
                   suppressHydrationWarning
                 >
                  <span className="relative z-10 flex items-center gap-3">
                    <motion.div
                      animate={{ rotate: [0, 360] }}
                      transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                    >
                      ✨
                    </motion.div>
                    קבעו ייעוץ חינם
                  </span>
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-gray-100 to-white"
                    initial={{ x: "-100%" }}
                    whileHover={{ x: "0%" }}
                    transition={{ duration: 0.3 }}
                  />
                </motion.button>
                
                <motion.a
                  href="#projects"
                  className="group px-10 py-5 border-2 border-white/40 text-white font-bold text-lg rounded-full backdrop-blur-sm hover:bg-white/20 transition-all duration-300 transform hover:scale-105"
                  whileHover={{ 
                    scale: 1.05, 
                    y: -5,
                    borderColor: "rgba(255,255,255,0.8)"
                  }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span className="flex items-center gap-3">
                    צפה בפרויקטים
                    <motion.span
                      className="inline-block text-2xl"
                      animate={{ x: [0, 10, 0] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    >
                      →
                    </motion.span>
                  </span>
                </motion.a>
              </motion.div>
              
              {/* Scroll Indicator */}
              <motion.div
                className="mt-16 flex flex-col items-center gap-2 text-white/60"
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <span className="text-sm">גללו למטה לגלות עוד</span>
                <motion.div
                  className="w-6 h-10 border-2 border-white/40 rounded-full flex justify-center"
                  animate={{ opacity: [0.4, 1, 0.4] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <motion.div
                    className="w-1 h-3 bg-white/60 rounded-full mt-2"
                    animate={{ y: [0, 12, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                </motion.div>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Controls Section */}
        <section className="py-8 lg:py-12">
          <div className="container">
            <ProjectControls
              selectedPackage={selectedPackage}
              onPackageChange={setSelectedPackage}
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
              sortBy={sortBy}
              onSortChange={setSortBy}
              projectCount={filteredProjects.length}
            />
          </div>
        </section>

        {/* Projects Grid */}
        <section className="py-8 lg:py-16">
          <div className="container">
            {filteredProjects.length > 0 ? (
              <motion.div
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
              >
                {filteredProjects.map((project, index) => (
                  <motion.div key={project.slug} variants={itemVariants}>
                    <ProjectCard project={project} index={index} />
                  </motion.div>
                ))}
              </motion.div>
            ) : (
              <motion.div
                className="text-center py-16"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6 }}
              >
                <div className="text-gray-400 text-6xl mb-4">🔍</div>
                <h3 className="text-xl font-semibold text-gray-700 mb-2">
                  לא נמצאו פרויקטים
                </h3>
                <p className="text-gray-500">
                  נסו לשנות את החיפוש או הסינון שלכם
                </p>
              </motion.div>
            )}
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 lg:py-24 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <motion.div
              className="mx-auto max-w-3xl text-center"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6">
                מוכנים לפרויקט הבא שלכם?
              </h2>
              <p className="text-xl text-white/90 mb-10 leading-relaxed">
                בואו נבנה יחד אתר שיזיז אנשים ויביא תוצאות אמיתיות לעסק שלכם
              </p>
              <motion.div
                className="flex flex-col sm:flex-row gap-4 justify-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2, duration: 0.6 }}
              >
                                 <motion.button
                   onClick={() => {
                     const element = document.querySelector('#booking')
                     if (element) {
                       element.scrollIntoView({ behavior: 'smooth' })
                     }
                   }}
                   className="inline-flex items-center justify-center px-8 py-4 bg-white text-blue-600 font-semibold rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105"
                   whileHover={{ y: -2 }}
                   whileTap={{ scale: 0.98 }}
                   suppressHydrationWarning
                 >
                  לקביעת שיחת ייעוץ חינם
                </motion.button>
                <motion.a
                  href="/"
                  className="inline-flex items-center justify-center px-8 py-4 border-2 border-white/30 text-white font-semibold rounded-2xl backdrop-blur-sm hover:bg-white/10 transition-all duration-300"
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.98 }}
                >
                  חזרה לדף הבית
                </motion.a>
              </motion.div>
            </motion.div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  )
}
