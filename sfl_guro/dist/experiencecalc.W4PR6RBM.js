import {
  BOOSTS,
  SKILL_CATEGORY_META,
  discardSkillBoostDrafts,
  draftToggleBoost,
  escapeHtml,
  getBoostIcon,
  isBoostDraftActive,
  isBoostDraftDirty,
  isSeasonLocked,
  isSkillDraftDirty,
  renderAscensionBar,
  renderCookingPanel,
  renderSkillPanel,
  setSkillCategory,
  skillCategory,
  toast,
  updateSkillSaveBarState
} from "./chunk.D7LWHYJT.js";
import "./chunk.LPEVZJ4B.js";
import "./chunk.VR6FV3KR.js";
import "./chunk.AS3VMXOQ.js";

// src/exp_tools.js
var SKILL_TABS = ["cooking", "fishing", "bees"];
var host = null;
var popup = null;
var overlayEl = null;
var promptEl = null;
var restoreFns = [];
var savedSkillCategory = null;
var activeTab = "cooking";
var listening = false;
function esc(s) {
  return escapeHtml(String(s));
}
function n2(n) {
  return Number(n).toLocaleString(void 0, {
    minimumFractionDigits: 0,
    maximumFractionDigits: 3
  });
}
function pct(mult) {
  return `+${n2((mult - 1) * 100)}%`;
}
function expBoosts() {
  return BOOSTS.filter((b) => b.category === "cooking" || b.agedFishXpMult);
}
function boostGroupLabel(b) {
  if (b.id === "vip_access") return "VIP";
  if (b.portBud) return "Buds";
  if (b.scope === "cookTimeGlobal") return "Cooking Time";
  if (b.agedFishXpMult) return "Fish Aging";
  return "Food and Fish EXP";
}
function boostEffectText(b) {
  const parts = [];
  if (b.expMult) {
    const target = b.scope === "foodFish" ? "fish dish EXP" : b.scope === "foodCake" ? "cake EXP" : b.scope === "foodSpecific" ? "EXP on its dish" : "EXP";
    parts.push(b.expMult >= 2 && b.scope === "foodSpecific" ? `\xD7${n2(b.expMult)} ${target}` : `${pct(b.expMult)} ${target}`);
  }
  if (b.expAdd) parts.push(`+${n2(b.expAdd)} flat EXP`);
  if (b.timeMult) parts.push(`${n2((b.timeMult - 1) * 100)}% cooking time`);
  if (b.agedFishXpMult) parts.push(`\xD7${n2(b.agedFishXpMult)} aged fish EXP`);
  return parts.join(", ");
}
function boostRowHtml(b) {
  const locked = isSeasonLocked(b);
  const active = isBoostDraftActive(b.id);
  const mark = locked ? "\u{1F512}" : active ? "\u2705" : "\u2B1C";
  const note = b.note && b.note.length < 80 ? ` \xB7 ${b.note}` : "";
  return `<div class="lib-item-row rc-boost-pick${active ? " boost-active" : ""}${locked ? " season-locked" : ""}" data-boost-id="${b.id}"><span class="lib-item-icon">${mark}</span><div class="lib-item-main"><div class="lib-item-name">${getBoostIcon(b.name)}${esc(b.name)}</div><div class="lib-item-meta">${esc(boostEffectText(b))}${esc(note)}</div></div></div>`;
}
function boostBodyHtml() {
  const order = ["VIP", "Food and Fish EXP", "Buds", "Cooking Time", "Fish Aging"];
  const groups = {};
  expBoosts().forEach((b) => {
    const g = boostGroupLabel(b);
    (groups[g] = groups[g] || []).push(b);
  });
  const html = order.filter((g) => groups[g]).map((g) => `<div class="rc-boost-section"><div class="rc-boost-section-title">${g}</div>${groups[g].map(boostRowHtml).join("")}</div>`).join("");
  return `<div class="rc-pop-hint">Every boost that changes the EXP or cooking time of your plan. Tap a boost to switch it on or off, then press Save. Only your best Port Bud counts, like in the game.</div>${html}`;
}
function skillsBodyHtml() {
  const tabs = SKILL_TABS.map((id) => {
    const meta = SKILL_CATEGORY_META.find((c) => c.id === id);
    return meta ? `<button type="button" class="exp-skill-tab guro-frame${id === activeTab ? " is-on" : ""}" data-exp-tab="${id}" aria-pressed="${id === activeTab ? "true" : "false"}">${meta.label}</button>` : "";
  }).join("");
  return `<div class="rc-pop-hint">Skills that change food and fish EXP live in the Cooking, Fishing and Bees skill trees. Changes here also change the Skill Tree. Press Save to apply them.</div><div class="exp-skill-tabs">${tabs}</div><div id="rcAscSlot"></div><div id="rcSkillSlot"></div>`;
}
function popupTitle() {
  return popup === "skills" ? "EXP Skills" : "EXP Boosts";
}
function popupBodyHtml() {
  return popup === "boost" ? boostBodyHtml() : skillsBodyHtml();
}
function borrow(id, slotId) {
  const el = document.getElementById(id);
  const slot = document.getElementById(slotId);
  if (!el || !slot) return;
  const parent = el.parentNode;
  const next = el.nextSibling;
  slot.appendChild(el);
  restoreFns.push(() => {
    if (!parent) return;
    if (next && next.parentNode === parent) parent.insertBefore(el, next);
    else parent.appendChild(el);
  });
}
function releaseBorrowed() {
  while (restoreFns.length) restoreFns.pop()();
}
function setupBorrowed() {
  if (popup === "skills") {
    savedSkillCategory = skillCategory;
    setSkillCategory(activeTab);
    borrow("ascensionBar", "rcAscSlot");
    borrow("skillListWrap", "rcSkillSlot");
    borrow("skillSaveBar", "rcSaveSlot");
    renderSkillPanel();
    renderAscensionBar();
    updateSkillSaveBarState();
  } else if (popup === "boost") {
    borrow("skillSaveBar", "rcSaveSlot");
    updateSkillSaveBarState();
  }
}
function teardownBorrowed() {
  releaseBorrowed();
  if (savedSkillCategory != null) {
    setSkillCategory(savedSkillCategory);
    savedSkillCategory = null;
    renderSkillPanel();
  }
}
function overlayHtml() {
  return `<div class="rc-pop guro-frame" role="dialog" aria-modal="true" aria-label="${popupTitle()}">
    <div class="rc-pop-head"><span class="rc-pop-title">${popupTitle()}</span><button type="button" class="rc-pop-close" data-exp-close aria-label="Close">\u2715</button></div>
    <div class="rc-pop-body" id="rcPopBody">${popupBodyHtml()}</div>
    <div class="rc-pop-foot"><div id="rcSaveSlot"></div></div>
  </div>`;
}
function renderBoostBody() {
  if (!overlayEl || popup !== "boost") return;
  const body = overlayEl.querySelector("#rcPopBody");
  if (!body) return;
  const top = body.scrollTop;
  body.innerHTML = boostBodyHtml();
  body.scrollTop = top;
  updateSkillSaveBarState();
}
function isDirty() {
  return isSkillDraftDirty() || isBoostDraftDirty();
}
function openPopup(kind) {
  if (popup) return;
  popup = kind;
  overlayEl = document.createElement("div");
  overlayEl.className = "rc-overlay";
  overlayEl.innerHTML = overlayHtml();
  document.body.appendChild(overlayEl);
  document.body.classList.add("rc-no-scroll");
  setupBorrowed();
}
function destroyPopup() {
  teardownBorrowed();
  if (overlayEl) overlayEl.remove();
  overlayEl = null;
  popup = null;
  document.body.classList.remove("rc-no-scroll");
}
function showPrompt(message, buttons) {
  if (promptEl) promptEl.remove();
  promptEl = document.createElement("div");
  promptEl.className = "rc-overlay rc-overlay-top";
  promptEl.innerHTML = `<div class="rc-prompt guro-frame" role="alertdialog" aria-modal="true"><p class="rc-prompt-text">${esc(message)}</p><div class="rc-prompt-actions">${buttons.map((b, i) => `<button type="button" class="rc-prompt-btn guro-frame" data-exp-prompt="${i}">${esc(b.label)}</button>`).join("")}</div></div>`;
  promptEl.addEventListener("click", (e) => {
    const btn = e.target.closest("[data-exp-prompt]");
    if (!btn) return;
    const b = buttons[Number(btn.getAttribute("data-exp-prompt"))];
    promptEl.remove();
    promptEl = null;
    if (b && b.run) b.run();
  });
  document.body.appendChild(promptEl);
  const first = promptEl.querySelector("button");
  if (first) first.focus();
}
function closePopup(force) {
  if (!popup) return;
  if (!force && isDirty()) {
    showPrompt("You have unsaved changes. Save them first, or discard them to close.", [{
      label: "Keep Editing"
    }, {
      label: "Discard",
      run: () => {
        discardSkillBoostDrafts();
        destroyPopup();
        renderCookingPanel();
      }
    }]);
    return;
  }
  destroyPopup();
  renderCookingPanel();
}
function switchTab(id) {
  if (id === activeTab || !overlayEl) return;
  activeTab = id;
  setSkillCategory(id);
  renderSkillPanel();
  overlayEl.querySelectorAll("[data-exp-tab]").forEach((b) => {
    const on = b.getAttribute("data-exp-tab") === id;
    b.classList.toggle("is-on", on);
    b.setAttribute("aria-pressed", on ? "true" : "false");
  });
}
function onHostClick(e) {
  const open = e.target.closest("[data-exp-open]");
  if (open) openPopup(open.getAttribute("data-exp-open"));
}
function onDocClick(e) {
  if (!overlayEl) return;
  if (promptEl && promptEl.contains(e.target)) return;
  if (e.target === overlayEl || e.target.closest("[data-exp-close]")) {
    closePopup(false);
    return;
  }
  if (!overlayEl.contains(e.target)) return;
  const tab = e.target.closest("[data-exp-tab]");
  if (tab) {
    switchTab(tab.getAttribute("data-exp-tab"));
    return;
  }
  const row = e.target.closest("[data-boost-id]");
  if (row && popup === "boost" && overlayEl.contains(row)) {
    draftToggleBoost(row.getAttribute("data-boost-id"));
    renderBoostBody();
  }
}
function onKey(e) {
  if (e.key !== "Escape") return;
  if (promptEl) {
    promptEl.remove();
    promptEl = null;
    return;
  }
  if (popup) closePopup(false);
}
function onBoostsChanged() {
  if (popup === "boost") renderBoostBody();
}
function mountExpTools(root) {
  host = root;
  host.addEventListener("click", onHostClick);
  document.addEventListener("click", onDocClick);
  document.addEventListener("keydown", onKey);
  window.addEventListener("guroBoostsChanged", onBoostsChanged);
  listening = true;
}
function unmountExpTools() {
  if (popup) destroyPopup();
  if (promptEl) {
    promptEl.remove();
    promptEl = null;
  }
  if (host) host.removeEventListener("click", onHostClick);
  if (listening) {
    document.removeEventListener("click", onDocClick);
    document.removeEventListener("keydown", onKey);
    window.removeEventListener("guroBoostsChanged", onBoostsChanged);
    listening = false;
  }
  host = null;
}
function expToolsCanLeave() {
  if (!popup) return true;
  if (isDirty()) {
    toast("\u26A0\uFE0F Save your changes first");
    return false;
  }
  destroyPopup();
  return true;
}

// src/pages/experiencecalc.js
function mount(root, api) {
  mountExpTools(root);
  api.ui.renderCookingPanel();
}
function unmount() {
  unmountExpTools();
}
function canLeave() {
  return expToolsCanLeave();
}
export {
  canLeave,
  mount,
  unmount
};
