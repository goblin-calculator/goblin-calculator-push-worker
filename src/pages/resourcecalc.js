import { mountCropsCalculator, unmountCropsCalculator, cropsCalculatorCanLeave } from "../rescalc_crops.js";
import { mountFruitsCalculator, unmountFruitsCalculator, fruitsCalculatorCanLeave } from "../rescalc_fruits.js";
import { mountGreenhouseCalculator, unmountGreenhouseCalculator, greenhouseCalculatorCanLeave } from "../rescalc_greenhouse.js";
import { mountResourcesCalculator, unmountResourcesCalculator, resourcesCalculatorCanLeave } from "../rescalc_resources.js";
import { mountHoneyCalculator, unmountHoneyCalculator, honeyCalculatorCanLeave } from "../rescalc_honey.js";

const CALCULATORS = [ {
  id: "crops",
  label: "Crops Calculator",
  mount: mountCropsCalculator,
  unmount: unmountCropsCalculator,
  canLeave: cropsCalculatorCanLeave
}, {
  id: "fruits",
  label: "Fruit Calculator",
  mount: mountFruitsCalculator,
  unmount: unmountFruitsCalculator,
  canLeave: fruitsCalculatorCanLeave
}, {
  id: "greenhouse",
  label: "Greenhouse Calculator",
  mount: mountGreenhouseCalculator,
  unmount: unmountGreenhouseCalculator,
  canLeave: greenhouseCalculatorCanLeave
}, {
  id: "resources",
  label: "Resources Calculator",
  mount: mountResourcesCalculator,
  unmount: unmountResourcesCalculator,
  canLeave: resourcesCalculatorCanLeave
}, {
  id: "honey",
  label: "Honey Calculator",
  mount: mountHoneyCalculator,
  unmount: unmountHoneyCalculator,
  canLeave: honeyCalculatorCanLeave
} ];

let rootEl = null;
let activeId = CALCULATORS[0].id;
let activeCalc = null;

function escapeHtml(s) {
  return String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}

function linksHtml() {
  return CALCULATORS.map(c => `<button type="button" class="rc-link${c.id === activeId ? " is-active" : ""}" data-rc-calc="${c.id}" aria-pressed="${c.id === activeId ? "true" : "false"}">${escapeHtml(c.label)}</button>`).join("");
}

function shellHtml() {
  return `<div class="rc-page">
    <section class="rc-intro guro-frame" aria-label="About this panel">
      <div class="rc-intro-title">Resource Calculators</div>
      <p class="rc-intro-text">Pick a calculator to see the profit or loss of your resources. Every calculator uses your own skills, boosts, nodes, market prices and the Flower/Gem ratio from Settings.</p>
    </section>
    <section class="rc-pick guro-frame" aria-label="Choose a calculator">
      <div class="rc-pick-label">Calculators</div>
      <div class="rc-links" id="rcLinks">${linksHtml()}</div>
    </section>
    <section class="rc-display guro-frame" id="rcDisplay" aria-live="polite"><div id="rcDisplayHost"></div></section>
  </div>`;
}

function showCalculator(id) {
  const next = CALCULATORS.find(c => c.id === id);
  if (!next) return;
  if (activeCalc && activeCalc.unmount) activeCalc.unmount();
  activeId = next.id;
  activeCalc = next;
  const host = rootEl.querySelector("#rcDisplayHost");
  host.innerHTML = "";
  next.mount(host);
  rootEl.querySelectorAll(".rc-link").forEach(b => {
    const on = b.getAttribute("data-rc-calc") === activeId;
    b.classList.toggle("is-active", on);
    b.setAttribute("aria-pressed", on ? "true" : "false");
  });
}

function onClick(e) {
  const link = e.target.closest("[data-rc-calc]");
  if (!link) return;
  const id = link.getAttribute("data-rc-calc");
  if (id === activeId && activeCalc) return;
  if (activeCalc && activeCalc.canLeave && !activeCalc.canLeave()) return;
  showCalculator(id);
}

export function mount(root) {
  rootEl = root;
  root.innerHTML = shellHtml();
  root.addEventListener("click", onClick);
  activeCalc = null;
  showCalculator(activeId);
}

export function unmount() {
  if (activeCalc && activeCalc.unmount) activeCalc.unmount();
  activeCalc = null;
  if (rootEl) {
    rootEl.removeEventListener("click", onClick);
    rootEl.innerHTML = "";
  }
  rootEl = null;
}

export function canLeave() {
  if (activeCalc && activeCalc.canLeave) return activeCalc.canLeave();
  return true;
}
