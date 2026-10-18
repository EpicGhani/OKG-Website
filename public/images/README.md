# Website images

The supplied `OKG Assets` artwork is exported to `library/` as WebP. Original
source files are never modified. `asset-manifest.json` records sizes, dimensions,
source names, and the Monster Girl crop coordinates.

Initial library export: **17.60 MiB of originals → 1.32 MiB**, including responsive
variants and the extracted character (about **92.5% smaller**). This compares
image files, not total page transfer size. Unused library art is not loaded by
the homepage.

| Placement | Artwork | Configuration |
| --- | --- | --- |
| Monster Girl Tactics banner | site01.png → hero/monster-girl-site01.webp | Admin → Games |
| Steps to Veridian banner | site02.png → hero/veridian-site02.webp | Admin → Games |
| N.D.A. character | Porcelanum | `src/data/studioUpdates.ts` |
| About us | Tayog Mandrake | `src/data/studio.ts` |
| Work with us | Tayog Hourglass | `src/data/studio.ts` |

Hearthleaf artwork was subsequently imported from the CafeGame artist folder;
see `docs/game-banners.md`. Updated `site01.png` / `site02.png` character art is
exported separately by `scripts/import-banner-art.mjs`, with a manifest in
`hero/banner-art-manifest.json`. Other final game logos and merch photography still
use their existing temporary compositions. Other supplied illustrations are
available in `library/` for future use.

## Regeneration

From the repository root:

```powershell
npm run assets:optimize -- --source "D:\Project Assets\OKG Assets"
```

The script uses Sharp (development dependency only): quality 86, lossless alpha,
no upscaling, and 480px variants for the four larger images currently displayed.
Logos and the Monster Girl cutout use lossless WebP. The cutout removes the
neutral white matte and one contaminated edge pixel; all retained RGB pixels
are unchanged. It is extracted directly from the original sheet without AI
redrawing. The fixed crop is guarded against unexpected sheet dimensions.

SVG motifs stay vector. Original logo PNGs remain as sources; the current
social-sharing image is `og-home-2026.jpg`, rebuilt by `npm run assets:social`.
Neither original logo PNG is loaded in the UI.

New admin PNG/JPEG uploads are converted to WebP before storage, with a 2400px
maximum long edge and no upscaling. Transparent PNGs retain transparency;
animated PNG/GIF and existing WebP uploads are preserved. New uploads accept
PNG/JPEG/WebP/GIF/AVIF up to 10 MiB; SVG uploads are rejected for security (the
repository's vector motifs remain unchanged). Existing remote
content is not rewritten. Browser regression checks can be run at
`/tests/image-upload.html` on the Vite development server; they send no uploads
and are excluded from the production build.
