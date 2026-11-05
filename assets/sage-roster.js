(() => {
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
