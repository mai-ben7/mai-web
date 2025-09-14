// data/services.ts
import type { ServiceCard } from "@/components/advanced/ServicesGrid";

export const SERVICES: ServiceCard[] = [
  {
    id: "seo",
    title: "SEO מתקדם ותוכן שמנצח",
    description: [
      "ארכיטקטורה וסכמות מתקדמות",
      "מחקר מילות מפתח מקצועי",
      "Schema.org ו-Lighthouse SEO ≥ 95",
      "מבנה URL נקי ומהירות טעינה"
    ],
    corner: "br",
    textSide: "right", // עיגול בפינה ימנית תחתונה, טקסט בצד ימין
    imageUrl:
      "/images/seo.png",
    accent: "#10b981" // emerald-500
  },
  {
    id: "design",
    title: "עיצוב מרהיב שמרגיש פרמיום",
    description: [
      "טיפוגרפיה מוקפדת וצבעוניות חכמה",
      "מיקרו-אינטראקציות שמוכרות",
      "Design system עקבי",
      "אנימציות עדינות וגישה דו-לשונית"
    ],
    corner: "bl",
    textSide: "left", // עיגול בפינה שמאלית תחתונה, טקסט בצד שמאל
    imageUrl:
      "/images/design.png",
    accent: "#8b5cf6" // violet-500
  },
  {
    id: "motion",
    title: "אנימציות ו-Scroll חכמים",
    description: [
      "אפקטים מתוזמנים שמספרים סיפור",
      "Framer Motion ו-Parallax עדין",
      "Reveal חלק ו-Reduced-motion נתמך",
      "אנימציות שממירות בלי להסיח"
    ],
    corner: "tr",
    textSide: "right", // עיגול בפינה ימנית עליונה, טקסט בצד ימין
    imageUrl:
      "/images/animation.png",
    accent: "#f59e0b" // amber-500
  },
  {
    id: "perf",
    title: "ביצועים ואינטגרציות מתקדמות",
    description: [
      "זמן טעינה מהיר ו-Lighthouse Performance ≥ 90",
      "next/image, SSR/SSG ו-Edge routing",
      "תשלומים: Stripe ואינטגרציות",
      "אנליטיקות: Meta Pixel, GA4 ו-CRM"
    ],
    corner: "tl",
    textSide: "left", // עיגול בפינה שמאלית עליונה, טקסט בצד שמאל
    imageUrl:
      "/images/performance.png",
    accent: "#06b6d4" // cyan-500
  }
];
