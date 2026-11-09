(() => {
  const hero = [...document.querySelectorAll('#rank-list .rank')].find(row => row.querySelector('h3')?.textContent.trim() === 'Hero of Time');
  if (hero) hero.querySelector('h3').style.color = '#d4af37';
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

(() => {
  const script = document.createElement('script');
  script.src = 'assets/virtue-stones.js';
  document.head.append(script);
})();

(() => {
  if (document.getElementById('great-hylian-legend')) return;
  const anniversary = document.getElementById('anniversary');
  if (!anniversary) return;
  anniversary.insertAdjacentHTML('afterend', `<section id="great-hylian-legend" aria-labelledby="legend-riddle-title" style="padding:24px 0 0">
<style>#great-hylian-legend .riddle-card{max-width:720px;margin:0 auto;text-align:center;padding:clamp(20px,3vw,30px);border-top:2px solid var(--gold)}#great-hylian-legend h2{font-size:clamp(26px,4vw,34px);margin:10px 0 18px}#great-hylian-legend .poem{font:clamp(15px,2vw,17px)/1.6 Georgia,serif}#great-hylian-legend .poem p{color:var(--cream);margin:0 0 14px}#great-hylian-legend .poem p:last-child{margin-bottom:0}#great-hylian-legend .riddle-question{font:italic clamp(20px,2.5vw,23px)/1.4 Georgia,serif;color:var(--gold);margin:18px 0 0}</style>
<div class="wrap"><article class="panel riddle-card"><div class="micro">Riddle</div><h2 id="legend-riddle-title">The Great <em>Hylian Legend</em></h2><div class="poem"><p>Many thought this legend a sham,<br>It was just too much for their minds to cram,<br>And when the webs of evil were weaved,<br>That is when all believed.</p><p>Chaos spread everywhere,<br>To challenge the evil, no one would dare,<br>But in all this darkness there was one light,<br>And that light vowed, &quot;I will fight.&quot;</p><p>The light purified all,<br>And to its power evil did fall,<br>Many thought this legend a mystery,<br>But now it has gone down in history.</p></div><p class="riddle-question">What is this legend?</p></article></div>
</section>`);
})();

(() => {
  const script = document.createElement('script');
  script.src = 'assets/hunting-guides.js';
  document.head.append(script);
})();

(() => {
  const style = document.createElement('style');
  style.textContent = `/* Left-to-right filling gold progress bar for Ranks I through VI */
#ranks #rank-list > .rank:nth-child(-n + 6) {
  position: relative;
  overflow: hidden;
}
#ranks #rank-list > .rank:nth-child(-n + 6)::before {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 2px;
  background-color: #d4af37;
  box-shadow: 0 0 10px rgba(212, 175, 55, 0.7);
  transform: scaleX(0);
  transform-origin: left;
  transition: transform 0.4s ease-in-out;
}
#ranks #rank-list > .rank:nth-child(-n + 6):hover::before {
  transform: scaleX(1);
}`;
  document.head.append(style);
})();

(() => {
  const quests=document.querySelector('#quests > .wrap');
  if(!quests)return;
  const link=document.createElement('a');
  link.href='quests.html';link.className='button outline';link.textContent='Open Quest Board / Admin';
  quests.prepend(link);
  const status=document.createElement('p');status.id='quest-load-status';status.setAttribute('role','status');quests.append(status);
  const script=document.createElement('script');script.src='quests-board.js';document.head.append(script);
})();
