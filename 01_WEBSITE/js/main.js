/* DWELL Studio */
(function () {
  'use strict';

  // Mobile menu
  var toggle = document.getElementById('navToggle');
  var links = document.getElementById('navLinks');

  toggle.addEventListener('click', function () {
    toggle.classList.toggle('active');
    links.classList.toggle('open');
  });

  links.querySelectorAll('a').forEach(function (a) {
    a.addEventListener('click', function () {
      toggle.classList.remove('active');
      links.classList.remove('open');
    });
  });

  // Contact form
  var form = document.getElementById('contactForm');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var data = new FormData(form);
      var name = data.get('name');
      console.log('Form:', Object.fromEntries(data));
      form.innerHTML =
        '<p style="color:var(--sand);font-size:1.1rem;">Thanks ' +
        name + ' — we\'ll be in touch within 24 hours.</p>';
    });
  }
})();
