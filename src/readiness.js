import GROW_TIME_SEC from "./growtimes.json";

const TREE_KNOWN_IDS = { Tree: 618, "Ancient Tree": 2702, "Sacred Tree": 2703 };
const STONE_KNOWN_IDS = { "Stone Rock": 619, "Fused Stone Rock": 2700, "Reinforced Stone Rock": 2701 };
const IRON_KNOWN_IDS = { "Iron Rock": 620, "Refined Iron Rock": 2704, "Tempered Iron Rock": 2705 };
const GOLD_KNOWN_IDS = { "Gold Rock": 621, "Pure Gold Rock": 2706, "Prime Gold Rock": 2707 };

const ANIMAL_HOUSE_KEY = { chicken: "henHouse", sheep: "barn", cow: "barn" };
const ANIMAL_BASE_CYCLE_SEC = 86400;
const HIVE_FULL_RAW = 864e5;

const BAIT_RECIPE_NAME_MATCH = {
  "Capsule Bait": /capsule/i,
  "Umbrella Bait": /umbrella/i,
  "Crimson Baitfish": /crimson/i,
};

function growTimeSec(name) {
  return Object.prototype.hasOwnProperty.call(GROW_TIME_SEC, name) ? GROW_TIME_SEC[name] : null;
}

function field(g, key) {
  if (!g) return null;
  if (g[key] != null) return g[key];
  if (g.land && g.land[key] != null) return g.land[key];
  return null;
}

export function extractGameState(json) {
  if (!json || typeof json !== "object") return {};
  return (
    json.game ||
    json.farm ||
    json.gameState ||
    json.state ||
    (json.data && (json.data.game || json.data.farm)) ||
    json
  );
}

function nameForNode(node, knownIds, defaultName) {
  return node && typeof node.name === "string" && knownIds[node.name] ? node.name : defaultName;
}

function isNodeReadyNow(resourceName, node, subKey, now) {
  const job = node && node[subKey];
  const ts =
    (job && (job.minedAt || job.choppedAt || job.harvestedAt || job.stoneMinedAt || job.recoveredAt)) ||
    (node && (node.minedAt || node.choppedAt || node.harvestedAt));
  if (!ts) {
    const amountVal =
      job && typeof job.amount === "number" ? job.amount : node && typeof node.amount === "number" ? node.amount : null;
    return amountVal !== 0;
  }
  const growSec = growTimeSec(resourceName);
  const elapsedSec = (now - ts) / 1e3;
  const remainingSec = growSec != null ? Math.max(0, growSec - elapsedSec) : null;
  return remainingSec != null ? remainingSec <= 0 : false;
}

function planted(bag, subKey, category, now, out) {
  if (!bag || typeof bag !== "object") return;
  Object.entries(bag).forEach(([plotId, plot]) => {
    const job = plot && plot[subKey];
    const name = job && job.name;
    const plantedAt = job && job.plantedAt;
    if (!name || !plantedAt) return;
    const refTime = job.harvestedAt && job.harvestedAt > plantedAt ? job.harvestedAt : plantedAt;
    const growSec = growTimeSec(name);
    const elapsedSec = (now - refTime) / 1e3;
    const remainingSec = growSec != null ? Math.max(0, growSec - elapsedSec) : null;
    const ready = remainingSec != null ? remainingSec <= 0 : false;
    out.push({
      key: `${category}:${plotId}:${refTime}`,
      name,
      category,
      ready,
      remainingSec,
    });
  });
}

function resourceNodes(g, now, out) {
  [
    ["stones", "stone", "Stone"],
    ["iron", "stone", "Iron"],
    ["gold", "stone", "Gold"],
    ["crimstones", "stone", "Crimstone"],
    ["trees", "wood", "Wood"],
  ].forEach(([bagKey, subKey, resourceName]) => {
    const bag = field(g, bagKey);
    if (!bag || typeof bag !== "object") return;
    Object.entries(bag).forEach(([nodeId, node]) => {
      const job = node && node[subKey];
      const ts =
        (job && (job.minedAt || job.choppedAt || job.harvestedAt || job.stoneMinedAt || job.recoveredAt)) ||
        (node && (node.minedAt || node.choppedAt || node.harvestedAt));
      if (!ts) return;
      let displayName = resourceName;
      if (resourceName === "Wood") displayName = nameForNode(node, TREE_KNOWN_IDS, "Tree");
      else if (resourceName === "Stone") displayName = nameForNode(node, STONE_KNOWN_IDS, "Stone Rock");
      else if (resourceName === "Iron") displayName = nameForNode(node, IRON_KNOWN_IDS, "Iron Rock");
      else if (resourceName === "Gold") displayName = nameForNode(node, GOLD_KNOWN_IDS, "Gold Rock");
      const ready = isNodeReadyNow(resourceName, node, subKey, now);
      const growSec = growTimeSec(resourceName);
      const remainingSec = growSec != null ? Math.max(0, growSec - (now - ts) / 1e3) : null;
      out.push({
        key: `${bagKey}:${nodeId}:${ts}`,
        name: displayName,
        category: resourceName,
        ready,
        remainingSec,
      });
    });
  });
}

function beehives(g, now, out) {
  const hiveBag = field(g, "beehives");
  if (!hiveBag || typeof hiveBag !== "object") return;
  Object.entries(hiveBag).forEach(([hiveId, hive]) => {
    if (!hive || !hive.honey || typeof hive.honey.produced !== "number") return;
    const storedProduced = hive.honey.produced;
    const updatedAt = typeof hive.honey.updatedAt === "number" ? hive.honey.updatedAt : now;
    const flowers = Array.isArray(hive.flowers) ? hive.flowers : [];
    const flower = flowers.find((f) => f && typeof f.rate === "number" && f.rate > 0);
    let produced = storedProduced;
    let flowerStillActive = false;
    if (flower) {
      const attachedAt = typeof flower.attachedAt === "number" ? flower.attachedAt : updatedAt;
      const attachedUntil = typeof flower.attachedUntil === "number" ? flower.attachedUntil : now;
      const windowStart = Math.max(updatedAt, attachedAt);
      const windowEnd = Math.min(now, attachedUntil);
      if (windowEnd > windowStart) produced = storedProduced + flower.rate * (windowEnd - windowStart);
      flowerStillActive = attachedUntil > now;
    }
    const ready = produced >= HIVE_FULL_RAW;
    let remainingSec = 0;
    if (!ready) remainingSec = flowerStillActive ? Math.max(0, (HIVE_FULL_RAW - produced) / flower.rate / 1e3) : null;
    out.push({
      key: `beehive:${hiveId}`,
      name: "Honey",
      category: "Beehive",
      ready,
      remainingSec,
    });
  });
}

function animalHouseBag(g, type) {
  const houseKey = ANIMAL_HOUSE_KEY[type];
  const house = field(g, houseKey);
  if (!house || typeof house !== "object") return {};
  let bag = null;
  if (house.animals && typeof house.animals === "object" && !Array.isArray(house.animals)) {
    bag = house.animals;
  } else {
    const direct = house[type] || house[`${type}s`] || house.livestock;
    if (direct && typeof direct === "object" && !Array.isArray(direct)) bag = direct;
  }
  if (!bag || typeof bag !== "object") return {};
  if (houseKey === "henHouse") return bag;
  const wantType = type === "sheep" ? /sheep/i : /cow/i;
  const filtered = {};
  Object.entries(bag).forEach(([id, animal]) => {
    const t = animal && (animal.type || animal.animalType);
    if (typeof t === "string" && wantType.test(t)) filtered[id] = animal;
  });
  return filtered;
}

function animals(g, now, out) {
  ["chicken", "sheep", "cow"].forEach((type) => {
    const bag = animalHouseBag(g, type);
    Object.entries(bag).forEach(([animalId, animal]) => {
      if (!animal || typeof animal !== "object") return;
      const toTs = (v) => (typeof v === "number" ? v : typeof v === "string" && v.trim() && !isNaN(Number(v)) ? Number(v) : null);
      const awakeAt = toTs(animal.awakeAt);
      const asleepAt = toTs(animal.asleepAt ?? animal.sleepAt ?? animal.wentToSleepAt);
      const stateStr = typeof animal.state === "string" ? animal.state.toLowerCase() : "";
      const sick = animal.sick === true || stateStr === "sick" || typeof animal.sickenedAt === "number";
      let ready, remainingSec;
      if (sick) {
        ready = false;
        remainingSec = null;
      } else if (awakeAt != null) {
        remainingSec = Math.max(0, (awakeAt - now) / 1e3);
        ready = remainingSec <= 0;
      } else if (asleepAt != null) {
        remainingSec = Math.max(0, ANIMAL_BASE_CYCLE_SEC - (now - asleepAt) / 1e3);
        ready = remainingSec <= 0;
      } else {
        ready = false;
        remainingSec = ANIMAL_BASE_CYCLE_SEC;
      }
      out.push({
        key: `${type}:${animalId}`,
        name: type.charAt(0).toUpperCase() + type.slice(1),
        category: "Animal",
        ready,
        remainingSec,
      });
    });
  });
}

function agingShedBait(g, now, out) {
  const agingShed = field(g, "agingShed");
  const jobs = agingShed && agingShed.racks && Array.isArray(agingShed.racks.fermentation) ? agingShed.racks.fermentation : [];
  const toTs = (v) => (typeof v === "number" ? v : typeof v === "string" && v.trim() && !isNaN(Number(v)) ? Number(v) : null);
  jobs.forEach((job, idx) => {
    if (!job || typeof job !== "object" || typeof job.recipe !== "string") return;
    const baitName = Object.keys(BAIT_RECIPE_NAME_MATCH).find((name) => BAIT_RECIPE_NAME_MATCH[name].test(job.recipe));
    if (!baitName) return;
    const readyAt = toTs(job.readyAt);
    let ready, remainingSec;
    if (readyAt != null) {
      remainingSec = Math.max(0, (readyAt - now) / 1e3);
      ready = remainingSec <= 0;
    } else {
      ready = false;
      remainingSec = null;
    }
    out.push({
      key: `bait:${idx}:${readyAt ?? "pending"}`,
      name: baitName,
      category: "Aging Shed",
      ready,
      remainingSec,
    });
  });
}

export function computeReadyItems(json, now = Date.now()) {
  const g = extractGameState(json);
  const out = [];
  planted(field(g, "crops"), "crop", "Crop", now, out);
  planted(field(g, "fruitPatches"), "fruit", "Fruit", now, out);
  const greenhouse = field(g, "greenhouse");
  if (greenhouse && greenhouse.pots) planted(greenhouse.pots, "plant", "Greenhouse", now, out);
  const flowers = field(g, "flowers");
  if (flowers && flowers.flowerBeds) planted(flowers.flowerBeds, "flower", "Flower", now, out);
  resourceNodes(g, now, out);
  beehives(g, now, out);
  animals(g, now, out);
  agingShedBait(g, now, out);
  return out;
}
