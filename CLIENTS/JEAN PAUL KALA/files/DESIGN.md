# DESIGN.md — Art Direction & Visual System

*Jean-Paul Kala · Website redesign · v1*

This document is the global art direction for the new site. It defines the look, feel, rhythm, and rules. Every component, page, and interaction must comply.

---

## 1. Brand essence

> **Sculptural. Monochrome. Slow. Confident.**

The site is not a portfolio that shouts. It is a **dark gallery room** where each piece is given air, time, and weight. The artist lets metal do the talking — the design must do the same.

**Three guiding principles:**

1. **The image always wins.** Every UI choice should make the artwork more visible, never compete with it.
2. **Less, but better.** Pages have wide margins, generous space between sections, and almost no decoration. If a divider, badge, or icon doesn't carry meaning, it's removed.
3. **Slow on purpose.** Transitions, scrolls, and hovers are deliberate and unhurried. The site rewards attention.

**Reference points:** the websites of high-end galleries (Gagosian, Hauser & Wirth, Almine Rech), and the editorial dark-mode aesthetic of *Apartamento*, *032c*, or Kvadrat. Not Instagram. Not WordPress themes.

---

## 2. Color palette

The palette is intentionally minimal: **a near-black, an off-white, and one accent borrowed from polished brass.** That's it.

| Token | Hex | Usage |
|---|---|---|
| `--color-bg` | `#0A0A0A` | Main background, everywhere |
| `--color-bg-elevated` | `#141414` | Cards, hover states, subtle elevation |
| `--color-fg` | `#F5F5F2` | Primary text, headings, logo |
| `--color-fg-muted` | `#8A8A85` | Captions, metadata (year, dimensions, materials), inactive nav |
| `--color-line` | `#1F1F1F` | Hairline dividers, image borders |
| `--color-accent` | `#C9A66B` | Hover states, "Inquire" link, exhibition pins. Used sparingly — never for body text. |

**Hard rules:**
- Never use pure `#000000` (too cold against metal photography). Always `#0A0A0A`.
- Never use pure `#FFFFFF`. The off-white `#F5F5F2` reduces glare and feels like museum lighting.
- The accent `#C9A66B` appears on **at most 2 elements per viewport**. It's a whisper, not a highlight.
- No gradients. No drop shadows. No glows.

---

## 3. Typography

The current site uses **Basis Grotesque Pro** (Medium + Regular). It's the right choice — clean, slightly humanist, holds up at every size — but the files on the current site are pirated from `fontsfree.net`. Two clean paths:

**Option A — License Basis Grotesque Pro properly** (recommended)
- Buy from Colophon Foundry: <https://colophon-foundry.org/typefaces/basis-grotesque>
- One-domain web license is roughly £80 one-time. Add it to the project budget once.

**Option B — Use a free near-equivalent**
- **Hanken Grotesk** (Google Fonts, free, open-source) is the closest match — same humanist grotesque DNA, free for any use, served from Google Fonts CDN. <https://fonts.google.com/specimen/Hanken+Grotesk>
- Use weights **400 (Regular)** and **500 (Medium)** to mirror the current setup.

Pick one path, document it, stick to it. Don't keep the pirated files.

**Type scale**

Built on a 1.250 (major third) ratio, base 16px.

| Role | Size (desktop) | Weight | Tracking | Use |
|---|---|---|---|---|
| Display | 80 / 96 px | 500 Medium | -2% | Hero headline (artist name on landing) |
| H1 | 48 px | 500 Medium | -1% | Page titles ("About", "Animals") |
| H2 | 32 px | 500 Medium | -1% | Section headings, artwork titles on detail pages |
| H3 | 22 px | 500 Medium | 0% | Sub-sections |
| Body L | 20 px | 400 Regular | 0% | Bio, long-form text |
| Body | 16 px | 400 Regular | 0% | Default |
| Caption | 13 px | 400 Regular | +4% | Metadata: year, dimensions, materials, status |
| Eyebrow | 12 px | 500 Medium | +12%, UPPERCASE | Section labels ("Featured", "Exhibitions") |

On mobile, scale Display and H1 down by ~30% (Display becomes 56px, H1 becomes 36px). Body sizes do not change.

**Hard rules:**
- Two weights only: Regular and Medium. No bold, no italics in UI (italics allowed in body prose for emphasis).
- Line height: 1.15 for headings, 1.55 for body.
- Maximum line length for prose: **62 characters**. Use `max-width: 32rem` on text columns.
- Never centre body text. Headings can be centred only on the homepage hero.

---

## 4. Layout & grid

**8-pixel baseline grid.** Every spacing value is a multiple of 8: `8, 16, 24, 32, 48, 64, 96, 128, 192`. Don't invent values like `13px` or `42px`.

**Container widths:**
- Reading width (text-only sections): `640px` max
- Standard content: `1200px` max
- Wide media: `1440px` max
- Full-bleed: 100vw, no margin

**Vertical rhythm:**
- Section padding: `128px` top + bottom on desktop, `64px` on mobile
- Between paragraphs: `24px`
- Between heading and its content: `32px`

**Page anatomy (every page):**
1. Sticky top nav, transparent at top of page, `--color-bg` with hairline border once scrolled
2. Hero section (varies by page)
3. Content sections, each separated by `128px`
4. Minimal footer (nav links, social, copyright, no branding flourish)

The site is **content-out, not container-in**. Images often break the container and go full-bleed. Text never does.

---

## 5. Imagery — the most important section

The site lives or dies on the photography. Three rules govern every image:

**1. Photos are sacred.** No rounded corners. No drop shadows. No filters. No overlays except the optional vignette described below. Sharp 90° corners reflect the metal medium.

**2. Aspect ratios are deliberate.**
- Landscape gallery images: **3:2** (the default for most artwork shots)
- Portrait artwork: **2:3** or **4:5**
- Hero / homepage feature: **16:9** or full-bleed
- Studio / process: **4:3** (looser, documentary feel)

Don't crop arbitrarily. Frame at capture or commission proper photography.

**3. Hover and motion.** On desktop, hovering an artwork thumbnail does *one* thing: a slow `1.02` scale over 600ms with a subtle vignette darkening the corners. The title fades in below. No tilting, no parallax, no shine effects.

**Lazy loading is mandatory.** Below-the-fold images use `loading="lazy"` and Astro's `<Image>` component for automatic WebP + responsive sizing.

**No loading screens.** The current "Please wait, art is coming" overlay is removed entirely. The site loads in under 1.5 seconds — that's the loading screen.

---

## 6. Motion & interaction

**Slow, intentional, never decorative.**

| Element | Animation | Duration | Easing |
|---|---|---|---|
| Page enter | Fade in from `opacity: 0` to `1` | 400ms | `ease-out` |
| Image scroll-in | Fade + 8px upward translate | 600ms | `cubic-bezier(0.16, 1, 0.3, 1)` |
| Image hover | Scale to `1.02` + vignette in | 600ms | `ease-out` |
| Link hover | Underline grows from left | 200ms | `ease-out` |
| Nav background appear on scroll | Background opacity 0 → 1 | 200ms | `ease` |

**Hard rules:**
- No bounce, no spring, no overshoot.
- No auto-playing sliders or carousels on the homepage.
- No parallax backgrounds.
- The 360° artwork videos play **on hover only** (desktop) or with a play button (mobile). Never autoplay with sound.
- Respect `prefers-reduced-motion` — all animations become instant when the user's OS sets that flag.

---

## 7. Components

### Navigation (top)

- Logo left, links right. Single line.
- Links: `Home · Collections (Animals · Feminine Figures · Cars · Nature · Figurative) · About · Contact`
- Active page link is underlined (1px, full width of label).
- Mobile: hamburger only, opens a full-screen overlay nav with stacked uppercase eyebrow-style links.

### Buttons & links

- Primary action ("Inquire about this piece"): text + arrow `→`, with a 1px underline. **No filled rectangles, ever.** Hovering shifts the arrow 4px right.
- Secondary action ("View collection"): text only with subtle hover underline.
- The site has at most 3 button styles total. If you find yourself inventing a fourth, redesign.

### Artwork card (used in collection grids)

```
┌───────────────────────┐
│                       │
│    [ artwork image ]  │   ← 3:2 aspect ratio, full bleed within card
│                       │
└───────────────────────┘
  Furiosa                   ← H3, fades in on hover
  Animals · 2024            ← Caption, --color-fg-muted
```

- 4-column grid on desktop, 2-column on tablet, 1-column on mobile.
- Gap between cards: `48px` desktop, `24px` mobile.
- The whole card is clickable, links to the artwork detail page.

### Artwork detail page (the most important page)

Layout: full-bleed hero image, then a two-column section below with metadata left + description right, then "More from this series" grid at the bottom. The "Inquire about this piece" link sits sticky at the bottom-right of the page on desktop, opening a pre-filled email or a contact form modal.

### Footer

- Two lines only: navigation links + social handles on top line, copyright + small print below.
- No branding flourish, no newsletter signup duplicated here (it goes one section above the footer on key pages).

---

## 8. Voice & tone (for UI copy)

**Sparse. Confident. Never decorative.**

| Bad | Good |
|---|---|
| "Discover the amazing world of Jean-Paul Kala's stunning sculptures!" | "Welded metal. North Kivu to Brussels." |
| "Click here to learn more" | "Read the full biography →" |
| "Get in touch with us today" | "Inquire" |
| "Loading, please wait, art is coming..." | *(removed)* |
| "Subscribe to our newsletter" | "Receive new pieces by email." |

UI text is never longer than necessary. Body prose (the bio, artwork descriptions) can breathe — the artist's voice carries it.

---

## 9. Iconography

- Use **Lucide** (free, open-source, line-based) — <https://lucide.dev>
- 1.5px stroke weight, no fills, never larger than 24px in UI.
- Use icons sparingly: arrow for links, mail for contact, social handles. **No icons in body text. No icons in headings.**
- Remove Font Awesome from the project — it's heavy and not on-brand.

---

## 10. Don'ts (the short list)

- ❌ No drop shadows
- ❌ No gradient backgrounds
- ❌ No rounded corners on images (8px on form fields and buttons is allowed)
- ❌ No filled "Submit" buttons in the modern SaaS style
- ❌ No emoji in UI
- ❌ No stock illustrations
- ❌ No carousels with dots
- ❌ No "Back to top" floating buttons
- ❌ No cookie banner that takes more than 80px of vertical space
- ❌ No "powered by" or web-agency credit in the footer

---

## 11. Accessibility floor

These are not optional, they are the minimum:

- Contrast ratio for body text on background: **at least 7:1** (`#F5F5F2` on `#0A0A0A` = 18.4:1, well within range)
- All images have `alt` text written by the developer or artist (never auto-generated)
- Every interactive element is reachable by keyboard
- Focus rings are visible (1px `--color-accent` outline, 2px offset)
- The site works with JavaScript disabled for reading content (Astro static-renders, so this is free)

---

## 12. Quick visual summary

```
Background:     #0A0A0A  ████████████████████
Foreground:     #F5F5F2  ░░░░░░░░░░░░░░░░░░░░
Muted:          #8A8A85  ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒
Accent (rare):  #C9A66B  ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓

Type:           Basis Grotesque Pro (or Hanken Grotesk)
                Regular 400 + Medium 500, two weights only

Spacing:        8px baseline, multiples only
Sections:       128px vertical breathing room (desktop)

Mood:           Dark gallery room. Slow. Sculptural. Quiet.
```

---

*This document is the source of truth for design decisions. When in doubt, re-read section 1 — three guiding principles. If a proposed feature doesn't reinforce one of them, it doesn't ship.*
