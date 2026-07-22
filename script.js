/* =========================================================
   script.js — single-page portfolio behaviour
   ========================================================= */

// ===== Year in footer =====
const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = new Date().getFullYear();

// ===== Sticky nav background on scroll + back-to-top visibility =====
const nav = document.getElementById('nav');
const toTop = document.getElementById('toTop');
window.addEventListener('scroll', () => {
  const scrolled = window.scrollY > 40;
  nav?.classList.toggle('scrolled', scrolled);
  toTop?.classList.toggle('visible', window.scrollY > 500);
});

// ===== Mobile nav toggle =====
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');
navToggle?.addEventListener('click', () => {
  const isOpen = navLinks.classList.toggle('open');
  navToggle.setAttribute('aria-expanded', isOpen);
});
navLinks?.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => navLinks.classList.remove('open'));
});

// ===== Active nav link based on section in view (scroll-spy) =====
const navAnchors = document.querySelectorAll('.nav-links a');
const sections = Array.from(navAnchors)
  .map(a => document.getElementById(a.getAttribute('href').replace('#', '')))
  .filter(Boolean);

function setActiveLink() {
  let currentId = sections[0]?.id;
  const scrollPos = window.scrollY + 140; // offset for fixed nav
  sections.forEach(section => {
    if (section.offsetTop <= scrollPos) currentId = section.id;
  });
  navAnchors.forEach(a => {
    a.classList.toggle('active', a.getAttribute('href') === `#${currentId}`);
  });
}
window.addEventListener('scroll', setActiveLink);
window.addEventListener('load', setActiveLink);

// ===== Reveal-on-scroll animation =====
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('in-view');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });
document.querySelectorAll('[data-reveal]').forEach(el => revealObserver.observe(el));

// ===== Back to top button =====
toTop?.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

// ===== Projects carousel (simple horizontal scroll nudge) =====
const projectGrid = document.querySelector('.project-grid');
const prevBtn = document.getElementById('prevProj');
const nextBtn = document.getElementById('nextProj');

function scrollProjects(direction) {
  const card = projectGrid.querySelector('.project-card');
  if (!card) return;
  const cardWidth = card.getBoundingClientRect().width + 20; // gap
  projectGrid.scrollBy({ left: direction * cardWidth, behavior: 'smooth' });
}
prevBtn?.addEventListener('click', () => scrollProjects(-1));
nextBtn?.addEventListener('click', () => scrollProjects(1));

if (projectGrid) {
  projectGrid.style.scrollBehavior = 'smooth';
}
