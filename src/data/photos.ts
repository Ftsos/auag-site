/*
 * Manifest for the processed photo-shoot assets in public/photos/.
 * Regenerate assets with scripts/process-photos.mjs; components never
 * hardcode photo paths — they import from here (same rule as links.ts).
 */
export type SitePhoto = {
  id: string;
  /** Path prefix; pair with widths: `${base}-${w}.webp` / `.jpg`. */
  base: string;
  widths: number[];
  /** Intrinsic aspect ratio (post EXIF orientation) — prevents CLS. */
  width: number;
  height: number;
  alt: string;
  /** Optional CSS object-position hint, e.g. '50% 30%'. */
  focus?: string;
};

export const photos = {
  hero: {
    id: 'hero-b',
    base: '/photos/hero-b',
    widths: [1600, 2400],
    width: 6000,
    height: 4000,
    alt: 'AUAG student officers standing together in a campus corridor',
    focus: '50% 42%',
  },
  pillars: {
    id: 'table-session',
    base: '/photos/table-session',
    widths: [800, 1600],
    width: 4000,
    height: 6000,
    alt: 'Officers working through a plan around a standing table',
  },
  twoPathsAlumni: {
    id: 'alumni-huddle',
    base: '/photos/alumni-huddle',
    widths: [800, 1600],
    width: 6000,
    height: 4000,
    alt: '', // decorative behind the alumni panel copy
  },
  aboutBand: {
    id: 'team-studio',
    base: '/photos/team-studio',
    widths: [800, 1600],
    width: 1537,
    height: 1023,
    alt: 'The ten AUAG officers photographed together in the studio',
    focus: '50% 34%',
  },
} satisfies Record<string, SitePhoto>;
