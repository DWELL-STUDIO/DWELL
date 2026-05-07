# Skills

Bundled agent skills for this project. Each skill folder contains a `SKILL.md` (and optional supporting files) that an agent can load to gain specialized capabilities.

## Layout

```
skills/
├── <skill-name>/                 # individual skills (top-level)
├── anthropic-agent-skills/       # skills from the anthropic-agent-skills plugin
├── claude-design-skillstack/     # skills from the claude-design-skillstack plugin
│   ├── animation-components/
│   ├── core-3d-animation/
│   ├── extended-3d-scroll/
│   └── meta-skills/
└── frontend-design-pro/          # skill from the frontend-design-pro plugin
```

## Top-level skills

| Skill | Purpose |
|---|---|
| `getdesign` | Turn a public URL into a 9-section `design.md` spec |
| `find-skills` | Discover and install skills from the open agent skills ecosystem |
| `distinctive-frontend` | Distinctive frontend design guidance |
| `gsap-core` | GSAP core animation engine |
| `gsap-frameworks` | GSAP integration with frameworks |
| `gsap-performance` | GSAP performance tuning |
| `gsap-plugins` | GSAP plugin reference |
| `gsap-react` | GSAP usage in React |
| `gsap-scrolltrigger` | GSAP ScrollTrigger plugin |
| `gsap-timeline` | GSAP Timeline patterns |
| `gsap-utils` | GSAP utility helpers |

## anthropic-agent-skills/

Document, design, and engineering skills:

`algorithmic-art`, `brand-guidelines`, `canvas-design`, `claude-api`, `doc-coauthoring`, `docx`, `frontend-design`, `internal-comms`, `mcp-builder`, `pdf`, `pptx`, `skill-creator`, `slack-gif-creator`, `theme-factory`, `web-artifacts-builder`, `webapp-testing`, `xlsx`

## claude-design-skillstack/

3D and animation skill stack:

- **animation-components/** — `animated-component-libraries`, `animejs`, `lottie-animations`, `react-spring-physics`, `scroll-reveal-libraries`
- **core-3d-animation/** — `babylonjs-engine`, `gsap-scrolltrigger`, `motion-framer`, `react-three-fiber`, `threejs-webgl`
- **extended-3d-scroll/** — `aframe-webxr`, `barba-js`, `lightweight-3d-effects`, `locomotive-scroll`, `pixijs-2d`, `playcanvas-engine`
- **meta-skills/** — `modern-web-design`, `web3d-integration-patterns`

## frontend-design-pro/

Production-grade frontend interface skill with image-prompting/asset guidance.

## Usage

Each skill has a `SKILL.md` with a frontmatter `name` / `description` / `type` and a body explaining when and how to apply it. Point your agent harness at this directory (or copy individual skills into your own setup).

## Provenance

Skills under namespaced directories were sourced from their respective Claude Code plugin caches. Please consult each skill's source/license before redistributing externally.
