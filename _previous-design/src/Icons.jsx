export function Arrow({ className = '', ...props }) {
  return <svg className={className} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true" {...props}><path d="M4 12h15M13 5l7 7-7 7" /></svg>;
}

export function TechIcon({ type }) {
  if (type === 'next') return <svg viewBox="0 0 56 56" aria-hidden="true"><circle cx="28" cy="28" r="26" fill="currentColor"/><path d="M19 40V16h4l24 32M37 16v20" fill="none" stroke="#0b0c0c" strokeWidth="3" /></svg>;
  if (type === 'react' || type === 'ai') return <svg viewBox="0 0 56 56" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><circle cx="28" cy="28" r="4" fill="currentColor"/><ellipse cx="28" cy="28" rx="26" ry="10"/><ellipse cx="28" cy="28" rx="26" ry="10" transform="rotate(60 28 28)"/><ellipse cx="28" cy="28" rx="26" ry="10" transform="rotate(120 28 28)"/></svg>;
  if (type === 'typescript') return <svg viewBox="0 0 56 56" aria-hidden="true"><rect x="1" y="1" width="54" height="54" rx="2" fill="currentColor"/><text x="9" y="46" fill="#0b0c0c" fontFamily="Arial,sans-serif" fontSize="35" fontWeight="800">TS</text></svg>;
  if (type === 'tailwind') return <svg viewBox="0 0 56 56" fill="currentColor" aria-hidden="true"><path d="M28 11c-8 0-13 4-15 12 3-4 7-5 11-3 2 1 4 4 7 5 7 4 16 2 20-12-4 6-8 7-12 5-4-2-5-7-11-7ZM14 28C6 28 2 32 0 40c4-4 7-5 11-3 3 2 5 4 8 6 8 4 17 0 22-11-5 5-9 6-13 3-4-2-7-7-14-7Z"/></svg>;
  if (type === 'framer') return <svg viewBox="0 0 56 56" fill="currentColor" aria-hidden="true"><path d="M10 2h36v18H28L10 2Zm0 18h18l18 18H28v18L10 38Z"/></svg>;
  if (type === 'vercel') return <svg viewBox="0 0 56 56" fill="currentColor" aria-hidden="true"><path d="m28 6 27 45H1Z"/></svg>;
  if (type === 'database' || type === 'redis') return <svg viewBox="0 0 56 56" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><ellipse cx="28" cy="12" rx="21" ry="8"/><path d="M7 12v31c0 12 42 12 42 0V12M7 27c0 12 42 12 42 0"/></svg>;
  if (type === 'mongo') return <svg viewBox="0 0 56 56" fill="currentColor" aria-hidden="true"><path d="M29 1C20 12 5 33 27 51l2 5 2-8C49 30 37 11 29 1Z"/><path d="M29 13v38" stroke="#111" strokeWidth="1.5"/></svg>;
  const labels = {
    java: '☕', python: 'Py', api: '{ }', spring: '◒', go: 'GO', angular: 'A',
    flutter: 'F', swift: 'S', langdock: 'Ld', llm: 'LLM', pdf: 'PDF', pytorch: 'Pt',
    check: '✓', integration: '⇄', postman: 'P', cicd: '∞', git: 'git', github: 'GH',
    gitlab: 'GL', atlassian: 'A', claude: '✳', cursor: '↖', aws: 'aws', bedrock: 'B',
    kafka: 'K', terraform: 'Tf', kubernetes: 'K8s', docker: '▦',
  };
  return <span className={`tech-letter tech-letter-${type}`} aria-hidden="true">{labels[type] || '⌘'}</span>;
}
