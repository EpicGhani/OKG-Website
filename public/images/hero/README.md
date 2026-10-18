# Landing banner assets

Banner content is now configured in **Admin → Games** and stored in the games
table. Apply `supabase/migrations/20261019_game_banners.sql` before deploying.
See `docs/game-banners.md` for the migration and editing workflow.

Current foregrounds: Monster Girl uses `monster-girl-site01.webp`; Steps to
Veridian uses `veridian-site02.webp`. Both come from the updated transparent
artist exports and include `-small.webp` mobile variants. Regenerate with
`node scripts/import-banner-art.mjs "D:\Project Assets\OKG Assets"`.
Hearthleaf uses the supplied
bakery background and transparent sign, exported losslessly to WebP. The alignment
guide below is for future purpose-designed banner exports.

Configure layers in the admin game form; missing art shows the existing patterned
composition. Each banner links to `/games/{slug}`. Use the game-page checkbox in
the form to switch from coming soon to the full page without changing routes.

| Game | Background filename | Foreground filename |
| --- | --- | --- |
| Hearthleaf Corner | hearthleaf-background.webp | hearthleaf-foreground.webp |
| Monster Girl Tactics | CSS gradient | monster-girl-site01.webp |
| Steps to Veridian | CSS gradient | veridian-site02.webp |

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
  the “Front image already includes the game title” checkbox. This hides the HTML wordmark but
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
