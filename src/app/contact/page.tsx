"use client"

import { useState } from "react"
import { Metadata } from "next"
import { motion } from "framer-motion"
import Link from "next/link"
import { ArrowLeft, Mail, Phone, MapPin, Clock } from "lucide-react"

import { Header } from "@/components/Header"
import { Footer } from "@/components/Footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { fadeInUp, staggerContainer } from "@/lib/animations"
import { ContactForm } from "@/components/ContactForm"

export default function ContactPage() {
  const [activeTab, setActiveTab] = useState<'contact' | 'consultation'>('contact')

  return (
    <div>
      <Header />
      
      <main className="pt-24">
        {/* Hero Section */}
        <section className="py-24 bg-bg-soft">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <motion.div
              className="mx-auto max-w-2xl text-center"
              variants={fadeInUp}
              initial="initial"
              animate="animate"
            >
              <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-6xl">
                צור קשר
              </h1>
              <p className="mt-6 text-lg leading-8 text-muted-foreground">
                מוכנים להתחיל את הפרויקט הבא שלכם? בואו נדבר!
              </p>
            </motion.div>
          </div>
        </section>

        {/* Contact Section */}
        <section className="py-24">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
              {/* Contact Info */}
              <motion.div
                variants={fadeInUp}
                initial="initial"
                whileInView="animate"
                viewport={{ once: true }}
              >
                <h2 className="text-3xl font-bold tracking-tight text-foreground mb-8">
                  בואו נדבר
                </h2>
                <p className="text-lg leading-8 text-muted-foreground mb-8">
                  אני כאן כדי לעזור לכם לבנות את האתר המושלם לעסק שלכם. 
                  צרו קשר או קבעו ייעוץ חינם ונתחיל לעבוד יחד.
                </p>
                
                <div className="space-y-6">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-lg bg-brand/10 flex items-center justify-center">
                      <Mail className="h-6 w-6 text-brand" />
                    </div>
                    <div>
                      <h3 className="font-semibold">אימייל</h3>
                      <p className="text-muted-foreground">maiweb25@gmail.com</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-lg bg-brand/10 flex items-center justify-center">
                      <Phone className="h-6 w-6 text-brand" />
                    </div>
                    <div>
                      <h3 className="font-semibold">טלפון</h3>
                      <p className="text-muted-foreground">052-753-3750</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-lg bg-brand/10 flex items-center justify-center">
                      <MapPin className="h-6 w-6 text-brand" />
                    </div>
                    <div>
                      <h3 className="font-semibold">מיקום</h3>
                      <p className="text-muted-foreground">גבעתיים, ישראל</p>
                    </div>
                  </div>

                </div>
              </motion.div>

              {/* Forms */}
              <motion.div
                variants={fadeInUp}
                initial="initial"
                whileInView="animate"
                viewport={{ once: true }}
              >
                <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border shadow-xl">
                  <CardHeader className="pb-6">
                    <div className="flex space-x-1 bg-gray-100 dark:bg-gray-700 p-1 rounded-lg">
                      <Button
                        variant={activeTab === 'contact' ? 'default' : 'outline'}
                        size="sm"
                        onClick={() => setActiveTab('contact')}
                        className={`flex-1 ${
                          activeTab === 'contact' 
                            ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white border-0 shadow-md' 
                            : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 border-gray-300 dark:border-gray-600'
                        }`}
                      >
                        יצירת קשר
                      </Button>
                      <Button
                        variant={activeTab === 'consultation' ? 'default' : 'outline'}
                        size="sm"
                        onClick={() => setActiveTab('consultation')}
                        className={`flex-1 ${
                          activeTab === 'consultation' 
                            ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white border-0 shadow-md' 
                            : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 border-gray-300 dark:border-gray-600'
                        }`}
                      >
                        ייעוץ חינם
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-0">
                    {activeTab === 'contact' ? (
                      <ContactForm type="contact" />
                    ) : (
                      <ContactForm type="consultation" />
                    )}
                  </CardContent>
                </Card>
              </motion.div>
            </div>
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
                שאלות נפוצות
              </h2>
              <p className="mt-4 text-lg leading-8 text-muted-foreground">
                תשובות לשאלות שמעסיקות אותנו
              </p>
            </motion.div>

            <motion.div
              className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto"
              variants={staggerContainer}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
            >
              <motion.div variants={fadeInUp}>
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">כמה זמן לוקח לבנות אתר?</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      זמן הבנייה תלוי בחבילה שנבחרת. Basic לוקח 2-3 שבועות, Basic Plus 3-4 שבועות, Extra 4-6 שבועות, ו-Extra Plus 6-8 שבועות.
                    </p>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div variants={fadeInUp}>
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">האם האתר יהיה מותאם למובייל?</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      כן! כל האתרים שלנו נבנים עם עיצוב רספונסיבי מלא ומותאמים לכל המכשירים - מחשב, טאבלט וטלפון.
                    </p>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div variants={fadeInUp}>
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">האם אתם מספקים תמיכה לאחר השקה?</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      כן, כל החבילות כוללות תמיכה טכנית. Basic ו-Basic Plus כוללים תמיכה בסיסית, Extra ו-Extra Plus כוללים תמיכה מלאה.
                    </p>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div variants={fadeInUp}>
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">האם האתר יכלול SEO?</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      כן, כל האתרים שלנו נבנים עם אופטימיזציה למנועי חיפוש בסיסית. בחבילות המתקדמות יותר נוסיף אופטימיזציה מתקדמת.
                    </p>
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
                מוכנים להתחיל?
              </h2>
              <p className="mt-4 text-lg leading-8 opacity-90">
                בואו נבנה יחד אתר שיזיז אנשים ויביא תוצאות אמיתיות לעסק שלכם.
              </p>
              <div className="mt-10">
                <Button asChild size="lg" variant="secondary">
                  <Link href="/">
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    חזרה לדף הבית
                  </Link>
                </Button>
              </div>
            </motion.div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  )
} 