import { createServer } from 'node:http';
import type { IncomingMessage, ServerResponse } from 'node:http';
import { existsSync, readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import type { ApiRequest, ApiResponse } from '../server/http.ts';

/**
 * Local stand-in for Vercel Functions.
 *
 * The public site never calls the API — it reads compiled markdown — so this
 * only matters while working on `/admin`. Run it next to `npm run dev`:
 *
 *   npm run dev      # Vite on :5173, proxies /api here
 *   npm run dev:api  # this server on :8787
 *
 * Node 22.18+ strips TypeScript types natively, so no build step or loader
 * dependency is needed.
 */

const PORT = Number(process.env.DEV_API_PORT ?? 8787);

type Handler = (req: ApiRequest, res: ApiResponse) => Promise<void>;

const ROUTES: Record<string, () => Promise<{ default: Handler }>> = {
  '/api/auth': () => import('../api/auth.ts'),
  '/api/posts': () => import('../api/posts.ts'),
};

function loadEnv(): void {
  const path = resolve(process.cwd(), '.env');
  if (!existsSync(path)) return;

  for (const line of readFileSync(path, 'utf8').split(/\r?\n/)) {
    const match = /^\s*([A-Za-z0-9_]+)\s*=\s*(.*)$/.exec(line);
    if (!match) continue;

    const [, key, rawValue] = match;
    if (process.env[key] !== undefined) continue;

    process.env[key] = rawValue.trim().replace(/^["']|["']$/g, '');
  }
}

function createResponse(res: ServerResponse): ApiResponse {
  let status = 200;

  const api: ApiResponse = {
    status(code: number) {
      status = code;
      return api;
    },
    json(body: unknown) {
      if (!res.headersSent) {
        res.writeHead(status, { 'Content-Type': 'application/json' });
      }
      res.end(JSON.stringify(body));
    },
    setHeader(name: string, value: string | string[]) {
      res.setHeader(name, value);
    },
    end(chunk?: string) {
      if (!res.headersSent) res.writeHead(status);
      res.end(chunk);
    },
  };

  return api;
}

async function readRequestBody(req: IncomingMessage): Promise<unknown> {
  const chunks: Buffer[] = [];
  for await (const chunk of req) {
    chunks.push(chunk as Buffer);
  }

  const raw = Buffer.concat(chunks).toString('utf8');
  if (!raw) return undefined;

  const contentType = req.headers['content-type'] ?? '';
  if (String(contentType).includes('application/json')) {
    try {
      return JSON.parse(raw);
    } catch {
      return raw;
    }
  }

  return raw;
}

loadEnv();

createServer(async (req, res) => {
  const url = new URL(req.url ?? '/', `http://${req.headers.host ?? 'localhost'}`);
  const loader = ROUTES[url.pathname];

  if (!loader) {
    res.writeHead(404, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ error: `No dev route for ${url.pathname}` }));
    return;
  }

  const apiReq: ApiRequest = {
    method: req.method,
    headers: req.headers,
    body: await readRequestBody(req),
    query: Object.fromEntries(url.searchParams),
  };

  try {
    const { default: handler } = await loader();
    await handler(apiReq, createResponse(res));
  } catch (error) {
    console.error('[dev-api]', error);
    if (!res.headersSent) {
      res.writeHead(500, { 'Content-Type': 'application/json' });
    }
    res.end(JSON.stringify({ error: 'Dev API crashed. Check the terminal.' }));
  }
}).listen(PORT, () => {
  console.log(`[dev-api] listening on http://localhost:${PORT}`);
});
