const menuButton = document.querySelector('.menu-button');
const menuOverlay = document.querySelector('.menu-overlay');
const menuLinks = document.querySelectorAll('.menu-overlay a');

function setMenu(open) {
  menuButton.classList.toggle('open', open);
  menuButton.setAttribute('aria-expanded', String(open));
  menuButton.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
  menuOverlay.classList.toggle('open', open);
  menuOverlay.setAttribute('aria-hidden', String(!open));
  document.body.style.overflow = open ? 'hidden' : '';
}

menuButton.addEventListener('click', () => setMenu(!menuOverlay.classList.contains('open')));
menuLinks.forEach((link) => link.addEventListener('click', () => setMenu(false)));
document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') setMenu(false);
});

const revealObserver = new IntersectionObserver((entries, observer) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;
    const delay = Number(entry.target.dataset.delay || 0);
    window.setTimeout(() => entry.target.classList.add('visible'), delay);
    observer.unobserve(entry.target);
  });
}, { threshold: 0.12, rootMargin: '0px 0px -40px' });

document.querySelectorAll('.reveal').forEach((element) => revealObserver.observe(element));

const form = document.querySelector('.inquiry');
const status = document.querySelector('.form-status');
form.addEventListener('submit', (event) => {
  event.preventDefault();
  const name = new FormData(form).get('name').trim();
  status.textContent = `Thanks${name ? `, ${name}` : ''}. Your project note is ready to send once John connects his studio email.`;
  form.reset();
});
