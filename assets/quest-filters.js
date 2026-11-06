(() => {
  const list = document.querySelector('#quests #events');
  const oldBar = document.getElementById('quest-filters');
  if (!list || !oldBar || typeof renderEvents !== 'function' || typeof events === 'undefined' || document.getElementById('quest-category-status')) return;
  const bar = document.createElement('div');
  bar.id = 'quest-filters';
  bar.className = 'filters quest-category-bar';
  bar.setAttribute('role','group');
  bar.setAttribute('aria-label','Filter events by category');
  oldBar.remove();
  list.before(bar);
  const status = document.createElement('p');
  status.id = 'quest-category-status';
  status.className = 'notice';
  status.setAttribute('role','status');
  const empty = document.createElement('p');
  empty.className = 'empty';
  empty.textContent = 'No events in this category yet.';
  empty.hidden = true;
  list.before(status);
  list.after(empty);
  const style = document.createElement('style');
  style.textContent = '#quests .quest-category-bar{gap:8px;margin:18px 0 12px;flex-wrap:wrap}#quests .quest-category-bar button{background:#13271e;color:var(--cream);border:1px solid #e9b34d66;border-radius:24px;padding:9px 16px;min-height:40px}#quests .quest-category-bar button:hover{border-color:var(--gold);background:#1b3628}#quests .quest-category-bar button.active{background:var(--gold);border-color:var(--gold);color:#211b0c}#quests .quest-category-bar button:focus-visible{outline:2px solid var(--gold);outline-offset:3px}#quest-category-status{margin:0 0 8px}';
  document.head.append(style);
  let selected = 'All';
  const categories = ['All','Bosses','Quests','Socials'];
  function category(event) {
    if (categories.includes(event.category) && event.category !== 'All') return event.category;
    if (['Raid','Boss','Bosses'].includes(event.type)) return 'Bosses';
    if (['Lore','Social','Socials'].includes(event.type)) return 'Socials';
    return 'Quests';
  }
  function apply() {
    let shown = 0;
    const cards = [...list.querySelectorAll('.event')];
    for (const card of cards) {
      const day = Number(card.querySelector('.rsvp')?.dataset.day);
      const item = events.find(event => event.day === day);
      const value = item ? category(item) : (card.dataset.category || 'Quests');
      card.dataset.category = value;
      card.hidden = selected !== 'All' && value !== selected;
      if (!card.hidden) shown++;
    }
    const oldEmpty = list.querySelector('.empty');
    if (oldEmpty) oldEmpty.hidden = true;
    empty.hidden = shown > 0;
    status.textContent = shown + (shown === 1 ? ' event' : ' events') + (selected === 'All' ? ' across all categories' : ' in ' + selected);
  }
  const originalRender = renderEvents;
  selectedQuest = 'All';
  renderEvents = function() {originalRender();apply();};
  for (const name of categories) {
    const button = document.createElement('button');
    button.type = 'button';
    button.textContent = name;
    button.className = name === selected ? 'active' : '';
    button.setAttribute('aria-pressed',String(name === selected));
    button.setAttribute('aria-controls','events');
    button.onclick = () => {
      selected = name;
      for (const other of bar.children) {
        const active = other === button;
        other.classList.toggle('active',active);
        other.setAttribute('aria-pressed',String(active));
      }
      apply();
    };
    bar.append(button);
  }
  renderEvents();
})();

(() => {
  const script = document.createElement('script');
  script.src = 'assets/quest-extras.js';
  document.head.append(script);
})();
