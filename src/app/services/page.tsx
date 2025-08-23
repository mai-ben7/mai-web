import { Metadata } from "next"
import { motion } from "framer-motion"
import Link from "next/link"
import { Check, Star, ArrowLeft } from "lucide-react"

import { Header } from "@/components/Header"
import { Footer } from "@/components/Footer"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { fadeInUp, staggerContainer } from "@/lib/animations"

export const metadata: Metadata = {
  title: "שירותים וחבילות - mai web",
  description: "חבילות שירות מותאמות אישית לבניית אתרים מרהיבים עם אנימציות מתקדמות.",
}

const packages = [
  {
    name: "Basic",
    price: "5,000 ₪",
    description: "אידיאלי לעסקים בתחילת הדרך",
    features: [
      "דף בית + עד 3 עמודים",
      "עיצוב נקי",
      "התאמה למובייל",
      "טפסי יצירת קשר",
      "חיבור בסיסי לאנליטיקס",
      "תמיכה טכנית בסיסית"
    ],
    cta: "התחילו עם Basic",
    popular: false
  },
  {
    name: "Basic Plus",
    price: "8,000 ₪",
    description: "כל מה שב-Basic + מערכת משתמשים בסיסית",
    features: [
      "כל מה שב-Basic",
      "הרשמה/התחברות",
      "אזור אישי פשוט",
      "רכיבים מותאמים",
      "תמיכה טכנית",
      "אופטימיזציה בסיסית"
    ],
    cta: "שדרגו ל-Basic Plus",
    popular: false
  },
  {
    name: "Extra",
    price: "15,000 ₪",
    description: "חבילת פרימיום עם אתר חי ואנימציות מתקדמות",
    features: [
      "כל מה שב-Basic Plus",
      "אנימציות גלילה/מעבר מתקדמות",
      "מקטע WebGL אחד",
      "עמודי פרויקט עשירים",
      "אופטימיזציה מתקדמת",
      "תמיכה מלאה"
    ],
    cta: "עברו ל-Extra",
    popular: true
  },
  {
    name: "Extra Plus",
    price: "25,000 ₪",
    description: "המופע המלא: אתר אנימטיבי חי מרשים במיוחד",
    features: [
      "כל מה שב-Extra",
      "מספר סצנות WebGL",
      "מיקרו-אינטראקציות בכל האתר",
      "עמודי קייס-סטדי קולנועיים",
      "תמיכה מלאה + עדכונים",
      "אופטימיזציה מתקדמת"
    ],
    cta: "בחרו ב-Extra Plus",
    popular: false
  }
]

const faqs = [
  {
    question: "כמה זמן לוקח לבנות אתר?",
    answer: "זמן הבנייה תלוי בחבילה שנבחרת. Basic לוקח 2-3 שבועות, Basic Plus 3-4 שבועות, Extra 4-6 שבועות, ו-Extra Plus 6-8 שבועות."
  },
  {
    question: "האם האתר יהיה מותאם למובייל?",
    answer: "כן! כל האתרים שלנו נבנים עם עיצוב רספונסיבי מלא ומותאמים לכל המכשירים - מחשב, טאבלט וטלפון."
  },
  {
    question: "האם אתם מספקים תמיכה לאחר השקה?",
    answer: "כן, כל החבילות כוללות תמיכה טכנית. Basic ו-Basic Plus כוללים תמיכה בסיסית, Extra ו-Extra Plus כוללים תמיכה מלאה."
  },
  {
    question: "האם האתר יכלול SEO?",
    answer: "כן, כל האתרים שלנו נבנים עם אופטימיזציה למנועי חיפוש בסיסית. בחבילות המתקדמות יותר נוסיף אופטימיזציה מתקדמת."
  },
  {
    question: "האם אפשר לשנות את העיצוב אחרי השקה?",
    answer: "כן, אפשר לבצע שינויים ועדכונים. בחבילות המתקדמות יותר כלולים עדכונים חודשיים."
  },
  {
    question: "האם האתר יכלול אנימציות?",
    answer: "כן! כל האתרים כוללים אנימציות בסיסיות. בחבילות Extra ו-Extra Plus נוסיף אנימציות מתקדמות ו-WebGL."
  }
]

export default function ServicesPage() {
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
                שירותים וחבילות
              </h1>
              <p className="mt-6 text-lg leading-8 text-muted-foreground">
                חבילות מותאמות אישית לבניית אתרים מרהיבים עם אנימציות מתקדמות
              </p>
            </motion.div>
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
                <motion.div key={index} className="pt-8" variants={fadeInUp}>
                  <Card 
                    className={`h-full relative transition-all duration-300 ${
                      pkg.popular 
                        ? 'ring-2 ring-brand shadow-lg scale-105' 
                        : 'hover:shadow-lg'
                    }`}
                  >
                    {pkg.popular && (
                      <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-20">
                        <div className="bg-brand text-white px-3 py-1 rounded-full text-sm font-medium flex items-center gap-1">
                          <Star className="h-3 w-3" />
                          פופולרי
                        </div>
                      </div>
                    )}
                    
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
                        variant={pkg.popular ? "default" : "outline"}
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
                שאלות נפוצות
              </h2>
              <p className="mt-4 text-lg leading-8 text-muted-foreground">
                תשובות לשאלות שמעסיקות אותנו
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
                לא בטוחים איזו חבילה מתאימה לכם?
              </h2>
              <p className="mt-4 text-lg leading-8 opacity-90">
                נקבע שיחת ייעוץ חינם ונעזור לכם לבחור את החבילה המתאימה ביותר.
              </p>
              <div className="mt-10 flex items-center justify-center gap-4">
                <Button asChild size="lg" variant="secondary">
                  <Link href="/contact">
                    קבעו ייעוץ חינם
                  </Link>
                </Button>
                <Button asChild size="lg" variant="outline">
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