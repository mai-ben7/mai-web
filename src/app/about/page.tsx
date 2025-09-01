"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { ArrowLeft, Code, Palette, Zap, Rocket, TrendingUp } from "lucide-react"

import { Header } from "@/components/Header"
import { Footer } from "@/components/Footer"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { fadeInUp, staggerContainer } from "@/lib/animations"

const skills = [
  { name: "React & Next.js", level: 95 },
  { name: "TypeScript", level: 90 },
  { name: "Framer Motion", level: 85 },
      { name: "WebGL & Canvas", level: 80 },
  { name: "Tailwind CSS", level: 95 },
  { name: "Node.js", level: 85 },
]

const workflow = [
  {
    icon: Code,
    title: "Discovery",
    description: "הבנת הצרכים, מטרות העסק והקהל היעד"
  },
  {
    icon: Palette,
    title: "Design",
    description: "עיצוב ממשק משתמש מרהיב עם אנימציות"
  },
  {
    icon: Zap,
    title: "Build",
    description: "פיתוח האתר עם טכנולוגיות מתקדמות"
  },
  {
    icon: Rocket,
    title: "Launch",
    description: "השקה והטמעה עם אופטימיזציה מלאה"
  },
  {
    icon: TrendingUp,
    title: "Grow",
    description: "מעקב, עדכונים ושיפור מתמיד"
  }
]

export default function AboutPage() {
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
                אודות mai web
              </h1>
              <p className="mt-6 text-lg leading-8 text-muted-foreground">
                למדו על מאי בן שבע והגישה שלנו לבניית אתרים חיים שמזיזים אנשים
              </p>
            </motion.div>
          </div>
        </section>

        {/* About Section */}
        <section className="py-24">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <motion.div
                variants={fadeInUp}
                initial="initial"
                whileInView="animate"
                viewport={{ once: true }}
              >
                <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl mb-6">
                  שלום, אני מאי בן שבע
                </h2>
                <p className="text-lg leading-8 text-muted-foreground mb-6">
                  מפתחת אתרים יצירתית עם תשוקה לבניית חוויות דיגיטליות מרהיבות. 
                  אני מאמינה שאתרים צריכים להיות לא רק פונקציונליים, אלא גם מרתקים ויזואלית.
                </p>
                <p className="text-lg leading-8 text-muted-foreground mb-6">
                  עם יותר מ-3 שנות ניסיון בפיתוח אתרים מתקדמים, אני מתמחה בשילוב 
                  טכנולוגיות מודרניות עם עיצוב יצירתי ליצירת אתרים שמביאים תוצאות אמיתיות.
                </p>
                <p className="text-lg leading-8 text-muted-foreground">
                  הגישה שלי משלבת אנימציות חכמות, ביצועים מעולים, ונגישות מלאה 
                  כדי ליצור אתרים שלא רק נראים טוב, אלא גם עובדים מצוין.
                </p>
              </motion.div>
              
              <motion.div
                className="relative"
                variants={fadeInUp}
                initial="initial"
                whileInView="animate"
                viewport={{ once: true }}
              >
                <div className="aspect-square bg-gradient-to-br from-brand/20 to-accent/20 rounded-2xl flex items-center justify-center">
                  <div className="text-6xl font-bold text-brand opacity-30">
                    מאי
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Skills Section */}
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
                המיומנויות שלי
              </h2>
              <p className="mt-4 text-lg leading-8 text-muted-foreground">
                טכנולוגיות וכלים שאני משתמשת בהם לבניית אתרים מרהיבים
              </p>
            </motion.div>

            <motion.div
              className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto"
              variants={staggerContainer}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
            >
              {skills.map((skill, index) => (
                <motion.div key={index} variants={fadeInUp}>
                  <Card>
                    <CardContent className="p-6">
                      <div className="flex justify-between items-center mb-2">
                        <span className="font-medium">{skill.name}</span>
                        <span className="text-sm text-muted-foreground">{skill.level}%</span>
                      </div>
                      <div className="w-full bg-muted rounded-full h-2">
                        <div
                          className="bg-brand h-2 rounded-full transition-all duration-1000"
                          style={{ width: `${skill.level}%` }}
                        />
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Workflow Section */}
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
                תהליך העבודה שלנו
              </h2>
              <p className="mt-4 text-lg leading-8 text-muted-foreground">
                גישה מסודרת ומקצועית לבניית אתרים מוצלחים
              </p>
            </motion.div>

            <motion.div
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8"
              variants={staggerContainer}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
            >
              {workflow.map((step, index) => (
                <motion.div key={index} variants={fadeInUp}>
                  <Card className="h-full text-center">
                    <CardHeader>
                      <div className="w-12 h-12 rounded-lg bg-brand/10 flex items-center justify-center mx-auto mb-4">
                        <step.icon className="h-6 w-6 text-brand" />
                      </div>
                      <CardTitle className="text-lg">{step.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <CardDescription className="text-sm">
                        {step.description}
                      </CardDescription>
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
                מוכנים לעבוד יחד?
              </h2>
              <p className="mt-4 text-lg leading-8 opacity-90">
                בואו נבנה יחד אתר שיזיז אנשים ויביא תוצאות אמיתיות לעסק שלכם.
              </p>
                             <div className="mt-10 flex items-center justify-center gap-4">
                 <Button 
                   size="lg" 
                   className="bg-white text-purple-600 hover:bg-gray-100 border-2 border-white font-semibold"
                   onClick={() => {
                     const element = document.querySelector('#booking')
                     if (element) {
                       element.scrollIntoView({ behavior: 'smooth' })
                     }
                   }}
                 >
                   קבעו ייעוץ חינם
                 </Button>
                 <Button asChild size="lg" className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-purple-600 font-semibold">
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