export const studioContact = { email: 'business@obrakasigames.com' }

/** Replace the decorative placeholders with the final studio artwork. */
export const studioArtwork: Record<'roots' | 'compass', { image: string | null; srcSet?: string; icon: string; band: string }> = {
  roots: { image: '/images/library/tayog-mandrake.webp', srcSet: '/images/library/tayog-mandrake-480.webp 480w, /images/library/tayog-mandrake.webp 960w', icon: 'sprout', band: 'kalinga' },
  compass: { image: '/images/library/tayog-hourglass.webp', srcSet: '/images/library/tayog-hourglass-480.webp 480w, /images/library/tayog-hourglass.webp 960w', icon: 'compass', band: 'okir' },
}

/** Only add verified studio support destinations; null keeps the option disabled. */
export const studioSupport: { name: string; icon: string; url: string | null }[] = [
  { name: 'Patreon', icon: 'heart', url: null },
  { name: 'Ko-fi', icon: 'coffee', url: null },
  { name: 'PayPal', icon: 'wallet', url: null },
  { name: 'GCash', icon: 'smartphone', url: null },
]
