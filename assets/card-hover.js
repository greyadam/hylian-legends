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
