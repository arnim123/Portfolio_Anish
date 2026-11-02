import { useCallback, useEffect, useRef, useState } from 'react';
import { profile, experience, projects, highlights, timeline, categories, categoryNotes, technologies, education, volunteering, languages, interests, visibleSections } from './data';
import { Arrow, TechIcon } from './Icons';
import { clamp, useDialog, useScrollScene } from './hooks';
import ProjectVisual from './ProjectVisual';
import EngineeringFocus from './EngineeringFocus';
import { useGlassEffects } from './useGlassEffects';
import { getGuideReply } from './guide';
import { getHighlightFlip, getEducationTheme } from './scrollEffects';

const image = (name) => `/images/${name}.jpg`;

function SectionHeading({ label, children, className = '' }) {
  return <div className={`section-heading ${className}`}><span className="eyebrow">{label}</span><h2>{children}</h2></div>;
}

function Cursor() {
  const cursor = useRef(null);
  useEffect(() => {
    if (!matchMedia('(pointer: fine)').matches) return;
    let frame;
    const move = (event) => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        if (!cursor.current) return;
        cursor.current.style.transform = `translate3d(${event.clientX - 16}px, ${event.clientY - 16}px, 0)`;
        cursor.current.classList.add('visible');
        cursor.current.classList.toggle('on-light', Boolean(event.target.closest('[data-light]')));
        cursor.current.classList.toggle('over-link', Boolean(event.target.closest('a, button')));
      });
    };
    const hide = () => cursor.current?.classList.remove('visible');
    window.addEventListener('pointermove', move, { passive: true });
    document.addEventListener('pointerleave', hide);
    return () => { cancelAnimationFrame(frame); window.removeEventListener('pointermove', move); document.removeEventListener('pointerleave', hide); };
  }, []);
  return <div ref={cursor} className="custom-cursor" aria-hidden="true"><span /></div>;
}

function Header({ openGuide }) {
  const [menu, setMenu] = useState(false);
  return <header className="header" data-light data-glass="light">
    <a href="#home" className="brand" aria-label="Anish Goyal, home"><span className="monogram" aria-hidden="true">AG</span>ANISH GOYAL</a>
    <nav className={menu ? 'nav is-open' : 'nav'} aria-label="Main navigation">
      <a href="#about" onClick={() => setMenu(false)}>About Me</a>
      {visibleSections.experience && <a href="#experience" onClick={() => setMenu(false)}>Experience</a>}
      <a href="#projects" onClick={() => setMenu(false)}>Projects</a>
      <button onClick={() => { setMenu(false); openGuide(); }}>Ask about me</button>
    </nav>
    <a href="#contact" className="chat-button">Let’s Chat</a>
    <button className="menu-toggle" aria-label={menu ? 'Close menu' : 'Open menu'} aria-expanded={menu} onClick={() => setMenu(!menu)}><span /><span /></button>
  </header>;
}

function Hero({ openGuide }) {
  const scene = useRef(null);
  const photo = useRef(null);
  useScrollScene(scene, (_, { top, viewport, reduced }) => {
    const progress = reduced ? 0 : clamp(-top / (viewport * 0.5));
    scene.current?.style.setProperty('--hero-shift', progress);
    photo.current?.style.setProperty('--photo-growth', progress);
  });
  return <section className="hero" id="home" ref={scene} data-light>
    <Header openGuide={openGuide} />
    <div className="hero-glow" aria-hidden="true" />
    <div className="hero-content">
      <p className="intro"><span className="monogram" aria-hidden="true">AG</span>Hi, I’m Anish Goyal</p>
      <h1>I build reliable backends.<br />And put AI to work.</h1>
      <p className="hero-role">{profile.title}</p>
      <div className="hero-actions"><a className="friend-link" href={profile.resume} download="Anish_Goyal_Resume.pdf">Download CV <Arrow /></a><a className="friend-link secondary-link" href="#projects">Explore my projects <Arrow /></a></div>
      <p className="hero-location"><span />{profile.location}<i />{profile.availability}</p>
      <a className="contact-orbit" href="#contact" aria-label="Get in touch with Anish" data-glass="light">
        <svg viewBox="0 0 120 120" className="orbit-lettering" aria-hidden="true"><defs><path id="orbit-path" d="M60,60 m-48,0 a48,48 0 1,1 96,0 a48,48 0 1,1 -96,0" /></defs><text><textPath href="#orbit-path" textLength="297">LET’S BUILD SOMETHING · GET IN TOUCH · </textPath></text></svg>
        <svg className="eye" width="25" height="25" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true"><path d="M2 12s4-7 10-7 10 7 10 7-4 7-10 7S2 12 2 12Z"/><circle cx="12" cy="12" r="3"/></svg>
      </a>
    </div>
    <div className="hero-photo" ref={photo}><img src={image('anish-portrait')} alt="Anish Goyal outdoors by the river at dusk" fetchPriority="high" /></div>
  </section>;
}

function About() {
  return <section className="firewall profile-about" id="about" aria-labelledby="about-title" data-light>
    <div className="marquee marquee-outline" aria-hidden="true"><span>JAVA BACKEND AI AUTOMATION JAVA BACKEND AI AUTOMATION </span></div>
    <div className="marquee marquee-solid" aria-hidden="true"><span>BUILD TEST LEARN COLLABORATE BUILD TEST LEARN COLLABORATE </span></div>
    <div className="firewall-content"><span className="eyebrow teal">THE ENGINEER BEHIND THE CODE</span><h2 id="about-title">BACKEND. AI. RELIABILITY.</h2><p className="about-summary">{profile.summary}</p><p className="about-focus">{profile.focus}</p><a className="case-link" href={visibleSections.experience ? '#experience' : '#projects'}>{visibleSections.experience ? 'EXPLORE MY EXPERIENCE' : 'EXPLORE MY PROJECTS'} <Arrow /></a></div>
  </section>;
}

export function Experience() {
  return <section className="experience-section" id="experience" aria-labelledby="experience-title">
    <div className="profile-section-intro"><span className="eyebrow teal">PROFESSIONAL EXPERIENCE</span><h2 id="experience-title">Putting it<br /><em>into practice.</em></h2><p>From university teamwork to product development and AI in financial services.</p><a className="case-link" href={profile.resume} download="Anish_Goyal_Resume.pdf">DOWNLOAD FULL CV <Arrow /></a></div>
    <div className="experience-list">{experience.map((job, index) => <article className="experience-card" key={job.id}>
      <div className="experience-topline"><span className="eyebrow">{String(index + 1).padStart(2, '0')} / {job.dates}</span>{job.current && <span className="current-role"><i />CURRENT ROLE</span>}</div>
      <h3>{job.company}</h3><p className="experience-role">{job.role}</p><p className="experience-summary">{job.description}</p><ul>{job.bullets.map(bullet => <li key={bullet}>{bullet}</li>)}</ul><div className="tags">{job.tags.map(tag => <span key={tag}>{tag}</span>)}</div>
    </article>)}</div>
  </section>;
}

function Projects({ openProject }) {
  const scene = useRef(null);
  const track = useRef(null);
  const viewport = useRef(null);
  useScrollScene(scene, (progress, { mobile, reduced }) => {
    if (!track.current || !viewport.current) return;
    const distance = Math.max(0, track.current.scrollWidth - viewport.current.clientWidth);
    track.current.style.transform = mobile || reduced ? '' : `translate3d(${-progress * distance}px, 0, 0)`;
  });
  const scrollCard = (direction) => viewport.current?.scrollBy({ left: direction * viewport.current.clientWidth * .9, behavior: 'smooth' });
  return <section ref={scene} className="projects scroll-scene" id="projects" aria-labelledby="projects-title" data-light>
    <div className="scene-sticky">
      <SectionHeading label="PORTFOLIO">Selected <em id="projects-title">Projects</em></SectionHeading>
      <div ref={viewport} className="project-viewport"><div ref={track} className="project-track">
        {projects.map((project, index) => <article className="project-card" key={project.id}>
          <div className="project-role"><span>{String(index).padStart(2, '0')} / {project.role}</span><i /></div>
          <h3>{project.title}</h3>
          <div className="tags">{project.tags.map(tag => <span key={tag}>{tag}</span>)}</div>
          <button className="case-link" onClick={() => openProject(project)}>EXPLORE PROJECT <Arrow /></button>
          <button className={`project-image project-image-${project.id}`} onClick={() => openProject(project)} aria-label={`Explore ${project.title}`}>
            <ProjectVisual type={project.visual} />
            <span className="project-description">{project.description}</span>
            <span className="image-open" aria-hidden="true"><Arrow /></span>
          </button>
        </article>)}
      </div></div>
      <div className="mobile-track-controls"><span>SWIPE TO EXPLORE</span><button aria-label="Previous project" onClick={() => scrollCard(-1)}>←</button><button aria-label="Next project" onClick={() => scrollCard(1)}>→</button></div>
    </div>
  </section>;
}

function Highlights() {
  const scene = useRef(null);
  const rotor = useRef(null);
  const faces = useRef([]);
  const [active, setActive] = useState(0);
  const paintFlip = (frame) => {
    if (!rotor.current) return;
    rotor.current.style.setProperty('--flip-rotation', `${frame.rotation}deg`);
    rotor.current.style.setProperty('--flip-lift', `${frame.lift}px`);
    rotor.current.style.setProperty('--flip-shade', frame.shade);
    faces.current.forEach((face, index) => {
      if (face) face.style.visibility = index === frame.from || index === frame.to ? 'visible' : 'hidden';
    });
  };
  useScrollScene(scene, (progress, { reduced }) => {
    if (reduced) {
      paintFlip({ from: active, to: active, rotation: 0, lift: 0, shade: 0 });
      return;
    }
    const frame = getHighlightFlip(progress, highlights.length);
    paintFlip(frame);
    setActive(frame.active);
  });
  const go = (index) => {
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setActive(index);
      paintFlip({ from: index, to: index, rotation: 0, lift: 0, shade: 0 });
      return;
    }
    const start = scene.current.getBoundingClientRect().top + scrollY;
    const distance = scene.current.offsetHeight - innerHeight;
    window.scrollTo({ top: start + distance * ((index + .5) / highlights.length), behavior: 'smooth' });
  };
  return <section ref={scene} className="artworks scroll-scene highlights" id="highlights" aria-label="Engineering highlights">
    <div className="scene-sticky">
      <SectionHeading label="A CLOSER LOOK">Engineering <em>Highlights</em></SectionHeading>
      <div className="art-counter"><span>{String(active + 1).padStart(2, '0')}</span> / {String(highlights.length).padStart(2, '0')}</div>
      <div className="art-slides highlight-stage">
        <div className="highlight-copy-stage">{highlights.map((item, index) => <article key={item.title} className={`art-slide highlight-text-slide ${active === index ? 'active' : ''}`} aria-hidden={active !== index}>
          <div className="highlight-copy"><span className="eyebrow teal">{item.label}</span><h3>{item.title}<em>{item.subtitle}</em></h3><p>{item.copy}</p><span className="highlight-source">{item.source}</span></div>
        </article>)}</div>
        <div className="art-visual highlight-flip-viewport"><div ref={rotor} className="highlight-flip-card">
          {highlights.map((item, index) => <div key={item.visual} ref={element => { faces.current[index] = element; }} className={`highlight-face ${index === 0 ? 'initial-face' : ''}`} style={{ '--face-index': index }} aria-hidden={active !== index}><ProjectVisual type={item.visual} /></div>)}
        </div></div>
      </div>
      <div className="art-pagination" aria-label="Choose an engineering highlight">{highlights.map((item, index) => <button key={item.title} onClick={() => go(index)} aria-label={`Show ${item.label.toLowerCase()}`} aria-pressed={active === index} />)}</div>
    </div>
  </section>;
}

export function Inventory({ initialCategory = 'Backend' }) {
  const [category, setCategory] = useState(initialCategory);
  const filtered = category === 'All' ? technologies : technologies.filter(tech => tech.category === category);
  return <section className="inventory" id="stack" aria-labelledby="inventory-title" data-light>
    <span className="eyebrow teal inventory-label"><i />THE TOOLKIT</span>
    <h2 id="inventory-title">The <em>Digital</em><br />Inventory.</h2>
    <div className="inventory-content">
      <div className="tech-filters" role="tablist" aria-label="Technology category">{categories.map(name => <button key={name} id={`tab-${name}`} role="tab" aria-selected={name === category} aria-controls="tech-panel" tabIndex={name === category ? 0 : -1} onClick={() => setCategory(name)} onKeyDown={event => {
        if (!['ArrowDown', 'ArrowUp', 'ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(event.key)) return;
        event.preventDefault();
        const current = categories.indexOf(name);
        const next = event.key === 'Home' ? 0 : event.key === 'End' ? categories.length - 1 : (current + (['ArrowDown', 'ArrowRight'].includes(event.key) ? 1 : -1) + categories.length) % categories.length;
        setCategory(categories[next]); document.getElementById(`tab-${categories[next]}`)?.focus();
      }}>{name}</button>)}</div>
      <div className="tech-panel" id="tech-panel" role="tabpanel" aria-labelledby={`tab-${category}`} tabIndex={0}>
        <p className="category-note">{categoryNotes[category]}</p>
        <div className="tech-grid">{filtered.map((tech, i) => <div key={tech.name} className="tech-card" data-glass="light" style={{ '--tech-color': tech.color, '--item-order': i }}><TechIcon type={tech.icon} /><span className="tech-name">{tech.name}</span>{tech.level && <small className="tech-level">{tech.level}</small>}</div>)}</div>
      </div>
    </div>
  </section>;
}

function Timeline() {
  const scene = useRef(null);
  const track = useRef(null);
  const progressDot = useRef(null);
  useScrollScene(scene, (progress, { mobile, reduced }) => {
    if (!track.current) return;
    const distance = track.current.scrollWidth - innerWidth;
    track.current.style.transform = mobile || reduced ? '' : `translate3d(${-progress * distance}px,0,0)`;
    progressDot.current?.style.setProperty('left', `${2 + progress * 90}%`);
  });
  return <section ref={scene} className="timeline scroll-scene" id="journey" aria-labelledby="timeline-title"><div className="scene-sticky">
    <SectionHeading label="TIMELINE">How I <em id="timeline-title">Got Here</em></SectionHeading>
    <p className="timeline-subtitle">From university foundations to AI in financial services.</p>
    <div className="story-word" aria-hidden="true">The Story</div>
    <div className="timeline-line" aria-hidden="true"><span ref={progressDot} /></div>
    <div className="timeline-viewport"><div className="timeline-track" ref={track}>{timeline.map((item, index) => <article className="timeline-event" key={item.title}>
      <h3>{item.title}</h3><div className="event-meta"><span>{item.year}</span><i /><em>{item.chapter}</em></div>
      <div className="event-copy"><strong>{String(index + 1).padStart(2, '0')}</strong><div><p>{item.text}</p><span className="event-scroll"><i />SCROLL</span></div></div>
    </article>)}</div></div>
    <div className="scroll-explore">SCROLL TO EXPLORE</div>
  </div></section>;
}

function Education() {
  const scene = useRef(null);
  useScrollScene(scene, (_, { top, viewport, reduced }) => {
    const theme = getEducationTheme(top, viewport, reduced);
    for (const [property, value] of Object.entries(theme.colors)) scene.current?.style.setProperty(property, value);
    scene.current?.toggleAttribute('data-light', theme.light);
  });
  return <section ref={scene} className="education-section" id="education" aria-labelledby="education-title">
    <div className="profile-section-intro"><span className="eyebrow teal">EDUCATION</span><h2 id="education-title">A foundation<br /><em>to build on.</em></h2></div>
    <div className="education-cards">{education.map((item, index) => <article className="education-card" key={item.school}>
      <span className="education-number">0{index + 1}</span><div><span className="eyebrow">{item.dates}</span><h3>{item.degree}</h3><p className="degree-original">{item.original}</p><p className="school-name">{item.school}</p><p className="education-detail">{item.detail}</p></div>
    </article>)}</div>
  </section>;
}

export function Community() {
  return <section className="community-section" id="community" aria-labelledby="community-title">
    <div className="community-main"><span className="eyebrow teal">BEYOND THE CODE</span><h2 id="community-title">Better, <em>together.</em></h2><p className="community-intro">A collaborative mindset, a willingness to learn, and experience bringing people together.</p>
      <div className="volunteering-card"><span className="eyebrow">VOLUNTEERING</span><h3>DEGIS Munich City Chapter</h3>{volunteering.map(item => <div className="volunteer-role" key={item.title}><span>{item.title}</span><time>{item.dates}</time></div>)}<p>Planned and coordinated events; designed and promoted social media campaigns.</p></div>
    </div>
    <div className="community-aside"><div className="languages-card"><span className="eyebrow">LANGUAGES</span>{languages.map(language => <div className="language-row" key={language.name}><span>{language.name}</span>{language.level && <small>{language.level}</small>}</div>)}</div><div className="strengths-card"><span className="eyebrow">HOW I WORK</span><div className="strength-tags">{profile.strengths.map(strength => <span key={strength}>{strength}</span>)}</div></div></div>
  </section>;
}

function Partnership() {
  return <section className="partnership" data-light aria-labelledby="partnership-title">
    <div className="partnership-word" aria-hidden="true">WHAT’S NEXT</div>
    <div className="partnership-intro"><span className="eyebrow teal">THE NEXT CHAPTER</span><h2 id="partnership-title">Thoughtful teams.<br /><em>Reliable products.</em></h2><p>{profile.focus}</p><p className="opportunity-note">Based in {profile.location}</p></div>
    <div className="partnership-list">{interests.map(([title, copy], index) => <div className="partner-row" key={title}><span>{String(index + 1).padStart(2, '0')}</span><div><h3>{title}</h3><p>{copy}</p></div></div>)}<a className="partner-cta" data-glass="dark" href={`mailto:${profile.email}`}>Let’s talk about your team <Arrow /></a></div>
  </section>;
}

function Footer() {
  return <footer className="footer" id="contact" data-light>
    <div className="launches eyebrow">JAVA · BACKEND · APPLIED AI · CONTINUOUS LEARNING</div>
    <div className="footer-main"><div className="footer-glow" aria-hidden="true" /><div className="contact-copy"><h2>Let’s build something<br /><em>that matters</em>.</h2><a className="email" href={`mailto:${profile.email}`}>{profile.email}</a><a className="contact-phone" href={profile.phoneHref}>{profile.phone}</a><p className="contact-location">{profile.location}</p></div>
      <div className="footer-nav"><div><span className="eyebrow">CONNECT</span><a href={profile.linkedin} target="_blank" rel="noreferrer">LinkedIn</a><a href={profile.github} target="_blank" rel="noreferrer">GitHub</a><a href={profile.resume} download="Anish_Goyal_Resume.pdf">Download CV</a></div><div><span className="eyebrow">EXPLORE</span>{visibleSections.experience && <a href="#experience">Experience</a>}<a href="#projects">Projects</a><a href="#education">Education</a>{visibleSections.community && <a href="#community">Beyond the code</a>}</div></div>
    </div>
    <div className="built-with"><span className="eyebrow">ANISH GOYAL / SOFTWARE ENGINEER</span><div className="footer-tags">{['Java', 'Python', 'Spring Boot', 'REST APIs', 'Applied AI', 'Service testing'].map(name => <a key={name} href="#stack">{name}</a>)}</div></div>
  </footer>;
}

export function Modal({ type, project, close }) {
  const dialog = useRef(null);
  const [messages, setMessages] = useState([]);
  const [draft, setDraft] = useState('');
  const chatEnd = useRef(null);
  useDialog(dialog, Boolean(type), close);
  useEffect(() => { chatEnd.current?.scrollIntoView({ block: 'nearest' }); }, [messages]);
  const ask = (question) => {
    const input = question.trim();
    if (!input) return;
    setMessages(items => [...items, { role: 'user', text: input }, { role: 'assistant', text: getGuideReply(input) }]);
    setDraft('');
  };
  return <dialog ref={dialog} className={`modal modal-${type || 'closed'}`} aria-labelledby={type ? 'modal-title' : undefined} onClick={event => { if (event.target === dialog.current) close(); }}><div className="modal-inner"><button className="modal-close" onClick={close} aria-label="Close dialog">×</button>
    {type === 'project' && project && <><span className="eyebrow teal">PROJECT / {project.role}</span><h2 id="modal-title">{project.fullTitle || project.title}</h2>{project.organization && <p className="project-organization">{project.organization}</p>}<div className="tags">{project.tags.map(tag => <span key={tag}>{tag}</span>)}</div><div className="modal-project-visual"><ProjectVisual type={project.visual} /></div><p>{project.description}</p><p>{project.detail}</p><h3>My contribution</h3><ul>{project.features.map(feature => <li key={feature}>{feature}</li>)}</ul><a className="case-link" href={`mailto:${profile.email}`}>LET’S TALK ABOUT THE WORK <Arrow /></a></>}
    {type === 'guide' && <><span className="eyebrow teal">MEET ANISH</span><h2 id="modal-title">A little more <em>about me.</em></h2><p className="assistant-note">A resume-based guide to my experience, projects, and skills.</p><div className="chat-messages" aria-live="polite"><div className="chat-bubble assistant">Hi! What would you like to know about Anish? My answers are based on his resume.</div>{messages.map((message, index) => <div className={`chat-bubble ${message.role}`} key={index}>{message.text}</div>)}<div ref={chatEnd} /></div><div className="chat-suggestions">{['Show me the experience', 'Explore the projects', 'What are the skills?', 'Contact Anish'].map(question => <button key={question} onClick={() => ask(question)}>{question}</button>)}</div><form className="chat-form" onSubmit={event => { event.preventDefault(); ask(draft); }}><label className="sr-only" htmlFor="chat-message">Your question about Anish</label><input id="chat-message" value={draft} onChange={event => setDraft(event.target.value)} placeholder="Ask about experience, projects, or education…" maxLength={500} autoComplete="off" /><button type="submit" aria-label="Send question" disabled={!draft.trim()}><Arrow /></button></form></>}
  </div></dialog>;
}

export default function App() {
  useGlassEffects();
  const [modal, setModal] = useState(null);
  const [project, setProject] = useState(null);
  const close = useCallback(() => setModal(null), []);
  const openGuide = useCallback(() => setModal('guide'), []);
  return <><a className="skip-link" href={visibleSections.experience ? '#experience' : '#projects'}>{visibleSections.experience ? 'Skip to experience' : 'Skip to projects'}</a><Cursor /><main><Hero openGuide={openGuide} /><About /><EngineeringFocus />{visibleSections.experience && <Experience />}<Projects openProject={value => { setProject(value); setModal('project'); }} /><Highlights /><Inventory /><Timeline /><Education />{visibleSections.community && <Community />}<Partnership /></main><Footer /><Modal type={modal} project={project} close={close} /></>;
}
