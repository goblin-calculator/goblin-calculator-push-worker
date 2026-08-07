import webpush from "web-push";

let configuredFor;

function configure(env) {
  if (configuredFor && configuredFor.pub === env.VAPID_PUBLIC && configuredFor.priv === env.VAPID_PRIVATE) {
    return;
  }
  webpush.setVapidDetails(env.VAPID_SUBJECT, env.VAPID_PUBLIC, env.VAPID_PRIVATE);
  configuredFor = { pub: env.VAPID_PUBLIC, priv: env.VAPID_PRIVATE };
}

export async function sendOne(env, subscription, payload) {
  configure(env);
  try {
    await webpush.sendNotification(
      {
        endpoint: subscription.endpoint,
        keys: { p256dh: subscription.p256dh, auth: subscription.auth },
      },
      JSON.stringify(payload),
      { TTL: 60 * 60, urgency: "high" },
    );
    return { ok: true, endpoint: subscription.endpoint };
  } catch (err) {
    const status = typeof err?.statusCode === "number" ? err.statusCode : undefined;
    if (status === 404 || status === 410) {
      return { ok: false, gone: true, endpoint: subscription.endpoint, status };
    }
    return {
      ok: false,
      gone: false,
      endpoint: subscription.endpoint,
      status,
      error: err instanceof Error ? err.message : String(err),
    };
  }
}

const SEND_CHUNK = 25;

export async function sendAll(env, subscriptions, payload) {
  const out = [];
  for (let i = 0; i < subscriptions.length; i += SEND_CHUNK) {
    const chunk = subscriptions.slice(i, i + SEND_CHUNK);
    const settled = await Promise.allSettled(chunk.map((s) => sendOne(env, s, payload)));
    for (let j = 0; j < settled.length; j++) {
      const r = settled[j];
      out.push(
        r.status === "fulfilled"
          ? r.value
          : { ok: false, gone: false, endpoint: chunk[j].endpoint, error: r.reason instanceof Error ? r.reason.message : String(r.reason) },
      );
    }
  }
  return out;
}
