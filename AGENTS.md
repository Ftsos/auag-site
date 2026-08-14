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
│   ├── pages/              # Home.tsx (section composition), Story.tsx, Network.tsx, NotFound.tsx
│   ├── components/         # Navbar, MainText, FlowingLines, CompanyLogosSection,
│   │                       # About, MemberCard, ContactModal, TwoPaths, Projects,
│   │                       # Events, Statistics, Footer
│   ├── styles/             # primitives.css (shared: eyebrow/micro-label/card-surface/buttons/
│   │                       # .on-dark) + per-component CSS (MainText.css, Events.css, …)
│   ├── data/               # links.ts (ALL external URLs — never hardcode in JSX);
│   │                       # stats.ts (canonical network numbers — primary-sourced);
│   │                       # companies.ts (logo entries + industry + logoTheme);
│   │                       # about.ts (chapters[] timeline — drives About + Story)
│   ├── types/              # companies.ts — TypeScript interfaces
│   ├── utils/              # initials.ts — headshot-fallback initials
│   ├── App.tsx             # Router: "/", "/story", "/network", "*" (404) + ScrollToHash
│   ├── App.css             # App-level shell styles
│   ├── index.css           # Tailwind v4 entry + @theme tokens + primitives import + Flowbite plugin
│   └── main.tsx            # <BrowserRouter> wrapper
├── public/                 # auag-logo.png + company marks (flat), team/ (officer headshots),
│                           # robots.txt, sitemap.xml
├── index.html              # Meta/OG tags + Google Fonts (Space Grotesk + Instrument Sans)
├── vercel.json             # SPA rewrite (all routes → index.html)
├── vite.config.ts
└── package.json
```

**Routing**: `react-router-dom` v7. `main.tsx` wraps `<BrowserRouter>`; `App.tsx` renders `/` → `pages/Home.tsx`, `/story` → `pages/Story.tsx`, `/network` → `pages/Network.tsx`, and `*` → `pages/NotFound.tsx`, with a `ScrollToHash` helper for `#section` anchor scrolling. Internal anchor links must be written as `/#id` (never bare `#id`) so they work from every route. `App.tsx` also owns the global `Navbar` and the `ContactModal`. Note `Statistics` is not a standalone section — it renders inside `MainText` (the hero).

Tailwind v4 does **not** use a separate `tailwind.config.*` — theme tokens live in `@theme { … }` inside `src/index.css`. Reuse the semantic tokens there instead of re-hardcoding hex: surfaces `--color-canvas` / `-card` / `-frame` / `-frame-elevated`; ink `--color-ink` / `-ink-secondary` / `-ink-muted`; accent `--color-auag-red` / `-red-deep`; lines `--color-hairline` / `-divider`; on-dark `--color-on-dark` / `-on-dark-muted` / `-on-dark-hairline`; type scale `--text-display` / `-h1` / `-h2` / `-numeral` / `-micro`; rhythm `--spacing-section` / `-section-sm` / `-gutter`; frame `--frame-gutter` / `--frame-radius`. Shared primitives live in `src/styles/primitives.css`: `.section-head`, `.micro-label`, `.eyebrow` (hero only), `.display-heading`, `.card-surface`, `.section-shell`, `.stat-numeral`, `.btn-primary` / `.btn-ghost` / `.btn-soon`, and the `.on-dark` scope — use them instead of re-deriving section styling.

**The Frame**: `App.tsx` wraps all routes in `.site-canvas` — the warm-white canvas floating inside black chrome (`App.css`). The nav is the top chrome; the single shared `<Footer />` (rendered in `App.tsx`, not per page) sits on the bottom chrome. Pages must NOT render their own Footer.

**Section cadence**: every section opens with `.section-head` (full-width hairline + 44px red tick + Arimo heading, optional right-aligned `.section-meta` data note). Do NOT put a tracked uppercase eyebrow label above sections — the `.eyebrow` kicker exists in the hero only. Rhythm on Home: light canvas → one full-bleed black band (the network marquee) → light → one black feature card (the event) → black chrome footer. Keep it to one band + one feature card per page.

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
- Caveat: sections animate in with `whileInView` — a `fullPage` screenshot can catch them pre-reveal (blank). Verify animated sections with viewport-scoped screenshots after scrolling to them.

## Product Context

**AUAG** is the **Andrews University Action Group** — a hub that connects high-potential Andrews University students with alumni for mentorship, leadership development, entrepreneurship, and experiential opportunities.

**Audience**: Andrews University students and alumni.

**Tagline**: *ACCELERATING OPPORTUNITY.*

**Core messaging pillars** (from the Projects section — use these to guide copy and structure, do not invent new ones):
1. **AU Innovation & Entrepreneurship** — building ventures and founder pathways.
2. **Leadership Network** — connecting alumni with students for mentorship and career advancement.
3. **Experiential Opportunities** — real-world projects, internships, and immersive experiences.
4. **Community Development** — strengthening the Andrews community across cohorts and industries.

**Featured event** (facts from the signed HPAC contract — never from decks): **"Legacy: An AUAG Alumni Series"** — Friday, September 25, 2026, 2:00–4:30 PM, Howard Performing Arts Center (Homecoming Weekend). Never conflate with the umbrella series brand "A Legacy of Leadership".

**Canonical numbers** live in `src/data/stats.ts` (sourced from the Alumni Interest Form data in `AUAG-claude/AUAG-CONTEXT.md`). Do not edit or invent statistics.

**Tone of voice**: Confident, aspirational, institutional-but-not-stuffy. Serious about outcomes, warm toward community. Think "trusted elder network" — credible and outcome-oriented. Avoid startup-hype language, marketing fluff, and jargon. This is a university-affiliated network, not a SaaS.

## Output Defaults
- All code goes inside `src/` at the repo root.
- **Vite + React 19 + TypeScript** — functional components and hooks only.
- **Tailwind CSS v4** via `@tailwindcss/vite`. Add theme tokens to `@theme { … }` in `src/index.css`.
- **Flowbite React** for complex interactive primitives (wired via `@plugin` in `src/index.css`). For simple cases, prefer plain Tailwind + custom components. **Do not introduce shadcn, MUI, Chakra, or another component library** — Flowbite React is the house choice.
- **react-icons** for icons (already a dep). Do not add Lucide unless explicitly requested.
- **Framer Motion** for entrance and scroll-linked animations — **always import variants from `src/utils/motion.ts`** (`fadeRise`, `fadeIn`, `slideIn`, `photoReveal`, `staggerParent`, `VIEWPORT`/`VIEWPORT_TALL`, `EASE_OUT`); never define inline animation configs. `App.tsx` wraps everything in `<MotionConfig reducedMotion="user">`. For ambient background motion, stick with CSS `@keyframes` (the pattern in the hero scroll cue and the marquee).
- **External URLs always come from `src/data/links.ts`.** A null `studentApply` renders CTAs as a styled "applications opening soon" state — never point students at the alumni form.
- Placeholder images: `https://placehold.co/WIDTHxHEIGHT`.
- **Photography**: processed shoot assets live in `public/photos/` (ink-B&W, webp+jpg srcset pairs) and are referenced only through the manifest `src/data/photos.ts`, rendered with `src/components/Photo.tsx` (responsive `<picture>`, `priority` prop for the hero) inside the `.photo-frame` primitive (hairline border + grain overlay). To add/re-treat photos, edit `scripts/curation.json` and run `node scripts/process-photos.mjs "../AUAG Photos"` (sharp devDependency; EXIF auto-orient is mandatory — many shoot files are stored sideways). Keep the hero preload in `index.html` in sync with `photos.hero`. Staged, not-yet-identified headshots live in `public/team/pending/` — never wire one to a person without human confirmation.
- Mobile-first responsive — Tailwind utilities + per-component CSS media queries in `src/styles/`.
- **Single fixed light theme** — warm-white canvas with black structural chrome. No dark-mode toggle, no `prefers-color-scheme` theming.

## Brand Assets
- The site's brand assets live in `public/` (served from `/`).
- **Logo / favicon**: `/auag-logo.png`. The visible wordmark is CSS text (`AU` ink/white + `AG` red).
- **Company logos**: PNG marks flat in `public/` root. Never hardcode paths in JSX; go through `src/data/companies.ts` (each entry carries `industry` and `logoTheme`). Logos **always render on dark chips** (`--color-frame` tiles) — `logoTheme: 'light'` marks get a light grayscale/brightness normalization, `'dark'` marks get `grayscale(1) invert(1)`, so the wall reads as one monochrome set on both the Home marquee and `/network`.
- **Team headshots**: drop into `public/team/` as kebab-case `first-last.jpg`, then set `photo: '/team/first-last.jpg'` on the person in `src/data/about.ts`. Anyone without a photo falls back to an initials monogram (`src/utils/initials.ts`). Do not invent team members; names/spellings follow `AUAG-claude/AUAG-CONTEXT.md`.

### Color Palette ("Frame-inspired" — shared visual family with auag-os)
Tokens in `src/index.css`; verified in the components:
- **Canvas**: `#faf9f7` warm white — the dominant page surface. Cards: `#ffffff` with `#e9e6e1` hairline borders and `#f2f0ec` in-card dividers.
- **Black chrome**: `#0c0b0b` (`--color-frame`) used *structurally only* — nav bar, footer, the inverted Events band, and the company logo chips. Elevated dark surface: `#161514`.
- **Ink**: `#111111` primary, `#5c5751` secondary/body, `#9b968f` muted/labels.
- **Accent (reserved)**: red `#e11d2e` (`--color-auag-red`), hover `#b91424`. Canonical uses: primary CTAs, the tagline period, eyebrow ticks, active-nav dot, the event date, `::selection`, focus rings. **Never decoration or backgrounds.**
- **On-dark text**: `#faf9f7` / `rgba(250,249,247,.62)` muted / `rgba(255,255,255,.14)` hairlines — via the `.on-dark` scope.
- **Single-accent discipline**: Red is the *only* chromatic accent. No teals, purples, blues, or multi-color gradients.
- **Shadows**: whisper only — cards `0 1px 2px rgb(0 0 0 / .03)`; the red primary button carries `0 2px 8px rgba(225,29,46,.25)`. No heavy gray drop shadows, no glow effects.

### Typography
- **Display (`--font-display`)**: **Arimo** (400–700) — the AUAG wordmark and ALL headings (tagline, section titles, card titles, event title), matching the logo artwork. Big display type keeps tight negative tracking (`--tracking-display: -0.03em`). `--font-wordmark` is an alias of the same face for the "AUAG" mark specifically.
- **Accent (`--font-accent`)**: **Space Grotesk** (400–700) — reserved for the small characterful layer only: stat numerals (`tabular-nums`), micro-labels/eyebrows, monogram initials, date/count accents (the red event date, group counts, outcome indexes, channel emails). Never headings or body.
- **Body/UI (`--font-body`)**: **Instrument Sans** (400–700, + italics) — everything else. Body `line-height: 1.6+`.
- All loaded from Google Fonts via `<link>` in `index.html` (with preconnect) — not via CSS `@import`.
- **Micro-labels** are the signature small voice: Space Grotesk 500, 10.5px, `0.11em` tracking, uppercase — used as *data labels* (meta rows, group headers, roles), never as section eyebrows.
- **Discipline**: Never swap in Inter, Roboto, or a system-ui stack, and never let Space Grotesk creep back into headings — heading = Arimo, accent = Space Grotesk, body = Instrument Sans.

## Anti-Generic Guardrails
- **Structure**: Respect the section cadence of `pages/Home.tsx` — match its rhythm; don't cram new sections or break the beat. No scroll-jacking (fixed-height scroll shells are banned; the old 200vh/400vh hero+pillars were removed deliberately).
- **Animations**: Only `transform` and `opacity`. Never `transition-all`. Framer Motion `whileInView` for staggered entrance reveals (shared variants from `src/utils/motion.ts`); CSS `@keyframes` for ambient motion (hero scroll cue, marquee). The hero photo parallax is the only scroll-linked transform — subtle drift, no scroll-jacking. Everything respects `prefers-reduced-motion`.
- **Interactive states**: Every clickable element needs `hover`, `focus-visible`, and `active` states. Global focus ring is the red outline in `index.css`.
- **Spacing**: Use the rhythm tokens (`--spacing-section`, `--spacing-gutter`) and the Tailwind scale. No arbitrary one-off values unless there's a documented reason.
- **Imagery**: Real Andrews University / alumni / community photography whenever available. Avoid generic corporate stock ("business people shaking hands").
- **Dark usage**: black is chrome, not mood — one inverted band per page maximum; content sections stay on the warm canvas.

## Hard Rules
- Do not add sections, features, or content not in the reference or the user's spec, and do not "improve" a design with unsolicited elements.
- Do not invent AUAG programs, events, statistics, team members, or partnerships that don't exist. Stats come from `src/data/stats.ts`; event facts from primary sources; people from `AUAG-claude/AUAG-CONTEXT.md`.
- Always "Andrews University **Action** Group" — never "Advancement Group".
- The red accent is reserved for CTAs, emphasis ticks, and standout moments — do not flood the UI with it.
- Never use `alert()`. Use an in-page toast/notification pattern (Flowbite's Toast) for user feedback. Never fake a success state for a form that doesn't actually submit anywhere.
