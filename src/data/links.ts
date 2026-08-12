/**
 * Every external destination the site links to, in one place.
 * Components must import from here — never hardcode URLs in JSX.
 */
export const links = {
  /** Alumni membership sign-up (Paperform). */
  alumniJoin: 'https://auagmembership.paperform.co/',

  /**
   * Student application form.
   * TODO(Enzo): paste the real student form URL here. While this is null,
   * every "Apply as student" CTA renders an "applications opening soon"
   * state instead of a link. (The old site wrongly sent students to the
   * Alumni Interest Form.)
   */
  studentApply: null as string | null,

  /** Andrews University Giving Tuesday vault, AUAG designation. */
  givingTuesday:
    'https://vault.andrews.edu/vault/app/pages/advancement/login/development?desg=INNOP&only=y',

  instagram: 'https://www.instagram.com/auactiongroup/',
  andrews: 'https://www.andrews.edu',
  contactEmail: 'mailto:contact@auactiongroup.com',
};
