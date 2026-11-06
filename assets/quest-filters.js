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

(() => {
  const list = document.querySelector('#discord .channels ul');
  if (!list) return;
  const names = [
    '𝔄𝔫𝔫𝔬𝔲𝔫𝔠𝔢𝔪𝔢𝔫𝔱𝔰-𝔞𝔫𝔡-𝔘𝔭𝔡𝔞𝔱𝔢𝔰',
    '𝔗𝔥𝔢-𝔏𝔬𝔲𝔫𝔤𝔢',
    '𝕿𝖍𝖊 𝕷𝖔𝖚𝖓𝖌𝖊 vc',
    '𝕳𝖚𝖓𝖙𝖎𝖓𝖌 𝕲𝖗𝖔𝖚𝖕 I',
    '𝕳𝖚𝖓𝖙𝖎𝖓𝖌 𝕲𝖗𝖔𝖚𝖕 II',
    '𝖂𝖆𝖗𝖟𝖔𝖓𝖊𝖘',
    '𝖁𝖔𝖎𝖈𝖊/𝕾𝖙𝖗𝖊𝖆𝖒'
  ];
  list.replaceChildren(...names.map((name,index) => {
    const item = document.createElement('li');
    item.textContent = name;
    if ([2,3,4,6].includes(index)) item.className = 'hearth-voice-channel';
    return item;
  }));
  const style = document.createElement('style');
  style.textContent = '#discord .channels li.hearth-voice-channel::before{content:"🔊";font-size:12px;opacity:.7;color:var(--green);margin-right:12px}#hearth-online-badge{display:flex;flex-direction:column;align-items:flex-start;gap:3px;width:fit-content;max-width:100%;margin-top:14px;padding:8px 13px;border:1px solid #d4af3766;border-radius:12px;background:#13271e;color:var(--green);font:12px/1.6 Arial,sans-serif}#hearth-online-badge small{color:var(--muted);font-size:10px}';
  document.head.append(style);
  const join = document.querySelector('#discord button.discord');
  if (join && !document.getElementById('hearth-online-badge')) {
    const badge = document.createElement('div');
    badge.id = 'hearth-online-badge';
    const label = document.createElement('span');
    label.textContent = '🟢 Guild Members Online';
    const note = document.createElement('small');
    note.textContent = 'Community badge · Not live presence';
    badge.append(label,note);
    join.after(badge);
  }
})();
