(() => {
  const anniversary = document.getElementById('anniversary');
  const hero = document.getElementById('home');
  if ((!anniversary && !hero) || document.getElementById('guild-marquee')) return;
  const words = ['COURAGE','WISDOM','POWER','QUESTS','RAIDS','HUNTS','HERO OF TIME'];
  const goldWords = new Set(['COURAGE','POWER','RAIDS','HERO OF TIME']);
  const banner = document.createElement('div');
  banner.id = 'guild-marquee';
  banner.setAttribute('role','region');
  banner.setAttribute('aria-label',words.join(', '));
  const track = document.createElement('div');
  track.id = 'guild-marquee-track';
  track.setAttribute('aria-hidden','true');
  const group = document.createElement('div');
  group.className = 'guild-marquee-group';
  for (const word of words) {
    const item = document.createElement('span');
    item.className = 'guild-marquee-item';
    const text = document.createElement('span');
    text.className = goldWords.has(word) ? 'guild-marquee-gold' : 'guild-marquee-white';
    text.textContent = word;
    const separator = document.createElement('span');
    separator.className = 'guild-marquee-separator';
    separator.textContent = '▲';
    item.append(text,separator);
    group.append(item);
  }
  track.append(group,group.cloneNode(true));
  const pause = document.createElement('button');
  pause.type = 'button';
  pause.className = 'guild-marquee-toggle';
  pause.textContent = 'Pause';
  pause.setAttribute('aria-label','Pause scrolling banner');
  pause.setAttribute('aria-controls',track.id);
  pause.setAttribute('aria-pressed','false');
  pause.onclick = () => {
    const paused = banner.classList.toggle('is-paused');
    pause.textContent = paused ? 'Play' : 'Pause';
    pause.setAttribute('aria-label',paused ? 'Resume scrolling banner' : 'Pause scrolling banner');
    pause.setAttribute('aria-pressed',String(paused));
  };
  const style = document.createElement('style');
  style.textContent = `
#guild-marquee{position:relative;width:100%;overflow:hidden;border-top:1px solid rgba(212,175,55,.22);border-bottom:1px solid rgba(212,175,55,.22);background:#101a15;padding:16px 0}
#guild-marquee-track{display:flex;width:max-content;animation:marquee 36s linear infinite;will-change:transform}
#guild-marquee .guild-marquee-group{display:flex;flex:0 0 auto;min-width:100vw;justify-content:space-around;align-items:center}
#guild-marquee .guild-marquee-item{display:inline-flex;flex:0 0 auto;align-items:center;font:700 20px/1.5 Georgia,serif;letter-spacing:2px;white-space:nowrap;text-transform:uppercase}
#guild-marquee .guild-marquee-gold{color:#d4af37}
#guild-marquee .guild-marquee-white{color:#ffffff}
#guild-marquee .guild-marquee-separator{margin:0 1.25rem;font-size:12px;color:#d4af37}
#guild-marquee .guild-marquee-toggle{position:absolute;right:8px;top:50%;transform:translateY(-50%);padding:5px 9px;border:1px solid rgba(212,175,55,.3);border-radius:12px;background:#101a15;color:var(--muted);font:10px/1.5 Arial,sans-serif}
#guild-marquee .guild-marquee-toggle:focus-visible{outline:2px solid #d4af37;outline-offset:2px}
#guild-marquee.is-paused #guild-marquee-track{animation-play-state:paused}
@keyframes marquee{from{transform:translateX(0)}to{transform:translateX(-50%)}}
@media(prefers-reduced-motion:reduce){#guild-marquee-track{animation:none;transform:none;will-change:auto;width:100%}#guild-marquee .guild-marquee-group{min-width:0;width:100%;flex-wrap:wrap;justify-content:center;gap:8px 0}#guild-marquee .guild-marquee-group+ .guild-marquee-group,#guild-marquee .guild-marquee-toggle{display:none}}
`;
  document.head.append(style);
  banner.append(track,pause);
  if (anniversary) anniversary.before(banner);
  else hero.after(banner);
})();
