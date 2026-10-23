import { USER_GUIDES, APP_ABOUT, guideById } from "../user_guide_data.js";
import { navigateTo } from "../router.js";
import { ICON_DATA } from "../icon_data.js";

let rootEl = null;
let activeId = USER_GUIDES[0].id;
let aboutOpen = false;

function escapeHtml(s) {
  return String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}

function linksHtml() {
  return USER_GUIDES.map(g => `<button type="button" class="ug-link${g.id === activeId ? " is-active" : ""}" data-ug-id="${g.id}" aria-pressed="${g.id === activeId ? "true" : "false"}">${escapeHtml(g.label)}</button>`).join("");
}

function detailHtml() {
  const g = guideById(activeId);
  const steps = g.steps.map((t, i) => `<li class="ug-step"><span class="ug-num">${i + 1}</span><span class="ug-step-text">${escapeHtml(t)}</span></li>`).join("");
  return `<div class="ug-detail-head">
    <div class="ug-detail-title">${escapeHtml(g.title)}</div>
    <button type="button" class="btn btn-sun ug-open" data-ug-open="${g.id}">Open this panel</button>
  </div>
  <div class="ug-detail-grid">
    <div class="ug-image"><picture><source media="(min-width:700px)" srcset="./icons/guide/${g.id}-desktop.webp"><img src="./icons/guide/${g.id}.webp" alt="${escapeHtml(g.title)} panel as it looks in the app, with numbered marks matching the steps" loading="lazy" decoding="async" draggable="false"></picture></div>
    <div class="ug-text">
      <div class="ug-what-label">What this panel does</div>
      <p class="ug-intro">${escapeHtml(g.intro)}</p>
      <div class="ug-what-label">How I use it</div>
      <ol class="ug-steps">${steps}</ol>
    </div>
  </div>`;
}

function aboutHtml() {
  const a = APP_ABOUT;
  const list = items => items.map(t => `<li>${escapeHtml(t)}</li>`).join("");
  const can = a.canDo.map(c => `<li><span class="ug-can-head">${escapeHtml(c.head)}</span><span class="ug-can-text">${escapeHtml(c.text)}</span></li>`).join("");
  const start = a.start.map((t, i) => `<li class="ug-step"><span class="ug-num">${i + 1}</span><span class="ug-step-text">${escapeHtml(t)}</span></li>`).join("");
  return `<div class="ug-about-wrap${aboutOpen ? " is-open" : ""}">
  <button type="button" class="ug-about-btn" data-ug-about="1" aria-expanded="${aboutOpen ? "true" : "false"}"><span>${escapeHtml(a.title)}</span><img class="ug-about-chev" src="${ICON_DATA["chevron_down.png"]}" alt=""></button>
  <section class="ug-about guro-frame" aria-label="About the app"${aboutOpen ? "" : " hidden"}>
    <p class="ug-intro">${escapeHtml(a.summary)}</p>
    <div class="ug-about-grid">
      <div class="ug-about-col">
        <div class="ug-what-label">What it is for</div>
        <ul class="ug-bullets">${list(a.purpose)}</ul>
        <div class="ug-what-label">Getting started</div>
        <ol class="ug-steps">${start}</ol>
      </div>
      <div class="ug-about-col">
        <div class="ug-what-label">What it can do</div>
        <ul class="ug-can">${can}</ul>
      </div>
    </div>
    <p class="ug-note">${escapeHtml(a.note)}</p>
  </section>
  </div>`;
}

function render() {
  if (!rootEl) return;
  rootEl.innerHTML = `<div class="ug-page">
    ${aboutHtml()}
    <div class="ug-wrap">
      <section class="ug-pick guro-frame" aria-label="Choose a panel">
        <div class="ug-pick-label">Choose a panel</div>
        <div class="ug-links" id="ugLinks">${linksHtml()}</div>
      </section>
      <section class="ug-detail guro-frame" id="ugDetail" aria-live="polite">${detailHtml()}</section>
    </div>
  </div>`;
}

function select(id) {
  if (id === activeId) return;
  activeId = id;
  const links = rootEl.querySelectorAll(".ug-link");
  links.forEach(b => {
    const on = b.getAttribute("data-ug-id") === id;
    b.classList.toggle("is-active", on);
    b.setAttribute("aria-pressed", on ? "true" : "false");
  });
  const detail = rootEl.querySelector("#ugDetail");
  detail.innerHTML = detailHtml();
  if (window.matchMedia("(max-width:1023px)").matches) detail.scrollIntoView({ block: "start", behavior: "smooth" });
}

function onClick(e) {
  const about = e.target.closest("[data-ug-about]");
  if (about) {
    aboutOpen = !aboutOpen;
    const wrap = about.closest(".ug-about-wrap");
    wrap.classList.toggle("is-open", aboutOpen);
    about.setAttribute("aria-expanded", aboutOpen ? "true" : "false");
    wrap.querySelector(".ug-about").hidden = !aboutOpen;
    return;
  }
  const open = e.target.closest("[data-ug-open]");
  if (open) {
    navigateTo(open.getAttribute("data-ug-open"));
    return;
  }
  const link = e.target.closest("[data-ug-id]");
  if (link) select(link.getAttribute("data-ug-id"));
}

export function mount(root) {
  rootEl = root;
  root.addEventListener("click", onClick);
  render();
}

export function unmount() {
  if (rootEl) rootEl.removeEventListener("click", onClick);
  rootEl = null;
}
