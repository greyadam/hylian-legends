(() => {
  const guides = document.getElementById('guides');
  if (!guides || document.getElementById('guild-history')) return;
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
  const style = document.createElement('style');
  style.textContent = `
#guild-history .history-carousel{position:relative;border:1px solid #d4af37;background:var(--panel,#131b17);border-radius:12px;overflow:hidden}
#guild-history .history-stage{position:relative;display:grid;background:#080d0b}
#guild-history .carousel-slide{grid-area:1/1;margin:0;min-width:0;opacity:0;visibility:hidden;pointer-events:none;transition:opacity .65s ease,visibility 0s linear .65s}
#guild-history .carousel-slide.is-active{opacity:1;visibility:visible;pointer-events:auto;transition:opacity .65s ease}
#guild-history .carousel-slide img{display:block;width:100%;height:clamp(240px,48vw,580px);object-fit:cover;object-position:center;background:#080d0b}
#guild-history .carousel-slide figcaption{color:#d4af37;text-align:center;padding:18px 64px;min-height:80px;font:18px/1.5 Georgia,serif;overflow-wrap:anywhere}
#guild-history .history-arrow{position:absolute;top:40%;transform:translateY(-50%);z-index:2;width:44px;height:52px;border:1px solid #d4af37;border-radius:8px;background:#0b1110dd;color:#d4af37;font-size:28px;line-height:1}
#guild-history .history-prev{left:12px}#guild-history .history-next{right:12px}
#guild-history .history-arrow:hover{background:#d4af37;color:#0b1110}
#guild-history .history-toolbar{display:flex;align-items:center;padding:14px 130px 14px 16px;min-height:68px;border-top:1px solid #d4af3740}
#guild-history .carousel-counter{position:absolute;bottom:16px;right:16px;z-index:3;color:#d4af37;border:1px solid #d4af37;border-radius:8px;background:#0b1110ee;padding:8px 14px;font:14px/1.4 monospace;font-variant-numeric:tabular-nums;white-space:nowrap;pointer-events:none}
#guild-history .history-pause{background:transparent;color:#d4af37;border:1px solid #d4af37;border-radius:20px;padding:6px 16px}
#guild-history button:focus-visible{outline:2px solid #d4af37;outline-offset:3px}
@media(max-width:600px){#guild-history .carousel-slide figcaption{padding:16px 24px;font-size:16px;min-height:96px}#guild-history .history-arrow{width:36px;height:44px;font-size:24px}#guild-history .history-prev{left:6px}#guild-history .history-next{right:6px}#guild-history .history-toolbar{padding-left:10px;padding-right:112px}#guild-history .history-pause{padding:6px 10px;font-size:12px}#guild-history .carousel-counter{right:10px;padding:8px 10px}}
@media(prefers-reduced-motion:reduce){#guild-history .carousel-slide{transition:none}}
`;
  document.head.append(style);
  const section = document.createElement('section');
  section.id = 'guild-history';
  section.setAttribute('aria-labelledby', 'guild-history-title');
  section.innerHTML = `<div class="wrap"><div class="section-head"><div><div class="micro">The Archives</div><h2 id="guild-history-title">GUILD <em>history</em></h2></div><p>Shared adventures, milestones, and memories from our guild archive.</p></div><div class="history-carousel" role="region" aria-roledescription="carousel" aria-label="Guild History memories"><div class="history-stage"><button class="history-arrow history-prev" type="button" aria-label="Previous guild memory">&#10094;</button><button class="history-arrow history-next" type="button" aria-label="Next guild memory">&#10095;</button></div><div class="history-toolbar"><button class="history-pause" type="button" aria-pressed="false">Pause slideshow</button></div><div class="carousel-counter"><span id="current-slide">1</span> / <span id="total-slides">47</span></div><span class="history-announcement" aria-live="polite" aria-atomic="true" style="position:absolute;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;clip-path:inset(50%);white-space:nowrap"></span></div></div>`;
  guides.after(section);
  const stage = section.querySelector('.history-stage');
  const currentSlide = section.querySelector('#current-slide');
  const totalSlides = section.querySelector('#total-slides');
  const pause = section.querySelector('.history-pause');
  const announcement = section.querySelector('.history-announcement');
  const slides = [];
  totalSlides.textContent = String(files.length);
  files.forEach((file, i) => {
    const title = caption(file, i);
    const slide = document.createElement('figure');
    slide.className = 'carousel-slide' + (i === 0 ? ' is-active' : '');
    slide.setAttribute('role', 'group');
    slide.setAttribute('aria-roledescription', 'slide');
    slide.setAttribute('aria-label', (i + 1) + ' of ' + files.length);
    slide.setAttribute('aria-hidden', String(i !== 0));
    const image = document.createElement('img');
    image.dataset.src = 'assets/images/' + encodeURIComponent(file);
    image.alt = title;
    image.decoding = 'async';
    const text = document.createElement('figcaption');
    text.textContent = title;
    slide.append(image, text);
    stage.append(slide);
    slides.push(slide);
  });
  let current = 0;
  let timer;
  let paused = false;
  let focused = false;
  let hovered = false;
  function load(index) {
    const image = slides[index].querySelector('img');
    if (!image.hasAttribute('src')) image.src = image.dataset.src;
  }
  function show(index, manual = false) {
    current = (index + slides.length) % slides.length;
    load(current);
    load((current + 1) % slides.length);
    slides.forEach((slide, i) => {
      slide.classList.toggle('is-active', i === current);
      slide.setAttribute('aria-hidden', String(i !== current));
    });
    currentSlide.textContent = String(current + 1);
    if (manual) announcement.textContent = 'Memory ' + (current + 1) + ' of ' + slides.length + ': ' + caption(files[current], current);
  }
  function schedule() {
    clearTimeout(timer);
    if (!paused && !focused && !hovered && !document.hidden) {
      timer = setTimeout(() => { show(current + 1); schedule(); }, 5000);
    }
  }
  function navigate(index) { show(index, true); schedule(); }
  section.querySelector('.history-prev').addEventListener('click', () => navigate(current - 1));
  section.querySelector('.history-next').addEventListener('click', () => navigate(current + 1));
  pause.addEventListener('click', () => {
    paused = !paused;
    pause.textContent = paused ? 'Resume slideshow' : 'Pause slideshow';
    pause.setAttribute('aria-pressed', String(paused));
    schedule();
  });
  const carousel = section.querySelector('.history-carousel');
  carousel.addEventListener('mouseenter', () => { hovered = true; schedule(); });
  carousel.addEventListener('mouseleave', () => { hovered = false; schedule(); });
  carousel.addEventListener('focusin', () => { focused = true; schedule(); });
  carousel.addEventListener('focusout', event => {
    if (!carousel.contains(event.relatedTarget)) { focused = false; schedule(); }
  });
  carousel.addEventListener('keydown', event => {
    if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
      event.preventDefault();
      navigate(current + (event.key === 'ArrowRight' ? 1 : -1));
    }
  });
  document.addEventListener('visibilitychange', schedule);
  show(0);
  schedule();
})();
