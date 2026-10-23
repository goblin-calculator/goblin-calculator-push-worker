import { ICON_DATA } from "./icon_data.js";
import { FACTION_PET_BOOST_TIERS, runWithSimulatedSetup, ANIMAL_DATA, ASCENSION_RANK_DATA, BASE_CROPS, BASE_CROP_MACHINE, BASE_FRUITS, BASE_GREENHOUSE, BOOSTS, SEASON_EMOJI, boostStrength, boostsConflict, getAnimalCount, getCropSeasons, getFruitSeasons, getPlotCount, simulateGuideRows, FEED_RECIPE, FLOWER_ICON, COIN_ICON, coinsToFlower, RESOURCE_DATA, SKILL_BOOSTS, computeCropMachineBatch, currentSeason, escapeHtml, fmtInt, fmtXp, formatDuration, gatherAllProfitItems, computeGuideResourceFallback, computeResourceFigures, isBoostActive, getSpiceChoiceForAnimalType, getSpiceLickDurationHarvests, computeSpiceFigures, isCropInSeason, isCropMachineUnlocked, isFruitInSeason, isSkillActive, profileBuildFilterMatches, profileGetG } from "./calculator.js";

import { findCosmeticPriceForName, findLiveNftPriceForName, findLivePriceForName } from "./prices.js";

import { dailyProfitGuideSnapshot, getBoostIcon, getIcon } from "./ui.js";

const GUIDE_TABS = [ [ "leveling", "Leveling" ], [ "farming", "Farming" ], [ "mining", "Mining" ], [ "animals", "Animals" ] ];

const FARM_STRATS = {
  balance: {
    label: "Balance Farming",
    tiers: [ "Basic", "Medium", "Advanced" ],
    desc: "A balanced crop setup with strong yield and speed for every crop tier. It uses most of the Crops skill tree, so it suits farms that grow a mix of crops.",
    skills: [ [ "skill_green_thumb", 1 ], [ "skill_young_farmer", 1 ], [ "skill_old_farmer", 1 ], [ "skill_experienced_farmer", 1 ], [ "skill_lauries_gains", 1 ], [ "skill_strong_roots", 1 ], [ "skill_horror_mike", 1 ], [ "skill_acre_farm", 1 ], [ "skill_instant_growth", 1 ], [ "skill_hectare_farm", 1 ] ]
  },
  basic: {
    label: "Basic & Medium Farming",
    tiers: [ "Basic", "Medium" ],
    desc: "Built for Basic and Medium crops. It needs fewer skill points and puts your shards into Hectare Farm for a larger boosted area.",
    skills: [ [ "skill_green_thumb", 1 ], [ "skill_young_farmer", 1 ], [ "skill_experienced_farmer", 1 ], [ "skill_horror_mike", 1 ], [ "skill_coin_swindler", 1 ], [ "skill_hectare_farm", 3 ], [ "skill_instant_growth", 1 ] ]
  },
  advance: {
    label: "Advance Farming",
    tiers: [ "Advanced" ],
    desc: "Built for Advanced crops. It focuses on Old Farmer, Laurie's Gains and Strong Roots, and puts your shards into Acre Farm.",
    skills: [ [ "skill_green_thumb", 1 ], [ "skill_old_farmer", 1 ], [ "skill_bettys_friend", 1 ], [ "skill_strong_roots", 1 ], [ "skill_lauries_gains", 1 ], [ "skill_acre_farm", 3 ], [ "skill_instant_growth", 1 ] ]
  }
};

const FARM_CATEGORIES = [ {
  id: "crops",
  title: "Crops",
  icon: "Sunflower",
  skillCat: "crops",
  boostCat: "crops"
}, {
  id: "fruits",
  title: "Fruits",
  icon: "Apple",
  skillCat: "fruitpatch",
  boostCat: "fruits"
}, {
  id: "greenhouse",
  title: "Greenhouse",
  icon: "Greenhouse",
  skillCat: "greenhouse",
  boostCat: "greenhouse"
}, {
  id: "machine",
  title: "Crop Machine",
  icon: "Crop Machine",
  skillCat: "machine",
  boostCat: "cropmachine"
} ];

const MINING_CATEGORIES = [ {
  id: "Wood",
  title: "Tree",
  icon: "Wood"
}, {
  id: "Stone",
  title: "Stone",
  icon: "Stone"
}, {
  id: "Iron",
  title: "Iron",
  icon: "Iron"
}, {
  id: "Gold",
  title: "Gold",
  icon: "Gold"
}, {
  id: "Crimstone",
  title: "Crimstone",
  icon: "Crimstone"
}, {
  id: "Obsidian",
  title: "Obsidian",
  icon: "Obsidian",
  where: "Lava Pit"
}, {
  id: "Sunstone",
  title: "Sunstone",
  icon: "Sunstone",
  special: "Sunstone is not tradable, so its market profit is not what matters. You spend it to buy nodes and expand your mining, which makes it one of the most valuable resources in the game."
}, {
  id: "Oil",
  title: "Oil",
  icon: "Oil",
  special: "Oil is not tradable, so its market profit is not what matters. It is used in many parts of the game, such as speeding up cooking and unlocking upgrades, which makes it one of the most valuable resources in the game."
} ];

const FREE_TOOLS = {
  Axe: 50,
  Pickaxe: 15,
  "Stone Pickaxe": 5,
  "Iron Pickaxe": 1,
  Rod: 10,
  "Sand Shovel": 5
};

const CONS_KEY = "anim:cons";

const CONS_SKILL_IDS = [ "skill_refiner", "skill_ager" ];

const CONS_BOOST_IDS = [ "vibraphone", "astrolabe", "salt_bottle_onesie" ];

const SPICE_CHOICES = [ [ "none", "None" ], [ "saltLick", "Salt Lick" ], [ "honeyTreat", "Honey Treat" ] ];

const SPICE_LABELS = {
  saltLick: "Salt Lick",
  honeyTreat: "Honey Treat"
};

const ANIMAL_BUILDINGS = {
  chicken: "Hen House",
  cow: "Barn",
  sheep: "Barn"
};

const CROP_TIERS = [ [ "Basic", "Basic" ], [ "Medium", "Medium" ], [ "Advanced", "Advance" ] ];

let farmStrat = "balance";

let farmStratTab = "skills";

const catTabs = {};

export function guideTabs() {
  return GUIDE_TABS;
}

export function setFarmStrat(v) {
  farmStrat = FARM_STRATS[v] ? v : "balance";
}

export function getFarmStrat() {
  return farmStrat;
}

export function setFarmStratTab(v) {
  farmStratTab = v === "boost" ? "boost" : "skills";
}

export function setCatTab(cat, v) {
  catTabs[cat] = v === "boost" ? "boost" : "skills";
}

export function farmStrategyButtons() {
  return Object.keys(FARM_STRATS).map(k => [ k, FARM_STRATS[k].label ]);
}

function row(inner, extra) {
  return `<div class="fd-item-row bg-line${extra ? ` ${extra}` : ""}">${inner}</div>`;
}

const SIM_STORE_KEY = "hl_beginner_sim_v1";

const simDrafts = {};

const simOpen = {};

const simAvail = {};

const simDedOpen = new Set;

const simSecOpen = new Set;

const simMatOpen = new Set;

const MAT_STORE_KEY = "hl_beginner_matmode_v1";

let matModes = loadMatModes();

function loadMatModes() {
  try {
    const raw = JSON.parse(localStorage.getItem(MAT_STORE_KEY) || "null");
    if (raw && typeof raw === "object" && !Array.isArray(raw)) return raw;
  } catch (e) {}
  return {};
}

function persistMatModes() {
  try {
    localStorage.setItem(MAT_STORE_KEY, JSON.stringify(matModes));
  } catch (e) {}
}

let simSaved = loadSimSaved();

function loadSimSaved() {
  try {
    const raw = JSON.parse(localStorage.getItem(SIM_STORE_KEY) || "null");
    if (raw && typeof raw === "object") return raw;
  } catch (e) {}
  return {};
}

function persistSimSaved() {
  try {
    localStorage.setItem(SIM_STORE_KEY, JSON.stringify(simSaved));
  } catch (e) {}
}

function animalDefaultInput(type) {
  const c = getAnimalCount(type);
  const qty = Math.max(0, Math.floor(Number(c.qty) || 0));
  const spice = getSpiceChoiceForAnimalType(type);
  if (qty <= 0) return {
    qty: 0,
    level: 0,
    spice: spice
  };
  return {
    qty: qty,
    level: Math.min(15, Math.max(1, Math.floor(Number(c.level) || 1))),
    spice: spice
  };
}

function animalTypeOfKey(key) {
  return key.indexOf("anim:") === 0 ? key.slice(5) : null;
}

function cloneSel(sel) {
  return {
    s: sel.s.map(t => [ t[0], t[1] ]),
    b: sel.b.slice(),
    q: sel.q ? {
      qty: sel.q.qty,
      level: sel.q.level,
      spice: sel.q.spice || "none"
    } : null
  };
}

function simBase(key) {
  const saved = simSaved[key];
  if (saved && Array.isArray(saved.s) && Array.isArray(saved.b)) return cloneSel({
    s: saved.s,
    b: saved.b,
    q: saved.q || null
  });
  const a = simAvail[key] || {
    skills: [],
    boosts: [],
    defaultOn: false
  };
  return a.defaultOn ? cloneSel({
    s: a.defaultSkills || a.skills,
    b: a.defaultBoosts || a.boosts,
    q: null
  }) : {
    s: [],
    b: [],
    q: null
  };
}

function simNorm(sel) {
  return JSON.stringify({
    s: sel.s.map(t => `${t[0]}:${t[1]}`).sort(),
    b: sel.b.slice().sort(),
    q: sel.q ? [ sel.q.qty, sel.q.level, sel.q.spice || "none" ] : null
  });
}

function simDraft(key) {
  if (!simDrafts[key]) simDrafts[key] = simBase(key);
  return simDrafts[key];
}

function simDirty(key) {
  return simNorm(simDraft(key)) !== simNorm(simBase(key));
}

export function simRegister(key, skills, boosts, defaultOn, defaultBoosts, defaultSkills, ownedSkills) {
  if (simDrafts[key] && !simDirty(key)) delete simDrafts[key];
  simAvail[key] = {
    skills: skills,
    boosts: boosts,
    defaultOn: defaultOn,
    defaultBoosts: defaultBoosts || null,
    defaultSkills: defaultSkills || null,
    owned: ownedSkills || []
  };
}

function isManualBoost(b) {
  if (!b) return false;
  if (b.composterFertilizer || b.fertilizer || b.saltFertilizer || b.limitedBoostName || b.guardianSeason) return true;
  return /fertili[sz]er|totem|sunshower|bountiful harvest|power hour/i.test(b.name || "");
}

function defaultBoostIds(list) {
  const active = BOOSTS.filter(b => isBoostActive(b.id));
  const ranked = list.filter(b => !isManualBoost(b)).sort((a, b) => boostStrength(b) - boostStrength(a));
  const chosen = [];
  ranked.forEach(b => {
    if (chosen.some(c => boostsConflict(c, b))) return;
    if (active.some(o => boostsConflict(o, b) && boostStrength(o) >= boostStrength(b))) return;
    chosen.push(b);
  });
  return list.filter(b => chosen.indexOf(b) >= 0).map(b => b.id);
}

export function simEffective(key) {
  const base = simBase(key);
  const a = simAvail[key] || {
    skills: [],
    boosts: []
  };
  const rankOf = new Map(a.skills.map(t => [ t[0], t[1] ]));
  (a.owned || []).forEach(t => {
    if (!rankOf.has(t[0])) rankOf.set(t[0], t[1]);
  });
  const boostIds = new Set(a.boosts);
  const ownedIds = new Set((a.owned || []).map(t => t[0]));
  const own = {
    skills: base.s.filter(t => t[1] > 0 && rankOf.has(t[0])).map(t => [ t[0], simClampRank(t[0], t[1], rankOf.get(t[0])) ]),
    off: base.s.filter(t => !t[1] && ownedIds.has(t[0])).map(t => t[0]),
    boosts: base.b.filter(id => boostIds.has(id)),
    q: base.q
  };
  if (key.indexOf("anim:") !== 0 || key === CONS_KEY) return own;
  const cons = simEffective(CONS_KEY);
  const have = new Set(own.skills.map(t => t[0]));
  cons.skills.forEach(t => {
    if (!have.has(t[0])) own.skills.push(t);
  });
  cons.boosts.forEach(id => {
    if (own.boosts.indexOf(id) < 0) own.boosts.push(id);
  });
  cons.off.forEach(id => {
    if (own.off.indexOf(id) < 0 && !have.has(id)) own.off.push(id);
  });
  return own;
}

function simCommit(key) {
  simSaved[key] = cloneSel(simDraft(key));
  persistSimSaved();
}

export function simRankMax(id) {
  return ASCENSION_RANK_DATA[id] ? 3 : 1;
}

function simClampRank(id, picked, suggested) {
  const max = simRankMax(id);
  if (max <= 1) return suggested;
  return Math.min(max, Math.max(1, Math.floor(Number(picked) || suggested || 1)));
}

export function simRankOf(key, id, suggested) {
  const hit = simDraft(key).s.find(t => t[0] === id);
  if (!hit || !hit[1]) return suggested;
  return simClampRank(id, hit[1], suggested);
}

export function simRankPicker(key, id, suggested, ownedAt) {
  if (simRankMax(id) <= 1) return "";
  const cur = simRankOf(key, id, suggested);
  const pips = [ 1, 2, 3 ].map(r => `<button type="button" class="fd-lb-tab bg-rank-pip${r === cur ? " active" : ""}" data-bg-rank="${escapeHtml(key)}|${escapeHtml(id)}|${r}|${suggested}|${ownedAt || 0}" aria-label="Rank ${r}">${r}</button>`).join("");
  return `<span class="bg-rank-picker" data-bg-rankbox="${escapeHtml(key)}|${escapeHtml(id)}" data-cur="${cur}" data-own="${ownedAt || 0}"><span class="bg-rank-label">Rank</span>${pips}</span>`;
}

export function simCheck(key, kind, id, rank) {
  const d = simDraft(key);
  const on = kind === "s" ? d.s.some(t => t[0] === id) : d.b.indexOf(id) >= 0;
  return `<label class="bg-sim-check"><input type="checkbox" data-bg-sel="${escapeHtml(key)}|${kind}|${escapeHtml(id)}|${rank}"${on ? " checked" : ""}></label>`;
}

export function simOwnedCheck(key, id) {
  const off = simDraft(key).s.some(t => t[0] === id && !t[1]);
  return `<label class="bg-sim-check"><input type="checkbox" data-bg-sel="${escapeHtml(key)}|so|${escapeHtml(id)}|1"${off ? "" : " checked"}></label>`;
}

export function simOilCheck(key, id) {
  const d = simDraft(key);
  const off = d.b.indexOf(`oiloff:${id}`) >= 0;
  return `<label class="bg-sim-check"><input type="checkbox" data-bg-sel="${escapeHtml(key)}|o|${escapeHtml(id)}|1"${off ? "" : " checked"}></label>`;
}

export const BG_PET_FLAG = "petexp:";

export const BG_VIP_FLAG = "vipaccess";

export function simVipCheck(key) {
  const on = simDraft(key).b.indexOf(BG_VIP_FLAG) >= 0;
  return `<label class="bg-sim-check"><input type="checkbox" data-bg-sel="${escapeHtml(key)}|v|vip|1"${on ? " checked" : ""}></label>`;
}

export function petOptions() {
  return [ 0 ].concat(FACTION_PET_BOOST_TIERS.map(t => Math.round(t.boost * 100)));
}

export function petDefault() {
  const o = petOptions();
  return o[o.length - 1];
}

export function petFlagIds() {
  return petOptions().map(v => BG_PET_FLAG + v);
}

export function simPetValue(key) {
  const hit = simDraft(key).b.find(x => String(x).indexOf(BG_PET_FLAG) === 0);
  return hit ? Number(String(hit).slice(BG_PET_FLAG.length)) : petDefault();
}

export function simPetButtons(key) {
  const cur = simPetValue(key);
  const btns = petOptions().map(v => `<button type="button" class="fd-lb-tab bg-pet-pip${v === cur ? " active" : ""}" data-bg-pet="${escapeHtml(key)}|${v}">${v ? `<span class="bg-pet-val">+${v}%</span><span class="bg-pet-unit">EXP</span>` : "None"}</button>`).join("");
  return `<div class="bg-pet-row">${btns}</div>`;
}

export function simButtons(key) {
  const dirty = simDirty(key);
  return `<span class="bg-sim-actions"><button type="button" class="fd-lb-tab bg-sim-btn" data-bg-prev="${escapeHtml(key)}">Preview</button><button type="button" class="fd-lb-tab bg-sim-btn bg-sim-save${dirty ? "" : " is-faded"}" data-bg-save="${escapeHtml(key)}"${dirty ? "" : " disabled"}>Save</button></span>`;
}

export function simUnsavedNote(key) {
  return `<div class="bg-mini bg-sim-unsaved" data-bg-unsaved="${escapeHtml(key)}"${simDirty(key) ? "" : ' style="display:none"'}>You have unsaved changes. Press Save to apply them to the simulation.</div>`;
}

function simRefreshUnsaved(key) {
  const dirty = simDirty(key);
  document.querySelectorAll("[data-bg-unsaved]").forEach(el => {
    if (el.getAttribute("data-bg-unsaved") === key) el.style.display = dirty ? "" : "none";
  });
  document.querySelectorAll("[data-bg-save]").forEach(el => {
    if (el.getAttribute("data-bg-save") !== key) return;
    el.disabled = !dirty;
    el.classList.toggle("is-faded", !dirty);
  });
}

function simNum(v) {
  const n = Number(v) || 0;
  if (Math.abs(n) >= 1e3) return fmtInt(n);
  return String(Math.round(n * 100) / 100);
}

function dedText(v) {
  return v > 0 ? `-${flower(v)}` : `0${FLOWER_ICON}`;
}

function matUnitText(m) {
  if (m.fixed && m.mode === "gem") return `Gem-only @ ${flower(coinsToFlower(m.unitCost))}/u`;
  const price = m.mode === "buy" ? flower(coinsToFlower(m.unitCost)) : `${fmtInt(m.unitCost)}${COIN_ICON}`;
  return `${m.mode === "buy" ? "Buy" : "Collect"} @ ${price}/u`;
}

function matControlHtml(m) {
  if (m.mode === "gem") return `<span class="bg-mat-fixed">gem-only</span>`;
  if (m.fixed) return `<span class="bg-mat-fixed">not tradable</span>`;
  const scope = escapeHtml(m.scope);
  const name = escapeHtml(m.name);
  return `<button type="button" class="bg-mat-btn bg-mat-collect${m.mode === "collect" ? " active" : ""}" data-bg-mode="${scope}|${name}|collect">Collect</button><button type="button" class="bg-mat-btn bg-mat-buy${m.mode === "buy" ? " active" : ""}" data-bg-mode="${scope}|${name}|buy">Buy</button>`;
}

function simMaterialsHtml(r, id) {
  const list = r.materials || [];
  if (!list.length || r.animalExp && r.animalExp.freeFeed) return "";
  const feed = list[0].scope === "AnimalFeed";
  const rows = list.map(m => `<div class="bg-mat-row"><span class="bg-mat-icon">${getIcon(m.name)}</span><span class="bg-mat-main"><span class="bg-mat-name">${escapeHtml(m.name)} ×${simNum(m.qty)}</span><span class="bg-mat-meta">${matUnitText(m)}</span></span>${matControlHtml(m)}</div>`).join("");
  return `<button type="button" class="bg-sim-stat bg-sim-ded-btn" data-bg-mat="${escapeHtml(id)}"><span>${feed ? "Feed Materials" : "Tool Materials"}</span><span class="bg-sim-ded-val"><img class="bg-sim-chev" src="${ICON_DATA["chevron_down.png"]}" alt=""></span></button><div class="bg-sim-matlist">${rows}</div>`;
}

const ANIMAL_TOOL_LABELS = {
  pettingHand: "Petting Hand",
  brush: "Brush",
  musicBox: "Music Box"
};

function animalPlural(label, count) {
  const name = String(label || "").toLowerCase();
  return count === 1 || /sheep$/.test(name) ? name : name + "s";
}

function simSubRow(label, value) {
  return `<div class="bg-sim-stat bg-sim-sub"><span>${label}</span><span>${value}</span></div>`;
}

function animalProductRows(r, key) {
  return (r.products || []).map(pr => simSubRow(`${getIcon(pr.name)} ${escapeHtml(pr.name)}`, simNum(pr[key]))).join("");
}

function animalSecHtml(id, key, title, inner, open) {
  const sid = escapeHtml(`${id}|${key}`);
  return `<button type="button" class="bg-sim-stat bg-sim-ded-btn bg-sim-sec-btn${open ? " is-sec-open" : ""}" data-bg-sec="${sid}"><span>${title}</span><span class="bg-sim-ded-val"><img class="bg-sim-chev" src="${ICON_DATA["chevron_down.png"]}" alt=""></span></button><div class="bg-sim-sec${open ? " is-sec-open" : ""}">${inner}</div>`;
}

function animalExpHtml(r, animalIcon, id) {
  const x = r.animalExp;
  if (!x || x.freeFeed) return "";
  const heads = `${fmtInt(r.count)} ${animalPlural(x.animalLabel, r.count)}`;
  const each = escapeHtml(x.animalLabel);
  const feedIcon = getIcon(x.feedName);
  const mult = x.feedXpMult !== 1 ? ` (${fmtXp(x.feedXpBase)} × ${fmtXp(x.feedXpMult)})` : "";
  const tools = x.tools.map(t => `<div class="bg-sim-stat bg-sim-sub"><span>${ANIMAL_TOOL_LABELS[t.key] || escapeHtml(t.key)} +${fmtXp(t.xpEach)} EXP ×${fmtXp(t.count)}</span><span>${t.owned ? `+${fmtXp(t.xp)} EXP` : "not owned"}</span></div>`).join("");
  const feedInner = `<div class="bg-sim-stat"><span>${feedIcon} Feed EXP / feed${mult}</span><span>${fmtXp(x.feedXp)} EXP</span></div><div class="bg-sim-stat"><span>Exp needed for each ${each}</span><span>${fmtXp(x.expNeeded)} EXP</span></div><div class="bg-sim-stat"><span>Feed needed for each ${each}</span><span>×${fmtXp(x.feedNeeded)}</span></div><div class="bg-sim-stat"><span>Total ${feedIcon} ${escapeHtml(x.feedName)} needed for ${fmtInt(r.count)} ${animalIcon || ""} ${each}</span><span>×${simNum(x.feedTotal)}${feedIcon}</span></div><div class="bg-sim-stat bg-sim-strong"><span>Animal EXP / 24h (all ${heads})</span><span>${fmtXp(x.day)} EXP</span></div><div class="bg-sim-stat"><span>Animal EXP / 24h (each ${each})</span><span>${fmtXp(x.dayEach)} EXP</span></div>`;
  const loveInner = `<div class="bg-sim-stat"><span>Affection Tools (${heads} × ${fmtInt(x.opportunities)} love actions = ${fmtInt(x.capacity)} per cycle)</span><span>+${fmtXp(x.loveCycle)} EXP</span></div>${tools}`;
  return animalSecHtml(id, "feed", "Feed & Exp", feedInner, simSecOpen.has(`${id}|feed`)) + animalSecHtml(id, "love", "Affection", loveInner, simSecOpen.has(`${id}|love`));
}

function simRowHtml(r, key, meta) {
  const id = `${key}|${r.name}`;
  const seasons = (meta.seasons || []).map(x => SEASON_EMOJI[x] || "").join("");
  const pos = r.net >= 0;
  const animalList = !!(r.animalExp && r.products && r.products.length);
  const lines = [ [ "Cost", r.cost ] ];
  if (r.consumables !== undefined) lines.push([ "Consumables", r.consumables ]);
  lines.push([ "Restock cost", r.restock ], [ `Shrine cost${r.shrineNames && r.shrineNames.length ? ` (${r.shrineNames.map(escapeHtml).join(", ")})` : ""}`, r.shrine ]);
  if (r.fee > 0) lines.push([ "Sell fee", r.fee ]);
  const ded = lines.map(l => `<div class="bg-sim-stat bg-sim-sub"><span>${l[0]}</span><span>${dedText(l[1])}</span></div>`).join("");
  const counts = (r.counts || []).map(c => `<div class="bg-sim-stat${c.sub ? " bg-sim-sub bg-sim-count-sub" : " bg-sim-count"}"><span>${escapeHtml(c.label)}</span><span>${fmtInt(c.value)}</span></div>`).join("");
  const lock = meta.locked ? `<span class="bg-label bg-loss">locked</span>` : "";
  const sub = meta.sub ? `<span class="bg-why">${escapeHtml(meta.sub)}</span>` : "";
  return `<div class="fd-item-row bg-line bg-sim-row${simDedOpen.has(id) ? " is-open" : ""}${simMatOpen.has(id) ? " is-mat-open" : ""}"><div class="bg-sim-top"><span class="fd-item-main">${meta.icon || ""} <strong>${escapeHtml(meta.label || r.name)}</strong>${seasons ? `<span class="bg-sim-seasons">${seasons}</span>` : ""}${lock}${sub}</span></div>${counts}${r.timeSec > 0 ? `<div class="bg-sim-stat"><span>${r.animalExp ? "Sleep Time" : "Growth Time"}</span><span>${formatDuration(r.timeSec)}</span></div>` : ""}<div class="bg-sim-stat"><span>Market Price</span><span>${flower(r.price)}</span></div>${animalList ? `<div class="bg-sim-stat"><span>Yield/Harvest</span><span></span></div>${animalProductRows(r, "perCycle")}` : `<div class="bg-sim-stat"><span>Yield/Harvest</span><span>${simNum(r.perCycle)}</span></div>`}<div class="bg-sim-stat"><span>24h Cycles</span><span>${r.animalExp ? fmtInt(Math.max(1, Math.round(r.cycles))) : simNum(r.cycles)}</span></div><div class="bg-sim-stat bg-sim-strong"><span>24h Yield</span><span>${animalList ? "" : simNum(r.yield24h)}</span></div>${animalList ? animalProductRows(r, "yield24h") : ""}${animalExpHtml(r, meta.icon, id)}<div class="bg-sim-stat"><span>Gross</span><span>${flower(r.gross)}</span></div><button type="button" class="bg-sim-stat bg-sim-ded-btn" data-bg-ded="${escapeHtml(id)}"><span>Total Deductions</span><span class="bg-sim-ded-val">${dedText(r.deductions)}<img class="bg-sim-chev" src="${ICON_DATA["chevron_down.png"]}" alt=""></span></button><div class="bg-sim-ded">${ded}</div>${simMaterialsHtml(r, id)}<div class="bg-sim-stat bg-sim-strong bg-sim-net"><span>Net</span><span class="${pos ? "bg-sim-pos" : "bg-sim-neg"}">${pos ? "+" : ""}${flower(r.net)}</span></div></div>`;
}

function simTierHtml(title, rowsHtml) {
  return `<div class="fd-container is-own bg-sim-tier"><div class="fd-container-head"><span class="fd-container-title">${escapeHtml(title)}</span></div>${rowsHtml || `<div class="fd-empty-note">Nothing to show.</div>`}</div>`;
}

function simBox(key, verb, body, extra, intro) {
  const sel = simEffective(key);
  const sk = sel.skills.length;
  const bo = sel.boosts.filter(id => String(id).indexOf("oiloff:") !== 0).length;
  const applied = `Applied: ${fmtInt(sk)} skill${sk === 1 ? "" : "s"} and ${fmtInt(bo)} boost${bo === 1 ? "" : "s"}.${extra ? ` ${extra}` : ""}`;
  const text = intro || `This simulation estimates the daily profit of each item below, as if you only ${verb} that one item for the full 24 hours and kept restocking it. In real play you can switch to another item once a stock runs out. Comparing each item on its own shows which one earns the most with your suggested skills and boosts.`;
  return `<div class="fd-container is-own bg-cat bg-sim-box"><div class="fd-container-head bg-sim-head"><span class="fd-container-title">Simulation</span><button type="button" class="fd-lb-tab bg-sim-close" data-bg-close="${escapeHtml(key)}" aria-label="Close"><img src="${ICON_DATA["close.png"]}" alt=""></button></div><div class="bg-sim-text">${text}</div><div class="bg-mini bg-sim-applied">${applied}</div>${body}</div>`;
}

let levelSimRenderer = null;

export function setLevelSimRenderer(fn) {
  levelSimRenderer = typeof fn === "function" ? fn : null;
}

export function levelSimBox(key, body, extra, intro) {
  return simBox(key, "", body, extra, intro);
}

function simSetup(key) {
  const sel = simEffective(key);
  return {
    skills: sel.skills,
    off: sel.off,
    boosts: sel.boosts,
    modes: matModes
  };
}

function simPlotsNote() {
  const n = getPlotCount();
  return `Using ${n > 0 ? fmtInt(n) : "1"} crop plot${n > 1 ? "s" : ""}.`;
}

function simCropsBox(key) {
  const rows = simulateGuideRows(simSetup(key), {
    kind: "crop",
    names: Object.keys(BASE_CROPS)
  });
  const cols = CROP_TIERS.map(t => {
    const list = rows.filter(r => (BASE_CROPS[r.name] || {}).tier === t[0]).sort((a, b) => b.net - a.net);
    return simTierHtml(t[1], list.map(r => simRowHtml(r, key, {
      icon: getIcon(r.name),
      seasons: getCropSeasons(r.name)
    })).join(""));
  }).join("");
  return simBox(key, "grow", `<div class="bg-sim-cols">${cols}</div>`, simPlotsNote());
}

function simListBox(key, verb, title, kind, names, metaFor, extra) {
  const rows = simulateGuideRows(simSetup(key), {
    kind: kind,
    names: names
  }).sort((a, b) => b.net - a.net);
  const html = rows.map(r => simRowHtml(r, key, metaFor(r))).join("");
  return simBox(key, verb, `<div class="bg-sim-single">${simTierHtml(title, `<div class="bg-sim-list">${html}</div>`)}</div>`, extra);
}

function simResourceBox(key, cat) {
  const rows = simulateGuideRows(simSetup(key), {
    kind: "resource",
    names: [ cat.id ]
  });
  const html = rows.map(r => simRowHtml(r, key, {
    icon: getIcon(cat.icon) || "",
    label: cat.title
  })).join("");
  const special = cat.special ? `<div class="bg-mini">${escapeHtml(cat.special)}</div>` : "";
  const body = html ? `<div class="bg-sim-single">${simTierHtml(cat.title, `<div class="bg-sim-list">${html}</div>`)}</div>${special}` : `<div class="fd-empty-note">There is no simulation data for ${escapeHtml(cat.title.toLowerCase())} yet.</div>`;
  return simBox(key, "mine", body, "");
}

function simAnimalBox(key, type, label) {
  const sel = simEffective(key);
  const q = sel.q || animalDefaultInput(type);
  const spice = q.spice || "none";
  const rows = simulateGuideRows(Object.assign({}, simSetup(key), {
    spice: {
      [type]: spice
    }
  }), {
    kind: "animal",
    names: [ type ],
    qty: q.qty,
    level: q.level
  });
  const html = rows.map(r => simRowHtml(r, key, {
    icon: getIcon(label) || "",
    label: label,
    sub: `${fmtInt(q.qty)} ${label.toLowerCase()}${q.qty === 1 ? "" : "s"} at level ${fmtInt(Math.max(1, q.level))}${SPICE_LABELS[spice] ? ` · ${SPICE_LABELS[spice]}` : ""}`
  })).join("");
  const note = q.qty > 0 ? "" : `<div class="bg-mini"><strong>Enter the quantity of ${escapeHtml(label.toLowerCase())} you want to simulate</strong> in the box above, then press Save.</div>`;
  return simBox(key, "raise", `<div class="bg-sim-single">${simTierHtml(label, `<div class="bg-sim-list">${html}</div>`)}</div>${note}`, "");
}

export function simResultHtml(key, cat) {
  if (!simOpen[key]) return "";
  const inner = simResultInner(key, cat);
  return inner ? `<div class="bg-sim-overlay" data-bg-close="${escapeHtml(key)}"><div class="bg-sim-modal" role="dialog" aria-modal="true">${inner}</div></div>` : "";
}

function simResultInner(key, cat) {
  if (key.indexOf("lvl:") === 0) return levelSimRenderer ? levelSimRenderer(key, simEffective(key)) : "";
  if (key.indexOf("strat:") === 0 || key === "cat:crops") return simCropsBox(key);
  if (key === "cat:fruits") return simListBox(key, "grow", "Fruits", "fruit", Object.keys(BASE_FRUITS), r => ({
    icon: getIcon(r.name),
    seasons: getFruitSeasons(r.name)
  }), "");
  if (key === "cat:greenhouse") return simListBox(key, "grow", "Greenhouse", "greenhouse", Object.keys(BASE_GREENHOUSE), r => ({
    icon: getIcon(r.name)
  }), "");
  if (key === "cat:machine") return simListBox(key, "run", "Crop Machine", "machine", Object.keys(BASE_CROP_MACHINE), r => ({
    icon: getIcon(r.name),
    seasons: getCropSeasons(r.name),
    locked: r.locked
  }), "Each row runs full packs of that crop back to back for 24 hours.");
  if (key.indexOf("mine:") === 0) return simResourceBox(key, cat);
  if (key === CONS_KEY) return simConsumablesBox(key);
  if (key.indexOf("anim:") === 0) return simAnimalBox(key, animalTypeOfKey(key), cat.title);
  return "";
}

function animalInputsHtml(key, type, label) {
  const q = simDraft(key).q || animalDefaultInput(type);
  const name = escapeHtml(label);
  const spice = q.spice || "none";
  return `<div class="bg-inputs bg-sim-inputs"><label class="bg-field"><span>Qty of ${name}</span><input type="number" min="0" max="9999" inputmode="numeric" class="fdm-count-input" data-bg-ain="${escapeHtml(type)}|qty" value="${q.qty}"></label><label class="bg-field"><span>Level of each ${name}</span><input type="number" min="0" max="15" inputmode="numeric" class="fdm-count-input" data-bg-ain="${escapeHtml(type)}|level" value="${q.level}"></label></div>`;
}

function scrollHostOf(el) {
  let n = el;
  while (n && n !== document.body) {
    const st = window.getComputedStyle(n);
    if (/(auto|scroll)/.test(st.overflowY) && n.scrollHeight > n.clientHeight) return n;
    n = n.parentElement;
  }
  return document.scrollingElement || document.documentElement;
}

let simRefresh = null;

function simCloseAll() {
  const open = Object.keys(simOpen).filter(k => simOpen[k]);
  if (!open.length || !simRefresh) return false;
  open.forEach(k => {
    simOpen[k] = false;
  });
  simRefresh();
  return true;
}

if (typeof document !== "undefined") {
  document.addEventListener("keydown", e => {
    if (e.key === "Escape") simCloseAll();
  });
}

export function handleGuideClick(e, refresh) {
  simRefresh = refresh;
  const closer = e.target.closest("[data-bg-close]");
  if (closer && (closer.tagName === "BUTTON" || e.target === closer)) {
    const host = scrollHostOf(closer);
    const top = host.scrollTop;
    simOpen[closer.dataset.bgClose] = false;
    refresh();
    host.scrollTop = top;
    return true;
  }
  const petBtn = e.target.closest("[data-bg-pet]");
  if (petBtn) {
    const pp = petBtn.dataset.bgPet.split("|");
    const pkey = pp[0];
    const pval = Number(pp[1]) || 0;
    const pd = simDraft(pkey);
    pd.b = pd.b.filter(x => String(x).indexOf(BG_PET_FLAG) !== 0);
    if (pval !== petDefault()) pd.b.push(BG_PET_FLAG + pval);
    const prow = petBtn.parentElement;
    if (prow) prow.querySelectorAll("[data-bg-pet]").forEach(el => el.classList.toggle("active", el === petBtn));
    simRefreshUnsaved(pkey);
    return true;
  }
  const rankBtn = e.target.closest("[data-bg-rank]");
  if (rankBtn) {
    const p = rankBtn.dataset.bgRank.split("|");
    const rkey = p[0];
    const rid = p[1];
    const picked = Number(p[2]) || 1;
    const suggested = Number(p[3]) || 1;
    const ownedAt = Number(p[4]) || 0;
    const host = scrollHostOf(rankBtn);
    const top = host.scrollTop;
    const d = simDraft(rkey);
    d.s = d.s.filter(t => t[0] !== rid);
    if (!(ownedAt && picked <= ownedAt)) d.s.push([ rid, simClampRank(rid, picked, suggested) ]);
    refresh();
    if (host.isConnected) host.scrollTop = top;
    return true;
  }
  const prev = e.target.closest("[data-bg-prev]");
  if (prev) {
    const host = scrollHostOf(prev);
    const top = host.scrollTop;
    simOpen[prev.dataset.bgPrev] = true;
    refresh();
    host.scrollTop = top;
    return true;
  }
  const save = e.target.closest("[data-bg-save]");
  if (save) {
    const key = save.dataset.bgSave;
    if (save.disabled || !simDirty(key)) return true;
    const host = scrollHostOf(save);
    const top = host.scrollTop;
    const chip = document.createElement("div");
    chip.className = "bg-sim-saving";
    chip.innerHTML = `<span class="bg-sim-spin"></span><span class="bg-sim-saving-text">Saving...</span>`;
    document.body.appendChild(chip);
    save.disabled = true;
    save.classList.add("is-faded");
    setTimeout(() => {
      simCommit(key);
      refresh();
      host.scrollTop = top;
      chip.classList.add("is-done");
      chip.innerHTML = `<span class="bg-sim-tick">✓</span><span class="bg-sim-saving-text">Saved</span>`;
      setTimeout(() => chip.remove(), 900);
    }, 700);
    return true;
  }
  const modeBtn = e.target.closest("[data-bg-mode]");
  if (modeBtn && modeBtn.dataset.bgMode.indexOf("|") >= 0) {
    const parts = modeBtn.dataset.bgMode.split("|");
    const mode = parts.pop();
    const mkey = `${parts[0]}:${parts.slice(1).join("|")}`;
    if (mode !== "collect" && mode !== "buy") return true;
    const modal = modeBtn.closest(".bg-sim-modal");
    const modalTop = modal ? modal.scrollTop : 0;
    const host = scrollHostOf(modeBtn);
    const top = host.scrollTop;
    matModes[mkey] = mode;
    persistMatModes();
    refresh();
    const nextModal = document.querySelector(".bg-sim-modal");
    if (nextModal) nextModal.scrollTop = modalTop;
    if (host.isConnected) host.scrollTop = top;
    return true;
  }
  const matBtn = e.target.closest("[data-bg-mat]");
  if (matBtn) {
    const id = matBtn.dataset.bgMat;
    const rowEl = matBtn.closest(".bg-sim-row");
    const open = !simMatOpen.has(id);
    if (open) simMatOpen.add(id); else simMatOpen.delete(id);
    if (rowEl) rowEl.classList.toggle("is-mat-open", open);
    return true;
  }
  const sec = e.target.closest("[data-bg-sec]");
  if (sec) {
    const id = sec.dataset.bgSec;
    const open = !simSecOpen.has(id);
    if (open) simSecOpen.add(id); else simSecOpen.delete(id);
    sec.classList.toggle("is-sec-open", open);
    const body = sec.nextElementSibling;
    if (body) body.classList.toggle("is-sec-open", open);
    return true;
  }
  const ded = e.target.closest("[data-bg-ded]");
  if (ded) {
    const id = ded.dataset.bgDed;
    const rowEl = ded.closest(".bg-sim-row");
    const open = !simDedOpen.has(id);
    if (open) simDedOpen.add(id); else simDedOpen.delete(id);
    if (rowEl) rowEl.classList.toggle("is-open", open);
    return true;
  }
  return false;
}

export function handleGuideChange(e) {
  const cb = e.target.closest("[data-bg-sel]");
  if (!cb) return false;
  const parts = cb.dataset.bgSel.split("|");
  const key = parts[0];
  const kind = parts[1];
  const id = parts[2];
  let rank = Number(parts[3]) || 1;
  if (kind === "s") {
    const box = Array.from(document.querySelectorAll("[data-bg-rankbox]")).find(el => el.getAttribute("data-bg-rankbox") === `${key}|${id}`);
    if (box) {
      const own = Number(box.dataset.own) || 0;
      rank = Number(box.dataset.cur) || rank;
      if (own && rank <= own) rank = Math.min(3, own + 1);
      box.dataset.cur = String(rank);
      box.querySelectorAll(".bg-rank-pip").forEach((el, i) => el.classList.toggle("active", i + 1 === rank));
    }
  }
  const d = simDraft(key);
  if (kind === "so") {
    d.s = d.s.filter(t => t[0] !== id);
    if (!cb.checked) d.s.push([ id, 0 ]);
    const ownBox = Array.from(document.querySelectorAll("[data-bg-rankbox]")).find(el => el.getAttribute("data-bg-rankbox") === `${key}|${id}`);
    if (ownBox) {
      const own = Number(ownBox.dataset.own) || 1;
      ownBox.dataset.cur = String(own);
      ownBox.querySelectorAll(".bg-rank-pip").forEach((el, i) => el.classList.toggle("active", i + 1 === own));
    }
  } else if (kind === "s") {
    d.s = d.s.filter(t => t[0] !== id);
    if (cb.checked) d.s.push([ id, rank ]);
  } else if (kind === "o") {
    const flag = `oiloff:${id}`;
    d.b = d.b.filter(x => x !== flag);
    if (!cb.checked) d.b.push(flag);
  } else if (kind === "v") {
    d.b = d.b.filter(x => x !== BG_VIP_FLAG);
    if (cb.checked) d.b.push(BG_VIP_FLAG);
  } else {
    d.b = d.b.filter(x => x !== id);
    if (cb.checked) {
      const me = BOOSTS.find(b => b.id === id);
      d.b = d.b.filter(x => !boostsConflict(me, BOOSTS.find(b => b.id === x)));
      d.b.push(id);
      document.querySelectorAll("[data-bg-sel]").forEach(el => {
        const p = el.dataset.bgSel.split("|");
        if (p[0] !== key || p[1] !== "b" || p[2] === id) return;
        if (boostsConflict(me, BOOSTS.find(b => b.id === p[2]))) el.checked = false;
      });
    }
  }
  if (kind === "s" || kind === "so") refreshBoostFx(key);
  simRefreshUnsaved(key);
  return true;
}

export function handleGuideInput(e) {
  const el = e.target.closest("[data-bg-ain]");
  if (!el) return false;
  const parts = el.dataset.bgAin.split("|");
  const type = parts[0];
  const field = parts[1];
  const key = `anim:${type}`;
  const d = simDraft(key);
  const cur = d.q || animalDefaultInput(type);
  const raw = Math.floor(Number(el.value) || 0);
  const next = {
    qty: cur.qty,
    level: cur.level,
    spice: cur.spice || "none"
  };
  if (field === "spice") next.spice = el.value === "saltLick" || el.value === "honeyTreat" ? el.value : "none"; else if (field === "qty") next.qty = Math.max(0, Math.min(9999, raw)); else next.level = Math.max(0, Math.min(15, raw));
  const def = animalDefaultInput(type);
  d.q = next.qty === def.qty && next.level === def.level && next.spice === def.spice ? null : next;
  simRefreshUnsaved(key);
  return true;
}

function flower(v) {
  const n = Number(v) || 0;
  const a = Math.abs(n);
  const text = a >= 100 ? fmtInt(n) : a >= 1 ? n.toFixed(2) : n.toFixed(4);
  return `${text}${FLOWER_ICON}`;
}

function boostPrice(name) {
  const finders = [ findLiveNftPriceForName, findCosmeticPriceForName, findLivePriceForName ];
  for (const fn of finders) {
    try {
      const v = Number(fn(name));
      if (v > 0) return v;
    } catch (e) {}
  }
  return 0;
}

function skillById(id) {
  return SKILL_BOOSTS.find(s => s.id === id) || null;
}

function ownedRank(s) {
  const g = profileGetG();
  const map = g && g.bumpkin && g.bumpkin.skills && typeof g.bumpkin.skills === "object" ? g.bumpkin.skills : {};
  const byName = Number(map[s.name]) || 0;
  if (byName > 0) return byName;
  return isSkillActive(s.id) ? 1 : 0;
}

function skillWhere(s) {
  const cat = s.skillCategory || "";
  return `Skill tree: ${cat.charAt(0).toUpperCase()}${cat.slice(1)} · Tier ${s.skillTier}`;
}

function trimNum(v) {
  return String(Math.round(Math.abs(v) * 1e4) / 1e4);
}

function signedNum(v) {
  return `${v < 0 ? "-" : "+"}${trimNum(v)}`;
}

function skillNoteAtRank(s, rank) {
  const base = s.note || "";
  const data = ASCENSION_RANK_DATA[s.id];
  const r = Math.min(Math.max(Number(rank) || 1, 1), 3);
  if (!data || r <= 1) return base;
  if (s.scope === "tierEffects" && data.values && !Array.isArray(data.values)) {
    const at = key => data.values[`tierEffects.${key}`][r - 1];
    const adv = at("Advanced");
    const bas = at("Basic");
    if (adv > 0) return `${signedNum(adv)} Advanced crop yield / ${signedNum(bas)} Basic & Medium crop yield (stacks with Hectare Farm)`;
    return `${signedNum(bas)} Basic & Medium crop yield / ${signedNum(adv)} Advanced crop yield (stacks with Acre Farm)`;
  }
  if (!Array.isArray(data.values)) return base;
  const v = data.values[r - 1];
  let note = base;
  const size = Array.isArray(s.aoeSizeByRank) ? s.aoeSizeByRank[r - 1] : 0;
  if (size) note = note.replace(/\d+x\d+ \(\d+ plots\)/, `${size}x${size} (${size * size} plots)`);
  if (s.id === "skill_chonky_scarecrow") return v > 0 ? `${note}; ${signedNum(v)} Basic crop yield inside the area` : note;
  if (data.field === "extraYieldAdd") return note.replace(/additional [+-]?[\d.]+/, `additional ${signedNum(v)}`);
  if (data.field === "yieldAdd") return note.replace(/^[+-]?[\d.]+/, signedNum(v));
  if (data.field === "timeMult") return note.replace(/^-[\d.]+%/, `-${trimNum((1 - v) * 100)}%`);
  return base;
}

let skillLevelLookup = null;

export function setSkillLevelLookup(fn) {
  skillLevelLookup = typeof fn === "function" ? fn : null;
}

function skillRow(s, suggested, showRank, key) {
  const rank = key ? simRankOf(key, s.id, suggested) : suggested;
  const have = ownedRank(s);
  const isOwned = have >= 1 && suggested <= have;
  const check = isOwned && key ? simOwnedCheck(key, s.id) : key ? simCheck(key, "s", s.id, suggested) : "";
  const picker = key ? simRankPicker(key, s.id, suggested, isOwned ? have : 0) : "";
  const badge = isOwned ? `<span class="bg-owned-badge">Owned</span>` : "";
  return row(`<span class="fd-item-main">${getBoostIcon(s.name)} <strong>${escapeHtml(s.name)}${showRank ? ` [Rank ${rank}]` : ""}</strong><span class="bg-why">${escapeHtml(skillNoteAtRank(s, rank))}</span><span class="bg-why">${escapeHtml(skillWhere(s))}</span></span>${check}${picker}${badge}`, `bg-skill-card ${key && simRankMax(s.id) > 1 ? "bg-has-rank" : ""}${isOwned ? " bg-owned" : ""}`.trim());
}

function boostCostText(b) {
  const price = boostPrice(b.name);
  if (!(price > 0)) return "No market price found";
  return `Market price ${price < 1 ? price.toFixed(4) : price.toFixed(2)}${FLOWER_ICON}`;
}

function sortedBoosts(list) {
  return list.slice().sort((a, b) => {
    const pa = boostPrice(a.name);
    const pb = boostPrice(b.name);
    if (pa > 0 !== pb > 0) return pa > 0 ? -1 : 1;
    return pa - pb;
  });
}

function shownBoosts(list) {
  return sortedBoosts(list);
}

function boostTargetLabel(b) {
  if (b.guardianSeason || isWeatherBoost(b)) return "Weather events";
  if (b.feedBuffHarvests || b.category === "salt" && b.scope === "spiceRackGlobal" || b.scope === "fermentationSpiceGlobal") return "Consumables";
  const sc = b.scope;
  if (sc === "global" || sc === "animalGlobal" || sc === "machineGlobal") return "Global";
  if (sc === "tier") return `${b.target} crops`;
  if (sc === "tierEffects") return `${Object.keys(b.tierEffects || {}).filter(k => b.tierEffects[k]).join(" & ")} crops`;
  if (sc === "resourceList" || sc === "fruitList") return "Global - multiple targets";
  if (sc === "lavaPit") return "Lava Pit";
  if (b.target) {
    const t = String(b.target);
    return t === "Wood" ? "Tree" : t.charAt(0).toUpperCase() + t.slice(1);
  }
  return "Other";
}

function effSigned(n) {
  const v = Math.round(Number(n) * 100) / 100;
  return `${v > 0 ? "+" : ""}${v}`;
}

function effPct(m) {
  return `${Math.round(Math.abs(Number(m) - 1) * 1000) / 10}%`;
}

const BOOST_TIME_WORD = {
  crops: "growth time",
  fruits: "growth time",
  greenhouse: "growth time",
  cropmachine: "pack time",
  resources: "recovery time",
  animals: "sleep time"
};

function guardianEffectText(b) {
  const event = guardianBoostedEvent(b);
  if (event === "Bountiful Harvest") return `doubles Bountiful Harvest to +2 yield on Crops, Fruits & Greenhouse · ${b.guardianSeason} only`;
  return `doubles Sunshower to 4x crop speed (-75% growth time) on Crops · ${b.guardianSeason} only`;
}

function boostEffectText(b) {
  if (b.guardianSeason) return guardianEffectText(b);
  const cat = b.category || "crops";
  const parts = [];
  const cfg = ANIMAL_DATA[b.target];
  const product = cat === "animals" && cfg && b.productIndex != null ? cfg.products[b.productIndex] : null;
  if (b.tierEffects) {
    const t = Object.keys(b.tierEffects).filter(k => b.tierEffects[k]).map(k => `${effSigned(b.tierEffects[k])} on ${k}`);
    if (t.length) parts.push(`${t.join(", ")} yield`);
  } else if (b.resourceEffects) {
    const t = Object.keys(b.resourceEffects).filter(k => b.resourceEffects[k]).map(k => `${effSigned(b.resourceEffects[k])} ${k}`);
    if (t.length) parts.push(t.join(", "));
  } else if (typeof b.yieldAdd === "number" && b.yieldAdd) {
    parts.push(product ? `${effSigned(b.yieldAdd)} ${product} per cycle` : `${effSigned(b.yieldAdd)} yield per harvest`);
  }
  if (typeof b.yieldAddAll === "number" && b.yieldAddAll) parts.push(`${effSigned(b.yieldAddAll)} yield on every product`);
  const ym = b.yieldMult || b.yieldMultAll;
  if (typeof ym === "number" && ym !== 1) parts.push(`${ym > 1 ? "+" : "-"}${effPct(ym)} yield`);
  const tm = b.timeMult || b.timeMultAll;
  if (typeof tm === "number" && tm !== 1) parts.push(`${tm < 1 ? "-" : "+"}${effPct(tm)} ${BOOST_TIME_WORD[cat] || "time"}`);
  const fm = b.feedMult || b.feedMultAll;
  if (typeof fm === "number" && fm !== 1) parts.push(`${fm < 1 ? "-" : "+"}${effPct(fm)} feed needed`);
  if (b.freeFeed) parts.push("no feed needed");
  if (b.feedBuffHarvests) parts.push(`Salt Lick / Honey Treat last ${b.feedBuffHarvests} harvests instead of 3`);
  if (b.spiceOutputAdd) parts.push(`${effSigned(b.spiceOutputAdd)} Spice Rack output per job`);
  if (b.doubleChancePct) parts.push(`${b.doubleChancePct}% chance to double Spice Rack output`);
  if (b.freeCost) parts.push(cat === "resources" ? "no tool cost" : "no seed cost");
  if (b.noTool) parts.push("no tool needed");
  if (typeof b.coinCostMult === "number" && b.coinCostMult !== 1) parts.push(`${b.coinCostMult < 1 ? "-" : "+"}${effPct(b.coinCostMult)} tool coin cost`);
  if (typeof b.materialQtyMult === "number" && b.materialQtyMult !== 1) parts.push(`${b.materialQtyMult < 1 ? "-" : "+"}${effPct(b.materialQtyMult)} tool materials`);
  if (typeof b.expMult === "number" && b.expMult !== 1) parts.push(`${b.expMult > 1 ? "+" : "-"}${effPct(b.expMult)} EXP`);
  let text = parts.join(" · ");
  if (text && b.plotCap) text += ` · only ${fmtInt(b.plotCap)} plot${b.plotCap === 1 ? "" : "s"}`;
  const seasons = b.seasons && b.seasons.length ? b.seasons : b.season ? [ b.season ] : [];
  if (text && seasons.length) text += ` · ${seasons.join(" & ")} only`;
  return text;
}

function boostEffectHtml(b) {
  const t = boostEffectText(b);
  return t ? `<span class="bg-why bg-effect"><strong>Effect:</strong> ${escapeHtml(t)}</span>` : "";
}

function boostSeasonIcons(b) {
  const list = b.guardianSeason ? [ b.guardianSeason ] : isWeatherBoost(b) ? b.seasons || [] : [];
  const icons = list.map(x => SEASON_EMOJI[x] || "").join("");
  return icons ? `<span class="bg-sim-seasons">${icons}</span>` : "";
}

function effectiveBoost(b, key) {
  const mod = SKILL_BOOSTS.find(x => x.modifiesId === b.id);
  if (!mod || !key) return b;
  const pick = simDraft(key).s.find(t => t[0] === mod.id);
  return runWithSimulatedSetup({
    skills: pick ? [ [ mod.id, pick[1] ] ] : [],
    boosts: [],
    modes: null
  }, () => Object.assign({}, b));
}

function boostFxHtml(b, key) {
  const e = effectiveBoost(b, key);
  let note = b.note || "";
  const cap = Number(e.plotCap) || 0;
  const side = Math.round(Math.sqrt(cap));
  if (cap && side * side === cap) note = note.replace(/\d+x\d+, \d+ plots/, `${side}x${side}, ${cap} plots`);
  return `${boostEffectHtml(e)}<span class="bg-why">${escapeHtml(note)}</span>`;
}

export function refreshBoostFx(key) {
  document.querySelectorAll("[data-bg-fx-id]").forEach(el => {
    if (el.getAttribute("data-bg-fx-key") !== key) return;
    const b = BOOSTS.find(x => x.id === el.getAttribute("data-bg-fx-id"));
    if (b) el.innerHTML = boostFxHtml(b, key);
  });
}

function boostRowHtml(b, key) {
  const grouped = b.group || b.exclusiveWith ? `<span class="bg-why">Only one boost of this kind can be active at a time. The top tier wins.</span>` : "";
  const needs = b.guardianSeason ? `<span class="bg-why">Only takes effect while ${guardianBoostedEvent(b)} is also checked.</span>` : "";
  return row(`<span class="fd-item-main">${getIcon(b.name)} <strong>${escapeHtml(b.name)}</strong>${boostSeasonIcons(b)}<span class="bg-fx" data-bg-fx-key="${escapeHtml(key || "")}" data-bg-fx-id="${escapeHtml(b.id)}">${boostFxHtml(b, key)}</span>${needs}<span class="bg-why">${boostCostText(b)}</span>${grouped}</span>${key ? simCheck(key, "b", b.id, 1) : ""}`);
}

function boostRows(list, key) {
  if (!list.length) return `<div class="fd-empty-note">You already have every boost for this.</div>`;
  const sorted = sortedBoosts(list);
  const order = [];
  const map = {};
  sorted.forEach(b => {
    const l = boostTargetLabel(b);
    if (!map[l]) {
      map[l] = [];
      order.push(l);
    }
    map[l].push(b);
  });
  order.sort((a, b) => (a === "Global" ? 0 : 1) - (b === "Global" ? 0 : 1));
  return `<div class="bg-boost-grid">${order.map(l => `<div class="bg-boost-group"><div class="fd-section-label">${escapeHtml(l)}</div>${map[l].map(b => boostRowHtml(b, key)).join("")}</div>`).join("")}</div>`;
}

const BOUNTIFUL_GUARDIAN_SEASONS = [ "Spring", "Summer" ];

const GUARDIAN_CATEGORIES = [ "crops", "fruits", "greenhouse" ];

function isWeatherBoost(b) {
  return !!b && (b.limitedBoostName === "Bountiful Harvest" || b.limitedBoostName === "Sunshower");
}

function guardianBoostedEvent(b) {
  return BOUNTIFUL_GUARDIAN_SEASONS.indexOf(b.guardianSeason) >= 0 ? "Bountiful Harvest" : "Sunshower";
}

function boostInCategory(b, category) {
  if ((b.category || "crops") === category) return true;
  if (b.guardianSeason) {
    if (GUARDIAN_CATEGORIES.indexOf(category) < 0) return false;
    return category === "crops" || guardianBoostedEvent(b) === "Bountiful Harvest";
  }
  return b.id === "bountiful_harvest" && category === "greenhouse";
}

function boostsFor(category, tab, filterId) {
  return BOOSTS.filter(b => {
    if (!boostInCategory(b, category) || b.hideInPanel || b.skillTier || SKILL_BOOSTS.some(s => s.id === b.id)) return false;
    if (/Shrine|Hourglass/.test(b.name) || /\(/.test(b.name) && !/Totem/.test(b.name)) return false;
    if (b.isDebuff || b.debuffLossMult || b.debuffStack || b.calendarKey) return false;
    if (isBoostActive(b.id)) return false;
    return filterId ? profileBuildFilterMatches(b, tab, filterId) : true;
  });
}

const ownedByList = new WeakMap;

function ownedOf(list) {
  return ownedByList.get(list) || [];
}

function tagOwned(list, owned) {
  const seen = new Set;
  ownedByList.set(list, owned.filter(s => !seen.has(s.id) && seen.add(s.id)).sort((a, b) => a.skillTier - b.skillTier));
  return list;
}

function skillsFor(skillCats, tab, filterId) {
  const seen = new Set;
  const owned = [];
  const out = SKILL_BOOSTS.filter(s => {
    if (seen.has(s.id)) return false;
    if (skillCats.indexOf(s.skillCategory) < 0 || s.hideInPanel || s.isActiveAbility) return false;
    if (/convenience|no yield\/time change/i.test(s.note || "")) return false;
    if (filterId && !profileBuildFilterMatches(s, tab, filterId)) return false;
    seen.add(s.id);
    if (ownedRank(s) >= 1) {
      owned.push(s);
      return false;
    }
    return true;
  }).sort((a, b) => a.skillTier - b.skillTier);
  return tagOwned(out, owned);
}

function skillGroups(list, key) {
  const owned = ownedOf(list);
  if (!list.length && !owned.length) return `<div class="fd-empty-note">No skills for this.</div>`;
  let html = "";
  [ 1, 2, 3 ].forEach(t => {
    const items = list.filter(s => s.skillTier === t);
    const have = owned.filter(s => s.skillTier === t);
    if (items.length || have.length) html += `<div class="fd-section-label">Tier ${t}</div>${items.map(s => skillRow(s, 1, true, key)).join("")}${have.map(s => skillRow(s, 1, true, key)).join("")}`;
  });
  return html;
}

function registerFromLists(key, skills, boosts) {
  simRegister(key, skills.map(s => [ s.id, 1 ]), shownBoosts(boosts).map(b => b.id), false, null, null, ownedOf(skills).map(s => [ s.id, ownedRank(s) ]));
}

function pickRow(it, mode, extra) {
  const per = mode === "machine" ? `${formatDuration(it.timeSec)} per batch` : `${fmtInt(Math.round(it.cyclesPerDay * 100) / 100)} cycles / 24h`;
  const hold = it.count > 0 ? ` · your ${fmtInt(it.count)} ${escapeHtml(it.countLabel || "node")}${it.count > 1 ? (/(ch|sh|s|x)$/i.test(it.countLabel || "") ? "es" : "s") : ""}: <strong>${flower(it.holdingProfit24h)}</strong>` : "";
  return row(`<span class="fd-item-main">${it.icon || ""} <strong>${escapeHtml(it.name)}</strong><span class="bg-why">${per}${hold}</span>${extra ? `<span class="bg-why">${extra}</span>` : ""}</span><span class="fd-item-cost bg-right"><strong>+${flower(it.unitProfit24h)}</strong><br>per ${escapeHtml((it.countLabel || "node").toLowerCase())} / 24h</span>`);
}

function categoryHtml(cat, picks, verdictNote, skills, boosts, mode) {
  const key = `cat:${cat.id}`;
  registerFromLists(key, skills, boosts);
  const profitable = picks.length > 0;
  const tab = catTabs[cat.id] || "skills";
  const tabs = [ [ "skills", "Must have skills" ], [ "boost", "Must have boosts" ] ].map(t => `<button type="button" data-bg-ctab="${escapeHtml(cat.id)}|${t[0]}" class="fd-lb-tab${tab === t[0] ? " active" : ""}">${t[1]}</button>`).join("");
  const status = profitable ? `<span class="bg-label bg-best">profitable</span>` : `<span class="bg-label bg-loss">not recommended</span>`;
  const body = profitable ? `<div class="fd-section-label">Most profitable right now</div>${picks.map(p => pickRow(p, mode)).join("")}<div class="bg-mini">${verdictNote}</div>` : `<div class="bg-mini"><strong>${escapeHtml(cat.title)} is not recommended on your current farm.</strong> ${skills.length || boosts.length ? "It loses money unless you get the skills and boosts below." : "It still loses money at current market prices, even with all your skills and boosts."}</div>`;
  const need = profitable ? `These make ${escapeHtml(cat.title.toLowerCase())} even better. Boosts you already own are hidden. Skills you own are marked Owned.` : `Get these first, then ${escapeHtml(cat.title.toLowerCase())} can become profitable.`;
  return `<div class="fd-container is-own bg-cat${tab === "boost" ? " bg-cat-wide" : ""}"><div class="fd-container-head"><span class="fd-container-title">${getIcon(cat.icon) || ""} ${escapeHtml(cat.title)} ${status}</span>${simButtons(key)}</div>${simUnsavedNote(key)}${body}<div class="bg-mini">${need}</div><div class="bg-switcher bg-modes">${tabs}</div><div class="bg-pane">${tab === "boost" ? boostRows(boosts, key) : skillGroups(skills, key)}</div></div>${simResultHtml(key, cat)}`;
}

function perUnitProfit(i) {
  return i.count > 0 ? i.holdingProfit24h / i.count : i.unitProfit24h;
}

function topPicks(items, filter) {
  return items.filter(filter).map(i => Object.assign({}, i, {
    unitProfit24h: perUnitProfit(i)
  })).filter(i => i.unitProfit24h > 0).sort((a, b) => b.unitProfit24h - a.unitProfit24h).slice(0, 3);
}

function tierSkills(tiers) {
  const seen = new Set;
  const out = [];
  let owned = [];
  tiers.forEach(t => {
    const part = skillsFor([ "crops" ], "crops", t);
    owned = owned.concat(ownedOf(part));
    part.forEach(s => {
      if (seen.has(s.id)) return;
      seen.add(s.id);
      out.push(s);
    });
  });
  return tagOwned(out.sort((a, b) => a.skillTier - b.skillTier), owned);
}

function tierBoosts(tiers) {
  const seen = new Set;
  const out = [];
  tiers.forEach(t => boostsFor("crops", "crops", t).forEach(b => {
    if (seen.has(b.id)) return;
    seen.add(b.id);
    out.push(b);
  }));
  return out;
}

function capByFreeSeeds(ctx, list) {
  if (!ctx.free) return list;
  return list.map(p => {
    const supply = ctx.freeSeeds(p.name);
    const plots = p.count > 0 ? p.count : 1;
    const need = plots * p.cyclesPerDay;
    const factor = need > 0 ? Math.min(1, supply / need) : 1;
    return Object.assign({}, p, {
      freeSupply: supply,
      capFrom: p.cyclesPerDay,
      cyclesPerDay: p.cyclesPerDay * factor,
      unitProfit24h: p.unitProfit24h * factor,
      holdingProfit24h: p.holdingProfit24h * factor,
      capped: factor < 1
    });
  });
}

function freeSeedNote(ctx, p) {
  if (!ctx.free) return "";
  const supply = fmtInt(p.freeSupply);
  if (!p.capped) return `Free seeds: ${supply} per day, enough for all your plots`;
  return `Free seeds: ${supply} per day only cover ${fmtInt(Math.round(p.cyclesPerDay * 100) / 100)} of ${fmtInt(Math.round(p.capFrom))} cycles per plot, so profit is capped to the free seeds`;
}

function cropTierBlock(items, ctx, tier) {
  const base = items.filter(i => i.category === "Crop" && (BASE_CROPS[i.name] || {}).tier === tier[0] && isCropInSeason(i.name, currentSeason) && ctx.seedLevel(i.name) <= ctx.level);
  const pool = base.filter(i => ctx.seedAvailable(i.name));
  const picks = capByFreeSeeds(ctx, topPicks(pool, () => true));
  const title = escapeHtml(tier[1]);
  const noFree = ctx.free && base.length > 0 && pool.length === 0;
  const status = noFree ? `<span class="bg-label bg-loss">not doable free</span>` : picks.length ? `<span class="bg-label bg-best">recommended</span>` : `<span class="bg-label bg-loss">not recommended</span>`;
  let body;
  if (noFree) body = `<div class="bg-mini"><strong>${title} crops cannot be planted in Free to Play.</strong> Their seeds have no free daily supply, so they need a Gem restock. Switch to Invested to see them.</div>`; else if (picks.length) body = picks.map(p => pickRow(p, "plain", freeSeedNote(ctx, p))).join(""); else if (pool.length) body = `<div class="bg-mini"><strong>${title} crops lose money on your current farm.</strong> Planting them costs more than they earn until you get the skills and boosts below.</div>`; else body = `<div class="bg-mini"><strong>No ${title} crop is available to plant right now.</strong> They are locked by your level or out of season.</div>`;
  return {
    losing: pool.length > 0 && picks.length === 0 && !noFree,
    html: `<div class="bg-tier"><div class="fd-section-label">${title} crops ${status}</div>${body}</div>`
  };
}

function cropsHtml(items, ctx) {
  const cat = FARM_CATEGORIES[0];
  const tab = catTabs[cat.id] || "skills";
  const blocks = CROP_TIERS.map(t => ({
    tier: t,
    res: cropTierBlock(items, ctx, t)
  }));
  const losing = blocks.filter(b => b.res.losing).map(b => b.tier);
  const scope = losing.length ? losing : CROP_TIERS;
  const scopeIds = scope.map(t => t[0]);
  const skills = tierSkills(scopeIds);
  const boosts = tierBoosts(scopeIds);
  const key = `cat:${cat.id}`;
  registerFromLists(key, skills, boosts);
  const names = scope.map(t => t[1]).join(", ");
  const need = losing.length ? `Get these first, then ${escapeHtml(names)} crops can become profitable.` : `These make your crops even better. Boosts you already own are hidden. Skills you own are marked Owned.`;
  const tabs = [ [ "skills", "Must have skills" ], [ "boost", "Must have boosts" ] ].map(t => `<button type="button" data-bg-ctab="${escapeHtml(cat.id)}|${t[0]}" class="fd-lb-tab${tab === t[0] ? " active" : ""}">${t[1]}</button>`).join("");
  return `<div class="fd-container is-own bg-cat${tab === "boost" ? " bg-cat-wide" : ""}"><div class="fd-container-head"><span class="fd-container-title">${getIcon(cat.icon) || ""} ${escapeHtml(cat.title)}</span>${simButtons(key)}</div>${simUnsavedNote(key)}${blocks.map(b => b.res.html).join("")}<div class="bg-mini">Skills for your selected strategy are listed in the strategy box.</div><div class="bg-mini">${need}</div><div class="bg-switcher bg-modes">${tabs}</div><div class="bg-pane">${tab === "boost" ? boostRows(boosts, key) : skillGroups(skills, key)}</div></div>${simResultHtml(key, cat)}`;
}

function farmingHtml(ctx) {
  const items = gatherAllProfitItems();
  const strat = FARM_STRATS[farmStrat];
  const stratTabs = [ [ "skills", "Skills" ], [ "boost", "Boost" ] ].map(t => `<button type="button" data-bg-fstab="${t[0]}" class="fd-lb-tab${farmStratTab === t[0] ? " active" : ""}">${t[1]}</button>`).join("");
  const stratButtons = farmStrategyButtons().map(b => `<button type="button" data-bg-fstrat="${b[0]}" class="fd-lb-tab${farmStrat === b[0] ? " active" : ""}">${escapeHtml(b[1])}</button>`).join("");
  const stratAll = strat.skills.map(t => [ skillById(t[0]), t[1] ]).filter(t => t[0]);
  const missing = stratAll.filter(t => ownedRank(t[0]) < t[1]);
  const owned = strat.skills.length - missing.length;
  const stratKey = `strat:${farmStrat}`;
  const stratBoosts = tierBoosts(strat.tiers);
  simRegister(stratKey, missing.map(m => [ m[0].id, m[1] ]), stratBoosts.map(b => b.id), true, defaultBoostIds(stratBoosts), null, stratAll.filter(m => ownedRank(m[0]) >= m[1]).map(m => [ m[0].id, ownedRank(m[0]) ]));
  let stratBody;
  if (farmStratTab === "boost") stratBody = boostRows(stratBoosts, stratKey); else {
    let html = `<div class="fd-section-label">Crops</div>`;
    [ 1, 2, 3 ].forEach(t => {
      const list = stratAll.filter(m => m[0].skillTier === t);
      if (list.length) html += `<div class="fd-section-label">Tier ${t}</div>${list.map(m => skillRow(m[0], m[1], true, stratKey)).join("")}`;
    });
    stratBody = stratAll.length ? html : `<div class="fd-empty-note">No skills in this build.</div>`;
  }
  const stratBox = `<div class="fd-container is-own bg-strat"><div class="fd-container-head"><span class="fd-container-title">${escapeHtml(strat.label)}</span>${simButtons(stratKey)}</div>${simUnsavedNote(stratKey)}<div class="bg-mini bg-strat-desc">${escapeHtml(strat.desc)}</div><div class="bg-mini">You already own ${fmtInt(owned)} of ${fmtInt(strat.skills.length)} skills of this build. Skills you own are marked Owned. Higher tiers need points spent in the lower tiers of the same tree.</div><div class="bg-switcher bg-modes">${stratTabs}</div><div class="bg-pane">${stratBody}</div></div>`;
  const pickBox = `<div class="fd-container is-own bg-strat bg-strat-pick"><div class="fd-container-head"><span class="fd-container-title">Farming Strategy</span></div><div class="bg-switcher bg-strats">${stratButtons}</div></div>`;
  const top = `<div class="bg-farm-top">${pickBox}${stratBox}</div>`;
  const out = [];
  FARM_CATEGORIES.forEach(cat => {
    if (cat.id === "crops") {
      out.push(cropsHtml(items, ctx));
      return;
    }
    let picks = [];
    let mode = "plain";
    if (cat.id === "fruits") picks = topPicks(items, i => i.category === "Fruit" && isFruitInSeason(i.name, currentSeason) && ctx.seedLevel(i.name) <= ctx.level && ctx.seedAvailable(i.name));
    else if (cat.id === "greenhouse") picks = topPicks(items, i => i.category === "Greenhouse");
    else {
      mode = "machine";
      picks = Object.keys(BASE_CROP_MACHINE).filter(n => isCropMachineUnlocked(n) && ctx.seedAvailable(n)).map(n => {
        const base = BASE_CROP_MACHINE[n];
        const b = computeCropMachineBatch(n, base.seedQty);
        return b ? {
          name: n,
          icon: getIcon(n),
          timeSec: b.timeSec,
          unitProfit24h: b.timeSec > 0 ? b.profitFlower / b.timeSec * 86400 : 0,
          count: 0,
          countLabel: "machine"
        } : null;
      }).filter(Boolean).filter(i => i.unitProfit24h > 0).sort((a, b) => b.unitProfit24h - a.unitProfit24h).slice(0, 3);
    }
    const skills = skillsFor([ cat.skillCat ], null, null);
    const boosts = boostsFor(cat.boostCat, null, null);
    if (ctx.free && (cat.id === "fruits" || cat.id === "greenhouse")) {
      const v = linkedVerdict(cat, null, null, `Its seeds have no free daily supply, so they need a Gem restock.`);
      out.push(linkedCategoryHtml(cat, v, skills, boosts, "", "node", `cat:${cat.id}`, ""));
      return;
    }
    const note = "Profit is per 24 hours after seed cost, using your current skills and boosts.";
    out.push(categoryHtml(cat, picks, note, skills, boosts, mode));
  });
  return `${top}${simResultHtml(stratKey)}<div class="bg-cat-grid">${out.join("")}</div>`;
}

function linkedVerdict(cat, entry, fallbackName, lockReason) {
  if (lockReason) {
    return {
      status: "locked",
      profitable: false,
      net: null,
      count: 0,
      source: "locked",
      reason: lockReason
    };
  }
  if (cat.special) {
    return {
      status: "special",
      profitable: true,
      net: entry && entry.net24h != null ? entry.net24h : null,
      count: entry ? entry.count : 0,
      source: "special"
    };
  }
  if (entry && entry.net24h != null) {
    return {
      status: entry.net24h > 0 ? "profit" : "loss",
      profitable: entry.net24h > 0,
      net: entry.net24h,
      count: entry.count,
      source: "panel"
    };
  }
  const est = fallbackName ? computeGuideResourceFallback(fallbackName) : null;
  if (est != null) {
    return {
      status: est > 0 ? "profit" : "loss",
      profitable: est > 0,
      net: est,
      count: 0,
      source: "estimate"
    };
  }
  return {
    status: "nodata",
    profitable: false,
    net: null,
    count: 0,
    source: "none"
  };
}

function linkedCategoryHtml(cat, v, skills, boosts, note, unitLabel, key, topHtml) {
  registerFromLists(key, skills, boosts);
  const tab = catTabs[cat.id] || "skills";
  const tabs = [ [ "skills", "Must have skills" ], [ "boost", "Must have boosts" ] ].map(t => `<button type="button" data-bg-ctab="${escapeHtml(cat.id)}|${t[0]}" class="fd-lb-tab${tab === t[0] ? " active" : ""}">${t[1]}</button>`).join("");
  const title = escapeHtml(cat.title);
  const lower = escapeHtml(cat.title.toLowerCase());
  let status;
  if (v.status === "locked") status = `<span class="bg-label bg-loss">not doable free</span>`; else if (v.status === "nodata") status = `<span class="bg-label">no data</span>`; else status = v.profitable ? `<span class="bg-label bg-best">recommended</span>` : `<span class="bg-label bg-loss">not recommended</span>`;
  const countText = v.count > 0 ? ` · your ${fmtInt(v.count)} ${escapeHtml(unitLabel)}${v.count > 1 ? "s" : ""}` : "";
  const netRow = v.net != null ? row(`<span class="fd-item-main">${getIcon(cat.icon) || ""} <strong>${title}</strong><span class="bg-why">${v.source === "estimate" ? `Estimated from market price and tool cost, you have no active ${escapeHtml(unitLabel)} yet` : v.source === "consumable" ? `Extra profit from the best consumable per animal type${countText}` : `Average panel${countText}`}</span></span><span class="fd-item-cost bg-right"><strong>${v.net >= 0 ? "+" : ""}${flower(v.net)}</strong><br>${v.source === "estimate" ? `per ${escapeHtml(unitLabel)} / 24h` : "net / 24h"}</span>`) : "";
  let body;
  if (v.status === "locked") {
    body = `<div class="bg-mini"><strong>${title} cannot be done in Free to Play.</strong> ${escapeHtml(v.reason)} Switch to Invested to see it.</div>`;
  } else if (v.status === "special") {
    body = `${netRow}<div class="bg-mini"><strong>Special resource.</strong> ${escapeHtml(cat.special)}${v.net != null && v.net < 0 ? " The loss shown above only exists because it cannot be sold on the market." : ""}</div>`;
  } else if (v.status === "profit") {
    body = `<div class="fd-section-label">Linked to your Daily Profit</div>${netRow}<div class="bg-mini">${note}</div>`;
  } else if (v.status === "loss") {
    body = `<div class="fd-section-label">Linked to your Daily Profit</div>${netRow}<div class="bg-mini"><strong>${title} is not recommended on your current farm.</strong> ${skills.length || boosts.length ? "It loses money unless you get the skills and boosts below." : "It still loses money at current market prices, even with all your skills and boosts."}</div>`;
  } else {
    body = `<div class="bg-mini"><strong>No profit data for ${lower} yet.</strong> Add some to your farm, then this will follow the average panel.</div>`;
  }
  const freeNote = v.freeNote ? `<div class="bg-mini">${escapeHtml(v.freeNote)}</div>` : "";
  const need = v.status === "locked" ? `These only matter once you switch to Invested.` : v.profitable ? `These make ${lower} even better. Boosts you already own are hidden. Skills you own are marked Owned.` : `Get these first, then ${lower} can become profitable.`;
  const whereTag = cat.where ? ` <span class="bg-mini">(${escapeHtml(cat.where)})</span>` : "";
  return `<div class="fd-container is-own bg-cat${tab === "boost" ? " bg-cat-wide" : ""}"><div class="fd-container-head"><span class="fd-container-title">${getIcon(cat.icon) || ""} ${title}${whereTag} ${status}</span>${simButtons(key)}</div>${topHtml || ""}${simUnsavedNote(key)}${body}${freeNote}<div class="bg-mini">${need}</div><div class="bg-switcher bg-modes">${tabs}</div><div class="bg-pane">${tab === "boost" ? boostRows(boosts, key) : skillGroups(skills, key)}</div></div>${simResultHtml(key, cat)}`;
}

function miningHtml(ctx) {
  const snap = dailyProfitGuideSnapshot();
  const html = MINING_CATEGORIES.map(cat => {
    const skills = skillsFor([ "trees", "mining" ], "resources", cat.id);
    const boosts = boostsFor("resources", "resources", cat.id);
    const note = `Skills and boosts below increase the yield and speed of ${escapeHtml(cat.title.toLowerCase())}, so you can run more cycles in 24 hours.`;
    const tool = RESOURCE_DATA[cat.id] ? RESOURCE_DATA[cat.id].tool : null;
    let lock = "";
    if (ctx.free && tool && !FREE_TOOLS[tool]) lock = `It needs a ${tool}, and the ${tool} has no free daily supply.`;
    const v = linkedVerdict(cat, snap.items.get(cat.id), cat.id, lock);
    if (ctx.free && tool && FREE_TOOLS[tool] && v.status !== "locked") {
      const supply = FREE_TOOLS[tool];
      const fig = computeResourceFigures(cat.id);
      const cycles = fig && fig.timeSec > 0 ? 86400 / fig.timeSec : 0;
      const uses = (fig && fig.toolUsageTotal > 0 ? fig.toolUsageTotal : 1) * cycles;
      const factor = uses > 0 ? Math.min(1, supply / uses) : 1;
      if (factor < 1 && v.net != null) v.net *= factor;
      v.freeNote = factor < 1 ? `Free to Play: you get ${fmtInt(supply)} free ${tool}${supply > 1 ? "s" : ""} per day but your nodes would use about ${fmtInt(Math.round(uses))}, so profit is capped to ${fmtInt(Math.round(factor * 100))}% of full speed.` : `Free to Play: you get ${fmtInt(supply)} free ${tool}${supply > 1 ? "s" : ""} per day, enough for your nodes.`;
    }
    return linkedCategoryHtml(cat, v, skills, boosts, note, cat.id === "Obsidian" ? "pit" : "node", `mine:${cat.id}`, "");
  }).join("");
  return `<div class="bg-cat-grid">${html}</div>`;
}

function consSkills() {
  const seen = new Set;
  const owned = [];
  const out = SKILL_BOOSTS.filter(s => {
    if (CONS_SKILL_IDS.indexOf(s.id) < 0 || seen.has(s.id)) return false;
    seen.add(s.id);
    if (ownedRank(s) >= 1) {
      owned.push(s);
      return false;
    }
    return true;
  }).sort((a, b) => a.skillTier - b.skillTier);
  return tagOwned(out, owned);
}

function consBoosts() {
  return BOOSTS.filter(b => CONS_BOOST_IDS.indexOf(b.id) >= 0 && !isBoostActive(b.id));
}

function consAnimalTypes() {
  return Object.keys(ANIMAL_DATA).filter(t => animalDefaultInput(t).qty > 0);
}

function consAnimalRows(setup, type, choice) {
  const q = animalDefaultInput(type);
  return simulateGuideRows(Object.assign({}, setup, {
    spice: {
      [type]: choice
    }
  }), {
    kind: "animal",
    names: [ type ],
    qty: q.qty,
    level: q.level
  });
}

function consumablesVerdict() {
  const types = consAnimalTypes();
  if (!types.length) return {
    status: "nodata",
    profitable: false,
    net: null,
    count: 0,
    source: "none"
  };
  const plain = {
    skills: [],
    boosts: [],
    modes: matModes
  };
  let gain = 0, heads = 0;
  types.forEach(type => {
    const base = consAnimalRows(plain, type, "none")[0];
    if (!base) return;
    heads += animalDefaultInput(type).qty;
    let best = 0;
    [ "saltLick", "honeyTreat" ].forEach(choice => {
      const r = consAnimalRows(plain, type, choice)[0];
      if (r) best = Math.max(best, r.net - base.net);
    });
    gain += best;
  });
  return {
    status: gain > 0 ? "profit" : "loss",
    profitable: gain > 0,
    net: gain,
    count: heads,
    source: "consumable"
  };
}

function consumablesNote() {
  const lick = computeSpiceFigures("Salt Lick");
  const treat = computeSpiceFigures("Honey Treat");
  const harvests = getSpiceLickDurationHarvests();
  return `Salt Lick gives +5% yield and Honey Treat cuts feed by 25%. Each one lasts ${fmtInt(harvests)} harvests and an animal can only carry one at a time. Priced from your Spice Rack: Salt Lick ${flower(lick.unitCost)} each, Honey Treat ${flower(treat.unitCost)} each. Skills and boosts below make them cheaper to craft or last longer.`;
}

function simConsumablesBox(key) {
  const setup = simSetup(key);
  const types = consAnimalTypes();
  const html = types.map(type => {
    const label = ANIMAL_DATA[type].label;
    const q = animalDefaultInput(type);
    const rows = SPICE_CHOICES.map(c => {
      const r = consAnimalRows(setup, type, c[0])[0];
      return r ? {
        row: r,
        choice: c
      } : null;
    }).filter(Boolean).sort((a, b) => b.row.net - a.row.net);
    const list = rows.map(o => simRowHtml(o.row, `${key}:${type}:${o.choice[0]}`, {
      icon: getIcon(o.choice[0] === "none" ? label : o.choice[1]) || "",
      label: `${label} · ${o.choice[1]}`,
      sub: `${fmtInt(q.qty)} ${label.toLowerCase()}${q.qty === 1 ? "" : "s"} at level ${fmtInt(Math.max(1, q.level))}`
    })).join("");
    return `<div class="bg-sim-single">${simTierHtml(label, `<div class="bg-sim-list">${list}</div>`)}</div>`;
  }).join("");
  const note = types.length ? "" : `<div class="bg-mini"><strong>Add some animals to your farm first.</strong> This compares No consumable, Salt Lick and Honey Treat on the animals you have.</div>`;
  return simBox(key, "raise", `${html}${note}`, "");
}

function animalsHtml(ctx) {
  const snap = dailyProfitGuideSnapshot();
  const g = profileGetG();
  const consS = consSkills();
  const consB = consBoosts();
  const html = Object.keys(ANIMAL_DATA).map(type => {
    const label = ANIMAL_DATA[type].label;
    const cat = {
      id: type,
      title: label,
      icon: label
    };
    const have = new Set;
    const ownAnimal = skillsFor([ "animals" ], "animals", type);
    const skills = tagOwned(ownAnimal.concat(consS).filter(x => !have.has(x.id) && have.add(x.id)).sort((a, b) => a.skillTier - b.skillTier), ownedOf(ownAnimal).concat(ownedOf(consS)));
    const boosts = boostsFor("animals", "animals", type).filter(b => CONS_BOOST_IDS.indexOf(b.id) < 0).concat(consB);
    const building = ANIMAL_BUILDINGS[type];
    let note = `Skills and boosts below increase the yield and speed of ${escapeHtml(label.toLowerCase())}. Salt Lick and Honey Treat follow your animal panel settings and their cost is included under Consumables in Total Deductions. ${consumablesNote()}`;
    if (building && g && (Number(g.inventory && g.inventory[building]) || 0) <= 0) note = `You need the ${escapeHtml(building)} first. ${note}`;
    let lock = "";
    if (ctx.free) {
      const feedCrops = new Set;
      (ANIMAL_DATA[type].levels || []).forEach(l => (FEED_RECIPE[l.feed] || []).forEach(r => feedCrops.add(r.crop)));
      const missing = Array.from(feedCrops).filter(c => !ctx.freeSeeds(c));
      if (missing.length) lock = `Their feed is made from ${missing.join(", ")}, which has no free daily seeds, so you cannot keep them fed.`;
    }
    const v = linkedVerdict(cat, snap.items.get("animal:" + type), null, lock);
    const key = `anim:${type}`;
    return linkedCategoryHtml(cat, v, skills, boosts, note, "animal", key, animalInputsHtml(key, type, label));
  }).join("");
  return `<div class="bg-cat-grid">${html}</div>`;
}

export function guideSkillGroups() {
  const strat = FARM_STRATS[farmStrat];
  const stratList = strat.skills.map(t => [ skillById(t[0]), t[1] ]).filter(t => t[0] && ownedRank(t[0]) < t[1]).sort((a, b) => a[0].skillTier - b[0].skillTier).map(t => [ t[0].id, t[1] ]);
  const farm = [];
  tierSkills(CROP_TIERS.map(t => t[0])).forEach(sk => farm.push([ sk.id, 1 ]));
  FARM_CATEGORIES.forEach(cat => {
    if (cat.id === "crops") return;
    skillsFor([ cat.skillCat ], null, null).forEach(sk => farm.push([ sk.id, 1 ]));
  });
  const mining = [];
  MINING_CATEGORIES.forEach(cat => skillsFor([ "trees", "mining" ], "resources", cat.id).forEach(sk => mining.push([ sk.id, 1 ])));
  const animals = [];
  Object.keys(ANIMAL_DATA).forEach(type => skillsFor([ "animals" ], "animals", type).forEach(sk => animals.push([ sk.id, 1 ])));
  return [ stratList, farm, mining, animals ];
}

export function guideBodyHtml(guide, ctx) {
  if (!ctx.synced) return `<div class="fd-container fdm-gap bg-cat"><div class="bg-mini">Sync your farm first. These guides read your real skills and boosts to decide what is profitable on your farm.</div></div>`;
  if (guide === "farming") return farmingHtml(ctx);
  if (guide === "mining") return miningHtml(ctx);
  if (guide === "animals") return animalsHtml(ctx);
  return "";
}
