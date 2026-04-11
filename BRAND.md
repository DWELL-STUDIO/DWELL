# DWELL — Brand Guidelines

---

## Colors

| Token     | Hex       | Usage                               |
|-----------|-----------|-------------------------------------|
| Primary   | `#1A1A1A` | Background, dark surfaces, headings |
| Secondary | `#7D7770` | Body text, muted UI, labels         |
| Tertiary  | `#BDB7AD` | Borders, dividers, placeholders     |
| Neutral   | `#FDFCFB` | Light text on dark, off-white bg    |

### CSS variables

```css
:root {
  --color-primary:   #1A1A1A;
  --color-secondary: #7D7770;
  --color-tertiary:  #BDB7AD;
  --color-neutral:   #FDFCFB;
}
```

---

## Typography

**One font only: Manrope**
No serif fonts. No display fonts. No mixing.

| Role         | Weight | Size range         | Case         |
|--------------|--------|--------------------|--------------|
| Hero / title | 200    | 5rem → 14rem       | UPPERCASE    |
| Subheading   | 300    | 1.6rem → 3rem      | Sentence     |
| Body         | 300    | 0.85rem → 1rem     | Sentence     |
| Label / tag  | 500    | 0.6rem → 0.72rem   | UPPERCASE    |

Letter-spacing on labels: `0.18em – 0.26em`

Google Fonts import:
```
https://fonts.googleapis.com/css2?family=Manrope:wght@200;300;400;500&display=swap
```

---

## Voice & Tone

- Short. Precise. No filler.
- Editorial without being pretentious.
- English as primary, French accepted.

---

## Do / Don't

| Do                              | Don't                        |
|---------------------------------|------------------------------|
| Thin weights for big text       | Serif fonts anywhere         |
| Dark backgrounds                | Bright accent colors         |
| Uppercase labels + wide tracking| Decorative elements          |
| B&W photography, grayscale first| Busy or cluttered layouts    |
| Generous white space            | Heavy drop shadows           |
