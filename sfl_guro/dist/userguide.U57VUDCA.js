import {
  navigateTo
} from "./chunk.7X3ZPCSK.js";
import "./chunk.F7REBWYF.js";
import "./chunk.D7LWHYJT.js";
import "./chunk.LPEVZJ4B.js";
import {
  ICON_DATA
} from "./chunk.VR6FV3KR.js";
import "./chunk.AS3VMXOQ.js";

// src/user_guide_data.js
var APP_ABOUT = {
  title: "About SFL GURO",
  summary: "SFL GURO is a free, unofficial companion app for the game Sunflower Land. It reads your farm, applies the boosts and skills you really have, and turns them into clear numbers: what is growing, what is worth doing, what things cost and how long they will take. It is built so you can plan before you spend anything in the game.",
  purpose: [
    "Save time: every calculator already knows the game's recipes, grow times and prices, so you do not need a spreadsheet.",
    "Be accurate: your synced farm, your skills and your boosts are used in every result, so the numbers match what you will really get.",
    "Plan ahead: compare options, such as which fish, which expansion or which dish, before you commit resources."
  ],
  canDo: [
    { head: "Track my farm", text: "Profile shows my inventory value and SFT goals. Growing lists every crop, fruit and node with timers and expected harvest. Map shows my land tile by tile with the best collecting order." },
    { head: "Solve the puzzles", text: "Digging marks safe tiles on the dig site. Potion House narrows down the right potion combination in fewer tries." },
    { head: "Calculate costs and rewards", text: "Land Expansion, Experience Calc, Fishing Guide, Gunter Shop, Crafting Box, Workbench and Ticket Calc work out totals in FLOWER, coins, EXP or tickets." },
    { head: "Follow the market", text: "Marketplace Price, SFL Bubbles Chart, Coin Converter and Flower Combo show prices, movers and the best deals." },
    { head: "Set up my real boosts", text: "Boost, Skill Tree, Nodes and Settings tell the app what I own, so every panel uses my numbers." },
    { head: "Learn and compare", text: "Beginner Guide, Base Coin Cost, Bumpkin Level, Seasons and the leaderboards are reference pages for learning the game and checking my rank." }
  ],
  start: [
    "Type my Farm ID in the box at the top of the app and tap Sync. This lets the app read my farm. The data is only read, never changed.",
    "Open Boost and Skill Tree and switch on what I really have. Open Nodes and enter my plot and node counts. This makes yield numbers match my farm.",
    "Pick a panel from the list below, read how it works, and tap Open this panel to use it.",
    "Come back and tap Sync after I play, so the app shows my latest farm."
  ],
  note: "Every screenshot below is taken from the real app. Red numbered marks on a screenshot match the numbered steps next to it. Steps without a mark are lower on the page or appear after an action."
};
var USER_GUIDES = [
  {
    id: "profile",
    label: "Profile",
    title: "Profile",
    intro: "Shows how much my tradable inventory is worth in FLOWER and how close I am to the SFT I want to buy. It is built from my synced farm and the current marketplace prices.",
    steps: [
      "The Farm ID box and Sync button sit at the top of the app on every page. I type my Farm ID, tap Sync, and my name, level, expansion, VIP status and balance fill in. Nothing else loads until I sync.",
      "Net Inventory Value is the total worth of everything I can trade, counted in FLOWER at today's marketplace prices.",
      "The Inventory list shows each item I own, how many I have and what that stack is worth. The most valuable items come first.",
      "To set a goal I type in the search box, pick a collectible or wearable, and tap ADD SFT.",
      "Under SFT Goal each goal card fills as my inventory grows. Still Need tells me how much more FLOWER I need to afford it. I can add more than one goal and remove a goal any time."
    ]
  },
  {
    id: "growing",
    label: "Growing",
    title: "Growing",
    intro: "A live list of everything planted on my farm, so I know what is ready, what is still growing and what my harvest is worth. Timers count down on their own.",
    steps: [
      "The icon bar at the top filters the list to one kind of item, like crops, fruits or resources. I tap All to see everything again.",
      "Ready to Harvest lists everything that is finished and waiting for me to collect.",
      "Each card shows the item, how many nodes or plots it covers, and the Yield I should get with my boosts.",
      "Market value is what that yield sells for on the marketplace, and Net is what is left after tax. The Tax setting at the top of the app changes this.",
      "Items under Growing show a Growing In timer. Resource nodes show Recovering until they can be collected again.",
      "If the page says it is showing saved data, I tap sync to refresh it. Boosts from the Boost and Skill Tree pages are included in every yield."
    ]
  },
  {
    id: "digging",
    label: "Digging",
    title: "Digging",
    intro: "Helps me find treasure faster on my desert dig site by working out which tiles are safe, possible or guaranteed from the holes I already dug today.",
    steps: [
      "The Treasure Map card shows my farm, my Ascension Age and the chapter artefact I am looking for. I must sync first so today's dig patterns load.",
      "The colour guide explains each tile. No treasure and No clue are dead tiles, Possible may hold treasure, Guaranteed dig is a sure find, Will reveal Crab and Will reveal Sand are predicted clues, and Pattern found marks a confirmed formation.",
      "Next to the map title the Data button opens Digging Data: my boosts, treasure prices, my digging streak reward and the list of Dug Treasures.",
      "The grid is my dig site, columns A to J and rows 1 to 10. After I dig in the game and sync, the tiles change colour and the app narrows down where the treasure is. Small numbers show the order I dug.",
      "The summary line under the grid counts the tiles dug, the patterns confirmed, guaranteed and possible spots, and how many crab and sand tiles are predicted."
    ]
  },
  {
    id: "potionroom",
    label: "Potion House",
    title: "Potion House",
    intro: "Helps me work out the right four-potion combination in fewer tries by using the feedback from my earlier attempts.",
    steps: [
      "The mark guide at the top explains the feedback: a confirmed potion in the correct slot, a correct potion in the wrong slot, a wrong potion not in the combination, and a bomb potion to avoid.",
      "Combinations in Game shows the attempts I already made, newest at the top, each potion with its mark. I sync to load new attempts.",
      "Projected Combinations is my testing area. I tap an empty slot first, then tap a potion below it to place it. The app uses my past marks to rule potions out.",
      "Confirmed Combinations fills in once a slot is known for sure.",
      "Combination Trainer remembers the patterns of combinations I solved. Backup turns them into a code I can copy and keep, and Restore brings them back from that code. The Store and Logs buttons at the top open the potion store and my cost log."
    ]
  },
  {
    id: "fishing",
    label: "Fishing",
    title: "Fishing Guide",
    intro: "Shows how much each fish costs me to catch, so I can see which fishing is worth my time. Costs use my skills and boosts and the season I pick.",
    steps: [
      "Collect or Buy decides how ingredients are priced. Collect uses the cost of producing chum from my own chain and falls back to the marketplace price for anything not modeled. Buy uses marketplace prices.",
      "Each section, such as Basic Fish Cost, lists fish by difficulty. I tap Basic Fish, Advance Fish or Expert Fish to switch the list.",
      "Under the tabs, every fish row shows the cost per unit in FLOWER and small icons for the bait, chum and boost it uses. I tap a row's arrow to see the full breakdown.",
      "The season buttons, Spring, Summer, Autumn and Winter, change the list because ingredients, yield and time differ each season.",
      "Fish Market and Crustaceans show the cost of Fish Flake, Fish Stick, Crab Stick and Fish Oil.",
      "Guaranteed Catch shows the cost when I use the Fish Market recipe instead of rod, bait and chum, so I can compare the two ways."
    ]
  },
  {
    id: "expansionsim",
    label: "Land Expansion",
    title: "Land Expansion",
    intro: "Plan my next island expansions and see the full material list, build time and FLOWER cost before I spend anything.",
    steps: [
      "Expansion Boosts lists the boosts that reduce expansion cost, such as Grinx's Hammer, VIP Access and Ascension Monument. I tick the ones I own.",
      "Material Pricing sets how materials are priced. Tool Costs includes the tools needed in the total.",
      "Start From is the island and expansion I am on now. I pick the island and use the minus and plus buttons to choose the number.",
      "SYNC copies my current expansion from my farm so I do not set it by hand.",
      "Target To is the expansion I want to reach, chosen the same way.",
      "Below, I can read One-Time Upgrade Cost, Bumpkin Level Requirement and Newly Added Resources. Apply Missing Resources ON counts only what I still lack, OFF counts everything.",
      "Selected Expansion shows the materials, what is missing and the build time for one expansion. Total Materials, Total Build Time and Total FLOWER Cost at the bottom cover my whole plan."
    ]
  },
  {
    id: "sflbubbles",
    label: "Bubbles Chart",
    title: "SFL Bubbles Chart",
    intro: "Shows marketplace prices and my own farm as bubbles, so the biggest movers are easy to spot at a glance.",
    steps: [
      "Marketplace Bubbles shows the market. My Build shows the items on my own farm.",
      "Resources, Collectibles and Wearables change what kind of items I see.",
      "The % and $ button changes what the size shows, percentage change or FLOWER value. 24hrs and 7D set the time range.",
      "The List button switches from bubbles to a sorted list. The round arrow button reloads the data.",
      "Green bubbles are profit and red bubbles are loss. The bigger the bubble, the bigger the change. I tap a bubble to see its price, high, low and volume.",
      "The report box under the chart explains how the numbers are measured for the mode I picked."
    ]
  },
  {
    id: "factiondelivery",
    label: "Faction Delivery",
    title: "Faction Delivery",
    intro: "Plan my weekly faction deliveries and see what materials they need, what they cost and how many marks I can earn.",
    steps: [
      "Leader Board shows the top players of each faction.",
      "Marks Calculator estimates the marks I earn. I turn on my outfit, Paw Shield or Bonus Marks to include their extra marks, and Reset clears the calculator.",
      "This Week and Next Week switch the week I am looking at. The line below shows the date and the routine week, for example week 1 of 12.",
      "Faction Request shows the request of my own faction for the chosen week. The other factions follow the same routine.",
      "Each faction card lists the Kitchen and Pet items with amounts and an estimated delivery cost. The clipboard button copies the list.",
      "I sync first so my faction and my real requests load. Without a sync the cards show no sync data."
    ]
  },
  {
    id: "coinconverter",
    label: "Coin Converter",
    title: "Coin Converter",
    intro: "Shows which crops, fruits and greenhouse items give me the most coins for my FLOWER when I sell them to Betty.",
    steps: [
      "Highest Rate shows the best coins per FLOWER right now and which item gives it.",
      "Boost lists the extras I can switch on, such as Green Thumb Legacy and Coin Swindler. Each one changes the rates below.",
      "The tabs are Top Coin Conversions, Base Coin and Calculator.",
      "SORT orders the ranking by Rate, Name or Price.",
      "Each row shows the item, its multiplier, market price, base coin per unit and the coins per FLOWER.",
      "In the Calculator tab I pick an item and type a quantity to see my total coins and the FLOWER cost."
    ]
  },
  {
    id: "npcgift",
    label: "NPC Gift",
    title: "NPC Gift Calculator",
    intro: "Shows how many keys I can get from NPC deliveries and flower gifts, and how long until each next reward.",
    steps: [
      "Boost at the top lets me include boosts that change friendship points.",
      "NPCs That Give Keys lists each NPC with my current points, the days until the next key and the points needed.",
      "Use Final reward counts the final reward of that NPC in the plan.",
      "Exclude Delivery removes that NPC's normal deliveries from the plan.",
      "Next key under the name tells me how long until the reward. Rewards opens the full reward list of that NPC.",
      "Further down are the key totals for 7 days and 30 days and the flower gifts I can add to fill points faster. I sync first so my points load by themselves."
    ]
  },
  {
    id: "map",
    label: "Map",
    title: "Map",
    intro: "Shows my land tile by tile and the best order to collect so my bonus procs line up.",
    steps: [
      "I tap the GUIDE bar to read the short in-page explanation of the symbols.",
      "My land is drawn on a grid with coordinates on the edges. Each node, crop plot and fruit patch shows its icon.",
      "A number tag on a node is its collecting order. I collect #1 first, then #2, then #3.",
      "The number above an icon is the streak, and the number below is the predicted yield.",
      "A green yield with letters on the corner means I will get a proc when I collect it in that order.",
      "I can tap a ready node to set my own order. Reset order brings back the default. After collecting in the game I sync again."
    ]
  },
  {
    id: "guntershop",
    label: "Gunter Shop",
    title: "Gunter Shop Calculator",
    intro: "Shows the crafting cost of Sunstone and Obsidian items from the Gunter shop in coins and FLOWER.",
    steps: [
      "Nodes Cost shows the cost of nodes, and Upgrade Cost shows the cost of upgrades. I tap the tab I need.",
      "Sunstone Node is the amount box. I type how many I want to work with.",
      "Buy and Upgrade switch the list underneath.",
      "I tap a node tile, such as Tree or Stone Rock, to calculate its cost in the box above.",
      "Collect or Buy decides how materials are priced, and the Flower Cost shows the total."
    ]
  },
  {
    id: "ticketcalc",
    label: "Ticket Calc",
    title: "Chapter Ticket Calculator",
    intro: "Estimates how many Chapter Tickets I will earn before the season ends, from deliveries, chores, bounties and Megastore rewards.",
    steps: [
      "Ticket Boosts (Stella Megastore) has toggles for the boosts I own. Each toggle shows OFF or ON.",
      "Undelivered Last Season is for tickets I did not deliver last season.",
      "Days the season will last is the countdown I find in the Stella Megastore. I type it in so the totals use the right number of days.",
      "NPC Deliveries has one block per NPC. I choose Deliver it or Do not deliver, enter the days I will skip, and the FLOWER cost per delivery.",
      "Further down are Weekly Chores, Poppy Trade, Animal Bounty, Daily Reward (VIP) and Megastore rewards. The Chapter Tickets total shows what I will have by the end."
    ]
  },
  {
    id: "experiencecalc",
    label: "Experience Calc",
    title: "Experience Calculator",
    intro: "Plan my cooking and see the total EXP and FLOWER cost before I cook anything, and watch my Bumpkin level move.",
    steps: [
      "Collect or Buy decides how ingredient costs are counted: made on my farm or bought at marketplace price.",
      "Faction Pet adds the EXP boost from my faction pet. Manual Faction Bonus EXP lets me enter a bonus by hand.",
      "The Bumpkin bar shows my level, my EXP and how much is left to the next level. It moves live as I add dishes.",
      "Buildings and Fish groups the dishes. I tap a building, such as Fire Pit, Kitchen, Bakery or Deli, and type how many of each dish I plan to cook. After a sync it fills from my inventory.",
      "The result box shows Total EXP added and Total cost, and the list shows the EXP of each building.",
      "The boosts I picked on the Boost page, my skills and my VIP are added automatically."
    ]
  },
  {
    id: "beginnerguide",
    label: "Beginner Guide",
    title: "Beginner Guide",
    intro: "A step-by-step guide for new farmers, so I always know what to do next. It reads my synced farm and only recommends what is useful to me.",
    steps: [
      "Leveling, Farming, Mining and Animals let me pick the topic I want help with.",
      "About this guide opens a short explanation of how the recommendations are made.",
      "Farming Mode sets whether I play Free to Play or Invested, which changes what is suggested.",
      "Leveling Strategy lets me choose a plan, such as Fish Strat, Rush Level or Mid Cost Level. Preview shows the setup and Save keeps it.",
      "Suggested Food shows the best dish for my level with its EXP, cost and the ingredients for 24 hours. Below it the Skills and Boost tabs let me try a setup, and with a synced farm it starts from my real skills.",
      "The tier list under that tells me which skills and boosts to take next, one step at a time."
    ]
  },
  {
    id: "nodes",
    label: "Nodes",
    title: "Nodes",
    intro: "Tell the app how many plots and nodes I have so harvest numbers are correct. Some boosts are shared across all my real plots and nodes.",
    steps: [
      "Crop Plots is required. I enter how many crop plots I have, and it applies to all crops.",
      "Resource Nodes is required too. For each rock or tree type I enter the tool uses and the quantity. Upgraded nodes, like Ancient Tree or Fused Stone Rock, list their extra tool uses.",
      "The same applies to Stone, Iron and Gold nodes. Each group has its own boxes.",
      "Crimstone Rock, Oil Reserve, Lava Pit and Salt are single boxes. I leave unused ones at 0.",
      "Fruit Nodes, Greenhouse plots and Animals are optional. I can leave them at 0.",
      "It matters because boosts like Gnome or Sir Goldensnout are shared across my real plots and nodes. The warning on the Boost page names what is still missing."
    ]
  },
  {
    id: "boost",
    label: "Boost",
    title: "Boost",
    intro: "Switch on the boosts I really have, and every number in the app changes to match.",
    steps: [
      "Weekly Seasons holds the season buttons. I pick the season I want the app to use.",
      "The line under the buttons shows this week's real season. Tapping a different season previews it.",
      "Save Changes keeps my choices. It lights up as soon as I change something.",
      "SFT/BUD/Shrines Boost opens the full boost list. The category buttons, like Crops, Mining, Fruits, Greenhouse, Animals and Cooking, filter it.",
      "The search box finds a boost by name. I tap a boost to switch it on. Active boosts change yield and grow time everywhere in the app.",
      "For BUD NFTs I pick the Type, Stem and Aura of my BUD, then tap Add this BUD. The yellow warning at the bottom lists the plots and nodes still missing on the Nodes page."
    ]
  },
  {
    id: "skilltree",
    label: "Skill Tree",
    title: "Skill Tree",
    intro: "Pick the skills I have so the app knows my real boosts. It also tracks how many skill points, ascension points and shards I have used.",
    steps: [
      "Save Changes appears when I change something. I tap it to keep my skills.",
      "The Skill Tree bar opens and closes the tree. The clipboard button copies my skill tree so I can share it.",
      "The counters at the top show the skill points, ascension points and shards I used.",
      "I choose a category, such as Crops, Trees, Fruit Patch, Fishing, Cooking or Mining, to see its skills.",
      "I tap a skill to add it and the counters update. Skills I add change yield, time and cost in every other panel."
    ]
  },
  {
    id: "settings",
    label: "Settings",
    title: "Settings",
    intro: "Choose the gem pack I normally buy so FLOWER prices are worked out the right way.",
    steps: [
      "Gem Pack: I tick the pack I usually buy, for example 1,350 gems. Each pack shows what 1 gem costs in FLOWER.",
      "Free Gem is for when I get my gems for free, so the FLOWER cost is 0.",
      "Flower/Gem Ratio shows how many gems I get for 1 FLOWER with the pack I picked. Costs shown in gems across the app use this."
    ]
  },
  {
    id: "marketplace",
    label: "Market Price",
    title: "Marketplace Price",
    intro: "Shows what each item sells for on the marketplace, in FLOWER. Other panels use these prices in their totals.",
    steps: [
      "Sync live prices pulls in the latest marketplace prices.",
      "If my browser blocks it, I use the link under the box, paste the API response and tap Import pasted prices.",
      "Resources, Collectibles and Wearables switch the list.",
      "The search box finds an item by name. Each row shows the price in FLOWER, and the price box can be set by hand.",
      "Items I add in other panels show up here too, and I can delete a source to remove it."
    ]
  },
  {
    id: "basecoincost",
    label: "Base Coin Cost",
    title: "Base Coin Cost",
    intro: "The base game cost of every tool, crop, fruit, resource and animal, shown with what it gives me.",
    steps: [
      "The search box at the top filters every section below it at once.",
      "I scroll through the sections: Tools, Crops, Fruits, Greenhouse, Resources, Animals and Honey and Flowers. The number in brackets is how many items it holds.",
      "Each card shows the cost and what the item produces, with the cost per unit in coins and FLOWER.",
      "When a boost changes a number, the original is crossed out and the boost is named.",
      "I can not edit anything here. These are the game's own numbers."
    ]
  },
  {
    id: "flowercombo",
    label: "Flower Combo",
    title: "Flower Combination",
    intro: "Shows seed and cross-pollination combinations with their cost at market price.",
    steps: [
      "Everything is grouped by seed, such as Sunpetal Seed. The header shows the grow time and the season.",
      "Each flower variety below it shows its name and its cost in FLOWER. I tap a row to open the details.",
      "The details show the seed, the item I cross-pollinate with, the result, the duration, the quantity and the cost.",
      "The cost is the seed's coin cost plus whatever I paired it with, shared across the flowers it makes.",
      "Crops and fruits use the marketplace price. Flowers can not be traded, so their own chain cost is used."
    ]
  },
  {
    id: "bumpkinlevel",
    label: "Bumpkin Level",
    title: "Bumpkin Level",
    intro: "Shows the EXP and skill points for every level, and where my Bumpkin stands now.",
    steps: [
      "The top card shows my Bumpkin, my level, my EXP, my Ascension Level and my Land Expansion.",
      "The tabs choose the range. Level 1-150 is the normal levels, and A1 to A10 are the ascension levels.",
      "The A1 1-50 style tabs open the ascension levels of that stage.",
      "The table shows the EXP needed, the skill points gained and the total EXP for each level in the tab, and the last row adds the totals."
    ]
  },
  {
    id: "auctionleaderboard",
    label: "Auction Board",
    title: "Auction Leaderboard",
    intro: "Shows the chapter race ranking and where my farm stands among the top players.",
    steps: [
      "The top card shows my Bumpkin, name, total EXP, level and ascension level once I enter my Farm ID.",
      "Display Mode chooses how many players I see.",
      "Top 500, Top 100 and Top 50 set the size of the list.",
      "Chapter Race Ranking shows my own rank for the chapter item. Below it, filters like All, Ascension Level, EXP and None Ascended narrow the list.",
      "Each row shows the rank, name, Bumpkin, EXP, ascension and tickets. At the bottom I type my Farm ID and tap Refresh to load the latest ranking."
    ]
  },
  {
    id: "leaderboard",
    label: "Leader Board",
    title: "Leader Board",
    intro: "Daily farm rankings across nine boards, from coins to digging streaks.",
    steps: [
      "The tabs at the top pick a board: Coins, XP, New Players, Sunflowers, Kale, Chores, Deliveries, Login Streak and Digging Streak. I scroll the tabs sideways to see them all.",
      "The list shows the top players for that board, from first place down, with their level, ascension and score.",
      "The text under the title shows the report date and when the boards were last updated."
    ]
  },
  {
    id: "craftingbox",
    label: "Crafting Box",
    title: "Crafting Box",
    intro: "Shows every Crafting Box recipe and what it costs me.",
    steps: [
      "Collect or Buy decides how the cost of the materials is counted. The text above explains how the cost is computed.",
      "Recipes are grouped, such as Dolls, Ingredients and Beds. I scroll to the group I want.",
      "Each card is one recipe. The 3x3 picture shows the item placed in each slot, and the number is the cost in FLOWER.",
      "The Materials row lists everything I need for that recipe."
    ]
  },
  {
    id: "workbench",
    label: "Workbench",
    title: "Workbench Recipe",
    intro: "Shows the Workbench recipes and what they cost.",
    steps: [
      "Tools are grouped into Land Tools, Water Tools and Animal Care. Each card shows the coins and materials.",
      "Boost lists the boosts that reduce tool or building costs.",
      "Build lists the buildings with their level, coins and ingredients.",
      "If a building can be upgraded, I tap its card to open the upgrade window.",
      "The upgrade window shows each level and its perks."
    ]
  },
  {
    id: "seasons",
    label: "Seasons",
    title: "Seasons",
    intro: "Shows the recipes and items that only appear in a certain season.",
    steps: [
      "Each box is a group, such as Lava Pit Recipe, Crops, Fruits or Flowers.",
      "Inside a group, the season buttons, Spring, Summer, Autumn and Winter, each hold that season's items.",
      "Every card is one item with the amounts it needs or gives.",
      "I scroll down to see the other groups."
    ]
  }
];
function guideById(id) {
  return USER_GUIDES.find((g) => g.id === id) || USER_GUIDES[0];
}

// src/pages/userguide.js
var rootEl = null;
var activeId = USER_GUIDES[0].id;
var aboutOpen = false;
function escapeHtml(s) {
  return String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}
function linksHtml() {
  return USER_GUIDES.map((g) => `<button type="button" class="ug-link${g.id === activeId ? " is-active" : ""}" data-ug-id="${g.id}" aria-pressed="${g.id === activeId ? "true" : "false"}">${escapeHtml(g.label)}</button>`).join("");
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
  const list = (items) => items.map((t) => `<li>${escapeHtml(t)}</li>`).join("");
  const can = a.canDo.map((c) => `<li><span class="ug-can-head">${escapeHtml(c.head)}</span><span class="ug-can-text">${escapeHtml(c.text)}</span></li>`).join("");
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
  links.forEach((b) => {
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
function mount(root) {
  rootEl = root;
  root.addEventListener("click", onClick);
  render();
}
function unmount() {
  if (rootEl) rootEl.removeEventListener("click", onClick);
  rootEl = null;
}
export {
  mount,
  unmount
};
