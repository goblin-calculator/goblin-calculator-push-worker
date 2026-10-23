import { NAV_ICON_DATA } from "./nav_icons.js";
import { ICON_DATA } from "./icon_data.js";
import { runWithFlowerMarketModes, getSkillRankMult, getAscensionRank, setRateInputValue, ALWAYS_ON_BOOST_IDS, ANIMAL_BASE_CYCLE_SEC, ANIMAL_DATA, ANIMAL_LOVE_ITEM_XP, ASCENSION_RANK_DATA, BAIT_RECIPES, BASE_COMPOSTERS, BASE_CROPS, BASE_CROP_MACHINE, BASE_FRUITS, BASE_GREENHOUSE, BASE_STOCK_CROPS, BASE_STOCK_FRUITS, BASE_STOCK_FLOWERS, BASE_STOCK_GREENHOUSE, BASE_STOCK_TOOLS, BEE_SWARM_ICON, BOOSTS, BOOST_ICON_OVERRIDES, BOOST_LABELS, BOOST_TIERS, BOUNTY_WEEKLY_BONUS, BUD_ANIMAL_STEMS, BUD_ANIMAL_TYPES, BUD_AURAS, BUD_CROP_STEMS, BUD_CROP_TYPES, BUD_FIELD_LABELS, BUD_FISH_TYPES, BUD_FRUIT_STEMS, BUD_FRUIT_TYPES, BUD_GREENHOUSE_STEMS, BUD_GREENHOUSE_TYPES, BUD_RESOURCE_STEMS, BUD_RESOURCE_TYPES, CHEER_ICON_SRC, CM_MODULE_SKILL_IDS, CM_MODULE_SKILL_NAMES, COIN_ICON, COOKING_BUILDINGS, COOKING_BUILDING_ICONS, COOKING_FOOD_EMOJI, COOKING_FOOD_IMAGES, COOKING_RECIPES, CROP_MACHINE_PACK_MAX, CRUSTACEAN_CATCH_DATA, CRUSTACEAN_NAMES, ES_ISLAND_ICONS, FACTION_BANNER_ICONS, FACTION_DISPLAY_NAMES, FACTION_PET_BOOST_TIERS, FACTION_PET_HAPPY_ICONS, FARM_LEVEL_NODES, FEED_LABELS, FISHING_ROD_ICON, FISH_CATCH_DATA, FISH_CATCH_NAMES, FISH_MARKET_GUARANTEED_CATCH, FISH_MARKET_ITEM_NAMES, FISH_TIER_LABEL, FLOWER_ICON, FLOWER_SEEDS, FLOWER_SEED_ICONS, FLOWER_VARIETIES, GEM_ICON, ICONS, IMAGE_ICONS, IMAGE_ICON_FALLBACK, LIMITED_TIME_BOOSTS, LOVE_CHARM_ICON_SRC, MANUAL_CYCLE_REFRESH_FNS, MARK_ICON_SRC, MUTANT_FALLBACK_ICON, NPC_ICONS, OBSIDIAN_WEEKLY_PURCHASE_CAP, OBSIDIAN_WEEKLY_SELL_CAP, OIL_BONUS_DROP_AMOUNT, OIL_SINGLE_HARVEST_BASE, PET_AURA_TRAITS, PET_BASE_XP_ENERGY, PET_BIB_TRAITS, PET_CATEGORIES, PET_CATEGORY_ICON, PET_COMMON_TYPES, PET_FOOD_LISTS, PET_LEVEL_PERKS, PET_NAMES_BY_TYPE, PET_NFT_TYPES, PET_RESOURCE_ENERGY, PET_RESOURCE_ICON, PET_TRADABLE_RESOURCES, PET_TYPE_EMOJI, PICKLED_VEG_DATA, PRE_ASCENSION_MAX_LEVEL, PROFILE_BUILD_FILTERS, PROFILE_TRADABLE_TABS, REQUIRED_FOOD_QTY_MAP, RESOURCE_DATA, RESOURCE_NODE_TIERS, RESTOCK_PANEL_CATEGORIES, SALT_BASE_TIME_SEC, SALT_BASE_YIELD, SALT_FERTILIZER_DATA, SCULPTURE_EFFECTS_LIST, SCULPTURE_LEVELS, SEASON_ACCENT, SEASON_COMPOST_REQUIREMENTS, SEASON_EMOJI, SEASON_ORDER, SKILL_BOOSTS, SKILL_TREES, SPICE_ANIMAL_TYPES, SPICE_RECIPES, SYNC_PROGRESS_STAGES, SYNODIC_MONTH_DAYS, TICKET_NPC_DISPLAY_NAMES, __getIconCache, __getTreasureIconCache, __lastSyncTiming, __markSub, __postinc_craftMaterialIdSeq, __preinc_digPanelRenderToken, __set___lastSyncTiming, __set___syncTimingPanelOpen, __set_bettySortMode, __set_boostDraftSelectedBoosts, __set_budPickerContext, __set_budPickerKind, __set_cmOilTank, __set_cmQty, __set_cmSelectedCrop, __set_coinPerFlower, __set_craftMaterialRows, __set_dailyProfitCardsCache, __set_editingLibId, __set_finderIngredient, __set_finderSeed, __set_fpBoostPanelOpen, __set_harvestSelectedLibId, __set_limitedTimeBoostRefreshTimer, __set_obsidianInputsHidden, __set_pendingDeleteId, __set_pendingDeleteType, __set_petAddAuraValue, __set_petAddBibValue, __set_petAddIsNFT, __set_petAddName, __set_petAddOpen, __set_petAddStep, __set_petAddType, __set_petOpenId, __set_petTraitPickerKind, __set_petsData, __set_pixelPickerOnSelect, __set_rcmActiveTab, __set_selectedBoosts, __set_skillDraftSelectedSkills, __set_syncProgressTimer, __set_tradePendingDeleteId, __set_tradePendingDeleteType, __set_tradePickedItemName, __set_tradeSellingId, __set_tradeSortMode, __syncTimingPanelOpen, allocateAoeAcrossTiers, animalAffectionTools, animalBuds, animalSicknessEstimate, animalWeekly, applyLibTypeVisibility, applyLibrarySearchFilter, applyPickerSearchFilter, applyTradeItemSearchFilter, ascensionDescribeRank, ascensionLevelBadgeText, attachDailyProfitCardEvents, attachFarmPanelCategoryFilterBar, attachProfileTradableEditHandlers, beeSwarmActiveCount, beeSwarmAffectedPlots, bettyActiveTab, bettyGatherItems, bettyGreenThumbOn, bettyHighestRate, bettySortItems, bettySortMode, boostCategory, boostDraftSelectedBoosts, bountyWeekly, budAnimalSummaryText, budContextFields, budContextPrefix, budContextState, budContextUpdateDuplicateState, budFarmCropSummaryText, budFieldCap, budFruitSummaryText, budPickerContext, budPickerKind, budResourceSummaryText, budSummaryText, calcMode, calendarDebuffProtection, choresWeekly, cmCalcMode, cmClampQty, cmModuleTagHtml, cmOilTank, cmQty, cmQueue, cmSelectedCrop, coinPerFlower, coinsToFlower, compute24hProjection, computeAgedFishFigures, computeAll, computeGuideAveragePanelItems, computeAnimalBaseCoinFigures, computeAnimalFeedFigures, computeAnimalTypeFigures, computeAnimalWeeklyFigures, computeBaitFigures, computeBasicFishFigures, computeBoostedCropStats, computeBoostedFlowerVarietyStats, computeFlowerChainTime, computeBoostedFruitStats, computeBoostedGreenhouseStats, computeBoostedResourceStats, computeBoostedStock, computeComposterFigures, computeCrabFigures, computeCropMachineBatch, computeCrustaceanFigures, computeDailyProfitProjection, buildDailyProfitSwapStats, getDailyProfitCalcMode, setDailyProfitCalcMode, getDailyProfitPeriodMode, setDailyProfitPeriodMode, getDailyProfitTotalsMode, setDailyProfitTotalsMode, getDailyProfitSwap, setDailyProfitSwap, computeFertilizerFigures, computeFlowerVarietyRestockInfo, computeHiveEconomics, computeLavaPitFigures, computeMachineRestockGems, computeObsidianWeeklyProfit, computeResourceFigures, computeResourceProjection24h, computeSaltFarmFigures, computeSeaweedFigures, computeShrineAffectedProfitability, computeSpiceFigures, ASCENSION_LEVELS_PER_BAND, ASCENSION_LEVEL_UPS, COOK_LEVEL_XP, ascensionBandBaseline, ascensionBandXp, ascensionLevelXp, cookGetLevelInfo, cookingActiveBuilding, cookingComputeFoodExp, cookingComputeFoodTime, cookingComputeTotals, cookingExpandedFoods, cookingFindRecipeForFood, cookingFishCategory, cookingGuaranteedCatchOn, craftMaterialRows, cropBuds, cropTierFilter, crustaceanExpanded, crustaceanTrapTabActive, currentSeason, dailyProfitExpandedNames, dailyProfitGetCycleCount, deleteActiveTrade, deleteHistoryTrade, describeAoeTierAllocation, digCellClass, digClearManualMark, digCycleManualMark, DIG_MANUAL_MARK_OVERRIDE_STATUSES, digGetFarmId, digGetManualMark, digPanelRenderToken, digSolveBoard, renderDigDataPanel, renderPotionDataPanel, draftSetAscensionRank, editingLibId, ensureExchangeRates, esHideReachNote, esRenderAll, esRenderReachNote, esState, esSyncAutoBoostsFromFarm, escapeHtml, expandedAnimalCards, expandedAnimalFeedByLevel, expandedAnimalFeedConsumption, expandedComposters, expandedCropMachine, expandedCrops, expandedFlowers, expandedFruits, expandedGreenhouse, expandedResources, factionPetGetActiveTier, factionPetGetEffectiveStreak, factionPetManualMode, factionPetSetManualStreak, factionPetShouldApplyBoost, factionPetUpdateBoostUI, farmLevelMaxNodes, farmSyncExtractGameState, farmSyncGetApiUsername, farmSyncGetLimitedTimeBoostStatus, feePercent, fertilizerTierScope, findTool, findVarietiesBySeedIngredient, finderIngredient, finderSeed, fishBudSummaryText, flowerPerGem, fishBuds, fishCatchComputeXP, fishCatchYieldMult, fishInventoryNameForCategory, fishStageForCategory, fishingExpandedTierFish, fishingTierActive, fmt, computeAnimalAffectionSummary, fmtAnimal, fmtAnimalCost, fmtXp, fmtCycleInputValue, fmtInt, formatDuration, formatTrade12h, fpBoostPanelOpen, fruitBuds, fullMoonSeedStockQty, gatherTop10ProfitItems, gemFlowerSpent, gemsReceived, getActiveAnimalBoosts, getActiveBoostsForResource, getActiveSaltBoosts, getAllMaterialCandidates, getAnimalCount, getAscensionLevelInfo, getBeeSwarmPerSwarmYield, getBeeSwarmStatsForCrop, getBoostAoeInfo, getBoostedMedicineRecipe, getBoostedToolRecipe, getCookingCount, getCropMachineOilCap, getCropMachineQueueSlots, getCropSeasons, getDoubleNomBonusFood, getDoubleNomIngredientMultiplier, getDraftAscensionRank, getDraftAscensionTotals, getDraftSkillPointsUsed, getEffectiveDailyReward, getEffectiveYieldAdd, getFruitCount, getFishSeasons, getFruitSeasons, getGreenhouseCount, getHiveCount, getIconSmall, getLimitedBoostRemainingSec, getManualCycleOverride, getManualCycleRawValue, getMaterialMode, getMedicineIngredientMode, getMissingPlotNodeFields, getNodeCount, getNodeIconHtml, getNodeLabel, getNodeTierCounts, getPlotCount, getResourceForTool, getRestockExclusionNote, getSeedPoolCategoryForName, getSharedPoolBreakdown, getSharedPoolDivisor, getSicknessEstimate, getSpiceEffectForAnimalType, getSpiceLickDurationHarvests, getVarietyIngredient, globalPlotCount, greenhouseBuds, gunterActiveTab, gunterGridEntranceShown, gunterMutantSyncAutoBoosts, gunterRenderBottom, gunterRenderMid, gunterRenderSunstoneInput, gunterRenderTop, harvestSelectedLibId, renderChapterFishMutants, hasPlotsNodesData, ingredientKindLabel, isBoostActive, isBoostDraftActive, isBoostDraftDirty, isCalendarSeasonalBoost, isCropInSeason, isCropMachineUnlocked, isFertilizerTierEnabled, isFlowerVarietySeasonLocked, isFruitInSeason, isFullMoonToday, isPetFoodChecked, isSeasonLocked, isSkillActive, isSkillDraftActive, isSkillDraftDirty, isSkillDraftTierUnlocked, isTieredResource, limitedTimeBoostRefreshTimer, megastoreTickets, normalizeSearch, npcSkipDays, obsidianInputsHidden, petAddAuraValue, petAddBibValue, petAddIsNFT, petAddName, petAddOpen, petAddStep, petAddType, petAuraInfoText, petBibInfoText, petCalcCacheReset, petComputeCardCached, petComputeResourceTotals, petFoodChecks, petOpenId, petPerkActive, petPerkApplies, petResetAddFlow, petTraitPickerKind, petsData, petsFoodTab, pickerTarget, pixelPickerOnSelect, POTION_ICONS, POTION_NAMES, potionActiveGuessSlot, potionSetActiveGuessSlot, potionSolveState, potionStatusBadgeIcon, potionStatusLabel, previewSeason, profileBackNav, profileBumpkinCache, profileBumpkinFrameHtml, profileBumpkinIdHtml, profileBumpkinImageOnError, profileBumpkinNoteText, profileClearTradableCache, profileComputeFarmValue, profileComputeWithdrawTax, profileFactionHtml, profileFactionIconHtml, profileFmtUsd, profileGetDisplayName, profileGetExpansionInfo, profileGetFarmAgeText, profileGetG, profileGetInventoryAmount, profileGetMainTabMeta, profileGetReputation, profileGoBottomNav, profileRenderBuildColumns, profileState, profileTradableContentHtml, profileTradableRowsForTab, profileTradableRowsSubtotal, profileTradableTotalFlower, profileVipHtml, rcmActiveTab, rcmPendingExcluded, readFarmSyncedId, readFarmVipEnabled, refreshAfterSkillChange, refreshAfterSpiceChange, removeAnimalBud, removeBud, removeCropBud, removeFishBud, removeFruitBud, removeResourceBud, render24hBadge, render24hTotalsGrid, resolveAscensionLevelInfo, resourceBuds, safeParse, saltFarmLevel, saltSculptureLevel, saltUiSet, scheduleCascade, sculptureEffects, seasonDays, seedIconHtmlFor, seedIngredientOptionsList, selectedBoosts, selectedHoneyFlower, selectedSwarmCrop, setAnimalCount, setCookingActiveBuilding, setCookingCount, setCookingFishCategory, setCookingGuaranteedCatchOn, setCrustaceanSelectedChum, setCrustaceanTrapTab, setFactionPetManualMode, setFishingTier, setFruitCount, setGreenhouseCount, setManualCycleOverride, setMaterialMode, setMedicineIngredientMode, setNodeCount, setNodeTierQty, setPetsFoodTab, setPlotCount, setPreviewSeason, setSaltFarmLevel, setSculptureLevel, setSelectedHoneyFlower, setSelectedSwarmCrop, setSkillTreeSectionOpen, setSpiceMaterialMode, setVarietyIngredient, setVegMaterialMode, simulateStockCycles, skillAoeNoteForRank, skillCategory, skillDraftSelectedSkills, skillRankUsageHtml, skillSyncedBoostText, skillSyncedLevel, slug, spiceUsage, stepperHtml, syncProgressTimer, ticketBoosts, tierUnlockHintText, toast, toolRecipes, tradeActive, tradeActiveTab, tradeCardKey, tradeExpandedIds, tradeGatherActiveSorted, tradeHistory, tradeLifetime, tradePickItem, tradeSortMode, undeliveredLastSeason, updateBoostSaveBarState, updateCalcRcmToggleUI, updateCalcSelectedDisplay, updateCalcSummary, updateDailyProfitSummary, updateLibCraftTotal, updateNewTradeLiveTotal, updateRcmUnsavedNote, updateSellTradeLiveTotal, updateSettingsSummary, updateSkillSaveBarState, varietyIngredientOptions, vegMaterialMode, wireEvents, withPreservedCardScrolls, withPreservedManualCycleFocus, withPreservedResourceScroll, withPreservedScroll } from "./calculator.js";

import { __set_farmPanelActiveTab, __set_farmPanelInProgressCategoryFilter, __set_farmPanelRenderAtMs, __set_farmPanelTabContentDirty, farmPanelActiveTab, farmPanelComputeInProgress, farmPanelRowIsReady, farmPanelComputeStocks, farmPanelDetectActiveMutants, farmPanelDetectMoneyTreeBonus, farmPanelExpandedNames, farmPanelGameState, farmPanelGetLastInfo, farmPanelInProgressCategoryFilter, farmPanelRenderCategoryFilterBar, farmPanelRenderInProgressRow, farmPanelRenderMoneyTreeBonusCard, farmPanelRenderMutantAlertCard, farmPanelRenderStockRow, farmPanelStateIsCached, farmPanelSyncInFlight, farmPanelTabContentDirty } from "./inprogress.js";

import { CANCEL_ICON_SFL, TIMER_ICON_SFL, animalFlowerCost, attachShrineCostToggles, bountyFlowerCost, choresFlowerCost, computeCropBaseCostCoins, computeFarmLevelNextCost, computeHoneyBaseCostCoins, computeResourceBaseCostCoins, computeSculptureNextCost, cookingCostMode, cookingIngredientUnitCostCoins, crustaceanTrapFreeCostLabel, fishCatchStageCostCoins, fishEffectiveBasicCostCoins, fishMarketGuaranteedTab, fishMarketItemCostCoins, fishMarketItemForFish, fishRodFreeCostLabel, getActiveShrineDailyCost, getCropCostCoins, getFlowerSeedTypeCost, getFlowerVarietyCostCoins, getFruitBaseCostCoins, getFruitCostCoins, getGreenhouseBaseCostCoins, getGreenhouseCostCoins, getItemCostByName, getMarketItemCostCoins, getMaterialUnitCostCoins, getPetResourceMarket, getSpiceCostPerUseFlower, getSpiceHeadCost, getToolBaseCostCoins, getToolCostCoins, hasFreeCostBoost, hasFreeCostBoostGreenhouse, invalidateCostCache, isSflThemeOn, livePriceSource, marketItems, npcFlowerCost, openMarketPriceEdit, openPriceEdit, petFoodCostCoins, petResourceCostOverride, petResourceCostPerUnit, pickledVegCost, pickledVegSaltCostFlower, priceSourceBadgeHtml, refreshSflThemeClass, renderBaseCostPriceBlock, renderFishMarketCardsList, renderFishMarketMainTabs, renderFishMarketSeasonToggle, renderFishingCostModeToggle, renderMarketList, renderMedicineCostDisplay, renderShrineCostBlock, restockCostMode, setCookingCostMode, setFishMarketGuaranteedTab, setFlowerSeedTypeCost, setShrineCostMode, shrineCostMode, traceZeroCostBoosts, tradeMarketPrice } from "./prices.js";

import { loadBaseAnimalProduceIfNeeded, loadBaseCropsIfNeeded, loadBaseFruitsIfNeeded, loadBaseGreenhouseIfNeeded, loadBaseHoneyIfNeeded, loadBaseResourcesIfNeeded, loadBaseSaltMarketIfNeeded, loadPetResourcesIfNeeded, profileBumpkinCachePersist, saveAnimalSicknessEstimate, saveBoostState, saveCmQueue, saveCookingExpanded, saveFertilizerTierScope, savePetFoodChecks, savePetsData, saveSpiceUsage, saveState } from "./storage.js";

import { renderSflBubblesPanel, sflbRefreshMyBuildIfOpen } from "./sfl_bubbles.js";

import { renderFactionDeliveryPanel } from "./faction.js";

import { renderBeginnerPanel } from "./beginner.js";

import { renderCraftingBoxPanel } from "./crafting_box.js";

import { renderWorkbenchPanel } from "./workbench.js";

import { renderSeasonsPanel } from "./seasons.js";

import { renderLeaderboardPanel } from "./leaderboard.js";

import { renderMapPanel } from "./map.js";

import { PETE_GUIDE_IMAGES } from "./pete_guide_images.js";

function getCancelIcon() {
  return isSflThemeOn() ? CANCEL_ICON_SFL : "✕";
}

function getTimerIcon() {
  return isSflThemeOn() ? TIMER_ICON_SFL : "⏱️";
}

const __missingEls = {};

export const $ = id => document.getElementById(id) || (__missingEls[id] || (__missingEls[id] = document.createElement("div")));

const LOCAL_MANUAL_CYCLE_REFRESH_FNS = {
  renderResourceList: () => renderResourceList(),
  renderCropsList: () => renderCropsList(),
  renderFruitsList: () => renderFruitsList(),
  renderGreenhouseList: () => renderGreenhouseList(),
  renderAnimalsList: () => renderAnimalsList()
};

document.addEventListener("input", e => {
  const inp = e.target.closest(".manual-cycle-input");
  if (!inp) return;
  const key = inp.dataset.cycleKey;
  if (!key) return;
  const selStart = inp.selectionStart;
  const cleaned = inp.value.replace(/[^0-9.]/g, "").replace(/(\..*)\./g, "$1");
  if (cleaned !== inp.value) {
    const removedBefore = inp.value.slice(0, selStart).length - cleaned.slice(0, selStart).length;
    inp.value = cleaned;
    const newPos = Math.max(0, selStart - removedBefore);
    try {
      inp.setSelectionRange(newPos, newPos);
    } catch (err) {}
  }
  setManualCycleOverride(key, inp.value);
  const refreshName = inp.dataset.cycleRefresh;
  const refreshFn = refreshName && (LOCAL_MANUAL_CYCLE_REFRESH_FNS[refreshName] || MANUAL_CYCLE_REFRESH_FNS[refreshName] || (typeof window !== "undefined" ? window[refreshName] : null));
  if (typeof refreshFn === "function") {
    withPreservedManualCycleFocus(refreshFn);
  }
});

export function showSyncProgressModal() {
  const el = $("syncProgressModal");
  const fill = $("syncProgressFill");
  const step = $("syncProgressStep");
  if (!el || !fill || !step) return;
  if (syncProgressTimer) {
    clearInterval(syncProgressTimer);
    __set_syncProgressTimer(null);
  }
  fill.style.width = "0%";
  step.textContent = SYNC_PROGRESS_STAGES[0].label;
  el.classList.add("show");
  let i = 0;
  __set_syncProgressTimer(setInterval(() => {
    i = Math.min(i + 1, SYNC_PROGRESS_STAGES.length - 1);
    const stage = SYNC_PROGRESS_STAGES[i];
    fill.style.width = stage.pct + "%";
    step.textContent = stage.label;
  }, 550));
}

export function hideSyncProgressModal(finalLabel) {
  const el = $("syncProgressModal");
  const fill = $("syncProgressFill");
  const step = $("syncProgressStep");
  if (syncProgressTimer) {
    clearInterval(syncProgressTimer);
    __set_syncProgressTimer(null);
  }
  if (!el || !fill || !step) return;
  fill.style.width = "100%";
  step.textContent = finalLabel || "Done!";
  setTimeout(() => el.classList.remove("show"), 260);
}

let syncCompleteModalTimer = null;

export function showSyncCompleteModal(msg, opts) {
  const el = $("syncCompleteModal");
  const titleEl = $("syncCompleteModalTitle");
  const msgEl = $("syncCompleteModalMsg");
  titleEl.textContent = opts && opts.title || "SYNC COMPLETE";
  msgEl.textContent = msg;
  el.classList.add("show");
  const duration = Math.min(7e3, Math.max(2200, msg.length * 60));
  if (syncCompleteModalTimer) clearTimeout(syncCompleteModalTimer);
  syncCompleteModalTimer = setTimeout(() => el.classList.remove("show"), duration);
}

function renderCropSeasonBadges(name) {
  const seasons = getCropSeasons(name);
  if (seasons.length === SEASON_ORDER.length) return `<span class="crop-season-badges" title="Grows year-round">${SEASON_ORDER.map(s => `<span class="active-season">${SEASON_EMOJI[s]}</span>`).join("")}</span>`;
  return `<span class="crop-season-badges">${seasons.map(s => `<span class="${s === previewSeason ? "active-season" : ""}" title="${s}">${SEASON_EMOJI[s]}</span>`).join("")}</span>`;
}

function renderFruitSeasonBadges(name) {
  const seasons = getFruitSeasons(name);
  if (seasons.length === SEASON_ORDER.length) return `<span class="crop-season-badges" title="Grows year-round">${SEASON_ORDER.map(s => `<span class="active-season">${SEASON_EMOJI[s]}</span>`).join("")}</span>`;
  return `<span class="crop-season-badges">${seasons.map(s => `<span class="${s === previewSeason ? "active-season" : ""}" title="${s}">${SEASON_EMOJI[s]}</span>`).join("")}</span>`;
}

function renderFishSeasonBadges(name) {
  const seasons = getFishSeasons(name);
  if (seasons.length === SEASON_ORDER.length) return `<span class="crop-season-badges" title="Catchable year-round">${SEASON_ORDER.map(s => `<span class="active-season">${SEASON_EMOJI[s]}</span>`).join("")}</span>`;
  return `<span class="crop-season-badges">${seasons.map(s => `<span class="${s === previewSeason ? "active-season" : ""}" title="${s}">${SEASON_EMOJI[s]}</span>`).join("")}</span>`;
}

export function renderSeasonToggle() {
  document.querySelectorAll(".season-toggle").forEach(wrap => {
    wrap.querySelectorAll("button").forEach(btn => {
      btn.classList.toggle("active", btn.dataset.season === previewSeason);
    });
  });
  const noteText = previewSeason === currentSeason ? `📅 This week's real season: ${currentSeason}` : `👀 Previewing ${previewSeason} — real season is ${currentSeason} (resets on refresh)`;
  [ "seasonToggleNote", "cropsSeasonToggleNote", "fishMarketSeasonToggleNote", "fruitsSeasonToggleNote" ].forEach(id => {
    const note = document.getElementById(id);
    if (note) note.textContent = noteText;
  });
}

export function renderAscensionBar() {
  const totalsEl = $("ascensionTotals");
  if (!totalsEl) return;
  const {points: ascPoints, shards: ascShards} = getDraftAscensionTotals();
  const skillPoints = getDraftSkillPointsUsed();
  const skillPointsEl = $("skillPointsUsed");
  const ascPointsEl = $("ascensionPointsUsed");
  const ascShardsEl = $("ascensionShardsUsed");
  if (skillPointsEl) skillPointsEl.textContent = skillPoints;
  if (ascPointsEl) ascPointsEl.textContent = ascPoints;
  if (ascShardsEl) ascShardsEl.textContent = ascShards;
}

function toggleSpiceMaster(key) {
  spiceUsage[key].active = !spiceUsage[key].active;
  saveSpiceUsage();
  refreshAfterSpiceChange();
}

function toggleSpiceAnimal(key, type) {
  const turningOn = !spiceUsage[key][type];
  if (turningOn) {
    const other = key === "saltLick" ? "honeyTreat" : "saltLick";
    if (spiceUsage[other][type]) {
      spiceUsage[other][type] = false;
      toast(`🧂 ${type[0].toUpperCase() + type.slice(1)} can only take one consumable at a time — switched off ${other === "saltLick" ? "Salt Lick" : "Honey Treat"} for ${type}`);
    }
  }
  spiceUsage[key][type] = turningOn;
  saveSpiceUsage();
  refreshAfterSpiceChange();
}

function draftToggleSkill(id) {
  const skill = SKILL_BOOSTS.find(s => s.id === id);
  if (!skill) return;
  if (!isSkillDraftActive(id) && !isSkillDraftTierUnlocked(skill.skillCategory, skill.skillTier)) {
    toast(`🔒 Need Tier ${skill.skillTier} unlocked — ${tierUnlockHintText(skill.skillCategory, skill.skillTier, skillDraftSelectedSkills)}`);
    return;
  }
  if (isSkillDraftActive(id)) {
    __set_skillDraftSelectedSkills(skillDraftSelectedSkills.filter(x => x !== id));
  } else {
    if (skill.group) {
      const groupIds = SKILL_BOOSTS.filter(s => s.group === skill.group).map(s => s.id);
      __set_skillDraftSelectedSkills(skillDraftSelectedSkills.filter(x => !groupIds.includes(x)));
    }
    skillDraftSelectedSkills.push(id);
  }
  renderSkillPanel();
  renderAscensionBar();
  updateSkillSaveBarState();
}

function toggleFertilizerTier(tier) {
  const idx = fertilizerTierScope.indexOf(tier);
  if (idx >= 0) {
    if (fertilizerTierScope.length === 1) {
      toast("At least one tier has to stay checked — Sprout Mix / Rapid Root need somewhere to apply.");
      return;
    }
    fertilizerTierScope.splice(idx, 1);
  } else {
    fertilizerTierScope.push(tier);
  }
  saveFertilizerTierScope();
  setTimeout(() => {
    renderBoostPanel();
    renderLibraryLists();
    renderMarketList();
    renderCropMachinePanel();
    updateCalcSummary();
  }, 0);
}

export function draftToggleBoost(id) {
  const boost = BOOSTS.find(b => b.id === id);
  if (id === "bee_swarm") {
    const perSwarm = getBeeSwarmPerSwarmYield();
    toast(beeSwarmActiveCount > 0 ? `🐝 Bee Swarm is auto-detected from your synced farm — ${beeSwarmActiveCount} active swarm${beeSwarmActiveCount === 1 ? "" : "s"} across ${beeSwarmAffectedPlots} plot${beeSwarmAffectedPlots === 1 ? "" : "s"} (+${fmt(perSwarm)} yield each) right now. It can't be toggled manually.` : `🐝 Bee Swarm turns on automatically when your synced farm has an active swarm — none detected right now.`);
    return;
  }
  if (boost && boost.isDebuff) {
    const remSec = getLimitedBoostRemainingSec(boost.limitedBoostName);
    toast(remSec > 0 ? `⚠️ ${boost.name} is auto-detected from your synced farm — active now, ${formatDuration(remSec)} remaining. It can't be toggled manually.` : `⚠️ ${boost.name} turns on automatically when your synced farm has it active — not detected right now. It can't be toggled manually.`);
    return;
  }
  if (ALWAYS_ON_BOOST_IDS.has(id)) {
    toast(`✅ ${boost ? boost.name : "This"} is a game default every player has — it's always on and can't be switched off`);
    return;
  }
  if (isSeasonLocked(boost)) {
    const seasonLabel = boost.seasons && boost.seasons.length ? boost.seasons.join(" & ") : boost.season;
    toast(`🔒 ${boost.name} only works in ${seasonLabel} — switch the season toggle above to turn it on`);
    return;
  }
  if (!isBoostDraftActive(id) && !hasPlotsNodesData() && !(boost && (boost.category === "cooking" || boost.agedFishXpMult))) {
    const missing = getMissingPlotNodeFields();
    let msg;
    if (missing.length === 1) {
      msg = `🧮 Fill in ${missing[0]} in Plots & Nodes first — then you can turn on boosts`;
    } else {
      const hasCropPlots = missing.includes("🌾 Crop plots");
      const resourceCount = missing.length - (hasCropPlots ? 1 : 0);
      const parts = [];
      if (hasCropPlots) parts.push("Crop plots");
      if (resourceCount > 0) parts.push(`${resourceCount} resource node count${resourceCount > 1 ? "s" : ""}`);
      msg = `🧮 Fill in ${parts.join(" and ")} in Plots & Nodes first — then you can turn on boosts`;
    }
    toast(msg);
    const plotsPanel = $("plotsPanel");
    if (plotsPanel) plotsPanel.classList.add("open");
    const cropInput = $("globalCropPlotInput");
    if (cropInput) {
      cropInput.scrollIntoView({
        behavior: "smooth",
        block: "center"
      });
      cropInput.focus();
    }
    renderBoostPanel();
    return;
  }
  if (isBoostDraftActive(id)) {
    __set_boostDraftSelectedBoosts(boostDraftSelectedBoosts.filter(x => x !== id));
  } else {
    if (boost && boost.group) {
      const groupIds = BOOSTS.filter(b => b.group === boost.group).map(b => b.id);
      __set_boostDraftSelectedBoosts(boostDraftSelectedBoosts.filter(x => !groupIds.includes(x)));
    }
    if (boost && boost.exclusiveWith) {
      const exList = Array.isArray(boost.exclusiveWith) ? boost.exclusiveWith : [ boost.exclusiveWith ];
      exList.forEach(exId => {
        if (isBoostDraftActive(exId)) {
          const other = BOOSTS.find(b => b.id === exId);
          __set_boostDraftSelectedBoosts(boostDraftSelectedBoosts.filter(x => x !== exId));
          if (other) toast(`${other.name} disabled — can't be active with ${boost.name} 🦀`);
        }
      });
    }
    boostDraftSelectedBoosts.push(id);
  }
  if (boost && boost.limitedBoostName) {
    const turnedOn = boostDraftSelectedBoosts.includes(id);
    BOOSTS.filter(b => b.id !== id && b.limitedBoostName === boost.limitedBoostName).forEach(sib => {
      __set_boostDraftSelectedBoosts(boostDraftSelectedBoosts.filter(x => x !== sib.id));
      if (turnedOn) boostDraftSelectedBoosts.push(sib.id);
    });
  }
  const nowActive = isBoostDraftActive(id);
  const tappedRow = document.querySelector(`[data-boost-id="${id}"]`);
  if (tappedRow) {
    tappedRow.style.outline = nowActive ? "2px solid var(--profit)" : "";
    tappedRow.classList.toggle("boost-active", nowActive);
    const iconEl = tappedRow.querySelector(".lib-item-icon");
    if (iconEl && !tappedRow.classList.contains("season-locked")) iconEl.textContent = nowActive ? "✅" : "⬜";
  }
  updateBoostSaveBarState();
}

function toggleBoost(id) {
  const boost = BOOSTS.find(b => b.id === id);
  if (id === "bee_swarm") {
    const perSwarm = getBeeSwarmPerSwarmYield();
    toast(beeSwarmActiveCount > 0 ? `🐝 Bee Swarm is auto-detected from your synced farm — ${beeSwarmActiveCount} active swarm${beeSwarmActiveCount === 1 ? "" : "s"} across ${beeSwarmAffectedPlots} plot${beeSwarmAffectedPlots === 1 ? "" : "s"} (+${fmt(perSwarm)} yield each) right now. It can't be toggled manually.` : `🐝 Bee Swarm turns on automatically when your synced farm has an active swarm — none detected right now.`);
    return;
  }
  if (boost && boost.isDebuff) {
    const remSec = getLimitedBoostRemainingSec(boost.limitedBoostName);
    toast(remSec > 0 ? `⚠️ ${boost.name} is auto-detected from your synced farm — active now, ${formatDuration(remSec)} remaining. It can't be toggled manually.` : `⚠️ ${boost.name} turns on automatically when your synced farm has it active — not detected right now. It can't be toggled manually.`);
    return;
  }
  if (ALWAYS_ON_BOOST_IDS.has(id)) {
    toast(`✅ ${boost ? boost.name : "This"} is a game default every player has — it's always on and can't be switched off`);
    return;
  }
  if (isSeasonLocked(boost)) {
    const seasonLabel = boost.seasons && boost.seasons.length ? boost.seasons.join(" & ") : boost.season;
    toast(`🔒 ${boost.name} only works in ${seasonLabel} — switch the season toggle above to turn it on`);
    return;
  }
  if (!isBoostActive(id) && !hasPlotsNodesData()) {
    const missing = getMissingPlotNodeFields();
    let msg;
    if (missing.length === 1) {
      msg = `🧮 Fill in ${missing[0]} in Plots & Nodes first — then you can turn on boosts`;
    } else {
      const hasCropPlots = missing.includes("🌾 Crop plots");
      const resourceCount = missing.length - (hasCropPlots ? 1 : 0);
      const parts = [];
      if (hasCropPlots) parts.push("Crop plots");
      if (resourceCount > 0) parts.push(`${resourceCount} resource node count${resourceCount > 1 ? "s" : ""}`);
      msg = `🧮 Fill in ${parts.join(" and ")} in Plots & Nodes first — then you can turn on boosts`;
    }
    toast(msg);
    const plotsPanel = $("plotsPanel");
    if (plotsPanel) plotsPanel.classList.add("open");
    const cropInput = $("globalCropPlotInput");
    if (cropInput) {
      cropInput.scrollIntoView({
        behavior: "smooth",
        block: "center"
      });
      cropInput.focus();
    }
    renderBoostPanel();
    return;
  }
  if (isBoostActive(id)) {
    __set_selectedBoosts(selectedBoosts.filter(x => x !== id));
  } else {
    if (boost && boost.group) {
      const groupIds = BOOSTS.filter(b => b.group === boost.group).map(b => b.id);
      __set_selectedBoosts(selectedBoosts.filter(x => !groupIds.includes(x)));
    }
    if (boost && boost.exclusiveWith) {
      const exList = Array.isArray(boost.exclusiveWith) ? boost.exclusiveWith : [ boost.exclusiveWith ];
      exList.forEach(exId => {
        if (isBoostActive(exId)) {
          const other = BOOSTS.find(b => b.id === exId);
          __set_selectedBoosts(selectedBoosts.filter(x => x !== exId));
          if (other) toast(`${other.name} disabled — can't be active with ${boost.name} 🦀`);
        }
      });
    }
    selectedBoosts.push(id);
  }
  if (boost && boost.limitedBoostName) {
    const turnedOn = selectedBoosts.includes(id);
    BOOSTS.filter(b => b.id !== id && b.limitedBoostName === boost.limitedBoostName).forEach(sib => {
      __set_selectedBoosts(selectedBoosts.filter(x => x !== sib.id));
      if (turnedOn) selectedBoosts.push(sib.id);
    });
  }
  saveBoostState();
  const nowActive = isBoostActive(id);
  const tappedRow = document.querySelector(`[data-boost-id="${id}"]`);
  if (tappedRow) {
    tappedRow.style.outline = nowActive ? "2px solid var(--profit)" : "";
    tappedRow.classList.toggle("boost-active", nowActive);
    const iconEl = tappedRow.querySelector(".lib-item-icon");
    if (iconEl && !tappedRow.classList.contains("season-locked")) iconEl.textContent = nowActive ? "✅" : "⬜";
  }
  scheduleCascade(refreshAfterSkillChange);
}

function renderAoePlotsAffectedHtml(b, itemName) {
  const info = getBoostAoeInfo(b, itemName);
  if (!info) return "";
  if (info.totalNodes <= 0) {
    const label = b.category === "crops" ? "crop plot count" : b.category === "fruits" ? "fruit node count" : b.category === "greenhouse" ? "greenhouse node count" : "node count";
    return `<div class="aoe-plots-affected is-zero">⚠️ Plot affected [0] — add your ${label} in Plots &amp; Nodes first</div>`;
  }
  const allocNote = info.perTier ? describeAoeTierAllocation(info.resourceName, info.perTier) : "";
  const tierNote = allocNote ? ` → ${escapeHtml(allocNote)}` : "";
  const syncedTag = info.isSyncedOverride ? ` <span style="color:var(--profit);font-weight:700;">🔄 synced from farm</span>` : info.isManualAoeOverride ? ` <span style="color:var(--sun-deep);font-weight:700;">⚙️ Manual Skill Upgrade</span>` : "";
  return `<div class="aoe-plots-affected">Plot affected [<b>${fmt(info.affectedNodes)}</b>] out of ${fmt(info.totalNodes)}${tierNote}${syncedTag}</div>`;
}

export function renderBoostAppliedList(activeBoosts, itemName, opts) {
  opts = opts || {};
  if (!activeBoosts || !activeBoosts.length) return "";
  const yieldRows = [];
  const timeRows = [];
  const costRows = [];
  activeBoosts.forEach(b => {
    const itemTier = (BASE_CROPS[itemName] || {}).tier;
    const yieldAdd = getEffectiveYieldAdd(b, itemTier, itemName);
    let aoeWarning = "";
    let aoePlotsHtml = "";
    if (b.plotCap) {
      const info = getBoostAoeInfo(b, itemName);
      if (info && info.totalNodes === 0) {
        aoeWarning = ` <span style="color:var(--loss);font-weight:700;">⚠️ 0 effect right now — set your plot/node count in Plots &amp; Nodes</span>`;
      }
      aoePlotsHtml = renderAoePlotsAffectedHtml(b, itemName);
    }
    const yieldParts = [];
    if (yieldAdd) yieldParts.push(`${yieldAdd >= 0 ? "+" : ""}${fmt(yieldAdd)} yield`);
    if (b.yieldAddAll) yieldParts.push(`+${fmt(b.yieldAddAll)} yield (all produce)`);
    if (b.yieldMult) yieldParts.push(`×${b.yieldMult} yield`);
    if (b.yieldMultAll) yieldParts.push(`×${b.yieldMultAll} produce`);
    if (b.harvestAdd) yieldParts.push(`+${fmt(b.harvestAdd)} harvest`);
    if (b.flowerExtraChance) yieldParts.push(`${Math.round(b.flowerExtraChance * 100)}% chance +1 flower`);
    if (b.flowerExtraFlat) yieldParts.push(`+${fmt(b.flowerExtraFlat)} flower guaranteed`);
    if (b.honeyYieldAdd) yieldParts.push(`+${fmt(b.honeyYieldAdd)} Honey/full hive`);
    if (b.swarmChanceMult) yieldParts.push(`×${b.swarmChanceMult} swarm chance`);
    if (b.swarmChanceAdd) yieldParts.push(`+${Math.round(b.swarmChanceAdd * 100)}% swarm chance`);
    if (yieldParts.length) {
      const swarmStatsForNote = getBeeSwarmStatsForCrop(itemName);
      const swarmNote = b.beeSwarmStack ? ` <span style="color:var(--ink-soft);">(${swarmStatsForNote.totalCount} swarm${swarmStatsForNote.totalCount === 1 ? "" : "s"} ÷ ${swarmStatsForNote.affectedPlots} plot${swarmStatsForNote.affectedPlots === 1 ? "" : "s"} = ${fmt(swarmStatsForNote.affectedPlots > 0 ? swarmStatsForNote.totalCount / swarmStatsForNote.affectedPlots : 0)} avg/plot × +${fmt(getBeeSwarmPerSwarmYield())} each${isSkillActive("skill_pollen_power_up") ? " · incl. Pollen Power Up" : ""})</span>` : "";
      yieldRows.push(`<div class="boost-applied-row is-yield">Boost: ${getBoostIconSkillFallback(b.name)}<b>${escapeHtml(b.name)}</b> ${yieldParts.join(", ")}${swarmNote}${aoeWarning}${aoePlotsHtml}</div>`);
    }
    const timeParts = [];
    if (b.timeMult) timeParts.push(`×${b.timeMult} time`);
    if (b.timeMultAll) timeParts.push(`×${b.timeMultAll} cycle time`);
    if (b.flowerTimeMult) timeParts.push(`×${b.flowerTimeMult} flower time`);
    if (b.speedAdd) timeParts.push(`+${fmt(b.speedAdd)} honey speed`);
    if (timeParts.length) {
      timeRows.push(`<div class="boost-applied-row is-time">Boost: ${getBoostIconSkillFallback(b.name)}<b>${escapeHtml(b.name)}</b> ${timeParts.join(", ")}</div>`);
    }
    const freeParts = [];
    if (b.freeCost) freeParts.push(`free seeds`);
    if (b.noTool) freeParts.push(`no tool needed`);
    if (b.noWood) freeParts.push(`no tool needed`);
    if (b.freeFeed) freeParts.push(`free feed`);
    if (b.freeCure) freeParts.push(`free medicine`);
    if (freeParts.length) {
      costRows.push(`<div class="boost-applied-row is-free">Boost: ${getBoostIconSkillFallback(b.name)}<b>${escapeHtml(b.name)}</b> ${freeParts.join(", ")}</div>`);
    }
    const otherParts = [];
    if (b.toolCostMult) otherParts.push(`×${b.toolCostMult} tool cost`);
    if (b.materialQtyMult) otherParts.push(`×${b.materialQtyMult} materials`);
    if (b.cureCostMult) otherParts.push(`×${b.cureCostMult} cure cost`);
    if (b.feedMult) otherParts.push(`×${b.feedMult} feed`);
    if (b.feedMultAll) otherParts.push(`×${b.feedMultAll} feed`);
    if (b.perUseCostFlower) otherParts.push(`${fmt(b.perUseCostFlower)} ${FLOWER_ICON}/use`);
    if (b.fertAdd) otherParts.push(`+${fmt(b.fertAdd)} fertiliser/cycle`);
    if (b.wormAdd) otherParts.push(`+${fmt(b.wormAdd)} worm/cycle`);
    if (b.fertPotencyMult) otherParts.push(`×${b.fertPotencyMult} ${b.appliesFertilizer || "fertiliser"} effect`);
    if (otherParts.length) {
      costRows.push(`<div class="boost-applied-row is-cost">Boost: ${getBoostIconSkillFallback(b.name)}<b>${escapeHtml(b.name)}</b> ${otherParts.join(", ")}</div>`);
    }
  });
  const sectionList = [ [ "YIELD", yieldRows ], [ "TIME REDUCTION", timeRows ] ];
  if (!opts.hideCost) sectionList.push([ "COST REDUCTION", costRows ]);
  const sections = sectionList.filter(([, parts]) => parts.length);
  if (!sections.length) return "";
  const sectionsHtml = sections.map(([label, parts]) => `<div class="lib-section-title" style="margin-top:10px;">${label}</div><div class="boost-applied-list">${parts.join("")}</div>`).join("");
  return opts.hideBadge ? sectionsHtml : `<div class="section-badge is-boost-label">⚡ Applied Boost</div>${sectionsHtml}`;
}

function renderSaltBoostAppliedList(activeBoosts) {
  if (!activeBoosts || !activeBoosts.length) return "";
  const rows = activeBoosts.map(b => `<div class="boost-applied-row is-yield">Boost: ${getBoostIconSkillFallback(b.name)}<b>${escapeHtml(b.name)}</b> ${escapeHtml(b.note || "")}</div>`).join("");
  return `<div class="section-badge is-boost-label">⚡ Applied Boost</div><div class="boost-applied-list">${rows}</div>`;
}

function renderAoePlotsAffectedBlockForBoost(b) {
  if (!b.plotCap) return "";
  if (b.scope === "resourceList") {
    return (b.resources || []).map(r => renderAoePlotsAffectedHtml(b, r)).join("");
  }
  return renderAoePlotsAffectedHtml(b, b.target);
}

function skillShortNoteHtml(note) {
  const cleaned = String(note || "").replace(/\s*\([^)]*\)/g, "").split(/\s+[—–]\s+/)[0];
  const segs = cleaned.split(/\s*;\s*/).map(x => x.trim()).filter(Boolean);
  if (!segs.length) return "";
  const kept = segs.filter((x, i) => i === 0 || x.length <= 42);
  return kept.map(x => `<span class="skill-buff-line">${x}</span>`).join("");
}

export function renderSkillPanel() {
  const wrap = document.getElementById("skillListWrap");
  if (!wrap) return;
  const nodes = (SKILL_TREES[skillCategory] || []).filter(s => !s.hideInPanel);
  if (!nodes.length) {
    wrap.innerHTML = `<div class="skill-category-empty">🚧 This skill tree isn't wired up yet — Crops is fully live, the rest are coming in the next pass.</div>`;
    return;
  }
  const tiers = [ 1, 2, 3 ];
  wrap.innerHTML = tiers.map(tier => {
    const tierNodes = nodes.filter(s => s.skillTier === tier);
    if (!tierNodes.length) return "";
    const unlocked = isSkillDraftTierUnlocked(skillCategory, tier);
    return `<div class="skill-tier-block">\n      <div class="skill-tier-heading">${"⭐".repeat(tier)} Tier ${tier}${unlocked ? "" : ` <span class="lock-pip">🔒 ${tierUnlockHintText(skillCategory, tier, skillDraftSelectedSkills)}</span>`}</div>\n      <div class="skill-node-grid">\n        ${tierNodes.map(s => {
      const owned = isSkillDraftActive(s.id);
      const locked = !owned && !unlocked;
      const ascData = ASCENSION_RANK_DATA[s.id];
      const showRankPicker = owned && ascData;
      const rank = showRankPicker ? getDraftAscensionRank(s.id) : 1;
      const syncedLevel = owned ? skillSyncedLevel(s) : null;
      const syncedBoostText = owned ? skillSyncedBoostText(s, syncedLevel) : "";
      const pointsBadge = `<span class="skill-node-points tier-${s.skillTier}">🎓${s.skillTier}pt${s.skillTier > 1 ? "s" : ""}</span>`;
      return `<div class="skill-node-wrap">\n            <button type="button" class="skill-node-btn ${owned ? "owned" : ""} ${locked ? "locked" : ""}" data-skill-id="${s.id}" ${locked ? "disabled" : ""}>\n              ${owned ? `<span class="skill-node-check">✓</span>` : ""}\n              <span class="skill-node-name">${s.name}${pointsBadge}${owned ? ` <span class="skill-level-badge">[Level ${syncedLevel}]</span>` : ""}</span>\n              <span class="skill-node-note">${skillShortNoteHtml(skillAoeNoteForRank(s, rank))}</span>\n            </button>\n            ${showRankPicker ? `\n              <div class="skill-rank-picker" data-skill-id="${s.id}">\n                <span class="skill-rank-picker-label">Rank:</span>\n                ${[ 1, 2, 3 ].map(r => `<button type="button" class="skill-rank-pip ${r <= rank ? "done" : ""} ${r === rank ? "current" : ""}" data-rank="${r}">${r}</button>`).join("")}\n                <span class="skill-rank-boost">${ascensionDescribeRank(s.id, rank)}</span>\n              </div>\n              ${skillRankUsageHtml(s, rank)}\n            ` : ""}\n          </div>`;
    }).join("")}\n      </div>\n    </div>`;
  }).join("");
  if (skillCategory === "cooking") {
    const vipBoost = BOOSTS.find(b => b.id === "vip_access");
    if (vipBoost) {
      const vipOn = isBoostDraftActive(vipBoost.id);
      wrap.insertAdjacentHTML("afterbegin", `<div class="skill-tier-block skill-vip-block"><div class="skill-tier-heading">👑 VIP</div><div class="lib-item-row skill-vip-row${vipOn ? " boost-active" : ""}" data-boost-id="${vipBoost.id}" role="button" tabindex="0"><span class="lib-item-icon">${vipOn ? "✅" : "⬜"}</span><div class="lib-item-main"><div class="lib-item-name">${getBoostIcon(vipBoost.name)}${escapeHtml(vipBoost.name)}</div><div class="lib-item-meta">+10% EXP from all food and fish. Tick it if you have VIP, or to preview what VIP would give you.</div></div></div></div>`);
      const vipRow = wrap.querySelector(".skill-vip-row");
      if (vipRow) {
        vipRow.onclick = () => draftToggleBoost(vipBoost.id);
        vipRow.onkeydown = e => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            draftToggleBoost(vipBoost.id);
          }
        };
      }
    }
  }
  wrap.querySelectorAll(".skill-node-btn").forEach(btn => {
    btn.onclick = () => draftToggleSkill(btn.dataset.skillId);
  });
  wrap.querySelectorAll(".skill-rank-pip").forEach(pip => {
    pip.onclick = e => {
      e.stopPropagation();
      const id = pip.closest(".skill-rank-picker").dataset.skillId;
      const skill = SKILL_BOOSTS.find(s => s.id === id);
      if (skill && !isSkillDraftTierUnlocked(skill.skillCategory, skill.skillTier)) {
        toast(`🔒 Unlock Tier ${skill.skillTier} first — ${tierUnlockHintText(skill.skillCategory, skill.skillTier, skillDraftSelectedSkills)}`);
        return;
      }
      draftSetAscensionRank(id, Number(pip.dataset.rank));
    };
  });
}

function getLimitedTimeBoostIcon(entry) {
  const imgSrc = IMAGE_ICONS[entry.name];
  if (imgSrc) return `<img src="${imgSrc}" alt="${escapeHtml(entry.name)}" style="width:18px;height:18px;image-rendering:pixelated;vertical-align:middle;">`;
  return `<span style="font-size:21.6px;line-height:1;">${entry.fallbackEmoji || "⏳"}</span>`;
}

export function renderShrineProfitabilityBlock(b, cost) {
  const affected = computeShrineAffectedProfitability(b.name);
  if (affected.modeledCount === 0) {
    return `\n    <div class="lib-item-meta" style="margin-top:6px;padding-top:6px;border-top:1px dashed var(--sun-deep);font-weight:700;">📊 Profitability <span style="font-weight:500;opacity:.7;">(no priceable affected nodes found)</span></div>`;
  }
  const net24h = affected.profit24h - cost.dailyCost;
  const netDuration = affected.profit24h * cost.durationDays - cost.totalCost;
  const partialNote = affected.unmodeledCount > 0 ? ` <span style="font-weight:500;opacity:.7;">(+${affected.unmodeledCount} affected item${affected.unmodeledCount === 1 ? "" : "s"} not priced)</span>` : "";
  return `\n    <div class="lib-item-meta" style="margin-top:6px;padding-top:6px;border-top:1px dashed var(--sun-deep);font-weight:700;">📊 Profitability${partialNote}</div>\n    <div class="lib-item-meta" style="font-weight:700;">⏱️ 24hrs: <span class="${net24h >= 0 ? "is-profit" : "is-loss"}" style="color:${net24h >= 0 ? "var(--profit)" : "var(--loss)"};">${net24h >= 0 ? "+" : ""}${fmt(net24h)} ${FLOWER_ICON}</span> <span style="font-weight:500;opacity:.7;">(${fmt(affected.profit24h)} affected profit − ${fmt(cost.dailyCost)} daily cost)</span></div>\n    <div class="lib-item-meta" style="font-weight:700;">📅 Duration (${fmt(cost.durationDays)}d): <span class="${netDuration >= 0 ? "is-profit" : "is-loss"}" style="color:${netDuration >= 0 ? "var(--profit)" : "var(--loss)"};">${netDuration >= 0 ? "+" : ""}${fmt(netDuration)} ${FLOWER_ICON}</span></div>`;
}

function renderLimitedTimeBoostPanel(wrap, term) {
  const groupOrder = [ "Buff", "Totem", "Hourglass", "Shrine", "Pet Shrine", "Animal Shrine" ];
  const groupLabels = {
    Buff: "⚡ Free Buffs",
    Totem: "⏳ Totems",
    Hourglass: "⌛ Hourglasses",
    Shrine: "🏛️ Shrines",
    "Pet Shrine": "🐾 Pet Shrines",
    "Animal Shrine": "🐄 Animal Shrines"
  };
  const g = farmPanelGameState ? farmSyncExtractGameState(farmPanelGameState) : null;
  const synced = !!g;
  const intro = synced ? `<div class="field-hint" style="background:#eef3fb;border:1.5px solid #33507a;padding:8px 10px;border-radius:8px;margin-bottom:10px;font-weight:600;">⏳ Reference list of every temporary/expiring boost, how long it lasts, how many you're holding in your chest, and the time left on any currently active one — pulled from your last farm sync. Data-only for now — not wired into your active boosts yet, this is the basis for a future expiry-timer feature.</div>` : `<div class="field-hint" style="background:#fdf1c8;border:1.5px solid var(--sun-deep);padding:8px 10px;border-radius:8px;margin-bottom:10px;font-weight:600;">⏳ Reference list of every temporary/expiring boost and how long it lasts. Sync your Farm ID (⚡ Boosts panel above) to also see how many you own and the time remaining on any currently active one.</div>`;
  const shrineModeToggleHtml = `<div class="fd-container fdm-gap">
    <div class="fd-container-head"><span class="fd-container-title">Shrine Material Cost</span></div>
    <div class="fdm-pair fdm-flush">
      <button type="button" class="fd-lb-tab${shrineCostMode === "collect" ? " active" : ""}" data-shrine-mode-btn="collect">Collect</button>
      <button type="button" class="fd-lb-tab${shrineCostMode === "buy" ? " active" : ""}" data-shrine-mode-btn="buy">Buy</button>
    </div>
  </div>`;
  const body = groupOrder.map(cat => {
    const rows = LIMITED_TIME_BOOSTS.filter(b => b.group === cat && (!term || b.name.toLowerCase().includes(term)));
    if (!rows.length) return "";
    return `<div class="lib-section-title">${groupLabels[cat]}</div>` + (cat === "Shrine" ? shrineModeToggleHtml : "") + rows.map(b => {
      let statusHtml = "";
      if (synced) {
        const status = farmSyncGetLimitedTimeBoostStatus(g, b.name, b.durationMs);
        const qtyTxt = b.group === "Buff" ? "" : `🎒 ${fmt(status.quantity)} in inventory`;
        const activeTxt = status.activeCount ? `${b.group === "Buff" ? "" : " · "}⏳ ${formatDuration(status.remainingMs / 1e3)} left${status.activeCount > 1 ? ` (×${status.activeCount} active)` : ""}` : ` · 💤 not currently active`;
        statusHtml = `<div class="lib-item-meta">${qtyTxt}${activeTxt}</div>`;
      }
      return `<div class="lib-item-row" data-limited-boost-id="${b.id}" style="cursor:default;display:block;">\n        <div style="display:flex;align-items:flex-start;">\n          <span class="lib-item-icon">${getLimitedTimeBoostIcon(b)}</span>\n          <div class="lib-item-main">\n            <div class="lib-item-name">${escapeHtml(b.name)}</div>\n            <div class="lib-item-meta">⏱️ Lasts ${b.durationLabel}</div>\n            ${statusHtml}\n          </div>\n        </div>\n        ${renderShrineCostBlock(b)}\n      </div>`;
    }).join("");
  }).join("");
  wrap.innerHTML = intro + (body || `<div class="lib-empty">No boosts match your search.</div>`);
  attachShrineCostToggles(wrap);
  wrap.querySelectorAll("[data-shrine-mode-btn]").forEach(btn => {
    btn.onclick = () => {
      setShrineCostMode(btn.getAttribute("data-shrine-mode-btn"));
      renderLimitedTimeBoostPanel(wrap, term);
    };
  });
  clearInterval(limitedTimeBoostRefreshTimer);
  if (synced) {
    __set_limitedTimeBoostRefreshTimer(setInterval(() => {
      if (boostCategory === "limitedtime" && document.getElementById("boostListWrap")) {
        renderLimitedTimeBoostPanel(wrap, term);
      } else {
        clearInterval(limitedTimeBoostRefreshTimer);
      }
    }, 3e4));
  }
}

export function renderBoostPanel() {
  const wrap = document.getElementById("boostListWrap");
  if (!wrap) return;
  const term = normalizeSearch(document.getElementById("boostSearchInput").value);
  if (boostCategory === "limitedtime") {
    renderLimitedTimeBoostPanel(wrap, term);
    const budSectionEl0 = document.getElementById("budSection");
    const animalBudSectionEl0 = document.getElementById("animalBudSection");
    const fruitBudSectionEl0 = document.getElementById("fruitBudSection");
    const cropBudSectionEl0 = document.getElementById("cropBudSection");
    const resourceBudSectionEl0 = document.getElementById("resourceBudSection");
    const fishBudSectionEl0 = document.getElementById("fishBudSection");
    if (budSectionEl0) budSectionEl0.style.display = "none";
    if (animalBudSectionEl0) animalBudSectionEl0.style.display = "none";
    if (fruitBudSectionEl0) fruitBudSectionEl0.style.display = "none";
    if (cropBudSectionEl0) cropBudSectionEl0.style.display = "none";
    if (resourceBudSectionEl0) resourceBudSectionEl0.style.display = "none";
    if (fishBudSectionEl0) fishBudSectionEl0.style.display = "none";
    return;
  }
  const inCategory = BOOSTS.filter(b => (b.category || "crops") === boostCategory && b.source !== "skill");
  let groups;
  if (boostCategory === "resources") {
    groups = [ {
      label: "🌐 Global — multiple resources",
      items: inCategory.filter(b => b.scope === "resourceList" && !b.isBud)
    }, {
      label: "<img src='data:image/webp;base64,UklGRgoBAABXRUJQVlA4TP0AAAAvGUAIEDegqG0jNlcQ4yaWe5+SAAjQHI1mjQMoaiSFOXrTwBP/EhEIJDntbzBUAMBdr919wXA3qwHotfW2bT6VAYRMIBM+HgDE8W8dA9QERAZw4f47qKRMENH/CcC/Xnw8U6OcWCJiPKrhUU6UVs9ExIlnRNwW35PWGtcY99SNo5bNfN+UdU/fbvwdtw2kuvGrMQAfRd3YjIEliqivbKv1qCVEvWS+5h71XUXdsj0YeMZH3htjQNpdqhub9ZhVVdSNUwLm/Na8IeoAeUjW94aAy1VF695EKSV1S0TUTUSU2OXEhbN8bUBExFmIiLBzCEwnOgAnsD3A/kREHQAAAA==' style='width:12px;height:12px;vertical-align:-2px;image-rendering:pixelated;'> Wood",
      items: inCategory.filter(b => b.scope === "resource" && b.target === "Wood" && !b.isBud)
    }, {
      label: "<img src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAAKBAMAAAB293L0AAAAElBMVEUAAAAAAABaaYjAy9yLm7Q6RGZCzX5iAAAAAnRSTlMAUWr/rFoAAABFSURBVAjXFcfBCYAwEAXRieA9Ab3rtwM/NqApIIL91+LuuwwDTBLpsLdc2yfwRS+Ye/5g7Y+tQem3pBcWhQolshNaa5UfUz8IbGXZZvAAAAAASUVORK5CYII=' style='width:12px;height:12px;vertical-align:-2px;image-rendering:pixelated;'> Stone",
      items: inCategory.filter(b => b.scope === "resource" && b.target === "Stone" && !b.isBud)
    }, {
      label: "<img src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAAKBAMAAAB293L0AAAAG1BMVEUAAAAAAABZaonDzNzChWmNnrW8a1E6RGXkpnLnNQW1AAAAAnRSTlMAUWr/rFoAAABRSURBVAjXY2BgYFJSaWAAAmVjMxcQ19jDOA1Il5qlGJszMLCHmoYaGxUwiLsGGxsrFTAwpgQpKSkVMjCIKak0KQkwMDAqpbkogvQLCgoKMAAAz/MLWThOkbcAAAAASUVORK5CYII=' style='width:12px;height:12px;vertical-align:-2px;image-rendering:pixelated;'> Iron",
      items: inCategory.filter(b => b.scope === "resource" && b.target === "Iron" && !b.isBud)
    }, {
      label: "<img src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAAKBAMAAAB293L0AAAAG1BMVEUAAAAAAABaaYjAy9yLm7T+rzU6RGb+52H/9LV6ksrWAAAAAnRSTlMAUWr/rFoAAABRSURBVAjXY2BgYFJSbWAAAmVjk3AQ17jC2BVIp5iGGpsxMLC5mLgYGyUwiJU4GxsrJTAwhjspKSklMjCIKqk3KQkwMDAqhYYrgvQLCgoKMAAAxi0LCbukMasAAAAASUVORK5CYII=' style='width:12px;height:12px;vertical-align:-2px;image-rendering:pixelated;'> Gold",
      items: inCategory.filter(b => b.scope === "resource" && b.target === "Gold" && !b.isBud)
    }, {
      label: "<img src='data:image/webp;base64,UklGRiABAABXRUJQVlA4TBQBAAAvF8AGEFdgpgESbiLQl1AU8HT+JvGyhqJGUhgkIAXlGOnlT3CCokiSmlNy5s5xTsCPJxogyLap2OgP9gCA/38tunmCbCR1qL2D3IpuXhrgRtvetvkrhVYOA+TQpt68D1jA+HguFcDPxwGcJkiVKvL+1uq8JqAdIvo/AWa2PJE0serDfwPkypKnADApYgpnDZArwOKmtozA7rdBnpjFCHx9N8jZlojA63tAxmSZXgAy4C0UEYnINT0Ch9pzDKyKPknPJKUw9Kl7uCHZtWHowRoxfMbEJ5IMefwUEkkGaPxURDUXqqlynHjerGqR/LvJ0uhSS+5+15J7X9x/rzX41iWSt5LPzV0t2cndbOt752a2z8qamQE=' style='width:12px;height:12px;vertical-align:-2px;image-rendering:pixelated;'> Crimstone",
      items: inCategory.filter(b => b.scope === "resource" && b.target === "Crimstone" && !b.isBud)
    }, {
      label: "<img src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAkAAAAOBAMAAAAPuiubAAAAIGNIUk0AAHomAACAhAAA+gAAAIDoAAB1MAAA6mAAADqYAAAXcJy6UTwAAAAhUExURQAAAAAAAP6uNIubtFppiDpEZvd2IuQ7RCYrRMDL3P///zzugfcAAAABdFJOUwBA5thmAAAAAWJLR0QKaND0VgAAAAd0SU1FB+gLCgs6CAmJW5AAAABTSURBVAjXY2AQFBRgYGBUMlJkYBBSCVESAJIuIFI1FEiKKSmpAcm0tDQBBvG0tHQBBsby8kIGBgbBFk8ge2aLlwCDpEvLQgYGKZdVIHOWNDIwAADSKQ2XECMmWQAAACV0RVh0ZGF0ZTpjcmVhdGUAMjAyNC0xMS0xMFQxMTo1ODowOCswMDowMHToH40AAAAldEVYdGRhdGU6bW9kaWZ5ADIwMjQtMTEtMTBUMTE6NTg6MDgrMDA6MDAFtacxAAAAKHRFWHRkYXRlOnRpbWVzdGFtcAAyMDI0LTExLTEwVDExOjU4OjA4KzAwOjAwUqCG7gAAAABJRU5ErkJggg==' style='width:12px;height:12px;vertical-align:-2px;image-rendering:pixelated;'> Oil",
      items: inCategory.filter(b => b.scope === "resource" && b.target === "Oil" && !b.isBud)
    }, {
      label: "<img src='data:image/webp;base64,UklGRiQBAABXRUJQVlA4TBgBAAAvI4AIEE9gpgESCvBRgIuX2cyW9rCUmki2mt8lBVlEgBb/lujUNJICnQQcUP1Q0mMD/wLQIBBIAtt+sQCAVErMFOJi063X/Tv33+KCg9ra2uYPCsKJgWkg/aMg+XAAcbAcUAykdcBB7+pQENH/CSAiavusoHS7aJNUo0i0C0wWo4gW6COrMBJRC328s4eCiPbbZq8tWvTxzL0ONVILfVvvIm/tpSASIUTBJR4l3kZDwjvrbFxQ+IF3n4XwD959liwJkXc/yv9gf1prXfTaEjC3zV4GGB4r9P7ObgpzBHNkDSIGdE4BPEy8AiYLzNxI5rVkZpZyYi5hbmQtmRlZZpYVyamskUS1nLiwkRURyQ+JiOqyKqK6pCIi' style='width:12px;height:12px;vertical-align:-2px;image-rendering:pixelated;'> Obsidian / Lava Pit",
      items: inCategory.filter(b => b.scope === "lavaPit")
    } ];
  } else if (boostCategory === "fruits") {
    groups = [ {
      label: "🌐 Global — all fruits",
      items: inCategory.filter(b => b.scope === "global" && !b.composterFertilizer && !b.isBud && !b.hiddenFromOwnPanel)
    }, {
      label: "🍅 Tomato",
      items: inCategory.filter(b => b.scope === "fruit" && b.target === "Tomato" && !b.isBud)
    }, {
      label: "🍋 Lemon",
      items: inCategory.filter(b => b.scope === "fruit" && b.target === "Lemon" && !b.isBud)
    }, {
      label: "🫐 Blueberry",
      items: inCategory.filter(b => (b.scope === "fruit" && b.target === "Blueberry" || b.scope === "fruitList" && Array.isArray(b.fruits) && b.fruits.includes("Blueberry")) && !b.isBud)
    }, {
      label: "🍊 Orange",
      items: inCategory.filter(b => (b.scope === "fruit" && b.target === "Orange" || b.scope === "fruitList" && Array.isArray(b.fruits) && b.fruits.includes("Orange")) && !b.isBud)
    }, {
      label: "🍎 Apple",
      items: inCategory.filter(b => (b.scope === "fruit" && b.target === "Apple" || b.scope === "fruitList" && Array.isArray(b.fruits) && b.fruits.includes("Apple")) && !b.isBud)
    }, {
      label: "🍌 Banana",
      items: inCategory.filter(b => (b.scope === "fruit" && b.target === "Banana" || b.scope === "fruitList" && Array.isArray(b.fruits) && b.fruits.includes("Banana")) && !b.isBud)
    }, {
      label: "🌙 Full Moon (Celestine / Lunara / Duskberry)",
      items: inCategory.filter(b => b.scope === "fruitList" && Array.isArray(b.fruits) && (b.fruits.includes("Celestine") || b.fruits.includes("Lunara") || b.fruits.includes("Duskberry")) && !b.isBud)
    } ];
  } else if (boostCategory === "greenhouse") {
    groups = [ {
      label: "🌐 Global — all greenhouse",
      items: inCategory.filter(b => b.scope === "global" && !b.composterFertilizer && !b.isBud)
    }, {
      label: "🍇 Grape",
      items: inCategory.filter(b => b.scope === "greenhouse" && b.target === "Grape" && !b.isBud)
    }, {
      label: "🍚 Rice",
      items: inCategory.filter(b => b.scope === "greenhouse" && b.target === "Rice" && !b.isBud)
    }, {
      label: "🫒 Olive",
      items: inCategory.filter(b => b.scope === "greenhouse" && b.target === "Olive" && !b.isBud)
    } ];
  } else if (boostCategory === "cropmachine") {
    groups = [ {
      label: "🚜 Machine batch time",
      items: inCategory.filter(b => b.scope === "machineGlobal")
    } ];
  } else if (boostCategory === "honey") {
    groups = [ {
      label: "🐝 Hive output &amp; speed",
      items: inCategory.filter(b => b.scope === "hiveGlobal" && (b.honeyYieldAdd || b.speedAdd))
    }, {
      label: `<img src='${BEE_SWARM_ICON}' style='width:12px;height:12px;vertical-align:-2px;image-rendering:pixelated;'> Bee Swarm chance`,
      items: inCategory.filter(b => b.scope === "hiveGlobal" && b.swarmChanceMult && !b.honeyYieldAdd && !b.speedAdd)
    }, {
      label: "🌷 Flower speed &amp; bonus flowers",
      items: inCategory.filter(b => b.scope === "flowerGlobal")
    } ];
  } else if (boostCategory === "animals") {
    groups = [ {
      label: "🌐 Global — all animals",
      items: inCategory.filter(b => b.scope === "animalGlobal" && !b.isBud)
    }, {
      label: `${getIcon("Chicken")} Chicken`,
      items: inCategory.filter(b => b.scope === "animalType" && b.target === "chicken" && !b.isBud)
    }, {
      label: `${getIcon("Sheep")} Sheep`,
      items: inCategory.filter(b => b.scope === "animalType" && b.target === "sheep" && !b.isBud)
    }, {
      label: `${getIcon("Cow")} Cow`,
      items: inCategory.filter(b => b.scope === "animalType" && b.target === "cow" && !b.isBud)
    } ];
  } else if (boostCategory === "tools") {
    groups = [ {
      label: "🏚️ Stocks",
      items: inCategory.filter(b => b.scope === "buildingGlobal")
    }, {
      label: "🌐 Global — all tools",
      items: inCategory.filter(b => b.scope === "toolGlobal")
    }, {
      label: "🎣 Rod",
      items: inCategory.filter(b => b.scope === "tool" && b.target === "Rod")
    }, {
      label: "🧂 Salt Rake",
      items: inCategory.filter(b => b.scope === "tool" && b.target === "Salt Rake")
    }, {
      label: "<img src='data:image/webp;base64,UklGRrIAAABXRUJQVlA4TKYAAAAvDIADEFegoI0UBhF7WSD4F0FwgxU1kaQwX+EgOUABDnAfO/SoiWSr+d2vcgAFGKDCv4YoZ/4DANBGdCKBJrtS56yalv/p6tvbDG5rbVuT790gnj7YAFrHa2wAp3b6MAIb5LDpv8T7RvQ/jL5gpHe9pEbul9MrzLsOsmNquWuRXyeZnC7uU+nZIm97Fi1u/079E3n3lQqsfiQ3yHcka3iVpMjoS4IB' style='width:12px;height:12px;vertical-align:-2px;image-rendering:pixelated;'> Crab Pot",
      items: inCategory.filter(b => b.scope === "tool" && b.target === "Crab Pot")
    }, {
      label: "<img src='data:image/webp;base64,UklGRqAAAABXRUJQVlA4TJMAAAAvDgAEELW4jSRJUpxAO53AA0TsQcIgTMIsuMaFjlLR2d2bJxRFktRcUpBIfyQgAv9G8l9pABCMvZoo+f8sb0j9N5i0zYS2e8U+SSu2ecxTMHXtphScm0ZEXHJlRkQMPiI3Zch3fLmxfzZlEI9SMEoZcN8r44DnmjxENnS+fotsOG7jfyIPGNn/XeaAGEpgQsE2ig0A' style='width:12px;height:12px;vertical-align:-2px;image-rendering:pixelated;'> Mariner Pot",
      items: inCategory.filter(b => b.scope === "tool" && b.target === "Mariner Pot")
    } ];
  } else if (boostCategory === "composter") {
    groups = [ {
      label: "<img src='data:image/webp;base64,UklGRkoBAABXRUJQVlA4TD4BAAAvE8AHEK/ANACANJDcNWvn/zdoJBo7QQ9hGtlWK7BR5YzG0wQl0wEV0AKDRP7IJgCANLxE4HLrQnLPsNfdVSCQZLK/1SgBAOC1LDH8r1vaQMj/IARY2/SLigiJwxrVICXLvbSmc6/R3sw5he8/zXW5uNAzA4iRbdVtHPx5EYZc+R5e/8UCikuI6P8E3NaxvF2uFy/UcbHuRrk4FhFRxsUSEbdorZVRtqO01uJrn2swff6unWLxKWNbZCbId81lfScWYfWSY5sFe1LW+7amz05w+j8igKyP+fV61DxFBFbWx+saml6v12OuCQSGrLmtqU4EOvNdt++URXB6XAZPGllyWXLgFshcOzuBzQASEhinCKTubqGO1DECy5ItyZYsdQLbxjM22EQDOJgPOA6IaK0dl1tri3/H8/eLz+/8fBU=' style='width:12px;height:12px;vertical-align:-2px;image-rendering:pixelated;'> Compost Bin",
      items: inCategory.filter(b => b.scope === "composter" && b.target === "Compost Bin")
    }, {
      label: "<img src='data:image/webp;base64,UklGRmwBAABXRUJQVlA4TGABAAAvG0AIEL/ANACANLg0h6yd/9+gMYvbCXoI08i2WoGNKmc0HkfldEAFtIBkkD8yDQAwyar3JcUSj3C530B0dxcIJJnsbzVKAAA4bReZ+NctZSDufxACpDGcFdqlBMSFEejVI0sm9dKcoXuNjr2Al+88ue8/jXW5uKVlzSBBtu22bWzVb7PkB8YD9r9WNmgH70b0fwK+zsauL0+8YTp8w8QJ2sDpqN0GtqNbG3g7c7t8EDAmwCwwZoH42F+/tcs3i83fvz5PvsjsktppncumavOfPt0vT1ZNhXMd5Q19epx9YXvqtawKlbp5sQewlwrBmJIKVHOzfdk2+Eh55ixdEKrQJ1/GuSpQlj5Pl2dnRaFS21Dhzdq6bz6N3VSXQM4xZVUoNwKDAYNvopXcqMKaKK2kaE2RViWF00oMYIOxEgyrQtXYeIuNjW1jE4u2v2wNBgMYggU8FNgZHs+fDz4/8/1R' style='width:12px;height:12px;vertical-align:-2px;image-rendering:pixelated;'> Turbo Composter",
      items: inCategory.filter(b => b.scope === "composter" && b.target === "Turbo Composter")
    }, {
      label: "<img src='data:image/webp;base64,UklGRn4BAABXRUJQVlA4THIBAAAvIYAIEKegJpKt5lPlHOvY418GGGCoEIEQprW1tQFbVe9oPEuwKwvU6GySExcbxSYAgDS8ROByK0AKGhOCnwj6OmwCgSST/a1GCQBA0LLM8F83xkDY/xAEeOvGTyWEpNuZ1aAlKCNZl3de5n7RfrbHhZGZ2C2DxDaSHEnS1/99Iyqnz39nZ0XPWhAR0f8JeHuy3WRmB/6gP/gHHXigH9P7veNjOvc8pvuIk1+o6RVN31zMFYu20/g4JjtyI/v47WNqd+xZmtn2YxyTx7FvNmON/jmZUbFlq1yR2mKdvuBH7is3T8bKjR91Ru1phnrufh/rjdpO/AjgA562InLn6R+lj0rFSs3hhxs2s+2jj8l9WFvakn389smOlGnZOC6s2IzF4IOJwpHaIpVrjGXQjzhQFFBB4ahsihWQNa6ENQprXIkVKhZZS0BABQVEQNNMGUtNqSk1ZSxT5rTE/6iiiioKiuLSXJQL9dbF7fvf5bzC+wsC' style='width:12px;height:12px;vertical-align:-2px;image-rendering:pixelated;'> Premium Composter",
      items: inCategory.filter(b => b.scope === "composter" && b.target === "Premium Composter")
    }, {
      label: "🌐 All composters",
      items: inCategory.filter(b => b.scope === "composterGlobal")
    } ];
  } else if (boostCategory === "spicerack") {
    groups = [];
  } else if (boostCategory === "salt") {
    groups = [ {
      label: "🧂 Salt Farm — yield, recharge &amp; rake cost",
      items: inCategory.filter(b => b.scope === "saltGlobal")
    }, {
      label: "🎣 Aging Rack — Salt cost &amp; Prime Aged chance",
      items: inCategory.filter(b => b.scope === "agingGlobal")
    }, {
      label: "🧪 Fermentation Rack &amp; Spice Rack — double chance, XP",
      items: inCategory.filter(b => b.scope === "fermentationSpiceGlobal")
    }, {
      label: "🥫 Spice Rack — bonus output",
      items: inCategory.filter(b => b.scope === "spiceRackGlobal")
    } ];
  } else if (boostCategory === "cooking") {
    groups = [ {
      label: "🌐 Global — all food EXP",
      items: inCategory.filter(b => b.scope === "foodGlobal")
    }, {
      label: "🐟 Fish dishes EXP",
      items: inCategory.filter(b => b.scope === "foodFish")
    }, {
      label: "🎂 Cakes EXP",
      items: inCategory.filter(b => b.scope === "foodCake")
    }, {
      label: "🧀 Cheese recipes EXP",
      items: inCategory.filter(b => b.scope === "foodCheese")
    }, {
      label: "🥕 Specific dishes",
      items: inCategory.filter(b => b.scope === "foodSpecific")
    }, {
      label: "⏱️ Cooking time — all buildings",
      items: inCategory.filter(b => b.scope === "cookTimeGlobal")
    } ];
  } else if (boostCategory === "pets") {
    groups = [ {
      label: "⚡ Energy Boosts",
      items: inCategory.filter(b => b.scope === "petEnergyGlobal")
    }, {
      label: "✨ Experience Boosts",
      items: inCategory.filter(b => b.scope === "petXpGlobal" || b.scope === "petXpDifficulty")
    }, {
      label: "📦 Yield Boosts",
      items: inCategory.filter(b => b.scope === "petFetchAcorn")
    }, {
      label: "🛠️ Utility",
      items: inCategory.filter(b => b.scope === "petFeedCostGlobal" || b.scope === "petResetGlobal")
    } ];
  } else if (boostCategory === "fishing") {
    groups = [ {
      label: `<img src='${FISHING_ROD_ICON}' style='width:12px;height:12px;vertical-align:-2px;image-rendering:pixelated;'> Rod cost`,
      items: inCategory.filter(b => b.scope === "fishRod")
    }, {
      label: "🐟 Fish Yield (Basic / Advance / Expert)",
      items: inCategory.filter(b => b.scope === "fishYield")
    }, {
      label: "🦀 Crab yield (Rod-caught)",
      items: inCategory.filter(b => b.scope === "fishCrab")
    }, {
      label: "🕸️ Crustacean yield &amp; traps (Crab Pot / Mariner Pot)",
      items: inCategory.filter(b => b.scope === "crustacean")
    }, {
      label: "🏪 Fish Market",
      items: inCategory.filter(b => b.scope === "fishMarket")
    } ];
  } else {
    const calendarEventOrder = [ "Bountiful Harvest", "Sunshower", "Insect Plague", "Tsunami", "Tornado", "Great Freeze" ];
    groups = [ {
      label: "⚡ Daily Chest Buff",
      items: inCategory.filter(b => b.limitedBoostName === "Power hour" && !b.hiddenFromOwnPanel)
    }, {
      label: "📅 Calendar Events",
      items: inCategory.filter(b => isCalendarSeasonalBoost(b) && !b.isBud).sort((a, b) => calendarEventOrder.indexOf(a.name) - calendarEventOrder.indexOf(b.name))
    }, {
      label: "🌐 Global — all crops",
      items: inCategory.filter(b => b.scope === "global" && !b.composterFertilizer && !b.isBud && !isCalendarSeasonalBoost(b) && b.limitedBoostName !== "Power hour")
    }, {
      label: "🎁 Basic tier &amp; crops",
      items: inCategory.filter(b => (b.scope === "tier" && b.target === "Basic" || b.scope === "crop" && BASE_CROPS[b.target] && BASE_CROPS[b.target].tier === "Basic") && !b.isBud)
    }, {
      label: "🥕 Medium tier &amp; crops",
      items: inCategory.filter(b => (b.scope === "tier" && b.target === "Medium" || b.scope === "crop" && BASE_CROPS[b.target] && BASE_CROPS[b.target].tier === "Medium") && !b.isBud)
    }, {
      label: "🍇 Advanced tier &amp; crops",
      items: inCategory.filter(b => (b.scope === "tier" && b.target === "Advanced" || b.scope === "crop" && BASE_CROPS[b.target] && BASE_CROPS[b.target].tier === "Advanced") && !b.isBud)
    } ];
  }
  const missingFields = getMissingPlotNodeFields();
  const lockNotice = missingFields.length ? `<div class="field-hint" style="background:#fdf1c8;border:1.5px solid var(--sun-deep);padding:8px 10px;border-radius:8px;margin-bottom:10px;font-weight:600;">⚠️ Fill in <b>Crop plots</b> and <b>every Resource node count</b> in <b>Plots &amp; Nodes</b> above before turning on boosts — an AoE boost (like Gnome on crops or Sir Goldensnout on resources) gives the wrong yield if it can't be diluted across your real plot/node count. Fruit node counts and animals stay optional.<br><span style="font-weight:400;color:var(--ink-soft);">Still missing: ${missingFields.join(", ")}</span></div>` : "";
  const cropMachineNote = boostCategory === "cropmachine" ? `<div class="hint-collapsible"><button type="button" class="hint-q-btn" aria-label="More info">❓</button><div class="hint-slide"><div class="field-hint" style="background:#e6f0f7;border:1.5px solid #2b6b8f;padding:8px 10px;border-radius:8px;margin-bottom:10px;font-weight:600;color:#1c4a63;">🛢️ Oil boosts (Battle Fish, Oil Can, Oil Gallon, Oil Overalls, Infernal Drill, Dev Wrench, Stag Shrine...) live in <b>⛏️ Mining → Oil</b>, and per-crop yield boosts (Scarecrow, Sunflower Amulet, Easter Bunny...) live in <b>🌾 Crops</b> — both already apply to the Crop Machine automatically. Only machine-specific batch-time boosts are listed here.</div></div></div>` : "";
  const fishingNote = boostCategory === "fishing" ? `<div class="hint-collapsible"><button type="button" class="hint-q-btn" aria-label="More info">❓</button><div class="hint-slide"><div class="field-hint" style="background:#e6f0f7;border:1.5px solid #2b6b8f;padding:8px 10px;border-radius:8px;margin-bottom:10px;font-weight:600;color:#1c4a63;">🎣 Every boost here is wired straight into <b>🎣 Fishing</b> above — Rod cost, Fish/Crab/Crustacean yield, Crab Pot &amp; Mariner Pot time, and Fish Market processing time &amp; yield all update live as you toggle these on.</div></div></div>` : "";
  const fertilizerToggleHtml = boostCategory === "spicerack" ? renderFertilizerApplyToggles() : "";
  const spiceAnimalToggleHtml = boostCategory === "spicerack" ? renderSpiceRackAnimalToggles() : "";
  wrap.innerHTML = lockNotice + cropMachineNote + fishingNote + fertilizerToggleHtml + spiceAnimalToggleHtml + (groups.map(g => {
    const rows = g.items.filter(b => !term || b.name.toLowerCase().includes(term) || (b.target || "").toLowerCase().includes(term));
    if (!rows.length) return "";
    return `<div class="boost-group"><div class="lib-section-title">${g.label}</div>` + rows.map(b => {
      const manualToggleBlockedPre = b.id === "bee_swarm" || !!b.isDebuff;
      const active = manualToggleBlockedPre ? isBoostActive(b.id) : isBoostDraftActive(b.id);
      const parts = [];
      if (b.yieldMult) parts.push(`×${b.yieldMult} yield`);
      if (b.beeSwarmStack) {
        const perSwarm = getBeeSwarmPerSwarmYield();
        const pollenActive = isSkillActive("skill_pollen_power_up");
        const avgPerPlot = beeSwarmAffectedPlots > 0 ? beeSwarmActiveCount / beeSwarmAffectedPlots : 0;
        parts.push(beeSwarmActiveCount > 0 ? `+${fmt(perSwarm * avgPerPlot)} yield/plot (${beeSwarmActiveCount} swarm${beeSwarmActiveCount === 1 ? "" : "s"} ÷ ${beeSwarmAffectedPlots} plot${beeSwarmAffectedPlots === 1 ? "" : "s"} = ${fmt(avgPerPlot)} avg × +${fmt(perSwarm)}${pollenActive ? " w/ Pollen Power Up" : ""})` : `+${fmt(perSwarm)} yield per active swarm${pollenActive ? " (incl. Pollen Power Up)" : ""}`);
      } else if (b.yieldAdd) parts.push(`+${b.yieldAdd} yield`);
      if (b.yieldAddAll) parts.push(`+${b.yieldAddAll} yield (all produce)`);
      if (b.timeMult) parts.push(`×${b.timeMult} time`);
      if (b.expMult) parts.push(`×${b.expMult} EXP`);
      if (b.expAdd) parts.push(`+${fmt(b.expAdd)} EXP`);
      if (b.harvestAdd) parts.push(`+${b.harvestAdd} harvest`);
      if (b.debuffLossMult) parts.push(`⚠️ destroys ~${Math.round(b.debuffLossMult * 100)}% of growing plots (random) if unprotected`);
      if (b.toolCostMult) parts.push(`×${b.toolCostMult} tool cost`);
      if (b.coinCostMult) parts.push(`×${b.coinCostMult} coin cost`);
      if (b.stockMult) parts.push(`×${b.stockMult} restock stock`);
      if (b.materialSwap) parts.push(`${fmt(b.materialSwap.qty)} ${b.materialSwap.to} instead of ${b.materialSwap.from}`);
      if (b.noTool) parts.push(`no tool needed`);
      if (b.noWood) parts.push(`no tool needed`);
      if (b.materialQtyMult) parts.push(`×${b.materialQtyMult} materials`);
      if (b.freeCost) parts.push(b.category === "salt" ? `🆓 free Salt Rake (no rake consumed)` : `🆓 free seeds`);
      if (b.yieldMultAll) parts.push(`×${b.yieldMultAll} produce`);
      if (b.feedMult) parts.push(`×${b.feedMult} feed`);
      if (b.feedMultAll) parts.push(`×${b.feedMultAll} feed`);
      if (b.freeFeed) parts.push(`🆓 free feed`);
      if (b.freeCure) parts.push(`🆓 free medicine`);
      if (b.cureCostMult) parts.push(`×${b.cureCostMult} cure cost`);
      if (b.perUseCostFlower) parts.push(`${fmt(b.perUseCostFlower)} ${FLOWER_ICON}/use`);
      if (b.honeyYieldAdd) parts.push(`+${fmt(b.honeyYieldAdd)} Honey/full hive`);
      if (b.speedAdd) parts.push(`+${fmt(b.speedAdd)} honey speed`);
      if (b.swarmChanceMult) parts.push(`×${b.swarmChanceMult} swarm chance`);
      if (b.swarmChanceAdd) parts.push(`+${Math.round(b.swarmChanceAdd * 100)}% swarm chance`);
      if (b.flowerTimeMult) parts.push(`×${b.flowerTimeMult} flower time`);
      if (b.flowerExtraChance) parts.push(`${Math.round(b.flowerExtraChance * 100)}% chance +1 flower`);
      if (b.flowerExtraFlat) parts.push(`+${fmt(b.flowerExtraFlat)} flower guaranteed`);
      if (b.fertAdd) parts.push(`+${fmt(b.fertAdd)} fertiliser/cycle`);
      if (b.wormAdd) parts.push(`+${fmt(b.wormAdd)} worm/cycle`);
      if (b.fertPotencyMult) parts.push(`×${b.fertPotencyMult} ${b.appliesFertilizer || "fertiliser"} effect`);
      if (b.saltYieldAdd) parts.push(`+${fmt(b.saltYieldAdd)} Salt/harvest`);
      if (b.saltRechargeTimeMult) parts.push(`×${b.saltRechargeTimeMult} Salt Node recovery time`);
      if (b.agingSaltCostMult) parts.push(`×${b.agingSaltCostMult} Salt cost for Aging Fish`);
      if (b.primeChanceAdd) parts.push(`+${fmt(b.primeChanceAdd)}% Prime Aged chance`);
      if (b.doubleChancePct) parts.push(`${fmt(b.doubleChancePct)}% chance to double Fermentation &amp; Spice Rack output`);
      if (b.agedFishXpMult) parts.push(`×${b.agedFishXpMult} XP from Aged Fish`);
      if (b.spiceOutputAdd) parts.push(`+${fmt(b.spiceOutputAdd)} Spice Rack output`);
      if (b.oilQtyMult) parts.push(`×${b.oilQtyMult} Oil cost`);
      if (b.feedBuffHarvests) parts.push(`Salt Lick / Honey Treat lasts ${b.feedBuffHarvests} harvests`);
      if (b.petEnergyAdd) parts.push(`+${fmt(b.petEnergyAdd)} Pet Energy`);
      if (b.petXpAdd) parts.push(`+${fmt(b.petXpAdd)} Pet XP`);
      if (b.petXpAddMedium) parts.push(`+${fmt(b.petXpAddMedium)} XP (medium meals)`);
      if (b.petXpAddHard) parts.push(`+${fmt(b.petXpAddHard)} XP (hard meals)`);
      if (b.petFetchAdd) parts.push(`+${fmt(b.petFetchAdd)} Acorn/fetch`);
      if (b.petFreeFeed) parts.push(`🆓 Free feed cost`);
      if (b.petResetPct) parts.push(`${Math.round(b.petResetPct * 100)}% free reset`);
      if (b.fishYieldAdd) parts.push(b.fishYieldAdd >= 1 ? `+${fmt(b.fishYieldAdd)} Fish` : `${Math.round(b.fishYieldAdd * 100)}% chance +1 Fish`);
      if (b.crabYieldAdd) parts.push(`+${fmt(b.crabYieldAdd)} Crab yield`);
      if (b.crustaceanYieldAdd) parts.push(b.crustaceanYieldAdd >= 1 ? `+${fmt(b.crustaceanYieldAdd)} Crustacean yield` : `${Math.round(b.crustaceanYieldAdd * 100)}% chance +1 Crustacean yield`);
      if (b.crustaceanTrapTimeMult) parts.push(`×${b.crustaceanTrapTimeMult} Crab Pot &amp; Mariner Pot time`);
      if (b.crustaceanTrapFreeCost) parts.push(`🆓 Free Trap Pot cost`);
      if (b.fishMarketTimeMult) parts.push(`×${b.fishMarketTimeMult} Fish Market processing time`);
      if (b.fishMarketYieldAdd) parts.push(`${Math.round(b.fishMarketYieldAdd * 100)}% chance +1 Fish Market yield`);
      if (b.rodFreeCost) parts.push(`🆓 Free Rod cost`);
      const targetTxt = b.target ? ` (${escapeHtml(b.target)})` : b.resources ? ` (${b.resources.join("/")})` : "";
      const groupTag = b.group ? ` · 🔒 1 per slot` : "";
      const locked = isSeasonLocked(b);
      const alwaysOn = !!b.alwaysOn;
      const syncDetected = !!b.syncDetected;
      const isCalendarBoost = isCalendarSeasonalBoost(b) || b.limitedBoostName === "Power hour";
      const manualToggleBlocked = b.id === "bee_swarm" || !!b.isDebuff;
      const syncIconSrc = IMAGE_ICONS[b.name] || BEE_SWARM_ICON;
      const seasonEmoji = {
        Spring: `<img src="${ICON_DATA["season_spring.png"]}" alt="Spring" style="width:14px;height:14px;vertical-align:-3px;image-rendering:pixelated;">`,
        Summer: `<img src="${ICON_DATA["season_summer.png"]}" alt="Summer" style="width:14px;height:14px;vertical-align:-3px;image-rendering:pixelated;">`,
        Autumn: `<img src="${ICON_DATA["season_autumn.png"]}" alt="Autumn" style="width:14px;height:14px;vertical-align:-3px;image-rendering:pixelated;">`,
        Winter: `<img src="${ICON_DATA["season_winter.png"]}" alt="Winter" style="width:14px;height:14px;vertical-align:-3px;image-rendering:pixelated;">`
      };
      const seasonList = b.seasons && b.seasons.length ? b.seasons : b.season ? [ b.season ] : null;
      const seasonTag = seasonList ? ` · <span class="season-lock-tag">${seasonList.map(s => seasonEmoji[s] || "").join("")} ${seasonList.map(s => escapeHtml(s)).join(" & ")} only${locked ? " (locked this season)" : ""}</span>` : "";
      const alwaysOnTag = alwaysOn ? ` · <span class="season-lock-tag">🔁 Always on for everyone</span>` : "";
      let syncStatusText;
      if (b.id === "bee_swarm") {
        syncStatusText = active ? `Detected now — ${beeSwarmActiveCount} active across ${beeSwarmAffectedPlots} plot${beeSwarmAffectedPlots === 1 ? "" : "s"}` : "Auto-detected via farm sync";
      } else if (b.isDebuff) {
        const remSec = getLimitedBoostRemainingSec(b.limitedBoostName);
        const isProtected = !!calendarDebuffProtection[b.limitedBoostName];
        const lossPct = Math.round((b.debuffLossMult || .5) * 100);
        if (isProtected) syncStatusText = `🛡️ Protected — ${b.protectionItem} equipped, no plots lost`; else if (active && remSec > 0) syncStatusText = `⚠️ Active now — ~${lossPct}% of growing plots destroyed, ${formatDuration(remSec)} remaining (auto-detected, In Progress tab only)`; else syncStatusText = "Auto-detected via farm sync only — can't be toggled manually";
      } else if (isCalendarBoost) {
        const remSec = getLimitedBoostRemainingSec(b.limitedBoostName);
        if (active && remSec > 0) syncStatusText = `Active now — ${formatDuration(remSec)} remaining (auto-detected)`; else if (active) syncStatusText = "Manually enabled — next sync will override"; else syncStatusText = "Auto-detected via farm sync — tap to toggle manually anytime";
      } else {
        syncStatusText = active ? "Detected now" : "Auto-detected via farm sync";
      }
      const syncDetectedTag = syncDetected ? ` · <span class="season-lock-tag"><img src="${syncIconSrc}" style="width:12px;height:12px;vertical-align:-2px;image-rendering:pixelated;"> ${syncStatusText}</span>` : "";
      return `<div class="lib-item-row${locked ? " season-locked" : ""}${active ? " boost-active" : ""}" data-boost-id="${b.id}" style="cursor:${locked || alwaysOn || manualToggleBlocked ? "not-allowed" : "pointer"};${active ? "outline:2px solid var(--profit);" : ""}">\n        <span class="lib-item-icon">${locked ? "🔒" : alwaysOn ? "🔁" : syncDetected ? active ? `<img src="${syncIconSrc}" style="width:14px;height:14px;image-rendering:pixelated;">` : "⬜" : active ? "✅" : "⬜"}</span>\n        <div class="lib-item-main">\n          <div class="lib-item-name">${getBoostIcon(b.name)}${escapeHtml(b.name)}${targetTxt}</div>\n          <div class="lib-item-meta">${parts.join(" · ")}${groupTag}${seasonTag}${alwaysOnTag}${syncDetectedTag}${b.note ? " · " + escapeHtml(b.note) : ""}</div>\n          ${renderAoePlotsAffectedBlockForBoost(b)}\n        </div>\n      </div>`;
    }).join("") + "</div>";
  }).join("") || `<div class="lib-empty">No boosts match your search.</div>`) + (boostCategory === "tools" ? renderBaseStockTables() : "") + (boostCategory === "pets" && typeof renderPetLevelPerksBlock === "function" ? renderPetLevelPerksBlock() : "");
  wrap.querySelectorAll("[data-boost-id]").forEach(el => {
    const boostId = el.dataset.boostId;
    el.onclick = boostId.startsWith("apply_") ? () => toggleBoost(boostId) : () => draftToggleBoost(boostId);
  });
  wrap.querySelectorAll("[data-spice-master]").forEach(el => {
    el.onclick = () => toggleSpiceMaster(el.dataset.spiceMaster);
  });
  wrap.querySelectorAll("[data-spice-key][data-spice-type]").forEach(el => {
    el.onclick = () => toggleSpiceAnimal(el.dataset.spiceKey, el.dataset.spiceType);
  });
  wrap.querySelectorAll("[data-fert-tier]").forEach(el => {
    el.onclick = () => toggleFertilizerTier(el.dataset.fertTier);
  });
  const budSectionEl = document.getElementById("budSection");
  const animalBudSectionEl = document.getElementById("animalBudSection");
  const fruitBudSectionEl = document.getElementById("fruitBudSection");
  const cropBudSectionEl = document.getElementById("cropBudSection");
  const resourceBudSectionEl = document.getElementById("resourceBudSection");
  const fishBudSectionEl = document.getElementById("fishBudSection");
  if (budSectionEl) {
    if (boostCategory === "greenhouse") {
      budSectionEl.style.display = "";
      if (animalBudSectionEl) animalBudSectionEl.style.display = "none";
      if (fruitBudSectionEl) fruitBudSectionEl.style.display = "none";
      if (cropBudSectionEl) cropBudSectionEl.style.display = "none";
      if (resourceBudSectionEl) resourceBudSectionEl.style.display = "none";
      if (fishBudSectionEl) fishBudSectionEl.style.display = "none";
      renderBudList();
    } else if (boostCategory === "animals") {
      budSectionEl.style.display = "none";
      if (animalBudSectionEl) animalBudSectionEl.style.display = "";
      if (fruitBudSectionEl) fruitBudSectionEl.style.display = "none";
      if (cropBudSectionEl) cropBudSectionEl.style.display = "none";
      if (resourceBudSectionEl) resourceBudSectionEl.style.display = "none";
      if (fishBudSectionEl) fishBudSectionEl.style.display = "none";
      renderAnimalBudList();
    } else if (boostCategory === "fruits") {
      budSectionEl.style.display = "none";
      if (animalBudSectionEl) animalBudSectionEl.style.display = "none";
      if (fruitBudSectionEl) fruitBudSectionEl.style.display = "";
      if (cropBudSectionEl) cropBudSectionEl.style.display = "none";
      if (resourceBudSectionEl) resourceBudSectionEl.style.display = "none";
      if (fishBudSectionEl) fishBudSectionEl.style.display = "none";
      renderFruitBudList();
    } else if (boostCategory === "crops" || boostCategory === "cropmachine") {
      budSectionEl.style.display = "none";
      if (animalBudSectionEl) animalBudSectionEl.style.display = "none";
      if (fruitBudSectionEl) fruitBudSectionEl.style.display = "none";
      if (cropBudSectionEl) cropBudSectionEl.style.display = "";
      if (resourceBudSectionEl) resourceBudSectionEl.style.display = "none";
      if (fishBudSectionEl) fishBudSectionEl.style.display = "none";
      renderCropBudList();
    } else if (boostCategory === "resources") {
      budSectionEl.style.display = "none";
      if (animalBudSectionEl) animalBudSectionEl.style.display = "none";
      if (fruitBudSectionEl) fruitBudSectionEl.style.display = "none";
      if (cropBudSectionEl) cropBudSectionEl.style.display = "none";
      if (resourceBudSectionEl) resourceBudSectionEl.style.display = "";
      if (fishBudSectionEl) fishBudSectionEl.style.display = "none";
      renderResourceBudList();
    } else if (boostCategory === "fishing") {
      budSectionEl.style.display = "none";
      if (animalBudSectionEl) animalBudSectionEl.style.display = "none";
      if (fruitBudSectionEl) fruitBudSectionEl.style.display = "none";
      if (cropBudSectionEl) cropBudSectionEl.style.display = "none";
      if (resourceBudSectionEl) resourceBudSectionEl.style.display = "none";
      if (fishBudSectionEl) fishBudSectionEl.style.display = "";
      renderFishBudList();
    } else {
      budSectionEl.style.display = "none";
      if (animalBudSectionEl) animalBudSectionEl.style.display = "none";
      if (fruitBudSectionEl) fruitBudSectionEl.style.display = "none";
      if (cropBudSectionEl) cropBudSectionEl.style.display = "none";
      if (resourceBudSectionEl) resourceBudSectionEl.style.display = "none";
      if (fishBudSectionEl) fishBudSectionEl.style.display = "none";
    }
  }
}

function renderBudList() {
  const wrap = document.getElementById("budCreatedList");
  if (!wrap) return;
  if (!greenhouseBuds.length) {
    wrap.innerHTML = `<div class="lib-empty" style="margin-bottom:10px;">No BUD NFTs added yet.</div>`;
    return;
  }
  wrap.innerHTML = greenhouseBuds.map((bud, i) => {
    const typeName = (BUD_GREENHOUSE_TYPES.find(t => t.id === bud.typeId) || {}).name || "None";
    const stemName = (BUD_GREENHOUSE_STEMS.find(s => s.id === bud.stemId) || {}).name || "None";
    const auraName = (BUD_AURAS.find(a => a.id === bud.auraId) || {}).name || "No Aura";
    const summary = budSummaryText(bud.typeId, bud.stemId, bud.auraId);
    return `<div class="bud-row">\n      <div class="bud-row-main">\n        <div class="bud-row-title">Bud ${i + 1}<span class="bud-row-combo">${escapeHtml(typeName)} · ${escapeHtml(stemName)} · ${escapeHtml(auraName)}</span></div>\n        <div class="bud-row-effect">${escapeHtml(summary)}</div>\n      </div>\n      <button type="button" class="bud-remove-btn" data-bud-remove="${bud.id}" title="Remove this BUD">✕</button>\n    </div>`;
  }).join("");
  wrap.querySelectorAll("[data-bud-remove]").forEach(btn => {
    btn.onclick = () => removeBud(btn.dataset.budRemove);
  });
}

function renderAnimalBudList() {
  const wrap = document.getElementById("animalBudCreatedList");
  if (!wrap) return;
  if (!animalBuds.length) {
    wrap.innerHTML = `<div class="lib-empty" style="margin-bottom:10px;">No BUD NFTs added yet.</div>`;
    return;
  }
  wrap.innerHTML = animalBuds.map((bud, i) => {
    const typeName = (BUD_ANIMAL_TYPES.find(t => t.id === bud.typeId) || {}).name || "None";
    const stemName = (BUD_ANIMAL_STEMS.find(s => s.id === bud.stemId) || {}).name || "None";
    const auraName = (BUD_AURAS.find(a => a.id === bud.auraId) || {}).name || "No Aura";
    const summary = budAnimalSummaryText(bud.typeId, bud.stemId, bud.auraId);
    return `<div class="bud-row animal-bud-row">\n      <div class="bud-row-main">\n        <div class="bud-row-title">Bud ${i + 1}<span class="bud-row-combo">${escapeHtml(typeName)} · ${escapeHtml(stemName)} · ${escapeHtml(auraName)}</span></div>\n        <div class="bud-row-effect">${escapeHtml(summary)}</div>\n      </div>\n      <button type="button" class="bud-remove-btn" data-animal-bud-remove="${bud.id}" title="Remove this BUD">✕</button>\n    </div>`;
  }).join("");
  wrap.querySelectorAll("[data-animal-bud-remove]").forEach(btn => {
    btn.onclick = () => removeAnimalBud(btn.dataset.animalBudRemove);
  });
}

function renderFruitBudList() {
  const wrap = document.getElementById("fruitBudCreatedList");
  if (!wrap) return;
  if (!fruitBuds.length) {
    wrap.innerHTML = `<div class="lib-empty" style="margin-bottom:10px;">No BUD NFTs added yet.</div>`;
    return;
  }
  wrap.innerHTML = fruitBuds.map((bud, i) => {
    const typeName = (BUD_FRUIT_TYPES.find(t => t.id === bud.typeId) || {}).name || "None";
    const stemName = (BUD_FRUIT_STEMS.find(s => s.id === bud.stemId) || {}).name || "None";
    const auraName = (BUD_AURAS.find(a => a.id === bud.auraId) || {}).name || "No Aura";
    const summary = budFruitSummaryText(bud.typeId, bud.stemId, bud.auraId);
    return `<div class="bud-row fruit-bud-row">\n      <div class="bud-row-main">\n        <div class="bud-row-title">Bud ${i + 1}<span class="bud-row-combo">${escapeHtml(typeName)} · ${escapeHtml(stemName)} · ${escapeHtml(auraName)}</span></div>\n        <div class="bud-row-effect">${escapeHtml(summary)}</div>\n      </div>\n      <button type="button" class="bud-remove-btn" data-fruit-bud-remove="${bud.id}" title="Remove this BUD">✕</button>\n    </div>`;
  }).join("");
  wrap.querySelectorAll("[data-fruit-bud-remove]").forEach(btn => {
    btn.onclick = () => removeFruitBud(btn.dataset.fruitBudRemove);
  });
}

function renderCropBudList() {
  const wrap = document.getElementById("cropBudCreatedList");
  if (!wrap) return;
  if (!cropBuds.length) {
    wrap.innerHTML = `<div class="lib-empty" style="margin-bottom:10px;">No BUD NFTs added yet.</div>`;
    return;
  }
  wrap.innerHTML = cropBuds.map((bud, i) => {
    const typeName = (BUD_CROP_TYPES.find(t => t.id === bud.typeId) || {}).name || "None";
    const stemName = (BUD_CROP_STEMS.find(s => s.id === bud.stemId) || {}).name || "None";
    const auraName = (BUD_AURAS.find(a => a.id === bud.auraId) || {}).name || "No Aura";
    const summary = budFarmCropSummaryText(bud.typeId, bud.stemId, bud.auraId);
    return `<div class="bud-row crop-bud-row">\n      <div class="bud-row-main">\n        <div class="bud-row-title">Bud ${i + 1}<span class="bud-row-combo">${escapeHtml(typeName)} · ${escapeHtml(stemName)} · ${escapeHtml(auraName)}</span></div>\n        <div class="bud-row-effect">${escapeHtml(summary)}</div>\n      </div>\n      <button type="button" class="bud-remove-btn" data-crop-bud-remove="${bud.id}" title="Remove this BUD">✕</button>\n    </div>`;
  }).join("");
  wrap.querySelectorAll("[data-crop-bud-remove]").forEach(btn => {
    btn.onclick = () => removeCropBud(btn.dataset.cropBudRemove);
  });
}

function renderResourceBudList() {
  const wrap = document.getElementById("resourceBudCreatedList");
  if (!wrap) return;
  if (!resourceBuds.length) {
    wrap.innerHTML = `<div class="lib-empty" style="margin-bottom:10px;">No BUD NFTs added yet.</div>`;
    return;
  }
  wrap.innerHTML = resourceBuds.map((bud, i) => {
    const typeName = (BUD_RESOURCE_TYPES.find(t => t.id === bud.typeId) || {}).name || "None";
    const stemName = (BUD_RESOURCE_STEMS.find(s => s.id === bud.stemId) || {}).name || "None";
    const auraName = (BUD_AURAS.find(a => a.id === bud.auraId) || {}).name || "No Aura";
    const summary = budResourceSummaryText(bud.typeId, bud.stemId, bud.auraId);
    return `<div class="bud-row resource-bud-row">\n      <div class="bud-row-main">\n        <div class="bud-row-title">Bud ${i + 1}<span class="bud-row-combo">${escapeHtml(typeName)} · ${escapeHtml(stemName)} · ${escapeHtml(auraName)}</span></div>\n        <div class="bud-row-effect">${escapeHtml(summary)}</div>\n      </div>\n      <button type="button" class="bud-remove-btn" data-resource-bud-remove="${bud.id}" title="Remove this BUD">✕</button>\n    </div>`;
  }).join("");
  wrap.querySelectorAll("[data-resource-bud-remove]").forEach(btn => {
    btn.onclick = () => removeResourceBud(btn.dataset.resourceBudRemove);
  });
}

export function renderFishBudList() {
  const wrap = document.getElementById("fishBudCreatedList");
  if (!wrap) return;
  if (!fishBuds.length) {
    wrap.innerHTML = `<div class="lib-empty" style="margin-bottom:10px;">No BUD NFTs added yet.</div>`;
    return;
  }
  wrap.innerHTML = fishBuds.map((bud, i) => {
    const typeName = (BUD_FISH_TYPES.find(t => t.id === bud.typeId) || {}).name || "None";
    const auraName = (BUD_AURAS.find(a => a.id === bud.auraId) || {}).name || "No Aura";
    const summary = fishBudSummaryText(bud.typeId, bud.auraId);
    return `<div class="bud-row fish-bud-row">\n      <div class="bud-row-main">\n        <div class="bud-row-title">Bud ${i + 1}<span class="bud-row-combo">${escapeHtml(typeName)} · ${escapeHtml(auraName)}</span></div>\n        <div class="bud-row-effect">${escapeHtml(summary)}</div>\n      </div>\n      <button type="button" class="bud-remove-btn" data-fish-bud-remove="${bud.id}" title="Remove this BUD">✕</button>\n    </div>`;
  }).join("");
  wrap.querySelectorAll("[data-fish-bud-remove]").forEach(btn => {
    btn.onclick = () => removeFishBud(btn.dataset.fishBudRemove);
  });
}

function renderFertilizerTierScope() {
  const tiers = [ {
    tier: "Basic",
    emoji: "🎁",
    label: "Basic Crop"
  }, {
    tier: "Medium",
    emoji: "🥕",
    label: "Medium Crop"
  }, {
    tier: "Advanced",
    emoji: "🍇",
    label: "Advance Crop"
  } ];
  return `<div class="lib-section-title">🎚️ Level — which crop tiers can be fertilised?</div>\n  <div class="hint-collapsible"><button type="button" class="hint-q-btn" aria-label="More info">❓</button><div class="hint-slide"><div class="field-hint" style="background:#eef3fb;border:1.5px solid #3a6ea5;padding:8px 10px;border-radius:8px;margin-bottom:8px;font-weight:600;color:#20456b;">\n    Shared by Sprout Mix &amp; Rapid Root (see 🪱 Composter). Uncheck a tier to keep its crops completely untouched — no yield/time change and no fertiliser cost added — even while a fertiliser is switched on.\n    Greenhouse crops (Grape/Rice/Olive) never receive these two fertilisers in-game, so they're not listed here.\n  </div></div></div>\n  <div style="display:flex;gap:6px;margin-bottom:10px;flex-wrap:wrap;">\n    ${tiers.map(t => {
    const checked = isFertilizerTierEnabled(t.tier);
    return `<div class="lib-item-row" data-fert-tier="${t.tier}" style="cursor:pointer;flex:1;min-width:90px;margin:0;${checked ? "outline:2px solid var(--profit);" : ""}">\n        <span class="lib-item-icon">${checked ? "✅" : "⬜"}</span>\n        <div class="lib-item-main">\n          <div class="lib-item-name">${t.emoji} ${t.label || t.tier}</div>\n        </div>\n      </div>`;
  }).join("")}\n  </div>`;
}

function renderSaltFertilizerApplyToggles() {
  const items = [ {
    id: "apply_sproutroot_surprise",
    emoji: "🌳",
    label: "Sproutroot Surprise",
    desc: "+0.2 yield &amp; ×0.5 time on every Crop — combines Sprout Mix + Rapid Root · exclusive with both classic fertilisers below"
  }, {
    id: "apply_turbofruit_mix",
    emoji: "🧃",
    label: "Turbofruit Mix",
    desc: "+0.1 yield &amp; ×0.8 time on every Fruit tree — upgrade of Fruitful Blend · exclusive with it"
  }, {
    id: "apply_greenhouse_glow",
    emoji: "✨",
    label: "Greenhouse Glow",
    desc: "×0.8 grow time on Greenhouse crops (Rice/Grape/Olive) · exclusive with Greenhouse Goodie"
  }, {
    id: "apply_greenhouse_goodie",
    emoji: "🎀",
    label: "Greenhouse Goodie",
    desc: "+0.2 yield on Greenhouse crops (Rice/Grape/Olive) · exclusive with Greenhouse Glow"
  } ];
  return `<div class="lib-section-title">🧂 Salt Baits &amp; Fertilisers <span style="font-weight:400;color:var(--ink-soft);font-size:9.6px;">— upgrades from the Salt tab</span></div>\n  <div class="hint-collapsible"><button type="button" class="hint-q-btn" aria-label="More info">❓</button><div class="hint-slide"><div class="field-hint" style="background:#fdeee0;border:1.5px solid var(--sun-deep);padding:8px 10px;border-radius:8px;margin-bottom:8px;font-weight:600;color:#7a3d10;">\n    Off by default, same as the classic fertilisers below. These are <b>upgrades</b> made in 🧂 Salt → Fermentation Rack — turning\n    one on here automatically switches its classic counterpart off (and vice versa), since only one fertiliser can sit on a\n    plot/tree at a time. See the 🧂 Salt tab for their cost breakdown.\n  </div></div></div>\n  ${items.map(it => {
    const active = isBoostActive(it.id);
    return `<div class="lib-item-row" data-boost-id="${it.id}" style="cursor:pointer;${active ? "outline:2px solid var(--profit);" : ""}">\n      <span class="lib-item-icon">${active ? "✅" : "⬜"}</span>\n      <div class="lib-item-main">\n        <div class="lib-item-name">${getIcon(it.label)} ${it.label} <span style="font-weight:400;color:var(--ink-soft);">${active ? "— applying" : "— not applied"}</span></div>\n        <div class="lib-item-meta">${it.desc}</div>\n      </div>\n    </div>`;
  }).join("")}`;
}

function renderFertilizerApplyToggles() {
  const items = [ {
    id: "apply_sprout_mix",
    emoji: "🌱",
    label: "Sprout Mix",
    desc: "+0.2 flat yield on every Crop it's applied to (Compost Bin) · exclusive with Rapid Root &amp; Sproutroot Surprise"
  }, {
    id: "apply_rapid_root",
    emoji: "⏩",
    label: "Rapid Root",
    desc: "−50% grow time on every Crop it's applied to (Premium Composter) · exclusive with Sprout Mix &amp; Sproutroot Surprise"
  }, {
    id: "apply_fruitful_blend",
    emoji: "🍯",
    label: "Fruitful Blend",
    desc: "+0.1 yield per harvest on every Fruit tree it's applied to (Turbo Composter) · exclusive with Turbofruit Mix"
  } ];
  return renderFertilizerTierScope() + renderSaltFertilizerApplyToggles() + `<div class="lib-section-title">🪱 Apply Fertiliser to Crops / Fruits</div>\n  <div class="hint-collapsible"><button type="button" class="hint-q-btn" aria-label="More info">❓</button><div class="hint-slide"><div class="field-hint" style="background:#eef7ec;border:1.5px solid #4c8a4c;padding:8px 10px;border-radius:8px;margin-bottom:8px;font-weight:600;color:#2f5c2f;">\n    Off by default — nothing costs anything until you flip one on. Turn one on and its yield/time effect <b>and</b> its coin cost\n    (priced live off the ${previewSeason} composter recipe) show up automatically on every Crop or Fruit card below.\n    Heads up: in-game only one fertiliser sits on a plot at a time, so Sprout Mix and Rapid Root are exclusive here — turning\n    one on switches the other off.\n  </div></div></div>\n  ${items.map(it => {
    const active = isBoostActive(it.id);
    return `<div class="lib-item-row" data-boost-id="${it.id}" style="cursor:pointer;${active ? "outline:2px solid var(--profit);" : ""}">\n      <span class="lib-item-icon">${active ? "✅" : "⬜"}</span>\n      <div class="lib-item-main">\n        <div class="lib-item-name">${getIcon(it.label)} ${it.label} <span style="font-weight:400;color:var(--ink-soft);">${active ? "— applying" : "— not applied"}</span></div>\n        <div class="lib-item-meta">${it.desc}</div>\n      </div>\n    </div>`;
  }).join("")}`;
}

function renderSpiceRackAnimalToggles() {
  const durationHarvests = getSpiceLickDurationHarvests();
  const cards = [ {
    key: "saltLick",
    emoji: "🧡",
    name: "Salt Lick",
    effectLabel: "+5% Animal Produce Yield",
    desc: `Feed to an animal for +5% produce on the next ${durationHarvests} harvests.`
  }, {
    key: "honeyTreat",
    emoji: "🍯",
    name: "Honey Treat",
    effectLabel: "×0.75 Animal Feed",
    desc: `Feed to an animal for -25% feed on the next ${durationHarvests} harvests.`
  } ];
  const otherKey = k => k === "saltLick" ? "honeyTreat" : "saltLick";
  return `<div class="lib-section-title">🧡🍯 Salt Lick &amp; Honey Treat (per animal type)</div>\n  <div class="hint-collapsible"><button type="button" class="hint-q-btn" aria-label="More info">❓</button><div class="hint-slide"><div class="field-hint" style="background:#eef2fb;border:1.5px solid #3d5a8a;padding:8px 10px;border-radius:8px;margin-bottom:8px;font-weight:600;color:#233a5c;">\n    Off by default. Turn one on, then tick which animal types get it — cost is priced live off the 🥫 Spice Rack (Refined Salt / Honey), scaled by how many heads of that type you've entered, and spread across the ${durationHarvests} harvests one item lasts${durationHarvests > 3 ? " (doubled from 3 by Vibraphone)" : ""}.\n    An animal can only carry ONE of these at a time, so ticking Honey Treat for Chickens after Salt Lick was already on for Chickens switches Salt Lick off for Chickens (other types are unaffected).\n  </div></div></div>\n  ${cards.map(c => {
    const state = spiceUsage[c.key];
    const perUse = getSpiceCostPerUseFlower(c.key);
    return `<div class="lib-item-row" data-spice-master="${c.key}" style="cursor:pointer;${state.active ? "outline:2px solid var(--profit);" : ""}">\n      <span class="lib-item-icon">${state.active ? "✅" : "⬜"}</span>\n      <div class="lib-item-main">\n        <div class="lib-item-name">${getIcon(c.name)} ${c.name} <span style="font-weight:400;color:var(--ink-soft);">${state.active ? "— enabled" : "— disabled"}</span></div>\n        <div class="lib-item-meta">${c.effectLabel} · ${c.desc}</div>\n        <div class="lib-item-meta" style="color:var(--sun-deep);font-weight:700;">${fmt(perUse)} ${FLOWER_ICON} FLOWER / item (live) · lasts ${durationHarvests} harvests</div>\n      </div>\n    </div>\n    ${state.active ? `<div style="margin:0 0 10px 10px;padding-left:10px;border-left:2px dashed var(--line);">\n      ${SPICE_ANIMAL_TYPES.map(type => {
      const cfg = ANIMAL_DATA[type];
      const on = state[type];
      const otherOn = spiceUsage[otherKey(c.key)][type];
      const headCost = getSpiceHeadCost(c.key, type);
      const heads = getAnimalCount(type).qty || 0;
      return `<div class="lib-item-row" data-spice-key="${c.key}" data-spice-type="${type}" style="cursor:pointer;${on ? "outline:2px solid var(--profit);" : ""}">\n          <span class="lib-item-icon">${on ? "✅" : "⬜"}</span>\n          <div class="lib-item-main">\n            <div class="lib-item-name">${getIcon(cfg.label)} ${cfg.label}${otherOn ? ` <span style="font-weight:400;color:var(--ink-soft);">(currently on ${c.key === "saltLick" ? "Honey Treat" : "Salt Lick"} — will switch)</span>` : ""}</div>\n            <div class="lib-item-meta">${heads > 0 ? `${fmt(heads)} heads × ${fmt(perUse / durationHarvests)} F/cycle = ${fmt(headCost)} ${FLOWER_ICON} FLOWER/cycle` : `No heads entered yet — set in Plots &amp; Nodes`}</div>\n          </div>\n        </div>`;
    }).join("")}\n    </div>` : ""}`;
  }).join("")}`;
}

function composterItemChip(item, qty) {
  return `<span style="display:inline-flex;align-items:center;gap:3px;white-space:nowrap;">${getIcon(item)} ${fmt(qty)}× ${escapeHtml(item)}</span>`;
}

function renderComposterSeasonSection(name, outputQty) {
  const blocks = SEASON_ORDER.map(season => {
    const list = SEASON_COMPOST_REQUIREMENTS[season] && SEASON_COMPOST_REQUIREMENTS[season][name] || [];
    let total = 0;
    const rows = list.map(r => {
      const unit = getItemCostByName(r.item, new Set);
      const lineCost = (r.qty || 0) * unit;
      total += lineCost;
      return `<div class="lib-item-row">
        <span class="lib-item-icon">${getIcon(r.item)}</span>
        <div class="lib-item-main">
          <div class="lib-item-name">${escapeHtml(r.item)}</div>
          <div class="lib-item-meta">${fmt(r.qty)}× ${fmt(unit)}${COIN_ICON} = ${fmt(lineCost)}${COIN_ICON}</div>
        </div>
      </div>`;
    }).join("");
    const perUnit = outputQty > 0 ? total / outputQty : 0;
    const selectedTag = season === previewSeason ? ` <span style="font-weight:600;color:var(--ink-soft);font-size:10px;">(selected)</span>` : "";
    return `<div class="lib-cycle-container composter-season-card" style="padding-bottom:8px;">
      <div class="lib-section-title" style="display:flex;align-items:center;justify-content:flex-start;gap:6px;margin-top:0;">${SEASON_EMOJI[season] || ""} <span>${season}</span>${selectedTag}</div>
      ${rows || `<div class="lib-item-meta">—</div>`}
      <div class="lib-item-meta" style="margin:2px 0 0;font-weight:700;">${fmt(total)}${COIN_ICON} / cycle · ${fmt(perUnit)}${COIN_ICON} per ${escapeHtml(BASE_COMPOSTERS[name].fertilizer)}</div>
    </div>`;
  }).join("");
  return `<div class="lib-section-title" style="margin-top:10px;">Ingredients per season</div>${blocks}`;
}

function renderComposterCard(name) {
  const d = BASE_COMPOSTERS[name];
  const fig = computeComposterFigures(name);
  const isExpanded = expandedComposters.has(name);
  const reqLine = fig.reqs.length ? `<span style="display:flex;flex-wrap:wrap;align-items:center;gap:2px 6px;">${fig.reqs.map(r => composterItemChip(r.item, r.qty)).join("<span>+</span>")}</span>` : "—";
  const boostListHtml = renderBoostAppliedList(fig.activeBoosts, name);
  const timeChanged = Math.round(fig.timeVal) !== Math.round(d.timeSec);
  const fertIcon = getIcon(fig.fertilizer);
  return `\n  <div class="card${isExpanded ? " expanded" : ""}" data-search="${name.toLowerCase()}">\n    <div class="card-toggle">\n      <div class="card-name-row">\n        <span class="card-icon">${getIcon(name) || "🪱"}</span>\n        <div>\n          <div class="card-name">${name} <span class="tier-tag" style="background:#ddd;color:#555;">Not tradable</span></div>\n          <div class="card-type">${fmt(fig.costPerUnitCoins)}${COIN_ICON} per ${fertIcon} ${fig.fertilizer}</div>\n        </div>\n      </div>\n      <div class="card-collapsed-profit">\n        ${fig.activeBoosts.length ? `<span class="boost-badge">⚡${fig.activeBoosts.length}</span>` : ""}\n        <span class="pvalue-mini">${fmt(fig.outputQty)}× ${fertIcon} ${fig.fertilizer}</span>\n        <span class="chev">▾</span>\n      </div>\n    </div>\n    <div class="card-details">\n      <div class="card-grid">\n        <div class="stat"><span class="label">${previewSeason} Requirements</span><span class="value">${reqLine}</span></div>\n        <div class="stat"><span class="label">Ingredient cost</span><span class="value">${fmt(fig.ingredientCostCoins)}${COIN_ICON} / cycle</span></div>\n        <div class="stat"><span class="label">Output</span><span class="value">${fertIcon} ${fmt(fig.outputQty)}× ${fig.fertilizer}</span></div>\n        <div class="stat"><span class="label">Time</span><span class="value">${formatDuration(fig.timeVal)}${timeChanged ? ` <span style="color:var(--ink-soft);font-weight:600;">(${formatDuration(d.timeSec)} base)</span>` : ""}</span></div>\n        <div class="stat"><span class="label">Worms (bait)</span><span class="value">${getIcon(fig.wormName)} ~${fmt(fig.wormAvg)}× ${fig.wormName}</span></div>\n      </div>\n      ${boostListHtml}\n      <div class="profit-banner">\n        <span class="plabel">Cost per fertiliser</span>\n        <span><span class="pvalue">${fmt(fig.costPerUnitCoins)}${COIN_ICON}</span></span>\n      </div>\n      <div style="font-size:9.6px;color:var(--ink-soft);margin-top:4px;">Turn ${fig.fertilizer} on in ⚡ Boost Settings → 🪱 Composter to apply it (and its cost) to ${name === "Turbo Composter" ? "Fruit" : "Crop"} cards.</div>\n      ${renderComposterSeasonSection(name, fig.outputQty)}\n    </div>\n  </div>`;
}

export function renderComposterList() {
  const wrap = $("composterItemList");
  if (!wrap) return;
  withPreservedCardScrolls(wrap, () => {
    wrap.innerHTML = Object.keys(BASE_COMPOSTERS).map(renderComposterCard).join("");
  });
  wrap.querySelectorAll(".card-toggle").forEach(el => {
    el.onclick = () => {
      const card = el.closest(".card");
      const name = card.dataset.search;
      const match = Object.keys(BASE_COMPOSTERS).find(n => n.toLowerCase() === name) || name;
      if (expandedComposters.has(match)) expandedComposters.delete(match); else expandedComposters.add(match);
      card.classList.toggle("expanded");
    };
  });
}

function renderBaseStockTables() {
  function table(title, data, kind, icon) {
    const rows = Object.keys(data).map(name => {
      const base = data[name];
      const boosted = computeBoostedStock(base, kind, name);
      const changed = Math.abs(boosted - base) > .001;
      const itemIcon = IMAGE_ICONS[name] ? getIcon(name) : icon;
      return `<div class="lib-item-row" style="padding:5px 8px;">\n        <span class="lib-item-icon" style="font-size:15.6px;">${itemIcon}</span>\n        <div class="lib-item-main">\n          <div class="lib-item-name" style="font-size:12.6px;">${escapeHtml(name)}</div>\n        </div>\n        <div style="text-align:right;font-weight:700;font-size:12.6px;">${fmt(boosted)}${changed ? ` <span style="color:var(--ink-soft);font-weight:600;font-size:10.2px;">(${fmt(base)} base)</span>` : ""}</div>\n      </div>`;
    }).join("");
    return `<div class="lib-section-title">${title}</div>${rows}`;
  }
  function flowerTable(title) {
    const rows = Object.keys(BASE_STOCK_FLOWERS).map(name => {
      const base = BASE_STOCK_FLOWERS[name];
      const boosted = computeBoostedStock(base, "seed", name);
      const changed = Math.abs(boosted - base) > .001;
      const itemIcon = IMAGE_ICONS[name + " Seed"] ? getIcon(name + " Seed") : FLOWER_SEED_ICONS[name] || "🌱";
      return `<div class="lib-item-row" style="padding:5px 8px;">\n        <span class="lib-item-icon" style="font-size:15.6px;">${itemIcon}</span>\n        <div class="lib-item-main">\n          <div class="lib-item-name" style="font-size:12.6px;">${escapeHtml(name)}</div>\n        </div>\n        <div style="text-align:right;font-weight:700;font-size:12.6px;">${fmt(boosted)}${changed ? ` <span style="color:var(--ink-soft);font-weight:600;font-size:10.2px;">(${fmt(base)} base)</span>` : ""}</div>\n      </div>`;
    }).join("");
    return `<div class="lib-section-title">${title}</div>${rows}`;
  }
  return `\n    <div style="margin-top:10px;border-top:2px dashed var(--line);padding-top:8px;">\n      <div class="lib-section-title" style="font-size:13.2px;">📦 Base Restock Stocks <span style="font-weight:400;color:var(--ink-soft);">(current cap, live with boosts above)</span></div>\n      ${table("🌱 Crops", BASE_STOCK_CROPS, "seed", "🌱")}\n      ${table("🍎 Fruits", BASE_STOCK_FRUITS, "seed", "🍎")}\n      ${table("🍇 Greenhouse", BASE_STOCK_GREENHOUSE, "seed", "🍇")}\n      ${flowerTable("🌷 Flowers")}\n      ${table("🔨 Tools", BASE_STOCK_TOOLS, "tool", "🔨")}\n      <div class="setting-hint" style="margin-top:6px;">Restock costs: Seeds (Crops/Fruits/Greenhouse/Flowers) = 15 Gems · Tools = 10 Gems · All = 20 Gems. This feeds directly into each item's 24h profit calc as a restock cost.</div>\n    </div>`;
}

function renderRcmTabs() {
  const wrap = $("rcmTabs");
  if (!wrap) return;
  wrap.innerHTML = RESTOCK_PANEL_CATEGORIES.map(cat => `<button type="button" class="rcm-tab${cat.key === rcmActiveTab ? " active" : ""}" data-cat="${cat.key}">${cat.iconHtml || getIcon(cat.iconItem)} ${cat.label}</button>`).join("");
  wrap.querySelectorAll(".rcm-tab").forEach(btn => {
    btn.onclick = () => {
      __set_rcmActiveTab(btn.dataset.cat);
      renderRcmTabs();
      renderRcmList();
    };
  });
}

function renderRcmList() {
  const wrap = $("rcmList");
  if (!wrap) return;
  const cat = RESTOCK_PANEL_CATEGORIES.find(c => c.key === rcmActiveTab) || RESTOCK_PANEL_CATEGORIES[0];
  const items = cat.items || [];
  wrap.innerHTML = items.length ? items.map(name => {
    const iconHtml = FLOWER_SEEDS[name] ? IMAGE_ICONS[name + " Seed"] ? getIcon(name + " Seed") : FLOWER_SEED_ICONS[name] || "🌱" : getIcon(name);
    return `\n    <div class="rcm-item-row" data-name="${escapeHtml(name)}">\n      <span class="rcm-item-icon">${iconHtml}</span>\n      <span class="rcm-item-name">${escapeHtml(name)}</span>\n      <input type="checkbox" class="rcm-item-check" data-name="${escapeHtml(name)}" ${rcmPendingExcluded.has(name) ? "" : "checked"}>\n    </div>`;
  }).join("") : `<div class="lib-empty">No items in this category.</div>`;
  wrap.querySelectorAll(".rcm-item-check").forEach(chk => {
    chk.onchange = () => {
      const n = chk.dataset.name;
      if (chk.checked) rcmPendingExcluded.delete(n); else rcmPendingExcluded.add(n);
      updateRcmUnsavedNote();
    };
  });
}

export function updateRcmToggleUI() {
  const sharedInput = $("rcmSharedSwitchInput");
  const individualInput = $("rcmIndividualSwitchInput");
  const panel = $("rcmPanel");
  const hint = $("rcmHint");
  if (!sharedInput || !individualInput) return;
  const isShared = restockCostMode === "shared";
  sharedInput.checked = isShared;
  individualInput.checked = !isShared;
  if (panel) panel.style.display = "block";
  if (hint) hint.textContent = isShared ? "Shared Cost (default): the restock Gem cost and any active Shrine's daily cost for Seeds is split evenly across every included seed/crop below — uncheck an item and hit Save to exclude it from the shared pool. Tools always share their restock Gem cost across every included tool below, regardless of this toggle." : "Individual Cost: Seeds — the full restock/Shrine cost is charged entirely to that single seed/crop. Tools always share their restock Gem cost across every included tool below, regardless of this toggle.";
  renderRcmTabs();
  renderRcmList();
  updateRcmUnsavedNote();
  if (typeof updateCalcRcmToggleUI === "function") updateCalcRcmToggleUI();
}

setTimeout(updateRcmToggleUI, 0);

export function openRcmInfoModal() {
  $("rcmInfoOverlay").classList.add("show");
}

export function closeRcmInfoModal() {
  $("rcmInfoOverlay").classList.remove("show");
}

const closeRcmInfoModalBtn = $("closeRcmInfoModal");

if (closeRcmInfoModalBtn) closeRcmInfoModalBtn.onclick = closeRcmInfoModal;

function loadPeteGuideImages() {
  document.querySelectorAll("#peteGuideBody img[data-pete-guide-img]").forEach(img => {
    const src = PETE_GUIDE_IMAGES[Number(img.getAttribute("data-pete-guide-img"))];
    if (src && img.getAttribute("src") !== src) img.setAttribute("src", src);
  });
}

export function openPeteGuideModal() {
  const overlay = $("peteGuideOverlay");
  if (!overlay) return;
  loadPeteGuideImages();
  overlay.classList.add("show");
}

export function closePeteGuideModal() {
  const overlay = $("peteGuideOverlay");
  if (overlay) overlay.classList.remove("show");
}

document.addEventListener("click", e => {
  if (e.target.closest("[data-pete-guide-trigger]")) {
    openPeteGuideModal();
    return;
  }
  if (e.target.closest("#peteGuideCloseBtn")) {
    closePeteGuideModal();
    return;
  }
  if (e.target && e.target.id === "peteGuideOverlay") {
    closePeteGuideModal();
    return;
  }
});

document.addEventListener("click", e => {
  if (!$("settingsPanel").contains(e.target)) $("settingsMovedHint").classList.remove("show");
});

let __costNetInfoSeq = 0;
const __costNetInfoRegistry = {};

function registerCostNetInfo(html) {
  const id = String(++__costNetInfoSeq);
  __costNetInfoRegistry[id] = html;
  const keys = Object.keys(__costNetInfoRegistry);
  if (keys.length > 300) delete __costNetInfoRegistry[keys[0]];
  return id;
}

function getLegendaryShrineIconHtml() {
  return `<img src="${IMAGE_ICONS["Legendary Shrine"]}" alt="Shrine" style="width:14px;height:14px;vertical-align:-2px;image-rendering:pixelated;">`;
}

function buildCostNetBreakdownHtml(opts) {
  opts = opts || {};
  const gross = opts.gross || 0;
  const baseCost = opts.baseCost || 0;
  const restockCost = opts.restockCost || 0;
  const shrineCost = opts.shrineCost || 0;
  const shrineNames = opts.shrineNames || [];
  const shrineDetails = opts.shrineDetails || [];
  const restockDetails = opts.restockDetails || null;
  const sellFee = opts.sellFee || 0;
  const net = opts.net != null ? opts.net : gross - baseCost - restockCost - shrineCost - sellFee;
  const totalYield = opts.totalYield;
  const yieldLabelPlain = opts.yieldLabel ? String(opts.yieldLabel).replace(/<[^>]+>/g, "") : "";
  const hasYield = totalYield != null && totalYield > 1e-9;
  const avgPrice = hasYield ? gross / totalYield : null;
  const costPerUnit = hasYield ? baseCost / totalYield : null;
  const feePct = gross > 1e-9 ? sellFee / gross * 100 : 0;
  const section = (icon, label, body, explain) => `\n    <div class="cost-net-section">\n      <div class="cost-net-section-header"><span class="cost-net-section-label">${icon} ${label}</span></div>\n      <div class="cost-net-section-body">${explain ? `<div class="cost-net-section-explain">${explain}</div>` : ""}${body}</div>\n    </div>`;
  const subrow = (label, value) => `<div class="cost-net-subrow"><span>${label}</span><span>${value}</span></div>`;
  const subrowX = (label, value, note, chain) => `<div class="cost-net-subrow-group"><div class="cost-net-subrow"><span>${label}</span><span>${value}</span></div>${note ? `<div class="cost-net-subrow-explain">${note}</div>` : ""}${chain ? `<div class="cost-net-subrow-chain">${chain}</div>` : ""}</div>`;

  const grossExplain = "This is your total sale value before anything is subtracted.";
  const grossBody = hasYield ? `<div class="cost-net-calc-line"><span>Total Yield</span><span>${fmt(totalYield)}${yieldLabelPlain ? ` ${escapeHtml(yieldLabelPlain)}` : ""}</span></div><div class="cost-net-calc-line"><span>Avg. Sell Price / unit</span><span>${fmt(avgPrice)} ${FLOWER_ICON}</span></div><div class="cost-net-calc-formula">${fmt(totalYield)} × ${fmt(avgPrice)} ${FLOWER_ICON} = <b>${fmt(gross)} ${FLOWER_ICON}</b></div>` : `<div class="cost-net-calc-formula">Total sale value before any deductions = <b>${fmt(gross)} ${FLOWER_ICON}</b></div>`;

  let costLines = "";
  if (opts.otherCostItems && opts.otherCostItems.length) {
    costLines += opts.otherCostItems.map(item => `<div class="cost-net-calc-line"><span>${item.label}${item.note ? ` <span class="cost-net-note">(${item.note})</span>` : ""}</span><span>-${fmt(item.value)} ${FLOWER_ICON}</span></div>`).join("");
  }
  if (opts.feedCostFlower != null) {
    costLines += `<div class="cost-net-calc-line"><span>${opts.feedIcon || ""} Feed Cost</span><span>-${fmt(opts.feedCostFlower)} ${FLOWER_ICON}</span></div>`;
  }
  const costLabel = opts.costSectionLabel || "Total Cost";
  const costExplain = `Everything it costs to produce this yield, before restocking, Shrines, or the sell fee are added in.`;
  const unitCostChain = opts.unitCost != null && hasYield ? `<div class="cost-net-calc-line"><span>Cost / Unit</span><span>${fmt(opts.unitCost)} ${FLOWER_ICON}</span></div><div class="cost-net-calc-line"><span>Total Yield</span><span>${fmt(totalYield)}${yieldLabelPlain ? ` ${escapeHtml(yieldLabelPlain)}` : ""}</span></div><div class="cost-net-calc-formula">${fmt(opts.unitCost)} ${FLOWER_ICON} × ${fmt(totalYield)}${yieldLabelPlain ? ` ${escapeHtml(yieldLabelPlain)}` : ""} = <b>${costLabel} = -${fmt(baseCost)} ${FLOWER_ICON}</b></div>` : `<div class="cost-net-calc-formula">${costLabel} = <b>-${fmt(baseCost)} ${FLOWER_ICON}</b></div>`;
  const costPerUnitChain = costPerUnit != null ? `<div class="cost-net-calc-formula">Cost per unit = ${fmt(baseCost)} ${FLOWER_ICON} ÷ ${fmt(totalYield)}${yieldLabelPlain ? ` ${escapeHtml(yieldLabelPlain)}` : ""} = <b>${fmt(costPerUnit)} ${FLOWER_ICON}/unit</b></div>` : "";
  const costBody = `${costLines}${unitCostChain}${costPerUnitChain}`;

  let restockBody;
  let restockExplain = "";
  if (restockCost > 0 && restockDetails) {
    const kind = restockDetails.stockKind === "tool" ? "tool" : "seed";
    const noun = kind === "tool" ? "tool" : "seed";
    const shareCount = typeof getSharedPoolDivisor === "function" ? getSharedPoolDivisor(kind) : 1;
    const poolInfo = typeof getSharedPoolBreakdown === "function" ? getSharedPoolBreakdown(kind) : null;
    const itemCategory = kind === "tool" ? "tool" : typeof getSeedPoolCategoryForName === "function" ? getSeedPoolCategoryForName(restockDetails.name) : null;
    const ratio = typeof flowerPerGem === "function" ? flowerPerGem() : 0;
    const gemCostPerRestock = restockDetails.gemCostPerRestock || 0;
    const isDayMode = restockDetails.restocksPerDay != null;
    const restocksNeeded = isDayMode ? restockDetails.restocksPerDay || 0 : restockDetails.restocksNeeded || 0;
    const gemsTotal = isDayMode ? restockDetails.gemsPerDay || 0 : restockDetails.gemsTotal || 0;
    const itemsNeeded = isDayMode ? restockDetails.itemsNeededPerDay : restockDetails.itemsNeeded;
    const stockPerRestock = restockDetails.boostedStock;
    const needLabel = isDayMode ? "Restocks needed per day" : "Restocks needed for this yield";
    const spentLabel = isDayMode ? "Gems spent per day" : "Gems spent for this yield";
    const forThis = isDayMode ? "per day" : "for this yield";
    restockExplain = `Restocking pulls from a shared pool that's shared across every ${noun} type, so what you pay is only your ${noun}'s slice of the whole restock — walked out row by row below.`;

    const needChain = itemsNeeded != null && stockPerRestock ? `${fmt(itemsNeeded)} ${noun}${itemsNeeded === 1 ? "" : "s"} needed ${forThis} ÷ ${fmt(stockPerRestock)} ${noun}${stockPerRestock === 1 ? "" : "s"} refilled per restock = <b>${fmt(restocksNeeded)} restock${restocksNeeded === 1 ? "" : "s"}</b>` : "";
    const needExplain = `How many restock batches it takes to cover this ${isDayMode ? "day" : "yield"}. ${restockCostMode === "individual" ? `Restocks are whole numbers in 24HR mode, so any part of a restock counts as a full one.` : `It's a fraction because you're using less than one full restock batch worth of ${noun}s here — not draining a whole restock, just a share of one.`}${stockPerRestock ? ` One restock refills ${fmt(stockPerRestock)} ${noun}${stockPerRestock === 1 ? "" : "s"} for this ${noun} (its market stock, after any boosts).` : ""}`;

    let poolCategoryLine = "";
    if (poolInfo && poolInfo.categories && poolInfo.categories.length > 1) {
      poolCategoryLine = poolInfo.categories.map(c => `${fmt(c.total - c.excluded)} ${c.label}${c.total - c.excluded === 1 ? "" : "s"}${c.excluded > 0 ? ` <span class="cost-net-note">(${fmt(c.excluded)} excluded)</span>` : ""}`).join(" + ") + ` = <b>${fmt(shareCount)} ${noun}${shareCount === 1 ? "" : "s"}</b>`;
    } else if (poolInfo) {
      poolCategoryLine = poolInfo.excluded > 0 ? `${fmt(poolInfo.total)} ${noun}${poolInfo.total === 1 ? "" : "s"} tracked in the shared pool − ${fmt(poolInfo.excluded)} excluded ${poolInfo.excluded === 1 ? noun : `${noun}s`} = <b>${fmt(shareCount)} ${noun}${shareCount === 1 ? "" : "s"}</b>` : `${fmt(poolInfo.total)} ${noun}${poolInfo.total === 1 ? "" : "s"} are tracked in the shared pool = <b>${fmt(shareCount)} ${noun}${shareCount === 1 ? "" : "s"}</b>`;
    }
    const whichLine = itemCategory && itemCategory !== "tool" ? `<div class="cost-net-calc-line"><span>This item (${escapeHtml(restockDetails.name || "")}) is a</span><span>${itemCategory}</span></div>` : "";
    const poolExplain = `${noun[0].toUpperCase()}${noun.slice(1)} restocking pulls from a shared pool of ${fmt(shareCount)} different ${noun} types${poolInfo && poolInfo.categories && poolInfo.categories.length > 1 ? " — crops, fruits, and greenhouse seeds all share the same pool" : ""}. One Gem restock refills the whole pool at once, not just this ${noun}.`;
    const poolChain = `${whichLine}${poolCategoryLine}`;

    const baseRestockPrice = shareCount > 0 ? gemCostPerRestock * shareCount : gemCostPerRestock;
    const gemCostExplain = `The flat Gem price of one restock cycle for this type is set by your <b>Gem Restock Strategy</b> setting (Settings panel — 15 Gems for Seeds, 10 for Tools, or 20 combined for All), then split evenly across the ${fmt(shareCount)} ${noun} types in the shared pool — this ${noun}'s "fair share" of one restock.`;
    const gemCostChain = `${fmt(baseRestockPrice)} ${GEM_ICON} full restock price ÷ ${fmt(shareCount)} ${noun}${shareCount === 1 ? "" : "s"} = <b>${fmt(gemCostPerRestock)} ${GEM_ICON}</b>`;

    const ratioExplain = `Gems aren't FLOWER — you'd normally buy Gems with FLOWER (or earn them). This ratio comes from your <b>Gem purchase reference</b> setting (Settings panel: "Spent ___ FLOWER for ___ Gems") and is used to convert Gems into a FLOWER-equivalent cost.`;
    const ratioChain = `${fmt(gemFlowerSpent)} ${FLOWER_ICON} spent ÷ ${fmt(gemsReceived)} ${GEM_ICON} received = <b>${fmt(ratio)} ${FLOWER_ICON} per ${GEM_ICON}</b>`;

    restockBody = `${subrowX(needLabel, `${fmt(restocksNeeded)} restock${restocksNeeded === 1 ? "" : "s"}`, needExplain, needChain)}${subrowX(`Shared across (your ${noun} pool)`, `${fmt(shareCount)} ${noun}${shareCount === 1 ? "" : "s"}`, poolExplain, poolChain)}${subrowX(`Gem cost / ${noun} restock`, `${fmt(gemCostPerRestock)} ${GEM_ICON}`, gemCostExplain, gemCostChain)}${subrowX(spentLabel, `${fmt(gemsTotal)} ${GEM_ICON}`, `Restocks needed × Gem cost per restock — this is the actual Gem cost ${forThis}.`, `${fmt(restocksNeeded)} restock${restocksNeeded === 1 ? "" : "s"} × ${fmt(gemCostPerRestock)} ${GEM_ICON} = <b>${fmt(gemsTotal)} ${GEM_ICON}</b>`)}${subrowX("Gem → FLOWER ratio", `1 ${GEM_ICON} = ${fmt(ratio)} ${FLOWER_ICON}`, ratioExplain, ratioChain)}<div class="cost-net-calc-formula">${fmt(gemsTotal)} ${GEM_ICON} × ${fmt(ratio)} = <b>-${fmt(restockCost)} ${FLOWER_ICON}</b></div><div class="cost-net-subrow-explain" style="margin-top:4px;">Converts your Gem cost into FLOWER, giving the Restock Cost shown on the card.</div>`;
  } else if (restockCost > 0) {
    restockExplain = `Gems (or other materials) spent keeping this restocked, converted to their FLOWER-equivalent cost.`;
    restockBody = `<div class="cost-net-calc-formula">Gems/materials spent restocking for this yield = <b>-${fmt(restockCost)} ${FLOWER_ICON}</b></div>${opts.restockNote ? `<div class="cost-net-note" style="margin-top:2px;">${opts.restockNote}</div>` : ""}`;
  } else {
    restockBody = `<div class="cost-net-calc-formula">No restock needed for this amount = <b>0 ${FLOWER_ICON}</b></div>`;
  }

  let shrineBody;
  let shrineExplain = "";
  if (shrineCost > 0 && shrineDetails.length) {
    shrineExplain = `Daily Shrine upkeep, split across everything it affects, then applied to this projection.`;
    shrineBody = shrineDetails.map(sh => {
      const shareCount = sh.shareCount || 1;
      const dailyCostPostShare = sh.dailyCostPostShare != null ? sh.dailyCostPostShare : sh.dailyCost;
      const perCycle = sh.perCycleContribution != null ? sh.perCycleContribution : dailyCostPostShare;
      return `<div class="cost-net-shrine-block">
        <div class="cost-net-shrine-name">${getBoostIcon(sh.name) || getLegendaryShrineIconHtml()} ${escapeHtml(sh.name)}</div>
        ${subrowX("Total Shrine Cost", `${fmt(sh.totalCost)} ${FLOWER_ICON}`, "The full FLOWER cost of activating this Shrine.")}
        ${subrowX("Duration", `${fmt(sh.durationDays)} day${sh.durationDays === 1 ? "" : "s"}`, "How long the Shrine's effect lasts before it needs re-activating.")}
        ${subrowX("Daily Cost (before sharing)", `${fmt(sh.dailyCostPreShare)} ${FLOWER_ICON}/day`, "Total Shrine Cost ÷ Duration.", `${fmt(sh.totalCost)} ${FLOWER_ICON} ÷ ${fmt(sh.durationDays)} day${sh.durationDays === 1 ? "" : "s"} = <b>${fmt(sh.dailyCostPreShare)} ${FLOWER_ICON}/day</b>`)}
        ${subrowX("Shared across", `${fmt(shareCount)} item${shareCount === 1 ? "" : "s"}`, "Every item this Shrine boosts splits the daily cost evenly.")}
        ${subrowX("Daily Cost (your share)", `${fmt(dailyCostPostShare)} ${FLOWER_ICON}/day`, "Daily Cost (before sharing) ÷ items sharing it.", `${fmt(sh.dailyCostPreShare)} ${FLOWER_ICON}/day ÷ ${fmt(shareCount)} = <b>${fmt(dailyCostPostShare)} ${FLOWER_ICON}/day</b>`)}
        <div class="cost-net-calc-formula">Applied to this card = <b>-${fmt(perCycle)} ${FLOWER_ICON}</b></div>
      </div>`;
    }).join("");
  } else if (shrineCost > 0) {
    shrineExplain = `Daily upkeep from active Shrines applied to this card.`;
    shrineBody = `<div class="cost-net-calc-formula">Daily upkeep from ${shrineNames.length ? escapeHtml(shrineNames.join(", ")) : "active Shrine(s)"} = <b>-${fmt(shrineCost)} ${FLOWER_ICON}</b></div>`;
  } else {
    shrineBody = `<div class="cost-net-calc-formula">No active Shrine affecting this = <b>0 ${FLOWER_ICON}</b></div>`;
  }

  const feeExplain = sellFee > 0 ? `The Marketplace's cut, taken off the top of your Gross.` : "";
  const feeBody = sellFee > 0 ? `<div class="cost-net-calc-line"><span>Gross</span><span>${fmt(gross)} ${FLOWER_ICON}</span></div><div class="cost-net-calc-line"><span>Sell Fee %</span><span>${fmt(feePct)}%</span></div><div class="cost-net-calc-formula">${fmt(gross)} × ${fmt(feePct)}% = <b>-${fmt(sellFee)} ${FLOWER_ICON}</b></div>` : `<div class="cost-net-calc-formula">No sell fee applies here = <b>0 ${FLOWER_ICON}</b></div>`;

  const netBody = `
    <div class="cost-net-subrow"><span>Gross</span><span>${fmt(gross)} ${FLOWER_ICON}</span></div>
    <div class="cost-net-net-minus-label">− (minus)</div>
    <ul class="cost-net-net-list">
      <li><span>${costLabel}</span><span>${fmt(baseCost)} ${FLOWER_ICON}</span></li>
      <li><span>Shrine Cost</span><span>${fmt(shrineCost)} ${FLOWER_ICON}</span></li>
      <li><span>Restock Cost</span><span>${fmt(restockCost)} ${FLOWER_ICON}</span></li>
      <li><span>Sell Fee</span><span>${fmt(sellFee)} ${FLOWER_ICON}</span></li>
    </ul>
    <div class="cost-net-net-result"><span>Net</span><span class="${net >= 0 ? "is-profit" : "is-loss"}">${net >= 0 ? "+" : ""}${fmt(net)} ${FLOWER_ICON}</span></div>`;
  const netExplain = `Gross with every cost above subtracted — this is the final number shown on the card.`;

  return `<div class="cost-net-modal-intro">Every number below feeds into the <b>Net</b> shown on the card.</div>${section(FLOWER_ICON, "Gross", grossBody, grossExplain)}${section(FLOWER_ICON, costLabel, costBody, costExplain)}${section(GEM_ICON, "Restock Cost", restockBody, restockExplain)}${section(getLegendaryShrineIconHtml(), "Shrine Cost", shrineBody, shrineExplain)}${section(FLOWER_ICON, "Sell Fee", feeBody, feeExplain)}${section(FLOWER_ICON, "Net", netBody, netExplain)}`;
}

export function renderCostNetInfoTrigger(opts) {
  const html = buildCostNetBreakdownHtml(opts);
  const id = registerCostNetInfo(html);
  return `<div class="cost-net-info-trigger" data-cost-net-id="${id}">How the Cost/Net is Computed?</div>`;
}

function closeCostNetInfoModal() {
  const overlay = $("costNetInfoOverlay");
  if (overlay) overlay.classList.remove("show");
}

document.addEventListener("click", e => {
  const trigger = e.target.closest(".cost-net-info-trigger");
  if (trigger) {
    const id = trigger.getAttribute("data-cost-net-id");
    const html = __costNetInfoRegistry[id];
    if (html != null) {
      const body = $("costNetInfoBody");
      if (body) body.innerHTML = html;
      const overlay = $("costNetInfoOverlay");
      if (overlay) overlay.classList.add("show");
    }
    return;
  }
  const closeBtn = e.target.closest("#costNetInfoCloseBtn");
  if (closeBtn) {
    closeCostNetInfoModal();
    return;
  }
  if (e.target && e.target.id === "costNetInfoOverlay") {
    closeCostNetInfoModal();
    return;
  }
});

export function renderTotalsBreakdown(opts) {
  opts = opts || {};
  const title = opts.title || "24HRS PROFIT/LOSS";
  const gross = opts.gross || 0;
  const baseCost = opts.baseCost || 0;
  const restockCost = opts.restockCost || 0;
  const restockNote = opts.restockNote || "";
  const shrineCost = opts.shrineCost || 0;
  const shrineNames = opts.shrineNames || [];
  const sellFee = opts.sellFee || 0;
  const net = gross - baseCost - restockCost - shrineCost - sellFee;
  const isProfit = net >= 0;
  const hasYield = opts.totalYield != null;
  const yieldRow = hasYield ? `<div class="stat"><span class="label">Total Yield</span><span class="value">${fmt(opts.totalYield)}${opts.yieldLabel ? ` <span style="opacity:.65;font-weight:500;">${opts.yieldLabel}</span>` : ""}</span></div>` : opts.yieldLabel ? `<div class="stat"><span class="label">Total Yield</span><span class="value">${opts.yieldLabel}</span></div>` : "";
  const unitRow = opts.unitLabel != null ? `<div class="stat"><span class="label">${opts.unitLabel}</span><span class="value">${fmt(opts.unitCount)}</span></div>` : "";
  const yieldPerCycleRow = opts.yieldPerCycle != null ? `<div class="stat"><span class="label">Yield per Cycle</span><span class="value">${fmt(opts.yieldPerCycle)}</span></div>` : "";
  const totalCyclesRow = opts.totalCycles != null ? `<div class="stat"><span class="label">Total Cycles</span><span class="value">${fmt(opts.totalCycles)}${opts.totalCyclesSuffix != null ? opts.totalCyclesSuffix : "/day"}</span></div>` : "";
  const manualCycleRow = opts.manualCycleKey ? `\n        <div class="stat manual-cycle-stat" style="grid-column:1 / -1;flex-direction:column;align-items:stretch;gap:3px;background:rgba(255,193,7,.22);border:1.25px solid rgba(217,119,6,.55);border-radius:8px;padding:6px 7px;">\n          <span class="label" style="color:#8a5a00;">Manual Cycle <span style="opacity:.75;font-weight:500;">(override${opts.totalCyclesSuffix != null ? " " + opts.totalCyclesSuffix : "/day"} — leave blank for auto)</span></span>\n          <input type="text" inputmode="decimal" pattern="[0-9]*.?[0-9]*" autocomplete="off" class="manual-cycle-input" data-cycle-key="${escapeHtml(opts.manualCycleKey)}" data-cycle-refresh="${escapeHtml(opts.manualCycleRefresh || "")}" placeholder="Type Manual Cycle here" value="${opts.manualCycleValue != null && opts.manualCycleValue !== "" ? escapeHtml(String(opts.manualCycleValue)) : ""}" style="width:100%;font-family:'JetBrains Mono',monospace;font-size:12.6px;border:1.25px solid var(--line);border-radius:6px;padding:5px 6px;background:#fffdf5;">\n        </div>` : "";
  const feedRow = opts.feedQty != null ? `<div class="stat"><span class="label">${opts.feedIcon || ""} Feed Consumed</span><span class="value">${fmt(opts.feedQty)} ${opts.feedName || ""}${opts.headsCount != null ? ` <span style="opacity:.65;font-weight:500;">(${fmt(opts.headsCount)} heads)</span>` : ""}</span></div>` : "";
  const perSeedHtml = opts.perSeedLabel ? `\n      <div class="profit-banner per-seed-banner">\n        <span class="plabel">${opts.perSeedLabel}</span>\n        <span><span class="pvalue ${opts.perSeedIsProfit ? "is-profit" : "is-loss"}">${opts.perSeedIsProfit ? "+" : ""}${fmt(opts.perSeedValue)} ${FLOWER_ICON} FLOWER</span>${opts.perSeedRoi != null ? `<span class="proi">(${opts.perSeedRoi.toFixed(1)}% ROI)</span>` : ""}</span>\n      </div>` : "";
  const totalDeductions = baseCost + restockCost + shrineCost + sellFee;
  const costNetInfoTriggerHtml = renderCostNetInfoTrigger({
    gross: gross,
    baseCost: baseCost,
    unitCost: opts.unitCost,
    costSectionLabel: opts.costSectionLabel,
    restockCost: restockCost,
    restockNote: restockNote,
    restockDetails: opts.restockDetails,
    shrineCost: shrineCost,
    shrineNames: shrineNames,
    shrineDetails: opts.shrineDetails,
    sellFee: sellFee,
    net: net,
    totalYield: opts.totalYield,
    yieldLabel: opts.yieldLabel,
    otherCostItems: opts.otherCostItems,
    feedCostFlower: opts.feedCostFlower,
    feedIcon: opts.feedIcon
  });
  return `\n      ${perSeedHtml}\n      <div class="lib-section-title totals-breakdown-title" style="margin-top:10px;">${title}</div>\n      <div class="totals-breakdown totals-breakdown-box">\n      <div class="card-grid">\n        ${manualCycleRow}\n        ${unitRow}\n        ${yieldPerCycleRow}\n        ${totalCyclesRow}\n        ${feedRow}\n        ${yieldRow}\n        <div class="stat"><span class="label">Gross</span><span class="value">${fmt(gross)} ${FLOWER_ICON} FLOWER${feePercent > 0 ? ` <span style="opacity:.65;font-weight:500;">(before fee)</span>` : ""}</span></div>\n      </div>\n      <div class="deductions-box">\n        <div class="totals-deductions-label">Total Deductions</div>\n        <div class="card-grid">\n          ${opts.feedCostFlower != null ? `<div class="stat stat-sub"><span class="label">${opts.feedIcon || ""} Feed Cost</span><span class="value">-${fmt(opts.feedCostFlower)} ${FLOWER_ICON} FLOWER</span></div>` : ""}\n          ${opts.otherCostItems && opts.otherCostItems.length ? `\n          <div class="stat stat-sub" style="flex-direction:column;align-items:stretch;">\n            <div class="label" style="margin-bottom:2px;">Consumable Cost</div>\n            <div style="margin-left:10px;">\n              ${opts.otherCostItems.map(item => `\n              <div style="display:flex;justify-content:space-between;font-size:11.4px;opacity:.8;padding:1px 0;">\n                <span>${item.label}${item.note ? ` <span style="opacity:.7;">(${item.note})</span>` : ""}</span>\n                <span>-${fmt(item.value)} ${FLOWER_ICON}</span>\n              </div>`).join("")}\n            </div>\n            <div style="display:flex;justify-content:space-between;margin-top:3px;padding-top:2px;border-top:1px dashed var(--line);"><span class="label">Total</span><span class="value">-${fmt(opts.otherCostItems.reduce((s, i) => s + i.value, 0))} ${FLOWER_ICON} FLOWER</span></div>\n          </div>` : opts.feedCostFlower != null && baseCost - opts.feedCostFlower > 1e-4 ? `<div class="stat stat-sub"><span class="label">Other Costs</span><span class="value">-${fmt(baseCost - opts.feedCostFlower)} ${FLOWER_ICON} FLOWER</span></div>` : ""}\n          ${opts.feedCostFlower == null ? `<div class="stat stat-sub"><span class="label">Total Cost</span><span class="value">-${fmt(baseCost)} ${FLOWER_ICON} FLOWER</span></div>` : ""}\n          <div class="stat stat-sub"><span class="label">Restock Cost</span><span class="value">${restockCost > 0 ? `-${fmt(restockCost)}` : `0`} ${FLOWER_ICON} FLOWER${restockNote ? ` <span style="opacity:.65;font-weight:500;">${restockNote}</span>` : ""}</span></div>\n          <div class="stat stat-sub"><span class="label">Shrine Cost</span><span class="value" style="${shrineCost > 0 ? "color:#b45309;" : ""}">${shrineCost > 0 ? `-${fmt(shrineCost)}` : `0`} ${FLOWER_ICON} FLOWER${shrineNames.length ? ` <span style="opacity:.65;font-weight:500;">(${shrineNames.join(", ")})</span>` : ""}</span></div>\n          <div class="stat stat-sub"><span class="label">Sell Fee${feePercent > 0 ? ` (${feePercent}%)` : ""}</span><span class="value">${sellFee > 0 ? `-${fmt(sellFee)}` : `0`} ${FLOWER_ICON} FLOWER</span></div>\n          <div class="stat stat-total-deduction"><span class="label">Total Deduction</span><span class="value">-${fmt(totalDeductions)} ${FLOWER_ICON} FLOWER</span></div>\n        </div>\n      </div>\n      <div class="card-grid" style="margin-top:5px;">\n        <div class="stat stat-net"><span class="label">Net</span><span class="value ${isProfit ? "is-profit" : "is-loss"}">${isProfit ? "+" : ""}${fmt(net)} ${FLOWER_ICON} FLOWER</span></div>\n      </div>\n      ${costNetInfoTriggerHtml}\n      </div>`;
}

function renderAnimalFeedByLevelBlock(type, currentLevel) {
  const cfg = ANIMAL_DATA[type];
  const expanded = expandedAnimalFeedByLevel.has(type);
  const active = getActiveAnimalBoosts(type);
  let feedMultTotal = 1;
  active.forEach(b => {
    if (b.feedMult) feedMultTotal *= b.feedMult;
    if (b.feedMultAll) feedMultTotal *= b.feedMultAll;
  });
  const spice = getSpiceEffectForAnimalType(type);
  feedMultTotal *= spice.feedMultAll;
  const requiredQtyPerFeed = REQUIRED_FOOD_QTY_MAP[type];
  const rows = cfg.levels.map((lvlData, idx) => {
    const level = idx + 1;
    const isCurrent = level === currentLevel;
    const feedFig = computeAnimalFeedFigures(type, level);
    const feedName = FEED_LABELS[feedFig.feedKeyUsed];
    const boostedQty = Math.max(0, feedFig.noOfFeeds * requiredQtyPerFeed * feedMultTotal);
    return `\n    <div class="lib-item-row" style="margin:0 0 3px;padding:4px 8px;${isCurrent ? "border:1.5px solid var(--sun-deep);background:var(--paper-dim);" : ""}">\n      <span class="lib-item-icon">${getIcon(feedName)}</span>\n      <div class="lib-item-main">\n        <div class="lib-item-name">Lv${level}${isCurrent ? " (current)" : ""} — ${feedName}</div>\n      </div>\n      <div class="lib-item-price">×${fmt(boostedQty)}</div>\n    </div>`;
  }).join("");
  return `\n    <div class="anim-lvl-toggle" data-anim-lvl-type="${type}" style="cursor:pointer;display:flex;justify-content:space-between;align-items:center;margin-top:8px;padding:6px 0;border-top:1px dashed var(--line);">\n      <div class="lib-section-title" style="margin:0;">🌾 Feed by Level (1–15)</div>\n      <span class="anim-lvl-chev" style="font-size:12px;color:var(--ink-soft);transition:transform .25s ease;transform:rotate(${expanded ? 180 : 0}deg);">▾</span>\n    </div>\n    <div class="anim-lvl-details" style="display:${expanded ? "block" : "none"};margin-top:4px;">\n      ${rows}\n    </div>`;
}

function attachAnimalFeedByLevelToggles(wrap) {
  wrap.querySelectorAll(".anim-lvl-toggle").forEach(el => {
    el.onclick = e => {
      e.stopPropagation();
      const type = el.getAttribute("data-anim-lvl-type");
      const details = el.nextElementSibling;
      const chev = el.querySelector(".anim-lvl-chev");
      const nowExpanded = expandedAnimalFeedByLevel.has(type) ? (expandedAnimalFeedByLevel.delete(type), 
      false) : (expandedAnimalFeedByLevel.add(type), true);
      if (details) details.style.display = nowExpanded ? "block" : "none";
      if (chev) chev.style.transform = `rotate(${nowExpanded ? 180 : 0}deg)`;
    };
  });
}

function renderAnimalFeedConsumptionBlock(type, opts) {
  const expanded = expandedAnimalFeedConsumption.has(type);
  const icon = opts.feedIcon;
  const rows = [ {
    label: "24 Hours",
    qty: opts.feedQty24h,
    cost: opts.feedCostFlower24h,
    yieldLabel: opts.yieldLabel24h
  }, {
    label: "7 Days",
    qty: opts.feedQty7d,
    cost: opts.feedCostFlower7d,
    yieldLabel: opts.yieldLabel7d
  } ].map(r => `\n    <div class="lib-item-row">\n      <span class="lib-item-icon">${icon}</span>\n      <div class="lib-item-main">\n        <div class="lib-item-name">${r.label} — ${fmt(opts.headsCount)} heads × ${opts.feedName}</div>\n        <div class="lib-item-meta">${fmt(r.qty)} ${opts.feedName} consumed${r.yieldLabel ? ` · yields ${r.yieldLabel}` : ""}</div>\n      </div>\n      <div class="lib-item-price is-flower">${fmt(r.cost)}<small>FLOWER</small></div>\n    </div>`).join("");
  return `\n    <div class="anim-feedcon-toggle" data-anim-feedcon-type="${type}" style="cursor:pointer;display:flex;justify-content:space-between;align-items:center;margin-top:8px;padding:6px 0;border-top:1px dashed var(--line);">\n      <div class="lib-section-title" style="margin:0;">${icon} Total Feed Consumed (${fmt(opts.headsCount)} heads)</div>\n      <span class="anim-feedcon-chev" style="font-size:12px;color:var(--ink-soft);transition:transform .25s ease;transform:rotate(${expanded ? 180 : 0}deg);">▾</span>\n    </div>\n    <div class="anim-feedcon-details" style="display:${expanded ? "block" : "none"};margin-top:4px;">\n      ${rows}\n    </div>`;
}

function attachAnimalFeedConsumptionToggles(wrap) {
  wrap.querySelectorAll(".anim-feedcon-toggle").forEach(el => {
    el.onclick = e => {
      e.stopPropagation();
      const type = el.getAttribute("data-anim-feedcon-type");
      const details = el.nextElementSibling;
      const chev = el.querySelector(".anim-feedcon-chev");
      const nowExpanded = expandedAnimalFeedConsumption.has(type) ? (expandedAnimalFeedConsumption.delete(type), 
      false) : (expandedAnimalFeedConsumption.add(type), true);
      if (details) details.style.display = nowExpanded ? "block" : "none";
      if (chev) chev.style.transform = `rotate(${nowExpanded ? 180 : 0}deg)`;
    };
  });
}

function renderAnimalMaterialCycleBreakdown(materials, feedQtyPerCycle, feedQty24h, productRows, cyclesPerDay, feedQty7d, cyclesPerWeek, yieldsWeek) {
  const buildBlock = (feedQty, yieldMult, isExtendedCycle, yieldSectionLabel, yieldOverride) => {
    const matRows = materials.map(row => renderMaterialCycleRow(row.name, row.qty * feedQty, getFlowerMarketPrice(row.name), false)).join("");
    const matTotal = materials.reduce((sum, row) => sum + row.qty * feedQty * getFlowerMarketPrice(row.name), 0);
    const yieldRows = productRows.map((r, idx) => renderMaterialCycleRow(r.pname, yieldOverride ? yieldOverride[idx] : r.totalUnits * yieldMult, getFlowerMarketPrice(r.pname), true, isExtendedCycle)).join("");
    const yieldTotal = productRows.reduce((sum, r, idx) => sum + (yieldOverride ? yieldOverride[idx] : r.totalUnits * yieldMult) * getFlowerMarketPrice(r.pname), 0);
    return matRows + renderMaterialSubtotalRow(matTotal, "Total Value") + `<div class="lib-section-title">🧺 ${yieldSectionLabel}</div>` + yieldRows + renderMaterialSubtotalRow(yieldTotal, "Total Yield Value");
  };
  return `\n      <div class="lib-cycle-container">\n      <div class="lib-section-title lib-material-badge">📦 Material Used for 1 Cycle</div>\n      ${buildBlock(feedQtyPerCycle, 1, false, "Yield for 1 Cycle")}\n      </div>\n      <div class="lib-cycle-container">\n      <div class="lib-section-title lib-material-badge">📦 Material Used for ${fmt(cyclesPerDay)} Cycle${cyclesPerDay === 1 ? "" : "s"} (24H)</div>\n      ${buildBlock(feedQty24h, cyclesPerDay, true, `Yield for ${fmt(cyclesPerDay)} Cycle${cyclesPerDay === 1 ? "" : "s"} (24H)`)}\n      </div>\n      <div class="lib-cycle-container">\n      <div class="lib-section-title lib-material-badge">📦 Material Used for 7 Days</div>\n      ${buildBlock(feedQty7d, cyclesPerWeek, true, "Yield for 7 Days", yieldsWeek)}\n      </div>`;
}

const ANIMAL_LOVE_TOOL_NAMES = {
  pettingHand: "Petting Hand",
  brush: "Brush",
  musicBox: "Music Box"
};

function fmtLoveCount(n) {
  const cleaned = Math.round(n * 100) / 100;
  return String(cleaned);
}

function renderAnimalAffectionBox(type) {
  const summary = computeAnimalAffectionSummary(type);
  const cols = Object.keys(ANIMAL_LOVE_ITEM_XP).map(key => {
    const tool = summary.tools[key];
    const off = !tool.owned || summary.qty <= 0;
    const shown = fmtLoveCount(tool.count);
    return `<div class="animal-love-col${off ? " is-off" : ""}">
        <div class="animal-love-name">${ANIMAL_LOVE_TOOL_NAMES[key]}</div>
        <div class="animal-love-xp">+${fmtXp(tool.xpEach)} XP</div>
        <div class="animal-love-times">×<input type="number" class="animal-love-input" data-animal="${type}" data-tool="${key}" data-shown="${shown}" min="0" step="any" inputmode="decimal" value="${shown}"${off ? " disabled" : ""}></div>
        <div class="animal-love-total-label">Applied EXP to all animals in one cycle</div>
        <div class="animal-love-total">+${fmtXp(tool.xp)} XP</div>
      </div>`;
  }).join("");
  const note = `${fmtInt(summary.qty)} heads × ${summary.opportunities} love actions = ${fmtInt(summary.capacity)} per cycle`;
  return `<div class="animal-love">
      <div class="lib-section-title">💞 Affection Tools <span style="font-weight:500;opacity:.7;">(${note})</span></div>
      <div class="animal-love-grid">${cols}</div>
    </div>`;
}

function renderAnimalCard(type) {
  const fig = computeAnimalTypeFigures(type);
  const qty = fig.qty;
  const shrineCostFlowerPerCycleAllHeads = (fig.shrineCostFlowerPerCyclePerAnimal || 0) * qty;
  const totalCostFlower = coinsToFlower(fig.totalCostCoinsPerAnimal) * qty + shrineCostFlowerPerCycleAllHeads;
  let totalRevenueFlower = 0;
  let totalRevenueGrossFlower = 0;
  const productRows = fig.products.map((pname, idx) => {
    const m = marketItems.find(x => (x.name || "").toLowerCase() === pname.toLowerCase());
    const price = m ? m.flowerPrice || 0 : 0;
    const unitsPerAnimal = fig.yields[idx];
    const totalUnits = unitsPerAnimal * qty;
    const grossValue = totalUnits * price;
    const netValue = grossValue * (1 - feePercent / 100);
    totalRevenueGrossFlower += grossValue;
    totalRevenueFlower += netValue;
    return {
      pname: pname,
      price: price,
      unitsPerAnimal: unitsPerAnimal,
      totalUnits: totalUnits,
      grossValue: grossValue,
      netValue: netValue
    };
  });
  const profitFlower = totalRevenueFlower - totalCostFlower;
  const isProfit = profitFlower >= 0;
  const roi = totalCostFlower > 0 ? profitFlower / totalCostFlower * 100 : 0;
  const isExpanded = expandedAnimalCards.has(type);
  const animalDayManualCycleKey = "animal_day_" + type;
  const animalWeekManualCycleKey = "animal_week_" + type;
  const animalDayManualCycle = getManualCycleOverride(animalDayManualCycleKey);
  const animalWeekManualCycle = getManualCycleOverride(animalWeekManualCycleKey);
  const autoCyclesPerDay = ANIMAL_BASE_CYCLE_SEC / fig.cycleTimeSec;
  const cyclesPerDay = animalDayManualCycle != null ? animalDayManualCycle : autoCyclesPerDay;
  const profit24h = profitFlower * cyclesPerDay;
  const cost24h = totalCostFlower * cyclesPerDay;
  const cycleChanged = Math.abs(fig.cycleTimeSec - ANIMAL_BASE_CYCLE_SEC) > .5;
  const animalYieldLabel = productRows.map(r => `${fmt(r.totalUnits * cyclesPerDay)} ${r.pname}`).join(" · ");
  const weekly = computeAnimalWeeklyFigures(type, animalWeekManualCycle);
  const spiceLabel = fig.spiceActiveKey === "saltLick" ? "Salt Lick" : fig.spiceActiveKey === "honeyTreat" ? "Honey Treat" : null;
  const feedName = fig.feedNameUsed;
  const feedIcon = fig.feedIconUsed;
  const feedXpMultNote = fig.feedXpMult !== 1 ? ` × ${fmtXp(fig.feedXpMult)} (feed XP boosts)` : "";
  const affection = fig.affectionFigures;
  const affectionNote = affection && affection.avgPerCycle > 0 ? ` · Affection tools add ~${fmtXp(affection.avgPerCycle)} XP per cycle (${fmtXp(affection.avgPerOpportunity)} avg × ${affection.opportunities})` : "";
  const feedXpTitle = `${fmtXp(fig.feedXpBase)} base XP${feedXpMultNote} = ${fmtXp(fig.feedXpPerFeed)} XP per feed${affectionNote}`;
  const feedXpChipHtml = `<span class="feed-xp-chip" title="${feedXpTitle}">${fmtXp(fig.feedXpPerFeed)} XP</span>`;
  const feedQtyPerCycleAllHeads = fig.effectiveFeedQty * qty;
  const feedCostFlowerPerCycleAllHeads = coinsToFlower(fig.feedCostCoins) * qty;
  const feedQty24h = feedQtyPerCycleAllHeads * cyclesPerDay;
  const feedCostFlower24h = feedCostFlowerPerCycleAllHeads * cyclesPerDay;
  const weeklyYieldTotalLabel = fig.products.map((pname, idx) => `${fmt(weekly.yieldsWeek[idx])} ${pname}`).join(" · ");
  const cycleYieldLabel = productRows.map(r => `${fmt(r.totalUnits)} ${r.pname}`).join(" · ");
  const oneHeadYieldLabel = fig.products.map((pname, idx) => `${fmt(fig.yields[idx])} ${pname}`).join(" · ");
  const ingredientRows = fig.feedInfo.breakdown.map(row => {
    if (row.mode === "gem") {
      return `\n      <div class="lib-item-row">\n        <span class="lib-item-icon">${getIcon(row.name)}</span>\n        <div class="lib-item-main">\n          <div class="lib-item-name">${row.name} ×${fmt(row.qty)}</div>\n          <div class="lib-item-meta">Cost @ 1${GEM_ICON}/u ≈ ${fmt(row.unitCost / coinPerFlower)}${FLOWER_ICON}/u</div>\n        </div>\n        <span style="font-size:9.6px;opacity:.6;">${GEM_ICON} gem-only</span>\n      </div>`;
    }
    const displayPrice = row.mode === "buy" ? row.unitCost / coinPerFlower : row.unitCost;
    const displayUnit = row.mode === "buy" ? FLOWER_ICON : COIN_ICON;
    return `\n    <div class="lib-item-row">\n      <span class="lib-item-icon">${getIcon(row.name)}</span>\n      <div class="lib-item-main">\n        <div class="lib-item-name">${row.name} ×${fmt(row.qty)}</div>\n        <div class="lib-item-meta">${row.mode === "collect" ? "Collect" : "Buy"} @ ${fmt(displayPrice)}${displayUnit}/u</div>\n      </div>\n      <div style="display:flex;gap:2px;">\n        <button class="btn btn-ghost animal-mode-btn" data-mat="${row.name}" data-mode="collect" style="padding:4px 6px;font-size:9.6px;${row.mode === "collect" ? "border-color:var(--profit);color:var(--profit);" : ""}">Collect</button>\n        <button class="btn btn-ghost animal-mode-btn" data-mat="${row.name}" data-mode="buy" style="padding:4px 6px;font-size:9.6px;${row.mode === "buy" ? "border-color:var(--flower);color:var(--flower);" : ""}">Buy</button>\n      </div>\n    </div>`;
  }).join("");
  const productRowsHtml = `<div class="animal-detail-grid">` + productRows.map(r => renderCardProductDetailRow(getIcon(r.pname), r.pname, r.totalUnits, r.grossValue, r.grossValue - r.netValue)).join("") + `</div>`;
  return `\n  <div class="card ${isProfit ? "is-profit" : "is-loss"}${isExpanded ? " expanded" : ""}" data-search="${type}">\n    <div class="card-toggle">\n      <div class="card-name-row">\n        <span class="card-icon">${getIcon(fig.label)}</span>\n        <div>\n          <div class="card-name">${fig.label} · Lv${fig.level}</div>\n          <div class="card-type">${fmt(fig.totalCostCoinsPerAnimal)}${COIN_ICON} feed cost / animal</div>\n          <div class="card-type" style="margin-top:2px;">${feedIcon} ${fmt(qty)} heads consumes ${fmt(feedQtyPerCycleAllHeads)} ${feedName}/cycle → yields ${cycleYieldLabel}</div>\n        </div>\n      </div>\n      <div class="card-collapsed-profit">\n        ${fig.activeBoosts.length ? `<span class="boost-badge">⚡${fig.activeBoosts.length}</span>` : ""}\n        <span class="pvalue-mini ${isProfit ? "is-profit" : "is-loss"}">${isProfit ? "+" : ""}${fmt(profitFlower)} ${FLOWER_ICON} FLOWER</span>\n        <span class="chev">▾</span>\n      </div>\n    </div>\n    ${render24hBadge(profit24h, cost24h, cyclesPerDay, `${fmt(qty)} heads · ${fmt(cyclesPerDay)} cycles/day`, null, animalYieldLabel, [ `${fmt(qty)} HEADS · ${fmt(fig.effectiveFeedQty)} ${fig.feedNameUsed} EACH`, `<b>Total Cost (24H):</b> ${fmt(cost24h)} ${FLOWER_ICON} FLOWER`, `<b>Gross Revenue (24H):</b> ${fmt(totalRevenueGrossFlower * cyclesPerDay)} ${FLOWER_ICON} FLOWER${feePercent > 0 ? ` <span style="opacity:.65;">(before ${feePercent}% sell fee)</span>` : ""}`, `<b>Net Revenue (24H):</b> <span style="color:var(--flower);">${fmt(cost24h + profit24h)} ${FLOWER_ICON} FLOWER</span>${feePercent > 0 ? ` <span style="opacity:.65;">(after fee)</span>` : ""}` ])}\n    <div class="card-details">\n      ${renderAnimalAffectionBox(type)}\n      <div class="lib-section-title" style="margin-top:10px;">📦 Produce &amp; Yield${feePercent > 0 ? ` <span style="font-weight:500;opacity:.7;">(value shown after ${feePercent}% sell fee)</span>` : ""}</div>\n      ${productRowsHtml}\n      <div class="lib-section-title" style="margin-top:10px;">⏱ Per-Cycle Basics <span style="font-weight:500;opacity:.7;">(${formatDuration(fig.cycleTimeSec)}${cycleChanged ? ` — ${formatDuration(ANIMAL_BASE_CYCLE_SEC)} base` : ""} · ${fmt(qty)} heads)</span></div>\n      <div class="lib-item-row" style="margin-top:8px;">\n        <span class="lib-item-icon">${feedIcon}</span>\n        <div class="lib-item-main">\n          <div class="lib-item-name">1 head (Lv${fig.level}) consumes ${fmt(fig.effectiveFeedQty)} ${feedName}</div>\n          <div class="lib-item-meta">yields ${oneHeadYieldLabel} per cycle</div>\n        </div>\n        <div class="lib-item-price">${fmt(coinsToFlower(fig.feedCostCoins))}<small>FLOWER</small></div>\n      </div>\n      <div class="card-grid" style="margin-top:8px;">\n        <div class="stat"><span class="label">Feed cost / animal</span><span class="value">${fmt(coinsToFlower(fig.feedCostCoins))} ${FLOWER_ICON} FLOWER</span></div>\n        <div class="stat"><span class="label">Consumable Cost</span><span class="value">${fmt(fig.medicineFlowerPerLevel + fig.consumablesFlowerPerLevel)} ${FLOWER_ICON} FLOWER</span></div>\n      </div>\n      ${(() => {
    const s = getActiveShrineDailyCost(fig.activeBoosts);
    const otherCostItems24h = [];
    if (fig.medicineFlowerPerLevel > 1e-6) {
      otherCostItems24h.push({
        label: `${getIcon("Barn Delight")} Barn Delight`,
        value: fig.costPerCureFlower * fig.sickHeads * cyclesPerDay,
        note: `${fmt(fig.costPerCureFlower)} ${FLOWER_ICON}/cure × ${fmt(fig.sickHeads)} heads sick${cyclesPerDay !== 1 ? ` × ${fmt(cyclesPerDay)}/day` : ""}`
      });
    }
    if (fig.consumablesFlowerPerLevel > 1e-6) {
      const spiceCostPerUse = fig.consumablesFlowerPerLevel * 3;
      otherCostItems24h.push({
        label: `${getIcon(spiceLabel)} ${spiceLabel}`,
        value: fig.consumablesFlowerPerLevel * qty * cyclesPerDay,
        note: `${fmt(spiceCostPerUse)} ${FLOWER_ICON}/use ÷3 cycles × ${fmt(qty)} heads × ${fmt(cyclesPerDay)}/day`
      });
    }
    return renderTotalsBreakdown({
      title: "24HRS PROFIT/LOSS",
      totalYield: productRows.length === 1 ? productRows[0].totalUnits * cyclesPerDay : null,
      yieldLabel: animalYieldLabel,
      gross: totalRevenueGrossFlower * cyclesPerDay,
      baseCost: cost24h - shrineCostFlowerPerCycleAllHeads * cyclesPerDay,
      restockCost: 0,
      shrineCost: s.total,
      shrineNames: s.shrines.map(x => x.name),
      sellFee: (totalRevenueGrossFlower - totalRevenueFlower) * cyclesPerDay,
      totalCycles: cyclesPerDay,
      totalCyclesSuffix: "/day",
      manualCycleKey: animalDayManualCycleKey,
      manualCycleValue: getManualCycleRawValue(animalDayManualCycleKey),
      manualCycleAuto: autoCyclesPerDay,
      manualCycleRefresh: "renderAnimalsList",
      feedQty: feedQty24h,
      feedName: feedName,
      feedIcon: feedIcon,
      headsCount: qty,
      feedCostFlower: feedCostFlower24h,
      otherCostItems: otherCostItems24h
    });
  })()}\n      ${(() => {
    const s = getActiveShrineDailyCost(fig.activeBoosts);
    const otherCostItemsWeek = [];
    if (weekly.medicineCostFlowerWeek > 1e-6) {
      otherCostItemsWeek.push({
        label: `${getIcon("Barn Delight")} Barn Delight`,
        value: weekly.medicineCostFlowerWeek,
        note: `${fmt(weekly.costPerCureFlower)} ${FLOWER_ICON}/cure × ${fmt(weekly.sickHeads)} heads sick × ${fmt(weekly.cyclesPerWeek)} cycles/wk`
      });
    }
    if (weekly.consumablesCostFlowerWeek > 1e-6) {
      otherCostItemsWeek.push({
        label: `${getIcon(spiceLabel)} ${spiceLabel}`,
        value: weekly.consumablesCostFlowerWeek,
        note: `${fmt(weekly.spiceCostPerUseFlower)} ${FLOWER_ICON}/use ÷${getSpiceLickDurationHarvests()} cycles × ${fmt(qty)} heads × ${fmt(weekly.boostedCycles)} boosted cycles`
      });
    }
    return renderTotalsBreakdown({
      title: `7 Days Total <span style="font-weight:500;opacity:.7;">(${fmt(qty)} heads)</span>`,
      totalYield: productRows.length === 1 ? weekly.yieldsWeek[0] : null,
      yieldLabel: weeklyYieldTotalLabel,
      gross: weekly.grossRevenueWeekWithSpice,
      baseCost: weekly.costWeekWithSpice - shrineCostFlowerPerCycleAllHeads * weekly.cyclesPerWeek,
      restockCost: 0,
      shrineCost: s.total * 7,
      shrineNames: s.shrines.map(x => x.name),
      sellFee: weekly.grossRevenueWeekWithSpice - weekly.netRevenueWeekWithSpice,
      totalCycles: weekly.cyclesPerWeek,
      totalCyclesSuffix: "/week",
      manualCycleKey: animalWeekManualCycleKey,
      manualCycleValue: getManualCycleRawValue(animalWeekManualCycleKey),
      manualCycleAuto: weekly.autoCyclesPerWeek,
      manualCycleRefresh: "renderAnimalsList",
      feedQty: weekly.feedQtyWeek,
      feedName: weekly.feedLabel,
      feedIcon: getIcon(weekly.feedLabel),
      headsCount: qty,
      feedCostFlower: weekly.feedCostFlowerWeek,
      otherCostItems: otherCostItemsWeek
    });
  })()}\n      ${spiceLabel ? `<div class="stat" style="margin-top:4px;"><span class="label">vs no ${spiceLabel} (7d)</span><span class="value ${weekly.deltaWeek >= 0 ? "is-profit" : "is-loss"}">${weekly.deltaWeek >= 0 ? "+" : ""}${fmt(weekly.deltaWeek)} ${FLOWER_ICON} FLOWER</span></div>` : ""}\n      ${spiceLabel ? `<div class="field-hint" style="margin-top:6px;background:#fdf1c8;border:1.5px solid var(--sun-deep);">🧂 ${spiceLabel} only lasts <b>${getSpiceLickDurationHarvests()} harvests</b> per item — this week's ${fmt(weekly.boostedCycles)} of ${fmt(weekly.cyclesPerWeek)} cycles get the boost, the rest run at base rate. That's why 7-Day Profit isn't just 24h × 7.</div>` : ""}\n      ${renderBoostAppliedList(fig.activeBoosts)}\n      <div class="profit-banner">\n        <span class="plabel">Net Profit — per cycle</span>\n        <span><span class="pvalue ${isProfit ? "is-profit" : "is-loss"}">${isProfit ? "+" : ""}${fmt(profitFlower)} ${FLOWER_ICON} FLOWER</span>\n        <span class="proi">(${roi.toFixed(1)}% ROI)</span></span>\n      </div>\n      <div class="recipe-materials-wrap">\n      <div class="lib-section-title">${getIcon(feedName)} ${feedXpChipHtml} Feed ingredients (${feedName})</div>\n      ${ingredientRows}\n      ${renderAnimalMaterialCycleBreakdown(fig.feedInfo.breakdown, feedQtyPerCycleAllHeads, feedQty24h, productRows, cyclesPerDay, weekly.feedQtyWeek, weekly.cyclesPerWeek, weekly.yieldsWeek)}\n      </div>\n      ${renderAnimalFeedConsumptionBlock(type, {
    feedName: feedName,
    feedIcon: feedIcon,
    headsCount: qty,
    feedQty24h: feedQty24h,
    feedCostFlower24h: feedCostFlower24h,
    yieldLabel24h: animalYieldLabel,
    feedQty7d: weekly.feedQtyWeek,
    feedCostFlower7d: weekly.feedCostFlowerWeek,
    yieldLabel7d: weeklyYieldTotalLabel
  })}\n      ${renderAnimalFeedByLevelBlock(type, fig.level)}\n      <div class="field-hint" style="margin-top:6px;">Set level, heads and sickness estimate in ⚡ Boosts → Plots &amp; Nodes.</div>\n    </div>\n  </div>`;
}

export function renderAnimalsList() {
  const wrap = $("animalsItemList");
  if (!wrap) return;
  invalidateCostCache();
  loadBaseAnimalProduceIfNeeded();
  const focused = document.activeElement;
  const loveFocus = focused && focused.classList && focused.classList.contains("animal-love-input") && wrap.contains(focused) ? {
    animal: focused.dataset.animal,
    tool: focused.dataset.tool,
    value: focused.value,
    start: focused.selectionStart,
    end: focused.selectionEnd
  } : null;
  withPreservedCardScrolls(wrap, () => {
    wrap.innerHTML = Object.keys(ANIMAL_DATA).map(renderAnimalCard).join("");
  });
  if (loveFocus) {
    const el = wrap.querySelector(`.animal-love-input[data-animal="${loveFocus.animal}"][data-tool="${loveFocus.tool}"]`);
    if (el && !el.disabled) {
      el.value = loveFocus.value;
      el.focus();
      try {
        el.setSelectionRange(loveFocus.start, loveFocus.end);
      } catch (err) {}
    }
  }
  wrap.querySelectorAll(".card-toggle, .card-24h-box").forEach(el => {
    el.onclick = () => {
      const card = el.closest(".card");
      const type = card.dataset.search;
      if (expandedAnimalCards.has(type)) expandedAnimalCards.delete(type); else expandedAnimalCards.add(type);
      card.classList.toggle("expanded");
    };
  });
  wrap.querySelectorAll(".animal-mode-btn").forEach(btn => {
    btn.onclick = e => {
      e.stopPropagation();
      setMaterialMode("AnimalFeed", btn.dataset.mat, btn.dataset.mode);
      withPreservedScroll(wrap, renderAnimalsList);
    };
  });
  attachAnimalFeedByLevelToggles(wrap);
  attachAnimalFeedConsumptionToggles(wrap);
}

export function getIcon(name) {
  const cacheKey = name || "";
  if (__getIconCache.has(cacheKey)) return __getIconCache.get(cacheKey);
  let result;
  if (!name) {
    result = `<img src="${IMAGE_ICON_FALLBACK}" alt="item" width="16" height="16" decoding="async" style="width:16px;height:16px;image-rendering:pixelated;vertical-align:middle;">`;
  } else {
    const imgSrc = IMAGE_ICONS[name] || Object.entries(IMAGE_ICONS).find(([k]) => k.toLowerCase() === name.trim().toLowerCase())?.[1];
    if (imgSrc) {
      result = `<img src="${imgSrc}" alt="${escapeHtml(name)}" width="16" height="16" decoding="async" style="width:16px;height:16px;image-rendering:pixelated;vertical-align:middle;">`;
    } else {
      const emoji = ICONS[name] || Object.entries(ICONS).find(([k]) => k.toLowerCase() === name.trim().toLowerCase())?.[1];
      if (emoji) {
        result = `<span style="font-size:19.2px;line-height:1;">${emoji}</span>`;
      } else {
        result = `<img src="${IMAGE_ICON_FALLBACK}" alt="${escapeHtml(name)}" width="16" height="16" decoding="async" style="width:16px;height:16px;image-rendering:pixelated;vertical-align:middle;">`;
      }
    }
  }
  __getIconCache.set(cacheKey, result);
  return result;
}

export function getTreasureIcon(name) {
  const cacheKey = name || "";
  if (__getTreasureIconCache.has(cacheKey)) return __getTreasureIconCache.get(cacheKey);
  let result;
  if (!name) {
    result = `<img src="${IMAGE_ICON_FALLBACK}" alt="item" width="16" height="16" decoding="async" style="width:16px;height:16px;image-rendering:pixelated;vertical-align:middle;">`;
  } else {
    const imgSrc = IMAGE_ICONS[name] || Object.entries(IMAGE_ICONS).find(([k]) => k.toLowerCase() === name.trim().toLowerCase())?.[1];
    result = imgSrc ? `<img src="${imgSrc}" alt="${escapeHtml(name)}" width="16" height="16" decoding="async" style="width:16px;height:16px;image-rendering:pixelated;vertical-align:middle;">` : `<img src="${IMAGE_ICON_FALLBACK}" alt="${escapeHtml(name)}" width="16" height="16" decoding="async" style="width:16px;height:16px;image-rendering:pixelated;vertical-align:middle;">`;
  }
  __getTreasureIconCache.set(cacheKey, result);
  return result;
}

function getFishIcon(fishName, isPrime) {
  if (!fishName) return getIcon(fishName);
  if (isPrime) {
    const primeKey = "Prime Aged " + fishName;
    if (IMAGE_ICONS[primeKey]) return getIcon(primeKey);
  }
  const agedKey = "Aged " + fishName;
  if (IMAGE_ICONS[agedKey]) return getIcon(agedKey);
  return getIcon(fishName);
}

export function getBoostIconSkillFallback(name) {
  const icon = getBoostIcon(name);
  if (icon || !name) return icon;
  if (!SKILL_BOOSTS.some(s => s.name === name)) return "";
  return `<img src="${NAV_ICON_DATA.skillFallback}" alt="${escapeHtml(name)}" style="width:14px;height:14px;object-fit:contain;image-rendering:pixelated;vertical-align:-2px;margin-right:3px;">`;
}

export function getBoostIconAnyFallback(name) {
  const icon = getBoostIcon(name);
  if (icon || !name) return icon;
  return `<img src="${NAV_ICON_DATA.skillFallback}" alt="${escapeHtml(name)}" style="width:14px;height:14px;object-fit:contain;image-rendering:pixelated;vertical-align:-2px;margin-right:3px;">`;
}

export function getBoostIcon(name) {
  if (!name) return "";
  const imgSrc = BOOST_ICON_OVERRIDES[name] || IMAGE_ICONS[name];
  if (!imgSrc) return "";
  return `<img src="${imgSrc}" alt="${escapeHtml(name)}" style="width:14px;height:14px;image-rendering:pixelated;vertical-align:-2px;margin-right:3px;">`;
}

export function getMutantFishIcon(name, sizePx) {
  const size = sizePx || 16;
  if (!name) return `<img src="${MUTANT_FALLBACK_ICON}" alt="" style="width:${size}px;height:${size}px;image-rendering:pixelated;vertical-align:middle;">`;
  const imgSrc = IMAGE_ICONS[name] || Object.entries(IMAGE_ICONS).find(([k]) => k.toLowerCase() === name.trim().toLowerCase())?.[1];
  const src = imgSrc || MUTANT_FALLBACK_ICON;
  return `<img src="${src}" alt="${escapeHtml(name)}" style="width:${size}px;height:${size}px;image-rendering:pixelated;vertical-align:middle;">`;
}

export function renderFarmPanelInfo() {
  const {id: id, level: level, time: time, vipActive: vipActive, vipExpiresAt: vipExpiresAt, vipLifetime: vipLifetime, factionName: factionName, factionIsMember: factionIsMember, experience: experience, ascensionLevel: ascensionLevel} = farmPanelGetLastInfo();
  const displayName = id ? farmSyncGetApiUsername(id) : null;
  $("farmPanelName").textContent = displayName ? displayName.toUpperCase() : id ? `Farm #${id}` : "No farm synced";
  $("farmPanelId").textContent = `Farm Id: ${id || "—"}`;
  if (!id) {
    $("farmPanelLevel").textContent = "Bumpkin Level: —";
  } else {
    const levelInfo = cookGetLevelInfo(experience);
    $("farmPanelLevel").textContent = levelInfo.isMax ? `Bumpkin Level: ${level || levelInfo.level} (MAX)` : `Bumpkin Level: ${level || levelInfo.level} — ${fmt(levelInfo.progress)} XP/${fmt(levelInfo.span)} XP`;
  }
  const ascEl = $("farmPanelAscension");
  if (ascEl) {
    if (!id) {
      ascEl.textContent = "Ascension [0]";
    } else {
      const ascInfo = getAscensionLevelInfo(experience, ascensionLevel);
      const badgeText = ascensionLevelBadgeText(ascensionLevel, ascInfo.level, ascInfo.isReadyToAscend);
      ascEl.textContent = ascensionLevel && !ascInfo.isReadyToAscend ? `${badgeText} — ${fmt(ascInfo.currentExperienceProgress)} XP/${fmt(ascInfo.experienceToNextLevel)} XP` : badgeText;
    }
  }
  const factionEl = $("farmPanelFaction");
  if (factionEl) {
    if (!id) {
      factionEl.innerHTML = `Faction: —`;
    } else if (factionIsMember && factionName && FACTION_BANNER_ICONS[factionName]) {
      factionEl.innerHTML = `Faction: <img class="farm-panel-faction-icon" src="${FACTION_BANNER_ICONS[factionName]}" alt="${escapeHtml(FACTION_DISPLAY_NAMES[factionName])}"> ${escapeHtml(FACTION_DISPLAY_NAMES[factionName])}`;
    } else {
      factionEl.innerHTML = `Faction: No Faction`;
    }
  }
  const vipEl = $("farmPanelVip");
  if (vipEl) {
    if (!id) {
      vipEl.textContent = "";
    } else if (vipActive) {
      const expiryNote = vipLifetime ? ` (Lifetime)` : vipExpiresAt ? ` (until ${new Date(vipExpiresAt).toLocaleDateString()})` : "";
      vipEl.textContent = `👑 VIP Access active${expiryNote}`;
      vipEl.style.color = "var(--profit)";
    } else {
      vipEl.textContent = "No active VIP";
      vipEl.style.color = "var(--ink-soft)";
    }
  }
  $("farmPanelStatus").textContent = time ? `Last synced ${new Date(time).toLocaleString()}` : "Not synced yet";
  if (typeof renderFactionPetHeader === "function") renderFactionPetHeader();
  renderGuroBumpkin();
  renderGuroProfileStats(id, level, experience);
}

function renderGuroProfileStats(id, level, experience) {
  const levelEl = document.getElementById("guroProfileLevel");
  const expEl = document.getElementById("guroProfileExpansion");
  const balEl = document.getElementById("guroProfileBalance");
  const vipLineEl = document.getElementById("guroProfileVip");
  if (!levelEl || !expEl || !balEl || !vipLineEl) return;
  const g = id ? profileGetG() : null;
  if (!id) {
    levelEl.textContent = "Level: —";
    expEl.textContent = "Expansion: —";
    balEl.textContent = "Balance: —";
    vipLineEl.textContent = "VIP: —";
    return;
  }
  const levelInfo = cookGetLevelInfo(experience);
  levelEl.textContent = `Level: ${level || levelInfo.level}`;
  vipLineEl.textContent = `VIP: ${profileVipHtml()}`;
  if (g) {
    const exp = profileGetExpansionInfo(g);
    const iconHtml = g.island && g.island.type ? `<img src="${esIslandIcon(g.island.type)}" class="profile-inline-icon" alt="">` : "";
    expEl.innerHTML = `${iconHtml}${escapeHtml(exp.islandLabel)} Expansion ${fmtInt(exp.expansionLevel)}`;
    balEl.innerHTML = `Balance: ${fmt(Number(g.balance) || 0)}${FLOWER_ICON}`;
  } else {
    expEl.textContent = "Expansion: —";
    balEl.textContent = "Balance: —";
  }
}

export function renderGuroBumpkin() {
  const frame = document.getElementById("guroBumpkinFrame");
  const idEl = document.getElementById("guroBumpkinId");
  if (!frame || !idEl) return;
  const g = profileGetG();
  frame.innerHTML = g ? profileBumpkinFrameHtml(g) : `<div class="guro-bumpkin-empty">?</div>`;
  idEl.innerHTML = g ? profileBumpkinIdHtml(g) : "";
  const img = frame.querySelector(".profile-bumpkin-render");
  if (img) {
    img.addEventListener("error", () => profileBumpkinImageOnError(img));
    img.addEventListener("load", () => {
      if (profileBumpkinCache.tokenUri === img.dataset.tokenUri) {
        profileBumpkinCache.status = "loaded";
        profileBumpkinCache.resolvedUrl = img.src;
        profileBumpkinCachePersist();
      }
    });
  }
}

export function openFarmPanel() {
  $("farmSidePanel").classList.add("open");
  $("farmPanelOverlay").classList.add("show");
  $("farmPanelToggleArrow").textContent = "‹";
  $("farmPanelToggle").setAttribute("aria-label", "Close farm sync panel");
  if (typeof renderFarmPanelTabContent === "function") renderFarmPanelTabContent();
}

export function closeFarmPanel() {
  $("farmSidePanel").classList.remove("open");
  $("farmPanelOverlay").classList.remove("show");
  $("farmPanelToggleArrow").textContent = "›";
  $("farmPanelToggle").setAttribute("aria-label", "Open farm sync panel");
}

function positionFarmPanelTab() {
  const tab = $("farmPanelToggle");
  const ratioCard = $("settingsPanel");
  const sidePanel = $("farmSidePanel");
  if (!tab || !ratioCard || !sidePanel) return;
  const profileOverlay = $("profileOverlay");
  if (profileOverlay && profileOverlay.classList.contains("show")) return;
  const cardRect = ratioCard.getBoundingClientRect();
  const sideRect = sidePanel.getBoundingClientRect();
  const gap = 8;
  const desiredTop = cardRect.top - sideRect.top - tab.offsetHeight - gap;
  const newTop = Math.max(8, desiredTop) + "px";
  if (tab.style.top !== newTop) tab.style.top = newTop;
}

setTimeout(positionFarmPanelTab, 0);

let __farmPanelTabRepositionScheduled = false;

function schedulePositionFarmPanelTab() {
  if (__farmPanelTabRepositionScheduled) return;
  __farmPanelTabRepositionScheduled = true;
  requestAnimationFrame(() => {
    __farmPanelTabRepositionScheduled = false;
    positionFarmPanelTab();
  });
}

window.addEventListener("load", () => setTimeout(positionFarmPanelTab, 0));

window.addEventListener("resize", schedulePositionFarmPanelTab);

if (document.fonts && document.fonts.ready) document.fonts.ready.then(positionFarmPanelTab);

function renderExactBoostAppliedList(boosts) {
  if (!boosts || !boosts.length) return "";
  const rows = boosts.map(b => `<div class="boost-applied-row is-yield">Boost: ${getBoostIconSkillFallback(b.name)}<b>${escapeHtml(b.name)}</b> ${escapeHtml(b.valueText)}</div>`).join("");
  return `<div class="section-badge is-boost-label">🎯 Applied Boost (this yield)</div><div class="boost-applied-list">${rows}</div>`;
}

function renderNodeYieldBoostAppliedList(summary, produceIcon) {
  if (!summary || !summary.length) return "";
  const rows = summary.map(b => `<div class="boost-applied-row is-yield">${getBoostIconSkillFallback(b.name)}<b>${escapeHtml(b.name)}</b> <span class="boost-total-value">+${fmt(b.total)}</span>${produceIcon}</div>`).join("");
  return `<div class="lib-section-title" style="margin-top:10px;">Applied Boost</div>${rows}`;
}

export function renderNodeTierYieldList(tierYields, produceIcon) {
  if (!tierYields) return "";
  const entries = Object.entries(tierYields).filter(([, total]) => total > 1e-9);
  if (!entries.length) return "";
  const rows = entries.map(([label, total]) => `<div class="boost-applied-row is-yield">${getIcon(label)}<b>${escapeHtml(label)}</b> <span class="boost-total-value">${fmt(total)}</span>${produceIcon}</div>`).join("");
  return `<div class="lib-section-title" style="margin-top:10px;">Nodes Yield</div>${rows}`;
}

export function renderOilNodeYieldList(oilNodeGroups, produceIcon) {
  if (!oilNodeGroups || !oilNodeGroups.length) return "";
  const oilReserveIcon = getIcon("Oil Reserve");
  const bonusMineTotal = OIL_SINGLE_HARVEST_BASE + OIL_BONUS_DROP_AMOUNT;
  const rows = oilNodeGroups.map(node => {
    const minesTag = node.minesUntilBonus === 1 ? `<span class="tier-tag">Bonus mine next</span>` : `<span class="tier-tag">${node.minesUntilBonus} mines left before +${fmt(bonusMineTotal)}</span>`;
    return `<div class="boost-applied-row is-yield oil-node-row"><div class="oil-node-header">${oilReserveIcon}<b>Oil Reserve ${node.index}</b></div><div class="oil-node-detail">${minesTag}<span class="boost-total-value">+${fmt(node.qty)}</span>${produceIcon}</div></div>`;
  }).join("");
  return `<div class="lib-section-title" style="margin-top:10px;">Nodes Yield</div>${rows}`;
}

export function renderSaltNodeYieldList(saltNodeGroups, produceIcon, price) {
  if (!saltNodeGroups || !saltNodeGroups.length) return "";
  const saltRockIcon = getIcon("Salt Rock");
  const rows = saltNodeGroups.map(node => {
    const seaBlessedTag = node.seaBlessedRestored > 0 ? `<span class="tier-tag">+${node.seaBlessedRestored} Sea Blessed</span>` : "";
    const chargeTag = `<span class="tier-tag">${node.storedCharges}/${node.maxCharges} charges</span>${seaBlessedTag}`;
    const nextChargeQty = node.qty + node.yieldPerCharge + (node.seaBlessedWindowRestored || 0) * node.yieldPerCharge;
    const nextChargeFlowerValue = nextChargeQty * (price || 0);
    const possibleHtml = node.storedCharges < node.maxCharges ? `<div class="salt-node-possible-hint"><b>Harvest Well become</b> <b class="salt-hint-strong">+${fmt(nextChargeQty)}</b> <span class="salt-hint-icon">${produceIcon}</span>Salt <b class="salt-hint-strong">(${fmt(nextChargeFlowerValue)} ${FLOWER_ICON})</b> when the next charge is ready</div>` : "";
    const procTag = node.seaBlessedProcs && node.seaBlessedProcs.length ? `<span class="tier-tag">⚡ ${node.seaBlessedProcs.length} proc${node.seaBlessedProcs.length === 1 ? "" : "s"}</span>` : "";
    const targetText = targets => targets.length ? targets.map(t => "Rock " + t).join(", ") : "none";
    const procLines = (node.seaBlessedProcs || []).map(pr => `<div class="turnaround-boost-note">⚡ Harvest #${pr.harvestNumber} procs → +1 charge on ${targetText(pr.targets)}</div>`);
    const futureLines = (node.seaBlessedFuture || []).map(pr => `<div class="turnaround-boost-note">⏳ Harvest #${pr.harvestNumber} in ${pr.inSec > 0 ? formatDuration(pr.inSec) : "now"} procs → +1 charge on ${targetText(pr.targets)}</div>`);
    const harvestLine = node.seaBlessedHarvests > 0 ? `<div class="turnaround-boost-note">${node.seaBlessedHarvests} harvest${node.seaBlessedHarvests === 1 ? "" : "s"} from this node${node.seaBlessedRestored > 0 ? `, ${node.seaBlessedRestored} of them restored by Sea Blessed` : ""}</div>` : "";
    const chainHtml = procLines.length || futureLines.length || node.seaBlessedRestored > 0 ? `<div class="turnaround-boost-wrap">${harvestLine}${procLines.join("")}${futureLines.join("")}</div>` : "";
    return `<div class="boost-applied-row is-yield oil-node-row"><div class="oil-node-header">${saltRockIcon}<b>Salt Rock ${node.index}</b></div><div class="oil-node-detail">${chargeTag}${procTag}<span class="boost-total-value">+${fmt(node.qty)}</span>${produceIcon}</div>${possibleHtml}${chainHtml}</div>`;
  }).join("");
  return `<div class="lib-section-title" style="margin-top:10px;">Nodes Yield</div>${rows}`;
}

export function renderCrimstoneNodeYieldList(crimstoneNodeGroups) {
  if (!crimstoneNodeGroups || !crimstoneNodeGroups.length) return "";
  const crimstoneRockIcon = getIcon("Crimstone Rock");
  const crimstoneOreIcon = getIcon("Crimstone");
  const rows = crimstoneNodeGroups.map(node => {
    const streakTag = node.streakPosition === 5 ? `<span class="tier-tag">Streak 5/5 (+2 mine)</span>` : `<span class="tier-tag">Streak ${node.streakPosition}/5</span>`;
    return `<div class="boost-applied-row is-yield oil-node-row"><div class="oil-node-header">${crimstoneRockIcon}<b>Crimstone Rock ${node.index}</b></div><div class="oil-node-detail">${streakTag}<span class="boost-total-value">+${fmt(node.qty)}</span>${crimstoneOreIcon}</div></div>`;
  }).join("");
  return `<div class="lib-section-title" style="margin-top:10px;">Nodes Yield</div>${rows}`;
}

export function renderPlantYieldNodeList(label, plotName, plantYieldGroups, produceIcon, nodeIcon) {
  if (!plantYieldGroups || !plantYieldGroups.length) return "";
  const count = plantYieldGroups.length;
  const totalQty = plantYieldGroups.reduce((sum, node) => sum + (typeof node.qty === "number" ? node.qty : 0), 0);
  const totalSeeds = plantYieldGroups.reduce((sum, node) => sum + (node.seedReward ? node.seedReward.amount : 0), 0);
  const qtyHtml = `<span class="boost-total-value">+${fmt(totalQty)}</span>${produceIcon}`;
  const seedHtml = totalSeeds > 0 ? ` <span class="tier-tag">🌱 Free Seeds <span class="boost-total-value">+${fmt(totalSeeds)}</span></span>` : "";
  const row = `<div class="boost-applied-row is-yield oil-node-row"><div class="oil-node-header">${nodeIcon}<b>${escapeHtml(plotName)} x${count}</b></div><div class="oil-node-detail">${qtyHtml}${seedHtml}</div></div>`;
  return `<div class="lib-section-title" style="margin-top:10px;">${escapeHtml(label)}</div>${row}`;
}

export function renderCardProductDetailRow(icon, name, yieldVal, grossVal, feeVal, baseYieldVal) {
  const yieldDisplay = baseYieldVal != null && baseYieldVal !== yieldVal ? `<s style="opacity:.55;">${fmt(baseYieldVal)}</s> ${fmt(yieldVal)} ⚡` : fmt(yieldVal);
  return `\n        <div class="animal-detail-stat is-yield-row animal-yield-block">\n          <span class="label">${icon} ${escapeHtml(name)}</span>\n          <div class="animal-yield-sublines">\n            <div class="animal-yield-subline"><span class="sublabel">Yield</span><span class="value">${yieldDisplay}</span></div>\n            <div class="animal-yield-subline"><span class="sublabel">Value</span><span class="value">${fmt(grossVal)} ${FLOWER_ICON}</span></div>\n            <div class="animal-yield-subline"><span class="sublabel">Tax</span><span class="value">${feeVal > 0 ? `-${fmt(feeVal)}` : "0"} ${FLOWER_ICON}</span></div>\n          </div>\n        </div>`;
}

export function renderAnimalCardProductDetailRow(icon, name, yieldVal, grossVal, feeVal, baseYieldVal) {
  const yieldDisplay = baseYieldVal != null && baseYieldVal !== yieldVal ? `<s style="opacity:.55;">${fmtAnimal(baseYieldVal)}</s> ${fmtAnimal(yieldVal)} ⚡` : fmtAnimal(yieldVal);
  return `\n        <div class="animal-detail-stat is-yield-row animal-yield-block">\n          <span class="label">${icon} ${escapeHtml(name)}</span>\n          <div class="animal-yield-sublines">\n            <div class="animal-yield-subline"><span class="sublabel">Yield</span><span class="value">${yieldDisplay}</span></div>\n            <div class="animal-yield-subline"><span class="sublabel">Value</span><span class="value">${fmtAnimal(grossVal)} ${FLOWER_ICON}</span></div>\n            <div class="animal-yield-subline"><span class="sublabel">Tax</span><span class="value">${feeVal > 0 ? `-${fmtAnimalCost(feeVal)}` : "0"} ${FLOWER_ICON}</span></div>\n          </div>\n        </div>`;
}

export function renderAnimalYieldGroupsList(card) {
  const groups = card.animalYieldGroups;
  if (!groups || !groups.length) return "";
  const animalIcon = getIcon(card.typeLabel);
  const rows = groups.map(g => {
    const feedIcon = g.feedToNextName ? getIcon(g.feedToNextName) : "";
    const xpTag = g.isMaxCycle ? `<span class="tier-tag">MAX</span>` : `<span class="tier-tag">XP ${fmtAnimal(g.xpMin)}${g.xpMax !== g.xpMin ? "–" + fmtAnimal(g.xpMax) : ""}/${fmtAnimal(g.nextThreshold)}</span>`;
    const feedToNextLine = g.feedsToNextCount > 0 ? `<div class="animal-yield-feed-note">🍽 Group needs <b>${fmtAnimal(g.feedsToNextCount)}</b> more feed${g.feedsToNextCount === 1 ? "" : "s"} total (${feedIcon} ${fmtAnimal(g.feedQtyToNext)} ${escapeHtml(g.feedToNextName || "")}) to bring all ${g.count} to ${escapeHtml(g.nextLevelLabel)}</div>` : `<div class="animal-yield-feed-note">✅ Fully fed for this cycle</div>`;
    const productLines = card.productNames.map((pname, idx) => {
      const val = g.yields[idx] || 0;
      return `<div class="animal-yield-subline"><span class="sublabel">${getIcon(pname)} ${escapeHtml(pname)}</span><span class="value">${fmtAnimal(val)}</span></div>`;
    }).join("");
    return `\n      <div class="boost-applied-row is-yield animal-yield-group-row">\n        <div class="animal-yield-group-head">\n          ${animalIcon} <b>${escapeHtml(card.typeLabel)}</b> <span class="boost-total-value">x${g.count}</span>\n          ${xpTag}\n          <span class="tier-tag">LVL ${g.level}</span>\n        </div>\n        ${feedToNextLine}\n        <div class="animal-yield-sublines">${productLines}</div>\n      </div>`;
  }).join("");
  return `<div class="lib-section-title" style="margin-top:10px;">Animal Yield</div>${rows}`;
}

export function renderFruitHarvestsLeftHtml(harvestsLeftCounts, fruitName, woodPerTree) {
  if (!harvestsLeftCounts) return "";
  const entries = Object.keys(harvestsLeftCounts).map(Number).sort((a, b) => a - b);
  if (!entries.length) return "";
  const treeIcon = getIcon(fruitName);
  const hasWood = typeof woodPerTree === "number" && woodPerTree > 1e-9;
  const woodNote = hasWood ? ` <span style="color:#000;">(${getIcon("Wood")} will drop ${fmt(woodPerTree)} Wood per tree once this harvest is claimed &amp; the tree is chopped)</span>` : ` <span style="color:#a12626;">(${getIcon("Wood")} won't drop any Wood when chopped — an active perk/skill fully offsets the Wood return)</span>`;
  const rows = entries.map(n => {
    const c = harvestsLeftCounts[n];
    const isFinal = n === 1;
    return `<div class="boost-applied-row is-yield">${treeIcon} <b>${c} tree${c === 1 ? "" : "s"}</b> with ${n} harvest${n === 1 ? "" : "s"} left${isFinal ? woodNote : ""}</div>`;
  }).join("");
  return `<div class="lib-section-title" style="margin-top:10px;">Harvests Left</div>${rows}`;
}

function boostTypeShortName(type) {
  const m = /^(Ancient|Sacred)\s+(.+)$/.exec(type);
  if (!m) return type;
  return m[0].split(/\s+/).map(w => w[0].toUpperCase()).join("");
}

function boostTypeChipHtml(count, type) {
  return `<span class="turnaround-boost-chip">+${count}${getIcon(type)}${escapeHtml(boostTypeShortName(type))}</span>`;
}

export function renderSeaBlessedBoostHtml(row) {
  const chain = row.seaBlessedChain;
  if (!chain) return "";
  const future = Array.isArray(chain.futureProcs) ? chain.futureProcs : [];
  if (!(chain.procCount > 0) && !future.length) return "";
  const title = `Sea Blessed (${chain.chance}%) rolls once per Salt harvest on the farm-wide Salt Harvested counter, starting at ${chain.startCounter}. Each proc restores 1 charge to up to 4 Salt Nodes below max, so restored charges can proc again. Which harvest procs is fixed by the counter; how many nodes a proc refills assumes you empty the nodes in order (Salt Rock 1 first) and harvest each charge the moment it is ready.`;
  let nowHtml = "";
  if (chain.procCount > 0) {
    const chips = [ `<span class="turnaround-boost-chip">${chain.procCount} ⚡ Proc${chain.procCount === 1 ? "" : "s"}</span>`, `<span class="turnaround-boost-chip">${chain.restoredTotal} ${getIcon("Salt Rock")} Charge${chain.restoredTotal === 1 ? "" : "s"} Restored</span>` ];
    nowHtml = `<div class="turnaround-boost-row">${chips.join("")}</div>`;
  }
  let futureHtml = "";
  if (future.length) {
    const rows = future.map(p => `<div class="turnaround-boost-row"><span class="turnaround-boost-chip">⚡ Harvest #${p.harvestNumber}</span><span class="turnaround-boost-chip">${p.inSec > 0 ? "in " + formatDuration(p.inSec) : "now"}</span></div>`).join("");
    const restoredList = future.map(p => p.restored).join(", ");
    futureHtml = `<div class="turnaround-boost-label" style="margin-top:5px;">Upcoming Procs</div>${rows}<div class="turnaround-boost-note">(restores ${restoredList} charge${future.length === 1 && future[0].restored === 1 ? "" : "s"}, not in totals)</div>`;
  }
  return `<div class="turnaround-boost-wrap"><div class="turnaround-boost-label" title="${escapeHtml(title)}">⚡ Sea Blessed Boost</div>${nowHtml}${futureHtml}</div>`;
}

export function renderTurnaroundBoostHtml(row) {
  const counts = row.turnaroundCountsByType;
  if (!counts) return "";
  const types = Object.keys(counts);
  if (!types.length) return "";
  const chipsRow = `<div class="turnaround-boost-row is-types">${types.map(type => boostTypeChipHtml(counts[type], type)).join("")}</div>`;
  return `<div class="turnaround-boost-wrap"><div class="turnaround-boost-label" title="Turnaround's PRNG counter is farm-wide per tree type, not per individual tree — so this predicts only the very next chop(s) of that type, whichever tree(s) you happen to chop first. It doesn't mean every tree of that type will regrow.">⚡ Turn Around Boost</div>${chipsRow}</div>`;
}

export function renderGoldInstantMineBoostHtml(row) {
  const types = row.goldInstantMineTypesPredicted;
  if (!types || !types.length) return "";
  const typeList = types.join(", ");
  const chipsRow = `<div class="turnaround-boost-row is-types">${types.map(type => boostTypeChipHtml(1, type)).join("")}</div>`;
  return `<div class="turnaround-boost-wrap"><div class="turnaround-boost-label" title="Pickaxe Shark's PRNG counter is farm-wide per Gold rock type, not per individual rock — so this predicts only the very next mine of that type, whichever rock you happen to mine first. It doesn't mean every rock of that type will instant-mine. The bonus mine's yield is estimated using the average Gold-per-mine (since its actual amount isn't rolled/stored until it happens) and is already folded into this card's Yield/Gross/Net totals.">⚡ Next ${escapeHtml(typeList)} Mine Instant (Pickaxe Shark)</div>${chipsRow}</div>`;
}

export function renderCrimstoneInstantMineBoostHtml(row) {
  if (!row.crimstoneInstantMinePredicted) return "";
  return `<div class="turnaround-boost-wrap"><div class="turnaround-boost-label" title="Crimstone Clam's PRNG counter is farm-wide across all Crimstone Rocks, not per individual rock — so this predicts only the very next mine, whichever rock you happen to mine first. It doesn't mean every rock will instant-recover. Each chained mine's yield is computed exactly (deterministic per mine streak position) and is already folded into this card's Yield/Gross/Net totals.">⚡ Next Crimstone Mine Instant (Crimstone Clam)</div></div>`;
}

export function renderBeehiveListHtml(honeyHiveDetails) {
  if (!honeyHiveDetails || !honeyHiveDetails.length) return "";
  const beehiveIcon = getIcon("Beehive");
  const honeyIcon = getIcon("Honey");
  const rows = honeyHiveDetails.map(h => `<div class="boost-applied-row is-yield">${beehiveIcon}<b>${escapeHtml(h.label)}</b> <span class="boost-total-value">${fmt(h.currentQty)}</span> <span style="color:var(--ink-soft);font-weight:600;">(${h.fillPct.toFixed(1)}%)</span>${honeyIcon}${h.willSwarm ? `<img src="${BEE_SWARM_ICON}" title="Will trigger a Bee Swarm once full &amp; harvested" style="width:13px;height:13px;vertical-align:-2px;image-rendering:pixelated;margin-left:4px;">` : ""}</div>`).join("");
  return `<div class="lib-section-title" style="margin-top:10px;">🐝 Bee Hives</div>${rows}`;
}

function attachFarmPanelCardToggles(wrap) {
  wrap.querySelectorAll(".card-toggle").forEach(el => {
    el.onclick = () => {
      const card = el.closest(".card");
      const name = card.getAttribute("data-search") || "";
      const nowExpanded = card.classList.toggle("expanded");
      if (nowExpanded) farmPanelExpandedNames.add(name); else farmPanelExpandedNames.delete(name);
    };
  });
}

export function renderFarmPanelTabContent() {
  const wrap = $("farmPanelTabContent");
  if (!wrap) return;
  const panelEl = $("farmSidePanel");
  if (!panelEl || !panelEl.classList.contains("open")) {
    __set_farmPanelTabContentDirty(true);
    return;
  }
  __set_farmPanelTabContentDirty(false);
  if (!farmPanelGameState) {
    wrap.innerHTML = `<div class="farm-panel-empty">Sync a Farm ID above to see what's growing and what's in your barn/shed.</div>`;
    const filterBarWrap = $("farmPanelFilterBarWrap");
    if (filterBarWrap) {
      filterBarWrap.innerHTML = "";
      filterBarWrap.style.display = "none";
    }
    return;
  }
  const cachedNoteHtml = farmPanelStateIsCached ? farmPanelSyncInFlight ? `<div class="farm-panel-empty">⏳ Showing saved data — syncing the latest farm data…</div>` : `<div class="farm-panel-empty">⚠️ Showing saved data — not synced yet. Tap sync to refresh.</div>` : "";
  withPreservedScroll(wrap, () => {
    const innerScrolls = {};
    wrap.querySelectorAll(".card[data-search]").forEach(card => {
      const details = card.querySelector(".card-details");
      if (details) innerScrolls[card.getAttribute("data-search")] = details.scrollTop;
    });
    if (farmPanelActiveTab === "inprogress") {
      const rows = farmPanelComputeInProgress(farmPanelGameState);
      const mutantAlerts = farmPanelDetectActiveMutants(farmPanelGameState);
      const mutantHtml = mutantAlerts.map(farmPanelRenderMutantAlertCard).join("");
      const moneyTreeBonus = farmPanelDetectMoneyTreeBonus(farmPanelGameState);
      const moneyTreeHtml = farmPanelRenderMoneyTreeBonusCard(moneyTreeBonus);
      const hasAlerts = mutantAlerts.length > 0 || moneyTreeBonus.totalCoins > 0 || moneyTreeBonus.predictedCoins > 0 || moneyTreeBonus.batchPredictions && moneyTreeBonus.batchPredictions.length > 0;
      const filterBarWrap = $("farmPanelFilterBarWrap");
      if (filterBarWrap) {
        filterBarWrap.innerHTML = rows.length ? farmPanelRenderCategoryFilterBar() : "";
        filterBarWrap.style.display = rows.length ? "" : "none";
      }
      const readyCardsHtml = rows.filter(farmPanelRowIsReady).map(farmPanelRenderInProgressRow).join("");
      const growingCardsHtml = rows.filter(r => !farmPanelRowIsReady(r)).map(farmPanelRenderInProgressRow).join("");
      const emptyAllHtml = rows.length ? "" : hasAlerts ? "" : `<div class="farm-panel-empty">Nothing currently growing, recharging, or ready to harvest right now.</div>`;
      const peteEmptyHtml = rows.some(r => r.isPeteQuestCard) ? "" : `<div class="fp-pete-empty"><span class="fp-quest-guide-trigger" data-pete-guide-trigger>How to set up the Telegram Quest Bot</span></div>`;
      wrap.innerHTML = cachedNoteHtml + mutantHtml + moneyTreeHtml + emptyAllHtml + `<div class="fp-inprogress-list" data-fp-filter="${farmPanelInProgressCategoryFilter}"><section class="guro-grow-section is-ready"><div class="guro-section-label">Ready to Harvest</div><div class="guro-section-list">${readyCardsHtml}</div><div class="guro-section-empty">Nothing ready to harvest here.</div></section><section class="guro-grow-section is-growing"><div class="guro-section-label">Growing</div><div class="guro-section-list">${growingCardsHtml}${peteEmptyHtml}</div><div class="guro-section-empty">Nothing growing here.</div></section></div>`;
      if (filterBarWrap) attachFarmPanelCategoryFilterBar(filterBarWrap, wrap);
      __set_farmPanelRenderAtMs(Date.now());
    } else {
      const filterBarWrap = $("farmPanelFilterBarWrap");
      if (filterBarWrap) {
        filterBarWrap.innerHTML = "";
        filterBarWrap.style.display = "none";
      }
      const rows = farmPanelComputeStocks(farmPanelGameState);
      wrap.innerHTML = cachedNoteHtml + (rows.length ? rows.map(farmPanelRenderStockRow).join("") : `<div class="farm-panel-empty">No harvested crops, fruit, or resources found in this farm's inventory.</div>`);
    }
    attachFarmPanelCardToggles(wrap);
    wrap.querySelectorAll(".card[data-search]").forEach(card => {
      const name = card.getAttribute("data-search");
      if (name in innerScrolls) {
        const details = card.querySelector(".card-details");
        if (details) details.scrollTop = innerScrolls[name];
      }
    });
  });
}

export function setFarmPanelTab(tab) {
  __set_farmPanelActiveTab(tab);
  $("farmTabInprogressBtn").classList.toggle("active", tab === "inprogress");
  $("farmTabStocksBtn").classList.toggle("active", tab === "stocks");
  renderFarmPanelTabContent();
}

function renderSyncTimingPanelBody() {
  let panel = document.getElementById("syncTimingPanel");
  if (!panel) {
    panel = document.createElement("div");
    panel.id = "syncTimingPanel";
    panel.style.cssText = "position:fixed;left:8px;right:8px;bottom:8px;max-height:60vh;overflow:auto;" + "background:#12121a;color:#e8e8f0;border:1px solid #444;border-radius:10px;padding:10px;" + "font:12px/1.5 monospace;z-index:99999;box-shadow:0 4px 18px rgba(0,0,0,.5);white-space:pre-wrap;";
    document.body.appendChild(panel);
  }
  if (!__lastSyncTiming) {
    panel.innerHTML = "";
    const empty = document.createElement("div");
    empty.style.cssText = "display:flex;justify-content:space-between;align-items:center;gap:8px;";
    const msg = document.createElement("span");
    msg.textContent = "⏱️ No sync timing yet — sync a farm first.";
    const closeBtn0 = document.createElement("button");
    closeBtn0.textContent = "✕";
    closeBtn0.style.cssText = "padding:4px 10px;border-radius:6px;border:1px solid #666;background:#222;color:#fff;font:12px sans-serif;";
    closeBtn0.onclick = () => closeSyncTimingPanel();
    empty.appendChild(msg);
    empty.appendChild(closeBtn0);
    panel.appendChild(empty);
    return;
  }
  const {farmId: farmId, marks: marks, errorMsg: errorMsg} = __lastSyncTiming;
  let prev = 0;
  const lines = marks.map(m => {
    const step = (m.at - prev).toFixed(0);
    prev = m.at;
    return `${m.label.padEnd(38)} +${step}ms  (t=${m.at.toFixed(0)}ms)`;
  });
  const text = `Sync timing — Farm #${farmId}${errorMsg ? " (FAILED: " + errorMsg + ")" : ""}\n` + lines.join("\n");
  panel.innerHTML = "";
  const header = document.createElement("div");
  header.style.cssText = "display:flex;justify-content:space-between;align-items:center;margin-bottom:6px;gap:8px;";
  const title = document.createElement("strong");
  title.textContent = `⏱️ Sync timing — Farm #${farmId}`;
  title.style.color = errorMsg ? "#ff8a8a" : "#8fffb0";
  const btnRow = document.createElement("div");
  const copyBtn = document.createElement("button");
  copyBtn.textContent = "Copy";
  copyBtn.style.cssText = "margin-right:6px;padding:4px 10px;border-radius:6px;border:1px solid #666;background:#222;color:#fff;font:12px sans-serif;";
  copyBtn.onclick = () => {
    const finish = ok => {
      copyBtn.textContent = ok ? "Copied!" : "Copy failed";
      setTimeout(() => copyBtn.textContent = "Copy", 1200);
    };
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).then(() => finish(true)).catch(() => finish(false));
    } else {
      try {
        const ta = document.createElement("textarea");
        ta.value = text;
        ta.style.position = "fixed";
        ta.style.opacity = "0";
        document.body.appendChild(ta);
        ta.focus();
        ta.select();
        const ok = document.execCommand("copy");
        document.body.removeChild(ta);
        finish(ok);
      } catch (e) {
        finish(false);
      }
    }
  };
  const closeBtn = document.createElement("button");
  closeBtn.textContent = "✕";
  closeBtn.style.cssText = "padding:4px 10px;border-radius:6px;border:1px solid #666;background:#222;color:#fff;font:12px sans-serif;";
  closeBtn.onclick = () => closeSyncTimingPanel();
  btnRow.appendChild(copyBtn);
  btnRow.appendChild(closeBtn);
  header.appendChild(title);
  header.appendChild(btnRow);
  panel.appendChild(header);
  const body = document.createElement("div");
  body.textContent = lines.join("\n") + (errorMsg ? `\n\n⚠️ Sync failed: ${errorMsg}` : "");
  panel.appendChild(body);
  if (errorMsg) {
    const errNote = document.createElement("div");
    errNote.style.cssText = "color:#ff8a8a;margin-top:6px;";
    errNote.textContent = "⚠️ Sync failed partway — timings above still show where it got to.";
    panel.appendChild(errNote);
  }
}

function closeSyncTimingPanel() {
  __set___syncTimingPanelOpen(false);
  const panel = document.getElementById("syncTimingPanel");
  if (panel) panel.remove();
  const toggle = document.getElementById("syncTimingToggle");
  if (toggle) toggle.classList.remove("open");
}

export function showSyncTimingPanel(farmId, marks, errorMsg) {
  __set___lastSyncTiming({
    farmId: farmId,
    marks: marks,
    errorMsg: errorMsg
  });
  console.log(`%c[sync timing] Farm #${farmId}`, "font-weight:bold");
  let prev = 0;
  for (const m of marks) {
    const step = (m.at - prev).toFixed(0);
    prev = m.at;
    console.log(`  ${m.label.padEnd(38)} +${step}ms  (t=${m.at.toFixed(0)}ms)`);
  }
  if (__syncTimingPanelOpen) renderSyncTimingPanelBody();
}

{
  const timingToggleBtn = document.getElementById("syncTimingToggle");
  if (timingToggleBtn) {
    timingToggleBtn.onclick = () => {
      __set___syncTimingPanelOpen(!__syncTimingPanelOpen);
      timingToggleBtn.classList.toggle("open", __syncTimingPanelOpen);
      if (__syncTimingPanelOpen) renderSyncTimingPanelBody(); else closeSyncTimingPanel();
    };
  }
}

export function renderLibraryLists() {
  invalidateCostCache();
  const toolWrap = $("toolLibList");
  const tools = toolRecipes;
  $("toolCount").textContent = tools.length ? `(${tools.length})` : "";
  toolWrap.innerHTML = tools.length ? tools.map(renderLibRow).join("") : `<div class="lib-empty">No tools added yet.</div>`;
  __markSub("    renderLibraryLists: tool rows");
  toolWrap.querySelectorAll(".lib-price-tap").forEach(el => el.onclick = () => openPriceEdit(el.dataset.id));
  toolWrap.querySelectorAll(".lib-edit-btn").forEach(el => el.onclick = () => openLibEditModal(el.dataset.id));
  toolWrap.querySelectorAll(".lib-delete-btn").forEach(el => el.onclick = () => openDeleteConfirm(el.dataset.id, "library"));
  __markSub("    renderLibraryLists: tool listeners");
  applyLibrarySearchFilter();
  __markSub("    renderLibraryLists: search filter");
  renderCropsList();
  __markSub("    renderLibraryLists: renderCropsList");
  renderFruitsList();
  __markSub("    renderLibraryLists: renderFruitsList");
  renderGreenhouseList();
  __markSub("    renderLibraryLists: renderGreenhouseList");
  loadBaseResourcesIfNeeded();
  __markSub("    renderLibraryLists: loadBaseResourcesIfNeeded");
  renderBaseCoinSummaryLists();
  __markSub("    renderLibraryLists: renderBaseCoinSummaryLists");
}

function renderBaseCoinResourceRow(name) {
  const data = RESOURCE_DATA[name];
  const fig = computeResourceFigures(name);
  const baseCoins = computeResourceBaseCostCoins(name);
  const boostNames = fig.activeBoosts.map(b => escapeHtml(b.name));
  const yieldChanged = Math.abs(fig.yieldPer - data.yieldPer) > 1e-4;
  const meta = `Tool: ${escapeHtml(fig.tool)} → yields ${fmt(fig.yieldPer)} ${escapeHtml(name)}${yieldChanged ? ` <span style="color:var(--ink-soft);font-weight:600;">(${fmt(data.yieldPer)} base)</span>` : ""}${boostNames.length ? ` · ⚡ ${boostNames.join(", ")}` : ""}`;
  return `\n  <div class="lib-item-row" data-search="${escapeHtml(name.toLowerCase())}">\n    <span class="lib-item-icon">${getIcon(name)}</span>\n    <div class="lib-item-main">\n      <div class="lib-item-name">${escapeHtml(name)}</div>\n      <div class="lib-item-meta">${meta}</div>\n    </div>\n    ${renderBaseCostPriceBlock(baseCoins, fig.costPerUnit, boostNames.length > 0)}\n  </div>`;
}

function renderBaseCoinCropRow(name) {
  const d = BASE_CROPS[name];
  const boosted = computeBoostedCropStats(name, d.baseYield, d.timeSec);
  const seedCoinCost = hasFreeCostBoost(name) ? 0 : d.seedCost || 0;
  const boostedCoins = seedCoinCost / boosted.yieldVal;
  const baseCoins = computeCropBaseCostCoins(name);
  const boostNames = boosted.activeBoosts.map(b => escapeHtml(b.name));
  const yieldChanged = Math.abs(boosted.yieldVal - d.baseYield) > 1e-4;
  const meta = `Seed: ${fmt(d.seedCost)} Coins → yields ${fmt(boosted.yieldVal)} ${escapeHtml(name)}${yieldChanged ? ` <span style="color:var(--ink-soft);font-weight:600;">(${fmt(d.baseYield)} base)</span>` : ""}${boostNames.length ? ` · ⚡ ${boostNames.join(", ")}` : ""}`;
  return `\n  <div class="lib-item-row" data-search="${escapeHtml(name.toLowerCase())}">\n    <span class="lib-item-icon">${getIcon(name)}</span>\n    <div class="lib-item-main">\n      <div class="lib-item-name">${escapeHtml(name)}</div>\n      <div class="lib-item-meta">${meta}</div>\n    </div>\n    ${renderBaseCostPriceBlock(baseCoins, boostedCoins, boostNames.length > 0)}\n  </div>`;
}

function renderBaseCoinFruitRow(name) {
  const d = BASE_FRUITS[name];
  const boosted = computeBoostedFruitStats(name, d.yieldPerHarvest || 1, d.timeSec, d.minHarvest || 1);
  const boostedCoins = getFruitCostCoins(name);
  const baseCoins = getFruitBaseCostCoins(name);
  const boostNames = boosted.activeBoosts.map(b => escapeHtml(b.name));
  const yieldChanged = Math.abs(boosted.yieldVal - (d.yieldPerHarvest || 1)) > 1e-4 || Math.abs(boosted.minHarvestVal - (d.minHarvest || 1)) > 1e-4;
  const meta = `Seed: ${fmt(d.seedCost)} Coins + ${fmt(d.axeQty)} Axe use → yields ${fmt(boosted.minHarvestVal)}× harvest, ${fmt(boosted.yieldVal)} ${escapeHtml(name)} each${yieldChanged ? ` <span style="color:var(--ink-soft);font-weight:600;">(${fmt(d.minHarvest)}× / ${fmt(d.yieldPerHarvest)} base)</span>` : ""}${boostNames.length ? ` · ⚡ ${boostNames.join(", ")}` : ""}`;
  return `\n  <div class="lib-item-row" data-search="${escapeHtml(name.toLowerCase())}">\n    <span class="lib-item-icon">${getIcon(name)}</span>\n    <div class="lib-item-main">\n      <div class="lib-item-name">${escapeHtml(name)}</div>\n      <div class="lib-item-meta">${meta}</div>\n    </div>\n    ${renderBaseCostPriceBlock(baseCoins, boostedCoins, boostNames.length > 0)}\n  </div>`;
}

function renderBaseCoinGreenhouseRow(name) {
  const d = BASE_GREENHOUSE[name];
  const boosted = computeBoostedGreenhouseStats(name, d.baseYield || 1, d.timeSec);
  const boostedCoins = getGreenhouseCostCoins(name);
  const baseCoins = getGreenhouseBaseCostCoins(name);
  const boostNames = boosted.activeBoosts.map(b => escapeHtml(b.name));
  const yieldChanged = Math.abs(boosted.yieldVal - (d.baseYield || 1)) > 1e-4;
  const meta = `Seed: ${fmt(d.seedCost)} Coins + ${fmt(d.oilQty)} Oil → yields ${fmt(boosted.yieldVal)} ${escapeHtml(name)}${yieldChanged ? ` <span style="color:var(--ink-soft);font-weight:600;">(${fmt(d.baseYield)} base)</span>` : ""}${boostNames.length ? ` · ⚡ ${boostNames.join(", ")}` : ""}`;
  return `\n  <div class="lib-item-row" data-search="${escapeHtml(name.toLowerCase())}">\n    <span class="lib-item-icon">${getIcon(name)}</span>\n    <div class="lib-item-main">\n      <div class="lib-item-name">${escapeHtml(name)}</div>\n      <div class="lib-item-meta">${meta}</div>\n    </div>\n    ${renderBaseCostPriceBlock(baseCoins, boostedCoins, boostNames.length > 0)}\n  </div>`;
}

function renderBaseCoinAnimalRow(type) {
  const cfg = ANIMAL_DATA[type];
  const fig = computeAnimalTypeFigures(type);
  const base = computeAnimalBaseCoinFigures(type);
  const boostNames = fig.activeBoosts.map(b => escapeHtml(b.name));
  const productNote = cfg.products.map((p, idx) => {
    const boostedY = fig.yields[idx];
    const baseY = base.yields[idx];
    const changed = Math.abs(boostedY - baseY) > 1e-4;
    return `${escapeHtml(p)} ${fmt(boostedY)}${changed ? ` <span style="color:var(--ink-soft);font-weight:600;">(${fmt(baseY)} base)</span>` : ""}`;
  }).join(", ");
  const meta = `Feed: ${fmt(fig.effectiveFeedQty)} ${escapeHtml(fig.feedNameUsed)} (Lv.${fig.level}) → yields ${productNote}${boostNames.length ? ` · ⚡ ${boostNames.join(", ")}` : ""}`;
  return `\n  <div class="lib-item-row" data-search="${escapeHtml(cfg.label.toLowerCase())}">\n    <span class="lib-item-icon"><span style="font-size:19.2px;line-height:1;">${getIcon(cfg.label)}</span></span>\n    <div class="lib-item-main">\n      <div class="lib-item-name">${escapeHtml(cfg.label)}</div>\n      <div class="lib-item-meta">${meta}</div>\n    </div>\n    ${renderBaseCostPriceBlock(base.costPerUnit, fig.costPerUnit, boostNames.length > 0)}\n  </div>`;
}

function renderBaseCoinHoneyRow() {
  const econ = computeHiveEconomics();
  const baseCoins = computeHoneyBaseCostCoins();
  const boostedCoins = econ.hiveStats.honeyPerHiveDay > 0 ? econ.costPerHiveDay / econ.hiveStats.honeyPerHiveDay * coinPerFlower : 0;
  const boostNames = [ ...econ.hiveStats.activeBoosts, ...econ.flowerStats.activeBoosts ].map(b => escapeHtml(b.name));
  const uniqueBoostNames = [ ...new Set(boostNames) ];
  const honeyChanged = Math.abs(econ.hiveStats.honeyPerHiveDay - 1) > 1e-4;
  const meta = `Active flower: ${escapeHtml(selectedHoneyFlower)} → yields ${fmt(econ.hiveStats.honeyPerHiveDay)} Honey/hive/day${honeyChanged ? ` <span style="color:var(--ink-soft);font-weight:600;">(1.00 base)</span>` : ""}${uniqueBoostNames.length ? ` · ⚡ ${uniqueBoostNames.join(", ")}` : ""}`;
  return `\n  <div class="lib-item-row" data-search="honey">\n    <span class="lib-item-icon">${getIcon("Honey")}</span>\n    <div class="lib-item-main">\n      <div class="lib-item-name">Honey</div>\n      <div class="lib-item-meta">${meta}</div>\n    </div>\n    ${renderBaseCostPriceBlock(baseCoins, boostedCoins, uniqueBoostNames.length > 0)}\n  </div>`;
}

export function renderBaseCoinSummaryLists() {
  const cropNames = Object.keys(BASE_CROPS);
  const cropWrap = $("baseCropLibList");
  $("baseCropCount").textContent = `(${cropNames.length})`;
  cropWrap.innerHTML = cropNames.map(renderBaseCoinCropRow).join("");
  __markSub("      renderBaseCoinSummaryLists: crops n=" + cropNames.length);
  const fruitNames = Object.keys(BASE_FRUITS);
  const fruitWrap = $("baseFruitLibList");
  $("baseFruitCount").textContent = `(${fruitNames.length})`;
  fruitWrap.innerHTML = fruitNames.map(renderBaseCoinFruitRow).join("");
  __markSub("      renderBaseCoinSummaryLists: fruits n=" + fruitNames.length);
  const greenhouseNames = Object.keys(BASE_GREENHOUSE);
  const greenhouseWrap = $("baseGreenhouseLibList");
  if (greenhouseWrap) {
    $("baseGreenhouseCount").textContent = `(${greenhouseNames.length})`;
    greenhouseWrap.innerHTML = greenhouseNames.map(renderBaseCoinGreenhouseRow).join("");
  }
  __markSub("      renderBaseCoinSummaryLists: greenhouse n=" + greenhouseNames.length);
  const resourceNames = Object.keys(RESOURCE_DATA);
  const resourceWrap = $("baseResourceLibList");
  $("baseResourceCount").textContent = `(${resourceNames.length})`;
  resourceWrap.innerHTML = resourceNames.map(renderBaseCoinResourceRow).join("");
  __markSub("      renderBaseCoinSummaryLists: resources n=" + resourceNames.length);
  const animalTypes = Object.keys(ANIMAL_DATA);
  const animalWrap = $("baseAnimalLibList");
  $("baseAnimalCount").textContent = `(${animalTypes.length})`;
  animalWrap.innerHTML = animalTypes.map(renderBaseCoinAnimalRow).join("");
  __markSub("      renderBaseCoinSummaryLists: animals n=" + animalTypes.length);
  const honeyWrap = $("baseHoneyLibList");
  $("baseHoneyCount").textContent = `(1)`;
  honeyWrap.innerHTML = renderBaseCoinHoneyRow();
  __markSub("      renderBaseCoinSummaryLists: honey");
  applyLibrarySearchFilter();
  __markSub("      renderBaseCoinSummaryLists: search filter");
}

function renderToolProduceNote(item) {
  const linkedResource = getResourceForTool(item.name);
  if (!linkedResource) return "";
  const data = RESOURCE_DATA[linkedResource];
  const boosted = computeBoostedResourceStats(linkedResource, data.yieldPer, data.timeSec);
  const yieldChanged = Math.abs(boosted.yieldVal - data.yieldPer) > 1e-4;
  const boostNames = boosted.activeBoosts.map(b => escapeHtml(b.name));
  return ` → produces <b>${escapeHtml(linkedResource)}</b>, yield ${fmt(boosted.yieldVal)}${yieldChanged ? ` <span style="color:var(--ink-soft);font-weight:600;">(${fmt(data.yieldPer)} base)</span>` : ""}${boostNames.length ? ` · ⚡ ${boostNames.join(", ")}` : ""}`;
}

function renderLibRow(item) {
  const priceCoins = getToolCostCoins(item.id);
  const priceFlower = coinsToFlower(priceCoins);
  const producedName = item.producesName || item.name;
  const icon = getIcon(producedName);
  const boosted = getBoostedToolRecipe(item);
  const hasBoost = item.locked && boosted.activeToolBoosts.length > 0;
  const boostNote = hasBoost ? ` · ⚡ ${boosted.activeToolBoosts.map(b => escapeHtml(b.name)).join(", ")}` : "";
  const baseCoins = item.locked ? getToolBaseCostCoins(item.id) : null;
  const showBase = hasBoost && Math.abs((baseCoins || 0) - priceCoins) > .001;
  const baseMetaNote = showBase ? ` <span style="color:var(--ink-soft);font-weight:600;">(${fmt(baseCoins)}${COIN_ICON} base)</span>` : "";
  const meta = `Craft: ${fmt(boosted.coinCost)} Coins${boosted.materials.length ? " + " + boosted.materials.map(m => `${fmt(m.qty)} ${escapeHtml(m.name)}`).join(", ") : ""} → yields ${fmt(item.producesQty)} ${escapeHtml(producedName)}${boostNote}${baseMetaNote}${renderToolProduceNote(item)}`;
  const lockBadge = item.locked ? ` <span title="Built-in tool — this is the game's base cost. Active boosts are applied automatically; it can't be hand-edited or removed." style="opacity:.55;">🔒</span>` : "";
  const priceBlock = item.locked ? `<div class="lib-item-price" title="${hasBoost ? "Base cost with boosts applied" : "Base cost (from game defaults)"}">${showBase ? `<span style="text-decoration:line-through;opacity:.5;font-size:.8em;">${fmt(baseCoins)}${COIN_ICON}</span> ` : ""}${fmt(priceCoins)}${COIN_ICON}<small>${fmt(priceFlower)} ${FLOWER_ICON}</small></div>` : `<div class="lib-item-price lib-price-tap" data-id="${item.id}" title="Tap to edit price">${fmt(priceCoins)}${COIN_ICON}<small>${fmt(priceFlower)} ${FLOWER_ICON}</small></div>`;
  return `\n  <div class="lib-item-row" data-search="${escapeHtml(item.name.toLowerCase())}">\n    <span class="lib-item-icon">${icon}</span>\n    <div class="lib-item-main">\n      <div class="lib-item-name">${escapeHtml(item.name)}${lockBadge}</div>\n      <div class="lib-item-meta">${meta}</div>\n    </div>\n    ${priceBlock}\n    <div class="lib-item-actions">\n      ${item.locked ? "" : `<button class="icon-btn lib-edit-btn" data-id="${item.id}" title="Edit">✏️</button>`}\n      ${item.locked ? "" : `<button class="icon-btn lib-delete-btn" data-id="${item.id}" title="Delete">🗑️</button>`}\n    </div>\n  </div>`;
}

function renderResourceTierBreakdown(name, boostedYieldPer, perTierYield) {
  const tiers = RESOURCE_NODE_TIERS[name];
  const t = getNodeTierCounts(name);
  const toolName = RESOURCE_DATA[name].tool;
  const aoeBoosts = getActiveBoostsForResource(name).filter(b => b.plotCap);
  const tiersWithAoeCoverage = new Set;
  aoeBoosts.forEach(b => {
    const alloc = allocateAoeAcrossTiers(name, b.plotCap);
    Object.keys(alloc).forEach(key => {
      if (alloc[key].affectedNodes > 0) tiersWithAoeCoverage.add(key);
    });
  });
  const rows = tiers.map(tier => {
    const qty = parseFloat(t[tier.key]) || 0;
    const perNodeYield = perTierYield && perTierYield[tier.key] != null ? perTierYield[tier.key] : boostedYieldPer;
    const nodeYield = tier.mult * perNodeYield + tier.yieldAdd;
    const aoeTag = tiersWithAoeCoverage.has(tier.key) ? ` <span style="color:var(--profit);font-weight:700;">🎯 AoE</span>` : "";
    return `\n    <div class="lib-item-row">\n      <span class="lib-item-icon">${getIcon(name)}</span>\n      <div class="lib-item-main">\n        <div class="lib-item-name">${getIcon(tier.displayLabel || tier.label)} ${tier.label}${tier.yieldAdd ? ` <span style="color:var(--profit);font-weight:700;">+${fmt(tier.yieldAdd)}</span>` : ""}${aoeTag}</div>\n        <div class="lib-item-meta">×${fmt(qty)} node${qty === 1 ? "" : "s"} · ${fmt(nodeYield)} ${name}/harvest${tier.mult > 1 ? ` · uses ${tier.mult} ${toolName}` : ""}</div>\n      </div>\n      <div class="lib-item-price">${fmt(qty * nodeYield)}<small>${name}/cyc</small></div>\n    </div>`;
  }).join("");
  return `<div class="lib-section-title">🔨 Node tiers</div>${rows}`;
}

function getFlowerMarketPrice(itemName) {
  const m = marketItems.find(x => (x.name || "").toLowerCase() === (itemName || "").toLowerCase());
  return m ? m.flowerPrice || 0 : 0;
}

function renderMaterialCycleRow(itemName, qty, flowerPrice, isYield, isExtendedCycle) {
  const yieldExtraClass = isYield && isExtendedCycle ? " lib-item-row-yield-24h" : "";
  return `\n        <div class="lib-item-row${isYield ? " lib-item-row-yield" + yieldExtraClass : ""}">\n          <span class="lib-item-icon">${getIcon(itemName)}</span>\n          <div class="lib-item-main">\n            <div class="lib-item-name">${isYield ? "Yield " : ""}${itemName} ×${fmt(qty)}${isYield ? "" : ` <span class="material-used-badge">Used Material</span>`}</div>\n            <div class="lib-item-meta">${fmt(qty * flowerPrice)} ${FLOWER_ICON} market value</div>\n          </div>\n        </div>`;
}

function renderMaterialSubtotalRow(totalValue, label) {
  return `\n        <div class="lib-item-row lib-item-row-subtotal">\n          <div class="lib-item-main">\n            <div class="lib-item-name">${label || "Total Value"}</div>\n          </div>\n          <div class="lib-item-price">${fmt(totalValue)}<small>${FLOWER_ICON}</small></div>\n        </div>`;
}

function renderMaterialCycleBreakdown(name, materials, toolUsagePerCycle, yieldPerCycle, cyclesPerX, cycleLabel) {
  const yieldFlowerPrice = getFlowerMarketPrice(name);
  const buildBlock = (matMult, yieldQty, isExtendedCycle, yieldSectionLabel) => {
    const matRows = materials.map(row => renderMaterialCycleRow(row.name, row.qty * matMult, getFlowerMarketPrice(row.name), false)).join("");
    const matTotal = materials.reduce((sum, row) => sum + row.qty * matMult * getFlowerMarketPrice(row.name), 0);
    const yieldRow = renderMaterialCycleRow(name, yieldQty, yieldFlowerPrice, true, isExtendedCycle);
    const yieldTotal = yieldQty * yieldFlowerPrice;
    return matRows + renderMaterialSubtotalRow(matTotal, "Total Value") + `<div class="lib-section-title">🧺 ${yieldSectionLabel}</div>` + yieldRow + renderMaterialSubtotalRow(yieldTotal, "Total Yield Value");
  };
  return `\n      <div class="lib-cycle-container">\n      <div class="lib-section-title lib-material-badge">📦 Material Used for 1 Cycle</div>\n      ${buildBlock(toolUsagePerCycle, yieldPerCycle, false, "Yield for 1 Cycle")}\n      </div>\n      <div class="lib-cycle-container">\n      <div class="lib-section-title lib-material-badge">📦 Material Used for ${fmt(cyclesPerX)} Cycle${cyclesPerX === 1 ? "" : "s"} (${cycleLabel})</div>\n      ${buildBlock(toolUsagePerCycle * cyclesPerX, yieldPerCycle * cyclesPerX, true, `Yield for ${fmt(cyclesPerX)} Cycle${cyclesPerX === 1 ? "" : "s"} (${cycleLabel})`)}\n      </div>`;
}

function renderResourceCard(name) {
  const fig = computeResourceFigures(name);
  const m = marketItems.find(x => (x.name || "").toLowerCase() === name.toLowerCase());
  const sellFlower = m ? m.flowerPrice || 0 : 0;
  const costFlower = coinsToFlower(fig.costPerUnit);
  const netSellFlower = sellFlower * (1 - feePercent / 100);
  const profitFlower = netSellFlower - costFlower;
  const isProfit = profitFlower >= 0;
  const roi = costFlower > 0 ? profitFlower / costFlower * 100 : 0;
  const isExpanded = expandedResources.has(name);
  const nodeCount = fig.nodeCount;
  const resourceManualCycleKey = "resource_" + name;
  const resourceManualCycle = getManualCycleOverride(resourceManualCycleKey);
  const proj = computeResourceProjection24h(fig, sellFlower, resourceManualCycle);
  const tiered = isTieredResource(name);
  const nodesLine = tiered ? `${fmt(nodeCount)} nodes (${fmt(fig.toolUsageTotal)} ${RESOURCE_DATA[name].tool}/cycle) = ${fmt(fig.totalYieldPerCycle)} ${name.toUpperCase()}` : `${fmt(nodeCount)} NODES × ${fmt(fig.yieldPer)} = ${fmt(nodeCount * fig.yieldPer)} ${name.toUpperCase()}`;
  return `\n  <div class="card ${isProfit ? "is-profit" : "is-loss"}${isExpanded ? " expanded" : ""}" data-search="${name.toLowerCase()}">\n<div class="card-toggle">\n      <div class="card-name-row">\n        <span class="card-icon">${getIcon(name)}</span>\n        <div>\n          <div class="card-name">${name}</div>\n          <div class="card-type">${fmt(fig.costPerUnit)}${COIN_ICON} tool cost / unit</div>\n        </div>\n      </div>\n      <div class="card-collapsed-profit">\n        ${fig.activeBoosts && fig.activeBoosts.length ? `<span class="boost-badge">⚡${fig.activeBoosts.length}</span>` : ""}\n        <span class="pvalue-mini ${isProfit ? "is-profit" : "is-loss"}">${isProfit ? "+" : ""}${fmt(profitFlower)} ${FLOWER_ICON} FLOWER</span>\n        <span class="chev">▾</span>\n      </div>\n    </div>\n    ${render24hBadge(proj.profit24h, proj.cost24h, proj.cyclesPerDay, `${fmt(nodeCount)} nodes · ${fmt(proj.cyclesPerDay)} cycles/day`, proj.restockCost24h, `${fmt(proj.unitsPerDay)} ${name}`, [ nodesLine, `${fmt(proj.cost24h)} ${FLOWER_ICON} FLOWER COST (24H) · <span style="color:var(--flower);">${fmt(proj.revenue24h)} ${FLOWER_ICON} FLOWER SELL (24H)</span>`, proj.boostedToolStock ? `${GEM_ICON} ${fmt(proj.restocksPerDay)} ${RESOURCE_DATA[name].tool} restock${proj.restocksPerDay === 1 ? "" : "s"}/day · stock cap ${fmt(proj.boostedToolStock)} (from boosts above)` : "" ], {
    itemName: RESOURCE_DATA[name].tool,
    restockItemName: RESOURCE_DATA[name].tool,
    unitCost: coinsToFlower(fig.totalToolCost),
    unitYield: fig.yieldPer,
    unitNetSell: netSellFlower,
    toolsPerCycle: fig.toolUsageTotal,
    yieldPerCycle: fig.totalYieldPerCycle,
    restockBaseStock: BASE_STOCK_TOOLS[RESOURCE_DATA[name].tool],
    restockKind: "tool"
  })}\n  <div class="card-details">\n      <div class="card-grid">\n        <div class="stat"><span class="label">Sell (market)</span><span class="value">${fmt(sellFlower)} ${FLOWER_ICON} FLOWER${feePercent > 0 ? ` <span style="color:var(--ink-soft);font-weight:600;">(${fmt(netSellFlower)} after ${feePercent}% fee)</span>` : ""}</span></div>\n        <div class="stat"><span class="label">Cost</span><span class="value">${fmt(costFlower)} ${FLOWER_ICON} FLOWER</span></div>\n        <div class="stat"><span class="label">Yield</span><span class="value">${fmt(fig.yieldPer)}</span></div>\n<div class="stat"><span class="label">Time</span><span class="value">${formatDuration(fig.timeSec)}${Math.round(fig.timeSec) !== Math.round(RESOURCE_DATA[name].timeSec) ? ` <span style="color:var(--ink-soft);font-weight:600;">(${formatDuration(RESOURCE_DATA[name].timeSec)} base)</span>` : ""}</span></div>\n      </div>\n      ${render24hTotalsGrid(proj.cost24h, proj.unitsPerDay * sellFlower, proj.revenue24h, proj.profit24h, (() => {
    const s = getActiveShrineDailyCost(fig.activeBoosts);
    const toolName = RESOURCE_DATA[name] && RESOURCE_DATA[name].tool;
    return {
      unitCost: coinsToFlower(fig.totalToolCost),
      restockCost24h: proj.restockCost24h,
      restockDetails: proj.restockDetails,
      restockNote: typeof getRestockExclusionNote === "function" ? getRestockExclusionNote(toolName) : "",
      shrineCost24h: s.total,
      shrineNames: s.shrines.map(x => x.name),
      shrineDetails: s.shrines,
      totalYield: proj.unitsPerDay,
      yieldLabel: name,
      unitLabel: "Total Nodes",
      unitCount: nodeCount,
      yieldPerCycle: tiered ? fig.totalYieldPerCycle : nodeCount * fig.yieldPer,
      totalCycles: proj.cyclesPerDay,
      manualCycleKey: resourceManualCycleKey,
      manualCycleValue: getManualCycleRawValue(resourceManualCycleKey),
      manualCycleAuto: proj.autoCyclesPerDay,
      manualCycleRefresh: "renderResourceList",
      perSeedLabel: "Profit / Unit",
      perSeedValue: profitFlower,
      perSeedIsProfit: isProfit,
      perSeedRoi: roi
    };
  })())}\n      ${tiered ? renderResourceTierBreakdown(name, fig.yieldPer, fig.perTierYield) : ""}\n      ${renderBoostAppliedList(fig.activeBoosts, name)}\n      <div class="recipe-materials-wrap">\n      <div class="lib-section-title">${getIcon(fig.tool)} ${fig.tool} recipe</div>\n      \n      ${fig.breakdown.map(row => {
    const displayPrice = row.mode === "buy" ? coinsToFlower(row.unitCost) : row.unitCost;
    const displayUnit = row.mode === "buy" ? FLOWER_ICON : COIN_ICON;
    return `\n        <div class="lib-item-row">\n          <span class="lib-item-icon">${getIcon(row.name)}</span>\n          <div class="lib-item-main">\n            <div class="lib-item-name">${row.name} ×${fmt(row.qty)}</div>\n            <div class="lib-item-meta">${row.mode === "collect" ? "Collect" : "Buy"} @ ${fmt(displayPrice)}${displayUnit}/u</div>\n          </div>\n          <div style="display:flex;gap:2px;">\n            ${row.name.toLowerCase() === "oil" ? `<span style="font-size:9.6px;opacity:.6;padding:4px 6px;">🚫 not tradable</span>` : `<button class="btn btn-ghost mode-btn" data-res="${name}" data-mat="${row.name}" data-mode="collect" style="padding:4px 6px;font-size:9.6px;${row.mode === "collect" ? "border-color:var(--profit);color:var(--profit);" : ""}">Collect</button>\n            <button class="btn btn-ghost mode-btn" data-res="${name}" data-mat="${row.name}" data-mode="buy" style="padding:4px 6px;font-size:9.6px;${row.mode === "buy" ? "border-color:var(--flower);color:var(--flower);" : ""}">Buy</button>`}\n          </div>\n        </div>`;
  }).join("")}\n      ${renderMaterialCycleBreakdown(name, fig.breakdown, fig.toolUsageTotal, fig.totalYieldPerCycle, proj.cyclesPerDay, "24h")}\n      </div>\n    </div>\n  </div>`;
}

function renderObsidianSeasonCard(season) {
  const fig = computeLavaPitFigures(season);
  const m = marketItems.find(x => (x.name || "").toLowerCase() === "obsidian");
  const sellFlower = m ? m.flowerPrice || 0 : 0;
  const netSellFlower = sellFlower * (1 - feePercent / 100);
  const costFlower = coinsToFlower(fig.costPerUnit);
  const profitFlower = netSellFlower - costFlower;
  const isProfit = profitFlower >= 0;
  const isCurrent = season === previewSeason;
  const inputsHiddenStyle = obsidianInputsHidden ? "display:none;" : "";
  return `\n  <div class="ob-season-card${isCurrent ? " is-current" : ""}" style="${isCurrent ? `border-color:${SEASON_ACCENT[season]};` : ""}">\n    <div class="ob-season-head">\n      <span style="font-size:19.2px;">${SEASON_EMOJI[season]}</span>\n      <div>\n        <div class="ob-season-name">${season}</div>\n        <div class="ob-season-sub">${getIcon("Obsidian")} Lava Pit recipe</div>\n      </div>\n    </div>\n    <div class="ob-stat-box">\n      <div class="ob-stat-label">Net <span style="text-transform:none;font-weight:600;opacity:.75;">(already less sell fee)</span></div>\n      <div class="ob-stat-value">${fmt(netSellFlower)} ${FLOWER_ICON} FLOWER</div>\n      <div class="ob-stat-sub">Market Price ${fmt(sellFlower)} ${FLOWER_ICON} FLOWER</div>\n    </div>\n    <div class="ob-stat-box">\n      <div class="ob-stat-label">Profit</div>\n      <div class="ob-stat-value ${isProfit ? "is-profit" : "is-loss"}">${isProfit ? "+" : ""}${fmt(profitFlower)}</div>\n      <div class="ob-stat-sub">${fmt(costFlower)} / obsidian</div>\n    </div>\n    <div class="ob-stat-box">\n      <div class="ob-stat-label">Cost</div>\n      <div class="ob-stat-value is-loss">${fmt(costFlower)}</div>\n      <div class="ob-stat-sub">${fig.breakdown.length} inputs</div>\n    </div>\n    <div class="ob-stat-box">\n      <div class="ob-stat-label">Yield</div>\n      <div class="ob-stat-value">${fmt(fig.yieldVal)}</div>\n      <div class="ob-stat-sub">Per cycle</div>\n    </div>\n    <div class="ob-stat-box">\n      <div class="ob-stat-label">Time</div>\n      <div class="ob-stat-value">${formatDuration(fig.timeSec)}</div>\n      <div class="ob-stat-sub">Lava Pit</div>\n    </div>\n    <div style="${inputsHiddenStyle}">\n      <div class="lib-section-title">🧾 Recipe</div>\n      ${fig.breakdown.map(row => {
    const displayPrice = row.mode === "buy" ? coinsToFlower(row.unitCost) : row.unitCost;
    const displayUnit = row.mode === "buy" ? FLOWER_ICON : COIN_ICON;
    const modeLabel = row.mode === "buy" ? "market" : "collect";
    return `\n        <div class="lib-item-row">\n          <span class="lib-item-icon">${getIcon(row.name)}</span>\n          <div class="lib-item-main">\n            <div class="lib-item-name">${row.name} ×${fmt(row.qty)}</div>\n            <div class="lib-item-meta">${modeLabel} @ ${fmt(displayPrice)}${displayUnit}/u</div>\n          </div>\n          <div style="display:flex;flex-direction:column;align-items:flex-end;gap:2px;">\n            <div class="lib-item-price">${fmt(row.lineCost)}<small>${COIN_ICON}</small></div>\n            <div style="display:flex;gap:2px;">\n              ${row.name.toLowerCase() === "oil" ? `<span style="font-size:9.6px;opacity:.6;padding:4px 6px;">🚫 not tradable</span>` : `<button class="btn btn-ghost mode-btn" data-res="Obsidian_${season}" data-mat="${row.name}" data-mode="collect" style="padding:4px 6px;font-size:9.6px;${row.mode === "collect" ? "border-color:var(--profit);color:var(--profit);" : ""}">Collect</button>\n              <button class="btn btn-ghost mode-btn" data-res="Obsidian_${season}" data-mat="${row.name}" data-mode="buy" style="padding:4px 6px;font-size:9.6px;${row.mode === "buy" ? "border-color:var(--flower);color:var(--flower);" : ""}">Buy</button>`}\n            </div>\n          </div>\n        </div>`;
  }).join("")}\n    </div>\n  </div>`;
}

function renderObsidianSection() {
  const isExpanded = expandedResources.has("obsidian");
  const currentFig = computeLavaPitFigures(previewSeason);
  const m = marketItems.find(x => (x.name || "").toLowerCase() === "obsidian");
  const sellFlower = m ? m.flowerPrice || 0 : 0;
  const obsidianManualCycleKey = "obsidian_week";
  const obsidianManualCycle = getManualCycleOverride(obsidianManualCycleKey);
  const weekly = computeObsidianWeeklyProfit(currentFig, sellFlower, obsidianManualCycle);
  const isWeeklyProfit = weekly.profit >= 0;
  const cycleNetSellFlower = sellFlower * (1 - feePercent / 100);
  const cycleCostFlower = coinsToFlower(currentFig.costPerUnit);
  const cycleProfitFlower = cycleNetSellFlower - cycleCostFlower;
  const isProfit = cycleProfitFlower >= 0;
  const lavaPitCount = getNodeCount("Lava Pit");
  const nodesLine = `${fmt(lavaPitCount)} LAVA PIT${lavaPitCount === 1 ? "" : "S"} × ${fmt(currentFig.yieldVal)} = ${fmt(lavaPitCount * currentFig.yieldVal)} OBSIDIAN/CYCLE`;
  const weeklyYieldLine = `<div class="card-24h-yield">📦 WEEKLY YIELD <span class="card-24h-sub">${fmt(weekly.produced)} produced · ${fmt(weekly.sellable)} sellable (cap ${OBSIDIAN_WEEKLY_SELL_CAP})</span></div>`;
  const weeklyBox = `<div class="card-24h-box ${isWeeklyProfit ? "is-profit" : "is-loss"}">\n    <div class="card-24h-box-label">🌋 WEEKLY PROFIT</div>\n    <div class="card-24h-line">${nodesLine}</div>\n    <div class="card-24h-line">${fmt(weekly.cost)} ${FLOWER_ICON} FLOWER COST (WEEKLY) · <span style="color:var(--flower);">${fmt(weekly.revenue)} ${FLOWER_ICON} FLOWER SELL (WEEKLY)</span></div>\n    <div class="card-24h ${isWeeklyProfit ? "is-profit" : "is-loss"}">${isWeeklyProfit ? "+" : ""}${fmt(weekly.profit)} ${FLOWER_ICON} FLOWER <span class="card-24h-sub">max ${OBSIDIAN_WEEKLY_SELL_CAP}/week</span></div>\n    ${weeklyYieldLine}\n  </div>`;
  return `\n  <div class="card ${isProfit ? "is-profit" : "is-loss"}${isExpanded ? " expanded" : ""}" data-search="obsidian">\n    <div class="card-toggle">\n      <div class="card-name-row">\n        <span class="card-icon">${getIcon("Obsidian")}</span>\n        <div>\n          <div class="card-name">Obsidian</div>\n          <div class="card-type">${fmt(currentFig.costPerUnit)}${COIN_ICON} tool cost / unit</div>\n        </div>\n      </div>\n      <div class="card-collapsed-profit">\n        ${currentFig.activeBoosts && currentFig.activeBoosts.length ? `<span class="boost-badge">⚡${currentFig.activeBoosts.length}</span>` : ""}\n        <span class="pvalue-mini ${isProfit ? "is-profit" : "is-loss"}">${isProfit ? "+" : ""}${fmt(cycleProfitFlower)} ${FLOWER_ICON} FLOWER</span>\n        <span class="chev">▾</span>\n      </div>\n    </div>\n    ${weeklyBox}\n    <div class="card-details">\n      <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:2px;">\n        <span style="font-size:9.6px;color:var(--ink-soft);">Showing ${SEASON_ORDER.length} seasonal recipes</span>\n        <button type="button" class="ob-inputs-toggle" id="obsidianInputsToggle">${obsidianInputsHidden ? "Show Inputs" : "Hide Inputs"}</button>\n      </div>\n      <div class="ob-summary-box" style="margin-bottom:6px;">\n        🌋 Lava Pits: <b>${fmt(getNodeCount("Lava Pit"))}</b> ·\n        Produced/week: <b>${fmt(weekly.produced)}</b> ·\n        Sellable (cap ${OBSIDIAN_WEEKLY_SELL_CAP}): <b>${fmt(weekly.sellable)}</b>\n        <div style="font-size:7.8px;margin-top:3px;opacity:.8;">Only ${OBSIDIAN_WEEKLY_SELL_CAP} obsidian can be listed/sold per player per week on the Marketplace (any season) — 24h profit doesn't apply here. Buying is capped separately at ${OBSIDIAN_WEEKLY_PURCHASE_CAP}/week.</div>\n      </div>\n      ${renderBoostAppliedList(currentFig.activeBoosts, "Obsidian")}\n      ${(() => {
    const s = getActiveShrineDailyCost(currentFig.activeBoosts);
    return renderTotalsBreakdown({
      title: "7 Days Total",
      totalYield: weekly.sellable,
      yieldLabel: "Obsidian",
      gross: weekly.sellable * sellFlower,
      baseCost: weekly.cost,
      restockCost: 0,
      shrineCost: s.total * 7,
      shrineNames: s.shrines.map(x => x.name),
      sellFee: weekly.sellable * sellFlower - weekly.revenue,
      totalCycles: weekly.cyclesPerWeek,
      totalCyclesSuffix: "/week",
      manualCycleKey: obsidianManualCycleKey,
      manualCycleValue: getManualCycleRawValue(obsidianManualCycleKey),
      manualCycleAuto: weekly.autoCyclesPerWeek,
      manualCycleRefresh: "renderResourceList"
    });
  })()}\n      <div class="ob-season-scroll">\n        ${SEASON_ORDER.map(renderObsidianSeasonCard).join("")}\n      </div>\n    </div>\n  </div>`;
}

export function renderResourceList() {
  const wrap = $("resourceItemList");
  if (!wrap) return;
  invalidateCostCache();
  loadBaseResourcesIfNeeded();
  withPreservedCardScrolls(wrap, () => {
    wrap.innerHTML = Object.keys(RESOURCE_DATA).map(renderResourceCard).join("") + renderObsidianSection();
  });
  wrap.querySelectorAll(".card-toggle, .card-24h-box").forEach(el => {
    el.onclick = () => {
      const card = el.closest(".card");
      const name = card.dataset.search;
      const match = Object.keys(RESOURCE_DATA).find(n => n.toLowerCase() === name) || name;
      if (expandedResources.has(match)) expandedResources.delete(match); else expandedResources.add(match);
      card.classList.toggle("expanded");
    };
  });
  const obInputsToggle = $("obsidianInputsToggle");
  if (obInputsToggle) {
    obInputsToggle.onclick = e => {
      e.stopPropagation();
      __set_obsidianInputsHidden(!obsidianInputsHidden);
      withPreservedResourceScroll(wrap, "obsidian", renderResourceList);
    };
  }
  wrap.querySelectorAll(".mode-btn").forEach(btn => {
    btn.onclick = e => {
      e.stopPropagation();
      const cardKey = btn.closest(".card") ? btn.closest(".card").dataset.search : null;
      setMaterialMode(btn.dataset.res, btn.dataset.mat, btn.dataset.mode);
      withPreservedResourceScroll(wrap, cardKey, renderResourceList);
      renderMarketList();
      renderFruitsList();
      updateCalcSummary();
    };
  });
}

function renderCropCard(name) {
  const costCoins = getCropCostCoins(name);
  const costFlower = coinsToFlower(costCoins);
  const m = marketItems.find(x => (x.name || "").toLowerCase() === name.toLowerCase());
  const sellFlower = m ? m.flowerPrice || 0 : 0;
  const netSellFlower = sellFlower * (1 - feePercent / 100);
  const profitFlower = netSellFlower - costFlower;
  const isProfit = profitFlower >= 0;
  const roi = costFlower > 0 ? profitFlower / costFlower * 100 : 0;
  const d = BASE_CROPS[name];
  const inSeason = isCropInSeason(name);
  const isExpanded = expandedCrops.has(name);
  const boosted = computeBoostedCropStats(name, d.baseYield || 1, d.timeSec);
  const plotCount = getPlotCount(name);
  const boostListHtml = renderBoostAppliedList(boosted.activeBoosts, name);
  const cropManualCycleKey = "crop_" + name;
  const cropManualCycle = getManualCycleOverride(cropManualCycleKey);
  const proj = compute24hProjection(boosted.yieldVal, boosted.timeVal, costFlower, sellFlower, plotCount, {
    baseStock: BASE_STOCK_CROPS[name],
    kind: "seed",
    itemName: name
  }, cropManualCycle);
  const tierTag = `<span class="tier-tag tier-${(d.tier || "").toLowerCase()}">${d.tier}</span>`;
  const seasonBadges = renderCropSeasonBadges(name);
  const lockNote = inSeason ? "" : `<div class="lock-note">🔒 Not growable in ${previewSeason} — grows in ${getCropSeasons(name).join(", ")}</div>`;
  return `\n  <div class="card ${isProfit ? "is-profit" : "is-loss"}${inSeason ? "" : " is-locked"}${isExpanded ? " expanded" : ""}" data-search="${name.toLowerCase()}" data-tier="${d.tier || ""}" data-crop-name="${escapeHtml(name)}">\n    <div class="card-toggle">\n      <div class="card-name-row">\n        <span class="card-icon">${getIcon(name)}${inSeason ? "" : ' <span class="lock-icon">🔒</span>'}</span>\n        <div>\n          <div class="card-name">${name} ${tierTag} ${seasonBadges}</div>\n          <div class="card-type">${fmt(costCoins)}${COIN_ICON} seed cost</div>\n          ${lockNote}\n        </div>\n      </div>\n      <div class="card-collapsed-profit">\n        ${boosted.activeBoosts.length ? `<span class="boost-badge">⚡${boosted.activeBoosts.length}</span>` : ""}\n        <span class="pvalue-mini ${isProfit ? "is-profit" : "is-loss"}">${isProfit ? "+" : ""}${fmt(profitFlower)} ${FLOWER_ICON} FLOWER</span>\n        <span class="chev">▾</span>\n      </div>\n    </div>\n    ${render24hBadge(proj.profit24h, proj.cost24h, proj.cyclesPerDay, `${fmt(plotCount)} plots · ${fmt(proj.cyclesPerDay)} cycles/day`, proj.restockCost24h, `${fmt(proj.unitsPerDay)} ${name}`, [ `${fmt(plotCount)} PLOTS × ${fmt(boosted.yieldVal)} = ${fmt(plotCount * boosted.yieldVal)} ${name.toUpperCase()}`, `${fmt(proj.cost24h)} ${FLOWER_ICON} FLOWER COST (24H) · <span style="color:var(--flower);">${fmt(proj.revenue24h)} ${FLOWER_ICON} FLOWER SELL (24H)</span>` ], {
    itemName: `${name} Seed`,
    restockItemName: name,
    unitCost: costFlower,
    unitYield: boosted.yieldVal,
    unitNetSell: netSellFlower,
    plotCount: plotCount,
    restockBaseStock: BASE_STOCK_CROPS[name],
    restockKind: "seed",
    simulateStock: stockQty => simulateStockCycles(pc => computeBoostedCropStats(name, d.baseYield || 1, d.timeSec, pc), plotCount, stockQty)
  })}\n    <div class="card-details">\n      <div class="card-grid">\n        <div class="stat"><span class="label">Sell (market)</span><span class="value">${fmt(sellFlower)} ${FLOWER_ICON} FLOWER${feePercent > 0 ? ` <span style="color:var(--ink-soft);font-weight:600;">(${fmt(netSellFlower)} after ${feePercent}% fee)</span>` : ""}</span></div>\n        <div class="stat"><span class="label">Cost</span><span class="value">${fmt(costFlower)} ${FLOWER_ICON} FLOWER</span></div>\n        <div class="stat"><span class="label">Yield</span><span class="value">${fmt(boosted.yieldVal)}</span></div>\n<div class="stat"><span class="label">Time</span><span class="value">${formatDuration(boosted.timeVal)}${Math.round(boosted.timeVal) !== Math.round(d.timeSec) ? ` <span style="color:var(--ink-soft);font-weight:600;">(${formatDuration(d.timeSec)} base)</span>` : ""}</span></div>\n      </div>\n      ${render24hTotalsGrid(proj.cost24h, proj.unitsPerDay * sellFlower, proj.revenue24h, proj.profit24h, (() => {
    const s = getActiveShrineDailyCost(boosted.activeBoosts);
    return {
      unitCost: costFlower,
      restockCost24h: proj.restockCost24h,
      restockDetails: proj.restockDetails,
      restockNote: typeof getRestockExclusionNote === "function" ? getRestockExclusionNote(name) : "",
      shrineCost24h: s.total,
      shrineNames: s.shrines.map(x => x.name),
      shrineDetails: s.shrines,
      totalYield: proj.unitsPerDay,
      yieldLabel: name,
      unitLabel: "Total Plots",
      unitCount: plotCount,
      yieldPerCycle: plotCount * boosted.yieldVal,
      totalCycles: proj.cyclesPerDay,
      manualCycleKey: cropManualCycleKey,
      manualCycleValue: getManualCycleRawValue(cropManualCycleKey),
      manualCycleAuto: proj.autoCyclesPerDay,
      manualCycleRefresh: "renderCropsList",
      perSeedLabel: "Profit / Seed",
      perSeedValue: profitFlower,
      perSeedIsProfit: isProfit,
      perSeedRoi: roi
    };
  })())}\n      ${boostListHtml}\n    </div>\n  </div>`;
}

export function renderCropsList() {
  const wrap = $("cropsItemList");
  if (!wrap) return;
  invalidateCostCache();
  loadBaseCropsIfNeeded();
  const names = Object.keys(BASE_CROPS).filter(name => (cropTierFilter === "All" || BASE_CROPS[name].tier === cropTierFilter) && isCropInSeason(name));
  __markSub("      renderCropsList: n=" + names.length);
  withPreservedCardScrolls(wrap, () => {
    wrap.innerHTML = names.map(renderCropCard).join("");
  });
  __markSub("      renderCropsList: cards built");
  wrap.querySelectorAll(".card-toggle, .card-24h-box").forEach(el => {
    const card = el.closest(".card");
    if (card.classList.contains("is-locked")) {
      el.onclick = () => toast(`🔒 ${card.dataset.cropName || "This crop"} isn't in season right now — switch the season above to see it.`);
      return;
    }
    el.onclick = () => {
      const name = card.dataset.cropName || card.dataset.search;
      if (expandedCrops.has(name)) expandedCrops.delete(name); else expandedCrops.add(name);
      card.classList.toggle("expanded");
    };
  });
}

function renderFruitCard(name) {
  const d = BASE_FRUITS[name];
  const fs = {
    yieldPerHarvest: d.yieldPerHarvest,
    minHarvest: d.minHarvest
  };
  const costCoins = getFruitCostCoins(name);
  const costFlower = coinsToFlower(costCoins);
  const m = marketItems.find(x => (x.name || "").toLowerCase() === name.toLowerCase());
  const sellFlower = m ? m.flowerPrice || 0 : 0;
  const netSellFlower = sellFlower * (1 - feePercent / 100);
  const profitFlower = netSellFlower - costFlower;
  const isProfit = profitFlower >= 0;
  const roi = costFlower > 0 ? profitFlower / costFlower * 100 : 0;
  const boosted = computeBoostedFruitStats(name, fs.yieldPerHarvest || 1, d.timeSec, fs.minHarvest || 1);
  const totalYield = boosted.minHarvestVal * boosted.yieldVal;
  const boostListHtml = renderBoostAppliedList(boosted.activeBoosts, name);
  const axeQty = d.axeQty || 0;
  const woodReturnQty = Math.max(0, (d.woodReturnQty || 0) - (boosted.woodReturnPenalty || 0) + (boosted.woodReturnAdd || 0));
  const axeCoinCost = boosted.noWoodCost ? 0 : axeQty * (RESOURCE_DATA.Wood.toolCoinCost || 0);
  const mode = getMaterialMode("Fruit_" + name, "Wood");
  const woodRebateCoins = woodReturnQty * getMaterialUnitCostCoins("Wood", mode);
  const woodDisplayPrice = mode === "buy" ? coinsToFlower(woodRebateCoins) : woodRebateCoins;
  const woodDisplayUnit = mode === "buy" ? FLOWER_ICON : COIN_ICON;
  const isExpanded = expandedFruits.has(name);
  const fruitCount = getFruitCount(name);
  const fruitManualCycleKey = "fruit_" + name;
  const fruitManualCycle = getManualCycleOverride(fruitManualCycleKey);
  const proj = compute24hProjection(boosted.yieldVal, boosted.timeVal, costFlower, sellFlower, fruitCount, {
    baseStock: BASE_STOCK_FRUITS[name],
    kind: "seed",
    itemName: name,
    cyclesPerStockUnit: boosted.minHarvestVal,
    maxRestocksPerDay: d.moonOnly ? 1 / SYNODIC_MONTH_DAYS : undefined
  }, fruitManualCycle);
  return `\n  <div class="card ${isProfit ? "is-profit" : "is-loss"}${isExpanded ? " expanded" : ""}" data-search="${name.toLowerCase()}">\n  \n    <div class="card-toggle">\n      <div class="card-name-row">\n        <span class="card-icon">${getIcon(name)}</span>\n        <div>\n          <div class="card-name">${name} ${renderFruitSeasonBadges(name)}${d.moonOnly ? ` <span style="font-size:10.8px;font-weight:700;color:${isFullMoonToday() ? "var(--profit)" : "var(--ink-soft)"};">🌕 ${isFullMoonToday() ? `Full Moon today — ${fmt(fullMoonSeedStockQty(name))} seed${fullMoonSeedStockQty(name) === 1 ? "" : "s"} buyable!` : `Moon-fruit — Betty sells ${fmt(fullMoonSeedStockQty(name))} seed${fullMoonSeedStockQty(name) === 1 ? "" : "s"} on a real Full Moon Day`}</span>` : ""}</div>\n          <div class="card-type">${fmt(costCoins)}${COIN_ICON} tool cost / unit</div>\n        </div>\n      </div>\n      <div class="card-collapsed-profit">\n        ${boosted.activeBoosts.length ? `<span class="boost-badge">⚡${boosted.activeBoosts.length}</span>` : ""}\n        <span class="pvalue-mini ${isProfit ? "is-profit" : "is-loss"}">${isProfit ? "+" : ""}${fmt(profitFlower)} ${FLOWER_ICON} FLOWER</span>\n        <span class="chev">▾</span>\n      </div>\n    </div>\n    ${render24hBadge(proj.profit24h, proj.cost24h, proj.cyclesPerDay, `${fmt(fruitCount)} fruit patch · ${fmt(proj.cyclesPerDay)} cycles/day`, proj.restockCost24h, `${fmt(proj.unitsPerDay)} ${name}`, [ `${fmt(boosted.minHarvestVal)} HARVESTS × ${fmt(boosted.yieldVal)} = ${fmt(totalYield)} ${name.toUpperCase()}`, `${fmt(proj.cost24h)} ${FLOWER_ICON} FLOWER COST (24H) · <span style="color:var(--flower);">${fmt(proj.revenue24h)} ${FLOWER_ICON} FLOWER SELL (24H)</span>` ], {
    itemName: `${name} Seed`,
    restockItemName: name,
    unitCost: costFlower,
    unitYield: totalYield,
    unitNetSell: netSellFlower,
    plotCount: fruitCount,
    restockBaseStock: BASE_STOCK_FRUITS[name],
    restockKind: "seed",
    simulateStock: stockQty => simulateStockCycles(pc => {
      const b = computeBoostedFruitStats(name, fs.yieldPerHarvest || 1, d.timeSec, fs.minHarvest || 1, pc);
      return {
        yieldVal: b.minHarvestVal * b.yieldVal,
        timeVal: b.timeVal
      };
    }, fruitCount, stockQty)
  })}\n    <div class="card-details">\n      <div class="card-grid">\n        <div class="stat"><span class="label">Sell (market)</span><span class="value">${fmt(sellFlower)} ${FLOWER_ICON} FLOWER${feePercent > 0 ? ` <span style="color:var(--ink-soft);font-weight:600;">(${fmt(netSellFlower)} after ${feePercent}% fee)</span>` : ""}</span></div>\n        <div class="stat"><span class="label">Cost / unit</span><span class="value">${fmt(costFlower)} ${FLOWER_ICON} FLOWER</span></div>\n        <div class="stat"><span class="label">Yield / harvest</span><span class="value">${fmt(boosted.yieldVal)}</span></div>\n        <div class="stat"><span class="label">Time / harvest</span><span class="value">${formatDuration(boosted.timeVal)}${Math.round(boosted.timeVal) !== Math.round(d.timeSec) ? ` <span style="color:var(--ink-soft);font-weight:600;">(${formatDuration(d.timeSec)} base)</span>` : ""}</span></div>\n      </div>\n      ${render24hTotalsGrid(proj.cost24h, proj.unitsPerDay * sellFlower, proj.revenue24h, proj.profit24h, (() => {
    const s = getActiveShrineDailyCost(boosted.activeBoosts);
    return {
      unitCost: costFlower,
      restockCost24h: proj.restockCost24h,
      restockDetails: proj.restockDetails,
      restockNote: typeof getRestockExclusionNote === "function" ? getRestockExclusionNote(name) : "",
      shrineCost24h: s.total,
      shrineNames: s.shrines.map(x => x.name),
      shrineDetails: s.shrines,
      totalYield: proj.unitsPerDay,
      yieldLabel: name,
      unitLabel: "Total Fruit Patch",
      unitCount: fruitCount,
      yieldPerCycle: fruitCount * boosted.yieldVal,
      totalCycles: proj.cyclesPerDay,
      manualCycleKey: fruitManualCycleKey,
      manualCycleValue: getManualCycleRawValue(fruitManualCycleKey),
      manualCycleAuto: proj.autoCyclesPerDay,
      manualCycleRefresh: "renderFruitsList",
      perSeedLabel: "Profit / Unit",
      perSeedValue: profitFlower,
      perSeedIsProfit: isProfit,
      perSeedRoi: roi
    };
  })())}\n      ${boostListHtml}\n     <div class="lib-item-row">\n        <span class="lib-item-icon">${getIcon("Axe")}</span>\n        <div class="lib-item-main">\n          <div class="lib-item-name">Axe ×${fmt(axeQty)} <span style="font-weight:400;color:var(--ink-soft);">(clear dead tree)</span></div>\n          <div class="lib-item-meta">${boosted.noWoodCost ? "Free (Foreman Beaver)" : `Cost: ${fmt(axeCoinCost)}${COIN_ICON}`}</div>\n        </div>\n      </div>\n      <div class="lib-item-row">\n        <span class="lib-item-icon">${getIcon("Wood")}</span>\n        <div class="lib-item-main">\n          <div class="lib-item-name">Wood ×${fmt(woodReturnQty)} <span style="font-weight:400;color:var(--profit);">(recovered)</span></div>\n          <div class="lib-item-meta">Worth ${fmt(woodDisplayPrice)}${woodDisplayUnit}/u — subtracted as a rebate</div>\n        </div>\n        <div style="display:flex;gap:2px;">\n          <button class="btn btn-ghost fruit-mode-btn" data-fruit="${name}" data-mode="collect" style="padding:4px 6px;font-size:9.6px;${mode === "collect" ? "border-color:var(--profit);color:var(--profit);" : ""}">Use</button>\n          <button class="btn btn-ghost fruit-mode-btn" data-fruit="${name}" data-mode="buy" style="padding:4px 6px;font-size:9.6px;${mode === "buy" ? "border-color:var(--flower);color:var(--flower);" : ""}">Sell</button>\n        </div>\n      </div>\n    </div>\n  </div>`;
}

export function renderFruitsList() {
  const wrap = $("fruitsItemList");
  if (!wrap) return;
  invalidateCostCache();
  loadBaseFruitsIfNeeded();
  withPreservedCardScrolls(wrap, () => {
    wrap.innerHTML = Object.keys(BASE_FRUITS).filter(name => isFruitInSeason(name)).map(renderFruitCard).join("");
  });
  wrap.querySelectorAll(".card-toggle, .card-24h-box").forEach(el => {
    el.onclick = () => {
      const card = el.closest(".card");
      const name = card.dataset.search;
      const match = Object.keys(BASE_FRUITS).find(n => n.toLowerCase() === name);
      if (expandedFruits.has(match)) expandedFruits.delete(match); else expandedFruits.add(match);
      card.classList.toggle("expanded");
    };
  });
  wrap.querySelectorAll(".fruit-mode-btn").forEach(btn => {
    btn.onclick = e => {
      e.stopPropagation();
      setMaterialMode("Fruit_" + btn.dataset.fruit, "Wood", btn.dataset.mode);
      withPreservedScroll(wrap, renderFruitsList);
      renderMarketList();
      updateCalcSummary();
    };
  });
}

function renderGreenhouseCard(name) {
  const d = BASE_GREENHOUSE[name];
  const costCoins = getGreenhouseCostCoins(name);
  const costFlower = coinsToFlower(costCoins);
  const m = marketItems.find(x => (x.name || "").toLowerCase() === name.toLowerCase());
  const sellFlower = m ? m.flowerPrice || 0 : 0;
  const netSellFlower = sellFlower * (1 - feePercent / 100);
  const profitFlower = netSellFlower - costFlower;
  const isProfit = profitFlower >= 0;
  const roi = costFlower > 0 ? profitFlower / costFlower * 100 : 0;
  const boosted = computeBoostedGreenhouseStats(name, d.baseYield || 1, d.timeSec);
  const plotCount = getGreenhouseCount(name);
  const boostListHtml = renderBoostAppliedList(boosted.activeBoosts, name);
  const oilQty = Math.max(0, (d.oilQty || 0) * (boosted.oilQtyMult || 1) - (boosted.oilFlatReduce || 0));
  const oilUnitCost = getItemCostByName("Oil");
  const oilCoinCost = oilQty * oilUnitCost;
  const greenhouseManualCycleKey = "greenhouse_" + name;
  const greenhouseManualCycle = getManualCycleOverride(greenhouseManualCycleKey);
  const proj = compute24hProjection(boosted.yieldVal, boosted.timeVal, costFlower, sellFlower, plotCount, {
    baseStock: BASE_STOCK_GREENHOUSE[name],
    kind: "seed",
    itemName: name
  }, greenhouseManualCycle);
  return `\n  <div class="card ${isProfit ? "is-profit" : "is-loss"}${expandedGreenhouse.has(name) ? " expanded" : ""}" data-search="${name.toLowerCase()}">\n    <div class="card-toggle">\n      <div class="card-name-row">\n        <span class="card-icon">${getIcon(name)}</span>\n        <div>\n          <div class="card-name">${name} <span style="font-size:10.8px;font-weight:700;color:var(--ink-soft);">🌿 Greenhouse</span></div>\n          <div class="card-type">${fmt(costCoins)}${COIN_ICON} seed + oil cost</div>\n        </div>\n      </div>\n      <div class="card-collapsed-profit">\n        ${boosted.activeBoosts.length ? `<span class="boost-badge">⚡${boosted.activeBoosts.length}</span>` : ""}\n        <span class="pvalue-mini ${isProfit ? "is-profit" : "is-loss"}">${isProfit ? "+" : ""}${fmt(profitFlower)} ${FLOWER_ICON} FLOWER</span>\n        <span class="chev">▾</span>\n      </div>\n    </div>\n    ${render24hBadge(proj.profit24h, proj.cost24h, proj.cyclesPerDay, `${fmt(plotCount)} plots · ${fmt(proj.cyclesPerDay)} cycles/day`, proj.restockCost24h, `${fmt(proj.unitsPerDay)} ${name}`, [ `${fmt(plotCount)} PLOTS × ${fmt(boosted.yieldVal)} = ${fmt(plotCount * boosted.yieldVal)} ${name.toUpperCase()}`, `${fmt(proj.cost24h)} ${FLOWER_ICON} FLOWER COST (24H) · <span style="color:var(--flower);">${fmt(proj.revenue24h)} ${FLOWER_ICON} FLOWER SELL (24H)</span>` ], {
    itemName: `${name} Seed`,
    restockItemName: name,
    unitCost: costFlower,
    unitYield: boosted.yieldVal,
    unitNetSell: netSellFlower,
    plotCount: plotCount,
    restockBaseStock: BASE_STOCK_GREENHOUSE[name],
    restockKind: "seed",
    simulateStock: stockQty => simulateStockCycles(pc => computeBoostedGreenhouseStats(name, d.baseYield || 1, d.timeSec, pc), plotCount, stockQty)
  })}\n    <div class="card-details">\n      <div class="card-grid">\n        <div class="stat"><span class="label">Sell (market)</span><span class="value">${fmt(sellFlower)} ${FLOWER_ICON} FLOWER${feePercent > 0 ? ` <span style="color:var(--ink-soft);font-weight:600;">(${fmt(netSellFlower)} after ${feePercent}% fee)</span>` : ""}</span></div>\n        <div class="stat"><span class="label">Cost / unit</span><span class="value">${fmt(costFlower)} ${FLOWER_ICON} FLOWER</span></div>\n        <div class="stat"><span class="label">Yield</span><span class="value">${fmt(boosted.yieldVal)}</span></div>\n        <div class="stat"><span class="label">Time</span><span class="value">${formatDuration(boosted.timeVal)}${Math.round(boosted.timeVal) !== Math.round(d.timeSec) ? ` <span style="color:var(--ink-soft);font-weight:600;">(${formatDuration(d.timeSec)} base)</span>` : ""}</span></div>\n      </div>\n      ${render24hTotalsGrid(proj.cost24h, proj.unitsPerDay * sellFlower, proj.revenue24h, proj.profit24h, (() => {
    const s = getActiveShrineDailyCost(boosted.activeBoosts);
    return {
      unitCost: costFlower,
      restockCost24h: proj.restockCost24h,
      restockDetails: proj.restockDetails,
      restockNote: typeof getRestockExclusionNote === "function" ? getRestockExclusionNote(name) : "",
      shrineCost24h: s.total,
      shrineNames: s.shrines.map(x => x.name),
      shrineDetails: s.shrines,
      totalYield: proj.unitsPerDay,
      yieldLabel: name,
      unitLabel: "Total Plots",
      unitCount: plotCount,
      yieldPerCycle: plotCount * boosted.yieldVal,
      totalCycles: proj.cyclesPerDay,
      manualCycleKey: greenhouseManualCycleKey,
      manualCycleValue: getManualCycleRawValue(greenhouseManualCycleKey),
      manualCycleAuto: proj.autoCyclesPerDay,
      manualCycleRefresh: "renderGreenhouseList",
      perSeedLabel: "Profit / Unit",
      perSeedValue: profitFlower,
      perSeedIsProfit: isProfit,
      perSeedRoi: roi
    };
  })())}\n      ${boostListHtml}\n      <div class="lib-item-row">\n        <span class="lib-item-icon">${getIcon("Oil")}</span>\n        <div class="lib-item-main">\n          <div class="lib-item-name">Oil ×${fmt(oilQty)}</div>\n          <div class="lib-item-meta">🚫 not tradable — always collected · Cost: ${fmt(oilCoinCost)}${COIN_ICON}</div>\n        </div>\n      </div>\n      <div class="lib-item-row">\n        <span class="lib-item-icon">🌱</span>\n        <div class="lib-item-main">\n          <div class="lib-item-name">Seed</div>\n          <div class="lib-item-meta">Cost: ${fmt(hasFreeCostBoostGreenhouse(name) ? 0 : (d.seedCost || 0) * (boosted.seedQtyMult || 1))}${COIN_ICON}${hasFreeCostBoostGreenhouse(name) ? " (free — boost active)" : ""}${boosted.seedQtyMult && boosted.seedQtyMult !== 1 ? ` (×${boosted.seedQtyMult} seeds)` : ""}</div>\n        </div>\n      </div>\n    </div>\n  </div>`;
}

export function renderGreenhouseList() {
  const wrap = $("greenhouseItemList");
  if (!wrap) return;
  invalidateCostCache();
  loadBaseGreenhouseIfNeeded();
  withPreservedCardScrolls(wrap, () => {
    wrap.innerHTML = Object.keys(BASE_GREENHOUSE).map(renderGreenhouseCard).join("");
  });
  wrap.querySelectorAll(".card-toggle, .card-24h-box").forEach(el => {
    el.onclick = () => {
      const card = el.closest(".card");
      const name = card.dataset.search;
      const match = Object.keys(BASE_GREENHOUSE).find(n => n.toLowerCase() === name);
      if (expandedGreenhouse.has(match)) expandedGreenhouse.delete(match); else expandedGreenhouse.add(match);
      card.classList.toggle("expanded");
    };
  });
}

function renderCmModules() {
  const wrap = $("cmModulesRow");
  if (!wrap) return;
  const mods = [ {
    key: "I",
    label: "Module I",
    crops: "Rhubarb, Zucchini"
  }, {
    key: "II",
    label: "Module II",
    crops: "Carrot, Cabbage"
  }, {
    key: "III",
    label: "Module III",
    crops: "Yam, Broccoli"
  } ];
  wrap.innerHTML = mods.map(mo => {
    const unlocked = isSkillActive(CM_MODULE_SKILL_IDS[mo.key]);
    return `<div class="cm-module-chip${unlocked ? " unlocked" : ""}" data-cm-module="${mo.key}" title="${escapeHtml(mo.crops)}">\n      ${unlocked ? "✅" : "🔒"} ${mo.label}\n    </div>`;
  }).join("");
  wrap.querySelectorAll("[data-cm-module]").forEach(el => {
    el.onclick = () => {
      const key = el.dataset.cmModule;
      if (isSkillActive(CM_MODULE_SKILL_IDS[key])) return;
      toast(`🔒 Select the "${CM_MODULE_SKILL_NAMES[key]}" skill in your Skill Tree to unlock this module`);
    };
  });
}

function renderCropMachineCardsView() {
  const names = Object.keys(BASE_CROP_MACHINE);
  return names.map(name => {
    const locked = !isCropMachineUnlocked(name);
    const base = BASE_CROP_MACHINE[name];
    const b = computeCropMachineBatch(name, base.seedQty);
    const isProfit = b.profitFlower >= 0;
    const isExpanded = expandedCropMachine.has(name);
    return `\n    <div class="card ${isProfit ? "is-profit" : "is-loss"}${locked ? " is-locked" : ""}${isExpanded ? " expanded" : ""}" data-search="${name.toLowerCase()}">\n      <div class="card-toggle">\n        <div class="card-name-row">\n          <span class="card-icon">${getIcon(name)}</span>\n          <div>\n            <div class="card-name">${name}${cmModuleTagHtml(name)}${locked ? ` <span class="lock-icon">🔒</span>` : ""}</div>\n            <div class="card-type">${fmt(base.seedQty)} seeds/pack · ${formatDuration(b.timeSec)}${locked ? "" : ""}</div>\n            ${locked ? `<div class="lock-note">Needs Crop Machine ${base.module === "Base" ? "" : "Module " + base.module} skill — tick it above once you own it</div>` : ""}\n          </div>\n        </div>\n        <div class="card-collapsed-profit">\n          <span class="pvalue-mini ${isProfit ? "is-profit" : "is-loss"}">${isProfit ? "+" : ""}${fmt(b.profitFlower)} ${FLOWER_ICON} FLOWER</span>\n          <span class="chev">▾</span>\n        </div>\n      </div>\n      <div class="card-details">\n        <div class="card-grid">\n          <div class="stat"><span class="label">Yield</span><span class="value">${fmt(b.yieldQty)} <span style="color:var(--ink-soft);font-weight:600;">(${fmt(b.yieldQty / base.seedQty)} each — ×${fmt(b.yieldMult)} boost)</span></span></div>\n          <div class="stat"><span class="label">Seeds</span><span class="value">${fmt(base.seedQty)}</span></div>\n          <div class="stat"><span class="label">Time</span><span class="value">${formatDuration(b.timeSec)}</span></div>\n          <div class="stat"><span class="label">Oil</span><span class="value">${fmt(b.oilQty)}</span></div>\n        </div>\n        <div class="lib-item-row">\n          <span class="lib-item-icon">🌱</span>\n          <div class="lib-item-main">\n            <div class="lib-item-name">Seed cost</div>\n            <div class="lib-item-meta">${fmt(base.seedQty)} × ${fmt(BASE_CROPS[name].seedCost)}${COIN_ICON}${hasFreeCostBoost(name) ? " (free — boost active)" : ""} = ${fmt(b.seedCoinCost)}${COIN_ICON}</div>\n          </div>\n        </div>\n        <div class="lib-item-row">\n          <span class="lib-item-icon">${getIcon("Oil")}</span>\n          <div class="lib-item-main">\n            <div class="lib-item-name">Oil cost</div>\n            <div class="lib-item-meta">${fmt(b.oilQty)} × ${fmt(getItemCostByName("Oil"))}${COIN_ICON} = ${fmt(b.oilCoinCost)}${COIN_ICON}</div>\n          </div>\n        </div>\n        <div class="lib-item-row">\n          <span class="lib-item-icon">${FLOWER_ICON}</span>\n          <div class="lib-item-main">\n            <div class="lib-item-name">Market price</div>\n            <div class="lib-item-meta">${fmt(b.sellFlower)} ${FLOWER_ICON} FLOWER${feePercent > 0 ? ` <span style="color:var(--ink-soft);">(${fmt(b.netSellFlower)} after ${feePercent}% fee)</span>` : ""}</div>\n          </div>\n        </div>\n        ${render24hTotalsGrid(b.costFlower, b.yieldQty * b.sellFlower, b.revenueFlower, b.profitFlower, {
      title: "Totals — per pack",
      totalYield: b.yieldQty,
      yieldLabel: name
    })}\n        <div class="profit-banner">\n          <span class="plabel">Profit / pack</span>\n          <span><span class="pvalue ${isProfit ? "is-profit" : "is-loss"}">${isProfit ? "+" : ""}${fmt(b.profitFlower)} ${FLOWER_ICON} FLOWER</span>\n          <span class="proi">(cost ${fmt(b.costFlower)} ${FLOWER_ICON} FLOWER)</span></span>\n        </div>\n      </div>\n    </div>`;
  }).join("");
}

function renderCropMachineTableView() {
  const names = Object.keys(BASE_CROP_MACHINE);
  const rows = names.map(name => {
    const locked = !isCropMachineUnlocked(name);
    const base = BASE_CROP_MACHINE[name];
    const b = computeCropMachineBatch(name, base.seedQty);
    const isProfit = b.profitFlower >= 0;
    return `<tr class="${locked ? "is-locked" : ""}">\n      <td>${locked ? "🔒" : getIcon(name)} ${escapeHtml(name)}${cmModuleTagHtml(name)}</td>\n      <td>${fmt(base.seedQty)}</td>\n      <td>${formatDuration(b.timeSec)}</td>\n      <td>${fmt(b.oilQty)}</td>\n      <td>${fmt(b.yieldQty)}</td>\n      <td>${fmt(b.costFlower)}</td>\n      <td>${fmt(b.sellFlower)}</td>\n      <td class="${isProfit ? "is-profit" : "is-loss"}">${isProfit ? "+" : ""}${fmt(b.profitFlower)}</td>\n    </tr>`;
  }).join("");
  return `<div class="retro-scroll" style="overflow-x:auto;"><table class="cm-table">\n    <thead><tr><th>Crop</th><th>Seeds</th><th>Time</th><th>Oil</th><th>Yield</th><th>Cost</th><th>Price</th><th>Profit</th></tr></thead>\n    <tbody>${rows}</tbody>\n  </table></div>`;
}

export function renderCropMachineCalc() {
  const listWrap = $("cmCalcList");
  if (!listWrap) return;
  listWrap.innerHTML = cmCalcMode === "table" ? renderCropMachineTableView() : renderCropMachineCardsView();
  if (cmCalcMode === "cards") {
    listWrap.querySelectorAll(".card-toggle").forEach(el => {
      el.onclick = () => {
        const card = el.closest(".card");
        const name = Object.keys(BASE_CROP_MACHINE).find(n => n.toLowerCase() === card.dataset.search);
        if (expandedCropMachine.has(name)) expandedCropMachine.delete(name); else expandedCropMachine.add(name);
        card.classList.toggle("expanded");
      };
    });
  }
  const summary = $("cmCalcSummary");
  if (summary) {
    const unlockedCount = Object.keys(BASE_CROP_MACHINE).filter(isCropMachineUnlocked).length;
    summary.innerHTML = `<div class="setting-hint" style="margin-bottom:8px;">${unlockedCount}/${Object.keys(BASE_CROP_MACHINE).length} crops unlocked · profit shown is per full seed pack (before you scale it in the Machine tab)</div>`;
  }
}

function renderCmSeedGrid() {
  const wrap = $("cmSeedGrid");
  if (!wrap) return;
  wrap.innerHTML = Object.keys(BASE_CROP_MACHINE).map(name => {
    const locked = !isCropMachineUnlocked(name);
    const active = cmSelectedCrop === name;
    return `<div class="cm-seed-btn${active ? " active" : ""}${locked ? " is-locked" : ""}" data-cm-seed="${name}">\n      <span class="cm-seed-icon">${locked ? "🔒" : getIcon(name)}</span>\n      <span class="cm-seed-name">${escapeHtml(name)}</span>\n      <span class="cm-seed-avail">${locked ? "Locked" : fmt(CROP_MACHINE_PACK_MAX[name]) + " max/pack"}</span>\n    </div>`;
  }).join("");
  wrap.querySelectorAll("[data-cm-seed]").forEach(el => {
    el.onclick = () => {
      const name = el.dataset.cmSeed;
      if (!isCropMachineUnlocked(name)) {
        const mod = BASE_CROP_MACHINE[name].module;
        toast(`🔒 Select the "${CM_MODULE_SKILL_NAMES[mod]}" skill in your Skill Tree to unlock ${name}`);
        return;
      }
      __set_cmSelectedCrop(name);
      localStorage.setItem("hl_cm_selected_crop", name);
      __set_cmQty(0);
      renderCropMachineMachine();
    };
  });
}

export function renderCmSelectedDetail() {
  const wrap = $("cmSelectedDetail");
  if (!wrap) return;
  const name = cmSelectedCrop;
  const base = BASE_CROP_MACHINE[name];
  if (!base) {
    wrap.innerHTML = "";
    return;
  }
  const b = computeCropMachineBatch(name, cmQty);
  const queuedSoFar = cmQueue.filter(p => p.name === name).reduce((s, p) => s + p.qty, 0);
  const packsSoFar = cmQueue.filter(p => p.name === name).length;
  const ri = computeMachineRestockGems(name, queuedSoFar + cmQty);
  wrap.innerHTML = `\n    <div class="lib-item-row" style="margin-top:6px;">\n      <span class="lib-item-icon">${getIcon(name)}</span>\n      <div class="lib-item-main">\n        <div class="lib-item-name">${escapeHtml(name)} Seed <span style="font-weight:400;color:var(--ink-soft);font-size:10.8px;">Max ${fmt(CROP_MACHINE_PACK_MAX[name])}/pack</span></div>\n        <div class="lib-item-meta">Qty ${fmt(cmQty)} · Yield ${fmt(b.yieldQty)} · Time ${formatDuration(b.timeSec)} · Oil ${fmt(b.oilQty)}</div>\n        ${packsSoFar > 0 ? `<div class="lib-item-meta" style="color:var(--ink-soft);">Already queued: ${fmt(queuedSoFar)} across ${packsSoFar} pack${packsSoFar === 1 ? "" : "s"} of ${name}</div>` : ""}\n        ${ri.gemsTotal > 0 ? `<div class="lib-item-meta" style="color:#b45309;">${GEM_ICON} ${fmt(ri.restocksNeeded)} seed restock${ri.restocksNeeded === 1 ? "" : "s"} for this crop's total so far · ${fmt(ri.gemsTotal)} ${GEM_ICON} Gems ≈ ${fmt(ri.flowerCost)} ${FLOWER_ICON}</div>` : ""}\n      </div>\n    </div>`;
}

export function renderCmQtyControls() {
  const addBtn = $("cmAddBtn");
  if (!addBtn) return;
  addBtn.disabled = cmQty <= 0 || cmQueue.length >= getCropMachineQueueSlots();
}

function renderCmPacksGrid() {
  const wrap = $("cmPacksGrid");
  const label = $("cmPackCountLabel");
  if (!wrap) return;
  if (label) label.textContent = `${cmQueue.length}/${getCropMachineQueueSlots()}`;
  const slots = [];
  for (let i = 0; i < getCropMachineQueueSlots(); i++) {
    const pack = cmQueue[i];
    if (pack) {
      const b = computeCropMachineBatch(pack.name, pack.qty);
      const packProfit = b.profitFlower >= 0;
      slots.push(`<div class="cm-pack-slot filled" data-cm-pack-idx="${i}">\n        <button type="button" class="cm-pack-remove" data-cm-remove="${i}"><span class="cm-pack-cancel-icon">${getCancelIcon()}</span></button>\n        <div style="font-size:19.2px;">${getIcon(pack.name)}</div>\n        <div style="font-weight:700;">${fmt(pack.qty)}</div>\n        <div class="cm-pack-meta-line">${fmt(b.yieldQty)} yield</div>\n        <div class="cm-pack-meta-line">${fmt(b.oilQty)}<span class="cm-pack-meta-icon">${getIcon("Oil")}</span> oil</div>\n        <div class="cm-pack-meta-line">${formatDuration(b.timeSec)} <span class="cm-pack-meta-icon">${getTimerIcon()}</span></div>\n        <div style="margin-top:3px;font-size:8.4px;line-height:1.4;color:var(--ink-soft);">\n          <div>${FLOWER_ICON}${fmt(b.costFlower)} cost</div>\n          <div>${FLOWER_ICON}${fmt(b.revenueFlower)} sell</div>\n          <div style="font-weight:700;color:${packProfit ? "var(--profit)" : "var(--loss)"};">${packProfit ? "+" : ""}${fmt(b.profitFlower)} profit</div>\n        </div>\n      </div>`);
    } else {
      slots.push(`<div class="cm-pack-slot">+ empty</div>`);
    }
  }
  wrap.innerHTML = slots.join("");
  wrap.querySelectorAll("[data-cm-remove]").forEach(el => {
    el.onclick = ev => {
      ev.stopPropagation();
      const idx = parseInt(el.dataset.cmRemove, 10);
      cmQueue.splice(idx, 1);
      saveCmQueue();
      renderCropMachineMachine();
    };
  });
}

export function renderCmOilTank() {
  const readout = $("cmOilReadout");
  const fill = $("cmOilBarFill");
  const marks = $("cmOilBarMarks");
  const title = $("cmOilTankSectionTitle");
  if (title) title.innerHTML = `${getIcon("Oil")} Oil Tank`;
  if (!readout) return;
  __set_cmOilTank(Math.max(0, Math.min(getCropMachineOilCap(), cmOilTank)));
  readout.textContent = `${fmt(cmOilTank)} oil`;
  const oilNeeded = cmQueue.reduce((s, pack) => s + computeCropMachineBatch(pack.name, pack.qty).oilQty, 0);
  const oilRemaining = Math.max(0, cmOilTank - oilNeeded);
  const pct = getCropMachineOilCap() > 0 ? oilRemaining / getCropMachineOilCap() * 100 : 0;
  if (fill) fill.style.width = pct + "%";
  if (marks) marks.innerHTML = [ "0s", "6h", "12h", "18h", "1d", "1d 6h", "1d 12h", "1d 18h", "2d" ].map(s => `<span>${s}</span>`).join("");
}

export function renderCmSummary() {
  const wrap = $("cmSummaryGrid");
  if (!wrap) return;
  let seeds = 0, timeSec = 0, oilNeeded = 0, costFlower = 0, profitFlower = 0, yieldTotal = 0, revenueFlower = 0;
  cmQueue.forEach(pack => {
    const b = computeCropMachineBatch(pack.name, pack.qty);
    seeds += pack.qty;
    timeSec += b.timeSec;
    oilNeeded += b.oilQty;
    costFlower += b.costFlower;
    profitFlower += b.profitFlower;
    yieldTotal += b.yieldQty;
    revenueFlower += b.revenueFlower;
  });
  const qtyByName = {};
  cmQueue.forEach(pack => {
    qtyByName[pack.name] = (qtyByName[pack.name] || 0) + pack.qty;
  });
  let restockGemsTotal = 0, restockFlowerTotal = 0;
  const restockRows = Object.keys(qtyByName).map(name => {
    const ri = computeMachineRestockGems(name, qtyByName[name]);
    restockGemsTotal += ri.gemsTotal;
    restockFlowerTotal += ri.flowerCost;
    return {
      name: name,
      qty: qtyByName[name],
      restocksNeeded: ri.restocksNeeded,
      gemsTotal: ri.gemsTotal,
      flowerCost: ri.flowerCost
    };
  }).filter(r => r.gemsTotal > 0);
  costFlower += restockFlowerTotal;
  profitFlower -= restockFlowerTotal;
  const oilCovered = cmOilTank >= oilNeeded;
  const isProfit = profitFlower >= 0;
  const cells = [ {
    label: "Packs",
    value: `${cmQueue.length}/${getCropMachineQueueSlots()}`,
    sub: "Queue"
  }, {
    label: "Seeds",
    value: fmt(seeds),
    sub: "Queued"
  }, {
    label: "Time",
    value: formatDuration(timeSec),
    sub: "Runtime"
  }, {
    label: "Oil needed",
    value: `${fmt(oilNeeded)} <span style="font-size:9.6px;color:${oilCovered ? "var(--profit)" : "var(--loss)"};">${oilCovered ? "✓ covered" : "✗ short"}</span>`,
    sub: `Tank: ${fmt(cmOilTank)}`
  }, {
    label: "Restock",
    value: `${fmt(restockGemsTotal)}${GEM_ICON}`,
    sub: `≈${fmt(restockFlowerTotal)} ${FLOWER_ICON}`
  }, {
    label: "Cost",
    value: `${FLOWER_ICON}${fmt(costFlower)}`,
    sub: "Seed+oil+restock"
  }, {
    label: "Total yield",
    value: fmt(yieldTotal),
    sub: "All packs combined"
  }, {
    label: "Sell value",
    value: `${FLOWER_ICON}${fmt(revenueFlower)}`,
    sub: "Yield × price, after fee"
  }, {
    label: "Profit",
    value: `${isProfit ? "+" : ""}${fmt(profitFlower)}`,
    sub: "After fee",
    cls: isProfit ? "is-profit" : "is-loss"
  } ];
  wrap.innerHTML = cells.map(c => `<div class="cm-summary-cell">\n    <div class="cm-s-label">${c.label}</div>\n    <div class="cm-s-value${c.cls ? " " + c.cls : ""}">${c.value}</div>\n    <div class="cm-s-label" style="text-transform:none;font-weight:600;">${c.sub}</div>\n  </div>`).join("");
  const rbWrap = $("cmRestockBreakdown");
  if (rbWrap) {
    if (restockRows.length === 0) {
      rbWrap.innerHTML = "";
    } else {
      rbWrap.innerHTML = `<div class="setting-hint" style="margin-top:8px;">${GEM_ICON} Restock breakdown — Market stock caps at a base amount per crop; any total queued beyond that (summed across all packs of that crop) needs a Gem restock:</div><div class="setting-hint" style="margin-top:2px;opacity:.85;">Restock cost computation is using the individual cost computation.</div>` + restockRows.map(r => `<div class="lib-item-row" style="padding:4px 0;">\n        <span class="lib-item-icon">${getIcon(r.name)}</span>\n        <div class="lib-item-main">\n          <div class="lib-item-name">${escapeHtml(r.name)} <span style="font-weight:400;color:var(--ink-soft);">${fmt(r.qty)} seeds queued (base stock ${fmt(BASE_STOCK_CROPS[r.name])})</span></div>\n          <div class="lib-item-meta">≈${fmt(r.restocksNeeded)} restock${r.restocksNeeded === 1 ? "" : "s"} · ${fmt(r.gemsTotal)} ${GEM_ICON} Gems ≈ ${fmt(r.flowerCost)} ${FLOWER_ICON}</div>\n        </div>\n      </div>`).join("");
    }
  }
}

export function renderCropMachineMachine() {
  renderCmModules();
  renderCmSeedGrid();
  if (cmQty <= 0 && BASE_CROP_MACHINE[cmSelectedCrop]) {
    __set_cmQty(cmClampQty(cmSelectedCrop, CROP_MACHINE_PACK_MAX[cmSelectedCrop] || BASE_CROP_MACHINE[cmSelectedCrop].seedQty));
  }
  renderCmSelectedDetail();
  renderCmQtyControls();
  renderCmPacksGrid();
  renderCmOilTank();
  renderCmSummary();
}

export function renderCropMachinePanel() {
  renderCmModules();
  renderCropMachineCalc();
  renderCropMachineMachine();
}

function formatDurationLong(sec) {
  sec = Math.max(0, Math.round(sec));
  const d = Math.floor(sec / 86400);
  const h = Math.floor(sec % 86400 / 3600);
  const m = Math.floor(sec % 3600 / 60);
  const s = sec % 60;
  const parts = [];
  if (d) parts.push(`${d} ${d === 1 ? "Day" : "Days"}`);
  if (h) parts.push(`${h} ${h === 1 ? "hr" : "hrs"}`);
  if (m) parts.push(`${m}m`);
  if (s || !parts.length) parts.push(`${s}s`);
  return parts.join(" ");
}

const expandedFlowerChains = new Set;

function renderFlowerCard(name, noActive) {
  const v = FLOWER_VARIETIES[name];
  const seedKey = v.seed;
  const seedData = FLOWER_SEEDS[seedKey];
  const locked = isFlowerVarietySeasonLocked(name);
  const boosted = computeBoostedFlowerVarietyStats(name);
  const seedCoinCost = getFlowerSeedTypeCost(seedKey);
  const ing = getVarietyIngredient(name);
  const mode = getMaterialMode("FlowerVariety_" + name, ing.name);
  const ingUnitCoins = ing.name ? getMaterialUnitCostCoins(ing.name, mode) : 0;
  const costCoins = getFlowerVarietyCostCoins(name);
  const restockInfo = computeFlowerVarietyRestockInfo(name);
  const restockCostPerFlower = restockInfo ? restockInfo.flowerCost / (86400 / boosted.timeVal) / boosted.expectedYield : 0;
  const costFlower = coinsToFlower(costCoins) + restockCostPerFlower;
  const isExpanded = expandedFlowers.has(name);
  const isActive = !noActive && selectedHoneyFlower === name;
  const isSelfCross = ing.name === name;
  const seasonEmoji = {
    Spring: `<img src="${ICON_DATA["season_spring.png"]}" alt="Spring" style="width:14px;height:14px;vertical-align:-3px;image-rendering:pixelated;">`,
    Summer: `<img src="${ICON_DATA["season_summer.png"]}" alt="Summer" style="width:14px;height:14px;vertical-align:-3px;image-rendering:pixelated;">`,
    Autumn: `<img src="${ICON_DATA["season_autumn.png"]}" alt="Autumn" style="width:14px;height:14px;vertical-align:-3px;image-rendering:pixelated;">`,
    Winter: `<img src="${ICON_DATA["season_winter.png"]}" alt="Winter" style="width:14px;height:14px;vertical-align:-3px;image-rendering:pixelated;">`
  };
  const seasonIconsHtml = (seedData.season ? [ seedData.season ] : SEASON_ORDER).map(se => `<span class="flower-fold-season" title="${se}">${seasonEmoji[se]}</span>`).join("");
  const timeChanged = Math.round(boosted.timeVal) !== Math.round(seedData.timeSec);
  const yieldChanged = Math.abs(boosted.expectedYield - 1) > 1e-4;
  const seedIconHtml = seedIconHtmlFor(seedKey);
  const ingIconHtml = getIcon(ing.name);
  const resultIconHtml = IMAGE_ICONS[name] ? getIcon(name) : `<span style="font-size:19.2px;">${v.icon || "🌷"}</span>`;
  const chain = computeFlowerChainTime(name);
  const chainTimeSec = chain.totalSec;
  const chainBaseSec = chain.baseTotalSec;
  const chainTimeChanged = Math.round(chainTimeSec) !== Math.round(chainBaseSec);
  const durationText = formatDurationLong(chainTimeSec);
  const baseDurationText = formatDurationLong(chainBaseSec);
  const hasChain = chain.steps.length > 0;
  const chainOpen = hasChain && expandedFlowerChains.has(name);
  const chainStepsHtml = hasChain ? `<div class="flower-cross-chain"><div class="flower-cross-chain-title">Chain</div>${chain.steps.slice().reverse().map((st, idx, arr) => {
    const isFinal = idx === arr.length - 1;
    const qtyTxt = st.qty && st.qty !== 1 ? `<span class="flower-cross-chain-qty">×${fmt(st.qty)}</span>` : "";
    return `<div class="flower-cross-chain-step"><span class="flower-cross-chain-eq"><span class="flower-cross-chain-part">${seedIconHtmlFor(st.seed)}<span>${escapeHtml(st.seed)} Seed</span></span><span class="flower-cross-chain-op">+</span><span class="flower-cross-chain-part">${getIcon(st.ingredient)}<span>${qtyTxt}${escapeHtml(st.ingredient)}</span></span><span class="flower-cross-chain-op">=</span><span class="flower-cross-chain-part flower-cross-chain-out">${getIcon(st.name)}<span>${escapeHtml(st.name)}</span></span></span><span class="flower-cross-chain-time">${formatDurationLong(st.timeSec)}${isFinal ? `<span class="flower-cross-chain-check">✓</span>` : ""}</span></div>${isFinal ? "" : `<div class="flower-cross-chain-arrow">↓</div>`}`;
  }).join("")}</div>` : "";
  const ingredientPickerOptions = v.ingredients.map(n => `<div class="flower-cross-option${n === ing.name ? " active" : ""}" data-variety="${escapeHtml(name)}" data-ingredient="${escapeHtml(n)}">${getIcon(n)}<span class="flower-cross-label">${escapeHtml(n)} <span class="flower-cross-kind">(${ingredientKindLabel(n)})</span></span></div>`).join("");
  return `\n  <div class="card${isExpanded ? " expanded" : ""}${locked ? " season-locked" : ""}" data-search="${name.toLowerCase()}">\n    <div class="card-toggle flower-fold">\n      <div class="flower-fold-seasons">${seasonIconsHtml}</div>\n      <div class="flower-fold-head">\n        <div class="card-name-row">\n          <span class="card-icon">${IMAGE_ICONS[name] ? getIcon(name) : `<span style="font-size:19.2px;">${v.icon || "🌷"}</span>`}</span>\n          <div class="card-name">${name}${isActive ? ` <span style="color:var(--profit);font-size:10.8px;font-weight:700;">★ ACTIVE</span>` : ""}</div>\n        </div>\n        <div class="card-collapsed-profit">\n          ${boosted.activeBoosts.length ? `<span class="boost-badge">⚡${boosted.activeBoosts.length}</span>` : ""}\n          <span class="pvalue-mini" style="color:var(--flower);">${fmt(costFlower)} ${FLOWER_ICON} FLOWER</span>\n          <span class="chev">▾</span>\n        </div>\n      </div>\n      <div class="card-type">${formatDuration(chainTimeSec)}${chainTimeChanged ? ` <span style="color:var(--ink-soft);">(${formatDuration(chainBaseSec)} base)</span>` : ""}</div>\n      <div class="card-type flower-fold-pair">${seedIconHtml}<span>${seedKey}</span><span class="flower-cross-plus">+</span>${getIcon(ing.name)}<span>${escapeHtml(ing.name)}</span></div>\n    </div>\n    <div class="card-details">\n      <div class="card-grid">\n        <div class="stat"><span class="label">Seed</span><span class="value"><span class="flower-cross-seed" style="margin-left:0;" title="${seedKey} Seed">${seedIconHtml}</span> ${seedKey} Seed <span class="flower-cross-plus">+</span></span></div>\n        <div class="stat"><span class="label">Cross-pollinate with</span><div class="flower-cross-picker">\n          <button type="button" class="flower-cross-btn" data-variety="${escapeHtml(name)}">${ingIconHtml}<span class="flower-cross-label">${escapeHtml(ing.name)} <span class="flower-cross-kind">(${ingredientKindLabel(ing.name)})</span></span><span class="seed-picker-chev">▾</span></button>\n          <div class="flower-cross-menu" style="display:none;">${ingredientPickerOptions}</div>\n          <select class="flower-variety-ingredient-select" data-variety="${name}" style="display:none;">\n            ${varietyIngredientOptions(name, ing.name)}\n          </select></div></div>\n\n        <div class="stat flower-cross-result-stat"><span class="label">Result</span><div class="flower-cross-result${hasChain ? " flower-cross-chain-toggle" : ""}${chainOpen ? " open" : ""}" data-variety="${escapeHtml(name)}"><div class="flower-cross-result-line"><span class="flower-cross-eq">=</span><span class="flower-cross-result-icon">${resultIconHtml}</span><span class="flower-cross-result-name">${escapeHtml(name)}</span>${hasChain ? `<span class="flower-cross-chain-chev seed-picker-chev">▾</span>` : ""}</div><div class="flower-cross-duration"><span class="flower-cross-duration-label">Duration</span><span class="flower-cross-duration-value">${durationText}</span>${chainTimeChanged ? `<span class="flower-cross-duration-base">(${baseDurationText} base)</span>` : ""}</div>${chainStepsHtml}</div></div>\n\n\n\n        <div class="stat"><span class="label">Ingredient qty</span><span class="value">\n          <input type="number" min="0" step="1" class="flower-variety-ingredient-qty-input" data-variety="${name}" value="${ing.qty}"\n            style="width:50px;font-family:'JetBrains Mono',monospace;font-size:12.6px;border:1.25px solid var(--line);border-radius:6px;padding:3px 4px;"> × ${fmt(ingUnitCoins)}${COIN_ICON}/u</span></div>\n\n\n\n        <div class="stat"><span class="label">${seedKey} Seed cost (coins)</span><span class="value">\n          <input type="number" min="0" step="0.01" class="flower-seedtype-cost-input" data-seed="${seedKey}" value="${seedCoinCost}"\n            style="width:70px;font-family:'JetBrains Mono',monospace;font-size:12.6px;border:1.25px solid var(--line);border-radius:6px;padding:3px 4px;">${COIN_ICON}</span></div>\n\n        <div class="stat"><span class="label">${GEM_ICON} Seed Restock Cost / flower</span><span class="value" style="${restockCostPerFlower > 0 ? "color:#c9821a;" : ""}">${restockCostPerFlower > 0 ? `+${fmt(restockCostPerFlower)}` : "0"} ${FLOWER_ICON}</span></div>\n\n      <div class="stat"><span class="label">Total cost / flower</span><span class="value">${fmt(costCoins)}${COIN_ICON} + ${fmt(restockCostPerFlower)} ${FLOWER_ICON} = ${fmt(costFlower)} ${FLOWER_ICON} FLOWER</span></div>\n\n      </div>\n      ${isSelfCross ? `<div class="library-sub" style="margin:6px 0 0;">⚠️ Self-paired: assumes you already hold one ${escapeHtml(name)} to pollinate with, so its cost isn't double-counted — total shown is just the ${seedKey} Seed cost.</div>` : ""}\n      ${renderBoostAppliedList(boosted.activeBoosts, name)}\n      ${noActive ? "" : `<button type="button" class="btn btn-outline btn-block set-active-flower-btn" data-flower="${name}" ${locked ? "disabled" : ""} style="margin-top:6px;color:#5a4326;border-color:#c9a66b;${isActive ? "border-color:var(--profit);color:var(--profit);" : ""}">\n        ${isActive ? "★ Currently the active hive flower" : locked ? "🔒 Locked this season" : "Set as active hive flower"}\n      </button>`}\n    </div>\n  </div>`;
}

function renderFinderSeedPicker(seedSel) {
  const btn = $("finderSeedPickerBtn");
  const menu = $("finderSeedPickerMenu");
  if (!btn || !menu) return;
  const seeds = Object.keys(FLOWER_SEEDS);
  btn.innerHTML = `${seedIconHtmlFor(finderSeed)}<span class="seed-picker-label">${finderSeed} Seed</span><span class="seed-picker-chev">▾</span>`;
  menu.innerHTML = seeds.map(s => `<div class="seed-picker-option${s === finderSeed ? " active" : ""}" data-seed="${escapeHtml(s)}">${seedIconHtmlFor(s)}<span class="seed-picker-label">${s} Seed</span></div>`).join("");
  btn.onclick = e => {
    e.stopPropagation();
    const isOpen = menu.style.display !== "none";
    document.querySelectorAll(".seed-picker-menu").forEach(m => {
      m.style.display = "none";
    });
    menu.style.display = isOpen ? "none" : "block";
  };
  menu.querySelectorAll(".seed-picker-option").forEach(opt => {
    opt.onclick = e => {
      e.stopPropagation();
      seedSel.value = opt.dataset.seed;
      menu.style.display = "none";
      seedSel.onchange && seedSel.onchange();
    };
  });
  if (!renderFinderSeedPicker._outsideClickBound) {
    document.addEventListener("click", () => {
      document.querySelectorAll(".seed-picker-menu").forEach(m => {
        m.style.display = "none";
      });
    });
    renderFinderSeedPicker._outsideClickBound = true;
  }
}

function renderFinderIngredientPicker(ingSel, opts) {
  const btn = $("finderIngredientPickerBtn");
  const menu = $("finderIngredientPickerMenu");
  if (!btn || !menu) return;
  const labelFor = o => `${escapeHtml(o)} <span style="color:var(--ink-soft);font-weight:400;">(${ingredientKindLabel(o)})</span>`;
  btn.innerHTML = finderIngredient ? `${getIcon(finderIngredient)}<span class="seed-picker-label">${labelFor(finderIngredient)}</span><span class="seed-picker-chev">▾</span>` : `<span class="seed-picker-label">—</span><span class="seed-picker-chev">▾</span>`;
  menu.innerHTML = opts.map(o => `<div class="seed-picker-option${o === finderIngredient ? " active" : ""}" data-ingredient="${escapeHtml(o)}">${getIcon(o)}<span class="seed-picker-label">${labelFor(o)}</span></div>`).join("");
  btn.onclick = e => {
    e.stopPropagation();
    const isOpen = menu.style.display !== "none";
    document.querySelectorAll(".seed-picker-menu").forEach(m => {
      m.style.display = "none";
    });
    menu.style.display = isOpen ? "none" : "block";
  };
  menu.querySelectorAll(".seed-picker-option").forEach(opt => {
    opt.onclick = e => {
      e.stopPropagation();
      ingSel.value = opt.dataset.ingredient;
      menu.style.display = "none";
      ingSel.onchange && ingSel.onchange();
    };
  });
}

function renderFinder() {
  const seedSel = $("finderSeedSelect");
  const ingSel = $("finderIngredientSelect");
  const result = $("finderResult");
  if (!seedSel || !ingSel || !result) return;
  if (!FLOWER_SEEDS[finderSeed]) __set_finderSeed("Sunpetal");
  seedSel.innerHTML = Object.keys(FLOWER_SEEDS).map(s => `<option value="${s}" ${s === finderSeed ? "selected" : ""}>${FLOWER_SEED_ICONS[s]} ${s} Seed</option>`).join("");
  renderFinderSeedPicker(seedSel);
  const opts = seedIngredientOptionsList(finderSeed);
  if (!opts.includes(finderIngredient)) __set_finderIngredient(opts[0] || "");
  ingSel.innerHTML = opts.map(o => `<option value="${escapeHtml(o)}" ${o === finderIngredient ? "selected" : ""}>${escapeHtml(o)} (${ingredientKindLabel(o)})</option>`).join("");
  renderFinderIngredientPicker(ingSel, opts);
  const matches = findVarietiesBySeedIngredient(finderSeed, finderIngredient);
  if (matches.length) {
    result.innerHTML = matches.map(match => {
      const v = FLOWER_VARIETIES[match];
      const costCoins = getFlowerVarietyCostCoins(match);
      const costFlower = coinsToFlower(costCoins);
      const locked = isFlowerVarietySeasonLocked(match);
      return `\n      <div class="card" style="padding:8px 10px;margin-bottom:6px;">\n        <div class="card-name-row">\n          <span class="card-icon">${IMAGE_ICONS[match] ? getIcon(match) : `<span style="font-size:19.2px;">${v.icon}</span>`}</span>\n          <div>\n            <div class="card-name">→ ${match}${locked ? ` <span style="color:var(--loss);font-size:10.8px;font-weight:700;">🔒 locked this season</span>` : ""}</div>\n            <div class="card-type">${fmt(costCoins)}${COIN_ICON} = ${fmt(costFlower)} ${FLOWER_ICON} FLOWER per flower <span style="color:var(--ink-soft);">(using its saved pairing in the list below)</span></div>\n          </div>\n        </div>\n      </div>`;
    }).join("") + (matches.length > 1 ? `<div class="library-sub">This pairing can grow more than one variety in-game — shown are all of them.</div>` : "");
  } else {
    result.innerHTML = `<div class="library-sub">No match found for that pairing.</div>`;
  }
  seedSel.onchange = () => {
    __set_finderSeed(seedSel.value);
    localStorage.setItem("hl_finder_seed", finderSeed);
    __set_finderIngredient("");
    renderFinder();
  };
  ingSel.onchange = () => {
    __set_finderIngredient(ingSel.value);
    localStorage.setItem("hl_finder_ingredient", finderIngredient);
    renderFinder();
  };
}

function renderHoneySummaryCard() {
  const el = $("honeySummaryCard");
  if (!el) return;
  loadBaseHoneyIfNeeded();
  const econ = computeHiveEconomics();
  __markSub("      renderHoneySummaryCard: computeHiveEconomics");
  const isProfit = econ.totalProfitDay >= 0;
  const seasonEmoji = {
    Spring: `<img src="${ICON_DATA["season_spring.png"]}" alt="Spring" style="width:14px;height:14px;vertical-align:-3px;image-rendering:pixelated;">`,
    Summer: `<img src="${ICON_DATA["season_summer.png"]}" alt="Summer" style="width:14px;height:14px;vertical-align:-3px;image-rendering:pixelated;">`,
    Autumn: `<img src="${ICON_DATA["season_autumn.png"]}" alt="Autumn" style="width:14px;height:14px;vertical-align:-3px;image-rendering:pixelated;">`,
    Winter: `<img src="${ICON_DATA["season_winter.png"]}" alt="Winter" style="width:14px;height:14px;vertical-align:-3px;image-rendering:pixelated;">`
  };
  el.innerHTML = `\n  <div class="honey-summary-split">\n  <div class="card honey-summary-box ${isProfit ? "is-profit" : "is-loss"}" style="padding:10px;">\n    <div class="honey-heading-wrap"><span class="section-badge is-honey-label">${getIcon("Honey")}Honey Calculator</span></div>\n    <div class="card-grid">\n      <div class="stat"><span class="label">Honey speed</span><span class="value">${fmt(econ.hiveStats.speed)}</span></div>\n      <div class="stat"><span class="label">Time to full hive</span><span class="value">${formatDuration(econ.hiveStats.timeToFullSec)}</span></div>\n      <div class="stat"><span class="label">Honey / hive / day</span><span class="value">${fmt(econ.hiveStats.honeyPerHiveDay)}</span></div>\n      <div class="stat"><span class="label">Swarm chance / fill</span><span class="value">${(econ.hiveStats.swarmChance * 100).toFixed(2)}%</span></div>\n    </div>\n    ${renderBoostAppliedList(econ.hiveStats.activeBoosts, "Honey")}\n    <div class="lib-item-row" style="margin-top:6px;">\n      <span class="lib-item-icon">${getIcon(selectedHoneyFlower)}</span>\n      <div class="lib-item-main">\n        <div class="lib-item-name">Active flower: ${selectedHoneyFlower} <span style="font-weight:400;color:var(--ink-soft);">(${fmt(econ.replantsPerDay)} replants/day)</span></div>\n        <div class="lib-item-meta">Cost / hive / day: ${fmt(econ.costPerHiveDay)} ${FLOWER_ICON} FLOWER${econ.flowerStats.expectedYield > 1 ? ` <span style="color:var(--ink-soft);">(${fmt(econ.flowerCostFlower)} ${FLOWER_ICON} FLOWER ÷ ${fmt(econ.flowerStats.expectedYield)} expected flowers/cycle = ${fmt(econ.costPerFlower)} ${FLOWER_ICON} FLOWER/flower)</span>` : ""}</div>\n        <div class="lib-item-meta">${GEM_ICON} Seed Restock Cost / hive / day: <span style="${econ.flowerRestockCost > 0 ? "color:#c9821a;" : ""}">${econ.flowerRestockCost > 0 ? `+${fmt(econ.flowerRestockCost)}` : "0"} ${FLOWER_ICON}</span></div>\n        <div class="lib-item-meta">Average yield: <strong class="honey-avg-yield">${fmt(econ.flowerStats.expectedYield)}</strong> flowers/cycle</div>\n      </div>\n    </div>\n    <div class="lib-item-row">\n      <span class="lib-item-icon">${getIcon("Honey")}</span>\n      <div class="lib-item-main">\n        <div class="lib-item-name">Honey sell price: ${fmt(econ.honeySellFlower)} ${FLOWER_ICON} FLOWER${feePercent > 0 ? ` <span style="color:var(--ink-soft);">(${fmt(econ.netHoneySell)} after ${feePercent}% fee)</span>` : ""}</div>\n        <div class="lib-item-meta">Revenue / hive / day: ${fmt(econ.hiveStats.honeyPerHiveDay * econ.netHoneySell)} ${FLOWER_ICON} FLOWER</div>\n      </div>\n    </div>\n    <div class="lib-item-row">\n      <span class="lib-item-icon"><img src="${BEE_SWARM_ICON}" style="width:13px;height:13px;vertical-align:-2px;image-rendering:pixelated;"></span>\n      <div class="lib-item-main">\n        <div class="lib-item-name">Bee Swarm bonus <span style="font-weight:400;color:var(--ink-soft);">(valued vs\n          <span class="seed-picker" id="swarmCropPicker" style="position:relative;display:inline-block;width:120px;vertical-align:middle;">\n            <select id="swarmCropSelect" style="display:none;">\n              ${Object.keys(BASE_CROPS).map(n => `<option value="${escapeHtml(n)}" ${n === selectedSwarmCrop ? "selected" : ""}>${escapeHtml(n)}</option>`).join("")}\n            </select>\n            <button type="button" class="seed-picker-btn" id="swarmCropPickerBtn" style="width:100%;font-size:12px;padding:2px 4px;">${getIcon(selectedSwarmCrop)}<span class="seed-picker-label">${escapeHtml(selectedSwarmCrop)}</span><span class="seed-picker-chev">▾</span></button>\n            <div class="seed-picker-menu" id="swarmCropPickerMenu" style="display:none;">\n              ${Object.keys(BASE_CROPS).map(n => `<div class="seed-picker-option${n === selectedSwarmCrop ? " active" : ""}" data-crop="${escapeHtml(n)}">${getIcon(n)}<span class="seed-picker-label">${escapeHtml(n)}</span></div>`).join("")}\n            </div>\n          </span>, ${fmt(getPlotCount())} plots)</span></div>\n        <div class="lib-item-meta">${fmt(econ.expectedSwarmsPerHiveDay)} expected swarms/hive/day × +${fmt(econ.swarmYieldPerSwarm)} yield${isSkillActive("skill_pollen_power_up") ? " (0.2 base + Pollen Power Up)" : ""} → +${fmt(econ.bonusCropValuePerPlotPerHiveDay)} ${FLOWER_ICON} FLOWER/plot/hive/day</div>\n        <div class="lib-item-meta">× ${fmt(econ.cropPlots)} plots → <b>+${fmt(econ.bonusCropYieldPerHiveDay)} ${escapeHtml(selectedSwarmCrop)}/hive/day</b> from swarms <span style="color:var(--ink-soft);">(the extra crops themselves, before pricing)</span></div>\n        <div class="lib-item-meta">× ${fmt(econ.cropSellFlower)} ${FLOWER_ICON} FLOWER/${escapeHtml(selectedSwarmCrop)} → <b>+${fmt(econ.bonusCropValuePerHiveDay)} ${FLOWER_ICON} FLOWER/hive/day total</b></div>\n      </div>\n    </div>\n    <div style="margin-top:8px;">\n      <div class="lib-section-title" style="font-size:12px;">🎲 Swarm Distribution (today, ${fmt(econ.swarmTrialsPerDay)} rolls across ${fmt(econ.hives)} hives)</div>\n      <table style="width:100%;border-collapse:collapse;font-size:11.4px;margin-top:4px;">\n        <thead>\n          <tr style="border-bottom:1.5px solid var(--line);">\n            <th style="text-align:left;padding:3px 4px;color:var(--ink-soft);">Swarms</th>\n            <th style="text-align:right;padding:3px 4px;color:var(--ink-soft);">Chance</th>\n            <th style="text-align:right;padding:3px 4px;color:var(--ink-soft);">Bonus Crop Yield</th>\n            <th style="text-align:right;padding:3px 4px;color:var(--ink-soft);">Flower Value</th>\n          </tr>\n        </thead>\n        <tbody>\n          ${econ.swarmDistribution.map(row => `\n            <tr style="border-bottom:1px solid var(--line-soft, var(--line));">\n              <td style="padding:3px 4px;font-weight:700;">${row.k}</td>\n              <td style="text-align:right;padding:3px 4px;">${(row.chance * 100).toFixed(2)}%</td>\n              <td style="text-align:right;padding:3px 4px;">${fmt(row.bonusCropYield)}</td>\n              <td style="text-align:right;padding:3px 4px;color:var(--flower);">${fmt(row.flowerValue)}</td>\n            </tr>`).join("")}\n        </tbody>\n      </table>\n    </div>\n  </div>\n  <div class="card honey-summary-box ${isProfit ? "is-profit" : "is-loss"}" style="padding:10px;">\n    <div class="honey-heading-wrap"><span class="section-badge is-honey-label">${getIcon("Honey")}Honey 24hr Profitability</span></div>\n    ${render24hTotalsGrid(econ.totalCostDay, econ.totalRevenueGrossDay, econ.totalRevenueDay, econ.totalProfitDay, (() => {
    const s = getActiveShrineDailyCost(econ.hiveStats.activeBoosts, econ.flowerStats.activeBoosts);
    return {
      title: `24HRS PROFIT/LOSS — ${fmt(econ.hives)} hives`,
      shrineCost24h: s.total,
      shrineNames: s.shrines.map(x => x.name),
      shrineDetails: s.shrines,
      totalYield: econ.hiveStats.honeyPerHiveDay * econ.hives,
      yieldLabel: "Honey"
    };
  })())}\n    <div class="profit-banner" style="margin-top:8px;">\n      <span class="plabel">Profit / hive / day</span>\n      <span><span class="pvalue ${econ.profitPerHiveDay >= 0 ? "is-profit" : "is-loss"}">${econ.profitPerHiveDay >= 0 ? "+" : ""}${fmt(econ.profitPerHiveDay)} ${FLOWER_ICON} FLOWER</span></span>\n    </div>\n    <div class="profit-banner">\n      <span class="plabel">Total / ${fmt(econ.hives)} hives / day</span>\n      <span><span class="pvalue ${isProfit ? "is-profit" : "is-loss"}">${isProfit ? "+" : ""}${fmt(econ.totalProfitDay)} ${FLOWER_ICON} FLOWER</span></span>\n    </div>\n    <div class="card-24h-yield" style="margin-top:4px;">📦 24H YIELD <span class="card-24h-sub">${fmt(econ.hiveStats.honeyPerHiveDay * econ.hives)} Honey</span></div>\n  </div>\n  </div>`;
  __markSub("      renderHoneySummaryCard: HTML build (incl. swarm table)");
  const swarmSel = $("swarmCropSelect");
  if (swarmSel) swarmSel.onchange = () => setSelectedSwarmCrop(swarmSel.value);
  const swarmBtn = $("swarmCropPickerBtn");
  const swarmMenu = $("swarmCropPickerMenu");
  if (swarmBtn && swarmMenu && swarmSel) {
    swarmBtn.onclick = e => {
      e.stopPropagation();
      const isOpen = swarmMenu.style.display !== "none";
      document.querySelectorAll(".seed-picker-menu").forEach(m => {
        m.style.display = "none";
      });
      swarmMenu.style.display = isOpen ? "none" : "block";
    };
    swarmMenu.querySelectorAll(".seed-picker-option").forEach(opt => {
      opt.onclick = e => {
        e.stopPropagation();
        swarmSel.value = opt.dataset.crop;
        swarmMenu.style.display = "none";
        swarmSel.onchange && swarmSel.onchange();
      };
    });
    if (!renderHoneySummaryCard._outsideClickBound) {
      document.addEventListener("click", () => {
        document.querySelectorAll(".seed-picker-menu").forEach(m => {
          m.style.display = "none";
        });
      });
      renderHoneySummaryCard._outsideClickBound = true;
    }
  }
}

export function renderHoneyList() {
  refreshFlowerComboIfVisible();
  loadBaseHoneyIfNeeded();
  __markSub("    renderHoneyList: loadBaseHoneyIfNeeded");
  renderHoneySummaryCard();
  __markSub("    renderHoneyList: renderHoneySummaryCard");
  renderFinder();
  __markSub("    renderHoneyList: renderFinder");
  const wrap = $("flowerItemList");
  const countEl = $("flowerCount");
  if (!wrap) return;
  if (countEl) countEl.textContent = `(${Object.keys(FLOWER_VARIETIES).length})`;
  const hiveInput = $("hiveCountInput");
  if (hiveInput && document.activeElement !== hiveInput) hiveInput.value = getHiveCount() || "";
  const seasonEmoji = {
    Spring: `<img src="${ICON_DATA["season_spring.png"]}" alt="Spring" style="width:14px;height:14px;vertical-align:-3px;image-rendering:pixelated;">`,
    Summer: `<img src="${ICON_DATA["season_summer.png"]}" alt="Summer" style="width:14px;height:14px;vertical-align:-3px;image-rendering:pixelated;">`,
    Autumn: `<img src="${ICON_DATA["season_autumn.png"]}" alt="Autumn" style="width:14px;height:14px;vertical-align:-3px;image-rendering:pixelated;">`,
    Winter: `<img src="${ICON_DATA["season_winter.png"]}" alt="Winter" style="width:14px;height:14px;vertical-align:-3px;image-rendering:pixelated;">`
  };
  withPreservedCardScrolls(wrap, () => {
    wrap.innerHTML = Object.keys(FLOWER_SEEDS).map(seedKey => {
      const seedData = FLOWER_SEEDS[seedKey];
      const seasonTxt = seedData.season ? `${seasonEmoji[seedData.season]} ${seedData.season} only` : "🌐 Any season";
      const varieties = Object.keys(FLOWER_VARIETIES).filter(n => FLOWER_VARIETIES[n].seed === seedKey);
      const seedIconHtml = IMAGE_ICONS[seedKey + " Seed"] ? getIcon(seedKey + " Seed") : FLOWER_SEED_ICONS[seedKey] || "🌱";
      return `<div class="flower-seed-box"><div class="lib-section-title" style="margin-top:0;">${seedIconHtml} ${seedKey} Seed\n        <span style="font-weight:400;text-transform:none;color:var(--wheat-dim);">(${formatDuration(seedData.timeSec)} · ${seasonTxt})</span></div>` + varieties.map(renderFlowerCard).join("") + `</div>`;
    }).join("");
  });
  __markSub("    renderHoneyList: variety cards (n=" + Object.keys(FLOWER_VARIETIES).length + ")");
  wrap.querySelectorAll(".card-toggle").forEach(el => {
    el.onclick = () => {
      const card = el.closest(".card");
      const name = card.dataset.search;
      const match = Object.keys(FLOWER_VARIETIES).find(n => n.toLowerCase() === name);
      if (expandedFlowers.has(match)) expandedFlowers.delete(match); else expandedFlowers.add(match);
      card.classList.toggle("expanded");
    };
  });
  wrap.querySelectorAll(".flower-seedtype-cost-input").forEach(inp => {
    inp.onclick = e => e.stopPropagation();
    inp.onchange = e => {
      e.stopPropagation();
      setFlowerSeedTypeCost(inp.dataset.seed, inp.value);
      withPreservedScroll(wrap, renderHoneyList);
      updateCalcSummary();
    };
  });
  wrap.querySelectorAll(".flower-variety-ingredient-select").forEach(sel => {
    sel.onclick = e => e.stopPropagation();
    sel.onchange = e => {
      e.stopPropagation();
      const name = sel.dataset.variety;
      const qtyInput = wrap.querySelector(`.flower-variety-ingredient-qty-input[data-variety="${name}"]`);
      setVarietyIngredient(name, sel.value, qtyInput ? qtyInput.value : 1, true);
      withPreservedScroll(wrap, renderHoneyList);
      updateCalcSummary();
    };
  });
  wrap.querySelectorAll(".flower-cross-btn").forEach(btn => {
    btn.onclick = e => {
      e.stopPropagation();
      const menu = btn.parentElement.querySelector(".flower-cross-menu");
      if (!menu) return;
      const isOpen = menu.style.display !== "none";
      wrap.querySelectorAll(".flower-cross-menu").forEach(m => {
        m.style.display = "none";
      });
      menu.style.display = isOpen ? "none" : "block";
    };
  });
  wrap.querySelectorAll(".flower-cross-chain-toggle").forEach(box => {
    box.onclick = e => {
      e.stopPropagation();
      const name = box.dataset.variety;
      if (expandedFlowerChains.has(name)) expandedFlowerChains.delete(name); else expandedFlowerChains.add(name);
      box.classList.toggle("open");
    };
  });
  wrap.querySelectorAll(".flower-cross-option").forEach(opt => {
    opt.onclick = e => {
      e.stopPropagation();
      const sel = wrap.querySelector(`.flower-variety-ingredient-select[data-variety="${opt.dataset.variety}"]`);
      if (!sel) return;
      sel.value = opt.dataset.ingredient;
      sel.onchange(e);
    };
  });
  wrap.querySelectorAll(".flower-variety-ingredient-qty-input").forEach(inp => {
    inp.onclick = e => e.stopPropagation();
    inp.onchange = e => {
      e.stopPropagation();
      const name = inp.dataset.variety;
      const sel = wrap.querySelector(`.flower-variety-ingredient-select[data-variety="${name}"]`);
      setVarietyIngredient(name, sel ? sel.value : FLOWER_VARIETIES[name].ingredients[0], inp.value);
      withPreservedScroll(wrap, renderHoneyList);
      updateCalcSummary();
    };
  });
  wrap.querySelectorAll(".set-active-flower-btn").forEach(btn => {
    btn.onclick = e => {
      e.stopPropagation();
      if (btn.disabled) return;
      setSelectedHoneyFlower(btn.dataset.flower);
      renderHoneyList();
    };
  });
}

function renderFlowerComboInner() {
  const wrap = $("flowerComboList");
  const countEl = $("flowerComboCount");
  if (!wrap) return;
  if (countEl) countEl.textContent = `(${Object.keys(FLOWER_VARIETIES).length})`;
  const seasonEmoji = {
    Spring: `<img src="${ICON_DATA["season_spring.png"]}" alt="Spring" style="width:14px;height:14px;vertical-align:-3px;image-rendering:pixelated;">`,
    Summer: `<img src="${ICON_DATA["season_summer.png"]}" alt="Summer" style="width:14px;height:14px;vertical-align:-3px;image-rendering:pixelated;">`,
    Autumn: `<img src="${ICON_DATA["season_autumn.png"]}" alt="Autumn" style="width:14px;height:14px;vertical-align:-3px;image-rendering:pixelated;">`,
    Winter: `<img src="${ICON_DATA["season_winter.png"]}" alt="Winter" style="width:14px;height:14px;vertical-align:-3px;image-rendering:pixelated;">`
  };
  withPreservedCardScrolls(wrap, () => {
    wrap.innerHTML = Object.keys(FLOWER_SEEDS).map(seedKey => {
      const seedData = FLOWER_SEEDS[seedKey];
      const seasonTxt = seedData.season ? `${seasonEmoji[seedData.season]} ${seedData.season} only` : "🌐 Any season";
      const varieties = Object.keys(FLOWER_VARIETIES).filter(n => FLOWER_VARIETIES[n].seed === seedKey);
      const seedIconHtml = IMAGE_ICONS[seedKey + " Seed"] ? getIcon(seedKey + " Seed") : FLOWER_SEED_ICONS[seedKey] || "🌱";
      return `<div class="flower-seed-box"><div class="lib-section-title" style="margin-top:0;">${seedIconHtml} ${seedKey} Seed\n        <span style="font-weight:400;text-transform:none;color:var(--wheat-dim);">(${formatDuration(seedData.timeSec)} · ${seasonTxt})</span></div>` + varieties.map(n => renderFlowerCard(n, true)).join("") + `</div>`;
    }).join("");
  });
  wrap.querySelectorAll(".card-toggle").forEach(el => {
    el.onclick = () => {
      const card = el.closest(".card");
      const name = card.dataset.search;
      const match = Object.keys(FLOWER_VARIETIES).find(n => n.toLowerCase() === name);
      if (expandedFlowers.has(match)) expandedFlowers.delete(match); else expandedFlowers.add(match);
      card.classList.toggle("expanded");
    };
  });
  wrap.querySelectorAll(".flower-seedtype-cost-input").forEach(inp => {
    inp.onclick = e => e.stopPropagation();
    inp.onchange = e => {
      e.stopPropagation();
      setFlowerSeedTypeCost(inp.dataset.seed, inp.value);
      withPreservedScroll(wrap, renderFlowerComboPanel);
      updateCalcSummary();
    };
  });
  wrap.querySelectorAll(".flower-variety-ingredient-select").forEach(sel => {
    sel.onclick = e => e.stopPropagation();
    sel.onchange = e => {
      e.stopPropagation();
      const name = sel.dataset.variety;
      const qtyInput = wrap.querySelector(`.flower-variety-ingredient-qty-input[data-variety="${name}"]`);
      setVarietyIngredient(name, sel.value, qtyInput ? qtyInput.value : 1, true);
      withPreservedScroll(wrap, renderFlowerComboPanel);
      updateCalcSummary();
    };
  });
  wrap.querySelectorAll(".flower-cross-btn").forEach(btn => {
    btn.onclick = e => {
      e.stopPropagation();
      const menu = btn.parentElement.querySelector(".flower-cross-menu");
      if (!menu) return;
      const isOpen = menu.style.display !== "none";
      wrap.querySelectorAll(".flower-cross-menu").forEach(m => {
        m.style.display = "none";
      });
      menu.style.display = isOpen ? "none" : "block";
    };
  });
  wrap.querySelectorAll(".flower-cross-chain-toggle").forEach(box => {
    box.onclick = e => {
      e.stopPropagation();
      const name = box.dataset.variety;
      if (expandedFlowerChains.has(name)) expandedFlowerChains.delete(name); else expandedFlowerChains.add(name);
      box.classList.toggle("open");
    };
  });
  wrap.querySelectorAll(".flower-cross-option").forEach(opt => {
    opt.onclick = e => {
      e.stopPropagation();
      const sel = wrap.querySelector(`.flower-variety-ingredient-select[data-variety="${opt.dataset.variety}"]`);
      if (!sel) return;
      sel.value = opt.dataset.ingredient;
      sel.onchange(e);
    };
  });
  wrap.querySelectorAll(".flower-variety-ingredient-qty-input").forEach(inp => {
    inp.onclick = e => e.stopPropagation();
    inp.onchange = e => {
      e.stopPropagation();
      const name = inp.dataset.variety;
      const sel = wrap.querySelector(`.flower-variety-ingredient-select[data-variety="${name}"]`);
      setVarietyIngredient(name, sel ? sel.value : FLOWER_VARIETIES[name].ingredients[0], inp.value);
      withPreservedScroll(wrap, renderFlowerComboPanel);
      updateCalcSummary();
    };
  });
}

export function renderFlowerComboPanel() {
  runWithFlowerMarketModes(renderFlowerComboInner);
}

function refreshFlowerComboIfVisible() {
  const el = $("flowerComboList");
  if (el && el.offsetParent !== null) renderFlowerComboPanel();
}

export function renderPlotNodeInputs() {
  const cropWrap = $("cropPlotInputs");
  cropWrap.innerHTML = `\n    <label style="font-size:11.4px;color:var(--ink-soft);">${getIcon("Crop Plot")} Crop plots (applies to ALL crops)</label>\n    <input type="number" min="0" step="1" id="globalCropPlotInput"\n      value="${globalPlotCount || ""}" placeholder="0"\n      style="width:100%;font-family:'JetBrains Mono',monospace;font-size:12.6px;border:1.25px solid var(--line);border-radius:6px;padding:4px 5px;">\n  `;
  $("globalCropPlotInput").addEventListener("input", e => {
    setPlotCount(e.target.value);
    renderLibraryLists();
    updateCalcSummary();
    renderBoostPanel();
    if (typeof renderCookingPanel === "function") renderCookingPanel();
    sflbRefreshMyBuildIfOpen();
  });
  const resWrap = $("resourceNodeInputs");
  const nodeLabelOverrides = {
    Wood: "Tree",
    Stone: "Stone Rock",
    Iron: "Iron Rock",
    Gold: "Gold Rock",
    Crimstone: "Crimstone Rock",
    Oil: "Oil Reserve"
  };
  resWrap.innerHTML = Object.keys(RESOURCE_DATA).map(name => {
    if (isTieredResource(name)) {
      const tiers = RESOURCE_NODE_TIERS[name];
      const t = getNodeTierCounts(name);
      const rows = tiers.map(tier => `\n        <label style="font-size:10.8px;color:var(--ink-soft);">${getIcon(tier.displayLabel || tier.label)} ${tier.displayLabel || tier.label}${tier.yieldAdd ? ` <span style="color:var(--profit);font-weight:700;">+${fmt(tier.yieldAdd)}</span>` : ""}</label>\n        <span style="text-align:center;font-size:10.8px;color:var(--ink-soft);">×${tier.mult}</span>\n        <input type="number" min="0" step="1" class="res-tier-input" data-res="${name}" data-tier="${tier.key}"\n          value="${t[tier.key] || ""}" placeholder="0"\n          style="width:100%;font-family:'JetBrains Mono',monospace;font-size:12.6px;border:1.25px solid var(--line);border-radius:6px;padding:4px 5px;">\n      `).join("");
      return `\n      <div style="grid-column:1 / -1;border:1.25px solid var(--line);border-radius:8px;padding:6px 8px;margin-bottom:2px;background:rgba(255,255,255,0.35);">\n        <div style="font-size:11.4px;font-weight:700;color:var(--ink);margin-bottom:4px;">${getIcon(nodeLabelOverrides[name] || name)} ${name} Nodes</div>\n        <div style="display:grid;grid-template-columns:1fr 34px 70px;gap:4px 8px;align-items:center;">\n          <div></div><div style="font-size:8.4px;color:var(--ink-soft);text-align:center;">TOOLS</div><div style="font-size:8.4px;color:var(--ink-soft);text-align:center;">QTY</div>\n          ${rows}\n        </div>\n      </div>`;
    }
    return `\n    <label style="font-size:11.4px;color:var(--ink-soft);">${getIcon(nodeLabelOverrides[name] || name)} ${nodeLabelOverrides[name] || name}</label>\n    <input type="number" min="0" step="1" class="res-node-input" data-res="${name}"\n      value="${getNodeCount(name) || ""}" placeholder="0"\n      style="width:100%;font-family:'JetBrains Mono',monospace;font-size:12.6px;border:1.25px solid var(--line);border-radius:6px;padding:4px 5px;">\n  `;
  }).join("") + `\n    <label style="font-size:11.4px;color:var(--ink-soft);">${getIcon("Lava Pit")} Lava Pit</label>\n    <input type="number" min="0" step="1" class="res-node-input" data-res="Lava Pit"\n      value="${getNodeCount("Lava Pit") || ""}" placeholder="0"\n      style="width:100%;font-family:'JetBrains Mono',monospace;font-size:12.6px;border:1.25px solid var(--line);border-radius:6px;padding:4px 5px;">\n    <label style="font-size:11.4px;color:var(--ink-soft);">${getIcon("Salt")} Salt (rocks, max ${farmLevelMaxNodes()} at Farm Level ${saltFarmLevel})</label>\n    <input type="number" min="0" max="${farmLevelMaxNodes()}" step="1" class="res-node-input" data-res="Salt"\n      value="${getNodeCount("Salt") || ""}" placeholder="0"\n      style="width:100%;font-family:'JetBrains Mono',monospace;font-size:12.6px;border:1.25px solid var(--line);border-radius:6px;padding:4px 5px;">\n  `;
  resWrap.querySelectorAll(".res-node-input").forEach(inp => {
    inp.addEventListener("input", () => {
      const val = inp.dataset.res === "Salt" ? Math.max(0, Math.min(farmLevelMaxNodes(), parseFloat(inp.value) || 0)) : parseFloat(inp.value) || 0;
      setNodeCount(inp.dataset.res, val);
      if (inp.dataset.res === "Salt") {
        if (typeof renderSaltList === "function") renderSaltList();
      } else {
        renderResourceList();
      }
      renderBoostPanel();
      if (typeof renderCookingPanel === "function") renderCookingPanel();
      sflbRefreshMyBuildIfOpen();
    });
  });
  resWrap.querySelectorAll(".res-tier-input").forEach(inp => {
    inp.addEventListener("input", () => {
      setNodeTierQty(inp.dataset.res, inp.dataset.tier, parseFloat(inp.value) || 0);
      renderResourceList();
      renderBoostPanel();
      if (typeof renderCookingPanel === "function") renderCookingPanel();
      sflbRefreshMyBuildIfOpen();
    });
  });
  const fruitWrap = $("fruitNodeInputs");
  fruitWrap.innerHTML = Object.keys(BASE_FRUITS).map(name => `\n    <label style="font-size:11.4px;color:var(--ink-soft);">${getIcon(name)} ${name}</label>\n    <input type="number" min="0" step="1" class="fruit-node-input" data-fruit="${name}"\n      value="${getFruitCount(name) || ""}" placeholder="0"\n      style="width:100%;font-family:'JetBrains Mono',monospace;font-size:12.6px;border:1.25px solid var(--line);border-radius:6px;padding:4px 5px;">\n  `).join("");
  fruitWrap.querySelectorAll(".fruit-node-input").forEach(inp => {
    inp.addEventListener("input", () => {
      setFruitCount(inp.dataset.fruit, parseFloat(inp.value) || 0);
      renderFruitsList();
      renderBoostPanel();
      if (typeof renderCookingPanel === "function") renderCookingPanel();
      sflbRefreshMyBuildIfOpen();
    });
  });
  const greenhouseWrap = $("greenhouseNodeInputs");
  greenhouseWrap.innerHTML = Object.keys(BASE_GREENHOUSE).map(name => `\n    <label style="font-size:11.4px;color:var(--ink-soft);">${getIcon(name)} ${name}</label>\n    <input type="number" min="0" step="1" class="greenhouse-node-input" data-greenhouse="${name}"\n      value="${getGreenhouseCount(name) || ""}" placeholder="0"\n      style="width:100%;font-family:'JetBrains Mono',monospace;font-size:12.6px;border:1.25px solid var(--line);border-radius:6px;padding:4px 5px;">\n  `).join("");
  greenhouseWrap.querySelectorAll(".greenhouse-node-input").forEach(inp => {
    inp.addEventListener("input", () => {
      setGreenhouseCount(inp.dataset.greenhouse, parseFloat(inp.value) || 0);
      renderGreenhouseList();
      renderBoostPanel();
      if (typeof renderCookingPanel === "function") renderCookingPanel();
      sflbRefreshMyBuildIfOpen();
    });
  });
  renderAnimalCountInputs();
  renderMedicineCostDisplay();
  renderMedicineIngredientInputs();
  renderAnimalCuresInputs();
}

function renderAnimalCountInputs() {
  const wrap = $("animalCountInputs");
  if (!wrap) return;
  wrap.innerHTML = `<div></div><div style="font-size:8.4px;color:var(--ink-soft);text-align:center;">LEVEL</div><div style="font-size:8.4px;color:var(--ink-soft);text-align:center;">HEADS</div>` + Object.keys(ANIMAL_DATA).map(type => {
    const cfg = ANIMAL_DATA[type];
    const c = getAnimalCount(type);
    return `\n      <label style="font-size:11.4px;color:var(--ink-soft);">${getIcon(cfg.label)} ${cfg.label}</label>\n      <input type="number" min="1" max="15" step="1" class="animal-level-input" data-type="${type}" value="${c.level || 1}"\n        style="width:100%;font-family:'JetBrains Mono',monospace;font-size:12.6px;border:1.25px solid var(--line);border-radius:6px;padding:4px 5px;">\n      <input type="number" min="0" step="1" class="animal-qty-input" data-type="${type}" value="${c.qty || 0}"\n        style="width:100%;font-family:'JetBrains Mono',monospace;font-size:12.6px;border:1.25px solid var(--line);border-radius:6px;padding:4px 5px;">`;
  }).join("");
  wrap.querySelectorAll(".animal-level-input").forEach(inp => {
    inp.addEventListener("input", () => {
      const v = Math.min(15, Math.max(1, parseInt(inp.value) || 1));
      setAnimalCount(inp.dataset.type, "level", v);
      renderAnimalsList();
      sflbRefreshMyBuildIfOpen();
    });
  });
  wrap.querySelectorAll(".animal-qty-input").forEach(inp => {
    inp.addEventListener("input", () => {
      setAnimalCount(inp.dataset.type, "qty", parseFloat(inp.value) || 0);
      renderAnimalsList();
      renderAnimalCuresInputs();
      sflbRefreshMyBuildIfOpen();
    });
  });
}

function renderAnimalCuresInputs() {
  const wrap = $("animalCuresInputs");
  if (!wrap) return;
  wrap.innerHTML = Object.keys(ANIMAL_DATA).map(type => {
    const cfg = ANIMAL_DATA[type];
    const qty = Math.max(0, parseFloat(getAnimalCount(type).qty) || 0);
    const est = getSicknessEstimate(type);
    const headsHint = qty > 0 ? `out of ${fmt(qty)} heads` : "set heads above first";
    return `\n    <div class="sickness-row" data-type="${type}" style="grid-column:1 / -1;background:rgba(255,255,255,0.35);border:1.25px solid var(--line);border-radius:8px;padding:6px 8px;margin-bottom:6px;">\n      <div style="font-size:11.4px;color:var(--ink);font-weight:700;margin-bottom:5px;">${getIcon(cfg.label)} ${cfg.label} — ${headsHint}</div>\n      <div style="display:grid;grid-template-columns:1fr 70px;gap:4px 8px;align-items:center;margin-bottom:4px;">\n        <label style="font-size:10.8px;color:var(--ink-soft);">Heads that usually get sick /day</label>\n        <input type="number" min="0" step="1" class="sick-heads-input" data-type="${type}" value="${est.sickHeads || 0}"\n          style="width:100%;font-family:'JetBrains Mono',monospace;font-size:12.6px;border:1.25px solid var(--line);border-radius:6px;padding:4px 5px;">\n      </div>\n      <div style="display:grid;grid-template-columns:1fr 70px;gap:4px 8px;align-items:center;">\n        <label style="font-size:10.8px;color:var(--ink-soft);">Cures each sick head needs</label>\n        <span style="width:100%;display:block;text-align:center;font-family:'JetBrains Mono',monospace;font-size:12.6px;color:var(--ink-soft);border:1.25px solid var(--line);border-radius:6px;padding:4px 5px;background:rgba(0,0,0,0.04);">1 (fixed)</span>\n      </div>\n    </div>`;
  }).join("");
  wrap.querySelectorAll(".sick-heads-input").forEach(inp => {
    inp.addEventListener("input", () => {
      animalSicknessEstimate[inp.dataset.type] = {
        sickHeads: parseFloat(inp.value) || 0
      };
      saveAnimalSicknessEstimate();
      renderAnimalsList();
    });
  });
}

function renderMedicineIngredientInputs() {
  const wrap = $("medicineIngredientInputs");
  if (!wrap) return;
  const recipe = getBoostedMedicineRecipe();
  wrap.innerHTML = Object.keys(recipe).map(name => {
    const qty = recipe[name];
    const mode = getMedicineIngredientMode(name);
    const unitCost = getMaterialUnitCostCoins(name, mode);
    const displayPrice = mode === "buy" ? coinsToFlower(unitCost) : unitCost;
    const displayUnit = mode === "buy" ? FLOWER_ICON : COIN_ICON;
    return `\n    <div class="calc-ingredient-row">\n      <span class="calc-ing-icon">${getIcon(name)}</span>\n      <div class="calc-ing-main">\n        <div class="calc-ing-name">${escapeHtml(name)} ×${fmt(qty)}</div>\n        <div class="calc-ing-meta">${mode === "collect" ? "Collect" : "Buy"} @ ${fmt(displayPrice)}${displayUnit}/u</div>\n      </div>\n      <div class="calc-ing-toggle">\n        <button type="button" class="calc-mode-btn medicine-mode-btn" data-mat="${escapeHtml(name)}" data-mode="collect" style="${mode === "collect" ? "border-color:var(--profit);color:var(--profit);" : ""}">Collect</button>\n        <button type="button" class="calc-mode-btn medicine-mode-btn" data-mat="${escapeHtml(name)}" data-mode="buy" style="${mode === "buy" ? "border-color:var(--flower);color:var(--flower);" : ""}">Buy</button>\n      </div>\n    </div>`;
  }).join("");
  wrap.querySelectorAll(".medicine-mode-btn").forEach(btn => {
    btn.onclick = () => {
      setMedicineIngredientMode(btn.dataset.mat, btn.dataset.mode);
      renderMedicineIngredientInputs();
      renderMedicineCostDisplay();
      renderAnimalsList();
    };
  });
}

function closeOtherHeaderPanels(exceptId) {
  if (exceptId !== "digPanelOverlay") {
    const digOverlay = $("digPanelOverlay");
    if (digOverlay && digOverlay.classList.contains("show") && typeof closeDigPanel === "function") closeDigPanel();
  }
  if (exceptId !== "potionPanelOverlay") {
    const potionOverlay = $("potionPanelOverlay");
    if (potionOverlay && potionOverlay.classList.contains("show") && typeof closePotionPanel === "function") closePotionPanel();
  }
  if (exceptId !== "boostPanelOverlay") {
    const boostOverlay = $("boostPanelOverlay");
    if (boostOverlay && boostOverlay.classList.contains("show") && typeof closeBoostPanel === "function") closeBoostPanel();
  }
  if (exceptId !== "moreMenuOverlay") {
    const moreMenuOverlay = $("moreMenuOverlay");
    if (moreMenuOverlay && moreMenuOverlay.classList.contains("show") && typeof closeMoreMenu === "function") closeMoreMenu();
  }
}

export function openBoostPanel() {
  closeOtherHeaderPanels("boostPanelOverlay");
  renderPlotNodeInputs();
  renderBoostPanel();
  const overlay = $("boostPanelOverlay");
  overlay.classList.add("show");
  requestAnimationFrame(() => requestAnimationFrame(() => overlay.classList.add("panel-open")));
}

export function closeBoostPanel() {
  if (isSkillDraftDirty() || isBoostDraftDirty()) {
    toast("⚠️ Save your changes first");
    const target = $("skillSaveBar");
    if (target) target.scrollIntoView({
      behavior: "smooth",
      block: "center"
    });
    return;
  }
  const overlay = $("boostPanelOverlay");
  overlay.classList.remove("panel-open");
  setTimeout(() => {
    overlay.classList.remove("show");
    overlay.classList.remove("opened-from-panel");
  }, 280);
}

setTimeout(renderSkillPanel, 0);

setTimeout(renderAscensionBar, 0);

document.querySelectorAll(".season-toggle").forEach(wrap => wrap.querySelectorAll("button").forEach(btn => {
  btn.onclick = () => setPreviewSeason(btn.dataset.season);
}));

function budToggleLabel(context, kind) {
  const options = budContextFields(context)[kind];
  const selected = budContextState(context);
  const current = options.find(o => o.id === selected[kind]) || options[0];
  return current.name + (current.label ? " — " + current.label : "");
}

export function renderBudDropdown(context, kind) {
  const cap = budFieldCap(kind);
  const toggle = $(budContextPrefix(context) + cap + "Toggle");
  if (!toggle) return;
  toggle.textContent = budToggleLabel(context, kind);
  toggle.onclick = () => {
    toggle.classList.remove("pop");
    void toggle.offsetWidth;
    toggle.classList.add("pop");
    openBudPicker(context, kind);
  };
}

function openBudPicker(context, kind) {
  const options = budContextFields(context)[kind];
  const selected = budContextState(context);
  __set_budPickerContext(context);
  __set_budPickerKind(kind);
  $("budPickerTitle").textContent = "Select " + BUD_FIELD_LABELS[kind];
  $("budPickerSub").textContent = "Tap one to select it as this BUD's " + BUD_FIELD_LABELS[kind].toLowerCase() + ".";
  $("budPickerList").innerHTML = options.map(o => `<div class="bud-picker-option${o.id === selected[kind] ? " selected" : ""}" data-value="${o.id}">\n      <span>${escapeHtml(o.name)}${o.label ? " — " + escapeHtml(o.label) : ""}</span>\n      <span class="bud-opt-radio"></span>\n    </div>`).join("");
  $("budPickerList").querySelectorAll("[data-value]").forEach(el => {
    el.onclick = () => {
      budContextState(budPickerContext)[budPickerKind] = el.dataset.value;
      renderBudDropdown(budPickerContext, budPickerKind);
      budContextUpdateDuplicateState(budPickerContext);
      closeBudPicker();
    };
  });
  $("budPickerOverlay").classList.add("show");
}

export function closeBudPicker() {
  $("budPickerOverlay").classList.remove("show");
  __set_budPickerKind(null);
}

export function openDisclaimer() {
  $("disclaimerOverlay").classList.add("show");
}

export function closeDisclaimer() {
  $("disclaimerOverlay").classList.remove("show");
}

function renderBettyRow(item, index) {
  const listTab = bettyActiveTab === "base" ? "base" : "top";
  const rate = listTab === "base" ? item.baseRate : item.boostedRate;
  const boostedClass = listTab === "top" && bettyGreenThumbOn ? "betty-row-boosted" : "";
  const boostFactor = listTab === "top" && item.baseRate > 0 ? item.boostedRate / item.baseRate : 1;
  const baseCoinHtml = boostFactor > 1.00001 ? `<s class="betty-base-old">${fmt(item.baseCoin)}</s> <b class="betty-base-new">${fmt(item.baseCoin * boostFactor)}</b>` : `<b>${fmt(item.baseCoin)}</b>`;
  const rankBadge = listTab === "top" ? `<div class="betty-row-rank">${index + 1}</div>` : "";
  return `<div class="betty-row ${index === 0 && listTab === "top" ? "rank-1" : ""}" style="--row-i:${index};"><div class="betty-row-head"><div class="betty-row-title">${rankBadge}<span class="betty-row-icon">${getIcon(item.name)}</span><span class="betty-row-name">${escapeHtml(item.name)}</span><span class="betty-row-tag">${item.category}</span></div><span class="betty-row-qty">×${fmt(item.qty)}</span></div><div class="betty-row-body"><div class="betty-row-meta"><div>Market Price <b>${fmt(item.marketPrice)}</b> ${FLOWER_ICON}</div><div>Base Coin/U ${baseCoinHtml} ${COIN_ICON}</div><div>Sell to Betty <b>×${fmt(item.qty)}</b> <span class="betty-sell-icon">${getIcon(item.name)}</span></div></div><div class="betty-row-value"><div class="betty-row-coins ${boostedClass}">${fmtCoinValue(rate)} ${COIN_ICON}<small>coins / FLOWER</small></div></div></div></div>`;
}

function fmtCoinValue(n) {
  if (!isFinite(n)) return "—";
  return (Math.round(n * 100) / 100).toLocaleString(undefined, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  });
}

function bettySwindlerMultFor(rank) {
  const data = ASCENSION_RANK_DATA.skill_coin_swindler;
  const v = data && Array.isArray(data.values) ? data.values[Math.min(Math.max(rank, 1), data.values.length) - 1] : 1.1;
  return typeof v === "number" && v > 0 ? v : 1.1;
}

function renderBettySwindlerNote() {
  const check = $("bettySwindlerCheck");
  if (!check) return;
  const active = typeof isBoostActive === "function" && isBoostActive("skill_coin_swindler");
  const rank = Math.min(3, Math.max(1, getAscensionRank("skill_coin_swindler")));
  check.checked = active;
  $("bettySwindlerDesc").textContent = `+${Math.round((bettySwindlerMultFor(rank) - 1) * 100)}% coins`;
  document.querySelectorAll("#bettySwindlerRank [data-swindler-rank]").forEach(b => {
    b.classList.toggle("active", Number(b.dataset.swindlerRank) === rank);
  });
}

let bettyCalcPool = [];

let bettyCalcName = null;

let bettyCalcQty = 1;

function bettyCalcFindItem() {
  return bettyCalcPool.find(it => it.name === bettyCalcName) || null;
}

function renderBettyCalcPicker() {
  const listEl = $("bettyCalcPickerList");
  if (!listEl || $("bettyCalcPicker").classList.contains("hidden")) return;
  const q = $("bettyCalcSearch").value.trim().toLowerCase();
  const matches = bettyCalcPool.filter(it => !q || it.name.toLowerCase().includes(q));
  listEl.innerHTML = matches.map(it => `<button type="button" class="calc-selected betty-calc-opt" data-calc-item="${escapeHtml(it.name)}"><span class="calc-selected-icon">${getIcon(it.name)}</span><span class="calc-selected-name">${escapeHtml(it.name)}</span><span class="betty-calc-opt-rate">${fmtCoinValue(it.boostedRate * it.marketPrice)} ${COIN_ICON}</span></button>`).join("");
}

function renderBettyCalc() {
  if (!$("bettyCalcBox")) return;
  const item = bettyCalcFindItem();
  if (!item) bettyCalcName = null;
  $("bettyCalcEmpty").classList.toggle("hidden", !!item);
  $("bettyCalcSelected").classList.toggle("hidden", !item);
  if (item) {
    const qty = Math.max(0, Number(bettyCalcQty) || 0);
    const perUnit = item.boostedRate * item.marketPrice;
    $("bettyCalcIcon").innerHTML = getIcon(item.name);
    $("bettyCalcName").textContent = item.name;
    $("bettyCalcUnit").innerHTML = `${fmtCoinValue(perUnit)} ${COIN_ICON}<span class="betty-calc-per">/ ${getIcon(item.name)}</span>`;
    $("bettyCalcTotal").innerHTML = `${fmtCoinValue(perUnit * qty)} ${COIN_ICON}`;
    $("bettyCalcFlower").innerHTML = `${fmt(item.marketPrice * qty)} ${FLOWER_ICON}`;
  } else {
    $("bettyCalcUnit").innerHTML = "—";
    $("bettyCalcTotal").innerHTML = "—";
    $("bettyCalcFlower").innerHTML = "—";
  }
  renderBettyCalcPicker();
}

$("bettyCalcQty").oninput = e => {
  bettyCalcQty = e.target.value;
  renderBettyCalc();
};

$("bettyCalcPickBtn").onclick = () => {
  const picker = $("bettyCalcPicker");
  picker.classList.toggle("hidden");
  if (!picker.classList.contains("hidden")) {
    $("bettyCalcSearch").value = "";
    renderBettyCalcPicker();
    $("bettyCalcSearch").focus();
  }
};

$("bettyCalcSearch").oninput = renderBettyCalcPicker;

$("bettyCalcPickerList").onclick = e => {
  const btn = e.target.closest("[data-calc-item]");
  if (!btn) return;
  bettyCalcName = btn.dataset.calcItem;
  $("bettyCalcPicker").classList.add("hidden");
  renderBettyCalc();
};

$("bettyCalcClearBtn").onclick = () => {
  bettyCalcName = null;
  renderBettyCalc();
};

export function renderBettyShop() {
  const items = bettySortItems(bettyGatherItems());
  const listEl = $("bettyList");
  const rateEl = $("bettyHighestRateValue");
  const swindlerOn = typeof isBoostActive === "function" && isBoostActive("skill_coin_swindler");
  const swindlerMult = swindlerOn ? getSkillRankMult("skill_coin_swindler") : 1;
  const itemsWithSwindler = items.map(it => ({
    ...it,
    boostedRate: it.boostedRate * (it.category === "Crop" ? swindlerMult : 1)
  }));
  const highest = bettyHighestRate(itemsWithSwindler);
  rateEl.innerHTML = highest ? `${fmtCoinValue(highest.boostedRate)} ${COIN_ICON}<small>${escapeHtml(highest.name)} · coins / FLOWER</small>` : `—<small>coins / FLOWER</small>`;
  if (highest && highest.boostedRate > 0) {
    const rounded = Math.round(highest.boostedRate * 100) / 100;
    if (Math.abs(rounded - coinPerFlower) > .005) {
      __set_coinPerFlower(rounded);
      const rateInputEl = $("rateInput");
      if (rateInputEl) setRateInputValue(coinPerFlower);
      saveState();
      updateSettingsSummary();
      updateCalcSummary();
      renderLibraryLists();
      renderCropMachinePanel();
    }
  }
  if (!itemsWithSwindler.length) {
    listEl.innerHTML = `<div class="betty-empty">🌾 No Betty prices added yet.<br>Base coin sell values will show up here once they're filled in.</div>`;
  } else {
    const sorted = bettySortItems(itemsWithSwindler);
    listEl.innerHTML = sorted.map(renderBettyRow).join("");
  }
  renderBettySwindlerNote();
  bettyCalcPool = bettySortItems(itemsWithSwindler);
  renderBettyCalc();
  $("bettyShopBody").dataset.tab = bettyActiveTab;
  $("bettyTabTop").classList.toggle("active", bettyActiveTab === "top");
  $("bettyTabBase").classList.toggle("active", bettyActiveTab === "base");
  $("bettyTabCalc").classList.toggle("active", bettyActiveTab === "calc");
  document.querySelectorAll(".betty-sort-btn").forEach(btn => {
    btn.classList.toggle("active", btn.dataset.sort === bettySortMode);
  });
  $("bettyGreenThumbToggle").checked = bettyGreenThumbOn;
}

export function openBettyShop() {
  renderBettyShop();
  $("bettyShopOverlay").classList.add("show");
  syncModalRoute("coinconverter", true);
}

export function closeBettyShop() {
  $("bettyShopOverlay").classList.remove("show");
  syncModalRoute("coinconverter", false);
}

document.querySelectorAll(".betty-sort-btn").forEach(btn => {
  btn.onclick = () => {
    __set_bettySortMode(btn.dataset.sort);
    document.querySelectorAll(".betty-sort-btn").forEach(b => b.classList.toggle("active", b === btn));
    setTimeout(renderBettyShop, 0);
  };
});

function renderTradeCard(t, fig, index) {
  const isProfit = fig.pl >= 0;
  const expanded = tradeExpandedIds.has(tradeCardKey("active", t.id));
  const sellsLog = (t.sells || []).length ? `\n    <div class="trade-sells-log">\n      <div class="trade-sells-log-label">💵 Sale history</div>\n      ${t.sells.map(s => {
    const sFee = s.feePercent || 0;
    const feeNote = sFee > 0 ? ` <span style="opacity:.75;">(${fmt(sFee)}% fee: −${fmt(s.feeAmount)})</span>` : "";
    return `\n        <div class="trade-sell-row">\n          <span>${fmt(s.qty)}× @ ${fmt(s.price)} ${FLOWER_ICON}/u${feeNote}</span>\n          <b>${fmt(s.net != null ? s.net : s.total)} ${FLOWER_ICON}</b>\n          <span>${formatTrade12h(s.timestamp)}</span>\n        </div>`;
  }).join("")}\n    </div>` : "";
  const feeRow = fig.feePercent > 0 ? `\n      <div class="trade-card-stat"><span class="label">Sell fee (${fmt(fig.feePercent)}%)</span><span class="value is-loss">−${fmt(fig.feeAmount)} ${FLOWER_ICON}</span></div>` : "";
  return `\n  <div class="trade-card ${index === 0 && tradeSortMode === "profit" ? "rank-1" : ""}${expanded ? "" : " is-collapsed"}" style="--row-i:${index};" data-trade-id="${t.id}">\n    <div class="trade-card-top">\n      <span class="trade-card-icon">${getIcon(t.itemName)}</span>\n      <div class="trade-card-main">\n        <div class="trade-card-name">\n          ${index === 0 && tradeSortMode === "profit" ? `<span class="trade-card-rank">1</span>` : ""}\n          ${escapeHtml(t.itemName)}\n        </div>\n        <div class="trade-card-date">Bought ${formatTrade12h(t.createdAt)}</div>\n      </div>\n      <span class="trade-card-fold-chev collapse-arrow${expanded ? "" : " is-collapsed"}">${expanded ? "▾" : "▸"}</span>\n    </div>\n    <div class="trade-card-grid">\n      <div class="trade-card-stat is-primary-stat"><span class="label">Buying price/u</span><span class="value">${fmt(t.buyPrice)} ${FLOWER_ICON}</span></div>\n      <div class="trade-card-stat"><span class="label">Quantity held</span><span class="value">${fmt(t.remainingQty)}</span></div>\n      <div class="trade-card-stat"><span class="label">Market price/u</span><span class="value">${fmt(fig.marketPrice)} ${FLOWER_ICON}</span></div>\n      <div class="trade-card-stat"><span class="label">Total capital</span><span class="value">${fmt(fig.costBasis)} ${FLOWER_ICON}</span></div>\n      ${feeRow}\n      <div class="trade-card-stat"><span class="label">Gross</span><span class="value">${fmt(fig.grossMarketValue)} ${FLOWER_ICON}</span></div>\n      <div class="trade-card-stat is-primary-stat"><span class="label">Profit / Loss</span><span class="value ${isProfit ? "is-profit" : "is-loss"}">${isProfit ? "+" : ""}${fmt(fig.pl)} ${FLOWER_ICON}</span></div>\n      <div class="trade-card-stat"><span class="label">Net</span><span class="value">${fmt(fig.marketValue)} ${FLOWER_ICON}</span></div>\n    </div>\n    ${sellsLog}\n    <div class="trade-card-actions">\n      <button type="button" class="trade-sell-btn" data-sell-id="${t.id}">💰 Sell</button>\n      <button type="button" class="trade-delete-btn" data-del-id="${t.id}">🗑</button>\n    </div>\n  </div>`;
}

function renderTradeHistoryCard(t) {
  const isProfit = t.realizedPl >= 0;
  const expanded = tradeExpandedIds.has(tradeCardKey("hist", t.id));
  const totalFees = (t.sells || []).reduce((s, x) => s + (x.feeAmount || 0), 0);
  const totalGrossSoldValue = (t.sells || []).reduce((s, x) => s + (x.total != null ? x.total : (x.net || 0) + (x.feeAmount || 0)), 0);
  const totalQtySold = (t.sells || []).reduce((s, x) => s + (x.qty || 0), 0);
  const avgSellPricePerUnit = totalQtySold > 0 ? totalGrossSoldValue / totalQtySold : 0;
  const feeRow = totalFees > 0 ? `\n      <div class="trade-card-stat"><span class="label">Fees paid</span><span class="value is-loss">−${fmt(totalFees)} ${FLOWER_ICON}</span></div>` : "";
  return `\n  <div class="trade-history-card${expanded ? "" : " is-collapsed"}" data-trade-id="${t.id}">\n    <div class="trade-card-top">\n      <span class="trade-card-icon">${getIcon(t.itemName)}</span>\n      <div class="trade-card-main">\n        <div class="trade-card-name">${escapeHtml(t.itemName)}</div>\n        <div class="trade-card-date">Bought ${formatTrade12h(t.createdAt)} · Closed ${formatTrade12h(t.closedAt)}</div>\n      </div>\n      <span class="trade-card-fold-chev collapse-arrow${expanded ? "" : " is-collapsed"}">${expanded ? "▾" : "▸"}</span>\n    </div>\n    <div class="trade-card-grid">\n      <div class="trade-card-stat"><span class="label">Sell price/u</span><span class="value">${fmt(avgSellPricePerUnit)} ${FLOWER_ICON}</span></div>\n      <div class="trade-card-stat"><span class="label">Buy price/u</span><span class="value">${fmt(t.buyPrice)} ${FLOWER_ICON}</span></div>\n      <div class="trade-card-stat is-primary-stat"><span class="label">Qty traded</span><span class="value">${fmt(t.qty)}</span></div>\n      <div class="trade-card-stat"><span class="label">Total capital</span><span class="value">${fmt(t.qty * t.buyPrice)} ${FLOWER_ICON}</span></div>\n      <div class="trade-card-stat"><span class="label">Gross</span><span class="value">${fmt(totalGrossSoldValue)} ${FLOWER_ICON}</span></div>\n      <div class="trade-card-stat"><span class="label">Total sold value (net)</span><span class="value">${fmt(t.totalSoldValue)} ${FLOWER_ICON}</span></div>\n      ${feeRow}\n      <div class="trade-card-stat is-primary-stat"><span class="label">Realized P/L</span><span class="value ${isProfit ? "is-profit" : "is-loss"}">${isProfit ? "+" : ""}${fmt(t.realizedPl)} ${FLOWER_ICON}</span></div>\n    </div>\n    <div class="trade-card-actions">\n      <button type="button" class="trade-delete-btn" data-hist-del-id="${t.id}">🗑</button>\n    </div>\n  </div>`;
}

function renderTradeLifetimeBanner() {
  const pl = tradeLifetime.sold - tradeLifetime.invested;
  const isProfit = pl >= 0;
  return `\n  <div class="trade-lifetime-banner">\n    <div class="trade-lifetime-stat">\n      <div class="trade-lifetime-label">Invested</div>\n      <div class="trade-lifetime-value">${fmt(tradeLifetime.invested)}<br><small>FLOWER</small></div>\n    </div>\n    <div class="trade-lifetime-stat">\n      <div class="trade-lifetime-label">Sold</div>\n      <div class="trade-lifetime-value">${fmt(tradeLifetime.sold)}<br><small>FLOWER</small></div>\n    </div>\n    <div class="trade-lifetime-stat">\n      <div class="trade-lifetime-label">Profit/Loss</div>\n      <div class="trade-lifetime-value ${isProfit ? "is-profit" : "is-loss"}">${isProfit ? "+" : ""}${fmt(pl)}<br><small>FLOWER</small></div>\n    </div>\n  </div>`;
}

export function renderTradeShop() {
  $("tradeTabActive").classList.toggle("active", tradeActiveTab === "active");
  $("tradeTabHistory").classList.toggle("active", tradeActiveTab === "history");
  $("tradeSortRow").style.display = tradeActiveTab === "active" ? "flex" : "none";
  const lifetimeEl = $("tradeLifetimeBanner");
  if (tradeActiveTab === "history") {
    lifetimeEl.style.display = "block";
    lifetimeEl.innerHTML = renderTradeLifetimeBanner();
  } else {
    lifetimeEl.style.display = "none";
    lifetimeEl.innerHTML = "";
  }
  const listEl = $("tradeList");
  if (tradeActiveTab === "active") {
    const sorted = tradeGatherActiveSorted();
    listEl.innerHTML = sorted.length ? sorted.map((x, i) => renderTradeCard(x.t, x.fig, i)).join("") : `<div class="trade-empty">📦 No active trades yet.<br>Tap ➕ ADD TRADE to record your first buy.</div>`;
    listEl.querySelectorAll("[data-sell-id]").forEach(btn => {
      btn.onclick = () => openSellTradeModal(btn.dataset.sellId);
    });
    listEl.querySelectorAll("[data-del-id]").forEach(btn => {
      btn.onclick = () => deleteActiveTrade(btn.dataset.delId);
    });
    listEl.querySelectorAll(".trade-card").forEach(card => {
      const top = card.querySelector(".trade-card-top");
      if (!top) return;
      top.onclick = () => {
        const key = tradeCardKey("active", card.dataset.tradeId);
        if (tradeExpandedIds.has(key)) tradeExpandedIds.delete(key); else tradeExpandedIds.add(key);
        renderTradeShop();
      };
    });
  } else {
    listEl.innerHTML = tradeHistory.length ? tradeHistory.map(renderTradeHistoryCard).join("") : `<div class="trade-empty">📜 No closed trades yet.<br>Trades move here once fully sold.</div>`;
    listEl.querySelectorAll("[data-hist-del-id]").forEach(btn => {
      btn.onclick = () => deleteHistoryTrade(btn.dataset.histDelId);
    });
    listEl.querySelectorAll(".trade-history-card").forEach(card => {
      const top = card.querySelector(".trade-card-top");
      if (!top) return;
      top.onclick = () => {
        const key = tradeCardKey("hist", card.dataset.tradeId);
        if (tradeExpandedIds.has(key)) tradeExpandedIds.delete(key); else tradeExpandedIds.add(key);
        renderTradeShop();
      };
    });
  }
}

export let npcDeliverToggle = safeParse(localStorage.getItem("hl_ticket_v2_npc_deliver"), {});

export let bountyToggle = localStorage.getItem("hl_ticket_v2_bounty_toggle") === "1";

export function setBountyToggle(v) {
  bountyToggle = !!v;
  localStorage.setItem("hl_ticket_v2_bounty_toggle", bountyToggle ? "1" : "0");
}

export function renderTicketCalc() {
  const el = $("ticketCalcBody");
  if (!el) return;
  const c = computeAll();
  const vip = ticketBoosts.vip;
  const vipFarmId = readFarmSyncedId();
  const vipIsLifetime = farmPanelGetLastInfo().vipLifetime;
  const vipDetected = readFarmVipEnabled();
  const vipSourceNote = !vipFarmId ? "No farm synced — toggle manually" : vipDetected ? `Synced from Farm ${vipFarmId} — VIP active${vipIsLifetime ? " (Lifetime)" : ""} · auto-enabled` : `Synced from Farm ${vipFarmId} — no active VIP · toggle manually if needed`;
  const vipCardHtml = `\n      <div class="tc-boost-card" style="border-color:var(--sun-deep);background:linear-gradient(135deg, rgba(217,112,31,.14), var(--paper-dim));">\n        <div class="tc-boost-head">\n          <div>\n            <div class="tc-boost-name">⭐ VIP Access</div>\n            <div class="tc-boost-tag">+2 ticket per delivery when active</div>\n          </div>\n          <div class="tc-seg" style="width:120px;">\n            <button type="button" class="tc-seg-btn boost-enable-btn ${vip.enabled ? "active" : "active off"}" data-tier="vip">\n              ${vip.enabled ? "ON" : "OFF"}\n            </button>\n          </div>\n        </div>\n        <div class="tc-field-note" style="margin-top:2px;">🔄 ${vipSourceNote}</div>\n      </div>`;
  const boostCardsHtml = BOOST_TIERS.map(t => {
    const b = ticketBoosts[t];
    return `\n      <div class="tc-boost-card">\n        <div class="tc-boost-head">\n          <div>\n            <div class="tc-boost-name">${BOOST_LABELS[t]}</div>\n            <div class="tc-boost-tag">+1 ticket per delivery when active</div>\n          </div>\n          <div class="tc-seg" style="width:120px;">\n            <button type="button" class="tc-seg-btn boost-enable-btn ${b.enabled ? "active" : "active off"}" data-tier="${t}">\n              ${b.enabled ? "ON" : "OFF"}\n            </button>\n          </div>\n        </div>\n        ${b.enabled ? `\n        <div class="tc-seg">\n          <button type="button" class="tc-seg-btn cost-mode-btn ${b.costMode === "cost" ? "active danger" : ""}" data-tier="${t}" data-mode="cost">Cost Ticket</button>\n          <button type="button" class="tc-seg-btn cost-mode-btn ${b.costMode === "nocost" ? "active" : ""}" data-tier="${t}" data-mode="nocost">No Cost</button>\n        </div>\n        ${b.costMode === "cost" ? `\n        <div class="tc-boost-cost-row">\n          <label>Ticket cost to activate</label>\n          <input type="number" min="0" step="1" class="boost-cost-input" data-tier="${t}" value="${b.cost}" />\n        </div>` : ""}` : ""}\n      </div>`;
  }).join("");
  const npcRowsHtml = c.npcRows.map(r => {
    const s = slug(r.npc);
    const skipVal = npcSkipDays[r.npc] || 0;
    const flowerVal = npcFlowerCost[r.npc] || 0;
    return `\n      <div class="tc-npc-row" style="flex-wrap:wrap;">\n        <img class="tc-npc-icon" src="${NPC_ICONS[r.npc]}" alt="${TICKET_NPC_DISPLAY_NAMES[r.npc]}" />\n        <div style="flex:1;min-width:120px;">\n          <div class="tc-npc-name">${TICKET_NPC_DISPLAY_NAMES[r.npc]}</div>\n          <div class="tc-npc-meta" id="npcMeta-${s}">base ${fmt(r.base)} → ${fmt(r.perDelivery)}/delivery${c.totalBoostBonus ? ` (+${c.totalBoostBonus} boost)` : ""}${r.skip ? ` − ${fmt(r.skip)} skipped` : ""}</div>\n        </div>\n        <div class="tc-npc-toggle">\n          <button type="button" class="npc-deliver-btn ${r.on ? "active" : ""}" data-npc="${r.npc}" data-val="1">Deliver it</button>\n          <button type="button" class="npc-deliver-btn ${!r.on ? "active off-state" : ""}" data-npc="${r.npc}" data-val="0">Do not deliver</button>\n        </div>\n        <div class="tc-npc-total" id="npcTotal-${s}">${fmt(r.total)}</div>\n        <div class="tc-npc-skip" style="flex-basis:100%;display:flex;align-items:center;gap:8px;margin-top:6px;">\n          <label style="font-size:11.4px;color:var(--ink-soft);flex:1;">Skip days (days not delivered)</label>\n          <input type="number" min="0" step="1" class="npc-skip-input" data-npc="${r.npc}" value="${skipVal}"\n            style="width:64px;text-align:center;font-family:'JetBrains Mono',monospace;font-size:13.2px;border:2px solid var(--ink);border-radius:0;padding:5px 2px;background:#fff;color:var(--ink);" />\n        </div>\n        <div class="tc-npc-flower" style="flex-basis:100%;display:flex;align-items:center;gap:8px;margin-top:6px;">\n          <label style="font-size:11.4px;color:var(--ink-soft);flex:1;">${FLOWER_ICON} FLOWER cost per delivery</label>\n          <input type="number" min="0" step="1" class="npc-flower-input" data-npc="${r.npc}" value="${flowerVal}"\n            style="width:64px;text-align:center;font-family:'JetBrains Mono',monospace;font-size:13.2px;border:2px solid var(--ink);border-radius:0;padding:5px 2px;background:#fff;color:var(--ink);" />\n        </div>\n      </div>\n    `;
  }).join("");
  el.innerHTML = `\n      <div class="tc-intro">\n        🎟️ Project how many <b>Chapter Tickets</b> you'll earn from deliveries, boosts, animals, Bounty Board, and the Megastore over the whole season — same purpose every season (buying SFT/NFTs in Stella Megastore and bidding in the Auction House), just a new label each time.\n      </div>\n\n      <div class="tc-section">\n        <div class="tc-section-title">🚀 TICKET BOOSTS (Stella Megastore)</div>\n        <div class="tc-section-sub">Tier boosts are off by default and toggled manually; each adds +1 ticket per NPC delivery. VIP Access also adds +2 — it's auto-enabled when your synced farm has active VIP/Lifetime Farmer Banner, but you can toggle it manually too. Bonuses stack and also apply to animal sales.</div>\n        ${vipCardHtml}\n        ${boostCardsHtml}\n      </div>\n\n      <div class="tc-section">\n        <div class="tc-section-title">📦 UNDELIVERED LAST SEASON</div>\n        <div class="tc-section-sub">If you held a delivery back from the end of last season, it carries over and can be delivered on day 1 of the new season. Enter it here and it's added straight to your total.</div>\n        <div class="tc-field">\n          <label>Undelivered tickets from last season</label>\n          <input type="number" min="0" step="1" id="undeliveredInput" value="${undeliveredLastSeason}" />\n        </div>\n      </div>\n\n      <div class="tc-section">\n        <div class="tc-section-title">📅 SEASON LENGTH &amp; DOUBLE DELIVERY</div>\n        <div class="tc-section-sub">Find the day countdown in the Stella Megastore and enter it here.</div>\n        <div class="tc-field">\n          <label>Days the season will last</label>\n          <input type="number" min="0" step="1" id="seasonDaysInput" value="${seasonDays}" />\n        </div>\n        <div class="tc-breakdown">\n          <div class="tc-breakdown-line"><span>Week 1 deducted (no deliveries allowed at season start)</span><b id="bd-firstweek">−${fmt(c.firstWeekDeduction)} days</b></div>\n          <div class="tc-breakdown-line"><span>Delivery-eligible days remaining</span><b id="bd-remaining">${fmt(c.remainingDeliveryDays)} days</b></div>\n          <div class="tc-breakdown-line"><span>Double Delivery days (×2 reward, once per week)</span><b id="bd-doubleweeks">${fmt(c.doubleDeliveryWeeks)} days</b></div>\n          <div class="tc-breakdown-line"><span>Auction Week (Animals &amp; Bounty Board pay 0 that week; deliveries + Megastore still pay)</span><b>1 week</b></div>\n          <div class="tc-breakdown-line"><span>Weeks Animals, Bounty Board &amp; Chores actually pay out</span><b id="bd-eligibleweeks">${fmt(c.animalBountyEligibleWeeks)} wk</b></div>\n        </div>\n      </div>\n\n      <div class="tc-section">\n        <div class="tc-section-title">🧑‍🌾 NPC DELIVERIES</div>\n        <div class="tc-section-sub">Toggle "Deliver it" for every NPC you'll deliver to daily for the rest of the season. Off by default.</div>\n        ${npcRowsHtml}\n      </div>\n\n      <div class="tc-estimate-panel">\n        <div class="tc-section-title">🐔 ANIMALS &amp; 🐾 BOUNTY BOARD (POPPY TRADE)</div>\n        <div class="tc-estimate-disclaimer">⚠️ Unlike NPC deliveries and Megastore rewards, Animal and Bounty Board reward tables are random — these two figures are estimates, averaged across every eligible week until the season ends.</div>\n\n        <div class="tc-field-tag">ANIMAL BOUNTY</div>\n        <div class="tc-field">\n          <label>Average tickets from Animal selling, per week</label>\n          <input type="number" min="0" step="1" id="animalWeeklyInput" value="${animalWeekly}" />\n        </div>\n        <div class="tc-field-note">This should be the actual weekly total you see in-game — if a boost is active, the game already adds its bonus to each animal sale, so don't add anything extra here.</div>\n        <div class="tc-field" style="margin-top:8px;">\n          <label>${FLOWER_ICON} FLOWER cost from Animal selling, per week</label>\n          <input type="number" min="0" step="1" id="animalFlowerInput" value="${animalFlowerCost}" />\n        </div>\n\n        <div class="tc-field-tag" style="margin-top:12px;">POPPY TRADE</div>\n        <div class="tc-field">\n          <label>Average tickets from selling items to Poppy Trade, per week</label>\n          <input type="number" min="0" step="1" id="bountyWeeklyInput" value="${bountyWeekly}" />\n        </div>\n        <div class="tc-field-note">Selling items to Poppy for tickets, separate from the completion bonus below.</div>\n        <div class="tc-field" style="margin-top:8px;">\n          <label>${FLOWER_ICON} FLOWER cost from selling items to Poppy Trade, per week</label>\n          <input type="number" min="0" step="1" id="bountyFlowerInput" value="${bountyFlowerCost}" />\n        </div>\n\n        <div class="tc-field-tag" style="margin-top:12px;">WEEKLY CHORES</div>\n        <div class="tc-field">\n          <label>Weekly Chores — average tickets per week</label>\n          <input type="number" min="0" step="1" id="choresWeeklyInput" value="${choresWeekly}" />\n        </div>\n        <div class="tc-field-note" id="chores-note">Off during the season's first week and during Auction Week — only ${fmt(c.animalBountyEligibleWeeks)} of the ${fmt(c.totalSeasonWeeks)} weeks in a ${fmt(seasonDays)}-day season actually pay out.</div>\n        <div class="tc-field" style="margin-top:8px;">\n          <label>${FLOWER_ICON} FLOWER cost from Weekly Chores, per week</label>\n          <input type="number" min="0" step="1" id="choresFlowerInput" value="${choresFlowerCost}" />\n        </div>\n\n        <div class="tc-boost-card" style="margin-top:12px;background:rgba(255,255,255,.06);border-color:rgba(255,255,255,.3);">\n          <div class="tc-boost-head">\n            <div>\n              <div class="tc-boost-name">Poppy Trade (Bounty Board)</div>\n              <div class="tc-boost-tag" style="color:#c8ded8;">+${BOUNTY_WEEKLY_BONUS} tickets/week if fully completed</div>\n            </div>\n            <div class="tc-seg" style="width:150px;">\n              <button type="button" id="bountyToggleBtn" class="tc-seg-btn ${bountyToggle ? "active" : "active off"}">\n                ${bountyToggle ? "I deliver it all" : "OFF"}\n              </button>\n            </div>\n          </div>\n        </div>\n      </div>\n\n      <div class="tc-section">\n        <div class="tc-section-title">🏪 MEGASTORE REWARDS</div>\n        <div class="tc-section-sub">Flat, deterministic tickets you expect from Megastore reward claims over the whole season.</div>\n        <div class="tc-field">\n          <label>Tickets from Megastore over the season</label>\n          <input type="number" min="0" step="1" id="megastoreInput" value="${megastoreTickets}" />\n        </div>\n        <div class="tc-field" style="margin-top:8px;">\n          <label>Daily Reward (VIP Access — 1 ticket/day)</label>\n          <input type="number" min="0" step="1" id="dailyRewardInput" value="${getEffectiveDailyReward()}" />\n        </div>\n        <div class="tc-field-note">Auto-fills to match Days the season will last while VIP Access is On — edit it yourself to override.</div>\n      </div>\n\n      <div class="tc-summary">\n        <div class="tc-summary-line"><span>NPC deliveries<span style="opacity:.7;" id="sum-npc-note"> (incl. +${fmt(c.npcDoubleBonus)} from Double Delivery)</span></span><b id="sum-npc">${fmt(c.npcTotal)}</b></div>\n        <div class="tc-summary-line"><span>Undelivered last season</span><b id="sum-undelivered">${fmt(undeliveredLastSeason)}</b></div>\n        <div class="tc-summary-line"><span>Animal selling (estimate)</span><b id="sum-animal">${fmt(c.animalTotal)}</b></div>\n        <div class="tc-summary-line"><span>Bounty Board / Poppy Trade<span style="opacity:.7;" id="sum-bounty-note">${bountyToggle ? ` (incl. +${fmt(c.bountyCompletionBonus)} completion bonus)` : ""}</span></span><b id="sum-bounty">${fmt(c.bountyTotal)}</b></div>\n        <div class="tc-summary-line"><span>Weekly Chores</span><b id="sum-chores">${fmt(c.choresTotal)}</b></div>\n        <div class="tc-summary-line"><span>Megastore rewards</span><b id="sum-megastore">${fmt(megastoreTickets)}</b></div>\n        <div class="tc-summary-line"><span>Daily Reward (VIP)</span><b id="sum-dailyreward">${fmt(c.dailyRewardTotal)}</b></div>\n        <div class="tc-summary-line" id="sum-boostcost-line" style="color:var(--loss);display:${c.boostCostTotal > 0 ? "" : "none"};"><span>Boost activation cost</span><b id="sum-boostcost" style="color:var(--loss);">−${fmt(c.boostCostTotal)}</b></div>\n        <div class="tc-summary-total">\n          <span class="tc-label" id="sum-total-label">🎟️ TOTAL / ${fmt(seasonDays)} DAYS</span>\n          <span class="tc-value" id="sum-total">${fmt(c.grandTotal)}</span>\n        </div>\n        <div class="tc-summary-total" style="margin-top:10px;padding-top:8px;border-top:2px dashed var(--line);">\n          <span class="tc-label" style="color:var(--loss);">${FLOWER_ICON} TOTAL FLOWER COST</span>\n          <span class="tc-value" style="color:var(--loss);" id="sum-flower-total">${fmt(c.grandFlowerTotal)}</span>\n        </div>\n      </div>\n\n      <div class="tc-footer">The total tickets above are purely estimates because of the Bounty Board and Animal mechanic when selling for tickets.</div>\n    `;
  wireEvents();
}

export function openTicketCalc() {
  const body = $("ticketCalcBody");
  if (body && !body.dataset.ticketCalcInit) {
    body.dataset.ticketCalcInit = "1";
    renderTicketCalc();
  }
  $("ticketCalcOverlay").classList.add("show");
  syncModalRoute("chapter-ticket", true);
}

export function closeTicketCalc() {
  $("ticketCalcOverlay").classList.remove("show");
  syncModalRoute("chapter-ticket", false);
}

export function esIslandIcon(island) {
  if (island.indexOf("marble") === 0) return ES_ISLAND_ICONS.marble;
  return ES_ISLAND_ICONS[island] || ES_ISLAND_ICONS.basic;
}

export function esRenderMissingToggle() {
  const btn = $("esMissingToggleBtn");
  if (!btn) return;
  btn.classList.toggle("active", esState.applyMissing);
  btn.textContent = esState.applyMissing ? "ON" : "OFF";
}

export function openExpansionSim() {
  $("expansionSimTitleIcon").src = esIslandIcon(esState.start.island);
  esSyncAutoBoostsFromFarm();
  esRenderAll();
  esRenderReachNote();
  $("expansionSimOverlay").classList.add("show");
  syncModalRoute("land-expansion", true);
}

export function renderExpansionSimPage() {
  esSyncAutoBoostsFromFarm();
  esRenderAll();
  esRenderReachNote();
}

export function closeExpansionSim() {
  esHideReachNote();
  $("expansionSimOverlay").classList.remove("show");
  syncModalRoute("land-expansion", false);
}

export function openMoreMenu() {
  closeOtherHeaderPanels("moreMenuOverlay");
  $("moreMenuOverlay").classList.add("show");
}

export function closeMoreMenu() {
  $("moreMenuOverlay").classList.remove("show");
}

export function openSettingsModal() {
  if (typeof IMAGE_ICONS !== "undefined" && IMAGE_ICONS["Foreman Beaver"]) {
    $("settingsModalTitleIcon").src = IMAGE_ICONS["Foreman Beaver"];
  }
  updateSettingsSummary();
  $("settingsModalOverlay").classList.add("show");
}

export function closeSettingsModal() {
  $("settingsModalOverlay").classList.remove("show");
}

export function renderGunterShop() {
  gunterRenderTop();
  gunterRenderSunstoneInput();
  gunterRenderMid();
  gunterRenderBottom();
  document.querySelectorAll(".gunter-tab-btn").forEach(btn => {
    btn.classList.toggle("active", btn.dataset.gunterTab === gunterActiveTab);
  });
}

export function openChapterFishMutants() {
  gunterMutantSyncAutoBoosts();
  renderChapterFishMutants();
  $("chapterFishMutantsOverlay").classList.add("show");
  syncModalRoute("chapterfish", true);
}

export function closeChapterFishMutants() {
  $("chapterFishMutantsOverlay").classList.remove("show");
  syncModalRoute("chapterfish", false);
}

export function openGunterShop() {
  gunterGridEntranceShown.buy = false;
  gunterGridEntranceShown.upgrade = false;
  renderGunterShop();
  $("gunterShopOverlay").classList.add("show");
  syncModalRoute("guntershop", true);
}

export function closeGunterShop() {
  $("gunterShopOverlay").classList.remove("show");
  syncModalRoute("guntershop", false);
}

export function renderGunterShopPage() {
  gunterGridEntranceShown.buy = false;
  gunterGridEntranceShown.upgrade = false;
  renderGunterShop();
}

export function renderTicketCalcPage() {
  const body = $("ticketCalcBody");
  if (body) body.dataset.ticketCalcInit = "1";
  renderTicketCalc();
}

export function renderFactionDeliveryPage() {
  renderFactionDeliveryPanel();
}

export function renderSflBubblesPage() {
  renderSflBubblesPanel();
}

export function renderLeaderboardPage() {
  renderLeaderboardPanel();
}

export function renderCraftingBoxPage() {
  renderCraftingBoxPanel();
}

export function renderWorkbenchPage() {
  renderWorkbenchPanel();
}

export function renderSeasonsPage() {
  renderSeasonsPanel();
}

export function renderMapPage() {
  renderMapPanel();
}

export function renderAuctionTrackerPage() {
  renderAuctionTrackerPanel();
}

export function openTradeShop() {
  renderTradeShop();
  $("tradeShopOverlay").classList.add("show");
  syncModalRoute("trades", true);
}

export function closeTradeShop() {
  $("tradeShopOverlay").classList.remove("show");
  syncModalRoute("trades", false);
}

document.querySelectorAll(".trade-sort-btn").forEach(btn => {
  btn.onclick = () => {
    __set_tradeSortMode(btn.dataset.tsort);
    document.querySelectorAll(".trade-sort-btn").forEach(b => b.classList.toggle("active", b === btn));
    renderTradeShop();
  };
});

export function closeDeleteTradeConfirm() {
  $("deleteTradeConfirmOverlay").classList.remove("show");
  __set_tradePendingDeleteId(null);
  __set_tradePendingDeleteType("active");
}

export function openNewTradeModal() {
  __set_tradePickedItemName(null);
  $("tradeItemPickBtn").innerHTML = `<span class="placeholder" id="tradeItemPickPlaceholder">Tap to choose an item…</span><span class="chev">▸</span>`;
  $("newTradeFields").style.display = "none";
  $("newTradeQtyInput").value = "";
  $("newTradeBuyPriceInput").value = "";
  $("confirmNewTradeBtn").disabled = true;
  updateNewTradeLiveTotal();
  $("newTradeOverlay").classList.add("show");
}

export function closeNewTradeModal() {
  $("newTradeOverlay").classList.remove("show");
}

export function openTradeItemPicker() {
  $("tradeItemSearchInput").value = "";
  renderTradeItemPickerList();
  $("tradeItemPickerOverlay").classList.add("show");
}

export function closeTradeItemPicker() {
  $("tradeItemPickerOverlay").classList.remove("show");
}

function renderTradeItemPickerList() {
  const wrap = $("tradeItemPickerList");
  const seen = new Set;
  const list = marketItems.filter(m => {
    const key = (m.name || "").toLowerCase();
    if (!key || seen.has(key)) return false;
    seen.add(key);
    return true;
  }).sort((a, b) => a.name.localeCompare(b.name));
  wrap.innerHTML = list.length ? list.map(m => `\n    <div class="picker-item" data-name="${escapeHtml(m.name)}" data-search="${escapeHtml((m.name || "").toLowerCase())}">\n      <div>\n        <div class="pname">${getIcon(m.name)} ${escapeHtml(m.name)}</div>\n        <div class="pmeta">Marketplace listing</div>\n      </div>\n      <div class="pprice">${fmt(m.flowerPrice || 0)} ${FLOWER_ICON}</div>\n    </div>`).join("") : `<div class="lib-empty">No marketplace items yet — add a crop, fruit, or resource first.</div>`;
  wrap.querySelectorAll(".picker-item").forEach(el => {
    el.onclick = () => {
      tradePickItem(el.dataset.name);
      closeTradeItemPicker();
    };
  });
  applyTradeItemSearchFilter();
}

function openSellTradeModal(id) {
  const t = tradeActive.find(x => x.id === id);
  if (!t) return;
  __set_tradeSellingId(id);
  $("sellTradeTitle").innerHTML = `💰 Sell ${getIcon(t.itemName)} ${escapeHtml(t.itemName)}`;
  $("sellTradeMaxQty").textContent = fmt(t.remainingQty);
  $("sellTradeQtyInput").value = "";
  $("sellTradeQtyInput").max = t.remainingQty;
  $("sellTradePriceInput").value = tradeMarketPrice(t.itemName) || "";
  updateSellTradeLiveTotal();
  $("sellTradeOverlay").classList.add("show");
}

export function closeSellTradeModal() {
  $("sellTradeOverlay").classList.remove("show");
  __set_tradeSellingId(null);
}

export function resetLibModalFields() {
  $("libNameInput").value = "";
  $("libToolCoinCost").value = 0;
  $("libProducesName").value = "";
  $("libProducesQty").value = 1;
  __set_craftMaterialRows([]);
  renderMaterialRows();
  updateLibCraftTotal();
  applyLibTypeVisibility();
}

function openLibEditModal(id) {
  const item = findTool(id);
  if (!item) return;
  if (item.locked) {
    toast("This is a built-in tool's base cost and can't be edited 🔒");
    return;
  }
  __set_editingLibId(id);
  $("libNameInput").value = item.name;
  $("libToolCoinCost").value = item.coinCost || 0;
  $("libProducesName").value = item.producesName || "";
  $("libProducesQty").value = item.producesQty || 1;
  __set_craftMaterialRows((item.materials || []).map(m => ({
    rid: __postinc_craftMaterialIdSeq(),
    name: m.name,
    qty: m.qty
  })));
  renderMaterialRows();
  applyLibTypeVisibility();
  updateLibCraftTotal();
  $("libModal").classList.add("show");
}

function renderMaterialRows() {
  const wrap = $("materialList");
  wrap.innerHTML = craftMaterialRows.length ? craftMaterialRows.map(r => `\n    <div class="selected-material-row" data-rid="${r.rid}">\n      <span class="smname">${getIcon(r.name)} ${escapeHtml(r.name)}</span>\n      <span class="smprice">${fmt(getItemCostByName(r.name))}${COIN_ICON}/u</span>\n      <input type="number" class="smqty" min="0" step="0.01" value="${r.qty}" />\n      <button type="button" class="ingredient-remove">✕</button>\n    </div>`).join("") : `<div class="lib-empty">No materials added.</div>`;
  wrap.querySelectorAll(".selected-material-row").forEach(rowEl => {
    const rid = rowEl.dataset.rid;
    const row = craftMaterialRows.find(r => String(r.rid) === rid);
    rowEl.querySelector(".smqty").addEventListener("input", e => {
      row.qty = parseFloat(e.target.value) || 0;
      updateLibCraftTotal();
    });
    rowEl.querySelector(".ingredient-remove").addEventListener("click", () => {
      __set_craftMaterialRows(craftMaterialRows.filter(r => r.rid !== row.rid));
      renderMaterialRows();
      updateLibCraftTotal();
    });
  });
}

export function renderPickerList() {
  const wrap = $("pickerList");
  if (pickerTarget === "craft") {
    const list = getAllMaterialCandidates(editingLibId);
    wrap.innerHTML = list.length ? list.map((item, idx) => {
      const priceCoins = getItemCostByName(item.name);
      return `<div class="picker-item" data-idx="${idx}" data-search="${escapeHtml(item.name.toLowerCase())}">\n        <div>\n          <div class="pname">${getIcon(item.name)} ${escapeHtml(item.name)}</div>\n          <div class="pmeta">${escapeHtml(item.kindLabel)}</div>\n        </div>\n        <div class="pprice">${fmt(priceCoins)}${COIN_ICON}/u</div>\n      </div>`;
    }).join("") : `<div class="lib-empty">Nothing available yet.</div>`;
    wrap.querySelectorAll(".picker-item").forEach(el => {
      el.onclick = () => {
        const item = list[parseInt(el.dataset.idx)];
        if (!item) return;
        craftMaterialRows.push({
          rid: __postinc_craftMaterialIdSeq(),
          name: item.name,
          qty: 1
        });
        renderMaterialRows();
        updateLibCraftTotal();
        $("materialPickerOverlay").classList.remove("show");
      };
    });
  } else {
    const list = marketItems.filter(m => !m.isNftCollectible && !m.isWearable);
    wrap.innerHTML = list.length ? list.map(m => {
      const costPerUnit = coinsToFlower(getMarketItemCostCoins(m.id));
      return `<div class="picker-item" data-id="${m.id}" data-search="${escapeHtml((m.name || "").toLowerCase())}">\n        <div>\n          <div class="pname">${getIcon(m.name)} ${escapeHtml(m.name)}</div>\n          <div class="pmeta">Cost ${fmt(costPerUnit)} ${FLOWER_ICON}/u · Sells ${fmt(m.flowerPrice || 0)} ${FLOWER_ICON}/u</div>\n        </div>\n        <div class="pprice">${fmt(m.flowerPrice || 0)} ${FLOWER_ICON}</div>\n      </div>`;
    }).join("") : `<div class="lib-empty">No items yet — add a tool recipe, or check Crops/Fruits/Animals.</div>`;
    wrap.querySelectorAll(".picker-item").forEach(el => {
      el.onclick = () => {
        __set_harvestSelectedLibId(el.dataset.id);
        updateCalcSelectedDisplay();
        updateCalcSummary();
        $("materialPickerOverlay").classList.remove("show");
      };
    });
  }
  applyPickerSearchFilter();
}

export function renderCalcIngredients() {
  const wrap = $("calcIngredientsWrap");
  const list = $("calcIngredientsList");
  if (calcMode !== "harvest" || !harvestSelectedLibId) {
    wrap.classList.add("hidden");
    list.innerHTML = "";
    return;
  }
  const m = marketItems.find(x => String(x.id) === String(harvestSelectedLibId));
  if (!m) {
    wrap.classList.add("hidden");
    list.innerHTML = "";
    return;
  }
  let rows = [];
  let animalCalcInfo = null;
  const tool = toolRecipes.find(t => (t.producesName || "").toLowerCase() === (m.name || "").toLowerCase());
  if (tool) {
    rows = (tool.materials || []).map(mat => {
      const key = "ToolLib_" + tool.id;
      const mode = getMaterialMode(key, mat.name);
      const unitCost = getMaterialUnitCostCoins(mat.name, mode);
      return {
        key: key,
        name: mat.name,
        qty: mat.qty,
        unitCost: unitCost,
        mode: mode
      };
    });
  } else if (BASE_FRUITS[m.name]) {
    const baseFruit = BASE_FRUITS[m.name];
    if (baseFruit.woodReturnQty) {
      const key = "Fruit_" + m.name;
      const mode = getMaterialMode(key, "Wood");
      const unitCost = getMaterialUnitCostCoins("Wood", mode);
      rows = [ {
        key: key,
        name: "Wood",
        qty: baseFruit.woodReturnQty,
        unitCost: unitCost,
        mode: mode,
        isRebate: true
      } ];
    }
  } else if (m.isAutoAnimal) {
    const animalType = Object.keys(ANIMAL_DATA).find(t => ANIMAL_DATA[t].products.some(p => p.toLowerCase() === (m.name || "").toLowerCase()));
    if (animalType) {
      const fig = computeAnimalTypeFigures(animalType);
      const productIdx = fig.products.findIndex(p => p.toLowerCase() === (m.name || "").toLowerCase());
      const unitsPerHeadPerCycle = productIdx >= 0 ? fig.yields[productIdx] : 0;
      const targetQty = parseFloat($("calcHarvestQty").value) || 0;
      const headCyclesNeeded = unitsPerHeadPerCycle > 0 ? targetQty / unitsPerHeadPerCycle : 0;
      const feedUnitsNeeded = headCyclesNeeded * fig.effectiveFeedQty;
      const cyclesWithOwnedHeads = fig.qty > 0 ? headCyclesNeeded / fig.qty : 0;
      animalCalcInfo = {
        fig: fig,
        animalType: animalType,
        unitsPerHeadPerCycle: unitsPerHeadPerCycle,
        headCyclesNeeded: headCyclesNeeded,
        feedUnitsNeeded: feedUnitsNeeded,
        headsOwned: fig.qty,
        cyclesWithOwnedHeads: cyclesWithOwnedHeads,
        feedName: fig.feedNameUsed,
        feedIcon: fig.feedIconUsed
      };
      rows = fig.feedInfo.breakdown.map(r => ({
        key: "AnimalFeed",
        name: r.name,
        qty: r.qty * feedUnitsNeeded,
        unitCost: r.unitCost,
        mode: r.mode
      }));
    }
  }
  if (!rows.length) {
    wrap.classList.add("hidden");
    list.innerHTML = "";
    return;
  }
  wrap.classList.remove("hidden");
  const animalSummaryHtml = animalCalcInfo ? `\n    <div class="field-hint" style="margin-bottom:6px;">\n      ${animalCalcInfo.feedIcon} <b>${fmt(animalCalcInfo.headsOwned)} heads</b> at Lv${animalCalcInfo.fig.level} each yield <b>${fmt(animalCalcInfo.unitsPerHeadPerCycle)} ${escapeHtml(m.name)}/cycle</b> —\n      reaching this quantity needs <b>${fmt(animalCalcInfo.feedUnitsNeeded)} ${animalCalcInfo.feedName}</b>\n      ${animalCalcInfo.headsOwned > 0 ? `(≈ ${fmt(animalCalcInfo.cyclesWithOwnedHeads)} cycle${animalCalcInfo.cyclesWithOwnedHeads === 1 ? "" : "s"} with your current heads)` : "(set your head count in ⚡ Boosts → Plots &amp; Nodes)"}\n    </div>` : "";
  list.innerHTML = animalSummaryHtml + rows.map(r => {
    if (r.mode === "gem") {
      return `\n      <div class="calc-ingredient-row">\n        <span class="calc-ing-icon">${getIcon(r.name)}</span>\n        <div class="calc-ing-main">\n          <div class="calc-ing-name">${escapeHtml(r.name)} ×${fmt(r.qty)}</div>\n          <div class="calc-ing-meta">Cost @ 1${GEM_ICON}/u ≈ ${fmt(coinsToFlower(r.unitCost))}${FLOWER_ICON}/u</div>\n        </div>\n        <div class="calc-ing-toggle">\n          <span style="font-size:9.6px;opacity:.6;">${GEM_ICON} gem-only</span>\n        </div>\n      </div>`;
    }
    const displayPrice = r.mode === "buy" ? coinsToFlower(r.unitCost) : r.unitCost;
    const displayUnit = r.mode === "buy" ? FLOWER_ICON : COIN_ICON;
    return `\n    <div class="calc-ingredient-row">\n      <span class="calc-ing-icon">${getIcon(r.name)}</span>\n      <div class="calc-ing-main">\n        <div class="calc-ing-name">${escapeHtml(r.name)} ×${fmt(r.qty)}${r.isRebate ? " (recovered)" : ""}</div>\n        <div class="calc-ing-meta">${r.mode === "collect" ? "Collect" : "Buy"} @ ${fmt(displayPrice)}${displayUnit}/u</div>\n      </div>\n      <div class="calc-ing-toggle">\n        ${r.name.toLowerCase() === "oil" ? `<span style="font-size:9.6px;opacity:.6;">🚫 not tradable</span>` : `<button type="button" class="calc-mode-btn" data-key="${r.key}" data-mat="${escapeHtml(r.name)}" data-mode="collect" style="${r.mode === "collect" ? "border-color:var(--profit);color:var(--profit);" : ""}">Collect</button>\n        <button type="button" class="calc-mode-btn" data-key="${r.key}" data-mat="${escapeHtml(r.name)}" data-mode="buy" style="${r.mode === "buy" ? "border-color:var(--flower);color:var(--flower);" : ""}">Buy</button>`}\n      </div>\n    </div>`;
  }).join("");
  list.querySelectorAll(".calc-mode-btn").forEach(btn => {
    btn.onclick = () => {
      setMaterialMode(btn.dataset.key, btn.dataset.mat, btn.dataset.mode);
      renderCalcIngredients();
      updateCalcSummary();
      renderLibraryLists();
      renderMarketList();
    };
  });
}

function openDeleteConfirm(id, type) {
  const tool = findTool(id);
  if (tool && tool.locked) {
    toast("This is a built-in tool and can't be removed 🔒");
    return;
  }
  __set_pendingDeleteId(id);
  __set_pendingDeleteType("library");
  $("confirmSub").textContent = "This will also remove its price entry from Marketplace Prices, and any tool that used it as a material will show a 0-cost placeholder until you update it.";
  $("confirmOverlay").classList.add("show");
}

if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("./sw.js").catch(e => console.error("SW failed:", e));
  });
}

let bumpkinLevelActiveTab = "level";

const BUMPKIN_LEVEL_TAB_DEFS = [ {
  id: "level",
  label: "Level 1-150"
} ].concat([ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10 ].map(a => ({
  id: "a" + a,
  label: "A" + a + " 1-50"
})));

function blComputeLevelTabRows(experience, ascensionLevel) {
  const info = cookGetLevelInfo(experience);
  const rows = [];
  for (let i = 1; i <= PRE_ASCENSION_MAX_LEVEL; i++) {
    const startXp = COOK_LEVEL_XP[i - 1];
    const cap = i > 1 ? COOK_LEVEL_XP[i - 1] - COOK_LEVEL_XP[i - 2] : 0;
    let state = "future";
    let running = 0;
    if (ascensionLevel > 0 || i <= info.level) {
      state = "passed";
      running = cap;
    } else if (i === info.level + 1) {
      state = "current";
      running = Math.min(info.progress, cap);
    }
    rows.push({
      level: i,
      running: running,
      cap: cap,
      cumSkill: i,
      totalExp: startXp,
      state: state
    });
  }
  return rows;
}

function blComputeAscensionTabRows(ascension, experience, ascensionLevel) {
  const rows = [];
  const ascInfo = ascensionLevel === ascension ? getAscensionLevelInfo(experience, ascensionLevel) : null;
  let cum = ascensionBandBaseline(ascension);
  for (let n = 1; n <= ASCENSION_LEVELS_PER_BAND; n++) {
    const cap = n > 1 ? ascensionLevelXp(ascension, n - 1) : 0;
    cum += cap;
    const totalExp = cum;
    let state = "future";
    let running = 0;
    if (ascensionLevel > ascension) {
      state = "passed";
      running = cap;
    } else if (ascensionLevel === ascension && ascInfo) {
      if (n <= ascInfo.level) {
        state = "passed";
        running = cap;
      } else if (n === ascInfo.level + 1) {
        state = "current";
        running = Math.min(ascInfo.currentExperienceProgress, cap);
      }
    }
    rows.push({
      level: n,
      running: running,
      cap: cap,
      cumSkill: PRE_ASCENSION_MAX_LEVEL + (ascension - 1) * ASCENSION_LEVELS_PER_BAND + n,
      totalExp: totalExp,
      state: state
    });
  }
  return rows;
}

function blRenderTableHtml(rows) {
  const lastRow = rows[rows.length - 1];
  const totalExpCumulative = lastRow.totalExp;
  const totalSkillCumulative = lastRow.cumSkill;
  const rowsHtml = rows.map(r => `\n      <div class="bl-level-row ${r.state === "passed" ? "is-done" : ""}">\n        <span class="bl-col-level">${fmtInt(r.level)}</span>\n        <span class="bl-col-exp">${fmtInt(r.running)}/${fmtInt(r.cap)}</span>\n        <span class="bl-col-skill">+1(${fmtInt(r.cumSkill)})</span>\n        <span class="bl-col-total">${fmtInt(r.totalExp)} EXP</span>\n      </div>`).join("");
  return `\n    <div class="bl-cols-head">\n      <span>Level</span><span>Exp</span><span>Skill Points</span><span>Total Exp</span>\n    </div>\n    <div class="bl-list-wrap">${rowsHtml}</div>\n    <div class="bl-cols-total">\n      <span>TOTAL</span><span>${fmtInt(totalExpCumulative)} EXP</span><span>+${fmtInt(totalSkillCumulative)}</span><span></span>\n    </div>`;
}

export function renderBumpkinLevelPanel() {
  const body = $("bumpkinLevelBody");
  if (!body) return;
  const g = profileGetG();
  const info = farmPanelGetLastInfo();
  const displayName = profileGetDisplayName();
  const experience = info.experience || 0;
  const ascensionLevel = info.ascensionLevel || 0;
  const curInfo = getAscensionLevelInfo(experience, ascensionLevel);
  const expInfo = g ? profileGetExpansionInfo(g) : {
    islandLabel: "—",
    expansionLevel: 0,
    ascensionLevel: ascensionLevel
  };
  const levelLabel = ascensionLevel > 0 ? `A${fmtInt(ascensionLevel)} · Lv ${fmtInt(curInfo.level)}` : `Lv ${fmtInt(curInfo.level)}`;
  const xpLabel = `${fmtInt(Math.min(curInfo.currentExperienceProgress, curInfo.experienceToNextLevel))}/${fmtInt(curInfo.experienceToNextLevel)} XP`;
  const bumpkinFrameHtml = g ? profileBumpkinFrameHtml(g) : "";
  const navHtml = BUMPKIN_LEVEL_TAB_DEFS.map(t => `<button type="button" class="bl-nav-tab${bumpkinLevelActiveTab === t.id ? " active" : ""}" data-bl-tab="${t.id}">${t.label}</button>`).join("");
  const tabsContentHtml = BUMPKIN_LEVEL_TAB_DEFS.map(t => {
    const rows = t.id === "level" ? blComputeLevelTabRows(experience, ascensionLevel) : blComputeAscensionTabRows(parseInt(t.id.slice(1), 10), experience, ascensionLevel);
    const titleText = t.id === "level" ? "BUMPKIN LEVEL 1-150" : `BUMPKIN LEVEL (${t.label.toUpperCase()})`;
    return `<div class="bl-level-block${bumpkinLevelActiveTab === t.id ? " active" : ""}" data-bl-tab-panel="${t.id}"><div class="bl-block-title">${escapeHtml(titleText)}</div>${blRenderTableHtml(rows)}</div>`;
  }).join("");
  body.innerHTML = `\n    <div class="bl-summary-box">\n      <div class="profile-bumpkin-frame">${bumpkinFrameHtml}</div>\n      <div class="bl-summary-info">\n        <div class="bl-summary-name">${escapeHtml(displayName)}</div>\n        <div class="bl-summary-level">${levelLabel}<span class="bl-summary-xp">${xpLabel}</span></div>\n        <div class="bl-summary-line"><span class="bl-summary-sub-label">Ascension Level</span><span class="bl-summary-sub-value">${fmtInt(ascensionLevel)}</span></div>\n        <div class="bl-summary-line"><span class="bl-summary-sub-label">Land Expansion</span><span class="bl-summary-sub-value">${fmtInt(expInfo.expansionLevel)}</span></div>\n        <div class="bl-summary-line"><span class="bl-summary-sub-label">Land</span><span class="bl-summary-sub-value">${escapeHtml(expInfo.islandLabel)}</span></div>\n      </div>\n    </div>\n    <div class="bl-levels-box">\n      <div class="bl-section-caption">Levels and Exp + Skill points</div>\n      <div class="bl-picker-strip">${navHtml}</div>\n      <div class="bl-levels-content">${tabsContentHtml}</div>\n    </div>\n  `;
  const bumpkinImg = body.querySelector(".profile-bumpkin-render");
  if (bumpkinImg) {
    bumpkinImg.addEventListener("error", () => profileBumpkinImageOnError(bumpkinImg));
    bumpkinImg.addEventListener("load", () => {
      if (profileBumpkinCache.tokenUri === bumpkinImg.dataset.tokenUri) {
        profileBumpkinCache.status = "loaded";
        profileBumpkinCache.resolvedUrl = bumpkinImg.src;
        profileBumpkinCachePersist();
      }
    });
  }
  body.querySelectorAll(".bl-nav-tab").forEach(btn => {
    btn.onclick = () => {
      bumpkinLevelActiveTab = btn.dataset.blTab;
      body.querySelectorAll(".bl-nav-tab").forEach(b => b.classList.toggle("active", b.dataset.blTab === bumpkinLevelActiveTab));
      body.querySelectorAll(".bl-level-block").forEach(p => p.classList.toggle("active", p.dataset.blTabPanel === bumpkinLevelActiveTab));
    };
  });
}

const AUCTION_TICKET_ICON_SRC = "data:image/webp;base64,UklGRpIAAABXRUJQVlA4TIUAAAAvCsADEEegkJEk5vwpDuo7QYN4DQJBiJwx2llqGkmB7jF/ElCHAVpawvwHwP9LTltlHDNNG1wB28i2lSo72cu/NGAQSwfWgJXAkLo08CGi/wHr8wC5csJaFjvkuhLWTtXCOpnxYu3TtLOGFE/yznZR1t6MO2uW4g1LmgXW7wb4BWB9AXgAAA==";

const AUCTION_TICKET_ICON_HTML = `<img src="${AUCTION_TICKET_ICON_SRC}" alt="Shiny Feather" style="width:14px;height:14px;vertical-align:-2px;image-rendering:pixelated;">`;

const AUCTION_TRACKER_API_URL = "https://sfl-community-proxy.bossweki.workers.dev/community/data?type=ticketLeaderboard";

const AUCTION_TRACKER_FARM_ID_LS_KEY = "hl_auction_tracker_farm_id";

const AUCTION_TRACKER_FILTER_DEFS = [ {
  id: "all",
  label: "All"
}, {
  id: "ascension",
  label: "Ascension Level"
}, {
  id: "exp",
  label: "EXP"
}, {
  id: "nonascended",
  label: "None Ascended"
} ];

const AUCTION_TRACKER_DISPLAY_DEFS = [ {
  id: 500,
  label: "Top 500"
}, {
  id: 100,
  label: "Top 100"
}, {
  id: 50,
  label: "Top 50"
} ];

let auctionTrackerFilter = "all";

let auctionTrackerDisplayLimit = 500;

let auctionTrackerData = null;

let auctionTrackerLoading = false;

let auctionTrackerError = null;

let auctionTrackerFetchedForFarmId = null;

function auctionTrackerGetFarmId() {
  const stored = (localStorage.getItem(AUCTION_TRACKER_FARM_ID_LS_KEY) || "").trim();
  if (stored) return stored;
  return (readFarmSyncedId() || "").trim();
}

function auctionTrackerSetFarmId(id) {
  localStorage.setItem(AUCTION_TRACKER_FARM_ID_LS_KEY, id || "");
}

async function auctionTrackerFetchData(farmId, force) {
  if (!farmId) {
    auctionTrackerError = "Enter a Farm ID below (or sync your farm) to load the leaderboard.";
    auctionTrackerData = null;
    auctionTrackerFetchedForFarmId = null;
    renderAuctionTrackerPanel();
    return;
  }
  if (!force && auctionTrackerData && auctionTrackerFetchedForFarmId === farmId) return;
  auctionTrackerLoading = true;
  auctionTrackerError = null;
  renderAuctionTrackerPanel();
  try {
    const url = AUCTION_TRACKER_API_URL + "&farmId=" + encodeURIComponent(farmId) + "&limit=500";
    const res = await fetch(url, {
      cache: "no-store"
    });
    if (!res.ok) throw new Error("Request failed (" + res.status + ")");
    const json = await res.json();
    if (!json || !json.data) throw new Error("Unexpected response from leaderboard API");
    auctionTrackerData = json.data;
    auctionTrackerFetchedForFarmId = farmId;
  } catch (e) {
    auctionTrackerError = "Couldn't load the leaderboard" + (e && e.message ? " — " + e.message : "") + ".";
  } finally {
    auctionTrackerLoading = false;
    renderAuctionTrackerPanel();
  }
}

function auctionTrackerSortedRows() {
  const source = auctionTrackerData && auctionTrackerData.topTen || [];
  return source.map((r, i) => Object.assign({}, r, {
    rank: i + 1
  }));
}

function auctionTrackerTieBreakSort(rows) {
  return rows.slice().sort((a, b) => {
    const countDiff = (b.count || 0) - (a.count || 0);
    if (countDiff !== 0) return countDiff;
    const ascDiff = (b.ascensionLevel || 0) - (a.ascensionLevel || 0);
    if (ascDiff !== 0) return ascDiff;
    return (b.experience || 0) - (a.experience || 0);
  });
}

function auctionTrackerExpSort(rows) {
  return rows.slice().sort((a, b) => (b.experience || 0) - (a.experience || 0));
}

function auctionTrackerRankedRows(filter, limit) {
  const rows = auctionTrackerSortedRows();
  const pool = limit ? rows.slice(0, limit) : rows;
  if (filter === "ascension") {
    return auctionTrackerTieBreakSort(pool.filter(r => (r.ascensionLevel || 0) > 0));
  }
  if (filter === "exp") {
    return auctionTrackerExpSort(pool);
  }
  if (filter === "nonascended") {
    return auctionTrackerTieBreakSort(pool.filter(r => (r.ascensionLevel || 0) === 0));
  }
  return pool;
}

function auctionTrackerRelativeTime(ts) {
  const then = new Date(ts).getTime();
  if (!isFinite(then)) return "";
  const diffMs = Date.now() - then;
  const diffSec = Math.floor(diffMs / 1e3);
  if (diffSec < 5) return "just now";
  if (diffSec < 60) return `${diffSec} second${diffSec === 1 ? "" : "s"} ago`;
  const diffMin = Math.floor(diffSec / 60);
  if (diffMin < 60) return `${diffMin} minute${diffMin === 1 ? "" : "s"} ago`;
  const diffHr = Math.floor(diffMin / 60);
  if (diffHr < 24) return `${diffHr} hour${diffHr === 1 ? "" : "s"} ago`;
  const diffDay = Math.floor(diffHr / 24);
  return `${diffDay} day${diffDay === 1 ? "" : "s"} ago`;
}

function auctionTrackerOwnRank(farmId) {
  if (!auctionTrackerData || !farmId) return null;
  const numericId = Number(farmId);
  if (!isFinite(numericId)) return null;
  const rows = auctionTrackerSortedRows();
  for (let i = 0; i < rows.length; i++) {
    if (Number(rows[i].farmId) === numericId) return {
      rank: rows[i].rank,
      row: rows[i]
    };
  }
  const details = auctionTrackerData.farmRankingDetails;
  if (Array.isArray(details)) {
    const match = details.find(r => Number(r.farmId) === numericId);
    if (match) return {
      rank: match.rank,
      row: match
    };
  }
  return null;
}

export function renderAuctionTrackerPanel() {
  const body = $("auctionTrackerBody");
  if (!body) return;
  const g = profileGetG();
  const info = farmPanelGetLastInfo();
  const experience = info.experience || 0;
  const ascensionLevel = info.ascensionLevel || 0;
  const curInfo = getAscensionLevelInfo(experience, ascensionLevel);
  const displayName = profileGetDisplayName();
  const levelLabel = ascensionLevel > 0 ? `A${fmtInt(ascensionLevel)} · Lv ${fmtInt(curInfo.level)}` : `Lv ${fmtInt(curInfo.level)}`;
  const bumpkinFrameHtml = g ? profileBumpkinFrameHtml(g) : "";
  const farmId = auctionTrackerGetFarmId();
  if (!auctionTrackerLoading && !auctionTrackerError && (!auctionTrackerData || auctionTrackerFetchedForFarmId !== farmId)) {
    auctionTrackerFetchData(farmId, false);
  }
  const own = auctionTrackerOwnRank(farmId);
  const chapterRankHtml = own ? `#${fmtInt(own.rank)}` : auctionTrackerData ? "Unranked" : "—";
  const chapterTicketCount = own ? own.row.count : null;
  const filterHtml = AUCTION_TRACKER_FILTER_DEFS.map(f => {
    const count = auctionTrackerRankedRows(f.id, auctionTrackerDisplayLimit).length;
    return `<button type="button" class="at-filter-btn${auctionTrackerFilter === f.id ? " active" : ""}" data-at-filter="${f.id}">${f.label} <span class="at-filter-count">[${fmtInt(count)}]</span></button>`;
  }).join("");
  const displayHtml = AUCTION_TRACKER_DISPLAY_DEFS.map(d => `<button type="button" class="at-display-btn${auctionTrackerDisplayLimit === d.id ? " active" : ""}" data-at-display="${d.id}">${d.label}</button>`).join("");
  let listHtml = "";
  if (auctionTrackerLoading) {
    listHtml = `<div class="at-empty">Loading leaderboard…</div>`;
  } else if (auctionTrackerError) {
    listHtml = `<div class="at-empty">${escapeHtml(auctionTrackerError)}</div>`;
  } else if (!auctionTrackerData) {
    listHtml = `<div class="at-empty">Enter a Farm ID below to load the leaderboard.</div>`;
  } else {
    const rows = auctionTrackerRankedRows(auctionTrackerFilter, auctionTrackerDisplayLimit);
    if (!rows.length) {
      listHtml = `<div class="at-empty">No ranked farms match this filter yet.</div>`;
    } else {
      const showFilterRank = auctionTrackerFilter !== "all";
      listHtml = rows.map((r, i) => {
        const rInfo = getAscensionLevelInfo(r.experience || 0, r.ascensionLevel || 0);
        const isOwn = farmId && Number(r.farmId) === Number(farmId);
        const bumpLevelText = (r.ascensionLevel || 0) > 0 ? `A${fmtInt(r.ascensionLevel)} · Lv ${fmtInt(rInfo.level)}` : `Lv ${fmtInt(rInfo.level)}`;
        return `\n        <div class="at-row${isOwn ? " is-own" : ""}">\n          <div class="at-row-top">\n            <span class="at-row-rank">${showFilterRank ? `<span class="at-row-filter-rank">#${fmtInt(i + 1)}</span><span class="at-row-real-rank">Real #${fmtInt(r.rank)}</span>` : `#${fmtInt(r.rank)}`}</span>\n            <span class="at-row-name">${escapeHtml(r.id || "—")}${isOwn ? ` <span class="at-row-you">★ You</span>` : ""}</span>\n            <span class="at-row-tickets">${AUCTION_TICKET_ICON_HTML} ${fmtInt(r.count)}</span>\n          </div>\n          <div class="at-row-stats">\n            <span class="at-stat-bumpkin"><b>Bumpkin</b> ${bumpLevelText}</span>\n            <span class="at-stat-exp"><b>Total EXP</b> ${fmtInt(r.experience || 0)}</span>\n            <span class="at-stat-ascension"><b>Ascension</b> ${fmtInt(r.ascensionLevel || 0)}</span>\n          </div>\n        </div>`;
      }).join("");
    }
  }
  body.innerHTML = `\n    <div class="at-title">Chapter Race</div>\n    <div class="at-summary-box">\n      <div class="profile-bumpkin-frame">${bumpkinFrameHtml}</div>\n      <div class="at-summary-stats">\n        <div class="at-stat-row"><span class="at-stat-label">Name</span><span class="at-stat-value">${escapeHtml(displayName)}</span></div>\n        <div class="at-stat-row"><span class="at-stat-label">Bumpkin Total EXP</span><span class="at-stat-value">${fmtInt(experience)}</span></div>\n        <div class="at-stat-row"><span class="at-stat-label">Bumpkin Level</span><span class="at-stat-value">${levelLabel}</span></div>\n        <div class="at-stat-row"><span class="at-stat-label">Ascension Level</span><span class="at-stat-value">${fmtInt(ascensionLevel)}</span></div>\n      </div>\n    </div>\n    <div class="at-top-row">\n      <div class="at-chapter-wrap">\n        <div class="at-rank-label">Chapter Race Ranking</div>\n        <div class="at-rank-card">\n          <div class="at-rank-value">${chapterRankHtml}</div>\n          <div class="at-ticket-row">${AUCTION_TICKET_ICON_HTML} Shiny Feather <span class="at-ticket-count">${chapterTicketCount != null ? fmtInt(chapterTicketCount) : "—"}</span></div>\n        </div>\n      </div>\n      <div class="at-display-wrap">\n        <div class="at-display-label">Display Mode</div>\n        <div class="at-display-btns">${displayHtml}</div>\n      </div>\n    </div>\n    <div class="at-list-wrap">\n      ${auctionTrackerData && auctionTrackerData.lastUpdated ? `<div class="at-updated-note">Last Updated ${escapeHtml(auctionTrackerRelativeTime(auctionTrackerData.lastUpdated))}</div>` : ""}\n      <div class="at-section-label">Top ${fmtInt(auctionTrackerDisplayLimit)} Players for ${AUCTION_TICKET_ICON_HTML} Shiny Feather</div>\n      <div class="at-filter-row">${filterHtml}</div>\n      <div class="at-cols-head">\n        <span class="at-col-rank">${auctionTrackerFilter !== "all" ? `Rank 1-${fmtInt(auctionTrackerDisplayLimit)}` : "Rank"}</span><span class="at-col-name">Name</span><span class="at-col-bumpkin">Bumpkin</span><span class="at-col-exp">EXP</span><span class="at-col-ascension">Ascension</span><span class="at-col-tickets">Tickets</span>\n      </div>\n      <div class="at-list">${listHtml}</div>\n    </div>\n    <div class="at-farmid-row">\n      <label class="at-farmid-label" for="auctionTrackerFarmIdInput">Farm ID</label>\n      <input type="text" inputmode="numeric" id="auctionTrackerFarmIdInput" class="at-farmid-input" value="${escapeHtml(farmId)}" placeholder="e.g. 12345">\n      <button type="button" id="auctionTrackerRefreshBtn" class="at-refresh-btn">${auctionTrackerLoading ? "…" : "Refresh"}</button>\n    </div>\n  `;
  const bumpkinImg = body.querySelector(".profile-bumpkin-render");
  if (bumpkinImg) {
    bumpkinImg.addEventListener("error", () => profileBumpkinImageOnError(bumpkinImg));
    bumpkinImg.addEventListener("load", () => {
      if (profileBumpkinCache.tokenUri === bumpkinImg.dataset.tokenUri) {
        profileBumpkinCache.status = "loaded";
        profileBumpkinCache.resolvedUrl = bumpkinImg.src;
        profileBumpkinCachePersist();
      }
    });
  }
  body.querySelectorAll(".at-filter-btn").forEach(btn => {
    btn.onclick = () => {
      auctionTrackerFilter = btn.dataset.atFilter;
      renderAuctionTrackerPanel();
    };
  });
  body.querySelectorAll(".at-display-btn").forEach(btn => {
    btn.onclick = () => {
      auctionTrackerDisplayLimit = Number(btn.dataset.atDisplay);
      renderAuctionTrackerPanel();
    };
  });
  const refreshBtn = $("auctionTrackerRefreshBtn");
  if (refreshBtn) refreshBtn.onclick = () => auctionTrackerFetchData(auctionTrackerGetFarmId(), true);
  const farmIdInput = $("auctionTrackerFarmIdInput");
  if (farmIdInput) {
    farmIdInput.onchange = e => {
      auctionTrackerSetFarmId(e.target.value.trim());
      auctionTrackerFetchData(auctionTrackerGetFarmId(), true);
    };
  }
  const miniSyncBtn = $("auctionTrackerMiniSyncBtn");
  if (miniSyncBtn) {
    miniSyncBtn.classList.toggle("is-syncing", auctionTrackerLoading);
    miniSyncBtn.onclick = () => auctionTrackerFetchData(auctionTrackerGetFarmId(), true);
  }
}

export const MAIN_VIEW_PANEL_MAP = {
  crops: "cropsPanel",
  resources: "resourcePanel",
  fruits: "fruitsPanel",
  honey: "honeyPanel",
  animals: "animalsPanel",
  salt: "saltPanel",
  greenhouse: "greenhousePanel",
  cropmachine: "cropMachinePanel",
  composter: "composterPanel",
  cooking: "cookingPanel",
  fishing: "fishingPanel",
  pets: "petsPanel",
  market: "marketPanel",
  library: "libraryPanel",
  bumpkinlevel: "bumpkinLevelPanel",
  faction: "factionPanel",
  craftingbox: "craftingBoxPanel",
  workbench: "workbenchPanel",
  beginner: "beginnerPanel",
  leaderboard: "leaderboardPanel",
  map: "mapPanel",
  auctiontracker: "auctionTrackerPanel",
  sflbubbles: "sflBubblesPanel",
  dailyprofit: "dailyProfitPanel"
};

export const MODAL_ROUTE_MAP = {
  "land-expansion": {
    overlayId: "expansionSimOverlay",
    open: () => openExpansionSim(),
    close: () => closeExpansionSim()
  },
  chapterfish: {
    overlayId: "chapterFishMutantsOverlay",
    open: () => openChapterFishMutants(),
    close: () => closeChapterFishMutants()
  },
  guntershop: {
    overlayId: "gunterShopOverlay",
    open: () => openGunterShop(),
    close: () => closeGunterShop()
  },
  "chapter-ticket": {
    overlayId: "ticketCalcOverlay",
    open: () => openTicketCalc(),
    close: () => closeTicketCalc()
  },
  trades: {
    overlayId: "tradeShopOverlay",
    open: () => openTradeShop(),
    close: () => closeTradeShop()
  },
  coinconverter: {
    overlayId: "bettyShopOverlay",
    open: () => openBettyShop(),
    close: () => closeBettyShop()
  },
  digging: {
    overlayId: "digPanelOverlay",
    open: () => openDigPanel(),
    close: () => closeDigPanel()
  },
  potion: {
    overlayId: "potionPanelOverlay",
    open: () => openPotionPanel(),
    close: () => closePotionPanel()
  }
};

const VIEW_URL_SLUGS = {
  resources: "mining",
  auctiontracker: "auction",
  sflbubbles: "sfl_bubbles",
  dailyprofit: "daily_profit",
  craftingbox: "crafting_box",
  workbench: "workbench",
  map: "map"
};

const IN_PROGRESS_ROUTE_PREFIX = "in_progress";

const IN_PROGRESS_FILTER_IDS = new Set([ "all", "crops", "resources", "greenhouse", "beehive", "fruits", "animals", "cooking", "pete" ]);

function setInProgressRouteUrl(filter, history_ = "push") {
  if (history_ === "none" || typeof window === "undefined" || !window.history) return;
  const cat = filter && IN_PROGRESS_FILTER_IDS.has(filter) ? filter : "all";
  const path = cat === "all" ? `/${IN_PROGRESS_ROUTE_PREFIX}` : `/${IN_PROGRESS_ROUTE_PREFIX}/${cat}`;
  if (window.location.pathname === path) return;
  const url = path + window.location.search + window.location.hash;
  if (history_ === "replace") {
    window.history.replaceState({
      view: IN_PROGRESS_ROUTE_PREFIX,
      filter: cat
    }, "", url);
  } else {
    window.history.pushState({
      view: IN_PROGRESS_ROUTE_PREFIX,
      filter: cat
    }, "", url);
  }
}

export function syncInProgressFilterRoute(filter) {
  if (routeSyncSuspended) return;
  setInProgressRouteUrl(filter, "push");
}

function openInProgressFromRoute(filter, historyMode) {
  const cat = filter && IN_PROGRESS_FILTER_IDS.has(filter) ? filter : "all";
  setFarmPanelTab("inprogress");
  __set_farmPanelInProgressCategoryFilter(cat);
  openFarmPanel();
  setInProgressRouteUrl(cat, historyMode);
}

const BOOST_ROUTE_SLUG = "boost";

const SKILL_TREE_SUB_SLUG = "skilltree";

const BOOST_SKILL_TREE_PATH = `${BOOST_ROUTE_SLUG}/${SKILL_TREE_SUB_SLUG}`;

const BOOST_CATEGORY_IDS = [ "crops", "resources", "fruits", "greenhouse", "cropmachine", "honey", "animals", "tools", "composter", "cooking", "fishing", "pets", "spicerack", "salt", "limitedtime" ];

const BOOST_CATEGORY_ROUTE_SLUGS = {
  tools: "stocks"
};

const DEFAULT_BOOST_CATEGORY = "crops";

function boostCategoryToRouteSlug(cat) {
  return BOOST_CATEGORY_ROUTE_SLUGS[cat] || cat;
}

function boostCategoryFromRouteSlug(slug) {
  const entry = Object.keys(BOOST_CATEGORY_ROUTE_SLUGS).find(k => BOOST_CATEGORY_ROUTE_SLUGS[k] === slug);
  return entry || slug;
}

function boostRoutePathForCategory(cat) {
  const c = BOOST_CATEGORY_IDS.indexOf(cat) !== -1 ? cat : DEFAULT_BOOST_CATEGORY;
  return c === DEFAULT_BOOST_CATEGORY ? `/${BOOST_ROUTE_SLUG}` : `/${BOOST_ROUTE_SLUG}/${boostCategoryToRouteSlug(c)}`;
}

function setBoostRouteUrl(sub, history_ = "push") {
  if (history_ === "none" || typeof window === "undefined" || !window.history) return;
  const path = sub === SKILL_TREE_SUB_SLUG ? `/${BOOST_SKILL_TREE_PATH}` : boostRoutePathForCategory(boostCategory);
  if (window.location.pathname === path) return;
  const url = path + window.location.search + window.location.hash;
  const state = {
    view: BOOST_ROUTE_SLUG,
    sub: sub === SKILL_TREE_SUB_SLUG ? SKILL_TREE_SUB_SLUG : null,
    cat: sub === SKILL_TREE_SUB_SLUG ? null : boostCategory
  };
  if (history_ === "replace") {
    window.history.replaceState(state, "", url);
  } else {
    window.history.pushState(state, "", url);
  }
}

function currentPathIsBoostRoute() {
  const raw = slugFromLocation();
  if (raw === BOOST_ROUTE_SLUG || raw === BOOST_SKILL_TREE_PATH) return true;
  if (raw.indexOf(BOOST_ROUTE_SLUG + "/") === 0) {
    const routeSlug = raw.slice(BOOST_ROUTE_SLUG.length + 1);
    return BOOST_CATEGORY_IDS.indexOf(boostCategoryFromRouteSlug(routeSlug)) !== -1;
  }
  return false;
}

export function syncBoostPanelRoute(sub) {
  if (routeSyncSuspended) return;
  setBoostRouteUrl(sub === SKILL_TREE_SUB_SLUG ? SKILL_TREE_SUB_SLUG : null, "push");
}

export function syncBoostSkillTreeRoute(isOpen) {
  if (routeSyncSuspended) return;
  setBoostRouteUrl(isOpen ? SKILL_TREE_SUB_SLUG : null, "push");
}

export function syncBoostPanelClosedRoute() {
  if (routeSyncSuspended) return;
  if (currentPathIsBoostRoute()) setRouteUrl(null, "push");
}

function closeBoostPanelIfOpen() {
  const overlay = $("boostPanelOverlay");
  if (overlay && overlay.classList.contains("show")) closeBoostPanel();
}

function openBoostFromRoute(sub, cat, historyMode) {
  openBoostPanel();
  if (sub === SKILL_TREE_SUB_SLUG) {
    setSkillTreeSectionOpen(true, {
      scrollIntoView: true
    });
  } else if (cat && cat !== boostCategory) {
    const btn = document.querySelector(`#boostCategoryToggle button[data-cat="${cat}"]`);
    if (btn) btn.click();
  }
  setBoostRouteUrl(sub === SKILL_TREE_SUB_SLUG ? SKILL_TREE_SUB_SLUG : null, historyMode);
}

const FACTION_SUB_SLUGS = [ "faction/leaderboard", "faction/marks" ];

export function syncFactionSubRoute(sub) {
  if (routeSyncSuspended || typeof window === "undefined" || !window.history) return;
  const path = sub ? `/faction/${sub}` : "/faction";
  if (window.location.pathname === path) return;
  window.history.pushState({
    view: "faction",
    sub: sub || null
  }, "", path + window.location.search + window.location.hash);
}

function viewToSlug(view) {
  return VIEW_URL_SLUGS[view] || view;
}

function slugToView(slug) {
  const entry = Object.keys(VIEW_URL_SLUGS).find(v => VIEW_URL_SLUGS[v] === slug);
  return entry || slug;
}

let routeSyncSuspended = true;

function syncModalRoute(slug, isOpen) {
  if (routeSyncSuspended) return;
  const currentSlug = slugFromLocation();
  if (isOpen) {
    if (currentSlug !== slug) setRouteUrl(slug, "push");
  } else if (currentSlug === slug) {
    setRouteUrl(null, "push");
  }
}

function closeAllModalRoutes() {
  Object.keys(MODAL_ROUTE_MAP).forEach(slug => {
    const overlay = $(MODAL_ROUTE_MAP[slug].overlayId);
    if (overlay && overlay.classList.contains("show")) MODAL_ROUTE_MAP[slug].close();
  });
}

function initModalRouteSync() {
  Object.keys(MODAL_ROUTE_MAP).forEach(slug => {
    const overlay = $(MODAL_ROUTE_MAP[slug].overlayId);
    if (!overlay) return;
    const observer = new MutationObserver(() => {
      if (routeSyncSuspended) return;
      const isShowing = overlay.classList.contains("show");
      const currentSlug = slugFromLocation();
      if (isShowing) {
        if (currentSlug !== slug) setRouteUrl(slug, "push");
      } else if (currentSlug === slug) {
        setRouteUrl(null, "push");
      }
    });
    observer.observe(overlay, {
      attributes: true,
      attributeFilter: [ "class" ]
    });
  });
}

function renderMainViewContent(view) {
  if (view === "crops") renderCropsList();
  if (view === "resources") renderResourceList();
  if (view === "fruits") renderFruitsList();
  if (view === "honey") renderHoneyList();
  if (view === "animals") renderAnimalsList();
  if (view === "salt") renderSaltList();
  if (view === "greenhouse") renderGreenhouseList();
  if (view === "cropmachine") renderCropMachinePanel();
  if (view === "composter") renderComposterList();
  if (view === "cooking") renderCookingPanel();
  if (view === "pets" && typeof renderPetsPanel === "function") renderPetsPanel();
  if (view === "fishing" && typeof renderFishingPanel === "function") renderFishingPanel();
  if (view === "bumpkinlevel") renderBumpkinLevelPanel();
  if (view === "faction" && typeof renderFactionDeliveryPanel === "function") renderFactionDeliveryPanel();
  if (view === "craftingbox" && typeof renderCraftingBoxPanel === "function") renderCraftingBoxPanel();
  if (view === "workbench" && typeof renderWorkbenchPanel === "function") renderWorkbenchPanel();
  if (view === "beginner") renderBeginnerPanel();
  if (view === "leaderboard" && typeof renderLeaderboardPanel === "function") renderLeaderboardPanel();
  if (view === "map" && typeof renderMapPanel === "function") renderMapPanel();
  if (view === "auctiontracker") renderAuctionTrackerPanel();
  if (view === "sflbubbles" && typeof renderSflBubblesPanel === "function") renderSflBubblesPanel();
  if (view === "dailyprofit") renderDailyProfitCard();
}

function setRouteUrl(slug, history_ = "push") {
  if (history_ === "none" || typeof window === "undefined" || !window.history) return;
  const path = slug ? `/${slug}` : "/";
  if (window.location.pathname === path) return;
  const url = path + window.location.search + window.location.hash;
  if (history_ === "replace") {
    window.history.replaceState({
      view: slug || null
    }, "", url);
  } else {
    window.history.pushState({
      view: slug || null
    }, "", url);
  }
}

function openMainViewPanel(view, {historyMode: historyMode = "push"} = {}) {
  const panelId = MAIN_VIEW_PANEL_MAP[view];
  if (!panelId || !$(panelId)) return;
  Object.keys(MAIN_VIEW_PANEL_MAP).forEach(v => {
    if (v === view) return;
    $(MAIN_VIEW_PANEL_MAP[v]).classList.remove("open");
    const otherBtn = document.querySelector(`.type-toggle [data-view="${v}"]`);
    if (otherBtn) otherBtn.classList.remove("active");
  });
  $(panelId).classList.add("open");
  const btn = document.querySelector(`.type-toggle [data-view="${view}"]`);
  if (btn) btn.classList.add("active");
  const backdrop = $("mainTabModalBackdrop");
  if (backdrop) backdrop.classList.add("show");
  renderMainViewContent(view);
  const currentSlug = slugFromLocation();
  setRouteUrl(view === "faction" && FACTION_SUB_SLUGS.indexOf(currentSlug) !== -1 ? currentSlug : viewToSlug(view), historyMode);
}

function closeMainViewPanel(view, {historyMode: historyMode = "push"} = {}) {
  const panelId = MAIN_VIEW_PANEL_MAP[view];
  if (!panelId || !$(panelId)) return;
  $(panelId).classList.remove("open");
  const btn = document.querySelector(`.type-toggle [data-view="${view}"]`);
  if (btn) btn.classList.remove("active");
  const backdrop = $("mainTabModalBackdrop");
  if (backdrop) backdrop.classList.remove("show");
  setRouteUrl(null, historyMode);
}

export function toggleMainView(view) {
  const panelId = MAIN_VIEW_PANEL_MAP[view];
  if (!panelId || !$(panelId)) return;
  const isOpen = $(panelId).classList.contains("open");
  if (isOpen) {
    closeMainViewPanel(view);
  } else {
    openMainViewPanel(view);
  }
}

function closeMainView(view) {
  closeMainViewPanel(view);
}

function slugFromLocation() {
  return window.location.pathname.replace(/^\/+|\/+$/g, "").toLowerCase();
}

function closeAllMainViewPanels() {
  Object.keys(MAIN_VIEW_PANEL_MAP).forEach(v => {
    $(MAIN_VIEW_PANEL_MAP[v]).classList.remove("open");
    const btn = document.querySelector(`.type-toggle [data-view="${v}"]`);
    if (btn) btn.classList.remove("active");
  });
  const backdrop = $("mainTabModalBackdrop");
  if (backdrop) backdrop.classList.remove("show");
}

export function applyRouteFromLocation(historyMode = "none") {
  const rawSlug = slugFromLocation();
  routeSyncSuspended = true;
  if (rawSlug === IN_PROGRESS_ROUTE_PREFIX || rawSlug.indexOf(IN_PROGRESS_ROUTE_PREFIX + "/") === 0) {
    const filter = rawSlug === IN_PROGRESS_ROUTE_PREFIX ? "all" : rawSlug.slice(IN_PROGRESS_ROUTE_PREFIX.length + 1);
    closeAllMainViewPanels();
    closeAllModalRoutes();
    closeBoostPanelIfOpen();
    openInProgressFromRoute(filter, historyMode);
  } else if (rawSlug === BOOST_ROUTE_SLUG || currentPathIsBoostRoute()) {
    const sub = rawSlug === BOOST_SKILL_TREE_PATH ? SKILL_TREE_SUB_SLUG : null;
    const cat = sub ? null : rawSlug === BOOST_ROUTE_SLUG ? DEFAULT_BOOST_CATEGORY : boostCategoryFromRouteSlug(rawSlug.slice(BOOST_ROUTE_SLUG.length + 1));
    closeAllMainViewPanels();
    closeAllModalRoutes();
    closeFarmPanel();
    openBoostFromRoute(sub, cat, historyMode);
  } else {
    const slug = FACTION_SUB_SLUGS.indexOf(rawSlug) !== -1 ? "faction" : slugToView(rawSlug);
    if (slug && MAIN_VIEW_PANEL_MAP[slug]) {
      closeAllModalRoutes();
      closeFarmPanel();
      closeBoostPanelIfOpen();
      openMainViewPanel(slug, {
        historyMode: historyMode
      });
    } else if (slug && MODAL_ROUTE_MAP[slug]) {
      closeAllMainViewPanels();
      closeAllModalRoutes();
      closeFarmPanel();
      closeBoostPanelIfOpen();
      MODAL_ROUTE_MAP[slug].open();
      setRouteUrl(slug, historyMode);
    } else {
      closeAllMainViewPanels();
      closeAllModalRoutes();
      closeFarmPanel();
      closeBoostPanelIfOpen();
    }
  }
  setTimeout(() => {
    routeSyncSuspended = false;
  }, 0);
}

export function initMainViewRouting() {
  initModalRouteSync();
  applyRouteFromLocation("replace");
  window.addEventListener("popstate", () => applyRouteFromLocation("none"));
}

document.addEventListener("click", e => {
  const closeBtn = e.target.closest(".main-tab-modal-close");
  if (!closeBtn) return;
  closeMainView(closeBtn.dataset.view);
});

document.addEventListener("click", e => {
  const boostBtn = e.target.closest(".panel-boost-nodes-btn");
  if (!boostBtn) return;
  $("boostPanelOverlay").classList.add("opened-from-panel");
  openBoostPanel();
  syncBoostPanelRoute(null);
});

document.addEventListener("click", e => {
  const btn = e.target.closest(".hint-q-btn");
  if (!btn) return;
  const wrap = btn.closest(".hint-collapsible");
  if (wrap) wrap.classList.toggle("open");
});

export function refreshAnimalAffectionToolToggleUI() {
  Object.keys(ANIMAL_LOVE_ITEM_XP).forEach(key => {
    const row = $(`affectionToolRow_${key}`);
    const input = $(`affectionToolInput_${key}`);
    if (!row || !input) return;
    input.checked = !!animalAffectionTools[key];
    row.classList.toggle("is-active", !!animalAffectionTools[key]);
  });
}

function renderTop10Row(item, index) {
  const rank = index + 1;
  const rankClass = rank <= 3 ? `rank-${rank}` : "rank-rest";
  const costUnknown = !!item.costUnknown;
  const unitCost24h = item.unitCost24hIndividual != null ? item.unitCost24hIndividual : item.unitCost24h;
  const unitProfit24h = item.unitProfit24hIndividual != null ? item.unitProfit24hIndividual : item.unitProfit24h;
  const unitRestockCost24h = item.unitRestockCost24hIndividual != null ? item.unitRestockCost24hIndividual : (item.unitRestockCost24h || 0);
  const holdingCost24h = item.holdingCost24hIndividual != null ? item.holdingCost24hIndividual : item.holdingCost24h;
  const holdingRestockCost24h = item.holdingRestockCost24hIndividual != null ? item.holdingRestockCost24hIndividual : (item.holdingRestockCost24h || 0);
  const holdingProfit24h = item.holdingProfit24hIndividual != null ? item.holdingProfit24hIndividual : item.holdingProfit24h;
  const isProfit = !costUnknown && unitProfit24h >= 0;
  const ordinal = rank === 1 ? "1st" : rank === 2 ? "2nd" : rank === 3 ? "3rd" : `${rank}th`;
  const unitLabel = item.countLabel.toLowerCase();
  const periodPhrase = item.rateNote ? item.rateNote : `/ ${unitLabel} / 24h`;
  const hasHoldingTotals = item.count > 0 && holdingCost24h !== undefined;
  const ownedLine = item.count > 0 ? `${fmt(item.count)} ${item.countLabel}${item.count === 1 ? "" : "s"} owned · ${fmt(item.holdingUnitsPerDay)} units/24h` : item.rateNote ? item.rateNote : `0 owned — showing per-${unitLabel} rate`;
  const holdingRestockNote = holdingRestockCost24h > 0 ? ` <span class="top10-restock-note">(incl. ${fmt(holdingRestockCost24h)} ${FLOWER_ICON} restock)</span>` : "";
  const grossLine = hasHoldingTotals ? `<div class="top10-gross-line" style="margin-top:2px;">Total 24h: Cost ${fmt(holdingCost24h)} ${FLOWER_ICON}${holdingRestockNote} &nbsp;→&nbsp; Rev ${fmt(item.holdingRevenue24h)} ${FLOWER_ICON} &nbsp;→&nbsp; <strong class="top10-net-value ${holdingProfit24h >= 0 ? "is-profit" : "is-loss"}">Net ${holdingProfit24h >= 0 ? "+" : ""}${fmt(holdingProfit24h)} ${FLOWER_ICON}</strong></div>` : "";
  const restockNote = unitRestockCost24h > 0 ? ` <span class="top10-restock-note">(incl. ${fmt(unitRestockCost24h)} ${FLOWER_ICON} restock)</span>` : "";
  const costLine = costUnknown ? `Cost unknown &nbsp;·&nbsp; Rev ${fmt(item.unitRevenue24h)} ${FLOWER_ICON} FLOWER <span style="opacity:.65;">${periodPhrase}</span>` : `Cost ${fmt(unitCost24h)} ${FLOWER_ICON} FLOWER${restockNote} &nbsp;·&nbsp; Rev ${fmt(item.unitRevenue24h)} ${FLOWER_ICON} FLOWER <span style="opacity:.65;">${periodPhrase}</span>`;
  const profitLine = costUnknown ? `<span style="opacity:.75;">Can't rank profit — no known cost basis for this item</span>` : `${isProfit ? "+" : ""}${fmt(unitProfit24h)} ${FLOWER_ICON} FLOWER ${item.rateNote ? "" : `per ${unitLabel} / 24h`}`;
  const metaLine = item.cyclesPerDay != null ? `${ownedLine} · ${fmt(item.cyclesPerDay)} cycles/day` : ownedLine;
  return `\n  <div class="top10-row ${rankClass}">\n    <div class="top10-rank-badge">${ordinal}</div>\n    <div class="top10-main">\n      <div class="top10-name-line">\n        <span class="top10-icon">${item.icon}</span>\n        <span class="top10-name">${escapeHtml(item.name)}</span>\n        <span class="top10-cat">${item.category}</span>\n      </div>\n      <div class="top10-fig-line">${costLine}</div>\n      <div class="top10-profit-line ${costUnknown ? "" : isProfit ? "is-profit" : "is-loss"}">${profitLine}</div>\n      <div class="top10-meta-line">${metaLine}</div>\n      ${grossLine}\n    </div>\n  </div>`;
}

function renderTop10Card() {
  const body = $("top10Body");
  const sub = $("top10Sub");
  if (!body) return;
  const items = gatherTop10ProfitItems();
  if (!items.length) {
    sub.textContent = "Ranked by per-unit 24h profit across crops, resources, fruits & animals";
    body.innerHTML = `<div class="top10-empty">🌱 No items found.</div>`;
    return;
  }
  sub.textContent = `Ranked by per-unit 24h profit across every tradable item — works even at 0 owned`;
  body.innerHTML = items.map(renderTop10Row).join("") + `<div class="top10-footer-note">Ranked purely by profit-per-unit, independent of how many you own. Items with no repeating farm cycle (crafted flowers, tools, Obsidian) show a one-off or capped daily-average margin instead. Items with no known cost basis anywhere in the app are shown with sell price only and can't be ranked by profit. Reopen or refresh to refresh the ranking as prices move.</div>`;
}

export function showTop10Card() {
  const body = $("top10Body");
  const sub = $("top10Sub");
  if (body) body.innerHTML = `<div class="top10-empty">⏳ Crunching the numbers…</div>`;
  if (sub) sub.textContent = "Ranked by per-unit 24h profit across every tradable item";
  $("top10Overlay").classList.add("show");
  requestAnimationFrame(() => requestAnimationFrame(renderTop10Card));
  $("top10Overlay").classList.add("show");
}

export function hideTop10Card() {
  $("top10Overlay").classList.remove("show");
}

function dailyProfitSwapBadgeHtml(card, key) {
  const swapCategory = dailyProfitSwapCategoryFor(card.name);
  if (!swapCategory) return "";
  return `<button type="button" class="dprofit-swap-badge" data-node="${escapeHtml(key)}" title="Swap this ${swapCategory}">🔁</button>`;
}

function dailyProfitSwapCategoryFor(name) {
  if (BASE_CROPS[name]) return "crop";
  if (BASE_FRUITS[name]) return "fruit";
  return null;
}

function dailyProfitBuildDisplayCard(card) {
  const key = card.name.toLowerCase();
  const swapName = getDailyProfitSwap(key);
  if (!swapName) return card;
  const stats = buildDailyProfitSwapStats(swapName, card.displayNodeCount || card.count);
  if (!stats) return card;
  return Object.assign({}, card, {
    displayName: swapName,
    price: stats.price,
    costPerUnit: stats.costPerUnit,
    avgYieldPerCycle: stats.avgYieldPerCycle,
    cyclesPerDay: stats.cyclesPerDay,
    shrineCostPerCycle: 0,
    shrineNames: []
  });
}

function dailyProfitPeriodShort() {
  return getDailyProfitPeriodMode() === "7d" ? "7d" : "24h";
}

function renderDailyProfitCardHtml(card) {
  const key = card.name.toLowerCase();
  const cycleCount = dailyProfitGetCycleCount(card);
  const proj = computeDailyProfitProjection(card, cycleCount);
  const isProfit = proj.netProfit24h >= 0;
  const expandedCls = dailyProfitExpandedNames.has(key) ? " expanded" : "";
  const displayName = card.displayName || card.name;
  const nodeIcon = getNodeIconHtml(displayName);
  const nodeLabel = getNodeLabel(displayName);
  const swapNote = card.displayName ? ` · swapped from ${escapeHtml(card.name)}` : "";
  const periodShort = dailyProfitPeriodShort();
  const shrineRow = proj.shrineCost24h > 0 ? `<div class="dprofit-stat dprofit-stat-sub"><span class="label">Shrine Cost${proj.shrineNames && proj.shrineNames.length ? ` (${proj.shrineNames.map(escapeHtml).join(", ")})` : ""}</span><span class="value" data-role="shrine">-${fmt(proj.shrineCost24h)} ${FLOWER_ICON}</span></div>` : "";
  return `\n  <div class="dprofit-node-card${isProfit ? " is-profit" : " is-loss"}${expandedCls}" data-node="${escapeHtml(key)}">\n    ${dailyProfitSwapBadgeHtml(card, key)}\n    <div class="dprofit-node-toggle">\n      <span class="dprofit-node-icon">${nodeIcon}</span>\n      <div class="dprofit-node-name-wrap">\n        <div class="dprofit-node-name">${escapeHtml(nodeLabel)}</div>\n        <div class="dprofit-node-sub">${card.displayNodeCount} node${card.displayNodeCount === 1 ? "" : "s"}${swapNote}</div>\n      </div>\n      <div class="dprofit-node-profit-wrap">\n        <div class="dprofit-node-24h ${isProfit ? "is-profit" : "is-loss"}" data-role="profit-value">${isProfit ? "+" : ""}${fmt(proj.netProfit24h)} ${FLOWER_ICON}</div>\n        <span class="dprofit-chev">▾</span>\n      </div>\n    </div>\n    <div class="dprofit-cycle-row">\n      <label>Cycles / ${periodShort}</label>\n      <input type="number" class="dprofit-cycle-input" inputmode="numeric" min="0" step="1" value="${fmtCycleInputValue(cycleCount)}" data-node="${escapeHtml(key)}">\n    </div>\n    <div class="dprofit-node-details">\n      <div class="dprofit-detail-grid">\n        <div class="dprofit-stat"><span class="label">Market Sell Price</span><span class="value">${fmt(card.price || 0)} ${FLOWER_ICON}</span></div>\n        <div class="dprofit-stat"><span class="label">Total Nodes</span><span class="value">${card.displayNodeCount}</span></div>\n        <div class="dprofit-stat"><span class="label">Yield / Cycle (Total)</span><span class="value" data-role="yield-cycle">${fmt(proj.yieldPerCycle)}</span></div>\n        <div class="dprofit-stat"><span class="label">${periodShort} Total Yield</span><span class="value" data-role="yield-24h">${fmt(proj.totalYield24h)}</span></div>\n        <div class="dprofit-stat"><span class="label">Gross (1 Cycle)</span><span class="value" data-role="gross-cycle">${fmt(proj.grossPerCycle)} ${FLOWER_ICON}</span></div>\n        <div class="dprofit-stat"><span class="label">Gross (${periodShort})</span><span class="value" data-role="gross-24h">${fmt(proj.gross24h)} ${FLOWER_ICON}</span></div>\n      </div>\n      <div class="dprofit-deductions-title">Deductions</div>\n      <div class="dprofit-detail-grid">\n        <div class="dprofit-stat dprofit-stat-sub"><span class="label">Coin Cost / Cycle</span><span class="value" data-role="coin-cycle">-${fmt(proj.coinCostPerCycle)} ${FLOWER_ICON}</span></div>\n        <div class="dprofit-stat dprofit-stat-sub"><span class="label">Coin Cost (${periodShort})</span><span class="value" data-role="coin-24h">-${fmt(proj.coinCost24h)} ${FLOWER_ICON}</span></div>\n        <div class="dprofit-stat dprofit-stat-sub"><span class="label">Restock Cost</span><span class="value" data-role="restock">${proj.restockCost24h > 0 ? `-${fmt(proj.restockCost24h)}` : "0"} ${FLOWER_ICON}</span></div>\n        ${shrineRow}\n        <div class="dprofit-stat dprofit-stat-sub"><span class="label">Total Sell Fee${feePercent > 0 ? ` (${feePercent}%)` : ""}</span><span class="value" data-role="sellfee">${proj.feeAmount24h > 0 ? `-${fmt(proj.feeAmount24h)}` : "0"} ${FLOWER_ICON}</span></div>\n      </div>\n      <div class="dprofit-deductions-total-row">\n        <span class="label">Total Deductions</span>\n        <span class="value" data-role="total-deductions">-${fmt(proj.totalDeductions24h)} ${FLOWER_ICON}</span>\n      </div>\n      <div class="dprofit-net-row">\n        <span class="label">Total Net</span>\n        <span class="value ${isProfit ? "is-profit" : "is-loss"}" data-role="net-value">${isProfit ? "+" : ""}${fmt(proj.netProfit24h)} ${FLOWER_ICON}</span>\n      </div>\n    </div>\n  </div>`;
}

let dailyProfitRawCardsByKey = new Map;

function updateDailyProfitCalcModeToggleUI() {
  const avgInput = $("dprofitAverageSwitchInput");
  const liveInput = $("dprofitLiveSwitchInput");
  const period24hInput = $("dprofitPeriod24hInput");
  const period7dInput = $("dprofitPeriod7dInput");
  const allTotalsInput = $("dprofitAllTotalsInput");
  const profitOnlyInput = $("dprofitProfitOnlyInput");
  if (avgInput && liveInput) {
    const isAverage = getDailyProfitCalcMode() !== "live";
    avgInput.checked = isAverage;
    liveInput.checked = !isAverage;
  }
  if (period24hInput && period7dInput) {
    const is7d = getDailyProfitPeriodMode() === "7d";
    period24hInput.checked = !is7d;
    period7dInput.checked = is7d;
  }
  if (allTotalsInput && profitOnlyInput) {
    const isProfitOnly = getDailyProfitTotalsMode() === "profitOnly";
    allTotalsInput.checked = !isProfitOnly;
    profitOnlyInput.checked = isProfitOnly;
  }
}

function attachDailyProfitCalcModeToggle() {
  const avgInput = $("dprofitAverageSwitchInput");
  const liveInput = $("dprofitLiveSwitchInput");
  const period24hInput = $("dprofitPeriod24hInput");
  const period7dInput = $("dprofitPeriod7dInput");
  const allTotalsInput = $("dprofitAllTotalsInput");
  const profitOnlyInput = $("dprofitProfitOnlyInput");
  if (avgInput) {
    avgInput.onchange = () => {
      setDailyProfitCalcMode(avgInput.checked ? "average" : "live");
      updateDailyProfitCalcModeToggleUI();
      renderDailyProfitCard();
    };
  }
  if (liveInput) {
    liveInput.onchange = () => {
      setDailyProfitCalcMode(liveInput.checked ? "live" : "average");
      updateDailyProfitCalcModeToggleUI();
      renderDailyProfitCard();
    };
  }
  if (period24hInput) {
    period24hInput.onchange = () => {
      setDailyProfitPeriodMode(period24hInput.checked ? "24h" : "7d");
      updateDailyProfitCalcModeToggleUI();
      renderDailyProfitCard();
    };
  }
  if (period7dInput) {
    period7dInput.onchange = () => {
      setDailyProfitPeriodMode(period7dInput.checked ? "7d" : "24h");
      updateDailyProfitCalcModeToggleUI();
      renderDailyProfitCard();
    };
  }
  if (allTotalsInput) {
    allTotalsInput.onchange = () => {
      setDailyProfitTotalsMode(allTotalsInput.checked ? "all" : "profitOnly");
      updateDailyProfitCalcModeToggleUI();
      updateDailyProfitSummary();
    };
  }
  if (profitOnlyInput) {
    profitOnlyInput.onchange = () => {
      setDailyProfitTotalsMode(profitOnlyInput.checked ? "profitOnly" : "all");
      updateDailyProfitCalcModeToggleUI();
      updateDailyProfitSummary();
    };
  }
}

function openDailyProfitSwapPicker(key) {
  const original = dailyProfitRawCardsByKey.get(key);
  if (!original) return;
  const category = dailyProfitSwapCategoryFor(original.name);
  if (!category) return;
  const pool = category === "crop" ? BASE_CROPS : BASE_FRUITS;
  const currentSwap = getDailyProfitSwap(key) || "";
  const options = [ {
    value: "",
    name: `↺ Actual (${escapeHtml(original.name)})`,
    meta: "Use the real in-progress node"
  } ].concat(Object.keys(pool).sort().map(n => ({
    value: n,
    name: `${getIcon(n)} ${escapeHtml(n)}`
  })));
  openPixelPicker(category === "crop" ? "🌾 CHOOSE CROP" : "🍎 CHOOSE FRUIT", options, currentSwap, val => {
    setDailyProfitSwap(key, val || null);
    renderDailyProfitCard();
  });
}

export function dailyProfitGuideSnapshot() {
  return {
    synced: !!farmPanelGameState,
    items: computeGuideAveragePanelItems()
  };
}

export function renderDailyProfitCard() {
  const body = $("dailyProfitBody");
  if (!body) return;
  attachDailyProfitCalcModeToggle();
  updateDailyProfitCalcModeToggleUI();
  if (!farmPanelGameState) {
    __set_dailyProfitCardsCache([]);
    dailyProfitRawCardsByKey = new Map;
    body.innerHTML = `<div class="dprofit-empty">🌱 Sync a Farm ID first to see your Daily Profit.</div>`;
    updateDailyProfitSummary();
    return;
  }
  const tradableMarketNames = new Set((marketItems || []).map(m => (m && m.name ? m.name : "").toLowerCase()).filter(Boolean));
  const rawCards = farmPanelComputeInProgress(farmPanelGameState).filter(c => c && typeof c.name === "string" && c.name && tradableMarketNames.has(c.name.toLowerCase()));
  dailyProfitRawCardsByKey = new Map(rawCards.map(c => [ c.name.toLowerCase(), c ]));
  const cards = rawCards.map(dailyProfitBuildDisplayCard);
  __set_dailyProfitCardsCache(cards);
  if (!cards.length) {
    body.innerHTML = `<div class="dprofit-empty">⏳ Nothing currently growing in this farm.</div>`;
    updateDailyProfitSummary();
    return;
  }
  const sorted = cards.slice().sort((a, b) => {
    const projA = computeDailyProfitProjection(a, dailyProfitGetCycleCount(a));
    const projB = computeDailyProfitProjection(b, dailyProfitGetCycleCount(b));
    return projB.netProfit24h - projA.netProfit24h;
  });
  body.innerHTML = sorted.map(renderDailyProfitCardHtml).join("");
  attachDailyProfitCardEvents(body);
  body.querySelectorAll(".dprofit-swap-badge").forEach(badge => {
    badge.addEventListener("click", e => {
      e.stopPropagation();
      openDailyProfitSwapPicker(badge.dataset.node);
    });
    badge.addEventListener("pointerdown", e => e.stopPropagation());
  });
  updateDailyProfitSummary();
}

export function showDailyProfitCard() {
  openMainViewPanel("dailyprofit");
}

export function hideDailyProfitCard() {
  closeMainViewPanel("dailyprofit");
}

function dailyProfitToolConfigTiles() {
  const tiles = new Map;
  let saltCard = null;
  dailyProfitRawCardsByKey.forEach(card => {
    const name = card.name;
    if (name === "Obsidian") {
      const season = previewSeason;
      const fig = computeLavaPitFigures(season);
      if (!fig || !fig.breakdown || !fig.breakdown.length) return;
      const key = "Obsidian_" + season;
      if (tiles.has(key)) return;
      tiles.set(key, {
        resourceKey: key,
        toolLabel: "Lava Pit",
        seasonNote: season,
        breakdown: fig.breakdown,
        toolCount: Math.max(0, Math.round(dailyProfitGetCycleCount(card) * 1)),
        nodeCount: 1
      });
      return;
    }
    if (name === "Salt") {
      saltCard = card;
      return;
    }
    const data = RESOURCE_DATA[name];
    if (!data || !data.materials || !data.materials.length) return;
    if (tiles.has(name)) return;
    const fig = computeResourceFigures(name);
    if (!fig || !fig.breakdown || !fig.breakdown.length) return;
    tiles.set(name, {
      resourceKey: name,
      toolLabel: data.tool,
      breakdown: fig.breakdown,
      toolCount: Math.max(0, Math.round(dailyProfitGetCycleCount(card) * (fig.nodeCount || 0))),
      nodeCount: fig.nodeCount || 0
    });
  });
  const saltFig = computeSaltFarmFigures();
  const rakeUsesPerDay = saltFig.rakeUsesPerDay || 0;
  if (rakeUsesPerDay > 0) {
    const rakeTool = findTool("default_salt_rake");
    const rakeMaterials = rakeTool && rakeTool.materials ? rakeTool.materials : [];
    if (rakeMaterials.length) {
      const periodMult = getDailyProfitPeriodMode() === "7d" ? 7 : 1;
      const rakeModeKey = "ToolLib_" + rakeTool.id;
      const breakdown = rakeMaterials.map(mat => {
        const mode = getMaterialMode(rakeModeKey, mat.name);
        const unitCost = getMaterialUnitCostCoins(mat.name, mode);
        return {
          name: mat.name,
          qty: mat.qty,
          unitCost: unitCost,
          lineCost: unitCost * mat.qty,
          mode: mode
        };
      });
      const nodeCount = saltFig.nodeCount || 0;
      const seaBlessedRakeMult = getDailyProfitCalcMode() === "live" || !saltFig.seaBlessed ? 1 : saltFig.seaBlessed.harvestMult;
      const chargesPerNodePerPeriod = (saltCard ? dailyProfitGetCycleCount(saltCard) : Math.round((saltFig.chargesPerDayPerNode || 0) * periodMult)) * seaBlessedRakeMult;
      tiles.set("Salt", {
        resourceKey: "Salt",
        materialModeKey: rakeModeKey,
        toolLabel: "Salt Rake",
        breakdown: breakdown,
        toolCount: Math.max(0, Math.round(chargesPerNodePerPeriod * nodeCount)),
        nodeCount: nodeCount
      });
    }
  }
  return Array.from(tiles.values());
}

function dailyProfitCostConfigRowHtml(tile) {
  const toolCount = Math.max(0, Math.round(tile.toolCount || 0));
  const isSelfProduce = tile.breakdown.every(m => m.mode !== "buy");
  const matLines = tile.breakdown.map(m => `<div class="dprofit-cost-config-mat-line">${getIcon(m.name)} ${fmt(m.qty)}× ${escapeHtml(m.name)}</div>`).join("");
  const totalNote = tile.breakdown.map(m => `${fmt((m.qty || 0) * toolCount)} ${escapeHtml(m.name)}`).join(", ");
  return `\n  <div class="dprofit-cost-config-row" data-res="${escapeHtml(tile.resourceKey)}">\n    <div class="dprofit-cost-config-tool">\n      <span class="dprofit-cost-config-tool-icon">${getIcon(tile.toolLabel)}</span>\n      <div>\n        <div class="dprofit-cost-config-tool-name">${escapeHtml(tile.toolLabel)}${tile.seasonNote ? ` <span style="font-weight:600;opacity:.7;">(${escapeHtml(tile.seasonNote)})</span>` : ""}</div>\n        <div class="dprofit-cost-config-tool-count">×${toolCount} needed</div>\n      </div>\n    </div>\n    <div class="dprofit-cost-config-materials">\n      ${matLines}\n      ${toolCount > 0 ? `<div class="dprofit-cost-config-mat-total">Total: ${totalNote}</div>` : ""}\n    </div>\n    <div class="dprofit-cost-config-check-cell">\n      <label class="dprofit-cost-config-checkbox${isSelfProduce ? " is-checked" : ""}">\n        <input type="checkbox" class="dprofit-cost-config-input" data-res="${escapeHtml(tile.resourceKey)}" data-mode="collect" ${isSelfProduce ? "checked" : ""}>\n      </label>\n    </div>\n    <div class="dprofit-cost-config-check-cell">\n      <label class="dprofit-cost-config-checkbox${!isSelfProduce ? " is-checked" : ""}">\n        <input type="checkbox" class="dprofit-cost-config-input" data-res="${escapeHtml(tile.resourceKey)}" data-mode="buy" ${!isSelfProduce ? "checked" : ""}>\n      </label>\n    </div>\n  </div>`;
}

function attachDprofitCostConfigEvents(body) {
  body.querySelectorAll(".dprofit-cost-config-input").forEach(input => {
    input.onchange = () => {
      const resourceKey = input.dataset.res;
      const mode = input.dataset.mode === "buy" ? "buy" : "collect";
      const tile = dailyProfitToolConfigTiles().find(t => t.resourceKey === resourceKey);
      if (tile) tile.breakdown.forEach(m => setMaterialMode(tile.materialModeKey || resourceKey, m.name, mode));
      invalidateCostCache();
      renderDprofitCostConfigBody();
      renderDailyProfitCard();
    };
  });
}

function renderDprofitCostConfigBody() {
  const body = $("dprofitCostConfigBody");
  if (!body) return;
  const tiles = dailyProfitToolConfigTiles();
  if (!tiles.length) {
    body.innerHTML = `<div class="dprofit-cost-config-empty">⛏️ Nothing currently growing needs crafted tool materials.</div>`;
    return;
  }
  body.innerHTML = `\n    <div class="dprofit-cost-config-intro">Choose how each tool's crafting materials should be priced. <b>Self Produce</b> values materials at what they actually cost you to gather (their own coin/material cost). <b>Buy</b> values them at the live 🛒 Marketplace price instead.</div>\n    <div class="dprofit-cost-config-head-row"><span>Tool</span><span>Materials</span><span>Self Produce</span><span>Buy</span></div>\n    ${tiles.map(dailyProfitCostConfigRowHtml).join("")}\n    <div class="dprofit-cost-config-note">🌋 Obsidian's materials change with the season and its once-every-7-days sell cap is already handled automatically by the Mining panel — this modal only lets you choose how its materials are priced.</div>\n    <div class="dprofit-cost-config-note">🧂 Salt Rake usage is based on charges harvested/day (Nodes × Charges/day/node from the 🧂 Salt panel) — this modal only lets you choose how its crafting materials are priced.</div>`;
  attachDprofitCostConfigEvents(body);
}

export function openDprofitCostConfig() {
  renderDprofitCostConfigBody();
  const overlay = $("dprofitCostConfigOverlay");
  overlay.classList.remove("show");
  void overlay.offsetWidth;
  overlay.classList.add("show");
}

export function closeDprofitCostConfig() {
  const overlay = $("dprofitCostConfigOverlay");
  if (overlay) overlay.classList.remove("show");
}

function openPixelPicker(title, options, selectedValue, onSelect) {
  __set_pixelPickerOnSelect(onSelect);
  $("pixelPickerTitle").textContent = title;
  $("pixelPickerBody").innerHTML = options.map((o, i) => `\n    <div class="pixel-picker-option${o.value === selectedValue ? " is-selected" : ""}" data-value="${escapeHtml(o.value)}" style="--row-i:${i};">\n      <div class="pixel-picker-option-main">\n        <div class="pixel-picker-option-name">${o.name}</div>\n        ${o.meta ? `<div class="pixel-picker-option-meta">${o.meta}</div>` : ""}\n      </div>\n      ${o.badge ? `<div class="pixel-picker-option-badge">${escapeHtml(o.badge)}</div>` : ""}\n      ${o.value === selectedValue ? `<div class="pixel-picker-check">✓</div>` : ""}\n    </div>`).join("");
  const overlay = $("pixelPickerOverlay");
  overlay.classList.remove("show");
  void overlay.offsetWidth;
  overlay.classList.add("show");
  document.querySelectorAll("#pixelPickerBody .pixel-picker-option").forEach(row => {
    row.onclick = () => {
      const cb = pixelPickerOnSelect;
      closePixelPicker();
      if (cb) cb(row.dataset.value);
    };
  });
}

export function closePixelPicker() {
  $("pixelPickerOverlay").classList.remove("show");
  __set_pixelPickerOnSelect(null);
}

function renderSeaBlessedAverageHtml(fig) {
  const sb = fig.seaBlessed;
  if (!sb || !sb.ranks || !sb.ranks.length) return "";
  const f2 = n => n.toLocaleString(undefined, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  });
  const fx = n => n.toFixed(4);
  const statusLine = sb.active ? `Active: Rank ${sb.rank}/${sb.maxRank} · ${fmt(sb.chancePct)}% chance · ${fmtInt(sb.targets)} node${sb.targets === 1 ? "" : "s"} restored per proc` : `Skill not selected — Salt/day above excludes it. Ranks below show what each would add.`;
  const rows = sb.ranks.map(r => {
    const isCurrent = sb.active && r.rank === sb.rank;
    return `<div style="display:flex;justify-content:space-between;align-items:center;gap:8px;font-size:10.8px;padding:3px 0;border-bottom:1px dashed var(--line, rgba(0,0,0,.12));${isCurrent ? "font-weight:700;color:var(--profit);" : ""}"><span>Rank ${r.rank} · ${fmt(r.chancePct)}%${isCurrent ? " ✓" : ""}</span><span style="font-family:'JetBrains Mono',monospace;text-align:right;">×${fx(r.harvestMult)} harvests · +${f2(r.bonusSaltPerDay)} ${getIcon("Salt")}/day</span></div>`;
  }).join("");
  const title = "Sea Blessed rolls once on every Salt harvest. A proc gives +1 charge to up to 4 Salt Nodes below max, and each restored charge is harvested too, so it rolls again. Average harvests per natural charge = 1 / (1 − nodes restored × chance).";
  return `\n      <div class="lib-section-title" style="margin-top:10px;" title="${escapeHtml(title)}">⚡ Sea Blessed — average per day</div>\n      <div style="font-size:10.2px;color:${sb.active ? "var(--profit)" : "var(--ink-soft)"};font-weight:600;margin-bottom:4px;">${statusLine}</div>\n      <div class="card-grid">\n        <div class="stat"><span class="label">Natural harvests/day</span><span class="value">${f2(sb.naturalHarvestsPerDay)}</span></div>\n        <div class="stat"><span class="label">Avg harvests/day</span><span class="value">${f2(sb.harvestsPerDay)}</span></div>\n        <div class="stat"><span class="label">Bonus harvests/day</span><span class="value">+${f2(sb.bonusHarvestsPerDay)}</span></div>\n        <div class="stat"><span class="label">Bonus Salt/day</span><span class="value">+${f2(sb.bonusSaltPerDay)}</span></div>\n      </div>\n      <div style="margin-top:4px;">${rows}</div>\n      <div style="font-size:9px;color:var(--ink-soft);margin-top:5px;">Every harvest rolls Sea Blessed, including the ones it restores, so procs chain: each charge is worth 1 ÷ (1 − ${fmtInt(sb.targets)} node${sb.targets === 1 ? "" : "s"} × chance) harvests on average. Assumes you harvest each charge as it becomes ready, and every extra harvest uses an extra Salt Rake (already in the rake and restock cost).</div>`;
}

function renderSaltFarmCard() {
  const fig = computeSaltFarmFigures();
  const isProfit = fig.dailyProfit >= 0;
  return `\n  <div class="card ${isProfit ? "is-profit" : "is-loss"}" data-search="salt farm">\n    <div class="card-toggle" style="cursor:default;">\n      <div class="card-name-row">\n        <span class="card-icon">${getIcon("Salt")}</span>\n        <div>\n          <div class="card-name">Salt Farm</div>\n          <div class="card-type">${fmt(fig.costPerUnitFlower)} ${FLOWER_ICON} FLOWER cost / Salt · sell ${fmt(fig.sellFlower)} ${FLOWER_ICON} FLOWER</div>\n        </div>\n      </div>\n      <div class="card-collapsed-profit">\n        ${fig.activeBoosts && fig.activeBoosts.length ? `<span class="boost-badge">⚡${fig.activeBoosts.length}</span>` : ""}\n      </div>\n    </div>\n    <div class="card-details" style="display:block;max-height:none;padding-top:0;">\n      <div style="display:grid;grid-template-columns:1fr 130px;gap:6px 8px;align-items:center;margin:6px 0 8px;">\n        <label style="font-size:11.4px;color:var(--ink-soft);">${getIcon("Salt")} Farm level (1–${FARM_LEVEL_NODES.length})</label>\n        ${stepperHtml("farmLevelInput", saltFarmLevel, 1, FARM_LEVEL_NODES.length)}\n      </div>\n      <div style="display:grid;grid-template-columns:1fr 130px;gap:6px 8px;align-items:center;margin:0 0 8px;">\n        <label style="font-size:11.4px;color:var(--ink-soft);">${getIcon("Salt")} Salt Nodes owned (max ${farmLevelMaxNodes()} at this level)</label>\n        ${stepperHtml("saltNodeInput", fig.nodeCount, 0, farmLevelMaxNodes())}\n      </div>\n      <div class="card-grid">\n        <div class="stat"><span class="label">Charges/day/node</span><span class="value">${fmtInt(fig.chargesPerDayPerNode)}</span></div>\n        <div class="stat"><span class="label">Time/charge</span><span class="value">${formatDuration(fig.timeSec)}${Math.round(fig.timeSec) !== Math.round(SALT_BASE_TIME_SEC) ? ` <span style="color:var(--ink-soft);font-weight:600;">(${formatDuration(SALT_BASE_TIME_SEC)} base)</span>` : ""}</span></div>\n        <div class="stat"><span class="label">Max stored charges/node</span><span class="value">${fig.storedChargeCap} (${fig.storedChargeCap} harvests banked)</span></div>\n        <div class="stat"><span class="label">Yield/charge</span><span class="value">${fmt(fig.yieldPerCharge)}${fig.saltYieldBonus ? ` (10 + ${fmt(fig.saltYieldBonus)} boost)` : ""}</span></div>\n        <div class="stat"><span class="label">Salt/day${fig.seaBlessed && fig.seaBlessed.active ? " (avg, Sea Blessed)" : ""}</span><span class="value">${fmt(fig.saltPerDay)}</span></div>\n        <div class="stat"><span class="label">Cost/Salt</span><span class="value">${fmt(fig.costPerUnitFlower)} ${FLOWER_ICON} FLOWER</span></div>\n        <div class="stat"><span class="label">Sell (market)</span><span class="value">${fmt(fig.sellFlower)} ${FLOWER_ICON} FLOWER</span></div>\n      </div>\n      ${render24hTotalsGrid(fig.dailyCost + fig.restockCost24h, fig.saltPerDay * fig.sellFlower, fig.dailyRevenue, fig.dailyProfit, {
    title: `24HRS PROFIT/LOSS — ${fmt(fig.nodeCount)} node${fig.nodeCount === 1 ? "" : "s"}`,
    totalYield: fig.saltPerDay,
    yieldLabel: "Salt",
    restockCost24h: fig.restockCost24h,
    restockDetails: fig.restockDetails,
    restockNote: typeof getRestockExclusionNote === "function" ? getRestockExclusionNote("Salt Rake") : ""
  })}\n      <div class="profit-banner">\n        <span class="plabel">Profit / day (${fmt(fig.nodeCount)} node${fig.nodeCount === 1 ? "" : "s"})</span>\n        <span class="pvalue ${isProfit ? "is-profit" : "is-loss"}">${isProfit ? "+" : ""}${fmt(fig.dailyProfit)} ${FLOWER_ICON} FLOWER</span>\n      </div>\n      <div style="font-size:9px;color:var(--ink-soft);margin-top:5px;">Salt Rake cost is read live from 🛒 Marketplace Prices → Base Coin Cost → Tools → Salt Rake (${fmt(fig.rakeCoinCost)}${COIN_ICON} per rake, after Sculpture's Salt Rake discount) — edit it there, not here. Each stored charge yields ${SALT_BASE_YIELD} Salt base; boosts in ⚡ Boosts → 🧂 Salt add flat bonus Salt/harvest on top. Edit Salt's sell price in 🛒 Marketplace Prices.</div>\n      ${renderSaltBoostAppliedList(fig.activeBoosts)}${renderSeaBlessedAverageHtml(fig)}\n      ${(() => {
    const next = computeFarmLevelNextCost();
    return next ? `\n      <div class="lib-section-title" style="margin-top:10px;">Cost to reach Farm Level ${saltFarmLevel + 1}</div>\n      <div style="display:flex;flex-direction:column;gap:2px;margin-bottom:6px;">\n        ${next.lines.map(l => `<div style="display:flex;justify-content:space-between;font-size:10.8px;"><span>${escapeHtml(l.label)} ×${fmt(l.qty)}</span><span style="font-family:'JetBrains Mono',monospace;">${fmt(l.flower)} ${FLOWER_ICON} FLOWER</span></div>`).join("")}\n      </div>\n      <div class="profit-banner">\n        <span class="plabel">Total to next level</span>\n        <span class="pvalue is-loss">${fmt(next.total)} ${FLOWER_ICON} FLOWER</span>\n      </div>\n      <div style="font-size:9px;color:var(--ink-soft);margin-top:5px;">One-time upgrade cost — not included in the Salt/day profit above.</div>` : `<div style="font-size:10.8px;color:var(--profit);font-weight:700;margin-top:8px;">🏆 Max Farm level reached (Level ${FARM_LEVEL_NODES.length})</div>`;
  })()}\n    </div>\n  </div>`;
}

function renderSculptureCard() {
  const eff = sculptureEffects();
  const next = computeSculptureNextCost();
  return `\n  <div class="card" data-search="sculpture">\n    <div class="card-toggle" style="cursor:default;">\n      <div class="card-name-row">\n        <span class="card-icon"><img src="data:image/webp;base64,UklGRn4BAABXRUJQVlA4THIBAAAvLsAIEEegKrIN6qZ48G2U0V0BYdRQEwAEw7t3/1ACURIADUMFFP4Eon+P6RFk21Rs9Ad7AOD/z0p93milUqEcze4BJGnb2yb/RCdIXTfYd/bE3y/YMtavYZv2hQMwmAM03duyBDeI6P8EiIhc3VbK4NXhxMITT7cDLWMJI6PLXLGKD5kDGc2CZWFGmhORKxyjAoqsAeZ5LyINvQIImWAAToxO5MCIQgOAQDq5IhVfqRg48UGuAHylSgB30jIi1T4HRncgv1LqSn9TOpK9lLry3/Q28FnRFXS1v72W8bOqe2V0DdDVPwGuIf/gTO+m5EcdufgfVp2H3muOvXZHsOLsj3xx7dyTLDqTfmGusRNJT4KkP9KTpKlrwpzkkYVHcmFwDWxHz4oXhVvC5ruasemFyFZtPhuPH2fj8XiM8fhxbKojkaUGVSAoABgQYLgUEdkCCsB62lOMestcKLmQ7BbVo9xyW7OWweW66GItpevSkWQB" style="width:16px;height:16px;vertical-align:-3px;image-rendering:pixelated;"></span>\n        <div>\n          <div class="card-name">Sculpture — Level ${eff.level}</div>\n          <div class="card-type">Unlocks cumulative Salt bonuses as you level it up</div>\n        </div>\n      </div>\n    </div>\n    <div class="card-details" style="display:block;max-height:none;padding-top:0;">\n      <div style="display:grid;grid-template-columns:1fr 130px;gap:6px 8px;align-items:center;margin:6px 0 8px;">\n        <label style="font-size:11.4px;color:var(--ink-soft);"><img src="data:image/webp;base64,UklGRn4BAABXRUJQVlA4THIBAAAvLsAIEEegKrIN6qZ48G2U0V0BYdRQEwAEw7t3/1ACURIADUMFFP4Eon+P6RFk21Rs9Ad7AOD/z0p93milUqEcze4BJGnb2yb/RCdIXTfYd/bE3y/YMtavYZv2hQMwmAM03duyBDeI6P8EiIhc3VbK4NXhxMITT7cDLWMJI6PLXLGKD5kDGc2CZWFGmhORKxyjAoqsAeZ5LyINvQIImWAAToxO5MCIQgOAQDq5IhVfqRg48UGuAHylSgB30jIi1T4HRncgv1LqSn9TOpK9lLry3/Q28FnRFXS1v72W8bOqe2V0DdDVPwGuIf/gTO+m5EcdufgfVp2H3muOvXZHsOLsj3xx7dyTLDqTfmGusRNJT4KkP9KTpKlrwpzkkYVHcmFwDWxHz4oXhVvC5ruasemFyFZtPhuPH2fj8XiM8fhxbKojkaUGVSAoABgQYLgUEdkCCsB62lOMestcKLmQ7BbVo9xyW7OWweW66GItpevSkWQB" style="width:11px;height:11px;vertical-align:-2px;image-rendering:pixelated;"> Sculpture level (0–${SCULPTURE_LEVELS.length})</label>\n        ${stepperHtml("sculptureLevelInput", eff.level, 0, SCULPTURE_LEVELS.length)}\n      </div>\n      <div style="display:flex;flex-direction:column;gap:3px;margin-bottom:8px;">\n        ${SCULPTURE_EFFECTS_LIST.map((e, i) => `<div style="font-size:10.8px;${i < eff.level ? "color:var(--profit);font-weight:700;" : "color:var(--ink-soft);opacity:.6;"}">${i < eff.level ? "✅" : "⬜"} Lv.${i + 1} — ${e}</div>`).join("")}\n      </div>\n      ${next ? `\n      <div class="lib-section-title" style="margin-top:0;">Cost to reach Level ${eff.level + 1}</div>\n      <div style="display:flex;flex-direction:column;gap:2px;margin-bottom:6px;">\n        ${next.lines.map(l => `<div style="display:flex;justify-content:space-between;font-size:10.8px;"><span>${escapeHtml(l.label)} ×${fmt(l.qty)}</span><span style="font-family:'JetBrains Mono',monospace;">${fmt(l.flower)} ${FLOWER_ICON} FLOWER</span></div>`).join("")}\n      </div>\n      <div class="profit-banner">\n        <span class="plabel">Total to next level</span>\n        <span class="pvalue is-loss">${fmt(next.total)} ${FLOWER_ICON} FLOWER</span>\n      </div>` : `<div style="font-size:10.8px;color:var(--profit);font-weight:700;">🏆 Max level reached (Level 6)</div>`}\n    </div>\n  </div>`;
}

function renderVegCard() {
  const saltMode = vegMaterialMode("Salt");
  const saltUnit = pickledVegSaltCostFlower();
  const vegActiveBoosts = typeof getActiveSaltBoosts === "function" ? getActiveSaltBoosts([ "fermentationSpiceGlobal" ]) : [];
  const rows = Object.keys(PICKLED_VEG_DATA).map(veg => {
    const entry = pickledVegCost(veg);
    if (!entry) return "";
    const cropTotal = entry.cropCostFlower * entry.rec.qty;
    const saltTotal = entry.saltCostFlower * entry.rec.salt;
    return `\n    <div class="calc-ingredient-row" style="flex-wrap:wrap;">\n      <span class="calc-ing-icon">${getIcon("Pickled " + veg)}</span>\n      <div class="calc-ing-main">\n        <div class="calc-ing-name">Pickled ${escapeHtml(veg)}</div>\n        <div class="calc-ing-meta" style="display:flex;align-items:center;gap:4px;flex-wrap:wrap;">\n          <span style="display:inline-flex;align-items:center;gap:2px;">${getIconSmall(veg)} ${fmt(entry.rec.qty)} ${escapeHtml(veg)} (${fmt(cropTotal)} ${FLOWER_ICON})</span>\n          <span>+</span>\n          <span style="display:inline-flex;align-items:center;gap:2px;">${getIconSmall("Salt")} ${entry.rec.salt} Salt (${fmt(saltTotal)} ${FLOWER_ICON} @ ${fmt(entry.saltCostFlower)}/u)</span>\n        </div>\n      </div>\n      <div style="text-align:right;flex-shrink:0;">\n        <div style="font-size:11.4px;font-weight:700;color:var(--loss);">${fmt(entry.cost)}</div>\n        <div style="font-size:9px;color:var(--ink-soft);">${FLOWER_ICON} FLOWER · Output ×${fmt(entry.output)}</div>\n      </div>\n      <div class="calc-ing-toggle" style="width:100%;justify-content:flex-end;margin-top:4px;">\n        <span style="font-size:8.4px;color:var(--ink-soft);font-weight:600;margin-right:2px;align-self:center;">${getIconSmall(veg)} ${escapeHtml(veg)}:</span>\n        <button type="button" class="calc-mode-btn veg-mode-btn" data-mat="${escapeHtml(veg)}" data-mode="collect" style="${entry.cropMode === "collect" ? "border-color:var(--profit);color:var(--profit);" : ""}">Collect</button>\n        <button type="button" class="calc-mode-btn veg-mode-btn" data-mat="${escapeHtml(veg)}" data-mode="buy" style="${entry.cropMode === "buy" ? "border-color:var(--flower);color:var(--flower);" : ""}">Buy</button>\n      </div>\n    </div>`;
  }).join("");
  return `\n  <div class="card" data-search="pickled vegs">\n    <div class="card-toggle" style="cursor:default;">\n      <div class="card-name-row">\n        <span class="card-icon">🥒</span>\n        <div>\n          <div class="card-name">Vegs</div>\n          <div class="card-type">Ingredient cost for every Bait &amp; Fertiliser below — live with Salt cost</div>\n        </div>\n      </div>\n    </div>\n    <div class="card-details" style="display:block;max-height:none;padding-top:0;">\n      <div class="calc-ing-toggle" style="width:100%;justify-content:flex-end;margin-bottom:6px;">\n        <span style="font-size:8.4px;color:var(--ink-soft);font-weight:600;margin-right:2px;align-self:center;">${getIconSmall("Salt")} Salt (applies to every Veg below):</span>\n        <button type="button" class="calc-mode-btn veg-mode-btn" data-mat="Salt" data-mode="collect" style="${saltMode === "collect" ? "border-color:var(--profit);color:var(--profit);" : ""}">Collect</button>\n        <button type="button" class="calc-mode-btn veg-mode-btn" data-mat="Salt" data-mode="buy" style="${saltMode === "buy" ? "border-color:var(--flower);color:var(--flower);" : ""}">Buy</button>\n      </div>\n      ${rows}\n      ${renderSaltBoostAppliedList(vegActiveBoosts)}\n      <div style="font-size:9px;color:var(--ink-soft);margin-top:8px;">Each Pickled Veg = raw crop × its qty + a flat 5 Salt. <b>Collect</b> prices an ingredient off what it costs to grow/rake elsewhere in the app (for Salt, that's the Salt Rake coin cost ÷ yield above); <b>Buy</b> prices it off the live 🛒 Marketplace price instead. Salt is currently costed at ${fmt(saltUnit)} ${FLOWER_ICON} FLOWER/unit (${saltMode}). Change any toggle, the Salt Rake cost, node count, or a crop's price, and these Vegs costs — plus every Bait/Fertiliser card below that uses them — update automatically.</div>\n    </div>\n  </div>`;
}

function renderBaitCard(name) {
  const fig = computeBaitFigures(name);
  const rec = BAIT_RECIPES[name];
  const isProfit = fig.profitPerUnitSelected >= 0;
  const fishListId = "fishList_" + name.replace(/\s+/g, "_");
  const vegListId = "vegList_" + name.replace(/\s+/g, "_");
  return `\n  <div class="card ${isProfit ? "is-profit" : "is-loss"}" data-search="${name.toLowerCase()}">\n    <div class="card-toggle" style="cursor:default;">\n      <div class="card-name-row">\n        <span class="card-icon">${getIcon(name)}</span>\n        <div>\n          <div class="card-name">${name}</div>\n          <div class="card-type">Using: ${getFishIcon(fig.fish.name, fig.isPrime)} ${escapeHtml(fig.fish.name)} (${fmt(fig.fishEffectiveSalt)} Salt) + ${fig.veg ? escapeHtml(fig.veg.veg) : "?"}</div>\n        </div>\n      </div>\n      <div class="card-collapsed-profit">\n        ${fig.activeBoosts && fig.activeBoosts.length ? `<span class="boost-badge">⚡${fig.activeBoosts.length}</span>` : ""}\n      </div>\n    </div>\n    <div class="card-details" style="display:block;max-height:none;padding-top:0;">\n      <div style="display:flex;gap:6px;margin:6px 0 8px;">\n        <button type="button" class="mode-btn bait-quality-btn" data-bait="${escapeHtml(name)}" data-quality="aged" style="flex:1;padding:5px;font-size:10.8px;border-radius:6px;border:1.5px solid var(--line);cursor:pointer;background:${!fig.isPrime ? "var(--profit)" : "transparent"};color:${!fig.isPrime ? "#fff" : "var(--ink)"};">🥈 Aged ×${fig.outputAgedBoosted}</button>\n        <button type="button" class="mode-btn bait-quality-btn" data-bait="${escapeHtml(name)}" data-quality="prime" style="flex:1;padding:5px;font-size:10.8px;border-radius:6px;border:1.5px solid var(--line);cursor:pointer;background:${fig.isPrime ? "var(--profit)" : "transparent"};color:${fig.isPrime ? "#fff" : "var(--ink)"};">🥇 Prime ×${fig.outputPrimeBoosted}</button>\n      </div>\n      <div style="font-size:9px;color:var(--ink-soft);margin:-2px 0 8px;">Prime is a ${fmt(fig.primeChancePct)}% bonus-chance on the same recipe (same Salt cost) — it doesn't change what you spend, only how many bait you might get back. The toggle below just shows the math for a guaranteed Aged batch vs. a guaranteed Prime batch.</div>\n      ${typeof cookingGuaranteedCatchOn !== "undefined" && cookingGuaranteedCatchOn ? `<div style="font-size:9px;color:var(--ink-soft);margin:-6px 0 8px;">🎯 Guaranteed Catch is on (set in 🍳 Cooking → Basic Fish) — fish cost above uses the Fish Market recipe cost instead of Rod + Bait + Chum.</div>` : ``}\n\n      <div style="margin-bottom:8px;">\n        <label style="font-size:10.2px;color:var(--ink-soft);display:block;margin-bottom:3px;">🐟 Fish (choose ingredient)</label>\n        <button type="button" class="pixel-select-btn" id="${fishListId}" data-bait="${escapeHtml(name)}" data-role="fish">\n          <span class="psb-label">${getFishIcon(fig.fish.name, fig.isPrime)} ${escapeHtml(fig.fish.name)} — ${fmt(fig.fishEffectiveSalt)} Salt (${fmt(fig.fishCost)} ${FLOWER_ICON} FLOWER)</span>\n          <span class="psb-chevron">▼</span>\n        </button>\n      </div>\n      <div style="margin-bottom:8px;">\n        <label style="font-size:10.2px;color:var(--ink-soft);display:block;margin-bottom:3px;">🥒 Pickled Veg (choose ingredient)</label>\n        <button type="button" class="pixel-select-btn" id="${vegListId}" data-bait="${escapeHtml(name)}" data-role="veg">\n          <span class="psb-label">Pickled ${fig.veg ? escapeHtml(fig.veg.veg) : "?"} — ${fmt(fig.veg ? fig.veg.cost : 0)} ${FLOWER_ICON} FLOWER</span>\n          <span class="psb-chevron">▼</span>\n        </button>\n      </div>\n\n      <div class="card-grid">\n        <div class="stat"><span class="label">Fish Salt cost</span><span class="value">${fmt(fig.fishCost)} ${FLOWER_ICON} FLOWER</span></div>\n        <div class="stat"><span class="label">Pickled Veg cost</span><span class="value">${fmt(fig.veg ? fig.veg.cost : 0)} ${FLOWER_ICON} FLOWER</span></div>\n        <div class="stat"><span class="label">Total recipe cost</span><span class="value">${fmt(fig.totalCost)} ${FLOWER_ICON} FLOWER</span></div>\n        <div class="stat"><span class="label">Output (${fig.isPrime ? "Prime" : "Aged"})</span><span class="value">×${fig.outputSelected}</span></div>\n        <div class="stat"><span class="label">Cost/unit (${fig.isPrime ? "Prime" : "Aged"})</span><span class="value">${fmt(fig.unitCostSelected)} ${FLOWER_ICON} FLOWER</span></div>\n        <div class="stat"><span class="label">Sell (market)</span><span class="value">${fmt(fig.sellFlower)} ${FLOWER_ICON} FLOWER</span></div>\n        <div class="stat"><span class="label">Prime chance</span><span class="value">${fmt(fig.primeChancePct)}%</span></div>\n        <div class="stat"><span class="label">Cost/unit (expected blend)</span><span class="value">${fmt(fig.unitCostExpected)} ${FLOWER_ICON} FLOWER</span></div>\n      </div>\n      ${render24hTotalsGrid(fig.totalCost, fig.outputSelected * fig.sellFlower, fig.outputSelected * fig.sellFlower * (1 - feePercent / 100), fig.outputSelected * fig.sellFlower * (1 - feePercent / 100) - fig.totalCost, {
    title: `Totals — per batch (${fig.isPrime ? "Prime" : "Aged"})`,
    totalYield: fig.outputSelected,
    yieldLabel: name
  })}\n      ${renderSaltBoostAppliedList(fig.activeBoosts)}\n      <div class="profit-banner">\n        <span class="plabel">Profit/unit (${fig.isPrime ? "Prime" : "Aged"})</span>\n        <span class="pvalue ${isProfit ? "is-profit" : "is-loss"}">${isProfit ? "+" : ""}${fmt(fig.profitPerUnitSelected)} ${FLOWER_ICON} FLOWER</span>\n      </div>\n      <div style="font-size:9px;color:var(--ink-soft);margin-top:5px;">Defaults to the cheapest fish &amp; cheapest Pickled Veg in this bait's tier — the wiki-recommended play — but you can pick any ingredient above to price out what you actually have. Edit ${escapeHtml(name)}'s sell price in 🛒 Marketplace Prices.</div>\n    </div>\n  </div>`;
}

function renderFertCard(name) {
  const fig = computeFertilizerFigures(name);
  const rec = SALT_FERTILIZER_DATA[name];
  const vegListId = "fertVegList_" + name.replace(/\s+/g, "_");
  return `\n  <div class="card" data-search="${name.toLowerCase()}">\n    <div class="card-toggle" style="cursor:default;">\n      <div class="card-name-row">\n        <span class="card-icon">${getIcon(name)}</span>\n        <div>\n          <div class="card-name">${name} ${fig.applied ? '<span style="font-size:9.6px;color:var(--profit);font-weight:700;">● APPLYING</span>' : ""}</div>\n          <div class="card-type">${escapeHtml(fig.effect)}</div>\n        </div>\n      </div>\n    </div>\n    <div class="card-details" style="display:block;max-height:none;padding-top:0;">\n      ${rec.vegOptions ? `\n      <div style="margin-bottom:8px;">\n        <label style="font-size:10.2px;color:var(--ink-soft);display:block;margin-bottom:3px;">🥒 Pickled Veg (choose ingredient)</label>\n        <button type="button" class="pixel-select-btn" id="${vegListId}" data-fert="${escapeHtml(name)}" data-role="fertveg">\n          <span class="psb-label">Pickled ${fig.note ? escapeHtml(fig.note) : "?"} — ${fmt((fig.vegOptionsList.find(v => v.isSelected) || {}).cost || 0)} ${FLOWER_ICON} FLOWER</span>\n          <span class="psb-chevron">▼</span>\n        </button>\n      </div>` : ""}\n      <div class="card-grid">\n        <div class="stat"><span class="label">Recipe cost (×${fmt(fig.output)})</span><span class="value">${fmt(fig.cost)} ${FLOWER_ICON} FLOWER</span></div>\n        <div class="stat"><span class="label">Output</span><span class="value">×${fmt(fig.output)}</span></div>\n        <div class="stat"><span class="label">Cost/unit</span><span class="value">${fmt(fig.unitCost)} ${FLOWER_ICON} FLOWER</span></div>\n      </div>\n      ${renderSaltBoostAppliedList(fig.activeBoosts)}\n      <div style="margin-top:8px;">\n        <button type="button" class="btn ${fig.applied ? "btn-outline" : ""}" data-boost-id="apply_${name.toLowerCase().replace(/\s+/g, "_")}" style="width:100%;padding:7px;font-size:11.4px;border-radius:8px;cursor:pointer;${fig.applied ? "" : "background:var(--profit);color:#fff;border:none;"}">${fig.applied ? "⬜ Turn off in Composter" : "✅ Apply (turns off classic fertiliser)"}</button>\n      </div>\n      <div style="font-size:9px;color:var(--ink-soft);margin-top:5px;">Not tradable — manage on/off in 🪱 Composter → ⚡ Boost Settings, or tap above.</div>\n    </div>\n  </div>`;
}

function renderSpiceCard(name) {
  const fig = computeSpiceFigures(name);
  const ingredientRows = (fig.ingredients || []).map(ing => {
    const toggle = ing.hasToggle ? `\n      <div class="calc-ing-toggle" style="width:100%;justify-content:flex-end;margin-top:4px;">\n        <button type="button" class="calc-mode-btn spice-mode-btn" data-mat="${escapeHtml(ing.name)}" data-mode="collect" style="${ing.mode === "collect" ? "border-color:var(--profit);color:var(--profit);" : ""}">Owned</button>\n        <button type="button" class="calc-mode-btn spice-mode-btn" data-mat="${escapeHtml(ing.name)}" data-mode="buy" style="${ing.mode === "buy" ? "border-color:var(--flower);color:var(--flower);" : ""}">Buy</button>\n      </div>` : "";
    return `\n    <div class="calc-ingredient-row" style="flex-wrap:wrap;">\n      <span class="calc-ing-icon">${getIcon(ing.name)}</span>\n      <div class="calc-ing-main">\n        <div class="calc-ing-name">${escapeHtml(ing.name)} <span style="color:var(--ink-soft);font-weight:500;">×${fmt(ing.qty)}</span></div>\n        <div class="calc-ing-meta">${ing.hasToggle ? ing.mode === "collect" ? "Owned" : "Buy" : "Recipe"} @ ${fmt(ing.unitCostFlower)} ${FLOWER_ICON} FLOWER/u</div>\n      </div>\n      <div style="text-align:right;flex-shrink:0;">\n        <div style="font-size:11.4px;font-weight:700;color:var(--loss);">${fmt(ing.cost)}</div>\n        <div style="font-size:9px;color:var(--ink-soft);">${fmt(ing.unitCostFlower)}</div>\n      </div>\n      ${toggle}\n    </div>`;
  }).join("");
  return `\n  <div class="card" data-search="${name.toLowerCase()}">\n    <div class="card-toggle" style="cursor:default;">\n      <div class="card-name-row">\n        <span class="card-icon">${getIcon(name)}</span>\n        <div>\n          <div class="card-name">${name}</div>\n          <div class="card-type">${fmt(fig.unitCost)} ${FLOWER_ICON} FLOWER cost / unit · not tradable</div>\n        </div>\n      </div>\n      <div class="card-collapsed-profit">\n        ${fig.activeBoosts && fig.activeBoosts.length ? `<span class="boost-badge">⚡${fig.activeBoosts.length}</span>` : ""}\n      </div>\n    </div>\n    <div class="card-details" style="display:block;max-height:none;padding-top:0;">\n      <div class="card-grid">\n        <div class="stat"><span class="label">Output</span><span class="value">×${fig.output}</span></div>\n        <div class="stat"><span class="label">Recipe cost</span><span class="value">${fmt(fig.cost)} ${FLOWER_ICON} FLOWER</span></div>\n      </div>\n      <div style="margin-top:8px;">${ingredientRows}</div>\n      ${renderSaltBoostAppliedList(fig.activeBoosts)}\n    </div>\n  </div>`;
}

export function renderSaltList() {
  invalidateCostCache();
  loadBaseSaltMarketIfNeeded();
  const farmWrap = $("saltFarmCardWrap");
  const sculptWrap = $("saltSculptureCardWrap");
  const vegWrap = $("saltVegCardWrap");
  const baitWrap = $("saltBaitCardWrap");
  const fertWrap = $("saltFertCardWrap");
  const spiceWrap = $("saltSpiceCardWrap");
  if (!farmWrap) return;
  const panelRoot = $("saltBody") || $("saltPanel") || document;
  farmWrap.innerHTML = renderSaltFarmCard();
  __markSub("    renderSaltList: farm card");
  sculptWrap.innerHTML = renderSculptureCard();
  __markSub("    renderSaltList: sculpture card");
  if (vegWrap) vegWrap.innerHTML = renderVegCard();
  __markSub("    renderSaltList: veg card");
  baitWrap.innerHTML = Object.keys(BAIT_RECIPES).map(renderBaitCard).join("");
  __markSub("    renderSaltList: bait cards (n=" + Object.keys(BAIT_RECIPES).length + ")");
  fertWrap.innerHTML = Object.keys(SALT_FERTILIZER_DATA).map(renderFertCard).join("");
  __markSub("    renderSaltList: fert cards");
  spiceWrap.innerHTML = Object.keys(SPICE_RECIPES).map(renderSpiceCard).join("");
  __markSub("    renderSaltList: spice cards");
  panelRoot.querySelectorAll('.stepper-btn[data-stepper-id="saltNodeInput"]').forEach(btn => {
    btn.onclick = () => {
      const dir = parseFloat(btn.dataset.dir) || 0;
      const next = Math.max(0, Math.min(farmLevelMaxNodes(), getNodeCount("Salt") + dir));
      setNodeCount("Salt", next);
      renderSaltList();
      if (typeof renderPlotNodeInputs === "function") renderPlotNodeInputs();
    };
  });
  panelRoot.querySelectorAll('.stepper-btn[data-stepper-id="farmLevelInput"]').forEach(btn => {
    btn.onclick = () => {
      const dir = parseFloat(btn.dataset.dir) || 0;
      const next = Math.max(1, Math.min(FARM_LEVEL_NODES.length, saltFarmLevel + dir));
      setSaltFarmLevel(next);
      renderSaltList();
      if (typeof renderPlotNodeInputs === "function") renderPlotNodeInputs();
    };
  });
  panelRoot.querySelectorAll('.stepper-btn[data-stepper-id="sculptureLevelInput"]').forEach(btn => {
    btn.onclick = () => {
      const dir = parseFloat(btn.dataset.dir) || 0;
      const next = Math.max(0, Math.min(SCULPTURE_LEVELS.length, saltSculptureLevel + dir));
      setSculptureLevel(next);
      renderSaltList();
      renderMarketList();
    };
  });
  panelRoot.querySelectorAll(".bait-quality-btn").forEach(btn => {
    btn.onclick = () => {
      saltUiSet(btn.dataset.bait + "_prime", btn.dataset.quality === "prime");
      renderSaltList();
    };
  });
  panelRoot.querySelectorAll('.pixel-select-btn[data-role="fish"]').forEach(btn => {
    btn.onclick = () => {
      const baitName = btn.dataset.bait;
      const fig = computeBaitFigures(baitName);
      const options = fig.fishOptions.map(f => ({
        value: f.name,
        name: `${getFishIcon(f.name, fig.isPrime)} ${escapeHtml(f.name)}`,
        meta: `${f.salt} Salt · ${fmt(f.cost)} ${FLOWER_ICON} FLOWER`,
        badge: f.isCheapest ? "cheapest" : null
      }));
      openPixelPicker("🐟 CHOOSE FISH", options, fig.fish.name, val => {
        saltUiSet(baitName + "_fish", val);
        renderSaltList();
      });
    };
  });
  panelRoot.querySelectorAll('.pixel-select-btn[data-role="veg"]').forEach(btn => {
    btn.onclick = () => {
      const baitName = btn.dataset.bait;
      const fig = computeBaitFigures(baitName);
      const options = fig.vegOptionsList.map(v => ({
        value: v.name,
        name: `${getIcon("Pickled " + v.name)} Pickled ${escapeHtml(v.name)}`,
        meta: `${fmt(v.cost)} ${FLOWER_ICON} FLOWER`,
        badge: v.isCheapest ? "cheapest" : null
      }));
      openPixelPicker("🥒 CHOOSE VEG", options, fig.veg ? fig.veg.veg : null, val => {
        saltUiSet(baitName + "_veg", val);
        renderSaltList();
      });
    };
  });
  panelRoot.querySelectorAll('.pixel-select-btn[data-role="fertveg"]').forEach(btn => {
    btn.onclick = () => {
      const fertName = btn.dataset.fert;
      const fig = computeFertilizerFigures(fertName);
      const options = fig.vegOptionsList.map(v => ({
        value: v.name,
        name: `${getIcon("Pickled " + v.name)} Pickled ${escapeHtml(v.name)}`,
        meta: `${fmt(v.cost)} ${FLOWER_ICON} FLOWER`,
        badge: v.isCheapest ? "cheapest" : null
      }));
      openPixelPicker("🥒 CHOOSE VEG", options, fig.note || null, val => {
        saltUiSet(fertName + "_veg", val);
        renderSaltList();
      });
    };
  });
  fertWrap.querySelectorAll("[data-boost-id]").forEach(el => {
    el.onclick = () => {
      toggleBoost(el.dataset.boostId);
      renderSaltList();
    };
  });
  panelRoot.querySelectorAll(".spice-mode-btn").forEach(btn => {
    btn.onclick = () => {
      setSpiceMaterialMode(btn.dataset.mat, btn.dataset.mode);
      renderSaltList();
    };
  });
  panelRoot.querySelectorAll(".veg-mode-btn").forEach(btn => {
    btn.onclick = () => {
      setVegMaterialMode(btn.dataset.mat, btn.dataset.mode);
      renderSaltList();
    };
  });
  __markSub("    renderSaltList: listeners wired");
  renderMarketList();
  __markSub("    renderSaltList: renderMarketList");
  if (typeof renderCookingPanel === "function") renderCookingPanel();
  __markSub("    renderSaltList: renderCookingPanel");
}

setTimeout(renderFarmPanelInfo, 0);

(function() {
  const btn = document.getElementById("footerCopyAddressBtn");
  const addr = document.getElementById("footerDonateAddress");
  if (!btn || !addr) return;
  btn.addEventListener("click", async () => {
    const text = addr.textContent.trim();
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(text);
      } else {
        const ta = document.createElement("textarea");
        ta.value = text;
        ta.style.position = "fixed";
        ta.style.opacity = "0";
        document.body.appendChild(ta);
        ta.select();
        document.execCommand("copy");
        document.body.removeChild(ta);
      }
      const original = btn.textContent;
      btn.textContent = "✅";
      btn.classList.add("copied");
      setTimeout(() => {
        btn.textContent = original;
        btn.classList.remove("copied");
      }, 1500);
    } catch (e) {}
  });
})();

export function cookFoodIcon(name) {
  const imgSrc = COOKING_FOOD_IMAGES[name];
  if (imgSrc) return `<img src="${imgSrc}" alt="${escapeHtml(name)}" style="width:16px;height:16px;image-rendering:pixelated;vertical-align:middle;">`;
  return `<span style="font-size:19.2px;line-height:1;">${COOKING_FOOD_EMOJI[name] || "🍽️"}</span>`;
}

function cookingIngredientIcon(name) {
  return cookingFindRecipeForFood(name) ? cookFoodIcon(name) : getIcon(name);
}

function renderFactionPetHeader() {
  const wrap = $("factionPetSection");
  if (!wrap) return;
  const info = farmPanelGetLastInfo();
  const isMember = info.factionIsMember;
  const factionName = info.factionName;
  const hasPetData = info.factionHasPetData;
  const petLabel = isMember && factionName && FACTION_DISPLAY_NAMES[factionName] ? FACTION_DISPLAY_NAMES[factionName] : "No Faction Pet";
  const iconHtml = isMember && factionName && FACTION_PET_HAPPY_ICONS[factionName] ? `<img src="${FACTION_PET_HAPPY_ICONS[factionName]}" alt="${escapeHtml(petLabel)}">` : `<span class="fp-icon-unknown">❓</span>`;
  const goalXP = hasPetData ? info.factionGoalXP : 0;
  const totalXP = hasPetData ? info.factionTotalXP : 0;
  const pct = goalXP > 0 ? Math.min(100, totalXP / goalXP * 100) : 0;
  const barCaption = hasPetData ? `${fmt(totalXP)} / ${fmt(goalXP)} XP` : `No sync data yet`;
  const streak = factionPetGetEffectiveStreak();
  const tier = factionPetGetActiveTier(streak);
  const applies = factionPetShouldApplyBoost();
  const boostPct = tier && applies ? Math.round(tier.boost * 100) : 0;
  const boostBadgeInner = id => boostPct > 0 ? `<span class="fp-boost-badge" id="${id}">+${boostPct}% XP</span>` : `<span class="fp-boost-badge none" id="${id}">No boost</span>`;
  let statusHtml = "";
  if (factionPetManualMode) {
    statusHtml = `<div class="fp-status-msg is-good">Manual mode ON — boost is applied regardless of faction or contributor status.</div>`;
  } else if (!isMember) {
    statusHtml = `<div class="fp-status-msg">You are not a member of any faction. You can visit the plaza and choose your faction to get XP boost from the faction pet.</div>`;
  } else if (hasPetData && boostPct > 0) {
    statusHtml = `<div class="fp-status-msg is-good">+${boostPct}% XP boost active this week, earned from last week's streak.</div>`;
  } else if (hasPetData && !info.factionIsContributing) {
    statusHtml = `<div class="fp-status-msg is-warn">Not a contributor this week. Feed your faction pet daily to build a streak toward next week's boost.</div>`;
  } else if (hasPetData && info.factionIsContributing) {
    statusHtml = `<div class="fp-status-msg is-good">Contributing member this week — building toward next week's boost.</div>`;
  } else {
    statusHtml = `<div class="fp-status-msg">Sync your farm to detect this week's faction pet contribution status.</div>`;
  }
  const tiersHtml = FACTION_PET_BOOST_TIERS.map(t => {
    const isActive = tier === t;
    return `\n      <div class="fp-boost-tier${isActive ? " active" : ""}">\n        <span class="fp-tier-check">${isActive ? "✓" : ""}</span>\n        <span>Week ${t.streak} streak achieved = +${Math.round(t.boost * 100)}% XP during ${t.weeksNote}</span>\n      </div>\n    `;
  }).join("");
  wrap.innerHTML = `\n    <div class="fp-title-bar">\n      <span>🐾 Faction Pet</span>\n    </div>\n    <label class="betty-boost-row fp-manual-card" id="fpManualToggleRow">\n      <div class="betty-boost-row-main"><div class="betty-boost-row-name">Manual Faction Bonus EXP</div></div>\n      <span class="bg-sim-check"><input type="checkbox" id="fpManualToggleInput" aria-label="Manual Faction Bonus EXP" ${factionPetManualMode ? "checked" : ""}></span>\n    </label>\n    <div class="fp-card">\n      <div class="fp-top-row${fpBoostPanelOpen ? " open" : ""}" id="fpTopRow">\n        <div class="fp-icon-frame">${iconHtml}</div>\n        <div class="fp-name-col">\n          <div class="fp-name">${escapeHtml(petLabel)}</div>\n          <div class="fp-name-sub">Faction Pet</div>\n        </div>\n        ${boostBadgeInner("fpBoostBadgeTop")}\n        <span class="fp-chev">▾</span>\n      </div>\n      <div class="fp-progress-wrap">\n        <div class="fp-bar-track"><div class="fp-bar-fill" style="width:${pct}%;"></div></div>\n        <div class="fp-bar-caption"><span>${barCaption}</span><span id="fpBarStreakText">${streak > 0 ? `🔥 Streak ${streak}` : ""}</span></div>\n      </div>\n      ${statusHtml}\n      <div class="fp-streak-row">\n        <label for="fpStreakInput">Week Streak</label>\n        <input type="number" min="0" step="1" id="fpStreakInput" value="${streak}">\n        ${boostBadgeInner("fpBoostBadgeStreak")}\n      </div>\n      <div class="fp-boost-panel${fpBoostPanelOpen ? " open" : ""}" id="fpBoostPanel">\n        <div class="fp-boost-panel-title">⚡ Streak boost tiers</div>\n        <div id="fpTiersList">${tiersHtml}</div>\n        <div class="fp-boost-note">Beyond week 8, the pet still needs its weekly goal met to keep the streak bonus alive. If the goal isn't met by the end of the week, the streak resets and the pet sleeps for a week.</div>\n      </div>\n    </div>\n  `;
  const topRow = $("fpTopRow");
  if (topRow) {
    topRow.onclick = e => {
      if (e.target && e.target.id === "fpStreakInput") return;
      __set_fpBoostPanelOpen(!fpBoostPanelOpen);
      renderFactionPetHeader();
    };
  }
  const streakInput = $("fpStreakInput");
  if (streakInput) {
    streakInput.onclick = e => e.stopPropagation();
    streakInput.oninput = () => {
      factionPetSetManualStreak(streakInput.value);
      if (typeof invalidateCostCache === "function") invalidateCostCache();
      factionPetUpdateBoostUI();
      renderCookingHeader();
      if (typeof renderCookingFoodList === "function") renderCookingFoodList();
    };
  }
  const manualToggleRow = $("fpManualToggleRow");
  const manualToggleInput = $("fpManualToggleInput");
  if (manualToggleRow && manualToggleInput) {
    manualToggleRow.onclick = e => e.stopPropagation();
    manualToggleInput.onchange = () => {
      setFactionPetManualMode(manualToggleInput.checked);
      if (typeof invalidateCostCache === "function") invalidateCostCache();
      renderFactionPetHeader();
      renderCookingHeader();
      if (typeof renderCookingFoodList === "function") renderCookingFoodList();
    };
  }
}

function renderCookingHeader() {
  const wrap = $("cookHeader");
  if (!wrap) return;
  let experience = 0;
  let syncedAscensionLevel = 0;
  try {
    const info = typeof farmPanelGetLastInfo === "function" ? farmPanelGetLastInfo() : null;
    if (info) syncedAscensionLevel = info.ascensionLevel || 0;
    if (farmPanelGameState && typeof farmSyncExtractGameState === "function") {
      const g = farmSyncExtractGameState(farmPanelGameState);
      experience = g && g.bumpkin && Number(g.bumpkin.experience) || 0;
    }
  } catch (e) {}
  const cur = cookGetLevelInfo(experience);
  const {totalExpAdded: totalExpAdded, totalCostCoins: totalCostCoins, xpByCategory: xpByCategory} = cookingComputeTotals();
  const preview = cookGetLevelInfo(experience + totalExpAdded);
  const curPct = cur.span > 0 ? Math.min(100, cur.progress / cur.span * 100) : 100;
  const previewExtra = cur.isMax ? 0 : Math.min(cur.span - cur.progress, Math.max(0, totalExpAdded));
  const previewPct = cur.span > 0 ? Math.min(100, (cur.progress + previewExtra) / cur.span * 100) : 100;
  const flowerCost = typeof coinsToFlower === "function" ? coinsToFlower(totalCostCoins) : 0;
  const projectedLevelHtml = preview.level > cur.level ? `\n    <div class="cook-projected-box">\n      <div class="cook-projected-chip">\n        <div class="cook-projected-label">Projected Level</div>\n        <div class="cook-projected-label-sub">of the Total added EXP</div>\n      </div>\n      <div class="cook-projected-chip">\n        <div class="cook-projected-level">→ Level ${preview.level}!</div>\n      </div>\n      ${preview.isMax ? "" : `<div class="cook-projected-chip">\n        <div class="cook-projected-next">${fmt(preview.progress)}/${fmt(preview.span)} EXP to Level ${preview.level + 1}</div>\n      </div>`}\n    </div>` : "";
  const willCrossAscensionCap = cur.level >= PRE_ASCENSION_MAX_LEVEL || preview.level >= PRE_ASCENSION_MAX_LEVEL;
  let ascensionHtml = "";
  if (syncedAscensionLevel > 0 || willCrossAscensionCap) {
    const ascCur = syncedAscensionLevel > 0 ? getAscensionLevelInfo(experience, syncedAscensionLevel) : resolveAscensionLevelInfo(experience);
    const ascPreview = syncedAscensionLevel > 0 ? getAscensionLevelInfo(experience + totalExpAdded, syncedAscensionLevel) : resolveAscensionLevelInfo(experience + totalExpAdded);
    const ascCurPct = ascCur.experienceToNextLevel > 0 ? Math.min(100, ascCur.currentExperienceProgress / ascCur.experienceToNextLevel * 100) : 100;
    const ascPreviewExtra = ascCur.isReadyToAscend ? 0 : Math.min(Math.max(0, ascCur.experienceToNextLevel - ascCur.currentExperienceProgress), Math.max(0, totalExpAdded));
    const ascPreviewPct = ascCur.experienceToNextLevel > 0 ? Math.min(100, (ascCur.currentExperienceProgress + ascPreviewExtra) / ascCur.experienceToNextLevel * 100) : 100;
    const ascLevelUpNote = ascPreview.ascension > ascCur.ascension ? ` <span class="cook-levelup-pill">→ Ascension [${ascPreview.ascension}] Lv ${ascPreview.level}!</span>` : ascPreview.level > ascCur.level ? ` <span class="cook-levelup-pill">→ Level ${ascPreview.level}!</span>` : "";
    const projectedTag = syncedAscensionLevel > 0 ? "" : ` <span class="cook-ascension-projected">(projected — not ascended yet)</span>`;
    let projectedAscensionHtml = "";
    if (syncedAscensionLevel > 0 && ascCur.isReadyToAscend) {
      const trueAsc = resolveAscensionLevelInfo(experience);
      if (trueAsc.ascension > ascCur.ascension || trueAsc.level > ascCur.level) {
        const trueCaption = trueAsc.isReadyToAscend ? "Ready to Ascend" : `${fmt(trueAsc.currentExperienceProgress)} / ${fmt(trueAsc.experienceToNextLevel)} EXP to next level`;
        projectedAscensionHtml = `\n    <div class="cook-ascension-projected-row">\n      <span class="cook-ascension-projected-badge">PROJECTED Ascension Level [${trueAsc.ascension}] · Lv ${trueAsc.level}</span>\n      <span class="cook-ascension-projected-caption">${trueCaption}</span>\n    </div>\n  `;
      }
    }
    ascensionHtml = `\n    <div class="cook-ascension-row">\n      <span class="cook-ascension-badge">Ascension [${ascCur.ascension}] · Lv ${ascCur.level}${ascCur.isReadyToAscend ? " ✅ Ready" : ""}</span>${projectedTag}\n    </div>\n    <div class="cook-bar-stack">\n      <div class="cook-bar-track">\n        <div class="cook-bar-fill preview" style="width:${ascPreviewPct}%;"></div>\n        <div class="cook-bar-fill" style="width:${ascCurPct}%;"></div>\n      </div>\n    </div>\n    <div class="cook-bar-caption">${ascCur.isReadyToAscend ? "Ready to Ascend" : `${fmt(ascCur.currentExperienceProgress)} / ${fmt(ascCur.experienceToNextLevel)} EXP to Ascension [${ascCur.ascension}] Lv ${ascCur.level + 1}${ascLevelUpNote}`}</div>${projectedAscensionHtml}\n  `;
  }
  const xpBreakdownRows = [ "Basic Fish", "Aged Fish", "Prime Aged Fish", "Bakery", "Deli", "Kitchen", "Smoothie Shack", "Fire Pit" ].map(cat => `<div class="cook-xp-breakdown-row"><span>${escapeHtml(cat)}</span><b>${fmt(xpByCategory[cat] || 0)} EXP</b></div>`).join("");
  wrap.innerHTML = `\n    <div class="cook-header-row">\n      <span class="cook-level-badge"><span class="cook-level-badge-title">Bumpkin</span><span class="cook-level-badge-value">🧑‍🌾 Level ${cur.level}${cur.isMax ? " MAX" : ""}</span></span>\n      <span class="cook-exp-label">${fmt(experience)} EXP</span>\n    </div>\n    <div class="cook-bar-stack">\n      <div class="cook-bar-track">\n        <div class="cook-bar-fill preview" style="width:${previewPct}%;"></div>\n        <div class="cook-bar-fill" style="width:${curPct}%;"></div>\n      </div>\n    </div>\n    <div class="cook-bar-caption">${cur.isMax ? "Max level reached" : `${fmt(cur.progress)} / ${fmt(cur.span)} EXP to Level ${cur.level + 1}`}</div>\n    ${projectedLevelHtml}\n    ${ascensionHtml}\n    <div class="cook-total-row">\n      <span>Total EXP added: <b>${fmt(totalExpAdded)}</b></span>\n      <span>Total cost: <b>${fmt(flowerCost)} ${typeof FLOWER_ICON !== "undefined" ? FLOWER_ICON : "FLOWER"}</b></span>\n      <div class="cook-xp-breakdown">${xpBreakdownRows}</div>\n    </div>\n  `;
}

function renderCookingModeToggle() {
  const wrap = $("cookModeToggle");
  if (!wrap) return;
  wrap.querySelectorAll("button").forEach(btn => {
    btn.classList.toggle("active", btn.dataset.mode === cookingCostMode);
  });
}

function renderCookingBuildingTabs() {
  const wrap = $("cookBuildingTabs");
  if (!wrap) return;
  wrap.innerHTML = COOKING_BUILDINGS.map(b => `\n    <button type="button" class="${!cookingFishCategory && b === cookingActiveBuilding ? "active" : ""}" data-building="${escapeHtml(b)}">\n      ${COOKING_BUILDING_ICONS[b] || ""} ${escapeHtml(b)}\n    </button>\n  `).join("");
  wrap.querySelectorAll("button").forEach(btn => {
    btn.onclick = () => {
      setCookingActiveBuilding(btn.dataset.building);
      setCookingFishCategory("");
      renderCookingFishTabs();
      renderCookingBuildingTabs();
      renderCookingFoodList();
    };
  });
}

function renderCookTotalCostLine(totalFlower, iconHtml, modeLabel, extraClass, unitCount) {
  const flowerIcon = typeof FLOWER_ICON !== "undefined" ? FLOWER_ICON : "FLOWER";
  const modeHtml = modeLabel ? `<span class="cook-total-cost-mode">(${modeLabel})</span>` : "";
  const count = unitCount || 1;
  return `\n      <div class="cook-food-cost-line cook-total-cost-line${extraClass ? ` ${extraClass}` : ""}">\n        <span class="cook-total-cost-label">Total Cost for ${fmt(count)}× ${iconHtml}</span>\n        <span class="cook-total-cost-value">${fmt(totalFlower)}${flowerIcon}${modeHtml}</span>\n      </div>`;
}

function renderCookTotalCostForCountLine(totalFlower, effectiveCount, iconHtml, hidden) {
  const flowerIcon = typeof FLOWER_ICON !== "undefined" ? FLOWER_ICON : "FLOWER";
  return `\n      <div class="cook-food-cost-line cook-total-cost-line cook-food-count-total-line"${hidden ? ' style="display:none;"' : ""}>\n        <span class="cook-total-cost-label">Total Cost for ${fmt(effectiveCount)}× ${iconHtml}</span>\n        <span class="cook-total-cost-value">${fmt(totalFlower * effectiveCount)}${flowerIcon}</span>\n      </div>`;
}

function renderCookTotalExpLine(expPerUnit, effectiveCount, iconHtml) {
  return `\n      <div class="cook-food-cost-line cook-total-cost-line cook-total-exp-line">\n        <span class="cook-total-cost-label">Total EXP for ${fmt(effectiveCount)}× ${iconHtml}</span>\n        <span class="cook-total-cost-value">${fmt(expPerUnit * effectiveCount)} EXP</span>\n      </div>`;
}

function renderCookYieldLine(yieldCount, iconHtml) {
  return `\n      <div class="cook-food-cost-line cook-yield-line">\n        <span class="cook-total-cost-label">Yield</span>\n        <span class="cook-total-cost-value">${fmt(yieldCount)}× ${iconHtml}</span>\n      </div>`;
}

function renderCookingFoodCard(building, name) {
  const rec = COOKING_RECIPES[building][name];
  const {exp: boostedExp, boostsUsed: boostsUsed} = cookingComputeFoodExp(building, name);
  const isBoosted = Math.abs(boostedExp - rec.exp) > 1e-9;
  const count = getCookingCount(name);
  const isExpanded = cookingExpandedFoods.has(name);
  const {time: boostedTime, boostsUsed: timeBoostsUsed, baseTime: baseTime} = cookingComputeFoodTime(building, name);
  const isTimeBoosted = baseTime != null && Math.abs(boostedTime - baseTime) > 1e-9;
  const timeDisplay = baseTime == null ? "⏱ time unknown" : `⏱ ${isTimeBoosted ? `<span class="base">${formatDuration(baseTime)}</span>` : ""}${formatDuration(boostedTime)}`;
  const timeBoostNote = isTimeBoosted ? `<div class="cook-food-cost-line cook-boost-chip-row"><span class="cook-boost-chip-label">⚡ Time:</span><div class="cook-boost-chips">${timeBoostsUsed.map(bu => `<span class="boost-chip">${bu.icon}${escapeHtml(bu.text)}</span>`).join("")}</div></div>` : "";
  let totalCostCoins = 0;
  const effectiveCount = count > 0 ? count : 1;
  const doubleNomMult = getDoubleNomIngredientMultiplier();
  const isIngredientBoosted = doubleNomMult > 1;
  const ingredientEntries = Object.keys(rec.ingredients).map(ing => {
    const qty = rec.ingredients[ing] * doubleNomMult;
    const unitCoins = cookingIngredientUnitCostCoins(ing, cookingCostMode);
    totalCostCoins += qty * unitCoins;
    return {
      ing: ing,
      qty: qty,
      unitCoins: unitCoins
    };
  });
  const ingredientRows = ingredientEntries.map(({ing: ing, qty: qty, unitCoins: unitCoins}) => {
    const lineCoins = qty * unitCoins;
    const displayVal = cookingCostMode === "buy" ? coinsToFlower(lineCoins) : lineCoins;
    const displayUnit = cookingCostMode === "buy" ? typeof FLOWER_ICON !== "undefined" ? FLOWER_ICON : "F" : typeof COIN_ICON !== "undefined" ? COIN_ICON : "c";
    let costLabel = "no cost data";
    if (unitCoins > 0) {
      costLabel = `${fmt(displayVal)}${displayUnit}`;
    } else if (cookingCostMode === "collect") {
      const freeBoosts = traceZeroCostBoosts(ing);
      if (freeBoosts.length) {
        costLabel = `Free — ${freeBoosts.map(b => `${getBoostIcon(b.name)}${escapeHtml(b.name)}`).join(", ")}`;
      }
    }
    return `\n      <div class="cook-ingredient-row ing-row-boxed">\n        <span>${cookingIngredientIcon(ing)}</span>\n        <span class="ing-name">${escapeHtml(ing)} ×${fmt(qty)}</span>\n        <span class="ing-cost">${costLabel}</span>\n      </div>`;
  }).join("");
  const ingredientTotalRows = ingredientEntries.map(({ing: ing, qty: qty, unitCoins: unitCoins}) => {
    const totalQty = qty * effectiveCount;
    const totalIngCoins = qty * effectiveCount * unitCoins;
    const totalDisplayVal = cookingCostMode === "buy" ? coinsToFlower(totalIngCoins) : totalIngCoins;
    const displayUnit = cookingCostMode === "buy" ? typeof FLOWER_ICON !== "undefined" ? FLOWER_ICON : "F" : typeof COIN_ICON !== "undefined" ? COIN_ICON : "c";
    const costLabel = unitCoins > 0 ? `${fmt(totalDisplayVal)}${displayUnit}` : "—";
    return `\n      <div class="ing-total-row" data-ing-total data-ing-name="${escapeHtml(ing)}" data-qty="${qty}" data-unit-coins="${unitCoins}">\n        <span>${cookingIngredientIcon(ing)}</span>\n        <span class="ing-name">${escapeHtml(ing)} ×${fmt(totalQty)}</span>\n        <span class="ing-cost">${costLabel}</span>\n      </div>`;
  }).join("");
  const totalFlower = coinsToFlower(totalCostCoins);
  const boostNote = isBoosted ? `<div class="cook-food-cost-line cook-boost-chip-row"><span class="cook-boost-chip-label">⚡ EXP:</span><div class="cook-boost-chips">${boostsUsed.map(bu => `<span class="boost-chip">${bu.icon}${escapeHtml(bu.text)}</span>`).join("")}</div></div>` : "";
  const ingredientBoostNote = isIngredientBoosted ? `<div class="cook-food-cost-line cook-boost-chip-row"><span class="cook-boost-chip-label">⚡ Ingredients:</span><div class="cook-boost-chips"><span class="boost-chip">Double Nom ×${doubleNomMult}</span></div></div>` : "";
  const doubleNomBonusFood = getDoubleNomBonusFood();
  const isYieldBoosted = doubleNomBonusFood > 0;
  const yieldBoostNote = isYieldBoosted ? `<div class="cook-food-cost-line cook-boost-chip-row"><span class="cook-boost-chip-label">⚡ Yield:</span><div class="cook-boost-chips"><span class="boost-chip">Double Nom +${doubleNomBonusFood} food</span></div></div>` : "";
  const foodIconHtml = cookFoodIcon(name);
  const yieldCount = doubleNomMult;
  return `\n  <div class="cook-food-card${isExpanded ? " expanded" : ""}${count > 0 ? " is-ready" : ""}" data-food="${escapeHtml(name)}">\n    <div class="cook-food-toggle">\n      <span class="cook-food-icon">${foodIconHtml}</span>\n      <div class="cook-food-main">\n        <div class="cook-food-name">${escapeHtml(name)}</div>\n        <div class="cook-food-exp">${isBoosted ? `<span class="base">${fmt(rec.exp)}</span>` : ""}${fmt(boostedExp)} EXP · ${timeDisplay}</div>\n      </div>\n      <input type="number" min="0" step="1" class="cook-food-count" value="${count || ""}" placeholder="0" data-food="${escapeHtml(name)}" data-unit-cost="${totalFlower}" data-exp-per-unit="${boostedExp}">\n      <span class="cook-food-chev">▾</span>\n    </div>\n    <div class="cook-food-details">\n      ${isBoosted || isTimeBoosted || isIngredientBoosted || isYieldBoosted ? `<div class="cook-ing-label">Applied Boost</div>` : ""}\n      ${boostNote}\n      ${timeBoostNote}\n      ${ingredientBoostNote}\n      ${yieldBoostNote}\n      <div class="cook-ing-label">Yield</div>\n      ${renderCookYieldLine(yieldCount, foodIconHtml)}\n      <div class="cook-ing-label">Ingredients</div>\n      ${ingredientRows}\n      <div class="cook-ing-total-section"${effectiveCount > 1 ? "" : ' style="display:none;"'}>\n        <div class="cook-ing-label">Total Ingredients for ${effectiveCount}× ${foodIconHtml}</div>\n        ${ingredientTotalRows}\n      </div>\n      <div class="cook-ing-label">Food Cost</div>\n      ${renderCookTotalCostLine(totalFlower, foodIconHtml, `${cookingCostMode === "buy" ? "Buy" : "Collect"} ingredients`, "", yieldCount)}\n      ${renderCookTotalCostForCountLine(totalFlower, effectiveCount, foodIconHtml, !(count > 1))}\n      <div class="cook-ing-label">Experience</div>\n      ${renderCookTotalExpLine(boostedExp, effectiveCount, foodIconHtml)}\n    </div>\n  </div>`;
}

export function renderCookingFoodList() {
  const wrap = $("cookFoodList");
  if (!wrap) return;
  invalidateCostCache();
  if (cookingFishCategory) {
    renderFishCatchList(cookingFishCategory);
    return;
  }
  const building = cookingActiveBuilding;
  const foods = Object.keys(COOKING_RECIPES[building] || {});
  wrap.innerHTML = foods.map(f => renderCookingFoodCard(building, f)).join("");
  wrap.querySelectorAll(".cook-food-toggle").forEach(el => {
    el.onclick = () => {
      const card = el.closest(".cook-food-card");
      const name = card.dataset.food;
      if (cookingExpandedFoods.has(name)) cookingExpandedFoods.delete(name); else cookingExpandedFoods.add(name);
      saveCookingExpanded();
      card.classList.toggle("expanded");
    };
  });
  wrap.querySelectorAll(".cook-food-count").forEach(el => {
    el.onclick = e => e.stopPropagation();
    el.oninput = () => {
      setCookingCount(el.dataset.food, el.value);
      renderCookingHeader();
      const card = el.closest(".cook-food-card");
      const n = Number(el.value);
      if (card) card.classList.toggle("is-ready", n > 0);
      const effectiveCount = n > 0 ? n : 1;
      const iconHtml = card && card.querySelector(".cook-food-icon") ? card.querySelector(".cook-food-icon").innerHTML : "";
      const totalLine = card ? card.querySelector(".cook-food-count-total-line") : null;
      if (totalLine) {
        const unitCost = Number(el.dataset.unitCost) || 0;
        if (n > 1) {
          totalLine.style.display = "";
          const flowerIcon = typeof FLOWER_ICON !== "undefined" ? FLOWER_ICON : "FLOWER";
          const labelEl = totalLine.querySelector(".cook-total-cost-label");
          const valueEl = totalLine.querySelector(".cook-total-cost-value");
          if (labelEl) labelEl.innerHTML = `Total Cost for ${fmt(effectiveCount)}× ${iconHtml}`;
          if (valueEl) valueEl.innerHTML = `${fmt(unitCost * effectiveCount)}${flowerIcon}`;
        } else {
          totalLine.style.display = "none";
        }
      }
      const expLine = card ? card.querySelector(".cook-total-exp-line") : null;
      if (expLine) {
        const expPerUnit = Number(el.dataset.expPerUnit) || 0;
        const labelEl = expLine.querySelector(".cook-total-cost-label");
        const valueEl = expLine.querySelector(".cook-total-cost-value");
        if (labelEl) labelEl.innerHTML = `Total EXP for ${fmt(effectiveCount)}× ${iconHtml}`;
        if (valueEl) valueEl.innerHTML = `${fmt(expPerUnit * effectiveCount)} EXP`;
      }
      const totalSection = card ? card.querySelector(".cook-ing-total-section") : null;
      if (totalSection) {
        if (n > 1) {
          totalSection.style.display = "";
          const label = totalSection.querySelector(".cook-ing-label");
          if (label) label.innerHTML = `Total Ingredients for ${effectiveCount}× ${iconHtml}`;
          totalSection.querySelectorAll("[data-ing-total]").forEach(row => {
            const qty = Number(row.dataset.qty) || 0;
            const unitCoins = Number(row.dataset.unitCoins) || 0;
            const ingName = row.dataset.ingName || "";
            const totalQty = qty * effectiveCount;
            const totalIngCoins = qty * effectiveCount * unitCoins;
            const displayUnit = cookingCostMode === "buy" ? typeof FLOWER_ICON !== "undefined" ? FLOWER_ICON : "F" : typeof COIN_ICON !== "undefined" ? COIN_ICON : "c";
            const totalDisplayVal = cookingCostMode === "buy" ? coinsToFlower(totalIngCoins) : totalIngCoins;
            const costLabel = unitCoins > 0 ? `${fmt(totalDisplayVal)}${displayUnit}` : "—";
            row.innerHTML = `<span>${cookingIngredientIcon(ingName)}</span><span class="ing-name">${escapeHtml(ingName)} ×${fmt(totalQty)}</span><span class="ing-cost">${costLabel}</span>`;
          });
        } else {
          totalSection.style.display = "none";
        }
      }
    };
  });
}

export function renderCookingPanel() {
  if (!$("cookHeader")) return;
  invalidateCostCache();
  if (typeof renderFactionPetHeader === "function") renderFactionPetHeader();
  __markSub("      renderCookingPanel: renderFactionPetHeader");
  renderCookingHeader();
  __markSub("      renderCookingPanel: renderCookingHeader");
  renderCookingModeToggle();
  __markSub("      renderCookingPanel: renderCookingModeToggle");
  renderCookingFishTabs();
  __markSub("      renderCookingPanel: renderCookingFishTabs");
  renderCookingBuildingTabs();
  __markSub("      renderCookingPanel: renderCookingBuildingTabs");
  renderCookingGuaranteedCatchToggle();
  __markSub("      renderCookingPanel: renderCookingGuaranteedCatchToggle");
  renderCookingFoodList();
  __markSub("      renderCookingPanel: renderCookingFoodList (n=" + Object.keys(COOKING_RECIPES[cookingActiveBuilding] || {}).length + ")");
}

const cookModeToggleEl = document.getElementById("cookModeToggle");

if (cookModeToggleEl) {
  cookModeToggleEl.querySelectorAll("button").forEach(btn => {
    btn.onclick = () => {
      setCookingCostMode(btn.dataset.mode);
      renderCookingModeToggle();
      renderCookingHeader();
      renderCookingFoodList();
    };
  });
}

function renderCookingGuaranteedCatchToggle() {
  const row = $("cookGuaranteedCatchToggleRow");
  const input = $("cookGuaranteedCatchToggleInput");
  if (!row || !input) return;
  row.style.display = cookingFishCategory === "Basic Fish" ? "" : "none";
  input.checked = cookingGuaranteedCatchOn;
  row.classList.toggle("is-active", cookingGuaranteedCatchOn);
  const applyToggle = val => {
    setCookingGuaranteedCatchOn(val);
    input.checked = cookingGuaranteedCatchOn;
    row.classList.toggle("is-active", cookingGuaranteedCatchOn);
    renderCookingHeader();
    renderCookingFoodList();
  };
  input.onchange = () => applyToggle(input.checked);
  row.onclick = e => {
    if (e.target.closest(".switch")) return;
    applyToggle(!input.checked);
  };
}

function renderCookingFishTabs() {
  const wrap = $("cookFishTabs");
  if (!wrap) return;
  const cats = [ "Basic Fish", "Aged Fish", "Prime Aged Fish" ];
  wrap.innerHTML = cats.map(cat => `\n    <button type="button" class="${cat === cookingFishCategory ? "active" : ""}" data-fish-category="${escapeHtml(cat)}">\n      🐟 ${escapeHtml(cat)}\n    </button>\n  `).join("");
  wrap.querySelectorAll("button").forEach(btn => {
    btn.onclick = () => {
      setCookingFishCategory(cookingFishCategory === btn.dataset.fishCategory ? "" : btn.dataset.fishCategory);
      renderCookingFishTabs();
      renderCookingBuildingTabs();
      renderCookingGuaranteedCatchToggle();
      renderCookingFoodList();
    };
  });
}

function fishIngTotalRowHtml(ingName, qtyPerUnit, coinsPerUnit, effectiveCount) {
  const totalQty = qtyPerUnit * effectiveCount;
  const totalCoins = coinsPerUnit * effectiveCount;
  const costLabel = coinsPerUnit > 0 ? `${fmt(coinsToFlower(totalCoins))}${FLOWER_ICON}` : "—";
  return `\n      <div class="ing-total-row" data-ing-total data-ing-name="${escapeHtml(ingName)}" data-qty="${qtyPerUnit}" data-unit-coins="${coinsPerUnit}">\n        <span>${getIcon(ingName)}</span>\n        <span class="ing-name">${escapeHtml(ingName)} ×${fmt(totalQty)}</span>\n        <span class="ing-cost">${costLabel}</span>\n      </div>`;
}

function renderFishCatchCard(fishName, cat) {
  const stage = fishStageForCategory(cat);
  const d = FISH_CATCH_DATA[fishName];
  const {xp: boostedXp, boostsUsed: boostsUsed, baseXp: baseXp} = fishCatchComputeXP(fishName, stage);
  const isBoosted = Math.abs(boostedXp - baseXp) > 1e-9;
  const invName = fishInventoryNameForCategory(fishName, cat);
  const count = getCookingCount(invName);
  const isExpanded = cookingExpandedFoods.has(invName);
  const costCoins = fishCatchStageCostCoins(fishName, stage, cookingCostMode);
  const totalFlower = coinsToFlower(costCoins);
  const effectiveCount = count > 0 ? count : 1;
  const boostNote = isBoosted ? `<div class="cook-food-cost-line cook-boost-chip-row"><span class="cook-boost-chip-label">⚡ EXP:</span><div class="cook-boost-chips">${boostsUsed.map(bu => `<span class="boost-chip">${bu.icon}${escapeHtml(bu.text)}</span>`).join("")}</div></div>` : "";
  const marketItem = stage === "basic" && cookingGuaranteedCatchOn ? fishMarketItemForFish(fishName) : null;
  const icon = stage === "basic" ? getIcon(fishName) : getFishIcon(fishName, stage === "primeAged");
  let ingredientRows = "";
  let ingredientTotalRows = "";
  let extraNote = "";
  if (stage === "basic") {
    if (marketItem) {
      const marketItemTotalCoins = fishMarketItemCostCoins(marketItem, cookingCostMode, previewSeason);
      const fishYieldMult = fishCatchYieldMult(d.tier);
      const itemCostCoins = fishEffectiveBasicCostCoins(fishName, cookingCostMode);
      ingredientRows = `\n        <div class="cook-ingredient-row ing-row-boxed"><span>${getIcon(marketItem)}</span><span class="ing-name">${escapeHtml(marketItem)} ×1</span><span class="ing-cost">${fmt(coinsToFlower(marketItemTotalCoins))}${FLOWER_ICON}</span></div>\n        <div class="cook-ingredient-row ing-row-boxed"><span class="ing-name">÷ avg yield ×${fmt(fishYieldMult)}/rod</span><span class="ing-cost">= ${fmt(coinsToFlower(itemCostCoins))}${FLOWER_ICON}/u</span></div>\n      `;
      ingredientTotalRows = fishIngTotalRowHtml(marketItem, 1, itemCostCoins, effectiveCount);
      extraNote = `<div style="font-size:9px;color:var(--ink-soft);margin-top:2px;">Guaranteed Catch active — cost uses the Fish Market's ${escapeHtml(marketItem)} recipe cost divided by ${escapeHtml(fishName)}'s avg catch yield instead of Rod + Bait + Chum.</div>`;
    } else if (cookingCostMode === "buy") {
      const buyCostCoins = getMaterialUnitCostCoins(fishName, "buy");
      ingredientRows = `\n        <div class="cook-ingredient-row ing-row-boxed"><span>${getIcon(fishName)}</span><span class="ing-name">${escapeHtml(fishName)} ×1</span><span class="ing-cost">${fmt(coinsToFlower(buyCostCoins))}${FLOWER_ICON}/u</span></div>\n      `;
      ingredientTotalRows = fishIngTotalRowHtml(fishName, 1, buyCostCoins, effectiveCount);
      extraNote = `<div style="font-size:9px;color:var(--ink-soft);margin-top:2px;">🛒 Buy — cost uses the Marketplace price for ${escapeHtml(fishName)} instead of Rod + Bait + Chum.</div>`;
    } else {
      const bf = computeBasicFishFigures(fishName, cookingCostMode);
      ingredientRows = `\n        <div class="cook-ingredient-row ing-row-boxed"><span>${getIcon("Rod")}</span><span class="ing-name">Rod ×1</span><span class="ing-cost">${fmt(coinsToFlower(bf.rodCost))}${FLOWER_ICON}/u</span></div>\n        <div class="cook-ingredient-row ing-row-boxed"><span>${getIcon(bf.bait ? bf.bait.name : "")}</span><span class="ing-name">${escapeHtml(bf.bait ? bf.bait.name : "?")} ×1</span><span class="ing-cost">${fmt(coinsToFlower(bf.baitCost))}${FLOWER_ICON}/u</span></div>\n        ${bf.chum ? `<div class="cook-ingredient-row ing-row-boxed"><span>${getIcon(bf.chum ? bf.chum.name : "")}</span><span class="ing-name">${escapeHtml(bf.chum ? bf.chum.name : "?")} ×${fmt(bf.chum ? bf.chum.qty : 0)}</span><span class="ing-cost">${fmt(coinsToFlower(bf.chumCost))}${FLOWER_ICON}/u</span></div>` : `<div class="cook-ingredient-row ing-row-boxed"><span class="ing-name">No chum</span></div>`}\n      `;
      ingredientTotalRows = `${fishIngTotalRowHtml("Rod", 1, bf.rodCost, effectiveCount)}${fishIngTotalRowHtml(bf.bait ? bf.bait.name : "?", 1, bf.baitCost, effectiveCount)}${bf.chum ? fishIngTotalRowHtml(bf.chum.name, bf.chum.qty, bf.chumCost, effectiveCount) : ""}`;
      extraNote = `<div style="font-size:9px;color:var(--ink-soft);margin-top:2px;">Tier: ${escapeHtml(FISH_TIER_LABEL[d.tier])}${fishCatchYieldMult(d.tier) !== 1 ? ` · avg yield ×${fmt(fishCatchYieldMult(d.tier))} (chance skill)` : ``}</div>${fishRivalNoteHtml(fishName, bf)}`;
    }
  } else {
    const af = computeAgedFishFigures(fishName, cookingCostMode);
    ingredientRows = `\n      <div class="cook-ingredient-row ing-row-boxed"><span>${getIcon(fishName)}</span><span class="ing-name">${escapeHtml(fishName)} ×1</span><span class="ing-cost">${fmt(coinsToFlower(af.basicFishCost))}${FLOWER_ICON}/u</span></div>\n      <div class="cook-ingredient-row ing-row-boxed"><span>${getIcon("Salt")}</span><span class="ing-name">Salt ×${fmt(af.saltQty)}</span><span class="ing-cost">${fmt(coinsToFlower(af.saltCostCoins))}${FLOWER_ICON}/u</span></div>\n    `;
    ingredientTotalRows = `${fishIngTotalRowHtml(fishName, 1, af.basicFishCost, effectiveCount)}${fishIngTotalRowHtml("Salt", af.saltQty, af.saltCostCoins, effectiveCount)}`;
    extraNote = `${stage === "primeAged" ? `<div style="font-size:9px;color:var(--ink-soft);margin-top:2px;">Same recipe as Aged — Prime Aged is a bonus chance on the same batch, not an extra cost.</div>` : ``}${cookingGuaranteedCatchOn ? `<div style="font-size:9px;color:var(--ink-soft);margin-top:2px;">🎯 Guaranteed Catch is on — the ${escapeHtml(fishName)} cost above already uses the Fish Market recipe cost instead of Rod + Bait + Chum.</div>` : ``}${cookingCostMode === "buy" ? `<div style="font-size:9px;color:var(--ink-soft);margin-top:2px;">🛒 Buy — Salt priced at Marketplace rate.</div>` : ``}`;
  }
  const fishYieldCount = d ? fishCatchYieldMult(d.tier) : 1;
  return `\n  <div class="cook-food-card${isExpanded ? " expanded" : ""}${count > 0 ? " is-ready" : ""}" data-food="${escapeHtml(invName)}">\n    <div class="cook-food-toggle">\n      <span class="cook-food-icon">${icon}</span>\n      <div class="cook-food-main">\n        <div class="cook-food-name">${escapeHtml(fishName)}</div>\n        <div class="cook-food-exp">${isBoosted ? `<span class="base">${fmt(baseXp)}</span>` : ""}${fmt(boostedXp)} EXP · ${fmt(totalFlower)} ${FLOWER_ICON}/u</div>\n      </div>\n      <input type="number" min="0" step="1" class="cook-food-count" value="${count || ""}" placeholder="0" data-food="${escapeHtml(invName)}" data-unit-cost="${totalFlower}" data-exp-per-unit="${boostedXp}">\n      <span class="cook-food-chev">▾</span>\n    </div>\n    <div class="cook-food-details">\n      ${isBoosted ? `<div class="cook-ing-label">Applied Boost</div>` : ""}\n      ${boostNote}\n      <div class="cook-ing-label">Yield</div>\n      ${renderCookYieldLine(fishYieldCount, icon)}\n      <div class="cook-ing-label">Ingredients</div>\n      ${ingredientRows}\n      <div class="cook-ing-total-section"${effectiveCount > 1 ? "" : ' style="display:none;"'}>\n        <div class="cook-ing-label">Total Ingredients for ${effectiveCount}× ${icon}</div>\n        ${ingredientTotalRows}\n      </div>\n      <div class="cook-ing-label">Fish Cost</div>\n      ${renderCookTotalCostLine(totalFlower, icon, `${cookingCostMode === "buy" ? "Buy" : "Collect"} ingredients`)}\n      ${renderCookTotalCostForCountLine(totalFlower, effectiveCount, icon, !(count > 1))}\n      <div class="cook-ing-label">Experience</div>\n      ${renderCookTotalExpLine(boostedXp, effectiveCount, icon)}\n      ${extraNote}\n    </div>\n  </div>`;
}

function renderFishCatchList(cat) {
  const wrap = $("cookFoodList");
  if (!wrap) return;
  wrap.innerHTML = FISH_CATCH_NAMES.map(f => renderFishCatchCard(f, cat)).join("");
  wrap.querySelectorAll(".cook-food-toggle").forEach(el => {
    el.onclick = () => {
      const card = el.closest(".cook-food-card");
      const name = card.dataset.food;
      if (cookingExpandedFoods.has(name)) cookingExpandedFoods.delete(name); else cookingExpandedFoods.add(name);
      saveCookingExpanded();
      card.classList.toggle("expanded");
    };
  });
  wrap.querySelectorAll(".cook-food-count").forEach(el => {
    el.onclick = e => e.stopPropagation();
    el.oninput = () => {
      setCookingCount(el.dataset.food, el.value);
      renderCookingHeader();
      const card = el.closest(".cook-food-card");
      const n = Number(el.value);
      if (card) card.classList.toggle("is-ready", n > 0);
      const effectiveCount = n > 0 ? n : 1;
      const iconHtml = card && card.querySelector(".cook-food-icon") ? card.querySelector(".cook-food-icon").innerHTML : "";
      const totalLine = card ? card.querySelector(".cook-food-count-total-line") : null;
      if (totalLine) {
        const unitCost = Number(el.dataset.unitCost) || 0;
        if (n > 1) {
          totalLine.style.display = "";
          const labelEl = totalLine.querySelector(".cook-total-cost-label");
          const valueEl = totalLine.querySelector(".cook-total-cost-value");
          if (labelEl) labelEl.innerHTML = `Total Cost for ${fmt(effectiveCount)}× ${iconHtml}`;
          if (valueEl) valueEl.innerHTML = `${fmt(unitCost * effectiveCount)}${FLOWER_ICON}`;
        } else {
          totalLine.style.display = "none";
        }
      }
      const expLine = card ? card.querySelector(".cook-total-exp-line") : null;
      if (expLine) {
        const expPerUnit = Number(el.dataset.expPerUnit) || 0;
        const labelEl = expLine.querySelector(".cook-total-cost-label");
        const valueEl = expLine.querySelector(".cook-total-cost-value");
        if (labelEl) labelEl.innerHTML = `Total EXP for ${fmt(effectiveCount)}× ${iconHtml}`;
        if (valueEl) valueEl.innerHTML = `${fmt(expPerUnit * effectiveCount)} EXP`;
      }
      const totalSection = card ? card.querySelector(".cook-ing-total-section") : null;
      if (totalSection) {
        if (n > 1) {
          totalSection.style.display = "";
          const label = totalSection.querySelector(".cook-ing-label");
          if (label) label.innerHTML = `Total Ingredients for ${effectiveCount}× ${iconHtml}`;
          totalSection.querySelectorAll("[data-ing-total]").forEach(row => {
            const qty = Number(row.dataset.qty) || 0;
            const unitCoins = Number(row.dataset.unitCoins) || 0;
            const ingName = row.dataset.ingName || "";
            const totalQty = qty * effectiveCount;
            const totalCoins = unitCoins * effectiveCount;
            const costLabel = unitCoins > 0 ? `${fmt(coinsToFlower(totalCoins))}${FLOWER_ICON}` : "—";
            row.innerHTML = `<span>${getIcon(ingName)}</span><span class="ing-name">${escapeHtml(ingName)} ×${fmt(totalQty)}</span><span class="ing-cost">${costLabel}</span>`;
          });
        } else {
          totalSection.style.display = "none";
        }
      }
    };
  });
}

function renderFishingTierTabs() {
  const wrap = $("fishingTierToggle");
  if (!wrap) return;
  wrap.querySelectorAll("button").forEach(btn => {
    btn.classList.toggle("active", btn.dataset.tier === fishingTierActive);
    btn.onclick = () => {
      setFishingTier(btn.dataset.tier);
      renderFishingTierTabs();
      renderFishingTierList();
    };
  });
}

function fishRivalNoteHtml(fishName, bf) {
  if (fishName === "Surgeonfish") return "";
  if (!bf || !bf.rivals || !bf.rivals.length || !bf.bait || !bf.chum) return "";
  const guaranteed = fishMarketItemForFish(fishName);
  const tail = guaranteed ? ` Use ${escapeHtml(guaranteed)} to guarantee ${escapeHtml(fishName)}.` : ``;
  return `<div style="font-size:9px;color:var(--loss);margin-top:3px;">⚠ ${escapeHtml(bf.bait.name)} + ${escapeHtml(bf.chum.name)} is also matched by ${bf.rivals.map(escapeHtml).join(", ")} — the game can land that fish instead.${tail}</div>`;
}

function fishGuaranteedBaitsForFish(fishName) {
  return Object.keys(FISH_MARKET_GUARANTEED_CATCH).filter(item => FISH_MARKET_GUARANTEED_CATCH[item].includes(fishName));
}

function fishAltChumRowsHtml(fishName, bf, yieldMult) {
  if (fishName !== "Tuna" || !bf || !bf.chum || !bf.chumOptions) return "";
  const others = bf.chumOptions.filter(o => o.name !== bf.chum.name);
  if (!others.length) return "";
  const rows = others.map(o => `<div class="cook-ingredient-row"><span>${getIcon(o.name)}</span><span class="ing-name">${escapeHtml(o.name)} ×${fmt(o.qty)}</span><span class="ing-cost">${fmt(coinsToFlower(o.cost / yieldMult))}${FLOWER_ICON}/u</span></div>`).join("");
  return `<div style="font-size:9px;color:var(--ink-soft);margin-top:4px;">Or use this chum instead of ${escapeHtml(bf.chum.name)}:</div>${rows}`;
}

function fishAltSetupRowsHtml(fishName, bf, yieldMult) {
  if (!bf || !bf.altSetups || !bf.altSetups.length) return "";
  const mainChumName = bf.chum ? bf.chum.name : null;
  const baitRow = alt => `<div class="cook-ingredient-row"><span>${getIcon(alt.bait.name)}</span><span class="ing-name">${escapeHtml(alt.bait.name)} ×1</span><span class="ing-cost">${fmt(coinsToFlower(alt.bait.cost / yieldMult))}${FLOWER_ICON}/u</span></div>`;
  const sameChum = bf.altSetups.filter(alt => (alt.chum ? alt.chum.name : null) === mainChumName);
  const otherChum = bf.altSetups.filter(alt => (alt.chum ? alt.chum.name : null) !== mainChumName);
  let html = "";
  if (sameChum.length) {
    html += `<div style="font-size:9px;color:var(--ink-soft);margin-top:4px;">Other baits that can catch ${escapeHtml(fishName)}${mainChumName ? ` with ${escapeHtml(mainChumName)}` : ""}:</div>${sameChum.map(baitRow).join("")}`;
  }
  otherChum.forEach(alt => {
    const chumRow = alt.chum ? `<div class="cook-ingredient-row"><span>${getIcon(alt.chum.name)}</span><span class="ing-name">${escapeHtml(alt.chum.name)} ×${fmt(alt.chum.qty)}</span><span class="ing-cost">${fmt(coinsToFlower(alt.chum.cost / yieldMult))}${FLOWER_ICON}/u</span></div>` : `<div class="cook-ingredient-row"><span class="ing-name">No chum</span></div>`;
    html += `<div style="font-size:9px;color:var(--ink-soft);margin-top:4px;">Or use this setup instead:</div>${baitRow(alt)}${chumRow}`;
  });
  return html;
}

function fishGuaranteedBaitRowsHtml(fishName) {
  const baits = fishGuaranteedBaitsForFish(fishName);
  if (!baits.length) return "";
  const rows = baits.map(item => {
    const itemCoins = fishMarketItemCostCoins(item, "collect", previewSeason);
    return `<div class="cook-ingredient-row"><span>${getIcon(item)}</span><span class="ing-name">${escapeHtml(item)} ×1</span><span class="ing-cost">${fmt(coinsToFlower(itemCoins))}${FLOWER_ICON}/u</span></div>`;
  }).join("");
  return `<div class="cook-ing-label">🎯 Guaranteed Bait</div>${rows}<div style="font-size:9px;color:var(--ink-soft);margin-top:2px;">Using ${baits.map(escapeHtml).join(" or ")} guarantees a ${escapeHtml(fishName)} catch.</div>`;
}

function fishGuaranteedBaitBadgeHtml(fishName) {
  const baits = fishGuaranteedBaitsForFish(fishName);
  if (!baits.length) return "";
  return `<span class="fish-guaranteed-badge" title="Guaranteed catch via ${baits.map(escapeHtml).join(", ")}">${baits.map(b => getIcon(b)).join("")}</span>`;
}

function renderFishingTierCard(fishName) {
  const d = FISH_CATCH_DATA[fishName];
  const bf = computeBasicFishFigures(fishName);
  if (!bf) return "";
  const totalFlower = coinsToFlower(bf.costCoins);
  const isExpanded = fishingExpandedTierFish.has(fishName);
  const yieldMult = bf.yieldMult;
  return `\n  <div class="cook-food-card${isExpanded ? " expanded" : ""}" data-fish="${escapeHtml(fishName)}">\n    <div class="cook-food-toggle">\n      <span class="cook-food-icon">${getIcon(fishName)}</span>\n      <div class="cook-food-main">\n        <div class="cook-food-name">${escapeHtml(fishName)} ${renderFishSeasonBadges(fishName)}${fishGuaranteedBaitBadgeHtml(fishName)}</div>\n        <div class="cook-food-exp">${fmt(totalFlower)} ${FLOWER_ICON}/u${yieldMult !== 1 ? ` · avg yield ×${fmt(yieldMult)}/rod` : ``}</div>\n      </div>\n      <span class="cook-food-chev">▾</span>\n    </div>\n    <div class="cook-food-details">\n      <div class="cook-food-cost-line">${fmt(totalFlower)} ${FLOWER_ICON} FLOWER — cost per fish</div>\n      <div class="cook-ing-label">Baits &amp; Chum</div>\n      <div class="cook-ingredient-row"><span>${getIcon("Rod")}</span><span class="ing-name">Rod ×1</span><span class="ing-cost">${bf.rodCost === 0 ? fishRodFreeCostLabel() : `${fmt(coinsToFlower(bf.rodCost / yieldMult))}${FLOWER_ICON}/u`}</span></div>\n      <div class="cook-ingredient-row"><span>${getIcon(bf.bait ? bf.bait.name : "")}</span><span class="ing-name">${escapeHtml(bf.bait ? bf.bait.name : "?")} ×1</span><span class="ing-cost">${fmt(coinsToFlower(bf.baitCost / yieldMult))}${FLOWER_ICON}/u</span></div>\n      ${bf.chum ? `<div class="cook-ingredient-row"><span>${getIcon(bf.chum.name)}</span><span class="ing-name">${escapeHtml(bf.chum.name)} ×${fmt(bf.chum.qty)}</span><span class="ing-cost">${fmt(coinsToFlower(bf.chumCost / yieldMult))}${FLOWER_ICON}/u</span></div>` : `<div class="cook-ingredient-row"><span class="ing-name">No chum</span></div>`}${fishAltChumRowsHtml(fishName, bf, yieldMult)}${fishAltSetupRowsHtml(fishName, bf, yieldMult)}\n      <div style="font-size:9px;color:var(--ink-soft);margin-top:2px;">Avg yield per rod: ×${fmt(yieldMult)}${yieldMult !== 1 ? ` (Fishy Chance/Roll/Gamble skill &amp; 🎣 Fishing boosts applied)` : ``}</div>${fishRivalNoteHtml(fishName, bf)}${fishGuaranteedBaitRowsHtml(fishName)}\n    </div>\n  </div>`;
}

function renderCrabTierCard() {
  const fig = computeCrabFigures();
  const totalFlower = coinsToFlower(fig.costCoins);
  const isExpanded = fishingExpandedTierFish.has("Crab");
  return `\n  <div class="cook-food-card${isExpanded ? " expanded" : ""}" data-fish="Crab">\n    <div class="cook-food-toggle">\n      <span class="cook-food-icon">${getIcon("Crab")}</span>\n      <div class="cook-food-main">\n        <div class="cook-food-name">Crab</div>\n        <div class="cook-food-exp">${fmt(totalFlower)} ${FLOWER_ICON}/u${fig.yieldMult !== 1 ? ` · avg yield ×${fmt(fig.yieldMult)}/rod` : ``}</div>\n      </div>\n      <span class="cook-food-chev">▾</span>\n    </div>\n    <div class="cook-food-details">\n      <div class="cook-food-cost-line">${fmt(totalFlower)} ${FLOWER_ICON} FLOWER — cost per crab</div>\n      <div class="cook-ingredient-row"><span>${getIcon("Rod")}</span><span class="ing-name">Rod ×1</span><span class="ing-cost">${fig.rodCost === 0 ? fishRodFreeCostLabel() : `${fmt(coinsToFlower(fig.rodCost / fig.yieldMult))}${FLOWER_ICON}/u`}</span></div>\n      <div style="font-size:9px;color:var(--ink-soft);margin-top:2px;">1 Rod = 1 Crab, no bait or chum needed.${fig.yieldMult !== 1 ? ` Boosted by 🎣 Fishing boosts (e.g. Crab Hat).` : ` Turn on 🎣 Fishing boosts (e.g. Crab Hat) to boost Crab yield.`}</div>\n    </div>\n  </div>`;
}

function renderSeaweedTierCard() {
  const fig = computeSeaweedFigures();
  const totalFlower = coinsToFlower(fig.costCoins);
  const isExpanded = fishingExpandedTierFish.has("Seaweed");
  return `\n  <div class="cook-food-card${isExpanded ? " expanded" : ""}" data-fish="Seaweed">\n    <div class="cook-food-toggle">\n      <span class="cook-food-icon">${getIcon("Seaweed")}</span>\n      <div class="cook-food-main">\n        <div class="cook-food-name">Seaweed</div>\n        <div class="cook-food-exp">${fmt(totalFlower)} ${FLOWER_ICON}/u${fig.yieldMult !== 1 ? ` · avg yield ×${fmt(fig.yieldMult)}/rod` : ``}</div>\n      </div>\n      <span class="cook-food-chev">▾</span>\n    </div>\n    <div class="cook-food-details">\n      <div class="cook-food-cost-line">${fmt(totalFlower)} ${FLOWER_ICON} FLOWER — cost per seaweed</div>\n      <div class="cook-ingredient-row"><span>${getIcon("Rod")}</span><span class="ing-name">Rod ×1</span><span class="ing-cost">${fig.rodCost === 0 ? fishRodFreeCostLabel() : `${fmt(coinsToFlower(fig.rodCost / fig.yieldMult))}${FLOWER_ICON}/u`}</span></div>\n      <div style="font-size:9px;color:var(--ink-soft);margin-top:2px;">1 Rod = 1 Seaweed, no bait or chum needed.${fig.yieldMult !== 1 ? ` Boosted by 🎣 Fishing boosts (e.g. Crab Hat).` : ` Turn on 🎣 Fishing boosts (e.g. Crab Hat) to boost Seaweed yield.`}</div>\n    </div>\n  </div>`;
}

export function renderFishingTierList() {
  const wrap = $("fishingTierList");
  if (!wrap) return;
  const names = FISH_CATCH_NAMES.filter(f => FISH_CATCH_DATA[f].tier === fishingTierActive);
  let html = names.map(f => renderFishingTierCard(f)).join("");
  if (fishingTierActive === "basic") html += renderCrabTierCard() + renderSeaweedTierCard();
  wrap.innerHTML = html;
  wrap.querySelectorAll(".cook-food-toggle").forEach(el => {
    el.onclick = () => {
      const card = el.closest(".cook-food-card");
      const name = card.dataset.fish;
      if (fishingExpandedTierFish.has(name)) fishingExpandedTierFish.delete(name); else fishingExpandedTierFish.add(name);
      card.classList.toggle("expanded");
    };
  });
}

function renderGuaranteedCatchTabs() {
  const wrap = $("guaranteedCatchTabs");
  if (!wrap) return;
  wrap.innerHTML = FISH_MARKET_ITEM_NAMES.map(it => `\n    <button type="button" class="${it === fishMarketGuaranteedTab ? "active" : ""}" data-gc-item="${escapeHtml(it)}">\n      ${getIcon(it)} ${escapeHtml(it)}\n    </button>\n  `).join("");
  wrap.querySelectorAll("button").forEach(btn => {
    btn.onclick = () => {
      setFishMarketGuaranteedTab(btn.dataset.gcItem);
      renderGuaranteedCatchTabs();
      renderGuaranteedCatchList();
    };
  });
}

function renderGuaranteedCatchList() {
  const wrap = $("guaranteedCatchList");
  if (!wrap) return;
  const list = FISH_MARKET_GUARANTEED_CATCH[fishMarketGuaranteedTab] || [];
  wrap.innerHTML = list.map(f => `\n    <div class="cook-ingredient-row"><span>${getIcon(f)}</span><span class="ing-name">${escapeHtml(f)}</span></div>\n  `).join("");
}

function renderCrustaceanTrapTabs() {
  const wrap = $("crustaceanTrapTabs");
  if (!wrap) return;
  wrap.querySelectorAll("button").forEach(btn => {
    btn.classList.toggle("active", btn.dataset.trap === crustaceanTrapTabActive);
    btn.onclick = () => {
      setCrustaceanTrapTab(btn.dataset.trap);
      renderCrustaceanTrapTabs();
      renderCrustaceanList();
    };
  });
}

function renderCrustaceanOptionRow(name, opt, isSelected, yieldMult) {
  if (opt.chum === null) {
    return `<div class="cook-ingredient-row"><span class="ing-name">No chum needed</span></div>`;
  }
  return `\n  <div class="crustacean-chum-option${isSelected ? " selected" : ""}" data-crust="${escapeHtml(name)}" data-chum="${escapeHtml(opt.chum)}">\n    <span class="crustacean-chum-check">${isSelected ? "✔" : ""}</span>\n    <span class="crustacean-chum-icon">${getIcon(opt.chum)}</span>\n    <span class="ing-name">${escapeHtml(opt.chum)} ×${opt.qty}</span>\n    <span class="ing-cost">${fmt(coinsToFlower(opt.cost / yieldMult))}${FLOWER_ICON}</span>\n  </div>`;
}

function renderCrustaceanCard(name) {
  const fig = computeCrustaceanFigures(name);
  if (!fig) return "";
  const isExpanded = crustaceanExpanded.has(name);
  const totalFlower = coinsToFlower(fig.costCoins);
  const optionsHtml = fig.options.map(o => renderCrustaceanOptionRow(name, o, o.chum === fig.selectedChum, fig.yieldMult)).join("");
  const boostNote = fig.yieldMult !== 1 || fig.hours !== fig.baseHours ? `<div style="font-size:9px;color:var(--ink-soft);margin-top:2px;">Base ${fmt(fig.baseHours)}h trap time — boosted to ${fmt(fig.hours)}h with avg yield ×${fmt(fig.yieldMult)} (🎣 Fishing boosts applied).</div>` : `<div style="font-size:9px;color:var(--ink-soft);margin-top:2px;">Turn on 🎣 Fishing boosts (Crab House, Pistol Shrimp, Royal Crab Pot, Crystal Altar, Speed Trap) to see them applied here.</div>`;
  return `\n  <div class="cook-food-card fishmarket-card${isExpanded ? " expanded" : ""}" data-crust-item="${escapeHtml(name)}">\n    <div class="cook-food-toggle">\n      <span class="cook-food-icon">${getIcon(name)}</span>\n      <div class="cook-food-main">\n        <div class="cook-food-name">${escapeHtml(name)}</div>\n        <div class="cook-food-exp">${fmt(totalFlower)} ${FLOWER_ICON}/u · ${escapeHtml(fig.trap)}</div>\n      </div>\n      <span class="cook-food-chev">▾</span>\n    </div>\n    <div class="cook-food-details">\n      <div class="cook-food-cost-line">${escapeHtml(fig.trap)} &amp; Chum Cost</div>\n      <div class="cook-ingredient-row"><span>${getIcon(fig.trap)}</span><span class="ing-name">${escapeHtml(fig.trap)} ×1</span><span class="ing-cost">${fig.trapCost === 0 ? crustaceanTrapFreeCostLabel() : `${fmt(coinsToFlower(fig.trapCost / fig.yieldMult))}${FLOWER_ICON}`}</span></div>\n      ${optionsHtml}\n      <div class="fishmarket-meta-row">\n        <span>Yield: <b>${fmt(fig.yieldMult)}</b></span>\n        <span>Time: <b>${fmt(fig.hours)}h</b></span>\n      </div>\n      ${boostNote}\n    </div>\n  </div>`;
}

function renderCrustaceanList() {
  const wrap = $("crustaceanCardsList");
  if (!wrap) return;
  const names = CRUSTACEAN_NAMES.filter(n => CRUSTACEAN_CATCH_DATA[n].trap === crustaceanTrapTabActive);
  wrap.innerHTML = names.map(n => renderCrustaceanCard(n)).join("");
  wrap.querySelectorAll(".cook-food-toggle").forEach(el => {
    el.onclick = () => {
      const card = el.closest(".cook-food-card");
      const name = card.dataset.crustItem;
      if (crustaceanExpanded.has(name)) crustaceanExpanded.delete(name); else crustaceanExpanded.add(name);
      card.classList.toggle("expanded");
    };
  });
  wrap.querySelectorAll(".crustacean-chum-option").forEach(el => {
    el.onclick = e => {
      e.stopPropagation();
      setCrustaceanSelectedChum(el.dataset.crust, el.dataset.chum);
      renderCrustaceanList();
    };
  });
}

export function renderFishingPanel() {
  invalidateCostCache();
  renderFishingCostModeToggle();
  renderFishingTierTabs();
  renderFishingTierList();
  renderFishMarketSeasonToggle();
  renderFishMarketMainTabs();
  renderFishMarketCardsList();
  renderCrustaceanTrapTabs();
  renderCrustaceanList();
  renderGuaranteedCatchTabs();
  renderGuaranteedCatchList();
}

function getPetIcon(pet) {
  const name = pet && pet.name;
  if (name && (IMAGE_ICONS[name] || Object.keys(IMAGE_ICONS).some(k => k.toLowerCase() === String(name).trim().toLowerCase()))) {
    return getIcon(name);
  }
  return `<span style="font-size:19.2px;line-height:1;">${pet && PET_TYPE_EMOJI[pet.petType] || "🐾"}</span>`;
}

export function getPetResourceIcon(name) {
  if (name && (IMAGE_ICONS[name] || Object.keys(IMAGE_ICONS).some(k => k.toLowerCase() === String(name).trim().toLowerCase()))) {
    return getIcon(name);
  }
  return PET_RESOURCE_ICON && PET_RESOURCE_ICON[name] || "🔸";
}

function renderPetLevelPerksBlock() {
  if (!petsData.length) {
    return `<div class="lib-section-title">🎖️ Level Perks</div>\n      <div class="lib-empty">Add a pet in the 🐾 Pets tab to see its level perks auto-checked here.</div>`;
  }
  return `<div class="lib-section-title">🎖️ Level Perks</div>` + petsData.map(pet => {
    const rows = PET_LEVEL_PERKS.map(perk => {
      const applies = petPerkApplies(pet, perk);
      const active = petPerkActive(pet, perk);
      const restrictTag = perk.nftOnly ? ` · <span class="season-lock-tag">💎 NFT pets only</span>` : perk.commonOnly ? ` · <span class="season-lock-tag">🐾 Common pets only</span>` : "";
      const status = !applies ? "Not available for this pet" : active ? "Unlocked — active at this level" : `Unlocks at level ${perk.level}`;
      const icon = !applies ? "🚫" : active ? "✅" : "⬜";
      return `<div class="lib-item-row${!applies ? " season-locked" : ""}" style="cursor:not-allowed;${active ? "outline:2px solid var(--profit);" : ""}">\n        <span class="lib-item-icon">${icon}</span>\n        <div class="lib-item-main">\n          <div class="lib-item-name">Lvl ${perk.level} — ${escapeHtml(perk.label)}</div>\n          <div class="lib-item-meta">${status}${restrictTag}</div>\n        </div>\n      </div>`;
    }).join("");
    const badge = pet.isNFT ? `${getIcon("NFT Pet")} NFT` : `${getIcon("Barkley")} Common`;
    return `<div class="lib-section-title" style="margin-top:8px;font-size:12px;">${getPetIcon(pet)} ${escapeHtml(pet.petType)} [${escapeHtml(pet.name)}] · Lv${pet.level} · ${badge}</div>${rows}`;
  }).join("");
}

function renderPetTotalYield() {
  const wrap = $("petTotalYieldWrap");
  if (!wrap) return;
  loadPetResourcesIfNeeded();
  if (!petsData.length) {
    wrap.innerHTML = "";
    return;
  }
  const totals = petComputeResourceTotals();
  if (!totals.length) {
    wrap.innerHTML = "";
    return;
  }
  wrap.innerHTML = `\n    <div class="pet-total-yield-badge">🧺 Total Pet Yield — All Pets Combined (24h)</div>\n    <div class="pet-total-yield-grid retro-scroll" style="max-height:44vh;">\n      ${totals.map(t => `\n        <div class="pet-total-card">\n          <div class="pet-total-title">${getPetResourceIcon(t.name)} ${escapeHtml(t.name)}</div>\n          <div class="pet-total-row"><span>Total NFT Pet &amp; Common Pet heads</span><span>${t.heads} <span class="pet-total-sub">(💎${t.nftHeads} / 🐾${t.commonHeads})</span></span></div>\n          <div class="pet-total-row"><span>Total Yield</span><span>${fmt(t.totalYield)}u</span></div>\n          <div class="pet-total-row"><span>Gross</span><span class="is-profit">${fmt(t.gross)} ${FLOWER_ICON}</span></div>\n          <div class="pet-fetch-deductions-label">Total Deductions</div>\n          <div class="pet-total-row"><span>&nbsp;&nbsp;Total cost</span><span class="is-loss">-${fmt(t.cost)} ${FLOWER_ICON}</span></div>\n          <div class="pet-total-row"><span>&nbsp;&nbsp;Restock cost</span><span>0 ${FLOWER_ICON}</span></div>\n          <div class="pet-total-row"><span>&nbsp;&nbsp;Shrine cost</span><span>0 ${FLOWER_ICON}</span></div>\n          <div class="pet-total-row"><span>&nbsp;&nbsp;Sell fee</span><span class="is-loss">-${fmt(t.sellFee)} ${FLOWER_ICON}</span></div>\n          <div class="pet-total-row pet-total-net"><span>Net</span><span class="${t.net >= 0 ? "is-profit" : "is-loss"}">${t.net >= 0 ? "+" : ""}${fmt(t.net)} ${FLOWER_ICON}</span></div>\n        </div>`).join("")}\n    </div>`;
}

function renderPetProfitability() {
  const wrap = $("petProfitList");
  if (!wrap) return;
  loadPetResourcesIfNeeded();
  wrap.innerHTML = `<div class="pet-info-badge">🌾 Fetch Resource Profitability <span class="pet-profit-sub">(cost/unit = what it costs YOU to fetch — not the marketplace sell price)</span></div>` + PET_TRADABLE_RESOURCES.map(name => {
    const energy = PET_RESOURCE_ENERGY[name];
    const market = getPetResourceMarket(name);
    const isOverride = Object.prototype.hasOwnProperty.call(petResourceCostOverride, name);
    const cost = petResourceCostPerUnit(name);
    const costId = "petcost_" + name.replace(/\s+/g, "_").toLowerCase();
    return `<div class="pet-profit-card">\n        <div class="pet-profit-title">${getPetResourceIcon(name)} ${escapeHtml(name)} <span class="pet-profit-sub">${energy}⚡</span></div>\n        <div class="pet-profit-row market-price-tap" data-id="${costId}" style="cursor:pointer;${isOverride ? "outline:1.5px dashed var(--sun-deep);" : ""}"><span>Cost/u${isOverride ? " ✏️" : " (auto)"}</span><span>${fmt(cost)} ${FLOWER_ICON}</span></div>\n        <div class="pet-profit-row" style="opacity:.65;font-size:.9em;"><span>Sells at</span><span>${fmt(market)} ${FLOWER_ICON}</span></div>\n      </div>`;
  }).join("") + [ "Acorn" ].map(name => {
    const energy = PET_RESOURCE_ENERGY[name];
    const isOverride = Object.prototype.hasOwnProperty.call(petResourceCostOverride, name);
    const cost = petResourceCostPerUnit(name);
    const costId = "petcost_" + name.replace(/\s+/g, "_").toLowerCase();
    return `<div class="pet-profit-card pet-profit-card-static">\n        <div class="pet-profit-title">${getPetResourceIcon(name)} ${escapeHtml(name)} <span class="pet-profit-sub">${energy}⚡</span></div>\n        <div class="pet-profit-row market-price-tap" data-id="${costId}" style="cursor:pointer;${isOverride ? "outline:1.5px dashed var(--sun-deep);" : ""}"><span>Cost/u${isOverride ? " ✏️" : " (auto)"}</span><span>${fmt(cost)} ${FLOWER_ICON}</span></div>\n        <div class="pet-profit-row" style="opacity:.65;font-size:.9em;"><span>Not tradable</span><span>shrine ingredient</span></div>\n      </div>`;
  }).join("");
  wrap.querySelectorAll(".market-price-tap").forEach(el => {
    el.onclick = () => openMarketPriceEdit(el.dataset.id);
  });
}

function renderPetHouse() {
  const wrap = $("petHouseList");
  if (!wrap) return;
  const common = petsData.filter(p => !p.isNFT);
  const nft = petsData.filter(p => p.isNFT);
  const renderCol = (list, emptyMsg) => list.length ? list.map(p => `<div class="pet-house-chip ${petOpenId === p.id ? "active" : ""}" data-pet="${p.id}">${getPetIcon(p)} ${escapeHtml(p.petType)} <span class="pet-house-name">[${escapeHtml(p.name)}]</span> <span class="pet-house-lvl">Lv${p.level}</span>${p.synced ? ` <span class="pet-house-sync-dot" title="Auto-synced from your farm">🔒</span>` : ""}</div>`).join("") : `<div class="pet-house-empty">${emptyMsg}</div>`;
  wrap.innerHTML = `\n    <div class="pet-house-wrap">\n      <div class="pet-house-col">\n        <div class="pet-house-label">${getIcon("Barkley")} Common Pets</div>\n        <div class="pet-house-list">${renderCol(common, "No common pets yet.")}</div>\n      </div>\n      <div class="pet-house-divider"></div>\n      <div class="pet-house-col">\n        <div class="pet-house-label">${getIcon("NFT Pet")} NFT Pets</div>\n        <div class="pet-house-list">${renderCol(nft, "No NFT pets yet.")}</div>\n      </div>\n    </div>`;
  wrap.querySelectorAll(".pet-house-chip").forEach(el => {
    el.onclick = () => {
      const id = el.dataset.pet;
      __set_petOpenId(petOpenId === id ? null : id);
      renderPetsPanel();
    };
  });
}

function renderPetAddForm() {
  const wrap = $("petAddFormWrap");
  if (!wrap) return;
  wrap.style.display = petAddOpen ? "block" : "none";
  if (!petAddOpen) return;
  const typeToggle = `\n    <div class="type-toggle" id="petAddTypeMode">\n      <button type="button" data-mode="common" class="${!petAddIsNFT ? "active" : ""}">${getIcon("Barkley")} Common Pet</button>\n      <button type="button" data-mode="nft" class="${petAddIsNFT ? "active" : ""}">${getIcon("NFT Pet")} NFT Pet</button>\n    </div>`;
  let body = "";
  const typeList = petAddIsNFT ? PET_NFT_TYPES : PET_COMMON_TYPES;
  if (petAddStep === "type" || !petAddType) {
    body = `\n      <div class="pet-add-cats-label">Step 1 — Choose ${petAddIsNFT ? "NFT" : ""} type</div>\n      <div class="pet-cat-grid">\n        ${typeList.map(t => `<button type="button" class="pet-cat-btn pet-type-btn" data-type="${t}">${PET_TYPE_EMOJI[t] || "🐾"} ${t}</button>`).join("")}\n      </div>`;
  } else if (!petAddIsNFT && petAddStep === "name") {
    const names = PET_NAMES_BY_TYPE[petAddType] || [];
    body = `\n      <div class="pet-add-cats-label">Step 2 — Choose ${escapeHtml(petAddType)}'s name <button type="button" class="pet-back-btn" id="petAddBackBtn">← back</button></div>\n      <div class="pet-cat-grid">\n        ${names.map(n => `<button type="button" class="pet-cat-btn pet-name-btn" data-name="${n}">${getPetIcon({
      name: n,
      petType: petAddType
    })} ${n}</button>`).join("")}\n      </div>`;
  } else if (petAddStep === "details") {
    const cat = PET_CATEGORIES[petAddType];
    const catBadges = `\n      <span class="pet-trait">${PET_CATEGORY_ICON[cat.primary]} ${cat.primary} (primary)</span>\n      <span class="pet-trait">${PET_CATEGORY_ICON[cat.secondary]} ${cat.secondary} (secondary)</span>\n      ${cat.tertiary ? `<span class="pet-trait">${PET_CATEGORY_ICON[cat.tertiary]} ${cat.tertiary} (tertiary, Lv25+)</span>` : ""}`;
    body = `\n      <div class="pet-add-cats-label">Step ${petAddIsNFT ? 2 : 3} — Details for ${petAddName ? getPetIcon({
      name: petAddName,
      petType: petAddType
    }) : PET_TYPE_EMOJI[petAddType] || ""} ${escapeHtml(petAddType)}${petAddName ? " [" + escapeHtml(petAddName) + "]" : ""} <button type="button" class="pet-back-btn" id="petAddBackBtn">← back</button></div>\n      <div class="pet-card-traits" style="margin-bottom:8px;">${catBadges}</div>\n      <div class="pet-add-fields">\n        ${petAddIsNFT ? `<label class="pet-add-label">NFT # / Nickname<input type="text" id="petAddNftName" placeholder="e.g. 2921"></label>` : ""}\n        <label class="pet-add-label">Level<input type="number" id="petAddLevel" min="1" max="300" value="1"></label>\n        ${petAddIsNFT ? `\n          <div class="pet-add-label"><span>Aura</span><button type="button" class="bud-dropdown-toggle pet-trait-toggle" id="petAddAuraToggle"></button></div>\n          <div class="pet-add-label"><span>Bib</span><button type="button" class="bud-dropdown-toggle pet-trait-toggle" id="petAddBibToggle"></button></div>\n        ` : ""}\n      </div>\n      <button type="button" class="btn-sun" id="petAddCreateBtn" style="margin-top:8px;">✅ Create Pet</button>`;
  }
  wrap.innerHTML = `<div class="pet-add-form">${typeToggle}${body}</div>`;
  $("petAddTypeMode").querySelectorAll("button").forEach(btn => {
    btn.onclick = () => {
      __set_petAddIsNFT(btn.dataset.mode === "nft");
      petResetAddFlow();
      renderPetAddForm();
    };
  });
  wrap.querySelectorAll(".pet-type-btn").forEach(btn => {
    btn.onclick = () => {
      __set_petAddType(btn.dataset.type);
      __set_petAddStep(petAddIsNFT ? "details" : "name");
      renderPetAddForm();
    };
  });
  wrap.querySelectorAll(".pet-name-btn").forEach(btn => {
    btn.onclick = () => {
      __set_petAddName(btn.dataset.name);
      __set_petAddStep("details");
      renderPetAddForm();
    };
  });
  const backBtn = $("petAddBackBtn");
  if (backBtn) backBtn.onclick = () => {
    if (petAddStep === "details") __set_petAddStep(petAddIsNFT ? "type" : "name"); else if (petAddStep === "name") __set_petAddStep("type");
    renderPetAddForm();
  };
  const auraToggle = $("petAddAuraToggle");
  if (auraToggle) {
    const info = petAuraInfoText(petAddAuraValue);
    auraToggle.textContent = petAddAuraValue + (info !== "No bonus" ? " — " + info : "");
    auraToggle.onclick = () => openPetTraitPicker("aura");
  }
  const bibToggle = $("petAddBibToggle");
  if (bibToggle) {
    const info = petBibInfoText(petAddBibValue);
    bibToggle.textContent = petAddBibValue + (info !== "No bonus" ? " — " + info : "");
    bibToggle.onclick = () => openPetTraitPicker("bib");
  }
  const createBtn = $("petAddCreateBtn");
  if (createBtn) createBtn.onclick = () => {
    const level = Math.max(1, parseInt($("petAddLevel").value) || 1);
    const cat = PET_CATEGORIES[petAddType];
    const name = petAddIsNFT ? ($("petAddNftName").value || "").trim() || "Pet #" + Math.floor(1e3 + Math.random() * 9e3) : petAddName;
    const pet = {
      id: "pet_" + Date.now() + "_" + Math.floor(Math.random() * 1e3),
      isNFT: petAddIsNFT,
      petType: petAddType,
      name: name,
      level: level,
      categories: cat,
      aura: petAddIsNFT ? petAddAuraValue : "No Aura",
      bib: petAddIsNFT ? petAddBibValue : "No Bib"
    };
    petsData.push(pet);
    savePetsData();
    __set_petAddOpen(false);
    petResetAddFlow();
    __set_petOpenId(pet.id);
    toast(`✅ ${pet.petType} [${pet.name}] created!`);
    renderPetsPanel();
  };
}

function openPetTraitPicker(kind) {
  const options = kind === "aura" ? PET_AURA_TRAITS : PET_BIB_TRAITS;
  const selected = kind === "aura" ? petAddAuraValue : petAddBibValue;
  __set_petTraitPickerKind(kind);
  $("petTraitPickerTitle").textContent = "Select " + (kind === "aura" ? "Aura" : "Bib");
  $("petTraitPickerSub").textContent = "Tap one to select it — multipliers/bonuses shown apply per feed (NFT pets only).";
  $("petTraitPickerList").innerHTML = options.map(o => {
    const info = kind === "aura" ? petAuraInfoText(o) : petBibInfoText(o);
    return `<div class="bud-picker-option pet-trait-option${o === selected ? " selected" : ""}" data-value="${escapeHtml(o)}">\n      <span class="pet-trait-opt-text">\n        <span class="pet-trait-opt-name">${escapeHtml(o)}</span>\n        <span class="pet-trait-opt-info">${escapeHtml(info)}</span>\n      </span>\n      <span class="bud-opt-radio"></span>\n    </div>`;
  }).join("");
  $("petTraitPickerList").querySelectorAll("[data-value]").forEach(el => {
    el.onclick = () => {
      if (petTraitPickerKind === "aura") __set_petAddAuraValue(el.dataset.value); else __set_petAddBibValue(el.dataset.value);
      closePetTraitPicker();
      renderPetAddForm();
    };
  });
  $("petTraitPickerOverlay").classList.add("show");
}

export function closePetTraitPicker() {
  $("petTraitPickerOverlay").classList.remove("show");
  __set_petTraitPickerKind(null);
}

function renderPetCard(pet) {
  const calc = petComputeCardCached(pet);
  const cat = pet.categories || PET_CATEGORIES[pet.petType] || {};
  const badge = pet.isNFT ? `<span class="pet-badge pet-badge-nft">${getIcon("NFT Pet")} NFT</span>` : `<span class="pet-badge pet-badge-common">${getIcon("Barkley")} Common</span>`;
  const typeBadge = `<span class="pet-trait pet-trait-type">${getPetIcon(pet)} ${escapeHtml(pet.petType)}</span>`;
  const catTraits = [ cat.primary, cat.secondary, cat.tertiary ].filter(Boolean).map(c => `<span class="pet-trait">${PET_CATEGORY_ICON[c]} ${c}</span>`).join("");
  const auraBib = pet.isNFT ? `<div class="pet-card-line">✨ ${escapeHtml(pet.aura)}${petAuraInfoText(pet.aura) !== "No bonus" ? " (" + petAuraInfoText(pet.aura) + ")" : ""} &nbsp; 👔 ${escapeHtml(pet.bib)}${petBibInfoText(pet.bib) !== "No bonus" ? " (" + petBibInfoText(pet.bib) + ")" : ""}</div>` : "";
  const rows = calc.rows.filter(r => r.tradable).map(r => `\n    <div class="pet-yield-row">\n      <span class="pet-yield-name">${getPetResourceIcon(r.name)} ${escapeHtml(r.name)}</span>\n      <span class="pet-yield-qty">${fmt(r.totalYield)}u</span>\n      <span class="pet-yield-price">${r.tradable ? fmt(r.marketPrice) + " " + FLOWER_ICON + "/u" : "not tradable"}</span>\n      <span class="pet-yield-price">${r.tradable ? fmt(r.costPerUnit) + " " + FLOWER_ICON + "/u" : "—"}</span>\n    </div>\n    <div class="pet-fetch-breakdown pet-fetch-breakdown-full">\n      <span>Total Yield: <b>${fmt(r.totalYield)}u ${escapeHtml(r.name)}</b></span>\n      <span>Gross: <b class="${r.gross >= 0 ? "is-profit" : ""}">${fmt(r.gross)} ${FLOWER_ICON}</b></span>\n      <span class="pet-fetch-deductions-label">Total Deductions</span>\n      <span>&nbsp;&nbsp;Total cost: <b class="is-loss">-${fmt(calc.dailyFoodCostFlower)} ${FLOWER_ICON}</b></span>\n      <span>&nbsp;&nbsp;Restock cost: <b>0 ${FLOWER_ICON}</b></span>\n      <span>&nbsp;&nbsp;Shrine cost: <b>0 ${FLOWER_ICON}</b></span>\n      <span>&nbsp;&nbsp;Sell fee: <b class="is-loss">-${fmt(r.sellFee)} ${FLOWER_ICON}</b></span>\n      <span>Net: <b class="${r.net >= 0 ? "is-profit" : "is-loss"}">${r.net >= 0 ? "+" : ""}${fmt(r.net)} ${FLOWER_ICON}</b></span>\n    </div>`).join("");
  const nonTradableRows = calc.rows.filter(r => !r.tradable).map(r => `\n    <div class="pet-yield-row">\n      <span class="pet-yield-name">${getPetResourceIcon(r.name)} ${escapeHtml(r.name)}</span>\n      <span class="pet-yield-qty">${fmt(r.totalYield)}u</span>\n      <span class="pet-yield-price">not tradable</span>\n      <span class="pet-yield-price">${fmt(r.costPerUnit)} ${FLOWER_ICON}/u</span>\n    </div>`).join("");
  const deleteControl = pet.synced ? `<span class="pet-lock-badge" title="Auto-synced from your farm — remove by selling/unplacing it in-game">🔒 Synced</span>` : `<button type="button" class="pet-delete-btn" data-pet="${pet.id}" title="Remove pet">✕</button>`;
  return `\n    <div class="pet-card" data-pet="${pet.id}">\n      <div class="pet-card-head">\n        <div class="pet-card-name">${escapeHtml(pet.petType)} <span class="pet-card-name-bracket">[${escapeHtml(pet.name)}]</span> ${badge}</div>\n        ${deleteControl}\n      </div>\n      <div class="pet-card-traits">${typeBadge}${catTraits}</div>\n      <div class="pet-card-line">⬆️ Level ${pet.level}</div>\n      ${auraBib}\n      <div class="pet-card-stats">\n        <div>XP/day: <b>${fmt(calc.dailyXp)}</b></div>\n        <div>Energy/day: <b>${fmt(calc.dailyEnergy)}</b>⚡</div>\n        <div>Avg feed cost: <b>${fmt(calc.dailyFoodCostFlower)}</b> ${FLOWER_ICON}</div>\n      </div>\n      <div class="pet-section-title">📦 24h Profit/Loss per fetch resource <span class="pet-profit-sub">(if all daily energy is spent on that resource)</span></div>\n      <div class="pet-yield-header">\n        <span>Resource</span><span>Yield</span><span>Sell/u</span><span>Cost/u</span>\n      </div>\n      ${rows || `<div class="pet-house-empty">No tradable fetch resources unlocked yet.</div>`}\n      ${calc.bestRow ? `<div class="pet-card-line is-profit" style="margin-top:6px;">🏆 Best resource: <b>${escapeHtml(calc.bestRow.name)}</b> (${calc.bestRow.net >= 0 ? "+" : ""}${fmt(calc.bestRow.net)} ${FLOWER_ICON} net/day)</div>` : ""}\n      ${nonTradableRows ? `\n      <div class="pet-section-title">🌰 Non-tradable Yield (24h) <span class="pet-profit-sub">(shrine ingredients — no sell price, so kept out of profit/loss)</span></div>\n      <div class="pet-yield-header">\n        <span>Resource</span><span>Yield</span><span>Sell/u</span><span>Cost/u</span>\n      </div>\n      ${nonTradableRows}` : ""}\n    </div>`;
}

function renderPetCards() {
  const wrap = $("petCardsWrap");
  if (!wrap) return;
  if (!petsData.length) {
    wrap.innerHTML = `<div class="pet-house-empty">No pets yet — tap "➕ Add Pet" above to add your first one.</div>`;
    return;
  }
  const openPet = petsData.find(p => p.id === petOpenId);
  wrap.innerHTML = openPet ? renderPetCard(openPet) : `<div class="pet-info-badge pet-info-badge-alt">Tap a pet in the Pet House above to view its card.</div>`;
  wrap.querySelectorAll(".pet-delete-btn").forEach(btn => {
    btn.onclick = () => {
      const target = petsData.find(p => p.id === btn.dataset.pet);
      if (target && target.synced) return;
      __set_petsData(petsData.filter(p => p.id !== btn.dataset.pet));
      savePetsData();
      if (petOpenId === btn.dataset.pet) __set_petOpenId(null);
      renderPetsPanel();
    };
  });
}

export function renderPetFoodTabs() {
  const tabWrap = $("petFoodTabToggle");
  const listWrap = $("petFoodTabList");
  if (!tabWrap || !listWrap) return;
  tabWrap.innerHTML = [ "easy", "medium", "hard" ].map(t => `<button type="button" data-tab="${t}" class="${petsFoodTab === t ? "active" : ""}">${t === "easy" ? "🥕 EASY FOOD" : t === "medium" ? "🍲 MEDIUM FOOD" : "🍰 HARD FOOD"}</button>`).join("");
  tabWrap.querySelectorAll("button").forEach(btn => {
    btn.onclick = () => setPetsFoodTab(btn.dataset.tab);
  });
  const base = PET_BASE_XP_ENERGY[petsFoodTab];
  const foods = PET_FOOD_LISTS[petsFoodTab];
  listWrap.innerHTML = `\n    <div class="pet-food-header pet-info-badge">+${base} XP &nbsp; +${base}⚡ &nbsp; per feed base</div>\n    <div class="pet-food-grid">${foods.map(f => {
    const checked = isPetFoodChecked(f);
    const cost = petFoodCostCoins(f);
    return `<label class="pet-food-item">\n        <input type="checkbox" class="pet-food-check" data-food="${escapeHtml(f)}" ${checked ? "checked" : ""}>\n        <span class="pet-food-name">${cookFoodIcon(f)} ${escapeHtml(f)}</span>\n        <span class="pet-food-cost">${fmt(cost)} ${COIN_ICON}</span>\n      </label>`;
  }).join("")}</div>`;
  listWrap.querySelectorAll(".pet-food-check").forEach(cb => {
    cb.onchange = () => {
      petFoodChecks[cb.dataset.food] = cb.checked;
      savePetFoodChecks();
      renderPetsPanel();
    };
  });
}

export function renderPetsPanel() {
  if (!$("petProfitList")) return;
  petCalcCacheReset();
  renderPetTotalYield();
  renderPetProfitability();
  renderPetAddForm();
  renderPetHouse();
  renderPetCards();
  renderPetFoodTabs();
  const toggleBtn = $("petAddToggleBtn");
  if (toggleBtn && !toggleBtn.dataset.wired) {
    toggleBtn.dataset.wired = "1";
    toggleBtn.onclick = () => {
      __set_petAddOpen(!petAddOpen);
      if (petAddOpen) petResetAddFlow();
      renderPetsPanel();
    };
  }
}

function renderPatternChip(shape, confirmed, guaranteed) {
  const xs = shape.map(c => c.x), ys = shape.map(c => c.y);
  const minX = Math.min.apply(null, xs), maxX = Math.max.apply(null, xs);
  const minY = Math.min.apply(null, ys), maxY = Math.max.apply(null, ys);
  const w = maxX - minX + 1, h = maxY - minY + 1;
  const map = new Map(shape.map(c => [ c.x - minX + "," + (c.y - minY), c.name ]));
  let cellsHtml = "";
  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      const name = map.get(x + "," + y);
      cellsHtml += `<div class="dig-pattern-chip-cell">${name ? getIcon(name) : ""}</div>`;
    }
  }
  const cls = confirmed ? "dig-pattern-chip is-confirmed" : guaranteed ? "dig-pattern-chip is-guaranteed" : "dig-pattern-chip";
  const badge = confirmed ? `<span class="dig-pattern-chip-badge" title="Pattern found">✓</span>` : guaranteed ? `<span class="dig-pattern-chip-badge is-guaranteed" title="Pattern located — not yet fully dug">✓</span>` : "";
  return `<div class="${cls}" style="grid-template-columns:repeat(${w}, 18px);grid-template-rows:repeat(${h}, 18px);">${cellsHtml}${badge}</div>`;
}

function renderDigCellHtml(cell, farmId) {
  let manualStatus = null;
  if (!cell.dug) {
    manualStatus = digGetManualMark(farmId, cell.x, cell.y);
    if (manualStatus && DIG_MANUAL_MARK_OVERRIDE_STATUSES.indexOf(cell.status) !== -1) {
      digClearManualMark(farmId, cell.x, cell.y);
      manualStatus = null;
    }
  }
  const displayStatus = manualStatus || cell.status;
  const clsCell = manualStatus ? Object.assign({}, cell, { status: displayStatus }) : cell;
  const cls = digCellClass(clsCell) + (manualStatus ? " dig-cell-manual" : "");
  let icon = "";
  let label = cell.dug ? cell.item : displayStatus;
  if (cell.dug) {
    icon = getIcon(cell.item);
  } else if (manualStatus === "guaranteed") {
    label = "Marked by you — guaranteed treasure";
  } else if (manualStatus === "possible") {
    label = "Marked by you — possible treasure";
  } else if (manualStatus === "empty") {
    label = "Marked by you — no treasure";
  } else if (displayStatus === "guaranteed") {
    if (cell.predicted) {
      icon = getIcon(cell.predicted.item);
      label = cell.predicted.formation ? `Dig here → ${cell.predicted.item} — completes ${cell.predicted.formation}` : `Dig here → ${cell.predicted.item}`;
    } else {
      label = "Dig here — guaranteed treasure";
    }
  } else if (displayStatus === "crab") {
    icon = getIcon("Crab");
    label = "Provably no treasure, borders one — will reveal a Crab";
  } else if (displayStatus === "sand") {
    icon = getIcon("Sand");
    label = "Provably no treasure nearby — will reveal Sand";
  } else if (displayStatus === "empty") {
    label = "No treasure here — a Sand clue borders this tile";
  } else if (displayStatus === "possible") {
    label = "Possible treasure — a Crab clue borders this tile";
  } else {
    label = "No clue nearby yet";
  }
  const dataAttrs = cell.dug ? "" : ` data-dig-x="${cell.x}" data-dig-y="${cell.y}"`;
  const seqBadge = cell.dug && cell.seq > 0 ? `<span class="dig-seq">${cell.seq}</span>` : "";
  if (cell.dug && cell.seq > 0) label = `${label} · dig #${cell.seq}`;
  return `<div class="dig-cell ${cls}" title="${escapeHtml(String(label))}"${dataAttrs}>${icon}${seqBadge}</div>`;
}

function renderDigGridHtml(solved, farmId) {
  const cols = "ABCDEFGHIJ";
  let html = `<div class="dig-grid-label"></div>`;
  for (let x = 0; x < 10; x++) html += `<div class="dig-grid-label">${cols[x]}</div>`;
  for (let y = 0; y < 10; y++) {
    html += `<div class="dig-grid-label">${y + 1}</div>`;
    for (let x = 0; x < 10; x++) {
      html += renderDigCellHtml(solved.cells[y][x], farmId);
    }
  }
  return html;
}

function wireDigGridManualTaps(gridEl, farmId) {
  gridEl.querySelectorAll(".dig-cell[data-dig-x]").forEach(cellEl => {
    cellEl.onclick = () => {
      const x = parseInt(cellEl.dataset.digX, 10);
      const y = parseInt(cellEl.dataset.digY, 10);
      digCycleManualMark(farmId, x, y);
      refreshDigPanelGridAndStatus(farmId);
    };
  });
}

function refreshDigPanelGridAndStatus(farmId) {
  const gridEl = $("digPanelGrid");
  const statusEl = $("digPanelStatus");
  if (!gridEl || !statusEl) return;
  const solved = digSolveBoard();
  gridEl.innerHTML = renderDigGridHtml(solved, farmId);
  wireDigGridManualTaps(gridEl, farmId);
  const flatCells = [].concat.apply([], solved.cells);
  const guaranteedCount = flatCells.filter(c => !c.dug && c.status === "guaranteed").length;
  const possibleCount = flatCells.filter(c => !c.dug && c.status === "possible").length;
  const emptyCount = flatCells.filter(c => !c.dug && c.status === "empty").length;
  const crabPredictedCount = flatCells.filter(c => !c.dug && c.status === "crab").length;
  const sandPredictedCount = flatCells.filter(c => !c.dug && c.status === "sand").length;
  statusEl.textContent = solved.dugCount ? `${solved.dugCount} tile(s) dug so far · ${solved.confirmedCount} pattern(s) confirmed · ${guaranteedCount} guaranteed spot(s) · ${possibleCount} possible spot(s) · ${emptyCount} safe-empty · ${crabPredictedCount} predicted crab(s) · ${sandPredictedCount} predicted sand` : "No dig data synced yet — dig a few tiles in-game, then sync.";
}

export function renderDigTreasurePanel() {
  const chapterEl = $("digPanelChapter");
  const patternsEl = $("digPanelPatterns");
  const gridEl = $("digPanelGrid");
  const statusEl = $("digPanelStatus");
  if (!chapterEl || !patternsEl || !gridEl || !statusEl) return;
  if (statusEl) statusEl.textContent = "Loading dig data…";
  const token = __preinc_digPanelRenderToken();
  setTimeout(() => {
    if (token !== digPanelRenderToken) return;
    const solved = digSolveBoard();
    const lastInfo = typeof farmPanelGetLastInfo === "function" ? farmPanelGetLastInfo() : null;
    const farmLabel = lastInfo && lastInfo.id ? `Farm #${lastInfo.id}` : "No farm synced";
    chapterEl.innerHTML = `${escapeHtml(farmLabel)} · ${escapeHtml(solved.chapterName)}<br>Chapter artefact: ${getIcon(solved.artefactName)} ${escapeHtml(solved.artefactName)}`;
    patternsEl.innerHTML = solved.instances.length ? solved.instances.map((inst, i) => renderPatternChip(inst.shape, !!solved.completedByIndex[i], !!solved.guaranteedByIndex[i])).join("") : `<div class="dig-panel-status">No active pattern data yet — sync your farm.</div>`;
    refreshDigPanelGridAndStatus(digGetFarmId());
    renderDigDataPanel(solved);
  }, 0);
}

export function openDigPanel() {
  closeOtherHeaderPanels("digPanelOverlay");
  const overlay = $("digPanelOverlay");
  const panel = $("digSidePanel");
  if (overlay) overlay.classList.add("show");
  if (panel) panel.classList.add("open");
  const statusEl = $("digPanelStatus");
  const gridEl = $("digPanelGrid");
  const patternsEl = $("digPanelPatterns");
  if (statusEl) statusEl.textContent = "Loading dig data…";
  if (gridEl) gridEl.innerHTML = "";
  if (patternsEl) patternsEl.innerHTML = "";
  if (typeof refreshSflThemeClass === "function") refreshSflThemeClass();
  requestAnimationFrame(() => {
    renderDigTreasurePanel();
  });
  syncModalRoute("digging", true);
}

export function closeDigPanel() {
  const overlay = $("digPanelOverlay");
  const panel = $("digSidePanel");
  if (overlay) overlay.classList.remove("show");
  if (panel) panel.classList.remove("open");
  if (typeof refreshSflThemeClass === "function") refreshSflThemeClass();
  syncModalRoute("digging", false);
}

function renderPotionSolutionChip(candidates, consistentCount, attemptCount) {
  if (attemptCount === 0 || consistentCount === 0) {
    return `<div class="potion-solution-chip">?</div>`;
  }
  if (candidates.length === 1) {
    const icon = POTION_ICONS[candidates[0]];
    return `<div class="potion-solution-chip is-confirmed" title="${escapeHtml(candidates[0])}"><img class="potion-bottle-icon" src="${icon}" alt="${escapeHtml(candidates[0])}"><span class="potion-solution-chip-badge">✓</span></div>`;
  }
  return `<div class="potion-solution-chip" title="${candidates.length} potions still possible">?<span class="potion-solution-chip-count">${candidates.length}</span></div>`;
}

function renderPotionBottleSwatch(potionName) {
  if (!potionName) return `<span class="potion-bottle-empty">?</span>`;
  return `<img class="potion-bottle-icon" src="${POTION_ICONS[potionName]}" alt="${escapeHtml(potionName)}" title="${escapeHtml(potionName)}">`;
}

function renderPotionAttemptRow(attempt, rowLabel) {
  const cellsHtml = [ 0, 1, 2, 3 ].map(i => {
    const slot = attempt ? attempt[i] : null;
    const potionName = slot ? slot.potion : null;
    const status = slot ? slot.status : null;
    const badge = status ? `<img class="potion-result-icon is-${status}" src="${potionStatusBadgeIcon(status)}" alt="${potionStatusLabel(status)}">` : "";
    return `<div class="potion-bottle">${renderPotionBottleSwatch(potionName)}${badge}</div>`;
  }).join("");
  return `<div class="potion-attempt-row"><span class="potion-attempt-row-label">${escapeHtml(rowLabel)}</span>${cellsHtml}</div>`;
}

export function renderPotionRoomPanel() {
  const statusEl = $("potionPanelStatus");
  const solutionEl = $("potionPanelSolution");
  const attemptsEl = $("potionPanelAttempts");
  const guessRowEl = $("potionPanelGuessRow");
  const pickerEl = $("potionPanelPicker");
  if (!statusEl || !solutionEl || !attemptsEl || !guessRowEl || !pickerEl) return;
  renderPotionDataPanel();
  const solve = potionSolveState();
  const lastInfo = typeof farmPanelGetLastInfo === "function" ? farmPanelGetLastInfo() : null;
  const farmLabel = lastInfo && lastInfo.id ? `Farm #${lastInfo.id}` : "No farm synced";
  if (!solve.game) {
    statusEl.textContent = `${farmLabel} · Sync your farm to load potion data`;
  } else if (solve.game.status === "in_progress") {
    const multText = solve.game.multiplier && solve.game.multiplier > 1 ? ` · ${solve.game.multiplier}x` : "";
    statusEl.textContent = `${farmLabel} · Attempt ${solve.attemptCount}/3${multText}`;
  } else {
    statusEl.textContent = `${farmLabel} · Last game finished — sync again after starting a new one`;
  }
  if (solve.attemptCount > 0 && solve.consistentCount === 0) {
    statusEl.textContent += " · Feedback didn't match our model, showing all potions as unknown";
  }
  solutionEl.innerHTML = [ 0, 1, 2, 3 ].map(i => renderPotionSolutionChip(solve.slotCandidates[i], solve.consistentCount, solve.attemptCount)).join("");
  const reversedAttempts = solve.attempts.slice().reverse();
  const attemptRowsHtml = [];
  for (let i = 0; i < 3; i++) {
    const attempt = reversedAttempts[i] || null;
    const attemptNumber = attempt ? solve.attempts.length - i : null;
    attemptRowsHtml.push(renderPotionAttemptRow(attempt, attemptNumber ? `#${attemptNumber}` : "—"));
  }
  attemptsEl.innerHTML = attemptRowsHtml.join("");
  if (potionActiveGuessSlot > 3) potionSetActiveGuessSlot(0);
  const activeSlot = potionActiveGuessSlot;
  guessRowEl.innerHTML = [ 0, 1, 2, 3 ].map(i => {
    const candidates = solve.slotCandidates[i];
    const activeCls = i === activeSlot ? " is-active" : "";
    let inner;
    if (solve.attemptCount === 0 || solve.consistentCount === 0) {
      inner = `<span class="potion-bottle-empty">?</span>`;
    } else if (candidates.length === 1) {
      inner = renderPotionBottleSwatch(candidates[0]);
    } else {
      inner = `<span class="potion-bottle-empty">${candidates.length}</span>`;
    }
    return `<div class="potion-bottle potion-guess-slot${activeCls}" data-slot="${i}">${inner}</div>`;
  }).join("");
  guessRowEl.querySelectorAll(".potion-guess-slot").forEach(el => {
    el.onclick = () => potionSetActiveGuessSlot(Number(el.dataset.slot));
  });
  const confirmedChaos = solve.chaosCandidates.length === 1 ? solve.chaosCandidates[0] : null;
  const activeCandidates = solve.slotCandidates[activeSlot];
  const hasInfo = solve.attemptCount > 0 && solve.consistentCount > 0;
  let pickerNames = POTION_NAMES;
  if (hasInfo) {
    let narrowed = activeCandidates.filter(name => name !== confirmedChaos);
    if (narrowed.length === 0) narrowed = activeCandidates;
    pickerNames = narrowed;
  }
  const confirmedElsewhere = new Set;
  if (hasInfo) {
    for (let s = 0; s < 4; s++) {
      if (s === activeSlot) continue;
      if (solve.slotCandidates[s].length === 1) confirmedElsewhere.add(solve.slotCandidates[s][0]);
    }
  }
  pickerEl.innerHTML = pickerNames.map(name => {
    const cls = hasInfo ? pickerNames.length === 1 ? " is-correct" : " is-maybe" : "";
    const isRepeat = confirmedElsewhere.has(name);
    const title = isRepeat ? `${name} — already confirmed in another slot, could repeat here` : name;
    const badge = isRepeat ? `<span class="potion-picker-repeat-badge" title="Already confirmed in another slot">🔁</span>` : "";
    return `<div class="potion-picker-bottle${cls}" title="${escapeHtml(title)}"><img class="potion-bottle-icon" src="${POTION_ICONS[name]}" alt="${escapeHtml(name)}">${badge}</div>`;
  }).join("");
  const optimalEl = $("potionPanelOptimalGuess");
  if (optimalEl) {
    if (solve.optimalGuess) {
      const og = solve.optimalGuess;
      const bottles = og.code.map(name => `<div class="potion-solution-row-bottle">${renderPotionBottleSwatch(name)}</div>`).join("");
      const attemptsLeft = 3 - solve.attemptCount;
      const urgencyText = attemptsLeft <= 1 ? "This is your last attempt — " : "";
      const upsideText = og.maxScore > og.guaranteedMinScore ? ` (up to ${og.maxScore}/100 if it's the exact code)` : "";
      optimalEl.innerHTML = `<div class="potion-panel-solutions-label">🎯 ${urgencyText}Best guess to maximize your score — guaranteed at least ${og.guaranteedMinScore}/100${upsideText}, and never risks a bomb:</div><div class="potion-solution-row-list"><div class="potion-solution-row is-top-pick">${bottles}<span class="potion-solution-row-badge">Recommended</span></div></div>`;
    } else {
      optimalEl.innerHTML = "";
    }
  }
  const solutionsEl = $("potionPanelSolutions");
  if (solutionsEl) {
    const allCodes = solve.consistentCodes || [];
    const codes = confirmedChaos ? allCodes.filter(entry => !entry.code.includes(confirmedChaos)) : allCodes;
    const unsolvedSlots = solve.slotCandidates.filter(c => c.length > 1).length;
    if (hasInfo && unsolvedSlots > 0 && codes.length > 1 && codes.length <= 24) {
      const rowsHtml = codes.map(entry => {
        const bottles = entry.code.map(name => `<div class="potion-solution-row-bottle">${renderPotionBottleSwatch(name)}</div>`).join("");
        const pctText = entry.weight > 0 ? `${Math.round(entry.weight * 100)}%` : "";
        const topCls = entry.isTopPick ? " is-top-pick" : "";
        const badge = entry.isTopPick ? `<span class="potion-solution-row-badge">★ Highest odds${pctText ? " · " + pctText : ""}</span>` : pctText ? `<span class="potion-solution-row-pct">${pctText}</span>` : "";
        return `<div class="potion-solution-row${topCls}">${bottles}${badge}</div>`;
      }).join("");
      solutionsEl.innerHTML = `<div class="potion-panel-solutions-label">${codes.length} full combinations still fit your feedback — the code is exactly one of these, no way to tell which without another attempt. The starred combination is statistically most likely given your feedback so far:</div><div class="potion-solution-row-list">${rowsHtml}</div>`;
    } else {
      solutionsEl.innerHTML = "";
    }
  }
}

export function openPotionPanel() {
  closeOtherHeaderPanels("potionPanelOverlay");
  const overlay = $("potionPanelOverlay");
  const panel = $("potionSidePanel");
  if (overlay) overlay.classList.add("show");
  if (panel) panel.classList.add("open");
  if (typeof refreshSflThemeClass === "function") refreshSflThemeClass();
  requestAnimationFrame(() => {
    renderPotionRoomPanel();
  });
  syncModalRoute("potion", true);
}

export function closePotionPanel() {
  const overlay = $("potionPanelOverlay");
  const panel = $("potionSidePanel");
  if (overlay) overlay.classList.remove("show");
  if (panel) panel.classList.remove("open");
  if (typeof refreshSflThemeClass === "function") refreshSflThemeClass();
  syncModalRoute("potion", false);
}

function renderProfileOverview() {
  const g = profileGetG();
  const info = farmPanelGetLastInfo();
  const displayName = profileGetDisplayName();
  const levelInfo = info.id ? cookGetLevelInfo(info.experience) : null;
  const levelText = !info.id ? "—" : levelInfo.isMax ? `${info.level || levelInfo.level} (MAX)<br><span class="profile-stat-value-sub"><span class="profile-xp-current">${fmtInt(levelInfo.progress)}</span><span class="profile-xp-sep">/</span><span class="profile-xp-max">- XP</span></span>` : `${info.level || levelInfo.level}<br><span class="profile-stat-value-sub"><span class="profile-xp-current">${fmt(levelInfo.progress)}</span><span class="profile-xp-sep">/</span><span class="profile-xp-max">${fmt(levelInfo.span)} XP</span></span>`;
  const expInfo = g ? profileGetExpansionInfo(g) : {
    islandLabel: "—",
    expansionLevel: 0,
    ascensionLevel: 0
  };
  const balance = Number(g && g.balance) || 0;
  const coins = Number(g && g.coins) || 0;
  const gems = g ? profileGetInventoryAmount(g, "Gem") : 0;
  const marks = g ? profileGetInventoryAmount(g, "Mark") : 0;
  const loveCharm = g ? profileGetInventoryAmount(g, "Love Charm") : 0;
  const cheers = g ? profileGetInventoryAmount(g, "Cheer") : 0;
  const taxInfo = g ? profileComputeWithdrawTax(g) : {
    taxFree: 0,
    percent: 0,
    taxAmount: 0,
    afterWithdrawal: 0
  };
  const createdText = g && g.createdAt ? new Date(g.createdAt).toLocaleDateString() : "—";
  const farmAgeText = g && g.createdAt ? profileGetFarmAgeText(g.createdAt) : "";
  const referrals = g && g.referrals && g.referrals.totalReferrals != null ? g.referrals.totalReferrals : 0;
  const telegramText = g && g.telegram && g.telegram.linkedAt ? "Connected" : "Not Connected";
  const discordText = g && g.discord && g.discord.connected ? "Connected" : "Not Connected";
  const farmValueFlower = g ? profileComputeFarmValue(g) : 0;
  const islandIconHtml = g && g.island && g.island.type ? `<img src="${esIslandIcon(g.island.type)}" class="profile-inline-icon" alt="">` : "";
  const factionIconHtml = profileFactionIconHtml();
  const repInfo = g ? profileGetReputation(g) : {
    tierName: "—",
    points: 0
  };
  $("profileTopSection").innerHTML = `\n    <div class="profile-bumpkin-frame">${profileBumpkinFrameHtml(g)}</div>\n    ${profileBumpkinIdHtml(g)}\n    <div class="profile-section-title">Farm Overview of ${escapeHtml(displayName)}</div>\n    <div class="profile-bumpkin-note" id="profileBumpkinNote">${profileBumpkinNoteText(g)}</div>\n    <div class="profile-stat-row"><span class="profile-stat-label">Name</span><span class="profile-stat-value">${escapeHtml(displayName)}</span></div>\n    <div class="profile-stat-row"><span class="profile-stat-label">Farm Id</span><span class="profile-stat-value">${escapeHtml(info.id || "—")}</span></div>\n    <div class="profile-stat-row"><span class="profile-stat-label">Bumpkin Level</span><span class="profile-stat-value">${levelText}</span></div>\n    <div class="profile-stat-row"><span class="profile-stat-label">VIP Status</span><span class="profile-stat-value">${profileVipHtml()}</span></div>\n    <div class="profile-stat-card">\n      <div class="profile-stat-card-row"><span class="profile-stat-label">Ascension</span><span class="profile-stat-value">[${fmtInt(expInfo.ascensionLevel)}]</span></div>\n      <div class="profile-stat-card-row"><span class="profile-stat-label">Island</span><span class="profile-stat-value">${islandIconHtml}${escapeHtml(expInfo.islandLabel)}</span></div>\n    </div>\n    <div class="profile-stat-row"><span class="profile-stat-label">Expansion Level</span><span class="profile-stat-value">${fmtInt(expInfo.expansionLevel)}</span></div>\n    <div class="profile-stat-row"><span class="profile-stat-label">Faction</span><span class="profile-stat-value">${factionIconHtml}${profileFactionHtml()}</span></div>\n    <div class="profile-stat-row"><span class="profile-stat-label">Reputation</span><span class="profile-stat-value">[${escapeHtml(repInfo.tierName)}][${fmtInt(repInfo.points)}]</span></div>\n\n    <div class="profile-balance-title">Balance</div>\n    <div class="profile-balance-grid">\n      <div class="profile-balance-chip">${FLOWER_ICON}<span class="profile-balance-chip-val">${fmt(balance)}</span></div>\n      <div class="profile-balance-chip">${COIN_ICON}<span class="profile-balance-chip-val">${fmt(coins)}</span></div>\n      <div class="profile-balance-chip">${GEM_ICON}<span class="profile-balance-chip-val">${fmt(gems)}</span></div>\n      <div class="profile-balance-chip"><img src="${MARK_ICON_SRC}" class="profile-inline-icon" alt="Marks"><span class="profile-balance-chip-val">${fmt(marks)}</span></div>\n      <div class="profile-balance-chip"><img src="${LOVE_CHARM_ICON_SRC}" class="profile-inline-icon" alt="Love Charm"><span class="profile-balance-chip-val">${fmt(loveCharm)}</span></div>\n      <div class="profile-balance-chip"><img src="${CHEER_ICON_SRC}" class="profile-inline-icon" alt="Cheer"><span class="profile-balance-chip-val">${fmt(cheers)}</span></div>\n    </div>\n\n    <div class="profile-stat-row"><span class="profile-stat-label">Resource Tax</span><span class="profile-stat-value">${fmt(feePercent)}%</span></div>\n    <div class="profile-stat-row"><span class="profile-stat-label">Withdraw Tax</span><span class="profile-stat-value">${fmt(taxInfo.percent)}%</span></div>\n    <div class="profile-stat-row"><span class="profile-stat-label">Tax Free</span><span class="profile-stat-value">${fmt(taxInfo.taxFree)} ${FLOWER_ICON}</span></div>\n    <div class="profile-stat-row"><span class="profile-stat-label">After Withdrawal</span><span class="profile-stat-value">${fmt(taxInfo.afterWithdrawal)} ${FLOWER_ICON}</span></div>\n\n    <div class="profile-stat-row"><span class="profile-stat-label">Created</span><span class="profile-stat-value">${createdText}${farmAgeText ? `<span class="profile-stat-value-sub">${escapeHtml(farmAgeText)}</span>` : ""}</span></div>\n    <div class="profile-stat-row"><span class="profile-stat-label">Referrals</span><span class="profile-stat-value">${fmtInt(referrals)}</span></div>\n    <div class="profile-stat-row"><span class="profile-stat-label">Telegram</span><span class="profile-stat-value">${telegramText}</span></div>\n    <div class="profile-stat-row"><span class="profile-stat-label">Discord</span><span class="profile-stat-value">${discordText}</span></div>\n\n    <div class="profile-farmvalue-card">\n      ${priceSourceBadgeHtml(livePriceSource)}\n      <div class="profile-farmvalue-label">FARM VALUE</div>\n      <div class="profile-farmvalue-amount">${FLOWER_ICON} ${fmt(farmValueFlower)}</div>\n      <div class="profile-farmvalue-usd">${profileFmtUsd(farmValueFlower)}</div>\n    </div>\n  `;
  const bumpkinImg = document.querySelector(".profile-bumpkin-render");
  if (bumpkinImg) {
    bumpkinImg.addEventListener("error", () => profileBumpkinImageOnError(bumpkinImg));
    bumpkinImg.addEventListener("load", () => {
      console.log("[BUMPKIN DEBUG] loaded successfully:", bumpkinImg.src);
      if (profileBumpkinCache.tokenUri === bumpkinImg.dataset.tokenUri) {
        profileBumpkinCache.status = "loaded";
        profileBumpkinCache.resolvedUrl = bumpkinImg.src;
        profileBumpkinCachePersist();
      }
    });
  }
}

function profileRenderBuildFilterBar(tabId) {
  const config = PROFILE_BUILD_FILTERS[tabId];
  if (!config) return "";
  const activeFilter = profileState.buildFilter || "all";
  const btnsHtml = config.options.map(opt => {
    const isAll = opt.id === "all";
    const iconHtml = isAll ? "" : getIcon(opt.icon);
    const labelHtml = opt.label ? `<span>${escapeHtml(opt.label)}</span>` : "";
    const cls = `profile-build-filter-btn${config.mode === "icon" ? " is-icon" : ""}${isAll ? " has-label" : ""}${activeFilter === opt.id ? " active" : ""}`;
    return `<button type="button" class="${cls}" data-build-filter="${opt.id}" title="${escapeHtml(opt.label || opt.icon || "")}">${iconHtml}${labelHtml}</button>`;
  }).join("");
  return `<div class="profile-build-filter-bar${config.mode === "icon" ? " is-icon" : ""}" id="profileBuildFilterBar">${btnsHtml}</div>`;
}

function renderProfileBuild() {
  const displayName = profileGetDisplayName();
  const tabs = profileGetMainTabMeta();
  if (!tabs.some(t => t.id === profileState.buildTab)) profileState.buildTab = tabs[0] ? tabs[0].id : "crops";
  const tabsHtml = tabs.map(t => `<button type="button" data-tab="${t.id}" class="${t.id === profileState.buildTab ? "active" : ""}">${t.html}</button>`).join("");
  $("profileTopSection").innerHTML = `\n    <div class="profile-section-title">${escapeHtml(displayName)}'s Build!</div>\n    <div class="profile-tabgrid" id="profileBuildTabs">${tabsHtml}</div>\n    <div id="profileBuildFilterWrap">${profileRenderBuildFilterBar(profileState.buildTab)}</div>\n    <div class="profile-build-divider"></div>\n    <div id="profileBuildContent">${profileRenderBuildColumns(profileState.buildTab, profileState.buildFilter)}</div>\n  `;
  $("profileBuildTabs").querySelectorAll("button[data-tab]").forEach(btn => {
    btn.onclick = () => {
      profileState.buildTab = btn.dataset.tab;
      profileState.buildFilter = "all";
      $("profileBuildTabs").querySelectorAll("button[data-tab]").forEach(b => b.classList.toggle("active", b.dataset.tab === profileState.buildTab));
      $("profileBuildFilterWrap").innerHTML = profileRenderBuildFilterBar(profileState.buildTab);
      attachProfileBuildFilterHandlers();
      $("profileBuildContent").innerHTML = profileRenderBuildColumns(profileState.buildTab, profileState.buildFilter);
    };
  });
  attachProfileBuildFilterHandlers();
  profileBackNav();
}

function attachProfileBuildFilterHandlers() {
  const bar = $("profileBuildFilterBar");
  if (!bar) return;
  bar.querySelectorAll("button[data-build-filter]").forEach(btn => {
    btn.onclick = () => {
      profileState.buildFilter = btn.dataset.buildFilter;
      bar.querySelectorAll("button[data-build-filter]").forEach(b => b.classList.toggle("active", b.dataset.buildFilter === profileState.buildFilter));
      $("profileBuildContent").innerHTML = profileRenderBuildColumns(profileState.buildTab, profileState.buildFilter);
    };
  });
}

export function renderProfileTradable() {
  const displayName = profileGetDisplayName();
  const g = profileGetG();
  const total = g ? profileTradableTotalFlower(g) : 0;
  const tabsHtml = PROFILE_TRADABLE_TABS.map(t => `<button type="button" data-tab="${t.id}" class="${t.id === profileState.tradableTab ? "active" : ""}">${escapeHtml(t.label)}</button>`).join("");
  const rows = g ? profileTradableRowsForTab(g, profileState.tradableTab) : [];
  const activeTabLabel = (PROFILE_TRADABLE_TABS.find(t => t.id === profileState.tradableTab) || {}).label || "";
  $("profileTopSection").innerHTML = `\n    <div class="profile-section-title">${escapeHtml(displayName)}'s Tradable Items</div>\n    <div class="profile-tradable-total">\n      <div class="profile-tradable-total-label">FLOWER VALUE</div>\n      <div class="profile-tradable-total-val">${FLOWER_ICON} ${fmt(total)}</div>\n      <div class="profile-tradable-total-usd">${profileFmtUsd(total)}</div>\n    </div>\n    <div class="profile-tabgrid is-3col" id="profileTradableTabs">${tabsHtml}</div>\n    <div class="profile-tradable-tab-subtotal" id="profileTradableTabSubtotal"><span>${escapeHtml(activeTabLabel)} Subtotal</span><span>${FLOWER_ICON} ${fmt(profileTradableRowsSubtotal(rows))}</span></div>\n    <div id="profileTradableContent">${profileTradableContentHtml(rows, profileState.tradableTab, g)}</div>\n  `;
  attachProfileTradableEditHandlers(g);
  $("profileTradableTabs").querySelectorAll("button[data-tab]").forEach(btn => {
    btn.onclick = () => {
      profileState.tradableTab = btn.dataset.tab;
      $("profileTradableTabs").querySelectorAll("button[data-tab]").forEach(b => b.classList.toggle("active", b.dataset.tab === profileState.tradableTab));
      const newRows = profileTradableRowsForTab(g, profileState.tradableTab);
      const newTabLabel = (PROFILE_TRADABLE_TABS.find(t => t.id === profileState.tradableTab) || {}).label || "";
      const tabSubtotalEl = $("profileTradableTabSubtotal");
      if (tabSubtotalEl) tabSubtotalEl.innerHTML = `<span>${escapeHtml(newTabLabel)} Subtotal</span><span>${FLOWER_ICON} ${fmt(profileTradableRowsSubtotal(newRows))}</span>`;
      $("profileTradableContent").innerHTML = profileTradableContentHtml(newRows, profileState.tradableTab, g);
      attachProfileTradableEditHandlers(g);
    };
  });
  profileBackNav();
}

export function renderProfileView() {
  if (profileState.view === "build") {
    renderProfileBuild();
  } else if (profileState.view === "tradable") {
    renderProfileTradable();
  } else {
    renderProfileOverview();
    profileGoBottomNav();
  }
  const topSection = $("profileTopSection");
  if (topSection) topSection.scrollTop = 0;
}

export function openProfile() {
  profileState.view = "overview";
  try {
    renderProfileView();
  } catch (e) {
    console.error("Profile render failed:", e);
  }
  const card = $("profileModalCard");
  if (card) {
    const vv = window.visualViewport;
    const lockW = vv ? vv.width : window.innerWidth;
    const lockH = vv ? vv.height : window.innerHeight;
    card.style.width = lockW + "px";
    card.style.height = lockH + "px";
  }
  $("profileOverlay").classList.add("show");
  ensureExchangeRates().then(() => {
    if (profileState.view === "overview") {
      renderProfileOverview();
      const ts = $("profileTopSection");
      if (ts) ts.scrollTop = 0;
    }
  });
}

export function closeProfile() {
  $("profileOverlay").classList.remove("show");
  const card = $("profileModalCard");
  if (card) {
    card.style.width = "";
    card.style.height = "";
  }
  if (typeof profileClearTradableCache === "function") profileClearTradableCache();
  if (typeof positionFarmPanelTab === "function") positionFarmPanelTab();
}

export function __set_npcDeliverToggle(v) {
  return npcDeliverToggle = v;
}

export function __set_bountyToggle(v) {
  return bountyToggle = v;
}