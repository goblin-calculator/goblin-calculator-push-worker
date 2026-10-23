import {
  setOpenClass
} from "./chunk.X4KTTJ4Z.js";
import "./chunk.AS3VMXOQ.js";

// src/pages/digging.js
var onTitleClick = null;
function setDataMode(root, on) {
  root.classList.toggle("dig-show-data", on);
  const btn = document.getElementById("digDataToggleBtn");
  if (btn) btn.textContent = on ? "Map" : "Data";
}
function mount(root, api) {
  setOpenClass("digSidePanel", true);
  setDataMode(root, false);
  const bar = document.getElementById("guroPageTitle");
  if (bar) {
    onTitleClick = (ev) => {
      if (!ev.target.closest("#digDataToggleBtn")) return;
      setDataMode(root, !root.classList.contains("dig-show-data"));
    };
    bar.addEventListener("click", onTitleClick);
  }
  api.ui.renderDigTreasurePanel();
}
function unmount() {
  setOpenClass("digSidePanel", false);
  const bar = document.getElementById("guroPageTitle");
  if (bar && onTitleClick) bar.removeEventListener("click", onTitleClick);
  onTitleClick = null;
  const root = document.getElementById("pageDigging");
  if (root) root.classList.remove("dig-show-data");
}
export {
  mount,
  unmount
};
