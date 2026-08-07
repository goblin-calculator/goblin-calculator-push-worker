import { sweep, seedFarmAsSeen } from "./coordinator.js";
import { sendOne } from "./push.js";

function json(body, init = {}) {
  return new Response(JSON.stringify(body), {
    ...init,
    headers: {
      "content-type": "application/json",
      "cache-control": "no-store",
      "access-control-allow-origin": "*",
      "access-control-allow-methods": "GET, POST, OPTIONS",
      "access-control-allow-headers": "content-type",
      ...(init.headers || {}),
    },
  });
}

async function readJson(request) {
  try {
    return await request.json();
  } catch {
    return null;
  }
}

function isAllowedPushHost(host) {
  return (
    host === "fcm.googleapis.com" ||
    host === "updates.push.services.mozilla.com" ||
    host === "web.push.apple.com" ||
    host.endsWith(".push.apple.com") ||
    host.endsWith(".notify.windows.com")
  );
}

async function handleSubscribe(request, env, ctx) {
  const body = await readJson(request);
  if (!body || typeof body.farmId !== "number") return json({ error: "Missing farmId" }, { status: 400 });
  const sub = body.subscription;
  const endpoint = sub && sub.endpoint;
  const p256dh = sub && sub.keys && sub.keys.p256dh;
  const auth = sub && sub.keys && sub.keys.auth;
  if (!endpoint || !p256dh || !auth) return json({ error: "Missing subscription fields" }, { status: 400 });

  let endpointUrl;
  try {
    endpointUrl = new URL(endpoint);
  } catch {
    return json({ error: "Malformed endpoint" }, { status: 400 });
  }
  if (endpointUrl.protocol !== "https:") return json({ error: "Endpoint must be https" }, { status: 400 });
  if (!isAllowedPushHost(endpointUrl.hostname)) return json({ error: "Endpoint host not allowed" }, { status: 400 });

  const now = Date.now();
  const existing = await env.GOBLIN_PUSH_DB.prepare("SELECT farm_id FROM farm_state WHERE farm_id = ?").bind(body.farmId).first();

  await env.GOBLIN_PUSH_DB.prepare(
    "INSERT INTO subscriptions (farm_id, endpoint, p256dh, auth, created_at, last_seen_at) VALUES (?, ?, ?, ?, ?, ?) ON CONFLICT(endpoint) DO UPDATE SET farm_id = excluded.farm_id, p256dh = excluded.p256dh, auth = excluded.auth, last_seen_at = excluded.last_seen_at",
  )
    .bind(body.farmId, endpoint, p256dh, auth, now, now)
    .run();

  if (!existing) {
    ctx.waitUntil(seedFarmAsSeen(env, body.farmId));
  }

  return json({ ok: true });
}

async function handleUnsubscribe(request, env) {
  const body = await readJson(request);
  if (!body || !body.endpoint) return json({ error: "Missing endpoint" }, { status: 400 });
  await env.GOBLIN_PUSH_DB.prepare("DELETE FROM subscriptions WHERE endpoint = ?").bind(body.endpoint).run();
  return json({ ok: true });
}

async function handleTest(request, env) {
  const body = await readJson(request);
  if (!body || !body.endpoint) return json({ error: "Missing endpoint" }, { status: 400 });
  const row = await env.GOBLIN_PUSH_DB.prepare("SELECT endpoint, p256dh, auth FROM subscriptions WHERE endpoint = ?")
    .bind(body.endpoint)
    .first();
  if (!row) return json({ error: "Subscription not found" }, { status: 404 });
  const result = await sendOne(env, row, {
    title: "Goblin Calculator",
    body: "Test notification — your farm alerts are working.",
    tag: "goblin-calculator-test",
    url: "./",
    icon: "./icons/goblin-logo.png",
    badge: "./icons/goblin-logo.png",
  });
  if (!result.ok) return json({ error: result.error || "Send failed" }, { status: 502 });
  return json({ ok: true });
}

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    const method = request.method;

    if (method === "OPTIONS") return json({ ok: true });

    if (url.pathname.startsWith("/push/")) {
      const ip = request.headers.get("cf-connecting-ip") || "unknown";
      const { success } = await env.PUSH_RATE_LIMITER.limit({ key: `${ip}:${url.pathname}` });
      if (!success) {
        return json({ error: "Too many requests" }, { status: 429, headers: { "retry-after": "60" } });
      }
    }

    if (url.pathname === "/push/vapid" && method === "GET") {
      if (!env.VAPID_PUBLIC) return json({ error: "Not configured" }, { status: 503 });
      return json({ publicKey: env.VAPID_PUBLIC });
    }
    if (url.pathname === "/push/subscribe" && method === "POST") return handleSubscribe(request, env, ctx);
    if (url.pathname === "/push/unsubscribe" && method === "POST") return handleUnsubscribe(request, env);
    if (url.pathname === "/push/test" && method === "POST") return handleTest(request, env);

    if (url.pathname === "/push/sweep" && method === "POST") {
      if (!env.ADMIN_SECRET || request.headers.get("x-admin-secret") !== env.ADMIN_SECRET) {
        return json({ error: "Forbidden" }, { status: 403 });
      }
      ctx.waitUntil(
        sweep(env).catch((err) => console.error("manual sweep crashed:", err instanceof Error ? err.message : err)),
      );
      return json({ triggered: true });
    }

    return json({ error: "Not found" }, { status: 404 });
  },

  async scheduled(_event, env, ctx) {
    ctx.waitUntil(sweep(env).catch((err) => console.error("coordinator sweep crashed:", err instanceof Error ? err.message : err)));
  },
};
