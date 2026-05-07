# Jean-Paul Kala Website — Setup Guide

This guide gets the project running first **on your own machine** (Phase 1), then **on Jean-Paul's machine** (Phase 2) so he can update the site himself afterwards.

| Phase | Who | Time |
|---|---|---|
| 1. Developer setup + deploy | You | 2–3 hours, one-time |
| 2. Artist handover | You + Jean-Paul, screen-share | 30 minutes, one-time |

---

## PHASE 1 — Developer setup

### 1.1 Install prerequisites on your computer

You need three tools. Install them in this order:

1. **Node.js** (LTS version) — <https://nodejs.org>. Download the LTS installer, run it, click through. This is the engine that builds the site.
2. **Git** — already on macOS by default. Windows: <https://git-scm.com/download/win>.
3. **GitHub Desktop** — <https://desktop.github.com>. Sign in with your GitHub account (create one if needed).

Verify Node works. Open Terminal (Mac) or Command Prompt (Windows):

```bash
node --version
```

You should see `v20.x.x` or higher.

### 1.2 Create the Astro project

In Terminal, navigate to where you want the project (e.g. your Desktop):

```bash
cd ~/Desktop
npm create astro@latest jeanpaulkala-website
```

When prompted:
- **How would you like to start?** → Empty
- **Install dependencies?** → Yes
- **Initialize a new git repository?** → Yes
- **Do you plan to write TypeScript?** → Yes (Strict)

Then move into the project folder:

```bash
cd jeanpaulkala-website
```

### 1.3 Install image and styling helpers

```bash
npm install sharp
npx astro add tailwind
```

`sharp` handles image optimisation (auto-converts to WebP, generates multiple sizes). Tailwind is optional but recommended for styling speed.

### 1.4 Build the content folder structure

Inside `src/`, create these folders manually (Finder/Explorer is fine):

```
src/
└── content/
    ├── config.ts
    ├── artworks/
    └── pages/
```

Create `src/content/config.ts` with this exact content:

```typescript
import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

const artworks = defineCollection({
  loader: glob({ pattern: "*/index.md", base: "./src/content/artworks" }),
  schema: ({ image }) => z.object({
    title: z.string(),
    collection: z.enum(["animals", "feminine-figures", "cars", "nature", "figurative"]),
    year: z.number().optional(),
    dimensions: z.string().optional(),
    materials: z.string().optional(),
    status: z.enum(["available", "sold", "on-loan", "commission"]).default("available"),
    featured: z.boolean().default(false),
    image: image(),
    video: z.string().optional(),
  }),
});

const pages = defineCollection({
  loader: glob({ pattern: "*.md", base: "./src/content/pages" }),
  schema: z.object({
    title: z.string(),
    slug: z.string().optional(),
    heroImage: z.string().optional(),
    heroImageAlt: z.string().optional(),
    heroQuote: z.string().optional(),
    born: z.string().optional(),
    basedIn: z.string().optional(),
    medium: z.string().optional(),
    brand: z.string().optional(),
    exhibitionCities: z.array(z.string()).optional(),
    featuredWorks: z.array(z.string()).optional(),
    seoTitle: z.string().optional(),
    seoDescription: z.string().optional(),
  }),
});

export const collections = { artworks, pages };
```

This is the **only TypeScript file you'll write**. It defines what every content file must contain. The artist never touches this.

### 1.5 Add the first content files

1. Drop the provided `about.md` into `src/content/pages/about.md`.
2. Create your first artwork to test the pipeline:

```bash
mkdir -p src/content/artworks/furiosa
```

Inside `src/content/artworks/furiosa/`, create `index.md`:

```markdown
---
title: Furiosa
collection: animals
year: 2024
dimensions: 180 x 90 x 60 cm
materials: Welded stainless steel
status: available
featured: true
image: ./furiosa.webp
---

A roaring lioness caught mid-stride. Inspired by the wildlife of North Kivu, Furiosa embodies the tension between power and grace that defines the Animals series.
```

Drop a photo named `furiosa.webp` into the same folder. (For now, save the placeholder image from `https://jeanpaulkala.be/wp-content/uploads/2025/09/jean-2.webp`. Replace later with the high-res original from Jean-Paul.)

### 1.6 Run the dev server locally

```bash
npm run dev
```

Open `http://localhost:4321` in your browser. You'll see Astro's starter page. From here you build out the design — homepage, collection pages, individual artwork pages, about, contact. **The design phase is your job and is separate from this setup guide.**

To stop the server, press `Ctrl+C` in the terminal.

### 1.7 Push to GitHub

1. Open **GitHub Desktop** → File → Add Local Repository → choose your `jeanpaulkala-website` folder.
2. Click **Publish repository**. Name it `jeanpaulkala-website`. Keep it **private** (recommended).
3. Done — your code is on GitHub.

### 1.8 Deploy to Netlify

1. Go to <https://app.netlify.com> → log in (sign up with GitHub for one-click).
2. Click **Add new site** → **Import an existing project** → **GitHub** → select `jeanpaulkala-website`.
3. Build settings (Netlify auto-detects Astro):
   - Build command: `npm run build`
   - Publish directory: `dist`
4. Click **Deploy**. First build takes ~2 minutes.
5. Netlify gives you a temporary URL like `random-name-123.netlify.app`. Rename it under Site settings → Domain management.

### 1.9 Connect the custom domain

1. In Netlify → Domain management → **Add custom domain** → enter `jeanpaulkala.be`.
2. Netlify shows DNS records you need to add at the domain registrar (wherever `jeanpaulkala.be` is currently registered). Two options:
   - **Easy path:** point the domain's nameservers to Netlify (Netlify handles everything else).
   - **Manual path:** add a CNAME record `www → [your-netlify-url]` and an A record for the apex domain (`@`).
3. SSL certificate is automatic. Wait up to 1 hour, then `https://jeanpaulkala.be` will load the new site.

### 1.10 Confirm the auto-deploy loop works

Make a tiny change in `about.md`, save, then in GitHub Desktop: Commit → Push origin. Watch the Netlify dashboard — a new deploy starts within 5 seconds and finishes in ~30. Refresh the live site. The change appears.

**If this works, Phase 1 is done.** Every push to GitHub now auto-deploys.

---

## PHASE 2 — Artist handover

This is what you walk Jean-Paul through on a 30-minute screen-share. **Record the call** so he can rewatch it.

### 2.1 Software he installs *before* the call

Send him this list a day ahead:

1. **GitHub Desktop** — <https://desktop.github.com>. He needs a free GitHub account first.
2. **A simple text editor.** Recommend one of:
   - **iA Writer** (€10, Mac/Windows) — smoothest experience for someone non-technical
   - **Visual Studio Code** (free) — more powerful, slightly busier interface
   - ⚠️ **Avoid TextEdit** on Mac — it can silently mangle Markdown formatting.

### 2.2 Give him repository access

1. **GitHub:** repo Settings → Collaborators → invite him by GitHub username or email.
2. **Netlify:** Team settings → Members → invite him as a Member (read access is enough — he just needs to see when deploys finish).

### 2.3 Clone the repo to his machine

Screen-share with him driving:

1. Open **GitHub Desktop** → File → Clone Repository → select `jeanpaulkala-website`.
2. Choose his Desktop as the local path.
3. Click Clone. He now has the entire site as a folder on his Desktop.

### 2.4 Walk him through one real update, live

Pick a piece he actually wants to add. Do it together once, end to end:

1. Open Desktop → `jeanpaulkala-website` → `src/content/artworks/`.
2. Right-click → New Folder → name it (e.g. `kasimba-2`). **Lowercase, no spaces, no accents.**
3. Drag the photo into the new folder. Rename to match the folder (e.g. `kasimba-2.webp`).
4. Copy `index.md` from another artwork folder, paste into the new folder.
5. Open the new `index.md` in iA Writer / VS Code. Change title, year, dimensions, materials, image filename, and the description below the `---` lines. Save.
6. Open GitHub Desktop. He sees the changes listed automatically. Bottom-left: type a short note like "Added Kasimba 2" → click **Commit to main** → click **Push origin**.
7. Open <https://app.netlify.com> together. Watch the deploy run. ~30 seconds later, refresh `jeanpaulkala.be`. New piece is live.

Have him do the next one **without your help**, while you watch silently. That's how you know he's got it.

### 2.5 Leave him with the cheat sheet

Print the one-page workflow as a PDF and leave it physically next to his computer. He'll refer to it for the first few weeks until it becomes muscle memory.

---

## Troubleshooting (for the artist's reference)

| Problem | Fix |
|---|---|
| GitHub Desktop shows nothing to commit | He didn't save the file in his text editor. Save, then GitHub Desktop refreshes automatically. |
| Site doesn't update after pushing | Check Netlify deploy logs. 99% of the time it's a typo in frontmatter (missing colon, wrong indentation). Fix the `.md` file, commit, push again. |
| Accidentally deleted something | Git keeps everything. GitHub Desktop → History → find the version → right-click → Revert. Nothing is ever truly gone. |
| Wants to edit while travelling | Take notes; edit when home. Or set up Decap CMS as a fallback (browser-based editing). |
| Photo too large (>5 MB) | Resize to max 2400px wide before adding. Free tool: <https://squoosh.app>. |

---

## Image-handling rules (important for performance)

- Keep the **originals** somewhere outside the repo — external drive, Dropbox, NAS. Don't put 50 MB raw files in the repo.
- For the website, export each image at **2400px on the long side, WebP format, 85% quality**. That gives ~300 KB per image with no visible loss.
- Filenames must be lowercase, no spaces, no accents. Good: `kasimba-2.webp`. Bad: `Kasimba N°2.WEBP`.
- Always include `image: ./filename.webp` in the frontmatter and a real description in the body — both feed SEO.

---

## Recurring costs

| Item | Cost | Frequency |
|---|---|---|
| Domain `jeanpaulkala.be` | ~€10 | Yearly |
| Netlify hosting | €0 | — |
| GitHub | €0 | — |
| **Total** | **~€10/year** | |

---

## Folder structure reference

```
jeanpaulkala-website/
├── public/                     ← static files (favicon, robots.txt)
├── src/
│   ├── assets/                 ← shared images (logo, etc.)
│   ├── components/             ← reusable design pieces (your job)
│   ├── content/
│   │   ├── config.ts           ← schema, edit only when adding fields
│   │   ├── artworks/           ← ⭐ THE ARTIST EDITS HERE
│   │   │   ├── furiosa/
│   │   │   │   ├── index.md
│   │   │   │   ├── furiosa.webp
│   │   │   │   └── furiosa-360.mp4   (optional)
│   │   │   ├── makumba/
│   │   │   └── ...
│   │   └── pages/              ← ⭐ THE ARTIST EDITS HERE
│   │       └── about.md
│   ├── layouts/                ← page templates (your job)
│   ├── pages/                  ← URL routing (your job)
│   └── styles/                 ← global CSS (your job)
├── astro.config.mjs
├── package.json
└── tsconfig.json
```

The artist only ever opens the two folders marked ⭐. Everything else is yours.
