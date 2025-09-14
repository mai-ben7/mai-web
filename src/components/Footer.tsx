"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { Mail, Phone, MapPin, Github, Linkedin, Twitter, Instagram, Facebook } from "lucide-react"

import { Button } from "@/components/ui/button"
import { fadeInUp } from "@/lib/animations"
import { useI18n } from "@/components/i18n/I18nProvider"

const getNavigation = (t: (key: string) => string) => ({
  main: [
    { name: t("nav.home"), href: "/" },
    { name: t("nav.projects"), href: "/projects" },
    { name: t("nav.services"), href: "/services" },
    { name: t("nav.about"), href: "/about" },
    { name: t("nav.contact"), href: "#booking" },
  ],
  social: [
    {
      name: "GitHub",
      href: "https://github.com/mai-ben7",
      icon: Github,
    },
    {
      name: "Instagram",
      href: "#",
      icon: Instagram,
    },
    {
      name: "Facebook",
      href: "#",
      icon: Facebook,
    },
  ],
})

export function Footer() {
  const { t } = useI18n()
  const navigation = getNavigation(t)
  
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
              {t("footer.description")}
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
                <h3 className="text-sm font-semibold leading-6">{t("footer.navigation")}</h3>
                <ul className="mt-6 space-y-4">
                  {navigation.main.map((item) => (
                    <li key={item.name}>
                      <Link
                        href={item.href}
                        className="text-sm leading-6 opacity-60 hover:opacity-100 transition-opacity"
                        onClick={(e) => {
                          if (item.href.startsWith('#')) {
                            e.preventDefault()
                            const element = document.querySelector(item.href)
                            if (element) {
                              element.scrollIntoView({ behavior: 'smooth' })
                            }
                          }
                        }}
                      >
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div className="mt-10 md:mt-0">
                <h3 className="text-sm font-semibold leading-6">{t("footer.contact")}</h3>
                <ul className="mt-6 space-y-4">
                  <li className="flex items-center gap-3 text-sm opacity-60">
                    <Mail className="h-4 w-4" />
                    <a href="mailto:hello@maiweb.co.il" className="hover:opacity-100 transition-opacity">
                      maiweb25@gmail.com
                    </a>
                  </li>
                  <li className="flex items-center gap-3 text-sm opacity-60">
                    <Phone className="h-4 w-4" />
                    <a href="tel:+972501234567" className="hover:opacity-100 transition-opacity">
                      052-753-3750
                    </a>
                  </li>
                  <li className="flex items-center gap-3 text-sm opacity-60">
                    <MapPin className="h-4 w-4" />
                    <span>{t("footer.location")}</span>
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
          <div className="flex justify-center">
            <p className="text-sm leading-5 opacity-60">
              {t("footer.copyright")}
            </p>
          </div>
        </motion.div>
      </div>
    </footer>
  )
} 