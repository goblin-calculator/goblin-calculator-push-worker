import { FACTION_BANNER_ICONS, FACTION_DISPLAY_NAMES, FACTION_PET_HAPPY_ICONS, FACTION_WEEK_START_MS, FLOWER_ICON, MARK_ICON_SRC, coinsToFlower, cookingFindRecipeForFood, escapeHtml, factionGetWeekKey, farmSyncAsObj, farmSyncGetFaction, farmSyncGetFactionPetInfo, fmtInt, fmtXp, readFarmSyncedId, toast } from "./calculator.js";

import { farmPanelGameState } from "./inprogress.js";

import { craftingBoxClearCostCache, craftingBoxHasRecipe, craftingBoxUnitCostCoins, craftingBoxUnitCostCoinsForMode } from "./crafting_box.js";

import { SFL_COMMUNITY_PROXY_BASE, cookingCostMode, cookingIngredientUnitCostCoins } from "./prices.js";

import { safeLSJSON } from "./storage.js";

import { $, cookFoodIcon, getIcon, syncFactionSubRoute } from "./ui.js";

const SFL_FACTION_PET_WORKER_BASE = "https://sfl-faction-pet-cache.bossweki.workers.dev";

const FACTION_PET_COMMUNITY_TTL_MS = 3 * 60 * 1000;

const FACTION_PET_COMMUNITY_TIMEOUT_MS = 7000;

let factionPetCommunityCache = null;

let factionPetCommunityUpdatedAt = 0;

let factionPetCommunityPromise = null;

async function fetchFactionPetCommunitySnapshotOnce() {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), FACTION_PET_COMMUNITY_TIMEOUT_MS);
  try {
    const res = await fetch(SFL_FACTION_PET_WORKER_BASE + "/snapshot", {
      cache: "no-store",
      signal: controller.signal
    });
    if (!res.ok) return null;
    const json = await res.json();
    if (!json || !json.ok || !json.factions) return null;
    return json.factions;
  } finally {
    clearTimeout(timer);
  }
}

function ensureFactionPetCommunityLoaded(forceFresh) {
  if (!forceFresh && factionPetCommunityCache && Date.now() - factionPetCommunityUpdatedAt < FACTION_PET_COMMUNITY_TTL_MS) {
    return Promise.resolve(factionPetCommunityCache);
  }
  if (factionPetCommunityPromise) return factionPetCommunityPromise;
  factionPetCommunityPromise = (async () => {
    try {
      const factions = await fetchFactionPetCommunitySnapshotOnce();
      if (factions) {
        factionPetCommunityCache = factions;
        factionPetCommunityUpdatedAt = Date.now();
        const panel = $("factionPanel");
        if (panel && panel.classList.contains("open")) factionDeliveryRefreshGrid();
      }
    } catch (e) {}
    return factionPetCommunityCache;
  })().finally(() => {
    factionPetCommunityPromise = null;
  });
  return factionPetCommunityPromise;
}

function factionDeliveryCommunityPetFor(factionKey) {
  return (factionPetCommunityCache && factionPetCommunityCache[factionKey]) || null;
}

const FACTION_ROUTINE_CROPS = {
  bumpkins: [ "Pumpkin", "Soybean", "Eggplant", "Cauliflower", "Sunflower", "Parsnip", "Beetroot", "Radish", "Potato", "Kale", "Cabbage", "Carrot" ],
  goblins: [ "Sunflower", "Cabbage", "Kale", "Soybean", "Potato", "Eggplant", "Cauliflower", "Parsnip", "Carrot", "Radish", "Beetroot", "Pumpkin" ],
  sunflorians: [ "Potato", "Beetroot", "Radish", "Cabbage", "Carrot", "Kale", "Soybean", "Eggplant", "Pumpkin", "Parsnip", "Cauliflower", "Sunflower" ],
  nightshades: [ "Carrot", "Cauliflower", "Parsnip", "Beetroot", "Pumpkin", "Radish", "Cabbage", "Kale", "Sunflower", "Eggplant", "Soybean", "Potato" ]
};

const FACTION_ROUTINE_OFFSET = 11;

const FACTION_WEEK_MS = 7 * 24 * 60 * 60 * 1e3;

const FACTION_ORDER = [ "bumpkins", "goblins", "sunflorians", "nightshades" ];

const FACTION_ROUTINE_ANCHOR_KEY = "hl_faction_routine_anchor";

const FACTION_DELIVERY_SETS_KEY = "hl_faction_delivery_learned_sets";

const FACTION_KITCHEN_SETS = {
  potato: [ { item: "Potato", amount: 250 }, { item: "Rice", amount: 1 }, { item: "Oil", amount: 3 } ],
  sunflower: [ { item: "Sunflower", amount: 500 }, { item: "Tomato", amount: 55 }, { item: "Leather", amount: 10 } ],
  pumpkin: [ { item: "Pumpkin", amount: 150 }, { item: "Egg", amount: 20 }, { item: "Wool", amount: 35 } ],
  carrot: [ { item: "Carrot", amount: 75 }, { item: "Lemon", amount: 35 }, { item: "Feather", amount: 60 } ],
  beetroot: [ { item: "Beetroot", amount: 30 }, { item: "Banana", amount: 12 }, { item: "Grape", amount: 2 } ],
  cauliflower: [ { item: "Cauliflower", amount: 25 }, { item: "Blueberry", amount: 20 }, { item: "Olive", amount: 1 } ],
  soybean: [ { item: "Soybean", amount: 50 }, { item: "Apple", amount: 12 }, { item: "Honey", amount: 5 } ],
  cabbage: [ { item: "Cabbage", amount: 100 }, { item: "Orange", amount: 20 }, { item: "Rice", amount: 2 } ],
  eggplant: [ { item: "Eggplant", amount: 20 }, { item: "Rice", amount: 1 }, { item: "Barley", amount: 30 } ],
  parsnip: [ { item: "Parsnip", amount: 25 }, { item: "Olive", amount: 1 }, { item: "Wood", amount: 50 } ],
  radish: [ { item: "Radish", amount: 8 }, { item: "Grape", amount: 1 }, { item: "Egg", amount: 35 } ],
  kale: [ { item: "Kale", amount: 8 }, { item: "Honey", amount: 3 }, { item: "Milk", amount: 3 } ]
};

const FACTION_PET_SETS = {
  potato: [ { food: "Cabbers n Mash", quantity: 1 }, { food: "Power Smoothie", quantity: 2 }, { food: "Tofu Scramble", quantity: 2 }, { food: "Angler Doll", quantity: 1 } ],
  sunflower: [ { food: "Kale Stew", quantity: 1 }, { food: "Banana Blast", quantity: 2 }, { food: "Bumpkin ganoush", quantity: 2 }, { food: "Doll", quantity: 1 } ],
  pumpkin: [ { food: "Fried Tofu", quantity: 1 }, { food: "Sour Shake", quantity: 2 }, { food: "Surimi Rice Bowl", quantity: 1 }, { food: "Lumber Doll", quantity: 1 } ],
  carrot: [ { food: "Bumpkin Broth", quantity: 6 }, { food: "Bumpkin Detox", quantity: 2 }, { food: "Bumpkin ganoush", quantity: 2 }, { food: "Sizzle Doll", quantity: 1 } ],
  beetroot: [ { food: "Roast Veggies", quantity: 2 }, { food: "The Lot", quantity: 1 }, { food: "Apple Pie", quantity: 4 }, { food: "Moo Doll", quantity: 1 } ],
  cauliflower: [ { food: "Boiled Eggs", quantity: 4 }, { food: "Orange Juice", quantity: 4 }, { food: "Surimi Rice Bowl", quantity: 1 }, { food: "Cluck Doll", quantity: 1 } ],
  soybean: [ { food: "Bumpkin Broth", quantity: 4 }, { food: "Apple Juice", quantity: 3 }, { food: "Bumpkin Roast", quantity: 1 }, { food: "Lunar Doll", quantity: 1 } ],
  cabbage: [ { food: "Popcorn", quantity: 2 }, { food: "Purple Smoothie", quantity: 5 }, { food: "Orange Cake", quantity: 4 }, { food: "Gilded Doll", quantity: 1 } ],
  eggplant: [ { food: "Kale Omelette", quantity: 1 }, { food: "Carrot Juice", quantity: 5 }, { food: "Slow Juice", quantity: 1 }, { food: "Harvest Doll", quantity: 1 } ],
  parsnip: [ { food: "Bumpkin Broth", quantity: 6 }, { food: "The Lot", quantity: 1 }, { food: "Goblin Brunch", quantity: 2 }, { food: "Lunar Doll", quantity: 1 } ],
  radish: [ { food: "Popcorn", quantity: 6 }, { food: "Bumpkin Detox", quantity: 2 }, { food: "Caprese Salad", quantity: 1 }, { food: "Buzz Doll", quantity: 1 } ],
  kale: [ { food: "Fried Tofu", quantity: 2 }, { food: "Banana Blast", quantity: 1 }, { food: "Blue Cheese", quantity: 1 }, { food: "Juicy Doll", quantity: 1 } ]
};

function factionRoutineShiftWeek(weekKeyStr, weeks) {
  return factionGetWeekKey(new Date(new Date(weekKeyStr + "T00:00:00Z").getTime() + weeks * FACTION_WEEK_MS));
}

function factionRoutineDateIndex(weekKeyStr) {
  const weekDate = new Date(weekKeyStr + "T00:00:00Z").getTime();
  const weeksSinceStart = Math.floor((weekDate - FACTION_WEEK_START_MS) / FACTION_WEEK_MS);
  return ((weeksSinceStart + FACTION_ROUTINE_OFFSET) % 12 + 12) % 12;
}

function factionRoutineLoadAnchor() {
  const anchor = safeLSJSON(localStorage.getItem(FACTION_ROUTINE_ANCHOR_KEY), null);
  if (!anchor || typeof anchor.week !== "string" || !Number.isInteger(anchor.index)) return null;
  if (anchor.index < 0 || anchor.index > 11) return null;
  if (!isFinite(new Date(anchor.week + "T00:00:00Z").getTime())) return null;
  return anchor;
}

function factionRoutineIndexForWeek(weekKeyStr) {
  const anchor = factionRoutineLoadAnchor();
  if (!anchor) return factionRoutineDateIndex(weekKeyStr);
  const diff = Math.round((new Date(weekKeyStr + "T00:00:00Z").getTime() - new Date(anchor.week + "T00:00:00Z").getTime()) / FACTION_WEEK_MS);
  return ((anchor.index + diff) % 12 + 12) % 12;
}

function factionRoutineDetectIndex(factionName, record) {
  const list = FACTION_ROUTINE_CROPS[factionName];
  if (!list || !record) return -1;
  const requests = record.kitchen || [];
  for (let i = 0; i < requests.length; i++) {
    const item = String(requests[i].item || "").toLowerCase();
    const idx = list.findIndex(c => c.toLowerCase() === item);
    if (idx >= 0) return idx;
  }
  return -1;
}

function factionRoutineUpdateAnchor(record) {
  const index = factionRoutineDetectIndex(record.factionName, record);
  if (index < 0 || !record.week) return;
  const current = factionRoutineLoadAnchor();
  if (current && (current.week > record.week || current.week === record.week && (current.syncedAt || 0) > record.syncedAt)) return;
  localStorage.setItem(FACTION_ROUTINE_ANCHOR_KEY, JSON.stringify({
    week: record.week,
    index: index,
    syncedAt: record.syncedAt
  }));
}

function factionDeliverySetKey(crop) {
  return String(crop).toLowerCase();
}

function factionDeliveryTableSet(crop) {
  const key = factionDeliverySetKey(crop);
  const kitchen = FACTION_KITCHEN_SETS[key];
  const pet = FACTION_PET_SETS[key];
  return kitchen && pet ? {
    kitchen: kitchen,
    pet: pet
  } : null;
}

function factionDeliverySetSignature(set) {
  if (!set) return null;
  return JSON.stringify({
    kitchen: (set.kitchen || []).map(r => [ r.item, r.amount ]).sort((a, b) => a[0].localeCompare(b[0])),
    pet: (set.pet || []).map(r => [ r.food, r.quantity ]).sort((a, b) => a[0].localeCompare(b[0]))
  });
}

function factionDeliveryLoadSets() {
  const sets = safeLSJSON(localStorage.getItem(FACTION_DELIVERY_SETS_KEY), {});
  return sets && typeof sets === "object" ? sets : {};
}

function factionDeliveryLearnSet(record) {
  const index = factionRoutineDetectIndex(record.factionName, record);
  if (index < 0) return;
  const key = factionDeliverySetKey(FACTION_ROUTINE_CROPS[record.factionName][index]);
  const table = factionDeliveryTableSet(key);
  const observed = {
    kitchen: (record.kitchen || []).map(r => ({
      item: r.item,
      amount: r.amount
    })),
    pet: (record.pet || []).map(r => ({
      food: r.food,
      quantity: r.quantity
    }))
  };
  const sets = factionDeliveryLoadSets();
  const existing = sets[key];
  if (table && factionDeliverySetSignature(observed) === factionDeliverySetSignature(table)) {
    if (existing) {
      delete sets[key];
      localStorage.setItem(FACTION_DELIVERY_SETS_KEY, JSON.stringify(sets));
    }
    return;
  }
  if (existing && existing.week > record.week) return;
  sets[key] = {
    week: record.week,
    base: factionDeliverySetSignature(table),
    kitchen: observed.kitchen,
    pet: observed.pet
  };
  localStorage.setItem(FACTION_DELIVERY_SETS_KEY, JSON.stringify(sets));
}

function factionDeliveryLookupSet(crop) {
  const key = factionDeliverySetKey(crop);
  const table = factionDeliveryTableSet(key);
  const learned = factionDeliveryLoadSets()[key];
  if (learned && Array.isArray(learned.kitchen) && Array.isArray(learned.pet) && learned.base === factionDeliverySetSignature(table)) return {
    kitchen: learned.kitchen,
    pet: learned.pet,
    week: learned.week || null
  };
  return table ? {
    kitchen: table.kitchen,
    pet: table.pet,
    week: null
  } : null;
}

function factionDeliveryPredict(factionKey, weekKey) {
  const list = FACTION_ROUTINE_CROPS[factionKey];
  if (!list) return null;
  const index = factionRoutineIndexForWeek(weekKey);
  const crop = list[index];
  return {
    index: index,
    crop: crop,
    set: factionDeliveryLookupSet(crop)
  };
}

const FACTION_DELIVERY_CACHE_KEY = "hl_faction_delivery_cache";

const FACTION_DELIVERY_OWN_KEY = "hl_faction_delivery_own_faction";

function factionDeliveryLoadCache() {
  return safeLSJSON(localStorage.getItem(FACTION_DELIVERY_CACHE_KEY), {});
}

function factionDeliverySaveCache(cache) {
  localStorage.setItem(FACTION_DELIVERY_CACHE_KEY, JSON.stringify(cache));
}

function factionDeliveryGetOwnFaction() {
  return localStorage.getItem(FACTION_DELIVERY_OWN_KEY) || null;
}

function factionDeliverySetOwnFaction(name) {
  if (name) localStorage.setItem(FACTION_DELIVERY_OWN_KEY, name); else localStorage.removeItem(FACTION_DELIVERY_OWN_KEY);
}

function factionDeliverySumDaily(obj) {
  const o = farmSyncAsObj(obj);
  if (!o) return 0;
  return Object.keys(o).reduce((sum, k) => sum + (Number(o[k]) || 0), 0);
}

function factionDeliveryIconHtml(name) {
  return cookingFindRecipeForFood(name) ? cookFoodIcon(name) : getIcon(name);
}

function factionDeliveryFlowerCost(name) {
  try {
    if (craftingBoxHasRecipe(name)) {
      const dollCoins = craftingBoxUnitCostCoins(name);
      return dollCoins > 0 ? coinsToFlower(dollCoins) : 0;
    }
    const coins = cookingIngredientUnitCostCoins(name, cookingCostMode);
    return coins > 0 ? coinsToFlower(coins) : 0;
  } catch (e) {
    return 0;
  }
}

function factionDeliveryBuildRecordFromGameState(g, farmId) {
  const faction = farmSyncGetFaction(g);
  if (!faction) return null;
  const week = factionGetWeekKey();
  const petInfo = farmSyncGetFactionPetInfo(g);
  const kitchen = farmSyncAsObj(faction.kitchen);
  const pet = farmSyncAsObj(faction.pet);
  const kitchenRequests = kitchen && Array.isArray(kitchen.requests) ? kitchen.requests : [];
  const petRequests = pet && Array.isArray(pet.requests) ? pet.requests : [];
  const history = farmSyncAsObj(faction.history);
  const weekHistory = farmSyncAsObj(history && history[week]);
  return {
    factionName: faction.name,
    farmId: farmId != null ? String(farmId) : null,
    syncedAt: Date.now(),
    week: kitchen && kitchen.week ? kitchen.week : week,
    marksThisWeek: weekHistory ? Number(weekHistory.score) || 0 : 0,
    petXPThisWeek: weekHistory ? Number(weekHistory.petXP) || 0 : 0,
    petStreak: petInfo.streak,
    lastWeekStreak: petInfo.lastWeekStreak,
    qualifiesForBoost: petInfo.qualifiesForBoost,
    isContributingMember: petInfo.isContributingMember,
    hasPetData: petInfo.hasPetData,
    totalXP: petInfo.totalXP,
    goalXP: petInfo.goalXP,
    sleeping: petInfo.sleeping,
    goalReached: petInfo.goalReached,
    kitchen: kitchenRequests.map(r => ({
      item: r.item,
      amount: Number(r.amount) || 0,
      fulfilled: factionDeliverySumDaily(r.dailyFulfilled)
    })),
    pet: petRequests.map(r => ({
      food: r.food,
      quantity: Number(r.quantity) || 0,
      fulfilled: factionDeliverySumDaily(r.dailyFulfilled)
    }))
  };
}

function factionDeliveryIngestRecord(record) {
  if (!record || !record.factionName) return;
  const cache = factionDeliveryLoadCache();
  const existing = cache[record.factionName];
  if (existing && (existing.week > record.week || existing.week === record.week && existing.syncedAt > record.syncedAt)) return;
  cache[record.factionName] = record;
  factionDeliverySaveCache(cache);
  factionRoutineUpdateAnchor(record);
  factionDeliveryLearnSet(record);
}

function factionDeliveryIngestMainFarm() {
  if (!farmPanelGameState || !farmPanelGameState.faction) return;
  const mainFarmId = typeof readFarmSyncedId === "function" ? readFarmSyncedId() : $("farmPanelIdInput") ? $("farmPanelIdInput").value : null;
  const record = factionDeliveryBuildRecordFromGameState(farmPanelGameState, mainFarmId);
  if (!record) return;
  factionDeliveryIngestRecord(record);
  factionDeliverySetOwnFaction(record.factionName);
}

function factionDeliveryRequestRowHtml(iconName, qty, label, isFulfilledKnown, fulfilled) {
  const unitCost = factionDeliveryFlowerCost(iconName);
  const lineCost = unitCost * qty;
  const costHtml = lineCost > 0 ? ` <span class="fd-item-cost">(${lineCost.toFixed(2)} ${FLOWER_ICON})</span>` : "";
  const fulfilledHtml = isFulfilledKnown ? `<span class="fd-item-fulfilled">${fmtInt(fulfilled)}/${fmtInt(qty)} delivered</span>` : "";
  return `<div class="fd-item-row">\n    <span class="fd-item-main">${factionDeliveryIconHtml(iconName)} ${fmtInt(qty)} ${escapeHtml(label)}${costHtml}</span>\n    ${fulfilledHtml}\n  </div>`;
}

function factionDeliveryTotalCost(record) {
  let total = 0;
  (record.kitchen || []).forEach(r => total += factionDeliveryFlowerCost(r.item) * r.amount);
  (record.pet || []).forEach(r => total += factionDeliveryFlowerCost(r.food) * r.quantity);
  return total;
}

function factionDeliveryPredictedBodyHtml(factionKey, displayName, weekKey) {
  const prediction = factionDeliveryPredict(factionKey, weekKey);
  if (!prediction) return `<div class="fd-empty-note">No routine is known for ${escapeHtml(displayName)} yet.</div>`;
  const set = prediction.set;
  if (!set) return `<div class="fd-empty-note">No requirement set is recorded for ${escapeHtml(prediction.crop)} yet.</div>`;
  const totalCost = factionDeliveryTotalCost(set);
  const kitchenRows = (set.kitchen || []).map(r => factionDeliveryRequestRowHtml(r.item, r.amount, r.item, false, 0)).join("");
  const petRows = (set.pet || []).map(r => factionDeliveryRequestRowHtml(r.food, r.quantity, r.food, false, 0)).join("");
  const seenText = set.week ? `updated from a synced farm, week of ${escapeHtml(set.week)}` : "recorded routine table";
  return `<div class="fd-total-cost">Estimated delivery cost: ${totalCost.toFixed(2)} ${FLOWER_ICON}</div>\n<div class="fd-section-label">Kitchen</div>\n${kitchenRows}\n<div class="fd-section-label">Pet</div>\n${petRows}\n<div class="fd-synced-note">Estimate from the ${escapeHtml(prediction.crop)} set (${seenText}) · amounts can change between routine cycles</div>`;
}

function factionDeliveryPetSectionHtml(factionKey, record) {
  const displayName = FACTION_DISPLAY_NAMES[factionKey] || factionKey;
  const petIconSrc = FACTION_PET_HAPPY_ICONS[factionKey];
  const iconHtml = petIconSrc ? `<img src="${petIconSrc}" alt="${escapeHtml(displayName)} Pet">` : `<span class="fp-icon-unknown">❓</span>`;
  const hasPetData = !!(record && record.hasPetData);
  const community = factionDeliveryCommunityPetFor(factionKey);
  const hasCommunityData = !hasPetData && !!community;
  const hasAnyData = hasPetData || hasCommunityData;
  const totalXP = hasPetData ? record.totalXP : hasCommunityData ? community.totalXP : 0;
  const goalXP = hasPetData ? record.goalXP : hasCommunityData ? community.goalXP : 0;
  const streak = hasPetData ? record.streak : hasCommunityData ? community.streak : 0;
  const nextWeekGoalXP = community ? community.nextWeekGoalXP : null;
  const pct = goalXP > 0 ? Math.min(100, totalXP / goalXP * 100) : 0;
  const caption = hasAnyData ? `${fmtInt(totalXP)} / ${fmtInt(goalXP)} XP` : "No sync data yet";
  const metaParts = [];
  if (hasAnyData && streak > 0) metaParts.push(`${fmtInt(streak)} week streak`);
  if (nextWeekGoalXP) metaParts.push(`Next week goal (est.): ${fmtInt(nextWeekGoalXP)} XP`);
  if (hasCommunityData) metaParts.push(`via community · ${factionDeliveryRelativeTime(community.updatedAt)}`);
  const metaHtml = metaParts.length ? `<div class="fp-bar-meta">${metaParts.map(escapeHtml).join(" · ")}</div>` : "";
  return `<div class="fd-pet-row">\n    <div class="fp-icon-frame fd-pet-icon">${iconHtml}</div>\n    <div class="fd-pet-bar-wrap">\n      <div class="fp-bar-track"><div class="fp-bar-fill" style="width:${pct}%;"></div></div>\n      <div class="fp-bar-caption"><span>${caption}</span><span>${Number(pct.toFixed(2))}%</span></div>\n      ${metaHtml}\n    </div>\n  </div>`;
}

function factionDeliveryCopyText(displayName, kitchenItems, petItems) {
  const kitchenLines = kitchenItems.map(r => `${fmtInt(r.qty)} ${r.label}`);
  const petLines = petItems.map(r => `${fmtInt(r.qty)} ${r.label}`);
  const blocks = [];
  if (kitchenLines.length) blocks.push(`**Kitchen**\n\`\`\`${kitchenLines.join("\n")}\`\`\``);
  if (petLines.length) blocks.push(`**Pet**\n\`\`\`${petLines.join("\n")}\`\`\``);
  const header = `**___${displayName}___**`;
  return blocks.length ? `${header}\n${blocks.join("\n\n")}` : `${header}\nNo requests found.`;
}

function factionDeliveryEncodeCopy(text) {
  try {
    return btoa(unescape(encodeURIComponent(text)));
  } catch (e) {
    return "";
  }
}

function factionDeliveryDecodeCopy(encoded) {
  try {
    return decodeURIComponent(escape(atob(encoded || "")));
  } catch (e) {
    return "";
  }
}

function factionDeliveryCopyIconHtml(copyText) {
  return `<button type="button" class="fd-copy-icon" data-copy="${factionDeliveryEncodeCopy(copyText)}" title="Copy to clipboard">📋</button>`;
}

function factionDeliveryCopyFallback(text) {
  const ta = document.createElement("textarea");
  ta.value = text;
  ta.style.position = "fixed";
  ta.style.opacity = "0";
  document.body.appendChild(ta);
  ta.focus();
  ta.select();
  let ok = false;
  try {
    ok = document.execCommand("copy");
  } catch (e) {
    ok = false;
  }
  document.body.removeChild(ta);
  return ok;
}

function factionDeliveryDoCopy(text, btn) {
  const onDone = ok => {
    toast(ok ? "📋 Faction requests copied — paste it in Discord!" : "⚠️ Copy failed — please copy manually");
    if (ok && btn) {
      btn.classList.add("copied");
      setTimeout(() => btn.classList.remove("copied"), 1200);
    }
  };
  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(text).then(() => onDone(true)).catch(() => onDone(factionDeliveryCopyFallback(text)));
  } else {
    onDone(factionDeliveryCopyFallback(text));
  }
}

function factionDeliveryContainerHtml(factionKey, record, isOwn, weekKey) {
  const displayName = FACTION_DISPLAY_NAMES[factionKey] || factionKey;
  const bannerIcon = FACTION_BANNER_ICONS[factionKey] ? `<img src="${FACTION_BANNER_ICONS[factionKey]}" alt="" style="width:16px;height:16px;image-rendering:pixelated;vertical-align:-3px;">` : "";
  const badgeHtml = isOwn ? `<span class="fd-badge">★ Your Faction</span>` : "";
  const petHtml = factionDeliveryPetSectionHtml(factionKey, isOwn ? record : null);
  const hasFreshData = isOwn && record && record.week === weekKey;
  let bodyHtml;
  let kitchenItems = [];
  let petItems = [];
  if (!hasFreshData) {
    const prediction = factionDeliveryPredict(factionKey, weekKey);
    const set = prediction ? prediction.set : null;
    if (set) {
      kitchenItems = (set.kitchen || []).map(r => ({
        label: r.item,
        qty: r.amount
      }));
      petItems = (set.pet || []).map(r => ({
        label: r.food,
        qty: r.quantity
      }));
    }
    bodyHtml = factionDeliveryPredictedBodyHtml(factionKey, displayName, weekKey);
  } else {
    const totalCost = factionDeliveryTotalCost(record);
    kitchenItems = (record.kitchen || []).map(r => ({
      label: r.item,
      qty: r.amount
    }));
    petItems = (record.pet || []).map(r => ({
      label: r.food,
      qty: r.quantity
    }));
    const kitchenRows = (record.kitchen || []).map(r => factionDeliveryRequestRowHtml(r.item, r.amount, r.item, isOwn, r.fulfilled)).join("");
    const petRows = (record.pet || []).map(r => factionDeliveryRequestRowHtml(r.food, r.quantity, r.food, isOwn, r.fulfilled)).join("");
    const ownStatsHtml = isOwn ? `<div class="fd-own-stats">\n        <div class="fd-stat"><span class="fd-stat-label">Pet Streak</span><span class="fd-stat-value">${fmtInt(record.petStreak)} Weeks</span></div>\n        <div class="fd-stat"><span class="fd-stat-label">Contributed This Week</span><span class="fd-stat-value">${record.isContributingMember ? "Yes" : "No"}</span></div>\n        <div class="fd-stat"><span class="fd-stat-label">Marks Earned This Week</span><span class="fd-stat-value">${fmtInt(record.marksThisWeek)} <img src="${MARK_ICON_SRC}" alt="Mark" style="width:12px;height:12px;image-rendering:pixelated;vertical-align:-2px;"></span></div>\n      </div>` : "";
    bodyHtml = `<div class="fd-total-cost">Total delivery cost: ${totalCost.toFixed(2)} ${FLOWER_ICON}</div>\n      ${ownStatsHtml}\n      <div class="fd-section-label">Kitchen</div>\n      ${kitchenRows || `<div class="fd-empty-note">No kitchen requests found.</div>`}\n      <div class="fd-section-label">Pet</div>\n      ${petRows || `<div class="fd-empty-note">No pet requests found.</div>`}\n      <div class="fd-synced-note">Synced from Farm #${escapeHtml(record.farmId || "—")} · ${escapeHtml(factionDeliveryRelativeTime(record.syncedAt))}</div>`;
  }
  const copyIconHtml = factionDeliveryCopyIconHtml(factionDeliveryCopyText(displayName, kitchenItems, petItems));
  return `<div class="fd-container${isOwn ? " is-own" : ""}">\n    <div class="fd-container-head">\n      <span class="fd-container-title">${bannerIcon} ${escapeHtml(displayName)} ${copyIconHtml}</span>\n      ${badgeHtml}\n    </div>\n    ${petHtml}\n    ${bodyHtml}\n  </div>`;
}

function factionDeliveryRelativeTime(ts) {
  if (!ts) return "never";
  const diffSec = Math.max(0, Math.floor((Date.now() - ts) / 1e3));
  if (diffSec < 60) return "just now";
  const diffMin = Math.floor(diffSec / 60);
  if (diffMin < 60) return `${diffMin}m ago`;
  const diffHr = Math.floor(diffMin / 60);
  if (diffHr < 24) return `${diffHr}h ago`;
  return `${Math.floor(diffHr / 24)}d ago`;
}

const FACTION_LEADERBOARD_LIMIT = 500;

const FACTION_LEADERBOARD_TIMEOUT_MS = 12000;

const FACTION_LEADERBOARD_TTL_MS = 3 * 60 * 1000;

const FACTION_LEADERBOARD_LEVEL_XP = [0, 2, 22, 205, 555, 1155, 2155, 3405, 5405, 7905, 10905, 14405, 18405, 22905, 27905, 33655, 40155, 47405, 55405, 64155, 73905, 84655, 96405, 109155, 122905, 137405, 152905, 169405, 186905, 205405, 225405, 246905, 269905, 294405, 320405, 348405, 378405, 410405, 444405, 480405, 518905, 559905, 603405, 649405, 697905, 749405, 803905, 861405, 921905, 985405, 1053905, 1127405, 1205905, 1289405, 1377905, 1476405, 1584905, 1703405, 1831905, 1970405, 2128905, 2287405, 2485905, 2704405, 2942905, 3221405, 3539905, 3898405, 4296905, 4735405, 5233905, 5743905, 6263905, 6793905, 7333905, 7883905, 8443905, 9013905, 9593905, 10183905, 10783905, 11393905, 12013905, 12643905, 13283905, 13933905, 14593905, 15263905, 15943905, 16633905, 17333905, 18043905, 18763905, 19493905, 20233905, 20983905, 21743905, 22513905, 23293905, 24083905, 24893905, 25723905, 26573905, 27443905, 28333905, 29243905, 30173905, 31123905, 32093905, 33083905, 34093905, 35123905, 36173905, 37243905, 38333905, 39443905, 40573905, 41723905, 42893905, 44083905, 45293905, 46523905, 47773905, 49043905, 50333905, 51653905, 53003905, 54383905, 55793905, 57233905, 58708905, 60218905, 61763905, 63343905, 64958905, 66613905, 68308905, 70043905, 71818905, 73633905, 75493905, 77398905, 79348905, 81343905, 83383905, 85473905, 87613905, 89803905, 92043905, 94333905];

function factionLeaderboardLevelFromXp(xp) {
  if (xp == null || isNaN(xp)) return null;
  let level = 1;
  for (let i = 0; i < FACTION_LEADERBOARD_LEVEL_XP.length; i++) {
    if (xp >= FACTION_LEADERBOARD_LEVEL_XP[i]) level = i + 1; else break;
  }
  return level;
}

let factionLeaderboardActiveFaction = null;

let factionLeaderboardData = null;

let factionLeaderboardLoading = false;

let factionLeaderboardError = null;

let factionLeaderboardFetchedForFarmId = null;

let factionLeaderboardFetchedAt = 0;

function factionLeaderboardOwnFarmId() {
  return (readFarmSyncedId() || "").trim();
}

function factionLeaderboardSingularLabel(factionKey) {
  const name = FACTION_DISPLAY_NAMES[factionKey] || factionKey;
  return name.replace(/s$/, "");
}

async function factionLeaderboardFetchData(farmId, force) {
  if (!farmId) {
    factionLeaderboardError = "Sync your farm (or set a Farm ID) to load the leaderboard.";
    factionLeaderboardData = null;
    factionLeaderboardFetchedForFarmId = null;
    factionLeaderboardRenderBody();
    return;
  }
  if (!force && factionLeaderboardData && factionLeaderboardFetchedForFarmId === farmId && Date.now() - factionLeaderboardFetchedAt < FACTION_LEADERBOARD_TTL_MS) return;
  factionLeaderboardLoading = true;
  factionLeaderboardError = null;
  factionLeaderboardRenderBody();
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), FACTION_LEADERBOARD_TIMEOUT_MS);
  try {
    const url = SFL_COMMUNITY_PROXY_BASE + "community/data?type=marksLeaderboard&farmId=" + encodeURIComponent(farmId) + "&limit=" + FACTION_LEADERBOARD_LIMIT;
    const res = await fetch(url, {
      cache: "no-store",
      signal: controller.signal
    });
    if (!res.ok) throw new Error("Request failed (" + res.status + ")");
    const json = await res.json();
    if (!json || !json.data || !json.data.factions) throw new Error("Unexpected response from leaderboard API");
    factionLeaderboardData = json.data;
    factionLeaderboardFetchedForFarmId = farmId;
    factionLeaderboardFetchedAt = Date.now();
  } catch (e) {
    factionLeaderboardError = "Couldn't load the leaderboard" + (e && e.message ? " — " + e.message : "") + ".";
  } finally {
    clearTimeout(timer);
    factionLeaderboardLoading = false;
    factionLeaderboardRenderBody();
  }
}

function factionLeaderboardOwnUsername() {
  const name = farmPanelGameState && typeof farmPanelGameState.username === "string" ? farmPanelGameState.username : "";
  return name.trim().toLowerCase();
}

function factionLeaderboardIsOwnRow(row, farmId, username) {
  if (!row) return false;
  if (farmId && row.accountId != null && String(row.accountId) === String(farmId)) return true;
  if (farmId && row.farmId != null && String(row.farmId) === String(farmId)) return true;
  if (username && typeof row.id === "string" && row.id.trim().toLowerCase() === username) return true;
  return false;
}

function factionLeaderboardRowMetaHtml(row) {
  const level = factionLeaderboardLevelFromXp(row.experience);
  const parts = [];
  if (level != null) parts.push(`Lv. ${fmtInt(level)}`);
  if (row.experience != null) parts.push(`${fmtInt(Math.floor(row.experience))} EXP`);
  if (row.ascensionLevel != null) parts.push(`Asc. ${fmtInt(row.ascensionLevel)}`);
  const metaText = parts.join(" · ");
  if (!metaText) return "";
  return `<div class="fd-lb-row-meta">${escapeHtml(metaText)}</div>`;
}

function factionLeaderboardRowHtml(row, index, isYou, useIndexRank) {
  const rank = row.rank != null ? row.rank : useIndexRank ? index + 1 : null;
  const name = row.id || "—";
  const markHtml = `<img src="${MARK_ICON_SRC}" alt="Mark" style="width:12px;height:12px;image-rendering:pixelated;vertical-align:-2px;">`;
  const metaHtml = factionLeaderboardRowMetaHtml(row);
  return `<div class="fd-lb-row${isYou ? " is-you" : ""}">\n    <div class="fd-lb-row-top">\n      <span class="fd-lb-row-rank">${rank != null ? "#" + fmtInt(rank) : "—"}</span>\n      <span class="fd-lb-row-name">${escapeHtml(name)}${isYou ? ` <span class="fd-badge">★ You</span>` : ""}</span>\n      <span class="fd-lb-row-count">${markHtml} ${fmtXp(row.count)}</span>\n    </div>\n    ${metaHtml}\n  </div>`;
}

const FACTION_DELIVERY_ICON_SRC = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAAOCAYAAAAfSC3RAAABLklEQVR42nWSPUvDUBSGn1scxLpVEQdpKTQUsnQwq1M26eYPKEJDxkz9Ce3aMUQoroVCocXtTl3bwSUgEYpOIrWbFQchDiEhNx9nPs8573nPKzTdDElV4EtBQWX7jgC8R5f18wsAD2PCLKzpZth3HACMThurZ1MB8CYzjE4bgL7jKNOzkDeZAURgGVwGAVQCX4rNShbCZ5fNHLRZSQJfCpGWdH1jAmDd3yU3z6cLABqtZgIpUss2AwxHAwUCEFkT5tMFjVYk8e11y3A0SDk+TuBC22N5ZVBuY7d2YP35y9+VkYO6tQPLfVW9UdPN0K3vIgcvjvn62GL1bAUCcOu75Mcihp6+TwCUqZpuhoEvRawG4Pb0B/v9PNpYBKVzG/hSLPdV0r3JfdkQlwU97vsHE3e2F0JAyRgAAAAASUVORK5CYII=";

const FACTION_LEADERBOARD_ICON_SRC = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAALCAYAAABPhbxiAAABJGlDQ1BJQ0MgUHJvZmlsZQAAeJxjYGAycHRxcmUSYGDIzSspCnJ3UoiIjFJgP8/AxsDMAAaJycUFjgEBPiB2Xn5eKgMG+HaNgRFEX9YFmYUpjxdwJRcUlQDpP0BslJJanMzAwGgAZGeXlxQAxRnnANkiSdlg9gYQuygkyBnIPgJk86VD2FdA7CQI+wmIXQT0BJD9BaQ+Hcxm4gCbA2HLgNglqRUgexmc8wsqizLTM0oUDC0tLRUcU/KTUhWCK4tLUnOLFTzzkvOLCvKLEktSU4BqIe4DA0GIQlCIaQA1WmiS6G+CABQPENbnQHD4MoqdQYghQHJpURmUychkTJiPMGOOBAOD/1IGBpY/CDGTXgaGBToMDPxTEWJqhgwMAvoMDPvmAADAxk/9GlU2EAAAAMFJREFUeNqNkjEKwkAQRd/Igr2VdYqkSGBbD5A07i08mLdIFbDVdtHGZmsre6ux0A0mbowfBoblff7wWVFVAIqqeS0zul46ATDRdL106G330yTrfWRlUVSNehcoqgaO52nX8UxRNbxZNSngH0le1gDqXQBguVklwcfpDoBtM7wLYgC8C2LbTL0LPZCSbTMAAZDY6mezMX1k6BsFQFW/Ji9rPWytHrZW87LW99uAGSTG1FTiIA1YzJni6eMPYiYKmNUTpTdxpOcI7zYAAAAASUVORK5CYII=";

function factionDeliveryButtonIconHtml() {
  return `<img src="${FACTION_DELIVERY_ICON_SRC}" alt="" style="width:16px;height:16px;image-rendering:pixelated;vertical-align:-3px;">`;
}

function factionLeaderboardIconHtml() {
  return `<img src="${FACTION_LEADERBOARD_ICON_SRC}" alt="" style="height:16px;width:auto;image-rendering:pixelated;vertical-align:-3px;">`;
}

const FACTION_STANDING_LABELS = [ "1st", "2nd", "3rd", "4th" ];

function factionLeaderboardFmtMarks(n) {
  if (n == null || !isFinite(n)) return "—";
  return Number(n).toLocaleString(undefined, {
    minimumFractionDigits: 0,
    maximumFractionDigits: 1
  });
}

function factionLeaderboardStandings(data) {
  if (!data || !data.factions) return [];
  const list = FACTION_ORDER.map(f => {
    const fd = data.factions[f];
    if (!fd) return null;
    const rows = Array.isArray(fd.top) ? fd.top : [];
    const top100 = rows.slice(0, 100);
    const summed = top100.reduce((acc, r) => acc + (Number(r && r.count) || 0), 0);
    const total = isFinite(Number(fd.score)) && fd.score != null ? Number(fd.score) : summed;
    const edge = top100.length ? top100[top100.length - 1] : null;
    const threshold = edge && edge.count != null ? Number(edge.count) : null;
    return { faction: f, total: total, threshold: threshold };
  }).filter(Boolean);
  list.sort((a, b) => b.total - a.total);
  return list;
}

function factionLeaderboardStandingsHtml(data, ownFaction) {
  const standings = factionLeaderboardStandings(data);
  if (!standings.length) return "";
  const markHtml = `<img src="${MARK_ICON_SRC}" alt="Mark" style="width:14px;height:14px;image-rendering:pixelated;vertical-align:-2px;">`;
  const cardsHtml = standings.map((st, i) => {
    const bannerHtml = FACTION_BANNER_ICONS[st.faction] ? `<img src="${FACTION_BANNER_ICONS[st.faction]}" alt="" style="width:18px;height:18px;image-rendering:pixelated;">` : "";
    const name = FACTION_DISPLAY_NAMES[st.faction] || st.faction;
    return `<div class="fd-container fdrk-card${st.faction === ownFaction ? " is-own" : ""}">
      <div class="fdrk-head">
        <span class="fd-container-title">${bannerHtml} ${escapeHtml(name)}</span>
        <span class="fd-badge fdrk-badge">${FACTION_STANDING_LABELS[i] || fmtInt(i + 1) + "th"}</span>
      </div>
      <div class="fd-section-label fdrk-label">Top 100 Total Marks</div>
      <div class="fdrk-total">${factionLeaderboardFmtMarks(st.total)} ${markHtml}</div>
      <div class="fd-stat fdrk-threshold"><span class="fd-stat-label" title="Marks needed to hold rank 100 in this faction">Top 100 Threshold ⓘ</span><span class="fd-stat-value">${factionLeaderboardFmtMarks(st.threshold)}</span></div>
    </div>`;
  }).join("");
  return `<div class="fd-container fdm-gap">
    <div class="fd-container-head"><span class="fd-container-title">${factionLeaderboardIconHtml()} Faction Standings</span></div>
    <div class="fdrk-grid">${cardsHtml}</div>
  </div>`;
}

function factionLeaderboardBodyHtml() {
  const farmId = factionLeaderboardOwnFarmId();
  const username = factionLeaderboardOwnUsername();
  const ownFaction = factionDeliveryGetOwnFaction();
  const faction = factionLeaderboardActiveFaction || ownFaction || FACTION_ORDER[0];
  const label = `${factionLeaderboardSingularLabel(faction)} Leader Board`;
  const tabsHtml = FACTION_ORDER.map(f => {
    const bannerHtml = FACTION_BANNER_ICONS[f] ? `<img src="${FACTION_BANNER_ICONS[f]}" alt="" style="width:14px;height:14px;image-rendering:pixelated;vertical-align:-2px;">` : "";
    return `<button type="button" class="fd-lb-tab${f === faction ? " active" : ""}" data-lb-faction="${f}">${bannerHtml} ${escapeHtml(factionLeaderboardSingularLabel(f))}</button>`;
  }).join("");
  let ownRankHtml = "";
  let listHtml = "";
  let updatedHtml = "";
  if (factionLeaderboardLoading && !factionLeaderboardData) {
    listHtml = `<div class="fd-empty-note">Loading leaderboard…</div>`;
  } else if (factionLeaderboardError) {
    listHtml = `<div class="fd-empty-note">${escapeHtml(factionLeaderboardError)}</div>`;
  } else if (!factionLeaderboardData) {
    listHtml = `<div class="fd-empty-note">No data yet.</div>`;
  } else {
    const factionData = factionLeaderboardData.factions[faction] || {};
    const rows = Array.isArray(factionData.top) ? factionData.top : [];
    const details = factionLeaderboardData.farmRankingDetails;
    if (faction === ownFaction || (details && details.faction === faction)) {
      const windowRows = details && details.faction === faction && Array.isArray(details.rankings) ? details.rankings.filter(Boolean) : [];
      const ownInTop = rows.find(r => factionLeaderboardIsOwnRow(r, farmId, username));
      const shown = windowRows.length ? windowRows : ownInTop ? [ownInTop] : [];
      const shownHtml = shown.length ? shown.map((r, i) => factionLeaderboardRowHtml(r, i, factionLeaderboardIsOwnRow(r, farmId, username), false)).join("") : `<div class="fd-empty-note">No ranking found for your farm this week yet.</div>`;
      ownRankHtml = `<div class="fd-lb-own-rank">Your Ranking · Farm #${escapeHtml(farmId || "—")}</div><div class="fd-lb-list fd-lb-own-list">${shownHtml}</div>`;
    }
    listHtml = rows.length ? rows.map((r, i) => factionLeaderboardRowHtml(r, i, factionLeaderboardIsOwnRow(r, farmId, username), true)).join("") : `<div class="fd-empty-note">No ranking data yet for ${escapeHtml(factionLeaderboardSingularLabel(faction))}.</div>`;
    if (factionLeaderboardData.lastUpdated) updatedHtml = `<div class="fd-synced-note">Last updated ${escapeHtml(factionDeliveryRelativeTime(factionLeaderboardData.lastUpdated))}</div>`;
  }
  const standingsHtml = !factionLeaderboardError && factionLeaderboardData ? factionLeaderboardStandingsHtml(factionLeaderboardData, ownFaction) : "";
  return `${standingsHtml}\n  <div class="fd-container fdm-gap"><div class="fdm-factions" id="factionLbFactions">${tabsHtml}</div></div>\n  ${ownRankHtml}\n  <div class="fd-container">\n    <div class="fd-container-head">\n      <span class="fd-container-title">${factionLeaderboardIconHtml()} ${escapeHtml(label)}</span>\n    </div>\n    <div class="fd-lb-list fd-lb-scroll">${listHtml}</div>\n    ${updatedHtml}\n  </div>`;
}

function factionLeaderboardRenderBody() {
  const el = $("factionLbBody");
  if (!el) return;
  el.innerHTML = factionLeaderboardBodyHtml();
  el.querySelectorAll(".fd-lb-tab").forEach(btn => {
    btn.onclick = () => {
      const f = btn.dataset.lbFaction;
      if (!f || factionLeaderboardActiveFaction === f) return;
      factionLeaderboardActiveFaction = f;
      factionLeaderboardRenderBody();
    };
  });
}

function factionLeaderboardViewHtml() {
  return `<div class="fd-lb-statement">Weekly Marks standings for each faction from Sunflower Land's official leaderboard (top 500 members of each faction, plus a few ranks around your own farm).</div>
  <div class="fd-lb-label">Faction Leader Boards</div>
  <div id="factionLbBody"></div>`;
}

const FACTION_MARKS_KITCHEN_BASE = 20;

const FACTION_MARKS_PET_BASES = [ 4, 8, 12, 20 ];

const FACTION_MARKS_WEEK_DAYS = 7;

const FACTION_MARKS_PARTS = [ [ "shirt", 0.2 ], [ "crown", 0.1 ], [ "hat", 0.1 ], [ "tool", 0.1 ], [ "pants", 0.05 ], [ "shoes", 0.05 ] ];

const FACTION_MARKS_PAW_BOOST = 0.25;

const FACTION_MARKS_CHAMPION_BOOST = 0.1;

const FACTION_CHAMPION_RETRY_MS = 60 * 1000;

let factionChampionFaction = null;

let factionChampionWeek = null;

let factionChampionLoading = false;

let factionChampionFailedAt = 0;

function factionChampionPreviousWeekKey() {
  return factionGetWeekKey(new Date(new Date(factionGetWeekKey() + "T00:00:00Z").getTime() - 7 * 24 * 60 * 60 * 1000));
}

function factionChampionPick(data) {
  if (!data || !data.factions) return null;
  let best = null;
  let bestScore = 0;
  FACTION_ORDER.forEach(f => {
    const fd = data.factions[f];
    const score = fd ? Number(fd.score) : NaN;
    if (isFinite(score) && score > 0 && score >= bestScore) {
      best = f;
      bestScore = score;
    }
  });
  return best;
}

function factionChampionApply() {
  const st = factionMarksState;
  if (!st || st.championTouched) return;
  st.champion = !!factionChampionFaction && factionChampionFaction === st.faction;
}

async function factionChampionEnsure() {
  const week = factionChampionPreviousWeekKey();
  if (factionChampionWeek === week || factionChampionLoading) return;
  if (factionChampionFailedAt && Date.now() - factionChampionFailedAt < FACTION_CHAMPION_RETRY_MS) return;
  const farmId = factionLeaderboardOwnFarmId();
  if (!farmId) return;
  factionChampionLoading = true;
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), FACTION_LEADERBOARD_TIMEOUT_MS);
  try {
    const url = SFL_COMMUNITY_PROXY_BASE + "community/data?type=marksLeaderboard&farmId=" + encodeURIComponent(farmId) + "&date=" + week;
    const res = await fetch(url, {
      cache: "no-store",
      signal: controller.signal
    });
    if (!res.ok) throw new Error("Request failed (" + res.status + ")");
    const json = await res.json();
    const data = json && json.data;
    if (!data || data.week !== week || data.status !== "ready") throw new Error("Previous week result not ready");
    const winner = factionChampionPick(data);
    if (!winner) throw new Error("No champion found");
    factionChampionFaction = winner;
    factionChampionWeek = week;
    factionChampionFailedAt = 0;
  } catch (e) {
    factionChampionFailedAt = Date.now();
  } finally {
    clearTimeout(timer);
    factionChampionLoading = false;
    factionChampionApply();
    if ($("factionMarksCalcBody") && factionMarksState) factionMarksRender();
  }
}

const FACTION_MARKS_OUTFITS = {
  bumpkins: { crown: "Bumpkin Crown", hat: "Bumpkin Helmet", shirt: "Bumpkin Armor", pants: "Bumpkin Pants", shoes: "Bumpkin Sabatons", tool: "Bumpkin Sword" },
  goblins: { crown: "Goblin Crown", hat: "Goblin Helmet", shirt: "Goblin Armor", pants: "Goblin Pants", shoes: "Goblin Sabatons", tool: "Goblin Axe" },
  sunflorians: { crown: "Sunflorian Crown", hat: "Sunflorian Helmet", shirt: "Sunflorian Armor", pants: "Sunflorian Pants", shoes: "Sunflorian Sabatons", tool: "Sunflorian Sword" },
  nightshades: { crown: "Nightshade Crown", hat: "Nightshade Helmet", shirt: "Nightshade Armor", pants: "Nightshade Pants", shoes: "Nightshade Sabatons", tool: "Nightshade Sword" }
};

const FACTION_MARKS_EMBLEMS = {
  bumpkins: "Bumpkin Emblem",
  goblins: "Goblin Emblem",
  sunflorians: "Sunflorian Emblem",
  nightshades: "Nightshade Emblem"
};

const FACTION_MARKS_EMBLEM_ICONS = {
  bumpkins: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAAQBAMAAADUulMJAAAAIGNIUk0AAHomAACAhAAA+gAAAIDoAAB1MAAA6mAAADqYAAAXcJy6UTwAAAAeUExURQAAACYrROSmcrhvUHQ/OQCV6Sbd8z8oMhJOif///4izTG8AAAABdFJOUwBA5thmAAAAAWJLR0QJ8dml7AAAAAd0SU1FB+gGDgAhMh0U9b8AAABqSURBVAjXFczRDYMwEANQZ4McmQDRBWIqwX9CN7iWAWgmyAYIibG5+/GT/WGECIHFkANjGk2huHyzTKY2NjW/rba/e/DjzqW85hGp9r7UjHT9yra72tW9lXpnhPXifkbYQKtAsF+rgIgAD1DCFni81o/qAAAAJXRFWHRkYXRlOmNyZWF0ZQAyMDI0LTA2LTE0VDAwOjMzOjUwKzAwOjAwpEOqQwAAACV0RVh0ZGF0ZTptb2RpZnkAMjAyNC0wNi0xNFQwMDozMzo1MCswMDowMNUeEv8AAAAodEVYdGRhdGU6dGltZXN0YW1wADIwMjQtMDYtMTRUMDA6MzM6NTArMDA6MDCCCzMgAAAAAElFTkSuQmCC",
  goblins: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQBAMAAADt3eJSAAAAIGNIUk0AAHomAACAhAAA+gAAAIDoAAB1MAAA6mAAADqYAAAXcJy6UTwAAAAeUExURQAAACYrROSmcrhvUHQ/OT6JSGPHTT8oMiZcQv///3uD4JYAAAABdFJOUwBA5thmAAAAAWJLR0QJ8dml7AAAAAd0SU1FB+gGDgAhM2oTxSkAAAB7SURBVAjXHY7BDYNADATXHRyYBg4dUb7k7sEXWUAB0UH+ECqgAxSJsmPzW61nRwYI5OAAlAX7wmvgWkLdaqAoIdqJ8/rI2hDP2/htHcpql7D3XtmUXqI0xWmSw+gqHyn3tvotw8c8fL2b6xZ25/M0IViCFab0dwF7A/gDFzESLuJNgaYAAAAldEVYdGRhdGU6Y3JlYXRlADIwMjQtMDYtMTRUMDA6MzM6NTArMDA6MDCkQ6pDAAAAJXRFWHRkYXRlOm1vZGlmeQAyMDI0LTA2LTE0VDAwOjMzOjUwKzAwOjAw1R4S/wAAACh0RVh0ZGF0ZTp0aW1lc3RhbXAAMjAyNC0wNi0xNFQwMDozMzo1MSswMDowMCR8OJQAAAAASUVORK5CYII=",
  sunflorians: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQBAMAAADt3eJSAAAAIGNIUk0AAHomAACAhAAA+gAAAIDoAAB1MAAA6mAAADqYAAAXcJy6UTwAAAAeUExURQAAACYrRIubtMDL3FppiP6uNP7nYTpEZvd2Iv///5NnjAAAAAABdFJOUwBA5thmAAAAAWJLR0QJ8dml7AAAAAd0SU1FB+gGDgAhMh0U9b8AAABzSURBVAjXY2BgYGAUYACRgoJChoKCAgzCRkpOJkrKhgyMIqFBpqGOQFmhsCSzVEUGECPFDcwQCXMySXUE6jJSUVF2UhZgYFRxd3cqcQIpbi1RiQArbg13BTMYNYJMm8CWCDVZgASAQk4mYAGgkCGEhjgDADkdEWSCmFzpAAAAJXRFWHRkYXRlOmNyZWF0ZQAyMDI0LTA2LTE0VDAwOjMzOjUwKzAwOjAwpEOqQwAAACV0RVh0ZGF0ZTptb2RpZnkAMjAyNC0wNi0xNFQwMDozMzo1MCswMDowMNUeEv8AAAAodEVYdGRhdGU6dGltZXN0YW1wADIwMjQtMDYtMTRUMDA6MzM6NTArMDA6MDCCCzMgAAAAAElFTkSuQmCC",
  nightshades: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAAQBAMAAADUulMJAAAAIGNIUk0AAHomAACAhAAA+gAAAIDoAAB1MAAA6mAAADqYAAAXcJy6UTwAAAAeUExURQAAACYrRIubtMDL3FppiLVQiOJqfzpEZmg4bP///+R+LWkAAAABdFJOUwBA5thmAAAAAWJLR0QJ8dml7AAAAAd0SU1FB+gGDgAhMh0U9b8AAABtSURBVAjXTY3RCYAgGAY/N0htAfuLehVaILEGCP5qgGoCJwgEx86IoKeDe7gDBCQKAEqSNJm6JmcfMnGmaBY65gKKT3+yQbnsNB0DdOVcX1koH0Lrs4+rG7cBKnHgZCC6SNuVwzpRsr/u93m/N8ZmE71X/ksVAAAAJXRFWHRkYXRlOmNyZWF0ZQAyMDI0LTA2LTE0VDAwOjMzOjUwKzAwOjAwpEOqQwAAACV0RVh0ZGF0ZTptb2RpZnkAMjAyNC0wNi0xNFQwMDozMzo1MCswMDowMNUeEv8AAAAodEVYdGRhdGU6dGltZXN0YW1wADIwMjQtMDYtMTRUMDA6MzM6NTArMDA6MDCCCzMgAAAAAElFTkSuQmCC"
};

const FACTION_MARKS_RANK_BOOSTS = [ 0, 0.05, 1.5, 3, 3.5, 3.8, 4 ];

const FACTION_MARKS_RANKS = {
  bumpkins: [ [ "Forager", 0 ], [ "Rancher", 25 ], [ "Agrarian", 300 ], [ "Steward", 2500 ], [ "Sentinel", 5200 ], [ "Warden", 9700 ], [ "Overseer", 23300 ] ],
  goblins: [ [ "Hobgoblin", 0 ], [ "Grunt", 20 ], [ "Marauder", 500 ], [ "Elite", 4200 ], [ "Commander", 8000 ], [ "Warchief", 13300 ], [ "Warlord", 23500 ] ],
  sunflorians: [ [ "Initiate", 0 ], [ "Squire", 15 ], [ "Captain", 250 ], [ "Knight", 3000 ], [ "Guardian", 6000 ], [ "Paladin", 11000 ], [ "Archduke", 24000 ] ],
  nightshades: [ [ "Pagan", 0 ], [ "Occultist", 20 ], [ "Enchanter", 290 ], [ "Raver", 2700 ], [ "Witch", 5500 ], [ "Sorcerer", 8700 ], [ "Lich", 16850 ] ]
};

let factionMarksState = null;

let factionMarksScope = "today";

let factionMarksCostMode = "buy";

function factionMarksUnitCost(name) {
  try {
    const coins = craftingBoxHasRecipe(name) ? craftingBoxUnitCostCoinsForMode(name, factionMarksCostMode) : cookingIngredientUnitCostCoins(name, factionMarksCostMode);
    if (!(coins > 0)) return 0;
    return coinsToFlower(coins);
  } catch (e) {
    return 0;
  }
}

function factionMarksCostIconHtml() {
  return FLOWER_ICON;
}

function factionMarksTodayKey() {
  const d = new Date().getUTCDay();
  return d === 0 ? 7 : d;
}

function factionMarksEquippedSet(g) {
  const names = new Set;
  const add = b => {
    const eq = farmSyncAsObj(b && b.equipped);
    if (!eq) return;
    Object.values(eq).forEach(v => {
      if (typeof v === "string" && v) names.add(v);
    });
  };
  add(g && g.bumpkin);
  const hands = farmSyncAsObj(g && g.farmHands);
  const bumpkins = hands ? hands.bumpkins : null;
  const list = Array.isArray(bumpkins) ? bumpkins : Object.values(farmSyncAsObj(bumpkins) || {});
  list.forEach(add);
  return names;
}

function factionMarksBuildState(faction) {
  const g = farmPanelGameState;
  const own = g ? farmSyncGetFaction(g) : null;
  const synced = !!(own && own.name === faction);
  const st = { faction: faction, synced: synced, wear: {}, paw: false, champion: !!factionChampionFaction && factionChampionFaction === faction, championTouched: false, emblems: 0, kitchen: [], pet: [] };
  if (synced) {
    const day = factionMarksTodayKey();
    const doneOf = r => {
      const o = farmSyncAsObj(r && r.dailyFulfilled);
      if (!o) return 0;
      return Number(o[day] != null ? o[day] : o[String(day)]) || 0;
    };
    const equipped = factionMarksEquippedSet(g);
    const outfit = FACTION_MARKS_OUTFITS[faction];
    FACTION_MARKS_PARTS.forEach(p => {
      st.wear[p[0]] = equipped.has(outfit[p[0]]);
    });
    st.paw = equipped.has("Paw Shield");
    const inv = farmSyncAsObj(g.inventory);
    st.emblems = inv ? Math.max(0, Math.floor(Number(inv[FACTION_MARKS_EMBLEMS[faction]]) || 0)) : 0;
    const kitchen = farmSyncAsObj(own.kitchen);
    const pet = farmSyncAsObj(own.pet);
    (kitchen && Array.isArray(kitchen.requests) ? kitchen.requests : []).forEach(r => {
      st.kitchen.push({ item: r.item, amount: Number(r.amount) || 0, done: doneOf(r), deliver: 1 });
    });
    (pet && Array.isArray(pet.requests) ? pet.requests : []).forEach(r => {
      st.pet.push({ item: r.food, amount: Number(r.quantity) || 0, done: doneOf(r), deliver: 1 });
    });
  } else {
    const prediction = factionDeliveryPredict(faction, factionGetWeekKey());
    const set = prediction && prediction.set;
    ((set && set.kitchen) || []).forEach(r => {
      st.kitchen.push({ item: r.item, amount: Number(r.amount) || 0, done: 0, deliver: 1 });
    });
    ((set && set.pet) || []).forEach(r => {
      st.pet.push({ item: r.food, amount: Number(r.quantity) || 0, done: 0, deliver: 1 });
    });
  }
  return st;
}

function factionMarksRankIndex(faction, emblems) {
  let idx = 0;
  FACTION_MARKS_RANKS[faction].forEach((r, i) => {
    if (emblems >= r[1]) idx = i;
  });
  return idx;
}

function factionMarksFloorStart(base) {
  return Math.ceil((base - 1) / 2) + 1;
}

function factionMarksSeriesSum(base, done, n) {
  let sum = 0;
  for (let i = 0; i < n; i++) sum += Math.max(base - (done + i) * 2, 1);
  return sum;
}

function factionMarksCompute() {
  const st = factionMarksState;
  const week = factionMarksScope === "week";
  const days = week ? FACTION_MARKS_WEEK_DAYS : 1;
  let wear = 0;
  FACTION_MARKS_PARTS.forEach(p => {
    if (!st.wear[p[0]]) return;
    if (p[0] === "hat" && st.wear.crown) return;
    wear += p[1];
  });
  const rankIdx = factionMarksRankIndex(st.faction, st.emblems);
  const rank = FACTION_MARKS_RANK_BOOSTS[rankIdx];
  const champion = st.champion ? FACTION_MARKS_CHAMPION_BOOST : 0;
  const kitchenMult = 1 + wear + rank + champion;
  const petMult = kitchenMult + (st.paw ? FACTION_MARKS_PAW_BOOST : 0);
  const build = (reqs, baseOf, mult) => {
    const rows = reqs.map((r, i) => {
      const base = baseOf(i);
      const done = 0;
      const baseSum = factionMarksSeriesSum(base, done, r.deliver);
      const unitCost = factionMarksUnitCost(r.item);
      const lastNo = done + Math.max(r.deliver, 1);
      return {
        base: base,
        done: done,
        mult: mult,
        lastNo: lastNo,
        rate: Math.max(base - (lastNo - 1) * 2, 1) * mult,
        items: r.amount * r.deliver * days,
        marks: baseSum * mult * days,
        cost: unitCost * r.amount * r.deliver * days,
        next: Math.max(base - done * 2, 1),
        floorStart: factionMarksFloorStart(base)
      };
    });
    return {
      rows: rows,
      marks: rows.reduce((a, r) => a + r.marks, 0),
      cost: rows.reduce((a, r) => a + r.cost, 0)
    };
  };
  const kitchen = build(st.kitchen, () => FACTION_MARKS_KITCHEN_BASE, kitchenMult);
  const pet = build(st.pet, i => FACTION_MARKS_PET_BASES[Math.min(i, FACTION_MARKS_PET_BASES.length - 1)], petMult);
  return { wear: wear, rank: rank, champion: champion, rankIdx: rankIdx, kitchenMult: kitchenMult, petMult: petMult, days: days, week: week, kitchen: kitchen, pet: pet };
}

function factionMarksMarkIconHtml() {
  return `<img src="${MARK_ICON_SRC}" alt="Marks" style="width:12px;height:12px;image-rendering:pixelated;vertical-align:-2px;">`;
}

function factionMarksRequestRowHtml(kind, i, req, calc) {
  const stopAt = calc.floorStart - 1;
  const planned = calc.done + req.deliver;
  let hint = `Next pays ${fmtInt(calc.next)} · drops to 1 from delivery #${fmtInt(calc.floorStart)}`;
  if (planned > stopAt) {
    const extra = planned - Math.max(stopAt, calc.done);
    hint = `${fmtInt(extra)} planned ${extra === 1 ? "delivery pays" : "deliveries pay"} only 1 · best stop is delivery #${fmtInt(stopAt)}`;
  } else if (planned === stopAt) {
    hint = `Stop point reached · next deliveries pay only 1`;
  }
  const doneText = `${fmtInt(req.amount)} per delivery`;
  return `<div class="fd-item-row fdm-row">
    <div class="fdm-line">
      <span class="fd-item-main">${factionDeliveryIconHtml(req.item)} ${escapeHtml(req.item)}</span>
      <span class="fdm-nums"><span class="fdm-marks-num"><b class="fdm-plus">+</b>${fmtXp(calc.marks)} ${factionMarksMarkIconHtml()}</span><span>${calc.cost.toFixed(2)} ${factionMarksCostIconHtml()}</span></span>
    </div>
    <div class="fdm-split">
      <div class="fdm-main">
        <span class="fd-item-cost">${doneText}</span>
        <span class="fdm-stepper">
          <input type="number" min="0" max="999" step="1" inputmode="numeric" class="fdm-count-input" data-act="deliver" data-kind="${kind}" data-i="${i}" value="${req.deliver}">
          <span class="fdm-ctrls">
            <button type="button" class="fd-lb-tab fdm-pm" data-act="dec" data-kind="${kind}" data-i="${i}">-</button>
            <button type="button" class="fd-lb-tab fdm-pm" data-act="inc" data-kind="${kind}" data-i="${i}">+</button>
            <button type="button" class="fd-lb-tab fdm-stop" data-act="stop" data-kind="${kind}" data-i="${i}">Stop</button>
          </span>
        </span>
        <span class="fd-item-cost">${escapeHtml(hint)}</span>
      </div>
      <div class="fdm-side">
        <div class="fdm-side-total">×${fmtInt(calc.items)} ${factionDeliveryIconHtml(req.item)} ${escapeHtml(req.item)}</div>
        <div class="fdm-side-rate"><b class="fdm-plus">+</b>${fmtXp(calc.rate)} ${factionMarksMarkIconHtml()} Marks</div>
        <div class="fd-item-cost">Delivery #${fmtInt(calc.lastNo)}</div>
      </div>
    </div>
  </div>`;
}

function factionMarksModeHtml() {
  const label = factionMarksScope === "week" ? `Week (×${FACTION_MARKS_WEEK_DAYS})` : "1 Day";
  return `<span class="fdm-mode"><span class="fd-item-cost">Calc Mode</span><span class="fd-badge">${label}</span></span>`;
}

function factionMarksSectionHtml(title, kind, reqs, result) {
  const rowsHtml = reqs.length ? reqs.map((r, i) => factionMarksRequestRowHtml(kind, i, r, result.rows[i])).join("") : `<div class="fd-empty-note">No ${title.toLowerCase()} requests known yet.</div>`;
  return `<div class="fd-container">
    <div class="fd-container-head"><span class="fd-container-title">${title}</span>${factionMarksModeHtml()}</div>
    ${rowsHtml}
    <div class="fd-stat"><span class="fd-stat-label">Total:</span><span class="fd-stat-value">${fmtXp(result.marks)} ${factionMarksMarkIconHtml()} Marks</span></div>
    <div class="fd-stat"><span class="fd-stat-label">Total Cost:</span><span class="fd-stat-value">${result.cost.toFixed(2)} ${factionMarksCostIconHtml()}</span></div>
  </div>`;
}

function factionMarksBoostsHtml(calc) {
  const st = factionMarksState;
  const outfit = FACTION_MARKS_OUTFITS[st.faction];
  const partsHtml = FACTION_MARKS_PARTS.map(p => {
    const blocked = p[0] === "hat" && st.wear.crown;
    const on = !!st.wear[p[0]] && !blocked;
    return `<button type="button" class="fd-lb-tab fdm-opt${on ? " active" : ""}${blocked ? " fdm-off" : ""}" data-act="wear" data-part="${p[0]}"><span>${escapeHtml(outfit[p[0]])}</span><b>+${Math.round(p[1] * 100)}%</b></button>`;
  }).join("");
  const pawHtml = `<button type="button" class="fd-lb-tab fdm-opt${st.paw ? " active" : ""}" data-act="paw"><span>Paw Shield</span><b>+${Math.round(FACTION_MARKS_PAW_BOOST * 100)}%</b></button>`;
  const championHtml = `<button type="button" class="fd-lb-tab fdm-opt${st.champion ? " active" : ""}" data-act="champion"><span>Bonus Marks</span><b>+${Math.round(FACTION_MARKS_CHAMPION_BOOST * 100)}%</b></button>`;
  const ranksHtml = FACTION_MARKS_RANKS[st.faction].map((r, i) => {
    return `<button type="button" class="fd-lb-tab fdm-rank${i === calc.rankIdx ? " active" : ""}" data-act="rank" data-idx="${i}"><span>${escapeHtml(r[0])}</span><span>${fmtInt(r[1])}</span><span>+${fmtInt(FACTION_MARKS_RANK_BOOSTS[i] * 100)}%</span></button>`;
  }).join("");
  const syncText = st.synced ? "Synced from your farm" : "Manual setup — sync your farm to auto-fill";
  return `<div class="fd-container">
    <div class="fd-container-head">
      <span class="fd-container-title">Marks Boosts</span>
      <button type="button" class="fd-lb-btn fdm-reset" data-act="reset">Reset</button>
    </div>
    <div class="fd-section-label">Outfit</div>
    <div class="fdm-opts">${partsHtml}</div>
    <div class="fdm-boost-row">
      <div class="fdm-boost-col">
        <div class="fd-section-label">Pet only</div>
        <div class="fdm-opts fdm-opts-one">${pawHtml}</div>
      </div>
      <div class="fdm-boost-col">
        <div class="fd-section-label">Champion faction</div>
        <div class="fdm-opts fdm-opts-one">${championHtml}</div>
      </div>
    </div>
    <div class="fd-section-label">Emblems</div>
    <div class="fdm-emblem-line"><img src="${FACTION_MARKS_EMBLEM_ICONS[st.faction]}" alt="${FACTION_MARKS_EMBLEMS[st.faction]}" style="width:20px;height:20px;image-rendering:pixelated;"><input type="number" min="0" step="1" inputmode="numeric" class="fdm-emblem-input" data-act="emblems" value="${st.emblems}"></div>
    <div class="fdm-ranks">${ranksHtml}</div>
    <div class="fd-own-stats">
      <div class="fd-stat"><span class="fd-stat-label">Kitchen boost</span><span class="fd-stat-value">+${fmtInt((calc.kitchenMult - 1) * 100)}% · x${fmtXp(calc.kitchenMult)}</span></div>
      <div class="fd-stat"><span class="fd-stat-label">Pet boost</span><span class="fd-stat-value">+${fmtInt((calc.petMult - 1) * 100)}% · x${fmtXp(calc.petMult)}</span></div>
    </div>
    <div class="fd-synced-note">${syncText}</div>
  </div>`;
}

function factionMarksBodyHtml() {
  const st = factionMarksState;
  const calc = factionMarksCompute();
  const tabsHtml = FACTION_ORDER.map(f => {
    const bannerHtml = FACTION_BANNER_ICONS[f] ? `<img src="${FACTION_BANNER_ICONS[f]}" alt="" style="width:14px;height:14px;image-rendering:pixelated;vertical-align:-2px;">` : "";
    const trophyHtml = f === factionChampionFaction ? `<img class="fdm-champ-trophy" src="${FACTION_LEADERBOARD_ICON_SRC}" alt="Champion">` : "";
    return `<button type="button" class="fd-lb-tab fdm-faction-tab${f === st.faction ? " active" : ""}" data-act="faction" data-faction="${f}">${bannerHtml} ${escapeHtml(factionLeaderboardSingularLabel(f))}${trophyHtml}</button>`;
  }).join("");
  const modeHtml = `<div class="fd-container fdm-gap">
    <div class="fd-container-head"><span class="fd-container-title">Calc Mode</span></div>
    <div class="fdm-pair">
      <button type="button" data-act="scope" data-scope="today" class="fd-lb-tab${calc.week ? "" : " active"}">1 Day</button>
      <button type="button" data-act="scope" data-scope="week" class="fd-lb-tab${calc.week ? " active" : ""}">Week (×${FACTION_MARKS_WEEK_DAYS})</button>
    </div>
    <div class="fdm-inline">
      <div class="fd-section-label">Materials</div>
      <div class="fdm-pair">
        <button type="button" data-act="cost" data-cost="collect" class="fd-lb-tab${factionMarksCostMode === "collect" ? " active" : ""}">Collect</button>
        <button type="button" data-act="cost" data-cost="buy" class="fd-lb-tab${factionMarksCostMode === "buy" ? " active" : ""}">Buy</button>
      </div>
    </div>
  </div>`;
  const weekNote = calc.week ? `<div class="fd-week-info">Week view repeats your plan on each of the ${FACTION_MARKS_WEEK_DAYS} days, starting every day from 0 deliveries.</div>` : "";
  const allMarks = calc.kitchen.marks + calc.pet.marks;
  const allCost = calc.kitchen.cost + calc.pet.cost;
  const totalHtml = `<div class="fd-container is-own">
    <div class="fd-container-head"><span class="fd-container-title">${calc.week ? "Week Total" : "1 Day Total"}</span></div>
    <div class="fd-stat"><span class="fd-stat-label">Total:</span><span class="fd-stat-value">${fmtXp(allMarks)} ${factionMarksMarkIconHtml()} Marks</span></div>
    <div class="fd-stat"><span class="fd-stat-label">Total Cost:</span><span class="fd-stat-value">${allCost.toFixed(2)} ${factionMarksCostIconHtml()}</span></div>
  </div>`;
  return `<div class="fdm-layout">
    <div class="fdm-row-top">
      <div class="fd-container fdm-gap fdm-tabs-card"><div class="fdm-factions">${tabsHtml}</div></div>
      ${modeHtml}
    </div>
    ${weekNote}
    <div class="fdm-row-boost">${factionMarksBoostsHtml(calc)}</div>
    <div class="fdm-row-sections">
      ${factionMarksSectionHtml("Kitchen", "kitchen", st.kitchen, calc.kitchen)}
      ${factionMarksSectionHtml("Pet", "pet", st.pet, calc.pet)}
    </div>
    <div class="fdm-row-total">${totalHtml}</div>
  </div>`;
}

function factionMarksRender() {
  const el = $("factionMarksCalcBody");
  if (!el) return;
  if (!factionMarksState) {
    const own = farmPanelGameState ? farmSyncGetFaction(farmPanelGameState) : null;
    const faction = own ? own.name : factionDeliveryGetOwnFaction() || FACTION_ORDER[0];
    factionMarksState = factionMarksBuildState(faction);
  }
  el.innerHTML = factionMarksBodyHtml();
  factionChampionEnsure();
}

function factionMarksHandleClick(e) {
  const btn = e.target.closest("[data-act]");
  if (!btn || btn.tagName === "INPUT") return;
  const st = factionMarksState;
  if (!st) return;
  const act = btn.dataset.act;
  const list = btn.dataset.kind === "pet" ? st.pet : st.kitchen;
  const req = list ? list[Number(btn.dataset.i)] : null;
  if (act === "faction") {
    if (btn.dataset.faction === st.faction) return;
    factionMarksState = factionMarksBuildState(btn.dataset.faction);
  } else if (act === "scope") {
    factionMarksScope = btn.dataset.scope;
  } else if (act === "cost") {
    factionMarksCostMode = btn.dataset.cost === "collect" ? "collect" : "buy";
  } else if (act === "wear") {
    const part = btn.dataset.part;
    if (part === "hat" && st.wear.crown) return;
    st.wear[part] = !st.wear[part];
  } else if (act === "paw") {
    st.paw = !st.paw;
  } else if (act === "champion") {
    st.champion = !st.champion;
    st.championTouched = true;
  } else if (act === "rank") {
    st.emblems = FACTION_MARKS_RANKS[st.faction][Number(btn.dataset.idx)][1];
  } else if (act === "reset") {
    factionMarksState = factionMarksBuildState(st.faction);
  } else if (act === "inc" && req) {
    req.deliver = Math.min(req.deliver + 1, 999);
  } else if (act === "dec" && req) {
    req.deliver = Math.max(req.deliver - 1, 0);
  } else if (act === "stop" && req) {
    const base = btn.dataset.kind === "pet" ? FACTION_MARKS_PET_BASES[Math.min(Number(btn.dataset.i), FACTION_MARKS_PET_BASES.length - 1)] : FACTION_MARKS_KITCHEN_BASE;
    const done = 0;
    req.deliver = Math.max(factionMarksFloorStart(base) - 1 - done, 0);
  } else {
    return;
  }
  factionMarksRender();
}

function factionMarksHandleChange(e) {
  const input = e.target.closest("input[data-act]");
  if (!input || !factionMarksState) return;
  const value = Math.max(0, Math.floor(Number(input.value) || 0));
  if (input.dataset.act === "emblems") {
    factionMarksState.emblems = value;
  } else if (input.dataset.act === "deliver") {
    const list = input.dataset.kind === "pet" ? factionMarksState.pet : factionMarksState.kitchen;
    const req = list[Number(input.dataset.i)];
    if (!req) return;
    req.deliver = Math.min(value, 999);
  } else {
    return;
  }
  factionMarksRender();
}

function factionMarksOpen() {
  const el = $("factionMarksCalcBody");
  if (!el) return;
  if (!el.dataset.bound) {
    el.dataset.bound = "1";
    el.addEventListener("click", factionMarksHandleClick);
    el.addEventListener("change", factionMarksHandleChange);
  }
  factionMarksRender();
}

function factionMarksCalcViewHtml() {
  return `<div class="fd-lb-label">Marks Calculator</div>
  <div class="fd-mc-body" id="factionMarksCalcBody"></div>`;
}

const FACTION_SUB_PANELS = {
  leaderboard: {
    viewId: "factionLeaderboardView",
    btnId: "factionLeaderboardBtn",
    label: () => `${factionLeaderboardIconHtml()} Leader Board`
  },
  marks: {
    viewId: "factionMarksCalcView",
    btnId: "factionMarksCalcBtn",
    label: () => `<img src="${MARK_ICON_SRC}" alt="" style="width:14px;height:14px;image-rendering:pixelated;vertical-align:-2px;"> Marks Calculator`
  }
};

const FACTION_SUB_KEYS = Object.keys(FACTION_SUB_PANELS);

const factionSubOpen = {
  leaderboard: false,
  marks: false
};

let factionSubLast = null;

function factionSubIsDesktop() {
  return typeof window !== "undefined" && typeof window.matchMedia === "function" && window.matchMedia("(min-width:900px)").matches;
}

function factionSubApplyView() {
  const openKeys = FACTION_SUB_KEYS.filter(k => factionSubOpen[k]);
  const anyOpen = openKeys.length > 0;
  const deliveryView = $("factionDeliveryView");
  const wrap = $("factionSubPanels");
  if (deliveryView) deliveryView.style.display = anyOpen ? "none" : "";
  if (wrap) wrap.style.display = anyOpen ? "" : "none";
  FACTION_SUB_KEYS.forEach(k => {
    const cfg = FACTION_SUB_PANELS[k];
    const view = $(cfg.viewId);
    const btn = $(cfg.btnId);
    if (view) view.style.display = factionSubOpen[k] ? "" : "none";
    if (btn) {
      btn.classList.toggle("active", factionSubOpen[k]);
      btn.innerHTML = !factionSubOpen[k] ? cfg.label() : openKeys.length > 1 ? "✕ Close" : `${factionDeliveryButtonIconHtml()} Back to Deliveries`;
    }
  });
}

function factionSubSetOpen(key, open, syncRoute) {
  if (!FACTION_SUB_PANELS[key]) return;
  if (factionSubIsDesktop()) {
    FACTION_SUB_KEYS.forEach(k => {
      factionSubOpen[k] = open;
    });
  } else {
    if (open) {
      FACTION_SUB_KEYS.forEach(k => {
        if (k !== key) factionSubOpen[k] = false;
      });
    }
    factionSubOpen[key] = open;
  }
  if (open) {
    factionSubLast = key;
  } else if (factionSubLast === key || !FACTION_SUB_KEYS.some(k => factionSubOpen[k])) {
    factionSubLast = FACTION_SUB_KEYS.find(k => factionSubOpen[k]) || null;
  }
  factionSubApplyView();
  if (open && factionSubOpen.leaderboard) {
    if (!factionLeaderboardActiveFaction) factionLeaderboardActiveFaction = factionDeliveryGetOwnFaction() || FACTION_ORDER[0];
    factionLeaderboardRenderBody();
    factionLeaderboardFetchData(factionLeaderboardOwnFarmId(), false);
  }
  if (open && factionSubOpen.marks) factionMarksOpen();
  if (syncRoute) syncFactionSubRoute(factionSubLast);
}

function factionSubKeyFromLocation() {
  if (typeof window === "undefined") return null;
  const slug = window.location.pathname.replace(/^\/+|\/+$/g, "").toLowerCase();
  const key = slug.indexOf("faction/") === 0 ? slug.slice("faction/".length) : null;
  return key && FACTION_SUB_PANELS[key] ? key : null;
}

let factionDeliveryWeekMode = "this";

function factionDeliveryTargetWeek() {
  const current = factionGetWeekKey();
  return factionDeliveryWeekMode === "next" ? factionRoutineShiftWeek(current, 1) : current;
}

function factionDeliveryWeekInfoText(weekKey) {
  const label = factionDeliveryWeekMode === "next" ? "Next week" : "This week";
  return `${label} · week of ${weekKey} (UTC) · routine week ${factionRoutineIndexForWeek(weekKey) + 1}/12`;
}

function factionDeliveryUpdateWeekInfo() {
  const el = $("factionWeekInfo");
  if (!el) return;
  el.textContent = factionDeliveryWeekInfoText(factionDeliveryTargetWeek());
}

function factionDeliveryOrderedFactions(ownFaction) {
  if (!ownFaction || !FACTION_ORDER.includes(ownFaction)) return FACTION_ORDER;
  return [ ownFaction ].concat(FACTION_ORDER.filter(f => f !== ownFaction));
}

function factionDeliveryRefreshGrid() {
  const grid = $("factionDeliveryGrid");
  if (!grid) return;
  craftingBoxClearCostCache();
  factionDeliveryIngestMainFarm();
  const weekKey = factionDeliveryTargetWeek();
  const cache = factionDeliveryLoadCache();
  const ownFaction = factionDeliveryGetOwnFaction();
  grid.innerHTML = factionDeliveryOrderedFactions(ownFaction).map(f => factionDeliveryContainerHtml(f, cache[f], f === ownFaction, weekKey)).join("");
  const filter = $("factionWeekFilter");
  if (filter) filter.querySelectorAll("button").forEach(btn => btn.classList.toggle("active", btn.dataset.week === factionDeliveryWeekMode));
  factionDeliveryUpdateWeekInfo();
}

export function renderFactionDeliveryPanel() {
  const body = $("factionBody");
  if (!body) return;
  factionDeliveryWeekMode = "this";
  FACTION_SUB_KEYS.forEach(k => {
    factionSubOpen[k] = false;
  });
  factionSubLast = null;
  ensureFactionPetCommunityLoaded();
  body.innerHTML = `
    <div class="fd-title">Factions Deliveries</div>
    <div class="fd-note">Your connected farm sets the routine week and shows your faction's real requests. The other three factions follow the same routine for this week and next week.</div>
    <div class="fd-container fdm-gap">
      <div class="fdm-pair fdm-flush">
        <button type="button" class="fd-lb-btn" id="factionLeaderboardBtn">${FACTION_SUB_PANELS.leaderboard.label()}</button>
        <button type="button" class="fd-lb-btn" id="factionMarksCalcBtn">${FACTION_SUB_PANELS.marks.label()}</button>
      </div>
    </div>
    <div id="factionDeliveryView">
      <div class="fd-container fdm-gap">
        <div class="fd-container-head"><span class="fd-container-title">Faction Request</span></div>
        <div class="fdm-pair fdm-flush" id="factionWeekFilter">
          <button type="button" data-week="this" class="fd-lb-tab active">This Week</button>
          <button type="button" data-week="next" class="fd-lb-tab">Next Week</button>
        </div>
      </div>
      <div class="fd-week-info" id="factionWeekInfo"></div>
      <div class="fd-grid" id="factionDeliveryGrid"></div>
    </div>
    <div id="factionSubPanels" class="fd-sub-stack" style="display:none;">
      <div id="factionLeaderboardView" class="fd-lb-view fd-sub-view" style="display:none;">
        ${factionLeaderboardViewHtml()}
      </div>
      <div id="factionMarksCalcView" class="fd-lb-view fd-sub-view" style="display:none;">
        ${factionMarksCalcViewHtml()}
      </div>
    </div>
  `;
  const filter = $("factionWeekFilter");
  if (filter) {
    filter.querySelectorAll("button").forEach(btn => {
      btn.onclick = () => {
        if (factionDeliveryWeekMode === btn.dataset.week) return;
        factionDeliveryWeekMode = btn.dataset.week;
        factionDeliveryRefreshGrid();
      };
    });
  }
  const grid = $("factionDeliveryGrid");
  if (grid) {
    grid.onclick = e => {
      const btn = e.target.closest(".fd-copy-icon");
      if (!btn) return;
      const text = factionDeliveryDecodeCopy(btn.dataset.copy);
      if (!text) return;
      factionDeliveryDoCopy(text, btn);
    };
  }
  FACTION_SUB_KEYS.forEach(k => {
    const btn = $(FACTION_SUB_PANELS[k].btnId);
    if (btn) btn.onclick = () => factionSubSetOpen(k, !factionSubOpen[k], true);
  });
  factionDeliveryRefreshGrid();
  const routeKey = factionSubKeyFromLocation();
  if (routeKey) factionSubSetOpen(routeKey, true, false);
}
