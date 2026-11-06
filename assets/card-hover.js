(() => {
  if (document.getElementById('hylian-card-hover-styles')) return;
  const style = document.createElement('style');
  style.id = 'hylian-card-hover-styles';
  style.textContent = `
main :is(.panel,.decree,.rank,.guide,.event){transition:all 0.3s ease}
main :is(.panel,.decree,.rank,.guide,.event):hover,main :is(.panel,.decree,.rank,.guide,.event):focus-within{box-shadow:0 0 12px rgba(212,175,55,0.25);border-color:rgba(212,175,55,0.5)}
#discord .channels:hover,#discord .channels:focus-within{border-color:rgba(212,175,55,0.5)}
.hylian-image-frame{display:block;overflow:hidden;isolation:isolate}
.ocarina>.hylian-image-frame{border-radius:50%}
.hylian-image-frame>img{display:block;transform:scale(1);transition:transform 0.4s ease}
.hylian-image-frame:hover>img,:is(.panel,.guide,.ocarina):hover .hylian-image-frame>img,:is(.panel,.guide,.ocarina):focus-within .hylian-image-frame>img{transform:scale(1.05)}
.hylian-zoom-background{position:relative;overflow:hidden;isolation:isolate}
.hylian-zoom-background::before{content:'';position:absolute;inset:0;z-index:-1;pointer-events:none;background-image:var(--hylian-zoom-background);background-position:center;background-size:cover;transform:scale(1);transition:transform 0.4s ease;border-radius:inherit}
.hylian-zoom-background:hover::before,.panel:hover>.hylian-zoom-background::before,.hylian-zoom-background:focus-within::before,.panel:focus-within>.hylian-zoom-background::before{transform:scale(1.05)}
@media(prefers-reduced-motion:reduce){main :is(.panel,.decree,.rank,.guide,.event),.hylian-image-frame>img,.hylian-zoom-background::before{transition:none}.hylian-image-frame:hover>img,:is(.panel,.guide,.ocarina):hover .hylian-image-frame>img,:is(.panel,.guide,.ocarina):focus-within .hylian-image-frame>img,.hylian-zoom-background:hover::before,.panel:hover>.hylian-zoom-background::before,.hylian-zoom-background:focus-within::before,.panel:focus-within>.hylian-zoom-background::before{transform:none}}
`;
  document.head.append(style);
  function prepareImages() {
    document.querySelectorAll('main .ocarina>img,main .panel img:not(.virtue-stone),main .guide img').forEach(image => {
      if (image.closest('.hylian-image-frame')) return;
      const frame = document.createElement('span');
      frame.className = 'hylian-image-frame';
      image.before(frame);
      frame.append(image);
    });
    document.querySelectorAll('main .oath,main .guide.featured').forEach(card => {
      if (card.classList.contains('hylian-zoom-background')) return;
      const background = getComputedStyle(card).backgroundImage;
      if (background === 'none') return;
      card.style.setProperty('--hylian-zoom-background',background);
      card.style.backgroundImage = 'none';
      card.classList.add('hylian-zoom-background');
    });
  }
  prepareImages();
  const guides = document.getElementById('guide-list');
  if (guides) new MutationObserver(prepareImages).observe(guides,{childList:true,subtree:true});
})();

(() => {
  const script = document.createElement('script');
  script.src = 'assets/guild-marquee.js';
  document.head.append(script);
})();

(() => {
  const descriptions = {
    COURAGE: 'The Kokiri’s Emerald, guarded by the Deku Tree. Farore’s green light guides those who take initiative, lead the raid, and welcome newcomers first.',
    WISDOM: 'The Zora’s Sapphire, passed through royal lineage. Nayru’s blue radiance empowers those who master the strat, write the guide, and preserve our guild lore.',
    POWER: 'The Goron’s Ruby, forged deep in Death Mountain. Din’s red flame fuels those who train hard, compete with honor, and lift the whole guild with them.'
  };
  document.querySelectorAll('#codex .virtues .panel').forEach(card => {
    const virtue = card.querySelector('h3')?.textContent.trim().toUpperCase();
    const paragraph = card.querySelector('p');
    if (paragraph && descriptions[virtue]) paragraph.textContent = descriptions[virtue];
  });
  if (document.getElementById('virtue-description-styles')) return;
  const style = document.createElement('style');
  style.id = 'virtue-description-styles';
  style.textContent = '#codex .virtues .panel p{font-size:0.9rem;line-height:1.5;color:rgba(255,255,255,0.8)}';
  document.head.append(style);
})();

(() => {
  const themes = {
    COURAGE: ['#4ade80','rgba(74,222,128,0.4)'],
    WISDOM: ['#60a5fa','rgba(96,165,250,0.4)'],
    POWER: ['#f87171','rgba(248,113,113,0.4)']
  };
  document.querySelectorAll('#codex .virtues .panel').forEach(card => {
    const virtue = card.querySelector('h3')?.textContent.trim().toUpperCase();
    if (!themes[virtue]) return;
    card.classList.add('virtue-themed');
    card.style.setProperty('--virtue-color',themes[virtue][0]);
    card.style.setProperty('--virtue-glow',themes[virtue][1]);
  });
  if (document.getElementById('virtue-theme-styles')) return;
  const style = document.createElement('style');
  style.id = 'virtue-theme-styles';
  style.textContent = '#codex .virtues .panel.virtue-themed{transition:all 0.3s ease-in-out}#codex .virtues .panel.virtue-themed h3{color:var(--virtue-color)}#codex .virtues .panel.virtue-themed:hover,#codex .virtues .panel.virtue-themed:focus-within{box-shadow:0 0 15px var(--virtue-glow);border-color:var(--virtue-color)}@media(prefers-reduced-motion:reduce){#codex .virtues .panel.virtue-themed{transition:none}}';
  document.head.append(style);
})();
