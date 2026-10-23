import { $, getIcon, renderBoostAppliedList } from "./ui.js";
import { escapeHtml, fmtInt, fmt, FLOWER_ICON, getAllProfitItems, gatherTop10ProfitItems, BASE_CROPS, BASE_FRUITS, BASE_GREENHOUSE, RESOURCE_DATA, RESOURCE_NODE_TIERS, ANIMAL_DATA, FLOWER_VARIETIES, feePercent, formatDuration, computeAnimalTypeFigures, profileRenderSkillTierGroups, isTieredResource, getNodeTierCounts, ensureExchangeRates, flowerToUsd } from "./calculator.js";
import { marketItems, SFL_COMMUNITY_PROXY_BASE, SFL_WEARABLE_ID_TO_NAME, isSflThemeOn } from "./prices.js";

const SFLB_WORKER_BASE = "https://sfl-market-cache.bossweki.workers.dev";
const SFLB_WORKER_SNAPSHOT_TTL_MS = 6e4;
const SFLB_WORKER_MAX_ATTEMPTS = 5;
const SFLB_WORKER_RETRY_DELAYS_MS = [400, 800, 1500, 3000];
const SFLB_WORKER_FETCH_TIMEOUT_MS = 7000;
let __sflbWorkerSnapshotCache = null;
let __sflbWorkerSnapshotTs = 0;
let __sflbWorkerSnapshotPromise = null;
let __sflbWorkerSnapshotStale = null;
let __sflbWorkerSnapshotStaleTs = 0;

function sflbSleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function sflbFetchWorkerSnapshotOnce() {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), SFLB_WORKER_FETCH_TIMEOUT_MS);
  try {
    const res = await fetch(SFLB_WORKER_BASE + "/snapshot", { cache: "no-store", signal: controller.signal });
    if (!res.ok) return null;
    const json = await res.json();
    if (!json || !json.ok || !Array.isArray(json.items) || !json.items.length) return null;
    return json.items;
  } finally {
    clearTimeout(timer);
  }
}

async function sflbFetchWorkerSnapshot(forceFresh) {
  if (!SFLB_WORKER_BASE || SFLB_WORKER_BASE.indexOf("YOUR-WORKER-NAME") !== -1) return null;
  const now = Date.now();
  if (!forceFresh && __sflbWorkerSnapshotCache && (now - __sflbWorkerSnapshotTs) < SFLB_WORKER_SNAPSHOT_TTL_MS) {
    return __sflbWorkerSnapshotCache;
  }
  if (__sflbWorkerSnapshotPromise) return __sflbWorkerSnapshotPromise;
  __sflbWorkerSnapshotPromise = (async () => {
    let items = null;
    for (let attempt = 0; attempt < SFLB_WORKER_MAX_ATTEMPTS; attempt++) {
      try {
        items = await sflbFetchWorkerSnapshotOnce();
      } catch (e) {
        items = null;
      }
      if (items) break;
      if (attempt < SFLB_WORKER_MAX_ATTEMPTS - 1) {
        const delay = SFLB_WORKER_RETRY_DELAYS_MS[attempt] || SFLB_WORKER_RETRY_DELAYS_MS[SFLB_WORKER_RETRY_DELAYS_MS.length - 1];
        await sflbSleep(delay);
      }
    }
    if (items) {
      __sflbWorkerSnapshotCache = items;
      __sflbWorkerSnapshotTs = Date.now();
      __sflbWorkerSnapshotStale = items;
      __sflbWorkerSnapshotStaleTs = Date.now();
      return items;
    }
    if (__sflbWorkerSnapshotStale) {
      console.warn("[sfl-bubbles] worker snapshot fetch failed after " + SFLB_WORKER_MAX_ATTEMPTS + " attempts; reusing last known-good snapshot from " + Math.round((Date.now() - __sflbWorkerSnapshotStaleTs) / 1000) + "s ago instead of the live-proxy fallback.");
      return __sflbWorkerSnapshotStale;
    }
    console.warn("[sfl-bubbles] worker snapshot fetch failed after " + SFLB_WORKER_MAX_ATTEMPTS + " attempts and no cached snapshot exists yet; falling back to live community-proxy percentages (values may look very different from the cached worker data).");
    return null;
  })().finally(() => {
    __sflbWorkerSnapshotPromise = null;
  });
  return __sflbWorkerSnapshotPromise;
}

const SFLB_COLLECTIBLE_ID_TO_NAME = {
"101":"Sunflower Seed","102":"Potato Seed","103":"Pumpkin Seed","104":"Carrot Seed","105":"Cabbage Seed","106":"Beetroot Seed","107":"Cauliflower Seed","108":"Parsnip Seed","109":"Radish Seed","110":"Wheat Seed","111":"Kale Seed","112":"Apple Seed","113":"Blueberry Seed","114":"Orange Seed","115":"Magic Bean","118":"Eggplant Seed","119":"Corn Seed","120":"Banana Plant","121":"Sunpetal Seed","122":"Bloom Seed","123":"Lily Seed","124":"Soybean Seed","125":"Grape Seed","126":"Rice Seed","127":"Olive Seed","128":"Tomato Seed","129":"Lemon Seed","130":"Barley Seed","131":"Rhubarb Seed","132":"Zucchini Seed","133":"Yam Seed","134":"Broccoli Seed","135":"Pepper Seed","136":"Onion Seed","137":"Turnip Seed","138":"Artichoke Seed","139":"Duskberry Seed","140":"Lunara Seed","141":"Celestine Seed","142":"Edelweiss Seed","143":"Gladiolus Seed","144":"Lavender Seed","145":"Clover Seed","201":"Sunflower","202":"Potato","203":"Pumpkin","204":"Carrot","205":"Cabbage","206":"Beetroot","207":"Cauliflower","208":"Parsnip","209":"Radish","210":"Wheat","211":"Kale","212":"Apple","213":"Blueberry","214":"Orange","215":"Eggplant","216":"Corn","217":"Banana","218":"Red Pansy","219":"Yellow Pansy","220":"Purple Pansy","221":"White Pansy","222":"Blue Pansy","223":"Red Cosmos","224":"Yellow Cosmos","225":"Purple Cosmos","226":"White Cosmos","227":"Blue Cosmos","228":"Red Balloon Flower","229":"Yellow Balloon Flower","230":"Purple Balloon Flower","231":"White Balloon Flower","232":"Blue Balloon Flower","233":"Red Carnation","234":"Yellow Carnation","235":"Purple Carnation","236":"White Carnation","237":"Blue Carnation","238":"Prism Petal","239":"Celestial Frostbloom","240":"Primula Enigma","241":"Red Daffodil","242":"Yellow Daffodil","243":"Purple Daffodil","244":"White Daffodil","245":"Blue Daffodil","246":"Red Lotus","247":"Yellow Lotus","248":"Purple Lotus","249":"White Lotus","250":"Blue Lotus","251":"Soybean","252":"Grape","253":"Rice","254":"Olive","255":"Tomato","256":"Lemon","257":"Barley","258":"Rhubarb","259":"Zucchini","260":"Yam","261":"Broccoli","262":"Pepper","263":"Onion","264":"Turnip","265":"Artichoke","266":"Duskberry","267":"Lunara","268":"Celestine","269":"Red Edelweiss","270":"Yellow Edelweiss","271":"Purple Edelweiss","272":"White Edelweiss","273":"Blue Edelweiss","274":"Red Gladiolus","275":"Yellow Gladiolus","276":"Purple Gladiolus","277":"White Gladiolus","278":"Blue Gladiolus","279":"Red Lavender","280":"Yellow Lavender","281":"Purple Lavender","282":"White Lavender","283":"Blue Lavender","284":"Red Clover","285":"Yellow Clover","286":"Purple Clover","287":"White Clover","288":"Blue Clover","301":"Axe","302":"Pickaxe","303":"Stone Pickaxe","304":"Iron Pickaxe","305":"Hammer","306":"Rod","307":"Rusty Shovel","308":"Shovel","309":"Crab Pot","310":"Sand Shovel","311":"Sand Drill","312":"Gold Pickaxe","313":"Oil Drill","314":"Petting Hand","315":"Brush","316":"Music Box","317":"Mariner Pot","318":"Salt Rake","401":"Sunflower Statue","402":"Potato Statue","403":"Christmas Tree","404":"Scarecrow","405":"Farm Cat","406":"Farm Dog","407":"Gnome","408":"Chicken Coop","409":"Gold Egg","410":"Golden Cauliflower","411":"Sunflower Tombstone","412":"Sunflower Rock","413":"Goblin Crown","414":"Fountain","415":"Woody the Beaver","416":"Apprentice Beaver","417":"Foreman Beaver","418":"Mysterious Parsnip","419":"Carrot Sword","420":"Nancy","421":"Kuebiko","422":"Nyon Statue","423":"Farmer Bath","424":"Homeless Tent","425":"Mysterious Head","426":"Golden Bonsai","427":"Rock Golem","428":"Tunnel Mole","429":"Rocky the Mole","430":"Nugget","431":"Wicker Man","432":"Victoria Sisters","433":"Peeled Potato","434":"Cabbage Boy","435":"Cabbage Girl","436":"Wood Nymph Wendy","437":"Stellar Sunflower","438":"Potent Potato","439":"Radical Radish","441":"Immortal Pear","442":"Lady Bug","443":"Squirrel Monkey","444":"Black Bearry","445":"Ayam Cemani","446":"Maneki Neko","447":"Tiki Totem","448":"Lunar Calendar","449":"Treasure Map","450":"Heart of Davy Jones","451":"Heart Balloons","452":"Flamingo","453":"Blossom Tree","454":"Iron Idol","455":"Karkinos","456":"Mushroom House","457":"Purple Trail","458":"Obie","459":"Maximus","460":"Genie Lamp","461":"Hoot","462":"Basic Scarecrow","463":"Emerald Turtle","464":"Tin Turtle","465":"Bale","466":"Sir Goldensnout","467":"Scary Mike","468":"Laurie the Chuckle Crow","469":"Freya Fox","470":"El Pollo Veloz","471":"Poppy","472":"Grain Grinder","473":"Kernaldo","474":"Queen Cornelia","475":"Lab Grown Carrot","476":"Lab Grown Pumpkin","477":"Lab Grown Radish","478":"Walrus","479":"Alba","480":"Knowledge Crab","481":"Anchor","482":"Goblet","483":"Rubber Ducky","484":"Kraken Head","485":"Skill Shrimpy","486":"Soil Krabby","487":"Nana","488":"Banana Chicken","489":"Grinx's Hammer","490":"Humming Bird","491":"Queen Bee","492":"Flower Fox","493":"Hungry Caterpillar","494":"Crim Peckster","495":"Turbo Sprout","496":"Soybliss","497":"Grape Granny","498":"Royal Throne","499":"Lily Egg","500":"Knight Chicken","501":"Pumpkin Soup","502":"Roasted Cauliflower","503":"Sauerkraut","504":"Radish Pie","505":"Sunflower Cake","506":"Potato Cake","507":"Pumpkin Cake","508":"Carrot Cake","509":"Cabbage Cake","510":"Beetroot Cake","511":"Cauliflower Cake","512":"Parsnip Cake","513":"Radish Cake","514":"Wheat Cake","515":"Boiled Eggs","516":"Bumpkin Broth","517":"Bumpkin Salad","518":"Goblin's Treat","519":"Mashed Potato","520":"Cauliflower Burger","521":"Club Sandwich","522":"Roast Veggies","523":"Pancakes","524":"Apple Pie","525":"Blueberry Jam","526":"Fermented Carrots","527":"Honey Cake","528":"Kale & Mushroom Pie","529":"Kale Stew","530":"Mushroom Jacket Potatoes","531":"Mushroom Soup","532":"Orange Cake","533":"Sunflower Crunch","534":"Reindeer Carrot","535":"Apple Juice","536":"Orange Juice","537":"Purple Smoothie","538":"Power Smoothie","539":"Bumpkin Detox","540":"Pirate Cake","541":"Bumpkin Roast","542":"Goblin Brunch","543":"Fruit Salad","544":"Kale Omelette","545":"Cabbers n Mash","546":"Fancy Fries","547":"Bumpkin ganoush","548":"Cornbread","549":"Eggplant Cake","550":"Popcorn","551":"Chowder","552":"Gumbo","553":"Fermented Fish","554":"Banana Blast","555":"Beetroot Blaze","556":"Rapid Roast","557":"Shroom Syrup","558":"Carrot Juice","559":"Seafood Basket","560":"Fish Burger","561":"Fish n Chips","562":"Fish Omelette","563":"Fried Calamari","564":"Fried Tofu","565":"Grape Juice","566":"Ocean's Olive","567":"Quick Juice","568":"Rice Bun","569":"Slow Juice","570":"Steamed Red Rice","571":"Sushi Roll","572":"The Lot","573":"Tofu Scramble","574":"Antipasto","575":"Caponata","576":"Glazed Carrots","577":"Paella","578":"Cheese","579":"Pizza Margherita","580":"Blue Cheese","581":"Honey Cheddar","582":"Caprese Salad","583":"Sour Shake","584":"Spaghetti al Limone","585":"Lemon Cheesecake","586":"Trade Cake","601":"Wood","602":"Stone","603":"Iron","604":"Gold","605":"Egg","606":"Chicken","607":"Cow","608":"Pig","609":"Sheep","610":"Speed Chicken","611":"Fat Chicken","612":"Rich Chicken","613":"Rooster","614":"Honey","615":"Wild Mushroom","616":"Magic Mushroom","617":"Diamond","618":"Tree","619":"Stone Rock","620":"Iron Rock","621":"Gold Rock","622":"Crop Plot","623":"Fruit Patch","624":"Boulder","625":"Basic Land","626":"Earthworm","627":"Grub","628":"Red Wiggler","629":"Sprout Mix","630":"Fruitful Blend","631":"Rapid Root","632":"Fishing Lure","633":"Beehive","634":"Flower Bed","635":"Crimstone Rock","636":"Crimstone","637":"Sunstone Rock","638":"Sunstone","639":"Oil","640":"Oil Reserve","641":"Leather","642":"Wool","643":"Merino Wool","644":"Feather","645":"Milk","646":"Hay","647":"Kernel Blend","648":"NutriBarley","649":"Mixed Grain","650":"Barn Delight","651":"Cushion","652":"Timber","653":"Bee Box","654":"Crimsteel","655":"Merino Cushion","656":"Kelp Fibre","657":"Hardened Leather","658":"Synthetic Fabric","659":"Ocean's Treasure","660":"Royal Bedding","661":"Royal Ornament","662":"Omnifeed","663":"Obsidian","664":"Lava Pit","665":"Salt","666":"Refined Salt","667":"Salt Lick","668":"Honey Treat","669":"Spice Base","670":"Spiced Cheese","671":"Ascension Crystal","672":"Ascension Shard","701":"Green Thumb","702":"Barn Manager","703":"Seed Specialist","704":"Wrangler","705":"Lumberjack","706":"Prospector","707":"Logger","708":"Gold Rush","709":"Artist","710":"Coder","711":"Liquidity Provider","712":"Discord Mod","713":"Trading Ticket","714":"Warrior","715":"Beta Pass","716":"Red Envelope","717":"Love Letter","718":"Block Buck","719":"Solar Flare Ticket","720":"Dawn Breaker Ticket","721":"Sunflower Supporter","722":"Solar Flare Banner","723":"Dawn Breaker Banner","724":"Witches' Eve Banner","725":"Crow Feather","726":"Gold Pass","727":"Potion Ticket","728":"Bud Ticket","729":"Bud Seedling","730":"Catch the Kraken Banner","731":"Mermaid Scale","732":"Community Coin","733":"Arcade Token","734":"Farmhand Coupon","735":"Farmhand","736":"Spring Blossom Banner","737":"Tulip Bulb","738":"Clash of Factions Banner","739":"Scroll","740":"Lifetime Farmer Banner","741":"Goblin Emblem","742":"Bumpkin Emblem","743":"Sunflorian Emblem","744":"Nightshade Emblem","745":"Mark","746":"Pharaoh's Treasure Banner","747":"Amber Fossil","748":"Gem","749":"Bull Run Banner","750":"Cow Skull","751":"Horseshoe","752":"Trade Point","753":"Winds of Change Banner","754":"Timeshard","755":"Ancient Clock","756":"Love Charm","757":"Easter Token 2025","758":"Great Bloom Banner","759":"Geniseed","760":"Broken Pillar","761":"Colors Token 2025","762":"Better Together Banner","763":"Bracelet","764":"Coprolite","765":"Cheer","766":"Paw Prints Banner","767":"Pet Cookie","768":"Moon Crystal","769":"Halloween Token 2025","770":"Holiday Token 2025","771":"Crabs and Traps Banner","772":"Floater","773":"Ammonite Shell","774":"April Fools Token 2026","775":"Skill Reset Ticket","776":"Colors Token 2026","801":"Australian Flag","802":"Belgian Flag","803":"Brazilian Flag","804":"Chinese Flag","805":"Finnish Flag","806":"French Flag","807":"German Flag","808":"Indonesian Flag","809":"Indian Flag","810":"Iranian Flag","811":"Italian Flag","812":"Japanese Flag","813":"Moroccan Flag","814":"Dutch Flag","815":"Philippine Flag","816":"Polish Flag","817":"Portuguese Flag","818":"Russian Flag","819":"Saudi Arabian Flag","820":"South Korean Flag","821":"Spanish Flag","822":"Sunflower Flag","823":"Thai Flag","824":"Turkish Flag","825":"Ukrainian Flag","826":"American Flag","827":"Vietnamese Flag","828":"Canadian Flag","829":"Singaporean Flag","830":"British Flag","831":"Sierra Leone Flag","832":"Romanian Flag","833":"Rainbow Flag","834":"Goblin Flag","835":"Pirate Flag","836":"Algerian Flag","837":"Mexican Flag","838":"Dominican Republic Flag","839":"Argentinian Flag","840":"Lithuanian Flag","841":"Malaysian Flag","842":"Colombian Flag","901":"Egg Basket","902":"Red Egg","903":"Blue Egg","904":"Yellow Egg","905":"Pink Egg","906":"Purple Egg","907":"Orange Egg","908":"Green Egg","909":"Easter Bunny","910":"Engine Core","911":"Observatory","912":"Goblin Key","913":"Sunflower Key","914":"Ancient Goblin Sword","915":"Ancient Human Warhammer","916":"Rapid Growth","917":"War Bond","918":"Goblin War Point","919":"Human War Point","920":"Human War Banner","921":"Goblin War Banner","923":"Jack-o-lantern","924":"Golden Crop","925":"Wooden Compass","926":"Pablo The Bunny","927":"Iron Compass","928":"Old Bottle","929":"Emerald Compass","930":"Earn Alliance Banner","931":"Treasure Key","932":"Luxury Key","933":"Rare Key","934":"Prize Ticket","935":"Baby Panda","936":"Baozi","937":"Community Egg","938":"Hungry Hare","939":"Bumpkin Faction Banner","940":"Nightshade Faction Banner","941":"Sunflorian Faction Banner","942":"Goblin Faction Banner","943":"Polygon Banner","944":"Ronin Banner","945":"Base Banner","946":"Paw Prints Raffle Ticket","947":"Crabs and Traps Raffle Ticket","1001":"Market","1002":"Fire Pit","1003":"Workbench","1004":"Tent","1005":"Water Well","1006":"Hen House","1007":"Bakery","1008":"Kitchen","1009":"Deli","1010":"Smoothie Shack","1011":"Toolshed","1012":"Warehouse","1013":"Town Center","1014":"Compost Bin","1015":"Turbo Composter","1016":"Premium Composter","1017":"House","1018":"Manor","1019":"Greenhouse","1020":"Crop Machine","1021":"Barn","1022":"Crafting Box","1023":"Mansion","1024":"Pet House","1025":"Fish Market","1026":"Aging Shed","1101":"Chef Apron","1102":"Chef Hat","1103":"Sunflower Amulet","1104":"Carrot Amulet","1105":"Beetroot Amulet","1106":"Green Amulet","1107":"Warrior Shirt","1108":"Warrior Helmet","1109":"Warrior Pants","1110":"Sunflower Shield","1111":"Skull Hat","1112":"War Skull","1113":"War Tombstone","1114":"Undead Rooster","1201":"White Tulips","1202":"Potted Sunflower","1203":"Cactus","1204":"Basic Bear","1205":"Chef Bear","1206":"Construction Bear","1207":"Angel Bear","1208":"Badass Bear","1209":"Bear Trap","1210":"Brilliant Bear","1211":"Classy Bear","1212":"Farmer Bear","1213":"Sunflower Bear","1214":"Rich Bear","1215":"Potted Potato","1216":"Potted Pumpkin","1217":"Christmas Bear","1218":"Rainbow Artist Bear","1219":"Christmas Snow Globe","1220":"Devil Bear","1221":"Collectible Bear","1222":"Cyborg Bear","1223":"Abandoned Bear","1224":"Turtle Bear","1225":"T-Rex Skull","1226":"Sunflower Coin","1227":"Foliant","1228":"Skeleton King Staff","1229":"Lifeguard Bear","1230":"Snorkel Bear","1231":"Parasaur Skull","1232":"Golden Bear Head","1233":"Pirate Bear","1234":"Goblin Bear","1235":"Galleon","1236":"Easter Bear","1237":"Dinosaur Bone","1238":"Human Bear","1239":"Whale Bear","1240":"Valentine Bear","1241":"Palm Tree","1242":"Beach Ball","1243":"Easter Bush","1244":"Giant Carrot","1245":"Dirt Path","1246":"Bush","1247":"Fence","1248":"Shrub","1249":"Luminous Lantern","1250":"Radiance Lantern","1251":"Aurora Lantern","1252":"Bonnie's Tombstone","1253":"Chestnut Fungi Stool","1254":"Crimson Cap","1255":"Dawn Umbrella Seat","1256":"Eggplant Grill","1257":"Giant Dawn Mushroom","1258":"Grubnash's Tombstone","1259":"Mahogany Cap","1260":"Toadstool Seat","1261":"Clementine","1262":"Cobalt","1263":"Shroom Glow","1264":"Genie Bear","1265":"Ocean Lantern","1266":"Beta Bear","1267":"Field Maple","1268":"Red Maple","1269":"Golden Maple","1270":"Pine Tree","1271":"Stone Fence","1272":"Solar Lantern","1273":"Betty Lantern","1274":"Bumpkin Lantern","1275":"Eggplant Bear","1276":"Goblin Lantern","1277":"Dawn Flower","1278":"Candles","1279":"Haunted Stump","1280":"Spooky Tree","1281":"Giant Cabbage","1282":"Giant Potato","1283":"Giant Pumpkin","1284":"Town Sign","1285":"Observer","1286":"Crow Rock","1287":"Mini Corn Maze","1288":"White Crow","1289":"Lifeguard Ring","1290":"Surfboard","1291":"Hideaway Herman","1292":"Shifty Sheldon","1293":"Tiki Torch","1294":"Beach Umbrella","1295":"Sapo Docuras","1296":"Sapo Travessuras","1297":"Time Warp Totem","1298":"Bumpkin Nutcracker","1299":"Festive Tree","1301":"Pirate Bounty","1302":"Pearl","1303":"Coral","1304":"Clam Shell","1305":"Pipi","1306":"Starfish","1307":"Seaweed","1308":"Sea Cucumber","1309":"Crab","1401":"Black Magic","1402":"Golden Helios","1403":"Chiogga","1404":"Purple Cauliflower","1405":"Adirondack Potato","1406":"Warty Goblin Pumpkin","1407":"White Carrot","1408":"Camel Bone","1409":"Cockle Shell","1410":"Hieroglyph","1411":"Sand","1412":"Scarab","1413":"Vase","1501":"Anchovy","1502":"Butterflyfish","1503":"Blowfish","1504":"Clownfish","1505":"Sea Bass","1506":"Sea Horse","1507":"Horse Mackerel","1508":"Squid","1509":"Red Snapper","1510":"Moray Eel","1511":"Olive Flounder","1512":"Napoleanfish","1513":"Surgeonfish","1514":"Zebra Turkeyfish","1515":"Ray","1516":"Hammerhead shark","1517":"Tuna","1518":"Mahi Mahi","1519":"Blue Marlin","1520":"Oarfish","1521":"Football fish","1522":"Sunfish","1523":"Coelacanth","1524":"Whale Shark","1525":"Barred Knifejaw","1526":"Saw Shark","1527":"White Shark","1528":"Twilight Anglerfish","1529":"Starlight Tuna","1530":"Radiant Ray","1531":"Phantom Barracuda","1532":"Gilded Swordfish","1533":"Kraken Tentacle","1534":"Angelfish","1535":"Halibut","1536":"Parrotfish","1537":"Crimson Carp","1538":"Battle Fish","1539":"Lemon Shark","1540":"Longhorn Cowfish","1541":"Porgy","1542":"Muskellunge","1543":"Trout","1544":"Walleye","1545":"Weakfish","1546":"Rock Blackfish","1547":"Cobia","1548":"Tilapia","1549":"Super Star","1550":"Giant Isopod","1551":"Nautilus","1552":"Dollocaris","2001":"White Festive Fox","2002":"Rug","2003":"Wardrobe","2004":"Sunrise Bloom Rug","2005":"Blossom Royale","2006":"Rainbow","2007":"Enchanted Rose","2008":"Flower Cart","2009":"Capybara","2010":"Blossombeard","2011":"Flower Rug","2012":"Tea Rug","2013":"Green Field Rug","2014":"Fancy Rug","2015":"Clock","2016":"Vinny","2017":"Desert Gnome","2018":"Gaucho Rug","2019":"Bullseye Board","2020":"Chess Rug","2021":"Cluckapult","2022":"Golden Gallant","2023":"Golden Garrison","2024":"Golden Guardian","2025":"Novice Knight","2026":"Regular Pawn","2027":"Rookie Rook","2028":"Silver Sentinel","2029":"Silver Squire","2030":"Silver Stallion","2031":"Trainee Target","2032":"Twister Rug","2033":"Battlecry Drum","2034":"Rice Panda","2035":"Benevolence Flag","2036":"Devotion Flag","2037":"Generosity Flag","2038":"Splendor Flag","2039":"Jelly Lamp","2040":"Paint Can","2041":"Sunflorian Throne","2042":"Nightshade Throne","2043":"Goblin Throne","2044":"Bumpkin Throne","2045":"Golden Sunflorian Egg","2046":"Goblin Mischief Egg","2047":"Bumpkin Charm Egg","2048":"Nightshade Veil Egg","2049":"Emerald Goblin Goblet","2050":"Opal Sunflorian Goblet","2051":"Sapphire Bumpkin Goblet","2052":"Amethyst Nightshade Goblet","2053":"Golden Faction Goblet","2054":"Ruby Faction Goblet","2055":"Sunflorian Bunting","2056":"Nightshade Bunting","2057":"Goblin Bunting","2058":"Bumpkin Bunting","2059":"Sunflorian Candles","2060":"Nightshade Candles","2061":"Goblin Candles","2062":"Bumpkin Candles","2063":"Sunflorian Left Wall Sconce","2064":"Nightshade Left Wall Sconce","2065":"Goblin Left Wall Sconce","2066":"Bumpkin Left Wall Sconce","2067":"Sunflorian Right Wall Sconce","2068":"Nightshade Right Wall Sconce","2069":"Goblin Right Wall Sconce","2070":"Bumpkin Right Wall Sconce","2071":"Gourmet Hourglass","2072":"Harvest Hourglass","2073":"Timber Hourglass","2074":"Ore Hourglass","2075":"Orchard Hourglass","2076":"Blossom Hourglass","2077":"Fisher's Hourglass","2078":"Sunflorian Faction Rug","2079":"Nightshade Faction Rug","2080":"Goblin Faction Rug","2081":"Bumpkin Faction Rug","2082":"Goblin Gold Champion","2083":"Goblin Silver Champion","2084":"Goblin Bronze Champion","2085":"Bumpkin Bronze Champion","2086":"Bumpkin Gold Champion","2087":"Bumpkin Silver Champion","2088":"Nightshade Bronze Champion","2089":"Nightshade Gold Champion","2090":"Nightshade Silver Champion","2091":"Sunflorian Bronze Champion","2092":"Sunflorian Gold Champion","2093":"Sunflorian Silver Champion","2100":"Desert Rose","2101":"Hapy Jar","2102":"Duamutef Jar","2103":"Qebehsenuef Jar","2104":"Imsety Jar","2105":"Cannonball","2106":"Sarcophagus","2107":"Clay Tablet","2108":"Snake in Jar","2109":"Reveling Lemon","2110":"Anubis Jackal","2111":"Sundial","2112":"Sand Golem","2113":"Cactus King","2114":"Lemon Frog","2115":"Scarab Beetle","2116":"Pharaoh Chicken","2117":"Adrift Ark","2118":"Castellan","2119":"Sunlit Citadel","2120":"Pharaoh Gnome","2121":"Lemon Tea Bath","2122":"Tomato Clown","2123":"Pyramid","2124":"Oasis","2125":"Paper Reed","2126":"Baobab Tree","2127":"Camel","2128":"Tomato Bombard","2129":"Stone Beetle","2130":"Iron Beetle","2131":"Gold Beetle","2132":"Fairy Circle","2133":"Squirrel","2134":"Macaw","2135":"Butterfly","2136":"Marty","2137":"Miffy","2138":"Mog","2139":"Morty","2140":"Basic Bed","2141":"Sturdy Bed","2142":"Floral Bed","2143":"Fisher Bed","2144":"Pirate Bed","2145":"Cow Bed","2146":"Desert Bed","2147":"Royal Bed","2148":"Cow Scratcher","2149":"Spinning Wheel","2150":"Sleepy Rug","2151":"Meteorite","2152":"Sheaf of Plenty","2153":"Mechanical Bull","2154":"King of Bears","2155":"Moo-ver","2156":"Swiss Whiskers","2157":"Cluckulator","2158":"UFO","2159":"Chicory","2160":"Wagon","2161":"Black Sheep","2162":"Alien Chicken","2163":"Mootant","2164":"Toxic Tuft","2165":"Crop Circle","2166":"Halloween Scarecrow","2167":"Vampire Bear","2168":"Super Totem","2169":"Christmas Stocking","2170":"Golden Christmas Stocking","2171":"Cozy Fireplace","2172":"Christmas Rug","2173":"Christmas Candle","2174":"Santa Penguin","2175":"Penguin Pool","2176":"Snowman","2177":"Festive Toy Train","2178":"Golden Cow","2179":"Tornado Pinwheel","2180":"Mangrove","2181":"Thermal Stone","2182":"Protective Pesticide","2183":"Volcano Gnome","2184":"Kite","2185":"Acorn House","2186":"Spring Duckling","2187":"Igloo","2188":"Ugly Duckling","2189":"Lake Rug","2190":"Hammock","2191":"Mammoth","2192":"Cup of Chocolate","2193":"Golden Sheep","2194":"Barn Blueprint","2195":"Mama Duck","2196":"Summer Duckling","2197":"Autumn Duckling","2198":"Winter Duckling","2199":"Frozen Cow","2200":"Frozen Sheep","2201":"Summer Chicken","2202":"Chamomile","2203":"Jellyfish","2204":"Rhubarb Tart","2205":"Jin","2206":"Floral Arch","2207":"Flower Coin","2208":"Flower Statue","2209":"Heartstruck Tree","2210":"Mermaid Fountain","2211":"Mysterious Entrance","2212":"Streamer's Statue","2213":"Cetus","2214":"Goldcrest Mosaic Rug","2215":"Sandy Mosaic Rug","2216":"Twilight Rug","2217":"Orchard Rug","2218":"Carrot Rug","2219":"Beetroot Rug","2220":"Harlequin Rug","2221":"Large Rug","2222":"Golden Fence","2223":"Golden Stone Fence","2224":"Golden Pine Tree","2225":"Golden Tree","2226":"Golden Bush","2227":"Black Tile","2228":"Blue Tile","2229":"Green Tile","2230":"Purple Tile","2231":"Red Tile","2232":"Yellow Tile","2234":"Easter Ticket 2025","2235":"Carrot House","2236":"Orange Bunny Lantern","2237":"White Bunny Lantern","2238":"Orange Tunnel Bunny","2239":"White Tunnel Bunny","2240":"Easter Basket","2241":"Bronze Love Box","2242":"Silver Love Box","2243":"Gold Love Box","2244":"Test Box","2245":"Bronze Flower Box","2246":"Silver Flower Box","2247":"Gold Flower Box","2248":"Bronze Food Box","2249":"Silver Food Box","2250":"Gold Food Box","2251":"Bronze Tool Box","2252":"Silver Tool Box","2253":"Gold Tool Box","2254":"Pink Dolphin","2255":"Love Chicken","2256":"Dr Cow","2257":"Nurse Sheep","2258":"Lunalist","2259":"Quarry","2260":"Obsidian Turtle","2261":"Winter Guardian","2262":"Summer Guardian","2263":"Spring Guardian","2264":"Autumn Guardian","2265":"Sky Pillar","2266":"Flower-Scribed Statue","2267":"Balloon Rug","2268":"Giant Yam","2269":"Heart Air Balloon","2270":"Giant Zucchini","2271":"Mini Floating Island","2272":"Giant Kale","2273":"Colors Ticket 2025","2274":"Paint Buckets","2275":"Rainbow Well","2276":"Floating Toy","2277":"Rainbow Flower","2278":"Pony Toy","2279":"Red Slime Balloon","2280":"Blue Slime Balloon","2281":"Big Orange","2282":"Big Apple","2283":"Big Banana","2284":"Farmer's Monument","2285":"Miner's Monument","2286":"Woodcutter's Monument","2287":"Teamwork Monument","2288":"Basic Cooking Pot","2289":"Expert Cooking Pot","2290":"Advanced Cooking Pot","2291":"Trash","2292":"Dung","2293":"Weed","2294":"Floor Mirror","2295":"Long Rug","2296":"Garbage Bin","2297":"Wheelbarrow","2298":"Snail King","2299":"Reelmaster's Chair","2300":"Rat King","2301":"Fruit Tune Box","2302":"Double Bed","2303":"Giant Artichoke","2304":"Rocket Statue","2305":"Ant Queen","2306":"Jurassic Droplet","2307":"Giant Onion","2308":"Giant Turnip","2309":"Groovy Gramophone","2310":"Wheat Whiskers","2311":"Gold Cooking Trophy","2312":"Silver Cooking Trophy","2313":"Bronze Cooking Trophy","2314":"Anthill","2315":"Rat","2316":"Snail","2317":"Pest Net","2318":"Poseidon","2319":"Giant Orange","2320":"Giant Apple","2321":"Giant Banana","2322":"Halloween Ticket 2025","2323":"Cerberus","2324":"Witch's Cauldron","2325":"Raveyard","2326":"Haunted House","2327":"Mimic Egg","2328":"Haunted Tomb","2329":"Guillotine","2330":"Vampire Coffin","2331":"Paw Prints Rug","2332":"Pet Bed","2333":"Moon Fox Statue","2334":"Giant Acorn","2335":"Pet Bowls","2336":"Squeaky Chicken","2337":"Holiday Ticket 2025","2338":"Holiday Decorative Totem","2339":"Red Holiday Ornament","2340":"Green Holiday Ornament","2341":"Gift Turtle","2342":"Red Nose Reindeer","2343":"Tuxedo Claus","2344":"Winter Alpaca","2345":"Penguin Surprise","2346":"Frozen Meat","2347":"Ho Ho oh oh…","2348":"Teeth Toy","2349":"Fake Treasure","2350":"Fake Mouse","2351":"Pet Tree","2352":"Definitely not a Flower","2353":"April Fools Ticket 2026","2354":"Bumpkin Rug","2355":"Goblin Rug","2356":"Pet Rug","2357":"Jester in a box","2358":"The Sunflower Man Statue","2359":"Blue Paint Bucket","2360":"Green Paint Bucket","2361":"Purple Paint Bucket","2362":"Yellow Paint Bucket","2363":"Color Wheel","2364":"Dhol Drum","2365":"Mimic Slime Ball","2366":"Mimic Winged Slime Ball","2367":"Pork Jelly","2368":"Rainbow Pork Jelly","2369":"Slime Totem","2370":"Giant Donut","2371":"Fool's Gold","2372":"Golden Slime Trophy","2373":"Silver Slime Trophy","2374":"Bronze Slime Trophy","2375":"Colors Ticket 2026","2400":"Basic Biome","2401":"Spring Biome","2402":"Desert Biome","2403":"Volcano Biome","2404":"Swamp Biome","2405":"Spooky Biome","2406":"Crystal Biome","2407":"Galaxy Biome","2408":"Marble Age Biome","2501":"Doll","2502":"Buzz Doll","2503":"Lunar Doll","2504":"Juicy Doll","2505":"Crude Doll","2506":"Cluck Doll","2507":"Wooly Doll","2508":"Moo Doll","2509":"Bloom Doll","2510":"Shadow Doll","2511":"Ember Doll","2512":"Gilded Doll","2513":"Lumber Doll","2514":"Harvest Doll","2515":"Sizzle Doll","2516":"Angler Doll","2517":"Dune Doll","2518":"Mouse Doll","2519":"Grubby Doll","2520":"Nefari Doll","2521":"Frosty Doll","2522":"Cosmo Doll","2523":"Bigfin Doll","2524":"Solar Doll","2525":"Baby Cow","2526":"Baby Sheep","2527":"Venus Bumpkin Trap","2528":"Janitor Chicken","2529":"Black Hole Flower","2530":"Sleepy Chicken","2531":"Astronaut Cow","2532":"Astronaut Sheep","2533":"Bronze Friends Trophy","2534":"Silver Friends Trophy","2535":"Gold Friends Trophy","2536":"Mermaid Cow","2537":"Mermaid Sheep","2538":"Squid Chicken","2539":"Anemone Flower","2600":"Pet Egg","2601":"Barkley","2602":"Meowchi","2603":"Twizzle","2604":"Burro","2605":"Mudhorn","2606":"Nibbles","2607":"Waddles","2608":"Ramsey","2609":"Biscuit","2610":"Cloudy","2611":"Butters","2612":"Smokey","2613":"Flicker","2614":"Pippin","2615":"Pinto","2616":"Roan","2617":"Stallion","2618":"Bison","2619":"Oxen","2620":"Peanuts","2621":"Pip","2622":"Skipper","2630":"Acorn","2631":"Ruffroot","2632":"Chewed Bone","2633":"Heart leaf","2634":"Moonfur","2635":"Fossil Shell","2636":"Ribbon","2637":"Dewberry","2638":"Wild Grass","2639":"Frost Pebble","2650":"Fox Shrine","2651":"Boar Shrine","2652":"Hound Shrine","2653":"Stag Shrine","2654":"Legendary Shrine","2655":"Mole Shrine","2656":"Bear Shrine","2657":"Tortoise Shrine","2658":"Moth Shrine","2659":"Obsidian Shrine","2660":"Sparrow Shrine","2661":"Toucan Shrine","2662":"Collie Shrine","2663":"Badger Shrine","2664":"Bantam Shrine","2665":"Trading Shrine","2700":"Fused Stone Rock","2701":"Reinforced Stone Rock","2702":"Ancient Tree","2703":"Sacred Tree","2704":"Refined Iron Rock","2705":"Tempered Iron Rock","2706":"Pure Gold Rock","2707":"Prime Gold Rock","2708":"Petnip Plant","2709":"Pet Kennel","2710":"Pet Toys","2711":"Pet Playground","2712":"Fish Bowl","2713":"Giant Gold Bone","2714":"Lunar Temple","2715":"Magma Stone","2716":"Cornucopia","2717":"Messy Bed","2718":"Basic Farming Pack","2719":"Basic Food Box","2720":"Weekly Mega Box","2721":"Basic Love Box","2722":"Fish Flake","2723":"Fish Stick","2724":"Fish Oil","2725":"Crab Stick","2726":"Furikake Sprinkle","2727":"Surimi Rice Bowl","2728":"Creamy Crab Bite","2729":"Crimstone Infused Fish Oil","2800":"Isopod","2801":"Blue Crab","2802":"Lobster","2803":"Hermit Crab","2804":"Shrimp","2805":"Mussel","2806":"Oyster","2807":"Anemone","2808":"Barnacle","2809":"Sea Slug","2810":"Sea Snail","2811":"Garden Eel","2812":"Sea Grapes","2813":"Octopus","2814":"Sea Urchin","2815":"Horseshoe Crab","2816":"Diving Helmet","2817":"Speckled Kissing Fish","2818":"Dark Eyed Kissing Fish","2819":"Fisherman's Boat","2820":"Sea Arch","2821":"Crabs and Fish Rug","2822":"Fish Flags","2823":"Fish Drying Rack","2824":"Yellow Submarine Trophy","2825":"Oaken","2826":"Meerkat","2827":"Pearl Bed","2828":"Crimstone Clam","2829":"Poseidon's Throne","2830":"Fish Kite","2831":"CluckCoin","2900":"Aged Anchovy","2901":"Aged Butterflyfish","2902":"Aged Blowfish","2903":"Aged Clownfish","2904":"Aged Angelfish","2905":"Aged Cobia","2906":"Aged Halibut","2907":"Aged Muskellunge","2908":"Aged Parrotfish","2909":"Aged Porgy","2910":"Aged Sea Bass","2911":"Aged Tilapia","2912":"Aged Trout","2913":"Aged Walleye","2914":"Aged Weakfish","2915":"Aged Rock Blackfish","2916":"Aged Sea Horse","2917":"Aged Horse Mackerel","2918":"Aged Squid","2919":"Aged Red Snapper","2920":"Aged Moray Eel","2921":"Aged Olive Flounder","2922":"Aged Napoleanfish","2923":"Aged Surgeonfish","2924":"Aged Zebra Turkeyfish","2925":"Aged Ray","2926":"Aged Hammerhead shark","2927":"Aged Barred Knifejaw","2928":"Aged Tuna","2929":"Aged Mahi Mahi","2930":"Aged Blue Marlin","2931":"Aged Oarfish","2932":"Aged Football fish","2933":"Aged Sunfish","2934":"Aged Coelacanth","2935":"Aged Whale Shark","2936":"Aged Saw Shark","2937":"Aged White Shark","2938":"Pickled Radish","2939":"Pickled Zucchini","2940":"Pickled Tomato","2941":"Pickled Cabbage","2942":"Pickled Onion","2943":"Pickled Pepper","2944":"Prime Aged Anchovy","2945":"Prime Aged Butterflyfish","2946":"Prime Aged Blowfish","2947":"Prime Aged Clownfish","2948":"Prime Aged Sea Bass","2949":"Prime Aged Sea Horse","2950":"Prime Aged Horse Mackerel","2951":"Prime Aged Halibut","2952":"Prime Aged Squid","2953":"Prime Aged Red Snapper","2954":"Prime Aged Moray Eel","2955":"Prime Aged Olive Flounder","2956":"Prime Aged Napoleanfish","2957":"Prime Aged Surgeonfish","2958":"Prime Aged Zebra Turkeyfish","2959":"Prime Aged Angelfish","2960":"Prime Aged Ray","2961":"Prime Aged Hammerhead shark","2962":"Prime Aged Barred Knifejaw","2963":"Prime Aged Tuna","2964":"Prime Aged Mahi Mahi","2965":"Prime Aged Blue Marlin","2966":"Prime Aged Oarfish","2967":"Prime Aged Football fish","2968":"Prime Aged Sunfish","2969":"Prime Aged Coelacanth","2970":"Prime Aged Parrotfish","2971":"Prime Aged Whale Shark","2972":"Prime Aged Saw Shark","2973":"Prime Aged White Shark","2974":"Prime Aged Porgy","2975":"Prime Aged Muskellunge","2976":"Prime Aged Trout","2977":"Prime Aged Walleye","2978":"Prime Aged Weakfish","2979":"Prime Aged Rock Blackfish","2980":"Prime Aged Cobia","2981":"Prime Aged Tilapia","2982":"Greenhouse Glow","2983":"Greenhouse Goodie","2984":"Sproutroot Surprise","2985":"Turbofruit Mix","2986":"Capsule Bait","2987":"Umbrella Bait","2988":"Crimson Baitfish","2989":"Salt Sculpture","2990":"Pufferfish","2991":"Fat Crab","2992":"Navigation Table","2993":"Royal Crab Pot","2994":"Crab House","2995":"Speed Trap","2996":"Flamingo Chicken","2997":"Salt Crystal Flower","2998":"Spa Cow","2999":"Spa Sheep","3000":"Deep Sea Pig","3001":"Deep Sea Slug","3002":"Crystal Shrimp","3003":"Salt Rock","3004":"Salt Awakening Raffle Ticket","3005":"Salt Awakening Banner","3006":"Salt Dino Egg","3007":"Pickled Broccoli","3008":"Big Table","3009":"Crate","3010":"Empty Pot","3011":"High Table","3012":"Large Podium","3013":"Long Table","3014":"Royal Podium","3015":"Square Table","3016":"Stool","3017":"Crystal Altar","3018":"Dino Egg Trophy","3019":"Salt Lamp","3020":"Salt Crystal Bed","3021":"World Map Rug","3022":"Ripped Salt Bag","3023":"Salt Doll","3024":"Jacuzzi Bear","3025":"Creator Banner","3026":"Design Trophy","3027":"Saltwort","3028":"Saltwort Seed","3029":"Saltbite","3030":"Crocodile","3031":"Dumbo Octopus","3032":"Seahorse Dad","3033":"Ascended Chicken","3034":"Ascended Cow","3035":"Ascended Sheep","3036":"Ruins Flower","3037":"Ascension Age Banner","3038":"Shiny Feather","3039":"Otter Pebble","3040":"Ascension Age Raffle Ticket","3041":"Cloud Bed","3042":"Ascension Monument","3043":"Salt Rug","3044":"Ascended Idol","3045":"Ascended Wheel","3046":"Astrolabe","3047":"Coat Rack","3048":"Lampshade","3049":"Marble Head","3050":"Otty the Otter","3051":"Salt Worker Gnome","3052":"Shards Turtle","3053":"Vibraphone","3054":"Winged Vase","3055":"Letter A Tile","3056":"Letter B Tile","3057":"Letter C Tile","3058":"Letter D Tile","3059":"Letter E Tile","3060":"Letter F Tile","3061":"Letter G Tile","3062":"Letter H Tile","3063":"Letter I Tile","3064":"Letter J Tile","3065":"Letter K Tile","3066":"Letter L Tile","3067":"Letter M Tile","3068":"Letter N Tile","3069":"Letter O Tile","3070":"Letter P Tile","3071":"Letter Q Tile","3072":"Letter R Tile","3073":"Letter S Tile","3074":"Letter T Tile","3075":"Letter U Tile","3076":"Letter V Tile","3077":"Letter W Tile","3078":"Letter X Tile","3079":"Letter Y Tile","3080":"Letter Z Tile","3081":"Champion Rarecrow","3082":"OG Rarecrow","3083":"Loyal Rarecrow"
};

const SFLB_COLLECTIBLE_NAME_TO_ID = (() => {
  const out = {};
  Object.keys(SFLB_COLLECTIBLE_ID_TO_NAME).forEach(id => {
    out[SFLB_COLLECTIBLE_ID_TO_NAME[id].toLowerCase()] = id;
  });
  return out;
})();

const SFLB_RESOURCE_TRADE_NAMES = new Set([
  "Sunflower", "Potato", "Rhubarb", "Pumpkin", "Zucchini", "Carrot", "Yam",
  "Cabbage", "Broccoli", "Soybean", "Beetroot", "Pepper", "Cauliflower",
  "Parsnip", "Eggplant", "Corn", "Onion", "Radish", "Wheat", "Turnip",
  "Kale", "Artichoke", "Barley",
  "Tomato", "Lemon", "Blueberry", "Orange", "Apple", "Banana", "Celestine",
  "Lunara", "Duskberry",
  "Grape", "Rice", "Olive",
  "Wood", "Stone", "Iron", "Gold", "Crimstone", "Salt",
  "Egg", "Feather", "Honey", "Milk", "Leather", "Wool", "Merino Wool",
  "Goblin Emblem", "Sunflorian Emblem", "Bumpkin Emblem", "Nightshade Emblem",
  "Ruffroot", "Chewed Bone", "Heart leaf", "Frost Pebble", "Wild Grass",
  "Ribbon", "Dewberry", "Moonfur", "Capsule Bait", "Umbrella Bait",
  "Crimson Baitfish",
].map(n => n.toLowerCase()));

function sflbIsResourceName(name) {
  return SFLB_RESOURCE_TRADE_NAMES.has(String(name || "").toLowerCase());
}

const SFLB_NON_TRADABLE_NAMES = new Set(["Saltwort"]);
function sflbIsNonTradable(name) {
  return SFLB_NON_TRADABLE_NAMES.has(String(name || ""));
}

function sflbFormatDate(d) {
  return d.toISOString().slice(0, 10);
}

function sflbDateMinus(days) {
  const d = new Date();
  d.setUTCDate(d.getUTCDate() - days);
  return sflbFormatDate(d);
}

const __sflbReportCache = new Map();

async function sflbFetchReportRaw(dateStr) {
  const url = SFL_COMMUNITY_PROXY_BASE + "community/data?type=marketplaceActivity" + (dateStr ? "&date=" + dateStr : "");
  const res = await fetch(url, { cache: "no-store" });
  if (!res.ok) throw new Error("bad status " + res.status);
  const json = await res.json();
  return json && json.data ? json.data : null;
}

async function sflbFetchReport(dateStr) {
  const cacheKey = dateStr || "latest";
  if (__sflbReportCache.has(cacheKey)) return __sflbReportCache.get(cacheKey);
  const todayStr = sflbFormatDate(new Date());
  let result = null;
  try {
    const data = await sflbFetchReportRaw(dateStr);
    const reports = data && data.reports;
    let picked = null;
    if (reports) {
      const keys = Object.keys(reports).sort();
      if (dateStr && reports[dateStr]) {
        picked = { dateStr: dateStr, report: reports[dateStr] };
      } else if (dateStr && keys.length === 1) {
        picked = { dateStr: keys[0], report: reports[keys[0]] };
      } else if (keys.length) {
        picked = { dateStr: keys[keys.length - 1], report: reports[keys[keys.length - 1]] };
      }
    }
    if (picked && dateStr && dateStr !== todayStr && picked.dateStr === todayStr) {
      picked = null;
    }
    if (picked && picked.report && picked.report.items) {
      result = {
        dateStr: picked.dateStr,
        items: picked.report.items,
        flowerPrice: data.flowerPrice || null
      };
    }
  } catch (e) {
    result = null;
  }
  if (!result) {
    const anchorDate = dateStr || todayStr;
    for (let i = 1; i <= 6; i++) {
      const d = new Date(anchorDate + "T00:00:00Z");
      d.setUTCDate(d.getUTCDate() - i);
      const altDate = sflbFormatDate(d);
      if (altDate === todayStr) continue;
      if (__sflbReportCache.has(altDate)) {
        const cached = __sflbReportCache.get(altDate);
        if (cached) {
          result = cached;
          break;
        }
        continue;
      }
      try {
        const data = await sflbFetchReportRaw(altDate);
        const report = data && data.reports && data.reports[altDate];
        if (report && report.items) {
          result = { dateStr: altDate, items: report.items, flowerPrice: data.flowerPrice || null };
          break;
        }
      } catch (e2) {}
    }
  }
  __sflbReportCache.set(cacheKey, result);
  return result;
}

const SFLB_ALLTIME_CACHE_TTL_MS = 3e5;
const __sflbAllTimeCache = new Map();

async function sflbFetchAllTimeStats(collection, id) {
  const key = collection + "-" + id;
  const cached = __sflbAllTimeCache.get(key);
  if (cached && (Date.now() - cached.ts) < SFLB_ALLTIME_CACHE_TTL_MS) return cached.result;
  let result = null;
  try {
    const report = await sflbFetchReport(null);
    const entry = report && report.items ? report.items[key] : null;
    if (entry && typeof entry.low === "number" && typeof entry.high === "number" && entry.low > 0 && entry.high > 0) {
      result = { high: entry.high, low: entry.low };
    }
  } catch (e) {
    result = null;
  }
  __sflbAllTimeCache.set(key, { result: result, ts: Date.now() });
  return result;
}

function sflbCurrentPrice(entry, isResource) {
  if (!entry) return 0;
  if (isResource) {
    if (typeof entry.floor === "number" && isFinite(entry.floor) && entry.floor > 0) return entry.floor;
    if (typeof entry.latestSale === "number" && isFinite(entry.latestSale) && entry.latestSale > 0) return entry.latestSale;
    if (typeof entry.low === "number" && isFinite(entry.low) && entry.low > 0) return entry.low;
    return 0;
  }
  if (typeof entry.latestSale === "number" && isFinite(entry.latestSale) && entry.latestSale > 0) return entry.latestSale;
  if (typeof entry.floor === "number" && isFinite(entry.floor) && entry.floor > 0) return entry.floor;
  if (typeof entry.low === "number" && isFinite(entry.low) && entry.low > 0) return entry.low;
  return 0;
}

function sflbSplitKey(key) {
  const sep = key.lastIndexOf("-");
  if (sep === -1) return null;
  return { collection: key.slice(0, sep), id: key.slice(sep + 1) };
}

function sflbNameForKey(collection, id) {
  if (collection === "collectibles") return SFLB_COLLECTIBLE_ID_TO_NAME[id] || null;
  if (collection === "wearables") return SFL_WEARABLE_ID_TO_NAME[id] || null;
  return null;
}

async function sflbBuildCatalogFromWorker(items, range) {
  const list = [];
  items.forEach(it => {
    const name = sflbNameForKey(it.collection, String(it.id));
    if (!name) return;
    if (sflbIsNonTradable(name)) return;
    if (!it.price) return;
    const pct = range === "7d" ? it.pct7d : it.pct24h;
    const pctHidden = range === "7d" ? it.pct7dHidden : it.pct24hHidden;
    const key = it.collection + "-" + it.id;
    const rangeVolume = range === "7d" ? (typeof it.volume7d === "number" ? it.volume7d : null) : (typeof it.volume24h === "number" ? it.volume24h : null);
    const rangeTrades = range === "7d" ? (typeof it.trades7d === "number" ? it.trades7d : null) : (typeof it.trades24h === "number" ? it.trades24h : null);
    list.push({
      key: key,
      collection: it.collection,
      itemId: String(it.id),
      name: name,
      icon: getIcon(name),
      price: it.price,
      pct: pct || 0,
      pctHidden: !!pctHidden,
      isResource: it.category === "resources",
      volume: rangeVolume,
      trades: rangeTrades,
      category: it.category,
      oneDayHigh: typeof it.oneDayHigh === "number" ? it.oneDayHigh : null,
      oneDayLow: typeof it.oneDayLow === "number" ? it.oneDayLow : null,
      sevenDayHigh: typeof it.sevenDayHigh === "number" ? it.sevenDayHigh : null,
      sevenDayLow: typeof it.sevenDayLow === "number" ? it.sevenDayLow : null,
      volume24h: range === "7d" ? null : rangeVolume,
      volume7d: range === "7d" ? rangeVolume : null,
      trades24h: range === "7d" ? null : rangeTrades,
      trades7d: range === "7d" ? rangeTrades : null
    });
  });
  list.sort((a, b) => (b.volume || 0) - (a.volume || 0));
  return list;
}

async function sflbBuildPriceCatalog(range, forceFresh) {
  const workerItems = await sflbFetchWorkerSnapshot(forceFresh);
  if (workerItems && workerItems.length) {
    const list = await sflbBuildCatalogFromWorker(workerItems, range);
    if (list.length) return { list: list, todayDate: sflbFormatDate(new Date()), cmpDate: null };
  }
  const today = await sflbFetchReport(null);
  if (!today) return null;
  const baseDays = range === "7d" ? 6 : 1;
  let cmp = null;
  for (let extra = 0; extra <= 6; extra++) {
    const cmpDateStr = sflbDateMinus(baseDays + extra);
    const candidate = await sflbFetchReport(cmpDateStr);
    if (candidate && candidate.dateStr !== today.dateStr) {
      cmp = candidate;
      break;
    }
    if (candidate && !cmp) cmp = candidate;
  }
  const list = [];
  Object.keys(today.items).forEach(key => {
    const parts = sflbSplitKey(key);
    if (!parts) return;
    if (parts.collection !== "collectibles" && parts.collection !== "wearables") return;
    const name = sflbNameForKey(parts.collection, parts.id);
    if (!name) return;
    if (sflbIsNonTradable(name)) return;
    const isResource = parts.collection === "collectibles" && sflbIsResourceName(name);
    const cur = today.items[key];
    const price = sflbCurrentPrice(cur, isResource);
    if (!price) return;
    const prevEntry = cmp && cmp.items ? cmp.items[key] : null;
    const category = isResource ? "resources" : (parts.collection === "wearables" ? "wearables" : "collectibles");
    const curVolume = typeof cur.volume === "number" ? cur.volume : 0;
    const curTrades = typeof cur.trades === "number" ? cur.trades : 0;
    const prevVolume = prevEntry && typeof prevEntry.volume === "number" ? prevEntry.volume : null;
    const prevTrades = prevEntry && typeof prevEntry.trades === "number" ? prevEntry.trades : null;
    const rangeVolume = prevVolume !== null && curVolume >= prevVolume ? curVolume - prevVolume : null;
    const rangeTrades = prevTrades !== null && curTrades >= prevTrades ? curTrades - prevTrades : null;
    const prevPrice = sflbCurrentPrice(prevEntry, isResource);
    const pctHidden = !(prevPrice > 0);
    const pct = pctHidden ? 0 : ((price - prevPrice) / prevPrice) * 100;
    const rangeHigh = prevPrice > 0 ? Math.max(price, prevPrice) : price;
    const rangeLow = prevPrice > 0 ? Math.min(price, prevPrice) : price;
    list.push({
      key: key,
      collection: parts.collection,
      itemId: parts.id,
      name: name,
      icon: getIcon(name),
      price: price,
      pct: pct,
      pctHidden: pctHidden,
      isResource: isResource,
      volume: rangeVolume,
      trades: rangeTrades,
      oneDayHigh: range === "7d" ? null : rangeHigh,
      oneDayLow: range === "7d" ? null : rangeLow,
      sevenDayHigh: range === "7d" ? rangeHigh : null,
      sevenDayLow: range === "7d" ? rangeLow : null,
      volume24h: range === "7d" ? null : rangeVolume,
      volume7d: range === "7d" ? rangeVolume : null,
      trades24h: range === "7d" ? null : rangeTrades,
      trades7d: range === "7d" ? rangeTrades : null,
      category: category
    });
  });
  list.sort((a, b) => (b.volume || 0) - (a.volume || 0));
  return { list: list, todayDate: today.dateStr, cmpDate: cmp ? cmp.dateStr : null };
}

let __sflbAnimalTypeByLabel = null;
function sflbAnimalTypeForLabel(label) {
  if (!__sflbAnimalTypeByLabel) {
    __sflbAnimalTypeByLabel = new Map();
    Object.keys(ANIMAL_DATA || {}).forEach(type => {
      const cfg = ANIMAL_DATA[type];
      if (cfg && cfg.label) __sflbAnimalTypeByLabel.set(cfg.label, type);
    });
  }
  return __sflbAnimalTypeByLabel.get(label) || null;
}

function sflbBuildAnimalProductBreakdown(item, marketByLower) {
  const type = sflbAnimalTypeForLabel(item.name);
  if (!type) return null;
  const fig = computeAnimalTypeFigures(type);
  return (fig.products || []).map((pname, idx) => {
    const m = marketByLower.get(String(pname || "").toLowerCase());
    const price = m ? (m.flowerPrice || 0) : 0;
    const unitsPerCycle = (fig.yields[idx] || 0) * item.count;
    const unitsPerDay = unitsPerCycle * (item.cyclesPerDay || 0);
    return {
      name: pname,
      icon: getIcon(pname),
      unitsPerCycle: unitsPerCycle,
      unitsPerDay: unitsPerDay,
      price: price
    };
  });
}

function sflbBuildMyBuildCatalog() {
  gatherTop10ProfitItems();
  const all = getAllProfitItems() || [];
  const marketByLower = new Map();
  (marketItems || []).forEach(m => {
    if (m && m.name) marketByLower.set(String(m.name).toLowerCase(), m);
  });
  const list = [];
  all.forEach(item => {
    if (!item || !(item.count > 0)) return;
    const m = marketByLower.get(String(item.name || "").toLowerCase());
    const sellFlower = m ? (m.flowerPrice || 0) : 0;
    const grossValue = (item.holdingUnitsPerDay || 0) * sellFlower;
    const baseCost24h = Math.max(0, (item.holdingCost24h || 0) - (item.holdingRestockCost24h || 0));
    const restockCost24h = item.holdingRestockCost24hIndividual != null ? item.holdingRestockCost24hIndividual : (item.holdingRestockCost24h || 0);
    const cost24h = baseCost24h + restockCost24h;
    const revenue24h = item.holdingRevenue24h || 0;
    const netValue = revenue24h - cost24h;
    const entry = {
      name: item.name,
      icon: item.icon || getIcon(item.name),
      category: item.category,
      count: item.count,
      countLabel: item.countLabel,
      cyclesPerDay: item.cyclesPerDay,
      cycleTimeSec: item.cycleTimeSec,
      holdingUnitsPerDay: item.holdingUnitsPerDay || 0,
      grossValue: grossValue,
      revenue24h: revenue24h,
      cost24h: cost24h,
      restockCost24h: restockCost24h,
      netValue: netValue,
      price: sellFlower,
      boosts: item.boosts || []
    };
    if (item.category === "Animal") {
      entry.productBreakdown = sflbBuildAnimalProductBreakdown(item, marketByLower);
    }
    list.push(entry);
  });
  list.sort((a, b) => Math.abs(b.netValue || 0) - Math.abs(a.netValue || 0));
  return list;
}
const sflbState = {
  tab: "prices",
  filter: "resources",
  range: "24h",
  displayMode: "pct",
  viewMode: "bubbles",
  sortMode: "profit",
  loaded: false,
  loading: false,
  priceCatalog: null,
  priceCatalogRange: null,
  buildCatalog: null,
  bubbles: [],
  stageEl: null,
  stageW: 0,
  stageH: 0,
  rafId: null,
  lastTs: 0,
  selectedKey: null
};

function sflbTruncFixed(n, digits) {
  const factor = Math.pow(10, digits);
  const truncated = n < 0 ? Math.ceil(n * factor) : Math.floor(n * factor);
  return (truncated / factor).toFixed(digits);
}

function sflbFmtFlower(n) {
  if (!isFinite(n)) return "0";
  const abs = Math.abs(n);
  if (abs >= 1000000) return (n / 1000000).toFixed(2) + "M";
  if (abs >= 1000) return (n / 1000).toFixed(2) + "K";
  if (abs >= 1) return n.toFixed(2);
  return sflbTruncFixed(n, 4);
}

function sflbFmtFlowerSigned(n) {
  if (!isFinite(n)) return "0";
  return (n < 0 ? "-" : "") + sflbFmtFlower(Math.abs(n));
}

function sflbFmtUsdParen(price) {
  const usd = flowerToUsd(price);
  if (usd == null || !isFinite(usd)) return "(—)";
  const abs = Math.abs(usd);
  let decimals = 2;
  if (abs > 0 && abs < 0.01) {
    decimals = Math.min(8, Math.max(2, -Math.floor(Math.log10(abs)) + 1));
  }
  return "($" + usd.toFixed(decimals) + ")";
}

function sflbFmtPct(n) {
  if (!isFinite(n)) return "0.00%";
  const sign = n > 0 ? "+" : "";
  return sign + n.toFixed(2) + "%";
}

function sflbFmtCompactUnits(n) {
  if (!isFinite(n)) return "0";
  const abs = Math.abs(n);
  if (abs >= 1000000) return (n / 1000000).toFixed(2) + "M";
  if (abs >= 1000) return (n / 1000).toFixed(1) + "K";
  return fmtInt(n);
}

function sflbClamp(n, min, max) {
  return Math.max(min, Math.min(max, n));
}

function sflbGetStage() {
  return $("sflBubStage");
}

function sflbStopPhysics() {
  if (sflbState.rafId) {
    cancelAnimationFrame(sflbState.rafId);
    sflbState.rafId = null;
  }
}

function sflbUpdateReportText() {
  const labelEl = $("sflBubReportLabel");
  const textEl = $("sflBubReportText");
  if (!labelEl || !textEl) return;
  const is7d = sflbState.range === "7d";
  labelEl.textContent = is7d ? "7 Days Percentage Bubble Report" : "24Hrs Percentage Bubble Report";
  const rangeText = is7d ? "7 days" : "24 hours";
  textEl.textContent = "The percentage shown on each bubble compares the current price to the lowest price traded in the last " + rangeText + ". For raw resources this uses the floor price (falling back to the latest sale, then the lowest listing); for everything else it uses the latest sale price (falling back to the floor, then the lowest listing).";
}

function sflbApplyFilterVisibility() {
  const filtersEl = $("sflBubFilters");
  const rangeEl = $("sflBubRange");
  const reportEl = $("sflBubReport");
  const buildReportEl = $("sflBubBuildReport");
  const mainEl = $("sflBubMain");
  if (!filtersEl || !rangeEl) return;
  const showPricesControls = sflbState.tab === "prices";
  filtersEl.style.display = showPricesControls ? "flex" : "none";
  rangeEl.style.display = showPricesControls ? "flex" : "none";
  if (reportEl) {
    reportEl.style.display = showPricesControls ? "block" : "none";
    if (showPricesControls) sflbUpdateReportText();
  }
  if (buildReportEl) {
    buildReportEl.style.display = showPricesControls ? "none" : "block";
  }
  if (mainEl) {
    mainEl.classList.toggle("list-mode", showPricesControls && sflbState.viewMode === "list");
  }
}

function sflbBubbleRadiusRange() {
  const w = sflbState.stageW || 320;
  const minR = sflbClamp(w * 0.055, 17, 30);
  const maxR = sflbClamp(w * 0.15, 42, 78);
  return { minR: minR, maxR: maxR };
}

function sflbFindSpiralSpot(b, placed, w, h) {
  const cx = w / 2;
  const cy = h / 2;
  let angle = Math.random() * Math.PI * 2;
  let radius = 0;
  for (let i = 0; i < 2000; i++) {
    const x = sflbClamp(cx + Math.cos(angle) * radius, b.r, Math.max(b.r, w - b.r));
    const y = sflbClamp(cy + Math.sin(angle) * radius, b.r, Math.max(b.r, h - b.r));
    let ok = true;
    for (let j = 0; j < placed.length; j++) {
      const other = placed[j];
      if (Math.hypot(x - other.x, y - other.y) < b.r + other.r + 3) {
        ok = false;
        break;
      }
    }
    if (ok) return { x: x, y: y };
    angle += 0.5;
    radius += 0.9;
  }
  return { x: sflbClamp(cx, b.r, Math.max(b.r, w - b.r)), y: sflbClamp(cy, b.r, Math.max(b.r, h - b.r)) };
}

function sflbPlaceBubbles(list) {
  const w = sflbState.stageW || 320;
  const h = sflbState.stageH || 320;
  const placed = [];
  const order = list.slice().sort((a, b) => b.r - a.r);
  order.forEach(b => {
    let ok = false;
    let x = b.r;
    let y = b.r;
    for (let attempt = 0; attempt < 150 && !ok; attempt++) {
      x = b.r + Math.random() * Math.max(1, w - b.r * 2);
      y = b.r + Math.random() * Math.max(1, h - b.r * 2);
      let clash = false;
      for (let i = 0; i < placed.length; i++) {
        const other = placed[i];
        const dist = Math.hypot(x - other.x, y - other.y);
        if (dist < b.r + other.r + 3) {
          clash = true;
          break;
        }
      }
      if (!clash) ok = true;
    }
    if (!ok) {
      const spot = sflbFindSpiralSpot(b, placed, w, h);
      x = spot.x;
      y = spot.y;
    }
    b.x = x;
    b.y = y;
    b.vx = (Math.random() - 0.5) * 0.25;
    b.vy = (Math.random() - 0.5) * 0.25;
    b.phase = Math.random() * Math.PI * 2;
    b.seed = Math.random() * 10;
    placed.push(b);
  });
}

function sflbBubbleClass(b) {
  if (sflbState.tab === "mybuild") return (b.netValue || 0) < 0 ? "loss" : "build";
  if (b.pct > 0.01) return "up";
  if (b.pct < -0.01) return "down";
  return "neutral";
}

function sflbIsFlatPct(b) {
  return !isFinite(b.pct) || b.pctHidden === true;
}

function sflbCreateBubbleEl(b) {
  const el = document.createElement("div");
  const flat = sflbState.tab === "prices" && sflbIsFlatPct(b);
  el.className = "sfl-bubble " + sflbBubbleClass(b) + (flat ? " flat" : "");
  el.style.width = b.r * 2 + "px";
  el.style.height = b.r * 2 + "px";
  const glow = typeof b.glow === "number" ? b.glow : 0;
  const isPositive = sflbState.tab === "mybuild" ? (b.netValue || 0) >= 0 : (b.pct || 0) > 0;
  const glowBlur = (3 + 15 * glow).toFixed(1);
  const glowSpread = (1 + 6 * glow).toFixed(1);
  const glowColor = isPositive ? "rgba(57,255,20," + (0.35 + 0.65 * glow).toFixed(2) + ")" : "rgba(231,76,60," + (0.28 + 0.42 * glow).toFixed(2) + ")";
  el.style.boxShadow = "inset 0 0 " + glowBlur + "px " + glowSpread + "px " + glowColor + ", 0 2px 4px rgba(0,0,0,.25)";
  if (flat) {
    el.innerHTML = "<span class=\"sfl-bubble-icon\">" + b.icon + "</span>";
    return el;
  }
  const nameSize = sflbClamp(b.r * 0.26, 6.5, 15).toFixed(1);
  const pctSize = sflbClamp(b.r * 0.22, 6, 12.5).toFixed(1);
  const nameStyle = "font-size:" + nameSize + "px;";
  const pctStyle = "font-size:" + pctSize + "px;";
  if (sflbState.tab === "prices") {
    if (sflbState.displayMode === "currency") {
      const usdSize = sflbClamp(b.r * 0.19, 6.5, 10.5).toFixed(1);
      const usdStyle = "font-size:" + usdSize + "px;color:#ffffff;";
      el.innerHTML = "<span class=\"sfl-bubble-icon\">" + b.icon + "</span>" + "<span class=\"sfl-bubble-name\" style=\"" + nameStyle + "\">" + escapeHtml(b.name) + "</span>" + "<span class=\"sfl-bubble-pct\" style=\"" + pctStyle + "\">" + sflbFmtFlower(b.price) + FLOWER_ICON + "</span>" + "<span class=\"sfl-bubble-usd\" style=\"" + usdStyle + "\">" + sflbFmtUsdParen(b.price) + "</span>";
    } else {
      el.innerHTML = "<span class=\"sfl-bubble-icon\">" + b.icon + "</span>" + "<span class=\"sfl-bubble-name\" style=\"" + nameStyle + "\">" + escapeHtml(b.name) + "</span>" + "<span class=\"sfl-bubble-pct\" style=\"" + pctStyle + "\">" + sflbFmtPct(b.pct) + "</span>";
    }
  } else {
    const valueSize = sflbClamp(b.r * 0.2, 5.5, 11).toFixed(1);
    const isProfit = (b.netValue || 0) >= 0;
    el.innerHTML = "<span class=\"sfl-bubble-icon\">" + b.icon + "</span>" + "<span class=\"sfl-bubble-name\" style=\"" + nameStyle + "\">" + escapeHtml(b.name) + "</span>" + "<span class=\"sfl-bubble-pct\" style=\"" + pctStyle + "\">" + sflbFmtCompactUnits(b.holdingUnitsPerDay) + "/d</span>" + "<span class=\"sfl-bubble-value " + (isProfit ? "profit" : "loss") + "\" style=\"font-size:" + valueSize + "px;\">" + sflbFmtFlowerSigned(b.netValue) + " " + FLOWER_ICON + "</span>";
  }
  return el;
}

function sflbWireBubbleDrag(b) {
  const el = b.el;
  const stageEl = sflbState.stageEl;
  el.addEventListener("pointerdown", e => {
    e.preventDefault();
    b.dragging = true;
    b.vx = 0;
    b.vy = 0;
    try {
      el.setPointerCapture(e.pointerId);
    } catch (err) {}
    b.downX = e.clientX;
    b.downY = e.clientY;
    b.downT = performance.now();
    b.moved = false;
    b.lastPT = b.downT;
    b.relVX = 0;
    b.relVY = 0;
    el.classList.add("dragging");
  });
  el.addEventListener("pointermove", e => {
    if (!b.dragging) return;
    const rect = stageEl.getBoundingClientRect();
    const nx = e.clientX - rect.left;
    const ny = e.clientY - rect.top;
    const now = performance.now();
    const dt = Math.max(1, now - b.lastPT);
    b.relVX = (nx - b.x) / dt * 16;
    b.relVY = (ny - b.y) / dt * 16;
    b.x = sflbClamp(nx, b.r, Math.max(b.r, sflbState.stageW - b.r));
    b.y = sflbClamp(ny, b.r, Math.max(b.r, sflbState.stageH - b.r));
    b.lastPT = now;
    if (Math.hypot(e.clientX - b.downX, e.clientY - b.downY) > 6) b.moved = true;
    el.style.transform = "translate3d(" + (b.x - b.r).toFixed(1) + "px," + (b.y - b.r).toFixed(1) + "px,0)";
  });
  const finishDrag = e => {
    if (!b.dragging) return;
    b.dragging = false;
    el.classList.remove("dragging");
    try {
      el.releasePointerCapture(e.pointerId);
    } catch (err) {}
    const dt = performance.now() - b.downT;
    if (!b.moved && dt < 450) {
      sflbOpenDetail(b);
    } else {
      b.vx = sflbClamp(b.relVX || 0, -3.2, 3.2);
      b.vy = sflbClamp(b.relVY || 0, -3.2, 3.2);
    }
  };
  el.addEventListener("pointerup", finishDrag);
  el.addEventListener("pointercancel", finishDrag);
}

function sflbPhysicsTick(ts) {
  const bubbles = sflbState.bubbles;
  const dt = Math.min(2, (ts - (sflbState.lastTs || ts)) / 16.6667 || 1);
  sflbState.lastTs = ts;
  const w = sflbState.stageW;
  const h = sflbState.stageH;
  bubbles.forEach(b => {
    if (b.dragging) return;
    b.phase += 0.018 * dt;
    b.vx += Math.sin(b.phase * 1.3 + b.seed) * 0.012 * dt;
    b.vy += Math.cos(b.phase * 1.7 + b.seed * 1.9) * 0.012 * dt;
    b.vx *= 0.96;
    b.vy *= 0.96;
    const speed = Math.hypot(b.vx, b.vy);
    const maxSpeed = 0.9;
    if (speed > maxSpeed) {
      b.vx = b.vx / speed * maxSpeed;
      b.vy = b.vy / speed * maxSpeed;
    }
    b.x += b.vx * dt;
    b.y += b.vy * dt;
    if (b.x - b.r < 0) {
      b.x = b.r;
      b.vx = Math.abs(b.vx) * 0.6;
    }
    if (b.x + b.r > w) {
      b.x = w - b.r;
      b.vx = -Math.abs(b.vx) * 0.6;
    }
    if (b.y - b.r < 0) {
      b.y = b.r;
      b.vy = Math.abs(b.vy) * 0.6;
    }
    if (b.y + b.r > h) {
      b.y = h - b.r;
      b.vy = -Math.abs(b.vy) * 0.6;
    }
  });
  for (let i = 0; i < bubbles.length; i++) {
    for (let j = i + 1; j < bubbles.length; j++) {
      const a = bubbles[i];
      const b = bubbles[j];
      const dx = b.x - a.x;
      const dy = b.y - a.y;
      const dist = Math.hypot(dx, dy) || 0.001;
      const minDist = a.r + b.r;
      if (dist < minDist) {
        const overlap = (minDist - dist) / 2;
        const nx = dx / dist;
        const ny = dy / dist;
        if (!a.dragging) {
          a.x -= nx * overlap;
          a.y -= ny * overlap;
        }
        if (!b.dragging) {
          b.x += nx * overlap;
          b.y += ny * overlap;
        }
        const rvx = b.vx - a.vx;
        const rvy = b.vy - a.vy;
        const velAlongNormal = rvx * nx + rvy * ny;
        if (velAlongNormal < 0) {
          const restitution = 0.25;
          const impulse = -(1 + restitution) * velAlongNormal / 2;
          if (!a.dragging) {
            a.vx -= impulse * nx;
            a.vy -= impulse * ny;
          }
          if (!b.dragging) {
            b.vx += impulse * nx;
            b.vy += impulse * ny;
          }
        }
      }
    }
  }
  bubbles.forEach(b => {
    b.el.style.transform = "translate3d(" + (b.x - b.r).toFixed(1) + "px," + (b.y - b.r).toFixed(1) + "px,0)";
  });
  sflbState.rafId = requestAnimationFrame(sflbPhysicsTick);
}

function sflbStartPhysics() {
  sflbStopPhysics();
  sflbState.lastTs = 0;
  sflbState.rafId = requestAnimationFrame(sflbPhysicsTick);
}

function sflbRebuildStage(list) {
  const stageEl = sflbGetStage();
  if (!stageEl) return;
  sflbStopPhysics();
  stageEl.innerHTML = "";
  sflbState.stageEl = stageEl;
  const rect = stageEl.getBoundingClientRect();
  sflbState.stageW = rect.width || 320;
  sflbState.stageH = rect.height || 320;
  const { minR, maxR } = sflbBubbleRadiusRange();
  const capped = list.slice(0, 70);
  if (sflbState.tab === "prices") {
    const ranked = capped.filter(b => !sflbIsFlatPct(b)).sort((a, b) => (b.pct || 0) - (a.pct || 0));
    ranked.forEach((b, idx) => {
      b.r = sflbClamp(maxR * Math.pow(0.95, idx), minR, maxR);
    });
    capped.forEach(b => {
      if (sflbIsFlatPct(b)) b.r = minR;
    });
  } else {
    const ranked = capped.slice().sort((a, b) => (b.netValue || 0) - (a.netValue || 0));
    ranked.forEach((b, idx) => {
      b.r = sflbClamp(maxR * Math.pow(0.95, idx), minR, maxR);
    });
  }
  const rSpread = (maxR - minR) || 1;
  capped.forEach(b => {
    b.glow = sflbClamp(((b.r || minR) - minR) / rSpread, 0, 1);
  });
  sflbPlaceBubbles(capped);
  capped.forEach(b => {
    const el = sflbCreateBubbleEl(b);
    b.el = el;
    stageEl.appendChild(el);
    sflbWireBubbleDrag(b);
    el.style.transform = "translate3d(" + (b.x - b.r).toFixed(1) + "px," + (b.y - b.r).toFixed(1) + "px,0)";
  });
  sflbState.bubbles = capped;
  sflbStartPhysics();
}
function sflbSetStatus(text) {
  const el = $("sflBubStatus");
  if (!el) return;
  if (!text) {
    el.style.display = "none";
    el.textContent = "";
  } else {
    el.style.display = "flex";
    el.textContent = text;
  }
}

function sflbShowDetailEmpty() {
  const empty = $("sflBubDetailEmpty");
  const content = $("sflBubDetailContent");
  if (empty) empty.style.display = "flex";
  if (content) content.style.display = "none";
}

function sflbShowDetailContent(html) {
  const empty = $("sflBubDetailEmpty");
  const content = $("sflBubDetailContent");
  if (empty) empty.style.display = "none";
  if (content) {
    content.style.display = "block";
    content.innerHTML = html;
  }
}

function sflbDrawChart(canvas, points) {
  if (!canvas || !points || !points.length) return;
  const ctx = canvas.getContext("2d");
  const dpr = window.devicePixelRatio || 1;
  const cssW = canvas.clientWidth || 280;
  const cssH = canvas.clientHeight || 110;
  canvas.width = cssW * dpr;
  canvas.height = cssH * dpr;
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  ctx.clearRect(0, 0, cssW, cssH);
  const values = points.map(p => p.v);
  const min = Math.min.apply(null, values);
  const max = Math.max.apply(null, values);
  const range = max - min || max * 0.1 || 1;
  const padX = 6;
  const padY = 10;
  const stepX = points.length > 1 ? (cssW - padX * 2) / (points.length - 1) : 0;
  const up = points[points.length - 1].v >= points[0].v;
  const lineColor = up ? "#2ecc71" : "#e74c3c";
  const fillColor = up ? "rgba(46,204,113,.22)" : "rgba(231,76,60,.22)";
  ctx.beginPath();
  points.forEach((p, i) => {
    const x = padX + stepX * i;
    const y = padY + (cssH - padY * 2) * (1 - (p.v - min) / range);
    if (i === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
  });
  ctx.strokeStyle = lineColor;
  ctx.lineWidth = 2;
  ctx.lineJoin = "round";
  ctx.stroke();
  ctx.lineTo(padX + stepX * (points.length - 1), cssH - padY);
  ctx.lineTo(padX, cssH - padY);
  ctx.closePath();
  ctx.fillStyle = fillColor;
  ctx.fill();
  points.forEach((p, i) => {
    const x = padX + stepX * i;
    const y = padY + (cssH - padY * 2) * (1 - (p.v - min) / range);
    ctx.beginPath();
    ctx.arc(x, y, 2.4, 0, Math.PI * 2);
    ctx.fillStyle = lineColor;
    ctx.fill();
  });
}

async function sflbOpenDetail(b) {
  sflbState.selectedKey = b.key || b.name;
  const detailEl = $("sflBubDetail");
  if (detailEl) detailEl.classList.add("show");
  if (sflbState.tab !== "prices") {
    sflbRenderBuildDetail(b);
    return;
  }
  sflbRenderPriceDetail(b, null);
  const allTime = await sflbFetchAllTimeStats(b.collection, b.itemId);
  if (sflbState.selectedKey !== (b.key || b.name)) return;
  sflbRenderPriceDetail(b, allTime);
}

function sflbRenderPriceDetail(b, allTime) {
  const isWeek = sflbState.range === "7d";
  const currentPrice = b.price;
  const high = isWeek ? b.sevenDayHigh : b.oneDayHigh;
  const low = isWeek ? b.sevenDayLow : b.oneDayLow;
  const volume = isWeek ? b.volume7d : b.volume24h;
  const trades = isWeek ? b.trades7d : b.trades24h;
  const pct = b.pct || 0;
  const rangeLabel = isWeek ? "7D" : "24hrs";
  const rangeLabelShort = isWeek ? "7D" : "24hr";
  const rangeWords = isWeek ? "7 days" : "24 hours";
  const pctClass = pct >= 0 ? "up" : "down";
  const hasAllTime = !!allTime;
  const allTimeHighText = hasAllTime ? sflbFmtFlower(allTime.high) + " " + FLOWER_ICON : "Loading…";
  const allTimeLowText = hasAllTime ? sflbFmtFlower(allTime.low) + " " + FLOWER_ICON : "Loading…";
  const highText = typeof high === "number" ? sflbFmtFlower(high) + " " + FLOWER_ICON : "—";
  const lowText = typeof low === "number" ? sflbFmtFlower(low) + " " + FLOWER_ICON : "—";
  const volumeText = typeof volume === "number" ? sflbFmtFlower(volume) + " " + FLOWER_ICON : "Loading…";
  const tradesText = typeof trades === "number" ? sflbFmtCompactUnits(trades) : "Loading…";
  const points = [];
  if (typeof low === "number") points.push({ v: low });
  if (typeof high === "number") points.push({ v: high });
  points.push({ v: currentPrice });
  const noteHtml = "<div class=\"sfl-bub-detail-note\">" + "<div class=\"sfl-bub-detail-note-label\">Price Change</div>" + "<div class=\"sfl-bub-detail-note-text\">The <span class=\"sfl-bub-detail-note-pct " + pctClass + "\">" + sflbFmtPct(pct) + "</span> reports the <span class=\"sfl-bub-detail-note-range\">" + rangeWords + "</span> price change of the <span class=\"sfl-bub-detail-note-item\"><span class=\"sfl-bub-detail-note-icon\">" + b.icon + "</span>" + escapeHtml(b.name) + "</span>.</div>" + "<div class=\"sfl-bub-detail-note-explain\">This compares the current price to the price " + rangeWords + " ago.</div>" + "</div>";
  const html = "<div class=\"sfl-bub-detail-head\"><span class=\"sfl-bub-detail-icon\">" + b.icon + "</span><span class=\"sfl-bub-detail-name\">" + escapeHtml(b.name) + "</span></div>" + "<div class=\"sfl-bub-detail-pct " + pctClass + "\">" + sflbFmtPct(pct) + " (" + rangeLabel + ")</div>" + "<div class=\"sfl-bub-detail-grid\">" + "<div class=\"sfl-bub-detail-row\"><span>" + rangeLabelShort + " High</span><span>" + highText + "</span></div>" + "<div class=\"sfl-bub-detail-row\"><span>" + rangeLabelShort + " Low</span><span>" + lowText + "</span></div>" + "<div class=\"sfl-bub-detail-row\"><span>Current Price</span><span>" + sflbFmtFlower(currentPrice) + " " + FLOWER_ICON + "</span></div>" + "<div class=\"sfl-bub-detail-row\"><span>Trading Volume</span><span>" + volumeText + "</span></div>" + "<div class=\"sfl-bub-detail-row\"><span>" + rangeLabelShort + " Trades</span><span>" + tradesText + "</span></div>" + "<div class=\"sfl-bub-detail-row\"><span>All Time High</span><span>" + allTimeHighText + "</span></div>" + "<div class=\"sfl-bub-detail-row\"><span>All Time Low</span><span>" + allTimeLowText + "</span></div>" + "</div>" + "<canvas class=\"sfl-bub-detail-chart\" id=\"sflBubDetailChart\"></canvas>" + noteHtml;
  sflbShowDetailContent(html);
  requestAnimationFrame(() => sflbDrawChart($("sflBubDetailChart"), points));
}

function sflbRenderProductBreakdown(products) {
  if (!products || !products.length) return "";
  const cards = products.map(p => {
    const totalValue = (p.unitsPerDay || 0) * (p.price || 0);
    return "<div class=\"sfl-bub-product-card\">" + "<div class=\"sfl-bub-product-head\"><span class=\"sfl-bub-product-icon\">" + p.icon + "</span><span class=\"sfl-bub-product-name\">" + escapeHtml(p.name) + "</span></div>" + "<div class=\"sfl-bub-product-row\"><span>24hrs Yield</span><span>" + sflbFmtCompactUnits(p.unitsPerDay) + "</span></div>" + "<div class=\"sfl-bub-product-row\"><span>1 Cycle Yield</span><span>" + sflbFmtCompactUnits(p.unitsPerCycle) + "</span></div>" + "<div class=\"sfl-bub-product-row\"><span>Market Price</span><span>" + sflbFmtFlower(p.price) + " " + FLOWER_ICON + "</span></div>" + "<div class=\"sfl-bub-product-row sfl-bub-product-total\"><span>Total Value</span><span>" + sflbFmtFlower(totalValue) + " " + FLOWER_ICON + "</span></div>" + "</div>";
  }).join("");
  return "<div class=\"sfl-bub-boosts-title\">Products</div>" + "<div class=\"sfl-bub-products-list\">" + cards + "</div>";
}

function sflbRenderNodeTiersBlock(b) {
  if (b.category !== "Resource" || !isTieredResource(b.name)) return "";
  const tiers = RESOURCE_NODE_TIERS[b.name];
  const counts = getNodeTierCounts(b.name);
  if (!counts) return "";
  const rows = tiers.filter(tier => (parseFloat(counts[tier.key]) || 0) > 0).map(tier => {
    const qty = parseFloat(counts[tier.key]) || 0;
    const tierIconName = tier.displayLabel || tier.label;
    return "<div class=\"sfl-bub-node-row\"><span class=\"sfl-bub-node-icon\">" + getIcon(tierIconName) + "</span><span class=\"sfl-bub-node-name\">" + escapeHtml(tier.label) + "</span><span class=\"sfl-bub-node-count\">" + fmt(qty) + "</span></div>";
  }).join("");
  if (!rows) return "";
  return "<div class=\"sfl-bub-boosts-title\">Nodes</div><div class=\"sfl-bub-boosts-block sfl-bub-node-block\">" + rows + "</div>";
}

function sflbRenderBuildDetail(b) {
  const cycleTimeSec = b.cycleTimeSec != null ? b.cycleTimeSec : (b.cyclesPerDay > 0 ? (86400 / b.cyclesPerDay) : null);
  const cycleLabel = cycleTimeSec != null && b.cyclesPerDay > 0 ? formatDuration(cycleTimeSec) + "/cycle (" + fmtInt(b.cyclesPerDay) + "/day)" : "—";
  const seen = new Set();
  const dedupedBoosts = (b.boosts || []).filter(bo => {
    if (!bo || !bo.name) return false;
    const key = bo.id || bo.name;
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
  const nftBoosts = dedupedBoosts.filter(bo => bo.source !== "skill");
  const skillBoosts = dedupedBoosts.filter(bo => bo.source === "skill");
  const nftListHtml = renderBoostAppliedList(nftBoosts, b.name, { hideCost: true, hideBadge: true });
  const skillListHtml = skillBoosts.length ? profileRenderSkillTierGroups(skillBoosts) : "";
  const nodeTiersHtml = sflbRenderNodeTiersBlock(b);
  const boostsSectionHtml = "<div class=\"sfl-bub-boosts-title\">Applied Boosts</div>" + (nftListHtml || skillListHtml ? "" : "<div class=\"sfl-bub-boosts-list\"><span class=\"sfl-bub-boost-none\">No boosts or skills active for this item</span></div>") + (nftListHtml ? "<div class=\"sfl-bub-boost-group-title\">SFT/NFT Boost</div><div class=\"sfl-bub-boosts-block\">" + nftListHtml + "</div>" : "") + (skillListHtml ? "<div class=\"sfl-bub-boost-group-title\">Skill Boost</div><div class=\"sfl-bub-boosts-block sfl-bub-skill-block\">" + skillListHtml + "</div>" : "");
  const revenue24h = b.revenue24h || 0;
  const restockCost24h = b.restockCost24h || 0;
  const baseCost24h = Math.max(0, (b.cost24h || 0) - restockCost24h);
  const grossRevenue24h = feePercent < 100 ? revenue24h / (1 - feePercent / 100) : revenue24h;
  const sellFee24h = Math.max(0, grossRevenue24h - revenue24h);
  const netValue = b.netValue || 0;
  const isProfit = netValue >= 0;
  const hasProductBreakdown = !!(b.productBreakdown && b.productBreakdown.length);
  const cycleYield = b.cyclesPerDay > 0 ? (b.holdingUnitsPerDay || 0) / b.cyclesPerDay : 0;
  const yieldRowsHtml = hasProductBreakdown ? "" : "<div class=\"sfl-bub-detail-row\"><span>24hrs Yield</span><span>" + sflbFmtCompactUnits(b.holdingUnitsPerDay) + "</span></div>" + "<div class=\"sfl-bub-detail-row\"><span>1 Cycle Yield</span><span>" + sflbFmtCompactUnits(cycleYield) + "</span></div>" + "<div class=\"sfl-bub-detail-row\"><span>Market Price</span><span>" + sflbFmtFlower(b.price) + " " + FLOWER_ICON + "</span></div>";
  const productBreakdownHtml = hasProductBreakdown ? sflbRenderProductBreakdown(b.productBreakdown) : "";
  const html = "<div class=\"sfl-bub-detail-head\"><span class=\"sfl-bub-detail-icon\">" + b.icon + "</span><span class=\"sfl-bub-detail-name\">" + escapeHtml(b.name) + "</span></div>" + "<div class=\"sfl-bub-detail-grid\">" + yieldRowsHtml + "<div class=\"sfl-bub-detail-row\"><span>24hrs Cycle</span><span>" + cycleLabel + "</span></div>" + "<div class=\"sfl-bub-detail-row\"><span>" + escapeHtml(b.countLabel || "Count") + "</span><span>" + fmtInt(b.count) + "</span></div>" + "<div class=\"sfl-bub-detail-row\"><span>Revenue</span><span>" + sflbFmtFlower(grossRevenue24h) + " " + FLOWER_ICON + "</span></div>" + "<div class=\"sfl-bub-detail-row\"><span>Cost</span><span>-" + sflbFmtFlower(baseCost24h) + " " + FLOWER_ICON + "</span></div>" + "<div class=\"sfl-bub-detail-row\"><span>Restock Cost</span><span>-" + sflbFmtFlower(restockCost24h) + " " + FLOWER_ICON + "</span></div>" + "<div class=\"sfl-bub-detail-row\"><span>Sell Fee</span><span>-" + sflbFmtFlower(sellFee24h) + " " + FLOWER_ICON + "</span></div>" + "<div class=\"sfl-bub-detail-row sfl-bub-detail-net " + (isProfit ? "up" : "down") + "\"><span>Net Profit / Day</span><span>" + sflbFmtFlowerSigned(netValue) + " " + FLOWER_ICON + "</span></div>" + "</div>" + productBreakdownHtml + nodeTiersHtml + boostsSectionHtml;
  sflbShowDetailContent(html);
}

function sflbApplyPriceFilter(catalog) {
  if (!catalog) return [];
  if (sflbState.filter === "all") return catalog.list;
  return catalog.list.filter(x => x.category === sflbState.filter);
}

async function sflbRenderCurrentTab(force) {
  sflbApplyFilterVisibility();
  sflbShowDetailEmpty();
  const detailEl = $("sflBubDetail");
  if (detailEl) detailEl.classList.remove("show");
  if (sflbState.tab === "prices") {
    if (force || !sflbState.priceCatalog || sflbState.priceCatalogRange !== sflbState.range) {
      sflbSetStatus("Loading market data…");
      const buildRange = sflbState.range;
      const catalog = await sflbBuildPriceCatalog(buildRange, !!force);
      if (sflbState.tab !== "prices" || sflbState.range !== buildRange) return;
      if (!catalog || !catalog.list.length) {
        sflbSetStatus("Unable to load live marketplace data right now.");
        sflbState.priceCatalog = null;
        return;
      }
      sflbState.priceCatalog = catalog;
      sflbState.priceCatalogRange = buildRange;
    }
    sflbSetStatus("");
    if (sflbState.viewMode === "list") {
      sflbRenderListRows();
    } else {
      const filtered = sflbApplyPriceFilter(sflbState.priceCatalog);
      sflbRebuildStage(filtered);
    }
  } else {
    sflbSetStatus("");
    const list = sflbBuildMyBuildCatalog();
    sflbState.buildCatalog = list;
    if (!list.length) {
      sflbSetStatus("Nothing built on your farm yet — add plots, nodes or animals to see them here.");
      sflbState.bubbles.forEach(b => b.el && b.el.remove());
      sflbState.bubbles = [];
      return;
    }
    sflbRebuildStage(list);
  }
}

function sflbSwitchTab(tab) {
  if (sflbState.tab === tab) return;
  sflbState.tab = tab;
  document.querySelectorAll("#sflBubTabs .sfl-bub-tab").forEach(btn => {
    btn.classList.toggle("active", btn.dataset.sfltab === tab);
  });
  sflbRenderCurrentTab(false);
}

function sflbSwitchFilter(filter) {
  if (sflbState.filter === filter) return;
  sflbState.filter = filter;
  document.querySelectorAll("#sflBubFilters .sfl-bub-filter").forEach(btn => {
    btn.classList.toggle("active", btn.dataset.sflfilter === filter);
  });
  if (sflbState.tab === "prices" && sflbState.priceCatalog) {
    if (sflbState.viewMode === "list") {
      sflbRenderListRows();
      return;
    }
    const filtered = sflbApplyPriceFilter(sflbState.priceCatalog);
    sflbRebuildStage(filtered);
    sflbShowDetailEmpty();
    const detailEl = $("sflBubDetail");
    if (detailEl) detailEl.classList.remove("show");
  }
}

function sflbSwitchRange(range) {
  if (sflbState.range === range) return;
  sflbState.range = range;
  document.querySelectorAll("#sflBubRange .sfl-bub-range-btn[data-sflrange]").forEach(btn => {
    btn.classList.toggle("active", btn.dataset.sflrange === range);
  });
  sflbRenderCurrentTab(false);
}

function sflbSwitchDisplayMode(mode) {
  if (sflbState.displayMode === mode) return;
  sflbState.displayMode = mode;
  document.querySelectorAll("#sflBubRange .sfl-bub-display-btn").forEach(btn => {
    btn.classList.toggle("active", btn.dataset.sfldisplay === mode);
  });
  const rerender = () => {
    if (sflbState.displayMode !== mode) return;
    if (sflbState.tab === "prices" && sflbState.viewMode !== "list" && sflbState.priceCatalog) {
      const filtered = sflbApplyPriceFilter(sflbState.priceCatalog);
      sflbRebuildStage(filtered);
    }
  };
  if (mode === "currency") {
    ensureExchangeRates().then(rerender);
  } else {
    rerender();
  }
}

function sflbBuildListRows(catalog) {
  const filtered = sflbApplyPriceFilter(catalog).filter(b => !sflbIsFlatPct(b));
  return filtered.slice().sort((a, b) => sflbState.sortMode === "loss" ? (a.pct || 0) - (b.pct || 0) : (b.pct || 0) - (a.pct || 0));
}

function sflbRenderListRows() {
  const listEl = $("sflBubList");
  if (!listEl) return;
  if (!sflbState.priceCatalog) {
    listEl.innerHTML = "<div class=\"sfl-bub-list-empty\">No items to show.</div>";
    return;
  }
  const rows = sflbBuildListRows(sflbState.priceCatalog);
  if (!rows.length) {
    listEl.innerHTML = "<div class=\"sfl-bub-list-empty\">No items to show.</div>";
    return;
  }
  listEl.innerHTML = rows.map((b, idx) => {
    const pctClass = (b.pct || 0) >= 0 ? "up" : "down";
    return "<div class=\"sfl-bub-list-row\">" + "<span class=\"sfl-bub-list-rank\">" + (idx + 1) + "</span>" + "<span class=\"sfl-bub-list-icon\">" + b.icon + "</span>" + "<span class=\"sfl-bub-list-name\">" + escapeHtml(b.name) + "</span>" + "<span class=\"sfl-bub-list-price\">" + "<span class=\"sfl-bub-list-price-flower\">" + sflbFmtFlower(b.price) + " " + FLOWER_ICON + "</span>" + "<span class=\"sfl-bub-list-price-usd\">" + sflbFmtUsdParen(b.price) + "</span>" + "</span>" + "<span class=\"sfl-bub-list-pct " + pctClass + "\">" + sflbFmtPct(b.pct) + "</span>" + "</div>";
  }).join("");
  Array.from(listEl.children).forEach((rowEl, idx) => {
    rowEl.addEventListener("click", () => sflbOpenDetail(rows[idx]));
  });
}

function sflbSwitchSort(mode) {
  if (sflbState.sortMode === mode) return;
  sflbState.sortMode = mode;
  document.querySelectorAll("#sflBubListSort .sfl-bub-sort-btn").forEach(btn => {
    btn.classList.toggle("active", btn.dataset.sflsort === mode);
  });
  if (sflbState.viewMode === "list") sflbRenderListRows();
}

function sflbSwitchViewMode(mode) {
  if (sflbState.viewMode === mode) return;
  sflbState.viewMode = mode;
  const listBtn = $("sflBubViewListBtn");
  if (listBtn) {
    listBtn.classList.toggle("active", mode === "list");
    listBtn.textContent = mode === "list" ? "Bubbles" : "List";
  }
  sflbApplyFilterVisibility();
  if (mode === "list") {
    sflbStopPhysics();
    ensureExchangeRates().then(() => {
      if (sflbState.viewMode === "list") sflbRenderListRows();
    });
    sflbRenderListRows();
  } else if (sflbState.tab === "prices" && sflbState.priceCatalog) {
    const filtered = sflbApplyPriceFilter(sflbState.priceCatalog);
    sflbRebuildStage(filtered);
  }
}

function sflbWireControlsOnce() {
  if (sflbState.wired) return;
  sflbState.wired = true;
  document.querySelectorAll("#sflBubTabs .sfl-bub-tab").forEach(btn => {
    btn.addEventListener("click", () => sflbSwitchTab(btn.dataset.sfltab));
  });
  document.querySelectorAll("#sflBubFilters .sfl-bub-filter").forEach(btn => {
    btn.addEventListener("click", () => sflbSwitchFilter(btn.dataset.sflfilter));
  });
  document.querySelectorAll("#sflBubRange .sfl-bub-range-btn[data-sflrange]").forEach(btn => {
    btn.addEventListener("click", () => sflbSwitchRange(btn.dataset.sflrange));
  });
  document.querySelectorAll("#sflBubRange .sfl-bub-display-btn").forEach(btn => {
    btn.addEventListener("click", () => sflbSwitchDisplayMode(btn.dataset.sfldisplay));
  });
  const currencyBtn = $("sflBubDisplayCurrencyBtn");
  if (currencyBtn) currencyBtn.innerHTML = "$/" + FLOWER_ICON;
  const listBtn = $("sflBubViewListBtn");
  if (listBtn) {
    listBtn.addEventListener("click", () => sflbSwitchViewMode(sflbState.viewMode === "list" ? "bubbles" : "list"));
  }
  document.querySelectorAll("#sflBubListSort .sfl-bub-sort-btn").forEach(btn => {
    btn.addEventListener("click", () => sflbSwitchSort(btn.dataset.sflsort));
  });
  const syncBtn = $("sflBubSyncBtn");
  if (syncBtn) {
    syncBtn.addEventListener("click", () => {
      if (syncBtn.classList.contains("is-syncing")) return;
      syncBtn.classList.add("is-syncing");
      __sflbReportCache.delete("latest");
      const reselect = sflbState.selectedKey;
      sflbRenderCurrentTab(true).then(() => {
        if (!reselect) return;
        const match = (sflbState.priceCatalog && sflbState.priceCatalog.list || []).find(b => (b.key || b.name) === reselect);
        if (match) sflbOpenDetail(match);
      }).finally(() => {
        syncBtn.classList.remove("is-syncing");
      });
    });
  }
  const closeBtn = $("sflBubDetailCloseBtn");
  if (closeBtn) {
    closeBtn.addEventListener("click", () => {
      sflbState.selectedKey = null;
      sflbShowDetailEmpty();
      const detailEl = $("sflBubDetail");
      if (detailEl) detailEl.classList.remove("show");
    });
  }
  window.addEventListener("resize", () => {
    if (!$("sflBubblesPanel") || !$("sflBubblesPanel").classList.contains("open")) return;
    const stageEl = sflbGetStage();
    if (!stageEl) return;
    const rect = stageEl.getBoundingClientRect();
    sflbState.stageW = rect.width || sflbState.stageW;
    sflbState.stageH = rect.height || sflbState.stageH;
  });
}

export function sflbRefreshMyBuildIfOpen() {
  if (sflbState.tab !== "mybuild") return;
  const panelEl = $("sflBubblesPanel");
  if (!panelEl || !panelEl.classList.contains("open")) return;
  const reselect = sflbState.selectedKey;
  sflbRenderCurrentTab(false).then(() => {
    if (!reselect) return;
    const match = (sflbState.buildCatalog || []).find(b => (b.key || b.name) === reselect);
    if (match) sflbOpenDetail(match);
  });
}

export function renderSflBubblesPanel() {
  sflbWireControlsOnce();
  sflbApplyFilterVisibility();
  ensureExchangeRates().then(() => {
    if (sflbState.displayMode === "currency" && sflbState.tab === "prices" && sflbState.priceCatalog) {
      if (sflbState.viewMode === "list") {
        sflbRenderListRows();
      } else {
        sflbRebuildStage(sflbApplyPriceFilter(sflbState.priceCatalog));
      }
    } else if (sflbState.viewMode === "list" && sflbState.tab === "prices" && sflbState.priceCatalog) {
      sflbRenderListRows();
    }
  });
  if (!sflbState.loaded) {
    sflbState.loaded = true;
    sflbRenderCurrentTab(true);
  } else {
    requestAnimationFrame(() => sflbRenderCurrentTab(false));
  }
}
