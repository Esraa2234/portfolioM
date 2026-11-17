
// Everything search engines and link previews see:
// Per-page titles, descriptions, canonical URLs, Open Graph,
// Twitter tags and JSON-LD structured data.

import { supportedLangs, translations } from './i18n/translations'
// import { projects, getProject, projectCopy } from './data/projects'
import { projects, getProject } from './data/projects'
import { profile } from './data/profile'

// مهم: استبدلي الرابط ده بالدومين الحقيقي للموقع قبل النشر.
export const SITE = 'https://YOUR-DOMAIN.com'

const locales = {
  ar: 'ar_EG',
  en: 'en_US',
}

const pages = ['', 'about', 'projects', 'skills', 'resume', 'contact']

// SEO content for every page in Arabic and English.
const copy = {
  home: {
    ar: [
      'محمود يسري | Front-End Developer',
      'محمود يسري، مطور واجهات أمامية Front-End Developer، يهتم ببناء مواقع ويب عصرية وسريعة ومتجاوبة مع مختلف الشاشات.',
    ],
    en: [
      'Mahmoud Yosary | Front-End Developer',
      'Mahmoud Yosary is a Front-End Developer focused on building modern, fast, and responsive web experiences.',
    ],
  },

  about: {
    ar: [
      'عن محمود يسري | Front-End Developer',
      'تعرّف على محمود يسري، مطور الواجهات الأمامية، ومهاراته وخبراته وتعليمه واهتماماته في تطوير الويب.',
    ],
    en: [
      'About Mahmoud Yosary | Front-End Developer',
      'Learn more about Mahmoud Yosary, a Front-End Developer, including his skills, experience, education, and approach to web development.',
    ],
  },

  projects: {
    ar: [
      'أعمال محمود يسري | مشاريع Front-End وتطوير الويب',
      'استعرض مجموعة من مشاريع محمود يسري في تطوير الواجهات الأمامية وتصميم تجارب ويب حديثة ومتجاوبة.',
    ],
    en: [
      'Mahmoud Yosary Portfolio | Front-End Projects',
      'Explore selected Front-End projects by Mahmoud Yosary, showcasing modern web interfaces and responsive user experiences.',
    ],
  },

  skills: {
    ar: [
      'مهارات محمود يسري | Front-End Development',
      'المهارات والتقنيات التي يستخدمها محمود يسري في تطوير واجهات الويب، وبناء مواقع تفاعلية ومتجاوبة.',
    ],
    en: [
      'Mahmoud Yosary Skills | Front-End Development',
      'Explore the web development skills and technologies used by Mahmoud Yosary to build interactive and responsive interfaces.',
    ],
  },

  resume: {
    ar: [
      'السيرة الذاتية | محمود يسري - Front-End Developer',
      'السيرة الذاتية لمحمود يسري، مطور واجهات أمامية، وتشمل المهارات والخبرات والتعليم والمشاريع.',
    ],
    en: [
      'Mahmoud Yosary CV | Front-End Developer',
      'View the CV of Mahmoud Yosary, Front-End Developer, including skills, experience, education, and selected projects.',
    ],
  },

  contact: {
    ar: [
      'تواصل مع محمود يسري | Front-End Developer',
      'تواصل مع محمود يسري لمناقشة فرص العمل أو التعاون أو تنفيذ مشاريع تطوير الواجهات الأمامية ومواقع الويب.',
    ],
    en: [
      'Contact Mahmoud Yosary | Front-End Developer',
      'Get in touch with Mahmoud Yosary about job opportunities, collaborations, or Front-End web development projects.',
    ],
  },
}

const crumbName = {
  home: {
    ar: 'الرئيسية',
    en: 'Home',
  },
}

// Generate the public URL for a route.
export function urlFor(lang, path = '') {
  return `${SITE}/${lang}/${path ? `${path}/` : ''}`
}

// Get all routes for prerendering.
export function allRoutes() {
  const paths = [
    ...pages,
    ...projects.map((p) => `projects/${p.slug}`),
  ]

  return supportedLangs.flatMap((lang) =>
    paths.map((path) => ({ lang, path }))
  )
}

// Limit description length for search engines.
function clip(text, max = 158) {
  const s = String(text).replace(/\s+/g, ' ').trim()

  if (s.length <= max) return s

  const cut = s.slice(0, max - 1)

  return `${cut.slice(0, cut.lastIndexOf(' '))}…`
}

// Name variations used in structured data and SEO.
export const nameVariants = [
  'محمود يسري',
  'Mahmoud Yosary',
  'محمود يسري مبرمج',
  'محمود يسري مطور واجهات أمامية',
  'محمود يسري مطور الواجهة الأمامية',
  'Mahmoud Yosary developer',
  'Mahmoud Yosary Front-End Developer',
  'Mahmoud Yosary frontend developer',
]

// Person structured data.
function person(lang) {
  return {
    '@type': 'Person',
    '@id': `${SITE}/#person`,

    name: profile.name[lang],
    alternateName: nameVariants,

    givenName: lang === 'ar' ? 'محمود' : 'Mahmoud',
    familyName: lang === 'ar' ? 'يسري' : 'Yosary',

    jobTitle: profile.role[lang],
    description: copy.home[lang][1],

    url: SITE,

    image: {
      '@type': 'ImageObject',
      url: `${SITE}${profile.photo}`,
      caption: profile.name[lang],
    },

    knowsAbout: [
      'Front-End Development',
      'Web Development',
      'Responsive Web Design',
      'HTML',
      'CSS',
      'JavaScript',
      'React',
      'User Interface Development',
    ],

    knowsLanguage: ['Arabic', 'English'],

    hasOccupation: {
      '@type': 'Occupation',
      name: 'Front-End Developer',
      skills:
        'Front-End Development, HTML, CSS, JavaScript, React, Responsive Web Design',
    },
  }
}

// Website structured data.
function website(lang) {
  return {
    '@type': 'WebSite',
    '@id': `${SITE}/#website`,
    url: `${SITE}/`,

    name: profile.name.en,
    alternateName: profile.name.ar,

    inLanguage: supportedLangs,

    publisher: {
      '@id': `${SITE}/#person`,
    },

    description: copy.home[lang][1],
  }
}

// Breadcrumb structured data.
function breadcrumbs(lang, items) {
  return {
    '@type': 'BreadcrumbList',

    itemListElement: [
      {
        name: crumbName.home[lang],
        url: urlFor(lang),
      },
      ...items,
    ].map((it, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: it.name,
      item: it.url,
    })),
  }
}

// Generate SEO metadata for one route.
export function routeMeta(lang, rawPath = '') {
  const path = rawPath.replace(/^\/+|\/+$/g, '')

  const t = translations[lang]
  const nav = t.nav

  const graph = [
    person(lang),
    website(lang),
  ]

  let title
  let description

  let image = `${SITE}/og/home-${lang}.jpg`
  let type = 'website'

  let noindex = false
  let known = true

  const slug = path.startsWith('projects/')
    ? path.slice('projects/'.length)
    : null

  const project = slug ? getProject(slug) : null

  // Individual project page.
  if (project) {
    // const c = projectCopy(project, lang)
    const c = {
  title: project.name,
  lead:
    typeof project.description === 'string'
      ? project.description
      : project.description?.[lang] || project.description?.en || '',
  overview:
    typeof project.description === 'string'
      ? project.description
      : project.description?.[lang] || project.description?.en || '',
  keywords: [],
}

    title = `${c.title} | ${t.brand}`
    description = clip(c.lead)

    image = `${SITE}/og/projects/${project.slug}.jpg`
    type = 'article'

    graph.push({
      '@type': 'CreativeWork',

      '@id': `${urlFor(lang, path)}#project`,

      name: c.title,
      alternateName: project.name || undefined,
      headline: c.title,

      description: clip(c.overview, 300),

      url: urlFor(lang, path),

      // image: [
      //   `${SITE}${project.cover}`,
      //   ...project.gallery.map((g) => `${SITE}${g}`),
      // ],

      image: [`${SITE}${project.cover}`],

      inLanguage: lang,

      genre: t.projects.categories[project.category],

      // keywords: [
      //   ...project.tech,
      //   ...(lang === 'ar' ? c.keywords || [] : []),
      // ].join(', '),

      keywords: [
  ...(project.tech || []),
  ...(lang === 'ar' ? c.keywords : []),
].join(', '),

      author: {
        '@id': `${SITE}/#person`,
      },

      creator: {
        '@id': `${SITE}/#person`,
      },

      isPartOf: {
        '@id': `${SITE}/#website`,
      },

      ...(project.live ? { sameAs: project.live } : {}),
    })

    graph.push(
      breadcrumbs(lang, [
        {
          name: nav.projects,
          url: urlFor(lang, 'projects'),
        },
        {
          name: c.title,
          url: urlFor(lang, path),
        },
      ])
    )
  }

  // Main website pages.
  else if (pages.includes(path)) {
    const key = path || 'home'

    ;[title, description] = copy[key][lang]

    // Projects listing page.
    if (path === 'projects') {
      graph.push({
        '@type': 'CollectionPage',

        '@id': `${urlFor(lang, path)}#page`,

        url: urlFor(lang, path),
        name: title,
        inLanguage: lang,

        mainEntity: {
          '@type': 'ItemList',

          itemListElement: projects.map((p, i) => ({
            '@type': 'ListItem',

            position: i + 1,

            url: urlFor(lang, `projects/${p.slug}`),

            name: p.name,
            // name: projectCopy(p, lang).title,
          })),
        },
      })
    }

    // About and CV pages.
    if (path === 'about' || path === 'resume') {
      graph.push({
        '@type': 'ProfilePage',

        '@id': `${urlFor(lang, path)}#page`,

        url: urlFor(lang, path),
        name: title,
        inLanguage: lang,

        mainEntity: {
          '@id': `${SITE}/#person`,
        },
      })
    }

    // Contact page.
    if (path === 'contact') {
      graph.push({
        '@type': 'ContactPage',

        url: urlFor(lang, path),
        name: title,
        inLanguage: lang,

        about: {
          '@id': `${SITE}/#person`,
        },
      })
    }

    if (path) {
      graph.push(
        breadcrumbs(lang, [
          {
            name: nav[path],
            url: urlFor(lang, path),
          },
        ])
      )
    }
  }

  // Unknown page.
  else {
    known = false
    noindex = true

    title = `${t.notFound.title} | ${t.brand}`
    description = t.notFound.body
  }

  // Language alternate URLs.
  const alternates = known
    ? [
        ...supportedLangs.map((l) => ({
          hreflang: l,
          href: urlFor(l, path),
        })),

        {
          hreflang: 'x-default',
          href: urlFor('en', path),
        },
      ]
    : []

  return {
    lang,
    dir: t.dir,

    title,
    description,

    canonical: known ? urlFor(lang, path) : null,

    alternates,

    image,
    imageAlt: title,

    type,
    noindex,

    locale: locales[lang],

    altLocales: supportedLangs
      .filter((l) => l !== lang)
      .map((l) => locales[l]),

    keywords: keywordsFor(lang),

    jsonLd: {
      '@context': 'https://schema.org',
      '@graph': graph,
    },
  }
}

// SEO keywords for each language.
function keywordsFor(lang) {
  const base = {
    ar: [
      'مطور واجهات أمامية',
      'مبرمج Front-End',
      'تطوير واجهات المستخدم',
      'تطوير مواقع الويب',
      'React',
      'JavaScript',
      'HTML',
      'CSS',
      'تصميم مواقع متجاوبة',
    ],

    en: [
      'front-end developer',
      'frontend developer',
      'React developer',
      'JavaScript developer',
      'HTML',
      'CSS',
      'responsive web design',
      'user interface development',
    ],
  }

  return [
    ...nameVariants,
    ...base[lang],
  ].join(', ')
}

// Escape HTML characters safely.
const esc = (s) =>
  String(s)
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')

// Generate HTML tags for the page head.
export function headTags(m) {
  const tags = [
    `<title>${esc(m.title)}</title>`,

    `<meta name="description" content="${esc(m.description)}" />`,

    `<meta name="robots" content="${
      m.noindex
        ? 'noindex, follow'
        : 'index, follow, max-image-preview:large, max-snippet:-1'
    }" />`,

    `<meta name="keywords" content="${esc(m.keywords)}" />`,
  ]

  if (m.canonical) {
    tags.push(
      `<link rel="canonical" href="${m.canonical}" />`
    )
  }

  for (const a of m.alternates) {
    tags.push(
      `<link rel="alternate" hreflang="${a.hreflang}" href="${a.href}" />`
    )
  }

  tags.push(
    `<meta property="og:type" content="${m.type}" />`,

    `<meta property="og:site_name" content="${esc(profile.name[m.lang])}" />`,

    `<meta property="og:title" content="${esc(m.title)}" />`,

    `<meta property="og:description" content="${esc(m.description)}" />`,

    `<meta property="og:locale" content="${m.locale}" />`,

    ...m.altLocales.map(
      (l) =>
        `<meta property="og:locale:alternate" content="${l}" />`
    ),

    `<meta property="og:image" content="${m.image}" />`,

    `<meta property="og:image:width" content="1200" />`,

    `<meta property="og:image:height" content="630" />`,

    `<meta property="og:image:alt" content="${esc(m.imageAlt)}" />`,

    `<meta name="twitter:card" content="summary_large_image" />`,

    `<meta name="twitter:title" content="${esc(m.title)}" />`,

    `<meta name="twitter:description" content="${esc(m.description)}" />`,

    `<meta name="twitter:image" content="${m.image}" />`
  )

  if (m.canonical) {
    tags.push(
      `<meta property="og:url" content="${m.canonical}" />`
    )
  }

  tags.push(
    `<script type="application/ld+json" id="ld-json">${
      JSON.stringify(m.jsonLd).replace(/</g, '\\u003c')
    }</script>`
  )

  return tags.join('\n    ')
}

// Update the document head after client-side navigation.
export function applyHead(m) {
  if (typeof document === 'undefined') return

  document.title = m.title

  const head = document.head

  function meta(attr, key, value) {
    let el = head.querySelector(
      `meta[${attr}="${key}"]`
    )

    if (!el) {
      el = document.createElement('meta')
      el.setAttribute(attr, key)
      head.appendChild(el)
    }

    el.setAttribute('content', value)
  }

  meta('name', 'description', m.description)

  meta(
    'name',
    'robots',
    m.noindex
      ? 'noindex, follow'
      : 'index, follow, max-image-preview:large, max-snippet:-1'
  )

  meta('property', 'og:title', m.title)
  meta('property', 'og:description', m.description)
  meta('property', 'og:type', m.type)
  meta('property', 'og:image', m.image)
  meta('property', 'og:locale', m.locale)

  meta('name', 'twitter:title', m.title)
  meta('name', 'twitter:description', m.description)
  meta('name', 'twitter:image', m.image)

  if (m.canonical) {
    meta('property', 'og:url', m.canonical)
  }

  // Canonical URL.
  let canonical = head.querySelector(
    'link[rel="canonical"]'
  )

  if (m.canonical) {
    if (!canonical) {
      canonical = document.createElement('link')
      canonical.rel = 'canonical'
      head.appendChild(canonical)
    }

    canonical.href = m.canonical
  } else {
    canonical?.remove()
  }

  // Alternate language links.
  head
    .querySelectorAll('link[rel="alternate"][hreflang]')
    .forEach((el) => el.remove())

  for (const a of m.alternates) {
    const el = document.createElement('link')

    el.rel = 'alternate'
    el.hreflang = a.hreflang
    el.href = a.href

    head.appendChild(el)
  }

  // Structured data.
  let ld = document.getElementById('ld-json')

  if (!ld) {
    ld = document.createElement('script')
    ld.type = 'application/ld+json'
    ld.id = 'ld-json'
    head.appendChild(ld)
  }

  ld.textContent = JSON.stringify(m.jsonLd)
}
