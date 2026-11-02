import { useCallback, useEffect, useRef, useState } from 'react';
import { profile, experience, projects, categories, categoryNotes, technologies, education, volunteering, languages } from './data';
import { Arrow, TechIcon } from './Icons';
import { useDialog } from './hooks';
import { getGuideReply } from './guide';
import ProjectVisual from './ProjectArtwork';

function Label({ children }) { return <p className="eyebrow">{children}</p>; }
function Tags({ items }) { return <div className="tags">{items.map(item => <span key={item}>{item}</span>)}</div>; }

function Header() {
  const [open, setOpen] = useState(false);
  return <header className="site-header wrap">
    <a className="brand" href="#home" aria-label="Anish Goyal, home"><span className="monogram">ag.</span><span>Anish Goyal<span className="brand-subtitle">SOFTWARE ENGINEER</span></span></a>
    <button className="menu-toggle" aria-expanded={open} aria-controls="main-nav" onClick={() => setOpen(!open)}>{open ? 'Close' : 'Menu'} <span aria-hidden="true">{open ? '−' : '+'}</span></button>
    <nav id="main-nav" className={open ? 'nav is-open' : 'nav'} aria-label="Main navigation" onKeyDown={event => { if (event.key === 'Escape') { setOpen(false); document.querySelector('.menu-toggle')?.focus(); } }}>
      {[['projects', 'Work'], ['experience', 'Experience'], ['about', 'About']].map(([id, text]) => <a key={id} href={`#${id}`} onClick={() => setOpen(false)}>{text}</a>)}
      <a href="#contact" className="nav-contact" onClick={() => setOpen(false)}>Let’s talk <Arrow /></a>
    </nav>
  </header>;
}

function Hero() {
  return <section className="hero wrap" id="home" aria-labelledby="hero-title">
    <div className="hero-copy"><Label><span className="status-dot" /> AGENTIC AI · PYTHON · BACKEND</Label>
      <h1 id="hero-title">Good software.<br />Built with<br /><em>care.</em><span className="hero-asterisk" aria-hidden="true">✳</span></h1>
      <p className="hero-intro">I’m Anish, a software engineer focused on agentic AI, Python, and practical automation.</p>
      <p className="hero-detail">I enjoy connecting AI with the tools, data, and backend logic that turn complex tasks into useful workflows.</p>
      <div className="hero-actions"><a className="button button-primary" href="#projects">Explore my work <Arrow /></a><a className="text-link" href={profile.resume} download="Anish_Goyal_Resume.pdf">Download CV <span aria-hidden="true">↓</span></a></div>
      <p className="hero-location">{profile.location}</p>
    </div>
    <figure className="portrait"><div className="portrait-image"><img src="/images/anish-portrait.jpg" alt="Anish Goyal outdoors by the river at dusk" fetchPriority="high" /><span className="portrait-index" aria-hidden="true">AG — 01</span></div><figcaption><span>A little curiosity. A lot of building.</span><span aria-hidden="true">↗</span></figcaption><div className="portrait-note"><span className="status-dot" /><span>Currently at <strong>auxmoney</strong><small>AI & Automation</small></span></div></figure>
    <div className="hero-foot"><span>ENGINEERING, WITH PRODUCT IN MIND.</span><a href="#projects">SCROLL TO EXPLORE <span aria-hidden="true">↓</span></a></div>
  </section>;
}

function Credentials() {
  return <div className="credentials wrap" aria-label="Experience at a glance"><span className="credentials-label">A FOUNDATION IN<br />RESEARCH & REAL WORK</span><div><strong>auxmoney<span className="logo-dot">.</span></strong><span>AI & automation</span></div><div><strong className="ippen-wordmark">Ippen Digital</strong><span>Backend & product</span></div><div><strong className="tum-wordmark">TUM</strong><span>B.Sc. Information Systems</span></div></div>;
}

function LiveLink({ project }) {
  return project.liveUrl ? <a className="text-link live-project-link" href={project.liveUrl} target="_blank" rel="noreferrer">Live website <Arrow /></a> : null;
}

function Projects({ openProject }) {
  const featured = projects[0];
  const secondary = [projects[2], projects[1], projects[4], projects[3]];
  return <section className="work-section wrap section-space" id="projects" aria-labelledby="projects-title">
    <div className="section-heading"><div><Label>01 / SELECTED WORK</Label><h2 id="projects-title">Ideas, made <em>useful.</em></h2></div><p>Backend systems, conversational AI, and tools for learning. Here’s what I’ve been building.</p></div>
    <article className="featured-project"><div className="featured-copy"><Label>BACHELOR’S THESIS · TUM</Label><h3>{featured.title}</h3><p>{featured.description}</p><Tags items={featured.tags} /><div className="project-contribution"><span>MY CONTRIBUTION</span><p>Transcription backend in Java / Spring Boot and Python. Interactive playback in Angular.</p></div><button className="text-link" onClick={() => openProject(featured)}>Inside the project <Arrow /></button></div><button className="featured-art" onClick={() => openProject(featured)} aria-label={`Explore ${featured.title}`}><div className="art-topline"><span>01 / FROM AUDIO TO UNDERSTANDING</span><span aria-hidden="true">↗</span></div><ProjectVisual type={featured.visual} /><div className="workflow" aria-hidden="true"><span>Video & audio</span><i>→</i><span>Transcription</span><i>→</i><span>Playback</span></div><span className="art-disclaimer">Concept illustration · not a product screenshot</span></button></article>
    <div className="project-grid">{secondary.map((project, index) => <article className="work-card" key={project.id}><button className={`work-art art-${project.id}`} onClick={() => openProject(project)} aria-label={`Explore ${project.title}`}><span className="art-number">0{index + 2} / {({ chatbot: 'LIVE PROJECT', logpt: 'DOCUMENT AI', 'lecture-streaming': 'LEARNING TOGETHER', 'road-vision': 'COMPUTER VISION' }[project.id])}</span><ProjectVisual type={project.visual} /><span className="art-disclaimer">Concept illustration</span><span className="art-arrow" aria-hidden="true">↗</span></button><div className="work-card-body"><Label>{project.id === 'chatbot' && <span className="live-badge"><span className="status-dot" />LIVE</span>}{project.role}</Label><h3>{project.title}</h3><p>{project.description}</p><Tags items={project.tags} /><div className="project-actions"><button className="text-link" onClick={() => openProject(project)}>Explore project <Arrow /></button><LiveLink project={project} /></div></div></article>)}</div>
  </section>;
}

export function Experience() {
  return <section className="experience-section section-space" id="experience" aria-labelledby="experience-title"><div className="wrap experience-layout"><div className="experience-intro"><Label>02 / EXPERIENCE</Label><h2 id="experience-title">Where the work<br />gets <em>real.</em></h2><p>Working across engineering and product has taught me to think beyond the implementation—and pay attention to how software is used.</p><a className="text-link" href={profile.resume} download="Anish_Goyal_Resume.pdf">The full story, in my CV <span aria-hidden="true">↓</span></a><div className="experience-mark" aria-hidden="true">{`{ }`}</div></div><div className="experience-list">{experience.map((job, index) => <article className="experience-card" key={job.id}><div className="experience-topline"><span>{job.dates}</span>{job.current && <span className="current-role"><span className="status-dot" />CURRENT</span>}</div><h3>{job.company}</h3><p className="experience-role">{job.role}</p><p>{job.description}</p><ul>{job.bullets.slice(0, index === 0 ? 2 : 1).map(bullet => <li key={bullet}>{bullet}</li>)}</ul><details><summary>More about my work <span aria-hidden="true">+</span></summary><ul>{job.bullets.slice(index === 0 ? 2 : 1).map(bullet => <li key={bullet}>{bullet}</li>)}</ul></details><Tags items={job.tags} /></article>)}</div></div></section>;
}

export function Inventory({ initialCategory = 'AI' }) {
  const [category, setCategory] = useState(initialCategory);
  const selected = category === 'All' ? technologies : technologies.filter(tech => tech.category === category);
  return <section className="inventory wrap section-space" id="stack" aria-labelledby="inventory-title"><div className="section-heading"><div><Label>03 / THE TOOLKIT</Label><h2 id="inventory-title">The right tool.<br /><em>A reason to use it.</em></h2></div><p>Tools I’ve used at work, at university, and in my own projects. With context, because a logo only tells half the story.</p></div>
    <div className="tech-filters" role="tablist" aria-label="Technology category">{categories.map(name => <button key={name} id={`tab-${name}`} role="tab" aria-selected={category === name} aria-controls="tech-panel" tabIndex={category === name ? 0 : -1} onClick={() => setCategory(name)} onKeyDown={event => {
      if (!['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(event.key)) return;
      event.preventDefault();
      const next = event.key === 'Home' ? 0 : event.key === 'End' ? categories.length - 1 : (categories.indexOf(name) + (event.key === 'ArrowRight' ? 1 : -1) + categories.length) % categories.length;
      setCategory(categories[next]); document.getElementById(`tab-${categories[next]}`)?.focus();
    }}>{name}<span>{name === 'All' ? technologies.length : technologies.filter(tech => tech.category === name).length}</span></button>)}</div>
    <div id="tech-panel" role="tabpanel" aria-labelledby={`tab-${category}`} tabIndex={0}><p className="category-note">{categoryNotes[category]}</p><div className="tech-grid">{selected.map(tech => <div className="tech-card" key={tech.name}><TechIcon type={tech.icon} /><span><strong>{tech.name}</strong><small>{tech.level || ({ Backend: 'Development toolkit', Apps: 'App & frontend development', AI: 'Applied AI toolkit', Testing: 'Quality & collaboration' }[tech.category])}</small></span></div>)}</div></div>
  </section>;
}

export function Community() {
  return <div className="community" id="community"><Label>BEYOND THE CODE</Label><h3>Building things.<br />Bringing people together.</h3><p>At DEGIS Munich City Chapter, I helped bring the community together through events and social media campaigns.</p><div className="community-roles">{volunteering.map(item => <div key={item.title}><strong>{item.title}</strong><span>{item.dates}</span></div>)}</div><div className="languages"><Label>LANGUAGES</Label><p>{languages.map(language => <span key={language.name}>{language.name}{language.level && <small> / {language.level}</small>}</span>)}</p></div></div>;
}

function About({ openGuide }) {
  return <section className="about-section section-space" id="about" aria-labelledby="about-title"><div className="wrap"><div className="section-heading"><div><Label>04 / A LITTLE ABOUT ME</Label><h2 id="about-title">An engineer.<br /><em>And a person.</em></h2></div><div className="about-intro"><p>{profile.summary}</p><p>My strongest interests are agentic AI and Python, especially where they meet real business workflows. I want to keep learning while building software people can rely on.</p><button className="text-link" onClick={openGuide}>Explore my resume guide <Arrow /></button></div></div><div className="about-grid"><div id="education"><Label>EDUCATION</Label>{education.map(item => <article className="education-card" key={item.school}><span className="education-dates">{item.dates}</span><h3>{item.degree}</h3><p className="school-name">{item.school}</p><p className="degree-original">{item.original}</p><p>{item.detail}</p></article>)}</div><Community /></div></div></section>;
}

function Footer() {
  return <footer id="contact" className="footer"><div className="wrap"><Label>05 / WHAT’S NEXT</Label><div className="contact-heading"><h2>Let’s build<br /><em>something good.</em></h2><a className="contact-circle" href={`mailto:${profile.email}`} aria-label="Email Anish"><Arrow /></a></div><div className="contact-details"><div><p>I’m interested in agentic AI and Python roles with teams that care about the products they build.</p><a className="email" href={`mailto:${profile.email}`}>{profile.email} <Arrow /></a><a className="phone" href={profile.phoneHref}>{profile.phone}</a></div><div className="contact-links"><a href={profile.github} target="_blank" rel="noreferrer">GitHub <Arrow /></a><a href={profile.linkedin} target="_blank" rel="noreferrer">LinkedIn <Arrow /></a><a href={profile.resume} download="Anish_Goyal_Resume.pdf">Download CV <span aria-hidden="true">↓</span></a></div></div><div className="footer-bottom"><span>© 2026 Anish Goyal</span><span>{profile.location}</span><a href="#home">BACK TO TOP ↑</a></div></div></footer>;
}

export function Modal({ type, project, close }) {
  const dialog = useRef(null);
  const [messages, setMessages] = useState([]);
  const [draft, setDraft] = useState('');
  const chatEnd = useRef(null);
  useDialog(dialog, Boolean(type), close);
  useEffect(() => { chatEnd.current?.scrollIntoView({ block: 'nearest' }); }, [messages]);
  function ask(question) {
    const input = question.trim(); if (!input) return;
    setMessages(items => [...items, { role: 'user', text: input }, { role: 'assistant', text: getGuideReply(input) }]); setDraft('');
  }
  return <dialog ref={dialog} className="modal" aria-labelledby={type ? 'modal-title' : undefined} onClick={event => { if (event.target === dialog.current) close(); }}><div className="modal-inner"><button className="modal-close" onClick={close} aria-label="Close dialog">×</button>
    {type === 'project' && project && <><Label>{project.role}</Label><h2 id="modal-title">{project.fullTitle || project.title}</h2>{project.organization && <p>{project.organization}</p>}<Tags items={project.tags} /><LiveLink project={project} /><div className="modal-project-visual"><ProjectVisual type={project.visual} /><small>Concept illustration · not a product screenshot</small></div><h3>The project</h3><p>{project.description}</p><h3>My contribution</h3><p>{project.detail}</p><ul>{project.features.map(feature => <li key={feature}>{feature}</li>)}</ul><a className="button button-primary" href={`mailto:${profile.email}?subject=${encodeURIComponent(`Let's talk about ${project.title}`)}`}>Let’s talk about this project <Arrow /></a></>}
    {type === 'guide' && <><Label>THE RESUME GUIDE</Label><h2 id="modal-title">A little more<br /><em>about my work.</em></h2><p className="assistant-note">A quick guide with predefined answers from my resume.</p><div className="chat-messages" aria-live="polite" aria-relevant="additions"><p className="chat-bubble assistant">Explore my experience, projects, education, or skills. What would you like to know?</p>{messages.map((message, index) => <p className={`chat-bubble ${message.role}`} key={index}>{message.text}</p>)}<div ref={chatEnd} /></div><div className="chat-suggestions">{['Experience at auxmoney', 'Tell me about the thesis', 'What are the skills?', 'Contact Anish'].map(question => <button key={question} onClick={() => ask(question)}>{question}</button>)}</div><form className="chat-form" onSubmit={event => { event.preventDefault(); ask(draft); }}><label className="sr-only" htmlFor="chat-message">Your question about Anish</label><input id="chat-message" value={draft} onChange={event => setDraft(event.target.value)} placeholder="Ask about my work…" maxLength={500} autoComplete="off" /><button type="submit" aria-label="Send question" disabled={!draft.trim()}><Arrow /></button></form></>}
  </div></dialog>;
}

export default function Portfolio() {
  const [modal, setModal] = useState(null);
  const [project, setProject] = useState(null);
  const close = useCallback(() => setModal(null), []);
  return <><a className="skip-link" href="#projects">Skip to projects</a><Header /><main><Hero /><Credentials /><Projects openProject={value => { setProject(value); setModal('project'); }} /><Experience /><Inventory /><About openGuide={() => setModal('guide')} /></main><Footer /><Modal type={modal} project={project} close={close} /></>;
}
