import * as calc from "./calculator.js";
import * as prices from "./prices.js";
import * as ui from "./ui.js";
import { boostsBySubjectHtml } from "./rescalc_boosts.js";
import { farmPanelGetMarketPriceFlower } from "./inprogress.js";
import { applySelection, currentRatio } from "./gem_packs.js";
import { restockShareCount } from "./rescalc_shared.js";

const STORE_KEY = "guro_rc_fruits_v1";

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
      if (Array.isArray(raw.selected)) base.selected = raw.selected.filter(n => calc.BASE_FRUITS[n]);
      if (raw.cycles && typeof raw.cycles === "object") Object.keys(raw.cycles).forEach(k => {
        const v = Math.floor(Number(raw.cycles[k]));
        if (calc.BASE_FRUITS[k] && isFinite(v) && v > 0) base.cycles[k] = Math.min(v, MAX_CUSTOM_CYCLES);
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

function fruitNames() {
  return Object.keys(calc.BASE_FRUITS);
}

function visibleFruits() {
  const all = fruitNames();
  if (state.season === "All") return all;
  return all.filter(n => calc.getFruitSeasons(n).includes(state.season));
}

function averageHarvests(d, boosted) {
  return boosted.minHarvestVal + (d.moonOnly ? 0 : 1);
}

function woodPriceFlower() {
  const market = farmPanelGetMarketPriceFlower("Wood");
  if (market > 0) return market;
  return calc.coinsToFlower(prices.getMaterialUnitCostCoins("Wood", "collect"));
}

function ratioInfo() {
  const fpg = calc.flowerPerGem();
  return {
    free: !(fpg > 0),
    gemsPerFlower: fpg > 0 ? 1 / fpg : 0
  };
}

function compute(name, mode, share) {
  const d = calc.BASE_FRUITS[name];
  const boosted = calc.computeBoostedFruitStats(name, d.yieldPerHarvest || 1, d.timeSec, d.minHarvest || 1);
  const nodes = calc.getFruitCount(name) || 0;
  const moon = !!d.moonOnly;
  const avgH = averageHarvests(d, boosted);
  const minH = boosted.minHarvestVal;
  const maxH = minH + (moon ? 0 : 2);
  const sell = farmPanelGetMarketPriceFlower(name) || 0;
  const woodPrice = woodPriceFlower();
  const feeRate = (calc.feePercent || 0) / 100;
  const seedCost = calc.coinsToFlower(prices.getFruitSeedFertCoins(name));
  const axeCoins = boosted.noWoodCost ? 0 : (d.axeQty || 0) * ((calc.RESOURCE_DATA.Wood || {}).toolCoinCost || 0);
  const axeCost = calc.coinsToFlower(axeCoins);
  const woodQty = Math.max(0, (d.woodReturnQty || 0) - (boosted.woodReturnPenalty || 0) + (boosted.woodReturnAdd || 0));
  const shrine = prices.getActiveShrineDailyCost(boosted.activeBoosts);
  const stockBase = calc.BASE_STOCK_FRUITS[name] || 0;
  const stockQty = stockBase ? calc.computeBoostedStock(stockBase, "seed", name) : 0;
  const gemPerRestock = moon ? 0 : prices.getRestockGemCostIndividual("seed");
  const fullRestockFlower = calc.gemsToFlower(gemPerRestock);
  const yieldPlot = boosted.yieldVal;
  const lifeSec = avgH * boosted.timeVal;
  const yieldTree = avgH * yieldPlot;
  const yieldAll = nodes * yieldTree;
  const fruitGrossTree = yieldTree * sell;
  const woodGrossTree = woodQty * woodPrice;
  const grossCycle = nodes * (fruitGrossTree + woodGrossTree);
  const costCycle = nodes * seedCost;
  const axeCycle = nodes * axeCost;
  const shrineCycle = shrine.total * lifeSec / 86400;
  const out = {
    name: name,
    nodes: nodes,
    moon: moon,
    timeSec: boosted.timeVal,
    lifeSec: lifeSec,
    minH: minH,
    maxH: maxH,
    avgH: avgH,
    yieldPlot: yieldPlot,
    yieldTree: yieldTree,
    yieldAll: yieldAll,
    sell: sell,
    woodQty: woodQty,
    woodPrice: woodPrice,
    seedCost: seedCost,
    axeCostTree: axeCost,
    grossCycle: grossCycle,
    costCycle: costCycle,
    axeCycle: axeCycle,
    shrineCycle: shrineCycle,
    feeRate: feeRate,
    gemPerRestock: gemPerRestock,
    fullRestockFlower: fullRestockFlower,
    stockQty: stockQty,
    activeBoosts: boosted.activeBoosts,
    freeAxeBy: boosted.activeBoosts.filter(b => b.noWood).map(b => b.name),
    shareCount: share,
    mode: mode
  };
  const customCycles = state.cycles[name] > 0 ? state.cycles[name] : 0;
  let cycles = 0;
  let trees = 0;
  let totalYield = 0;
  let shrineTotal = 0;
  let restockCost = 0;
  let restockQty = 0;
  let restockGems = 0;
  let totalTimeSec = 0;
  if (nodes > 0) {
    if (mode === "restock") {
      const sim = stockQty > 0 ? calc.simulateStockCycles(pc => {
        const s = calc.computeBoostedFruitStats(name, d.yieldPerHarvest || 1, d.timeSec, d.minHarvest || 1, pc);
        return {
          yieldVal: avgH * s.yieldVal,
          timeVal: avgH * s.timeVal
        };
      }, nodes, stockQty) : {
        cycles: 0,
        totalUnits: 0,
        totalTimeSec: 0
      };
      cycles = sim.cycles * avgH;
      out.waves = sim.cycles;
      trees = stockQty;
      totalYield = sim.totalUnits;
      totalTimeSec = sim.totalTimeSec;
      shrineTotal = shrine.total * totalTimeSec / 86400;
      restockQty = stockQty > 0 && !moon ? 1 : 0;
      restockCost = restockQty ? fullRestockFlower / Math.max(1, share) : 0;
      restockGems = restockQty ? gemPerRestock / Math.max(1, share) : 0;
    } else {
      cycles = customCycles > 0 ? customCycles : Math.round(86400 / boosted.timeVal);
      trees = nodes * cycles / avgH;
      totalYield = nodes * yieldPlot * cycles;
      totalTimeSec = customCycles > 0 ? cycles * boosted.timeVal : 86400;
      shrineTotal = shrine.total * totalTimeSec / 86400;
      const det = stockBase ? prices.computeRestockCost24hDetailedIndividual(stockBase, "seed", nodes, cycles, avgH, undefined, name) : null;
      restockQty = det ? Math.ceil(det.restocksPerDay - 1e-9) : 0;
      restockGems = restockQty * gemPerRestock;
      restockCost = calc.gemsToFlower(restockGems);
    }
  }
  const woodTotalYield = trees * woodQty;
  const grossFruit = totalYield * sell;
  const grossWood = woodTotalYield * woodPrice;
  const gross = grossFruit + grossWood;
  const fee = gross * feeRate;
  const costTotal = trees * seedCost;
  const axeTotal = trees * axeCost;
  out.cycles = cycles;
  out.cyclesCustom = mode === "24h" && customCycles > 0;
  out.treeHarvests = trees * avgH;
  out.trees = trees;
  out.totalTimeSec = totalTimeSec;
  out.totalYield = totalYield;
  out.woodTotalYield = woodTotalYield;
  out.grossFruit = grossFruit;
  out.grossWood = grossWood;
  out.gross = gross;
  out.fee = fee;
  out.cost = costTotal;
  out.axe = axeTotal;
  out.shrine = shrineTotal;
  out.restock = restockCost;
  out.restockQty = restockQty;
  out.restockGems = restockGems;
  out.net = gross - fee - costTotal - axeTotal - shrineTotal - restockCost;
  const treeCycles = nodes > 0 && trees > 0 ? trees / nodes : 0;
  out.restockCycle = treeCycles > 0 ? restockCost / treeCycles : 0;
  out.netCycle = grossCycle * (1 - feeRate) - costCycle - axeCycle - shrineCycle - out.restockCycle;
  return out;
}

function defaultCycles(name) {
  const d = calc.BASE_FRUITS[name];
  if (!d) return 0;
  const boosted = calc.computeBoostedFruitStats(name, d.yieldPerHarvest || 1, d.timeSec, d.minHarvest || 1);
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
  return state.selected.filter(n => calc.BASE_FRUITS[n]).map(n => compute(n, state.mode, share));
}

function totalsOf(rows) {
  const t = {
    gross: 0,
    fee: 0,
    cost: 0,
    axe: 0,
    shrine: 0,
    restock: 0,
    net: 0
  };
  rows.forEach(r => {
    t.gross += r.gross;
    t.fee += r.fee;
    t.cost += r.cost;
    t.axe += r.axe;
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
  return visibleFruits().map(n => {
    const on = state.selected.includes(n);
    return `<label class="rc-crop guro-frame${on ? " is-on" : ""}"><span class="rc-crop-icon">${ui.getIcon(n)}</span><span class="rc-crop-name">${esc(n)}</span><input type="checkbox" data-rc-crop="${esc(n)}"${on ? " checked" : ""} aria-label="${esc(n)}"></label>`;
  }).join("");
}

function tilesHtml(rows) {
  if (!rows.length) return `<div class="rc-empty">No fruits selected yet. Tick a fruit above to include it in the calculation.</div>`;
  return `<div class="rc-tiles">${rows.map(r => {
    const good = r.net >= 0;
    return `<div class="rc-tile guro-frame ${good ? "is-profit" : "is-loss"}" data-rc-tile="${esc(r.name)}"><span class="rc-tile-icon">${ui.getIcon(r.name)}</span><span class="rc-tile-yield">${signed(r.totalYield, n2)}</span><span class="rc-tile-net">${fl(r.gross)}${calc.FLOWER_ICON}</span></div>`;
  }).join("")}</div>`;
}

function valueBoxHtml(label, html, extra) {
  return `<div class="rc-val guro-frame${extra ? " " + extra : ""}"><span class="rc-val-label">${label}</span><span class="rc-val-num">${html}</span></div>`;
}

function valuesHtml(rows) {
  const t = totalsOf(rows);
  const feeBox = (calc.feePercent || 0) > 0 ? valueBoxHtml("Market Fee", flowerHtml(t.fee)) : "";
  return `<div class="rc-values">
    ${valueBoxHtml("Gross", flowerHtml(t.gross))}
    ${valueBoxHtml("Cost", flowerHtml(t.cost))}
    ${valueBoxHtml("Axe Cost", flowerHtml(t.axe))}
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
  const warn = missing.length ? `<div class="rc-note is-warn">${missing.map(r => esc(r.name)).join(", ")} ${missing.length === 1 ? "has" : "have"} 0 Fruit Patches, so ${missing.length === 1 ? "its result is" : "their results are"} 0. Open Nodes above and enter your fruit patches.</div>` : "";
  const moon = rows.some(r => r.moon) ? `<div class="rc-note">Moon fruits are only sold on a real Full Moon day, so their restock cost is 0.</div>` : "";
  const text = state.mode === "restock" ? `Per Restock Mode: 1 restock is shared by all ${restockShareCount()} seeds (all crops, fruits, greenhouse and flower seeds, moon seeds excluded), selected or not. Every seed grows 1 tree that is harvested an average number of times, then chopped for Wood.` : "24Hrs Mode: the fruit keeps restocking all day and pays for every restock alone. Trees are replanted as they die, using the average harvests per tree.";
  return `<div class="rc-details-row"><button type="button" class="rc-linktext" data-rc-details aria-expanded="${detailsOpen ? "true" : "false"}">Details</button></div>${detailsOpen ? `<div class="rc-note">${text}</div>${moon}` : ""}${warn}`;
}

function pickerHtml() {
  return `<section class="rc-block guro-frame" aria-label="Fruit Calculator">
    <div class="rc-block-title">Fruit Calculator</div>
    <div class="rc-seasons" id="rcSeasons">${seasonCardsHtml()}</div>
    <div class="rc-crops" id="rcCrops">${cropCellsHtml()}</div>
  </section>`;
}

function resultsHtml() {
  const rows = computeAll();
  return `<section class="rc-block guro-frame" aria-label="Fruit results">
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
  const h = [];
  const add = calc.getEffectiveYieldAdd(b, undefined, name, {
    name: name,
    kind: "fruit"
  });
  if (add) y.push(`${add > 0 ? "+" : ""}${n2(add)} yield`);
  if (b.yieldAddAll) y.push(`+${n2(b.yieldAddAll)} yield`);
  if (b.yieldMult) y.push(`×${b.yieldMult} yield`);
  if (b.yieldMultAll) y.push(`×${b.yieldMultAll} yield`);
  if (b.harvestAdd) h.push(`+${n2(b.harvestAdd)} harvest`);
  if (b.noWood) h.push("free axe");
  if (b.woodReturnPenalty) h.push(`-${n2(b.woodReturnPenalty)} wood`);
  if (b.woodReturnAdd) h.push(`+${n2(b.woodReturnAdd)} wood`);
  if (b.timeMult) t.push(`×${b.timeMult} time`);
  if (b.timeMultAll) t.push(`×${b.timeMultAll} time`);
  if (b.freeCost) c.push("free seeds");
  if (b.coinCostMult) c.push(`×${b.coinCostMult} cost`);
  if (b.coinCostMultAll) c.push(`×${b.coinCostMultAll} cost`);
  return {
    yield: y,
    harvest: h,
    time: t,
    cost: c
  };
}

function appliedBoostHtml(row) {
  const groups = {
    yield: [],
    harvest: [],
    time: [],
    cost: []
  };
  const list = row.activeBoosts.slice();
  const artist = calc.BOOSTS.find(b => b.id === "artist_discount");
  if (artist && calc.isBoostActive(artist.id) && !list.includes(artist)) list.push(artist);
  list.forEach(b => {
    const p = effectParts(b, row.name);
    [ "yield", "harvest", "time", "cost" ].forEach(k => {
      if (p[k].length) groups[k].push(`<div class="rc-boost-row">${ui.getBoostIconSkillFallback(b.name)}<span class="rc-boost-name">${esc(b.name)}</span><span class="rc-boost-eff">${esc(p[k].join(", "))}</span></div>`);
    });
  });
  const section = (label, items) => items.length ? `<div class="rc-boost-group"><div class="rc-boost-label">${label}</div>${items.join("")}</div>` : "";
  const body = section("Yield Boost", groups.yield) + section("Harvest and Wood Boost", groups.harvest) + section("Time Boost", groups.time) + section("Cost Boost", groups.cost);
  return `<div class="rc-group"><div class="rc-comp-sub">Applied Boost</div>${body || `<div class="rc-boost-none">No boost applied</div>`}</div>`;
}

function kv(label, html, cls) {
  return `<div class="rc-kv${cls ? " " + cls : ""}"><span class="rc-kv-label">${label}</span><span class="rc-kv-val">${html}</span></div>`;
}

function totalCycleHtml(r) {
  const val = "×" + n2(r.cycles);
  if (r.mode !== "24h") return val;
  return `<span class="rc-cycle-val"><span>${val}${r.cyclesCustom ? ` <span class="rc-kv-sub">Custom</span>` : ""}</span><button type="button" class="rc-edit-link" data-rc-edit-cycle="${esc(r.name)}">Edit</button></span>`;
}

function computationCardHtml(r) {
  const ratio = ratioInfo();
  const modeLabel = r.mode === "restock" ? "Per Restock Mode" : "24Hrs Mode";
  const qtyLabel = r.mode === "restock" ? `×${r.restockQty} Restock` : `×${n2(r.restockQty)} Restock${r.restockQty === 1 ? "" : "s"}`;
  const gemLine = `${gemHtml(r.gemPerRestock)}`;
  const ratioLine = ratio.free ? `Free gems` : `1${calc.FLOWER_ICON} : ${n2(ratio.gemsPerFlower)}${calc.GEM_ICON}`;
  const shareLine = r.mode === "restock" && !r.moon && r.shareCount > 1 ? `<div class="rc-kv rc-kv-wide"><span class="rc-kv-label">Your share of 1 restock</span><span class="rc-kv-val">1/${r.shareCount} = ${flowerHtml(r.restock)}</span></div>` : "";
  const rangeLabel = r.minH === r.maxH ? `${n2(r.avgH)} (fixed)` : `${n2(r.avgH)} (${n2(r.minH)} to ${n2(r.maxH)})`;
  const freeAxe = r.freeAxeBy.length > 0;
  const axeTree = freeAxe ? `Free<span class="rc-kv-sub">${esc(r.freeAxeBy.join(", "))}</span>` : flowerHtml(r.axeCostTree);
  const wavesRow = r.mode === "restock" ? kv("Planting Waves", n2(r.waves || 0)) : "";
  return `<article class="rc-comp-card guro-frame">
    <header class="rc-comp-head"><span class="rc-comp-icon">${ui.getIcon(r.name)}</span><span class="rc-comp-name">${esc(r.name)}</span><span class="rc-comp-nodes">${ui.getIcon("Fruit Patch")} ${n2(r.nodes)}</span></header>
    <div class="rc-group"><div class="rc-comp-sub">Each Harvest (all ${n2(r.nodes)} patches)</div>
    <div class="rc-kv-grid">
      ${kv("Growth Time / Harvest", esc(calc.formatDuration(r.timeSec)), "rc-kv-wide")}
      ${kv("Yield / Patch", `${signed(r.yieldPlot, n2)}${ui.getIcon(r.name)}`)}
      ${kv("Yield / Harvest", `${signed(r.nodes * r.yieldPlot, n2)}${ui.getIcon(r.name)}`)}
      ${kv("Market Price / Unit", flowerSigned(r.sell))}
      ${kv("Gross / Harvest", flowerSigned(r.nodes * r.yieldPlot * r.sell))}
    </div>
    <div class="rc-comp-sub">One Tree, Whole Life</div>
    <div class="rc-kv-grid">
      ${kv("Average Harvests / Tree", rangeLabel, "rc-kv-wide")}
      ${kv("Tree Lifespan", esc(calc.formatDuration(r.lifeSec)), "rc-kv-wide")}
      ${kv("Yield / Tree", `${signed(r.yieldTree, n2)}${ui.getIcon(r.name)}`)}
      ${kv("Gross / Tree", flowerSigned(r.yieldTree * r.sell))}
      ${kv("Wood / Tree", `${signed(r.woodQty, n2)}${ui.getIcon("Wood")}`)}
      ${kv("Wood Price / Unit", flowerSigned(r.woodPrice))}
      ${kv("Seed Cost / Tree", flowerHtml(r.seedCost))}
      ${kv("Axe Cost / Tree", axeTree)}
    </div></div>
    <div class="rc-group"><div class="rc-comp-sub">Tree Cycle (${n2(r.nodes)} trees, planting until chopped)</div>
    <div class="rc-kv-grid">
      ${kv("Yield / Tree Cycle", `${signed(r.yieldAll, n2)}${ui.getIcon(r.name)}`)}
      ${kv("Gross / Tree Cycle", flowerSigned(r.grossCycle))}
      ${kv("Seed Cost / Cycle", flowerHtml(r.costCycle))}
      ${kv("Axe Cost / Cycle", flowerHtml(r.axeCycle))}
      ${kv("Shrine / Cycle", flowerHtml(r.shrineCycle))}
      ${kv("Restock / Cycle", flowerHtml(r.restockCycle))}
      ${kv("Net / Cycle", `<span class="${r.netCycle >= 0 ? "is-profit" : "is-loss"}">${signed(r.netCycle, fl)}${calc.FLOWER_ICON}</span>`, "rc-kv-wide")}
    </div></div>
    <div class="rc-group"><div class="rc-comp-sub">${modeLabel}</div>
    <div class="rc-kv-grid">
      ${kv("Tree Lifetimes Used", n2(r.trees))}
      ${wavesRow}
      ${kv("Harvest Rounds", totalCycleHtml(r))}
      ${kv("Total Harvests (all trees)", n2(r.treeHarvests))}
      ${kv("Total Yield", `${signed(r.totalYield, n2)}${ui.getIcon(r.name)}`)}
      ${kv("Total Wood", `${signed(r.woodTotalYield, n2)}${ui.getIcon("Wood")}`)}
      ${kv("Fruit Gross", flowerSigned(r.grossFruit))}
      ${kv("Wood Gross", flowerSigned(r.grossWood))}
      ${kv("Total Gross", flowerSigned(r.gross))}
      ${kv("Total Seed Cost", flowerHtml(r.cost))}
      ${kv("Total Axe Cost", flowerHtml(r.axe))}
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
  </article>`;
}

function computationBodyHtml() {
  const rows = computeAll();
  if (!rows.length) return `<div class="rc-empty">No fruits selected.</div>`;
  return rows.map(computationCardHtml).join("");
}

function boostBodyHtml() {
  if (!state.selected.length) return `<div class="rc-empty">Select at least one fruit to see the boosts that affect it.</div>`;
  const subjects = state.selected.map(n => ({
    name: n,
    icon: ui.getIcon(n)
  }));
  const boosts = calc.BOOSTS.filter(b => b.category === "fruits" && b.source !== "skill" && !b.hiddenFromOwnPanel);
  const appliesTo = (b, s) => {
    if (b.scope === "global") return true;
    if (b.scope === "fruit") return (b.target || "").toLowerCase() === s.name.toLowerCase();
    if (b.scope === "fruitList") return Array.isArray(b.fruits) && b.fruits.some(f => f.toLowerCase() === s.name.toLowerCase());
    return false;
  };
  const html = boostsBySubjectHtml({
    subjects: subjects,
    boosts: boosts,
    appliesTo: appliesTo,
    unit: "patches",
    allLabel: "Boost for All Selected Fruits"
  });
  return `<div class="rc-pop-hint">Boosts that affect ${state.selected.length > 1 ? "your selected fruits" : esc(state.selected[0])}. Tap a boost to switch it on or off, then press Save.</div>${html || `<div class="rc-empty">No boosts found.</div>`}`;
}

function nodesBodyHtml() {
  if (!state.selected.length) return `<div class="rc-empty">Select at least one fruit to set its Fruit Patches.</div>`;
  const rows = state.selected.map(n => {
    const value = nodesDraft && nodesDraft[n] != null ? nodesDraft[n] : calc.getFruitCount(n);
    return `<label class="rc-node-row guro-frame"><span class="rc-node-icon">${ui.getIcon(n)}</span><span class="rc-node-text"><span class="rc-node-name">${esc(n)}</span><span class="rc-node-used">Fruit Patches planted with ${esc(n)}</span></span><input type="number" min="0" step="1" inputmode="numeric" data-rc-node="${esc(n)}" value="${value ? value : ""}" placeholder="0"></label>`;
  }).join("");
  return `<div class="rc-pop-hint">Enter how many Fruit Patches grow each selected fruit, then press Save.</div>${rows}`;
}

function popupTitle() {
  if (popup === "skills") return "Fruit Skills";
  if (popup === "boost") return "Fruit Boosts";
  if (popup === "nodes") return "Fruit Nodes";
  return "Computation";
}

function popupBodyHtml() {
  if (popup === "boost") return boostBodyHtml();
  if (popup === "nodes") return nodesBodyHtml();
  if (popup === "computation") return computationBodyHtml();
  return `<div class="rc-pop-hint">All fruit patch skills from the Skill Tree. Changes here also change the Skill Tree. Press Save to apply them.</div><div id="rcSkillSlot"></div>`;
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
    calc.setSkillCategory("fruitpatch");
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
  if (popup === "nodes") return !!nodesDraft && Object.keys(nodesDraft).some(n => Number(nodesDraft[n]) !== (calc.getFruitCount(n) || 0));
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
    calc.setFruitCount(n, Math.max(0, Math.floor(Number(draft[n]) || 0)));
  });
  prices.invalidateCostCache();
  ui.renderLibraryLists();
  ui.renderBoostPanel();
  calc.updateCalcSummary();
  nodesDraft = null;
  calc.toast("✅ Fruit patches saved");
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
      showPrompt("Only one fruit can be calculated in 24Hrs Mode. Uncheck the selected fruit first, or switch to Per Restock Mode to calculate several fruits.", [ {
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
    showPrompt("Only one fruit can be calculated in 24Hrs Mode. Uncheck the other fruits first, then switch.", [ {
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

export function mountFruitsCalculator(root, appApi) {
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

export function unmountFruitsCalculator() {
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

export function fruitsCalculatorCanLeave() {
  if (!popup) return true;
  if (isPopupDirty()) {
    calc.toast("⚠️ Save your changes first");
    return false;
  }
  destroyPopup();
  return true;
}
