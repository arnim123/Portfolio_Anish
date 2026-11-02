import { readFile, writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

// Make the built application usable from file:// as well as a normal web server.
// Fonts are embedded; images resolve to the project's local public directory.
const root = fileURLToPath(new URL('../', import.meta.url));
let html = await readFile(resolve(root, 'dist/index.html'), 'utf8');
const scripts = [...html.matchAll(/<script\b[^>]*src="([^"]+)"[^>]*><\/script>/g)];
for (const match of scripts) {
  const source = await readFile(resolve(root, 'dist', match[1].replace(/^\//, '')), 'utf8');
  const safe = source.replaceAll('/images/', './public/images/').replaceAll('/documents/', './public/documents/').replace(/<\/script/gi, '<\\/script');
  html = html.replace(match[0], () => `<script type="module">${safe}</script>`);
}
const styles = [...html.matchAll(/<link\b[^>]*rel="stylesheet"[^>]*href="(\/assets\/[^\"]+)"[^>]*>/g)];
for (const match of styles) {
  let css = await readFile(resolve(root, 'dist', match[1].replace(/^\//, '')), 'utf8');
  const urls = [...new Set([...css.matchAll(/url\((\/assets\/[^)]+)\)/g)].map(item => item[1]))];
  for (const url of urls) {
    const data = await readFile(resolve(root, 'dist', url.replace(/^\//, '')));
    const mime = url.endsWith('.woff2') ? 'font/woff2' : 'font/woff';
    css = css.replaceAll(url, `data:${mime};base64,${data.toString('base64')}`);
  }
  html = html.replace(match[0], () => `<style>${css}</style>`);
}
html = html.replace('href="/favicon.svg"', 'href="./public/favicon.svg"');
await writeFile(resolve(root, 'preview.html'), html);
console.log('Created preview.html — open directly in your browser; no server required.');
