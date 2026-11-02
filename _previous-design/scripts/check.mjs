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
  const { default: App, Inventory, Modal, Community, Experience } = await server.ssrLoadModule('/src/Portfolio.jsx');
  const data = await server.ssrLoadModule('/src/data.js');
  const { profile, experience, projects, technologies, categories, categoryNotes, education, volunteering, languages } = data;
  const { getGuideReply } = await server.ssrLoadModule('/src/guide.js');
  const html = renderToStaticMarkup(React.createElement(App));

  const requiredIds = ['home', 'about', 'projects', 'experience', 'stack', 'education', 'community', 'contact'];
  for (const id of requiredIds) {
    assert.ok(html.includes(`id="${id}"`), `Missing section: ${id}`);
  }
  const ids = [...html.matchAll(/\sid="([^"]+)"/g)].map(match => match[1]);
  assert.equal(new Set(ids).size, ids.length, 'All page and SVG IDs must be unique.');
  for (const match of html.matchAll(/href="#([^"]+)"/g)) assert.ok(ids.includes(match[1]), `Missing navigation target: #${match[1]}`);
  assert.ok(html.includes('Skip to projects'));
  assert.ok(!/Rajneesh|myselfraj|BugSpoon|Herzify|HIPAA|20\+ OTHER|Selected 3D|Pentium/.test(html), 'Previous-owner content must not remain.');
  console.log('✓ Anish’s page renders, all navigation targets exist, and previous-owner content is absent.');

  const communityHtml = renderToStaticMarkup(React.createElement(Community));
  const experienceHtml = renderToStaticMarkup(React.createElement(Experience));
  assert.ok(html.includes('BEYOND THE CODE'));
  assert.ok(html.includes('id="experience"'));
  assert.ok(html.includes('href="https://efasttrade.com/ftt-chatbot"'));
  assert.ok(html.includes('Live website'));
  assert.ok(!html.includes('Try the live chatbot'));
  includes(html, 'Anish Goyal');
  includes(html, 'goyalanish886@gmail.com');
  includes(html, '+49 176 727 28812');
  includes(html, 'Troisdorf, Germany');
  assert.ok(!html.includes('Open to Munich hybrid roles'));
  assert.ok(!getGuideReply('location').includes('Munich hybrid'));
  assert.ok(html.includes('href="https://github.com/Anishyou"'));
  assert.ok(html.includes('href="https://bit.ly/4nRsf3h"'));
  assert.ok(html.includes('href="tel:+4917672728812"'));
  for (const job of experience) {
    includes(experienceHtml, job.role);
    includes(experienceHtml, job.dates);
    for (const bullet of job.bullets) includes(experienceHtml, bullet);
  }
  assert.deepEqual(experience.map(item => [item.company, item.dates]), [
    ['auxmoney', 'Oct 2025 – Present'], ['Ippen Digital', 'Dec 2023 – Apr 2024'], ['Technical University of Munich', 'Oct 2023 – Feb 2024'],
  ]);
  for (const item of education) { includes(html, item.school); includes(html, item.degree); includes(html, item.dates); }
  for (const item of volunteering) { includes(communityHtml, item.title); includes(communityHtml, item.dates); }
  for (const language of languages) includes(communityHtml, language.name);
  assert.equal(languages.find(item => item.name === 'Hindi').level, 'Native');
  assert.equal(languages.find(item => item.name === 'Turkish').level, 'Beginner');
  assert.ok(languages.filter(item => ['German', 'English'].includes(item.name)).every(item => !item.level));
  console.log('✓ Contact details, work dates, responsibilities, education, volunteering, and language levels match the resume.');

  assert.equal(projects.length, 5);
  for (const project of projects) {
    includes(html, project.title);
    const detail = renderToStaticMarkup(React.createElement(Modal, { type: 'project', project, close() {} }));
    includes(detail, project.fullTitle || project.title);
    includes(detail, project.description);
    includes(detail, project.detail);
    for (const feature of project.features) includes(detail, feature);
    assert.ok(detail.includes('Illustration:'), 'Project visuals must be identified as illustrations.');
  }
  for (const category of categories) {
    const panel = renderToStaticMarkup(React.createElement(Inventory, { initialCategory: category }));
    includes(panel, categoryNotes[category]);
    const selected = category === 'All' ? technologies : technologies.filter(tech => tech.category === category);
    assert.ok(selected.length > 0);
    for (const tech of selected) { includes(panel, tech.name); if (tech.level) includes(panel, tech.level); }
    assert.ok(panel.includes(`aria-labelledby="tab-${category}"`));
  }
  assert.equal(technologies.find(item => item.name === 'PyTorch').level, 'Basic');
  assert.equal(technologies.find(item => item.name === 'Spring Boot').level, 'University & thesis');
  assert.ok(technologies.filter(item => item.category === 'Cloud').every(item => item.level === 'Initial exposure'));
  assert.ok(!technologies.some(item => item.name === 'Kotlin'), 'Kotlin is an interest, not a claimed skill.');
  console.log('✓ All project dialogs and technology filters render, retaining skill-level qualifications.');

  assert.match(getGuideReply('Let’s work together'), /goyalanish886@gmail.com/);
  assert.match(getGuideReply('What did he do at DEGIS Munich?'), /Vice President/);
  assert.match(getGuideReply('What is his education in Munich?'), /B.Sc./);
  assert.match(getGuideReply('What programming languages does he use?'), /Java/);
  assert.match(getGuideReply('Does he know Kotlin?'), /does not claim existing Kotlin proficiency/);
  assert.match(getGuideReply('How experienced is he with AWS?'), /initial hands-on exposure/);
  assert.match(getGuideReply('How fluent is his German?'), /does not specify proficiency/);
  assert.match(getGuideReply('What is his favourite food?'), /isn’t covered/);
  console.log('✓ The resume guide routes questions correctly and avoids inventing unsupported facts.');

  const images = [...new Set([...html.matchAll(/src="(\/images\/[^" ]+)"/g)].map(match => match[1]))];
  for (const path of images) {
    const file = resolve(root, `public${path}`);
    await access(file);
    assert.ok((await stat(file)).size > 100);
  }
  const original = await readFile(resolve(root, 'assets/Anish_Goyal_CV_EN_Scalable_Capital.pdf'));
  const download = await readFile(resolve(root, `public${profile.resume}`));
  assert.ok(original.equals(download), 'The downloadable CV must be an unchanged copy of the supplied resume.');
  assert.ok(html.includes(`href="${profile.resume}"`));
  const preview = await readFile(resolve(root, 'preview.html'), 'utf8');
  assert.ok(preview.includes('./public/documents/Anish_Goyal_Resume.pdf'));
  assert.ok(preview.includes('./public/images/'));
  assert.ok(!/<script[^>]+src=|href="\/assets\/|url\(\/assets\//.test(preview));
  assert.ok(!/Rajneesh|myselfraj|BugSpoon|Herzify/.test(preview));
  const script = preview.match(/<script type="module">([\s\S]*?)<\/script>/)?.[1];
  assert.ok(script, 'Standalone preview must include its application.');
  const syntax = spawnSync(process.execPath, ['--check', '--input-type=module'], { input: script, encoding: 'utf8' });
  assert.equal(syntax.status, 0, syntax.stderr);
  console.log('✓ Local assets, the unchanged PDF download, and the standalone preview are valid.');
  console.log('\nAll content and rendering checks passed. Browser visual testing is not included.');
} finally {
  await server.close();
}
