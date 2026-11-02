// Deutsche Fassung. Gleiche Struktur wie data.js; Ausgangspunkt ist der Lebenslauf.
import { factory as factoryEn, technologies as technologiesEn, projects as projectsEn } from './data';

export const profile = {
  name: 'Anish Goyal', firstName: 'Anish', initials: 'AG',
  title: 'Software Engineer · Agentic AI & Python',
  email: 'goyalanish886@gmail.com',
  location: 'Troisdorf, Deutschland', locationShort: 'TROISDORF · DE',
  github: 'https://github.com/Anishyou', linkedin: 'https://bit.ly/4nRsf3h',
  resume: '/documents/Anish_Goyal_Resume.pdf',
  revision: 'REV 2026.10',
  headline: ['Ich baue die Systeme,', 'die Software bauen.'],
  greeting: 'Hi, ich bin Anish.',
  intro: 'Software Engineer mit Fokus auf Agentic AI und Python. Ich entwerfe Multi-Agenten-Pipelines, verbinde Modelle mit echten Backends und teste, was dabei herauskommt. Werkstudent für AI & Automation bei einem deutschen Fintech; M.Sc. Wirtschaftsinformatik an der TUM.',
  summary: 'Ich habe meinen B.Sc. Wirtschaftsinformatik an der Technischen Universität München abgeschlossen und studiere dort jetzt im Master, parallel dazu arbeite ich als Werkstudent für AI & Automation bei einem deutschen Fintech. Mein Schwerpunkt ist Agentic AI und Python, ergänzt durch Erfahrung in Backend-Entwicklung, API-Integration und Service-Tests. Mit Java und Spring Boot habe ich in Uni-Projekten und meiner Bachelorarbeit gearbeitet.',
  audiences: {
    employer: {
      label: 'Ich suche Verstärkung',
      text: 'Ich bin Werkstudent für AI & Automation bei einem deutschen Fintech und studiere derzeit Wirtschaftsinformatik im Master an der TUM, nach meinem Bachelor dort. Ich baue agentische Pipelines in Python, verbinde LLMs mit echten Backends und teste, was dabei herauskommt — Arbeit, bei der Zuverlässigkeit mehr zählt als Demos.',
      proof: ['Werkstudent AI & Automation bei einem deutschen Fintech', 'M.Sc. Wirtschaftsinformatik an der TUM (laufend)', 'Open-Source-Multi-Agenten-Software-Factory'],
      cta: { label: 'Die Factory ansehen', href: '#factory' }, secondary: { label: 'Lebenslauf herunterladen', href: '/documents/Anish_Goyal_Resume.pdf', download: true },
    },
    client: {
      label: 'Ich möchte etwas bauen lassen',
      text: 'Ich helfe kleinen Teams, KI auf ihre eigenen Inhalte und Prozesse anzuwenden: Website-Assistenten, die aus Ihren Seiten und Dokumenten antworten, private Dokumenten-Q&A, die den Rechner nie verlässt, und Automatisierung rund um die Systeme, die Sie bereits nutzen. Einer davon läuft heute live auf einer öffentlichen Website.',
      proof: ['Live-Website-Assistent für FAST TRADE', 'Lokale, private Dokumenten-Q&A', 'Python-Automatisierung & API-Integration'],
      cta: { label: 'Erzählen Sie mir von Ihrem Projekt', href: 'mailto:goyalanish886@gmail.com?subject=Projektanfrage' }, secondary: { label: 'Live-Beispiel ansehen', href: 'https://efasttrade.com/ftt-chatbot', external: true },
    },
  },
};

const stagesDe = {
  brief: { title: 'Build Brief', text: 'Ein schriftliches Produkt-Briefing in docs/build-brief.md: wofür die Software ist, wer sie nutzt, was „fertig“ bedeutet.' },
  supervisor: { title: 'Orchestrierender Skill + Hooks', text: 'Der /factory-Skill steuert die Schleife — init, plan, next, status — und drei Python-Hooks setzen die Regeln durch: guard.py blockiert gefährliche Änderungen und Befehle, gate.py lässt keinen Agenten fertig werden, bevor die Validierung besteht, session-start.py isoliert parallele Jobs in Worktrees.' },
  planner: { title: 'Planner', text: 'Macht aus dem Briefing Meilensteine, Jobs und Anforderungs-IDs — die Roadmap, gegen die jede spätere Stufe geprüft wird.' },
  design: { title: 'Designer', text: 'Erstellt statische HTML/CSS-Mockups für den Job. Bewusst statisch: günstig zu ändern, und noch hängt nichts davon ab.' },
  gate: { title: 'Freigabe durch einen Menschen', text: 'Eine Person prüft die Mockups. Gebaut wird erst nach der Freigabe — der Schritt, der das Ergebnis brauchbar hält.' },
  spec: { title: 'Spec-Writer', text: 'Schreibt die Abnahmekriterien für den Job, rückgebunden an die Anforderungs-IDs des Planners.' },
  tests: { title: 'Test-Writer', text: 'Schreibt fehlschlagende Tests, bevor der Builder startet — etwas Konkretes zum Erfüllen; ein Reviewer prüft später, dass sie nicht aufgeweicht wurden.' },
  build: { title: 'Builder', text: 'Bringt die Tests auf einem Job-Branch zum Bestehen und schreibt ein ADR zu den getroffenen Entscheidungen. gate.py lässt ihn erst aufhören, wenn die Validierung besteht.' },
  review: { title: 'Vier parallele Reviews', text: 'Security (bedrohungsorientierter Diff-Review), UX/UI (startet die App im Browser und vergleicht mit den Mockups) und Code (Korrektheit, und dass die Tests nicht aufgeweicht wurden).' },
  approve: { title: 'Approver', text: 'Prüft Kriterien und die Policies in docs/policies.md, dann Freigabe — oder Eskalation an den Menschen.' },
  output: { title: 'Pull Request', text: 'Ein geprüfter, getesteter Pull Request auf einem geschützten Branch. Ein Mensch merged; der Verifier prüft danach den ganzen Meilenstein gegen das Briefing.' },
};

export const factory = {
  ...factoryEn,
  title: 'Die Software-Factory',
  tagline: 'Ein Produkt-Briefing geht rein. Geprüfte, getestete Pull Requests kommen raus.',
  description: 'Elf Claude-Code-Subagenten, ein orchestrierender Skill und drei Python-Hooks, die aus einem schriftlichen Briefing eine Roadmap machen und dann Feature für Feature bauen. Jedes Feature durchläuft Spec, fehlschlagende Tests, Code, vier parallele Reviews, Freigabe und Pull Request. Die Regeln werden durch Hooks durchgesetzt, nicht durch freundliches Bitten — und nichts landet ohne einen Menschen auf main.',
  origin: 'Open Source unter GPL-3.0. Gestartet von zazencodes’ Software-Factory-Template; erweitert um Designer-Stufe und Freigabe-Gate, Hook-Durchsetzung und parallele Jobs in getrennten Git-Worktrees. Getestet unter Windows (Git Bash) und Linux, im Einsatz in zwei eigenen Repositories.',
  points: [
    { title: 'Design zuerst', text: 'Ein Mensch gibt statische Mockups frei, bevor eine Zeile Backend geschrieben wird.' },
    { title: 'Tests vor Code', text: 'Fehlschlagende Tests entstehen aus der Spec; der Builder muss sie zum Bestehen bringen.' },
    { title: 'Regeln im Code', text: 'Hooks blockieren gefährliche Befehle und lassen keinen Agenten zu früh aufhören.' },
  ],
  hooks: [
    { file: 'guard.py', event: 'PreToolUse', text: 'Blockiert Änderungen an geschützten Dateien sowie gefährliche Git- oder Deploy-Befehle.' },
    { file: 'gate.py', event: 'SubagentStop', text: 'Lässt Builder oder Test-Writer erst fertig werden, wenn die Validierung besteht.' },
    { file: 'session-start.py', event: 'SessionStart', text: 'Markiert Sessions, damit parallele Jobs in getrennten Git-Worktrees laufen.' },
  ],
  stages: factoryEn.stages.map(stage => ({ ...stage, ...stagesDe[stage.id] })),
};

const projectsDe = {
  factory: { title: 'Software-Factory', kicker: 'AGENTIC CODING · EIGENES PROJEKT', organization: 'Open Source · GPL-3.0 · 2026', status: 'IM EINSATZ',
    tags: ['Claude Code', '11 Subagenten', 'Python-Hooks', 'Design zuerst', 'Git-Worktrees'],
    description: 'Elf Claude-Code-Subagenten, ein orchestrierender /factory-Skill und drei Python-Hooks, die aus einem Produkt-Briefing eine Roadmap machen und dann Feature für Feature bauen: Spec, fehlschlagende Tests, Code, vier parallele Reviews, Freigabe, Pull Request.',
    result: 'Geprüfte, getestete Pull Requests aus einem schriftlichen Briefing — und nichts landet ohne einen Menschen auf main.',
    links: [{ label: 'Auf GitHub ansehen', href: 'https://github.com/Anishyou/claude-factory-skill', external: true }] },
  cara: { title: 'CARA — Dialogzugang zu Patientendaten', kicker: 'AGENTIC AI · TUM-PRAKTIKUM', organization: 'M.Sc.-Praktikum, TUM · Partner AlmaPhil · ab Okt. 2026', status: 'IN ARBEIT',
    tags: ['React', 'TypeScript', 'LLM-Agent', 'Tool Calling / MCP', 'FastAPI'],
    description: 'Eine Webanwendung, die Ärztinnen und Ärzten dialogbasierten Zugang zu longitudinalen Patientendaten gibt. Der Assistent sieht dasselbe Dashboard wie die behandelnde Person, Fragen können sich also auf das beziehen, was gerade auf dem Bildschirm ist, und er legt auf Wunsch Dashboard-Widgets an und konfiguriert sie.',
    result: 'Teamprojekt im M.Sc.-Praktikum an der TUM · in Arbeit seit Oktober 2026.', links: [] },
  bjj: { title: 'Agentischer BJJ-Coach aus Video', kicker: 'COMPUTER VISION · FORSCHUNGSPROJEKT, TUM', organization: 'Kurs Autonomous Agents, TUM · Teamprojekt · ab Okt. 2026', status: 'FORSCHUNG · IN ARBEIT',
    tags: ['PyTorch', 'Pose Estimation', 'Temporale Modelle', 'Unsicherheitsbewusster Agent', 'Python'],
    description: 'Ein smartphone-orientierter Prototyp, der eine kurze Brazilian-Jiu-Jitsu-Übung aus monokularem Video analysiert: Er erkennt Positionen und Übergänge über die Zeit, prüft, wie verlässlich seine eigenen Beobachtungen sind, und gibt erst dann Coaching-Feedback — oder hält sich zurück und bittet um einen besseren Kamerawinkel.',
    result: 'Teamprojekt im Kurs Autonomous Agents an der TUM · in Arbeit seit Oktober 2026.', links: [] },
  city: { title: 'KI-Bildinspektion für Städte', kicker: 'COMPUTER VISION · ANGEBOT & ARCHITEKTUR', organization: 'Innowit AI Technologies · kommunale Ausschreibung', status: 'ANGEBOT',
    tags: ['Computer Vision', 'Systemdesign', 'Kostenmodell', 'Cloud'],
    description: 'Systemarchitektur und Hosting-Kostenmodell für einen KI-gestützten Bildinspektionsdienst: Kameras liefern etwa ein Bild pro Sekunde in eine Inferenz-Pipeline mit menschlicher Prüfwarteschlange.',
    result: 'Eine kalkulierte, belastbare Architektur für eine Ausschreibung im kommunalen Maßstab.', links: [] },
  chatbot: { title: 'FAST TRADE Website-Assistent', kicker: 'CONVERSATIONAL AI · LIVE', organization: 'FAST TRADE', status: 'LIVE',
    tags: ['Chatbot', 'Website-Inhalte', 'Dokumente'],
    description: 'Ein Live-Assistent auf efasttrade.com, der Besucherfragen aus den eigenen Seiten der Website und hochgeladenen Dokumenten beantwortet.',
    result: 'Läuft produktiv auf der öffentlichen Website.',
    links: [{ label: 'Live-Assistent öffnen', href: 'https://efasttrade.com/ftt-chatbot', external: true }] },
  logpt: { title: 'LoGPT — lokale PDF-Antworten', kicker: 'LOKALE KI · DOKUMENTE', organization: 'Eigenes Projekt', status: 'FERTIG',
    tags: ['Lokales LLM', 'PDF', 'Question Answering'],
    description: 'Eine lokale GPT-Anwendung, die Fragen zu PDF-Inhalten beantwortet und die relevanten Stellen findet — ohne Dokumente an einen Cloud-Dienst zu senden.',
    result: 'Private Dokumenten-Q&A, die vollständig auf dem Rechner des Nutzers läuft.', links: [] },
  transcription: { title: 'Video-Transkription & interaktive Wiedergabe', kicker: 'BACHELORARBEIT · TUM', organization: 'Technische Universität München', status: 'THESIS',
    tags: ['Java', 'Spring Boot', 'Python', 'Angular'],
    description: 'Backend für Video- und Audiotranskription mit synchronisierten Transkripten und ein Angular-Videoplayer, der dem Transkript beim Abspielen folgt.',
    result: 'Ein funktionierender Thesis-Prototyp: hochladen, transkribieren, abspielen mit klickbarem, synchronem Transkript.', links: [] },
};
export const projects = projectsEn.map(project => ({ ...project, ...projectsDe[project.id] }));

export const alsoProjects = [
  { title: 'Vorlesungs-Streaming-App', meta: 'TUM-Praktikum · Flutter, Go', text: 'Live- und On-Demand-Wiedergabe, Chat, Quizze, Downloads. Beiträge zu CI/CD, UI-Design und Issue-Tracking im agilen Team.' },
  { title: 'Straßenschaden-Erkennung', meta: 'FAST TRADE, Jaipur · Computer Vision', text: 'Datenaufbereitung, Prüfung von Annotationen, Modelltests und -auswertung zur Erkennung von Straßen- und Infrastrukturschäden.' },
  { title: 'Prozess-Schulungsvideos', meta: 'Laufend · Claude, Animation', text: 'Animierte, vertonte Schulungsvideos zu Arbeitsprozessen im Unternehmen, Thema für Thema mit KI-Unterstützung erstellt.' },
];

export const experience = [
  {
    id: 'fintech', rev: 'C', company: 'Auxmoney', role: 'Werkstudent — AI & Automation', dates: 'Okt. 2025 – heute', current: true,
    description: 'KI in Geschäfts- und Entwicklungsprozessen einsetzen, mit Fokus auf verlässliche Backend-Logik und Servicequalität.',
    bullets: [
      'Interne KI-Services mit OpenAI-APIs und Langdock entwickeln und integrieren, um Geschäfts- und Entwicklungsabläufe zu automatisieren.',
      'Backend-Logik für KI-Workflows umsetzen, inklusive Prompt-Verarbeitung, API-Kommunikation, Antwortvalidierung und Fehlerbehandlung.',
      'Synthetische PDF-Testdaten erstellen, um Services und Dokumentverarbeitungs-Workflows zu testen und zu bewerten.',
      'Testszenarien entwerfen, Ergebnisse validieren sowie Funktions- und Integrationstests zur Bewertung von Servicequalität und Zuverlässigkeit durchführen.',
      'Erste praktische Erfahrung mit AWS / Amazon Bedrock, Kafka, Terraform, Kubernetes und Docker; Einsatz von Cursor in der Softwareentwicklung.',
    ], tags: ['OpenAI-APIs', 'Langdock', 'Backend-Logik', 'Service-Tests'],
  },
  {
    id: 'ippen', rev: 'B', company: 'Ippen Digital', role: 'Werkstudent — Produktmanagement', dates: 'Dez. 2023 – Apr. 2024',
    description: 'Produkt-Workflows mit eigenen Java-Backend-Beiträgen verbinden.',
    bullets: ['Beiträge zur Java-Backend-Entwicklung zur Verbesserung von Produktfunktionalität und Systemstabilität.', 'Konfigurationen für rund 80 Websites verwaltet und Produkt- sowie Team-Workflows unterstützt.'],
    tags: ['Java', 'Produkt-Workflows', '~80 Websites'],
  },
  {
    id: 'tum-practical', rev: 'A', company: 'Technische Universität München', role: 'Praktikum Softwareentwicklung', dates: 'Okt. 2023 – Feb. 2024',
    description: 'Eine Vorlesungs-Streaming-Anwendung im agilen Uni-Team gebaut.',
    bullets: ['Vorlesungs-Streaming-Anwendung mit Flutter und Go entwickelt, inklusive Live- und On-Demand-Wiedergabe, Chat, Quizzen und Downloads.', 'Beiträge zu CI/CD, UI-Design und GitHub-Issue-Tracking; Zusammenarbeit im agilen Team und Koordination der Feature-Entwicklung.'],
    tags: ['Flutter', 'Go', 'CI/CD', 'Agile Teamarbeit'],
  },
];

export const categories = ['Alle', 'AI', 'Backend', 'Apps', 'Qualität', 'Infra'];
const categoryKey = { Alle: 'All', AI: 'AI', Backend: 'Backend', Apps: 'Apps', 'Qualität': 'Quality', Infra: 'Infra' };
export const categoryNotes = {
  Alle: 'Alles, womit ich arbeite, mit angegebenem Niveau. Ein Logo ohne Kontext sagt nichts, deshalb steht bei jedem Eintrag, wo er eingesetzt wurde.',
  AI: 'Agentic AI ist der Schwerpunkt: Multi-Agenten-Pipelines mit Claude Code, Tool Calling und MCP, OpenAI-APIs und Langdock im Job, lokale LLMs und PDF-Question-Answering in eigenen Projekten. PyTorch auf Basisniveau.',
  Backend: 'Java, Python, SQL und REST-APIs. Spring Boot aus Uni-Projekten und der Bachelorarbeit; Go aus dem TUM-Praktikum.',
  Apps: 'Frontend- und App-Entwicklung mit Angular, TypeScript, Flutter und Swift.',
  'Qualität': 'Funktions-, API- und Integrationstests, dazu das Tooling für Zusammenarbeit und Auslieferung.',
  Infra: 'Erste praktische Erfahrung in meiner aktuellen Werkstudententätigkeit. Technologien, mit denen ich Erfahrung sammle — keine Expertise, die ich beanspruche.',
};
const levelDe = { 'Main focus': 'Schwerpunkt', 'Daily use': 'Täglich im Einsatz', Work: 'Beruflich', 'Own projects': 'Eigene Projekte', 'Own projects · work': 'Eigene Projekte · beruflich', 'Own projects · university': 'Eigene Projekte · Uni', Basic: 'Grundlagen', 'University · basic': 'Uni · Grundlagen', 'University & thesis': 'Uni & Thesis', 'University practical': 'Uni-Praktikum', Thesis: 'Thesis', 'Initial exposure': 'Erste Erfahrung' };
const sourceDe = { 'Software factory · current role': 'Software-Factory · aktuelle Stelle', 'Current role': 'Aktuelle Stelle', 'Software factory': 'Software-Factory', 'Software factory · CARA': 'Software-Factory · CARA', 'Road defect detection': 'Straßenschaden-Erkennung', 'BJJ coach · road defect detection': 'BJJ-Coach · Straßenschaden-Erkennung', 'Current role · thesis · factory': 'Aktuelle Stelle · Thesis · Factory', 'LoGPT · current role': 'LoGPT · aktuelle Stelle', 'Ippen Digital · thesis': 'Ippen Digital · Thesis', 'Work & university': 'Beruf & Uni', 'Current role · thesis': 'Aktuelle Stelle · Thesis', 'Thesis · university projects': 'Thesis · Uni-Projekte', 'TUM practical course': 'TUM-Praktikum', 'Own projects': 'Eigene Projekte', Everywhere: 'Überall', Work: 'Beruf' };
const categoryDe = Object.fromEntries(Object.entries(categoryKey).map(([de, en]) => [en, de]));
export const technologies = technologiesEn.map(tech => ({ ...tech, category: categoryDe[tech.category], level: levelDe[tech.level] || tech.level, source: sourceDe[tech.source] || tech.source }));

export const education = [
  { school: 'Technische Universität München', degree: 'M.Sc. Wirtschaftsinformatik', original: 'Information Systems', dates: 'Okt. 2026 – heute', current: true, detail: 'Laufend, parallel zu meiner Werkstudententätigkeit.' },
  { school: 'Technische Universität München', degree: 'B.Sc. Wirtschaftsinformatik', original: 'Information Systems', dates: 'Okt. 2022 – Okt. 2026', detail: 'Bachelorarbeit zu Videotranskription und interaktiver Wiedergabe mit Java / Spring Boot, Python und Angular.' },
  { school: 'Unipark Dresden & ESKW Magdeburg', degree: 'Studienkolleg', original: 'Studienvorbereitung', dates: 'März 2019 – Jan. 2020', detail: 'Studienvorbereitende Kurse in Deutschland.' },
];
export const volunteering = [
  { title: 'Vice President, Event Management', org: 'DEGIS Munich City Chapter', dates: 'Sep. 2022 – März 2023' },
  { title: 'Vice President, Marketing Team', org: 'DEGIS Munich City Chapter', dates: 'Sep. 2021 – Sep. 2022' },
];
export const languages = [{ name: 'Deutsch' }, { name: 'Englisch' }, { name: 'Hindi', level: 'Muttersprache' }, { name: 'Türkisch', level: 'Anfänger' }];

export const ui = {
  lang: 'de', langLabel: 'DE', otherLang: 'en', switchLabel: 'English',
  nav: { home: 'Start', factory: 'Factory', projects: 'Projekte', experience: 'Erfahrung', stack: 'Werkzeuge', about: 'Über mich', contact: 'Kontakt', menu: 'Menü', close: 'Schließen', skip: 'Zu den Projekten' },
  hero: { chip: 'Werkstudent · AI & Automation bei einem deutschen Fintech', audienceLabel: 'Sie sind hier, weil …', motionEyebrow: 'Woran ich gerade baue', motionText: 'Eine Software-Factory: ein Briefing geht rein, geprüfte Pull Requests kommen raus. Ein Durchlauf — jede Stufe lässt sich anklicken.', play: 'Abspielen', pause: 'Pause', replay: 'Nochmal', showLog: 'Run-Log anzeigen', hideLog: 'Run-Log ausblenden' },
  factory: { eyebrow: 'Hauptprojekt', summary: 'Elf Claude-Code-Subagenten, ein orchestrierender Skill, drei Python-Hooks. Open Source.', open: 'Die 10 Stufen öffnen', github: 'GitHub ↗', dialogEyebrow: 'Die Software-Factory · ein Durchlauf von innen', dialogTitle: 'Zehn Stufen, ein menschliches Gate.', commands: 'Befehle', hooks: 'Hooks — Regeln im Code durchgesetzt', repo: 'Repository ansehen' },
  kinds: { agent: 'Agent', human: 'Mensch', input: 'Eingabe', output: 'Ergebnis' },
  projects: { eyebrow: 'Ausgewählte Arbeiten', title: 'Projekte', note: 'Sieben Dinge, die ich gebaut oder entworfen habe oder gerade baue. Eines öffnen, um zu sehen, wie es aufgebaut ist.', open: 'Öffnen', live: 'Live ↗', also: 'Außerdem', myPart: 'Mein Teil', result: 'Ergebnis' },
  experience: { eyebrow: 'Wo die Arbeit echt wird', title: 'Erfahrung', note: 'Neueste zuerst. Eine Station aufklappen für die Details.', current: 'Aktuell', details: 'Details +', cv: 'Lebenslauf (PDF)' },
  stack: { eyebrow: 'Werkzeuge', title: 'Womit ich arbeite', note: 'Mit angegebenem Niveau — erste Erfahrung heißt erste Erfahrung.', all: 'Alle' },
  about: { eyebrow: 'Ein bisschen mehr', title: 'Über mich', education: 'Ausbildung', community: 'Engagement & Sprachen', inProgress: 'Laufend' },
  contact: { eyebrow: 'Wie geht’s weiter', title: 'Lassen Sie uns etwas Gutes bauen.', text: 'Eine Stelle, ein Projekt oder einfach eine Frage zur Factory? Schreiben Sie mir — eine kurze E-Mail genügt.', cv: 'Lebenslauf ↓', top: 'Nach oben ↑', footer: 'Software Engineer · Troisdorf, Deutschland' },
  dialog: { close: 'Schließen' },
};
