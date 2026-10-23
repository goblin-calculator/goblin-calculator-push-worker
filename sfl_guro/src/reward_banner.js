import { ICON_DATA } from "./icon_data.js";
import { api } from "./api.js";

import { COIN_ICON, IMAGE_ICONS, MUTANT_TYPE_EMOJI, escapeHtml } from "./calculator.js";

import { farmPanelDetectActiveMutants, farmPanelDetectMoneyTreeBonus, farmPanelGameState } from "./inprogress.js";

const COIN_SRC = (COIN_ICON.match(/src="([^"]+)"/) || [])[1] || "";

let bootDone = false;
let bannerActive = false;
let lastSignature = "";
let queue = [];

let goalQueue = [];
let confettiFire = null;
let confettiCanvas = null;
let confettiTimers = [];

function layerEl() {
  return document.getElementById("guroRewardLayer");
}

function mutantIconHtml(entry) {
  const key = Object.keys(IMAGE_ICONS).find(k => k.toLowerCase() === String(entry.name).trim().toLowerCase());
  if (key) return `<img class="guro-reward-icon" src="${IMAGE_ICONS[key]}" alt="${escapeHtml(entry.name)}">`;
  return `<span class="guro-reward-emoji">${MUTANT_TYPE_EMOJI[entry.type] || "✨"}</span>`;
}

function buildFrame(bodyHtml) {
  return `<div class="guro-reward-outer" role="dialog" aria-modal="true">
    <button type="button" class="guro-reward-close" id="guroRewardCloseBtn" aria-label="Close"><img src="${ICON_DATA["close.png"]}" alt="Close"></button>
    <div class="guro-reward-inner">${bodyHtml}</div>
  </div>`;
}

function buildMutantBanner(mutants) {
  const rows = mutants.map(m => `<div class="guro-reward-row">${mutantIconHtml(m)}<span class="guro-reward-name">${escapeHtml(m.name)}${m.count > 1 ? ` ×${m.count}` : ""}</span></div>`).join("");
  const title = mutants.length > 1 ? "You found Mutants!" : "You found a Mutant!";
  return buildFrame(`<div class="guro-reward-title">Congratulations!<br>${title}</div><div class="guro-reward-rows">${rows}</div>`);
}

function buildMoneyTreeBanner(data) {
  const lead = data.count > 1 ? `${data.count} of your Trees found a reward of` : "One of your Tree found a reward of";
  const coins = Math.round(data.totalCoins).toLocaleString();
  const coinImg = COIN_SRC ? `<img class="guro-reward-coin" src="${COIN_SRC}" alt="Coins">` : "";
  return buildFrame(`<div class="guro-reward-title">Congratulations!<br>${lead}</div><div class="guro-reward-value"><span>+${coins}</span>${coinImg}</div>`);
}

function buildPendingMoneyTreeBanner(data) {
  const lead = data.count > 1 ? `${data.count} Tree nodes are predicted to proc a Money Tree reward of` : "One Tree node is predicted to proc a Money Tree reward of";
  const coins = Math.round(data.totalCoins).toLocaleString();
  const coinImg = COIN_SRC ? `<img class="guro-reward-coin" src="${COIN_SRC}" alt="Coins">` : "";
  return buildFrame(`<div class="guro-reward-title">Money Tree Bonus Pending!<br>${lead}</div><div class="guro-reward-value"><span>+${coins}</span>${coinImg}</div>`);
}

function pendingMoneyTree(mt) {
  if (!mt) return null;
  const batch = Array.isArray(mt.batchPredictions) ? mt.batchPredictions : [];
  if (batch.length) {
    const count = batch.reduce((n, b) => n + (b.procCount || 0), 0);
    const totalCoins = batch.reduce((n, b) => n + (b.coins || 0), 0);
    if (count > 0 && totalCoins > 0) return {
      count: count,
      totalCoins: totalCoins
    };
  }
  const types = Array.isArray(mt.predictedTypes) ? mt.predictedTypes : [];
  if (types.length && mt.predictedCoins > 0) return {
    count: types.length,
    totalCoins: mt.predictedCoins
  };
  return null;
}

function buildGoalBanner(goals) {
  const rows = goals.map(g => `<div class="guro-reward-row">${mutantIconHtml({
    name: g.name,
    type: ""
  })}<span class="guro-reward-name">${escapeHtml(g.name)}</span></div>`).join("");
  const title = goals.length > 1 ? "You reached your SFT goals!" : "You reached your SFT goal!";
  return buildFrame(`<div class="guro-reward-title">Congratulations!<br>${title}</div><div class="guro-reward-rows">${rows}</div>`);
}

function stopConfetti() {
  confettiTimers.forEach(t => clearTimeout(t));
  confettiTimers = [];
  if (confettiFire && typeof confettiFire.reset === "function") confettiFire.reset();
}

function ensureConfetti() {
  if (confettiFire) return confettiFire;
  if (typeof window.confetti !== "function" || typeof window.confetti.create !== "function") return null;
  confettiCanvas = document.createElement("canvas");
  confettiCanvas.id = "guroConfettiCanvas";
  document.body.appendChild(confettiCanvas);
  confettiFire = window.confetti.create(confettiCanvas, {
    resize: true,
    useWorker: true,
    disableForReducedMotion: true
  });
  return confettiFire;
}

function playConfetti() {
  const fire = ensureConfetti();
  if (!fire) return;
  stopConfetti();
  fireConfetti(fire);
}

function fireConfetti(fire) {
  const burst = (x, angle) => fire({
    particleCount: 60,
    spread: 70,
    angle: angle,
    startVelocity: 55,
    origin: {
      x: x,
      y: 0.7
    },
    zIndex: 100006
  });
  burst(0.1, 60);
  burst(0.9, 120);
  confettiTimers.push(setTimeout(() => {
    fire({
      particleCount: 90,
      spread: 100,
      startVelocity: 40,
      origin: {
        x: 0.5,
        y: 0.45
      },
      zIndex: 100006
    });
  }, 250));
  confettiTimers.push(setTimeout(() => {
    burst(0.15, 65);
    burst(0.85, 115);
  }, 700));
}

function closeBanner() {
  const layer = layerEl();
  if (!layer || !bannerActive) return;
  layer.classList.remove("show");
  stopConfetti();
  setTimeout(() => {
    layer.innerHTML = "";
    bannerActive = false;
    showNext();
  }, 220);
}

function showNext() {
  if (bannerActive || !(queue.length || goalQueue.length)) return;
  const layer = layerEl();
  if (!layer) {
    queue = [];
    goalQueue = [];
    return;
  }
  bannerActive = true;
  layer.innerHTML = queue.length ? queue.shift() : goalQueue.shift();
  const btn = document.getElementById("guroRewardCloseBtn");
  if (btn) btn.addEventListener("click", closeBanner);
  void layer.offsetWidth;
  layer.classList.add("show");
  playConfetti();
}

async function scanGoals() {
  if (!bootDone) return;
  let fresh = [];
  try {
    const mod = await import("./sft_goals.js");
    mod.bindApi(api);
    fresh = mod.takeNewlyReachedGoals();
  } catch (e) {
    return;
  }
  if (!fresh.length) return;
  goalQueue.push(buildGoalBanner(fresh));
  showNext();
}

function scanRewards() {
  if (!bootDone || !farmPanelGameState) return;
  let mutants = [];
  let money = null;
  let pending = null;
  try {
    mutants = farmPanelDetectActiveMutants(farmPanelGameState) || [];
    const mt = farmPanelDetectMoneyTreeBonus(farmPanelGameState);
    if (mt && mt.totalCoins > 0) money = mt;
    pending = pendingMoneyTree(mt);
  } catch (e) {
    return;
  }
  const signature = JSON.stringify([ mutants.map(m => `${m.type}:${m.name}:${m.count}`).sort(), money ? [ money.count, money.totalCoins ] : null, pending ? [ pending.count, pending.totalCoins ] : null ]);
  if (signature === lastSignature) {
    scanGoals();
    return;
  }
  lastSignature = signature;
  if (mutants.length) queue.push(buildMutantBanner(mutants));
  if (money) queue.push(buildMoneyTreeBanner(money));
  if (pending) queue.push(buildPendingMoneyTreeBanner(pending));
  showNext();
  scanGoals();
}

export function finishBoot() {
  const loader = document.getElementById("guroBootLoader");
  const proceed = () => {
    bootDone = true;
    scanRewards();
  };
  if (!loader) {
    proceed();
    return;
  }
  let closed = false;
  const close = () => {
    if (closed) return;
    closed = true;
    window.removeEventListener("guroFarmSaved", close);
    requestAnimationFrame(() => {
      loader.classList.add("hide");
      setTimeout(() => {
        loader.remove();
        proceed();
      }, 320);
    });
  };
  let hasSavedFarm = false;
  let hasCachedState = false;
  try {
    hasSavedFarm = !!localStorage.getItem("hl_farm_panel_id");
    hasCachedState = !!localStorage.getItem("hl_farm_panel_gamestate");
    if (!hasCachedState) {
      for (let i = 0; i < localStorage.length; i++) {
        const k = localStorage.key(i);
        if (k && k.indexOf("hl_fpgs__") === 0) {
          hasCachedState = true;
          break;
        }
      }
    }
  } catch (e) {}
  if (hasSavedFarm && (hasCachedState || window.guroFarmSavedDone)) {
    closed = true;
    loader.style.transitionDuration = ".12s";
    requestAnimationFrame(() => {
      loader.classList.add("hide");
      setTimeout(() => {
        loader.remove();
        proceed();
      }, 140);
    });
    return;
  }
  if (!hasSavedFarm) {
    close();
    return;
  }
  window.addEventListener("guroFarmSaved", close);
  setTimeout(close, 4000);
}

export function initRewardBanner() {
  window.addEventListener("guroFarmSaved", () => {
    if (!bootDone) return;
    setTimeout(() => {
      lastSignature = "";
      scanRewards();
    }, 900);
  });
  const rescanGoals = () => {
    if (bootDone) setTimeout(scanGoals, 400);
  };
  window.addEventListener("guroPricesUpdated", rescanGoals);
  window.addEventListener("guroGoalsChanged", rescanGoals);
  document.addEventListener("keydown", e => {
    if (e.key === "Escape" && bannerActive) closeBanner();
  });
}
