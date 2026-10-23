import {
  setOpenClass
} from "./chunk.X4KTTJ4Z.js";
import "./chunk.AS3VMXOQ.js";

// src/pages/growing.js
function mount(root, api) {
  setOpenClass("farmSidePanel", true);
  api.ui.setFarmPanelTab("inprogress");
}
function unmount() {
  setOpenClass("farmSidePanel", false);
}
export {
  mount,
  unmount
};
