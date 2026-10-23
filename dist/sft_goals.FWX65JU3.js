import "./chunk.AS3VMXOQ.js";

// src/sft_goals.js
var A = null;
function bindApi(api) {
  A = api;
}
var GOALS_KEY = "hl_sft_goals";
var DONE_KEY = "hl_sft_goals_notified";
function loadGoals() {
  try {
    const raw = JSON.parse(localStorage.getItem(GOALS_KEY) || "[]");
    if (!Array.isArray(raw)) return [];
    return raw.filter((g) => g && typeof g.name === "string" && g.name);
  } catch (e) {
    return [];
  }
}
function saveGoals(list) {
  try {
    localStorage.setItem(GOALS_KEY, JSON.stringify(list));
  } catch (e) {
  }
}
function loadDone() {
  try {
    const raw = JSON.parse(localStorage.getItem(DONE_KEY) || "[]");
    return Array.isArray(raw) ? raw : [];
  } catch (e) {
    return [];
  }
}
function saveDone(list) {
  try {
    localStorage.setItem(DONE_KEY, JSON.stringify(list));
  } catch (e) {
  }
}
function panelItems() {
  return Array.isArray(A.prices.marketItems) ? A.prices.marketItems : [];
}
function isSftItem(m) {
  return !!(m && (m.isNftCollectible || m.isWearable));
}
function sftPrice(name) {
  const live = A.prices.findLiveNftPriceForName(name);
  if (live != null) return live;
  const cosmetic = A.prices.findCosmeticPriceForName(name);
  if (cosmetic != null) return cosmetic;
  const lower = String(name).toLowerCase();
  const m = panelItems().find((x) => isSftItem(x) && String(x.name).toLowerCase() === lower);
  return m && m.flowerPrice > 0 ? m.flowerPrice : null;
}
function sftCandidates() {
  const out = [];
  const seen = /* @__PURE__ */ new Set();
  panelItems().forEach((m) => {
    if (!isSftItem(m) || seen.has(m.name)) return;
    if (sftPrice(m.name) == null) return;
    seen.add(m.name);
    out.push({
      name: m.name,
      kind: m.isWearable ? "wearable" : "collectible"
    });
  });
  return out.sort((a, b) => a.name.localeCompare(b.name));
}
function computeInventory() {
  let g = null;
  try {
    g = A.calc.profileGetG();
  } catch (e) {
    g = null;
  }
  if (!g) return {
    rows: [],
    gross: 0,
    net: 0,
    ready: false
  };
  const rows = [];
  panelItems().forEach((m) => {
    if (isSftItem(m)) return;
    const qty = A.calc.profileGetInventoryAmount(g, m.name);
    if (!(qty > 0)) return;
    const live = A.prices.findLivePriceForItem(m);
    const price = live != null ? live : m.flowerPrice;
    if (!(price > 0)) return;
    rows.push({
      name: m.name,
      qty,
      value: qty * price
    });
  });
  rows.sort((a, b) => b.value - a.value);
  const gross = rows.reduce((t, r) => t + r.value, 0);
  const fee = Math.min(Math.max(Number(A.calc.feePercent) || 0, 0), 100);
  return {
    rows,
    gross,
    net: gross * (1 - fee / 100),
    ready: true
  };
}
function goalProgress(net, price) {
  if (!(price > 0)) return {
    pct: 0,
    missing: 0,
    reached: false
  };
  const pct = net / price * 100;
  return {
    pct,
    missing: Math.max(price - net, 0),
    reached: net >= price
  };
}
function evaluateGoals() {
  const inv = computeInventory();
  const goals = loadGoals().map((g) => {
    const price = sftPrice(g.name);
    const prog = goalProgress(inv.net, price);
    return Object.assign({}, g, {
      price,
      pct: prog.pct,
      missing: prog.missing,
      reached: price != null && prog.reached
    });
  });
  return {
    inv,
    goals
  };
}
function takeNewlyReachedGoals() {
  const { inv, goals } = evaluateGoals();
  if (!inv.ready) return [];
  const priced = goals.filter((g) => g.price != null);
  const done = loadDone();
  const reachedNames = priced.filter((g) => g.reached).map((g) => g.name);
  const fresh = priced.filter((g) => g.reached && done.indexOf(g.name) === -1);
  const next = done.filter((n) => reachedNames.indexOf(n) !== -1).concat(fresh.map((g) => g.name));
  if (next.length !== done.length || next.some((n, i) => n !== done[i])) saveDone(next);
  return fresh;
}
export {
  bindApi,
  computeInventory,
  evaluateGoals,
  goalProgress,
  loadGoals,
  saveGoals,
  sftCandidates,
  sftPrice,
  takeNewlyReachedGoals
};
