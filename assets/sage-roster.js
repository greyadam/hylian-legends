(() => {
  const hero = [...document.querySelectorAll('#rank-list .rank')].find(row => row.querySelector('h3')?.textContent.trim() === 'Hero of Time');
  if (hero && !document.getElementById('hero-of-time-roster')) {
    const heroList = document.createElement('ul');
    heroList.id = 'hero-of-time-roster';
    heroList.setAttribute('aria-label', 'Hero of Time member');
    heroList.style.cssText = 'list-style:none;padding:0;margin:14px 0 0;display:flex;flex-wrap:wrap;gap:7px';
    const member = document.createElement('li');
    member.style.cssText = 'border:1px solid var(--line);border-radius:14px;padding:3px 10px;font:12px/1.7 Arial,sans-serif;color:var(--green)';
    const profile = document.createElement('a');
    profile.href = 'https://www.tibia.com/community/?subtopic=characters&name=Linkmupi';
    profile.textContent = 'Linkmupi';
    member.append(profile);
    heroList.append(member);
    hero.querySelector('h3').parentElement.append(heroList);
  }
  const rank = [...document.querySelectorAll('#rank-list .rank')].find(row => row.querySelector('h3')?.textContent.trim() === 'Sage of the Temple');
  if (!rank) return;
  const box = document.createElement('div');
  box.id = 'sage-roster';
  const list = document.createElement('ul');
  const status = document.createElement('p');
  status.setAttribute('aria-live', 'polite');
  box.append(list, status);
  rank.querySelector('h3').parentElement.append(box);
  const style = document.createElement('style');
  style.textContent = '#sage-roster{margin-top:14px}#sage-roster ul{list-style:none;padding:0;margin:0;display:flex;flex-wrap:wrap;gap:7px}#sage-roster li{border:1px solid var(--line);border-radius:14px;padding:3px 10px;font:12px/1.7 Arial,sans-serif;color:var(--green)}#sage-roster p{font:10px/1.6 Arial,sans-serif;margin-top:8px;color:var(--muted)}';
  document.head.append(style);
  function render(data) {
    list.replaceChildren();
    for (const name of data.members) {
      const li = document.createElement('li');
      const a = document.createElement('a');
      const url = new URL('https://www.tibia.com/community/');
      url.searchParams.set('subtopic', 'characters');
      url.searchParams.set('name', name);
      a.href = url.href;
      a.textContent = name;
      li.append(a); list.append(li);
    }
    const checked = data.last_successful_check ? new Date(data.last_successful_check).toLocaleString() : null;
    status.textContent = checked ? 'Last successfully checked on Tibia.com: ' + checked : 'Names confirmed by guild owner; automatic verification pending.';
    if (data.status === 'check_failed') status.textContent += ' Latest check unsuccessful; previous list retained.';
  }
  render({members:['Anelstocracies','Britney Likes Spears','Trevalar Sintori','Legendary Gandolf'],status:'seeded'});
  async function load() {
    try {
      const response = await fetch('assets/sage-roster.json', {cache:'no-store'});
      if (!response.ok) throw new Error('Roster unavailable');
      const data = await response.json();
      if (data.guild !== 'Hylian Legends' || data.rank !== 'Sage of the Temple' || !Array.isArray(data.members) || !data.members.every(n => typeof n === 'string' && n.trim())) throw new Error('Invalid roster');
      render(data);
    } catch { status.textContent += status.textContent.includes('refresh unavailable') ? '' : ' Roster refresh unavailable.'; }
  }
  load();
  setInterval(() => {if (!document.hidden) load();}, 900000);
})();

(() => {
  const quests = document.querySelector('#quests > .wrap');
  if (!quests || document.getElementById('tibiawiki-search')) return;
  const panel = document.createElement('aside');
  panel.id = 'tibiawiki-search';
  panel.className = 'panel';
  panel.style.marginTop = '24px';
  panel.setAttribute('aria-labelledby', 'tibiawiki-search-title');
  panel.innerHTML = '<h3 id="tibiawiki-search-title" style="margin-top:0">TibiaWiki Search</h3><form role="search" aria-label="Search TibiaWiki" action="https://tibia.fandom.com/wiki/Special:Search" method="get" target="_blank" rel="noopener noreferrer"><label for="tibiawiki-query" style="display:block;margin-bottom:8px">Search TibiaWiki</label><div style="display:flex;flex-wrap:wrap;gap:12px"><input id="tibiawiki-query" name="query" type="search" required maxlength="200" placeholder="Search quests, items, creatures, or NPCs" aria-describedby="tibiawiki-search-help" style="flex:1 1 240px;min-width:0;width:100%;padding:12px 16px;border:1px solid var(--line);border-radius:30px;background:var(--bg);color:var(--cream)"><button class="button" type="submit">Search TibiaWiki</button></div><p id="tibiawiki-search-help" class="notice" style="margin-bottom:0">Search results open on TibiaWiki in a new tab.</p></form>';
  const input = panel.querySelector('input');
  input.addEventListener('input', () => input.setCustomValidity(''));
  panel.querySelector('form').addEventListener('submit', event => {
    input.value = input.value.trim();
    if (!input.value) {
      event.preventDefault();
      input.setCustomValidity('Enter a topic to search TibiaWiki.');
      input.reportValidity();
    }
  });
  quests.append(panel);
})();

(() => {
  const style = document.createElement('style');
  style.textContent = '#tibiawiki-query::placeholder{color:var(--gold);opacity:1}#tibiawiki-query:focus{outline:1px solid #d4af37;outline-offset:0;box-shadow:0 0 8px rgba(212, 175, 55, 0.5)}';
  document.head.append(style);
})();
