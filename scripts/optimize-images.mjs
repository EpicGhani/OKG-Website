import sharp from 'sharp'
import { mkdir, readdir, stat, writeFile } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const args = process.argv.slice(2)
const option = (name) => args.includes(name) ? args[args.indexOf(name) + 1] : undefined
const source = option('--source')
if (!source) throw new Error('Usage: npm run assets:optimize -- --source "path/to/OKG Assets"')

const names = {
  '726380494_1477109990399599_5019169875700181769_n.png': 'monster-girl-lineup',
  'Tayog_BleedingRingRedux.png': 'tayog-bleeding-ring',
  'Tayog_HourglassFinal.png': 'tayog-hourglass',
  'Tayog_Mandrake.png': 'tayog-mandrake',
  'Tayog_Masquerade.png': 'tayog-masquerade',
  'Tayog_Pendant.png': 'tayog-pendant',
  'Tayog_Potion.png': 'tayog-potion',
  'Tayog_Sabre.png': 'tayog-sabre',
  'Tayog_SampaguitaBurning.png': 'tayog-sampaguita-burning',
  'Tayog_Shield.png': 'tayog-shield',
  'Tayog_SkyBowl.png': 'tayog-sky-bowl',
}
const responsive = new Set(['bintu', 'porcelanum', 'tayog-mandrake', 'tayog-hourglass'])
const report = []

async function convert(input, output, { width, height, lossless = false, variant = false } = {}) {
  const destination = path.join(root, output)
  await mkdir(path.dirname(destination), { recursive: true })
  const info = await sharp(input, { animated: true })
    .autoOrient()
    .resize({ width, height, fit: 'inside', withoutEnlargement: true })
    .webp({ quality: 86, alphaQuality: 100, lossless, effort: 6, smartSubsample: true })
    .toFile(destination)
  const originalBytes = (await stat(input)).size
  const row = { source: path.basename(input), output, width: info.width, height: info.height, originalBytes, bytes: info.size, variant }
  report.push(row)
  console.log(`${output}: ${info.width}x${info.height}, ${(info.size / 1024).toFixed(1)} KB`)
}

for (const entry of await readdir(source, { withFileTypes: true })) {
  if (!entry.isFile() || !/\.(png|jpe?g|gif|webp)$/i.test(entry.name)) continue
  const name = names[entry.name] ?? path.parse(entry.name).name.toLowerCase().replace(/[^a-z0-9]+/g, '-')
  const input = path.join(source, entry.name)
  const illustration = name.startsWith('tayog-')
  await convert(input, `public/images/library/${name}.webp`, { width: illustration ? 960 : 1000, height: 1400, lossless: name === 'monster-girl-lineup' })
  if (responsive.has(name)) await convert(input, `public/images/library/${name}-480.webp`, { width: 480, height: 900, variant: true })
}

await convert(path.join(root, 'src/assets/logo-cream.png'), 'src/assets/logo-cream.webp', { width: 160, height: 150, lossless: true })
await convert(path.join(root, 'public/logo.png'), 'public/logo.webp', { width: 96, height: 96, lossless: true })

// User-approved deterministic extraction: preserve the source's colored pixels.
// The first character is isolated in the leftmost 512 pixels of this sheet.
const sheet = path.join(source, '726380494_1477109990399599_5019169875700181769_n.png')
const sheetInfo = await sharp(sheet).metadata()
if (sheetInfo.width !== 2048 || sheetInfo.height !== 727) throw new Error('Character sheet dimensions changed; review the crop before extracting.')
const { data, info } = await sharp(sheet).extract({ left: 0, top: 0, width: 512, height: 727 }).ensureAlpha().raw().toBuffer({ resolveWithObject: true })
let left = info.width, top = info.height, right = 0, bottom = 0
for (let y = 0; y < info.height; y++) {
  for (let x = 0; x < info.width; x++) {
    const i = (y * info.width + x) * 4
    // The sheet's white matte includes near-white compression blocks.
    // Only remove the neutral matte; retained artwork RGB values stay intact.
    const minimum = Math.min(data[i], data[i + 1], data[i + 2])
    const maximum = Math.max(data[i], data[i + 1], data[i + 2])
    if (minimum >= 235 && maximum - minimum <= 5) data[i + 3] = 0
  }
}
// Trim one matte-contaminated edge pixel without repainting retained pixels.
const matteMask = Buffer.from(data)
for (let y = 1; y < info.height - 1; y++) {
  for (let x = 1; x < info.width - 1; x++) {
    const i = (y * info.width + x) * 4
    if (!data[i + 3]) continue
    const touchesMatte = [-1, 0, 1].some(dy => [-1, 0, 1].some(dx => matteMask[((y + dy) * info.width + x + dx) * 4 + 3] === 0))
    if (touchesMatte) { data[i + 3] = 0; continue }
    left = Math.min(left, x); top = Math.min(top, y); right = Math.max(right, x); bottom = Math.max(bottom, y)
  }
}
if (left > right) throw new Error('No character pixels found')
left = Math.max(0, left - 4); top = Math.max(0, top - 4)
const crop = { left, top, width: Math.min(info.width, right + 5) - left, height: Math.min(info.height, bottom + 5) - top }
const cutoutOutput = 'public/images/hero/monster-girl-foreground.webp'
await mkdir(path.dirname(path.join(root, cutoutOutput)), { recursive: true })
const cutoutInfo = await sharp(data, { raw: { width: info.width, height: info.height, channels: 4 } }).extract(crop).webp({ lossless: true, effort: 6 }).toFile(path.join(root, cutoutOutput))
report.push({ source: path.basename(sheet), output: cutoutOutput, width: cutoutInfo.width, height: cutoutInfo.height, originalBytes: (await stat(sheet)).size, bytes: cutoutInfo.size, variant: true, crop, extraction: 'Original retained RGB pixels; neutral white matte removed (minimum RGB 235, maximum channel difference 5), one-pixel matte edge trimmed; lossless WebP' })

await writeFile(path.join(root, 'public/images/asset-manifest.json'), JSON.stringify(report, null, 2) + '\n')
const originals = report.filter((item) => !item.variant).reduce((sum, item) => sum + item.originalBytes, 0)
const optimized = report.reduce((sum, item) => sum + item.bytes, 0)
console.log(`Originals: ${(originals / 1048576).toFixed(2)} MB; WebP including responsive variants: ${(optimized / 1048576).toFixed(2)} MB; ${(100 - optimized / originals * 100).toFixed(1)}% smaller.`)
