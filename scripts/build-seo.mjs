import { readFile, writeFile, mkdir } from 'node:fs/promises'
import { publicPages, siteOrigin } from '../src/data/siteSeo.mjs'

const shell = await readFile('dist/index.html', 'utf8')
const escape = value => value.replaceAll('&', '&amp;').replaceAll('"', '&quot;').replaceAll('<', '&lt;').replaceAll('>', '&gt;')
for (const [route, page] of Object.entries(publicPages)) {
  let html = shell.replace(/<title>.*?<\/title>/, `<title>${escape(page.title)}</title>`)
  for (const name of ['description', 'og:description', 'twitter:description']) {
    html = html.replace(new RegExp(`(<meta (?:name|property)="${name}" content=")[^"]*`), `$1${escape(page.description)}`)
  }
  for (const name of ['og:title', 'twitter:title']) html = html.replace(new RegExp(`(<meta (?:name|property)="${name}" content=")[^"]*`), `$1${escape(page.title)}`)
  const url = siteOrigin + route
  html = html.replace(/(<link rel="canonical" href=")[^"]*/, `$1${url}`).replace(/(<meta property="og:url" content=")[^"]*/, `$1${url}`)
  const dir = route === '/' ? 'dist' : `dist${route}`
  await mkdir(dir, {recursive:true})
  await writeFile(`${dir}/index.html`, html)
}
await writeFile('dist/sitemap.xml', `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${Object.keys(publicPages).map(route=>`  <url><loc>${siteOrigin}${route}</loc></url>`).join('\n')}\n</urlset>\n`)
console.log(`Generated metadata for ${Object.keys(publicPages).length} public routes and sitemap.xml`)
