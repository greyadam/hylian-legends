import { createPoller, DEFAULT_INTERVAL, DEFAULT_SERVER } from './widget.js';
const root = document.getElementById('guild-hall-relay');
if (root) {
const $ = id => root.querySelector('#relay-' + id);
const formatNumber = new Intl.NumberFormat();
const formatTime = new Intl.DateTimeFormat(undefined, { hour: 'numeric', minute: '2-digit', second: '2-digit' });
const labels = { online: 'Online', idle: 'Idle', dnd: 'Do not disturb', offline: 'Offline', unknown: 'Not reported' };
const phases = { live: 'Live polling', loading: 'Connecting', stale: 'Stale data', error: 'Disconnected' };
const PREVIEW_COUNT = 5;
let state;
let renderedKey;
let expandedMembers = false;
let controlTimer;
function element(tag, className, content) {
  const node = document.createElement(tag);
  if (className) node.className = className;
  if (content !== undefined) node.textContent = content;
  return node;
}

function icon(name) {
  const node = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  node.setAttribute('class', 'icon');
  node.setAttribute('aria-hidden', 'true');
  const use = document.createElementNS(node.namespaceURI, 'use');
  use.setAttribute('href', `#relay-i-${name}`);
  node.append(use);
  return node;
}

function avatar(member) {
  const badge = element('span', 'avatar');
  badge.setAttribute('aria-hidden', 'true');
  badge.dataset.tone = String(member.name.codePointAt(0) % 3);
  badge.append(element('span', '', [...member.name][0].toLocaleUpperCase()));
  if (member.avatar) {
    const img = element('img');
    img.alt = '';
    img.width = 32;
    img.height = 32;
    img.loading = 'lazy';
    img.decoding = 'async';
    img.referrerPolicy = 'no-referrer';
    img.addEventListener('error', () => img.remove(), { once: true });
    img.src = member.avatar;
    badge.append(img);
  }
  const dot = element('span', 'avatar-dot');
  dot.dataset.status = member.status;
  badge.append(dot);
  return badge;
}

function memberRow(member) {
  const row = element('li', 'row');
  const status = element('span', 'row-status member-status', labels[member.status]);
  status.dataset.presence = member.status;
  row.append(avatar(member), element('span', 'row-label', member.name), status);
  return row;
}

function channelRow(channel) {
  const count = channel.occupants.length;
  const row = element('li', count ? 'channel active' : 'channel');
  const line = element('div', 'channel-line');
  const name = element('div', 'channel-text');
  name.append(icon('voice'), element('h3', 'row-label', channel.name));
  line.append(name, element('span', 'row-status', count ? `${formatNumber.format(count)} visible` : 'None reported'));
  row.append(line);
  if (count) {
    const people = element('ul', 'occupant-list');
    for (const member of channel.occupants) people.append(memberRow(member));
    row.append(people);
  }
  return row;
}

function list(items, render) {
  const container = element('ul', 'panel-list');
  for (const item of items) container.append(render(item));
  return container;
}

function empty(title, detail) {
  const container = element('div', 'empty');
  container.append(element('strong', '', title), element('p', '', detail));
  return container;
}

function skeleton(member) {
  const container = element('div', '');
  container.setAttribute('aria-hidden', 'true');
  for (let i = 0; i < 3; i += 1) {
    const row = element('div', 'row');
    row.append(element('span', `placeholder ${member ? 'round' : 'voice'}`), element('span', 'placeholder'), element('span', 'placeholder short'));
    container.append(row);
  }
  return container;
}

function renderMembers(data) {
  const members = data?.members || [];
  const toggle = $('member-toggle');
  $('member-actions').hidden = members.length <= PREVIEW_COUNT;
  toggle.setAttribute('aria-expanded', String(expandedMembers));
  toggle.replaceChildren(document.createTextNode(expandedMembers ? 'Show fewer' : `Show all ${formatNumber.format(members.length)}`), icon('chevron'));
  if (!data) {
    $('member-content').replaceChildren(state.phase === 'loading' ? skeleton(true) : empty('Members unavailable', 'The guild’s member preview will appear when Discord responds.'));
  } else {
    $('member-content').replaceChildren(members.length
      ? list(expandedMembers ? members : members.slice(0, PREVIEW_COUNT), memberRow)
      : empty('No members reported', 'Discord didn’t include member profiles in this response.'));
  }
}

function renderPanels(data, phase) {
  const loading = !data && phase === 'loading';
  $('voice-content').setAttribute('aria-busy', String(loading));
  $('member-content').setAttribute('aria-busy', String(loading));
  $('voice-tag').textContent = data ? `${formatNumber.format(data.activeTotal)} active` : '–';
  $('member-tag').textContent = data ? `${formatNumber.format(data.members.length)} in preview` : '–';
  $('voice-content').replaceChildren(data
    ? (data.channels.length ? list(data.channels, channelRow) : empty('No public channels reported', 'Discord only lists voice and stage channels visible to everyone.'))
    : (loading ? skeleton(false) : empty('Voice channels unavailable', 'Public voice channels will appear when Discord responds.')));
  renderMembers(data);
}

function refreshControl() {
  clearTimeout(controlTimer);
  const remaining = state ? state.nextManualAt - Date.now() : 0;
  $('refresh-button').disabled = !state?.serverId || state.checking || remaining > 0;
  if (remaining > 0 && !state.checking) controlTimer = setTimeout(refreshControl, Math.min(remaining + 15, 2_147_483_647));
}

function render(next) {
  if (state?.serverId !== next.serverId) expandedMembers = false;
  const previousCheck = state?.checkedAt;
  state = next;
  const { data, phase, checkedAt, checking, interval, error } = state;
  $('monitor').dataset.checking = String(checking);
  $('monitor').dataset.phase = phase;
  const motion = !window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (motion && checkedAt && previousCheck !== checkedAt) {
    const sweep = root.querySelector('.scope-sweep');
    if (sweep.getClientRects().length) sweep.animate([
      { transform: 'translateX(-100%)', opacity: 0 },
      { transform: 'translateX(-16%)', opacity: .8, offset: .12 },
      { transform: 'translateX(496%)', opacity: .8, offset: .86 },
      { transform: 'translateX(580%)', opacity: 0 },
    ], { duration: 1100 });
  }
  $('connection-status').dataset.state = phase;
  $('connection-label').textContent = phases[phase];
  $('server-name').textContent = data?.name ?? (phase === 'loading' ? 'Connecting to Discord' : 'Server unavailable');
  for (const [id, number] of [['online-number', data?.online], ['voice-number', data?.voiceTotal], ['active-number', data?.activeTotal]]) {
    const metric = $(id);
    const value = number === undefined ? '–' : formatNumber.format(number);
    if (metric.textContent === value) continue;
    const wasReady = metric.textContent !== '–' && value !== '–';
    metric.textContent = value;
    if (wasReady && motion) {
      metric.animate([{ opacity: .5, transform: 'translateY(2px)' }, { opacity: 1, transform: 'translateY(0)' }], { duration: 180, easing: 'ease-out' });
    }
  }
  const cadence = interval === 120 ? 'every 2 min' : `every ${interval}s`;
  $('last-checked-text').textContent = checkedAt
    ? `${checking ? 'Checking now' : `Last checked ${formatTime.format(checkedAt)}`} · ${phase === 'stale' && !checking ? 'last good snapshot' : cadence}`
    : (checking || phase === 'loading' ? 'Waiting for first check' : 'No successful check yet');
  const message = error ? (data ? `Showing the last successful snapshot. ${error}` : error) : '';
  if ($('feed-message').textContent !== message) $('feed-message').textContent = message;
  $('feed-message').hidden = !message;
  const key = data ? `${state.serverId}:${JSON.stringify(data)}` : `${state.serverId}:${phase}`;
  if (key !== renderedKey) {
    renderedKey = key;
    renderPanels(data, phase);
  }
  refreshControl();
}

const poller = createPoller(render);
$('refresh-button').addEventListener('click', poller.refresh);
$('member-toggle').addEventListener('click', () => {
 expandedMembers = !expandedMembers;
 renderMembers(state.data);
});
poller.connect(DEFAULT_SERVER, DEFAULT_INTERVAL);
}
