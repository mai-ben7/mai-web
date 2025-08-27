// data/advanced.ts
export type Capability = {
  id: string;
  label: string;      // short tag e.g., "SEO"
  title: string;      // card title
  blurb: string;      // 1–2 lines
  bullets: string[];  // 3–6 bullet points
};

export const CAPABILITIES: Capability[] = [
  {
    id: "seo",
    label: "SEO",
    title: "SEO מתקדם ותוכן שמנצח",
    blurb: "ארכיטקטורה, סכמות, מהירות וקופי—כדי שתופיעי גבוה ותמירי טוב.",
    bullets: [
      "מחקר מילות מפתח + מיפוי כוונות חיפוש",
      "Schema.org (Course, Product, FAQ) + Open Graph",
      "מבנה URL נקי, סייטמאפ ורובוטס",
      "Lighthouse SEO ≥ 95 + Core Web Vitals ירוקים",
      "אסטרטגיית תוכן + חיבורים ל-GA4 ו-Search Console"
    ]
  },
  {
    id: "design",
    label: "Design",
    title: "עיצוב מרהיב שמרגיש פרמיום",
    blurb: "טיפוגרפיה מוקפדת, צבעוניות חכמה ומיקרו-אינטראקציות שמוכרות.",
    bullets: [
      "Design system עקבי: צבעים, רדיוסים, צללים",
      "אנימציות עדינות שמדגישות פעולות",
      "Grid מודרני + עומק (glow/grain מינון נכון)",
      "גישה דו-לשונית RTL/LTR"
    ]
  },
  {
    id: "motion",
    label: "Motion",
    title: "אנימציות ואפקטי גלילה מתקדמים",
    blurb: "אפקטים מתוזמנים שמספרים סיפור—בלי להסיח, כן להמיר.",
    bullets: [
      "Framer Motion / GSAP + ScrollTrigger",
      "Parallax עדין, Reveal חלק, Magnetic CTAs",
      "השהיה חכמה מחוץ ל-viewport",
      "Reduced-motion נתמך"
    ]
  },
  {
    id: "perf",
    label: "Performance",
    title: "ביצועים ו-Core Web Vitals",
    blurb: "זמן טעינה מהיר, ציונים גבוהים, ועומסים מחושבים.",
    bullets: [
      "next/image, preconnect לפונטים, קבצים דינמיים",
      "SSR/SSG בהתאם לצורך, Edge/Node routing",
      "Lighthouse Performance ≥ 90"
    ]
  },
  {
    id: "a11y",
    label: "A11y",
    title: "נגישות תקנית ומקצועית",
    blurb: "ניווט במקלדת, ARIA, קונטרסט, ופוקוס ברור—לכולם.",
    bullets: [
      "ARIA roles נכונים",
      "קונטרסט AA לפחות",
      "תמיכה מלאה ב-מקלדת",
      "בדיקות Axe/Lighthouse"
    ]
  },
  {
    id: "integrations",
    label: "Integrations",
    title: "אינטגרציות עסקיות",
    blurb: "תשלומים, אנליטיקות, טפסים, מערכת לקוחות ועוד.",
    bullets: [
      "Stripe, Meta Pixel, GA4",
      "מערכת טפסים + CRM",
      "אוטומציות אימייל/ווב-הוקים",
      "דשבורד ניהול בסיסי"
    ]
  }
];
