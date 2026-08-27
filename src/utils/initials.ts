/** Honorifics carry no initial — "Dr. Matías Soto" reads as MS, not DM. */
const HONORIFICS = /^(dr|prof|mr|ms|mrs|mx)\.?$/i;

export const getInitials = (name: string) =>
  name
    .split(/\s+/)
    .filter((part) => part && !HONORIFICS.test(part))
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? '')
    .join('');
