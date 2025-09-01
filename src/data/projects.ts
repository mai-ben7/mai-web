export type Project = {
  id: string;
  title: string;            // human-friendly name
  oneLiner: string;         // value in plain language
  cover: string;            // "/images/projects/xyz.jpg" (in /public)
  outcomes?: string[];      // ["+32% more signups", "Faster load time"]
  role?: string;            // "Design & Development"
  year?: string;
  href?: string;            // case-study link
  tags?: string[];          // ["eCommerce", "Animation", "SEO"]
  accent?: string;          // optional CSS color like "#11D6C4"
};

export const FEATURED: Project[] = [
  {
    id: "fitmama",
    title: "FitMama Pregnancy Fitness",
    oneLiner: "אתר כושר להריון עם חווית משתמש מותאמת לנשים בהריון.",
    cover: "/projects/fitmama-pregnancy-fitness.png",
    outcomes: ["עיצוב מותאם להריון", "ממשק ידידותי", "תוכן מקצועי"],
    role: "עיצוב + פיתוח",
    year: "2024",
    href: "/projects/fitmama",
    tags: ["Fitness", "Health", "Women"],
    accent: "#FF6B9D",
  },
  {
    id: "tal-portfolio",
    title: "טל בן שבע - פורטפוליו",
    oneLiner: "פורטפוליו אישי עם עיצוב מודרני ואנימציות מתקדמות.",
    cover: "/projects/tal-ben-sheva-portfolio.png",
    outcomes: ["עיצוב ייחודי", "אנימציות מתקדמות", "חוויית משתמש מעולה"],
    role: "עיצוב + פיתוח",
    year: "2024",
    href: "/projects/tal-portfolio",
    tags: ["Portfolio", "Animation", "Modern Design"],
    accent: "#6366F1",
  },
];

export const ALL_PROJECTS: Project[] = [
  ...FEATURED,
  {
    id: "placeholder",
    title: "פרויקט נוסף",
    oneLiner: "פרויקט נוסף שיתווסף בקרוב.",
    cover: "/projects/placeholder.svg",
    outcomes: ["בקרוב"],
    role: "עיצוב + פיתוח",
    year: "2024",
    tags: ["Coming Soon"],
  },
];
