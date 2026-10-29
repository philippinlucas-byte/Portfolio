import {readFile,stat,readdir} from 'node:fs/promises';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import assert from 'node:assert/strict';
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const dist=path.join(root,'dist');
const data=JSON.parse(await readFile(path.join(root,'src/data/portfolio.json'),'utf8'));
const pages=['index.html','projets/index.html','contact/index.html','404.html',...data.projects.map(p=>`${p.slug}/index.html`)];
let references=0;
for(const page of pages) {
  const source=await readFile(path.join(dist,page),'utf8');
  assert.equal((source.match(/<h1[ >]/g)||[]).length,1,`${page}: one main heading required`);
  assert(source.includes('<html lang="fr">'),`${page}: French language`);
  const ids=[...source.matchAll(/\bid="([^"]+)"/g)].map(m=>m[1]);
  assert.equal(ids.length,new Set(ids).size,`${page}: duplicate IDs`);
  for(const match of source.matchAll(/(?:src|href)="(\/[^"#]*)(?:#[^"]*)?"/g)) {
    const url=match[1];
    let target=path.join(dist,decodeURIComponent(url));
    if(url.endsWith('/')) target=path.join(target,'index.html');
    assert((await stat(target)).isFile(),`${page}: broken local reference ${url}`);references++;
  }
  const names=[...source.matchAll(/view-transition-name:([^";]+)/g)].map(m=>m[1]);
  assert.equal(names.length,new Set(names).size,`${page}: duplicated View Transition names`);
  assert(!/https:\/\/cdn\.myportfolio|use\.typekit\.net|wanteeed|data:image\/gif/.test(source),`${page}: exported dependencies remain`);
}
for(const p of data.projects) {
  const source=await readFile(path.join(dist,p.slug,'index.html'),'utf8');
  const expected=p.modules.filter(m=>m.type==='images').flatMap(m=>m.items);
  assert.equal((source.match(/data-gallery=/g)||[]).length,expected.length,`${p.slug}: project images lost`);
  for(const m of p.modules.filter(m=>m.type==='text')) assert(source.includes(m.html),`${p.slug}: source text changed`);
  for(const image of [p.cover,...expected]) for(const variant of image.variants) {
    const bytes=await readFile(path.join(dist,variant.src));
    assert.equal(bytes.toString('ascii',8,12),'WEBP',variant.src);
    assert(bytes.includes(Buffer.from('dc:source')),`${variant.src}: missing source attribution`);
  }
}
for(const filename of await readdir(path.join(dist,'assets'))) assert((await stat(path.join(dist,'assets',filename))).size<25*1024*1024,`Oversized Cloudflare asset ${filename}`);
const css=await readFile(path.join(dist,'styles.css'),'utf8');
assert(css.includes('prefers-reduced-motion: reduce'),'Reduced-motion style missing');
const fonts=await readFile(path.join(dist,'fonts/fonts.css'),'utf8');
assert(fonts.includes('font-weight: 700'),'Real bold font required');
assert(!fonts.includes('https:'),'Fonts must be self-hosted');
console.log(`PASS: ${pages.length} pages, ${references} local references, all project modules and WebP provenance; font and motion fallbacks checked.`);
