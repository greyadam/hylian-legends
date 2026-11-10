(() => {
  'use strict';
  const guides = document.getElementById('guides');
  const quests = document.getElementById('quests');
  if (!guides || !quests || guides.parentElement !== quests.parentElement) return;
  const files = [
    '2018-07-29_190900634_Linkmupi_Hotkey.png',
    '2018-07-29_192554058_Linkmupi_Hotkey.png',
    '2018-09-08_231928963_Linkmupi_LevelUp.png',
    'Annual Autumn Vintage 01.jpg',
    'Annual Autumn Vintage 02.jpg',
    'Annual Autumn Vintage 03.jpg',
    'Annual Autumn Vintage 04.jpg',
    'Chris Solo and Alma on Menera married.gif',
    'Dragonling Mounting.jpg',
    "Mutated Pumpkin's_Raid.jpg",
    'First Dragon 1.JPG',
    'First Dragon 2.JPG',
    'First Dragon 3.JPG',
    'Golden Fafnar trophy Place 1.jpg',
    'Golden Fafnar trophy Place 2.jpg',
    'Golden Fafnar trophy Place 3.jpg',
    'Golden Fafnar trophy Place 4.jpg',
    'Golden Fafnar trophy Place.jpg',
    'Griffinclaw Flower spot-1.jpg',
    'Griffinclaw Flower spot.jpg',
    'Guild house Basement Flood.jpg',
    'Guild house Top Flood.jpg',
    'Guild house midFlood.jpg',
    'Helmet Quest.jpg',
    'Killing Pythius the rotten_unedited.jpg',
    'Linkmupi Leveling up to 100.jpg',
    'Linkmupi in the test server.jpg',
    'Lucius - World Quest.jpg',
    'Music box place-1.jpg',
    "Mutated Pumpkin's Event 1-1.jpg",
    'My House2.jpg',
    'Pirate outfit pic.jpg',
    'Santa Claus  on Tibia.jpg',
    'Spirit of Light.jpg',
    "The Mutated Pumpkin's resting place getting Reward-1.jpg",
    "The Mutated Pumpkin's resting place-1.jpg",
    'The leech appeased the water buffalo and your taming was successful.jpg',
    'The witches of the green claw swamp ( World event ).jpg',
    'Tibia - Guild Quest.jpg',
    'Warzone 1.jpg',
    'Yalahar Last mission.jpg',
    'challenge of Kurik Reward Room.jpg',
    'challenge of Kurik.jpg',
    'linkmupi.jpg',
    'me and jocko in the void.jpg',
    'path to the House with the Music box-1.jpg',
    'picasion.com_5a78cff00ef7bc1ecdff4e66a4b82bb4.gif'
  ];
  function caption(file, index) {
    if (file.startsWith('picasion.com_')) return 'Guild Memory ' + (index + 1);
    return file.replace(/\.[^.]+$/, '').replace(/_webp|_unedited/g, '').replace(/(\d{4}-\d{2}-\d{2})_\d+_/, '$1 — ').replace(/LevelUp/g, 'Level Up').replace(/midFlood/g, 'Mid Flood').replace(/House2/g, 'House 2').replace(/_/g, ' ').replace(/\s+/g, ' ').trim().replace(/^./, c => c.toUpperCase());
  }
  const guildMemories = files.map((file, index) => ({
    src: 'assets/images/' + encodeURIComponent(file),
    title: caption(file, index),
    desc: 'Guild archive · Memory ' + (index + 1) + ' of ' + files.length
  }));
  const section = document.getElementById('guild-memories') || document.createElement('section');
  document.getElementById('guild-history')?.remove();
  guides.before(section);
  if (section.dataset.archiveLayout === 'split-header-v2') return;
  section.id = 'guild-memories';
  section.className = 'guild-memories-section';
  section.setAttribute('aria-labelledby', 'guild-memories-heading');
  section.removeAttribute('aria-roledescription');
  section.innerHTML = `<div class="wrap">
<div class="section-head archive-heading"><div><div class="micro">THE ARCHIVES</div><h2 id="guild-memories-heading">GUILD <em>history</em></h2></div><p>Shared adventures, milestones, and memories from our guild archive.</p></div>
<div class="archive-carousel" role="region" aria-roledescription="carousel" aria-label="Guild archive memories">
<div class="carousel-main-display"><div id="carousel-viewport" class="carousel-viewport"><div class="carousel-image-stage"><img id="main-carousel-img" alt="" decoding="async"></div><div class="carousel-caption-box"><h3 id="main-carousel-title"></h3><p id="main-carousel-desc"></p></div></div></div>
<div class="memory-thumbnail-navigation"><button class="memory-strip-arrow" type="button" data-memory-scroll="-1" aria-label="Scroll memory thumbnails left" aria-controls="thumbnail-strip"><span aria-hidden="true">&#10094;</span></button><div id="thumbnail-strip" class="thumbnail-strip" role="group" aria-label="Choose a guild memory"></div><button class="memory-strip-arrow" type="button" data-memory-scroll="1" aria-label="Scroll memory thumbnails right" aria-controls="thumbnail-strip"><span aria-hidden="true">&#10095;</span></button></div>
<p class="memory-announcement" role="status" aria-live="polite" aria-atomic="true"></p></div></div>`;
  const style = document.getElementById('guild-archive-layout-style') || document.createElement('style');
  style.id = 'guild-archive-layout-style';
  style.textContent = `
#guild-memories{--hylian-gold:#d4af37;--hylian-dark-bg:#121214;--hylian-card-bg:#1a1a1e;padding:95px 0;min-width:0;background:var(--bg,#0b1110);color:var(--cream,#f1e5c5);font-family:Georgia,serif}
#guild-memories,#guild-memories *,#guild-memories *::before,#guild-memories *::after{box-sizing:border-box}
#guild-memories>.wrap{width:100%;max-width:1120px;margin:auto;padding:0 24px}
#guild-memories .archive-heading{display:flex;justify-content:space-between;align-items:center;gap:40px;max-width:none;margin:0 0 64px;text-align:left}
#guild-memories .archive-heading .micro{color:var(--gold,#d4af37);font:10px/1.6 monospace;letter-spacing:4px;text-transform:uppercase}
#guild-memories .archive-heading h2{margin:18px 0 0;color:var(--cream,#f1e5c5);font:48px/1.15 Georgia,serif}
#guild-memories .archive-heading h2 em{color:var(--gold,#d4af37);font-weight:normal}
#guild-memories .archive-heading>p{max-width:350px;margin:8px 0;color:var(--muted,#aca995);font:14px/1.7 Arial,sans-serif}
#guild-memories .carousel-main-display{width:100%;max-width:900px;margin:0 auto 20px;overflow:hidden;border:3px solid var(--hylian-gold);border-radius:10px;background:var(--hylian-card-bg);box-shadow:0 8px 28px #d4af3729}
#guild-memories .carousel-viewport{position:relative;isolation:isolate}
#guild-memories .carousel-image-stage{height:clamp(340px,48vw,500px);background:var(--hylian-card-bg)}
#guild-memories #main-carousel-img{display:block;width:100%;max-width:100%;height:100%;margin:0;padding:0;object-fit:cover}
#guild-memories .carousel-caption-box{position:absolute;inset:auto 0 0;z-index:1;padding:64px 28px 24px;border:0;background:linear-gradient(to bottom,transparent,rgba(10,10,12,.9) 45%,rgba(10,10,12,.98));overflow-wrap:break-word;pointer-events:none}
#guild-memories .carousel-caption-box h3{margin:0 0 8px;color:var(--hylian-gold);font:clamp(23px,3vw,34px)/1.2 Georgia,serif;font-variant:normal}
#guild-memories .carousel-caption-box p{max-width:650px;margin:0;color:#eee;font:15px/1.6 Arial,sans-serif}
#guild-memories .memory-thumbnail-navigation{display:grid;grid-template-columns:44px minmax(0,1fr) 44px;align-items:center;gap:12px;max-width:900px;margin:0 auto}
#guild-memories .thumbnail-strip{display:flex;gap:14px;width:100%;min-width:0;max-width:none;margin:0;padding:10px 6px 14px;overflow-x:auto;scroll-padding-inline:6px;scroll-snap-type:x proximity;scrollbar-width:thin;scrollbar-color:var(--hylian-gold) var(--hylian-dark-bg)}
#guild-memories .thumbnail-strip::-webkit-scrollbar{height:6px}#guild-memories .thumbnail-strip::-webkit-scrollbar-thumb{border-radius:3px;background:var(--hylian-gold)}
#guild-memories .thumb-card{display:flex;flex:0 0 170px;flex-direction:column;width:170px;height:auto;margin:0;padding:0;overflow:hidden;scroll-snap-align:start;border:2px solid #ffffff24;border-radius:7px;background:var(--hylian-card-bg);color:#ddd;text-align:left;cursor:pointer;opacity:.7;transform:none;transition:border-color .2s,opacity .2s}
#guild-memories .thumb-card img{display:block;width:100%;height:96px;margin:0;padding:0;object-fit:cover}
#guild-memories .thumb-card span{display:block;width:100%;padding:9px 10px;font:12px/1.4 Arial,sans-serif}
#guild-memories .thumb-card:hover,#guild-memories .thumb-card:focus-visible{opacity:1}
#guild-memories .thumb-card.active-thumb{border-color:var(--hylian-gold);color:var(--hylian-gold);opacity:1;transform:none;box-shadow:0 0 12px #d4af3726}
#guild-memories .memory-strip-arrow{position:static;display:grid;place-items:center;width:44px;height:44px;margin:0;padding:0;border:1px solid var(--hylian-gold);border-radius:50%;background:var(--hylian-card-bg);color:var(--hylian-gold);font:18px/1 Arial,sans-serif;cursor:pointer;transition:background .2s,color .2s}
#guild-memories .memory-strip-arrow:hover{background:var(--hylian-gold);color:#121214}
#guild-memories button:focus-visible{outline:3px solid var(--hylian-gold);outline-offset:3px}
#guild-memories .memory-announcement{position:absolute;width:1px;height:1px;margin:-1px;padding:0;overflow:hidden;clip-path:inset(50%);white-space:nowrap;border:0}
@media(max-width:760px){#guild-memories{padding:65px 0}#guild-memories>.wrap{padding:0 20px}#guild-memories .archive-heading{flex-direction:column;align-items:flex-start;gap:15px;margin-bottom:35px}#guild-memories .archive-heading h2{font-size:37px}}
@media(max-width:600px){#guild-memories .carousel-image-stage{height:340px}#guild-memories .carousel-caption-box{padding:56px 18px 20px}#guild-memories .memory-thumbnail-navigation{gap:6px}#guild-memories .thumb-card{flex-basis:140px;width:140px}#guild-memories .thumb-card img{height:80px}}
@media(prefers-reduced-motion:reduce){#guild-memories .thumb-card,#guild-memories .memory-strip-arrow{transition:none}#guild-memories .thumbnail-strip{scroll-snap-type:none}}
`;
  if (!style.isConnected) document.head.append(style);
  const strip = section.querySelector('#thumbnail-strip');
  const image = section.querySelector('#main-carousel-img');
  const title = section.querySelector('#main-carousel-title');
  const description = section.querySelector('#main-carousel-desc');
  const announcement = section.querySelector('.memory-announcement');
  const thumbnails = [];
  const fragment = document.createDocumentFragment();
  function scrollOptions(left) {
    return {left, behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth'};
  }
  function reveal(button) {
    const rail = strip.getBoundingClientRect();
    const card = button.getBoundingClientRect();
    if (card.left < rail.left + 6) strip.scrollBy(scrollOptions(card.left - rail.left - 6));
    else if (card.right > rail.right - 6) strip.scrollBy(scrollOptions(card.right - rail.right + 6));
  }
  function select(index, announce = true) {
    const memory = guildMemories[index];
    if (!memory) return;
    image.alt = memory.title;
    image.src = memory.src;
    title.textContent = memory.title;
    description.textContent = memory.desc;
    thumbnails.forEach((button, i) => {
      const active = i === index;
      button.classList.toggle('active-thumb', active);
      button.setAttribute('aria-pressed', String(active));
    });
    if (announce) {
      announcement.textContent = memory.desc + ': ' + memory.title;
      reveal(thumbnails[index]);
    }
  }
  guildMemories.forEach((memory, index) => {
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'thumb-card';
    button.setAttribute('aria-label', 'Show memory ' + (index + 1) + ' of ' + guildMemories.length + ': ' + memory.title);
    button.setAttribute('aria-controls', 'carousel-viewport');
    button.setAttribute('aria-pressed', 'false');
    const preview = document.createElement('img');
    preview.src = memory.src;
    preview.alt = '';
    preview.loading = 'lazy';
    preview.decoding = 'async';
    const label = document.createElement('span');
    label.textContent = memory.title;
    button.append(preview, label);
    button.addEventListener('click', () => select(index));
    button.addEventListener('keydown', event => {
      if (event.altKey || event.ctrlKey || event.metaKey || event.shiftKey) return;
      let next;
      switch (event.key) {
        case 'ArrowLeft': next = (index - 1 + guildMemories.length) % guildMemories.length; break;
        case 'ArrowRight': next = (index + 1) % guildMemories.length; break;
        case 'Home': next = 0; break;
        case 'End': next = guildMemories.length - 1; break;
        default: return;
      }
      event.preventDefault();
      select(next);
      thumbnails[next].focus({preventScroll: true});
    });
    thumbnails.push(button);
    fragment.append(button);
  });
  strip.replaceChildren(fragment);
  section.querySelectorAll('[data-memory-scroll]').forEach(button => {
    button.addEventListener('click', () => {
      const direction = Number(button.dataset.memoryScroll);
      strip.scrollBy(scrollOptions(direction * Math.max(154, strip.clientWidth * 0.8)));
    });
  });
  section.dataset.archiveReady = 'true';
  section.dataset.archiveLayout = 'split-header-v2';
  section.dataset.memoryCount = String(guildMemories.length);
  select(0, false);
})();
