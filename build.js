const esbuild = require("esbuild");

const fs = require("fs");

const path = require("path");

const crypto = require("crypto");

const ROOT = __dirname;

const DIST = path.join(ROOT, "dist");

const ENTRY = path.join(ROOT, "src/main.js");

const INDEX_HTML = path.join(ROOT, "index.html");

const SW_JS = path.join(ROOT, "sw.js");

const STYLE_CSS = path.join(ROOT, "style.css");

function cleanDist() {
  fs.mkdirSync(DIST, {
    recursive: true
  });
  for (const f of fs.readdirSync(DIST)) {
    fs.unlinkSync(path.join(DIST, f));
  }
}

async function buildBundle() {
  cleanDist();
  const pageEntries = fs.readdirSync(path.join(ROOT, "src/pages")).filter(f => f.endsWith(".js") && f !== "registry.js" && f !== "shared.js");
  const result = await esbuild.build({
    entryPoints: {
      app: ENTRY
    },
    bundle: true,
    splitting: true,
    format: "esm",
    target: "es2020",
    outdir: DIST,
    entryNames: "[name].[hash]",
    chunkNames: "[name].[hash]",
    metafile: true,
    write: true
  });
  const outputs = Object.keys(result.metafile.outputs).filter(f => f.endsWith(".js")).map(f => path.basename(f));
  const main = outputs.find(f => /^app\.[A-Za-z0-9]+\.js$/.test(f));
  if (!main) throw new Error("Main bundle not found");
  const css = fs.readFileSync(STYLE_CSS, "utf8");
  const presence = fs.readFileSync(path.join(ROOT, "presence.js"), "utf8") + fs.readFileSync(path.join(ROOT, "early.js"), "utf8") + fs.readFileSync(path.join(ROOT, "confetti.browser.min.js"), "utf8");
  const hasher = crypto.createHash("sha256");
  outputs.sort().forEach(f => hasher.update(fs.readFileSync(path.join(DIST, f))));
  [ "sfl-guro-192.png", "sfl-guro-512.png", "sfl-guro-maskable-512.png" ].forEach(f => hasher.update(fs.readFileSync(path.join(ROOT, "icons", f))));
  const cacheHash = hasher.update(css).update(presence).digest("hex").slice(0, 10);
  updateIndexHtml(main, cacheHash);
  updateServiceWorker(outputs, cacheHash);
  const bytes = outputs.reduce((sum, f) => sum + fs.statSync(path.join(DIST, f)).size, 0);
  return {
    main: main,
    files: outputs,
    cacheHash: cacheHash,
    bytes: bytes,
    pageEntries: pageEntries
  };
}

function updateIndexHtml(main, hash) {
  let html = fs.readFileSync(INDEX_HTML, "utf8");
  const tagPattern = /<script type="module" src="(?:app\.bundle\.js|dist\/app\.[A-Za-z0-9]+\.js)"><\/script>/;
  if (!tagPattern.test(html)) {
    throw new Error("Could not find the main app script tag in index.html");
  }
  html = html.replace(tagPattern, `<script type="module" src="dist/${main}"><\/script>`);
  html = html.replace(/href="style\.css(?:\?v=[A-Za-z0-9]+)?"/, `href="style.css?v=${hash}"`);
  html = html.replace(/src="early\.js(?:\?v=[A-Za-z0-9]+)?"/, `src="early.js?v=${hash}"`);
  html = html.replace(/src="confetti\.browser\.min\.js(?:\?v=[A-Za-z0-9]+)?"/, `src="confetti.browser.min.js?v=${hash}"`);
  fs.writeFileSync(INDEX_HTML, html);
}

function updateServiceWorker(outputs, hash) {
  let sw = fs.readFileSync(SW_JS, "utf8");
  const versionPattern = /const CACHE_VERSION = "[^"]*";/;
  const precachePattern = /const PRECACHE_URLS = \[[^\]]*\];/;
  if (!versionPattern.test(sw) || !precachePattern.test(sw)) {
    throw new Error("Could not find CACHE_VERSION or PRECACHE_URLS in sw.js");
  }
  const base = [ "./", "./index.html", `./style.css?v=${hash}`, "./presence.js", `./early.js?v=${hash}`, `./confetti.browser.min.js?v=${hash}`, "./manifest.json", "./icons/sfl-guro-192.png", "./icons/sfl-guro-512.png" ];
  const urls = base.concat(outputs.map(f => `./dist/${f}`));
  sw = sw.replace(versionPattern, `const CACHE_VERSION = "v${hash}";`);
  sw = sw.replace(precachePattern, `const PRECACHE_URLS = ${JSON.stringify(urls)};`);
  fs.writeFileSync(SW_JS, sw);
}

if (require.main === module) {
  buildBundle().then(info => {
    console.log(`Built ${info.main} + ${info.files.length - 1} chunk(s), ${(info.bytes / 1024 / 1024).toFixed(2)} MB total`);
    console.log(info.files.join("\n"));
  }).catch(err => {
    console.error(err);
    process.exit(1);
  });
}

module.exports = {
  buildBundle: buildBundle
};
