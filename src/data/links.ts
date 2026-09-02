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

  /**
   * Legacy event RSVP — AUAG's own form (served by auag-os). Same destination
   * as the QR code on the printed poster, so the two never diverge.
   *
   * auag-os is a separate app on its own origin, so in dev this points at the
   * local auag-os server (port 3000) — otherwise every RSVP click during
   * development hits a domain that does not resolve yet. Override with
   * VITE_RSVP_URL if auag-os is running somewhere else.
   */
  legacyRsvp:
    import.meta.env.VITE_RSVP_URL ||
    (import.meta.env.DEV ? 'http://localhost:3000/rsvp' : 'https://rsvp.auactiongroup.com'),

  /** Andrews University Giving Tuesday vault, AUAG designation. */
  givingTuesday:
    'https://vault.andrews.edu/vault/app/pages/advancement/login/development?desg=INNOP&only=y',

  instagram: 'https://www.instagram.com/auactiongroup/',
  andrews: 'https://www.andrews.edu',
  contactEmail: 'mailto:contact@auactiongroup.com',
};
