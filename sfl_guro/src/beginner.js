import { ICON_DATA } from "./icon_data.js";
import { selectedBoosts, FISH_MARKET_SEASON_RECIPES, computeBasicFishFigures, previewSeason, BASE_CROPS, BASE_FRUITS, BOOSTS, FACTION_DISPLAY_NAMES, FACTION_PET_BOOST_TIERS, FACTION_PET_HAPPY_ICONS, factionPetGetActiveTier, farmSyncAsObj, farmSyncGetFaction, farmSyncGetFactionPetInfo, isCropInSeason, isFruitInSeason, cookingGuaranteedCatchOn, fishCatchYieldMult, setCookingGuaranteedCatchOn, COIN_ICON, COOKING_BUILDING_ICONS, COOKING_RECIPES, COOK_LEVEL_XP, ES_ISLAND_UPGRADE_COST, ES_REQ_TABLE, FISH_CATCH_DATA, FISH_CATCH_NAMES, FLOWER_ICON, NPC_ICONS, SKILL_BOOSTS, cookGetLevelInfo, cookingComputeFoodExp, cookingComputeFoodTime, cookingFindRecipeForFood, currentSeason, escapeHtml, esGetNodesAt, farmSyncGetApiUsername, fishCatchComputeXP, computeAgedFishFigures, fmt, fmtInt, formatDuration, boostsConflict, isBoostActive, isFishInSeason, isSkillActive, coinsToFlower, profileGetG, profileGetInventoryAmount, setSkillTreeSectionOpen } from "./calculator.js";

import { farmPanelGetLastInfo } from "./inprogress.js";

import { cookingCostMode, isFishingBuyMode, fishMarketItemForFish, fishMarketPanelCostCoins, cookingIngredientUnitCostCoins, findCosmeticPriceForName, findLiveNftPriceForName, findLivePriceForName, fishCatchStageCostCoins, fishRodCostCoins, getMaterialUnitCostCoins, invalidateCostCache, runWithGuideRestock } from "./prices.js";

import { WB_BUILDINGS, WB_TOOLS } from "./workbench.js";

import { guideBodyHtml, guideSkillGroups, guideTabs, handleGuideChange, handleGuideClick, handleGuideInput, levelSimBox, setCatTab, setFarmStrat, setFarmStratTab, setLevelSimRenderer, setSkillLevelLookup, simButtons, simCheck, simOilCheck, simPetButtons, petDefault, petFlagIds, BG_PET_FLAG, BG_VIP_FLAG, simVipCheck, simOwnedCheck, simRankMax, simRankOf, simRankPicker, simRegister, simResultHtml, simUnsavedNote } from "./beginner_guides.js";

import { $, cookFoodIcon, dailyProfitGuideSnapshot, getBoostIcon, getIcon, openBoostPanel, toggleMainView } from "./ui.js";

const BG_GOAL_LEVEL = 100;

const BG_DAY = 86400;

const BG_MAX_CRAFTS = 150;

const BG_BASE_CASTS = 20;

const BG_FISH_LEVEL = 5;

const BG_ADV_FISH_LEVEL = 25;

const BG_EXPERT_FISH_LEVEL = 25;

const BG_STORE_KEY = "hl_beginner_state_v2";

const BG_SHARDS_PER_CRYSTAL = 3;

const BG_SEED_LEVEL = {
  "Sunflower Seed": 1,
  "Potato Seed": 1,
  "Rhubarb Seed": 1,
  "Pumpkin Seed": 2,
  "Zucchini Seed": 2,
  "Carrot Seed": 2,
  "Yam Seed": 2,
  "Cabbage Seed": 3,
  "Broccoli Seed": 3,
  "Soybean Seed": 3,
  "Beetroot Seed": 3,
  "Pepper Seed": 3,
  "Cauliflower Seed": 4,
  "Parsnip Seed": 4,
  "Eggplant Seed": 5,
  "Corn Seed": 5,
  "Onion Seed": 5,
  "Radish Seed": 5,
  "Wheat Seed": 5,
  "Turnip Seed": 6,
  "Kale Seed": 7,
  "Artichoke Seed": 8,
  "Barley Seed": 14,
  "Tomato Seed": 13,
  "Lemon Seed": 12,
  "Blueberry Seed": 13,
  "Orange Seed": 14,
  "Apple Seed": 15
};

const BG_RAW_BUILDING = {
  Milk: "Barn",
  Egg: "Hen House"
};

const BG_RAW_ANIMAL = {
  Milk: "cow",
  Egg: "chicken"
};

let animalGateState = null;

let animalGateSnap = null;

function animalSelfProduceOk(raw, st) {
  const type = BG_RAW_ANIMAL[raw];
  if (!type || !st.synced) return null;
  if (animalGateState !== st) {
    animalGateState = st;
    animalGateSnap = dailyProfitGuideSnapshot();
  }
  const entry = animalGateSnap.items.get("animal:" + type);
  return !!(entry && entry.count > 0 && entry.net24h > 0);
}

const BG_SKILL_RANKS = {
  skill_munching_mastery: {
    eff: [ .05, .075, .1 ],
    kind: "allExp"
  },
  skill_drive_through_deli: {
    eff: [ .15, .2, .25 ],
    kind: "deliExp"
  },
  skill_juicy_boost: {
    eff: [ .1, .2, .3 ],
    kind: "smoothieExp"
  },
  skill_fiery_jackpot: {
    eff: [ .2, .35, .5 ],
    kind: "firePitOutput"
  },
  skill_double_nom: {
    eff: [ 1, 2, 3 ],
    kind: "allOutput"
  },
  skill_fast_feasts: {
    eff: [ .1, .15, .2 ],
    kind: "time"
  },
  skill_swift_sizzle: {
    eff: [ .4, .45, .5 ],
    kind: "oil"
  },
  skill_fishy_feast: {
    eff: [ .2, .3, .4 ],
    kind: "fishExp"
  },
  skill_fishy_chance: {
    eff: [ .1, .125, .15 ],
    kind: "yield"
  },
  skill_fishy_roll: {
    eff: [ .1, .125, .15 ],
    kind: "yield"
  },
  skill_fishy_gamble: {
    eff: [ .2, .25, .3 ],
    kind: "yield"
  },
  skill_fishermans_5_rod: {
    eff: [ 5, 7, 10 ],
    kind: "casts"
  },
  skill_fishermans_10_fold: {
    eff: [ 10, 18, 25 ],
    kind: "casts"
  },
  skill_more_with_less: {
    eff: [ 10, 25, 50 ],
    kind: "casts"
  }
};

const BG_KIND_WEIGHT = {
  allOutput: 1,
  firePitOutput: 1,
  allExp: 1,
  fishExp: .6,
  deliExp: .3,
  smoothieExp: .1,
  time: .1,
  oil: .1,
  yield: 1,
  casts: .05
};

const BG_OIL_BASE = {
  "Fire Pit": .2,
  Kitchen: .25,
  "Smoothie Shack": .3,
  Bakery: .35,
  Deli: .4
};

const BG_OIL_RANKS = {
  "Fire Pit": {
    skill: "skill_swift_sizzle",
    name: "Swift Sizzle",
    eff: [ .4, .45, .5 ]
  },
  Kitchen: {
    skill: "skill_turbo_fry",
    name: "Turbo Fry",
    eff: [ .5, .55, .6 ]
  },
  Deli: {
    skill: "skill_fry_frenzy",
    name: "Fry Frenzy",
    eff: [ .6, .65, .7 ]
  }
};

const BG_OIL_BUILDINGS = [ "Fire Pit", "Kitchen", "Smoothie Shack", "Bakery", "Deli" ];

const BG_OIL_OFF = "oiloff:";

const BG_OIL_DAILY = {
  "Fire Pit": 1,
  Kitchen: 5,
  "Smoothie Shack": 8,
  Bakery: 10,
  Deli: 12
};

const BG_STRATS = {
  less: {
    label: "Mid Cost Level",
    desc: "This offers a mid cost and a little faster leveling for your Bumpkin. Keep cooking Pizza Margherita in the Fire Pit: with Fiery Jackpot the pizza can give double the EXP, which cuts your cost per EXP.",
    targets: [ [ "skill_fast_feasts", 1 ], [ "skill_swift_sizzle", 1 ], [ "skill_munching_mastery", 3 ], [ "skill_drive_through_deli", 1 ], [ "skill_fiery_jackpot", 2 ] ]
  },
  rush: {
    label: "Rush Level",
    desc: "The fastest way to level up with only a few skills and boosts, but it needs more ingredients than normal. Double Nom and Fiery Jackpot can double or triple the pizza you get from each cook.",
    targets: [ [ "skill_fast_feasts", 1 ], [ "skill_swift_sizzle", 1 ], [ "skill_munching_mastery", 3 ], [ "skill_drive_through_deli", 1 ], [ "skill_fiery_jackpot", 1 ], [ "skill_double_nom", 2 ] ]
  },
  fish: {
    label: "Fish Strat",
    desc: "The cheapest way to level up your Bumpkin, but it needs a lot of skills and fish boosts, especially the Luminous Anglerfish Topper (+50% EXP). Without them, the guide will tell you to cook food instead.",
    targets: [ [ "skill_fishy_chance", 1 ], [ "skill_fishy_roll", 1 ], [ "skill_fishermans_5_rod", 1 ], [ "skill_reel_deal", 1 ], [ "skill_fishermans_10_fold", 1 ], [ "skill_fishy_gamble", 1 ], [ "skill_frenzied_fish", 1 ], [ "skill_fishy_feast", 3 ], [ "skill_more_with_less", 1 ] ]
  }
};

const BG_UPGRADE_POINTS = {
  1: 1,
  2: 3,
  3: 6
};

const BG_TIME_WEIGHT = .5;

const BG_SHIPMENT = {
  "Sunflower Seed": 100,
  "Potato Seed": 50,
  "Rhubarb Seed": 50,
  "Pumpkin Seed": 30,
  "Zucchini Seed": 30,
  "Carrot Seed": 20,
  "Yam Seed": 20,
  "Cabbage Seed": 20,
  "Broccoli Seed": 20,
  "Soybean Seed": 20,
  "Beetroot Seed": 20,
  "Pepper Seed": 20,
  "Cauliflower Seed": 20,
  "Parsnip Seed": 10
};

const BG_SEED_STOCK = {
  "Sunflower Seed": 800,
  "Potato Seed": 400,
  "Rhubarb Seed": 400,
  "Zucchini Seed": 400,
  "Pumpkin Seed": 300,
  "Carrot Seed": 200,
  "Cabbage Seed": 180,
  "Yam Seed": 180,
  "Soybean Seed": 180,
  "Broccoli Seed": 180,
  "Beetroot Seed": 160,
  "Pepper Seed": 160,
  "Cauliflower Seed": 160,
  "Parsnip Seed": 120,
  "Eggplant Seed": 100,
  "Corn Seed": 100,
  "Onion Seed": 100,
  "Turnip Seed": 80,
  "Radish Seed": 80,
  "Wheat Seed": 80,
  "Kale Seed": 60,
  "Artichoke Seed": 60,
  "Barley Seed": 60,
  "Tomato Seed": 20,
  "Lemon Seed": 20,
  "Blueberry Seed": 20,
  "Orange Seed": 20,
  "Apple Seed": 20
};

const BG_REP_NAMES = [ [ 1e3, "Grand Harvester" ], [ 600, "Cropkeeper" ], [ 400, "Grower" ], [ 250, "Seedling" ], [ 0, "Beginner" ] ];

const BG_ISLANDS = [ {
  id: "basic",
  label: "Basic",
  max: 9,
  start: 3
}, {
  id: "spring",
  label: "Petal",
  max: 16,
  start: 4
}, {
  id: "desert",
  label: "Desert",
  max: 25,
  start: 4
}, {
  id: "volcano",
  label: "Volcano",
  max: 30,
  start: 5
} ];

const BG_BUILD_LEVEL = {
  "Fire Pit": 0,
  Kitchen: 5,
  Bakery: 8,
  Deli: 16,
  "Smoothie Shack": 23,
  "Aging Shed": 0,
  "Fish Market": 10,
  "Hen House": 6,
  Barn: 30
};

const BG_SKIP_INGREDIENTS = new Set([ "Magic Mushroom", "Seaweed", "Rice", "Olive", "Grape", "Fish Flake", "Fish Stick", "Crab Stick", "Fish Oil", "Crimstone", "Squid", "Crab", "Fancy Fries" ]);

const BG_SKILL_THRESHOLDS = {
  cooking: {
    2: 2,
    3: 5
  },
  fishing: {
    2: 2,
    3: 5
  },
  crops: {
    2: 3,
    3: 7
  },
  trees: {
    2: 2,
    3: 5
  },
  mining: {
    2: 3,
    3: 7
  },
  fruitpatch: {
    2: 2,
    3: 5
  },
  animals: {
    2: 4,
    3: 8
  },
  bees: {
    2: 2,
    3: 5
  },
  greenhouse: {
    2: 2,
    3: 5
  },
  machine: {
    2: 2,
    3: 5
  },
  compost: {
    2: 3,
    3: 7
  },
  aging: {
    2: 3,
    3: 7
  }
};

const BG_SKILL_WHY = {
  skill_munching_mastery: "More EXP from every meal and fish you eat",
  skill_drive_through_deli: "More EXP from Deli meals",
  skill_juicy_boost: "More EXP from Smoothie Shack drinks",
  skill_fiery_jackpot: "Chance of an extra Fire Pit food each cook",
  skill_swift_sizzle: "Fire Pit oil boost: cooks much faster",
  skill_fishy_chance: "Chance of +1 basic fish per catch",
  skill_fishy_roll: "Chance of +1 advanced fish per catch",
  skill_fishy_gamble: "Chance of +1 expert fish per catch",
  skill_frenzied_fish: "Extra fish during Fish Frenzy",
  skill_more_with_less: "More daily casts",
  skill_double_nom: "Extra food from every cook (needs more ingredients)",
  skill_fast_feasts: "Fire Pit and Kitchen cook faster",
  skill_fishy_feast: "More EXP from fish",
  skill_fishermans_5_rod: "More casts every day",
  skill_fishermans_10_fold: "More casts every day"
};

function bgPct(x) {
  return `${Math.round(x * 1e4) / 100}%`;
}

function bgEffectText(id, rank) {
  const cfg = BG_SKILL_RANKS[id];
  if (!cfg || !rank) return "";
  const v = cfg.eff[Math.min(rank, cfg.eff.length) - 1];
  if (cfg.kind === "allExp" || cfg.kind === "deliExp" || cfg.kind === "smoothieExp" || cfg.kind === "fishExp") return `+${bgPct(v)} EXP`;
  if (cfg.kind === "firePitOutput" || cfg.kind === "yield") return `${bgPct(v)} chance`;
  if (cfg.kind === "allOutput") return `+${v} food, needs ${v + 1}x ingredients`;
  if (cfg.kind === "time") return `-${bgPct(v)} cook time`;
  if (cfg.kind === "oil") return `-${bgPct(v)} Fire Pit time with oil`;
  if (cfg.kind === "casts") return `+${v} casts per day`;
  return "";
}

function bgWhyAt(id, info, rank) {
  const base = BG_SKILL_WHY[id] || info.note || "";
  const eff = bgEffectText(id, rank);
  return eff ? `${base}: ${eff}` : base;
}

let bgState = loadState();

let bgTab = "cook";

let bgStratTab = "skills";


let bgOverviewOpen = false;

let bgOilOpen = false;

let bgPetOpen = false;

function loadState() {
  try {
    const raw = JSON.parse(localStorage.getItem(BG_STORE_KEY) || "null");
    if (raw && typeof raw === "object") return {
      manual: !!raw.manual,
      level: Number(raw.level) || 1,
      expansion: Number(raw.expansion) || 3,
      land: raw.land || "basic",
      mode: raw.mode === "free" ? "free" : "invested",
      strategy: [ "less", "rush", "fish" ].indexOf(raw.strategy) >= 0 ? raw.strategy : "less",
      guide: [ "leveling", "farming", "mining", "animals" ].indexOf(raw.guide) >= 0 ? raw.guide : "leveling",
      farmStrat: [ "balance", "basic", "advance" ].indexOf(raw.farmStrat) >= 0 ? raw.farmStrat : "balance"
    };
  } catch (e) {}
  return {
    manual: false,
    level: 1,
    expansion: 3,
    land: "basic",
    mode: "invested",
    strategy: "less",
    guide: "leveling",
    farmStrat: "balance"
  };
}

function saveState() {
  try {
    localStorage.setItem(BG_STORE_KEY, JSON.stringify(bgState));
  } catch (e) {}
}

function islandById(id) {
  return BG_ISLANDS.find(i => i.id === id) || BG_ISLANDS[0];
}

function islandIndex(id) {
  const idx = BG_ISLANDS.findIndex(i => i.id === id);
  return idx < 0 ? 0 : idx;
}

function levelXp(level) {
  const l = Math.max(1, Math.min(COOK_LEVEL_XP.length, Math.floor(Number(level) || 1)));
  return COOK_LEVEL_XP[l - 1];
}

function levelOfXp(xp) {
  return cookGetLevelInfo(xp).level;
}

function readSynced() {
  const info = farmPanelGetLastInfo();
  const g = profileGetG();
  if (!info.id || !g) return null;
  const exp = Number(info.experience) || 0;
  const level = Number(info.level) || levelOfXp(exp);
  const type = g.island && typeof g.island.type === "string" ? g.island.type : "basic";
  const known = BG_ISLANDS.some(i => i.id === type);
  const land = known ? type : "volcano";
  const basicLand = profileGetInventoryAmount(g, "Basic Land");
  const expansion = known ? basicLand || islandById(land).start : islandById("volcano").max;
  const apiName = farmSyncGetApiUsername(info.id);
  const rawName = typeof g.username === "string" && g.username.trim() ? g.username.trim() : "";
  return {
    g: g,
    info: info,
    exp: exp,
    level: level,
    land: land,
    expansion: expansion,
    name: apiName || rawName || `Farm #${info.id}`,
    beyond: !known
  };
}

function reputationFor(st) {
  let points = 0;
  const idx = islandIndex(st.land);
  if (idx >= 1) points += 100;
  if (idx >= 2) points += 50;
  if (idx >= 3) points += 50;
  if (st.level >= 15) points += 50;
  if (st.level >= 100) points += 150;
  if (st.vip) points += 600;
  const g = st.useSynced && st.synced ? st.synced.g : null;
  if (g) {
    if (g.discord && g.discord.verified) points += 50;
    if (g.verified || g.faceRecognition && Array.isArray(g.faceRecognition.history) && g.faceRecognition.history.length) points += 100;
    if (g.buds && Object.keys(g.buds).length > 0) points += 300;
  }
  const tier = BG_REP_NAMES.find(t => points >= t[0]);
  let listings = "No marketplace listings";
  let listCount = 0;
  if (points >= 600) {
    listings = "Unlimited listings & offers";
    listCount = Infinity;
  } else if (points >= 400) {
    listings = "3 marketplace listings per day";
    listCount = 3;
  } else if (points >= 250) {
    listings = "2 marketplace listings per day";
    listCount = 2;
  }
  return {
    points: points,
    name: tier[1],
    next: points >= 1e3 ? null : BG_REP_NAMES.slice().reverse().find(t => t[0] > points),
    listings: listings,
    listCount: listCount,
    canBuy: points >= 600
  };
}

function resolveState() {
  const synced = readSynced();
  const useSynced = !!synced && !bgState.manual;
  if (useSynced) {
    bgState.level = synced.level;
    bgState.expansion = synced.expansion;
    bgState.land = synced.land;
  }
  const level = Math.max(0, Math.min(150, Math.floor(Number(bgState.level) || 0)));
  const land = islandById(bgState.land).id;
  const expansion = Math.max(0, Math.floor(Number(bgState.expansion) || 0));
  const mode = bgState.mode === "free" ? "free" : "invested";
  const strategy = [ "less", "rush", "fish" ].indexOf(bgState.strategy) >= 0 ? bgState.strategy : "less";
  const nodes = esGetNodesAt(land, expansion) || {};
  const plots = nodes["Crop Plot"] || 0;
  const crystals = nodes["Ascension Crystal"] || 0;
  let exp = levelXp(level);
  if (synced && synced.level === level && synced.exp >= exp) exp = synced.exp;
  const owned = new Set([ "Fire Pit" ]);
  const skills = new Set;
  const ranks = {};
  let vip = false;
  if (useSynced) {
    [ "Kitchen", "Bakery", "Deli", "Smoothie Shack", "Aging Shed", "Fish Market", "Hen House", "Barn" ].forEach(b => {
      if (profileGetInventoryAmount(synced.g, b) > 0) owned.add(b);
    });
    vip = mode === "invested" && !!synced.info.vipActive;
    const ownedByName = synced.g.bumpkin && synced.g.bumpkin.skills && typeof synced.g.bumpkin.skills === "object" ? synced.g.bumpkin.skills : {};
    SKILL_BOOSTS.forEach(s => {
      if (isSkillActive(s.id) || ownedByName[s.name]) {
        skills.add(s.id);
        ranks[s.id] = Math.max(1, Math.min(3, Math.floor(Number(ownedByName[s.name]) || 1)));
      }
    });
  }
  let shardsUsed = 0;
  Object.keys(ranks).forEach(id => {
    const info = skillInfo(id);
    if (info && ranks[id] > 1) shardsUsed += (ranks[id] - 1) * (info.skillTier || 1);
  });
  const shardsTotal = crystals * BG_SHARDS_PER_CRYSTAL;
  const shedLevel = useSynced && synced.g.agingShed && typeof synced.g.agingShed === "object" ? Math.floor(Number(synced.g.agingShed.level)) || 1 : 1;
  const st = {
    agingSlots: Math.max(1, Math.min(6, shedLevel)),
    synced: synced,
    useSynced: useSynced,
    manual: bgState.manual,
    mode: mode,
    strategy: strategy,
    plots: plots,
    patches: nodes["Fruit Patch"] || 0,
    hives: nodes.Beehive || 0,
    oil: islandIndex(land) >= 2,
    ranks: ranks,
    shards: {
      crystals: crystals,
      total: shardsTotal,
      used: shardsUsed,
      left: Math.max(0, shardsTotal - shardsUsed)
    },
    level: level,
    land: land,
    expansion: expansion,
    exp: exp,
    owned: owned,
    skills: skills,
    vip: vip,
    name: synced ? synced.name : "Farmer"
  };
  st.rep = reputationFor(st);
  return st;
}

function foodBuilding(name) {
  for (const b of Object.keys(COOKING_RECIPES)) {
    if (COOKING_RECIPES[b][name]) return b;
  }
  return null;
}

function chainBuildings(building, recipe, seen) {
  const set = new Set([ building ]);
  const visited = seen || new Set;
  Object.keys(recipe.ingredients).forEach(ing => {
    if (visited.has(ing)) return;
    visited.add(ing);
    const b = foodBuilding(ing);
    if (!b) return;
    chainBuildings(b, COOKING_RECIPES[b][ing], visited).forEach(x => set.add(x));
  });
  return set;
}

function ingredientUsable(name) {
  if (BG_SKIP_INGREDIENTS.has(name) || /mushroom/i.test(name)) return false;
  if (FISH_CATCH_DATA[name]) return false;
  const b = foodBuilding(name);
  if (b) {
    const rec = COOKING_RECIPES[b][name];
    return Object.keys(rec.ingredients).every(ingredientUsable);
  }
  return true;
}

function rawNeeds(recipe, mult, acc) {
  Object.keys(recipe.ingredients).forEach(ing => {
    const amt = recipe.ingredients[ing] * mult;
    const b = foodBuilding(ing);
    if (b) rawNeeds(COOKING_RECIPES[b][ing], amt, acc); else acc[ing] = (acc[ing] || 0) + amt;
  });
  return acc;
}

function chainUsesCheese(name) {
  const b = foodBuilding(name);
  if (!b) return false;
  const rec = COOKING_RECIPES[b][name];
  return Object.keys(rec.ingredients).some(i => i === "Cheese" || chainUsesCheese(i));
}

function agingSeconds(base) {
  const max = base <= 200 ? base * 3 : base <= 330 ? base * 4 : base * 5;
  const j = base <= 200 ? 300 : base <= 330 ? 500 : 1e3;
  return (max - base) / j * 3600;
}

function skillInfo(id) {
  return SKILL_BOOSTS.find(s => s.id === id) || null;
}

function skillCategoryPoints(owned, cat) {
  let pts = 0;
  const seen = new Set;
  SKILL_BOOSTS.forEach(s => {
    if (s.skillCategory === cat && owned.has(s.id) && s.skillTier < 3 && !seen.has(s.id)) {
      seen.add(s.id);
      pts += s.skillTier;
    }
  });
  return pts;
}

function usedSkillPoints(owned, ranks) {
  let pts = 0;
  const seen = new Set;
  SKILL_BOOSTS.forEach(s => {
    if (owned.has(s.id) && s.skillTier && !seen.has(s.id)) {
      seen.add(s.id);
      pts += s.skillTier;
      const r = ranks && ranks[s.id] ? ranks[s.id] : 1;
      if (r > 1) pts += (r - 1) * (BG_UPGRADE_POINTS[s.skillTier] || 1);
    }
  });
  return pts;
}

function skillEff(id, ranks) {
  const cfg = BG_SKILL_RANKS[id];
  const r = ranks ? ranks[id] : 0;
  if (!cfg || !r) return 0;
  return cfg.eff[Math.min(r, cfg.eff.length) - 1];
}

function producibleInfo(raw, st) {
  const seed = `${raw} Seed`;
  if (BASE_CROPS[raw]) return {
    ok: st.plots > 0,
    level: BG_SEED_LEVEL[seed] || 0
  };
  if (BG_SEED_STOCK[seed] != null) return {
    ok: st.patches > 0,
    level: BG_SEED_LEVEL[seed] || 0
  };
  if (raw === "Honey") return {
    ok: st.hives > 0,
    level: 0
  };
  return {
    ok: true,
    level: 0
  };
}

function seedSupplyFor(raw, st) {
  const seed = `${raw} Seed`;
  if (BG_SEED_STOCK[seed] == null) return Infinity;
  return st.mode === "free" ? BG_SHIPMENT[seed] || 0 : BG_SEED_STOCK[seed];
}

function marketCoins(raw, buyU) {
  if (buyU > 0) return buyU;
  let flower = 0;
  try {
    flower = Number(findLivePriceForName(raw)) || 0;
  } catch (e) {}
  const perCoin = coinsToFlower(1);
  return flower > 0 && perCoin > 0 ? flower / perCoin : 0;
}

function rawInSeason(raw) {
  try {
    if (BASE_CROPS[raw]) return isCropInSeason(raw, currentSeason);
    if (BASE_FRUITS[raw]) return isFruitInSeason(raw, currentSeason);
  } catch (e) {}
  return true;
}

function decideMethod(buyU, colU, prod, st, raw) {
  const canBuy = st.rep.canBuy && buyU > 0;
  const needsBuilding = BG_RAW_BUILDING[raw] && !st.owned.has(BG_RAW_BUILDING[raw]);
  const collectCheaper = buyU > 0 ? colU <= buyU * (needsBuilding && st.rep.canBuy ? .9 : 1) : true;
  const animalOk = animalSelfProduceOk(raw, st);
  const collectOk = animalOk === null ? prod.ok && rawInSeason(raw) && (!needsBuilding || marketCoins(raw, buyU) > colU && colU > 0) : animalOk && prod.ok && rawInSeason(raw);
  if (st.mode === "free") {
    if (collectOk && collectCheaper) return {
      method: "collect",
      plan: true
    };
    if (canBuy) return {
      method: "buy",
      plan: false
    };
    return null;
  }
  if (canBuy) {
    if (collectOk && collectCheaper) return {
      method: "collect",
      plan: true
    };
    return {
      method: "buy",
      plan: true
    };
  }
  if (collectOk && collectCheaper) return {
    method: "collect",
    plan: true
  };
  return null;
}

function oilUnitCost(st) {
  const buyU = st.rep.canBuy ? cookingIngredientUnitCostCoins("Oil", "buy") : 0;
  const colU = cookingIngredientUnitCostCoins("Oil", "collect");
  if (buyU > 0 && (colU <= 0 || buyU < colU)) return buyU;
  return colU > 0 ? colU : 0;
}

function buildRawCooks(st) {
  const list = [];
  Object.keys(COOKING_RECIPES).forEach(building => {
    Object.keys(COOKING_RECIPES[building]).forEach(food => {
      const rec = COOKING_RECIPES[building][food];
      const ings = Object.keys(rec.ingredients);
      if (!(rec.time > 0) || !ings.every(ingredientUsable)) return;
      const expInfo = cookingComputeFoodExp(building, food);
      const timeInfo = cookingComputeFoodTime(building, food);
      if (!(timeInfo.time > 0) || !(expInfo.exp > 0) || !(rec.exp > 0)) return;
      const needs = rawNeeds(rec, 1, {});
      const parts = [];
      let planOk = true;
      let ok = true;
      let cost = 0;
      let seedLevel = 0;
      const extraBuildings = new Set;
      Object.keys(needs).forEach(rawName => {
        const buyU = cookingIngredientUnitCostCoins(rawName, "buy");
        const colU = cookingIngredientUnitCostCoins(rawName, "collect");
        const prod = producibleInfo(rawName, st);
        const pick = decideMethod(buyU, colU, prod, st, rawName);
        if (!pick) {
          ok = false;
          return;
        }
        if (!pick.plan) planOk = false;
        const unit = pick.method === "buy" ? buyU : colU;
        cost += needs[rawName] * unit;
        if (pick.method === "collect") {
          if (BG_RAW_BUILDING[rawName]) extraBuildings.add(BG_RAW_BUILDING[rawName]);
          if (prod.level > seedLevel) seedLevel = prod.level;
        }
        parts.push({
          name: rawName,
          qty: needs[rawName],
          method: pick.method,
          offSeason: !rawInSeason(rawName),
          unit: unit,
          buyUnit: buyU,
          collectUnit: colU
        });
      });
      if (!ok || !(cost > 0)) return;
      const chain = chainBuildings(building, rec);
      extraBuildings.forEach(b => chain.add(b));
      list.push({
        kind: "cook",
        name: food,
        building: building,
        chain: chain,
        exp0: rec.exp,
        appExp: expInfo.exp,
        petIn: petFromInfo(expInfo),
        time0: rec.time,
        appTime: timeInfo.time,
        needs: needs,
        parts: parts,
        cost: cost,
        planOk: planOk,
        seedLevel: seedLevel,
        usesCheese: !!rec.ingredients.Cheese || ings.some(i => foodBuilding(i) && chainUsesCheese(i))
      });
    });
  });
  return list;
}

const BG_SPEEDY_AGING = [ .1, .15, .2 ];

const BG_GUARANTEED_FISH = new Set([ "Saw Shark", "Whale Shark", "White Shark", "Hammerhead shark" ]);

const BG_CRUST_COST_IDS = [ "fish_crab_house", "fish_pistol_shrimp", "fish_royal_crab_pot", "fish_crab_hat" ];

const BG_CRUST_TIME_IDS = [ "fish_crystal_altar", "fish_speed_trap" ];

function withExtraBoosts(ids, fn) {
  const added = ids.filter(id => selectedBoosts.indexOf(id) < 0);
  added.forEach(id => selectedBoosts.push(id));
  invalidateCostCache();
  try {
    return fn();
  } finally {
    added.forEach(id => selectedBoosts.splice(selectedBoosts.indexOf(id), 1));
    invalidateCostCache();
  }
}

function crustComboKey(ids) {
  return ids.slice().sort().join(",");
}

let bgCrustCache = {
  sig: "",
  data: {},
  dependent: null
};

function crustSubsets(free) {
  const out = [];
  for (let m = 1; m < 1 << free.length; m++) out.push(free.filter((x, i) => m & 1 << i));
  return out;
}

function crustRun(ids, season, market, gear) {
  const prevGuaranteed = cookingGuaranteedCatchOn;
  setCookingGuaranteedCatchOn(false);
  try {
    return withExtraBoosts(ids, () => {
      const itemMemo = {};
      const res = {};
      market.forEach(c => {
        const item = c.setup.item;
        if (itemMemo[item] === undefined) itemMemo[item] = fishMarketPanelCostCoins(item, season);
        res[c.name + "|1"] = itemMemo[item];
      });
      gear.forEach(c => {
        const bf = computeBasicFishFigures(c.name);
        if (!bf) return;
        res[c.name + "|0"] = {
          catchCost: bf.costCoins,
          setup: {
            kind: "gear",
            buy: c.setup.buy,
            bait: bf.bait ? bf.bait.name : null,
            baitCost: bf.baitCost,
            chum: bf.chum ? {
              name: bf.chum.name,
              qty: bf.chum.qty,
              cost: bf.chum.cost
            } : null,
            rodCost: bf.rodCost
          }
        };
      });
      return res;
    });
  } finally {
    setCookingGuaranteedCatchOn(prevGuaranteed);
  }
}

function applyCrustData(list, data) {
  list.forEach(c => {
    const key = c.name + (c.guaranteed ? "|1" : "|0");
    Object.keys(data).forEach(ck => {
      const v = data[ck][key];
      if (v === undefined) return;
      if (c.guaranteed) c.setup.itemCostCombos[ck] = v; else c.gearCombos[ck] = v;
    });
  });
}

let bgCrustLive = null;

function fillCrustCombos(list, season) {
  const free = BG_CRUST_COST_IDS.filter(id => !isBoostActive(id));
  if (!free.length) {
    bgCrustLive = null;
    return;
  }
  const sig = JSON.stringify([ free, season, list.map(c => [ c.name, c.guaranteed ? 1 : 0, Math.round(c.catchCost * 1e6) ]) ]);
  if (bgCrustCache.sig !== sig) bgCrustCache = {
    sig: sig,
    data: {},
    dependent: null
  };
  bgCrustLive = {
    list: list,
    season: season,
    free: free,
    sig: sig,
    market: list.filter(c => c.guaranteed),
    gearAll: list.filter(c => !c.guaranteed)
  };
  Object.keys(bgCrustCache.data).forEach(ck => applyCrustData(list, {
    [ck]: bgCrustCache.data[ck]
  }));
}

function ensureCrustCombo(key, fish) {
  const live = bgCrustLive;
  const cache = bgCrustCache;
  if (!live || !key || cache.sig !== live.sig) return;
  if (cache.data[key]) {
    if (fish && fish.guaranteed ? fish.setup.itemCostCombos[key] === undefined : fish && fish.gearCombos[key] === undefined) applyCrustData([ fish ], {
      [key]: cache.data[key]
    });
    return;
  }
  const allKey = crustComboKey(live.free);
  if (!cache.data[allKey]) {
    cache.data[allKey] = crustRun(live.free, live.season, live.market, live.gearAll);
    applyCrustData(live.list, {
      [allKey]: cache.data[allKey]
    });
  }
  if (!cache.dependent) cache.dependent = new Set(live.gearAll.filter(c => {
    const g = cache.data[allKey][c.name + "|0"];
    return g && Math.abs(g.catchCost - c.catchCost) > 1e-9;
  }).map(c => c.name));
  if (key !== allKey) {
    const dependent = live.gearAll.filter(c => cache.dependent.has(c.name));
    cache.data[key] = crustRun(key.split(","), live.season, live.market, dependent);
    applyCrustData(live.list, {
      [key]: cache.data[key]
    });
  }
  if (fish) applyCrustData([ fish ], {
    [key]: cache.data[key]
  });
}

function buildRawFish(st) {
  const list = [];
  const prev = cookingGuaranteedCatchOn;
  const mode = st.rep.canBuy ? cookingCostMode : "collect";
  const gearBuy = isFishingBuyMode();
  try {
    [ true, false ].forEach(guaranteed => {
      setCookingGuaranteedCatchOn(guaranteed);
      invalidateCostCache();
      FISH_CATCH_NAMES.forEach(fish => {
        if (BG_GUARANTEED_FISH.has(fish) !== guaranteed) return;
        const d = FISH_CATCH_DATA[fish];
        if (!d) return;
        if (!isFishInSeason(fish, currentSeason)) return;
        [ "aged" ].forEach(stage => {
          const xpInfo = fishCatchComputeXP(fish, stage);
          const figs = computeAgedFishFigures(fish, mode);
          if (!(xpInfo.xp > 0) || !(xpInfo.baseXp > 0) || !figs) return;
          let catchCost;
          let cost;
          let setup;
          if (guaranteed) {
            const item = fishMarketItemForFish(fish);
            if (!item) return;
            const itemCost = fishMarketPanelCostCoins(item, previewSeason || currentSeason);
            const fishYield = fishCatchYieldMult(d.tier);
            catchCost = fishYield > 0 ? itemCost / fishYield : itemCost;
            cost = catchCost + figs.saltCostCoins;
            setup = {
              kind: "market",
              buy: mode === "buy",
              item: item,
              itemCost: itemCost,
              itemCostCombos: {
                "": itemCost
              }
            };
          } else {
            const bf = computeBasicFishFigures(fish);
            if (!bf) return;
            catchCost = bf.costCoins;
            cost = catchCost + figs.saltCostCoins;
            setup = {
              kind: "gear",
              buy: gearBuy,
              bait: bf.bait ? bf.bait.name : null,
              baitCost: bf.baitCost,
              chum: bf.chum ? {
                name: bf.chum.name,
                qty: bf.chum.qty,
                cost: bf.chum.cost
              } : null,
              rodCost: bf.rodCost
            };
          }
          if (!(cost > 0)) return;
          const baseXp = fishCatchComputeXP(fish, "basic").baseXp;
          const primeInfo = fishCatchComputeXP(fish, "primeAged");
          list.push({
            kind: "fish",
            name: fish,
            stage: stage,
            tier: d.tier,
            building: "Fire Pit",
            chain: new Set(guaranteed ? [ "Aging Shed", "Fish Market" ] : [ "Aging Shed" ]),
            baseXp: xpInfo.baseXp,
            appXp: xpInfo.xp,
            petIn: petFromInfo(xpInfo),
            primeBase: primeInfo.baseXp,
            primeApp: primeInfo.xp,
            cost: cost,
            catchCost: catchCost,
            saltCost: figs.saltCostCoins,
            saltQty: figs.saltQty,
            saltBuy: mode === "buy",
            yieldScaled: true,
            guaranteed: guaranteed,
            gearCombos: {
              "": {
                catchCost: catchCost,
                setup: setup
              }
            },
            appYield: fishCatchYieldMult(d.tier),
            agingSec: agingSeconds(baseXp),
            setup: setup,
            planOk: true
          });
        });
      });
    });
    fillCrustCombos(list, previewSeason || currentSeason);
  } finally {
    setCookingGuaranteedCatchOn(prev);
    invalidateCostCache();
  }
  return list;
}

function oilSkillBoost(building, ranks) {
  const cfg = BG_OIL_RANKS[building];
  const r = cfg && ranks ? ranks[cfg.skill] : 0;
  if (!cfg || !r) return 0;
  return cfg.eff[Math.min(r, cfg.eff.length) - 1];
}

function oilBoostFor(building, ranks) {
  return oilSkillBoost(building, ranks) || BG_OIL_BASE[building] || 0;
}

const BG_CLEAVER_CHANCE = .1;

const BG_VIP_MULT = 1.1;

function boostFx(ids) {
  const fx = {
    food: 1,
    fish: 1,
    aged: 1,
    cheese: 0,
    specific: {},
    time: 1,
    fishYield: [],
    crust: [],
    crustTime: [],
    rodFree: false,
    cleaver: false,
    oilOff: new Set,
    pet: null
  };
  (ids || []).forEach(id => {
    if (id === BG_VIP_FLAG) {
      fx.food *= BG_VIP_MULT;
      return;
    }
    if (String(id).indexOf(BG_PET_FLAG) === 0) {
      fx.pet = 1 + (Number(String(id).slice(BG_PET_FLAG.length)) || 0) / 100;
      return;
    }
    if (String(id).indexOf(BG_OIL_OFF) === 0) {
      fx.oilOff.add(String(id).slice(BG_OIL_OFF.length));
      return;
    }
    const b = BOOSTS.find(x => x.id === id);
    if (!b || isBoostActive(b.id)) return;
    if (b.agedFishXpMult) fx.aged *= b.agedFishXpMult;
    if (b.scope === "foodGlobal" && b.expMult) fx.food *= b.expMult; else if (b.scope === "foodFish" && b.expMult) fx.fish *= b.expMult; else if (b.scope === "foodCheese" && b.expAdd) fx.cheese += b.expAdd; else if (b.scope === "foodSpecific" && b.expMult) fx.specific[b.target] = (fx.specific[b.target] || 1) * b.expMult; else if (b.scope === "cookTimeGlobal" && b.timeMult) {
      fx.time *= b.timeMult;
      if (b.id === "master_chefs_cleaver") fx.cleaver = true;
    } else if (b.scope === "fishYield" && b.fishYieldAdd) {
      if (b.season && b.season !== currentSeason) return;
      fx.fishYield.push({
        add: b.fishYieldAdd,
        tier: b.tier || null
      });
    } else if (b.scope === "fishRod" && b.rodFreeCost) fx.rodFree = true; else if ((b.scope === "crustacean" || b.scope === "fishCrab") && BG_CRUST_COST_IDS.indexOf(b.id) >= 0) fx.crust.push(b.id); else if (b.scope === "crustacean" && BG_CRUST_TIME_IDS.indexOf(b.id) >= 0) fx.crustTime.push(b.id);
  });
  return fx;
}

function petFromInfo(info) {
  const list = info && Array.isArray(info.boostsUsed) ? info.boostsUsed : [];
  const hit = list.find(x => x && /^Faction Pet Streak/.test(String(x.text || "")));
  const m = hit ? /\u00d7\s*([\d.]+)/.exec(String(hit.text)) : null;
  return m ? Number(m[1]) || 1 : 1;
}

function syncFx() {
  const fx = boostFx([]);
  fx.petSynced = true;
  return fx;
}

function petMult(st, fx, r) {
  if (fx && fx.petSynced) return 1;
  const pick = fx && fx.pet != null ? fx.pet : 1 + petDefault() / 100;
  const actual = st.useSynced && r ? r.petIn || 1 : 1;
  return pick / actual;
}

function scoreCook(r, st, ranks, oilUnit, fx) {
  const O = st.useSynced ? st.ranks : {};
  const b = r.building;
  let xpMult = (1 + skillEff("skill_munching_mastery", ranks)) / (1 + skillEff("skill_munching_mastery", O));
  if (b === "Deli") xpMult *= (1 + skillEff("skill_drive_through_deli", ranks)) / (1 + skillEff("skill_drive_through_deli", O));
  if (b === "Smoothie Shack") xpMult *= (1 + skillEff("skill_juicy_boost", ranks)) / (1 + skillEff("skill_juicy_boost", O));
  let ratio = 1;
  if (st.useSynced) {
    ratio = r.appExp / r.exp0;
    if (st.mode === "free" && st.synced && st.synced.info.vipActive) ratio /= 1.1;
  }
  const jackpot = b === "Fire Pit" ? skillEff("skill_fiery_jackpot", ranks) : 0;
  const nom = skillEff("skill_double_nom", ranks);
  const cleaver = fx && fx.cleaver || isBoostActive("master_chefs_cleaver") ? BG_CLEAVER_CHANCE : 0;
  const foods = 1 + nom + jackpot + cleaver;
  const ingMult = 1 + nom;
  let xp = r.exp0 * ratio * xpMult * foods;
  if (fx) {
    xp *= fx.food * (fx.specific[r.name] || 1);
    if (r.usesCheese) xp += fx.cheese * xpMult * foods;
  }
  xp *= petMult(st, fx, r);
  let time = st.useSynced ? r.appTime : r.time0;
  if (b === "Fire Pit" || b === "Kitchen") time *= 1 - skillEff("skill_fast_feasts", ranks);
  if (fx) time *= fx.time;
  let oilCost = 0;
  let oilBoost = 0;
  const oilUsed = st.oil && !(fx && fx.oilOff && (fx.oilOff.has("all") || fx.oilOff.has(b)));
  if (oilUsed) {
    oilBoost = oilBoostFor(b, ranks);
    time *= 1 - oilBoost;
    oilCost = (BG_OIL_DAILY[b] || 0) * r.time0 / BG_DAY * oilUnit;
  }
  let per24 = Math.min(BG_DAY / time, BG_MAX_CRAFTS);
  let seedLimited = false;
  let parts = r.parts;
  let baseCost = r.cost;
  const collectRaws = r.parts.filter(p => p.method === "collect" && (BASE_CROPS[p.name] || BG_SEED_STOCK[`${p.name} Seed`] != null));
  const cropRaws = collectRaws.filter(p => BASE_CROPS[p.name]);
  collectRaws.forEach(p => {
    let cap = seedSupplyFor(p.name, st) / (p.qty * ingMult);
    if (BASE_CROPS[p.name]) {
      const perPlotDay = BG_DAY / Math.max(1, BASE_CROPS[p.name].timeSec) * (BASE_CROPS[p.name].baseYield || 1);
      cap = Math.min(cap, st.plots / Math.max(1, cropRaws.length) * perPlotDay / (p.qty * ingMult));
    }
    if (cap < per24) {
      if (st.rep.canBuy && p.buyUnit > 0) {
        if (parts === r.parts) parts = r.parts.map(x => Object.assign({}, x));
        const q = parts.find(x => x.name === p.name);
        baseCost += p.qty * (p.buyUnit - q.unit);
        q.method = "buy";
        q.unit = p.buyUnit;
        return;
      }
      per24 = cap;
      seedLimited = true;
    }
  });
  if (per24 < .25) return null;
  per24 = seedLimited ? Math.floor(per24 + 1e-9) : Math.max(1, Math.floor(per24 + .4 + 1e-9));
  if (per24 < 1) return null;
  const cost = baseCost * ingMult + oilCost;
  return {
    kind: "cook",
    name: r.name,
    building: b,
    chain: r.chain,
    parts: parts,
    planOk: r.planOk,
    seedLevel: r.seedLevel,
    usesCheese: r.usesCheese,
    xp: xp,
    foods: foods,
    time: time,
    time0: r.time0,
    per24: per24,
    cost: cost,
    xpDay: per24 * xp,
    costDay: per24 * cost,
    costPerXp: cost / xp,
    seedLimited: seedLimited,
    oilBoost: oilBoost,
    oilPerDay: oilUsed ? BG_OIL_DAILY[b] || 0 : 0,
    jackpot: jackpot,
    nom: nom,
    cleaver: cleaver
  };
}

function fishSkillAdd(tier, ranks) {
  if (tier === "basic") return skillEff("skill_fishy_chance", ranks);
  if (tier === "advanced") return skillEff("skill_fishy_roll", ranks);
  if (tier === "expert") return skillEff("skill_fishy_gamble", ranks);
  return 0;
}

function castsFor(ranks) {
  return BG_BASE_CASTS + skillEff("skill_fishermans_5_rod", ranks) + skillEff("skill_fishermans_10_fold", ranks) + skillEff("skill_more_with_less", ranks);
}

function scoreFish(r, st, ranks, fx) {
  const O = st.useSynced ? st.ranks : {};
  const stage = r.stage;
  let xpMult = (1 + skillEff("skill_munching_mastery", ranks)) / (1 + skillEff("skill_munching_mastery", O)) * (1 + skillEff("skill_fishy_feast", ranks)) / (1 + skillEff("skill_fishy_feast", O));
  if (fx) xpMult *= fx.fish * fx.food * (stage === "aged" ? fx.aged : 1);
  xpMult *= petMult(st, fx, r);
  let ratio = 1;
  if (st.useSynced) {
    ratio = r.appXp / r.baseXp;
    if (st.mode === "free" && st.synced && st.synced.info.vipActive) ratio /= 1.1;
  }
  const xp = r.baseXp * ratio * xpMult;
  const primeXp = r.primeBase ? r.primeBase * (st.useSynced ? r.primeApp / r.primeBase : 1) * xpMult / (st.mode === "free" && st.synced && st.useSynced && st.synced.info.vipActive ? 1.1 : 1) : 0;
  const ownedAdd = fishSkillAdd(r.tier, O);
  const boostAdd = st.useSynced ? Math.max(0, r.appYield - 1 - ownedAdd) : 0;
  let pickedAdd = 0;
  if (fx) fx.fishYield.forEach(y => {
    if (!y.tier || y.tier === r.tier) pickedAdd += y.add;
  });
  const myYield = 1 + boostAdd + fishSkillAdd(r.tier, ranks) + pickedAdd;
  const casts = castsFor(ranks);
  let perDay = casts * myYield;
  const agingMult = 1 - (BG_SPEEDY_AGING[(ranks.skill_speedy_aging || 0) - 1] || 0);
  if (stage === "aged") perDay = Math.min(perDay, st.agingSlots * BG_DAY / (r.agingSec * agingMult));
  let catchCost = r.yieldScaled ? r.catchCost * r.appYield / myYield : r.catchCost;
  if (fx && fx.rodFree && !r.guaranteed) catchCost = Math.max(0, catchCost - fishRodCostCoins() / (r.yieldScaled ? myYield : r.appYield));
  let setup = r.setup;
  if (fx && fx.crust.length) {
    const key = crustComboKey(fx.crust);
    ensureCrustCombo(key, r);
    if (r.guaranteed) {
      const boosted = setup.itemCostCombos[key];
      if (boosted >= 0) {
        catchCost = boosted / myYield;
        setup = Object.assign({}, setup, {
          itemCost: boosted
        });
      }
    } else if (r.gearCombos[key]) {
      const g = r.gearCombos[key];
      catchCost = g.catchCost * r.appYield / myYield;
      if (fx.rodFree) catchCost = Math.max(0, catchCost - fishRodCostCoins() / myYield);
      setup = g.setup;
    }
  }
  const cost = catchCost + r.saltCost;
  if (!(perDay > 0)) return null;
  return {
    kind: "fish",
    name: r.name,
    stage: stage,
    tier: r.tier,
    building: "Fire Pit",
    chain: r.chain,
    planOk: true,
    xp: xp,
    primeXp: primeXp,
    per24: perDay,
    casts: casts,
    castsUsed: perDay / myYield,
    agingTime: r.agingSec * agingMult,
    agingBase: r.agingSec,
    rodFree: !!(fx && fx.rodFree),
    setup: setup,
    saltBuy: r.saltBuy,
    catchCost: catchCost,
    saltCost: r.saltCost,
    saltQty: r.saltQty,
    cost: cost,
    xpDay: perDay * xp,
    costDay: perDay * cost,
    costPerXp: cost / xp
  };
}

function ranksAt(path, st, level) {
  const R = Object.assign({}, st.useSynced ? st.ranks : {});
  path.forEach(it => {
    if (it.needLevel <= level) R[it.id] = Math.max(R[it.id] || 0, it.rank);
  });
  return R;
}

function scoreAll(raw, st, ranks, level, fx) {
  const oilUnit = st.oil ? oilUnitCost(st) : 0;
  const cook = [];
  raw.cook.forEach(r => {
    const c = scoreCook(r, st, ranks, oilUnit, fx);
    if (c) cook.push(c);
  });
  const fish = [];
  raw.fish.forEach(r => {
    if (r.tier === "advanced" && level < BG_ADV_FISH_LEVEL || r.tier === "expert" && level < BG_EXPERT_FISH_LEVEL) return;
    const c = scoreFish(r, st, ranks, fx);
    if (c) fish.push(c);
  });
  return {
    cook: cook,
    fish: fish,
    ranks: ranks
  };
}

function availableAt(candidates, owned, level, allowBuild, onlyPlan) {
  return candidates.filter(c => {
    if (onlyPlan && !c.planOk) return false;
    if (c.kind === "fish" && level < BG_FISH_LEVEL) return false;
    if (c.seedLevel && level < c.seedLevel) return false;
    for (const b of c.chain) {
      const unlock = BG_BUILD_LEVEL[b] == null ? 999 : BG_BUILD_LEVEL[b];
      if (level < unlock) return false;
      if (owned.has(b)) continue;
      if (allowBuild) continue;
      return false;
    }
    return true;
  });
}

let bgPoolFactor = .6;

let bgStrategy = "less";

function pickBest(list, ranks) {
  if (!list.length) return null;
  const maxXp = Math.max(...list.map(c => c.xpDay));
  const pool = list.filter(c => c.xpDay >= maxXp * bgPoolFactor);
  pool.sort((a, b) => a.costPerXp - b.costPerXp || b.xpDay - a.xpDay);
  if (list[0].kind === "cook" && (bgStrategy !== "fish" || ranks && ranks.skill_fiery_jackpot)) {
    const pizza = list.find(c => c.name === "Pizza Margherita");
    if (pizza && (ranks && ranks.skill_fiery_jackpot || pizza.xpDay >= maxXp * .5 && pizza.costPerXp <= pool[0].costPerXp * 2)) return pizza;
  }
  return pool[0];
}

function bestPlan(cands, owned, level, allowBuild, onlyPlan) {
  const cook = pickBest(availableAt(cands.cook, owned, level, allowBuild, onlyPlan), cands.ranks);
  const fish = pickBest(availableAt(cands.fish, owned, level, allowBuild, onlyPlan), cands.ranks);
  return composePlan(cook, fish);
}

function composePlan(cook, fish) {
  let useCook = cook;
  let useFish = fish;
  let fishUnsuitable = false;
  let altFish = null;
  if (fish && cook) {
    const ratio = .5;
    const jackpotPizza = cook.name === "Pizza Margherita" && cook.jackpot > 0 && fish.xpDay < cook.xpDay;
    if (bgStrategy !== "fish" && (jackpotPizza || fish.costPerXp > cook.costPerXp * ratio)) {
      useFish = null;
      altFish = fish;
      fishUnsuitable = true;
    } else if (fish.xpDay >= cook.xpDay * 5 && fish.costPerXp <= cook.costPerXp) useCook = null;
  }
  const xpDay = (useCook ? useCook.xpDay : 0) + (useFish ? useFish.xpDay : 0);
  const costDay = (useCook ? useCook.costDay : 0) + (useFish ? useFish.costDay : 0);
  return {
    cook: useCook,
    fish: useFish,
    xpDay: xpDay,
    costDay: costDay,
    fishUnsuitable: fishUnsuitable,
    altFish: altFish,
    label: (useCook ? useCook.name : "") + "|" + (useFish ? useFish.name + useFish.stage : "")
  };
}

function missingBuildings(plan, owned) {
  const need = new Set;
  [ plan.cook, plan.fish ].forEach(c => {
    if (!c) return;
    c.chain.forEach(b => {
      if (!owned.has(b)) need.add(b);
    });
  });
  return [ ...need ];
}

function recommendBuilds(ctx, st) {
  const out = [];
  const order = [ "Kitchen", "Hen House", "Bakery", "Deli", "Smoothie Shack", "Aging Shed", "Barn" ].filter(b => !st.owned.has(b)).sort((a, b) => BG_BUILD_LEVEL[a] - BG_BUILD_LEVEL[b]);
  const all = new Set(st.owned);
  if (st.strategy === "fish" && !st.owned.has("Fish Market")) out.push({
    building: "Fish Market",
    unlock: BG_BUILD_LEVEL["Fish Market"],
    gain: 1,
    plan: null,
    fishMarket: true
  });
  order.forEach(b => all.add(b));
  order.forEach(b => {
    const unlock = BG_BUILD_LEVEL[b];
    const lv = Math.max(st.level, unlock);
    const cands = ctx.candsAt(lv);
    const full = bestPlan(cands, all, lv, false, true);
    const less = new Set(all);
    less.delete(b);
    const without = bestPlan(cands, less, lv, false, true);
    const forced = b === "Kitchen";
    if (!full.xpDay && !forced) return;
    if (!forced && missingBuildings(full, st.owned).indexOf(b) === -1) return;
    const gain = without.xpDay > 0 ? full.xpDay / without.xpDay : 99;
    const cheaper = without.xpDay > 0 && full.xpDay >= without.xpDay && full.costDay / full.xpDay <= without.costDay / without.xpDay * .7;
    if (!forced && gain < 1.25 && !cheaper) return;
    out.push({
      building: b,
      unlock: unlock,
      gain: gain,
      plan: full
    });
  });
  return out;
}

function simulate(ctx, st, builds, days) {
  const owned = new Set(st.owned);
  let xp = st.exp;
  const goalXp = levelXp(BG_GOAL_LEVEL);
  const segments = [];
  let day = 0;
  let cache = {
    level: -1,
    plan: null
  };
  const limit = days || 1500;
  let totalCost = 0;
  while (xp < goalXp && day < limit) {
    const level = levelOfXp(xp);
    builds.forEach(b => {
      if (level >= b.unlock) owned.add(b.building);
    });
    if (cache.level !== level || cache.ownedSize !== owned.size) {
      cache = {
        level: level,
        ownedSize: owned.size,
        plan: bestPlan(ctx.candsAt(level), owned, level, false, true)
      };
    }
    const plan = cache.plan;
    if (!plan.xpDay) break;
    const last = segments[segments.length - 1];
    if (!last || last.label !== plan.label) segments.push({
      label: plan.label,
      plan: plan,
      fromLevel: level,
      fromDay: day,
      days: 0
    });
    segments[segments.length - 1].days++;
    segments[segments.length - 1].toLevel = level;
    xp += plan.xpDay;
    totalCost += plan.costDay;
    day++;
  }
  return {
    segments: segments,
    days: day,
    reached: xp >= goalXp,
    totalCost: totalCost
  };
}

const BG_OIL_SKILLS = new Set([ "skill_swift_sizzle" ]);

function oilFilter(list, st) {
  return list;
}

function strategyTargets(st) {
  const sets = {
    less: oilFilter(BG_STRATS.less.targets, st),
    rush: oilFilter(BG_STRATS.rush.targets, st),
    fish: BG_STRATS.fish.targets
  };
  const chosen = sets[st.strategy] || sets.less;
  const seen = new Map;
  chosen.forEach(t => seen.set(t[0], t[1]));
  const out = chosen.map(t => [ t[0], t[1], false ]);
  [ "less", "rush", "fish" ].filter(k => k !== st.strategy).forEach(k => {
    sets[k].forEach(t => {
      if (seen.has(t[0]) && seen.get(t[0]) >= t[1]) return;
      seen.set(t[0], t[1]);
      out.push([ t[0], t[1], true ]);
    });
  });
  return out;
}

function buildMatches(st) {
  const res = {};
  const sets = {
    less: oilFilter(BG_STRATS.less.targets, st).map(t => t[0]),
    rush: oilFilter(BG_STRATS.rush.targets, st).map(t => t[0]),
    fish: BG_STRATS.fish.targets.map(t => t[0])
  };
  Object.keys(sets).forEach(k => {
    res[k] = {
      have: sets[k].filter(id => st.skills.has(id)).length,
      total: sets[k].length
    };
  });
  return res;
}

function allocateSkills(st, targets) {
  const taken = new Set(st.skills);
  const rankNow = {};
  Object.keys(BG_SKILL_RANKS).forEach(id => {
    rankNow[id] = taken.has(id) ? st.ranks[id] || 1 : 0;
  });
  const treePts = {
    cooking: skillCategoryPoints(st.skills, "cooking"),
    fishing: skillCategoryPoints(st.skills, "fishing")
  };
  let cum = usedSkillPoints(st.skills, st.ranks);
  const path = [];
  const addFirst = (id, filler, extra) => {
    const info = skillInfo(id);
    if (!info || taken.has(id)) return;
    const cat = info.skillCategory;
    const tier = info.skillTier;
    const thr = BG_SKILL_THRESHOLDS[cat] ? BG_SKILL_THRESHOLDS[cat][tier] || 0 : 0;
    while (treePts[cat] != null && treePts[cat] < thr) {
      const fill = SKILL_BOOSTS.filter(s => s.skillCategory === cat && !taken.has(s.id) && s.skillTier < tier && !s.isActiveAbility && !/Desert Island/.test(s.note || "") && !BG_SKILL_RANKS[s.id]).sort((a, b) => a.skillTier - b.skillTier)[0];
      if (!fill) break;
      addFirst(fill.id, true, extra);
    }
    taken.add(id);
    rankNow[id] = 1;
    cum += tier;
    if (tier < 3 && treePts[cat] != null) treePts[cat] += tier;
    path.push({
      id: id,
      name: info.name,
      tier: tier,
      cat: cat,
      points: tier,
      rank: 1,
      shards: 0,
      needLevel: cum,
      filler: !!filler,
      extra: !!extra,
      why: bgWhyAt(id, info, 1)
    });
  };
  const sorted = targets.slice().sort((a, b) => (a[2] ? 1 : 0) - (b[2] ? 1 : 0) || (skillInfo(a[0]) ? skillInfo(a[0]).skillTier : 9) - (skillInfo(b[0]) ? skillInfo(b[0]).skillTier : 9));
  sorted.forEach(t => addFirst(t[0], false, t[2]));
  let shardsLeft = st.shards.left;
  let guard = 0;
  while (guard++ < 14) {
    let best = null;
    targets.forEach(t => {
      const id = t[0];
      const cfg = BG_SKILL_RANKS[id];
      const info = skillInfo(id);
      if (!cfg || !info) return;
      const cur = rankNow[id];
      if (cur < 1 || cur >= t[1] || cur >= cfg.eff.length) return;
      const tier = info.skillTier;
      const need = Math.min(3, tier + cur);
      if (need >= 2) {
        const thr = BG_SKILL_THRESHOLDS[info.skillCategory] ? BG_SKILL_THRESHOLDS[info.skillCategory][need] || 0 : 0;
        if (treePts[info.skillCategory] == null || treePts[info.skillCategory] < thr) return;
      }
      if (tier > shardsLeft) return;
      const value = (cfg.eff[cur] - cfg.eff[cur - 1]) * (BG_KIND_WEIGHT[cfg.kind] || .1) / tier * (t[2] ? .02 : 1);
      if (!best || value > best.value) best = {
        id: id,
        info: info,
        value: value,
        cur: cur,
        extra: !!t[2]
      };
    });
    if (!best) break;
    const tier = best.info.skillTier;
    shardsLeft -= tier;
    rankNow[best.id] = best.cur + 1;
    cum += BG_UPGRADE_POINTS[tier] || 1;
    path.push({
      id: best.id,
      name: best.info.name,
      tier: tier,
      cat: best.info.skillCategory,
      points: BG_UPGRADE_POINTS[tier] || 1,
      rank: best.cur + 1,
      shards: tier,
      needLevel: cum,
      filler: false,
      extra: best.extra,
      why: `${bgWhyAt(best.id, best.info, best.cur + 1)} (Rank ${best.cur + 1})`
    });
  }
  return {
    path: path,
    rankNow: rankNow,
    shardsLeft: shardsLeft
  };
}

function extendPlan(st, base, groups) {
  const taken = new Set(st.skills);
  const rankOf = {};
  taken.forEach(id => {
    rankOf[id] = st.ranks[id] || 1;
  });
  const entries = [];
  base.path.forEach(e => {
    taken.add(e.id);
    rankOf[e.id] = Math.max(rankOf[e.id] || 0, e.rank);
    entries.push({
      id: e.id,
      rank: e.rank,
      level: e.needLevel,
      blocked: false
    });
  });
  const treePts = {};
  Object.keys(BG_SKILL_THRESHOLDS).forEach(cat => {
    treePts[cat] = skillCategoryPoints(taken, cat);
  });
  let cum = base.path.length ? base.path[base.path.length - 1].needLevel : usedSkillPoints(st.skills, st.ranks);
  let shardsLeft = base.shardsLeft;
  const fillerFor = (cat, tier) => SKILL_BOOSTS.filter(s => s.skillCategory === cat && !taken.has(s.id) && s.skillTier < tier && !s.isActiveAbility && !/Desert Island/.test(s.note || "") && !BG_SKILL_RANKS[s.id]).sort((a, b) => a.skillTier - b.skillTier || (a.notModeled ? 1 : 0) - (b.notModeled ? 1 : 0))[0];
  const buy = id => {
    const info = skillInfo(id);
    if (!info || taken.has(id)) return;
    const cat = info.skillCategory;
    const tier = info.skillTier;
    const thr = BG_SKILL_THRESHOLDS[cat] ? BG_SKILL_THRESHOLDS[cat][tier] || 0 : 0;
    let guard = 0;
    while (treePts[cat] != null && treePts[cat] < thr && guard++ < 24) {
      const fill = fillerFor(cat, tier);
      if (!fill) break;
      buy(fill.id);
    }
    taken.add(id);
    rankOf[id] = 1;
    cum += tier;
    if (tier < 3 && treePts[cat] != null) treePts[cat] += tier;
    entries.push({
      id: id,
      rank: 1,
      level: cum,
      blocked: false
    });
  };
  const rankUp = id => {
    const info = skillInfo(id);
    const cur = rankOf[id] || 0;
    if (!info || cur < 1 || cur >= 3) return false;
    const cat = info.skillCategory;
    const tier = info.skillTier;
    const need = Math.min(3, tier + cur);
    const thr = BG_SKILL_THRESHOLDS[cat] ? BG_SKILL_THRESHOLDS[cat][need] || 0 : 0;
    if (treePts[cat] != null && treePts[cat] < thr) return false;
    if (tier > shardsLeft) {
      entries.push({
        id: id,
        rank: cur + 1,
        level: 0,
        blocked: true
      });
      return false;
    }
    shardsLeft -= tier;
    rankOf[id] = cur + 1;
    cum += BG_UPGRADE_POINTS[tier] || 1;
    entries.push({
      id: id,
      rank: cur + 1,
      level: cum,
      blocked: false
    });
    return true;
  };
  groups.forEach(list => {
    const want = new Map;
    list.forEach(t => {
      if (!want.has(t[0]) || want.get(t[0]) < t[1]) want.set(t[0], t[1]);
    });
    want.forEach((r, id) => buy(id));
    want.forEach((r, id) => {
      while ((rankOf[id] || 0) < r && rankUp(id)) {}
    });
  });
  const byId = new Map;
  const byKey = new Map;
  entries.forEach(e => {
    if (!byId.has(e.id)) byId.set(e.id, []);
    byId.get(e.id).push(e);
    byKey.set(`${e.id}|${e.rank}`, e);
  });
  return {
    entries: entries,
    byId: byId,
    byKey: byKey
  };
}

function fullSkillPlan(st) {
  const targets = strategyTargets(st);
  const own = targets.filter(t => !t[2]);
  const extras = targets.filter(t => t[2]).map(t => [ t[0], t[1] ]);
  const lead = allocateSkills(st, own);
  return extendPlan(st, lead, guideSkillGroups().concat([ extras ]));
}

function skillLevelLookupFor(st, plan) {
  return (id, rank) => {
    const list = plan.byId.get(id);
    if (!list) return "";
    const upto = list.filter(e => e.rank <= rank);
    if (!upto.length) return "";
    if (upto.some(e => e.blocked)) return "Not enough shards";
    const lvl = Math.max(...upto.map(e => e.level));
    return st.level >= lvl ? "Available now" : `Level ${lvl}`;
  };
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

function boostGain(b, plan) {
  const cook = plan.cook;
  const fish = plan.fish;
  if (b.agedFishXpMult) return fish && fish.stage === "aged" ? fish.xpDay * (b.agedFishXpMult - 1) : 0;
  if (b.scope === "foodGlobal") return (plan.xpDay || 0) * (b.expMult - 1);
  if (b.scope === "foodFish") return fish ? fish.xpDay * (b.expMult - 1) : 0;
  if (b.scope === "foodCheese") return cook && cook.usesCheese ? b.expAdd * cook.per24 : 0;
  if (b.scope === "cookTimeGlobal") return cook && cook.per24 < BG_MAX_CRAFTS ? cook.xpDay * (1 / b.timeMult - 1) : 0;
  return 0;
}

function boostEntry(b, plan) {
  const gain = boostGain(b, plan);
  const price = boostPrice(b.name);
  const weighted = b.scope === "cookTimeGlobal" ? gain * BG_TIME_WEIGHT : gain;
  return {
    id: b.id,
    name: b.name,
    note: b.note,
    scope: b.scope,
    active: isBoostActive(b.id),
    gain: gain,
    price: price,
    payback: price > 0 && weighted > 0 ? price / weighted : 0,
    group: b.category === "fishing" ? "Fish yield" : b.scope === "foodFish" ? "Fish EXP" : b.scope === "cookTimeGlobal" ? "Cooking speed" : "Food EXP"
  };
}

function boostSuggestions(plan) {
  const out = [];
  BOOSTS.forEach(b => {
    if (b.category !== "cooking" || isBoostActive(b.id)) return;
    if (/\(|Shrine|Totem|Hourglass/.test(b.name)) return;
    const e = boostEntry(b, plan);
    if (e.gain <= 0) return;
    out.push(e);
  });
  out.sort((a, b) => {
    const pa = a.price > 0;
    const pb = b.price > 0;
    if (pa !== pb) return pa ? -1 : 1;
    if (pa) return a.payback - b.payback;
    return b.gain - a.gain;
  });
  const groups = [ "Food EXP", "Fish EXP", "Cooking speed" ];
  const res = [];
  groups.forEach(g => {
    out.filter(x => x.group === g).slice(0, g === "Cooking speed" ? 2 : 3).forEach(x => res.push(x));
  });
  return res;
}

function strategyBoosts(st, plan) {
  const all = [];
  BOOSTS.forEach(b => {
    if (/\(|Shrine|Totem|Hourglass/.test(b.name)) return;
    let group = null;
    if (st.strategy === "fish") {
      if (b.scope === "fishYield") group = "Fish yield"; else if (b.scope === "foodGlobal" && b.expMult) group = "Food and fish EXP (affects both)"; else if (b.agedFishXpMult) group = "Fish EXP"; else if (b.scope === "foodFish") group = "Fish EXP"; else if (b.scope === "fishRod") group = "Fish rod (cheaper catches)"; else if (b.scope === "fishMarket") group = "Fish Market output (yield and speed)"; else if ((b.scope === "crustacean" || b.scope === "fishCrab") && (BG_CRUST_COST_IDS.indexOf(b.id) >= 0 || BG_CRUST_TIME_IDS.indexOf(b.id) >= 0)) group = "Crustacean and crab (cheaper Fish Market items and chum)";
    } else if (b.category === "cooking" && (b.expMult || b.expAdd)) {
      const cook = plan.cook;
      if (b.scope === "foodGlobal" || cook && (b.scope === "foodCheese" && cook.usesCheese || b.scope === "foodSpecific" && b.target === cook.name)) group = cook ? `${cook.name} EXP` : "Food EXP";
    }
    if (!group) return;
    const e = boostEntry(b, plan);
    e.group = group;
    all.push(e);
  });
  const groupOrder = [];
  all.forEach(x => {
    if (groupOrder.indexOf(x.group) < 0) groupOrder.push(x.group);
  });
  if (st.strategy === "fish") {
    const first = [ "Fish EXP", "Food and fish EXP (affects both)" ].filter(g => groupOrder.indexOf(g) >= 0);
    groupOrder.splice(0, groupOrder.length, ...first, ...groupOrder.filter(g => first.indexOf(g) < 0));
  }
  all.sort((a, b) => {
    if (a.group !== b.group) return groupOrder.indexOf(a.group) - groupOrder.indexOf(b.group);
    if (a.active !== b.active) return a.active ? 1 : -1;
    if (st.strategy === "rush") return b.gain - a.gain;
    const pa = a.price > 0;
    const pb = b.price > 0;
    if (pa !== pb) return pa ? -1 : 1;
    if (pa) return a.payback - b.payback;
    return b.gain - a.gain;
  });
  return all;
}

function boostCostText(b) {
  if (b.active) return "Already active";
  if (!(b.price > 0)) return "No market price found";
  const per = b.payback > 0 ? ` · ${b.payback < 0.01 ? b.payback.toFixed(4) : b.payback.toFixed(2)}${FLOWER_ICON} per +1 EXP/day` : "";
  return `Market price ${b.price < 1 ? b.price.toFixed(4) : b.price.toFixed(2)}${FLOWER_ICON}${per}`;
}

function buildMaterialsHtml(name) {
  const item = WB_BUILDINGS.find(b => b.name === name);
  if (!item) return "";
  const parts = [];
  if (item.coins) parts.push(`<span class="bgx-cost">${COIN_ICON} ${fmtInt(item.coins)}</span>`);
  Object.keys(item.ingredients).forEach(k => {
    parts.push(`<span class="bgx-cost">${getIcon(k)} ${fmtInt(item.ingredients[k])}</span>`);
  });
  return parts.join("");
}

function resourcesHtml(resources, coins) {
  const parts = [];
  if (coins) parts.push(`<span class="bgx-cost">${COIN_ICON} ${fmtInt(coins)}</span>`);
  Object.keys(resources || {}).forEach(k => {
    parts.push(`<span class="bgx-cost">${getIcon(k)} ${fmtInt(resources[k])}</span>`);
  });
  return parts.join("");
}

function flowerCost(coins) {
  const v = coinsToFlower(coins);
  const text = v >= 100 ? fmtInt(v) : v >= 1 ? v.toFixed(2) : v.toFixed(4);
  return `${text}${FLOWER_ICON}`;
}

function itemIcon(c) {
  if (c.kind === "fish") return getIcon(c.stage === "aged" ? c.name : c.name);
  return cookFoodIcon(c.name);
}

function itemLabel(c) {
  if (c.kind === "fish") return c.stage === "aged" ? `Aged ${c.name}` : c.name;
  return c.name;
}

function levelAfter(st, add) {
  return levelOfXp(st.exp + add);
}

function eatLine(c, st) {
  const lvl = levelAfter(st, c.xpDay);
  const n = Math.floor(c.per24);
  if (c.kind === "fish") return `Fish ${fmtInt(c.per24)}× a day and eat the ${itemIcon(c)} <strong>${escapeHtml(itemLabel(c))}</strong> (${fmtInt(c.xp)} EXP each)`;
  if (c.per24 >= 2) return `Cook <strong class="bg-hl">${fmtInt(n)}× ${itemIcon(c)} ${escapeHtml(c.name)}</strong> in the ${escapeHtml(c.building)} over 24 hours (${fmtInt(c.xp)} EXP each)`;
  return `Keep one ${itemIcon(c)} <strong class="bg-hl">${escapeHtml(c.name)}</strong> cooking non-stop in the ${escapeHtml(c.building)} (1 every ${formatDuration(c.time)}, ${fmtInt(c.xp)} EXP each)`;
}

function planLevelLine(plan, st) {
  const lvl = levelAfter(st, plan.xpDay);
  const gained = Math.max(0, lvl - st.level);
  return `Doing this for 24 hours gives <strong class="bg-hl">+${fmtInt(plan.xpDay)} EXP</strong> and takes you to <strong class="bg-hl">Level ${fmtInt(lvl)}</strong>${gained > 0 ? ` (+${fmtInt(gained)} levels)` : ""}.`;
}

function expansionInfo(st) {
  const idx = islandIndex(st.land);
  const isl = BG_ISLANDS[idx];
  const goalIdx = BG_ISLANDS.length - 1;
  let remaining = 0;
  let upgrades = 0;
  if (idx < goalIdx) {
    remaining += Math.max(0, isl.max - st.expansion);
    upgrades += 1;
    for (let i = idx + 1; i < goalIdx; i++) {
      remaining += BG_ISLANDS[i].max - BG_ISLANDS[i].start;
      upgrades += 1;
    }
  }
  const atGoal = idx === goalIdx && st.expansion >= BG_ISLANDS[goalIdx].start;
  const atMax = st.expansion >= isl.max;
  let next = null;
  let upgrade = null;
  if (!atGoal) {
    if (!atMax) {
      const table = ES_REQ_TABLE[isl.id] || {};
      next = table[st.expansion + 1] || null;
      if (next) next = Object.assign({
        number: st.expansion + 1
      }, next);
    } else {
      const target = BG_ISLANDS[idx + 1];
      const cost = target ? ES_ISLAND_UPGRADE_COST[target.id] : null;
      upgrade = target && cost ? {
        target: target,
        cost: cost
      } : null;
    }
  }
  return {
    island: isl,
    remaining: remaining,
    upgrades: upgrades,
    atGoal: atGoal,
    next: next,
    upgrade: upgrade
  };
}

function totalCoinsOf(resources, coins) {
  let sum = coins || 0;
  Object.keys(resources || {}).forEach(k => {
    if (k === "Gem") return;
    sum += (resources[k] || 0) * (getMaterialUnitCostCoins(k, "buy") || 0);
  });
  return sum;
}

function inGuideScope(fn) {
  return runWithGuideRestock(bgState.mode === "free", fn);
}

let bgComputed = null;

let bgJob = 0;

let bgInputTimer = 0;

function computeAll(reuse) {
  if (reuse && bgComputed) return bgComputed;
  bgComputed = inGuideScope(computeAllInner);
  return bgComputed;
}

function bgDefer(boxId, fn) {
  const id = ++bgJob;
  const box = $(boxId);
  if (box) box.classList.add("bg-busy");
  requestAnimationFrame(() => setTimeout(() => {
    if (id !== bgJob) return;
    try {
      fn();
    } finally {
      document.querySelectorAll(".bg-busy").forEach(el => el.classList.remove("bg-busy"));
    }
  }, 0));
}

function computeAllInner() {
  invalidateCostCache();
  const st = resolveState();
  bgStrategy = st.strategy;
  bgPoolFactor = st.strategy === "rush" ? .92 : .6;
  const raw = {
    cook: buildRawCooks(st),
    fish: buildRawFish(st)
  };
  const alloc = allocateSkills(st, strategyTargets(st));
  const fullPlan = fullSkillPlan(st);
  alloc.path.forEach(e => {
    const hit = fullPlan.byKey.get(`${e.id}|${e.rank}`);
    if (hit && !hit.blocked) e.needLevel = hit.level;
  });
  const memo = {};
  const ctx = {
    candsAt: lv => {
      if (!memo[lv]) memo[lv] = scoreAll(raw, st, ranksAt(alloc.path, st, lv), lv);
      return memo[lv];
    }
  };
  const cands = ctx.candsAt(st.level);
  const nowPlan = bestPlan(cands, st.owned, st.level, false, true);
  const builds = recommendBuilds(ctx, st);
  const readyBuilds = builds.filter(b => st.level >= b.unlock);
  const futureBuilds = builds.filter(b => st.level < b.unlock);
  let plan = nowPlan;
  const ownedPlus = new Set(st.owned);
  builds.forEach(b => ownedPlus.add(b.building));
  const readyPlus = new Set(st.owned);
  readyBuilds.forEach(b => readyPlus.add(b.building));
  const buildPlanNow = bestPlan(cands, readyPlus, st.level, false, true);
  const needNow = missingBuildings(buildPlanNow, st.owned);
  if (needNow.length && buildPlanNow.xpDay > nowPlan.xpDay) plan = buildPlanNow;
  let syncCands = cands;
  let syncPlan = plan;
  if (st.useSynced) {
    syncCands = scoreAll(raw, st, Object.assign({}, st.ranks), st.level, syncFx());
    const syncNow = bestPlan(syncCands, st.owned, st.level, false, true);
    const syncBuild = bestPlan(syncCands, readyPlus, st.level, false, true);
    syncPlan = missingBuildings(syncBuild, st.owned).length && syncBuild.xpDay > syncNow.xpDay ? syncBuild : syncNow;
  }
  const sim = simulate(ctx, st, builds);
  const land = expansionInfo(st);
  return {
    st: st,
    raw: raw,
    cands: cands,
    syncCands: syncCands,
    syncPlan: syncPlan,
    ctx: ctx,
    nowPlan: nowPlan,
    plan: plan,
    builds: builds,
    ownedPlus: ownedPlus,
    readyBuilds: readyBuilds,
    futureBuilds: futureBuilds,
    sim: sim,
    skills: alloc.path,
    alloc: alloc,
    boosts: boostSuggestions(plan),
    stratBoosts: strategyBoosts(st, plan),
    land: land
  };
}

function row(inner, extra) {
  return `<div class="fd-item-row bg-line${extra ? ` ${extra}` : ""}">${inner}</div>`;
}

function card(title, icon, body) {
  return `<div class="fd-container is-own bg-tile"><div class="fd-container-head"><span class="fd-container-title">${icon || ""} ${escapeHtml(title)}</span></div>${body}</div>`;
}

function instructionHtml(a) {
  const st = a.st;
  const plan = a.plan;
  const steps = [];
  const nextInfo = levelOfXp(st.exp) >= BG_GOAL_LEVEL ? null : cookGetLevelInfo(st.exp);
  const pct = nextInfo && nextInfo.span ? Math.min(100, Math.floor(nextInfo.progress / nextInfo.span * 100)) : 100;
  const head = `<div class="bg-hello">Hello <strong class="bg-hl">${escapeHtml(st.name.toUpperCase())}</strong>,</div>\n    <div class="bg-sub">You are <strong>Level ${fmtInt(st.level)}</strong>${nextInfo ? ` (${pct}% to the next level)` : ""} on the <strong>${escapeHtml(islandById(st.land).label)}</strong> island with <strong>${fmtInt(st.expansion)}</strong> expansions.</div>`;
  if (!st.useSynced) steps.push(`<li class="bg-note">Simulating a fresh <strong>Level ${fmtInt(st.level)}</strong> farm: only the Fire Pit, no skills and no VIP.${st.synced ? " Press Use synced farm values to use your real buildings and skills." : " Sync your farm for exact advice."}</li>`);
  steps.push(`<li><span class="bg-step-tag">MODE</span> <strong>${st.mode === "free" ? "Free to Play" : "Invested"}</strong> · <strong>${BG_STRATS[st.strategy].label}</strong>: ${st.mode === "free" ? `no VIP, no Gem restocks, only the free daily shipment; your ${fmtInt(st.plots)} crop plots limit how much you can grow.` : "VIP and Gem restocks are allowed."} ${strategyNote(st)}</li>`);
  steps.push(`<li><span class="bg-step-tag">REP</span> <strong class="bg-hl">${escapeHtml(st.rep.name)}</strong> (${fmtInt(st.rep.points)} pts): ${escapeHtml(st.rep.listings)}. ${st.rep.canBuy ? "You can buy ingredients from the market." : `You cannot buy ingredients yet, so grow them yourself${st.rep.next ? ` (next tier: ${escapeHtml(st.rep.next[1])} at ${fmtInt(st.rep.next[0])} pts)` : ""}.`}</li>`);
  if (levelOfXp(st.exp) >= BG_GOAL_LEVEL && a.land.atGoal) {
    steps.push(`<li><strong class="bg-hl">Goal reached!</strong> You are Level ${fmtInt(st.level)} on the Volcano island. Keep cooking for EXP and prepare for Ascension.</li>`);
  }
  if (plan.cook || plan.fish) {
    if (plan.cook) steps.push(`<li><span class="bg-step-tag">COOK</span> ${eatLine(plan.cook, st)}.</li>`);
    if (plan.fish) steps.push(`<li><span class="bg-step-tag">FISH</span> ${eatLine(plan.fish, st)}.</li>`);
    if (plan.altFish) steps.push(`<li><span class="bg-step-tag">FISH</span> Best aged fish to add: ${eatLine(plan.altFish, st)}. It adds <strong class="bg-hl">+${fmtInt(plan.altFish.xpDay)} EXP</strong> a day for ${flowerCost(plan.altFish.costDay)} on top of the food above, so you can do both.</li>`);
    if (plan.cook && plan.fish) steps.push(`<li class="bg-note">Fish and food run side by side, so you earn both every day.</li>`); else if (plan.cook && !plan.fishUnsuitable && st.strategy !== "fish" && a.cands.fish.length && st.level >= BG_FISH_LEVEL) steps.push(`<li class="bg-note">Aged fish was skipped because food gives more EXP for less money on your farm.</li>`); else if (plan.fish && !plan.cook) steps.push(`<li class="bg-note">Fish gives far more EXP for the money than any food you can cook right now.</li>`);
    const seedNote = [ plan.cook, plan.fish ].some(c => c && c.seedLimited) ? " Limited by your daily seed stock." : "";
    steps.push(`<li>${planLevelLine(plan, st)} Daily cost ${st.rep.canBuy ? "at market price" : "to grow it yourself"}: <strong>${flowerCost(plan.costDay)}</strong>.${seedNote}</li>`);
  } else {
    steps.push(`<li class="bg-note">Market prices are still loading. Open the Prices or Cooking panel once, then come back.</li>`);
  }
  if (plan.fishUnsuitable) steps.push(`<li class="bg-note">Aged fish costs more per EXP than food on your farm, so the food above is your main plan and the fish is an optional extra. Check the Must cook for EXP tab for more aged fish choices.</li>`); else if (st.strategy === "fish" && !plan.fish) steps.push(`<li class="bg-note">No aged fish is available yet. Fishing needs Level ${BG_FISH_LEVEL} and the Aging Shed.</li>`);
  if (plan.cook && plan.cook.name === "Pizza Margherita") steps.push(plan.cook.jackpot > 0 ? `<li class="bg-note">Keep cooking <strong>Pizza Margherita</strong> in the Fire Pit: <strong>Fiery Jackpot</strong> gives a ${fmtInt(plan.cook.jackpot * 100)}% chance to double the output while you pay for one set of ingredients.</li>` : `<li class="bg-note">Keep cooking <strong>Pizza Margherita</strong> in the Fire Pit. It is the cheapest EXP and gets even better once you take Fiery Jackpot.</li>`);
  const offSeason = plan.cook ? plan.cook.parts.filter(x => x.offSeason) : [];
  if (offSeason.length) steps.push(`<li class="bg-note">Out of season right now: ${offSeason.map(x => escapeHtml(x.name)).join(", ")} cannot be grown, so ${st.rep.canBuy ? "buy them" : "this food is hard to make until the season changes"}.</li>`);
  const oilStep = oilStepHtml(a);
  if (oilStep) steps.push(oilStep);
  const missing = missingBuildings(plan, st.owned);
  missing.forEach(b => {
    const lvl = BG_BUILD_LEVEL[b];
    steps.push(st.level >= lvl ? `<li><span class="bg-step-tag">BUILD</span> Build the <strong class="bg-hl">${escapeHtml(b)}</strong> now. It is needed for the plan above.</li>` : `<li><span class="bg-step-tag">LOCKED</span> The <strong>${escapeHtml(b)}</strong> unlocks at Level ${lvl}.</li>`);
  });
  if (!st.vip && st.mode === "invested") steps.push(`<li><span class="bg-step-tag">VIP</span> Get <strong class="bg-hl">VIP</strong>: it adds <strong>+10% EXP</strong> to every food and fish (about <strong>+${fmtInt(plan.xpDay * .1)} EXP</strong> a day) and <strong>+600 reputation</strong>, which unlocks unlimited trading.</li>`);
  const skillNext = a.skills.slice(0, 3);
  if (skillNext.length) {
    const first = skillNext[0];
    steps.push(`<li><span class="bg-step-tag">SKILL</span> Next skill: <strong class="bg-hl">${escapeHtml(first.name)}${first.rank > 1 ? ` Rank ${first.rank}` : ""}</strong> (${first.points} point${first.points > 1 ? "s" : ""}${first.shards ? `, ${first.shards} shard${first.shards > 1 ? "s" : ""}` : ""}). ${st.level >= first.needLevel ? "You can take it now." : `You need Level ${first.needLevel} for it.`}</li>`);
  }
  steps.push(`<li><span class="bg-step-tag">SHARDS</span> ${shardLine(st)}</li>`);
  const land = a.land;
  if (land.atGoal) {
    steps.push(`<li><span class="bg-step-tag">LAND</span> Volcano island reached. Land goal done.</li>`);
  } else if (land.next) {
    const n = land.next;
    const lvlOk = st.level >= n.bumpkinLevel.level;
    steps.push(`<li><span class="bg-step-tag">LAND</span> Next: ${escapeHtml(land.island.label)} expansion <strong class="bg-hl">#${fmtInt(n.number)}</strong>. ${lvlOk ? "Your level is high enough." : `Needs <strong>Level ${n.bumpkinLevel.level}</strong> first.`}</li>`);
  } else if (land.upgrade) {
    steps.push(`<li><span class="bg-step-tag">LAND</span> Upgrade to the <strong class="bg-hl">${escapeHtml(land.upgrade.target.label)}</strong> island. It costs ${resourcesHtml(land.upgrade.cost.resources, land.upgrade.cost.coins)}.</li>`);
  }
  const future = a.futureBuilds[0];
  if (future && future.fishMarket) steps.push(`<li><span class="bg-step-tag">NEXT</span> At <strong>Level ${future.unlock}</strong> build the <strong class="bg-hl">Fish Market</strong>: it turns your guaranteed catches into processed fish items. Bubble Aura boosts its output.</li>`); else if (future) steps.push(`<li><span class="bg-step-tag">NEXT</span> At <strong>Level ${future.unlock}</strong> build the <strong class="bg-hl">${escapeHtml(future.building)}</strong>: ${future.gain >= 90 ? "much more EXP per day" : future.gain >= 1.25 ? `about <strong>${future.gain.toFixed(1)}×</strong> more EXP per day than now` : "a cheap early upgrade that unlocks more recipes"}.</li>`);
  return `<div class="fd-container is-own bg-instr"><div class="fd-container-head"><span class="fd-container-title">${NPC_ICONS["pumpkin' pete"] ? `<img class="bg-title-icon" src="${NPC_ICONS["pumpkin' pete"]}" alt="">` : ""} Your Instructions</span></div>${head}<ol class="bg-steps">${steps.join("")}</ol></div>`;
}

function strategyNote(st) {
  if (st.strategy === "rush") return "Most EXP in 24 hours, using output skills.";
  if (st.strategy === "fish") return "Aged fish at the cheapest catch cost, only if it is worth it.";
  return "Mid cost and a little faster leveling.";
}

function oilStepHtml(a) {
  const st = a.st;
  if (!st.oil || st.strategy === "fish") return "";
  const unit = oilUnitCost(st);
  const list = [ "Fire Pit", "Deli", "Kitchen", "Bakery", "Smoothie Shack" ].filter(b => b === "Fire Pit" || st.owned.has(b) || a.builds.some(x => x.building === b));
  const parts = list.map(b => {
    const boost = oilBoostFor(b, a.cands.ranks);
    const daily = BG_OIL_DAILY[b];
    return `<strong>${escapeHtml(b)}</strong> −${fmtInt(boost * 100)}% cook time (${fmtInt(daily)} ${getIcon("Oil")} Oil/day${unit > 0 ? ` ≈ ${flowerCost(daily * unit)}` : ""})`;
  });
  return `<li><span class="bg-step-tag">OIL</span> Use Oil to speed up cooking: ${parts.join(", ")}.</li>`;
}

function stratStatus(a, id, rank) {
  const st = a.st;
  const info = skillInfo(id);
  const have = st.skills.has(id) ? st.ranks[id] || 1 : 0;
  if (have >= rank) return `✔ Owned`;
  const tier = info ? info.skillTier : 1;
  const entries = a.skills.filter(s => s.id === id && s.rank <= rank);
  const reached = a.alloc.rankNow[id] >= rank;
  if (!reached) {
    const need = Math.max(0, rank - Math.max(have, 1)) * tier;
    return need > st.shards.left ? `Out of reach: ${fmtInt(need)} shards needed, ${fmtInt(st.shards.left)} left` : `Needs more skill points first`;
  }
  const lvl = entries.length ? Math.max(...entries.map(e => e.needLevel)) : 0;
  const shards = entries.reduce((t, e) => t + e.shards, 0);
  const lvlText = st.level >= lvl ? "Available now" : `Level ${lvl}`;
  return `${lvlText}${shards ? ` · ${fmtInt(shards)} shard${shards > 1 ? "s" : ""}` : ""}`;
}

function skillWhere(info) {
  const cat = info.skillCategory || "";
  return `Skill tree: ${cat.charAt(0).toUpperCase()}${cat.slice(1)} · Tier ${info.skillTier}`;
}

function stratSkillRow(a, id, suggested, showRank, key) {
  const info = skillInfo(id);
  if (!info) return "";
  const rank = key ? simRankOf(key, id, suggested) : suggested;
  const have = a.st.skills.has(id) ? a.st.ranks[id] || 1 : 0;
  const isOwned = have >= 1 && suggested <= have;
  const check = isOwned && key ? simOwnedCheck(key, id) : key ? simCheck(key, "s", id, suggested) : "";
  const picker = key ? simRankPicker(key, id, suggested, isOwned ? have : 0) : "";
  const badge = isOwned ? `<span class="bg-owned-badge">Owned</span>` : "";
  const cls = `${key && simRankMax(id) > 1 ? "bg-has-rank" : ""}${isOwned ? " bg-owned" : ""}`.trim();
  return row(`<span class="fd-item-main">${getBoostIcon(info.name)} <strong>${escapeHtml(info.name)}${showRank ? ` [${rank}]` : ""}</strong><span class="bg-why">${escapeHtml(bgWhyAt(id, info, rank))}</span><span class="bg-why">${escapeHtml(skillWhere(info))}</span></span>${check}${picker}${badge}`, `bg-skill-card ${cls}`.trim());
}

function levelSimKey(st) {
  return `lvl:${st.strategy}`;
}

function levelTargets(st) {
  const list = st.strategy === "fish" ? BG_STRATS.fish.targets : strategyTargets(st).filter(t => !t[2]);
  return list.map(t => [ t[0], t[1] ]);
}

function levelMissingSkills(a) {
  const st = a.st;
  return levelTargets(st).map(t => {
    const have = st.skills.has(t[0]) ? st.ranks[t[0]] || 1 : 0;
    return {
      id: t[0],
      rank: t[1],
      info: skillInfo(t[0]),
      have: have
    };
  }).filter(m => m.info && m.have < m.rank);
}

const BG_LEVEL_EXTRA_IDS = [ "skill_juicy_boost", "skill_speedy_aging", "skill_frenzied_fish", "skill_turbo_fry", "skill_fry_frenzy", "skill_double_nom" ];

function levelAppliedIds(st) {
  const ids = [];
  const add = id => {
    if (ids.indexOf(id) < 0) ids.push(id);
  };
  [ "less", "rush", "fish" ].forEach(k => {
    if (k === "fish" && st.strategy !== "fish") return;
    BG_STRATS[k].targets.forEach(t => add(t[0]));
  });
  BG_LEVEL_EXTRA_IDS.forEach(id => {
    const info = skillInfo(id);
    if (st.strategy !== "fish" && info && info.skillCategory === "fishing") return;
    add(id);
  });
  return ids;
}

function levelOwnedSkills(st, missing) {
  const skip = new Set((missing || []).map(m => m.id));
  return levelAppliedIds(st).map(id => ({
    id: id,
    info: skillInfo(id),
    have: st.skills.has(id) ? st.ranks[id] || 1 : 0
  })).filter(m => m.info && m.have >= 1 && !skip.has(m.id));
}

function levelDefaultBoosts(list) {
  const chosen = [];
  list.forEach(entry => {
    const me = BOOSTS.find(x => x.id === entry.id);
    if (!me) return;
    if (chosen.some(c => boostsConflict(c, me))) return;
    if (BOOSTS.some(o => isBoostActive(o.id) && boostsConflict(o, me))) return;
    chosen.push(me);
  });
  return chosen.map(b => b.id);
}

function oilFlagIds(st) {
  return st.oil && st.strategy !== "fish" ? [ "all" ].concat(BG_OIL_BUILDINGS).map(x => BG_OIL_OFF + x) : [];
}

function vipOffered(st) {
  return st.mode === "invested" && !(st.synced && st.synced.info && st.synced.info.vipActive);
}

function vipFlagIds(st) {
  return vipOffered(st) ? [ BG_VIP_FLAG ] : [];
}

function levelRegister(a, key) {
  const missing = levelMissingSkills(a);
  const boosts = a.stratBoosts.slice(0, 60).filter(b => !b.active);
  simRegister(key, missing.map(m => [ m.id, m.rank ]), boosts.map(b => b.id).concat(oilFlagIds(a.st)).concat(petFlagIds()).concat(vipFlagIds(a.st)), true, levelDefaultBoosts(boosts).concat(vipFlagIds(a.st)), missing.filter(m => a.alloc.rankNow[m.id] >= m.rank).map(m => [ m.id, m.rank ]), levelOwnedSkills(a.st, missing).map(m => [ m.id, m.have ]));
  return missing;
}

function stratSkillsBody(a, key, missing) {
  const st = a.st;
  const targets = levelTargets(st);
  const entries = targets.map(t => ({
    id: t[0],
    rank: t[1],
    info: skillInfo(t[0])
  })).filter(m => m.info);
  const primary = st.strategy === "fish" ? "fishing" : "cooking";
  const cats = [];
  entries.forEach(m => {
    if (cats.indexOf(m.info.skillCategory) < 0) cats.push(m.info.skillCategory);
  });
  cats.sort((x, y) => (y === primary) - (x === primary));
  let html = "";
  cats.forEach(cat => {
    let inner = "";
    [ 1, 2, 3 ].forEach(t => {
      const items = entries.filter(m => m.info.skillCategory === cat && m.info.skillTier === t);
      if (!items.length) return;
      inner += `<div class="fd-section-label">Tier ${t}</div>${items.map(m => stratSkillRow(a, m.id, m.rank, true, key)).join("")}`;
    });
    if (inner) html += `<div class="fd-section-label">${escapeHtml(cat.charAt(0).toUpperCase() + cat.slice(1))}</div>${inner}`;
  });
  if (!html) html = `<div class="fd-empty-note">No skills in this build.</div>`;
  return `${html}<div class="bg-mini">${shardLine(st)}</div>`;
}

function oilEffectNote(b, st) {
  const cfg = BG_OIL_RANKS[b];
  if (!cfg) return "";
  const owned = st.useSynced && st.ranks[cfg.skill] ? st.ranks[cfg.skill] : 0;
  const tiers = cfg.eff.map(v => fmtInt(v * 100)).join("% / ") + "%";
  return `<span class="bg-why">Can be enhanced with ${escapeHtml(cfg.name)}: −${tiers}${owned ? ` (rank ${fmtInt(owned)} owned)` : ""}</span>`;
}

function oilBoostBody(a, key) {
  const st = a.st;
  if (!st.oil) return "";
  const unit = oilUnitCost(st);
  const ranks = st.useSynced ? st.ranks : {};
  let html = `<button type="button" class="fd-section-label bg-oil-toggle${bgOilOpen ? " is-open" : ""}" data-bg-oil="1"><span>Oil Boost</span><img class="bg-sim-chev" src="${ICON_DATA["chevron_down.png"]}" alt=""></button><div class="bg-oil-body"${bgOilOpen ? "" : " hidden"}>`;
  html += row(`<span class="fd-item-main">${getIcon("Oil")} <strong>Add Oil</strong><span class="bg-why">Feed Oil to your cooking buildings so they cook faster. Untick it to simulate without any Oil.</span></span>${simOilCheck(key, "all")}`);
  BG_OIL_BUILDINGS.forEach(b => {
    const boost = oilBoostFor(b, ranks);
    const daily = BG_OIL_DAILY[b];
    const cost = unit > 0 ? ` ≈ ${flowerCost(daily * unit)}` : "";
    html += row(`<span class="fd-item-main">${getIcon(b)} <strong>${escapeHtml(b)}</strong> <span class="bg-hl">−${fmtInt(boost * 100)}% cooking time</span>${oilEffectNote(b, st)}<span class="bg-why">${fmtInt(daily)} ${getIcon("Oil")} Oil per day of cooking${cost}</span></span>${simOilCheck(key, b)}`);
  });
  return `${html}</div>`;
}

function petBoostBody(a, key) {
  const card = row(`<span class="fd-item-main"><strong>Faction Pet Bonus EXP</strong><span class="bg-why">The Faction Pet bonus multiplies the EXP of every food and fish you eat. Pick the bonus you get from your weekly pet streak, or None to leave it out. It is used in the simulation only.</span></span>${simPetButtons(key)}`, "bg-pet-card");
  return `<button type="button" class="fd-section-label bg-oil-toggle${bgPetOpen ? " is-open" : ""}" data-bg-petbox="1"><span>Faction Pet Bonus EXP</span><img class="bg-sim-chev" src="${ICON_DATA["chevron_down.png"]}" alt=""></button><div class="bg-oil-body"${bgPetOpen ? "" : " hidden"}>${card}</div>`;
}

function vipBoostBody(a, key) {
  const st = a.st;
  const label = `<div class="fd-section-label">VIP Access</div>`;
  if (st.mode !== "invested") return `${label}<div class="bg-mini">Free to Play mode: VIP is not counted. Switch to Invested to simulate VIP.</div>`;
  const active = !vipOffered(st);
  const gain = a.syncPlan && a.syncPlan.xpDay ? a.syncPlan.xpDay * (BG_VIP_MULT - 1) : 0;
  const right = active ? "✔ Active" : gain > 0 ? `<strong>+${fmtInt(gain)} EXP/day</strong>` : "";
  return label + row(`<span class="fd-item-main"><strong>VIP Access</strong><span class="bg-why">+10% EXP on all food and fish.</span><span class="bg-why">${active ? "Already active" : "Part of the simulation only. Untick it to simulate without VIP."}</span></span><span class="fd-item-cost bg-right">${right}</span>${active ? "" : simVipCheck(key)}`);
}

function stratBoostBody(a, key) {
  let html = vipBoostBody(a, key) + (a.st.strategy === "fish" ? "" : oilBoostBody(a, key)) + petBoostBody(a, key);
  let last = "";
  a.stratBoosts.slice(0, 60).forEach(b => {
    if (b.group !== last) {
      html += `<div class="fd-section-label">${escapeHtml(b.group)}</div>`;
      last = b.group;
    }
    html += row(`<span class="fd-item-main">${getIcon(b.name)} <strong>${escapeHtml(b.name)}</strong><span class="bg-why">${escapeHtml(b.note)}</span><span class="bg-why">${boostCostText(b)}</span></span><span class="fd-item-cost bg-right">${b.active ? "✔ Active" : b.gain > 0 ? `<strong>+${fmtInt(b.gain)} EXP/day</strong>` : ""}</span>${b.active ? "" : simCheck(key, "b", b.id, 1)}`);
  });
  if (!html) html = `<div class="fd-empty-note">No boosts found.</div>`;
  return `${html}<button type="button" class="fd-lb-btn bg-link" data-bg-action="boost">Open Boost panel</button>`;
}

function stratSuggestHtml(a) {
  const st = a.st;
  const plan = a.syncPlan;
  const note = st.useSynced ? `<div class="bg-mini">Based on the skills, boosts and VIP your synced farm has now. The Skills and Boost tabs below are for simulation only.</div>` : "";
  if (st.strategy === "fish") {
    const picks = fishPicks(a, false, a.syncCands);
    const fishLine = plan.fish ? optionRow(plan.fish, st, a, null, plan) : picks ? picks.map(x => optionRow(x.c, st, a, x.labels, plan)).join("") : `<div class="bg-mini">No aged fish is available yet. Fishing needs Level ${BG_FISH_LEVEL} and the Aging Shed.</div>`;
    const market = st.owned.has("Fish Market") ? "" : `<div class="bg-mini">Saw, Whale, White and Hammerhead sharks use guaranteed-catch costs; other fish use their normal fishing cost. Build the Fish Market (Level ${BG_BUILD_LEVEL["Fish Market"]}) and use Bubble Aura to get more out of it.</div>`;
    return `<div class="fd-section-label">Best aged fish</div>${note}${fishLine}${market}`;
  }
  const food = plan.cook ? optionRow(plan.cook, st, a, null, plan) : `<div class="bg-mini">No food found yet. Market prices may still be loading.</div>`;
  return `<div class="fd-section-label">Suggested food</div>${note}${food}`;
}

const BG_SIM_TOP = 6;

let bgSimCtx = null;

function lvNum(v) {
  const n = Number(v) || 0;
  const a = Math.abs(n);
  if (a >= 100) return fmtInt(n);
  if (a >= 10) return String(Math.round(n * 10) / 10);
  return String(Math.round(n * 100) / 100);
}

function levelTopPicks(list, ranks, strategy) {
  if (!list.length) return [];
  const best = pickBest(list, ranks);
  const maxXp = Math.max(...list.map(c => c.xpDay));
  const others = list.filter(c => c !== best);
  let ordered;
  if (strategy === "rush") ordered = others.sort((x, y) => y.xpDay - x.xpDay || x.costPerXp - y.costPerXp); else {
    const near = others.filter(c => c.xpDay >= maxXp * bgPoolFactor).sort((x, y) => x.costPerXp - y.costPerXp || y.xpDay - x.xpDay);
    const far = others.filter(c => c.xpDay < maxXp * bgPoolFactor).sort((x, y) => y.xpDay - x.xpDay);
    ordered = near.concat(far);
  }
  const picked = [ best ].concat(ordered).slice(0, BG_SIM_TOP);
  if (best.kind === "fish") {
    const top = list.reduce((m, c) => c.xpDay > m.xpDay ? c : m, list[0]);
    if (picked.indexOf(top) < 0) picked[picked.length - 1] = top;
  }
  return picked;
}

function dayMult(c) {
  const per = Number(c.per24);
  return (per > 0 ? per : 1) * (1 + (c.nom || 0));
}

function cookSimChips(c) {
  return ingredientChips(c, dayMult(c), true);
}

function fishItemBuy(name, buyMode) {
  if (!buyMode) return false;
  if (name === "Fishing Lure") return true;
  let price = 0;
  try {
    price = Number(findLivePriceForName(name)) || 0;
  } catch (e) {}
  return price > 0;
}

function fishSimChips(c, st) {
  const s = c.setup || {};
  const tag = (name, label) => {
    const b = fishItemBuy(name, s.buy);
    return `<span class="bg-pill ${b ? "bg-pill-buy" : "bg-pill-self"}">${b ? "Buy" : "Self Produce"} ${label}</span>`;
  };
  const pill = methodPill({
    method: fishItemBuy("Salt", c.saltBuy) ? "buy" : "collect",
    offSeason: false
  });
  const whole = v => Math.ceil(v - 1e-9);
  const n = Number(c.per24) > 0 ? Number(c.per24) : 1;
  const casts = Number(c.castsUsed) > 0 ? Number(c.castsUsed) : n;
  let html = `<span class="bgx-cost">×${lvNum(n)} ${getIcon(c.name)} ${escapeHtml(c.name)} · catch ${flowerCost(c.catchCost * n)}</span>`;
  if (s.kind === "gear") {
    if (s.rodCost > 0 && !c.rodFree) html += `<span class="bgx-cost">×${whole(casts)} ${getIcon("Rod")} Rod · ${flowerCost(s.rodCost * casts)} <span class="bg-pill bg-pill-self">Self Produce rod</span></span>`;
    if (s.bait) html += `<span class="bgx-cost">×${whole(casts)} ${getIcon(s.bait)} ${escapeHtml(s.bait)} bait · ${flowerCost(s.baitCost * casts)} ${tag(s.bait, "bait")}</span>`;
    if (s.chum) html += `<span class="bgx-cost">×${whole(casts * s.chum.qty)} ${getIcon(s.chum.name)} ${escapeHtml(s.chum.name)} chum · ${flowerCost(s.chum.cost * casts)} ${tag(s.chum.name, "chum")}</span>`;
  } else if (s.kind === "market" && s.item) {
    html += `<span class="bgx-cost">×${whole(casts)} ${getIcon(s.item)} ${escapeHtml(s.item)} (guaranteed catch, made at the Fish Market) · ${flowerCost(s.itemCost * casts)}</span>`;
  }
  if (c.saltQty > 0) html += `<span class="bgx-cost">×${whole(c.saltQty * n)} ${getIcon("Salt")} Salt · ${flowerCost(c.saltCost * n)} ${pill}</span>`;
  return html;
}

function timeText(actual, base) {
  const a = formatDuration(actual);
  return base > 0 && actual < base - 1 ? `${a} (base ${formatDuration(base)})` : a;
}

function levelSimCard(c, st, isBest, isTop) {
  const fish = c.kind === "fish";
  const missing = [];
  c.chain.forEach(b => {
    if (!st.owned.has(b)) missing.push(b);
  });
  const tags = (isBest ? `<span class="bg-label bg-best">best pick</span> ` : "") + (isTop && !isBest ? `<span class="bg-label bg-best">most EXP</span> ` : "") + missing.map(b => st.level >= BG_BUILD_LEVEL[b] ? `<span class="bg-label">build ${escapeHtml(b)}</span>` : `<span class="bg-label">${escapeHtml(b)} Lv ${BG_BUILD_LEVEL[b]}</span>`).join(" ");
  const lvl = levelAfter(st, c.xpDay);
  const output = fish ? c.per24 : c.per24 * c.foods;
  const unitName = fish ? `Aged ${c.name}` : c.name;
  const bonusFood = fish ? 0 : c.per24 * (c.jackpot + c.cleaver);
  const stats = fish ? `<div class="bg-sim-stat"><span>Fish per 24h</span><span>${lvNum(c.per24)}</span></div><div class="bg-sim-stat"><span>Aging time each</span><span>${timeText(c.agingTime, c.agingBase)}</span></div><div class="bg-sim-stat"><span>EXP each</span><span>${fmtInt(c.xp)}</span></div><div class="bg-sim-stat"><span>Cost each</span><span>${flowerCost(c.cost)}</span></div>` : `<div class="bg-sim-stat"><span>Cooking time each</span><span>${timeText(c.time, c.time0)}</span></div><div class="bg-sim-stat"><span>Cooks per 24h</span><span>×${lvNum(c.per24)}</span></div><div class="bg-sim-stat"><span>Average food per cook</span><span>×${lvNum(c.foods)}</span></div>${bonusFood > 0 ? `<div class="bg-sim-stat"><span>Free bonus food in 24h</span><span>+${lvNum(bonusFood)}</span></div>` : ""}<div class="bg-sim-stat"><span>EXP per cook</span><span>${fmtInt(c.xp)}</span></div><div class="bg-sim-stat"><span>Cost per cook</span><span>${flowerCost(c.cost)}</span></div>`;
  const avgParts = fish ? [] : [ c.nom > 0 ? `Double Nom +${fmtInt(c.nom)} food on every cook (ingredients ×${fmtInt(1 + c.nom)})` : "", c.jackpot > 0 ? `Fiery Jackpot ${fmtInt(c.jackpot * 100)}% chance of +1 food, free with no extra ingredients` : "", c.cleaver > 0 ? `Master Chef's Cleaver ${fmtInt(c.cleaver * 100)}% chance of +1 food, free with no extra ingredients` : "", c.oilBoost > 0 ? `Oil −${fmtInt(c.oilBoost * 100)}% cooking time` : "" ].filter(Boolean);
  const wholeNote = !fish && c.per24 >= 1 ? `<div class="bg-mini">Cooks are rounded to whole cooks (0.6 and up rounds up), so ingredients are never partial.</div>` : "";
  const avg = avgParts.length ? `<div class="bg-mini">${avgParts.join(" · ")}${c.jackpot > 0 || c.cleaver > 0 ? " (chances are averaged)" : ""}.</div>` : "";
  const fishNote = fish && c.setup && c.setup.buy ? `<div class="bg-mini">Fish cannot be bought. "Buy" means buying the tradable bait and chum used to catch them. The rod and any non-tradable chum are priced from what it costs you to make them. This follows the Buy / Collect setting in your Fishing panel, and Salt follows the Cooking panel.</div>` : "";
  const expOne = fish ? c.xp : c.xp / Math.max(c.foods, 1);
  const unitRow = `<div class="bg-sim-stat bg-lsim-unit"><span class="bg-lsim-unit-exp">${fmtInt(expOne)} EXP</span></div>`;
  return `<div class="fd-container is-own bg-lsim-card"><div class="bg-lsim-head"><span class="bg-lsim-title">${itemIcon(c)} <strong>${escapeHtml(itemLabel(c))}</strong></span>${tags ? `<span class="bg-lsim-tags">${tags}</span>` : ""}</div>${unitRow}<div class="fd-section-label">${fish ? "Catch and aging supplies for 24h" : "Ingredients for 24h"}</div><div class="bgx-costs">${fish ? fishSimChips(c, st) : cookSimChips(c)}</div>${fishNote}${stats}${wholeNote}${avg}<div class="bg-sim-stat bg-sim-strong bg-lsim-out"><span>24hr Output</span><span>×${lvNum(output)} ${escapeHtml(unitName)}</span></div><div class="bg-mini bg-lsim-exp">+${fmtInt(c.xpDay)} EXP → Level ${fmtInt(lvl)}</div><div class="bg-sim-stat bg-sim-strong bg-lsim-cost"><span>Total cost</span><span>${flowerCost(c.costDay)}</span></div></div>`;
}

function levelSimInner(key, sel) {
  const a = bgSimCtx;
  if (!a) return "";
  const st = a.st;
  const fish = st.strategy === "fish";
  const ranks = Object.assign({}, st.useSynced ? st.ranks : {});
  (sel.off || []).forEach(id => {
    delete ranks[id];
  });
  sel.skills.forEach(t => {
    ranks[t[0]] = Math.max(ranks[t[0]] || 0, t[1]);
  });
  const fx = boostFx(sel.boosts);
  const scored = scoreAll(a.raw, st, ranks, st.level, fx);
  const pool = availableAt(fish ? scored.fish : scored.cook, a.ownedPlus, st.level, false, true);
  const picks = levelTopPicks(pool, ranks, st.strategy);
  const topFish = fish && pool.length ? pool.reduce((m, c) => c.xpDay > m.xpDay ? c : m, pool[0]) : null;
  const noun = fish ? "aged fish" : "foods";
  const how = fish ? "catch and age only that one fish" : "cook only that one food";
  const intro = `This simulation shows the top ${BG_SIM_TOP} ${noun} for ${escapeHtml(BG_STRATS[st.strategy].label)} if you ${how} for the full 24 hours with the skills and boosts you saved. Chance based skills such as Fiery Jackpot are averaged, so each number is what you get on average over many cooks.`;
  let body;
  if (!picks.length) body = `<div class="fd-empty-note">${fish ? `No aged fish is available yet. Fishing needs Level ${BG_FISH_LEVEL} and the Aging Shed.` : "No food found yet. Market prices may still be loading."}</div>`; else {
    const more = picks.length < BG_SIM_TOP ? `<div class="bg-mini">Only ${fmtInt(picks.length)} ${noun} can be made at Level ${fmtInt(st.level)} with your buildings.</div>` : "";
    body = `<div class="bg-lsim-grid">${picks.map((c, i) => levelSimCard(c, st, i === 0, c === topFish)).join("")}</div>${more}`;
  }
  const oilList = BG_OIL_BUILDINGS.filter(b => !fx.oilOff.has("all") && !fx.oilOff.has(b));
  const oilText = st.oil && !fish ? ` Oil: ${oilList.length ? oilList.map(escapeHtml).join(", ") : "off"}.` : "";
  return levelSimBox(key, body, `Simulated at Level ${fmtInt(st.level)}.${oilText}`, intro);
}

function stratHtml(a) {
  const st = a.st;
  const key = levelSimKey(st);
  const missing = levelRegister(a, key);
  bgSimCtx = a;
  const tabs = [ [ "skills", "Skills" ], [ "boost", "Boost" ] ].map(t => `<button type="button" data-bg-stab="${t[0]}" class="fd-lb-tab${bgStratTab === t[0] ? " active" : ""}">${t[1]}</button>`).join("");
  const match = buildMatches(st);
  const best = Object.keys(match).sort((x, y) => match[y].have - match[x].have)[0];
  const detected = match[best].have > 0 ? `<div class="bg-mini">Your farm already has ${match[best].have} of ${match[best].total} ${escapeHtml(BG_STRATS[best].label)} skills.${best !== st.strategy ? " The guide still follows the build you selected first." : ""} Skills you own are marked Owned below.</div>` : "";
  return `<div class="fd-container is-own bg-strat"><div class="fd-container-head"><span class="fd-container-title">${escapeHtml(BG_STRATS[st.strategy].label)}</span>${simButtons(key)}</div>${simUnsavedNote(key)}<div class="bg-mini bg-strat-desc">${escapeHtml(BG_STRATS[st.strategy].desc)}</div>${detected}${stratSuggestHtml(a)}<div class="bg-switcher bg-modes">${tabs}</div><div class="bg-pane">${bgStratTab === "boost" ? stratBoostBody(a, key) : stratSkillsBody(a, key, missing)}</div></div>${simResultHtml(key)}`;
}

function shardLine(st) {
  const sh = st.shards;
  if (!sh.crystals) return `The ${escapeHtml(islandById(st.land).label)} island has no Ascension Crystal rocks, so no skill rank-ups yet. Upgrade to the Petal island to get your first crystal.`;
  return `<strong>${fmtInt(sh.crystals)}</strong> crystal rock${sh.crystals > 1 ? "s" : ""} on the ${escapeHtml(islandById(st.land).label)} island = <strong>${fmtInt(sh.total)} shards</strong> (${fmtInt(sh.left)} left to spend). Rank-ups cost shards, so only the best skills get upgraded.`;
}

function skillTagText(s) {
  return s.rank > 1 ? `Rank ${s.rank}` : "";
}

function skillCostText(s) {
  return `${s.points}pt${s.shards ? ` · ${s.shards} shard${s.shards > 1 ? "s" : ""}` : ""}`;
}

function cardsHtml(a) {
  const st = a.st;
  const plan = a.plan;
  const out = [];
  const buildRows = [];
  a.builds.forEach(b => {
    const ready = st.level >= b.unlock;
    buildRows.push(row(`<span class="fd-item-main">${getIcon(b.building)} <strong>${escapeHtml(b.building)}</strong></span><span class="fd-item-cost">${ready ? "Build now" : `Level ${b.unlock}`}</span>`) + `<div class="bgx-costs">${buildMaterialsHtml(b.building)}</div>`);
  });
  const owned = [ "Kitchen", "Deli", "Bakery", "Smoothie Shack", "Aging Shed" ].filter(b => st.owned.has(b) && b !== "Fire Pit");
  const skip = [ "Bakery", "Smoothie Shack", "Hen House", "Barn" ].filter(b => !st.owned.has(b) && !a.builds.some(x => x.building === b));
  let buildBody = buildRows.join("");
  if (!buildRows.length) buildBody = `<div class="fd-empty-note">No extra building is needed for EXP right now.</div>`;
  if (owned.length) buildBody += `<div class="bg-mini">Already built: ${owned.map(b => `${getIcon(b)} ${escapeHtml(b)}`).join(", ")}</div>`;
  if (skip.length) buildBody += `<div class="bg-mini">Not worth it for EXP: ${skip.map(b => escapeHtml(b)).join(", ")}</div>`;
  out.push(card("Build First", getIcon("Workbench"), buildBody));
  const chosenSkills = a.skills.filter(s => !s.extra);
  const skillRows = (chosenSkills.length ? chosenSkills : a.skills).slice(0, 5).map(s => row(`<span class="fd-item-main">${getBoostIcon(s.name)} <strong>${escapeHtml(s.name)}</strong>${s.rank > 1 ? ` <span class="bg-label">${skillTagText(s)}</span>` : ""}${s.filler ? ` <span class="bg-label">needed to unlock</span>` : ""}</span><span class="fd-item-cost">${skillCostText(s)} · Lv ${s.needLevel}</span>`));
  out.push(card(`Must Have Skills · ${BG_STRATS[st.strategy].label}`, "🎓", (skillRows.join("") || `<div class="fd-empty-note">You already have the key skills.</div>`) + `<div class="bg-mini">${shardLine(st)}</div>`));
  const boostRows = [];
  if (!st.vip && st.mode === "invested") boostRows.push(row(`<span class="fd-item-main"><strong>VIP</strong></span><span class="fd-item-cost">+10% EXP · +${fmtInt(plan.xpDay * .1)}/day</span>`));
  a.boosts.slice(0, 5).forEach(b => boostRows.push(row(`<span class="fd-item-main">${getIcon(b.name)} <strong>${escapeHtml(b.name)}</strong></span><span class="fd-item-cost">+${fmtInt(b.gain)}/day</span>`)));
  out.push(card("VIP & Boosts", "⚡", boostRows.join("") + `<button type="button" class="fd-lb-btn bg-link" data-bg-action="boost">Open Boost panel</button>`));
  const land = a.land;
  let landBody;
  if (land.atGoal) landBody = `<div class="fd-empty-note">Volcano island reached.</div>`; else if (land.next) {
    const n = land.next;
    const total = totalCoinsOf(n.resources, n.coins);
    landBody = row(`<span class="fd-item-main"><strong>${escapeHtml(land.island.label)} #${fmtInt(n.number)}</strong></span><span class="fd-item-cost">Level ${n.bumpkinLevel.level}</span>`) + `<div class="bgx-costs">${resourcesHtml(n.resources, n.coins)}</div>` + `<div class="bg-mini">Build time ${formatDuration(n.seconds)}${total > 0 ? ` · materials ≈ ${flowerCost(total)}` : ""}</div>`;
  } else if (land.upgrade) {
    landBody = row(`<span class="fd-item-main"><strong>Upgrade to ${escapeHtml(land.upgrade.target.label)}</strong></span>`) + `<div class="bgx-costs">${resourcesHtml(land.upgrade.cost.resources, land.upgrade.cost.coins)}</div>`;
  } else landBody = `<div class="fd-empty-note">No expansion data for this land.</div>`;
  out.push(card("Next Expansion", getIcon("Basic Land"), landBody));
  const journey = land.atGoal ? `<div class="fd-empty-note">Land goal complete.</div>` : row(`<span class="fd-item-main">Expansions left</span><span class="fd-item-cost"><strong>${fmtInt(land.remaining)}</strong></span>`) + row(`<span class="fd-item-main">Island upgrades left</span><span class="fd-item-cost"><strong>${fmtInt(land.upgrades)}</strong></span>`) + `<div class="bg-mini">Desert expansion #25 needs Level 75, then 200 Oil upgrades you to Volcano.</div>`;
  out.push(card("Land Journey", getIcon("Gold Pickaxe"), journey));
  const sim = a.sim;
  const segRows = sim.segments.slice(0, 8).map(seg => {
    const names = [ seg.plan.cook ? seg.plan.cook.name : null, seg.plan.fish ? `${seg.plan.fish.stage === "aged" ? "Aged " : ""}${seg.plan.fish.name}` : null ].filter(Boolean).join(" + ");
    return row(`<span class="fd-item-main">Lv ${fmtInt(seg.fromLevel)}${seg.toLevel !== seg.fromLevel ? `–${fmtInt(seg.toLevel)}` : ""}</span><span class="fd-item-cost">${escapeHtml(names)} · ${fmtInt(seg.days)}d</span>`);
  }).join("");
  const summary = sim.reached ? `<div class="bg-mini">About <strong>${fmtInt(sim.days)} days</strong> to Level ${BG_GOAL_LEVEL} · ≈ ${flowerCost(sim.totalCost)} total food cost</div>` : sim.days ? `<div class="bg-mini">Level ${BG_GOAL_LEVEL} is not reached within ${fmtInt(sim.days)} days at this pace.</div>` : "";
  out.push(card("Roadmap to Level 100", getIcon("Workbench"), (segRows || `<div class="fd-empty-note">No plan available yet.</div>`) + summary));
  return out.join("");
}

function tabsBody(a) {
  const st = a.st;
  if (bgTab === "skills") {
    const rows = a.skills.map(s => {
      const lock = st.level < s.needLevel;
      return row(`<span class="fd-item-main">${getBoostIcon(s.name)} <strong>${escapeHtml(s.name)}</strong> <span class="bg-label">T${s.tier}</span>${s.rank > 1 ? ` <span class="bg-label">${skillTagText(s)}</span>` : ""}${s.filler ? ` <span class="bg-label">unlock step</span>` : ""}<span class="bg-why">${escapeHtml(s.why)}</span></span><span class="fd-item-cost bg-right">${s.points} point${s.points > 1 ? "s" : ""}${s.shards ? `<br>${s.shards} shard${s.shards > 1 ? "s" : ""}` : ""}<br>${lock ? `Level ${s.needLevel}` : "Available"}${s.gain > 0 ? `<br><strong>+${fmtInt(s.gain)} EXP/day</strong>` : ""}</span>`);
    }).join("");
    const have = SKILL_BOOSTS.filter(s => st.skills.has(s.id) && BG_SKILL_WHY[s.id]).map(s => `${getBoostIcon(s.name)} ${escapeHtml(s.name)}`).join(", ");
    return `${rows || `<div class="fd-empty-note">You already own every skill that helps this plan.</div>`}${have ? `<div class="bg-mini">Already learned: ${have}</div>` : ""}<div class="bg-mini">${shardLine(st)}</div><div class="bg-mini">Skill points: you earn 1 per level. Tier 2 needs 2 points and tier 3 needs 5 points already spent in the same tree. A rank-up costs 1/3/6 points and 1/2/3 shards for a tier 1/2/3 skill.</div><button type="button" class="fd-lb-btn bg-link" data-bg-action="skills">Open Skill Tree</button>`;
  }
  if (bgTab === "boost") {
    let rows = "";
    if (st.mode === "free") rows += `<div class="bg-mini">Free to Play mode: VIP is not counted. Switch to Invested to see VIP.</div>`; else if (!st.vip) rows += row(`<span class="fd-item-main"><strong>VIP Access</strong><span class="bg-why">+10% EXP on all food and fish, and +600 reputation points (instant Cropkeeper trading). Always worth it for leveling.</span></span><span class="fd-item-cost bg-right"><strong>+${fmtInt(a.plan.xpDay * .1)} EXP/day</strong></span>`); else rows += row(`<span class="fd-item-main"><strong>VIP Access</strong><span class="bg-why">Active. +10% EXP is already counted.</span></span><span class="fd-item-cost bg-right">✔</span>`);
    let lastGroup = "";
    a.boosts.forEach(b => {
      if (b.group !== lastGroup) {
        rows += `<div class="fd-section-label">${escapeHtml(b.group)}</div>`;
        lastGroup = b.group;
      }
      rows += row(`<span class="fd-item-main">${getIcon(b.name)} <strong>${escapeHtml(b.name)}</strong><span class="bg-why">${escapeHtml(b.note)}</span><span class="bg-why">${boostCostText(b)}</span></span><span class="fd-item-cost bg-right"><strong>+${fmtInt(b.gain)} EXP/day</strong></span>`);
    });
    return `${rows}<button type="button" class="fd-lb-btn bg-link" data-bg-action="boost">Open Boost panel</button>`;
  }
  const rankCook = availableAt(a.cands.cook, a.ownedPlus, st.level, false, true).slice().sort((x, y) => y.xpDay - x.xpDay).slice(0, 12);
  const useful = rankCook.slice().sort((x, y) => x.costPerXp - y.costPerXp).slice(0, 5);
  const topCook = rankCook.slice(0, 3);
  const cookSet = new Map;
  topCook.concat(useful).forEach(c => cookSet.set(c.name, c));
  if (a.plan.cook) cookSet.set(a.plan.cook.name, a.plan.cook);
  const cookRows = [ ...cookSet.values() ].sort((x, y) => y.xpDay - x.xpDay).map(c => optionRow(c, st, a));
  let buyRows = [];
  if (st.mode === "free") {
    buyRows = availableAt(a.cands.cook, a.ownedPlus, st.level, false, false).filter(c => !c.planOk).sort((x, y) => y.xpDay - x.xpDay).slice(0, 3).map(c => optionRow(c, st, a));
  }
  const picks = fishPicks(a, true);
  const fishRows = picks ? picks.map(x => optionRow(x.c, st, a, x.labels)) : [];
  const slotNote = picks ? `<div class="bg-mini">In season now: ${escapeHtml(String(currentSeason))}. Aging Shed slots: ${st.agingSlots}. ${a.plan.fish ? "" : "Food is still cheaper per EXP for your plan, but these are the best aged fish if you want to fish."}</div>` : "";
  const fishNote = st.level < BG_FISH_LEVEL ? `<div class="bg-mini">Fishing unlocks at Level ${BG_FISH_LEVEL}.</div>` : !picks ? `<div class="bg-mini">No aged fish is available yet. It needs the Aging Shed.</div>` : slotNote;
  const foodHtml = `<div class="fd-section-label">Food</div>${cookRows.join("") || `<div class="fd-empty-note">No food found. Market prices may still be loading.</div>`}${buyRows.length ? `<div class="fd-section-label">Your farm cannot make these yet, buy the ingredients</div>${buyRows.join("")}` : ""}`;
  const fishHtml = fishRows.length || fishNote ? `<div class="fd-section-label">Best aged fish this season (needs the Aging Shed)</div>${fishRows.join("")}${fishNote}` : "";
  return `${st.strategy === "fish" ? fishHtml + foodHtml : foodHtml + fishHtml}<button type="button" class="fd-lb-btn bg-link" data-bg-action="cooking">Open Cooking panel</button>`;
}

function ingredientIcon(name) {
  return cookingFindRecipeForFood(name) ? cookFoodIcon(name) : getIcon(name);
}

function methodPill(p) {
  return `<span class="bg-pill ${p.method === "collect" ? "bg-pill-self" : "bg-pill-buy"}">${p.method === "collect" ? "Self Produce it" : p.offSeason ? "Buy it (out of season)" : "Buy it"}</span>`;
}

function qtyText(v, whole) {
  return `×${whole ? Math.ceil(Number(v) - 1e-9) : +Number(v).toFixed(2)}`;
}

function rawChip(name, qty, p, whole) {
  return `${qtyText(qty, whole)} ${ingredientIcon(name)} ${escapeHtml(name)}${p ? " " + methodPill(p) : ""}`;
}

function ingredientChips(c, mult, whole) {
  const k = mult > 0 ? mult : 1;
  const rec = c.kind === "cook" && COOKING_RECIPES[c.building] ? COOKING_RECIPES[c.building][c.name] : null;
  const partOf = name => c.parts.find(x => x.name === name);
  if (!rec) {
    return c.parts.map(p => `<span class="bgx-cost">${qtyText(p.qty * k, whole)} ${ingredientIcon(p.name)} ${escapeHtml(p.name)} ${methodPill(p)}</span>`).join("");
  }
  return Object.keys(rec.ingredients).map(ing => {
    const qty = rec.ingredients[ing] * k;
    const b = foodBuilding(ing);
    if (!b) {
      const p = partOf(ing);
      if (!p) return "";
      return `<span class="bgx-cost">${qtyText(qty, whole)} ${ingredientIcon(ing)} ${escapeHtml(ing)} ${methodPill(p)}</span>`;
    }
    const raws = rawNeeds(COOKING_RECIPES[b][ing], qty, {});
    const names = Object.keys(raws).filter(n => partOf(n));
    if (!names.length) return "";
    const first = partOf(names[0]);
    const same = names.every(n => partOf(n).method === first.method && !!partOf(n).offSeason === !!first.offSeason);
    const inner = names.map(n => same ? `${qtyText(raws[n], whole)} ${ingredientIcon(n)} ${escapeHtml(n)}` : rawChip(n, raws[n], partOf(n), whole)).join(", ");
    return `<span class="bgx-cost">${qtyText(qty, whole)} ${ingredientIcon(ing)} ${escapeHtml(ing)} (${inner})${same ? " " + methodPill(first) : ""}</span>`;
  }).join("");
}

function fishPicks(a, more, cands) {
  const st = a.st;
  const use = cands || a.cands;
  if (st.level < BG_FISH_LEVEL) return null;
  const list = availableAt(use.fish, a.ownedPlus, st.level, false, true);
  if (!list.length) return null;
  const best = pickBest(list, use.ranks);
  const topXp = list.slice().sort((x, y) => y.xpDay - x.xpDay || x.costPerXp - y.costPerXp)[0];
  const cheap = list.slice().sort((x, y) => x.costPerXp - y.costPerXp || y.xpDay - x.xpDay)[0];
  const picks = [];
  [ [ best, "best value" ], [ topXp, "most EXP in 24h" ], [ cheap, "cheapest per EXP" ] ].forEach(pair => {
    const found = picks.find(x => x.c === pair[0]);
    if (found) found.labels.push(pair[1]); else picks.push({
      c: pair[0],
      labels: [ pair[1] ]
    });
  });
  if (more) {
    const taken = new Set(picks.map(x => x.c));
    const extra = [];
    let lowest = Infinity;
    list.slice().sort((x, y) => y.xpDay - x.xpDay || x.costPerXp - y.costPerXp).forEach(c => {
      if (c.costPerXp < lowest) {
        lowest = c.costPerXp;
        if (!taken.has(c)) extra.push(c);
      }
    });
    const rest = list.filter(c => !taken.has(c) && extra.indexOf(c) < 0).sort((x, y) => x.costPerXp - y.costPerXp || y.xpDay - x.xpDay);
    extra.concat(rest).slice(0, 5).sort((x, y) => y.xpDay - x.xpDay).forEach(c => picks.push({
      c: c,
      labels: []
    }));
  }
  return picks;
}

function optionRow(c, st, a, labels, planUse) {
  const pl = planUse || a.plan;
  const missing = [];
  c.chain.forEach(b => {
    if (!st.owned.has(b)) missing.push(b);
  });
  const tag = missing.length ? missing.map(b => st.level >= BG_BUILD_LEVEL[b] ? `<span class="bg-label">build ${escapeHtml(b)}</span>` : `<span class="bg-label">${escapeHtml(b)} Lv ${BG_BUILD_LEVEL[b]}</span>`).join(" ") : "";
  const best = labels ? labels.map(l => `<span class="bg-label bg-best">${escapeHtml(l)}</span>`).join(" ") : pl.cook === c || pl.fish === c ? `<span class="bg-label bg-best">best pick</span>` : "";
  const lvl = levelAfter(st, c.xpDay);
  const per = c.kind === "fish" ? `${fmtInt(c.per24)} fish / 24h · ages in ${formatDuration(c.agingTime)}` : c.per24 >= 2 ? `${fmtInt(Math.floor(c.per24))}× / 24h · ${formatDuration(c.time)} each` : `1 every ${formatDuration(c.time)}`;
  const prime = c.kind === "fish" && c.primeXp ? ` · prime aged ${fmtInt(c.primeXp)} EXP` : "";
  const ing = c.parts && c.parts.length ? `<div class="fd-section-label">Ingredients for 24h</div><div class="bgx-costs">${ingredientChips(c, c.kind === "cook" ? dayMult(c) : 1, true)}</div>` : "";
  return row(`<span class="fd-item-main">${itemIcon(c)} <strong>${escapeHtml(itemLabel(c))}</strong> ${best} ${tag}<span class="bg-why">${fmtInt(c.xp)} EXP each · ${flowerCost(c.cost)} each · ${per}${prime}</span><span class="bg-why">24h: <strong class="bg-hl">+${fmtInt(c.xpDay)} EXP</strong> → <strong class="bg-hl">Level ${fmtInt(lvl)}</strong> · cost ${flowerCost(c.costDay)}</span>${ing}</span>`);
}

function statsHtml(a) {
  const st = a.st;
  const goalXp = levelXp(BG_GOAL_LEVEL);
  const left = Math.max(0, goalXp - st.exp);
  const land = a.land;
  return `<div class="fd-container bg-goal-stats fdm-gap"><div class="fd-stat"><span class="fd-stat-label">EXP to Level ${BG_GOAL_LEVEL}</span><span class="fd-stat-value">${fmtInt(left)}</span></div><div class="fd-stat"><span class="fd-stat-label">Expansions to Volcano #5</span><span class="fd-stat-value">${land.atGoal ? "Done" : fmtInt(land.remaining) + " + " + land.upgrades + " upgrades"}</span></div></div>`;
}

function dynamicHtml(a) {
  const tabs = [ [ "skills", "Skills" ], [ "boost", "Boost" ], [ "cook", "Must cook for EXP" ] ];
  const tabsHtml = tabs.map(t => `<button type="button" data-bg-tab="${t[0]}" class="fd-lb-tab${bgTab === t[0] ? " active" : ""}">${t[1]}</button>`).join("");
  return `${statsHtml(a)}<div class="bg-grid">
    <div class="fd-container bg-main">
      <div class="fd-container-head"><span class="fd-container-title">What to do</span></div>
      <div class="bg-split">${instructionHtml(a)}<div class="bg-cards">${cardsHtml(a)}</div></div>
    </div>
    <div class="fd-container bg-suggest">
      <div class="fd-container-head"><span class="fd-container-title">Suggested</span></div>
      <div class="bg-switcher">${tabsHtml}</div>
      <div class="bg-pane" id="bgTabBody">${tabsBody(a)}</div>
    </div>
  </div>`;
}

function syncNoteHtml(st) {
  return st.synced ? st.manual ? `<button type="button" class="fd-lb-btn bg-resync" data-bg-action="resync">Use synced farm values</button>` : `<span class="bg-sync-ok">Synced from ${escapeHtml(st.name)}</span>` : `<span class="bg-sync-ok">Not synced — enter your values</span>`;
}

function modeHintHtml(st) {
  const m = st.mode === "free" ? "Free to Play: no VIP and no Gem restocks. Ingredients depend on what your farm can grow." : "Invested: VIP and Gem restocks are allowed.";
  const f = st.strategy === "rush" ? "Rush Level guide: skills and boosts are picked for the most output in 24 hours within your shard budget." : st.strategy === "fish" ? "Fish Strat guide: skills and boosts are picked for aged fish at the cheapest catch cost." : "Mid Cost Level guide: skills and boosts are picked for a mid cost and a little faster leveling.";
  return `${m} ${f}`;
}

function repHtml(st) {
  const r = st.rep;
  const nextTxt = r.next ? ` · next: ${escapeHtml(r.next[1])} at ${fmtInt(r.next[0])} pts` : "";
  return `<div class="fd-stat"><span class="fd-stat-label">Reputation</span><span class="fd-stat-value">${escapeHtml(r.name)} · ${fmtInt(r.points)} pts</span></div><div class="fd-stat"><span class="fd-stat-label">Trading</span><span class="fd-stat-value">${escapeHtml(r.listings)}</span></div><div class="bg-mini">${r.canBuy ? "Cropkeeper or higher: you can buy ingredients from the market, so the guide uses market prices." : `${r.points >= 250 ? "You can list a few items per day and buy collectibles and wearables, but buying ingredients (resources) needs offers, which need Cropkeeper (600 pts or VIP). " : "Buying ingredients needs Cropkeeper (600 pts or VIP). "}Until then the guide uses crops you grow yourself${st.mode === "free" ? " from the free daily shipment seeds" : ""}.`}${nextTxt}</div>`;
}

function shellHtml(st) {
  const lands = BG_ISLANDS.map(i => `<button type="button" data-bg-land="${i.id}" class="fd-lb-tab${st.land === i.id ? " active" : ""}">${i.label}</button>`).join("");
  const syncNote = syncNoteHtml(st);
  const modes = [ [ "free", "Free to Play" ], [ "invested", "Invested" ] ].map(m => `<button type="button" data-bg-mode="${m[0]}" class="fd-lb-tab${st.mode === m[0] ? " active" : ""}">${m[1]}</button>`).join("");
  const strategies = [ [ "fish", "Fish Strat" ], [ "rush", "Rush Level" ], [ "less", "Mid Cost Level" ] ].map(m => `<button type="button" data-bg-strategy="${m[0]}" class="fd-lb-tab${st.strategy === m[0] ? " active" : ""}">${m[1]}</button>`).join("");
  const guideTabsHtml = guideTabs().map(t => `<button type="button" data-bg-guide="${t[0]}" class="fd-lb-tab${bgState.guide === t[0] ? " active" : ""}">${t[1]}</button>`).join("");
  const topBox = `<div class="fd-container fdm-gap bg-guides">
      <div class="fd-container-head"><span class="fd-container-title">Full Beginner Guide</span></div>
      <div class="bg-mini bg-guides-desc">Select a tab below to open a step-by-step beginner guide for each part of your farm. Every guide reads your synced farm, so it only recommends what is profitable for you and hides the skills and boosts you already own.</div>
      <div class="bg-switcher bg-guide-tabs" id="bgGuideTabs">${guideTabsHtml}</div>
    </div>`;
  if (bgState.guide !== "leveling") return `${topBox}<div id="bgGuideBody" class="bg-guide-body"></div>`;
  return `${topBox}
    <div class="fd-container fdm-gap bg-intro">
      <div class="fd-container-head section-collapse-header" id="bgOverviewHead"><span class="fd-container-title">About this guide</span><span class="collapse-arrow${bgOverviewOpen ? "" : " is-collapsed"}" id="bgOverviewArrow">${bgOverviewOpen ? "▾" : "▸"}</span></div>
      <div class="bg-overview" id="bgOverviewBody" style="display:${bgOverviewOpen ? "block" : "none"};">
        <p>This guide takes a new farmer from <strong>Level 0 to Level 100</strong> and from the <strong>Basic island to the Volcano island</strong> in the fastest and cheapest way. It reads your synced farm (level, expansions, land, skills, buildings and VIP) and uses live market prices from this app, so every number matches the other panels.</p>
        <p><strong>Sunflower Land in short:</strong> you grow crops, chop trees, mine rocks and gather fruit, then spend them to craft tools, build buildings and expand your land. Eating food and fish gives Bumpkin EXP, and levels unlock buildings, skills and bigger expansions. Land grows from Basic to Petal, then Desert, then Volcano.</p>
        <p>Food and fish are the fastest EXP, so the guide always picks what gives the most EXP for the least money, and only tells you to build the buildings that really help.</p>
      </div>
    </div>
    <div class="bg-layout">
    <div class="fd-container fdm-gap bg-farm bg-area-farm">
      <div class="fd-container-head"><span class="fd-container-title">Your Farm</span></div>
      <div class="bg-setlabel">Farming Mode</div>
      <div class="bg-switcher bg-modes" id="bgModes">${modes}</div>
      <div class="bg-setlabel">Leveling Strategy</div>
      <div class="bg-switcher bg-strats" id="bgStrategies">${strategies}</div>
      <div id="bgStrat"></div>
      <div class="bg-mini" id="bgModeHint">${modeHintHtml(st)}</div>
      <div class="bg-inputs">
        <label class="bg-field"><span>Bumpkin Level</span><input type="number" min="0" max="150" inputmode="numeric" class="fdm-count-input" id="bgLevelInput" value="${st.level}"></label>
        <label class="bg-field"><span>Land Expansion</span><input type="number" min="0" max="30" inputmode="numeric" class="fdm-count-input" id="bgExpansionInput" value="${st.expansion}"></label>
        <div class="bg-field bg-field-land"><span>Land</span><div class="bg-lands">${lands}</div></div>
      </div>
      <div class="bg-sync-line" id="bgSyncLine">${syncNote}</div>
      <div class="bg-rep" id="bgRep">${repHtml(st)}</div>
    </div>
    <div id="bgFaction" class="bg-area-faction"></div>
    <div class="fd-title bg-goal bg-area-goal">Goal is to reach Bumpkin Level 100 and Volcano Expansion #5</div>
    <div id="bgDynamic" class="bg-area-dyn"></div>
    </div>
  `;
}

function body_strategy_sync(st) {
  document.querySelectorAll("#bgStrategies [data-bg-strategy]").forEach(b => b.classList.toggle("active", b.dataset.bgStrategy === st.strategy));
}

function factionHtml(st) {
  const g = st.synced ? st.synced.g : null;
  const head = `<div class="fd-container-head"><span class="fd-container-title">Faction Pet</span></div>`;
  if (!g) return `<div class="fd-container fdm-gap bg-faction">${head}<div class="bg-mini">Sync your farm to see your faction and its pet.</div></div>`;
  const faction = farmSyncGetFaction(g);
  if (!faction) return `<div class="fd-container fdm-gap bg-faction">${head}<div class="bg-mini">You have not joined a faction yet. Join one of the four factions (Bumpkins, Goblins, Sunflorians or Nightshades) and help its pet to earn extra Bumpkin EXP.</div></div>`;
  const info = farmSyncGetFactionPetInfo(g);
  const name = FACTION_DISPLAY_NAMES[faction.name] || faction.name;
  const icon = FACTION_PET_HAPPY_ICONS[faction.name] ? `<img class="bg-title-icon" src="${FACTION_PET_HAPPY_ICONS[faction.name]}" alt="">` : "";
  const pct = info.goalXP > 0 ? Math.min(100, Math.floor(info.totalXP / info.goalXP * 100)) : 0;
  const tier = factionPetGetActiveTier(info.lastWeekStreak);
  const nextTier = FACTION_PET_BOOST_TIERS.find(t => t.streak > info.streak);
  const pet = farmSyncAsObj(faction.pet);
  const reqs = pet && Array.isArray(pet.requests) ? pet.requests : [];
  const rows = reqs.map(r => {
    const daily = farmSyncAsObj(r && r.dailyFulfilled);
    const done = daily ? Object.values(daily).reduce((t, v) => t + (Number(v) || 0), 0) : 0;
    const qty = Number(r.quantity) || 0;
    return row(`<span class="fd-item-main">${cookingFindRecipeForFood(r.food) ? cookFoodIcon(r.food) : getIcon(r.food)} <strong>${escapeHtml(String(r.food))}</strong></span><span class="fd-item-cost bg-right">${fmtInt(done)} / ${fmtInt(qty)}</span>`);
  }).join("");
  const status = info.isContributingMember ? `<div class="bg-mini"><strong>You are a contributing member.</strong> Keep delivering the pet requests every week to keep your streak.</div>` : `<div class="bg-mini"><strong>You are not contributing yet.</strong> Deliver the pet requests below this week. If the pet's weekly goal is reached, you get the bonus EXP next week.</div>`;
  const bonus = `<div class="fd-stat"><span class="fd-stat-label">Bonus EXP now</span><span class="fd-stat-value">${info.qualifiesForBoost && tier ? `+${fmtInt(tier.boost * 100)}%` : "None"}</span></div><div class="fd-stat"><span class="fd-stat-label">Streak</span><span class="fd-stat-value">${fmtInt(info.streak)} week${info.streak === 1 ? "" : "s"}</span></div>`;
  const nextLine = nextTier ? `<div class="bg-mini">Reach a ${fmtInt(nextTier.streak)} week streak for +${fmtInt(nextTier.boost * 100)}% EXP (${escapeHtml(nextTier.weeksNote)}).</div>` : `<div class="bg-mini">You are at the highest streak bonus.</div>`;
  return `<div class="fd-container fdm-gap bg-faction">${head}<div class="bg-hello">${icon} ${escapeHtml(name)} pet${info.sleeping ? " (sleeping)" : ""}</div>${info.hasPetData ? `<div class="bg-mini">Weekly goal: ${fmtInt(info.totalXP)} / ${fmtInt(info.goalXP)} XP (${pct}%)${info.goalReached ? " · goal reached" : ""}</div><div class="bg-bar"><span style="width:${pct}%"></span></div>` : ""}${bonus}${nextLine}${status}${rows ? `<div class="fd-section-label">Pet requests</div>${rows}` : ""}</div>`;
}

function refreshGuide() {
  inGuideScope(refreshGuideInner);
}

function refreshGuideInner() {
  const box = $("bgGuideBody");
  if (!box) return;
  const st = resolveState();
  const synced = !!st.synced;
  setSkillLevelLookup(synced ? skillLevelLookupFor(st, fullSkillPlan(st)) : null);
  box.innerHTML = guideBodyHtml(bgState.guide, {
    synced: synced,
    level: synced ? st.synced.level : st.level,
    seedLevel: name => BG_SEED_LEVEL[`${name} Seed`] || 0,
    free: st.mode === "free",
    freeSeeds: name => BG_SHIPMENT[`${name} Seed`] || 0,
    seedAvailable: name => st.mode !== "free" || (BG_SHIPMENT[`${name} Seed`] || 0) > 0
  });
}

function refreshStrat() {
  inGuideScope(refreshStratInner);
}

function refreshStratInner() {
  const box = $("bgStrat");
  if (!box) return;
  box.innerHTML = stratHtml(computeAll(true));
}

function refreshSim() {
  if (bgState.guide === "leveling") refreshStrat(); else refreshGuide();
}

function refreshDynamic(reuse) {
  inGuideScope(() => refreshDynamicInner(reuse));
}

function refreshDynamicInner(reuse) {
  if (bgState.guide !== "leveling") {
    refreshGuide();
    return;
  }
  const box = $("bgDynamic");
  if (!box) return;
  const a = computeAll(reuse);
  box.innerHTML = dynamicHtml(a);
  const sync = $("bgSyncLine");
  if (sync) {
    const st = a.st;
    sync.innerHTML = syncNoteHtml(st);
  }
  const repBox = $("bgRep");
  if (repBox) repBox.innerHTML = repHtml(a.st);
  const stratBox = $("bgStrat");
  if (stratBox) stratBox.innerHTML = stratHtml(a);
  const facBox = $("bgFaction");
  if (facBox) facBox.innerHTML = factionHtml(a.st);
  body_strategy_sync(a.st);
  const hint = $("bgModeHint");
  if (hint) hint.innerHTML = modeHintHtml(a.st);
}

function setManual() {
  bgState.manual = true;
  saveState();
}

function bindBody(body) {
  body.onchange = e => {
    handleGuideChange(e);
  };
  body.onclick = e => {
    if (handleGuideClick(e, refreshSim)) return;
    const oilHead = e.target.closest("[data-bg-oil]");
    if (oilHead) {
      bgOilOpen = !bgOilOpen;
      oilHead.classList.toggle("is-open", bgOilOpen);
      const ob = oilHead.nextElementSibling;
      if (ob) ob.hidden = !bgOilOpen;
      return;
    }
    const petHead = e.target.closest("[data-bg-petbox]");
    if (petHead) {
      bgPetOpen = !bgPetOpen;
      petHead.classList.toggle("is-open", bgPetOpen);
      const pb = petHead.nextElementSibling;
      if (pb) pb.hidden = !bgPetOpen;
      return;
    }
    const head = e.target.closest("#bgOverviewHead");
    if (head) {
      bgOverviewOpen = !bgOverviewOpen;
      const b = $("bgOverviewBody");
      const arrow = $("bgOverviewArrow");
      if (b) b.style.display = bgOverviewOpen ? "block" : "none";
      if (arrow) {
        arrow.classList.toggle("is-collapsed", !bgOverviewOpen);
        arrow.textContent = bgOverviewOpen ? "▾" : "▸";
      }
      return;
    }
    const guideBtn = e.target.closest("[data-bg-guide]");
    if (guideBtn) {
      bgState.guide = guideBtn.dataset.bgGuide;
      saveState();
      renderBeginnerPanel();
      return;
    }
    const fstrat = e.target.closest("[data-bg-fstrat]");
    if (fstrat) {
      bgState.farmStrat = fstrat.dataset.bgFstrat;
      setFarmStrat(bgState.farmStrat);
      saveState();
      bgDefer("bgGuideBody", refreshGuide);
      return;
    }
    const fstab = e.target.closest("[data-bg-fstab]");
    if (fstab) {
      setFarmStratTab(fstab.dataset.bgFstab);
      bgDefer("bgGuideBody", refreshGuide);
      return;
    }
    const ctab = e.target.closest("[data-bg-ctab]");
    if (ctab) {
      const parts = ctab.dataset.bgCtab.split("|");
      setCatTab(parts[0], parts[1]);
      bgDefer("bgGuideBody", refreshGuide);
      return;
    }
    const stratBtn = e.target.closest("[data-bg-strategy]");
    if (stratBtn) {
      const v = stratBtn.dataset.bgStrategy;
      bgState.strategy = [ "less", "rush", "fish" ].indexOf(v) >= 0 ? v : "less";
      saveState();
      body.querySelectorAll("[data-bg-strategy]").forEach(b => b.classList.toggle("active", b === stratBtn));
      bgDefer("bgDynamic", () => refreshDynamic());
      return;
    }
    const modeBtn = e.target.closest("[data-bg-mode]");
    if (modeBtn) {
      bgState.mode = modeBtn.dataset.bgMode === "invested" ? "invested" : "free";
      saveState();
      body.querySelectorAll("[data-bg-mode]").forEach(b => b.classList.toggle("active", b === modeBtn));
      bgDefer("bgDynamic", () => refreshDynamic());
      return;
    }
    const stab = e.target.closest("[data-bg-stab]");
    if (stab) {
      bgStratTab = stab.dataset.bgStab === "boost" ? "boost" : "skills";
      refreshDynamic(true);
      return;
    }
    const tab = e.target.closest("[data-bg-tab]");
    if (tab) {
      bgTab = tab.dataset.bgTab;
      refreshDynamic(true);
      return;
    }
    const land = e.target.closest("[data-bg-land]");
    if (land) {
      bgState.land = land.dataset.bgLand;
      const isl = islandById(bgState.land);
      bgState.expansion = Math.max(isl.start, Math.min(isl.max, Number(bgState.expansion) || isl.start));
      setManual();
      body.querySelectorAll("[data-bg-land]").forEach(b => b.classList.toggle("active", b === land));
      const ex = $("bgExpansionInput");
      if (ex) ex.value = bgState.expansion;
      bgDefer("bgDynamic", () => refreshDynamic());
      return;
    }
    const act = e.target.closest("[data-bg-action]");
    if (!act) return;
    const kind = act.dataset.bgAction;
    if (kind === "resync") {
      bgState.manual = false;
      saveState();
      renderBeginnerPanel();
    } else if (kind === "boost") {
      toggleMainView("beginner");
      openBoostPanel();
    } else if (kind === "skills") {
      toggleMainView("beginner");
      openBoostPanel();
      setTimeout(() => setSkillTreeSectionOpen(true, {
        scrollIntoView: true
      }), 60);
    } else if (kind === "cooking") {
      toggleMainView("cooking");
    }
  };
  body.oninput = e => {
    if (handleGuideInput(e)) return;
    if (e.target.id === "bgLevelInput") {
      bgState.level = Math.max(0, Math.min(150, Math.floor(Number(e.target.value) || 0)));
      setManual();
      clearTimeout(bgInputTimer);
      bgInputTimer = setTimeout(() => bgDefer("bgDynamic", () => refreshDynamic()), 350);
    } else if (e.target.id === "bgExpansionInput") {
      bgState.expansion = Math.max(0, Math.min(30, Math.floor(Number(e.target.value) || 0)));
      setManual();
      clearTimeout(bgInputTimer);
      bgInputTimer = setTimeout(() => bgDefer("bgDynamic", () => refreshDynamic()), 350);
    }
  };
}

export function renderBeginnerPanel() {
  const body = $("beginnerBody");
  if (!body) return;
  setFarmStrat(bgState.farmStrat);
  setLevelSimRenderer(levelSimInner);
  const st = resolveState();
  body.innerHTML = shellHtml(st);
  bindBody(body);
  bgComputed = null;
  const holder = $("bgDynamic") || $("bgGuideBody");
  if (holder) holder.innerHTML = `<div class="fd-empty-note">Loading the guide...</div>`;
  bgDefer(holder ? holder.id : "", () => refreshDynamic());
}


export function syncBeginnerPanel() {
  bgState.manual = false;
  saveState();
  const panel = $("beginnerPanel");
  if (panel && panel.classList.contains("open")) renderBeginnerPanel();
}
