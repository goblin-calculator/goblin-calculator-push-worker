import {
  canLeave
} from "./chunk.LE2PW24O.js";
import {
  placeSaveBar
} from "./chunk.X4KTTJ4Z.js";
import "./chunk.AS3VMXOQ.js";

// src/pages/skilltree.js
function mount(root, api) {
  placeSaveBar("boostSaveSlotSkill");
  api.calc.setSkillTreeSectionOpen(true);
  api.ui.renderSkillPanel();
  api.ui.renderAscensionBar();
  api.calc.updateSkillSaveBarState();
}
function unmount() {
}
function canLeave2(nextId, api) {
  return canLeave(nextId, api);
}
export {
  canLeave2 as canLeave,
  mount,
  unmount
};
