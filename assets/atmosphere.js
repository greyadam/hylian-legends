(() => {
  'use strict';
  function init() {
    const body = document.body;
    if (!body || !body.matches('.guild-home, .trials-page') || body.dataset.atmosphereReady) return;
    body.dataset.atmosphereReady = 'true';
    body.classList.add('atmosphere-enabled');
    const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
    const fineHover = window.matchMedia('(hover: hover) and (pointer: fine)');
    const canvas = document.createElement('canvas');
    canvas.className = 'atmosphere-dust';
    canvas.setAttribute('aria-hidden', 'true');
    body.prepend(canvas);
    const pen = canvas.getContext('2d');
    const colors = ['#f4c96b', '#55e6dc', '#90f2ff'];
    let width = 0, height = 0, frame = 0, lastFrame = 0, particles = [], away = false;
    function resizeDust() {
      width = window.innerWidth; height = window.innerHeight;
      const ratio = Math.min(window.devicePixelRatio || 1, 1.5);
      canvas.width = Math.round(width * ratio); canvas.height = Math.round(height * ratio);
      if (pen) pen.setTransform(ratio, 0, 0, ratio, 0, 0);
      particles = Array.from({length: width < 700 ? 32 : 64}, () => ({
        x: Math.random(), y: Math.random(), radius: 2 + Math.random() * 2,
        speed: 8 + Math.random() * 12, phase: Math.random() * Math.PI * 2,
        color: colors[Math.floor(Math.random() * colors.length)]
      }));
    }
    function drawDust(now) {
      frame = 0;
      if (!pen || away || document.hidden || motion.matches) return;
      if (lastFrame && now - lastFrame < 33) { frame = requestAnimationFrame(drawDust); return; }
      const elapsed = lastFrame ? Math.min((now - lastFrame) / 1000, .08) : 0;
      lastFrame = now;
      pen.clearRect(0, 0, width, height);
      for (const mote of particles) {
        mote.y -= mote.speed * elapsed / Math.max(height, 1);
        if (mote.y < 0) { mote.y = 1; mote.x = Math.random(); }
        const fade = Math.min(1, mote.y * 10, (1 - mote.y) * 10);
        pen.globalAlpha = fade * (.72 + .18 * Math.sin(now / 6000 + mote.phase));
        pen.fillStyle = mote.color;
        pen.shadowColor = mote.color;
        pen.shadowBlur = 16;
        pen.beginPath();
        pen.arc(mote.x * width + Math.sin(now / 7000 + mote.phase) * 22, mote.y * height, mote.radius, 0, Math.PI * 2);
        pen.fill();
      }
      pen.shadowBlur = 0; pen.globalAlpha = 1;
      frame = requestAnimationFrame(drawDust);
    }
    function syncDust() {
      cancelAnimationFrame(frame); frame = 0; lastFrame = 0;
      if (pen) pen.clearRect(0, 0, width, height);
      if (pen && !away && !document.hidden && !motion.matches) frame = requestAnimationFrame(drawDust);
    }
    resizeDust(); syncDust();
    window.addEventListener('resize', resizeDust, {passive: true});

    const nav = document.querySelector('header nav');
    let audio = null, master = null, enabled = false, activation = 0;
    const lastCue = {hover: -Infinity, action: -Infinity};
    const voices = new Set();
    let toggle = null;
    function updateToggle() {
      if (!toggle) return;
      toggle.setAttribute('aria-pressed', String(enabled));
      const label = enabled ? 'Mute atmosphere sounds' : 'Enable atmosphere sounds';
      toggle.setAttribute('aria-label', label); toggle.title = label;
    }
    function silence() {
      for (const voice of voices) { try { voice.stop(); } catch (_) {} }
      voices.clear();
    }
    function unavailable() {
      activation++; enabled = false; silence(); updateToggle();
      if (toggle) toggle.title = 'Audio unavailable. The site remains fully usable without sound.';
    }
    function envelope(gain, start, duration, volume) {
      gain.gain.setValueAtTime(.0001, start);
      gain.gain.exponentialRampToValueAtTime(volume, start + .015);
      gain.gain.setValueAtTime(volume, start + Math.min(.08, duration / 3));
      gain.gain.exponentialRampToValueAtTime(.0001, start + duration);
    }
    function track(source, nodes, start, duration) {
      voices.add(source);
      source.onended = () => { voices.delete(source); source.disconnect(); nodes.forEach(node => node.disconnect()); };
      source.start(start); source.stop(start + duration + .02);
    }
    function cue(kind) {
      if (!enabled || !audio || !master || audio.state !== 'running' || document.hidden || away) return;
      const now = performance.now(), group = kind === 'hover' ? 'hover' : 'action';
      if (kind !== 'confirm' && now - lastCue[group] < (kind === 'hover' ? 220 : 90)) return;
      if (kind === 'hover' && voices.size >= 8) return;
      lastCue[group] = now;
      if (kind !== 'hover') silence();
      try {
        const start = audio.currentTime;
        const notes = kind === 'confirm' ? [523.25, 659.25, 783.99] : kind === 'rsvp' ? [659.25, 830.61, 1108.73] : kind === 'hover' ? [783.99] : [440, 659.25];
        const duration = kind === 'hover' ? .24 : kind === 'tap' ? .32 : .55;
        const volume = kind === 'hover' ? .09 : kind === 'rsvp' ? .18 : .15;
        notes.forEach((frequency, index) => {
          const tone = audio.createOscillator(), gain = audio.createGain();
          const when = start + index * .09;
          tone.type = 'sine'; tone.frequency.value = frequency;
          envelope(gain, when, duration, volume);
          tone.connect(gain); gain.connect(master);
          track(tone, [gain], when, duration);
        });
        if (kind === 'tap') {
          const noise = audio.createBufferSource(), filter = audio.createBiquadFilter(), gain = audio.createGain();
          const buffer = audio.createBuffer(1, Math.ceil(audio.sampleRate * .09), audio.sampleRate);
          const samples = buffer.getChannelData(0);
          for (let i = 0; i < samples.length; i++) samples[i] = Math.random() * 2 - 1;
          noise.buffer = buffer; filter.type = 'lowpass'; filter.frequency.value = 1800;
          envelope(gain, start, .09, .12);
          noise.connect(filter); filter.connect(gain); gain.connect(master);
          track(noise, [filter, gain], start, .09);
        }
      } catch (_) { unavailable(); }
    }
    function playFromClick(kind) {
      if (!enabled || !audio) return;
      if (audio.state === 'suspended') {
        const version = activation;
        audio.resume().then(() => { if (version === activation) cue(kind); }).catch(unavailable);
      } else cue(kind);
    }
    if (nav) {
      toggle = document.createElement('button');
      toggle.type = 'button'; toggle.className = 'atmosphere-audio-toggle';
      toggle.innerHTML = '<svg viewBox="0 0 20 20" aria-hidden="true" focusable="false"><path d="M3 8h4l5-4v12l-5-4H3z" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M15 7q3 3 0 6" fill="none" stroke="currentColor" stroke-width="1.5"/><path class="atmosphere-audio-cross" d="M2 2l16 16" stroke="currentColor" stroke-width="1.5"/></svg>';
      updateToggle(); nav.append(toggle);
      toggle.addEventListener('click', () => {
        const version = ++activation;
        enabled = !enabled; updateToggle();
        if (!enabled) { silence(); if (audio) audio.suspend().catch(() => {}); return; }
        try {
          const Engine = window.AudioContext || window.webkitAudioContext;
          if (!Engine) { unavailable(); return; }
          if (!audio) {
            audio = new Engine(); master = audio.createGain();
            master.gain.value = .65; master.connect(audio.destination);
          }
          audio.resume().then(() => {
            if (enabled && version === activation) cue('confirm');
            else if (!enabled) audio.suspend().catch(() => {});
          }).catch(unavailable);
        } catch (_) { unavailable(); }
      });
      document.addEventListener('click', event => {
        const target = event.target instanceof Element ? event.target : null;
        if (!event.isTrusted || !target || target.closest('.atmosphere-audio-toggle')) return;
        const control = target.closest('#quests .rsvp, header nav a, a.button, button:not(.trial-option):not(.trial-button)');
        if (!control || control.matches(':disabled, [aria-disabled="true"]')) return;
        playFromClick(control.matches('#quests .rsvp') ? 'rsvp' : 'tap');
      }, {capture: true, passive: true});
      document.addEventListener('pointerover', event => {
        if (!event.isTrusted || event.pointerType !== 'mouse' || !fineHover.matches || !enabled) return;
        const target = event.target instanceof Element ? event.target : null;
        const control = target && target.closest('button, header nav a, a.button, [role="button"]');
        if (!control || control.matches(':disabled, [aria-disabled="true"]') || control.closest('.atmosphere-audio-toggle')) return;
        if (event.relatedTarget instanceof Node && control.contains(event.relatedTarget)) return;
        cue('hover');
      }, {passive: true});
    }

    const ticker = document.createElement('aside');
    ticker.className = 'atmosphere-ticker';
    ticker.setAttribute('aria-label', 'Realm chronicle: fictional guild atmosphere, not live status');
    const label = document.createElement('span'), message = document.createElement('span'), pause = document.createElement('button');
    label.className = 'atmosphere-ticker-label'; label.textContent = 'REALM CHRONICLE · FLAVOR TEXT, NOT LIVE DATA';
    pause.type = 'button'; pause.className = 'atmosphere-ticker-pause';
    const messages = [
      'Realm Status: Peaceful • The watchfires of Hyrule burn bright.',
      'From the Council Scrolls • Courage gathers companions at the hearth.',
      'Whispers of the Realm • Ancient wisdom awaits beyond the temple gates.',
      'Guild Chronicle • May courage, wisdom, and power guide your journey.'
    ];
    let entry = 0, interval = null, paused = false, hovered = false;
    message.textContent = messages[entry]; ticker.append(label, message, pause);
    const footer = document.querySelector('footer');
    if (footer) footer.before(ticker); else body.append(ticker);
    function syncTicker() {
      clearInterval(interval); interval = null;
      const stopped = paused || motion.matches;
      pause.textContent = stopped ? 'Resume' : 'Pause';
      pause.setAttribute('aria-label', stopped ? 'Resume realm messages' : 'Pause realm messages');
      pause.disabled = motion.matches;
      if (motion.matches) { pause.textContent = 'Static'; pause.setAttribute('aria-label', 'Realm messages static: reduced motion enabled'); }
      if (!away && !document.hidden && !stopped && !hovered && !ticker.contains(document.activeElement)) {
        interval = setInterval(() => { entry = (entry + 1) % messages.length; message.textContent = messages[entry]; }, 10000);
      }
    }
    pause.addEventListener('click', () => { paused = !paused; syncTicker(); });
    ticker.addEventListener('mouseenter', () => { hovered = true; syncTicker(); });
    ticker.addEventListener('mouseleave', () => { hovered = false; syncTicker(); });
    ticker.addEventListener('focusin', syncTicker);
    ticker.addEventListener('focusout', () => setTimeout(syncTicker, 0));
    syncTicker();
    document.addEventListener('visibilitychange', () => {
      syncDust(); syncTicker(); if (document.hidden) silence();
    });
    motion.addEventListener('change', () => { syncDust(); syncTicker(); });
    window.addEventListener('pagehide', () => {
      away = true; activation++; enabled = false; updateToggle(); silence(); syncDust(); syncTicker();
      if (audio) audio.suspend().catch(() => {});
    });
    window.addEventListener('pageshow', () => { away = false; syncDust(); syncTicker(); });
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init, {once: true});
  else init();
})();
