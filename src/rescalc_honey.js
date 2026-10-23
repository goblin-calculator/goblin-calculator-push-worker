import * as calc from "./calculator.js";
import * as prices from "./prices.js";
import * as ui from "./ui.js";
import { boostsBySubjectHtml } from "./rescalc_boosts.js";
import { loadBaseHoneyIfNeeded } from "./storage.js";
import { applySelection, currentRatio } from "./gem_packs.js";

const MAX_ROWS = 40;

let host = null;
let popup = null;
let overlayEl = null;
let promptEl = null;
let restoreFns = [];
let hivesDraft = null;
let listening = false;
let detailsOpen = false;
let openMenu = null;
let savedSkillCategory = null;

function esc(s) {
  return calc.escapeHtml(String(s));
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

function flowerHtml(n) {
  return `${fl(n)}${calc.FLOWER_ICON}`;
}

function gemHtml(n) {
  return `${n2(n)}${calc.GEM_ICON}`;
}

function flowerNameIcon(name) {
  const v = calc.FLOWER_VARIETIES[name];
  if (calc.IMAGE_ICONS[name]) return ui.getIcon(name);
  return `<span class="rc-dd-emoji">${v ? v.icon : ""}</span>`;
}

function swarmIcon() {
  return `<img src="${calc.BEE_SWARM_ICON}" alt="Bee Swarm">`;
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

function getEcon() {
  syncGemRatio();
  loadBaseHoneyIfNeeded();
  return calc.computeHiveEconomics();
}

function totalsOf(e) {
  const s = prices.getActiveShrineDailyCost(e.hiveStats.activeBoosts, e.flowerStats.activeBoosts);
  const gross = e.grossRevenuePerHiveDay * e.hives;
  const fee = gross - e.revenuePerHiveDay * e.hives;
  const restock = e.flowerRestockCost * e.hives;
  const cost = e.totalCostDay - restock;
  const net = gross - fee - cost - restock - s.total;
  return {
    gross: gross,
    fee: fee,
    cost: cost,
    restock: restock,
    shrine: s.total,
    shrines: s.shrines,
    net: net,
    honey: e.hiveStats.honeyPerHiveDay * e.hives,
    honeyGross: e.grossRevenuePerHiveDay * e.hives,
    flowers: e.replantsPerDay * e.flowerStats.expectedYield * e.hives
  };
}

function ddButtonHtml(kind, icon, label) {
  return `<button type="button" class="rc-dd-btn guro-frame" data-rc-dd-toggle="${kind}" aria-haspopup="listbox" aria-expanded="${openMenu === kind ? "true" : "false"}"><span class="rc-dd-icon">${icon}</span><span class="rc-dd-label">${esc(label)}</span><span class="rc-dd-chev">▾</span></button>`;
}

function flowerMenuHtml(kind) {
  const options = Object.keys(calc.FLOWER_VARIETIES).map(n => {
    const locked = calc.isFlowerVarietySeasonLocked(n);
    const on = n === calc.selectedHoneyFlower;
    return `<div class="rc-dd-opt${on ? " is-on" : ""}${locked ? " is-locked" : ""}" role="option" tabindex="0" aria-selected="${on ? "true" : "false"}" data-rc-dd-pick="${kind}" data-rc-value="${esc(n)}"><span class="rc-dd-icon">${flowerNameIcon(n)}</span><span class="rc-dd-label">${esc(n)}</span>${locked ? `<span class="rc-dd-lock">🔒</span>` : ""}</div>`;
  }).join("");
  return `<div class="rc-dd-menu guro-frame" role="listbox">${options}</div>`;
}

function cropMenuHtml() {
  const options = Object.keys(calc.BASE_CROPS).map(n => {
    const on = n === calc.selectedSwarmCrop;
    return `<div class="rc-dd-opt${on ? " is-on" : ""}" role="option" tabindex="0" aria-selected="${on ? "true" : "false"}" data-rc-dd-pick="crop" data-rc-value="${esc(n)}"><span class="rc-dd-icon">${ui.getIcon(n)}</span><span class="rc-dd-label">${esc(n)}</span></div>`;
  }).join("");
  return `<div class="rc-dd-menu guro-frame" role="listbox">${options}</div>`;
}

function flowerPickerHtml(kind) {
  const name = calc.selectedHoneyFlower;
  return `<div class="rc-dd" data-rc-dd="${kind}">${ddButtonHtml(kind, flowerNameIcon(name), name)}${openMenu === kind ? flowerMenuHtml(kind) : ""}</div>`;
}

function cropPickerHtml() {
  const name = calc.selectedSwarmCrop;
  return `<div class="rc-dd rc-dd-inline" data-rc-dd="crop">${ddButtonHtml("crop", ui.getIcon(name), name)}${openMenu === "crop" ? cropMenuHtml() : ""}</div>`;
}

function pickerHtml() {
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

function tilesHtml(e, t) {
  if (!(e.hives > 0)) return `<div class="rc-empty">You have 0 hives. Open Hives above and enter your hive count.</div>`;
  const honeyTile = tileHtml(ui.getIcon("Honey"), signed(t.honey, n2), `${fl(t.honeyGross)}${calc.FLOWER_ICON}`, true, "honey");
  const flowerTile = tileHtml(flowerNameIcon(calc.selectedHoneyFlower), signed(t.flowers, n2), `-${fl(t.cost + t.restock)}${calc.FLOWER_ICON}`, false, "flower");
  return `<div class="rc-tiles-wrap guro-frame"><div class="rc-tiles">${honeyTile}${flowerTile}</div></div>`;
}

function valueBoxHtml(label, html, extra) {
  return `<div class="rc-val guro-frame${extra ? " " + extra : ""}"><span class="rc-val-label">${label}</span><span class="rc-val-num">${html}</span></div>`;
}

function valuesHtml(t) {
  const feeBox = (calc.feePercent || 0) > 0 ? valueBoxHtml("Market Fee", flowerHtml(t.fee)) : "";
  return `<div class="rc-values">
    ${valueBoxHtml("Gross", flowerHtml(t.gross))}
    ${valueBoxHtml("Flower Cost", flowerHtml(t.cost))}
    ${valueBoxHtml("Shrine Cost", flowerHtml(t.shrine))}
    ${valueBoxHtml("Restock Cost", flowerHtml(t.restock))}
    ${feeBox}
  </div>
  <div class="rc-net-row">
    ${valueBoxHtml("Net", `<span class="${t.net >= 0 ? "is-profit" : "is-loss"}">${signed(t.net, fl)}${calc.FLOWER_ICON}</span>`, "rc-val-net")}
    <button type="button" class="rc-linktext" data-rc-open="computation">Computation</button>
  </div>`;
}

function modeNoteHtml(e) {
  const warn = !(e.hives > 0) ? `<div class="rc-note is-warn">You have 0 hives, so every result is 0. Open Hives above and enter your hive count.</div>` : "";
  const text = "24Hrs: every hive is full of honey once a day (more often with speed boosts), the flower is replanted all day and every restock needed is paid for.";
  return `<div class="rc-details-row"><button type="button" class="rc-linktext" data-rc-details aria-expanded="${detailsOpen ? "true" : "false"}">Details</button></div>${detailsOpen ? `<div class="rc-note">${text}</div>` : ""}${warn}`;
}

function resultsHtml() {
  const e = getEcon();
  const t = totalsOf(e);
  return `<section class="rc-block guro-frame" aria-label="Honey results">
    <div class="rc-tools">
      <button type="button" class="rc-tool guro-frame" data-rc-open="skills">Skills</button>
      <button type="button" class="rc-tool guro-frame" data-rc-open="boost">Boost</button>
      <button type="button" class="rc-tool guro-frame" data-rc-open="hives">Hives</button>
    </div>
    ${modeNoteHtml(e)}
    <div id="rcResults">${tilesHtml(e, t)}${valuesHtml(t)}</div>
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
  const blocks = host.querySelectorAll(".rc-block");
  if (blocks.length < 2) {
    render();
    return;
  }
  const tmp = document.createElement("div");
  tmp.innerHTML = resultsHtml();
  blocks[1].replaceWith(tmp.firstElementChild);
  if (popup === "computation") renderOverlayBody();
}

function refreshAll() {
  render();
  if (popup === "computation") renderOverlayBody();
}

function kv(label, html, cls) {
  return `<div class="rc-kv${cls ? " " + cls : ""}"><span class="rc-kv-label">${label}</span><span class="rc-kv-val">${html}</span></div>`;
}

function effectText(b) {
  const parts = [];
  if (b.speedAdd) parts.push(`${b.speedAdd > 0 ? "+" : ""}${n2(b.speedAdd)} speed`);
  if (b.honeyYieldAdd) parts.push(`${b.honeyYieldAdd > 0 ? "+" : ""}${n2(b.honeyYieldAdd)} honey`);
  if (b.swarmChanceAdd) parts.push(`+${n2(b.swarmChanceAdd * 100)}% swarm chance`);
  if (b.swarmChanceMult) parts.push(`×${b.swarmChanceMult} swarm chance`);
  if (b.flowerTimeMult) parts.push(`×${b.flowerTimeMult} flower time`);
  if (b.flowerExtraChance) parts.push(`+${n2(b.flowerExtraChance)} flowers`);
  if (b.flowerExtraFlat) parts.push(`+${n2(b.flowerExtraFlat)} flowers`);
  return parts.join(", ");
}

function boostRowsHtml(list) {
  return list.map(b => `<div class="rc-boost-row">${ui.getBoostIconAnyFallback(b.name)}<span class="rc-boost-name">${esc(b.name)}</span><span class="rc-boost-eff">${esc(effectText(b))}</span></div>`).join("");
}

function appliedBoostHtml(e) {
  const hive = e.hiveStats.activeBoosts.filter(b => effectText(b));
  const flower = e.flowerStats.activeBoosts.filter(b => effectText(b));
  const section = (label, items) => items.length ? `<div class="rc-boost-group"><div class="rc-boost-label">${label}</div>${boostRowsHtml(items)}</div>` : "";
  const body = section("Hive Boost", hive) + section("Flower Boost", flower);
  return `<div class="rc-group"><div class="rc-comp-sub">Applied Boost</div>${body || `<div class="rc-boost-none">No boost applied</div>`}</div>`;
}

function swarmTableHtml(e) {
  let rows = e.swarmDistribution;
  let note = "";
  if (rows.length > MAX_ROWS) {
    const shown = rows.filter(r => r.chance * 100 >= .01);
    note = `<div class="rc-boost-none">Showing the ${shown.length} most likely outcomes out of ${rows.length}.</div>`;
    rows = shown;
  }
  const cropIcon = ui.getIcon(calc.selectedSwarmCrop);
  const plus = v => {
    const r = (Math.round(v * 100) / 100).toLocaleString(undefined, {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    });
    return v > 0 ? "+" + r : r;
  };
  const body = rows.map(r => `<tr><td class="rc-sw-k">${r.k}</td><td>${(r.chance * 100).toFixed(2)}%</td><td>${plus(r.bonusCropYield)}${cropIcon}</td><td class="rc-sw-val">${plus(r.flowerValue)}${calc.FLOWER_ICON}</td></tr>`).join("");
  return `<div class="rc-comp-sub">🎲 Swarm Distribution (today, ${calc.fmt(e.swarmTrialsPerDay)} rolls across ${calc.fmt(e.hives)} hives)</div>
    <div class="rc-sw-wrap"><table class="rc-sw-grid"><thead><tr><th>Swarms</th><th>Chance</th><th>Crop Yield</th><th>Value</th></tr></thead><tbody>${body}</tbody></table></div>${note}`;
}

function swarmBonusHtml(e) {
  const crop = esc(calc.selectedSwarmCrop);
  const pollen = calc.isSkillActive("skill_pollen_power_up") ? " (0.2 base + Pollen Power Up)" : "";
  return `<div class="rc-group rc-swarm">
    <div class="rc-swarm-head"><span class="rc-swarm-icon">${swarmIcon()}</span><span class="rc-swarm-title">Bee Swarm bonus</span></div>
    <div class="rc-swarm-pick"><span class="rc-swarm-valued">valued vs</span>${cropPickerHtml()}<span class="rc-swarm-valued">, ${calc.fmt(calc.getPlotCount())} plots</span></div>
    <div class="rc-line">${calc.fmt(e.expectedSwarmsPerHiveDay)} expected swarms/hive/day × +${calc.fmt(e.swarmYieldPerSwarm)} yield${pollen} → +${calc.fmt(e.bonusCropValuePerPlotPerHiveDay)}${calc.FLOWER_ICON} FLOWER/plot/hive/day</div>
    <div class="rc-line">× ${calc.fmt(e.cropPlots)} plots → <b>+${calc.fmt(e.bonusCropYieldPerHiveDay)} ${crop}/hive/day</b> from swarms <span class="rc-kv-sub">(the extra crops themselves, before pricing)</span></div>
    <div class="rc-line">× ${calc.fmt(e.cropSellFlower)}${calc.FLOWER_ICON} FLOWER/${crop} → <b>+${calc.fmt(e.bonusCropValuePerHiveDay)}${calc.FLOWER_ICON} FLOWER/hive/day total</b></div>
    ${swarmTableHtml(e)}
  </div>`;
}

function calculatorCardHtml(e) {
  const feeNote = calc.feePercent > 0 ? `<span class="rc-kv-sub">(${calc.fmt(e.netHoneySell)}${calc.FLOWER_ICON} after ${calc.feePercent}% fee)</span>` : "";
  const formula = e.flowerStats.expectedYield > 1 ? `<span class="rc-kv-sub">(${calc.fmt(e.flowerCostFlower)}${calc.FLOWER_ICON} ÷ ${calc.fmt(e.flowerStats.expectedYield)} expected flowers/cycle = ${calc.fmt(e.costPerFlower)}${calc.FLOWER_ICON}/flower)</span>` : "";
  return `<article class="rc-comp-card guro-frame">
    <header class="rc-comp-head"><span class="rc-comp-icon">${ui.getIcon("Honey")}</span><span class="rc-comp-name">Honey Calculator</span><span class="rc-comp-nodes">${ui.getIcon("Beehive")} ${n2(e.hives)}</span></header>
    <div class="rc-group"><div class="rc-kv-grid">
      ${kv("Honey Speed", calc.fmt(e.hiveStats.speed))}
      ${kv("Time To Full Hive", esc(calc.formatDuration(e.hiveStats.timeToFullSec)))}
      ${kv("Honey / Hive / Day", calc.fmt(e.hiveStats.honeyPerHiveDay))}
      ${kv("Swarm Chance / Fill", `${(e.hiveStats.swarmChance * 100).toFixed(2)}%`)}
    </div></div>
    ${appliedBoostHtml(e)}
    <div class="rc-group"><div class="rc-comp-sub">Active Flower</div>
      ${flowerPickerHtml("popflower")}
      <div class="rc-kv-grid">
        ${kv("Replants / Day", calc.fmt(e.replantsPerDay))}
        ${kv("Average Yield", `${calc.fmt(e.flowerStats.expectedYield)} <span class="rc-kv-sub">flowers/cycle</span>`)}
        ${kv("Cost / Hive / Day", `${calc.fmt(e.costPerHiveDay)}${calc.FLOWER_ICON}${formula}`, "rc-kv-wide")}
        ${kv("Seed Restock Cost / Hive / Day", `${e.flowerRestockCost > 0 ? "+" + calc.fmt(e.flowerRestockCost) : "0"}${calc.FLOWER_ICON}`, "rc-kv-wide")}
      </div>
    </div>
    <div class="rc-group"><div class="rc-comp-sub">Honey Sell Price</div>
      <div class="rc-kv-grid">
        ${kv("Honey Sell Price", `${calc.fmt(e.honeySellFlower)}${calc.FLOWER_ICON}${feeNote}`, "rc-kv-wide")}
        ${kv("Revenue / Hive / Day", `${calc.fmt(e.hiveStats.honeyPerHiveDay * e.netHoneySell)}${calc.FLOWER_ICON}`, "rc-kv-wide")}
      </div>
    </div>
    ${swarmBonusHtml(e)}
  </article>`;
}

function profitCardHtml(e, t) {
  const perHive = e.hives > 0 ? t.net / e.hives : 0;
  const shrineNames = t.shrines.length ? `<span class="rc-kv-sub">${esc(t.shrines.map(s => s.name).join(", "))}</span>` : "";
  return `<article class="rc-comp-card guro-frame">
    <header class="rc-comp-head"><span class="rc-comp-icon">${ui.getIcon("Honey")}</span><span class="rc-comp-name">Honey 24hr Profitability</span><span class="rc-comp-nodes">${ui.getIcon("Beehive")} ${n2(e.hives)}</span></header>
    <div class="rc-group"><div class="rc-comp-sub">24Hrs Profit / Loss — ${calc.fmt(e.hives)} hives</div>
    <div class="rc-kv-grid">
      ${kv("Total Honey", `${signed(t.honey, n2)}${ui.getIcon("Honey")}`)}
      ${kv("Total Gross", `${signed(t.gross, fl)}${calc.FLOWER_ICON}`)}
      ${kv("Flower Cost", flowerHtml(t.cost))}
      ${kv("Seed Restock Cost", flowerHtml(t.restock))}
      ${kv("Shrine Cost", `${flowerHtml(t.shrine)}${shrineNames}`)}
      ${calc.feePercent > 0 ? kv("Market Fee", flowerHtml(t.fee)) : ""}
      ${kv("Profit / Hive / Day", `<span class="${perHive >= 0 ? "is-profit" : "is-loss"}">${signed(perHive, fl)}${calc.FLOWER_ICON}</span>`, "rc-kv-wide")}
      ${kv(`Total / ${calc.fmt(e.hives)} Hives / Day`, `<span class="${t.net >= 0 ? "is-profit" : "is-loss"}">${signed(t.net, fl)}${calc.FLOWER_ICON}</span>`, "rc-kv-wide rc-kv-net")}
    </div></div>
  </article>`;
}

function computationBodyHtml() {
  const e = getEcon();
  const t = totalsOf(e);
  return calculatorCardHtml(e) + profitCardHtml(e, t);
}

function boostBodyHtml() {
  const flower = calc.selectedHoneyFlower;
  const subjects = [ {
    name: "Hives",
    icon: ui.getIcon("Beehive")
  }, {
    name: flower,
    icon: flowerNameIcon(flower)
  } ];
  const boosts = calc.BOOSTS.filter(b => b.category === "honey" && b.source !== "skill" && !b.hiddenFromOwnPanel);
  const appliesTo = (b, s) => {
    if (s.name === "Hives") return b.scope === "hiveGlobal";
    if (b.scope === "flowerGlobal") return true;
    return b.scope === "flower" && (b.target || "").toLowerCase() === flower.toLowerCase();
  };
  const html = boostsBySubjectHtml({
    subjects: subjects,
    boosts: boosts,
    appliesTo: appliesTo,
    unit: "plots",
    noteSkip: /./,
    allLabel: "Boost for All"
  });
  return `<div class="rc-pop-hint">Boosts that affect your hives and ${esc(flower)}. Tap a boost to switch it on or off, then press Save.</div>${html || `<div class="rc-empty">No boosts found.</div>`}`;
}

function hivesBodyHtml() {
  const value = hivesDraft == null ? calc.getHiveCount() : hivesDraft;
  return `<div class="rc-pop-hint">Every hive uses the same flower and the same boosts. Change your hive count here, then press Save.</div>
  <label class="rc-node-row guro-frame"><span class="rc-node-icon">${ui.getIcon("Beehive")}</span><span class="rc-node-text"><span class="rc-node-name">Beehive</span><span class="rc-node-used">Used by: Honey, Bee Swarm</span></span><input type="number" min="0" step="1" inputmode="numeric" data-rc-hives value="${value ? value : ""}" placeholder="0"></label>`;
}

function popupTitle() {
  if (popup === "skills") return "Honey Skills";
  if (popup === "boost") return "Honey Boosts";
  if (popup === "hives") return "Hives";
  return "Computation";
}

function popupBodyHtml() {
  if (popup === "boost") return boostBodyHtml();
  if (popup === "hives") return hivesBodyHtml();
  if (popup === "computation") return computationBodyHtml();
  return `<div class="rc-pop-hint">Bees and Flowers skills from the Skill Tree. Changes here also change the Skill Tree. Press Save to apply them.</div><div id="rcSkillSlot"></div>`;
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

function setupBorrowed() {
  if (popup === "skills") {
    savedSkillCategory = calc.skillCategory;
    calc.setSkillCategory("bees");
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
  if (popup === "hives") return `<button type="button" class="rc-save guro-frame" id="rcNodesSave">Save Changes</button>`;
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
  if (popup === "hives") return hivesDraft != null && Number(hivesDraft) !== (calc.getHiveCount() || 0);
  return false;
}

function openPopup(kind) {
  if (popup) return;
  popup = kind;
  hivesDraft = null;
  openMenu = null;
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
  hivesDraft = null;
  openMenu = null;
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
        refreshAll();
      }
    } ]);
    return;
  }
  destroyPopup();
  refreshAll();
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

function saveHives() {
  if (hivesDraft == null) return;
  const v = Math.max(0, Math.floor(Number(hivesDraft) || 0));
  calc.setHiveCount(v);
  prices.invalidateCostCache();
  ui.renderHoneyList();
  calc.updateCalcSummary();
  hivesDraft = null;
  calc.toast("✅ Hive count saved");
  renderOverlayBody();
  refreshResults();
}

function pickFlower(name) {
  if (!calc.FLOWER_VARIETIES[name]) return;
  if (calc.isFlowerVarietySeasonLocked(name)) {
    calc.toast("🔒 That flower is out of season");
    return;
  }
  calc.setSelectedHoneyFlower(name);
  prices.invalidateCostCache();
}

function pickCrop(name) {
  if (!calc.BASE_CROPS[name]) return;
  calc.setSelectedSwarmCrop(name);
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
    if (kind === "crop") pickCrop(value); else pickFlower(value);
    refreshAll();
    return true;
  }
  if (openMenu && !e.target.closest(".rc-dd")) {
    openMenu = null;
    refreshAll();
  }
  return false;
}

function onClick(e) {
  const details = e.target.closest("[data-rc-details]");
  if (details) {
    detailsOpen = !detailsOpen;
    refreshResults();
    return;
  }
  const open = e.target.closest("[data-rc-open]");
  if (open && !open.disabled) openPopup(open.getAttribute("data-rc-open"));
}

function onDocClick(e) {
  if (!host) return;
  if (promptEl && promptEl.contains(e.target)) return;
  if (handleDropdown(e)) return;
  if (!overlayEl) return;
  if (e.target === overlayEl || e.target.closest("[data-rc-close]")) {
    closePopup(false);
    return;
  }
  if (!overlayEl.contains(e.target)) return;
  if (e.target.closest("#rcNodesSave")) {
    saveHives();
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
  if (t && t.dataset && t.dataset.rcHives != null) hivesDraft = t.value === "" ? 0 : Number(t.value);
}

function onKey(e) {
  if ((e.key === "Enter" || e.key === " ") && e.target && e.target.closest && e.target.closest("[data-rc-dd-pick]")) {
    e.preventDefault();
    e.target.closest("[data-rc-dd-pick]").click();
    return;
  }
  if (e.key !== "Escape") return;
  if (promptEl) {
    promptEl.remove();
    promptEl = null;
    return;
  }
  if (openMenu) {
    openMenu = null;
    refreshAll();
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

export function mountHoneyCalculator(root) {
  host = root;
  prices.invalidateCostCache();
  detailsOpen = false;
  openMenu = null;
  syncGemRatio();
  host.addEventListener("click", onClick);
  document.addEventListener("click", onDocClick);
  document.addEventListener("input", onDocInput);
  document.addEventListener("keydown", onKey);
  window.addEventListener("guroBoostsChanged", onBoostsChanged);
  window.addEventListener("guroGemPackChanged", onExternalChange);
  window.addEventListener("guroPricesUpdated", onExternalChange);
  listening = true;
  render();
}

export function unmountHoneyCalculator() {
  prices.invalidateCostCache();
  if (popup) destroyPopup();
  if (promptEl) {
    promptEl.remove();
    promptEl = null;
  }
  if (host) {
    host.removeEventListener("click", onClick);
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
  openMenu = null;
}

export function honeyCalculatorCanLeave() {
  if (!popup) return true;
  if (isPopupDirty()) {
    calc.toast("⚠️ Save your changes first");
    return false;
  }
  destroyPopup();
  return true;
}
