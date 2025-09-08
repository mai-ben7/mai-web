"use client"

import { motion } from "framer-motion"
import { useState } from "react"
import { ChevronDown, ChevronUp } from "lucide-react"
import { fadeInUp, staggerContainer } from "@/lib/animations"

interface FAQItem {
  question: string
  answer: string
}

const faqData: FAQItem[] = [
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
  }
]

export function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <section className="py-24 bg-gradient-to-b from-slate-50 via-white to-slate-50 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 container mx-auto px-6 lg:px-8">
        <motion.div
          variants={fadeInUp}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            שאלות <span className="text-gradient">נפוצות</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            תשובות לשאלות שמעסיקות אותנו
          </p>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          className="max-w-4xl mx-auto"
        >
          {faqData.map((faq, index) => (
            <motion.div
              key={index}
              variants={fadeInUp}
              className="mb-4"
            >
              <motion.div
                className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.2 }}
              >
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full px-8 py-6 text-right flex items-center justify-between hover:bg-gray-50 transition-colors duration-200"
                  suppressHydrationWarning
                >
                  <div className="flex items-center">
                    {openIndex === index ? (
                      <ChevronUp className="w-6 h-6 text-blue-600 ml-4" />
                    ) : (
                      <ChevronDown className="w-6 h-6 text-gray-400 ml-4" />
                    )}
                  </div>
                  <h3 className="text-lg lg:text-xl font-semibold text-gray-900 flex-1">
                    {faq.question}
                  </h3>
                </button>
                
                <motion.div
                  initial={false}
                  animate={{
                    height: openIndex === index ? "auto" : 0,
                    opacity: openIndex === index ? 1 : 0
                  }}
                  transition={{
                    duration: 0.3,
                    ease: "easeInOut"
                  }}
                  className="overflow-hidden"
                >
                  <div className="px-8 pb-6">
                    <p className="text-gray-600 leading-relaxed text-lg">
                      {faq.answer}
                    </p>
                  </div>
                </motion.div>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          variants={fadeInUp}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="text-center mt-12"
        >
          <p className="text-gray-500 text-lg">
            יש לך שאלה נוספת? 
            <button 
              onClick={() => {
                const element = document.querySelector('#booking')
                if (element) {
                  element.scrollIntoView({ behavior: 'smooth' })
                }
              }}
              className="text-blue-600 hover:text-blue-700 font-semibold mr-2 cursor-pointer"
              suppressHydrationWarning
            >
              צור קשר איתנו
            </button>
            ונשמח לעזור!
          </p>
        </motion.div>
      </div>
    </section>
  )
}
