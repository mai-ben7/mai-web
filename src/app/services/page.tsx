"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { Check, ArrowLeft } from "lucide-react"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import BlobButton from "@/components/ui/BlobButton"
import { fadeInUp, staggerContainer } from "@/lib/animations"
import EnableSectionParallax from "@/components/parallax/EnableSectionParallax"
import { useI18n } from "@/components/i18n/I18nProvider"

const getPackages = (t: (key: string) => string) => [
  {
    name: t("servicesPage.packages.basic.name"),
    price: t("servicesPage.packages.basic.price"),
    description: t("servicesPage.packages.basic.description"),
    features: [
      t("servicesPage.packages.basic.features.0"),
      t("servicesPage.packages.basic.features.1"),
      t("servicesPage.packages.basic.features.2"),
      t("servicesPage.packages.basic.features.3"),
      t("servicesPage.packages.basic.features.4"),
      t("servicesPage.packages.basic.features.5")
    ],
    cta: t("servicesPage.packages.basic.cta")
  },
  {
    name: t("servicesPage.packages.basicPlus.name"),
    price: t("servicesPage.packages.basicPlus.price"),
    description: t("servicesPage.packages.basicPlus.description"),
    features: [
      t("servicesPage.packages.basicPlus.features.0"),
      t("servicesPage.packages.basicPlus.features.1"),
      t("servicesPage.packages.basicPlus.features.2"),
      t("servicesPage.packages.basicPlus.features.3"),
      t("servicesPage.packages.basicPlus.features.4"),
      t("servicesPage.packages.basicPlus.features.5")
    ],
    cta: t("servicesPage.packages.basicPlus.cta")
  },
  {
    name: t("servicesPage.packages.extra.name"),
    price: t("servicesPage.packages.extra.price"),
    description: t("servicesPage.packages.extra.description"),
    features: [
      t("servicesPage.packages.extra.features.0"),
      t("servicesPage.packages.extra.features.1"),
      t("servicesPage.packages.extra.features.2"),
      t("servicesPage.packages.extra.features.3"),
      t("servicesPage.packages.extra.features.4"),
      t("servicesPage.packages.extra.features.5")
    ],
    cta: t("servicesPage.packages.extra.cta")
  },
  {
    name: t("servicesPage.packages.extraPlus.name"),
    price: t("servicesPage.packages.extraPlus.price"),
    description: t("servicesPage.packages.extraPlus.description"),
    features: [
      t("servicesPage.packages.extraPlus.features.0"),
      t("servicesPage.packages.extraPlus.features.1"),
      t("servicesPage.packages.extraPlus.features.2"),
      t("servicesPage.packages.extraPlus.features.3"),
      t("servicesPage.packages.extraPlus.features.4"),
      t("servicesPage.packages.extraPlus.features.5")
    ],
    cta: t("servicesPage.packages.extraPlus.cta")
  }
]

const getFAQs = (t: (key: string) => string) => [
  {
    question: t("servicesPage.faq.0.question"),
    answer: t("servicesPage.faq.0.answer")
  },
  {
    question: t("servicesPage.faq.1.question"),
    answer: t("servicesPage.faq.1.answer")
  },
  {
    question: t("servicesPage.faq.2.question"),
    answer: t("servicesPage.faq.2.answer")
  },
  {
    question: t("servicesPage.faq.3.question"),
    answer: t("servicesPage.faq.3.answer")
  },
  {
    question: t("servicesPage.faq.4.question"),
    answer: t("servicesPage.faq.4.answer")
  },
  {
    question: t("servicesPage.faq.5.question"),
    answer: t("servicesPage.faq.5.answer")
  }
]

export default function ServicesPage() {
  const { t } = useI18n()
  const packages = getPackages(t)
  const faqs = getFAQs(t)
  
  return (
    <div>
      <main dir="rtl">
        <EnableSectionParallax />
        
        {/* Hero Section */}
      <section className="pt-32 px-8 xl:px-0 flex flex-col justify-center relative">
        <div className="container mx-auto px-6 lg:px-8 relative z-10">
          {/* Headline block */}
          <header className="max-w-2xl mx-auto text-center">
            <span className="text-slate-700 text-lg max-w-lg mx-auto mb-2 capitalize flex items-center gap-3 justify-center">
              {t("servicesPage.title")}
              <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-pink-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3" />
              </svg>
            </span>
            <h1 className="text-slate-900 text-4xl md:text-5xl xl:text-6xl font-extrabold max-w-3xl mx-auto mb-6 leading-snug bg-gradient-to-r from-slate-900 via-slate-700 to-slate-900 bg-clip-text text-transparent">
              {t("servicesPage.title")}
            </h1>
            <p className="text-slate-600 text-lg md:text-xl max-w-2xl mx-auto">
              {t("servicesPage.subtitle")}
            </p>
          </header>
        </div>
      </section>

        {/* Packages Section */}
        <section className="py-24">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <motion.div
              className="mx-auto max-w-2xl text-center mb-16"
              variants={fadeInUp}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
            >
              <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                בחרו את החבילה המתאימה
              </h2>
              <p className="mt-4 text-lg leading-8 text-muted-foreground">
                כל חבילה מותאמת לצרכים שונים של עסקים
              </p>
            </motion.div>

            <motion.div
              className="grid grid-cols-1 gap-8 lg:grid-cols-2 xl:grid-cols-4"
              variants={staggerContainer}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
            >
              {packages.map((pkg, index) => (
                <motion.div key={index} variants={fadeInUp}>
                  <Card 
                    className="h-full transition-all duration-300 hover:shadow-lg"
                  >
                    
                    <CardHeader className="text-center">
                      <CardTitle className="text-2xl">{pkg.name}</CardTitle>
                      <div className="text-3xl font-bold text-brand">{pkg.price}</div>
                      <CardDescription className="text-base">
                        {pkg.description}
                      </CardDescription>
                    </CardHeader>
                    
                    <CardContent className="space-y-4">
                      <ul className="space-y-3">
                        {pkg.features.map((feature, featureIndex) => (
                          <li key={featureIndex} className="flex items-start gap-3">
                            <Check className="h-5 w-5 text-brand mt-0.5 flex-shrink-0" />
                            <span className="text-sm">{feature}</span>
                          </li>
                        ))}
                      </ul>
                      
                      <Button 
                        className="w-full mt-6" 
                        variant="outline"
                      >
                        {pkg.cta}
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-24 bg-bg-soft">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <motion.div
              className="mx-auto max-w-2xl text-center mb-16"
              variants={fadeInUp}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
            >
              <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                {t("servicesPage.faqTitle")}
              </h2>
              <p className="mt-4 text-lg leading-8 text-muted-foreground">
                {t("servicesPage.faqSubtitle")}
              </p>
            </motion.div>

            <motion.div
              className="mx-auto max-w-4xl"
              variants={staggerContainer}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
            >
              {faqs.map((faq, index) => (
                <motion.div key={index} variants={fadeInUp}>
                  <Card className="mb-6">
                    <CardHeader>
                      <CardTitle className="text-lg">{faq.question}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground">{faq.answer}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-24 bg-brand text-white">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <motion.div
              className="mx-auto max-w-2xl text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                {t("packages.unsure")}
              </h2>
              <p className="mt-4 text-lg leading-8 opacity-90">
                {t("packages.consultation")}
              </p>
              <div className="mt-10 flex items-center justify-center gap-4">
                <Button asChild size="lg" className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-purple-600 font-semibold">
                  <Link href="/">
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    {t("cta.backToHome")}
                  </Link>
                </Button>
                <BlobButton 
                  variant="primary"
                  className="text-lg"
                  onClick={() => {
                    const element = document.querySelector('#booking')
                    if (element) {
                      element.scrollIntoView({ behavior: 'smooth' })
                    }
                  }}
                >
                  {t("cta.bookConsultation")}
                </BlobButton>
              </div>
            </motion.div>
          </div>
        </section>
      </main>
    </div>
  )
} 