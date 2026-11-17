(() => {
  'use strict';
  function init() {
    const triggers = document.querySelectorAll('.lore-manuscript [data-lore-artifact]');
    const dialog = document.getElementById('lore-scroll-lightbox');
    const image = document.getElementById('lore-scroll-full-image');
    const stage = document.getElementById('lore-scroll-image-stage');
    const close = document.getElementById('lore-scroll-close');
    const zoom = document.getElementById('lore-scroll-zoom');
    const title = document.getElementById('lore-scroll-lightbox-title');
    const fullSizeLink = dialog?.querySelector('.lore-scroll-tools > a');
    if (!triggers.length || !dialog || !image || !stage || !close || !zoom || !title || !fullSizeLink || typeof dialog.showModal !== 'function' || dialog.dataset.ready) return;
    dialog.dataset.ready = 'true';
    let activeTrigger = null;
    let outsidePress = false;
    function resetView() {
      dialog.classList.remove('is-actual-size');
      zoom.setAttribute('aria-pressed', 'false');
      zoom.textContent = 'Actual size';
      stage.scrollTop = 0; stage.scrollLeft = 0;
    }
    triggers.forEach(trigger => {
      trigger.setAttribute('aria-haspopup', 'dialog');
      trigger.setAttribute('aria-controls', dialog.id);
      trigger.addEventListener('click', event => {
        if (event.defaultPrevented || event.button !== 0 || event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;
        if (dialog.open) { event.preventDefault(); return; }
        const source = trigger.getAttribute('href');
        if (!source) return;
        const thumbnail = trigger.querySelector('img');
        const artifactTitle = trigger.dataset.artifactTitle || 'Archive artifact';
        try {
          image.alt = thumbnail?.alt || artifactTitle;
          if (image.getAttribute('src') !== source) image.src = source;
          title.textContent = artifactTitle;
          fullSizeLink.href = source;
          fullSizeLink.setAttribute('aria-label', `Open full-size artwork: ${artifactTitle}`);
          stage.setAttribute('aria-label', `Scrollable high-resolution artwork: ${artifactTitle}`);
          resetView(); activeTrigger = trigger; outsidePress = false;
          dialog.showModal();
          event.preventDefault();
          dialog.scrollTop = 0;
        } catch (_) {
          activeTrigger = null;
          // Preserve the direct artwork link if the dialog cannot open.
        }
      });
    });
    close.addEventListener('click', () => dialog.close());
    zoom.addEventListener('click', () => {
      const actual = dialog.classList.toggle('is-actual-size');
      zoom.setAttribute('aria-pressed', String(actual));
      zoom.textContent = actual ? 'Fit width' : 'Actual size';
      stage.scrollTop = 0; stage.scrollLeft = 0;
    });
    dialog.addEventListener('pointerdown', event => { outsidePress = event.target === dialog; });
    dialog.addEventListener('pointercancel', () => { outsidePress = false; });
    dialog.addEventListener('click', event => {
      const outside = outsidePress && event.target === dialog;
      outsidePress = false;
      if (outside) dialog.close();
    });
    dialog.addEventListener('close', () => {
      outsidePress = false; resetView();
      const returnTarget = activeTrigger;
      activeTrigger = null;
      if (returnTarget?.isConnected) returnTarget.focus({preventScroll: true});
    });
    // Native modal behavior supplies Escape dismissal, focus containment and background inertness.
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init, {once: true});
  else init();
})();
