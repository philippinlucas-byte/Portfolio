const motion = matchMedia('(prefers-reduced-motion: reduce)');

// Content remains visible if JS, IntersectionObserver, or motion is unavailable.
if ('IntersectionObserver' in window && !motion.matches) {
  const observer = new IntersectionObserver(entries => {
    for (const entry of entries) {
      if (!entry.isIntersecting) continue;
      entry.target.classList.add('is-revealing');
      observer.unobserve(entry.target);
    }
  }, { threshold: .08 });
  document.querySelectorAll('.reveal,.reveal-group').forEach(el => observer.observe(el));
  motion.addEventListener('change', event => { if (event.matches) observer.disconnect(); });
}

const dialog = document.querySelector('.lightbox');
if (dialog && typeof dialog.showModal === 'function') {
  const links = [...document.querySelectorAll('[data-gallery]')];
  const image = dialog.querySelector('.lightbox-image');
  const count = dialog.querySelector('.lightbox-count');
  const caption = dialog.querySelector('.lightbox-caption');
  const status = dialog.querySelector('.lightbox-status');
  const original = dialog.querySelector('.lightbox-original');
  const previous = dialog.querySelector('.lightbox-prev');
  const next = dialog.querySelector('.lightbox-next');
  const close = dialog.querySelector('.lightbox-close');
  let index=0, opener=null, touchX=null;
  function show(position) {
    index = (position + links.length) % links.length;
    const link=links[index];
    image.dataset.loading='';
    status.textContent='Chargement de l’image…';
    original.hidden=true;
    image.alt=link.dataset.caption;
    caption.textContent=link.dataset.caption;
    count.textContent=`${index+1} / ${links.length}`;
    image.src=link.href;
    previous.disabled=next.disabled=links.length<2;
  }
  image.addEventListener('load',()=> { delete image.dataset.loading; status.textContent=''; });
  image.addEventListener('error',()=> {
    delete image.dataset.loading;
    status.textContent='L’image n’a pas pu être chargée.';
    original.href=links[index].href;
    original.hidden=false;
  });
  links.forEach((link,i)=>link.addEventListener('click',event=> {
    if (event.button || event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;
    event.preventDefault();
    opener=link;
    show(i);
    dialog.showModal();
    close.focus();
  }));
  close.addEventListener('click',()=>dialog.close());
  previous.addEventListener('click',()=>show(index-1));
  next.addEventListener('click',()=>show(index+1));
  dialog.addEventListener('close',()=>opener?.focus({preventScroll:true}));
  dialog.addEventListener('keydown',event=> {
    if(event.key==='ArrowLeft') {event.preventDefault(); show(index-1);}
    if(event.key==='ArrowRight') {event.preventDefault(); show(index+1);}
  });
  const stage=dialog.querySelector('.lightbox-image-wrap');
  stage.addEventListener('touchstart',event=> {touchX=event.touches.length===1?event.touches[0].clientX:null;}, {passive:true});
  stage.addEventListener('touchend',event=> {
    if(touchX===null) return;
    const distance=event.changedTouches[0].clientX-touchX;
    if(Math.abs(distance)>60) show(index+(distance<0?1:-1));
    touchX=null;
  }, {passive:true});
}

// Only the intended Tally frame may resize itself.
const form = document.querySelector('[data-tally-frame]');
if(form) window.addEventListener('message', event=> {
  if(event.origin!=='https://tally.so'||event.source!==form.contentWindow) return;
  let payload=event.data;
  if(typeof payload==='string') { try {payload=JSON.parse(payload);} catch {return;} }
  const height=Number(payload?.payload?.height);
  if(payload?.event==='Tally.FormLoaded' && height>=300 && height<=4000) form.style.height=`${height}px`;
});
