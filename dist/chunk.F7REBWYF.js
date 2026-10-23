import {
  __export
} from "./chunk.AS3VMXOQ.js";

// src/gem_packs.js
var gem_packs_exports = {};
__export(gem_packs_exports, {
  GEM_PACKS: () => GEM_PACKS,
  applySelection: () => applySelection,
  currentRatio: () => currentRatio,
  flowerDiscountMultiplier: () => flowerDiscountMultiplier,
  flowerUsdRate: () => flowerUsdRate,
  initGemPacks: () => initGemPacks,
  isFreeGem: () => isFreeGem,
  loadSelection: () => loadSelection,
  packFlowerPrice: () => packFlowerPrice,
  setSelection: () => setSelection
});
var A = null;
var GEM_PACKS = [{
  gems: 100,
  usd: 1.29
}, {
  gems: 650,
  usd: 6.49
}, {
  gems: 1350,
  usd: 12.99
}, {
  gems: 2800,
  usd: 25.99
}, {
  gems: 15500,
  usd: 129.99
}, {
  gems: 2e5,
  usd: 1299.99
}];
var SEL_KEY = "hl_gem_pack_sel";
var DEFAULT_SEL = "1350";
var DISCOUNT_DROP_AT = Date.UTC(2026, 7, 1);
function flowerDiscountMultiplier(now) {
  return (now == null ? Date.now() : now) >= DISCOUNT_DROP_AT ? 0.8 : 0.7;
}
function flowerUsdRate() {
  const r = A.prices.marketplaceFlowerUsdPrice;
  return typeof r === "number" && r > 0 ? r : null;
}
function packFlowerPrice(pack) {
  const rate = flowerUsdRate();
  if (rate == null) return null;
  return pack.usd * flowerDiscountMultiplier() / rate;
}
function loadSelection() {
  try {
    const v = localStorage.getItem(SEL_KEY);
    if (v === "free") return "free";
    if (v && GEM_PACKS.some((p) => String(p.gems) === v)) return v;
  } catch (e) {
  }
  return DEFAULT_SEL;
}
function isFreeGem() {
  return loadSelection() === "free";
}
function currentRatio() {
  const sel = loadSelection();
  if (sel === "free") return {
    flower: 0,
    gems: 0,
    free: true
  };
  const pack = GEM_PACKS.find((p) => String(p.gems) === sel) || GEM_PACKS[2];
  const price = packFlowerPrice(pack);
  if (price == null) {
    const fpg = A.calc.flowerPerGem();
    return {
      flower: 1,
      gems: fpg > 0 ? 1 / fpg : 0,
      free: false
    };
  }
  return {
    flower: 1,
    gems: pack.gems / price,
    free: false
  };
}
function applySelection() {
  const sel = loadSelection();
  if (sel === "free") {
    A.calc.setGemPackRatio(1350, 0);
    return;
  }
  const pack = GEM_PACKS.find((p) => String(p.gems) === sel) || GEM_PACKS[2];
  const price = packFlowerPrice(pack);
  if (price == null) return;
  A.calc.setGemPackRatio(pack.gems, price);
}
function setSelection(sel) {
  try {
    localStorage.setItem(SEL_KEY, String(sel));
  } catch (e) {
  }
  applySelection();
  window.dispatchEvent(new Event("guroGemPackChanged"));
}
var pending = null;
function schedule() {
  if (pending) return;
  pending = setTimeout(() => {
    pending = null;
    try {
      applySelection();
    } catch (e) {
    }
    window.dispatchEvent(new Event("guroGemPackChanged"));
  }, 50);
}
function refreshRate() {
  try {
    A.prices.fetchLivePrices().then((r) => {
      A.prices.setLivePrices(r.p2p, r.updatedAt, r.nft);
    }).catch(() => {
    });
  } catch (e) {
  }
}
function initGemPacks(api) {
  A = api;
  window.addEventListener("guroPricesUpdated", schedule);
  window.addEventListener("guroFarmSaved", () => {
    refreshRate();
    schedule();
  });
  if (flowerUsdRate() == null) {
    try {
      A.prices.refreshMarketplaceFlowerUsdPrice();
    } catch (e) {
    }
  }
  schedule();
}

export {
  currentRatio,
  applySelection,
  initGemPacks,
  gem_packs_exports
};
