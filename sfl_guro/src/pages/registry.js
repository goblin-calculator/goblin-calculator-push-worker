export const PAGES = [ {
  id: "growing",
  path: "/growing",
  label: "Growing",
  root: "pageGrowing",
  load: () => import("./growing.js")
}, {
  id: "digging",
  path: "/digging",
  label: "Digging",
  root: "pageDigging",
  load: () => import("./digging.js")
}, {
  id: "potionroom",
  path: "/potionroom",
  label: "Potion House",
  root: "pagePotionRoom",
  load: () => import("./potionroom.js")
}, {
  id: "boost",
  path: "/boost",
  label: "Boost",
  root: "boostPanelSheet",
  load: () => import("./boost.js")
}, {
  id: "skilltree",
  path: "/skilltree",
  label: "Skill Tree",
  root: "pageSkillTree",
  load: () => import("./skilltree.js")
}, {
  id: "settings",
  path: "/settings",
  label: "Settings",
  root: "pageSettings",
  load: () => import("./settings.js")
}, {
  id: "nodes",
  path: "/nodes",
  label: "Nodes",
  root: "pageNodes",
  load: () => import("./nodes.js")
}, {
  id: "marketplace",
  path: "/marketplace",
  label: "Marketplace Price",
  root: "marketPanel",
  load: () => import("./marketplace.js")
}, {
  id: "basecoincost",
  path: "/basecoincost",
  label: "Base Coin Cost",
  root: "libraryPanel",
  load: () => import("./basecoincost.js")
}, {
  id: "coinconverter",
  path: "/coinconverter",
  label: "Coin Converter",
  root: "pageCoinConverter",
  load: () => import("./coinconverter.js")
}, {
  id: "npcgift",
  path: "/npcgift",
  label: "NPC Gift Calculator",
  root: "pageNpcGift",
  load: () => import("./npcgift.js")
}, {
  id: "flowercombo",
  path: "/flowercombination",
  label: "Flower Combination",
  root: "pageFlowerCombo",
  load: () => import("./flowercombo.js")
}, {
  id: "bumpkinlevel",
  path: "/bumpkinlevel",
  label: "Bumpkin Level",
  root: "bumpkinLevelPanel",
  load: () => import("./bumpkinlevel.js")
}, {
  id: "auctionleaderboard",
  path: "/auctionleaderboard",
  label: "Auction Leaderboard",
  root: "auctionTrackerPanel",
  load: () => import("./auctionleaderboard.js")
}, {
  id: "leaderboard",
  path: "/leaderboard",
  label: "Leader Board",
  root: "leaderboardPanel",
  load: () => import("./leaderboard.js")
}, {
  id: "craftingbox",
  path: "/craftingbox",
  label: "Crafting Box",
  root: "craftingBoxPanel",
  load: () => import("./craftingbox.js")
}, {
  id: "workbench",
  path: "/workbenchrecipe",
  label: "Workbench Recipe",
  root: "workbenchPanel",
  load: () => import("./workbench.js")
}, {
  id: "seasons",
  path: "/seasons",
  label: "Seasons",
  root: "seasonsPanel",
  load: () => import("./seasons.js")
}, {
  id: "map",
  path: "/map",
  label: "Map",
  root: "mapPanel",
  load: () => import("./map.js")
}, {
  id: "guntershop",
  path: "/guntershop",
  label: "Gunter Shop Calculator",
  root: "pageGunterShop",
  load: () => import("./guntershop.js")
}, {
  id: "ticketcalc",
  path: "/chapter-ticket",
  label: "Chapter Ticket Calculator",
  root: "pageTicketCalc",
  load: () => import("./ticketcalc.js")
}, {
  id: "experiencecalc",
  path: "/experience-calculator",
  label: "Experience Calculator",
  root: "cookingPanel",
  load: () => import("./experiencecalc.js")
}, {
  id: "beginnerguide",
  path: "/beginner-guide",
  label: "Beginner Guide",
  root: "beginnerPanel",
  load: () => import("./beginnerguide.js")
}, {
  id: "fishing",
  path: "/fishing",
  label: "Fishing Guide",
  root: "fishingPanel",
  load: () => import("./fishing.js")
}, {
  id: "expansionsim",
  path: "/land-expansion",
  label: "Land Expansion",
  root: "pageExpansionSim",
  load: () => import("./expansionsim.js")
}, {
  id: "resourcecalc",
  path: "/resource-calculators",
  label: "Resource Calculators",
  root: "pageResourceCalc",
  load: () => import("./resourcecalc.js")
}, {
  id: "sflbubbles",
  path: "/sflbubbleschart",
  label: "SFL Bubbles Chart",
  root: "sflBubblesPanel",
  load: () => import("./sflbubbles.js")
}, {
  id: "factiondelivery",
  path: "/factiondelivery",
  label: "Faction Delivery",
  root: "factionPanel",
  load: () => import("./factiondelivery.js")
}, {
  id: "userguide",
  path: "/userguide",
  label: "User Guide",
  root: "pageUserGuide",
  load: () => import("./userguide.js")
}, {
  id: "profile",
  path: "/profile",
  label: "Profile",
  root: "pageProfile",
  load: () => import("./profile.js")
} ];

export const DEFAULT_PAGE_ID = "growing";

export function pageById(id) {
  return PAGES.find(p => p.id === id) || null;
}

export function pageForPath(pathname) {
  const clean = "/" + String(pathname || "").replace(/^\/+|\/+$/g, "").toLowerCase();
  return PAGES.find(p => p.path === clean) || null;
}
