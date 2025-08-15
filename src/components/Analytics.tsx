"use client"

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'
import { analyticsConfig } from '@/lib/seo.config'

// Google Analytics 4 Configuration
declare global {
  interface Window {
    gtag: (...args: any[]) => void
    dataLayer: any[]
  }
}

interface AnalyticsEvent {
  action: string
  category: string
  label?: string
  value?: number
  custom_parameters?: Record<string, any>
}

interface PageViewEvent {
  page_title: string
  page_location: string
  page_path: string
  custom_parameters?: Record<string, any>
}

export function Analytics() {
  const pathname = usePathname()

  // Initialize Google Analytics
  useEffect(() => {
    if (typeof window !== 'undefined' && !window.gtag) {
      // Load Google Analytics script
      const script = document.createElement('script')
      script.async = true
      script.src = `https://www.googletagmanager.com/gtag/js?id=${analyticsConfig.googleAnalytics.measurementId}`
      document.head.appendChild(script)

      // Initialize gtag
      window.dataLayer = window.dataLayer || []
      window.gtag = function() {
        window.dataLayer.push(arguments)
      }

      window.gtag('js', new Date())
      window.gtag('config', analyticsConfig.googleAnalytics.measurementId, {
        page_title: document.title,
        page_location: window.location.href,
        page_path: window.location.pathname,
        custom_map: {
          'custom_parameter_1': 'page_category',
          'custom_parameter_2': 'page_type',
          'custom_parameter_3': 'user_type',
        },
        debug_mode: analyticsConfig.googleAnalytics.debugMode,
      })
    }
  }, [])

  // Track page views
  useEffect(() => {
    if (typeof window !== 'undefined' && window.gtag && pathname) {
      window.gtag('config', analyticsConfig.googleAnalytics.measurementId, {
        page_title: document.title,
        page_location: window.location.origin + pathname,
        page_path: pathname,
        custom_parameters: {
          page_category: getPageCategory(pathname),
          page_type: getPageType(pathname),
        },
      })
    }
  }, [pathname])

  return null
}

// Analytics utility functions
export function trackEvent(event: AnalyticsEvent) {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', event.action, {
      event_category: event.category,
      event_label: event.label,
      value: event.value,
      ...event.custom_parameters,
    })
  }
}

export function trackPageView(event: PageViewEvent) {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('config', analyticsConfig.googleAnalytics.measurementId, {
      page_title: event.page_title,
      page_location: event.page_location,
      page_path: event.page_path,
      custom_parameters: event.custom_parameters,
    })
  }
}

// Custom event tracking functions
export function trackButtonClick(buttonName: string, page: string) {
  trackEvent({
    action: 'click',
    category: 'button',
    label: buttonName,
    custom_parameters: {
      page: page,
      button_type: 'cta',
    },
  })
}

export function trackFormSubmission(formName: string, page: string) {
  trackEvent({
    action: 'submit',
    category: 'form',
    label: formName,
    custom_parameters: {
      page: page,
      form_type: 'contact',
    },
  })
}

export function trackScrollDepth(depth: number, page: string) {
  trackEvent({
    action: 'scroll',
    category: 'engagement',
    label: `${depth}%`,
    value: depth,
    custom_parameters: {
      page: page,
      scroll_depth: depth,
    },
  })
}

export function trackVideoPlay(videoName: string, page: string) {
  trackEvent({
    action: 'play',
    category: 'video',
    label: videoName,
    custom_parameters: {
      page: page,
      video_type: 'demo',
    },
  })
}

export function trackModalOpen(modalName: string, page: string) {
  trackEvent({
    action: 'open',
    category: 'modal',
    label: modalName,
    custom_parameters: {
      page: page,
      modal_type: 'information',
    },
  })
}

export function trackExternalLink(url: string, page: string) {
  trackEvent({
    action: 'click',
    category: 'external_link',
    label: url,
    custom_parameters: {
      page: page,
      link_type: 'external',
    },
  })
}

export function trackSocialShare(platform: string, page: string) {
  trackEvent({
    action: 'share',
    category: 'social',
    label: platform,
    custom_parameters: {
      page: page,
      platform: platform,
    },
  })
}

// Helper functions for page categorization
function getPageCategory(url: string): string {
  if (url === '/') return 'home'
  if (url.startsWith('/services')) return 'services'
  if (url.startsWith('/portfolio')) return 'portfolio'
  if (url.startsWith('/contact')) return 'contact'
  if (url.startsWith('/about')) return 'about'
  if (url.startsWith('/blog')) return 'blog'
  return 'other'
}

function getPageType(url: string): string {
  if (url === '/') return 'landing'
  if (url.includes('/services/')) return 'service_detail'
  if (url.includes('/portfolio/')) return 'project_detail'
  if (url.includes('/blog/')) return 'article'
  return 'page'
}

// Performance tracking
export function trackPerformanceMetrics() {
  if (typeof window !== 'undefined' && 'performance' in window) {
    // Track Core Web Vitals
    const observer = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        if (entry.entryType === 'largest-contentful-paint') {
          trackEvent({
            action: 'largest_contentful_paint',
            category: 'performance',
            label: 'LCP',
            value: Math.round(entry.startTime),
            custom_parameters: {
              metric: 'LCP',
              value: Math.round(entry.startTime),
            },
          })
        }
        
        if (entry.entryType === 'first-input') {
          trackEvent({
            action: 'first_input_delay',
            category: 'performance',
            label: 'FID',
            value: Math.round(entry.processingStart - entry.startTime),
            custom_parameters: {
              metric: 'FID',
              value: Math.round(entry.processingStart - entry.startTime),
            },
          })
        }
      }
    })

    observer.observe({ entryTypes: ['largest-contentful-paint', 'first-input'] })

    // Track Cumulative Layout Shift
    let clsValue = 0
    let clsEntries: any[] = []

    const clsObserver = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        if (!entry.hadRecentInput) {
          clsValue += (entry as any).value
          clsEntries.push(entry)
        }
      }
    })

    clsObserver.observe({ entryTypes: ['layout-shift'] })

    // Report CLS after page load
    window.addEventListener('load', () => {
      setTimeout(() => {
        trackEvent({
          action: 'cumulative_layout_shift',
          category: 'performance',
          label: 'CLS',
          value: Math.round(clsValue * 1000) / 1000,
          custom_parameters: {
            metric: 'CLS',
            value: Math.round(clsValue * 1000) / 1000,
          },
        })
      }, 1000)
    })
  }
}

// E-commerce tracking (if needed)
export function trackPurchase(orderId: string, value: number, currency: string = 'ILS') {
  trackEvent({
    action: 'purchase',
    category: 'ecommerce',
    label: orderId,
    value: value,
    custom_parameters: {
      currency: currency,
      transaction_id: orderId,
    },
  })
}

export function trackAddToCart(productName: string, value: number) {
  trackEvent({
    action: 'add_to_cart',
    category: 'ecommerce',
    label: productName,
    value: value,
    custom_parameters: {
      currency: 'ILS',
      item_name: productName,
    },
  })
} 