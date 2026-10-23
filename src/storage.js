import { BASE_CROPS, BASE_FRUITS, BASE_GREENHOUSE, BOOST_TIERS, COLLECTIBLE_MARKET_NAMES, PET_RESOURCE_DEFAULT_MARKET, PET_TRADABLE_RESOURCES, PROFILE_BUMPKIN_CACHE_KEY, RESOURCE_DATA, WEARABLE_MARKET_NAMES, __set_animalWeekly, __set_boostDraftSelectedBoosts, __set_bountyWeekly, __set_choresWeekly, __set_megastoreTickets, __set_npcSkipDays, __set_profitDisplayMode, __set_restockGemMode, __set_seasonDays, __set_ticketBoosts, __set_undeliveredLastSeason, animalAffectionCounts, animalAffectionTools, animalBuds, animalCounts, animalSicknessEstimate, aoeSyncOverrides, ascensionRanks, beeSwarmActiveCount, beeSwarmAffectedPlots, beeSwarmByCrop, boostDraftSelectedBoosts, cmOilTank, cmQueue, coinPerFlower, cookingCounts, cookingExpandedFoods, cropBuds, cropMachineModules, crustaceanChumSelection, feePercent, fertilizerTierScope, fishBuds, flowerSeedOverrides, flowerVarietyOverrides, fruitBuds, fruitCounts, gemFlowerSpent, gemsReceived, globalPlotCount, globalPlotCountTouched, greenhouseBuds, greenhouseCounts, hiveCount, manualCycleOverrides, nodeCounts, nodeCountsTouched, petFoodChecks, petsData, profileBumpkinCache, profitDisplayMode, readFarmVipEnabled, resourceBuds, restockGemMode, safeParse, saltFarmLevel, saltPrimeChancePct, saltSculptureLevel, saltUi, selectedBoosts, selectedHoneyFlower, selectedSkills, selectedSwarmCrop, spiceUsage, syncedSkillLevels, ticketBoosts, toolRecipes, tradeActive, tradeHistory, tradeLifetime, updateBoostSaveBarState, updateProfitModeUI, updateRestockModeUI, weatherDestructionSync } from "./calculator.js";

import { __set_animalFlowerCost, __set_bountyFlowerCost, __set_choresFlowerCost, __set_npcFlowerCost, autoFillLivePricesForNewEntries, budFloorPrice, marketItems, petFloorPrice, petResourceCostOverride } from "./prices.js";

import { $, __set_bountyToggle, __set_npcDeliverToggle, renderAnimalsList, renderCropMachinePanel, renderCropsList, renderFarmPanelTabContent, renderFruitsList, renderGreenhouseList, renderLibraryLists, renderResourceList, renderTicketCalc } from "./ui.js";

export function safeLSJSON(raw, fallback) {
  if (raw === null || raw === undefined) return fallback;
  try {
    return JSON.parse(raw);
  } catch (e) {
    return fallback;
  }
}

export function saveAnimalAffectionTools() {
  localStorage.setItem("hl_animal_affection_tools", JSON.stringify(animalAffectionTools));
}

export function saveAnimalAffectionCounts() {
  localStorage.setItem("hl_animal_affection_counts", JSON.stringify(animalAffectionCounts));
}

export function saveManualCycleOverrides() {
  localStorage.setItem("hl_manual_cycles", JSON.stringify(manualCycleOverrides));
}

export function saveNodeCountsTouched() {
  localStorage.setItem("hl_node_counts_touched", JSON.stringify([ ...nodeCountsTouched ]));
}

export function saveGlobalPlotCountTouched() {
  localStorage.setItem("hl_plot_count_touched", globalPlotCountTouched ? "1" : "0");
}

export function saveGlobalPlotCount() {
  localStorage.setItem("hl_plot_count", String(globalPlotCount));
}

export function saveNodeCounts() {
  localStorage.setItem("hl_node_counts", JSON.stringify(nodeCounts));
  localStorage.removeItem("hl_nude_counts");
}

export function saveBeeSwarmState() {
  localStorage.setItem("hl_bee_swarm_count", String(beeSwarmActiveCount));
  localStorage.setItem("hl_bee_swarm_plots", String(beeSwarmAffectedPlots));
  localStorage.setItem("hl_bee_swarm_by_crop", JSON.stringify(beeSwarmByCrop));
}

export function saveAoeSyncOverrides() {
  localStorage.setItem("hl_aoe_sync_overrides", JSON.stringify(aoeSyncOverrides));
}

export function saveWeatherDestructionSync() {
  localStorage.setItem("hl_weather_destruction_sync", JSON.stringify(weatherDestructionSync));
}

export function saveFruitCounts() {
  localStorage.setItem("hl_fruit_counts", JSON.stringify(fruitCounts));
}

export function saveGreenhouseCounts() {
  localStorage.setItem("hl_greenhouse_counts", JSON.stringify(greenhouseCounts));
}

function saveCropMachineModules() {
  localStorage.setItem("hl_cm_modules", JSON.stringify(cropMachineModules));
}

export function saveCmQueue() {
  localStorage.setItem("hl_cm_queue", JSON.stringify(cmQueue));
}

export function saveCmOilTank() {
  localStorage.setItem("hl_cm_oil_tank", String(cmOilTank));
}

setTimeout(saveNodeCounts, 0);

export function saveHiveCount() {
  localStorage.setItem("hl_hive_count", String(hiveCount));
}

export function saveSelectedHoneyFlower() {
  localStorage.setItem("hl_honey_flower", selectedHoneyFlower);
}

export function saveSelectedSwarmCrop() {
  localStorage.setItem("hl_swarm_crop", selectedSwarmCrop);
}

export function saveFlowerSeedOverrides() {
  localStorage.setItem("hl_flower_seed_overrides", JSON.stringify(flowerSeedOverrides));
}

export function saveFlowerVarietyOverrides() {
  localStorage.setItem("hl_flower_variety_overrides", JSON.stringify(flowerVarietyOverrides));
}

export function saveAnimalCounts() {
  localStorage.setItem("hl_animal_counts", JSON.stringify(animalCounts));
}

export function saveAnimalSicknessEstimate() {
  localStorage.setItem("hl_animal_sickness_estimate", JSON.stringify(animalSicknessEstimate));
}

export function saveSyncedSkillLevels() {
  localStorage.setItem("hl_synced_skill_levels", JSON.stringify(syncedSkillLevels));
}

export function saveAscensionState() {
  localStorage.setItem("hl_ascension_ranks", JSON.stringify(ascensionRanks));
}

localStorage.removeItem("hl_custom_boosts");

localStorage.removeItem("hl_custom_boosts_merged");

export function saveGreenhouseBuds() {
  localStorage.setItem("hl_greenhouse_buds", JSON.stringify(greenhouseBuds));
}

export function saveAnimalBuds() {
  localStorage.setItem("hl_animal_buds", JSON.stringify(animalBuds));
}

export function saveFruitBuds() {
  localStorage.setItem("hl_fruit_buds", JSON.stringify(fruitBuds));
}

export function saveCropBuds() {
  localStorage.setItem("hl_crop_buds", JSON.stringify(cropBuds));
}

export function saveResourceBuds() {
  localStorage.setItem("hl_resource_buds", JSON.stringify(resourceBuds));
}

export function saveFishBuds() {
  localStorage.setItem("hl_fish_buds", JSON.stringify(fishBuds));
}

export function saveSpiceUsage() {
  localStorage.setItem("hl_spice_usage", JSON.stringify(spiceUsage));
}

export function saveSkillState() {
  localStorage.setItem("hl_selected_skills", JSON.stringify(selectedSkills));
}

export function saveBoostState() {
  localStorage.setItem("hl_selected_boosts", JSON.stringify(selectedBoosts));
  if (typeof boostDraftSelectedBoosts !== "undefined") {
    __set_boostDraftSelectedBoosts(selectedBoosts.slice());
    if (typeof updateBoostSaveBarState === "function") updateBoostSaveBarState();
  }
}

export function saveFertilizerTierScope() {
  localStorage.setItem("hl_fert_tier_scope", JSON.stringify(fertilizerTierScope));
}

document.querySelectorAll(".restock-mode-btn").forEach(btn => {
  btn.onclick = () => {
    const mode = btn.dataset.mode;
    if (mode === "all") {
      __set_restockGemMode(new Set([ "all" ]));
    } else {
      restockGemMode.delete("all");
      if (restockGemMode.has(mode)) restockGemMode.delete(mode); else restockGemMode.add(mode);
      if (restockGemMode.size === 0) restockGemMode.add(mode);
    }
    localStorage.setItem("hl_restock_mode", JSON.stringify([ ...restockGemMode ]));
    updateRestockModeUI();
    renderLibraryLists();
    renderCropMachinePanel();
    if (typeof renderFarmPanelTabContent === "function") renderFarmPanelTabContent();
  };
});

document.querySelectorAll(".profit-mode-btn").forEach(btn => {
  btn.onclick = () => {
    __set_profitDisplayMode(btn.dataset.mode);
    localStorage.setItem("hl_profit_mode", profitDisplayMode);
    updateProfitModeUI();
    if (typeof renderResourceList === "function") renderResourceList();
    if (typeof renderCropsList === "function") renderCropsList();
    if (typeof renderFruitsList === "function") renderFruitsList();
    if (typeof renderGreenhouseList === "function") renderGreenhouseList();
    if (typeof renderAnimalsList === "function") renderAnimalsList();
    renderCropMachinePanel();
  };
});

export function saveState() {
  localStorage.setItem("hl_fee", String(feePercent));
  localStorage.setItem("hl_rate", String(coinPerFlower));
  localStorage.setItem("hl_gem_flower_spent", String(gemFlowerSpent));
  localStorage.setItem("hl_gems_received", String(gemsReceived));
}

export function saveToolRecipes() {
  localStorage.setItem("hl_tool_recipes", JSON.stringify(toolRecipes));
}

export function saveMarketState() {
  localStorage.setItem("hl_market", JSON.stringify(marketItems));
}

export function loadBaseAnimalProduceIfNeeded() {
  const names = [ "Egg", "Feather", "Wool", "Merino Wool", "Milk", "Leather" ];
  let added = false;
  names.forEach(n => {
    const exists = marketItems.some(m => (m.name || "").toLowerCase() === n.toLowerCase());
    if (!exists) {
      marketItems.push({
        id: "animal_" + n.replace(/\s+/g, "_").toLowerCase(),
        name: n,
        flowerPrice: 0,
        sourceLibId: null,
        isAutoAnimal: true
      });
      added = true;
    }
  });
  if (added) {
    saveMarketState();
    autoFillLivePricesForNewEntries();
  }
}

export function loadBaseResourcesIfNeeded() {
  let added = 0;
  Object.keys(RESOURCE_DATA).forEach(resName => {
    if (resName.toLowerCase() === "oil") return;
    const id = "resource_" + resName;
    if (marketItems.some(m => String(m.id) === id)) return;
    marketItems.push({
      id: id,
      name: resName,
      flowerPrice: 0
    });
    added++;
  });
  if (!marketItems.some(m => String(m.id) === "resource_Obsidian")) {
    marketItems.push({
      id: "resource_Obsidian",
      name: "Obsidian",
      flowerPrice: 0
    });
    added++;
  }
  if (added) saveMarketState();
  return added;
}

export function loadBaseCropsIfNeeded() {
  let added = 0;
  Object.keys(BASE_CROPS).forEach(cropName => {
    const id = "crop_" + cropName;
    if (marketItems.some(m => String(m.id) === id)) return;
    marketItems.push({
      id: id,
      name: cropName,
      flowerPrice: BASE_CROPS[cropName].marketPrice || 0
    });
    added++;
  });
  if (added) saveMarketState();
  return added;
}

export function loadBaseFruitsIfNeeded() {
  let added = 0;
  Object.keys(BASE_FRUITS).forEach(fruitName => {
    const id = "fruit_" + fruitName;
    if (marketItems.some(m => String(m.id) === id)) return;
    marketItems.push({
      id: id,
      name: fruitName,
      flowerPrice: BASE_FRUITS[fruitName].marketPrice || 0
    });
    added++;
  });
  if (added) saveMarketState();
  return added;
}

export function loadBaseGreenhouseIfNeeded() {
  let added = 0;
  Object.keys(BASE_GREENHOUSE).forEach(name => {
    const id = "greenhouse_" + name;
    if (marketItems.some(m => String(m.id) === id)) return;
    marketItems.push({
      id: id,
      name: name,
      flowerPrice: BASE_GREENHOUSE[name].marketPrice || 0
    });
    added++;
  });
  if (added) saveMarketState();
  return added;
}

export function loadBaseHoneyIfNeeded() {
  if (marketItems.some(m => m.id === "honey_Honey")) return 0;
  marketItems.push({
    id: "honey_Honey",
    name: "Honey",
    flowerPrice: 0
  });
  saveMarketState();
  return 1;
}

export function saveTradeState() {
  localStorage.setItem("hl_trade_active", JSON.stringify(tradeActive));
  localStorage.setItem("hl_trade_history", JSON.stringify(tradeHistory));
  localStorage.setItem("hl_trade_lifetime", JSON.stringify(tradeLifetime));
}

export function saveBoosts() {
  localStorage.setItem("hl_ticket_v2_boosts", JSON.stringify(ticketBoosts));
}

window.addEventListener("storage", e => {
  if (!$("ticketCalcBody")) return;
  const relevant = e.key && (e.key.startsWith("hl_ticket_v2_") || e.key === "hl_ticket_vip_enabled" || e.key === "hl_farm_panel_id");
  if (!relevant) return;
  __set_ticketBoosts(safeParse(localStorage.getItem("hl_ticket_v2_boosts"), {}));
  BOOST_TIERS.forEach(t => {
    if (!ticketBoosts[t]) ticketBoosts[t] = {
      enabled: false,
      costMode: "nocost",
      cost: 0
    };
  });
  if (!ticketBoosts.vip) ticketBoosts.vip = {
    enabled: false,
    costMode: "nocost",
    cost: 0
  };
  if (readFarmVipEnabled()) ticketBoosts.vip.enabled = true;
  __set_undeliveredLastSeason(parseFloat(localStorage.getItem("hl_ticket_v2_undelivered")) || 0);
  const sd = parseFloat(localStorage.getItem("hl_ticket_v2_season_days"));
  __set_seasonDays(isNaN(sd) ? 90 : sd);
  __set_npcDeliverToggle(safeParse(localStorage.getItem("hl_ticket_v2_npc_deliver"), {}));
  __set_npcSkipDays(safeParse(localStorage.getItem("hl_ticket_v2_npc_skip"), {}));
  __set_animalWeekly(parseFloat(localStorage.getItem("hl_ticket_v2_animal_weekly")) || 0);
  __set_bountyToggle(localStorage.getItem("hl_ticket_v2_bounty_toggle") === "1");
  __set_bountyWeekly(parseFloat(localStorage.getItem("hl_ticket_v2_bounty_weekly")) || 0);
  __set_megastoreTickets(parseFloat(localStorage.getItem("hl_ticket_v2_megastore")) || 0);
  __set_choresWeekly(parseFloat(localStorage.getItem("hl_ticket_v2_chores_weekly")) || 0);
  __set_npcFlowerCost(safeParse(localStorage.getItem("hl_ticket_v2_npc_flower"), {}));
  __set_animalFlowerCost(parseFloat(localStorage.getItem("hl_ticket_v2_animal_flower")) || 0);
  __set_bountyFlowerCost(parseFloat(localStorage.getItem("hl_ticket_v2_bounty_flower")) || 0);
  __set_choresFlowerCost(parseFloat(localStorage.getItem("hl_ticket_v2_chores_flower")) || 0);
  renderTicketCalc();
});

export function saveSculptureLevel() {
  localStorage.setItem("hl_sculpture_level", String(saltSculptureLevel));
}

function saveSaltPrimeChance() {
  localStorage.setItem("hl_salt_prime_chance", String(saltPrimeChancePct));
}

export function saveSaltUi() {
  localStorage.setItem("hl_salt_ui", JSON.stringify(saltUi));
}

export function saveSaltFarmLevel() {
  localStorage.setItem("hl_salt_farm_level", String(saltFarmLevel));
}

export function loadBaseSaltMarketIfNeeded() {
  let added = 0;
  [ "Salt", "Capsule Bait", "Umbrella Bait", "Crimson Baitfish" ].forEach(n => {
    const id = "salt_" + n.replace(/\s+/g, "_");
    if (marketItems.some(m => String(m.id) === id)) return;
    marketItems.push({
      id: id,
      name: n,
      flowerPrice: 0
    });
    added++;
  });
  if (added) saveMarketState();
  return added;
}

setTimeout(loadBaseSaltMarketIfNeeded, 0);

export function saveCookingCounts() {
  localStorage.setItem("hl_cooking_counts", JSON.stringify(cookingCounts));
}

export function saveCookingExpanded() {
  localStorage.setItem("hl_cooking_expanded", JSON.stringify([ ...cookingExpandedFoods ]));
}

export function saveCrustaceanChumSelection() {
  localStorage.setItem("hl_crustacean_chum_selection", JSON.stringify(crustaceanChumSelection));
}

export function loadPetResourcesIfNeeded() {
  if (typeof marketItems === "undefined") return;
  let added = 0;
  PET_TRADABLE_RESOURCES.forEach(name => {
    const id = "petres_" + name.replace(/\s+/g, "_").toLowerCase();
    if (marketItems.some(m => String(m.id) === id)) return;
    marketItems.push({
      id: id,
      name: name,
      flowerPrice: PET_RESOURCE_DEFAULT_MARKET[name] || 0,
      isPetResource: true
    });
    added++;
  });
  if (added && typeof saveMarketState === "function") saveMarketState();
}

function loadNftCollectibleMarketItemsIfNeeded() {
  if (typeof marketItems === "undefined") return;
  let added = 0;
  COLLECTIBLE_MARKET_NAMES.forEach(name => {
    const id = "nft_" + name.replace(/\s+/g, "_").toLowerCase();
    if (marketItems.some(m => String(m.id) === id)) return;
    marketItems.push({
      id: id,
      name: name,
      flowerPrice: 0,
      isNftCollectible: true
    });
    added++;
  });
  if (added && typeof saveMarketState === "function") saveMarketState();
  if (added && typeof autoFillLivePricesForNewEntries === "function") autoFillLivePricesForNewEntries();
}

function loadWearableMarketItemsIfNeeded() {
  if (typeof marketItems === "undefined") return;
  let added = 0;
  WEARABLE_MARKET_NAMES.forEach(name => {
    const id = "wear_" + name.replace(/\s+/g, "_").toLowerCase();
    if (marketItems.some(m => String(m.id) === id)) return;
    marketItems.push({
      id: id,
      name: name,
      flowerPrice: 0,
      isWearable: true
    });
    added++;
  });
  if (added && typeof saveMarketState === "function") saveMarketState();
  if (added && typeof autoFillLivePricesForNewEntries === "function") autoFillLivePricesForNewEntries();
}

export function savePetResourceCostOverride() {
  localStorage.setItem("hl_pet_resource_cost_override", JSON.stringify(petResourceCostOverride));
}

export function saveBudFloorPrice() {
  localStorage.setItem("hl_bud_floor_price", JSON.stringify(budFloorPrice));
}

export function savePetFloorPrice() {
  localStorage.setItem("hl_pet_floor_price", JSON.stringify(petFloorPrice));
}

export function savePetsData() {
  localStorage.setItem("hl_pets_data_v2", JSON.stringify(petsData));
}

export function savePetFoodChecks() {
  localStorage.setItem("hl_pet_food_checks", JSON.stringify(petFoodChecks));
}

if (typeof loadPetResourcesIfNeeded === "function") setTimeout(loadPetResourcesIfNeeded, 0);

if (typeof loadNftCollectibleMarketItemsIfNeeded === "function") setTimeout(loadNftCollectibleMarketItemsIfNeeded, 0);

if (typeof loadWearableMarketItemsIfNeeded === "function") setTimeout(loadWearableMarketItemsIfNeeded, 0);

export function profileBumpkinCachePersist() {
  try {
    localStorage.setItem(PROFILE_BUMPKIN_CACHE_KEY, JSON.stringify(profileBumpkinCache));
  } catch (e) {}
}