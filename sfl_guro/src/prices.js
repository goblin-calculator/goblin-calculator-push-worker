import { computeSpiceFigures, __set_restockGemMode, clearFlowerAutoPickMemo, esReqUnitCoins, ANIMAL_DATA, BASE_COMPOSTERS, BASE_CROPS, BASE_FRUITS, BASE_GREENHOUSE, BOOSTS, COIN_ICON, COOKING_BUILDINGS, COOKING_RECIPES, CRUSTACEAN_CATCH_DATA, CRUSTACEAN_TRAP_TOOL_ID, ES_ASCENSION_UPGRADE_BASE_COINS, ES_ASCENSION_UPGRADE_BASE_ITEMS, ES_ISLAND_UPGRADE_COST, ES_SWAMP_EXPANSIONS_PER_ASCENSION, FARM_LEVELS, FEED_RECIPE, FISH_CATCH_DATA, FISH_MARKET_CRAB_STICK_P2P_REF, FISH_MARKET_GUARANTEED_CATCH, FISH_MARKET_ITEM_NAMES, FISH_MARKET_META_DEFAULTS, FISH_MARKET_SEASON_RECIPES, FLOWER_ICON, FLOWER_SEEDS, FLOWER_VARIETIES, GUNTER_FLOWER_COST_MODE_LS_KEY, GUNTER_UPGRADE_NODES, LIMITED_TIME_BOOSTS, PET_COST_TRACK_RESOURCES, PET_FOOD_LISTS, PET_NOT_TRADABLE, PET_RESOURCE_DEFAULT_MARKET, PET_TRADABLE_RESOURCES, PICKLED_VEG_DATA, PRICE_SOURCE_LABELS, RESOURCE_DATA, RESTOCK_GEM_COST, SCULPTURE_LEVELS, SHRINE_RECIPES, SPICE_RECIPES, __boostedCropStatsMemo, __boostedFruitStatsMemo, __boostedGreenhouseStatsMemo, __boostedLavaPitStatsMemo, __boostedResourceStatsMemo, __cookingFoodExpMemo, __cookingFoodTimeMemo, __fishAgedFiguresMemo, __fishBasicFiguresMemo, __fishCatchXPMemo, __petCardMemo, __profileTradableRowsCacheG, __set___crabFiguresMemo, __set___profileTradableRowsCacheByTab, __set___profileTradableRowsCacheG, __set___seaweedFiguresMemo, coinPerFlower, coinsToFlower, computeAgedFishFigures, computeAnimalTypeFigures, computeBaitFigures, computeBasicFishFigures, computeBoostedCropStats, computeBoostedFlowerVarietyStats, computeBoostedFruitStats, computeBoostedGreenhouseStats, computeBoostedStock, computeComposterFigures, computeCrabFigures, computeCrustaceanFigures, computeFertilizerFigures, computeHiveEconomics, computeLavaPitFigures, computeResourceFigures, computeSaltFarmFigures, computeSeaweedFigures, cookingGuaranteedCatchOn, crustaceanTrapIsFree, currentSeason, esBigFloorDiv, esBigIntPow, esState, escapeHtml, findTool, fishCatchYieldMult, fishingBoostsActiveByScope, fishingRodIsFree, flowerPerGem, flowerSeedOverrides, fmt, fmtFlowerPrice, gemsToFlower, getActiveBoostsForCrop, getActiveBoostsForFruit, getActiveBoostsForGreenhouse, getActiveFermentationSpiceExpectedMult, getActiveSaltBoosts, getAgingMaxXPLocal, getAnimalCount, getBoostCoverageFraction, getBoostedMedicineRecipe, getBoostedToolRecipe, getGenericPlotOrNodeCount, getGlobalCureModifiers, getKaleMixKaleQty, getMaterialMode, getMedicineIngredientMode, getPoolIndex, getSharedPoolDivisor, getShrineAffectedItemCount, getSpiceLickDurationHarvests, getVarietyIngredient, gunterSelectedUpgrade, gunterUpgradeCounts, hasLimitedBoostSyncData, isAppDarkModeOn, getSkillRankMult, isBoostActive, isBuildingBoostActive, isFertilizerTierEnabled, isPetFoodChecked, normalizeItemName, normalizeSearch, petBoostActiveWithField, petComputeCardCached, petsData, previewSeason, profileState, restockGemMode, restockSharedExcluded, safeParse, saltFarmLevel, saltSculptureLevel, selectedHoneyFlower, setAppDarkMode, setPreviewSeason, shrineIdFromBoostName, spiceMaterialMode, toast, toolRecipes, updateCalcSummary, updateLiveSyncStatus, vegMaterialMode } from "./calculator.js";

import { farmPanelGetBoostedYieldStats, farmPanelGetMarketPriceFlower, farmPanelGrowTimeSec } from "./inprogress.js";

import { safeLSJSON, saveFlowerSeedOverrides, saveMarketState } from "./storage.js";

import { $, getBoostIcon, getIcon, getPetResourceIcon, renderBettyShop, renderCookingPanel, renderCropsList, renderFishingPanel, renderFruitsList, renderGreenhouseList, renderHoneyList, renderProfileTradable, renderShrineProfitabilityBlock } from "./ui.js";

const CANCEL_ICON_SFL_SRC = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAsAAAALBAMAAABbgmoVAAAABGdBTUEAALGPC/xhBQAAABJQTFRFAAAA/5mc////5DtEJitE9nV62ycwCgAAAAF0Uk5TAEDm2GYAAABBSURBVAjXHYzBCcBACAT3YQupRP3LmVSg238r0YOBZWBYyIsB54kByWbNOKkBMbYB+MgAhMVeUR/NMt1SI7e8Lz8UXQ3kGudprwAAAABJRU5ErkJggg==";

const TIMER_ICON_SFL_SRC = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAALBAMAAACwtdEWAAAABGdBTUEAALGPC/xhBQAAABtQTFRFAAAA/////udhwMvc/q40cz4513ZDvkovGBQls3fIyQAAAAF0Uk5TAEDm2GYAAAA5SURBVAjXY+gAAoa28vIMhtbQ0AgGDmPjBgaGRgkGBgYOIIOhSQPIcHFpYGhLS8tgaC8vr2AA6QAAmEgPFCojcQMAAAAASUVORK5CYII=";

export const CANCEL_ICON_SFL = `<img src="${CANCEL_ICON_SFL_SRC}" alt="cancel" style="width:11px;height:11px;vertical-align:-1px;image-rendering:pixelated;">`;

export const TIMER_ICON_SFL = `<img src="${TIMER_ICON_SFL_SRC}" alt="timer" style="width:8px;height:11px;vertical-align:-1px;image-rendering:pixelated;">`;

document.addEventListener("click", e => {
  const el = e.target.closest("button, .btn, .card-toggle, .library-toggle, .settings-toggle, .lib-item-price, .icon-btn, .modal-close, .mode-btn");
  if (!el) return;
  el.classList.remove("btn-pop");
  void el.offsetWidth;
  el.classList.add("btn-pop");
  el.addEventListener("animationend", () => el.classList.remove("btn-pop"), {
    once: true
  });
});

export function getArtistCoinCostMult() {
  if (!isBuildingBoostActive("artist_discount")) return 1;
  const b = BOOSTS.find(x => x.id === "artist_discount");
  return b && b.coinCostMultAll || 1;
}

export function isMoonSeedItem(kind, itemName) {
  return kind === "seed" && !!itemName && !!BASE_FRUITS[itemName] && !!BASE_FRUITS[itemName].moonOnly;
}

export function wholeRestocks(n) {
  return n > 0 ? Math.ceil(n - 1e-9) : 0;
}

export function restocksForMode(n) {
  return restockCostMode === "individual" ? wholeRestocks(n) : n;
}

export function computeRestockCost24hDetailed(baseStock, kind, count, cyclesPerDay, cyclesPerStockUnit, maxRestocksPerDay, itemName) {
  const empty = {
    flowerCost: 0,
    boostedStock: 0,
    itemsNeededPerDay: 0,
    restocksPerDay: 0,
    gemCostPerRestock: 0,
    gemsPerDay: 0,
    stockKind: kind,
    name: itemName
  };
  if (!baseStock || !count || !cyclesPerDay || isMoonSeedItem(kind, itemName)) return empty;
  const boostedStock = computeBoostedStock(baseStock, kind, itemName);
  const stockConsumingCyclesPerDay = cyclesPerDay / (cyclesPerStockUnit || 1);
  const itemsNeededPerDay = count * stockConsumingCyclesPerDay;
  const cyclesPerRestock = boostedStock / count;
  if (cyclesPerRestock <= 0) return Object.assign({}, empty, { boostedStock: boostedStock, itemsNeededPerDay: itemsNeededPerDay });
  let restocksPerDay = restocksForMode(stockConsumingCyclesPerDay / cyclesPerRestock);
  if (maxRestocksPerDay != null) restocksPerDay = Math.min(restocksPerDay, maxRestocksPerDay);
  const gemCost = typeof getRestockGemCost === "function" ? getRestockGemCost(kind, itemName) : kind === "tool" ? RESTOCK_GEM_COST.tools : RESTOCK_GEM_COST.seeds;
  const gemsPerDay = restocksPerDay * gemCost;
  const flowerCost = typeof gemsToFlower === "function" ? gemsToFlower(gemsPerDay) : 0;
  return {
    flowerCost: flowerCost,
    boostedStock: boostedStock,
    itemsNeededPerDay: itemsNeededPerDay,
    restocksPerDay: restocksPerDay,
    gemCostPerRestock: gemCost,
    gemsPerDay: gemsPerDay,
    stockKind: kind,
    name: itemName
  };
}

export function computeRestockCost24hDetailedIndividual(baseStock, kind, count, cyclesPerDay, cyclesPerStockUnit, maxRestocksPerDay, itemName) {
  const empty = {
    flowerCost: 0,
    boostedStock: 0,
    itemsNeededPerDay: 0,
    restocksPerDay: 0,
    gemCostPerRestock: 0,
    gemsPerDay: 0,
    stockKind: kind,
    name: itemName
  };
  if (!baseStock || !count || !cyclesPerDay || isMoonSeedItem(kind, itemName)) return empty;
  const boostedStock = computeBoostedStock(baseStock, kind, itemName);
  const stockConsumingCyclesPerDay = cyclesPerDay / (cyclesPerStockUnit || 1);
  const itemsNeededPerDay = count * stockConsumingCyclesPerDay;
  const cyclesPerRestock = boostedStock / count;
  if (cyclesPerRestock <= 0) return Object.assign({}, empty, { boostedStock: boostedStock, itemsNeededPerDay: itemsNeededPerDay });
  let restocksPerDay = wholeRestocks(stockConsumingCyclesPerDay / cyclesPerRestock);
  if (maxRestocksPerDay != null) restocksPerDay = Math.min(restocksPerDay, maxRestocksPerDay);
  const gemCost = kind === "tool" ? (typeof getRestockGemCost === "function" ? getRestockGemCost(kind, itemName) : RESTOCK_GEM_COST.tools) : (typeof getRestockGemCostIndividual === "function" ? getRestockGemCostIndividual(kind) : RESTOCK_GEM_COST.seeds);
  const gemsPerDay = restocksPerDay * gemCost;
  const flowerCost = typeof gemsToFlower === "function" ? gemsToFlower(gemsPerDay) : 0;
  return {
    flowerCost: flowerCost,
    boostedStock: boostedStock,
    itemsNeededPerDay: itemsNeededPerDay,
    restocksPerDay: restocksPerDay,
    gemCostPerRestock: gemCost,
    gemsPerDay: gemsPerDay,
    stockKind: kind,
    name: itemName
  };
}

export function computeRestockCost24h(baseStock, kind, count, cyclesPerDay, cyclesPerStockUnit, maxRestocksPerDay, itemName) {
  return computeRestockCost24hDetailed(baseStock, kind, count, cyclesPerDay, cyclesPerStockUnit, maxRestocksPerDay, itemName).flowerCost;
}

export function getFlowerSeedTypeCost(seedKey) {
  const o = flowerSeedOverrides[seedKey];
  return o && o.seedCost != null ? parseFloat(o.seedCost) : FLOWER_SEEDS[seedKey].seedCost || 0;
}

export function getFlowerSeedEffectiveCost(seedKey) {
  return getFlowerSeedTypeCost(seedKey) * getSkillRankMult("skill_flower_sale") * getArtistCoinCostMult();
}

export function setFlowerSeedTypeCost(seedKey, val) {
  if (!flowerSeedOverrides[seedKey]) flowerSeedOverrides[seedKey] = {};
  flowerSeedOverrides[seedKey].seedCost = parseFloat(val) || 0;
  saveFlowerSeedOverrides();
}

function computeMedicineCostCoins(visited) {
  let total = 0;
  const recipe = getBoostedMedicineRecipe();
  Object.keys(recipe).forEach(name => {
    const mode = getMedicineIngredientMode(name);
    total += recipe[name] * getMaterialUnitCostCoins(name, mode, visited);
  });
  return total;
}

export function computeMedicineCostFlower(visited) {
  return coinsToFlower(computeMedicineCostCoins(visited));
}

let __cookingCostMemo = new Map;

let __materialCostMemo = new Map;

let __toolCostMemo = new Map;

export function invalidateCostCache() {
  clearFlowerAutoPickMemo();
  __cookingCostMemo.clear();
  __materialCostMemo.clear();
  __toolCostMemo.clear();
  __petCardMemo.clear();
  __fishBasicFiguresMemo.clear();
  __fishAgedFiguresMemo.clear();
  __fishCatchXPMemo.clear();
  __cookingFoodExpMemo.clear();
  __cookingFoodTimeMemo.clear();
  __set___crabFiguresMemo(null);
  __set___seaweedFiguresMemo(null);
  __boostedCropStatsMemo.clear();
  __boostedFruitStatsMemo.clear();
  __boostedGreenhouseStatsMemo.clear();
  __boostedResourceStatsMemo.clear();
  __boostedLavaPitStatsMemo.clear();
}

export function getItemCostByName(name, visited) {
  if (__materialCostMemo.has(name)) return __materialCostMemo.get(name);
  if (visited && visited.has(name)) return 0;
  const branchVisited = new Set(visited || []);
  branchVisited.add(name);
  const result = getItemCostByNameUncached(name, branchVisited);
  __materialCostMemo.set(name, result);
  return result;
}

function getItemCostByNameUncached(name, visited) {
  visited = visited || new Set;
  if ((name || "").toLowerCase() === "salt") {
    if (visited.has("salt")) return 0;
    visited.add("salt");
    return computeSaltUnitCostCoins();
  }
  if ((name || "").toLowerCase() === "honey") {
    if (visited.has("honey")) return 0;
    visited.add("honey");
    const econ = computeHiveEconomics(visited);
    return econ.hiveStats.honeyPerHiveDay > 0 ? econ.costPerHiveDay / econ.hiveStats.honeyPerHiveDay * coinPerFlower : 0;
  }
  if ((name || "").toLowerCase() === "obsidian") {
    if (visited.has("obsidian")) return 0;
    visited.add("obsidian");
    return computeLavaPitFigures(currentSeason).costPerUnit;
  }
  if (typeof BASE_COMPOSTERS !== "undefined") {
    const composterName = Object.keys(BASE_COMPOSTERS).find(k => BASE_COMPOSTERS[k].wormName === name);
    if (composterName) {
      const key = "worm:" + name;
      if (visited.has(key)) return 0;
      visited.add(key);
      const fig = computeComposterFigures(composterName, visited);
      return fig.wormAvg > 0 ? fig.ingredientCostCoins / fig.wormAvg : 0;
    }
  }
  if (typeof FISH_MARKET_ITEM_NAMES !== "undefined" && FISH_MARKET_ITEM_NAMES.includes(name)) {
    const key = "fishmarket:" + name;
    if (visited.has(key)) return 0;
    visited.add(key);
    const season = typeof previewSeason !== "undefined" && previewSeason ? previewSeason : "Spring";
    const totalCoins = fishMarketItemCostCoins(name, "collect", season, visited);
    const meta = typeof getFishMarketMeta === "function" ? getFishMarketMeta(name) : null;
    const yieldQty = meta && meta.yield ? meta.yield : 1;
    return yieldQty > 0 ? totalCoins / yieldQty : totalCoins;
  }
  if (typeof FISH_CATCH_DATA !== "undefined" && FISH_CATCH_DATA[name]) {
    const key = "fishcatch:" + name;
    if (visited.has(key)) return 0;
    visited.add(key);
    const fig = computeBasicFishFigures(name, visited);
    return fig ? fig.costCoins : 0;
  }
  if (typeof CRUSTACEAN_CATCH_DATA !== "undefined" && CRUSTACEAN_CATCH_DATA[name]) {
    const key = "crustacean:" + name;
    if (visited.has(key)) return 0;
    visited.add(key);
    const fig = computeCrustaceanFigures(name, visited);
    return fig ? fig.costCoins : 0;
  }
  if ((name || "") === "Crab") {
    const key = "crab";
    if (visited.has(key)) return 0;
    visited.add(key);
    const fig = computeCrabFigures();
    return fig ? fig.costCoins : 0;
  }
  if ((name || "") === "Seaweed") {
    const key = "seaweed";
    if (visited.has(key)) return 0;
    visited.add(key);
    const fig = computeSeaweedFigures();
    return fig ? fig.costCoins : 0;
  }
  if (RESOURCE_DATA[name]) {
    const key = "resource:" + name;
    if (visited.has(key)) return 0;
    visited.add(key);
    return computeResourceFigures(name, visited).costPerUnit;
  }
  if (BASE_CROPS[name]) return getCropCostCoins(name, visited);
  if (BASE_FRUITS[name]) return getFruitCostCoins(name, visited);
  if (BASE_GREENHOUSE[name]) return getGreenhouseCostCoins(name, visited);
  if (FLOWER_VARIETIES[name]) return getFlowerVarietyCostCoins(name, visited);
  const animalType = Object.keys(ANIMAL_DATA).find(t => ANIMAL_DATA[t].products.some(p => p.toLowerCase() === (name || "").toLowerCase()));
  if (animalType) {
    const key = "animal:" + animalType;
    if (visited.has(key)) return 0;
    visited.add(key);
    return computeAnimalTypeFigures(animalType, visited).costPerUnit;
  }
  const tool = toolRecipes.find(t => (t.producesName || "").toLowerCase() === (name || "").toLowerCase());
  if (tool) return getToolCostCoins(tool.id, visited);
  return 0;
}

export function getMaterialUnitCostCoins(materialName, mode, visited) {
  if (mode === "buy") {
    const m = marketItems.find(x => (x.name || "").toLowerCase() === materialName.toLowerCase());
    if (m) return (m.flowerPrice || 0) * coinPerFlower;
    return getItemCostByName(materialName, visited);
  }
  return getItemCostByName(materialName, visited);
}

export function traceZeroCostBoosts(name, visited) {
  visited = visited || new Set;
  if (visited.has(name)) return [];
  visited.add(name);
  const found = [];
  const addFound = arr => (arr || []).forEach(b => {
    if (b && !found.some(f => f.id === b.id)) found.push(b);
  });
  if (BASE_CROPS[name]) {
    if (hasFreeCostBoost(name)) addFound(getActiveBoostsForCrop(name).filter(b => b.freeCost));
    return found;
  }
  if (BASE_FRUITS[name]) {
    if (hasFreeCostBoostFruit(name)) addFound(getActiveBoostsForFruit(name).filter(b => b.freeCost));
    return found;
  }
  if (BASE_GREENHOUSE[name]) {
    if (hasFreeCostBoostGreenhouse(name)) addFound(getActiveBoostsForGreenhouse(name).filter(b => b.freeCost));
    return found;
  }
  if (typeof FISH_CATCH_DATA !== "undefined" && FISH_CATCH_DATA[name]) {
    const fig = computeBasicFishFigures(name);
    if (fig) {
      if (fig.rodCost === 0 && typeof fishingRodIsFree === "function" && fishingRodIsFree()) {
        addFound(fishingBoostsActiveByScope("fishRod").filter(b => b.rodFreeCost));
      }
      if (fig.chum && fig.chum.unit === 0) addFound(traceZeroCostBoosts(fig.chum.name, visited));
      if (fig.bait && fig.bait.cost === 0) addFound(traceZeroCostBoosts(fig.bait.name, visited));
    }
    return found;
  }
  if (typeof CRUSTACEAN_CATCH_DATA !== "undefined" && CRUSTACEAN_CATCH_DATA[name]) {
    const fig = computeCrustaceanFigures(name, visited);
    if (fig) {
      if (fig.trapCost === 0 && typeof crustaceanTrapIsFree === "function" && crustaceanTrapIsFree()) {
        addFound(fishingBoostsActiveByScope("crustacean").filter(b => b.crustaceanTrapFreeCost));
      }
      if (fig.chumCost === 0 && fig.selectedChum) addFound(traceZeroCostBoosts(fig.selectedChum, visited));
    }
    return found;
  }
  if (typeof FISH_MARKET_ITEM_NAMES !== "undefined" && FISH_MARKET_ITEM_NAMES.includes(name)) {
    const season = typeof previewSeason !== "undefined" && previewSeason ? previewSeason : "Spring";
    const ingredients = fishMarketItemIngredients(name, season);
    ingredients.forEach(([ing]) => addFound(traceZeroCostBoosts(ing, visited)));
    return found;
  }
  if (typeof COOKING_BUILDINGS !== "undefined") {
    for (const b of COOKING_BUILDINGS) {
      const rec = COOKING_RECIPES[b] && COOKING_RECIPES[b][name];
      if (rec) {
        Object.keys(rec.ingredients).forEach(ing => addFound(traceZeroCostBoosts(ing, visited)));
        return found;
      }
    }
  }
  if ((name || "") === "Seaweed" || (name || "") === "Crab") {
    const fig = name === "Seaweed" ? computeSeaweedFigures() : computeCrabFigures();
    if (fig && fig.costCoins === 0 && fig.rodCost === 0 && typeof fishingRodIsFree === "function" && fishingRodIsFree()) {
      addFound(fishingBoostsActiveByScope("fishRod").filter(b => b.rodFreeCost));
    }
    return found;
  }
  return found;
}

function hasFreeCostBoostFruit(fruitName) {
  return getActiveBoostsForFruit(fruitName).some(b => b.freeCost);
}

export function hasFreeCostBoostGreenhouse(name) {
  return getActiveBoostsForGreenhouse(name).some(b => b.freeCost);
}

export function getFlowerVarietyCostCoins(varietyName, visited) {
  visited = visited || new Set;
  const key = "flowerVariety_" + varietyName;
  if (visited.has(key)) return 0;
  visited.add(key);
  const v = FLOWER_VARIETIES[varietyName];
  if (!v) return 0;
  const seedCoinCost = getFlowerSeedEffectiveCost(v.seed);
  const ing = getVarietyIngredient(varietyName);
  const mode = getMaterialMode("FlowerVariety_" + varietyName, ing.name);
  const ingCoinCost = ing.name ? (ing.qty || 0) * getMaterialUnitCostCoins(ing.name, mode, visited) : 0;
  const boosted = computeBoostedFlowerVarietyStats(varietyName);
  return (seedCoinCost + ingCoinCost) / boosted.expectedYield;
}

export function getSpiceCostPerUseFlower(key) {
  return computeSpiceFigures(key === "saltLick" ? "Salt Lick" : "Honey Treat").unitCost;
}

export function getSpiceHeadCost(key, type) {
  const qty = getAnimalCount(type).qty || 0;
  return getSpiceCostPerUseFlower(key) / getSpiceLickDurationHarvests() * qty;
}

export function hasFreeCostBoost(cropName) {
  return getActiveBoostsForCrop(cropName).some(b => b.freeCost);
}

export let shrineCostMode = localStorage.getItem("hl_shrine_cost_mode") || "buy";

export function setShrineCostMode(mode) {
  shrineCostMode = mode === "buy" ? "buy" : "collect";
  localStorage.setItem("hl_shrine_cost_mode", shrineCostMode);
}

function getShrineIngredientMarketPrice(name) {
  if (name === "Obsidian") {
    if (typeof marketItems !== "undefined") {
      const m = marketItems.find(x => x.name === "Obsidian");
      if (m) return m.flowerPrice || 0;
    }
    return 0;
  }
  return typeof getPetResourceMarket === "function" ? getPetResourceMarket(name) || 0 : 0;
}

function getShrineIngredientCollectPrice(name) {
  if (name === "Acorn") {
    return typeof petResourceCostPerUnit === "function" ? petResourceCostPerUnit("Acorn") || 0 : 0;
  }
  if (name === "Obsidian") {
    return typeof getItemCostByName === "function" && typeof coinsToFlower === "function" ? coinsToFlower(getItemCostByName("Obsidian") || 0) : 0;
  }
  return typeof petResourceCostPerUnit === "function" ? petResourceCostPerUnit(name) || 0 : 0;
}

function getShrineIngredientPrice(name, mode) {
  mode = mode || shrineCostMode;
  const marketPrice = getShrineIngredientMarketPrice(name);
  if (name === "Acorn") return getShrineIngredientCollectPrice(name);
  if (mode === "buy") return marketPrice;
  const collectPrice = getShrineIngredientCollectPrice(name);
  return collectPrice > 0 ? collectPrice : marketPrice;
}

const shrineCostCache = {};

function computeShrineCost(id, mode) {
  mode = mode || shrineCostMode;
  const recipe = SHRINE_RECIPES[id];
  const boost = LIMITED_TIME_BOOSTS.find(b => b.id === id);
  if (!recipe || !boost) return null;
  const ingredients = recipe.map(ing => {
    const unitPrice = getShrineIngredientPrice(ing.name, mode);
    return {
      name: ing.name,
      qty: ing.qty,
      unitPrice: unitPrice,
      totalPrice: unitPrice * ing.qty
    };
  });
  const totalCost = ingredients.reduce((sum, i) => sum + i.totalPrice, 0);
  const durationDays = boost.durationMs / (24 * 60 * 60 * 1e3);
  const dailyCost = durationDays > 0 ? totalCost / durationDays : 0;
  const result = {
    id: id,
    mode: mode,
    ingredients: ingredients,
    totalCost: totalCost,
    durationDays: durationDays,
    dailyCost: dailyCost
  };
  shrineCostCache[id] = result;
  return result;
}

export function getActiveShrineDailyCost(...activeBoostArrays) {
  const seen = new Set;
  let total = 0;
  const shrines = [];
  activeBoostArrays.forEach(arr => {
    (arr || []).forEach(b => {
      const id = shrineIdFromBoostName(b && b.name);
      if (!id || seen.has(id)) return;
      seen.add(id);
      const haveSyncData = hasLimitedBoostSyncData();
      const coverageFraction = getBoostCoverageFraction(b, 86400, haveSyncData);
      if (coverageFraction <= 0) return;
      const cost = computeShrineCost(id);
      if (cost && cost.dailyCost > 0) {
        const rawDailyCost = cost.dailyCost * coverageFraction;
        const shareCount = getShrineAffectedItemCount(b.name);
        const dailyCost = rawDailyCost / shareCount;
        total += dailyCost;
        shrines.push({
          id: id,
          name: b.name,
          dailyCost: dailyCost,
          shareCount: shareCount,
          totalCost: cost.totalCost,
          durationDays: cost.durationDays,
          dailyCostPreShare: rawDailyCost
        });
      }
    });
  });
  return {
    total: total,
    shrines: shrines
  };
}

export function getActiveShrineDailyCostStable(...activeBoostArrays) {
  const seen = new Set;
  let total = 0;
  const shrines = [];
  activeBoostArrays.forEach(arr => {
    (arr || []).forEach(b => {
      const id = shrineIdFromBoostName(b && b.name);
      if (!id || seen.has(id)) return;
      seen.add(id);
      const cost = computeShrineCost(id);
      if (cost && cost.dailyCost > 0) {
        const shareCount = getShrineAffectedItemCount(b.name);
        const dailyCost = cost.dailyCost / shareCount;
        total += dailyCost;
        shrines.push({
          id: id,
          name: b.name,
          dailyCost: dailyCost,
          shareCount: shareCount,
          totalCost: cost.totalCost,
          durationDays: cost.durationDays,
          dailyCostPreShare: cost.dailyCost
        });
      }
    });
  });
  return {
    total: total,
    shrines: shrines
  };
}

let shrineCostExpandedIds = new Set;

export function renderShrineCostBlock(b) {
  const cost = computeShrineCost(b.id);
  if (!cost) return "";
  const expanded = shrineCostExpandedIds.has(b.id);
  const ingredientRows = cost.ingredients.map(ing => `\n    <div class="lib-item-row" style="margin:0 0 4px;padding:4px 8px;">\n      <span class="lib-item-icon">${getPetResourceIcon(ing.name)}</span>\n      <div class="lib-item-main" style="display:flex;justify-content:space-between;align-items:center;">\n        <span>${escapeHtml(ing.name)} (x${fmt(ing.qty)})</span>\n        <span style="font-weight:700;">${fmt(ing.totalPrice)} ${FLOWER_ICON}</span>\n      </div>\n    </div>`).join("");
  return `\n    <div class="shrine-cost-toggle" data-shrine-cost-id="${b.id}" style="cursor:pointer;display:flex;justify-content:space-between;align-items:center;margin-top:4px;padding:4px 0;border-top:1px dashed var(--sun-deep);">\n      <div>\n        <div class="lib-item-meta" style="font-weight:700;">🧾 Total Cost: ${fmt(cost.totalCost)} ${FLOWER_ICON}</div>\n        <div class="lib-item-meta" style="font-weight:700;">📅 Daily Cost (${fmt(cost.durationDays)}d): ${fmt(cost.dailyCost)} ${FLOWER_ICON}</div>\n      </div>\n      <span class="shrine-cost-chev" style="font-size:12px;color:var(--ink-soft);transition:transform .25s ease;transform:rotate(${expanded ? 180 : 0}deg);">▾</span>\n    </div>\n    <div class="shrine-cost-details" style="display:${expanded ? "block" : "none"};margin-top:4px;">\n      ${ingredientRows}\n    </div>\n    ${renderShrineProfitabilityBlock(b, cost)}`;
}

export function attachShrineCostToggles(wrap) {
  wrap.querySelectorAll(".shrine-cost-toggle").forEach(el => {
    el.onclick = () => {
      const id = el.getAttribute("data-shrine-cost-id");
      const details = el.nextElementSibling;
      const chev = el.querySelector(".shrine-cost-chev");
      const nowExpanded = shrineCostExpandedIds.has(id) ? (shrineCostExpandedIds.delete(id), 
      false) : (shrineCostExpandedIds.add(id), true);
      if (details) details.style.display = nowExpanded ? "block" : "none";
      if (chev) chev.style.transform = `rotate(${nowExpanded ? 180 : 0}deg)`;
    };
  });
}

export let marketItems = safeLSJSON(localStorage.getItem("hl_market"), []);

export let priceEditTargetId = null;

export let marketPriceEditId = null;

export let restockCostMode = localStorage.getItem("hl_restock_cost_mode") === "individual" ? "individual" : "shared";

let guideIndividualRestock = false;

export function runWithGuideRestock(freeMode, fn) {
  const prevForced = guideIndividualRestock;
  const prevMode = restockCostMode;
  const prevGem = restockGemMode;
  guideIndividualRestock = true;
  restockCostMode = "individual";
  if (freeMode) __set_restockGemMode(new Set);
  try {
    return fn();
  } finally {
    guideIndividualRestock = prevForced;
    restockCostMode = prevMode;
    if (freeMode) __set_restockGemMode(prevGem);
  }
}

export function setRestockCostMode(mode) {
  restockCostMode = mode === "shared" ? "shared" : "individual";
  localStorage.setItem("hl_restock_cost_mode", restockCostMode);
}

export function getRestockGemCost(kind, itemName) {
  if (isMoonSeedItem(kind, itemName)) return 0;
  let base;
  if (restockGemMode.has("all")) base = kind === "tool" ? RESTOCK_GEM_COST.tools : RESTOCK_GEM_COST.all / 2; else if (kind === "tool") base = restockGemMode.has("tools_only") ? RESTOCK_GEM_COST.tools : 0; else base = restockGemMode.has("seeds_only") ? RESTOCK_GEM_COST.seeds : 0;
  if (base <= 0) return 0;
  if (guideIndividualRestock) return base;
  if (kind === "tool") {
    if (itemName && restockSharedExcluded.has(itemName)) return 0;
    return base / getSharedPoolDivisor(kind);
  }
  if (restockCostMode === "shared") {
    if (itemName && restockSharedExcluded.has(itemName)) return 0;
    return base / getSharedPoolDivisor(kind);
  }
  return base;
}

export function getRestockGemCostIndividual(kind) {
  let base;
  if (restockGemMode.has("all")) base = kind === "tool" ? RESTOCK_GEM_COST.tools : RESTOCK_GEM_COST.all / 2; else if (kind === "tool") base = restockGemMode.has("tools_only") ? RESTOCK_GEM_COST.tools : 0; else base = restockGemMode.has("seeds_only") ? RESTOCK_GEM_COST.seeds : 0;
  return base <= 0 ? 0 : base;
}

export function hasFreeSaltRakeCost() {
  return BOOSTS.filter(b => b.category === "salt" && isBoostActive(b.id) && b.scope === "saltGlobal").some(b => b.freeCost);
}

export function getActiveAgingSaltCostMult() {
  return BOOSTS.filter(b => b.category === "salt" && isBoostActive(b.id) && b.scope === "agingGlobal" && b.agingSaltCostMult).reduce((mult, b) => mult * b.agingSaltCostMult, 1);
}

function getFertilizerCostCoins(fertName, visited) {
  visited = visited || new Set;
  const key = "fert:" + fertName;
  if (visited.has(key)) return 0;
  visited.add(key);
  const composterName = Object.keys(BASE_COMPOSTERS).find(k => BASE_COMPOSTERS[k].fertilizer === fertName);
  if (!composterName) return 0;
  return computeComposterFigures(composterName, visited).costPerUnitCoins;
}

export function getCropCostCoins(cropName, visited) {
  visited = visited || new Set;
  const key = "crop:" + cropName;
  if (visited.has(key)) return 0;
  visited.add(key);
  const d = BASE_CROPS[cropName];
  if (!d) return 0;
  const boosted = computeBoostedCropStats(cropName, d.baseYield, d.timeSec);
  const seedCoinCost = (hasFreeCostBoost(cropName) ? 0 : d.seedCost || 0) * getArtistCoinCostMult();
  let fertCoinCost = 0;
  if (isFertilizerTierEnabled(d.tier)) {
    if (isBoostActive("apply_sprout_mix")) fertCoinCost += getFertilizerCostCoins("Sprout Mix", visited);
    if (isBoostActive("apply_rapid_root")) fertCoinCost += getFertilizerCostCoins("Rapid Root", visited);
  }
  return (seedCoinCost + fertCoinCost) / boosted.yieldVal;
}

export function getFruitCostCoins(fruitName, visited) {
  visited = visited || new Set;
  const key = "fruit:" + fruitName;
  if (visited.has(key)) return 0;
  visited.add(key);
  const d = BASE_FRUITS[fruitName];
  if (!d) return 0;
  const boosted = computeBoostedFruitStats(fruitName, d.yieldPerHarvest || 1, d.timeSec, d.minHarvest || 1);
  const seedCoinCost = (hasFreeCostBoostFruit(fruitName) ? 0 : d.seedCost || 0) * getArtistCoinCostMult() * getSkillRankMult("skill_fruity_heaven");
  const axeQty = d.axeQty || 0;
  const woodReturnQty = Math.max(0, (d.woodReturnQty || 0) - (boosted.woodReturnPenalty || 0) + (boosted.woodReturnAdd || 0));
  const axeCoinCost = boosted.noWoodCost ? 0 : axeQty * (RESOURCE_DATA.Wood.toolCoinCost || 0);
  const mode = getMaterialMode("Fruit_" + fruitName, "Wood");
  const woodRebateCoins = woodReturnQty * getMaterialUnitCostCoins("Wood", mode, visited);
  const totalYield = Math.max(1e-4, boosted.minHarvestVal * boosted.yieldVal);
  let fertCoinCost = 0;
  if (isBoostActive("apply_fruitful_blend")) fertCoinCost += getFertilizerCostCoins("Fruitful Blend", visited);
  return (seedCoinCost + axeCoinCost - woodRebateCoins + fertCoinCost) / totalYield;
}

export function getFruitSeedFertCoins(fruitName) {
  const d = BASE_FRUITS[fruitName];
  if (!d) return 0;
  const seedCoinCost = (hasFreeCostBoostFruit(fruitName) ? 0 : d.seedCost || 0) * getArtistCoinCostMult() * getSkillRankMult("skill_fruity_heaven");
  let fertCoinCost = 0;
  if (isBoostActive("apply_fruitful_blend")) fertCoinCost += getFertilizerCostCoins("Fruitful Blend", new Set);
  return seedCoinCost + fertCoinCost;
}

export function getGreenhouseSeedCoins(name) {
  const d = BASE_GREENHOUSE[name];
  if (!d) return 0;
  const boosted = computeBoostedGreenhouseStats(name, d.baseYield || 1, d.timeSec);
  return (hasFreeCostBoostGreenhouse(name) ? 0 : (d.seedCost || 0) * (boosted.seedQtyMult || 1)) * getArtistCoinCostMult() * getSkillRankMult("skill_seedy_business");
}

export function getGreenhouseCostCoins(name) {
  const d = BASE_GREENHOUSE[name];
  if (!d) return 0;
  const boosted = computeBoostedGreenhouseStats(name, d.baseYield || 1, d.timeSec);
  const seedCoinCost = (hasFreeCostBoostGreenhouse(name) ? 0 : (d.seedCost || 0) * (boosted.seedQtyMult || 1)) * getArtistCoinCostMult() * getSkillRankMult("skill_seedy_business");
  const oilQty = Math.max(0, (d.oilQty || 0) * (boosted.oilQtyMult || 1) - (boosted.oilFlatReduce || 0));
  const oilCoinCost = oilQty * getItemCostByName("Oil");
  return (seedCoinCost + oilCoinCost) / boosted.yieldVal;
}

export function getToolBaseCostCoins(id) {
  const item = findTool(id);
  if (!item) return 0;
  let total = item.coinCost || 0;
  (item.materials || []).forEach(m => {
    const mode = getMaterialMode("ToolLib_" + item.id, m.name);
    total += (m.qty || 0) * getMaterialUnitCostCoins(m.name, mode);
  });
  return total / (item.producesQty || 1);
}

export function getToolCostCoins(id, visited) {
  const key = "tool_" + String(id);
  if (__toolCostMemo.has(key)) return __toolCostMemo.get(key);
  if (visited && visited.has(key)) return 0;
  const branchVisited = new Set(visited || []);
  branchVisited.add(key);
  const result = getToolCostCoinsUncached(id, branchVisited);
  __toolCostMemo.set(key, result);
  return result;
}

function getToolCostCoinsUncached(id, visited) {
  const item = findTool(id);
  if (!item) return 0;
  if (item.manualPrice != null && !item.locked) return item.manualPrice;
  const boosted = getBoostedToolRecipe(item);
  let total = boosted.coinCost;
  boosted.materials.forEach(m => {
    const mode = getMaterialMode("ToolLib_" + item.id, m.name);
    const unitCost = getMaterialUnitCostCoins(m.name, mode, visited);
    total += (m.qty || 0) * unitCost;
  });
  return total / (item.producesQty || 1);
}

function getMarketPrice(marketId) {
  const m = marketItems.find(x => String(x.id) === String(marketId));
  return m ? m.flowerPrice || 0 : 0;
}

export function getMarketItemCostCoins(marketId) {
  const m = marketItems.find(x => String(x.id) === String(marketId));
  if (!m) return 0;
  return getItemCostByName(m.name);
}

function isMarketItemMissing(marketId) {
  return false;
}

function getFeedIngredientUnitCostCoins(cropName, visited) {
  const mode = getMaterialMode("AnimalFeed", cropName);
  return getMaterialUnitCostCoins(cropName, mode, visited);
}

export function getFeedUnitCost(feedKey, visited) {
  const kaleQty = feedKey === "mixedGrain" ? getKaleMixKaleQty() : null;
  const recipe = kaleQty != null ? [ {
    crop: "Kale",
    qty: kaleQty
  } ] : FEED_RECIPE[feedKey] || [];
  let cost = 0;
  const breakdown = [];
  recipe.forEach(r => {
    const mode = getMaterialMode("AnimalFeed", r.crop);
    const unitCost = getFeedIngredientUnitCostCoins(r.crop, visited);
    cost += r.qty * unitCost;
    breakdown.push({
      name: r.crop,
      qty: r.qty,
      unitCost: unitCost,
      mode: mode
    });
  });
  return {
    cost: cost,
    missing: false,
    missingCrops: [],
    breakdown: breakdown
  };
}

export function getOmnifeedUnitCostCoins() {
  return flowerPerGem() * coinPerFlower;
}

export function syncToolMarketEntry(tool) {
  const name = tool.producesName || tool.name;
  const idx = marketItems.findIndex(m => String(m.id) === String(tool.id));
  if (idx >= 0) {
    marketItems[idx].name = name;
  } else {
    marketItems.push({
      id: tool.id,
      name: name,
      flowerPrice: 0
    });
  }
  saveMarketState();
  autoFillLivePricesForNewEntries();
}

export function removeToolMarketEntry(toolId) {
  marketItems = marketItems.filter(m => String(m.id) !== String(toolId));
  saveMarketState();
}

export const SFL_COLLECTIBLE_KNOWN_IDS = {
  "Sunflower Seed": 101,
  "Potato Seed": 102,
  "Pumpkin Seed": 103,
  "Carrot Seed": 104,
  "Cabbage Seed": 105,
  "Beetroot Seed": 106,
  "Cauliflower Seed": 107,
  "Parsnip Seed": 108,
  "Radish Seed": 109,
  "Wheat Seed": 110,
  "Kale Seed": 111,
  "Apple Seed": 112,
  "Blueberry Seed": 113,
  "Orange Seed": 114,
  "Magic Bean": 115,
  "Eggplant Seed": 118,
  "Corn Seed": 119,
  "Banana Plant": 120,
  "Sunpetal Seed": 121,
  "Bloom Seed": 122,
  "Lily Seed": 123,
  "Soybean Seed": 124,
  "Grape Seed": 125,
  "Rice Seed": 126,
  "Olive Seed": 127,
  "Tomato Seed": 128,
  "Lemon Seed": 129,
  "Barley Seed": 130,
  "Rhubarb Seed": 131,
  "Zucchini Seed": 132,
  "Yam Seed": 133,
  "Broccoli Seed": 134,
  "Pepper Seed": 135,
  "Onion Seed": 136,
  "Turnip Seed": 137,
  "Artichoke Seed": 138,
  "Duskberry Seed": 139,
  "Lunara Seed": 140,
  "Celestine Seed": 141,
  "Edelweiss Seed": 142,
  "Gladiolus Seed": 143,
  "Lavender Seed": 144,
  "Clover Seed": 145,
  Sunflower: 201,
  Potato: 202,
  Pumpkin: 203,
  Carrot: 204,
  Cabbage: 205,
  Beetroot: 206,
  Cauliflower: 207,
  Parsnip: 208,
  Radish: 209,
  Wheat: 210,
  Kale: 211,
  Apple: 212,
  Blueberry: 213,
  Orange: 214,
  Eggplant: 215,
  Corn: 216,
  Banana: 217,
  "Red Pansy": 218,
  "Yellow Pansy": 219,
  "Purple Pansy": 220,
  "White Pansy": 221,
  "Blue Pansy": 222,
  "Red Cosmos": 223,
  "Yellow Cosmos": 224,
  "Purple Cosmos": 225,
  "White Cosmos": 226,
  "Blue Cosmos": 227,
  "Red Balloon Flower": 228,
  "Yellow Balloon Flower": 229,
  "Purple Balloon Flower": 230,
  "White Balloon Flower": 231,
  "Blue Balloon Flower": 232,
  "Red Carnation": 233,
  "Yellow Carnation": 234,
  "Purple Carnation": 235,
  "White Carnation": 236,
  "Blue Carnation": 237,
  "Prism Petal": 238,
  "Celestial Frostbloom": 239,
  "Primula Enigma": 240,
  "Red Daffodil": 241,
  "Yellow Daffodil": 242,
  "Purple Daffodil": 243,
  "White Daffodil": 244,
  "Blue Daffodil": 245,
  "Red Lotus": 246,
  "Yellow Lotus": 247,
  "Purple Lotus": 248,
  "White Lotus": 249,
  "Blue Lotus": 250,
  Soybean: 251,
  Grape: 252,
  Rice: 253,
  Olive: 254,
  Tomato: 255,
  Lemon: 256,
  Barley: 257,
  Rhubarb: 258,
  Zucchini: 259,
  Yam: 260,
  Broccoli: 261,
  Pepper: 262,
  Onion: 263,
  Turnip: 264,
  Artichoke: 265,
  Duskberry: 266,
  Lunara: 267,
  Celestine: 268,
  "Red Edelweiss": 269,
  "Yellow Edelweiss": 270,
  "Purple Edelweiss": 271,
  "White Edelweiss": 272,
  "Blue Edelweiss": 273,
  "Red Gladiolus": 274,
  "Yellow Gladiolus": 275,
  "Purple Gladiolus": 276,
  "White Gladiolus": 277,
  "Blue Gladiolus": 278,
  "Red Lavender": 279,
  "Yellow Lavender": 280,
  "Purple Lavender": 281,
  "White Lavender": 282,
  "Blue Lavender": 283,
  "Red Clover": 284,
  "Yellow Clover": 285,
  "Purple Clover": 286,
  "White Clover": 287,
  "Blue Clover": 288,
  Axe: 301,
  Pickaxe: 302,
  "Stone Pickaxe": 303,
  "Iron Pickaxe": 304,
  Hammer: 305,
  Rod: 306,
  "Rusty Shovel": 307,
  Shovel: 308,
  "Crab Pot": 309,
  "Sand Shovel": 310,
  "Sand Drill": 311,
  "Gold Pickaxe": 312,
  "Oil Drill": 313,
  "Petting Hand": 314,
  Brush: 315,
  "Music Box": 316,
  "Mariner Pot": 317,
  "Salt Rake": 318,
  "Sunflower Statue": 401,
  "Potato Statue": 402,
  "Christmas Tree": 403,
  Scarecrow: 404,
  "Farm Cat": 405,
  "Farm Dog": 406,
  Gnome: 407,
  "Chicken Coop": 408,
  "Gold Egg": 409,
  "Golden Cauliflower": 410,
  "Sunflower Tombstone": 411,
  "Sunflower Rock": 412,
  "Goblin Crown": 413,
  Fountain: 414,
  "Woody the Beaver": 415,
  "Apprentice Beaver": 416,
  "Foreman Beaver": 417,
  "Mysterious Parsnip": 418,
  "Carrot Sword": 419,
  Nancy: 420,
  Kuebiko: 421,
  "Nyon Statue": 422,
  "Farmer Bath": 423,
  "Homeless Tent": 424,
  "Mysterious Head": 425,
  "Golden Bonsai": 426,
  "Rock Golem": 427,
  "Tunnel Mole": 428,
  "Rocky the Mole": 429,
  Nugget: 430,
  "Wicker Man": 431,
  "Victoria Sisters": 432,
  "Peeled Potato": 433,
  "Cabbage Boy": 434,
  "Cabbage Girl": 435,
  "Wood Nymph Wendy": 436,
  "Stellar Sunflower": 437,
  "Potent Potato": 438,
  "Radical Radish": 439,
  "Immortal Pear": 441,
  "Lady Bug": 442,
  "Squirrel Monkey": 443,
  "Black Bearry": 444,
  "Ayam Cemani": 445,
  "Maneki Neko": 446,
  "Tiki Totem": 447,
  "Lunar Calendar": 448,
  "Treasure Map": 449,
  "Heart of Davy Jones": 450,
  "Heart Balloons": 451,
  Flamingo: 452,
  "Blossom Tree": 453,
  "Iron Idol": 454,
  Karkinos: 455,
  "Mushroom House": 456,
  "Purple Trail": 457,
  Obie: 458,
  Maximus: 459,
  "Genie Lamp": 460,
  Hoot: 461,
  "Basic Scarecrow": 462,
  "Emerald Turtle": 463,
  "Tin Turtle": 464,
  Bale: 465,
  "Sir Goldensnout": 466,
  "Scary Mike": 467,
  "Laurie the Chuckle Crow": 468,
  "Freya Fox": 469,
  "El Pollo Veloz": 470,
  Poppy: 471,
  "Grain Grinder": 472,
  Kernaldo: 473,
  "Queen Cornelia": 474,
  "Lab Grown Carrot": 475,
  "Lab Grown Pumpkin": 476,
  "Lab Grown Radish": 477,
  Walrus: 478,
  Alba: 479,
  "Knowledge Crab": 480,
  Anchor: 481,
  Goblet: 482,
  "Rubber Ducky": 483,
  "Kraken Head": 484,
  "Skill Shrimpy": 485,
  "Soil Krabby": 486,
  Nana: 487,
  "Banana Chicken": 488,
  "Grinx's Hammer": 489,
  "Humming Bird": 490,
  "Queen Bee": 491,
  "Flower Fox": 492,
  "Hungry Caterpillar": 493,
  "Crim Peckster": 494,
  "Turbo Sprout": 495,
  Soybliss: 496,
  "Grape Granny": 497,
  "Royal Throne": 498,
  "Lily Egg": 499,
  "Knight Chicken": 500,
  "Pumpkin Soup": 501,
  "Roasted Cauliflower": 502,
  Sauerkraut: 503,
  "Radish Pie": 504,
  "Sunflower Cake": 505,
  "Potato Cake": 506,
  "Pumpkin Cake": 507,
  "Carrot Cake": 508,
  "Cabbage Cake": 509,
  "Beetroot Cake": 510,
  "Cauliflower Cake": 511,
  "Parsnip Cake": 512,
  "Radish Cake": 513,
  "Wheat Cake": 514,
  "Boiled Eggs": 515,
  "Bumpkin Broth": 516,
  "Bumpkin Salad": 517,
  "Goblin's Treat": 518,
  "Mashed Potato": 519,
  "Cauliflower Burger": 520,
  "Club Sandwich": 521,
  "Roast Veggies": 522,
  Pancakes: 523,
  "Apple Pie": 524,
  "Blueberry Jam": 525,
  "Fermented Carrots": 526,
  "Honey Cake": 527,
  "Kale & Mushroom Pie": 528,
  "Kale Stew": 529,
  "Mushroom Jacket Potatoes": 530,
  "Mushroom Soup": 531,
  "Orange Cake": 532,
  "Sunflower Crunch": 533,
  "Reindeer Carrot": 534,
  "Apple Juice": 535,
  "Orange Juice": 536,
  "Purple Smoothie": 537,
  "Power Smoothie": 538,
  "Bumpkin Detox": 539,
  "Pirate Cake": 540,
  "Bumpkin Roast": 541,
  "Goblin Brunch": 542,
  "Fruit Salad": 543,
  "Kale Omelette": 544,
  "Cabbers n Mash": 545,
  "Fancy Fries": 546,
  "Bumpkin ganoush": 547,
  Cornbread: 548,
  "Eggplant Cake": 549,
  Popcorn: 550,
  Chowder: 551,
  Gumbo: 552,
  "Fermented Fish": 553,
  "Banana Blast": 554,
  "Beetroot Blaze": 555,
  "Rapid Roast": 556,
  "Shroom Syrup": 557,
  "Carrot Juice": 558,
  "Seafood Basket": 559,
  "Fish Burger": 560,
  "Fish n Chips": 561,
  "Fish Omelette": 562,
  "Fried Calamari": 563,
  "Fried Tofu": 564,
  "Grape Juice": 565,
  "Ocean's Olive": 566,
  "Quick Juice": 567,
  "Rice Bun": 568,
  "Slow Juice": 569,
  "Steamed Red Rice": 570,
  "Sushi Roll": 571,
  "The Lot": 572,
  "Tofu Scramble": 573,
  Antipasto: 574,
  Caponata: 575,
  "Glazed Carrots": 576,
  Paella: 577,
  Cheese: 578,
  "Pizza Margherita": 579,
  "Blue Cheese": 580,
  "Honey Cheddar": 581,
  "Caprese Salad": 582,
  "Sour Shake": 583,
  "Spaghetti al Limone": 584,
  "Lemon Cheesecake": 585,
  "Trade Cake": 586,
  Wood: 601,
  Stone: 602,
  Iron: 603,
  Gold: 604,
  Egg: 605,
  Chicken: 606,
  Cow: 607,
  Pig: 608,
  Sheep: 609,
  "Speed Chicken": 610,
  "Fat Chicken": 611,
  "Rich Chicken": 612,
  Rooster: 613,
  Honey: 614,
  "Wild Mushroom": 615,
  "Magic Mushroom": 616,
  Diamond: 617,
  Tree: 618,
  "Stone Rock": 619,
  "Iron Rock": 620,
  "Gold Rock": 621,
  "Crop Plot": 622,
  "Fruit Patch": 623,
  Boulder: 624,
  "Basic Land": 625,
  Earthworm: 626,
  Grub: 627,
  "Red Wiggler": 628,
  "Sprout Mix": 629,
  "Fruitful Blend": 630,
  "Rapid Root": 631,
  "Fishing Lure": 632,
  Beehive: 633,
  "Flower Bed": 634,
  "Crimstone Rock": 635,
  Crimstone: 636,
  "Sunstone Rock": 637,
  Sunstone: 638,
  Oil: 639,
  "Oil Reserve": 640,
  Leather: 641,
  Wool: 642,
  "Merino Wool": 643,
  Feather: 644,
  Milk: 645,
  Hay: 646,
  "Kernel Blend": 647,
  NutriBarley: 648,
  "Mixed Grain": 649,
  "Barn Delight": 650,
  Cushion: 651,
  Timber: 652,
  "Bee Box": 653,
  Crimsteel: 654,
  "Merino Cushion": 655,
  "Kelp Fibre": 656,
  "Hardened Leather": 657,
  "Synthetic Fabric": 658,
  "Ocean's Treasure": 659,
  "Royal Bedding": 660,
  "Royal Ornament": 661,
  Omnifeed: 662,
  Obsidian: 663,
  "Lava Pit": 664,
  Salt: 665,
  "Refined Salt": 666,
  "Salt Lick": 667,
  "Honey Treat": 668,
  "Spice Base": 669,
  "Spiced Cheese": 670,
  "Ascension Crystal": 671,
  "Ascension Shard": 672,
  "Green Thumb": 701,
  "Barn Manager": 702,
  "Seed Specialist": 703,
  Wrangler: 704,
  Lumberjack: 705,
  Prospector: 706,
  Logger: 707,
  "Gold Rush": 708,
  Artist: 709,
  Coder: 710,
  "Liquidity Provider": 711,
  "Discord Mod": 712,
  "Trading Ticket": 713,
  Warrior: 714,
  "Beta Pass": 715,
  "Red Envelope": 716,
  "Love Letter": 717,
  "Block Buck": 718,
  "Solar Flare Ticket": 719,
  "Dawn Breaker Ticket": 720,
  "Sunflower Supporter": 721,
  "Solar Flare Banner": 722,
  "Dawn Breaker Banner": 723,
  "Witches' Eve Banner": 724,
  "Crow Feather": 725,
  "Gold Pass": 726,
  "Potion Ticket": 727,
  "Bud Ticket": 728,
  "Bud Seedling": 729,
  "Catch the Kraken Banner": 730,
  "Mermaid Scale": 731,
  "Community Coin": 732,
  "Arcade Token": 733,
  "Farmhand Coupon": 734,
  Farmhand: 735,
  "Spring Blossom Banner": 736,
  "Tulip Bulb": 737,
  "Clash of Factions Banner": 738,
  Scroll: 739,
  "Lifetime Farmer Banner": 740,
  "Creator Banner": 3025,
  "Goblin Emblem": 741,
  "Bumpkin Emblem": 742,
  "Sunflorian Emblem": 743,
  "Nightshade Emblem": 744,
  Mark: 745,
  "Pharaoh's Treasure Banner": 746,
  "Amber Fossil": 747,
  Gem: 748,
  "Bull Run Banner": 749,
  "Cow Skull": 750,
  Horseshoe: 751,
  "Trade Point": 752,
  "Winds of Change Banner": 753,
  Timeshard: 754,
  "Ancient Clock": 755,
  "Love Charm": 756,
  "Easter Token 2025": 757,
  "Great Bloom Banner": 758,
  Geniseed: 759,
  "Broken Pillar": 760,
  "Colors Token 2025": 761,
  "Better Together Banner": 762,
  Bracelet: 763,
  Coprolite: 764,
  Cheer: 765,
  "Paw Prints Banner": 766,
  "Pet Cookie": 767,
  "Moon Crystal": 768,
  "Halloween Token 2025": 769,
  "Holiday Token 2025": 770,
  "Crabs and Traps Banner": 771,
  Floater: 772,
  "Ammonite Shell": 773,
  "April Fools Token 2026": 774,
  "Skill Reset Ticket": 775,
  "Colors Token 2026": 776,
  "Australian Flag": 801,
  "Belgian Flag": 802,
  "Brazilian Flag": 803,
  "Chinese Flag": 804,
  "Finnish Flag": 805,
  "French Flag": 806,
  "German Flag": 807,
  "Indonesian Flag": 808,
  "Indian Flag": 809,
  "Iranian Flag": 810,
  "Italian Flag": 811,
  "Japanese Flag": 812,
  "Moroccan Flag": 813,
  "Dutch Flag": 814,
  "Philippine Flag": 815,
  "Polish Flag": 816,
  "Portuguese Flag": 817,
  "Russian Flag": 818,
  "Saudi Arabian Flag": 819,
  "South Korean Flag": 820,
  "Spanish Flag": 821,
  "Sunflower Flag": 822,
  "Thai Flag": 823,
  "Turkish Flag": 824,
  "Ukrainian Flag": 825,
  "American Flag": 826,
  "Vietnamese Flag": 827,
  "Canadian Flag": 828,
  "Singaporean Flag": 829,
  "British Flag": 830,
  "Sierra Leone Flag": 831,
  "Romanian Flag": 832,
  "Rainbow Flag": 833,
  "Goblin Flag": 834,
  "Pirate Flag": 835,
  "Algerian Flag": 836,
  "Mexican Flag": 837,
  "Dominican Republic Flag": 838,
  "Argentinian Flag": 839,
  "Lithuanian Flag": 840,
  "Malaysian Flag": 841,
  "Colombian Flag": 842,
  "Egg Basket": 901,
  "Red Egg": 902,
  "Blue Egg": 903,
  "Yellow Egg": 904,
  "Pink Egg": 905,
  "Purple Egg": 906,
  "Orange Egg": 907,
  "Green Egg": 908,
  "Easter Bunny": 909,
  "Engine Core": 910,
  Observatory: 911,
  "Goblin Key": 912,
  "Sunflower Key": 913,
  "Ancient Goblin Sword": 914,
  "Ancient Human Warhammer": 915,
  "Rapid Growth": 916,
  "War Bond": 917,
  "Goblin War Point": 918,
  "Human War Point": 919,
  "Human War Banner": 920,
  "Goblin War Banner": 921,
  "Jack-o-lantern": 923,
  "Golden Crop": 924,
  "Wooden Compass": 925,
  "Pablo The Bunny": 926,
  "Iron Compass": 927,
  "Old Bottle": 928,
  "Emerald Compass": 929,
  "Earn Alliance Banner": 930,
  "Treasure Key": 931,
  "Luxury Key": 932,
  "Rare Key": 933,
  "Prize Ticket": 934,
  "Baby Panda": 935,
  Baozi: 936,
  "Community Egg": 937,
  "Hungry Hare": 938,
  "Bumpkin Faction Banner": 939,
  "Nightshade Faction Banner": 940,
  "Sunflorian Faction Banner": 941,
  "Goblin Faction Banner": 942,
  "Polygon Banner": 943,
  "Ronin Banner": 944,
  "Base Banner": 945,
  "Paw Prints Raffle Ticket": 946,
  "Crabs and Traps Raffle Ticket": 947,
  Market: 1001,
  "Fire Pit": 1002,
  Workbench: 1003,
  Tent: 1004,
  "Water Well": 1005,
  "Hen House": 1006,
  Bakery: 1007,
  Kitchen: 1008,
  Deli: 1009,
  "Smoothie Shack": 1010,
  Toolshed: 1011,
  Warehouse: 1012,
  "Town Center": 1013,
  "Compost Bin": 1014,
  "Turbo Composter": 1015,
  "Premium Composter": 1016,
  House: 1017,
  Manor: 1018,
  Greenhouse: 1019,
  "Crop Machine": 1020,
  Barn: 1021,
  "Crafting Box": 1022,
  Mansion: 1023,
  "Pet House": 1024,
  "Fish Market": 1025,
  "Aging Shed": 1026,
  "Chef Apron": 1101,
  "Chef Hat": 1102,
  "Sunflower Amulet": 1103,
  "Carrot Amulet": 1104,
  "Beetroot Amulet": 1105,
  "Green Amulet": 1106,
  "Warrior Shirt": 1107,
  "Warrior Helmet": 1108,
  "Warrior Pants": 1109,
  "Sunflower Shield": 1110,
  "Skull Hat": 1111,
  "War Skull": 1112,
  "War Tombstone": 1113,
  "Undead Rooster": 1114,
  "White Tulips": 1201,
  "Potted Sunflower": 1202,
  Cactus: 1203,
  "Basic Bear": 1204,
  "Chef Bear": 1205,
  "Construction Bear": 1206,
  "Angel Bear": 1207,
  "Badass Bear": 1208,
  "Bear Trap": 1209,
  "Brilliant Bear": 1210,
  "Classy Bear": 1211,
  "Farmer Bear": 1212,
  "Sunflower Bear": 1213,
  "Rich Bear": 1214,
  "Potted Potato": 1215,
  "Potted Pumpkin": 1216,
  "Christmas Bear": 1217,
  "Rainbow Artist Bear": 1218,
  "Christmas Snow Globe": 1219,
  "Devil Bear": 1220,
  "Collectible Bear": 1221,
  "Cyborg Bear": 1222,
  "Abandoned Bear": 1223,
  "Turtle Bear": 1224,
  "T-Rex Skull": 1225,
  "Sunflower Coin": 1226,
  Foliant: 1227,
  "Skeleton King Staff": 1228,
  "Lifeguard Bear": 1229,
  "Snorkel Bear": 1230,
  "Parasaur Skull": 1231,
  "Golden Bear Head": 1232,
  "Pirate Bear": 1233,
  "Goblin Bear": 1234,
  Galleon: 1235,
  "Easter Bear": 1236,
  "Dinosaur Bone": 1237,
  "Human Bear": 1238,
  "Whale Bear": 1239,
  "Valentine Bear": 1240,
  "Palm Tree": 1241,
  "Beach Ball": 1242,
  "Easter Bush": 1243,
  "Giant Carrot": 1244,
  "Dirt Path": 1245,
  Bush: 1246,
  Fence: 1247,
  Shrub: 1248,
  "Luminous Lantern": 1249,
  "Radiance Lantern": 1250,
  "Aurora Lantern": 1251,
  "Bonnie's Tombstone": 1252,
  "Chestnut Fungi Stool": 1253,
  "Crimson Cap": 1254,
  "Dawn Umbrella Seat": 1255,
  "Eggplant Grill": 1256,
  "Giant Dawn Mushroom": 1257,
  "Grubnash's Tombstone": 1258,
  "Mahogany Cap": 1259,
  "Toadstool Seat": 1260,
  Clementine: 1261,
  Cobalt: 1262,
  "Shroom Glow": 1263,
  "Genie Bear": 1264,
  "Ocean Lantern": 1265,
  "Beta Bear": 1266,
  "Field Maple": 1267,
  "Red Maple": 1268,
  "Golden Maple": 1269,
  "Pine Tree": 1270,
  "Stone Fence": 1271,
  "Solar Lantern": 1272,
  "Betty Lantern": 1273,
  "Bumpkin Lantern": 1274,
  "Eggplant Bear": 1275,
  "Goblin Lantern": 1276,
  "Dawn Flower": 1277,
  Candles: 1278,
  "Haunted Stump": 1279,
  "Spooky Tree": 1280,
  "Giant Cabbage": 1281,
  "Giant Potato": 1282,
  "Giant Pumpkin": 1283,
  "Town Sign": 1284,
  Observer: 1285,
  "Crow Rock": 1286,
  "Mini Corn Maze": 1287,
  "White Crow": 1288,
  "Lifeguard Ring": 1289,
  Surfboard: 1290,
  "Hideaway Herman": 1291,
  "Shifty Sheldon": 1292,
  "Tiki Torch": 1293,
  "Beach Umbrella": 1294,
  "Sapo Docuras": 1295,
  "Sapo Travessuras": 1296,
  "Time Warp Totem": 1297,
  "Bumpkin Nutcracker": 1298,
  "Festive Tree": 1299,
  "Pirate Bounty": 1301,
  Pearl: 1302,
  Coral: 1303,
  "Clam Shell": 1304,
  Pipi: 1305,
  Starfish: 1306,
  Seaweed: 1307,
  "Sea Cucumber": 1308,
  Crab: 1309,
  "Black Magic": 1401,
  "Golden Helios": 1402,
  Chiogga: 1403,
  "Purple Cauliflower": 1404,
  "Adirondack Potato": 1405,
  "Warty Goblin Pumpkin": 1406,
  "White Carrot": 1407,
  "Camel Bone": 1408,
  "Cockle Shell": 1409,
  Hieroglyph: 1410,
  Sand: 1411,
  Scarab: 1412,
  Vase: 1413,
  Anchovy: 1501,
  Butterflyfish: 1502,
  Blowfish: 1503,
  Clownfish: 1504,
  "Sea Bass": 1505,
  "Sea Horse": 1506,
  "Horse Mackerel": 1507,
  Squid: 1508,
  "Red Snapper": 1509,
  "Moray Eel": 1510,
  "Olive Flounder": 1511,
  Napoleanfish: 1512,
  Surgeonfish: 1513,
  "Zebra Turkeyfish": 1514,
  Ray: 1515,
  "Hammerhead shark": 1516,
  Tuna: 1517,
  "Mahi Mahi": 1518,
  "Blue Marlin": 1519,
  Oarfish: 1520,
  "Football fish": 1521,
  Sunfish: 1522,
  Coelacanth: 1523,
  "Whale Shark": 1524,
  "Barred Knifejaw": 1525,
  "Saw Shark": 1526,
  "White Shark": 1527,
  "Twilight Anglerfish": 1528,
  "Starlight Tuna": 1529,
  "Radiant Ray": 1530,
  "Phantom Barracuda": 1531,
  "Gilded Swordfish": 1532,
  "Kraken Tentacle": 1533,
  Angelfish: 1534,
  Halibut: 1535,
  Parrotfish: 1536,
  "Crimson Carp": 1537,
  "Battle Fish": 1538,
  "Lemon Shark": 1539,
  "Longhorn Cowfish": 1540,
  Porgy: 1541,
  Muskellunge: 1542,
  Trout: 1543,
  Walleye: 1544,
  Weakfish: 1545,
  "Rock Blackfish": 1546,
  Cobia: 1547,
  Tilapia: 1548,
  "Super Star": 1549,
  "Giant Isopod": 1550,
  Nautilus: 1551,
  Dollocaris: 1552,
  "White Festive Fox": 2001,
  Rug: 2002,
  Wardrobe: 2003,
  "Sunrise Bloom Rug": 2004,
  "Blossom Royale": 2005,
  Rainbow: 2006,
  "Enchanted Rose": 2007,
  "Flower Cart": 2008,
  Capybara: 2009,
  Blossombeard: 2010,
  "Flower Rug": 2011,
  "Tea Rug": 2012,
  "Green Field Rug": 2013,
  "Fancy Rug": 2014,
  Clock: 2015,
  Vinny: 2016,
  "Desert Gnome": 2017,
  "Gaucho Rug": 2018,
  "Bullseye Board": 2019,
  "Chess Rug": 2020,
  Cluckapult: 2021,
  "Golden Gallant": 2022,
  "Golden Garrison": 2023,
  "Golden Guardian": 2024,
  "Novice Knight": 2025,
  "Regular Pawn": 2026,
  "Rookie Rook": 2027,
  "Silver Sentinel": 2028,
  "Silver Squire": 2029,
  "Silver Stallion": 2030,
  "Trainee Target": 2031,
  "Twister Rug": 2032,
  "Battlecry Drum": 2033,
  "Rice Panda": 2034,
  "Benevolence Flag": 2035,
  "Devotion Flag": 2036,
  "Generosity Flag": 2037,
  "Splendor Flag": 2038,
  "Jelly Lamp": 2039,
  "Paint Can": 2040,
  "Sunflorian Throne": 2041,
  "Nightshade Throne": 2042,
  "Goblin Throne": 2043,
  "Bumpkin Throne": 2044,
  "Golden Sunflorian Egg": 2045,
  "Goblin Mischief Egg": 2046,
  "Bumpkin Charm Egg": 2047,
  "Nightshade Veil Egg": 2048,
  "Emerald Goblin Goblet": 2049,
  "Opal Sunflorian Goblet": 2050,
  "Sapphire Bumpkin Goblet": 2051,
  "Amethyst Nightshade Goblet": 2052,
  "Golden Faction Goblet": 2053,
  "Ruby Faction Goblet": 2054,
  "Sunflorian Bunting": 2055,
  "Nightshade Bunting": 2056,
  "Goblin Bunting": 2057,
  "Bumpkin Bunting": 2058,
  "Sunflorian Candles": 2059,
  "Nightshade Candles": 2060,
  "Goblin Candles": 2061,
  "Bumpkin Candles": 2062,
  "Sunflorian Left Wall Sconce": 2063,
  "Nightshade Left Wall Sconce": 2064,
  "Goblin Left Wall Sconce": 2065,
  "Bumpkin Left Wall Sconce": 2066,
  "Sunflorian Right Wall Sconce": 2067,
  "Nightshade Right Wall Sconce": 2068,
  "Goblin Right Wall Sconce": 2069,
  "Bumpkin Right Wall Sconce": 2070,
  "Gourmet Hourglass": 2071,
  "Harvest Hourglass": 2072,
  "Timber Hourglass": 2073,
  "Ore Hourglass": 2074,
  "Orchard Hourglass": 2075,
  "Blossom Hourglass": 2076,
  "Fisher's Hourglass": 2077,
  "Sunflorian Faction Rug": 2078,
  "Nightshade Faction Rug": 2079,
  "Goblin Faction Rug": 2080,
  "Bumpkin Faction Rug": 2081,
  "Goblin Gold Champion": 2082,
  "Goblin Silver Champion": 2083,
  "Goblin Bronze Champion": 2084,
  "Bumpkin Bronze Champion": 2085,
  "Bumpkin Gold Champion": 2086,
  "Bumpkin Silver Champion": 2087,
  "Nightshade Bronze Champion": 2088,
  "Nightshade Gold Champion": 2089,
  "Nightshade Silver Champion": 2090,
  "Sunflorian Bronze Champion": 2091,
  "Sunflorian Gold Champion": 2092,
  "Sunflorian Silver Champion": 2093,
  "Desert Rose": 2100,
  "Hapy Jar": 2101,
  "Duamutef Jar": 2102,
  "Qebehsenuef Jar": 2103,
  "Imsety Jar": 2104,
  Cannonball: 2105,
  Sarcophagus: 2106,
  "Clay Tablet": 2107,
  "Snake in Jar": 2108,
  "Reveling Lemon": 2109,
  "Anubis Jackal": 2110,
  Sundial: 2111,
  "Sand Golem": 2112,
  "Cactus King": 2113,
  "Lemon Frog": 2114,
  "Scarab Beetle": 2115,
  "Pharaoh Chicken": 2116,
  "Adrift Ark": 2117,
  Castellan: 2118,
  "Sunlit Citadel": 2119,
  "Pharaoh Gnome": 2120,
  "Lemon Tea Bath": 2121,
  "Tomato Clown": 2122,
  Pyramid: 2123,
  Oasis: 2124,
  "Paper Reed": 2125,
  "Baobab Tree": 2126,
  Camel: 2127,
  "Tomato Bombard": 2128,
  "Stone Beetle": 2129,
  "Iron Beetle": 2130,
  "Gold Beetle": 2131,
  "Fairy Circle": 2132,
  Squirrel: 2133,
  Macaw: 2134,
  Butterfly: 2135,
  Marty: 2136,
  Miffy: 2137,
  Mog: 2138,
  Morty: 2139,
  "Basic Bed": 2140,
  "Sturdy Bed": 2141,
  "Floral Bed": 2142,
  "Fisher Bed": 2143,
  "Pirate Bed": 2144,
  "Cow Bed": 2145,
  "Desert Bed": 2146,
  "Royal Bed": 2147,
  "Cow Scratcher": 2148,
  "Spinning Wheel": 2149,
  "Sleepy Rug": 2150,
  Meteorite: 2151,
  "Sheaf of Plenty": 2152,
  "Mechanical Bull": 2153,
  "King of Bears": 2154,
  "Moo-ver": 2155,
  "Swiss Whiskers": 2156,
  Cluckulator: 2157,
  UFO: 2158,
  Chicory: 2159,
  Wagon: 2160,
  "Black Sheep": 2161,
  "Alien Chicken": 2162,
  Mootant: 2163,
  "Toxic Tuft": 2164,
  "Crop Circle": 2165,
  "Halloween Scarecrow": 2166,
  "Vampire Bear": 2167,
  "Super Totem": 2168,
  "Christmas Stocking": 2169,
  "Golden Christmas Stocking": 2170,
  "Cozy Fireplace": 2171,
  "Christmas Rug": 2172,
  "Christmas Candle": 2173,
  "Santa Penguin": 2174,
  "Penguin Pool": 2175,
  Snowman: 2176,
  "Festive Toy Train": 2177,
  "Golden Cow": 2178,
  "Tornado Pinwheel": 2179,
  Mangrove: 2180,
  "Thermal Stone": 2181,
  "Protective Pesticide": 2182,
  "Volcano Gnome": 2183,
  Kite: 2184,
  "Acorn House": 2185,
  "Spring Duckling": 2186,
  Igloo: 2187,
  "Ugly Duckling": 2188,
  "Lake Rug": 2189,
  Hammock: 2190,
  Mammoth: 2191,
  "Cup of Chocolate": 2192,
  "Golden Sheep": 2193,
  "Barn Blueprint": 2194,
  "Mama Duck": 2195,
  "Summer Duckling": 2196,
  "Autumn Duckling": 2197,
  "Winter Duckling": 2198,
  "Frozen Cow": 2199,
  "Frozen Sheep": 2200,
  "Summer Chicken": 2201,
  Chamomile: 2202,
  Jellyfish: 2203,
  "Rhubarb Tart": 2204,
  Jin: 2205,
  "Floral Arch": 2206,
  "Flower Coin": 2207,
  "Flower Statue": 2208,
  "Heartstruck Tree": 2209,
  "Mermaid Fountain": 2210,
  "Mysterious Entrance": 2211,
  "Streamer's Statue": 2212,
  Cetus: 2213,
  "Goldcrest Mosaic Rug": 2214,
  "Sandy Mosaic Rug": 2215,
  "Twilight Rug": 2216,
  "Orchard Rug": 2217,
  "Carrot Rug": 2218,
  "Beetroot Rug": 2219,
  "Harlequin Rug": 2220,
  "Large Rug": 2221,
  "Golden Fence": 2222,
  "Golden Stone Fence": 2223,
  "Golden Pine Tree": 2224,
  "Golden Tree": 2225,
  "Golden Bush": 2226,
  "Black Tile": 2227,
  "Blue Tile": 2228,
  "Green Tile": 2229,
  "Purple Tile": 2230,
  "Red Tile": 2231,
  "Yellow Tile": 2232,
  "Easter Ticket 2025": 2234,
  "Carrot House": 2235,
  "Orange Bunny Lantern": 2236,
  "White Bunny Lantern": 2237,
  "Orange Tunnel Bunny": 2238,
  "White Tunnel Bunny": 2239,
  "Easter Basket": 2240,
  "Bronze Love Box": 2241,
  "Silver Love Box": 2242,
  "Gold Love Box": 2243,
  "Test Box": 2244,
  "Bronze Flower Box": 2245,
  "Silver Flower Box": 2246,
  "Gold Flower Box": 2247,
  "Bronze Food Box": 2248,
  "Silver Food Box": 2249,
  "Gold Food Box": 2250,
  "Bronze Tool Box": 2251,
  "Silver Tool Box": 2252,
  "Gold Tool Box": 2253,
  "Pink Dolphin": 2254,
  "Love Chicken": 2255,
  "Dr Cow": 2256,
  "Nurse Sheep": 2257,
  Lunalist: 2258,
  Quarry: 2259,
  "Obsidian Turtle": 2260,
  "Winter Guardian": 2261,
  "Summer Guardian": 2262,
  "Spring Guardian": 2263,
  "Autumn Guardian": 2264,
  "Sky Pillar": 2265,
  "Flower-Scribed Statue": 2266,
  "Balloon Rug": 2267,
  "Giant Yam": 2268,
  "Heart Air Balloon": 2269,
  "Giant Zucchini": 2270,
  "Mini Floating Island": 2271,
  "Giant Kale": 2272,
  "Colors Ticket 2025": 2273,
  "Paint Buckets": 2274,
  "Rainbow Well": 2275,
  "Floating Toy": 2276,
  "Rainbow Flower": 2277,
  "Pony Toy": 2278,
  "Red Slime Balloon": 2279,
  "Blue Slime Balloon": 2280,
  "Halloween Ticket 2025": 2322,
  Cerberus: 2323,
  "Witch's Cauldron": 2324,
  Raveyard: 2325,
  "Haunted House": 2326,
  "Mimic Egg": 2327,
  "Haunted Tomb": 2328,
  Guillotine: 2329,
  "Vampire Coffin": 2330,
  "Paw Prints Rug": 2331,
  "Pet Bed": 2332,
  "Moon Fox Statue": 2333,
  "Giant Acorn": 2334,
  "Pet Bowls": 2335,
  "Squeaky Chicken": 2336,
  "Holiday Ticket 2025": 2337,
  "Holiday Decorative Totem": 2338,
  "Red Holiday Ornament": 2339,
  "Green Holiday Ornament": 2340,
  "Gift Turtle": 2341,
  "Red Nose Reindeer": 2342,
  "Tuxedo Claus": 2343,
  "Winter Alpaca": 2344,
  "Penguin Surprise": 2345,
  "Frozen Meat": 2346,
  "Ho Ho oh oh…": 2347,
  "Teeth Toy": 2348,
  "Fake Treasure": 2349,
  "Fake Mouse": 2350,
  "Pet Tree": 2351,
  "Definitely not a Flower": 2352,
  "April Fools Ticket 2026": 2353,
  "Bumpkin Rug": 2354,
  "Goblin Rug": 2355,
  "Pet Rug": 2356,
  "Jester in a box": 2357,
  "The Sunflower Man Statue": 2358,
  "Blue Paint Bucket": 2359,
  "Green Paint Bucket": 2360,
  "Purple Paint Bucket": 2361,
  "Yellow Paint Bucket": 2362,
  "Color Wheel": 2363,
  "Dhol Drum": 2364,
  "Mimic Slime Ball": 2365,
  "Mimic Winged Slime Ball": 2366,
  "Pork Jelly": 2367,
  "Rainbow Pork Jelly": 2368,
  "Slime Totem": 2369,
  "Giant Donut": 2370,
  "Fool's Gold": 2371,
  "Golden Slime Trophy": 2372,
  "Silver Slime Trophy": 2373,
  "Bronze Slime Trophy": 2374,
  "Colors Ticket 2026": 2375,
  "Big Orange": 2281,
  "Big Apple": 2282,
  "Big Banana": 2283,
  "Farmer's Monument": 2284,
  "Miner's Monument": 2285,
  "Woodcutter's Monument": 2286,
  "Teamwork Monument": 2287,
  "Basic Cooking Pot": 2288,
  "Expert Cooking Pot": 2289,
  "Advanced Cooking Pot": 2290,
  Trash: 2291,
  Dung: 2292,
  Weed: 2293,
  "Floor Mirror": 2294,
  "Long Rug": 2295,
  "Garbage Bin": 2296,
  Wheelbarrow: 2297,
  "Snail King": 2298,
  "Reelmaster's Chair": 2299,
  "Rat King": 2300,
  "Fruit Tune Box": 2301,
  "Double Bed": 2302,
  "Giant Artichoke": 2303,
  "Rocket Statue": 2304,
  "Ant Queen": 2305,
  "Jurassic Droplet": 2306,
  "Giant Onion": 2307,
  "Giant Turnip": 2308,
  "Groovy Gramophone": 2309,
  "Wheat Whiskers": 2310,
  "Gold Cooking Trophy": 2311,
  "Silver Cooking Trophy": 2312,
  "Bronze Cooking Trophy": 2313,
  Anthill: 2314,
  Rat: 2315,
  Snail: 2316,
  "Pest Net": 2317,
  Poseidon: 2318,
  "Giant Orange": 2319,
  "Giant Apple": 2320,
  "Giant Banana": 2321,
  "Basic Biome": 2400,
  "Spring Biome": 2401,
  "Desert Biome": 2402,
  "Volcano Biome": 2403,
  "Swamp Biome": 2404,
  "Spooky Biome": 2405,
  "Crystal Biome": 2406,
  "Galaxy Biome": 2407,
  "Marble Age Biome": 2408,
  Doll: 2501,
  "Buzz Doll": 2502,
  "Lunar Doll": 2503,
  "Juicy Doll": 2504,
  "Crude Doll": 2505,
  "Cluck Doll": 2506,
  "Wooly Doll": 2507,
  "Moo Doll": 2508,
  "Bloom Doll": 2509,
  "Shadow Doll": 2510,
  "Ember Doll": 2511,
  "Gilded Doll": 2512,
  "Lumber Doll": 2513,
  "Harvest Doll": 2514,
  "Sizzle Doll": 2515,
  "Angler Doll": 2516,
  "Dune Doll": 2517,
  "Mouse Doll": 2518,
  "Grubby Doll": 2519,
  "Nefari Doll": 2520,
  "Frosty Doll": 2521,
  "Cosmo Doll": 2522,
  "Bigfin Doll": 2523,
  "Solar Doll": 2524,
  "Baby Cow": 2525,
  "Baby Sheep": 2526,
  "Venus Bumpkin Trap": 2527,
  "Janitor Chicken": 2528,
  "Black Hole Flower": 2529,
  "Sleepy Chicken": 2530,
  "Astronaut Cow": 2531,
  "Astronaut Sheep": 2532,
  "Bronze Friends Trophy": 2533,
  "Silver Friends Trophy": 2534,
  "Gold Friends Trophy": 2535,
  "Mermaid Cow": 2536,
  "Mermaid Sheep": 2537,
  "Squid Chicken": 2538,
  "Anemone Flower": 2539,
  "Pet Egg": 2600,
  Barkley: 2601,
  Meowchi: 2602,
  Twizzle: 2603,
  Burro: 2604,
  Mudhorn: 2605,
  Nibbles: 2606,
  Waddles: 2607,
  Ramsey: 2608,
  Biscuit: 2609,
  Cloudy: 2610,
  Butters: 2611,
  Smokey: 2612,
  Flicker: 2613,
  Pippin: 2614,
  Pinto: 2615,
  Roan: 2616,
  Stallion: 2617,
  Bison: 2618,
  Oxen: 2619,
  Peanuts: 2620,
  Pip: 2621,
  Skipper: 2622,
  Acorn: 2630,
  Ruffroot: 2631,
  "Chewed Bone": 2632,
  "Heart leaf": 2633,
  Moonfur: 2634,
  "Fossil Shell": 2635,
  Ribbon: 2636,
  Dewberry: 2637,
  "Wild Grass": 2638,
  "Frost Pebble": 2639,
  "Fox Shrine": 2650,
  "Boar Shrine": 2651,
  "Hound Shrine": 2652,
  "Stag Shrine": 2653,
  "Legendary Shrine": 2654,
  "Mole Shrine": 2655,
  "Bear Shrine": 2656,
  "Tortoise Shrine": 2657,
  "Moth Shrine": 2658,
  "Obsidian Shrine": 2659,
  "Sparrow Shrine": 2660,
  "Toucan Shrine": 2661,
  "Collie Shrine": 2662,
  "Badger Shrine": 2663,
  "Bantam Shrine": 2664,
  "Trading Shrine": 2665,
  "Fused Stone Rock": 2700,
  "Reinforced Stone Rock": 2701,
  "Ancient Tree": 2702,
  "Sacred Tree": 2703,
  "Refined Iron Rock": 2704,
  "Tempered Iron Rock": 2705,
  "Pure Gold Rock": 2706,
  "Prime Gold Rock": 2707,
  "Petnip Plant": 2708,
  "Pet Kennel": 2709,
  "Pet Toys": 2710,
  "Pet Playground": 2711,
  "Fish Bowl": 2712,
  "Giant Gold Bone": 2713,
  "Lunar Temple": 2714,
  "Magma Stone": 2715,
  Cornucopia: 2716,
  "Messy Bed": 2717,
  "Basic Farming Pack": 2718,
  "Basic Food Box": 2719,
  "Weekly Mega Box": 2720,
  "Basic Love Box": 2721,
  "Fish Flake": 2722,
  "Fish Stick": 2723,
  "Fish Oil": 2724,
  "Crab Stick": 2725,
  "Furikake Sprinkle": 2726,
  "Surimi Rice Bowl": 2727,
  "Creamy Crab Bite": 2728,
  "Crimstone Infused Fish Oil": 2729,
  Isopod: 2800,
  "Blue Crab": 2801,
  Lobster: 2802,
  "Hermit Crab": 2803,
  Shrimp: 2804,
  Mussel: 2805,
  Oyster: 2806,
  Anemone: 2807,
  Barnacle: 2808,
  "Sea Slug": 2809,
  "Sea Snail": 2810,
  "Garden Eel": 2811,
  "Sea Grapes": 2812,
  Octopus: 2813,
  "Sea Urchin": 2814,
  "Horseshoe Crab": 2815,
  "Diving Helmet": 2816,
  "Speckled Kissing Fish": 2817,
  "Dark Eyed Kissing Fish": 2818,
  "Fisherman's Boat": 2819,
  "Sea Arch": 2820,
  "Crabs and Fish Rug": 2821,
  "Fish Flags": 2822,
  "Fish Drying Rack": 2823,
  "Yellow Submarine Trophy": 2824,
  Oaken: 2825,
  Meerkat: 2826,
  "Pearl Bed": 2827,
  "Crimstone Clam": 2828,
  "Poseidon's Throne": 2829,
  "Fish Kite": 2830,
  CluckCoin: 2831,
  "Aged Anchovy": 2900,
  "Aged Butterflyfish": 2901,
  "Aged Blowfish": 2902,
  "Aged Clownfish": 2903,
  "Aged Angelfish": 2904,
  "Aged Cobia": 2905,
  "Aged Halibut": 2906,
  "Aged Muskellunge": 2907,
  "Aged Parrotfish": 2908,
  "Aged Porgy": 2909,
  "Aged Sea Bass": 2910,
  "Aged Tilapia": 2911,
  "Aged Trout": 2912,
  "Aged Walleye": 2913,
  "Aged Weakfish": 2914,
  "Aged Rock Blackfish": 2915,
  "Aged Sea Horse": 2916,
  "Aged Horse Mackerel": 2917,
  "Aged Squid": 2918,
  "Aged Red Snapper": 2919,
  "Aged Moray Eel": 2920,
  "Aged Olive Flounder": 2921,
  "Aged Napoleanfish": 2922,
  "Aged Surgeonfish": 2923,
  "Aged Zebra Turkeyfish": 2924,
  "Aged Ray": 2925,
  "Aged Hammerhead shark": 2926,
  "Aged Barred Knifejaw": 2927,
  "Aged Tuna": 2928,
  "Aged Mahi Mahi": 2929,
  "Aged Blue Marlin": 2930,
  "Aged Oarfish": 2931,
  "Aged Football fish": 2932,
  "Aged Sunfish": 2933,
  "Aged Coelacanth": 2934,
  "Aged Whale Shark": 2935,
  "Aged Saw Shark": 2936,
  "Aged White Shark": 2937,
  "Pickled Radish": 2938,
  "Pickled Zucchini": 2939,
  "Pickled Tomato": 2940,
  "Pickled Cabbage": 2941,
  "Pickled Onion": 2942,
  "Pickled Pepper": 2943,
  "Prime Aged Anchovy": 2944,
  "Prime Aged Butterflyfish": 2945,
  "Prime Aged Blowfish": 2946,
  "Prime Aged Clownfish": 2947,
  "Prime Aged Sea Bass": 2948,
  "Prime Aged Sea Horse": 2949,
  "Prime Aged Horse Mackerel": 2950,
  "Prime Aged Halibut": 2951,
  "Prime Aged Squid": 2952,
  "Prime Aged Red Snapper": 2953,
  "Prime Aged Moray Eel": 2954,
  "Prime Aged Olive Flounder": 2955,
  "Prime Aged Napoleanfish": 2956,
  "Prime Aged Surgeonfish": 2957,
  "Prime Aged Zebra Turkeyfish": 2958,
  "Prime Aged Angelfish": 2959,
  "Prime Aged Ray": 2960,
  "Prime Aged Hammerhead shark": 2961,
  "Prime Aged Barred Knifejaw": 2962,
  "Prime Aged Tuna": 2963,
  "Prime Aged Mahi Mahi": 2964,
  "Prime Aged Blue Marlin": 2965,
  "Prime Aged Oarfish": 2966,
  "Prime Aged Football fish": 2967,
  "Prime Aged Sunfish": 2968,
  "Prime Aged Coelacanth": 2969,
  "Prime Aged Parrotfish": 2970,
  "Prime Aged Whale Shark": 2971,
  "Prime Aged Saw Shark": 2972,
  "Prime Aged White Shark": 2973,
  "Prime Aged Porgy": 2974,
  "Prime Aged Muskellunge": 2975,
  "Prime Aged Trout": 2976,
  "Prime Aged Walleye": 2977,
  "Prime Aged Weakfish": 2978,
  "Prime Aged Rock Blackfish": 2979,
  "Prime Aged Cobia": 2980,
  "Prime Aged Tilapia": 2981,
  "Greenhouse Glow": 2982,
  "Greenhouse Goodie": 2983,
  "Sproutroot Surprise": 2984,
  "Turbofruit Mix": 2985,
  "Capsule Bait": 2986,
  "Umbrella Bait": 2987,
  "Crimson Baitfish": 2988,
  "Salt Sculpture": 2989,
  Pufferfish: 2990,
  "Fat Crab": 2991,
  "Navigation Table": 2992,
  "Royal Crab Pot": 2993,
  "Crab House": 2994,
  "Speed Trap": 2995,
  "Flamingo Chicken": 2996,
  "Salt Crystal Flower": 2997,
  "Spa Cow": 2998,
  "Spa Sheep": 2999,
  "Deep Sea Pig": 3e3,
  "Deep Sea Slug": 3001,
  "Crystal Shrimp": 3002,
  "Salt Rock": 3003,
  "Salt Awakening Raffle Ticket": 3004,
  "Salt Awakening Banner": 3005,
  "Salt Dino Egg": 3006,
  "Pickled Broccoli": 3007,
  "Big Table": 3008,
  Crate: 3009,
  "Empty Pot": 3010,
  "High Table": 3011,
  "Large Podium": 3012,
  "Long Table": 3013,
  "Royal Podium": 3014,
  "Square Table": 3015,
  Stool: 3016,
  "Crystal Altar": 3017,
  "Dino Egg Trophy": 3018,
  "Salt Lamp": 3019,
  "Salt Crystal Bed": 3020,
  "World Map Rug": 3021,
  "Ripped Salt Bag": 3022,
  "Salt Doll": 3023,
  "Jacuzzi Bear": 3024,
  "Design Trophy": 3026,
  Saltwort: 3027,
  "Saltwort Seed": 3028,
  Saltbite: 3029,
  Crocodile: 3030,
  "Dumbo Octopus": 3031,
  "Seahorse Dad": 3032,
  "Ascended Chicken": 3033,
  "Ascended Cow": 3034,
  "Ascended Sheep": 3035,
  "Ruins Flower": 3036,
  "Ascension Age Banner": 3037,
  "Shiny Feather": 3038,
  "Otter Pebble": 3039,
  "Ascension Age Raffle Ticket": 3040,
  "Cloud Bed": 3041,
  "Ascension Monument": 3042,
  "Salt Rug": 3043,
  "Ascended Idol": 3044,
  "Ascended Wheel": 3045,
  Astrolabe: 3046,
  "Coat Rack": 3047,
  Lampshade: 3048,
  "Marble Head": 3049,
  "Otty the Otter": 3050,
  "Salt Worker Gnome": 3051,
  "Shards Turtle": 3052,
  Vibraphone: 3053,
  "Winged Vase": 3054,
  "Letter A Tile": 3055,
  "Letter B Tile": 3056,
  "Letter C Tile": 3057,
  "Letter D Tile": 3058,
  "Letter E Tile": 3059,
  "Letter F Tile": 3060,
  "Letter G Tile": 3061,
  "Letter H Tile": 3062,
  "Letter I Tile": 3063,
  "Letter J Tile": 3064,
  "Letter K Tile": 3065,
  "Letter L Tile": 3066,
  "Letter M Tile": 3067,
  "Letter N Tile": 3068,
  "Letter O Tile": 3069,
  "Letter P Tile": 3070,
  "Letter Q Tile": 3071,
  "Letter R Tile": 3072,
  "Letter S Tile": 3073,
  "Letter T Tile": 3074,
  "Letter U Tile": 3075,
  "Letter V Tile": 3076,
  "Letter W Tile": 3077,
  "Letter X Tile": 3078,
  "Letter Y Tile": 3079,
  "Letter Z Tile": 3080
};

export const SFL_WEARABLE_KNOWN_IDS = {
  "Beige Farmer Potion": 1,
  "Dark Brown Farmer Potion": 2,
  "Light Brown Farmer Potion": 3,
  "Goblin Potion": 4,
  "Basic Hair": 5,
  "Rancher Hair": 6,
  "Explorer Hair": 7,
  "Red Farmer Shirt": 13,
  "Yellow Farmer Shirt": 14,
  "Blue Farmer Shirt": 15,
  "Chef Apron": 16,
  "Warrior Shirt": 17,
  "Farmer Overalls": 18,
  "Lumberjack Overalls": 19,
  "Farmer Pants": 20,
  "Warrior Pants": 21,
  "Black Farmer Boots": 22,
  "Farmer Pitchfork": 23,
  "Farmer Hat": 24,
  "Chef Hat": 25,
  "Warrior Helmet": 26,
  "Sunflower Amulet": 27,
  "Carrot Amulet": 28,
  "Beetroot Amulet": 29,
  "Green Amulet": 30,
  "Sunflower Shield": 31,
  "Farm Background": 32,
  "Fancy Top": 33,
  "Brown Boots": 34,
  "Brown Suspenders": 35,
  "Fancy Pants": 36,
  "Maiden Skirt": 37,
  "Maiden Top": 38,
  "Peasant Skirt": 39,
  "SFL T-Shirt": 40,
  "Yellow Boots": 41,
  "Buzz Cut": 42,
  "Parlour Hair": 43,
  Axe: 44,
  Sword: 45,
  "Blue Suspenders": 46,
  "Forest Background": 47,
  "Seashore Background": 48,
  Blondie: 49,
  "Brown Long Hair": 50,
  "Sun Spots": 51,
  "White Long Hair": 52,
  "Cemetery Background": 53,
  "Teal Mohawk": 54,
  "Space Background": 55,
  Parsnip: 56,
  "Jail Background": 57,
  "Golden Spatula": 58,
  "Artist Scarf": 59,
  "Bumpkin Art Competition Merch": 60,
  "Project Dignity Hoodie": 61,
  "Developer Hoodie": 62,
  "Blacksmith Hair": 63,
  Hammer: 64,
  "Bumpkin Boots": 65,
  "Fire Shirt": 66,
  "Red Long Hair": 67,
  "Snowman Onesie": 68,
  "Reindeer Suit": 69,
  "Shark Onesie": 70,
  "Christmas Background": 71,
  "Devil Wings": 72,
  "Angel Wings": 73,
  "Fire Hair": 74,
  "Luscious Hair": 75,
  "Ancient War Hammer": 76,
  "Ancient Goblin Sword": 77,
  "Mountain View Background": 78,
  "Skull Hat": 79,
  "Reindeer Antlers": 80,
  "Santa Hat": 81,
  "Pineapple Shirt": 82,
  "China Town Background": 83,
  "Lion Dance Mask": 84,
  "Fruit Picker Shirt": 85,
  "Fruit Picker Apron": 86,
  "Fruit Bowl": 87,
  "Striped Blue Shirt": 88,
  "Peg Leg": 89,
  "Pirate Potion": 90,
  "Pirate Hat": 91,
  "Pirate General Coat": 92,
  "Pirate Pants": 93,
  "Pirate Leather Polo": 94,
  "Crab Claw": 95,
  "Pirate Scimitar": 96,
  "Cupid Hair": 97,
  "Cupid Dress": 98,
  "Cupid Sandals": 99,
  "Love Quiver": 100,
  "SFL Office Background": 101,
  "Bumpkin Puppet": 102,
  "Goblin Puppet": 103,
  "Hawaiian Shirt": 104,
  "Bear Onesie": 105,
  "Frog Onesie": 106,
  "Tiger Onesie": 107,
  "Beach Sarong": 108,
  "Lifeguard Hat": 109,
  "Lifeguard Pants": 110,
  "Lifeguard Shirt": 111,
  "Sleeping Otter": 112,
  "Tropical Sarong": 113,
  "Sequence Hat": 114,
  "Sequence Shirt": 115,
  "St Patricks Hat": 116,
  "Bunny Onesie": 117,
  "Light Brown Worried Farmer Potion": 118,
  "Polkastarter Shirt": 119,
  "Beach Trunks": 120,
  "Club Polo": 121,
  "Dawn Breaker Background": 122,
  "Dawn Lamp": 123,
  "Eggplant Onesie": 124,
  "Fox Hat": 125,
  "Grave Diggers Shovel": 126,
  "Infected Potion": 127,
  "Mushroom Hat": 128,
  "Mushroom Lamp": 129,
  "Mushroom Lights Background": 130,
  "Mushroom Pants": 131,
  "Mushroom Shield": 132,
  "Mushroom Shoes": 133,
  "Mushroom Sweater": 134,
  "Rash Vest": 135,
  "Squid Hat": 136,
  "Striped Red Shirt": 137,
  "Striped Yellow Shirt": 138,
  "Summer Top": 139,
  "Sunburst Potion": 140,
  "Water Gun": 141,
  "Wavy Pants": 142,
  "White Turtle Neck": 143,
  "Trial Tee": 144,
  "Auction Megaphone": 145,
  "Auctioneer Slacks": 146,
  "Bidder's Brocade": 147,
  "Harry's Hat": 148,
  "Leather Shoes": 149,
  "Tangerine Hair": 150,
  "Straw Hat": 151,
  "Traveller's Backpack": 152,
  "Traveller's Pants": 153,
  "Traveller's Shirt": 154,
  "Witching Wardrobe": 155,
  "Witch's Broom": 156,
  "Infernal Bumpkin Potion": 157,
  "Infernal Goblin Potion": 158,
  "Imp Costume": 159,
  "Ox Costume": 160,
  "Luna's Hat": 161,
  "Infernal Pitchfork": 162,
  "Infernal Horns": 163,
  Cattlegrim: 164,
  "Crumple Crown": 165,
  "Merch Bucket Hat": 166,
  "Merch Coffee Mug": 167,
  "Dawn Breaker Tee": 168,
  "Merch Tee": 169,
  "Merch Hoodie": 170,
  "Birthday Hat": 171,
  "Double Harvest Cap": 172,
  "Streamer Helmet": 173,
  "Corn Onesie": 174,
  "Crow Wings": 175,
  "Witches' Eve Tee": 176,
  "Wise Beard": 177,
  "Pumpkin Hat": 178,
  "Wise Book": 179,
  "Wise Hair": 180,
  "Wise Robes": 181,
  "Wise Slacks": 182,
  "Wise Staff": 183,
  "Greyed Glory": 184,
  "Tattered Jacket": 185,
  "Hoary Chin": 186,
  "Tattered Slacks": 187,
  "Old Shoes": 188,
  "Bat Wings": 189,
  "Gothic Twilight": 190,
  "Dark Enchantment Gown": 191,
  "Goth Hair": 192,
  "Pale Potion": 193,
  "Stretched Jeans": 194,
  "Skull Shirt": 195,
  "Victorian Hat": 196,
  "Boater Hat": 197,
  "Antique Dress": 198,
  "Crimson Skirt": 199,
  "Chic Gala Blouse": 200,
  "Ash Ponytail": 201,
  "Pink Ponytail": 202,
  "Silver Streaks": 203,
  "Brown Rancher Hair": 204,
  "Parsnip Horns": 205,
  "Potato Suit": 206,
  "Whale Hat": 207,
  "Pumpkin Shirt": 208,
  Halo: 209,
  Kama: 210,
  "Grey Merch Hoodie": 211,
  "Unicorn Horn": 212,
  "Unicorn Hat": 213,
  "Feather Hat": 214,
  "Valoria Wreath": 215,
  "Earn Alliance Sombrero": 216,
  "Fresh Catch Vest": 217,
  "Fish Pro Vest": 218,
  "Reel Fishing Vest": 219,
  "Clown Shirt": 220,
  "Luminous Anglerfish Topper": 221,
  "Abyssal Angler Hat": 222,
  Harpoon: 223,
  "Ancient Rod": 224,
  "Fishing Hat": 225,
  Trident: 226,
  "Infernal Rod": 227,
  "Bucket O' Worms": 228,
  "Coconut Mask": 229,
  "Crab Trap": 230,
  "Seaside Tank Top": 231,
  "Fish Trap": 232,
  "Fishing Pants": 233,
  "Angler Waders": 234,
  "Fishing Spear": 235,
  "Flip Flops": 236,
  Wellies: 237,
  "Saw Fish": 238,
  "Skinning Knife": 239,
  "Sunflower Rod": 240,
  "Tackle Box": 241,
  "Mermaid Potion": 242,
  "Squirrel Monkey Potion": 243,
  "Koi Fish Hat": 244,
  "Normal Fish Hat": 245,
  "Stockeye Salmon Onesie": 246,
  "Tiki Armor": 247,
  "Tiki Mask": 248,
  "Tiki Pants": 249,
  "Banana Amulet": 250,
  "Banana Onesie": 251,
  "Blossom Dumbo": 252,
  "Companion Cap": 253,
  "Radiant Dumbo": 254,
  "Deep Sea Helm": 255,
  "Maple Dumbo": 256,
  "Pickaxe Shark": 257,
  "Seedling Hat": 258,
  "Gloomy Dumbo": 259,
  "Ugly Christmas Sweater": 260,
  "Candy Cane": 261,
  "Elf Hat": 262,
  "Elf Potion": 263,
  "Elf Shoes": 264,
  "Elf Suit": 265,
  "Santa Beard": 266,
  "Santa Suit": 267,
  "Butterfly Wings": 268,
  "Cozy Hoodie": 269,
  "New Years Tiara": 270,
  "Northern Lights Background": 271,
  "Short Shorts": 272,
  "Winter Jacket": 273,
  "Beehive Staff": 274,
  "Bee Smoker": 275,
  "Bee Suit": 276,
  "Bee Wings": 277,
  "Beekeeper Hat": 278,
  "Beekeeper Suit": 279,
  "Crimstone Boots": 280,
  "Crimstone Pants": 281,
  "Crimstone Armor": 282,
  "Gardening Overalls": 283,
  "Crimstone Hammer": 284,
  "Crimstone Amulet": 285,
  "Full Bloom Shirt": 286,
  "Blue Blossom Shirt": 287,
  "Fairy Sandals": 288,
  "Daisy Tee": 289,
  "Propeller Hat": 290,
  "Honeycomb Shield": 291,
  "Hornet Mask": 292,
  "Flower Crown": 293,
  "Blue Monarch Dress": 294,
  "Green Monarch Dress": 295,
  "Orange Monarch Dress": 296,
  "Blue Monarch Shirt": 297,
  "Green Monarch Shirt": 298,
  "Orange Monarch Shirt": 299,
  "Queen Bee Crown": 300,
  "Rose Dress": 301,
  "Blue Rose Dress": 302,
  "Chicken Hat": 303,
  "Lucky Red Hat": 304,
  "Lucky Red Suit": 305,
  "Valentine's Field Background": 306,
  "Love's Topper": 307,
  "Oil Can": 308,
  "Non La Hat": 309,
  "Olive Shield": 310,
  "Paw Shield": 311,
  "Royal Robe": 312,
  Crown: 313,
  Pan: 314,
  "Soybean Onesie": 315,
  "Gift Giver": 316,
  "Olive Royalty Shirt": 317,
  "Royal Scepter": 318,
  "Tofu Mask": 319,
  "Goblin Armor": 320,
  "Goblin Helmet": 321,
  "Goblin Pants": 322,
  "Goblin Sabatons": 323,
  "Goblin Axe": 324,
  "Nightshade Armor": 325,
  "Nightshade Helmet": 326,
  "Nightshade Pants": 327,
  "Nightshade Sabatons": 328,
  "Nightshade Sword": 329,
  "Bumpkin Armor": 330,
  "Bumpkin Helmet": 331,
  "Bumpkin Sword": 332,
  "Bumpkin Pants": 333,
  "Bumpkin Sabatons": 334,
  "Sunflorian Armor": 335,
  "Sunflorian Sword": 336,
  "Sunflorian Helmet": 337,
  "Sunflorian Pants": 338,
  "Sunflorian Sabatons": 339,
  "Cap n Bells": 340,
  "Knight Gambit": 341,
  "Pixel Perfect Hoodie": 342,
  "Queen's Crown": 343,
  "Royal Dress": 344,
  Motley: 345,
  "Royal Braids": 346,
  "Painter's Cap": 347,
  "Festival of Colors Background": 348,
  "Pharaoh Headdress": 349,
  "Camel Onesie": 350,
  "Amber Amulet": 351,
  "Desert Background": 352,
  "Explorer Shirt": 353,
  "Dev Wrench": 354,
  "Rock Hammer": 355,
  "Sun Scarab Amulet": 356,
  "Explorer Hat": 357,
  "Oil Protection Hat": 358,
  "Explorer Shorts": 359,
  "Oil Overalls": 360,
  "Desert Merchant Turban": 361,
  "Desert Merchant Shoes": 362,
  "Desert Merchant Suit": 363,
  "Desert Camel Background": 364,
  "Water Gourd": 365,
  "Rocket Onesie": 366,
  "Coin Aura": 367,
  "Ankh Shirt": 368,
  "Ancient Shovel": 369,
  "Infernal Drill": 370,
  "Lemon Shield": 371,
  "Scarab Wings": 372,
  "Grape Pants": 373,
  "Bionic Drill": 374,
  "Fossil Head": 375,
  "Bumpkin Crown": 376,
  "Goblin Crown": 377,
  "Nightshade Crown": 378,
  "Sunflorian Crown": 379,
  "Bumpkin Shield": 380,
  "Goblin Shield": 381,
  "Nightshade Shield": 382,
  "Sunflorian Shield": 383,
  "Bumpkin Quiver": 384,
  "Goblin Quiver": 385,
  "Nightshade Quiver": 386,
  "Sunflorian Quiver": 387,
  "Bumpkin Medallion": 388,
  "Goblin Medallion": 389,
  "Nightshade Medallion": 390,
  "Sunflorian Medallion": 391,
  "Pumpkin Plaza Background": 392,
  "Goblin Retreat Background": 393,
  "Kingdom Background": 394,
  "Gam3s Cap": 395,
  "Cowboy Hat": 396,
  "Cowboy Shirt": 397,
  "Cowboy Trouser": 398,
  "Cowboy Boots": 399,
  "Infernal Bullwhip": 400,
  "White Sheep Onesie": 401,
  "Black Sheep Onesie": 402,
  "Chicken Suit": 403,
  "Cowgirl Skirt": 404,
  "Merino Jumper": 405,
  "Dream Scarf": 406,
  "Cowbell Necklace": 407,
  "Milk Apron": 408,
  "Shepherd Staff": 409,
  "Sol & Luna": 410,
  "Fossil Armor": 411,
  "Fossil Pants": 412,
  "Rice Shirt": 413,
  Sickle: 414,
  "Speed Boots": 415,
  "Tomato Apron": 416,
  "Adventurer's Suit": 417,
  "Adventurer's Torch": 418,
  "Pumpkin Head": 419,
  "Gingerbread Onesie": 420,
  "New Years Crown": 421,
  "Ladybug Suit": 422,
  "Acorn Hat": 423,
  "Crab Hat": 424,
  "Weather Hat": 425,
  "Sakura Shirt": 426,
  "Squirrel Onesie": 427,
  "Locust Onesie": 428,
  "Locust King Onesie": 429,
  "Glacial Plume": 430,
  "Solflare Aegis": 431,
  "Blossom Ward": 432,
  "Autumn's Embrace": 433,
  "Frozen Heart": 434,
  "Love Heart Onesie": 435,
  "Love Bear Onesie": 436,
  "Flower Bouquet": 437,
  "Streamer Hat": 438,
  "Dino Onesie": 439,
  "Golden Wings": 440,
  "Flower Mask": 441,
  "Luvvy Head": 442,
  "Grumpy Cat": 443,
  "Love Puff Aura": 444,
  "Carrot Pitchfork": 445,
  "Handheld Bunny": 446,
  "Bunny Pants": 447,
  "Bunny Mask": 448,
  "Easter Apron": 449,
  "Bloomwarden Suit": 450,
  "Embersteel Suit": 451,
  "Amberfall Suit": 452,
  "Glacierguard Suit": 453,
  "Broccoli Hat": 454,
  "Frost Sword": 455,
  "Medic Apron": 456,
  "Obsidian Necklace": 457,
  "Red Pepper Onesie": 458,
  "Love Charm Shirt": 459,
  "Sky Island Background": 460,
  "Oracle Syringe": 461,
  "Coin Head": 462,
  "Paint Splattered Hair": 463,
  "Paint Splattered Shirt": 464,
  "Paint Splattered Overalls": 465,
  "Paint Spray Can": 466,
  "Slime Hat": 467,
  "Slime Wings": 468,
  "Slime Aura": 469,
  "Brush Back Hair": 470,
  Moustache: 471,
  "Chemist Potion": 472,
  "Diamond Patterned Vest": 473,
  "Recycle Shirt": 474,
  "Garbage Bin Hat": 475,
  "Turd Topper": 476,
  "Architect Ruler": 477,
  "Onion Leek": 478,
  "Oil Gallon": 479,
  "Alchemist Apron": 480,
  "Lava Swimwear": 481,
  "Wooly Dress": 482,
  "Raccoon Onesie": 483,
  "Golden Seedling": 484,
  "Moonseeker Potion": 485,
  "Frizzy Bob Cut": 486,
  "Two-toned Layered": 487,
  "Halloween Deathscythe": 488,
  "Moonseeker Hand Puppet": 489,
  "Sweet Devil Horns": 490,
  "Trick and Treat": 491,
  "Jack O'Sweets": 492,
  "Frank Onesie": 493,
  "Research Uniform": 494,
  "Sweet Devil Dress": 495,
  "Underworld Stimpack": 496,
  "Sweet Devil Wings": 497,
  "Wisp Aura": 498,
  "Luna's Crescent": 499,
  "Master Chef's Cleaver": 500,
  "Training Whistle": 501,
  "Chef Shirt": 502,
  "Pet Specialist Shirt": 503,
  "Pet Specialist Pants": 504,
  "Pet Specialist Hat": 505,
  "Xmas Top Hat": 506,
  "Reindeer Mask": 507,
  "Snowman Mask": 508,
  "Cool Glasses": 509,
  "Comfy Xmas Pants": 510,
  "Holiday Feast Background": 511,
  "Comfy Xmas Sweater": 512,
  "Candy Halbred": 513,
  "Cookie Shield": 514,
  "Cozy Reindeer Onesie": 515,
  "Diamond Snow Aura": 516,
  "2026 Tiara": 517,
  "Walrus Onesie": 518,
  "Crimstone Spikes Hair": 519,
  "Paw Aura": 520,
  "Victoria's Apron": 521,
  "Beast Shoes": 522,
  "Fish Hook Hat": 523,
  "Fish Hook Vest": 524,
  "Fish Hook Waders": 525,
  "Corn Silk Hair": 526,
  "Neon Noiz Jacket": 527,
  "404 Chic Top": 528,
  "Neon Noiz Pants": 529,
  "404 Chic Skirt": 530,
  "Admin Fools Tools": 531,
  "Neon Noiz Shoes": 532,
  "404 Chic Boots": 533,
  "Aether Specs": 534,
  "Faulty Barrier Background": 535,
  "Cardboard Wings": 536,
  "Glitch Aura": 537,
  "Bumpkin Eyes": 538,
  "Big Wink Eyes": 539,
  "Fun Eyes": 540,
  "Giggle Eyes": 541,
  "Grumpy Eyes": 542,
  "Relaxed Eyes": 543,
  "Scared Eyes": 544,
  "Surprised Eyes": 545,
  "Wink Eyes": 546,
  "Bumpkin Smile": 547,
  "Angry Mouth": 548,
  "Baby Teeth": 549,
  "Big Smile": 550,
  "Fanged Smile": 551,
  "Gold Teeth": 552,
  "Infernal Smile": 553,
  "Neutral Mouth": 554,
  "Pistol Shrimp": 555,
  "Spa Hat": 556,
  "Spa Robe": 557,
  "Spa Slippers": 558,
  "Bubble Aura": 559,
  "Deep Sea Salt Cave Background": 560,
  "Clam Shell Hat": 561,
  "Shrimp Onesie": 562,
  "Brasil Jersey": 563,
  "Rainbow Wings": 564,
  "Butterfly Aura": 565,
  "Slime Wall Background": 566,
  "Green Slime Hair": 567,
  "Blue Slime Shirt": 568,
  "Slime Splattered Shirt": 569,
  "Yellow Slime Puppet": 570,
  "Blue Jelly Shoes": 571,
  "Sad Slime Slippers": 572,
  "Sad Slime Hat": 573,
  "Sad Slime Pants": 574,
  "Red Jelly Pants": 575,
  "Ascension Staff": 576,
  "Ascension Wings": 577,
  "Salt Bottle Onesie": 578,
  "Swamp Armor": 579,
  "Swamp Lily Hat": 580,
  "Swamp Pants": 581,
  "Moon Hair": 582,
  "Crystal Shoes": 583,
  "Marble Pants": 584,
  "Spooky Coat": 585,
  "Surfer Hair": 586
};

export const SFL_COLLECTIBLE_ID_TO_NAME = Object.entries(SFL_COLLECTIBLE_KNOWN_IDS).reduce((acc, [name, id]) => {
  acc[id] = name;
  return acc;
}, {});

export const SFL_WEARABLE_ID_TO_NAME = Object.entries(SFL_WEARABLE_KNOWN_IDS).reduce((acc, [name, id]) => {
  acc[id] = name;
  return acc;
}, {});

function sflMarketplaceApiBase() {
  return SFL_COMMUNITY_PROXY_BASE + "community/data?type=marketplaceActivity";
}

const SFL_MARKETPLACE_LOOKBACK_DAYS = 10;

function sflFormatMarketplaceDate(d) {
  return d.toISOString().slice(0, 10);
}

function sflPickMarketplaceReport(reports, dateStr) {
  if (!reports) return null;
  if (reports[dateStr]) return {
    dateStr: dateStr,
    report: reports[dateStr]
  };
  const keys = Object.keys(reports).sort();
  const latestKey = keys.length ? keys[keys.length - 1] : null;
  return latestKey ? {
    dateStr: latestKey,
    report: reports[latestKey]
  } : null;
}

async function fetchMarketplaceActivityReport() {
  const dateStr = sflFormatMarketplaceDate(new Date);
  try {
    const res = await fetch(sflMarketplaceApiBase(), {
      cache: "no-store"
    });
    if (!res.ok) throw new Error("Bad response " + res.status);
    const json = await res.json();
    const picked = sflPickMarketplaceReport(json && json.data && json.data.reports, dateStr);
    if (picked && picked.report && picked.report.items && Object.keys(picked.report.items).length) {
      return {
        date: picked.dateStr,
        items: picked.report.items,
        flowerPrice: json.data.flowerPrice
      };
    }
    throw new Error("No marketplace report available");
  } catch (e) {
    for (let i = 1; i <= SFL_MARKETPLACE_LOOKBACK_DAYS; i++) {
      const d = new Date;
      d.setUTCDate(d.getUTCDate() - i);
      const pastDateStr = sflFormatMarketplaceDate(d);
      try {
        const res = await fetch(sflMarketplaceApiBase() + "&date=" + pastDateStr, {
          cache: "no-store"
        });
        if (!res.ok) continue;
        const json = await res.json();
        const report = json && json.data && json.data.reports && json.data.reports[pastDateStr];
        if (report && report.items && Object.keys(report.items).length) {
          return {
            date: pastDateStr,
            items: report.items,
            flowerPrice: json.data.flowerPrice
          };
        }
      } catch (e2) {}
    }
    throw e;
  }
}

function sflItemFloorPrice(item) {
  const floor = item && item.floor;
  if (typeof floor === "number" && isFinite(floor) && floor > 0) return floor;
  const latest = item && item.latestSale;
  if (typeof latest === "number" && isFinite(latest) && latest > 0) return latest;
  const low = item && item.low;
  return typeof low === "number" && isFinite(low) && low > 0 ? low : null;
}

function buildPricePoolsFromMarketplaceItems(items) {
  const collectiblesPool = {};
  const wearablesPool = {};
  const budsPool = {};
  const petsPool = {};
  Object.keys(items || {}).forEach(key => {
    const sep = key.lastIndexOf("-");
    if (sep === -1) return;
    const category = key.slice(0, sep);
    const id = key.slice(sep + 1);
    const floor = sflItemFloorPrice(items[key]);
    if (floor == null) return;
    if (category === "collectibles") {
      const name = SFL_COLLECTIBLE_ID_TO_NAME[id];
      if (name) collectiblesPool[name] = floor;
    } else if (category === "wearables") {
      const name = SFL_WEARABLE_ID_TO_NAME[id];
      if (name) wearablesPool[name] = floor;
    } else if (category === "buds") {
      budsPool["Bud #" + id] = floor;
    } else if (category === "pets") {
      petsPool["Pet #" + id] = floor;
    }
  });
  return {
    collectiblesPool: collectiblesPool,
    wearablesPool: wearablesPool,
    budsPool: budsPool,
    petsPool: petsPool
  };
}

export let cosmeticNftPrices = safeLSJSON(localStorage.getItem("hl_cosmetic_nft_prices"), {});

export let cosmeticPricesUpdatedAt = parseInt(localStorage.getItem("hl_cosmetic_prices_updated") || "0") || null;

const COSMETIC_PRICES_TTL_MS = 300000;

let __cosmeticPricesPromise = null;

function setCosmeticNftPrices(pool) {
  cosmeticNftPrices = pool || {};
  cosmeticPricesUpdatedAt = Date.now();
  localStorage.setItem("hl_cosmetic_nft_prices", JSON.stringify(cosmeticNftPrices));
  localStorage.setItem("hl_cosmetic_prices_updated", String(cosmeticPricesUpdatedAt));
  window.dispatchEvent(new Event("guroPricesUpdated"));
}

export function findCosmeticPriceForName(name) {
  return findPriceInPool(cosmeticNftPrices, name);
}

const SFL_COSMETICS_WORKER_BASE = "https://sfl-cosmetics-cache.bossweki.workers.dev";

const SFL_COSMETICS_WORKER_TIMEOUT_MS = 7000;

const SFL_COSMETICS_WORKER_MAX_ATTEMPTS = 3;

const SFL_COSMETICS_WORKER_RETRY_DELAYS_MS = [400, 800];

let __sflCosmeticsWorkerStale = null;

function sflCosmeticsSleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function fetchCosmeticsSnapshotWorkerOnce() {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), SFL_COSMETICS_WORKER_TIMEOUT_MS);
  try {
    const res = await fetch(SFL_COSMETICS_WORKER_BASE + "/snapshot", {
      cache: "no-store",
      signal: controller.signal
    });
    if (!res.ok) return null;
    const json = await res.json();
    if (!json || !json.ok || !Array.isArray(json.items) || !json.items.length) return null;
    return json.items;
  } finally {
    clearTimeout(timer);
  }
}

async function fetchCosmeticsSnapshotWorkerItems() {
  let items = null;
  for (let attempt = 0; attempt < SFL_COSMETICS_WORKER_MAX_ATTEMPTS; attempt++) {
    try {
      items = await fetchCosmeticsSnapshotWorkerOnce();
    } catch (e) {
      items = null;
    }
    if (items) break;
    if (attempt < SFL_COSMETICS_WORKER_MAX_ATTEMPTS - 1) {
      const delay = SFL_COSMETICS_WORKER_RETRY_DELAYS_MS[attempt] || SFL_COSMETICS_WORKER_RETRY_DELAYS_MS[SFL_COSMETICS_WORKER_RETRY_DELAYS_MS.length - 1];
      await sflCosmeticsSleep(delay);
    }
  }
  if (items) {
    __sflCosmeticsWorkerStale = items;
    return items;
  }
  return __sflCosmeticsWorkerStale;
}

function buildPricePoolsFromCosmeticsSnapshot(items) {
  const collectiblesPool = {};
  const wearablesPool = {};
  (items || []).forEach(it => {
    if (!it || !(it.price > 0)) return;
    const id = String(it.id);
    if (it.collection === "collectibles") {
      const name = SFL_COLLECTIBLE_ID_TO_NAME[id];
      if (name) collectiblesPool[name] = it.price;
    } else if (it.collection === "wearables") {
      const name = SFL_WEARABLE_ID_TO_NAME[id];
      if (name) wearablesPool[name] = it.price;
    }
  });
  return {
    collectiblesPool: collectiblesPool,
    wearablesPool: wearablesPool
  };
}

export function ensureCosmeticPricesLoaded(forceFresh) {
  if (!forceFresh && cosmeticPricesUpdatedAt && Object.keys(cosmeticNftPrices).length && Date.now() - cosmeticPricesUpdatedAt < COSMETIC_PRICES_TTL_MS) {
    return Promise.resolve(cosmeticNftPrices);
  }
  if (__cosmeticPricesPromise) return __cosmeticPricesPromise;
  __cosmeticPricesPromise = (async () => {
    try {
      const workerItems = await fetchCosmeticsSnapshotWorkerItems();
      if (workerItems && workerItems.length) {
        const pools = buildPricePoolsFromCosmeticsSnapshot(workerItems);
        setCosmeticNftPrices(Object.assign({}, pools.collectiblesPool, pools.wearablesPool));
      } else {
        const report = await fetchMarketplaceActivityReport();
        const pools = buildPricePoolsFromMarketplaceItems(report.items);
        setCosmeticNftPrices(Object.assign({}, pools.collectiblesPool, pools.wearablesPool));
      }
      __set___profileTradableRowsCacheG(null);
      __set___profileTradableRowsCacheByTab({});
      if (profileState.view === "tradable" && profileState.tradableTab === "cosmetics") renderProfileTradable();
    } catch (e) {
      console.warn("Cosmetics price fetch failed:", e);
    }
    return cosmeticNftPrices;
  })().finally(() => {
    __cosmeticPricesPromise = null;
  });
  return __cosmeticPricesPromise;
}

export let marketplaceFlowerUsdPrice = parseFloat(localStorage.getItem("hl_flower_usd_price")) || null;

function setMarketplaceFlowerUsdPrice(v) {
  if (typeof v !== "number" || !isFinite(v) || v <= 0) return;
  const changed = marketplaceFlowerUsdPrice !== v;
  marketplaceFlowerUsdPrice = v;
  try {
    localStorage.setItem("hl_flower_usd_price", String(v));
  } catch (e) {}
  if (changed) window.dispatchEvent(new Event("guroPricesUpdated"));
}

const SFL_SNAPSHOT_WORKER_BASE = "https://sfl-market-cache.bossweki.workers.dev";

const SFL_SNAPSHOT_WORKER_TTL_MS = 6e4;

const SFL_SNAPSHOT_WORKER_MAX_ATTEMPTS = 3;

const SFL_SNAPSHOT_WORKER_RETRY_DELAYS_MS = [400, 800];

const SFL_SNAPSHOT_WORKER_TIMEOUT_MS = 7000;

let __sflSnapshotWorkerCache = null;

let __sflSnapshotWorkerTs = 0;

let __sflSnapshotWorkerPromise = null;

let __sflSnapshotWorkerStale = null;

let __sflSnapshotWorkerStaleTs = 0;

function sflSnapshotSleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function fetchSnapshotWorkerOnce() {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), SFL_SNAPSHOT_WORKER_TIMEOUT_MS);
  try {
    const res = await fetch(SFL_SNAPSHOT_WORKER_BASE + "/snapshot", {
      cache: "no-store",
      signal: controller.signal
    });
    if (!res.ok) return null;
    const json = await res.json();
    if (!json || !json.ok || !Array.isArray(json.items) || !json.items.length) return null;
    return json.items;
  } finally {
    clearTimeout(timer);
  }
}

async function fetchSnapshotWorkerItems(forceFresh) {
  const now = Date.now();
  if (!forceFresh && __sflSnapshotWorkerCache && now - __sflSnapshotWorkerTs < SFL_SNAPSHOT_WORKER_TTL_MS) {
    return __sflSnapshotWorkerCache;
  }
  if (__sflSnapshotWorkerPromise) return __sflSnapshotWorkerPromise;
  __sflSnapshotWorkerPromise = (async () => {
    let items = null;
    for (let attempt = 0; attempt < SFL_SNAPSHOT_WORKER_MAX_ATTEMPTS; attempt++) {
      try {
        items = await fetchSnapshotWorkerOnce();
      } catch (e) {
        items = null;
      }
      if (items) break;
      if (attempt < SFL_SNAPSHOT_WORKER_MAX_ATTEMPTS - 1) {
        const delay = SFL_SNAPSHOT_WORKER_RETRY_DELAYS_MS[attempt] || SFL_SNAPSHOT_WORKER_RETRY_DELAYS_MS[SFL_SNAPSHOT_WORKER_RETRY_DELAYS_MS.length - 1];
        await sflSnapshotSleep(delay);
      }
    }
    if (items) {
      __sflSnapshotWorkerCache = items;
      __sflSnapshotWorkerTs = Date.now();
      __sflSnapshotWorkerStale = items;
      __sflSnapshotWorkerStaleTs = Date.now();
      return items;
    }
    if (__sflSnapshotWorkerStale) {
      console.warn("[live-prices] snapshot worker fetch failed; reusing last known-good snapshot from " + Math.round((Date.now() - __sflSnapshotWorkerStaleTs) / 1000) + "s ago.");
      return __sflSnapshotWorkerStale;
    }
    return null;
  })().finally(() => {
    __sflSnapshotWorkerPromise = null;
  });
  return __sflSnapshotWorkerPromise;
}

function buildPricePoolsFromWorkerSnapshot(items) {
  const collectiblesPool = {};
  const wearablesPool = {};
  (items || []).forEach(it => {
    if (!it || !(it.price > 0)) return;
    const id = String(it.id);
    if (it.collection === "collectibles") {
      const name = SFL_COLLECTIBLE_ID_TO_NAME[id];
      if (name) collectiblesPool[name] = it.price;
    } else if (it.collection === "wearables") {
      const name = SFL_WEARABLE_ID_TO_NAME[id];
      if (name) wearablesPool[name] = it.price;
    }
  });
  return {
    collectiblesPool: collectiblesPool,
    wearablesPool: wearablesPool
  };
}

let __flowerUsdRefreshPromise = null;

export function refreshMarketplaceFlowerUsdPrice() {
  if (__flowerUsdRefreshPromise) return __flowerUsdRefreshPromise;
  __flowerUsdRefreshPromise = (async () => {
    const delays = [0, 1500, 4000, 8000];
    for (let i = 0; i < delays.length; i++) {
      if (delays[i]) await new Promise(r => setTimeout(r, delays[i]));
      try {
        const report = await fetchMarketplaceActivityReport();
        setMarketplaceFlowerUsdPrice(report.flowerPrice);
        if (typeof marketplaceFlowerUsdPrice === "number" && marketplaceFlowerUsdPrice > 0) return true;
      } catch (e) {}
    }
    return false;
  })().finally(() => {
    __flowerUsdRefreshPromise = null;
  });
  return __flowerUsdRefreshPromise;
}

function refreshMarketplaceFlowerUsdPriceInBackground() {
  refreshMarketplaceFlowerUsdPrice();
}

async function fetchLivePricesFromMarketplaceApi(forceFresh) {
  const workerItems = await fetchSnapshotWorkerItems(forceFresh);
  if (workerItems && workerItems.length) {
    refreshMarketplaceFlowerUsdPriceInBackground();
    const pools = buildPricePoolsFromWorkerSnapshot(workerItems);
    const p2p = pools.collectiblesPool;
    const nft = Object.assign({}, pools.collectiblesPool, pools.wearablesPool);
    return {
      p2p: p2p,
      nft: nft,
      updatedAt: Date.now(),
      source: "ws"
    };
  }
  const report = await fetchMarketplaceActivityReport();
  setMarketplaceFlowerUsdPrice(report.flowerPrice);
  const pools = buildPricePoolsFromMarketplaceItems(report.items);
  const p2p = pools.collectiblesPool;
  const nft = Object.assign({}, pools.collectiblesPool, pools.wearablesPool, pools.budsPool, pools.petsPool);
  return {
    p2p: p2p,
    nft: nft,
    updatedAt: Date.now(),
    source: "lap"
  };
}

export const SFL_PROXY_BASE = "https://sfl-proxy.bossweki.workers.dev/proxy";

const SFL_PRICE_API = SFL_PROXY_BASE + "/api/v1/prices";

export const SFL_NFT_PRICE_API = SFL_PROXY_BASE + "/api/v1/nfts";

export let livePrices = safeLSJSON(localStorage.getItem("hl_live_prices"), {});

export let livePricesUpdatedAt = parseInt(localStorage.getItem("hl_live_prices_updated") || "0") || null;

export let liveNftPrices = safeLSJSON(localStorage.getItem("hl_live_nft_prices"), {});

export const _priceIndexCache = new WeakMap;

function findPriceInPool(pool, name) {
  if (!name) return null;
  const isRealPrice = v => typeof v === "number" && isFinite(v) && v > 0;
  if (isRealPrice(pool[name])) return pool[name];
  const idx = getPoolIndex(pool);
  const lower = name.trim().toLowerCase();
  const exactKey = idx.exact.get(lower);
  if (exactKey != null && isRealPrice(pool[exactKey])) return pool[exactKey];
  const target = normalizeItemName(name);
  if (!target) return null;
  const fuzzyKey = idx.norm.get(target);
  return fuzzyKey != null && isRealPrice(pool[fuzzyKey]) ? pool[fuzzyKey] : null;
}

export function findLivePriceForName(name) {
  return findPriceInPool(livePrices, name);
}

export function findLiveNftPriceForName(name) {
  return findPriceInPool(liveNftPrices, name);
}

export function findLivePriceForItem(m) {
  if (m && (m.isNftCollectible || m.isWearable)) return findLiveNftPriceForName(m.name);
  return findLivePriceForName(m.name);
}

export function setLivePrices(p2p, updatedAt, nft) {
  livePrices = p2p || {};
  livePricesUpdatedAt = updatedAt || Date.now();
  localStorage.setItem("hl_live_prices", JSON.stringify(livePrices));
  localStorage.setItem("hl_live_prices_updated", String(livePricesUpdatedAt));
  if (nft) {
    liveNftPrices = nft;
    localStorage.setItem("hl_live_nft_prices", JSON.stringify(liveNftPrices));
  }
  if (typeof __profileTradableRowsCacheG !== "undefined") {
    __set___profileTradableRowsCacheG(null);
    __set___profileTradableRowsCacheByTab({});
  }
  updateLiveSyncStatus();
  if (typeof renderBettyShop === "function") renderBettyShop();
  window.dispatchEvent(new Event("guroPricesUpdated"));
}

export function applyLivePricesToMarket(overwriteExisting) {
  let updated = 0;
  const unmatched = [];
  marketItems.forEach(m => {
    const price = findLivePriceForItem(m);
    if (price == null) {
      unmatched.push(m.name);
      return;
    }
    if (overwriteExisting || !m.flowerPrice) {
      m.flowerPrice = price;
      updated++;
    }
  });
  if (updated) {
    saveMarketState();
    renderMarketList();
    renderCropsList();
    renderFruitsList();
    renderGreenhouseList();
    renderHoneyList();
    if (typeof renderCookingPanel === "function") renderCookingPanel();
    updateCalcSummary();
  }
  if (unmatched.length) console.warn("Goblin Calculator: no live price match for:", unmatched);
  return {
    updated: updated,
    total: marketItems.length,
    unmatched: unmatched
  };
}

export function autoFillLivePricesForNewEntries() {
  if (!Object.keys(livePrices).length && !Object.keys(liveNftPrices).length) return;
  applyLivePricesToMarket(false);
}

async function fetchNftFloorPricesFromSflWorld() {
  const res = await fetch(SFL_NFT_PRICE_API, {
    cache: "no-store"
  });
  if (!res.ok) throw new Error("Bad response " + res.status);
  const json = await res.json();
  const out = {};
  const collectGroup = list => {
    (list || []).forEach(item => {
      if (item && typeof item.name === "string" && item.name.trim() && typeof item.floor === "number" && item.floor > 0) {
        out[item.name] = item.floor;
      }
    });
  };
  collectGroup(json && json.collectibles);
  collectGroup(json && json.wearables);
  return out;
}

async function fetchLivePricesFromSflWorld() {
  const res = await fetch(SFL_PRICE_API, {
    cache: "no-store"
  });
  if (!res.ok) throw new Error("Bad response " + res.status);
  const json = await res.json();
  const p2p = json && json.data && json.data.p2p || {};
  const updatedAt = json && json.updatedAt || Date.now();
  let nftPrices = {};
  try {
    nftPrices = await fetchNftFloorPricesFromSflWorld();
  } catch (e) {
    console.warn("NFT price fetch failed:", e);
  }
  return {
    p2p: p2p,
    nft: nftPrices,
    updatedAt: updatedAt
  };
}

export let livePriceSource = localStorage.getItem("hl_live_price_source") || null;

function setLivePriceSource(source) {
  livePriceSource = source;
  if (source) localStorage.setItem("hl_live_price_source", source); else localStorage.removeItem("hl_live_price_source");
}

export function priceSourceBadgeHtml(source) {
  if (!source || !PRICE_SOURCE_LABELS[source]) return "";
  const label = PRICE_SOURCE_LABELS[source];
  return `<span class="price-source-badge price-source-${source}" data-price-source="${source}" data-price-source-label="${escapeHtml(label)}" title="${escapeHtml(label)}">${source.toUpperCase()}</span>`;
}

function getLivePriceSourceForItem(m) {
  if (!livePriceSource) return null;
  return findLivePriceForItem(m) != null ? livePriceSource : null;
}

function getLivePriceSourceForName(name, isNft) {
  if (!livePriceSource) return null;
  const price = isNft ? findLiveNftPriceForName(name) : findLivePriceForName(name);
  return price != null ? livePriceSource : null;
}

document.addEventListener("click", e => {
  const badge = e.target.closest(".price-source-badge");
  if (!badge) return;
  e.stopPropagation();
  e.preventDefault();
  const label = badge.dataset.priceSourceLabel || "";
  const source = badge.dataset.priceSource || "";
  toast(`${source.toUpperCase()} = ${label}`);
}, true);

export async function fetchLivePrices(forceFresh) {
  const result = await fetchLivePricesFromMarketplaceApi(forceFresh);
  setLivePriceSource(result.source || "lap");
  return result;
}

export async function initLivePricesOnLoad() {
  updateLiveSyncStatus();
  if (Object.keys(livePrices).length) applyLivePricesToMarket(false);
  try {
    const {p2p: p2p, nft: nft, updatedAt: updatedAt} = await fetchLivePrices();
    setLivePrices(p2p, updatedAt, nft);
    autoFillLivePricesForNewEntries();
  } catch (e) {
    console.warn("Background live price fetch failed (likely CORS):", e);
  }
}

export const SFL_LAND_API_BASE = SFL_PROXY_BASE + "/api/v1.1/land/";

export const SFL_LAND_INFO_BASE = SFL_PROXY_BASE + "/api/v1/land/info/farm_id/";

export const SFL_COMMUNITY_PROXY_BASE = "https://sfl-community-proxy.bossweki.workers.dev/";

export const SFL_COMMUNITY_API_BASE = SFL_COMMUNITY_PROXY_BASE + "community/farms/";

export function computeResourceBaseCostCoins(name) {
  const data = RESOURCE_DATA[name];
  if (!data) return 0;
  let materialsCost = 0;
  (data.materials || []).forEach(mat => {
    const mode = getMaterialMode(name, mat.name);
    materialsCost += (mat.qty || 0) * getMaterialUnitCostCoins(mat.name, mode);
  });
  const total = materialsCost + (data.toolCoinCost || 0);
  return total / (data.yieldPer || 1);
}

export function computeCropBaseCostCoins(name) {
  const d = BASE_CROPS[name];
  if (!d) return 0;
  return (d.seedCost || 0) / (d.baseYield || 1);
}

export function getFruitBaseCostCoins(fruitName) {
  const d = BASE_FRUITS[fruitName];
  if (!d) return 0;
  const seedCoinCost = d.seedCost || 0;
  const axeQty = d.axeQty || 0;
  const woodReturnQty = d.woodReturnQty || 0;
  const axeCoinCost = axeQty * (RESOURCE_DATA.Wood.toolCoinCost || 0);
  const mode = getMaterialMode("Fruit_" + fruitName, "Wood");
  const woodRebateCoins = woodReturnQty * getMaterialUnitCostCoins("Wood", mode);
  const totalYield = Math.max(1e-4, (d.minHarvest || 1) * (d.yieldPerHarvest || 1));
  return (seedCoinCost + axeCoinCost - woodRebateCoins) / totalYield;
}

export function getGreenhouseBaseCostCoins(name) {
  const d = BASE_GREENHOUSE[name];
  if (!d) return 0;
  const oilQty = d.oilQty || 0;
  const oilCoinCost = oilQty * getItemCostByName("Oil");
  return ((d.seedCost || 0) + oilCoinCost) / (d.baseYield || 1);
}

export function computeHoneyBaseCostCoins() {
  const v = FLOWER_VARIETIES[selectedHoneyFlower];
  if (!v) return 0;
  const seedData = FLOWER_SEEDS[v.seed];
  const flowerCostCoins = getFlowerVarietyCostCoins(selectedHoneyFlower);
  const flowerCostFlowerBase = coinsToFlower(flowerCostCoins);
  const replantsPerDayBase = 86400 / seedData.timeSec;
  const costPerHiveDayBase = replantsPerDayBase * flowerCostFlowerBase;
  const honeyPerHiveDayBase = 1 * 1;
  return honeyPerHiveDayBase > 0 ? costPerHiveDayBase / honeyPerHiveDayBase * coinPerFlower : 0;
}

export function renderBaseCostPriceBlock(baseCoins, boostedCoins, hasBoost) {
  const priceFlower = coinsToFlower(boostedCoins);
  const showBase = hasBoost && Math.abs((baseCoins || 0) - boostedCoins) > 1e-6;
  return `<div class="lib-item-price" title="${hasBoost ? "Base cost with boosts applied" : "Base cost (from game defaults)"}">${showBase ? `<span style="text-decoration:line-through;opacity:.5;font-size:.8em;">${fmt(baseCoins)}${COIN_ICON}</span> ` : ""}${fmt(boostedCoins)}${COIN_ICON}<small>${fmt(priceFlower)} ${FLOWER_ICON}</small></div>`;
}

let marketActiveTab = "resources";

export function renderMarketList() {
  const wrap = $("marketItemList");
  invalidateCostCache();
  const tabItems = marketItems.filter(m => marketActiveTab === "nft" ? !!m.isNftCollectible : marketActiveTab === "wearables" ? !!m.isWearable : !m.isNftCollectible && !m.isWearable);
  wrap.innerHTML = tabItems.length ? tabItems.map(renderMarketRow).join("") : marketActiveTab === "nft" ? `<div class="lib-empty">No Collectibles yet.</div>` : marketActiveTab === "wearables" ? `<div class="lib-empty">No Wearables items yet.</div>` : `<div class="lib-empty">No items yet — add a seed, tool, or animal above and it'll show up here.</div>`;
  wrap.querySelectorAll(".market-price-tap").forEach(el => el.onclick = () => openMarketPriceEdit(el.dataset.id));
  applyMarketSearchFilter();
}

function renderMarketRow(m) {
  const isLive = findLivePriceForItem(m) != null;
  const liveTag = isLive ? " · 🔄 live" : "";
  let meta;
  if (BASE_CROPS[m.name]) meta = "🌾 Crop" + liveTag; else if (BASE_FRUITS[m.name]) meta = "🍎 Fruit" + liveTag; else if (BASE_GREENHOUSE[m.name]) meta = "🌿 Greenhouse" + liveTag; else if (m.name === "Honey") meta = "🍯 Honey" + liveTag; else if (m.isAutoAnimal) meta = "🐄 Animal produce" + liveTag; else if (m.isNftCollectible) meta = "💎 Collectible" + liveTag; else if (m.isWearable) meta = "👑 Wearable" + liveTag; else if (m.isPetResource || String(m.id || "").indexOf("petres_") === 0) meta = "🐾 Pet fetch resource" + liveTag; else {
    const tool = toolRecipes.find(t => (t.producesName || "").toLowerCase() === (m.name || "").toLowerCase());
    meta = tool ? `From "${escapeHtml(tool.name)}"${liveTag}` : isLive ? "🔄 live" : "";
  }
  const priceBadge = priceSourceBadgeHtml(getLivePriceSourceForItem(m));
  return `\n  <div class="lib-item-row" data-search="${escapeHtml((m.name || "").toLowerCase())}">\n    <span class="lib-item-icon">${getIcon(m.name)}</span>\n    <div class="lib-item-main">\n      <div class="lib-item-name">${escapeHtml(m.name)}</div>\n      <div class="lib-item-meta">${meta}</div>\n    </div>\n    <div class="lib-item-price is-flower${isLive ? " is-live" : ""} market-price-tap" data-id="${m.id}" title="Tap to edit price">${priceBadge}<span class="lib-item-price-inline">${fmtFlowerPrice(m.flowerPrice || 0)} ${FLOWER_ICON}</span></div>\n  </div>`;
}

export function renderMedicineCostDisplay() {
  const el = $("medicineCostDisplay");
  if (!el) return;
  const baseFlower = computeMedicineCostFlower();
  const {cureFree: cureFree, cureCostMult: cureCostMult} = getGlobalCureModifiers();
  const boosted = cureFree ? 0 : baseFlower * cureCostMult;
  const boostNote = cureFree ? `<div style="font-size:10.8px;color:var(--profit);margin-top:2px;">🆓 Oracle Syringe active — cures are free</div>` : cureCostMult !== 1 ? `<div style="font-size:10.8px;color:var(--profit);margin-top:2px;">⚡ Medic Apron active — ×${fmt(cureCostMult)} cure cost</div>` : "";
  el.innerHTML = `\n    <div style="background:rgba(255,255,255,0.35);border:1.25px solid var(--line);border-radius:8px;padding:7px 9px;">\n      <div style="display:flex;justify-content:space-between;align-items:baseline;">\n        <span style="font-size:11.4px;color:var(--ink);">${getIcon("Barn Delight")} Barn Delight cost (auto)</span>\n        <span style="font-family:'JetBrains Mono',monospace;font-size:13.8px;font-weight:700;color:var(--ink);">${fmt(boosted)} ${FLOWER_ICON}</span>\n      </div>\n      ${boostNote}\n    </div>`;
}

export function bettyMarketPrice(name) {
  const live = findLivePriceForName(name);
  if (live != null && live > 0) return live;
  const base = BASE_CROPS[name] || BASE_FRUITS[name] || BASE_GREENHOUSE[name];
  return base && base.marketPrice ? base.marketPrice : 0;
}

export function tradeMarketPrice(name) {
  const m = marketItems.find(x => (x.name || "").toLowerCase() === (name || "").toLowerCase());
  return m ? m.flowerPrice || 0 : 0;
}

export let npcFlowerCost = safeParse(localStorage.getItem("hl_ticket_v2_npc_flower"), {});

export let animalFlowerCost = parseFloat(localStorage.getItem("hl_ticket_v2_animal_flower")) || 0;

export let bountyFlowerCost = parseFloat(localStorage.getItem("hl_ticket_v2_bounty_flower")) || 0;

export let choresFlowerCost = parseFloat(localStorage.getItem("hl_ticket_v2_chores_flower")) || 0;

let gunterFlowerCostMode = localStorage.getItem("hl_gunter_flower_cost_mode") === "collect" ? "collect" : "buy";

let gunterFlowerCostNoteOpen = false;

export function gunterBuyCost(node, count, alreadyBought) {
  return node.price + (alreadyBought + count - 1) * node.increase;
}

export function gunterBuyTotalCost(node, count, alreadyBought) {
  let total = 0;
  for (let i = 1; i <= count; i++) {
    total += node.price + (alreadyBought + i - 1) * node.increase;
  }
  return total;
}

function gunterObsidianUnitFlowerCost(mode) {
  mode = mode || gunterFlowerCostMode;
  return typeof getShrineIngredientPrice === "function" ? getShrineIngredientPrice("Obsidian", mode) : 0;
}

function gunterUpgradeNodeFlowerCost(nodeName, visited) {
  visited = visited || new Set;
  if (visited.has(nodeName)) return 0;
  visited.add(nodeName);
  const node = GUNTER_UPGRADE_NODES.find(n => n.name === nodeName);
  if (!node) return 0;
  const obsidianUnit = gunterObsidianUnitFlowerCost(gunterFlowerCostMode);
  const obsidianFlower = node.obsidian * obsidianUnit;
  const coinsFlower = typeof coinsToFlower === "function" ? coinsToFlower(node.coins) : 0;
  const requiredUpgrade = GUNTER_UPGRADE_NODES.find(n => n.name === node.node);
  const requiredNodeFlower = requiredUpgrade ? gunterUpgradeNodeFlowerCost(requiredUpgrade.name, visited) * node.nodeCount : 0;
  return obsidianFlower + coinsFlower + requiredNodeFlower;
}

function gunterFlowerCostForSelectedUpgrade() {
  const node = GUNTER_UPGRADE_NODES.find(n => n.name === gunterSelectedUpgrade);
  if (!node) return 0;
  const count = gunterUpgradeCounts[node.name] || 1;
  return gunterUpgradeNodeFlowerCost(node.name) * count;
}

export function gunterRenderFlowerCost() {
  const valueEl = $("gunterFlowerCostValue");
  const noteEl = $("gunterFlowerCostNote");
  const noteToggleEl = $("gunterFlowerCostNoteToggle");
  if (valueEl) valueEl.innerHTML = `${fmt(gunterFlowerCostForSelectedUpgrade())} ${FLOWER_ICON}`;
  document.querySelectorAll(".gunter-fc-mode-btn").forEach(btn => {
    btn.classList.toggle("active", btn.dataset.gunterFcMode === gunterFlowerCostMode);
  });
  if (noteEl) {
    noteEl.style.display = gunterFlowerCostNoteOpen ? "block" : "none";
    noteEl.textContent = gunterFlowerCostMode === "buy" ? "Obsidian priced at the live Marketplace rate; Coins converted to FLOWER at your set rate; required upgrade nodes are costed the same way and added in." : "Obsidian priced at what it costs you to craft; Coins converted to FLOWER at your set rate; required upgrade nodes are costed the same way and added in.";
  }
  if (noteToggleEl) {
    noteToggleEl.innerHTML = `What's this? <span class="gunter-fc-note-chev${gunterFlowerCostNoteOpen ? " is-open" : ""}">${gunterFlowerCostNoteOpen ? "▴" : "▾"}</span>`;
  }
}

export function esSwampCostBase(start, end, e) {
  return start + (end - start) * Math.pow((e - 1) / (ES_SWAMP_EXPANSIONS_PER_ASCENSION - 1), 1.3);
}

export function esComputeAscensionUpgradeCostGeneric(ascLevel) {
  const exp = ascLevel - 1;
  const numer = esBigIntPow(14, exp);
  const denom = esBigIntPow(10, exp);
  const floorItem = baseInt => Number(esBigFloorDiv(BigInt(baseInt) * numer, denom));
  return {
    resources: {
      Crimstone: floorItem(ES_ASCENSION_UPGRADE_BASE_ITEMS.Crimstone),
      Oil: floorItem(ES_ASCENSION_UPGRADE_BASE_ITEMS.Oil),
      Obsidian: floorItem(ES_ASCENSION_UPGRADE_BASE_ITEMS.Obsidian)
    },
    coins: floorItem(ES_ASCENSION_UPGRADE_BASE_COINS),
    seconds: 0,
    bumpkinLevel: ascLevel === 1 ? {
      ascension: 0,
      level: 150
    } : {
      ascension: ascLevel - 1,
      level: 50
    }
  };
}

export function esGetIslandUpgradeCost(toIsland) {
  return ES_ISLAND_UPGRADE_COST[toIsland] || null;
}

export function esResourceFlowerCost(name, qty) {
  if (!qty || qty <= 0) return 0;
  const cpf = typeof coinPerFlower === "number" && coinPerFlower > 0 ? coinPerFlower : 1;
  return esReqUnitCoins(name, qty) / cpf * qty;
}

const gunterFlowerCostModeRowEl = $("gunterFlowerCostModeRow");

if (gunterFlowerCostModeRowEl) {
  gunterFlowerCostModeRowEl.addEventListener("click", e => {
    const btn = e.target.closest(".gunter-fc-mode-btn");
    if (!btn) return;
    gunterFlowerCostMode = btn.dataset.gunterFcMode === "collect" ? "collect" : "buy";
    localStorage.setItem(GUNTER_FLOWER_COST_MODE_LS_KEY, gunterFlowerCostMode);
    gunterRenderFlowerCost();
  });
}

const gunterFlowerCostNoteToggleEl = $("gunterFlowerCostNoteToggle");

if (gunterFlowerCostNoteToggleEl) {
  gunterFlowerCostNoteToggleEl.addEventListener("click", () => {
    gunterFlowerCostNoteOpen = !gunterFlowerCostNoteOpen;
    gunterRenderFlowerCost();
  });
}

export function applyMarketSearchFilter() {
  const term = normalizeSearch($("marketSearchInput").value);
  $("marketItemList").querySelectorAll(".lib-item-row").forEach(row => {
    const hay = row.dataset.search || "";
    row.style.display = !term || hay.includes(term) ? "" : "none";
  });
}

export function openPriceEdit(id) {
  const item = findTool(id);
  if (!item) return;
  if (item.locked) {
    toast("This is a built-in tool's base cost and can't be edited 🔒");
    return;
  }
  priceEditTargetId = id;
  $("priceEditSub").textContent = `Price per unit of "${item.producesName || item.name}"`;
  $("priceEditInput").value = getToolCostCoins(id).toFixed(2);
  $("priceResetBtn").style.display = "block";
  $("priceEditOverlay").classList.add("show");
}

export function openMarketPriceEdit(id) {
  if (id === "budFloor" || id === "petFloor") {
    marketPriceEditId = id;
    const label = id === "budFloor" ? "Bud" : "Pet";
    $("marketPriceEditSub").textContent = `Cheapest currently-listed ${label} NFT price in the game's own Marketplace — applied to every ${label} NFT you own`;
    const currentFloor = id === "budFloor" ? budFloorPrice : petFloorPrice;
    $("marketPriceInput").value = currentFloor != null ? currentFloor : "";
    $("marketPriceEditOverlay").classList.add("show");
    return;
  }
  if (String(id).indexOf("petcost_") === 0) {
    const name = PET_COST_TRACK_RESOURCES.find(n => "petcost_" + n.replace(/\s+/g, "_").toLowerCase() === String(id));
    if (!name) return;
    marketPriceEditId = id;
    $("marketPriceEditSub").textContent = `Cost per unit to fetch "${name}" (override — leave blank to go back to auto)`;
    $("marketPriceInput").value = petResourceCostPerUnit(name);
    $("marketPriceEditOverlay").classList.add("show");
    return;
  }
  const m = marketItems.find(x => String(x.id) === String(id));
  if (!m) return;
  marketPriceEditId = id;
  $("marketPriceEditSub").textContent = `Price per unit of "${m.name}"`;
  $("marketPriceInput").value = m.flowerPrice || 0;
  $("marketPriceEditOverlay").classList.add("show");
}

export function computeCalcShrineCost(name, totalYield) {
  if (!name || !totalYield) return {
    cost: 0,
    names: []
  };
  const boosted = typeof farmPanelGetBoostedYieldStats === "function" ? farmPanelGetBoostedYieldStats(name) : null;
  if (!boosted || !boosted.activeBoosts || !boosted.activeBoosts.length) return {
    cost: 0,
    names: []
  };
  const shrineInfo = typeof getActiveShrineDailyCost === "function" ? getActiveShrineDailyCost(boosted.activeBoosts) : null;
  if (!shrineInfo || !(shrineInfo.total > 0)) return {
    cost: 0,
    names: []
  };
  const shrineCost24h = shrineInfo.total;
  const cycleTimeSec = boosted.timeVal || (typeof farmPanelGrowTimeSec === "function" ? farmPanelGrowTimeSec(name) : 0);
  const cyclesPerDay = cycleTimeSec > 0 ? 86400 / cycleTimeSec : 0;
  const count = getGenericPlotOrNodeCount(name);
  const yieldVal = boosted.yieldVal || 0;
  const unitsPerDay = yieldVal * count * cyclesPerDay;
  const names = shrineInfo.shrines.map(x => x.name);
  if (!(unitsPerDay > 0)) return {
    cost: 0,
    names: names
  };
  return {
    cost: shrineCost24h * (totalYield / unitsPerDay),
    names: names
  };
}

export function computeFarmLevelNextCost() {
  const step = FARM_LEVELS[saltFarmLevel - 1];
  if (!step) return null;
  const lines = [];
  let total = 0;
  const add = (label, qty, flowerEach) => {
    const f = flowerEach * qty;
    total += f;
    lines.push({
      label: label,
      qty: qty,
      flower: f
    });
  };
  if (step.coins) add("Coins", step.coins, coinsToFlower(1));
  if (step.wood) add("Wood", step.wood, coinsToFlower(getItemCostByName("Wood")));
  if (step.stone) add("Stone", step.stone, coinsToFlower(getItemCostByName("Stone")));
  if (step.iron) add("Iron", step.iron, coinsToFlower(getItemCostByName("Iron")));
  if (step.gold) add("Gold", step.gold, coinsToFlower(getItemCostByName("Gold")));
  if (step.salt) add("Salt", step.salt, saltUnitCostFlower());
  return {
    total: total,
    lines: lines
  };
}

export function computeSaltUnitCostCoins() {
  return computeSaltFarmFigures().costPerUnitCoins;
}

function saltUnitCostFlower() {
  return computeSaltFarmFigures().costPerUnitFlower;
}

export function refinedSaltUnitCostFlower() {
  return computeSpiceFigures("Refined Salt").unitCost;
}

export function saltCostFlowerForSpiceRack() {
  const mode = spiceMaterialMode("Salt");
  return coinsToFlower(getMaterialUnitCostCoins("Salt", mode));
}

export function honeyCostFlowerForSpiceRack() {
  const mode = spiceMaterialMode("Honey");
  return coinsToFlower(getMaterialUnitCostCoins("Honey", mode));
}

export function pickledVegSaltCostFlower() {
  const mode = vegMaterialMode("Salt");
  return coinsToFlower(getMaterialUnitCostCoins("Salt", mode));
}

export function pickledVegCost(veg) {
  const rec = PICKLED_VEG_DATA[veg];
  if (!rec) return null;
  const cropMode = vegMaterialMode(veg);
  const cropCostFlower = coinsToFlower(getMaterialUnitCostCoins(veg, cropMode));
  const saltCostFlower = pickledVegSaltCostFlower();
  const recipeCost = cropCostFlower * rec.qty + saltCostFlower * rec.salt;
  const astrolabeMult = typeof getActiveFermentationSpiceExpectedMult === "function" ? getActiveFermentationSpiceExpectedMult() : 1;
  const output = astrolabeMult;
  const cost = recipeCost / output;
  return {
    veg: veg,
    cost: cost,
    recipeCost: recipeCost,
    output: output,
    cropCostFlower: cropCostFlower,
    saltCostFlower: saltCostFlower,
    cropMode: cropMode,
    rec: rec,
    activeBoosts: typeof getActiveSaltBoosts === "function" ? getActiveSaltBoosts([ "fermentationSpiceGlobal" ]) : []
  };
}

export function fishSaltCostFlower(fish) {
  const agingSaltCostMult = typeof getActiveAgingSaltCostMult === "function" ? getActiveAgingSaltCostMult() : 1;
  const saltCost = fish.salt * saltUnitCostFlower() * agingSaltCostMult;
  let fishOwnCostFlower = 0;
  if (typeof FISH_CATCH_DATA !== "undefined") {
    const matchName = Object.keys(FISH_CATCH_DATA).find(n => n.toLowerCase() === (fish.name || "").toLowerCase());
    if (matchName && typeof fishEffectiveBasicCostCoins === "function") {
      fishOwnCostFlower = coinsToFlower(fishEffectiveBasicCostCoins(matchName));
    }
  }
  return saltCost + fishOwnCostFlower;
}

export function computeSculptureNextCost() {
  const step = SCULPTURE_LEVELS[saltSculptureLevel];
  if (!step) return null;
  const lines = [];
  let total = 0;
  const add = (label, qty, flowerEach) => {
    const f = flowerEach * qty;
    total += f;
    lines.push({
      label: label,
      qty: qty,
      flower: f
    });
  };
  if (step.coins) add("Coins", step.coins, coinsToFlower(1));
  if (step.refinedSalt) add("Refined Salt", step.refinedSalt, refinedSaltUnitCostFlower());
  if (step.capsuleBait) add("Capsule Bait", step.capsuleBait, computeBaitFigures("Capsule Bait").unitCostExpected);
  if (step.umbrellaBait) add("Umbrella Bait", step.umbrellaBait, computeBaitFigures("Umbrella Bait").unitCostExpected);
  if (step.crimsonBaitfish) add("Crimson Baitfish", step.crimsonBaitfish, computeBaitFigures("Crimson Baitfish").unitCostExpected);
  if (step.greenhouseGlow) add("Greenhouse Glow", step.greenhouseGlow, computeFertilizerFigures("Greenhouse Glow").unitCost);
  if (step.greenhouseGoodie) add("Greenhouse Goodie", step.greenhouseGoodie, computeFertilizerFigures("Greenhouse Goodie").unitCost);
  if (step.sproutrootSurprise) add("Sproutroot Surprise", step.sproutrootSurprise, computeFertilizerFigures("Sproutroot Surprise").unitCost);
  if (step.turbofruitMix) add("Turbofruit Mix", step.turbofruitMix, computeFertilizerFigures("Turbofruit Mix").unitCost);
  return {
    total: total,
    lines: lines
  };
}

export let cookingCostMode = localStorage.getItem("hl_cooking_cost_mode") || "buy";

export function setCookingCostMode(mode) {
  cookingCostMode = mode === "buy" ? "buy" : "collect";
  localStorage.setItem("hl_cooking_cost_mode", cookingCostMode);
}

export function cookingIngredientUnitCostCoins(name, mode, visited) {
  const memoKey = mode + "|" + name;
  if (__cookingCostMemo.has(memoKey)) return __cookingCostMemo.get(memoKey);
  if (visited && visited.has(memoKey)) return 0;
  const branchVisited = new Set(visited || []);
  branchVisited.add(memoKey);
  const result = cookingIngredientUnitCostCoinsUncached(name, mode, branchVisited);
  __cookingCostMemo.set(memoKey, result);
  return result;
}

function cookingIngredientUnitCostCoinsUncached(name, mode, visited) {
  visited = visited || new Set;
  for (const b of COOKING_BUILDINGS) {
    const rec = COOKING_RECIPES[b] && COOKING_RECIPES[b][name];
    if (rec) {
      const key = "cook:" + name;
      if (visited.has(key)) return 0;
      const branchVisited = new Set(visited);
      branchVisited.add(key);
      let sum = 0;
      Object.keys(rec.ingredients).forEach(ing => {
        sum += rec.ingredients[ing] * cookingIngredientUnitCostCoins(ing, mode, new Set(branchVisited));
      });
      return sum;
    }
  }
  if (typeof getMaterialUnitCostCoins === "function") return getMaterialUnitCostCoins(name, mode, visited);
  return 0;
}

let fishingCostMode = localStorage.getItem("hl_fishing_cost_mode") || "collect";

export function isFishingBuyMode() {
  return fishingCostMode === "buy";
}

function setFishingCostMode(mode) {
  fishingCostMode = mode === "buy" ? "buy" : "collect";
  localStorage.setItem("hl_fishing_cost_mode", fishingCostMode);
  invalidateCostCache();
}

function fishingMaterialIsFreeCost(name) {
  if (BASE_CROPS[name]) return hasFreeCostBoost(name);
  if (BASE_FRUITS[name]) return hasFreeCostBoostFruit(name);
  if (BASE_GREENHOUSE[name]) return hasFreeCostBoostGreenhouse(name);
  return false;
}

function fishingMaterialUnitCostCoins(name, visited) {
  if (fishingCostMode === "buy") return getMaterialUnitCostCoins(name, "buy", visited);
  const collectCost = getMaterialUnitCostCoins(name, "collect", visited);
  if (collectCost > 0) return collectCost;
  if (fishingMaterialIsFreeCost(name)) return 0;
  return getMaterialUnitCostCoins(name, "buy", visited);
}

export function fishRodCostCoins() {
  if (typeof fishingRodIsFree === "function" && fishingRodIsFree()) return 0;
  let cost = typeof getToolCostCoins === "function" ? getToolCostCoins("default_rod") : 0;
  return cost;
}

export function fishChumUnitCostCoins(chumName, visited) {
  visited = visited || new Set;
  const key = "chum:" + chumName;
  if (visited.has(key)) return 0;
  visited.add(key);
  return fishingMaterialUnitCostCoins(chumName, visited);
}

export function getAgingSaltCostLocal(baseXP) {
  return Math.round(getAgingMaxXPLocal(baseXP) / 50);
}

export function fishEffectiveBasicCostCoins(fishName, mode) {
  if (typeof cookingGuaranteedCatchOn !== "undefined" && cookingGuaranteedCatchOn) {
    const item = fishMarketItemForFish(fishName);
    if (item) {
      const itemCostCoins = fishMarketItemCostCoins(item, mode || "collect", previewSeason);
      const d = FISH_CATCH_DATA[fishName];
      const yieldMult = d ? fishCatchYieldMult(d.tier) : 1;
      return yieldMult > 0 ? itemCostCoins / yieldMult : itemCostCoins;
    }
  }
  if (mode === "buy") return getMaterialUnitCostCoins(fishName, "buy");
  const bf = computeBasicFishFigures(fishName, mode);
  return bf ? bf.costCoins : 0;
}

export function fishMarketItemForFish(fishName) {
  return Object.keys(FISH_MARKET_GUARANTEED_CATCH).find(item => FISH_MARKET_GUARANTEED_CATCH[item].includes(fishName)) || null;
}

export function fishCatchStageCostCoins(fishName, stage, mode) {
  if (stage === "basic") return fishEffectiveBasicCostCoins(fishName, mode);
  const af = computeAgedFishFigures(fishName, mode);
  return af ? af.costCoins : 0;
}

function getFishMarketMeta(item) {
  const base = FISH_MARKET_META_DEFAULTS[item];
  if (!base) return base;
  const yieldMult = typeof fishMarketYieldMultBoost === "function" ? fishMarketYieldMultBoost() : 1;
  const timeMult = typeof fishMarketTimeMultBoost === "function" ? fishMarketTimeMultBoost() : 1;
  return {
    yield: base.yield * yieldMult,
    hours: base.hours * timeMult,
    baseYield: base.yield,
    baseHours: base.hours,
    yieldMult: yieldMult,
    timeMult: timeMult
  };
}

const fishMarketMode = "collect";

let fishMarketMainTab = localStorage.getItem("hl_fishmarket_main_tab") || "market";

function setFishMarketMainTab(tab) {
  fishMarketMainTab = tab === "crustaceans" ? "crustaceans" : "market";
  localStorage.setItem("hl_fishmarket_main_tab", fishMarketMainTab);
}

export let fishMarketGuaranteedTab = localStorage.getItem("hl_fishmarket_guaranteed_tab") || "Fish Flake";

export function setFishMarketGuaranteedTab(item) {
  fishMarketGuaranteedTab = FISH_MARKET_ITEM_NAMES.includes(item) ? item : "Fish Flake";
  localStorage.setItem("hl_fishmarket_guaranteed_tab", fishMarketGuaranteedTab);
}

let fishMarketExpandedItems = new Set;

function fishMarketItemIngredients(itemName, season) {
  const recipes = FISH_MARKET_SEASON_RECIPES[itemName];
  if (!recipes) return [];
  return recipes[season] || recipes.Spring || [];
}

export function fishMarketItemCostCoins(itemName, mode, season, visited) {
  const ingredients = fishMarketItemIngredients(itemName, season);
  let total = 0;
  ingredients.forEach(([name, qty]) => {
    total += qty * getMaterialUnitCostCoins(name, mode, visited ? new Set(visited) : visited);
  });
  return total;
}

export function fishMarketPanelCostCoins(itemName, season) {
  return fishMarketItemCostCoins(itemName, fishMarketMode, season);
}

export function renderFishMarketMainTabs() {
  const wrap = $("fishMarketMainTabs");
  if (!wrap) return;
  wrap.querySelectorAll("button").forEach(btn => {
    btn.classList.toggle("active", btn.dataset.fmTab === fishMarketMainTab);
    btn.onclick = () => {
      setFishMarketMainTab(btn.dataset.fmTab);
      renderFishMarketMainTabs();
      renderFishMarketCardsList();
    };
  });
  const cardsList = $("fishMarketCardsList");
  const crustWrap = $("fishCrustaceansWrap");
  if (cardsList) cardsList.style.display = fishMarketMainTab === "market" ? "" : "none";
  if (crustWrap) crustWrap.style.display = fishMarketMainTab === "crustaceans" ? "" : "none";
}

function renderFishMarketItemCard(itemName) {
  const season = previewSeason;
  const ingredients = fishMarketItemIngredients(itemName, season);
  const isExpanded = fishMarketExpandedItems.has(itemName);
  let totalCoins = 0;
  const rows = ingredients.map(([name, qty]) => {
    const unit = getMaterialUnitCostCoins(name, fishMarketMode);
    const lineCoins = unit * qty;
    totalCoins += lineCoins;
    return `<div class="cook-ingredient-row"><span>${getIcon(name)}</span><span class="ing-name">${escapeHtml(name)} ×${qty}</span><span class="ing-cost">${fmt(coinsToFlower(lineCoins))}${FLOWER_ICON}</span></div>`;
  }).join("");
  const meta = getFishMarketMeta(itemName);
  const totalFlower = coinsToFlower(fishMarketPanelCostCoins(itemName, season));
  const p2pNote = itemName === "Crab Stick" ? `<div class="fishmarket-p2p-note">Reference market price this season: ${fmt(FISH_MARKET_CRAB_STICK_P2P_REF[season] || 0)} (P2P)</div>` : ``;
  return `\n  <div class="cook-food-card fishmarket-card${isExpanded ? " expanded" : ""}" data-fm-item="${escapeHtml(itemName)}">\n    <div class="cook-food-toggle">\n      <span class="cook-food-icon">${getIcon(itemName)}</span>\n      <div class="cook-food-main">\n        <div class="cook-food-name">${escapeHtml(itemName)}</div>\n        <div class="cook-food-exp">${fmt(totalFlower)} ${FLOWER_ICON} total · ${escapeHtml(season)}</div>\n      </div>\n      <span class="cook-food-chev">▾</span>\n    </div>\n    <div class="cook-food-details">\n      <div class="cook-food-cost-line">Recipe — ${escapeHtml(season)}</div>\n      ${rows}\n      ${p2pNote}\n      <div class="fishmarket-meta-row">\n        <span>Yield: <b>${fmt(meta.yield)}</b></span>\n        <span>Time: <b>${fmt(meta.hours)}h</b></span>\n      </div>\n      <div style="font-size:9px;color:var(--ink-soft);margin-top:2px;">${meta.yieldMult !== 1 || meta.timeMult !== 1 ? `Base ${fmt(meta.baseYield)} yield / ${fmt(meta.baseHours)}h — boosted to ${fmt(meta.yield)} yield / ${fmt(meta.hours)}h (🎣 Fishing boosts applied).` : `Base yield/time shown above — turn on 🎣 Fishing boosts (e.g. Bubble Aura) to see them applied here.`}</div>\n    </div>\n  </div>`;
}

export function renderFishMarketCardsList() {
  const wrap = $("fishMarketCardsList");
  if (!wrap) return;
  wrap.innerHTML = FISH_MARKET_ITEM_NAMES.map(it => renderFishMarketItemCard(it)).join("");
  wrap.querySelectorAll(".cook-food-toggle").forEach(el => {
    el.onclick = () => {
      const card = el.closest(".cook-food-card");
      const name = card.dataset.fmItem;
      if (fishMarketExpandedItems.has(name)) fishMarketExpandedItems.delete(name); else fishMarketExpandedItems.add(name);
      card.classList.toggle("expanded");
    };
  });
}

export function renderFishMarketSeasonToggle() {
  const wrap = $("fishMarketSeasonToggle");
  if (!wrap) return;
  wrap.querySelectorAll("button").forEach(btn => {
    btn.classList.toggle("active", btn.dataset.season === previewSeason);
    btn.onclick = () => setPreviewSeason(btn.dataset.season);
  });
  const note = $("fishMarketSeasonToggleNote");
  if (note) {
    note.textContent = previewSeason === currentSeason ? `📅 This week's real season: ${currentSeason}` : `👀 Previewing ${previewSeason} — real season is ${currentSeason} (resets on refresh)`;
  }
}

export function fishRodFreeCostLabel() {
  const freeBoosts = fishingBoostsActiveByScope("fishRod").filter(b => b.rodFreeCost);
  if (!freeBoosts.length) return "🆓 Free";
  return `🆓 Free — ${freeBoosts.map(b => `${getBoostIcon(b.name)}${escapeHtml(b.name)}`).join(", ")}`;
}

export function crustaceanTrapFreeCostLabel() {
  const freeBoosts = fishingBoostsActiveByScope("crustacean").filter(b => b.crustaceanTrapFreeCost);
  if (!freeBoosts.length) return "🆓 Free";
  return `🆓 Free — ${freeBoosts.map(b => `${getBoostIcon(b.name)}${escapeHtml(b.name)}`).join(", ")}`;
}

function fishMarketTimeMultBoost() {
  let mult = 1;
  fishingBoostsActiveByScope("fishMarket").forEach(b => {
    if (b.fishMarketTimeMult) mult *= b.fishMarketTimeMult;
  });
  return mult;
}

function fishMarketYieldMultBoost() {
  let mult = 1;
  fishingBoostsActiveByScope("fishMarket").forEach(b => {
    mult += b.fishMarketYieldAdd || 0;
  });
  return mult;
}

export function crustaceanTrapCostCoins(trapType, visited) {
  if (crustaceanTrapIsFree()) return 0;
  return getToolCostCoins(CRUSTACEAN_TRAP_TOOL_ID[trapType], visited);
}

function crustaceanChumUnitCostCoins(chumName, visited) {
  if (FISH_MARKET_ITEM_NAMES.includes(chumName)) return fishMarketItemCostCoins(chumName, "collect", previewSeason);
  if (typeof PET_TRADABLE_RESOURCES !== "undefined" && PET_TRADABLE_RESOURCES.includes(chumName)) {
    let flowerCost = 0;
    if (typeof petResourceCostOverride !== "undefined" && Object.prototype.hasOwnProperty.call(petResourceCostOverride, chumName)) {
      flowerCost = petResourceCostOverride[chumName];
    } else {
      const auto = typeof petResourceAutoCostPerUnit === "function" ? petResourceAutoCostPerUnit(chumName) : null;
      flowerCost = auto != null ? auto : typeof getPetResourceMarket === "function" ? getPetResourceMarket(chumName) : 0;
    }
    return flowerCost * coinPerFlower;
  }
  return fishingMaterialUnitCostCoins(chumName, visited);
}

export function crustaceanOptionCosts(name, visited) {
  const d = CRUSTACEAN_CATCH_DATA[name];
  if (!d) return [];
  if (!d.options.length) return [ {
    chum: null,
    qty: 0,
    unit: 0,
    cost: 0
  } ];
  return d.options.map(o => {
    const unit = crustaceanChumUnitCostCoins(o.chum, visited);
    return {
      chum: o.chum,
      qty: o.qty,
      unit: unit,
      cost: unit * o.qty
    };
  });
}

export function renderFishingCostModeToggle() {
  const wrap = $("fishingCostModeToggle");
  if (wrap) {
    wrap.querySelectorAll("button").forEach(btn => {
      btn.classList.toggle("active", btn.dataset.mode === fishingCostMode);
      btn.onclick = () => {
        setFishingCostMode(btn.dataset.mode);
        renderFishingPanel();
      };
    });
  }
  const note = $("fishingCostModeNote");
  if (note) {
    note.textContent = fishingCostMode === "buy" ? "🛒 Buy — tradable Chum for Basic Fish and Crustaceans is priced at Marketplace rate." : "🧺 Collect — Chum priced from your production chain; falls back to Marketplace price for anything not modeled yet.";
  }
}

export function getPetResourceMarket(name) {
  if (PET_NOT_TRADABLE.has(name)) return 0;
  if (typeof marketItems !== "undefined") {
    const m = marketItems.find(x => x.name === name);
    if (m) return m.flowerPrice || 0;
  }
  return PET_RESOURCE_DEFAULT_MARKET[name] || 0;
}

export let petResourceCostOverride = safeLSJSON(localStorage.getItem("hl_pet_resource_cost_override"), {});

export let budFloorPrice = safeLSJSON(localStorage.getItem("hl_bud_floor_price"), null);

export let petFloorPrice = safeLSJSON(localStorage.getItem("hl_pet_floor_price"), null);

function petResourceAutoCostPerUnit(name) {
  if (typeof petsData === "undefined" || !petsData.length || typeof petComputeCardCached !== "function") return null;
  let total = 0, count = 0;
  petsData.forEach(pet => {
    const calc = petComputeCardCached(pet);
    const row = calc.rows.find(r => r.name === name && r.totalYield > 0);
    if (row) {
      total += row.costPerUnit;
      count++;
    }
  });
  return count ? total / count : null;
}

export function petResourceCostPerUnit(name) {
  if (Object.prototype.hasOwnProperty.call(petResourceCostOverride, name)) return petResourceCostOverride[name];
  const auto = petResourceAutoCostPerUnit(name);
  return auto != null ? auto : 0;
}

export function petFoodCostCoins(name) {
  if (typeof cookingIngredientUnitCostCoins === "function") {
    try {
      return cookingIngredientUnitCostCoins(name, typeof cookingCostMode !== "undefined" ? cookingCostMode : "collect") || 0;
    } catch (e) {
      return 0;
    }
  }
  return 0;
}

function petAvgFoodCostForDifficulty(difficulty) {
  const foods = (PET_FOOD_LISTS[difficulty] || []).filter(isPetFoodChecked);
  if (!foods.length) return 0;
  const total = foods.reduce((s, f) => s + petFoodCostCoins(f), 0);
  return total / foods.length;
}

export function petDailyFoodCostFlower(pet) {
  if (petBoostActiveWithField("petFreeFeed")) return 0;
  let coins = 0;
  [ "easy", "medium", "hard" ].forEach(d => {
    coins += petAvgFoodCostForDifficulty(d);
  });
  return coinsToFlower(coins);
}

export function isSflThemeOn() {
  return localStorage.getItem("hl_app_dark_mode") !== "1";
}

export function refreshSflThemeClass() {
  const shouldApply = isSflThemeOn();
  document.body.classList.toggle("sfl-theme", shouldApply);
  syncSflSearchPlaceholders();
}

function syncSflSearchPlaceholders() {
  const on = document.body.classList.contains("sfl-theme");
  const ids = [ "marketSearchInput", "librarySearchInput", "boostSearchInput", "pickerSearchInput", "tradeItemSearchInput" ];
  ids.forEach(id => {
    const el = $(id);
    if (!el) return;
    const ph = el.getAttribute("placeholder") || "";
    if (on && ph.indexOf("🔍 ") === 0) {
      el.setAttribute("placeholder", ph.slice(2));
    } else if (!on && ph.indexOf("🔍 ") !== 0) {
      el.setAttribute("placeholder", "🔍 " + ph);
    }
  });
}

export function setSflTheme(on) {
  setAppDarkMode(!on);
}

(function initSflThemeFeature() {
  const fab = $("sflThemeToggleFab");
  if (fab) fab.onclick = () => setSflTheme(true);
  refreshSflThemeClass();
})();

export const SFL_EXCHANGE_API = SFL_PROXY_BASE + "/api/v1.1/exchange";

export function __set_marketItems(v) {
  return marketItems = v;
}

export function __set_marketActiveTab(v) {
  return marketActiveTab = v;
}

export function __set_animalFlowerCost(v) {
  return animalFlowerCost = v;
}

export function __set_bountyFlowerCost(v) {
  return bountyFlowerCost = v;
}

export function __set_choresFlowerCost(v) {
  return choresFlowerCost = v;
}

export function __set_npcFlowerCost(v) {
  return npcFlowerCost = v;
}

export function __set_budFloorPrice(v) {
  return budFloorPrice = v;
}

export function __set_petFloorPrice(v) {
  return petFloorPrice = v;
}