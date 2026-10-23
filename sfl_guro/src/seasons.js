import { LAVA_PIT_RECIPES, SEASON_EMOJI, SEASON_ORDER, escapeHtml } from "./calculator.js";

import { getIcon } from "./ui.js";

const SEASONS_DATA = {
  "crops": {
    "Spring": [
      "Sunflower",
      "Rhubarb",
      "Carrot",
      "Cabbage",
      "Soybean",
      "Corn",
      "Wheat",
      "Kale",
      "Barley"
    ],
    "Summer": [
      "Sunflower",
      "Potato",
      "Zucchini",
      "Pepper",
      "Beetroot",
      "Cauliflower",
      "Eggplant",
      "Radish",
      "Wheat"
    ],
    "Autumn": [
      "Potato",
      "Pumpkin",
      "Carrot",
      "Yam",
      "Broccoli",
      "Soybean",
      "Wheat",
      "Barley",
      "Artichoke"
    ],
    "Winter": [
      "Potato",
      "Cabbage",
      "Beetroot",
      "Cauliflower",
      "Parsnip",
      "Onion",
      "Turnip",
      "Wheat",
      "Kale"
    ]
  },
  "fruits": {
    "Spring": [
      "Tomato",
      "Blueberry",
      "Orange"
    ],
    "Summer": [
      "Lemon",
      "Orange",
      "Banana"
    ],
    "Autumn": [
      "Tomato",
      "Apple",
      "Banana"
    ],
    "Winter": [
      "Lemon",
      "Blueberry",
      "Apple"
    ]
  },
  "flowers": {
    "Spring": [
      "Sunpetal Seed",
      "Bloom Seed",
      "Lily Seed",
      "Lavender Seed"
    ],
    "Summer": [
      "Sunpetal Seed",
      "Bloom Seed",
      "Lily Seed",
      "Gladiolus Seed"
    ],
    "Autumn": [
      "Sunpetal Seed",
      "Bloom Seed",
      "Lily Seed",
      "Clover Seed"
    ],
    "Winter": [
      "Sunpetal Seed",
      "Bloom Seed",
      "Lily Seed",
      "Edelweiss Seed"
    ]
  },
  "fish": {
    "Spring": {
      "Basic": [
        "Anchovy",
        "Sea Bass",
        "Sea Horse",
        "Halibut",
        "Squid",
        "Porgy"
      ],
      "Advanced": [
        "Red Snapper",
        "Olive Flounder",
        "Zebra Turkeyfish",
        "Ray",
        "Barred Knifejaw"
      ],
      "Expert": [
        "Tuna",
        "Oarfish",
        "Coelacanth",
        "Parrotfish",
        "Saw Shark",
        "Weakfish"
      ]
    },
    "Summer": {
      "Basic": [
        "Anchovy",
        "Butterflyfish",
        "Clownfish",
        "Sea Horse",
        "Horse Mackerel"
      ],
      "Advanced": [
        "Red Snapper",
        "Moray Eel",
        "Napoleanfish",
        "Surgeonfish",
        "Angelfish",
        "Zebra Turkeyfish",
        "Ray",
        "Hammerhead shark",
        "Barred Knifejaw",
        "Tilapia"
      ],
      "Expert": [
        "Tuna",
        "Mahi Mahi",
        "Blue Marlin",
        "Sunfish",
        "Parrotfish",
        "Whale Shark",
        "Saw Shark",
        "White Shark",
        "Cobia"
      ]
    },
    "Autumn": {
      "Basic": [
        "Anchovy",
        "Butterflyfish",
        "Sea Bass",
        "Halibut",
        "Muskellunge"
      ],
      "Advanced": [
        "Red Snapper",
        "Moray Eel",
        "Olive Flounder",
        "Napoleanfish",
        "Surgeonfish",
        "Hammerhead shark",
        "Rock Blackfish"
      ],
      "Expert": [
        "Tuna",
        "Mahi Mahi",
        "Sunfish"
      ]
    },
    "Winter": {
      "Basic": [
        "Anchovy",
        "Blowfish",
        "Clownfish",
        "Horse Mackerel",
        "Squid"
      ],
      "Advanced": [
        "Red Snapper",
        "Angelfish",
        "Walleye"
      ],
      "Expert": [
        "Tuna",
        "Blue Marlin",
        "Oarfish",
        "Football fish",
        "Coelacanth",
        "Whale Shark",
        "White Shark",
        "Trout"
      ]
    }
  },
  "processing": {
    "Fish Flake": {
      "Spring": {
        "Anchovy": 4,
        "Porgy": 2,
        "Sea Bass": 2
      },
      "Summer": {
        "Anchovy": 4,
        "Butterflyfish": 2,
        "Sea Horse": 2
      },
      "Autumn": {
        "Anchovy": 4,
        "Halibut": 2,
        "Muskellunge": 2
      },
      "Winter": {
        "Anchovy": 4,
        "Blowfish": 2,
        "Clownfish": 2
      }
    },
    "Fish Stick": {
      "Spring": {
        "Red Snapper": 6,
        "Olive Flounder": 2,
        "Zebra Turkeyfish": 2
      },
      "Summer": {
        "Red Snapper": 6,
        "Surgeonfish": 2,
        "Tilapia": 2
      },
      "Autumn": {
        "Red Snapper": 6,
        "Moray Eel": 2,
        "Napoleanfish": 2
      },
      "Winter": {
        "Red Snapper": 6,
        "Walleye": 2,
        "Angelfish": 2
      }
    },
    "Fish Oil": {
      "Spring": {
        "Tuna": 8,
        "Weakfish": 2,
        "Oarfish": 2
      },
      "Summer": {
        "Tuna": 8,
        "Cobia": 2,
        "Sunfish": 2
      },
      "Autumn": {
        "Tuna": 8,
        "Mahi Mahi": 4,
        "Crab": 2
      },
      "Winter": {
        "Tuna": 8,
        "Blue Marlin": 2,
        "Football fish": 2
      }
    },
    "Crab Stick": {
      "Spring": {
        "Crab": 1,
        "Blue Crab": 1,
        "Hermit Crab": 1,
        "Sea Slug": 1
      },
      "Summer": {
        "Crab": 1,
        "Mussel": 1,
        "Isopod": 1,
        "Sea Snail": 1
      },
      "Autumn": {
        "Crab": 1,
        "Shrimp": 1,
        "Lobster": 1,
        "Barnacle": 1
      },
      "Winter": {
        "Crab": 1,
        "Oyster": 1,
        "Isopod": 1,
        "Garden Eel": 1
      }
    }
  },
  "composters": {
    "Compost Bin": {
      "Spring": {
        "Rhubarb": 10,
        "Carrot": 5
      },
      "Summer": {
        "Zucchini": 10,
        "Pepper": 2
      },
      "Autumn": {
        "Yam": 15
      },
      "Winter": {
        "Potato": 10,
        "Cabbage": 3
      }
    },
    "Turbo Composter": {
      "Spring": {
        "Soybean": 5,
        "Corn": 3
      },
      "Summer": {
        "Cauliflower": 4,
        "Eggplant": 3
      },
      "Autumn": {
        "Broccoli": 10,
        "Artichoke": 2
      },
      "Winter": {
        "Onion": 5,
        "Turnip": 2
      }
    },
    "Premium Composter": {
      "Spring": {
        "Blueberry": 8,
        "Egg": 5
      },
      "Summer": {
        "Banana": 3,
        "Egg": 5
      },
      "Autumn": {
        "Apple": 4,
        "Tomato": 5
      },
      "Winter": {
        "Lemon": 3,
        "Apple": 3
      }
    }
  }
};

const QTY_FORMAT = new Intl.NumberFormat("en-US", {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2
});

const FISH_TIERS = [ "Basic", "Advanced", "Expert" ];

const FISH_TIER_ICONS = {
  Basic: "Anchovy",
  Advanced: "Red Snapper",
  Expert: "Tuna"
};

const FISH_TIER_LABELS = {
  Basic: "Basic Fish",
  Advanced: "Advance Fish",
  Expert: "Expert Fish"
};

const COMPOSTER_ORDER = [ "Compost Bin", "Turbo Composter", "Premium Composter" ];

const PROCESSING_ORDER = [ "Fish Flake", "Fish Stick", "Fish Oil", "Crab Stick" ];

function iconHtml(name) {
  return `<span class="ss-icon">${getIcon(name)}</span>`;
}

function lineHtml(name, qty) {
  const amount = qty === undefined ? "" : ` <span class="ss-line-qty">\u00d7${QTY_FORMAT.format(qty)}</span>`;
  return `<div class="ss-line">${iconHtml(name)}<span class="ss-line-name">${escapeHtml(name)}${amount}</span></div>`;
}

function subHtml(name) {
  return `<div class="ss-sub ss-sub-tier">${iconHtml(FISH_TIER_ICONS[name] || name)}<span>${escapeHtml(FISH_TIER_LABELS[name] || name)}</span></div>`;
}

function cardHtml(season, suffix, body) {
  return `<div class="cb-item ss-card">
    <div class="ss-card-head">${SEASON_EMOJI[season]}<span>${season} ${suffix}</span></div>
    ${body}
  </div>`;
}

function productCardHtml(name, body) {
  return `<div class="cb-item ss-card">
    <div class="ss-card-head">${iconHtml(name)}<span>${escapeHtml(name)}</span></div>
    ${body}
  </div>`;
}

function seasonSubHtml(season) {
  return `<div class="ss-sub">${SEASON_EMOJI[season]}<span>${season}</span></div>`;
}

function containerHtml(iconName, label, cards, cols) {
  return `<div class="cb-column ss-container">
    <div class="cb-column-label ss-label">${iconHtml(iconName)}<span>${escapeHtml(label)}</span></div>
    <div class="ss-grid${cols ? " ss-cols-" + cols : ""}">${cards}</div>
  </div>`;
}

function namesBody(names) {
  return names.map(n => lineHtml(n)).join("");
}

function recipeBody(inv) {
  return Object.keys(inv).map(n => lineHtml(n, inv[n])).join("");
}

function lavaPitHtml() {
  const cards = SEASON_ORDER.map(season => {
    const mats = LAVA_PIT_RECIPES[season].materials;
    return cardHtml(season, "Recipes", mats.map(m => lineHtml(m.name, m.qty)).join(""));
  }).join("");
  return containerHtml("Lava Pit", "Lava Pit Recipe", cards);
}

function listContainerHtml(iconName, label, suffix, bySeason) {
  const cards = SEASON_ORDER.map(season => cardHtml(season, suffix, namesBody(bySeason[season]))).join("");
  return containerHtml(iconName, label, cards);
}

function fishingHtml() {
  const cards = SEASON_ORDER.map(season => {
    const body = FISH_TIERS.map(tier => {
      const list = SEASONS_DATA.fish[season][tier];
      return list.length ? subHtml(tier) + namesBody(list) : "";
    }).join("");
    return cardHtml(season, "Fish", body);
  }).join("");
  return containerHtml("Rod", "Fishing", cards);
}

function processingHtml() {
  const cards = PROCESSING_ORDER.map(product => {
    const body = SEASON_ORDER.map(season => seasonSubHtml(season) + recipeBody(SEASONS_DATA.processing[product][season])).join("");
    return productCardHtml(product, body);
  }).join("");
  return containerHtml("Fish Flake", "Fish Processing", cards, 4);
}

function composterHtml() {
  const cards = COMPOSTER_ORDER.map(name => {
    const body = SEASON_ORDER.map(season => seasonSubHtml(season) + recipeBody(SEASONS_DATA.composters[name][season])).join("");
    return productCardHtml(name, body);
  }).join("");
  return containerHtml("Compost Bin", "Composter", cards, 3);
}

export function renderSeasonsPanel() {
  const body = document.getElementById("seasonsBody");
  if (!body) return;
  body.innerHTML = `<div class="ss-stack">
    ${lavaPitHtml()}
    ${listContainerHtml("Sunflower", "Crops", "Crops", SEASONS_DATA.crops)}
    ${listContainerHtml("Apple", "Fruits", "Fruits", SEASONS_DATA.fruits)}
    ${listContainerHtml("Red Pansy", "Flowers", "Flowers", SEASONS_DATA.flowers)}
    ${fishingHtml()}
    ${processingHtml()}
    ${composterHtml()}
  </div>`;
}
