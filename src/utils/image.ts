/**
 * Client-side image preparation for cover uploads.
 *
 * A phone photo is 4–8 MB; Vercel caps function request bodies at 4.5 MB and a
 * 4 MB image on the blog is indefensible anyway. Downscaling to 1600px wide and
 * encoding WebP q82 lands around 150–250 KB — roughly a 30× reduction — before
 * the bytes ever leave the browser.
 */

const MAX_INPUT_BYTES = 25 * 1024 * 1024;
const MAX_WIDTH = 1600;
const QUALITY = 0.82;

export interface CompressedImage {
  /** Base64 payload, no `data:` prefix. */
  data: string;
  /** MIME type actually produced (webp, or jpeg on older browsers). */
  type: string;
  /** Object URL for the local preview. */
  previewUrl: string;
  /** Encoded size in bytes, for the "saved 96%" line. */
  bytes: number;
}

export async function compressImage(file: File): Promise<CompressedImage> {
  if (!file.type.startsWith('image/')) {
    throw new Error('That file is not an image.');
  }
  if (file.size > MAX_INPUT_BYTES) {
    throw new Error('That image is larger than 25 MB. Pick a smaller one.');
  }

  // createImageBitmap applies EXIF orientation, so sideways phone shots
  // come out upright without extra handling.
  const bitmap = await createImageBitmap(file);
  const scale = Math.min(1, MAX_WIDTH / bitmap.width);
  const width = Math.max(1, Math.round(bitmap.width * scale));
  const height = Math.max(1, Math.round(bitmap.height * scale));

  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;

  const context = canvas.getContext('2d');
  if (!context) {
    bitmap.close();
    throw new Error('This browser could not process the image.');
  }

  context.drawImage(bitmap, 0, 0, width, height);
  bitmap.close();

  let blob = await toBlob(canvas, 'image/webp', QUALITY);
  if (!blob || blob.type !== 'image/webp') {
    blob = await toBlob(canvas, 'image/jpeg', 0.85);
  }
  if (!blob) {
    throw new Error('This browser could not encode the image.');
  }

  return {
    data: await blobToBase64(blob),
    type: blob.type,
    previewUrl: URL.createObjectURL(blob),
    bytes: blob.size,
  };
}

function toBlob(
  canvas: HTMLCanvasElement,
  type: string,
  quality: number,
): Promise<Blob | null> {
  return new Promise((resolve) => canvas.toBlob(resolve, type, quality));
}

async function blobToBase64(blob: Blob): Promise<string> {
  const bytes = new Uint8Array(await blob.arrayBuffer());
  let binary = '';

  // Chunked to stay clear of the argument limit on String.fromCharCode.
  const chunkSize = 0x8000;
  for (let index = 0; index < bytes.length; index += chunkSize) {
    binary += String.fromCharCode(...bytes.subarray(index, index + chunkSize));
  }

  return btoa(binary);
}

export function formatBytes(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${Math.round(bytes / 1024)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}
