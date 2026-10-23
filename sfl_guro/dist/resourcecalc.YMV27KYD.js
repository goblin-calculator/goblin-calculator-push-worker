import {
  applySelection,
  currentRatio
} from "./chunk.F7REBWYF.js";
import {
  BASE_CROPS,
  BASE_FRUITS,
  BASE_GREENHOUSE,
  BASE_STOCK_CROPS,
  BASE_STOCK_FLOWERS,
  BASE_STOCK_FRUITS,
  BASE_STOCK_GREENHOUSE,
  BASE_STOCK_TOOLS,
  BEE_SWARM_ICON,
  BOOSTS,
  COIN_ICON,
  CROPS_GLOBAL_EXCLUDED_FROM_GREENHOUSE,
  FLOWER_ICON,
  FLOWER_VARIETIES,
  GEM_ICON,
  IMAGE_ICONS,
  RESOURCE_DATA,
  RESOURCE_NODE_TIERS,
  SEASON_EMOJI,
  SEASON_ORDER,
  coinsToFlower,
  computeBoostedCropStats,
  computeBoostedFruitStats,
  computeBoostedGreenhouseStats,
  computeBoostedStock,
  computeHiveEconomics,
  computeResourceFigures,
  computeRestockCost24hDetailedIndividual,
  discardSkillBoostDrafts,
  draftToggleBoost,
  escapeHtml,
  farmPanelGetMarketPriceFlower,
  feePercent,
  flowerPerGem,
  fmt,
  formatDuration,
  gemsToFlower,
  getActiveShrineDailyCost,
  getBoostIcon,
  getBoostIconAnyFallback,
  getBoostIconSkillFallback,
  getCropCostCoins,
  getCropSeasons,
  getEffectiveYieldAdd,
  getFruitCount,
  getFruitSeasons,
  getFruitSeedFertCoins,
  getGreenhouseCount,
  getGreenhouseSeedCoins,
  getHiveCount,
  getIcon,
  getInstantRegrowChance,
  getInstantRegrowSources,
  getItemCostByName,
  getMaterialUnitCostCoins,
  getNodeCount,
  getNodeTierCounts,
  getPlotCount,
  getRestockGemCostIndividual,
  hasManualMaterialMode,
  invalidateCostCache,
  isBoostActive,
  isBoostDraftActive,
  isBoostDraftDirty,
  isFlowerVarietySeasonLocked,
  isSeasonLocked,
  isSkillActive,
  isSkillDraftDirty,
  isTieredResource,
  loadBaseCropsIfNeeded,
  loadBaseHoneyIfNeeded,
  previewSeason,
  renderAscensionBar,
  renderBoostPanel,
  renderHoneyList,
  renderLibraryLists,
  renderSkillPanel,
  selectedHoneyFlower,
  selectedSwarmCrop,
  setAutoMaterialModes,
  setFruitCount,
  setGreenhouseCount,
  setHiveCount,
  setMaterialMode,
  setNodeCount,
  setNodeTierQty,
  setPlotCount,
  setSelectedHoneyFlower,
  setSelectedSwarmCrop,
  setSkillCategory,
  simulateStockCycles,
  skillCategory,
  toast,
  updateCalcSummary,
  updateSkillSaveBarState
} from "./chunk.D7LWHYJT.js";
import "./chunk.LPEVZJ4B.js";
import "./chunk.VR6FV3KR.js";
import "./chunk.AS3VMXOQ.js";

// src/rescalc_boosts.js
var CATEGORIES = ["Yield", "Time", "Cost", "Stock", "Swarm", "Other"];
function esc(s) {
  return escapeHtml(String(s));
}
function n2(n) {
  if (!isFinite(n)) return "\u2014";
  return n.toLocaleString(void 0, {
    minimumFractionDigits: 0,
    maximumFractionDigits: 2
  });
}
function signed(v) {
  return `${v > 0 ? "+" : ""}${n2(v)}`;
}
function effectParts(b, ctx) {
  const parts = [];
  const add = (kind, text) => parts.push({
    kind,
    text
  });
  const keyed = (map, key) => {
    const keys = Object.keys(map);
    if (key != null && keys.includes(key)) return `${signed(map[key])} yield`;
    return keys.map((k) => `${k} ${signed(map[k])}`).join(" / ") + " yield";
  };
  if (b.tierEffects) add("Yield", keyed(b.tierEffects, ctx.tier));
  else if (b.resourceEffects) add("Yield", keyed(b.resourceEffects, ctx.name));
  else if (b.yieldAdd) add("Yield", `${signed(b.yieldAdd)} yield`);
  if (b.yieldAddAll) add("Yield", `${signed(b.yieldAddAll)} yield`);
  if (b.yieldMult) add("Yield", `\xD7${b.yieldMult} yield`);
  if (b.harvestAdd) add("Yield", `+${n2(b.harvestAdd)} harvest`);
  if (b.honeyYieldAdd) add("Yield", `${signed(b.honeyYieldAdd)} honey`);
  if (b.flowerExtraChance) add("Yield", `+${n2(b.flowerExtraChance)} flowers`);
  if (b.flowerExtraFlat) add("Yield", `+${n2(b.flowerExtraFlat)} flowers`);
  if (b.timeMult) add("Time", `\xD7${b.timeMult} time`);
  if (b.speedAdd) add("Time", `${signed(b.speedAdd)} speed`);
  if (b.flowerTimeMult) add("Time", `\xD7${b.flowerTimeMult} flower time`);
  if (b.freeCost) add("Cost", "free seeds");
  if (b.coinCostMultAll) add("Cost", `\xD7${b.coinCostMultAll} cost`);
  if (b.toolCostMult) add("Cost", `\xD7${b.toolCostMult} tool cost`);
  if (b.coinCostMult) add("Cost", `\xD7${b.coinCostMult} tool cost`);
  if (b.noTool) add("Cost", "free tool");
  if (b.noWood) add("Cost", "free axe");
  if (b.materialSwap) add("Cost", `${b.materialSwap.from} \u2192 ${b.materialSwap.to}`);
  if (b.seedQtyMult) add("Cost", `\xD7${b.seedQtyMult} seeds`);
  if (b.oilQtyMult) add("Cost", `\xD7${b.oilQtyMult} oil`);
  if (b.oilFlatReduce) add("Cost", `-${n2(b.oilFlatReduce)} oil`);
  if (b.stockAdd) add("Stock", `+${n2(b.stockAdd)} stock`);
  if (b.swarmChanceAdd) add("Swarm", `+${n2(b.swarmChanceAdd * 100)}% swarm chance`);
  if (b.swarmChanceMult) add("Swarm", `\xD7${b.swarmChanceMult} swarm chance`);
  if (b.woodReturnPenalty) add("Other", `-${n2(b.woodReturnPenalty)} wood`);
  if (b.woodReturnAdd) add("Other", `+${n2(b.woodReturnAdd)} wood`);
  if (b.plotCap) add("Other", `AOE ${b.plotCap} ${ctx.unit || "plots"}`);
  return parts;
}
function rowHtml(b, text, noteSkip) {
  const locked = isSeasonLocked(b);
  const active = isBoostDraftActive(b.id);
  const mark = locked ? "\u{1F512}" : `<input type="checkbox" class="rc-boost-check" tabindex="-1" aria-hidden="true"${active ? " checked" : ""}>`;
  const note = b.note && !noteSkip.test(b.note) && b.note.length < 60 ? ` \xB7 ${b.note}` : "";
  return `<div class="lib-item-row rc-boost-pick${active ? " boost-active" : ""}${locked ? " season-locked" : ""}" data-boost-id="${b.id}"><span class="lib-item-icon">${mark}</span><div class="lib-item-main"><div class="lib-item-name">${getBoostIcon(b.name)}${esc(b.name)}</div><div class="lib-item-meta">${esc(text)}${note}</div></div></div>`;
}
function subjectHtml(title, icon, list, ctx, noteSkip) {
  const buckets = {};
  list.forEach((b) => {
    const parts = effectParts(b, ctx);
    if (!parts.length) {
      (buckets.Other = buckets.Other || []).push(rowHtml(b, "", noteSkip));
      return;
    }
    const kinds = [];
    parts.forEach((p) => {
      if (!kinds.includes(p.kind)) kinds.push(p.kind);
    });
    kinds.forEach((k) => {
      const text = parts.filter((p) => p.kind === k).map((p) => p.text).join(", ");
      (buckets[k] = buckets[k] || []).push(rowHtml(b, text, noteSkip));
    });
  });
  const sections = CATEGORIES.filter((k) => buckets[k]).map((k) => `<div class="rc-boost-section"><div class="rc-boost-section-title">${k}</div>${buckets[k].join("")}</div>`).join("");
  if (!sections) return "";
  return `<div class="rc-boost-subject"><div class="rc-boost-subject-title guro-frame">${icon ? `<span class="rc-boost-subject-icon">${icon}</span>` : ""}<span>${esc(title)}</span></div>${sections}</div>`;
}
function boostsBySubjectHtml(opts) {
  const noteSkip = opts.noteSkip || /AOE|free seeds|expected/i;
  const subjects = opts.subjects;
  const perSubject = subjects.map((s) => ({
    subject: s,
    list: opts.boosts.filter((b) => opts.appliesTo(b, s))
  }));
  let html = "";
  let shared = [];
  if (subjects.length > 1) {
    shared = opts.boosts.filter((b) => perSubject.every((p) => p.list.includes(b)));
    if (shared.length) html += subjectHtml(`${opts.allLabel || "All Selected"}`, "", shared, {
      unit: opts.unit
    }, noteSkip);
  }
  perSubject.forEach((p) => {
    const list = p.list.filter((b) => !shared.includes(b));
    html += subjectHtml(`Boost for ${p.subject.name}`, p.subject.icon, list, {
      name: p.subject.name,
      tier: p.subject.tier,
      unit: opts.unit
    }, noteSkip);
  });
  return html;
}

// src/rescalc_shared.js
function restockShareCount() {
  const count = (bag) => Object.keys(bag).filter((n) => (bag[n] || 0) > 0).length;
  const fruits = Object.keys(BASE_STOCK_FRUITS).filter((n) => (BASE_STOCK_FRUITS[n] || 0) > 0 && !(BASE_FRUITS[n] && BASE_FRUITS[n].moonOnly)).length;
  return Math.max(1, count(BASE_STOCK_CROPS) + fruits + count(BASE_STOCK_GREENHOUSE) + count(BASE_STOCK_FLOWERS));
}
function toolRestockShareCount() {
  return Math.max(1, Object.keys(BASE_STOCK_TOOLS).filter((n) => (BASE_STOCK_TOOLS[n] || 0) > 0).length);
}

// src/rescalc_crops.js
var STORE_KEY = "guro_rc_crops_v1";
var MAX_CUSTOM_CYCLES = 1e5;
var MODES = [{
  id: "restock",
  label: "Per Restock Mode",
  short: "Per Restock Mode"
}, {
  id: "24h",
  label: "24Hrs Mode",
  short: "24Hrs Mode"
}];
var host = null;
var api = null;
var state = null;
var popup = null;
var overlayEl = null;
var promptEl = null;
var restoreFns = [];
var nodesDraft = null;
var listening = false;
var detailsOpen = false;
function esc2(s) {
  return escapeHtml(String(s));
}
function loadState() {
  const base = {
    mode: "restock",
    season: previewSeason || "Spring",
    selected: [],
    cycles: {}
  };
  try {
    const raw = JSON.parse(localStorage.getItem(STORE_KEY) || "null");
    if (raw && typeof raw === "object") {
      if (raw.mode === "24h" || raw.mode === "restock") base.mode = raw.mode;
      if (raw.season === "All" || SEASON_ORDER.includes(raw.season)) base.season = raw.season;
      if (Array.isArray(raw.selected)) base.selected = raw.selected.filter((n) => BASE_CROPS[n]);
      if (raw.cycles && typeof raw.cycles === "object") Object.keys(raw.cycles).forEach((k) => {
        const v = Math.floor(Number(raw.cycles[k]));
        if (BASE_CROPS[k] && isFinite(v) && v > 0) base.cycles[k] = Math.min(v, MAX_CUSTOM_CYCLES);
      });
    }
  } catch (e) {
  }
  if (base.mode === "24h" && base.selected.length > 1) base.selected = base.selected.slice(0, 1);
  return base;
}
function saveState() {
  try {
    localStorage.setItem(STORE_KEY, JSON.stringify(state));
  } catch (e) {
  }
}
function n22(n) {
  if (!isFinite(n)) return "\u2014";
  return n.toLocaleString(void 0, {
    minimumFractionDigits: 0,
    maximumFractionDigits: 2
  });
}
function fl(n) {
  if (!isFinite(n)) return "\u2014";
  const a = Math.abs(n);
  const max = a >= 1e3 ? 0 : a >= 1 ? 2 : 4;
  return n.toLocaleString(void 0, {
    minimumFractionDigits: 0,
    maximumFractionDigits: max
  });
}
function signed2(n, f) {
  const r = f(Math.abs(n));
  if (n > 0 && r !== "0") return "+" + r;
  if (n < 0 && r !== "0") return "-" + r;
  return r;
}
function flowerSigned(n) {
  return `${signed2(n, fl)}${FLOWER_ICON}`;
}
function flowerHtml(n) {
  return `${fl(n)}${FLOWER_ICON}`;
}
function gemHtml(n) {
  return `${n22(n)}${GEM_ICON}`;
}
function cropNames() {
  return Object.keys(BASE_CROPS);
}
function visibleCrops() {
  const all = cropNames();
  if (state.season === "All") return all;
  return all.filter((n) => getCropSeasons(n).includes(state.season));
}
function ratioInfo() {
  const fpg = flowerPerGem();
  return {
    free: !(fpg > 0),
    gemsPerFlower: fpg > 0 ? 1 / fpg : 0
  };
}
function compute(name, mode, share) {
  const d = BASE_CROPS[name];
  const boosted = computeBoostedCropStats(name, d.baseYield, d.timeSec);
  const nodes = getPlotCount(name) || 0;
  const sell = farmPanelGetMarketPriceFlower(name) || 0;
  const feeRate = (feePercent || 0) / 100;
  const seedCost = coinsToFlower(getCropCostCoins(name)) * boosted.yieldVal;
  const shrine = getActiveShrineDailyCost(boosted.activeBoosts);
  const stockBase = BASE_STOCK_CROPS[name] || 0;
  const stockQty = stockBase ? computeBoostedStock(stockBase, "seed", name) : 0;
  const gemPerRestock = getRestockGemCostIndividual("seed");
  const fullRestockFlower = gemsToFlower(gemPerRestock);
  const yieldPlot = boosted.yieldVal;
  const yieldAll = nodes * yieldPlot;
  const grossCycle = yieldAll * sell;
  const costCycle = nodes * seedCost;
  const shrineCycle = shrine.total * boosted.timeVal / 86400;
  const out = {
    name,
    tier: d.tier,
    nodes,
    timeSec: boosted.timeVal,
    yieldPlot,
    yieldAll,
    sell,
    grossCycle,
    costCycle,
    shrineCycle,
    feeRate,
    gemPerRestock,
    fullRestockFlower,
    stockQty,
    activeBoosts: boosted.activeBoosts,
    shareCount: share,
    mode
  };
  const customCycles = state.cycles[name] > 0 ? state.cycles[name] : 0;
  let cycles = 0;
  let totalYield = 0;
  let shrineTotal = 0;
  let costTotal = 0;
  let restockCost = 0;
  let restockQty = 0;
  let restockGems = 0;
  if (nodes > 0) {
    if (mode === "restock") {
      const sim = stockQty > 0 ? simulateStockCycles((pc) => computeBoostedCropStats(name, d.baseYield, d.timeSec, pc), nodes, stockQty) : {
        cycles: 0,
        totalUnits: 0,
        totalTimeSec: 0
      };
      cycles = sim.cycles;
      totalYield = sim.totalUnits;
      shrineTotal = shrine.total * sim.totalTimeSec / 86400;
      costTotal = stockQty * seedCost;
      restockQty = stockQty > 0 ? 1 : 0;
      restockCost = restockQty ? fullRestockFlower / Math.max(1, share) : 0;
      restockGems = restockQty ? gemPerRestock / Math.max(1, share) : 0;
      out.totalTimeSec = sim.totalTimeSec;
    } else {
      cycles = customCycles > 0 ? customCycles : Math.round(86400 / boosted.timeVal);
      const spanSec = customCycles > 0 ? cycles * boosted.timeVal : 86400;
      totalYield = yieldAll * cycles;
      shrineTotal = shrine.total * spanSec / 86400;
      costTotal = costCycle * cycles;
      const det = stockBase ? computeRestockCost24hDetailedIndividual(stockBase, "seed", nodes, cycles, 1, void 0, name) : null;
      restockQty = det ? Math.ceil(det.restocksPerDay - 1e-9) : 0;
      restockGems = restockQty * gemPerRestock;
      restockCost = gemsToFlower(restockGems);
      out.totalTimeSec = spanSec;
    }
  }
  const gross = totalYield * sell;
  const fee = gross * feeRate;
  out.cycles = cycles;
  out.cyclesCustom = mode === "24h" && customCycles > 0;
  out.totalYield = totalYield;
  out.gross = gross;
  out.fee = fee;
  out.cost = costTotal;
  out.shrine = shrineTotal;
  out.restock = restockCost;
  out.restockQty = restockQty;
  out.restockGems = restockGems;
  out.net = gross - fee - costTotal - shrineTotal - restockCost;
  out.restockCycle = cycles > 0 ? restockCost / cycles : 0;
  out.netCycle = grossCycle * (1 - feeRate) - costCycle - shrineCycle - out.restockCycle;
  return out;
}
function defaultCycles(name) {
  const d = BASE_CROPS[name];
  if (!d) return 0;
  const boosted = computeBoostedCropStats(name, d.baseYield, d.timeSec);
  return boosted.timeVal > 0 ? Math.round(86400 / boosted.timeVal) : 0;
}
function syncGemRatio() {
  try {
    const want = currentRatio();
    const fpg = flowerPerGem();
    const have = fpg > 0 ? 1 / fpg : 0;
    const same = want.free ? !(fpg > 0) : Math.abs(want.gems - have) < 1e-6;
    if (!same) applySelection();
  } catch (e) {
  }
}
function computeAll() {
  syncGemRatio();
  const share = restockShareCount();
  return state.selected.filter((n) => BASE_CROPS[n]).map((n) => compute(n, state.mode, share));
}
function totalsOf(rows) {
  const t = {
    gross: 0,
    fee: 0,
    cost: 0,
    shrine: 0,
    restock: 0,
    net: 0
  };
  rows.forEach((r) => {
    t.gross += r.gross;
    t.fee += r.fee;
    t.cost += r.cost;
    t.shrine += r.shrine;
    t.restock += r.restock;
    t.net += r.net;
  });
  return t;
}
function seasonCardsHtml() {
  return SEASON_ORDER.concat(["All"]).map((s) => {
    const on = state.season === s;
    const icon = s === "All" ? `<span class="rc-season-all">\u2605</span>` : SEASON_EMOJI[s];
    return `<button type="button" class="rc-season guro-frame${on ? " is-on" : ""}" data-rc-season="${s}" aria-pressed="${on ? "true" : "false"}">${icon}<span class="rc-season-name">${s === "All" ? "Show All" : s}</span></button>`;
  }).join("");
}
function cropCellsHtml() {
  return visibleCrops().map((n) => {
    const on = state.selected.includes(n);
    return `<label class="rc-crop guro-frame${on ? " is-on" : ""}"><span class="rc-crop-icon">${getIcon(n)}</span><span class="rc-crop-name">${esc2(n)}</span><input type="checkbox" data-rc-crop="${esc2(n)}"${on ? " checked" : ""} aria-label="${esc2(n)}"></label>`;
  }).join("");
}
function tilesHtml(rows) {
  if (!rows.length) return `<div class="rc-empty">No crops selected yet. Tick a crop above to include it in the calculation.</div>`;
  return `<div class="rc-tiles">${rows.map((r) => {
    const good = r.net >= 0;
    return `<div class="rc-tile guro-frame ${good ? "is-profit" : "is-loss"}" data-rc-tile="${esc2(r.name)}"><span class="rc-tile-icon">${getIcon(r.name)}</span><span class="rc-tile-yield">${signed2(r.totalYield, n22)}</span><span class="rc-tile-net">${fl(r.gross)}${FLOWER_ICON}</span></div>`;
  }).join("")}</div>`;
}
function valueBoxHtml(label, html, extra) {
  return `<div class="rc-val guro-frame${extra ? " " + extra : ""}"><span class="rc-val-label">${label}</span><span class="rc-val-num">${html}</span></div>`;
}
function valuesHtml(rows) {
  const t = totalsOf(rows);
  const feeBox = (feePercent || 0) > 0 ? valueBoxHtml("Market Fee", flowerHtml(t.fee)) : "";
  return `<div class="rc-values">
    ${valueBoxHtml("Gross", flowerHtml(t.gross))}
    ${valueBoxHtml("Cost", flowerHtml(t.cost))}
    ${valueBoxHtml("Shrine Cost", flowerHtml(t.shrine))}
    ${valueBoxHtml("Restock Cost", flowerHtml(t.restock))}
    ${feeBox}
  </div>
  <div class="rc-net-row">
    ${valueBoxHtml("Net", `<span class="${t.net >= 0 ? "is-profit" : "is-loss"}">${signed2(t.net, fl)}${FLOWER_ICON}</span>`, "rc-val-net")}
    <button type="button" class="rc-linktext" data-rc-open="computation"${rows.length ? "" : " disabled"}>Computation</button>
  </div>`;
}
function modeNoteHtml(rows) {
  const plots = getPlotCount() || 0;
  const warn = plots > 0 ? "" : `<div class="rc-note is-warn">Crop Plot is 0, so every result is 0. Open Nodes above and enter your crop plots.</div>`;
  const text = state.mode === "restock" ? `Per Restock Mode: 1 restock is shared by all ${restockShareCount()} seeds (all crops, fruits, greenhouse and flower seeds), selected or not.` : "24Hrs Mode: the crop keeps restocking all day and pays for every restock alone.";
  return `<div class="rc-details-row"><button type="button" class="rc-linktext" data-rc-details aria-expanded="${detailsOpen ? "true" : "false"}">Details</button></div>${detailsOpen ? `<div class="rc-note">${text}</div>` : ""}${warn}`;
}
function pickerHtml() {
  return `<section class="rc-block guro-frame" aria-label="Crops Calculator">
    <div class="rc-block-title">Crops Calculator</div>
    <div class="rc-seasons" id="rcSeasons">${seasonCardsHtml()}</div>
    <div class="rc-crops" id="rcCrops">${cropCellsHtml()}</div>
  </section>`;
}
function resultsHtml() {
  const rows = computeAll();
  return `<section class="rc-block guro-frame" aria-label="Crops results">
    <div class="rc-modes" role="group" aria-label="Calculation mode">${MODES.map((m) => `<button type="button" class="rc-mode guro-frame${state.mode === m.id ? " is-on" : ""}" data-rc-mode="${m.id}" aria-pressed="${state.mode === m.id ? "true" : "false"}">${m.label}</button>`).join("")}</div>
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
function effectParts2(b, name) {
  const tier = (BASE_CROPS[name] || {}).tier;
  const y = [];
  const t = [];
  const c = [];
  const add = getEffectiveYieldAdd(b, tier, name);
  if (add) y.push(`${add > 0 ? "+" : ""}${n22(add)} yield`);
  if (b.yieldAddAll) y.push(`+${n22(b.yieldAddAll)} yield`);
  if (b.yieldMult) y.push(`\xD7${b.yieldMult} yield`);
  if (b.yieldMultAll) y.push(`\xD7${b.yieldMultAll} yield`);
  if (b.harvestAdd) y.push(`+${n22(b.harvestAdd)} harvest`);
  if (b.timeMult) t.push(`\xD7${b.timeMult} time`);
  if (b.timeMultAll) t.push(`\xD7${b.timeMultAll} time`);
  if (b.freeCost) c.push("free seeds");
  if (b.coinCostMult) c.push(`\xD7${b.coinCostMult} cost`);
  if (b.coinCostMultAll) c.push(`\xD7${b.coinCostMultAll} cost`);
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
  const artist = BOOSTS.find((b) => b.id === "artist_discount");
  if (artist && isBoostActive(artist.id) && !list.includes(artist)) list.push(artist);
  list.forEach((b) => {
    const p = effectParts2(b, row.name);
    ["yield", "time", "cost"].forEach((k) => {
      if (p[k].length) groups[k].push(`<div class="rc-boost-row">${getBoostIconSkillFallback(b.name)}<span class="rc-boost-name">${esc2(b.name)}</span><span class="rc-boost-eff">${esc2(p[k].join(", "))}</span></div>`);
    });
  });
  const section = (label, items) => items.length ? `<div class="rc-boost-group"><div class="rc-boost-label">${label}</div>${items.join("")}</div>` : "";
  const body = section("Yield Boost", groups.yield) + section("Time Boost", groups.time) + section("Cost Boost", groups.cost);
  return `<div class="rc-group"><div class="rc-comp-sub">Applied Boost</div>${body || `<div class="rc-boost-none">No boost applied</div>`}</div>`;
}
function kv(label, html, cls) {
  return `<div class="rc-kv${cls ? " " + cls : ""}"><span class="rc-kv-label">${label}</span><span class="rc-kv-val">${html}</span></div>`;
}
function totalCycleHtml(r) {
  const val = n22(r.cycles);
  if (r.mode !== "24h") return val;
  return `<span class="rc-cycle-val"><span>${val}${r.cyclesCustom ? ` <span class="rc-kv-sub">Custom</span>` : ""}</span><button type="button" class="rc-edit-link" data-rc-edit-cycle="${esc2(r.name)}">Edit</button></span>`;
}
function computationCardHtml(r) {
  const ratio = ratioInfo();
  const modeLabel = r.mode === "restock" ? "Per Restock Mode" : "24Hrs Mode";
  const qtyLabel = r.mode === "restock" ? `\xD7${r.restockQty} Restock` : `\xD7${n22(r.restockQty)} Restock${r.restockQty === 1 ? "" : "s"}`;
  const gemLine = `${gemHtml(r.gemPerRestock)}`;
  const ratioLine = ratio.free ? `Free gems` : `1${FLOWER_ICON} : ${n22(ratio.gemsPerFlower)}${GEM_ICON}`;
  const shareLine = r.mode === "restock" && r.shareCount > 1 ? `<div class="rc-kv rc-kv-wide">${`<span class="rc-kv-label">Your share of 1 restock</span><span class="rc-kv-val">1/${r.shareCount} = ${flowerHtml(r.restock)}</span>`}</div>` : "";
  return `<article class="rc-comp-card guro-frame">
    <header class="rc-comp-head"><span class="rc-comp-icon">${getIcon(r.name)}</span><span class="rc-comp-name">${esc2(r.name)}</span><span class="rc-comp-nodes">${getIcon("Crop Plot")} ${n22(r.nodes)}</span></header>
    <div class="rc-group"><div class="rc-kv-grid">
      ${kv("Growth Time", esc2(formatDuration(r.timeSec)), "rc-kv-wide")}
      ${kv("Yield / Plot", `${signed2(r.yieldPlot, n22)}${getIcon(r.name)}`)}
      ${kv("Yield / Harvest", `${signed2(r.yieldAll, n22)}${getIcon(r.name)}`)}
      ${kv("Market Price / Unit", flowerSigned(r.sell))}
      ${kv("Gross / Harvest", flowerSigned(r.grossCycle))}
      ${kv("Cost / Cycle", flowerHtml(r.costCycle))}
      ${kv("Shrine / Cycle", flowerHtml(r.shrineCycle))}
      ${kv("Restock / Cycle", flowerHtml(r.restockCycle))}
      ${kv("Net / Cycle", `<span class="${r.netCycle >= 0 ? "is-profit" : "is-loss"}">${signed2(r.netCycle, fl)}${FLOWER_ICON}</span>`)}
    </div></div>
    <div class="rc-group"><div class="rc-comp-sub">${modeLabel}</div>
    <div class="rc-kv-grid">
      ${kv("Total Cycle", totalCycleHtml(r))}
      ${kv("Total Yield", `${signed2(r.totalYield, n22)}${getIcon(r.name)}`)}
      ${kv("Total Gross", flowerSigned(r.gross))}
      ${kv("Total Cost", flowerHtml(r.cost))}
      ${kv("Total Shrine Cost", flowerHtml(r.shrine))}
      ${kv("Total Restock Cost", flowerHtml(r.restock))}
      ${kv("Restock Quantity", qtyLabel)}
      ${kv("Cost / Restock", `${gemLine}<span class="rc-kv-sub">${ratioLine}</span>`)}
      ${kv("Gems Used", `${gemHtml(r.restockGems)} = ${flowerHtml(r.restock)}`, "rc-kv-wide")}
      ${shareLine}
      ${r.feeRate > 0 ? kv("Market Fee", flowerHtml(r.fee)) : ""}
      ${kv("Total Net", `<span class="${r.net >= 0 ? "is-profit" : "is-loss"}">${signed2(r.net, fl)}${FLOWER_ICON}</span>`, "rc-kv-wide rc-kv-net")}
    </div></div>
    ${appliedBoostHtml(r)}
  </article>`;
}
function computationBodyHtml() {
  const rows = computeAll();
  if (!rows.length) return `<div class="rc-empty">No crops selected.</div>`;
  return rows.map(computationCardHtml).join("");
}
function boostBodyHtml() {
  if (!state.selected.length) return `<div class="rc-empty">Select at least one crop to see the boosts that affect it.</div>`;
  const subjects = state.selected.map((n) => ({
    name: n,
    icon: getIcon(n),
    tier: (BASE_CROPS[n] || {}).tier
  }));
  const boosts = BOOSTS.filter((b) => (b.category || "crops") === "crops" && b.source !== "skill" && !b.hiddenFromOwnPanel);
  const appliesTo = (b, s) => {
    if (b.scope === "global") return true;
    if (b.scope === "tier") return b.target === s.tier;
    if (b.scope === "crop") return (b.target || "").toLowerCase() === s.name.toLowerCase();
    if (b.scope === "tierEffects") return b.tierEffects ? Object.keys(b.tierEffects).includes(s.tier) : false;
    return false;
  };
  const html = boostsBySubjectHtml({
    subjects,
    boosts,
    appliesTo,
    unit: "plots",
    allLabel: "Boost for All Selected Crops"
  });
  return `<div class="rc-pop-hint">Boosts that affect ${state.selected.length > 1 ? "your selected crops" : esc2(state.selected[0])}. Tap a boost to switch it on or off, then press Save.</div>${html || `<div class="rc-empty">No boosts found.</div>`}`;
}
function nodesBodyHtml() {
  const crops = state.selected;
  const value = nodesDraft == null ? getPlotCount() : nodesDraft;
  const used = crops.length ? crops.map(esc2).join(", ") : "No crops selected";
  return `<div class="rc-pop-hint">Every crop uses the same Crop Plot count. Change it here, then press Save.</div>
  <label class="rc-node-row guro-frame"><span class="rc-node-icon">${getIcon("Crop Plot")}</span><span class="rc-node-text"><span class="rc-node-name">Crop Plot</span><span class="rc-node-used">Used by: ${used}</span></span><input type="number" min="0" step="1" inputmode="numeric" id="rcNodesInput" value="${value ? value : ""}" placeholder="0"></label>`;
}
function popupTitle() {
  if (popup === "skills") return "Crop Skills";
  if (popup === "boost") return "Crop Boosts";
  if (popup === "nodes") return "Crop Nodes";
  return "Computation";
}
function popupBodyHtml() {
  if (popup === "boost") return boostBodyHtml();
  if (popup === "nodes") return nodesBodyHtml();
  if (popup === "computation") return computationBodyHtml();
  return `<div class="rc-pop-hint">All crop skills from the Skill Tree. Changes here also change the Skill Tree. Press Save to apply them.</div><div id="rcSkillSlot"></div>`;
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
    if (next && next.parentNode === parent) parent.insertBefore(el, next);
    else parent.appendChild(el);
  });
}
function releaseBorrowed() {
  while (restoreFns.length) restoreFns.pop()();
}
var savedSkillCategory = null;
function setupBorrowed() {
  if (popup === "skills") {
    savedSkillCategory = skillCategory;
    setSkillCategory("crops");
    borrow("ascensionBar", "rcAscSlot");
    borrow("skillListWrap", "rcSkillSlot");
    borrow("skillSaveBar", "rcSaveSlot");
    renderSkillPanel();
    renderAscensionBar();
    updateSkillSaveBarState();
  } else if (popup === "boost") {
    borrow("skillSaveBar", "rcSaveSlot");
    updateSkillSaveBarState();
  }
}
function teardownBorrowed() {
  releaseBorrowed();
  if (savedSkillCategory != null) {
    setSkillCategory(savedSkillCategory);
    savedSkillCategory = null;
    renderSkillPanel();
  }
}
function footerHtml() {
  if (popup === "nodes") return `<button type="button" class="rc-save guro-frame" id="rcNodesSave">Save Changes</button>`;
  if (popup === "skills" || popup === "boost") return `<div id="rcSaveSlot"></div>`;
  return "";
}
function overlayHtml() {
  return `<div class="rc-pop guro-frame${popup === "computation" ? " rc-pop-comp" : ""}" role="dialog" aria-modal="true" aria-label="${popupTitle()}">
    <div class="rc-pop-head"><span class="rc-pop-title">${popupTitle()}</span><button type="button" class="rc-pop-close" data-rc-close aria-label="Close">\u2715</button></div>
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
  updateSkillSaveBarState();
}
function isPopupDirty() {
  if (popup === "skills" || popup === "boost") return isSkillDraftDirty() || isBoostDraftDirty();
  if (popup === "nodes") return nodesDraft != null && Number(nodesDraft) !== (getPlotCount() || 0);
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
    showPrompt("You have unsaved changes. Save them first, or discard them to close.", [{
      label: "Keep Editing"
    }, {
      label: "Discard",
      run: () => {
        discardSkillBoostDrafts();
        destroyPopup();
        refreshResults();
      }
    }]);
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
  promptEl.innerHTML = `<div class="rc-prompt guro-frame" role="alertdialog" aria-modal="true"><p class="rc-prompt-text">${esc2(message)}</p><div class="rc-prompt-actions">${buttons.map((b, i) => `<button type="button" class="rc-prompt-btn guro-frame" data-rc-prompt="${i}">${esc2(b.label)}</button>`).join("")}</div></div>`;
  promptEl.addEventListener("click", (e) => {
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
  promptEl.addEventListener("click", (e) => {
    if (e.target === promptEl) {
      closeCycleEditor();
      return;
    }
    if (e.target.closest("[data-rc-cycle-save]")) saveCycleEdit(name);
  });
  promptEl.addEventListener("keydown", (e) => {
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
  if (!input || btn && btn.disabled) return;
  const value = input.value === "" ? 0 : Math.floor(Number(input.value));
  if (btn) btn.disabled = true;
  input.disabled = true;
  const chip = document.createElement("div");
  chip.className = "bg-sim-saving guro-frame";
  chip.innerHTML = `<span class="bg-sim-spin"></span><span class="bg-sim-saving-text">Saving...</span>`;
  document.body.appendChild(chip);
  setTimeout(() => {
    if (isFinite(value) && value > 0) state.cycles[name] = Math.min(value, MAX_CUSTOM_CYCLES);
    else delete state.cycles[name];
    saveState();
    closeCycleEditor();
    refreshResults();
    chip.classList.add("is-done");
    chip.innerHTML = `<span class="bg-sim-tick">\u2713</span><span class="bg-sim-saving-text">Saved</span>`;
    setTimeout(() => chip.remove(), 900);
  }, 700);
}
function saveNodes() {
  const v = Math.max(0, Math.floor(Number(nodesDraft == null ? getPlotCount() : nodesDraft) || 0));
  setPlotCount(v);
  invalidateCostCache();
  renderLibraryLists();
  renderBoostPanel();
  updateCalcSummary();
  nodesDraft = null;
  toast("\u2705 Crop plots saved");
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
      showPrompt("Only one crop can be calculated in 24Hrs Mode. Uncheck the selected crop first, or switch to Per Restock Mode to calculate several crops.", [{
        label: "OK"
      }]);
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
    showPrompt("Only one crop can be calculated in 24Hrs Mode. Uncheck the other crops first, then switch.", [{
      label: "OK"
    }]);
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
    draftToggleBoost(row.getAttribute("data-boost-id"));
    renderOverlayBody();
  }
}
function onDocInput(e) {
  if (e.target && e.target.id === "rcNodesInput") nodesDraft = e.target.value === "" ? 0 : Number(e.target.value);
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
  invalidateCostCache();
  if (popup === "boost") renderOverlayBody();
  refreshResults();
}
function onExternalChange() {
  if (!host) return;
  refreshResults();
}
function mountCropsCalculator(root, appApi) {
  host = root;
  api = appApi;
  loadBaseCropsIfNeeded();
  invalidateCostCache();
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
function unmountCropsCalculator() {
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
function cropsCalculatorCanLeave() {
  if (!popup) return true;
  if (isPopupDirty()) {
    toast("\u26A0\uFE0F Save your changes first");
    return false;
  }
  destroyPopup();
  return true;
}

// src/rescalc_fruits.js
var STORE_KEY2 = "guro_rc_fruits_v1";
var MAX_CUSTOM_CYCLES2 = 1e5;
var MODES2 = [{
  id: "restock",
  label: "Per Restock Mode",
  short: "Per Restock Mode"
}, {
  id: "24h",
  label: "24Hrs Mode",
  short: "24Hrs Mode"
}];
var host2 = null;
var api2 = null;
var state2 = null;
var popup2 = null;
var overlayEl2 = null;
var promptEl2 = null;
var restoreFns2 = [];
var nodesDraft2 = null;
var listening2 = false;
var detailsOpen2 = false;
function esc3(s) {
  return escapeHtml(String(s));
}
function loadState2() {
  const base = {
    mode: "restock",
    season: previewSeason || "Spring",
    selected: [],
    cycles: {}
  };
  try {
    const raw = JSON.parse(localStorage.getItem(STORE_KEY2) || "null");
    if (raw && typeof raw === "object") {
      if (raw.mode === "24h" || raw.mode === "restock") base.mode = raw.mode;
      if (raw.season === "All" || SEASON_ORDER.includes(raw.season)) base.season = raw.season;
      if (Array.isArray(raw.selected)) base.selected = raw.selected.filter((n) => BASE_FRUITS[n]);
      if (raw.cycles && typeof raw.cycles === "object") Object.keys(raw.cycles).forEach((k) => {
        const v = Math.floor(Number(raw.cycles[k]));
        if (BASE_FRUITS[k] && isFinite(v) && v > 0) base.cycles[k] = Math.min(v, MAX_CUSTOM_CYCLES2);
      });
    }
  } catch (e) {
  }
  if (base.mode === "24h" && base.selected.length > 1) base.selected = base.selected.slice(0, 1);
  return base;
}
function saveState2() {
  try {
    localStorage.setItem(STORE_KEY2, JSON.stringify(state2));
  } catch (e) {
  }
}
function n23(n) {
  if (!isFinite(n)) return "\u2014";
  return n.toLocaleString(void 0, {
    minimumFractionDigits: 0,
    maximumFractionDigits: 2
  });
}
function fl2(n) {
  if (!isFinite(n)) return "\u2014";
  const a = Math.abs(n);
  const max = a >= 1e3 ? 0 : a >= 1 ? 2 : 4;
  return n.toLocaleString(void 0, {
    minimumFractionDigits: 0,
    maximumFractionDigits: max
  });
}
function signed3(n, f) {
  const r = f(Math.abs(n));
  if (n > 0 && r !== "0") return "+" + r;
  if (n < 0 && r !== "0") return "-" + r;
  return r;
}
function flowerSigned2(n) {
  return `${signed3(n, fl2)}${FLOWER_ICON}`;
}
function flowerHtml2(n) {
  return `${fl2(n)}${FLOWER_ICON}`;
}
function gemHtml2(n) {
  return `${n23(n)}${GEM_ICON}`;
}
function fruitNames() {
  return Object.keys(BASE_FRUITS);
}
function visibleFruits() {
  const all = fruitNames();
  if (state2.season === "All") return all;
  return all.filter((n) => getFruitSeasons(n).includes(state2.season));
}
function averageHarvests(d, boosted) {
  return boosted.minHarvestVal + (d.moonOnly ? 0 : 1);
}
function woodPriceFlower() {
  const market = farmPanelGetMarketPriceFlower("Wood");
  if (market > 0) return market;
  return coinsToFlower(getMaterialUnitCostCoins("Wood", "collect"));
}
function ratioInfo2() {
  const fpg = flowerPerGem();
  return {
    free: !(fpg > 0),
    gemsPerFlower: fpg > 0 ? 1 / fpg : 0
  };
}
function compute2(name, mode, share) {
  const d = BASE_FRUITS[name];
  const boosted = computeBoostedFruitStats(name, d.yieldPerHarvest || 1, d.timeSec, d.minHarvest || 1);
  const nodes = getFruitCount(name) || 0;
  const moon = !!d.moonOnly;
  const avgH = averageHarvests(d, boosted);
  const minH = boosted.minHarvestVal;
  const maxH = minH + (moon ? 0 : 2);
  const sell = farmPanelGetMarketPriceFlower(name) || 0;
  const woodPrice = woodPriceFlower();
  const feeRate = (feePercent || 0) / 100;
  const seedCost = coinsToFlower(getFruitSeedFertCoins(name));
  const axeCoins = boosted.noWoodCost ? 0 : (d.axeQty || 0) * ((RESOURCE_DATA.Wood || {}).toolCoinCost || 0);
  const axeCost = coinsToFlower(axeCoins);
  const woodQty = Math.max(0, (d.woodReturnQty || 0) - (boosted.woodReturnPenalty || 0) + (boosted.woodReturnAdd || 0));
  const shrine = getActiveShrineDailyCost(boosted.activeBoosts);
  const stockBase = BASE_STOCK_FRUITS[name] || 0;
  const stockQty = stockBase ? computeBoostedStock(stockBase, "seed", name) : 0;
  const gemPerRestock = moon ? 0 : getRestockGemCostIndividual("seed");
  const fullRestockFlower = gemsToFlower(gemPerRestock);
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
    name,
    nodes,
    moon,
    timeSec: boosted.timeVal,
    lifeSec,
    minH,
    maxH,
    avgH,
    yieldPlot,
    yieldTree,
    yieldAll,
    sell,
    woodQty,
    woodPrice,
    seedCost,
    axeCostTree: axeCost,
    grossCycle,
    costCycle,
    axeCycle,
    shrineCycle,
    feeRate,
    gemPerRestock,
    fullRestockFlower,
    stockQty,
    activeBoosts: boosted.activeBoosts,
    freeAxeBy: boosted.activeBoosts.filter((b) => b.noWood).map((b) => b.name),
    shareCount: share,
    mode
  };
  const customCycles = state2.cycles[name] > 0 ? state2.cycles[name] : 0;
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
      const sim = stockQty > 0 ? simulateStockCycles((pc) => {
        const s = computeBoostedFruitStats(name, d.yieldPerHarvest || 1, d.timeSec, d.minHarvest || 1, pc);
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
      const det = stockBase ? computeRestockCost24hDetailedIndividual(stockBase, "seed", nodes, cycles, avgH, void 0, name) : null;
      restockQty = det ? Math.ceil(det.restocksPerDay - 1e-9) : 0;
      restockGems = restockQty * gemPerRestock;
      restockCost = gemsToFlower(restockGems);
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
function defaultCycles2(name) {
  const d = BASE_FRUITS[name];
  if (!d) return 0;
  const boosted = computeBoostedFruitStats(name, d.yieldPerHarvest || 1, d.timeSec, d.minHarvest || 1);
  return boosted.timeVal > 0 ? Math.round(86400 / boosted.timeVal) : 0;
}
function syncGemRatio2() {
  try {
    const want = currentRatio();
    const fpg = flowerPerGem();
    const have = fpg > 0 ? 1 / fpg : 0;
    const same = want.free ? !(fpg > 0) : Math.abs(want.gems - have) < 1e-6;
    if (!same) applySelection();
  } catch (e) {
  }
}
function computeAll2() {
  syncGemRatio2();
  const share = restockShareCount();
  return state2.selected.filter((n) => BASE_FRUITS[n]).map((n) => compute2(n, state2.mode, share));
}
function totalsOf2(rows) {
  const t = {
    gross: 0,
    fee: 0,
    cost: 0,
    axe: 0,
    shrine: 0,
    restock: 0,
    net: 0
  };
  rows.forEach((r) => {
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
function seasonCardsHtml2() {
  return SEASON_ORDER.concat(["All"]).map((s) => {
    const on = state2.season === s;
    const icon = s === "All" ? `<span class="rc-season-all">\u2605</span>` : SEASON_EMOJI[s];
    return `<button type="button" class="rc-season guro-frame${on ? " is-on" : ""}" data-rc-season="${s}" aria-pressed="${on ? "true" : "false"}">${icon}<span class="rc-season-name">${s === "All" ? "Show All" : s}</span></button>`;
  }).join("");
}
function cropCellsHtml2() {
  return visibleFruits().map((n) => {
    const on = state2.selected.includes(n);
    return `<label class="rc-crop guro-frame${on ? " is-on" : ""}"><span class="rc-crop-icon">${getIcon(n)}</span><span class="rc-crop-name">${esc3(n)}</span><input type="checkbox" data-rc-crop="${esc3(n)}"${on ? " checked" : ""} aria-label="${esc3(n)}"></label>`;
  }).join("");
}
function tilesHtml2(rows) {
  if (!rows.length) return `<div class="rc-empty">No fruits selected yet. Tick a fruit above to include it in the calculation.</div>`;
  return `<div class="rc-tiles">${rows.map((r) => {
    const good = r.net >= 0;
    return `<div class="rc-tile guro-frame ${good ? "is-profit" : "is-loss"}" data-rc-tile="${esc3(r.name)}"><span class="rc-tile-icon">${getIcon(r.name)}</span><span class="rc-tile-yield">${signed3(r.totalYield, n23)}</span><span class="rc-tile-net">${fl2(r.gross)}${FLOWER_ICON}</span></div>`;
  }).join("")}</div>`;
}
function valueBoxHtml2(label, html, extra) {
  return `<div class="rc-val guro-frame${extra ? " " + extra : ""}"><span class="rc-val-label">${label}</span><span class="rc-val-num">${html}</span></div>`;
}
function valuesHtml2(rows) {
  const t = totalsOf2(rows);
  const feeBox = (feePercent || 0) > 0 ? valueBoxHtml2("Market Fee", flowerHtml2(t.fee)) : "";
  return `<div class="rc-values">
    ${valueBoxHtml2("Gross", flowerHtml2(t.gross))}
    ${valueBoxHtml2("Cost", flowerHtml2(t.cost))}
    ${valueBoxHtml2("Axe Cost", flowerHtml2(t.axe))}
    ${valueBoxHtml2("Shrine Cost", flowerHtml2(t.shrine))}
    ${valueBoxHtml2("Restock Cost", flowerHtml2(t.restock))}
    ${feeBox}
  </div>
  <div class="rc-net-row">
    ${valueBoxHtml2("Net", `<span class="${t.net >= 0 ? "is-profit" : "is-loss"}">${signed3(t.net, fl2)}${FLOWER_ICON}</span>`, "rc-val-net")}
    <button type="button" class="rc-linktext" data-rc-open="computation"${rows.length ? "" : " disabled"}>Computation</button>
  </div>`;
}
function modeNoteHtml2(rows) {
  const missing = rows.filter((r) => !(r.nodes > 0));
  const warn = missing.length ? `<div class="rc-note is-warn">${missing.map((r) => esc3(r.name)).join(", ")} ${missing.length === 1 ? "has" : "have"} 0 Fruit Patches, so ${missing.length === 1 ? "its result is" : "their results are"} 0. Open Nodes above and enter your fruit patches.</div>` : "";
  const moon = rows.some((r) => r.moon) ? `<div class="rc-note">Moon fruits are only sold on a real Full Moon day, so their restock cost is 0.</div>` : "";
  const text = state2.mode === "restock" ? `Per Restock Mode: 1 restock is shared by all ${restockShareCount()} seeds (all crops, fruits, greenhouse and flower seeds, moon seeds excluded), selected or not. Every seed grows 1 tree that is harvested an average number of times, then chopped for Wood.` : "24Hrs Mode: the fruit keeps restocking all day and pays for every restock alone. Trees are replanted as they die, using the average harvests per tree.";
  return `<div class="rc-details-row"><button type="button" class="rc-linktext" data-rc-details aria-expanded="${detailsOpen2 ? "true" : "false"}">Details</button></div>${detailsOpen2 ? `<div class="rc-note">${text}</div>${moon}` : ""}${warn}`;
}
function pickerHtml2() {
  return `<section class="rc-block guro-frame" aria-label="Fruit Calculator">
    <div class="rc-block-title">Fruit Calculator</div>
    <div class="rc-seasons" id="rcSeasons">${seasonCardsHtml2()}</div>
    <div class="rc-crops" id="rcCrops">${cropCellsHtml2()}</div>
  </section>`;
}
function resultsHtml2() {
  const rows = computeAll2();
  return `<section class="rc-block guro-frame" aria-label="Fruit results">
    <div class="rc-modes" role="group" aria-label="Calculation mode">${MODES2.map((m) => `<button type="button" class="rc-mode guro-frame${state2.mode === m.id ? " is-on" : ""}" data-rc-mode="${m.id}" aria-pressed="${state2.mode === m.id ? "true" : "false"}">${m.label}</button>`).join("")}</div>
    <div class="rc-tools">
      <button type="button" class="rc-tool guro-frame" data-rc-open="skills">Skills</button>
      <button type="button" class="rc-tool guro-frame" data-rc-open="boost">Boost</button>
      <button type="button" class="rc-tool guro-frame" data-rc-open="nodes">Nodes</button>
    </div>
    ${modeNoteHtml2(rows)}
    <div id="rcResults">${tilesHtml2(rows)}${valuesHtml2(rows)}</div>
  </section>`;
}
function render2() {
  if (!host2) return;
  const scroller = document.scrollingElement;
  const y = scroller ? scroller.scrollTop : 0;
  host2.innerHTML = pickerHtml2() + resultsHtml2();
  if (scroller) scroller.scrollTop = y;
}
function refreshResults2() {
  if (!host2) return;
  const picker = host2.querySelector("#rcCrops");
  if (!picker) {
    render2();
    return;
  }
  const blocks = host2.querySelectorAll(".rc-block");
  if (blocks[1]) {
    const tmp = document.createElement("div");
    tmp.innerHTML = resultsHtml2();
    blocks[1].replaceWith(tmp.firstElementChild);
  }
  if (popup2 === "computation") renderOverlayBody2();
}
function effectParts3(b, name) {
  const y = [];
  const t = [];
  const c = [];
  const h = [];
  const add = getEffectiveYieldAdd(b, void 0, name, {
    name,
    kind: "fruit"
  });
  if (add) y.push(`${add > 0 ? "+" : ""}${n23(add)} yield`);
  if (b.yieldAddAll) y.push(`+${n23(b.yieldAddAll)} yield`);
  if (b.yieldMult) y.push(`\xD7${b.yieldMult} yield`);
  if (b.yieldMultAll) y.push(`\xD7${b.yieldMultAll} yield`);
  if (b.harvestAdd) h.push(`+${n23(b.harvestAdd)} harvest`);
  if (b.noWood) h.push("free axe");
  if (b.woodReturnPenalty) h.push(`-${n23(b.woodReturnPenalty)} wood`);
  if (b.woodReturnAdd) h.push(`+${n23(b.woodReturnAdd)} wood`);
  if (b.timeMult) t.push(`\xD7${b.timeMult} time`);
  if (b.timeMultAll) t.push(`\xD7${b.timeMultAll} time`);
  if (b.freeCost) c.push("free seeds");
  if (b.coinCostMult) c.push(`\xD7${b.coinCostMult} cost`);
  if (b.coinCostMultAll) c.push(`\xD7${b.coinCostMultAll} cost`);
  return {
    yield: y,
    harvest: h,
    time: t,
    cost: c
  };
}
function appliedBoostHtml2(row) {
  const groups = {
    yield: [],
    harvest: [],
    time: [],
    cost: []
  };
  const list = row.activeBoosts.slice();
  const artist = BOOSTS.find((b) => b.id === "artist_discount");
  if (artist && isBoostActive(artist.id) && !list.includes(artist)) list.push(artist);
  list.forEach((b) => {
    const p = effectParts3(b, row.name);
    ["yield", "harvest", "time", "cost"].forEach((k) => {
      if (p[k].length) groups[k].push(`<div class="rc-boost-row">${getBoostIconSkillFallback(b.name)}<span class="rc-boost-name">${esc3(b.name)}</span><span class="rc-boost-eff">${esc3(p[k].join(", "))}</span></div>`);
    });
  });
  const section = (label, items) => items.length ? `<div class="rc-boost-group"><div class="rc-boost-label">${label}</div>${items.join("")}</div>` : "";
  const body = section("Yield Boost", groups.yield) + section("Harvest and Wood Boost", groups.harvest) + section("Time Boost", groups.time) + section("Cost Boost", groups.cost);
  return `<div class="rc-group"><div class="rc-comp-sub">Applied Boost</div>${body || `<div class="rc-boost-none">No boost applied</div>`}</div>`;
}
function kv2(label, html, cls) {
  return `<div class="rc-kv${cls ? " " + cls : ""}"><span class="rc-kv-label">${label}</span><span class="rc-kv-val">${html}</span></div>`;
}
function totalCycleHtml2(r) {
  const val = "\xD7" + n23(r.cycles);
  if (r.mode !== "24h") return val;
  return `<span class="rc-cycle-val"><span>${val}${r.cyclesCustom ? ` <span class="rc-kv-sub">Custom</span>` : ""}</span><button type="button" class="rc-edit-link" data-rc-edit-cycle="${esc3(r.name)}">Edit</button></span>`;
}
function computationCardHtml2(r) {
  const ratio = ratioInfo2();
  const modeLabel = r.mode === "restock" ? "Per Restock Mode" : "24Hrs Mode";
  const qtyLabel = r.mode === "restock" ? `\xD7${r.restockQty} Restock` : `\xD7${n23(r.restockQty)} Restock${r.restockQty === 1 ? "" : "s"}`;
  const gemLine = `${gemHtml2(r.gemPerRestock)}`;
  const ratioLine = ratio.free ? `Free gems` : `1${FLOWER_ICON} : ${n23(ratio.gemsPerFlower)}${GEM_ICON}`;
  const shareLine = r.mode === "restock" && !r.moon && r.shareCount > 1 ? `<div class="rc-kv rc-kv-wide"><span class="rc-kv-label">Your share of 1 restock</span><span class="rc-kv-val">1/${r.shareCount} = ${flowerHtml2(r.restock)}</span></div>` : "";
  const rangeLabel = r.minH === r.maxH ? `${n23(r.avgH)} (fixed)` : `${n23(r.avgH)} (${n23(r.minH)} to ${n23(r.maxH)})`;
  const freeAxe = r.freeAxeBy.length > 0;
  const axeTree = freeAxe ? `Free<span class="rc-kv-sub">${esc3(r.freeAxeBy.join(", "))}</span>` : flowerHtml2(r.axeCostTree);
  const wavesRow = r.mode === "restock" ? kv2("Planting Waves", n23(r.waves || 0)) : "";
  return `<article class="rc-comp-card guro-frame">
    <header class="rc-comp-head"><span class="rc-comp-icon">${getIcon(r.name)}</span><span class="rc-comp-name">${esc3(r.name)}</span><span class="rc-comp-nodes">${getIcon("Fruit Patch")} ${n23(r.nodes)}</span></header>
    <div class="rc-group"><div class="rc-comp-sub">Each Harvest (all ${n23(r.nodes)} patches)</div>
    <div class="rc-kv-grid">
      ${kv2("Growth Time / Harvest", esc3(formatDuration(r.timeSec)), "rc-kv-wide")}
      ${kv2("Yield / Patch", `${signed3(r.yieldPlot, n23)}${getIcon(r.name)}`)}
      ${kv2("Yield / Harvest", `${signed3(r.nodes * r.yieldPlot, n23)}${getIcon(r.name)}`)}
      ${kv2("Market Price / Unit", flowerSigned2(r.sell))}
      ${kv2("Gross / Harvest", flowerSigned2(r.nodes * r.yieldPlot * r.sell))}
    </div>
    <div class="rc-comp-sub">One Tree, Whole Life</div>
    <div class="rc-kv-grid">
      ${kv2("Average Harvests / Tree", rangeLabel, "rc-kv-wide")}
      ${kv2("Tree Lifespan", esc3(formatDuration(r.lifeSec)), "rc-kv-wide")}
      ${kv2("Yield / Tree", `${signed3(r.yieldTree, n23)}${getIcon(r.name)}`)}
      ${kv2("Gross / Tree", flowerSigned2(r.yieldTree * r.sell))}
      ${kv2("Wood / Tree", `${signed3(r.woodQty, n23)}${getIcon("Wood")}`)}
      ${kv2("Wood Price / Unit", flowerSigned2(r.woodPrice))}
      ${kv2("Seed Cost / Tree", flowerHtml2(r.seedCost))}
      ${kv2("Axe Cost / Tree", axeTree)}
    </div></div>
    <div class="rc-group"><div class="rc-comp-sub">Tree Cycle (${n23(r.nodes)} trees, planting until chopped)</div>
    <div class="rc-kv-grid">
      ${kv2("Yield / Tree Cycle", `${signed3(r.yieldAll, n23)}${getIcon(r.name)}`)}
      ${kv2("Gross / Tree Cycle", flowerSigned2(r.grossCycle))}
      ${kv2("Seed Cost / Cycle", flowerHtml2(r.costCycle))}
      ${kv2("Axe Cost / Cycle", flowerHtml2(r.axeCycle))}
      ${kv2("Shrine / Cycle", flowerHtml2(r.shrineCycle))}
      ${kv2("Restock / Cycle", flowerHtml2(r.restockCycle))}
      ${kv2("Net / Cycle", `<span class="${r.netCycle >= 0 ? "is-profit" : "is-loss"}">${signed3(r.netCycle, fl2)}${FLOWER_ICON}</span>`, "rc-kv-wide")}
    </div></div>
    <div class="rc-group"><div class="rc-comp-sub">${modeLabel}</div>
    <div class="rc-kv-grid">
      ${kv2("Tree Lifetimes Used", n23(r.trees))}
      ${wavesRow}
      ${kv2("Harvest Rounds", totalCycleHtml2(r))}
      ${kv2("Total Harvests (all trees)", n23(r.treeHarvests))}
      ${kv2("Total Yield", `${signed3(r.totalYield, n23)}${getIcon(r.name)}`)}
      ${kv2("Total Wood", `${signed3(r.woodTotalYield, n23)}${getIcon("Wood")}`)}
      ${kv2("Fruit Gross", flowerSigned2(r.grossFruit))}
      ${kv2("Wood Gross", flowerSigned2(r.grossWood))}
      ${kv2("Total Gross", flowerSigned2(r.gross))}
      ${kv2("Total Seed Cost", flowerHtml2(r.cost))}
      ${kv2("Total Axe Cost", flowerHtml2(r.axe))}
      ${kv2("Total Shrine Cost", flowerHtml2(r.shrine))}
      ${kv2("Total Restock Cost", flowerHtml2(r.restock))}
      ${kv2("Restock Quantity", qtyLabel)}
      ${kv2("Cost / Restock", `${gemLine}<span class="rc-kv-sub">${ratioLine}</span>`)}
      ${kv2("Gems Used", `${gemHtml2(r.restockGems)} = ${flowerHtml2(r.restock)}`, "rc-kv-wide")}
      ${shareLine}
      ${r.feeRate > 0 ? kv2("Market Fee", flowerHtml2(r.fee)) : ""}
      ${kv2("Total Net", `<span class="${r.net >= 0 ? "is-profit" : "is-loss"}">${signed3(r.net, fl2)}${FLOWER_ICON}</span>`, "rc-kv-wide rc-kv-net")}
    </div></div>
    ${appliedBoostHtml2(r)}
  </article>`;
}
function computationBodyHtml2() {
  const rows = computeAll2();
  if (!rows.length) return `<div class="rc-empty">No fruits selected.</div>`;
  return rows.map(computationCardHtml2).join("");
}
function boostBodyHtml2() {
  if (!state2.selected.length) return `<div class="rc-empty">Select at least one fruit to see the boosts that affect it.</div>`;
  const subjects = state2.selected.map((n) => ({
    name: n,
    icon: getIcon(n)
  }));
  const boosts = BOOSTS.filter((b) => b.category === "fruits" && b.source !== "skill" && !b.hiddenFromOwnPanel);
  const appliesTo = (b, s) => {
    if (b.scope === "global") return true;
    if (b.scope === "fruit") return (b.target || "").toLowerCase() === s.name.toLowerCase();
    if (b.scope === "fruitList") return Array.isArray(b.fruits) && b.fruits.some((f) => f.toLowerCase() === s.name.toLowerCase());
    return false;
  };
  const html = boostsBySubjectHtml({
    subjects,
    boosts,
    appliesTo,
    unit: "patches",
    allLabel: "Boost for All Selected Fruits"
  });
  return `<div class="rc-pop-hint">Boosts that affect ${state2.selected.length > 1 ? "your selected fruits" : esc3(state2.selected[0])}. Tap a boost to switch it on or off, then press Save.</div>${html || `<div class="rc-empty">No boosts found.</div>`}`;
}
function nodesBodyHtml2() {
  if (!state2.selected.length) return `<div class="rc-empty">Select at least one fruit to set its Fruit Patches.</div>`;
  const rows = state2.selected.map((n) => {
    const value = nodesDraft2 && nodesDraft2[n] != null ? nodesDraft2[n] : getFruitCount(n);
    return `<label class="rc-node-row guro-frame"><span class="rc-node-icon">${getIcon(n)}</span><span class="rc-node-text"><span class="rc-node-name">${esc3(n)}</span><span class="rc-node-used">Fruit Patches planted with ${esc3(n)}</span></span><input type="number" min="0" step="1" inputmode="numeric" data-rc-node="${esc3(n)}" value="${value ? value : ""}" placeholder="0"></label>`;
  }).join("");
  return `<div class="rc-pop-hint">Enter how many Fruit Patches grow each selected fruit, then press Save.</div>${rows}`;
}
function popupTitle2() {
  if (popup2 === "skills") return "Fruit Skills";
  if (popup2 === "boost") return "Fruit Boosts";
  if (popup2 === "nodes") return "Fruit Nodes";
  return "Computation";
}
function popupBodyHtml2() {
  if (popup2 === "boost") return boostBodyHtml2();
  if (popup2 === "nodes") return nodesBodyHtml2();
  if (popup2 === "computation") return computationBodyHtml2();
  return `<div class="rc-pop-hint">All fruit patch skills from the Skill Tree. Changes here also change the Skill Tree. Press Save to apply them.</div><div id="rcSkillSlot"></div>`;
}
function borrow2(id, slotId) {
  const el = document.getElementById(id);
  const slot = document.getElementById(slotId);
  if (!el || !slot) return;
  const parent = el.parentNode;
  const next = el.nextSibling;
  slot.appendChild(el);
  restoreFns2.push(() => {
    if (!parent) return;
    if (next && next.parentNode === parent) parent.insertBefore(el, next);
    else parent.appendChild(el);
  });
}
function releaseBorrowed2() {
  while (restoreFns2.length) restoreFns2.pop()();
}
var savedSkillCategory2 = null;
function setupBorrowed2() {
  if (popup2 === "skills") {
    savedSkillCategory2 = skillCategory;
    setSkillCategory("fruitpatch");
    borrow2("ascensionBar", "rcAscSlot");
    borrow2("skillListWrap", "rcSkillSlot");
    borrow2("skillSaveBar", "rcSaveSlot");
    renderSkillPanel();
    renderAscensionBar();
    updateSkillSaveBarState();
  } else if (popup2 === "boost") {
    borrow2("skillSaveBar", "rcSaveSlot");
    updateSkillSaveBarState();
  }
}
function teardownBorrowed2() {
  releaseBorrowed2();
  if (savedSkillCategory2 != null) {
    setSkillCategory(savedSkillCategory2);
    savedSkillCategory2 = null;
    renderSkillPanel();
  }
}
function footerHtml2() {
  if (popup2 === "nodes") return `<button type="button" class="rc-save guro-frame" id="rcNodesSave">Save Changes</button>`;
  if (popup2 === "skills" || popup2 === "boost") return `<div id="rcSaveSlot"></div>`;
  return "";
}
function overlayHtml2() {
  return `<div class="rc-pop guro-frame${popup2 === "computation" ? " rc-pop-comp" : ""}" role="dialog" aria-modal="true" aria-label="${popupTitle2()}">
    <div class="rc-pop-head"><span class="rc-pop-title">${popupTitle2()}</span><button type="button" class="rc-pop-close" data-rc-close aria-label="Close">\u2715</button></div>
    <div class="rc-pop-body" id="rcPopBody">${popupBodyHtml2()}</div>
    <div class="rc-pop-foot">${footerHtml2()}</div>
  </div>`;
}
function renderOverlayBody2() {
  if (!overlayEl2) return;
  const body = overlayEl2.querySelector("#rcPopBody");
  if (!body) return;
  if (popup2 === "skills") return;
  const top = body.scrollTop;
  body.innerHTML = popupBodyHtml2();
  body.scrollTop = top;
  updateSkillSaveBarState();
}
function isPopupDirty2() {
  if (popup2 === "skills" || popup2 === "boost") return isSkillDraftDirty() || isBoostDraftDirty();
  if (popup2 === "nodes") return !!nodesDraft2 && Object.keys(nodesDraft2).some((n) => Number(nodesDraft2[n]) !== (getFruitCount(n) || 0));
  return false;
}
function openPopup2(kind) {
  if (popup2) return;
  popup2 = kind;
  nodesDraft2 = null;
  overlayEl2 = document.createElement("div");
  overlayEl2.className = "rc-overlay";
  overlayEl2.innerHTML = overlayHtml2();
  document.body.appendChild(overlayEl2);
  document.body.classList.add("rc-no-scroll");
  const slot = overlayEl2.querySelector("#rcSkillSlot");
  if (kind === "skills" && slot) {
    const asc = document.createElement("div");
    asc.id = "rcAscSlot";
    slot.parentNode.insertBefore(asc, slot);
  }
  setupBorrowed2();
}
function destroyPopup2() {
  teardownBorrowed2();
  if (overlayEl2) overlayEl2.remove();
  overlayEl2 = null;
  popup2 = null;
  nodesDraft2 = null;
  document.body.classList.remove("rc-no-scroll");
}
function closePopup2(force) {
  if (!popup2) return;
  if (!force && isPopupDirty2()) {
    showPrompt2("You have unsaved changes. Save them first, or discard them to close.", [{
      label: "Keep Editing"
    }, {
      label: "Discard",
      run: () => {
        discardSkillBoostDrafts();
        destroyPopup2();
        refreshResults2();
      }
    }]);
    return;
  }
  const wasComputation = popup2 === "computation";
  destroyPopup2();
  if (!wasComputation) refreshResults2();
}
function showPrompt2(message, buttons) {
  if (promptEl2) promptEl2.remove();
  promptEl2 = document.createElement("div");
  promptEl2.className = "rc-overlay rc-overlay-top";
  promptEl2.innerHTML = `<div class="rc-prompt guro-frame" role="alertdialog" aria-modal="true"><p class="rc-prompt-text">${esc3(message)}</p><div class="rc-prompt-actions">${buttons.map((b, i) => `<button type="button" class="rc-prompt-btn guro-frame" data-rc-prompt="${i}">${esc3(b.label)}</button>`).join("")}</div></div>`;
  promptEl2.addEventListener("click", (e) => {
    const btn = e.target.closest("[data-rc-prompt]");
    if (!btn) return;
    const b = buttons[Number(btn.getAttribute("data-rc-prompt"))];
    promptEl2.remove();
    promptEl2 = null;
    if (b && b.run) b.run();
  });
  document.body.appendChild(promptEl2);
  const first = promptEl2.querySelector("button");
  if (first) first.focus();
}
function closeCycleEditor2() {
  if (promptEl2) promptEl2.remove();
  promptEl2 = null;
}
function openCycleEditor2(name) {
  if (promptEl2) promptEl2.remove();
  const current = state2.cycles[name] > 0 ? state2.cycles[name] : "";
  const fallback = defaultCycles2(name);
  promptEl2 = document.createElement("div");
  promptEl2.className = "rc-overlay rc-overlay-top";
  promptEl2.innerHTML = `<div class="rc-prompt rc-cycle-edit guro-frame" role="dialog" aria-modal="true" aria-label="Editing Cycle"><div class="rc-cycle-edit-label">Editing Cycle</div><div class="rc-cycle-edit-row"><input type="number" min="0" max="${MAX_CUSTOM_CYCLES2}" step="1" inputmode="numeric" class="rc-cycle-input guro-frame" data-rc-cycle-input value="${current}" placeholder="${fallback}" aria-label="Cycle count"><button type="button" class="rc-prompt-btn guro-frame" data-rc-cycle-save>Save</button></div></div>`;
  promptEl2.addEventListener("click", (e) => {
    if (e.target === promptEl2) {
      closeCycleEditor2();
      return;
    }
    if (e.target.closest("[data-rc-cycle-save]")) saveCycleEdit2(name);
  });
  promptEl2.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      saveCycleEdit2(name);
    }
  });
  document.body.appendChild(promptEl2);
  const input = promptEl2.querySelector("[data-rc-cycle-input]");
  if (input) {
    input.focus();
    input.select();
  }
}
function saveCycleEdit2(name) {
  if (!promptEl2) return;
  const input = promptEl2.querySelector("[data-rc-cycle-input]");
  const btn = promptEl2.querySelector("[data-rc-cycle-save]");
  if (!input || btn && btn.disabled) return;
  const value = input.value === "" ? 0 : Math.floor(Number(input.value));
  if (btn) btn.disabled = true;
  input.disabled = true;
  const chip = document.createElement("div");
  chip.className = "bg-sim-saving guro-frame";
  chip.innerHTML = `<span class="bg-sim-spin"></span><span class="bg-sim-saving-text">Saving...</span>`;
  document.body.appendChild(chip);
  setTimeout(() => {
    if (isFinite(value) && value > 0) state2.cycles[name] = Math.min(value, MAX_CUSTOM_CYCLES2);
    else delete state2.cycles[name];
    saveState2();
    closeCycleEditor2();
    refreshResults2();
    chip.classList.add("is-done");
    chip.innerHTML = `<span class="bg-sim-tick">\u2713</span><span class="bg-sim-saving-text">Saved</span>`;
    setTimeout(() => chip.remove(), 900);
  }, 700);
}
function saveNodes2() {
  const draft = nodesDraft2 || {};
  Object.keys(draft).forEach((n) => {
    setFruitCount(n, Math.max(0, Math.floor(Number(draft[n]) || 0)));
  });
  invalidateCostCache();
  renderLibraryLists();
  renderBoostPanel();
  updateCalcSummary();
  nodesDraft2 = null;
  toast("\u2705 Fruit patches saved");
  renderOverlayBody2();
  refreshResults2();
}
function toggleCrop2(name, input) {
  const idx = state2.selected.indexOf(name);
  if (idx >= 0) {
    state2.selected.splice(idx, 1);
  } else {
    if (state2.mode === "24h" && state2.selected.length >= 1) {
      if (input) input.checked = false;
      showPrompt2("Only one fruit can be calculated in 24Hrs Mode. Uncheck the selected fruit first, or switch to Per Restock Mode to calculate several fruits.", [{
        label: "OK"
      }]);
      return;
    }
    state2.selected.push(name);
  }
  saveState2();
  const label = input ? input.closest(".rc-crop") : null;
  if (label) label.classList.toggle("is-on", state2.selected.includes(name));
  refreshResults2();
}
function setMode2(id) {
  if (id === state2.mode) return;
  if (id === "24h" && state2.selected.length > 1) {
    showPrompt2("Only one fruit can be calculated in 24Hrs Mode. Uncheck the other fruits first, then switch.", [{
      label: "OK"
    }]);
    return;
  }
  state2.mode = id;
  saveState2();
  refreshResults2();
}
function onClick2(e) {
  const details = e.target.closest("[data-rc-details]");
  if (details) {
    detailsOpen2 = !detailsOpen2;
    refreshResults2();
    return;
  }
  const season = e.target.closest("[data-rc-season]");
  if (season) {
    state2.season = season.getAttribute("data-rc-season");
    saveState2();
    const seasons = host2.querySelector("#rcSeasons");
    const crops = host2.querySelector("#rcCrops");
    if (seasons) seasons.innerHTML = seasonCardsHtml2();
    if (crops) crops.innerHTML = cropCellsHtml2();
    return;
  }
  const mode = e.target.closest("[data-rc-mode]");
  if (mode) {
    setMode2(mode.getAttribute("data-rc-mode"));
    return;
  }
  const open = e.target.closest("[data-rc-open]");
  if (open && !open.disabled) openPopup2(open.getAttribute("data-rc-open"));
}
function onChange2(e) {
  const t = e.target;
  if (t && t.dataset && t.dataset.rcCrop != null) toggleCrop2(t.dataset.rcCrop, t);
}
function onDocClick2(e) {
  if (!overlayEl2) return;
  if (promptEl2 && promptEl2.contains(e.target)) return;
  if (e.target === overlayEl2 || e.target.closest("[data-rc-close]")) {
    closePopup2(false);
    return;
  }
  if (!overlayEl2.contains(e.target)) return;
  if (e.target.closest("#rcNodesSave")) {
    saveNodes2();
    return;
  }
  const editCycle = e.target.closest("[data-rc-edit-cycle]");
  if (editCycle && popup2 === "computation") {
    openCycleEditor2(editCycle.getAttribute("data-rc-edit-cycle"));
    return;
  }
  const row = e.target.closest("[data-boost-id]");
  if (row && popup2 === "boost" && overlayEl2.contains(row)) {
    draftToggleBoost(row.getAttribute("data-boost-id"));
    renderOverlayBody2();
  }
}
function onDocInput2(e) {
  const t = e.target;
  if (t && t.dataset && t.dataset.rcNode != null) {
    nodesDraft2 = nodesDraft2 || {};
    nodesDraft2[t.dataset.rcNode] = t.value === "" ? 0 : Number(t.value);
  }
}
function onKey2(e) {
  if (e.key !== "Escape") return;
  if (promptEl2) {
    promptEl2.remove();
    promptEl2 = null;
    return;
  }
  if (popup2) closePopup2(false);
}
function onBoostsChanged2() {
  if (!host2) return;
  invalidateCostCache();
  if (popup2 === "boost") renderOverlayBody2();
  refreshResults2();
}
function onExternalChange2() {
  if (!host2) return;
  refreshResults2();
}
function mountFruitsCalculator(root, appApi) {
  host2 = root;
  api2 = appApi;
  invalidateCostCache();
  state2 = loadState2();
  detailsOpen2 = false;
  syncGemRatio2();
  host2.addEventListener("click", onClick2);
  host2.addEventListener("change", onChange2);
  document.addEventListener("click", onDocClick2);
  document.addEventListener("input", onDocInput2);
  document.addEventListener("keydown", onKey2);
  window.addEventListener("guroBoostsChanged", onBoostsChanged2);
  window.addEventListener("guroGemPackChanged", onExternalChange2);
  window.addEventListener("guroPricesUpdated", onExternalChange2);
  listening2 = true;
  render2();
}
function unmountFruitsCalculator() {
  if (popup2) destroyPopup2();
  if (promptEl2) {
    promptEl2.remove();
    promptEl2 = null;
  }
  if (host2) {
    host2.removeEventListener("click", onClick2);
    host2.removeEventListener("change", onChange2);
    host2.innerHTML = "";
  }
  if (listening2) {
    document.removeEventListener("click", onDocClick2);
    document.removeEventListener("input", onDocInput2);
    document.removeEventListener("keydown", onKey2);
    window.removeEventListener("guroBoostsChanged", onBoostsChanged2);
    window.removeEventListener("guroGemPackChanged", onExternalChange2);
    window.removeEventListener("guroPricesUpdated", onExternalChange2);
    listening2 = false;
  }
  host2 = null;
  api2 = null;
}
function fruitsCalculatorCanLeave() {
  if (!popup2) return true;
  if (isPopupDirty2()) {
    toast("\u26A0\uFE0F Save your changes first");
    return false;
  }
  destroyPopup2();
  return true;
}

// src/rescalc_greenhouse.js
var STORE_KEY3 = "guro_rc_greenhouse_v1";
var MAX_CUSTOM_CYCLES3 = 1e5;
var MODES3 = [{
  id: "restock",
  label: "Per Restock Mode",
  short: "Per Restock Mode"
}, {
  id: "24h",
  label: "24Hrs Mode",
  short: "24Hrs Mode"
}];
var host3 = null;
var api3 = null;
var state3 = null;
var popup3 = null;
var overlayEl3 = null;
var promptEl3 = null;
var restoreFns3 = [];
var nodesDraft3 = null;
var listening3 = false;
var detailsOpen3 = false;
function esc4(s) {
  return escapeHtml(String(s));
}
function loadState3() {
  const base = {
    mode: "restock",
    season: previewSeason || "Spring",
    selected: [],
    cycles: {}
  };
  try {
    const raw = JSON.parse(localStorage.getItem(STORE_KEY3) || "null");
    if (raw && typeof raw === "object") {
      if (raw.mode === "24h" || raw.mode === "restock") base.mode = raw.mode;
      if (raw.season === "All" || SEASON_ORDER.includes(raw.season)) base.season = raw.season;
      if (Array.isArray(raw.selected)) base.selected = raw.selected.filter((n) => BASE_GREENHOUSE[n]);
      if (raw.cycles && typeof raw.cycles === "object") Object.keys(raw.cycles).forEach((k) => {
        const v = Math.floor(Number(raw.cycles[k]));
        if (BASE_GREENHOUSE[k] && isFinite(v) && v > 0) base.cycles[k] = Math.min(v, MAX_CUSTOM_CYCLES3);
      });
    }
  } catch (e) {
  }
  if (base.mode === "24h" && base.selected.length > 1) base.selected = base.selected.slice(0, 1);
  return base;
}
function saveState3() {
  try {
    localStorage.setItem(STORE_KEY3, JSON.stringify(state3));
  } catch (e) {
  }
}
function n24(n) {
  if (!isFinite(n)) return "\u2014";
  return n.toLocaleString(void 0, {
    minimumFractionDigits: 0,
    maximumFractionDigits: 2
  });
}
function fl3(n) {
  if (!isFinite(n)) return "\u2014";
  const a = Math.abs(n);
  const max = a >= 1e3 ? 0 : a >= 1 ? 2 : 4;
  return n.toLocaleString(void 0, {
    minimumFractionDigits: 0,
    maximumFractionDigits: max
  });
}
function signed4(n, f) {
  const r = f(Math.abs(n));
  if (n > 0 && r !== "0") return "+" + r;
  if (n < 0 && r !== "0") return "-" + r;
  return r;
}
function flowerSigned3(n) {
  return `${signed4(n, fl3)}${FLOWER_ICON}`;
}
function flowerHtml3(n) {
  return `${fl3(n)}${FLOWER_ICON}`;
}
function gemHtml3(n) {
  return `${n24(n)}${GEM_ICON}`;
}
function plantNames() {
  return Object.keys(BASE_GREENHOUSE);
}
function visiblePlants() {
  return plantNames();
}
function oilUnitFlower() {
  return coinsToFlower(getItemCostByName("Oil"));
}
function oilIconHtml() {
  return getIcon("Oil");
}
function ratioInfo3() {
  const fpg = flowerPerGem();
  return {
    free: !(fpg > 0),
    gemsPerFlower: fpg > 0 ? 1 / fpg : 0
  };
}
function compute3(name, mode, share) {
  const d = BASE_GREENHOUSE[name];
  const boosted = computeBoostedGreenhouseStats(name, d.baseYield || 1, d.timeSec);
  const nodes = getGreenhouseCount(name) || 0;
  const sell = farmPanelGetMarketPriceFlower(name) || 0;
  const feeRate = (feePercent || 0) / 100;
  const seedCost = coinsToFlower(getGreenhouseSeedCoins(name));
  const oilPerPlant = Math.max(0, (d.oilQty || 0) * (boosted.oilQtyMult || 1) - (boosted.oilFlatReduce || 0));
  const oilUnit = oilUnitFlower();
  const shrine = getActiveShrineDailyCost(boosted.activeBoosts);
  const stockBase = BASE_STOCK_GREENHOUSE[name] || 0;
  const stockQty = stockBase ? computeBoostedStock(stockBase, "seed", name) : 0;
  const gemPerRestock = getRestockGemCostIndividual("seed");
  const fullRestockFlower = gemsToFlower(gemPerRestock);
  const yieldPlot = boosted.yieldVal;
  const yieldAll = nodes * yieldPlot;
  const grossCycle = yieldAll * sell;
  const costCycle = nodes * seedCost;
  const oilQtyCycle = nodes * oilPerPlant;
  const oilCycle = oilQtyCycle * oilUnit;
  const shrineCycle = shrine.total * boosted.timeVal / 86400;
  const out = {
    name,
    nodes,
    timeSec: boosted.timeVal,
    yieldPlot,
    yieldAll,
    sell,
    seedCost,
    oilPerPlant,
    oilUnit,
    grossCycle,
    costCycle,
    oilQtyCycle,
    oilCycle,
    shrineCycle,
    feeRate,
    gemPerRestock,
    fullRestockFlower,
    stockQty,
    activeBoosts: boosted.activeBoosts,
    shareCount: share,
    mode
  };
  const customCycles = state3.cycles[name] > 0 ? state3.cycles[name] : 0;
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
      const sim = stockQty > 0 ? simulateStockCycles((pc) => computeBoostedGreenhouseStats(name, d.baseYield || 1, d.timeSec, pc), nodes, stockQty) : {
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
      const det = stockBase ? computeRestockCost24hDetailedIndividual(stockBase, "seed", nodes, cycles, 1, void 0, name) : null;
      restockQty = det ? Math.ceil(det.restocksPerDay - 1e-9) : 0;
      restockGems = restockQty * gemPerRestock;
      restockCost = gemsToFlower(restockGems);
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
function defaultCycles3(name) {
  const d = BASE_GREENHOUSE[name];
  if (!d) return 0;
  const boosted = computeBoostedGreenhouseStats(name, d.baseYield || 1, d.timeSec);
  return boosted.timeVal > 0 ? Math.round(86400 / boosted.timeVal) : 0;
}
function syncGemRatio3() {
  try {
    const want = currentRatio();
    const fpg = flowerPerGem();
    const have = fpg > 0 ? 1 / fpg : 0;
    const same = want.free ? !(fpg > 0) : Math.abs(want.gems - have) < 1e-6;
    if (!same) applySelection();
  } catch (e) {
  }
}
function computeAll3() {
  syncGemRatio3();
  const share = restockShareCount();
  return state3.selected.filter((n) => BASE_GREENHOUSE[n]).map((n) => compute3(n, state3.mode, share));
}
function totalsOf3(rows) {
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
  rows.forEach((r) => {
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
function seasonCardsHtml3() {
  return SEASON_ORDER.concat(["All"]).map((s) => {
    const on = state3.season === s;
    const icon = s === "All" ? `<span class="rc-season-all">\u2605</span>` : SEASON_EMOJI[s];
    return `<button type="button" class="rc-season guro-frame${on ? " is-on" : ""}" data-rc-season="${s}" aria-pressed="${on ? "true" : "false"}">${icon}<span class="rc-season-name">${s === "All" ? "Show All" : s}</span></button>`;
  }).join("");
}
function cropCellsHtml3() {
  return visiblePlants().map((n) => {
    const on = state3.selected.includes(n);
    return `<label class="rc-crop guro-frame${on ? " is-on" : ""}"><span class="rc-crop-icon">${getIcon(n)}</span><span class="rc-crop-name">${esc4(n)}</span><input type="checkbox" data-rc-crop="${esc4(n)}"${on ? " checked" : ""} aria-label="${esc4(n)}"></label>`;
  }).join("");
}
function tilesHtml3(rows) {
  if (!rows.length) return `<div class="rc-empty">No greenhouse plants selected yet. Tick a plant above to include it in the calculation.</div>`;
  return `<div class="rc-tiles">${rows.map((r) => {
    const good = r.net >= 0;
    return `<div class="rc-tile guro-frame ${good ? "is-profit" : "is-loss"}" data-rc-tile="${esc4(r.name)}"><span class="rc-tile-icon">${getIcon(r.name)}</span><span class="rc-tile-yield">${signed4(r.totalYield, n24)}</span><span class="rc-tile-net">${fl3(r.gross)}${FLOWER_ICON}</span></div>`;
  }).join("")}</div>`;
}
function valueBoxHtml3(label, html, extra) {
  return `<div class="rc-val guro-frame${extra ? " " + extra : ""}"><span class="rc-val-label">${label}</span><span class="rc-val-num">${html}</span></div>`;
}
function oilValueHtml(qty, flower) {
  return `${n24(qty)}${oilIconHtml()}(${fl3(flower)}${FLOWER_ICON})`;
}
function valuesHtml3(rows) {
  const t = totalsOf3(rows);
  const feeBox = (feePercent || 0) > 0 ? valueBoxHtml3("Market Fee", flowerHtml3(t.fee)) : "";
  return `<div class="rc-values">
    ${valueBoxHtml3("Gross", flowerHtml3(t.gross))}
    ${valueBoxHtml3("Cost", flowerHtml3(t.cost))}
    ${valueBoxHtml3("Oil Cost", oilValueHtml(t.oilQty, t.oil))}
    ${valueBoxHtml3("Shrine Cost", flowerHtml3(t.shrine))}
    ${valueBoxHtml3("Restock Cost", flowerHtml3(t.restock))}
    ${feeBox}
  </div>
  <div class="rc-net-row">
    ${valueBoxHtml3("Net", `<span class="${t.net >= 0 ? "is-profit" : "is-loss"}">${signed4(t.net, fl3)}${FLOWER_ICON}</span>`, "rc-val-net")}
    <button type="button" class="rc-linktext" data-rc-open="computation"${rows.length ? "" : " disabled"}>Computation</button>
  </div>`;
}
function modeNoteHtml3(rows) {
  const missing = rows.filter((r) => !(r.nodes > 0));
  const warn = missing.length ? `<div class="rc-note is-warn">${missing.map((r) => esc4(r.name)).join(", ")} ${missing.length === 1 ? "has" : "have"} 0 Greenhouse Plots, so ${missing.length === 1 ? "its result is" : "their results are"} 0. Open Nodes above and enter your greenhouse plots.</div>` : "";
  const text = state3.mode === "restock" ? `Per Restock Mode: 1 restock is shared by all ${restockShareCount()} seeds (all crops, fruits, greenhouse and flower seeds, moon seeds excluded), selected or not. Every planted seed also uses oil.` : "24Hrs Mode: the plant keeps restocking all day and pays for every restock alone. Every planted seed also uses oil.";
  return `<div class="rc-details-row"><button type="button" class="rc-linktext" data-rc-details aria-expanded="${detailsOpen3 ? "true" : "false"}">Details</button></div>${detailsOpen3 ? `<div class="rc-note">${text}</div>` : ""}${warn}`;
}
function pickerHtml3() {
  return `<section class="rc-block guro-frame" aria-label="Greenhouse Calculator">
    <div class="rc-block-title">Greenhouse Calculator</div>
    <div class="rc-crops" id="rcCrops">${cropCellsHtml3()}</div>
  </section>`;
}
function resultsHtml3() {
  const rows = computeAll3();
  return `<section class="rc-block guro-frame" aria-label="Greenhouse results">
    <div class="rc-modes" role="group" aria-label="Calculation mode">${MODES3.map((m) => `<button type="button" class="rc-mode guro-frame${state3.mode === m.id ? " is-on" : ""}" data-rc-mode="${m.id}" aria-pressed="${state3.mode === m.id ? "true" : "false"}">${m.label}</button>`).join("")}</div>
    <div class="rc-tools">
      <button type="button" class="rc-tool guro-frame" data-rc-open="skills">Skills</button>
      <button type="button" class="rc-tool guro-frame" data-rc-open="boost">Boost</button>
      <button type="button" class="rc-tool guro-frame" data-rc-open="nodes">Nodes</button>
    </div>
    ${modeNoteHtml3(rows)}
    <div id="rcResults">${tilesHtml3(rows)}${valuesHtml3(rows)}</div>
  </section>`;
}
function render3() {
  if (!host3) return;
  const scroller = document.scrollingElement;
  const y = scroller ? scroller.scrollTop : 0;
  host3.innerHTML = pickerHtml3() + resultsHtml3();
  if (scroller) scroller.scrollTop = y;
}
function refreshResults3() {
  if (!host3) return;
  const picker = host3.querySelector("#rcCrops");
  if (!picker) {
    render3();
    return;
  }
  const blocks = host3.querySelectorAll(".rc-block");
  if (blocks[1]) {
    const tmp = document.createElement("div");
    tmp.innerHTML = resultsHtml3();
    blocks[1].replaceWith(tmp.firstElementChild);
  }
  if (popup3 === "computation") renderOverlayBody3();
}
function effectParts4(b, name) {
  const y = [];
  const t = [];
  const c = [];
  const add = b.yieldAdd;
  if (add) y.push(`${add > 0 ? "+" : ""}${n24(add)} yield`);
  if (b.yieldMult) y.push(`\xD7${b.yieldMult} yield`);
  if (b.timeMult) t.push(`\xD7${b.timeMult} time`);
  if (b.freeCost) c.push("free seeds");
  if (b.seedQtyMult) c.push(`\xD7${b.seedQtyMult} seeds`);
  if (b.oilQtyMult) c.push(`\xD7${b.oilQtyMult} oil`);
  if (b.oilFlatReduce) c.push(`-${n24(b.oilFlatReduce)} oil`);
  if (b.coinCostMult) c.push(`\xD7${b.coinCostMult} cost`);
  if (b.coinCostMultAll) c.push(`\xD7${b.coinCostMultAll} cost`);
  return {
    yield: y,
    time: t,
    cost: c
  };
}
function appliedBoostHtml3(row) {
  const groups = {
    yield: [],
    time: [],
    cost: []
  };
  const list = row.activeBoosts.slice();
  const artist = BOOSTS.find((b) => b.id === "artist_discount");
  if (artist && isBoostActive(artist.id) && !list.includes(artist)) list.push(artist);
  list.forEach((b) => {
    const p = effectParts4(b, row.name);
    ["yield", "time", "cost"].forEach((k) => {
      if (p[k].length) groups[k].push(`<div class="rc-boost-row">${getBoostIconSkillFallback(b.name)}<span class="rc-boost-name">${esc4(b.name)}</span><span class="rc-boost-eff">${esc4(p[k].join(", "))}</span></div>`);
    });
  });
  const section = (label, items) => items.length ? `<div class="rc-boost-group"><div class="rc-boost-label">${label}</div>${items.join("")}</div>` : "";
  const body = section("Yield Boost", groups.yield) + section("Time Boost", groups.time) + section("Cost and Oil Boost", groups.cost);
  return `<div class="rc-group"><div class="rc-comp-sub">Applied Boost</div>${body || `<div class="rc-boost-none">No boost applied</div>`}</div>`;
}
function toolCostConfigHtml() {
  const fig = computeResourceFigures("Oil");
  if (!fig || !fig.breakdown) return "";
  const matsCost = fig.breakdown.reduce((sum, m) => sum + m.lineCost, 0);
  const coins = Math.max(0, fig.totalToolCost - matsCost);
  const free = fig.totalToolCost <= 0 && fig.breakdown.every((m) => m.unitCost === 0);
  const rows = free ? `<div class="rc-boost-none">Free tool</div>` : fig.breakdown.map((m) => {
    const btn = (mode, label) => `<button type="button" class="es-mode-btn es-toolcfg-tbtn${m.mode === mode ? " active" : ""}" data-rc-mat="${esc4(m.name)}" data-rc-mode="${mode}">${label}</button>`;
    return `<div class="rc-tool-mat"><span class="rc-tool-mat-item"><span class="rc-tool-mat-qty">${n24(m.qty)}</span>${getIcon(m.name)}</span><span class="es-toolcfg-tog">${btn("collect", "Collect")}${btn("buy", "Buy")}</span></div>`;
  }).join("");
  const coinRow = !free && coins > 0 ? `<div class="rc-tool-mat"><span class="rc-tool-mat-item"><span class="rc-tool-mat-qty">${n24(coins)}</span>${COIN_ICON}</span></div>` : "";
  return `<div class="rc-group"><div class="rc-comp-sub">Tool Cost Config</div>
    <div class="rc-tool-cfg"><div class="rc-tool-name">${getIcon("Oil Drill")}<span>Oil Drill</span></div>${coinRow}${rows}</div></div>`;
}
function kv3(label, html, cls) {
  return `<div class="rc-kv${cls ? " " + cls : ""}"><span class="rc-kv-label">${label}</span><span class="rc-kv-val">${html}</span></div>`;
}
function totalCycleHtml3(r) {
  const val = n24(r.cycles);
  if (r.mode !== "24h") return val;
  return `<span class="rc-cycle-val"><span>${val}${r.cyclesCustom ? ` <span class="rc-kv-sub">Custom</span>` : ""}</span><button type="button" class="rc-edit-link" data-rc-edit-cycle="${esc4(r.name)}">Edit</button></span>`;
}
function computationCardHtml3(r) {
  const ratio = ratioInfo3();
  const modeLabel = r.mode === "restock" ? "Per Restock Mode" : "24Hrs Mode";
  const qtyLabel = r.mode === "restock" ? `\xD7${r.restockQty} Restock` : `\xD7${n24(r.restockQty)} Restock${r.restockQty === 1 ? "" : "s"}`;
  const gemLine = `${gemHtml3(r.gemPerRestock)}`;
  const ratioLine = ratio.free ? `Free gems` : `1${FLOWER_ICON} : ${n24(ratio.gemsPerFlower)}${GEM_ICON}`;
  const shareLine = r.mode === "restock" && r.shareCount > 1 ? `<div class="rc-kv rc-kv-wide"><span class="rc-kv-label">Your share of 1 restock</span><span class="rc-kv-val">1/${r.shareCount} = ${flowerHtml3(r.restock)}</span></div>` : "";
  return `<article class="rc-comp-card guro-frame">
    <header class="rc-comp-head"><span class="rc-comp-icon">${getIcon(r.name)}</span><span class="rc-comp-name">${esc4(r.name)}</span><span class="rc-comp-nodes">${getIcon("Greenhouse")} ${n24(r.nodes)}</span></header>
    <div class="rc-group"><div class="rc-kv-grid">
      ${kv3("Growth Time", esc4(formatDuration(r.timeSec)), "rc-kv-wide")}
      ${kv3("Yield / Plot", `${signed4(r.yieldPlot, n24)}${getIcon(r.name)}`)}
      ${kv3("Yield / Harvest", `${signed4(r.yieldAll, n24)}${getIcon(r.name)}`)}
      ${kv3("Market Price / Unit", flowerSigned3(r.sell))}
      ${kv3("Gross / Harvest", flowerSigned3(r.grossCycle))}
      ${kv3("Seed Cost / Cycle", flowerHtml3(r.costCycle))}
      ${kv3("Oil / Plot", `${n24(r.oilPerPlant)}${oilIconHtml()}`)}
      ${kv3("Oil Cost / Cycle", oilValueHtml(r.oilQtyCycle, r.oilCycle))}
      ${kv3("Oil Price / Unit", flowerHtml3(r.oilUnit))}
      ${kv3("Shrine / Cycle", flowerHtml3(r.shrineCycle))}
      ${kv3("Restock / Cycle", flowerHtml3(r.restockCycle))}
      ${kv3("Net / Cycle", `<span class="${r.netCycle >= 0 ? "is-profit" : "is-loss"}">${signed4(r.netCycle, fl3)}${FLOWER_ICON}</span>`)}
    </div></div>
    <div class="rc-group"><div class="rc-comp-sub">${modeLabel}</div>
    <div class="rc-kv-grid">
      ${kv3("Total Cycle", totalCycleHtml3(r))}
      ${kv3("Seeds Planted", n24(r.plants))}
      ${kv3("Total Yield", `${signed4(r.totalYield, n24)}${getIcon(r.name)}`)}
      ${kv3("Total Gross", flowerSigned3(r.gross))}
      ${kv3("Total Seed Cost", flowerHtml3(r.cost))}
      ${kv3("Total Oil Cost", oilValueHtml(r.oilQty, r.oil), "rc-kv-wide")}
      ${kv3("Total Shrine Cost", flowerHtml3(r.shrine))}
      ${kv3("Total Restock Cost", flowerHtml3(r.restock))}
      ${kv3("Restock Quantity", qtyLabel)}
      ${kv3("Cost / Restock", `${gemLine}<span class="rc-kv-sub">${ratioLine}</span>`)}
      ${kv3("Gems Used", `${gemHtml3(r.restockGems)} = ${flowerHtml3(r.restock)}`, "rc-kv-wide")}
      ${shareLine}
      ${r.feeRate > 0 ? kv3("Market Fee", flowerHtml3(r.fee)) : ""}
      ${kv3("Total Net", `<span class="${r.net >= 0 ? "is-profit" : "is-loss"}">${signed4(r.net, fl3)}${FLOWER_ICON}</span>`, "rc-kv-wide rc-kv-net")}
    </div></div>
    ${appliedBoostHtml3(r)}
    ${toolCostConfigHtml()}
  </article>`;
}
function computationBodyHtml3() {
  const rows = computeAll3();
  if (!rows.length) return `<div class="rc-empty">No plants selected.</div>`;
  return rows.map(computationCardHtml3).join("");
}
function boostBodyHtml3() {
  if (!state3.selected.length) return `<div class="rc-empty">Select at least one plant to see the boosts that affect it.</div>`;
  const subjects = state3.selected.map((n) => ({
    name: n,
    icon: getIcon(n)
  }));
  const grapeOnly = /* @__PURE__ */ new Set(["time_warp_totem", "super_totem", "bountiful_harvest"]);
  const boosts = BOOSTS.filter((b) => b.source !== "skill" && !b.hiddenFromOwnPanel && (b.category === "greenhouse" || b.category === "crops"));
  const appliesTo = (b, s) => {
    const lower = s.name.toLowerCase();
    if (b.category === "greenhouse") {
      if (b.scope === "global") return true;
      if (b.scope === "greenhouse") return (b.target || "").toLowerCase() === lower;
      return false;
    }
    if (b.category === "crops" && b.scope === "global" && !b.composterFertilizer) {
      if (s.name === "Grape") return grapeOnly.has(b.id);
      return !CROPS_GLOBAL_EXCLUDED_FROM_GREENHOUSE.has(b.id) && (b.id !== "hoot" || lower === "rice");
    }
    return false;
  };
  const html = boostsBySubjectHtml({
    subjects,
    boosts,
    appliesTo,
    unit: "plots",
    allLabel: "Boost for All Selected Plants"
  });
  return `<div class="rc-pop-hint">Boosts that affect ${state3.selected.length > 1 ? "your selected plants" : esc4(state3.selected[0])}. Tap a boost to switch it on or off, then press Save.</div>${html || `<div class="rc-empty">No boosts found.</div>`}`;
}
function nodesBodyHtml3() {
  if (!state3.selected.length) return `<div class="rc-empty">Select at least one plant to set its Greenhouse Plots.</div>`;
  const rows = state3.selected.map((n) => {
    const value = nodesDraft3 && nodesDraft3[n] != null ? nodesDraft3[n] : getGreenhouseCount(n);
    return `<label class="rc-node-row guro-frame"><span class="rc-node-icon">${getIcon(n)}</span><span class="rc-node-text"><span class="rc-node-name">${esc4(n)}</span><span class="rc-node-used">Greenhouse Plots planted with ${esc4(n)}</span></span><input type="number" min="0" step="1" inputmode="numeric" data-rc-node="${esc4(n)}" value="${value ? value : ""}" placeholder="0"></label>`;
  }).join("");
  return `<div class="rc-pop-hint">Enter how many Greenhouse Plots grow each selected plant, then press Save.</div>${rows}`;
}
function popupTitle3() {
  if (popup3 === "skills") return "Greenhouse Skills";
  if (popup3 === "boost") return "Greenhouse Boosts";
  if (popup3 === "nodes") return "Greenhouse Nodes";
  return "Computation";
}
function popupBodyHtml3() {
  if (popup3 === "boost") return boostBodyHtml3();
  if (popup3 === "nodes") return nodesBodyHtml3();
  if (popup3 === "computation") return computationBodyHtml3();
  return `<div class="rc-pop-hint">All greenhouse skills from the Skill Tree. Changes here also change the Skill Tree. Press Save to apply them.</div><div id="rcSkillSlot"></div>`;
}
function borrow3(id, slotId) {
  const el = document.getElementById(id);
  const slot = document.getElementById(slotId);
  if (!el || !slot) return;
  const parent = el.parentNode;
  const next = el.nextSibling;
  slot.appendChild(el);
  restoreFns3.push(() => {
    if (!parent) return;
    if (next && next.parentNode === parent) parent.insertBefore(el, next);
    else parent.appendChild(el);
  });
}
function releaseBorrowed3() {
  while (restoreFns3.length) restoreFns3.pop()();
}
var savedSkillCategory3 = null;
function setupBorrowed3() {
  if (popup3 === "skills") {
    savedSkillCategory3 = skillCategory;
    setSkillCategory("greenhouse");
    borrow3("ascensionBar", "rcAscSlot");
    borrow3("skillListWrap", "rcSkillSlot");
    borrow3("skillSaveBar", "rcSaveSlot");
    renderSkillPanel();
    renderAscensionBar();
    updateSkillSaveBarState();
  } else if (popup3 === "boost") {
    borrow3("skillSaveBar", "rcSaveSlot");
    updateSkillSaveBarState();
  }
}
function teardownBorrowed3() {
  releaseBorrowed3();
  if (savedSkillCategory3 != null) {
    setSkillCategory(savedSkillCategory3);
    savedSkillCategory3 = null;
    renderSkillPanel();
  }
}
function footerHtml3() {
  if (popup3 === "nodes") return `<button type="button" class="rc-save guro-frame" id="rcNodesSave">Save Changes</button>`;
  if (popup3 === "skills" || popup3 === "boost") return `<div id="rcSaveSlot"></div>`;
  return "";
}
function overlayHtml3() {
  return `<div class="rc-pop guro-frame${popup3 === "computation" ? " rc-pop-comp" : ""}" role="dialog" aria-modal="true" aria-label="${popupTitle3()}">
    <div class="rc-pop-head"><span class="rc-pop-title">${popupTitle3()}</span><button type="button" class="rc-pop-close" data-rc-close aria-label="Close">\u2715</button></div>
    <div class="rc-pop-body" id="rcPopBody">${popupBodyHtml3()}</div>
    <div class="rc-pop-foot">${footerHtml3()}</div>
  </div>`;
}
function renderOverlayBody3() {
  if (!overlayEl3) return;
  const body = overlayEl3.querySelector("#rcPopBody");
  if (!body) return;
  if (popup3 === "skills") return;
  const top = body.scrollTop;
  body.innerHTML = popupBodyHtml3();
  body.scrollTop = top;
  updateSkillSaveBarState();
}
function isPopupDirty3() {
  if (popup3 === "skills" || popup3 === "boost") return isSkillDraftDirty() || isBoostDraftDirty();
  if (popup3 === "nodes") return !!nodesDraft3 && Object.keys(nodesDraft3).some((n) => Number(nodesDraft3[n]) !== (getGreenhouseCount(n) || 0));
  return false;
}
function openPopup3(kind) {
  if (popup3) return;
  popup3 = kind;
  nodesDraft3 = null;
  overlayEl3 = document.createElement("div");
  overlayEl3.className = "rc-overlay";
  overlayEl3.innerHTML = overlayHtml3();
  document.body.appendChild(overlayEl3);
  document.body.classList.add("rc-no-scroll");
  const slot = overlayEl3.querySelector("#rcSkillSlot");
  if (kind === "skills" && slot) {
    const asc = document.createElement("div");
    asc.id = "rcAscSlot";
    slot.parentNode.insertBefore(asc, slot);
  }
  setupBorrowed3();
}
function destroyPopup3() {
  teardownBorrowed3();
  if (overlayEl3) overlayEl3.remove();
  overlayEl3 = null;
  popup3 = null;
  nodesDraft3 = null;
  document.body.classList.remove("rc-no-scroll");
}
function closePopup3(force) {
  if (!popup3) return;
  if (!force && isPopupDirty3()) {
    showPrompt3("You have unsaved changes. Save them first, or discard them to close.", [{
      label: "Keep Editing"
    }, {
      label: "Discard",
      run: () => {
        discardSkillBoostDrafts();
        destroyPopup3();
        refreshResults3();
      }
    }]);
    return;
  }
  const wasComputation = popup3 === "computation";
  destroyPopup3();
  if (!wasComputation) refreshResults3();
}
function showPrompt3(message, buttons) {
  if (promptEl3) promptEl3.remove();
  promptEl3 = document.createElement("div");
  promptEl3.className = "rc-overlay rc-overlay-top";
  promptEl3.innerHTML = `<div class="rc-prompt guro-frame" role="alertdialog" aria-modal="true"><p class="rc-prompt-text">${esc4(message)}</p><div class="rc-prompt-actions">${buttons.map((b, i) => `<button type="button" class="rc-prompt-btn guro-frame" data-rc-prompt="${i}">${esc4(b.label)}</button>`).join("")}</div></div>`;
  promptEl3.addEventListener("click", (e) => {
    const btn = e.target.closest("[data-rc-prompt]");
    if (!btn) return;
    const b = buttons[Number(btn.getAttribute("data-rc-prompt"))];
    promptEl3.remove();
    promptEl3 = null;
    if (b && b.run) b.run();
  });
  document.body.appendChild(promptEl3);
  const first = promptEl3.querySelector("button");
  if (first) first.focus();
}
function closeCycleEditor3() {
  if (promptEl3) promptEl3.remove();
  promptEl3 = null;
}
function openCycleEditor3(name) {
  if (promptEl3) promptEl3.remove();
  const current = state3.cycles[name] > 0 ? state3.cycles[name] : "";
  const fallback = defaultCycles3(name);
  promptEl3 = document.createElement("div");
  promptEl3.className = "rc-overlay rc-overlay-top";
  promptEl3.innerHTML = `<div class="rc-prompt rc-cycle-edit guro-frame" role="dialog" aria-modal="true" aria-label="Editing Cycle"><div class="rc-cycle-edit-label">Editing Cycle</div><div class="rc-cycle-edit-row"><input type="number" min="0" max="${MAX_CUSTOM_CYCLES3}" step="1" inputmode="numeric" class="rc-cycle-input guro-frame" data-rc-cycle-input value="${current}" placeholder="${fallback}" aria-label="Cycle count"><button type="button" class="rc-prompt-btn guro-frame" data-rc-cycle-save>Save</button></div></div>`;
  promptEl3.addEventListener("click", (e) => {
    if (e.target === promptEl3) {
      closeCycleEditor3();
      return;
    }
    if (e.target.closest("[data-rc-cycle-save]")) saveCycleEdit3(name);
  });
  promptEl3.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      saveCycleEdit3(name);
    }
  });
  document.body.appendChild(promptEl3);
  const input = promptEl3.querySelector("[data-rc-cycle-input]");
  if (input) {
    input.focus();
    input.select();
  }
}
function saveCycleEdit3(name) {
  if (!promptEl3) return;
  const input = promptEl3.querySelector("[data-rc-cycle-input]");
  const btn = promptEl3.querySelector("[data-rc-cycle-save]");
  if (!input || btn && btn.disabled) return;
  const value = input.value === "" ? 0 : Math.floor(Number(input.value));
  if (btn) btn.disabled = true;
  input.disabled = true;
  const chip = document.createElement("div");
  chip.className = "bg-sim-saving guro-frame";
  chip.innerHTML = `<span class="bg-sim-spin"></span><span class="bg-sim-saving-text">Saving...</span>`;
  document.body.appendChild(chip);
  setTimeout(() => {
    if (isFinite(value) && value > 0) state3.cycles[name] = Math.min(value, MAX_CUSTOM_CYCLES3);
    else delete state3.cycles[name];
    saveState3();
    closeCycleEditor3();
    refreshResults3();
    chip.classList.add("is-done");
    chip.innerHTML = `<span class="bg-sim-tick">\u2713</span><span class="bg-sim-saving-text">Saved</span>`;
    setTimeout(() => chip.remove(), 900);
  }, 700);
}
function saveNodes3() {
  const draft = nodesDraft3 || {};
  Object.keys(draft).forEach((n) => {
    setGreenhouseCount(n, Math.max(0, Math.floor(Number(draft[n]) || 0)));
  });
  invalidateCostCache();
  renderLibraryLists();
  renderBoostPanel();
  updateCalcSummary();
  nodesDraft3 = null;
  toast("\u2705 Greenhouse plots saved");
  renderOverlayBody3();
  refreshResults3();
}
function toggleCrop3(name, input) {
  const idx = state3.selected.indexOf(name);
  if (idx >= 0) {
    state3.selected.splice(idx, 1);
  } else {
    if (state3.mode === "24h" && state3.selected.length >= 1) {
      if (input) input.checked = false;
      showPrompt3("Only one plant can be calculated in 24Hrs Mode. Uncheck the selected plant first, or switch to Per Restock Mode to calculate several plants.", [{
        label: "OK"
      }]);
      return;
    }
    state3.selected.push(name);
  }
  saveState3();
  const label = input ? input.closest(".rc-crop") : null;
  if (label) label.classList.toggle("is-on", state3.selected.includes(name));
  refreshResults3();
}
function setMode3(id) {
  if (id === state3.mode) return;
  if (id === "24h" && state3.selected.length > 1) {
    showPrompt3("Only one plant can be calculated in 24Hrs Mode. Uncheck the other plants first, then switch.", [{
      label: "OK"
    }]);
    return;
  }
  state3.mode = id;
  saveState3();
  refreshResults3();
}
function onClick3(e) {
  const details = e.target.closest("[data-rc-details]");
  if (details) {
    detailsOpen3 = !detailsOpen3;
    refreshResults3();
    return;
  }
  const season = e.target.closest("[data-rc-season]");
  if (season) {
    state3.season = season.getAttribute("data-rc-season");
    saveState3();
    const seasons = host3.querySelector("#rcSeasons");
    const crops = host3.querySelector("#rcCrops");
    if (seasons) seasons.innerHTML = seasonCardsHtml3();
    if (crops) crops.innerHTML = cropCellsHtml3();
    return;
  }
  const mode = e.target.closest("[data-rc-mode]");
  if (mode) {
    setMode3(mode.getAttribute("data-rc-mode"));
    return;
  }
  const open = e.target.closest("[data-rc-open]");
  if (open && !open.disabled) openPopup3(open.getAttribute("data-rc-open"));
}
function onChange3(e) {
  const t = e.target;
  if (t && t.dataset && t.dataset.rcCrop != null) toggleCrop3(t.dataset.rcCrop, t);
}
function onDocClick3(e) {
  if (!overlayEl3) return;
  if (promptEl3 && promptEl3.contains(e.target)) return;
  if (e.target === overlayEl3 || e.target.closest("[data-rc-close]")) {
    closePopup3(false);
    return;
  }
  if (!overlayEl3.contains(e.target)) return;
  if (e.target.closest("#rcNodesSave")) {
    saveNodes3();
    return;
  }
  const matBtn = e.target.closest("[data-rc-mat]");
  if (matBtn && popup3 === "computation") {
    setMaterialMode("Oil", matBtn.getAttribute("data-rc-mat"), matBtn.getAttribute("data-rc-mode"));
    invalidateCostCache();
    renderOverlayBody3();
    refreshResults3();
    return;
  }
  const editCycle = e.target.closest("[data-rc-edit-cycle]");
  if (editCycle && popup3 === "computation") {
    openCycleEditor3(editCycle.getAttribute("data-rc-edit-cycle"));
    return;
  }
  const row = e.target.closest("[data-boost-id]");
  if (row && popup3 === "boost" && overlayEl3.contains(row)) {
    draftToggleBoost(row.getAttribute("data-boost-id"));
    renderOverlayBody3();
  }
}
function onDocInput3(e) {
  const t = e.target;
  if (t && t.dataset && t.dataset.rcNode != null) {
    nodesDraft3 = nodesDraft3 || {};
    nodesDraft3[t.dataset.rcNode] = t.value === "" ? 0 : Number(t.value);
  }
}
function onKey3(e) {
  if (e.key !== "Escape") return;
  if (promptEl3) {
    promptEl3.remove();
    promptEl3 = null;
    return;
  }
  if (popup3) closePopup3(false);
}
function onBoostsChanged3() {
  if (!host3) return;
  invalidateCostCache();
  if (popup3 === "boost") renderOverlayBody3();
  refreshResults3();
}
function onExternalChange3() {
  if (!host3) return;
  refreshResults3();
}
function mountGreenhouseCalculator(root, appApi) {
  host3 = root;
  api3 = appApi;
  invalidateCostCache();
  state3 = loadState3();
  detailsOpen3 = false;
  syncGemRatio3();
  host3.addEventListener("click", onClick3);
  host3.addEventListener("change", onChange3);
  document.addEventListener("click", onDocClick3);
  document.addEventListener("input", onDocInput3);
  document.addEventListener("keydown", onKey3);
  window.addEventListener("guroBoostsChanged", onBoostsChanged3);
  window.addEventListener("guroGemPackChanged", onExternalChange3);
  window.addEventListener("guroPricesUpdated", onExternalChange3);
  listening3 = true;
  render3();
}
function unmountGreenhouseCalculator() {
  if (popup3) destroyPopup3();
  if (promptEl3) {
    promptEl3.remove();
    promptEl3 = null;
  }
  if (host3) {
    host3.removeEventListener("click", onClick3);
    host3.removeEventListener("change", onChange3);
    host3.innerHTML = "";
  }
  if (listening3) {
    document.removeEventListener("click", onDocClick3);
    document.removeEventListener("input", onDocInput3);
    document.removeEventListener("keydown", onKey3);
    window.removeEventListener("guroBoostsChanged", onBoostsChanged3);
    window.removeEventListener("guroGemPackChanged", onExternalChange3);
    window.removeEventListener("guroPricesUpdated", onExternalChange3);
    listening3 = false;
  }
  host3 = null;
  api3 = null;
}
function greenhouseCalculatorCanLeave() {
  if (!popup3) return true;
  if (isPopupDirty3()) {
    toast("\u26A0\uFE0F Save your changes first");
    return false;
  }
  destroyPopup3();
  return true;
}

// src/rescalc_resources.js
var STORE_KEY4 = "guro_rc_resources_v1";
var AUTO_COLLECT_MIN_PROFIT = 0.2;
var MAX_CUSTOM_CYCLES4 = 1e5;
var MODES4 = [{
  id: "restock",
  label: "Per Restock Mode",
  short: "Per Restock Mode"
}, {
  id: "24h",
  label: "24Hrs Mode",
  short: "24Hrs Mode"
}];
var host4 = null;
var api4 = null;
var state4 = null;
var popup4 = null;
var overlayEl4 = null;
var promptEl4 = null;
var restoreFns4 = [];
var nodesDraft4 = null;
var listening4 = false;
var detailsOpen4 = false;
var skillTab = "mining";
function esc5(s) {
  return escapeHtml(String(s));
}
function resourceNames() {
  return Object.keys(RESOURCE_DATA);
}
function isResource(n) {
  return !!RESOURCE_DATA[n];
}
function resTool(n) {
  return (RESOURCE_DATA[n] || {}).tool;
}
function figOf(n) {
  return computeResourceFigures(n);
}
function nodeCountOf(n) {
  return getNodeCount(n) || 0;
}
function iconNameOf(n) {
  return n;
}
function loadState4() {
  const base = {
    mode: "restock",
    selected: [],
    cycles: {}
  };
  try {
    const raw = JSON.parse(localStorage.getItem(STORE_KEY4) || "null");
    if (raw && typeof raw === "object") {
      if (raw.mode === "24h" || raw.mode === "restock") base.mode = raw.mode;
      if (Array.isArray(raw.selected)) base.selected = raw.selected.filter(isResource);
      if (raw.cycles && typeof raw.cycles === "object") Object.keys(raw.cycles).forEach((k) => {
        const v = Math.floor(Number(raw.cycles[k]));
        if (isResource(k) && isFinite(v) && v > 0) base.cycles[k] = Math.min(v, MAX_CUSTOM_CYCLES4);
      });
    }
  } catch (e) {
  }
  return base;
}
function saveState4() {
  try {
    localStorage.setItem(STORE_KEY4, JSON.stringify(state4));
  } catch (e) {
  }
}
function n25(n) {
  if (!isFinite(n)) return "\u2014";
  return n.toLocaleString(void 0, {
    minimumFractionDigits: 0,
    maximumFractionDigits: 2
  });
}
function fl4(n) {
  if (!isFinite(n)) return "\u2014";
  const a = Math.abs(n);
  const max = a >= 1e3 ? 0 : a >= 1 ? 2 : 4;
  return n.toLocaleString(void 0, {
    minimumFractionDigits: 0,
    maximumFractionDigits: max
  });
}
function signed5(n, f) {
  const r = f(Math.abs(n));
  if (n > 0 && r !== "0") return "+" + r;
  if (n < 0 && r !== "0") return "-" + r;
  return r;
}
function flowerSigned4(n) {
  return `${signed5(n, fl4)}${FLOWER_ICON}`;
}
function flowerHtml4(n) {
  return `${fl4(n)}${FLOWER_ICON}`;
}
function gemHtml4(n) {
  return `${n25(n)}${GEM_ICON}`;
}
function ratioInfo4() {
  const fpg = flowerPerGem();
  return {
    free: !(fpg > 0),
    gemsPerFlower: fpg > 0 ? 1 / fpg : 0
  };
}
function toolBoosts(tool) {
  return BOOSTS.filter((b) => b.category === "tools" && b.scope === "tool" && b.target === tool && isBoostActive(b.id));
}
function compute4(name, mode, share) {
  const fig = figOf(name);
  const nodes = nodeCountOf(name);
  const sell = farmPanelGetMarketPriceFlower(name) || 0;
  const feeRate = (feePercent || 0) / 100;
  const tool = fig.tool;
  const regrowSources = getInstantRegrowSources(name);
  const regrowChance = getInstantRegrowChance(name);
  const avgHarvests = 1 / (1 - regrowChance);
  const toolUse = (fig.toolUsageTotal || 0) * avgHarvests;
  const baseYieldCycle = nodes > 0 ? fig.totalYieldPerCycle || 0 : 0;
  const yieldCycle = baseYieldCycle * avgHarvests;
  const toolUnit = coinsToFlower(fig.totalToolCost || 0);
  const shrine = getActiveShrineDailyCost(fig.activeBoosts);
  const stockBase = BASE_STOCK_TOOLS[tool] || 0;
  const stockQty = stockBase ? computeBoostedStock(stockBase, "tool", tool) : 0;
  const gemPerRestock = getRestockGemCostIndividual("tool");
  const fullRestockFlower = gemsToFlower(gemPerRestock);
  const matsCoins = fig.breakdown.reduce((sum, m) => sum + m.lineCost, 0);
  const tierCounts = isTieredResource(name) ? getNodeTierCounts(name) : null;
  const tiers = tierCounts ? RESOURCE_NODE_TIERS[name].map((t) => {
    const perNode = fig.perTierYield && fig.perTierYield[t.key] != null ? fig.perTierYield[t.key] : fig.yieldPer;
    const nodeYield = t.mult * perNode + t.yieldAdd;
    const count = parseFloat(tierCounts[t.key]) || 0;
    return {
      key: t.key,
      label: t.label,
      icon: t.displayLabel || t.label,
      bonus: t.yieldAdd,
      count,
      nodeYield,
      total: count * nodeYield * avgHarvests
    };
  }) : null;
  const yieldNode = tiers ? tiers[0].nodeYield : fig.yieldPer;
  const grossCycle = yieldCycle * sell;
  const costCycle = toolUnit * toolUse;
  const shrineCycle = shrine.total * fig.timeSec / 86400;
  const out = {
    name,
    tool,
    nodes,
    timeSec: fig.timeSec,
    yieldNode,
    regrowChance,
    regrowSources,
    avgHarvests,
    extraNodesCycle: nodes * (avgHarvests - 1),
    extraYieldCycle: yieldCycle - baseYieldCycle,
    tiers,
    toolUse,
    yieldCycle,
    sell,
    toolUnit,
    grossCycle,
    costCycle,
    shrineCycle,
    feeRate,
    gemPerRestock,
    fullRestockFlower,
    stockQty,
    breakdown: fig.breakdown,
    toolCoins: Math.max(0, (fig.totalToolCost || 0) - matsCoins),
    freeTool: (fig.totalToolCost || 0) <= 0 && toolUse <= 0,
    activeBoosts: fig.activeBoosts.concat(toolBoosts(tool)),
    shareCount: share,
    mode
  };
  const customCycles = state4.cycles[name] > 0 ? state4.cycles[name] : 0;
  let cycles = 0;
  let toolUses = 0;
  let totalTimeSec = 0;
  let restockQty = 0;
  let restockGems = 0;
  let restockCost = 0;
  let shrineTotal = 0;
  if (nodes > 0 && yieldCycle > 0) {
    if (mode === "restock") {
      if (toolUse > 0) {
        toolUses = stockQty;
        cycles = stockQty / toolUse;
        restockQty = stockQty > 0 ? 1 : 0;
      } else {
        cycles = 1;
      }
      totalTimeSec = cycles * fig.timeSec;
      shrineTotal = shrine.total * totalTimeSec / 86400;
      restockGems = restockQty ? gemPerRestock / Math.max(1, share) : 0;
      restockCost = restockQty ? fullRestockFlower / Math.max(1, share) : 0;
    } else {
      cycles = customCycles > 0 ? customCycles : Math.round(86400 / fig.timeSec);
      toolUses = toolUse * cycles;
      totalTimeSec = customCycles > 0 ? cycles * fig.timeSec : 86400;
      shrineTotal = shrine.total * totalTimeSec / 86400;
      restockQty = stockQty > 0 && toolUses > 0 ? Math.ceil(toolUses / stockQty - 1e-9) : 0;
      restockGems = restockQty * gemPerRestock / Math.max(1, share);
      restockCost = gemsToFlower(restockGems);
    }
  }
  const totalYield = yieldCycle * cycles;
  const gross = totalYield * sell;
  const fee = gross * feeRate;
  const costTotal = toolUnit * toolUses;
  out.cycles = cycles;
  out.cyclesCustom = mode === "24h" && customCycles > 0;
  out.extraNodes = out.extraNodesCycle * cycles;
  out.extraYield = out.extraYieldCycle * cycles;
  out.toolUses = toolUses;
  out.totalTimeSec = totalTimeSec;
  out.totalYield = totalYield;
  out.gross = gross;
  out.fee = fee;
  out.cost = costTotal;
  out.shrine = shrineTotal;
  out.restock = restockCost;
  out.restockQty = restockQty;
  out.restockGems = restockGems;
  out.net = gross - fee - costTotal - shrineTotal - restockCost;
  out.restockCycle = cycles > 0 ? restockCost / cycles : 0;
  out.netCycle = grossCycle * (1 - feeRate) - costCycle - shrineCycle - out.restockCycle;
  return out;
}
function syncGemRatio4() {
  try {
    const want = currentRatio();
    const fpg = flowerPerGem();
    const have = fpg > 0 ? 1 / fpg : 0;
    const same = want.free ? !(fpg > 0) : Math.abs(want.gems - have) < 1e-6;
    if (!same) applySelection();
  } catch (e) {
  }
}
function autoModeFor(material) {
  const sell = farmPanelGetMarketPriceFlower(material) || 0;
  if (!(sell > 0)) return null;
  const cost = coinsToFlower(getItemCostByName(material));
  if (!isFinite(cost)) return null;
  if (cost <= 0) return "collect";
  const net = sell * (1 - (feePercent || 0) / 100);
  return (net - cost) / cost >= AUTO_COLLECT_MIN_PROFIT ? "collect" : "buy";
}
function refreshAutoModes() {
  const map = {};
  setAutoMaterialModes(map);
  invalidateCostCache();
  resourceNames().forEach((res) => {
    RESOURCE_DATA[res].materials.forEach((m) => {
      if (!isResource(m.name) || hasManualMaterialMode(res, m.name)) return;
      const mode = autoModeFor(m.name);
      if (!mode) return;
      map[res + ":" + m.name] = mode;
      invalidateCostCache();
    });
  });
}
function computeAll4() {
  syncGemRatio4();
  refreshAutoModes();
  const share = toolRestockShareCount();
  return state4.selected.filter(isResource).map((n) => compute4(n, state4.mode, share));
}
function totalsOf4(rows) {
  const t = {
    gross: 0,
    fee: 0,
    cost: 0,
    shrine: 0,
    restock: 0,
    net: 0
  };
  rows.forEach((r) => {
    t.gross += r.gross;
    t.fee += r.fee;
    t.cost += r.cost;
    t.shrine += r.shrine;
    t.restock += r.restock;
    t.net += r.net;
  });
  return t;
}
function cropCellsHtml4() {
  return resourceNames().map((n) => {
    const on = state4.selected.includes(n);
    return `<label class="rc-crop guro-frame${on ? " is-on" : ""}"><span class="rc-crop-icon">${getIcon(iconNameOf(n))}</span><span class="rc-crop-name">${esc5(n)}</span><input type="checkbox" data-rc-crop="${esc5(n)}"${on ? " checked" : ""} aria-label="${esc5(n)}"></label>`;
  }).join("");
}
function tilesHtml4(rows) {
  if (!rows.length) return `<div class="rc-empty">No resources selected yet. Tick a resource above to include it in the calculation.</div>`;
  return `<div class="rc-tiles">${rows.map((r) => {
    const good = r.net >= 0;
    return `<div class="rc-tile guro-frame ${good ? "is-profit" : "is-loss"}" data-rc-tile="${esc5(r.name)}"><span class="rc-tile-icon">${getIcon(iconNameOf(r.name))}</span><span class="rc-tile-yield">${signed5(r.totalYield, n25)}</span><span class="rc-tile-net">${fl4(r.gross)}${FLOWER_ICON}</span></div>`;
  }).join("")}</div>`;
}
function valueBoxHtml4(label, html, extra) {
  return `<div class="rc-val guro-frame${extra ? " " + extra : ""}"><span class="rc-val-label">${label}</span><span class="rc-val-num">${html}</span></div>`;
}
function valuesHtml4(rows) {
  const t = totalsOf4(rows);
  const feeBox = (feePercent || 0) > 0 ? valueBoxHtml4("Market Fee", flowerHtml4(t.fee)) : "";
  return `<div class="rc-values">
    ${valueBoxHtml4("Gross", flowerHtml4(t.gross))}
    ${valueBoxHtml4("Tool Cost", flowerHtml4(t.cost))}
    ${valueBoxHtml4("Shrine Cost", flowerHtml4(t.shrine))}
    ${valueBoxHtml4("Restock Cost", flowerHtml4(t.restock))}
    ${feeBox}
  </div>
  <div class="rc-net-row">
    ${valueBoxHtml4("Net", `<span class="${t.net >= 0 ? "is-profit" : "is-loss"}">${signed5(t.net, fl4)}${FLOWER_ICON}</span>`, "rc-val-net")}
    <button type="button" class="rc-linktext" data-rc-open="computation"${rows.length ? "" : " disabled"}>Computation</button>
  </div>`;
}
function modeNoteHtml4(rows) {
  const total = state4.selected.reduce((s, n) => s + nodeCountOf(n), 0);
  const warn = state4.selected.length && total <= 0 ? `<div class="rc-note is-warn">The selected resources have 0 nodes, so every result is 0. Open Nodes above and enter your nodes.</div>` : "";
  const text = state4.mode === "restock" ? `Per Restock Mode: the tool stock is used up and 1 restock is shared by all ${toolRestockShareCount()} tools, selected or not.` : `24Hrs Mode: the nodes are harvested all day and every restock needed is shared by all ${toolRestockShareCount()} tools, selected or not.`;
  return `<div class="rc-details-row"><button type="button" class="rc-linktext" data-rc-details aria-expanded="${detailsOpen4 ? "true" : "false"}">Details</button></div>${detailsOpen4 ? `<div class="rc-note">${text}</div>` : ""}${warn}`;
}
function pickerHtml4() {
  return `<section class="rc-block guro-frame" aria-label="Resources Calculator">
    <div class="rc-block-title">Resources Calculator</div>
    <div class="rc-crops" id="rcCrops">${cropCellsHtml4()}</div>
  </section>`;
}
function resultsHtml4() {
  const rows = computeAll4();
  return `<section class="rc-block guro-frame" aria-label="Resources results">
    <div class="rc-modes" role="group" aria-label="Calculation mode">${MODES4.map((m) => `<button type="button" class="rc-mode guro-frame${state4.mode === m.id ? " is-on" : ""}" data-rc-mode="${m.id}" aria-pressed="${state4.mode === m.id ? "true" : "false"}">${m.label}</button>`).join("")}</div>
    <div class="rc-tools">
      <button type="button" class="rc-tool guro-frame" data-rc-open="skills">Skills</button>
      <button type="button" class="rc-tool guro-frame" data-rc-open="boost">Boost</button>
      <button type="button" class="rc-tool guro-frame" data-rc-open="nodes">Nodes</button>
    </div>
    ${modeNoteHtml4(rows)}
    <div id="rcResults">${tilesHtml4(rows)}${valuesHtml4(rows)}</div>
  </section>`;
}
function render4() {
  if (!host4) return;
  const scroller = document.scrollingElement;
  const y = scroller ? scroller.scrollTop : 0;
  host4.innerHTML = pickerHtml4() + resultsHtml4();
  if (scroller) scroller.scrollTop = y;
}
function refreshResults4() {
  if (!host4) return;
  const picker = host4.querySelector("#rcCrops");
  if (!picker) {
    render4();
    return;
  }
  const blocks = host4.querySelectorAll(".rc-block");
  if (blocks[1]) {
    const tmp = document.createElement("div");
    tmp.innerHTML = resultsHtml4();
    blocks[1].replaceWith(tmp.firstElementChild);
  }
  if (popup4 === "computation") renderOverlayBody4();
}
function effectParts5(b, name) {
  const y = [];
  const t = [];
  const c = [];
  const add = b.resourceEffects ? b.resourceEffects[name] || 0 : b.yieldAdd || 0;
  if (add) y.push(`${add > 0 ? "+" : ""}${n25(add)} yield`);
  if (b.yieldMult) y.push(`\xD7${b.yieldMult} yield`);
  if (b.timeMult) t.push(`\xD7${b.timeMult} time`);
  if (b.toolCostMult) c.push(`\xD7${b.toolCostMult} tool cost`);
  if (b.coinCostMult) c.push(`\xD7${b.coinCostMult} tool cost`);
  if (b.noTool) c.push("free tool");
  if (b.materialSwap) c.push(`${b.materialSwap.from} \u2192 ${b.materialSwap.to}`);
  if (b.stockAdd) c.push(`+${n25(b.stockAdd)} stock`);
  return {
    yield: y,
    time: t,
    cost: c
  };
}
function appliedBoostHtml4(row) {
  const groups = {
    yield: [],
    time: [],
    cost: [],
    regrow: []
  };
  const list = row.activeBoosts.slice();
  const artist = BOOSTS.find((b) => b.id === "artist_discount");
  if (artist && isBoostActive(artist.id) && !list.includes(artist)) list.push(artist);
  list.forEach((b) => {
    const p = effectParts5(b, row.name);
    ["yield", "time", "cost"].forEach((k) => {
      if (p[k].length) groups[k].push(`<div class="rc-boost-row">${getBoostIconAnyFallback(b.name)}<span class="rc-boost-name">${esc5(b.name)}</span><span class="rc-boost-eff">${esc5(p[k].join(", "))}</span></div>`);
    });
  });
  row.regrowSources.forEach((src) => {
    groups.regrow.push(`<div class="rc-boost-row">${getBoostIconAnyFallback(src.name)}<span class="rc-boost-name">${esc5(src.name)}</span><span class="rc-boost-eff">${n25(src.chance * 100)}% instant regrow</span></div>`);
  });
  const section = (label, items) => items.length ? `<div class="rc-boost-group"><div class="rc-boost-label">${label}</div>${items.join("")}</div>` : "";
  const body = section("Yield Boost", groups.yield) + section("Time Boost", groups.time) + section("Tool Boost", groups.cost) + section("Instant Regrow", groups.regrow);
  return `<div class="rc-group"><div class="rc-comp-sub">Applied Boost</div>${body || `<div class="rc-boost-none">No boost applied</div>`}</div>`;
}
function kv4(label, html, cls) {
  return `<div class="rc-kv${cls ? " " + cls : ""}"><span class="rc-kv-label">${label}</span><span class="rc-kv-val">${html}</span></div>`;
}
function matPrice(name) {
  return farmPanelGetMarketPriceFlower(name) || 0;
}
function matRowHtml(name, qty, price, badge) {
  return `<div class="rc-mat-row"><span class="rc-mat-main">${getIcon(name)}<span class="rc-mat-name">${esc5(name)}</span><span class="rc-mat-qty">\xD7${n25(qty)}</span><span class="rc-mat-val">(${flowerHtml4(qty * price)})</span></span><span class="rc-badge">${badge}</span></div>`;
}
function nodeTiersHtml(r) {
  if (!r.tiers) return "";
  const rows = r.tiers.map((t) => `<div class="rc-tier-row"><span class="rc-tier-name">${getIcon(t.icon)}<span>${esc5(t.label)}</span>${t.bonus ? `<span class="rc-tier-bonus">+${n25(t.bonus)}</span>` : ""}</span><span class="rc-tier-nums"><span class="rc-tier-count">\xD7${n25(t.count)}</span><span class="rc-tier-yield">${signed5(t.total, n25)}${getIcon(r.name)}</span></span></div>`).join("");
  return `<div class="rc-group"><div class="rc-comp-sub">Nodes Tier</div>${rows}</div>`;
}
function toolCostConfigHtml2(r) {
  if (r.freeTool) return `<div class="rc-group"><div class="rc-comp-sub">Tool Cost Config</div><div class="rc-boost-none">Free tool</div></div>`;
  const btn = (m, mode, label) => `<button type="button" class="es-mode-btn es-toolcfg-tbtn${m.mode === mode ? " active" : ""}" data-rc-res="${esc5(r.name)}" data-rc-mat="${esc5(m.name)}" data-rc-mode="${mode}">${label}</button>`;
  const rows = r.breakdown.map((m) => {
    const tog = m.name.toLowerCase() === "oil" ? `<span class="es-toolcfg-free">Always Collect</span>` : `<span class="es-toolcfg-tog">${btn(m, "collect", "Collect")}${btn(m, "buy", "Buy")}</span>`;
    return `<div class="rc-tool-mat"><span class="rc-tool-mat-item"><span class="rc-tool-mat-qty">${n25(m.qty)}</span>${getIcon(m.name)}</span>${tog}</div>`;
  }).join("");
  const coinRow = r.toolCoins > 0 ? `<div class="rc-tool-mat"><span class="rc-tool-mat-item"><span class="rc-tool-mat-qty">${n25(r.toolCoins)}</span>${COIN_ICON}</span></div>` : "";
  return `<div class="rc-group"><div class="rc-comp-sub">Tool Cost Config</div>
    <div class="rc-tool-cfg"><div class="rc-tool-name">${getIcon(r.tool)}<span>${esc5(r.tool)}</span></div>${coinRow}${rows}</div></div>`;
}
function materialsHtml(r) {
  const modeBadge = r.mode === "restock" ? "Per Restock" : "24hr";
  const mats = r.breakdown.filter((m) => m.qty > 0);
  const matRows = !mats.length || r.toolUse <= 0 ? `<div class="rc-boost-none">No material used</div>` : mats.map((m) => {
    const p = matPrice(m.name);
    return matRowHtml(m.name, m.qty * r.toolUse, p, "1 cycle") + matRowHtml(m.name, m.qty * r.toolUses, p, modeBadge);
  }).join("");
  const yieldRows = matRowHtml(r.name, r.yieldCycle, r.sell, "1 cycle") + matRowHtml(r.name, r.totalYield, r.sell, modeBadge);
  return `<div class="rc-mat-section rc-group"><div class="rc-boost-label">Material Used</div>${matRows}</div>
    <div class="rc-mat-section rc-group"><div class="rc-boost-label">${esc5(r.name)} Yield</div>${yieldRows}</div>`;
}
function totalCycleHtml4(r) {
  if (r.mode !== "24h") return n25(r.cycles);
  return `<span class="rc-cycle-val"><span>${n25(r.cycles)}${r.cyclesCustom ? ` <span class="rc-kv-sub">Custom</span>` : ""}</span><button type="button" class="rc-edit-link" data-rc-edit-cycle="${esc5(r.name)}">Edit</button></span>`;
}
function computationCardHtml4(r) {
  const ratio = ratioInfo4();
  const modeLabel = r.mode === "restock" ? "Per Restock Mode" : "24Hrs Mode";
  const qtyLabel = r.mode === "restock" ? `\xD7${r.restockQty} Restock` : `\xD7${n25(r.restockQty)} Restock${r.restockQty === 1 ? "" : "s"}`;
  const gemLine = `${gemHtml4(r.gemPerRestock)}`;
  const ratioLine = ratio.free ? `Free gems` : `1${FLOWER_ICON} : ${n25(ratio.gemsPerFlower)}${GEM_ICON}`;
  const shareLine = r.shareCount > 1 ? `<div class="rc-kv rc-kv-wide"><span class="rc-kv-label">Your share of ${r.mode === "restock" ? "1 restock" : "each restock"}</span><span class="rc-kv-val">1/${r.shareCount} = ${flowerHtml4(r.restock)}</span></div>` : "";
  return `<article class="rc-comp-card guro-frame">
    <header class="rc-comp-head"><span class="rc-comp-icon">${getIcon(iconNameOf(r.name))}</span><span class="rc-comp-name">${esc5(r.name)}</span><span class="rc-comp-nodes">${getIcon(iconNameOf(r.name))} ${n25(r.nodes)}</span></header>
    <div class="rc-group"><div class="rc-kv-grid">
      ${kv4("Yield / Node", `${signed5(r.yieldNode, n25)}${getIcon(r.name)}`, "rc-kv-wide")}
      ${kv4("Recovery Time", esc5(formatDuration(r.timeSec)), "rc-kv-wide")}
      ${r.regrowChance > 0 ? kv4("Instant Regrow Chance", `${n25(r.regrowChance * 100)}%`) : ""}
      ${r.regrowChance > 0 ? kv4("Avg Harvests / Node", `\xD7${n25(r.avgHarvests)}`) : ""}
      ${r.regrowChance > 0 ? kv4("Extra Nodes / Cycle", `${signed5(r.extraNodesCycle, n25)}${getIcon(iconNameOf(r.name))}`) : ""}
      ${r.regrowChance > 0 ? kv4("Extra Yield / Cycle", `${signed5(r.extraYieldCycle, n25)}${getIcon(r.name)}`) : ""}
      ${kv4("Tools / Cycle", `${n25(r.toolUse)}${getIcon(r.tool)}`)}
      ${kv4("Yield / Cycle", `${signed5(r.yieldCycle, n25)}${getIcon(r.name)}`)}
      ${kv4("Market Price / Unit", flowerSigned4(r.sell))}
      ${kv4("Gross / Cycle", flowerSigned4(r.grossCycle))}
      ${kv4("Tool Cost / Tool", flowerHtml4(r.toolUnit))}
      ${kv4("Tool Cost / Cycle", flowerHtml4(r.costCycle))}
      ${kv4("Shrine / Cycle", flowerHtml4(r.shrineCycle))}
      ${kv4("Restock / Cycle", flowerHtml4(r.restockCycle))}
      ${kv4("Net / Cycle", `<span class="${r.netCycle >= 0 ? "is-profit" : "is-loss"}">${signed5(r.netCycle, fl4)}${FLOWER_ICON}</span>`, "rc-kv-wide")}
    </div></div>
    <div class="rc-group"><div class="rc-comp-sub">${modeLabel}</div>
    <div class="rc-kv-grid">
      ${kv4("Total Cycle", totalCycleHtml4(r))}
      ${kv4("Tools Used", `${n25(r.toolUses)}${getIcon(r.tool)}`)}
      ${kv4("Total Yield", `${signed5(r.totalYield, n25)}${getIcon(r.name)}`)}
      ${r.regrowChance > 0 ? kv4("Extra Nodes", `${signed5(r.extraNodes, n25)}${getIcon(iconNameOf(r.name))}`) : ""}
      ${r.regrowChance > 0 ? kv4("Extra Yield", `${signed5(r.extraYield, n25)}${getIcon(r.name)}`) : ""}
      ${kv4("Total Gross", flowerSigned4(r.gross))}
      ${kv4("Total Tool Cost", flowerHtml4(r.cost))}
      ${kv4("Total Shrine Cost", flowerHtml4(r.shrine))}
      ${kv4("Total Restock Cost", flowerHtml4(r.restock))}
      ${kv4("Restock Quantity", qtyLabel)}
      ${kv4("Cost / Restock", `${gemLine}<span class="rc-kv-sub">${ratioLine}</span>`)}
      ${kv4("Gems Used", `${gemHtml4(r.restockGems)} = ${flowerHtml4(r.restock)}`, "rc-kv-wide")}
      ${shareLine}
      ${r.feeRate > 0 ? kv4("Market Fee", flowerHtml4(r.fee)) : ""}
      ${kv4("Total Net", `<span class="${r.net >= 0 ? "is-profit" : "is-loss"}">${signed5(r.net, fl4)}${FLOWER_ICON}</span>`, "rc-kv-wide rc-kv-net")}
    </div></div>
    ${appliedBoostHtml4(r)}
    ${nodeTiersHtml(r)}
    ${toolCostConfigHtml2(r)}
    ${materialsHtml(r)}
  </article>`;
}
function computationBodyHtml4() {
  const rows = computeAll4();
  if (!rows.length) return `<div class="rc-empty">No resources selected.</div>`;
  return rows.map(computationCardHtml4).join("");
}
function boostBodyHtml4() {
  if (!state4.selected.length) return `<div class="rc-empty">Select at least one resource to see the boosts that affect it.</div>`;
  const subjects = state4.selected.map((n) => ({
    name: n,
    icon: getIcon(n)
  }));
  const boosts = BOOSTS.filter((b) => b.source !== "skill" && !b.hiddenFromOwnPanel && (b.category === "resources" || b.category === "tools"));
  const appliesTo = (b, s) => {
    if (b.category === "resources") {
      if (b.scope === "resource") return b.target === s.name;
      if (b.scope === "resourceList") return (b.resources || []).includes(s.name);
      if (b.scope === "resourceEffects") return b.resourceEffects ? !!b.resourceEffects[s.name] : false;
      return false;
    }
    return b.category === "tools" && b.scope === "tool" && b.target === resTool(s.name);
  };
  const html = boostsBySubjectHtml({
    subjects,
    boosts,
    appliesTo,
    unit: "nodes",
    noteSkip: /AOE|expected/i,
    allLabel: "Boost for All Selected Resources"
  });
  return `<div class="rc-pop-hint">Boosts that affect ${state4.selected.length > 1 ? "your selected resources" : esc5(state4.selected[0])}. Tap a boost to switch it on or off, then press Save.</div>${html || `<div class="rc-empty">No boosts found.</div>`}`;
}
function nodeKeys() {
  const keys = [];
  state4.selected.forEach((n) => {
    if (isTieredResource(n)) RESOURCE_NODE_TIERS[n].forEach((t) => keys.push({
      key: n + ":" + t.key,
      res: n,
      tier: t.key,
      label: t.label,
      icon: t.displayLabel || t.label
    }));
    else keys.push({
      key: n + ":total",
      res: n,
      tier: null,
      label: n + " Node",
      icon: n
    });
  });
  return keys;
}
function currentNodeValue(k) {
  if (k.tier) {
    const t = getNodeTierCounts(k.res);
    return parseFloat(t && t[k.tier]) || 0;
  }
  return nodeCountOf(k.res);
}
function nodeValue(k) {
  if (nodesDraft4 && Object.prototype.hasOwnProperty.call(nodesDraft4, k.key)) return nodesDraft4[k.key];
  return currentNodeValue(k);
}
function nodesBodyHtml4() {
  const keys = nodeKeys();
  if (!keys.length) return `<div class="rc-empty">Select at least one resource to edit its nodes.</div>`;
  const rows = keys.map((k) => {
    const v = nodeValue(k);
    return `<label class="rc-node-row guro-frame"><span class="rc-node-icon">${getIcon(k.icon)}</span><span class="rc-node-text"><span class="rc-node-name">${esc5(k.label)}</span><span class="rc-node-used">Used by: ${esc5(k.res)}</span></span><input type="number" min="0" step="1" inputmode="numeric" data-rc-node="${esc5(k.key)}" value="${v ? v : ""}" placeholder="0"></label>`;
  }).join("");
  return `<div class="rc-pop-hint">Enter how many nodes of each type you have, then press Save.</div>${rows}`;
}
function popupTitle4() {
  if (popup4 === "skills") return "Resource Skills";
  if (popup4 === "boost") return "Resource Boosts";
  if (popup4 === "nodes") return "Resource Nodes";
  return "Computation";
}
function skillTabsHtml() {
  return `<div class="rc-modes" role="group" aria-label="Skill tree">${[["trees", "Trees"], ["mining", "Mining"]].map((t) => `<button type="button" class="rc-mode guro-frame${skillTab === t[0] ? " is-on" : ""}" data-rc-skilltab="${t[0]}" aria-pressed="${skillTab === t[0] ? "true" : "false"}">${t[1]}</button>`).join("")}</div>`;
}
function popupBodyHtml4() {
  if (popup4 === "boost") return boostBodyHtml4();
  if (popup4 === "nodes") return nodesBodyHtml4();
  if (popup4 === "computation") return computationBodyHtml4();
  return `${skillTabsHtml()}<div class="rc-pop-hint">Trees and Mining skills from the Skill Tree. Changes here also change the Skill Tree. Press Save to apply them.</div><div id="rcSkillSlot"></div>`;
}
function borrow4(id, slotId) {
  const el = document.getElementById(id);
  const slot = document.getElementById(slotId);
  if (!el || !slot) return;
  const parent = el.parentNode;
  const next = el.nextSibling;
  slot.appendChild(el);
  restoreFns4.push(() => {
    if (!parent) return;
    if (next && next.parentNode === parent) parent.insertBefore(el, next);
    else parent.appendChild(el);
  });
}
function releaseBorrowed4() {
  while (restoreFns4.length) restoreFns4.pop()();
}
var savedSkillCategory4 = null;
function setupBorrowed4() {
  if (popup4 === "skills") {
    savedSkillCategory4 = skillCategory;
    skillTab = state4.selected.length && state4.selected.every((n) => n === "Wood") ? "trees" : "mining";
    setSkillCategory(skillTab);
    borrow4("ascensionBar", "rcAscSlot");
    borrow4("skillListWrap", "rcSkillSlot");
    borrow4("skillSaveBar", "rcSaveSlot");
    renderSkillPanel();
    renderAscensionBar();
    updateSkillSaveBarState();
    refreshSkillTabs();
  } else if (popup4 === "boost") {
    borrow4("skillSaveBar", "rcSaveSlot");
    updateSkillSaveBarState();
  }
}
function refreshSkillTabs() {
  if (!overlayEl4) return;
  overlayEl4.querySelectorAll("[data-rc-skilltab]").forEach((b) => {
    const on = b.getAttribute("data-rc-skilltab") === skillTab;
    b.classList.toggle("is-on", on);
    b.setAttribute("aria-pressed", on ? "true" : "false");
  });
}
function switchSkillTab(id) {
  if (id === skillTab) return;
  skillTab = id;
  setSkillCategory(id);
  renderSkillPanel();
  refreshSkillTabs();
}
function teardownBorrowed4() {
  releaseBorrowed4();
  if (savedSkillCategory4 != null) {
    setSkillCategory(savedSkillCategory4);
    savedSkillCategory4 = null;
    renderSkillPanel();
  }
}
function footerHtml4() {
  if (popup4 === "nodes") return `<button type="button" class="rc-save guro-frame" id="rcNodesSave">Save Changes</button>`;
  if (popup4 === "skills" || popup4 === "boost") return `<div id="rcSaveSlot"></div>`;
  return "";
}
function overlayHtml4() {
  return `<div class="rc-pop guro-frame${popup4 === "computation" ? " rc-pop-comp" : ""}" role="dialog" aria-modal="true" aria-label="${popupTitle4()}">
    <div class="rc-pop-head"><span class="rc-pop-title">${popupTitle4()}</span><button type="button" class="rc-pop-close" data-rc-close aria-label="Close">\u2715</button></div>
    <div class="rc-pop-body" id="rcPopBody">${popupBodyHtml4()}</div>
    <div class="rc-pop-foot">${footerHtml4()}</div>
  </div>`;
}
function renderOverlayBody4() {
  if (!overlayEl4) return;
  const body = overlayEl4.querySelector("#rcPopBody");
  if (!body) return;
  if (popup4 === "skills") return;
  const top = body.scrollTop;
  body.innerHTML = popupBodyHtml4();
  body.scrollTop = top;
  updateSkillSaveBarState();
}
function isPopupDirty4() {
  if (popup4 === "skills" || popup4 === "boost") return isSkillDraftDirty() || isBoostDraftDirty();
  if (popup4 === "nodes") return !!nodesDraft4 && nodeKeys().some((k) => Object.prototype.hasOwnProperty.call(nodesDraft4, k.key) && Number(nodesDraft4[k.key]) !== currentNodeValue(k));
  return false;
}
function openPopup4(kind) {
  if (popup4) return;
  popup4 = kind;
  nodesDraft4 = null;
  overlayEl4 = document.createElement("div");
  overlayEl4.className = "rc-overlay";
  overlayEl4.innerHTML = overlayHtml4();
  document.body.appendChild(overlayEl4);
  document.body.classList.add("rc-no-scroll");
  const slot = overlayEl4.querySelector("#rcSkillSlot");
  if (kind === "skills" && slot) {
    const asc = document.createElement("div");
    asc.id = "rcAscSlot";
    slot.parentNode.insertBefore(asc, slot);
  }
  setupBorrowed4();
}
function destroyPopup4() {
  teardownBorrowed4();
  if (overlayEl4) overlayEl4.remove();
  overlayEl4 = null;
  popup4 = null;
  nodesDraft4 = null;
  document.body.classList.remove("rc-no-scroll");
}
function closePopup4(force) {
  if (!popup4) return;
  if (!force && isPopupDirty4()) {
    showPrompt4("You have unsaved changes. Save them first, or discard them to close.", [{
      label: "Keep Editing"
    }, {
      label: "Discard",
      run: () => {
        discardSkillBoostDrafts();
        destroyPopup4();
        refreshResults4();
      }
    }]);
    return;
  }
  const wasComputation = popup4 === "computation";
  destroyPopup4();
  if (!wasComputation) refreshResults4();
}
function showPrompt4(message, buttons) {
  if (promptEl4) promptEl4.remove();
  promptEl4 = document.createElement("div");
  promptEl4.className = "rc-overlay rc-overlay-top";
  promptEl4.innerHTML = `<div class="rc-prompt guro-frame" role="alertdialog" aria-modal="true"><p class="rc-prompt-text">${esc5(message)}</p><div class="rc-prompt-actions">${buttons.map((b, i) => `<button type="button" class="rc-prompt-btn guro-frame" data-rc-prompt="${i}">${esc5(b.label)}</button>`).join("")}</div></div>`;
  promptEl4.addEventListener("click", (e) => {
    const btn = e.target.closest("[data-rc-prompt]");
    if (!btn) return;
    const b = buttons[Number(btn.getAttribute("data-rc-prompt"))];
    promptEl4.remove();
    promptEl4 = null;
    if (b && b.run) b.run();
  });
  document.body.appendChild(promptEl4);
  const first = promptEl4.querySelector("button");
  if (first) first.focus();
}
function closeCycleEditor4() {
  if (promptEl4) promptEl4.remove();
  promptEl4 = null;
}
function openCycleEditor4(name) {
  if (promptEl4) promptEl4.remove();
  const fig = figOf(name);
  const current = state4.cycles[name] > 0 ? state4.cycles[name] : "";
  const fallback = fig && fig.timeSec > 0 ? Math.round(86400 / fig.timeSec) : 0;
  promptEl4 = document.createElement("div");
  promptEl4.className = "rc-overlay rc-overlay-top";
  promptEl4.innerHTML = `<div class="rc-prompt rc-cycle-edit guro-frame" role="dialog" aria-modal="true" aria-label="Editing Cycle"><div class="rc-cycle-edit-label">Editing Cycle</div><div class="rc-cycle-edit-row"><input type="number" min="0" max="${MAX_CUSTOM_CYCLES4}" step="1" inputmode="numeric" class="rc-cycle-input guro-frame" data-rc-cycle-input value="${current}" placeholder="${fallback}" aria-label="Cycle count"><button type="button" class="rc-prompt-btn guro-frame" data-rc-cycle-save>Save</button></div></div>`;
  promptEl4.addEventListener("click", (e) => {
    if (e.target === promptEl4) {
      closeCycleEditor4();
      return;
    }
    if (e.target.closest("[data-rc-cycle-save]")) saveCycleEdit4(name);
  });
  promptEl4.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      saveCycleEdit4(name);
    }
  });
  document.body.appendChild(promptEl4);
  const input = promptEl4.querySelector("[data-rc-cycle-input]");
  if (input) {
    input.focus();
    input.select();
  }
}
function saveCycleEdit4(name) {
  if (!promptEl4) return;
  const input = promptEl4.querySelector("[data-rc-cycle-input]");
  const btn = promptEl4.querySelector("[data-rc-cycle-save]");
  if (!input || btn && btn.disabled) return;
  const value = input.value === "" ? 0 : Math.floor(Number(input.value));
  if (btn) btn.disabled = true;
  input.disabled = true;
  const chip = document.createElement("div");
  chip.className = "bg-sim-saving guro-frame";
  chip.innerHTML = `<span class="bg-sim-spin"></span><span class="bg-sim-saving-text">Saving...</span>`;
  document.body.appendChild(chip);
  setTimeout(() => {
    if (isFinite(value) && value > 0) state4.cycles[name] = Math.min(value, MAX_CUSTOM_CYCLES4);
    else delete state4.cycles[name];
    saveState4();
    closeCycleEditor4();
    refreshResults4();
    chip.classList.add("is-done");
    chip.innerHTML = `<span class="bg-sim-tick">\u2713</span><span class="bg-sim-saving-text">Saved</span>`;
    setTimeout(() => chip.remove(), 900);
  }, 700);
}
function saveNodes4() {
  const draft = nodesDraft4 || {};
  nodeKeys().forEach((k) => {
    if (!Object.prototype.hasOwnProperty.call(draft, k.key)) return;
    const v = Math.max(0, Math.floor(Number(draft[k.key]) || 0));
    if (k.tier) setNodeTierQty(k.res, k.tier, v);
    else setNodeCount(k.res, v);
  });
  invalidateCostCache();
  renderLibraryLists();
  renderBoostPanel();
  updateCalcSummary();
  nodesDraft4 = null;
  toast("\u2705 Resource nodes saved");
  renderOverlayBody4();
  refreshResults4();
}
function toggleCrop4(name, input) {
  const idx = state4.selected.indexOf(name);
  if (idx >= 0) state4.selected.splice(idx, 1);
  else state4.selected.push(name);
  saveState4();
  const label = input ? input.closest(".rc-crop") : null;
  if (label) label.classList.toggle("is-on", state4.selected.includes(name));
  refreshResults4();
}
function setMode4(id) {
  if (id === state4.mode) return;
  state4.mode = id;
  saveState4();
  refreshResults4();
}
function onClick4(e) {
  const details = e.target.closest("[data-rc-details]");
  if (details) {
    detailsOpen4 = !detailsOpen4;
    refreshResults4();
    return;
  }
  const mode = e.target.closest("[data-rc-mode]");
  if (mode) {
    setMode4(mode.getAttribute("data-rc-mode"));
    return;
  }
  const open = e.target.closest("[data-rc-open]");
  if (open && !open.disabled) openPopup4(open.getAttribute("data-rc-open"));
}
function onChange4(e) {
  const t = e.target;
  if (t && t.dataset && t.dataset.rcCrop != null) toggleCrop4(t.dataset.rcCrop, t);
}
function onDocClick4(e) {
  if (!overlayEl4) return;
  if (promptEl4 && promptEl4.contains(e.target)) return;
  if (e.target === overlayEl4 || e.target.closest("[data-rc-close]")) {
    closePopup4(false);
    return;
  }
  if (!overlayEl4.contains(e.target)) return;
  if (e.target.closest("#rcNodesSave")) {
    saveNodes4();
    return;
  }
  const editCycle = e.target.closest("[data-rc-edit-cycle]");
  if (editCycle && popup4 === "computation") {
    openCycleEditor4(editCycle.getAttribute("data-rc-edit-cycle"));
    return;
  }
  const tab = e.target.closest("[data-rc-skilltab]");
  if (tab && popup4 === "skills") {
    switchSkillTab(tab.getAttribute("data-rc-skilltab"));
    return;
  }
  const matBtn = e.target.closest("[data-rc-mat]");
  if (matBtn && popup4 === "computation") {
    setMaterialMode(matBtn.getAttribute("data-rc-res"), matBtn.getAttribute("data-rc-mat"), matBtn.getAttribute("data-rc-mode"));
    invalidateCostCache();
    renderOverlayBody4();
    refreshResults4();
    return;
  }
  const row = e.target.closest("[data-boost-id]");
  if (row && popup4 === "boost" && overlayEl4.contains(row)) {
    draftToggleBoost(row.getAttribute("data-boost-id"));
    renderOverlayBody4();
  }
}
function onDocInput4(e) {
  const t = e.target;
  if (t && t.dataset && t.dataset.rcNode != null) {
    nodesDraft4 = nodesDraft4 || {};
    nodesDraft4[t.dataset.rcNode] = t.value === "" ? 0 : Number(t.value);
  }
}
function onKey4(e) {
  if (e.key !== "Escape") return;
  if (promptEl4) {
    promptEl4.remove();
    promptEl4 = null;
    return;
  }
  if (popup4) closePopup4(false);
}
function onBoostsChanged4() {
  if (!host4) return;
  invalidateCostCache();
  if (popup4 === "boost") renderOverlayBody4();
  refreshResults4();
}
function onExternalChange4() {
  if (!host4) return;
  refreshResults4();
}
function mountResourcesCalculator(root, appApi) {
  host4 = root;
  api4 = appApi;
  invalidateCostCache();
  state4 = loadState4();
  detailsOpen4 = false;
  syncGemRatio4();
  host4.addEventListener("click", onClick4);
  host4.addEventListener("change", onChange4);
  document.addEventListener("click", onDocClick4);
  document.addEventListener("input", onDocInput4);
  document.addEventListener("keydown", onKey4);
  window.addEventListener("guroBoostsChanged", onBoostsChanged4);
  window.addEventListener("guroGemPackChanged", onExternalChange4);
  window.addEventListener("guroPricesUpdated", onExternalChange4);
  listening4 = true;
  render4();
}
function unmountResourcesCalculator() {
  setAutoMaterialModes({});
  invalidateCostCache();
  if (popup4) destroyPopup4();
  if (promptEl4) {
    promptEl4.remove();
    promptEl4 = null;
  }
  if (host4) {
    host4.removeEventListener("click", onClick4);
    host4.removeEventListener("change", onChange4);
    host4.innerHTML = "";
  }
  if (listening4) {
    document.removeEventListener("click", onDocClick4);
    document.removeEventListener("input", onDocInput4);
    document.removeEventListener("keydown", onKey4);
    window.removeEventListener("guroBoostsChanged", onBoostsChanged4);
    window.removeEventListener("guroGemPackChanged", onExternalChange4);
    window.removeEventListener("guroPricesUpdated", onExternalChange4);
    listening4 = false;
  }
  host4 = null;
  api4 = null;
}
function resourcesCalculatorCanLeave() {
  if (!popup4) return true;
  if (isPopupDirty4()) {
    toast("\u26A0\uFE0F Save your changes first");
    return false;
  }
  destroyPopup4();
  return true;
}

// src/rescalc_honey.js
var MAX_ROWS = 40;
var host5 = null;
var popup5 = null;
var overlayEl5 = null;
var promptEl5 = null;
var restoreFns5 = [];
var hivesDraft = null;
var listening5 = false;
var detailsOpen5 = false;
var openMenu = null;
var savedSkillCategory5 = null;
function esc6(s) {
  return escapeHtml(String(s));
}
function n26(n) {
  if (!isFinite(n)) return "\u2014";
  return n.toLocaleString(void 0, {
    minimumFractionDigits: 0,
    maximumFractionDigits: 2
  });
}
function fl5(n) {
  if (!isFinite(n)) return "\u2014";
  const a = Math.abs(n);
  const max = a >= 1e3 ? 0 : a >= 1 ? 2 : 4;
  return n.toLocaleString(void 0, {
    minimumFractionDigits: 0,
    maximumFractionDigits: max
  });
}
function signed6(n, f) {
  const r = f(Math.abs(n));
  if (n > 0 && r !== "0") return "+" + r;
  if (n < 0 && r !== "0") return "-" + r;
  return r;
}
function flowerHtml5(n) {
  return `${fl5(n)}${FLOWER_ICON}`;
}
function flowerNameIcon(name) {
  const v = FLOWER_VARIETIES[name];
  if (IMAGE_ICONS[name]) return getIcon(name);
  return `<span class="rc-dd-emoji">${v ? v.icon : ""}</span>`;
}
function swarmIcon() {
  return `<img src="${BEE_SWARM_ICON}" alt="Bee Swarm">`;
}
function syncGemRatio5() {
  try {
    const want = currentRatio();
    const fpg = flowerPerGem();
    const have = fpg > 0 ? 1 / fpg : 0;
    const same = want.free ? !(fpg > 0) : Math.abs(want.gems - have) < 1e-6;
    if (!same) applySelection();
  } catch (e) {
  }
}
function getEcon() {
  syncGemRatio5();
  loadBaseHoneyIfNeeded();
  return computeHiveEconomics();
}
function totalsOf5(e) {
  const s = getActiveShrineDailyCost(e.hiveStats.activeBoosts, e.flowerStats.activeBoosts);
  const gross = e.grossRevenuePerHiveDay * e.hives;
  const fee = gross - e.revenuePerHiveDay * e.hives;
  const restock = e.flowerRestockCost * e.hives;
  const cost = e.totalCostDay - restock;
  const net = gross - fee - cost - restock - s.total;
  return {
    gross,
    fee,
    cost,
    restock,
    shrine: s.total,
    shrines: s.shrines,
    net,
    honey: e.hiveStats.honeyPerHiveDay * e.hives,
    honeyGross: e.grossRevenuePerHiveDay * e.hives,
    flowers: e.replantsPerDay * e.flowerStats.expectedYield * e.hives
  };
}
function ddButtonHtml(kind, icon, label) {
  return `<button type="button" class="rc-dd-btn guro-frame" data-rc-dd-toggle="${kind}" aria-haspopup="listbox" aria-expanded="${openMenu === kind ? "true" : "false"}"><span class="rc-dd-icon">${icon}</span><span class="rc-dd-label">${esc6(label)}</span><span class="rc-dd-chev">\u25BE</span></button>`;
}
function flowerMenuHtml(kind) {
  const options = Object.keys(FLOWER_VARIETIES).map((n) => {
    const locked = isFlowerVarietySeasonLocked(n);
    const on = n === selectedHoneyFlower;
    return `<div class="rc-dd-opt${on ? " is-on" : ""}${locked ? " is-locked" : ""}" role="option" tabindex="0" aria-selected="${on ? "true" : "false"}" data-rc-dd-pick="${kind}" data-rc-value="${esc6(n)}"><span class="rc-dd-icon">${flowerNameIcon(n)}</span><span class="rc-dd-label">${esc6(n)}</span>${locked ? `<span class="rc-dd-lock">\u{1F512}</span>` : ""}</div>`;
  }).join("");
  return `<div class="rc-dd-menu guro-frame" role="listbox">${options}</div>`;
}
function cropMenuHtml() {
  const options = Object.keys(BASE_CROPS).map((n) => {
    const on = n === selectedSwarmCrop;
    return `<div class="rc-dd-opt${on ? " is-on" : ""}" role="option" tabindex="0" aria-selected="${on ? "true" : "false"}" data-rc-dd-pick="crop" data-rc-value="${esc6(n)}"><span class="rc-dd-icon">${getIcon(n)}</span><span class="rc-dd-label">${esc6(n)}</span></div>`;
  }).join("");
  return `<div class="rc-dd-menu guro-frame" role="listbox">${options}</div>`;
}
function flowerPickerHtml(kind) {
  const name = selectedHoneyFlower;
  return `<div class="rc-dd" data-rc-dd="${kind}">${ddButtonHtml(kind, flowerNameIcon(name), name)}${openMenu === kind ? flowerMenuHtml(kind) : ""}</div>`;
}
function cropPickerHtml() {
  const name = selectedSwarmCrop;
  return `<div class="rc-dd rc-dd-inline" data-rc-dd="crop">${ddButtonHtml("crop", getIcon(name), name)}${openMenu === "crop" ? cropMenuHtml() : ""}</div>`;
}
function pickerHtml5() {
  return `<section class="rc-block guro-frame" aria-label="Honey Calculator">
    <div class="rc-block-title">Honey Calculator</div>
    <div class="rc-field">
      <div class="rc-field-label">Flower</div>
      ${flowerPickerHtml("flower")}
    </div>
    <div class="rc-note">Beehives only collect honey while a flower is growing next to them, so pick the flower you plant. Its seed cost, growth time and restock cost are part of the result.</div>
  </section>`;
}
function tileHtml(icon, yieldText, netHtml, good, key) {
  return `<div class="rc-tile guro-frame ${good ? "is-profit" : "is-loss"}" data-rc-tile="${key}"><span class="rc-tile-icon">${icon}</span><span class="rc-tile-yield">${yieldText}</span><span class="rc-tile-net">${netHtml}</span></div>`;
}
function tilesHtml5(e, t) {
  if (!(e.hives > 0)) return `<div class="rc-empty">You have 0 hives. Open Hives above and enter your hive count.</div>`;
  const honeyTile = tileHtml(getIcon("Honey"), signed6(t.honey, n26), `${fl5(t.honeyGross)}${FLOWER_ICON}`, true, "honey");
  const flowerTile = tileHtml(flowerNameIcon(selectedHoneyFlower), signed6(t.flowers, n26), `-${fl5(t.cost + t.restock)}${FLOWER_ICON}`, false, "flower");
  return `<div class="rc-tiles">${honeyTile}${flowerTile}</div>`;
}
function valueBoxHtml5(label, html, extra) {
  return `<div class="rc-val guro-frame${extra ? " " + extra : ""}"><span class="rc-val-label">${label}</span><span class="rc-val-num">${html}</span></div>`;
}
function valuesHtml5(t) {
  const feeBox = (feePercent || 0) > 0 ? valueBoxHtml5("Market Fee", flowerHtml5(t.fee)) : "";
  return `<div class="rc-values">
    ${valueBoxHtml5("Gross", flowerHtml5(t.gross))}
    ${valueBoxHtml5("Flower Cost", flowerHtml5(t.cost))}
    ${valueBoxHtml5("Shrine Cost", flowerHtml5(t.shrine))}
    ${valueBoxHtml5("Restock Cost", flowerHtml5(t.restock))}
    ${feeBox}
  </div>
  <div class="rc-net-row">
    ${valueBoxHtml5("Net", `<span class="${t.net >= 0 ? "is-profit" : "is-loss"}">${signed6(t.net, fl5)}${FLOWER_ICON}</span>`, "rc-val-net")}
    <button type="button" class="rc-linktext" data-rc-open="computation">Computation</button>
  </div>`;
}
function modeNoteHtml5(e) {
  const warn = !(e.hives > 0) ? `<div class="rc-note is-warn">You have 0 hives, so every result is 0. Open Hives above and enter your hive count.</div>` : "";
  const text = "24Hrs: every hive is full of honey once a day (more often with speed boosts), the flower is replanted all day and every restock needed is paid for.";
  return `<div class="rc-details-row"><button type="button" class="rc-linktext" data-rc-details aria-expanded="${detailsOpen5 ? "true" : "false"}">Details</button></div>${detailsOpen5 ? `<div class="rc-note">${text}</div>` : ""}${warn}`;
}
function resultsHtml5() {
  const e = getEcon();
  const t = totalsOf5(e);
  return `<section class="rc-block guro-frame" aria-label="Honey results">
    <div class="rc-tools">
      <button type="button" class="rc-tool guro-frame" data-rc-open="skills">Skills</button>
      <button type="button" class="rc-tool guro-frame" data-rc-open="boost">Boost</button>
      <button type="button" class="rc-tool guro-frame" data-rc-open="hives">Hives</button>
    </div>
    ${modeNoteHtml5(e)}
    <div id="rcResults">${tilesHtml5(e, t)}${valuesHtml5(t)}</div>
  </section>`;
}
function render5() {
  if (!host5) return;
  const scroller = document.scrollingElement;
  const y = scroller ? scroller.scrollTop : 0;
  host5.innerHTML = pickerHtml5() + resultsHtml5();
  if (scroller) scroller.scrollTop = y;
}
function refreshResults5() {
  if (!host5) return;
  const blocks = host5.querySelectorAll(".rc-block");
  if (blocks.length < 2) {
    render5();
    return;
  }
  const tmp = document.createElement("div");
  tmp.innerHTML = resultsHtml5();
  blocks[1].replaceWith(tmp.firstElementChild);
  if (popup5 === "computation") renderOverlayBody5();
}
function refreshAll() {
  render5();
  if (popup5 === "computation") renderOverlayBody5();
}
function kv5(label, html, cls) {
  return `<div class="rc-kv${cls ? " " + cls : ""}"><span class="rc-kv-label">${label}</span><span class="rc-kv-val">${html}</span></div>`;
}
function effectText(b) {
  const parts = [];
  if (b.speedAdd) parts.push(`${b.speedAdd > 0 ? "+" : ""}${n26(b.speedAdd)} speed`);
  if (b.honeyYieldAdd) parts.push(`${b.honeyYieldAdd > 0 ? "+" : ""}${n26(b.honeyYieldAdd)} honey`);
  if (b.swarmChanceAdd) parts.push(`+${n26(b.swarmChanceAdd * 100)}% swarm chance`);
  if (b.swarmChanceMult) parts.push(`\xD7${b.swarmChanceMult} swarm chance`);
  if (b.flowerTimeMult) parts.push(`\xD7${b.flowerTimeMult} flower time`);
  if (b.flowerExtraChance) parts.push(`+${n26(b.flowerExtraChance)} flowers`);
  if (b.flowerExtraFlat) parts.push(`+${n26(b.flowerExtraFlat)} flowers`);
  return parts.join(", ");
}
function boostRowsHtml(list) {
  return list.map((b) => `<div class="rc-boost-row">${getBoostIconAnyFallback(b.name)}<span class="rc-boost-name">${esc6(b.name)}</span><span class="rc-boost-eff">${esc6(effectText(b))}</span></div>`).join("");
}
function appliedBoostHtml5(e) {
  const hive = e.hiveStats.activeBoosts.filter((b) => effectText(b));
  const flower = e.flowerStats.activeBoosts.filter((b) => effectText(b));
  const section = (label, items) => items.length ? `<div class="rc-boost-group"><div class="rc-boost-label">${label}</div>${boostRowsHtml(items)}</div>` : "";
  const body = section("Hive Boost", hive) + section("Flower Boost", flower);
  return `<div class="rc-group"><div class="rc-comp-sub">Applied Boost</div>${body || `<div class="rc-boost-none">No boost applied</div>`}</div>`;
}
function swarmTableHtml(e) {
  let rows = e.swarmDistribution;
  let note = "";
  if (rows.length > MAX_ROWS) {
    const shown = rows.filter((r) => r.chance * 100 >= 0.01);
    note = `<div class="rc-boost-none">Showing the ${shown.length} most likely outcomes out of ${rows.length}.</div>`;
    rows = shown;
  }
  const cropIcon = getIcon(selectedSwarmCrop);
  const plus = (v) => {
    const r = (Math.round(v * 100) / 100).toLocaleString(void 0, {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    });
    return v > 0 ? "+" + r : r;
  };
  const body = rows.map((r) => `<tr><td class="rc-sw-k">${r.k}</td><td>${(r.chance * 100).toFixed(2)}%</td><td>${plus(r.bonusCropYield)}${cropIcon}</td><td class="rc-sw-val">${plus(r.flowerValue)}${FLOWER_ICON}</td></tr>`).join("");
  return `<div class="rc-comp-sub">\u{1F3B2} Swarm Distribution (today, ${fmt(e.swarmTrialsPerDay)} rolls across ${fmt(e.hives)} hives)</div>
    <div class="rc-sw-wrap"><table class="rc-sw-grid"><thead><tr><th>Swarms</th><th>Chance</th><th>Crop Yield</th><th>Value</th></tr></thead><tbody>${body}</tbody></table></div>${note}`;
}
function swarmBonusHtml(e) {
  const crop = esc6(selectedSwarmCrop);
  const pollen = isSkillActive("skill_pollen_power_up") ? " (0.2 base + Pollen Power Up)" : "";
  return `<div class="rc-group rc-swarm">
    <div class="rc-swarm-head"><span class="rc-swarm-icon">${swarmIcon()}</span><span class="rc-swarm-title">Bee Swarm bonus</span></div>
    <div class="rc-swarm-pick"><span class="rc-swarm-valued">valued vs</span>${cropPickerHtml()}<span class="rc-swarm-valued">, ${fmt(getPlotCount())} plots</span></div>
    <div class="rc-line">${fmt(e.expectedSwarmsPerHiveDay)} expected swarms/hive/day \xD7 +${fmt(e.swarmYieldPerSwarm)} yield${pollen} \u2192 +${fmt(e.bonusCropValuePerPlotPerHiveDay)}${FLOWER_ICON} FLOWER/plot/hive/day</div>
    <div class="rc-line">\xD7 ${fmt(e.cropPlots)} plots \u2192 <b>+${fmt(e.bonusCropYieldPerHiveDay)} ${crop}/hive/day</b> from swarms <span class="rc-kv-sub">(the extra crops themselves, before pricing)</span></div>
    <div class="rc-line">\xD7 ${fmt(e.cropSellFlower)}${FLOWER_ICON} FLOWER/${crop} \u2192 <b>+${fmt(e.bonusCropValuePerHiveDay)}${FLOWER_ICON} FLOWER/hive/day total</b></div>
    ${swarmTableHtml(e)}
  </div>`;
}
function calculatorCardHtml(e) {
  const feeNote = feePercent > 0 ? `<span class="rc-kv-sub">(${fmt(e.netHoneySell)}${FLOWER_ICON} after ${feePercent}% fee)</span>` : "";
  const formula = e.flowerStats.expectedYield > 1 ? `<span class="rc-kv-sub">(${fmt(e.flowerCostFlower)}${FLOWER_ICON} \xF7 ${fmt(e.flowerStats.expectedYield)} expected flowers/cycle = ${fmt(e.costPerFlower)}${FLOWER_ICON}/flower)</span>` : "";
  return `<article class="rc-comp-card guro-frame">
    <header class="rc-comp-head"><span class="rc-comp-icon">${getIcon("Honey")}</span><span class="rc-comp-name">Honey Calculator</span><span class="rc-comp-nodes">${getIcon("Beehive")} ${n26(e.hives)}</span></header>
    <div class="rc-group"><div class="rc-kv-grid">
      ${kv5("Honey Speed", fmt(e.hiveStats.speed))}
      ${kv5("Time To Full Hive", esc6(formatDuration(e.hiveStats.timeToFullSec)))}
      ${kv5("Honey / Hive / Day", fmt(e.hiveStats.honeyPerHiveDay))}
      ${kv5("Swarm Chance / Fill", `${(e.hiveStats.swarmChance * 100).toFixed(2)}%`)}
    </div></div>
    ${appliedBoostHtml5(e)}
    <div class="rc-group"><div class="rc-comp-sub">Active Flower</div>
      ${flowerPickerHtml("popflower")}
      <div class="rc-kv-grid">
        ${kv5("Replants / Day", fmt(e.replantsPerDay))}
        ${kv5("Average Yield", `${fmt(e.flowerStats.expectedYield)} <span class="rc-kv-sub">flowers/cycle</span>`)}
        ${kv5("Cost / Hive / Day", `${fmt(e.costPerHiveDay)}${FLOWER_ICON}${formula}`, "rc-kv-wide")}
        ${kv5("Seed Restock Cost / Hive / Day", `${e.flowerRestockCost > 0 ? "+" + fmt(e.flowerRestockCost) : "0"}${FLOWER_ICON}`, "rc-kv-wide")}
      </div>
    </div>
    <div class="rc-group"><div class="rc-comp-sub">Honey Sell Price</div>
      <div class="rc-kv-grid">
        ${kv5("Honey Sell Price", `${fmt(e.honeySellFlower)}${FLOWER_ICON}${feeNote}`, "rc-kv-wide")}
        ${kv5("Revenue / Hive / Day", `${fmt(e.hiveStats.honeyPerHiveDay * e.netHoneySell)}${FLOWER_ICON}`, "rc-kv-wide")}
      </div>
    </div>
    ${swarmBonusHtml(e)}
  </article>`;
}
function profitCardHtml(e, t) {
  const perHive = e.hives > 0 ? t.net / e.hives : 0;
  const shrineNames = t.shrines.length ? `<span class="rc-kv-sub">${esc6(t.shrines.map((s) => s.name).join(", "))}</span>` : "";
  return `<article class="rc-comp-card guro-frame">
    <header class="rc-comp-head"><span class="rc-comp-icon">${getIcon("Honey")}</span><span class="rc-comp-name">Honey 24hr Profitability</span><span class="rc-comp-nodes">${getIcon("Beehive")} ${n26(e.hives)}</span></header>
    <div class="rc-group"><div class="rc-comp-sub">24Hrs Profit / Loss \u2014 ${fmt(e.hives)} hives</div>
    <div class="rc-kv-grid">
      ${kv5("Total Honey", `${signed6(t.honey, n26)}${getIcon("Honey")}`)}
      ${kv5("Total Gross", `${signed6(t.gross, fl5)}${FLOWER_ICON}`)}
      ${kv5("Flower Cost", flowerHtml5(t.cost))}
      ${kv5("Seed Restock Cost", flowerHtml5(t.restock))}
      ${kv5("Shrine Cost", `${flowerHtml5(t.shrine)}${shrineNames}`)}
      ${feePercent > 0 ? kv5("Market Fee", flowerHtml5(t.fee)) : ""}
      ${kv5("Profit / Hive / Day", `<span class="${perHive >= 0 ? "is-profit" : "is-loss"}">${signed6(perHive, fl5)}${FLOWER_ICON}</span>`, "rc-kv-wide")}
      ${kv5(`Total / ${fmt(e.hives)} Hives / Day`, `<span class="${t.net >= 0 ? "is-profit" : "is-loss"}">${signed6(t.net, fl5)}${FLOWER_ICON}</span>`, "rc-kv-wide rc-kv-net")}
    </div></div>
  </article>`;
}
function computationBodyHtml5() {
  const e = getEcon();
  const t = totalsOf5(e);
  return calculatorCardHtml(e) + profitCardHtml(e, t);
}
function boostBodyHtml5() {
  const flower = selectedHoneyFlower;
  const subjects = [{
    name: "Hives",
    icon: getIcon("Beehive")
  }, {
    name: flower,
    icon: flowerNameIcon(flower)
  }];
  const boosts = BOOSTS.filter((b) => b.category === "honey" && b.source !== "skill" && !b.hiddenFromOwnPanel);
  const appliesTo = (b, s) => {
    if (s.name === "Hives") return b.scope === "hiveGlobal";
    if (b.scope === "flowerGlobal") return true;
    return b.scope === "flower" && (b.target || "").toLowerCase() === flower.toLowerCase();
  };
  const html = boostsBySubjectHtml({
    subjects,
    boosts,
    appliesTo,
    unit: "plots",
    noteSkip: /./,
    allLabel: "Boost for All"
  });
  return `<div class="rc-pop-hint">Boosts that affect your hives and ${esc6(flower)}. Tap a boost to switch it on or off, then press Save.</div>${html || `<div class="rc-empty">No boosts found.</div>`}`;
}
function hivesBodyHtml() {
  const value = hivesDraft == null ? getHiveCount() : hivesDraft;
  return `<div class="rc-pop-hint">Every hive uses the same flower and the same boosts. Change your hive count here, then press Save.</div>
  <label class="rc-node-row guro-frame"><span class="rc-node-icon">${getIcon("Beehive")}</span><span class="rc-node-text"><span class="rc-node-name">Beehive</span><span class="rc-node-used">Used by: Honey, Bee Swarm</span></span><input type="number" min="0" step="1" inputmode="numeric" data-rc-hives value="${value ? value : ""}" placeholder="0"></label>`;
}
function popupTitle5() {
  if (popup5 === "skills") return "Honey Skills";
  if (popup5 === "boost") return "Honey Boosts";
  if (popup5 === "hives") return "Hives";
  return "Computation";
}
function popupBodyHtml5() {
  if (popup5 === "boost") return boostBodyHtml5();
  if (popup5 === "hives") return hivesBodyHtml();
  if (popup5 === "computation") return computationBodyHtml5();
  return `<div class="rc-pop-hint">Bees and Flowers skills from the Skill Tree. Changes here also change the Skill Tree. Press Save to apply them.</div><div id="rcSkillSlot"></div>`;
}
function borrow5(id, slotId) {
  const el = document.getElementById(id);
  const slot = document.getElementById(slotId);
  if (!el || !slot) return;
  const parent = el.parentNode;
  const next = el.nextSibling;
  slot.appendChild(el);
  restoreFns5.push(() => {
    if (!parent) return;
    if (next && next.parentNode === parent) parent.insertBefore(el, next);
    else parent.appendChild(el);
  });
}
function releaseBorrowed5() {
  while (restoreFns5.length) restoreFns5.pop()();
}
function setupBorrowed5() {
  if (popup5 === "skills") {
    savedSkillCategory5 = skillCategory;
    setSkillCategory("bees");
    borrow5("ascensionBar", "rcAscSlot");
    borrow5("skillListWrap", "rcSkillSlot");
    borrow5("skillSaveBar", "rcSaveSlot");
    renderSkillPanel();
    renderAscensionBar();
    updateSkillSaveBarState();
  } else if (popup5 === "boost") {
    borrow5("skillSaveBar", "rcSaveSlot");
    updateSkillSaveBarState();
  }
}
function teardownBorrowed5() {
  releaseBorrowed5();
  if (savedSkillCategory5 != null) {
    setSkillCategory(savedSkillCategory5);
    savedSkillCategory5 = null;
    renderSkillPanel();
  }
}
function footerHtml5() {
  if (popup5 === "hives") return `<button type="button" class="rc-save guro-frame" id="rcNodesSave">Save Changes</button>`;
  if (popup5 === "skills" || popup5 === "boost") return `<div id="rcSaveSlot"></div>`;
  return "";
}
function overlayHtml5() {
  return `<div class="rc-pop guro-frame${popup5 === "computation" ? " rc-pop-comp" : ""}" role="dialog" aria-modal="true" aria-label="${popupTitle5()}">
    <div class="rc-pop-head"><span class="rc-pop-title">${popupTitle5()}</span><button type="button" class="rc-pop-close" data-rc-close aria-label="Close">\u2715</button></div>
    <div class="rc-pop-body" id="rcPopBody">${popupBodyHtml5()}</div>
    <div class="rc-pop-foot">${footerHtml5()}</div>
  </div>`;
}
function renderOverlayBody5() {
  if (!overlayEl5) return;
  const body = overlayEl5.querySelector("#rcPopBody");
  if (!body) return;
  if (popup5 === "skills") return;
  const top = body.scrollTop;
  body.innerHTML = popupBodyHtml5();
  body.scrollTop = top;
  updateSkillSaveBarState();
}
function isPopupDirty5() {
  if (popup5 === "skills" || popup5 === "boost") return isSkillDraftDirty() || isBoostDraftDirty();
  if (popup5 === "hives") return hivesDraft != null && Number(hivesDraft) !== (getHiveCount() || 0);
  return false;
}
function openPopup5(kind) {
  if (popup5) return;
  popup5 = kind;
  hivesDraft = null;
  openMenu = null;
  overlayEl5 = document.createElement("div");
  overlayEl5.className = "rc-overlay";
  overlayEl5.innerHTML = overlayHtml5();
  document.body.appendChild(overlayEl5);
  document.body.classList.add("rc-no-scroll");
  const slot = overlayEl5.querySelector("#rcSkillSlot");
  if (kind === "skills" && slot) {
    const asc = document.createElement("div");
    asc.id = "rcAscSlot";
    slot.parentNode.insertBefore(asc, slot);
  }
  setupBorrowed5();
}
function destroyPopup5() {
  teardownBorrowed5();
  if (overlayEl5) overlayEl5.remove();
  overlayEl5 = null;
  popup5 = null;
  hivesDraft = null;
  openMenu = null;
  document.body.classList.remove("rc-no-scroll");
}
function closePopup5(force) {
  if (!popup5) return;
  if (!force && isPopupDirty5()) {
    showPrompt5("You have unsaved changes. Save them first, or discard them to close.", [{
      label: "Keep Editing"
    }, {
      label: "Discard",
      run: () => {
        discardSkillBoostDrafts();
        destroyPopup5();
        refreshAll();
      }
    }]);
    return;
  }
  destroyPopup5();
  refreshAll();
}
function showPrompt5(message, buttons) {
  if (promptEl5) promptEl5.remove();
  promptEl5 = document.createElement("div");
  promptEl5.className = "rc-overlay rc-overlay-top";
  promptEl5.innerHTML = `<div class="rc-prompt guro-frame" role="alertdialog" aria-modal="true"><p class="rc-prompt-text">${esc6(message)}</p><div class="rc-prompt-actions">${buttons.map((b, i) => `<button type="button" class="rc-prompt-btn guro-frame" data-rc-prompt="${i}">${esc6(b.label)}</button>`).join("")}</div></div>`;
  promptEl5.addEventListener("click", (e) => {
    const btn = e.target.closest("[data-rc-prompt]");
    if (!btn) return;
    const b = buttons[Number(btn.getAttribute("data-rc-prompt"))];
    promptEl5.remove();
    promptEl5 = null;
    if (b && b.run) b.run();
  });
  document.body.appendChild(promptEl5);
  const first = promptEl5.querySelector("button");
  if (first) first.focus();
}
function saveHives() {
  if (hivesDraft == null) return;
  const v = Math.max(0, Math.floor(Number(hivesDraft) || 0));
  setHiveCount(v);
  invalidateCostCache();
  renderHoneyList();
  updateCalcSummary();
  hivesDraft = null;
  toast("\u2705 Hive count saved");
  renderOverlayBody5();
  refreshResults5();
}
function pickFlower(name) {
  if (!FLOWER_VARIETIES[name]) return;
  if (isFlowerVarietySeasonLocked(name)) {
    toast("\u{1F512} That flower is out of season");
    return;
  }
  setSelectedHoneyFlower(name);
  invalidateCostCache();
}
function pickCrop(name) {
  if (!BASE_CROPS[name]) return;
  setSelectedSwarmCrop(name);
}
function handleDropdown(e) {
  const toggle = e.target.closest("[data-rc-dd-toggle]");
  if (toggle) {
    const kind = toggle.getAttribute("data-rc-dd-toggle");
    openMenu = openMenu === kind ? null : kind;
    refreshAll();
    return true;
  }
  const pick = e.target.closest("[data-rc-dd-pick]");
  if (pick) {
    const kind = pick.getAttribute("data-rc-dd-pick");
    const value = pick.getAttribute("data-rc-value");
    openMenu = null;
    if (kind === "crop") pickCrop(value);
    else pickFlower(value);
    refreshAll();
    return true;
  }
  if (openMenu && !e.target.closest(".rc-dd")) {
    openMenu = null;
    refreshAll();
  }
  return false;
}
function onClick5(e) {
  const details = e.target.closest("[data-rc-details]");
  if (details) {
    detailsOpen5 = !detailsOpen5;
    refreshResults5();
    return;
  }
  const open = e.target.closest("[data-rc-open]");
  if (open && !open.disabled) openPopup5(open.getAttribute("data-rc-open"));
}
function onDocClick5(e) {
  if (!host5) return;
  if (promptEl5 && promptEl5.contains(e.target)) return;
  if (handleDropdown(e)) return;
  if (!overlayEl5) return;
  if (e.target === overlayEl5 || e.target.closest("[data-rc-close]")) {
    closePopup5(false);
    return;
  }
  if (!overlayEl5.contains(e.target)) return;
  if (e.target.closest("#rcNodesSave")) {
    saveHives();
    return;
  }
  const row = e.target.closest("[data-boost-id]");
  if (row && popup5 === "boost" && overlayEl5.contains(row)) {
    draftToggleBoost(row.getAttribute("data-boost-id"));
    renderOverlayBody5();
  }
}
function onDocInput5(e) {
  const t = e.target;
  if (t && t.dataset && t.dataset.rcHives != null) hivesDraft = t.value === "" ? 0 : Number(t.value);
}
function onKey5(e) {
  if ((e.key === "Enter" || e.key === " ") && e.target && e.target.closest && e.target.closest("[data-rc-dd-pick]")) {
    e.preventDefault();
    e.target.closest("[data-rc-dd-pick]").click();
    return;
  }
  if (e.key !== "Escape") return;
  if (promptEl5) {
    promptEl5.remove();
    promptEl5 = null;
    return;
  }
  if (openMenu) {
    openMenu = null;
    refreshAll();
    return;
  }
  if (popup5) closePopup5(false);
}
function onBoostsChanged5() {
  if (!host5) return;
  invalidateCostCache();
  if (popup5 === "boost") renderOverlayBody5();
  refreshResults5();
}
function onExternalChange5() {
  if (!host5) return;
  refreshResults5();
}
function mountHoneyCalculator(root) {
  host5 = root;
  invalidateCostCache();
  detailsOpen5 = false;
  openMenu = null;
  syncGemRatio5();
  host5.addEventListener("click", onClick5);
  document.addEventListener("click", onDocClick5);
  document.addEventListener("input", onDocInput5);
  document.addEventListener("keydown", onKey5);
  window.addEventListener("guroBoostsChanged", onBoostsChanged5);
  window.addEventListener("guroGemPackChanged", onExternalChange5);
  window.addEventListener("guroPricesUpdated", onExternalChange5);
  listening5 = true;
  render5();
}
function unmountHoneyCalculator() {
  invalidateCostCache();
  if (popup5) destroyPopup5();
  if (promptEl5) {
    promptEl5.remove();
    promptEl5 = null;
  }
  if (host5) {
    host5.removeEventListener("click", onClick5);
    host5.innerHTML = "";
  }
  if (listening5) {
    document.removeEventListener("click", onDocClick5);
    document.removeEventListener("input", onDocInput5);
    document.removeEventListener("keydown", onKey5);
    window.removeEventListener("guroBoostsChanged", onBoostsChanged5);
    window.removeEventListener("guroGemPackChanged", onExternalChange5);
    window.removeEventListener("guroPricesUpdated", onExternalChange5);
    listening5 = false;
  }
  host5 = null;
  openMenu = null;
}
function honeyCalculatorCanLeave() {
  if (!popup5) return true;
  if (isPopupDirty5()) {
    toast("\u26A0\uFE0F Save your changes first");
    return false;
  }
  destroyPopup5();
  return true;
}

// src/pages/resourcecalc.js
var CALCULATORS = [{
  id: "crops",
  label: "Crops Calculator",
  mount: mountCropsCalculator,
  unmount: unmountCropsCalculator,
  canLeave: cropsCalculatorCanLeave
}, {
  id: "fruits",
  label: "Fruit Calculator",
  mount: mountFruitsCalculator,
  unmount: unmountFruitsCalculator,
  canLeave: fruitsCalculatorCanLeave
}, {
  id: "greenhouse",
  label: "Greenhouse Calculator",
  mount: mountGreenhouseCalculator,
  unmount: unmountGreenhouseCalculator,
  canLeave: greenhouseCalculatorCanLeave
}, {
  id: "resources",
  label: "Resources Calculator",
  mount: mountResourcesCalculator,
  unmount: unmountResourcesCalculator,
  canLeave: resourcesCalculatorCanLeave
}, {
  id: "honey",
  label: "Honey Calculator",
  mount: mountHoneyCalculator,
  unmount: unmountHoneyCalculator,
  canLeave: honeyCalculatorCanLeave
}];
var rootEl = null;
var activeId = CALCULATORS[0].id;
var activeCalc = null;
function escapeHtml2(s) {
  return String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}
function linksHtml() {
  return CALCULATORS.map((c) => `<button type="button" class="rc-link${c.id === activeId ? " is-active" : ""}" data-rc-calc="${c.id}" aria-pressed="${c.id === activeId ? "true" : "false"}">${escapeHtml2(c.label)}</button>`).join("");
}
function shellHtml() {
  return `<div class="rc-page">
    <section class="rc-intro guro-frame" aria-label="About this panel">
      <div class="rc-intro-title">Resource Calculators</div>
      <p class="rc-intro-text">Pick a calculator to see the profit or loss of your resources. Every calculator uses your own skills, boosts, nodes, market prices and the Flower/Gem ratio from Settings.</p>
    </section>
    <section class="rc-pick guro-frame" aria-label="Choose a calculator">
      <div class="rc-pick-label">Calculators</div>
      <div class="rc-links" id="rcLinks">${linksHtml()}</div>
    </section>
    <section class="rc-display guro-frame" id="rcDisplay" aria-live="polite"><div id="rcDisplayHost"></div></section>
  </div>`;
}
function showCalculator(id) {
  const next = CALCULATORS.find((c) => c.id === id);
  if (!next) return;
  if (activeCalc && activeCalc.unmount) activeCalc.unmount();
  activeId = next.id;
  activeCalc = next;
  const host6 = rootEl.querySelector("#rcDisplayHost");
  host6.innerHTML = "";
  next.mount(host6);
  rootEl.querySelectorAll(".rc-link").forEach((b) => {
    const on = b.getAttribute("data-rc-calc") === activeId;
    b.classList.toggle("is-active", on);
    b.setAttribute("aria-pressed", on ? "true" : "false");
  });
}
function onClick6(e) {
  const link = e.target.closest("[data-rc-calc]");
  if (!link) return;
  const id = link.getAttribute("data-rc-calc");
  if (id === activeId && activeCalc) return;
  if (activeCalc && activeCalc.canLeave && !activeCalc.canLeave()) return;
  showCalculator(id);
}
function mount(root) {
  rootEl = root;
  root.innerHTML = shellHtml();
  root.addEventListener("click", onClick6);
  activeCalc = null;
  showCalculator(activeId);
}
function unmount() {
  if (activeCalc && activeCalc.unmount) activeCalc.unmount();
  activeCalc = null;
  if (rootEl) {
    rootEl.removeEventListener("click", onClick6);
    rootEl.innerHTML = "";
  }
  rootEl = null;
}
function canLeave() {
  if (activeCalc && activeCalc.canLeave) return activeCalc.canLeave();
  return true;
}
export {
  canLeave,
  mount,
  unmount
};
