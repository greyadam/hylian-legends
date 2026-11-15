(function () {
  'use strict';

  var banner = document.querySelector('.codex-motto-chiseled');

  if (!banner) return;

  if (!('IntersectionObserver' in window)) {
    banner.classList.add('is-carved');
    return;
  }

  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (!entry.isIntersecting) return;

      entry.target.classList.add('is-carved');
      observer.unobserve(entry.target);
    });
  }, {
    rootMargin: '0px 0px -18% 0px',
    threshold: 0.25
  });

  observer.observe(banner);
})();
