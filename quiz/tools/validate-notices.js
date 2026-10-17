// Optional checks for the static notices and their progressive enhancements.
const fs = require("node:fs");
const path = require("node:path");
const vm = require("node:vm");
const assert = require("node:assert/strict");
const root = path.resolve(__dirname, "..", "..");
const script = fs.readFileSync(path.join(__dirname, "..", "js", "ui", "notice.js"), "utf8");
const plain = html => html.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();
const folders = fs.readdirSync(root).filter(folder => fs.existsSync(path.join(root, folder, "notice.html")));

for (const folder of folders) {
  const html = fs.readFileSync(path.join(root, folder, "notice.html"), "utf8");
  assert.ok(html.includes('<script src="../quiz/js/ui/notice.js" defer></script>'), `${folder}: local optional enhancements`);
  assert.ok(html.includes('<script src="../quiz/js/ui/navigation.js" defer></script>') && html.includes('data-site-header') && html.includes('data-site-footer'), `${folder}: review notes share the quiz navigation and footer`);
  assert.ok(!/\bfetch\s*\(|XMLHttpRequest|type="module"/.test(html + script), `${folder}: direct-file compatibility`);
  const ids = [...html.matchAll(/\bid="([^"]+)"/g)].map(match => match[1]);
  assert.equal(new Set(ids).size, ids.length, `${folder}: unique anchors`);
  for (const [, id] of html.matchAll(/href="#([^"]+)"/g)) assert.ok(ids.includes(id), `${folder}: anchor ${id}`);
  const data = { window: {} };
  vm.runInNewContext(fs.readFileSync(path.join(root, folder, "questions.js"), "utf8"), data);
  const questions = JSON.parse(JSON.stringify(data.window.QUIZ_QUESTIONS));
  assert.equal((html.match(/<section class="notice-section /g) || []).length, 3, `${folder}: only Corrected, Repaired and Not scored sections`);
  for (const flag of ["corrected", "repaired", "ungraded"]) {
    const count = Number(html.match(new RegExp(`data-review-count="${flag}"[\\s\\S]*?<strong>(\\d+)</strong>`))[1]);
    assert.equal(count, questions.filter(q => q[flag]).length, `${folder}: ${flag} count`);
  }
  const corrected = html.match(/<section class="notice-section corrected"[\s\S]*?<\/section>/)[0];
  assert.deepEqual([...corrected.matchAll(/data-questions="(\d+)"/g)].map(m => Number(m[1])).sort((a,b) => a-b), questions.filter(q => q.corrected).map(q => q.id).sort((a,b) => a-b), `${folder}: every wrong source key remains documented`);

  function node() {
    return {
      hidden: false, disabled: false, value: "", textContent: "", open: false, events: new Map(), attributes: new Map(),
      addEventListener(name, callback) { this.events.set(name, callback); },
      removeEventListener(name, callback) { if (this.events.get(name) === callback) this.events.delete(name); },
      focus() { this.focused = true; }, scrollIntoView() { this.scrolled = true; },
      setAttribute(name, value) { this.attributes.set(name, value); },
      getAttribute(name) { return this.attributes.get(name); },
      removeAttribute(name) { this.attributes.delete(name); },
    };
  }
  const tables = [...html.matchAll(/<div class="notice-table"[\s\S]*?<table[^>]*>([\s\S]*?)<\/table><\/div>/g)].map(match => {
    const region = node();
    const rows = [...match[1].matchAll(/<tr role="row" id="([^"]+)" data-questions="([^"]*)">([\s\S]*?)<\/tr>/g)].map(([, id, numbers, body]) => Object.assign(node(), { id, dataset: { questions: numbers }, textContent: plain(body) }));
    assert.ok(rows.length, `${folder}: review table has question rows`);
    region.querySelectorAll = () => rows;
    region.nextElementSibling = node();
    return { region, rows };
  });
  const rows = tables.flatMap(table => table.rows);
  const flaggedIds = questions.filter(q=>q.corrected||q.repaired||q.ungraded).map(q=>q.id).sort((a,b)=>a-b);
  assert.deepEqual(rows.map(row=>Number(row.dataset.questions)).sort((a,b)=>a-b), flaggedIds, `${folder}: affected questions appear once, without unchanged-question or history tables`);
  assert.ok(rows.every(row=>row.textContent.length<=290), `${folder}: each question has a short review note`);
  const nodes = new Map(["#notice-search", "[data-notice-clear]", "#notice-search-status", ".notice-search-empty", ".notice-search-form", "[data-notice-print]", ".notice-about", "[data-notice-tools]"].map(selector => [selector, node()]));
  nodes.get("[data-notice-tools]").hidden = true;
  const sections = ["notice-overview", ...[...html.matchAll(/<section class="notice-section[^>]*aria-labelledby="([^"]+)"/g)].map(m => m[1])].map((id, i) => ({ id, top: i * 1000, getBoundingClientRect() { return { top: this.top }; } }));
  const links = sections.slice(1).map(section => { const link = node(); link.attributes.set("href", `#${section.id}`); return link; });
  const events = new Map();
  let prints = 0;
  const context = {
    document: {
      querySelector: selector => nodes.get(selector),
      querySelectorAll: selector => selector === ".notice-table" ? tables.map(table => table.region) : selector === ".notice-summary a" ? links : sections,
    },
    window: { addEventListener: (name, callback) => events.set(name, callback), removeEventListener: (name, callback) => { if (events.get(name) === callback) events.delete(name); }, requestAnimationFrame: callback => callback(), print: () => prints++ },
  };
  vm.runInNewContext(script, context);
  const input = nodes.get("#notice-search");
  const clear = nodes.get("[data-notice-clear]");
  const status = nodes.get("#notice-search-status");
  const runSearch = query => { input.value = query; input.events.get("input")(); };
  assert.ok(!nodes.get("[data-notice-tools]").hidden && rows.every(row => !row.hidden), `${folder}: enhancement starts with all notes available`);
  const number = rows[0].dataset.questions.split(",")[0];
  for (const query of [number, `Q ${number}`, `#${number}`]) {
    runSearch(query);
    for (const row of rows) assert.equal(!row.hidden, row.dataset.questions.split(",").includes(number), `${folder}: exact question lookup ${query}`);
  }
  const first = rows.find(row => !row.hidden);
  nodes.get(".notice-search-form").events.get("submit")({ preventDefault() {} });
  assert.ok(first.focused && first.scrolled, `${folder}: Enter focuses the first matching note`);
  const grouped = rows.find(row => row.dataset.questions.includes(","));
  if (grouped) {
    runSearch(grouped.dataset.questions.split(",")[1]);
    assert.ok(!grouped.hidden, `${folder}: grouped questions are searchable individually`);
  }
  const phrase = rows[0].textContent.match(/[a-z]{4,}/gi).slice(0, 2).join(" ");
  runSearch(phrase);
  assert.ok(rows.some(row => !row.hidden), `${folder}: keyword search finds review text`);
  const expected = rows.filter(row => !row.hidden).map(row => row.id);
  runSearch(phrase.toUpperCase());
  assert.deepEqual(rows.filter(row => !row.hidden).map(row => row.id), expected, `${folder}: keyword search is case insensitive`);
  runSearch("<script>nonexistent</script>");
  assert.ok(rows.every(row => row.hidden) && !nodes.get(".notice-search-empty").hidden, `${folder}: empty search has a readable explanation`);
  assert.ok(status.textContent.startsWith("0 of"), `${folder}: matching note count is announced`);
  input.events.get("keydown")({ key: "Escape", preventDefault() {} });
  assert.ok(rows.every(row => !row.hidden) && clear.disabled && input.value === "", `${folder}: Escape clears without replacing the input`);
  runSearch(number);
  clear.events.get("click")();
  assert.ok(input.focused && rows.every(row => !row.hidden), `${folder}: Clear restores notes and keyboard focus`);
  nodes.get("[data-notice-print]").events.get("click")();
  assert.equal(prints, 1, `${folder}: print action`);
  events.get("beforeprint")();
  assert.ok(nodes.get(".notice-about").open, `${folder}: print includes source and scope`);
  events.get("afterprint")();
  assert.ok(!nodes.get(".notice-about").open, `${folder}: printing restores the disclosure state`);
  sections[0].top = -2000; sections[1].top = -1000; sections[2].top = 50;
  events.get("scroll")();
  assert.equal(links[1].getAttribute("aria-current"), "location", `${folder}: current section is indicated`);
  const controller = context.window.QuizModules.notice;
  const inputHandler = input.events.get('input');
  controller.mount();
  assert.equal(input.events.get('input'), inputHandler, `${folder}: repeated notice mounting does not bind twice`);
  let pendingFrame;
  let cancelledFrame;
  context.window.requestAnimationFrame = callback => { pendingFrame = callback; return 7; };
  context.window.cancelAnimationFrame = handle => { cancelledFrame = handle; };
  events.get('scroll')();
  controller.dispose();
  assert.equal(cancelledFrame, 7, `${folder}: notice disposal cancels its scheduled frame`);
  assert.equal(input.events.size, 0, `${folder}: notice disposal removes input handlers`);
  assert.equal(events.size, 0, `${folder}: notice disposal removes window handlers`);
  sections[2].top = 2000;
  pendingFrame();
  assert.equal(links[1].getAttribute('aria-current'), 'location', `${folder}: an already queued callback cannot update a disposed notice`);
  console.log(`PASS notice ${folder}: ${rows.length} table notes, counts, complete correction list, anchors, exact/grouped lookup, keyword search, empty state, keyboard, navigation, printing`);
}
