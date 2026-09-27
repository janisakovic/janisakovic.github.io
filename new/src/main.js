/* ---------- Mobile nav ---------- */
const toggle     = document.getElementById('nav-toggle');
const menu       = document.getElementById('nav-menu');
const iconOpen   = document.getElementById('nav-icon-open');
const iconClose  = document.getElementById('nav-icon-close');

function setNav(open) {
  toggle.setAttribute('aria-expanded', String(open));
  toggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
  menu.classList.toggle('hidden', !open);
  menu.classList.toggle('flex', open);
  menu.classList.toggle('flex-col', open);
  menu.classList.toggle('gap-4', open);
  menu.classList.toggle('pt-4', open);
  iconOpen.classList.toggle('hidden', open);
  iconClose.classList.toggle('hidden', !open);
}

toggle?.addEventListener('click', () => {
  setNav(toggle.getAttribute('aria-expanded') !== 'true');
});

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && toggle?.getAttribute('aria-expanded') === 'true') {
    setNav(false);
    toggle.focus();
  }
});

window.addEventListener('resize', () => {
  if (window.innerWidth >= 768) setNav(false);
});

menu?.querySelectorAll('a').forEach((a) =>
  a.addEventListener('click', () => {
    if (window.innerWidth < 768) setNav(false);
  })
);

/* ---------- Sticky header shadow ---------- */
const header = document.getElementById('site-header');
const onScroll = () => {
  const scrolled = window.scrollY > 8;
  header?.classList.toggle('shadow-sm', scrolled);
  header?.classList.toggle('border-gray-200', scrolled);
  header?.classList.toggle('border-transparent', !scrolled);
};
onScroll();
window.addEventListener('scroll', onScroll, { passive: true });

/* ---------- FAQ accordion (single-open) ---------- */
document.querySelectorAll('[data-accordion]').forEach((group) => {
  const buttons = group.querySelectorAll('button[aria-expanded]');
  buttons.forEach((btn) => {
    btn.addEventListener('click', () => {
      const isOpen = btn.getAttribute('aria-expanded') === 'true';

      buttons.forEach((other) => {
        if (other === btn) return;
        other.setAttribute('aria-expanded', 'false');
        const p = document.getElementById(other.getAttribute('aria-controls'));
        if (p) p.hidden = true;
        other.querySelector('svg')?.classList.remove('rotate-180');
      });

      btn.setAttribute('aria-expanded', String(!isOpen));
      const panel = document.getElementById(btn.getAttribute('aria-controls'));
      if (panel) panel.hidden = isOpen;
      btn.querySelector('svg')?.classList.toggle('rotate-180', !isOpen);
    });
  });
});

/* ---------- Footer year ---------- */
const year = document.getElementById('year');
if (year) year.textContent = new Date().getFullYear();