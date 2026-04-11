# DWELL — Image & Video Guide

---

## Asset folder structure

```
01_WEBSITE/assets/
│
├── dwell/                        ← DWELL main page
│   ├── images/
│   │   ├── hero.jpg              ← Homepage full-page background
│   │   ├── team-matteo.jpg       ← Team photo — Matteo
│   │   └── team-romeo.jpg        ← Team photo — Romeo
│   └── video/
│       └── hero.mp4              ← Homepage hero video (loops silently)
│
└── projects/
    ├── linkebeek/
    │   ├── images/
    │   │   ├── cover.jpg         ← Card thumbnail on homepage + layer hero
    │   │   ├── interior-01.jpg   ← Grand salon
    │   │   ├── interior-02.jpg   ← Kitchen & dining
    │   │   └── interior-03.jpg   ← Master suite
    │   └── video/
    │       └── highlight.mp4     ← Cinematic film (when ready)
    │
    └── formentera/
        ├── images/
        │   ├── cover.jpg         ← Card thumbnail on homepage + layer hero
        │   ├── interior-01.jpg   ← Exterior / pool
        │   ├── interior-02.jpg   ← Living room
        │   └── interior-03.jpg   ← Rooftop terrace
        └── video/
            └── highlight.mp4     ← Cinematic film (when ready)
```

---

## Naming rules

| File name        | What it is                                      |
|------------------|-------------------------------------------------|
| `cover.jpg`      | The main project image — used as card + hero    |
| `interior-01.jpg`| First interior image in the layer / page        |
| `interior-02.jpg`| Second interior image                           |
| `interior-03.jpg`| Third interior image                            |
| `hero.jpg`       | DWELL homepage background only                  |
| `team-[name].jpg`| Portrait of a team member                      |
| `hero.mp4`       | DWELL homepage background video                 |
| `highlight.mp4`  | Project cinematic film                          |

---

## Image specs

| Type             | Format | Width   | Quality | Ratio |
|------------------|--------|---------|---------|-------|
| `hero.jpg`       | JPG    | 1800 px | 80%     | 16:9  |
| `cover.jpg`      | JPG    | 1800 px | 85%     | 4:5   |
| `interior-*.jpg` | JPG    | 1800 px | 80%     | 16:9  |
| `team-*.jpg`     | JPG    | 800 px  | 85%     | 3:4   |
| `hero.mp4`       | MP4    | 1920 px | H.264   | 16:9, < 15 MB |
| `highlight.mp4`  | MP4    | 1920 px | H.264   | 16:9          |

---

## Where each image appears in the HTML

### `index.html` (homepage)

| Image file | HTML location | Role on page |
|---|---|---|
| `dwell/images/hero.jpg` | Line 69 — CSS `.hero-bg-img` | Full-page background behind the DWELL title |
| `dwell/video/hero.mp4` | Line 509 — `<source>` in `.hero-video` | Looping video layered over hero (opacity 36%) |
| `projects/linkebeek/images/cover.jpg` | Line 535 — `.prop-img` style | Linkebeek card in the properties grid |
| `projects/formentera/images/cover.jpg` | Line 545 — `.prop-img` style | Formentera card in the properties grid |
| `dwell/images/team-matteo.jpg` | Line 567 — `<img src>` | Matteo portrait in About section |
| `dwell/images/team-romeo.jpg` | Line 577 — `<img src>` | Romeo portrait in About section |
| `projects/linkebeek/images/cover.jpg` | Line 623 — `.pl-hero-img` style | Linkebeek layer hero (slide-up overlay) |
| `projects/linkebeek/images/interior-01.jpg` | Line 673 — `.pl-img-bg` style | Grand salon — full-bleed in layer |
| `projects/linkebeek/images/interior-02.jpg` | Line 684 — `.pl-img-bg` style | Kitchen & dining — full-bleed in layer |
| `projects/linkebeek/images/interior-03.jpg` | Line 694 — `.pl-img-bg` style | Master suite — full-bleed in layer |
| `projects/formentera/images/cover.jpg` | Line 730 — `.pl-hero-img` style | Formentera layer hero (slide-up overlay) |
| `projects/formentera/images/interior-01.jpg` | Line 780 — `.pl-img-bg` style | Exterior / pool — full-bleed in layer |
| `projects/formentera/images/interior-02.jpg` | Line 791 — `.pl-img-bg` style | Living room — full-bleed in layer |
| `projects/formentera/images/interior-03.jpg` | Line 801 — `.pl-img-bg` style | Rooftop terrace — full-bleed in layer |

### `properties/linkebeek/index.html` (standalone page)

| Image file | HTML location | Role on page |
|---|---|---|
| `projects/linkebeek/images/cover.jpg` | Line 94 — CSS `.hero-bg-img` | Full-page hero background |
| `projects/linkebeek/images/interior-01.jpg` | Line 521 — `.gallery-img` style | Gallery — wide image (left) |
| `projects/linkebeek/images/interior-02.jpg` | Line 524 — `.gallery-img` style | Gallery — small image (top right) |
| `projects/linkebeek/images/interior-03.jpg` | Line 527 — `.gallery-img` style | Gallery — small image (bottom right) |

> Paths in this file use `../../assets/projects/linkebeek/images/` because the page lives 2 levels deep.

### `properties/formentera/index.html` (standalone page)

| Image file | HTML location | Role on page |
|---|---|---|
| `projects/formentera/images/cover.jpg` | Line 94 — CSS `.hero-bg-img` | Full-page hero background |
| `projects/formentera/images/interior-01.jpg` | Line 520 — `.gallery-img` style | Gallery — wide image (left) |
| `projects/formentera/images/interior-02.jpg` | Line 523 — `.gallery-img` style | Gallery — small image (top right) |
| `projects/formentera/images/interior-03.jpg` | Line 526 — `.gallery-img` style | Gallery — small image (bottom right) |

> Paths in this file use `../../assets/projects/formentera/images/` because the page lives 2 levels deep.

---

## Adding a new project

1. Create the folder: `assets/projects/SLUG/images/` and `assets/projects/SLUG/video/`
2. Drop files: `cover.jpg`, `interior-01.jpg`, `interior-02.jpg`, `interior-03.jpg`
3. In `index.html`: duplicate a `.prop-card` block, update the image path, text, and `data-layer` ID
4. In `index.html`: duplicate a `.prop-layer` block, update all image paths and copy
5. If you want a standalone page: create `properties/SLUG/index.html`, use `../../assets/projects/SLUG/images/`
