import { Metadata } from "next"
import { ProjectsClient } from "@/components/ProjectsClient"

export const metadata: Metadata = {
  title: "פרויקטים - mai web",
  description: "גלריית הפרויקטים של mai web - אתרים חיים שמזיזים אנשים. צפו בעבודות שלנו כולל אתרי תדמית, אנימציות מתקדמות ופתרונות דיגיטליים.",
  keywords: ["פרויקטים", "פורטפוליו", "אתרים", "עיצוב", "אנימציות", "Next.js", "React"],
  openGraph: {
    title: "פרויקטים - mai web",
    description: "גלריית הפרויקטים של mai web - אתרים חיים שמזיזים אנשים",
    type: "website",
    locale: "he_IL",
  },
  twitter: {
    card: "summary_large_image",
    title: "פרויקטים - mai web",
    description: "גלריית הפרויקטים של mai web - אתרים חיים שמזיזים אנשים",
  },
}

export default function ProjectsPage() {
  return <ProjectsClient />
} 