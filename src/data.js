// Biographical details are sourced from the supplied Anish Goyal resume.
// Project descriptions describe real work; where a figure is illustrative it is labelled as such in the UI.

export const profile = {
  name: 'Anish Goyal', firstName: 'Anish', initials: 'AG',
  title: 'Software Engineer · Agentic AI & Python',
  email: 'goyalanish886@gmail.com',
  location: 'Troisdorf, Germany', locationShort: 'TROISDORF · DE',
  github: 'https://github.com/Anishyou', linkedin: 'https://bit.ly/4nRsf3h',
  resume: '/documents/Anish_Goyal_Resume.pdf',
  revision: 'REV 2026.10',
  headline: ['I build the systems', 'that build software.'],
  greeting: 'Hi, I’m Anish.',
  intro: 'Software engineer focused on agentic AI and Python. I design multi-agent pipelines, connect models to real backends, and test what comes out. Werkstudent in AI & Automation at a German fintech; M.Sc. Information Systems at TUM in progress.',
  audiences: {
    employer: {
      label: 'I’m hiring',
      text: 'I’m a working student (Werkstudent) in AI & Automation at a German fintech and currently doing my M.Sc. in Information Systems at TUM, after completing my B.Sc. there. I build agentic pipelines in Python, connect LLMs to real backends, and test what comes out — the kind of work where reliability matters more than demos.',
      proof: ['Werkstudent, AI & Automation at a German fintech', 'M.Sc. Information Systems at TUM (in progress)', 'Open-source multi-agent software factory'],
      cta: { label: 'See the factory', href: '#factory' }, secondary: { label: 'Download CV', href: '/documents/Anish_Goyal_Resume.pdf', download: true },
    },
    client: {
      label: 'I need something built',
      text: 'I help small teams put AI to work on their own content and processes: website assistants that answer from your pages and documents, private document Q&A that never leaves your machine, and automation around the systems you already run. One of them is live on a public website today.',
      proof: ['Live website assistant for FAST TRADE', 'Local, private document Q&A', 'Python automation & API integration'],
      cta: { label: 'Tell me about your project', href: 'mailto:goyalanish886@gmail.com?subject=Project%20enquiry' }, secondary: { label: 'See the live example', href: 'https://efasttrade.com/ftt-chatbot', external: true },
    },
  },
  summary: 'I hold a B.Sc. in Information Systems from the Technical University of Munich and am now studying for my M.Sc. there, while working as a Werkstudent in AI & Automation at a German fintech. My focus is agentic AI and Python, supported by experience in backend development, API integration, and service testing. I’ve also worked with Java and Spring Boot in university projects and my bachelor’s thesis.',
};

// The software factory: github.com/Anishyou/claude-factory-skill
// Stage descriptions follow the repository README.
export const factory = {
  title: 'The Software Factory',
  tagline: 'A product brief goes in. Reviewed, tested pull requests come out.',
  repo: 'https://github.com/Anishyou/claude-factory-skill',
  description: 'Eleven Claude Code subagents, one orchestrating skill and three Python hooks that turn a written brief into a roadmap and then build features one at a time. Each feature moves through a spec, failing tests, code, four parallel reviews, approval and a pull request. The rules are enforced by hooks, not by asking the model nicely — and nothing reaches main without a human.',
  points: [
    { title: 'Design first', text: 'A human approves static mockups before a line of backend is written.' },
    { title: 'Tests before code', text: 'Failing tests are written from the spec; the builder’s job is to make them pass.' },
    { title: 'Rules in code', text: 'Hooks block dangerous commands and refuse to let an agent finish early.' },
  ],
  origin: 'Open source under GPL-3.0. Started from zazencodes’ software-factory template; extended with the designer stage and approval gate, hook enforcement, and parallel jobs in separate git worktrees. Tested on Windows (Git Bash) and Linux, in use on two of my own repositories.',
  commands: ['/factory init', '/factory plan', '/factory next', '/factory status', '/factory allow'],
  hooks: [
    { file: 'guard.py', event: 'PreToolUse', text: 'Blocks edits to protected files and dangerous git or deploy commands.' },
    { file: 'gate.py', event: 'SubagentStop', text: 'Stops the builder or test-writer from finishing until validation passes.' },
    { file: 'session-start.py', event: 'SessionStart', text: 'Tags sessions so parallel jobs run in separate git worktrees.' },
  ],
  stages: [
    { id: 'brief', label: 'BRIEF', title: 'Build brief', kind: 'input', text: 'A written product brief in docs/build-brief.md: what the software is for, who uses it, what “done” means.', log: '› docs/build-brief.md — example: “call notes & follow-ups for a sales team”' },
    { id: 'supervisor', label: '/FACTORY', title: 'Orchestrating skill + hooks', kind: 'agent', text: 'The /factory skill runs the loop — init, plan, next, status — and three Python hooks enforce the rules: guard.py blocks dangerous edits and commands, gate.py refuses to let an agent finish before validation passes, session-start.py isolates parallel jobs in worktrees.', log: '/factory plan · 11 subagents · hooks armed: guard · gate · session-start' },
    { id: 'planner', label: 'PLANNER', title: 'Planner', kind: 'agent', text: 'Turns the brief into milestones, jobs and requirement IDs — the roadmap every later stage is checked against.', log: 'planner      3 milestones · 12 jobs · requirements R-01 … R-27' },
    { id: 'design', label: 'DESIGN', title: 'Designer', kind: 'agent', text: 'Produces static HTML/CSS mockups for the job. Static on purpose: cheap to change, and nothing downstream depends on it yet.', log: 'designer     static mockups for job J-04 · awaiting approval' },
    { id: 'gate', label: 'APPROVE', title: 'Human approval gate', kind: 'human', text: 'A person reviews the mockups. Nothing is built until they are approved — the step that keeps the output usable.', log: 'human        ✓ mockups approved' },
    { id: 'spec', label: 'SPEC', title: 'Spec-writer', kind: 'agent', text: 'Writes the acceptance criteria for the job, tied back to the planner’s requirement IDs.', log: 'spec-writer  6 acceptance criteria for J-04' },
    { id: 'tests', label: 'TESTS', title: 'Test-writer', kind: 'agent', text: 'Writes failing tests before the builder starts, so there is something concrete to satisfy — and a reviewer later checks they were not weakened.', log: 'test-writer  9 failing tests written before any code' },
    { id: 'build', label: 'BUILD', title: 'Builder', kind: 'agent', text: 'Makes the tests pass on a job branch and writes an ADR for the decisions taken. gate.py will not let it stop until validation passes.', log: 'builder      branch job/J-04 · 9/9 passing · ADR-004 · gate.py ✓' },
    { id: 'review', label: 'REVIEW ×4', title: 'Four parallel reviews', kind: 'agent', text: 'Security (threat-focused diff review), UX/UI (runs the app in a browser and compares it to the mockups), and code (correctness, and that the tests were not weakened).', log: 'reviews ×4   security ✓ · ux/ui ✓ browser vs mockup · code: 1 fix → builder' },
    { id: 'approve', label: 'APPROVER', title: 'Approver', kind: 'agent', text: 'Checks the criteria and the policies in docs/policies.md, then approves — or escalates to the human.', log: 'approver     criteria ✓ · policies ✓ → approved' },
    { id: 'output', label: 'PR', title: 'Pull request', kind: 'output', text: 'A reviewed, tested pull request on a protected branch. A human merges it; the verifier then checks the whole milestone against the brief.', log: 'done         PR #4 opened · nothing reaches main without a human' },
  ],
};

export const projects = [
  {
    id: 'factory', sheet: '02.1', title: 'Software Factory', kicker: 'AGENTIC CODING · OWN PROJECT',
    organization: 'Open source · GPL-3.0 · 2026', status: 'IN USE', statusKey: 'active',
    tags: ['Claude Code', '11 subagents', 'Python hooks', 'Design-first', 'Git worktrees'], diagram: 'factory',
    description: 'Eleven Claude Code subagents, an orchestrating /factory skill and three Python hooks that turn a product brief into a roadmap, then build features one at a time: spec, failing tests, code, four parallel reviews, approval, pull request.',
    result: 'Reviewed, tested pull requests from a written brief — and nothing reaches main without a human.',
    links: [{ label: 'View on GitHub', href: 'https://github.com/Anishyou/claude-factory-skill', external: true }],
  },
  {
    id: 'cara', sheet: '02.1b', title: 'CARA — Conversational Access to Patient Records', kicker: 'AGENTIC AI · TUM PRACTICAL COURSE',
    organization: 'M.Sc. practical course, TUM · partner AlmaPhil · from Oct 2026', status: 'IN PROGRESS', statusKey: 'progress',
    tags: ['React', 'TypeScript', 'LLM agent', 'Tool calling / MCP', 'FastAPI'], diagram: 'cara',
    description: 'A web application that gives doctors conversational access to longitudinal patient data. The assistant sees the same dashboard as the doctor, so questions can refer to what is on screen, and it can create and configure dashboard widgets on request.',
    result: 'Team project in the M.Sc. practical course at TUM · in progress since October 2026.',
    links: [],
  },
  {
    id: 'bjj', sheet: '02.1c', title: 'Agentic BJJ Coach from Video', kicker: 'COMPUTER VISION · RESEARCH PROJECT, TUM',
    organization: 'Autonomous Agents course, TUM · team project · from Oct 2026', status: 'RESEARCH · IN PROGRESS', statusKey: 'progress',
    tags: ['PyTorch', 'Pose estimation', 'Temporal models', 'Uncertainty-aware agent', 'Python'], diagram: 'bjj',
    description: 'A smartphone-oriented prototype that analyses a short Brazilian Jiu-Jitsu drill from monocular video: it recognises positions and transitions over time, checks how reliable its own observations are, and only then gives coaching feedback — or abstains and asks for a better camera angle.',
    result: 'Team project in the Autonomous Agents course at TUM · in progress since October 2026.',
    links: [],
  },
  {
    id: 'city', sheet: '02.2', title: 'AI City Image Inspection', kicker: 'COMPUTER VISION · PROPOSAL & ARCHITECTURE',
    organization: 'Innowit AI Technologies · municipal bid', status: 'PROPOSAL', statusKey: 'proposal',
    tags: ['Computer vision', 'System design', 'Cost modelling', 'Cloud'], diagram: 'city',
    description: 'System architecture and hosting cost model for an AI-powered city image inspection service: cameras streaming roughly one image per second each into an inference pipeline with a human review queue.',
    result: 'A costed, defensible architecture for a bid at municipal scale.',
    links: [],
  },
  {
    id: 'chatbot', sheet: '02.3', title: 'FAST TRADE Website Assistant', kicker: 'CONVERSATIONAL AI · LIVE',
    organization: 'FAST TRADE', status: 'LIVE', statusKey: 'live',
    tags: ['Chatbot', 'Website content', 'Documents'], diagram: 'chatbot',
    liveUrl: 'https://efasttrade.com/ftt-chatbot',
    description: 'A live assistant on efasttrade.com that answers visitor questions from the website’s own pages and uploaded documents.',
    result: 'Running in production on the public website.',
    links: [{ label: 'Open live assistant', href: 'https://efasttrade.com/ftt-chatbot', external: true }],
  },
  {
    id: 'logpt', sheet: '02.4', title: 'LoGPT — Local PDF Answers', kicker: 'LOCAL AI · DOCUMENTS',
    organization: 'Independent', status: 'DONE', statusKey: 'done',
    tags: ['Local LLM', 'PDF', 'Question answering'], diagram: 'logpt',
    description: 'A local GPT application that answers questions about PDF content and finds the relevant passages — without sending documents to a cloud service.',
    result: 'Private document Q&A that runs entirely on the user’s machine.',
    links: [],
  },
  {
    id: 'transcription', sheet: '02.5', title: 'Video Transcription & Interactive Playback', kicker: 'BACHELOR’S THESIS · TUM',
    organization: 'Technical University of Munich', status: 'THESIS', statusKey: 'thesis',
    tags: ['Java', 'Spring Boot', 'Python', 'Angular'], diagram: 'transcription',
    description: 'Backend for video and audio transcription with synchronised transcripts, and an Angular video player that follows the transcript as it plays.',
    result: 'A working thesis prototype: upload, transcribe, play back with a clickable synced transcript.',
    links: [],
  },
];

export const alsoProjects = [
  { title: 'Lecture Streaming App', meta: 'TUM practical course · Flutter, Go', text: 'Live and on-demand playback, chat, quizzes, downloads. Contributed to CI/CD, UI design and issue tracking in an agile team.' },
  { title: 'Road Defect Detection', meta: 'FAST TRADE, Jaipur · Computer vision', text: 'Data preparation, annotation review, model testing and evaluation for road and infrastructure defect detection.' },
  { title: 'Process Training Videos', meta: 'Ongoing · Claude, animation', text: 'Animated, narrated training videos about company work processes, produced topic by topic with AI assistance.' },
];

export const experience = [
  {
    id: 'fintech', rev: 'C', company: 'Auxmoney', role: 'Werkstudent (Working Student) — AI & Automation', dates: 'Oct 2025 – Present', current: true,
    description: 'Applying AI to business and development workflows, with a focus on dependable backend logic and service quality.',
    bullets: [
      'Develop and integrate internal AI services using OpenAI APIs and Langdock to automate business and development workflows.',
      'Implement backend logic for AI workflows, including prompt processing, API communication, response validation, and error handling.',
      'Create synthetic PDF test data to test and evaluate services and document-processing workflows.',
      'Design test scenarios, validate outputs, and perform functional and integration tests to assess service quality and reliability.',
      'Gain initial hands-on exposure to AWS / Amazon Bedrock, Kafka, Terraform, Kubernetes, and Docker; use Cursor in software development.',
    ], tags: ['OpenAI APIs', 'Langdock', 'Backend logic', 'Service testing'],
  },
  {
    id: 'ippen', rev: 'B', company: 'Ippen Digital', role: 'Working Student — Product Management', dates: 'Dec 2023 – Apr 2024',
    description: 'Connecting product workflows with hands-on Java backend contributions.',
    bullets: ['Contributed to Java backend development to improve product functionality and system reliability.', 'Managed configurations for approximately 80 websites and supported product and team workflows.'],
    tags: ['Java', 'Product workflows', '~80 websites'],
  },
  {
    id: 'tum-practical', rev: 'A', company: 'Technical University of Munich', role: 'Software Development Practical Course', dates: 'Oct 2023 – Feb 2024',
    description: 'Building a lecture-streaming application in an agile university team.',
    bullets: ['Developed a lecture-streaming application with Flutter and Go, including live and on-demand playback, chat, quizzes, and downloads.', 'Contributed to CI/CD, UI design, and GitHub issue tracking; collaborated in an agile team and coordinated feature development.'],
    tags: ['Flutter', 'Go', 'CI/CD', 'Agile teamwork'],
  },
];

export const categories = ['All', 'AI', 'Backend', 'Apps', 'Quality', 'Infra'];
export const categoryNotes = {
  All: 'Everything I work with, with the level stated. A logo without context says nothing, so each line names where it was used.',
  AI: 'Agentic AI is the main focus: multi-agent pipelines with Claude Code, tool calling and MCP, OpenAI APIs and Langdock at work, local LLMs and PDF question answering in my own projects. PyTorch is basic.',
  Backend: 'Java, Python, SQL and REST APIs. Spring Boot comes from university projects and my thesis; Go from the TUM practical course.',
  Apps: 'Frontend and app development with Angular, TypeScript, Flutter and Swift.',
  Quality: 'Functional, API and integration testing, plus the collaboration and delivery tooling around it.',
  Infra: 'Initial hands-on exposure through my current working-student role. These are technologies I am gaining experience with, not claiming expertise in.',
};
const t = (name, category, source, level, tone) => ({ name, category, source, level, tone });
export const technologies = [
  t('Agentic AI', 'AI', 'Software factory · current role', 'Main focus', 'strong'),
  t('Claude Code', 'AI', 'Software factory', 'Daily use', 'strong'),
  t('MCP · tool calling', 'AI', 'Software factory · CARA', 'Own projects · university'),
  t('OpenAI APIs', 'AI', 'Current role', 'Work'),
  t('Langdock', 'AI', 'Current role', 'Work'),
  t('Open-source LLMs', 'AI', 'LoGPT', 'Own projects'),
  t('PDF question answering', 'AI', 'LoGPT · current role', 'Own projects · work'),
  t('Cursor', 'AI', 'Current role', 'Work'),
  t('PyTorch', 'AI', 'BJJ coach · road defect detection', 'University · basic', 'weak'),
  t('Python', 'Backend', 'Current role · thesis · factory', 'Work'),
  t('Java', 'Backend', 'Ippen Digital · thesis', 'Work'),
  t('SQL', 'Backend', 'Work & university', 'Work'),
  t('REST APIs', 'Backend', 'Current role · thesis', 'Work'),
  t('Spring Boot', 'Backend', 'Thesis · university projects', 'University & thesis'),
  t('Go', 'Backend', 'TUM practical course', 'University practical'),
  t('Angular', 'Apps', 'Thesis', 'Thesis'),
  t('TypeScript', 'Apps', 'Thesis', 'Thesis'),
  t('Flutter', 'Apps', 'TUM practical course', 'University practical'),
  t('Swift', 'Apps', 'Own projects', 'Own projects'),
  t('Functional testing', 'Quality', 'Current role', 'Work'),
  t('API testing', 'Quality', 'Current role', 'Work'),
  t('Integration testing', 'Quality', 'Current role', 'Work'),
  t('Postman', 'Quality', 'Current role', 'Work'),
  t('CI/CD', 'Quality', 'TUM practical course', 'University practical'),
  t('Git · GitHub · GitLab', 'Quality', 'Everywhere', 'Daily use', 'strong'),
  t('Atlassian', 'Quality', 'Current role', 'Work'),
  ...['AWS', 'Amazon Bedrock', 'Kafka', 'Terraform', 'Kubernetes', 'Docker'].map(name => t(name, 'Infra', 'Current role', 'Initial exposure', 'weak')),
];

export const education = [
  { school: 'Technical University of Munich', degree: 'M.Sc. Information Systems', original: 'Wirtschaftsinformatik', dates: 'Oct 2026 – Present', current: true, detail: 'In progress, alongside my working-student job.' },
  { school: 'Technical University of Munich', degree: 'B.Sc. Information Systems', original: 'Wirtschaftsinformatik', dates: 'Oct 2022 – Oct 2026', detail: 'Bachelor’s thesis in video transcription and interactive playback, using Java / Spring Boot, Python, and Angular.' },
  { school: 'Unipark Dresden & ESKW Magdeburg', degree: 'Studienkolleg', original: 'University Preparatory Programme', dates: 'Mar 2019 – Jan 2020', detail: 'University preparatory studies in Germany.' },
];
export const volunteering = [
  { title: 'Vice President, Event Management', org: 'DEGIS Munich City Chapter', dates: 'Sep 2022 – Mar 2023' },
  { title: 'Vice President, Marketing Team', org: 'DEGIS Munich City Chapter', dates: 'Sep 2021 – Sep 2022' },
];
export const languages = [{ name: 'German' }, { name: 'English' }, { name: 'Hindi', level: 'Native' }, { name: 'Turkish', level: 'Beginner' }];

// Interface strings (English). The German file mirrors this shape exactly.
export const ui = {
  lang: 'en', langLabel: 'EN', otherLang: 'de', switchLabel: 'Deutsch',
  nav: { home: 'Home', factory: 'Factory', projects: 'Projects', experience: 'Experience', stack: 'Toolkit', about: 'About', contact: 'Contact', menu: 'Menu', close: 'Close', skip: 'Skip to projects' },
  hero: { chip: 'Werkstudent · AI & Automation at a German fintech', audienceLabel: 'You are here because…', motionEyebrow: 'What I’m building right now', motionText: 'A software factory: a brief goes in, reviewed pull requests come out. Watch one run — click any stage to inspect it.', play: 'Play', pause: 'Pause', replay: 'Replay', showLog: 'Show run log', hideLog: 'Hide run log' },
  factory: { eyebrow: 'Flagship project', summary: 'Eleven Claude Code subagents, one orchestrating skill, three Python hooks. Open source.', open: 'Open the 10 stages', github: 'GitHub ↗', dialogEyebrow: 'The software factory · inside a run', dialogTitle: 'Ten stages, one human gate.', commands: 'Commands', hooks: 'Hooks — rules enforced in code', repo: 'View the repository' },
  kinds: { agent: 'Agent', human: 'Human', input: 'Input', output: 'Output' },
  projects: { eyebrow: 'Selected work', title: 'Projects', note: 'Seven things I’ve built, designed or am building right now. Open one to see how it’s put together.', open: 'Open', live: 'Live ↗', also: 'Also on file', myPart: 'My part', result: 'Result' },
  experience: { eyebrow: 'Where the work gets real', title: 'Experience', note: 'Newest first. Expand a role for the details.', current: 'Current', details: 'Details +', cv: 'Full CV (PDF)' },
  stack: { eyebrow: 'Toolkit', title: 'What I work with', note: 'With the level stated — exposure is listed as exposure.', all: 'All' },
  about: { eyebrow: 'A little more', title: 'About', education: 'Education', community: 'Community & languages', inProgress: 'In progress' },
  contact: { eyebrow: 'What’s next', title: 'Let’s build something good.', text: 'A role, a project, or just a question about the factory? Say hello — a short email is all it takes.', cv: 'CV ↓', top: 'Back to top ↑', footer: 'Software engineer · Troisdorf, Germany' },
  dialog: { close: 'Close' },
};
