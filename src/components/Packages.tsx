"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Check, Star, Zap, Crown, Rocket, Sparkles, ArrowRight, TrendingUp } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { fadeInUp, staggerContainer } from "@/lib/animations"

const packages = [
  {
    name: "Basic",
    price: "5,000 ₪",
    description: "אידיאלי לעסקים בתחילת הדרך",
    icon: Zap,
    gradient: "from-emerald-500 to-teal-500",
    bgGradient: "from-emerald-500/10 to-teal-500/10",
    features: [
      "דף בית + עד 3 עמודים",
      "עיצוב נקי ומודרני",
      "התאמה מלאה למובייל",
      "טפסי יצירת קשר מתקדמים",
      "חיבור בסיסי לאנליטיקס",
      "טעינה מהירה"
    ],
    cta: "התחילו עם Basic",
    popular: false,
    animation: "slideInLeft"
  },
  {
    name: "Basic Plus",
    price: "8,000 ₪",
    description: "כל מה שב-Basic + מערכת משתמשים מתקדמת",
    icon: TrendingUp,
    gradient: "from-violet-500 to-purple-500",
    bgGradient: "from-violet-500/10 to-purple-500/10",
    features: [
      "כל מה שב-Basic",
      "הרשמה/התחברות מתקדמת",
      "אזור אישי מותאם",
      "רכיבים אינטראקטיביים",
      "תמיכה טכנית מתמשכת",
      "אנימציות בסיסיות"
    ],
    cta: "שדרגו ל-Basic Plus",
    popular: false,
    animation: "slideInUp"
  },
  {
    name: "Extra",
    price: "15,000 ₪",
    description: "חבילת פרימיום עם אתר חי ואנימציות מתקדמות",
    icon: Rocket,
    gradient: "from-orange-500 to-red-500",
    bgGradient: "from-orange-500/10 to-red-500/10",
    features: [
      "כל מה שב-Basic Plus",
      "אנימציות גלילה מתקדמות",
      "מקטע WebGL אינטראקטיבי",
      "עמודי פרויקט קולנועיים",
      "אופטימיזציה מתקדמת ל-SEO",
      "ביצועים מעולים"
    ],
    cta: "עברו ל-Extra",
    popular: true,
    animation: "slideInUp"
  },
  {
    name: "Extra Plus",
    price: "25,000 ₪",
    description: "המופע המלא: אתר אנימטיבי חי מרשים במיוחד",
    icon: Crown,
    gradient: "from-yellow-500 to-orange-500",
    bgGradient: "from-yellow-500/10 to-orange-500/10",
    features: [
      "כל מה שב-Extra",
      "מספר סצנות WebGL מתקדמות",
      "מיקרו-אינטראקציות בכל האתר",
      "עמודי קייס-סטדי קולנועיים",
      "תמיכה מלאה + עדכונים חודשיים",
      "ביצועים אופטימליים"
    ],
    cta: "בחרו ב-Extra Plus",
    popular: false,
    animation: "slideInRight"
  }
]

const animationVariants = {
  slideInLeft: {
    initial: { x: -100, opacity: 0 },
    animate: { x: 0, opacity: 1 },
    exit: { x: -100, opacity: 0 }
  },
  slideInUp: {
    initial: { y: 100, opacity: 0 },
    animate: { y: 0, opacity: 1 },
    exit: { y: 100, opacity: 0 }
  },
  slideInRight: {
    initial: { x: 100, opacity: 0 },
    animate: { x: 0, opacity: 1 },
    exit: { x: 100, opacity: 0 }
  }
}

export function Packages() {
  const [selectedPackage, setSelectedPackage] = useState<string | null>(null)
  const [hoveredPackage, setHoveredPackage] = useState<string | null>(null)

  return (
    <section className="py-24 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 relative overflow-hidden">
             {/* Unique Animated Background */}
       <div className="absolute inset-0">
         {/* Geometric Pattern */}
         <div className="absolute inset-0 opacity-20">
           <div className="absolute top-10 left-10 w-32 h-32 border-2 border-emerald-300/30 rounded-full animate-spin-slow" />
           <div className="absolute top-20 right-20 w-24 h-24 border-2 border-violet-300/30 rounded-full animate-spin-slow-reverse" />
           <div className="absolute bottom-20 left-1/4 w-40 h-40 border-2 border-orange-300/30 rounded-full animate-spin-slow" />
           <div className="absolute bottom-10 right-1/3 w-28 h-28 border-2 border-yellow-300/30 rounded-full animate-spin-slow-reverse" />
         </div>
         
         {/* Subtle Floating Elements */}
         <div className="absolute top-1/4 left-1/4 w-1 h-1 bg-emerald-400/60 rounded-full animate-pulse" />
         <div className="absolute top-1/3 right-1/3 w-1.5 h-1.5 bg-violet-400/60 rounded-full animate-pulse" style={{ animationDelay: '1s' }} />
         <div className="absolute bottom-1/4 left-1/2 w-1 h-1 bg-orange-400/60 rounded-full animate-pulse" style={{ animationDelay: '2s' }} />
         <div className="absolute bottom-1/3 right-1/4 w-1.5 h-1.5 bg-yellow-400/60 rounded-full animate-pulse" style={{ animationDelay: '3s' }} />
         
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
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-emerald-500/20 to-violet-500/20 backdrop-blur-sm border border-emerald-300/30 mb-6"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <Sparkles className="w-4 h-4 text-emerald-600" />
            <span className="text-sm font-medium text-slate-700">בחרו את החבילה המתאימה</span>
          </motion.div>

          <motion.h2 
            className="text-4xl lg:text-6xl font-bold text-slate-800 mb-6"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            <span className="bg-gradient-to-r from-emerald-600 via-violet-600 to-orange-600 bg-clip-text text-transparent">
              חבילות שירות
            </span>
          </motion.h2>
          
          <motion.p 
            className="text-xl text-slate-600 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
          >
            בחרו את החבילה המתאימה לעסק שלכם וקבלו אתר מרשים עם אנימציות מתקדמות
          </motion.p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 gap-8 lg:grid-cols-2 xl:grid-cols-4"
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
        >
          {packages.map((pkg, index) => (
            <motion.div 
              key={index} 
              variants={animationVariants[pkg.animation as keyof typeof animationVariants]}
              whileHover={{ 
                y: -10,
                scale: 1.02,
                transition: { duration: 0.3 }
              }}
              onHoverStart={() => setHoveredPackage(pkg.name)}
              onHoverEnd={() => setHoveredPackage(null)}
            >
              <Card 
                className={`h-full relative overflow-hidden transition-all duration-500 cursor-pointer bg-white/80 backdrop-blur-sm border-0 shadow-xl ${
                  pkg.popular 
                    ? 'ring-2 ring-orange-400 shadow-2xl scale-105 bg-gradient-to-br from-orange-50 to-red-50' 
                    : 'hover:shadow-2xl hover:bg-white/90'
                }`}
              >
                {/* Animated Background */}
                <div className={`absolute inset-0 bg-gradient-to-br ${pkg.bgGradient} opacity-0 transition-opacity duration-500 ${
                  hoveredPackage === pkg.name ? 'opacity-100' : ''
                }`} />
                
                {/* Popular Badge */}
                {pkg.popular && (
                  <motion.div 
                    className="absolute -top-3 left-1/2 -translate-x-1/2 z-10"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.5 }}
                  >
                    <div className="bg-gradient-to-r from-orange-400 to-red-500 text-white px-4 py-2 rounded-full text-sm font-bold flex items-center gap-2 shadow-lg">
                      <Star className="h-4 w-4" />
                      פופולרי
                    </div>
                  </motion.div>
                )}
                
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
                  
                  <CardTitle className="text-2xl text-slate-800 mb-2">{pkg.name}</CardTitle>
                  <motion.div 
                    className="text-4xl font-bold bg-gradient-to-r from-emerald-600 to-violet-600 bg-clip-text text-transparent mb-3"
                    whileHover={{ scale: 1.05 }}
                  >
                    {pkg.price}
                  </motion.div>
                  <CardDescription className="text-base text-slate-600">
                    {pkg.description}
                  </CardDescription>
                </CardHeader>
                
                <CardContent className="space-y-6 relative z-10">
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
                          <Check className="h-5 w-5 text-emerald-500 mt-0.5" />
                        </motion.div>
                        <span className="text-sm text-slate-700">{feature}</span>
                      </motion.li>
                    ))}
                  </ul>
                  
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Button 
                      className={`w-full mt-6 bg-gradient-to-r ${pkg.gradient} hover:shadow-lg transition-all duration-300 text-white font-semibold`}
                      size="lg"
                    >
                      <span>{pkg.cta}</span>
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </motion.div>
                </CardContent>

                {/* Hover Effects */}
                <motion.div
                  className="absolute inset-0 rounded-lg bg-gradient-to-r from-white/20 to-transparent opacity-0 transition-opacity duration-300"
                  initial={false}
                  animate={{ opacity: hoveredPackage === pkg.name ? 1 : 0 }}
                />
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
              asChild 
              size="lg"
              className="bg-gradient-to-r from-emerald-500 to-violet-600 hover:from-emerald-600 hover:to-violet-700 text-white font-semibold px-8 py-4 text-lg shadow-lg"
            >
              <a href="/contact">קבעו ייעוץ חינם</a>
            </Button>
          </motion.div>
        </motion.div>
             </div>
     </section>
   )
 } 