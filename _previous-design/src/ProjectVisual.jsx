import { useId } from 'react';

const titles = {
  transcription: 'Video, audio, and synchronised transcripts',
  streaming: 'Live lectures, playback, and interactive learning',
  documents: 'Local question answering over PDF documents',
  chatbot: 'A conversational application',
  vision: 'Road data preparation and annotation review',
  backend: 'Java and Python backend development',
  automation: 'AI services, backend workflows, and validation',
  testing: 'Synthetic documents and service testing',
  product: 'Approximately 80 website configurations at Ippen Digital',
};

function Panel({ x, y, width = 145, title, subtitle, symbol }) {
  return <g transform={`translate(${x} ${y})`}>
    <rect width={width} height="118" rx="14" fill="#15181f" stroke="currentColor" strokeOpacity=".35" />
    <text x={width / 2} y="43" textAnchor="middle" fill="currentColor" fontSize="23">{symbol}</text>
    <text x={width / 2} y="75" textAnchor="middle" fill="#e3e9f1" fontSize="14" fontWeight="500">{title}</text>
    <text x={width / 2} y="96" textAnchor="middle" fill="#88909b" fontSize="10">{subtitle}</text>
  </g>;
}

// Schematic illustrations, not screenshots or claims about the actual products' UI.
export default function ProjectVisual({ type, className = '' }) {
  const unique = useId().replaceAll(':', '');
  return <svg className={`project-visual visual-${type} ${className}`} viewBox="0 0 600 360" role="img" aria-label={`Illustration: ${titles[type]}`}>
    <defs>
      <radialGradient id={`${unique}-glow`}><stop stopColor="currentColor" stopOpacity=".12" /><stop offset="1" stopColor="currentColor" stopOpacity="0" /></radialGradient>
      <pattern id={`${unique}-dots`} width="24" height="24" patternUnits="userSpaceOnUse"><circle cx="1" cy="1" r=".8" fill="#96a3b8" opacity=".15" /></pattern>
    </defs>
    <rect width="600" height="360" fill="#0b0c0f" />
    <rect width="600" height="360" fill={`url(#${unique}-dots)`} />
    <ellipse cx="310" cy="190" rx="290" ry="170" fill={`url(#${unique}-glow)`} />
    <text x="30" y="33" className="visual-caption">{type === 'product' ? 'PRODUCT OPERATIONS' : 'SOFTWARE / SYSTEMS'}</text>
    <circle cx="567" cy="29" r="3" fill="currentColor" />

    {(type === 'transcription' || type === 'streaming') && <g>
      <rect x="40" y="67" width="520" height="231" rx="14" fill="#101317" stroke="#2f343b" />
      <rect x="55" y="82" width="297" height="166" rx="8" fill="#1d222b" />
      <path d="m186 137 0 49 39-25Z" fill="currentColor" fillOpacity=".85" />
      <text x="68" y="107" className="visual-caption">{type === 'streaming' ? 'LECTURE / PLAYBACK' : 'VIDEO / AUDIO'}</text>
      {[1, 2, 3, 4, 5, 6].map(n => <g key={n}><rect x="377" y={88 + n * 24} width={n === 3 ? 157 : 122 + n * 3} height="4" rx="2" fill={n === 3 ? 'currentColor' : '#3c4350'} /><rect x="377" y={97 + n * 24} width={86 + n * 7} height="3" rx="1.5" fill="#2d343f" /></g>)}
      <text x="377" y="101" className="visual-caption">{type === 'streaming' ? 'CHAT / QUIZZES' : 'TRANSCRIPT'}</text>
      {Array.from({ length: 70 }, (_, n) => <rect key={n} x={61 + n * 7} y={271 - (Math.sin(n * .7) * Math.sin(n * .23) + 1.2) * 7} width="3" height={(Math.sin(n * .7) * Math.sin(n * .23) + 1.2) * 14} rx="1.5" fill="currentColor" opacity={n < 31 ? .8 : .25} />)}
    </g>}

    {type === 'documents' && <g>
      <path d="M171 185h61m136 0h61" stroke="currentColor" strokeOpacity=".5" strokeDasharray="4 5" />
      <g transform="rotate(-8 113 185)"><rect x="57" y="108" width="112" height="150" rx="8" fill="#1a1e24" stroke="#617088" /><path d="M78 151h51m-51 17h68m-68 17h60m-60 17h67m-67 17h43" stroke="#838fa1" strokeWidth="4" strokeLinecap="round" /><text x="77" y="135" fill="currentColor" fontSize="12">PDF</text></g>
      <circle cx="300" cy="185" r="69" fill="#141920" stroke="currentColor" strokeOpacity=".55" /><circle cx="300" cy="185" r="81" fill="none" stroke="currentColor" strokeOpacity=".15" strokeDasharray="3 5" />
      <text x="300" y="185" textAnchor="middle" fill="#edf3fd" fontSize="25" fontWeight="500">LoGPT</text><text x="300" y="207" textAnchor="middle" className="visual-caption">LOCAL Q&amp;A</text>
      <rect x="431" y="135" width="120" height="105" rx="12" fill="#1b212b" stroke="#586a88" /><text x="447" y="163" fill="currentColor" fontSize="12">Answer</text><path d="M449 182h80m-80 14h66m-66 14h72" stroke="#798494" strokeWidth="3" strokeLinecap="round" />
    </g>}

    {type === 'chatbot' && <g>
      <circle cx="300" cy="175" r="132" fill="none" stroke="currentColor" strokeOpacity=".08" /><circle cx="300" cy="175" r="103" fill="none" stroke="currentColor" strokeOpacity=".12" />
      <path d="M103 101h280a18 18 0 0 1 18 18v45a18 18 0 0 1-18 18H132l-29 20v-83a18 18 0 0 1 18-18" fill="#1f252f" stroke="#54647e" />
      <text x="137" y="132" className="visual-caption">MESSAGE</text><path d="M137 153h205" stroke="#8194b4" strokeWidth="4" strokeLinecap="round" />
      <path d="M220 211h277a18 18 0 0 1 18 18v83l-29-20H220a18 18 0 0 1-18-18v-45a18 18 0 0 1 18-18" fill="#24334c" stroke="currentColor" strokeOpacity=".6" />
      <text x="226" y="241" className="visual-caption">CHATBOT RESPONSE</text><circle cx="232" cy="263" r="3" fill="currentColor"/><circle cx="248" cy="263" r="3" fill="currentColor"/><circle cx="264" cy="263" r="3" fill="currentColor"/>
    </g>}

    {type === 'vision' && <g>
      <path d="M183 66h229l135 241H50Z" fill="#1c1f23" stroke="#434851" />
      <path d="m291 75-14 42m-12 34-18 51m-12 38-20 56M349 75l14 42m12 34 18 51m12 38 20 56" stroke="#7d8490" strokeWidth="4" strokeDasharray="15 15" />
      <path d="m201 212 18-11 22 8 16-5 15 13-9 19-34 5-22-12Z" fill="#090a0c" stroke="#6b7077" />
      <rect x="185" y="188" width="104" height="70" rx="3" fill="none" stroke="currentColor" strokeWidth="1.5" />
      <text x="186" y="180" fill="currentColor" fontSize="10" letterSpacing="1.5">ANNOTATION REVIEW</text>
      <path d="M290 221h104l27-37" fill="none" stroke="currentColor" strokeOpacity=".5" /><text x="408" y="171" fill="#b7bec8" fontSize="10">DATA → TEST → EVALUATE</text>
    </g>}

    {type === 'backend' && <g>
      <rect x="70" y="75" width="460" height="217" rx="15" fill="#12161c" stroke="#3d4757" />
      <path d="M70 111h460" stroke="#3d4757" /><circle cx="91" cy="93" r="4" fill="#8392a9"/><circle cx="108" cy="93" r="4" fill="#5f6e85"/><circle cx="125" cy="93" r="4" fill="#404d62"/>
      <text x="157" y="97" className="visual-caption">BACKEND / SERVICES</text>
      <text x="101" y="152" fill="#8091ab" fontFamily="monospace" fontSize="14">request</text><text x="174" y="152" fill="#dbe2ed" fontFamily="monospace" fontSize="14"> → process → response</text>
      <text x="102" y="197" fill="currentColor" fontSize="34" fontWeight="500">Java / Spring Boot</text><text x="102" y="235" fill="#b0b9c6" fontSize="22">Python</text>
      <path d="M104 265h165m12 0h94m12 0h111" stroke="#414d61" strokeWidth="3" strokeLinecap="round" />
    </g>}

    {type === 'automation' && <g><path d="M174 184h37m177 0h37" stroke="currentColor" strokeOpacity=".6" strokeDasharray="5 5" /><Panel x={29} y={122} title="AI services" subtitle="OpenAI APIs · Langdock" symbol="✳" /><Panel x={227} y={122} title="Backend logic" subtitle="Process · communicate" symbol="⌘" /><Panel x={426} y={122} title="Validation" subtitle="Responses · errors" symbol="✓" /><path d="M102 258v29h395v-29" fill="none" stroke="currentColor" strokeOpacity=".25" /><text x="300" y="309" textAnchor="middle" className="visual-caption">BUSINESS &amp; DEVELOPMENT WORKFLOWS</text></g>}

    {type === 'testing' && <g>
      <rect x="58" y="108" width="138" height="160" rx="13" fill="#182231" stroke="#4b6183" /><text x="127" y="156" textAnchor="middle" fill="currentColor" fontSize="32">PDF</text><text x="127" y="185" textAnchor="middle" fill="#bdc6d5" fontSize="12">Synthetic test data</text><path d="M86 213h84m-84 16h60" stroke="#5a7298" strokeWidth="3" strokeLinecap="round" />
      <path d="M196 186h56m0-53v108m0-108h37m-37 54h37m-37 54h37" fill="none" stroke="#637ea8" />
      {['Functional testing', 'Integration testing', 'Output validation'].map((label, index) => <g key={label}><rect x="290" y={110 + index * 54} width="246" height="43" rx="9" fill="#1a1f28" stroke="#435572" /><circle cx="314" cy={131 + index * 54} r="7" fill="none" stroke="currentColor" /><text x="338" y={136 + index * 54} fill="#cdd3de" fontSize="13">{label}</text></g>)}
    </g>}

    {type === 'product' && <g>
      {Array.from({ length: 18 }, (_, i) => { const a = i * Math.PI / 9; const x = 300 + Math.cos(a) * 211; const y = 183 + Math.sin(a) * 115; return <g key={i}><path d={`M300 183L${x} ${y}`} stroke="currentColor" strokeOpacity=".15" /><rect x={x - 12} y={y - 9} width="24" height="18" rx="3" fill="#202732" stroke="#6e82a4" /></g>; })}
      <circle cx="300" cy="183" r="81" fill="#131821" stroke="currentColor" strokeOpacity=".5" /><text x="300" y="183" textAnchor="middle" fill="#e6edf8" fontSize="53" fontWeight="500">~80</text><text x="300" y="209" textAnchor="middle" className="visual-caption">WEBSITES</text>
    </g>}
    <text x="30" y="339" className="visual-caption visual-footnote">{type === 'product' ? 'IPPEN DIGITAL / CONFIGURATION MANAGEMENT' : 'ILLUSTRATIVE WORKFLOW'}</text>
  </svg>;
}
