# Studio updates artwork

The supplied transparent Porcelanum artwork is configured in
`src/data/studioUpdates.ts`, using `/images/library/porcelanum.webp` and a
480px responsive variant. Update both `characterImage` and `characterSrcSet`
when replacing it. Preserve breathing room around hands, weapons, and effects.

The image is decorative, anchored to the bottom of the content band, and may
extend above and beside its column. Keep the subject centered. The abstract
placeholder disappears when the path is configured. No character art is generated.

The latest four published articles/devlogs use the existing ArticleCard and
DevlogCard components, including their CMS images, woven patterns, accents,
and stamp shadows. The featured ArticleCard uses its horizontal layout.
The latest story stays featured; every card links directly to its detail page.
The three smaller cards omit excerpts, tags, author names, and kickers. Devlogs
retain their existing entry numbers; articles have no number field.
The featured article shows up to two sentences, with a 260-character limit.
The footer's Art label is plain text until a dedicated gallery is available.
Existing Kalinga, okir, gayaman, sun, bituin, and binakol motifs decorate the
section. The warm ink gradient is confined to the character column.
Section typography is enlarged through scoped CSS variables, so other card
instances retain their existing sizes. The section is at least one viewport
tall and grows with its content; cards stack on mobile.

Project organization: section components live in `src/sections`, their styles
in `src/styles/sections`, and content configuration/data hooks in `src/data`.
