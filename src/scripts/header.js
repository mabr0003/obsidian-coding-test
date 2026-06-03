const menuButton = document.querySelector('.header-menu');
const closeButton = document.querySelector('.header-nav-close');
const panel = document.querySelector('.header-nav-panel');
const backdrop = document.querySelector('.header-nav-backdrop');

function openNav() {
  panel?.classList.add('is-open');
  backdrop?.removeAttribute('hidden');
  menuButton?.setAttribute('aria-expanded', 'true');
  panel?.setAttribute('aria-hidden', 'false');
  document.body.classList.add('header-nav-open');
}

function closeNav() {
  panel?.classList.remove('is-open');
  backdrop?.setAttribute('hidden', '');
  menuButton?.setAttribute('aria-expanded', 'false');
  panel?.setAttribute('aria-hidden', 'true');
  document.body.classList.remove('header-nav-open');
}

menuButton?.addEventListener('click', openNav);
closeButton?.addEventListener('click', closeNav);
backdrop?.addEventListener('click', closeNav);

panel?.querySelectorAll('.header-nav a').forEach((link) => {
  link.addEventListener('click', closeNav);
});

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && panel?.classList.contains('is-open')) {
    closeNav();
  }
});
