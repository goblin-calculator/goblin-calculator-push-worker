import {
  placeSaveBar
} from "./chunk.X4KTTJ4Z.js";

// src/pages/boost.js
function mount(root, api) {
  const wrap = document.getElementById("allBoostSettingsWrap");
  if (wrap) wrap.classList.remove("collapsed");
  placeSaveBar("boostSaveSlotBoost");
  api.ui.renderSeasonToggle();
  api.ui.renderBoostPanel();
  api.calc.updateSkillSaveBarState();
}
function unmount() {
}
function canLeave(nextId, api) {
  if (nextId === "boost" || nextId === "skilltree") return true;
  if (api.calc.isSkillDraftDirty() || api.calc.isBoostDraftDirty()) {
    api.calc.toast("\u26A0\uFE0F Save your changes first");
    const bar = document.getElementById("skillSaveBar");
    if (bar) bar.scrollIntoView({
      behavior: "smooth",
      block: "center"
    });
    return false;
  }
  return true;
}

export {
  mount,
  unmount,
  canLeave
};
