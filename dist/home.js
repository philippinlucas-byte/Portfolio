// Homepage-only progressive filtering: all project links work without JavaScript.
const filters = document.querySelector('.home-filters');
if (filters) {
  const gallery = document.querySelector('.home-pilot .gallery');
  const cards = [...gallery.querySelectorAll('[data-project-type]')];
  const buttons = [...filters.querySelectorAll('[data-project-filter]')];
  // Touch/narrow layouts reveal one visible project nearest the screen centre.
  const scrollMode = matchMedia('(max-width: 720px), (hover: none)');
  let frame = 0;
  function updateOverlay() {
    frame = 0;
    gallery.classList.toggle('scroll-overlays', scrollMode.matches);
    let active = null;
    if (scrollMode.matches) {
      const focused = cards.find(card => !card.hidden && card.matches(':focus-visible'));
      let distance = Infinity;
      for (const card of cards) {
        if (card.hidden) continue;
        const rect = card.getBoundingClientRect();
        if (rect.bottom <= 0 || rect.top >= innerHeight) continue;
        const offset = Math.abs((rect.top + rect.bottom) / 2 - innerHeight / 2);
        if (offset < distance) { active = card; distance = offset; }
      }
      if (focused) active = focused;
    }
    cards.forEach(card => card.classList.toggle('is-scroll-active', card === active));
  }
  function scheduleOverlay() {
    if (!frame) frame = requestAnimationFrame(updateOverlay);
  }
  window.addEventListener('scroll', scheduleOverlay, {passive: true});
  window.addEventListener('resize', scheduleOverlay);
  gallery.addEventListener('focusin', scheduleOverlay);
  gallery.addEventListener('focusout', scheduleOverlay);
  scrollMode.addEventListener('change', scheduleOverlay);
  if ('ResizeObserver' in window) new ResizeObserver(scheduleOverlay).observe(gallery);
  scheduleOverlay();
  filters.hidden = false;
  buttons.forEach(button => button.addEventListener('click', () => {
    const type = button.dataset.projectFilter;
    buttons.forEach(item => item.setAttribute('aria-pressed', String(item === button)));
    let count = 0;
    cards.forEach(card => {
      card.hidden = type !== 'all' && card.dataset.projectType !== type;
      if (!card.hidden) count++;
    });
    gallery.classList.toggle('is-filtered', type !== 'all');
    filters.querySelector('[data-project-count]').textContent = `${count} projet${count > 1 ? 's' : ''}`;
    scheduleOverlay();
  }));
}
