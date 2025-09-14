// data/services.ts
import type { ServiceCard } from "@/components/advanced/ServicesGrid";

export const SERVICES: ServiceCard[] = [
  {
    id: "seo",
    title: "services.seo.title",
    description: [
      "services.seo.points.0",
      "services.seo.points.1",
      "services.seo.points.2",
      "services.seo.points.3"
    ],
    corner: "br",
    textSide: "right", // עיגול בפינה ימנית תחתונה, טקסט בצד ימין
    imageUrl:
      "/images/seo.png",
    accent: "#10b981" // emerald-500
  },
  {
    id: "design",
    title: "services.design.title",
    description: [
      "services.design.points.0",
      "services.design.points.1",
      "services.design.points.2",
      "services.design.points.3"
    ],
    corner: "bl",
    textSide: "left", // עיגול בפינה שמאלית תחתונה, טקסט בצד שמאל
    imageUrl:
      "/images/design.png",
    accent: "#8b5cf6" // violet-500
  },
  {
    id: "motion",
    title: "services.motion.title",
    description: [
      "services.motion.points.0",
      "services.motion.points.1",
      "services.motion.points.2",
      "services.motion.points.3"
    ],
    corner: "tr",
    textSide: "right", // עיגול בפינה ימנית עליונה, טקסט בצד ימין
    imageUrl:
      "/images/animation.png",
    accent: "#f59e0b" // amber-500
  },
  {
    id: "perf",
    title: "services.performance.title",
    description: [
      "services.performance.points.0",
      "services.performance.points.1",
      "services.performance.points.2",
      "services.performance.points.3"
    ],
    corner: "tl",
    textSide: "left", // עיגול בפינה שמאלית עליונה, טקסט בצד שמאל
    imageUrl:
      "/images/performance.png",
    accent: "#06b6d4" // cyan-500
  }
];
