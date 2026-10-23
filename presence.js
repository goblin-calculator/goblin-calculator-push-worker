const PRESENCE_PATH = "presence_sfl_guro";
const COUNT_PATH = "onlineCount_sfl_guro";

const firebaseConfig = {
  apiKey: "AIzaSyAgRUHJbc9qoN7_XbS1keYhaCddpmPDkVg",
  authDomain: "goblin-calculator.firebaseapp.com",
  databaseURL: "https://goblin-calculator-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "goblin-calculator",
  storageBucket: "goblin-calculator.firebasestorage.app",
  messagingSenderId: "286192851220",
  appId: "1:286192851220:web:e85d1e52b8d6d9ab5cca01",
  measurementId: "G-LT7TCPEJF3"
};

(function initPresence() {
  const countEl = document.getElementById("liveUsersCount");
  const badgeEl = document.getElementById("liveUsersBadge");
  const FIREBASE_SCRIPTS = [ "https://www.gstatic.com/firebasejs/10.14.1/firebase-app-compat.js", "https://www.gstatic.com/firebasejs/10.14.1/firebase-database-compat.js" ];
  const CONNECT_TIMEOUT_MS = 1e4;
  const HEARTBEAT_INTERVAL_MS = 2e4;
  const RECONCILE_INTERVAL_MS = 2e4;
  const STALE_AFTER_MS = 45e3;
  const DISPLAY_REFRESH_MS = 5e3;
  const HIDDEN_GRACE_MS = 3e4;
  const RETRY_BASE_MS = 3e3;
  const RETRY_MAX_MS = 6e4;
  let db = null;
  let presenceRef = null;
  let myPresenceRef = null;
  let connectedRef = null;
  let started = false;
  let starting = false;
  let retryTimer = null;
  let retryAttempt = 0;
  let gotConnection = false;
  let heartbeatTimer = null;
  let displayTimer = null;
  let hiddenRemovalTimer = null;
  let connectWatchTimer = null;
  let reconcileTimer = null;
  let presenceIsSet = false;
  let latestSnapshot = {};
  let lastWrittenCount = null;
  function hideBadge() {
    if (badgeEl) badgeEl.style.display = "none";
  }
  function showBadge() {
    if (badgeEl) badgeEl.style.display = "";
  }
  function scheduleRetry() {
    if (retryTimer || started) return;
    retryAttempt++;
    const wait = Math.min(RETRY_MAX_MS, RETRY_BASE_MS * Math.pow(2, Math.min(retryAttempt, 6)));
    retryTimer = setTimeout(() => {
      retryTimer = null;
      start();
    }, wait);
  }
  function retryNow() {
    if (started || starting) return;
    if (retryTimer) {
      clearTimeout(retryTimer);
      retryTimer = null;
    }
    start();
  }
  function firebaseReady() {
    return typeof window.firebase !== "undefined" && window.firebase && typeof window.firebase.initializeApp === "function" && typeof window.firebase.database === "function";
  }
  function loadScript(src) {
    return new Promise((resolve, reject) => {
      const el = document.createElement("script");
      el.src = src;
      el.async = false;
      el.onload = () => resolve();
      el.onerror = () => {
        el.remove();
        reject(new Error("load-failed:" + src));
      };
      document.head.appendChild(el);
    });
  }
  async function ensureFirebase() {
    if (firebaseReady()) return true;
    try {
      await loadScript(FIREBASE_SCRIPTS[0]);
      await loadScript(FIREBASE_SCRIPTS[1]);
    } catch (err) {
      return false;
    }
    return firebaseReady();
  }
  function isFresh(data, now) {
    return !!data && typeof data.connectedAt === "number" && now - data.connectedAt <= STALE_AFTER_MS;
  }
  function updateDisplayFromCache() {
    if (!countEl || !myPresenceRef) return;
    const now = Date.now();
    let count = 0;
    Object.keys(latestSnapshot).forEach(key => {
      if (key === myPresenceRef.key) {
        count += 1;
        return;
      }
      if (isFresh(latestSnapshot[key], now)) count += 1;
    });
    countEl.textContent = String(count);
    if (gotConnection && db && count !== lastWrittenCount) {
      lastWrittenCount = count;
      db.ref(COUNT_PATH).set(count).catch(() => {
        lastWrittenCount = null;
      });
    }
  }
  function reconcileStalePresence() {
    if (!gotConnection || !presenceRef) return;
    presenceRef.once("value").then(snap => {
      const now = Date.now();
      snap.forEach(child => {
        if (child.key === myPresenceRef.key) return;
        const data = child.val();
        if (!isFresh(data, now)) presenceRef.child(child.key).remove();
      });
    }).catch(() => {});
  }
  function writePresence() {
    myPresenceRef.set({
      connectedAt: window.firebase.database.ServerValue.TIMESTAMP
    });
    presenceIsSet = true;
  }
  function removePresence() {
    if (!presenceIsSet || !myPresenceRef) return;
    myPresenceRef.remove();
    presenceIsSet = false;
  }
  function startHeartbeat() {
    if (heartbeatTimer) return;
    heartbeatTimer = setInterval(() => {
      if (gotConnection && presenceIsSet) {
        myPresenceRef.update({
          connectedAt: window.firebase.database.ServerValue.TIMESTAMP
        });
      }
    }, HEARTBEAT_INTERVAL_MS);
  }
  function startDisplayLoop() {
    if (displayTimer) return;
    displayTimer = setInterval(updateDisplayFromCache, DISPLAY_REFRESH_MS);
  }
  function watchConnection() {
    if (connectWatchTimer) return;
    connectWatchTimer = setInterval(() => {
      if (gotConnection || !db) return;
      hideBadge();
      try {
        db.goOffline();
        db.goOnline();
      } catch (err) {}
    }, CONNECT_TIMEOUT_MS);
  }
  function attachPresenceListener() {
    const onValue = snap => {
      const next = {};
      snap.forEach(child => {
        next[child.key] = child.val();
      });
      latestSnapshot = next;
      showBadge();
      updateDisplayFromCache();
    };
    presenceRef.on("value", onValue, err => {
      console.error("[presence] read failed:", err);
      hideBadge();
      try {
        presenceRef.off("value", onValue);
      } catch (e) {}
      setTimeout(attachPresenceListener, RETRY_BASE_MS * 2);
    });
  }
  function getApp() {
    try {
      return window.firebase.initializeApp(firebaseConfig);
    } catch (err) {
      if (window.firebase.apps && window.firebase.apps.length) return window.firebase.app();
      throw err;
    }
  }
  async function start() {
    if (started || starting) return;
    starting = true;
    if (!firebaseConfig.apiKey || firebaseConfig.apiKey.startsWith("PASTE_")) {
      hideBadge();
      starting = false;
      return;
    }
    const ok = await ensureFirebase();
    if (!ok) {
      starting = false;
      hideBadge();
      scheduleRetry();
      return;
    }
    try {
      try {
        localStorage.removeItem("firebase:previous_websocket_failure");
      } catch (e) {}
      getApp();
      db = window.firebase.database();
      try {
        db.INTERNAL.forceWebSockets();
      } catch (e) {}
      presenceRef = db.ref(PRESENCE_PATH);
      myPresenceRef = presenceRef.push();
      connectedRef = db.ref(".info/connected");
    } catch (err) {
      console.error("[presence] Firebase failed to initialize:", err);
      starting = false;
      hideBadge();
      scheduleRetry();
      return;
    }
    started = true;
    starting = false;
    retryAttempt = 0;
    connectedRef.on("value", snap => {
      if (snap.val() === true) {
        gotConnection = true;
        showBadge();
        myPresenceRef.onDisconnect().remove();
        if (document.visibilityState !== "hidden") writePresence();
        reconcileStalePresence();
        startHeartbeat();
        startDisplayLoop();
      } else {
        gotConnection = false;
        presenceIsSet = false;
      }
    });
    attachPresenceListener();
    watchConnection();
    if (!reconcileTimer) reconcileTimer = setInterval(reconcileStalePresence, RECONCILE_INTERVAL_MS);
  }
  document.addEventListener("visibilitychange", () => {
    if (document.visibilityState === "hidden") {
      if (hiddenRemovalTimer) clearTimeout(hiddenRemovalTimer);
      hiddenRemovalTimer = setTimeout(() => {
        removePresence();
      }, HIDDEN_GRACE_MS);
    } else {
      if (hiddenRemovalTimer) {
        clearTimeout(hiddenRemovalTimer);
        hiddenRemovalTimer = null;
      }
      if (started) {
        if (gotConnection && !presenceIsSet) writePresence();
        if (!gotConnection && db) {
          try {
            db.goOffline();
            db.goOnline();
          } catch (err) {}
        }
      } else {
        retryNow();
      }
    }
  });
  window.addEventListener("online", () => {
    if (started && db) {
      try {
        db.goOnline();
      } catch (err) {}
    } else {
      retryNow();
    }
  });
  window.addEventListener("pageshow", e => {
    if (e.persisted) {
      if (started && gotConnection && !presenceIsSet) writePresence(); else retryNow();
    }
  });
  window.addEventListener("pagehide", removePresence);
  window.addEventListener("beforeunload", removePresence);
  start();
})();
