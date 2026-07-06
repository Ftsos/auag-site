# CLAUDE.md — AUAG Site

## Always Do First
- **Invoke the `frontend-design` skill** before writing any frontend code, every session, no exceptions.

## Reference Images
- If a reference image is provided: match layout, spacing, typography, and color exactly.
- If no reference image: design from scratch with high craft (see guardrails below).
- Screenshot your output, compare against the reference, fix mismatches, re-screenshot. Do not stop after one pass.

## Project Structure

```
auag-site/
├── src/
│   ├── pages/              # Home.tsx (section composition), Story.tsx
│   ├── components/         # Navbar, MainText, FlowingLines, CompanyLogosSection,
│   │                       # About, MemberCard, ContactModal, TwoPaths, Projects,
│   │                       # Events, Statistics, Footer
│   ├── styles/             # Per-component CSS (MainText.css, Events.css, About.css, Story.css, …)
│   ├── data/               # companies.ts (logo entries), about.ts (team/about content)
│   ├── types/              # companies.ts — TypeScript interfaces
│   ├── utils/              # initials.ts — headshot-fallback initials
│   ├── App.tsx             # Router: <Routes> for "/" (Home) and "/story" (Story) + ScrollToHash
│   ├── App.css             # App-level shell styles (red hero wash lives here)
│   ├── index.css           # Tailwind v4 entry + Arimo @import + @theme tokens + Flowbite plugin
│   └── main.tsx            # <BrowserRouter> wrapper
├── public/                 # auag-logo.png + 18 company marks, FLAT in the root (no subfolder)
├── index.html              # Root HTML — Arimo font, favicon
├── vite.config.ts
└── package.json
```

**Routing**: `react-router-dom` v7. `main.tsx` wraps `<BrowserRouter>`; `App.tsx` renders `/` → `pages/Home.tsx` and `/story` → `pages/Story.tsx`, with a `ScrollToHash` helper for `#section` anchor scrolling. Home composes the section components; add new sections there, and new pages as routes in `App.tsx`.

Tailwind v4 does **not** use a separate `tailwind.config.*` — theme tokens live in `@theme { … }` inside `src/index.css`.

## Local Server
- **Always serve on localhost** — never screenshot a `file:///` URL.
- Dev server command (from the repo root — there is no nested app folder):
  ```bash
  npm run dev
  ```
- Runs on `http://localhost:5173` (Vite default).
- Start the server in the background before taking any screenshots.
- If the server is already running, do not start a second instance.
- Other scripts: `npm run build` (`tsc -b && vite build`), `npm run lint`, `npm run preview`.

## Screenshot Workflow (Playwright MCP)
No repo-level screenshot tooling is installed. Use the Playwright MCP tools:
- Navigate: `mcp__plugin_playwright_playwright__browser_navigate` → `http://localhost:5173`.
- Capture: `mcp__plugin_playwright_playwright__browser_take_screenshot` (full-page or element-scoped).
- Responsive check: `mcp__plugin_playwright_playwright__browser_resize` for mobile/tablet breakpoints.
- Read the returned image with the Read tool and compare against the reference.
- When comparing, be specific: "heading is 32px but reference shows ~24px", "card gap is 1rem but should be 1.5rem".
- Check: spacing/padding, font size/weight/line-height, exact hex colors, alignment, and layout structure.
- Iterate until it matches. One pass is not enough.

## Product Context

**AUAG** is the **Andrews University Advancement Group** — a hub that connects high-potential Andrews University students with alumni for mentorship, leadership development, entrepreneurship, and experiential opportunities.

**Audience**: Andrews University students and alumni.

**Tagline**: *ACCELERATING OPPORTUNITY.*

**Core messaging pillars** (from the Projects section — use these to guide copy and structure, do not invent new ones):
1. **AU Innovation & Entrepreneurship** — building ventures and founder pathways.
2. **Leadership Network** — connecting alumni with students for mentorship and career advancement.
3. **Experiential Opportunities** — real-world projects, internships, and immersive experiences.
4. **Community Development** — strengthening the Andrews community across cohorts and industries.

**Tone of voice**: Confident, aspirational, institutional-but-not-stuffy. Serious about outcomes, warm toward community. Think "trusted elder network" — credible and outcome-oriented. Avoid startup-hype language, marketing fluff, and jargon. This is a university-affiliated network, not a SaaS.

## Output Defaults
- All code goes inside `src/` at the repo root.
- **Vite + React 19 + TypeScript** — functional components and hooks only.
- **Tailwind CSS v4** via `@tailwindcss/vite`. Add theme tokens to `@theme { … }` in `src/index.css`.
- **Flowbite React** for complex interactive primitives (wired via `@plugin` in `src/index.css`). For simple cases, prefer plain Tailwind + custom components. **Do not introduce shadcn, MUI, Chakra, or another component library** — Flowbite React is the house choice.
- **react-icons** for icons (already a dep). Do not add Lucide unless explicitly requested.
- **Framer Motion** for entrance and scroll-linked animations. For ambient background motion, stick with CSS `@keyframes` (the pattern in `Events.css` and `FlowingLines.css`).
- Placeholder images: `https://placehold.co/WIDTHxHEIGHT`.
- Mobile-first responsive — follow the existing pattern of Tailwind utilities + per-component CSS media queries in `src/styles/`.
- **Dark-only** — the site is black with red accents. Do not introduce a light-mode toggle or any `prefers-color-scheme` handling.

## Brand Assets
- The site's brand assets live in `public/` (served from `/`).
- **Logo / favicon**: `/auag-logo.png`.
- **Company logos**: **flat in `public/` root** (no subfolder) — 18 PNG marks, mostly white/light variants built for dark backgrounds. Never hardcode paths in JSX; go through `src/data/companies.ts` (entries like `logo: '/015CP.png'`), typed via `src/types/companies.ts`.
- **Team headshots**: none yet — `MemberCard`/`About` fall back to initials via `src/utils/initials.ts`, with team content in `src/data/about.ts`. Add real photos there when they exist; do not invent team members.

### Color Palette
Verified against `src/index.css`, `src/App.css`, and component styles:
- **Background**: `#000000` (body). The hero shell (`.App`) layers a radial red wash on top:
  `radial-gradient(ellipse 80% 10% at 50% 50%, rgba(220, 38, 38, 0.15), transparent), #000000`.
- **Surfaces / panels**: `#242424`, Tailwind `gray-900`, `gray-800`.
- **Primary text**: `#ffffff`.
- **Muted text**: `gray-400`, `gray-500`.
- **Accent (reserved for emphasis)**: red — `#ff0000` / Tailwind `red-600` / `rgba(220, 38, 38, …)`. Canonical uses: tagline glow (`text-shadow: 0 0 10px rgba(220, 38, 38, 0.8)`), the hero radial wash, primary CTAs, standout moments.
- **Borders**: `gray-800`, or white at low alpha for hairlines.
- **Single-accent discipline**: Red is the *only* chromatic accent. Do not introduce teals, purples, blues, or multi-color gradients that dilute the palette.

### Typography
- **Family**: **Arimo** (Google Fonts, weights 400–700 + italics). Loaded via `@import` at the top of `src/index.css` and exposed as `--font-arimo` through `@theme`.
- **Headings**: UPPERCASE, tight tracking, generous size. Pattern from `MainText.css`: ~`3.2em` / `3rem+` on desktop, scaling down to ~`1.75rem` on mobile.
- **Body**: Arimo 400, `line-height: 1.6`.
- **Discipline**: Never swap in Inter, Roboto, Space Grotesk, or any system-ui stack. Arimo is the sonic signature of the brand.

## Anti-Generic Guardrails
- **Shadows**: Prefer glow (`text-shadow`, `box-shadow` using red alpha) over conventional drop shadows. No heavy gray box shadows.
- **Structure**: Respect the section cadence of `pages/Home.tsx` — match its rhythm; don't cram new sections or break the beat.
- **Animations**: Only `transform` and `opacity`. Never `transition-all`. Framer Motion for staggered entrance reveals; CSS `@keyframes` for ambient background motion.
- **Interactive states**: Every clickable element needs `hover`, `focus-visible`, and `active` states.
- **Spacing**: Stay on the Tailwind spacing scale. No arbitrary one-off values unless there's a documented reason.
- **Imagery**: Real Andrews University / alumni / community photography whenever available. Avoid generic corporate stock ("business people shaking hands").
- **Backgrounds**: The site's character comes from layered ambient motion — flowing lines, moving points, floating points. New sections should live inside that atmosphere; a flat black panel with no motion feels wrong here.

## Hard Rules
- Do not add sections, features, or content not in the reference or the user's spec, and do not "improve" a design with unsolicited elements.
- Do not invent AUAG programs, events, statistics, team members, or partnerships that don't exist.
- The red accent is reserved for tagline emphasis, CTAs, and standout moments — do not flood the UI with it. (Palette and typography rules above are binding — Arimo + black/red only.)
- Never use `alert()`. Use an in-page toast/notification pattern (Flowbite's Toast) for user feedback.
