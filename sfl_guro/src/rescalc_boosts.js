import * as calc from "./calculator.js";
import * as ui from "./ui.js";

const CATEGORIES = [ "Yield", "Time", "Cost", "Stock", "Swarm", "Other" ];

function esc(s) {
  return calc.escapeHtml(String(s));
}

function n2(n) {
  if (!isFinite(n)) return "—";
  return n.toLocaleString(undefined, {
    minimumFractionDigits: 0,
    maximumFractionDigits: 2
  });
}

function signed(v) {
  return `${v > 0 ? "+" : ""}${n2(v)}`;
}

function effectParts(b, ctx) {
  const parts = [];
  const add = (kind, text) => parts.push({
    kind: kind,
    text: text
  });
  const keyed = (map, key) => {
    const keys = Object.keys(map);
    if (key != null && keys.includes(key)) return `${signed(map[key])} yield`;
    return keys.map(k => `${k} ${signed(map[k])}`).join(" / ") + " yield";
  };
  if (b.tierEffects) add("Yield", keyed(b.tierEffects, ctx.tier)); else if (b.resourceEffects) add("Yield", keyed(b.resourceEffects, ctx.name)); else if (b.yieldAdd) add("Yield", `${signed(b.yieldAdd)} yield`);
  if (b.yieldAddAll) add("Yield", `${signed(b.yieldAddAll)} yield`);
  if (b.yieldMult) add("Yield", `×${b.yieldMult} yield`);
  if (b.harvestAdd) add("Yield", `+${n2(b.harvestAdd)} harvest`);
  if (b.honeyYieldAdd) add("Yield", `${signed(b.honeyYieldAdd)} honey`);
  if (b.flowerExtraChance) add("Yield", `+${n2(b.flowerExtraChance)} flowers`);
  if (b.flowerExtraFlat) add("Yield", `+${n2(b.flowerExtraFlat)} flowers`);
  if (b.timeMult) add("Time", `×${b.timeMult} time`);
  if (b.speedAdd) add("Time", `${signed(b.speedAdd)} speed`);
  if (b.flowerTimeMult) add("Time", `×${b.flowerTimeMult} flower time`);
  if (b.freeCost) add("Cost", "free seeds");
  if (b.coinCostMultAll) add("Cost", `×${b.coinCostMultAll} cost`);
  if (b.toolCostMult) add("Cost", `×${b.toolCostMult} tool cost`);
  if (b.coinCostMult) add("Cost", `×${b.coinCostMult} tool cost`);
  if (b.noTool) add("Cost", "free tool");
  if (b.noWood) add("Cost", "free axe");
  if (b.materialSwap) add("Cost", `${b.materialSwap.from} → ${b.materialSwap.to}`);
  if (b.seedQtyMult) add("Cost", `×${b.seedQtyMult} seeds`);
  if (b.oilQtyMult) add("Cost", `×${b.oilQtyMult} oil`);
  if (b.oilFlatReduce) add("Cost", `-${n2(b.oilFlatReduce)} oil`);
  if (b.stockAdd) add("Stock", `+${n2(b.stockAdd)} stock`);
  if (b.swarmChanceAdd) add("Swarm", `+${n2(b.swarmChanceAdd * 100)}% swarm chance`);
  if (b.swarmChanceMult) add("Swarm", `×${b.swarmChanceMult} swarm chance`);
  if (b.woodReturnPenalty) add("Other", `-${n2(b.woodReturnPenalty)} wood`);
  if (b.woodReturnAdd) add("Other", `+${n2(b.woodReturnAdd)} wood`);
  if (b.plotCap) add("Other", `AOE ${b.plotCap} ${ctx.unit || "plots"}`);
  return parts;
}

function rowHtml(b, text, noteSkip) {
  const locked = calc.isSeasonLocked(b);
  const active = calc.isBoostDraftActive(b.id);
  const mark = locked ? "🔒" : `<input type="checkbox" class="rc-boost-check" tabindex="-1" aria-hidden="true"${active ? " checked" : ""}>`;
  const note = b.note && !noteSkip.test(b.note) && b.note.length < 60 ? ` · ${b.note}` : "";
  return `<div class="lib-item-row rc-boost-pick${active ? " boost-active" : ""}${locked ? " season-locked" : ""}" data-boost-id="${b.id}"><span class="lib-item-icon">${mark}</span><div class="lib-item-main"><div class="lib-item-name">${ui.getBoostIcon(b.name)}${esc(b.name)}</div><div class="lib-item-meta">${esc(text)}${note}</div></div></div>`;
}

function subjectHtml(title, icon, list, ctx, noteSkip) {
  const buckets = {};
  list.forEach(b => {
    const parts = effectParts(b, ctx);
    if (!parts.length) {
      (buckets.Other = buckets.Other || []).push(rowHtml(b, "", noteSkip));
      return;
    }
    const kinds = [];
    parts.forEach(p => {
      if (!kinds.includes(p.kind)) kinds.push(p.kind);
    });
    kinds.forEach(k => {
      const text = parts.filter(p => p.kind === k).map(p => p.text).join(", ");
      (buckets[k] = buckets[k] || []).push(rowHtml(b, text, noteSkip));
    });
  });
  const sections = CATEGORIES.filter(k => buckets[k]).map(k => `<div class="rc-boost-section"><div class="rc-boost-section-title">${k}</div>${buckets[k].join("")}</div>`).join("");
  if (!sections) return "";
  return `<div class="rc-boost-subject"><div class="rc-boost-subject-title guro-frame">${icon ? `<span class="rc-boost-subject-icon">${icon}</span>` : ""}<span>${esc(title)}</span></div>${sections}</div>`;
}

export function boostsBySubjectHtml(opts) {
  const noteSkip = opts.noteSkip || /AOE|free seeds|expected/i;
  const subjects = opts.subjects;
  const perSubject = subjects.map(s => ({
    subject: s,
    list: opts.boosts.filter(b => opts.appliesTo(b, s))
  }));
  let html = "";
  let shared = [];
  if (subjects.length > 1) {
    shared = opts.boosts.filter(b => perSubject.every(p => p.list.includes(b)));
    if (shared.length) html += subjectHtml(`${opts.allLabel || "All Selected"}`, "", shared, {
      unit: opts.unit
    }, noteSkip);
  }
  perSubject.forEach(p => {
    const list = p.list.filter(b => !shared.includes(b));
    html += subjectHtml(`Boost for ${p.subject.name}`, p.subject.icon, list, {
      name: p.subject.name,
      tier: p.subject.tier,
      unit: opts.unit
    }, noteSkip);
  });
  return html;
}
