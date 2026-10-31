// Register before the first render so history restores can match their card too.
(() => {
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  // Same-document support alone (Firefox) does not imply cross-document support.
  const nativeNavigation = typeof window.CSSViewTransitionRule !== 'undefined';
  const storageKey = 'portfolio-cover-travel';
  if (!nativeNavigation) {
    document.addEventListener('click', event => {
      if (reduced.matches || event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      const link = event.target.closest?.('a.project-card');
      if (!link || link.target || link.hasAttribute('download')) return;
      const image = link.querySelector('img');
      const rect = image?.getBoundingClientRect();
      if (!rect?.width || !rect.height) return;
      try {
        sessionStorage.setItem(storageKey, JSON.stringify({url: link.href, image: image.currentSrc || image.src,
          rect: {left: rect.left, top: rect.top, width: rect.width, height: rect.height}, at: Date.now()}));
      } catch { /* Navigation remains ordinary if storage is unavailable. */ }
    });
    document.addEventListener('DOMContentLoaded', () => {
      let travel;
      try {
        travel = JSON.parse(sessionStorage.getItem(storageKey));
        sessionStorage.removeItem(storageKey);
      } catch { return; }
      const cover = document.querySelector('.project-opening-gallery img');
      if (!travel || !cover || reduced.matches || Date.now() - travel.at > 10000 || new URL(travel.url).pathname !== location.pathname) return;
      if (typeof cover.animate !== 'function') return;
      const from = travel.rect, to = cover.getBoundingClientRect();
      if (!to.width || !to.height || !from.width || !from.height) return;
      const layer = document.createElement('div');
      layer.setAttribute('aria-hidden', 'true');
      Object.assign(layer.style, {position: 'fixed', zIndex: '1000', pointerEvents: 'none',
        left: `${from.left}px`, top: `${from.top}px`, width: `${from.width}px`, height: `${from.height}px`,
        transformOrigin: '0 0', overflow: 'hidden', borderRadius: '16px'});
      const oldImage = document.createElement('img');
      oldImage.src = travel.image;
      const newImage = document.createElement('img');
      newImage.src = cover.currentSrc || cover.src;
      for (const image of [oldImage, newImage]) {
        image.alt = '';
        Object.assign(image.style, {position: 'absolute', inset: '0', width: '100%', height: '100%', objectFit: 'cover'});
        layer.append(image);
      }
      document.body.append(layer);
      const previousVisibility = cover.style.visibility;
      cover.style.visibility = 'hidden';
      const options = {duration: 650, easing: 'cubic-bezier(.22,.61,.36,1)', fill: 'both'};
      newImage.animate([{opacity: 0}, {opacity: 1}], options);
      const animation = layer.animate([
        {transform: 'translate(0,0) scale(1,1)'},
        {transform: `translate(${to.left-from.left}px,${to.top-from.top}px) scale(${to.width/from.width},${to.height/from.height})`}
      ], options);
      const cleanup = () => { cover.style.visibility = previousVisibility; layer.remove(); };
      animation.finished.then(cleanup, cleanup);
      window.addEventListener('pagehide', cleanup, {once: true});
      window.addEventListener('resize', () => animation.cancel(), {once: true});
    }, {once: true});
  }
  function cardFor(url) {
    if (!url) return null;
    const path = new URL(url, location.href).pathname;
    return [...document.querySelectorAll('.project-card')]
      .find(card => new URL(card.href).pathname === path)?.querySelector('img');
  }
  function nameForSnapshot(image, cleanup) {
    if (!image) return;
    const previous = [...document.querySelectorAll('[style*="view-transition-name"]')]
      .map(element => [element, element.style.viewTransitionName]);
    if (!previous.some(([element]) => element === image)) previous.push([image, '']);
    previous.forEach(([element]) => element.style.viewTransitionName = 'none');
    image.style.viewTransitionName = 'project-cover';
    cleanup.then(() => previous.forEach(([element, value]) => {
      if (value) element.style.viewTransitionName = value;
      else element.style.removeProperty('view-transition-name');
    }), () => {});
  }
  window.addEventListener('pageswap', event => {
    if (!event.viewTransition || reduced.matches) return;
    const image = cardFor(event.activation?.entry?.url);
    if (image) {
      const rect = image.getBoundingClientRect();
      if (rect.bottom > 0 && rect.top < innerHeight) nameForSnapshot(image, event.viewTransition.finished);
    }
  });
  window.addEventListener('pagereveal', event => {
    if (!event.viewTransition || reduced.matches || !document.body.classList.contains('home')) return;
    const image = cardFor(window.navigation?.activation?.from?.url);
    nameForSnapshot(image, event.viewTransition.finished);
  });
})();
