"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Check, Code, FileText, ArrowRight, Sparkles } from "lucide-react"

import { Button } from "@/components/ui/button"
import BlobButton from "@/components/ui/BlobButton"
import BackgroundVibe from "@/components/BackgroundVibe"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { fadeInUp, staggerContainer } from "@/lib/animations"
import { useI18n } from "@/components/i18n/I18nProvider"
import CurvedLoop from './advanced/CurvedLoop'

const getPackages = (t: (key: string) => string) => [
  {
    name: t("packages.custom.name"),
    price: t("packages.custom.price"),
    description: t("packages.custom.description"),
    icon: Code,
    gradient: "from-blue-500 to-blue-600",
    bgGradient: "from-blue-500/10 to-blue-600/10",
    features: [
      t("packages.custom.features.0"),
      t("packages.custom.features.1"),
      t("packages.custom.features.2"),
      t("packages.custom.features.3")
    ],
    cta: t("packages.custom.cta"),
    animation: "slideInLeft"
  },
  {
    name: t("packages.template.name"),
    price: t("packages.template.price"),
    description: t("packages.template.description"),
    icon: FileText,
    gradient: "from-blue-700 to-blue-800",
    bgGradient: "from-blue-700/10 to-blue-800/10",
    features: [
      t("packages.template.features.0"),
      t("packages.template.features.1"),
      t("packages.template.features.2"),
      t("packages.template.features.3")
    ],
    cta: t("packages.template.cta"),
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
  const { t } = useI18n()
  const [hoveredPackage, setHoveredPackage] = useState<string | null>(null)
  const packages = getPackages(t)

  return (
    <section
      id="packages"
      data-theme
      data-stop1="#bfdbfe" data-stop2="#dbeafe" data-stop3="#fbcfe8"
      data-o1-x="24%" data-o1-y="210rem" data-o1-size="34rem" data-o1-color="rgba(96,165,250,.45)" data-o1-alpha="1"
      data-o2-x="78%" data-o2-y="250rem" data-o2-size="40rem" data-o2-color="rgba(167,139,250,.35)" data-o2-alpha=".9"
      className="py-24 relative overflow-hidden"
    >
      {/* Background decorations removed for uniform background */}
      
      {/* Background decorations removed to keep global background fully continuous */}

      <div className="relative z-10 container">
        {/* Curved Text Animation */}
        <motion.div
          className="mb-16"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <CurvedLoop 
            marqueeText="בחרו את החבילה שלכם ✦ Choose Your Package ✦ בחרו את החבילה שלכם ✦"
            speed={1}
            curveAmount={150}
            direction="right"
            interactive={false}
            className="text-slate-700"
          />
        </motion.div>

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
            <span className="text-sm font-medium text-slate-700">{t("packages.title")}</span>
          </motion.div>

          <motion.h2
            className="text-4xl lg:text-5xl font-bold text-slate-900 mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            {t("packages.title")}
          </motion.h2>

          <motion.p
            className="text-lg text-slate-600 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
          >
            {t("packages.subtitle")}
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
                  <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-pink-500 to-purple-500 shadow-lg border-2 border-white/20 backdrop-blur-sm">
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
                          <Check className="h-5 w-5 text-pink-500 mt-0.5" />
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
                        <ArrowRight className="w-4 h-4 ms-2 flip-x-rtl" />
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
            {t("packages.unsure")}
          </motion.p>
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
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
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
} 