// TechBytes — script.js
(function(){
  const html = document.documentElement;
  const themeToggle = document.getElementById('themeToggle');
  const menuToggle = document.getElementById('menuToggle');
  const mobileMenu = document.getElementById('mobileMenu');
  const searchInput = document.getElementById('searchInput');
  const clearSearch = document.getElementById('clearSearch');
  const tagBar = document.getElementById('tagBar');
  const postsGrid = document.getElementById('postsGrid');
  const backToTop = document.getElementById('backToTop');
  const yearSpan = document.getElementById('year');
  yearSpan && (yearSpan.textContent = new Date().getFullYear());

  // Theme: respect saved preference
  const savedTheme = localStorage.getItem('theme');
  if(savedTheme === 'light' || savedTheme === 'dark'){
    html.classList.add(savedTheme);
  }

  // Toggle theme
  themeToggle && themeToggle.addEventListener('click', () => {
    const isDark = html.classList.toggle('dark');
    html.classList.toggle('light', !isDark);
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
  });

  // Mobile menu
  menuToggle && menuToggle.addEventListener('click', () => {
    const hidden = mobileMenu.hasAttribute('hidden');
    if(hidden) mobileMenu.removeAttribute('hidden'); else mobileMenu.setAttribute('hidden','');
  });

  // Simple search filter
  function filterPosts(){
    const q = (searchInput?.value || '').toLowerCase().trim();
    const activeTagBtn = tagBar?.querySelector('.tag.active');
    const activeTag = activeTagBtn ? activeTagBtn.dataset.tag : 'all';

    const cards = postsGrid?.querySelectorAll('.card') || [];
    cards.forEach(card => {
      const text = card.innerText.toLowerCase();
      const tags = (card.dataset.tags || '').split(',').map(x => x.trim());
      const matchesText = !q || text.includes(q);
      const matchesTag = activeTag === 'all' || tags.includes(activeTag);
      card.style.display = (matchesText && matchesTag) ? '' : 'none';
    });
  }

  searchInput && searchInput.addEventListener('input', filterPosts);
  clearSearch && clearSearch.addEventListener('click', () => {
    if(searchInput){ searchInput.value = ''; filterPosts(); searchInput.focus(); }
  });

  // Tag filter
  tagBar && tagBar.addEventListener('click', (e) => {
    const btn = e.target.closest('.tag');
    if(!btn) return;
    tagBar.querySelectorAll('.tag').forEach(b => { b.classList.remove('active'); b.setAttribute('aria-pressed','false'); });
    btn.classList.add('active'); btn.setAttribute('aria-pressed','true');
    filterPosts();
  });

  // Back to top visibility
  window.addEventListener('scroll', () => {
    if(!backToTop) return;
    backToTop.style.opacity = window.scrollY > 600 ? '1' : '0.2';
  });

  // Smooth back to top
  backToTop && backToTop.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({top:0, behavior:'smooth'});
  });
})();
