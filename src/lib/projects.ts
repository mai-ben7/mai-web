export type Project = {
  slug: string;
  title: string;
  client: string;
  package: 'Basic' | 'Advanced';
  year: number;
  description: string;
  tags: string[]; // e.g., ['Next.js','Animations','R3F']
  coverType: 'image' | 'video' | 'lottie';
  coverSrc: string; // local /public or remote
  liveUrl?: string;
  caseStudyUrl?: string; // internal route
};

export const projects: Project[] = [
  {
    slug: 'nova-bakery',
    title: 'Nova Bakery',
    client: 'Nova',
    package: 'Basic',
    year: 2025,
    description: 'אתר תדמית מהיר ורספונסיבי עם עיצוב נקי וממיר.',
    tags: ['Next.js', 'Tailwind', 'SEO'],
    coverType: 'image',
    coverSrc: '/projects/nova-bakery.jpg',
    liveUrl: 'https://example.com',
    caseStudyUrl: '/case-studies/nova-bakery'
  },
  {
    slug: 'aero-studios',
    title: 'Aero Studios',
    client: 'Aero',
    package: 'Advanced',
    year: 2025,
    description: 'אתר אנימציות מתקדם כולל 3D קליל ופרלקסה חכמה.',
    tags: ['Next.js', 'Framer Motion', 'R3F', 'GSAP'],
    coverType: 'video',
    coverSrc: '/projects/aero-studios.mp4',
    liveUrl: 'https://example.com',
    caseStudyUrl: '/case-studies/aero-studios'
  },
  {
    slug: 'tech-startup',
    title: 'TechStart',
    client: 'TechCorp',
    package: 'Advanced',
    year: 2024,
    description: 'פלטפורמה דיגיטלית מתקדמת עם אנימציות מורכבות ואינטראקציות מתקדמות.',
    tags: ['Next.js', 'TypeScript', 'Three.js', 'WebGL'],
    coverType: 'lottie',
    coverSrc: '/projects/tech-startup.json',
    liveUrl: 'https://example.com',
    caseStudyUrl: '/case-studies/tech-startup'
  },
  {
    slug: 'local-restaurant',
    title: 'Taste of Home',
    client: 'HomeKitchen',
    package: 'Basic',
    year: 2024,
    description: 'אתר מסעדה רספונסיבי עם הזמנות אונליין ועיצוב חם ומזמין.',
    tags: ['Next.js', 'Tailwind', 'E-commerce'],
    coverType: 'image',
    coverSrc: '/projects/local-restaurant.jpg',
    liveUrl: 'https://example.com',
    caseStudyUrl: '/case-studies/local-restaurant'
  },
  {
    slug: 'creative-agency',
    title: 'CreativeFlow',
    client: 'FlowAgency',
    package: 'Advanced',
    year: 2024,
    description: 'אתר סוכנות יצירתית עם אנימציות מתקדמות וניסיון משתמש ייחודי.',
    tags: ['Next.js', 'Framer Motion', 'Canvas', 'WebGL'],
    coverType: 'video',
    coverSrc: '/projects/creative-agency.mp4',
    liveUrl: 'https://example.com',
    caseStudyUrl: '/case-studies/creative-agency'
  },
  {
    slug: 'fitness-center',
    title: 'FitLife',
    client: 'FitCorp',
    package: 'Basic',
    year: 2024,
    description: 'אתר מרכז כושר דינמי עם לוח זמנים והרשמה לחוגים.',
    tags: ['Next.js', 'Tailwind', 'CMS'],
    coverType: 'image',
    coverSrc: '/projects/fitness-center.jpg',
    liveUrl: 'https://example.com',
    caseStudyUrl: '/case-studies/fitness-center'
  },
  {
    slug: 'luxury-brand',
    title: 'LuxuryBrand',
    client: 'LuxCorp',
    package: 'Advanced',
    year: 2023,
    description: 'אתר מותג יוקרתי עם אנימציות מתקדמות וחווית משתמש פרימיום.',
    tags: ['Next.js', 'Three.js', 'GSAP', 'WebGL'],
    coverType: 'lottie',
    coverSrc: '/projects/luxury-brand.json',
    liveUrl: 'https://example.com',
    caseStudyUrl: '/case-studies/luxury-brand'
  },
  {
    slug: 'local-shop',
    title: 'LocalShop',
    client: 'ShopLocal',
    package: 'Basic',
    year: 2023,
    description: 'אתר חנות מקומית עם קטלוג מוצרים ועיצוב נקי ונגיש.',
    tags: ['Next.js', 'Tailwind', 'E-commerce'],
    coverType: 'image',
    coverSrc: '/projects/local-shop.jpg',
    liveUrl: 'https://example.com',
    caseStudyUrl: '/case-studies/local-shop'
  }
];

export const getProjectsByPackage = (packageType: 'Basic' | 'Advanced' | 'All') => {
  if (packageType === 'All') return projects;
  return projects.filter(project => project.package === packageType);
};

export const searchProjects = (query: string) => {
  const lowercaseQuery = query.toLowerCase();
  return projects.filter(project => 
    project.title.toLowerCase().includes(lowercaseQuery) ||
    project.client.toLowerCase().includes(lowercaseQuery) ||
    project.description.toLowerCase().includes(lowercaseQuery) ||
    project.tags.some(tag => tag.toLowerCase().includes(lowercaseQuery))
  );
};

export const sortProjects = (projects: Project[], sortBy: 'newest' | 'complex' | 'alphabetical') => {
  const sorted = [...projects];
  
  switch (sortBy) {
    case 'newest':
      return sorted.sort((a, b) => b.year - a.year);
    case 'complex':
      return sorted.sort((a, b) => {
        if (a.package === 'Advanced' && b.package === 'Basic') return -1;
        if (a.package === 'Basic' && b.package === 'Advanced') return 1;
        return b.year - a.year;
      });
    case 'alphabetical':
      return sorted.sort((a, b) => a.title.localeCompare(b.title));
    default:
      return sorted;
  }
};

