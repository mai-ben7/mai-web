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
    <section
      data-theme
      data-stop1="#bfdbfe" data-stop2="#dbeafe" data-stop3="#fbcfe8"
      data-o1-x="20%" data-o1-y="290rem" data-o1-size="30rem" data-o1-color="rgba(96,165,250,.40)" data-o1-alpha=".9"
      data-o2-x="82%" data-o2-y="330rem" data-o2-size="38rem" data-o2-color="rgba(167,139,250,.33)" data-o2-alpha=".85"
      className="py-24 relative overflow-hidden"
    >

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
