import { readFile, writeFile, mkdir, cp } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const dist = path.join(root, 'dist');
const data = JSON.parse(await readFile(path.join(root, 'src/data/portfolio.json'), 'utf8'));
const origin = process.env.SITE_URL?.replace(/\/$/, '');
if (origin && !/^https:\/\/[^/]+$/.test(origin)) throw new Error('SITE_URL must be an HTTPS origin without a path.');
await mkdir(dist, { recursive: true });
await cp(path.join(root, 'public'), dist, { recursive: true });
for (const file of ['styles.css', 'site.js']) await cp(path.join(root, 'src', file), path.join(dist, file));
await cp(path.join(root, 'src', 'home.css'), path.join(dist, 'home.css'));
await cp(path.join(root, 'src', 'home.js'), path.join(dist, 'home.js'));
const esc = value => String(value).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const arrow = '<svg viewBox="0 0 24 24" aria-hidden="true" class="icon"><path d="M4 18c0-7 4-11 14-11m-4-4 4 4-4 4"/></svg>';
const chevron = '<svg viewBox="0 0 24 24" aria-hidden="true" class="icon"><path d="M15 6c-2 3-4 5-7 6 3 1 5 3 7 6"/></svg>';
const closeIcon = '<svg viewBox="0 0 24 24" aria-hidden="true" class="icon"><path d="m6 6 12 12M6 18 18 6"/></svg>';
const plus = '<svg viewBox="0 0 24 24" aria-hidden="true" class="icon"><path d="M12 5v14M5 12h14"/></svg>';
const projectHref = p => `/${p.slug}/`;
const disciplines = {
  'termino-logic-croix-rouge-competence': 'Édition · Jeu pédagogique',
  'identite-graphique-lucas-philippin': 'Identité visuelle',
  '5-modular-resume-templates': 'Mise en page · Figma',
  'webdesign-raise': 'Webdesign',
  'logo-and-business-card-resiop': 'Identité · Supports imprimés'
};
const social = '<a href="https://www.linkedin.com/in/lucas-philippin" target="_blank" rel="noopener noreferrer">LinkedIn</a><a href="https://www.instagram.com/philiperlimpinpin/" target="_blank" rel="noopener noreferrer">Instagram</a><a href="https://www.artstation.com/lucas-philippin" target="_blank" rel="noopener noreferrer">ArtStation</a><a href="mailto:philippin.lucas@gmail.com">E-mail</a>';

function img(image, { sizes='100vw', eager=false, transition='' }={}) {
  const fallback = image.variants.find(v=>v.width>=1200) || image.variants.at(-1);
  return `<img src="${fallback.src}" srcset="${image.variants.map(v=>`${v.src} ${v.width}w`).join(', ')}" sizes="${sizes}" width="${image.width}" height="${image.height}" alt="${esc(image.alt)}" ${eager?'loading="eager" fetchpriority="high"':'loading="lazy"'} decoding="async"${transition?` style="view-transition-name:${transition}"`:''}>`;
}

function card(p, className='', eager=false, sizes='(max-width: 720px) calc(100vw - 40px), 45vw') {
  return `<a class="project-card ${className}" href="${projectHref(p)}"><div class="art">${img(p.cover,{eager,sizes,transition:`project-${p.slug}`})}<span class="project-open" aria-hidden="true">Voir le projet</span></div><div class="project-caption"><div><h2>${esc(p.title)}</h2><p class="project-discipline">${disciplines[p.slug]}</p></div><time datetime="${p.year}">${p.year}</time></div></a>`;
}

function page({ title, description, body, route='/', kind='project', image=data.projects[0].cover.src, lightbox=false }) {
  const isHome=kind==='home';
  return `<!doctype html>
<html lang="fr"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><meta name="theme-color" content="#F0F9FB"><meta name="color-scheme" content="light"><title>${esc(title)} — Lucas Philippin</title><meta name="description" content="${esc(description)}"><meta property="og:title" content="${esc(title)} — Lucas Philippin"><meta property="og:description" content="${esc(description)}"><meta property="og:type" content="website">${origin?`<link rel="canonical" href="${origin}${route}"><meta property="og:url" content="${origin}${route}"><meta property="og:image" content="${origin}${image}">`:''}<link rel="icon" href="/assets/Logo_C.svg" type="image/svg+xml"><link rel="apple-touch-icon" href="/assets/Logo_Ico.png"><link rel="stylesheet" href="/fonts/fonts.css"><link rel="stylesheet" href="/styles.css"><script src="/site.js" defer></script></head>
<body class="${kind}"><a class="skip-link" href="#main">Aller au contenu</a><header class="site-header wrap"><a class="brand" href="/" aria-label="Lucas Philippin — Accueil"><img src="/assets/Logo_Full_C.svg" width="168" height="57" alt="Lucas Philippin"><span>Designer Graphique</span></a><nav aria-label="Navigation principale"><a href="/projets/"${isHome?' aria-current="page"':''}>Mes projets</a><a class="contact-link" href="/contact/"${kind==='contact'?' aria-current="page"':''}>Contact</a></nav></header>
<main id="main" tabindex="-1">${body}</main>
<footer class="site-footer wrap"><div class="footer-top"><a class="back-top" href="#main">Back to Top</a><nav aria-label="Réseaux et contact">${social}</nav></div><div class="footer-bottom"><a href="/" aria-label="Lucas Philippin — Accueil"><img src="/assets/Logo_C.svg" alt="" width="38" height="48"></a><p>© 2026 Lucas Philippin. Tous droits réservés.</p></div></footer>
${lightbox?`<dialog class="lightbox" aria-label="Visionneuse des projets"><div class="lightbox-toolbar"><p class="lightbox-count" aria-live="polite"></p><button type="button" class="icon-button lightbox-close" aria-label="Fermer la visionneuse">${closeIcon}</button></div><div class="lightbox-stage"><button type="button" class="icon-button lightbox-prev" aria-label="Image précédente">${chevron}</button><div class="lightbox-image-wrap"><img class="lightbox-image" alt=""><p class="lightbox-status" role="status"></p><a class="lightbox-original" hidden>Ouvrir l’image</a></div><button type="button" class="icon-button lightbox-next" aria-label="Image suivante">${chevron}</button></div><p class="lightbox-caption"></p></dialog>`:''}
</body></html>`;
}

async function emit(route, content) {
  const dest = path.join(dist, route, 'index.html');
  await mkdir(path.dirname(dest), {recursive:true});
  await writeFile(dest,content);
}

const homeBody=`<section class="intro wrap"><div><h1><span class="title-line"><span>Bonjour, moi c’est</span></span> <span class="title-line"><span>Lucas Philippin !</span></span></h1><p class="intro-subtitle">Design graphique &amp; édition</p></div><a class="intro-invitation" href="#projets">${esc(data.invitation)}</a></section><section class="gallery wrap" id="projets" aria-label="Mes projets"><div class="gallery-opening">${card(data.projects[0],'lead',true,'(max-width: 720px) calc(100vw - 40px), 62vw')}<div class="gallery-stack">${card(data.projects[1],'',false,'(max-width: 720px) calc(100vw - 40px), 30vw')}${card(data.projects[2],'',false,'(max-width: 720px) calc(100vw - 40px), 30vw')}</div></div><div class="gallery-rest reveal-group">${data.projects.slice(3).map(p=>card(p)).join('')}</div></section><section class="contact-band"><div class="wrap"><a href="/contact/">Contact</a><p class="contact-band-subtitle">Lucas Philippin · Designer Graphique</p></div></section>`;
const home = page({title:'Mes projets',description:'Le portfolio de Lucas Philippin, Designer Graphique. Découvrez mes projets.',body:homeBody,kind:'home'});
const homeArtwork = `<a class="home-feature" href="${projectHref(data.projects[1])}" aria-label="${esc(data.projects[1].title)}"><img src="/assets/home-business-cards-1280.webp" srcset="/assets/home-business-cards-640.webp 640w, /assets/home-business-cards-1280.webp 1280w, /assets/home-business-cards-1920.webp 1920w" sizes="(max-width:720px) 90vw, 50vw" width="2161" height="728" alt="Cartes de visite de Lucas Philippin" fetchpriority="high"><span class="home-feature-label"><small>Identité visuelle</small><strong>Lucas Philippin</strong>${arrow}</span></a>`;
const filters = `<div class="home-filters wrap" hidden><div role="group" aria-label="Filtrer les projets par type">${[['all','Tous'],['branding','Branding'],['web','Web'],['print','Print']].map(([value,label])=>`<button type="button" data-project-filter="${value}" aria-pressed="${value==='all'}">${label}</button>`).join('')}</div><p role="status" aria-live="polite" data-project-count>5 projets</p></div>`;
const homeFooter = `<footer class="site-footer home-footer wrap"><div class="home-footer-main"><a class="home-signature" href="/" aria-label="Lucas Philippin — Accueil"><img src="/assets/Logo_Background_Square.svg" alt="" width="40" height="40"><span>Lucas Philippin</span></a><a class="home-footer-contact" href="/contact/">Contact</a></div><div class="home-footer-details"><nav aria-label="Réseaux et contact">${social}</nav><a href="#main">Back to Top</a><p>© 2026 Lucas Philippin. Tous droits réservés.</p></div></footer>`;
let pilotHome=home.replace('<body class="home">','<body class="home home-pilot">').replace('</head>','<link rel="stylesheet" href="/home.css"><script src="/home.js" defer></script></head>').replace('</section><section class="gallery wrap"',`${homeArtwork}</section>${filters}<section class="gallery wrap"`).replace(/<section class="contact-band">[\s\S]*?<\/section>/,'').replace(/<footer class="site-footer wrap">[\s\S]*?<\/footer>/,homeFooter);
const projectTypes=['print','branding','print','web','branding'];
const homeProjectTitles=['Termino-Logic — Croix-Rouge Compétence','Lucas Philippin','5 modèles de CV','Raise','Résiop'];
pilotHome=pilotHome.replace('<span>Designer Graphique</span>','');
data.projects.forEach((p,i)=>{pilotHome=pilotHome.replace(`class="project-card ${i===0?'lead':''}" href="${projectHref(p)}"`,`class="project-card ${i===0?'lead':''}" data-project-type="${projectTypes[i]}" href="${projectHref(p)}"`).replace(`<h2>${esc(p.title)}</h2>`,`<h2>${esc(homeProjectTitles[i])}</h2>`);});
await emit('',pilotHome);
await emit('projets',page({title:'Mes projets',description:'Le portfolio de Lucas Philippin, Designer Graphique. Découvrez mes projets.',body:homeBody,kind:'home',route:'/projets/'}));

for (const p of data.projects) {
  let firstImage=true;
  let galleryIndex=0;
  const modules=p.modules.map((m,i)=>{
    if (m.type==='text') return `<section class="project-text${i===0?' project-introduction':''} reveal">${m.html}</section>`;
    if (m.type==='video') return `<figure class="project-video reveal"><video controls playsinline preload="none" aria-label="${esc(m.title)}"><source src="${m.src}" type="video/mp4"><a href="${m.src}">Voir la vidéo</a></video></figure>`;
    const result=`<div class="image-group ${m.items.length>1?'image-group-multiple':''} reveal-group">${m.items.map((im,j)=>{
      const hero=firstImage; firstImage=false;
      const markup=`<a class="image-link" href="${im.src}" data-gallery="${galleryIndex++}" data-caption="${esc(im.alt)}" aria-label="Agrandir : ${esc(im.alt)}">${img(im,{sizes:m.items.length>1?'(max-width: 720px) calc(100vw - 40px), 46vw':'(max-width: 720px) calc(100vw - 40px), 90vw',eager:hero,transition:hero?`project-${p.slug}`:''})}<span class="image-zoom" aria-hidden="true">${plus}</span></a>`;
      return markup;
    }).join('')}</div>`;
    return result;
  }).join('\n');
  const others=data.projects.filter(other=>other.slug!==p.slug);
  const body=`<article class="project-page wrap"><header class="project-heading"><a href="/projets/" class="back-link">${chevron} Mes projets</a><h1>${esc(p.title)}</h1><div class="project-meta"><p class="project-discipline">${disciplines[p.slug]}</p><time datetime="${p.year}">${p.year}</time></div></header><div class="project-modules">${modules}</div></article><section class="related wrap"><h2>Vous pourriez aimer aussi :</h2><div class="related-grid reveal-group">${others.map(other=>card(other,'','',( '(max-width: 720px) calc(100vw - 40px), 44vw'))).join('')}</div></section>`;
  const description=p.modules.find(m=>m.type==='text')?.text.slice(0,220)||p.title;
  await emit(p.slug,page({title:p.title,description,body,route:projectHref(p),image:p.cover.src,lightbox:true}));
}

const contact=`<section class="contact-page wrap"><div class="contact-heading"><h1>Contact</h1><a class="email-link" href="mailto:philippin.lucas@gmail.com">philippin.lucas@gmail.com ${arrow}</a><nav aria-label="Retrouvez Lucas Philippin">${social.replace(/<a href="mailto:[\s\S]*$/,'')}</nav></div><div class="contact-form"><iframe src="https://tally.so/embed/81gBgk?alignLeft=1&hideTitle=1&transparentBackground=1&dynamicHeight=1" title="Contacter Lucas Philippin — formulaire Tally" width="100%" height="850" loading="eager" data-tally-frame></iframe><p class="form-alternative"><a href="https://tally.so/r/81gBgk" target="_blank" rel="noopener noreferrer">Ouvrir le formulaire dans un nouvel onglet ${arrow}</a></p></div></section>`;
await emit('contact',page({title:'Contact',description:'Contactez Lucas Philippin, Designer Graphique.',body:contact,kind:'contact',route:'/contact/'}));
await writeFile(path.join(dist,'404.html'),page({title:'Page introuvable',description:'Cette page est introuvable.',kind:'not-found',body:`<section class="not-found-page wrap"><h1>Page introuvable</h1><p>Cette page n’existe pas ou a été déplacée.</p><a class="text-link" href="/projets/">Découvrir mes projets ${arrow}</a></section>`}));
if (origin) {
  const routes=['/','/contact/',...data.projects.map(projectHref)];
  await writeFile(path.join(dist,'sitemap.xml'),`<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${routes.map(r=>`<url><loc>${origin}${r}</loc></url>`).join('')}</urlset>`);
}
await writeFile(path.join(dist,'robots.txt'),`User-agent: *\nAllow: /\n${origin?`Sitemap: ${origin}/sitemap.xml\n`:''}`);
await writeFile(path.join(dist,'_headers'),`/*\n  X-Content-Type-Options: nosniff\n  Referrer-Policy: strict-origin-when-cross-origin\n  Permissions-Policy: camera=(), microphone=(), geolocation=()\n  Content-Security-Policy: default-src 'self'; script-src 'self'; style-src 'self' 'unsafe-inline'; img-src 'self' data:; font-src 'self'; media-src 'self'; frame-src https://tally.so; connect-src 'self'; object-src 'none'; base-uri 'self'; form-action https://tally.so; frame-ancestors 'none'\n/assets/*\n  Cache-Control: public, max-age=86400\n/fonts/*\n  Cache-Control: public, max-age=604800\n`);
console.log(`Built ${data.projects.length+4} static pages in dist/; ${origin?'production metadata enabled':'SITE_URL unset: no invented canonical domain'}.`);
