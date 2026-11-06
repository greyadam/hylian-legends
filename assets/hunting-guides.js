(() => {
  const section = document.getElementById('guides');
  if (!section || section.dataset.huntingReady) return;
  const oldSearch = section.querySelector('#search');
  const oldFilters = section.querySelector('#guide-filters');
  const list = section.querySelector('#guide-list');
  if (!oldSearch || !oldFilters || !list) return;
  section.dataset.huntingReady = 'true';
  const search = oldSearch.cloneNode(true);
  oldSearch.replaceWith(search);
  search.value = '';
  search.placeholder = 'Search hunts, locations, or vocations';
  search.setAttribute('aria-label','Search hunting guides');
  const filters = oldFilters.cloneNode(false);
  oldFilters.replaceWith(filters);
  const intro = section.querySelector('.section-head > p');
  if (intro) intro.textContent = 'Hunting starting points for Knights, Paladins, Monks, Sorcerers, and Druids. Filter by vocation and character level, then check the source before travelling.';
  const title = section.querySelector('h2');
  if (title) title.innerHTML = 'FIELD <em>hunting guides</em>';
  const accents = {Knight:'#d93838',Paladin:'#28a745',Druid:'#17a2b8',Sorcerer:'#8a2be2',Monk:'#e69f24'};
  const data = [
    ['Knight',20,'Elves Yalahar','Yalahar','Weapon type: Physical'],
    ['Knight',50,"Lion's Rock",'Lion\'s Rock','Weapon type: Physical'],
    ['Knight',90,'Exotic Cave','Exotic Cave','Weapon type: Physical'],
    ['Paladin',40,'Banuta Apes','Banuta','Ammunition: Onyx Arrows'],
    ['Paladin',60,'Cults Yalahar','Yalahar','Ammunition / barrage: Shatterstorm Arrows, Ethereal'],
    ['Paladin',150,'Glooth Tower','Glooth Tower','Ammunition / barrage: Diamond Arrows, Ethereal'],
    ['Monk',20,'Stonerefiners','Stonerefiners','Weapon type: Energy; source specifies a Stealth Ring'],
    ['Monk',50,"Lion's Rock",'Lion\'s Rock','Weapon type: Physical'],
    ['Monk',60,'Water Elementals South Port Hope','Port Hope, south spawn','Weapon type: Energy'],
    ['Sorcerer',30,'Coryms Port Hope','Port Hope','Source-listed mastery: Fire'],
    ['Sorcerer',50,'Mother of Scarabs Lair -4','Mother of Scarabs Lair, floor -4','Source-listed mastery: Fire; Ancient Scarabs'],
    ['Sorcerer',120,'Glooth Bandits','Glooth Bandits','Source-listed mastery: Fire'],
    ['Druid',28,'Upper Spike','Upper Spike','Playstyle: Thunderstorm, Great Fireball (GFB), Avalanche'],
    ['Druid',50,'Yalahar Cults','Yalahar','Playstyle: Thunderstorm runes'],
    ['Druid',100,'Souleater Mountain','Souleater Mountain','Playstyle: Great Fireball (GFB) runes']
  ];
  const style = document.createElement('style');
  style.textContent = '#guides .guides{grid-template-columns:repeat(auto-fit,minmax(min(100%,280px),1fr))}#guides .hunt-card{min-height:245px;cursor:default;transition:border-color .18s ease,box-shadow .18s ease}#guides .hunt-card:hover,#guides .hunt-card:focus-within{border-color:var(--hunt-accent);box-shadow:0 0 20px var(--hunt-glow)}#guides .hunt-tag{display:inline-block;color:var(--hunt-accent);border:1px solid var(--hunt-accent);background:var(--hunt-tint);border-radius:20px;padding:3px 9px;letter-spacing:1px}#guides .hunt-card h3{margin:18px 0 10px;padding:0}#guides .hunt-card .button{margin-top:auto;padding:8px 15px}#guides .hunt-controls{display:flex;gap:14px;flex-wrap:wrap;align-items:center;margin:16px 0}#guides .hunt-controls input{width:120px;background:var(--bg);color:var(--cream);border:1px solid var(--line);border-radius:20px;padding:8px 12px}#guides .hunt-note{margin:14px 0 24px;max-width:900px}#guides .hunt-count{font:12px/1.7 Arial,sans-serif;color:var(--muted)}#guides .hunt-card a:focus-visible{outline:2px solid var(--hunt-accent);outline-offset:4px}@media(prefers-reduced-motion:reduce){#guides .hunt-card{transition:none}}';
  document.head.append(style);
  const controls = document.createElement('div');
  controls.className = 'hunt-controls';
  const label = document.createElement('label');
  label.htmlFor = 'hunt-level';
  label.textContent = 'Your character level (optional)';
  const level = document.createElement('input');
  level.id = 'hunt-level';
  level.type = 'number';
  level.min = '8';
  level.step = '1';
  level.placeholder = 'Any';
  level.setAttribute('aria-describedby','hunt-note');
  const count = document.createElement('span');
  count.className = 'hunt-count';
  count.setAttribute('role','status');
  controls.append(label,level,count);
  const note = document.createElement('p');
  note.id = 'hunt-note';
  note.className = 'notice hunt-note';
  note.textContent = 'Source: TibiaPal hunting directory, checked November 5, 2026. Levels are source-listed starting points, not guarantees of safety. Skills, equipment, access quests, premium requirements and experience matter. Check access and the full guide before entering. TibiaPal is retesting hunts after the vocation rebalance. These are curated snapshots, not live updates; no experience or profit is guaranteed. Entering your level shows all entries at or below that starting level, including lower-level hunts. Source links open the directory; select your vocation and find the named spawn.';
  list.before(controls,note);
  let selected = 'All';
  function render() {
    const query = search.value.trim().toLowerCase();
    const max = level.value === '' ? Infinity : Number(level.value);
    const entries = data.filter(row => (selected === 'All' || row[0] === selected) && row[1] <= max && row.join(' ').toLowerCase().includes(query));
    list.replaceChildren();
    count.textContent = entries.length + ' hunting options';
    for (const [vocation,min,name,location,approach] of entries) {
      const card = document.createElement('article');
      card.className = 'guide hunt-card';
      card.dataset.vocation = vocation.toLowerCase();
      card.style.setProperty('--hunt-accent',accents[vocation]);
      card.style.setProperty('--hunt-glow',accents[vocation] + '40');
      card.style.setProperty('--hunt-tint',accents[vocation] + '14');
      const meta = document.createElement('div');
      meta.className = 'micro';
      const tag = document.createElement('span');
      tag.className = 'hunt-tag';
      tag.textContent = vocation;
      meta.append(tag,document.createTextNode(' | Level ' + min + '+'));
      const heading = document.createElement('h3');
      heading.textContent = name;
      const place = document.createElement('p');
      place.textContent = 'Location: ' + location;
      const method = document.createElement('p');
      method.textContent = approach;
      const source = document.createElement('a');
      source.className = 'button outline';
      source.href = 'https://tibiapal.com/hunting';
      source.target = '_blank';
      source.rel = 'noopener noreferrer';
      source.textContent = 'Open TibiaPal hunt list';
      source.setAttribute('aria-label','Open TibiaPal hunting directory for ' + vocation + ': ' + name + ' (new tab)');
      card.append(meta,heading,place,method,source);
      list.append(card);
    }
    if (!entries.length) {
      const empty = document.createElement('p');
      empty.className = 'empty';
      empty.textContent = 'No hunts match these filters. Try another vocation, level, or search term.';
      list.append(empty);
    }
  }
  for (const name of ['All','Knight','Paladin','Monk','Sorcerer','Druid']) {
    const button = document.createElement('button');
    button.type = 'button';
    button.textContent = name;
    button.className = name === selected ? 'active' : '';
    button.setAttribute('aria-pressed',String(name === selected));
    button.onclick = () => {
      selected = name;
      for (const other of filters.children) {
        const active = other === button;
        other.classList.toggle('active',active);
        other.setAttribute('aria-pressed',String(active));
      }
      render();
    };
    filters.append(button);
  }
  search.addEventListener('input',render);
  level.addEventListener('input',render);
  render();
})();
