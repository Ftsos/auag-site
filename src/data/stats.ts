/**
 * Canonical network numbers.
 * Source: the AUAG Alumni Interest Form data, as recorded in
 * AUAG-claude/AUAG-CONTEXT.md. Do not change these without checking
 * the primary source — never publish invented statistics.
 */
export type Stat = {
  value: string;
  label: string;
};

export const networkStats: Stat[] = [
  { value: '128', label: 'Alumni in the network' },
  { value: '117+', label: 'Offering mentorship' },
  { value: '100+', label: 'Willing to speak on campus' },
  { value: '50+', label: 'Internship offers' },
];

/** The three shown in the hero. */
export const heroStats: Stat[] = networkStats.slice(0, 3);
