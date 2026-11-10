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
    desc: 'Preserved in the Hylian Legends guild archive.',
    format: file.split('.').pop().toUpperCase(),
    date: file.match(/^\d{4}-\d{2}-\d{2}/)?.[0] || ''
  }));
  const section = document.getElementById('guild-memories') || document.createElement('section');
  document.getElementById('guild-history')?.remove();
  function enforceArchiveOrder() {
    const parent = guides.parentElement;
    if (!parent) return;
    if (guides.nextElementSibling !== section) guides.after(section);
  }
  enforceArchiveOrder();
  if (section.dataset.archiveLayout === 'autoplay-depth-v5') return;
  section.id = 'guild-memories';
  section.className = 'guild-memories-section';
  section.setAttribute('aria-labelledby', 'guild-memories-heading');
  section.removeAttribute('aria-roledescription');
  section.innerHTML = `<div class="wrap">
<div class="section-head archive-heading"><div><div class="micro">THE ARCHIVES</div><h2 id="guild-memories-heading">GUILD <em>history</em></h2></div><p>Shared adventures, milestones, and memories from our guild archive.</p></div>
<div class="archive-carousel" role="region" aria-roledescription="carousel" aria-label="Guild archive memories">
<div class="memory-playback"><span id="memory-playback-status"></span><button id="memory-autoplay-toggle" type="button" aria-controls="carousel-viewport thumbnail-strip">Pause slideshow</button></div>
<div class="carousel-main-display"><div id="carousel-viewport" class="carousel-viewport"><div class="carousel-image-stage"><img id="main-carousel-img" alt="" decoding="async"></div><div class="carousel-caption-box"><p id="main-carousel-position" class="memory-position"></p><h3 id="main-carousel-title"></h3><p id="main-carousel-desc"></p><dl class="memory-metadata"><div><dt>Format</dt><dd id="main-carousel-format"></dd></div><div id="memory-date-row" hidden><dt>Date in filename</dt><dd><time id="main-carousel-date"></time></dd></div></dl></div></div></div>
<div class="memory-thumbnail-navigation"><button class="memory-strip-arrow" type="button" data-memory-scroll="-1" aria-label="Previous guild memory" aria-controls="carousel-viewport thumbnail-strip"><span aria-hidden="true">&#10094;</span></button><div id="thumbnail-strip" class="thumbnail-strip" role="group" aria-label="Choose a guild memory"><div class="thumbnail-track"></div></div><button class="memory-strip-arrow" type="button" data-memory-scroll="1" aria-label="Next guild memory" aria-controls="carousel-viewport thumbnail-strip"><span aria-hidden="true">&#10095;</span></button></div>
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
#guild-memories .memory-playback{display:flex;justify-content:flex-end;align-items:center;flex-wrap:wrap;gap:12px;max-width:1000px;margin:0 auto 12px;font:12px/1.5 Arial,sans-serif}
#guild-memories #memory-playback-status{color:var(--muted,#aca995)}
#guild-memories #memory-autoplay-toggle{padding:8px 16px;border:1px solid var(--hylian-gold);border-radius:24px;background:var(--hylian-card-bg);color:var(--hylian-gold);font:12px/1.5 Arial,sans-serif;cursor:pointer}
#guild-memories .carousel-main-display{width:100%;max-width:1000px;margin:0 auto 12px;overflow:hidden;border:3px solid var(--hylian-gold);border-radius:10px;background:var(--hylian-card-bg);box-shadow:0 8px 28px #d4af3729}
#guild-memories .carousel-viewport{position:relative;isolation:isolate;display:grid;grid-template-columns:minmax(0,1.6fr) minmax(260px,1fr);align-items:stretch}
#guild-memories .carousel-image-stage{position:relative;height:auto;min-height:360px;min-width:0;background:#090d0b}
#guild-memories #main-carousel-img{position:absolute;inset:0;display:block;width:100%;max-width:100%;height:100%;margin:0;padding:0;object-fit:contain}
#guild-memories .carousel-caption-box{position:static;inset:auto;z-index:auto;display:flex;flex-direction:column;justify-content:center;min-width:0;padding:32px;border:0;border-left:1px solid #d4af374d;background:linear-gradient(145deg,#20251e,#111712);overflow-wrap:anywhere;pointer-events:auto}
#guild-memories .carousel-caption-box h3{margin:0 0 16px;color:var(--hylian-gold);font:clamp(22px,2.5vw,32px)/1.2 Georgia,serif;font-variant:normal}
#guild-memories .carousel-caption-box p{max-width:none;margin:0;color:#ddd;font:14px/1.7 Arial,sans-serif}
#guild-memories .carousel-caption-box .memory-position{margin:0 0 14px;color:var(--hylian-gold);font:10px/1.6 monospace;letter-spacing:2px;text-transform:uppercase}
#guild-memories .memory-metadata{display:flex;flex-wrap:wrap;gap:16px 24px;margin:24px 0 0;padding:18px 0 0;border-top:1px solid #d4af3733;font:12px/1.5 Arial,sans-serif}
#guild-memories .memory-metadata dt{color:#aca995;font-size:10px;letter-spacing:1px;text-transform:uppercase}
#guild-memories .memory-metadata dd{margin:5px 0 0;color:#f1e5c5}
#guild-memories .memory-thumbnail-navigation{display:grid;grid-template-columns:44px minmax(0,1fr) 44px;align-items:center;gap:12px;max-width:1000px;margin:0 auto}
#guild-memories .thumbnail-strip{display:block;position:relative;width:100%;min-width:0;max-width:none;margin:0;padding:50px 0 100px;overflow-x:auto;scroll-snap-type:x proximity;scrollbar-width:thin;scrollbar-color:var(--hylian-gold) var(--hylian-dark-bg)}
#guild-memories .thumbnail-strip::-webkit-scrollbar{height:6px}#guild-memories .thumbnail-strip::-webkit-scrollbar-thumb{border-radius:3px;background:var(--hylian-gold)}
#guild-memories .thumbnail-track{--thumb-width:170px;position:relative;display:flex;align-items:stretch;gap:14px;width:max-content;min-width:100%;padding-inline:max(16px,calc((var(--rail-width,0px) - var(--thumb-width))/2));perspective:1000px;perspective-origin:var(--perspective-x,50%) 50%;transform-style:preserve-3d;overflow:visible}
#guild-memories .thumb-card{position:relative;display:flex;flex:0 0 var(--thumb-width);flex-direction:column;width:var(--thumb-width);height:auto;margin:0;padding:0;overflow:visible;scroll-snap-align:center;border:2px solid #ffffff24;border-radius:7px;background:var(--hylian-card-bg);color:#ddd;text-align:left;cursor:pointer;opacity:1;backface-visibility:hidden;box-shadow:0 8px 18px #0005}
#guild-memories .thumb-card,#guild-memories .thumb-card.active-thumb{transform-origin:50% 60%;transform:translateY(var(--arc-y,0px)) translateZ(var(--arc-z,0px)) rotateY(var(--arc-angle,0deg)) rotateZ(var(--arc-tilt,0deg)) scale(var(--arc-scale,1));transition:transform .32s ease,border-color .2s ease,box-shadow .2s ease}
#guild-memories .thumb-card img{display:block;width:100%;height:96px;margin:0;padding:0;border-radius:5px 5px 0 0;object-fit:cover}
#guild-memories .thumb-card span{display:block;width:100%;padding:9px 10px;overflow-wrap:anywhere;font:12px/1.4 Arial,sans-serif}
#guild-memories .thumb-card:hover,#guild-memories .thumb-card:focus-visible{border-color:var(--hylian-gold)}
#guild-memories .thumb-card.active-thumb{border-color:var(--hylian-gold);color:var(--hylian-gold);box-shadow:0 0 18px #d4af3740,0 12px 24px #0008}
#guild-memories .thumb-card.active-thumb::before{content:'';position:absolute;top:-13px;left:50%;width:0;height:0;transform:translateX(-50%);border-left:8px solid transparent;border-right:8px solid transparent;border-bottom:8px solid var(--hylian-gold);pointer-events:none}
#guild-memories .memory-strip-arrow{position:static;display:grid;place-items:center;width:44px;height:44px;margin:0;padding:0;border:1px solid var(--hylian-gold);border-radius:50%;background:var(--hylian-card-bg);color:var(--hylian-gold);font:18px/1 Arial,sans-serif;cursor:pointer;transition:background .2s,color .2s}
#guild-memories .memory-strip-arrow:hover{background:var(--hylian-gold);color:#121214}
#guild-memories button:focus-visible{outline:3px solid var(--hylian-gold);outline-offset:3px}
#guild-memories .memory-announcement{position:absolute;width:1px;height:1px;margin:-1px;padding:0;overflow:hidden;clip-path:inset(50%);white-space:nowrap;border:0}
@media(max-width:760px){#guild-memories{padding:65px 0}#guild-memories>.wrap{padding:0 20px}#guild-memories .archive-heading{flex-direction:column;align-items:flex-start;gap:15px;margin-bottom:35px}#guild-memories .archive-heading h2{font-size:37px}}
@media(max-width:700px){#guild-memories .carousel-viewport{grid-template-columns:minmax(0,1fr)}#guild-memories .carousel-image-stage{height:280px;min-height:0}#guild-memories .carousel-caption-box{padding:24px;border-left:0;border-top:1px solid #d4af374d}}
@media(max-width:600px){#guild-memories .memory-thumbnail-navigation{gap:6px}#guild-memories .thumbnail-track{--thumb-width:140px}#guild-memories .thumb-card img{height:80px}}
@media(prefers-reduced-motion:reduce){#guild-memories .thumb-card,#guild-memories .thumb-card.active-thumb,#guild-memories .memory-strip-arrow{transition:none}#guild-memories .thumbnail-strip{scroll-snap-type:none}}
`;
  if (!style.isConnected) document.head.append(style);
  const carousel = section.querySelector('.archive-carousel');
  const strip = section.querySelector('#thumbnail-strip');
  const track = section.querySelector('.thumbnail-track');
  const image = section.querySelector('#main-carousel-img');
  const title = section.querySelector('#main-carousel-title');
  const description = section.querySelector('#main-carousel-desc');
  const position = section.querySelector('#main-carousel-position');
  const format = section.querySelector('#main-carousel-format');
  const dateRow = section.querySelector('#memory-date-row');
  const date = section.querySelector('#main-carousel-date');
  const announcement = section.querySelector('.memory-announcement');
  const playButton = section.querySelector('#memory-autoplay-toggle');
  const playbackStatus = section.querySelector('#memory-playback-status');
  const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const thumbnails = [];
  const fragment = document.createDocumentFragment();
  const AUTOPLAY_INTERVAL = 5000;
  let currentIndex = 0;
  let timer;
  let paused = motion.matches;
  let hovered = false;
  let focusWithin = false;
  let playWhileFocused = false;
  function canAutoplay() {
    return !paused && !hovered && (!focusWithin || playWhileFocused) && !document.hidden && section.isConnected;
  }
  function scheduleAutoplay() {
    clearTimeout(timer);
    playButton.textContent = paused ? 'Play slideshow' : 'Pause slideshow';
    playButton.setAttribute('aria-label', paused ? 'Start automatic memory slideshow' : 'Pause automatic memory slideshow');
    playbackStatus.textContent = paused ? 'Auto-play paused' : canAutoplay() ? 'Auto-play · Every 5 seconds' : 'Auto-play waiting · Interaction or hidden tab';
    if (canAutoplay() && guildMemories.length > 1) {
      timer = setTimeout(() => {
        if (canAutoplay()) select(currentIndex + 1, false, true);
        else scheduleAutoplay();
      }, AUTOPLAY_INTERVAL);
    }
  }
  function scrollOptions(left, animate = true) {
    return {left, behavior: animate && !motion.matches ? 'smooth' : 'auto'};
  }
  function updateArc() {
    track.style.setProperty('--rail-width', strip.clientWidth + 'px');
    thumbnails.forEach((button, index) => {
      const distance = Math.max(-4, Math.min(4, index - currentIndex));
      const magnitude = Math.abs(distance);
      button.style.setProperty('--arc-angle', (-distance * 13) + 'deg');
      button.style.setProperty('--arc-z', (distance === 0 ? 36 : -magnitude * 65) + 'px');
      button.style.setProperty('--arc-y', (distance === 0 ? -6 : magnitude * magnitude * 4) + 'px');
      button.style.setProperty('--arc-tilt', (distance * 1.5) + 'deg');
      button.style.setProperty('--arc-scale', distance === 0 ? '1.04' : '1');
      button.style.zIndex = String(100 - magnitude);
    });
    const active = thumbnails[currentIndex];
    if (active) track.style.setProperty('--perspective-x', (active.offsetLeft + active.offsetWidth / 2) + 'px');
  }
  function centerThumbnail(animate = true) {
    const active = thumbnails[currentIndex];
    if (!active) return;
    strip.scrollTo(scrollOptions(track.offsetLeft + active.offsetLeft + active.offsetWidth / 2 - strip.clientWidth / 2, animate));
  }
  function select(index, announce = true, animate = announce) {
    if (!Number.isInteger(index) || !guildMemories.length) return;
    index = ((index % guildMemories.length) + guildMemories.length) % guildMemories.length;
    const memory = guildMemories[index];
    currentIndex = index;
    image.alt = memory.title;
    image.src = memory.src;
    title.textContent = memory.title;
    description.textContent = memory.desc;
    position.textContent = 'Memory ' + String(index + 1).padStart(2, '0') + ' / ' + guildMemories.length;
    format.textContent = memory.format;
    dateRow.hidden = !memory.date;
    date.textContent = memory.date;
    if (memory.date) date.dateTime = memory.date;
    else date.removeAttribute('datetime');
    thumbnails.forEach((button, i) => {
      const active = i === index;
      button.classList.toggle('active-thumb', active);
      button.setAttribute('aria-pressed', String(active));
    });
    updateArc();
    centerThumbnail(animate);
    if (announce) announcement.textContent = position.textContent + ': ' + memory.title;
    scheduleAutoplay();
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
        case 'ArrowLeft': next = index - 1; break;
        case 'ArrowRight': next = index + 1; break;
        case 'Home': next = 0; break;
        case 'End': next = guildMemories.length - 1; break;
        default: return;
      }
      event.preventDefault();
      select(next);
      thumbnails[currentIndex].focus({preventScroll: true});
    });
    thumbnails.push(button);
    fragment.append(button);
  });
  track.replaceChildren(fragment);
  section.querySelectorAll('[data-memory-scroll]').forEach(button => {
    button.addEventListener('click', () => {
      select(currentIndex + Number(button.dataset.memoryScroll));
    });
  });
  playButton.addEventListener('click', () => {
    paused = !paused;
    playWhileFocused = !paused;
    scheduleAutoplay();
  });
  carousel.addEventListener('pointerenter', event => {
    if (event.pointerType !== 'mouse' && event.pointerType !== 'pen') return;
    hovered = true;
    scheduleAutoplay();
  });
  carousel.addEventListener('pointerleave', () => { hovered = false; scheduleAutoplay(); });
  carousel.addEventListener('focusin', event => {
    focusWithin = true;
    if (event.target !== playButton) playWhileFocused = false;
    scheduleAutoplay();
  });
  carousel.addEventListener('focusout', event => {
    if (!carousel.contains(event.relatedTarget)) {
      focusWithin = false;
      playWhileFocused = false;
      scheduleAutoplay();
    }
  });
  document.addEventListener('visibilitychange', scheduleAutoplay);
  motion.addEventListener('change', () => {
    if (motion.matches) paused = true;
    scheduleAutoplay();
  });
  let resizeFrame;
  window.addEventListener('resize', () => {
    cancelAnimationFrame(resizeFrame);
    resizeFrame = requestAnimationFrame(() => { updateArc(); centerThumbnail(false); });
  });
  section.dataset.archiveReady = 'true';
  section.dataset.archiveLayout = 'autoplay-depth-v5';
  section.dataset.memoryCount = String(guildMemories.length);
  select(0, false);
  new MutationObserver(enforceArchiveOrder).observe(guides.parentElement, {childList: true});
  window.addEventListener('load', enforceArchiveOrder, {once: true});
})();
