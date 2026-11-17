
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const dist = path.join(root, 'dist')

const ssr = await import(
  pathToFileURL(path.join(root, 'dist-ssr', 'entry-server.js')).href
)

const { render, allRoutes, routeMeta, headTags, urlFor, SITE, projects } = ssr

const languages = ['ar', 'en']
const defaultLang = 'ar'

const template = fs.readFileSync(
  path.join(dist, 'index.html'),
  'utf8'
)

if (
  !template.includes('<!--app-head-->') ||
  !template.includes('<!--app-html-->')
) {
  throw new Error('index.html is missing the required SSR markers')
}

function page(url, meta, extraHead = '') {
  const html = render(url)

  return template
    .replace(
      /<html lang="[^"]*" dir="[^"]*"/,
      `<html lang="${meta.lang}" dir="${meta.dir}"`
    )
    .replace('<!--app-head-->', headTags(meta) + extraHead)
    .replace('<!--app-html-->', html)
}

function write(rel, content) {
  const file = path.join(dist, rel)
  fs.mkdirSync(path.dirname(file), { recursive: true })
  fs.writeFileSync(file, content)
}

function absoluteUrl(src) {
  if (!src) return ''
  return `${SITE.replace(/\/$/, '')}/${src.replace(/^\//, '')}`
}

// Generate all language pages.
const routes = allRoutes()

for (const { lang, path: routePath } of routes) {
  if (!languages.includes(lang)) continue

  const url = `/${lang}/${routePath ? `${routePath}/` : ''}`
  const meta = routeMeta(lang, routePath)

  write(
    path.join(lang, routePath, 'index.html'),
    page(url, meta)
  )
}

// Generate the 404 page.
write(
  '404.html',
  page('/ar/404/', routeMeta('ar', '__not-found__'))
)

// Root redirect to Arabic home page.
const alternates = languages
  .map(
    (lang) =>
      `<link rel="alternate" hreflang="${lang}" href="${urlFor(lang)}" />`
  )
  .join('\n    ')

write(
  'index.html',
  `<!doctype html>
<html lang="ar" dir="rtl">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />

    <title>Mahmoud Yosry | Frontend Developer</title>

    <meta
      name="description"
      content="Mahmoud Yosry - Frontend Developer building responsive and user-focused web interfaces."
    />

    <link rel="canonical" href="${urlFor(defaultLang)}" />
    ${alternates}
    <link rel="alternate" hreflang="x-default" href="${urlFor(defaultLang)}" />

    <link rel="icon" type="image/jpeg" href="/1.jpeg" />

    <meta http-equiv="refresh" content="0; url=/ar/" />

    <script>
      location.replace('/ar/' + location.search + location.hash)
    </script>

    <style>
      body {
        background: #0b0b0d;
        color: #f3f1ec;
        font-family: system-ui, sans-serif;
        display: grid;
        place-items: center;
        min-height: 100vh;
        margin: 0;
      }

      a {
        color: #05d1c1;
      }
    </style>
  </head>

  <body>
    <a href="/ar/">Mahmoud Yosry - Frontend Developer</a>
  </body>
</html>
`
)

// Generate sitemap.
const today = new Date().toISOString().slice(0, 10)

const urls = routes
  .filter(({ lang }) => languages.includes(lang))
  .map(({ lang, path: routePath }) => {
    const alternates = languages
      .map(
        (language) =>
          `    <xhtml:link rel="alternate" hreflang="${language}" href="${urlFor(language, routePath)}"/>`
      )
      .concat(
        `    <xhtml:link rel="alternate" hreflang="x-default" href="${urlFor(defaultLang, routePath)}"/>`
      )
      .join('\n')

    const isProjectsPage = routePath === 'projects'

    const projectImages = isProjectsPage
      ? projects
          .map(
            (project) =>
              `    <image:image><image:loc>${absoluteUrl(project.cover)}</image:loc></image:image>`
          )
          .join('\n')
      : ''

    const priority =
      routePath === '' ? '1.0' :
      isProjectsPage ? '0.9' :
      '0.7'

    return `  <url>
    <loc>${urlFor(lang, routePath)}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${routePath === '' || isProjectsPage ? 'weekly' : 'monthly'}</changefreq>
    <priority>${priority}</priority>
${alternates}
${projectImages}
  </url>`
  })

write(
  'sitemap.xml',
  `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
${urls.join('\n')}
</urlset>
`
)

console.log(
  `Prerendered ${routes.length} routes for Arabic and English + 404.html, root redirect and sitemap.xml`
)
