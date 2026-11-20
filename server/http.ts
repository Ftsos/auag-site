/**
 * Minimal request/response shapes for the Vercel functions in `api/`.
 *
 * Vercel's own `VercelRequest` / `VercelResponse` are supersets of these, so
 * structural typing accepts them — and we avoid a runtime dependency just to
 * name two types. The local dev server (`scripts/dev-api.ts`) implements the
 * same shape, which is what makes `npm run dev:api` possible without `vercel dev`.
 */

export interface ApiRequest {
  method?: string;
  headers: Record<string, string | string[] | undefined>;
  body?: unknown;
  query: Record<string, string | string[]>;
}

export interface ApiResponse {
  status(code: number): ApiResponse;
  json(body: unknown): void;
  setHeader(name: string, value: string | string[]): void;
  end(chunk?: string): void;
}

export class HttpError extends Error {
  status: number;

  constructor(status: number, message: string) {
    super(message);
    this.status = status;
    this.name = 'HttpError';
  }
}

/** Wrap a handler so thrown HttpErrors become clean JSON responses. */
export function withErrors<Req extends ApiRequest, Res extends ApiResponse>(
  handler: (req: Req, res: Res) => Promise<void>,
) {
  return async (req: Req, res: Res): Promise<void> => {
    try {
      await handler(req, res);
    } catch (error) {
      const status = error instanceof HttpError ? error.status : 500;
      const message =
        error instanceof HttpError
          ? error.message
          : 'Something went wrong. Try again.';

      if (status === 500) {
        console.error('[api]', error);
      }

      res.status(status).json({ error: message });
    }
  };
}

export function readBody<T>(req: ApiRequest): T {
  if (req.body === undefined || req.body === null || req.body === '') {
    return {} as T;
  }

  if (typeof req.body === 'string') {
    try {
      return JSON.parse(req.body) as T;
    } catch {
      throw new HttpError(400, 'Malformed JSON body.');
    }
  }

  return req.body as T;
}

export function readCookie(
  req: ApiRequest,
  name: string,
): string | undefined {
  const header = req.headers.cookie;
  const raw = Array.isArray(header) ? header.join('; ') : header;
  if (!raw) return undefined;

  for (const part of raw.split(';')) {
    const [key, ...rest] = part.trim().split('=');
    if (key === name) return decodeURIComponent(rest.join('='));
  }

  return undefined;
}
