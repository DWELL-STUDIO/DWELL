# CLAUDE.md — instructions automatiques pour Claude Code

> **Ce fichier est lu par Claude Code à chaque ouverture du dossier.** Il décrit la marche à suivre pour transformer ce template (Villa Rhode) en un site identique pour une autre maison, à partir des éléments bruts déposés dans `_RAW_INPUT/`.

---

## 1. Contexte

Ce dossier est un **template clonable** pour les sites de présentation Christie's International Real Estate. Il contient trois variantes du même site :

| Fichier | Stack | Usage |
|---|---|---|
| `v2.html`   | React (CDN) + Framer Motion + Tailwind (CDN) | **Version desktop principale, canonique.** |
| `vtel.html` | React (CDN) + Framer Motion + Tailwind (CDN), mobile-first | Variante téléphone (sticky CTA, layouts empilés). |
| `index.html`| Vanilla HTML + GSAP + Lenis | Variante légère sans React, hero différent ("Une œuvre d'architecture."). |

`script.js` et `style.css` sont partagés et **ne contiennent aucune donnée villa-spécifique** — ne jamais les modifier sauf demande explicite.

`villa.json` est la **source de vérité** : toutes les données villa-spécifiques y sont consolidées. Le contenu actuel est celui de **Villa Rhode** (référence). Tu vas le remplacer pour la nouvelle villa, puis propager les nouvelles valeurs dans les trois HTML.

---

## 2. Quand exécuter ce workflow

L'utilisateur déclenche le workflow par un message du type :
- "fais le site"
- "génère le site"
- "build the site"
- "transforme ça en site"
- "remplace par la villa [nom]"

Si l'utilisateur ne te demande explicitement rien, **ne fais rien automatiquement**. Demande confirmation : *"Je vois `_RAW_INPUT/` rempli — tu veux que je génère le site maintenant ?"*

---

## 3. Workflow en 6 étapes

### Étape 1 — Inventorier `_RAW_INPUT/`

Liste tout le contenu de `_RAW_INPUT/`. Tu y trouveras un mélange de :
- **Documents texte** : PDF dossier de présentation, brochure, fiche descriptive, .txt, .docx
- **Photos** : .jpg, .png (non triées en général)
- **Vidéos** : .mp4, .mov (parfois aérien, intérieur, hero)
- **Notes vocales** ou notes libres : `notes.md`, `brief.txt`, mémo audio
- Parfois un `villa.json` partiellement rempli si l'utilisateur l'a préparé

→ Si `_RAW_INPUT/` est vide ou ne contient rien d'exploitable, **arrête-toi et demande** à l'utilisateur ce qu'il veut faire.

### Étape 2 — Extraire les données structurées

Lis tous les documents texte / PDF. Construis mentalement un mapping vers le schéma de `villa.json`. Pour chaque champ obligatoire, cherche la valeur dans le brut. Si une donnée manque :
- Pour les champs **textuels** (intro, descriptions de pièces) : pose une question ciblée à l'utilisateur via `AskUserQuestion`.
- Pour les champs **chiffrés** (surfaces, prix) : signale l'absence et demande.
- Pour les champs **agent / branding Christie's** (BIV, agence, email, téléphone) : si l'agent est le même que dans le template courant, garde-les ; sinon demande.

### Étape 3 — Trier et renommer les médias

Regarde les photos et vidéos brutes. **Tu dois choisir** :
- 1 vidéo hero (façade jour, plan large, idéalement 5–15s)
- 2 photos contraste jour / nuit (même cadrage, 2 ambiances)
- 9 photos de pièces signature pour la section "Espaces"
- 4 vidéos courtes "films" (cuisine, salle à manger, séjour, aérien — ou équivalents)
- 1 vidéo aérienne longue pour la section "film"
- 28 photos pour la galerie (la sélection complète) — si moins, ajuste le titre de section ("Vingt regards", etc.)
- 1 portrait agent
- 1 photo "vue dans son environnement" pour la section localisation

Si l'utilisateur n'a pas fourni ces catégories spécifiquement, **fais ta meilleure sélection** et liste tes choix dans le rapport final pour qu'il valide.

**Convention de nommage cible** dans `assets/` :
- `assets/videos/hero.mp4`
- `assets/videos/film-aerien.mp4` (le long)
- `assets/videos/film-01-cuisine.mp4`, `film-02-salle-a-manger.mp4`, `film-03-sejour.mp4`, `film-04-aerien.mp4`
- `assets/images/hero-poster.jpg`
- `assets/images/villa-jour.jpg`, `villa-nuit.jpg`
- `assets/images/spaces/01-vue-aerienne.jpg` … `09-piscine.jpg` (ou nom adapté à la villa)
- `assets/images/gallery/01.jpg` … `28.jpg`
- `assets/images/agent.jpg`
- `assets/images/location.jpg`

→ **Copie / renomme** les fichiers du brut vers ces emplacements via `cp` (ne pas supprimer le brut).

### Étape 4 — Mettre à jour `villa.json`

Réécris complètement `villa.json` avec les nouvelles valeurs. Mets à jour aussi tous les chemins `assets/...` vers les nouveaux noms de fichiers (ceux décidés à l'étape 3).

Garde la même structure de schéma, n'ajoute pas de clés sans raison.

### Étape 5 — Propager dans les 3 HTML

Pour **chaque** fichier (`v2.html`, `vtel.html`, `index.html`), remplace toutes les occurrences villa-spécifiques. Voir la **§4 Token Map** ci-dessous pour la liste exhaustive (groupée par catégorie).

Stratégie :
1. Lis le fichier en entier une fois
2. Pour chaque token de la table : utilise `Edit` avec `replace_all: true` quand la chaîne est unique au villa-spécifique, sinon contextualise avec quelques caractères de plus.
3. Cas particuliers :
   - **Microcopy à cadence fixe** (ex. "Neuf univers", "Douze raisons", "Vingt-huit regards") — si la nouvelle villa a un autre nombre, **réécris la formule** en mots français cohérents (ex. "Sept univers", "Quinze raisons", "Vingt regards").
   - **Tableau des espaces** (9 cartes dans `<Spaces>`) — ajuste le tableau JS / le DOM si le compte change. Va voir le composant `<Spaces>` dans v2.html (~ligne 939) et `vtel.html` (~ligne 1032).
   - **Galerie** (28 photos) — ajuste l'array dans le composant `<Gallery>` (~ligne 1432 v2 / 1525 vtel) — modifie aussi le titre de section.
   - **index.html** est plus léger (709 lignes, structure différente) — toutes les sections n'existent pas. Ne forcer pas leur présence.

### Étape 6 — Vérification finale

1. `grep -n "Villa Rhode\|Rhode-Saint-Genèse\|Sylvie Koch\|2 650 000\|684 m²\|2.662 m²\|12-0301\|sk@christies" v2.html vtel.html index.html` — **doit retourner 0 résultat** (sauf si la nouvelle villa garde l'agent Sylvie Koch).
2. Ouvre chaque fichier dans le navigateur (`open v2.html`) et survole visuellement.
3. Rapport final à l'utilisateur :
   - Liste des fichiers media renommés / placés
   - Liste des champs `villa.json` non remplis (si tu as deviné, dis-le)
   - Captures d'écran si possible
   - Items qui méritent une revue manuelle (ex. "j'ai écrit la section manifesto à partir de ta note vocale, vérifie")

---

## 4. Token Map — toutes les valeurs villa-spécifiques

Format : `chaîne à chercher` → `champ villa.json` (fichiers concernés). Quand "v2 + vtel" est indiqué, la chaîne apparaît dans les deux. `idx` = index.html.

### 4.1 Identité

| Chaîne actuelle | → champ | Fichiers |
|---|---|---|
| `Villa Rhode` | `identity.name` | v2 + vtel + idx (multiples) |
| `Réf. 12-0301` | `identity.reference` | v2 + vtel + idx |
| `Disponible` | `identity.status` | idx (hero__status) |
| `On n'habite pas une villa. On l'interprète.` | `identity.tagline` | v2 (manifesto, mots-réveal ligne ~864) + vtel |
| `Villa Rhode — Christie's International Real Estate` | `identity.meta_title` | (à harmoniser dans `<title>` des 3 fichiers) |
| `Villa Rhode — V2 (React · Framer Motion)` | (titre de v2) | v2 ligne 6 |
| `Villa Rhode — Mobile (vtel)` | (titre de vtel) | vtel ligne 6 |
| `Villa d'architecte d'exception à Rhode-Saint-Genèse...` | `identity.meta_description` | les 3 |

### 4.2 Localisation

| Chaîne actuelle | → champ | Fichiers |
|---|---|---|
| `Rhode-Saint-Genèse` | `location.city` | les 3 (multiples : nav, location, hero, footer) |
| `Rhode-Saint-Genèse · Belgique` | `location.city + ' · ' + location.country` | idx (hero__loc) |
| `Rhode-Saint-Genèse, en lisière de forêt.` | `location.neighborhood_label` | v2 + vtel (titre section location) |
| `en lisière de forêt` | `location.region` | les 3 (em-tag dans titre section) |
| `Forêt de Soignes` | (apparaît en `location.facts` + `hero.lede`) | v2 + vtel + idx |
| `50.7544° N · 4.3656° E` | `location.coordinates` | v2 + vtel |
| `Posée dans un clos résidentiel privé, à quelques minutes du centre de Bruxelles...` | `location.intro_paragraph` | v2 + vtel |
| Liste facts (Cadre / Environnement / Bruxelles / Aéroport / Écoles internationales) | `location.facts[]` | v2 + vtel (array JS) |

### 4.3 Specs

| Valeur actuelle | → champ |
|---|---|
| `684 m²` (habitable) | `specs.surfaces.habitable_m2` |
| `2 662 m²` ou `2.662 m²` (terrain) | `specs.surfaces.terrain_m2` |
| `2 000 m²` (jardin) | `specs.surfaces.jardin_m2` |
| `5` (chambres) | `specs.distribution.chambres` |
| `3` (salles de bains) | `specs.distribution.salles_de_bains` |
| `2 + 3` (stationnement) | `specs.distribution.stationnement` |
| `1990` (construction) | `specs.construction.annee_construction` |
| `2020` (rénovation) | `specs.construction.annee_renovation` |
| `B` (PEB) | `specs.construction.peb` |

⚠️ Le terrain apparaît avec **deux séparateurs** (`2 662` espace-fine et `2.662` point) — uniformise pour la nouvelle villa.

### 4.4 Prix

| Valeur actuelle | → champ |
|---|---|
| `2 650 000 €` | `price.amount_display` |

### 4.5 Agent

| Chaîne actuelle | → champ | Fichiers |
|---|---|---|
| `Sylvie Koch` | `agent.name` | v2 + vtel (multiples : agent card, contact section) |
| `Christie's International Real Estate` | `agent.agency` | les 3 |
| `BIV 505256` | `agent.biv` | v2 + vtel + idx (footer) |
| `+32 (0)2 808 03 64` | `agent.phone_office_display` | v2 + vtel + idx |
| `tel:+3228080364` | `agent.phone_office_tel` | v2 + vtel + idx |
| `+32 (0)472 86 96 68` | `agent.phone_mobile_display` | v2 + vtel |
| `tel:+32472869668` | `agent.phone_mobile_tel` | v2 + vtel |
| `sk@christiesrealestatebelgium.be` | `agent.email` | v2 + vtel + idx |
| `Demande de visite — Villa Rhode` | `agent.email_subject` | v2 + vtel (mailto subject) |
| `assets/images/sylvie.jpg` | `agent.portrait_image` | v2 + vtel |

### 4.6 Médias

Voir `villa.json` pour la liste complète. Toutes les chaînes commençant par `assets/images/8906584_` ou `assets/videos/villa%20rhodes_` sont des chemins villa-spécifiques.

Pour les **films** dans `films.items[].video` : la version texte des chemins peut contenir des espaces encodés `%20`. Garde la cohérence.

### 4.7 Microcopy à cadence (count-aware)

| Chaîne actuelle | Logique |
|---|---|
| `Neuf univers, un même langage.` | "{count_en_lettres} univers" — adapter si tu mets autre chose que 9 espaces |
| `Douze raisons de visiter.` | adapter si autre que 12 amenities |
| `Quatre cadrages, un mouvement.` | adapter si autre que 4 films |
| `Vingt-huit regards sur la villa.` | adapter si autre que 28 photos galerie |
| `Deux visages de la même villa.` | reste tel quel (jour/nuit reste 2) |

### 4.8 Sections (titres, descriptions de pièces)

Les **9 titres + descriptions** des cartes "Espaces" sont dans `spaces.items[]`.

Les **4 titres + descriptions** des "Films" sont dans `films.items[]`.

Les **12 titres + icônes** des "Amenities" sont dans `amenities.items[]`. Les icônes sont des composants Lucide React — garde des noms valides Lucide (Droplet, Dumbbell, Film, Car, Flame, Wind, BookOpen, Sparkles, Maximize2, Trees, etc.).

---

## 5. Garde-fous

- **Ne touche jamais** à `style.css` ni `script.js` sauf si l'utilisateur le demande — ces fichiers définissent l'identité visuelle commune.
- **Garde la structure de sections intacte** : ordre, IDs, classes. Tu remplaces du contenu, pas de l'architecture.
- **Vérifie l'encodage** : caractères français (é, à, è, œ, …) doivent être en UTF-8 direct, pas en entités HTML, pour rester cohérent avec le template.
- **N'invente jamais** de chiffres ou de coordonnées GPS — si la donnée n'est pas dans le brut, **demande**.
- **Conflits potentiels** : `Villa Rhode` apparaît parfois dans des chemins de fichiers (`assets/videos/villa%20rhodes_...`) — ne pas remplacer dans les chemins, seulement dans le contenu textuel.
- **Backup avant édition massive** : `cp v2.html v2.html.before-villa-swap.bak` avant de lancer la propagation. Supprime les .bak une fois la vérification finale passée.

---

## 6. Si l'utilisateur change d'avis en cours

Si pendant le workflow l'utilisateur modifie une donnée (ex. "non en fait le prix c'est 3 200 000"), **mets à jour `villa.json` d'abord**, puis propage. `villa.json` reste la source de vérité unique.

---

*Dernière mise à jour du template : 2026-05-09 — basé sur Villa Rhode (Christie's International Real Estate)*
