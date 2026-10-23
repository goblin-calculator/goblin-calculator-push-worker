import * as calc from "./calculator.js";
import * as prices from "./prices.js";
import * as ui from "./ui.js";
import { boostsBySubjectHtml } from "./rescalc_boosts.js";
import { farmPanelGetMarketPriceFlower } from "./inprogress.js";
import { applySelection, currentRatio } from "./gem_packs.js";
import { restockShareCount } from "./rescalc_shared.js";

const STORE_KEY = "guro_rc_greenhouse_v1";

const MAX_CUSTOM_CYCLES = 100000;

const MODES = [ {
  id: "restock",
  label: "Per Restock Mode",
  short: "Per Restock Mode"
}, {
  id: "24h",
  label: "24Hrs Mode",
  short: "24Hrs Mode"
} ];

let host = null;
let api = null;
let state = null;
let popup = null;
let overlayEl = null;
let promptEl = null;
let restoreFns = [];
let nodesDraft = null;
let listening = false;
let detailsOpen = false;

function esc(s) {
  return calc.escapeHtml(String(s));
}

function loadState() {
  const base = {
    mode: "restock",
    season: calc.previewSeason || "Spring",
    selected: [],
    cycles: {}
  };
  try {
    const raw = JSON.parse(localStorage.getItem(STORE_KEY) || "null");
    if (raw && typeof raw === "object") {
      if (raw.mode === "24h" || raw.mode === "restock") base.mode = raw.mode;
      if (raw.season === "All" || calc.SEASON_ORDER.includes(raw.season)) base.season = raw.season;
      if (Array.isArray(raw.selected)) base.selected = raw.selected.filter(n => calc.BASE_GREENHOUSE[n]);
      if (raw.cycles && typeof raw.cycles === "object") Object.keys(raw.cycles).forEach(k => {
        const v = Math.floor(Number(raw.cycles[k]));
        if (calc.BASE_GREENHOUSE[k] && isFinite(v) && v > 0) base.cycles[k] = Math.min(v, MAX_CUSTOM_CYCLES);
      });
    }
  } catch (e) {}
  if (base.mode === "24h" && base.selected.length > 1) base.selected = base.selected.slice(0, 1);
  return base;
}

function saveState() {
  try {
    localStorage.setItem(STORE_KEY, JSON.stringify(state));
  } catch (e) {}
}

function n2(n) {
  if (!isFinite(n)) return "—";
  return n.toLocaleString(undefined, {
    minimumFractionDigits: 0,
    maximumFractionDigits: 2
  });
}

function fl(n) {
  if (!isFinite(n)) return "—";
  const a = Math.abs(n);
  const max = a >= 1e3 ? 0 : a >= 1 ? 2 : 4;
  return n.toLocaleString(undefined, {
    minimumFractionDigits: 0,
    maximumFractionDigits: max
  });
}

function signed(n, f) {
  const r = f(Math.abs(n));
  if (n > 0 && r !== "0") return "+" + r;
  if (n < 0 && r !== "0") return "-" + r;
  return r;
}

function flowerSigned(n) {
  return `${signed(n, fl)}${calc.FLOWER_ICON}`;
}

function flowerHtml(n) {
  return `${fl(n)}${calc.FLOWER_ICON}`;
}

function gemHtml(n) {
  return `${n2(n)}${calc.GEM_ICON}`;
}

function plantNames() {
  return Object.keys(calc.BASE_GREENHOUSE);
}

function visiblePlants() {
  return plantNames();
}

function oilUnitFlower() {
  return calc.coinsToFlower(prices.getItemCostByName("Oil"));
}

function oilIconHtml() {
  return ui.getIcon("Oil");
}

function ratioInfo() {
  const fpg = calc.flowerPerGem();
  return {
    free: !(fpg > 0),
    gemsPerFlower: fpg > 0 ? 1 / fpg : 0
  };
}

function compute(name, mode, share) {
  const d = calc.BASE_GREENHOUSE[name];
  const boosted = calc.computeBoostedGreenhouseStats(name, d.baseYield || 1, d.timeSec);
  const nodes = calc.getGreenhouseCount(name) || 0;
  const sell = farmPanelGetMarketPriceFlower(name) || 0;
  const feeRate = (calc.feePercent || 0) / 100;
  const seedCost = calc.coinsToFlower(prices.getGreenhouseSeedCoins(name));
  const oilPerPlant = Math.max(0, (d.oilQty || 0) * (boosted.oilQtyMult || 1) - (boosted.oilFlatReduce || 0));
  const oilUnit = oilUnitFlower();
  const shrine = prices.getActiveShrineDailyCost(boosted.activeBoosts);
  const stockBase = calc.BASE_STOCK_GREENHOUSE[name] || 0;
  const stockQty = stockBase ? calc.computeBoostedStock(stockBase, "seed", name) : 0;
  const gemPerRestock = prices.getRestockGemCostIndividual("seed");
  const fullRestockFlower = calc.gemsToFlower(gemPerRestock);
  const yieldPlot = boosted.yieldVal;
  const yieldAll = nodes * yieldPlot;
  const grossCycle = yieldAll * sell;
  const costCycle = nodes * seedCost;
  const oilQtyCycle = nodes * oilPerPlant;
  const oilCycle = oilQtyCycle * oilUnit;
  const shrineCycle = shrine.total * boosted.timeVal / 86400;
  const out = {
    name: name,
    nodes: nodes,
    timeSec: boosted.timeVal,
    yieldPlot: yieldPlot,
    yieldAll: yieldAll,
    sell: sell,
    seedCost: seedCost,
    oilPerPlant: oilPerPlant,
    oilUnit: oilUnit,
    grossCycle: grossCycle,
    costCycle: costCycle,
    oilQtyCycle: oilQtyCycle,
    oilCycle: oilCycle,
    shrineCycle: shrineCycle,
    feeRate: feeRate,
    gemPerRestock: gemPerRestock,
    fullRestockFlower: fullRestockFlower,
    stockQty: stockQty,
    activeBoosts: boosted.activeBoosts,
    shareCount: share,
    mode: mode
  };
  const customCycles = state.cycles[name] > 0 ? state.cycles[name] : 0;
  let cycles = 0;
  let plants = 0;
  let totalYield = 0;
  let shrineTotal = 0;
  let restockCost = 0;
  let restockQty = 0;
  let restockGems = 0;
  let totalTimeSec = 0;
  if (nodes > 0) {
    if (mode === "restock") {
      const sim = stockQty > 0 ? calc.simulateStockCycles(pc => calc.computeBoostedGreenhouseStats(name, d.baseYield || 1, d.timeSec, pc), nodes, stockQty) : {
        cycles: 0,
        totalUnits: 0,
        totalTimeSec: 0
      };
      cycles = sim.cycles;
      plants = stockQty;
      totalYield = sim.totalUnits;
      totalTimeSec = sim.totalTimeSec;
      shrineTotal = shrine.total * totalTimeSec / 86400;
      restockQty = stockQty > 0 ? 1 : 0;
      restockCost = restockQty ? fullRestockFlower / Math.max(1, share) : 0;
      restockGems = restockQty ? gemPerRestock / Math.max(1, share) : 0;
    } else {
      cycles = customCycles > 0 ? customCycles : Math.round(86400 / boosted.timeVal);
      plants = nodes * cycles;
      totalYield = yieldAll * cycles;
      totalTimeSec = customCycles > 0 ? cycles * boosted.timeVal : 86400;
      shrineTotal = shrine.total * totalTimeSec / 86400;
      const det = stockBase ? prices.computeRestockCost24hDetailedIndividual(stockBase, "seed", nodes, cycles, 1, undefined, name) : null;
      restockQty = det ? Math.ceil(det.restocksPerDay - 1e-9) : 0;
      restockGems = restockQty * gemPerRestock;
      restockCost = calc.gemsToFlower(restockGems);
    }
  }
  const gross = totalYield * sell;
  const fee = gross * feeRate;
  const costTotal = plants * seedCost;
  const oilQtyTotal = plants * oilPerPlant;
  const oilTotal = oilQtyTotal * oilUnit;
  out.cycles = cycles;
  out.cyclesCustom = mode === "24h" && customCycles > 0;
  out.plants = plants;
  out.totalTimeSec = totalTimeSec;
  out.totalYield = totalYield;
  out.gross = gross;
  out.fee = fee;
  out.cost = costTotal;
  out.oilQty = oilQtyTotal;
  out.oil = oilTotal;
  out.shrine = shrineTotal;
  out.restock = restockCost;
  out.restockQty = restockQty;
  out.restockGems = restockGems;
  out.net = gross - fee - costTotal - oilTotal - shrineTotal - restockCost;
  out.restockCycle = cycles > 0 ? restockCost / cycles : 0;
  out.netCycle = grossCycle * (1 - feeRate) - costCycle - oilCycle - shrineCycle - out.restockCycle;
  return out;
}

function defaultCycles(name) {
  const d = calc.BASE_GREENHOUSE[name];
  if (!d) return 0;
  const boosted = calc.computeBoostedGreenhouseStats(name, d.baseYield || 1, d.timeSec);
  return boosted.timeVal > 0 ? Math.round(86400 / boosted.timeVal) : 0;
}

function syncGemRatio() {
  try {
    const want = currentRatio();
    const fpg = calc.flowerPerGem();
    const have = fpg > 0 ? 1 / fpg : 0;
    const same = want.free ? !(fpg > 0) : Math.abs(want.gems - have) < 1e-6;
    if (!same) applySelection();
  } catch (e) {}
}

function computeAll() {
  syncGemRatio();
  const share = restockShareCount();
  return state.selected.filter(n => calc.BASE_GREENHOUSE[n]).map(n => compute(n, state.mode, share));
}

function totalsOf(rows) {
  const t = {
    gross: 0,
    fee: 0,
    cost: 0,
    oilQty: 0,
    oil: 0,
    shrine: 0,
    restock: 0,
    net: 0
  };
  rows.forEach(r => {
    t.gross += r.gross;
    t.fee += r.fee;
    t.cost += r.cost;
    t.oilQty += r.oilQty;
    t.oil += r.oil;
    t.shrine += r.shrine;
    t.restock += r.restock;
    t.net += r.net;
  });
  return t;
}

function seasonCardsHtml() {
  return calc.SEASON_ORDER.concat([ "All" ]).map(s => {
    const on = state.season === s;
    const icon = s === "All" ? `<span class="rc-season-all">★</span>` : calc.SEASON_EMOJI[s];
    return `<button type="button" class="rc-season guro-frame${on ? " is-on" : ""}" data-rc-season="${s}" aria-pressed="${on ? "true" : "false"}">${icon}<span class="rc-season-name">${s === "All" ? "Show All" : s}</span></button>`;
  }).join("");
}

function cropCellsHtml() {
  return visiblePlants().map(n => {
    const on = state.selected.includes(n);
    return `<label class="rc-crop guro-frame${on ? " is-on" : ""}"><span class="rc-crop-icon">${ui.getIcon(n)}</span><span class="rc-crop-name">${esc(n)}</span><input type="checkbox" data-rc-crop="${esc(n)}"${on ? " checked" : ""} aria-label="${esc(n)}"></label>`;
  }).join("");
}

function tilesHtml(rows) {
  if (!rows.length) return `<div class="rc-empty">No greenhouse plants selected yet. Tick a plant above to include it in the calculation.</div>`;
  return `<div class="rc-tiles-wrap guro-frame"><div class="rc-tiles">${rows.map(r => {
    const good = r.net >= 0;
    return `<div class="rc-tile guro-frame ${good ? "is-profit" : "is-loss"}" data-rc-tile="${esc(r.name)}"><span class="rc-tile-icon">${ui.getIcon(r.name)}</span><span class="rc-tile-yield">${signed(r.totalYield, n2)}</span><span class="rc-tile-net">${fl(r.gross)}${calc.FLOWER_ICON}</span></div>`;
  }).join("")}</div></div>`;
}

function valueBoxHtml(label, html, extra) {
  return `<div class="rc-val guro-frame${extra ? " " + extra : ""}"><span class="rc-val-label">${label}</span><span class="rc-val-num">${html}</span></div>`;
}

function oilValueHtml(qty, flower) {
  return `${n2(qty)}${oilIconHtml()}(${fl(flower)}${calc.FLOWER_ICON})`;
}

function valuesHtml(rows) {
  const t = totalsOf(rows);
  const feeBox = (calc.feePercent || 0) > 0 ? valueBoxHtml("Market Fee", flowerHtml(t.fee)) : "";
  return `<div class="rc-values">
    ${valueBoxHtml("Gross", flowerHtml(t.gross))}
    ${valueBoxHtml("Cost", flowerHtml(t.cost))}
    ${valueBoxHtml("Oil Cost", oilValueHtml(t.oilQty, t.oil))}
    ${valueBoxHtml("Shrine Cost", flowerHtml(t.shrine))}
    ${valueBoxHtml("Restock Cost", flowerHtml(t.restock))}
    ${feeBox}
  </div>
  <div class="rc-net-row">
    ${valueBoxHtml("Net", `<span class="${t.net >= 0 ? "is-profit" : "is-loss"}">${signed(t.net, fl)}${calc.FLOWER_ICON}</span>`, "rc-val-net")}
    <button type="button" class="rc-linktext" data-rc-open="computation"${rows.length ? "" : " disabled"}>Computation</button>
  </div>`;
}

function modeNoteHtml(rows) {
  const missing = rows.filter(r => !(r.nodes > 0));
  const warn = missing.length ? `<div class="rc-note is-warn">${missing.map(r => esc(r.name)).join(", ")} ${missing.length === 1 ? "has" : "have"} 0 Greenhouse Plots, so ${missing.length === 1 ? "its result is" : "their results are"} 0. Open Nodes above and enter your greenhouse plots.</div>` : "";
  const text = state.mode === "restock" ? `Per Restock Mode: 1 restock is shared by all ${restockShareCount()} seeds (all crops, fruits, greenhouse and flower seeds, moon seeds excluded), selected or not. Every planted seed also uses oil.` : "24Hrs Mode: the plant keeps restocking all day and pays for every restock alone. Every planted seed also uses oil.";
  return `<div class="rc-details-row"><button type="button" class="rc-linktext" data-rc-details aria-expanded="${detailsOpen ? "true" : "false"}">Details</button></div>${detailsOpen ? `<div class="rc-note">${text}</div>` : ""}${warn}`;
}

function pickerHtml() {
  return `<section class="rc-block guro-frame" aria-label="Greenhouse Calculator">
    <div class="rc-block-title">Greenhouse Calculator</div>
    <div class="rc-crops" id="rcCrops">${cropCellsHtml()}</div>
  </section>`;
}

function resultsHtml() {
  const rows = computeAll();
  return `<section class="rc-block guro-frame" aria-label="Greenhouse results">
    <div class="rc-modes" role="group" aria-label="Calculation mode">${MODES.map(m => `<button type="button" class="rc-mode guro-frame${state.mode === m.id ? " is-on" : ""}" data-rc-mode="${m.id}" aria-pressed="${state.mode === m.id ? "true" : "false"}">${m.label}</button>`).join("")}</div>
    <div class="rc-tools">
      <button type="button" class="rc-tool guro-frame" data-rc-open="skills">Skills</button>
      <button type="button" class="rc-tool guro-frame" data-rc-open="boost">Boost</button>
      <button type="button" class="rc-tool guro-frame" data-rc-open="nodes">Nodes</button>
    </div>
    ${modeNoteHtml(rows)}
    <div id="rcResults">${tilesHtml(rows)}${valuesHtml(rows)}</div>
  </section>`;
}

function render() {
  if (!host) return;
  const scroller = document.scrollingElement;
  const y = scroller ? scroller.scrollTop : 0;
  host.innerHTML = pickerHtml() + resultsHtml();
  if (scroller) scroller.scrollTop = y;
}

function refreshResults() {
  if (!host) return;
  const picker = host.querySelector("#rcCrops");
  if (!picker) {
    render();
    return;
  }
  const blocks = host.querySelectorAll(".rc-block");
  if (blocks[1]) {
    const tmp = document.createElement("div");
    tmp.innerHTML = resultsHtml();
    blocks[1].replaceWith(tmp.firstElementChild);
  }
  if (popup === "computation") renderOverlayBody();
}

function effectParts(b, name) {
  const y = [];
  const t = [];
  const c = [];
  const add = b.yieldAdd;
  if (add) y.push(`${add > 0 ? "+" : ""}${n2(add)} yield`);
  if (b.yieldMult) y.push(`×${b.yieldMult} yield`);
  if (b.timeMult) t.push(`×${b.timeMult} time`);
  if (b.freeCost) c.push("free seeds");
  if (b.seedQtyMult) c.push(`×${b.seedQtyMult} seeds`);
  if (b.oilQtyMult) c.push(`×${b.oilQtyMult} oil`);
  if (b.oilFlatReduce) c.push(`-${n2(b.oilFlatReduce)} oil`);
  if (b.coinCostMult) c.push(`×${b.coinCostMult} cost`);
  if (b.coinCostMultAll) c.push(`×${b.coinCostMultAll} cost`);
  return {
    yield: y,
    time: t,
    cost: c
  };
}

function appliedBoostHtml(row) {
  const groups = {
    yield: [],
    time: [],
    cost: []
  };
  const list = row.activeBoosts.slice();
  const artist = calc.BOOSTS.find(b => b.id === "artist_discount");
  if (artist && calc.isBoostActive(artist.id) && !list.includes(artist)) list.push(artist);
  list.forEach(b => {
    const p = effectParts(b, row.name);
    [ "yield", "time", "cost" ].forEach(k => {
      if (p[k].length) groups[k].push(`<div class="rc-boost-row">${ui.getBoostIconSkillFallback(b.name)}<span class="rc-boost-name">${esc(b.name)}</span><span class="rc-boost-eff">${esc(p[k].join(", "))}</span></div>`);
    });
  });
  const section = (label, items) => items.length ? `<div class="rc-boost-group"><div class="rc-boost-label">${label}</div>${items.join("")}</div>` : "";
  const body = section("Yield Boost", groups.yield) + section("Time Boost", groups.time) + section("Cost and Oil Boost", groups.cost);
  return `<div class="rc-group"><div class="rc-comp-sub">Applied Boost</div>${body || `<div class="rc-boost-none">No boost applied</div>`}</div>`;
}

function toolCostConfigHtml() {
  const fig = calc.computeResourceFigures("Oil");
  if (!fig || !fig.breakdown) return "";
  const matsCost = fig.breakdown.reduce((sum, m) => sum + m.lineCost, 0);
  const coins = Math.max(0, fig.totalToolCost - matsCost);
  const free = fig.totalToolCost <= 0 && fig.breakdown.every(m => m.unitCost === 0);
  const rows = free ? `<div class="rc-boost-none">Free tool</div>` : fig.breakdown.map(m => {
    const btn = (mode, label) => `<button type="button" class="es-mode-btn es-toolcfg-tbtn${m.mode === mode ? " active" : ""}" data-rc-mat="${esc(m.name)}" data-rc-mode="${mode}">${label}</button>`;
    return `<div class="rc-tool-mat"><span class="rc-tool-mat-item"><span class="rc-tool-mat-qty">${n2(m.qty)}</span>${ui.getIcon(m.name)}</span><span class="es-toolcfg-tog">${btn("collect", "Collect")}${btn("buy", "Buy")}</span></div>`;
  }).join("");
  const coinRow = !free && coins > 0 ? `<div class="rc-tool-mat"><span class="rc-tool-mat-item"><span class="rc-tool-mat-qty">${n2(coins)}</span>${calc.COIN_ICON}</span></div>` : "";
  return `<div class="rc-group"><div class="rc-comp-sub">Tool Cost Config</div>
    <div class="rc-tool-cfg"><div class="rc-tool-name">${ui.getIcon("Oil Drill")}<span>Oil Drill</span></div>${coinRow}${rows}</div></div>`;
}

function kv(label, html, cls) {
  return `<div class="rc-kv${cls ? " " + cls : ""}"><span class="rc-kv-label">${label}</span><span class="rc-kv-val">${html}</span></div>`;
}

function totalCycleHtml(r) {
  const val = n2(r.cycles);
  if (r.mode !== "24h") return val;
  return `<span class="rc-cycle-val"><span>${val}${r.cyclesCustom ? ` <span class="rc-kv-sub">Custom</span>` : ""}</span><button type="button" class="rc-edit-link" data-rc-edit-cycle="${esc(r.name)}">Edit</button></span>`;
}

function computationCardHtml(r) {
  const ratio = ratioInfo();
  const modeLabel = r.mode === "restock" ? "Per Restock Mode" : "24Hrs Mode";
  const qtyLabel = r.mode === "restock" ? `×${r.restockQty} Restock` : `×${n2(r.restockQty)} Restock${r.restockQty === 1 ? "" : "s"}`;
  const gemLine = `${gemHtml(r.gemPerRestock)}`;
  const ratioLine = ratio.free ? `Free gems` : `1${calc.FLOWER_ICON} : ${n2(ratio.gemsPerFlower)}${calc.GEM_ICON}`;
  const shareLine = r.mode === "restock" && r.shareCount > 1 ? `<div class="rc-kv rc-kv-wide"><span class="rc-kv-label">Your share of 1 restock</span><span class="rc-kv-val">1/${r.shareCount} = ${flowerHtml(r.restock)}</span></div>` : "";
  return `<article class="rc-comp-card guro-frame">
    <header class="rc-comp-head"><span class="rc-comp-icon">${ui.getIcon(r.name)}</span><span class="rc-comp-name">${esc(r.name)}</span><span class="rc-comp-nodes">${ui.getIcon("Greenhouse")} ${n2(r.nodes)}</span></header>
    <div class="rc-group"><div class="rc-kv-grid">
      ${kv("Growth Time", esc(calc.formatDuration(r.timeSec)), "rc-kv-wide")}
      ${kv("Yield / Plot", `${signed(r.yieldPlot, n2)}${ui.getIcon(r.name)}`)}
      ${kv("Yield / Harvest", `${signed(r.yieldAll, n2)}${ui.getIcon(r.name)}`)}
      ${kv("Market Price / Unit", flowerSigned(r.sell))}
      ${kv("Gross / Harvest", flowerSigned(r.grossCycle))}
      ${kv("Seed Cost / Cycle", flowerHtml(r.costCycle))}
      ${kv("Oil / Plot", `${n2(r.oilPerPlant)}${oilIconHtml()}`)}
      ${kv("Oil Cost / Cycle", oilValueHtml(r.oilQtyCycle, r.oilCycle))}
      ${kv("Oil Price / Unit", flowerHtml(r.oilUnit))}
      ${kv("Shrine / Cycle", flowerHtml(r.shrineCycle))}
      ${kv("Restock / Cycle", flowerHtml(r.restockCycle))}
      ${kv("Net / Cycle", `<span class="${r.netCycle >= 0 ? "is-profit" : "is-loss"}">${signed(r.netCycle, fl)}${calc.FLOWER_ICON}</span>`)}
    </div></div>
    <div class="rc-group"><div class="rc-comp-sub">${modeLabel}</div>
    <div class="rc-kv-grid">
      ${kv("Total Cycle", totalCycleHtml(r))}
      ${kv("Seeds Planted", n2(r.plants))}
      ${kv("Total Yield", `${signed(r.totalYield, n2)}${ui.getIcon(r.name)}`)}
      ${kv("Total Gross", flowerSigned(r.gross))}
      ${kv("Total Seed Cost", flowerHtml(r.cost))}
      ${kv("Total Oil Cost", oilValueHtml(r.oilQty, r.oil), "rc-kv-wide")}
      ${kv("Total Shrine Cost", flowerHtml(r.shrine))}
      ${kv("Total Restock Cost", flowerHtml(r.restock))}
      ${kv("Restock Quantity", qtyLabel)}
      ${kv("Cost / Restock", `${gemLine}<span class="rc-kv-sub">${ratioLine}</span>`)}
      ${kv("Gems Used", `${gemHtml(r.restockGems)} = ${flowerHtml(r.restock)}`, "rc-kv-wide")}
      ${shareLine}
      ${r.feeRate > 0 ? kv("Market Fee", flowerHtml(r.fee)) : ""}
      ${kv("Total Net", `<span class="${r.net >= 0 ? "is-profit" : "is-loss"}">${signed(r.net, fl)}${calc.FLOWER_ICON}</span>`, "rc-kv-wide rc-kv-net")}
    </div></div>
    ${appliedBoostHtml(r)}
    ${toolCostConfigHtml()}
  </article>`;
}

function computationBodyHtml() {
  const rows = computeAll();
  if (!rows.length) return `<div class="rc-empty">No plants selected.</div>`;
  return rows.map(computationCardHtml).join("");
}

function boostBodyHtml() {
  if (!state.selected.length) return `<div class="rc-empty">Select at least one plant to see the boosts that affect it.</div>`;
  const subjects = state.selected.map(n => ({
    name: n,
    icon: ui.getIcon(n)
  }));
  const grapeOnly = new Set([ "time_warp_totem", "super_totem", "bountiful_harvest" ]);
  const boosts = calc.BOOSTS.filter(b => b.source !== "skill" && !b.hiddenFromOwnPanel && (b.category === "greenhouse" || b.category === "crops"));
  const appliesTo = (b, s) => {
    const lower = s.name.toLowerCase();
    if (b.category === "greenhouse") {
      if (b.scope === "global") return true;
      if (b.scope === "greenhouse") return (b.target || "").toLowerCase() === lower;
      return false;
    }
    if (b.category === "crops" && b.scope === "global" && !b.composterFertilizer) {
      if (s.name === "Grape") return grapeOnly.has(b.id);
      return !calc.CROPS_GLOBAL_EXCLUDED_FROM_GREENHOUSE.has(b.id) && (b.id !== "hoot" || lower === "rice");
    }
    return false;
  };
  const html = boostsBySubjectHtml({
    subjects: subjects,
    boosts: boosts,
    appliesTo: appliesTo,
    unit: "plots",
    allLabel: "Boost for All Selected Plants"
  });
  return `<div class="rc-pop-hint">Boosts that affect ${state.selected.length > 1 ? "your selected plants" : esc(state.selected[0])}. Tap a boost to switch it on or off, then press Save.</div>${html || `<div class="rc-empty">No boosts found.</div>`}`;
}

function nodesBodyHtml() {
  if (!state.selected.length) return `<div class="rc-empty">Select at least one plant to set its Greenhouse Plots.</div>`;
  const rows = state.selected.map(n => {
    const value = nodesDraft && nodesDraft[n] != null ? nodesDraft[n] : calc.getGreenhouseCount(n);
    return `<label class="rc-node-row guro-frame"><span class="rc-node-icon">${ui.getIcon(n)}</span><span class="rc-node-text"><span class="rc-node-name">${esc(n)}</span><span class="rc-node-used">Greenhouse Plots planted with ${esc(n)}</span></span><input type="number" min="0" step="1" inputmode="numeric" data-rc-node="${esc(n)}" value="${value ? value : ""}" placeholder="0"></label>`;
  }).join("");
  return `<div class="rc-pop-hint">Enter how many Greenhouse Plots grow each selected plant, then press Save.</div>${rows}`;
}

function popupTitle() {
  if (popup === "skills") return "Greenhouse Skills";
  if (popup === "boost") return "Greenhouse Boosts";
  if (popup === "nodes") return "Greenhouse Nodes";
  return "Computation";
}

function popupBodyHtml() {
  if (popup === "boost") return boostBodyHtml();
  if (popup === "nodes") return nodesBodyHtml();
  if (popup === "computation") return computationBodyHtml();
  return `<div class="rc-pop-hint">All greenhouse skills from the Skill Tree. Changes here also change the Skill Tree. Press Save to apply them.</div><div id="rcSkillSlot"></div>`;
}

function borrow(id, slotId) {
  const el = document.getElementById(id);
  const slot = document.getElementById(slotId);
  if (!el || !slot) return;
  const parent = el.parentNode;
  const next = el.nextSibling;
  slot.appendChild(el);
  restoreFns.push(() => {
    if (!parent) return;
    if (next && next.parentNode === parent) parent.insertBefore(el, next); else parent.appendChild(el);
  });
}

function releaseBorrowed() {
  while (restoreFns.length) restoreFns.pop()();
}

let savedSkillCategory = null;

function setupBorrowed() {
  if (popup === "skills") {
    savedSkillCategory = calc.skillCategory;
    calc.setSkillCategory("greenhouse");
    borrow("ascensionBar", "rcAscSlot");
    borrow("skillListWrap", "rcSkillSlot");
    borrow("skillSaveBar", "rcSaveSlot");
    ui.renderSkillPanel();
    ui.renderAscensionBar();
    calc.updateSkillSaveBarState();
  } else if (popup === "boost") {
    borrow("skillSaveBar", "rcSaveSlot");
    calc.updateSkillSaveBarState();
  }
}

function teardownBorrowed() {
  releaseBorrowed();
  if (savedSkillCategory != null) {
    calc.setSkillCategory(savedSkillCategory);
    savedSkillCategory = null;
    ui.renderSkillPanel();
  }
}

function footerHtml() {
  if (popup === "nodes") return `<button type="button" class="rc-save guro-frame" id="rcNodesSave">Save Changes</button>`;
  if (popup === "skills" || popup === "boost") return `<div id="rcSaveSlot"></div>`;
  return "";
}

function overlayHtml() {
  return `<div class="rc-pop guro-frame${popup === "computation" ? " rc-pop-comp" : ""}" role="dialog" aria-modal="true" aria-label="${popupTitle()}">
    <div class="rc-pop-head"><span class="rc-pop-title">${popupTitle()}</span><button type="button" class="rc-pop-close" data-rc-close aria-label="Close">✕</button></div>
    <div class="rc-pop-body" id="rcPopBody">${popupBodyHtml()}</div>
    <div class="rc-pop-foot">${footerHtml()}</div>
  </div>`;
}

function renderOverlayBody() {
  if (!overlayEl) return;
  const body = overlayEl.querySelector("#rcPopBody");
  if (!body) return;
  if (popup === "skills") return;
  const top = body.scrollTop;
  body.innerHTML = popupBodyHtml();
  body.scrollTop = top;
  calc.updateSkillSaveBarState();
}

function isPopupDirty() {
  if (popup === "skills" || popup === "boost") return calc.isSkillDraftDirty() || calc.isBoostDraftDirty();
  if (popup === "nodes") return !!nodesDraft && Object.keys(nodesDraft).some(n => Number(nodesDraft[n]) !== (calc.getGreenhouseCount(n) || 0));
  return false;
}

function openPopup(kind) {
  if (popup) return;
  popup = kind;
  nodesDraft = null;
  overlayEl = document.createElement("div");
  overlayEl.className = "rc-overlay";
  overlayEl.innerHTML = overlayHtml();
  document.body.appendChild(overlayEl);
  document.body.classList.add("rc-no-scroll");
  const slot = overlayEl.querySelector("#rcSkillSlot");
  if (kind === "skills" && slot) {
    const asc = document.createElement("div");
    asc.id = "rcAscSlot";
    slot.parentNode.insertBefore(asc, slot);
  }
  setupBorrowed();
}

function destroyPopup() {
  teardownBorrowed();
  if (overlayEl) overlayEl.remove();
  overlayEl = null;
  popup = null;
  nodesDraft = null;
  document.body.classList.remove("rc-no-scroll");
}

function closePopup(force) {
  if (!popup) return;
  if (!force && isPopupDirty()) {
    showPrompt("You have unsaved changes. Save them first, or discard them to close.", [ {
      label: "Keep Editing"
    }, {
      label: "Discard",
      run: () => {
        calc.discardSkillBoostDrafts();
        destroyPopup();
        refreshResults();
      }
    } ]);
    return;
  }
  const wasComputation = popup === "computation";
  destroyPopup();
  if (!wasComputation) refreshResults();
}

function showPrompt(message, buttons) {
  if (promptEl) promptEl.remove();
  promptEl = document.createElement("div");
  promptEl.className = "rc-overlay rc-overlay-top";
  promptEl.innerHTML = `<div class="rc-prompt guro-frame" role="alertdialog" aria-modal="true"><p class="rc-prompt-text">${esc(message)}</p><div class="rc-prompt-actions">${buttons.map((b, i) => `<button type="button" class="rc-prompt-btn guro-frame" data-rc-prompt="${i}">${esc(b.label)}</button>`).join("")}</div></div>`;
  promptEl.addEventListener("click", e => {
    const btn = e.target.closest("[data-rc-prompt]");
    if (!btn) return;
    const b = buttons[Number(btn.getAttribute("data-rc-prompt"))];
    promptEl.remove();
    promptEl = null;
    if (b && b.run) b.run();
  });
  document.body.appendChild(promptEl);
  const first = promptEl.querySelector("button");
  if (first) first.focus();
}

function closeCycleEditor() {
  if (promptEl) promptEl.remove();
  promptEl = null;
}

function openCycleEditor(name) {
  if (promptEl) promptEl.remove();
  const current = state.cycles[name] > 0 ? state.cycles[name] : "";
  const fallback = defaultCycles(name);
  promptEl = document.createElement("div");
  promptEl.className = "rc-overlay rc-overlay-top";
  promptEl.innerHTML = `<div class="rc-prompt rc-cycle-edit guro-frame" role="dialog" aria-modal="true" aria-label="Editing Cycle"><div class="rc-cycle-edit-label">Editing Cycle</div><div class="rc-cycle-edit-row"><input type="number" min="0" max="${MAX_CUSTOM_CYCLES}" step="1" inputmode="numeric" class="rc-cycle-input guro-frame" data-rc-cycle-input value="${current}" placeholder="${fallback}" aria-label="Cycle count"><button type="button" class="rc-prompt-btn guro-frame" data-rc-cycle-save>Save</button></div></div>`;
  promptEl.addEventListener("click", e => {
    if (e.target === promptEl) {
      closeCycleEditor();
      return;
    }
    if (e.target.closest("[data-rc-cycle-save]")) saveCycleEdit(name);
  });
  promptEl.addEventListener("keydown", e => {
    if (e.key === "Enter") {
      e.preventDefault();
      saveCycleEdit(name);
    }
  });
  document.body.appendChild(promptEl);
  const input = promptEl.querySelector("[data-rc-cycle-input]");
  if (input) {
    input.focus();
    input.select();
  }
}

function saveCycleEdit(name) {
  if (!promptEl) return;
  const input = promptEl.querySelector("[data-rc-cycle-input]");
  const btn = promptEl.querySelector("[data-rc-cycle-save]");
  if (!input || (btn && btn.disabled)) return;
  const value = input.value === "" ? 0 : Math.floor(Number(input.value));
  if (btn) btn.disabled = true;
  input.disabled = true;
  const chip = document.createElement("div");
  chip.className = "bg-sim-saving guro-frame";
  chip.innerHTML = `<span class="bg-sim-spin"></span><span class="bg-sim-saving-text">Saving...</span>`;
  document.body.appendChild(chip);
  setTimeout(() => {
    if (isFinite(value) && value > 0) state.cycles[name] = Math.min(value, MAX_CUSTOM_CYCLES); else delete state.cycles[name];
    saveState();
    closeCycleEditor();
    refreshResults();
    chip.classList.add("is-done");
    chip.innerHTML = `<span class="bg-sim-tick">✓</span><span class="bg-sim-saving-text">Saved</span>`;
    setTimeout(() => chip.remove(), 900);
  }, 700);
}

function saveNodes() {
  const draft = nodesDraft || {};
  Object.keys(draft).forEach(n => {
    calc.setGreenhouseCount(n, Math.max(0, Math.floor(Number(draft[n]) || 0)));
  });
  prices.invalidateCostCache();
  ui.renderLibraryLists();
  ui.renderBoostPanel();
  calc.updateCalcSummary();
  nodesDraft = null;
  calc.toast("✅ Greenhouse plots saved");
  renderOverlayBody();
  refreshResults();
}

function toggleCrop(name, input) {
  const idx = state.selected.indexOf(name);
  if (idx >= 0) {
    state.selected.splice(idx, 1);
  } else {
    if (state.mode === "24h" && state.selected.length >= 1) {
      if (input) input.checked = false;
      showPrompt("Only one plant can be calculated in 24Hrs Mode. Uncheck the selected plant first, or switch to Per Restock Mode to calculate several plants.", [ {
        label: "OK"
      } ]);
      return;
    }
    state.selected.push(name);
  }
  saveState();
  const label = input ? input.closest(".rc-crop") : null;
  if (label) label.classList.toggle("is-on", state.selected.includes(name));
  refreshResults();
}

function setMode(id) {
  if (id === state.mode) return;
  if (id === "24h" && state.selected.length > 1) {
    showPrompt("Only one plant can be calculated in 24Hrs Mode. Uncheck the other plants first, then switch.", [ {
      label: "OK"
    } ]);
    return;
  }
  state.mode = id;
  saveState();
  refreshResults();
}

function onClick(e) {
  const details = e.target.closest("[data-rc-details]");
  if (details) {
    detailsOpen = !detailsOpen;
    refreshResults();
    return;
  }
  const season = e.target.closest("[data-rc-season]");
  if (season) {
    state.season = season.getAttribute("data-rc-season");
    saveState();
    const seasons = host.querySelector("#rcSeasons");
    const crops = host.querySelector("#rcCrops");
    if (seasons) seasons.innerHTML = seasonCardsHtml();
    if (crops) crops.innerHTML = cropCellsHtml();
    return;
  }
  const mode = e.target.closest("[data-rc-mode]");
  if (mode) {
    setMode(mode.getAttribute("data-rc-mode"));
    return;
  }
  const open = e.target.closest("[data-rc-open]");
  if (open && !open.disabled) openPopup(open.getAttribute("data-rc-open"));
}

function onChange(e) {
  const t = e.target;
  if (t && t.dataset && t.dataset.rcCrop != null) toggleCrop(t.dataset.rcCrop, t);
}

function onDocClick(e) {
  if (!overlayEl) return;
  if (promptEl && promptEl.contains(e.target)) return;
  if (e.target === overlayEl || e.target.closest("[data-rc-close]")) {
    closePopup(false);
    return;
  }
  if (!overlayEl.contains(e.target)) return;
  if (e.target.closest("#rcNodesSave")) {
    saveNodes();
    return;
  }
  const matBtn = e.target.closest("[data-rc-mat]");
  if (matBtn && popup === "computation") {
    calc.setMaterialMode("Oil", matBtn.getAttribute("data-rc-mat"), matBtn.getAttribute("data-rc-mode"));
    prices.invalidateCostCache();
    renderOverlayBody();
    refreshResults();
    return;
  }
  const editCycle = e.target.closest("[data-rc-edit-cycle]");
  if (editCycle && popup === "computation") {
    openCycleEditor(editCycle.getAttribute("data-rc-edit-cycle"));
    return;
  }
  const row = e.target.closest("[data-boost-id]");
  if (row && popup === "boost" && overlayEl.contains(row)) {
    ui.draftToggleBoost(row.getAttribute("data-boost-id"));
    renderOverlayBody();
  }
}

function onDocInput(e) {
  const t = e.target;
  if (t && t.dataset && t.dataset.rcNode != null) {
    nodesDraft = nodesDraft || {};
    nodesDraft[t.dataset.rcNode] = t.value === "" ? 0 : Number(t.value);
  }
}

function onKey(e) {
  if (e.key !== "Escape") return;
  if (promptEl) {
    promptEl.remove();
    promptEl = null;
    return;
  }
  if (popup) closePopup(false);
}

function onBoostsChanged() {
  if (!host) return;
  prices.invalidateCostCache();
  if (popup === "boost") renderOverlayBody();
  refreshResults();
}

function onExternalChange() {
  if (!host) return;
  refreshResults();
}

export function mountGreenhouseCalculator(root, appApi) {
  host = root;
  api = appApi;
  prices.invalidateCostCache();
  state = loadState();
  detailsOpen = false;
  syncGemRatio();
  host.addEventListener("click", onClick);
  host.addEventListener("change", onChange);
  document.addEventListener("click", onDocClick);
  document.addEventListener("input", onDocInput);
  document.addEventListener("keydown", onKey);
  window.addEventListener("guroBoostsChanged", onBoostsChanged);
  window.addEventListener("guroGemPackChanged", onExternalChange);
  window.addEventListener("guroPricesUpdated", onExternalChange);
  listening = true;
  render();
}

export function unmountGreenhouseCalculator() {
  if (popup) destroyPopup();
  if (promptEl) {
    promptEl.remove();
    promptEl = null;
  }
  if (host) {
    host.removeEventListener("click", onClick);
    host.removeEventListener("change", onChange);
    host.innerHTML = "";
  }
  if (listening) {
    document.removeEventListener("click", onDocClick);
    document.removeEventListener("input", onDocInput);
    document.removeEventListener("keydown", onKey);
    window.removeEventListener("guroBoostsChanged", onBoostsChanged);
    window.removeEventListener("guroGemPackChanged", onExternalChange);
    window.removeEventListener("guroPricesUpdated", onExternalChange);
    listening = false;
  }
  host = null;
  api = null;
}

export function greenhouseCalculatorCanLeave() {
  if (!popup) return true;
  if (isPopupDirty()) {
    calc.toast("⚠️ Save your changes first");
    return false;
  }
  destroyPopup();
  return true;
}
