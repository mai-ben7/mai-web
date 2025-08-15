"use client"

import Image from 'next/image'
import { useState } from 'react'
import { performanceConfig } from '@/lib/seo.config'

interface SEOImageProps {
  src: string
  alt: string
  width: number
  height: number
  className?: string
  priority?: boolean
  sizes?: string
  quality?: number
  placeholder?: 'blur' | 'empty'
  blurDataURL?: string
  onLoad?: () => void
  onError?: () => void
}

export function SEOImage({
  src,
  alt,
  width,
  height,
  className = '',
  priority = false,
  sizes,
  quality = performanceConfig.imageOptimization.quality,
  placeholder = 'empty',
  blurDataURL,
  onLoad,
  onError
}: SEOImageProps) {
  const [isLoading, setIsLoading] = useState(true)
  const [hasError, setHasError] = useState(false)

  const handleLoad = () => {
    setIsLoading(false)
    onLoad?.()
  }

  const handleError = () => {
    setIsLoading(false)
    setHasError(true)
    onError?.()
  }

  // Fallback for error state
  if (hasError) {
    return (
      <div 
        className={`bg-gray-200 flex items-center justify-center ${className}`}
        style={{ width, height }}
        role="img"
        aria-label={alt}
      >
        <span className="text-gray-500 text-sm">תמונה לא זמינה</span>
      </div>
    )
  }

  return (
    <div className={`relative overflow-hidden ${className}`}>
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        className={`transition-opacity duration-300 ${
          isLoading ? 'opacity-0' : 'opacity-100'
        }`}
        priority={priority}
        sizes={sizes || performanceConfig.imageOptimization.sizes}
        quality={quality}
        placeholder={placeholder}
        blurDataURL={blurDataURL}
        onLoad={handleLoad}
        onError={handleError}
        loading={priority ? 'eager' : 'lazy'}
        decoding="async"
        style={{
          objectFit: 'cover',
          objectPosition: 'center'
        }}
      />
      
      {/* Loading skeleton */}
      {isLoading && (
        <div 
          className="absolute inset-0 bg-gray-200 animate-pulse"
          style={{ width, height }}
        />
      )}
    </div>
  )
}

// Optimized background image component
interface SEOBackgroundImageProps {
  src: string
  alt: string
  className?: string
  children?: React.ReactNode
}

export function SEOBackgroundImage({ src, alt, className = '', children }: SEOBackgroundImageProps) {
  return (
    <div 
      className={`relative ${className}`}
      role="img"
      aria-label={alt}
    >
      <Image
        src={src}
        alt={alt}
        fill
        className="object-cover object-center"
        sizes="100vw"
        priority={false}
        loading="lazy"
        decoding="async"
      />
      <div className="relative z-10">
        {children}
      </div>
    </div>
  )
}

// Lazy loading hook for images
export function useLazyImage() {
  const [isIntersecting, setIsIntersecting] = useState(false)
  const [hasLoaded, setHasLoaded] = useState(false)

  const imageRef = (node: HTMLImageElement | null) => {
    if (node && !isIntersecting) {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setIsIntersecting(true)
            observer.disconnect()
          }
        },
        {
          rootMargin: '50px 0px',
          threshold: 0.1
        }
      )
      observer.observe(node)
    }
  }

  return { imageRef, isIntersecting, hasLoaded, setHasLoaded }
} 