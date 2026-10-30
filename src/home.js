// Homepage-only progressive filtering: all project links work without JavaScript.
const filters = document.querySelector('.home-filters');
if (filters) {
  const gallery = document.querySelector('.home-pilot .gallery');
  const cards = [...gallery.querySelectorAll('[data-project-type]')];
  const buttons = [...filters.querySelectorAll('[data-project-filter]')];
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
  }));
}
