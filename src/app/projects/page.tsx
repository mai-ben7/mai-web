import { Metadata } from "next"
import { motion } from "framer-motion"
import Link from "next/link"
import { ArrowLeft, ExternalLink } from "lucide-react"

import { Header } from "@/components/Header"
import { Footer } from "@/components/Footer"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { fadeInUp, staggerContainer } from "@/lib/animations"
import projectsData from "@/content/projects.json"

export const metadata: Metadata = {
  title: "פרויקטים - mai web",
  description: "גלריית הפרויקטים שלנו - אתרים מרהיבים עם אנימציות מתקדמות.",
}

export default function ProjectsPage() {
  const categories = Array.from(new Set(projectsData.map(project => project.category)))

  return (
    <div>
      <Header />
      
      <main className="pt-24">
        {/* Hero Section */}
        <section className="py-24 bg-bg-soft">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <motion.div
              className="mx-auto max-w-2xl text-center"
              variants={fadeInUp}
              initial="initial"
              animate="animate"
            >
              <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-6xl">
                הפרויקטים שלנו
              </h1>
              <p className="mt-6 text-lg leading-8 text-muted-foreground">
                גלריית עבודות מרשימה שמדגימה את היכולות שלנו בבניית אתרים חיים שמזיזים אנשים
              </p>
            </motion.div>
          </div>
        </section>

        {/* Projects Grid */}
        <section className="py-24">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <motion.div
              className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3"
              variants={staggerContainer}
              initial="initial"
              animate="animate"
            >
              {projectsData.map((project, index) => (
                <motion.div key={project.id} variants={fadeInUp}>
                  <Card className="h-full group hover:shadow-lg transition-all duration-300">
                    <div className="aspect-video bg-gradient-to-br from-brand/10 to-accent/10 rounded-t-lg flex items-center justify-center">
                      <div className="text-4xl font-bold text-brand opacity-20">
                        {project.title.charAt(0)}
                      </div>
                    </div>
                    
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-xl">{project.title}</CardTitle>
                        <span className="text-xs bg-brand/10 text-brand px-2 py-1 rounded-full">
                          {project.category}
                        </span>
                      </div>
                      <CardDescription className="text-base">
                        {project.summary}
                      </CardDescription>
                    </CardHeader>
                    
                    <CardContent className="space-y-4">
                      <div className="flex flex-wrap gap-2">
                        {project.tags.slice(0, 3).map((tag, tagIndex) => (
                          <span
                            key={tagIndex}
                            className="text-xs bg-muted px-2 py-1 rounded"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="text-sm text-muted-foreground">
                          {project.duration} • {project.budget}
                        </div>
                        <Button asChild size="sm" variant="outline">
                          <Link href={`/projects/${project.slug}`}>
                            צפו בפרויקט
                            <ExternalLink className="mr-2 h-3 w-3" />
                          </Link>
                        </Button>
                      </div>
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
                מוכנים לפרויקט הבא שלכם?
              </h2>
              <p className="mt-4 text-lg leading-8 opacity-90">
                בואו נבנה יחד אתר שיזיז אנשים ויביא תוצאות אמיתיות לעסק שלכם.
              </p>
              <div className="mt-10 flex items-center justify-center gap-4">
                <Button asChild size="lg" variant="secondary">
                  <Link href="/contact">
                    קבעו ייעוץ חינם
                  </Link>
                </Button>
                <Button asChild size="lg" variant="outline">
                  <Link href="/">
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    חזרה לדף הבית
                  </Link>
                </Button>
              </div>
            </motion.div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  )
} 