# AUAG Site

Public marketing site for the **Andrews University Action Group** (AUAG) —
[auactiongroup.com](https://auactiongroup.com). Vite + React 19 + TypeScript +
Tailwind v4, routed with react-router-dom v7.

## Develop

```bash
npm install
npm run dev        # http://localhost:5173
npm run lint
npm run build      # tsc -b && vite build
npm run preview
```

## Pages

- `/` — hero, four pillars, company marquee, alumni/student paths, story teaser,
  events (Legacy: An AUAG Alumni Series), footer
- `/network` — the alumni-company wall, grouped by industry, with canonical stats
- `/story` — the chapter-by-chapter AUAG timeline and officer outcomes
- anything else — branded 404

## Where things live

- **Design system**: tokens in `src/index.css` (`@theme`), shared primitives in
  `src/styles/primitives.css`, per-component CSS in `src/styles/`. Full brand
  contract: `CLAUDE.md` / `AGENTS.md` (kept identical after the title line).
- **Content data**: `src/data/` — `links.ts` (all external URLs, including the
  signup forms), `stats.ts` (canonical network numbers), `companies.ts` (logo
  wall), `about.ts` (team/timeline).
- **Officer photos**: drop `first-last.jpg` files into `public/team/` and set
  `photo` on the person in `src/data/about.ts`.

## Deploy

Built for a static host. `vercel.json` carries the SPA rewrite (all routes →
`index.html`) so deep links like `/story` survive a refresh on Vercel. On any
other host, configure the equivalent single-page-app fallback.
