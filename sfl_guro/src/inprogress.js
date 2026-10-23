import { ICONS, NPC_ICONS, ALL_ANIMAL_PRODUCTS, ANIMAL_BASE_CYCLE_SEC, ANIMAL_DATA, ANIMAL_PRODUCT_LOOKUP, ASCENSION_RANK_DATA, BAIT_RECIPES, BAIT_RECIPE_NAME_MATCH, BASE_CROPS, BASE_FRUITS, BASE_GREENHOUSE, BASE_STOCK_TOOLS, BEE_SWARM_ICON, BOOSTS, CALENDAR_SEASONAL_BOOSTS, COIN_ICON, COOKING_BUILDINGS, COOKING_BUILDING_ICONS, COOKING_CAKE_DISHES, COOKING_FOOD_IMAGES, COOKING_RECIPES, CRIMSTONE_KNOWN_IDS, CROPS_GLOBAL_EXCLUDED_FROM_GREENHOUSE, CROP_AOE_RANKS, CROP_HARVEST_SEC, CROP_KNOWN_IDS, CROP_PRNG_EXCLUDE, FARM_LEVEL_NODES, FARM_PANEL_SCROLL_IDLE_MS, FEED_LABELS, FERMENTATION_BAIT_FAMILIES, FERMENTATION_SPICE_KNOWN_IDS, FERMENTATION_STATIC_RECIPES, FISH_AGING_KNOWN_IDS, FISH_SALT_DATA, FLOWER_ICON, FLOWER_SEEDS, FLOWER_VARIETIES, FOOD_KNOWN_IDS, FRUIT_KNOWN_IDS, FRUIT_PRNG_EXCLUDE, GAMESTATE_SECTION_KEYS, GEM_ICON, GOLD_KNOWN_IDS, IMAGE_ICONS, IRON_KNOWN_IDS, MUTANT_TYPE_EMOJI, OIL_BONUS_DROP_AMOUNT, OIL_SINGLE_HARVEST_BASE, PATCH_FRUIT_ONLY_GLOBAL_BOOSTS_EXCLUDED_FROM_GREENHOUSE, RCM_GREENHOUSE_ICON_HTML, REQUIRED_FOOD_QTY_MAP, RESOURCE_DATA, RESOURCE_NODE_TIERS, SALT_BASE_CHARGE_CAP, SALT_BASE_TIME_SEC, SALT_BASE_YIELD, SALT_KNOWN_ID, SPICE_RECIPES, SPICE_STATIC_RECIPES, STONE_KNOWN_IDS, SYNODIC_MONTH_DAYS, TREE_KNOWN_IDS, __farmPanelSaveGameStateHandle, __gameStateSectionLenSigs, __set___farmPanelSaveGameStateHandle, __set___gameStateSectionLenSigs, allResourceBudBoostEntries, applyFarmBoostsOnly, applyFarmSkillsOnly, coinPerFlower, coinsToFlower, computeAgedFishFigures, computeAnimalFeedFigures, computeAnimalRealProgress, computeAnimalTypeFigures, computeAnimalYieldsForLevel, computeBaitFigures, computeBoostedCropStats, computeBoostedStock, computeBoostedFlowerVarietyStats, computeBoostedFruitStats, computeBoostedGreenhouseStats, computeBoostedLavaPitStats, computeBoostedResourceStats, computeComposterFigures, computeDestroyedCropPlotIds, computeHiveStats, computeHoneyRestockBreakdown, computeQtyRestockGems, computeSpiceFigures, currentSeason, escapeHtml, farmIdPromptStartSync, farmSyncExtractBudTraits, farmSyncExtractGameState, farmSyncExtractPetTraits, farmSyncFindBagByNameHeuristic, farmSyncGetAnimalRecords, farmSyncGetCoords, farmSyncGetPetRecords, farmSyncPickActivePlacedInstances, feePercent, fmt, fmtAnimal, fmtAnimalCost, fullMoonSeedStockQty, getActiveAnimalBoosts, getActiveBoostsForHive, getActiveFeedInfo, getActiveSaltRechargeMult, getActiveSaltYieldBonus, getActiveSeasonGuardianName, getAnimalLevelFromXp, getAscensionRank, getBeeSwarmPerSwarmYield, getCropPlotSunshowerSpeedMultiplier, getCurrentChapterMutantSet, getCurrentChapterName, getEffectiveYieldAdd, getNodeIconHtml, getNodeLabel, getPowerHourWindow, getSpiceLickDurationHarvests, isBoostActive, isCropInSeason, isOvernightGroundCrop, isSkillActive, onDeferredInitialRenderDone, parseYieldBoostAmount, resourceBuds, saltSculptureLevel, sculptureEffects, sflPrngChance, syncCookingCountsFromInventory } from "./calculator.js";

import { SFL_COMMUNITY_PROXY_BASE, SFL_NFT_PRICE_API, SFL_PROXY_BASE, computeRestockCost24h, cookingCostMode, cookingIngredientUnitCostCoins, fishSaltCostFlower, getActiveShrineDailyCostStable, getItemCostByName, getRestockGemCost, restocksForMode, getSpiceCostPerUseFlower, hasFreeSaltRakeCost, honeyCostFlowerForSpiceRack, marketItems, pickledVegCost, refinedSaltUnitCostFlower, saltCostFlowerForSpiceRack } from "./prices.js";

import { getPumpkinPeteQuest } from "./pete_quests.js";

import { $, cookFoodIcon, getBoostIcon, getIcon, renderAnimalCardProductDetailRow, renderAnimalYieldGroupsList, renderBeehiveListHtml, renderCardProductDetailRow, renderCostNetInfoTrigger, renderCrimstoneInstantMineBoostHtml, renderCrimstoneNodeYieldList, renderFarmPanelTabContent, renderFruitHarvestsLeftHtml, renderGoldInstantMineBoostHtml, renderNodeTierYieldList, renderOilNodeYieldList, renderPlantYieldNodeList, renderSaltNodeYieldList, renderSeaBlessedBoostHtml, renderTotalsBreakdown, renderTurnaroundBoostHtml } from "./ui.js";
import { potionTrackFromState, digStreakTrackFromState } from "./calculator.js";

export function farmPanelDetectNodeTier(resourceName, node) {
  const tiers = RESOURCE_NODE_TIERS[resourceName];
  if (!tiers) return null;
  const rawLabel = node && (node.name || node.sftType || node.type) || null;
  const norm = rawLabel ? String(rawLabel).trim().toLowerCase() : null;
  const match = norm ? tiers.find(t => t.label.toLowerCase() === norm) : null;
  return match || tiers.find(t => t.key === "base");
}

function farmPanelGetSaltActiveBoosts() {
  return BOOSTS.filter(b => isBoostActive(b.id) && b.category === "salt" && b.scope === "saltGlobal").map(b => ({
    name: b.name,
    yieldAdd: b.saltYieldAdd || 0,
    timeMult: b.saltRechargeTimeMult || undefined,
    freeCost: b.freeCost || undefined
  }));
}

function farmPanelGetHoneyActiveBoosts() {
  const active = typeof getActiveBoostsForHive === "function" ? getActiveBoostsForHive() : [];
  return active.map(b => ({
    name: b.name,
    yieldAdd: b.honeyYieldAdd || 0
  }));
}

const COOKING_PANEL_TAB_ICON_HTML = '<img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAsAAAAKCAYAAABi8KSDAAAAAXNSR0IArs4c6QAAAO9JREFUGJVtkbFqwlAUhr+bRTSkxSSFULKVgNCA4CBesQ+QRcjQVyiFFvoqjsW9jlWcfQDByU0QN5EMGimZ7GA63ZjE/tPhnO9wDv8vKMmxvVTV0X4t8jNRhkbtGtJPODdDHj6mhSWhwFG7BsCrafEZH5B+QqVjAnD/8kO0XwvNsb3067mVgU9vOtJPeA8faXzfcJrH7Ia3OLaXCsf20rvKiUFf0um5aMtx9uO5GaItxwSTKqv4lwxWGvQlAF1jQTCpAuDWTWab6Bq2dAO3bpZNYraJ0K66wPYY/9e+uAGgLli6UTiv7CuYng9EKR/MH0NNTSwXCPCyAAAAAElFTkSuQmCC" style="width:14px;height:13px;image-rendering:pixelated;vertical-align:middle;">';

export let farmPanelSyncInFlight = false;

export function farmPanelGetLastInfo() {
  return {
    id: localStorage.getItem("hl_farm_panel_id") || "",
    level: localStorage.getItem("hl_farm_panel_level") || "",
    experience: parseFloat(localStorage.getItem("hl_farm_panel_experience")) || 0,
    ascensionLevel: parseInt(localStorage.getItem("hl_farm_panel_ascension_level"), 10) || 0,
    time: parseFloat(localStorage.getItem("hl_farm_panel_time")) || 0,
    vipActive: localStorage.getItem("hl_farm_panel_vip_active") === "1",
    vipExpiresAt: parseFloat(localStorage.getItem("hl_farm_panel_vip_expires")) || null,
    vipLifetime: localStorage.getItem("hl_farm_panel_vip_lifetime") === "1",
    factionName: localStorage.getItem("hl_farm_panel_faction_name") || null,
    factionIsMember: localStorage.getItem("hl_farm_panel_faction_is_member") === "1",
    factionHasPetData: localStorage.getItem("hl_farm_panel_faction_has_pet") === "1",
    factionTotalXP: parseFloat(localStorage.getItem("hl_farm_panel_faction_total_xp")) || 0,
    factionGoalXP: parseFloat(localStorage.getItem("hl_farm_panel_faction_goal_xp")) || 0,
    factionStreak: parseInt(localStorage.getItem("hl_farm_panel_faction_streak"), 10) || 0,
    factionLastWeekStreak: parseInt(localStorage.getItem("hl_farm_panel_faction_last_week_streak"), 10) || 0,
    factionQualifiesForBoost: localStorage.getItem("hl_farm_panel_faction_qualifies_for_boost") === "1",
    factionIsContributing: localStorage.getItem("hl_farm_panel_faction_is_contributing") === "1"
  };
}

export function farmPanelSaveLastInfo(id, level, vipStatus, factionInfo, experience, ascensionLevel) {
  localStorage.setItem("hl_farm_panel_id", id);
  localStorage.setItem("hl_farm_panel_level", level != null ? String(level) : "");
  localStorage.setItem("hl_farm_panel_experience", experience != null ? String(experience) : "");
  localStorage.setItem("hl_farm_panel_ascension_level", ascensionLevel != null ? String(ascensionLevel) : "0");
  localStorage.setItem("hl_farm_panel_time", String(Date.now()));
  localStorage.setItem("hl_farm_panel_vip_active", vipStatus && vipStatus.active ? "1" : "0");
  localStorage.setItem("hl_farm_panel_vip_expires", vipStatus && vipStatus.expiresAt != null ? String(vipStatus.expiresAt) : "");
  localStorage.setItem("hl_farm_panel_vip_lifetime", vipStatus && vipStatus.lifetime ? "1" : "0");
  const fi = factionInfo || {};
  localStorage.setItem("hl_farm_panel_faction_name", fi.factionName || "");
  localStorage.setItem("hl_farm_panel_faction_is_member", fi.isMember ? "1" : "0");
  localStorage.setItem("hl_farm_panel_faction_has_pet", fi.hasPetData ? "1" : "0");
  localStorage.setItem("hl_farm_panel_faction_total_xp", String(fi.totalXP || 0));
  localStorage.setItem("hl_farm_panel_faction_goal_xp", String(fi.goalXP || 0));
  localStorage.setItem("hl_farm_panel_faction_streak", String(fi.streak || 0));
  localStorage.setItem("hl_farm_panel_faction_last_week_streak", String(fi.lastWeekStreak || 0));
  localStorage.setItem("hl_farm_panel_faction_qualifies_for_boost", fi.qualifiesForBoost ? "1" : "0");
  localStorage.setItem("hl_farm_panel_faction_is_contributing", fi.isContributingMember ? "1" : "0");
}

export let farmPanelGameState = null;

export let farmPanelStateIsCached = false;

let farmPanelHoneySnapshotMs = Date.now();

export let farmPanelTabContentDirty = false;

export let farmPanelActiveTab = "inprogress";

export let farmPanelExpandedNames = new Set;

export let farmPanelInProgressCategoryFilter = "all";

let farmPanelRenderAtMs = 0;

let farmPanelUserScrolling = false;

let farmPanelScrollIdleTimer = null;

export function farmPanelMarkScrollActivity() {
  farmPanelUserScrolling = true;
  const wrap = $("farmPanelTabContent");
  if (wrap) wrap.classList.add("is-scrolling");
  if (farmPanelScrollIdleTimer) clearTimeout(farmPanelScrollIdleTimer);
  farmPanelScrollIdleTimer = setTimeout(() => {
    farmPanelUserScrolling = false;
    if (wrap) wrap.classList.remove("is-scrolling");
  }, FARM_PANEL_SCROLL_IDLE_MS);
}

export function farmPanelField(g, key) {
  if (!g) return null;
  if (g[key] != null) return g[key];
  if (g.land && g.land[key] != null) return g.land[key];
  return null;
}

export function farmPanelGrowTimeSec(name) {
  if (BASE_CROPS[name]) return BASE_CROPS[name].timeSec;
  if (BASE_FRUITS[name]) return BASE_FRUITS[name].timeSec;
  if (BASE_GREENHOUSE[name]) return BASE_GREENHOUSE[name].timeSec;
  if (RESOURCE_DATA[name]) return RESOURCE_DATA[name].timeSec;
  if (FLOWER_SEEDS[name]) return FLOWER_SEEDS[name].timeSec;
  if (FLOWER_VARIETIES[name]) return FLOWER_SEEDS[FLOWER_VARIETIES[name].seed].timeSec;
  return null;
}

function farmPanelFormatCountdown(sec) {
  if (sec <= 0) return "Ready now";
  sec = Math.floor(sec);
  const h = Math.floor(sec / 3600), m = Math.floor(sec % 3600 / 60), s = sec % 60;
  const parts = [];
  if (h > 0) parts.push(`${h}h`);
  if (h > 0 || m > 0) parts.push(`${m}m`);
  parts.push(`${s}s`);
  return parts.join(" ") + " left";
}

export function farmPanelGetMarketPriceFlower(name) {
  const m = marketItems.find(x => (x.name || "").toLowerCase() === (name || "").toLowerCase());
  if (m && m.flowerPrice) return m.flowerPrice;
  if (BASE_CROPS[name] && BASE_CROPS[name].marketPrice) return BASE_CROPS[name].marketPrice;
  if (BASE_FRUITS[name] && BASE_FRUITS[name].marketPrice) return BASE_FRUITS[name].marketPrice;
  if (BASE_GREENHOUSE[name] && BASE_GREENHOUSE[name].marketPrice) return BASE_GREENHOUSE[name].marketPrice;
  return 0;
}

export function farmPanelGetCostPerUnitFlower(name) {
  const coins = getItemCostByName(name);
  return (coins || 0) / (coinPerFlower || 1);
}

function farmPanelGetBaseYield(name) {
  if (name === "Obsidian") return 1;
  if (BASE_CROPS[name]) return BASE_CROPS[name].baseYield || 1;
  if (BASE_FRUITS[name]) return BASE_FRUITS[name].yieldPerHarvest || 1;
  if (BASE_GREENHOUSE[name]) return BASE_GREENHOUSE[name].baseYield || 1;
  if (RESOURCE_DATA[name]) return RESOURCE_DATA[name].yieldPer || 1;
  return 1;
}

export function farmPanelGetBoostedYieldStats(name) {
  if (name === "Obsidian") return computeBoostedLavaPitStats(259200);
  if (name === "Salt") {
    const eff = sculptureEffects();
    return {
      yieldVal: SALT_BASE_YIELD + getActiveSaltYieldBonus(),
      timeVal: SALT_BASE_TIME_SEC * eff.chargeTimeMult * getActiveSaltRechargeMult(),
      activeBoosts: []
    };
  }
  if (BASE_CROPS[name]) {
    const d = BASE_CROPS[name];
    return computeBoostedCropStats(name, d.baseYield || 1, d.timeSec, undefined, undefined, true);
  }
  if (BASE_FRUITS[name]) {
    const d = BASE_FRUITS[name];
    return computeBoostedFruitStats(name, d.yieldPerHarvest || 1, d.timeSec, d.minHarvest || 1);
  }
  if (BASE_GREENHOUSE[name]) {
    const d = BASE_GREENHOUSE[name];
    return computeBoostedGreenhouseStats(name, d.baseYield || 1, d.timeSec);
  }
  if (RESOURCE_DATA[name]) {
    const d = RESOURCE_DATA[name];
    return computeBoostedResourceStats(name, d.yieldPer, d.timeSec);
  }
  if (FLOWER_VARIETIES[name]) {
    const stats = computeBoostedFlowerVarietyStats(name);
    return {
      yieldVal: stats.expectedYield,
      timeVal: stats.timeVal,
      activeBoosts: stats.activeBoosts
    };
  }
  return {
    yieldVal: 1,
    activeBoosts: []
  };
}

export function farmPanelGetMarketId(name) {
  if (name === "Obsidian") return "resource_Obsidian";
  if (BASE_CROPS[name]) return "crop_" + name;
  if (BASE_FRUITS[name]) return "fruit_" + name;
  if (BASE_GREENHOUSE[name]) return "greenhouse_" + name;
  if (FLOWER_VARIETIES[name]) return "flower_" + name;
  if (RESOURCE_DATA[name]) return "resource_" + name;
  return null;
}

export function farmPanelComputeEconomics(name, count, totalYield) {
  const price = farmPanelGetMarketPriceFlower(name);
  let costPerUnit = farmPanelGetCostPerUnitFlower(name);
  const marketId = farmPanelGetMarketId(name);
  let restockInfo = marketId ? computeQtyRestockGems(marketId, totalYield) : null;
  if (name === "Honey") {
    const honeyRestock = computeHoneyRestockBreakdown(totalYield);
    if (honeyRestock) {
      costPerUnit = honeyRestock.baseCostPerUnit;
      restockInfo = honeyRestock.restockInfo;
    }
  }
  if (name === "Salt") {
    const yieldPerCharge = SALT_BASE_YIELD + getActiveSaltYieldBonus();
    if (!hasFreeSaltRakeCost() && yieldPerCharge > 0 && totalYield > 0) {
      const baseRakeStock = BASE_STOCK_TOOLS["Salt Rake"];
      const boostedRakeStock = baseRakeStock ? computeBoostedStock(baseRakeStock, "tool", "Salt Rake") : 0;
      if (boostedRakeStock > 0) {
        const itemsNeeded = totalYield / yieldPerCharge;
        const restocksNeeded = restocksForMode(itemsNeeded / boostedRakeStock);
        const gemCostPerRestock = typeof getRestockGemCost === "function" ? getRestockGemCost("tool", "Salt Rake") : 10;
        const gemsTotal = restocksNeeded * gemCostPerRestock;
        const flowerCost = computeRestockCost24h(baseRakeStock, "tool", itemsNeeded, 1, 1, null, "Salt Rake");
        restockInfo = {
          name: "Salt Rake",
          stockKind: "tool",
          itemsNeeded: itemsNeeded,
          boostedStock: boostedRakeStock,
          restocksNeeded: restocksNeeded,
          gemCostPerRestock: gemCostPerRestock,
          gemsTotal: gemsTotal,
          flowerCost: flowerCost
        };
      }
    }
  }
  const seedCost = costPerUnit * totalYield;
  const restockCost = restockInfo ? restockInfo.flowerCost : 0;
  const totalCost = seedCost + restockCost;
  const grossRevenue = price * totalYield;
  const feeAmount = grossRevenue * ((feePercent || 0) / 100);
  const netRevenue = grossRevenue - feeAmount;
  const profit = netRevenue - totalCost;
  return {
    name: name,
    count: count,
    totalYield: totalYield,
    price: price,
    costPerUnit: costPerUnit,
    seedCost: seedCost,
    restockInfo: restockInfo,
    restockCost: restockCost,
    totalCost: totalCost,
    grossRevenue: grossRevenue,
    feeAmount: feeAmount,
    netRevenue: netRevenue,
    profit: profit
  };
}

function farmPanelJobMutantReward(job) {
  const name = farmPanelJobMutantRewardName(job);
  if (!name) return null;
  const first = job.reward.items[0];
  const amount = first && typeof first.amount === "number" && first.amount > 0 ? first.amount : 1;
  return {
    name: name,
    amount: amount
  };
}

function farmPanelJobMutantRewardName(job) {
  if (!job) return null;
  const reward = job.reward;
  if (!reward || !Array.isArray(reward.items) || !reward.items.length) return null;
  const first = reward.items[0];
  return first && first.name ? first.name : null;
}

export function farmPanelDetectActiveMutants(json) {
  const g = farmSyncExtractGameState(json);
  const results = [];
  const flowersField = farmPanelField(g, "flowers");
  const flowerBeds = flowersField && flowersField.flowerBeds;
  const flowerCounts = {};
  if (flowerBeds && typeof flowerBeds === "object") {
    Object.values(flowerBeds).forEach(bed => {
      const name = farmPanelJobMutantRewardName(bed && bed.flower);
      if (name) flowerCounts[name] = (flowerCounts[name] || 0) + 1;
    });
  }
  Object.keys(flowerCounts).forEach(name => {
    results.push({
      type: "Flower",
      name: name,
      count: flowerCounts[name]
    });
  });
  [ "Chicken", "Sheep", "Cow" ].forEach(typeLabel => {
    const animalKey = typeLabel.toLowerCase();
    const bag = farmSyncGetAnimalRecords(g, animalKey);
    const counts = {};
    if (bag && typeof bag === "object") {
      Object.values(bag).forEach(animal => {
        const name = farmPanelJobMutantRewardName(animal);
        if (name) counts[name] = (counts[name] || 0) + 1;
      });
    }
    Object.keys(counts).forEach(name => {
      results.push({
        type: typeLabel,
        name: name,
        count: counts[name]
      });
    });
  });
  return results;
}

export function farmPanelRenderMutantAlertCard(entry) {
  const icon = IMAGE_ICONS[entry.name] ? getIcon(entry.name) : `<span style="font-size:24px;">${MUTANT_TYPE_EMOJI[entry.type] || "✨"}</span>`;
  const countNote = entry.count > 1 ? ` ×${entry.count}` : "";
  return `\n  <div class="mutant-alert-card" data-search="mutant-${entry.type.toLowerCase()}">\n    <div class="mutant-alert-shine"></div>\n    <div class="mutant-alert-icon">${icon}</div>\n    <div class="mutant-alert-text">\n      <div class="mutant-alert-title">You have a Mutant! <span class="mutant-alert-type">[${escapeHtml(entry.type)}]</span></div>\n      <div class="mutant-alert-name">${escapeHtml(entry.name)}${countNote}</div>\n    </div>\n  </div>`;
}

function farmPanelTreeTypeForNode(node) {
  return node && typeof node.name === "string" && TREE_KNOWN_IDS[node.name] ? node.name : "Tree";
}

function farmPanelPredictTreeTypeRoll(json, treeType, criticalHitName, chance) {
  if (!(chance > 0)) return null;
  const lastInfo = farmPanelGetLastInfo();
  const farmId = Number(lastInfo.id);
  if (!Number.isFinite(farmId) || farmId <= 0) return null;
  const g = farmSyncExtractGameState(json);
  const farmActivity = farmPanelField(g, "farmActivity");
  if (!farmActivity || typeof farmActivity !== "object") return null;
  const itemId = TREE_KNOWN_IDS[treeType];
  if (!itemId) return null;
  const activityKey = `${treeType === "Tree" ? "Basic Tree" : treeType} Chopped`;
  const counter = typeof farmActivity[activityKey] === "number" ? farmActivity[activityKey] : 0;
  return sflPrngChance({
    farmId: farmId,
    itemId: itemId,
    counter: counter,
    chance: chance,
    criticalHitName: criticalHitName
  });
}

function farmPanelSimulateSeaBlessedChain(g, nodeStates, maxCharges, saltYield, intervalMs, now) {
  if (!isSkillActive("skill_sea_blessed")) return null;
  const values = ASCENSION_RANK_DATA.skill_sea_blessed.values;
  const chance = values[Math.min(Math.max(getAscensionRank("skill_sea_blessed"), 1), values.length) - 1];
  if (!(chance > 0)) return null;
  const farmId = Number(farmPanelGetLastInfo().id);
  if (!Number.isFinite(farmId) || farmId <= 0) return null;
  const farmActivity = farmPanelField(g, "farmActivity");
  if (!farmActivity || typeof farmActivity !== "object") return null;
  const rawCounter = farmActivity["Salt Harvested"];
  const baseCounter = typeof rawCounter === "number" && Number.isFinite(rawCounter) ? rawCounter : 0;
  const NODES_PER_PROC = 4;
  const MAX_HARVESTS = 5000;
  const HORIZON_MS = 30 * 864e5;
  const MAX_FUTURE_PROCS = 3;
  const nodes = nodeStates.map(s => ({
    stored: s.storedCharges,
    next: s.nextChargeAt
  }));
  const restoredPerNode = nodes.map(() => 0);
  const windowRestoredPerNode = nodes.map(() => 0);
  const harvestsPerNode = nodes.map(() => 0);
  const windowEndMs = nodeStates.reduce((m, s) => s.storedCharges < maxCharges && Number.isFinite(s.nextChargeAt) ? Math.max(m, s.nextChargeAt) : m, now);
  let windowRestoredTotal = 0;
  const nodeLabel = i => nodeStates[i] && typeof nodeStates[i].nodeIdx === "number" ? nodeStates[i].nodeIdx + 1 : i + 1;
  const nowProcs = [];
  const nowProcCounters = [];
  const futureProcs = [];
  let harvests = 0;
  let nowHarvests = 0;
  let nowRestored = 0;
  const harvestReady = (t, isNowPhase) => {
    while (harvests < MAX_HARVESTS) {
      const idx = nodes.findIndex(n => n.stored >= 1);
      if (idx === -1) break;
      const node = nodes[idx];
      if (node.stored === maxCharges) node.next = t + intervalMs;
      node.stored -= 1;
      if (isNowPhase) harvestsPerNode[idx] += 1;
      const counter = baseCounter + harvests;
      harvests++;
      const hit = sflPrngChance({
        farmId: farmId,
        itemId: SALT_KNOWN_ID,
        counter: counter,
        chance: chance,
        criticalHitName: "Sea Blessed"
      });
      if (!hit) continue;
      let remaining = NODES_PER_PROC;
      let restored = 0;
      const targets = [];
      for (let i = 0; i < nodes.length && remaining > 0; i++) {
        if (nodes[i].stored < maxCharges) {
          nodes[i].stored += 1;
          if (nodes[i].stored === maxCharges) nodes[i].next = t + intervalMs;
          if (isNowPhase) restoredPerNode[i] += 1;
          else if (t <= windowEndMs) {
            windowRestoredPerNode[i] += 1;
            windowRestoredTotal += 1;
          }
          restored += 1;
          targets.push(nodeLabel(i));
          remaining -= 1;
        }
      }
      if (isNowPhase) {
        nowProcCounters.push(counter);
        nowRestored += restored;
        nowProcs.push({
          counter: counter,
          harvestNumber: harvests,
          nodeIndex: nodeLabel(idx),
          targets: targets,
          restored: restored
        });
      } else {
        futureProcs.push({
          counter: counter,
          harvestNumber: harvests,
          nodeIndex: nodeLabel(idx),
          targets: targets,
          inSec: Math.max(0, (t - now) / 1e3),
          restored: restored,
          inWindow: t <= windowEndMs
        });
      }
    }
  };
  harvestReady(now, true);
  nowHarvests = harvests;
  while (harvests < MAX_HARVESTS) {
    let tNext = Infinity;
    nodes.forEach(n => {
      if (n.stored < maxCharges && n.next < tNext) tNext = n.next;
    });
    if (!(tNext <= now + HORIZON_MS)) break;
    if (tNext > windowEndMs && futureProcs.length >= MAX_FUTURE_PROCS) break;
    nodes.forEach(n => {
      while (n.stored < maxCharges && n.next <= tNext) {
        n.stored += 1;
        n.next += intervalMs;
      }
    });
    harvestReady(tNext, false);
  }
  return {
    chance: chance,
    startCounter: baseCounter,
    harvests: nowHarvests,
    procCount: nowProcCounters.length,
    procCounters: nowProcCounters,
    restoredTotal: nowRestored,
    restoredPerNode: restoredPerNode,
    harvestsPerNode: harvestsPerNode,
    nowProcs: nowProcs,
    nodeLabels: nodes.map((n, i) => nodeLabel(i)),
    bonusSalt: nowRestored * saltYield,
    futureProcs: futureProcs,
    windowEndMs: windowEndMs,
    windowRestoredTotal: windowRestoredTotal,
    windowRestoredPerNode: windowRestoredPerNode,
    windowBonusSalt: windowRestoredTotal * saltYield
  };
}

function farmPanelBuildSequentialWoodRolls(json, treeType, count) {
  const lastInfo = farmPanelGetLastInfo();
  const farmId = Number(lastInfo.id);
  if (!Number.isFinite(farmId) || farmId <= 0) return null;
  const g = farmSyncExtractGameState(json);
  const farmActivity = farmPanelField(g, "farmActivity");
  if (!farmActivity || typeof farmActivity !== "object") return null;
  const itemId = TREE_KNOWN_IDS[treeType];
  if (!itemId) return null;
  if (count <= 0) return [];
  const activityKey = `${treeType === "Tree" ? "Basic Tree" : treeType} Chopped`;
  const baseCounter = typeof farmActivity[activityKey] === "number" ? farmActivity[activityKey] : 0;
  const toughTreeOwned = isSkillActive("skill_tough_tree");
  const toughTreeChance = toughTreeOwned ? [ 10, 20, 30 ][Math.min(Math.max(getAscensionRank("skill_tough_tree"), 1), 3) - 1] : 0;
  const turnaroundOwned = isSkillActive("skill_tree_turnaround");
  const turnaroundChance = turnaroundOwned ? ASCENSION_RANK_DATA.skill_tree_turnaround.values[Math.min(Math.max(getAscensionRank("skill_tree_turnaround"), 1), 3) - 1] : 0;
  const rolls = [];
  for (let i = 0; i < count; i++) {
    const counter = baseCounter + i;
    const toughTreeCrit = toughTreeOwned && sflPrngChance({
      farmId: farmId,
      itemId: itemId,
      counter: counter,
      chance: toughTreeChance,
      criticalHitName: "Tough Tree"
    });
    const nativeHit = sflPrngChance({
      farmId: farmId,
      itemId: itemId,
      counter: counter,
      chance: 20,
      criticalHitName: "Native"
    });
    const turnaroundHit = turnaroundOwned && sflPrngChance({
      farmId: farmId,
      itemId: itemId,
      counter: counter,
      chance: turnaroundChance,
      criticalHitName: "Tree Turnaround"
    });
    rolls.push({
      toughTreeCrit: toughTreeCrit,
      nativeHit: nativeHit,
      turnaroundHit: turnaroundHit
    });
  }
  return rolls;
}

function farmPanelPredictWoodCritRolls(json, treeType) {
  const rolls = farmPanelBuildSequentialWoodRolls(json, treeType, 1);
  return rolls && rolls.length ? rolls[0] : null;
}

function farmPanelBuildSequentialWoodRollChains(json, treeType, count) {
  const lastInfo = farmPanelGetLastInfo();
  const farmId = Number(lastInfo.id);
  if (!Number.isFinite(farmId) || farmId <= 0) return null;
  const g = farmSyncExtractGameState(json);
  const farmActivity = farmPanelField(g, "farmActivity");
  if (!farmActivity || typeof farmActivity !== "object") return null;
  const itemId = TREE_KNOWN_IDS[treeType];
  if (!itemId) return null;
  if (count <= 0) return [];
  const activityKey = `${treeType === "Tree" ? "Basic Tree" : treeType} Chopped`;
  const baseCounter = typeof farmActivity[activityKey] === "number" ? farmActivity[activityKey] : 0;
  const toughTreeOwned = isSkillActive("skill_tough_tree");
  const toughTreeChance = toughTreeOwned ? [ 10, 20, 30 ][Math.min(Math.max(getAscensionRank("skill_tough_tree"), 1), 3) - 1] : 0;
  const turnaroundOwned = isSkillActive("skill_tree_turnaround");
  const turnaroundChance = turnaroundOwned ? ASCENSION_RANK_DATA.skill_tree_turnaround.values[Math.min(Math.max(getAscensionRank("skill_tree_turnaround"), 1), 3) - 1] : 0;
  const rollAt = counter => {
    const toughTreeCrit = toughTreeOwned && sflPrngChance({
      farmId: farmId,
      itemId: itemId,
      counter: counter,
      chance: toughTreeChance,
      criticalHitName: "Tough Tree"
    });
    const nativeHit = sflPrngChance({
      farmId: farmId,
      itemId: itemId,
      counter: counter,
      chance: 20,
      criticalHitName: "Native"
    });
    const turnaroundHit = turnaroundOwned && sflPrngChance({
      farmId: farmId,
      itemId: itemId,
      counter: counter,
      chance: turnaroundChance,
      criticalHitName: "Tree Turnaround"
    });
    return {
      counter: counter,
      toughTreeCrit: toughTreeCrit,
      nativeHit: nativeHit,
      turnaroundHit: turnaroundHit
    };
  };
  const MAX_CHAIN_LENGTH = 500;
  let counter = baseCounter;
  const chains = [];
  for (let i = 0; i < count; i++) {
    const chain = [];
    let roll = rollAt(counter);
    chain.push(roll);
    counter++;
    while (roll.turnaroundHit && chain.length < MAX_CHAIN_LENGTH) {
      roll = rollAt(counter);
      chain.push(roll);
      counter++;
    }
    chains.push(chain);
  }
  return chains;
}

function farmPanelGetBudYieldForResource(resourceName) {
  const entries = typeof allResourceBudBoostEntries === "function" ? allResourceBudBoostEntries() : [];
  const perBud = {};
  entries.forEach(e => {
    if (!e || !e.yieldAdd) return;
    const applies = e.scope === "resource" ? e.target === resourceName : e.scope === "resourceList" ? Array.isArray(e.resources) && e.resources.includes(resourceName) : false;
    if (!applies) return;
    const key = e.budId || e.id;
    perBud[key] = (perBud[key] || 0) + e.yieldAdd;
  });
  const totals = Object.values(perBud);
  return totals.length ? Math.max(...totals) : 0;
}

function farmPanelComputeExactWoodYieldForNode(node, treeType, critRolls) {
  if (!critRolls) return null;
  let amount = 1;
  const hasBeaverReady = isBoostActive("woody_the_beaver") || isBoostActive("apprentice_beaver") || isBoostActive("foreman_beaver");
  if (hasBeaverReady) amount *= 1.2;
  if (isBoostActive("discord_mod")) amount *= 1.35;
  if (isBoostActive("lumberjack")) amount *= 1.1;
  if (critRolls.toughTreeCrit) amount *= 3;
  if (isSkillActive("skill_lumberjacks_extra")) {
    const rank = getAscensionRank("skill_lumberjacks_extra");
    const values = ASCENSION_RANK_DATA.skill_lumberjacks_extra.values;
    amount += values[Math.min(Math.max(rank, 1), values.length) - 1];
  }
  if (isBoostActive("wood_nymph_wendy")) amount += .2;
  if (isBoostActive("tiki_totem")) amount += .1;
  if (isBoostActive("squirrel")) amount += .1;
  if (isBoostActive("faction_shield_res")) amount += .25;
  if (critRolls.nativeHit) amount += 1;
  if (isBoostActive("legendary_shrine_res")) amount += 1;
  amount += farmPanelGetBudYieldForResource("Wood");
  const multiplier = node && typeof node.multiplier === "number" ? node.multiplier : 1;
  amount *= multiplier;
  const tier = node && typeof node.tier === "number" ? node.tier : treeType === "Sacred Tree" ? 3 : treeType === "Ancient Tree" ? 2 : 1;
  if (tier === 2) amount += .5;
  if (tier === 3) amount += 2.5;
  return amount;
}

function farmPanelRockNameForNode(node, knownIds, defaultName) {
  return node && typeof node.name === "string" && knownIds[node.name] ? node.name : defaultName;
}

function farmPanelGetMiningPrngContext(json, knownIds, rockName) {
  const lastInfo = farmPanelGetLastInfo();
  const farmId = Number(lastInfo.id);
  if (!Number.isFinite(farmId) || farmId <= 0) return null;
  const g = farmSyncExtractGameState(json);
  const farmActivity = farmPanelField(g, "farmActivity");
  if (!farmActivity || typeof farmActivity !== "object") return null;
  const itemId = knownIds[rockName];
  if (!itemId) return null;
  const counter = typeof farmActivity[`${rockName} Mined`] === "number" ? farmActivity[`${rockName} Mined`] : 0;
  return {
    farmId: farmId,
    itemId: itemId,
    counter: counter
  };
}

export function farmPanelGetCollectiblePosition(g, name) {
  const collectibles = farmPanelField(g, "collectibles");
  const arr = collectibles && collectibles[name];
  const active = farmSyncPickActivePlacedInstances(arr);
  const placed = active[0];
  if (!placed) return null;
  return {
    x: placed.coordinates.x,
    y: placed.coordinates.y
  };
}

export function farmPanelGnomeComboPresent() {
  if (!farmPanelGameState) return false;
  const g = farmSyncExtractGameState(farmPanelGameState);
  const gnomePos = farmPanelGetCollectiblePosition(g, "Gnome");
  const cobaltPos = farmPanelGetCollectiblePosition(g, "Cobalt");
  const clementinePos = farmPanelGetCollectiblePosition(g, "Clementine");
  if (!gnomePos || !cobaltPos || !clementinePos) return false;
  return cobaltPos.y === gnomePos.y && cobaltPos.x + 1 === gnomePos.x && clementinePos.y === gnomePos.y && clementinePos.x - 1 === gnomePos.x;
}

export function farmPanelIsWithinTurtleAOE(turtlePos, rockPos) {
  const dx = turtlePos.x - rockPos.x;
  const dy = turtlePos.y - rockPos.y;
  return Math.abs(dx) <= 1 && Math.abs(dy) <= 1 && (dx !== 0 || dy !== 0);
}

function farmPanelGetRockRecoveryDurationMsFromSync(node, baseRecoverySec, resourceName) {
  const jobData = node && node.stone;
  const baseMs = baseRecoverySec * 1e3;
  if (!jobData) return baseMs;
  if (typeof jobData.baseDurationMs === "number") {
    if (!resourceName) return jobData.baseDurationMs;
    const boosted = farmPanelGetBoostedYieldStats(resourceName);
    const boostedMs = typeof boosted.timeVal === "number" ? boosted.timeVal * 1e3 : baseMs;
    const ratio = baseMs > 0 ? boostedMs / baseMs : 1;
    return jobData.baseDurationMs * ratio;
  }
  return baseMs - (typeof jobData.boostedTime === "number" ? jobData.boostedTime : 0);
}

export function farmPanelCheckTurtleAOEBonus(g, turtleName, node, baseRecoverySec, atTime, resourceName) {
  if (!node || typeof node.x !== "number" || typeof node.y !== "number") return false;
  const turtlePos = farmPanelGetCollectiblePosition(g, turtleName);
  if (!turtlePos) return false;
  if (!farmPanelIsWithinTurtleAOE(turtlePos, {
    x: node.x,
    y: node.y
  })) return false;
  const aoeState = farmPanelField(g, "aoe") || {};
  const dx = node.x - turtlePos.x;
  const dy = node.y - turtlePos.y;
  const lastUsed = aoeState[turtleName] && aoeState[turtleName][dx] && typeof aoeState[turtleName][dx][dy] === "number" ? aoeState[turtleName][dx][dy] : 0;
  const cooldownMs = farmPanelGetRockRecoveryDurationMsFromSync(node, baseRecoverySec, resourceName);
  const referenceTime = typeof atTime === "number" ? atTime : Date.now();
  const idleMs = referenceTime - lastUsed;
  return idleMs >= cooldownMs;
}

function farmPanelBuildSequentialStoneRolls(json, rockName, count) {
  const ctx = farmPanelGetMiningPrngContext(json, STONE_KNOWN_IDS, rockName);
  if (!ctx) return null;
  if (count <= 0) return [];
  const {farmId: farmId, itemId: itemId, counter: baseCounter} = ctx;
  const rockGolemOwned = isBoostActive("rock_golem");
  const rolls = [];
  for (let i = 0; i < count; i++) {
    const counter = baseCounter + i;
    const rockGolemCrit = rockGolemOwned && sflPrngChance({
      farmId: farmId,
      itemId: itemId,
      counter: counter,
      chance: 10,
      criticalHitName: "Rock Golem"
    });
    const nativeHit = sflPrngChance({
      farmId: farmId,
      itemId: itemId,
      counter: counter,
      chance: 20,
      criticalHitName: "Native"
    });
    rolls.push({
      rockGolemCrit: rockGolemCrit,
      nativeHit: nativeHit
    });
  }
  return rolls;
}

function farmPanelPredictStoneCritRolls(json, rockName) {
  const rolls = farmPanelBuildSequentialStoneRolls(json, rockName, 1);
  return rolls && rolls.length ? rolls[0] : null;
}

function farmPanelComputeExactStoneYieldForNode(json, node, rockName, critRolls, atTime) {
  if (!critRolls) return null;
  const g = farmSyncExtractGameState(json);
  let amount = 1;
  if (critRolls.rockGolemCrit) amount += 2;
  if (isBoostActive("prospector")) amount += .2;
  if (isBoostActive("tunnel_mole")) amount += .25;
  if (isBoostActive("stone_beetle")) amount += .1;
  if (isSkillActive("skill_rocknroll")) {
    const rank = getAscensionRank("skill_rocknroll");
    const values = ASCENSION_RANK_DATA.skill_rocknroll.values;
    amount += values[Math.min(Math.max(rank, 1), values.length) - 1];
  }
  if (isSkillActive("skill_rocky_favor")) {
    const rank = getAscensionRank("skill_rocky_favor");
    const values = ASCENSION_RANK_DATA.skill_rocky_favor.values["resourceEffects.Stone"];
    amount += values[Math.min(Math.max(rank, 1), values.length) - 1];
  }
  if (isSkillActive("skill_ferrous_favor")) {
    const rank = getAscensionRank("skill_ferrous_favor");
    const values = ASCENSION_RANK_DATA.skill_ferrous_favor.values["resourceEffects.Stone"];
    amount += values[Math.min(Math.max(rank, 1), values.length) - 1];
  }
  if (critRolls.nativeHit) amount += 1;
  if (isBoostActive("emerald_turtle") && farmPanelCheckTurtleAOEBonus(g, "Emerald Turtle", node, 14400, atTime, "Stone")) amount += .5;
  if (isBoostActive("tin_turtle") && farmPanelCheckTurtleAOEBonus(g, "Tin Turtle", node, 14400, atTime, "Stone")) amount += .1;
  if (isBoostActive("faction_shield_res")) amount += .25;
  if (isBoostActive("legendary_shrine_res")) amount += 1;
  amount += farmPanelGetBudYieldForResource("Stone");
  if (isBoostActive("volcano_gnome")) amount += .1;
  const multiplier = node && typeof node.multiplier === "number" ? node.multiplier : 1;
  amount *= multiplier;
  const tier = node && typeof node.tier === "number" ? node.tier : rockName === "Reinforced Stone Rock" ? 3 : rockName === "Fused Stone Rock" ? 2 : 1;
  if (tier === 2) amount += .5;
  if (tier === 3) amount += 2.5;
  return amount;
}

function farmPanelBuildSequentialIronRolls(json, rockName, count) {
  const ctx = farmPanelGetMiningPrngContext(json, IRON_KNOWN_IDS, rockName);
  if (!ctx) return null;
  if (count <= 0) return [];
  const {farmId: farmId, itemId: itemId, counter: baseCounter} = ctx;
  const rolls = [];
  for (let i = 0; i < count; i++) {
    const counter = baseCounter + i;
    const nativeHit = sflPrngChance({
      farmId: farmId,
      itemId: itemId,
      counter: counter,
      chance: 20,
      criticalHitName: "Native"
    });
    rolls.push({
      nativeHit: nativeHit
    });
  }
  return rolls;
}

function farmPanelPredictIronCritRolls(json, rockName) {
  const rolls = farmPanelBuildSequentialIronRolls(json, rockName, 1);
  return rolls && rolls.length ? rolls[0] : null;
}

function farmPanelComputeExactIronYieldForNode(json, node, rockName, critRolls, atTime) {
  if (!critRolls) return null;
  const g = farmSyncExtractGameState(json);
  let amount = 1;
  if (isBoostActive("rocky_the_mole")) amount += .25;
  if (isBoostActive("radiant_ray")) amount += .1;
  if (isBoostActive("iron_idol")) amount += 1;
  if (isBoostActive("iron_beetle")) amount += .1;
  if (isSkillActive("skill_iron_bumpkin")) {
    const rank = getAscensionRank("skill_iron_bumpkin");
    const values = ASCENSION_RANK_DATA.skill_iron_bumpkin.values;
    amount += values[Math.min(Math.max(rank, 1), values.length) - 1];
  }
  if (isSkillActive("skill_rocky_favor")) {
    const rank = getAscensionRank("skill_rocky_favor");
    const values = ASCENSION_RANK_DATA.skill_rocky_favor.values["resourceEffects.Iron"];
    amount += values[Math.min(Math.max(rank, 1), values.length) - 1];
  }
  if (isSkillActive("skill_ferrous_favor")) {
    const rank = getAscensionRank("skill_ferrous_favor");
    const values = ASCENSION_RANK_DATA.skill_ferrous_favor.values["resourceEffects.Iron"];
    amount += values[Math.min(Math.max(rank, 1), values.length) - 1];
  }
  if (critRolls.nativeHit) amount += 1;
  if (isBoostActive("emerald_turtle") && farmPanelCheckTurtleAOEBonus(g, "Emerald Turtle", node, 28800, atTime, "Iron")) amount += .5;
  if (isBoostActive("faction_shield_res")) amount += .25;
  amount += farmPanelGetBudYieldForResource("Iron");
  if (isBoostActive("volcano_gnome")) amount += .1;
  const multiplier = node && typeof node.multiplier === "number" ? node.multiplier : 1;
  amount *= multiplier;
  const tier = node && typeof node.tier === "number" ? node.tier : rockName === "Tempered Iron Rock" ? 3 : rockName === "Refined Iron Rock" ? 2 : 1;
  if (tier === 2) amount += .5;
  if (tier === 3) amount += 2.5;
  return amount;
}

function farmPanelPredictGoldInstantMineForType(json, rockName) {
  if (!isBoostActive("pickaxe_shark")) return null;
  const ctx = farmPanelGetMiningPrngContext(json, GOLD_KNOWN_IDS, rockName);
  if (!ctx) return null;
  const {farmId: farmId, itemId: itemId, counter: counter} = ctx;
  return sflPrngChance({
    farmId: farmId,
    itemId: itemId,
    counter: counter,
    chance: 10,
    criticalHitName: "Pickaxe Shark"
  });
}

function farmPanelBuildSequentialGoldRolls(json, rockName, count) {
  const ctx = farmPanelGetMiningPrngContext(json, GOLD_KNOWN_IDS, rockName);
  if (!ctx) return null;
  if (count <= 0) return [];
  const {farmId: farmId, itemId: itemId, counter: baseCounter} = ctx;
  const pickaxeSharkOwned = isBoostActive("pickaxe_shark");
  const rolls = [];
  for (let i = 0; i < count; i++) {
    const counter = baseCounter + i;
    const nativeHit = sflPrngChance({
      farmId: farmId,
      itemId: itemId,
      counter: counter,
      chance: 20,
      criticalHitName: "Native"
    });
    const instantMineHit = pickaxeSharkOwned && sflPrngChance({
      farmId: farmId,
      itemId: itemId,
      counter: counter,
      chance: 10,
      criticalHitName: "Pickaxe Shark"
    });
    rolls.push({
      nativeHit: nativeHit,
      instantMineHit: instantMineHit
    });
  }
  return rolls;
}

function farmPanelPredictGoldCritRolls(json, rockName) {
  const rolls = farmPanelBuildSequentialGoldRolls(json, rockName, 1);
  return rolls && rolls.length ? rolls[0] : null;
}

function farmPanelBuildSequentialGoldRollChains(json, rockName, count) {
  const ctx = farmPanelGetMiningPrngContext(json, GOLD_KNOWN_IDS, rockName);
  if (!ctx) return null;
  if (count <= 0) return [];
  const {farmId: farmId, itemId: itemId, counter: baseCounter} = ctx;
  const pickaxeSharkOwned = isBoostActive("pickaxe_shark");
  const rollAt = counter => {
    const nativeHit = sflPrngChance({
      farmId: farmId,
      itemId: itemId,
      counter: counter,
      chance: 20,
      criticalHitName: "Native"
    });
    const instantMineHit = pickaxeSharkOwned && sflPrngChance({
      farmId: farmId,
      itemId: itemId,
      counter: counter,
      chance: 10,
      criticalHitName: "Pickaxe Shark"
    });
    return {
      counter: counter,
      nativeHit: nativeHit,
      instantMineHit: instantMineHit
    };
  };
  const MAX_CHAIN_LENGTH = 500;
  let counter = baseCounter;
  const chains = [];
  for (let i = 0; i < count; i++) {
    const chain = [];
    let roll = rollAt(counter);
    chain.push(roll);
    counter++;
    while (roll.instantMineHit && chain.length < MAX_CHAIN_LENGTH) {
      roll = rollAt(counter);
      chain.push(roll);
      counter++;
    }
    chains.push(chain);
  }
  return chains;
}

function farmPanelComputeExactGoldYieldForNode(json, node, rockName, critRolls, atTime) {
  if (!critRolls) return null;
  const g = farmSyncExtractGameState(json);
  let amount = 1;
  if (isBoostActive("gold_rush")) amount += .5;
  if (isSkillActive("skill_golden_touch")) {
    const rank = getAscensionRank("skill_golden_touch");
    const values = ASCENSION_RANK_DATA.skill_golden_touch.values;
    amount += values[Math.min(Math.max(rank, 1), values.length) - 1];
  }
  if (critRolls.nativeHit) amount += 1;
  if (isBoostActive("nugget")) amount += .25;
  if (isBoostActive("gilded_swordfish")) amount += .1;
  if (isBoostActive("gold_beetle")) amount += .1;
  if (isBoostActive("emerald_turtle") && farmPanelCheckTurtleAOEBonus(g, "Emerald Turtle", node, 86400, atTime, "Gold")) amount += .5;
  if (isBoostActive("faction_shield_res")) amount += .25;
  amount += farmPanelGetBudYieldForResource("Gold");
  if (isBoostActive("volcano_gnome")) amount += .1;
  const multiplier = node && typeof node.multiplier === "number" ? node.multiplier : 1;
  amount *= multiplier;
  const tier = node && typeof node.tier === "number" ? node.tier : rockName === "Prime Gold Rock" ? 3 : rockName === "Pure Gold Rock" ? 2 : 1;
  if (tier === 2) amount += .5;
  if (tier === 3) amount += 2.5;
  return amount;
}

function farmPanelGetCrimstonePrngContext(json) {
  const lastInfo = farmPanelGetLastInfo();
  const farmId = Number(lastInfo.id);
  if (!Number.isFinite(farmId) || farmId <= 0) return null;
  const g = farmSyncExtractGameState(json);
  const farmActivity = farmPanelField(g, "farmActivity");
  if (!farmActivity || typeof farmActivity !== "object") return null;
  const itemId = CRIMSTONE_KNOWN_IDS["Crimstone Rock"];
  const counter = typeof farmActivity["Crimstone Mined"] === "number" ? farmActivity["Crimstone Mined"] : 0;
  return {
    farmId: farmId,
    itemId: itemId,
    counter: counter
  };
}

function farmPanelBuildSequentialCrimstoneRollChains(json, count) {
  const ctx = farmPanelGetCrimstonePrngContext(json);
  if (!ctx) return null;
  if (count <= 0) return [];
  const {farmId: farmId, itemId: itemId, counter: baseCounter} = ctx;
  const clamOwned = isBoostActive("crimstone_clam");
  const rollAt = counter => {
    const instantHit = clamOwned && sflPrngChance({
      farmId: farmId,
      itemId: itemId,
      counter: counter,
      chance: 10,
      criticalHitName: "Crimstone Clam"
    });
    return {
      counter: counter,
      instantHit: instantHit
    };
  };
  const MAX_CHAIN_LENGTH = 500;
  let counter = baseCounter;
  const chains = [];
  for (let i = 0; i < count; i++) {
    const chain = [];
    let roll = rollAt(counter);
    chain.push(roll);
    counter++;
    while (roll.instantHit && chain.length < MAX_CHAIN_LENGTH) {
      roll = rollAt(counter);
      chain.push(roll);
      counter++;
    }
    chains.push(chain);
  }
  return chains;
}

export function farmPanelCropTierLabel(cropName) {
  const sec = CROP_HARVEST_SEC[cropName];
  if (sec == null) return null;
  if (sec <= CROP_HARVEST_SEC.Pumpkin) return "Basic";
  if (sec >= CROP_HARVEST_SEC.Eggplant) return "Advanced";
  return "Medium";
}

function farmPanelSumCatalogBoosts(matchFn, excludeIds) {
  let add = 0, mult = 1;
  const boosts = [];
  const budGroups = {};
  BOOSTS.forEach(b => {
    if (!b || excludeIds.has(b.id) || !matchFn(b)) return;
    const active = b.skillTier ? isSkillActive(b.id) : isBoostActive(b.id);
    if (!active) return;
    if (typeof b.yieldMult === "number") {
      mult *= b.yieldMult;
      boosts.push(b);
    }
    if (typeof b.yieldAdd !== "number") return;
    if (b.isBud && b.budId) {
      if (!budGroups[b.budId]) budGroups[b.budId] = {
        total: 0,
        entries: []
      };
      budGroups[b.budId].total += b.yieldAdd;
      budGroups[b.budId].entries.push(b);
    } else {
      add += b.yieldAdd;
      boosts.push(b);
    }
  });
  const budGroupList = Object.values(budGroups);
  if (budGroupList.length) {
    const winner = budGroupList.reduce((best, g) => g.total > best.total ? g : best, budGroupList[0]);
    add += winner.total;
    boosts.push(...winner.entries);
  }
  return {
    add: add,
    mult: mult,
    boosts: boosts
  };
}

export function farmPanelComputeExactCrimstoneYield(g, rock, minesLeftOverride, allowStreakBonus) {
  let amount = 1;
  const boosts = [];
  if (isBoostActive("crimson_carp")) {
    amount += .05;
    boosts.push({
      name: "Crimson Carp",
      valueText: "+0.05 yield"
    });
  }
  if (isBoostActive("crim_peckster")) {
    amount += .1;
    boosts.push({
      name: "Crim Peckster",
      valueText: "+0.1 yield"
    });
  }
  if (isBoostActive("crimstone_armor")) {
    amount += .1;
    boosts.push({
      name: "Crimstone Armor",
      valueText: "+0.1 yield"
    });
  }
  const minesLeft = minesLeftOverride != null ? minesLeftOverride : rock && typeof rock.minesLeft === "number" ? rock.minesLeft : 5;
  if (minesLeft === 1 && allowStreakBonus !== false) {
    if (isBoostActive("crimstone_hammer")) {
      amount += 2;
      boosts.push({
        name: "Crimstone Hammer",
        valueText: "+2 yield (5th mine)"
      });
    }
    if (isSkillActive("skill_fire_kissed")) {
      const rank = getAscensionRank("skill_fire_kissed");
      const values = ASCENSION_RANK_DATA.skill_fire_kissed && ASCENSION_RANK_DATA.skill_fire_kissed.values || [ 1, 1.35, 1.75 ];
      const v = values[Math.min(Math.max(rank, 1), values.length) - 1];
      amount += v;
      boosts.push({
        name: "Fire Kissed",
        valueText: `+${fmt(v)} yield (5th mine)`
      });
    }
    amount += 2;
    boosts.push({
      name: "5th Mine Streak",
      valueText: "+2 yield (guaranteed)"
    });
  }
  return {
    amount: amount,
    boosts: boosts
  };
}

function farmPanelComputeExactOilYield(hasBonus) {
  let amount = OIL_SINGLE_HARVEST_BASE;
  const boosts = [];
  if (hasBonus) {
    amount += OIL_BONUS_DROP_AMOUNT;
    boosts.push({
      name: "Bonus Drill (3rd Mine)",
      valueText: `+${fmt(OIL_BONUS_DROP_AMOUNT)} yield (guaranteed)`
    });
    if (isBoostActive("stag_shrine")) {
      amount += 15;
      boosts.push({
        name: "Stag Shrine",
        valueText: "+15 yield (3rd mine)"
      });
    }
  }
  if (isBoostActive("battle_fish")) {
    amount += .05;
    boosts.push({
      name: "Battle Fish",
      valueText: "+0.05 yield"
    });
  }
  if (isBoostActive("knight_chicken")) {
    amount += .1;
    boosts.push({
      name: "Knight Chicken",
      valueText: "+0.1 yield"
    });
  }
  if (isBoostActive("oil_can")) {
    amount += 2;
    boosts.push({
      name: "Oil Can",
      valueText: "+2 yield"
    });
  }
  if (isBoostActive("oil_overalls")) {
    amount += 10;
    boosts.push({
      name: "Oil Overalls",
      valueText: "+10 yield"
    });
  }
  if (isBoostActive("oil_gallon")) {
    amount += 5;
    boosts.push({
      name: "Oil Gallon",
      valueText: "+5 yield"
    });
  }
  if (isSkillActive("skill_oil_extraction")) {
    const rank = getAscensionRank("skill_oil_extraction");
    const values = ASCENSION_RANK_DATA.skill_oil_extraction && ASCENSION_RANK_DATA.skill_oil_extraction.values || [ 1, 1.5, 2 ];
    const v = values[Math.min(Math.max(rank, 1), values.length) - 1];
    amount += v;
    boosts.push({
      name: "Oil Extraction",
      valueText: `+${fmt(v)} yield`
    });
  }
  return {
    amount: amount,
    boosts: boosts
  };
}

export function farmPanelComputeExactFlowerYield(flowerJob) {
  let amount = 1;
  const boosts = [];
  const crit = flowerJob && flowerJob.criticalHit || {};
  if (isBoostActive("humming_bird") && crit["Humming Bird"]) {
    amount += 1;
    boosts.push({
      name: "Humming Bird",
      valueText: "+1 yield (crit)"
    });
  }
  if (isBoostActive("butterfly") && crit["Butterfly"]) {
    amount += 1;
    boosts.push({
      name: "Butterfly",
      valueText: "+1 yield (crit)"
    });
  }
  if (isBoostActive("desert_rose") && crit["Desert Rose"]) {
    amount += 1;
    boosts.push({
      name: "Desert Rose",
      valueText: "+1 yield (crit)"
    });
  }
  if (isBoostActive("chicory") && crit["Chicory"]) {
    amount += 1;
    boosts.push({
      name: "Chicory",
      valueText: "+1 yield (crit)"
    });
  }
  if (isBoostActive("salt_crystal_flower") && crit["Salt Crystal Flower"]) {
    amount += 1;
    boosts.push({
      name: "Salt Crystal Flower",
      valueText: "+1 yield (crit)"
    });
  }
  if (isBoostActive("moth_shrine") && crit["Moth Shrine"]) {
    amount += 1;
    boosts.push({
      name: "Moth Shrine",
      valueText: "+1 yield (crit)"
    });
  }
  if (isSkillActive("skill_petalled_perk") && crit["Petalled Perk"]) {
    amount += 1;
    boosts.push({
      name: "Petalled Perk",
      valueText: "+1 yield (crit)"
    });
  }
  if (isBoostActive("legendary_shrine_flower")) {
    amount += 1;
    boosts.push({
      name: "Legendary Shrine Flower",
      valueText: "+1 yield"
    });
  }
  return {
    amount: amount,
    boosts: boosts
  };
}

export function farmPanelAOEExtent(rankSkillId) {
  if (rankSkillId && isSkillActive(rankSkillId)) {
    const rank = getAscensionRank(rankSkillId);
    return CROP_AOE_RANKS[Math.min(Math.max(rank, 1), 3) - 1];
  }
  return {
    xLeft: 1,
    xRight: 1,
    depth: 3
  };
}

export function farmPanelGnomeAOEBonus(g, plot, cooldownSec, atTime) {
  const plotCoords = farmSyncGetCoords(plot);
  if (!plotCoords) return false;
  const gnomePos = farmPanelGetCollectiblePosition(g, "Gnome");
  const cobaltPos = farmPanelGetCollectiblePosition(g, "Cobalt");
  const clementinePos = farmPanelGetCollectiblePosition(g, "Clementine");
  if (!gnomePos || !cobaltPos || !clementinePos) return false;
  const isCobaltLeftOfGnome = cobaltPos.y === gnomePos.y && cobaltPos.x + 1 === gnomePos.x;
  const isClementineRightOfGnome = clementinePos.y === gnomePos.y && clementinePos.x - 1 === gnomePos.x;
  if (!isCobaltLeftOfGnome || !isClementineRightOfGnome) return false;
  const isPlotDirectlyAboveGnome = plotCoords.x === gnomePos.x && plotCoords.y === gnomePos.y - 1;
  if (!isPlotDirectlyAboveGnome) return false;
  const aoeState = farmPanelField(g, "aoe") || {};
  const lastUsed = aoeState["Gnome"] && aoeState["Gnome"][0] && typeof aoeState["Gnome"][0][1] === "number" ? aoeState["Gnome"][0][1] : 0;
  const referenceTime = typeof atTime === "number" ? atTime : Date.now();
  const idleMs = referenceTime - lastUsed;
  return idleMs >= cooldownSec * 1e3;
}

function farmPanelCropAOEBonus(g, collectibleName, plot, dims, rankSkillId, cooldownSec, atTime) {
  const plotCoords = farmSyncGetCoords(plot);
  if (!plotCoords) return false;
  const pos = farmPanelGetCollectiblePosition(g, collectibleName);
  if (!pos) return false;
  const {width: width, height: height} = dims;
  const px = plotCoords.x, py = plotCoords.y;
  let within = false;
  if (collectibleName === "Basic Scarecrow" || collectibleName === "Scary Mike" || collectibleName === "Laurie the Chuckle Crow") {
    const e = farmPanelAOEExtent(rankSkillId);
    within = px >= pos.x - e.xLeft && px <= pos.x + e.xRight && py <= pos.y - height && py >= pos.y - height - (e.depth - 1);
  } else if (collectibleName === "Sir Goldensnout") {
    const drx = px - pos.x, dry = py - pos.y;
    within = drx >= -1 && drx <= width && dry <= 1 && dry >= -height;
  } else if (collectibleName === "Queen Cornelia") {
    within = px >= pos.x - 1 && px <= pos.x + width && py <= pos.y + 1 && py >= pos.y - height;
  }
  if (!within) return false;
  const dx = px - pos.x, dy = py - pos.y;
  const aoeState = farmPanelField(g, "aoe") || {};
  const lastUsed = aoeState[collectibleName] && aoeState[collectibleName][dx] && typeof aoeState[collectibleName][dx][dy] === "number" ? aoeState[collectibleName][dx][dy] : 0;
  const referenceTime = typeof atTime === "number" ? atTime : Date.now();
  const idleMs = referenceTime - lastUsed;
  return idleMs >= cooldownSec * 1e3;
}

export function farmPanelGetCropGrowDurationMsFromSync(job, cropName) {
  const baseSec = farmPanelGrowTimeSec(cropName);
  const baseMs = (typeof baseSec === "number" ? baseSec : 0) * 1e3;
  if (!job) return baseMs;
  if (typeof job.baseDurationMs === "number") {
    const boosted = farmPanelGetBoostedYieldStats(cropName);
    const boostedMs = typeof boosted.timeVal === "number" ? boosted.timeVal * 1e3 : baseMs;
    const ratio = baseMs > 0 ? boostedMs / baseMs : 1;
    return job.baseDurationMs * ratio;
  }
  return baseMs - (typeof job.boostedTime === "number" ? job.boostedTime : 0);
}

let farmPanelCropYieldExcludedSet = null;

function farmPanelCropYieldExcluded() {
  if (!farmPanelCropYieldExcludedSet) farmPanelCropYieldExcludedSet = new Set([ ...CROP_PRNG_EXCLUDE, "power_hour", "power_hour_greenhouse" ]);
  return farmPanelCropYieldExcludedSet;
}

function farmPanelPowerHourYieldAt(atTime, isGreenhouse) {
  if (!isBoostActive(isGreenhouse ? "power_hour_greenhouse" : "power_hour")) return false;
  const win = getPowerHourWindow();
  if (!win) return true;
  const nowMs = Date.now();
  const t = Math.max(typeof atTime === "number" ? atTime : nowMs, nowMs);
  return t >= win.startedAt && t < win.expiresAt;
}

function farmPanelCropRemainingSec(job, refTime, now, growSec) {
  const elapsedSec = (now - refTime) / 1e3;
  const plain = Math.max(0, growSec - elapsedSec);
  if (plain <= 0 || !job || typeof job.baseDurationMs !== "number" || !isBoostActive("power_hour")) return plain;
  const win = getPowerHourWindow();
  if (!win) return plain;
  const overlapStart = Math.max(refTime, win.startedAt);
  const overlapEnd = Math.min(now, win.expiresAt);
  const accruedExtraSec = Math.max(0, overlapEnd - overlapStart) / 1e3;
  const workLeft = Math.max(0, growSec - elapsedSec - accruedExtraSec);
  if (workLeft <= 0) return 0;
  const windowLeftSec = Math.max(0, (win.expiresAt - Math.max(now, win.startedAt)) / 1e3);
  if (now < win.startedAt || windowLeftSec <= 0) return workLeft;
  return workLeft <= 2 * windowLeftSec ? workLeft / 2 : windowLeftSec + (workLeft - 2 * windowLeftSec);
}

export function farmPanelComputeExactCropYield(json, g, cropName, plot, counter, isGreenhouse, atTime) {
  const lastInfo = farmPanelGetLastInfo();
  const farmId = Number(lastInfo.id);
  const tierLabel = farmPanelCropTierLabel(cropName);
  const itemId = CROP_KNOWN_IDS[cropName];
  let amount = 1;
  const boosts = [];
  if (Number.isFinite(farmId) && farmId > 0 && itemId) {
    if (isBoostActive("green_amulet") && sflPrngChance({
      farmId: farmId,
      itemId: itemId,
      counter: counter,
      chance: 10,
      criticalHitName: "Green Amulet"
    })) {
      amount *= 10;
      boosts.push({
        name: "Green Amulet",
        valueText: "×10 yield (crit)"
      });
    }
  }
  if (cropName === "Cauliflower" && isBoostActive("golden_cauliflower")) {
    amount *= 2;
    boosts.push({
      name: "Golden Cauliflower",
      valueText: "×2 yield"
    });
  }
  if (cropName === "Carrot" && isBoostActive("easter_bunny")) {
    amount *= 1.2;
    boosts.push({
      name: "Easter Bunny",
      valueText: "×1.2 yield"
    });
  }
  if (cropName === "Pumpkin" && isBoostActive("victoria_sisters")) {
    amount *= 1.2;
    boosts.push({
      name: "Victoria Sisters",
      valueText: "×1.2 yield"
    });
  }
  if (cropName === "Beetroot" && isBoostActive("beetroot_amulet")) {
    amount *= 1.2;
    boosts.push({
      name: "Beetroot Amulet",
      valueText: "×1.2 yield"
    });
  }
  if (cropName === "Sunflower" && isBoostActive("sunflower_amulet")) {
    amount *= 1.1;
    boosts.push({
      name: "Sunflower Amulet",
      valueText: "×1.1 yield"
    });
  }
  if (isBoostActive("scarecrow") || isBoostActive("kuebiko")) {
    amount *= 1.2;
    boosts.push({
      name: isBoostActive("scarecrow") ? "Scarecrow" : "Kuebiko",
      valueText: "×1.2 yield"
    });
  }
  if (isBoostActive("coder")) {
    amount *= 1.2;
    boosts.push({
      name: "Coder",
      valueText: "×1.2 yield"
    });
  }
  const generic = farmPanelSumCatalogBoosts(b => (b.scope === "crop" && b.target === cropName || b.scope === "tier" && b.target === tierLabel || b.scope === "global" && b.category === "crops" && (b.target === null || b.target === undefined)) && !(isGreenhouse && CROPS_GLOBAL_EXCLUDED_FROM_GREENHOUSE.has(b.id)) && (b.id !== "hoot" || !isGreenhouse || cropName === "Rice"), farmPanelCropYieldExcluded());
  if (generic.mult !== 1) amount *= generic.mult;
  generic.boosts.forEach(b => {
    const parts = [];
    if (typeof b.yieldAdd === "number" && b.yieldAdd) parts.push(`+${fmt(b.yieldAdd)} yield`);
    if (typeof b.yieldMult === "number" && b.yieldMult !== 1) parts.push(`×${b.yieldMult} yield`);
    if (parts.length) boosts.push({
      name: b.name,
      valueText: parts.join(", ")
    });
  });
  if (Number.isFinite(farmId) && farmId > 0 && itemId) {
    if (cropName === "Potato" && isBoostActive("peeled_potato") && sflPrngChance({
      farmId: farmId,
      itemId: itemId,
      counter: counter,
      chance: 20,
      criticalHitName: "Peeled Potato"
    })) {
      amount += 1;
      boosts.push({
        name: "Peeled Potato",
        valueText: "+1 yield (crit)"
      });
    }
    if (cropName === "Potato" && isBoostActive("potent_potato") && sflPrngChance({
      farmId: farmId,
      itemId: itemId,
      counter: counter,
      chance: 10 / 3,
      criticalHitName: "Potent Potato"
    })) {
      amount += 10;
      boosts.push({
        name: "Potent Potato",
        valueText: "+10 yield (crit)"
      });
    }
    if (cropName === "Sunflower" && isBoostActive("stellar_sunflower") && sflPrngChance({
      farmId: farmId,
      itemId: itemId,
      counter: counter,
      chance: 10 / 3,
      criticalHitName: "Stellar Sunflower"
    })) {
      amount += 10;
      boosts.push({
        name: "Stellar Sunflower",
        valueText: "+10 yield (crit)"
      });
    }
    if (cropName === "Radish" && isBoostActive("radical_radish") && sflPrngChance({
      farmId: farmId,
      itemId: itemId,
      counter: counter,
      chance: 10 / 3,
      criticalHitName: "Radical Radish"
    })) {
      amount += 10;
      boosts.push({
        name: "Radical Radish",
        valueText: "+10 yield (crit)"
      });
    }
  }
  const cropAoeCooldownSec = farmPanelGetCropGrowDurationMsFromSync(plot && plot.crop, cropName) / 1e3;
  if (isSkillActive("skill_chonky_scarecrow") && tierLabel === "Basic" && farmPanelCropAOEBonus(g, "Basic Scarecrow", plot, {
    width: 1,
    height: 1
  }, "skill_chonky_scarecrow", cropAoeCooldownSec, atTime)) {
    const rank = getAscensionRank("skill_chonky_scarecrow");
    const bonuses = ASCENSION_RANK_DATA.skill_chonky_scarecrow && ASCENSION_RANK_DATA.skill_chonky_scarecrow.values || [ 0, .05, .1 ];
    const v = bonuses[Math.min(Math.max(rank, 1), 3) - 1];
    amount += v;
    boosts.push({
      name: "Basic Scarecrow",
      valueText: `+${fmt(v)} yield (AOE)`
    });
  }
  if (tierLabel === "Medium" && isBoostActive("scary_mike") && farmPanelCropAOEBonus(g, "Scary Mike", plot, {
    width: 1,
    height: 1
  }, "skill_horror_mike", cropAoeCooldownSec, atTime)) {
    const v = isSkillActive("skill_horror_mike") ? .2 + (ASCENSION_RANK_DATA.skill_horror_mike && ASCENSION_RANK_DATA.skill_horror_mike.values || [ .1, .15, .2 ])[Math.min(Math.max(getAscensionRank("skill_horror_mike"), 1), 3) - 1] : .2;
    amount += v;
    boosts.push({
      name: "Scary Mike",
      valueText: `+${fmt(v)} yield (AOE)`
    });
  }
  if (isBoostActive("sir_goldensnout") && farmPanelCropAOEBonus(g, "Sir Goldensnout", plot, {
    width: 2,
    height: 2
  }, null, cropAoeCooldownSec, atTime)) {
    amount += .5;
    boosts.push({
      name: "Sir Goldensnout",
      valueText: "+0.5 yield (AOE)"
    });
  }
  if (tierLabel === "Advanced" && isBoostActive("laurie_chuckle_crow") && farmPanelCropAOEBonus(g, "Laurie the Chuckle Crow", plot, {
    width: 1,
    height: 1
  }, "skill_lauries_gains", cropAoeCooldownSec, atTime)) {
    const v = isSkillActive("skill_lauries_gains") ? .2 + (ASCENSION_RANK_DATA.skill_lauries_gains && ASCENSION_RANK_DATA.skill_lauries_gains.values || [ .1, .15, .2 ])[Math.min(Math.max(getAscensionRank("skill_lauries_gains"), 1), 3) - 1] : .2;
    amount += v;
    boosts.push({
      name: "Laurie the Chuckle Crow",
      valueText: `+${fmt(v)} yield (AOE)`
    });
  }
  if (cropName === "Corn" && isBoostActive("queen_cornelia") && farmPanelCropAOEBonus(g, "Queen Cornelia", plot, {
    width: 1,
    height: 2
  }, null, cropAoeCooldownSec, atTime)) {
    amount += 1;
    boosts.push({
      name: "Queen Cornelia",
      valueText: "+1 yield (AOE)"
    });
  }
  if ((tierLabel === "Medium" || tierLabel === "Advanced") && farmPanelGnomeAOEBonus(g, plot, cropAoeCooldownSec, atTime)) {
    amount += 10;
    boosts.push({
      name: "Gnome",
      valueText: "+10 yield (AOE combo)"
    });
  }
  amount += generic.add;
  if (farmPanelPowerHourYieldAt(atTime, isGreenhouse)) {
    amount += .2;
    boosts.push({
      name: "Power hour",
      valueText: "+0.2 yield"
    });
  }
  const plotFertiliserName = plot && plot.fertiliser && plot.fertiliser.name;
  const cropFertBoostDef = plotFertiliserName ? BOOSTS.find(b => b.fertilizer === plotFertiliserName && b.composterFertilizer) : null;
  const cropFertTimeMult = cropFertBoostDef && typeof cropFertBoostDef.timeMult === "number" ? cropFertBoostDef.timeMult : 1;
  if (plotFertiliserName === "Sprout Mix" || plotFertiliserName === "Sproutroot Surprise") {
    amount += .2;
    boosts.push({
      name: plotFertiliserName,
      valueText: "+0.2 yield (fertiliser)",
      timeMult: cropFertTimeMult !== 1 ? cropFertTimeMult : undefined
    });
    if (isBoostActive("knowledge_crab")) {
      amount += .2;
      boosts.push({
        name: "Knowledge Crab",
        valueText: "+0.2 yield (doubles fertiliser)"
      });
    }
  } else if (plotFertiliserName === "Rapid Root" && cropFertTimeMult !== 1) {
    boosts.push({
      name: plotFertiliserName,
      valueText: "no yield change (fertiliser)",
      timeMult: cropFertTimeMult
    });
  }
  if (plot && plot.beeSwarm && typeof plot.beeSwarm.count === "number" && plot.beeSwarm.count > 0) {
    const perSwarm = getBeeSwarmPerSwarmYield();
    const total = perSwarm * plot.beeSwarm.count;
    amount += total;
    boosts.push({
      name: "Bee Swarm",
      valueText: `+${fmt(total)} yield (${plot.beeSwarm.count} swarm${plot.beeSwarm.count === 1 ? "" : "s"} on this plot${isSkillActive("skill_pollen_power_up") ? " · incl. Pollen Power Up" : ""})`
    });
  }
  if (tierLabel) {
    if (isSkillActive("skill_acre_farm")) {
      const rank = getAscensionRank("skill_acre_farm");
      const data = ASCENSION_RANK_DATA.skill_acre_farm.values;
      const idx = Math.min(Math.max(rank, 1), 3) - 1;
      const v = tierLabel === "Advanced" ? data["tierEffects.Advanced"][idx] : data["tierEffects." + tierLabel][idx];
      amount += v;
      boosts.push({
        name: "Acre Farm",
        valueText: `${v > 0 ? "+" : ""}${fmt(v)} yield`
      });
    }
    if (isSkillActive("skill_hectare_farm")) {
      const rank = getAscensionRank("skill_hectare_farm");
      const data = ASCENSION_RANK_DATA.skill_hectare_farm.values;
      const idx = Math.min(Math.max(rank, 1), 3) - 1;
      const v = tierLabel === "Advanced" ? data["tierEffects.Advanced"][idx] : data["tierEffects." + tierLabel][idx];
      amount += v;
      boosts.push({
        name: "Hectare Farm",
        valueText: `${v > 0 ? "+" : ""}${fmt(v)} yield`
      });
    }
  }
  if (isOvernightGroundCrop(cropName) && isBoostActive("hoot")) {
    amount += .5;
    boosts.push({
      name: "Hoot",
      valueText: "+0.5 yield"
    });
  }
  if (!isGreenhouse && currentSeason === "Spring" && isCropInSeason(cropName, "Spring") && isBoostActive("blossom_ward")) {
    amount += 1;
    boosts.push({
      name: "Blossom Ward",
      valueText: "+1 yield"
    });
  }
  if (!isGreenhouse && currentSeason === "Winter" && isCropInSeason(cropName, "Winter") && isBoostActive("frozen_heart")) {
    amount += 1;
    boosts.push({
      name: "Frozen Heart",
      valueText: "+1 yield"
    });
  }
  const budAdd = farmPanelGetBudYieldForResource(cropName) || 0;
  if (budAdd) {
    amount += budAdd;
    boosts.push({
      name: "Resource BUD",
      valueText: `+${fmt(budAdd)} yield`
    });
  }
  if (isBoostActive("insect_plague")) {
    amount *= .5;
    boosts.push({
      name: "Insect Plague",
      valueText: "×0.5 yield"
    });
  }
  if (isBoostActive("bountiful_harvest")) {
    amount += 1;
    boosts.push({
      name: "Bountiful Harvest",
      valueText: "+1 yield"
    });
    if (getActiveSeasonGuardianName()) {
      amount += 1;
      boosts.push({
        name: currentSeason + " Guardian",
        valueText: "+1 yield (doubles Bountiful Harvest)"
      });
    }
  }
  let seedReward = null;
  if (!isGreenhouse && Number.isFinite(farmId) && farmId > 0 && itemId) {
    const gotSeedDrop = sflPrngChance({
      farmId: farmId,
      itemId: itemId,
      counter: counter,
      chance: 5,
      criticalHitName: cropName
    });
    if (gotSeedDrop) {
      const seedName = cropName + " Seed";
      const isTwoSeeds = sflPrngChance({
        farmId: farmId,
        itemId: itemId,
        counter: counter,
        chance: 50,
        criticalHitName: seedName
      });
      seedReward = {
        seedName: seedName,
        amount: isTwoSeeds ? 2 : 3
      };
    }
  }
  return {
    amount: Math.round(amount * 1e4) / 1e4,
    boosts: boosts,
    seedReward: seedReward
  };
}

export function farmPanelComputeExactFruitYield(json, g, fruitName, counter, isGreenhouse, patchFertiliserName) {
  const lastInfo = farmPanelGetLastInfo();
  const farmId = Number(lastInfo.id);
  const itemId = FRUIT_KNOWN_IDS[fruitName];
  let amount = 1;
  const boosts = [];
  if (Number.isFinite(farmId) && farmId > 0 && itemId && !isGreenhouse && isSkillActive("skill_generous_orchard")) {
    const rank = getAscensionRank("skill_generous_orchard");
    const chances = [ 20, 30, 50 ];
    const chance = chances[Math.min(Math.max(rank, 1), 3) - 1];
    if (sflPrngChance({
      farmId: farmId,
      itemId: itemId,
      counter: counter,
      chance: chance,
      criticalHitName: "Generous Orchard"
    })) {
      amount += 1;
      boosts.push({
        name: "Generous Orchard",
        valueText: "+1 yield (crit)"
      });
    }
  }
  const fruitExcludeIds = isGreenhouse ? new Set([ ...FRUIT_PRNG_EXCLUDE, ...PATCH_FRUIT_ONLY_GLOBAL_BOOSTS_EXCLUDED_FROM_GREENHOUSE ]) : FRUIT_PRNG_EXCLUDE;
  const generic = farmPanelSumCatalogBoosts(b => b.scope === "fruit" && b.target === fruitName || b.category === "fruits" && b.scope === "global" || b.category === "fruits" && b.scope === "fruitList" && Array.isArray(b.fruits) && b.fruits.includes(fruitName), fruitExcludeIds);
  amount += generic.add;
  amount *= generic.mult;
  generic.boosts.forEach(b => {
    const parts = [];
    if (typeof b.yieldAdd === "number" && b.yieldAdd) parts.push(`+${fmt(b.yieldAdd)} yield`);
    if (typeof b.yieldMult === "number" && b.yieldMult !== 1) parts.push(`×${b.yieldMult} yield`);
    if (parts.length) boosts.push({
      name: b.name,
      valueText: parts.join(", ")
    });
  });
  if (!isGreenhouse && (patchFertiliserName === "Fruitful Blend" || patchFertiliserName === "Turbofruit Mix")) {
    let fertBonus = .1;
    let fruitfulBountyMult = 1;
    if (isSkillActive("skill_fruitful_bounty")) {
      const rank = getAscensionRank("skill_fruitful_bounty");
      const values = ASCENSION_RANK_DATA.skill_fruitful_bounty.values;
      fruitfulBountyMult = values[Math.min(Math.max(rank, 1), values.length) - 1];
      fertBonus *= fruitfulBountyMult;
    }
    amount += fertBonus;
    const fertBoostDef = BOOSTS.find(b => b.fertilizer === patchFertiliserName && b.composterFertilizer);
    const fertTimeMult = fertBoostDef && typeof fertBoostDef.timeMult === "number" ? fertBoostDef.timeMult : 1;
    boosts.push({
      name: patchFertiliserName,
      valueText: `+${fmt(fertBonus)} yield (fertiliser${isSkillActive("skill_fruitful_bounty") ? ` · ×${fmt(fruitfulBountyMult)} by Fruitful Bounty` : ""})`,
      timeMult: fertTimeMult !== 1 ? fertTimeMult : undefined
    });
  }
  const budAdd = farmPanelGetBudYieldForResource(fruitName) || 0;
  if (budAdd) {
    amount += budAdd;
    boosts.push({
      name: "Resource BUD",
      valueText: `+${fmt(budAdd)} yield`
    });
  }
  if (isBoostActive("bountiful_harvest")) {
    amount += 1;
    boosts.push({
      name: "Bountiful Harvest",
      valueText: "+1 yield"
    });
    if (getActiveSeasonGuardianName()) {
      amount += 1;
      boosts.push({
        name: currentSeason + " Guardian",
        valueText: "+1 yield (doubles Bountiful Harvest)"
      });
    }
  }
  return {
    amount: Math.round(amount * 1e4) / 1e4,
    boosts: boosts
  };
}

export function farmPanelComputeExactGreenhouseYield(json, g, plantName, counter, potFertiliserName, atTime) {
  const isFruit = plantName === "Grape";
  const base = isFruit ? farmPanelComputeExactFruitYield(json, g, plantName, counter, true) : farmPanelComputeExactCropYield(json, g, plantName, null, counter, true, atTime);
  let amount = base.amount;
  const boosts = base.boosts.slice();
  const generic = farmPanelSumCatalogBoosts(b => b.scope === "greenhouse" && b.target === plantName || b.category === "greenhouse" && b.scope === "global", new Set([ "skill_greenhouse_gamble", "apply_greenhouse_goodie", "power_hour_greenhouse" ]));
  amount += generic.add;
  amount *= generic.mult;
  generic.boosts.forEach(b => {
    const parts = [];
    if (typeof b.yieldAdd === "number" && b.yieldAdd) parts.push(`+${fmt(b.yieldAdd)} yield`);
    if (typeof b.yieldMult === "number" && b.yieldMult !== 1) parts.push(`×${b.yieldMult} yield`);
    if (parts.length) boosts.push({
      name: b.name,
      valueText: parts.join(", ")
    });
  });
  if (isSkillActive("skill_greenhouse_gamble")) {
    const lastInfo = farmPanelGetLastInfo();
    const farmId = Number(lastInfo.id);
    const itemId = CROP_KNOWN_IDS[plantName] || FRUIT_KNOWN_IDS[plantName];
    if (Number.isFinite(farmId) && farmId > 0 && itemId) {
      const rank = getAscensionRank("skill_greenhouse_gamble");
      const chances = [ 30, 40, 50 ];
      if (sflPrngChance({
        farmId: farmId,
        itemId: itemId,
        counter: counter,
        chance: chances[Math.min(Math.max(rank, 1), 3) - 1],
        criticalHitName: "Greenhouse Gamble"
      })) {
        amount += 1;
        boosts.push({
          name: "Greenhouse Gamble",
          valueText: "+1 yield (crit)"
        });
      }
    }
  }
  if (potFertiliserName === "Greenhouse Goodie") {
    amount += .2;
    boosts.push({
      name: "Greenhouse Goodie",
      valueText: "+0.2 yield (fertiliser)"
    });
  } else if (potFertiliserName === "Greenhouse Glow") {
    const glowBoostDef = BOOSTS.find(b => b.fertilizer === "Greenhouse Glow" && b.composterFertilizer);
    const glowTimeMult = glowBoostDef && typeof glowBoostDef.timeMult === "number" ? glowBoostDef.timeMult : 1;
    if (glowTimeMult !== 1) {
      boosts.push({
        name: "Greenhouse Glow",
        valueText: "no yield change (fertiliser)",
        timeMult: glowTimeMult
      });
    }
  }
  return {
    amount: Math.round(amount * 1e4) / 1e4,
    boosts: boosts
  };
}

function farmPanelPredictTreeTurnaroundForType(json, treeType) {
  if (!isSkillActive("skill_tree_turnaround")) return null;
  const rank = getAscensionRank("skill_tree_turnaround");
  const values = ASCENSION_RANK_DATA.skill_tree_turnaround.values;
  const chance = values[Math.min(Math.max(rank, 1), values.length) - 1];
  return farmPanelPredictTreeTypeRoll(json, treeType, "Tree Turnaround", chance);
}

function farmPanelPredictMoneyTreeForType(json, treeType) {
  if (!isSkillActive("skill_money_tree")) return null;
  const rank = getAscensionRank("skill_money_tree");
  const values = ASCENSION_RANK_DATA.skill_money_tree.values;
  const chance = values[Math.min(Math.max(rank, 1), values.length) - 1];
  return farmPanelPredictTreeTypeRoll(json, treeType, "Money Tree", chance);
}

function farmPanelPredictMoneyTreeBatchForType(json, treeType, count, multiplier) {
  if (!isSkillActive("skill_money_tree")) return null;
  const mult = typeof multiplier === "number" && multiplier > 0 ? multiplier : 1;
  if (!(count > 0)) return {
    procCount: 0,
    coins: 0
  };
  const lastInfo = farmPanelGetLastInfo();
  const farmId = Number(lastInfo.id);
  if (!Number.isFinite(farmId) || farmId <= 0) return null;
  const g = farmSyncExtractGameState(json);
  const farmActivity = farmPanelField(g, "farmActivity");
  if (!farmActivity || typeof farmActivity !== "object") return null;
  const itemId = TREE_KNOWN_IDS[treeType];
  if (!itemId) return null;
  const rank = getAscensionRank("skill_money_tree");
  const values = ASCENSION_RANK_DATA.skill_money_tree.values;
  const chance = values[Math.min(Math.max(rank, 1), values.length) - 1];
  const activityKey = `${treeType === "Tree" ? "Basic Tree" : treeType} Chopped`;
  const baseCounter = typeof farmActivity[activityKey] === "number" ? farmActivity[activityKey] : 0;
  let procCount = 0;
  for (let i = 0; i < count; i++) {
    if (sflPrngChance({
      farmId: farmId,
      itemId: itemId,
      counter: baseCounter + i,
      chance: chance,
      criticalHitName: "Money Tree"
    })) procCount++;
  }
  return {
    procCount: procCount,
    coins: procCount * 200 * mult
  };
}

export function farmPanelDetectMoneyTreeBonus(json) {
  const g = farmSyncExtractGameState(json);
  const trees = farmPanelField(g, "trees");
  if (!trees || typeof trees !== "object") return {
    totalCoins: 0,
    count: 0,
    predictedTypes: [],
    predictedCoins: 0,
    batchPredictions: []
  };
  let totalCoins = 0, count = 0;
  const nodeCountByType = {};
  const multiplierByType = {};
  Object.values(trees).forEach(node => {
    const nodeMultiplier = node && typeof node.multiplier === "number" ? node.multiplier : 1;
    const reward = node && node.wood && node.wood.reward;
    const coins = reward && typeof reward.coins === "number" ? reward.coins : 0;
    if (coins > 0) {
      totalCoins += coins * nodeMultiplier;
      count++;
    }
    const type = farmPanelTreeTypeForNode(node);
    nodeCountByType[type] = (nodeCountByType[type] || 0) + 1;
    if (!(type in multiplierByType)) multiplierByType[type] = nodeMultiplier;
  });
  const predictedTypes = [];
  const batchPredictions = [];
  Object.keys(nodeCountByType).forEach(type => {
    if (farmPanelPredictMoneyTreeForType(json, type) === true) predictedTypes.push(type);
    const batch = farmPanelPredictMoneyTreeBatchForType(json, type, nodeCountByType[type], multiplierByType[type]);
    if (batch && batch.procCount > 0) {
      batchPredictions.push({
        type: type,
        nodeCount: nodeCountByType[type],
        procCount: batch.procCount,
        coins: batch.coins,
        multiplier: multiplierByType[type]
      });
    }
  });
  const predictedCoins = predictedTypes.reduce((sum, type) => sum + 200 * (multiplierByType[type] || 1), 0);
  return {
    totalCoins: totalCoins,
    count: count,
    predictedTypes: predictedTypes,
    predictedCoins: predictedCoins,
    batchPredictions: batchPredictions
  };
}

export function farmPanelRenderMoneyTreeBonusCard(data) {
  const hasBatch = data && data.batchPredictions && data.batchPredictions.length > 0;
  if (!data || !(data.totalCoins > 0 || data.predictedCoins > 0 || hasBatch)) return "";
  const parts = [];
  if (data.totalCoins > 0) {
    const nodeNote = ` on ${data.count} tree node${data.count === 1 ? "" : "s"}`;
    parts.push(`+${fmt(data.totalCoins)} coins confirmed${nodeNote}`);
  }
  if (hasBatch) {
    data.batchPredictions.forEach(b => {
      const multNote = b.multiplier > 1 ? ` (×${fmt(b.multiplier)} node)` : "";
      parts.push(`~${b.procCount}/${b.nodeCount} ${b.type} node${b.nodeCount === 1 ? "" : "s"}${multNote} predicted to proc as you chop through them (+${fmt(b.coins)} coins)`);
    });
  } else if (data.predictedCoins > 0) {
    const typeList = data.predictedTypes.join(", ");
    parts.push(`+${fmt(data.predictedCoins)} coins predicted on your next ${typeList} chop${data.predictedTypes.length === 1 ? "" : "es (one per type)"}`);
  }
  return `\n  <div class="money-tree-alert-card" data-search="money-tree-bonus">\n    <div class="money-tree-alert-shine"></div>\n    <div class="money-tree-alert-icon">${COIN_ICON}</div>\n    <div class="money-tree-alert-text">\n      <div class="money-tree-alert-title">💰 Money Tree Bonus Pending!</div>\n      <div class="money-tree-alert-name">${parts.join(" — ")}</div>\n    </div>\n  </div>`;
}

function farmPanelMapPos(id, node, defW, defH) {
  if (!node || typeof node.x !== "number" || typeof node.y !== "number") return null;
  return {
    id: id == null ? null : String(id),
    x: node.x,
    y: node.y,
    w: typeof node.width === "number" ? node.width : defW,
    h: typeof node.height === "number" ? node.height : defH
  };
}

function farmPanelIsNodeReadyNow(resourceName, node, subKey, now) {
  const job = node && node[subKey];
  const ts = job && (job.minedAt || job.choppedAt || job.harvestedAt || job.stoneMinedAt || job.recoveredAt) || node && (node.minedAt || node.choppedAt || node.harvestedAt);
  if (!ts) {
    const amountVal = job && typeof job.amount === "number" ? job.amount : node && typeof node.amount === "number" ? node.amount : null;
    return amountVal !== 0;
  }
  const growSec = farmPanelGrowTimeSec(resourceName);
  const elapsedSec = (now - ts) / 1e3;
  const remainingSec = growSec != null ? Math.max(0, growSec - elapsedSec) : null;
  return remainingSec != null ? remainingSec <= 0 : false;
}

let farmPanelAnimalYieldGroupsByType = {};

let farmPanelAnimalBuffTrackingByType = {};

function farmPanelAssignMapPositions(entries, out, picks, pickNoOut, procAt, autoNoOut) {
  const ready = entries.filter(e => !(e.waitSec > 0));
  const waiting = entries.filter(e => e.waitSec > 0).sort((a, b) => a.waitSec - b.waitSec || a.order - b.order);
  const picked = [];
  (Array.isArray(picks) ? picks : []).forEach(id => {
    const e = ready.find(r => r.id === id);
    if (e && !picked.includes(e)) picked.push(e);
  });
  const rest = ready.filter(e => !picked.includes(e)).sort((a, b) => a.order - b.order);
  const setAuto = (e, slot) => {
    out.set(e.key, slot);
    if (autoNoOut) autoNoOut.set(e.id, slot + 1);
  };
  picked.forEach((e, i) => {
    out.set(e.key, i);
    if (pickNoOut) pickNoOut.set(e.id, i + 1);
  });
  if (typeof procAt === "function") {
    const slots = rest.map((e, i) => picked.length + i);
    const procSlots = slots.filter(i => procAt(i));
    const plainSlots = slots.filter(i => !procAt(i));
    const byValue = rest.slice().sort((a, b) => b.mult - a.mult || a.order - b.order);
    const procNodes = byValue.slice(0, procSlots.length);
    const plainNodes = byValue.slice(procSlots.length).sort((a, b) => a.order - b.order);
    procSlots.forEach((slot, k) => setAuto(procNodes[k], slot));
    plainSlots.forEach((slot, k) => setAuto(plainNodes[k], slot));
  } else {
    rest.forEach((e, i) => setAuto(e, picked.length + i));
  }
  waiting.forEach((e, i) => setAuto(e, ready.length + i));
}

function farmPanelCollectMapProcs(rolls) {
  const list = Array.isArray(rolls) ? rolls : rolls ? [ rolls ] : [];
  const out = [];
  [ [ "nativeHit", "Native" ], [ "toughTreeCrit", "Tough Tree" ], [ "rockGolemCrit", "Rock Golem" ], [ "turnaroundHit", "Tree Turnaround" ], [ "instantMineHit", "Pickaxe Shark" ], [ "instantHit", "Crimstone Clam" ] ].forEach(([prop, label]) => {
    const n = list.filter(r => r && r[prop]).length;
    if (n) out.push(n > 1 ? `${label} x${n}` : label);
  });
  return out;
}

function farmPanelComputeInProgressRaw(json, opts) {
  const mapMode = !!(opts && opts.mapMode);
  const mapPicks = opts && Array.isArray(opts.mapPicks) ? opts.mapPicks : [];
  const mapPickNo = new Map;
  const mapAutoNo = new Map;
  const g = farmSyncExtractGameState(json);
  const now = Date.now();
  const rows = [];
  farmPanelAnimalYieldGroupsByType = {};
  farmPanelAnimalBuffTrackingByType = {};
  const farmActivity = farmPanelField(g, "farmActivity") || {};
  const cropWeatherDestruction = computeDestroyedCropPlotIds(g);
  const cropWeatherDestructionLabel = cropWeatherDestruction.activeEvent ? (CALENDAR_SEASONAL_BOOSTS.find(e => e.calendarKey === cropWeatherDestruction.activeEvent) || {}).name || null : null;
  const addPlanted = (bag, subKey, kind) => {
    if (!bag || typeof bag !== "object") return;
    const sequentialCounterBaseByName = {};
    const sequentialIndexByName = {};
    const plotIndexByName = {};
    if (kind === "crop" || kind === "fruit" || kind === "greenhouse") {
      Object.values(bag).forEach(plot => {
        const job = plot && plot[subKey];
        const name = job && job.name;
        const plantedAt = job && job.plantedAt;
        if (!name || !plantedAt) return;
        const refTime = job.harvestedAt && job.harvestedAt > plantedAt ? job.harvestedAt : plantedAt;
        const growSec = farmPanelGrowTimeSec(name);
        const elapsedSec = (now - refTime) / 1e3;
        const remainingSec = growSec != null ? Math.max(0, growSec - elapsedSec) : null;
        const isReadyNow = remainingSec != null ? remainingSec <= 0 : false;
        const storedAmount = typeof job.amount === "number" ? job.amount : null;
        if (storedAmount == null && !(name in sequentialCounterBaseByName)) {
          sequentialCounterBaseByName[name] = farmActivity[`${name} Harvested`] || 0;
          sequentialIndexByName[name] = 0;
        }
      });
    }
    const mapPlotPositions = new Map;
    if (mapMode && (kind === "crop" || kind === "fruit")) {
      const groups = {};
      Object.entries(bag).forEach(([plotId, plot], order) => {
        const job = plot && plot[subKey];
        const name = job && job.name;
        const plantedAt = job && job.plantedAt;
        if (!name || !plantedAt) return;
        if (kind === "crop" && cropWeatherDestruction.activeEvent && cropWeatherDestruction.destroyedIds.has(plotId)) return;
        const refTime = job.harvestedAt && job.harvestedAt > plantedAt ? job.harvestedAt : plantedAt;
        const growSec = farmPanelGrowTimeSec(name);
        let waitSec = growSec != null ? kind === "crop" ? farmPanelCropRemainingSec(job, refTime, now, growSec) : Math.max(0, growSec - (now - refTime) / 1e3) : 0;
        if (kind === "crop" && waitSec > 0 && typeof job.baseDurationMs === "number") {
          const sunshowerMult = getCropPlotSunshowerSpeedMultiplier();
          if (sunshowerMult > 1) waitSec = waitSec / sunshowerMult;
        }
        (groups[name] = groups[name] || []).push({
          key: plotId,
          id: `${kind}:${plotId}`,
          waitSec: waitSec,
          order: order
        });
      });
      Object.values(groups).forEach(list => farmPanelAssignMapPositions(list, mapPlotPositions, mapPicks, mapPickNo, null, mapAutoNo));
    }
    Object.entries(bag).forEach(([plotId, plot]) => {
      const job = plot && plot[subKey];
      const name = job && job.name;
      const plantedAt = job && job.plantedAt;
      if (!name || !plantedAt) return;
      const isWeatherDestroyedPlot = kind === "crop" && !!cropWeatherDestruction.activeEvent && cropWeatherDestruction.destroyedIds.has(plotId);
      const refTime = job.harvestedAt && job.harvestedAt > plantedAt ? job.harvestedAt : plantedAt;
      const growSec = farmPanelGrowTimeSec(name);
      const elapsedSec = (now - refTime) / 1e3;
      let remainingSec = growSec != null ? kind === "crop" ? farmPanelCropRemainingSec(job, refTime, now, growSec) : Math.max(0, growSec - elapsedSec) : null;
      if (kind === "crop" && remainingSec != null && remainingSec > 0 && typeof job.baseDurationMs === "number") {
        const sunshowerMult = getCropPlotSunshowerSpeedMultiplier();
        if (sunshowerMult > 1) remainingSec = remainingSec / sunshowerMult;
      }
      const isReadyNow = isWeatherDestroyedPlot ? false : remainingSec != null ? remainingSec <= 0 : false;
      const storedAmount = typeof job.amount === "number" ? job.amount : null;
      const plotIdx = (plotIndexByName[name] || 0) + 1;
      plotIndexByName[name] = plotIdx;
      let exactAmount = null;
      let exactBoosts = null;
      let seedReward = null;
      if (isWeatherDestroyedPlot) {
        exactAmount = 0;
        exactBoosts = [ {
          name: cropWeatherDestructionLabel || "Weather Event",
          valueText: "Plot destroyed — cannot be harvested"
        } ];
      } else if (kind === "flower") {
        try {
          const r = farmPanelComputeExactFlowerYield(job);
          exactAmount = r.amount;
          exactBoosts = r.boosts;
        } catch (e) {
          exactAmount = null;
          exactBoosts = null;
        }
      } else if (kind === "crop" || kind === "fruit" || kind === "greenhouse") {
        try {
          const idx = mapMode ? mapPlotPositions.get(plotId) || 0 : sequentialIndexByName[name] || 0;
          const counter = (sequentialCounterBaseByName[name] || 0) + idx;
          sequentialIndexByName[name] = idx + 1;
          let r = null;
          if (kind === "crop") {
            const predictedReadyAt = remainingSec != null ? now + remainingSec * 1e3 : now;
            r = farmPanelComputeExactCropYield(json, g, name, plot, counter, false, predictedReadyAt);
          } else if (kind === "fruit") {
            r = farmPanelComputeExactFruitYield(json, g, name, counter, false, plot && plot.fertiliser && plot.fertiliser.name);
          } else if (kind === "greenhouse") {
            r = farmPanelComputeExactGreenhouseYield(json, g, name, counter, plot && plot.fertiliser && plot.fertiliser.name, remainingSec != null ? now + remainingSec * 1e3 : now);
          }
          if (r) {
            exactAmount = r.amount;
            exactBoosts = r.boosts;
            if (kind === "crop" && r.seedReward) seedReward = r.seedReward;
          }
        } catch (e) {
          exactAmount = null;
          exactBoosts = null;
        }
      }
      const actualAmount = exactAmount != null ? exactAmount : storedAmount;
      const actualBoosts = exactAmount != null ? exactBoosts : null;
      const harvestsLeft = kind === "fruit" && job && typeof job.harvestsLeft === "number" ? job.harvestsLeft : undefined;
      rows.push({
        name: name,
        qty: actualAmount,
        ready: isWeatherDestroyedPlot ? false : remainingSec != null ? remainingSec <= 0 : null,
        remainingSec: remainingSec,
        isActualYield: actualAmount != null,
        isDeterministicYield: kind === "flower",
        exactBoosts: actualAmount != null ? actualBoosts || [] : null,
        harvestsLeft: harvestsLeft,
        plotIndex: plotIdx,
        seedReward: seedReward,
        mutantReward: kind === "flower" ? farmPanelJobMutantReward(job) : null,
        mapKey: kind === "crop" || kind === "fruit" ? `${kind}:${plotId}` : null,
        mapPickNo: kind === "crop" || kind === "fruit" ? mapPickNo.get(`${kind}:${plotId}`) || null : null,
        mapAutoNo: kind === "crop" || kind === "fruit" ? mapAutoNo.get(`${kind}:${plotId}`) || null : null,
        mapPos: kind === "greenhouse" ? null : farmPanelMapPos(plotId, plot, kind === "fruit" ? 2 : kind === "flower" ? 3 : 1, kind === "fruit" ? 2 : 1),
        weatherDestroyed: isWeatherDestroyedPlot,
        weatherDestroyedEvent: isWeatherDestroyedPlot ? cropWeatherDestructionLabel : null
      });
    });
  };
  addPlanted(farmPanelField(g, "crops"), "crop", "crop");
  addPlanted(farmPanelField(g, "fruitPatches"), "fruit", "fruit");
  const greenhouse = farmPanelField(g, "greenhouse");
  if (greenhouse && greenhouse.pots) addPlanted(greenhouse.pots, "plant", "greenhouse");
  const flowers = farmPanelField(g, "flowers");
  if (flowers && flowers.flowerBeds) addPlanted(flowers.flowerBeds, "flower", "flower");
  [ [ "stones", "stone", "Stone" ], [ "iron", "stone", "Iron" ], [ "gold", "stone", "Gold" ], [ "crimstones", "stone", "Crimstone" ], [ "trees", "wood", "Wood" ] ].forEach(([bagKey, subKey, resourceName]) => {
    const bag = farmPanelField(g, bagKey);
    if (!bag || typeof bag !== "object") return;
    const tiers = RESOURCE_NODE_TIERS[resourceName] || null;
    const boostedForResource = tiers ? farmPanelGetBoostedYieldStats(resourceName) : null;
    const woodSequentialRollsByType = {};
    const stoneSequentialRollsByType = {};
    const ironSequentialRollsByType = {};
    const goldSequentialRollsByType = {};
    const sequentialIndexByType = {};
    if ([ "Wood", "Stone", "Iron", "Gold" ].includes(resourceName)) {
      const allCountByType = {};
      Object.values(bag).forEach(node => {
        const type = resourceName === "Wood" ? farmPanelTreeTypeForNode(node) : resourceName === "Stone" ? farmPanelRockNameForNode(node, STONE_KNOWN_IDS, "Stone Rock") : resourceName === "Iron" ? farmPanelRockNameForNode(node, IRON_KNOWN_IDS, "Iron Rock") : farmPanelRockNameForNode(node, GOLD_KNOWN_IDS, "Gold Rock");
        allCountByType[type] = (allCountByType[type] || 0) + 1;
      });
      if (resourceName === "Wood") {
        Object.keys(TREE_KNOWN_IDS).forEach(t => {
          woodSequentialRollsByType[t] = farmPanelBuildSequentialWoodRollChains(json, t, allCountByType[t] || 0);
          sequentialIndexByType[t] = 0;
        });
      }
      if (resourceName === "Stone") {
        Object.keys(STONE_KNOWN_IDS).forEach(t => {
          stoneSequentialRollsByType[t] = farmPanelBuildSequentialStoneRolls(json, t, allCountByType[t] || 0);
          sequentialIndexByType[t] = 0;
        });
      }
      if (resourceName === "Iron") {
        Object.keys(IRON_KNOWN_IDS).forEach(t => {
          ironSequentialRollsByType[t] = farmPanelBuildSequentialIronRolls(json, t, allCountByType[t] || 0);
          sequentialIndexByType[t] = 0;
        });
      }
      if (resourceName === "Gold") {
        Object.keys(GOLD_KNOWN_IDS).forEach(t => {
          goldSequentialRollsByType[t] = farmPanelBuildSequentialGoldRollChains(json, t, allCountByType[t] || 0);
          sequentialIndexByType[t] = 0;
        });
      }
    }
    let crimstoneRollChains = null;
    if (resourceName === "Crimstone") {
      crimstoneRollChains = farmPanelBuildSequentialCrimstoneRollChains(json, Object.values(bag).length);
    }
    const mapNodePositions = new Map;
    if (mapMode) {
      const groups = {};
      Object.entries(bag).forEach(([nodeId, node], order) => {
        const job = node && node[subKey];
        const ts = job && (job.minedAt || job.choppedAt || job.harvestedAt || job.stoneMinedAt || job.recoveredAt) || node && (node.minedAt || node.choppedAt || node.harvestedAt);
        const growSec = farmPanelGrowTimeSec(resourceName);
        let waitSec = 0;
        if (!ts) {
          const amountVal = job && typeof job.amount === "number" ? job.amount : node && typeof node.amount === "number" ? node.amount : null;
          waitSec = amountVal === 0 ? growSec != null ? growSec : 0 : 0;
        } else if (growSec != null) {
          waitSec = Math.max(0, growSec - (now - ts) / 1e3);
        }
        const type = resourceName === "Wood" ? farmPanelTreeTypeForNode(node) : resourceName === "Stone" ? farmPanelRockNameForNode(node, STONE_KNOWN_IDS, "Stone Rock") : resourceName === "Iron" ? farmPanelRockNameForNode(node, IRON_KNOWN_IDS, "Iron Rock") : resourceName === "Gold" ? farmPanelRockNameForNode(node, GOLD_KNOWN_IDS, "Gold Rock") : "Crimstone";
        (groups[type] = groups[type] || []).push({
          key: node,
          id: `${bagKey}:${nodeId}`,
          mult: node && typeof node.multiplier === "number" ? node.multiplier : 1,
          waitSec: waitSec,
          order: order
        });
      });
      const rollsByTypeForMap = resourceName === "Wood" ? woodSequentialRollsByType : resourceName === "Stone" ? stoneSequentialRollsByType : resourceName === "Iron" ? ironSequentialRollsByType : resourceName === "Gold" ? goldSequentialRollsByType : resourceName === "Crimstone" ? {
        Crimstone: crimstoneRollChains
      } : null;
      Object.keys(groups).forEach(type => {
        const typeRolls = rollsByTypeForMap ? rollsByTypeForMap[type] : null;
        const procAt = typeRolls ? idx => !!(typeRolls[idx] && farmPanelCollectMapProcs(typeRolls[idx]).length) : null;
        farmPanelAssignMapPositions(groups[type], mapNodePositions, mapPicks, mapPickNo, procAt, mapAutoNo);
      });
    }
    let crimstoneSequentialIndex = 0;
    Object.entries(bag).forEach(([nodeId, node]) => {
      const job = node && node[subKey];
      const ts = job && (job.minedAt || job.choppedAt || job.harvestedAt || job.stoneMinedAt || job.recoveredAt) || node && (node.minedAt || node.choppedAt || node.harvestedAt);
      const nodeMapKey = `${bagKey}:${nodeId}`;
      const tierMatch = tiers ? farmPanelDetectNodeTier(resourceName, node) : null;
      const tierLabel = tierMatch && tierMatch.key !== "base" ? tierMatch.label : null;
      const treeType = resourceName === "Wood" ? farmPanelTreeTypeForNode(node) : null;
      const stoneRockName = resourceName === "Stone" ? farmPanelRockNameForNode(node, STONE_KNOWN_IDS, "Stone Rock") : null;
      const ironRockName = resourceName === "Iron" ? farmPanelRockNameForNode(node, IRON_KNOWN_IDS, "Iron Rock") : null;
      const goldRockName = resourceName === "Gold" ? farmPanelRockNameForNode(node, GOLD_KNOWN_IDS, "Gold Rock") : null;
      const isReadyNow = farmPanelIsNodeReadyNow(resourceName, node, subKey, now);
      const storedAmount = job && typeof job.amount === "number" ? job.amount : null;
      const growSecForNode = farmPanelGrowTimeSec(resourceName);
      const remainingSecForNode = ts && growSecForNode != null ? Math.max(0, growSecForNode - (now - ts) / 1e3) : null;
      const predictedMineAt = remainingSecForNode != null ? now + remainingSecForNode * 1e3 : now;
      let exactAmount = null;
      let exactBoosts = null;
      let woodCritRollsForNode = null;
      let woodChainForNode = null;
      let goldCritRollsForNode = null;
      let goldChainForNode = null;
      let crimstoneChainForNode = null;
      let crimstoneNodeIndexForRow = null;
      let crimstoneRockMinesLeftForRow = null;
      let mapProcsForRow = null;
      if (storedAmount == null && resourceName === "Crimstone") {
        const idx = mapMode ? mapNodePositions.get(node) || 0 : crimstoneSequentialIndex++;
        crimstoneNodeIndexForRow = idx + 1;
        const chain = crimstoneRollChains && crimstoneRollChains[idx] ? crimstoneRollChains[idx] : null;
        crimstoneChainForNode = chain;
        mapProcsForRow = farmPanelCollectMapProcs(chain);
        const rockMinesLeftStart = node && typeof node.minesLeft === "number" ? node.minesLeft : 5;
        crimstoneRockMinesLeftForRow = rockMinesLeftStart;
        if (chain && chain.length > 1) {
          let minesLeftCursor = rockMinesLeftStart;
          let total = 0;
          const chainBoostTotals = new Map;
          chain.forEach((roll, i) => {
            const r = farmPanelComputeExactCrimstoneYield(g, node, minesLeftCursor, i === 0);
            total += r.amount;
            (r.boosts || []).forEach(b => {
              const amt = parseYieldBoostAmount(b.valueText);
              chainBoostTotals.set(b.name, (chainBoostTotals.get(b.name) || 0) + amt);
            });
            if (i > 0) chainBoostTotals.set("Crimstone Clam", (chainBoostTotals.get("Crimstone Clam") || 0) + 1);
            minesLeftCursor = minesLeftCursor === 1 ? 5 : minesLeftCursor - 1;
          });
          exactAmount = total;
          exactBoosts = Array.from(chainBoostTotals.entries()).map(([name, amt]) => ({
            name: name,
            valueText: `+${fmt(amt)} yield`
          }));
        } else {
          const r = farmPanelComputeExactCrimstoneYield(g, node, rockMinesLeftStart);
          exactAmount = r.amount;
          exactBoosts = r.boosts;
        }
      } else if (storedAmount == null && resourceName === "Wood" && treeType) {
        const idx = mapMode ? mapNodePositions.get(node) || 0 : sequentialIndexByType[treeType] || 0;
        const rolls = woodSequentialRollsByType[treeType];
        const chain = rolls && rolls[idx] ? rolls[idx] : null;
        if (chain) sequentialIndexByType[treeType] = idx + 1;
        const critRolls = chain && chain.length ? chain[0] : null;
        woodCritRollsForNode = critRolls;
        woodChainForNode = chain;
        mapProcsForRow = farmPanelCollectMapProcs(chain);
        if (chain && chain.length) {
          exactAmount = chain.reduce((sum, roll) => sum + farmPanelComputeExactWoodYieldForNode(node, treeType, roll), 0);
        } else {
          exactAmount = farmPanelComputeExactWoodYieldForNode(node, treeType, critRolls);
        }
      } else if (storedAmount == null && resourceName === "Stone" && stoneRockName) {
        const idx = mapMode ? mapNodePositions.get(node) || 0 : sequentialIndexByType[stoneRockName] || 0;
        const rolls = stoneSequentialRollsByType[stoneRockName];
        const critRolls = rolls && rolls[idx] ? rolls[idx] : null;
        if (critRolls) sequentialIndexByType[stoneRockName] = idx + 1;
        mapProcsForRow = farmPanelCollectMapProcs(critRolls);
        exactAmount = farmPanelComputeExactStoneYieldForNode(json, node, stoneRockName, critRolls, predictedMineAt);
      } else if (storedAmount == null && resourceName === "Iron" && ironRockName) {
        const idx = mapMode ? mapNodePositions.get(node) || 0 : sequentialIndexByType[ironRockName] || 0;
        const rolls = ironSequentialRollsByType[ironRockName];
        const critRolls = rolls && rolls[idx] ? rolls[idx] : null;
        if (critRolls) sequentialIndexByType[ironRockName] = idx + 1;
        mapProcsForRow = farmPanelCollectMapProcs(critRolls);
        exactAmount = farmPanelComputeExactIronYieldForNode(json, node, ironRockName, critRolls, predictedMineAt);
      } else if (storedAmount == null && resourceName === "Gold" && goldRockName) {
        const idx = mapMode ? mapNodePositions.get(node) || 0 : sequentialIndexByType[goldRockName] || 0;
        const rolls = goldSequentialRollsByType[goldRockName];
        const chain = rolls && rolls[idx] ? rolls[idx] : null;
        if (chain) sequentialIndexByType[goldRockName] = idx + 1;
        const critRolls = chain && chain.length ? chain[0] : null;
        goldCritRollsForNode = critRolls;
        goldChainForNode = chain;
        mapProcsForRow = farmPanelCollectMapProcs(chain);
        if (chain && chain.length) {
          exactAmount = chain.reduce((sum, roll) => sum + farmPanelComputeExactGoldYieldForNode(json, node, goldRockName, roll, predictedMineAt), 0);
        } else {
          exactAmount = farmPanelComputeExactGoldYieldForNode(json, node, goldRockName, critRolls, predictedMineAt);
        }
      }
      const actualAmount = storedAmount != null ? storedAmount : exactAmount;
      const tierGroupLabel = tierMatch ? tierMatch.displayLabel || tierMatch.label : resourceName === "Crimstone" ? "Crimstone Rock" : null;
      const tierAverageYield = tierMatch ? (boostedForResource.perTierYield && boostedForResource.perTierYield[tierMatch.key] != null ? boostedForResource.perTierYield[tierMatch.key] : boostedForResource.yieldVal) * tierMatch.mult + tierMatch.yieldAdd : null;
      const qty = actualAmount != null ? actualAmount : tierAverageYield;
      const turnaroundPredicted = treeType ? Boolean(woodChainForNode && woodChainForNode.length > 1) : null;
      const turnaroundBonusEstimate = turnaroundPredicted ? woodChainForNode.slice(1).reduce((sum, roll) => sum + farmPanelComputeExactWoodYieldForNode(node, treeType, roll), 0) : null;
      const turnaroundChainLength = woodChainForNode ? woodChainForNode.length : null;
      const goldInstantMinePredicted = goldRockName ? Boolean(goldChainForNode && goldChainForNode.length > 1) : null;
      const goldInstantMineBonusEstimate = goldInstantMinePredicted ? goldChainForNode.slice(1).reduce((sum, roll) => sum + farmPanelComputeExactGoldYieldForNode(json, node, goldRockName, roll, predictedMineAt), 0) : null;
      const goldInstantMineChainLength = goldChainForNode ? goldChainForNode.length : null;
      const crimstoneInstantMinePredicted = resourceName === "Crimstone" ? Boolean(crimstoneChainForNode && crimstoneChainForNode.length > 1) : null;
      let crimstoneInstantMineBonusEstimate = null;
      if (crimstoneInstantMinePredicted) {
        const rockMinesLeftStart = node && typeof node.minesLeft === "number" ? node.minesLeft : 5;
        let minesLeftCursor = rockMinesLeftStart;
        let bonus = 0;
        crimstoneChainForNode.forEach((roll, i) => {
          if (i > 0) bonus += farmPanelComputeExactCrimstoneYield(g, node, minesLeftCursor, false).amount;
          minesLeftCursor = minesLeftCursor === 1 ? 5 : minesLeftCursor - 1;
        });
        crimstoneInstantMineBonusEstimate = bonus;
      }
      const crimstoneInstantMineChainLength = crimstoneChainForNode ? crimstoneChainForNode.length : null;
      const crimstoneClamActiveForRow = resourceName === "Crimstone" ? isBoostActive("crimstone_clam") : false;
      if (!ts) {
        const amountVal = job && typeof job.amount === "number" ? job.amount : node && typeof node.amount === "number" ? node.amount : null;
        const looksDepleted = amountVal === 0;
        const growSecFallback = farmPanelGrowTimeSec(resourceName);
        rows.push({
          name: resourceName,
          qty: qty,
          ready: !looksDepleted,
          remainingSec: looksDepleted ? growSecFallback ?? 0 : 0,
          tierLabel: tierLabel,
          tierGroupLabel: tierGroupLabel,
          isActualYield: actualAmount != null,
          isDeterministicYield: resourceName === "Crimstone" ? !crimstoneClamActiveForRow : false,
          treeType: treeType,
          turnaroundPredicted: turnaroundPredicted,
          turnaroundBonusEstimate: turnaroundBonusEstimate,
          turnaroundChainLength: turnaroundChainLength,
          goldRockName: goldRockName,
          goldInstantMinePredicted: goldInstantMinePredicted,
          goldInstantMineBonusEstimate: goldInstantMineBonusEstimate,
          goldInstantMineChainLength: goldInstantMineChainLength,
          crimstoneInstantMinePredicted: crimstoneInstantMinePredicted,
          crimstoneInstantMineBonusEstimate: crimstoneInstantMineBonusEstimate,
          crimstoneInstantMineChainLength: crimstoneInstantMineChainLength,
          crimstoneNodeIndex: crimstoneNodeIndexForRow,
          crimstoneMinesLeft: crimstoneRockMinesLeftForRow,
          mapProcs: mapProcsForRow,
          mapKey: nodeMapKey,
          mapPickNo: mapPickNo.get(nodeMapKey) || null,
          mapAutoNo: mapAutoNo.get(nodeMapKey) || null,
          mapPos: farmPanelMapPos(null, node, resourceName === "Wood" || resourceName === "Crimstone" ? 2 : 1, resourceName === "Wood" || resourceName === "Crimstone" ? 2 : 1),
          exactBoosts: exactBoosts
        });
        return;
      }
      const growSec = farmPanelGrowTimeSec(resourceName);
      const elapsedSec = (now - ts) / 1e3;
      const remainingSec = growSec != null ? Math.max(0, growSec - elapsedSec) : null;
      rows.push({
        name: resourceName,
        qty: qty,
        ready: remainingSec != null ? remainingSec <= 0 : null,
        remainingSec: remainingSec,
        tierLabel: tierLabel,
        tierGroupLabel: tierGroupLabel,
        isActualYield: actualAmount != null,
        isDeterministicYield: resourceName === "Crimstone" ? !crimstoneClamActiveForRow : false,
        treeType: treeType,
        turnaroundPredicted: turnaroundPredicted,
        turnaroundBonusEstimate: turnaroundBonusEstimate,
        turnaroundChainLength: turnaroundChainLength,
        goldRockName: goldRockName,
        goldInstantMinePredicted: goldInstantMinePredicted,
        goldInstantMineBonusEstimate: goldInstantMineBonusEstimate,
        goldInstantMineChainLength: goldInstantMineChainLength,
        crimstoneInstantMinePredicted: crimstoneInstantMinePredicted,
        crimstoneInstantMineBonusEstimate: crimstoneInstantMineBonusEstimate,
        crimstoneInstantMineChainLength: crimstoneInstantMineChainLength,
        crimstoneNodeIndex: crimstoneNodeIndexForRow,
        crimstoneMinesLeft: crimstoneRockMinesLeftForRow,
        mapProcs: mapProcsForRow,
        mapKey: nodeMapKey,
        mapPickNo: mapPickNo.get(nodeMapKey) || null,
        mapAutoNo: mapAutoNo.get(nodeMapKey) || null,
        mapPos: farmPanelMapPos(null, node, resourceName === "Wood" || resourceName === "Crimstone" ? 2 : 1, resourceName === "Wood" || resourceName === "Crimstone" ? 2 : 1),
        exactBoosts: exactBoosts
      });
    });
  });
  const oilReserves = farmPanelField(g, "oilReserves");
  if (oilReserves && typeof oilReserves === "object") {
    Object.values(oilReserves).forEach(node => {
      const job = node && node.oil;
      const ts = job && job.drilledAt;
      const drilledCount = typeof node?.drilled === "number" ? node.drilled : null;
      const hasBonus = drilledCount != null ? (drilledCount + 1) % 3 === 0 : null;
      let oilQtyPerNode, exactOilBoosts, oilMinesUntilBonus;
      if (hasBonus == null) {
        oilQtyPerNode = computeBoostedResourceStats("Oil", RESOURCE_DATA.Oil.yieldPer, RESOURCE_DATA.Oil.timeSec).yieldVal;
        exactOilBoosts = null;
        oilMinesUntilBonus = null;
      } else {
        const exact = farmPanelComputeExactOilYield(hasBonus);
        oilQtyPerNode = exact.amount;
        exactOilBoosts = exact.boosts;
        oilMinesUntilBonus = (2 - drilledCount % 3 + 3) % 3 + 1;
      }
      if (!ts) {
        rows.push({
          name: "Oil",
          qty: oilQtyPerNode,
          ready: true,
          remainingSec: 0,
          isActualYield: hasBonus != null,
          isDeterministicYield: hasBonus != null,
          exactBoosts: exactOilBoosts,
          oilMinesUntilBonus: oilMinesUntilBonus,
          mapPos: farmPanelMapPos(null, node, 2, 2)
        });
        return;
      }
      const growSec = farmPanelGrowTimeSec("Oil");
      const elapsedSec = (now - ts) / 1e3;
      const remainingSec = growSec != null ? Math.max(0, growSec - elapsedSec) : null;
      rows.push({
        name: "Oil",
        qty: oilQtyPerNode,
        ready: remainingSec != null ? remainingSec <= 0 : null,
        remainingSec: remainingSec,
        isActualYield: hasBonus != null,
        isDeterministicYield: hasBonus != null,
        exactBoosts: exactOilBoosts,
        oilMinesUntilBonus: oilMinesUntilBonus,
          mapPos: farmPanelMapPos(null, node, 2, 2)
      });
    });
  }
  const lavaPits = farmPanelField(g, "lavaPits");
  if (lavaPits && typeof lavaPits === "object" && typeof computeBoostedLavaPitStats === "function") {
    const boostedLava = computeBoostedLavaPitStats(259200);
    Object.values(lavaPits).forEach(pit => {
      if (!pit || pit.x === undefined || pit.y === undefined) return;
      const readyAt = typeof pit.readyAt === "number" ? pit.readyAt : null;
      const createdAt = typeof pit.createdAt === "number" ? pit.createdAt : null;
      if (readyAt == null) return;
      if (createdAt != null && readyAt <= createdAt) return;
      const collectedAt = typeof pit.collectedAt === "number" ? pit.collectedAt : null;
      if (collectedAt != null && collectedAt >= readyAt) return;
      const remainingSec = Math.max(0, (readyAt - now) / 1e3);
      rows.push({
        name: "Obsidian",
        qty: boostedLava.yieldVal,
        ready: remainingSec <= 0,
        remainingSec: remainingSec,
        mapPos: farmPanelMapPos(null, pit, 2, 2)
      });
    });
  }
  const sunstoneRocks = farmPanelField(g, "sunstones");
  if (sunstoneRocks && typeof sunstoneRocks === "object") {
    const sunstoneRecoverySec = 3 * 24 * 60 * 60;
    Object.entries(sunstoneRocks).forEach(([rockId, rock]) => {
      if (!rock || typeof rock !== "object") return;
      const minedAt = rock.stone && typeof rock.stone.minedAt === "number" ? rock.stone.minedAt : 0;
      const remainingSec = minedAt > 0 ? Math.max(0, sunstoneRecoverySec - (now - minedAt) / 1e3) : 0;
      rows.push({
        name: "Sunstone",
        qty: 1,
        ready: remainingSec <= 0,
        remainingSec: remainingSec,
        isActualYield: true,
        isDeterministicYield: true,
        sunstoneMinesLeft: typeof rock.minesLeft === "number" ? rock.minesLeft : null,
        mapPos: farmPanelMapPos(rockId, rock, 2, 2)
      });
    });
  }
  {
    const saltFarmObj = farmPanelField(g, "saltFarm");
    const saltLevelRaw = saltFarmObj && saltFarmObj.level;
    const saltLevel = typeof saltLevelRaw === "number" ? saltLevelRaw : typeof saltLevelRaw === "string" && saltLevelRaw.trim() && !isNaN(Number(saltLevelRaw)) ? Number(saltLevelRaw) : null;
    const saltYieldBonus = typeof getActiveSaltYieldBonus === "function" ? getActiveSaltYieldBonus() : 0;
    const saltYield = typeof SALT_BASE_YIELD === "number" ? SALT_BASE_YIELD + saltYieldBonus : null;
    const saltNodes = saltFarmObj && typeof saltFarmObj.nodes === "object" ? saltFarmObj.nodes : null;
    if (saltNodes && Object.keys(saltNodes).length) {
      const rechargeMult = typeof getActiveSaltRechargeMult === "function" ? getActiveSaltRechargeMult() : 1;
      const sculptureChargeMult = typeof sculptureEffects === "function" ? sculptureEffects().chargeTimeMult : 1;
      const intervalMs = SALT_BASE_TIME_SEC * 1e3 * sculptureChargeMult * rechargeMult;
      const sculptLvl = typeof saltSculptureLevel === "number" ? saltSculptureLevel : 0;
      const maxCharges = SALT_BASE_CHARGE_CAP + (sculptLvl >= 3 ? 1 : 0) + (sculptLvl >= 6 ? 1 : 0);
      const physicalNodeCount = Object.keys(saltNodes).length;
      const saltNodeKeysSorted = Object.keys(saltNodes).sort();
      const saltNodeStates = [];
      saltNodeKeysSorted.forEach((nodeKey, nodeIdx) => {
        const node = saltNodes[nodeKey];
        const salt = node && node.salt;
        if (!salt) return;
        let storedCharges = Math.max(0, Math.min(typeof salt.storedCharges === "number" ? salt.storedCharges : 0, maxCharges));
        let nextChargeAt = Number.isFinite(salt.nextChargeAt) ? salt.nextChargeAt : now + intervalMs;
        while (now >= nextChargeAt && storedCharges < maxCharges) {
          storedCharges += 1;
          nextChargeAt += intervalMs;
        }
        if (nextChargeAt < now) {
          const missedIntervals = Math.ceil((now - nextChargeAt) / intervalMs);
          nextChargeAt += missedIntervals * intervalMs;
        }
        saltNodeStates.push({
          nodeIdx: nodeIdx,
          storedCharges: storedCharges,
          nextChargeAt: nextChargeAt
        });
      });
      const seaBlessedChain = farmPanelSimulateSeaBlessedChain(g, saltNodeStates, maxCharges, saltYield, intervalMs, now);
      saltNodeStates.forEach((state, stateIdx) => {
        const storedCharges = state.storedCharges;
        const seaBlessedRestored = seaBlessedChain ? seaBlessedChain.restoredPerNode[stateIdx] : 0;
        const saltNodeMeta = {
          saltNodeIndex: state.nodeIdx + 1,
          saltNodeStoredCharges: storedCharges,
          saltNodeMaxCharges: maxCharges,
          saltYieldPerCharge: saltYield,
          saltNodeSeaBlessedRestored: seaBlessedRestored,
          saltNodeSeaBlessedHarvests: seaBlessedChain ? seaBlessedChain.harvestsPerNode[stateIdx] : 0,
          saltNodeSeaBlessedProcs: seaBlessedChain ? seaBlessedChain.nowProcs.filter(pr => pr.nodeIndex === state.nodeIdx + 1) : [],
          saltNodeSeaBlessedFuture: seaBlessedChain ? seaBlessedChain.futureProcs.filter(pr => pr.nodeIndex === state.nodeIdx + 1) : [],
          saltNodeSeaBlessedWindowRestored: seaBlessedChain ? seaBlessedChain.windowRestoredPerNode[stateIdx] : 0,
          seaBlessedChain: seaBlessedChain
        };
        for (let i = 0; i < storedCharges; i++) {
          rows.push({
            name: "Salt",
            qty: saltYield,
            ready: true,
            remainingSec: 0,
            physicalNodes: physicalNodeCount,
            ...saltNodeMeta
          });
        }
        if (storedCharges < maxCharges) {
          const remainingSec = Math.max(0, (state.nextChargeAt - now) / 1e3);
          rows.push({
            name: "Salt",
            qty: 0,
            ready: false,
            remainingSec: remainingSec,
            physicalNodes: physicalNodeCount,
            ...saltNodeMeta
          });
        }
      });
      if (seaBlessedChain && seaBlessedChain.restoredTotal > 0) {
        for (let i = 0; i < seaBlessedChain.restoredTotal; i++) {
          rows.push({
            name: "Salt",
            qty: saltYield,
            ready: true,
            remainingSec: 0,
            physicalNodes: physicalNodeCount,
            seaBlessedBonus: true,
            seaBlessedChain: seaBlessedChain
          });
        }
      }
    } else if (saltLevel != null && typeof FARM_LEVEL_NODES !== "undefined" && FARM_LEVEL_NODES.length) {
      const clampedLevel = Math.max(1, Math.min(FARM_LEVEL_NODES.length, saltLevel));
      const slots = FARM_LEVEL_NODES[clampedLevel - 1] || 0;
      for (let i = 0; i < slots; i++) {
        rows.push({
          name: "Salt",
          qty: saltYield,
          ready: true,
          remainingSec: 0,
          estimated: true
        });
      }
    }
  }
  const hiveBag = farmPanelField(g, "beehives");
  if (hiveBag && typeof hiveBag === "object" && typeof computeHiveStats === "function") {
    const hiveStats = computeHiveStats();
    const HIVE_FULL_RAW = 864e5;
    const hiveEntries = Object.entries(hiveBag).filter(([, hive]) => hive && hive.honey && typeof hive.honey.produced === "number");
    hiveEntries.sort((a, b) => a[0].localeCompare(b[0], undefined, {
      numeric: true
    }));
    const honeyNow = Math.min(now, farmPanelHoneySnapshotMs);
    hiveEntries.forEach(([hiveId, hive], hiveIndex) => {
      const storedProduced = hive.honey.produced;
      const updatedAt = typeof hive.honey.updatedAt === "number" ? hive.honey.updatedAt : honeyNow;
      const flowers = Array.isArray(hive.flowers) ? hive.flowers : [];
      const flower = flowers.find(f => f && typeof f.rate === "number" && f.rate > 0);
      let produced = storedProduced;
      let flowerStillActive = false;
      if (flower) {
        const attachedAt = typeof flower.attachedAt === "number" ? flower.attachedAt : updatedAt;
        const attachedUntil = typeof flower.attachedUntil === "number" ? flower.attachedUntil : honeyNow;
        const windowStart = Math.max(updatedAt, attachedAt);
        const windowEnd = Math.min(honeyNow, attachedUntil);
        if (windowEnd > windowStart) produced = storedProduced + flower.rate * (windowEnd - windowStart);
        flowerStillActive = attachedUntil > honeyNow;
      }
      const ready = produced >= HIVE_FULL_RAW;
      let remainingSec = 0;
      if (!ready) {
        remainingSec = flowerStillActive ? Math.max(0, (HIVE_FULL_RAW - produced) / flower.rate / 1e3) : null;
      }
      const fillFraction = Math.max(0, Math.min(1, produced / HIVE_FULL_RAW));
      const currentHoneyQty = fillFraction * hiveStats.honeyPerFill;
      rows.push({
        name: "Honey",
        qty: currentHoneyQty,
        maxHoneyPerFill: hiveStats.honeyPerFill,
        fillFraction: fillFraction,
        hiveIndex: hiveIndex,
        hiveId: hiveId,
        willSwarm: hive.swarm === true,
        isActualYield: true,
        ready: ready,
        remainingSec: remainingSec,
        mapPos: farmPanelMapPos(hiveId, hive, 1, 1)
      });
    });
  }
  if (typeof computeAnimalTypeFigures === "function" && typeof computeAnimalYieldsForLevel === "function") {
    [ "chicken", "sheep", "cow" ].forEach(type => {
      const bag = farmSyncGetAnimalRecords(g, type);
      if (!bag || typeof bag !== "object") return;
      const cycleSec = computeAnimalTypeFigures(type).cycleTimeSec || ANIMAL_BASE_CYCLE_SEC;
      const typeBoosts = getActiveAnimalBoosts(type);
      let baseFeedMultTotal = 1;
      let freeFeed = false;
      typeBoosts.forEach(b => {
        if (b.feedMult) baseFeedMultTotal *= b.feedMult;
        if (b.feedMultAll) baseFeedMultTotal *= b.feedMultAll;
        if (b.freeFeed) freeFeed = true;
      });
      const requiredQtyPerFeed = REQUIRED_FOOD_QTY_MAP[type];
      Object.entries(bag).forEach(([animalId, animal]) => {
        if (!animal || typeof animal !== "object") return;
        const toTs = v => typeof v === "number" ? v : typeof v === "string" && v.trim() && !isNaN(Number(v)) ? Number(v) : null;
        const awakeAt = toTs(animal.awakeAt);
        const asleepAt = toTs(animal.asleepAt ?? animal.sleepAt ?? animal.wentToSleepAt);
        const stateStr = typeof animal.state === "string" ? animal.state.toLowerCase() : "";
        const sick = animal.sick === true || stateStr === "sick" || typeof animal.sickenedAt === "number";
        const xpRaw = animal.experience ?? animal.exp ?? animal.xp;
        const xp = typeof xpRaw === "number" ? xpRaw : typeof xpRaw === "string" && xpRaw.trim() && !isNaN(Number(xpRaw)) ? Number(xpRaw) : null;
        const lovedAt = toTs(animal.lovedAt);
        const readyAtMs = awakeAt != null ? awakeAt : asleepAt != null ? asleepAt + cycleSec * 1e3 : null;
        const progress = computeAnimalRealProgress(type, {
          xp: xp,
          state: stateStr,
          item: animal.item,
          asleepAt: asleepAt,
          lovedAt: lovedAt
        }, now, readyAtMs);
        const level = progress.level;
        const realFeedBuffName = animal.feedBuff && typeof animal.feedBuff === "object" && animal.feedBuff.name && (typeof animal.feedBuff.harvestsRemaining !== "number" || animal.feedBuff.harvestsRemaining > 0) ? animal.feedBuff.name : null;
        const fig = computeAnimalYieldsForLevel(type, progress.claimLevel, realFeedBuffName);
        const feedInfo = getActiveFeedInfo(progress.costFeedKey);
        let animalFeedMultTotal = baseFeedMultTotal;
        if (realFeedBuffName === "Honey Treat") animalFeedMultTotal *= .75;
        const animalFeedQty = freeFeed ? 0 : Math.max(0, progress.costFeeds * requiredQtyPerFeed * animalFeedMultTotal);
        const remainingFeedQty = freeFeed ? 0 : Math.max(0, progress.noOfFeeds * requiredQtyPerFeed * animalFeedMultTotal);
        const animalFeedCostFlower = animalFeedQty * feedInfo.cost / (coinPerFlower || 1);
        const animalConsumableCostFlower = realFeedBuffName === "Salt Lick" ? getSpiceCostPerUseFlower("saltLick") / getSpiceLickDurationHarvests() : realFeedBuffName === "Honey Treat" ? getSpiceCostPerUseFlower("honeyTreat") / getSpiceLickDurationHarvests() : 0;
        let ready, remainingSec;
        if (sick) {
          ready = false;
          remainingSec = null;
        } else if (awakeAt != null) {
          remainingSec = Math.max(0, (awakeAt - now) / 1e3);
          ready = remainingSec <= 0;
        } else if (asleepAt != null) {
          const elapsedSec = (now - asleepAt) / 1e3;
          remainingSec = Math.max(0, cycleSec - elapsedSec);
          ready = remainingSec <= 0;
        } else {
          ready = false;
          remainingSec = cycleSec;
        }
        if (realFeedBuffName === "Salt Lick" || realFeedBuffName === "Honey Treat") {
          const harvestsRemaining = typeof animal.feedBuff.harvestsRemaining === "number" ? animal.feedBuff.harvestsRemaining : getSpiceLickDurationHarvests();
          const buffRemainingSec = remainingSec != null ? Math.max(0, harvestsRemaining - 1) * cycleSec + remainingSec : null;
          if (!farmPanelAnimalBuffTrackingByType[type]) farmPanelAnimalBuffTrackingByType[type] = {
            saltLick: [],
            honeyTreat: []
          };
          const bucket = realFeedBuffName === "Salt Lick" ? "saltLick" : "honeyTreat";
          farmPanelAnimalBuffTrackingByType[type][bucket].push({
            animalId: animalId,
            harvestsRemaining: harvestsRemaining,
            remainingSec: buffRemainingSec,
            feedQtySaved: realFeedBuffName === "Honey Treat" ? animalFeedQty / 3 : 0
          });
        }
        fig.products.forEach((pname, idx) => {
          rows.push({
            name: pname,
            qty: fig.yields[idx],
            ready: ready,
            remainingSec: remainingSec,
            sick: sick,
            animalId: animalId,
            feedBuffName: realFeedBuffName,
            feedCostFlowerShare: animalFeedCostFlower / fig.products.length,
            consumableCostFlowerShare: animalConsumableCostFlower / fig.products.length
          });
        });
        if (!farmPanelAnimalYieldGroupsByType[type]) farmPanelAnimalYieldGroupsByType[type] = [];
        const feedLabelUsed = FEED_LABELS[progress.costFeedKey] || progress.costFeedKey;
        const remainingFeedLabel = FEED_LABELS[progress.feedKeyUsed] || progress.feedKeyUsed;
        const feedQtyToNext = remainingFeedQty;
        farmPanelAnimalYieldGroupsByType[type].push({
          animalId: animalId,
          level: level,
          xp: typeof xp === "number" ? xp : 0,
          isReadyState: progress.isReadyState,
          products: fig.products,
          yields: fig.yields,
          feedQty: animalFeedQty,
          feedName: feedLabelUsed,
          nextThreshold: progress.nextThreshold,
          nextLevelLabel: progress.nextLevelLabel,
          isMaxCycle: progress.isMaxCycle,
          feedsToNextCount: progress.noOfFeeds,
          feedQtyToNext: feedQtyToNext,
          feedToNextName: remainingFeedLabel
        });
      });
    });
  }
  const agingShed = farmPanelField(g, "agingShed");
  const fermentationJobs = agingShed && agingShed.racks && Array.isArray(agingShed.racks.fermentation) ? agingShed.racks.fermentation : [];
  if (fermentationJobs.length && typeof computeBaitFigures === "function") {
    const toTs = v => typeof v === "number" ? v : typeof v === "string" && v.trim() && !isNaN(Number(v)) ? Number(v) : null;
    fermentationJobs.forEach(job => {
      if (!job || typeof job !== "object" || typeof job.recipe !== "string") return;
      const baitName = Object.keys(BAIT_RECIPE_NAME_MATCH).find(name => BAIT_RECIPE_NAME_MATCH[name].test(job.recipe));
      if (!baitName) return;
      const readyAt = toTs(job.readyAt);
      const startedAt = toTs(job.startedAt);
      let ready, remainingSec;
      if (readyAt != null) {
        remainingSec = Math.max(0, (readyAt - now) / 1e3);
        ready = remainingSec <= 0;
      } else if (startedAt != null) {
        ready = false;
        remainingSec = null;
      } else {
        ready = false;
        remainingSec = null;
      }
      const fig = computeBaitFigures(baitName);
      rows.push({
        name: baitName,
        qty: fig.expectedOutput,
        ready: ready,
        remainingSec: remainingSec
      });
    });
  }
  rows.sort((a, b) => (a.remainingSec ?? 0) - (b.remainingSec ?? 0));
  if (mapMode) {
    const numberGroups = new Map;
    rows.forEach(r => {
      if (!r || !r.mapPos || r.mapAutoNo || r.mapPickNo) return;
      if (!numberGroups.has(r.name)) numberGroups.set(r.name, []);
      numberGroups.get(r.name).push(r);
    });
    numberGroups.forEach(list => {
      const isReady = r => !(r.ready === false || r.remainingSec > 0);
      const readyList = list.filter(isReady);
      const waitList = list.filter(r => !isReady(r)).sort((a, b) => (a.remainingSec || 0) - (b.remainingSec || 0));
      readyList.concat(waitList).forEach((r, i) => {
        r.mapAutoNo = i + 1;
      });
    });
  }
  return rows;
}

function farmPanelBuildAnimalProductStats(rows) {
  const count = rows.length;
  const readyCount = rows.filter(r => r.ready === true).length;
  const sickCount = rows.filter(r => r.sick === true).length;
  const soonestSec = rows.reduce((min, r) => {
    if (r.remainingSec == null) return min;
    return min == null ? r.remainingSec : Math.min(min, r.remainingSec);
  }, null);
  const noEtaCount = rows.filter(r => r.ready === false && r.remainingSec == null).length;
  const totalYield = rows.reduce((sum, r) => sum + (typeof r.qty === "number" ? r.qty : 0), 0);
  const econ = farmPanelComputeEconomics(rows[0].name, count, totalYield);
  const hasRealFeedCost = rows.some(r => typeof r.feedCostFlowerShare === "number");
  const realFeedCostFlower = hasRealFeedCost ? rows.reduce((s, r) => s + (r.feedCostFlowerShare || 0) + (r.consumableCostFlowerShare || 0), 0) : econ.totalCost;
  const realCostPerUnit = totalYield > 0 ? realFeedCostFlower / totalYield : 0;
  const realProfit = econ.netRevenue - realFeedCostFlower;
  return {
    ...econ,
    totalCost: realFeedCostFlower,
    costPerUnit: realCostPerUnit,
    profit: realProfit,
    count: count,
    readyCount: readyCount,
    sickCount: sickCount,
    soonestSec: soonestSec,
    noEtaCount: noEtaCount,
    totalYield: totalYield
  };
}

function farmPanelComputeAnimalYieldGroups(type, meta) {
  const list = farmPanelAnimalYieldGroupsByType[type] || [];
  if (!list.length) return [];
  const byKey = new Map;
  list.forEach(a => {
    const key = String(a.level) + (a.isReadyState ? "r" : "");
    if (!byKey.has(key)) {
      byKey.set(key, {
        level: a.level,
        xpMin: a.xp,
        xpMax: a.xp,
        count: 0,
        feedQty: 0,
        feedName: a.feedName,
        nextThreshold: a.nextThreshold,
        nextLevelLabel: a.nextLevelLabel,
        isMaxCycle: a.isMaxCycle,
        feedsToNextCount: 0,
        feedQtyToNext: 0,
        feedToNextName: a.feedToNextName,
        yields: (meta.products || []).map(() => 0)
      });
    }
    const g = byKey.get(key);
    g.count += 1;
    g.feedQty += a.feedQty || 0;
    g.feedQtyToNext += a.feedQtyToNext || 0;
    g.feedsToNextCount += a.feedsToNextCount || 0;
    if (a.xp < g.xpMin) g.xpMin = a.xp;
    if (a.xp > g.xpMax) g.xpMax = a.xp;
    a.products.forEach((pname, idx) => {
      const productIdx = meta.products.indexOf(pname);
      if (productIdx >= 0) g.yields[productIdx] += a.yields[idx] || 0;
    });
  });
  const groups = Array.from(byKey.values());
  groups.sort((a, b) => a.level - b.level);
  return groups;
}

function farmPanelFormatSpiceDuration(sec) {
  if (sec == null) return "—";
  sec = Math.max(0, Math.round(sec));
  const d = Math.floor(sec / 86400);
  sec -= d * 86400;
  const h = Math.floor(sec / 3600);
  sec -= h * 3600;
  const m = Math.floor(sec / 60);
  if (d > 0) return `${d}D ${h}hr`;
  if (h > 0) return `${h}hr ${m}m`;
  return `${m}m`;
}

function farmPanelRenderSpiceBuffCard(key, tracking, yieldData, meta) {
  const isSaltLick = key === "saltLick";
  const label = isSaltLick ? "Salt Lick" : "Honey Treat";
  const icon = getBoostIcon(label);
  const headsAffected = tracking.length;
  const knownDurations = tracking.map(t => t.remainingSec).filter(v => v != null);
  const durationLeftSec = knownDurations.length ? Math.min(...knownDurations) : null;
  const durationHarvests = getSpiceLickDurationHarvests();
  const perUseCost = getSpiceCostPerUseFlower(key);
  const totalCost = perUseCost * headsAffected;
  const costPerCycle = totalCost / durationHarvests;
  let yieldLineHtml = "";
  let valueFlower = 0;
  if (isSaltLick) {
    valueFlower = Object.entries(yieldData || {}).reduce((sum, [pname, amt]) => {
      const m = marketItems.find(x => (x.name || "").toLowerCase() === pname.toLowerCase());
      return sum + amt * (m ? m.flowerPrice || 0 : 0);
    }, 0);
    const chips = Object.entries(yieldData || {}).filter(([, amt]) => amt > 1e-9).map(([pname, amt]) => `<span class="spice-yield-chip">${getIcon(pname)}+${fmtAnimal(amt)}</span>`).join("");
    yieldLineHtml = `<div class="spice-buff-stat"><span class="label">Yield contributed (cycle)</span><span class="value">${chips || "—"}</span></div>`;
  } else {
    const feedsSaved = tracking.reduce((s, t) => s + (t.feedQtySaved || 0), 0);
    yieldLineHtml = `<div class="spice-buff-stat"><span class="label">Feeds saved</span><span class="value">${fmtAnimal(feedsSaved)}</span></div>`;
    valueFlower = typeof yieldData === "number" ? yieldData : 0;
  }
  const html = `\n      <div class="spice-buff-card ${isSaltLick ? "is-salt-lick" : "is-honey-treat"}">\n        <div class="spice-buff-head">${icon}<b>${label}</b> <span class="spice-buff-heads">${headsAffected} head${headsAffected === 1 ? "" : "s"}</span></div>\n        <div class="spice-buff-stat"><span class="label">Duration left</span><span class="value">${farmPanelFormatSpiceDuration(durationLeftSec)}</span></div>\n        ${yieldLineHtml}\n        <div class="spice-buff-stat"><span class="label">Value in ${FLOWER_ICON} ${isSaltLick ? "added yield" : "saved"}</span><span class="value">${fmtAnimal(valueFlower)} ${FLOWER_ICON}</span></div>\n      </div>`;
  return {
    category: isSaltLick ? "yield" : "cost",
    html: html
  };
}

function farmPanelComputeAnimalCards(rawRows) {
  const byType = new Map;
  rawRows.forEach(r => {
    const info = ANIMAL_PRODUCT_LOOKUP[r.name];
    if (!info) return;
    if (!byType.has(info.type)) byType.set(info.type, []);
    byType.get(info.type).push(r);
  });
  const cards = [];
  byType.forEach((rows, type) => {
    const meta = ANIMAL_DATA[type];
    if (!meta) return;
    const byProduct = new Map;
    rows.forEach(r => {
      if (!byProduct.has(r.name)) byProduct.set(r.name, []);
      byProduct.get(r.name).push(r);
    });
    const products = meta.products.filter(p => byProduct.has(p)).map(p => farmPanelBuildAnimalProductStats(byProduct.get(p)));
    if (!products.length) return;
    const gross = products.reduce((s, p) => s + p.grossRevenue, 0);
    const sellFee = products.reduce((s, p) => s + p.feeAmount, 0);
    const cost = products.reduce((s, p) => s + p.totalCost, 0);
    const totalYieldAll = products.reduce((s, p) => s + p.totalYield, 0);
    const avgPricePerUnit = totalYieldAll > 0 ? gross / totalYieldAll : 0;
    const avgCostPerUnit = totalYieldAll > 0 ? cost / totalYieldAll : 0;
    const activeAnimalBoosts = getActiveAnimalBoosts(type);
    const yieldBoosts = activeAnimalBoosts.filter(b => b.yieldAdd || b.yieldMultAll || b.yieldAddAll);
    const timeBoosts = activeAnimalBoosts.filter(b => b.timeMult || b.timeMultAll);
    const costBoosts = activeAnimalBoosts.filter(b => b.feedMult && b.feedMult < 1 || b.feedMultAll && b.feedMultAll < 1);
    const saltLickYieldByProduct = {};
    let honeyTreatSavingsFlower = 0;
    rows.forEach(r => {
      if (r.feedBuffName === "Salt Lick" && typeof r.qty === "number") {
        saltLickYieldByProduct[r.name] = (saltLickYieldByProduct[r.name] || 0) + r.qty * (1 - 1 / 1.05);
      }
      if (r.feedBuffName === "Honey Treat" && typeof r.feedCostFlowerShare === "number") {
        honeyTreatSavingsFlower += r.feedCostFlowerShare / 3;
      }
    });
    const buffTracking = farmPanelAnimalBuffTrackingByType[type] || {
      saltLick: [],
      honeyTreat: []
    };
    const spiceBuffCards = [];
    if (buffTracking.saltLick.length) {
      spiceBuffCards.push(farmPanelRenderSpiceBuffCard("saltLick", buffTracking.saltLick, saltLickYieldByProduct, meta));
    }
    if (buffTracking.honeyTreat.length) {
      spiceBuffCards.push(farmPanelRenderSpiceBuffCard("honeyTreat", buffTracking.honeyTreat, honeyTreatSavingsFlower, meta));
    }
    let timeMultTotal = 1;
    activeAnimalBoosts.forEach(b => {
      if (b.timeMult) timeMultTotal *= b.timeMult;
      if (b.timeMultAll) timeMultTotal *= b.timeMultAll;
    });
    const cycleTimeSec = Math.max(1, ANIMAL_BASE_CYCLE_SEC * timeMultTotal);
    const cyclesPerDay = 86400 / cycleTimeSec;
    const shrineInfo = getActiveShrineDailyCostStable(activeAnimalBoosts);
    const shrineCost = shrineInfo.total > 0 ? shrineInfo.total / cyclesPerDay : 0;
    const net = gross - sellFee - cost - shrineCost;
    const first = products[0];
    const animalYieldGroups = farmPanelComputeAnimalYieldGroups(type, meta);
    cards.push({
      isAnimalMerged: true,
      typeKey: type,
      typeLabel: meta.label,
      searchKey: type.toLowerCase(),
      products: products,
      productNames: meta.products,
      count: first.count,
      readyCount: first.readyCount,
      sickCount: first.sickCount,
      soonestSec: first.soonestSec,
      noEtaCount: first.noEtaCount,
      gross: gross,
      sellFee: sellFee,
      cost: cost,
      shrineCost: shrineCost,
      shrineNames: shrineInfo.shrines.map(x => x.name),
      shrineDetails: shrineInfo.shrines.map(x => ({
        name: x.name,
        totalCost: x.totalCost,
        durationDays: x.durationDays,
        dailyCostPreShare: x.dailyCostPreShare,
        shareCount: x.shareCount,
        dailyCostPostShare: x.dailyCost,
        perCycleContribution: cyclesPerDay ? x.dailyCost / cyclesPerDay : x.dailyCost
      })),
      net: net,
      totalYieldAll: totalYieldAll,
      avgPricePerUnit: avgPricePerUnit,
      avgCostPerUnit: avgCostPerUnit,
      yieldBoosts: yieldBoosts,
      timeBoosts: timeBoosts,
      costBoosts: costBoosts,
      spiceBuffCards: spiceBuffCards,
      cycleTimeSec: cycleTimeSec,
      animalYieldGroups: animalYieldGroups,
      profit: net
    });
  });
  return cards;
}

const DOUBLE_NOM_FOOD_BONUS = [ 1, 2, 3 ];

const DOUBLE_NOM_INGREDIENT_MULT = [ 2, 3, 4 ];

const COOKING_TIME_BOOST_DEFS = [ {
  name: "Luna's Hat",
  id: "lunas_hat"
}, {
  name: "Master Chef's Cleaver",
  id: "master_chefs_cleaver"
}, {
  name: "Legendary Shrine",
  id: "legendary_shrine_cook"
}, {
  name: "Boar Shrine",
  id: "boar_shrine"
}, {
  name: "Super Totem",
  id: "super_totem_cook",
  group: "totem"
}, {
  name: "Time Warp Totem",
  id: "time_warp_totem_cook",
  group: "totem"
}, {
  name: "Gourmet Hourglass",
  id: "gourmet_hourglass"
}, {
  name: "Desert Gnome",
  id: "desert_gnome"
}, {
  name: "Faction Medallion",
  id: "faction_medallion_cook"
} ];

const COOKING_OIL_SKILL_BY_BUILDING = {
  "Fire Pit": "skill_swift_sizzle",
  Kitchen: "skill_turbo_fry",
  Deli: "skill_fry_frenzy"
};

const COOKING_OIL_BASE_PCT = {
  "Smoothie Shack": 30,
  Bakery: 35
};

const COOKING_DAILY_OIL = {
  "Fire Pit": 1,
  Kitchen: 5,
  "Smoothie Shack": 8,
  Bakery: 10,
  Deli: 12
};

function cookingSkillRankValue(skillId) {
  if (!isSkillActive(skillId)) return null;
  const data = ASCENSION_RANK_DATA[skillId];
  if (!data || !data.values) return null;
  const rank = Math.min(Math.max(getAscensionRank(skillId), 1), 3);
  return data.values[rank - 1];
}

function cookingActiveTimeBoostMults(building) {
  const list = [];
  let totemUsed = false;
  COOKING_TIME_BOOST_DEFS.forEach(b => {
    if (!isBoostActive(b.id)) return;
    if (b.group === "totem") {
      if (totemUsed) return;
      totemUsed = true;
    }
    list.push(b.name);
  });
  if (building === "Fire Pit" || building === "Kitchen") {
    const v = cookingSkillRankValue("skill_fast_feasts");
    if (v != null) list.push("Fast Feasts");
  }
  return list;
}

function cookingOilBoostPct(building) {
  const skillId = COOKING_OIL_SKILL_BY_BUILDING[building];
  const skillVal = skillId ? cookingSkillRankValue(skillId) : null;
  if (skillVal != null) return skillVal;
  return COOKING_OIL_BASE_PCT[building] || 0;
}

function cookingOilBoostName(building) {
  const skillId = COOKING_OIL_SKILL_BY_BUILDING[building];
  if (skillId && isSkillActive(skillId)) {
    if (skillId === "skill_swift_sizzle") return "Swift Sizzle";
    if (skillId === "skill_turbo_fry") return "Turbo Fry";
    if (skillId === "skill_fry_frenzy") return "Fry Frenzy";
  }
  return "Building Oil";
}

function cookingOilConsumptionForItem(building, cookingSeconds) {
  const daily = COOKING_DAILY_OIL[building] || 0;
  return daily * (cookingSeconds / 86400);
}

function cookingStampedDoubleNomLevel(recipe) {
  const stored = recipe && recipe.skills && recipe.skills["Double Nom"];
  if (stored === true) return 1;
  if (typeof stored === "number" && stored >= 1) return Math.min(Math.max(Math.round(stored), 1), 3);
  return 0;
}

function cookingComputeTimeBoostRows(building, foodName, oilRemaining) {
  const rows = cookingActiveTimeBoostMults(building).map(name => ({
    name: name,
    kind: "flat"
  }));
  if (COOKING_CAKE_DISHES.has(foodName)) {
    const v = cookingSkillRankValue("skill_frosted_cakes");
    if (v != null) rows.push({
      name: "Frosted Cakes",
      kind: "flat"
    });
  }
  const oilPct = cookingOilBoostPct(building);
  if (oilPct > 0) {
    const rec = COOKING_RECIPES[building] && COOKING_RECIPES[building][foodName];
    const cookingSeconds = rec ? rec.time : 0;
    const oilNeeded = cookingOilConsumptionForItem(building, cookingSeconds);
    if (oilNeeded > 0 && oilRemaining > 0) {
      const covered = Math.max(0, Math.min(1, oilRemaining / oilNeeded));
      const effectivePct = oilPct * covered;
      if (effectivePct > 0) rows.push({
        name: cookingOilBoostName(building),
        kind: "oil",
        pct: effectivePct
      });
    }
  }
  return rows;
}

function cookingComputeQueueYields(building, craftingArr, farmActivity) {
  const lastInfo = farmPanelGetLastInfo();
  const farmId = Number(lastInfo.id);
  const validFarmId = Number.isFinite(farmId) && farmId > 0;
  const fa = farmActivity && typeof farmActivity === "object" ? farmActivity : {};
  const counters = {};
  const fieryJackpotChance = building === "Fire Pit" ? cookingSkillRankValue("skill_fiery_jackpot") : null;
  const masterChefActive = isBoostActive("master_chefs_cleaver");
  return craftingArr.map(recipe => {
    const name = recipe.name;
    if (counters[name] === undefined) {
      const raw = Number(fa[`${name} Cooked`]);
      counters[name] = Number.isFinite(raw) && raw > 0 ? Math.floor(raw) : 0;
    }
    const counter = counters[name];
    counters[name] = counter + 1;
    const doubleNomLevel = cookingStampedDoubleNomLevel(recipe);
    const doubleNomBonus = doubleNomLevel ? DOUBLE_NOM_FOOD_BONUS[doubleNomLevel - 1] : 0;
    let amount = 1 + doubleNomBonus;
    const boostsUsed = [];
    if (doubleNomBonus) boostsUsed.push({
      name: "Double Nom",
      amount: doubleNomBonus
    });
    const itemId = FOOD_KNOWN_IDS[name];
    if (validFarmId && itemId) {
      if (fieryJackpotChance != null && fieryJackpotChance > 0) {
        const hit = sflPrngChance({
          farmId: farmId,
          itemId: itemId,
          counter: counter,
          chance: fieryJackpotChance,
          criticalHitName: "Fiery Jackpot"
        });
        if (hit) {
          amount += 1;
          boostsUsed.push({
            name: "Fiery Jackpot",
            amount: 1
          });
        }
      }
      if (masterChefActive) {
        const hit = sflPrngChance({
          farmId: farmId,
          itemId: itemId,
          counter: counter,
          chance: 10,
          criticalHitName: "Master Chef's Cleaver"
        });
        if (hit) {
          amount += 1;
          boostsUsed.push({
            name: "Master Chef's Cleaver",
            amount: 1
          });
        }
      }
    }
    return {
      recipe: recipe,
      name: name,
      amount: amount,
      boostsUsed: boostsUsed,
      doubleNomLevel: doubleNomLevel
    };
  });
}

function cookingSlotIngredientCostFlower(building, name, doubleNomLevel) {
  const rec = COOKING_RECIPES[building] && COOKING_RECIPES[building][name];
  if (!rec) return 0;
  const mult = doubleNomLevel ? DOUBLE_NOM_INGREDIENT_MULT[doubleNomLevel - 1] : 1;
  let totalCoins = 0;
  Object.keys(rec.ingredients).forEach(ing => {
    totalCoins += rec.ingredients[ing] * mult * cookingIngredientUnitCostCoins(ing, cookingCostMode);
  });
  return totalCoins / (coinPerFlower || 1);
}

function cookingIsWearableEquipped(g, wearableName) {
  const checkEquipped = equipped => !!equipped && typeof equipped === "object" && Object.values(equipped).some(v => typeof v === "string" && v.trim() === wearableName);
  const bumpkin = g && g.bumpkin;
  if (checkEquipped(bumpkin && bumpkin.equipped)) return true;
  const farmHands = g && g.farmHands && g.farmHands.bumpkins;
  if (farmHands && typeof farmHands === "object") {
    for (const fh of Object.values(farmHands)) {
      if (checkEquipped(fh && fh.equipped)) return true;
    }
  }
  return false;
}

function farmPanelBuildCookingBuildingCard(building, instances, farmActivity) {
  const allSlots = [];
  instances.forEach((inst, instIdx) => {
    const crafting = Array.isArray(inst.crafting) ? inst.crafting : [];
    if (!crafting.length) return;
    const yields = cookingComputeQueueYields(building, crafting, farmActivity);
    yields.forEach(y => {
      const readyAt = typeof y.recipe.readyAt === "number" ? y.recipe.readyAt : 0;
      allSlots.push({
        buildingIndex: instIdx,
        name: y.name,
        amount: y.amount,
        boostsUsed: y.boostsUsed,
        doubleNomLevel: y.doubleNomLevel,
        readyAt: readyAt,
        oilAtSlot: typeof inst.oil === "number" ? inst.oil : 0
      });
    });
  });
  if (!allSlots.length) return null;
  allSlots.sort((a, b) => a.readyAt - b.readyAt);
  const now = Date.now();
  const readyCount = allSlots.filter(s => s.readyAt <= now).length;
  const soonestSec = allSlots.reduce((min, s) => {
    if (s.readyAt <= now) return min;
    const sec = Math.max(0, Math.round((s.readyAt - now) / 1e3));
    return min == null ? sec : Math.min(min, sec);
  }, null);
  let totalCostFlower = 0;
  const yieldBoostTotals = new Map;
  const timeBoostSeen = new Map;
  allSlots.forEach(s => {
    totalCostFlower += cookingSlotIngredientCostFlower(building, s.name, s.doubleNomLevel);
    (s.boostsUsed || []).forEach(b => {
      yieldBoostTotals.set(b.name, (yieldBoostTotals.get(b.name) || 0) + b.amount);
    });
    cookingComputeTimeBoostRows(building, s.name, s.oilAtSlot).forEach(b => {
      if (!timeBoostSeen.has(b.name)) timeBoostSeen.set(b.name, b);
    });
  });
  const nameCounts = new Map;
  allSlots.forEach(s => nameCounts.set(s.name, (nameCounts.get(s.name) || 0) + s.amount));
  const productGroups = [];
  const seenNames = new Set;
  allSlots.forEach(s => {
    if (seenNames.has(s.name)) return;
    seenNames.add(s.name);
    productGroups.push({
      name: s.name,
      amount: nameCounts.get(s.name) || 0
    });
  });
  return {
    isCookingCard: true,
    cookingBuilding: building,
    cookingKind: "recipe",
    slots: allSlots,
    slotCount: allSlots.length,
    readyCount: readyCount,
    soonestSec: soonestSec,
    totalCostFlower: totalCostFlower,
    yieldBoostTotals: Array.from(yieldBoostTotals.entries()).map(([name, total]) => ({
      name: name,
      total: total
    })),
    timeBoosts: Array.from(timeBoostSeen.values()),
    productGroups: productGroups,
    profit: -totalCostFlower
  };
}

function farmPanelBuildFishMarketCard(g, instances, farmActivity) {
  const allSlots = [];
  instances.forEach((inst, instIdx) => {
    const processing = Array.isArray(inst.processing) ? inst.processing : [];
    processing.forEach(p => {
      allSlots.push({
        buildingIndex: instIdx,
        name: p.name,
        readyAt: typeof p.readyAt === "number" ? p.readyAt : 0
      });
    });
  });
  if (!allSlots.length) return null;
  const lastInfo = farmPanelGetLastInfo();
  const farmId = Number(lastInfo.id);
  const validFarmId = Number.isFinite(farmId) && farmId > 0;
  const bubbleAuraActive = cookingIsWearableEquipped(g, "Bubble Aura");
  const fa = farmActivity && typeof farmActivity === "object" ? farmActivity : {};
  const counters = {};
  const resolvedSlots = allSlots.map(s => {
    if (counters[s.name] === undefined) {
      const raw = Number(fa[`${s.name} Processed`]);
      counters[s.name] = Number.isFinite(raw) && raw > 0 ? Math.floor(raw) : 0;
    }
    const counter = counters[s.name];
    counters[s.name] = counter + 1;
    let amount = 1;
    const boostsUsed = [];
    const itemId = FOOD_KNOWN_IDS[s.name];
    if (validFarmId && itemId && bubbleAuraActive) {
      const hit = sflPrngChance({
        farmId: farmId,
        itemId: itemId,
        counter: counter,
        chance: 20,
        criticalHitName: "Bubble Aura"
      });
      if (hit) {
        amount += 1;
        boostsUsed.push({
          name: "Bubble Aura",
          amount: 1
        });
      }
    }
    return {
      ...s,
      amount: amount,
      boostsUsed: boostsUsed
    };
  });
  resolvedSlots.sort((a, b) => a.readyAt - b.readyAt);
  const now = Date.now();
  const readyCount = resolvedSlots.filter(s => s.readyAt <= now).length;
  const soonestSec = resolvedSlots.reduce((min, s) => {
    if (s.readyAt <= now) return min;
    const sec = Math.max(0, Math.round((s.readyAt - now) / 1e3));
    return min == null ? sec : Math.min(min, sec);
  }, null);
  const yieldBoostTotals = new Map;
  resolvedSlots.forEach(s => (s.boostsUsed || []).forEach(b => yieldBoostTotals.set(b.name, (yieldBoostTotals.get(b.name) || 0) + b.amount)));
  const timeBoosts = bubbleAuraActive ? [ {
    name: "Bubble Aura",
    kind: "oil",
    pct: 20
  } ] : [];
  let totalCostFlower = 0;
  resolvedSlots.forEach(s => {
    const coinsPerUnit = getItemCostByName(s.name) || 0;
    totalCostFlower += coinsPerUnit / (coinPerFlower || 1);
  });
  const nameCounts = new Map;
  resolvedSlots.forEach(s => nameCounts.set(s.name, (nameCounts.get(s.name) || 0) + s.amount));
  const productGroups = [];
  const seenNames = new Set;
  resolvedSlots.forEach(s => {
    if (seenNames.has(s.name)) return;
    seenNames.add(s.name);
    productGroups.push({
      name: s.name,
      amount: nameCounts.get(s.name) || 0
    });
  });
  return {
    isCookingCard: true,
    cookingBuilding: "Fish Market",
    cookingKind: "processing",
    slots: resolvedSlots,
    slotCount: resolvedSlots.length,
    readyCount: readyCount,
    soonestSec: soonestSec,
    totalCostFlower: totalCostFlower,
    yieldBoostTotals: Array.from(yieldBoostTotals.entries()).map(([name, total]) => ({
      name: name,
      total: total
    })),
    timeBoosts: timeBoosts,
    productGroups: productGroups,
    profit: -totalCostFlower
  };
}

function farmPanelBuildAgingShedCard(agingShed, farmActivity) {
  const racks = agingShed && agingShed.racks;
  const agingSlots = racks && Array.isArray(racks.aging) ? racks.aging : [];
  if (!agingSlots.length) return null;
  const lastInfo = farmPanelGetLastInfo();
  const farmId = Number(lastInfo.id);
  const validFarmId = Number.isFinite(farmId) && farmId > 0;
  const fa = farmActivity && typeof farmActivity === "object" ? farmActivity : {};
  const fishSmokingMult = cookingSkillRankValue("skill_fish_smoking");
  const sculptureLvl = typeof saltSculptureLevel === "number" ? saltSculptureLevel : 0;
  let primeChance = 10 * (fishSmokingMult != null ? fishSmokingMult : 1);
  const chanceBoosts = [];
  if (fishSmokingMult != null) chanceBoosts.push({
    name: "Fish Smoking",
    note: `×${fishSmokingMult}`
  });
  if (sculptureLvl >= 2) {
    primeChance += 4;
    chanceBoosts.push({
      name: "Salt Sculpture",
      note: "+4%"
    });
  }
  if (isBoostActive("winged_vase")) {
    primeChance += 14;
    chanceBoosts.push({
      name: "Winged Vase",
      note: "+14%"
    });
  }
  const speedyAgingMult = cookingSkillRankValue("skill_speedy_aging");
  if (speedyAgingMult != null) chanceBoosts.push({
    name: "Speedy Aging",
    note: "faster"
  });
  const counters = {};
  const slots = agingSlots.map(slot => {
    const fish = slot.fish;
    const agedName = `Aged ${fish}`;
    const primeName = `Prime Aged ${fish}`;
    if (counters[fish] === undefined) {
      const rawAged = Number(fa[`${agedName} Collected`]);
      const rawPrime = Number(fa[`${primeName} Collected`]);
      counters[fish] = (Number.isFinite(rawAged) && rawAged > 0 ? Math.floor(rawAged) : 0) + (Number.isFinite(rawPrime) && rawPrime > 0 ? Math.floor(rawPrime) : 0);
    }
    const counter = counters[fish];
    counters[fish] = counter + 1;
    let isPrime = false;
    const agedItemId = FISH_AGING_KNOWN_IDS[agedName];
    if (validFarmId && agedItemId) {
      isPrime = sflPrngChance({
        farmId: farmId,
        itemId: agedItemId,
        counter: counter,
        chance: primeChance,
        criticalHitName: primeName
      });
    }
    const stampedAgerLevel = (() => {
      const stored = slot.skills && slot.skills.Ager;
      if (stored === true) return 1;
      if (typeof stored === "number") {
        if (stored === 0) return 0;
        return Math.min(Math.max(Math.round(stored), 1), 3);
      }
      return 0;
    })();
    const outputMult = stampedAgerLevel ? ASCENSION_RANK_DATA.skill_ager.values[stampedAgerLevel - 1] : 1;
    const outputName = isPrime ? primeName : agedName;
    let costFlower = 0;
    if (typeof computeAgedFishFigures === "function") {
      const figures = computeAgedFishFigures(fish, "collect");
      if (figures && typeof figures.costCoins === "number") costFlower = figures.costCoins / (coinPerFlower || 1);
    }
    return {
      fish: fish,
      outputName: outputName,
      isPrime: isPrime,
      amount: outputMult,
      readyAt: typeof slot.readyAt === "number" ? slot.readyAt : 0,
      stampedAgerLevel: stampedAgerLevel,
      costFlower: costFlower
    };
  });
  slots.sort((a, b) => a.readyAt - b.readyAt);
  const now = Date.now();
  const readyCount = slots.filter(s => s.readyAt <= now).length;
  const soonestSec = slots.reduce((min, s) => {
    if (s.readyAt <= now) return min;
    const sec = Math.max(0, Math.round((s.readyAt - now) / 1e3));
    return min == null ? sec : Math.min(min, sec);
  }, null);
  const totalCostFlower = slots.reduce((sum, s) => sum + (s.costFlower || 0), 0);
  const nameCounts = new Map;
  slots.forEach(s => nameCounts.set(s.outputName, (nameCounts.get(s.outputName) || 0) + s.amount));
  const productGroups = [];
  const seenNames = new Set;
  slots.forEach(s => {
    if (seenNames.has(s.outputName)) return;
    seenNames.add(s.outputName);
    productGroups.push({
      name: s.outputName,
      amount: nameCounts.get(s.outputName) || 0
    });
  });
  return {
    isCookingCard: true,
    cookingBuilding: "Aging Shed",
    cookingKind: "aging",
    slots: slots,
    slotCount: slots.length,
    readyCount: readyCount,
    soonestSec: soonestSec,
    totalCostFlower: totalCostFlower,
    yieldBoostTotals: [],
    chanceBoosts: chanceBoosts,
    primeChance: primeChance,
    timeBoosts: [],
    productGroups: productGroups,
    profit: -totalCostFlower
  };
}

function farmPanelStampedAgerLevel(skills) {
  const stored = skills && skills.Ager;
  if (stored === true) return 1;
  if (typeof stored === "number") {
    if (stored === 0) return 0;
    return Math.min(Math.max(Math.round(stored), 1), 3);
  }
  return 0;
}

function fermentationResolveRecipe(recipeName) {
  const staticRec = FERMENTATION_STATIC_RECIPES[recipeName];
  if (staticRec) return {
    outputName: staticRec.outputName,
    baseAmount: staticRec.baseAmount,
    fishName: null,
    vegName: null
  };
  const family = FERMENTATION_BAIT_FAMILIES.find(f => recipeName.indexOf(f + " (") === 0);
  if (!family) return null;
  const rec = BAIT_RECIPES[family];
  if (!rec) return null;
  const isPrime = recipeName.indexOf("Prime Aged") !== -1;
  const baitMatch = recipeName.match(/^.+? \((?:Aged|Prime Aged) (.+?), Pickled (.+?)\)$/);
  return {
    outputName: family,
    baseAmount: isPrime ? rec.outputPrime : rec.outputAged,
    fishName: baitMatch ? baitMatch[1] : null,
    vegName: baitMatch ? baitMatch[2] : null,
    fishTier: rec.fishTier
  };
}

function farmPanelBuildFermentationCard(agingShed, farmActivity) {
  const racks = agingShed && agingShed.racks;
  const jobs = racks && Array.isArray(racks.fermentation) ? racks.fermentation : [];
  if (!jobs.length) return null;
  const lastInfo = farmPanelGetLastInfo();
  const farmId = Number(lastInfo.id);
  const validFarmId = Number.isFinite(farmId) && farmId > 0;
  const fa = farmActivity && typeof farmActivity === "object" ? farmActivity : {};
  const astrolabeActive = isBoostActive("astrolabe");
  const bacalhauLevel = cookingSkillRankValue("skill_bacalhau");
  const counters = {};
  const yieldBoostTotals = new Map;
  const slots = jobs.map(job => {
    const resolved = fermentationResolveRecipe(job.recipe);
    if (!resolved) return null;
    const outputName = resolved.outputName;
    if (counters[outputName] === undefined) {
      const raw = Number(fa[`${outputName} Fermented`]);
      counters[outputName] = Number.isFinite(raw) && raw > 0 ? raw : 0;
    }
    const counter = counters[outputName];
    const stampedAgerLevel = farmPanelStampedAgerLevel(job.skills);
    const agerMult = stampedAgerLevel ? ASCENSION_RANK_DATA.skill_ager.values[stampedAgerLevel - 1] : 1;
    let amount = resolved.baseAmount * agerMult;
    const itemId = FERMENTATION_SPICE_KNOWN_IDS[outputName];
    if (validFarmId && itemId && astrolabeActive) {
      const hit = sflPrngChance({
        farmId: farmId,
        itemId: itemId,
        counter: counter,
        chance: 15,
        criticalHitName: "Astrolabe"
      });
      if (hit) {
        yieldBoostTotals.set("Astrolabe", (yieldBoostTotals.get("Astrolabe") || 0) + amount);
        amount *= 2;
      }
    }
    const isBait = FERMENTATION_BAIT_FAMILIES.includes(outputName);
    if (isBait && bacalhauLevel) {
      amount += bacalhauLevel;
      yieldBoostTotals.set("Bacalhau", (yieldBoostTotals.get("Bacalhau") || 0) + bacalhauLevel);
    }
    counters[outputName] = counter + amount;
    let costFlower = 0;
    if (isBait) {
      let fishCost = 0;
      if (resolved.fishTier && Array.isArray(FISH_SALT_DATA[resolved.fishTier])) {
        const fishObj = FISH_SALT_DATA[resolved.fishTier].find(f => f.name === resolved.fishName);
        if (fishObj) fishCost = fishSaltCostFlower(fishObj);
      }
      const vegEntry = resolved.vegName ? pickledVegCost(resolved.vegName) : null;
      costFlower = fishCost + (vegEntry ? vegEntry.cost : 0);
    } else if (job.recipe.indexOf("Pickled ") === 0) {
      const veg = job.recipe.slice("Pickled ".length);
      const vegEntry = pickledVegCost(veg);
      costFlower = vegEntry ? vegEntry.cost : 0;
    } else if (job.recipe.indexOf("Greenhouse Glow: Pickled ") === 0 || job.recipe.indexOf("Greenhouse Goodie: Pickled ") === 0) {
      const veg = job.recipe.slice(job.recipe.indexOf("Pickled ") + "Pickled ".length);
      const vegEntry = pickledVegCost(veg);
      costFlower = (vegEntry ? vegEntry.cost : 0) + refinedSaltUnitCostFlower() * 1;
    } else if (job.recipe === "Sproutroot Surprise") {
      costFlower = coinsToFlower(computeComposterFigures("Compost Bin").costPerUnitCoins) * 5 + coinsToFlower(computeComposterFigures("Premium Composter").costPerUnitCoins) * 5 + refinedSaltUnitCostFlower() * 2;
    } else if (job.recipe === "Turbofruit Mix") {
      costFlower = coinsToFlower(computeComposterFigures("Premium Composter").costPerUnitCoins) * 5 + coinsToFlower(computeComposterFigures("Turbo Composter").costPerUnitCoins) * 5 + refinedSaltUnitCostFlower() * 2;
    }
    return {
      name: outputName,
      amount: amount,
      readyAt: typeof job.readyAt === "number" ? job.readyAt : 0,
      stampedAgerLevel: stampedAgerLevel,
      costFlower: costFlower
    };
  }).filter(Boolean);
  if (!slots.length) return null;
  slots.sort((a, b) => a.readyAt - b.readyAt);
  const now = Date.now();
  const readyCount = slots.filter(s => s.readyAt <= now).length;
  const soonestSec = slots.reduce((min, s) => {
    if (s.readyAt <= now) return min;
    const sec = Math.max(0, Math.round((s.readyAt - now) / 1e3));
    return min == null ? sec : Math.min(min, sec);
  }, null);
  const totalCostFlower = slots.reduce((sum, s) => sum + (s.costFlower || 0), 0);
  const nameCounts = new Map;
  slots.forEach(s => nameCounts.set(s.name, (nameCounts.get(s.name) || 0) + s.amount));
  const productGroups = [];
  const seenNames = new Set;
  slots.forEach(s => {
    if (seenNames.has(s.name)) return;
    seenNames.add(s.name);
    productGroups.push({
      name: s.name,
      amount: nameCounts.get(s.name) || 0
    });
  });
  const chanceBoosts = [];
  if (astrolabeActive) chanceBoosts.push({
    name: "Astrolabe",
    note: "15% chance to double output"
  });
  if (bacalhauLevel) chanceBoosts.push({
    name: "Bacalhau",
    note: `+${bacalhauLevel} bait (flat)`
  });
  return {
    isCookingCard: true,
    cookingBuilding: "Fermentation Rack",
    cookingKind: "fermentation",
    slots: slots,
    slotCount: slots.length,
    readyCount: readyCount,
    soonestSec: soonestSec,
    totalCostFlower: totalCostFlower,
    yieldBoostTotals: Array.from(yieldBoostTotals.entries()).map(([name, total]) => ({
      name: name,
      total: total
    })),
    chanceBoosts: chanceBoosts,
    timeBoosts: [],
    productGroups: productGroups,
    profit: -totalCostFlower
  };
}

function farmPanelBuildSpiceCard(agingShed, farmActivity) {
  const racks = agingShed && agingShed.racks;
  const jobs = racks && Array.isArray(racks.spice) ? racks.spice : [];
  if (!jobs.length) return null;
  const lastInfo = farmPanelGetLastInfo();
  const farmId = Number(lastInfo.id);
  const validFarmId = Number.isFinite(farmId) && farmId > 0;
  const fa = farmActivity && typeof farmActivity === "object" ? farmActivity : {};
  const astrolabeActive = isBoostActive("astrolabe");
  const refinerChancePct = cookingSkillRankValue("skill_refiner");
  const onesieOn = isBoostActive("salt_bottle_onesie");
  const counters = {};
  const yieldBoostTotals = new Map;
  const slots = jobs.map(job => {
    const rec = SPICE_STATIC_RECIPES[job.recipe];
    if (!rec) return null;
    const outputName = rec.outputName;
    if (counters[job.recipe] === undefined) {
      const raw = Number(fa[`${job.recipe} Spiced`]);
      counters[job.recipe] = Number.isFinite(raw) && raw > 0 ? raw : 0;
    }
    const counter = counters[job.recipe];
    const stampedAgerLevel = farmPanelStampedAgerLevel(job.skills);
    const agerMult = stampedAgerLevel ? ASCENSION_RANK_DATA.skill_ager.values[stampedAgerLevel - 1] : 1;
    let amount = rec.baseAmount * agerMult;
    const itemId = FERMENTATION_SPICE_KNOWN_IDS[outputName];
    if (validFarmId && itemId && astrolabeActive) {
      const hit = sflPrngChance({
        farmId: farmId,
        itemId: itemId,
        counter: counter,
        chance: 15,
        criticalHitName: "Astrolabe"
      });
      if (hit) {
        yieldBoostTotals.set("Astrolabe", (yieldBoostTotals.get("Astrolabe") || 0) + amount);
        amount *= 2;
      }
    }
    if (validFarmId && itemId && outputName === "Refined Salt" && refinerChancePct) {
      const hit = sflPrngChance({
        farmId: farmId,
        itemId: itemId,
        counter: counter,
        chance: refinerChancePct,
        criticalHitName: "Refiner"
      });
      if (hit) {
        amount += 1;
        yieldBoostTotals.set("Refiner", (yieldBoostTotals.get("Refiner") || 0) + 1);
      }
    }
    if (onesieOn) {
      amount += 1;
      yieldBoostTotals.set("Salt Bottle Onesie", (yieldBoostTotals.get("Salt Bottle Onesie") || 0) + 1);
    }
    counters[job.recipe] = counter + 1;
    let costFlower = 0;
    if (job.recipe === "Refined Salt") costFlower = saltCostFlowerForSpiceRack() * SPICE_RECIPES["Refined Salt"].saltQty; else if (job.recipe === "Salt Lick") costFlower = refinedSaltUnitCostFlower() * SPICE_RECIPES["Salt Lick"].refinedSaltQty; else if (job.recipe === "Honey Treat") costFlower = refinedSaltUnitCostFlower() * SPICE_RECIPES["Honey Treat"].refinedSaltQty + honeyCostFlowerForSpiceRack() * SPICE_RECIPES["Honey Treat"].honeyQty;
    return {
      name: outputName,
      amount: amount,
      readyAt: typeof job.readyAt === "number" ? job.readyAt : 0,
      stampedAgerLevel: stampedAgerLevel,
      costFlower: costFlower
    };
  }).filter(Boolean);
  if (!slots.length) return null;
  slots.sort((a, b) => a.readyAt - b.readyAt);
  const now = Date.now();
  const readyCount = slots.filter(s => s.readyAt <= now).length;
  const soonestSec = slots.reduce((min, s) => {
    if (s.readyAt <= now) return min;
    const sec = Math.max(0, Math.round((s.readyAt - now) / 1e3));
    return min == null ? sec : Math.min(min, sec);
  }, null);
  const totalCostFlower = slots.reduce((sum, s) => sum + (s.costFlower || 0), 0);
  const nameCounts = new Map;
  slots.forEach(s => nameCounts.set(s.name, (nameCounts.get(s.name) || 0) + s.amount));
  const productGroups = [];
  const seenNames = new Set;
  slots.forEach(s => {
    if (seenNames.has(s.name)) return;
    seenNames.add(s.name);
    productGroups.push({
      name: s.name,
      amount: nameCounts.get(s.name) || 0
    });
  });
  const chanceBoosts = [];
  if (astrolabeActive) chanceBoosts.push({
    name: "Astrolabe",
    note: "15% chance to double output"
  });
  if (refinerChancePct) chanceBoosts.push({
    name: "Refiner",
    note: `${refinerChancePct}% chance of +1 Refined Salt`
  });
  if (onesieOn) chanceBoosts.push({
    name: "Salt Bottle Onesie",
    note: "+1 flat (worn)"
  });
  return {
    isCookingCard: true,
    cookingBuilding: "Spice Rack",
    cookingKind: "spice",
    slots: slots,
    slotCount: slots.length,
    readyCount: readyCount,
    soonestSec: soonestSec,
    totalCostFlower: totalCostFlower,
    yieldBoostTotals: Array.from(yieldBoostTotals.entries()).map(([name, total]) => ({
      name: name,
      total: total
    })),
    chanceBoosts: chanceBoosts,
    timeBoosts: [],
    productGroups: productGroups,
    profit: -totalCostFlower
  };
}

function farmPanelComputeCookingCards(json) {
  const g = farmSyncExtractGameState(json);
  const buildings = farmPanelField(g, "buildings");
  const farmActivity = farmPanelField(g, "farmActivity") || {};
  const cards = [];
  COOKING_BUILDINGS.forEach(building => {
    const instances = buildings && Array.isArray(buildings[building]) ? buildings[building] : null;
    if (!instances || !instances.length) return;
    const card = farmPanelBuildCookingBuildingCard(building, instances, farmActivity);
    if (card) cards.push(card);
  });
  const fishMarketInstances = buildings && Array.isArray(buildings["Fish Market"]) ? buildings["Fish Market"] : null;
  if (fishMarketInstances && fishMarketInstances.length) {
    const fmCard = farmPanelBuildFishMarketCard(g, fishMarketInstances, farmActivity);
    if (fmCard) cards.push(fmCard);
  }
  const agingShed = farmPanelField(g, "agingShed");
  if (agingShed) {
    const asCard = farmPanelBuildAgingShedCard(agingShed, farmActivity);
    if (asCard) cards.push(asCard);
    const fmtCard = farmPanelBuildFermentationCard(agingShed, farmActivity);
    if (fmtCard) cards.push(fmtCard);
    const spCard = farmPanelBuildSpiceCard(agingShed, farmActivity);
    if (spCard) cards.push(spCard);
  }
  return cards;
}

export function farmPanelComputeMapNodes(json, picks) {
  if (!json) return [];
  try {
    applyFarmSkillsOnly(json, json);
  } catch (e) {}
  try {
    applyFarmBoostsOnly(json);
  } catch (e) {}
  const raw = farmPanelComputeInProgressRaw(json, {
    mapMode: true,
    mapPicks: picks
  });
  const nodes = [];
  raw.forEach(row => {
    if (!row || !row.mapPos) return;
    let badge = null;
    if (row.harvestsLeft != null) badge = String(row.harvestsLeft);
    else if (row.crimstoneMinesLeft != null) badge = String(row.crimstoneMinesLeft);
    else if (row.oilMinesUntilBonus != null) badge = String(row.oilMinesUntilBonus);
    else if (row.sunstoneMinesLeft != null) badge = String(row.sunstoneMinesLeft);
    else if (row.willSwarm === true) badge = "S";
    const yieldVal = row.qty;
    nodes.push({
      name: row.name,
      x: row.mapPos.x,
      y: row.mapPos.y,
      w: row.mapPos.w,
      h: row.mapPos.h,
      badge: badge,
      yieldVal: typeof yieldVal === "number" ? yieldVal : null,
      procs: Array.isArray(row.mapProcs) ? row.mapProcs : [],
      mapKey: row.mapKey || null,
      pickNo: row.mapPickNo || null,
      autoNo: row.mapAutoNo || null,
      ready: row.ready,
      remainingSec: row.remainingSec
    });
  });
  return nodes;
}

export function farmPanelComputeInProgress(json) {
  try {
    applyFarmSkillsOnly(json, json);
  } catch (e) {}
  try {
    applyFarmBoostsOnly(json);
  } catch (e) {}
  const raw = farmPanelComputeInProgressRaw(json);
  const animalRows = raw.filter(row => ALL_ANIMAL_PRODUCTS.includes(row.name));
  const otherRows = raw.filter(row => !ALL_ANIMAL_PRODUCTS.includes(row.name));
  const animalCards = farmPanelComputeAnimalCards(animalRows);
  const groups = new Map;
  otherRows.forEach(row => {
    if (!groups.has(row.name)) groups.set(row.name, {
      name: row.name,
      nodes: []
    });
    groups.get(row.name).nodes.push(row);
  });
  const cards = Array.from(groups.values()).map(g => {
    const count = g.nodes.length;
    const readyCount = g.nodes.filter(n => n.ready === true).length;
    const sickCount = g.nodes.filter(n => n.sick === true).length;
    const weatherDestroyedCount = g.nodes.filter(n => n.weatherDestroyed === true).length;
    const weatherDestroyedEvent = g.nodes.find(n => n.weatherDestroyed === true && n.weatherDestroyedEvent)?.weatherDestroyedEvent || null;
    const soonestSec = g.nodes.reduce((min, n) => {
      if (n.remainingSec == null) return min;
      return min == null ? n.remainingSec : Math.min(min, n.remainingSec);
    }, null);
    const noEtaCount = g.nodes.filter(n => n.ready === false && n.remainingSec == null).length;
    const actualYieldCount = g.nodes.filter(n => n.isActualYield).length;
    const boostTrackedCount = g.nodes.filter(n => n.exactBoosts != null).length;
    const isDeterministicYield = g.nodes.some(n => n.isDeterministicYield);
    const turnaroundTypesPredicted = [ ...new Set(g.nodes.filter(n => n.turnaroundPredicted === true).map(n => n.treeType)) ];
    const turnaroundCountsByType = {};
    g.nodes.forEach(n => {
      if (n.turnaroundPredicted === true && n.treeType) {
        const chainLen = typeof n.turnaroundChainLength === "number" && n.turnaroundChainLength > 1 ? n.turnaroundChainLength : 2;
        const triggers = chainLen - 1;
        turnaroundCountsByType[n.treeType] = (turnaroundCountsByType[n.treeType] || 0) + triggers;
      }
    });
    const mutantRewardTotals = {};
    g.nodes.forEach(n => {
      if (n.mutantReward) mutantRewardTotals[n.mutantReward.name] = (mutantRewardTotals[n.mutantReward.name] || 0) + n.mutantReward.amount;
    });
    const mutantRewards = Object.keys(mutantRewardTotals).map(name => ({
      name: name,
      amount: mutantRewardTotals[name]
    }));
    const turnaroundBonusYieldEstimate = g.nodes.reduce((sum, n) => sum + (typeof n.turnaroundBonusEstimate === "number" ? n.turnaroundBonusEstimate : 0), 0);
    const seaBlessedChainInfo = g.name === "Salt" ? g.nodes.map(n => n.seaBlessedChain).find(Boolean) || null : null;
    const goldInstantMineTypesPredicted = [ ...new Set(g.nodes.filter(n => n.goldInstantMinePredicted === true).map(n => n.goldRockName)) ];
    const goldInstantMineBonusYieldEstimate = g.nodes.reduce((sum, n) => sum + (typeof n.goldInstantMineBonusEstimate === "number" ? n.goldInstantMineBonusEstimate : 0), 0);
    const crimstoneInstantMinePredicted = g.nodes.some(n => n.crimstoneInstantMinePredicted === true);
    const crimstoneInstantMineBonusYieldEstimate = g.nodes.reduce((sum, n) => sum + (typeof n.crimstoneInstantMineBonusEstimate === "number" ? n.crimstoneInstantMineBonusEstimate : 0), 0);
    const tierCounts = {};
    g.nodes.forEach(n => {
      if (n.tierLabel) tierCounts[n.tierLabel] = (tierCounts[n.tierLabel] || 0) + 1;
    });
    let oilNodeGroups = null;
    if (g.name === "Oil") {
      const oilNodesList = g.nodes.filter(n => typeof n.oilMinesUntilBonus === "number").map((n, idx) => ({
        index: idx + 1,
        minesUntilBonus: n.oilMinesUntilBonus,
        qty: typeof n.qty === "number" ? n.qty : 0
      }));
      if (oilNodesList.length) oilNodeGroups = oilNodesList;
    }
    let saltNodeGroups = null;
    if (g.name === "Salt") {
      const seen = new Map;
      g.nodes.forEach(n => {
        if (typeof n.saltNodeIndex !== "number") return;
        if (seen.has(n.saltNodeIndex)) return;
        seen.set(n.saltNodeIndex, {
          index: n.saltNodeIndex,
          storedCharges: n.saltNodeStoredCharges || 0,
          maxCharges: n.saltNodeMaxCharges || 0,
          qty: ((n.saltNodeStoredCharges || 0) + (n.saltNodeSeaBlessedRestored || 0)) * (n.saltYieldPerCharge || 0),
          yieldPerCharge: n.saltYieldPerCharge || 0,
          seaBlessedRestored: n.saltNodeSeaBlessedRestored || 0,
          seaBlessedHarvests: n.saltNodeSeaBlessedHarvests || 0,
          seaBlessedProcs: n.saltNodeSeaBlessedProcs || [],
          seaBlessedFuture: n.saltNodeSeaBlessedFuture || [],
          seaBlessedWindowRestored: n.saltNodeSeaBlessedWindowRestored || 0
        });
      });
      if (seen.size) saltNodeGroups = Array.from(seen.values()).sort((a, b) => a.index - b.index);
    }
    let crimstoneNodeGroups = null;
    if (g.name === "Crimstone") {
      const seen = new Map;
      g.nodes.forEach(n => {
        if (typeof n.crimstoneNodeIndex !== "number") return;
        if (seen.has(n.crimstoneNodeIndex)) return;
        const minesLeft = typeof n.crimstoneMinesLeft === "number" ? n.crimstoneMinesLeft : 5;
        seen.set(n.crimstoneNodeIndex, {
          index: n.crimstoneNodeIndex,
          streakPosition: Math.min(5, Math.max(1, 6 - minesLeft)),
          qty: typeof n.qty === "number" ? n.qty : 0
        });
      });
      if (seen.size) crimstoneNodeGroups = Array.from(seen.values()).sort((a, b) => a.index - b.index);
    }
    let plantYieldLabel = null;
    let plantYieldGroups = null;
    if (BASE_CROPS[g.name] || BASE_GREENHOUSE[g.name] || FLOWER_VARIETIES[g.name]) {
      plantYieldLabel = BASE_CROPS[g.name] ? "Crops Yield" : BASE_GREENHOUSE[g.name] ? "Greenhouse Yield" : "Flower Bed Yield";
      plantYieldGroups = g.nodes.map((n, idx) => ({
        index: typeof n.plotIndex === "number" ? n.plotIndex : idx + 1,
        qty: typeof n.qty === "number" ? n.qty : null,
        seedReward: n.seedReward || null
      }));
    }
    const boostedStats = farmPanelGetBoostedYieldStats(g.name);
    if (g.name === "Salt") boostedStats.activeBoosts = farmPanelGetSaltActiveBoosts();
    if (g.name === "Honey") boostedStats.activeBoosts = farmPanelGetHoneyActiveBoosts();
    const boostedPerUnit = boostedStats.yieldVal;
    const basePerUnit = farmPanelGetBaseYield(g.name);
    const usedBoostFallback = g.nodes.some(n => typeof n.qty !== "number");
    const tierYields = {};
    g.nodes.forEach(n => {
      if (!n.tierGroupLabel) return;
      const y = typeof n.qty === "number" ? n.qty : boostedPerUnit;
      tierYields[n.tierGroupLabel] = (tierYields[n.tierGroupLabel] || 0) + y;
    });
    const rawTotalYield = g.nodes.reduce((sum, n) => sum + (typeof n.qty === "number" ? n.qty : boostedPerUnit), 0);
    const totalYield = rawTotalYield;
    const baseTotalYield = basePerUnit * count;
    const avgYieldNodeCount = g.name === "Salt" && typeof g.nodes[0]?.physicalNodes === "number" ? g.nodes[0].physicalNodes : count;
    const avgYieldPerCycle = boostedPerUnit * avgYieldNodeCount;
    const isBoosted = usedBoostFallback && boostedStats.activeBoosts && boostedStats.activeBoosts.length > 0 && totalYield !== baseTotalYield;
    const exactBoostsSeen = new Map;
    g.nodes.forEach(n => {
      (n.exactBoosts || []).forEach(b => {
        const key = b.name + "|" + b.valueText;
        if (!exactBoostsSeen.has(key)) exactBoostsSeen.set(key, b);
      });
    });
    const exactBoosts = Array.from(exactBoostsSeen.values());
    const exactBoostTotalsSeen = new Map;
    g.nodes.forEach(n => {
      (n.exactBoosts || []).forEach(b => {
        const amt = parseYieldBoostAmount(b.valueText);
        if (!amt) return;
        if (!exactBoostTotalsSeen.has(b.name)) exactBoostTotalsSeen.set(b.name, 0);
        exactBoostTotalsSeen.set(b.name, exactBoostTotalsSeen.get(b.name) + amt);
      });
    });
    const exactBoostTotals = Array.from(exactBoostTotalsSeen.entries()).map(([name, total]) => ({
      name: name,
      total: total
    }));
    const exactTimeBoostsSeen = new Map;
    g.nodes.forEach(n => {
      (n.exactBoosts || []).forEach(b => {
        if (!b.timeMult || b.timeMult === 1) return;
        if (!exactTimeBoostsSeen.has(b.name)) exactTimeBoostsSeen.set(b.name, b.timeMult);
      });
    });
    const exactTimeBoosts = Array.from(exactTimeBoostsSeen.entries()).map(([name, timeMult]) => ({
      name: name,
      timeMult: timeMult
    }));
    const econ = farmPanelComputeEconomics(g.name, count, totalYield);
    const displayNodeCount = typeof g.nodes[0]?.physicalNodes === "number" ? g.nodes[0].physicalNodes : count;
    const cycleTimeSec = boostedStats.timeVal || farmPanelGrowTimeSec(g.name);
    const cyclesPerDay = cycleTimeSec ? g.name === "Salt" ? Math.round(86400 / cycleTimeSec) : 86400 / cycleTimeSec : null;
    const shrineInfo = getActiveShrineDailyCostStable(boostedStats.activeBoosts);
    const shrineCostPerCycle = shrineInfo.total > 0 ? cyclesPerDay ? shrineInfo.total / cyclesPerDay : shrineInfo.total : 0;
    let fruitWood = null;
    let harvestsLeftCounts = null;
    let fruitWoodPerTree = null;
    const fruitDef = BASE_FRUITS[g.name];
    if (fruitDef && g.nodes.some(n => typeof n.harvestsLeft === "number")) {
      harvestsLeftCounts = {};
      g.nodes.forEach(n => {
        if (typeof n.harvestsLeft !== "number") return;
        harvestsLeftCounts[n.harvestsLeft] = (harvestsLeftCounts[n.harvestsLeft] || 0) + 1;
      });
      const treesAtFinalHarvest = harvestsLeftCounts[1] || 0;
      const boostedFruit = computeBoostedFruitStats(g.name, fruitDef.yieldPerHarvest, fruitDef.timeSec, fruitDef.minHarvest);
      fruitWoodPerTree = Math.max(0, (fruitDef.woodReturnQty || 0) - (boostedFruit.woodReturnPenalty || 0) + (boostedFruit.woodReturnAdd || 0));
      if (treesAtFinalHarvest > 0) {
        const woodTotalYield = fruitWoodPerTree * treesAtFinalHarvest;
        if (woodTotalYield > 0) {
          const woodEcon = farmPanelComputeEconomics("Wood", treesAtFinalHarvest, woodTotalYield);
          if (boostedFruit.noWoodCost) {
            woodEcon.costPerUnit = 0;
            woodEcon.seedCost = 0;
            woodEcon.restockInfo = null;
            woodEcon.restockCost = 0;
            woodEcon.totalCost = 0;
            woodEcon.profit = woodEcon.netRevenue;
          }
          fruitWood = {
            treesAtFinalHarvest: treesAtFinalHarvest,
            perTreeQty: fruitWoodPerTree,
            noWoodCost: boostedFruit.noWoodCost,
            econ: woodEcon
          };
        }
      }
    }
    const profitWithShrine = econ.profit - shrineCostPerCycle + (fruitWood ? fruitWood.econ.profit : 0);
    let moneyTreeBonus = null;
    if (g.name === "Wood") {
      const mtData = farmPanelDetectMoneyTreeBonus(json);
      const mtBatchCoins = (mtData.batchPredictions || []).reduce((sum, b) => sum + (b.coins || 0), 0);
      const mtCoins = (mtData.totalCoins || 0) + (mtBatchCoins > 0 ? mtBatchCoins : mtData.predictedCoins || 0);
      if (mtCoins > 0) {
        moneyTreeBonus = {
          coins: mtCoins
        };
      }
    }
    let isHoneyCard = false;
    let honeyHiveDetails = null;
    let honeySwarmCount = 0;
    let honeyMaxPerFill = null;
    if (g.name === "Honey") {
      isHoneyCard = true;
      const sortedHives = g.nodes.slice().sort((a, b) => (a.hiveIndex ?? 0) - (b.hiveIndex ?? 0));
      honeyMaxPerFill = sortedHives.length && typeof sortedHives[0].maxHoneyPerFill === "number" ? sortedHives[0].maxHoneyPerFill : null;
      honeySwarmCount = sortedHives.filter(n => n.willSwarm === true).length;
      honeyHiveDetails = sortedHives.map((n, i) => ({
        label: `Beehive ${i + 1}`,
        currentQty: typeof n.qty === "number" ? n.qty : 0,
        maxQty: typeof n.maxHoneyPerFill === "number" ? n.maxHoneyPerFill : honeyMaxPerFill,
        fillPct: n.maxHoneyPerFill > 0 ? Math.max(0, Math.min(100, n.qty / n.maxHoneyPerFill * 100)) : 0,
        willSwarm: n.willSwarm === true,
        ready: n.ready === true
      }));
    }
    return {
      ...econ,
      profit: profitWithShrine,
      fruitWood: fruitWood,
      harvestsLeftCounts: harvestsLeftCounts,
      fruitWoodPerTree: fruitWoodPerTree,
      readyCount: readyCount,
      sickCount: sickCount,
      weatherDestroyedCount: weatherDestroyedCount,
      weatherDestroyedEvent: weatherDestroyedEvent,
      soonestSec: soonestSec,
      noEtaCount: noEtaCount,
      actualYieldCount: actualYieldCount,
      boostTrackedCount: boostTrackedCount,
      isDeterministicYield: isDeterministicYield,
      mutantRewards: mutantRewards,
      turnaroundTypesPredicted: turnaroundTypesPredicted,
      turnaroundCountsByType: turnaroundCountsByType,
      turnaroundBonusYieldEstimate: turnaroundBonusYieldEstimate,
      seaBlessedChain: seaBlessedChainInfo,
      moneyTreeBonus: moneyTreeBonus,
      isHoneyCard: isHoneyCard,
      honeyHiveDetails: honeyHiveDetails,
      honeySwarmCount: honeySwarmCount,
      honeyMaxPerFill: honeyMaxPerFill,
      goldInstantMineTypesPredicted: goldInstantMineTypesPredicted,
      goldInstantMineBonusYieldEstimate: goldInstantMineBonusYieldEstimate,
      crimstoneInstantMinePredicted: crimstoneInstantMinePredicted,
      crimstoneInstantMineBonusYieldEstimate: crimstoneInstantMineBonusYieldEstimate,
      baseTotalYield: baseTotalYield,
      avgYieldPerCycle: avgYieldPerCycle,
      isBoosted: isBoosted,
      cycleTimeSec: cycleTimeSec,
      activeBoosts: boostedStats.activeBoosts,
      exactBoosts: exactBoosts,
      exactBoostTotals: exactBoostTotals,
      exactTimeBoosts: exactTimeBoosts,
      tierCounts: tierCounts,
      tierYields: tierYields,
      oilNodeGroups: oilNodeGroups,
      saltNodeGroups: saltNodeGroups,
      crimstoneNodeGroups: crimstoneNodeGroups,
      plantYieldLabel: plantYieldLabel,
      plantYieldGroups: plantYieldGroups,
      displayNodeCount: displayNodeCount,
      cyclesPerDay: cyclesPerDay,
      shrineCostPerCycle: shrineCostPerCycle,
      shrineNames: shrineInfo.shrines.map(x => x.name),
      shrineDetails: shrineInfo.shrines.map(x => ({
        name: x.name,
        totalCost: x.totalCost,
        durationDays: x.durationDays,
        dailyCostPreShare: x.dailyCostPreShare,
        shareCount: x.shareCount,
        dailyCostPostShare: x.dailyCost,
        perCycleContribution: cyclesPerDay ? x.dailyCost / cyclesPerDay : x.dailyCost
      }))
    };
  });
  const cookingCards = farmPanelComputeCookingCards(json);
  const allCards = cards.concat(animalCards).concat(cookingCards);
  allCards.sort((a, b) => b.profit - a.profit);
  const peteQuestCard = farmPanelComputePeteQuestCard(json);
  if (peteQuestCard) allCards.push(peteQuestCard);
  return allCards;
}

const PETE_QUEST_LINK = "https://github.com/01101010110/Pumpkin-Pete-Quests/blob/main/Quests.md";

const PETE_REWARD_ALIASES = {
  coin: "Coins",
  coins: "Coins",
  gem: "Gem",
  gems: "Gem",
  axes: "Axe",
  pickaxes: "Pickaxe",
  rods: "Rod",
  "love charms": "Love Charm",
  "wild mushrooms": "Wild Mushroom",
  mushrooms: "Wild Mushroom",
  mushroom: "Wild Mushroom",
  "kale seeds": "Kale Seed"
};

function farmPanelPeteIconHtml() {
  const src = NPC_ICONS && NPC_ICONS["pumpkin' pete"];
  if (!src) return "🎃";
  return `<img src="${src}" alt="Pumpkin Pete" style="width:14px;height:14px;image-rendering:pixelated;vertical-align:middle;">`;
}

function peteTitleCase(text) {
  return String(text || "").trim().replace(/\S+/g, w => w.charAt(0).toUpperCase() + w.slice(1));
}

function peteNormalizeItemName(raw) {
  const lower = String(raw || "").trim().toLowerCase();
  if (PETE_REWARD_ALIASES[lower]) return PETE_REWARD_ALIASES[lower];
  const titled = peteTitleCase(lower);
  const hasIcon = n => !!(IMAGE_ICONS[n] || ICONS[n]);
  if (hasIcon(titled)) return titled;
  if (lower.endsWith("es") && hasIcon(peteTitleCase(lower.slice(0, -2)))) return peteTitleCase(lower.slice(0, -2));
  if (lower.endsWith("s") && hasIcon(peteTitleCase(lower.slice(0, -1)))) return peteTitleCase(lower.slice(0, -1));
  return titled;
}

function peteRewardIconHtml(name) {
  if (name === "Coins") return COIN_ICON;
  const hasIcon = n => !!(IMAGE_ICONS[n] || ICONS[n]);
  if (hasIcon(name)) return getIcon(name);
  if (/ Seed$/.test(name)) {
    const base = name.replace(/ Seed$/, "");
    if (hasIcon(base)) return getIcon(base);
  }
  if (/mushroom/i.test(name)) return '<span style="font-size:16px;line-height:1;">🍄</span>';
  return "";
}

function peteParseReward(text) {
  const raw = String(text || "").trim();
  return raw.split(/\s+and\s+/i).map(p => p.trim()).filter(Boolean).map(part => {
    const m = part.match(/^(\d+(?:\.\d+)?)\s+(.+)$/);
    if (!m) return {
      label: peteTitleCase(part),
      icon: ""
    };
    const itemName = peteNormalizeItemName(m[2]);
    return {
      label: `${m[1]} ${peteTitleCase(m[2])}`,
      icon: peteRewardIconHtml(itemName)
    };
  });
}

function farmPanelComputePeteQuestCard(json) {
  try {
    const g = farmSyncExtractGameState(json);
    const telegram = farmPanelField(g, "telegram");
    const quest = telegram && typeof telegram === "object" ? telegram.quest : null;
    if (!quest || typeof quest.name !== "string" || !quest.name.trim()) return null;
    const startAt = Number(quest.startAt);
    const readyAtMs = Number.isFinite(startAt) && startAt > 0 ? startAt : 0;
    const remainingSec = readyAtMs > Date.now() ? (readyAtMs - Date.now()) / 1e3 : 0;
    const questKey = quest.name.trim();
    const info = getPumpkinPeteQuest(questKey);
    return {
      isPeteQuestCard: true,
      name: "Pumpkin Pete Quest",
      profit: 0,
      questKey: questKey,
      title: info ? info.title : peteTitleCase(questKey.replace(/[-_]+/g, " ")),
      description: info ? info.description : "",
      choices: info && Array.isArray(info.choices) ? info.choices : [],
      isKnown: !!info,
      readyAtMs: readyAtMs,
      remainingSec: remainingSec,
      isReady: remainingSec <= 0
    };
  } catch (e) {
    return null;
  }
}

function farmPanelStockCategoryNames() {
  return new Set([ ...Object.keys(BASE_CROPS), ...Object.keys(BASE_FRUITS), ...Object.keys(BASE_GREENHOUSE), ...Object.keys(RESOURCE_DATA), ...Object.keys(BAIT_RECIPES), "Obsidian", "Sunstone", "Salt", "Honey" ]);
}

export function farmPanelComputeStocks(json) {
  const g = farmSyncExtractGameState(json);
  const inv = farmPanelField(g, "inventory");
  if (!inv || typeof inv !== "object") return [];
  const stockNames = farmPanelStockCategoryNames();
  const rows = [];
  Object.entries(inv).forEach(([name, amount]) => {
    if (!stockNames.has(name)) return;
    const qty = typeof amount === "string" ? parseFloat(amount) : Number(amount);
    if (!qty || qty <= 0) return;
    rows.push(farmPanelComputeEconomics(name, 1, qty));
  });
  rows.sort((a, b) => b.profit - a.profit);
  return rows;
}

function farmPanelRenderAnimalYieldBoostList(boosts, productNames, products, fallbackCount, spiceBuffCards, timeBoosts, costBoosts, cycleTimeSec) {
  const countForProduct = pname => {
    const match = products && products.find(p => p.name === pname);
    return match && typeof match.count === "number" ? match.count : fallbackCount || 0;
  };
  const yieldEntries = [];
  (boosts || []).forEach(b => {
    const boostIcon = getBoostIcon(b.name);
    if (b.yieldMultAll) {
      const mult = b.yieldMultAll;
      (products || []).forEach((p, idx) => {
        const extra = p.totalYield * (mult - 1) / mult;
        const picon = getIcon(p.name);
        yieldEntries.push({
          productIndex: idx,
          html: `<div class="boost-applied-row is-yield">${boostIcon}<b>${escapeHtml(b.name)}</b> <span class="boost-mult-note">(×${mult})</span> <span class="boost-total-value">+${fmtAnimal(extra)}</span>${picon}</div>`
        });
      });
      return;
    }
    if (b.yieldAddAll) {
      (products || []).forEach((p, idx) => {
        const pname = productNames && productNames[idx] ? productNames[idx] : p.name;
        const picon = getIcon(pname);
        const totalAdd = b.yieldAddAll * countForProduct(pname);
        yieldEntries.push({
          productIndex: idx,
          html: `<div class="boost-applied-row is-yield">${boostIcon}<b>${escapeHtml(b.name)}</b> <span class="boost-total-value">+${fmtAnimal(totalAdd)}</span>${picon}</div>`
        });
      });
      return;
    }
    if (b.yieldAdd) {
      const pIndex = b.productIndex != null ? b.productIndex : 999;
      const pname = productNames && productNames[pIndex] ? productNames[pIndex] : "";
      const picon = pname ? getIcon(pname) : "";
      const totalAdd = b.yieldAdd * countForProduct(pname);
      yieldEntries.push({
        productIndex: pIndex,
        html: `<div class="boost-applied-row is-yield">${boostIcon}<b>${escapeHtml(b.name)}</b> <span class="boost-total-value">+${fmtAnimal(totalAdd)}</span>${picon}</div>`
      });
    }
  });
  yieldEntries.sort((a, b) => a.productIndex - b.productIndex);
  const yieldHtmlParts = yieldEntries.map(e => e.html);
  const timeHtmlParts = (timeBoosts || []).map(b => {
    const boostIcon = getBoostIcon(b.name);
    const mult = (b.timeMult || 1) * (b.timeMultAll || 1);
    const pct = (1 - mult) * 100;
    const secondsSaved = cycleTimeSec != null ? cycleTimeSec * (1 / mult - 1) : null;
    const savedNote = secondsSaved != null ? ` <span class="boost-total-value">-${farmPanelFormatSpiceDuration(secondsSaved)}</span>` : "";
    return `<div class="boost-applied-row is-time">${boostIcon}<b>${escapeHtml(b.name)}</b> <span class="boost-mult-note">(-${fmtAnimal(pct)}% cycle time)</span>${savedNote}</div>`;
  });
  const costHtmlParts = [];
  (spiceBuffCards || []).forEach(card => {
    if (card.category !== "cost") yieldHtmlParts.push(card.html);
  });
  const sections = [ [ "YIELD", yieldHtmlParts ], [ "TIME REDUCTION", timeHtmlParts ] ].filter(([, parts]) => parts.length);
  if (!sections.length) return "";
  const sectionsHtml = sections.map(([label, parts]) => `<div class="lib-section-title" style="margin-top:10px;">${label}</div>${parts.join("")}`).join("");
  return `<div class="section-badge is-boost-label">⚡ Applied Boost</div>${sectionsHtml}`;
}

function farmPanelComputeNodeYieldBoostSummary(row) {
  const rawCount = row.count || 0;
  const exactCount = row.boostTrackedCount || 0;
  const fallbackCount = Math.max(0, rawCount - exactCount);
  const estimateCount = exactCount > 0 ? fallbackCount : row.displayNodeCount || rawCount;
  const itemTier = (BASE_CROPS[row.name] || {}).tier;
  const totals = new Map;
  const add = (name, amount) => {
    if (!amount) return;
    totals.set(name, (totals.get(name) || 0) + amount);
  };
  if (estimateCount > 0) {
    const fallbackFraction = rawCount > 0 ? estimateCount / rawCount : 1;
    (row.activeBoosts || []).forEach(b => {
      const yieldAdd = getEffectiveYieldAdd(b, itemTier, row.name);
      if (yieldAdd) add(b.name, yieldAdd * estimateCount);
      if (b.yieldMult) add(b.name, (row.totalYield || 0) * fallbackFraction * (b.yieldMult - 1) / b.yieldMult);
      if (b.yieldMultAll) add(b.name, (row.totalYield || 0) * fallbackFraction * (b.yieldMultAll - 1) / b.yieldMultAll);
      if (b.harvestAdd) add(b.name, b.harvestAdd * estimateCount);
      if (b.flowerExtraFlat) add(b.name, b.flowerExtraFlat * estimateCount);
    });
  }
  (row.exactBoostTotals || []).forEach(eb => add(eb.name, eb.total));
  if (row.name === "Gold" && row.goldInstantMineBonusYieldEstimate > 0) add("Pickaxe Shark", row.goldInstantMineBonusYieldEstimate);
  return Array.from(totals.entries()).filter(([, total]) => total > 1e-9).map(([name, total]) => ({
    name: name,
    total: total
  }));
}

function farmPanelRenderNodeYieldBoostList(row, summary, produceIcon) {
  const yieldHtmlParts = (summary || []).map(b => `<div class="boost-applied-row is-yield">${getBoostIcon(b.name)}<b>${escapeHtml(b.name)}</b> <span class="boost-total-value">+${fmt(b.total)}</span>${produceIcon}</div>`);
  const seenTime = new Set;
  const timeBoostSources = (row.activeBoosts || []).concat(row.exactTimeBoosts || []);
  const timeHtmlParts = timeBoostSources.filter(b => b.timeMult && b.timeMult !== 1 && !seenTime.has(b.name) && seenTime.add(b.name)).map(b => {
    const boostIcon = getBoostIcon(b.name);
    const pct = (1 - b.timeMult) * 100;
    const secondsSaved = row.cycleTimeSec != null ? row.cycleTimeSec * (1 / b.timeMult - 1) : null;
    const savedNote = secondsSaved != null ? ` <span class="boost-total-value">-${farmPanelFormatSpiceDuration(secondsSaved)}</span>` : "";
    return `<div class="boost-applied-row is-time">${boostIcon}<b>${escapeHtml(b.name)}</b> <span class="boost-mult-note">(-${fmt(pct)}% cycle time)</span>${savedNote}</div>`;
  });
  const sections = [ [ "YIELD", yieldHtmlParts ], [ "TIME REDUCTION", timeHtmlParts ] ].filter(([, parts]) => parts.length);
  if (!sections.length) return "";
  const sectionsHtml = sections.map(([label, parts]) => `<div class="lib-section-title" style="margin-top:10px;">${label}</div>${parts.join("")}`).join("");
  return `<div class="section-badge is-boost-label">⚡ Applied Boost</div>${sectionsHtml}`;
}

function farmPanelCardCategory(row) {
  if (row.isPeteQuestCard) return "pete";
  if (row.isAnimalMerged) return "animals";
  if (row.isHoneyCard) return "beehive";
  const name = row.name;
  if (BASE_GREENHOUSE[name]) return "greenhouse";
  if (FLOWER_VARIETIES[name]) return "beehive";
  if (BASE_CROPS[name]) return "crops";
  if (BASE_FRUITS[name]) return "fruits";
  return "resources";
}

export function farmPanelRowIsReady(row) {
  if (!row) return false;
  if (row.isPeteQuestCard) return !!row.isReady;
  return (row.readyCount || 0) > 0;
}

function guroCountdownText(sec) {
  return farmPanelFormatCountdown(sec).replace(/ left$/, "");
}

function guroStatusFoldHtml(word, sec) {
  if (sec == null) return "";
  return `<div class="guro-status-fold"><span class="guro-status-label">${word} IN</span><span class="guro-status-value farm-countdown" data-base="${sec}">${guroCountdownText(sec)}</span></div>`;
}

function guroSignedAmount(v, fmtFn) {
  return `${v < 0 ? "" : "+"}${fmtFn(v)}`;
}

function guroValueBlockHtml(gross, fee, fmtFn) {
  const grossVal = gross || 0;
  const netVal = grossVal - (fee || 0);
  return `<div class="guro-value-block"><div class="guro-market-value"><span class="guro-market-label">Market value</span><span class="guro-market-amount">${guroSignedAmount(grossVal, fmtFn)} ${FLOWER_ICON}</span></div><div class="guro-net-line"><span class="guro-net-label">Net</span><span class="guro-net-amount">${guroSignedAmount(netVal, fmtFn)} ${FLOWER_ICON}</span></div></div>`;
}

export function farmPanelRenderCategoryFilterBar() {
  const cats = [ {
    id: "all",
    label: "All",
    name: "All Growing",
    icon: ""
  }, {
    id: "crops",
    label: "Crops",
    name: "Growing Crops",
    icon: getIcon("Sunflower")
  }, {
    id: "resources",
    label: "Resources",
    name: "Recovering Resources",
    icon: getIcon("Axe")
  }, {
    id: "greenhouse",
    label: "Greenhouse",
    name: "Greenhouse",
    icon: RCM_GREENHOUSE_ICON_HTML
  }, {
    id: "beehive",
    label: "Beehive",
    name: "Beehive",
    icon: getIcon("Beehive")
  }, {
    id: "fruits",
    label: "Fruits",
    name: "Growing Fruits",
    icon: getIcon("Orange")
  }, {
    id: "animals",
    label: "Animals",
    name: "Animals",
    icon: getIcon("Chicken")
  }, {
    id: "cooking",
    label: "Cooking",
    name: "Cooking Buildings",
    icon: COOKING_PANEL_TAB_ICON_HTML
  }, {
    id: "pete",
    label: "Pumpkin Pete Quest",
    name: "Pete's Quest",
    icon: farmPanelPeteIconHtml()
  } ];
  const btns = cats.map(c => `<button type="button" class="fp-filter-btn${farmPanelInProgressCategoryFilter === c.id ? " active" : ""}${c.id === "all" ? " has-label" : ""}" data-fp-filter-btn="${c.id}" title="${c.label}"><span class="fp-filter-icon">${c.icon}</span><span class="fp-filter-name">${c.id === "all" ? `<span class="fp-n-s">All</span><span class="fp-n-l">${c.name}</span>` : c.name}</span></button>`).join("");
  return `<div class="fp-filter-bar">${btns}</div>`;
}

function farmPanelProgressWord(row) {
  const cat = farmPanelCardCategory(row);
  if (cat === "resources") return "Recovering";
  return "Growing";
}

function farmPanelStatusBadgeHtml(readyCount, growingCount, word) {
  if (readyCount > 0 && growingCount > 0) {
    return `<span class="harvest-badge-group"><span class="harvest-badge is-ready">✅ Ready ${readyCount}</span><span class="harvest-badge is-growing">⏳ ${word} ${growingCount}</span></span>`;
  }
  if (readyCount > 0) return `<span class="harvest-badge is-ready">✅ Ready</span>`;
  return `<span class="harvest-badge is-growing">⏳ ${word}</span>`;
}

function farmPanelRenderAnimalMergedCard(card) {
  const baseStatus = card.readyCount > 0 ? card.readyCount === card.count ? "✅ All ready" : `✅ ${card.readyCount} ready · ⏳ ${card.count - card.readyCount} growing` : "⏳ Growing";
  const showCountdown = card.soonestSec != null && card.readyCount < card.count;
  const noEtaGrowing = !showCountdown && card.readyCount < card.count && card.noEtaCount > 0;
  const statusLine = noEtaGrowing ? `${baseStatus} <span style="color:var(--ink-soft);">(🤒 ${card.noEtaCount} sick — can't estimate)</span>` : baseStatus;
  const statusFoldHtml = guroStatusFoldHtml("Sleeping", showCountdown ? card.soonestSec : null);
  const cardNet = card.gross - card.sellFee;
  const isProfit = cardNet >= 0;
  const expandedCls = farmPanelExpandedNames.has(card.searchKey) ? " expanded" : "";
  const growingCount = card.count - card.readyCount;
  const statusBadgeHtml = farmPanelStatusBadgeHtml(card.readyCount, growingCount, "Sleeping");
  let badgeHtml = "";
  if (card.sickCount > 0) {
    badgeHtml += `<span class="harvest-badge" style="background:rgba(214,80,80,0.15);color:#c33;">🤒 ${card.sickCount} sick</span>`;
  }
  const animalIcon = getIcon(card.typeLabel);
  const productChipsHtml = card.products.map(p => `\n      <span class="animal-produce-chip">\n        <span class="produce-yield">+${fmtAnimal(p.totalYield)}</span>\n        <span class="produce-icon">${getIcon(p.name)}</span>\n        <span class="produce-name">${escapeHtml(p.name)}</span>\n      </span>`).join("");
  const valueBlockHtml = guroValueBlockHtml(card.gross, card.sellFee, fmtAnimal);
  const productDetailRows = card.products.map(p => renderAnimalCardProductDetailRow(getIcon(p.name), p.name, p.totalYield, p.grossRevenue, p.feeAmount)).join("");
  const yieldBoostListHtml = farmPanelRenderAnimalYieldBoostList(card.yieldBoosts, card.productNames, card.products, card.count, card.spiceBuffCards, card.timeBoosts, [], card.cycleTimeSec);
  const animalYieldGroupsHtml = renderAnimalYieldGroupsList(card);
  return `\n  <div class="card animal-merged-card${isProfit ? " is-profit" : " is-loss"}${expandedCls}" data-search="${card.searchKey}" data-fp-category="animals">\n    <div class="card-toggle">\n      <div class="card-name-row">\n        <span class="card-icon">${animalIcon}</span>\n        <div>\n          <div class="card-name">${escapeHtml(card.typeLabel)}</div>\n          <div class="card-type-row">\n            <span class="card-type">${card.count} animal${card.count === 1 ? "" : "s"}</span>\n            ${badgeHtml}\n          </div>\n          <div class="animal-fold-row">${productChipsHtml}</div>${valueBlockHtml}\n        </div>\n      </div>\n      <div class="card-collapsed-profit">\n        ${statusBadgeHtml}\n        <span class="chev">▾</span>\n      </div>\n      ${statusFoldHtml}\n    </div>\n    <div class="card-details">\n      <div class="animal-detail-grid">\n        ${productDetailRows}\n        <div class="animal-detail-stat"><span class="label">Market Price/Unit</span><span class="value">${fmtAnimalCost(card.avgPricePerUnit)} ${FLOWER_ICON}</span></div>\n        <div class="animal-detail-stat"><span class="label">Market Value</span><span class="value">${fmtAnimal(card.gross)} ${FLOWER_ICON}</span></div>\n        <div class="animal-detail-stat"><span class="label">Tax</span><span class="value">${card.sellFee > 0 ? `-${fmtAnimalCost(card.sellFee)}` : "0"} ${FLOWER_ICON}</span></div>\n      </div>\n      <div class="animal-net-row2">\n        <span class="label">Net</span>\n        <span class="value ${isProfit ? "is-profit" : "is-loss"}">${fmtAnimal(cardNet)} ${FLOWER_ICON}</span>\n      </div>\n      ${animalYieldGroupsHtml}\n      ${yieldBoostListHtml}\n    </div>\n  </div>`;
}

function farmPanelRenderHoneyCard(row) {
  const baseStatus = row.readyCount > 0 ? row.readyCount === row.count ? "✅ All ready" : `✅ ${row.readyCount} ready · ⏳ ${row.count - row.readyCount} growing` : "⏳ Growing";
  const showCountdown = row.soonestSec != null && row.readyCount < row.count;
  const noEtaGrowing = !showCountdown && row.readyCount < row.count && row.noEtaCount > 0;
  const statusLine = noEtaGrowing ? `${baseStatus} <span style="color:var(--ink-soft);">(no active flower/growth right now — can't estimate)</span>` : baseStatus;
  const statusFoldHtml = guroStatusFoldHtml("Collecting", showCountdown ? row.soonestSec : null);
  const isProfit = row.grossRevenue - row.feeAmount >= 0;
  const expandedCls = farmPanelExpandedNames.has(row.name.toLowerCase()) ? " expanded" : "";
  const growingCount = row.count - row.readyCount;
  const statusBadgeHtml = farmPanelStatusBadgeHtml(row.readyCount, growingCount, "Collecting");
  let badgeHtml = "";
  const tierEntries = row.tierCounts ? Object.entries(row.tierCounts) : [];
  const tierNote = tierEntries.length ? ` <span class="card-tier-note">(${tierEntries.map(([label, c]) => `${c} ${escapeHtml(label)}`).join(", ")})</span>` : "";
  const beehiveIcon = getIcon("Beehive");
  const produceIcon = getIcon("Honey");
  const boostSummary = farmPanelComputeNodeYieldBoostSummary(row);
  const productChipHtml = `\n      <span class="animal-produce-chip">\n        <span class="produce-yield">+${fmt(row.totalYield)}</span>\n        <span class="produce-icon">${produceIcon}</span>\n        <span class="produce-name">${escapeHtml(row.name)}</span>\n      </span>`;
  const valueBlockHtml = guroValueBlockHtml(row.grossRevenue, row.feeAmount, fmt);
  const swarmChipHtml = row.honeySwarmCount > 0 ? `\n      <span class="animal-produce-chip bee-swarm-chip">\n        <span class="produce-yield">+${row.honeySwarmCount}</span>\n        <span class="produce-icon"><img src="${BEE_SWARM_ICON}" style="width:16px;height:16px;vertical-align:middle;image-rendering:pixelated;"></span>\n        <span class="produce-name">Bee Swarm</span>\n      </span>` : "";
  const productDetailRow = renderCardProductDetailRow(produceIcon, row.name, row.totalYield, row.grossRevenue, row.feeAmount, row.isBoosted ? row.baseTotalYield : null);
  const boostListHtml = farmPanelRenderNodeYieldBoostList(row, boostSummary, produceIcon);
  const beehiveListHtml = renderBeehiveListHtml(row.honeyHiveDetails);
  return `\n  <div class="card animal-merged-card${isProfit ? " is-profit" : " is-loss"}${expandedCls}" data-search="honey" data-fp-category="beehive">\n    <div class="card-toggle">\n      <div class="card-name-row">\n        <span class="card-icon">${beehiveIcon}</span>\n        <div>\n          <div class="card-name">Beehive</div>\n          <div class="card-type-row">\n            <span class="card-type">${row.displayNodeCount} node${row.displayNodeCount === 1 ? "" : "s"}${tierNote}</span>\n            ${badgeHtml}\n          </div>\n          <div class="animal-fold-row">${productChipHtml}${swarmChipHtml}</div>${valueBlockHtml}\n        </div>\n      </div>\n      <div class="card-collapsed-profit">\n        ${statusBadgeHtml}\n        <span class="chev">▾</span>\n      </div>\n      ${statusFoldHtml}\n    </div>\n    <div class="card-details">\n      <div class="animal-detail-grid">\n        ${productDetailRow}\n        <div class="animal-detail-stat"><span class="label">Market Price/Unit</span><span class="value">${fmt(row.price)} ${FLOWER_ICON}</span></div>\n        <div class="animal-detail-stat"><span class="label">Market Value</span><span class="value">${fmt(row.grossRevenue)} ${FLOWER_ICON}</span></div>\n        <div class="animal-detail-stat"><span class="label">Tax</span><span class="value">${row.feeAmount > 0 ? `-${fmt(row.feeAmount)}` : "0"} ${FLOWER_ICON}</span></div>\n      </div>\n      <div class="animal-net-row2">\n        <span class="label">Net</span>\n        <span class="value ${isProfit ? "is-profit" : "is-loss"}">${fmt(row.grossRevenue - row.feeAmount)} ${FLOWER_ICON}</span>\n      </div>\n      ${beehiveListHtml}\n      ${boostListHtml}\n    </div>\n  </div>`;
}

function cookingFoodOrFishIcon(name) {
  if (COOKING_FOOD_IMAGES[name]) return cookFoodIcon(name);
  return getIcon(name);
}

function farmPanelRenderCookingBoostList(row) {
  const yieldHtmlParts = (row.yieldBoostTotals || []).map(b => `<div class="boost-applied-row is-yield">${getBoostIcon(b.name)}<b>${escapeHtml(b.name)}</b> <span class="boost-total-value">+${fmt(b.total)}</span></div>`);
  const chanceHtmlParts = (row.chanceBoosts || []).map(b => `<div class="boost-applied-row is-yield">${getBoostIcon(b.name)}<b>${escapeHtml(b.name)}</b> <span class="boost-mult-note">(${escapeHtml(b.note)})</span></div>`);
  const timeHtmlParts = (row.timeBoosts || []).map(b => {
    const boostIcon = getBoostIcon(b.name);
    if (b.kind === "oil") return `<div class="boost-applied-row is-time">${boostIcon}<b>${escapeHtml(b.name)}</b> <span class="boost-mult-note">(-${fmt(b.pct)}% cook time with Oil)</span></div>`;
    return `<div class="boost-applied-row is-time">${boostIcon}<b>${escapeHtml(b.name)}</b> <span class="boost-mult-note">(cook time reduced)</span></div>`;
  });
  const sections = [ [ "YIELD", yieldHtmlParts.concat(chanceHtmlParts) ], [ "TIME REDUCTION", timeHtmlParts ] ].filter(([, parts]) => parts.length);
  if (!sections.length) return "";
  const sectionsHtml = sections.map(([label, parts]) => `<div class="lib-section-title" style="margin-top:10px;">${label}</div>${parts.join("")}`).join("");
  return `<div class="section-badge is-boost-label">⚡ Applied Boost</div>${sectionsHtml}`;
}

function farmPanelRenderPeteQuestCard(row) {
  const searchKey = "pumpkin-pete-quest";
  const expandedCls = farmPanelExpandedNames.has(searchKey) ? " expanded" : "";
  const badgeHtml = row.isReady ? `<span class="harvest-badge is-ready">✅ Quest Ready</span>` : `<span class="harvest-badge is-growing">⏳ <span class="fp-quest-countdown" data-ready-at="${row.readyAtMs}">${farmPanelFormatCountdown(row.remainingSec)}</span></span>`;
  const petIcon = NPC_ICONS && NPC_ICONS["pumpkin' pete"] ? `<img src="${NPC_ICONS["pumpkin' pete"]}" alt="Pumpkin Pete" style="width:20px;height:20px;image-rendering:pixelated;vertical-align:middle;">` : "🎃";
  const descHtml = row.description ? `<div class="fp-quest-desc">${escapeHtml(row.description)}</div>` : `<div class="fp-quest-desc">Quest details for "${escapeHtml(row.questKey)}" are not in the list yet.</div>`;
  const choiceRows = row.choices.map(c => {
    const parts = peteParseReward(c.reward);
    const rewardHtml = parts.map(p => `<span class="fp-quest-reward-part">${escapeHtml(p.label)}${p.icon ? ` ${p.icon}` : ""}</span>`).join('<span class="fp-quest-reward-sep">+</span>');
    return `<div class="fp-quest-choice"><span class="fp-quest-choice-text">${escapeHtml(c.text)}</span><span class="fp-quest-reward">${rewardHtml}</span></div>`;
  }).join("");
  const choicesHtml = row.choices.length ? `<div class="lib-section-title" style="margin-top:10px;">CHOICES &amp; REWARDS</div>${choiceRows}` : "";
  return `
  <div class="card animal-merged-card${row.isReady ? " is-profit" : ""}${expandedCls}" data-search="${searchKey}" data-fp-category="pete">
    <div class="card-toggle">
      <div class="card-name-row">
        <span class="card-icon">${petIcon}</span>
        <div>
          <div class="card-name">Pumpkin Pete Quest</div>
          <div class="card-type-row">
            ${badgeHtml}
          </div>
        </div>
      </div>
      <div class="card-collapsed-profit">
        <span class="chev">▾</span>
      </div>
    </div>
    <div class="card-details">
      <div class="fp-quest-title">${escapeHtml(row.title)}</div>
      ${descHtml}
      ${choicesHtml}
      <div class="fp-quest-guide-trigger" data-pete-guide-trigger>How to set up the Telegram Quest Bot</div>
      <a class="fp-quest-credit" href="${PETE_QUEST_LINK}" target="_blank" rel="noopener noreferrer">Special thanks to Digits for compiling quest info</a>
    </div>
  </div>`;
}

function farmPanelRenderCookingCard(row) {
  const building = row.cookingBuilding;
  const isProfit = true;
  const cookGross = (row.productGroups || []).reduce((sum, p) => sum + farmPanelGetMarketPriceFlower(p.name) * (p.amount || 0), 0);
  const cookFee = cookGross * ((feePercent || 0) / 100);
  const valueBlockHtml = cookGross > 0 ? guroValueBlockHtml(cookGross, cookFee, fmt) : "";
  const buildingIconKey = (row.cookingKind === "fermentation" || row.cookingKind === "spice") && IMAGE_ICONS["Aging Shed"] ? "Aging Shed" : building;
  const buildingIcon = IMAGE_ICONS[buildingIconKey] ? getIcon(buildingIconKey) : COOKING_BUILDING_ICONS[building] ? `<span style="font-size:19.2px;line-height:1;">${COOKING_BUILDING_ICONS[building]}</span>` : getIcon(building);
  const searchKey = building.toLowerCase().replace(/\s+/g, "-");
  const expandedCls = farmPanelExpandedNames.has(searchKey) ? " expanded" : "";
  const growingCount = row.slotCount - row.readyCount;
  const statusBadgeHtml = farmPanelStatusBadgeHtml(row.readyCount, growingCount, "Cooking");
  let badgeHtml = "";
  const baseStatus = row.readyCount > 0 ? row.readyCount === row.slotCount ? "✅ All ready" : `✅ ${row.readyCount} ready · ⏳ ${growingCount} cooking` : "⏳ Cooking";
  const showCountdown = row.soonestSec != null && row.readyCount < row.slotCount;
  const statusLine = baseStatus;
  const statusFoldHtml = guroStatusFoldHtml("Cooking", showCountdown ? row.soonestSec : null);
  const productChipHtml = row.productGroups.map(p => `\n      <span class="animal-produce-chip">\n        <span class="produce-yield">+${fmt(p.amount)}</span>\n        <span class="produce-icon">${cookingFoodOrFishIcon(p.name)}</span>\n        <span class="produce-name">${escapeHtml(p.name)}</span>\n      </span>`).join("");
  const yieldLabel = `${building} Yield`;
  const yieldRows = row.slots.map(s => {
    if (row.cookingKind === "aging") {
      const primeNote = s.isPrime ? ` <span style="color:#c9821a;font-weight:700;">(Prime!)</span>` : "";
      return `<div class="boost-applied-row is-yield">${cookingFoodOrFishIcon(s.outputName)}<b>${escapeHtml(s.outputName)}</b> <span class="boost-total-value">${fmt(s.amount)}</span>${primeNote}</div>`;
    }
    return `<div class="boost-applied-row is-yield">${cookingFoodOrFishIcon(s.name)}<b>${escapeHtml(s.name)}</b> <span class="boost-total-value">${fmt(s.amount)}</span></div>`;
  }).join("");
  const yieldListHtml = `<div class="lib-section-title" style="margin-top:10px;">${escapeHtml(yieldLabel)}</div>${yieldRows}`;
  const boostListHtml = farmPanelRenderCookingBoostList(row);
  return `\n  <div class="card animal-merged-card${isProfit ? " is-profit" : " is-loss"}${expandedCls}" data-search="${searchKey}" data-fp-category="cooking">\n    <div class="card-toggle">\n      <div class="card-name-row">\n        <span class="card-icon">${buildingIcon}</span>\n        <div>\n          <div class="card-name">${escapeHtml(building)}</div>\n          <div class="card-type-row">\n            <span class="card-type">${row.slotCount} slot${row.slotCount === 1 ? "" : "s"}</span>\n            ${badgeHtml}\n          </div>\n          <div class="animal-fold-row">${productChipHtml}</div>${valueBlockHtml}\n        </div>\n      </div>\n      <div class="card-collapsed-profit">\n        ${statusBadgeHtml}\n        <span class="chev">▾</span>\n      </div>\n      ${statusFoldHtml}\n    </div>\n    <div class="card-details">\n      ${yieldListHtml}\n      ${boostListHtml}\n    </div>\n  </div>`;
}

export function farmPanelRenderInProgressRow(row) {
  if (row.isAnimalMerged) return farmPanelRenderAnimalMergedCard(row);
  if (row.isHoneyCard) return farmPanelRenderHoneyCard(row);
  if (row.isCookingCard) return farmPanelRenderCookingCard(row);
  if (row.isPeteQuestCard) return farmPanelRenderPeteQuestCard(row);
  const baseStatus = row.readyCount > 0 ? row.readyCount === row.count ? "✅ All ready" : `✅ ${row.readyCount} ready · ⏳ ${row.count - row.readyCount} growing` : "⏳ Growing";
  const showCountdown = row.soonestSec != null && row.readyCount < row.count;
  const noEtaGrowing = !showCountdown && row.readyCount < row.count && row.noEtaCount > 0;
  const isAnimalProduct = ALL_ANIMAL_PRODUCTS.includes(row.name);
  const statusLine = noEtaGrowing ? isAnimalProduct ? `${baseStatus} <span style="color:var(--ink-soft);">(🤒 ${row.noEtaCount} sick — can't estimate)</span>` : `${baseStatus} <span style="color:var(--ink-soft);">(no active flower/growth right now — can't estimate)</span>` : baseStatus;
  const statusFoldHtml = guroStatusFoldHtml(farmPanelProgressWord(row), showCountdown ? row.soonestSec : null);
  const woodGross = row.fruitWood ? row.fruitWood.econ.grossRevenue : 0;
  const woodFee = row.fruitWood ? row.fruitWood.econ.feeAmount : 0;
  const totalGross = row.grossRevenue + woodGross;
  const totalFee = row.feeAmount + woodFee;
  const isProfit = totalGross - totalFee >= 0;
  const expandedCls = farmPanelExpandedNames.has(row.name.toLowerCase()) ? " expanded" : "";
  const growingCount = row.count - row.readyCount;
  const statusBadgeHtml = farmPanelStatusBadgeHtml(row.readyCount, growingCount, farmPanelProgressWord(row));
  let badgeHtml = "";
  if (row.sickCount > 0) {
    badgeHtml += `<span class="harvest-badge" style="background:rgba(214,80,80,0.15);color:#c33;">🤒 ${row.sickCount} sick</span>`;
  }
  if (row.weatherDestroyedCount > 0) {
    const destroyedIcon = row.weatherDestroyedEvent ? IMAGE_ICONS[row.weatherDestroyedEvent] : null;
    badgeHtml += `<span class="harvest-badge" style="background:rgba(214,80,80,0.18);color:#a12626;">${destroyedIcon ? `<img src="${destroyedIcon}" style="width:12px;height:12px;vertical-align:-2px;image-rendering:pixelated;margin-right:2px;">` : "🌊"} ${row.weatherDestroyedCount} destroyed by ${escapeHtml(row.weatherDestroyedEvent || "weather event")}</span>`;
  }
  (row.activeBoosts || []).forEach(b => {
    if (b.limitedBoostName === "Sunshower" || b.limitedBoostName === "Bountiful Harvest" || b.limitedBoostName === "Power hour") {
      const icon = IMAGE_ICONS[b.name];
      badgeHtml += `<span class="harvest-badge" style="background:rgba(255,196,0,0.18);color:#8a6300;">${icon ? `<img src="${icon}" style="width:12px;height:12px;vertical-align:-2px;image-rendering:pixelated;margin-right:2px;">` : "🌦️"} ${escapeHtml(b.name)} active</span>`;
    }
    if (b.isDebuff) {
      const icon = IMAGE_ICONS[b.name];
      const lossPct = Math.round((b.debuffLossMult || .5) * 100);
      badgeHtml += `<span class="harvest-badge" style="background:rgba(214,80,80,0.18);color:#a12626;">${icon ? `<img src="${icon}" style="width:12px;height:12px;vertical-align:-2px;image-rendering:pixelated;margin-right:2px;">` : "⚠️"} ${escapeHtml(b.name)} ~${lossPct}% plots destroyed</span>`;
    }
  });
  const tierEntries = row.tierCounts ? Object.entries(row.tierCounts) : [];
  const tierNote = tierEntries.length ? ` <span class="card-tier-note">(${tierEntries.map(([label, c]) => `${c} ${escapeHtml(label)}`).join(", ")})</span>` : "";
  const nodeIcon = getNodeIconHtml(row.name);
  const nodeLabel = getNodeLabel(row.name);
  const produceIcon = getIcon(row.name);
  const boostSummary = farmPanelComputeNodeYieldBoostSummary(row);
  const woodIcon = row.fruitWood ? getIcon("Wood") : "";
  const woodChipHtml = row.fruitWood ? `\n      <span class="animal-produce-chip fruit-wood-chip">\n        <span class="produce-yield">+${fmt(row.fruitWood.econ.totalYield)}</span>\n        <span class="produce-icon">${woodIcon}</span>\n        <span class="produce-name">Wood</span>\n      </span>` : "";
  const productChipHtml = `\n      <span class="animal-produce-chip">\n        <span class="produce-yield">+${fmt(row.totalYield)}</span>\n        <span class="produce-icon">${produceIcon}</span>\n        <span class="produce-name">${escapeHtml(row.name)}</span>\n      </span>`;
  const mutantChipsHtml = (row.mutantRewards || []).map(m => `<div class="animal-fold-row"><span class="animal-produce-chip mutant-flower-chip"><span class="produce-yield">+${fmt(m.amount)}</span><span class="produce-icon">${getIcon(m.name)}</span><span class="produce-name">${escapeHtml(m.name)}</span></span></div>`).join("");
  const valueBlockHtml = row.name === "Oil" ? "" : FLOWER_VARIETIES[row.name] ? mutantChipsHtml : guroValueBlockHtml(totalGross, totalFee, fmt);
  const moneyTreeBadgeHtml = row.moneyTreeBonus ? `\n      <span class="animal-produce-chip money-tree-badge-chip">\n        <span class="produce-name">Money Tree</span>\n        <span class="produce-yield">+${fmt(row.moneyTreeBonus.coins)}</span>\n        ${COIN_ICON}\n      </span>` : "";
  const productDetailRow = renderCardProductDetailRow(produceIcon, row.name, row.totalYield, row.grossRevenue, row.feeAmount, row.isBoosted ? row.baseTotalYield : null);
  const woodDetailRowHtml = row.fruitWood ? renderCardProductDetailRow(woodIcon, "Wood", row.fruitWood.econ.totalYield, row.fruitWood.econ.grossRevenue, row.fruitWood.econ.feeAmount) : "";
  const boostListHtml = farmPanelRenderNodeYieldBoostList(row, boostSummary, produceIcon);
  const tierYieldListHtml = row.name === "Oil" ? renderOilNodeYieldList(row.oilNodeGroups, produceIcon) : row.name === "Salt" ? renderSaltNodeYieldList(row.saltNodeGroups, produceIcon, row.price) : row.name === "Crimstone" ? renderCrimstoneNodeYieldList(row.crimstoneNodeGroups) : row.plantYieldLabel ? renderPlantYieldNodeList(row.plantYieldLabel, row.name, row.plantYieldGroups, produceIcon, nodeIcon) : renderNodeTierYieldList(row.tierYields, produceIcon);
  const harvestsLeftHtml = renderFruitHarvestsLeftHtml(row.harvestsLeftCounts, row.name, row.fruitWoodPerTree);
  const turnaroundBoostHtml = renderTurnaroundBoostHtml(row);
  const seaBlessedBoostHtml = renderSeaBlessedBoostHtml(row);
  const goldInstantMineBoostHtml = renderGoldInstantMineBoostHtml(row);
  const crimstoneInstantMineBoostHtml = renderCrimstoneInstantMineBoostHtml(row);
  let saltReadyLabelHtml = "";
  let saltProjectedHtml = "";
  if (row.name === "Salt" && row.saltNodeGroups && row.saltNodeGroups.length) {
    saltReadyLabelHtml = `<div class="salt-section-label">Ready to Harvest</div>`;
    const anySaltRecovering = row.saltNodeGroups.some(n => n.storedCharges < n.maxCharges);
    if (anySaltRecovering) {
      const saltChainBonusQty = row.saltNodeGroups.reduce((sum, n) => sum + (n.seaBlessedWindowRestored || 0) * n.yieldPerCharge, 0);
      const saltProjectedQty = row.saltNodeGroups.reduce((sum, n) => sum + n.qty + (n.storedCharges < n.maxCharges ? n.yieldPerCharge : 0), 0) + saltChainBonusQty;
      const saltProjectedHarvests = row.saltNodeGroups.reduce((sum, n) => sum + n.storedCharges + (n.seaBlessedRestored || 0) + (n.storedCharges < n.maxCharges ? 1 : 0) + (n.seaBlessedWindowRestored || 0), 0);
      const projectedEcon = farmPanelComputeEconomics("Salt", saltProjectedHarvests, saltProjectedQty);
      const projectedChipHtml = `\n      <span class="animal-produce-chip salt-projected-chip">\n        <span class="produce-yield">+${fmt(saltProjectedQty)}</span>\n        <span class="produce-icon">${produceIcon}</span>\n        <span class="produce-name">${escapeHtml(row.name)}</span>\n        <span class="produce-value">(${fmt(projectedEcon.grossRevenue)} ${FLOWER_ICON})</span>\n      </span>`;
      const projectedChainNote = saltChainBonusQty > 0 ? `<div class="salt-hint-sea-blessed">⚡ incl. +${fmt(saltChainBonusQty)} Salt from Sea Blessed chain</div>` : "";
      saltProjectedHtml = `<div class="salt-section-label">Projected Harvest</div>\n          <div class="animal-fold-row">${projectedChipHtml}</div>\n          ${projectedChainNote}`;
    }
  }
  return `\n  <div class="card animal-merged-card${isProfit ? " is-profit" : " is-loss"}${expandedCls}" data-search="${row.name.toLowerCase()}" data-fp-category="${farmPanelCardCategory(row)}">\n    <div class="card-toggle">\n      <div class="card-name-row">\n        <span class="card-icon">${nodeIcon}</span>\n        <div>\n          <div class="card-name">${escapeHtml(nodeLabel)}</div>\n          <div class="card-type-row">\n            <span class="card-type">${row.displayNodeCount} node${row.displayNodeCount === 1 ? "" : "s"}${tierNote}</span>\n            ${badgeHtml}\n          </div>\n          ${saltReadyLabelHtml}<div class="animal-fold-row">${productChipHtml}${woodChipHtml}${moneyTreeBadgeHtml}</div>${valueBlockHtml}\n          ${saltProjectedHtml}${seaBlessedBoostHtml}${turnaroundBoostHtml}${goldInstantMineBoostHtml}${crimstoneInstantMineBoostHtml}\n        </div>\n      </div>\n      <div class="card-collapsed-profit">\n        ${statusBadgeHtml}\n        <span class="chev">▾</span>\n      </div>\n      ${statusFoldHtml}\n    </div>\n    <div class="card-details">\n      <div class="animal-detail-grid">\n        ${productDetailRow}${woodDetailRowHtml}\n        <div class="animal-detail-stat"><span class="label">Market Price/Unit</span><span class="value">${fmt(row.price)} ${FLOWER_ICON}</span></div>\n        <div class="animal-detail-stat"><span class="label">Market Value</span><span class="value">${fmt(totalGross)} ${FLOWER_ICON}</span></div>\n        <div class="animal-detail-stat"><span class="label">Tax</span><span class="value">${totalFee > 0 ? `-${fmt(totalFee)}` : "0"} ${FLOWER_ICON}</span></div>\n      </div>\n      <div class="animal-net-row2">\n        <span class="label">Net</span>\n        <span class="value ${isProfit ? "is-profit" : "is-loss"}">${fmt(totalGross - totalFee)} ${FLOWER_ICON}</span>\n      </div>\n      ${harvestsLeftHtml}\n      ${tierYieldListHtml}\n      ${boostListHtml}\n    </div>\n  </div>`;
}

export function farmPanelRenderStockRow(row) {
  const isProfit = row.profit >= 0;
  const expandedCls = farmPanelExpandedNames.has(row.name.toLowerCase()) ? " expanded" : "";
  return `\n  <div class="card${isProfit ? " is-profit" : " is-loss"}${expandedCls}" data-search="${row.name.toLowerCase()}">\n    <div class="card-toggle">\n      <div class="card-name-row">\n        <span class="card-icon">${getIcon(row.name)}</span>\n        <div>\n          <div class="card-name">${escapeHtml(row.name)}</div>\n          <div class="card-type">${fmt(row.totalYield)} in stock</div>\n        </div>\n      </div>\n      <div class="card-collapsed-profit">\n        <span class="pvalue-mini${isProfit ? " is-profit" : " is-loss"}">${isProfit ? "+" : ""}${fmt(row.profit)} ${FLOWER_ICON}</span>\n        <span class="chev">▾</span>\n      </div>\n    </div>\n    <div class="card-details">\n      <div class="card-grid">\n        <div class="stat"><span class="label">Price / unit (market)</span><span class="value">${fmt(row.price)} ${FLOWER_ICON}</span></div>\n        <div class="stat"><span class="label">Cost / unit (seed)</span><span class="value">${fmt(row.costPerUnit)} ${FLOWER_ICON}</span></div>\n      </div>\n      ${renderTotalsBreakdown({
    title: "Totals",
    totalYield: row.totalYield,
    yieldLabel: escapeHtml(row.name),
    gross: row.grossRevenue,
    baseCost: row.totalCost - (row.restockCost || 0),
    restockCost: row.restockCost || 0,
    shrineCost: 0,
    sellFee: row.feeAmount
  })}\n      ${farmPanelRestockNoteHtml(row.restockInfo)}\n    </div>\n  </div>`;
}

function farmPanelRestockNoteHtml(ri) {
  if (!ri || !(ri.flowerCost > 0)) return "";
  const noun = ri.stockKind === "tool" ? "tool" : "seed";
  let txt = `${GEM_ICON} ~${fmt(ri.restocksNeeded)} ${noun} restock${ri.restocksNeeded === 1 ? "" : "s"} needed for this qty · ${fmt(ri.gemsTotal)} ${GEM_ICON} Gems ≈ ${fmt(ri.flowerCost)} ${FLOWER_ICON} (already added to Total cost above)`;
  if (ri.moonOnly) {
    const minDays = Math.ceil(ri.restocksNeeded) * SYNODIC_MONTH_DAYS;
    const moonStock = fullMoonSeedStockQty(ri.name);
    txt += `<br>🌕 Moon-fruit: Betty sells ${fmt(moonStock)} seed${moonStock === 1 ? "" : "s"} per real Full Moon${moonStock > 1 ? " (Moon Hair equipped)" : ""} — even with unlimited Gems this qty needs ~${fmt(minDays)} days minimum.`;
  }
  return `<div class="setting-hint" style="margin-top:4px;font-weight:700;color:#e0a63f;">${txt}</div>`;
}

function farmPanelTickCountdowns() {
  const panel = $("farmSidePanel");
  if (!panel || !panel.classList.contains("open")) return;
  if (farmPanelActiveTab !== "inprogress" || !farmPanelGameState) return;
  if (farmPanelUserScrolling) return;
  const wrap = $("farmPanelTabContent");
  if (!wrap) return;
  const els = wrap.querySelectorAll(".farm-countdown[data-base], .fp-quest-countdown[data-ready-at]");
  if (!els.length) return;
  const elapsedSec = (Date.now() - farmPanelRenderAtMs) / 1e3;
  let anyFinished = false;
  els.forEach(el => {
    if (el.hasAttribute("data-ready-at")) {
      const questRemaining = (parseFloat(el.getAttribute("data-ready-at")) - Date.now()) / 1e3;
      if (questRemaining <= 0) {
        anyFinished = true;
        return;
      }
      el.textContent = farmPanelFormatCountdown(questRemaining);
      return;
    }
    const base = parseFloat(el.getAttribute("data-base"));
    const remaining = base - elapsedSec;
    if (remaining <= 0) {
      anyFinished = true;
      return;
    }
    el.textContent = guroCountdownText(remaining);
  });
  if (anyFinished) renderFarmPanelTabContent();
}

setInterval(farmPanelTickCountdowns, 1e3);

document.addEventListener("visibilitychange", () => {
  if (!document.hidden) renderFarmPanelTabContent();
});

export function farmPanelDebugFindShapes(obj, substrs, path, depth, out) {
  if (!obj || typeof obj !== "object" || depth > 3) return;
  Object.keys(obj).forEach(k => {
    const full = path ? `${path}.${k}` : k;
    if (substrs.some(s => k.toLowerCase().includes(s)) && !out[full]) {
      const v = obj[k];
      if (v && typeof v === "object" && !Array.isArray(v)) {
        const firstKey = Object.keys(v)[0];
        out[full] = firstKey !== undefined ? {
          _sampleKey: firstKey,
          _sampleValue: v[firstKey]
        } : v;
      } else {
        out[full] = v;
      }
    }
    if (obj[k] && typeof obj[k] === "object") farmPanelDebugFindShapes(obj[k], substrs, full, depth + 1, out);
  });
}

const farmPanelDebugCloseBtnEl = $("farmPanelDebugCloseBtn");

if (farmPanelDebugCloseBtnEl) farmPanelDebugCloseBtnEl.onclick = () => {
  $("farmPanelDebugPanel").classList.remove("open");
  $("farmPanelDebugToggle").classList.remove("open");
  const box = $("farmPanelDebugOutput");
  if (box) box.style.display = "none";
};

const farmPanelDebugPetsBtnEl = $("farmPanelDebugPetsBtn");

if (farmPanelDebugPetsBtnEl) farmPanelDebugPetsBtnEl.onclick = () => {
  const box = $("farmPanelDebugOutput");
  if (!farmPanelGameState) {
    box.style.display = "block";
    box.value = "Sync a Farm ID first, then tap this again.";
    return;
  }
  const g = farmSyncExtractGameState(farmPanelGameState);
  const asObj = v => v && typeof v === "object" && !Array.isArray(v) ? v : null;
  const topBag = asObj(farmPanelField(g, "pets"));
  const house = asObj(farmPanelField(g, "petHouse"));
  const heuristic = !topBag || !Object.keys(topBag).length ? farmSyncFindBagByNameHeuristic(g, /^pets$/i, 3) : null;
  const records = typeof farmSyncGetPetRecords === "function" ? farmSyncGetPetRecords(g, true) : {};
  const firstId = Object.keys(records)[0];
  const out = {
    "g.pets (top-level bag)": topBag ? {
      count: Object.keys(topBag).length,
      first: topBag[Object.keys(topBag)[0]] || null
    } : "(missing)",
    "g.petHouse (building, if pets are nested inside it)": house ? {
      topLevelKeys: Object.keys(house),
      sample: house
    } : "(missing)",
    "heuristic search result (only runs if g.pets was missing/empty)": heuristic ? {
      path: heuristic.path,
      count: Object.keys(heuristic.value).length,
      first: Object.values(heuristic.value)[0] || null
    } : "(not run / nothing found)",
    "What syncPetsFromFarmData() will actually use": firstId ? {
      recordCount: Object.keys(records).length,
      firstRecordId: firstId,
      firstRecordRaw: records[firstId],
      extractedTraits: typeof farmSyncExtractPetTraits === "function" ? farmSyncExtractPetTraits(records[firstId]) : null
    } : "(no pet records found anywhere — copy this whole box and send it over)"
  };
  box.style.display = "block";
  box.value = JSON.stringify(out, null, 2);
  box.focus();
  box.select();
};

const farmPanelDebugNftPricesBtnEl = $("farmPanelDebugNftPricesBtn");

if (farmPanelDebugNftPricesBtnEl) farmPanelDebugNftPricesBtnEl.onclick = async () => {
  const box = $("farmPanelDebugOutput");
  box.style.display = "block";
  box.value = "Fetching " + SFL_NFT_PRICE_API + " ...";
  let json = null;
  let fetchError = null;
  try {
    const res = await fetch(SFL_NFT_PRICE_API, {
      cache: "no-store"
    });
    if (!res.ok) throw new Error("Bad response " + res.status);
    json = await res.json();
  } catch (e) {
    fetchError = String(e && e.message || e);
  }
  if (!json) {
    box.value = "Fetch failed: " + fetchError;
    box.focus();
    box.select();
    return;
  }
  const topLevelKeys = Object.keys(json);
  const budsArr = Array.isArray(json.buds) ? json.buds : null;
  const petsArr = Array.isArray(json.pets) ? json.pets : null;
  const collectiblesArr = Array.isArray(json.collectibles) ? json.collectibles : [];
  const wearablesArr = Array.isArray(json.wearables) ? json.wearables : [];
  const petTypeWords = [ "ram", "dragon", "phoenix", "griffin", "warthog", "wolf", "bear", "pet" ];
  const looksLikeBudOrPet = name => {
    const n = String(name || "").toLowerCase();
    return n.indexOf("bud") !== -1 || petTypeWords.some(w => n.indexOf(w) !== -1);
  };
  const collectiblesSuspects = collectiblesArr.filter(it => it && looksLikeBudOrPet(it.name));
  const wearablesSuspects = wearablesArr.filter(it => it && looksLikeBudOrPet(it.name));
  const g = farmPanelGameState ? farmSyncExtractGameState(farmPanelGameState) : null;
  const asObj = v => v && typeof v === "object" && !Array.isArray(v) ? v : null;
  const budsBag = g ? asObj(farmPanelField(g, "buds")) : null;
  const firstBudId = budsBag ? Object.keys(budsBag)[0] : null;
  const firstBudTraits = firstBudId ? farmSyncExtractBudTraits(budsBag[firstBudId]) : null;
  const petsRoot = g ? asObj(farmPanelField(g, "pets")) : null;
  const petNfts = petsRoot ? asObj(petsRoot.nfts) : null;
  const firstPetId = petNfts ? Object.keys(petNfts)[0] : null;
  const firstPetTraitType = firstPetId && asObj(petNfts[firstPetId]) && asObj(petNfts[firstPetId].traits) ? petNfts[firstPetId].traits.type : null;
  const out = {
    "Top-level keys on the /api/v1/nfts response": topLevelKeys,
    "json.buds (array?)": budsArr ? {
      count: budsArr.length,
      first: budsArr[0] || null,
      firstFew: budsArr.slice(0, 5)
    } : "(json.buds is missing or not an array — raw value: " + JSON.stringify(json.buds) + ")",
    "json.pets (array?)": petsArr ? {
      count: petsArr.length,
      first: petsArr[0] || null,
      firstFew: petsArr.slice(0, 5)
    } : "(json.pets is missing or not an array — raw value: " + JSON.stringify(json.pets) + ")",
    "collectibles count": collectiblesArr.length,
    "collectibles entries whose name contains bud/pet-type words": collectiblesSuspects.length ? collectiblesSuspects : "(none found)",
    "wearables count": wearablesArr.length,
    "wearables entries whose name contains bud/pet-type words": wearablesSuspects.length ? wearablesSuspects : "(none found)",
    "Your farm's first Bud type (from synced farm data, if any)": firstBudTraits ? firstBudTraits.type : "(sync a Farm ID first, or you have no buds)",
    "Your farm's first NFT Pet type (from synced farm data, if any)": firstPetTraitType || "(sync a Farm ID first, or you have no NFT pets)"
  };
  box.value = JSON.stringify(out, null, 2);
  box.focus();
  box.select();
};

const farmPanelDebugMarketplaceProbeBtnEl = $("farmPanelDebugMarketplaceProbeBtn");

if (farmPanelDebugMarketplaceProbeBtnEl) farmPanelDebugMarketplaceProbeBtnEl.onclick = async () => {
  const box = $("farmPanelDebugOutput");
  box.style.display = "block";
  box.value = "Probing candidate endpoints...";
  const candidates = [ SFL_PROXY_BASE + "/api/v1/marketplace?filters=buds,pets", SFL_PROXY_BASE + "/api/v1/marketplace/buds", SFL_PROXY_BASE + "/api/v1/marketplace/pets", SFL_PROXY_BASE + "/api/v1/collection/buds", SFL_PROXY_BASE + "/api/v1/collection/pets", SFL_PROXY_BASE + "/api/v1.1/marketplace", SFL_PROXY_BASE + "/api/v1.1/marketplace/buds", SFL_PROXY_BASE + "/api/v1.1/marketplace/pets", SFL_COMMUNITY_PROXY_BASE + "community/marketplace", SFL_COMMUNITY_PROXY_BASE + "community/marketplace/buds", SFL_COMMUNITY_PROXY_BASE + "community/marketplace/pets", SFL_COMMUNITY_PROXY_BASE + "community/nfts" ];
  const results = [];
  for (const url of candidates) {
    try {
      const res = await fetch(url, {
        cache: "no-store"
      });
      let bodyPreview = null;
      let keys = null;
      try {
        const j = await res.json();
        keys = j && typeof j === "object" ? Object.keys(j).slice(0, 10) : null;
        bodyPreview = JSON.stringify(j).slice(0, 300);
      } catch (e) {
        bodyPreview = "(non-JSON or empty body)";
      }
      results.push({
        url: url,
        status: res.status,
        ok: res.ok,
        topLevelKeys: keys,
        bodyPreview: bodyPreview
      });
    } catch (e) {
      results.push({
        url: url,
        status: "fetch failed",
        error: String(e && e.message || e)
      });
    }
  }
  box.value = JSON.stringify(results, null, 2);
  box.focus();
  box.select();
};

const farmPanelDebugMutantsBtnEl = $("farmPanelDebugMutantsBtn");

if (farmPanelDebugMutantsBtnEl) farmPanelDebugMutantsBtnEl.onclick = () => {
  const box = $("farmPanelDebugOutput");
  if (!farmPanelGameState) {
    box.style.display = "block";
    box.value = "Sync a Farm ID first, then tap this again.";
    return;
  }
  const g = farmSyncExtractGameState(farmPanelGameState);
  const asObj = v => v && typeof v === "object" && !Array.isArray(v) ? v : null;
  const chapterName = getCurrentChapterName();
  const chapterMutants = getCurrentChapterMutantSet();
  const inspectJob = job => {
    if (!job || typeof job !== "object") return "(no job object)";
    return {
      allKeys: Object.keys(job),
      hasRewardField: Object.prototype.hasOwnProperty.call(job, "reward"),
      reward: job.reward === undefined ? "(reward key not present at all)" : job.reward,
      rewardItems: job.reward && Array.isArray(job.reward.items) ? job.reward.items : "(no reward.items array)"
    };
  };
  const flowersField = farmPanelField(g, "flowers");
  const flowerBeds = asObj(flowersField && flowersField.flowerBeds) || {};
  const flowerEntries = Object.entries(flowerBeds);
  const flowerOut = flowerEntries.length ? flowerEntries.map(([id, bed]) => ({
    bedId: id,
    ...inspectJob(bed && bed.flower)
  })) : "(no flower beds found on this farm)";
  const animalOut = {};
  [ "chicken", "sheep", "cow" ].forEach(type => {
    const bag = farmSyncGetAnimalRecords(g, type);
    const entries = Object.entries(bag || {});
    animalOut[type] = entries.length ? entries.map(([id, animal]) => ({
      animalId: id,
      state: animal && animal.state,
      ...inspectJob(animal)
    })) : `(no ${type} records found on this farm)`;
  });
  const out = {
    "Auto-detected current chapter": chapterName,
    "This chapter's target mutant names (what we're scanning reward.items for)": chapterMutants || "(no mutant table for this chapter)",
    "Flower beds — raw reward field per bed": flowerOut,
    "Chicken — raw reward field per animal": animalOut.chicken,
    "Sheep — raw reward field per animal": animalOut.sheep,
    "Cow — raw reward field per animal": animalOut.cow,
    "What farmPanelDetectActiveMutants() currently returns for this farm": farmPanelDetectActiveMutants(farmPanelGameState)
  };
  box.style.display = "block";
  box.value = JSON.stringify(out, null, 2);
  box.focus();
  box.select();
};

const farmPanelDebugTreeDataBtnEl = $("farmPanelDebugTreeDataBtn");

if (farmPanelDebugTreeDataBtnEl) farmPanelDebugTreeDataBtnEl.onclick = () => {
  const box = $("farmPanelDebugOutput");
  if (!farmPanelGameState) {
    box.style.display = "block";
    box.value = "Sync a Farm ID first, then tap this again.";
    return;
  }
  const g = farmSyncExtractGameState(farmPanelGameState);
  const trees = farmPanelField(g, "trees") || {};
  const treeEntries = Object.entries(trees);
  const farmActivity = farmPanelField(g, "farmActivity");
  const lastInfo = farmPanelGetLastInfo();
  const relevantActivityKeys = farmActivity ? Object.keys(farmActivity).filter(k => /Chopped$/.test(k)) : null;
  const perTree = treeEntries.map(([id, node]) => {
    const job = node && node.wood;
    return {
      treeId: id,
      name: node && node.name ? node.name : "Tree (base)",
      hasWoodAmount: !!(job && typeof job.amount === "number"),
      woodAmount: job && typeof job.amount === "number" ? job.amount : null,
      hasWoodReward: !!(job && job.reward),
      woodReward: job && job.reward || null,
      allWoodKeys: job ? Object.keys(job) : []
    };
  });
  const inProgress = farmPanelComputeInProgress(farmPanelGameState);
  const woodCard = inProgress.find(r => r.name === "Wood");
  const typesInFarm = [ ...new Set(treeEntries.map(([, node]) => farmPanelTreeTypeForNode(node))) ];
  const perTypeRolls = {};
  typesInFarm.forEach(t => {
    const typeEntries = treeEntries.filter(([, node]) => farmPanelTreeTypeForNode(node) === t);
    const readyEntries = typeEntries.filter(([, node]) => farmPanelIsNodeReadyNow("Wood", node, "wood", Date.now()));
    const chains = farmPanelBuildSequentialWoodRollChains(farmPanelGameState, t, readyEntries.length);
    const activityKey = `${t === "Tree" ? "Basic Tree" : t} Chopped`;
    let sequentialSum = 0;
    const perReadyNodeBreakdown = readyEntries.map(([id, node], i) => {
      const chain = chains && chains[i] ? chains[i] : null;
      const critRolls = chain && chain.length ? chain[0] : null;
      const amount = chain && chain.length ? chain.reduce((sum, roll) => sum + farmPanelComputeExactWoodYieldForNode(node, t, roll), 0) : null;
      if (typeof amount === "number") sequentialSum += amount;
      return {
        treeId: id,
        counterUsed: farmActivity ? (farmActivity[activityKey] ?? 0) + i : null,
        critRolls: critRolls,
        chain: chain,
        chainLength: chain ? chain.length : null,
        amount: amount
      };
    });
    perTypeRolls[t] = {
      turnaroundPredicted: perReadyNodeBreakdown.some(n => n.chainLength > 1),
      turnaroundPredictedNodeIds: perReadyNodeBreakdown.filter(n => n.chainLength > 1).map(n => n.treeId),
      moneyTreePredicted: farmPanelPredictMoneyTreeForType(farmPanelGameState, t),
      moneyTreeBatchPredicted: farmPanelPredictMoneyTreeBatchForType(farmPanelGameState, t, typeEntries.length, typeEntries.length ? typeof typeEntries[0][1].multiplier === "number" ? typeEntries[0][1].multiplier : 1 : 1),
      baseActivityCounter: farmActivity ? farmActivity[activityKey] ?? 0 : null,
      readyNodeCount: readyEntries.length,
      totalNodesOfThisType: typeEntries.length,
      sequentialSumForReadyNodes: readyEntries.length ? Number(sequentialSum.toFixed(4)) : null,
      perReadyNodeBreakdown: perReadyNodeBreakdown
    };
  });
  const out = {
    "farmId used for PRNG (farmPanelGetLastInfo().id)": lastInfo.id,
    "farmActivity present on merged state?": !!farmActivity,
    "farmActivity '*Chopped' keys found": relevantActivityKeys,
    "Tree Turnaround owned (isSkillActive)": isSkillActive("skill_tree_turnaround"),
    "Tree Turnaround rank (getAscensionRank)": getAscensionRank("skill_tree_turnaround"),
    "Money Tree owned (isSkillActive)": isSkillActive("skill_money_tree"),
    "Money Tree rank (getAscensionRank)": getAscensionRank("skill_money_tree"),
    "Total tree nodes": treeEntries.length,
    "Nodes with a real stored wood.amount": perTree.filter(t => t.hasWoodAmount).length,
    "Nodes with a real stored wood.reward": perTree.filter(t => t.hasWoodReward).length,
    "Per-TYPE roll (one shared result per type, NOT per node — see farmPanelPredictTreeTypeRoll)": perTypeRolls,
    "Per-tree raw wood field dump": perTree,
    "farmPanelDetectMoneyTreeBonus() result": farmPanelDetectMoneyTreeBonus(farmPanelGameState),
    "Wood card from farmPanelComputeInProgress() — actualYieldCount / turnaroundTypesPredicted": woodCard ? {
      actualYieldCount: woodCard.actualYieldCount,
      turnaroundTypesPredicted: woodCard.turnaroundTypesPredicted,
      turnaroundBonusYieldEstimate: woodCard.turnaroundBonusYieldEstimate
    } : "(no Wood card — sync a farm with trees first)",
    "Manually-entered Bud yield boost for Wood (resourceBuds panel)": farmPanelGetBudYieldForResource("Wood"),
    resourceBudsConfigured: resourceBuds
  };
  box.style.display = "block";
  box.value = JSON.stringify(out, null, 2);
  box.focus();
  box.select();
};

const farmPanelDebugMiningBtnEl = $("farmPanelDebugMiningBtn");

if (farmPanelDebugMiningBtnEl) farmPanelDebugMiningBtnEl.onclick = () => {
  const box = $("farmPanelDebugOutput");
  if (!farmPanelGameState) {
    box.style.display = "block";
    box.value = "Sync a Farm ID first, then tap this again.";
    return;
  }
  const g = farmSyncExtractGameState(farmPanelGameState);
  const farmActivity = farmPanelField(g, "farmActivity");
  const lastInfo = farmPanelGetLastInfo();
  function boostFlags(ids) {
    const out = {};
    ids.forEach(id => {
      if (id.startsWith("skill_")) {
        out[id] = isSkillActive(id) ? {
          owned: true,
          rank: getAscensionRank(id)
        } : {
          owned: false
        };
      } else {
        out[id] = isBoostActive(id);
      }
    });
    return out;
  }
  function buildSection(resourceLabel, bagKey, knownIds, defaultName, buildRollsFn, computeFn, boostIds) {
    const bag = farmPanelField(g, bagKey);
    if (!bag || typeof bag !== "object") return {
      present: false
    };
    const entries = Object.entries(bag);
    const typesInFarm = [ ...new Set(entries.map(([, node]) => farmPanelRockNameForNode(node, knownIds, defaultName))) ];
    const flags = boostFlags(boostIds);
    const perType = {};
    typesInFarm.forEach(t => {
      const typeEntries = entries.filter(([, node]) => farmPanelRockNameForNode(node, knownIds, defaultName) === t);
      const readyEntries = typeEntries.filter(([, node]) => farmPanelIsNodeReadyNow(resourceLabel, node, "stone", Date.now()));
      const rolls = buildRollsFn(farmPanelGameState, t, readyEntries.length);
      const activityKey = `${t} Mined`;
      let sequentialSum = 0;
      const perNodeBreakdown = readyEntries.map(([id, node], i) => {
        const rollOrChain = rolls && rolls[i] ? rolls[i] : null;
        const isChain = Array.isArray(rollOrChain);
        const critRolls = isChain ? rollOrChain.length ? rollOrChain[0] : null : rollOrChain;
        const amount = isChain ? rollOrChain.length ? rollOrChain.reduce((sum, roll) => sum + (computeFn(farmPanelGameState, node, t, roll) || 0), 0) : null : critRolls ? computeFn(farmPanelGameState, node, t, critRolls) : null;
        if (typeof amount === "number") sequentialSum += amount;
        return {
          nodeId: id,
          counterUsed: farmActivity ? (farmActivity[activityKey] ?? 0) + i : null,
          critRolls: critRolls,
          chain: isChain ? rollOrChain : null,
          chainLength: isChain ? rollOrChain.length : null,
          amount: amount
        };
      });
      perType[t] = {
        itemId: knownIds[t],
        baseActivityCounter: farmActivity ? farmActivity[activityKey] ?? 0 : null,
        readyNodeCount: readyEntries.length,
        totalNodesOfThisType: typeEntries.length,
        sequentialSumForReadyNodes: readyEntries.length ? Number(sequentialSum.toFixed(4)) : null,
        perReadyNodeBreakdown: perNodeBreakdown
      };
    });
    return {
      present: true,
      totalNodes: entries.length,
      boostFlags: flags,
      perType: perType
    };
  }
  const out = {
    "farmId used for PRNG (farmPanelGetLastInfo().id)": lastInfo.id,
    "farmActivity present on merged state?": !!farmActivity,
    Stone: buildSection("Stone", "stones", STONE_KNOWN_IDS, "Stone Rock", farmPanelBuildSequentialStoneRolls, farmPanelComputeExactStoneYieldForNode, [ "rock_golem", "prospector", "tunnel_mole", "stone_beetle", "skill_rocknroll", "skill_rocky_favor", "skill_ferrous_favor", "emerald_turtle", "tin_turtle", "faction_shield_res", "legendary_shrine_res", "volcano_gnome" ]),
    Iron: buildSection("Iron", "iron", IRON_KNOWN_IDS, "Iron Rock", farmPanelBuildSequentialIronRolls, farmPanelComputeExactIronYieldForNode, [ "rocky_the_mole", "radiant_ray", "iron_idol", "iron_beetle", "skill_iron_bumpkin", "skill_rocky_favor", "skill_ferrous_favor", "emerald_turtle", "faction_shield_res", "volcano_gnome" ]),
    Gold: buildSection("Gold", "gold", GOLD_KNOWN_IDS, "Gold Rock", farmPanelBuildSequentialGoldRollChains, farmPanelComputeExactGoldYieldForNode, [ "gold_rush", "skill_golden_touch", "nugget", "gilded_swordfish", "gold_beetle", "emerald_turtle", "faction_shield_res", "pickaxe_shark", "volcano_gnome" ]),
    "aoe object present on merged state?": !!farmPanelField(g, "aoe"),
    "collectibles present on merged state?": !!farmPanelField(g, "collectibles"),
    "Emerald Turtle position found": farmPanelGetCollectiblePosition(g, "Emerald Turtle"),
    "Tin Turtle position found": farmPanelGetCollectiblePosition(g, "Tin Turtle"),
    "Manually-entered Bud yield boosts (resourceBuds panel)": {
      Stone: farmPanelGetBudYieldForResource("Stone"),
      Iron: farmPanelGetBudYieldForResource("Iron"),
      Gold: farmPanelGetBudYieldForResource("Gold"),
      resourceBudsConfigured: resourceBuds
    }
  };
  box.style.display = "block";
  box.value = JSON.stringify(out, null, 2);
  box.focus();
  box.select();
};

function farmPanelSectionStorageKey(name) {
  return "hl_fpgs__" + name;
}

export function farmPanelSaveGameState(json, isFullSync) {
  farmPanelGameState = json || null;
  if (isFullSync) farmPanelStateIsCached = false;
  farmPanelHoneySnapshotMs = Date.now();
  const toStore = farmPanelGameState;
  if (__farmPanelSaveGameStateHandle !== null) {
    if (typeof cancelIdleCallback === "function") cancelIdleCallback(__farmPanelSaveGameStateHandle); else clearTimeout(__farmPanelSaveGameStateHandle);
  }
  const write = () => {
    __set___farmPanelSaveGameStateHandle(null);
    farmPanelWriteGameStateSharded(toStore);
  };
  if (typeof requestIdleCallback === "function") __set___farmPanelSaveGameStateHandle(requestIdleCallback(write, {
    timeout: 1500
  })); else __set___farmPanelSaveGameStateHandle(setTimeout(write, 0));
  if (isFullSync) {
    try {
      potionTrackFromState(farmSyncExtractGameState(json));
    } catch (e) {}
    try {
      digStreakTrackFromState(farmSyncExtractGameState(json));
    } catch (e) {}
    window.guroFarmSavedDone = true;
    window.dispatchEvent(new Event("guroFarmSaved"));
  }
}

function farmPanelWriteGameStateSharded(toStore) {
  try {
    if (!toStore || typeof toStore !== "object") {
      localStorage.setItem("hl_farm_panel_gamestate", JSON.stringify(toStore));
      localStorage.removeItem("hl_fpgs_meta");
      return;
    }
    const g = farmSyncExtractGameState(toStore);
    let containerKey = null;
    const hasGame = !!(g && typeof g === "object");
    if (g !== toStore) {
      [ "game", "farm", "gameState", "state" ].some(k => {
        if (toStore[k] === g) {
          containerKey = k;
          return true;
        }
        return false;
      });
    }
    const rootRest = {};
    Object.keys(toStore).forEach(k => {
      const keep = containerKey !== null ? k !== containerKey : !hasGame;
      if (keep) rootRest[k] = toStore[k];
    });
    const writeSection = (name, value) => {
      let serialized;
      try {
        serialized = JSON.stringify(value);
      } catch (e) {
        return;
      }
      if (__gameStateSectionLenSigs[name] === serialized) return;
      try {
        localStorage.setItem(farmPanelSectionStorageKey(name), serialized);
        __gameStateSectionLenSigs[name] = serialized;
      } catch (e) {
        delete __gameStateSectionLenSigs[name];
        try {
          localStorage.removeItem(farmPanelSectionStorageKey(name));
        } catch (e2) {}
      }
    };
    writeSection("__rootRest", rootRest);
    if (hasGame) {
      const gameRest = {};
      Object.keys(g).forEach(k => {
        if (!GAMESTATE_SECTION_KEYS.includes(k)) gameRest[k] = g[k];
      });
      writeSection("__gameRest", gameRest);
      GAMESTATE_SECTION_KEYS.forEach(k => {
        if (Object.prototype.hasOwnProperty.call(g, k)) {
          writeSection(k, g[k]);
        } else if (__gameStateSectionLenSigs[k] !== undefined) {
          delete __gameStateSectionLenSigs[k];
          localStorage.removeItem(farmPanelSectionStorageKey(k));
        }
      });
    }
    localStorage.setItem("hl_fpgs_meta", JSON.stringify({
      containerKey: containerKey,
      hasGame: hasGame
    }));
    localStorage.removeItem("hl_farm_panel_gamestate");
  } catch (e) {}
}

export function farmPanelLoadCachedGameState() {
  if (farmPanelGameState && !farmPanelStateIsCached) return;
  farmPanelHoneySnapshotMs = Date.now();
  try {
    const metaRaw = localStorage.getItem("hl_fpgs_meta");
    if (!metaRaw) {
      const raw = localStorage.getItem("hl_farm_panel_gamestate");
      if (raw) farmPanelGameState = JSON.parse(raw);
      return;
    }
    const meta = JSON.parse(metaRaw);
    const rootRestRaw = localStorage.getItem(farmPanelSectionStorageKey("__rootRest")) || "{}";
    const rootRest = JSON.parse(rootRestRaw);
    __set___gameStateSectionLenSigs({
      __rootRest: rootRestRaw
    });
    let g = null;
    if (meta.hasGame) {
      const gameRestRaw = localStorage.getItem(farmPanelSectionStorageKey("__gameRest")) || "{}";
      g = JSON.parse(gameRestRaw);
      __gameStateSectionLenSigs.__gameRest = gameRestRaw;
      GAMESTATE_SECTION_KEYS.forEach(k => {
        const raw = localStorage.getItem(farmPanelSectionStorageKey(k));
        if (raw !== null) {
          try {
            g[k] = JSON.parse(raw);
            __gameStateSectionLenSigs[k] = raw;
          } catch (e) {}
        }
      });
    }
    if (meta.containerKey && g) {
      const full = Object.assign({}, rootRest);
      full[meta.containerKey] = g;
      farmPanelGameState = full;
    } else if (g) {
      farmPanelGameState = g;
    } else {
      farmPanelGameState = rootRest;
    }
  } catch (e) {
    farmPanelGameState = null;
  } finally {
    farmPanelStateIsCached = !!farmPanelGameState;
  }
}

function farmPanelMergeAnimalFeedBuff(communityHouse, rawHouse) {
  if (!communityHouse || typeof communityHouse !== "object") return rawHouse;
  if (!rawHouse || typeof rawHouse !== "object") return communityHouse;
  const communityAnimals = communityHouse.animals && typeof communityHouse.animals === "object" ? communityHouse.animals : null;
  const rawAnimals = rawHouse.animals && typeof rawHouse.animals === "object" ? rawHouse.animals : null;
  if (!communityAnimals || !rawAnimals) return communityHouse;
  const patchedAnimals = {
    ...communityAnimals
  };
  let touched = false;
  Object.keys(patchedAnimals).forEach(id => {
    const communityAnimal = patchedAnimals[id];
    const rawAnimal = rawAnimals[id];
    if (!communityAnimal || typeof communityAnimal !== "object" || !rawAnimal || typeof rawAnimal !== "object") return;
    const communityHasBuff = communityAnimal.feedBuff && typeof communityAnimal.feedBuff === "object" && communityAnimal.feedBuff.name;
    const rawHasBuff = rawAnimal.feedBuff && typeof rawAnimal.feedBuff === "object" && rawAnimal.feedBuff.name;
    if (!communityHasBuff && rawHasBuff) {
      patchedAnimals[id] = {
        ...communityAnimal,
        feedBuff: rawAnimal.feedBuff
      };
      touched = true;
    }
  });
  if (!touched) return communityHouse;
  return {
    ...communityHouse,
    animals: patchedAnimals
  };
}

export function farmPanelMergeAuthoritativeResourceData(rawJson, communitySourceState, communityOk) {
  const rawG = farmSyncExtractGameState(rawJson);
  if (!communityOk) {
    return rawJson;
  }
  const communityG = farmSyncExtractGameState(communitySourceState);
  if (!rawG || typeof rawG !== "object" || rawG === communitySourceState) {
    return communitySourceState;
  }
  const merged = communityG && typeof communityG === "object" ? {
    ...communityG
  } : {};
  [ "trees", "stones", "iron", "gold", "crimstones", "farmActivity", "collectibles", "buildings", "home", "aoe", "crops", "fruitPatches", "greenhouse" ].forEach(key => {
    if (rawG[key] != null) merged[key] = rawG[key];
  });
  [ "henHouse", "barn" ].forEach(key => {
    const rawHouse = farmPanelField(rawG, key);
    if (rawHouse != null) merged[key] = farmPanelMergeAnimalFeedBuff(farmPanelField(merged, key), rawHouse);
  });
  return merged;
}

setTimeout(() => {
  const {id: savedFarmId} = farmPanelGetLastInfo();
  if (savedFarmId) {
    const idInput = document.getElementById("farmPanelIdInput");
    if (idInput) idInput.value = savedFarmId;
    const savedScreen = document.getElementById("appLoadingScreen");
    if (savedScreen) savedScreen.remove();
    window.dispatchEvent(new Event("goblinAppReady"));
  } else {
    const screen = document.getElementById("appLoadingScreen");
    const input = document.getElementById("farmIdPromptInput");
    const openBtn = document.getElementById("farmIdPromptOpenBtn");
    if (screen) screen.classList.add("show-prompt");
    if (input) setTimeout(() => input.focus(), 50);
    function handleOpen() {
      const farmId = (input && input.value || "").trim();
      if (!farmId) {
        if (input) input.focus();
        return;
      }
      if (screen) screen.classList.remove("show-prompt");
      farmIdPromptStartSync(farmId);
    }
    if (openBtn) openBtn.addEventListener("click", handleOpen);
    if (input) input.addEventListener("keydown", e => {
      if (e.key === "Enter") handleOpen();
    });
  }
}, 0);

setTimeout(() => {
  try {
    if (typeof farmPanelLoadCachedGameState === "function") {
      farmPanelLoadCachedGameState();
      if (typeof farmPanelGameState !== "undefined" && farmPanelGameState) {
        syncCookingCountsFromInventory(farmPanelGameState);
      }
    }
  } catch (e) {}
}, 0);

document.addEventListener("click", e => {
  const target = e.target.closest("#farmPanelProfileBtn, #profileOverlay button, #profileOverlay .profile-tradable-row-editable");
  if (!target) return;
  target.classList.remove("btn-pop-click");
  void target.offsetWidth;
  target.classList.add("btn-pop-click");
});

export function __set_farmPanelInProgressCategoryFilter(v) {
  return farmPanelInProgressCategoryFilter = v;
}

export function __set_farmPanelTabContentDirty(v) {
  return farmPanelTabContentDirty = v;
}

export function __set_farmPanelRenderAtMs(v) {
  return farmPanelRenderAtMs = v;
}

export function __set_farmPanelActiveTab(v) {
  return farmPanelActiveTab = v;
}

export function __set_farmPanelSyncInFlight(v) {
  return farmPanelSyncInFlight = v;
}