"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { Mail, Phone, MapPin, Github, Linkedin, Twitter } from "lucide-react"

import { Button } from "@/components/ui/button"
import { fadeInUp } from "@/lib/animations"

const navigation = {
  main: [
    { name: "בית", href: "/" },
    { name: "פרויקטים", href: "/projects" },
    { name: "שירותים", href: "/services" },
    { name: "אודות", href: "/about" },
    { name: "צור קשר", href: "/contact" },
  ],
  social: [
    {
      name: "GitHub",
      href: "#",
      icon: Github,
    },
    {
      name: "LinkedIn",
      href: "#",
      icon: Linkedin,
    },
    {
      name: "Twitter",
      href: "#",
      icon: Twitter,
    },
  ],
}

export function Footer() {
  return (
    <footer className="bg-background text-foreground border-t border-border">
      <div className="mx-auto max-w-7xl px-6 py-12 lg:px-8">
        <motion.div
          className="xl:grid xl:grid-cols-3 xl:gap-8"
          variants={fadeInUp}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
        >
                     <div className="space-y-8 xl:col-span-1">
             <div className="text-2xl font-bold">
               <img
                 src="/images/logo+name.png"
                 alt="mai web"
                 className="h-24 w-auto object-contain"
                 style={{ maxWidth: '400px' }}
               />
             </div>
            <p className="text-sm leading-6 opacity-80">
              בונים אתרים חיים שמזיזים אנשים. אנימציות חכמות, עיצוב מודרני, ותוצאות אמיתיות.
            </p>
            <div className="flex space-x-6">
              {navigation.social.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="opacity-60 hover:opacity-100 transition-opacity"
                >
                  <span className="sr-only">{item.name}</span>
                  <item.icon className="h-6 w-6" aria-hidden="true" />
                </Link>
              ))}
            </div>
          </div>
          
          <div className="mt-16 grid grid-cols-2 gap-8 xl:col-span-2 xl:mt-0">
            <div className="md:grid md:grid-cols-2 md:gap-8">
              <div>
                <h3 className="text-sm font-semibold leading-6">ניווט</h3>
                <ul className="mt-6 space-y-4">
                  {navigation.main.map((item) => (
                    <li key={item.name}>
                      <Link
                        href={item.href}
                        className="text-sm leading-6 opacity-60 hover:opacity-100 transition-opacity"
                      >
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div className="mt-10 md:mt-0">
                <h3 className="text-sm font-semibold leading-6">צור קשר</h3>
                <ul className="mt-6 space-y-4">
                  <li className="flex items-center gap-3 text-sm opacity-60">
                    <Mail className="h-4 w-4" />
                    <a href="mailto:hello@maiweb.co.il" className="hover:opacity-100 transition-opacity">
                      hello@maiweb.co.il
                    </a>
                  </li>
                  <li className="flex items-center gap-3 text-sm opacity-60">
                    <Phone className="h-4 w-4" />
                    <a href="tel:+972501234567" className="hover:opacity-100 transition-opacity">
                      050-123-4567
                    </a>
                  </li>
                  <li className="flex items-center gap-3 text-sm opacity-60">
                    <MapPin className="h-4 w-4" />
                    <span>תל אביב, ישראל</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </motion.div>
        
        <motion.div
          className="mt-16 border-t border-border pt-8 sm:mt-20 lg:mt-24"
          variants={fadeInUp}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
        >
          <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
            <p className="text-sm leading-5 opacity-60">
              &copy; 2024 mai web. כל הזכויות שמורות למאי בן שבע.
            </p>
            <Button asChild variant="outline" size="sm">
              <Link href="/contact">קבעו ייעוץ חינם</Link>
            </Button>
          </div>
        </motion.div>
      </div>
    </footer>
  )
} 