// ================= Theme Toggle (dark / light) =================
const root = document.documentElement;
const themeToggle = document.getElementById('themeToggle');
const savedTheme = localStorage.getItem('theme');

// Apply saved theme on load
if (savedTheme) root.classList.toggle('light', savedTheme === 'light');

// Toggle theme on button click
if (themeToggle) {
  themeToggle.addEventListener('click', () => {
    const isLight = root.classList.toggle('light');
    localStorage.setItem('theme', isLight ? 'light' : 'dark');
  });
}

// Potential issues:
// - If #themeToggle does not exist, toggle will never work (handled here).
// - No accessibility update for screen readers (e.g., aria-pressed).


// ================= Mobile Navigation =================
const navToggle = document.getElementById('navToggle');
const navMenu = document.getElementById('navMenu');

if (navToggle && navMenu) {
  // Toggle menu open/close
  navToggle.addEventListener('click', () => {
    const open = navMenu.classList.toggle('open');
    navToggle.setAttribute('aria-expanded', open);
  });

  // Close menu on link click (mobile)
  navMenu.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      if (navMenu.classList.contains('open')) {
        navMenu.classList.remove('open');
        navToggle.setAttribute('aria-expanded', 'false');
      }
    });
  });
}

// Potential issues:
// - Assumes all links inside navMenu are anchors.
// - No throttling/debouncing for rapid clicks.


// ================= Scroll Active Link =================
const links = document.querySelectorAll('.nav-link');
const sections = [...links].map(l => document.querySelector(l.getAttribute('href')));

const setActive = () => {
  let idx = sections.findIndex((s, i) => s && window.scrollY + 120 < s.offsetTop);
  if (idx === -1) idx = sections.length;
  links.forEach(l => l.classList.remove('active'));
  if (idx > 0) links[idx - 1].classList.add('active');
};

window.addEventListener('scroll', setActive);
window.addEventListener('load', setActive);

// Potential issues:
// - Hardcoded offset of 120px might not suit all screens.
// - Could optimize with requestAnimationFrame to reduce scroll event load.


// ================= Reveal on Scroll =================
const revealEls = document.querySelectorAll('[data-reveal]');
const io = new IntersectionObserver(
  entries => {
    entries.forEach(e => {
      if (e.isIntersecting) e.target.classList.add('visible');
    });
  },
  { threshold: 0.12 }
);
revealEls.forEach(el => io.observe(el));

// Potential issues:
// - IntersectionObserver not supported in very old browsers.
// - No unobserve after element is revealed, may keep unnecessary observers active.


// ================= Projects Filter =================
const filterButtons = document.querySelectorAll('.chip');
const projectGrid = document.getElementById('projectGrid');

if (filterButtons.length && projectGrid) {
  filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      filterButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.dataset.filter;
      projectGrid.querySelectorAll('.card').forEach(card => {
        const show = filter === 'all' || card.dataset.type === filter;
        card.style.display = show ? 'flex' : 'none';
      });
    });
  });
}

// Potential issues:
// - Uses inline style `display` → could conflict with CSS.
// - No animation for filter change.


// ================= Contact Form (client-side) =================
const form = document.getElementById('contactForm');
const err = (id, msg) => {
  const el = document.getElementById(id);
  if (el) el.textContent = msg || '';
};

if (form) {
  form.addEventListener('submit', e => {
    e.preventDefault();

    const name = form.name.value.trim();
    const email = form.email.value.trim();
    const message = form.message.value.trim();

    let ok = true;

    if (name.length < 2) {
      err('errName', 'Please enter your full name.');
      ok = false;
    } else err('errName');

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      err('errEmail', 'Enter a valid email.');
      ok = false;
    } else err('errEmail');

    if (message.length < 10) {
      err('errMessage', 'Please write a longer message.');
      ok = false;
    } else err('errMessage');

    if (!ok) return;

    // Demo success state
    form.reset();
    alert('Thanks! Your message has been sent (demo).');
  });
}

// Potential issues:
// - No real backend integration → purely client-side.
// - Alerts are blocking and not user-friendly on mobile.
// - No spam/bot protection (reCAPTCHA etc.).


// ================= Footer Year =================
const y = document.getElementById('year');
if (y) y.textContent = new Date().getFullYear();

// Potential issues:
// - Assumes element exists; handled by conditional.
// - Could format year dynamically if needed for different locales.
