import { mountExpTools, unmountExpTools, expToolsCanLeave } from "../exp_tools.js";

export function mount(root, api) {
  mountExpTools(root);
  api.ui.renderCookingPanel();
}

export function unmount() {
  unmountExpTools();
}

export function canLeave() {
  return expToolsCanLeave();
}
