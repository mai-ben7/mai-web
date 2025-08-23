"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu, X, Sun, Moon } from "lucide-react"
import { useTheme } from "next-themes"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { slideInFromTop } from "@/lib/animations"

const navigation = [
  { name: "בית", href: "/" },
  { name: "פרויקטים", href: "/projects" },
  { name: "שירותים", href: "/services" },
  { name: "אודות", href: "/about" },
  { name: "צור קשר", href: "/contact" },
]

export function Header() {
  const [mounted, setMounted] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const pathname = usePathname()
  const { theme, setTheme } = useTheme()

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  return (
    <motion.header
      className="fixed top-0 left-0 right-0 z-[9999] bg-background/80 backdrop-blur-md border-b border-border/40"
      variants={slideInFromTop}
      initial="initial"
      animate="animate"
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between py-4 px-4 lg:px-8" aria-label="Global">
                 <div className="flex lg:flex-1">
           <a href="/" className="-m-3 pt-1">
             <span className="sr-only">mai web</span>
                           <motion.div
                className="relative group"
                whileHover={{ 
                  scale: 1.1,
                  rotate: [0, -10, 10, -10, 0],
                  y: [0, -5, 0],
                  filter: "brightness(1.2) drop-shadow(0 0 10px rgba(255,255,255,0.3))"
                }}
                whileTap={{ scale: 0.95 }}
                transition={{
                  duration: 0.6,
                  ease: "easeInOut"
                }}
              >
                                 <img 
                   src="/images/logo+name.png" 
                   alt="mai web" 
                   className="h-full w-auto object-contain relative z-10"
                   style={{ maxHeight: '60px' }}
                 />
                 {/* Glowing border effect - behind the logo */}
                 <div className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-500 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 p-0.5 -z-10">
                   <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 blur-sm group-hover:blur-md transition-all duration-500" />
                 </div>
                 {/* Sparkle effect - behind the logo */}
                 <div className="absolute -top-1 -right-1 w-2 h-2 bg-yellow-400 rounded-full opacity-0 group-hover:opacity-100 group-hover:scale-150 transition-all duration-300 delay-200 animate-pulse -z-10" />
                 <div className="absolute -bottom-1 -left-1 w-1.5 h-1.5 bg-pink-400 rounded-full opacity-0 group-hover:opacity-100 group-hover:scale-150 transition-all duration-300 delay-300 animate-pulse -z-10" />
              </motion.div>
           </a>
         </div>
        
        <div className="flex lg:hidden">
          <Button
            variant="ghost"
            onClick={() => setMobileMenuOpen(true)}
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
                "text-base font-semibold leading-6 transition-colors hover:text-brand cursor-pointer",
                pathname === item.href
                  ? "text-brand"
                  : "text-foreground"
              )}
              onClick={() => console.log(`Navigating to: ${item.href}`)}
            >
              {item.name}
            </a>
          ))}
        </div>
        
        <div className="hidden lg:flex lg:flex-1 lg:justify-end lg:gap-x-4">
          <Button
            variant="ghost"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          >
            <span className="sr-only">החלף ערכת נושא</span>
            {theme === "dark" ? (
              <Sun className="h-5 w-5" />
            ) : (
              <Moon className="h-5 w-5" />
            )}
          </Button>
          
          <Button asChild variant="brand">
            <a href="/contact">קבעו ייעוץ חינם</a>
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
                                       <motion.div
                      className="relative group"
                      whileHover={{ 
                        scale: 1.1,
                        rotate: [0, -10, 10, -10, 0],
                        y: [0, -5, 0],
                        filter: "brightness(1.2) drop-shadow(0 0 10px rgba(255,255,255,0.3))"
                      }}
                      whileTap={{ scale: 0.95 }}
                      transition={{
                        duration: 0.6,
                        ease: "easeInOut"
                      }}
                    >
                                             <img 
                         src="/images/logo+name.png" 
                         alt="mai web" 
                         className="h-full w-auto object-contain relative z-10"
                         style={{ maxHeight: '50px' }}
                       />
                                              {/* Glowing border effect - behind the logo */}
                        <div className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-500 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 p-0.5 -z-10">
                          <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 blur-sm group-hover:blur-md transition-all duration-500" />
                        </div>
                        {/* Sparkle effect - behind the logo */}
                        <div className="absolute -top-1 -right-1 w-2 h-2 bg-yellow-400 rounded-full opacity-0 group-hover:opacity-100 group-hover:scale-150 transition-all duration-300 delay-200 animate-pulse -z-10" />
                        <div className="absolute -bottom-1 -left-1 w-1.5 h-1.5 bg-pink-400 rounded-full opacity-0 group-hover:opacity-100 group-hover:scale-150 transition-all duration-300 delay-300 animate-pulse -z-10" />
                    </motion.div>
                 </a>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setMobileMenuOpen(false)}
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
                          "-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 transition-colors hover:bg-gray-50 dark:hover:bg-gray-800 cursor-pointer",
                          pathname === item.href
                            ? "text-brand"
                            : "text-foreground"
                        )}
                        onClick={() => {
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
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                      >
                        {theme === "dark" ? (
                          <Sun className="h-5 w-5" />
                        ) : (
                          <Moon className="h-5 w-5" />
                        )}
                      </Button>
                                             <Button asChild className="w-full" variant="brand">
                         <a href="/contact">קבעו ייעוץ חינם</a>
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