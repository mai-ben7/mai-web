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
    slug: 'fitmama-pregnancy-fitness',
    title: 'FitMama - כושר בהריון',
    client: 'מיכל טננבאום',
    package: 'Advanced',
    year: 2025,
    description: 'אתר מקצועי למומחית בכושר לנשים בהריון עם עיצוב מותאם אישית, אנימציות מתקדמות ומערכת הזמנות.',
    tags: ['Next.js', 'Framer Motion', 'Tailwind', 'RTL', 'Hebrew'],
    coverType: 'image',
    coverSrc: '/projects/fitmama-pregnancy-fitness.png',
    liveUrl: 'https://personal-trainer-for-pregnancy.vercel.app/',
    caseStudyUrl: '/case-studies/fitmama-pregnancy-fitness'
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

