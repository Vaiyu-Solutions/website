# Vaiyu Solutions Design System

The visual and structural system behind [vaiyu.solutions](https://vaiyu.solutions). This document
is the source of truth for the design: every value here is extracted from the shipping code, not
from intent. Use it to extend the site, to rebuild the look somewhere else (deck, PDF, product UI),
or as the reference layer for slides and documentation.

**Implementation:** Astro 7 + Tailwind 4.3, fully static, self-hosted fonts, zero runtime JS beyond
two inline scripts (theme toggle, mobile nav). Tokens live in `src/styles/global.css`; copy and
structured data live in `src/data/site.ts`.

> `README.md` and `PLAN.md` still say "Astro 5". The installed and shipping version is Astro 7.

---

## 1. Design thesis

**"An engineering journal with air."**

The site sells AI operationalization to buyers in regulated industries who arrive during vendor due
diligence. They are not looking to be excited. They are looking for evidence that this team is real,
that the claims are sourced, and that the work will survive an audit. The design does one job: make
rigor visible before the reader has finished the first screen.

Two forces, held in tension:

| Engineering journal | Air |
| --- | --- |
| Hairline rules, numbered sections, footnoted claims | Generous whitespace, no boxes where a rule will do |
| Monospace metadata, tabular alignment | A serif display face that reads like a printed page |
| Every number carries a superscript to a source | Drifting streamline motif behind the type |

"Vaiyu" is Sanskrit for wind (वायु): unseen, everywhere, load-bearing. That is the brand's own
description of infrastructure work, and it is where the streamline motif, the drift animation, and
the page-load rise come from. The motif stays decorative and quiet; it never competes with content.

**Deliberately absent:** stock photography, client logos, gradients, drop shadows, rounded cards,
illustration, testimonials, cookie banners, analytics. The only photograph on the site is the
founder's headshot. Proof is text: journal names, DOIs, repository links, footnotes.

---

## 2. Principles

1. **Rules, not boxes.** Structure comes from 1px dividers and 2px top rules. Borders on all four
   sides exist in exactly two forms: the hero aside (four pages) and the founder photo. There is not
   a single `shadow` in the codebase, and no border radius apart from the footer logo chip
   (`rounded-md`) and the 1px softening on the focus ring.
2. **Every number has a source.** Any figure in body copy carries a `<sup class="fn">` linking to a
   `Sources & attribution` block at the foot of the page. This is a design commitment, not just an
   editorial one: the superscript is a visible saffron mark, so the discipline is legible at a glance.
3. **The accent is punctuation, never paint.** Saffron marks one thing at a time: the section label,
   the active nav item, the hover state, the footnote, the arrow. It is never a background for a
   region and never used decoratively at scale.
4. **Type carries the hierarchy.** Three families with three jobs and no overlap. Weight and size do
   the work that color and boxes do on most B2B sites.
5. **Works without JavaScript, in either theme, at any width.** Dark mode is CSS-only by default. The
   nav degrades to a wrapping row. Motion respects `prefers-reduced-motion`. Nothing on the page
   requires a script to be readable.

---

## 3. Color

### 3.1 Tokens

Declared in the Tailwind 4 `@theme` block in `src/styles/global.css`. Each `--color-x` generates the
full utility family: `bg-x`, `text-x`, `border-x`, `divide-x`.

| Token | Light | Dark | Role |
| --- | --- | --- | --- |
| `paper` | `#f8f9fb` | `#0f1319` | Page background, and text on inverted surfaces |
| `cream` | `#eceff5` | `#171c24` | Alternate section background, code chips |
| `ink` | `#191c22` | `#eef1f6` | Primary text, primary button fill, hairline rules at low alpha |
| `ink-soft` | `#353c49` | `#c3ccd8` | Body copy, inactive nav |
| `slate` | `#4f5d6d` | `#93a0b0` | Metadata, captions, mono microcopy, footnote text |
| `brand-blue` | `#1e5ebb` | `#82adef` | Reserved. Declared but not currently used in markup. |
| `saffron` | `#e87228` | `#f2914a` | The accent: eyebrows, hover, footnote marks, arrows, focus ring |
| `saffron-bright` | `#f09040` | `#f8ab6e` | Accent on dark surfaces, selection highlight |
| `block` | `#191c22` | `#191e26` | Footer surface |
| `block-fg` | `#f8f9fb` | `#eef1f6` | Footer foreground |
| `--windline-accent` | `#b25415` | `#f0913f` | The one lit streamline in `WindField` |

`block` / `block-fg` exist separately from `ink` / `paper` because in dark mode `ink` becomes the
text color and can no longer double as a surface. The footer must stay dark in both themes.

### 3.2 How light and dark work

Three layers, in cascade order:

```css
:root { color-scheme: light dark; }              /* system default */

@media (prefers-color-scheme: dark) {
  :root:not(.theme-light) { /* dark tokens */ }  /* system dark, JS-free */
}

html.theme-dark { /* dark tokens */ }            /* pinned choice wins */
```

- The system setting is the default and works with JavaScript disabled: the media query carries the
  dark palette on its own.
- `html.theme-light` / `html.theme-dark` are written by the header toggle to `localStorage` and win
  on specificity (0,1,1 against 0,1,0), inside a media query or out of it.
- An inline script in `<head>` applies the pinned class before first paint, so a pinned theme never
  flashes the system one. It also adds `html.js`, which is what reveals the toggle and the mobile
  nav trigger (both are inert without script, so both stay hidden until it runs).
- The dark token list is duplicated between the media query and the class rule. CSS has no portable
  way to apply one declaration block from two conditions. **Edit both.**

Per-theme assets use the same pattern: `.on-light` / `.on-dark` toggle the sun and moon glyphs, and
`.logo-mark` swaps a CSS `background-image` so the browser only fetches the active theme's file.

### 3.3 Usage rules

- **Backgrounds** alternate `paper` and `cream` to separate adjacent sections. Where a long run of
  sections shares one background, `border-t border-ink/10` does the separating instead: `/services`
  runs six service blocks on `paper`, divided only by rules.
- **Hairlines** are always `border-ink/10` (and `divide-ink/10` for lists). `border-ink/15` for the
  two bordered containers. Never a solid `ink` border at 1px.
- **Card top rules** are `border-t-2 border-ink/80`, going to `border-saffron` on hover.
- **Saffron** appears as: eyebrow labels, active and hover nav, hover headings, footnote
  superscripts, arrows (`→`), pull-quote left rules, the focus ring, the credibility band's
  `border-t-4`, and the `Draft` badge fill. That is the complete list.
- **`brand-blue` is unused.** It is declared for future use (charts, diagrams, a second accent). If
  you need a second accent for a deck or a data visualization, this is the one to reach for.

### 3.4 Measured contrast

Computed from the shipping hex values (WCAG 2.x relative luminance).

**Light**

| Pair | Ratio | AA normal (4.5) | AA large (3.0) |
| --- | --- | --- | --- |
| `ink` on `paper` | 16.20 | pass | pass |
| `ink` on `cream` | 14.82 | pass | pass |
| `ink-soft` on `paper` | 10.53 | pass | pass |
| `ink-soft` on `cream` | 9.63 | pass | pass |
| `slate` on `paper` | 6.39 | pass | pass |
| `slate` on `cream` | 5.85 | pass | pass |
| `brand-blue` on `paper` | 5.91 | pass | pass |
| `paper` on `ink` (button, footer) | 16.20 | pass | pass |
| **`saffron` on `paper`** | **2.90** | **fail** | **fail** |
| **`saffron` on `cream`** | **2.65** | **fail** | **fail** |

**Dark**

| Pair | Ratio | AA normal (4.5) |
| --- | --- | --- |
| `ink` on `paper` | 16.45 | pass |
| `ink-soft` on `paper` | 11.48 | pass |
| `slate` on `paper` | 7.00 | pass |
| `slate` on `cream` | 6.43 | pass |
| `saffron` on `paper` | 7.92 | pass |
| `saffron` on `cream` | 7.27 | pass |
| `block-fg` on `block` | 14.78 | pass |

### 3.5 Known contrast gaps

`PLAN.md` §8 and `PRODUCT.md` commit to WCAG AA. Three places currently fall short, all in the
light theme. Documented here rather than papered over.

| Gap | Measured | Where it shows | Suggested fix |
| --- | --- | --- | --- |
| `text-saffron` on `paper` / `cream` | 2.90 / 2.65 | `Eyebrow` labels, the italic outcome line on `/services`, `sup.fn` marks, publication notes | Add a light-only `--color-saffron-text`. `#a34a10` gives 5.62 / 5.14 and holds the hue. `#b25415` (the existing light `--windline-accent`) gives 4.78 / 4.37, so it passes on `paper` but not on `cream`. |
| Primary button hover: `text-paper` on `bg-saffron` | 2.90 | Every primary CTA on the site, hover only | Swap the hover foreground to `ink` (5.58) rather than darkening the fill |
| Footer `text-block-fg/45` and `/40` | 4.26 / 3.65 | Footer column labels, email display, bottom bar | Raise to `/60` or above for the 11–12px mono runs |

Dark mode passes everywhere, including saffron, because the dark saffron (`#f2914a`) sits on a much
darker ground.

---

## 4. Typography

### 4.1 Families

Three faces, three jobs, no overlap. All self-hosted through `@fontsource`, imported once in
`Base.astro`. No external font requests.

| Token | Stack | Job |
| --- | --- | --- |
| `--font-display` | `"Fraunces Variable", Georgia, "Times New Roman", serif` | Every heading, plus emphasized single lines: stat values, project names, pull quotes, outcome lines |
| `--font-sans` | `"Archivo Variable", "Helvetica Neue", Arial, sans-serif` | Body copy. Set on `<body>`, so it is the default. |
| `--font-mono` | `"IBM Plex Mono", ui-monospace, SFMono-Regular, Menlo, monospace` | Metadata only: eyebrows, nav, captions, dates, footnotes, timings, venue lines |

Weights loaded: Fraunces variable (roman and italic, full axis), Archivo variable, IBM Plex Mono 400
and 500.

The mono face is the tell. It marks everything that is metadata rather than argument: section
numbers, dates, venues, source notes, the "8–12 wks to pilot" column. A reader scanning the page
can separate claim from apparatus without reading either.

### 4.2 Recipes

**`.h-display`**: all headings, h1 through h3.

```css
.h-display {
  font-family: var(--font-display);
  font-weight: 560;            /* between Fraunces semibold and medium */
  letter-spacing: -0.018em;    /* tightened; Fraunces is loose at display size */
  line-height: 1.06;
  text-wrap: balance;          /* no orphan word on a two-line headline */
}
.h-display em { font-style: italic; font-weight: 470; }
```

The italic `<em>` inside a headline is the signature move: one phrase per headline set in Fraunces
italic at a lighter weight. It carries the rhetorical turn.

> AI that ships: in industries where it *has to be right*.
>
> Look us up *first*.
>
> Your profit is in the banquet hall. Your risk is in the *guest file*.

Use it once per headline. Never twice.

**`.label-mono`**: every micro-label on the site.

```css
.label-mono {
  font-family: var(--font-mono);
  font-size: 0.6875rem;        /* 11px */
  letter-spacing: 0.22em;
  text-transform: uppercase;
}
```

**`.link-ink` / `.link-paper`**: quiet editorial underlines. The underline sits at 25–30% of the
text color and 0.24em below the baseline, then both color and underline go saffron on hover across
150ms.

**`.prose-editorial`**: long-form markdown for announcements, written by hand instead of pulling in
the typography plugin.

| Property | Value |
| --- | --- |
| Measure | `44rem` |
| Body | `ink-soft`, line-height `1.75`, `1.5rem` between blocks |
| `h2` / `h3` | display face, weight 560, `1.75rem` / `1.3rem`, `3rem` / `2.25rem` top margin |
| `blockquote` | `2px` saffron left rule, `1.75rem` inset, display face at `1.2rem` |
| Attribution line | The second `<p>` in a blockquote automatically becomes uppercase mono at `0.7rem` in `slate`. Write the pull quote, blank line, then `**Name**, Title, Company`. |
| `code` | mono at `0.875em` on a `cream` chip |

### 4.3 Type scale in use

Tailwind defaults, used selectively. These ten sizes cover the entire site.

| Class | Size | Where |
| --- | --- | --- |
| `text-[11px]` | 11px | Mono metadata (the most common size on the site after body) |
| `text-xs` | 12px | Footnote lists, footer bottom bar |
| `text-sm` | 14px | Card body copy in dense grids |
| `text-base` | 16px | Default body |
| `text-lg` | 18px | Hero lede, list item titles, publication titles |
| `text-xl` | 20px | Card headings, project names |
| `text-2xl` | 24px | Section sub-headings, pull quotes |
| `text-3xl` → `md:text-4xl` | 30 → 36px | Standard section heading |
| `text-4xl` → `md:text-5xl` | 36 → 48px | Emphasis section heading (CTA band, engagement models) |
| `text-[2.6rem]` → `md:text-6xl` | 41.6 → 60px | Page h1 |

Two responsive headline patterns, applied consistently:

- **Page h1:** `text-[2.6rem] md:text-6xl` (home, sector pages, announcements index) or
  `text-4xl md:text-6xl` (interior pages).
- **Section h2:** `text-3xl md:text-4xl` for standard sections, `text-4xl md:text-5xl` for the
  closing bands.

### 4.4 Rules

- Body copy is capped at `max-w-xl` (36rem) for ledes and `max-w-2xl` / `max-w-3xl` (42 / 48rem) for
  supporting paragraphs. Nothing runs the full 72rem container width.
- Headings are capped at `max-w-2xl` or `max-w-3xl` so they break where intended.
- Body text is `ink-soft`, not `ink`. Full `ink` is reserved for headings and for `<strong>` inside
  a paragraph, which is how a proper noun (a journal name, a term of art) gets lifted out of the
  line without color.
- Mono is never used for more than a line or two. Footnote lists are the one exception.

---

## 5. Layout

### 5.1 Container and breakpoints

```
mx-auto max-w-6xl px-5
```

Every section uses it, without exception. `max-w-6xl` is `72rem` (1152px); `px-5` is `1.25rem` (20px)
and does not change at any breakpoint, so the gutter stays tight on phones.

Tailwind 4 defaults, mobile-first:

| Breakpoint | Width | Used for |
| --- | --- | --- |
| `sm` | 40rem / 640px | Two-column card grids |
| `md` | 48rem / 768px | The main layout switch: type scales up, list rows go multi-column, nav collapse boundary |
| `lg` | 64rem / 1024px | The 12-column grid engages; three and four-column card grids |

The nav collapse in `global.css` is written as `@media (width < 48rem)` and the header script
watches `(width >= 48rem)`, both matching `md` exactly. If you change one, change all three.

### 5.2 Vertical rhythm

Section padding, in order of frequency:

| Padding | Use |
| --- | --- |
| `py-16 md:py-20` | Standard content section (the default) |
| `py-20 md:py-24` | Closing bands: CTA, engagement models |
| `py-20 md:py-28` | Home page's own sections (roomier than interior pages) |
| `pt-20 md:pt-28` + `pb-16 md:pb-24` | Full hero with an aside |
| `pt-20 md:pt-24` + `pb-14` | Interior page hero (headline and lede only) |
| `py-12` | Proof bar, footnotes block |

Within a section, spacing is a short ladder and nothing else:

```
mt-3   label to heading inside a card
mt-4   eyebrow to section heading
mt-5   heading to lede
mt-6   lede to body
mt-10  first content block
mt-12  heading block to a card grid
mt-14  heading block to a large list or grid (home page)
```

Grid gaps: `gap-x-10 gap-y-10` for card grids, `gap-x-12` for the 12-column split, `gap-x-8` for
dense list rows, `gap-12` for the hero.

### 5.3 Grid vocabulary

| Template | Use |
| --- | --- |
| `lg:grid-cols-12` with `lg:col-span-7` / `lg:col-span-5` | Hero, credibility band, any heading-left / body-right split |
| `lg:col-span-5` / `lg:col-span-7` | Service detail blocks and "who we are": title left, content right |
| `sm:grid-cols-2 lg:grid-cols-3` | Service and engagement cards |
| `sm:grid-cols-2 lg:grid-cols-4` | Engagement models (four across) |
| `grid-cols-2 md:grid-cols-5` | Proof bar (two up on mobile, five across on desktop) |
| `md:grid-cols-[9rem_1fr_auto]` | Open-source rows: name, description, action |
| `md:grid-cols-[11rem_1fr_auto]` | Announcement rows: date, title and excerpt, action |
| `md:grid-cols-[15rem_1fr]` | Industry rows: name, blurb |
| `md:grid-cols-[4rem_1fr]` | Numbered problem rows |
| `md:grid-cols-[1fr_auto_1fr]` | Transfer rows: what we have → what it becomes |
| `md:grid-cols-[12rem_1fr_10rem]` | Workflow rows: name, description and outcome, timing |
| `md:grid-cols-[1.5fr_1fr_1fr]` | Footer |

Every one of these collapses to a single stacked column below its breakpoint, with `gap-y` taking
over from `gap-x`.

---

## 6. Lines, rules, and surfaces

The whole structural language, in five moves:

| Move | CSS | Meaning |
| --- | --- | --- |
| Section boundary | `border-t border-ink/10` | One section ends, another begins |
| Emphasis boundary | `border-t-4 border-saffron` | The credibility band, and only the credibility band |
| List frame | `divide-y divide-ink/10 border-y border-ink/10` | A set of peer items |
| Card rule | `border-t-2 border-ink/80` → `hover:border-saffron` | An item you can act on, or a discrete commitment |
| Quote rule | `border-l-2 border-saffron pl-6` | A claim stated in the brand's own voice |

There is also `border-l-2 border-ink/15 pl-6` on `slate` text, used once on `/energy-and-utilities`
for a disclaimer. It reads as the quiet inverse of the saffron pull quote.

Two bordered containers exist site-wide, both at `border-ink/15`:

- The hero aside: `border border-ink/15 bg-paper/80 p-7`, on the home page and all three sector
  pages. The 80% background lets the wind streamlines show through faintly.
- The founder photo: `aspect-square w-full max-w-sm border border-ink/15 object-cover`, on `/about`.

Nothing else on the site is boxed.

---

## 7. Motion

Restrained and short. Nothing scroll-triggered, nothing parallax, no libraries.

**Page-load reveal.** Content rises 18px into place as it fades in, staggered down the hero.

```css
@keyframes rise {
  from { opacity: 0; transform: translateY(18px); }
  to   { opacity: 1; transform: none; }
}
.reveal   { animation: rise 0.8s cubic-bezier(0.22, 0.61, 0.21, 1) both; }
.reveal-2 { animation-delay: 0.10s; }
.reveal-3 { animation-delay: 0.20s; }
.reveal-4 { animation-delay: 0.32s; }
.reveal-5 { animation-delay: 0.44s; }
```

Applied only above the fold, in a fixed order: eyebrow, headline, lede, buttons, aside. Never on a
section further down the page.

**Wind drift.** One streamline in `WindField` is dashed and drifts continuously.

```css
.windline { stroke-dasharray: 3 11; animation: windDrift 48s linear infinite; }
@keyframes windDrift { to { stroke-dashoffset: -640; } }
```

48 seconds is deliberate. It is slow enough that it reads as ambient rather than animated.

**Hover.** Three transitions, and no others:

| Transition | Duration | Where |
| --- | --- | --- |
| `transition-colors` | 150ms (link recipes) or Tailwind default | Text going saffron, card rules going saffron, button fill |
| `transition duration-200 hover:-translate-y-1` | 200ms | Engagement-model cards and the OpenAI badge lift 4px |
| `transition-transform group-hover:translate-x-0.5` | default | Arrows nudge 2px right |

Also: `Detail →` on a home services card is `opacity-0` and appears on `group-hover` **and**
`group-focus-visible`, so keyboard users get it too.

**Reduced motion.** `prefers-reduced-motion: reduce` disables every `.reveal` variant and `.windline`
with `!important`, and turns off `scroll-behavior: smooth`. Hover transitions are left alone, which
is the right call: they are color changes under 200ms.

---

## 8. Component catalogue

Five `.astro` components, plus a set of inline patterns that repeat often enough to count as
components. The inline ones are copy-paste patterns on purpose, so a sector page can bend them
without touching a shared file.

### 8.1 `Base.astro`: page shell

Props: `title?`, `description` (required), `ogType?` (`website` | `article`), `image?`.

Provides: the pre-paint theme script, `<title>` as `{title} · Vaiyu Solutions` (or the tagline form
on the home page), canonical URL, Open Graph and Twitter cards, `ProfessionalService` JSON-LD with
the founder as a nested `Person`, a `<slot name="head">` for per-page structured data, the skip
link, `Header`, `<main id="main">`, `Footer`.

Body classes: `flex min-h-screen flex-col bg-paper font-sans text-ink antialiased`.

### 8.2 `Header.astro`

Wordmark (`.logo-mark`, `h-9 w-[178px]`, screen-reader text only) with `mr-auto`, then the nav, then
the theme toggle, then the mobile trigger. Items are `items-baseline` so the mono nav labels sit on
the same baseline as the wordmark.

Active state is a prefix match, so `/announcements/some-post/` still lights up `Announcements`.
Active gets `text-saffron` plus `aria-current="page"`; inactive is `text-ink-soft`.

Below `md`, the nav collapses behind a hamburger. The panel styling lives in `global.css` under
`html.js`, not on the markup, so the no-JS header keeps its wrapping row instead of a stack it
cannot collapse. Nav links get `min-height: 44px` in the panel: the tap target is the full row, not
the four characters of "WORK".

### 8.3 `Footer.astro`

Inverted `bg-block text-block-fg/75` slab. Three columns at `md:grid-cols-[1.5fr_1fr_1fr]`:
identity, Explore, Connect. Then a `border-t border-block-fg/10` bottom bar with the copyright and
`AI from architecture to production.`

The identity column carries the brand's own gloss, which is the only place the etymology appears
outside `/about`:

> वायु, Sanskrit for wind: unseen, everywhere, load-bearing.

`Academia` is injected into the footer link list at index 2. It is deliberately kept out of the top
nav and surfaced here for discoverability.

### 8.4 `Eyebrow.astro`

Props: `num?`, `label`, `tone?` (`default` | `light`), `class?`.

```astro
<Eyebrow num="02" label="Why teams trust us" />
<!-- renders: § 02 · WHY TEAMS TRUST US  (label-mono, saffron) -->
```

The `§` and the number are `aria-hidden`, so screen readers get the label alone. `tone="light"` uses
`saffron-bright` for dark surfaces. Numbers run sequentially down a page (`01`, `02`, `03`…) and are
the reader's position indicator. Heroes use a `num`-less eyebrow.

### 8.5 `WindField.astro`

Six cubic Bézier streamlines on a `1440×720` viewBox with `preserveAspectRatio="xMidYMid slice"`,
absolutely positioned, `pointer-events-none`, `aria-hidden`. Five strokes use `currentColor` at 4.5%
to 7% opacity; one uses `var(--windline-accent)` at 35% and carries the drift animation.

Requires `relative overflow-hidden` on the parent section and `relative` on the content wrapper.
Used on every page hero, plus the home and sector credibility bands.

### 8.6 `CTABand.astro`

Props: `heading?`, `sub?`, both with defaults. `border-t border-ink/10 bg-cream`, `py-20 md:py-24`,
a `text-4xl md:text-5xl` headline, a lede, then the primary button beside the obfuscated email.

Appears at the foot of every page except `/contact` (which is itself the conversion) and `/404`.
Sector pages override both props with sector-specific copy.

### 8.7 Primary button (inline pattern)

```html
<a href="/contact/"
   class="inline-flex items-center gap-3 bg-ink px-7 py-3.5 text-paper transition-colors hover:bg-saffron">
  <span class="label-mono">Start with a 30-minute call</span>
  <span aria-hidden="true">→</span>
</a>
```

Square, no radius, no shadow. Always paired with a secondary text link at `gap-x-8`:

```html
<a href="/services/" class="link-ink label-mono text-ink-soft">How we work</a>
```

There is no ghost or outline button variant. If a third action is needed, it is a `link-ink`.

### 8.8 Section header block

The single most repeated pattern on the site.

```html
<Eyebrow num="01" label="What we do" />
<h2 class="h-display mt-4 max-w-2xl text-3xl md:text-4xl">…</h2>
<p class="mt-5 max-w-xl leading-relaxed text-ink-soft">…</p>   <!-- optional lede -->
```

### 8.9 Rule list

The workhorse for peer items: industries, projects, publications, problems, workflows.

```html
<ul class="mt-10 divide-y divide-ink/10 border-y border-ink/10">
  <li>
    <a href="…" class="group grid gap-x-8 gap-y-2 py-6 md:grid-cols-[9rem_1fr_auto]">
      <span class="font-display text-xl transition-colors group-hover:text-saffron">Name</span>
      <span class="leading-relaxed text-ink-soft">
        Description
        <span class="mt-1.5 block font-mono text-[11px] uppercase tracking-[0.14em] text-slate">Meta</span>
      </span>
      <span class="label-mono self-baseline text-slate transition-colors group-hover:text-saffron">GitHub ↗</span>
    </a>
  </li>
</ul>
```

Row padding scales with density: `py-3` in the hero aside, `py-4` to `py-6` in standard lists, `py-9`
for announcement rows. The `group` class on the row drives every hover state inside it.

### 8.10 Top-rule card

```html
<div class="group border-t-2 border-ink/80 pt-5 transition duration-200 hover:-translate-y-1 hover:border-saffron">
  <p class="font-mono text-[11px] text-slate transition-colors group-hover:text-saffron">01</p>
  <h3 class="font-display mt-3 text-xl transition-colors group-hover:text-saffron">Title</h3>
  <p class="mt-3 text-sm leading-relaxed text-ink-soft">Description</p>
</div>
```

The lift and the hover rule are only applied when the card is interactive or represents a choice.
Static cards (the four `/about` commitments, the three `/contact` steps) use the same top rule with
no hover treatment at all.

Where cards in a grid must align across rows, `min-h-[…]` is set per slot rather than using flexbox
stretching. See `ENERGY_MODELS` on `/energy-and-utilities`: `min-h-[3.5rem]` on the title,
`min-h-[4.27rem]` on the body, `min-h-[2.62rem]` on the outcome, `min-h-[2.9rem]` on the measure.

### 8.11 Proof bar

Five stats, `grid-cols-2 md:grid-cols-5`, on `bg-cream` between `border-y border-ink/10`.

```html
<p class="font-display text-4xl leading-none md:text-[2.6rem]">
  <span class="mr-1 align-middle font-mono text-[11px] uppercase tracking-widest text-slate">up to</span>
  50%
  <sup class="fn"><a href="#fn-2" aria-label="Footnote 2">2</a></sup>
</p>
<p class="mt-3 font-mono text-[11px] uppercase leading-relaxed tracking-[0.16em] text-slate">
  training cost cut for clients
</p>
```

The optional `prefix` ("up to") is set in small mono so the numeral stays the thing you see. Data
comes from `STATS` in `src/data/site.ts` and is shared across the home page and all three sector
pages.

### 8.12 Hero aside (the bridge card)

The one bordered container. Left column is a fixed-width nowrap mono label, then a saffron arrow,
then a display-face phrase.

```html
<aside class="self-center lg:col-span-5 reveal reveal-5">
  <div class="border border-ink/15 bg-paper/80 p-7">
    <p class="label-mono text-slate">What moves in-house</p>
    <ul class="mt-4 divide-y divide-ink/10">
      <li class="flex items-baseline gap-x-3 py-3">
        <span class="w-40 shrink-0 whitespace-nowrap font-mono text-[11px] uppercase tracking-widest text-slate">Static line ratings</span>
        <span aria-hidden="true" class="shrink-0 text-saffron">→</span>
        <span class="font-display text-lg">Capacity you already own</span>
      </li>
    </ul>
  </div>
</aside>
```

The left column is `w-40` (10rem) on `/energy-and-utilities` and `w-36` (9rem) elsewhere. Because it
is `whitespace-nowrap`, the source data has a hard character budget: keep the `from` string at or
under roughly 20 characters, or it overflows. This constraint is documented in the page frontmatter.

The home page runs a variant of this card listing industries with their tags.

### 8.13 Transfer row

The "here is what we have, here is where it lands" pattern that carries every sector page's core
argument.

```html
<li class="group grid items-baseline gap-x-10 gap-y-2 py-5 md:grid-cols-[1fr_auto_1fr]">
  <span class="leading-relaxed text-slate">What we have shipped elsewhere</span>
  <span aria-hidden="true"
        class="hidden shrink-0 text-saffron transition-transform group-hover:translate-x-0.5 md:block">→</span>
  <span class="font-display text-lg leading-snug transition-colors group-hover:text-saffron">Where it lands here</span>
</li>
```

The arrow is hidden below `md`, because once the row stacks it would point down a column instead of
across. The evidence side is `slate` and the application side is display face: the claim is the
thing being asserted, the credential supports it.

### 8.14 Pull quote

```html
<blockquote class="mt-12 max-w-2xl border-l-2 border-saffron pl-6">
  <p class="font-display text-2xl italic leading-snug md:text-[1.75rem]">
    Your spa is a clinic in the eyes of a data regulator. Clinics are where we come from.
  </p>
</blockquote>
```

One per section, at most. It states the section's argument in a single sentence, which makes it the
line that gets quoted in a deck or lifted for social.

### 8.15 Ghost numeral

```css
.ghost-num {
  position: absolute; top: -1.5rem; right: 0;
  font-family: var(--font-display);
  font-size: clamp(6rem, 12vw, 9.5rem);
  line-height: 1; font-weight: 560;
  color: color-mix(in oklab, var(--color-ink) 6%, transparent);
  user-select: none; pointer-events: none;
}
```

Oversized section numeral bled behind the heading at 6% opacity. Used on `/services` only, one per
service block. Needs `relative` on the containing grid.

### 8.16 Footnote and sources block

```html
<sup class="fn"><a href="#fn-3" aria-label="Footnote 3">3</a></sup>
```

```html
<section aria-label="Sources and attribution" class="mx-auto max-w-6xl px-5 py-12">
  <p class="label-mono text-slate">Sources &amp; attribution</p>
  <ol class="mt-4 max-w-3xl space-y-2 font-mono text-xs leading-relaxed text-slate">
    <li id="fn-3">3. Pati, S. et al. … <a href="https://doi.org/…" class="link-ink" rel="noopener">doi:…</a></li>
  </ol>
</section>
```

Marks are `0.55em` mono in saffron. Numeric IDs (`1`–`4`) are the shared, cross-page claims: founder
track record, client cost reduction, the FeTS study, latency reduction. Letters (`a`, `b`, `c`…) are
page-local sources. `/energy-and-utilities` carries both sets, ten letters deep. Multiple footnotes
on one claim render comma-separated inside a single `<sup>`.

The block always sits **after** `CTABand`, at the very bottom of the page.

### 8.17 Announcement index row

`md:grid-cols-[11rem_1fr_auto]`: a `<time>` element in mono, then title and excerpt and tags, then
`Read →`. Drafts get a saffron chip below the date (`bg-saffron px-2 py-0.5 font-mono text-[10px]`),
visible in `pnpm dev` only. Empty state is a top-rule card reading "Nothing yet".

---

## 9. Page grammar

Pages are assembled from a fixed sequence of section types. The order is the argument.

### 9.1 Standard interior page

```
Hero            WindField · Eyebrow (no num) · h1 · lede            reveal 1-3
Sections        alternating paper / cream, Eyebrow numbered 01, 02, 03…
CTABand
Sources & attribution
```

Used by `/services`, `/work`, `/about`, `/contact`, `/announcements`.

### 9.2 Sector page

The full argument structure. `/energy-and-utilities`, `/hospitality`, and `/academia` all follow it.

| # | Section | Job |
| --- | --- | --- |
| · | **Hero + bridge aside** | Name the sector's problem in the headline. The aside previews the transformation as five before → after pairs. |
| · | **Proof bar** | Shared `STATS`. Borrowed credibility, immediately. |
| 01 | **The bleeding** / **The burning platform** / **The translation gap** | Numbered rule list quantifying what the reader is losing today. Every figure footnoted. |
| 02 | **The bridge** / **What transfers** | The thesis. Why this is solvable, and why by us. Ends on a pull quote. |
| 03 | **Regulatory reality** (energy only) | The constraint that makes the generic vendor answer wrong. |
| 04 | **What transfers** / the stack | Transfer rows: shipped capability → sector workflow. |
| 05 | **What we do for X** | The six standard services, restated in the sector's vocabulary. |
| 06 | **Credibility band** | `border-t-4 border-saffron`, `bg-cream`, `WindField`. Publications, the OpenAI badge, open source. |
| 07 | **How we engage** | Cards with a timing label, an outcome line, and a "measured by" line. |
| · | **CTABand** | Sector-specific heading and sub. |
| · | **Sources & attribution** | Numeric (shared) then lettered (page-local). |

Sector pages hold their content as typed `const` arrays in the page frontmatter rather than in
`src/data/site.ts`. Only genuinely shared data (`STATS`, `SERVICES`, `PROJECTS`, `INDUSTRIES`,
`COMMUNITY`) lives in the shared module. A sector page is a self-contained argument and should be
readable, and editable, in one file.

### 9.3 The credibility band

The one section with `border-t-4 border-saffron`. It is the page's strongest structural signal and
should stay unique to this role.

```html
<section class="relative overflow-hidden border-t-4 border-saffron bg-cream">
  <WindField class="text-ink" />
  <div class="relative mx-auto grid max-w-6xl gap-12 px-5 py-20 md:py-24 lg:grid-cols-12">
    <div class="lg:col-span-7"> <!-- Eyebrow, h2, prose with <strong> journal names --> </div>
    <div class="lg:col-span-5"> <!-- OpenAI badge, then a divide-y list of recognitions --> </div>
  </div>
</section>
```

The recognition list uses `label-mono text-slate` on the left ("Editor's Choice", "Top 25, 2022")
against `text-right font-display text-lg` on the right (the venue). Award on the left, authority on
the right.

---

## 10. Brand assets

| File | Dimensions | Use |
| --- | --- | --- |
| `public/img/logo_full.png` | 2390 × 482 (4.958:1) | Header wordmark, light theme |
| `public/img/logo_full_dark.png` | 2390 × 482 | Header wordmark, dark theme |
| `public/img/logo_full_square.png` | 1313 × 1000 | Footer chip, on a white `rounded-md` background |
| `public/favicon.ico` | 9 sizes, 16 → 256 | The linked tab icon |
| `public/favicon.svg` | 64 × 64 | Ink tile, `rx="14"`, three wind strokes: `#e89b3c`, `#faf7f2`, `#e89b3c` at 55% |
| `public/img/openai-select-partner.svg` | 375 × 177 | OpenAI Select Partner badge |
| `public/img/openai-select-partner.png` | 1125 × 531 | Same badge, for social cards |
| `public/img/sarthak-pati.jpg` | 800 × 800 | Founder headshot |

Notes:

- The header wordmark is painted as a CSS `background-image` rather than two `<img>` tags, so the
  browser fetches only the active theme's file and a pinned theme never shows the wrong logo for a
  frame. `h-9 w-[178px]` is the asset's ratio at that height.
- The OpenAI badge ships with its own white card and border. Do not put it in another box. It gets
  `group-hover:-translate-y-1` and a `label-mono` caption below.
- `logo_full_square.png` is not actually square (1.313:1). It is rendered `h-7 w-7 object-contain`,
  so it letterboxes cleanly, but a true square export would be better.
- `favicon.svg` is off-palette: its strokes are `#e89b3c` and `#faf7f2`, neither of which is a
  token (`saffron` is `#e87228`, `paper` is `#f8f9fb`). Harmless at 16px, but worth correcting if
  the mark is ever redrawn.
- The wordmark is typographic and provisional. `PRODUCT.md` records a commissioned mark as still open.
- No branded OG image exists yet. Pages without an explicit `image` prop emit `twitter:card=summary`
  rather than `summary_large_image`. This is the one open asset gap that affects every share.

---

## 11. Voice and content rules

These are design constraints, because they determine what the layout has to hold.

**Attribution.** Three classes of claim, three phrasings, no exceptions:

| Source | Phrasing | Example |
| --- | --- | --- |
| Vaiyu client work | "for clients" | up to 50% training cost cut for clients |
| Founder or team employment history | "our team's track record" | up to 70% latency reduction |
| Published research | link or DOI | 71 sites, 6 continents (Nature Communications 2022) |

No client names, no invented testimonials, no logos without confirmed rights.

**Headline construction.** State the reader's situation, then turn on an italic phrase. The turn is
the promise, not a superlative.

**Copy register.** Short declaratives. Concrete nouns. The site says what it will not do as readily
as what it will ("If we're not, we'll say so", "We will not sell you a system that pretends
otherwise"). Refusals are load-bearing for a due-diligence reader.

**The VerySafe firewall (hard rule).** Zero mentions of VerySafe.ai, SafeCompute, attestation
products, or that feature set anywhere on this site. The founder bio here covers Vaiyu plus
UPenn / Indiana / TUM / MLCommons only. Contact is `support@vaiyu.solutions`, never
`sarthak@verysafe.ai`. "AI governance & compliance readiness" is framed as a consulting service,
never a compute or attestation product pitch.

Enforced by `scripts/firewall-lint.mjs` against built output: it flags
`verysafe|safecompute|attestation` case-insensitively, and `\bRATS\b|\bSLSA\b|\bHSM\b`
case-sensitively and word-boundaried so the BraTS benchmark is not false-flagged. `pnpm verify` runs
the build and the lint together, and must return zero hits before anything ships.

---

## 12. Accessibility

Committed baseline: WCAG AA contrast, semantic landmarks, keyboard navigation, mobile-first.

**Implemented:**

- Skip link, `sr-only` until focused, then `focus:not-sr-only focus:absolute` at top-left with
  `z-50`.
- Landmarks: `<header>`, `<main id="main">`, `<footer>`, `<nav aria-label="Main">`,
  `<nav aria-label="Footer">`. Every non-obvious section carries an `aria-label`
  (`Track record`, `Sources and attribution`).
- `:focus-visible { outline: 2px solid var(--color-saffron); outline-offset: 3px; border-radius: 1px; }`
  globally, never removed.
- `aria-current="page"` on the active nav item, alongside the color change.
- Mobile nav: `aria-controls`, `aria-expanded`, a label that flips between "Open menu" and
  "Close menu", `Escape` closes and returns focus to the trigger, and the trigger resets when the
  viewport crosses back above `md`.
- Theme toggle `aria-label` flips between "Switch to dark theme" and "Switch to light theme", and
  stays correct when the system preference changes under a visitor who has not pinned a choice.
- Decorative elements are hidden properly: `WindField` and every arrow glyph carry `aria-hidden`,
  the `§ nn ·` prefix in `Eyebrow` is hidden so screen readers get the label alone, and the
  announcement cover image is `alt="" aria-hidden="true"` since the headline already says it.
- Footnote links carry `aria-label="Footnote 3"` rather than exposing a bare numeral.
- `min-height: 44px` on mobile nav rows.
- `text-wrap: balance` on headings, `lang="sa"` on Sanskrit text.
- `prefers-reduced-motion` honored for all animation and for smooth scrolling.
- `scroll-mt-20` on service anchors so a deep link does not land under the header.

**Gaps:** see §3.5. The saffron accent on light backgrounds is below AA for text, and that affects
every `Eyebrow` on the site. This is the one thing to fix before making an unqualified AA claim.

---

## 13. Performance and build

- Fully static. No backend, no forms, no analytics, no trackers, no cookie banner.
- Zero runtime JavaScript except two `is:inline` scripts: the pre-paint theme applier in
  `Base.astro` (roughly 15 lines) and the toggle plus mobile-nav handlers in `Header.astro`. No
  framework islands, no hydration.
- Fonts self-hosted through `@fontsource`, so there are no third-party requests at all.
- Budget: Lighthouse ≥ 95 across the board.
- Deployed to GitHub Pages by `.github/workflows/deploy.yml` on push to `main`. The custom domain is
  pinned by `public/CNAME`.
- Sitemap via `@astrojs/sitemap`, `robots.txt` in `public/`.
- SEO: per-page title and description, canonical URLs, Open Graph and Twitter cards,
  `ProfessionalService` JSON-LD site-wide plus `NewsArticle` JSON-LD on announcements.

**Commands**

```sh
pnpm dev            # local dev server (drafts visible)
pnpm build          # static build to dist/
pnpm preview        # serve the build
pnpm lint:firewall  # brand-firewall check on dist/
pnpm verify         # build + firewall lint; the pre-launch gate
pnpm new:announcement "Headline"
```

---

## 14. Extending the system

**Adding a section to an existing page.** Alternate the background from the section above it. Open
with a section header block (§8.8), advancing the `Eyebrow` number. Choose a rule list for peer
items or a top-rule card grid for choices. If the section makes an argument, close it with a pull
quote.

**Adding a sector page.** Copy `/academia` (376 lines, the smallest of the three) rather than
`/energy-and-utilities` (878 lines, the most elaborate). Follow §9.2. Hold the page's content in
typed `const` arrays in the frontmatter. Import `STATS`, `PROJECTS`, and `COMMUNITY` from
`src/data/site.ts` and leave them alone. Add the sector to `INDUSTRIES` with an `href` so the home
page aside and the `/work` list both link to it. Every number in the argument section needs a
lettered footnote.

**Adding an announcement.** `pnpm new:announcement "Headline"` creates the file. The filename is the
URL verbatim, so name it well and do not rename it after sharing. Files starting with `_` and posts
with `draft: true` never reach production. Markdown renders inside `.prose-editorial`, which already
styles headings, lists, quotes, code, and the blockquote attribution line.

**Changing a token.** Edit `@theme` in `src/styles/global.css` for the light value, then edit **both**
dark blocks (the `prefers-color-scheme` media query and `html.theme-dark`). Missing one is the
easiest mistake to make in this codebase.

**What not to change without a reason:**

- The `mx-auto max-w-6xl px-5` container. Consistency here is what makes the pages feel like one
  document.
- `border-t-4 border-saffron` staying unique to the credibility band.
- The footnote discipline. It is the design's central claim about the company.
- The firewall. It is enforced by tooling and protects both companies' positioning.

**Porting the look elsewhere** (deck, PDF, report, product UI): the portable core is the palette,
the three-family type system, hairline rules instead of cards, mono for all metadata, and the
saffron accent used sparingly as punctuation. Drop `WindField` and the reveal animations before
anything else. For a light-background deck, use `#a34a10` in place of `saffron` for any accent text
(see §3.5), and reach for `brand-blue` (`#1e5ebb`) if you need a second series color in a chart.

---

## 15. Quick reference

**Palette (light / dark)**

```
paper    #f8f9fb / #0f1319      ink       #191c22 / #eef1f6
cream    #eceff5 / #171c24      ink-soft  #353c49 / #c3ccd8
block    #191c22 / #191e26      slate     #4f5d6d / #93a0b0
saffron  #e87228 / #f2914a      s-bright  #f09040 / #f8ab6e
                                blue      #1e5ebb / #82adef  (unused, reserved)
```

**Type**

```
Display   Fraunces Variable   weight 560, tracking -0.018em, leading 1.06, em -> italic 470
Body      Archivo Variable    leading-relaxed, colour ink-soft
Meta      IBM Plex Mono       11px, tracking 0.22em, uppercase
```

**Layout**

```
Container   mx-auto max-w-6xl px-5           (72rem, 20px gutter, fixed)
Section     py-16 md:py-20                   (py-20 md:py-24 for closing bands)
Hero        pt-20 md:pt-28 / pb-16 md:pb-24
Splits      lg:grid-cols-12 -> 7 / 5
Cards       sm:grid-cols-2 lg:grid-cols-3
```

**The five structural moves**

```
border-t border-ink/10                           section boundary
border-t-4 border-saffron                        credibility band only
divide-y divide-ink/10 border-y border-ink/10    list of peers
border-t-2 border-ink/80 -> hover:border-saffron card
border-l-2 border-saffron pl-6                   pull quote
```

**Motion**

```
.reveal      rise 18px, 0.8s cubic-bezier(0.22, 0.61, 0.21, 1), delays 0 / .10 / .20 / .32 / .44
.windline    stroke-dasharray 3 11, 48s linear infinite
hover        colour 150ms · card lift -translate-y-1 200ms · arrow translate-x-0.5
```

**Related documents:** `PRODUCT.md` (positioning, audience, evidence, brand commitments) ·
`PLAN.md` (build history, firewall rules, attribution table) · `README.md` (develop and deploy).
