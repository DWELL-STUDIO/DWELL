# Template Christie's — site villa

Template clonable pour générer un site de présentation à partir d'un dossier brut.

## Comment l'utiliser pour une nouvelle villa

```
1. Dupliquer le dossier _TEMPLATE/ et le renommer (ex. "Villa Newcastle")
2. Glisser tout le brut (PDF, photos, vidéos, notes) dans _RAW_INPUT/
3. Ouvrir Claude Code dans le nouveau dossier
4. Dire : "fais le site"
```

Claude lit `CLAUDE.md` automatiquement, suit le workflow (extraction → renommage médias → mise à jour villa.json → propagation dans les 3 HTML), et te rend un site identique à Villa Rhode mais avec la nouvelle maison.

## Ce qu'il y a dans le template

| Fichier / dossier | Rôle |
|---|---|
| `CLAUDE.md`        | Instructions pour Claude (workflow + table de substitution) — **ne pas effacer** |
| `villa.json`       | Source de vérité des données — actuellement remplie avec Villa Rhode comme exemple |
| `v2.html`          | **Site desktop principal** (React CDN + Framer Motion + Tailwind) |
| `vtel.html`        | Variante mobile (sticky CTA, layouts empilés) |
| `index.html`       | Variante légère vanilla (GSAP + Lenis) — hero différent |
| `script.js`        | Logique partagée — ne change pas selon la villa |
| `style.css`        | Identité visuelle commune — ne change pas selon la villa |
| `assets/images/`   | Photos (vide dans le template, à remplir par villa) |
| `assets/videos/`   | Vidéos (vide dans le template, à remplir par villa) |
| `_RAW_INPUT/`      | **C'est ici que tu glisses le brut.** Tout y est lu par Claude. |

## Ce que tu peux mettre dans `_RAW_INPUT/`

Aucune contrainte de format. Claude trie. Exemples :
- `dossier-presentation.pdf` (la brochure de l'agence)
- `photos/*.jpg` (toutes les photos en vrac)
- `videos/*.mp4` (vidéos en vrac, peu importe l'ordre)
- `brief.txt` ou `notes.md` (tes propres notes : ce qui est singulier, le ton à donner)
- `agent.txt` si l'agent change

Plus tu donnes de matière, plus Claude est précis. S'il manque quelque chose d'essentiel (prix, surface), il te le demandera.

## Sortie attendue

Après le workflow :
- `villa.json` mis à jour avec les nouvelles données
- `assets/images/` et `assets/videos/` remplis et renommés proprement
- `v2.html`, `vtel.html`, `index.html` mis à jour — **0 occurrence** de "Villa Rhode" / "Sylvie Koch" / "12-0301" / etc.
- Un rapport résumant ce qui a été fait + les zones à valider manuellement

## Tester localement

```bash
# Servir le dossier sur http://localhost:8000
python3 -m http.server 8000
# puis ouvrir http://localhost:8000/v2.html
```

Pour publier : push sur Netlify / Vercel comme une page statique. Aucun build step.

## Mettre à jour le template lui-même

Si tu améliores quelque chose en travaillant sur une villa et que tu veux le rapatrier dans le template (ex. nouvelle section), copie les fichiers modifiés dans `_TEMPLATE/`, mets à jour la "Token Map" dans `CLAUDE.md` si tu as introduit de nouveaux champs villa-spécifiques, et c'est bon.
