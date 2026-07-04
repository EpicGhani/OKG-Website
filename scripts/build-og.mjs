import { readFileSync, writeFileSync, mkdirSync } from 'node:fs'
import { resolve } from 'node:path'

mkdirSync(resolve('exports'), { recursive: true })
const logoHref = `data:image/png;base64,${readFileSync(resolve('src/assets/logo-cream.png')).toString('base64')}`
const rays = [0, 45, 90, 135, 180, 225, 270, 315].map((a) => `<polygon points="-6,-28 6,-28 0,-48" transform="rotate(${a})"/>`).join('')

const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 630" width="1200" height="630">
<defs>
<style>@import url('https://fonts.googleapis.com/css2?family=Hanken+Grotesque:wght@300;600&amp;family=Space+Mono:wght@400;700&amp;family=Young+Serif&amp;display=swap');</style>
<clipPath id="card"><rect x="140" y="95" width="920" height="440" rx="22"/></clipPath>
</defs>
<rect width="1200" height="630" fill="#fcf1d9"/>
<g transform="translate(1112 84) scale(1.8)" fill="#e69a9a" opacity="0.5"><circle r="24"/>${rays}</g>
<g transform="translate(96 566) scale(1.15)" fill="#a3c2b1" opacity="0.55"><circle r="24"/>${rays}</g>
<rect x="154" y="109" width="920" height="440" rx="22" fill="#1a1a1a"/>
<rect x="140" y="95" width="920" height="440" rx="22" fill="#fffdf7" stroke="#1a1a1a" stroke-width="3"/>
<g clip-path="url(#card)"><rect x="140" y="95" width="920" height="92" fill="#141312"/><rect x="140" y="185" width="920" height="4" fill="#8b0000"/></g>
<image href="${logoHref}" x="446" y="113" width="60" height="56" preserveAspectRatio="xMidYMid meet"/>
<text x="516" y="150" font-family="'Space Mono', monospace" font-size="22" font-weight="700" letter-spacing="3" fill="#fcf1d9">OBRA KASI GAMES</text>
<text x="600" y="292" text-anchor="middle" font-family="'Young Serif', Georgia, serif" font-size="76" fill="#1a1a1a" letter-spacing="-1">Laro nang malaya.</text>
<path d="M486,332 L500,322 L514,332 L528,322 L542,332 L556,322 L570,332 L584,322 L598,332 L612,322 L626,332 L640,322 L654,332 L668,322 L682,332 L696,322 L710,332 L714,329" fill="none" stroke="#8b0000" stroke-width="3" opacity="0.7"/>
<text x="600" y="378" text-anchor="middle" font-family="'Hanken Grotesque', system-ui, sans-serif" font-size="22" font-weight="300" fill="#5e574e">Rooted games from the islands \u2014 a Filipino studio in Manila.</text>
<rect x="470" y="415" width="260" height="58" rx="12" fill="#8b0000"/>
<rect x="466" y="411" width="260" height="58" rx="12" fill="#1a1a1a"/>
<text x="596" y="448" text-anchor="middle" font-family="'Hanken Grotesque', system-ui, sans-serif" font-size="21" font-weight="600" fill="#fcf1d9">See the games \u2192</text>
<text x="600" y="512" text-anchor="middle" font-family="'Space Mono', monospace" font-size="16" font-weight="700" letter-spacing="4" fill="#8b0000">OBRAKASIGAMES.COM</text>
</svg>
`

writeFileSync(resolve('exports/og-image.svg'), svg)
console.log('✅ Wrote exports/og-image.svg (logo embedded) — open it, export a 1200×630 PNG.')