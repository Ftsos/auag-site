import { createHmac, scryptSync, timingSafeEqual } from 'node:crypto';
import type { ApiRequest, ApiResponse } from './http';
import { HttpError, readCookie } from './http';

/**
 * Single-password admin auth.
 *
 * AUAG is a student org with one shared editor role, so a full user table would
 * be over-engineering. One password, one signed cookie, 12-hour sessions.
 * Officers never need a GitHub account — the function commits on their behalf.
 */

const COOKIE_NAME = 'auag_admin';
const SESSION_TTL_MS = 12 * 60 * 60 * 1000;

function sessionSecret(): string {
  const secret = process.env.SESSION_SECRET;
  if (!secret || secret.length < 32) {
    throw new Error(
      'SESSION_SECRET must be set to a random string of 32+ characters.',
    );
  }
  return secret;
}

function safeEqual(a: string, b: string): boolean {
  const bufA = Buffer.from(a);
  const bufB = Buffer.from(b);
  // timingSafeEqual throws on length mismatch, so compare lengths first.
  if (bufA.length !== bufB.length) return false;
  return timingSafeEqual(bufA, bufB);
}

/**
 * Accepts either `ADMIN_PASSWORD_HASH` (preferred, format
 * `scrypt$<saltB64>$<hashB64>`) or a plain `ADMIN_PASSWORD` env var.
 * The plaintext path exists so the club can get running before generating a
 * hash; `npm run hash-password` produces the stronger one.
 */
export function checkPassword(input: string): boolean {
  if (typeof input !== 'string' || input.length === 0) return false;

  const stored = process.env.ADMIN_PASSWORD_HASH?.trim();
  if (stored) {
    const [scheme, saltB64, hashB64] = stored.split('$');
    if (scheme !== 'scrypt' || !saltB64 || !hashB64) return false;

    const derived = scryptSync(
      input,
      Buffer.from(saltB64, 'base64'),
      64,
    ).toString('base64');

    return safeEqual(derived, hashB64);
  }

  const plain = process.env.ADMIN_PASSWORD;
  if (!plain) return false;
  return safeEqual(input, plain);
}

export function isAuthConfigured(): boolean {
  return Boolean(
    (process.env.ADMIN_PASSWORD_HASH || process.env.ADMIN_PASSWORD) &&
      process.env.SESSION_SECRET,
  );
}

function sign(payload: string): string {
  return createHmac('sha256', sessionSecret())
    .update(payload)
    .digest('base64url');
}

export function createSessionToken(): string {
  const expiresAt = String(Date.now() + SESSION_TTL_MS);
  return `${expiresAt}.${sign(expiresAt)}`;
}

export function verifySessionToken(token: string | undefined): boolean {
  if (!token) return false;

  const [payload, signature] = token.split('.');
  if (!payload || !signature) return false;
  if (!safeEqual(signature, sign(payload))) return false;

  const expiresAt = Number(payload);
  return Number.isFinite(expiresAt) && expiresAt > Date.now();
}

export function isAuthenticated(req: ApiRequest): boolean {
  return verifySessionToken(readCookie(req, COOKIE_NAME));
}

export function setSessionCookie(res: ApiResponse, token: string): void {
  const maxAge = Math.floor(SESSION_TTL_MS / 1000);
  res.setHeader(
    'Set-Cookie',
    `${COOKIE_NAME}=${encodeURIComponent(token)}; Path=/; HttpOnly; Secure; SameSite=Strict; Max-Age=${maxAge}`,
  );
}

export function clearSessionCookie(res: ApiResponse): void {
  res.setHeader(
    'Set-Cookie',
    `${COOKIE_NAME}=; Path=/; HttpOnly; Secure; SameSite=Strict; Max-Age=0`,
  );
}

/**
 * Best-effort login throttle. Serverless instances are ephemeral, so this is
 * per-instance rather than global — it raises the cost of brute-forcing without
 * pretending to be a real rate limiter. Rotating the password is the real fix.
 */
const attempts = new Map<string, { count: number; resetAt: number }>();
const MAX_ATTEMPTS = 8;
const WINDOW_MS = 10 * 60 * 1000;

export function assertNotThrottled(key: string): void {
  const now = Date.now();
  const entry = attempts.get(key);

  if (!entry || entry.resetAt < now) return;
  if (entry.count < MAX_ATTEMPTS) return;

  const minutes = Math.ceil((entry.resetAt - now) / 60000);
  throw new HttpError(429, `Too many attempts. Try again in ${minutes} minutes.`);
}

export function registerFailure(key: string): void {
  const now = Date.now();
  const entry = attempts.get(key);

  if (!entry || entry.resetAt < now) {
    attempts.set(key, { count: 1, resetAt: now + WINDOW_MS });
    return;
  }

  entry.count += 1;
}

export function clientKey(req: ApiRequest): string {
  const forwarded = req.headers['x-forwarded-for'];
  const raw = Array.isArray(forwarded) ? forwarded[0] : forwarded;
  return raw?.split(',')[0]?.trim() || 'unknown';
}
