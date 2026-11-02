import { createContext, useContext, useEffect, useRef, useState } from 'react';
import * as en from './data';
import * as de from './data.de';
import { Arrow } from './Icons';
import { FactoryMotion, ProjectDiagram, useFactoryRun } from './Diagrams';

export const locales = { en, de };
export const sectionIds = ['home', 'factory', 'projects', 'experience', 'stack', 'about'];
const LocaleContext = createContext({ lang: 'en', setLang() {}, ...en });
const useLocale = () => useContext(LocaleContext);

function detectLanguage() {
  try {
    const saved = localStorage.getItem('lang');
    if (saved === 'en' || saved === 'de') return saved;
  } catch { /* storage unavailable */ }
  return typeof navigator !== 'undefined' && /^de/i.test(navigator.language || '') ? 'de' : 'en';
}

function Tags({ items }) { return <ul className="tags">{items.map(item => <li key={item}>{item}</li>)}</ul>; }

// Motion: scroll reveal with stagger, pointer tilt + light on glass, compact nav on scroll.
// Everything is additive (classes and CSS variables) and switched off under prefers-reduced-motion.
function useMotion(lang) {
  useEffect(() => {
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const targets = document.querySelectorAll('.section .section-head, .section .glass:not(.dialog-inner), .section .project-card, .section .job');
    const observer = new IntersectionObserver(entries => {
      for (const entry of entries) if (entry.isIntersecting) { entry.target.classList.add('is-in'); observer.unobserve(entry.target); }
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });
    targets.forEach(element => {
      if (element.classList.contains('is-in')) return;
      const siblings = [...element.parentElement.children].filter(child => child.matches('.glass, .project-card, .job'));
      element.style.setProperty('--stagger', `${Math.min(siblings.indexOf(element), 8) * 70}ms`);
      element.classList.add('reveal');
      observer.observe(element);
    });
    return () => observer.disconnect();
  }, [lang]);

  useEffect(() => {
    if (matchMedia('(prefers-reduced-motion: reduce)').matches || !matchMedia('(hover: hover) and (pointer: fine)').matches) return;
    let frame = 0;
    const move = event => {
      const card = event.target.closest('.project-card, .portrait, .factory-summary, .stack-panel, .note, .contact-panel');
      if (!card) return;
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const rect = card.getBoundingClientRect();
        const x = (event.clientX - rect.left) / rect.width, y = (event.clientY - rect.top) / rect.height;
        const strength = card.classList.contains('project-card') || card.classList.contains('portrait') ? 5 : 1.6;
        card.style.setProperty('--ry', `${(x - .5) * strength * 2}deg`);
        card.style.setProperty('--rx', `${(.5 - y) * strength * 2}deg`);
        card.style.setProperty('--mx', `${x * 100}%`); card.style.setProperty('--my', `${y * 100}%`);
        card.classList.add('is-lit');
      });
    };
    const leave = event => {
      const card = event.target.closest('.project-card, .portrait, .factory-summary, .stack-panel, .note, .contact-panel');
      if (!card || card.contains(event.relatedTarget)) return;
      card.style.setProperty('--rx', '0deg'); card.style.setProperty('--ry', '0deg'); card.classList.remove('is-lit');
    };
    document.addEventListener('pointermove', move, { passive: true });
    document.addEventListener('pointerout', leave, { passive: true });
    return () => { cancelAnimationFrame(frame); document.removeEventListener('pointermove', move); document.removeEventListener('pointerout', leave); };
  }, []);

  useEffect(() => {
    const nav = document.querySelector('.nav');
    if (!nav) return;
    const onScroll = () => nav.classList.toggle('is-scrolled', window.scrollY > 40);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
}

function useActiveSection() {
  const [active, setActive] = useState('home');
  useEffect(() => {
    const targets = sectionIds.map(id => document.getElementById(id)).filter(Boolean);
    const observer = new IntersectionObserver(entries => {
      const visible = entries.filter(entry => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
      if (visible) setActive(visible.target.id);
    }, { rootMargin: '-40% 0px -50% 0px', threshold: [0, 0.1, 0.5] });
    targets.forEach(target => observer.observe(target));
    return () => observer.disconnect();
  }, []);
  return active;
}

// A glass dialog on top of the native <dialog> element: focus trapping, Escape and backdrop clicks come for free.
export function Dialog({ open, onClose, label, children, wide = false }) {
  const ref = useRef(null);
  const { ui } = useLocale();
  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    if (open && !element.open) { element.showModal(); document.body.style.overflow = 'hidden'; }
    if (!open && element.open) element.close();
    if (!open) document.body.style.overflow = '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);
  return <dialog ref={ref} className={`sheet-dialog ${wide ? 'is-wide' : ''}`} aria-label={label} onClose={onClose} onClick={event => { if (event.target === ref.current) onClose(); }}>
    <div className="dialog-inner glass">
      <button className="dialog-close" onClick={onClose} aria-label={ui.dialog.close}>×</button>
      {open && children}
    </div>
  </dialog>;
}

function Backdrop() {
  return <div className="backdrop" aria-hidden="true"><span className="blob blob-a" /><span className="blob blob-b" /><span className="blob blob-c" /><span className="blob blob-d" /></div>;
}

function Nav({ active }) {
  const [open, setOpen] = useState(false);
  const { lang, setLang, profile, ui } = useLocale();
  return <header className="nav-wrap">
    <nav className={`nav glass ${open ? 'is-open' : ''}`} aria-label="Main navigation">
      <a className="brand" href="#home" onClick={() => setOpen(false)}><span className="brand-mark">AG</span><span className="brand-name">{profile.name}</span></a>
      <button className="menu-toggle" aria-expanded={open} aria-controls="nav-links" onClick={() => setOpen(!open)}>{open ? ui.nav.close : ui.nav.menu}</button>
      <div className="nav-links" id="nav-links">
        {sectionIds.slice(1).map(id => <a key={id} href={`#${id}`} aria-current={active === id ? 'true' : undefined} onClick={() => setOpen(false)}>{ui.nav[id]}</a>)}
        <div className="segment lang-switch" role="group" aria-label="Language / Sprache">
          {['en', 'de'].map(code => <button key={code} aria-pressed={lang === code} lang={code} onClick={() => setLang(code)}>{code.toUpperCase()}</button>)}
        </div>
        <a className="nav-cta" href="#contact" onClick={() => setOpen(false)}>{ui.nav.contact}</a>
      </div>
    </nav>
  </header>;
}

function SectionHead({ eyebrow, title, children, id }) {
  return <header className="section-head">
    <div className="section-head-text">
      <span className="eyebrow">{eyebrow}</span>
      <h2 id={id}>{title}</h2>
      {children && <p className="section-note">{children}</p>}
    </div>
  </header>;
}

function StatusPill({ project }) {
  return <span className={`pill pill-status status-${project.statusKey}`}>{project.statusKey === 'live' && <span className="status-dot" />}{project.status}</span>;
}

function Hero() {
  const { lang, profile, factory, ui } = useLocale();
  const [audience, setAudience] = useState('employer');
  const [showLog, setShowLog] = useState(false);
  const run = useFactoryRun(true, factory.stages);
  const current = profile.audiences[audience];
  return <section className="hero" id="home" aria-labelledby="hero-title">
    <div className="hero-grid">
      <div className="hero-copy">
        <span className="chip glass"><span className="status-dot" />{ui.hero.chip}</span>
        <p className="greeting">{profile.greeting}</p>
        <h1 id="hero-title">{profile.headline[0]}<br />{profile.headline[1]}</h1>
        <div className="audience">
          <span className="audience-label">{ui.hero.audienceLabel}</span>
          <div className="segment" role="group" aria-label={ui.hero.audienceLabel}>
            {Object.entries(profile.audiences).map(([key, item]) => <button key={key} aria-pressed={audience === key} onClick={() => setAudience(key)}>{item.label}</button>)}
          </div>
        </div>
        <p className="hero-intro" key={`${lang}-${audience}`}>{current.text}</p>
        <ul className="proof" key={`proof-${lang}-${audience}`}>{current.proof.map(item => <li key={item}><span className="tick" aria-hidden="true">✓</span>{item}</li>)}</ul>
        <div className="hero-actions">
          <a className="button button-primary" href={current.cta.href}>{current.cta.label} <Arrow /></a>
          <a className="button button-glass glass" href={current.secondary.href} download={current.secondary.download ? 'Anish_Goyal_Resume.pdf' : undefined} target={current.secondary.external ? '_blank' : undefined} rel={current.secondary.external ? 'noreferrer' : undefined}>{current.secondary.label}</a>
        </div>
      </div>
      <figure className="portrait glass">
        <img src="/images/anish-portrait.jpg" alt="Anish Goyal" width="420" height="520" fetchPriority="high" />
        <figcaption><strong>{profile.name}</strong><span>{profile.title}</span><span>{profile.location}</span></figcaption>
      </figure>
    </div>
    <div className="motion-panel glass">
      <div className="motion-head">
        <div><span className="eyebrow">{ui.hero.motionEyebrow}</span><p>{ui.hero.motionText}</p></div>
        <div className="motion-buttons">
          <div className="segment" role="group" aria-label="Animation">
            <button onClick={() => run.setPlaying(!run.playing)} aria-pressed={run.playing}>{run.playing ? ui.hero.pause : ui.hero.play}</button>
            <button onClick={() => { run.setStep(0); run.setPlaying(true); }}>{ui.hero.replay}</button>
          </div>
          <button className="button button-glass glass button-small" aria-expanded={showLog} onClick={() => setShowLog(!showLog)}>{showLog ? ui.hero.hideLog : ui.hero.showLog}</button>
        </div>
      </div>
      <FactoryMotion run={run} showLog={showLog} />
    </div>
  </section>;
}

export function FactoryDetail() {
  const { factory, ui } = useLocale();
  const [hook, setHook] = useState(0);
  const selected = factory.hooks[hook];
  return <div className="dialog-content">
    <span className="eyebrow">{ui.factory.dialogEyebrow}</span>
    <h2>{ui.factory.dialogTitle}</h2>
    <p className="lead">{factory.description}</p>
    <ol className="stage-list">
      {factory.stages.map((stage, index) => <li key={stage.id} className={`stage-row stage-${stage.kind}`}>
        <span className="stage-index">{String(index + 1).padStart(2, '0')}</span>
        <div><h3>{stage.title} <span className={`pill pill-${stage.kind}`}>{ui.kinds[stage.kind]}</span></h3><p>{stage.text}</p></div>
      </li>)}
    </ol>
    <div className="controls">
      <div className="control-block">
        <span className="eyebrow">{ui.factory.commands}</span>
        <div className="commands">{factory.commands.map(command => <code key={command}>{command}</code>)}</div>
      </div>
      <div className="control-block">
        <span className="eyebrow">{ui.factory.hooks}</span>
        <div className="segment" role="group" aria-label="Hooks">{factory.hooks.map((item, index) => <button key={item.file} aria-pressed={hook === index} onClick={() => setHook(index)}>{item.file}</button>)}</div>
        <p className="hook-detail"><span className="pill">{selected.event}</span>{selected.text}</p>
      </div>
    </div>
    <p className="muted small">{factory.origin}</p>
    <a className="button button-primary" href={factory.repo} target="_blank" rel="noreferrer">{ui.factory.repo} <Arrow /></a>
  </div>;
}

function Factory() {
  const { factory, ui } = useLocale();
  const [open, setOpen] = useState(false);
  return <section className="section" id="factory" aria-labelledby="factory-title">
    <SectionHead eyebrow={ui.factory.eyebrow} title={factory.title} id="factory-title">{factory.tagline}</SectionHead>
    <div className="factory-summary glass">
      <div className="factory-points">
        {factory.points.map(point => <div className="point" key={point.title}><h3>{point.title}</h3><p>{point.text}</p></div>)}
      </div>
      <div className="factory-cta">
        <p className="muted">{ui.factory.summary}</p>
        <div className="hero-actions">
          <button className="button button-primary" onClick={() => setOpen(true)}>{ui.factory.open} <Arrow /></button>
          <a className="button button-glass glass" href={factory.repo} target="_blank" rel="noreferrer">{ui.factory.github}</a>
        </div>
      </div>
    </div>
    <Dialog open={open} onClose={() => setOpen(false)} label={factory.title} wide><FactoryDetail /></Dialog>
  </section>;
}

export function ProjectDetail({ project }) {
  const { ui } = useLocale();
  return <div className="dialog-content">
    <span className="eyebrow">{project.kicker}</span>
    <h2>{project.title}</h2>
    <p className="project-org">{project.organization} · <StatusPill project={project} /></p>
    <div className="project-drawing"><ProjectDiagram type={project.diagram} /></div>
    <p className="lead">{project.description}</p>
    <dl className="project-detail">
      <div><dt>{ui.projects.result}</dt><dd>{project.result}</dd></div>
    </dl>
    <Tags items={project.tags} />
    {project.links.length > 0 && <div className="project-links">{project.links.map(link => <a key={link.href} className="button button-primary" href={link.href} target={link.external ? '_blank' : undefined} rel={link.external ? 'noreferrer' : undefined}>{link.label} <Arrow /></a>)}</div>}
  </div>;
}

function Projects() {
  const { projects, alsoProjects, ui } = useLocale();
  const [selected, setSelected] = useState(null);
  const project = projects.find(item => item.id === selected);
  return <section className="section" id="projects" aria-labelledby="projects-title">
    <SectionHead eyebrow={ui.projects.eyebrow} title={ui.projects.title} id="projects-title">{ui.projects.note}</SectionHead>
    <div className="project-grid">
      {projects.map(item => <article className="project-card glass" key={item.id} onClick={() => setSelected(item.id)}>
        <span className="project-card-top"><span className="eyebrow">{item.kicker}</span><StatusPill project={item} /></span>
        <strong>{item.title}</strong>
        <span className="project-card-text">{item.description}</span>
        <span className="project-card-foot">
          <Tags items={item.tags.slice(0, 3)} />
          <span className="card-actions">
            {item.liveUrl && <a className="open-hint live-hint" href={item.liveUrl} target="_blank" rel="noreferrer" onClick={event => event.stopPropagation()}>{ui.projects.live}</a>}
            <button className="open-hint" onClick={event => { event.stopPropagation(); setSelected(item.id); }} aria-haspopup="dialog" aria-label={`${ui.projects.open}: ${item.title}`}>{ui.projects.open} <Arrow /></button>
          </span>
        </span>
      </article>)}
      <div className="project-card also-card glass">
        <span className="eyebrow">{ui.projects.also}</span>
        <ul>{alsoProjects.map(item => <li key={item.title}><strong>{item.title}</strong><span className="meta">{item.meta}</span></li>)}</ul>
      </div>
    </div>
    <Dialog open={Boolean(project)} onClose={() => setSelected(null)} label={project ? project.title : ui.projects.title} wide>{project && <ProjectDetail project={project} />}</Dialog>
  </section>;
}

export function Experience() {
  const { experience, profile, ui } = useLocale();
  return <section className="section" id="experience" aria-labelledby="experience-title">
    <SectionHead eyebrow={ui.experience.eyebrow} title={ui.experience.title} id="experience-title">{ui.experience.note}</SectionHead>
    <div className="timeline">
      {experience.map(job => <details className="job glass" key={job.id}>
        <summary>
          <span className="job-meta"><span className="meta">{job.dates}</span>{job.current && <span className="pill pill-live"><span className="status-dot" />{ui.experience.current}</span>}</span>
          <span className="job-title"><h3>{job.company}</h3><span className="job-role">{job.role}</span></span>
          <span className="job-summary">{job.description}</span>
          <span className="open-hint" aria-hidden="true">{ui.experience.details}</span>
        </summary>
        <div className="job-body">
          <ul>{job.bullets.map(bullet => <li key={bullet}>{bullet}</li>)}</ul>
          <Tags items={job.tags} />
        </div>
      </details>)}
    </div>
    <a className="button button-glass glass" href={profile.resume} download="Anish_Goyal_Resume.pdf">{ui.experience.cv}</a>
  </section>;
}

export function Inventory({ initialCategory = 'AI' }) {
  const { categories, categoryNotes, technologies, ui } = useLocale();
  const [category, setCategory] = useState(initialCategory);
  const allKey = categories[0];
  const selected = category === allKey ? technologies : technologies.filter(tech => tech.category === category);
  const move = (event, name) => {
    if (!['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(event.key)) return;
    event.preventDefault();
    const next = event.key === 'Home' ? 0 : event.key === 'End' ? categories.length - 1 : (categories.indexOf(name) + (event.key === 'ArrowRight' ? 1 : -1) + categories.length) % categories.length;
    setCategory(categories[next]); document.getElementById(`tab-${categories[next]}`)?.focus();
  };
  return <section className="section" id="stack" aria-labelledby="stack-title">
    <SectionHead eyebrow={ui.stack.eyebrow} title={ui.stack.title} id="stack-title">{ui.stack.note}</SectionHead>
    <div className="segment segment-tabs glass" role="tablist" aria-label={ui.stack.title}>{categories.map(name => <button key={name} id={`tab-${name}`} role="tab" aria-selected={category === name} aria-controls="stack-panel" tabIndex={category === name ? 0 : -1} onClick={() => setCategory(name)} onKeyDown={event => move(event, name)}>{name} <small>{name === allKey ? technologies.length : technologies.filter(tech => tech.category === name).length}</small></button>)}</div>
    <div id="stack-panel" role="tabpanel" aria-labelledby={`tab-${category}`} tabIndex={0} className="glass stack-panel">
      <p className="lead">{categoryNotes[category]}</p>
      <ul className="tech-grid">{selected.map(tech => <li key={tech.name}><strong>{tech.name}</strong><span className={`pill ${tech.tone ? `level-${tech.tone}` : ''}`}>{tech.level}</span><span className="meta">{tech.source}</span></li>)}</ul>
    </div>
  </section>;
}

export function Community() {
  const { volunteering, languages, ui } = useLocale();
  return <div className="note glass" id="community">
    <span className="eyebrow">{ui.about.community}</span>
    {volunteering.map(item => <div className="note-row" key={item.title}><strong>{item.title}</strong><span className="meta">{item.org} · {item.dates}</span></div>)}
    <p className="languages">{languages.map(language => <span key={language.name} className="pill">{language.name}{language.level && <small> · {language.level}</small>}</span>)}</p>
  </div>;
}

function About() {
  const { profile, education, ui } = useLocale();
  return <section className="section" id="about" aria-labelledby="about-title">
    <SectionHead eyebrow={ui.about.eyebrow} title={ui.about.title} id="about-title">{profile.summary}</SectionHead>
    <div className="notes-grid">
      <div className="note glass" id="education">
        <span className="eyebrow">{ui.about.education}</span>
        {education.map(item => <div className="note-row" key={item.degree}><strong>{item.degree} <small>({item.original})</small></strong><span>{item.school}</span><span className="meta">{item.dates}{item.current && <span className="pill pill-live"><span className="status-dot" />{ui.about.inProgress}</span>}</span><p>{item.detail}</p></div>)}
      </div>
      <Community />
    </div>
  </section>;
}

function Contact() {
  const { profile, ui } = useLocale();
  return <footer className="section contact" id="contact" aria-labelledby="contact-title">
    <div className="contact-panel glass">
      <span className="eyebrow">{ui.contact.eyebrow}</span>
      <h2 id="contact-title">{ui.contact.title}</h2>
      <p className="lead">{ui.contact.text}</p>
      <a className="contact-email" href={`mailto:${profile.email}`}>{profile.email} <Arrow /></a>
      <div className="contact-links">
        <a className="button button-glass glass" href={profile.github} target="_blank" rel="noreferrer">GitHub ↗</a>
        <a className="button button-glass glass" href={profile.linkedin} target="_blank" rel="noreferrer">LinkedIn ↗</a>
        <a className="button button-glass glass" href={profile.resume} download="Anish_Goyal_Resume.pdf">{ui.contact.cv}</a>
      </div>
    </div>
    <div className="footer-line"><span>© 2026 {profile.name} · {ui.contact.footer}</span><a href="#home">{ui.contact.top}</a></div>
  </footer>;
}

export default function Portfolio({ initialLang }) {
  const [lang, setLangState] = useState(() => initialLang || (typeof window === 'undefined' ? 'en' : detectLanguage()));
  const setLang = code => { setLangState(code); try { localStorage.setItem('lang', code); } catch { /* storage unavailable */ } };
  useEffect(() => { document.documentElement.lang = lang; }, [lang]);
  const active = useActiveSection();
  useMotion(lang);
  const value = { lang, setLang, ...locales[lang] };
  return <LocaleContext.Provider value={value}>
    <a className="skip-link" href="#projects">{value.ui.nav.skip}</a>
    <Backdrop />
    <Nav active={active} />
    <main className="page"><Hero /><Factory /><Projects /><Experience /><Inventory /><About /></main>
    <div className="page"><Contact /></div>
  </LocaleContext.Provider>;
}
