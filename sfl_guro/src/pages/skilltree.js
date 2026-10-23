import { placeSaveBar } from "./shared.js";

import { canLeave as boostCanLeave } from "./boost.js";

export function mount(root, api) {
  placeSaveBar("boostSaveSlotSkill");
  api.calc.setSkillTreeSectionOpen(true);
  api.ui.renderSkillPanel();
  api.ui.renderAscensionBar();
  api.calc.updateSkillSaveBarState();
}

export function unmount() {}

export function canLeave(nextId, api) {
  return boostCanLeave(nextId, api);
}
