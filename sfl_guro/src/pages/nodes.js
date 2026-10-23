import { setOpenClass } from "./shared.js";

export function mount(root, api) {
  setOpenClass("plotsPanel", true);
  api.ui.renderPlotNodeInputs();
}

export function unmount() {
  setOpenClass("plotsPanel", false);
}
