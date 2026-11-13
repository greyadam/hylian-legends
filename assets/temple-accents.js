(() => {
  'use strict';
  function init() {
    if (document.getElementById('targeted-temple-accents-style')) return;
    const home = document.body.classList.contains('guild-home');
    const library = document.querySelector('main.triforce-lore-section');
    if (!home && !library) return;
    const style = document.createElement('style');
    style.id = 'targeted-temple-accents-style';
    style.textContent = `
#codex .stone-relic-label{display:block;max-width:100%;min-height:1.4em;margin:4px 0 6px;color:var(--gold,#d4af37);font-size:18px;line-height:1.4;letter-spacing:.025em;overflow-wrap:anywhere}
#codex .stone-era-badge{display:inline-block;max-width:100%;min-height:1.6em;margin:0 0 12px;padding:2px 8px;border:1px solid #d4af373d;border-radius:999px;color:#d8bd79;font-size:12px;line-height:1.6;letter-spacing:.03em;overflow-wrap:anywhere}
.temple-script-divider,.temple-footer-seal{display:flex;align-items:center;justify-content:center;gap:12px;max-width:100%;min-height:30px;margin:0 0 16px;overflow:hidden;color:#d4af37;opacity:.1;pointer-events:none;user-select:none;text-shadow:0 -1px 1px #000,0 1px 0 #f1e5c533}
.temple-script-divider>span,.temple-footer-seal>span{display:inline-block;min-width:0;max-width:45%;overflow:hidden;white-space:nowrap;font-size:24px;line-height:1.2;letter-spacing:.12em}
.temple-script-divider::before,.temple-script-divider::after,.temple-footer-seal::before,.temple-footer-seal::after{content:'';height:1px;flex:1;background:linear-gradient(90deg,transparent,#d4af37)}
.temple-script-divider::after,.temple-footer-seal::after{transform:scaleX(-1)}
.temple-footer-seal{width:calc(100% - 48px);max-width:700px;margin:0 auto 24px}
@media(max-width:600px){.temple-script-divider>span,.temple-footer-seal>span{font-size:19px;letter-spacing:.08em}.temple-script-divider,.temple-footer-seal{gap:8px}}
@media(forced-colors:active){.temple-script-divider,.temple-footer-seal{display:none}}
`;
    document.head.append(style);
    if (home) {
      const stones = {COURAGE:"Kokiri's Emerald",WISDOM:"Zora's Sapphire",POWER:"Goron's Ruby"};
      document.querySelectorAll('#codex .virtues .panel').forEach(card => {
        const heading = card.querySelector('h3');
        const name = stones[heading?.textContent.trim().toUpperCase()];
        if (!heading || !name || card.querySelector('.stone-era-badge')) return;
        const label = document.createElement('span');
        label.className = 'stone-relic-label font-ravenna';label.textContent = name;
        const badge = document.createElement('span');
        badge.className = 'stone-era-badge era-badge font-sherwood';badge.dataset.era = 'oot';badge.textContent = 'Ocarina of Time';
        heading.after(label, badge);
      });
    }
    function divider(id, fonts, seal = false) {
      const node = document.createElement('div');node.id = id;
      node.className = seal ? 'temple-footer-seal' : 'temple-script-divider';node.setAttribute('aria-hidden', 'true');
      for (const [family, text] of fonts) {
        const span = document.createElement('span');span.className = family;span.textContent = text;node.append(span);
      }
      return node;
    }
    if (library) {
      const summary = library.querySelector('.triforce-summary');
      const origins = library.querySelector('.triforce-origins');
      if (summary && !document.getElementById('triforce-summary-script')) summary.prepend(divider('triforce-summary-script', [['font-ss-hylian','Power Wisdom Courage']]));
      if (origins && !document.getElementById('triforce-history-script')) origins.prepend(divider('triforce-history-script', [['font-ancient-hylian','Sacred Relic']]));
    }
    const footer = document.querySelector('body>footer');
    if (footer && !document.getElementById('temple-footer-seal')) footer.prepend(divider('temple-footer-seal', [['font-ancient-hylian','Hylian Legends'],['font-gerudo','Courage Wisdom Power']], true));
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init, {once:true});else init();
})();
