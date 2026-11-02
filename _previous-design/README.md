# Anish Goyal — Software Engineer

A React + Vite portfolio with an off-white, ink navy, and cobalt editorial design. The introduction leads with Anish’s stated strengths in agentic AI and Python. Career content is grounded in the supplied CV; the FAST TRADE live project URL was supplied by Anish.

## Preview and development

Open `preview.html` directly in a browser, keeping the `public/` folder beside it. Or run:

```sh
npm install
npm run dev
npm run build
npm run check
```

The build refreshes `dist/` and the standalone `preview.html`. Node.js 20.19+ or 22.12+ is required. No external AI service is needed.

## Current design

- A personal introduction, portrait, immediate project and CV links, and concise career context.
- Featured work: the transcription thesis, FAST TRADE chatbot, and LoGPT. FAST TRADE links directly to https://efasttrade.com/ftt-chatbot with the label “Live website”.
- Lecture streaming and road defect detection have matching preview cards and project dialogs.
- Project dialogs explain the work and individual contributions. SVG visuals are explicitly identified as concept illustrations, not product screenshots.
- Visible professional experience, with expandable responsibilities.
- Keyboard-accessible technology filters that preserve distinctions between university experience, basic skills, and initial exposure.
- Education, DEGIS community work, and languages.
- Contact links and the original, unchanged CV download.
- A resume guide with predefined answers and no external model.
- Responsive layouts, native dialog focus handling, visible keyboard focus, and reduced-motion support.

## Source

- `src/Portfolio.jsx`: active portfolio components and dialogs.
- `src/portfolio.css`: active theme and responsive layouts.
- `src/data.js`: biography, projects, live links, skills, and experience.
- `src/ProjectArtwork.jsx`: distinct, code-built concept previews for all five projects.
- `src/ProjectVisual.jsx`: additional illustrative project diagrams.
- `src/guide.js`: resume guide answers.
- `src/hooks.js`: dialog lifecycle and retained legacy scroll helpers.

The previous design remains in `src/App.jsx` and its styles; it is not imported by the current entry point. The `visibleSections` configuration in `data.js` applies only to that previous design.

## Verification

`npm run check` checks server rendering, navigation targets, all project dialogs, resume details, technology categories, guide answers, local assets, the unchanged CV, and standalone-preview syntax. Browser checks are performed separately for desktop/mobile layout and interactions.
