/*
 * Photo pipeline: turns curated shots from the raw photo library into
 * web-ready assets. Run from the repo root:
 *
 *   node scripts/process-photos.mjs ["/path/to/AUAG Photos"]
 *
 * Curation lives in scripts/curation.json. Roles:
 *   hero     → public/photos/<slug>-{1600,2400}.{webp,jpg}, full frame
 *   section  → public/photos/<slug>-{800,1600}.{webp,jpg}, full frame
 *   headshot → public/team/pending/<slug>.jpg (640×800 attention crop) + -320
 *
 * .rotate() is mandatory: 71 of the 178 shoot files store portrait frames
 * sideways with only an EXIF orientation flag. TREATMENT bakes the site's
 * ink-B&W editorial look into the pixels (cheaper than CSS filters and
 * unifies the shoot's mixed fluorescent lighting).
 */
import sharp from 'sharp';
import { mkdir, readFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const TREATMENT = 'mono'; // 'mono' | 'color'
const WEBP_QUALITY = 78;
const JPEG_QUALITY = 80;

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const curation = JSON.parse(
  await readFile(path.join(repoRoot, 'scripts/curation.json'), 'utf8'),
);
const sourceDir = path.resolve(
  repoRoot,
  process.argv[2] ?? curation.sourceDir,
);
const photosDir = path.join(repoRoot, 'public/photos');
const teamDir = path.join(repoRoot, 'public/team/pending');
await mkdir(photosDir, { recursive: true });
await mkdir(teamDir, { recursive: true });

const kb = (n) => `${Math.round(n / 1024)}KB`;

function treated(img) {
  // Gentle contrast lift so the grayscale doesn't go muddy on office light.
  return TREATMENT === 'mono' ? img.grayscale().linear(1.06, -8) : img;
}

const manifest = [];

for (const photo of curation.photos) {
  const srcPath = path.join(sourceDir, photo.src);
  const base = sharp(srcPath).rotate(); // EXIF auto-orient FIRST
  const meta = await base.metadata();
  // .rotate() swaps dimensions for EXIF-rotated frames; metadata() reports
  // the post-orientation size when autoOrient is in the pipeline.
  const { width: srcW, height: srcH } = await base
    .clone()
    .toBuffer()
    .then((b) => sharp(b).metadata());

  if (photo.role === 'headshot') {
    for (const [w, h, suffix] of [
      [640, 800, ''],
      [320, 400, '-320'],
    ]) {
      const out = path.join(teamDir, `${photo.slug}${suffix}.jpg`);
      const info = await treated(base.clone())
        .resize(w, h, { fit: 'cover', position: 'attention' })
        .jpeg({ quality: JPEG_QUALITY, mozjpeg: true })
        .toFile(out);
      console.log(`${photo.slug}${suffix}.jpg  ${w}×${h}  ${kb(info.size)}`);
    }
    continue;
  }

  const widths = photo.role === 'hero' ? [1600, 2400] : [800, 1600];
  const dims = {};
  for (const w of widths) {
    for (const fmt of ['webp', 'jpg']) {
      const out = path.join(photosDir, `${photo.slug}-${w}.${fmt}`);
      let img = treated(base.clone()).resize({
        width: w,
        withoutEnlargement: true,
      });
      img =
        fmt === 'webp'
          ? img.webp({ quality: WEBP_QUALITY })
          : img.jpeg({ quality: JPEG_QUALITY, mozjpeg: true });
      const info = await img.toFile(out);
      dims[w] = { width: info.width, height: info.height };
      console.log(
        `${photo.slug}-${w}.${fmt}  ${info.width}×${info.height}  ${kb(info.size)}`,
      );
    }
  }
  manifest.push({
    id: photo.slug,
    base: `/photos/${photo.slug}`,
    widths,
    width: srcW ?? meta.width,
    height: srcH ?? meta.height,
    alt: photo.alt,
  });
}

// 128px neutral grain tile for the .photo-frame texture overlay.
const noise = Buffer.alloc(128 * 128);
let seed = 42;
for (let i = 0; i < noise.length; i++) {
  // xorshift — deterministic so re-runs don't dirty the repo.
  seed ^= seed << 13;
  seed ^= seed >>> 17;
  seed ^= seed << 5;
  noise[i] = 118 + ((seed >>> 0) % 20); // tight band around mid-gray
}
await sharp(noise, { raw: { width: 128, height: 128, channels: 1 } })
  .png({ compressionLevel: 9 })
  .toFile(path.join(photosDir, 'grain.png'));
console.log('grain.png  128×128');

console.log('\n--- manifest block for src/data/photos.ts ---\n');
console.log(JSON.stringify(manifest, null, 2));
