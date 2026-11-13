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
  const memories = files.map((file, index) => ({src: 'assets/images/' + encodeURIComponent(file), title: caption(file, index), format: file.split('.').pop().toUpperCase(), date: file.match(/^\d{4}-\d{2}-\d{2}/)?.[0] || ''}));
  const section = document.getElementById('guild-memories') || document.createElement('section');
  if (section.dataset.archiveLayout === 'perspective-glass-v11') return;
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
#guild-memories .memory-center-bracket{position:absolute;inset:var(--slot-y) var(--slot-x);width:min(calc(100% - 2 * var(--slot-x)),420px);height:calc(100% - 2 * var(--slot-y));margin:auto;z-index:20;pointer-events:none;user-select:none;mix-blend-mode:screen;border-radius:14px}
#guild-memories .memory-center-bracket img{display:block;width:100%;height:100%;max-width:none;object-fit:fill;border-radius:inherit;pointer-events:none;user-select:none;transform:scale(1.12);transform-origin:center center}
#guild-memories .memory-stack-card{position:absolute;inset:0;display:block;width:min(100%,420px);height:100%;margin:auto;padding:0;border:1px solid rgba(212,175,55,.35);border-radius:14px;background:#111a15;color:#f1e5c5;box-shadow:0 14px 28px #0008;transform-origin:center;transform:translate3d(0,0,-250px) scale(.6);opacity:0;pointer-events:none;z-index:1;backface-visibility:hidden;text-align:left;cursor:pointer;transition:transform .55s cubic-bezier(.22,1,.36,1),opacity .55s cubic-bezier(.22,1,.36,1),filter .55s cubic-bezier(.22,1,.36,1),box-shadow .55s cubic-bezier(.22,1,.36,1);filter:brightness(.55)}
#guild-memories .memory-stack-card.is-active{transform:translate3d(0,0,0) rotateY(0deg) scale(1);z-index:10;opacity:1;pointer-events:auto;filter:brightness(1);border-color:#d4af37;box-shadow:0 0 20px #d4af3733,0 18px 38px #0009}
#guild-memories .memory-stack-card.is-prev{transform:translate3d(-220px,0,-90px) rotateY(18deg) scale(.86);z-index:7;opacity:.85;pointer-events:auto;filter:brightness(.75)}
#guild-memories .memory-stack-card.is-next{transform:translate3d(220px,0,-90px) rotateY(-18deg) scale(.86);z-index:7;opacity:.85;pointer-events:auto;filter:brightness(.75)}
#guild-memories .memory-stack-card.is-prev-2{transform:translate3d(-360px,0,-170px) rotateY(26deg) scale(.74);z-index:4;opacity:.5;pointer-events:auto;filter:brightness(.55)}
#guild-memories .memory-stack-card.is-next-2{transform:translate3d(360px,0,-170px) rotateY(-26deg) scale(.74);z-index:4;opacity:.5;pointer-events:auto;filter:brightness(.55)}
#guild-memories .memory-stack-image-area{position:absolute;inset:0;display:block;width:100%;height:100%;border-radius:13px;overflow:hidden}
#guild-memories .memory-stack-card img{position:absolute;inset:0;display:block;width:100%;height:100%;min-height:0;object-fit:cover;object-position:center;border-radius:13px}
#guild-memories .memory-stack-caption{position:absolute;bottom:12px;left:50%;right:auto;transform:translateX(-50%);z-index:2;display:block;width:65%;max-width:70%;max-height:calc(80% - 44px);overflow:hidden;margin:0;padding:3px 6px;border:1px solid rgba(212,175,55,.3);border-radius:5px;background:rgba(0,0,0,.6);-webkit-backdrop-filter:blur(4px);backdrop-filter:blur(4px);box-shadow:0 3px 8px rgba(0,0,0,.2);text-align:center;pointer-events:none;text-shadow:0 2px 5px rgba(0,0,0,.9)}
#guild-memories .memory-stack-title{display:-webkit-box;-webkit-box-orient:vertical;-webkit-line-clamp:2;overflow:hidden;overflow-wrap:anywhere;color:#e7c76c;font:600 12px/1.15 Georgia,serif;letter-spacing:.1px}
#guild-memories .memory-stack-description{display:block;margin-top:1px;color:#f5f0e5;font:8px/1.2 Arial,sans-serif}
#guild-memories .memory-stack-metadata{display:block;margin-top:1px;color:#e2d2a5;font:9px/1.35 monospace;letter-spacing:.1px;overflow-wrap:anywhere}
#guild-memories .memory-stack-controls{display:flex;justify-content:center;align-items:center;flex-wrap:wrap;gap:10px;margin:18px auto 0}
#guild-memories .memory-glass{display:inline-flex;align-items:center;justify-content:center;min-height:44px;padding:9px 16px;border:1px solid #d4af3766;border-radius:999px;background:rgba(20,28,30,.75);-webkit-backdrop-filter:blur(10px);backdrop-filter:blur(10px);color:#f1e5c5;box-shadow:0 5px 18px #0004;font:12px/1.5 Arial,sans-serif}
#guild-memories .memory-stack-arrow{width:44px;padding:0;color:#d4af37;font-size:16px}
#guild-memories .memory-stack-counter{min-width:82px;font-variant-numeric:tabular-nums;letter-spacing:1px}
#guild-memories .memory-glass:hover{filter:brightness(1.1)}
#guild-memories button:focus-visible,#guild-memories .memory-stack-stage:focus-visible{outline:3px solid #d4af37;outline-offset:4px}
#guild-memories .memory-stack-status{margin:12px 0 0;text-align:center;color:#aca995;font:11px/1.5 Arial,sans-serif}
#guild-memories .memory-announcement{position:absolute;width:1px;height:1px;margin:-1px;padding:0;overflow:hidden;clip-path:inset(50%);white-space:nowrap;border:0}
@media(max-width:760px){#guild-memories{padding:65px 0}#guild-memories>.wrap{padding:0 20px}#guild-memories .archive-heading{flex-direction:column;align-items:flex-start;gap:15px;margin-bottom:28px}#guild-memories .archive-heading h2{font-size:37px}}
@media(max-width:440px){#guild-memories .memory-stack-stage{--slot-y:20px;--slot-x:36px}}
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
    const imageArea = document.createElement('span');imageArea.className = 'memory-stack-image-area';
    const image = document.createElement('img');image.alt = memory.title;image.decoding = 'async';
    const captionBox = document.createElement('span');captionBox.className = 'memory-stack-caption';
    const title = document.createElement('span');title.className = 'memory-stack-title';title.textContent = memory.title;
    const description = document.createElement('span');description.className = 'memory-stack-description';description.textContent = 'Preserved in the Hylian Legends guild archive.';
    const metadata = document.createElement('span');metadata.className = 'memory-stack-metadata';metadata.textContent = memory.format + (memory.date ? ' · Date in filename: ' + memory.date : '');
    captionBox.append(title, description, metadata);imageArea.append(image, captionBox);card.append(imageArea);
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
  section.dataset.archiveReady = 'true';section.dataset.archiveLayout = 'perspective-glass-v11';section.dataset.memoryCount = String(memories.length);
  select(0, false);
  new MutationObserver(enforceArchiveOrder).observe(guides.parentElement, {childList:true});
  window.addEventListener('load', enforceArchiveOrder, {once:true});
})();

(() => {
  'use strict';
  const section = document.getElementById('guild-memories');
  const carousel = section?.querySelector('.archive-carousel');
  if (!carousel || document.getElementById('engraved-guild-lore')) return;
  const style = document.createElement('style');
  style.id = 'engraved-guild-lore-style';
  style.textContent = `
@font-face{font-family:'Triforce';src:url('assets/fonts/Triforce.ttf') format('truetype');font-weight:400;font-style:normal;font-display:swap}
@font-face{font-family:'Cormorant Garamond';src:url('assets/fonts/CormorantGaramond-Regular.ttf') format('truetype');font-weight:400;font-style:normal;font-display:swap}
@font-face{font-family:'Cormorant Garamond';src:url('assets/fonts/CormorantGaramond-Medium.ttf') format('truetype');font-weight:500;font-style:normal;font-display:swap}
@font-face{font-family:'Cormorant Garamond';src:url('assets/fonts/CormorantGaramond-SemiBold.ttf') format('truetype');font-weight:600;font-style:normal;font-display:swap}
@font-face{font-family:'Cormorant Garamond';src:url('assets/fonts/CormorantGaramond-Bold.ttf') format('truetype');font-weight:700;font-style:normal;font-display:swap}
@font-face{font-family:'Cormorant Garamond';src:url('assets/fonts/CormorantGaramond-Italic.ttf') format('truetype');font-weight:400;font-style:italic;font-display:swap}
@font-face{font-family:'Cormorant Garamond';src:url('assets/fonts/CormorantGaramond-MediumItalic.ttf') format('truetype');font-weight:500;font-style:italic;font-display:swap}
@font-face{font-family:'Cormorant Garamond';src:url('assets/fonts/CormorantGaramond-SemiBoldItalic.ttf') format('truetype');font-weight:600;font-style:italic;font-display:swap}
@font-face{font-family:'Cormorant Garamond';src:url('assets/fonts/CormorantGaramond-BoldItalic.ttf') format('truetype');font-weight:700;font-style:italic;font-display:swap}
#guild-memories>.wrap{max-width:1640px}
#guild-memories .archive-heading{max-width:1072px;margin-left:auto;margin-right:auto}
#guild-memories .homepage-showcase{display:flex;flex-direction:row;align-items:center;gap:72px}
#guild-memories .homepage-showcase>.archive-carousel{flex:1 1 1000px;min-width:0}
#guild-memories .engraved-lore{position:relative;flex:0 0 300px;min-width:0;padding:0;margin:0;background:none;border:0;border-radius:0;box-shadow:none;perspective:700px}
#guild-memories .engraved-lore-copy{display:flow-root;margin:0;padding:0;color:#d4af37;font:500 22px/1.65 'Cormorant Garamond',Georgia,serif;letter-spacing:.012em;text-align:center}
#guild-memories .lore-word{display:inline-block;white-space:nowrap}
#guild-memories .lore-letter{display:inline-block;opacity:0;transform-origin:50% 85%;text-shadow:0 -1px 1px #000,0 1px 0 #fff1be66,0 2px 1px #684015,0 3px 3px #000b}
#guild-memories .lore-letter.is-carved{opacity:1}
#guild-memories .lore-term{font-family:'Triforce',Georgia,serif;font-weight:400;letter-spacing:.04em}
#guild-memories .lore-term .lore-letter{color:#fff0bb}
#guild-memories .lore-term.is-awakened .lore-letter{text-shadow:0 -1px 1px #000,0 1px 0 #fff5cc77,0 2px 1px #684015,0 0 6px #e6c66755}
@supports ((background-clip:text) or (-webkit-background-clip:text)){
#guild-memories .lore-letter{background-image:radial-gradient(circle,#fff4cb40 .3px,transparent .7px),linear-gradient(180deg,#fff3c6 0%,#e6c667 28%,#d4af37 48%,#a57425 75%,#78501f 100%);background-size:3px 3px,100% 100%;background-clip:text;-webkit-background-clip:text;color:transparent;-webkit-text-fill-color:transparent}
#guild-memories .lore-term .lore-letter{background-image:linear-gradient(180deg,#fffbea,#fff0b5 45%,#e6c667 75%,#b58835);background-size:100% 100%}}
#guild-memories .engraved-lore-copy>.lore-drop-cap{float:left;position:relative;height:108px;margin:0 2px 0 0;padding:0;font-family:'Triforce',Georgia,serif;font-size:108px;line-height:1;letter-spacing:0;filter:drop-shadow(0 0 8px #e6c66766);text-shadow:0 -1px 1px #000,0 2px 0 #fff0ab88,0 3px 2px #684015}
#guild-memories .lore-ornament{display:flex;align-items:center;justify-content:center;gap:14px;width:90%;height:18px;margin:0 auto 22px;pointer-events:none}
#guild-memories .lore-ornament.is-bottom{margin:22px auto 0}
#guild-memories .lore-ornament::before,#guild-memories .lore-ornament::after{content:'';flex:1;height:3px;background:linear-gradient(90deg,transparent,#d4af3780,#e6c667b3);clip-path:polygon(0 50%,85% 0,100% 50%,85% 100%)}
#guild-memories .lore-ornament::after{transform:scaleX(-1)}
#guild-memories .lore-ornament>span{position:relative;width:7px;height:7px;transform:rotate(45deg);background:#e6c667;border:1px solid #fff0b980;box-shadow:0 0 8px #d4af3744}
#guild-memories .lore-ornament>span::after{content:'';position:absolute;inset:-4px;border:1px solid #d4af3755}
#guild-memories .lore-readable{position:absolute;width:1px;height:1px;margin:-1px;padding:0;overflow:hidden;clip-path:inset(50%);white-space:nowrap;border:0}
#guild-memories .lore-particles{position:absolute;inset:0;display:block;width:100%;height:100%;pointer-events:none}
@media(max-width:1439px){#guild-memories .homepage-showcase{flex-direction:column;gap:48px}#guild-memories .homepage-showcase>.archive-carousel{flex:0 1 auto;width:100%}#guild-memories .engraved-lore{flex:0 1 auto;width:100%;max-width:460px}#guild-memories>.wrap{max-width:1120px}}
@media(prefers-reduced-motion:reduce){#guild-memories .lore-letter{opacity:1}#guild-memories .lore-particles{display:none}}
`;
  document.head.append(style);
  const wrapper = document.createElement('div');wrapper.className = 'homepage-showcase';
  carousel.before(wrapper);
  const lore = document.createElement('aside');
  lore.id = 'engraved-guild-lore';lore.className = 'engraved-lore';
  lore.dataset.ceremonial = 'true';lore.setAttribute('aria-label', 'The legend of the Sacred Realm');
  const text = 'In a forgotten temple, a sealed door awaits, locked by the power of three Sacred Stones. Beyond this threshold lies a smaller room, where an ancient, rusty sword stands firmly in a pedestal. Legends whisper that whoever dares to pull the sword from its resting place will be transported to the Sacred Realm, where the three golden triangles unite to form the legendary Triforce. As guardians of mystical power, we stand united to protect the Triforce and the wishes it grants.';
  const readable = document.createElement('p');readable.className = 'lore-readable';readable.textContent = text;
  const visual = document.createElement('p');visual.className = 'engraved-lore-copy';visual.setAttribute('aria-hidden', 'true');
  const letters = [], termEnds = new Map(), terms = [];
  for (const part of text.split(/(Sacred Stones|Sacred Realm|Triforce)/g)) {
    const group = document.createElement('span');
    const sacred = ['Sacred Stones', 'Sacred Realm', 'Triforce'].includes(part);
    if (sacred) {group.className = 'lore-term';terms.push(group);}
    for (const word of part.split(/(\s+)/)) {
      if (/^\s+$/.test(word)) {group.append(document.createTextNode(word));continue;}
      const unit = document.createElement('span');unit.className = 'lore-word';
      for (const letter of word) {
        const span = document.createElement('span');span.className = 'lore-letter';span.textContent = letter;
        letters.push(span);unit.append(span);
      }
      group.append(unit);
    }
    visual.append(group);
    if (sacred) termEnds.set(letters.length, group);
  }
  letters[0].classList.add('lore-drop-cap');visual.prepend(letters[0]);
  function ornament(bottom = false) {
    const divider = document.createElement('div');divider.className = 'lore-ornament' + (bottom ? ' is-bottom' : '');
    divider.setAttribute('aria-hidden', 'true');divider.append(document.createElement('span'));return divider;
  }
  const canvas = document.createElement('canvas');canvas.className = 'lore-particles';canvas.setAttribute('aria-hidden', 'true');
  lore.append(readable, ornament(), visual, ornament(true), canvas);wrapper.append(carousel, lore);
  const ctx = canvas.getContext('2d');
  const motion = matchMedia('(prefers-reduced-motion: reduce)');
  const animations = new Set();
  const impacts = new WeakMap();
  let positions = [], particles = [], index = 0, frame = 0, measureFrame = 0;
  let last = 0, previous = 0, width = 0, height = 0, visible = false, ready = false, done = false, disposed = false;
  let observer = null, resizeObserver = null;
  function clearParticles() {particles.length = 0;if (ctx) ctx.clearRect(0, 0, width, height);}
  function pause() {cancelAnimationFrame(frame);frame = 0;last = 0;previous = 0;clearParticles();}
  function schedule() {
    if (!disposed && ready && visible && !document.hidden && !motion.matches && (!done || particles.length) && !frame) frame = requestAnimationFrame(tick);
  }
  function measure() {
    measureFrame = 0;if (disposed) return;
    width = lore.clientWidth;height = lore.clientHeight;
    positions = letters.map(letter => {
      let x = 0, y = 0, node = letter;
      while (node && node !== lore) {x += node.offsetLeft;y += node.offsetTop;node = node.offsetParent;}
      return {x:x + letter.offsetWidth / 2,y:y + letter.offsetHeight * .65};
    });
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = Math.max(1, Math.ceil(width * dpr));canvas.height = Math.max(1, Math.ceil(height * dpr));
    if (ctx) ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    clearParticles();ready = true;last = 0;previous = 0;schedule();
  }
  function queueMeasure() {
    if (disposed || (done && !particles.length)) return;
    ready = false;pause();if (!measureFrame) measureFrame = requestAnimationFrame(measure);
  }
  function strike(letter) {
    const target = letter.closest('.lore-word') || letter;
    if (!target.animate) return;
    impacts.get(target)?.cancel();
    target.style.willChange = 'transform, opacity';
    const animation = target.animate([{transform:'translate3d(1.8px,-1.2px,4px) rotateX(16deg)',opacity:1},{transform:'translate3d(-1.1px,.6px,0) rotateX(-6deg)',opacity:.88},{transform:'translate3d(.4px,-.2px,0)',opacity:1},{transform:'none',opacity:1}], {duration:150,easing:'cubic-bezier(.16,1,.3,1)'});
    animations.add(animation);impacts.set(target, animation);
    const clean = () => {animations.delete(animation);if (impacts.get(target) === animation) {impacts.delete(target);target.style.willChange = '';}};
    animation.onfinish = clean;animation.oncancel = clean;
  }
  function spawn(position) {
    if (!ctx || !position) return;
    for (let i = 0; i < 3 && particles.length < 15; i++) particles.push({x:position.x,y:position.y,vx:(Math.random() - .5) * (i === 2 ? 65 : 130),vy:i === 2 ? -8 : -55 - Math.random() * 45,age:0,life:i === 2 ? .8 : .55,dust:i === 2,size:i === 2 ? 2 : 3});
  }
  function paint(dt) {
    if (!ctx) return;
    ctx.clearRect(0, 0, width, height);
    for (let i = particles.length - 1; i >= 0; i--) {
      const p = particles[i];p.age += dt;
      if (p.age >= p.life) {particles.splice(i, 1);continue;}
      p.vy += 150 * dt;p.x += p.vx * dt;p.y += p.vy * dt;
      const alpha = 1 - p.age / p.life;
      if (!p.dust) {ctx.globalAlpha = alpha * .18;ctx.fillStyle = '#ffd45a';ctx.fillRect(p.x - p.size, p.y - p.size, p.size * 3, p.size * 3);}
      ctx.globalAlpha = alpha;ctx.fillStyle = p.dust ? '#dfc994' : '#ffe79a';
      ctx.fillRect(p.x, p.y, p.size, p.size);
      if (!p.dust) {ctx.fillStyle = '#fffbea';ctx.fillRect(p.x + .75, p.y + .75, 1.5, 1.5);}
    }
    ctx.globalAlpha = 1;
  }
  function finish() {
    done = true;pause();cancelAnimationFrame(measureFrame);measureFrame = 0;
    letters.forEach(letter => letter.classList.add('is-carved'));terms.forEach(term => term.classList.add('is-awakened'));
    for (const animation of animations) animation.cancel();
    observer?.disconnect();resizeObserver?.disconnect();
  }
  function tick(now) {
    frame = 0;
    if (disposed || !ready || !visible || document.hidden || motion.matches) return;
    const dt = previous ? Math.min((now - previous) / 1000, .05) : 0;previous = now;
    if (!done && (!last || now - last >= 55)) {
      last = last ? now - ((now - last) % 55) : now;const letter = letters[index];letter.classList.add('is-carved');strike(letter);index++;
      const term = termEnds.get(index);if (term) term.classList.add('is-awakened');
      if (index % 3 === 0) spawn(positions[index - 1]);
      if (index === letters.length) {done = true;observer?.disconnect();resizeObserver?.disconnect();}
    }
    paint(dt);schedule();
  }
  observer = 'IntersectionObserver' in window ? new IntersectionObserver(entries => {
    visible = entries[0].isIntersecting;if (visible) schedule();else pause();
  }, {threshold:.15}) : null;
  if ('ResizeObserver' in window) {resizeObserver = new ResizeObserver(queueMeasure);resizeObserver.observe(lore);}
  window.addEventListener('resize', queueMeasure, {passive:true});
  document.fonts?.addEventListener('loadingdone', queueMeasure);
  document.addEventListener('visibilitychange', () => {if (document.hidden) pause();else schedule();});
  motion.addEventListener('change', () => {if (motion.matches) finish();});
  window.addEventListener('pagehide', () => {finish();disposed = true;window.removeEventListener('resize', queueMeasure);document.fonts?.removeEventListener('loadingdone', queueMeasure);}, {once:true});
  if (motion.matches || !observer) finish();else {observer.observe(lore);queueMeasure();}
})();
