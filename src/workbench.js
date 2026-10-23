import { ICON_DATA } from "./icon_data.js";
import { escapeHtml, fmtInt, COIN_ICON, BASE_STOCK_TOOLS, farmSyncExtractGameState } from "./calculator.js";

import { farmPanelGameState, farmPanelField } from "./inprogress.js";

import { $, getIcon } from "./ui.js";

const WB_UPGRADE_ICON = "data:image/webp;base64,UklGRsgAAABXRUJQVlA4TLsAAAAvEYAEEEegkI0kaLEWdpGeO5cDOA2zAYj4yAWON1OdlKJGUhjCDzH4T9DRmxbmPwDw/+2zST11FQMkEZLBbWzbqnLQ/Fwk/1oAX2JtwUJ/nwo+NCC3b6yFiP5PAICiKPBekCwAJEJDawu47G8+MyRiLTqLtU3Yv/Tuc3u0FlWdJT1aT1W9vlUPbaY/+qdefUlj2ovONodYrKqcxBpah1U58bJvA+nM2Qr2iAOSwQC0wfsegAmCwODdGAMAAA==";

export const WB_TOOLS = {
  land: [
    { name: "Axe", price: 20, ingredients: {} },
    { name: "Pickaxe", price: 20, ingredients: { Wood: 3 } },
    { name: "Stone Pickaxe", price: 20, ingredients: { Wood: 3, Stone: 5 } },
    { name: "Iron Pickaxe", price: 80, ingredients: { Wood: 3, Iron: 5 } },
    { name: "Gold Pickaxe", price: 100, ingredients: { Wood: 3, Gold: 3 } },
    { name: "Oil Drill", price: 100, ingredients: { Wood: 20, Iron: 9, Leather: 10 } }
  ],
  water: [
    { name: "Rod", price: 20, ingredients: { Wood: 3, Stone: 1 } },
    { name: "Crab Pot", price: 250, ingredients: { Feather: 5, Wool: 3 }, level: 18 },
    { name: "Mariner Pot", price: 500, ingredients: { Feather: 10, "Merino Wool": 10 }, level: 24 },
    { name: "Salt Rake", price: 20, ingredients: { Wood: 3 } }
  ],
  animal: [
    { name: "Petting Hand", price: 0, ingredients: {}, baseExp: 25 },
    { name: "Brush", price: 2000, ingredients: {}, baseExp: 40 },
    { name: "Music Box", price: 50000, ingredients: {}, baseExp: 50 }
  ]
};

const WB_TOOL_SECTION_LABELS = { land: "Land Tools", water: "Water Tools", animal: "Animal Care" };
const WB_TOOL_SECTION_ORDER = [ "land", "water", "animal" ];

const WB_BOOSTS = [
  { name: "Basic Scarecrow", coins: 0, ingredients: { Wood: 2 }, boost: "x0.8 Basic Crops Growth Time" },
  { name: "Scary Mike", coins: 4800, ingredients: { Wood: 30, Carrot: 50, Wheat: 10, Parsnip: 10 }, boost: "+0.2 Medium Crops" },
  { name: "Laurie the Chuckle Crow", coins: 14400, ingredients: { Wood: 100, Radish: 60, Kale: 40, Wheat: 20 }, boost: "+0.2 Advanced Crops" },
  { name: "Bale", coins: 1600, ingredients: { Egg: 200, Wheat: 200, Wood: 100, Stone: 30 }, boost: "+0.1 Egg Yield (+0.1 Milk with Bale Economy skill)" },
  { name: "Immortal Pear", coins: 0, ingredients: { Gold: 5, Apple: 10, Blueberry: 10, Orange: 10 }, boost: "+1 Fruit Patch Harvest per seed" },
  { name: "Squirrel", coins: 1000, ingredients: { Wood: 100 }, boost: "+0.1 Wood" },
  { name: "Iron Beetle", coins: 2000, ingredients: { Iron: 20 }, boost: "+0.1 Iron" },
  { name: "Gold Beetle", coins: 10000, ingredients: { Gold: 20 }, boost: "+0.1 Gold" },
  { name: "Fairy Circle", coins: 25000, ingredients: { "Wild Mushroom": 20 }, boost: "+0.2 Wild Mushroom" },
  { name: "Macaw", coins: 10000, ingredients: { Apple: 10, Blueberry: 10, Orange: 10, Banana: 10, Tomato: 10, Lemon: 10 }, boost: "+0.1 Fruit Patch Yield" },
  { name: "Butterfly", coins: 15000, ingredients: {}, boost: "20% chance of +1 flower" },
  { name: "Salt Sculpture", coins: 2000, ingredients: { "Refined Salt": 30 }, boost: "Cumulative Salt & Aging buffs per level" }
];

export const WB_BUILDINGS = [
  { name: "Water Well", level: 2, coins: 100, ingredients: { Wood: 5 } },
  { name: "Hen House", level: 6, coins: 100, ingredients: { Wood: 30, Iron: 5, Gold: 5 } },
  { name: "Kitchen", level: 5, coins: 10, ingredients: { Wood: 30, Stone: 5 } },
  { name: "Compost Bin", level: 7, coins: 0, ingredients: { Wood: 5, Stone: 5 } },
  { name: "Bakery", level: 8, coins: 200, ingredients: { Wood: 50, Stone: 20, Gold: 5 } },
  { name: "Fish Market", level: 10, coins: 0, ingredients: { Wood: 50, Iron: 10, Gold: 5 } },
  { name: "Turbo Composter", level: 12, coins: 0, ingredients: { Wood: 50, Stone: 25 } },
  { name: "Deli", level: 16, coins: 300, ingredients: { Wood: 50, Stone: 50, Gold: 10 } },
  { name: "Premium Composter", level: 18, coins: 0, ingredients: { Gold: 50 } },
  { name: "Warehouse", level: 20, coins: 0, ingredients: { Wood: 250, Stone: 150, Potato: 5000, Pumpkin: 2000, Wheat: 500, Kale: 100 } },
  { name: "Smoothie Shack", level: 23, coins: 0, ingredients: { Wood: 25, Stone: 25, Iron: 10 } },
  { name: "Toolshed", level: 25, coins: 0, ingredients: { Wood: 500, Iron: 30, Gold: 25, Axe: 100, Pickaxe: 50 } },
  { name: "Barn", level: 30, coins: 200, ingredients: { Wood: 150, Iron: 10, Gold: 10 } },
  { name: "Crop Machine", level: 35, coins: 8000, ingredients: { Wood: 1250, Iron: 125, Crimstone: 50 } },
  { name: "Greenhouse", level: 46, coins: 4800, ingredients: { Wood: 500, Stone: 100, Crimstone: 25, Oil: 100 } },
  { name: "Crafting Box", level: 6, coins: 0, ingredients: { Wood: 100, Stone: 5 } },
  { name: "Pet House", level: 0, coins: 5000, ingredients: { Wood: 200, Stone: 100 } },
  { name: "Aging Shed", level: 0, coins: 200, ingredients: { Wood: 30 } }
];

const WB_UPGRADES = {
  "Water Well": [
    { coins: 200, ingredients: { Wood: 5, Stone: 2 } },
    { coins: 400, ingredients: { Wood: 5, Stone: 5 } },
    { coins: 800, ingredients: { Wood: 10, Stone: 10 } }
  ],
  "Hen House": [
    { coins: 7500, ingredients: { Wood: 500, Iron: 50, Gold: 40, Crimstone: 10 } },
    { coins: 50000, ingredients: { Wood: 2500, Iron: 150, Gold: 100, Crimstone: 50, Oil: 100 } }
  ],
  "Barn": [
    { coins: 10000, ingredients: { Wood: 1000, Iron: 100, Gold: 75, Crimstone: 30 } },
    { coins: 75000, ingredients: { Wood: 5000, Iron: 300, Gold: 200, Crimstone: 125, Oil: 250 } }
  ],
  "Pet House": [
    { coins: 0, ingredients: { "Chewed Bone": 1, Ribbon: 1, Ruffroot: 1, "Wild Grass": 1, "Heart leaf": 1, "Frost Pebble": 1, Dewberry: 1, Acorn: 10, Wood: 250 } },
    { coins: 0, ingredients: { "Chewed Bone": 5, Ribbon: 5, Ruffroot: 5, "Wild Grass": 5, "Heart leaf": 5, "Frost Pebble": 5, Dewberry: 5, Moonfur: 10, Acorn: 25, Stone: 200 } }
  ],
  "Aging Shed": [
    { coins: 3000, ingredients: { Stone: 100, Gold: 20 } },
    { coins: 4000, ingredients: { Wood: 500, Stone: 500 } },
    { coins: 10000, ingredients: { Gold: 100 } },
    { coins: 20000, ingredients: { Crimstone: 10 } },
    { coins: 100000, ingredients: {} }
  ],
  "Salt Sculpture": [
    { coins: 0, ingredients: { "Refined Salt": 45, "Capsule Bait": 10 } },
    { coins: 500, ingredients: { "Refined Salt": 60, "Capsule Bait": 10, "Umbrella Bait": 10 } },
    { coins: 1000, ingredients: { "Refined Salt": 70, "Greenhouse Glow": 5, "Greenhouse Goodie": 5 } },
    { coins: 1500, ingredients: { "Refined Salt": 85, "Sproutroot Surprise": 10, "Turbofruit Mix": 10 } },
    { coins: 2000, ingredients: { "Refined Salt": 100, "Crimson Baitfish": 10 } }
  ]
};

const WB_PERKS = {
  "Water Well": [
    "+8 plot fertility",
    "+8 plot fertility",
    "+8 plot fertility",
    "Unlocks all plot fertility"
  ],
  "Hen House": [
    "Capacity of 10 chickens",
    "+5 capacity (15 chickens)",
    "+5 capacity (20 chickens)"
  ],
  "Barn": [
    "Capacity of 10 sheep & cows",
    "+5 capacity (15 sheep & cows)",
    "+5 capacity (20 sheep & cows)"
  ],
  "Pet House": [
    "3 common pets, 1 NFT pet",
    "+2 common pet breeds, +3 NFT pet capacity (5 common, 4 NFT)",
    "+2 common pet breeds, +3 NFT pet capacity (7 common, 7 NFT)"
  ],
  "Aging Shed": [
    "1 slot in aging, fermentation and spice racks",
    "+1 slot in aging, fermentation and spice racks",
    "+1 slot in aging, fermentation and spice racks",
    "+1 slot in aging, fermentation and spice racks",
    "+1 slot in aging, fermentation and spice racks",
    "+1 slot in aging, fermentation and spice racks"
  ],
  "Salt Sculpture": [
    "x0.95 salt charge replenishment time",
    "+4% Prime Aging chance",
    "+1 max salt harvest cap per node",
    "x0.9 salt rake coin cost",
    "x0.95 Aging Rack Time",
    "+1 max salt harvest cap per node"
  ]
};

let wbUpgradeOpenName = null;

function wbGetOwnedQty(name) {
  if (!farmPanelGameState || typeof farmSyncExtractGameState !== "function") return 0;
  const g = farmSyncExtractGameState(farmPanelGameState);
  if (!g) return 0;
  const inv = typeof farmPanelField === "function" ? farmPanelField(g, "inventory") : g.inventory;
  if (!inv || typeof inv !== "object") return 0;
  const raw = inv[name];
  const q = typeof raw === "string" ? parseFloat(raw) : Number(raw);
  return isNaN(q) ? 0 : q;
}

function wbIngredientsHtml(ingredients) {
  const keys = Object.keys(ingredients || {});
  if (!keys.length) return '<div class="wb-ing-row wb-ing-none">No ingredients</div>';
  const chips = keys.map(name => {
    const need = ingredients[name];
    const have = wbGetOwnedQty(name);
    const short = have < need;
    return `<div class="wb-ing-chip${short ? " wb-ing-short" : ""}" title="${escapeHtml(name)}">
      <span class="wb-ing-icon">${getIcon(name)}</span>
      <span class="wb-ing-qty">${fmtInt(have)}/${fmtInt(need)}</span>
    </div>`;
  }).join("");
  return `<div class="wb-ing-row">${chips}</div>`;
}

function wbUpgradeLevelHtml(label, coins, ingredients) {
  const hasIng = Object.keys(ingredients || {}).length > 0;
  return `<div class="cb-item wb-upgrade-level">
    <div class="wb-tool-section-label">${escapeHtml(label)}</div>
    <div class="cb-item-cost">${fmtInt(coins)} ${COIN_ICON}</div>
    ${hasIng ? wbIngredientsHtml(ingredients) : ""}
  </div>`;
}

function wbUpgradeBase(name) {
  return WB_BUILDINGS.find(b => b.name === name) || WB_BOOSTS.find(b => b.name === name);
}

function wbUpgradePerksHtml(name) {
  const perks = WB_PERKS[name] || [];
  if (!perks.length) return "";
  const rows = perks.map((text, i) => `<div class="wb-perk-row">
    <div class="wb-perk-level">Level ${i + 1}</div>
    <div class="wb-perk-text">${escapeHtml(text)}</div>
  </div>`).join("");
  return `<div class="cb-item wb-upgrade-perks">
    <div class="wb-tool-section-label">Perks</div>
    ${rows}
  </div>`;
}

function wbUpgradePopupInnerHtml(name) {
  const base = wbUpgradeBase(name);
  const ups = WB_UPGRADES[name];
  if (!base || !ups) return "";
  const levels = [ wbUpgradeLevelHtml("Level 1", base.coins, base.ingredients) ]
    .concat(ups.map((u, i) => wbUpgradeLevelHtml("Level " + (i + 2), u.coins, u.ingredients)))
    .join("");
  return `<div class="cb-column wb-upgrade-card">
    <button type="button" class="wb-upgrade-close" id="wbUpgradeCloseBtn" aria-label="Close"><img src="${ICON_DATA["close.png"]}" alt="Close"></button>
    <div class="cb-column-label">${escapeHtml(name)} Upgrade</div>
    <div class="wb-upgrade-hero"><div class="cb-item-icon wb-item-icon">${getIcon(name)}</div></div>
    <div class="wb-upgrade-levels">${levels}${wbUpgradePerksHtml(name)}</div>
  </div>`;
}

function wbUpgradeLayerEl() {
  let el = document.getElementById("wbUpgradeLayer");
  if (el) return el;
  const panel = $("workbenchPanel");
  if (!panel) return null;
  el = document.createElement("div");
  el.id = "wbUpgradeLayer";
  panel.appendChild(el);
  new MutationObserver(() => {
    if (!panel.classList.contains("open")) wbCloseUpgradePopup();
  }).observe(panel, { attributes: true, attributeFilter: [ "class" ] });
  return el;
}

function wbOpenUpgradePopup(name) {
  const el = wbUpgradeLayerEl();
  if (!el) return;
  const html = wbUpgradePopupInnerHtml(name);
  if (!html) return;
  wbUpgradeOpenName = name;
  el.innerHTML = html;
  el.classList.add("show");
}

function wbCloseUpgradePopup() {
  wbUpgradeOpenName = null;
  const el = document.getElementById("wbUpgradeLayer");
  if (el) {
    el.classList.remove("show");
    el.innerHTML = "";
  }
}

function wbRefreshUpgradePopup() {
  if (!wbUpgradeOpenName) return;
  const el = document.getElementById("wbUpgradeLayer");
  if (el && el.classList.contains("show")) el.innerHTML = wbUpgradePopupInnerHtml(wbUpgradeOpenName);
}

document.addEventListener("click", e => {
  const closeBtn = e.target.closest("#wbUpgradeCloseBtn");
  if (closeBtn) {
    wbCloseUpgradePopup();
    return;
  }
  if (e.target && e.target.id === "wbUpgradeLayer") {
    wbCloseUpgradePopup();
    return;
  }
  const card = e.target.closest(".wb-upgradable");
  if (card) wbOpenUpgradePopup(card.getAttribute("data-wb-building"));
});

function wbItemTileHtml(item, showRestock) {
  const levelBadge = item.level ? `<div class="wb-level-badge">Lvl ${item.level}</div>` : "";
  const boostBadge = item.boost ? `<div class="wb-boost-badge">${escapeHtml(item.boost)}</div>` : "";
  const expBadge = item.baseExp !== undefined ? `<div class="wb-exp-badge">+${fmtInt(item.baseExp)} Animal XP (base)</div>` : "";
  const priceHtml = item.price !== undefined
    ? `<div class="cb-item-cost">${fmtInt(item.price)} ${COIN_ICON}</div>`
    : item.coins !== undefined
      ? `<div class="cb-item-cost">${fmtInt(item.coins)} ${COIN_ICON}</div>`
      : "";
  const baseStock = showRestock ? BASE_STOCK_TOOLS[item.name] : undefined;
  const restockHtml = baseStock !== undefined
    ? `<div class="wb-restock-note">Base Restock Stock: ${fmtInt(baseStock)}</div>`
    : "";
  const upgradable = !!WB_UPGRADES[item.name] && (WB_BUILDINGS.indexOf(item) !== -1 || WB_BOOSTS.indexOf(item) !== -1);
  const upgradeBadge = upgradable ? `<img class="wb-upgrade-badge" src="${WB_UPGRADE_ICON}" alt="Upgradable">` : "";
  const upgradeAttrs = upgradable ? ` data-wb-building="${escapeHtml(item.name)}"` : "";
  return `<div class="cb-item wb-item${upgradable ? " wb-upgradable" : ""}"${upgradeAttrs} title="${escapeHtml(item.name)}">
    ${upgradeBadge}
    <div class="cb-item-icon wb-item-icon">${getIcon(item.name)}</div>
    <div class="cb-item-name">${escapeHtml(item.name)}</div>
    ${levelBadge}
    ${priceHtml}
    ${boostBadge}
    ${expBadge}
    ${wbIngredientsHtml(item.ingredients)}
    ${restockHtml}
  </div>`;
}

function wbToolsSectionHtml() {
  const sections = WB_TOOL_SECTION_ORDER.map(key => `
    <div class="wb-tool-section">
      <div class="wb-tool-section-label">${escapeHtml(WB_TOOL_SECTION_LABELS[key])}</div>
      <div class="cb-grid">${WB_TOOLS[key].map(item => wbItemTileHtml(item, true)).join("")}</div>
    </div>
  `).join("");
  return `<div class="cb-column wb-container">
    <div class="cb-column-label">Tools</div>
    ${sections}
  </div>`;
}

function wbBoostSectionHtml() {
  return `<div class="cb-column wb-container">
    <div class="cb-column-label">Boost</div>
    <div class="cb-note wb-boost-note">All 12 items below craft from the Workbench's Boost tab on every island (Basic, Spring, Desert, Volcano and beyond) — none of them are land-locked. If an item isn't showing for you, scroll the panel further; it's not hidden behind a specific island.</div>
    <div class="cb-grid">${WB_BOOSTS.map(item => wbItemTileHtml(item)).join("")}</div>
  </div>`;
}

function wbBuildSectionHtml() {
  return `<div class="cb-column wb-container">
    <div class="cb-column-label">Build</div>
    <div class="cb-grid">${WB_BUILDINGS.map(item => wbItemTileHtml(item)).join("")}</div>
  </div>`;
}

export function renderWorkbenchPanel() {
  const body = $("workbenchBody");
  if (!body) return;
  body.innerHTML = `
    <div class="cb-title">Workbench Recipes</div>
    <div class="cb-note">Every item below is the real Workbench data (Tools, Boost &amp; Build tabs) pulled from the game's own source, shown as base values only — not affected by any of your active boosts. Ingredient chips show YOUR-QTY/NEEDED-QTY — the first number is synced live from your farm's inventory, the second is the fixed recipe requirement. A red chip means you're short on that material. Tools also list their Base Restock Stock for reference only (see the Boost panel's Stocks tab for live restock math). Animal Care tools show their base Animal XP per use (before any Heartwarming Instruments skill or animal-specific bonuses).</div>
    <div class="wb-columns">${wbToolsSectionHtml()}${wbBoostSectionHtml()}${wbBuildSectionHtml()}</div>
  `;
  wbRefreshUpgradePopup();
}
