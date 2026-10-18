/** Keep feature cards scannable without modifying the stored article. */
export function shortExcerpt(text: string, maxLength = 260): string {
  const sentences = [...new Intl.Segmenter('en', { granularity: 'sentence' }).segment(text.trim())]
  const excerpt = sentences.slice(0, 2).map(({ segment }) => segment).join('').trim()
  if (excerpt.length <= maxLength) return excerpt
  const firstSentence = sentences[0]?.segment.trim() ?? ''
  if (firstSentence.length <= maxLength) return firstSentence
  const words = excerpt.slice(0, maxLength + 1)
  const boundary = words.lastIndexOf(' ')
  return `${words.slice(0, boundary > 0 ? boundary : maxLength).replace(/[.,;:!?]+$/, '')}…`
}
