"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { ArrowLeft, Code, Palette, Zap, Rocket, TrendingUp } from "lucide-react"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import BlobButton from "@/components/ui/BlobButton"
import { fadeInUp, staggerContainer } from "@/lib/animations"
import EnableSectionParallax from "@/components/parallax/EnableSectionParallax"
import { useI18n } from "@/components/i18n/I18nProvider"

const skills = [
  { name: "React & Next.js", level: 95 },
  { name: "TypeScript", level: 90 },
  { name: "Framer Motion", level: 85 },
      { name: "WebGL & Canvas", level: 80 },
  { name: "Tailwind CSS", level: 95 },
  { name: "Node.js", level: 85 },
]

const getWorkflow = (t: (key: string) => string) => [
  {
    icon: Code,
    title: t("about.workflow.discovery.title"),
    description: t("about.workflow.discovery.description")
  },
  {
    icon: Palette,
    title: t("about.workflow.design.title"),
    description: t("about.workflow.design.description")
  },
  {
    icon: Zap,
    title: t("about.workflow.build.title"),
    description: t("about.workflow.build.description")
  },
  {
    icon: Rocket,
    title: t("about.workflow.launch.title"),
    description: t("about.workflow.launch.description")
  },
  {
    icon: TrendingUp,
    title: t("about.workflow.grow.title"),
    description: t("about.workflow.grow.description")
  }
]

export default function AboutPage() {
  const { t } = useI18n()
  const workflow = getWorkflow(t)
  
  return (
    <div>
      <main dir="rtl">
        <EnableSectionParallax />
        
        {/* Hero Section */}
      <section className="pt-32 px-8 xl:px-0 flex flex-col justify-center relative">
        <div className="container mx-auto px-6 lg:px-8 relative z-10">
          {/* Headline block */}
          <header className="max-w-2xl mx-auto text-center">
            <span className="text-slate-700 text-lg max-w-lg mx-auto mb-2 capitalize flex items-center gap-3 justify-center">
              {t("about.title")}
              <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-pink-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3" />
              </svg>
            </span>
            <h1 className="text-slate-900 text-4xl md:text-5xl xl:text-6xl font-extrabold max-w-3xl mx-auto mb-6 leading-snug bg-gradient-to-r from-slate-900 via-slate-700 to-slate-900 bg-clip-text text-transparent">
              {t("about.title")}
            </h1>
            <p className="text-slate-600 text-lg md:text-xl max-w-2xl mx-auto">
              {t("about.description")}
            </p>
          </header>
        </div>
      </section>

        {/* About Section */}
        <section className="py-24">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <motion.div
                variants={fadeInUp}
                initial="initial"
                whileInView="animate"
                viewport={{ once: true }}
              >
                <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl mb-6">
                  {t("about.intro.greeting")}
                </h2>
                <p className="text-lg leading-8 text-muted-foreground mb-6">
                  {t("about.intro.paragraph1")}
                </p>
                <p className="text-lg leading-8 text-muted-foreground mb-6">
                  {t("about.intro.paragraph2")}
                </p>
                <p className="text-lg leading-8 text-muted-foreground">
                  {t("about.intro.paragraph3")}
                </p>
              </motion.div>
              
              <motion.div
                className="relative"
                variants={fadeInUp}
                initial="initial"
                whileInView="animate"
                viewport={{ once: true }}
              >
                <div className="aspect-square bg-gradient-to-br from-brand/20 to-accent/20 rounded-2xl flex items-center justify-center">
                  <div className="text-6xl font-bold text-brand opacity-30">
                    מאי
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Skills Section */}
        <section className="py-24 bg-bg-soft">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <motion.div
              className="mx-auto max-w-2xl text-center mb-16"
              variants={fadeInUp}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
            >
              <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                {t("about.skills.title")}
              </h2>
              <p className="mt-4 text-lg leading-8 text-muted-foreground">
                {t("about.skills.subtitle")}
              </p>
            </motion.div>

            <motion.div
              className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto"
              variants={staggerContainer}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
            >
              {skills.map((skill, index) => (
                <motion.div key={index} variants={fadeInUp}>
                  <Card>
                    <CardContent className="p-6">
                      <div className="flex justify-between items-center mb-2">
                        <span className="font-medium">{skill.name}</span>
                        <span className="text-sm text-muted-foreground">{skill.level}%</span>
                      </div>
                      <div className="w-full bg-muted rounded-full h-2">
                        <div
                          className="bg-brand h-2 rounded-full transition-all duration-1000"
                          style={{ width: `${skill.level}%` }}
                        />
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Workflow Section */}
        <section className="py-24">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <motion.div
              className="mx-auto max-w-2xl text-center mb-16"
              variants={fadeInUp}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
            >
              <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                {t("about.workflow.title")}
              </h2>
              <p className="mt-4 text-lg leading-8 text-muted-foreground">
                {t("about.workflow.subtitle")}
              </p>
            </motion.div>

            <motion.div
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8"
              variants={staggerContainer}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
            >
              {workflow.map((step, index) => (
                <motion.div key={index} variants={fadeInUp}>
                  <Card className="h-full text-center">
                    <CardHeader>
                      <div className="w-12 h-12 rounded-lg bg-brand/10 flex items-center justify-center mx-auto mb-4">
                        <step.icon className="h-6 w-6 text-brand" />
                      </div>
                      <CardTitle className="text-lg">{step.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <CardDescription className="text-sm">
                        {step.description}
                      </CardDescription>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-24 bg-brand text-white">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <motion.div
              className="mx-auto max-w-2xl text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                {t("about.cta.title")}
              </h2>
              <p className="mt-4 text-lg leading-8 opacity-90">
                {t("about.cta.description")}
              </p>
              <div className="mt-10 flex items-center justify-center gap-4">
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
                  {t("about.cta.button")}
                </BlobButton>
                <Button asChild size="lg" className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-purple-600 font-semibold">
                  <Link href="/">
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    {t("cta.backToHome")}
                  </Link>
                </Button>
              </div>
            </motion.div>
          </div>
        </section>
      </main>
    </div>
  )
} 