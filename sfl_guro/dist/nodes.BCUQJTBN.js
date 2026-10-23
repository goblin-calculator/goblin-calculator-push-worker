import {
  setOpenClass
} from "./chunk.X4KTTJ4Z.js";
import "./chunk.AS3VMXOQ.js";

// src/pages/nodes.js
function mount(root, api) {
  setOpenClass("plotsPanel", true);
  api.ui.renderPlotNodeInputs();
}
function unmount() {
  setOpenClass("plotsPanel", false);
}
export {
  mount,
  unmount
};
