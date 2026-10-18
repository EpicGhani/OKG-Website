export const MAX_IMAGE_BYTES = 10 * 1024 * 1024
export const IMAGE_UPLOAD_ACCEPT = 'image/png,image/jpeg,image/webp,image/gif,image/avif'

/** Reject active documents and spoofed file types before upload. Bucket rules enforce size/MIME server-side. */
export async function validateImageUpload(file: File): Promise<void> {
  if (file.size === 0 || file.size > MAX_IMAGE_BYTES) throw new Error('Choose an image smaller than 10 MB.')
  if (!IMAGE_UPLOAD_ACCEPT.split(',').includes(file.type)) throw new Error('Use a PNG, JPG, WebP, GIF, or AVIF image. SVG uploads are not supported.')
  const bytes = new Uint8Array(await file.slice(0, 64).arrayBuffer())
  const ascii = (start: number, end: number) => String.fromCharCode(...bytes.subarray(start, end))
  const valid = file.type === 'image/png' ? [137,80,78,71,13,10,26,10].every((n, i) => bytes[i] === n)
    : file.type === 'image/jpeg' ? bytes[0] === 255 && bytes[1] === 216 && bytes[2] === 255
    : file.type === 'image/webp' ? ascii(0,4) === 'RIFF' && ascii(8,12) === 'WEBP'
    : file.type === 'image/gif' ? ['GIF87a','GIF89a'].includes(ascii(0,6))
    : ascii(4,8) === 'ftyp' && [8,16,20,24,28,32,36,40,44,48,52,56,60].some(i => ['avif','avis'].includes(ascii(i,i+4)))
  if (!valid) throw new Error('The file contents do not match its image type.')
}
