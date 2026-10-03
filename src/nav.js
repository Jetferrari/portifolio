'use strict';

(function () {
  const toggle = document.getElementById('navToggle');
  const drawer = document.getElementById('navDrawer');
  const backdrop = document.getElementById('navBackdrop');
  const closeBtn = document.getElementById('navClose');

  if (!toggle || !drawer || !backdrop) return;

  let isOpen = false;

  function openMenu() {
    isOpen = true;
    if (typeof window !== 'undefined' && window.i18n && typeof window.i18n.closeSelector === 'function') {
      window.i18n.closeSelector();
    } else {
      const langMenu = document.getElementById('langMenu');
      const langToggle = document.getElementById('langToggle');
      if (langMenu) {
        langMenu.classList.remove('is-open');
        langMenu.setAttribute('aria-hidden', 'true');
        langMenu.inert = true;
      }
      if (langToggle) langToggle.setAttribute('aria-expanded', 'false');
    }
    toggle.setAttribute('aria-expanded', 'true');
    drawer.inert = false;
    drawer.setAttribute('aria-hidden', 'false');
    drawer.classList.add('is-open');
    backdrop.classList.add('is-open');
    document.body.classList.add('nav-locked');
    if (closeBtn) closeBtn.focus();
  }

  function closeMenu() {
    isOpen = false;
    toggle.setAttribute('aria-expanded', 'false');
    drawer.setAttribute('aria-hidden', 'true');
    drawer.classList.remove('is-open');
    drawer.inert = true;
    backdrop.classList.remove('is-open');
    document.body.classList.remove('nav-locked');
    toggle.focus();
  }

  toggle.addEventListener('click', () => {
    if (isOpen) closeMenu();
    else openMenu();
  });

  if (closeBtn) closeBtn.addEventListener('click', closeMenu);
  backdrop.addEventListener('click', closeMenu);

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && isOpen) {
      closeMenu();
    }
  });

  drawer.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      if (isOpen) closeMenu();
    });
  });

  if (typeof window !== 'undefined') {
    window.nav = {
      openMenu,
      closeMenu,
      isOpen: () => isOpen
    };
  }
})();
