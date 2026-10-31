// Register before the first render so history restores can match their card too.
(() => {
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
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
