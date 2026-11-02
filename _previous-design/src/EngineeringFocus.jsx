import { useEffect, useRef, useState } from 'react';
import { Arrow } from './Icons';
import { visibleSections } from './data';
import './engineering.css';

const experienceLink = visibleSections.experience
  ? { link: '#experience', linkLabel: 'See the experience' }
  : { link: '#highlights', linkLabel: 'See engineering highlights' };

export const disciplines = [
  {
    id: 'backend', number: '01', title: 'Backend development', short: 'Services',
    tools: 'Java / Python / REST APIs',
    description: 'Clear interfaces. Thoughtful logic. Services that make the rest of a product work.',
    context: 'Java backend contributions at Ippen Digital, and Java / Spring Boot with Python in my TUM bachelor’s thesis.',
    link: '#projects', linkLabel: 'Explore the projects',
    chips: ['JAVA', 'PYTHON', 'REST'],
  },
  {
    id: 'ai', number: '02', title: 'Applied AI', short: 'Intelligence',
    tools: 'OpenAI APIs / Langdock / Documents',
    description: 'Connect useful intelligence to a real workflow, with context and careful integration.',
    context: 'Internal AI services at auxmoney, from prompt processing and API communication to document-processing workflows.',
    ...experienceLink,
    chips: ['CONTEXT', 'MODEL', 'OUTPUT'],
  },
  {
    id: 'quality', number: '03', title: 'Service reliability', short: 'Validation',
    tools: 'Functional / API / Integration testing',
    description: 'Question the output. Test the connections. Make reliability part of the process.',
    context: 'Synthetic PDF test data, test scenarios, response validation, and functional and integration testing at auxmoney.',
    ...experienceLink,
    chips: ['INPUT', 'TEST', 'VERIFY'],
  },
];

// A small drafting coordinate system keeps every line on the same plane.
const point = (u, v, height = 0) => [100 + u * 240 + v * 240, 108 - u * 66 + v * 66 + height];
const layerGap = 154;
const coordinates = values => values.map(pair => pair.join(',')).join(' ');
const plane = (x, y, width, height, elevation = 0) => coordinates([
  point(x, y, elevation), point(x + width, y, elevation),
  point(x + width, y + height, elevation), point(x, y + height, elevation),
]);
const pathBetween = values => values.map(([u, v], index) => `${index ? 'L' : 'M'}${point(u, v).join(' ')}`).join(' ');

function Module({ x, y, width, height, label, selected }) {
  const center = point(x + width / 2, y + height / 2, -7);
  return <g>
    <polygon points={plane(x, y, width, height, 4)} fill="#0a0d11" stroke={selected ? '#4e5c73' : '#2b323d'} strokeWidth=".8" />
    <polygon points={plane(x, y, width, height, -7)} fill={selected ? '#2e394a' : '#1e242e'} stroke={selected ? '#7d91b1' : '#3d4757'} strokeWidth=".9" />
    <text transform={`translate(${center.join(' ')}) rotate(-15.4)`} textAnchor="middle" dominantBaseline="middle" fill={selected ? '#e7eef8' : '#7e899a'} fontSize="12" letterSpacing="1">{label}</text>
  </g>;
}

export function SystemDrawing({ active }) {
  const order = [2, 1, 0];
  const routes = [
    [[.35,.38],[.35,.55],[.68,.55],[.68,.34]],
    [[.35,.55],[.35,.73],[.48,.73]],
  ];
  return <svg className="system-drawing" viewBox="0 0 720 520" fontFamily="monospace" role="img" aria-label={`Architectural illustration of three connected disciplines. ${disciplines[active].title} is selected.`}>
    <g className="drawing-guides" fill="none" stroke="#a8b1c0" strokeWidth=".65" opacity=".16">
      <path d="M75 430 343 504M38 383 348 468M345 20 669 110" />
      <path d="M59 97v330m-5-319h10m-10 154h10m-10 154h10" />
      <polygon points={plane(-.05,-.05,1.1,1.1,325)} strokeDasharray="3 6" />
    </g>
    <g className="drawing-supports" stroke="#687385" strokeWidth=".8" strokeDasharray="2 5" opacity=".34">
      {[point(.04,.04), point(.96,.04), point(.96,.96), point(.04,.96)].map(([x,y], index) => <path key={index} d={`M${x} ${y}v${layerGap * 2}`} />)}
    </g>
    {order.map(index => {
      const item = disciplines[index];
      const selected = active === index;
      const elevation = index * layerGap + (selected ? -12 : 0);
      const connector = point(.95, .97);
      return <g key={item.id} className={`drawing-layer ${selected ? 'is-selected' : ''}`} style={{ transform: `translateY(${elevation}px)` }}>
        <polygon points={coordinates([point(0,0),point(0,1),point(0,1,11),point(0,0,11)])} fill={selected ? '#202835' : '#141920'} stroke={selected ? '#566680' : '#323c4c'} strokeWidth=".85" />
        <polygon points={coordinates([point(0,1),point(1,1),point(1,1,11),point(0,1,11)])} fill={selected ? '#151b25' : '#10141a'} stroke={selected ? '#566680' : '#323c4c'} strokeWidth=".85" />
        <polygon className="drawing-plane" points={plane(0,0,1,1)} fill={selected ? '#1e2531' : '#151a21'} stroke={selected ? '#95acd0' : '#424c5c'} strokeWidth={selected ? '1.15' : '.8'} />
        <g fill="none" stroke={selected ? '#5f6d83' : '#3f4959'} strokeWidth=".55" opacity=".4">
          {[.2,.4,.6,.8].map(value => <g key={value}><path d={pathBetween([[value,0],[value,1]])} /><path d={pathBetween([[0,value],[1,value]])} /></g>)}
        </g>
        <polygon points={plane(.045,.045,.91,.91)} fill="none" stroke={selected ? '#a6b9d6' : '#5e6b7e'} strokeWidth=".5" opacity=".35" />
        <g fill="none" stroke={selected ? '#a2b9df' : '#5d697c'} strokeWidth="1.5">
          {routes.map((route,index) => <path key={index} d={pathBetween(route)} />)}
        </g>
        {selected && <path className="drawing-signal" d={pathBetween([[.35,.38],[.35,.55],[.35,.73],[.48,.73]])} fill="none" stroke="#dce7f9" strokeWidth="2" strokeLinecap="round" pathLength="100" strokeDasharray="7 93" />}
        <Module x={.15} y={.18} width={.36} height={.22} label={item.chips[0]} selected={selected} />
        <Module x={.59} y={.16} width={.25} height={.22} label={item.chips[1]} selected={selected} />
        <Module x={.48} y={.63} width={.3} height={.22} label={item.chips[2]} selected={selected} />
        <g className="drawing-annotation">
          <path d={`M${connector.join(' ')}h22l14-20h94`} fill="none" stroke={selected ? '#b1c0d7' : '#626d80'} strokeWidth=".7" />
          <circle cx={connector[0]} cy={connector[1]} r="2.5" fill={selected ? '#c3d3ec' : '#626d80'} />
          <text x="599" y={connector[1]-29} fill={selected ? '#d9dfe8' : '#929aa7'} fontSize="10" letterSpacing=".5">{item.number} / {item.short.toUpperCase()}</text>
        </g>
      </g>;
    })}
  </svg>;
}

export default function EngineeringFocus({ initialActive = 0 }) {
  const [active, setActive] = useState(initialActive);
  const section = useRef(null);
  const item = disciplines[active];
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      section.current?.classList.toggle('is-in-view', entry.isIntersecting);
    }, { threshold: .15 });
    if (section.current) observer.observe(section.current);
    return () => observer.disconnect();
  }, []);

  const moveFocus = (event, index) => {
    if (!['ArrowDown','ArrowUp','ArrowLeft','ArrowRight','Home','End'].includes(event.key)) return;
    event.preventDefault();
    const next = event.key === 'Home' ? 0 : event.key === 'End' ? disciplines.length - 1 : (index + (['ArrowDown','ArrowRight'].includes(event.key) ? 1 : -1) + disciplines.length) % disciplines.length;
    setActive(next);
    document.getElementById(`focus-tab-${disciplines[next].id}`)?.focus();
  };

  return <section className="engineering-focus" id="industries" aria-labelledby="industries-title" ref={section}>
    <div className="engineering-heading"><div><span className="eyebrow teal">MY ENGINEERING FOCUS</span><h2 id="industries-title">Backend logic.<br /><em>Real products.</em></h2></div><p>Good software is a connected effort.<br />These are the three disciplines I bring to the work.</p></div>
    <div className="engineering-workbench">
      <div className="workbench-rule"><span>THE PARTS THAT MAKE IT WORK</span><span>01 — 03</span></div>
      <div className="workbench-layout">
        <div className="discipline-tabs" role="tablist" aria-label="Explore engineering disciplines" aria-orientation="vertical">
          {disciplines.map((discipline,index) => <button key={discipline.id} className="discipline-tab" id={`focus-tab-${discipline.id}`} role="tab" aria-selected={active===index} aria-controls="engineering-detail" tabIndex={active===index?0:-1} onClick={() => setActive(index)} onKeyDown={event => moveFocus(event,index)}>
            <span className="discipline-number">{discipline.number}</span><span className="discipline-label"><strong>{discipline.title}</strong><small>{discipline.tools}</small></span><Arrow />
          </button>)}
          <p className="discipline-instruction"><span aria-hidden="true">↳</span> Select a discipline to look closer.</p>
        </div>
        <div className="engineering-diagram" data-glass="dark"><div className="diagram-caption"><span>CONNECTED BY DESIGN</span><span className="diagram-view">EXPLODED VIEW</span></div><SystemDrawing active={active} /><div className="diagram-baseline"><span>THINK IN SYSTEMS.</span><span>BUILD WITH INTENT.</span></div></div>
      </div>
      <div className="engineering-detail" id="engineering-detail" role="tabpanel" aria-labelledby={`focus-tab-${item.id}`} tabIndex={0}>
        <div className="discipline-statement" key={`statement-${item.id}`}><span className="detail-index">{item.number} / IN PRACTICE</span><h3>{item.description}</h3></div>
        <div className="discipline-evidence" key={`evidence-${item.id}`}><p>{item.context}</p><a href={item.link}>{item.linkLabel}<Arrow /></a></div>
      </div>
    </div>
  </section>;
}
