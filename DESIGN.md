# Design

Frame-inspired light theme, shared visual family with AUAG OS. Single fixed
theme (no dark-mode toggle). Tokens live in `src/index.css` `@theme`; shared
primitives in `src/styles/primitives.css`.

## Color

| Role | Token | Value |
| --- | --- | --- |
| Canvas (dominant) | `--color-canvas` | `#faf9f7` |
| Card | `--color-card` | `#ffffff` |
| Frame / chrome | `--color-frame` | `#0c0b0b` |
| Frame elevated | `--color-frame-elevated` | `#161514` |
| Ink | `--color-ink` | `#111111` |
| Ink secondary | `--color-ink-secondary` | `#5c5751` |
| Ink muted | `--color-ink-muted` | `#9b968f` |
| Accent (actions/emphasis only) | `--color-auag-red` | `#e11d2e` |
| Accent hover | `--color-auag-red-deep` | `#b91424` |
| Hairline | `--color-hairline` | `#e9e6e1` |
| Divider | `--color-divider` | `#f2f0ec` |
| On-dark text | `--color-on-dark` | `#faf9f7` |
| On-dark muted | `--color-on-dark-muted` | `rgba(250,249,247,.62)` |
| On-dark hairline | `--color-on-dark-hairline` | `rgba(255,255,255,.14)` |

Strategy: restrained light canvas inside committed black chrome; red ≤ a few
percent of any viewport. No other chromatic color, ever. Shadows are whispers
(`0 1px 2px rgb(0 0 0 / .03)`); the red primary button carries a soft red glow.

## Typography

- **Display** `--font-display`: Arimo 400–700 — the logo's face. Wordmark and
  every heading. Tight tracking on display sizes (`--tracking-display`).
- **Accent** `--font-accent`: Space Grotesk 400–700 — stat numerals
  (tabular-nums), micro-labels, monogram initials, date/count accents. Never
  headings or body.
- **Body** `--font-body`: Instrument Sans 400–700 — everything else,
  line-height ≥1.6.
- Fluid scale: `--text-display`, `--text-h1`, `--text-h2`, `--text-numeral`,
  `--text-micro` (10.5px). Headings use `text-wrap: balance`.

## Layout

- The **Frame**: black chrome around a floating warm-white canvas; nav lives in
  the top chrome, footer sits on the bottom chrome.
- `.section-shell` container: max-width 1200px, fluid gutters
  (`--spacing-gutter`), section rhythm via `--spacing-section`.
- Section cadence: hairline rule + red tick + Arimo heading (`.section-head`).
  The tracked micro-label kicker is reserved for the hero and small data labels
  — never one-per-section scaffolding.
- Editorial rows and asymmetric splits over identical card grids. Cards only
  when elevation means something.
- Exactly one large black moment inside the canvas per page (e.g. the network
  band on Home) plus at most one black feature card.

## Components

`primitives.css`: `.micro-label`, `.display-heading`, `.section-head`,
`.card-surface`, `.section-shell`, `.stat-numeral`, `.btn-primary` /
`.btn-ghost` / `.btn-soon`, `.on-dark` scope. Company logos always render on
black (`logoTheme` decides as-is vs grayscale-invert). People render photos
from `/team/` or fall back to dark monogram circles.

## Motion

Framer Motion for entrance/scroll reveals (varied per section, not one uniform
fade), CSS `@keyframes` for ambient motion (hero hairline drift, logo marquee).
Only transform/opacity; ease-out curves; everything honors
`prefers-reduced-motion` (marquee stops and becomes scrollable).
