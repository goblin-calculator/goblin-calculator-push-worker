import { PAGES, DEFAULT_PAGE_ID, pageById, pageForPath } from "./pages/registry.js";
import { fillPageIcons, setActivePageInNav, setPageTitle } from "./nav.js";

import { api } from "./api.js";

let current = null;

let currentModule = null;

let navToken = 0;

function container() {
  return document.getElementById("pageContainer");
}

function stash() {
  return document.getElementById("guroPageStash");
}

async function showPage(id) {
  const page = pageById(id);
  if (!page) return false;
  const token = ++navToken;
  const mod = await page.load();
  if (token !== navToken) return false;
  if (current && current.id !== id) {
    if (currentModule && currentModule.unmount) currentModule.unmount();
    const oldRoot = document.getElementById(current.root);
    if (oldRoot) stash().appendChild(oldRoot);
  }
  const root = document.getElementById(page.root);
  if (root.parentElement !== container()) container().appendChild(root);
  current = page;
  currentModule = mod;
  setActivePageInNav(id);
  setPageTitle(id);
  document.body.classList.toggle("guro-own-sync", id === "digging" || id === "potionroom" || id === "auctionleaderboard");
  document.body.classList.toggle("guro-show-profile", id === "profile");
  document.body.classList.toggle("guro-show-rate", id === "growing" || id === "coinconverter");
  document.title = page.label + " · SFL GURO";
  if (mod.mount) mod.mount(root, api);
  fillPageIcons();
  return true;
}

function canLeaveTo(nextId) {
  if (!current || !currentModule || !currentModule.canLeave) return true;
  return currentModule.canLeave(nextId, api);
}

export async function navigateTo(id, mode = "push") {
  const page = pageById(id);
  if (!page) return;
  if (current && current.id === id) return;
  if (!canLeaveTo(id)) {
    if (mode === "pop" && current) window.history.pushState({
      page: current.id
    }, "", current.path);
    return;
  }
  const shown = await showPage(id);
  if (!shown) return;
  if (mode === "push") window.history.pushState({
    page: id
  }, "", page.path + window.location.search);
  if (mode === "replace") window.history.replaceState({
    page: id
  }, "", page.path + window.location.search);
}

export function currentPageId() {
  return current ? current.id : null;
}

export async function initRouter() {
  const found = pageForPath(window.location.pathname);
  const startId = found ? found.id : DEFAULT_PAGE_ID;
  await navigateTo(startId, "replace");
  window.addEventListener("popstate", () => {
    const p = pageForPath(window.location.pathname);
    navigateTo(p ? p.id : DEFAULT_PAGE_ID, "pop");
  });
}

export function allPages() {
  return PAGES;
}
