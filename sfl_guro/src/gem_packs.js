let A = null;

export const GEM_PACKS = [ {
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
  gems: 200000,
  usd: 1299.99
} ];

const SEL_KEY = "hl_gem_pack_sel";

const DEFAULT_SEL = "1350";

const DISCOUNT_DROP_AT = Date.UTC(2026, 7, 1);

export function flowerDiscountMultiplier(now) {
  return (now == null ? Date.now() : now) >= DISCOUNT_DROP_AT ? .8 : .7;
}

export function flowerUsdRate() {
  const r = A.prices.marketplaceFlowerUsdPrice;
  return typeof r === "number" && r > 0 ? r : null;
}

export function packFlowerPrice(pack) {
  const rate = flowerUsdRate();
  if (rate == null) return null;
  return pack.usd * flowerDiscountMultiplier() / rate;
}

export function loadSelection() {
  try {
    const v = localStorage.getItem(SEL_KEY);
    if (v === "free") return "free";
    if (v && GEM_PACKS.some(p => String(p.gems) === v)) return v;
  } catch (e) {}
  return DEFAULT_SEL;
}

export function isFreeGem() {
  return loadSelection() === "free";
}

export function currentRatio() {
  const sel = loadSelection();
  if (sel === "free") return {
    flower: 0,
    gems: 0,
    free: true
  };
  const pack = GEM_PACKS.find(p => String(p.gems) === sel) || GEM_PACKS[2];
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

export function applySelection() {
  const sel = loadSelection();
  if (sel === "free") {
    A.calc.setGemPackRatio(1350, 0);
    return;
  }
  const pack = GEM_PACKS.find(p => String(p.gems) === sel) || GEM_PACKS[2];
  const price = packFlowerPrice(pack);
  if (price == null) return;
  A.calc.setGemPackRatio(pack.gems, price);
}

export function setSelection(sel) {
  try {
    localStorage.setItem(SEL_KEY, String(sel));
  } catch (e) {}
  applySelection();
  window.dispatchEvent(new Event("guroGemPackChanged"));
}

let pending = null;

function schedule() {
  if (pending) return;
  pending = setTimeout(() => {
    pending = null;
    try {
      applySelection();
    } catch (e) {}
    window.dispatchEvent(new Event("guroGemPackChanged"));
  }, 50);
}

function refreshRate() {
  try {
    A.prices.fetchLivePrices().then(r => {
      A.prices.setLivePrices(r.p2p, r.updatedAt, r.nft);
    }).catch(() => {});
  } catch (e) {}
}

export function initGemPacks(api) {
  A = api;
  window.addEventListener("guroPricesUpdated", schedule);
  window.addEventListener("guroFarmSaved", () => {
    refreshRate();
    schedule();
  });
  if (flowerUsdRate() == null) {
    try {
      A.prices.refreshMarketplaceFlowerUsdPrice();
    } catch (e) {}
  }
  schedule();
}
