import { ICON_DATA } from "../icon_data.js";
import { POWER_ICON_SRC } from "../power_icon.js";

import { NAV_ICON_DATA } from "../nav_icons.js";
import { NPC_KEY_GIFTS, KEY_ICON_DATA, KEY_NAMES, DELIVERY_FRIENDSHIP_POINTS, BLOSSOM_BONDING_RANKS, DEFAULT_FLOWER_POINTS, BUMPKIN_FLOWER_BONUSES } from "../npcgift_data.js";

let NPC_ICONS = {};

let COIN_ICON = "";

let escapeHtml = x => String(x);

let isSkillActive = () => false;

let getAscensionRank = () => 0;

let farmSyncExtractGameState = () => null;

let getIcon = () => "";

let inprogressMod = null;

let computeFlowerChainTime = () => ({
  totalSec: 0
});

let openPicker = null;

const flowerTimeCache = {};

const STORE_KEY = "npcgift_v1";

const NPC_NAMES = Object.keys(NPC_KEY_GIFTS);

const FLOWER_NAMES = Object.keys(DEFAULT_FLOWER_POINTS);

const NPC_FALLBACK = {
  blacksmith: "⚒️",
  victoria: "👑"
};

let state = null;

let rootEl = null;

let bound = false;

function loadState() {
  if (state) return state;
  let raw = null;
  try {
    raw = JSON.parse(localStorage.getItem(STORE_KEY) || "null");
  } catch (e) {
    raw = null;
  }
  const s = raw && typeof raw === "object" ? raw : {};
  const on = typeof s.boostOn === "boolean" ? s.boostOn : isSkillActive("skill_blossom_bonding");
  const rank = Math.min(3, Math.max(1, Number(s.rank) || getAscensionRank("skill_blossom_bonding") || 1));
  state = {
    boostOn: on,
    rank: rank,
    selected: s.selected && typeof s.selected === "object" ? s.selected : {},
    expanded: s.expanded && typeof s.expanded === "object" ? s.expanded : {},
    npc: s.npc && typeof s.npc === "object" ? s.npc : {},
    delivery: s.delivery !== false,
    gift: s.gift !== false,
    perDay: Math.min(20, Math.max(0, Number(s.perDay) || 1))
  };
  return state;
}

function saveState() {
  try {
    localStorage.setItem(STORE_KEY, JSON.stringify(state));
  } catch (e) {}
}

function npcData(name) {
  const st = loadState();
  if (!st.npc[name]) st.npc[name] = {
    cur: 0,
    claimed: 0,
    flower: null,
    useFinal: false,
    noDelivery: false
  };
  return st.npc[name];
}

function titleCase(name) {
  return name.replace(/\b[a-z]/g, c => c.toUpperCase());
}

function npcIcon(name) {
  const src = NPC_ICONS[name] || (name === "betty" ? NAV_ICON_DATA.betty : "");
  if (src) return `<img class="npcg-icon" src="${src}" alt="" draggable="false">`;
  return `<span class="npcg-icon npcg-icon-emoji">${NPC_FALLBACK[name] || "🙂"}</span>`;
}

function keyImg(name) {
  return `<img class="npcg-key" src="${KEY_ICON_DATA[name]}" alt="${name}" title="${name}" draggable="false">`;
}

function fmt(n) {
  return Math.round(n).toLocaleString("en-US");
}

function boostFlat() {
  const st = loadState();
  return st.boostOn ? BLOSSOM_BONDING_RANKS[st.rank - 1] : 0;
}

function flowerPoints(npc, flower) {
  const bonus = (BUMPKIN_FLOWER_BONUSES[npc] || {})[flower] || 0;
  return DEFAULT_FLOWER_POINTS[flower] + boostFlat() + bonus;
}

function bestFlower(npc) {
  let best = FLOWER_NAMES[0];
  FLOWER_NAMES.forEach(f => {
    if (flowerPoints(npc, f) > flowerPoints(npc, best)) best = f;
  });
  return best;
}

function chosenFlower(npc) {
  const d = npcData(npc);
  return d.flower && DEFAULT_FLOWER_POINTS[d.flower] ? d.flower : bestFlower(npc);
}

function pointsPerDay(npc) {
  const st = loadState();
  let p = 0;
  if (st.delivery && !npcData(npc).noDelivery) p += st.perDay * DELIVERY_FRIENDSHIP_POINTS;
  if (st.gift) p += flowerPoints(npc, chosenFlower(npc));
  return p;
}

function hasKey(items) {
  return KEY_NAMES.some(k => items && items[k]);
}

function milestones(npc, claimed, maxPoints) {
  const g = NPC_KEY_GIFTS[npc];
  const list = g.planned.filter(x => x.p > claimed).sort((a, b) => a.p - b.p).map(x => ({
    t: x.p,
    items: x.items,
    coins: x.coins,
    w: x.w,
    r: x.r,
    repeat: false
  }));
  const lastPlanned = g.planned.reduce((m, x) => Math.max(m, x.p), 0);
  const base = Math.max(claimed, lastPlanned);
  for (let n = 1; ; n++) {
    const t = base + n * g.repeats.p;
    if (t > maxPoints && n > 1) break;
    list.push({
      t: t,
      items: g.repeats.items,
      coins: g.repeats.coins,
      w: [],
      r: null,
      repeat: true
    });
    if (n > 5000) break;
  }
  return list;
}

function keysByDay(list, cur, ppd, days) {
  const out = {};
  KEY_NAMES.forEach(k => out[k] = 0);
  const limit = cur + ppd * days;
  list.forEach(m => {
    if (m.t <= limit) KEY_NAMES.forEach(k => {
      if (m.items[k]) out[k] += m.items[k];
    });
  });
  return out;
}

function daysTo(t, cur, ppd) {
  if (t <= cur) return 0;
  if (ppd <= 0) return Infinity;
  return Math.ceil((t - cur) / ppd);
}

function analyse(npc) {
  const d = npcData(npc);
  const cur = Math.max(0, Number(d.cur) || 0);
  const claimed = Math.max(0, Number(d.claimed) || 0);
  const ppd = pointsPerDay(npc);
  const list = milestones(npc, claimed, cur + Math.max(ppd, 1) * 400);
  const baseNextKey = list.find(m => hasKey(m.items));
  const nextKey = d.useFinal ? list.find(m => m.repeat) || baseNextKey : baseNextKey;
  const nextAny = list[0];
  const keyList = d.useFinal ? list.filter(m => m.repeat) : list;
  const week = keysByDay(keyList, cur, ppd, 7);
  const month = keysByDay(keyList, cur, ppd, 30);
  return {
    cur: cur,
    claimed: claimed,
    ppd: ppd,
    list: list,
    nextKey: nextKey,
    baseNextKey: baseNextKey,
    useFinal: !!d.useFinal,
    nextAny: nextAny,
    keyDays: nextKey ? daysTo(nextKey.t, cur, ppd) : Infinity,
    anyDays: nextAny ? daysTo(nextAny.t, cur, ppd) : Infinity,
    week: week,
    month: month
  };
}

function daysText(d) {
  if (d === Infinity) return "—";
  if (d === 0) return "Ready now";
  return d + (d === 1 ? " day" : " days");
}

function rewardHtml(m) {
  const parts = [];
  KEY_NAMES.forEach(k => {
    if (m.items[k]) parts.push(`<span class="npcg-rw">${keyImg(k)}×${m.items[k]}</span>`);
  });
  Object.keys(m.items).forEach(k => {
    if (KEY_NAMES.indexOf(k) === -1) parts.push(`<span class="npcg-rw">${getIcon(k)}×${m.items[k]}</span>`);
  });
  if (m.coins) parts.push(`<span class="npcg-rw">${COIN_ICON}×${fmt(m.coins)}</span>`);
  (m.w || []).forEach(w => parts.push(`<span class="npcg-rw npcg-rw-text">${escapeHtml(w)}</span>`));
  if (m.r) parts.push(`<span class="npcg-rw npcg-rw-text">Recipe: ${escapeHtml(m.r)}</span>`);
  return parts.join("");
}

function keyBadges(npc) {
  const g = NPC_KEY_GIFTS[npc];
  const set = {};
  g.planned.forEach(x => KEY_NAMES.forEach(k => {
    if (x.items[k]) set[k] = 1;
  }));
  KEY_NAMES.forEach(k => {
    if (g.repeats.items[k]) set[k] = 1;
  });
  return KEY_NAMES.filter(k => set[k]).map(keyImg).join("");
}

function cycleInfo(a, npc) {
  if (!a.nextKey) return null;
  const start = a.nextKey.repeat ? a.nextKey.t - NPC_KEY_GIFTS[npc].repeats.p : 0;
  const span = Math.max(1, a.nextKey.t - start);
  const done = Math.max(0, Math.min(span, a.cur - start));
  const remain = Math.max(0, a.nextKey.t - a.cur);
  return {
    span: span,
    done: done,
    remain: remain,
    pct: Math.max(0, Math.min(100, done / span * 100))
  };
}

function cycleDaysText(span, ppd) {
  if (ppd <= 0) return "—";
  const d = Math.max(1, Math.ceil(span / ppd - 1e-9));
  return `${d} ${d === 1 ? "day" : "days"}`;
}

function cycleFieldsHtml(a, npc) {
  const c = cycleInfo(a, npc);
  if (!c) return "";
  return `<div class="npcg-fields">
      <div class="npcg-field"><span>Points this cycle</span><div class="npcg-box guro-frame">${fmt(c.done)}/${fmt(c.span)} pts</div></div>
      <div class="npcg-field"><span>Points needed</span><div class="npcg-box guro-frame">${fmt(c.remain)} pts</div></div>
    </div>
    <div class="npcg-days-row">
      <div class="npcg-field npcg-field-fit"><span>Days to fill cycle</span><div class="npcg-box guro-frame">${cycleDaysText(c.span, a.ppd)}</div></div>
      <div class="npcg-field npcg-field-fit"><span>Days needed</span><div class="npcg-box guro-frame">${c.remain <= 0 ? "Ready" : cycleDaysText(c.remain, a.ppd)}</div></div>
    </div>`;
}

function progressHtml(a, npc) {
  const c = cycleInfo(a, npc);
  if (!c) return "";
  return `<div class="npcg-bar guro-frame"><div class="npcg-bar-fill" style="width:${c.pct}%"></div><div class="npcg-bar-text">${fmt(a.cur)} / ${fmt(a.nextKey.t)} pts</div></div>`;
}

function nextRewardLine(a) {
  if (!a.nextAny) return "";
  if (a.nextKey && a.nextAny === a.nextKey) return "";
  return `<div class="npcg-next"><span class="npcg-next-label">Next reward at ${fmt(a.nextAny.t)} pts</span><span class="npcg-rws">${rewardHtml(a.nextAny)}</span></div>`;
}

function finalToggleHtml(a, npc) {
  if (!a.useFinal && a.baseNextKey && a.baseNextKey.repeat) return "";
  return `<label class="npcg-final" data-stop="1"><span>Use Final reward</span><input type="checkbox" data-npc-final="${escapeHtml(npc)}" ${a.useFinal ? "checked" : ""} aria-label="Use final reward for ${escapeHtml(titleCase(npc))}"></label>`;
}

function npcCardHtml(npc) {
  const st = loadState();
  const a = analyse(npc);
  const g = NPC_KEY_GIFTS[npc];
  const open = !!st.expanded[npc];
  const checked = !!st.selected[npc];
  const planned = g.planned.slice().sort((x, y) => x.p - y.p);
  const rows = planned.map(x => `<div class="npcg-lvl${hasKey(x.items) ? " has-key" : ""}${x.p <= a.claimed ? " is-done" : ""}"><span class="npcg-lvl-pts">${fmt(x.p)} pts</span><span class="npcg-rws">${rewardHtml({
    items: x.items,
    coins: x.coins,
    w: x.w,
    r: x.r
  })}</span></div>`).join("");
  const rep = `<div class="npcg-lvl has-key is-repeat"><span class="npcg-lvl-pts">Every ${fmt(g.repeats.p)} pts</span><span class="npcg-rws">${rewardHtml({
    items: g.repeats.items,
    coins: g.repeats.coins,
    w: [],
    r: null
  })}</span></div>`;
  const total = `<div class="npcg-total">Running points: <b>${fmt(a.cur)}</b> · Repeat every <b>${fmt(g.repeats.p)}</b> pts</div>`;
  return `<div class="npcg-item betty-boost-row guro-frame${checked ? " is-on" : ""}" data-npc="${escapeHtml(npc)}">
    <div class="npcg-item-head">
      ${npcIcon(npc)}
      <div class="npcg-item-main">
        <div class="npcg-item-name">${escapeHtml(titleCase(npc))}<span class="npcg-badges">${keyBadges(npc)}</span></div>
        <div class="npcg-item-sub">Next key: ${daysText(a.keyDays)}${a.nextKey ? " · at " + fmt(a.nextKey.t) + " pts" : ""}</div>
      </div>
      <label class="bg-sim-check" data-stop="1"><input type="checkbox" data-npc-check="${escapeHtml(npc)}" ${checked ? "checked" : ""} aria-label="Select ${escapeHtml(titleCase(npc))}"></label>
    </div>
    ${nextRewardLine(a)}
    ${finalToggleHtml(a, npc)}
    <label class="npcg-final" data-stop="1"><span>Exclude Delivery</span><input type="checkbox" data-npc-nodelivery="${escapeHtml(npc)}" ${npcData(npc).noDelivery ? "checked" : ""} aria-label="Exclude delivery for ${escapeHtml(titleCase(npc))}"></label>
    <div class="npcg-rewards-toggle${open ? " is-open" : ""}" role="button" tabindex="0" data-npc-toggle="${escapeHtml(npc)}"><span>Rewards</span><img class="bg-sim-chev" src="${ICON_DATA["chevron_down.png"]}" alt=""></div>
    ${open ? `<div class="npcg-levels npcg-slide">${rows}${rep}${total}</div>` : ""}
  </div>`;
}

function boostHtml() {
  const st = loadState();
  const pips = [ 1, 2, 3 ].map(r => `<button type="button" class="fd-lb-tab bg-rank-pip${st.rank === r ? " active" : ""}" data-rank="${r}" aria-label="Rank ${r}">${r}</button>`).join("");
  return `<div class="betty-boost-box">
      <div class="betty-boost-label"><img class="npcg-power-icon" src="${POWER_ICON_SRC}" alt="">Boost</div>
      <div class="betty-boost-row">
        <div class="betty-boost-row-main">
          <div class="betty-boost-row-name">Blossom Bonding</div>
          <div class="betty-boost-row-desc">+${BLOSSOM_BONDING_RANKS[st.rank - 1]} friendship points on every flower gifted to an NPC</div>
          <span class="bg-rank-picker"><span class="bg-rank-label">Rank</span>${pips}</span>
        </div>
        <label class="bg-sim-check"><input type="checkbox" id="npcgBoostToggle" aria-label="Blossom Bonding"${st.boostOn ? " checked" : ""}></label>
      </div>
    </div>`;
}

function fmtDur(sec) {
  sec = Math.max(0, Math.round(sec));
  const d = Math.floor(sec / 86400);
  const h = Math.floor(sec % 86400 / 3600);
  const m = Math.floor(sec % 3600 / 60);
  const s = sec % 60;
  const parts = [];
  if (d) parts.push(`${d} ${d === 1 ? "Day" : "Days"}`);
  if (h) parts.push(`${h} ${h === 1 ? "hr" : "hrs"}`);
  if (m) parts.push(`${m}m`);
  if (s || !parts.length) parts.push(`${s}s`);
  return parts.join(" ");
}

function flowerTime(f) {
  if (flowerTimeCache[f] == null) {
    let sec = 0;
    try {
      sec = computeFlowerChainTime(f).totalSec || 0;
    } catch (e) {
      sec = 0;
    }
    flowerTimeCache[f] = fmtDur(sec);
  }
  return flowerTimeCache[f];
}

function flowerSelectHtml(npc) {
  const sel = chosenFlower(npc);
  const sorted = FLOWER_NAMES.slice().sort((x, y) => flowerPoints(npc, y) - flowerPoints(npc, x) || x.localeCompare(y));
  const isOpen = openPicker === npc;
  const opts = sorted.map(f => `<div class="flower-cross-option${f === sel ? " active" : ""}" data-npc-flower-opt="${escapeHtml(npc)}" data-flower="${escapeHtml(f)}">${getIcon(f)}<span class="flower-cross-label">${escapeHtml(f)} <span class="flower-cross-kind">(+${flowerPoints(npc, f)})</span></span>${(BUMPKIN_FLOWER_BONUSES[npc] || {})[f] ? `<span class="npcg-fav-badge guro-frame">FAV</span>` : ""}</div>`).join("");
  return `<div class="flower-cross-picker npcg-picker">
      <button type="button" class="flower-cross-btn" data-npc-picker-btn="${escapeHtml(npc)}">${getIcon(sel)}<span class="flower-cross-label">${escapeHtml(sel)} <span class="flower-cross-kind">(+${flowerPoints(npc, sel)})</span></span><span class="seed-picker-chev">${isOpen ? "▴" : "▾"}</span></button>
      <div class="npcg-field npcg-ftime-field"><span>Time to grow</span><div class="npcg-box guro-frame">${flowerTime(sel)}</div></div>
      ${isOpen ? `<div class="flower-cross-menu">${opts}</div>` : ""}
    </div>`;
}

function calcRowHtml(npc) {
  const d = npcData(npc);
  const a = analyse(npc);
  const st = loadState();
  return `<div class="npcg-calc-row guro-frame">
    <div class="npcg-calc-head">${npcIcon(npc)}<div class="npcg-item-name">${escapeHtml(titleCase(npc))}<span class="npcg-badges">${keyBadges(npc)}</span></div><div class="npcg-ppd">+${fmt(a.ppd)} pts/day</div></div>
    <div class="npcg-fields">
      <label class="npcg-field"><span>Current points</span><input type="number" min="0" class="npcg-input guro-frame" value="${d.cur || 0}" readonly tabindex="-1"></label>
      <label class="npcg-field"><span>Last claimed at</span><input type="number" min="0" class="npcg-input guro-frame" value="${d.claimed || 0}" readonly tabindex="-1"></label>
    </div>
    ${cycleFieldsHtml(a, npc)}
    ${progressHtml(a, npc)}
    ${st.gift ? `<div class="npcg-flower-row">${flowerSelectHtml(npc)}</div>` : ""}
    <div class="npcg-calc-stats">
      <div><span>Next key</span><b>${daysText(a.keyDays)}</b></div>
      <div><span>Next reward</span><b>${daysText(a.anyDays)}</b></div>
      <div><span>Keys / 7d</span><b>${keyTotalsInline(a.week)}</b></div>
      <div><span>Keys / 30d</span><b>${keyTotalsInline(a.month)}</b></div>
    </div>
  </div>`;
}

function keyTotalsInline(t) {
  const parts = KEY_NAMES.filter(k => t[k] > 0).map(k => `<span class="npcg-rw">${keyImg(k)}×${t[k]}</span>`);
  return parts.length ? parts.join("") : "0";
}

function calcHtml() {
  const st = loadState();
  const picked = NPC_NAMES.filter(n => st.selected[n]);
  const week = {};
  const month = {};
  KEY_NAMES.forEach(k => {
    week[k] = 0;
    month[k] = 0;
  });
  let soonest = Infinity;
  picked.forEach(n => {
    const a = analyse(n);
    KEY_NAMES.forEach(k => {
      week[k] += a.week[k];
      month[k] += a.month[k];
    });
    if (a.keyDays < soonest) soonest = a.keyDays;
  });
  const keyGrid = obj => `<div class="npcg-keygrid">${KEY_NAMES.map(k => `<div class="npcg-keycell guro-frame">${keyImg(k)}<b>${obj[k]}</b><span>${k}</span></div>`).join("")}</div>`;
  const summary = picked.length ? `<div class="dig-data-box guro-frame npcg-summary">
      <div class="dig-data-label">Keys from selected NPCs</div>
      <div class="npcg-sum-title">7 days</div>${keyGrid(week)}
      <div class="npcg-sum-title">30 days (month)</div>${keyGrid(month)}
      <div class="npcg-sum-line">First key drops in <b>${daysText(soonest)}</b></div>
    </div>` : `<div class="dig-empty">Tick one or more NPCs on the left to see how many keys you get.</div>`;
  const keyCalc = `<div class="dig-data-box guro-frame">
      <div class="dig-data-label">Key calculator</div>
      <div class="npcg-modes">
        <label class="npcg-mode guro-frame"><input type="checkbox" id="npcgDelivery" ${st.delivery ? "checked" : ""}><span>Delivery <small>(+${DELIVERY_FRIENDSHIP_POINTS} pts each)</small></span></label>
        <label class="npcg-mode guro-frame"><input type="checkbox" id="npcgGift" ${st.gift ? "checked" : ""}><span>Gift flowers <small>(1 per day)</small></span></label>
        <label class="npcg-field npcg-perday"><span>Deliveries per NPC per day</span><input type="number" min="0" max="20" class="npcg-input guro-frame" id="npcgPerDay" value="${st.perDay}"></label>
      </div>
      <div class="npcg-actions"><button type="button" class="es-mode-btn" id="npcgSelectAll">${picked.length === NPC_NAMES.length ? "Clear all" : "Select all"}</button></div>
    </div>`;
  return `${isSynced() ? "" : `<div class="dig-empty">Sync a Farm ID to load your NPC points automatically.</div>`}
    <div class="npcg-calc-wrap guro-frame"><div class="npcg-calc-top">${keyCalc}${summary}</div></div>
    <div class="npcg-rows">${picked.map(calcRowHtml).join("")}</div>`;
}

function render() {
  if (!rootEl) return;
  const scroll = window.scrollY;
  rootEl.innerHTML = `<div class="npcg-wrap">
    ${boostHtml()}
    <div class="npcg-cols">
      <div class="dig-data-box guro-frame npcg-list"><div class="dig-data-label">NPCs that give keys</div>${NPC_NAMES.map(npcCardHtml).join("")}</div>
      <div class="npcg-calc">${calcHtml()}</div>
    </div>
  </div>`;
  window.scrollTo(0, scroll);
}

function isSynced() {
  const raw = inprogressMod ? inprogressMod.farmPanelGameState : null;
  return !!(raw && farmSyncExtractGameState(raw));
}

function importFarm() {
  const raw = inprogressMod ? inprogressMod.farmPanelGameState : null;
  const g = raw ? farmSyncExtractGameState(raw) : null;
  if (!g) return false;
  const st = loadState();
  const lvl = g.bumpkin && g.bumpkin.skills ? Number(g.bumpkin.skills["Blossom Bonding"]) || 0 : 0;
  st.boostOn = lvl > 0;
  if (lvl > 0) st.rank = Math.min(3, lvl);
  NPC_NAMES.forEach(n => {
    const f = g.npcs && g.npcs[n] && g.npcs[n].friendship;
    const d = npcData(n);
    d.cur = f ? Number(f.points) || 0 : 0;
    d.claimed = f ? Number(f.giftClaimedAtPoints) || 0 : 0;
  });
  saveState();
  return true;
}

function onClick(e) {
  const st = loadState();
  const rank = e.target.closest("[data-rank]");
  if (rank) {
    st.rank = Number(rank.dataset.rank);
    saveState();
    render();
    return;
  }
  const pickBtn = e.target.closest("[data-npc-picker-btn]");
  if (pickBtn) {
    const n = pickBtn.dataset.npcPickerBtn;
    openPicker = openPicker === n ? null : n;
    render();
    return;
  }
  const pickOpt = e.target.closest("[data-npc-flower-opt]");
  if (pickOpt) {
    npcData(pickOpt.dataset.npcFlowerOpt).flower = pickOpt.dataset.flower;
    openPicker = null;
    saveState();
    render();
    return;
  }
  if (openPicker && !e.target.closest(".npcg-picker")) {
    openPicker = null;
    render();
  }
  if (e.target.closest("#npcgSelectAll")) {
    const all = NPC_NAMES.every(n => st.selected[n]);
    NPC_NAMES.forEach(n => st.selected[n] = !all);
    saveState();
    render();
    return;
  }
  if (e.target.closest("[data-stop]")) return;
  const head = e.target.closest("[data-npc-toggle]");
  if (head) {
    const n = head.dataset.npcToggle;
    st.expanded[n] = !st.expanded[n];
    saveState();
    render();
  }
}

function onChange(e) {
  const st = loadState();
  const t = e.target;
  if (t.id === "npcgBoostToggle") st.boostOn = t.checked; else if (t.id === "npcgDelivery") st.delivery = t.checked; else if (t.id === "npcgGift") st.gift = t.checked; else if (t.id === "npcgPerDay") st.perDay = Math.min(20, Math.max(0, Number(t.value) || 0)); else if (t.dataset.npcCheck) st.selected[t.dataset.npcCheck] = t.checked; else if (t.dataset.npcFinal) npcData(t.dataset.npcFinal).useFinal = t.checked; else if (t.dataset.npcNodelivery) npcData(t.dataset.npcNodelivery).noDelivery = t.checked; else return;
  saveState();
  render();
}

export function mount(root, api) {
  const calc = api.calc;
  NPC_ICONS = calc.NPC_ICONS;
  COIN_ICON = calc.COIN_ICON;
  escapeHtml = calc.escapeHtml;
  isSkillActive = calc.isSkillActive;
  getAscensionRank = calc.getAscensionRank;
  farmSyncExtractGameState = calc.farmSyncExtractGameState;
  computeFlowerChainTime = calc.computeFlowerChainTime;
  getIcon = api.ui.getIcon;
  inprogressMod = api.inprogress || null;
  rootEl = document.getElementById("npcGiftBody");
  loadState();
  openPicker = null;
  Object.keys(flowerTimeCache).forEach(k => delete flowerTimeCache[k]);
  importFarm();
  if (!bound && rootEl) {
    rootEl.addEventListener("click", onClick);
    rootEl.addEventListener("change", onChange);
    bound = true;
  }
  render();
}

export function unmount() {}
