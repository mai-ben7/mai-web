"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Check, Code, FileText, ArrowRight, Sparkles } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { fadeInUp, staggerContainer } from "@/lib/animations"

const packages = [
  {
    name: "אתר מותאם אישית בקוד מלא",
    price: "החל מ-4,999 ₪",
    description: "בניית אתר מותאם אישית בקוד מלא עם אנימציות מתקדמות ומודלים תלת-ממדיים אינטראקטיביים. הפתרון המושלם לעסקים שרוצים אתר ייחודי וחדשני.",
    icon: Code,
    gradient: "from-blue-500 to-blue-600",
    bgGradient: "from-blue-500/10 to-blue-600/10",
    features: [
      "פיתוח בקוד מלא עם אפשרויות בלתי מוגבלות",
      "אנימציות מתקדמות ואפקטים ויזואליים",
      "מודלים תלת-ממדיים אינטראקטיביים (אופציונלי)",
      "אתר אינטראקטיבי וחדשני לחלוטין"
    ],
    cta: "למידע נוסף",
    animation: "slideInLeft"
  },
  {
    name: "תבנית מוכנה בהתאמה אישית",
    price: "החל מ-1,999 ₪",
    description: "אתרים מוכנים לרכישה מהירה במחיר מוזל. פתרון אידיאלי כשאתה צריך אתר איכותי במהירות וביעילות.",
    icon: FileText,
    gradient: "from-blue-700 to-blue-800",
    bgGradient: "from-blue-700/10 to-blue-800/10",
    features: [
      "חיסכון משמעותי בזמן ובעלויות",
      "עיצוב מקצועי ומודרני",
      "התאמה קלה לצרכים שלך",
      "מוכן תוך 7-14 ימי עבודה"
    ],
    cta: "למידע נוסף",
    animation: "slideInRight"
  }
]

const animationVariants = {
  slideInLeft: {
    initial: { x: -100, opacity: 0 },
    animate: { x: 0, opacity: 1 },
    exit: { x: -100, opacity: 0 }
  },
  slideInRight: {
    initial: { x: 100, opacity: 0 },
    animate: { x: 0, opacity: 1 },
    exit: { x: 100, opacity: 0 }
  }
}

export function Packages() {
  const [hoveredPackage, setHoveredPackage] = useState<string | null>(null)

  return (
    <section id="packages" className="py-24 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 relative overflow-hidden">
      {/* Unique Animated Background */}
      <div className="absolute inset-0">
        {/* Geometric Pattern */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-10 left-10 w-32 h-32 border-2 border-blue-300/30 rounded-full animate-spin-slow" />
          <div className="absolute top-20 right-20 w-24 h-24 border-2 border-blue-400/30 rounded-full animate-spin-slow-reverse" />
          <div className="absolute bottom-20 left-1/4 w-40 h-40 border-2 border-blue-500/30 rounded-full animate-spin-slow" />
          <div className="absolute bottom-10 right-1/3 w-28 h-28 border-2 border-blue-600/30 rounded-full animate-spin-slow-reverse" />
        </div>
        
        {/* Subtle Floating Elements */}
        <div className="absolute top-1/4 left-1/4 w-1 h-1 bg-blue-400/60 rounded-full animate-pulse" />
        <div className="absolute top-1/3 right-1/3 w-1.5 h-1.5 bg-blue-500/60 rounded-full animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute bottom-1/4 left-1/2 w-1 h-1 bg-blue-600/60 rounded-full animate-pulse" style={{ animationDelay: '2s' }} />
        <div className="absolute bottom-1/3 right-1/4 w-1.5 h-1.5 bg-blue-700/60 rounded-full animate-pulse" style={{ animationDelay: '3s' }} />
        
        {/* Gradient Overlays */}
        <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-white/30 to-transparent" />
        <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-white/30 to-transparent" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8">
        <motion.div
          className="mx-auto max-w-3xl text-center mb-20"
          variants={fadeInUp}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
        >
          <motion.div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-blue-500/20 to-blue-600/20 backdrop-blur-sm border border-blue-300/30 mb-6"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <Sparkles className="w-4 h-4 text-blue-600" />
            <span className="text-sm font-medium text-slate-700">בחרו את החבילה המתאימה</span>
          </motion.div>

          <motion.h2
            className="text-4xl lg:text-5xl font-bold text-slate-900 mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            <span className="bg-gradient-to-r from-blue-600 to-blue-700 bg-clip-text text-transparent">
              חבילות שירות
            </span>
          </motion.h2>

          <motion.p
            className="text-lg text-slate-600 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
          >
            פתרונות מותאמים אישית לכל סוגי העסקים - מסטארט-אפים ועד חברות גדולות
          </motion.p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 gap-8 lg:grid-cols-2 max-w-5xl mx-auto items-stretch"
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
        >
          {packages.map((pkg, index) => (
            <motion.div
              key={pkg.name}
              variants={animationVariants[pkg.animation as keyof typeof animationVariants]}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
              onHoverStart={() => setHoveredPackage(pkg.name)}
              onHoverEnd={() => setHoveredPackage(null)}
              className="flex flex-col"
            >
              {/* Small Business Tag above second card */}
              {pkg.name === "תבנית מוכנה בהתאמה אישית" && (
                <motion.div
                  className="flex justify-center mb-4"
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-green-500 to-emerald-500 shadow-lg border-2 border-white/20 backdrop-blur-sm">
                    <span className="text-sm font-bold text-white">מתאים לעסקים קטנים</span>
                    <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                  </div>
                </motion.div>
              )}
              
              {/* Empty space for first card to maintain alignment */}
              {pkg.name === "אתר מותאם אישית בקוד מלא" && (
                <div className="mb-4 h-12"></div>
              )}
              
              <Card 
                className={`h-full flex flex-col transition-all duration-500 cursor-pointer border-0 shadow-xl hover:shadow-2xl bg-gradient-to-br ${pkg.gradient}`}
              >
                
                <CardHeader className="text-center relative z-10">
                  <motion.div
                    className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-r ${pkg.gradient} mb-4 mx-auto shadow-lg`}
                    whileHover={{ 
                      scale: 1.1,
                      rotate: 360,
                    }}
                    transition={{ duration: 0.3 }}
                  >
                    <pkg.icon className="w-8 h-8 text-white" />
                  </motion.div>
                  
                  <CardTitle className="text-2xl text-white mb-2 font-bold">{pkg.name}</CardTitle>
                  <motion.div 
                    className="text-3xl font-bold text-white mb-3"
                    whileHover={{ scale: 1.05 }}
                  >
                    {pkg.price}
                  </motion.div>
                  
                  <CardDescription className="text-base text-white/90">
                    {pkg.description}
                  </CardDescription>
                </CardHeader>
                
                <CardContent className="flex-1 flex flex-col space-y-6 relative z-10">
                  <ul className="space-y-4">
                    {pkg.features.map((feature, featureIndex) => (
                      <motion.li 
                        key={featureIndex} 
                        className="flex items-start gap-3"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.1 * featureIndex }}
                      >
                        <motion.div
                          className="flex-shrink-0"
                          whileHover={{ scale: 1.2 }}
                        >
                          <Check className="h-5 w-5 text-green-400 mt-0.5" />
                        </motion.div>
                        <span className="text-sm text-white">{feature}</span>
                      </motion.li>
                    ))}
                  </ul>
                  
                  <div className="mt-auto pt-6">
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Button 
                        className="w-full bg-white/20 hover:bg-white/30 backdrop-blur-sm border border-white/30 transition-all duration-300 text-white font-semibold"
                        size="lg"
                      >
                        <span>{pkg.cta}</span>
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </Button>
                    </motion.div>
                  </div>
                </CardContent>


              </Card>
            </motion.div>
          ))}
        </motion.div>
        
        <motion.div
          className="mt-20 text-center"
          variants={fadeInUp}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
        >
          <motion.p 
            className="text-slate-600 mb-6 text-lg"
            whileHover={{ scale: 1.05 }}
          >
            לא בטוחים איזו חבילה מתאימה לכם?
          </motion.p>
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button 
              size="lg"
              className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-semibold px-8 py-4 text-lg shadow-lg"
              onClick={() => {
                const element = document.querySelector('#booking')
                if (element) {
                  element.scrollIntoView({ behavior: 'smooth' })
                }
              }}
            >
              קבעו ייעוץ חינם
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
} 