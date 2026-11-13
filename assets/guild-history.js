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
  const font = document.createElement('link');
  font.rel = 'stylesheet';
  font.href = 'https://fonts.googleapis.com/css2?family=Cinzel:wght@400;600&display=swap';
  document.head.append(font);
  const style = document.createElement('style');
  style.id = 'engraved-guild-lore-style';
  style.textContent = `
#guild-memories>.wrap{max-width:1640px}
#guild-memories .archive-heading{max-width:1072px;margin-left:auto;margin-right:auto}
#guild-memories .homepage-showcase{display:flex;flex-direction:row;align-items:center;gap:72px}
#guild-memories .homepage-showcase>.archive-carousel{flex:1 1 1000px;min-width:0}
#guild-memories .engraved-lore{position:relative;flex:0 0 300px;min-width:0;padding:0;margin:0;background:none;border:0;border-radius:0;box-shadow:none;perspective:700px}
#guild-memories .engraved-lore-copy{margin:0;padding:0;color:#d4af37;font:400 19px/1.8 'Cinzel',Georgia,serif;letter-spacing:.2px;text-align:left;text-shadow:0 -2px 1px #000,1px -1px 2px #000,0 1px 0 rgba(230,198,103,.28)}
#guild-memories .lore-term{color:#e6c667;font-weight:600;text-shadow:0 -2px 1px #000,0 1px 0 #ffe7a655,0 0 9px #e6c66755}
#guild-memories .lore-word{display:inline-block;white-space:nowrap}
#guild-memories .lore-letter{display:inline-block;opacity:0;transform-origin:50% 85%}
#guild-memories .lore-letter.is-carved{opacity:1}
#guild-memories .lore-readable{position:absolute;width:1px;height:1px;margin:-1px;padding:0;overflow:hidden;clip-path:inset(50%);white-space:nowrap;border:0}
#guild-memories .lore-debris{position:absolute;inset:0;pointer-events:none;overflow:visible}
#guild-memories .lore-speck{position:absolute;display:block;width:2px;height:2px;border-radius:50%;background:#ffe39a;box-shadow:0 0 5px #efc65c;pointer-events:none}
#guild-memories .lore-speck.is-dust{width:1px;height:1px;background:#a88c55;box-shadow:none}
@media(max-width:1439px){#guild-memories .homepage-showcase{flex-direction:column;gap:48px}#guild-memories .homepage-showcase>.archive-carousel{flex:0 1 auto;width:100%}#guild-memories .engraved-lore{flex:0 1 auto;width:100%;max-width:460px}#guild-memories>.wrap{max-width:1120px}}
@media(prefers-reduced-motion:reduce){#guild-memories .lore-letter{opacity:1}#guild-memories .lore-debris{display:none}}
`;
  document.head.append(style);
  const wrapper = document.createElement('div');
  wrapper.className = 'homepage-showcase';
  carousel.before(wrapper);
  const lore = document.createElement('aside');
  lore.id = 'engraved-guild-lore';
  lore.className = 'engraved-lore';
  lore.setAttribute('aria-label', 'The legend of the Sacred Realm');
  const text = 'In a forgotten temple, a sealed door awaits, locked by the power of three Sacred Stones. Beyond this threshold lies a smaller room, where an ancient, rusty sword stands firmly in a pedestal. Legends whisper that whoever dares to pull the sword from its resting place will be transported to the Sacred Realm, where the three golden triangles unite to form the legendary Triforce. As guardians of mystical power, we stand united to protect the Triforce and the wishes it grants.';
  const readable = document.createElement('p');
  readable.className = 'lore-readable';
  readable.textContent = text;
  const visual = document.createElement('p');
  visual.className = 'engraved-lore-copy';
  visual.setAttribute('aria-hidden', 'true');
  const letters = [];
  for (const part of text.split(/(Sacred Stones|Sacred Realm|Triforce)/g)) {
    const group = document.createElement('span');
    if (['Sacred Stones', 'Sacred Realm', 'Triforce'].includes(part)) group.className = 'lore-term';
    for (const word of part.split(/(\s+)/)) {
      if (/^\s+$/.test(word)) { group.append(document.createTextNode(word)); continue; }
      const unit = document.createElement('span');
      unit.className = 'lore-word';
      for (const letter of word) {
        const span = document.createElement('span');
        span.className = 'lore-letter';span.textContent = letter;
        letters.push(span);unit.append(span);
      }
      group.append(unit);
    }
    visual.append(group);
  }
  const debris = document.createElement('span');
  debris.className = 'lore-debris';debris.setAttribute('aria-hidden', 'true');
  lore.append(readable, visual, debris);wrapper.append(carousel, lore);
  const motion = matchMedia('(prefers-reduced-motion: reduce)');
  let index = 0, frame = 0, last = 0, visible = false, finished = false;
  const animations = new Set();
  function animate(node, keys, options, remove = false) {
    const animation = node.animate(keys, options);animations.add(animation);
    const clean = () => { animations.delete(animation);if (remove) node.remove(); };
    animation.onfinish = clean;animation.oncancel = clean;
  }
  function strike(letter) {
    animate(letter, [{transform:'translate3d(.6px,-.5px,3px) rotateX(12deg)'},{transform:'translate3d(-.4px,.3px,0) rotateX(-4deg)'},{transform:'none'}], {duration:120,easing:'ease-out'});
    const r = letter.getBoundingClientRect(), origin = debris.getBoundingClientRect();
    for (let i = 0; i < 3; i++) {
      const speck = document.createElement('i');
      speck.className = 'lore-speck' + (i === 2 ? ' is-dust' : '');
      speck.style.left = (r.left + r.width / 2 - origin.left) + 'px';
      speck.style.top = (r.top + r.height * .65 - origin.top) + 'px';
      debris.append(speck);
      const dx = (Math.random() - .5) * 24;
      animate(speck, [{opacity:.85,transform:'translate(0,0)'},{opacity:.45,transform:'translate(' + dx * .5 + 'px,' + (i === 2 ? 5 : -7) + 'px)'},{opacity:0,transform:'translate(' + dx + 'px,' + (i === 2 ? 30 : 15) + 'px)'}], {duration:i === 2 ? 650 : 360,easing:'ease-out'}, true);
    }
  }
  function finish() {
    finished = true;cancelAnimationFrame(frame);frame = 0;
    letters.forEach(letter => letter.classList.add('is-carved'));
    for (const animation of animations) animation.cancel();
    debris.replaceChildren();observer?.disconnect();
  }
  function tick(now) {
    frame = 0;
    if (finished || !visible || document.hidden) return;
    if (!last || now - last >= 38) {
      last = now;const letter = letters[index++];
      letter.classList.add('is-carved');strike(letter);
      if (index === letters.length) { finished = true;observer?.disconnect();return; }
    }
    frame = requestAnimationFrame(tick);
  }
  function resume() { if (!finished && visible && !document.hidden && !frame) {last = 0;frame = requestAnimationFrame(tick);} }
  const observer = 'IntersectionObserver' in window ? new IntersectionObserver(entries => {
    visible = entries[0].isIntersecting;
    if (!visible) {cancelAnimationFrame(frame);frame = 0;} else resume();
  }, {threshold:.15}) : null;
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) {cancelAnimationFrame(frame);frame = 0;} else resume();
  });
  motion.addEventListener('change', () => {if (motion.matches) finish();});
  window.addEventListener('pagehide', finish, {once:true});
  if (motion.matches || !observer || !Element.prototype.animate) finish();else observer.observe(lore);
})();
