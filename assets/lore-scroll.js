(() => {
  'use strict';
  function init() {
    const trigger = document.getElementById('lore-scroll-trigger');
    const dialog = document.getElementById('lore-scroll-lightbox');
    const image = document.getElementById('lore-scroll-full-image');
    const stage = document.getElementById('lore-scroll-image-stage');
    const close = document.getElementById('lore-scroll-close');
    const zoom = document.getElementById('lore-scroll-zoom');
    if (!trigger || !dialog || !image || !stage || !close || !zoom || typeof dialog.showModal !== 'function' || dialog.dataset.ready) return;
    dialog.dataset.ready = 'true';
    trigger.setAttribute('aria-haspopup', 'dialog');
    trigger.setAttribute('aria-controls', dialog.id);
    let outsidePress = false;
    function resetView() {
      dialog.classList.remove('is-actual-size');
      zoom.setAttribute('aria-pressed', 'false');
      zoom.textContent = 'Actual size';
      stage.scrollTop = 0; stage.scrollLeft = 0;
    }
    trigger.addEventListener('click', event => {
      if (event.defaultPrevented || event.button !== 0 || event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;
      if (dialog.open) { event.preventDefault(); return; }
      try {
        if (!image.getAttribute('src')) image.src = image.dataset.src;
        resetView();
        dialog.showModal();
        event.preventDefault();
        dialog.scrollTop = 0;
      } catch (_) { /* Leave the direct artwork link usable if the modal cannot open. */ }
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
      if (trigger.isConnected) trigger.focus({preventScroll: true});
    });
    // Native modal behavior supplies Escape dismissal, focus containment and background inertness.
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init, {once: true});
  else init();
})();
