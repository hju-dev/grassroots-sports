import sharp from 'sharp';

// Vercel rejects request bodies over 4.5 MB before our code runs, so the limit
// we can honestly enforce is a little under that. The dashboard shrinks big
// phone photos in the browser first, so this is only a backstop.
export const IMAGE_MAX_BYTES = 4 * 1024 * 1024;

// Longest side we keep. Plenty for a full-width website photo, and keeps
// files small so pages load fast.
const MAX_DIMENSION = 2400;

export type EncodedImage = { webp: Buffer; width: number; height: number };

// Don't trust the browser-reported MIME type: the image library is the source of
// truth. Every upload is decoded, orientation-corrected, resized and re-encoded
// as WebP. Re-encoding also strips EXIF metadata (including GPS location), which
// matters for photos of children.
export async function encodeUpload(formData: FormData, logTag: string): Promise<EncodedImage | { error: string }> {
  const file = formData.get('file');
  if (!(file instanceof File) || file.size === 0) return { error: 'No file selected.' };
  if (file.size > IMAGE_MAX_BYTES) return { error: 'That photo is too large. Please use one under 4 MB.' };

  try {
    const input = Buffer.from(await file.arrayBuffer());
    const { data, info } = await sharp(input)
      .rotate()
      .resize({ width: MAX_DIMENSION, height: MAX_DIMENSION, fit: 'inside', withoutEnlargement: true })
      .webp({ quality: 85 })
      .toBuffer({ resolveWithObject: true });
    return { webp: data, width: info.width, height: info.height };
  } catch (err) {
    console.error(`[${logTag}]`, err);
    return { error: "Couldn't read that image file. Try a JPG, PNG, or WEBP photo." };
  }
}
