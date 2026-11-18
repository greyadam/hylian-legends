const API_ROOT = 'https://discord.com/api/v10/guilds';
const AVATAR_HOSTS = new Set(['cdn.discordapp.com', 'media.discordapp.net', 'cdn.discord.com']);
export const DEFAULT_SERVER = '304897700338597889';
export const INTERVALS = [15, 30, 60, 120];
export const DEFAULT_INTERVAL = 30;
export const MANUAL_COOLDOWN = 4000;

export function isServerId(value) {
  return /^[1-9]\d{16,19}$/.test(value) && BigInt(value) <= 18446744073709551615n;
}

function safeHttpsUrl(value, allowedHosts) {
  try {
    const url = new URL(value);
    if (url.protocol === 'https:' && !url.username && !url.password && !url.port && allowedHosts.has(url.hostname)) return url.href;
  } catch { /* Missing or invalid URL. */ }
  return null;
}

function asLabel(value, fallback) {
  return typeof value === 'string' && value.trim() ? value.trim().slice(0, 160) : fallback;
}

export function parseWidget(data, serverId) {
  if (!data || data.id !== serverId || typeof data.name !== 'string'
      || !Number.isSafeInteger(data.presence_count) || data.presence_count < 0
      || !Array.isArray(data.channels) || !Array.isArray(data.members)) {
    throw new WidgetError('invalid', 'Discord returned a widget response this page couldn’t read.');
  }
  const channels = new Map();
  for (const entry of data.channels) {
    if (typeof entry?.id !== 'string' || channels.has(entry.id)) continue;
    channels.set(entry.id, {
      id: entry.id,
      name: asLabel(entry.name, 'Voice channel'),
      position: Number.isSafeInteger(entry.position) ? entry.position : Number.MAX_SAFE_INTEGER,
      occupants: [],
    });
  }
  const members = [];
  for (const entry of data.members) {
    if (!entry || typeof entry.username !== 'string') continue;
    const status = ['online', 'idle', 'dnd', 'offline'].includes(entry.status) ? entry.status : 'unknown';
    const member = {
      name: asLabel(entry.username, 'Discord member'),
      avatar: safeHttpsUrl(entry.avatar_url, AVATAR_HOSTS),
      status,
    };
    if (status !== 'offline') members.push(member);
    if (typeof entry.channel_id === 'string') channels.get(entry.channel_id)?.occupants.push(member);
  }
  const channelRows = [...channels.values()].sort((a, b) =>
    Number(b.occupants.length > 0) - Number(a.occupants.length > 0) || a.position - b.position || a.id.localeCompare(b.id));
  return {
    name: asLabel(data.name, 'Discord server'),
    online: data.presence_count,
    voiceTotal: channelRows.reduce((total, channel) => total + channel.occupants.length, 0),
    activeTotal: channelRows.filter(channel => channel.occupants.length).length,
    members,
    channels: channelRows,
  };
}

class WidgetError extends Error {
  constructor(kind, message, { permanent = false, retryMs = 0, global = false } = {}) {
    super(message);
    this.kind = kind;
    this.permanent = permanent;
    this.retryMs = retryMs;
    this.global = global;
  }
}

function retryDelay(response, body) {
  const seconds = [];
  if (typeof body?.retry_after === 'number' && Number.isFinite(body.retry_after)) seconds.push(body.retry_after);
  const header = response.headers.get('Retry-After');
  if (header) {
    const numeric = Number(header);
    if (Number.isFinite(numeric)) seconds.push(numeric);
    else if (Number.isFinite(Date.parse(header))) seconds.push((Date.parse(header) - Date.now()) / 1000);
  }
  return (seconds.length ? Math.max(1, ...seconds) : 60) * 1000;
}

export async function fetchWidget(serverId, signal) {
  if (!isServerId(serverId)) throw new TypeError('Invalid Discord server ID.');
  const response = await fetch(`${API_ROOT}/${serverId}/widget.json`, {
    signal,
    credentials: 'omit',
    cache: 'no-store',
    referrerPolicy: 'no-referrer',
  });
  if (response.ok) {
    let body;
    try { body = await response.json(); } catch {
      throw new WidgetError('invalid', 'Discord returned a widget response this page couldn’t read.');
    }
    return parseWidget(body, serverId);
  }
  if (response.status === 429) {
    const body = await response.json().catch(() => null);
    throw new WidgetError('rate', 'Discord is limiting requests. Polling will resume automatically.', {
      retryMs: retryDelay(response, body), global: body?.global === true,
    });
  }
  if (response.status === 403) {
    throw new WidgetError('disabled', 'This server’s public widget is unavailable. Ask a server admin to enable it in Server Settings → Widget, then refresh.', { permanent: true });
  }
  if (response.status === 404) {
    throw new WidgetError('not-found', 'Discord couldn’t find a widget for this server ID. Check the ID and try again.', { permanent: true });
  }
  throw new WidgetError('http', `Discord returned an error (${response.status}). The widget will try again.`);
}

export function createPoller(onChange) {
  let state = null;
  let automaticTimer;
  let inFlight;
  let nextPollAt = Infinity;
  let failures = 0;
  let globalLimit = 0;
  const rateLimits = new Map();

  function change(patch) {
    state = { ...state, ...patch };
    onChange(state);
  }

  function rateUntil() {
    return Math.max(globalLimit, rateLimits.get(state?.serverId) || 0);
  }

  function schedule() {
    clearTimeout(automaticTimer);
    if (document.hidden || inFlight || !Number.isFinite(nextPollAt)) return;
    automaticTimer = setTimeout(poll, Math.min(2_147_483_647, Math.max(0, nextPollAt - Date.now())));
  }

  async function poll() {
    if (!state || document.hidden || inFlight) return;
    const limit = rateUntil();
    if (limit > Date.now()) {
      nextPollAt = Math.max(limit, Number.isFinite(nextPollAt) ? nextPollAt : 0);
      change({ error: 'Discord is limiting requests. Polling will resume automatically.', phase: state.data ? 'stale' : 'error', nextManualAt: limit });
      schedule();
      return;
    }
    if (nextPollAt > Date.now()) {
      schedule();
      return;
    }
    const controller = new AbortController();
    inFlight = controller;
    const serverId = state.serverId;
    let timedOut = false;
    const timeout = setTimeout(() => {
      timedOut = true;
      controller.abort();
    }, 12000);
    clearTimeout(automaticTimer);
    change({ checking: true, nextManualAt: Date.now() + MANUAL_COOLDOWN, phase: state.data ? state.phase : 'loading' });
    try {
      const data = await fetchWidget(serverId, controller.signal);
      if (inFlight !== controller) return;
      failures = 0;
      nextPollAt = Date.now() + state.interval * 1000;
      change({ data, checkedAt: new Date(), error: '', phase: 'live' });
    } catch (error) {
      if (inFlight !== controller) return;
      failures += 1;
      const retryMs = error instanceof WidgetError ? error.retryMs : 0;
      const errorAt = Date.now();
      if (retryMs) {
        if (error.global) globalLimit = errorAt + retryMs;
        else rateLimits.set(serverId, errorAt + retryMs);
      }
      const backoffMs = Math.min(300000, state.interval * 1000 * (2 ** Math.min(failures - 1, 5)));
      nextPollAt = error.permanent ? Infinity : errorAt + Math.max(retryMs, backoffMs);
      const message = error instanceof WidgetError ? error.message : timedOut
        ? 'Discord didn’t respond in time. The widget will try again.'
        : 'Couldn’t reach Discord. Check your connection; the widget will try again.';
      change({ error: message, phase: state.data ? 'stale' : 'error', nextManualAt: Math.max(state.nextManualAt, rateUntil()) });
    } finally {
      clearTimeout(timeout);
      if (inFlight === controller) {
        inFlight = undefined;
        change({ checking: false });
        schedule();
      }
    }
  }

  function connect(serverId, interval) {
    if (!isServerId(serverId) || !INTERVALS.includes(interval)) throw new TypeError('Invalid widget settings.');
    if (state?.serverId === serverId) {
      if (state.interval !== interval) {
        if (!inFlight && state.phase === 'live') nextPollAt = Date.now() + interval * 1000;
        change({ interval });
        schedule();
      }
      if (state.phase === 'error' || state.phase === 'stale') refresh();
      return;
    }
    inFlight?.abort();
    inFlight = undefined;
    clearTimeout(automaticTimer);
    failures = 0;
    nextPollAt = Date.now();
    change({ serverId, interval, data: null, checkedAt: null, error: '', phase: 'loading', checking: false, nextManualAt: 0 });
    void poll();
  }

  function refresh() {
    if (!state || inFlight || document.hidden || Date.now() < Math.max(state.nextManualAt, rateUntil())) return;
    nextPollAt = Date.now();
    void poll();
  }

  document.addEventListener('visibilitychange', schedule);
  return { connect, refresh };
}
