import { FEATURED, ALL_PROJECTS } from "@/data/projects";
import ProjectsHero from "@/components/projects/ProjectsHero";
import ProjectsGrid from "@/components/projects/ProjectsGrid";
import EnableSectionParallax from "@/components/parallax/EnableSectionParallax";

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