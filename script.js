'use strict';

// Both perspectives are available by keyboard, touch, or mouse.
const modeButtons = document.querySelectorAll('[data-mode]');
modeButtons.forEach(button => {
  button.addEventListener('click', () => {
    const selectedMode = button.dataset.mode;
    modeButtons.forEach(option => {
      const active = option === button;
      option.classList.toggle('active', active);
      option.setAttribute('aria-pressed', String(active));
    });
    document.getElementById('hardware-view').hidden = selectedMode !== 'hardware';
    document.getElementById('software-view').hidden = selectedMode !== 'software';
  });
});

const filterButtons = document.querySelectorAll('[data-filter]');
const projects = document.querySelectorAll('[data-category]');
const filterStatus = document.getElementById('filter-status');
filterButtons.forEach(button => {
  button.addEventListener('click', () => {
    const category = button.dataset.filter;
    let visibleCount = 0;
    projects.forEach(project => {
      const visible = category === 'all' || project.dataset.category.split(' ').includes(category);
      project.hidden = !visible;
      if (visible) visibleCount += 1;
    });
    filterButtons.forEach(option => {
      const active = option === button;
      option.classList.toggle('active', active);
      option.setAttribute('aria-pressed', String(active));
    });
    filterStatus.textContent = `Showing ${visibleCount} ${category === 'all' ? '' : category + ' '}projects.`;
  });
});
