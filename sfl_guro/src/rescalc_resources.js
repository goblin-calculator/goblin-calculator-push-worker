import * as calc from "./calculator.js";
import * as prices from "./prices.js";
import * as ui from "./ui.js";
import { boostsBySubjectHtml } from "./rescalc_boosts.js";
import { farmPanelGetMarketPriceFlower } from "./inprogress.js";
import { applySelection, currentRatio } from "./gem_packs.js";
import { toolRestockShareCount } from "./rescalc_shared.js";

const STORE_KEY = "guro_rc_resources_v1";

const AUTO_COLLECT_MIN_PROFIT = .2;

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
let skillTab = "mining";

function esc(s) {
  return calc.escapeHtml(String(s));
}

function resourceNames() {
  return Object.keys(calc.RESOURCE_DATA);
}

function isResource(n) {
  return !!calc.RESOURCE_DATA[n];
}

function resTool(n) {
  return (calc.RESOURCE_DATA[n] || {}).tool;
}

function figOf(n) {
  return calc.computeResourceFigures(n);
}

function nodeCountOf(n) {
  return calc.getNodeCount(n) || 0;
}

function iconNameOf(n) {
  return n;
}

function loadState() {
  const base = {
    mode: "restock",
    selected: [],
    cycles: {}
  };
  try {
    const raw = JSON.parse(localStorage.getItem(STORE_KEY) || "null");
    if (raw && typeof raw === "object") {
      if (raw.mode === "24h" || raw.mode === "restock") base.mode = raw.mode;
      if (Array.isArray(raw.selected)) base.selected = raw.selected.filter(isResource);
      if (raw.cycles && typeof raw.cycles === "object") Object.keys(raw.cycles).forEach(k => {
        const v = Math.floor(Number(raw.cycles[k]));
        if (isResource(k) && isFinite(v) && v > 0) base.cycles[k] = Math.min(v, MAX_CUSTOM_CYCLES);
      });
    }
  } catch (e) {}
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

function ratioInfo() {
  const fpg = calc.flowerPerGem();
  return {
    free: !(fpg > 0),
    gemsPerFlower: fpg > 0 ? 1 / fpg : 0
  };
}

function toolBoosts(tool) {
  return calc.BOOSTS.filter(b => b.category === "tools" && b.scope === "tool" && b.target === tool && calc.isBoostActive(b.id));
}

function compute(name, mode, share) {
  const fig = figOf(name);
  const nodes = nodeCountOf(name);
  const sell = farmPanelGetMarketPriceFlower(name) || 0;
  const feeRate = (calc.feePercent || 0) / 100;
  const tool = fig.tool;
  const regrowSources = calc.getInstantRegrowSources(name);
  const regrowChance = calc.getInstantRegrowChance(name);
  const avgHarvests = 1 / (1 - regrowChance);
  const toolUse = (fig.toolUsageTotal || 0) * avgHarvests;
  const baseYieldCycle = nodes > 0 ? fig.totalYieldPerCycle || 0 : 0;
  const yieldCycle = baseYieldCycle * avgHarvests;
  const toolUnit = calc.coinsToFlower(fig.totalToolCost || 0);
  const shrine = prices.getActiveShrineDailyCost(fig.activeBoosts);
  const stockBase = calc.BASE_STOCK_TOOLS[tool] || 0;
  const stockQty = stockBase ? calc.computeBoostedStock(stockBase, "tool", tool) : 0;
  const gemPerRestock = prices.getRestockGemCostIndividual("tool");
  const fullRestockFlower = calc.gemsToFlower(gemPerRestock);
  const matsCoins = fig.breakdown.reduce((sum, m) => sum + m.lineCost, 0);
  const tierCounts = calc.isTieredResource(name) ? calc.getNodeTierCounts(name) : null;
  const tiers = tierCounts ? calc.RESOURCE_NODE_TIERS[name].map(t => {
    const perNode = fig.perTierYield && fig.perTierYield[t.key] != null ? fig.perTierYield[t.key] : fig.yieldPer;
    const nodeYield = t.mult * perNode + t.yieldAdd;
    const count = parseFloat(tierCounts[t.key]) || 0;
    return {
      key: t.key,
      label: t.label,
      icon: t.displayLabel || t.label,
      bonus: t.yieldAdd,
      count: count,
      nodeYield: nodeYield,
      total: count * nodeYield * avgHarvests
    };
  }) : null;
  const yieldNode = tiers ? tiers[0].nodeYield : fig.yieldPer;
  const grossCycle = yieldCycle * sell;
  const costCycle = toolUnit * toolUse;
  const shrineCycle = shrine.total * fig.timeSec / 86400;
  const out = {
    name: name,
    tool: tool,
    nodes: nodes,
    timeSec: fig.timeSec,
    yieldNode: yieldNode,
    regrowChance: regrowChance,
    regrowSources: regrowSources,
    avgHarvests: avgHarvests,
    extraNodesCycle: nodes * (avgHarvests - 1),
    extraYieldCycle: yieldCycle - baseYieldCycle,
    tiers: tiers,
    toolUse: toolUse,
    yieldCycle: yieldCycle,
    sell: sell,
    toolUnit: toolUnit,
    grossCycle: grossCycle,
    costCycle: costCycle,
    shrineCycle: shrineCycle,
    feeRate: feeRate,
    gemPerRestock: gemPerRestock,
    fullRestockFlower: fullRestockFlower,
    stockQty: stockQty,
    breakdown: fig.breakdown,
    toolCoins: Math.max(0, (fig.totalToolCost || 0) - matsCoins),
    freeTool: (fig.totalToolCost || 0) <= 0 && toolUse <= 0,
    activeBoosts: fig.activeBoosts.concat(toolBoosts(tool)),
    shareCount: share,
    mode: mode
  };
  const customCycles = state.cycles[name] > 0 ? state.cycles[name] : 0;
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
      restockCost = calc.gemsToFlower(restockGems);
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

function syncGemRatio() {
  try {
    const want = currentRatio();
    const fpg = calc.flowerPerGem();
    const have = fpg > 0 ? 1 / fpg : 0;
    const same = want.free ? !(fpg > 0) : Math.abs(want.gems - have) < 1e-6;
    if (!same) applySelection();
  } catch (e) {}
}

function autoModeFor(material) {
  const sell = farmPanelGetMarketPriceFlower(material) || 0;
  if (!(sell > 0)) return null;
  const cost = calc.coinsToFlower(prices.getItemCostByName(material));
  if (!isFinite(cost)) return null;
  if (cost <= 0) return "collect";
  const net = sell * (1 - (calc.feePercent || 0) / 100);
  return (net - cost) / cost >= AUTO_COLLECT_MIN_PROFIT ? "collect" : "buy";
}

function refreshAutoModes() {
  const map = {};
  calc.setAutoMaterialModes(map);
  prices.invalidateCostCache();
  resourceNames().forEach(res => {
    calc.RESOURCE_DATA[res].materials.forEach(m => {
      if (!isResource(m.name) || calc.hasManualMaterialMode(res, m.name)) return;
      const mode = autoModeFor(m.name);
      if (!mode) return;
      map[res + ":" + m.name] = mode;
      prices.invalidateCostCache();
    });
  });
}

function computeAll() {
  syncGemRatio();
  refreshAutoModes();
  const share = toolRestockShareCount();
  return state.selected.filter(isResource).map(n => compute(n, state.mode, share));
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
  rows.forEach(r => {
    t.gross += r.gross;
    t.fee += r.fee;
    t.cost += r.cost;
    t.shrine += r.shrine;
    t.restock += r.restock;
    t.net += r.net;
  });
  return t;
}

function cropCellsHtml() {
  return resourceNames().map(n => {
    const on = state.selected.includes(n);
    return `<label class="rc-crop guro-frame${on ? " is-on" : ""}"><span class="rc-crop-icon">${ui.getIcon(iconNameOf(n))}</span><span class="rc-crop-name">${esc(n)}</span><input type="checkbox" data-rc-crop="${esc(n)}"${on ? " checked" : ""} aria-label="${esc(n)}"></label>`;
  }).join("");
}

function tilesHtml(rows) {
  if (!rows.length) return `<div class="rc-empty">No resources selected yet. Tick a resource above to include it in the calculation.</div>`;
  return `<div class="rc-tiles">${rows.map(r => {
    const good = r.net >= 0;
    return `<div class="rc-tile guro-frame ${good ? "is-profit" : "is-loss"}" data-rc-tile="${esc(r.name)}"><span class="rc-tile-icon">${ui.getIcon(iconNameOf(r.name))}</span><span class="rc-tile-yield">${signed(r.totalYield, n2)}</span><span class="rc-tile-net">${fl(r.gross)}${calc.FLOWER_ICON}</span></div>`;
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
    ${valueBoxHtml("Tool Cost", flowerHtml(t.cost))}
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
  const total = state.selected.reduce((s, n) => s + nodeCountOf(n), 0);
  const warn = state.selected.length && total <= 0 ? `<div class="rc-note is-warn">The selected resources have 0 nodes, so every result is 0. Open Nodes above and enter your nodes.</div>` : "";
  const text = state.mode === "restock" ? `Per Restock Mode: the tool stock is used up and 1 restock is shared by all ${toolRestockShareCount()} tools, selected or not.` : `24Hrs Mode: the nodes are harvested all day and every restock needed is shared by all ${toolRestockShareCount()} tools, selected or not.`;
  return `<div class="rc-details-row"><button type="button" class="rc-linktext" data-rc-details aria-expanded="${detailsOpen ? "true" : "false"}">Details</button></div>${detailsOpen ? `<div class="rc-note">${text}</div>` : ""}${warn}`;
}

function pickerHtml() {
  return `<section class="rc-block guro-frame" aria-label="Resources Calculator">
    <div class="rc-block-title">Resources Calculator</div>
    <div class="rc-crops" id="rcCrops">${cropCellsHtml()}</div>
  </section>`;
}

function resultsHtml() {
  const rows = computeAll();
  return `<section class="rc-block guro-frame" aria-label="Resources results">
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
  const add = b.resourceEffects ? b.resourceEffects[name] || 0 : b.yieldAdd || 0;
  if (add) y.push(`${add > 0 ? "+" : ""}${n2(add)} yield`);
  if (b.yieldMult) y.push(`×${b.yieldMult} yield`);
  if (b.timeMult) t.push(`×${b.timeMult} time`);
  if (b.toolCostMult) c.push(`×${b.toolCostMult} tool cost`);
  if (b.coinCostMult) c.push(`×${b.coinCostMult} tool cost`);
  if (b.noTool) c.push("free tool");
  if (b.materialSwap) c.push(`${b.materialSwap.from} → ${b.materialSwap.to}`);
  if (b.stockAdd) c.push(`+${n2(b.stockAdd)} stock`);
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
    cost: [],
    regrow: []
  };
  const list = row.activeBoosts.slice();
  const artist = calc.BOOSTS.find(b => b.id === "artist_discount");
  if (artist && calc.isBoostActive(artist.id) && !list.includes(artist)) list.push(artist);
  list.forEach(b => {
    const p = effectParts(b, row.name);
    [ "yield", "time", "cost" ].forEach(k => {
      if (p[k].length) groups[k].push(`<div class="rc-boost-row">${ui.getBoostIconAnyFallback(b.name)}<span class="rc-boost-name">${esc(b.name)}</span><span class="rc-boost-eff">${esc(p[k].join(", "))}</span></div>`);
    });
  });
  row.regrowSources.forEach(src => {
    groups.regrow.push(`<div class="rc-boost-row">${ui.getBoostIconAnyFallback(src.name)}<span class="rc-boost-name">${esc(src.name)}</span><span class="rc-boost-eff">${n2(src.chance * 100)}% instant regrow</span></div>`);
  });
  const section = (label, items) => items.length ? `<div class="rc-boost-group"><div class="rc-boost-label">${label}</div>${items.join("")}</div>` : "";
  const body = section("Yield Boost", groups.yield) + section("Time Boost", groups.time) + section("Tool Boost", groups.cost) + section("Instant Regrow", groups.regrow);
  return `<div class="rc-group"><div class="rc-comp-sub">Applied Boost</div>${body || `<div class="rc-boost-none">No boost applied</div>`}</div>`;
}

function kv(label, html, cls) {
  return `<div class="rc-kv${cls ? " " + cls : ""}"><span class="rc-kv-label">${label}</span><span class="rc-kv-val">${html}</span></div>`;
}

function matPrice(name) {
  return farmPanelGetMarketPriceFlower(name) || 0;
}

function matRowHtml(name, qty, price, badge) {
  return `<div class="rc-mat-row"><span class="rc-mat-main">${ui.getIcon(name)}<span class="rc-mat-name">${esc(name)}</span><span class="rc-mat-qty">×${n2(qty)}</span><span class="rc-mat-val">(${flowerHtml(qty * price)})</span></span><span class="rc-badge">${badge}</span></div>`;
}

function nodeTiersHtml(r) {
  if (!r.tiers) return "";
  const rows = r.tiers.map(t => `<div class="rc-tier-row"><span class="rc-tier-name">${ui.getIcon(t.icon)}<span>${esc(t.label)}</span>${t.bonus ? `<span class="rc-tier-bonus">+${n2(t.bonus)}</span>` : ""}</span><span class="rc-tier-nums"><span class="rc-tier-count">×${n2(t.count)}</span><span class="rc-tier-yield">${signed(t.total, n2)}${ui.getIcon(r.name)}</span></span></div>`).join("");
  return `<div class="rc-group"><div class="rc-comp-sub">Nodes Tier</div>${rows}</div>`;
}

function toolCostConfigHtml(r) {
  if (r.freeTool) return `<div class="rc-group"><div class="rc-comp-sub">Tool Cost Config</div><div class="rc-boost-none">Free tool</div></div>`;
  const btn = (m, mode, label) => `<button type="button" class="es-mode-btn es-toolcfg-tbtn${m.mode === mode ? " active" : ""}" data-rc-res="${esc(r.name)}" data-rc-mat="${esc(m.name)}" data-rc-mode="${mode}">${label}</button>`;
  const rows = r.breakdown.map(m => {
    const tog = m.name.toLowerCase() === "oil" ? `<span class="es-toolcfg-free">Always Collect</span>` : `<span class="es-toolcfg-tog">${btn(m, "collect", "Collect")}${btn(m, "buy", "Buy")}</span>`;
    return `<div class="rc-tool-mat"><span class="rc-tool-mat-item"><span class="rc-tool-mat-qty">${n2(m.qty)}</span>${ui.getIcon(m.name)}</span>${tog}</div>`;
  }).join("");
  const coinRow = r.toolCoins > 0 ? `<div class="rc-tool-mat"><span class="rc-tool-mat-item"><span class="rc-tool-mat-qty">${n2(r.toolCoins)}</span>${calc.COIN_ICON}</span></div>` : "";
  return `<div class="rc-group"><div class="rc-comp-sub">Tool Cost Config</div>
    <div class="rc-tool-cfg"><div class="rc-tool-name">${ui.getIcon(r.tool)}<span>${esc(r.tool)}</span></div>${coinRow}${rows}</div></div>`;
}

function materialsHtml(r) {
  const modeBadge = r.mode === "restock" ? "Per Restock" : "24hr";
  const mats = r.breakdown.filter(m => m.qty > 0);
  const matRows = !mats.length || r.toolUse <= 0 ? `<div class="rc-boost-none">No material used</div>` : mats.map(m => {
    const p = matPrice(m.name);
    return matRowHtml(m.name, m.qty * r.toolUse, p, "1 cycle") + matRowHtml(m.name, m.qty * r.toolUses, p, modeBadge);
  }).join("");
  const yieldRows = matRowHtml(r.name, r.yieldCycle, r.sell, "1 cycle") + matRowHtml(r.name, r.totalYield, r.sell, modeBadge);
  return `<div class="rc-mat-section rc-group"><div class="rc-boost-label">Material Used</div>${matRows}</div>
    <div class="rc-mat-section rc-group"><div class="rc-boost-label">${esc(r.name)} Yield</div>${yieldRows}</div>`;
}

function totalCycleHtml(r) {
  if (r.mode !== "24h") return n2(r.cycles);
  return `<span class="rc-cycle-val"><span>${n2(r.cycles)}${r.cyclesCustom ? ` <span class="rc-kv-sub">Custom</span>` : ""}</span><button type="button" class="rc-edit-link" data-rc-edit-cycle="${esc(r.name)}">Edit</button></span>`;
}

function computationCardHtml(r) {
  const ratio = ratioInfo();
  const modeLabel = r.mode === "restock" ? "Per Restock Mode" : "24Hrs Mode";
  const qtyLabel = r.mode === "restock" ? `×${r.restockQty} Restock` : `×${n2(r.restockQty)} Restock${r.restockQty === 1 ? "" : "s"}`;
  const gemLine = `${gemHtml(r.gemPerRestock)}`;
  const ratioLine = ratio.free ? `Free gems` : `1${calc.FLOWER_ICON} : ${n2(ratio.gemsPerFlower)}${calc.GEM_ICON}`;
  const shareLine = r.shareCount > 1 ? `<div class="rc-kv rc-kv-wide"><span class="rc-kv-label">Your share of ${r.mode === "restock" ? "1 restock" : "each restock"}</span><span class="rc-kv-val">1/${r.shareCount} = ${flowerHtml(r.restock)}</span></div>` : "";
  return `<article class="rc-comp-card guro-frame">
    <header class="rc-comp-head"><span class="rc-comp-icon">${ui.getIcon(iconNameOf(r.name))}</span><span class="rc-comp-name">${esc(r.name)}</span><span class="rc-comp-nodes">${ui.getIcon(iconNameOf(r.name))} ${n2(r.nodes)}</span></header>
    <div class="rc-group"><div class="rc-kv-grid">
      ${kv("Yield / Node", `${signed(r.yieldNode, n2)}${ui.getIcon(r.name)}`, "rc-kv-wide")}
      ${kv("Recovery Time", esc(calc.formatDuration(r.timeSec)), "rc-kv-wide")}
      ${r.regrowChance > 0 ? kv("Instant Regrow Chance", `${n2(r.regrowChance * 100)}%`) : ""}
      ${r.regrowChance > 0 ? kv("Avg Harvests / Node", `×${n2(r.avgHarvests)}`) : ""}
      ${r.regrowChance > 0 ? kv("Extra Nodes / Cycle", `${signed(r.extraNodesCycle, n2)}${ui.getIcon(iconNameOf(r.name))}`) : ""}
      ${r.regrowChance > 0 ? kv("Extra Yield / Cycle", `${signed(r.extraYieldCycle, n2)}${ui.getIcon(r.name)}`) : ""}
      ${kv("Tools / Cycle", `${n2(r.toolUse)}${ui.getIcon(r.tool)}`)}
      ${kv("Yield / Cycle", `${signed(r.yieldCycle, n2)}${ui.getIcon(r.name)}`)}
      ${kv("Market Price / Unit", flowerSigned(r.sell))}
      ${kv("Gross / Cycle", flowerSigned(r.grossCycle))}
      ${kv("Tool Cost / Tool", flowerHtml(r.toolUnit))}
      ${kv("Tool Cost / Cycle", flowerHtml(r.costCycle))}
      ${kv("Shrine / Cycle", flowerHtml(r.shrineCycle))}
      ${kv("Restock / Cycle", flowerHtml(r.restockCycle))}
      ${kv("Net / Cycle", `<span class="${r.netCycle >= 0 ? "is-profit" : "is-loss"}">${signed(r.netCycle, fl)}${calc.FLOWER_ICON}</span>`, "rc-kv-wide")}
    </div></div>
    <div class="rc-group"><div class="rc-comp-sub">${modeLabel}</div>
    <div class="rc-kv-grid">
      ${kv("Total Cycle", totalCycleHtml(r))}
      ${kv("Tools Used", `${n2(r.toolUses)}${ui.getIcon(r.tool)}`)}
      ${kv("Total Yield", `${signed(r.totalYield, n2)}${ui.getIcon(r.name)}`)}
      ${r.regrowChance > 0 ? kv("Extra Nodes", `${signed(r.extraNodes, n2)}${ui.getIcon(iconNameOf(r.name))}`) : ""}
      ${r.regrowChance > 0 ? kv("Extra Yield", `${signed(r.extraYield, n2)}${ui.getIcon(r.name)}`) : ""}
      ${kv("Total Gross", flowerSigned(r.gross))}
      ${kv("Total Tool Cost", flowerHtml(r.cost))}
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
    ${nodeTiersHtml(r)}
    ${toolCostConfigHtml(r)}
    ${materialsHtml(r)}
  </article>`;
}

function computationBodyHtml() {
  const rows = computeAll();
  if (!rows.length) return `<div class="rc-empty">No resources selected.</div>`;
  return rows.map(computationCardHtml).join("");
}

function boostBodyHtml() {
  if (!state.selected.length) return `<div class="rc-empty">Select at least one resource to see the boosts that affect it.</div>`;
  const subjects = state.selected.map(n => ({
    name: n,
    icon: ui.getIcon(n)
  }));
  const boosts = calc.BOOSTS.filter(b => b.source !== "skill" && !b.hiddenFromOwnPanel && (b.category === "resources" || b.category === "tools"));
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
    subjects: subjects,
    boosts: boosts,
    appliesTo: appliesTo,
    unit: "nodes",
    noteSkip: /AOE|expected/i,
    allLabel: "Boost for All Selected Resources"
  });
  return `<div class="rc-pop-hint">Boosts that affect ${state.selected.length > 1 ? "your selected resources" : esc(state.selected[0])}. Tap a boost to switch it on or off, then press Save.</div>${html || `<div class="rc-empty">No boosts found.</div>`}`;
}

function nodeKeys() {
  const keys = [];
  state.selected.forEach(n => {
    if (calc.isTieredResource(n)) calc.RESOURCE_NODE_TIERS[n].forEach(t => keys.push({
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
    const t = calc.getNodeTierCounts(k.res);
    return parseFloat(t && t[k.tier]) || 0;
  }
  return nodeCountOf(k.res);
}

function nodeValue(k) {
  if (nodesDraft && Object.prototype.hasOwnProperty.call(nodesDraft, k.key)) return nodesDraft[k.key];
  return currentNodeValue(k);
}

function nodesBodyHtml() {
  const keys = nodeKeys();
  if (!keys.length) return `<div class="rc-empty">Select at least one resource to edit its nodes.</div>`;
  const rows = keys.map(k => {
    const v = nodeValue(k);
    return `<label class="rc-node-row guro-frame"><span class="rc-node-icon">${ui.getIcon(k.icon)}</span><span class="rc-node-text"><span class="rc-node-name">${esc(k.label)}</span><span class="rc-node-used">Used by: ${esc(k.res)}</span></span><input type="number" min="0" step="1" inputmode="numeric" data-rc-node="${esc(k.key)}" value="${v ? v : ""}" placeholder="0"></label>`;
  }).join("");
  return `<div class="rc-pop-hint">Enter how many nodes of each type you have, then press Save.</div>${rows}`;
}

function popupTitle() {
  if (popup === "skills") return "Resource Skills";
  if (popup === "boost") return "Resource Boosts";
  if (popup === "nodes") return "Resource Nodes";
  return "Computation";
}

function skillTabsHtml() {
  return `<div class="rc-modes" role="group" aria-label="Skill tree">${[ [ "trees", "Trees" ], [ "mining", "Mining" ] ].map(t => `<button type="button" class="rc-mode guro-frame${skillTab === t[0] ? " is-on" : ""}" data-rc-skilltab="${t[0]}" aria-pressed="${skillTab === t[0] ? "true" : "false"}">${t[1]}</button>`).join("")}</div>`;
}

function popupBodyHtml() {
  if (popup === "boost") return boostBodyHtml();
  if (popup === "nodes") return nodesBodyHtml();
  if (popup === "computation") return computationBodyHtml();
  return `${skillTabsHtml()}<div class="rc-pop-hint">Trees and Mining skills from the Skill Tree. Changes here also change the Skill Tree. Press Save to apply them.</div><div id="rcSkillSlot"></div>`;
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
    skillTab = state.selected.length && state.selected.every(n => n === "Wood") ? "trees" : "mining";
    calc.setSkillCategory(skillTab);
    borrow("ascensionBar", "rcAscSlot");
    borrow("skillListWrap", "rcSkillSlot");
    borrow("skillSaveBar", "rcSaveSlot");
    ui.renderSkillPanel();
    ui.renderAscensionBar();
    calc.updateSkillSaveBarState();
    refreshSkillTabs();
  } else if (popup === "boost") {
    borrow("skillSaveBar", "rcSaveSlot");
    calc.updateSkillSaveBarState();
  }
}

function refreshSkillTabs() {
  if (!overlayEl) return;
  overlayEl.querySelectorAll("[data-rc-skilltab]").forEach(b => {
    const on = b.getAttribute("data-rc-skilltab") === skillTab;
    b.classList.toggle("is-on", on);
    b.setAttribute("aria-pressed", on ? "true" : "false");
  });
}

function switchSkillTab(id) {
  if (id === skillTab) return;
  skillTab = id;
  calc.setSkillCategory(id);
  ui.renderSkillPanel();
  refreshSkillTabs();
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
  if (popup === "nodes") return !!nodesDraft && nodeKeys().some(k => Object.prototype.hasOwnProperty.call(nodesDraft, k.key) && Number(nodesDraft[k.key]) !== currentNodeValue(k));
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
  const fig = figOf(name);
  const current = state.cycles[name] > 0 ? state.cycles[name] : "";
  const fallback = fig && fig.timeSec > 0 ? Math.round(86400 / fig.timeSec) : 0;
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
  nodeKeys().forEach(k => {
    if (!Object.prototype.hasOwnProperty.call(draft, k.key)) return;
    const v = Math.max(0, Math.floor(Number(draft[k.key]) || 0));
    if (k.tier) calc.setNodeTierQty(k.res, k.tier, v); else calc.setNodeCount(k.res, v);
  });
  prices.invalidateCostCache();
  ui.renderLibraryLists();
  ui.renderBoostPanel();
  calc.updateCalcSummary();
  nodesDraft = null;
  calc.toast("✅ Resource nodes saved");
  renderOverlayBody();
  refreshResults();
}

function toggleCrop(name, input) {
  const idx = state.selected.indexOf(name);
  if (idx >= 0) state.selected.splice(idx, 1); else state.selected.push(name);
  saveState();
  const label = input ? input.closest(".rc-crop") : null;
  if (label) label.classList.toggle("is-on", state.selected.includes(name));
  refreshResults();
}

function setMode(id) {
  if (id === state.mode) return;
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
  const tab = e.target.closest("[data-rc-skilltab]");
  if (tab && popup === "skills") {
    switchSkillTab(tab.getAttribute("data-rc-skilltab"));
    return;
  }
  const matBtn = e.target.closest("[data-rc-mat]");
  if (matBtn && popup === "computation") {
    calc.setMaterialMode(matBtn.getAttribute("data-rc-res"), matBtn.getAttribute("data-rc-mat"), matBtn.getAttribute("data-rc-mode"));
    prices.invalidateCostCache();
    renderOverlayBody();
    refreshResults();
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

export function mountResourcesCalculator(root, appApi) {
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

export function unmountResourcesCalculator() {
  calc.setAutoMaterialModes({});
  prices.invalidateCostCache();
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

export function resourcesCalculatorCanLeave() {
  if (!popup) return true;
  if (isPopupDirty()) {
    calc.toast("⚠️ Save your changes first");
    return false;
  }
  destroyPopup();
  return true;
}
