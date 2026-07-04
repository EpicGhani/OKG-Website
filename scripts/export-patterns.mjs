import { writeFileSync, mkdirSync } from 'node:fs'
import { resolve } from 'node:path'

const outDir = resolve('exports/motifs/svg')
mkdirSync(outDir, { recursive: true })

const COLOR = '#000000' // recolor: change this and re-run, or find-replace in the files
const S = 200

const wrap = (body) =>
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${S} ${S}">\n` +
  `<defs><clipPath id="clip"><rect width="${S}" height="${S}"/></clipPath></defs>\n` +
  `<g clip-path="url(#clip)">\n${body}\n</g>\n</svg>\n`

// diagonal/straight parallel stripes, baked as rects inside a rotate group
function stripes(spacing, thickness, angle) {
  const from = -160, to = 360
  let r = ''
  for (let x = from; x <= to; x += spacing) r += `<rect x="${x}" y="${from}" width="${thickness}" height="${to - from}" fill="${COLOR}"/>`
  return `<g transform="rotate(${angle} ${S / 2} ${S / 2})">${r}</g>`
}
const single = (sp, th, ang) => wrap(stripes(sp, th, ang))
const cross = (sp, th, a, b) => wrap(stripes(sp, th, a) + stripes(sp, th, b))

// axis-aligned tiled shapes, baked directly
function tile(w, h, shapeAt) {
  let s = ''
  for (let y = -h; y <= S; y += h) for (let x = -w; x <= S; x += w) s += shapeAt(x, y)
  return wrap(s)
}
// vertical full-height columns (bamboo)
function columns(step, shapeAt) {
  let s = ''
  for (let x = -step; x <= S; x += step) s += shapeAt(x)
  return wrap(s)
}

const patterns = {
  warp: single(9, 1.5, 0),
  ulan: single(10, 1.5, 60),
  sabit: cross(12, 1.4, 0, 90),
  weave: cross(11, 2, 45, -45),
  diamond: cross(16, 1.5, 45, -45),
  kawayan: columns(16, (x) => `<rect x="${x}" width="3" height="${S}" fill="${COLOR}"/><rect x="${x + 8}" width="1.5" height="${S}" fill="${COLOR}"/>`),
  butil: tile(13, 13, (x, y) => `<circle cx="${x + 6.5}" cy="${y + 6.5}" r="1.6" fill="${COLOR}"/>`),
  banig: tile(12, 12, (x, y) => `<rect x="${x}" y="${y}" width="6" height="6" fill="${COLOR}"/><rect x="${x + 6}" y="${y + 6}" width="6" height="6" fill="${COLOR}"/>`),
  stitch: tile(16, 10, (x, y) => `<rect x="${x}" y="${y + 4}" width="9" height="2" fill="${COLOR}"/>`),
  sawtooth: tile(20, 20, (x, y) => `<polygon points="${x + 10},${y + 3} ${x + 18},${y + 17} ${x + 2},${y + 17}" fill="${COLOR}"/>`),
  chevron: tile(22, 11, (x, y) => `<path d="M${x},${y + 9} L${x + 11},${y + 3} L${x + 22},${y + 9}" fill="none" stroke="${COLOR}" stroke-width="3"/>`),
  tnalak: tile(18, 16, (x, y) => `<polygon points="${x + 9},${y + 1} ${x + 17},${y + 15} ${x + 1},${y + 15}" fill="${COLOR}"/>`),
}

let n = 0
for (const [name, content] of Object.entries(patterns)) {
  writeFileSync(`${outDir}/pattern-${name}.svg`, content)
  n++
}
console.log(`✅ Wrote ${n} baked pattern SVGs → exports/motifs/svg/pattern-*.svg`)