"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { ArrowLeft, Mail, Phone, MapPin, Clock } from "lucide-react"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import BlobButton from "@/components/ui/BlobButton"
import { fadeInUp, staggerContainer } from "@/lib/animations"
import EnableSectionParallax from "@/components/parallax/EnableSectionParallax"
import { useI18n } from "@/components/i18n/I18nProvider"


export default function ContactPage() {
  const { t } = useI18n()
  
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
              {t("contact.title")}
              <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-pink-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
              </svg>
            </span>
            <h1 className="text-4xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-slate-900 via-slate-700 to-slate-900 sm:text-6xl">
              {t("contact.subtitle")}
            </h1>
            <p className="mt-6 text-lg leading-8 text-slate-600 max-w-2xl mx-auto">
              {t("contact.description")}
            </p>
          </header>
        </div>
      </section>

      {/* Contact Information */}
      <section className="py-16 px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <motion.div
            className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4"
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            <motion.div variants={fadeInUp}>
              <Card className="text-center">
                <CardHeader>
                  <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-lg bg-pink-100">
                    <Mail className="h-6 w-6 text-pink-600" />
                  </div>
                  <CardTitle className="text-lg">{t("contact.email")}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>mai@maiweb.co.il</CardDescription>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div variants={fadeInUp}>
              <Card className="text-center">
                <CardHeader>
                  <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-lg bg-pink-100">
                    <Phone className="h-6 w-6 text-pink-600" />
                  </div>
                  <CardTitle className="text-lg">{t("contact.phone")}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>050-123-4567</CardDescription>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div variants={fadeInUp}>
              <Card className="text-center">
                <CardHeader>
                  <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-lg bg-pink-100">
                    <MapPin className="h-6 w-6 text-pink-600" />
                  </div>
                  <CardTitle className="text-lg">{t("contact.location")}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>{t("contact.israel")}</CardDescription>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div variants={fadeInUp}>
              <Card className="text-center">
                <CardHeader>
                  <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-lg bg-pink-100">
                    <Clock className="h-6 w-6 text-pink-600" />
                  </div>
                  <CardTitle className="text-lg">{t("contact.hours")}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>א׳-ה׳ 9:00-18:00</CardDescription>
                </CardContent>
              </Card>
            </motion.div>
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
              {t("contact.subtitle")}
            </h2>
            <p className="mt-4 text-lg leading-8 opacity-90">
              {t("contact.description")}
            </p>
            <div className="mt-10 flex items-center justify-center gap-4">
              <BlobButton 
                variant="primary"
                className="text-lg"
                onClick={() => {
                  window.location.href = "mailto:mai@maiweb.co.il"
                }}
              >
                {t("contact.email")}
              </BlobButton>
              <Button asChild size="lg" className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-purple-600 font-semibold">
                <Link href="/">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  {t("contact.backToHome")}
                </Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
      </main>
    </div>
  )
}
