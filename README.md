# Anish Goyal — Software Engineer · Agentic AI & Python

A React + Vite portfolio in a liquid-glass style: frosted translucent panels over a slowly moving colour field, rounded geometry, tight sans-serif type. The flagship is the [Software Factory](https://github.com/Anishyou/claude-factory-skill), shown as an animated control-flow diagram with an illustrative run log.

## Development

```sh
npm install
npm run dev      # local server
npm run build    # refreshes dist/ and the standalone preview.html
npm run check    # content, navigation and asset checks
```

Node.js 20.19+ or 22.12+. Open `preview.html` directly in a browser (keep `public/` beside it) for a server-free preview.

## Sections

| Section | What it shows |
|---|---|
| Home | Headline, portrait, and the animated factory run (`FactoryMotion`) with its run log |
| Factory | Stage-by-stage description, `/factory` commands, the three hooks |
| Projects | Each project as its real architecture diagram, with contribution and result |
| Experience | Roles, newest first |
| Toolkit | Technologies with the level and place of use stated |
| About | Education, community, languages |
| Contact | Email, phone, links, CV download |

## Source

- `src/data.js` — all English copy and interface strings (`ui`): profile, audiences, factory stages and hooks, projects, experience, technologies, education.
- `src/data.de.js` — the German version with the same shape; the language switch in the nav toggles between the two (default follows the browser language, choice is remembered).
- `src/Portfolio.jsx` — sections, floating glass navigation, colour-field backdrop.
- `src/Diagrams.jsx` — drawing primitives (`Box`, `Wire`, `Note`, `Dim`, `Boundary`), the factory animation, and the per-project architecture drawings.
- `src/portfolio.css` — the glass design system (`.glass`), tokens and responsive rules.
- `scripts/check.mjs` — server-render checks; `scripts/export-preview.mjs` — builds `preview.html`.

`_previous-design/` holds the earlier editorial design for reference; nothing in it is imported. Project drawings animate in on scroll and respect `prefers-reduced-motion`. The run log in the factory animation is labelled illustrative — stage names and rules come from the repository README, the counts are examples.

## Content to confirm

- The city inspection project names Innowit AI Technologies and a municipal bid; check that the client may be named publicly.
- `public/og.png` is generated from the built hero; regenerate it after visual changes.
# Portfolio_Anish
