import { placeSaveBar } from "./shared.js";

export function mount(root, api) {
  const wrap = document.getElementById("allBoostSettingsWrap");
  if (wrap) wrap.classList.remove("collapsed");
  placeSaveBar("boostSaveSlotBoost");
  api.ui.renderSeasonToggle();
  api.ui.renderBoostPanel();
  api.calc.updateSkillSaveBarState();
}

export function unmount() {}

export function canLeave(nextId, api) {
  if (nextId === "boost" || nextId === "skilltree") return true;
  if (api.calc.isSkillDraftDirty() || api.calc.isBoostDraftDirty()) {
    api.calc.toast("⚠️ Save your changes first");
    const bar = document.getElementById("skillSaveBar");
    if (bar) bar.scrollIntoView({
      behavior: "smooth",
      block: "center"
    });
    return false;
  }
  return true;
}
