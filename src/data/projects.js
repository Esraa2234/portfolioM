// Portfolio projects. The list, order, categories and images mirror
// houshiva.ir/portfolio, minus a few projects left out on purpose
// (café, digital menu, clothing store, barber landing page, label printing,
// modem line tools). Copy lives in projects.{fa,en,de}.js,
// keyed by slug, so editing text never means touching this file. `name` is
// the English product name houshiva shows under the Persian title (if any).



export const categories = ['all', 'website', 'software', 'management-system', 'dashboard']

const img = (name) => `/portfolio/${name}.webp`




export const projects = [

{
  slug: 'movies-website',
  category: 'website',
  name: 'Movies Website',
  description: {
    en: 'A movie website where users can explore movies, browse different categories, and discover details about available films.',
    ar: 'موقع للأفلام يتيح للمستخدمين استكشاف الأفلام وتصفح التصنيفات المختلفة والتعرف على تفاصيل الأعمال السينمائية.',
  },
  featured: true,
  cover: '/images/movfix.png',
  live: 'https://mahmoud125y.github.io/Dark-team-1/',
  tech: [],
},
  {
    slug: 'electronics-store',
    category: 'website',
    name: 'Electronics Store',
    description: {
      en: 'An online electronics shopping platform where users can explore electronic products and browse different categories.',
      ar: 'متجر إلكتروني متخصص في المنتجات الإلكترونية، يتيح للمستخدمين استكشاف المنتجات وتصفح الأقسام المختلفة.',
    },
    featured: true,
    cover: '/images/Mshoponline.png',
    live: 'https://mahmoud125y.github.io/Online-Shop/#',
    tech: [],
  },

  {
    slug: 'ecommerce-website',
    category: 'website',
    name: 'E-Commerce Website',
    description: {
      en: 'A modern e-commerce website where users can browse products, explore different categories, and enjoy a smooth online shopping experience.',
      ar: 'موقع تجارة إلكترونية يتيح للمستخدمين تصفح المنتجات واستكشاف الأقسام المختلفة والاستمتاع بتجربة تسوق سهلة.',
    },
    featured: true,
    cover: '/images/projecteccomerce.png',
    live: 'https://mahmoud125y.github.io/bravo/index.html',
    tech: [],
  },
  {
    slug: 'graphic-design-portfolio',
    category: 'website',
    name: 'Graphic Design Portfolio',
    description: {
      en: 'A creative portfolio website showcasing graphic design projects, visual identity, and creative work through a clean and modern layout.',
      ar: 'موقع بورتفوليو إبداعي لعرض أعمال التصميم الجرافيكي والهويات البصرية والمشاريع الفنية بتصميم عصري.',
    },
    featured: false,
    cover:'/images/portfolioclient.png',
    live: 'https://mahmoud125y.github.io/portfolio-1/',
    tech: [],
  },
  {
    slug: 'bughunt',
    category: 'software',
    name: 'BugHunt',
    description: {
      en: 'An interactive platform designed to help developers identify, analyze, and fix coding errors.',
      ar: 'منصة تفاعلية تساعد المطورين على اكتشاف أخطاء الأكواد وتحليلها والعمل على تصحيحها.',
    },
    featured: false,
    cover: '/images/bughuntt.png',
    live: 'https://mahmoud125y.github.io/Dark-team-7/',
    tech: [],
  },

];

// Localized copy for one project; falls back to English, then Persian.
export function projectCopy(project, lang) {
  return copy[lang]?.[project.slug] ?? copy.en[project.slug] ?? copy.fa[project.slug]
}

export function getProject(slug) {
  return projects.find((p) => p.slug === slug)
}

// Same-category projects first, then the rest, excluding the current one.
export function relatedProjects(project, count = 3) {
  const others = projects.filter((p) => p.slug !== project.slug)
  const same = others.filter((p) => p.category === project.category)
  const rest = others.filter((p) => p.category !== project.category)
  return [...same, ...rest].slice(0, count)
}

// ===============================================================================

