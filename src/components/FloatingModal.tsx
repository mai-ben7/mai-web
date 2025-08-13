"use client"

import { motion, AnimatePresence } from 'framer-motion'
import { X } from 'lucide-react'
import { useEffect } from 'react'
import { createPortal } from 'react-dom'

interface FloatingModalProps {
  isOpen: boolean
  onClose: () => void
  title: string
  children: React.ReactNode
  size?: 'sm' | 'md' | 'lg' | 'xl'
}

const sizeClasses = {
  sm: 'max-w-md',
  md: 'max-w-lg',
  lg: 'max-w-2xl',
  xl: 'max-w-4xl',
}

export function FloatingModal({ isOpen, onClose, title, children, size = 'md' }: FloatingModalProps) {
  // Lock scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }

    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  const modalContent = (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-[99999] flex items-center justify-center p-4 pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          style={{ 
            position: 'fixed', 
            top: 0, 
            left: 0, 
            right: 0, 
            bottom: 0,
            zIndex: 99999,
            width: '100vw',
            height: '100vh'
          }}
        >
          {/* Backdrop */}
          <motion.div
            className="absolute inset-0 bg-black/80 backdrop-blur-lg pointer-events-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
          
          {/* Modal */}
          <motion.div
            className={`relative bg-white dark:bg-gray-900 rounded-2xl shadow-2xl w-full pointer-events-auto ${sizeClasses[size]} max-h-[85vh] overflow-hidden`}
            style={{ 
              position: 'relative', 
              zIndex: 100000,
              transform: 'translateZ(0)'
            }}
            initial={{ 
              opacity: 0, 
              scale: 0.8, 
              y: 50,
              rotateY: -10 
            }}
            animate={{ 
              opacity: 1, 
              scale: 1, 
              y: 0,
              rotateY: 0 
            }}
            exit={{ 
              opacity: 0, 
              scale: 0.8, 
              y: 50,
              rotateY: -10 
            }}
            transition={{
              type: "spring",
              damping: 20,
              stiffness: 300,
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700 bg-gradient-to-r from-gray-50 to-white dark:from-gray-800 dark:to-gray-900">
              <motion.h2 
                className="text-xl font-bold text-gray-900 dark:text-white"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 }}
              >
                {title}
              </motion.h2>
              <motion.button
                onClick={onClose}
                className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
              >
                <X className="w-5 h-5 text-gray-500 dark:text-gray-400" />
              </motion.button>
            </div>
            
            {/* Content */}
            <motion.div 
              className="p-6 overflow-y-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              {children}
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )

  // Use portal to render modal at document root
  if (typeof window !== 'undefined') {
    return createPortal(modalContent, document.body)
  }
  
  return modalContent
} 