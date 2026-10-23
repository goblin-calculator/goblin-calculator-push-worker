import { setOpenClass } from "./shared.js";

export function mount(root, api) {
  setOpenClass("farmSidePanel", true);
  api.ui.setFarmPanelTab("inprogress");
}

export function unmount() {
  setOpenClass("farmSidePanel", false);
}
