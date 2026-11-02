import assert from 'node:assert/strict';
import { access, readFile, stat } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { resolve } from 'node:path';
import { spawnSync } from 'node:child_process';
import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { createServer } from 'vite';

const root = fileURLToPath(new URL('../', import.meta.url));
const server = await createServer({
  root,
  server: { middlewareMode: true, hmr: false, ws: false, watch: null },
  optimizeDeps: { noDiscovery: true, include: [], entries: [] },
  appType: 'custom',
});
const escaped = text => renderToStaticMarkup(React.createElement('span', null, text)).slice(6, -7);
const includes = (html, text) => assert.ok(html.includes(escaped(text)), `Missing content: ${text}`);

try {
  const { default: App, Inventory, Community, Experience, ProjectDetail, FactoryDetail, sectionIds, locales } = await server.ssrLoadModule('/src/Portfolio.jsx');
  const data = locales.en;
  const { profile, factory, experience, projects, alsoProjects, technologies, categories, categoryNotes, education, volunteering, languages } = data;
  const html = renderToStaticMarkup(React.createElement(App));

  for (const id of sectionIds) assert.ok(html.includes(`id="${id}"`), `Missing section: ${id}`);
  for (const id of ['contact', 'education', 'community']) assert.ok(html.includes(`id="${id}"`), `Missing section: ${id}`);
  const ids = [...html.matchAll(/\sid="([^"]+)"/g)].map(match => match[1]);
  assert.equal(new Set(ids).size, ids.length, 'All page and SVG IDs must be unique.');
  for (const match of html.matchAll(/href="#([^"]+)"/g)) assert.ok(ids.includes(match[1]), `Missing navigation target: #${match[1]}`);
  assert.ok(html.includes('Skip to projects'));
  assert.ok(!/Rajneesh|myselfraj|BugSpoon|Herzify|HIPAA|20\+ OTHER|Selected 3D|Pentium/.test(html), 'Previous-owner content must not remain.');
  assert.ok(!/resume guide|getGuideReply|Concept illustration/i.test(html), 'The simulated chatbot and mock screenshots must not remain.');
  console.log('✓ Page renders, every section and navigation target exists, previous-owner content is absent.');

  const htmlDe = renderToStaticMarkup(React.createElement(App, { initialLang: 'de' }));
  const de = locales.de;
  for (const id of sectionIds) assert.ok(htmlDe.includes(`id="${id}"`), `Missing German section: ${id}`);
  includes(htmlDe, de.profile.audiences.employer.text);
  includes(htmlDe, de.ui.nav.projects);
  includes(htmlDe, de.factory.title);
  for (const project of de.projects) { includes(htmlDe, project.title); includes(htmlDe, project.description); }
  for (const job of de.experience) { includes(htmlDe, job.role); for (const bullet of job.bullets) includes(htmlDe, bullet); }
  for (const item of de.education) { includes(htmlDe, item.degree); includes(htmlDe, item.dates); }
  assert.deepEqual(de.experience.map(item => item.id), experience.map(item => item.id), 'German experience must mirror the English entries.');
  assert.deepEqual(de.projects.map(item => item.id), projects.map(item => item.id), 'German projects must mirror the English entries.');
  assert.equal(de.factory.stages.length, factory.stages.length);
  assert.equal(de.technologies.length, technologies.length);
  assert.ok(html.includes('aria-label="Language / Sprache"'), 'The language switch must render.');
  assert.ok(!/undefined/.test(htmlDe), 'No undefined strings in the German page.');
  assert.ok(!/undefined/.test(html), 'No undefined strings in the English page.');
  assert.ok(!/auxmoney/i.test(profile.audiences.employer.text + profile.intro + await readFile(resolve(root, 'index.html'), 'utf8')), 'The employer is named only in the experience entry.');
  console.log('✓ German version renders with mirrored content and the language switch is present.');

  includes(html, profile.name);
  includes(html, profile.email);
  includes(html, profile.location);
  assert.ok(html.includes('href="https://github.com/Anishyou"'));
  assert.ok(html.includes('href="https://bit.ly/4nRsf3h"'));
  assert.ok(!/727 28812|4917672728812|tel:/.test(html + htmlDe), 'No phone number on the site.');
  assert.ok(html.includes('href="https://efasttrade.com/ftt-chatbot"'));
  const experienceHtml = renderToStaticMarkup(React.createElement(Experience));
  for (const job of experience) {
    includes(experienceHtml, job.role); includes(experienceHtml, job.dates);
    for (const bullet of job.bullets) includes(experienceHtml, bullet);
  }
  assert.deepEqual(experience.map(item => [item.company, item.dates]), [
    ['Auxmoney', 'Oct 2025 – Present'], ['Ippen Digital', 'Dec 2023 – Apr 2024'], ['Technical University of Munich', 'Oct 2023 – Feb 2024'],
  ]);
  const communityHtml = renderToStaticMarkup(React.createElement(Community));
  for (const item of education) { includes(html, item.school); includes(html, item.degree); includes(html, item.dates); }
  assert.ok(education.some(item => item.degree.startsWith('M.Sc.') && item.current), 'The current M.Sc. must be listed.');
  assert.match(experience[0].role, /Werkstudent/);
  assert.match(profile.audiences.employer.text, /Werkstudent/);
  for (const item of volunteering) { includes(communityHtml, item.title); includes(communityHtml, item.dates); }
  for (const language of languages) includes(communityHtml, language.name);
  assert.equal(languages.find(item => item.name === 'Hindi').level, 'Native');
  assert.equal(languages.find(item => item.name === 'Turkish').level, 'Beginner');
  console.log('✓ Contact details, work dates, responsibilities, education, volunteering and languages match the resume.');

  const factoryHtml = renderToStaticMarkup(React.createElement(FactoryDetail));
  for (const stage of factory.stages) { includes(factoryHtml, stage.title); includes(factoryHtml, stage.text); }
  for (const point of factory.points) includes(html, point.title);
  for (const [, audience] of Object.entries(profile.audiences)) { includes(html, audience.label); }
  assert.ok(html.includes('href="https://github.com/Anishyou/claude-factory-skill"'));
  assert.ok(factory.stages.some(stage => stage.kind === 'human'), 'The factory must show its human approval gate.');
  assert.equal(projects.length, 7);
  assert.ok(projects.some(item => item.id === 'cara' && item.statusKey === 'progress'), 'CARA is listed as in progress.');
  for (const project of projects) {
    includes(html, project.title); includes(html, project.description);
    const detail = renderToStaticMarkup(React.createElement(ProjectDetail, { project }));
    includes(detail, project.result);
    assert.ok(!/My part|Mein Teil/.test(detail), 'No role line on project cards.');
    assert.ok(/role="img"/.test(detail), 'Project drawings must be labelled images.');
    for (const link of project.links) assert.ok(detail.includes(`href="${link.href}"`));
  }
  for (const item of alsoProjects) includes(html, item.title);
  for (const category of categories) {
    const panel = renderToStaticMarkup(React.createElement(Inventory, { initialCategory: category }));
    includes(panel, categoryNotes[category]);
    const selected = category === 'All' ? technologies : technologies.filter(tech => tech.category === category);
    assert.ok(selected.length > 0);
    for (const tech of selected) { includes(panel, tech.name); includes(panel, tech.level); includes(panel, tech.source); }
    assert.ok(!/undefined/.test(panel));
    assert.ok(panel.includes(`aria-labelledby="tab-${category}"`));
  }
  assert.equal(technologies.find(item => item.name === 'PyTorch').level, 'University · basic');
  assert.equal(technologies.find(item => item.name === 'Spring Boot').level, 'University & thesis');
  assert.ok(technologies.filter(item => item.category === 'Infra').every(item => item.level === 'Initial exposure' && item.tone === 'weak'));
  assert.ok(!technologies.some(item => item.name === 'Kotlin'), 'Kotlin is an interest, not a claimed skill.');
  console.log('✓ Factory stages, project drawings and the bill of materials render with honest level labels.');

  const images = [...new Set([...html.matchAll(/src="(\/images\/[^" ]+)"/g)].map(match => match[1]))];
  for (const path of images) { const file = resolve(root, `public${path}`); await access(file); assert.ok((await stat(file)).size > 100); }
  await access(resolve(root, 'public/og.png'));
  const original = await readFile(resolve(root, 'assets/Anish_Goyal_CV_EN.pdf'));
  const download = await readFile(resolve(root, `public${profile.resume}`));
  assert.ok(original.equals(download), 'The downloadable CV must be an unchanged copy of the supplied resume.');
  assert.ok(html.includes(`href="${profile.resume}"`));
  const preview = await readFile(resolve(root, 'preview.html'), 'utf8');
  assert.ok(preview.includes('./public/documents/Anish_Goyal_Resume.pdf'));
  assert.ok(preview.includes('./public/images/'));
  assert.ok(!/<script[^>]+src=|href="\/assets\/|url\(\/assets\//.test(preview));
  const script = preview.match(/<script type="module">([\s\S]*?)<\/script>/)?.[1];
  assert.ok(script, 'Standalone preview must include its application.');
  const syntax = spawnSync(process.execPath, ['--check', '--input-type=module'], { input: script, encoding: 'utf8' });
  assert.equal(syntax.status, 0, syntax.stderr);
  console.log('✓ Local assets, the OG image, the unchanged PDF download and the standalone preview are valid.');
  console.log('\nAll content and rendering checks passed. Browser visual testing is not included.');
} finally {
  await server.close();
}
