"use client"

import { motion } from "framer-motion"
import { 
  Zap, 
  Search, 
  Accessibility, 
  Sparkles, 
  Palette, 
  Languages 
} from "lucide-react"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { fadeInUp, staggerContainer } from "@/lib/animations"

const features = [
  {
    icon: Zap,
    title: "ביצועים מטורפים",
    description: "טעינה מהירה, קוד נקי, תמונות אופטימליות"
  },
  {
    icon: Search,
    title: "SEO מתקדם",
    description: "סכמות, מטא-דטה, מבנה נכון ל-Google"
  },
  {
    icon: Accessibility,
    title: "נגישות",
    description: "תקנים, ניווט מקלדת, יחס ניגודיות תקין"
  },
  {
    icon: Sparkles,
    title: "אנימציות חכמות",
    description: "עדינות כשצריך, מרהיבות כשמתאים"
  },
  {
    icon: Palette,
    title: "מיתוג מדויק",
    description: "צבעים, טיפוגרפיה ושפה ויזואלית אחידה"
  },
  {
    icon: Languages,
    title: "בדל״ד (RTL)",
    description: "עברית תקנית, חוויית משתמש טבעית"
  }
]

export function FeatureCards() {
  return (
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
            למה לבחור ב-mai web?
          </h2>
          <p className="mt-4 text-lg leading-8 text-muted-foreground">
            אנחנו מתמחים בבניית אתרים שמשיגים תוצאות אמיתיות
          </p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3"
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
        >
          {features.map((feature, index) => (
            <motion.div key={index} variants={fadeInUp}>
              <Card className="h-full group hover:shadow-lg transition-all duration-300">
                <CardHeader>
                  <div className="w-12 h-12 rounded-lg bg-brand/10 flex items-center justify-center mb-4 group-hover:bg-brand/20 transition-colors">
                    <feature.icon className="h-6 w-6 text-brand" />
                  </div>
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
} 