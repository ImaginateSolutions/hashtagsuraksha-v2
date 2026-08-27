(function () {
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

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initMobileDropdowns);
  } else {
    initMobileDropdowns();
  }
})();
