import { randomBytes, scryptSync } from 'node:crypto';

/**
 * Generate an ADMIN_PASSWORD_HASH for the `/admin` login.
 *
 *   npm run hash-password "the password the officers will share"
 *
 * Paste the output into `.env` (local) and into Vercel's environment variables
 * (production). Store the password itself in a password manager — the hash
 * cannot be reversed.
 */

const password = process.argv[2];

if (!password) {
  console.error('Usage: npm run hash-password "<password>"');
  process.exit(1);
}

if (password.length < 12) {
  console.error('Use at least 12 characters — this is a single shared password.');
  process.exit(1);
}

const salt = randomBytes(16);
const hash = scryptSync(password, salt, 64);

console.log(
  `scrypt$${salt.toString('base64')}$${hash.toString('base64')}`,
);
