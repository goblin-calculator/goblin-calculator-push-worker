import { FLOWER_ICON, coinsToFlower, escapeHtml, farmSyncAsObj } from "./calculator.js";

import { farmPanelGameState } from "./inprogress.js";

import { cookingIngredientUnitCostCoins, getItemCostByName } from "./prices.js";

import { safeLSJSON } from "./storage.js";

import { $, getIcon } from "./ui.js";

const CRAFTING_RECIPES = [
  {
    id: "angler_doll",
    name: "Angler Doll",
    category: "dolls",
    grid: [ "Kelp Fibre", "Kelp Fibre", "Kelp Fibre", "Kelp Fibre", "Doll", "Kelp Fibre", "Kelp Fibre", "Kelp Fibre", "Kelp Fibre" ]
  },
  {
    id: "bigfin_doll",
    name: "Bigfin Doll",
    category: "dolls",
    grid: [ "Angler Doll", "Angler Doll", "Angler Doll", "Angler Doll", "Gilded Doll", "Angler Doll", "Angler Doll", "Angler Doll", "Angler Doll" ]
  },
  {
    id: "bloom_doll",
    name: "Bloom Doll",
    category: "dolls",
    grid: [ "Prism Petal", "Prism Petal", "Prism Petal", "Celestial Frostbloom", "Doll", "Celestial Frostbloom", "Primula Enigma", "Primula Enigma", "Primula Enigma" ]
  },
  {
    id: "buzz_doll",
    name: "Buzz Doll",
    category: "dolls",
    grid: [ "Honey", "Honey", "Honey", "Honey", "Doll", "Honey", "Honey", "Honey", "Honey" ]
  },
  {
    id: "cluck_doll",
    name: "Cluck Doll",
    category: "dolls",
    grid: [ "Feather", "Feather", "Feather", "Feather", "Doll", "Feather", "Feather", "Feather", "Feather" ]
  },
  {
    id: "cosmo_doll",
    name: "Cosmo Doll",
    category: "dolls",
    grid: [ "Bloom Doll", "Bloom Doll", "Bloom Doll", "Bloom Doll", "Gilded Doll", "Bloom Doll", "Bloom Doll", "Bloom Doll", "Bloom Doll" ]
  },
  {
    id: "crude_doll",
    name: "Crude Doll",
    category: "dolls",
    grid: [ "Oil", "Oil", "Oil", "Oil", "Doll", "Oil", "Oil", "Oil", "Oil" ]
  },
  {
    id: "doll",
    name: "Doll",
    category: "dolls",
    grid: [ "Leather", "Wool", "Leather", "Wool", "Wool", "Wool", "Leather", "Wool", "Leather" ]
  },
  {
    id: "dune_doll",
    name: "Dune Doll",
    category: "dolls",
    grid: [ "Coral", "Coral", "Coral", "Coral", "Lumber Doll", "Coral", "Coral", "Coral", "Coral" ]
  },
  {
    id: "ember_doll",
    name: "Ember Doll",
    category: "dolls",
    grid: [ "Crimsteel", "Crimsteel", "Crimsteel", "Crimsteel", "Doll", "Crimsteel", "Crimsteel", "Crimsteel", "Crimsteel" ]
  },
  {
    id: "frosty_doll",
    name: "Frosty Doll",
    category: "dolls",
    grid: [ "Celestial Frostbloom", "Celestial Frostbloom", "Celestial Frostbloom", "Celestial Frostbloom", "Harvest Doll", "Celestial Frostbloom", "Celestial Frostbloom", "Celestial Frostbloom", "Celestial Frostbloom" ]
  },
  {
    id: "gilded_doll",
    name: "Gilded Doll",
    category: "dolls",
    grid: [ "Gold", "Gold", "Gold", "Gold", "Doll", "Gold", "Gold", "Gold", "Gold" ]
  },
  {
    id: "grubby_doll",
    name: "Grubby Doll",
    category: "dolls",
    grid: [ "", "", "", "Shadow Doll", "Ember Doll", "Gilded Doll", "", "", "" ]
  },
  {
    id: "harvest_doll",
    name: "Harvest Doll",
    category: "dolls",
    grid: [ "Turnip", "Turnip", "Turnip", "Turnip", "Doll", "Turnip", "Turnip", "Turnip", "Turnip" ]
  },
  {
    id: "jacuzzi_bear",
    name: "Jacuzzi Bear",
    category: "dolls",
    grid: [ "Refined Salt", "Refined Salt", "Refined Salt", "Refined Salt", "Basic Bear", "Refined Salt", "Refined Salt", "Refined Salt", "Refined Salt" ]
  },
  {
    id: "juicy_doll",
    name: "Juicy Doll",
    category: "dolls",
    grid: [ "Tomato", "Tomato", "Tomato", "Tomato", "Doll", "Tomato", "Tomato", "Tomato", "Tomato" ]
  },
  {
    id: "lumber_doll",
    name: "Lumber Doll",
    category: "dolls",
    grid: [ "Timber", "Timber", "Timber", "Timber", "Doll", "Timber", "Timber", "Timber", "Timber" ]
  },
  {
    id: "lunar_doll",
    name: "Lunar Doll",
    category: "dolls",
    grid: [ "Lunara", "Lunara", "Lunara", "Duskberry", "Doll", "Duskberry", "Celestine", "Celestine", "Celestine" ]
  },
  {
    id: "moo_doll",
    name: "Moo Doll",
    category: "dolls",
    grid: [ "Leather", "Leather", "Leather", "Leather", "Doll", "Leather", "Leather", "Leather", "Leather" ]
  },
  {
    id: "mouse_doll",
    name: "Mouse Doll",
    category: "dolls",
    grid: [ "Hardened Leather", "Hardened Leather", "Hardened Leather", "Hardened Leather", "Cluck Doll", "Hardened Leather", "Hardened Leather", "Hardened Leather", "Hardened Leather" ]
  },
  {
    id: "nefari_doll",
    name: "Nefari Doll",
    category: "dolls",
    grid: [ "Vase", "Royal Ornament", "Vase", "Vase", "Gilded Doll", "Vase", "Vase", "Vase", "Vase" ]
  },
  {
    id: "salt_doll",
    name: "Salt Doll",
    category: "dolls",
    grid: [ "Pickled Pepper", "Pickled Pepper", "Pickled Pepper", "Refined Salt", "Doll", "Refined Salt", "Refined Salt", "Refined Salt", "Refined Salt" ]
  },
  {
    id: "shadow_doll",
    name: "Shadow Doll",
    category: "dolls",
    grid: [ "Obsidian", "Obsidian", "Obsidian", "Obsidian", "Doll", "Obsidian", "Obsidian", "Obsidian", "Obsidian" ]
  },
  {
    id: "sizzle_doll",
    name: "Sizzle Doll",
    category: "dolls",
    grid: [ "Synthetic Fabric", "Synthetic Fabric", "Synthetic Fabric", "Synthetic Fabric", "Doll", "Synthetic Fabric", "Synthetic Fabric", "Synthetic Fabric", "Synthetic Fabric" ]
  },
  {
    id: "solar_doll",
    name: "Solar Doll",
    category: "dolls",
    grid: [ "", "", "", "", "", "", "", "", "" ]
  },
  {
    id: "wooly_doll",
    name: "Wooly Doll",
    category: "dolls",
    grid: [ "Merino Wool", "Merino Wool", "Merino Wool", "Merino Wool", "Doll", "Merino Wool", "Merino Wool", "Merino Wool", "Merino Wool" ]
  },
  {
    id: "basic_bear",
    name: "Basic Bear",
    category: "ingredients",
    grid: [ "Wool", "", "Wool", "", "Wool", "", "Wool", "Wool", "Wool" ]
  },
  {
    id: "bee_box",
    name: "Bee Box",
    category: "ingredients",
    grid: [ "Honey", "Honey", "Honey", "Honey", "Red Pansy", "Honey", "Honey", "Honey", "Honey" ]
  },
  {
    id: "crimsteel",
    name: "Crimsteel",
    category: "ingredients",
    grid: [ "Crimstone", "Crimstone", "Crimstone", "Iron", "Iron", "Iron", "", "", "" ]
  },
  {
    id: "cushion",
    name: "Cushion",
    category: "ingredients",
    grid: [ "Feather", "Feather", "Feather", "Feather", "Feather", "Feather", "Feather", "Feather", "Feather" ]
  },
  {
    id: "hardened_leather",
    name: "Hardened Leather",
    category: "ingredients",
    grid: [ "Leather", "Leather", "Leather", "Leather", "Leather", "Leather", "Leather", "Leather", "Leather" ]
  },
  {
    id: "kelp_fibre",
    name: "Kelp Fibre",
    category: "ingredients",
    grid: [ "Seaweed", "Seaweed", "Seaweed", "Seaweed", "Seaweed", "Seaweed", "Seaweed", "Seaweed", "Seaweed" ]
  },
  {
    id: "merino_cushion",
    name: "Merino Cushion",
    category: "ingredients",
    grid: [ "Merino Wool", "Merino Wool", "Merino Wool", "Merino Wool", "Merino Wool", "Merino Wool", "Merino Wool", "Merino Wool", "Merino Wool" ]
  },
  {
    id: "oceans_treasure",
    name: "Ocean's Treasure",
    category: "ingredients",
    grid: [ "Coral", "Coral", "Coral", "Pearl", "Pirate Bounty", "Pearl", "Coral", "", "Coral" ]
  },
  {
    id: "royal_bedding",
    name: "Royal Bedding",
    category: "ingredients",
    grid: [ "Merino Cushion", "Synthetic Fabric", "Merino Cushion", "Synthetic Fabric", "Merino Cushion", "Synthetic Fabric", "Merino Cushion", "Synthetic Fabric", "Merino Cushion" ]
  },
  {
    id: "royal_ornament",
    name: "Royal Ornament",
    category: "ingredients",
    grid: [ "Gold", "Gold", "Gold", "Gold", "Crimstone", "Gold", "Crimstone", "Crimstone", "Crimstone" ]
  },
  {
    id: "synthetic_fabric",
    name: "Synthetic Fabric",
    category: "ingredients",
    grid: [ "Oil", "Oil", "Oil", "Oil", "Oil", "Oil", "Wool", "Wool", "Wool" ]
  },
  {
    id: "timber",
    name: "Timber",
    category: "ingredients",
    grid: [ "Wood", "Wood", "Wood", "Wood", "Wood", "Wood", "Wood", "Wood", "Wood" ]
  },
  {
    id: "basic_bed",
    name: "Basic Bed",
    category: "beds",
    grid: [ "Cushion", "Cushion", "Cushion", "Timber", "Cushion", "Timber", "Timber", "Timber", "Timber" ]
  },
  {
    id: "fisher_bed",
    name: "Fisher Bed",
    category: "beds",
    grid: [ "Kelp Fibre", "Kelp Fibre", "Kelp Fibre", "Kelp Fibre", "Kelp Fibre", "Kelp Fibre", "", "Basic Bed", "" ]
  },
  {
    id: "floral_bed",
    name: "Floral Bed",
    category: "beds",
    grid: [ "Prism Petal", "Celestial Frostbloom", "Primula Enigma", "Red Pansy", "Blue Pansy", "Yellow Pansy", "Basic Bed", "Bee Box", "Basic Bed" ]
  },
  {
    id: "sturdy_bed",
    name: "Sturdy Bed",
    category: "beds",
    grid: [ "Merino Cushion", "Merino Cushion", "Merino Cushion", "Crimsteel", "Crimsteel", "Crimsteel", "Crimsteel", "Basic Bed", "Crimsteel" ]
  },
  {
    id: "desert_bed",
    name: "Desert Bed",
    category: "beds",
    grid: [ "Synthetic Fabric", "Synthetic Fabric", "Synthetic Fabric", "Synthetic Fabric", "Synthetic Fabric", "Synthetic Fabric", "Synthetic Fabric", "Sturdy Bed", "Synthetic Fabric" ]
  },
  {
    id: "cow_bed",
    name: "Cow Bed",
    category: "beds",
    grid: [ "Hardened Leather", "Hardened Leather", "Hardened Leather", "Hardened Leather", "Hardened Leather", "Hardened Leather", "Sturdy Bed", "Hardened Leather", "Sturdy Bed" ]
  },
  {
    id: "pirate_bed",
    name: "Pirate Bed",
    category: "beds",
    grid: [ "Kelp Fibre", "Kelp Fibre", "Kelp Fibre", "Vase", "Ocean's Treasure", "Vase", "Sturdy Bed", "Sturdy Bed", "Sturdy Bed" ]
  },
  {
    id: "royal_bed",
    name: "Royal Bed",
    category: "beds",
    grid: [ "Royal Bedding", "Royal Bedding", "Royal Bedding", "Royal Ornament", "Royal Ornament", "Royal Ornament", "Sturdy Bed", "Sturdy Bed", "Sturdy Bed" ]
  }
];

const CB_CATEGORY_LABELS = {
  dolls: "Dolls",
  ingredients: "Ingredients",
  beds: "Beds"
};

const CB_CATEGORY_ORDER = [ "dolls", "ingredients", "beds" ];

const CB_RECIPE_SLOTS = 9;

const CB_LEARNED_KEY = "hl_crafting_box_learned_recipes";

const CB_RECIPES_BY_NAME = {};

CRAFTING_RECIPES.forEach((recipe) => {
  CB_RECIPES_BY_NAME[recipe.name] = recipe;
});

function cbLoadLearned() {
  const data = safeLSJSON(localStorage.getItem(CB_LEARNED_KEY), {});
  return data && typeof data === "object" ? data : {};
}

function cbSaveLearned(learned) {
  try {
    localStorage.setItem(CB_LEARNED_KEY, JSON.stringify(learned));
  } catch (e) {}
}

function cbNormalizeIngredientSlots(ingredients) {
  const slots = new Array(CB_RECIPE_SLOTS).fill("");
  (Array.isArray(ingredients) ? ingredients : []).slice(0, CB_RECIPE_SLOTS).forEach((ing, i) => {
    if (ing && ing.collectible) slots[i] = ing.collectible;
  });
  return slots;
}

function cbLearnRecipe(name, ingredients) {
  if (!name || CB_RECIPES_BY_NAME[name]) return;
  const slots = cbNormalizeIngredientSlots(ingredients);
  if (!slots.some((s) => s)) return;
  const learned = cbLoadLearned();
  learned[name] = {
    grid: slots,
    learnedAt: Date.now()
  };
  cbSaveLearned(learned);
}

function cbIngestFarm() {
  const craftingBox = farmSyncAsObj(farmPanelGameState && farmPanelGameState.craftingBox);
  if (!craftingBox) return;
  const recipes = farmSyncAsObj(craftingBox.recipes) || {};
  Object.keys(recipes).forEach((name) => {
    const recipe = farmSyncAsObj(recipes[name]);
    if (recipe) cbLearnRecipe(name, recipe.ingredients);
  });
  (Array.isArray(craftingBox.queue) ? craftingBox.queue : []).forEach((q) => {
    if (q && q.name) cbLearnRecipe(q.name, q.ingredients);
  });
}

function cbGetGrid(name) {
  const known = CB_RECIPES_BY_NAME[name];
  if (known) return known.grid;
  const learned = cbLoadLearned();
  return learned[name] ? learned[name].grid : null;
}

let cbCostMode = "collect";

const cbCostCache = new Map();

function cbClearCostCache() {
  cbCostCache.clear();
}

function cbUnitCostCoins(name, visited) {
  if (!name) return 0;
  if (cbCostCache.has(name)) return cbCostCache.get(name);
  visited = visited || new Set();
  if (visited.has(name)) return 0;
  const grid = cbGetGrid(name);
  let cost;
  if (grid) {
    visited.add(name);
    cost = 0;
    grid.forEach((slot) => {
      if (slot) cost += cbUnitCostCoins(slot, visited);
    });
    visited.delete(name);
  } else {
    try {
      cost = getItemCostByName(name) || 0;
    } catch (e) {
      cost = 0;
    }
  }
  cbCostCache.set(name, cost);
  return cost;
}

function cbRecipeGridHtml(grid) {
  const slots = grid || new Array(CB_RECIPE_SLOTS).fill("");
  const cells = slots.map((s) => {
    if (!s) return '<div class="cb-recipe-slot cb-recipe-slot-empty"></div>';
    return `<div class="cb-recipe-slot" title="${escapeHtml(s)}">${getIcon(s)}</div>`;
  }).join("");
  return `<div class="cb-recipe-grid">${cells}</div>`;
}

export function craftingBoxHasRecipe(name) {
  cbIngestFarm();
  return !!cbGetGrid(name);
}

export function craftingBoxUnitCostCoins(name) {
  cbIngestFarm();
  return cbUnitCostCoins(name);
}

function cbUnitCostCoinsForMode(name, mode, visited) {
  if (!name) return 0;
  visited = visited || new Set();
  if (visited.has(name)) return 0;
  const grid = cbGetGrid(name);
  if (grid) {
    visited.add(name);
    let total = 0;
    grid.forEach((slot) => {
      if (slot) total += cbUnitCostCoinsForMode(slot, mode, visited);
    });
    visited.delete(name);
    return total;
  }
  let cost = 0;
  if (mode === "buy") {
    try {
      cost = cookingIngredientUnitCostCoins(name, "buy") || 0;
    } catch (e) {
      cost = 0;
    }
  }
  if (!(cost > 0)) {
    try {
      cost = getItemCostByName(name) || 0;
    } catch (e) {
      cost = 0;
    }
  }
  return cost;
}

export function craftingBoxUnitCostCoinsForMode(name, mode) {
  cbIngestFarm();
  return cbUnitCostCoinsForMode(name, mode);
}

export function craftingBoxClearCostCache() {
  cbClearCostCache();
}

function cbItemTileHtml(name) {
  const grid = cbGetGrid(name);
  const hasIngredients = !!(grid && grid.some((s) => s));
  let costHtml;
  if (hasIngredients) {
    const flowerCost = coinsToFlower(cbUnitCostCoinsForMode(name, cbCostMode));
    costHtml = `<div class="cb-item-cost">${flowerCost.toFixed(2)} ${FLOWER_ICON}</div>`;
  } else {
    costHtml = `<div class="cb-item-cost cb-item-cost-unknown">— ${FLOWER_ICON}</div>`;
  }
  return `<div class="cb-item" title="${escapeHtml(name)}">
    <div class="cb-item-icon">${getIcon(name)}</div>
    <div class="cb-item-name">${escapeHtml(name)}</div>
    ${costHtml}
    ${cbRecipeGridHtml(grid)}
  </div>`;
}

function cbColumnHtml(category) {
  const items = CRAFTING_RECIPES.filter((r) => r.category === category).map((r) => r.name);
  return `<div class="cb-column">
    <div class="cb-column-label">${escapeHtml(CB_CATEGORY_LABELS[category])}</div>
    <div class="cb-grid">${items.map(cbItemTileHtml).join("")}</div>
  </div>`;
}

export function renderCraftingBoxPanel() {
  const body = $("craftingBoxBody");
  if (!body) return;
  cbIngestFarm();
  cbClearCostCache();
  body.innerHTML = `
    <div class="cb-title">Crafting Box Recipes</div>
    <div class="cb-note">HOW THE COST IS COMPUTED: each item's cost is the sum of the unit cost of every filled slot in its 3x3 recipe. Every ingredient (crop, resource, fish, flower or another crafted item) is priced with this calculator's own cost engine — the same getItemCostByName cascade every other panel here already uses — and craftable ingredients (Doll, Basic Bear, Sturdy Bed, etc.) are resolved recursively through their own recipe first. The total coin cost is then converted to FLOWER at the current coin/FLOWER rate. An empty grid slot means that slot uses no ingredient.</div>
    <div class="cb-columns" id="craftingBoxColumns">
      <div class="cb-column">
        <div class="fdm-inline">
          <div class="fd-section-label">Materials</div>
          <div class="fdm-pair">
            <button type="button" data-cb-cost="collect" class="fd-lb-tab${cbCostMode === "collect" ? " active" : ""}">Collect</button>
            <button type="button" data-cb-cost="buy" class="fd-lb-tab${cbCostMode === "buy" ? " active" : ""}">Buy</button>
          </div>
        </div>
      </div>
      ${CB_CATEGORY_ORDER.map(cbColumnHtml).join("")}
    </div>
  `;
  body.querySelectorAll("[data-cb-cost]").forEach((btn) => {
    btn.onclick = () => {
      if (cbCostMode === btn.dataset.cbCost) return;
      cbCostMode = btn.dataset.cbCost === "buy" ? "buy" : "collect";
      renderCraftingBoxPanel();
    };
  });
}
