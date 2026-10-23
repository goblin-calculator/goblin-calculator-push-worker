import { escapeHtml, fmtInt, COIN_ICON } from "./calculator.js";

import { SFL_COMMUNITY_PROXY_BASE } from "./prices.js";

import { $, getIcon } from "./ui.js";

function lbApiUrl() {
  return SFL_COMMUNITY_PROXY_BASE + "community/data?type=statsLeaderboard";
}

const LB_BOARDS = [
  { name: "coins", tab: "Coins", icon: () => COIN_ICON },
  { name: "experience", tab: "XP", icon: () => getIcon("Experience") },
  { name: "newPlayerExperience", tab: "New Players", icon: () => getIcon("Experience") },
  { name: "sunflowers", tab: "Sunflowers", icon: () => getIcon("Sunflower") },
  { name: "kale", tab: "Kale", icon: () => getIcon("Kale") },
  { name: "chores", tab: "Chores", icon: () => "" },
  { name: "deliveries", tab: "Deliveries", icon: () => "" },
  { name: "dailyLoginStreak", tab: "Login Streak", icon: () => "" },
  { name: "diggingStreak", tab: "Digging Streak", icon: () => getIcon("Sand Shovel") }
];

let lbData = null;
let lbLoading = false;
let lbError = null;
let lbLog = [];
let lbFromCache = false;
const LB_CACHE_KEY = "gc_leaderboard_cache";

function lbSaveCache(data) {
  try {
    const boards = {};
    Object.keys(data.boards || {}).forEach(k => {
      const b = data.boards[k];
      boards[k] = {
        name: b.name,
        title: b.title,
        description: b.description,
        players: (b.players || []).map(p => ({ rank: p.rank, farmId: p.farmId, username: p.username, level: p.level, ascension: p.ascension, count: p.count }))
      };
    });
    localStorage.setItem(LB_CACHE_KEY, JSON.stringify({ reportDate: data.reportDate, lastUpdated: data.lastUpdated, activeSince: data.activeSince, scanned: data.scanned, boards: boards }));
  } catch (e) {}
}

function lbLoadCache() {
  try {
    const raw = localStorage.getItem(LB_CACHE_KEY);
    const parsed = raw ? JSON.parse(raw) : null;
    return parsed && parsed.boards ? parsed : null;
  } catch (e) {
    return null;
  }
}
let lbActiveBoard = LB_BOARDS[0].name;

function lbFormatDate(ms) {
  if (!ms) return "";
  try {
    return new Date(ms).toISOString().replace("T", " ").slice(0, 16) + " UTC";
  } catch (e) {
    return "";
  }
}

function lbInfoHtml() {
  if (lbLoading && !lbData) {
    return `<div class="cb-note">Loading the daily top 100 stat boards from the Sunflower Land community API…</div>`;
  }
  if (lbError) {
    return `<div class="cb-note">${escapeHtml(lbError)}</div>`;
  }
  if (!lbData) {
    return `<div class="cb-note">No boards found. API answers: ${escapeHtml(lbLog.join(" | ") || "none")}</div>`;
  }
  const scanned = lbData.scanned != null ? fmtInt(lbData.scanned) : "?";
  const updated = lbFormatDate(lbData.lastUpdated);
  const since = lbFormatDate(lbData.activeSince);
  return `<div class="cb-note">Top 100 farms for each of the ${LB_BOARDS.length} daily stat boards (coins, XP, new player XP, sunflowers, kale, chores, deliveries, daily login streak and digging streak), ranked over ${escapeHtml(scanned)} farms that played in the last 30 days${since ? " (since " + escapeHtml(since.slice(0, 10)) + ")" : ""}. Report day: ${escapeHtml(String(lbData.reportDate || "?"))} (UTC)${updated ? ", last updated " + escapeHtml(updated) : ""}. Boards are built once a day and show the latest complete day.${lbFromCache ? " The API has no published boards right now, so this is the last copy saved on this device." : ""} Coins, XP, sunflowers and kale are current holdings, chores and deliveries are all-time totals, and the streaks are consecutive days.</div>`;
}

function lbRowHtml(player) {
  const asc = player.ascension > 0 ? ` · A${escapeHtml(String(player.ascension))}` : "";
  return `<div class="cb-item lb-row" title="Farm #${escapeHtml(String(player.farmId))}">
    <span class="lb-rank">${escapeHtml(String(player.rank))}</span>
    <span class="lb-name cb-item-name">${escapeHtml(String(player.username))}</span>
    <span class="lb-lvl">Lvl ${escapeHtml(String(player.level))}${asc}</span>
    <span class="lb-count cb-item-cost">${fmtInt(player.count)}</span>
  </div>`;
}

function lbBoardHtml(def) {
  const board = lbData && lbData.boards ? lbData.boards[def.name] : null;
  const title = board && board.title ? board.title : def.tab;
  const desc = board && board.description ? board.description : "";
  const players = board && Array.isArray(board.players) ? board.players : [];
  const rows = players.length ? players.map(lbRowHtml).join("") : `<div class="lb-empty">No players on this board</div>`;
  const icon = def.icon();
  return `<div class="cb-column lb-board${def.name === lbActiveBoard ? " lb-active" : ""}" data-lb-board="${def.name}">
    <div class="cb-column-label">${icon ? icon + " " : ""}${escapeHtml(title)}</div>
    ${desc ? `<div class="lb-desc">${escapeHtml(desc)}</div>` : ""}
    <div class="lb-list">${rows}</div>
  </div>`;
}

function lbTabsHtml() {
  const tabs = LB_BOARDS.map(def => `<button type="button" class="market-tab-btn${def.name === lbActiveBoard ? " active" : ""}" data-lb-tab="${def.name}">${escapeHtml(def.tab)}</button>`).join("");
  return `<div class="market-tabs lb-tabs" id="lbTabs">${tabs}</div>`;
}

function lbDateOffset(days) {
  return new Date(Date.now() - days * 86400000).toISOString().slice(0, 10);
}

async function lbFetchDay(dateStr) {
  const url = lbApiUrl() + (dateStr ? "&date=" + dateStr : "");
  const res = await fetch(url);
  if (res.status === 429) throw new Error("Too many requests, try again in a few seconds");
  let json = null;
  try {
    json = await res.json();
  } catch (e) {}
  const payload = json && json.boards ? json : json && json.data && json.data.boards ? json.data : null;
  lbLog.push((dateStr || "default") + ": " + res.status + (payload ? " ok" : json && json.error ? " " + json.error : " no boards"));
  return { status: res.status, data: payload };
}

async function lbFetch() {
  if (lbLoading || lbData) return;
  lbLoading = true;
  lbError = null;
  lbLog = [];
  lbRender();
  try {
    let found = null;
    for (let i = 0; i <= 6 && !found; i++) {
      const r = await lbFetchDay(i === 0 ? "" : lbDateOffset(i));
      if (r.data) found = r.data;
    }
    if (found) {
      lbData = found;
      lbFromCache = false;
      lbSaveCache(found);
    } else {
      const cached = lbLoadCache();
      if (cached) {
        lbData = cached;
        lbFromCache = true;
      }
    }
  } catch (e) {
    lbError = "Couldn't load the leader boards" + (e && e.message ? " — " + e.message : "") + ".";
  } finally {
    lbLoading = false;
    lbRender();
  }
}

function lbRender() {
  const body = $("leaderboardBody");
  if (!body) return;
  const scrollTops = {};
  body.querySelectorAll(".lb-board").forEach(el => {
    const list = el.querySelector(".lb-list");
    if (list) scrollTops[el.getAttribute("data-lb-board")] = list.scrollTop;
  });
  const showBoards = !!lbData;
  body.innerHTML = `
    <div class="cb-title">Leader Board</div>
    ${lbInfoHtml()}
    ${showBoards ? lbTabsHtml() : ""}
    ${showBoards ? `<div class="lb-columns">${LB_BOARDS.map(lbBoardHtml).join("")}</div>` : ""}
  `;
  body.querySelectorAll(".lb-board").forEach(el => {
    const list = el.querySelector(".lb-list");
    const top = scrollTops[el.getAttribute("data-lb-board")];
    if (list && top) list.scrollTop = top;
  });
}

export function renderLeaderboardPanel() {
  lbRender();
  lbFetch();
}

document.addEventListener("click", e => {
  const tab = e.target.closest("[data-lb-tab]");
  if (!tab) return;
  lbActiveBoard = tab.getAttribute("data-lb-tab");
  document.querySelectorAll("#leaderboardBody [data-lb-tab]").forEach(btn => {
    btn.classList.toggle("active", btn.getAttribute("data-lb-tab") === lbActiveBoard);
  });
  document.querySelectorAll("#leaderboardBody .lb-board").forEach(el => {
    el.classList.toggle("lb-active", el.getAttribute("data-lb-board") === lbActiveBoard);
  });
});
