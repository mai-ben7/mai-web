"use client"

import { useEffect } from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { 
  SEOConfig, 
  generateSEOMetaTags, 
  breadcrumbSchema,
  localBusinessSchema,
  serviceSchema 
} from '@/lib/seo.config'

interface SEOHeadProps {
  config: SEOConfig
  structuredData?: any[]
  breadcrumbs?: Array<{ name: string; url: string }>
}

export function SEOHead({ config, structuredData = [], breadcrumbs }: SEOHeadProps) {
  const router = useRouter()
  const metaTags = generateSEOMetaTags(config)

  // Track page views for analytics
  useEffect(() => {
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('config', 'G-XXXXXXXXXX', {
        page_title: config.title,
        page_location: config.canonical,
        page_path: router.asPath,
        custom_map: {
          'custom_parameter_1': 'page_category',
          'custom_parameter_2': 'page_type'
        }
      })
    }
  }, [config.title, config.canonical, router.asPath])

  // Generate structured data
  const generateStructuredData = () => {
    const data = [
      localBusinessSchema,
      serviceSchema,
      ...structuredData
    ]

    if (breadcrumbs) {
      data.push(breadcrumbSchema(breadcrumbs))
    }

    return data
  }

  return (
    <Head>
      {/* Basic Meta Tags */}
      <title>{config.title}</title>
      {metaTags.map((tag, index) => {
        if (tag.rel) {
          return <link key={index} rel={tag.rel} href={tag.href} />
        }
        if (tag.property) {
          return <meta key={index} property={tag.property} content={tag.content} />
        }
        return <meta key={index} name={tag.name} content={tag.content} />
      })}

      {/* Structured Data */}
      {generateStructuredData().map((data, index) => (
        <script
          key={index}
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(data)
          }}
        />
      ))}

      {/* Performance Optimizations */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      
      {/* Preload critical images */}
      {config.ogImage && (
        <link rel="preload" as="image" href={config.ogImage} />
      )}

      {/* Security Headers */}
      <meta httpEquiv="X-Content-Type-Options" content="nosniff" />
      <meta httpEquiv="X-Frame-Options" content="DENY" />
      <meta httpEquiv="X-XSS-Protection" content="1; mode=block" />
      <meta httpEquiv="Referrer-Policy" content="strict-origin-when-cross-origin" />

      {/* Performance Headers */}
      <meta httpEquiv="Accept-CH" content="DPR, Viewport-Width, Width" />
    </Head>
  )
}

// SEO Hook for dynamic updates
export function useSEO(config: SEOConfig) {
  useEffect(() => {
    // Update document title
    document.title = config.title

    // Update meta description
    const metaDescription = document.querySelector('meta[name="description"]')
    if (metaDescription) {
      metaDescription.setAttribute('content', config.description)
    }

    // Update canonical URL
    const canonical = document.querySelector('link[rel="canonical"]')
    if (canonical) {
      canonical.setAttribute('href', config.canonical)
    }

    // Update Open Graph tags
    const ogTitle = document.querySelector('meta[property="og:title"]')
    if (ogTitle) {
      ogTitle.setAttribute('content', config.title)
    }

    const ogDescription = document.querySelector('meta[property="og:description"]')
    if (ogDescription) {
      ogDescription.setAttribute('content', config.description)
    }

    const ogUrl = document.querySelector('meta[property="og:url"]')
    if (ogUrl) {
      ogUrl.setAttribute('content', config.canonical)
    }

    // Update Twitter Card tags
    const twitterTitle = document.querySelector('meta[name="twitter:title"]')
    if (twitterTitle) {
      twitterTitle.setAttribute('content', config.title)
    }

    const twitterDescription = document.querySelector('meta[name="twitter:description"]')
    if (twitterDescription) {
      twitterDescription.setAttribute('content', config.description)
    }
  }, [config])
} 