"use client"

import React from 'react'
import { motion } from 'framer-motion'
import { useState } from 'react'
import { 
  Zap, 
  Palette, 
  Smartphone, 
  TrendingUp, 
  Shield, 
  Clock,
  ArrowRight,
  Sparkles
} from 'lucide-react'
import { FloatingModal } from './FloatingModal'
import { AnimatedBackground } from './AnimatedBackground'
import { FloatingParticles } from './FloatingParticles'

const features = [
  {
    icon: Zap,
    title: "ביצועים מהירים",
    description: "אתרים מהירים ומותאמים לכל המכשירים עם טעינה מהירה",
    color: "from-yellow-400 to-orange-500",
    bgColor: "from-yellow-500/20 to-orange-500/20",
    details: "אנו משתמשים בטכנולוגיות המתקדמות ביותר כדי להבטיח שהאתר שלך יהיה מהיר ויעיל. אופטימיזציה מלאה לכל המכשירים והדפדפנים."
  },
  {
    icon: Palette,
    title: "עיצוב מרהיב",
    description: "עיצובים ייחודיים ומודרניים שמבדילים אותך מהמתחרים",
    color: "from-pink-400 to-purple-500",
    bgColor: "from-pink-500/20 to-purple-500/20",
    details: "צוות העיצוב שלנו יוצר חוויות משתמש ייחודיות ומרהיבות. כל פיקסל מתוכנן בקפידה כדי ליצור את הרושם הנכון."
  },
  {
    icon: Smartphone,
    title: "מותאם למובייל",
    description: "אתרים רספונסיביים שמושלמים בכל גודל מסך",
    color: "from-blue-400 to-cyan-500",
    bgColor: "from-blue-500/20 to-cyan-500/20",
    details: "יותר מ-60% מהגולשים משתמשים במובייל. האתרים שלנו מותאמים לחלוטין לכל המכשירים והכיוונים."
  },
  {
    icon: TrendingUp,
    title: "SEO מתקדם",
    description: "אופטימיזציה למנועי חיפוש להגדלת התנועה לאתר",
    color: "from-green-400 to-emerald-500",
    bgColor: "from-green-500/20 to-emerald-500/20",
    details: "אנו משלבים טכניקות SEO מתקדמות כדי שהאתר שלך יופיע גבוה בתוצאות החיפוש וימשוך יותר לקוחות."
  },
  {
    icon: Shield,
    title: "אבטחה מלאה",
    description: "הגנה מתקדמת על הנתונים והאתר שלך",
    color: "from-red-400 to-pink-500",
    bgColor: "from-red-500/20 to-pink-500/20",
    details: "אבטחה ברמה הגבוהה ביותר עם SSL, firewall מתקדם, וגיבויים אוטומטיים לשמירה על הנתונים שלך."
  },
  {
    icon: Clock,
    title: "תמיכה 24/7",
    description: "צוות תמיכה זמין בכל שעה לעזור לך",
    color: "from-indigo-400 to-blue-500",
    bgColor: "from-indigo-500/20 to-blue-500/20",
    details: "אנחנו כאן בשבילך בכל שעה. צוות התמיכה שלנו זמין 24/7 לענות על כל השאלות ולפתור בעיות."
  },
]

export function AnimatedFeatureCards() {
  const [selectedFeature, setSelectedFeature] = useState<number | null>(null)

  return (
    <section className="py-24 bg-gradient-to-b from-slate-900 to-slate-800 relative overflow-hidden">
      {/* Animated Background */}
      <AnimatedBackground />
      
      {/* Floating Particles */}
      <FloatingParticles />
      
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-72 h-72 bg-purple-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 container mx-auto px-6 lg:px-8">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <motion.div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 mb-6"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <Sparkles className="w-4 h-4 text-yellow-400" />
            <span className="text-sm font-medium text-white/90">למה לבחור בנו?</span>
          </motion.div>

          <motion.h2
            className="text-4xl lg:text-5xl font-bold text-white mb-6"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              יכולות מתקדמות
            </span>
            <br />
            <span className="text-white">שמבדילות אותנו</span>
          </motion.h2>

          <motion.p
            className="text-xl text-white/70 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
          >
            אנו משלבים טכנולוגיה מתקדמת עם עיצוב יצירתי כדי ליצור אתרים שמביאים תוצאות
          </motion.p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              className="group relative h-full"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -10 }}
            >
              <motion.div
                className="relative p-6 lg:p-8 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 hover:border-white/20 transition-all duration-300 cursor-pointer h-full flex flex-col"
                whileHover={{ 
                  scale: 1.05,
                  rotateY: 5,
                  rotateX: 5,
                }}
                onClick={() => setSelectedFeature(index)}
              >
                {/* Gradient Background */}
                <div className={`absolute inset-0 bg-gradient-to-br ${feature.bgColor} rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
                
                {/* Content */}
                <div className="relative z-10 flex flex-col h-full">
                  <motion.div
                    className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-r ${feature.color} mb-6 shadow-lg`}
                    whileHover={{ 
                      scale: 1.1,
                      rotate: 360,
                    }}
                    transition={{ duration: 0.3 }}
                  >
                    <feature.icon className="w-8 h-8 text-white" />
                  </motion.div>

                  <h3 className="text-xl font-bold text-white mb-4 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-white/80 group-hover:bg-clip-text transition-all duration-300">
                    {feature.title}
                  </h3>

                  <p className="text-white/70 mb-6 leading-relaxed flex-grow">
                    {feature.description}
                  </p>

                  <motion.button
                    className="inline-flex items-center gap-2 text-white/80 hover:text-white transition-colors mt-auto"
                    whileHover={{ x: 5 }}
                    suppressHydrationWarning
                  >
                    <span>קרא עוד</span>
                    <ArrowRight className="w-4 h-4" />
                  </motion.button>
                </div>

                {/* Hover Effects */}
                <motion.div
                  className="absolute inset-0 rounded-2xl bg-gradient-to-r from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  initial={false}
                />
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Feature Details Modal */}
      <FloatingModal
        isOpen={selectedFeature !== null}
        onClose={() => setSelectedFeature(null)}
        title={selectedFeature !== null ? features[selectedFeature].title : ""}
        size="lg"
      >
        {selectedFeature !== null && (
          <div className="space-y-6">
            <div className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-r ${features[selectedFeature].color} mb-4`}>
              {React.createElement(features[selectedFeature].icon, { className: "w-8 h-8 text-white" })}
            </div>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              {features[selectedFeature].details}
            </p>
            <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
              <h4 className="font-semibold text-gray-900 dark:text-white mb-2">מה כלול:</h4>
              <ul className="space-y-2 text-gray-600 dark:text-gray-400">
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full" />
                  יישום מלא של הטכנולוגיה
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full" />
                  בדיקות איכות מקיפות
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full" />
                  תמיכה טכנית מתמשכת
                </li>
              </ul>
            </div>
                     </div>
         )}
       </FloatingModal>
    </section>
  )
} 