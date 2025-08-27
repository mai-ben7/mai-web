// data/services.ts
import type { ServiceCard } from "@/components/advanced/ServicesGrid";

export const SERVICES: ServiceCard[] = [
  {
    id: "seo",
    title: "SEO מתקדם ותוכן שמנצח",
    description:
      "ארכיטקטורה, סכמות, מהירות וקופי—כדי שתופיעי גבוה ותמירי טוב. מחקר מילות מפתח, Schema.org, מבנה URL נקי ו-Lighthouse SEO ≥ 95.",
    corner: "br",
    textSide: "right", // עיגול בפינה ימנית תחתונה, טקסט בצד ימין
    imageUrl:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1600&auto=format&fit=crop",
    accent: "#10b981" // emerald-500
  },
  {
    id: "design",
    title: "עיצוב מרהיב שמרגיש פרמיום",
    description:
      "טיפוגרפיה מוקפדת, צבעוניות חכמה ומיקרו-אינטראקציות שמוכרות. Design system עקבי עם אנימציות עדינות וגישה דו-לשונית.",
    corner: "bl",
    textSide: "left", // עיגול בפינה שמאלית תחתונה, טקסט בצד שמאל
    imageUrl:
      "https://images.unsplash.com/photo-1587440871875-191322ee64b0?q=80&w=1600&auto=format&fit=crop",
    accent: "#8b5cf6" // violet-500
  },
  {
    id: "motion",
    title: "אנימציות ו-Scroll חכמים",
    description:
      "אפקטים מתוזמנים שמספרים סיפור—בלי להסיח, כן להמיר. Framer Motion, Parallax עדין, Reveal חלק ו-Reduced-motion נתמך.",
    corner: "tr",
    textSide: "right", // עיגול בפינה ימנית עליונה, טקסט בצד ימין
    imageUrl:
      "https://images.unsplash.com/photo-1499951360447-b19be8fe80f5?q=80&w=1600&auto=format&fit=crop",
    accent: "#f59e0b" // amber-500
  },
  {
    id: "perf",
    title: "ביצועים ואינטגרציות מתקדמות",
    description:
      "זמן טעינה מהיר, ציונים גבוהים, ועומסים מחושבים. next/image, SSR/SSG, Edge routing ו-Lighthouse Performance ≥ 90. תשלומים, אנליטיקות, טפסים, מערכת לקוחות ועוד. Stripe, Meta Pixel, GA4, מערכת טפסים + CRM ואוטומציות אימייל.",
    corner: "tl",
    textSide: "left", // עיגול בפינה שמאלית עליונה, טקסט בצד שמאל
    imageUrl:
      "https://images.unsplash.com/photo-1557804506-669a67965ba0?q=80&w=1600&auto=format&fit=crop",
    accent: "#06b6d4" // cyan-500
  }
];
