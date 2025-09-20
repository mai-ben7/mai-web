"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu, X } from "lucide-react"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { slideInFromTop } from "@/lib/animations"
import { useI18n } from "@/components/i18n/I18nProvider"
import LanguageToggle from "@/components/navigation/LanguageToggle"

const getNavigation = (t: (key: string) => string) => [
  { name: t("nav.home"), href: "/" },
  { name: t("nav.projects"), href: "/projects" },
  { name: t("nav.services"), href: "/services" },
  { name: t("nav.about"), href: "/about" },
  { name: t("nav.contact"), href: "/contact" },
]

export function Header() {
  const [mounted, setMounted] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const pathname = usePathname()
  const { t } = useI18n()
  const navigation = getNavigation(t)

  useEffect(() => {
    setMounted(true)
    
    const handleScroll = () => {
      const scrollTop = window.scrollY
      setIsScrolled(scrollTop > 50)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  if (!mounted) {
    return null
  }

  return (
    <motion.header
      className={cn(
        "fixed top-0 left-0 right-0 z-[9999] transition-all duration-300",
        isScrolled 
          ? "bg-background/80 backdrop-blur-md border-b border-border/40" 
          : "bg-white/20 backdrop-blur-sm border-b border-white/20"
      )}
      variants={slideInFromTop}
      initial="initial"
      animate="animate"
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between py-4 px-4 lg:px-8" aria-label="Global">
                 <div className="flex lg:flex-1">
           <a href="/" className="-m-3 pt-1">
             <span className="sr-only">mai web</span>
                           <div className="relative">
                                 <img 
                                   src="/images/logo+name.png" 
                                   alt="mai web" 
                                   className="h-full w-auto object-contain"
                                   style={{ maxHeight: '60px' }}
                                 />
                           </div>
           </a>
         </div>
        
        <div className="flex lg:hidden">
          <Button
            variant="ghost"
            onClick={() => setMobileMenuOpen(true)}
            className="transition-colors text-slate-800 hover:text-slate-600"
            suppressHydrationWarning
          >
            <span className="sr-only">פתח תפריט</span>
            <Menu className="h-6 w-6" aria-hidden="true" />
          </Button>
        </div>
        
        <div className="hidden lg:flex lg:gap-x-12">
          {navigation.map((item) => (
            <a
              key={item.name}
              href={item.href}
              className={cn(
                "text-base font-semibold leading-6 transition-colors hover:bg-gradient-to-r hover:from-blue-500 hover:to-pink-500 hover:bg-clip-text hover:text-transparent cursor-pointer",
                pathname === item.href
                  ? "bg-gradient-to-r from-blue-500 to-pink-500 bg-clip-text text-transparent"
                  : "text-slate-800"
              )}
              onClick={(e) => {
                if (item.href.startsWith('#')) {
                  e.preventDefault()
                  const element = document.querySelector(item.href)
                  if (element) {
                    element.scrollIntoView({ behavior: 'smooth' })
                  }
                }
                console.log(`Navigating to: ${item.href}`)
              }}
            >
              {item.name}
            </a>
          ))}
        </div>
        
        <div className="hidden lg:flex lg:flex-1 lg:justify-end lg:gap-x-4">
          <LanguageToggle />
          <Button 
            className="bg-gradient-to-r from-blue-500 to-pink-500 hover:from-blue-600 hover:to-pink-600 text-white border-0 shadow-lg hover:shadow-xl transition-all duration-300"
            onClick={() => {
              const element = document.querySelector('#booking')
              if (element) {
                element.scrollIntoView({ behavior: 'smooth' })
              }
            }}
          >
            {t("cta.bookConsultation")}
          </Button>
        </div>
      </nav>

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            className="lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="fixed inset-0 z-[9998]" />
            <motion.div
              className="fixed inset-y-0 right-0 z-[9999] w-full overflow-y-auto bg-background px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
            >
                             <div className="flex items-center justify-between">
                 <a href="/" className="-m-3 pt-5">
                   <span className="sr-only">mai web</span>
                                       <div className="relative">
                                             <img 
                                               src="/images/logo+name.png" 
                                               alt="mai web" 
                                               className="h-full w-auto object-contain"
                                               style={{ maxHeight: '50px' }}
                                             />
                                       </div>
                 </a>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setMobileMenuOpen(false)}
                  suppressHydrationWarning
                >
                  <span className="sr-only">סגור תפריט</span>
                  <X className="h-6 w-6" aria-hidden="true" />
                </Button>
              </div>
              <div className="mt-6 flow-root">
                <div className="-my-6 divide-y divide-gray-500/10">
                  <div className="space-y-2 py-6">
                    {navigation.map((item) => (
                      <a
                        key={item.name}
                        href={item.href}
                        className={cn(
                          "-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 transition-colors hover:bg-gradient-to-r hover:from-blue-500/10 hover:to-pink-500/10 cursor-pointer",
                          pathname === item.href
                            ? "bg-gradient-to-r from-blue-500 to-pink-500 bg-clip-text text-transparent"
                            : "text-foreground"
                        )}
                        onClick={(e) => {
                          if (item.href.startsWith('#')) {
                            e.preventDefault()
                            const element = document.querySelector(item.href)
                            if (element) {
                              element.scrollIntoView({ behavior: 'smooth' })
                            }
                          }
                          console.log(`Mobile navigating to: ${item.href}`)
                          setMobileMenuOpen(false)
                        }}
                      >
                        {item.name}
                      </a>
                    ))}
                  </div>
                  <div className="py-6">
                    <div className="flex items-center gap-4">
                      <LanguageToggle />
                      <Button 
                        className="flex-1 bg-gradient-to-r from-blue-500 to-pink-500 hover:from-blue-600 hover:to-pink-600 text-white border-0 shadow-lg hover:shadow-xl transition-all duration-300"
                        onClick={() => {
                          const element = document.querySelector('#booking')
                          if (element) {
                            element.scrollIntoView({ behavior: 'smooth' })
                          }
                          setMobileMenuOpen(false)
                        }}
                      >
                        {t("cta.bookConsultation")}
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
} 