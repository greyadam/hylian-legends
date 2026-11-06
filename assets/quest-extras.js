(() => {
  const section = document.getElementById('quests');
  if (!section || section.dataset.extrasReady) return;
  section.dataset.extrasReady = 'true';
  const style = document.createElement('style');
  style.textContent = '#quests .daily-scroll{box-sizing:border-box;max-width:720px;margin:20px auto 0;padding:24px clamp(20px,4vw,36px);border:1px solid #d4af37;border-radius:5px;background:linear-gradient(90deg,#c6a76d,#ead9ae 8%,#f1e4c4 50%,#ead9ae 92%,#c6a76d);box-shadow:inset 0 0 22px #65441c33;color:#352719;text-align:center}#quests .daily-scroll h3{color:#49321d;font:26px/1.3 Georgia,serif;margin:0 0 8px}#quests .daily-scroll .riddle-verse{color:#352719;font:17px/1.75 Georgia,serif;white-space:pre-line;margin:16px 0}#quests .daily-scroll .riddle-schedule{color:#59442d;font:12px/1.6 Arial,sans-serif}#quests .daily-scroll button{border:1px solid #75511d;background:#173224;color:#f1e5c5;border-radius:22px;padding:9px 18px;font:13px/1.5 Arial,sans-serif}#quests .daily-scroll button:focus-visible{outline:2px solid #173224;outline-offset:4px}#quests .daily-scroll .riddle-answer{color:#352719;font:16px/1.6 Georgia,serif;margin:14px 0 0}#quests .party-counter{display:inline-block;margin:6px 0 6px 8px;border:1px solid #d4af37;border-radius:20px;padding:3px 9px;color:var(--cream);background:#173224;font:11px/1.6 Arial,sans-serif;letter-spacing:.3px;text-transform:none}#quests .attendance-note{color:var(--muted);font:12px/1.6 Arial,sans-serif;margin-top:14px}';
  document.head.append(style);
  const wiki = document.getElementById('tibiawiki-search');
  if (wiki && !document.getElementById('daily-hylian-riddle')) {
    const riddles = [
      ['I have no blade, yet open the way.\nI have no voice, yet make music obey.\nA hero may carry me, small in his hand—\nWhat am I, heard throughout the land?','An ocarina.'],
      ['Three golden pieces, together made whole,\nA wish in their keeping, a test for the soul.\nNot sword and not crown, yet kingdoms desire—\nWhat shines at the heart of a hero’s fire?','The Triforce.'],
      ['I copy your courage but never your cry.\nI follow your footsteps as daylight goes by.\nWhen darkness surrounds you, I vanish from sight—\nWhat companion is born of the light?','Your shadow.'],
      ['I face every arrow, yet never attack.\nI stand before danger and send courage back.\nCarried, not ridden; a guard in your hand—\nWhat helps a lone hero to stand?','A shield.'],
      ['I mark many roads but travel through none.\nI hold every river yet drink not a one.\nUnfold me when paths disappear in the mist—\nWhat guide has no voice, but can still assist?','A map.'],
      ['I sleep in a lock till a traveller arrives.\nOne turn of my body and hope comes alive.\nSmall as a secret, with teeth but no bite—\nWhat opens the way to the light?','A key.'],
      ['My hands carry nothing, my face has no eyes.\nI measure the journey while daylight flies.\nNo hero can halt me, though many may try—\nWhat watches the hours pass by?','A clock.']
    ];
    const card = document.createElement('article');
    card.id = 'daily-hylian-riddle';
    card.className = 'daily-scroll';
    card.setAttribute('aria-labelledby','daily-hylian-title');
    const title = document.createElement('h3');
    title.id = 'daily-hylian-title';
    title.textContent = 'Riddle of the Hylians';
    const schedule = document.createElement('p');
    schedule.className = 'riddle-schedule';
    const verse = document.createElement('p');
    verse.className = 'riddle-verse';
    const reveal = document.createElement('button');
    reveal.type = 'button';
    reveal.setAttribute('aria-controls','daily-hylian-answer');
    const answer = document.createElement('p');
    answer.id = 'daily-hylian-answer';
    answer.className = 'riddle-answer';
    let dayKey = '';
    function refresh() {
      const now = new Date();
      const key = now.toISOString().slice(0,10);
      if (dayKey === key) return;
      dayKey = key;
      const index = Math.floor(Date.UTC(now.getUTCFullYear(),now.getUTCMonth(),now.getUTCDate()) / 86400000) % riddles.length;
      verse.textContent = riddles[index][0];
      answer.textContent = 'Answer: ' + riddles[index][1];
      answer.hidden = true;
      reveal.textContent = 'Reveal answer';
      reveal.setAttribute('aria-expanded','false');
      schedule.textContent = key + ' UTC · Changes at midnight UTC · Seven original riddles in rotation';
    }
    reveal.onclick = () => {
      answer.hidden = !answer.hidden;
      reveal.textContent = answer.hidden ? 'Reveal answer' : 'Hide answer';
      reveal.setAttribute('aria-expanded',String(!answer.hidden));
    };
    card.append(title,schedule,verse,reveal,answer);
    wiki.after(card);
    refresh();
    setInterval(refresh,30000);
    document.addEventListener('visibilitychange',() => {if (!document.hidden) refresh();});
    window.addEventListener('focus',refresh);
  }
  const list = section.querySelector('#events');
  if (!list) return;
  const attendance = {
    'Forest Temple Night Raid': {count:0,capacity:4},
    'Any% Speedrun Showdown': {count:0},
    'Lore Circle: The Three Goddesses': {count:0}
  };
  const note = document.createElement('p');
  note.className = 'attendance-note';
  note.textContent = 'Initial recorded counts: 0. Counts maintained by the guild. Browser-only RSVPs do not update these totals.';
  list.after(note);
  function badges() {
    for (const card of list.querySelectorAll('.event')) {
      const record = attendance[card.querySelector('h3')?.textContent.trim()];
      const meta = card.querySelector('.meta');
      if (!record || !meta || card.querySelector('.party-counter')) continue;
      const badge = document.createElement('span');
      badge.className = 'party-counter';
      badge.textContent = record.capacity ? 'Party: ' + record.count + '/' + record.capacity + ' Slots' : 'Attending: ' + record.count;
      badge.title = 'Manually maintained recorded count; not a live RSVP total';
      meta.append(badge);
    }
  }
  badges();
  new MutationObserver(badges).observe(list,{childList:true,subtree:true});
})();
