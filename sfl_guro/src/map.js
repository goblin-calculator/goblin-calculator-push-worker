import { escapeHtml } from "./calculator.js";

import { $, getIcon } from "./ui.js";

import { farmPanelComputeMapNodes, farmPanelGameState } from "./inprogress.js";

const MAP_CELL = 38;

let mapPicks = [];

let mapPicksState = null;

const MAP_AXIS = 24;

function mapFmtYield(v) {
  return typeof v === "number" && isFinite(v) ? v.toFixed(2) : "";
}

function mapFmtWait(sec) {
  if (!(sec > 0)) return "Ready";
  const d = Math.floor(sec / 86400);
  const h = Math.floor(sec % 86400 / 3600);
  const m = Math.floor(sec % 3600 / 60);
  const parts = [];
  if (d) parts.push(d + "d");
  if (h) parts.push(h + "h");
  if (!d) parts.push(m + "m");
  return "Ready in " + parts.join(" ");
}

const MAP_PROC_CODES = {
  "Native": "N",
  "Tough Tree": "T",
  "Rock Golem": "G",
  "Tree Turnaround": "R",
  "Pickaxe Shark": "P",
  "Crimstone Clam": "C"
};

function mapProcChipsHtml(procs) {
  if (!procs || !procs.length) return "";
  const chips = procs.map(p => {
    const base = p.replace(/ x\d+$/, "");
    const count = (p.match(/ x(\d+)$/) || [])[1];
    return `<span class="map-node-proc proc-${(MAP_PROC_CODES[base] || "?").toLowerCase()}">${MAP_PROC_CODES[base] || "?"}${count || ""}</span>`;
  }).join("");
  return `<span class="map-node-procs">${chips}</span>`;
}

function mapNodeHtml(n, minX, maxY) {
  const left = MAP_AXIS + (n.x - minX) * MAP_CELL;
  const top = MAP_AXIS + (maxY - n.y) * MAP_CELL;
  const tip = `${n.name} (${n.x}, ${n.y})${n.w > 1 || n.h > 1 ? ` ${n.w}x${n.h}` : ""}${n.ready === false || n.remainingSec > 0 ? " - " + mapFmtWait(n.remainingSec) : n.ready === true ? " - Ready" : ""}${n.procs && n.procs.length ? " - Procs: " + n.procs.join(", ") : ""}`;
  const pickable = !!n.mapKey && n.ready === true;
  return `<div class="map-node${pickable ? " map-node-pickable" : ""}${n.pickNo ? " map-node-picked" : ""}"${pickable ? ` data-map-key="${escapeHtml(n.mapKey)}"` : ""} title="${escapeHtml(tip)}" style="left:${left}px;top:${top}px;width:${n.w * MAP_CELL}px;height:${n.h * MAP_CELL}px;">
    <span class="map-node-badge${n.badge ? " has-badge" : ""}">${n.badge ? escapeHtml(n.badge) : "&nbsp;"}</span>
    <span class="map-node-icon">${getIcon(n.name)}</span>
    <span class="map-node-yield${n.procs && n.procs.length ? " has-proc" : ""}">${mapFmtYield(n.yieldVal)}</span>
    ${mapProcChipsHtml(n.procs)}
    ${n.pickNo || n.autoNo ? `<span class="map-node-pick${n.pickNo ? "" : " map-node-auto"}">#${n.pickNo || n.autoNo}</span>` : ""}
  </div>`;
}

function mapGridHtml(nodes) {
  let minX = Infinity;
  let maxX = -Infinity;
  let minY = Infinity;
  let maxY = -Infinity;
  nodes.forEach(n => {
    minX = Math.min(minX, n.x);
    maxX = Math.max(maxX, n.x + n.w - 1);
    maxY = Math.max(maxY, n.y);
    minY = Math.min(minY, n.y - n.h + 1);
  });
  const cols = maxX - minX + 1;
  const rows = maxY - minY + 1;
  const width = MAP_AXIS + cols * MAP_CELL;
  const height = MAP_AXIS + rows * MAP_CELL;
  let axes = "";
  for (let i = 0; i < cols; i++) {
    axes += `<span class="map-axis-x" style="left:${MAP_AXIS + i * MAP_CELL}px;width:${MAP_CELL}px;">${minX + i}</span>`;
  }
  for (let j = 0; j < rows; j++) {
    axes += `<span class="map-axis-y" style="top:${MAP_AXIS + j * MAP_CELL}px;height:${MAP_CELL}px;width:${MAP_AXIS}px;">${maxY - j}</span>`;
  }
  return `<div class="map-scroll"><div class="map-grid" style="width:${width}px;height:${height}px;--map-cell:${MAP_CELL}px;--map-axis:${MAP_AXIS}px;">${axes}${nodes.map(n => mapNodeHtml(n, minX, maxY)).join("")}</div></div>`;
}

let mapGuideOpen = false;

const MAP_GUIDE_LEGEND = [
  ["Native", "Native +1"],
  ["Tough Tree", "Tough Tree x3"],
  ["Rock Golem", "Rock Golem +2"],
  ["Tree Turnaround", "Tree Turnaround (extra instant chops are already added to the yield)"],
  ["Pickaxe Shark", "Pickaxe Shark"],
  ["Crimstone Clam", "Crimstone Clam"]
];

function mapGuideHtml() {
  const rows = MAP_GUIDE_LEGEND.map(([key, text]) => {
    const code = MAP_PROC_CODES[key];
    return `<div class="map-guide-item"><span class="map-node-proc proc-${code.toLowerCase()} map-guide-code">${code}</span><span class="map-guide-text">${escapeHtml(text)}</span></div>`;
  }).join("");
  return `<details class="map-guide cb-column"${mapGuideOpen ? " open" : ""}>
    <summary class="map-guide-summary">Guide</summary>
    <div class="map-guide-body">
      <p>Exact tile coordinates from your synced farm. The number above an icon is the streak (harvests or mines left, mines until the oil bonus, S for a swarm). The number below is the predicted yield.</p>
      <p>Every node on the map has a # tag. It is the order in which to collect that node type: #1 first, then #2, then #3. Crops, fruit, flower beds, trees, stone, iron, gold, crimstone, oil, lava pits, sunstone and beehives each count in their own list.</p>
      <p>You must collect in this order for the procs on the map to be accurate in the real game. The game does not store a proc on a node. It keeps one roll counter per node type that goes up by one every time you collect a node of that type, so the Nth collect is the one that procs. A green yield with letters is the node that gets the proc at its number. For example, if stone #4 shows +2, your 4th stone collect gives +2 only if you collected #1, #2 and #3 before it.</p>
      <p>Skipping a number, collecting a node of that type that is not in order, or collecting since your last sync shifts every roll after it. Sync again after you finish collecting. You can stop after the last proc you want. Tap a ready node to lock it to your own order, and tap it again to unlock. Nodes still recovering are numbered after the ready ones, in the order they become ready. Flower beds, oil and sunstone do not depend on the order, so their numbers only show a suggested order.</p>
      ${mapPicks.length ? `<button type="button" class="map-reset-order">Reset order</button>` : ""}
      <p>A green yield with letters on the corner marks a proc:</p>
      <div class="map-guide-legend">${rows}</div>
      <p>Honey shows what the hive gives if harvested now.</p>
    </div>
  </details>`;
}

function mapBindPicks(body) {
  const grid = body.querySelector(".map-grid");
  if (grid) {
    grid.addEventListener("click", e => {
      const el = e.target.closest(".map-node-pickable");
      if (!el) return;
      const key = el.getAttribute("data-map-key");
      const at = mapPicks.indexOf(key);
      if (at >= 0) mapPicks.splice(at, 1); else mapPicks.push(key);
      renderMapPanel();
    });
  }
  const reset = body.querySelector(".map-reset-order");
  if (reset) {
    reset.addEventListener("click", () => {
      mapPicks = [];
      renderMapPanel();
    });
  }
}

function mapBindGuide(body) {
  const guide = body.querySelector(".map-guide");
  if (!guide) return;
  guide.addEventListener("toggle", () => {
    mapGuideOpen = guide.open;
  });
}

export function renderMapPanel() {
  const body = $("mapBody");
  if (!body) return;
  const prevScroll = body.querySelector(".map-scroll");
  const prevState = {
    bodyTop: body.scrollTop,
    mapTop: prevScroll ? prevScroll.scrollTop : 0,
    mapLeft: prevScroll ? prevScroll.scrollLeft : 0
  };
  let nodes = [];
  if (farmPanelGameState !== mapPicksState) {
    mapPicksState = farmPanelGameState;
    mapPicks = [];
  }
  if (farmPanelGameState) {
    try {
      nodes = farmPanelComputeMapNodes(farmPanelGameState, mapPicks);
    } catch (e) {
      nodes = [];
    }
  }
  if (!farmPanelGameState) {
    body.innerHTML = `
      <div class="cb-title">Map</div>
      <div class="cb-note">Sync your farm to see the map.</div>
    `;
    return;
  }
  if (!nodes.length) {
    body.innerHTML = `
      <div class="cb-title">Map</div>
      <div class="cb-note">No placed nodes were found in your synced farm.</div>
    `;
    return;
  }
  body.innerHTML = `
    <div class="cb-title">Map</div>
    ${mapGuideHtml()}
    <div class="cb-column">${mapGridHtml(nodes)}</div>
  `;
  mapBindGuide(body);
  mapBindPicks(body);
  const nextScroll = body.querySelector(".map-scroll");
  body.scrollTop = prevState.bodyTop;
  if (nextScroll) {
    nextScroll.scrollTop = prevState.mapTop;
    nextScroll.scrollLeft = prevState.mapLeft;
  }
}
