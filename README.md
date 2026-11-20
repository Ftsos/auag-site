# AUAG Site

Public marketing site for the **Andrews University Action Group** (AUAG) —
[auactiongroup.com](https://auactiongroup.com). Vite + React 19 + TypeScript +
Tailwind v4, routed with react-router-dom v7.

## Develop

```bash
npm install
npm run dev        # http://localhost:5173
npm run dev:api    # optional: admin write API on :8787 (Vite proxies /api here)
npm run lint
npm run build      # tsc -b && vite build
npm run preview
```

Reading content never needs the API — posts are compiled in at build time. You
only need `dev:api` when working on `/admin`.

## Pages

- `/` — hero, four pillars, company marquee, alumni/student paths, story teaser,
  events (Legacy: An AUAG Alumni Series), footer
- `/network` — the alumni-company wall, grouped by industry, with canonical stats
- `/story` — the chapter-by-chapter AUAG timeline and officer outcomes
- `/blog/:slug` — a single post
- `/admin` — password-protected editor (not linked from the site)
- anything else — branded 404

## Content

Posts are markdown files in the repo. No CMS server, no database.

- **Published**: `src/content/posts/<slug>.md`
- **Drafts**: `src/content/drafts/<slug>.md` (never bundled — the public build
  only globs `posts/`)

Frontmatter: `title`, `slug`, `date` (YYYY-MM-DD), `location`, `excerpt`,
`cover`. The body is markdown, rendered with `react-markdown`.

Officers edit at `/admin`, which commits to git through a Vercel function in
`api/`. Each save is one atomic commit (post + cover image together), which
triggers a Vercel rebuild — the site updates about a minute after publishing.

### Admin setup

Copy `.env.example` to `.env` and fill in:

```bash
npm run hash-password "the shared password"   # -> ADMIN_PASSWORD_HASH
node -e "console.log(crypto.randomUUID()+crypto.randomUUID())"  # -> SESSION_SECRET
```

`GITHUB_TOKEN` is a fine-grained token with **Contents: Read and write** on this
repository — that is what lets officers publish without a GitHub account of
their own. Set the same variables in Vercel's environment settings.

## Where things live

- **Design system**: tokens in `src/index.css` (`@theme`), shared primitives in
  `src/styles/primitives.css`, per-component CSS in `src/styles/`. Full brand
  contract: `CLAUDE.md` / `AGENTS.md` (kept identical after the title line).
- **Content data**: `src/data/` — `links.ts` (all external URLs, including the
  signup forms), `stats.ts` (canonical network numbers), `companies.ts` (logo
  wall), `about.ts` (team/timeline).
- **Posts**: `src/content/posts/` + `src/content/drafts/`; read layer in
  `src/api/posts.ts`, frontmatter parser in `src/utils/frontmatter.ts`.
- **Admin**: `src/pages/Admin.tsx`, `src/components/MarkdownEditor.tsx`; server
  side in `api/` (routes) and `server/` (auth, GitHub, http helpers).
- **Officer photos**: drop `first-last.jpg` files into `public/team/` and set
  `photo` on the person in `src/data/about.ts`.
- **Post covers**: written to `public/posts/<slug>/` by the admin upload flow.

## Deploy

Built for a static host, with a small serverless API for content editing.
`vercel.json` carries the SPA rewrite (all routes → `index.html`, with `/api`
excluded) so deep links like `/story` survive a refresh on Vercel. On any
other host, configure the equivalent single-page-app fallback and move `api/`
to that host's serverless runtime.

