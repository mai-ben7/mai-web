"use client"

import { useState, useRef } from "react"
import { motion, useMotionValue, useTransform } from "framer-motion"
import { ExternalLink, Play, Calendar, Tag } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Project } from "@/lib/projects"

interface ProjectCardProps {
  project: Project
  index: number
}

export function ProjectCard({ project, index }: ProjectCardProps) {
  const [isHovered, setIsHovered] = useState(false)
  const [isVideoPlaying, setIsVideoPlaying] = useState(false)
  const cardRef = useRef<HTMLDivElement>(null)
  
  // Parallax effect
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const rotateX = useTransform(mouseY, [-300, 300], [15, -15])
  const rotateY = useTransform(mouseX, [-300, 300], [-15, 15])

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return
    
    const rect = cardRef.current.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2
    
    mouseX.set(event.clientX - centerX)
    mouseY.set(event.clientY - centerY)
  }

  const handleMouseLeave = () => {
    mouseX.set(0)
    mouseY.set(0)
    setIsHovered(false)
  }

  const renderCoverMedia = () => {
    switch (project.coverType) {
      case 'video':
        return (
          <div className="relative aspect-video bg-gradient-to-br from-gray-100 to-gray-200 rounded-t-2xl overflow-hidden">
            {!isVideoPlaying ? (
              <div className="absolute inset-0 flex items-center justify-center">
                <motion.div
                  className="w-16 h-16 bg-white/90 rounded-full flex items-center justify-center shadow-lg cursor-pointer"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setIsVideoPlaying(true)}
                  suppressHydrationWarning
                >
                  <Play className="w-6 h-6 text-blue-600 ml-1" />
                </motion.div>
              </div>
            ) : (
              <video
                src={project.coverSrc}
                autoPlay
                muted
                loop
                className="w-full h-full object-cover"
                onMouseLeave={() => setIsVideoPlaying(false)}
              />
            )}
          </div>
        )
      
      case 'lottie':
        return (
          <div className="aspect-video bg-gradient-to-br from-blue-50 to-purple-50 rounded-t-2xl flex items-center justify-center">
            <div className="text-4xl">🎨</div>
          </div>
        )
      
             default: // image
         return (
           <div className="aspect-video bg-gradient-to-br from-gray-100 to-gray-200 rounded-t-2xl flex items-center justify-center overflow-hidden">
             <img 
               src={project.coverSrc} 
               alt={project.title}
               className="w-full h-full object-cover"
               onError={(e) => {
                 const target = e.target as HTMLImageElement;
                 target.style.display = 'none';
                 target.nextElementSibling?.classList.remove('hidden');
               }}
             />
             <div className="text-4xl font-bold text-gray-300 absolute">
               {project.title.charAt(0)}
             </div>
           </div>
         )
    }
  }

  const getPackageColor = (packageType: 'Basic' | 'Advanced') => {
    return packageType === 'Advanced' 
      ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white' 
      : 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white'
  }

  return (
    <motion.article
      ref={cardRef}
      className="group relative"
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      style={{
        perspective: 1000,
      }}
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      role="article"
      aria-labelledby={`project-title-${project.slug}`}
    >
            <motion.div
        className={`relative bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden border border-white/20 ${project.liveUrl ? 'cursor-pointer' : ''}`}
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
        }}
        whileHover={{ 
          scale: 1.02,
          z: 50,
        }}
      >
                {project.liveUrl && (
          <a 
            href={project.liveUrl} 
            target="_blank" 
            rel="noopener noreferrer"
            className="absolute inset-0 z-10 cursor-pointer"
            aria-label={`Visit ${project.title} website`}
          />
        )}
                 {/* Cover Media */}
         <motion.div
           className="relative overflow-hidden"
           whileHover={{ scale: 1.05 }}
           transition={{ duration: 0.3 }}
         >
           {renderCoverMedia()}
         </motion.div>

                  {/* Content */}
         <div className="p-6 space-y-4">
           {/* Package Badge - now inside the white content area */}
           <div className="flex justify-end">
             <span className={`px-3 py-1 rounded-full text-xs font-semibold shadow-lg ${getPackageColor(project.package)}`}>
               {project.package === 'Advanced' ? 'מתקדם' : 'בסיסי'}
             </span>
           </div>
          {/* Header */}
          <div className="space-y-2">
            <h3 
              id={`project-title-${project.slug}`}
              className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors duration-300"
            >
              {project.title}
            </h3>
            <p className="text-sm text-gray-600 font-medium">
              {project.client}
            </p>
          </div>

          {/* Description */}
          <p className="text-gray-600 leading-relaxed overflow-hidden" style={{ 
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical'
          }}>
            {project.description}
          </p>

          {/* Tags */}
          <div className="flex flex-wrap gap-2">
            {project.tags.slice(0, 3).map((tag, tagIndex) => (
              <span
                key={tagIndex}
                className="inline-flex items-center gap-1 px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-lg"
              >
                <Tag className="w-3 h-3" />
                {tag}
              </span>
            ))}
            {project.tags.length > 3 && (
              <span className="inline-flex items-center px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-lg">
                +{project.tags.length - 3}
              </span>
            )}
          </div>

          {/* Year */}
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <Calendar className="w-4 h-4" />
            {project.year}
          </div>

                               {/* Actions */}
          <div className="flex gap-3 pt-2">
            {project.liveUrl ? (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full bg-blue-600 text-white rounded-xl px-4 py-2 text-center text-sm font-medium flex items-center justify-center gap-2 hover:bg-blue-700 transition-colors duration-200 cursor-pointer"
              >
                <ExternalLink className="w-4 h-4" />
                צפה באתר
              </a>
            ) : (
              <div className="w-full bg-gray-400 text-white rounded-xl px-4 py-2 text-center text-sm font-medium flex items-center justify-center gap-2 cursor-not-allowed">
                <Calendar className="w-4 h-4" />
                בקרוב
              </div>
            )}
          </div>
        </div>

        {/* Hover Glow Effect */}
        <motion.div
          className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-500/10 to-purple-500/10 opacity-0 pointer-events-none"
          animate={{
            opacity: isHovered ? 1 : 0,
          }}
          transition={{ duration: 0.3 }}
        />
        
        {/* Clickable Indicator */}
        {project.liveUrl && (
          <motion.div
            className="absolute top-4 right-4 w-8 h-8 bg-blue-600/90 rounded-full flex items-center justify-center opacity-0 pointer-events-none"
            animate={{
              opacity: isHovered ? 1 : 0,
              scale: isHovered ? 1 : 0.8,
            }}
            transition={{ duration: 0.3 }}
          >
            <ExternalLink className="w-4 h-4 text-white" />
          </motion.div>
        )}
      </motion.div>
    </motion.article>
  )
}
