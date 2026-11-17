(() => {
  'use strict';
  function mount() {
    const home = document.body.classList.contains('guild-home');
    const library = document.querySelector('main.triforce-lore-section');
    function banner(file, id, extraClass = '', eager = false) {
      const image = document.createElement('img');
      image.id = id;
      image.className = 'hylian-site-banner' + (extraClass ? ' ' + extraClass : '');
      image.src = 'assets/' + file;
      image.alt = '';
      image.setAttribute('aria-hidden', 'true');
      image.draggable = false;
      image.decoding = 'async';
      image.loading = eager ? 'eager' : 'lazy';
      return image;
    }
    function decoration(id, className) {
      const node = document.createElement('div');
      node.id = id; node.className = className;
      node.setAttribute('aria-hidden', 'true');
      return node;
    }
    if (home) {
      const hero = document.querySelector('main > #home.hero');
      if (hero) {
        hero.classList.add('hylian-hero-banner-host');
        if (!document.getElementById('hylian-home-banner-left')) {
          hero.append(banner('multi-colored_hylian_banner_left.png', 'hylian-home-banner-left', 'hylian-hero-flank hylian-hero-flank-left'));
        }
        if (!document.getElementById('hylian-home-banner-right')) {
          hero.append(banner('multi-colored_hylian_banner_right.png', 'hylian-home-banner-right', 'hylian-hero-flank hylian-hero-flank-right'));
        }
      }
      const footer = document.querySelector('body > footer');
      let valance = document.getElementById('hylian-home-valance');
      if (footer) {
        const footerContent = footer.querySelector(':scope > .wrap') || footer;
        if (!valance) {
          valance = decoration('hylian-home-valance', 'hylian-banner-valance');
          valance.append(banner('large_horizontal_street_banner.png', 'hylian-home-valance-image'));
        }
        const image = valance.querySelector('img');
        if (image) image.loading = 'lazy';
        footerContent.prepend(valance);
      } else if (valance) {
        valance.remove();
      }
    }
    if (library) {
      const archive = library.querySelector('.lore-archive');
      if (archive && !document.getElementById('hylian-lore-corridor')) {
        const corridor = decoration('hylian-lore-corridor', 'hylian-banner-corridor');
        corridor.append(banner('hylian_banner.png', 'hylian-corridor-banner-crest'));
        archive.before(corridor);
      }
      const footer = document.querySelector('body > footer');
      if (footer && !document.getElementById('hylian-lore-footer-divider')) {
        const divider = decoration('hylian-lore-footer-divider', 'hylian-banner-footer-divider');
        divider.append(banner('small_horizontal_street_banner.png', 'hylian-lore-footer-banner'));
        footer.before(divider);
      }
    }
  }
  function init() {
    if (!document.body.classList.contains('guild-home') && !document.querySelector('main.triforce-lore-section')) return;
    if (document.getElementById('hylian-site-banner-styles')) { mount(); return; }
    const styles = document.createElement('link');
    styles.id = 'hylian-site-banner-styles';
    styles.rel = 'stylesheet';
    styles.href = 'assets/site-banners.css';
    styles.addEventListener('load', mount, {once: true});
    document.head.append(styles);
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init, {once: true});
  else init();
})();
