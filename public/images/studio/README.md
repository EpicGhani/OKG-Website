# Studio artwork

The About Us / Work With Us section uses the supplied Mandrake and Hourglass
illustrations from `../library/`, with 480px responsive variants. Update
`studioArtwork.roots.image` / `srcSet` and `studioArtwork.compass.image` /
`srcSet` in `src/data/studio.ts` to replace them. Null images restore the icons.

- Suggested exports: 4:3 WebP or PNG, around 1200 × 900 px. Existing square
  illustrations also fit without cropping. Panels are capped at 340 px wide
  on desktop and 280 px on smaller screens.
- Transparent images keep the existing green/blue glow behind the artwork.
- Full illustrations also work; `object-fit: contain` preserves the complete image.
- Images are decorative alongside the studio copy. Keep essential text in HTML.
- Contact email and the four future support URLs are configured in the same file.
- A null support URL displays a disabled “Coming soon” option.
