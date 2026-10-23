import { ICON_DATA } from "../icon_data.js";
import { CONFIRM_ICON } from "../confirm_icon.js";

let FLOWER_ICON = "";

let escapeHtml = s => String(s);

let getIcon = () => "";

let loadGoals = () => [];

let saveGoals = () => {};

let evaluateGoals = () => ({
  inv: {
    rows: [],
    net: 0,
    ready: false
  },
  goals: []
});

let sftCandidates = () => [];

let sftPrice = () => null;

const SEARCH_ICON = `<svg class="pf-search-icon" viewBox="0 0 12 12" width="14" height="14" shape-rendering="crispEdges" aria-hidden="true"><path fill="currentColor" d="M3 1h4v1h1v1h1v4H8v1H7v1H3V8H2V7H1V3h1V2h1zm1 1v1H3v1H2v2h1v1h1v1h2V8h1V7h1V4H8V3H7V2zM8 8h1v1h1v1h1v1h-1v-1H9V9H8z"/></svg>`;

let rootEl = null;

let query = "";

let picked = null;

let menuOpen = false;

let listenersOn = false;

function money(n) {
  if (n == null || !isFinite(n)) return "—";
  return n.toLocaleString(undefined, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  });
}

function qtyText(n) {
  if (n < 1) return n.toFixed(2);
  return Math.floor(n).toLocaleString();
}

function inventoryRowHtml(r) {
  return `<div class="pf-row">${getIcon(r.name)}<span class="pf-row-name">${escapeHtml(r.name)} ×${qtyText(r.qty)}</span><span class="pf-row-val">${money(r.value)}${FLOWER_ICON}</span></div>`;
}

function goalPriceRowHtml(g) {
  const val = g.price != null ? `${money(g.price)}${FLOWER_ICON}` : "—";
  return `<div class="pf-row">${getIcon(g.name)}<span class="pf-row-name">${escapeHtml(g.name)}</span><span class="pf-row-val">${val}</span><button type="button" class="pf-remove" data-pf-remove="${escapeHtml(g.name)}" aria-label="Remove ${escapeHtml(g.name)}"><img src="${ICON_DATA["close.png"]}" alt="Remove"></button></div>`;
}

function goalTileHtml(g, net) {
  const hasPrice = g.price != null;
  const pct = hasPrice ? g.pct : 0;
  const fill = Math.max(0, Math.min(pct, 100));
  const status = g.reached ? CONFIRM_ICON : `<span class="pf-missing-val">${hasPrice ? money(g.missing) : "—"}${FLOWER_ICON}</span>`;
  return `<div class="pf-tile guro-frame${g.reached ? " is-reached" : ""}">
    <div class="pf-tile-head">${getIcon(g.name)}<span class="pf-tile-name">${escapeHtml(g.name)}</span></div>
    <div class="pf-tile-ratio">${money(net)} / ${hasPrice ? money(g.price) : "—"}</div>
    <div class="pf-bar guro-frame"><div class="pf-bar-fill" style="width:${fill}%"></div><span class="pf-bar-text">${hasPrice ? pct.toFixed(2) : "0.00"}%</span></div>
    <div class="pf-tile-foot"><span class="pf-missing-label">Still Need</span>${status}</div>
  </div>`;
}

function menuHtml() {
  if (!menuOpen) return "";
  const q = query.trim().toLowerCase();
  const list = sftCandidates().filter(c => !q || c.name.toLowerCase().indexOf(q) !== -1).slice(0, 40);
  if (!list.length) return `<div class="pf-menu guro-frame"><div class="pf-menu-empty">No priced collectibles or wearables found</div></div>`;
  return `<div class="pf-menu guro-frame">${list.map(c => `<div class="pf-menu-opt" data-pf-pick="${escapeHtml(c.name)}">${getIcon(c.name)}<span class="pf-row-name">${escapeHtml(c.name)}</span><span class="pf-kind">${c.kind === "wearable" ? "Wearable" : "Collectible"}</span><span class="pf-row-val">${money(sftPrice(c.name))}${FLOWER_ICON}</span></div>`).join("")}</div>`;
}

function renderMenuOnly() {
  const slot = rootEl && rootEl.querySelector("[data-pf-menu-slot]");
  if (slot) slot.innerHTML = menuHtml();
}

function render() {
  if (!rootEl) return;
  const keep = rootEl.querySelector("#pfSearchInput");
  const hadFocus = keep && document.activeElement === keep;
  const {inv: inv, goals: goals} = evaluateGoals();
  const invRows = inv.rows.length ? inv.rows.map(inventoryRowHtml).join("") : `<div class="pf-empty">${inv.ready ? "No tradable resources found" : "Sync a Farm ID to see your inventory"}</div>`;
  const priceRows = goals.length ? goals.map(goalPriceRowHtml).join("") : `<div class="pf-empty">No SFT added yet</div>`;
  const cards = goals.length ? goals.map(g => goalTileHtml(g, inv.net)).join("") : `<div class="pf-empty">Add an SFT to track your goal</div>`;
  rootEl.innerHTML = `<div class="pf-wrap">
    <div class="pf-side">
    <div class="pf-value guro-frame"><span class="pf-value-label">Net Inventory Value</span><span class="pf-value-num">${money(inv.net)}${FLOWER_ICON}</span></div>
    <div class="pf-box guro-frame">
      <div class="pf-title">Inventory</div>
      <div class="pf-list">${invRows}</div>
    </div>
    </div>
    <div class="pf-box pf-main guro-frame">
      <div class="pf-title">SFT GOAL</div>
      <div class="pf-add-row">
        <div class="pf-search-wrap">
          <div class="pf-search guro-frame">${SEARCH_ICON}<input type="text" id="pfSearchInput" placeholder="Search collectibles or wearables" autocomplete="off" value="${escapeHtml(query)}"></div>
          <div data-pf-menu-slot>${menuHtml()}</div>
        </div>
        <button type="button" class="pf-add-btn guro-frame" id="pfAddBtn">Add SFT</button>
      </div>
      <div class="pf-cols">
        <div class="pf-col guro-frame"><div class="pf-list">${priceRows}</div></div>
        <div class="pf-col pf-col-tiles guro-frame"><div class="pf-tiles">${cards}</div></div>
      </div>
    </div>
  </div>`;
  if (hadFocus) {
    const el = rootEl.querySelector("#pfSearchInput");
    if (el) {
      el.focus();
      const len = el.value.length;
      try {
        el.setSelectionRange(len, len);
      } catch (e) {}
    }
  }
}

function addCurrent() {
  const candidates = sftCandidates();
  const q = query.trim().toLowerCase();
  let hit = null;
  if (picked) hit = candidates.find(c => c.name === picked);
  if (!hit && q) hit = candidates.find(c => c.name.toLowerCase() === q) || candidates.find(c => c.name.toLowerCase().indexOf(q) !== -1);
  if (!hit) {
    menuOpen = true;
    renderMenuOnly();
    return;
  }
  const list = loadGoals();
  if (!list.some(g => g.name === hit.name)) {
    list.push({
      name: hit.name,
      kind: hit.kind
    });
    saveGoals(list);
  }
  query = "";
  picked = null;
  menuOpen = false;
  render();
  window.dispatchEvent(new Event("guroGoalsChanged"));
}

function onClick(e) {
  const rm = e.target.closest("[data-pf-remove]");
  if (rm) {
    saveGoals(loadGoals().filter(g => g.name !== rm.dataset.pfRemove));
    render();
    window.dispatchEvent(new Event("guroGoalsChanged"));
    return;
  }
  const pick = e.target.closest("[data-pf-pick]");
  if (pick) {
    picked = pick.dataset.pfPick;
    query = picked;
    menuOpen = false;
    render();
    return;
  }
  if (e.target.closest("#pfAddBtn")) {
    addCurrent();
    return;
  }
  if (!e.target.closest(".pf-search-wrap") && menuOpen) {
    menuOpen = false;
    renderMenuOnly();
  }
}

function onInput(e) {
  if (e.target.id !== "pfSearchInput") return;
  query = e.target.value;
  picked = null;
  menuOpen = true;
  renderMenuOnly();
}

function onFocusIn(e) {
  if (e.target.id !== "pfSearchInput") return;
  menuOpen = true;
  renderMenuOnly();
}

function onKey(e) {
  if (e.target.id === "pfSearchInput" && e.key === "Enter") {
    e.preventDefault();
    addCurrent();
  }
}

function refresh() {
  if (!rootEl || !document.body.classList.contains("guro-show-profile")) return;
  render();
}

export async function mount(root, api) {
  FLOWER_ICON = api.calc.FLOWER_ICON;
  escapeHtml = api.calc.escapeHtml;
  getIcon = api.ui.getIcon;
  const goals = await import("../sft_goals.js");
  goals.bindApi(api);
  loadGoals = goals.loadGoals;
  saveGoals = goals.saveGoals;
  evaluateGoals = goals.evaluateGoals;
  sftCandidates = goals.sftCandidates;
  sftPrice = goals.sftPrice;
  rootEl = root;
  query = "";
  picked = null;
  menuOpen = false;
  root.addEventListener("click", onClick);
  root.addEventListener("input", onInput);
  root.addEventListener("focusin", onFocusIn);
  root.addEventListener("keydown", onKey);
  if (!listenersOn) {
    listenersOn = true;
    window.addEventListener("guroFarmSaved", refresh);
    window.addEventListener("guroPricesUpdated", refresh);
  }
  try {
    api.prices.ensureCosmeticPricesLoaded();
  } catch (e) {}
  render();
}

export function unmount() {
  if (!rootEl) return;
  rootEl.removeEventListener("click", onClick);
  rootEl.removeEventListener("input", onInput);
  rootEl.removeEventListener("focusin", onFocusIn);
  rootEl.removeEventListener("keydown", onKey);
  rootEl = null;
}
