(() => {
  'use strict';
  const section = document.getElementById('hylian-honor');
  if (!section || section.dataset.effectsReady) return;
  section.dataset.effectsReady = 'true';
  const frame = section.querySelector('.honor-frame');
  const canvas = section.querySelector('canvas');
  const toggle = section.querySelector('#honor-sound-toggle');
  const context = canvas.getContext('2d');
  const motion = matchMedia('(prefers-reduced-motion: reduce)');
  const particles = [];
  let width = 0, height = 0, raf = 0, lastFrame = 0, burstUntil = 0;
  let hovered = false, keyboardFocused = false, visible = true;
  let audio, soundEnabled = false, lastChime = -Infinity;
  function particle(burst = false) {
    return {x:burst ? width / 2 + (Math.random() - .5) * width * .25 : Math.random() * width,
      y:burst ? height * .65 : Math.random() * height,
      vx:(Math.random() - .5) * (burst ? 55 : 13), vy:18 + Math.random() * (burst ? 70 : 22),
      radius:.6 + Math.random() * 1.5, phase:Math.random() * Math.PI * 2};
  }
  function eligible() {
    return context && visible && !document.hidden && !motion.matches &&
      (hovered || keyboardFocused || performance.now() < burstUntil);
  }
  function stop() {
    cancelAnimationFrame(raf); raf = 0; lastFrame = 0;
    if (context) context.clearRect(0, 0, width, height);
  }
  function draw(now) {
    raf = 0;
    if (!eligible()) { stop(); return; }
    const dt = lastFrame ? Math.min((now - lastFrame) / 1000, .04) : .016;
    lastFrame = now;
    context.clearRect(0, 0, width, height);
    context.fillStyle = '#f4d77c';
    context.shadowColor = '#d4af37'; context.shadowBlur = 8;
    particles.forEach((p, i) => {
      p.x += p.vx * dt; p.y -= p.vy * dt;
      if (p.y < -6 || p.x < -6 || p.x > width + 6) particles[i] = p = particle();
      context.globalAlpha = .25 + .5 * (1 + Math.sin(now / 800 + p.phase)) / 2;
      context.beginPath(); context.arc(p.x, p.y, p.radius, 0, Math.PI * 2); context.fill();
    });
    context.globalAlpha = 1;
    raf = requestAnimationFrame(draw);
  }
  function update() {
    if (!eligible()) { stop(); return; }
    if (!particles.length) for (let i = 0; i < 32; i++) particles.push(particle());
    if (!raf) raf = requestAnimationFrame(draw);
  }
  function resize() {
    const bounds = frame.getBoundingClientRect();
    width = bounds.width; height = bounds.height;
    const ratio = Math.min(devicePixelRatio || 1, 2);
    canvas.width = Math.max(1, Math.round(width * ratio));
    canvas.height = Math.max(1, Math.round(height * ratio));
    if (context) context.setTransform(ratio, 0, 0, ratio, 0, 0);
    particles.length = 0; update();
  }
  async function chime() {
    if (!soundEnabled || !audio || document.hidden || performance.now() - lastChime < 700) return;
    lastChime = performance.now();
    try {
      if (audio.state !== 'running') await audio.resume();
      if (!soundEnabled || document.hidden) return;
      [523.25, 659.25, 783.99].forEach((frequency, index) => {
        const start = audio.currentTime + index * .065;
        const oscillator = audio.createOscillator();
        const gain = audio.createGain();
        oscillator.type = 'sine'; oscillator.frequency.value = frequency;
        gain.gain.setValueAtTime(.0001, start);
        gain.gain.exponentialRampToValueAtTime(.012, start + .045);
        gain.gain.exponentialRampToValueAtTime(.0001, start + .65);
        oscillator.connect(gain); gain.connect(audio.destination);
        oscillator.start(start); oscillator.stop(start + .7);
        oscillator.onended = () => { oscillator.disconnect(); gain.disconnect(); };
      });
    } catch { /* Audio is optional; visual interaction remains available. */ }
  }
  toggle.addEventListener('click', async () => {
    try {
      if (!audio) {
        const Audio = window.AudioContext || window.webkitAudioContext;
        if (!Audio) throw new Error('Web Audio unavailable');
        audio = new Audio();
      }
      soundEnabled = !soundEnabled;
      toggle.setAttribute('aria-pressed', String(soundEnabled));
      toggle.textContent = soundEnabled ? 'Mute soft sound' : 'Enable soft sound';
      if (soundEnabled) { await audio.resume(); chime(); }
      else await audio.suspend();
    } catch {
      soundEnabled = false; toggle.setAttribute('aria-pressed', 'false');
      toggle.textContent = 'Sound unavailable'; toggle.disabled = true;
    }
  });
  frame.addEventListener('pointerenter', event => {
    if (event.pointerType === 'touch') return;
    hovered = true; update(); chime();
  });
  frame.addEventListener('pointerleave', () => { hovered = false; update(); });
  frame.addEventListener('focus', () => { keyboardFocused = frame.matches(':focus-visible'); update(); chime(); });
  frame.addEventListener('blur', () => { keyboardFocused = false; update(); });
  frame.addEventListener('click', () => {
    burstUntil = performance.now() + 1000;
    particles.length = 0;
    for (let i = 0; i < 32; i++) particles.push(particle(true));
    update(); chime();
  });
  document.addEventListener('visibilitychange', update);
  motion.addEventListener('change', update);
  if ('ResizeObserver' in window) new ResizeObserver(resize).observe(frame);
  else window.addEventListener('resize', resize);
  if ('IntersectionObserver' in window) new IntersectionObserver(entries => {
    visible = entries[0].isIntersecting; update();
  }).observe(frame);
  window.addEventListener('pagehide', () => { stop(); if (audio) audio.suspend().catch(() => {}); });
  section.querySelector('.honor-photo').addEventListener('load', resize);
  resize();
})();
