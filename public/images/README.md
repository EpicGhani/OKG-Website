# Website images

The supplied `OKG Assets` artwork is exported to `library/` as WebP. Original
source files are never modified. `asset-manifest.json` records sizes, dimensions,
source names, and the Monster Girl crop coordinates.

Current export: **17.60 MiB of originals → 1.32 MiB**, including responsive
variants and the extracted character (about **92.5% smaller**). This compares
image files, not total page transfer size. Unused library art is not loaded by
the homepage.

| Placement | Artwork | Configuration |
| --- | --- | --- |
| Monster Girl Tactics banner | First character from supplied sheet | `src/data/heroGames.ts` |
| Steps to Veridian banner | Bintu | `src/data/heroGames.ts` |
| N.D.A. character | Porcelanum | `src/data/studioUpdates.ts` |
| About us | Tayog Mandrake | `src/data/studio.ts` |
| Work with us | Tayog Hourglass | `src/data/studio.ts` |

Hearthleaf artwork, final game logos, and merch photography were not included;
their existing temporary compositions remain. Other supplied illustrations are
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

SVG motifs stay vector. Original logo PNGs remain as sources, and `og-image.png`
remains the social-sharing image. Neither original logo PNG is loaded in the UI.

New admin PNG/JPEG uploads are converted to WebP before storage, with a 2400px
maximum long edge and no upscaling. Transparent PNGs retain transparency;
animated PNG/GIF and existing WebP uploads are preserved. New uploads accept
PNG/JPEG/WebP/GIF/AVIF up to 10 MiB; SVG uploads are rejected for security (the
repository's vector motifs remain unchanged). Existing remote
content is not rewritten. Browser regression checks can be run at
`/tests/image-upload.html` on the Vite development server; they send no uploads
and are excluded from the production build.
