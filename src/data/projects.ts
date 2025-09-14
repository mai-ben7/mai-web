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
    title: "projects.fitmama.title",
    oneLiner: "projects.fitmama.oneLiner",
    cover: "/projects/fitmama-pregnancy-fitness.png",
    outcomes: ["projects.fitmama.outcomes.0", "projects.fitmama.outcomes.1", "projects.fitmama.outcomes.2"],
    role: "projects.role",
    year: "2024",
    href: "/projects/fitmama",
    tags: ["Fitness", "Health", "Women"],
    accent: "#FF6B9D",
  },
  {
    id: "tal-portfolio",
    title: "projects.talPortfolio.title",
    oneLiner: "projects.talPortfolio.oneLiner",
    cover: "/projects/tal-ben-sheva-portfolio.png",
    outcomes: ["projects.talPortfolio.outcomes.0", "projects.talPortfolio.outcomes.1", "projects.talPortfolio.outcomes.2"],
    role: "projects.role",
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
    title: "projects.placeholder.title",
    oneLiner: "projects.placeholder.oneLiner",
    cover: "/projects/placeholder.svg",
    outcomes: ["projects.placeholder.outcomes.0"],
    role: "projects.role",
    year: "2024",
    tags: ["Coming Soon"],
  },
];
