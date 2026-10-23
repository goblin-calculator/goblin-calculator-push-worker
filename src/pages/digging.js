import { setOpenClass } from "./shared.js";

let onTitleClick = null;

function setDataMode(root, on) {
  root.classList.toggle("dig-show-data", on);
  const btn = document.getElementById("digDataToggleBtn");
  if (btn) btn.textContent = on ? "Map" : "Data";
}

export function mount(root, api) {
  setOpenClass("digSidePanel", true);
  setDataMode(root, false);
  const bar = document.getElementById("guroPageTitle");
  if (bar) {
    onTitleClick = ev => {
      if (!ev.target.closest("#digDataToggleBtn")) return;
      setDataMode(root, !root.classList.contains("dig-show-data"));
    };
    bar.addEventListener("click", onTitleClick);
  }
  api.ui.renderDigTreasurePanel();
}

export function unmount() {
  setOpenClass("digSidePanel", false);
  const bar = document.getElementById("guroPageTitle");
  if (bar && onTitleClick) bar.removeEventListener("click", onTitleClick);
  onTitleClick = null;
  const root = document.getElementById("pageDigging");
  if (root) root.classList.remove("dig-show-data");
}
