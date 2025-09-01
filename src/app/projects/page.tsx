import { Metadata } from "next"
import { FEATURED, ALL_PROJECTS } from "@/data/projects";
import ProjectsHero from "@/components/projects/ProjectsHero";
import ProjectsGrid from "@/components/projects/ProjectsGrid";
import EnableSectionParallax from "@/components/parallax/EnableSectionParallax";

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
  return (
    <main dir="rtl">
      <EnableSectionParallax />
      {/* Search bar removed */}
      <ProjectsHero featured={FEATURED} />
      <ProjectsGrid items={ALL_PROJECTS} />
    </main>
  );
} 