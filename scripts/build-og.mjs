import { readFile, writeFile, mkdir } from 'node:fs/promises'
import sharp from 'sharp'

// Repo-native SVG composition of existing artwork; no remote font dependency.
const embed = async (file, mime) => `data:${mime};base64,${(await readFile(file)).toString('base64')}`
const logo = await embed('src/assets/logo-cream.png', 'image/png')
// librsvg does not decode embedded WebP on every platform; embed lossless PNG.
const embedArtwork = async file => `data:image/png;base64,${(await sharp(file).png().toBuffer()).toString('base64')}`
const monster = await embedArtwork('public/images/hero/monster-girl-site01.webp')
const bintu = await embedArtwork('public/images/hero/veridian-site02.webp')
const hearthleaf = await embedArtwork('public/images/hero/hearthleaf-background.webp')
const hearthleafLogo = await embedArtwork('public/images/hero/hearthleaf-foreground.webp')
const motif = (await readFile('exports/motifs/svg/pattern-diamond.svg', 'utf8')).replaceAll('#000000', '#fcf1d9')
const pattern = `data:image/svg+xml;base64,${Buffer.from(motif).toString('base64')}`
const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
<defs>
<clipPath id="hearthleaf-panel"><rect x="70" y="149" width="330" height="381" rx="27"/></clipPath>
<pattern id="weave" width="200" height="200" patternUnits="userSpaceOnUse"><image href="${pattern}" width="200" height="200"/></pattern>
<linearGradient id="leaf" x2="0" y2="1"><stop stop-color="#668e68"/><stop offset="1" stop-color="#25112f"/></linearGradient>
<linearGradient id="monster" x2="0" y2="1"><stop stop-color="#bb303d"/><stop offset="1" stop-color="#260c31"/></linearGradient>
<linearGradient id="veridian" x2="0" y2="1"><stop stop-color="#88a7f7"/><stop offset="1" stop-color="#251139"/></linearGradient>
</defs>
<rect width="1200" height="630" fill="#1a1a1a"/>
<rect width="1200" height="630" fill="url(#weave)" opacity=".045"/>
<image href="${logo}" x="52" y="27" width="65" height="61"/>
<text x="135" y="65" font-family="Arial, sans-serif" font-size="27" font-weight="700" letter-spacing="3" fill="#fcf1d9">OBRA KASI GAMES</text>
<text x="1148" y="62" text-anchor="end" font-family="Arial, sans-serif" font-size="19" fill="#b9b5ad">A Filipino game studio</text>
<rect x="70" y="149" width="330" height="381" rx="27" fill="url(#leaf)"/>
<image href="${hearthleaf}" x="70" y="149" width="330" height="381" preserveAspectRatio="xMidYMax slice" clip-path="url(#hearthleaf-panel)"/>
<rect x="435" y="149" width="330" height="381" rx="27" fill="url(#monster)"/>
<rect x="800" y="149" width="330" height="381" rx="27" fill="url(#veridian)"/>
<image href="${hearthleafLogo}" x="50" y="153" width="370" height="197" preserveAspectRatio="xMidYMid meet"/>
<image href="${monster}" x="460" y="118" width="280" height="385" preserveAspectRatio="xMidYMin meet"/>
<image href="${bintu}" x="778" y="112" width="374" height="330" preserveAspectRatio="xMidYMin meet"/>
<rect x="448" y="407" width="304" height="90" rx="12" fill="#260c31" fill-opacity=".90"/>
<text x="600" y="444" text-anchor="middle" font-family="Arial, sans-serif" font-size="31" font-weight="900" fill="#8df2e5">MONSTER GIRL</text>
<text x="600" y="478" text-anchor="middle" font-family="Arial, sans-serif" font-size="31" font-weight="900" fill="#8df2e5">TACTICS</text>
<text x="965" y="450" text-anchor="middle" font-family="Arial, sans-serif" font-size="18" letter-spacing="5" fill="#fcf1d9">STEPS TO</text>
<text x="965" y="493" text-anchor="middle" font-family="Georgia, serif" font-size="45" font-weight="700" fill="#bfdca1">Veridian</text>
<path d="M70 559H1130" stroke="#fcf1d9" stroke-opacity=".2"/>
<text x="70" y="600" font-family="Arial, sans-serif" font-size="20" fill="#fcf1d9">Games. Art. Stories from the studio.</text>
<text x="1130" y="600" text-anchor="end" font-family="Arial, sans-serif" font-size="20" fill="#fcf1d9">obrakasigames.com</text>
</svg>`
await mkdir('exports', { recursive: true })
await writeFile('exports/og-home-2026.svg', svg)
const info = await sharp(Buffer.from(svg)).jpeg({quality:85, mozjpeg:true}).toFile('public/og-home-2026.jpg')
console.log(`Social image: ${info.width} × ${info.height}, ${(info.size / 1024).toFixed(1)} KiB`)
