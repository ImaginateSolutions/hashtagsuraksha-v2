(function () {
  function initMobileMenu() {
    var hamburger = document.getElementById('hamburger');
    var mobileMenu = document.getElementById('mobileMenu');
    if (!hamburger || !mobileMenu || hamburger.dataset.mobileMenuReady === 'true') return;

    hamburger.dataset.mobileMenuReady = 'true';
    hamburger.setAttribute('aria-controls', 'mobileMenu');
    hamburger.setAttribute('aria-expanded', 'false');
    hamburger.setAttribute('aria-label', 'Open mobile menu');

    function setMenuOpen(isOpen) {
      mobileMenu.classList.toggle('open', isOpen);
      hamburger.classList.toggle('is-open', isOpen);
      hamburger.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
      hamburger.setAttribute('aria-label', isOpen ? 'Close mobile menu' : 'Open mobile menu');
      document.body.classList.toggle('mobile-menu-open', isOpen);
    }

    hamburger.addEventListener('click', function (event) {
      event.preventDefault();
      event.stopImmediatePropagation();
      setMenuOpen(!mobileMenu.classList.contains('open'));
    }, true);

    document.addEventListener('keydown', function (event) {
      if (event.key === 'Escape' && mobileMenu.classList.contains('open')) {
        setMenuOpen(false);
      }
    });

    window.addEventListener('resize', function () {
      if (window.innerWidth > 999 && mobileMenu.classList.contains('open')) {
        setMenuOpen(false);
      }
    });
  }

  function initMobileDropdowns() {
    document.querySelectorAll('[data-mobile-dropdown]').forEach(function (dropdown) {
      var toggle = dropdown.querySelector('[data-mobile-dropdown-toggle]');
      if (!toggle || toggle.dataset.dropdownReady === 'true') return;

      toggle.dataset.dropdownReady = 'true';
      toggle.addEventListener('click', function () {
        var isOpen = dropdown.classList.toggle('open');
        toggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
      });
    });
  }

  function initMobileActiveLinks() {
    var mobileMenu = document.getElementById('mobileMenu');
    if (!mobileMenu || mobileMenu.dataset.activeLinksReady === 'true') return;

    mobileMenu.dataset.activeLinksReady = 'true';
    document.querySelectorAll('.nav-links a.active').forEach(function (activeLink) {
      var href = activeLink.getAttribute('href');
      if (!href) return;

      mobileMenu.querySelectorAll('a[href="' + href + '"]').forEach(function (mobileLink) {
        if (!mobileLink.classList.contains('mobile-cta')) {
          mobileLink.classList.add('active');
        }
      });
    });
  }

  function initNav() {
    initMobileMenu();
    initMobileDropdowns();
    initMobileActiveLinks();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initNav);
  } else {
    initNav();
  }
})();
