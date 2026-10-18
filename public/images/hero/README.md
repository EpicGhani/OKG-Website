# Landing banner assets

Current foregrounds: Monster Girl uses `monster-girl-foreground.webp`, extracted
losslessly from the supplied character sheet; Steps to Veridian uses
`/images/library/bintu.webp` with a 480px variant. Hearthleaf still uses the
temporary composition. Current art is fitted without cropping; the alignment
guide below is for future purpose-designed banner exports.

Configure paths in `src/data/heroGames.ts`; `null` shows the temporary CSS
composition. Each banner links to its configured `path`, with a temporary
game-specific coming-soon page. No CMS rows are created. When a game is ready
in the CMS, remove its temporary route from `App.tsx` so `/games/:slug` handles it.

| Game | Background filename | Foreground filename |
| --- | --- | --- |
| Hearthleaf Corner | hearthleaf-background.webp | hearthleaf-foreground.webp |
| Monster Girl Tactics | monster-girl-background.webp | monster-girl-foreground.webp |
| Steps to Veridian | veridian-background.webp | veridian-foreground.webp |

## Export alignment

- Background: **780 x 1320 px**, opaque WebP/JPG. Artwork fills the panel and
  clips at the corners. Do not bake rounded corners into the image.
- Foreground: **936 x 1452 px**, transparent WebP/PNG. Keep the full canvas;
  do not trim transparent margins. This layer is never clipped by the panel.
- On the foreground canvas, the panel occupies **x = 78 to 858**,
  **y = 92.4 to 1412.4**. Use this as a non-exporting alignment guide.
  Bleed: 78 px on each side, 92.4 px above, and 39.6 px below the panel.
- Hearthleaf: the sign/logo extends across the panel edges.
- Monster Girl: the character/head extends above the panel.
- Veridian: the creature/hands extend across the panel edges.
- If the foreground includes the final title and subtitle, set
  `foregroundIncludesTitle: true`. This visually hides the HTML wordmark but
  preserves its accessible heading. Otherwise the HTML title stays on top.
- Keep critical artwork above the panel's bottom 14%, reserved for status.

Example paths: `/images/hero/hearthleaf-background.webp` and
`/images/hero/hearthleaf-foreground.webp`. Desktop has three columns; mobile
stacks the same compositions without changing their aspect ratios.
Hover and keyboard focus lift the background 8 px and foreground 26 px;
the temporary HTML title moves with the foreground. Reduced motion disables
these transforms. Keep transparent export margins for the rising artwork.

Confirm the final spelling with the team: the mockup reads “Viridian,” while
the request uses “Veridian.” The configuration currently follows the request.
