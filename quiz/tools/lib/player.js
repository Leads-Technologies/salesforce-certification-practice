// In-memory browser fixture. Tests never read or write real browser progress.
const fs = require("node:fs");
const path = require("node:path");
const vm = require("node:vm");
const assert = require("node:assert/strict");
const { pathToFileURL, fileURLToPath } = require("node:url");
const rootDir = path.resolve(__dirname, "..", "..", "..");

function player(folder, seed = {}, savedStorage, entry = "index.html") {
  const pagePath = path.join(rootDir, folder, entry);
  const pageUrl = pathToFileURL(pagePath);
  const html = fs.readFileSync(pagePath, "utf8");
  assert.ok(!/type\s*=\s*["']module/.test(html), `${folder}: module loading breaks file://`);
  assert.ok(!/\?v=/.test(html), `${folder}: unexpected asset version suffix`);
  const scripts = [...html.matchAll(/<script\s+src=["']([^"']+)["'][^>]*>\s*<\/script>/g)].map(match => match[1]);
  assert.deepEqual(scripts, ["quiz.js", "questions.js", "../quiz/js/core/model.js", "../quiz/js/core/storage.js", "../quiz/js/core/exam.js", "../quiz/js/ui/content.js", "../quiz/js/ui/navigation.js", "../quiz/js/ui/screens.js", "../quiz/js/ui/events.js", "../quiz/js/app.js"], `${folder}: classic script order`);
  let htmlContent = "";
  let body = null;
  let nav = null;
  let homeNodes = new Map();
  let actionNodes = new Map();
  let jumpNodes = new Map();
  const effects = { focused: null, scrolled: null };
  const timers = new Map();
  let timerId = 0;
  const makeHomeNode = name => ({
    value: "", innerHTML: "", textContent: "", hidden: false, events: new Map(),
    attributes: new Map(),
    addEventListener(event, callback) { this.events.set(event, callback); },
    setAttribute(name, value) { this.attributes.set(name, value); },
    getAttribute(name) { return this.attributes.get(name); },
    focus() { effects.focused = name; },
  });
  const app = {
    get innerHTML() { return htmlContent; },
    set innerHTML(html) {
      htmlContent = html;
      body = html.includes('class="panel-body"') ? { scrollTop: 0, getBoundingClientRect: () => ({ top: 180 }) } : null;
      nav = html.includes('class="jump"') ? { scrollTop: 0, querySelector: () => null } : null;
      homeNodes = new Map();
      actionNodes = new Map();
      jumpNodes = new Map();
      for (const match of html.matchAll(/<button\b([^>]*\bdata-action="([^"]+)"[^>]*)>/g)) {
        const node = makeHomeNode(`[data-action="${match[2]}"]`);
        node.dataset = { action: match[2] };
        node.disabled = /\bdisabled\b/.test(match[1]);
        actionNodes.set(match[2], node);
      }
      for (const [, index] of html.matchAll(/\bdata-jump="(\d+)"/g)) {
        const node = makeHomeNode(`[data-jump="${index}"]`);
        node.dataset = { jump:index };
        jumpNodes.set(index, node);
      }
      if (html.includes('id="home-search"')) {
        for (const name of ["#home-search", "#home-catalog", "#home-search-status", ".home-search-form", "[data-clear-search]", "[data-question]", ".priority-hint", ".home-dashboard"]) homeNodes.set(name, makeHomeNode(name));
        homeNodes.get("#home-search").value = (html.match(/id="home-search"[^>]*value="([^"]*)"/)?.[1] || "").replaceAll("&quot;", '"').replaceAll("&lt;", "<").replaceAll("&gt;", ">").replaceAll("&amp;", "&");
        for (const [, mode, pressed] of html.matchAll(/data-home-mode="([^"]+)" aria-pressed="([^"]+)"/g)) {
          const name = `[data-home-mode="${mode}"]`;
          const node = makeHomeNode(name);
          node.dataset = {homeMode:mode};
          node.setAttribute("aria-pressed", pressed);
          homeNodes.set(name, node);
        }
      }
      if (html.includes('id="exam-count"')) {
        for (const name of ["#exam-count", "#exam-minutes", ".exam-setup-form"]) homeNodes.set(name, makeHomeNode(name));
        homeNodes.get("#exam-count").value = html.match(/id="exam-count"[^>]*value="([^"]*)"/)?.[1] || "";
        homeNodes.get("#exam-minutes").value = html.match(/id="exam-minutes"[^>]*value="([^"]*)"/)?.[1] || "";
      }
      if (html.includes("data-exam-timer>")) {
        for (const name of ["[data-exam-timer]", "[data-exam-time]", "[data-exam-timer-label]", "[data-exam-timer-alert]"]) homeNodes.set(name, makeHomeNode(name));
        homeNodes.get("[data-exam-time]").textContent = html.match(/data-exam-time(?=[\s>])[^>]*>([^<]*)/)?.[1] || "";
      }
      if (html.includes('id="question-number"')) {
        for (const name of ["#question-number", ".jump-form"]) homeNodes.set(name, makeHomeNode(name));
        homeNodes.get("#question-number").value = html.match(/id="question-number"[^>]*value="([^"]*)"/)?.[1] || "";
      }
      if (html.includes('id="navigator-filter"')) {
        const filter = makeHomeNode("#navigator-filter");
        filter.value = html.match(/<option value="([^"]+)" selected>/)?.[1] || "all";
        homeNodes.set("#navigator-filter", filter);
      }
    },
  };
  const storage = new Map(savedStorage || []);
  const events = new Map();
  const listenerCounts = new Map();
  const addListener = (name, callback) => {
    events.set(name, callback);
    listenerCounts.set(name, (listenerCounts.get(name) || 0) + 1);
  };
  const removeListener = (name, callback) => {
    if (events.get(name) === callback) events.delete(name);
    listenerCounts.set(name, (listenerCounts.get(name) || 0) - 1);
  };
  const context = vm.createContext({
    window: { location: pageUrl,
      setInterval(callback) { const id = ++timerId; timers.set(id, callback); return id; },
      clearInterval(id) { timers.delete(id); },
      addEventListener: addListener,
      removeEventListener: removeListener,
    },
    document: {
      body: { dataset: /data-quiz-page="exam"/.test(html) ? {quizPage:"exam"} : {} },
      getElementById: id => id === "app" ? app : homeNodes.get(`#${id}`) || null,
      querySelectorAll: selector => selector === "[data-action]" ? [...actionNodes.values()] : selector === "[data-jump]" ? [...jumpNodes.values()] : selector === "[data-home-mode]" ? [...homeNodes.values()].filter(node => node.dataset?.homeMode) : [],
      querySelector: selector => {
        if (selector === ".panel-body") return body;
        if (selector === ".jump") return nav;
        if (homeNodes.has(selector)) return homeNodes.get(selector);
        const action = selector.match(/^\[data-action="([^"]+)"\]$/)?.[1];
        if (action) return actionNodes.get(action) || null;
        const jump = selector.match(/^\[data-jump="(\d+)"\]$/)?.[1];
        if (jump != null) return jumpNodes.get(jump) || null;
        const focusedNode = selector === ".qnum" && htmlContent.includes('class="qnum"') ||
          selector === ".explain" && htmlContent.includes('tabindex="-1" aria-label=') ||
          selector === ".summary-title" && htmlContent.includes('class="summary-title"') ||
          selector === "#exam-page-title" && htmlContent.includes('id="exam-page-title"') ||
          /^\[data-home-mode="(priority|topic)"\]$/.test(selector) ||
          /^\[data-pick="[A-Z]"\]$/.test(selector);
        if (!focusedNode) return null;
        return { focus: () => { effects.focused = selector; }, scrollIntoView: () => { effects.scrolled = selector; }, getBoundingClientRect: () => ({ top: 980 }) };
      },
      addEventListener: addListener,
      removeEventListener: removeListener,
    },
    localStorage: {
      getItem: key => storage.has(key) ? storage.get(key) : JSON.stringify(seed),
      setItem: (key, value) => storage.set(key, value),
      removeItem: key => storage.delete(key),
    },
    confirm: () => true,
    fetch() { throw Error("Quiz data must not use fetch"); },
  });
  for (const src of scripts) {
    const file = fileURLToPath(new URL(src, pageUrl));
    vm.runInContext(fs.readFileSync(file, "utf8"), context, { filename: file });
  }
  assert.ok(app.innerHTML && !app.innerHTML.includes("Could not load this quiz"), `${folder}: player startup: ${app.innerHTML}`);
  assert.equal(vm.runInContext("typeof state + ':' + typeof grade + ':' + typeof normalizeQuestion", context), "undefined:undefined:undefined", `${folder}: player state and helpers do not leak into global scope`);
  require("./player-access.js")(context);
  return { context, app, storage, events, effects, timers, listenerCounts, run: code => vm.runInContext(code, context) };
}


module.exports = player;
