import { createContext, useContext, useEffect, useId, useRef, useState } from 'react';

const MarkerContext = createContext('arrow');
import { factory } from './data';

// ---------------------------------------------------------------------------
// Drawing primitives. Everything is drawn in a single "sheet" style: thin
// lines, monospace annotations, one signal colour. Wires carry pathLength=1
// so CSS can draw them in with stroke-dashoffset when the sheet scrolls into view.
// ---------------------------------------------------------------------------

export function Drawing({ viewBox, label, children, className = '', drawOnView = true }) {
  const ref = useRef(null);
  const markerId = `arrow-${useId().replace(/[^a-zA-Z0-9]/g, '')}`;
  useEffect(() => {
    const element = ref.current;
    if (!element || !drawOnView) return;
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) { element.classList.add('is-drawn'); return; }
    const observer = new IntersectionObserver(([entry]) => { if (entry.isIntersecting) { element.classList.add('is-drawn'); observer.disconnect(); } }, { threshold: 0.35 });
    observer.observe(element);
    return () => observer.disconnect();
  }, [drawOnView]);
  return <svg ref={ref} className={`drawing ${drawOnView ? '' : 'is-drawn'} ${className}`} viewBox={viewBox} role="img" aria-label={label}>
    <defs>
      <marker id={markerId} viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M1 1l8 4-8 4" fill="none" stroke="currentColor" strokeWidth="1.2" /></marker>
    </defs>
    <MarkerContext.Provider value={markerId}>{children}</MarkerContext.Provider>
  </svg>;
}

export function Box({ x, y, w, h, label, sub, tone = '', i = 0, dashed = false }) {
  return <g className={`box ${tone}`} style={{ '--i': i }}>
    <rect x={x} y={y} width={w} height={h} strokeDasharray={dashed ? '4 4' : undefined} />
    <text className="box-label" x={x + w / 2} y={sub ? y + h / 2 - 3 : y + h / 2 + 4} textAnchor="middle">{label}</text>
    {sub && <text className="box-sub" x={x + w / 2} y={y + h / 2 + 12} textAnchor="middle">{sub}</text>}
  </g>;
}

export function Wire({ d, i = 0, arrow = true, dashed = false, tone = '' }) {
  const markerId = useContext(MarkerContext);
  return <path className={`wire ${tone} ${dashed ? 'is-dashed' : ''}`} d={d} pathLength="1" style={{ '--i': i }} markerEnd={arrow ? `url(#${markerId})` : undefined} />;
}

export function Note({ x, y, children, anchor = 'start', i = 0, tone = '' }) {
  return <text className={`note ${tone}`} x={x} y={y} textAnchor={anchor} style={{ '--i': i }}>{children}</text>;
}

export function Dim({ x1, y1, x2, y2, label, i = 0 }) {
  const vertical = x1 === x2;
  const tick = 5;
  return <g className="dim" style={{ '--i': i }}>
    <path d={`M${x1} ${y1}L${x2} ${y2}`} pathLength="1" className="wire thin" />
    {vertical
      ? <><path d={`M${x1 - tick} ${y1}h${tick * 2}`} /><path d={`M${x2 - tick} ${y2}h${tick * 2}`} /></>
      : <><path d={`M${x1} ${y1 - tick}v${tick * 2}`} /><path d={`M${x2} ${y2 - tick}v${tick * 2}`} /></>}
    <text x={(x1 + x2) / 2} y={vertical ? (y1 + y2) / 2 + 3 : y1 - 7} textAnchor="middle" className="note">{label}</text>
  </g>;
}

export function Boundary({ x, y, w, h, label, i = 0 }) {
  return <g className="boundary" style={{ '--i': i }}>
    <rect x={x} y={y} width={w} height={h} strokeDasharray="3 5" />
    <text x={x + 10} y={y + 16} className="note">{label}</text>
  </g>;
}

// ---------------------------------------------------------------------------
// The factory animation. A brief travels through the pipeline; each agent
// lights up, the wire ahead is drawn, and a run log fills in below.
// ---------------------------------------------------------------------------

const STEP_MS = 1500;
const END_PAUSE_MS = 3600;

export function useFactoryRun(autoplay = true, stages = factory.stages) {
  const [step, setStep] = useState(() => (typeof matchMedia !== 'undefined' && matchMedia('(prefers-reduced-motion: reduce)').matches ? stages.length - 1 : 0));
  const [playing, setPlaying] = useState(() => autoplay && !(typeof matchMedia !== 'undefined' && matchMedia('(prefers-reduced-motion: reduce)').matches));
  useEffect(() => {
    if (!playing) return;
    const last = stages.length - 1;
    const timer = setTimeout(() => setStep(current => (current >= last ? 0 : current + 1)), step >= last ? END_PAUSE_MS : step === 0 ? STEP_MS * 0.8 : STEP_MS);
    return () => clearTimeout(timer);
  }, [playing, step, stages.length]);
  return { step, setStep, playing, setPlaying, stages };
}

export function FactoryMotion({ run, compact = false, showLog = true }) {
  const { step, setStep, setPlaying, stages } = run;
  const row = stages.filter(stage => stage.id !== 'supervisor');
  const supervisor = stages.find(stage => stage.id === 'supervisor');
  const supervisorIndex = stages.indexOf(supervisor);
  const W = 1180, margin = 40, gap = 30, bw = (W - margin * 2 - gap * (row.length - 1)) / row.length, bh = 58, rowY = 214;
  const xs = row.map((_, index) => margin + index * (bw + gap));
  const centerX = index => xs[index] + bw / 2;
  const stageIndex = id => stages.findIndex(stage => stage.id === id);
  const activeRowIndex = Math.max(0, row.findIndex(stage => stageIndex(stage.id) === step));
  const tokenX = step === supervisorIndex ? W / 2 : centerX(activeRowIndex);
  const tokenY = step === supervisorIndex ? 40 : rowY - 18;
  const state = id => { const index = stageIndex(id); return index === step ? 'is-active' : index < step ? 'is-done' : ''; };
  const buildIndex = row.findIndex(stage => stage.id === 'build');
  const reviewIndex = row.findIndex(stage => stage.id === 'review');
  const loopActive = step >= stageIndex('review');

  return <div className={`factory-motion ${compact ? 'is-compact' : ''}`}>
    <svg viewBox={`0 0 ${W} 360`} className="drawing is-drawn factory-svg" role="img" aria-label="Animated diagram of the software factory: a brief passes through supervisor, interview, spec-writer, designer, a human approval gate, test-writer, builder and reviewer, and comes out as a nearly finished project.">
      <defs><marker id="farrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M1 1l8 4-8 4" fill="none" stroke="currentColor" strokeWidth="1.2" /></marker></defs>
      {/* sheet furniture */}
      <text className="note" x={margin} y={24}>FIG. 01 — SOFTWARE FACTORY · CONTROL FLOW</text>
      <text className="note" x={W - margin} y={24} textAnchor="end">DESIGN-FIRST · HUMAN GATE · HOOK-ENFORCED</text>
      {/* supervisor */}
      <g className={`box agent supervisor ${state('supervisor')}`} onClick={() => { setStep(supervisorIndex); setPlaying(false); }}>
        <rect x={W / 2 - 170} y={54} width={340} height={52} />
        <text className="box-label" x={W / 2} y={77} textAnchor="middle">/FACTORY SKILL + HOOKS</text>
        <text className="box-sub" x={W / 2} y={94} textAnchor="middle">guard.py · gate.py · session-start.py</text>
      </g>
      {/* supervisor control lines */}
      {row.map((stage, index) => stage.kind === 'agent' && <path key={stage.id} className={`wire control ${stageIndex(stage.id) <= step ? 'is-on' : ''}`} d={`M${centerX(index)} ${rowY}V140H${W / 2}V106`} />)}
      {/* main wires */}
      {row.slice(0, -1).map((stage, index) => <path key={stage.id} className={`wire main ${stageIndex(row[index + 1].id) <= step ? 'is-on' : ''}`} d={`M${xs[index] + bw} ${rowY + bh / 2}H${xs[index + 1]}`} markerEnd="url(#farrow)" />)}
      {/* fix loop review → build */}
      <path className={`wire loop ${loopActive ? 'is-on' : ''}`} d={`M${centerX(reviewIndex)} ${rowY + bh}V312H${centerX(buildIndex)}V${rowY + bh}`} markerEnd="url(#farrow)" />
      <text className={`note ${loopActive ? '' : 'is-dim'}`} x={(centerX(reviewIndex) + centerX(buildIndex)) / 2} y={330} textAnchor="middle">FIX LOOP UNTIL TESTS PASS</text>
      {/* stages */}
      {row.map((stage, index) => {
        const x = xs[index], cx = centerX(index), cy = rowY + bh / 2;
        const cls = `box ${stage.kind} ${state(stage.id)}`;
        const jump = () => { setStep(stageIndex(stage.id)); setPlaying(false); };
        if (stage.kind === 'human') return <g key={stage.id} className={cls} onClick={jump}>
          <polygon points={`${cx},${rowY - 6} ${x + bw + 6},${cy} ${cx},${rowY + bh + 6} ${x - 6},${cy}`} />
          <circle className="gate-pulse" cx={cx} cy={cy} r={34} />
          <text className="box-label" x={cx} y={cy - 2} textAnchor="middle">HUMAN</text>
          <text className="box-sub" x={cx} y={cy + 13} textAnchor="middle">approves UI</text>
        </g>;
        return <g key={stage.id} className={cls} onClick={jump}>
          <rect x={x} y={rowY} width={bw} height={bh} rx={stage.kind === 'input' || stage.kind === 'output' ? 10 : 0} />
          <text className="box-label" x={cx} y={cy - 2} textAnchor="middle">{stage.label}</text>
          <text className="box-sub" x={cx} y={cy + 14} textAnchor="middle">{stage.kind === 'agent' ? 'agent' : stage.kind === 'input' ? 'brief.md' : 'reviewed'}</text>
        </g>;
      })}
      {/* travelling token */}
      <g className="token" style={{ transform: `translate(${tokenX}px, ${tokenY}px)` }}><circle r="7" /><circle r="13" className="token-ring" /></g>
      {/* dimension */}
      <path className="wire thin is-on" d={`M${xs[0]} 300H${xs[row.length - 1] + bw}`} />
      <text className="note" x={xs[0]} y={292}>ONE JOB</text>
      <text className="note" x={xs[row.length - 1] + bw} y={292} textAnchor="end">ONE JOB → ONE PULL REQUEST</text>
    </svg>
    {showLog ? <RunLog stages={stages} step={step} /> : <p className="run-caption mono" aria-live="polite">{stages[step].log}</p>}
  </div>;
}

function RunLog({ stages, step }) {
  const lines = stages.slice(0, step + 1);
  return <div className="run-log" aria-live="off">
    <div className="run-log-head"><span>claude › factory run</span><span>illustrative log</span></div>
    <ol>{lines.map((stage, index) => <li key={stage.id} className={index === step ? 'is-current' : ''}>{stage.log}</li>)}</ol>
  </div>;
}

// ---------------------------------------------------------------------------
// Project architecture drawings. Real structure, no screenshots.
// ---------------------------------------------------------------------------

export function ProjectDiagram({ type }) {
  if (type === 'factory') {
    const labels = ['PLANNER', 'DESIGN', 'SPEC', 'TESTS', 'BUILD', 'REVIEW', 'APPROVE'];
    const x = index => 112 + index * 76;
    return <Drawing viewBox="0 0 760 230" label="Compact software factory pipeline: a brief enters the /factory skill, passes planner, designer, human approval, spec-writer, test-writer, builder, four reviewers and approver, and leaves as a pull request. Hooks guard every step.">
      <Box x={14} y={92} w={82} h={44} label="BRIEF" i={0} />
      <Box x={200} y={18} w={360} h={40} label="/FACTORY SKILL + HOOKS" sub="guard.py · gate.py · session-start.py" i={1} tone="agent" />
      {labels.map((label, index) => <Box key={label} x={x(index)} y={92} w={68} h={44} label={label} sub={label === 'REVIEW' ? '×4 parallel' : undefined} i={2 + index} tone="agent" />)}
      {labels.map((label, index) => <Wire key={label} d={`M${x(index) + 34} 92V74H380V58`} i={2 + index} arrow={false} tone="control" />)}
      <Wire d="M96 114H118" i={1} />
      {labels.slice(0, -1).map((label, index) => <Wire key={label} d={`M${x(index) + 68} 114H${x(index + 1)}`} i={3 + index} />)}
      <Box x={664} y={92} w={84} h={44} label="PR" sub="human merges" i={10} tone="output" />
      <Wire d={`M${x(6) + 68} 114H664`} i={9} />
      <Wire d={`M${x(5) + 34} 136V172H${x(4) + 34}V136`} i={10} dashed />
      <Note x={x(5)} y={188} anchor="middle" i={10}>fix loop</Note>
      <Wire d={`M${x(1) + 34} 136V160`} i={4} arrow={false} tone="control" />
      <Note x={x(1) + 34} y={176} anchor="middle" i={4} tone="signal">▲ HUMAN</Note>
      <Note x={x(1) + 34} y={190} anchor="middle" i={4} tone="signal">approves mockups</Note>
      <Note x={380} y={218} anchor="middle" i={8}>one feature at a time · job branch per feature · nothing reaches main without a human</Note>
    </Drawing>;
  }

  if (type === 'cara') return <Drawing viewBox="0 0 760 250" label="Planned CARA architecture: a doctor talks to a React dashboard of widgets and to an LLM agent with tool access; both go through a FastAPI backend to the patient records, and the agent sees the same dashboard as the doctor.">
    <Boundary x={10} y={14} w={740} h={222} label="PLANNED ARCHITECTURE · COURSE PROJECT, IN PROGRESS" i={0} />
    <Box x={28} y={96} w={96} h={52} label="DOCTOR" sub="asks · clicks" i={1} tone="human" />
    <Box x={176} y={44} w={150} h={52} label="DASHBOARD" sub="React · dynamic widgets" i={2} />
    <Box x={176} y={148} w={150} h={52} label="LLM AGENT" sub="tool calling · MCP" i={3} tone="agent" />
    <Box x={400} y={96} w={120} h={52} label="API" sub="FastAPI · tools" i={4} />
    <Box x={580} y={96} w={150} h={52} label="RECORDS" sub="longitudinal · per patient" i={5} />
    <Wire d="M124 112H150V70H176" i={1} /><Wire d="M124 132H150V174H176" i={2} />
    <Wire d="M326 70H360V112H400" i={3} /><Wire d="M326 174H360V132H400" i={4} /><Wire d="M520 122H580" i={5} />
    <Wire d="M251 96V148" i={3} dashed /><Note x={262} y={126} i={3} tone="signal">sees the same screen</Note>
    <Wire d="M470 148V206H251V200" i={6} dashed /><Note x={360} y={222} anchor="middle" i={6}>agent creates · configures · removes widgets</Note>
    <Note x={655} y={168} anchor="middle" i={5}>drill-down: chart → rows</Note>
    <Note x={655} y={184} anchor="middle" i={5}>per-user config persists</Note>
  </Drawing>;

  if (type === 'bjj') return <Drawing viewBox="0 0 760 250" label="Planned BJJ coaching pipeline: smartphone video goes through a pose model or an RGB video encoder into features with confidence, a temporal model recognises positions and transitions, a reliability check decides whether the feedback agent coaches or abstains.">
    <Boundary x={10} y={14} w={740} h={222} label="PLANNED PIPELINE · RESEARCH PROJECT, IN PROGRESS" i={0} />
    <Box x={24} y={96} w={92} h={52} label="VIDEO" sub="one phone · drill" i={1} />
    <Box x={150} y={44} w={120} h={46} label="POSE MODEL" sub="2D keypoints" i={2} tone="agent" />
    <Box x={150} y={150} w={120} h={46} label="RGB ENCODER" sub="video features" i={3} tone="agent" />
    <Box x={304} y={96} w={110} h={52} label="TEMPORAL" sub="positions → transitions" i={4} tone="agent" />
    <Box x={448} y={96} w={120} h={52} label="RELIABLE?" sub="confidence check" i={5} tone="human" />
    <Box x={602} y={96} w={130} h={52} label="COACH" sub="feedback or abstain" i={6} tone="output" />
    <Wire d="M116 112H132V67H150" i={1} /><Wire d="M116 132H132V173H150" i={2} />
    <Wire d="M270 67H288V112H304" i={3} /><Wire d="M270 173H288V132H304" i={4} />
    <Wire d="M414 122H448" i={5} /><Wire d="M568 122H602" i={6} />
    <Wire d="M508 148V206H70V148" i={7} dashed /><Note x={290} y={222} anchor="middle" i={7}>not reliable → wait · re-analyse · ask for a better camera angle</Note>
    <Note x={359} y={82} anchor="middle" i={4}>pose vs. RGB · compared</Note>
    <Note x={667} y={168} anchor="middle" i={6}>compared with the expected drill</Note>
  </Drawing>;

  if (type === 'city') return <Drawing viewBox="0 0 760 240" label="City image inspection architecture: cameras stream images to an ingest API, object store, GPU inference workers, a detections database, a human review queue and municipal reports.">
    <Boundary x={10} y={14} w={740} h={150} label="IN-REGION HOSTING · COST MODELLED PER CAMERA" i={0} />
    <Box x={24} y={70} w={118} h={52} label="CAMERAS" sub="×N · 1 img/s each" i={1} />
    <Box x={166} y={70} w={118} h={52} label="INGEST API" sub="auth · dedupe" i={2} />
    <Box x={308} y={70} w={118} h={52} label="OBJECT STORE" sub="images · retention" i={3} />
    <Box x={450} y={70} w={128} h={52} label="INFERENCE" sub="GPU workers · batch" i={4} tone="agent" />
    <Box x={602} y={70} w={134} h={52} label="DETECTIONS DB" sub="class · geo · time" i={5} />
    <Wire d="M142 96H166" i={1} /><Wire d="M284 96H308" i={2} /><Wire d="M426 96H450" i={3} /><Wire d="M578 96H602" i={4} />
    <Box x={450} y={180} w={128} h={44} label="REVIEW QUEUE" sub="human check" i={6} tone="human" />
    <Box x={602} y={180} w={134} h={44} label="REPORTS" sub="dashboard · dispatch" i={7} tone="output" />
    <Wire d="M669 122V180" i={5} /><Wire d="M602 202H578" i={6} /><Wire d="M514 180V122" i={7} dashed />
    <Dim x1={24} y1={150} x2={426} y2={150} label="throughput sized from N × 1 img/s" i={3} />
  </Drawing>;

  if (type === 'chatbot') return <Drawing viewBox="0 0 760 200" label="FAST TRADE assistant architecture: website pages and uploaded documents are indexed; the assistant on efasttrade.com answers visitor questions from that index.">
    <Box x={30} y={30} w={130} h={46} label="WEBSITE PAGES" sub="efasttrade.com" i={0} />
    <Box x={30} y={110} w={130} h={46} label="DOCUMENTS" sub="uploaded by the team" i={1} />
    <Box x={240} y={70} w={120} h={46} label="INDEX" sub="site knowledge" i={2} />
    <Box x={420} y={70} w={150} h={46} label="ASSISTANT" sub="answers from sources" i={3} tone="agent" />
    <Box x={630} y={70} w={100} h={46} label="VISITOR" sub="chat widget" i={4} tone="human" />
    <Wire d="M160 53H200V93H240" i={1} /><Wire d="M160 133H200V93" i={2} arrow={false} />
    <Wire d="M360 93H420" i={3} /><Wire d="M570 86H630" i={4} /><Wire d="M630 100H570" i={4} />
    <Note x={600} y={62} anchor="middle" i={4}>question</Note><Note x={600} y={134} anchor="middle" i={4}>answer</Note>
    <Boundary x={408} y={20} w={334} h={150} label="LIVE ON THE PUBLIC WEBSITE" i={0} />
  </Drawing>;

  if (type === 'logpt') return <Drawing viewBox="0 0 760 200" label="LoGPT architecture: PDFs are parsed and chunked into a local index; a local language model answers questions with references, entirely on the user's machine.">
    <Boundary x={10} y={14} w={740} h={170} label="RUNS ON THE USER’S MACHINE · NO DOCUMENT LEAVES IT" i={0} />
    <Box x={30} y={80} w={90} h={48} label="PDFs" sub="any folder" i={1} />
    <Box x={160} y={80} w={120} h={48} label="PARSE & CHUNK" sub="pages → passages" i={2} />
    <Box x={320} y={80} w={110} h={48} label="LOCAL INDEX" sub="retrieval" i={3} />
    <Box x={470} y={80} w={110} h={48} label="LOCAL LLM" sub="open-source" i={4} tone="agent" />
    <Box x={620} y={80} w={110} h={48} label="ANSWER" sub="+ source passages" i={5} tone="output" />
    <Wire d="M120 104H160" i={1} /><Wire d="M280 104H320" i={2} /><Wire d="M430 104H470" i={3} /><Wire d="M580 104H620" i={4} />
    <Wire d="M525 128V160H375V128" i={5} dashed /><Note x={450} y={174} anchor="middle" i={5}>question → relevant passages → model</Note>
  </Drawing>;

  if (type === 'transcription') return <Drawing viewBox="0 0 760 220" label="Thesis architecture: video and audio go through a Spring Boot API to a Python transcription worker; transcripts are stored and served to an Angular player that stays in sync with playback.">
    <Box x={30} y={70} w={100} h={50} label="VIDEO / AUDIO" sub="upload" i={0} />
    <Box x={170} y={70} w={120} h={50} label="SPRING BOOT" sub="Java API" i={1} />
    <Box x={330} y={70} w={130} h={50} label="TRANSCRIPTION" sub="Python worker" i={2} tone="agent" />
    <Box x={500} y={70} w={110} h={50} label="TRANSCRIPT" sub="timestamps" i={3} />
    <Box x={650} y={70} w={90} h={50} label="PLAYER" sub="Angular" i={4} tone="output" />
    <Wire d="M130 95H170" i={0} /><Wire d="M290 95H330" i={1} /><Wire d="M460 95H500" i={2} /><Wire d="M610 95H650" i={3} />
    <Wire d="M695 120V170H230V120" i={4} dashed /><Note x={462} y={186} anchor="middle" i={4}>seek ↔ transcript line · synchronised both ways</Note>
    <Dim x1={30} y1={40} x2={460} y2={40} label="backend · Java / Spring Boot + Python" i={2} />
    <Dim x1={500} y1={40} x2={740} y2={40} label="frontend · Angular" i={3} />
  </Drawing>;

  return null;
}
