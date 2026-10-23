import {
  gem_packs_exports
} from "./chunk.F7REBWYF.js";
import {
  COIN_ICON,
  ES_ISLAND_ICONS,
  FLOWER_ICON,
  NPC_ICONS,
  POTION_ROOM_ICON,
  calculator_exports,
  getIcon,
  inprogress_exports,
  prices_exports,
  setAppDarkMode,
  ui_exports
} from "./chunk.D7LWHYJT.js";
import {
  KEY_ICON_DATA,
  NAV_ICON_DATA
} from "./chunk.LPEVZJ4B.js";
import {
  ICON_DATA
} from "./chunk.VR6FV3KR.js";

// src/api.js
var api = {
  ui: ui_exports,
  calc: calculator_exports,
  prices: prices_exports,
  inprogress: inprogress_exports,
  gempacks: gem_packs_exports
};

// src/pages/registry.js
var PAGES = [{
  id: "growing",
  path: "/growing",
  label: "Growing",
  root: "pageGrowing",
  load: () => import("./growing.FAMUUYNP.js")
}, {
  id: "digging",
  path: "/digging",
  label: "Digging",
  root: "pageDigging",
  load: () => import("./digging.BCZDWFTP.js")
}, {
  id: "potionroom",
  path: "/potionroom",
  label: "Potion House",
  root: "pagePotionRoom",
  load: () => import("./potionroom.AN3SQ6EQ.js")
}, {
  id: "boost",
  path: "/boost",
  label: "Boost",
  root: "boostPanelSheet",
  load: () => import("./boost.EN6VJCXN.js")
}, {
  id: "skilltree",
  path: "/skilltree",
  label: "Skill Tree",
  root: "pageSkillTree",
  load: () => import("./skilltree.B2NEMVXY.js")
}, {
  id: "settings",
  path: "/settings",
  label: "Settings",
  root: "pageSettings",
  load: () => import("./settings.FVFJAFUG.js")
}, {
  id: "nodes",
  path: "/nodes",
  label: "Nodes",
  root: "pageNodes",
  load: () => import("./nodes.BCUQJTBN.js")
}, {
  id: "marketplace",
  path: "/marketplace",
  label: "Marketplace Price",
  root: "marketPanel",
  load: () => import("./marketplace.XNVMAAAX.js")
}, {
  id: "basecoincost",
  path: "/basecoincost",
  label: "Base Coin Cost",
  root: "libraryPanel",
  load: () => import("./basecoincost.JJKFPQUB.js")
}, {
  id: "coinconverter",
  path: "/coinconverter",
  label: "Coin Converter",
  root: "pageCoinConverter",
  load: () => import("./coinconverter.DPKDRYSQ.js")
}, {
  id: "npcgift",
  path: "/npcgift",
  label: "NPC Gift Calculator",
  root: "pageNpcGift",
  load: () => import("./npcgift.574SZ5CT.js")
}, {
  id: "flowercombo",
  path: "/flowercombination",
  label: "Flower Combination",
  root: "pageFlowerCombo",
  load: () => import("./flowercombo.USUW27F7.js")
}, {
  id: "bumpkinlevel",
  path: "/bumpkinlevel",
  label: "Bumpkin Level",
  root: "bumpkinLevelPanel",
  load: () => import("./bumpkinlevel.O4VZJRN6.js")
}, {
  id: "auctionleaderboard",
  path: "/auctionleaderboard",
  label: "Auction Leaderboard",
  root: "auctionTrackerPanel",
  load: () => import("./auctionleaderboard.7IXNYVAW.js")
}, {
  id: "leaderboard",
  path: "/leaderboard",
  label: "Leader Board",
  root: "leaderboardPanel",
  load: () => import("./leaderboard.YMSFOBOL.js")
}, {
  id: "craftingbox",
  path: "/craftingbox",
  label: "Crafting Box",
  root: "craftingBoxPanel",
  load: () => import("./craftingbox.GL4ZMFKR.js")
}, {
  id: "workbench",
  path: "/workbenchrecipe",
  label: "Workbench Recipe",
  root: "workbenchPanel",
  load: () => import("./workbench.R4ID2VGM.js")
}, {
  id: "seasons",
  path: "/seasons",
  label: "Seasons",
  root: "seasonsPanel",
  load: () => import("./seasons.BLERM2VU.js")
}, {
  id: "map",
  path: "/map",
  label: "Map",
  root: "mapPanel",
  load: () => import("./map.G2VZGJMR.js")
}, {
  id: "guntershop",
  path: "/guntershop",
  label: "Gunter Shop Calculator",
  root: "pageGunterShop",
  load: () => import("./guntershop.PISI5PSR.js")
}, {
  id: "ticketcalc",
  path: "/chapter-ticket",
  label: "Chapter Ticket Calculator",
  root: "pageTicketCalc",
  load: () => import("./ticketcalc.U4CNZSYV.js")
}, {
  id: "experiencecalc",
  path: "/experience-calculator",
  label: "Experience Calculator",
  root: "cookingPanel",
  load: () => import("./experiencecalc.W4PR6RBM.js")
}, {
  id: "beginnerguide",
  path: "/beginner-guide",
  label: "Beginner Guide",
  root: "beginnerPanel",
  load: () => import("./beginnerguide.QPJN33OS.js")
}, {
  id: "fishing",
  path: "/fishing",
  label: "Fishing Guide",
  root: "fishingPanel",
  load: () => import("./fishing.Z4LNHSH2.js")
}, {
  id: "expansionsim",
  path: "/land-expansion",
  label: "Land Expansion",
  root: "pageExpansionSim",
  load: () => import("./expansionsim.Y6LUWJP7.js")
}, {
  id: "resourcecalc",
  path: "/resource-calculators",
  label: "Resource Calculators",
  root: "pageResourceCalc",
  load: () => import("./resourcecalc.OCLOCQM7.js")
}, {
  id: "sflbubbles",
  path: "/sflbubbleschart",
  label: "SFL Bubbles Chart",
  root: "sflBubblesPanel",
  load: () => import("./sflbubbles.VALHBLLI.js")
}, {
  id: "factiondelivery",
  path: "/factiondelivery",
  label: "Faction Delivery",
  root: "factionPanel",
  load: () => import("./factiondelivery.Q3WXNUKG.js")
}, {
  id: "userguide",
  path: "/userguide",
  label: "User Guide",
  root: "pageUserGuide",
  load: () => import("./userguide.FYQUJADT.js")
}, {
  id: "profile",
  path: "/profile",
  label: "Profile",
  root: "pageProfile",
  load: () => import("./profile.5KPQM2FZ.js")
}];
var DEFAULT_PAGE_ID = "growing";
function pageById(id) {
  return PAGES.find((p) => p.id === id) || null;
}
function pageForPath(pathname) {
  const clean = "/" + String(pathname || "").replace(/^\/+|\/+$/g, "").toLowerCase();
  return PAGES.find((p) => p.path === clean) || null;
}

// src/rescalc_icon.js
var RESCALC_ICON = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAtklEQVR42mNgoBAwMjAwMEiIqP4nR/OLN7cZWWCca1urSdKs5d3KwMDAwMCCTZAQWFXoAmczoUuu2L4dg41OIwMmbDagK4zw9GRYsX07Q4SnJ4ZaFnQBZEW42DgNODPJl6gwuHf/O3YD2PQsGBgYGBh+XTqBlc8w9RKE9lLFbsCNjfsZGBgYGJQUObHyCXoBXSGGxmw9CE2uF6IeX2NgYGBgaGFQpJEXsIUyMh/ZZqplJkpzMwMAgzxG7wZpfTIAAAAASUVORK5CYII=";

// src/nav.js
var BUMPKIN_LEVEL_ICON = "data:image/webp;base64,UklGRo4FAABXRUJQVlA4TIIFAAAvY8AYAKfhtrZt09rPTNnFy1//FSByZOMbuw22kW0rwd0tdBqgZCqCjJwCvuPy2Ea2reR8QjIyh9wjmqFQ6qASd73zHwT9zi9eggu8BRd4Ci7wFnLBDT7CU/ABH/ABLwgCAH4AAEB6NN6PZOhV7Yv3//t9Mu6/RDJO93I/bo/15LsJdThYnaGUB73o2D2cHCY4wsi2GalaqkXEEmiu71LZyCgOWy9rJoy95okU08fg3db2tm22bXN674kAN4ZIBPL0edJmeInrv3IHGmld/9q2R/R/An78p8Gf+fP1s7LuNCdOJE48jl410hnq9VPSL0lIwujs9PrZQmemz9Sfq1+SkERC56S3jfrzVN2ER6XML0lIIqGz0Wdb9OdnAlN+fiZb08OZmbJlAOeJEs7OUlB9JibOxvcNJ6DXssG37Gn+bjXzHdD8fdfTArKZXgXSGRHshBLNe2NH5DTvjYmUEv9AwT9QwmmGlGb43vLbpku21bfC01z6renXzY0MzFzY3k7wtfRU8LXtl+1LmJNmAr6Un1JfHu0iKcVFstfUQDrNfHnMi6QUqcl+2dPnXS6SUqWf608zn5t/2uciqeZTw9PMp+Yfd7rYko9NO4nmH3Y6seQ/NO+O+vCIA2ucIBdotUxAq/ebjxBWJiATA/F9/cQiBO8bv9t4tGElTkDqIRDhXa2x7x7jmGIlXkyQI8IQq7Ct3m56p3EYYQgrY7xgYpEechB5y5B8uyj1dv/jnSIjccwkH+JawgBEJtjozZZlcYgXPNjEQDQDEJkSyTeNX284QmS4Ewm4sA+xwQQsUictr1u/2jA3E2BmiBfwoDgHmBkiDEQ7wZJ61fxl+zuNxAE0RxiZlYjjPBApW9Kdji/3f0duDMAc1vQcYJiH+BJqjhu8aH6nCAnN/P3XHArnvzXfaXgBcSh4QXcUzZ83v9MYATOGvwRroRTupOfWsEjPoTuK5s9a341kULBrcTDPkgYkqTvqWfOnrVNDBEazhtKVwMjT6u6opzuHOAKJAKyENf8YnjQeIQJPikpXCCNPqrujaH7fdkzGQRECsEJY8wlGVXdH3e87gxjOyp8CJEUYiaCBAKw2ZMKa4O7PvcQuaKWJaDXEAkIirI8B4BLAXJKdgCXyZwglBLumA+O9uQS4B+iOgvvLe4m0JOwlapzQn8tg16YBJOlfl4XdUZdbHqyXRZKQUpd+u+zBo+4oDhbZkoNFEhLIImUOklmbeUkIZbujDhKSkIQkgSQ2WQrCGsxpTpqwP2RQnsxBUif9VlhD91vq5pMkut9SWIO6Q94bUpIwwghJKAlOPgGySyu4KPEpUDIDcl6VOLwr9ji7TDi7javVURR7V16RXTThfEIydj5dwNxJCmtQkd/Cs4kmvAuwQljDCpzm5AqENcC+2i6SJmUalyWr9mi0F8+OfAWGnYCv8fvxe/GPDIdZz0upN+mqADRJF7T2FWnfIKQLvKtMeXDgyXk2SQbIBThIADm3B+/a+xYBcDYATTyZWu88u4CVYF06APs7VHpJApROpJ314AKwEkClHtQdxaEhqBxUX+JKQ1byZGx31EGiamvQLTkHeOcd+CLra/ZKGWBcGb10a3NsxR7o5c8DVIDSvWRctZIHb2SooY0EBoGKb6GXHPiEL7mFQ63xBmQBYQpTogSkPnkt3ciidCsd/aFIDbIpSHAL9LpuaKSr7EHyCaWSJBpX3AJ9OyAj6UbSjpLIXt0CvaSbNroFCnSDuSpJe0EFSAKhJDdcCbiWhEFIQpKQJLiSQHKHK+lG6CD5EpBQbULCIIuTBDkq3EHgZZEEsjVIEoYcrcDjAI9Lexw0IockIUno3xKSisjgnceR8A7vUh4kSKlFMlVsqp13rZX2qBq0e9c+s0s=";
var NAV_ICON_SETTINGS = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAAOCAYAAAAfSC3RAAAAAXNSR0IArs4c6QAAAPNJREFUKJGFkq1ywzAQhD9ngmIq4JIwoxSXh/oROkF+rwR5+gihxim2kVmIDUQj6gJ1Fclp0kMa3d7u3g88icKUc2HK+Vl+HQMBJjtkhSnntt4CsD8x60/5ULgEAoydTdSXREHxeHFUuUOA48UB0NYGEZ1vm0CWxaxfHz5xvm1oeq942Bmq3JN8frtgdRX3FxdNdsgmO2RNnyoJmwxi7GzCunTz9m5++7z64aifKv9z8iGECz1KXqz70zWoypHcgF/JSg8xjZ2lrbfhAFSkEPaB9VXEbpI9wn0NWo3sHXYGoh7Xkm96kpO7r8A95F/a+u/IfwA5PqivgnTkNwAAAABJRU5ErkJggg==";
var NAV_ICON_AUCTIONLEADERBOARD = "data:image/webp;base64,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";
var NAV_ICON_LEADERBOARD = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAALCAYAAABPhbxiAAABJGlDQ1BJQ0MgUHJvZmlsZQAAeJxjYGAycHRxcmUSYGDIzSspCnJ3UoiIjFJgP8/AxsDMAAaJycUFjgEBPiB2Xn5eKgMG+HaNgRFEX9YFmYUpjxdwJRcUlQDpP0BslJJanMzAwGgAZGeXlxQAxRnnANkiSdlg9gYQuygkyBnIPgJk86VD2FdA7CQI+wmIXQT0BJD9BaQ+Hcxm4gCbA2HLgNglqRUgexmc8wsqizLTM0oUDC0tLRUcU/KTUhWCK4tLUnOLFTzzkvOLCvKLEktSU4BqIe4DA0GIQlCIaQA1WmiS6G+CABQPENbnQHD4MoqdQYghQHJpURmUychkTJiPMGOOBAOD/1IGBpY/CDGTXgaGBToMDPxTEWJqhgwMAvoMDPvmAADAxk/9GlU2EAAAAMFJREFUeNqNkjEKwkAQRd/Igr2VdYqkSGBbD5A07i08mLdIFbDVdtHGZmsre6ux0A0mbowfBoblff7wWVFVAIqqeS0zul46ATDRdL106G330yTrfWRlUVSNehcoqgaO52nX8UxRNbxZNSngH0le1gDqXQBguVklwcfpDoBtM7wLYgC8C2LbTL0LPZCSbTMAAZDY6mezMX1k6BsFQFW/Ji9rPWytHrZW87LW99uAGSTG1FTiIA1YzJni6eMPYiYKmNUTpTdxpOcI7zYAAAAASUVORK5CYII=";
var NAV_ICON_CRAFTINGBOX = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA0AAAANBAMAAACAxflPAAAABGdBTUEAALGPC/xhBQAAABVQTFRFAAAAwMvcvkovi5u0WmmIcz45GBQlmbZdhwAAAAF0Uk5TAEDm2GYAAABDSURBVAjXY2BgYEhgAAM2MTYwK8UwKQzMdxYD00ABsDibi7MYiE4KSTEGCrCphrG5gbihCQwQLlgxiAsCqWFQUyFcADzlCyeFMcRDAAAAAElFTkSuQmCC";
var NAV_ICON_MAP = "data:image/webp;base64,UklGRq4BAABXRUJQVlA4TKIBAAAvLwALEKegJpKt5n9y6uiwgBNMoQkxmIAyVcmG2ki2ko9EhC6N0xJDBfTAkLqpiWSr+bQ5JxGYwC4iUEJNnVvmPwDA/38tVclNa8MZYM1j72f6q9dJxyQlDhEylhGVFXgnKKKskEPmWeEwpoDYSJIiaY/5cf03dqB7du4MKIjovwO3kRQp1b17MJDje8MykJUc9sh1WFdqk3uM3PIFIBo34sGkgd8f6WHb+pEM6JusCnqQ/KkX4lae7zQuFfb3AGMV9QjjtRa+ZyCpYf1wOJ/uLTIHBDxnHdy9M6FZlKWWhu9Z6E2sU69MH/KWhTj1fdvCD2eZzdLg/HUe9XbPzXMw+oUAy3XSi904PI3CS904PEsHnADfbbsOhWvunYfUeZQ+BVyAa021I681uQegEMGbA4n9kNP5oiOAgysHA0DuIZ0j2NEkxrZ7mOMgWdsx6zvYn84FO67cQ2fu2+tNzaA0l652usBJkHtoz56mtiNGP4e1KEVIIx5rAv/wL+2aSPhD7pH/2q5kY9fMJZl7DPyMb8snERiHHlv+WOQPcpmXDbcQ";
var NAV_ICON_GUNTERSHOP = "data:image/webp;base64,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";
var NAV_ICON_FISHING = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAOBAMAAADUAYG5AAAAHlBMVEUAAAAYFCXXdkO+Si/Ay9zkO0RzPjn///+Lm7RaaYge9Cq/AAAAAXRSTlMAQObYZgAAAE9JREFUCNdjgABGASgtJAClDSEMIWVxMINR2RDCEDITADJAAokMQAZYgFFUECigKCjAGBoIFBBxAYkAVYjMEGAQFACqEOkA6xVOZBREsQ4AdZMHIu0fKyEAAAAASUVORK5CYII=";
var NAV_ICON_SFLBUBBLES = "data:image/png;base64,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";
var NAV_ICON_FACTIONDELIVERY = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAAOCAYAAAAfSC3RAAABLklEQVR42nWSPUvDUBSGn1scxLpVEQdpKTQUsnQwq1M26eYPKEJDxkz9Ce3aMUQoroVCocXtTl3bwSUgEYpOIrWbFQchDiEhNx9nPs8573nPKzTdDElV4EtBQWX7jgC8R5f18wsAD2PCLKzpZth3HACMThurZ1MB8CYzjE4bgL7jKNOzkDeZAURgGVwGAVQCX4rNShbCZ5fNHLRZSQJfCpGWdH1jAmDd3yU3z6cLABqtZgIpUss2AwxHAwUCEFkT5tMFjVYk8e11y3A0SDk+TuBC22N5ZVBuY7d2YP35y9+VkYO6tQPLfVW9UdPN0K3vIgcvjvn62GL1bAUCcOu75Mcihp6+TwCUqZpuhoEvRawG4Pb0B/v9PNpYBKVzG/hSLPdV0r3JfdkQlwU97vsHE3e2F0JAyRgAAAAASUVORK5CYII=";
var PAGE_TITLES = {
  growing: ["GROWING", "What is growing and ready on your farm"],
  digging: ["DIGGING", "Beach bounty treasure map"],
  potionroom: ["POTION HOUSE", "Find the right potion combination"],
  boost: ["BOOST", "All boosts and categories"],
  skilltree: ["SKILL TREE", "Skills and ascension ranks"],
  nodes: ["NODES", "Plots, nodes and animals for total harvest"],
  marketplace: ["MARKETPLACE PRICE", "What each item sells for on the marketplace"],
  basecoincost: ["BASE COIN COST", "The base game cost of everything"],
  coinconverter: ["COIN CONVERTER", "Sell your crops and fruit for coins"],
  npcgift: ["NPC GIFT CALCULATOR", "Keys from NPC deliveries and flower gifts"],
  flowercombo: ["FLOWER COMBINATION", "Seed and cross-pollination combos with market price cost"],
  bumpkinlevel: ["BUMPKIN LEVEL", "Level, experience and skill points for every level"],
  auctionleaderboard: ["AUCTION LEADERBOARD", "Chapter race rankings"],
  leaderboard: ["LEADER BOARD", "Farm rankings"],
  craftingbox: ["CRAFTING BOX", "Crafting box recipes and costs"],
  workbench: ["WORKBENCH RECIPE", "Workbench recipes and costs"],
  seasons: ["SEASONS", "Recipes and items that only appear in a certain season"],
  map: ["MAP", "Land map"],
  guntershop: ["GUNTER SHOP", "Sunstone & Obsidian crafting costs"],
  ticketcalc: ["CHAPTER TICKET CALCULATOR", "Project delivery ticket income over time"],
  expansionsim: ["LAND EXPANSION", "Plan your next island expansions"],
  resourcecalc: ["RESOURCE CALCULATORS", "Profit and loss calculators for your resources"],
  sflbubbles: ["SFL BUBBLES CHART", "Marketplace prices and your build as bubbles"],
  factiondelivery: ["FACTION DELIVERY", "Weekly faction delivery planner"],
  experiencecalc: ["EXPERIENCE CALCULATOR", "Total EXP and FLOWER cost of a cooking plan"],
  beginnerguide: ["BEGINNER GUIDE", "Step-by-step guide for new farmers"],
  fishing: ["FISHING GUIDE", "Cost per fish, Fish Market and Guaranteed Catch"],
  settings: ["SETTINGS", "Gem packs and conversion ratio"],
  profile: ["PROFILE", "Your farm profile"],
  userguide: ["USER GUIDE", "Pick a panel to see how it works, step by step"]
};
function iconOrFallback(name, fallback) {
  const html = getIcon(name);
  return html && html.indexOf("<img") !== -1 ? html : fallback;
}
function imgHtml(src) {
  return `<img src="${src}" alt="" draggable="false">`;
}
function pageIconHtml(id) {
  switch (id) {
    case "growing":
      return iconOrFallback("Sunflower", "\u{1F33B}");
    case "digging":
      return imgHtml(ICON_DATA["sand_shovel.png"]);
    case "potionroom":
      return imgHtml(POTION_ROOM_ICON);
    case "boost":
      return imgHtml(ICON_DATA["boost_icon.png"]);
    case "settings":
      return imgHtml(NAV_ICON_SETTINGS);
    case "skilltree":
      return iconOrFallback("Green Thumb", "\u{1F393}");
    case "nodes":
      return iconOrFallback("Stone", "\u26CF\uFE0F");
    case "marketplace":
      return imgHtml(NAV_ICON_DATA.marketplace);
    case "basecoincost":
      return COIN_ICON;
    case "coinconverter":
      return imgHtml(NAV_ICON_DATA.betty);
    case "npcgift":
      return imgHtml(KEY_ICON_DATA["Treasure Key"]);
    case "auctionleaderboard":
      return imgHtml(NAV_ICON_AUCTIONLEADERBOARD);
    case "leaderboard":
      return imgHtml(NAV_ICON_LEADERBOARD);
    case "craftingbox":
      return imgHtml(NAV_ICON_CRAFTINGBOX);
    case "workbench":
      return iconOrFallback("Axe", "\u{1F528}");
    case "seasons":
      return imgHtml(ICON_DATA["season_summer.png"]);
    case "map":
      return imgHtml(NAV_ICON_MAP);
    case "guntershop":
      return imgHtml(NAV_ICON_GUNTERSHOP);
    case "experiencecalc":
      return imgHtml(NAV_ICON_DATA.experience);
    case "beginnerguide":
      return NPC_ICONS["pumpkin' pete"] ? imgHtml(NPC_ICONS["pumpkin' pete"]) : "\u{1F383}";
    case "userguide":
      return "\u{1F4D6}";
    case "ticketcalc":
      return "\u{1F39F}\uFE0F";
    case "expansionsim":
      return imgHtml(ES_ISLAND_ICONS.basic);
    case "resourcecalc":
      return imgHtml(RESCALC_ICON);
    case "sflbubbles":
      return imgHtml(NAV_ICON_SFLBUBBLES);
    case "factiondelivery":
      return imgHtml(NAV_ICON_FACTIONDELIVERY);
    case "fishing":
      return imgHtml(NAV_ICON_FISHING);
    case "bumpkinlevel":
      return imgHtml(BUMPKIN_LEVEL_ICON);
    case "flowercombo":
      return iconOrFallback("Red Pansy", "\u{1F338}");
    case "profile":
      return `<img class="guro-logo-icon" src="./icons/sfl-guro-192.png" alt="" draggable="false">`;
    default:
      return "";
  }
}
function pageIconSrc(id) {
  const m = /src="([^"]+)"/.exec(pageIconHtml(id));
  return m ? m[1] : "";
}
function pageItem(id, kind) {
  const p = PAGES.find((x) => x.id === id);
  return `<a class="${kind}" href="${p.path}" data-page-id="${p.id}"><span class="guro-link-icon">${pageIconHtml(p.id)}</span><span class="guro-link-text">${p.label}</span></a>`;
}
function themeItem(theme, kind) {
  if (theme === "sfl") {
    return `<button type="button" class="${kind} guro-theme-opt" data-theme="sfl"><span class="guro-link-icon">${imgHtml(ICON_DATA["sfl_logo.png"])}</span><span class="guro-link-text">SFL Theme</span></button>`;
  }
  return `<button type="button" class="${kind} guro-theme-opt" data-theme="dark"><span class="guro-link-icon">${imgHtml(NAV_ICON_DATA.darkmode)}</span><span class="guro-link-text">Dark Mode</span></button>`;
}
var NAV_GROUPS = [{
  label: "Overview",
  items: ["profile", "growing"]
}, {
  label: "Tools",
  items: ["digging", "potionroom", "fishing", "expansionsim", "resourcecalc", "sflbubbles", "factiondelivery", "coinconverter", "npcgift", "map", "guntershop", "ticketcalc", "experiencecalc", "beginnerguide"]
}, {
  label: "Configuration",
  items: ["nodes", "boost", "skilltree", "settings"]
}, {
  label: "Information",
  items: ["userguide", "marketplace", "basecoincost", "flowercombo", "bumpkinlevel", "auctionleaderboard", "leaderboard", "craftingbox", "workbench", "seasons"]
}, {
  label: "Themes",
  items: ["theme:sfl", "theme:dark"]
}];
function buildNav(kind, withLabels) {
  return NAV_GROUPS.map((g) => {
    const head = withLabels && g.label ? `<div class="guro-menu-label">${g.label}</div>` : "";
    const items = g.items.map((i) => i.indexOf("theme:") === 0 ? themeItem(i.slice(6), kind) : pageItem(i, kind)).join("");
    return head + items;
  }).join("");
}
function setActivePageInNav(id) {
  document.querySelectorAll("[data-page-id]").forEach((el) => {
    const on = el.getAttribute("data-page-id") === id;
    el.classList.toggle("is-current", on);
    if (on) el.setAttribute("aria-current", "page");
    else el.removeAttribute("aria-current");
  });
}
function setPageTitle(id) {
  const bar = document.getElementById("guroPageTitle");
  if (!bar) return;
  const t = PAGE_TITLES[id];
  if (!t || id === "growing") {
    bar.hidden = true;
    bar.innerHTML = "";
    return;
  }
  bar.innerHTML = `<div class="expansion-sim-icon-wrap"><img data-page-icon="${id}" src="" alt=""></div><div><div class="expansion-sim-title-text">${t[0]}</div><div class="expansion-sim-title-sub">${t[1]}</div></div>${id === "digging" || id === "potionroom" ? '<button type="button" class="es-mode-btn dig-data-toggle" id="digDataToggleBtn">' + (id === "potionroom" ? "Store" : "Data") + "</button>" : ""}${id === "potionroom" ? '<button type="button" class="es-mode-btn potion-logs-toggle" id="potionLogsBtn">Logs</button>' : ""}`;
  bar.hidden = false;
}
function fillRateIcons() {
  document.querySelectorAll("[data-rate-icon]").forEach((el) => {
    el.innerHTML = el.getAttribute("data-rate-icon") === "flower" ? FLOWER_ICON : COIN_ICON;
  });
}
function syncThemeButtons() {
  const dark = document.body.classList.contains("app-dark");
  document.querySelectorAll(".guro-theme-opt").forEach((btn) => {
    const active = btn.dataset.theme === "dark" ? dark : !dark;
    btn.classList.toggle("is-active", active);
    btn.setAttribute("aria-pressed", active ? "true" : "false");
  });
}
function closeMenu() {
  const menu = document.getElementById("guroMenu");
  const btn = document.getElementById("guroMenuBtn");
  if (!menu || !btn) return;
  menu.classList.remove("open");
  btn.setAttribute("aria-expanded", "false");
}
function toggleMenu() {
  const menu = document.getElementById("guroMenu");
  const btn = document.getElementById("guroMenuBtn");
  const open = !menu.classList.contains("open");
  menu.classList.toggle("open", open);
  btn.setAttribute("aria-expanded", open ? "true" : "false");
}
function fillPageIcons() {
  document.querySelectorAll("img[data-page-icon]").forEach((img) => {
    const id = img.getAttribute("data-page-icon");
    const src = pageIconSrc(id);
    if (src) {
      img.src = src;
      return;
    }
    const span = document.createElement("span");
    span.className = "guro-emoji-icon";
    span.textContent = pageIconHtml(id);
    img.replaceWith(span);
  });
}
function initHome() {
  document.querySelectorAll("header .mark, header .header-title").forEach((el) => {
    el.style.cursor = "pointer";
    el.addEventListener("click", () => navigateTo("growing", "push"));
  });
}
function fillGreenThumbIcons() {
  document.querySelectorAll("[data-green-thumb-icon]").forEach((el) => {
    el.innerHTML = getIcon("Green Thumb");
  });
}
function initNav() {
  initHome();
  fillRateIcons();
  fillGreenThumbIcons();
  const menu = document.getElementById("guroMenu");
  const desktop = document.getElementById("guroNavDesktop");
  menu.innerHTML = buildNav("guro-menu-link", true);
  desktop.innerHTML = buildNav("guro-desk-btn", false);
  document.getElementById("guroMenuBtn").addEventListener("click", (e) => {
    e.stopPropagation();
    toggleMenu();
  });
  document.addEventListener("click", (e) => {
    const link = e.target.closest("a[data-page-id]");
    if (link) {
      e.preventDefault();
      closeMenu();
      navigateTo(link.getAttribute("data-page-id"));
      return;
    }
    const themeBtn = e.target.closest(".guro-theme-opt");
    if (themeBtn) {
      setAppDarkMode(themeBtn.dataset.theme === "dark");
      syncThemeButtons();
      return;
    }
    if (!e.target.closest("#guroMenuWrap")) closeMenu();
  });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeMenu();
  });
  new MutationObserver(syncThemeButtons).observe(document.body, {
    attributes: true,
    attributeFilter: ["class"]
  });
  syncThemeButtons();
  fillPageIcons();
}

// src/router.js
var current = null;
var currentModule = null;
var navToken = 0;
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
  document.title = page.label + " \xB7 SFL GURO";
  if (mod.mount) mod.mount(root, api);
  fillPageIcons();
  return true;
}
function canLeaveTo(nextId) {
  if (!current || !currentModule || !currentModule.canLeave) return true;
  return currentModule.canLeave(nextId, api);
}
async function navigateTo(id, mode = "push") {
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
async function initRouter() {
  const found = pageForPath(window.location.pathname);
  const startId = found ? found.id : DEFAULT_PAGE_ID;
  await navigateTo(startId, "replace");
  window.addEventListener("popstate", () => {
    const p = pageForPath(window.location.pathname);
    navigateTo(p ? p.id : DEFAULT_PAGE_ID, "pop");
  });
}

export {
  api,
  navigateTo,
  initRouter,
  initNav
};
