/** APNG is left untouched so an upload never silently loses its animation. */
export function isAnimatedPng(bytes: Uint8Array): boolean {
  const signature = [137, 80, 78, 71, 13, 10, 26, 10]
  if (!signature.every((value, index) => bytes[index] === value)) return false
  const view = new DataView(bytes.buffer, bytes.byteOffset, bytes.byteLength)
  for (let offset = 8; offset + 12 <= bytes.length;) {
    const length = view.getUint32(offset)
    if (length > bytes.length - offset - 12) return false
    const type = String.fromCharCode(...bytes.subarray(offset + 4, offset + 8))
    if (type === 'acTL') return true
    if (type === 'IDAT' || type === 'IEND') return false
    offset += length + 12
  }
  return false
}

/** Convert new static PNG/JPEG uploads before they reach storage. */
export async function prepareImageUpload(file: File): Promise<File> {
  if (!['image/png', 'image/jpeg'].includes(file.type)) return file
  if (file.type === 'image/png' && isAnimatedPng(new Uint8Array(await file.arrayBuffer()))) return file

  const bitmap = await createImageBitmap(file)
  try {
    const scale = Math.min(1, 2400 / Math.max(bitmap.width, bitmap.height))
    const canvas = document.createElement('canvas')
    canvas.width = Math.max(1, Math.round(bitmap.width * scale))
    canvas.height = Math.max(1, Math.round(bitmap.height * scale))
    const context = canvas.getContext('2d', { alpha: true })
    if (!context) throw new Error('Image conversion is unavailable in this browser.')
    context.imageSmoothingQuality = 'high'
    context.drawImage(bitmap, 0, 0, canvas.width, canvas.height)
    const blob = await new Promise<Blob>((resolve, reject) => canvas.toBlob((result) => {
      if (result) resolve(result)
      else reject(new Error('Could not optimize this image. Please try another file.'))
    }, 'image/webp', 0.86))
    if (blob.type !== 'image/webp') throw new Error('This browser cannot create WebP images. Please upload a WebP file directly.')
    const name = `${file.name.replace(/\.[^.]+$/, '')}.webp`
    return new File([blob], name, { type: 'image/webp', lastModified: file.lastModified })
  } finally {
    bitmap.close()
  }
}
