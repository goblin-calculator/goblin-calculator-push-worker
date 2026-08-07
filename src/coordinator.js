import { computeReadyItems } from "./readiness.js";
import { sendAll } from "./push.js";

const SWEEP_PAUSE_MS = 300;

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function fetchFarm(env, farmId) {
  const res = await fetch(env.FARM_API_BASE + encodeURIComponent(farmId), { cf: { cacheTtl: 0 } });
  if (!res.ok) throw new Error(`farm fetch failed: ${res.status}`);
  return res.json();
}

function formatBody(newlyReady) {
  const byName = new Map();
  for (const item of newlyReady) {
    byName.set(item.name, (byName.get(item.name) || 0) + 1);
  }
  const parts = [...byName.entries()].map(([name, count]) => (count > 1 ? `${count}x ${name}` : name));
  if (parts.length <= 4) return parts.join(", ");
  return `${parts.slice(0, 4).join(", ")}, and ${parts.length - 4} more`;
}

async function sweepFarm(env, farmId) {
  const subsResult = await env.GOBLIN_PUSH_DB.prepare("SELECT endpoint, p256dh, auth FROM subscriptions WHERE farm_id = ?")
    .bind(farmId)
    .all();
  const subscriptions = subsResult.results || [];
  if (subscriptions.length === 0) return;

  let json;
  try {
    json = await fetchFarm(env, farmId);
  } catch (err) {
    console.error(`sweep: farm ${farmId} fetch failed:`, err instanceof Error ? err.message : err);
    return;
  }

  const now = Date.now();
  const items = computeReadyItems(json, now);

  const stateRow = await env.GOBLIN_PUSH_DB.prepare("SELECT seen_json FROM farm_state WHERE farm_id = ?").bind(farmId).first();
  let seen = {};
  if (stateRow && stateRow.seen_json) {
    try {
      seen = JSON.parse(stateRow.seen_json);
    } catch {
      seen = {};
    }
  }

  const readyKeys = new Set(items.filter((i) => i.ready).map((i) => i.key));
  const nextSeen = {};
  for (const [key, ts] of Object.entries(seen)) {
    if (readyKeys.has(key)) nextSeen[key] = ts;
  }

  const newlyReady = [];
  for (const item of items) {
    if (!item.ready) continue;
    if (item.key in nextSeen) continue;
    nextSeen[item.key] = now;
    newlyReady.push(item);
  }

  await env.GOBLIN_PUSH_DB.prepare(
    "INSERT INTO farm_state (farm_id, seen_json, last_synced_at) VALUES (?, ?, ?) ON CONFLICT(farm_id) DO UPDATE SET seen_json = excluded.seen_json, last_synced_at = excluded.last_synced_at",
  )
    .bind(farmId, JSON.stringify(nextSeen), now)
    .run();

  if (newlyReady.length === 0) return;

  const payload = {
    title: "Goblin Calculator",
    body: `${newlyReady.length} item${newlyReady.length === 1 ? "" : "s"} ready to harvest: ${formatBody(newlyReady)}`,
    tag: "goblin-calculator-ready",
    url: "./",
    icon: "./icons/goblin-logo.png",
    badge: "./icons/goblin-logo.png",
  };

  const results = await sendAll(env, subscriptions, payload);
  const gone = results.filter((r) => !r.ok && r.gone).map((r) => r.endpoint);
  if (gone.length > 0) {
    await env.GOBLIN_PUSH_DB.prepare(`DELETE FROM subscriptions WHERE endpoint IN (${gone.map(() => "?").join(",")})`)
      .bind(...gone)
      .run();
  }
}

export async function sweep(env) {
  const farms = await env.GOBLIN_PUSH_DB.prepare("SELECT DISTINCT farm_id FROM subscriptions").all();
  const farmIds = (farms.results || []).map((r) => r.farm_id);
  for (const farmId of farmIds) {
    await sweepFarm(env, farmId);
    await sleep(SWEEP_PAUSE_MS);
  }
}

export async function seedFarmAsSeen(env, farmId) {
  let json;
  try {
    json = await fetchFarm(env, farmId);
  } catch (err) {
    console.error(`seed: farm ${farmId} fetch failed:`, err instanceof Error ? err.message : err);
    return;
  }
  const now = Date.now();
  const items = computeReadyItems(json, now);
  const seen = {};
  for (const item of items) {
    if (item.ready) seen[item.key] = now;
  }
  await env.GOBLIN_PUSH_DB.prepare(
    "INSERT INTO farm_state (farm_id, seen_json, last_synced_at) VALUES (?, ?, ?) ON CONFLICT(farm_id) DO UPDATE SET seen_json = excluded.seen_json, last_synced_at = excluded.last_synced_at",
  )
    .bind(farmId, JSON.stringify(seen), now)
    .run();
}
