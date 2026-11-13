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
  const memories = files.map((file, index) => ({src: 'assets/images/' + encodeURIComponent(file), title: caption(file, index)}));
  const section = document.getElementById('guild-memories') || document.createElement('section');
  if (section.dataset.archiveLayout === 'perspective-bracket-v9') return;
  document.getElementById('guild-history')?.remove();
  function enforceArchiveOrder() { if (guides.parentElement && guides.nextElementSibling !== section) guides.after(section); }
  section.id = 'guild-memories';
  section.className = 'guild-memories-section';
  section.setAttribute('aria-labelledby', 'guild-memories-heading');
  section.removeAttribute('aria-roledescription');
  section.innerHTML = `<div class="wrap"><div class="section-head archive-heading"><div><div class="micro">THE ARCHIVES</div><h2 id="guild-memories-heading">GUILD <em>history</em></h2></div><p>Shared adventures, milestones, and memories from our guild archive.</p></div><div class="archive-carousel" role="region" aria-roledescription="carousel" aria-label="Guild archive memories"><div class="memory-stack-stage" id="memory-stack-stage" tabindex="0" aria-label="Memory deck. Use Left and Right arrows, Home, or End."><div class="memory-stack-deck"></div><div class="memory-center-bracket" aria-hidden="true"><img src="assets/card-frame.jpeg" alt="" decoding="async" draggable="false"></div></div><div class="memory-stack-controls"><button type="button" class="memory-glass memory-stack-arrow" data-step="-1" aria-label="Previous guild memory" aria-controls="memory-stack-stage">&#10094;</button><span class="memory-glass memory-stack-counter" aria-label="Current memory"></span><button type="button" class="memory-glass memory-stack-arrow" data-step="1" aria-label="Next guild memory" aria-controls="memory-stack-stage">&#10095;</button><button type="button" class="memory-glass" id="memory-autoplay-toggle" aria-controls="memory-stack-stage">Pause slideshow</button></div><p id="memory-playback-status" class="memory-stack-status"></p><p class="memory-announcement" role="status" aria-live="polite" aria-atomic="true"></p></div></div>`;
  enforceArchiveOrder();
  const style = document.getElementById('guild-archive-layout-style') || document.createElement('style');
  style.id = 'guild-archive-layout-style';
  style.textContent = `
#guild-memories{--hylian-gold:#d4af37;padding:95px 0;min-width:0;background:var(--bg,#0b1110);color:var(--cream,#f1e5c5);font-family:Georgia,serif;overflow:visible}
#guild-memories,#guild-memories *,#guild-memories *::before,#guild-memories *::after{box-sizing:border-box}
#guild-memories>.wrap{width:100%;max-width:1120px;margin:auto;padding:0 24px;overflow:visible}
#guild-memories .archive-heading{display:flex;justify-content:space-between;align-items:center;gap:40px;margin:0 0 48px;text-align:left}
#guild-memories .archive-heading .micro{color:var(--gold,#d4af37);font:10px/1.6 monospace;letter-spacing:4px}
#guild-memories .archive-heading h2{margin:18px 0 0;font:48px/1.15 Georgia,serif;color:var(--cream,#f1e5c5)}
#guild-memories .archive-heading h2 em{color:var(--gold,#d4af37);font-weight:normal}
#guild-memories .archive-heading>p{max-width:350px;color:var(--muted,#aca995);font:14px/1.7 Arial,sans-serif}
#guild-memories .archive-carousel{min-width:0;overflow:visible}
#guild-memories .memory-stack-stage{--slot-x:48px;--slot-y:24px;position:relative;max-width:720px;width:100%;height:clamp(390px,52vw,500px);margin:0 auto;perspective:1100px;transform-style:preserve-3d;outline-offset:8px;overflow:visible}
#guild-memories .memory-stack-deck{position:absolute;inset:var(--slot-y) var(--slot-x);transform-style:preserve-3d;overflow:visible}
#guild-memories .memory-center-bracket{position:absolute;inset:calc(var(--slot-y) - 8px) calc(var(--slot-x) - 8px);width:calc(min(100% - 2 * var(--slot-x),420px) + 16px);height:calc(100% - 2 * var(--slot-y) + 16px);margin:auto;z-index:20;pointer-events:none;user-select:none;mix-blend-mode:screen;border-radius:14px}
#guild-memories .memory-center-bracket img{display:block;width:100%;height:100%;max-width:none;object-fit:fill;border-radius:inherit;pointer-events:none;user-select:none}
#guild-memories .memory-stack-card{position:absolute;inset:0;display:grid;grid-template-rows:minmax(0,1fr) auto;width:min(100%,420px);height:100%;margin:auto;padding:0;border:1px solid rgba(212,175,55,.35);border-radius:14px;background:#111a15;color:#f1e5c5;box-shadow:0 14px 28px #0008;transform-origin:center;transform:translate3d(0,0,-250px) scale(.6);opacity:0;pointer-events:none;z-index:1;backface-visibility:hidden;text-align:left;cursor:pointer;transition:transform .55s cubic-bezier(.22,1,.36,1),opacity .55s cubic-bezier(.22,1,.36,1),filter .55s cubic-bezier(.22,1,.36,1),box-shadow .55s cubic-bezier(.22,1,.36,1);filter:brightness(.55)}
#guild-memories .memory-stack-card.is-active{transform:translate3d(0,0,0) rotateY(0deg) scale(1);z-index:10;opacity:1;pointer-events:auto;filter:brightness(1);border-color:#d4af37;box-shadow:0 0 20px #d4af3733,0 18px 38px #0009}
#guild-memories .memory-stack-card.is-prev{transform:translate3d(-220px,0,-90px) rotateY(18deg) scale(.86);z-index:7;opacity:.85;pointer-events:auto;filter:brightness(.75)}
#guild-memories .memory-stack-card.is-next{transform:translate3d(220px,0,-90px) rotateY(-18deg) scale(.86);z-index:7;opacity:.85;pointer-events:auto;filter:brightness(.75)}
#guild-memories .memory-stack-card.is-prev-2{transform:translate3d(-360px,0,-170px) rotateY(26deg) scale(.74);z-index:4;opacity:.5;pointer-events:auto;filter:brightness(.55)}
#guild-memories .memory-stack-card.is-next-2{transform:translate3d(360px,0,-170px) rotateY(-26deg) scale(.74);z-index:4;opacity:.5;pointer-events:auto;filter:brightness(.55)}
#guild-memories .memory-stack-card img{display:block;width:100%;height:100%;min-height:0;object-fit:contain;background:#090d0b;border-radius:13px 13px 0 0}
#guild-memories .memory-stack-caption{display:block;padding:16px 18px;border-top:1px solid #d4af3733;border-radius:0 0 13px 13px;background:linear-gradient(145deg,#20251e,#111712)}
#guild-memories .memory-stack-title{display:-webkit-box;-webkit-box-orient:vertical;-webkit-line-clamp:3;overflow:hidden;overflow-wrap:anywhere;color:#d4af37;font:18px/1.3 Georgia,serif}
#guild-memories .memory-stack-description{display:block;margin-top:7px;color:#aca995;font:11px/1.5 Arial,sans-serif}
#guild-memories .memory-stack-controls{display:flex;justify-content:center;align-items:center;flex-wrap:wrap;gap:10px;margin:18px auto 0}
#guild-memories .memory-glass{display:inline-flex;align-items:center;justify-content:center;min-height:44px;padding:9px 16px;border:1px solid #d4af3766;border-radius:999px;background:rgba(20,28,30,.75);-webkit-backdrop-filter:blur(10px);backdrop-filter:blur(10px);color:#f1e5c5;box-shadow:0 5px 18px #0004;font:12px/1.5 Arial,sans-serif}
#guild-memories .memory-stack-arrow{width:44px;padding:0;color:#d4af37;font-size:16px}
#guild-memories .memory-stack-counter{min-width:82px;font-variant-numeric:tabular-nums;letter-spacing:1px}
#guild-memories .memory-glass:hover{filter:brightness(1.1)}
#guild-memories button:focus-visible,#guild-memories .memory-stack-stage:focus-visible{outline:3px solid #d4af37;outline-offset:4px}
#guild-memories .memory-stack-status{margin:12px 0 0;text-align:center;color:#aca995;font:11px/1.5 Arial,sans-serif}
#guild-memories .memory-announcement{position:absolute;width:1px;height:1px;margin:-1px;padding:0;overflow:hidden;clip-path:inset(50%);white-space:nowrap;border:0}
@media(max-width:760px){#guild-memories{padding:65px 0}#guild-memories>.wrap{padding:0 20px}#guild-memories .archive-heading{flex-direction:column;align-items:flex-start;gap:15px;margin-bottom:28px}#guild-memories .archive-heading h2{font-size:37px}}
@media(max-width:440px){#guild-memories .memory-stack-stage{--slot-y:20px;--slot-x:36px}#guild-memories .memory-stack-caption{padding:12px}#guild-memories .memory-stack-title{font-size:16px}#guild-memories .memory-stack-description{font-size:10px}}
@media(prefers-reduced-motion:reduce){#guild-memories .memory-stack-card{transition:none}}
`;
  if (!style.isConnected) document.head.append(style);
  const carousel = section.querySelector('.archive-carousel');
  const stage = section.querySelector('.memory-stack-stage');
  const deck = section.querySelector('.memory-stack-deck');
  const counter = section.querySelector('.memory-stack-counter');
  const announcement = section.querySelector('.memory-announcement');
  const playButton = section.querySelector('#memory-autoplay-toggle');
  const playbackStatus = section.querySelector('#memory-playback-status');
  const motion = matchMedia('(prefers-reduced-motion: reduce)');
  const cards = [];
  let currentIndex = 0, timer;
  let paused = motion.matches, hovered = false, focusWithin = false, playWhileFocused = false;
  function canAutoplay() { return !paused && !hovered && (!focusWithin || playWhileFocused) && !document.hidden && section.isConnected; }
  function scheduleAutoplay() {
    clearTimeout(timer);
    playButton.textContent = paused ? 'Play slideshow' : 'Pause slideshow';
    playButton.setAttribute('aria-label', paused ? 'Start automatic memory slideshow' : 'Pause automatic memory slideshow');
    playbackStatus.textContent = paused ? 'Auto-play paused' : canAutoplay() ? 'Auto-play · Every 5 seconds' : 'Auto-play paused during interaction or while tab is hidden';
    if (canAutoplay()) timer = setTimeout(() => { if (canAutoplay()) select(currentIndex + 1, false); else scheduleAutoplay(); }, 5000);
  }
  function select(index, announce = true) {
    currentIndex = (index % memories.length + memories.length) % memories.length;
    const wrap = offset => (currentIndex + memories.length + offset) % memories.length;
    const previous = wrap(-1), next = wrap(1), previous2 = wrap(-2), next2 = wrap(2);
    const focusedCard = cards.includes(document.activeElement);
    cards.forEach((card, i) => {
      const active = i === currentIndex, visible = active || i === previous || i === next || i === previous2 || i === next2;
      card.classList.toggle('is-active', active);
      card.classList.toggle('is-prev', i === previous);
      card.classList.toggle('is-next', i === next);
      card.classList.toggle('is-prev-2', i === previous2);
      card.classList.toggle('is-next-2', i === next2);
      card.tabIndex = active ? 0 : -1;
      card.setAttribute('aria-hidden', String(!visible));
      card.setAttribute('aria-current', String(active));
      const action = active ? 'Current memory ' : i === previous ? 'Show previous memory ' : i === next ? 'Show next memory ' : i === previous2 ? 'Show memory two positions back ' : i === next2 ? 'Show memory two positions ahead ' : 'Memory ';
      card.setAttribute('aria-label', action + (i + 1) + ' of ' + memories.length + ': ' + memories[i].title);
      if (visible && !card.querySelector('img').hasAttribute('src')) card.querySelector('img').src = memories[i].src;
    });
    counter.textContent = (currentIndex + 1) + ' / ' + memories.length;
    counter.setAttribute('aria-label', 'Memory ' + (currentIndex + 1) + ' of ' + memories.length);
    if (announce) announcement.textContent = counter.textContent + ': ' + memories[currentIndex].title;
    if (focusedCard) cards[currentIndex].focus({preventScroll:true});
    scheduleAutoplay();
  }
  memories.forEach((memory, index) => {
    const card = document.createElement('button');
    card.type = 'button';card.className = 'memory-stack-card';
    const image = document.createElement('img');image.alt = memory.title;image.decoding = 'async';
    const captionBox = document.createElement('span');captionBox.className = 'memory-stack-caption';
    const title = document.createElement('span');title.className = 'memory-stack-title';title.textContent = memory.title;
    const description = document.createElement('span');description.className = 'memory-stack-description';description.textContent = 'Preserved in the Hylian Legends guild archive.';
    captionBox.append(title, description);card.append(image, captionBox);
    card.addEventListener('click', () => { if (index !== currentIndex) { select(index); cards[currentIndex].focus({preventScroll:true}); } });
    cards.push(card);deck.append(card);
  });
  section.querySelectorAll('[data-step]').forEach(button => button.addEventListener('click', () => select(currentIndex + Number(button.dataset.step))));
  carousel.addEventListener('keydown', event => {
    if (event.altKey || event.ctrlKey || event.metaKey || event.shiftKey) return;
    let next;
    switch (event.key) { case 'ArrowLeft': next = currentIndex - 1; break; case 'ArrowRight': next = currentIndex + 1; break; case 'Home': next = 0; break; case 'End': next = memories.length - 1; break; default: return; }
    event.preventDefault();select(next);
  });
  playButton.addEventListener('click', () => { paused = !paused;playWhileFocused = !paused;scheduleAutoplay(); });
  carousel.addEventListener('pointerenter', event => { if (event.pointerType === 'mouse' || event.pointerType === 'pen') { hovered = true;scheduleAutoplay(); } });
  carousel.addEventListener('pointerleave', () => { hovered = false;scheduleAutoplay(); });
  carousel.addEventListener('focusin', event => { focusWithin = true;if (event.target !== playButton) playWhileFocused = false;scheduleAutoplay(); });
  carousel.addEventListener('focusout', event => { if (!carousel.contains(event.relatedTarget)) { focusWithin = false;playWhileFocused = false;scheduleAutoplay(); } });
  document.addEventListener('visibilitychange', scheduleAutoplay);
  motion.addEventListener('change', () => { if (motion.matches) paused = true;scheduleAutoplay(); });
  window.addEventListener('pagehide', () => clearTimeout(timer));
  window.addEventListener('pageshow', scheduleAutoplay);
  section.dataset.archiveReady = 'true';section.dataset.archiveLayout = 'perspective-bracket-v9';section.dataset.memoryCount = String(memories.length);
  select(0, false);
  new MutationObserver(enforceArchiveOrder).observe(guides.parentElement, {childList:true});
  window.addEventListener('load', enforceArchiveOrder, {once:true});
})();
