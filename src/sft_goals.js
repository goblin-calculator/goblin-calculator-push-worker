let A = null;

export function bindApi(api) {
  A = api;
}

const GOALS_KEY = "hl_sft_goals";

const DONE_KEY = "hl_sft_goals_notified";

export function loadGoals() {
  try {
    const raw = JSON.parse(localStorage.getItem(GOALS_KEY) || "[]");
    if (!Array.isArray(raw)) return [];
    return raw.filter(g => g && typeof g.name === "string" && g.name);
  } catch (e) {
    return [];
  }
}

export function saveGoals(list) {
  try {
    localStorage.setItem(GOALS_KEY, JSON.stringify(list));
  } catch (e) {}
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
  } catch (e) {}
}

function panelItems() {
  return Array.isArray(A.prices.marketItems) ? A.prices.marketItems : [];
}

function isSftItem(m) {
  return !!(m && (m.isNftCollectible || m.isWearable));
}

export function sftPrice(name) {
  const live = A.prices.findLiveNftPriceForName(name);
  if (live != null) return live;
  const cosmetic = A.prices.findCosmeticPriceForName(name);
  if (cosmetic != null) return cosmetic;
  const lower = String(name).toLowerCase();
  const m = panelItems().find(x => isSftItem(x) && String(x.name).toLowerCase() === lower);
  return m && m.flowerPrice > 0 ? m.flowerPrice : null;
}

export function sftCandidates() {
  const out = [];
  const seen = new Set;
  panelItems().forEach(m => {
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

export function computeInventory() {
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
  panelItems().forEach(m => {
    if (isSftItem(m)) return;
    const qty = A.calc.profileGetInventoryAmount(g, m.name);
    if (!(qty > 0)) return;
    const live = A.prices.findLivePriceForItem(m);
    const price = live != null ? live : m.flowerPrice;
    if (!(price > 0)) return;
    rows.push({
      name: m.name,
      qty: qty,
      value: qty * price
    });
  });
  rows.sort((a, b) => b.value - a.value);
  const gross = rows.reduce((t, r) => t + r.value, 0);
  const fee = Math.min(Math.max(Number(A.calc.feePercent) || 0, 0), 100);
  return {
    rows: rows,
    gross: gross,
    net: gross * (1 - fee / 100),
    ready: true
  };
}

export function goalProgress(net, price) {
  if (!(price > 0)) return {
    pct: 0,
    missing: 0,
    reached: false
  };
  const pct = net / price * 100;
  return {
    pct: pct,
    missing: Math.max(price - net, 0),
    reached: net >= price
  };
}

export function evaluateGoals() {
  const inv = computeInventory();
  const goals = loadGoals().map(g => {
    const price = sftPrice(g.name);
    const prog = goalProgress(inv.net, price);
    return Object.assign({}, g, {
      price: price,
      pct: prog.pct,
      missing: prog.missing,
      reached: price != null && prog.reached
    });
  });
  return {
    inv: inv,
    goals: goals
  };
}

export function takeNewlyReachedGoals() {
  const {inv: inv, goals: goals} = evaluateGoals();
  if (!inv.ready) return [];
  const priced = goals.filter(g => g.price != null);
  const done = loadDone();
  const reachedNames = priced.filter(g => g.reached).map(g => g.name);
  const fresh = priced.filter(g => g.reached && done.indexOf(g.name) === -1);
  const next = done.filter(n => reachedNames.indexOf(n) !== -1).concat(fresh.map(g => g.name));
  if (next.length !== done.length || next.some((n, i) => n !== done[i])) saveDone(next);
  return fresh;
}
