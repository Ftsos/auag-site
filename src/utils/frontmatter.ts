/**
 * Minimal frontmatter parser for post files.
 *
 * Deliberately tiny: post frontmatter is a flat map of scalars, so a full YAML
 * parser (and the Buffer polyfill it drags into the browser bundle) would be
 * dead weight. Supports `key: value`, double- or single-quoted strings, and
 * `true` / `false`. Nested maps and lists are not supported on purpose — if a
 * post ever needs them, that is a signal to change the content model, not to
 * grow this parser.
 */
export type Frontmatter = Record<string, string | boolean>;

const OPENING = /^---[ \t]*\r?\n/;
const CLOSING = /^---[ \t]*$/m;

export function parseFrontmatter(raw: string): {
  data: Frontmatter;
  body: string;
} {
  const source = raw.replace(/^\uFEFF/, '');

  if (!OPENING.test(source)) {
    return { data: {}, body: source.trim() };
  }

  const afterOpening = source.slice(source.indexOf('\n') + 1);
  const closingMatch = CLOSING.exec(afterOpening);

  if (!closingMatch) {
    return { data: {}, body: source.trim() };
  }

  const header = afterOpening.slice(0, closingMatch.index);
  const bodyStart = afterOpening.indexOf('\n', closingMatch.index);
  const body = bodyStart === -1 ? '' : afterOpening.slice(bodyStart + 1).trim();

  const data: Frontmatter = {};

  for (const line of header.split(/\r?\n/)) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) continue;

    const colon = line.indexOf(':');
    if (colon === -1) continue;

    const key = line.slice(0, colon).trim();
    if (!key) continue;

    data[key] = parseValue(line.slice(colon + 1).trim());
  }

  return { data, body };
}

function parseValue(raw: string): string | boolean {
  if (raw === 'true') return true;
  if (raw === 'false') return false;

  if (raw.length > 1 && raw.startsWith('"') && raw.endsWith('"')) {
    try {
      return JSON.parse(raw) as string;
    } catch {
      return raw.slice(1, -1);
    }
  }

  if (raw.length > 1 && raw.startsWith("'") && raw.endsWith("'")) {
    return raw.slice(1, -1).replace(/''/g, "'");
  }

  return raw;
}

/** Serialize frontmatter back out. Round-trips with `parseFrontmatter`. */
export function stringifyFrontmatter(
  data: Record<string, string | boolean | null | undefined>,
  body: string,
): string {
  const lines: string[] = ['---'];

  for (const [key, value] of Object.entries(data)) {
    if (value === null || value === undefined) continue;
    if (typeof value === 'boolean') {
      lines.push(`${key}: ${value}`);
    } else {
      // JSON.stringify gives us correct escaping for quotes and backslashes.
      lines.push(`${key}: ${JSON.stringify(value)}`);
    }
  }

  lines.push('---', '', body.trim(), '');
  return lines.join('\n');
}
