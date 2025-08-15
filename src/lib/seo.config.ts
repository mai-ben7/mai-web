export interface SEOConfig {
  title: string
  description: string
  keywords: string[]
  canonical: string
  ogImage: string
  ogType: 'website' | 'article'
  twitterCard: 'summary' | 'summary_large_image' | 'app' | 'player'
  noIndex?: boolean
  noFollow?: boolean
}

export interface StructuredData {
  '@context': string
  '@type': string
  [key: string]: any
}

// Default SEO configuration
export const defaultSEO: SEOConfig = {
  title: 'Mai Web - אתרים חיים שמזיזים אנשים | פיתוח אתרים מתקדם',
  description: 'בונים אתרים מרהיבים עם אנימציות חכמות שמבליטות את העסק שלך וממירות מבקרים ללקוחות. פיתוח אתרים מתקדם ב-React, Next.js ו-3D.',
  keywords: [
    'פיתוח אתרים',
    'עיצוב אתרים',
    'אתרים מתקדמים',
    'אנימציות אתרים',
    'React',
    'Next.js',
    '3D animations',
    'אתרים רספונסיביים',
    'SEO',
    'תל אביב',
    'ישראל'
  ],
  canonical: 'https://maiweb.co.il',
  ogImage: 'https://maiweb.co.il/og-image.jpg',
  ogType: 'website',
  twitterCard: 'summary_large_image'
}

// SEO helper function to merge default with page-specific config
export function createSEOConfig(pageConfig: Partial<SEOConfig> = {}): SEOConfig {
  return {
    ...defaultSEO,
    ...pageConfig,
    keywords: [...defaultSEO.keywords, ...(pageConfig.keywords || [])]
  }
}

// Structured Data Schemas
export const organizationSchema: StructuredData = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Mai Web',
  alternateName: 'מאי ווב',
  url: 'https://maiweb.co.il',
  logo: 'https://maiweb.co.il/logo+name.png',
  description: 'בונים אתרים מרהיבים עם אנימציות חכמות שמבליטות את העסק שלך וממירות מבקרים ללקוחות',
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'תל אביב',
    addressCountry: 'IL'
  },
  contactPoint: {
    '@type': 'ContactPoint',
    telephone: '+972-54-1234567',
    contactType: 'customer service',
    availableLanguage: ['Hebrew', 'English']
  },
  sameAs: [
    'https://www.linkedin.com/company/mai-web',
    'https://www.facebook.com/maiweb',
    'https://www.instagram.com/maiweb'
  ]
}

export const localBusinessSchema: StructuredData = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  name: 'Mai Web',
  description: 'פיתוח ועיצוב אתרים מתקדמים עם אנימציות 3D',
  url: 'https://maiweb.co.il',
  telephone: '+972-54-1234567',
  email: 'info@maiweb.co.il',
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'רחוב רוטשילד 123',
    addressLocality: 'תל אביב',
    postalCode: '6701101',
    addressCountry: 'IL'
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: 32.0853,
    longitude: 34.7818
  },
  openingHours: 'Mo-Fr 09:00-18:00',
  priceRange: '$$',
  areaServed: 'IL',
  serviceArea: {
    '@type': 'Country',
    name: 'Israel'
  }
}

export const serviceSchema: StructuredData = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'פיתוח אתרים מתקדמים',
  description: 'פיתוח אתרים עם אנימציות 3D מתקדמות ו-WebGL',
  provider: {
    '@type': 'Organization',
    name: 'Mai Web'
  },
  areaServed: {
    '@type': 'Country',
    name: 'Israel'
  },
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'חבילות שירות',
    itemListElement: [
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Basic Package',
          description: 'אידיאלי לעסקים בתחילת הדרך'
        },
        price: '5000',
        priceCurrency: 'ILS'
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Extra Package',
          description: 'חבילת פרימיום עם אתר חי ואנימציות מתקדמות'
        },
        price: '15000',
        priceCurrency: 'ILS'
      }
    ]
  }
}

export const breadcrumbSchema = (breadcrumbs: Array<{ name: string; url: string }>): StructuredData => ({
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: breadcrumbs.map((crumb, index) => ({
    '@type': 'ListItem',
    position: index + 1,
    name: crumb.name,
    item: crumb.url
  }))
})

export const websiteSchema: StructuredData = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'Mai Web',
  url: 'https://maiweb.co.il',
  description: 'בונים אתרים מרהיבים עם אנימציות חכמות',
  potentialAction: {
    '@type': 'SearchAction',
    target: 'https://maiweb.co.il/search?q={search_term_string}',
    'query-input': 'required name=search_term_string'
  }
}

// SEO Meta Tags Generator
export function generateSEOMetaTags(config: SEOConfig) {
  const metaTags = [
    // Basic Meta Tags
    { name: 'description', content: config.description },
    { name: 'keywords', content: config.keywords.join(', ') },
    { name: 'author', content: 'Mai Ben Sheva' },
    { name: 'robots', content: `${config.noIndex ? 'noindex' : 'index'}, ${config.noFollow ? 'nofollow' : 'follow'}` },
    
    // Open Graph Tags
    { property: 'og:title', content: config.title },
    { property: 'og:description', content: config.description },
    { property: 'og:type', content: config.ogType },
    { property: 'og:url', content: config.canonical },
    { property: 'og:image', content: config.ogImage },
    { property: 'og:image:width', content: '1200' },
    { property: 'og:image:height', content: '630' },
    { property: 'og:locale', content: 'he_IL' },
    { property: 'og:site_name', content: 'Mai Web' },
    
    // Twitter Card Tags
    { name: 'twitter:card', content: config.twitterCard },
    { name: 'twitter:title', content: config.title },
    { name: 'twitter:description', content: config.description },
    { name: 'twitter:image', content: config.ogImage },
    { name: 'twitter:site', content: '@maiweb' },
    { name: 'twitter:creator', content: '@maibensheva' },
    
    // Additional Meta Tags
    { name: 'viewport', content: 'width=device-width, initial-scale=1, maximum-scale=5' },
    { name: 'theme-color', content: '#008CFF' },
    { name: 'msapplication-TileColor', content: '#008CFF' },
    { name: 'apple-mobile-web-app-capable', content: 'yes' },
    { name: 'apple-mobile-web-app-status-bar-style', content: 'default' },
    { name: 'apple-mobile-web-app-title', content: 'Mai Web' },
    
    // Canonical Link
    { rel: 'canonical', href: config.canonical }
  ]

  return metaTags
}

// Page-specific SEO configurations
export const pageSEOConfigs = {
  home: createSEOConfig({
    title: 'Mai Web - אתרים חיים שמזיזים אנשים | פיתוח אתרים מתקדם',
    description: 'בונים אתרים מרהיבים עם אנימציות חכמות שמבליטות את העסק שלך וממירות מבקרים ללקוחות. פיתוח אתרים מתקדם ב-React, Next.js ו-3D.',
    keywords: ['פיתוח אתרים', 'עיצוב אתרים', 'אנימציות 3D', 'WebGL', 'React', 'Next.js']
  }),
  
  services: createSEOConfig({
    title: 'שירותי פיתוח אתרים מתקדמים | Mai Web',
    description: 'חבילות שירות מקיפות לפיתוח אתרים - מ-Basic ועד Extra Plus עם אנימציות 3D מתקדמות',
    keywords: ['חבילות שירות', 'Basic Package', 'Extra Package', 'אנימציות מתקדמות'],
    canonical: 'https://maiweb.co.il/services'
  }),
  
  portfolio: createSEOConfig({
    title: 'פורטפוליו פרויקטים | Mai Web',
    description: 'צפו בפרויקטים שלנו - אתרים מרהיבים עם אנימציות מתקדמות וטכנולוגיות חדשניות',
    keywords: ['פורטפוליו', 'פרויקטים', 'דוגמאות עבודות', 'אתרים מרהיבים'],
    canonical: 'https://maiweb.co.il/portfolio'
  }),
  
  contact: createSEOConfig({
    title: 'צור קשר | Mai Web - פיתוח אתרים מתקדם',
    description: 'צרו קשר עם Mai Web לפיתוח אתר מתקדם. ייעוץ חינם וציטוט מהיר לפרויקט שלכם',
    keywords: ['צור קשר', 'ייעוץ חינם', 'ציטוט', 'פיתוח אתרים'],
    canonical: 'https://maiweb.co.il/contact'
  }),
  
  about: createSEOConfig({
    title: 'אודות Mai Web | פיתוח אתרים מתקדם',
    description: 'למדו על Mai Web - צוות פיתוח אתרים מקצועי המתמחה באנימציות מתקדמות וטכנולוגיות חדשניות',
    keywords: ['אודות', 'צוות', 'מקצועיות', 'ניסיון'],
    canonical: 'https://maiweb.co.il/about'
  })
}

// Performance optimization helpers
export const performanceConfig = {
  imageOptimization: {
    formats: ['webp', 'avif'],
    sizes: '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw',
    quality: 85,
    priority: false
  },
  
  preloadResources: [
    '/fonts/space-grotesk.woff2',
    '/fonts/inter.woff2',
    '/fonts/jetbrains-mono.woff2'
  ],
  
  criticalCSS: [
    '/styles/critical.css'
  ]
}

// Analytics configuration
export const analyticsConfig = {
  googleAnalytics: {
    measurementId: 'G-XXXXXXXXXX', // Replace with your GA4 ID
    debugMode: process.env.NODE_ENV === 'development'
  },
  
  googleSearchConsole: {
    verificationCode: 'your-verification-code' // Replace with your GSC code
  }
} 