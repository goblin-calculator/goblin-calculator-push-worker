let rootEl = null;

let calc = null;

let GEM_PACKS = [];

let loadSelection = () => "1350";

let setSelection = () => {};

let packFlowerPrice = () => null;

let currentRatio = () => ({
  gems: 0
});

let listening = false;

let restockMode = () => "shared";

let applyRestockMode = () => {};

function num(n) {
  if (n == null || !isFinite(n)) return "—";
  return n.toLocaleString(undefined, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  });
}

function packHtml(pack, sel) {
  const on = sel === String(pack.gems);
  const price = packFlowerPrice(pack);
  return `<label class="st-pack guro-frame${on ? " is-on" : ""}">
    <span class="st-pack-top"><span class="st-pack-amt">${pack.gems.toLocaleString()}${calc.GEM_ICON}</span><input type="checkbox" data-st-pack="${pack.gems}"${on ? " checked" : ""} aria-label="${pack.gems} gem pack"></span>
    <span class="st-pack-price">${num(price)}${calc.FLOWER_ICON}</span>
  </label>`;
}

function freeHtml(sel) {
  const on = sel === "free";
  return `<label class="st-pack guro-frame${on ? " is-on" : ""}">
    <span class="st-pack-top"><span class="st-pack-amt">Free Gem</span><input type="checkbox" data-st-pack="free"${on ? " checked" : ""} aria-label="Free Gem"></span>
    <span class="st-pack-price">0${calc.FLOWER_ICON}</span>
  </label>`;
}

function modeCardHtml(id, title, on, lines) {
  return `<label class="st-mode guro-frame${on ? " is-on" : ""}">
    <span class="st-mode-top"><span class="st-mode-title">${title}</span><input type="checkbox" data-st-mode="${id}"${on ? " checked" : ""} aria-label="${title}"></span>
    ${lines.map(t => `<p class="st-mode-text">${t}</p>`).join("")}
  </label>`;
}

function modesHtml() {
  const shared = restockMode() === "shared";
  const perRestock = [ "One seed restock costs a fixed amount of gems and refreshes the stock of every seed. In this mode that cost is split equally between all the seeds in the seed pool (crops, fruits, greenhouse and flower seeds, minus any seeds you excluded in the restock settings).", "Net is worked out chain to chain: the harvest is sold for Gross, then the seed cost, the shrine cost and the crop's small share of the restock cost are taken away. Net = Gross - Seed Cost - Shrine Cost - Restock Share.", "Best for a fair profit of one full restock when you plant many different seeds." ];
  const twentyFour = [ "The crop keeps growing and being replanted for a full 24 hours, so it keeps restocking every time its stock runs out. The more restocks it needs, the more restock cost it has.", "The restock cost is not split: this one crop shoulders the full gem cost of every restock by itself. Restocks per day = seeds planted per day / stock per restock, rounded up to a whole number (1.01 restocks counts as 2), so the cost is always whole restocks of gems (at 15 gems per restock, 2 restocks = 30 gems).", "Net = Gross - Seed Cost - Shrine Cost - the full Restock Cost of all restocks in 24 hours." ];
  return `<div class="st-outer guro-frame st-modes-outer">
      <div class="st-inner guro-frame">
        <div class="st-label">Restock Cost Mode</div>
        <p class="st-modes-note">The mode ticked here is used for the restock cost across the whole app. The mode buttons inside the Resource Calculators only change that calculator.</p>
        <div class="st-modes">${modeCardHtml("shared", "PER RESTOCK MODE", shared, perRestock)}${modeCardHtml("individual", "24HR MODE", !shared, twentyFour)}</div>
      </div>
    </div>`;
}

function render() {
  if (!rootEl) return;
  const sel = loadSelection();
  const r = currentRatio();
  rootEl.innerHTML = `<div class="st-wrap">
    <div class="st-outer guro-frame">
      <div class="st-inner guro-frame">
        <div class="st-label">Gem Pack</div>
        <div class="st-packs">${GEM_PACKS.map(p => packHtml(p, sel)).join("")}${freeHtml(sel)}</div>
        <div class="st-label">Flower/Gem Ratio</div>
        <div class="st-ratio">${r.free ? `1${calc.GEM_ICON} = 0${calc.FLOWER_ICON}` : `1${calc.FLOWER_ICON} = ${num(r.gems)}${calc.GEM_ICON}`}</div>
      </div>
    </div>
    ${modesHtml()}
  </div>`;
}

function onChange(e) {
  const t = e.target;
  if (!t || !t.dataset) return;
  if (t.dataset.stMode != null) {
    applyRestockMode(t.dataset.stMode);
    render();
    return;
  }
  if (t.dataset.stPack == null) return;
  setSelection(t.dataset.stPack);
  render();
}

function refresh() {
  if (rootEl && document.body.contains(rootEl)) render();
}

export function mount(root, api) {
  rootEl = root;
  calc = api.calc;
  const gp = api.gempacks;
  GEM_PACKS = gp.GEM_PACKS;
  loadSelection = gp.loadSelection;
  setSelection = gp.setSelection;
  packFlowerPrice = gp.packFlowerPrice;
  currentRatio = gp.currentRatio;
  restockMode = () => api.prices.restockCostMode;
  applyRestockMode = mode => api.calc.applyRestockCostMode(mode === "individual" ? "individual" : "shared");
  root.addEventListener("change", onChange);
  try {
    if (!(typeof api.prices.marketplaceFlowerUsdPrice === "number" && api.prices.marketplaceFlowerUsdPrice > 0)) api.prices.refreshMarketplaceFlowerUsdPrice();
  } catch (e) {}
  if (!listening) {
    listening = true;
    window.addEventListener("guroGemPackChanged", refresh);
  }
  render();
}

export function unmount() {
  if (rootEl) rootEl.removeEventListener("change", onChange);
  rootEl = null;
}
