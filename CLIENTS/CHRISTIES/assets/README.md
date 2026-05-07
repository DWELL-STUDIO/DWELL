# CHRISTIES — Assets

Replace the grey placeholders in the template with the files below.

## hero/
| File | Usage | Spec |
|---|---|---|
| `hero.jpg` or `hero.mp4` | Hero background, full-bleed | 16:9 minimum 2560px wide |

In `index.html`, uncomment the `<img>` or add a `<video>` tag inside `.hero-bg`.

## gallery/
| File | Grid position | Spec |
|---|---|---|
| `01.jpg` | gi-1 — large landscape | 4:3 |
| `02.jpg` | gi-2 — tall portrait (spans 2 rows) | 2:3 |
| `03.jpg` | gi-3 — square | 1:1 |
| `04.jpg` | gi-4 — square | 1:1 |
| `05.jpg` | gi-5 — wide landscape | 16:9 |

Replace each `.ph` div with `<img src="../assets/gallery/0X.jpg" alt="" class="w-full h-full object-cover">`.

## agent/
| File | Usage | Spec |
|---|---|---|
| `agent.jpg` | Agent portrait | 3:4, B&W |

Replace the `.portrait-ratio` div inside `.agent-inner`.
