// Check the local dependency graph without a server, packages, or a build step.
const fs = require("node:fs");
const path = require("node:path");
const vm = require("node:vm");
const assert = require("node:assert/strict");
const root = path.resolve(__dirname, "..", "..");
const visited = new Set();
const visiting = new Set();

function checkAsset(file) {
  assert.ok(fs.existsSync(file) && fs.statSync(file).isFile(), `Missing local asset: ${path.relative(root, file)}`);
  assert.ok(!visiting.has(file), `Circular stylesheet import: ${path.relative(root, file)}`);
  if (visited.has(file)) return;
  visiting.add(file);
  const source = fs.readFileSync(file, "utf8");
  if (file.endsWith(".js")) new vm.Script(source, { filename: file });
  if (file.endsWith(".css")) {
    for (const [, dependency] of source.matchAll(/@import\s+url\(["']([^"']+)["']\)\s*;/g)) {
      checkAsset(path.resolve(path.dirname(file), dependency));
    }
  }
  visiting.delete(file);
  visited.add(file);
}

let entries = 0;
for (const folder of fs.readdirSync(root)) {
  if (!fs.existsSync(path.join(root, folder, "quiz.js"))) continue;
  for (const entry of ["index.html", "exam.html", "notice.html"]) {
    const file = path.join(root, folder, entry);
    const html = fs.readFileSync(file, "utf8");
    const scripts = [...html.matchAll(/<script\b[^>]*\bsrc=["']([^"']+)["']/g)].map(match => match[1]);
    const styles = [...html.matchAll(/<link\b(?=[^>]*\brel=["']stylesheet["'])[^>]*\bhref=["']([^"']+)["']/g)].map(match => match[1]);
    for (const asset of [...scripts, ...styles]) {
      if (/^https?:\/\//.test(asset)) continue;
      checkAsset(path.resolve(path.dirname(file), asset));
    }
    entries++;
  }
}
console.log(`PASS assets: ${entries} entry points, ${visited.size} local scripts/styles, stylesheet imports and JavaScript syntax`);
