(() => {
  const stones = {
    COURAGE: {file:'Small Kokiri Emerald.png',name:"Kokiri's Emerald",glow:'drop-shadow(0 0 7px #39af7780)'},
    WISDOM: {file:'Small Zora Sapphire.png',name:"Zora's Sapphire",glow:'drop-shadow(0 0 7px #75abff80)'},
    POWER: {file:'Small Goron Ruby.png',name:"Goron's Ruby",glow:'drop-shadow(0 0 4px #dc453580) drop-shadow(0 0 8px #e9b34d60)'}
  };
  document.querySelectorAll('#codex .virtues .panel').forEach(card => {
    const virtue = card.querySelector('h3')?.textContent.trim().toUpperCase();
    const stone = stones[virtue];
    const diamond = card.querySelector('.diamond');
    if (!stone || !diamond) return;
    const image = new Image();
    image.alt = stone.name;
    image.title = stone.name + ' — ' + virtue.charAt(0) + virtue.slice(1).toLowerCase();
    image.width = 40;
    image.height = 40;
    image.className = 'virtue-stone';
    image.style.cssText = 'display:block;width:40px;height:40px;object-fit:contain;filter:' + stone.glow;
    image.onload = () => diamond.replaceWith(image);
    image.src = 'assets/' + encodeURIComponent(stone.file);
  });
})();
