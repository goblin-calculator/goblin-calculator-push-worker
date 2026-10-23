const CACHE_VERSION = "vfc566bced7";

const CACHE_NAME = `sfl-guro-${CACHE_VERSION}`;

const PRECACHE_URLS = ["./","./index.html","./style.css?v=fc566bced7","./presence.js","./early.js?v=fc566bced7","./confetti.browser.min.js?v=fc566bced7","./manifest.json","./icons/sfl-guro-192.png","./icons/sfl-guro-512.png","./dist/app.JUY6DBC3.js","./dist/auctionleaderboard.7IXNYVAW.js","./dist/basecoincost.JJKFPQUB.js","./dist/beginnerguide.QPJN33OS.js","./dist/boost.EN6VJCXN.js","./dist/bumpkinlevel.O4VZJRN6.js","./dist/chunk.AS3VMXOQ.js","./dist/chunk.D7LWHYJT.js","./dist/chunk.F7REBWYF.js","./dist/chunk.LE2PW24O.js","./dist/chunk.LPEVZJ4B.js","./dist/chunk.VR6FV3KR.js","./dist/chunk.X4KTTJ4Z.js","./dist/chunk.YXYWASVI.js","./dist/coinconverter.DPKDRYSQ.js","./dist/craftingbox.GL4ZMFKR.js","./dist/digging.BCZDWFTP.js","./dist/expansionsim.Y6LUWJP7.js","./dist/experiencecalc.W4PR6RBM.js","./dist/factiondelivery.Q3WXNUKG.js","./dist/fishing.Z4LNHSH2.js","./dist/flowercombo.USUW27F7.js","./dist/growing.FAMUUYNP.js","./dist/guntershop.PISI5PSR.js","./dist/leaderboard.YMSFOBOL.js","./dist/map.G2VZGJMR.js","./dist/marketplace.XNVMAAAX.js","./dist/nodes.BCUQJTBN.js","./dist/npcgift.574SZ5CT.js","./dist/potionroom.AN3SQ6EQ.js","./dist/profile.5KPQM2FZ.js","./dist/resourcecalc.OCLOCQM7.js","./dist/seasons.BLERM2VU.js","./dist/settings.FVFJAFUG.js","./dist/sflbubbles.VALHBLLI.js","./dist/sft_goals.FWX65JU3.js","./dist/skilltree.B2NEMVXY.js","./dist/ticketcalc.U4CNZSYV.js","./dist/userguide.FYQUJADT.js","./dist/workbench.R4ID2VGM.js"];

const NAVIGATE_NETWORK_TIMEOUT_MS = 3e3;

const PRECACHE_MAX_ATTEMPTS = 5;

const PRECACHE_RETRY_BASE_MS = 800;

function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function fetchForCache(url) {
  const response = await fetch(url, {
    cache: "reload"
  });
  if (!response || !response.ok) throw new Error(`bad-status:${response && response.status}`);
  return response;
}

async function precacheOneWithRetry(url, cache, maxAttempts) {
  let lastErr = null;
  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    try {
      const response = await fetchForCache(url);
      await cache.put(url, response);
      return true;
    } catch (err) {
      lastErr = err;
      if (attempt < maxAttempts) await delay(PRECACHE_RETRY_BASE_MS * attempt);
    }
  }
  console.warn("[sw] precache failed after retries:", url, lastErr);
  return false;
}

async function precacheAllWithRetry(cache, urls, maxAttempts) {
  const results = await Promise.all(urls.map(url => precacheOneWithRetry(url, cache, maxAttempts)));
  return urls.filter((url, i) => !results[i]);
}

async function healMissingPrecache(cache) {
  const missing = [];
  for (const url of PRECACHE_URLS) {
    const cached = await cache.match(url);
    if (!cached) missing.push(url);
  }
  if (!missing.length) return;
  await precacheAllWithRetry(cache, missing, PRECACHE_MAX_ATTEMPTS);
}

self.addEventListener("install", event => {
  event.waitUntil((async () => {
    const cache = await caches.open(CACHE_NAME);
    await precacheAllWithRetry(cache, PRECACHE_URLS, PRECACHE_MAX_ATTEMPTS);
    self.skipWaiting();
  })());
});

self.addEventListener("activate", event => {
  event.waitUntil((async () => {
    const names = await caches.keys();
    await Promise.all(names.filter(name => name !== CACHE_NAME).map(name => caches.delete(name)));
    const cache = await caches.open(CACHE_NAME);
    await healMissingPrecache(cache);
    await self.clients.claim();
  })());
});

function networkWithTimeout(request, timeoutMs) {
  return new Promise((resolve, reject) => {
    const timer = setTimeout(() => reject(new Error("network-timeout")), timeoutMs);
    fetch(request).then(res => {
      clearTimeout(timer);
      resolve(res);
    }, err => {
      clearTimeout(timer);
      reject(err);
    });
  });
}

async function cacheFirst(request, cache) {
  const cached = await cache.match(request);
  if (cached) return cached;
  let lastErr = null;
  for (let attempt = 1; attempt <= 3; attempt++) {
    try {
      const networkResponse = await fetch(request);
      if (networkResponse && networkResponse.ok) cache.put(request, networkResponse.clone());
      return networkResponse;
    } catch (err) {
      lastErr = err;
      if (attempt < 3) await delay(500 * attempt);
    }
  }
  throw lastErr;
}

async function networkFirstForNavigation(request, cache) {
  try {
    const networkResponse = await networkWithTimeout(request, NAVIGATE_NETWORK_TIMEOUT_MS);
    if (networkResponse && networkResponse.status === 404) {
      const shell = await cache.match("./index.html");
      if (shell) return shell;
    }
    if (networkResponse && networkResponse.ok) cache.put(request, networkResponse.clone());
    return networkResponse;
  } catch (err) {
    const cached = await cache.match(request) || await cache.match("./index.html");
    if (cached) return cached;
    throw err;
  }
}

self.addEventListener("fetch", event => {
  const {request: request} = event;
  if (request.method !== "GET" || new URL(request.url).origin !== self.location.origin) {
    return;
  }
  event.respondWith((async () => {
    const cache = await caches.open(CACHE_NAME);
    if (request.mode === "navigate" || new URL(request.url).pathname.endsWith("/presence.js")) {
      return networkFirstForNavigation(request, cache);
    }
    try {
      return await cacheFirst(request, cache);
    } catch (err) {
      const cached = await cache.match(request);
      if (cached) return cached;
      throw err;
    }
  })());
});

self.addEventListener("message", event => {
  if (event.data === "SKIP_WAITING") {
    self.skipWaiting();
  }
});