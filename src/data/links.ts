/**
 * Every external destination the site links to, in one place.
 * Components must import from here — never hardcode URLs in JSX.
 */
export const links = {
  /** Alumni registration — AUAG's own intake form (served by auag-os). */
  alumniJoin: 'https://join.auactiongroup.com/alumni',

  /**
   * Student registration — AUAG's own intake form (served by auag-os).
   * If this is ever null again, every student CTA falls back to a styled
   * "opening soon" state. Never point students at the alumni form.
   */
  studentApply: 'https://join.auactiongroup.com/students' as string | null,

  /** Andrews University Giving Tuesday vault, AUAG designation. */
  givingTuesday:
    'https://vault.andrews.edu/vault/app/pages/advancement/login/development?desg=INNOP&only=y',

  instagram: 'https://www.instagram.com/auactiongroup/',
  andrews: 'https://www.andrews.edu',
  contactEmail: 'mailto:contact@auactiongroup.com',
};
