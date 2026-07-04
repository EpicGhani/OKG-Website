import { readFileSync, writeFileSync, mkdirSync } from 'node:fs'
import { resolve } from 'node:path'

const cssPath = resolve('src/styles/ds/tokens/markings.css')
const outDir = resolve('exports/motifs')
mkdirSync(`${outDir}/svg`, { recursive: true })

const css = readFileSync(cssPath, 'utf8')
const re = /\.ok-(mark|band)-([a-z0-9]+)\s*\{[^}]*?mask-image:\s*url\("data:image\/svg\+xml,([^"]+)"\)/gi

const found = []
let m
while ((m = re.exec(css))) {
  const [, kind, name, enc] = m
  let svg = decodeURIComponent(enc)
  // make it recolorable: fixed black -> currentColor, default color black
  svg = svg
    .replace(/(fill|stroke)=(['"])%23000\2/g, '$1=$2currentColor$2')
    .replace(/(fill|stroke)=(['"])#000\2/g, '$1=$2currentColor$2')
    .replace('<svg ', "<svg color='#000' ")
  const file = `${kind}-${name}.svg`
  writeFileSync(`${outDir}/svg/${file}`, svg)
  found.push(file)
}
console.log(`✅ Extracted ${found.length} SVGs → exports/motifs/svg/`)

// Optional: also rasterize to transparent PNGs if `sharp` is installed
try {
  const sharp = (await import('sharp')).default
  mkdirSync(`${outDir}/png`, { recursive: true })
  for (const file of found) {
    const buf = readFileSync(`${outDir}/svg/${file}`)
    await sharp(buf, { density: 384 }).resize({ width: 1024 }).png().toFile(`${outDir}/png/${file.replace('.svg', '.png')}`)
  }
  console.log(`✅ Also wrote ${found.length} PNGs (1024px wide, transparent) → exports/motifs/png/`)
} catch {
  console.log('ℹ️  PNG step skipped. For PNGs: `npm i -D sharp` then re-run. (SVGs work everywhere and recolor easily.)')
}