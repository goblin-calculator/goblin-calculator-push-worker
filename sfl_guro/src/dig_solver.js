function normName(s) {
  return String(s).toLowerCase().replace(/[\s_]+/g, " ").trim();
}
function namesMatch(a, b) {
  return normName(a) === normName(b);
}
export function digDeduce(grid, formations, patternKeys, completedPatternKeys) {
  const gridSize = 10;
  const guaranteed = new Set();
  if (!patternKeys?.length) {
    return { guaranteed, guaranteedSlugs: new Map(), guaranteedCandidates: new Map(), guaranteedFormationCounts: new Map(), remainingCounts: new Map(), remainingRegions: new Map(), possibleTreasureCells: new Set(), partial: false };
  }
  const revealedSand = new Set();
  const revealedCrab = new Set();
  const revealedTreasureName = new Map();
  for (let y = 0; y < gridSize; y++) {
    for (let x = 0; x < gridSize; x++) {
      const c = grid[y][x];
      if (!c.dug) continue;
      const idx = y * gridSize + x;
      if (c.kind === "treasure") revealedTreasureName.set(idx, c.item);
      else if (c.kind === "sand") revealedSand.add(idx);
      else if (c.kind === "crab") revealedCrab.add(idx);
    }
  }
  const shapes = [...new Set(patternKeys)].filter((key) => Array.isArray(formations[key]) && formations[key].length).map((key) => ({ key, formation: formations[key] }));
  const inBounds = (x, y) => x >= 0 && x < gridSize && y >= 0 && y < gridSize;
  const buildPlacement = (key, formation, ox, oy) => {
    const plots = new Map();
    for (const p of formation) {
      const x = ox + p.x;
      const y = oy + p.y;
      if (!inBounds(x, y)) return null;
      const idx = y * gridSize + x;
      if (revealedSand.has(idx) || revealedCrab.has(idx)) return null;
      const rn = revealedTreasureName.get(idx);
      if (rn !== void 0 && !namesMatch(rn, p.name)) return null;
      if (committedCellOrigin.has(idx)) return null;
      plots.set(idx, p.name);
    }
    for (const idx of plots.keys()) {
      const px = idx % gridSize;
      const py = Math.floor(idx / gridSize);
      for (const [dx, dy] of [[1, 0], [-1, 0], [0, 1], [0, -1]]) {
        const nx = px + dx;
        const ny = py + dy;
        if (!inBounds(nx, ny)) continue;
        const nIdx = ny * gridSize + nx;
        if (revealedSand.has(nIdx) && !plots.has(nIdx)) return null;
      }
    }
    return plots;
  };
  const guaranteedNames = new Map();
  const ambiguousIdx = new Set();
  const ambiguousCandidates = new Map();
  const markAmbiguous = (idx, names) => {
    ambiguousIdx.add(idx);
    guaranteedNames.delete(idx);
    let set = ambiguousCandidates.get(idx);
    if (!set) {
      set = new Set();
      ambiguousCandidates.set(idx, set);
    }
    for (const n of names) set.add(normName(n));
  };
  const recordName = (idx, name) => {
    if (ambiguousIdx.has(idx)) {
      ambiguousCandidates.get(idx)?.add(normName(name));
      return;
    }
    if (guaranteedNames.has(idx)) {
      if (!namesMatch(guaranteedNames.get(idx), name)) {
        markAmbiguous(idx, [guaranteedNames.get(idx), name]);
      }
    } else {
      guaranteedNames.set(idx, name);
    }
  };
  const intersectCandidates = (candidates) => {
    if (!candidates.length) return;
    const [first, ...rest] = candidates;
    for (const [idx] of first) {
      if (!rest.every((c) => c.has(idx))) continue;
      guaranteed.add(idx);
      const names = new Set(candidates.map((c) => normName(c.get(idx))));
      if (names.size === 1) recordName(idx, first.get(idx));
      else markAmbiguous(idx, names);
    }
  };
  const confirmedPlacements = [];
  const confirmedPlacementSet = new Set();
  const recordConfirmedPlots = (plots) => {
    const sig = placementSignature(plots);
    if (!confirmedPlacementSet.has(sig)) {
      confirmedPlacementSet.add(sig);
      confirmedPlacements.push(plots);
    }
    for (const [idx, name] of plots) {
      guaranteed.add(idx);
      ambiguousIdx.delete(idx);
      ambiguousCandidates.delete(idx);
      guaranteedNames.set(idx, name);
    }
  };
  const shapeCount = new Map();
  for (const key of patternKeys) shapeCount.set(key, (shapeCount.get(key) ?? 0) + 1);
  const remainingCount = new Map(shapeCount);
  const presentKeys = [...new Set(patternKeys)].filter(
    (key) => Array.isArray(formations[key]) && formations[key].length
  );
  const nameToKeys = new Map();
  for (const key of presentKeys) {
    for (const p of formations[key]) {
      const n = normName(p.name);
      if (!nameToKeys.has(n)) nameToKeys.set(n, new Set());
      nameToKeys.get(n).add(key);
    }
  }
  const confinedTo = (name, key) => {
    const keys = nameToKeys.get(normName(name));
    return keys && keys.size === 1 && keys.has(key);
  };
  const computeCandidates = (tIdx, tName) => {
    const origin = committedCellOrigin.get(tIdx);
    if (origin) return [origin];
    const tx = tIdx % gridSize;
    const ty = Math.floor(tIdx / gridSize);
    const candidates = [];
    for (const { key, formation } of shapes) {
      if ((remainingCount.get(key) ?? 0) === 0) continue;
      for (const anchor of formation) {
        if (!namesMatch(anchor.name, tName)) continue;
        const ox = tx - anchor.x;
        const oy = ty - anchor.y;
        const plots = buildPlacement(key, formation, ox, oy);
        if (!plots) continue;
        if ((remainingCount.get(key) ?? 0) === 1) {
          const hasUncovered = [...revealedTreasureName].some(
            ([rIdx, rName]) => confinedTo(rName, key) && !committedCellOrigin.has(rIdx) && !plots.has(rIdx)
          );
          if (hasUncovered) continue;
        }
        candidates.push({ key, plots });
      }
    }
    return candidates;
  };
  const revealIsExclusiveTo = (idx, name, key) => {
    if (committedCellOrigin.has(idx)) return false;
    const cands = computeCandidates(idx, name);
    return cands.length > 0 && cands.every((c) => c.key === key);
  };
  const enumerateAllPlacements = (key) => {
    const formation = formations[key];
    const minX = Math.min(...formation.map((p) => p.x));
    const maxX = Math.max(...formation.map((p) => p.x));
    const minY = Math.min(...formation.map((p) => p.y));
    const maxY = Math.max(...formation.map((p) => p.y));
    const allPlacements = [];
    for (let oy = -minY; oy <= gridSize - 1 - maxY; oy++) {
      for (let ox = -minX; ox <= gridSize - 1 - maxX; ox++) {
        const plots = buildPlacement(key, formation, ox, oy);
        if (plots) allPlacements.push(plots);
      }
    }
    return allPlacements;
  };
  const enumerateSingleInstanceSurvivors = (key) => {
    const formation = formations[key];
    const confined = [...revealedTreasureName].filter(
      ([idx, name]) => revealIsExclusiveTo(idx, name, key)
    );
    if (confined.length) {
      const [aIdx, aName] = confined[0];
      const ax = aIdx % gridSize;
      const ay = Math.floor(aIdx / gridSize);
      const survivors = [];
      for (const anchor of formation) {
        if (!namesMatch(anchor.name, aName)) continue;
        const plots = buildPlacement(key, formation, ax - anchor.x, ay - anchor.y);
        if (!plots) continue;
        const coversAll = confined.every(([cIdx, cName]) => namesMatch(plots.get(cIdx), cName));
        if (coversAll) survivors.push(plots);
      }
      return survivors;
    }
    return enumerateAllPlacements(key);
  };
  const pseudoRevealed = new Set();
  const confirmedInstances = new Map();
  const placementSignature = (plots) => [...plots.keys()].sort((a, b) => a - b).join(",");
  const committedCellOrigin = new Map();
  const recordConfirmedInstance = (key, plots) => {
    if (!confirmedInstances.has(key)) confirmedInstances.set(key, new Set());
    const sig = placementSignature(plots);
    const set = confirmedInstances.get(key);
    const isNewInstance = !set.has(sig);
    set.add(sig);
    for (const idx of plots.keys()) {
      if (!committedCellOrigin.has(idx)) committedCellOrigin.set(idx, { key, plots });
    }
    return isNewInstance;
  };
  if (completedPatternKeys && completedPatternKeys.length) {
    const needed = new Map();
    for (const k of completedPatternKeys) needed.set(k, (needed.get(k) ?? 0) + 1);
    for (const [key, count] of needed) {
      if (!shapeCount.has(key)) continue;
      const formation = formations[key];
      if (!Array.isArray(formation) || !formation.length) continue;
      let committed = 0;
      const minX = Math.min(...formation.map((p) => p.x));
      const maxX = Math.max(...formation.map((p) => p.x));
      const minY = Math.min(...formation.map((p) => p.y));
      const maxY = Math.max(...formation.map((p) => p.y));
      const candidates = [];
      for (let oy = -minY; oy <= gridSize - 1 - maxY; oy++) {
        for (let ox = -minX; ox <= gridSize - 1 - maxX; ox++) {
          const plots = buildPlacement(key, formation, ox, oy);
          if (!plots) continue;
          let fullyRevealed = true;
          for (const [idx, name] of plots) {
            const rn = revealedTreasureName.get(idx);
            if (rn === void 0 || !namesMatch(rn, name)) {
              fullyRevealed = false;
              break;
            }
          }
          if (fullyRevealed) candidates.push({ ox, oy, plots });
        }
      }
      for (const c of candidates) {
        if (committed >= count) break;
        if ([...c.plots.keys()].some((idx) => committedCellOrigin.has(idx))) continue;
        const sig = placementSignature(c.plots);
        const already = confirmedInstances.get(key)?.has(sig);
        if (already) continue;
        const isNew = recordConfirmedInstance(key, c.plots);
        if (isNew) {
          const rem = remainingCount.get(key) ?? 0;
          if (rem > 0) remainingCount.set(key, rem - 1);
        }
        recordConfirmedPlots(c.plots);
        committed++;
      }
      if (committed < count) {
        const rem = remainingCount.get(key) ?? 0;
        remainingCount.set(key, Math.max(0, rem - (count - committed)));
      }
    }
  }
  let iterChanged = true;
  while (iterChanged) {
    iterChanged = false;
    for (const [tIdx, tName] of revealedTreasureName) {
      const candidates = computeCandidates(tIdx, tName);
      if (candidates.length !== 1) continue;
      const { key, plots } = candidates[0];
      const isNewInstance = recordConfirmedInstance(key, plots);
      recordConfirmedPlots(plots);
      if (!pseudoRevealed.has(tIdx) && isNewInstance) {
        const rem = remainingCount.get(key) ?? 0;
        if (rem > 0) {
          remainingCount.set(key, rem - 1);
          iterChanged = true;
        }
      }
      for (const [idx, name] of plots) {
        if (!revealedTreasureName.has(idx) && !pseudoRevealed.has(idx)) {
          revealedTreasureName.set(idx, name);
          pseudoRevealed.add(idx);
          iterChanged = true;
        }
      }
    }
    for (const [tIdx, tName] of revealedTreasureName) {
      const candidates = computeCandidates(tIdx, tName);
      if (!candidates.length) continue;
      if (candidates.length === 1) {
        const { key, plots } = candidates[0];
        const isNewInstance = recordConfirmedInstance(key, plots);
        if (!pseudoRevealed.has(tIdx) && isNewInstance) {
          const rem = remainingCount.get(key) ?? 0;
          if (rem > 0) {
            remainingCount.set(key, rem - 1);
            iterChanged = true;
          }
        }
        recordConfirmedPlots(plots);
      } else {
        intersectCandidates(candidates.map((c) => c.plots));
      }
    }
    {
      const sigOf = (c) => c.key + "@" + placementSignature(c.plots);
      const anchors = [...revealedTreasureName];
      let forced = false;
      for (let ai = 0; ai < anchors.length && !forced; ai++) {
        const [xIdx, xName] = anchors[ai];
        const xCands = computeCandidates(xIdx, xName);
        if (xCands.length < 2) continue;
        for (let bi = ai + 1; bi < anchors.length && !forced; bi++) {
          const [yIdx, yName] = anchors[bi];
          const yCands = computeCandidates(yIdx, yName);
          if (yCands.length < 2) continue;
          const yBySig = new Map(yCands.map((c) => [sigOf(c), c]));
          for (const xc of xCands) {
            const s = sigOf(xc);
            if (!yBySig.has(s)) continue;
            const qx = xCands.filter((c) => sigOf(c) !== s);
            const qy = yCands.filter((c) => sigOf(c) !== s);
            if (!qx.length || !qy.length) continue;
            const altKeys = new Set([...qx, ...qy].map((c) => c.key));
            if (altKeys.size !== 1) continue;
            const K = qx[0].key;
            if ((remainingCount.get(K) ?? 0) !== 1) continue;
            const qxSigs = new Set(qx.map(sigOf));
            if (qy.some((c) => qxSigs.has(sigOf(c)))) continue;
            const { key: pKey, plots: pPlots } = xc;
            const isNewInstance = recordConfirmedInstance(pKey, pPlots);
            recordConfirmedPlots(pPlots);
            if ((!pseudoRevealed.has(xIdx) || !pseudoRevealed.has(yIdx)) && isNewInstance) {
              const rem = remainingCount.get(pKey) ?? 0;
              if (rem > 0) remainingCount.set(pKey, rem - 1);
            }
            for (const [idx, name] of pPlots) {
              if (!revealedTreasureName.has(idx) && !pseudoRevealed.has(idx)) {
                revealedTreasureName.set(idx, name);
                pseudoRevealed.add(idx);
              }
            }
            iterChanged = true;
            forced = true;
            break;
          }
        }
      }
    }
    for (const key of presentKeys) {
      if (remainingCount.get(key) !== 1) continue;
      const hasConfinedReveal = [...revealedTreasureName].some(([idx, name]) => revealIsExclusiveTo(idx, name, key));
      if (!hasConfinedReveal) continue;
      const survivors = enumerateSingleInstanceSurvivors(key);
      if (!survivors.length) continue;
      if (survivors.length === 1) {
        const isNewInstance = recordConfirmedInstance(key, survivors[0]);
        if (isNewInstance) {
          const rem = remainingCount.get(key) ?? 0;
          if (rem > 0) {
            remainingCount.set(key, rem - 1);
            iterChanged = true;
          }
        }
        recordConfirmedPlots(survivors[0]);
      } else {
        intersectCandidates(survivors);
      }
    }
    for (const key of presentKeys) {
      if (remainingCount.get(key) !== 1) continue;
      const hasConfinedReveal = [...revealedTreasureName].some(([idx, n]) => revealIsExclusiveTo(idx, n, key));
      if (hasConfinedReveal) continue;
      const allPlacements = enumerateSingleInstanceSurvivors(key);
      if (allPlacements.length === 1) {
        const isNewInstance = recordConfirmedInstance(key, allPlacements[0]);
        if (isNewInstance) {
          const rem = remainingCount.get(key) ?? 0;
          if (rem > 0) {
            remainingCount.set(key, rem - 1);
            iterChanged = true;
          }
        }
        recordConfirmedPlots(allPlacements[0]);
      }
    }
    for (const cIdx of revealedCrab) {
      const cx = cIdx % gridSize;
      const cy = Math.floor(cIdx / gridSize);
      const ns = [[1, 0], [-1, 0], [0, 1], [0, -1]].map(([dx, dy]) => [cx + dx, cy + dy]).filter(([nx, ny]) => inBounds(nx, ny));
      const satisfied = ns.some(([nx, ny]) => {
        const nIdx = ny * gridSize + nx;
        return revealedTreasureName.has(nIdx) || guaranteed.has(nIdx);
      });
      if (satisfied) continue;
      const candidates = ns.filter(([nx, ny]) => {
        const nIdx = ny * gridSize + nx;
        if (revealedSand.has(nIdx) || revealedCrab.has(nIdx) || revealedTreasureName.has(nIdx)) return false;
        return ![[1, 0], [-1, 0], [0, 1], [0, -1]].some(([dx, dy]) => {
          const sx = nx + dx;
          const sy = ny + dy;
          return inBounds(sx, sy) && revealedSand.has(sy * gridSize + sx) && !(sx === cx && sy === cy);
        });
      });
      if (candidates.length === 1) {
        const [nx, ny] = candidates[0];
        const nIdx = ny * gridSize + nx;
        if (!guaranteed.has(nIdx)) {
          guaranteed.add(nIdx);
          iterChanged = true;
        }
      }
    }
    const livePlacementsCache = new Map();
    const livePlacementsOf = (key) => {
      let list = livePlacementsCache.get(key);
      if (!list) {
        const rem = remainingCount.get(key) ?? 0;
        list = rem === 1 ? enumerateSingleInstanceSurvivors(key) : enumerateAllPlacements(key);
        livePlacementsCache.set(key, list);
      }
      return list;
    };
    const isCoverable = (nIdx) => {
      for (const key of presentKeys) {
        if ((remainingCount.get(key) ?? 0) === 0) continue;
        if (livePlacementsOf(key).some((p) => p.has(nIdx))) return true;
      }
      return false;
    };
    for (const cIdx of revealedCrab) {
      const cx = cIdx % gridSize;
      const cy = Math.floor(cIdx / gridSize);
      const ns = [[1, 0], [-1, 0], [0, 1], [0, -1]].map(([dx, dy]) => [cx + dx, cy + dy]).filter(([nx2, ny2]) => inBounds(nx2, ny2));
      const satisfied = ns.some(([nx2, ny2]) => {
        const nIdx2 = ny2 * gridSize + nx2;
        return revealedTreasureName.has(nIdx2) || guaranteed.has(nIdx2);
      });
      if (satisfied) continue;
      const open = ns.filter(([nx2, ny2]) => {
        const nIdx2 = ny2 * gridSize + nx2;
        if (revealedSand.has(nIdx2) || revealedCrab.has(nIdx2) || revealedTreasureName.has(nIdx2)) return false;
        return ![[1, 0], [-1, 0], [0, 1], [0, -1]].some(([dx, dy]) => {
          const sx = nx2 + dx;
          const sy = ny2 + dy;
          return inBounds(sx, sy) && revealedSand.has(sy * gridSize + sx) && !(sx === cx && sy === cy);
        });
      });
      if (open.length < 2) continue;
      const viable = open.filter(([nx2, ny2]) => isCoverable(ny2 * gridSize + nx2));
      if (viable.length !== 1) continue;
      const [nx, ny] = viable[0];
      const nIdx = ny * gridSize + nx;
      const covering = [];
      for (const key of presentKeys) {
        if ((remainingCount.get(key) ?? 0) === 0) continue;
        for (const p of livePlacementsOf(key)) {
          if (p.has(nIdx)) covering.push({ key, plots: p });
        }
      }
      if (covering.length === 1) {
        const { key, plots } = covering[0];
        const isNewInstance = recordConfirmedInstance(key, plots);
        if (isNewInstance) {
          const rem = remainingCount.get(key) ?? 0;
          if (rem > 0) {
            remainingCount.set(key, rem - 1);
            iterChanged = true;
          }
        }
        recordConfirmedPlots(plots);
      } else if (!guaranteed.has(nIdx)) {
        guaranteed.add(nIdx);
        iterChanged = true;
      }
    }
    if (ambiguousCandidates.size) {
      const groups = [];
      let groupsValid = true;
      for (const key of presentKeys) {
        const need = remainingCount.get(key) ?? 0;
        if (need === 0) continue;
        const placements = need === 1 ? enumerateSingleInstanceSurvivors(key) : enumerateAllPlacements(key);
        if (!placements.length || placements.length < need) {
          groupsValid = false;
          break;
        }
        groups.push({ key, need, placements });
      }
      groups.sort((a, b) => a.placements.length - b.placements.length);
      const BUDGET = Symbol("budget");
      const fixedCovered = new Set();
      for (const plots of confirmedPlacements) {
        for (const idx of plots.keys()) fixedCovered.add(idx);
      }
      const search = (extraReveals) => {
        const revealName = new Map(revealedTreasureName);
        for (const [idx, name] of extraReveals) revealName.set(idx, name);
        const groupPlacementOk = groups.map((g) => g.placements.map((p) => {
          for (const [eIdx, eName] of extraReveals) {
            const n = p.get(eIdx);
            if (n !== void 0 && !namesMatch(n, eName)) return false;
          }
          return true;
        }));
        const options = new Map();
        for (const [idx, name] of revealName) {
          if (fixedCovered.has(idx)) continue;
          const opts = [];
          for (let gi = 0; gi < groups.length; gi++) {
            const { placements } = groups[gi];
            for (let pi = 0; pi < placements.length; pi++) {
              const n = placements[pi].get(idx);
              if (n !== void 0 && namesMatch(n, name) && groupPlacementOk[gi][pi]) {
                opts.push([gi, pi]);
              }
            }
          }
          options.set(idx, opts);
        }
        const slots = groups.map((g) => g.need);
        const placed = [];
        const occupied = new Set(fixedCovered);
        const covered = new Set(fixedCovered);
        let nodes = 0;
        const uncoveredReveals = () => {
          const out = [];
          for (const idx of revealName.keys()) {
            if (!covered.has(idx)) out.push(idx);
          }
          return out;
        };
        const floatsOk = () => {
          for (let gi = 0; gi < groups.length; gi++) {
            if (slots[gi] === 0) continue;
            const { placements } = groups[gi];
            let ok = false;
            for (let pi = 0; pi < placements.length; pi++) {
              if (!groupPlacementOk[gi][pi]) continue;
              if (![...placements[pi].keys()].some((idx) => occupied.has(idx))) {
                ok = true;
                break;
              }
            }
            if (!ok) return false;
          }
          return true;
        };
        const crabsOk = () => {
          let floatCover = null;
          for (const cIdx of revealedCrab) {
            const cx = cIdx % gridSize;
            const cy = Math.floor(cIdx / gridSize);
            let ok = false;
            for (const [dx, dy] of [[1, 0], [-1, 0], [0, 1], [0, -1]]) {
              const nx = cx + dx;
              const ny = cy + dy;
              if (!inBounds(nx, ny)) continue;
              const nIdx = ny * gridSize + nx;
              if (revealName.has(nIdx) || covered.has(nIdx)) {
                ok = true;
                break;
              }
              if (!floatCover) {
                floatCover = new Set();
                for (let gi = 0; gi < groups.length; gi++) {
                  if (slots[gi] === 0) continue;
                  const { placements } = groups[gi];
                  for (let pi = 0; pi < placements.length; pi++) {
                    if (!groupPlacementOk[gi][pi]) continue;
                    const p = placements[pi];
                    if ([...p.keys()].some((idx) => occupied.has(idx))) continue;
                    for (const idx of p.keys()) floatCover.add(idx);
                  }
                }
              }
              if (floatCover.has(nIdx)) {
                ok = true;
                break;
              }
            }
            if (!ok) return false;
          }
          return true;
        };
        const bt = () => {
          if (++nodes > 5e4) throw BUDGET;
          const uncovered = uncoveredReveals();
          if (!uncovered.length) return floatsOk() && crabsOk();
          let best = null;
          for (const idx2 of uncovered) {
            const live2 = options.get(idx2).filter(([gi]) => slots[gi] > 0);
            if (!live2.length) return false;
            if (!best || live2.length < best.live.length) best = { idx: idx2, live: live2 };
          }
          const { idx, live } = best;
          for (const [gi, pi] of live) {
            const p = groups[gi].placements[pi];
            if ([...p.keys()].some((i) => occupied.has(i))) continue;
            const pKeys = [...p.keys()];
            for (const i of pKeys) occupied.add(i);
            for (const i of pKeys) covered.add(i);
            slots[gi] -= 1;
            placed.push(p);
            if (bt()) return true;
            placed.pop();
            slots[gi] += 1;
            for (const i of pKeys) covered.delete(i);
            for (const i of pKeys) occupied.delete(i);
          }
          return false;
        };
        try {
          return bt();
        } catch (e) {
          if (e === BUDGET) return null;
          throw e;
        }
      };
      const toResolve = [...ambiguousCandidates.keys()];
      for (const idx of toResolve) {
        const names = [...ambiguousCandidates.get(idx)];
        const possible = [];
        let budgetHit = false;
        for (const n of names) {
          const ok = search(new Map([[idx, n]]));
          if (ok === true) possible.push(n);
          else if (ok === null) {
            budgetHit = true;
            break;
          }
        }
        if (budgetHit) continue;
        if (possible.length === 1) {
          guaranteedNames.set(idx, possible[0]);
          ambiguousCandidates.delete(idx);
          ambiguousIdx.delete(idx);
          iterChanged = true;
        }
      }
    }
    for (const [idx, name] of guaranteedNames) {
      if (!revealedTreasureName.has(idx) && !pseudoRevealed.has(idx)) {
        revealedTreasureName.set(idx, name);
        pseudoRevealed.add(idx);
        iterChanged = true;
      }
    }
  }
  const canonicalName = new Map();
  for (const key of Object.keys(formations)) {
    for (const p of formations[key]) canonicalName.set(normName(p.name), p.name);
  }
  const guaranteedSlugs = new Map();
  for (const [idx, name] of guaranteedNames) {
    guaranteedSlugs.set(idx, canonicalName.get(normName(name)) || name);
  }
  const guaranteedCandidates = new Map();
  for (const [idx, names] of ambiguousCandidates) {
    guaranteedCandidates.set(idx, [...names]);
  }
  const guaranteedFormationCounts = new Map();
  for (const key of presentKeys) {
    const confirmed = confirmedInstances.get(key);
    let count = confirmed?.size ?? 0;
    if (remainingCount.get(key) === 1) {
      const survivors = enumerateSingleInstanceSurvivors(key);
      if (survivors.length === 1 && !confirmed?.has(placementSignature(survivors[0]))) {
        count += 1;
      }
    }
    if (count > 0) guaranteedFormationCounts.set(key, count);
  }
  const remainingCounts = new Map();
  const remainingRegions = new Map();
  for (const key of presentKeys) {
    const rem = remainingCount.get(key) ?? 0;
    if (rem === 0) continue;
    remainingCounts.set(key, rem);
    const placements = rem === 1 ? enumerateSingleInstanceSurvivors(key) : enumerateAllPlacements(key);
    const region = new Set();
    for (const p of placements) {
      for (const idx of p.keys()) region.add(idx);
    }
    remainingRegions.set(key, region);
  }
  const possibleTreasureCells = new Set();
  for (const region of remainingRegions.values()) {
    for (const idx of region) possibleTreasureCells.add(idx);
  }
  return { guaranteed, guaranteedSlugs, guaranteedCandidates, guaranteedFormationCounts, remainingCounts, remainingRegions, possibleTreasureCells, partial: false };
}
